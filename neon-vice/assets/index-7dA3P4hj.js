var su=Object.defineProperty;var ru=(s,t,e)=>t in s?su(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var E=(s,t,e)=>ru(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oo="170",au=0,yl=1,ou=2,Zc=1,$c=2,In=3,Qn=0,Ve=1,He=2,Nn=0,Qi=1,Bn=2,Sl=3,wl=4,lu=5,pi=100,cu=101,hu=102,uu=103,du=104,fu=200,pu=201,mu=202,gu=203,Va=204,Ga=205,vu=206,_u=207,xu=208,Mu=209,yu=210,Su=211,wu=212,bu=213,Eu=214,Wa=0,Xa=1,qa=2,ns=3,Ya=4,Za=5,$a=6,Ka=7,Kc=0,Tu=1,Au=2,Jn=0,jc=1,Jc=2,Qc=3,Bo=4,Cu=5,th=6,eh=7,nh=300,is=301,ss=302,ja=303,Ja=304,Wr=306,Qa=1e3,gi=1001,to=1002,Qe=1003,Ru=1004,qs=1005,Mn=1006,ta=1007,vi=1008,zn=1009,ih=1010,sh=1011,Ns=1012,zo=1013,xi=1014,yn=1015,Fn=1016,ko=1017,Ho=1018,rs=1020,rh=35902,ah=1021,oh=1022,fn=1023,lh=1024,ch=1025,ts=1026,as=1027,Vo=1028,Go=1029,hh=1030,Wo=1031,Xo=1033,Dr=33776,Ir=33777,Ur=33778,Nr=33779,eo=35840,no=35841,io=35842,so=35843,ro=36196,ao=37492,oo=37496,lo=37808,co=37809,ho=37810,uo=37811,fo=37812,po=37813,mo=37814,go=37815,vo=37816,_o=37817,xo=37818,Mo=37819,yo=37820,So=37821,Fr=36492,wo=36494,bo=36495,uh=36283,Eo=36284,To=36285,Ao=36286,Pu=3200,Lu=3201,dh=0,Du=1,jn="",De="srgb",cs="srgb-linear",Xr="linear",ae="srgb",Ei=7680,bl=519,Iu=512,Uu=513,Nu=514,fh=515,Fu=516,Ou=517,Bu=518,zu=519,Co=35044,Ys=35048,El="300 es",Un=2e3,kr=2001;class hs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tl=1234567;const Rs=Math.PI/180,Fs=180/Math.PI;function wn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[s&255]+Ue[s>>8&255]+Ue[s>>16&255]+Ue[s>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Pe(s,t,e){return Math.max(t,Math.min(e,s))}function qo(s,t){return(s%t+t)%t}function ku(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Hu(s,t,e){return s!==t?(e-s)/(t-s):0}function Ps(s,t,e){return(1-e)*s+e*t}function Vu(s,t,e,n){return Ps(s,t,1-Math.exp(-e*n))}function Gu(s,t=1){return t-Math.abs(qo(s,t*2)-t)}function Wu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Xu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function qu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Yu(s,t){return s+Math.random()*(t-s)}function Zu(s){return s*(.5-Math.random())}function $u(s){s!==void 0&&(Tl=s);let t=Tl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ku(s){return s*Rs}function ju(s){return s*Fs}function Ju(s){return(s&s-1)===0&&s!==0}function Qu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function td(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ed(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function dn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function le(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ge={DEG2RAD:Rs,RAD2DEG:Fs,generateUUID:wn,clamp:Pe,euclideanModulo:qo,mapLinear:ku,inverseLerp:Hu,lerp:Ps,damp:Vu,pingpong:Gu,smoothstep:Wu,smootherstep:Xu,randInt:qu,randFloat:Yu,randFloatSpread:Zu,seededRandom:$u,degToRad:Ku,radToDeg:ju,isPowerOfTwo:Ju,ceilPowerOfTwo:Qu,floorPowerOfTwo:td,setQuaternionFromProperEuler:ed,normalize:le,denormalize:dn};class Q{constructor(t=0,e=0){Q.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,i,r,a,o,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],x=i[1],M=i[4],_=i[7],I=i[2],C=i[5],R=i[8];return r[0]=a*v+o*x+l*I,r[3]=a*m+o*M+l*C,r[6]=a*p+o*_+l*R,r[1]=c*v+h*x+u*I,r[4]=c*m+h*M+u*C,r[7]=c*p+h*_+u*R,r[2]=d*v+f*x+g*I,r[5]=d*m+f*M+g*C,r[8]=d*p+f*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ea.makeScale(t,e)),this}rotate(t){return this.premultiply(ea.makeRotation(-t)),this}translate(t,e){return this.premultiply(ea.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Wt;function ph(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Hr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function nd(){const s=Hr("canvas");return s.style.display="block",s}const Al={};function Ts(s){s in Al||(Al[s]=!0,console.warn(s))}function id(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function sd(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ae&&(s.r=On(s.r),s.g=On(s.g),s.b=On(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ae&&(s.r=es(s.r),s.g=es(s.g),s.b=es(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===jn?Xr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function On(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function es(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Cl=[.64,.33,.3,.6,.15,.06],Rl=[.2126,.7152,.0722],Pl=[.3127,.329],Ll=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[cs]:{primaries:Cl,whitePoint:Pl,transfer:Xr,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:Rl,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:Cl,whitePoint:Pl,transfer:ae,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:Rl,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});let Ti;class ad{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=Hr("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let od=0;class mh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=wn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(na(i[a].image)):r.push(na(i[a]))}else r=na(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function na(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ad.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ld=0;class Oe extends hs{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=gi,i=gi,r=Mn,a=vi,o=fn,l=zn,c=Oe.DEFAULT_ANISOTROPY,h=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=wn(),this.name="",this.source=new mh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qa:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case to:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qa:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case to:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=nh;Oe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,i=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,_=(f+1)/2,I=(p+1)/2,C=(h+d)/4,R=(u+v)/4,P=(g+m)/4;return M>_&&M>I?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=C/n,r=R/n):_>I?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=C/i,r=P/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=R/r,i=P/r),this.set(n,i,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cd extends hs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Oe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new mh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends cd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gh extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class hd extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ti{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*v,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const I=Math.sqrt(M),C=Math.atan2(I,p*x);m=Math.sin(m*C)/I,o=Math.sin(o*C)/I}const _=o*x;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-o){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Il.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Il.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ia.copy(this).projectOnVector(t),this.sub(ia)}reflect(t){return this.sub(ia.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ia=new A,Il=new ti;class Si{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gs),$s.subVectors(this.max,gs),Ai.subVectors(t.a,gs),Ci.subVectors(t.b,gs),Ri.subVectors(t.c,gs),Vn.subVectors(Ci,Ai),Gn.subVectors(Ri,Ci),ni.subVectors(Ai,Ri);let e=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-ni.z,ni.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,ni.z,0,-ni.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-ni.y,ni.x,0];return!sa(e,Ai,Ci,Ri,$s)||(e=[1,0,0,0,1,0,0,0,1],!sa(e,Ai,Ci,Ri,$s))?!1:(Ks.crossVectors(Vn,Gn),e=[Ks.x,Ks.y,Ks.z],sa(e,Ai,Ci,Ri,$s))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const An=[new A,new A,new A,new A,new A,new A,new A,new A],on=new A,Zs=new Si,Ai=new A,Ci=new A,Ri=new A,Vn=new A,Gn=new A,ni=new A,gs=new A,$s=new A,Ks=new A,ii=new A;function sa(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ii.fromArray(s,r);const o=i.x*Math.abs(ii.x)+i.y*Math.abs(ii.y)+i.z*Math.abs(ii.z),l=t.dot(ii),c=e.dot(ii),h=n.dot(ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ud=new Si,vs=new A,ra=new A;class us{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ud.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vs.subVectors(t,this.center);const e=vs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(vs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vs.copy(t.center).add(ra)),this.expandByPoint(vs.copy(t.center).sub(ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new A,aa=new A,js=new A,Wn=new A,oa=new A,Js=new A,la=new A;class vh{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){aa.copy(t).add(e).multiplyScalar(.5),js.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(aa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(js),o=Wn.dot(this.direction),l=-Wn.dot(js),c=Wn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(aa).addScaledVector(js,d),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,r){oa.subVectors(e,t),Js.subVectors(n,t),la.crossVectors(oa,Js);let a=this.direction.dot(la),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wn.subVectors(this.origin,t);const l=o*this.direction.dot(Js.crossVectors(Wn,Js));if(l<0)return null;const c=o*this.direction.dot(oa.cross(Wn));if(c<0||l+c>a)return null;const h=-o*Wn.dot(la);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $t{constructor(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){$t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $t().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),a=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dd,t,fd)}lookAt(t,e,n){const i=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Xn.crossVectors(n,Ze),Xn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Xn.crossVectors(n,Ze)),Xn.normalize(),Qs.crossVectors(Ze,Xn),i[0]=Xn.x,i[4]=Qs.x,i[8]=Ze.x,i[1]=Xn.y,i[5]=Qs.y,i[9]=Ze.y,i[2]=Xn.z,i[6]=Qs.z,i[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],x=n[3],M=n[7],_=n[11],I=n[15],C=i[0],R=i[4],P=i[8],w=i[12],y=i[1],D=i[5],B=i[9],O=i[13],V=i[2],q=i[6],G=i[10],K=i[14],W=i[3],lt=i[7],gt=i[11],wt=i[15];return r[0]=a*C+o*y+l*V+c*W,r[4]=a*R+o*D+l*q+c*lt,r[8]=a*P+o*B+l*G+c*gt,r[12]=a*w+o*O+l*K+c*wt,r[1]=h*C+u*y+d*V+f*W,r[5]=h*R+u*D+d*q+f*lt,r[9]=h*P+u*B+d*G+f*gt,r[13]=h*w+u*O+d*K+f*wt,r[2]=g*C+v*y+m*V+p*W,r[6]=g*R+v*D+m*q+p*lt,r[10]=g*P+v*B+m*G+p*gt,r[14]=g*w+v*O+m*K+p*wt,r[3]=x*C+M*y+_*V+I*W,r[7]=x*R+M*D+_*q+I*lt,r[11]=x*P+M*B+_*G+I*gt,r[15]=x*w+M*O+_*K+I*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+v*(+e*l*f-e*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],x=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,M=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,_=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,I=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,C=e*x+n*M+i*_+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=x*R,t[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*R,t[2]=(o*m*r-v*l*r+v*i*c-n*m*c-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*R,t[4]=M*R,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*R,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*R,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*f+e*l*f)*R,t[8]=_*R,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*R,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*R,t[12]=I*R,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*R,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*R,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,x=l*c,M=l*h,_=l*u,I=n.x,C=n.y,R=n.z;return i[0]=(1-(v+p))*I,i[1]=(f+_)*I,i[2]=(g-M)*I,i[3]=0,i[4]=(f-_)*C,i[5]=(1-(d+p))*C,i[6]=(m+x)*C,i[7]=0,i[8]=(g+M)*R,i[9]=(m-x)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Pi.set(i[0],i[1],i[2]).length();const a=Pi.set(i[4],i[5],i[6]).length(),o=Pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],ln.copy(this);const c=1/r,h=1/a,u=1/o;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Un){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(o===Un)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===kr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Un){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),d=(e+t)*c,f=(n+i)*h;let g,v;if(o===Un)g=(a+r)*u,v=-2*u;else if(o===kr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pi=new A,ln=new $t,dd=new A(0,0,0),fd=new A(1,1,1),Xn=new A,Qs=new A,Ze=new A,Ul=new $t,Nl=new ti;class mn{constructor(t=0,e=0,n=0,i=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Pe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Pe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ul.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ul,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nl.setFromEuler(this),this.setFromQuaternion(Nl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class _h{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pd=0;const Fl=new A,Li=new ti,Rn=new $t,tr=new A,_s=new A,md=new A,gd=new ti,Ol=new A(1,0,0),Bl=new A(0,1,0),zl=new A(0,0,1),kl={type:"added"},vd={type:"removed"},Di={type:"childadded",child:null},ca={type:"childremoved",child:null};class xe extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new A,e=new mn,n=new ti,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new Wt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _h,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(Ol,t)}rotateY(t){return this.rotateOnAxis(Bl,t)}rotateZ(t){return this.rotateOnAxis(zl,t)}translateOnAxis(t,e){return Fl.copy(t).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ol,t)}translateY(t){return this.translateOnAxis(Bl,t)}translateZ(t){return this.translateOnAxis(zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tr.copy(t):tr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(_s,tr,this.up):Rn.lookAt(tr,_s,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Rn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kl),Di.child=t,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vd),ca.child=t,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kl),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,gd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}xe.DEFAULT_UP=new A(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new A,Pn=new A,ha=new A,Ln=new A,Ii=new A,Ui=new A,Hl=new A,ua=new A,da=new A,fa=new A,pa=new he,ma=new he,ga=new he;class sn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),cn.subVectors(t,e),i.cross(cn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){cn.subVectors(i,e),Pn.subVectors(n,e),ha.subVectors(t,e);const a=cn.dot(cn),o=cn.dot(Pn),l=cn.dot(ha),c=Pn.dot(Pn),h=Pn.dot(ha),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(a,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return pa.setScalar(0),ma.setScalar(0),ga.setScalar(0),pa.fromBufferAttribute(t,e),ma.fromBufferAttribute(t,n),ga.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(pa,r.x),a.addScaledVector(ma,r.y),a.addScaledVector(ga,r.z),a}static isFrontFacing(t,e,n,i){return cn.subVectors(n,e),Pn.subVectors(t,e),cn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),cn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Ii.subVectors(i,n),Ui.subVectors(r,n),ua.subVectors(t,n);const l=Ii.dot(ua),c=Ui.dot(ua);if(l<=0&&c<=0)return e.copy(n);da.subVectors(t,i);const h=Ii.dot(da),u=Ui.dot(da);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ii,a);fa.subVectors(t,r);const f=Ii.dot(fa),g=Ui.dot(fa);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ui,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Hl.subVectors(r,i),o=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(Hl,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Ii,a).addScaledVector(Ui,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},er={h:0,s:0,l:0};function va(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class mt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=qo(t,1),e=Pe(e,0,1),n=Pe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=va(a,r,t+1/3),this.g=va(a,r,t),this.b=va(a,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=xh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return jt.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Pe(Ne.r*255,0,255))*65536+Math.round(Pe(Ne.g*255,0,255))*256+Math.round(Pe(Ne.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,i=Ne.g,r=Ne.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=De){jt.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,i=Ne.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(qn),this.setHSL(qn.h+t,qn.s+e,qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(qn),t.getHSL(er);const n=Ps(qn.h,er.h,e),i=Ps(qn.s,er.s,e),r=Ps(qn.l,er.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new mt;mt.NAMES=xh;let _d=0;class wi extends hs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=wn(),this.name="",this.blending=Qi,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Ga,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==Ga&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ce extends wi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=Kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new A,nr=new Q;class we{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Co&&(t.usage=this.usage),t}}class Mh extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yh extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xd=0;const en=new $t,_a=new xe,Ni=new A,$e=new Si,xs=new Si,Ce=new A;class Me extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ph(t)?yh:Mh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return _a.lookAt(t),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Jt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors($e.min,xs.min),$e.expandByPoint(Ce),Ce.addVectors($e.max,xs.max),$e.expandByPoint(Ce)):($e.expandByPoint(xs.min),$e.expandByPoint(xs.max))}$e.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(Ni.fromBufferAttribute(t,c),Ce.add(Ni)),i=Math.max(i,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new we(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new A,l[P]=new A;const c=new A,h=new A,u=new A,d=new Q,f=new Q,g=new Q,v=new A,m=new A;function p(P,w,y){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),o[P].add(v),o[w].add(v),o[y].add(v),l[P].add(m),l[w].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let P=0,w=x.length;P<w;++P){const y=x[P],D=y.start,B=y.count;for(let O=D,V=D+B;O<V;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const M=new A,_=new A,I=new A,C=new A;function R(P){I.fromBufferAttribute(i,P),C.copy(I);const w=o[P];M.copy(w),M.sub(I.multiplyScalar(I.dot(w))).normalize(),_.crossVectors(C,w);const D=_.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,D)}for(let P=0,w=x.length;P<w;++P){const y=x[P],D=y.start,B=y.count;for(let O=D,V=D+B;O<V;O+=3)R(t.getX(O+0)),R(t.getX(O+1)),R(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new we(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vl=new $t,si=new vh,ir=new us,Gl=new A,sr=new A,rr=new A,ar=new A,xa=new A,or=new A,Wl=new A,lr=new A;class Lt extends xe{constructor(t=new Me,e=new ce){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(xa.fromBufferAttribute(u,t),a?or.addScaledVector(xa,h):or.addScaledVector(xa.sub(e),h))}e.add(or)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),si.copy(t.ray).recast(t.near),!(ir.containsPoint(si.origin)===!1&&(si.intersectSphere(ir,Gl)===null||si.origin.distanceToSquared(Gl)>(t.far-t.near)**2))&&(Vl.copy(r).invert(),si.copy(t.ray).applyMatrix4(Vl),!(n.boundingBox!==null&&si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,si)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,I=M;_<I;_+=3){const C=o.getX(_),R=o.getX(_+1),P=o.getX(_+2);i=cr(this,p,t,n,c,h,u,C,R,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);i=cr(this,a,t,n,c,h,u,x,M,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,I=M;_<I;_+=3){const C=_,R=_+1,P=_+2;i=cr(this,p,t,n,c,h,u,C,R,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=m,M=m+1,_=m+2;i=cr(this,a,t,n,c,h,u,x,M,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Md(s,t,e,n,i,r,a,o){let l;if(t.side===Ve?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Qn,o),l===null)return null;lr.copy(o),lr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(lr);return c<e.near||c>e.far?null:{distance:c,point:lr.clone(),object:s}}function cr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,sr),s.getVertexPosition(l,rr),s.getVertexPosition(c,ar);const h=Md(s,t,e,n,sr,rr,ar,Wl);if(h){const u=new A;sn.getBarycoord(Wl,sr,rr,ar,u),i&&(h.uv=sn.getInterpolatedAttribute(i,o,l,c,u,new Q)),r&&(h.uv1=sn.getInterpolatedAttribute(r,o,l,c,u,new Q)),a&&(h.normal=sn.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new A,materialIndex:0};sn.getNormal(sr,rr,ar,d.normal),h.face=d,h.barycoord=u}return h}class Gt extends Me{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2));function g(v,m,p,x,M,_,I,C,R,P,w){const y=_/R,D=I/P,B=_/2,O=I/2,V=C/2,q=R+1,G=P+1;let K=0,W=0;const lt=new A;for(let gt=0;gt<G;gt++){const wt=gt*D-O;for(let kt=0;kt<q;kt++){const ne=kt*y-B;lt[v]=ne*x,lt[m]=wt*M,lt[p]=V,c.push(lt.x,lt.y,lt.z),lt[v]=0,lt[m]=0,lt[p]=C>0?1:-1,h.push(lt.x,lt.y,lt.z),u.push(kt/R),u.push(1-gt/P),K+=1}}for(let gt=0;gt<P;gt++)for(let wt=0;wt<R;wt++){const kt=d+wt+q*gt,ne=d+wt+q*(gt+1),$=d+(wt+1)+q*(gt+1),st=d+(wt+1)+q*gt;l.push(kt,ne,st),l.push(ne,$,st),W+=6}o.addGroup(f,W,w),f+=W,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ze(s){const t={};for(let e=0;e<s.length;e++){const n=os(s[e]);for(const i in n)t[i]=n[i]}return t}function yd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Sh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Os={clone:os,merge:ze};var Sd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ee extends wi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sd,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wh extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=Un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new A,Xl=new Q,ql=new Q;class Je extends wh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,Xl,ql),e.subVectors(ql,Xl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Oi=1;class bd extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Je(Fi,Oi,t,e);i.layers=this.layers,this.add(i);const r=new Je(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const a=new Je(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const o=new Je(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const l=new Je(Fi,Oi,t,e);l.layers=this.layers,this.add(l);const c=new Je(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class bh extends Oe{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ed extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new bh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Mn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Gt(5,5,5),r=new Ee({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Nn});r.uniforms.tEquirect.value=e;const a=new Lt(i,r),o=e.minFilter;return e.minFilter===vi&&(e.minFilter=Mn),new bd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Ma=new A,Td=new A,Ad=new Wt;class di{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ma.subVectors(n,e).cross(Td.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ma),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ad.getNormalMatrix(t),i=this.coplanarPoint(Ma).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new us,hr=new A;class Yo{constructor(t=new di,e=new di,n=new di,i=new di,r=new di,a=new di){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],x=i[13],M=i[14],_=i[15];if(n[0].setComponents(l-r,d-c,m-f,_-p).normalize(),n[1].setComponents(l+r,d+c,m+f,_+p).normalize(),n[2].setComponents(l+a,d+h,m+g,_+x).normalize(),n[3].setComponents(l-a,d-h,m-g,_-x).normalize(),n[4].setComponents(l-o,d-u,m-v,_-M).normalize(),e===Un)n[5].setComponents(l+o,d+u,m+v,_+M).normalize();else if(e===kr)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(t){return ri.center.set(0,0,0),ri.radius=.7071067811865476,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(hr.x=i.normal.x>0?t.max.x:t.min.x,hr.y=i.normal.y>0?t.max.y:t.min.y,hr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(hr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Eh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Cd(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class ke extends Me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const x=p*d-a;for(let M=0;M<c;M++){const _=M*u-r;g.push(_,-x,0),v.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const M=x+c*p,_=x+c*(p+1),I=x+1+c*(p+1),C=x+1+c*p;f.push(M,_,C),f.push(_,I,C)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rd=`#ifdef USE_ALPHAHASH
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
#endif`,Fd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Od=`#ifdef USE_BATCHING
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
#endif`,Bd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kd=`vec3 objectNormal = vec3( normal );
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
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
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
}`,_f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yf=`uniform bool receiveShadow;
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
#endif`,Sf=`#ifdef USE_ENVMAP
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
#endif`,wf=`ToonMaterial material;
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
material.specularStrength = specularStrength;`,Tf=`varying vec3 vViewPosition;
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
#endif`,Cf=`struct PhysicalMaterial {
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
#endif`,Ff=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Of=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zf=`#if defined( USE_POINTS_UV )
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
#endif`,qf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jf=`#ifndef FLAT_SHADED
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
#endif`,xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wp=`#ifdef USE_TRANSMISSION
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
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
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
}`,Fp=`#if DEPTH_PACKING == 3200
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
}`,Op=`#define DISTANCE
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
}`,Bp=`#define DISTANCE
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
}`,zp=`varying vec3 vWorldDirection;
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
}`,qp=`#define LAMBERT
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
}`,Yp=`#define MATCAP
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
}`,Zp=`#define MATCAP
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
}`,jp=`#define PHONG
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
}`,qt={alphahash_fragment:Rd,alphahash_pars_fragment:Pd,alphamap_fragment:Ld,alphamap_pars_fragment:Dd,alphatest_fragment:Id,alphatest_pars_fragment:Ud,aomap_fragment:Nd,aomap_pars_fragment:Fd,batching_pars_vertex:Od,batching_vertex:Bd,begin_vertex:zd,beginnormal_vertex:kd,bsdfs:Hd,iridescence_fragment:Vd,bumpmap_pars_fragment:Gd,clipping_planes_fragment:Wd,clipping_planes_pars_fragment:Xd,clipping_planes_pars_vertex:qd,clipping_planes_vertex:Yd,color_fragment:Zd,color_pars_fragment:$d,color_pars_vertex:Kd,color_vertex:jd,common:Jd,cube_uv_reflection_fragment:Qd,defaultnormal_vertex:tf,displacementmap_pars_vertex:ef,displacementmap_vertex:nf,emissivemap_fragment:sf,emissivemap_pars_fragment:rf,colorspace_fragment:af,colorspace_pars_fragment:of,envmap_fragment:lf,envmap_common_pars_fragment:cf,envmap_pars_fragment:hf,envmap_pars_vertex:uf,envmap_physical_pars_fragment:Sf,envmap_vertex:df,fog_vertex:ff,fog_pars_vertex:pf,fog_fragment:mf,fog_pars_fragment:gf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:_f,lights_lambert_fragment:xf,lights_lambert_pars_fragment:Mf,lights_pars_begin:yf,lights_toon_fragment:wf,lights_toon_pars_fragment:bf,lights_phong_fragment:Ef,lights_phong_pars_fragment:Tf,lights_physical_fragment:Af,lights_physical_pars_fragment:Cf,lights_fragment_begin:Rf,lights_fragment_maps:Pf,lights_fragment_end:Lf,logdepthbuf_fragment:Df,logdepthbuf_pars_fragment:If,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:Nf,map_fragment:Ff,map_pars_fragment:Of,map_particle_fragment:Bf,map_particle_pars_fragment:zf,metalnessmap_fragment:kf,metalnessmap_pars_fragment:Hf,morphinstance_vertex:Vf,morphcolor_vertex:Gf,morphnormal_vertex:Wf,morphtarget_pars_vertex:Xf,morphtarget_vertex:qf,normal_fragment_begin:Yf,normal_fragment_maps:Zf,normal_pars_fragment:$f,normal_pars_vertex:Kf,normal_vertex:jf,normalmap_pars_fragment:Jf,clearcoat_normal_fragment_begin:Qf,clearcoat_normal_fragment_maps:tp,clearcoat_pars_fragment:ep,iridescence_pars_fragment:np,opaque_fragment:ip,packing:sp,premultiplied_alpha_fragment:rp,project_vertex:ap,dithering_fragment:op,dithering_pars_fragment:lp,roughnessmap_fragment:cp,roughnessmap_pars_fragment:hp,shadowmap_pars_fragment:up,shadowmap_pars_vertex:dp,shadowmap_vertex:fp,shadowmask_pars_fragment:pp,skinbase_vertex:mp,skinning_pars_vertex:gp,skinning_vertex:vp,skinnormal_vertex:_p,specularmap_fragment:xp,specularmap_pars_fragment:Mp,tonemapping_fragment:yp,tonemapping_pars_fragment:Sp,transmission_fragment:wp,transmission_pars_fragment:bp,uv_pars_fragment:Ep,uv_pars_vertex:Tp,uv_vertex:Ap,worldpos_vertex:Cp,background_vert:Rp,background_frag:Pp,backgroundCube_vert:Lp,backgroundCube_frag:Dp,cube_vert:Ip,cube_frag:Up,depth_vert:Np,depth_frag:Fp,distanceRGBA_vert:Op,distanceRGBA_frag:Bp,equirect_vert:zp,equirect_frag:kp,linedashed_vert:Hp,linedashed_frag:Vp,meshbasic_vert:Gp,meshbasic_frag:Wp,meshlambert_vert:Xp,meshlambert_frag:qp,meshmatcap_vert:Yp,meshmatcap_frag:Zp,meshnormal_vert:$p,meshnormal_frag:Kp,meshphong_vert:jp,meshphong_frag:Jp,meshphysical_vert:Qp,meshphysical_frag:tm,meshtoon_vert:em,meshtoon_frag:nm,points_vert:im,points_frag:sm,shadow_vert:rm,shadow_frag:am,sprite_vert:om,sprite_frag:lm},ct={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},xn={basic:{uniforms:ze([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:ze([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new mt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:ze([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:ze([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:ze([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new mt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:ze([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:ze([ct.points,ct.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:ze([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:ze([ct.common,ct.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:ze([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:ze([ct.sprite,ct.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:ze([ct.common,ct.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:ze([ct.lights,ct.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};xn.physical={uniforms:ze([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const ur={r:0,b:0,g:0},ai=new mn,cm=new $t;function hm(s,t,e,n,i,r,a){const o=new mt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?e:t).get(M)),M}function v(x){let M=!1;const _=g(x);_===null?p(o,l):_&&_.isColor&&(p(_,1),M=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===Wr)?(h===void 0&&(h=new Lt(new Gt(1,1,1),new Ee({name:"BackgroundCubeMaterial",uniforms:os(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ai.copy(M.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cm.makeRotationFromEuler(ai)),h.material.toneMapped=jt.getTransfer(_.colorSpace)!==ae,(u!==_||d!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Lt(new ke(2,2),new Ee({name:"BackgroundMaterial",uniforms:os(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=jt.getTransfer(_.colorSpace)!==ae,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,M){x.getRGB(ur,Sh(s)),n.buffers.color.setClear(ur.r,ur.g,ur.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:v,addToRenderList:m}}function um(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(y,D,B,O,V){let q=!1;const G=u(O,B,D);r!==G&&(r=G,c(r.object)),q=f(y,O,B,V),q&&g(y,O,B,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(y,D,B,O),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,D,B){const O=B.wireframe===!0;let V=n[y.id];V===void 0&&(V={},n[y.id]=V);let q=V[D.id];q===void 0&&(q={},V[D.id]=q);let G=q[O];return G===void 0&&(G=d(l()),q[O]=G),G}function d(y){const D=[],B=[],O=[];for(let V=0;V<e;V++)D[V]=0,B[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:O,object:y,attributes:{},index:null}}function f(y,D,B,O){const V=r.attributes,q=D.attributes;let G=0;const K=B.getAttributes();for(const W in K)if(K[W].location>=0){const gt=V[W];let wt=q[W];if(wt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor)),gt===void 0||gt.attribute!==wt||wt&&gt.data!==wt.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function g(y,D,B,O){const V={},q=D.attributes;let G=0;const K=B.getAttributes();for(const W in K)if(K[W].location>=0){let gt=q[W];gt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(gt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(gt=y.instanceColor));const wt={};wt.attribute=gt,gt&&gt.data&&(wt.data=gt.data),V[W]=wt,G++}r.attributes=V,r.attributesNum=G,r.index=O}function v(){const y=r.newAttributes;for(let D=0,B=y.length;D<B;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const B=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;B[y]=1,O[y]===0&&(s.enableVertexAttribArray(y),O[y]=1),V[y]!==D&&(s.vertexAttribDivisor(y,D),V[y]=D)}function x(){const y=r.newAttributes,D=r.enabledAttributes;for(let B=0,O=D.length;B<O;B++)D[B]!==y[B]&&(s.disableVertexAttribArray(B),D[B]=0)}function M(y,D,B,O,V,q,G){G===!0?s.vertexAttribIPointer(y,D,B,V,q):s.vertexAttribPointer(y,D,B,O,V,q)}function _(y,D,B,O){v();const V=O.attributes,q=B.getAttributes(),G=D.defaultAttributeValues;for(const K in q){const W=q[K];if(W.location>=0){let lt=V[K];if(lt===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),lt!==void 0){const gt=lt.normalized,wt=lt.itemSize,kt=t.get(lt);if(kt===void 0)continue;const ne=kt.buffer,$=kt.type,st=kt.bytesPerElement,bt=$===s.INT||$===s.UNSIGNED_INT||lt.gpuType===zo;if(lt.isInterleavedBufferAttribute){const at=lt.data,Dt=at.stride,Ot=lt.offset;if(at.isInstancedInterleavedBuffer){for(let Nt=0;Nt<W.locationSize;Nt++)p(W.location+Nt,at.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Nt=0;Nt<W.locationSize;Nt++)m(W.location+Nt);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Nt=0;Nt<W.locationSize;Nt++)M(W.location+Nt,wt/W.locationSize,$,gt,Dt*st,(Ot+wt/W.locationSize*Nt)*st,bt)}else{if(lt.isInstancedBufferAttribute){for(let at=0;at<W.locationSize;at++)p(W.location+at,lt.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let at=0;at<W.locationSize;at++)m(W.location+at);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let at=0;at<W.locationSize;at++)M(W.location+at,wt/W.locationSize,$,gt,wt*st,wt/W.locationSize*at*st,bt)}}else if(G!==void 0){const gt=G[K];if(gt!==void 0)switch(gt.length){case 2:s.vertexAttrib2fv(W.location,gt);break;case 3:s.vertexAttrib3fv(W.location,gt);break;case 4:s.vertexAttrib4fv(W.location,gt);break;default:s.vertexAttrib1fv(W.location,gt)}}}}x()}function I(){P();for(const y in n){const D=n[y];for(const B in D){const O=D[B];for(const V in O)h(O[V].object),delete O[V];delete D[B]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const B in D){const O=D[B];for(const V in O)h(O[V].object),delete O[V];delete D[B]}delete n[y.id]}function R(y){for(const D in n){const B=n[D];if(B[y.id]===void 0)continue;const O=B[y.id];for(const V in O)h(O[V].object),delete O[V];delete B[y.id]}}function P(){w(),a=!0,r!==i&&(r=i,c(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function dm(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function fm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==fn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const P=R===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==zn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==yn&&!P)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:I,maxSamples:C}}function pm(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new di,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const x=r?0:n,M=x*4;let _=p.clippingState||null;l.value=_,_=h(g,d,M,f);for(let I=0;I!==M;++I)_[I]=e[I];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=f;M!==v;++M,_+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function mm(s){let t=new WeakMap;function e(a,o){return o===ja?a.mapping=is:o===Ja&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ja||o===Ja)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ed(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Zo extends wh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,Yl=[.125,.215,.35,.446,.526,.582],mi=20,ya=new Zo,Zl=new mt;let Sa=null,wa=0,ba=0,Ea=!1;const fi=(1+Math.sqrt(5))/2,Bi=1/fi,$l=[new A(-fi,Bi,0),new A(fi,Bi,0),new A(-Bi,0,fi),new A(Bi,0,fi),new A(0,fi,-Bi),new A(0,fi,Bi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class Ro{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Sa=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Sa,wa,ba),this._renderer.xr.enabled=Ea,t.scissorTest=!1,dr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sa=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:Fn,format:fn,colorSpace:cs,depthBuffer:!1},i=Kl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gm(r)),this._blurMaterial=vm(r,t,e)}return i}_compileMaterial(t){const e=new Lt(this._lodPlanes[0],t);this._renderer.compile(e,ya)}_sceneToCubeUV(t,e,n,i){const o=new Je(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Zl),h.toneMapping=Jn,h.autoClear=!1;const f=new ce({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new Lt(new Gt,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Zl),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):x===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;dr(i,x*M,p>2?M:0,M,M),h.setRenderTarget(i),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===is||t.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Lt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;dr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ya)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$l[(i-r-1)%$l.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Lt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):mi;m>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mi}`);const p=[];let x=0;for(let R=0;R<mi;++R){const P=R/v,w=Math.exp(-P*P/2);p.push(w),R===0?x+=w:R<m&&(x+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/x;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const _=this._sizeLods[i],I=3*_*(i>M-Ki?i-M+Ki:0),C=4*(this._cubeSize-_);dr(e,I,C,3*_,2*_),l.setRenderTarget(e),l.render(u,ya)}}function gm(s){const t=[],e=[],n=[];let i=s;const r=s-Ki+1+Yl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Ki?l=Yl[a-s+Ki-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,x=new Float32Array(v*g*f),M=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,P=C>2?0:-1,w=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];x.set(w,v*g*C),M.set(d,m*g*C);const y=[C,C,C,C,C,C];_.set(y,p*g*C)}const I=new Me;I.setAttribute("position",new we(x,v)),I.setAttribute("uv",new we(M,m)),I.setAttribute("faceIndex",new we(_,p)),t.push(I),i>Ki&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Kl(s,t,e){const n=new pn(s,t,e);return n.texture.mapping=Wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function vm(s,t,e){const n=new Float32Array(mi),i=new A(0,1,0);return new Ee({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:$o(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function jl(){return new Ee({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$o(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Jl(){return new Ee({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function $o(){return`

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
	`}function _m(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ja||l===Ja,h=l===is||l===ss;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Ro(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ro(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function xm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ts("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Mm(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let M=0,_=x.length;M<_;M+=3){const I=x[M+0],C=x[M+1],R=x[M+2];d.push(I,C,C,R,R,I)}}else if(g!==void 0){const x=g.array;v=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const I=M+0,C=M+1,R=M+2;d.push(I,C,C,R,R,I)}}else return;const m=new(ph(d)?yh:Mh)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function ym(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*v[x];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Sm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function wm(s,t,e){const n=new WeakMap,i=new he;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let I=o.attributes.position.count*_,C=1;I>t.maxTextureSize&&(C=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const R=new Float32Array(I*C*4*u),P=new gh(R,I,C,u);P.type=yn,P.needsUpdate=!0;const w=_*4;for(let D=0;D<u;D++){const B=p[D],O=x[D],V=M[D],q=I*C*4*D;for(let G=0;G<B.count;G++){const K=G*w;g===!0&&(i.fromBufferAttribute(B,G),R[q+K+0]=i.x,R[q+K+1]=i.y,R[q+K+2]=i.z,R[q+K+3]=0),v===!0&&(i.fromBufferAttribute(O,G),R[q+K+4]=i.x,R[q+K+5]=i.y,R[q+K+6]=i.z,R[q+K+7]=0),m===!0&&(i.fromBufferAttribute(V,G),R[q+K+8]=i.x,R[q+K+9]=i.y,R[q+K+10]=i.z,R[q+K+11]=V.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Q(I,C)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function bm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Th extends Oe{constructor(t,e,n,i,r,a,o,l,c,h=ts){if(h!==ts&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ts&&(n=xi),n===void 0&&h===as&&(n=rs),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Qe,this.minFilter=l!==void 0?l:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ah=new Oe,Ql=new Th(1,1),Ch=new gh,Rh=new hd,Ph=new bh,tc=[],ec=[],nc=new Float32Array(16),ic=new Float32Array(9),sc=new Float32Array(4);function ds(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=tc[i];if(r===void 0&&(r=new Float32Array(i),tc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Te(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ae(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function qr(s,t){let e=ec[t];e===void 0&&(e=new Int32Array(t),ec[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Em(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2fv(this.addr,t),Ae(e,t)}}function Am(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;s.uniform3fv(this.addr,t),Ae(e,t)}}function Cm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4fv(this.addr,t),Ae(e,t)}}function Rm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;sc.set(n),s.uniformMatrix2fv(this.addr,!1,sc),Ae(e,n)}}function Pm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;ic.set(n),s.uniformMatrix3fv(this.addr,!1,ic),Ae(e,n)}}function Lm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;nc.set(n),s.uniformMatrix4fv(this.addr,!1,nc),Ae(e,n)}}function Dm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Im(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2iv(this.addr,t),Ae(e,t)}}function Um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3iv(this.addr,t),Ae(e,t)}}function Nm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4iv(this.addr,t),Ae(e,t)}}function Fm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Om(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2uiv(this.addr,t),Ae(e,t)}}function Bm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3uiv(this.addr,t),Ae(e,t)}}function zm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4uiv(this.addr,t),Ae(e,t)}}function km(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ql.compareFunction=fh,r=Ql):r=Ah,e.setTexture2D(t||r,i)}function Hm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Rh,i)}function Vm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ph,i)}function Gm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ch,i)}function Wm(s){switch(s){case 5126:return Em;case 35664:return Tm;case 35665:return Am;case 35666:return Cm;case 35674:return Rm;case 35675:return Pm;case 35676:return Lm;case 5124:case 35670:return Dm;case 35667:case 35671:return Im;case 35668:case 35672:return Um;case 35669:case 35673:return Nm;case 5125:return Fm;case 36294:return Om;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Gm}}function Xm(s,t){s.uniform1fv(this.addr,t)}function qm(s,t){const e=ds(t,this.size,2);s.uniform2fv(this.addr,e)}function Ym(s,t){const e=ds(t,this.size,3);s.uniform3fv(this.addr,e)}function Zm(s,t){const e=ds(t,this.size,4);s.uniform4fv(this.addr,e)}function $m(s,t){const e=ds(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Km(s,t){const e=ds(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function jm(s,t){const e=ds(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Jm(s,t){s.uniform1iv(this.addr,t)}function Qm(s,t){s.uniform2iv(this.addr,t)}function t0(s,t){s.uniform3iv(this.addr,t)}function e0(s,t){s.uniform4iv(this.addr,t)}function n0(s,t){s.uniform1uiv(this.addr,t)}function i0(s,t){s.uniform2uiv(this.addr,t)}function s0(s,t){s.uniform3uiv(this.addr,t)}function r0(s,t){s.uniform4uiv(this.addr,t)}function a0(s,t,e){const n=this.cache,i=t.length,r=qr(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Ah,r[a])}function o0(s,t,e){const n=this.cache,i=t.length,r=qr(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Rh,r[a])}function l0(s,t,e){const n=this.cache,i=t.length,r=qr(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Ph,r[a])}function c0(s,t,e){const n=this.cache,i=t.length,r=qr(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Ch,r[a])}function h0(s){switch(s){case 5126:return Xm;case 35664:return qm;case 35665:return Ym;case 35666:return Zm;case 35674:return $m;case 35675:return Km;case 35676:return jm;case 5124:case 35670:return Jm;case 35667:case 35671:return Qm;case 35668:case 35672:return t0;case 35669:case 35673:return e0;case 5125:return n0;case 36294:return i0;case 36295:return s0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return o0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return c0}}class u0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wm(e.type)}}class d0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=h0(e.type)}}class f0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function rc(s,t){s.seq.push(t),s.map[t.id]=t}function p0(s,t,e){const n=s.name,i=n.length;for(Ta.lastIndex=0;;){const r=Ta.exec(n),a=Ta.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){rc(e,c===void 0?new u0(o,s,t):new d0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new f0(o),rc(e,u)),e=u}}}class Or{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);p0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function ac(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const m0=37297;let g0=0;function v0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const oc=new Wt;function _0(s){jt._getMatrix(oc,jt.workingColorSpace,s);const t=`mat3( ${oc.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Xr:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function lc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+v0(s.getShaderSource(t),a)}else return i}function x0(s,t){const e=_0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function M0(s,t){let e;switch(t){case jc:e="Linear";break;case Jc:e="Reinhard";break;case Qc:e="Cineon";break;case Bo:e="ACESFilmic";break;case th:e="AgX";break;case eh:e="Neutral";break;case Cu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const fr=new A;function y0(){jt.getLuminanceCoefficients(fr);const s=fr.x.toFixed(4),t=fr.y.toFixed(4),e=fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function w0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function b0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function As(s){return s!==""}function cc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function hc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const E0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Po(s){return s.replace(E0,A0)}const T0=new Map;function A0(s,t){let e=qt[t];if(e===void 0){const n=T0.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Po(e)}const C0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(s){return s.replace(C0,R0)}function R0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function dc(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function P0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Zc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===$c?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===In&&(t="SHADOWMAP_TYPE_VSM"),t}function L0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case Wr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function D0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function I0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Kc:t="ENVMAP_BLENDING_MULTIPLY";break;case Tu:t="ENVMAP_BLENDING_MIX";break;case Au:t="ENVMAP_BLENDING_ADD";break}return t}function U0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function N0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=P0(e),c=L0(e),h=D0(e),u=I0(e),d=U0(e),f=S0(e),g=w0(r),v=i.createProgram();let m,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(As).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(As).join(`
`),p.length>0&&(p+=`
`)):(m=[dc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),p=[dc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?M0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,x0("linearToOutputTexel",e.outputColorSpace),y0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(As).join(`
`)),a=Po(a),a=cc(a,e),a=hc(a,e),o=Po(o),o=cc(o,e),o=hc(o,e),a=uc(a),o=uc(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===El?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===El?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+a,_=x+p+o,I=ac(i,i.VERTEX_SHADER,M),C=ac(i,i.FRAGMENT_SHADER,_);i.attachShader(v,I),i.attachShader(v,C),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(D){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(v).trim(),O=i.getShaderInfoLog(I).trim(),V=i.getShaderInfoLog(C).trim();let q=!0,G=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,I,C);else{const K=lc(i,I,"vertex"),W=lc(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+K+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||V==="")&&(G=!1);G&&(D.diagnostics={runnable:q,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(I),i.deleteShader(C),P=new Or(i,v),w=b0(i,v)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,m0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=g0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=C,this}let F0=0;class O0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new B0(t),e.set(t,n)),n}}class B0{constructor(t){this.id=F0++,this.code=t,this.usedTimes=0}}function z0(s,t,e,n,i,r,a){const o=new _h,l=new O0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,D,B,O){const V=B.fog,q=O.geometry,G=w.isMeshStandardMaterial?B.environment:null,K=(w.isMeshStandardMaterial?e:t).get(w.envMap||G),W=K&&K.mapping===Wr?K.image.height:null,lt=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const gt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,wt=gt!==void 0?gt.length:0;let kt=0;q.morphAttributes.position!==void 0&&(kt=1),q.morphAttributes.normal!==void 0&&(kt=2),q.morphAttributes.color!==void 0&&(kt=3);let ne,$,st,bt;if(lt){const re=xn[lt];ne=re.vertexShader,$=re.fragmentShader}else ne=w.vertexShader,$=w.fragmentShader,l.update(w),st=l.getVertexShaderID(w),bt=l.getFragmentShaderID(w);const at=s.getRenderTarget(),Dt=s.state.buffers.depth.getReversed(),Ot=O.isInstancedMesh===!0,Nt=O.isBatchedMesh===!0,Qt=!!w.map,J=!!w.matcap,it=!!K,L=!!w.aoMap,Rt=!!w.lightMap,et=!!w.bumpMap,xt=!!w.normalMap,ot=!!w.displacementMap,It=!!w.emissiveMap,vt=!!w.metalnessMap,T=!!w.roughnessMap,S=w.anisotropy>0,z=w.clearcoat>0,Y=w.dispersion>0,tt=w.iridescence>0,Z=w.sheen>0,Et=w.transmission>0,ht=S&&!!w.anisotropyMap,_t=z&&!!w.clearcoatMap,Zt=z&&!!w.clearcoatNormalMap,nt=z&&!!w.clearcoatRoughnessMap,Mt=tt&&!!w.iridescenceMap,Ut=tt&&!!w.iridescenceThicknessMap,Ft=Z&&!!w.sheenColorMap,yt=Z&&!!w.sheenRoughnessMap,Kt=!!w.specularMap,Xt=!!w.specularColorMap,de=!!w.specularIntensityMap,U=Et&&!!w.transmissionMap,ut=Et&&!!w.thicknessMap,X=!!w.gradientMap,j=!!w.alphaMap,pt=w.alphaTest>0,dt=!!w.alphaHash,Ht=!!w.extensions;let _e=Jn;w.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(_e=s.toneMapping);const Ie={shaderID:lt,shaderType:w.type,shaderName:w.name,vertexShader:ne,fragmentShader:$,defines:w.defines,customVertexShaderID:st,customFragmentShaderID:bt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&O._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&O.instanceColor!==null,instancingMorph:Ot&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:cs,alphaToCoverage:!!w.alphaToCoverage,map:Qt,matcap:J,envMap:it,envMapMode:it&&K.mapping,envMapCubeUVHeight:W,aoMap:L,lightMap:Rt,bumpMap:et,normalMap:xt,displacementMap:d&&ot,emissiveMap:It,normalMapObjectSpace:xt&&w.normalMapType===Du,normalMapTangentSpace:xt&&w.normalMapType===dh,metalnessMap:vt,roughnessMap:T,anisotropy:S,anisotropyMap:ht,clearcoat:z,clearcoatMap:_t,clearcoatNormalMap:Zt,clearcoatRoughnessMap:nt,dispersion:Y,iridescence:tt,iridescenceMap:Mt,iridescenceThicknessMap:Ut,sheen:Z,sheenColorMap:Ft,sheenRoughnessMap:yt,specularMap:Kt,specularColorMap:Xt,specularIntensityMap:de,transmission:Et,transmissionMap:U,thicknessMap:ut,gradientMap:X,opaque:w.transparent===!1&&w.blending===Qi&&w.alphaToCoverage===!1,alphaMap:j,alphaTest:pt,alphaHash:dt,combine:w.combine,mapUv:Qt&&v(w.map.channel),aoMapUv:L&&v(w.aoMap.channel),lightMapUv:Rt&&v(w.lightMap.channel),bumpMapUv:et&&v(w.bumpMap.channel),normalMapUv:xt&&v(w.normalMap.channel),displacementMapUv:ot&&v(w.displacementMap.channel),emissiveMapUv:It&&v(w.emissiveMap.channel),metalnessMapUv:vt&&v(w.metalnessMap.channel),roughnessMapUv:T&&v(w.roughnessMap.channel),anisotropyMapUv:ht&&v(w.anisotropyMap.channel),clearcoatMapUv:_t&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:yt&&v(w.sheenRoughnessMap.channel),specularMapUv:Kt&&v(w.specularMap.channel),specularColorMapUv:Xt&&v(w.specularColorMap.channel),specularIntensityMapUv:de&&v(w.specularIntensityMap.channel),transmissionMapUv:U&&v(w.transmissionMap.channel),thicknessMapUv:ut&&v(w.thicknessMap.channel),alphaMapUv:j&&v(w.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(xt||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(Qt||j),fog:!!V,useFog:w.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:kt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:_e,decodeVideoTexture:Qt&&w.map.isVideoTexture===!0&&jt.getTransfer(w.map.colorSpace)===ae,decodeVideoTextureEmissive:It&&w.emissiveMap.isVideoTexture===!0&&jt.getTransfer(w.emissiveMap.colorSpace)===ae,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===He,flipSided:w.side===Ve,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ht&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&w.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)y.push(D),y.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(x(y,w),M(y,w),y.push(s.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function x(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function M(w,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),w.push(o.mask)}function _(w){const y=g[w.type];let D;if(y){const B=xn[y];D=Os.clone(B.uniforms)}else D=w.uniforms;return D}function I(w,y){let D;for(let B=0,O=h.length;B<O;B++){const V=h[B];if(V.cacheKey===y){D=V,++D.usedTimes;break}}return D===void 0&&(D=new N0(s,y,w,r),h.push(D)),D}function C(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function R(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:I,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:P}}function k0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function H0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function fc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function pc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||H0),n.length>1&&n.sort(d||fc),i.length>1&&i.sort(d||fc)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function V0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new pc,s.set(n,[a])):i>=r.length?(a=new pc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function G0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new mt};break;case"SpotLight":e={position:new A,direction:new A,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":e={color:new mt,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function W0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let X0=0;function q0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Y0(s){const t=new G0,e=W0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,r=new $t,a=new $t;function o(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,x=0,M=0,_=0,I=0,C=0,R=0;c.sort(q0);for(let w=0,y=c.length;w<y;w++){const D=c[w],B=D.color,O=D.intensity,V=D.distance,q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*O,u+=B.g*O,d+=B.b*O;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],O);R++}else if(D.isDirectionalLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const K=D.shadow,W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=D.shadow.matrix,x++}n.directional[f]=G,f++}else if(D.isSpotLight){const G=t.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(B).multiplyScalar(O),G.distance=V,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[v]=G;const K=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,K.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[v]=K.matrix,D.castShadow){const W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=q,_++}v++}else if(D.isRectAreaLight){const G=t.get(D);G.color.copy(B).multiplyScalar(O),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=G,m++}else if(D.isPointLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const K=D.shadow,W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=G,g++}else if(D.isHemisphereLight){const G=t.get(D);G.skyColor.copy(D.color).multiplyScalar(O),G.groundColor.copy(D.groundColor).multiplyScalar(O),n.hemi[p]=G,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==x||P.numPointShadows!==M||P.numSpotShadows!==_||P.numSpotMaps!==I||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+I-C,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=x,P.numPointShadows=M,P.numSpotShadows=_,P.numSpotMaps=I,P.numLightProbes=R,n.version=X0++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const M=c[p];if(M.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(M.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function mc(s){const t=new Y0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Z0(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new mc(s),t.set(i,[o])):r>=a.length?(o=new mc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class $0 extends wi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Pu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class K0 extends wi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const j0=`void main() {
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
}`;function Q0(s,t,e){let n=new Yo;const i=new Q,r=new Q,a=new he,o=new $0({depthPacking:Lu}),l=new K0,c={},h=e.maxTextureSize,u={[Qn]:Ve,[Ve]:Qn,[He]:He},d=new Ee({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:j0,fragmentShader:J0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Lt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zc;let p=this.type;this.render=function(C,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const w=s.getRenderTarget(),y=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Nn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=p!==In&&this.type===In,V=p===In&&this.type!==In;for(let q=0,G=C.length;q<G;q++){const K=C[q],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const lt=W.getFrameExtents();if(i.multiply(lt),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/lt.x),i.x=r.x*lt.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/lt.y),i.y=r.y*lt.y,W.mapSize.y=r.y)),W.map===null||O===!0||V===!0){const wt=this.type!==In?{minFilter:Qe,magFilter:Qe}:{};W.map!==null&&W.map.dispose(),W.map=new pn(i.x,i.y,wt),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const gt=W.getViewportCount();for(let wt=0;wt<gt;wt++){const kt=W.getViewport(wt);a.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),B.viewport(a),W.updateMatrices(K,wt),n=W.getFrustum(),_(R,P,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===In&&x(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,y,D)};function x(C,R){const P=t.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(R,null,P,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(R,null,P,f,v,null)}function M(C,R,P,w){let y=null;const D=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)y=D;else if(y=P.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const B=y.uuid,O=R.uuid;let V=c[B];V===void 0&&(V={},c[B]=V);let q=V[O];q===void 0&&(q=y.clone(),V[O]=q,R.addEventListener("dispose",I)),y=q}if(y.visible=R.visible,y.wireframe=R.wireframe,w===In?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=s.properties.get(y);B.light=P}return y}function _(C,R,P,w,y){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===In)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const O=t.update(C),V=C.material;if(Array.isArray(V)){const q=O.groups;for(let G=0,K=q.length;G<K;G++){const W=q[G],lt=V[W.materialIndex];if(lt&&lt.visible){const gt=M(C,lt,w,y);C.onBeforeShadow(s,C,R,P,O,gt,W),s.renderBufferDirect(P,null,O,gt,C,W),C.onAfterShadow(s,C,R,P,O,gt,W)}}}else if(V.visible){const q=M(C,V,w,y);C.onBeforeShadow(s,C,R,P,O,q,null),s.renderBufferDirect(P,null,O,q,C,null),C.onAfterShadow(s,C,R,P,O,q,null)}}const B=C.children;for(let O=0,V=B.length;O<V;O++)_(B[O],R,P,w,y)}function I(C){C.target.removeEventListener("dispose",I);for(const P in c){const w=c[P],y=C.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const tg={[Wa]:Xa,[qa]:$a,[Ya]:Ka,[ns]:Za,[Xa]:Wa,[$a]:qa,[Ka]:Ya,[Za]:ns};function eg(s,t){function e(){let U=!1;const ut=new he;let X=null;const j=new he(0,0,0,0);return{setMask:function(pt){X!==pt&&!U&&(s.colorMask(pt,pt,pt,pt),X=pt)},setLocked:function(pt){U=pt},setClear:function(pt,dt,Ht,_e,Ie){Ie===!0&&(pt*=_e,dt*=_e,Ht*=_e),ut.set(pt,dt,Ht,_e),j.equals(ut)===!1&&(s.clearColor(pt,dt,Ht,_e),j.copy(ut))},reset:function(){U=!1,X=null,j.set(-1,0,0,0)}}}function n(){let U=!1,ut=!1,X=null,j=null,pt=null;return{setReversed:function(dt){if(ut!==dt){const Ht=t.get("EXT_clip_control");ut?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const _e=pt;pt=null,this.setClear(_e)}ut=dt},getReversed:function(){return ut},setTest:function(dt){dt?at(s.DEPTH_TEST):Dt(s.DEPTH_TEST)},setMask:function(dt){X!==dt&&!U&&(s.depthMask(dt),X=dt)},setFunc:function(dt){if(ut&&(dt=tg[dt]),j!==dt){switch(dt){case Wa:s.depthFunc(s.NEVER);break;case Xa:s.depthFunc(s.ALWAYS);break;case qa:s.depthFunc(s.LESS);break;case ns:s.depthFunc(s.LEQUAL);break;case Ya:s.depthFunc(s.EQUAL);break;case Za:s.depthFunc(s.GEQUAL);break;case $a:s.depthFunc(s.GREATER);break;case Ka:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=dt}},setLocked:function(dt){U=dt},setClear:function(dt){pt!==dt&&(ut&&(dt=1-dt),s.clearDepth(dt),pt=dt)},reset:function(){U=!1,X=null,j=null,pt=null,ut=!1}}}function i(){let U=!1,ut=null,X=null,j=null,pt=null,dt=null,Ht=null,_e=null,Ie=null;return{setTest:function(re){U||(re?at(s.STENCIL_TEST):Dt(s.STENCIL_TEST))},setMask:function(re){ut!==re&&!U&&(s.stencilMask(re),ut=re)},setFunc:function(re,rn,En){(X!==re||j!==rn||pt!==En)&&(s.stencilFunc(re,rn,En),X=re,j=rn,pt=En)},setOp:function(re,rn,En){(dt!==re||Ht!==rn||_e!==En)&&(s.stencilOp(re,rn,En),dt=re,Ht=rn,_e=En)},setLocked:function(re){U=re},setClear:function(re){Ie!==re&&(s.clearStencil(re),Ie=re)},reset:function(){U=!1,ut=null,X=null,j=null,pt=null,dt=null,Ht=null,_e=null,Ie=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,x=null,M=null,_=null,I=null,C=null,R=new mt(0,0,0),P=0,w=!1,y=null,D=null,B=null,O=null,V=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=K>=2);let lt=null,gt={};const wt=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),ne=new he().fromArray(wt),$=new he().fromArray(kt);function st(U,ut,X,j){const pt=new Uint8Array(4),dt=s.createTexture();s.bindTexture(U,dt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<X;Ht++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ut+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return dt}const bt={};bt[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),bt[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),bt[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(s.DEPTH_TEST),a.setFunc(ns),et(!1),xt(yl),at(s.CULL_FACE),L(Nn);function at(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function Dt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Ot(U,ut){return u[U]!==ut?(s.bindFramebuffer(U,ut),u[U]=ut,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ut),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function Nt(U,ut){let X=f,j=!1;if(U){X=d.get(ut),X===void 0&&(X=[],d.set(ut,X));const pt=U.textures;if(X.length!==pt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Ht=pt.length;dt<Ht;dt++)X[dt]=s.COLOR_ATTACHMENT0+dt;X.length=pt.length,j=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,j=!0);j&&s.drawBuffers(X)}function Qt(U){return g!==U?(s.useProgram(U),g=U,!0):!1}const J={[pi]:s.FUNC_ADD,[cu]:s.FUNC_SUBTRACT,[hu]:s.FUNC_REVERSE_SUBTRACT};J[uu]=s.MIN,J[du]=s.MAX;const it={[fu]:s.ZERO,[pu]:s.ONE,[mu]:s.SRC_COLOR,[Va]:s.SRC_ALPHA,[yu]:s.SRC_ALPHA_SATURATE,[xu]:s.DST_COLOR,[vu]:s.DST_ALPHA,[gu]:s.ONE_MINUS_SRC_COLOR,[Ga]:s.ONE_MINUS_SRC_ALPHA,[Mu]:s.ONE_MINUS_DST_COLOR,[_u]:s.ONE_MINUS_DST_ALPHA,[Su]:s.CONSTANT_COLOR,[wu]:s.ONE_MINUS_CONSTANT_COLOR,[bu]:s.CONSTANT_ALPHA,[Eu]:s.ONE_MINUS_CONSTANT_ALPHA};function L(U,ut,X,j,pt,dt,Ht,_e,Ie,re){if(U===Nn){v===!0&&(Dt(s.BLEND),v=!1);return}if(v===!1&&(at(s.BLEND),v=!0),U!==lu){if(U!==m||re!==w){if((p!==pi||_!==pi)&&(s.blendEquation(s.FUNC_ADD),p=pi,_=pi),re)switch(U){case Qi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bn:s.blendFunc(s.ONE,s.ONE);break;case Sl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Qi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Sl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,M=null,I=null,C=null,R.set(0,0,0),P=0,m=U,w=re}return}pt=pt||ut,dt=dt||X,Ht=Ht||j,(ut!==p||pt!==_)&&(s.blendEquationSeparate(J[ut],J[pt]),p=ut,_=pt),(X!==x||j!==M||dt!==I||Ht!==C)&&(s.blendFuncSeparate(it[X],it[j],it[dt],it[Ht]),x=X,M=j,I=dt,C=Ht),(_e.equals(R)===!1||Ie!==P)&&(s.blendColor(_e.r,_e.g,_e.b,Ie),R.copy(_e),P=Ie),m=U,w=!1}function Rt(U,ut){U.side===He?Dt(s.CULL_FACE):at(s.CULL_FACE);let X=U.side===Ve;ut&&(X=!X),et(X),U.blending===Qi&&U.transparent===!1?L(Nn):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const j=U.stencilWrite;o.setTest(j),j&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),It(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?at(s.SAMPLE_ALPHA_TO_COVERAGE):Dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(U){y!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),y=U)}function xt(U){U!==au?(at(s.CULL_FACE),U!==D&&(U===yl?s.cullFace(s.BACK):U===ou?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Dt(s.CULL_FACE),D=U}function ot(U){U!==B&&(G&&s.lineWidth(U),B=U)}function It(U,ut,X){U?(at(s.POLYGON_OFFSET_FILL),(O!==ut||V!==X)&&(s.polygonOffset(ut,X),O=ut,V=X)):Dt(s.POLYGON_OFFSET_FILL)}function vt(U){U?at(s.SCISSOR_TEST):Dt(s.SCISSOR_TEST)}function T(U){U===void 0&&(U=s.TEXTURE0+q-1),lt!==U&&(s.activeTexture(U),lt=U)}function S(U,ut,X){X===void 0&&(lt===null?X=s.TEXTURE0+q-1:X=lt);let j=gt[X];j===void 0&&(j={type:void 0,texture:void 0},gt[X]=j),(j.type!==U||j.texture!==ut)&&(lt!==X&&(s.activeTexture(X),lt=X),s.bindTexture(U,ut||bt[U]),j.type=U,j.texture=ut)}function z(){const U=gt[lt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Y(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){ne.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ne.copy(U))}function yt(U){$.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function Kt(U,ut){let X=c.get(ut);X===void 0&&(X=new WeakMap,c.set(ut,X));let j=X.get(U);j===void 0&&(j=s.getUniformBlockIndex(ut,U.name),X.set(U,j))}function Xt(U,ut){const j=c.get(ut).get(U);l.get(ut)!==j&&(s.uniformBlockBinding(ut,j,U.__bindingPointIndex),l.set(ut,j))}function de(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},lt=null,gt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,x=null,M=null,_=null,I=null,C=null,R=new mt(0,0,0),P=0,w=!1,y=null,D=null,B=null,O=null,V=null,ne.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:Dt,bindFramebuffer:Ot,drawBuffers:Nt,useProgram:Qt,setBlending:L,setMaterial:Rt,setFlipSided:et,setCullFace:xt,setLineWidth:ot,setPolygonOffset:It,setScissorTest:vt,activeTexture:T,bindTexture:S,unbindTexture:z,compressedTexImage2D:Y,compressedTexImage3D:tt,texImage2D:Mt,texImage3D:Ut,updateUBOMapping:Kt,uniformBlockBinding:Xt,texStorage2D:Zt,texStorage3D:nt,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:ht,compressedTexSubImage3D:_t,scissor:Ft,viewport:yt,reset:de}}function gc(s,t,e,n){const i=ng(n);switch(e){case ah:return s*t;case lh:return s*t;case ch:return s*t*2;case Vo:return s*t/i.components*i.byteLength;case Go:return s*t/i.components*i.byteLength;case hh:return s*t*2/i.components*i.byteLength;case Wo:return s*t*2/i.components*i.byteLength;case oh:return s*t*3/i.components*i.byteLength;case fn:return s*t*4/i.components*i.byteLength;case Xo:return s*t*4/i.components*i.byteLength;case Dr:case Ir:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case no:case so:return Math.max(s,16)*Math.max(t,8)/4;case eo:case io:return Math.max(s,8)*Math.max(t,8)/2;case ro:case ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case lo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case co:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ho:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case uo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case fo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case po:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case mo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case go:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case vo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case _o:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case xo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case yo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case So:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Fr:case wo:case bo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case uh:case Eo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case To:case Ao:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ng(s){switch(s){case zn:case ih:return{byteLength:1,components:1};case Ns:case sh:case Fn:return{byteLength:2,components:1};case ko:case Ho:return{byteLength:2,components:4};case xi:case zo:case yn:return{byteLength:4,components:1};case rh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function ig(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Q,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return f?new OffscreenCanvas(T,S):Hr("canvas")}function v(T,S,z){let Y=1;const tt=vt(T);if((tt.width>z||tt.height>z)&&(Y=z/Math.max(tt.width,tt.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Z=Math.floor(Y*tt.width),Et=Math.floor(Y*tt.height);u===void 0&&(u=g(Z,Et));const ht=S?g(Z,Et):u;return ht.width=Z,ht.height=Et,ht.getContext("2d").drawImage(T,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Z+"x"+Et+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){s.generateMipmap(T)}function x(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(T,S,z,Y,tt=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=S;if(S===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8)),S===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),S===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8)),S===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),S===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),z===s.UNSIGNED_INT&&(Z=s.RGB32UI),z===s.BYTE&&(Z=s.RGB8I),z===s.SHORT&&(Z=s.RGB16I),z===s.INT&&(Z=s.RGB32I)),S===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),z===s.UNSIGNED_INT&&(Z=s.RGBA32UI),z===s.BYTE&&(Z=s.RGBA8I),z===s.SHORT&&(Z=s.RGBA16I),z===s.INT&&(Z=s.RGBA32I)),S===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),S===s.RGBA){const Et=tt?Xr:jt.getTransfer(Y);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=Et===ae?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(T,S){let z;return T?S===null||S===xi||S===rs?z=s.DEPTH24_STENCIL8:S===yn?z=s.DEPTH32F_STENCIL8:S===Ns&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===xi||S===rs?z=s.DEPTH_COMPONENT24:S===yn?z=s.DEPTH_COMPONENT32F:S===Ns&&(z=s.DEPTH_COMPONENT16),z}function I(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Qe&&T.minFilter!==Mn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function C(T){const S=T.target;S.removeEventListener("dispose",C),P(S),S.isVideoTexture&&h.delete(S)}function R(T){const S=T.target;S.removeEventListener("dispose",R),y(S)}function P(T){const S=n.get(T);if(S.__webglInit===void 0)return;const z=T.source,Y=d.get(z);if(Y){const tt=Y[S.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(T),Object.keys(Y).length===0&&d.delete(z)}n.remove(T)}function w(T){const S=n.get(T);s.deleteTexture(S.__webglTexture);const z=T.source,Y=d.get(z);delete Y[S.__cacheKey],a.memory.textures--}function y(T){const S=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let tt=0;tt<S.__webglFramebuffer[Y].length;tt++)s.deleteFramebuffer(S.__webglFramebuffer[Y][tt]);else s.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)s.deleteFramebuffer(S.__webglFramebuffer[Y]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=T.textures;for(let Y=0,tt=z.length;Y<tt;Y++){const Z=n.get(z[Y]);Z.__webglTexture&&(s.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(z[Y])}n.remove(T)}let D=0;function B(){D=0}function O(){const T=D;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),D+=1,T}function V(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function q(T,S){const z=n.get(T);if(T.isVideoTexture&&ot(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(z,T,S);return}}e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+S)}function G(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){$(z,T,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+S)}function K(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){$(z,T,S);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+S)}function W(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){st(z,T,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+S)}const lt={[Qa]:s.REPEAT,[gi]:s.CLAMP_TO_EDGE,[to]:s.MIRRORED_REPEAT},gt={[Qe]:s.NEAREST,[Ru]:s.NEAREST_MIPMAP_NEAREST,[qs]:s.NEAREST_MIPMAP_LINEAR,[Mn]:s.LINEAR,[ta]:s.LINEAR_MIPMAP_NEAREST,[vi]:s.LINEAR_MIPMAP_LINEAR},wt={[Iu]:s.NEVER,[zu]:s.ALWAYS,[Uu]:s.LESS,[fh]:s.LEQUAL,[Nu]:s.EQUAL,[Bu]:s.GEQUAL,[Fu]:s.GREATER,[Ou]:s.NOTEQUAL};function kt(T,S){if(S.type===yn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Mn||S.magFilter===ta||S.magFilter===qs||S.magFilter===vi||S.minFilter===Mn||S.minFilter===ta||S.minFilter===qs||S.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,lt[S.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,lt[S.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,lt[S.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,gt[S.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,gt[S.minFilter]),S.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,wt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Qe||S.minFilter!==qs&&S.minFilter!==vi||S.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ne(T,S){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",C));const Y=S.source;let tt=d.get(Y);tt===void 0&&(tt={},d.set(Y,tt));const Z=V(S);if(Z!==T.__cacheKey){tt[Z]===void 0&&(tt[Z]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),tt[Z].usedTimes++;const Et=tt[T.__cacheKey];Et!==void 0&&(tt[T.__cacheKey].usedTimes--,Et.usedTimes===0&&w(S)),T.__cacheKey=Z,T.__webglTexture=tt[Z].texture}return z}function $(T,S,z){let Y=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=s.TEXTURE_3D);const tt=ne(T,S),Z=S.source;e.bindTexture(Y,T.__webglTexture,s.TEXTURE0+z);const Et=n.get(Z);if(Z.version!==Et.__version||tt===!0){e.activeTexture(s.TEXTURE0+z);const ht=jt.getPrimaries(jt.workingColorSpace),_t=S.colorSpace===jn?null:jt.getPrimaries(S.colorSpace),Zt=S.colorSpace===jn||ht===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let nt=v(S.image,!1,i.maxTextureSize);nt=It(S,nt);const Mt=r.convert(S.format,S.colorSpace),Ut=r.convert(S.type);let Ft=M(S.internalFormat,Mt,Ut,S.colorSpace,S.isVideoTexture);kt(Y,S);let yt;const Kt=S.mipmaps,Xt=S.isVideoTexture!==!0,de=Et.__version===void 0||tt===!0,U=Z.dataReady,ut=I(S,nt);if(S.isDepthTexture)Ft=_(S.format===as,S.type),de&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Ft,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,Mt,Ut,null));else if(S.isDataTexture)if(Kt.length>0){Xt&&de&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,Kt[0].width,Kt[0].height);for(let X=0,j=Kt.length;X<j;X++)yt=Kt[X],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,yt.width,yt.height,Mt,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,X,Ft,yt.width,yt.height,0,Mt,Ut,yt.data);S.generateMipmaps=!1}else Xt?(de&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,nt.width,nt.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,Mt,Ut,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,Mt,Ut,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xt&&de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Ft,Kt[0].width,Kt[0].height,nt.depth);for(let X=0,j=Kt.length;X<j;X++)if(yt=Kt[X],S.format!==fn)if(Mt!==null)if(Xt){if(U)if(S.layerUpdates.size>0){const pt=gc(yt.width,yt.height,S.format,S.type);for(const dt of S.layerUpdates){const Ht=yt.data.subarray(dt*pt/yt.data.BYTES_PER_ELEMENT,(dt+1)*pt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,dt,yt.width,yt.height,1,Mt,Ht)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,yt.width,yt.height,nt.depth,Mt,yt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Ft,yt.width,yt.height,nt.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,yt.width,yt.height,nt.depth,Mt,Ut,yt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Ft,yt.width,yt.height,nt.depth,0,Mt,Ut,yt.data)}else{Xt&&de&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,Kt[0].width,Kt[0].height);for(let X=0,j=Kt.length;X<j;X++)yt=Kt[X],S.format!==fn?Mt!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,yt.width,yt.height,Mt,yt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Ft,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,yt.width,yt.height,Mt,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,X,Ft,yt.width,yt.height,0,Mt,Ut,yt.data)}else if(S.isDataArrayTexture)if(Xt){if(de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Ft,nt.width,nt.height,nt.depth),U)if(S.layerUpdates.size>0){const X=gc(nt.width,nt.height,S.format,S.type);for(const j of S.layerUpdates){const pt=nt.data.subarray(j*X/nt.data.BYTES_PER_ELEMENT,(j+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,Mt,Ut,pt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Mt,Ut,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ft,nt.width,nt.height,nt.depth,0,Mt,Ut,nt.data);else if(S.isData3DTexture)Xt?(de&&e.texStorage3D(s.TEXTURE_3D,ut,Ft,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Mt,Ut,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Ft,nt.width,nt.height,nt.depth,0,Mt,Ut,nt.data);else if(S.isFramebufferTexture){if(de)if(Xt)e.texStorage2D(s.TEXTURE_2D,ut,Ft,nt.width,nt.height);else{let X=nt.width,j=nt.height;for(let pt=0;pt<ut;pt++)e.texImage2D(s.TEXTURE_2D,pt,Ft,X,j,0,Mt,Ut,null),X>>=1,j>>=1}}else if(Kt.length>0){if(Xt&&de){const X=vt(Kt[0]);e.texStorage2D(s.TEXTURE_2D,ut,Ft,X.width,X.height)}for(let X=0,j=Kt.length;X<j;X++)yt=Kt[X],Xt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt,Ut,yt):e.texImage2D(s.TEXTURE_2D,X,Ft,Mt,Ut,yt);S.generateMipmaps=!1}else if(Xt){if(de){const X=vt(nt);e.texStorage2D(s.TEXTURE_2D,ut,Ft,X.width,X.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,Ut,nt)}else e.texImage2D(s.TEXTURE_2D,0,Ft,Mt,Ut,nt);m(S)&&p(Y),Et.__version=Z.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function st(T,S,z){if(S.image.length!==6)return;const Y=ne(T,S),tt=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+z);const Z=n.get(tt);if(tt.version!==Z.__version||Y===!0){e.activeTexture(s.TEXTURE0+z);const Et=jt.getPrimaries(jt.workingColorSpace),ht=S.colorSpace===jn?null:jt.getPrimaries(S.colorSpace),_t=S.colorSpace===jn||Et===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Zt=S.isCompressedTexture||S.image[0].isCompressedTexture,nt=S.image[0]&&S.image[0].isDataTexture,Mt=[];for(let j=0;j<6;j++)!Zt&&!nt?Mt[j]=v(S.image[j],!0,i.maxCubemapSize):Mt[j]=nt?S.image[j].image:S.image[j],Mt[j]=It(S,Mt[j]);const Ut=Mt[0],Ft=r.convert(S.format,S.colorSpace),yt=r.convert(S.type),Kt=M(S.internalFormat,Ft,yt,S.colorSpace),Xt=S.isVideoTexture!==!0,de=Z.__version===void 0||Y===!0,U=tt.dataReady;let ut=I(S,Ut);kt(s.TEXTURE_CUBE_MAP,S);let X;if(Zt){Xt&&de&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,Kt,Ut.width,Ut.height);for(let j=0;j<6;j++){X=Mt[j].mipmaps;for(let pt=0;pt<X.length;pt++){const dt=X[pt];S.format!==fn?Ft!==null?Xt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Ft,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Kt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Ft,yt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Kt,dt.width,dt.height,0,Ft,yt,dt.data)}}}else{if(X=S.mipmaps,Xt&&de){X.length>0&&ut++;const j=vt(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,Kt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Mt[j].width,Mt[j].height,Ft,yt,Mt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Kt,Mt[j].width,Mt[j].height,0,Ft,yt,Mt[j].data);for(let pt=0;pt<X.length;pt++){const Ht=X[pt].image[j].image;Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Ht.width,Ht.height,Ft,yt,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Kt,Ht.width,Ht.height,0,Ft,yt,Ht.data)}}else{Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ft,yt,Mt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Kt,Ft,yt,Mt[j]);for(let pt=0;pt<X.length;pt++){const dt=X[pt];Xt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Ft,yt,dt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Kt,Ft,yt,dt.image[j])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),Z.__version=tt.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function bt(T,S,z,Y,tt,Z){const Et=r.convert(z.format,z.colorSpace),ht=r.convert(z.type),_t=M(z.internalFormat,Et,ht,z.colorSpace),Zt=n.get(S),nt=n.get(z);if(nt.__renderTarget=S,!Zt.__hasExternalTextures){const Mt=Math.max(1,S.width>>Z),Ut=Math.max(1,S.height>>Z);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,Z,_t,Mt,Ut,S.depth,0,Et,ht,null):e.texImage2D(tt,Z,_t,Mt,Ut,0,Et,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),xt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,tt,nt.__webglTexture,0,et(S)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,tt,nt.__webglTexture,Z),e.bindFramebuffer(s.FRAMEBUFFER,null)}function at(T,S,z){if(s.bindRenderbuffer(s.RENDERBUFFER,T),S.depthBuffer){const Y=S.depthTexture,tt=Y&&Y.isDepthTexture?Y.type:null,Z=_(S.stencilBuffer,tt),Et=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=et(S);xt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,Z,S.width,S.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,Z,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Z,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,T)}else{const Y=S.textures;for(let tt=0;tt<Y.length;tt++){const Z=Y[tt],Et=r.convert(Z.format,Z.colorSpace),ht=r.convert(Z.type),_t=M(Z.internalFormat,Et,ht,Z.colorSpace),Zt=et(S);z&&xt(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,_t,S.width,S.height):xt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt,_t,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,_t,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Dt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(S.depthTexture);Y.__renderTarget=S,(!Y.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q(S.depthTexture,0);const tt=Y.__webglTexture,Z=et(S);if(S.depthTexture.format===ts)xt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(S.depthTexture.format===as)xt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ot(T){const S=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const tt=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",tt)};Y.addEventListener("dispose",tt),S.__depthDisposeCallback=tt}S.__boundDepthTexture=Y}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Dt(S.__webglFramebuffer,T)}else if(z){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=s.createRenderbuffer(),at(S.__webglDepthbuffer[Y],T,!1);else{const tt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[Y];s.bindRenderbuffer(s.RENDERBUFFER,Z),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),at(S.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(T,S,z){const Y=n.get(T);S!==void 0&&bt(Y.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Ot(T)}function Qt(T){const S=T.texture,z=n.get(T),Y=n.get(S);T.addEventListener("dispose",R);const tt=T.textures,Z=T.isWebGLCubeRenderTarget===!0,Et=tt.length>1;if(Et||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=S.version,a.memory.textures++),Z){z.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[ht]=[];for(let _t=0;_t<S.mipmaps.length;_t++)z.__webglFramebuffer[ht][_t]=s.createFramebuffer()}else z.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let ht=0;ht<S.mipmaps.length;ht++)z.__webglFramebuffer[ht]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Et)for(let ht=0,_t=tt.length;ht<_t;ht++){const Zt=n.get(tt[ht]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=s.createTexture(),a.memory.textures++)}if(T.samples>0&&xt(T)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ht=0;ht<tt.length;ht++){const _t=tt[ht];z.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[ht]);const Zt=r.convert(_t.format,_t.colorSpace),nt=r.convert(_t.type),Mt=M(_t.internalFormat,Zt,nt,_t.colorSpace,T.isXRRenderTarget===!0),Ut=et(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,Mt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,z.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),at(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),kt(s.TEXTURE_CUBE_MAP,S);for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0)for(let _t=0;_t<S.mipmaps.length;_t++)bt(z.__webglFramebuffer[ht][_t],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,_t);else bt(z.__webglFramebuffer[ht],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(S)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ht=0,_t=tt.length;ht<_t;ht++){const Zt=tt[ht],nt=n.get(Zt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),kt(s.TEXTURE_2D,Zt),bt(z.__webglFramebuffer,T,Zt,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),m(Zt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,Y.__webglTexture),kt(ht,S),S.mipmaps&&S.mipmaps.length>0)for(let _t=0;_t<S.mipmaps.length;_t++)bt(z.__webglFramebuffer[_t],T,S,s.COLOR_ATTACHMENT0,ht,_t);else bt(z.__webglFramebuffer,T,S,s.COLOR_ATTACHMENT0,ht,0);m(S)&&p(ht),e.unbindTexture()}T.depthBuffer&&Ot(T)}function J(T){const S=T.textures;for(let z=0,Y=S.length;z<Y;z++){const tt=S[z];if(m(tt)){const Z=x(T),Et=n.get(tt).__webglTexture;e.bindTexture(Z,Et),p(Z),e.unbindTexture()}}}const it=[],L=[];function Rt(T){if(T.samples>0){if(xt(T)===!1){const S=T.textures,z=T.width,Y=T.height;let tt=s.COLOR_BUFFER_BIT;const Z=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(T),ht=S.length>1;if(ht)for(let _t=0;_t<S.length;_t++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let _t=0;_t<S.length;_t++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[_t]);const Zt=n.get(S[_t]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Zt,0)}s.blitFramebuffer(0,0,z,Y,0,0,z,Y,tt,s.NEAREST),l===!0&&(it.length=0,L.length=0,it.push(s.COLOR_ATTACHMENT0+_t),T.depthBuffer&&T.resolveDepthBuffer===!1&&(it.push(Z),L.push(Z),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let _t=0;_t<S.length;_t++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,Et.__webglColorRenderbuffer[_t]);const Zt=n.get(S[_t]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,Zt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const S=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function et(T){return Math.min(i.maxSamples,T.samples)}function xt(T){const S=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ot(T){const S=a.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function It(T,S){const z=T.colorSpace,Y=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==cs&&z!==jn&&(jt.getTransfer(z)===ae?(Y!==fn||tt!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function vt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=q,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Nt,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=xt}function sg(s,t){function e(n,i=jn){let r;const a=jt.getTransfer(i);if(n===zn)return s.UNSIGNED_BYTE;if(n===ko)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ho)return s.UNSIGNED_SHORT_5_5_5_1;if(n===rh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ih)return s.BYTE;if(n===sh)return s.SHORT;if(n===Ns)return s.UNSIGNED_SHORT;if(n===zo)return s.INT;if(n===xi)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===Fn)return s.HALF_FLOAT;if(n===ah)return s.ALPHA;if(n===oh)return s.RGB;if(n===fn)return s.RGBA;if(n===lh)return s.LUMINANCE;if(n===ch)return s.LUMINANCE_ALPHA;if(n===ts)return s.DEPTH_COMPONENT;if(n===as)return s.DEPTH_STENCIL;if(n===Vo)return s.RED;if(n===Go)return s.RED_INTEGER;if(n===hh)return s.RG;if(n===Wo)return s.RG_INTEGER;if(n===Xo)return s.RGBA_INTEGER;if(n===Dr||n===Ir||n===Ur||n===Nr)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===eo||n===no||n===io||n===so)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ro||n===ao||n===oo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ro||n===ao)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo||n===Mo||n===yo||n===So)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===co)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===po)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===go)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_o)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===So)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fr||n===wo||n===bo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Fr)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uh||n===Eo||n===To||n===Ao)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===To)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class rg extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class oe extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ag={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ag)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const og=`
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

}`;class cg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Oe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ee({vertexShader:og,fragmentShader:lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Lt(new ke(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hg extends hs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new cg,m=e.getContextAttributes();let p=null,x=null;const M=[],_=[],I=new Q;let C=null;const R=new Je;R.viewport=new he;const P=new Je;P.viewport=new he;const w=[R,P],y=new rg;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let st=M[$];return st===void 0&&(st=new Aa,M[$]=st),st.getTargetRaySpace()},this.getControllerGrip=function($){let st=M[$];return st===void 0&&(st=new Aa,M[$]=st),st.getGripSpace()},this.getHand=function($){let st=M[$];return st===void 0&&(st=new Aa,M[$]=st),st.getHandSpace()};function O($){const st=_.indexOf($.inputSource);if(st===-1)return;const bt=M[st];bt!==void 0&&(bt.update($.inputSource,$.frame,c||a),bt.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",q);for(let $=0;$<M.length;$++){const st=_[$];st!==null&&(_[$]=null,M[$].disconnect(st))}D=null,B=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,x=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",V),i.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(I),i.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new pn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,bt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?as:ts,bt=m.stencil?rs:xi);const Dt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new pn(d.textureWidth,d.textureHeight,{format:fn,type:zn,depthTexture:new Th(d.textureWidth,d.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q($){for(let st=0;st<$.removed.length;st++){const bt=$.removed[st],at=_.indexOf(bt);at>=0&&(_[at]=null,M[at].disconnect(bt))}for(let st=0;st<$.added.length;st++){const bt=$.added[st];let at=_.indexOf(bt);if(at===-1){for(let Ot=0;Ot<M.length;Ot++)if(Ot>=_.length){_.push(bt),at=Ot;break}else if(_[Ot]===null){_[Ot]=bt,at=Ot;break}if(at===-1)break}const Dt=M[at];Dt&&Dt.connect(bt)}}const G=new A,K=new A;function W($,st,bt){G.setFromMatrixPosition(st.matrixWorld),K.setFromMatrixPosition(bt.matrixWorld);const at=G.distanceTo(K),Dt=st.projectionMatrix.elements,Ot=bt.projectionMatrix.elements,Nt=Dt[14]/(Dt[10]-1),Qt=Dt[14]/(Dt[10]+1),J=(Dt[9]+1)/Dt[5],it=(Dt[9]-1)/Dt[5],L=(Dt[8]-1)/Dt[0],Rt=(Ot[8]+1)/Ot[0],et=Nt*L,xt=Nt*Rt,ot=at/(-L+Rt),It=ot*-L;if(st.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(It),$.translateZ(ot),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Dt[10]===-1)$.projectionMatrix.copy(st.projectionMatrix),$.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const vt=Nt+ot,T=Qt+ot,S=et-It,z=xt+(at-It),Y=J*Qt/T*vt,tt=it*Qt/T*vt;$.projectionMatrix.makePerspective(S,z,Y,tt,vt,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function lt($,st){st===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(st.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let st=$.near,bt=$.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(bt=v.depthFar)),y.near=P.near=R.near=st,y.far=P.far=R.far=bt,(D!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,B=y.far),R.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,y.layers.mask=R.layers.mask|P.layers.mask;const at=$.parent,Dt=y.cameras;lt(y,at);for(let Ot=0;Ot<Dt.length;Ot++)lt(Dt[Ot],at);Dt.length===2?W(y,R,P):y.projectionMatrix.copy(R.projectionMatrix),gt($,y,at)};function gt($,st,bt){bt===null?$.matrix.copy(st.matrixWorld):($.matrix.copy(bt.matrixWorld),$.matrix.invert(),$.matrix.multiply(st.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(st.projectionMatrix),$.projectionMatrixInverse.copy(st.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Fs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let wt=null;function kt($,st){if(h=st.getViewerPose(c||a),g=st,h!==null){const bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let at=!1;bt.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let Ot=0;Ot<bt.length;Ot++){const Nt=bt[Ot];let Qt=null;if(f!==null)Qt=f.getViewport(Nt);else{const it=u.getViewSubImage(d,Nt);Qt=it.viewport,Ot===0&&(t.setRenderTargetTextures(x,it.colorTexture,d.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(x))}let J=w[Ot];J===void 0&&(J=new Je,J.layers.enable(Ot),J.viewport=new he,w[Ot]=J),J.matrix.fromArray(Nt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Nt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Ot===0&&(y.matrix.copy(J.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(J)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const Ot=u.getDepthInformation(bt[0]);Ot&&Ot.isValid&&Ot.texture&&v.init(t,Ot,i.renderState)}}for(let bt=0;bt<M.length;bt++){const at=_[bt],Dt=M[bt];at!==null&&Dt!==void 0&&Dt.update(at,st,c||a)}wt&&wt($,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const ne=new Eh;ne.setAnimationLoop(kt),this.setAnimationLoop=function($){wt=$},this.dispose=function(){}}}const oi=new mn,ug=new $t;function dg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,M,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ve&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ve&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p),M=x.envMap,_=x.envMapRotation;M&&(m.envMap.value=M,oi.copy(_),oi.x*=-1,oi.y*=-1,oi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),m.envMapRotation.value.setFromMatrix4(ug.makeRotationFromEuler(oi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function fg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const _=M.program;n.uniformBlockBinding(x,_)}function c(x,M){let _=i[x.id];_===void 0&&(g(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",m));const I=M.program;n.updateUBOMapping(x,I);const C=t.render.frame;r[x.id]!==C&&(d(x),r[x.id]=C)}function h(x){const M=u();x.__bindingPointIndex=M;const _=s.createBuffer(),I=x.__size,C=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,I,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,_),_}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=i[x.id],_=x.uniforms,I=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let C=0,R=_.length;C<R;C++){const P=Array.isArray(_[C])?_[C]:[_[C]];for(let w=0,y=P.length;w<y;w++){const D=P[w];if(f(D,C,w,I)===!0){const B=D.__offset,O=Array.isArray(D.value)?D.value:[D.value];let V=0;for(let q=0;q<O.length;q++){const G=O[q],K=v(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,B+V,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,_,I){const C=x.value,R=M+"_"+_;if(I[R]===void 0)return typeof C=="number"||typeof C=="boolean"?I[R]=C:I[R]=C.clone(),!0;{const P=I[R];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return I[R]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function g(x){const M=x.uniforms;let _=0;const I=16;for(let R=0,P=M.length;R<P;R++){const w=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,D=w.length;y<D;y++){const B=w[y],O=Array.isArray(B.value)?B.value:[B.value];for(let V=0,q=O.length;V<q;V++){const G=O[V],K=v(G),W=_%I,lt=W%K.boundary,gt=W+lt;_+=lt,gt!==0&&I-gt<K.storage&&(_+=I-gt),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=K.storage}}}const C=_%I;return C>0&&(_+=I-C),x.__size=_,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const _=a.indexOf(M.__bindingPointIndex);a.splice(_,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class pg{constructor(t={}){const{canvas:e=nd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Jn,this.toneMappingExposure=1;const _=this;let I=!1,C=0,R=0,P=null,w=-1,y=null;const D=new he,B=new he;let O=null;const V=new mt(0);let q=0,G=e.width,K=e.height,W=1,lt=null,gt=null;const wt=new he(0,0,G,K),kt=new he(0,0,G,K);let ne=!1;const $=new Yo;let st=!1,bt=!1;const at=new $t,Dt=new $t,Ot=new A,Nt=new he,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function it(){return P===null?W:1}let L=n;function Rt(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oo}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),L===null){const N="webgl2";if(L=Rt(N,b),L===null)throw Rt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let et,xt,ot,It,vt,T,S,z,Y,tt,Z,Et,ht,_t,Zt,nt,Mt,Ut,Ft,yt,Kt,Xt,de,U;function ut(){et=new xm(L),et.init(),Xt=new sg(L,et),xt=new fm(L,et,t,Xt),ot=new eg(L,et),xt.reverseDepthBuffer&&d&&ot.buffers.depth.setReversed(!0),It=new Sm(L),vt=new k0,T=new ig(L,et,ot,vt,xt,Xt,It),S=new mm(_),z=new _m(_),Y=new Cd(L),de=new um(L,Y),tt=new Mm(L,Y,It,de),Z=new bm(L,tt,Y,It),Ft=new wm(L,xt,T),nt=new pm(vt),Et=new z0(_,S,z,et,xt,de,nt),ht=new dg(_,vt),_t=new V0,Zt=new Z0(et),Ut=new hm(_,S,z,ot,Z,f,l),Mt=new Q0(_,Z,xt),U=new fg(L,It,xt,ot),yt=new dm(L,et,It),Kt=new ym(L,et,It),It.programs=Et.programs,_.capabilities=xt,_.extensions=et,_.properties=vt,_.renderLists=_t,_.shadowMap=Mt,_.state=ot,_.info=It}ut();const X=new hg(_,L);this.xr=X,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=et.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=et.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(b){b!==void 0&&(W=b,this.setSize(G,K,!1))},this.getSize=function(b){return b.set(G,K)},this.setSize=function(b,N,k=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=b,K=N,e.width=Math.floor(b*W),e.height=Math.floor(N*W),k===!0&&(e.style.width=b+"px",e.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(G*W,K*W).floor()},this.setDrawingBufferSize=function(b,N,k){G=b,K=N,W=k,e.width=Math.floor(b*k),e.height=Math.floor(N*k),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(wt)},this.setViewport=function(b,N,k,H){b.isVector4?wt.set(b.x,b.y,b.z,b.w):wt.set(b,N,k,H),ot.viewport(D.copy(wt).multiplyScalar(W).round())},this.getScissor=function(b){return b.copy(kt)},this.setScissor=function(b,N,k,H){b.isVector4?kt.set(b.x,b.y,b.z,b.w):kt.set(b,N,k,H),ot.scissor(B.copy(kt).multiplyScalar(W).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(b){ot.setScissorTest(ne=b)},this.setOpaqueSort=function(b){lt=b},this.setTransparentSort=function(b){gt=b},this.getClearColor=function(b){return b.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(b=!0,N=!0,k=!0){let H=0;if(b){let F=!1;if(P!==null){const rt=P.texture.format;F=rt===Xo||rt===Wo||rt===Go}if(F){const rt=P.texture.type,ft=rt===zn||rt===xi||rt===Ns||rt===rs||rt===ko||rt===Ho,Tt=Ut.getClearColor(),At=Ut.getClearAlpha(),Bt=Tt.r,Vt=Tt.g,Ct=Tt.b;ft?(g[0]=Bt,g[1]=Vt,g[2]=Ct,g[3]=At,L.clearBufferuiv(L.COLOR,0,g)):(v[0]=Bt,v[1]=Vt,v[2]=Ct,v[3]=At,L.clearBufferiv(L.COLOR,0,v))}else H|=L.COLOR_BUFFER_BIT}N&&(H|=L.DEPTH_BUFFER_BIT),k&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),_t.dispose(),Zt.dispose(),vt.dispose(),S.dispose(),z.dispose(),Z.dispose(),de.dispose(),U.dispose(),Et.dispose(),X.dispose(),X.removeEventListener("sessionstart",fl),X.removeEventListener("sessionend",pl),ei.stop()};function j(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=It.autoReset,N=Mt.enabled,k=Mt.autoUpdate,H=Mt.needsUpdate,F=Mt.type;ut(),It.autoReset=b,Mt.enabled=N,Mt.autoUpdate=k,Mt.needsUpdate=H,Mt.type=F}function dt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ht(b){const N=b.target;N.removeEventListener("dispose",Ht),_e(N)}function _e(b){Ie(b),vt.remove(b)}function Ie(b){const N=vt.get(b).programs;N!==void 0&&(N.forEach(function(k){Et.releaseProgram(k)}),b.isShaderMaterial&&Et.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,k,H,F,rt){N===null&&(N=Qt);const ft=F.isMesh&&F.matrixWorld.determinant()<0,Tt=eu(b,N,k,H,F);ot.setMaterial(H,ft);let At=k.index,Bt=1;if(H.wireframe===!0){if(At=tt.getWireframeAttribute(k),At===void 0)return;Bt=2}const Vt=k.drawRange,Ct=k.attributes.position;let ee=Vt.start*Bt,fe=(Vt.start+Vt.count)*Bt;rt!==null&&(ee=Math.max(ee,rt.start*Bt),fe=Math.min(fe,(rt.start+rt.count)*Bt)),At!==null?(ee=Math.max(ee,0),fe=Math.min(fe,At.count)):Ct!=null&&(ee=Math.max(ee,0),fe=Math.min(fe,Ct.count));const pe=fe-ee;if(pe<0||pe===1/0)return;de.setup(F,H,Tt,k,At);let Ge,ie=yt;if(At!==null&&(Ge=Y.get(At),ie=Kt,ie.setIndex(Ge)),F.isMesh)H.wireframe===!0?(ot.setLineWidth(H.wireframeLinewidth*it()),ie.setMode(L.LINES)):ie.setMode(L.TRIANGLES);else if(F.isLine){let Pt=H.linewidth;Pt===void 0&&(Pt=1),ot.setLineWidth(Pt*it()),F.isLineSegments?ie.setMode(L.LINES):F.isLineLoop?ie.setMode(L.LINE_LOOP):ie.setMode(L.LINE_STRIP)}else F.isPoints?ie.setMode(L.POINTS):F.isSprite&&ie.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ie.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))ie.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pt=F._multiDrawStarts,Tn=F._multiDrawCounts,se=F._multiDrawCount,an=At?Y.get(At).bytesPerElement:1,bi=vt.get(H).currentProgram.getUniforms();for(let Ye=0;Ye<se;Ye++)bi.setValue(L,"_gl_DrawID",Ye),ie.render(Pt[Ye]/an,Tn[Ye])}else if(F.isInstancedMesh)ie.renderInstances(ee,pe,F.count);else if(k.isInstancedBufferGeometry){const Pt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Tn=Math.min(k.instanceCount,Pt);ie.renderInstances(ee,pe,Tn)}else ie.render(ee,pe)};function re(b,N,k){b.transparent===!0&&b.side===He&&b.forceSinglePass===!1?(b.side=Ve,b.needsUpdate=!0,Xs(b,N,k),b.side=Qn,b.needsUpdate=!0,Xs(b,N,k),b.side=He):Xs(b,N,k)}this.compile=function(b,N,k=null){k===null&&(k=b),p=Zt.get(k),p.init(N),M.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),b!==k&&b.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const H=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const rt=F.material;if(rt)if(Array.isArray(rt))for(let ft=0;ft<rt.length;ft++){const Tt=rt[ft];re(Tt,k,F),H.add(Tt)}else re(rt,k,F),H.add(rt)}),M.pop(),p=null,H},this.compileAsync=function(b,N,k=null){const H=this.compile(b,N,k);return new Promise(F=>{function rt(){if(H.forEach(function(ft){vt.get(ft).currentProgram.isReady()&&H.delete(ft)}),H.size===0){F(b);return}setTimeout(rt,10)}et.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let rn=null;function En(b){rn&&rn(b)}function fl(){ei.stop()}function pl(){ei.start()}const ei=new Eh;ei.setAnimationLoop(En),typeof self<"u"&&ei.setContext(self),this.setAnimationLoop=function(b){rn=b,X.setAnimationLoop(b),b===null?ei.stop():ei.start()},X.addEventListener("sessionstart",fl),X.addEventListener("sessionend",pl),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,N,P),p=Zt.get(b,M.length),p.init(N),M.push(p),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(Dt),bt=this.localClippingEnabled,st=nt.init(this.clippingPlanes,bt),m=_t.get(b,x.length),m.init(),x.push(m),X.enabled===!0&&X.isPresenting===!0){const rt=_.xr.getDepthSensingMesh();rt!==null&&Qr(rt,N,-1/0,_.sortObjects)}Qr(b,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(lt,gt),J=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,J&&Ut.addToRenderList(m,b),this.info.render.frame++,st===!0&&nt.beginShadows();const k=p.state.shadowsArray;Mt.render(k,b,N),st===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const rt=N.cameras;if(F.length>0)for(let ft=0,Tt=rt.length;ft<Tt;ft++){const At=rt[ft];gl(H,F,b,At)}J&&Ut.render(b);for(let ft=0,Tt=rt.length;ft<Tt;ft++){const At=rt[ft];ml(m,b,At,At.viewport)}}else F.length>0&&gl(H,F,b,N),J&&Ut.render(b),ml(m,b,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(_,b,N),de.resetDefaultState(),w=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],st===!0&&nt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Qr(b,N,k,H){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$.intersectsSprite(b)){H&&Nt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Dt);const ft=Z.update(b),Tt=b.material;Tt.visible&&m.push(b,ft,Tt,k,Nt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$.intersectsObject(b))){const ft=Z.update(b),Tt=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Nt.copy(b.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Nt.copy(ft.boundingSphere.center)),Nt.applyMatrix4(b.matrixWorld).applyMatrix4(Dt)),Array.isArray(Tt)){const At=ft.groups;for(let Bt=0,Vt=At.length;Bt<Vt;Bt++){const Ct=At[Bt],ee=Tt[Ct.materialIndex];ee&&ee.visible&&m.push(b,ft,ee,k,Nt.z,Ct)}}else Tt.visible&&m.push(b,ft,Tt,k,Nt.z,null)}}const rt=b.children;for(let ft=0,Tt=rt.length;ft<Tt;ft++)Qr(rt[ft],N,k,H)}function ml(b,N,k,H){const F=b.opaque,rt=b.transmissive,ft=b.transparent;p.setupLightsView(k),st===!0&&nt.setGlobalState(_.clippingPlanes,k),H&&ot.viewport(D.copy(H)),F.length>0&&Ws(F,N,k),rt.length>0&&Ws(rt,N,k),ft.length>0&&Ws(ft,N,k),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function gl(b,N,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new pn(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?Fn:zn,minFilter:vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const rt=p.state.transmissionRenderTarget[H.id],ft=H.viewport||D;rt.setSize(ft.z,ft.w);const Tt=_.getRenderTarget();_.setRenderTarget(rt),_.getClearColor(V),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),_.clear(),J&&Ut.render(k);const At=_.toneMapping;_.toneMapping=Jn;const Bt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),st===!0&&nt.setGlobalState(_.clippingPlanes,H),Ws(b,k,H),T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt),et.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Ct=0,ee=N.length;Ct<ee;Ct++){const fe=N[Ct],pe=fe.object,Ge=fe.geometry,ie=fe.material,Pt=fe.group;if(ie.side===He&&pe.layers.test(H.layers)){const Tn=ie.side;ie.side=Ve,ie.needsUpdate=!0,vl(pe,k,H,Ge,ie,Pt),ie.side=Tn,ie.needsUpdate=!0,Vt=!0}}Vt===!0&&(T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt))}_.setRenderTarget(Tt),_.setClearColor(V,q),Bt!==void 0&&(H.viewport=Bt),_.toneMapping=At}function Ws(b,N,k){const H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,rt=b.length;F<rt;F++){const ft=b[F],Tt=ft.object,At=ft.geometry,Bt=H===null?ft.material:H,Vt=ft.group;Tt.layers.test(k.layers)&&vl(Tt,N,k,At,Bt,Vt)}}function vl(b,N,k,H,F,rt){b.onBeforeRender(_,N,k,H,F,rt),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(_,N,k,H,b,rt),F.transparent===!0&&F.side===He&&F.forceSinglePass===!1?(F.side=Ve,F.needsUpdate=!0,_.renderBufferDirect(k,N,H,F,b,rt),F.side=Qn,F.needsUpdate=!0,_.renderBufferDirect(k,N,H,F,b,rt),F.side=He):_.renderBufferDirect(k,N,H,F,b,rt),b.onAfterRender(_,N,k,H,F,rt)}function Xs(b,N,k){N.isScene!==!0&&(N=Qt);const H=vt.get(b),F=p.state.lights,rt=p.state.shadowsArray,ft=F.state.version,Tt=Et.getParameters(b,F.state,rt,N,k),At=Et.getProgramCacheKey(Tt);let Bt=H.programs;H.environment=b.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(b.isMeshStandardMaterial?z:S).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Bt===void 0&&(b.addEventListener("dispose",Ht),Bt=new Map,H.programs=Bt);let Vt=Bt.get(At);if(Vt!==void 0){if(H.currentProgram===Vt&&H.lightsStateVersion===ft)return xl(b,Tt),Vt}else Tt.uniforms=Et.getUniforms(b),b.onBeforeCompile(Tt,_),Vt=Et.acquireProgram(Tt,At),Bt.set(At,Vt),H.uniforms=Tt.uniforms;const Ct=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ct.clippingPlanes=nt.uniform),xl(b,Tt),H.needsLights=iu(b),H.lightsStateVersion=ft,H.needsLights&&(Ct.ambientLightColor.value=F.state.ambient,Ct.lightProbe.value=F.state.probe,Ct.directionalLights.value=F.state.directional,Ct.directionalLightShadows.value=F.state.directionalShadow,Ct.spotLights.value=F.state.spot,Ct.spotLightShadows.value=F.state.spotShadow,Ct.rectAreaLights.value=F.state.rectArea,Ct.ltc_1.value=F.state.rectAreaLTC1,Ct.ltc_2.value=F.state.rectAreaLTC2,Ct.pointLights.value=F.state.point,Ct.pointLightShadows.value=F.state.pointShadow,Ct.hemisphereLights.value=F.state.hemi,Ct.directionalShadowMap.value=F.state.directionalShadowMap,Ct.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ct.spotShadowMap.value=F.state.spotShadowMap,Ct.spotLightMatrix.value=F.state.spotLightMatrix,Ct.spotLightMap.value=F.state.spotLightMap,Ct.pointShadowMap.value=F.state.pointShadowMap,Ct.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Vt,H.uniformsList=null,Vt}function _l(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Or.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function xl(b,N){const k=vt.get(b);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function eu(b,N,k,H,F){N.isScene!==!0&&(N=Qt),T.resetTextureUnits();const rt=N.fog,ft=H.isMeshStandardMaterial?N.environment:null,Tt=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:cs,At=(H.isMeshStandardMaterial?z:S).get(H.envMap||ft),Bt=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Vt=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ct=!!k.morphAttributes.position,ee=!!k.morphAttributes.normal,fe=!!k.morphAttributes.color;let pe=Jn;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pe=_.toneMapping);const Ge=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ie=Ge!==void 0?Ge.length:0,Pt=vt.get(H),Tn=p.state.lights;if(st===!0&&(bt===!0||b!==y)){const tn=b===y&&H.id===w;nt.setState(H,b,tn)}let se=!1;H.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Tn.state.version||Pt.outputColorSpace!==Tt||F.isBatchedMesh&&Pt.batching===!1||!F.isBatchedMesh&&Pt.batching===!0||F.isBatchedMesh&&Pt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pt.instancing===!1||!F.isInstancedMesh&&Pt.instancing===!0||F.isSkinnedMesh&&Pt.skinning===!1||!F.isSkinnedMesh&&Pt.skinning===!0||F.isInstancedMesh&&Pt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pt.instancingMorph===!1&&F.morphTexture!==null||Pt.envMap!==At||H.fog===!0&&Pt.fog!==rt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==nt.numPlanes||Pt.numIntersection!==nt.numIntersection)||Pt.vertexAlphas!==Bt||Pt.vertexTangents!==Vt||Pt.morphTargets!==Ct||Pt.morphNormals!==ee||Pt.morphColors!==fe||Pt.toneMapping!==pe||Pt.morphTargetsCount!==ie)&&(se=!0):(se=!0,Pt.__version=H.version);let an=Pt.currentProgram;se===!0&&(an=Xs(H,N,F));let bi=!1,Ye=!1,ps=!1;const me=an.getUniforms(),gn=Pt.uniforms;if(ot.useProgram(an.program)&&(bi=!0,Ye=!0,ps=!0),H.id!==w&&(w=H.id,Ye=!0),bi||y!==b){ot.buffers.depth.getReversed()?(at.copy(b.projectionMatrix),sd(at),rd(at),me.setValue(L,"projectionMatrix",at)):me.setValue(L,"projectionMatrix",b.projectionMatrix),me.setValue(L,"viewMatrix",b.matrixWorldInverse);const kn=me.map.cameraPosition;kn!==void 0&&kn.setValue(L,Ot.setFromMatrixPosition(b.matrixWorld)),xt.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&me.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Ye=!0,ps=!0)}if(F.isSkinnedMesh){me.setOptional(L,F,"bindMatrix"),me.setOptional(L,F,"bindMatrixInverse");const tn=F.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),me.setValue(L,"boneTexture",tn.boneTexture,T))}F.isBatchedMesh&&(me.setOptional(L,F,"batchingTexture"),me.setValue(L,"batchingTexture",F._matricesTexture,T),me.setOptional(L,F,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",F._indirectTexture,T),me.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",F._colorsTexture,T));const ms=k.morphAttributes;if((ms.position!==void 0||ms.normal!==void 0||ms.color!==void 0)&&Ft.update(F,k,an),(Ye||Pt.receiveShadow!==F.receiveShadow)&&(Pt.receiveShadow=F.receiveShadow,me.setValue(L,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(gn.envMap.value=At,gn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(gn.envMapIntensity.value=N.environmentIntensity),Ye&&(me.setValue(L,"toneMappingExposure",_.toneMappingExposure),Pt.needsLights&&nu(gn,ps),rt&&H.fog===!0&&ht.refreshFogUniforms(gn,rt),ht.refreshMaterialUniforms(gn,H,W,K,p.state.transmissionRenderTarget[b.id]),Or.upload(L,_l(Pt),gn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Or.upload(L,_l(Pt),gn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&me.setValue(L,"center",F.center),me.setValue(L,"modelViewMatrix",F.modelViewMatrix),me.setValue(L,"normalMatrix",F.normalMatrix),me.setValue(L,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const tn=H.uniformsGroups;for(let kn=0,Hn=tn.length;kn<Hn;kn++){const Ml=tn[kn];U.update(Ml,an),U.bind(Ml,an)}}return an}function nu(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function iu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,N,k){vt.get(b.texture).__webglTexture=N,vt.get(b.depthTexture).__webglTexture=k;const H=vt.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const k=vt.get(b);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,k=0){P=b,C=N,R=k;let H=!0,F=null,rt=!1,ft=!1;if(b){const At=vt.get(b);if(At.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(At.__hasExternalTextures)T.rebindTextures(b,vt.get(b.texture).__webglTexture,vt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ct=b.depthTexture;if(At.__boundDepthTexture!==Ct){if(Ct!==null&&vt.has(Ct)&&(b.width!==Ct.image.width||b.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const Bt=b.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(ft=!0);const Vt=vt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Vt[N])?F=Vt[N][k]:F=Vt[N],rt=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?F=vt.get(b).__webglMultisampledFramebuffer:Array.isArray(Vt)?F=Vt[k]:F=Vt,D.copy(b.viewport),B.copy(b.scissor),O=b.scissorTest}else D.copy(wt).multiplyScalar(W).floor(),B.copy(kt).multiplyScalar(W).floor(),O=ne;if(ot.bindFramebuffer(L.FRAMEBUFFER,F)&&H&&ot.drawBuffers(b,F),ot.viewport(D),ot.scissor(B),ot.setScissorTest(O),rt){const At=vt.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,k)}else if(ft){const At=vt.get(b.texture),Bt=N||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,At.__webglTexture,k||0,Bt)}w=-1},this.readRenderTargetPixels=function(b,N,k,H,F,rt,ft){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=vt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ft!==void 0&&(Tt=Tt[ft]),Tt){ot.bindFramebuffer(L.FRAMEBUFFER,Tt);try{const At=b.texture,Bt=At.format,Vt=At.type;if(!xt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-H&&k>=0&&k<=b.height-F&&L.readPixels(N,k,H,F,Xt.convert(Bt),Xt.convert(Vt),rt)}finally{const At=P!==null?vt.get(P).__webglFramebuffer:null;ot.bindFramebuffer(L.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(b,N,k,H,F,rt,ft){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=vt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ft!==void 0&&(Tt=Tt[ft]),Tt){const At=b.texture,Bt=At.format,Vt=At.type;if(!xt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-H&&k>=0&&k<=b.height-F){ot.bindFramebuffer(L.FRAMEBUFFER,Tt);const Ct=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ct),L.bufferData(L.PIXEL_PACK_BUFFER,rt.byteLength,L.STREAM_READ),L.readPixels(N,k,H,F,Xt.convert(Bt),Xt.convert(Vt),0);const ee=P!==null?vt.get(P).__webglFramebuffer:null;ot.bindFramebuffer(L.FRAMEBUFFER,ee);const fe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await id(L,fe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ct),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,rt),L.deleteBuffer(Ct),L.deleteSync(fe),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,k=0){b.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);const H=Math.pow(2,-k),F=Math.floor(b.image.width*H),rt=Math.floor(b.image.height*H),ft=N!==null?N.x:0,Tt=N!==null?N.y:0;T.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,ft,Tt,F,rt),ot.unbindTexture()},this.copyTextureToTexture=function(b,N,k=null,H=null,F=0){b.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],N=arguments[2],F=arguments[3]||0,k=null);let rt,ft,Tt,At,Bt,Vt,Ct,ee,fe;const pe=b.isCompressedTexture?b.mipmaps[F]:b.image;k!==null?(rt=k.max.x-k.min.x,ft=k.max.y-k.min.y,Tt=k.isBox3?k.max.z-k.min.z:1,At=k.min.x,Bt=k.min.y,Vt=k.isBox3?k.min.z:0):(rt=pe.width,ft=pe.height,Tt=pe.depth||1,At=0,Bt=0,Vt=0),H!==null?(Ct=H.x,ee=H.y,fe=H.z):(Ct=0,ee=0,fe=0);const Ge=Xt.convert(N.format),ie=Xt.convert(N.type);let Pt;N.isData3DTexture?(T.setTexture3D(N,0),Pt=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Pt=L.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Pt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const Tn=L.getParameter(L.UNPACK_ROW_LENGTH),se=L.getParameter(L.UNPACK_IMAGE_HEIGHT),an=L.getParameter(L.UNPACK_SKIP_PIXELS),bi=L.getParameter(L.UNPACK_SKIP_ROWS),Ye=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,At),L.pixelStorei(L.UNPACK_SKIP_ROWS,Bt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Vt);const ps=b.isDataArrayTexture||b.isData3DTexture,me=N.isDataArrayTexture||N.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const gn=vt.get(b),ms=vt.get(N),tn=vt.get(gn.__renderTarget),kn=vt.get(ms.__renderTarget);ot.bindFramebuffer(L.READ_FRAMEBUFFER,tn.__webglFramebuffer),ot.bindFramebuffer(L.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let Hn=0;Hn<Tt;Hn++)ps&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(b).__webglTexture,F,Vt+Hn),b.isDepthTexture?(me&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(N).__webglTexture,F,fe+Hn),L.blitFramebuffer(At,Bt,rt,ft,Ct,ee,rt,ft,L.DEPTH_BUFFER_BIT,L.NEAREST)):me?L.copyTexSubImage3D(Pt,F,Ct,ee,fe+Hn,At,Bt,rt,ft):L.copyTexSubImage2D(Pt,F,Ct,ee,fe+Hn,At,Bt,rt,ft);ot.bindFramebuffer(L.READ_FRAMEBUFFER,null),ot.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else me?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Pt,F,Ct,ee,fe,rt,ft,Tt,Ge,ie,pe.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Pt,F,Ct,ee,fe,rt,ft,Tt,Ge,pe.data):L.texSubImage3D(Pt,F,Ct,ee,fe,rt,ft,Tt,Ge,ie,pe):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,F,Ct,ee,rt,ft,Ge,ie,pe.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,F,Ct,ee,pe.width,pe.height,Ge,pe.data):L.texSubImage2D(L.TEXTURE_2D,F,Ct,ee,rt,ft,Ge,ie,pe);L.pixelStorei(L.UNPACK_ROW_LENGTH,Tn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,se),L.pixelStorei(L.UNPACK_SKIP_PIXELS,an),L.pixelStorei(L.UNPACK_SKIP_ROWS,bi),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ye),F===0&&N.generateMipmaps&&L.generateMipmap(Pt),ot.unbindTexture()},this.copyTextureToTexture3D=function(b,N,k=null,H=null,F=0){return b.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,b=arguments[2],N=arguments[3],F=arguments[4]||0),Ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,N,k,H,F)},this.initRenderTarget=function(b){vt.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),ot.unbindTexture()},this.resetState=function(){C=0,R=0,P=null,ot.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class Ko{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new mt(t),this.density=e}clone(){return new Ko(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Lh extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class mg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Co,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new A;class Vr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=dn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new we(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Vr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Yr extends wi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let zi;const Ms=new A,ki=new A,Hi=new A,Vi=new Q,ys=new Q,Dh=new $t,pr=new A,Ss=new A,mr=new A,vc=new Q,Ca=new Q,_c=new Q;class jo extends xe{constructor(t=new Yr){if(super(),this.isSprite=!0,this.type="Sprite",zi===void 0){zi=new Me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mg(e,5);zi.setIndex([0,1,2,0,2,3]),zi.setAttribute("position",new Vr(n,3,0,!1)),zi.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=zi,this.material=t,this.center=new Q(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ki.setFromMatrixScale(this.matrixWorld),Dh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Hi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ki.multiplyScalar(-Hi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;gr(pr.set(-.5,-.5,0),Hi,a,ki,i,r),gr(Ss.set(.5,-.5,0),Hi,a,ki,i,r),gr(mr.set(.5,.5,0),Hi,a,ki,i,r),vc.set(0,0),Ca.set(1,0),_c.set(1,1);let o=t.ray.intersectTriangle(pr,Ss,mr,!1,Ms);if(o===null&&(gr(Ss.set(-.5,.5,0),Hi,a,ki,i,r),Ca.set(0,1),o=t.ray.intersectTriangle(pr,mr,Ss,!1,Ms),o===null))return;const l=t.ray.origin.distanceTo(Ms);l<t.near||l>t.far||e.push({distance:l,point:Ms.clone(),uv:sn.getInterpolation(Ms,pr,Ss,mr,vc,Ca,_c,new Q),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function gr(s,t,e,n,i,r){Vi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ys.x=r*Vi.x-i*Vi.y,ys.y=i*Vi.x+r*Vi.y):ys.copy(Vi),s.copy(t),s.x+=ys.x,s.y+=ys.y,s.applyMatrix4(Dh)}class gg extends Oe{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Qe,h=Qe,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr extends we{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Gi=new $t,xc=new $t,vr=[],Mc=new Si,vg=new $t,ws=new Lt,bs=new us;class Br extends Lt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Gr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,vg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),Mc.copy(t.boundingBox).applyMatrix4(Gi),this.boundingBox.union(Mc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new us),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),bs.copy(t.boundingSphere).applyMatrix4(Gi),this.boundingSphere.union(bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bs.copy(this.boundingSphere),bs.applyMatrix4(n),t.ray.intersectsSphere(bs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Gi),xc.multiplyMatrices(n,Gi),ws.matrixWorld=xc,ws.raycast(t,vr);for(let a=0,o=vr.length;a<o;a++){const l=vr[a];l.instanceId=r,l.object=this,e.push(l)}vr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new gg(new Float32Array(i*this.count),i,this.count,Vo,yn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class _g extends wi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yc=new $t,Lo=new vh,_r=new us,xr=new A;class Ih extends xe{constructor(t=new Me,e=new _g){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(i),_r.radius+=r,t.ray.intersectsSphere(_r)===!1)return;yc.copy(i).invert(),Lo.copy(t.ray).applyMatrix4(yc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);xr.fromBufferAttribute(u,m),Sc(xr,m,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)xr.fromBufferAttribute(u,g),Sc(xr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sc(s,t,e,n,i,r,a){const o=Lo.distanceSqToPoint(s);if(o<e){const l=new A;Lo.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Vs extends Oe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new Q:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new A,i=[],r=[],a=[],o=new A,l=new $t;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Pe(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Pe(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Jo extends bn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Q){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class xg extends Jo{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Qo(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Mr=new A,Ra=new Qo,Pa=new Qo,La=new Qo;class Mg extends bn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Mr.subVectors(i[0],i[1]).add(i[0]),c=Mr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Mr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ra.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Pa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),La.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Ra.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Pa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),La.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ra.calc(l),Pa.calc(l),La.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function wc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function yg(s,t){const e=1-s;return e*e*t}function Sg(s,t){return 2*(1-s)*s*t}function wg(s,t){return s*s*t}function Ls(s,t,e,n){return yg(s,t)+Sg(s,e)+wg(s,n)}function bg(s,t){const e=1-s;return e*e*e*t}function Eg(s,t){const e=1-s;return 3*e*e*s*t}function Tg(s,t){return 3*(1-s)*s*s*t}function Ag(s,t){return s*s*s*t}function Ds(s,t,e,n,i){return bg(s,t)+Eg(s,e)+Tg(s,n)+Ag(s,i)}class Uh extends bn{constructor(t=new Q,e=new Q,n=new Q,i=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Q){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,i.x,r.x,a.x,o.x),Ds(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Cg extends bn{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ds(t,i.x,r.x,a.x,o.x),Ds(t,i.y,r.y,a.y,o.y),Ds(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nh extends bn{constructor(t=new Q,e=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rg extends bn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fh extends bn{constructor(t=new Q,e=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Q){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ls(t,i.x,r.x,a.x),Ls(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pg extends bn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Ls(t,i.x,r.x,a.x),Ls(t,i.y,r.y,a.y),Ls(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Oh extends bn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Q){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(wc(o,l.x,c.x,h.x,u.x),wc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Q().fromArray(i))}return this}}var Do=Object.freeze({__proto__:null,ArcCurve:xg,CatmullRomCurve3:Mg,CubicBezierCurve:Uh,CubicBezierCurve3:Cg,EllipseCurve:Jo,LineCurve:Nh,LineCurve3:Rg,QuadraticBezierCurve:Fh,QuadraticBezierCurve3:Pg,SplineCurve:Oh});class Lg extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Do[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Do[i.type]().fromJSON(i))}return this}}class Io extends Lg{constructor(t){super(),this.type="Path",this.currentPoint=new Q,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Nh(this.currentPoint.clone(),new Q(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Fh(this.currentPoint.clone(),new Q(t,e),new Q(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Uh(this.currentPoint.clone(),new Q(t,e),new Q(n,i),new Q(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Oh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Jo(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class tl extends Me{constructor(t=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Pe(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new A,d=new Q,f=new A,g=new A,v=new A;let m=0,p=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let x=0;x<=e;x++){const M=n+x*h*i,_=Math.sin(M),I=Math.cos(M);for(let C=0;C<=t.length-1;C++){u.x=t[C].x*_,u.y=t[C].y,u.z=t[C].x*I,a.push(u.x,u.y,u.z),d.x=x/e,d.y=C/(t.length-1),o.push(d.x,d.y);const R=l[3*C+0]*_,P=l[3*C+1],w=l[3*C+0]*I;c.push(R,P,w)}}for(let x=0;x<e;x++)for(let M=0;M<t.length-1;M++){const _=M+x*t.length,I=_,C=_+t.length,R=_+t.length+1,P=_+1;r.push(I,C,P),r.push(R,P,C)}this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("uv",new Jt(o,2)),this.setAttribute("normal",new Jt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tl(t.points,t.segments,t.phiStart,t.phiLength)}}class Zr extends tl{constructor(t=1,e=1,n=4,i=8){const r=new Io;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Zr(t.radius,t.length,t.capSegments,t.radialSegments)}}class el extends Me{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new A,h=new Q;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Re extends Me{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;x(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function x(){const _=new A,I=new A;let C=0;const R=(e-t)/n;for(let P=0;P<=r;P++){const w=[],y=P/r,D=y*(e-t)+t;for(let B=0;B<=i;B++){const O=B/i,V=O*l+o,q=Math.sin(V),G=Math.cos(V);I.x=D*q,I.y=-y*n+m,I.z=D*G,u.push(I.x,I.y,I.z),_.set(q,R,G).normalize(),d.push(_.x,_.y,_.z),f.push(O,1-y),w.push(g++)}v.push(w)}for(let P=0;P<i;P++)for(let w=0;w<r;w++){const y=v[w][P],D=v[w+1][P],B=v[w+1][P+1],O=v[w][P+1];(t>0||w!==0)&&(h.push(y,D,O),C+=3),(e>0||w!==r-1)&&(h.push(D,B,O),C+=3)}c.addGroup(p,C,0),p+=C}function M(_){const I=g,C=new Q,R=new A;let P=0;const w=_===!0?t:e,y=_===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const D=g;for(let B=0;B<=i;B++){const V=B/i*l+o,q=Math.cos(V),G=Math.sin(V);R.x=w*G,R.y=m*y,R.z=w*q,u.push(R.x,R.y,R.z),d.push(0,y,0),C.x=q*.5+.5,C.y=G*.5*y+.5,f.push(C.x,C.y),g++}for(let B=0;B<i;B++){const O=I+B,V=D+B;_===!0?h.push(V,V+1,O):h.push(V+1,V,O),P+=3}c.addGroup(p,P,_===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nl extends Re{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new nl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $r extends Me{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new A,_=new A,I=new A;for(let C=0;C<e.length;C+=3)f(e[C+0],M),f(e[C+1],_),f(e[C+2],I),l(M,_,I,x)}function l(x,M,_,I){const C=I+1,R=[];for(let P=0;P<=C;P++){R[P]=[];const w=x.clone().lerp(_,P/C),y=M.clone().lerp(_,P/C),D=C-P;for(let B=0;B<=D;B++)B===0&&P===C?R[P][B]=w:R[P][B]=w.clone().lerp(y,B/D)}for(let P=0;P<C;P++)for(let w=0;w<2*(C-P)-1;w++){const y=Math.floor(w/2);w%2===0?(d(R[P][y+1]),d(R[P+1][y]),d(R[P][y])):(d(R[P][y+1]),d(R[P+1][y+1]),d(R[P+1][y]))}}function c(x){const M=new A;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(x),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){const x=new A;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const _=m(x)/2/Math.PI+.5,I=p(x)/Math.PI+.5;a.push(_,1-I)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const M=a[x+0],_=a[x+2],I=a[x+4],C=Math.max(M,_,I),R=Math.min(M,_,I);C>.9&&R<.1&&(M<.2&&(a[x+0]+=1),_<.2&&(a[x+2]+=1),I<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,M){const _=x*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function g(){const x=new A,M=new A,_=new A,I=new A,C=new Q,R=new Q,P=new Q;for(let w=0,y=0;w<r.length;w+=9,y+=6){x.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),C.set(a[y+0],a[y+1]),R.set(a[y+2],a[y+3]),P.set(a[y+4],a[y+5]),I.copy(x).add(M).add(_).divideScalar(3);const D=m(I);v(C,y+0,x,D),v(R,y+2,M,D),v(P,y+4,_,D)}}function v(x,M,_,I){I<0&&x.x===1&&(a[M]=x.x-1),_.x===0&&_.z===0&&(a[M]=I/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $r(t.vertices,t.indices,t.radius,t.details)}}class il extends Io{constructor(t){super(t),this.uuid=wn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Io().fromJSON(i))}return this}}const Dg={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Bh(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(n&&(r=Og(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)u=s[g],d=s[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Bs(r,a,e,o,l,f,0),a}};function Bh(s,t,e,n,i){let r,a;if(i===Zg(s,t,e,n)>0)for(r=t;r<e;r+=n)a=bc(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=bc(r,s[r],s[r+1],a);return a&&Kr(a,a.next)&&(ks(a),a=a.next),a}function Mi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Kr(e,e.next)||ve(e.prev,e,e.next)===0)){if(ks(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Bs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Vg(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Ug(s,n,i,r):Ig(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),ks(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Ng(Mi(s),t,e),Bs(s,t,e,n,i,r,2)):a===2&&Fg(s,t,e,n,i,r):Bs(Mi(s),t,e,n,i,r,1);break}}}function Ig(s){const t=s.prev,e=s,n=s.next;if(ve(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ji(i,o,r,l,a,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ug(s,t,e,n){const i=s.prev,r=s,a=s.next;if(ve(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,v=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=Uo(f,g,t,e,n),x=Uo(v,m,t,e,n);let M=s.prevZ,_=s.nextZ;for(;M&&M.z>=p&&_&&_.z<=x;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ji(o,h,l,u,c,d,M.x,M.y)&&ve(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==a&&ji(o,h,l,u,c,d,_.x,_.y)&&ve(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ji(o,h,l,u,c,d,M.x,M.y)&&ve(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==a&&ji(o,h,l,u,c,d,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ng(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!Kr(i,r)&&zh(i,n,n.next,r)&&zs(i,r)&&zs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ks(n),ks(n.next),n=s=r),n=n.next}while(n!==s);return Mi(n)}function Fg(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Xg(a,o)){let l=kh(a,o);a=Mi(a,a.next),l=Mi(l,l.next),Bs(a,t,e,n,i,r,0),Bs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Og(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Bh(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Wg(c));for(i.sort(Bg),r=0;r<i.length;r++)e=zg(i[r],e);return e}function Bg(s,t){return s.x-t.x}function zg(s,t){const e=kg(s,t);if(!e)return t;const n=kh(e,s);return Mi(n,n.next),Mi(e,e.next)}function kg(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&ji(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),zs(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&Hg(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function Hg(s,t){return ve(s.prev,s,t.prev)<0&&ve(t.next,s,s.next)<0}function Vg(s,t,e,n){let i=s;do i.z===0&&(i.z=Uo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Gg(i)}function Gg(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function Uo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Wg(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ji(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Xg(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!qg(s,t)&&(zs(s,t)&&zs(t,s)&&Yg(s,t)&&(ve(s.prev,s,t.prev)||ve(s,t.prev,t))||Kr(s,t)&&ve(s.prev,s,s.next)>0&&ve(t.prev,t,t.next)>0)}function ve(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Kr(s,t){return s.x===t.x&&s.y===t.y}function zh(s,t,e,n){const i=Sr(ve(s,t,e)),r=Sr(ve(s,t,n)),a=Sr(ve(e,n,s)),o=Sr(ve(e,n,t));return!!(i!==r&&a!==o||i===0&&yr(s,e,t)||r===0&&yr(s,n,t)||a===0&&yr(e,s,n)||o===0&&yr(e,t,n))}function yr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Sr(s){return s>0?1:s<0?-1:0}function qg(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&zh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function zs(s,t){return ve(s.prev,s,s.next)<0?ve(s,t,s.next)>=0&&ve(s,s.prev,t)>=0:ve(s,t,s.prev)<0||ve(s,s.next,t)<0}function Yg(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function kh(s,t){const e=new No(s.i,s.x,s.y),n=new No(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function bc(s,t,e,n){const i=new No(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ks(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function No(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Zg(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Is{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Is.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Ec(t),Tc(n,t);let a=t.length;e.forEach(Ec);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Tc(n,e[l]);const o=Dg.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Ec(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Tc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class jr extends Me{constructor(t=new il([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new Jt(i,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:$g;let M,_=!1,I,C,R,P;p&&(M=p.getSpacedPoints(h),_=!0,d=!1,I=p.computeFrenetFrames(h,!1),C=new A,R=new A,P=new A),d||(m=0,f=0,g=0,v=0);const w=o.extractPoints(c);let y=w.shape;const D=w.holes;if(!Is.isClockWise(y)){y=y.reverse();for(let J=0,it=D.length;J<it;J++){const L=D[J];Is.isClockWise(L)&&(D[J]=L.reverse())}}const O=Is.triangulateShape(y,D),V=y;for(let J=0,it=D.length;J<it;J++){const L=D[J];y=y.concat(L)}function q(J,it,L){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(it,L)}const G=y.length,K=O.length;function W(J,it,L){let Rt,et,xt;const ot=J.x-it.x,It=J.y-it.y,vt=L.x-J.x,T=L.y-J.y,S=ot*ot+It*It,z=ot*T-It*vt;if(Math.abs(z)>Number.EPSILON){const Y=Math.sqrt(S),tt=Math.sqrt(vt*vt+T*T),Z=it.x-It/Y,Et=it.y+ot/Y,ht=L.x-T/tt,_t=L.y+vt/tt,Zt=((ht-Z)*T-(_t-Et)*vt)/(ot*T-It*vt);Rt=Z+ot*Zt-J.x,et=Et+It*Zt-J.y;const nt=Rt*Rt+et*et;if(nt<=2)return new Q(Rt,et);xt=Math.sqrt(nt/2)}else{let Y=!1;ot>Number.EPSILON?vt>Number.EPSILON&&(Y=!0):ot<-Number.EPSILON?vt<-Number.EPSILON&&(Y=!0):Math.sign(It)===Math.sign(T)&&(Y=!0),Y?(Rt=-It,et=ot,xt=Math.sqrt(S)):(Rt=ot,et=It,xt=Math.sqrt(S/2))}return new Q(Rt/xt,et/xt)}const lt=[];for(let J=0,it=V.length,L=it-1,Rt=J+1;J<it;J++,L++,Rt++)L===it&&(L=0),Rt===it&&(Rt=0),lt[J]=W(V[J],V[L],V[Rt]);const gt=[];let wt,kt=lt.concat();for(let J=0,it=D.length;J<it;J++){const L=D[J];wt=[];for(let Rt=0,et=L.length,xt=et-1,ot=Rt+1;Rt<et;Rt++,xt++,ot++)xt===et&&(xt=0),ot===et&&(ot=0),wt[Rt]=W(L[Rt],L[xt],L[ot]);gt.push(wt),kt=kt.concat(wt)}for(let J=0;J<m;J++){const it=J/m,L=f*Math.cos(it*Math.PI/2),Rt=g*Math.sin(it*Math.PI/2)+v;for(let et=0,xt=V.length;et<xt;et++){const ot=q(V[et],lt[et],Rt);at(ot.x,ot.y,-L)}for(let et=0,xt=D.length;et<xt;et++){const ot=D[et];wt=gt[et];for(let It=0,vt=ot.length;It<vt;It++){const T=q(ot[It],wt[It],Rt);at(T.x,T.y,-L)}}}const ne=g+v;for(let J=0;J<G;J++){const it=d?q(y[J],kt[J],ne):y[J];_?(R.copy(I.normals[0]).multiplyScalar(it.x),C.copy(I.binormals[0]).multiplyScalar(it.y),P.copy(M[0]).add(R).add(C),at(P.x,P.y,P.z)):at(it.x,it.y,0)}for(let J=1;J<=h;J++)for(let it=0;it<G;it++){const L=d?q(y[it],kt[it],ne):y[it];_?(R.copy(I.normals[J]).multiplyScalar(L.x),C.copy(I.binormals[J]).multiplyScalar(L.y),P.copy(M[J]).add(R).add(C),at(P.x,P.y,P.z)):at(L.x,L.y,u/h*J)}for(let J=m-1;J>=0;J--){const it=J/m,L=f*Math.cos(it*Math.PI/2),Rt=g*Math.sin(it*Math.PI/2)+v;for(let et=0,xt=V.length;et<xt;et++){const ot=q(V[et],lt[et],Rt);at(ot.x,ot.y,u+L)}for(let et=0,xt=D.length;et<xt;et++){const ot=D[et];wt=gt[et];for(let It=0,vt=ot.length;It<vt;It++){const T=q(ot[It],wt[It],Rt);_?at(T.x,T.y+M[h-1].y,M[h-1].x+L):at(T.x,T.y,u+L)}}}$(),st();function $(){const J=i.length/3;if(d){let it=0,L=G*it;for(let Rt=0;Rt<K;Rt++){const et=O[Rt];Dt(et[2]+L,et[1]+L,et[0]+L)}it=h+m*2,L=G*it;for(let Rt=0;Rt<K;Rt++){const et=O[Rt];Dt(et[0]+L,et[1]+L,et[2]+L)}}else{for(let it=0;it<K;it++){const L=O[it];Dt(L[2],L[1],L[0])}for(let it=0;it<K;it++){const L=O[it];Dt(L[0]+G*h,L[1]+G*h,L[2]+G*h)}}n.addGroup(J,i.length/3-J,0)}function st(){const J=i.length/3;let it=0;bt(V,it),it+=V.length;for(let L=0,Rt=D.length;L<Rt;L++){const et=D[L];bt(et,it),it+=et.length}n.addGroup(J,i.length/3-J,1)}function bt(J,it){let L=J.length;for(;--L>=0;){const Rt=L;let et=L-1;et<0&&(et=J.length-1);for(let xt=0,ot=h+m*2;xt<ot;xt++){const It=G*xt,vt=G*(xt+1),T=it+Rt+It,S=it+et+It,z=it+et+vt,Y=it+Rt+vt;Ot(T,S,z,Y)}}}function at(J,it,L){l.push(J),l.push(it),l.push(L)}function Dt(J,it,L){Nt(J),Nt(it),Nt(L);const Rt=i.length/3,et=x.generateTopUV(n,i,Rt-3,Rt-2,Rt-1);Qt(et[0]),Qt(et[1]),Qt(et[2])}function Ot(J,it,L,Rt){Nt(J),Nt(it),Nt(Rt),Nt(it),Nt(L),Nt(Rt);const et=i.length/3,xt=x.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);Qt(xt[0]),Qt(xt[1]),Qt(xt[3]),Qt(xt[1]),Qt(xt[2]),Qt(xt[3])}function Nt(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function Qt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Kg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Do[i.type]().fromJSON(i)),new jr(n,t.options)}}const $g={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Q(r,a),new Q(o,l),new Q(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Q(a,1-l),new Q(c,1-u),new Q(d,1-g),new Q(v,1-p)]:[new Q(o,1-l),new Q(h,1-u),new Q(f,1-g),new Q(m,1-p)]}};function Kg(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class sl extends $r{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new sl(t.radius,t.detail)}}class rl extends Me{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new A,g=new Q;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const x=p+m,M=x,_=x+n+1,I=x+n+2,C=x+1;o.push(M,_,C),o.push(_,I,C)}}this.setIndex(o),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class yi extends Me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new A,d=new A,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let I=0;I<=e;I++){const C=I/e;u.x=-t*Math.cos(i+C*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(i+C*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(C+_,1-M),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const M=h[p][x+1],_=h[p][x],I=h[p+1][x],C=h[p+1][x+1];(p!==0||a>0)&&f.push(M,_,C),(p!==n-1||l<Math.PI)&&f.push(_,I,C)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class al extends $r{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new al(t.radius,t.detail)}}class ol extends Me{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;a.push(v,m,x),a.push(m,p,x)}this.setIndex(a),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ol(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class jg extends Ee{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class be extends wi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dh,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jr extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Jg extends Jr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Da=new $t,Ac=new A,Cc=new A;class Hh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yo,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ac),Cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cc),e.updateMatrixWorld(),Da.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Rc=new $t,Es=new A,Ia=new A;class Qg extends Hh{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(t.matrixWorld),n.position.copy(Es),Ia.copy(n.position),Ia.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ia),n.updateMatrixWorld(),i.makeTranslation(-Es.x,-Es.y,-Es.z),Rc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rc)}}class Vh extends Jr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class tv extends Hh{constructor(){super(new Zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pc extends Jr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new tv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ev extends Jr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class nv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Lc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Lc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Lc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oo);const We=s=>440*Math.pow(2,(s-69)/12),iv=[{root:45,tones:[57,60,64,69]},{root:41,tones:[53,57,60,65]},{root:48,tones:[55,60,64,67]},{root:43,tones:[55,59,62,67]}],sv=[0,1,2,3,2,1,2,3,0,2,1,3,2,1,3,2],rv=[76,-1,74,72,-1,69,-1,72,74,-1,-1,76,79,-1,76,-1];class av{constructor(){E(this,"ctx",null);E(this,"master");E(this,"musicBus");E(this,"sfxBus");E(this,"drumBus");E(this,"leadBus");E(this,"reverb");E(this,"delay");E(this,"noise");E(this,"scheduler",null);E(this,"nextTime",0);E(this,"step",0);E(this,"engine",null);E(this,"screech",null);E(this,"ambience",[]);E(this,"musicVolume",.55);E(this,"sfxVolume",.8);E(this,"muted",!1);E(this,"intensity",.3);E(this,"lastFoot",0)}get ready(){return this.ctx!==null&&this.ctx.state==="running"}unlock(){if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;try{this.ctx=new t}catch{return}this.build()}this.ctx.state==="suspended"&&this.ctx.resume()}build(){const t=this.ctx,e=t.createDynamicsCompressor();e.threshold.value=-14,e.ratio.value=4,this.master=t.createGain(),this.master.connect(e).connect(t.destination),this.musicBus=t.createGain(),this.sfxBus=t.createGain(),this.musicBus.connect(this.master),this.sfxBus.connect(this.master),this.drumBus=t.createGain(),this.drumBus.connect(this.musicBus),this.leadBus=t.createGain(),this.leadBus.connect(this.musicBus),this.noise=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const n=this.noise.getChannelData(0);for(let c=0;c<n.length;c++)n[c]=Math.random()*2-1;const i=t.sampleRate*2.2,r=t.createBuffer(2,i,t.sampleRate);for(let c=0;c<2;c++){const h=r.getChannelData(c);for(let u=0;u<i;u++)h[u]=(Math.random()*2-1)*Math.pow(1-u/i,3.2)}this.reverb=t.createConvolver(),this.reverb.buffer=r;const a=t.createGain();a.gain.value=.28,this.reverb.connect(a).connect(this.master),this.delay=t.createDelay(1),this.delay.delayTime.value=60/104*.75;const o=t.createGain();o.gain.value=.32;const l=t.createGain();l.gain.value=.35,this.delay.connect(o).connect(this.delay),this.delay.connect(l).connect(this.musicBus),this.applyVolumes(),this.startAmbience()}setVolumes(t,e,n){this.musicVolume=t,this.sfxVolume=e,this.muted=n,this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:1,t,.03),this.musicBus.gain.setTargetAtTime(this.musicVolume*.5,t,.05),this.sfxBus.gain.setTargetAtTime(this.sfxVolume,t,.05)}setIntensity(t){if(this.intensity=t,!this.ctx)return;const e=this.ctx.currentTime;this.drumBus.gain.setTargetAtTime(.25+t*.75,e,.4),this.leadBus.gain.setTargetAtTime(t>.5?.8:0,e,.6)}startMusic(){!this.ctx||this.scheduler!==null||(this.nextTime=this.ctx.currentTime+.1,this.step=0,this.setIntensity(this.intensity),this.scheduler=window.setInterval(()=>this.schedule(),25))}stopMusic(){this.scheduler!==null&&window.clearInterval(this.scheduler),this.scheduler=null}schedule(){const t=this.ctx,e=60/104/4;for(;this.nextTime<t.currentTime+.15;)this.playStep(this.step,this.nextTime,e),this.nextTime+=e,this.step=(this.step+1)%128}playStep(t,e,n){const i=Math.floor(t/16)%4,r=t%16,a=iv[i];if(r%4===0&&this.kick(e),(r===4||r===12)&&this.snare(e),r%2===1&&this.hat(e,r%4===3?.5:.28),r%2===0&&this.bass(e,We(a.root-12+(r%8===6?12:0)),n*1.8),this.arp(e,We(a.tones[sv[r]]+12),n*.9),r===0&&this.pad(e,a.tones,n*16),r%2===0){const o=Math.floor(t/32)%2,l=Math.floor(t/16)%2*8+r/2,c=rv[l];o===1&&c>0&&this.lead(e,We(c),n*1.9)}}env(t,e,n,i,r){t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(i,e+n),t.gain.exponentialRampToValueAtTime(1e-4,e+n+r)}kick(t){const e=this.ctx,n=e.createOscillator(),i=e.createGain();n.frequency.setValueAtTime(140,t),n.frequency.exponentialRampToValueAtTime(42,t+.12),this.env(i,t,.003,.9,.28),n.connect(i).connect(this.drumBus),n.start(t),n.stop(t+.35)}snare(t){const e=this.ctx,n=e.createBufferSource();n.buffer=this.noise;const i=e.createBiquadFilter();i.type="bandpass",i.frequency.value=1800,i.Q.value=.7;const r=e.createGain();this.env(r,t,.002,.55,.22),n.connect(i).connect(r),r.connect(this.drumBus),r.connect(this.reverb),n.start(t,Math.random()),n.stop(t+.3);const a=e.createOscillator(),o=e.createGain();a.frequency.setValueAtTime(220,t),a.frequency.exponentialRampToValueAtTime(140,t+.08),this.env(o,t,.002,.25,.1),a.connect(o).connect(this.drumBus),a.start(t),a.stop(t+.15)}hat(t,e){const n=this.ctx,i=n.createBufferSource();i.buffer=this.noise;const r=n.createBiquadFilter();r.type="highpass",r.frequency.value=8e3;const a=n.createGain();this.env(a,t,.001,.12*e,.04),i.connect(r).connect(a).connect(this.drumBus),i.start(t,Math.random()),i.stop(t+.07)}bass(t,e,n){const i=this.ctx,r=i.createOscillator();r.type="sawtooth",r.frequency.value=e;const a=i.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(900,t),a.frequency.exponentialRampToValueAtTime(220,t+n),a.Q.value=6;const o=i.createGain();this.env(o,t,.005,.32,n),r.connect(a).connect(o).connect(this.musicBus),r.start(t),r.stop(t+n+.05)}arp(t,e,n){const i=this.ctx,r=i.createOscillator();r.type="square",r.frequency.value=e;const a=i.createBiquadFilter();a.type="lowpass",a.frequency.value=2400;const o=i.createGain();this.env(o,t,.004,.06,n),r.connect(a).connect(o),o.connect(this.musicBus),o.connect(this.delay),r.start(t),r.stop(t+n+.05)}pad(t,e,n){const i=this.ctx,r=i.createBiquadFilter();r.type="lowpass",r.frequency.value=1400;const a=i.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.linearRampToValueAtTime(.05,t+.6),a.gain.linearRampToValueAtTime(1e-4,t+n),r.connect(a),a.connect(this.musicBus),a.connect(this.reverb);for(const o of e.slice(0,3))for(const l of[-9,9]){const c=i.createOscillator();c.type="sawtooth",c.frequency.value=We(o),c.detune.value=l,c.connect(r),c.start(t),c.stop(t+n+.1)}}lead(t,e,n){const i=this.ctx,r=i.createOscillator();r.type="sawtooth",r.frequency.value=e;const a=i.createOscillator();a.frequency.value=5.5;const o=i.createGain();o.gain.value=4,a.connect(o).connect(r.detune);const l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=2600;const c=i.createGain();this.env(c,t,.02,.07,n),r.connect(l).connect(c),c.connect(this.leadBus),c.connect(this.reverb),r.start(t),a.start(t),r.stop(t+n+.1),a.stop(t+n+.1)}blip(t,e,n,i,r,a=0,o){if(!this.ready)return;const l=this.ctx,c=l.currentTime+a,h=l.createOscillator();h.type=t,h.frequency.setValueAtTime(e,c),h.frequency.exponentialRampToValueAtTime(Math.max(20,n),c+i);const u=l.createGain();this.env(u,c,.003,r,i),h.connect(u).connect(o??this.sfxBus),h.start(c),h.stop(c+i+.05)}hiss(t,e,n,i,r="bandpass",a=0,o){if(!this.ready)return;const l=this.ctx,c=l.currentTime+a,h=l.createBufferSource();h.buffer=this.noise;const u=l.createBiquadFilter();u.type=r,u.frequency.setValueAtTime(t,c),o&&u.frequency.exponentialRampToValueAtTime(o,c+n),u.Q.value=e;const d=l.createGain();this.env(d,c,.002,i,n),h.connect(u).connect(d).connect(this.sfxBus),h.start(c,Math.random()*1.5),h.stop(c+n+.05)}shoot(t){t==="pistol"?(this.hiss(2600,.8,.09,.5,"bandpass",0,600),this.blip("square",900,120,.12,.22),this.blip("sine",160,50,.1,.4)):(this.blip("sawtooth",1500,300,.07,.16),this.hiss(4e3,1.2,.05,.3,"bandpass",0,1500),this.blip("sine",120,45,.07,.28))}dryFire(){this.blip("square",1800,1700,.03,.12)}reload(t){this.blip("square",300,260,.04,.15),this.hiss(3e3,3,.05,.2,"bandpass",.12),this.blip("square",520,480,.04,.15,t==="rifle"?.5:.3)}reloadDone(){this.blip("square",700,900,.05,.16),this.blip("square",1100,1300,.05,.12,.06)}switchWeapon(){this.blip("triangle",600,900,.06,.18)}hitMarker(t){this.blip("sine",t?2200:1500,t?2600:1300,.05,t?.25:.14),t&&this.blip("sine",3300,3400,.08,.12,.04)}enemyDie(){this.blip("sawtooth",600,60,.4,.22),this.hiss(1200,1,.3,.2,"lowpass",0,200)}enemyShoot(t){const e=Math.max(.03,.22*(1-t/60));this.blip("sawtooth",700,180,.16,e)}melee(){this.hiss(400,1,.15,.4,"lowpass"),this.blip("sine",110,40,.15,.5)}playerHurt(){this.blip("sawtooth",220,90,.18,.3),this.hiss(800,1,.12,.25,"lowpass")}footstep(t){if(!this.ready)return;const e=this.ctx.currentTime;e-this.lastFoot<.12||(this.lastFoot=e,this.hiss(t?900:700,1.4,.06,t?.16:.1,"bandpass",0,250))}jump(){this.hiss(600,1,.1,.12,"bandpass",0,1400)}land(){this.blip("sine",120,50,.1,.3),this.hiss(500,1,.08,.15,"lowpass")}pickup(t){const e=t==="health"?660:t==="armor"?520:t==="boost"?440:t==="cash"?990:780;this.blip("triangle",e,e*1.5,.08,.2),this.blip("triangle",e*1.5,e*2,.1,.18,.07)}uiClick(){this.blip("triangle",900,1200,.05,.14)}uiHover(){this.blip("sine",1400,1500,.03,.05)}spawnWhoosh(){this.hiss(300,2,.6,.12,"bandpass",0,2400)}missionStart(){[0,.12,.24].forEach((t,e)=>this.blip("square",We(69+e*5),We(69+e*5),.14,.14,t)),this.blip("sawtooth",We(81),We(81),.4,.12,.36)}waveClear(){[0,.1,.2,.3].forEach((t,e)=>this.blip("triangle",We(72+[0,4,7,12][e]),We(72+[0,4,7,12][e]),.18,.18,t))}missionComplete(){[0,.15,.3,.45,.7].forEach((t,e)=>this.blip("sawtooth",We([69,72,76,81,84][e]),We([69,72,76,81,84][e]),.35,.14,t))}gameOver(){[0,.25,.5].forEach((t,e)=>this.blip("sawtooth",We([64,60,57][e]),We([63,59,45][e]),.4,.18,t))}combo(t){this.blip("sine",600+t*120,900+t*160,.08,.1)}crash(t){this.hiss(500,.8,.25,Math.min(.6,.15+t*.02),"lowpass",0,120),this.blip("square",140,50,.2,Math.min(.35,t*.02))}honk(){this.blip("square",392,390,.32,.06),this.blip("square",494,492,.32,.05)}carDoor(){this.blip("square",180,90,.08,.25),this.hiss(1200,2,.06,.15,"bandpass",.05)}setEngine(t,e,n,i){if(!this.ready)return;const r=this.ctx;if(t&&!this.engine){const f=r.createOscillator(),g=r.createOscillator();f.type="sawtooth",g.type="square";const v=r.createBiquadFilter();v.type="lowpass",v.frequency.value=600;const m=r.createGain();m.gain.value=0,f.connect(v),g.connect(v),v.connect(m).connect(this.sfxBus),f.start(),g.start(),this.engine={osc1:f,osc2:g,filter:v,gain:m};const p=r.createBufferSource();p.buffer=this.noise,p.loop=!0;const x=r.createBiquadFilter();x.type="bandpass",x.frequency.value=2400,x.Q.value=3;const M=r.createGain();M.gain.value=0,p.connect(x).connect(M).connect(this.sfxBus),p.start(),this.screech={src:p,gain:M}}if(!t){if(this.engine){const f=this.engine;f.gain.gain.setTargetAtTime(0,r.currentTime,.08),f.osc1.stop(r.currentTime+.4),f.osc2.stop(r.currentTime+.4),this.engine=null}this.screech&&(this.screech.gain.gain.setTargetAtTime(0,r.currentTime,.05),this.screech.src.stop(r.currentTime+.3),this.screech=null);return}const a=this.engine,o=r.currentTime,l=[0,9,17,25,33,60];let c=0;for(;c<l.length-2&&Math.abs(e)>l[c+1];)c++;const h=l[c+1]-l[c],u=.25+.75*((Math.abs(e)-l[c])/h),d=38+u*70+c*6;a.osc1.frequency.setTargetAtTime(d,o,.05),a.osc2.frequency.setTargetAtTime(d*.5,o,.05),a.filter.frequency.setTargetAtTime(400+n*1400+u*600,o,.08),a.gain.gain.setTargetAtTime(.08+Math.abs(n)*.07,o,.08),this.screech.gain.gain.setTargetAtTime(Math.min(.22,Math.max(0,i-2.5)*.04),o,.05)}startAmbience(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noise,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=500;const i=t.createGain();i.gain.value=.05;const r=t.createOscillator();r.frequency.value=.12;const a=t.createGain();a.gain.value=.035,r.connect(a).connect(i.gain),e.connect(n).connect(i).connect(this.sfxBus),e.start(),r.start(),this.ambience.push(e,r)}dispose(){this.stopMusic(),this.setEngine(!1,0,0,0);for(const t of this.ambience)t.stop();this.ctx?.close(),this.ctx=null}}const Ke=640;class ov{constructor(){E(this,"points");E(this,"pos",new Float32Array(Ke*3));E(this,"vel",new Float32Array(Ke*3));E(this,"col",new Float32Array(Ke*3));E(this,"alpha",new Float32Array(Ke));E(this,"size",new Float32Array(Ke));E(this,"baseSize",new Float32Array(Ke));E(this,"life",new Float32Array(Ke));E(this,"maxLife",new Float32Array(Ke));E(this,"gravity",new Float32Array(Ke));E(this,"drag",new Float32Array(Ke));E(this,"grow",new Float32Array(Ke));E(this,"head",0);E(this,"limit",Ke);E(this,"active",0);E(this,"geo",new Me);this.geo.setAttribute("position",new we(this.pos,3).setUsage(Ys)),this.geo.setAttribute("color",new we(this.col,3).setUsage(Ys)),this.geo.setAttribute("aAlpha",new we(this.alpha,1).setUsage(Ys)),this.geo.setAttribute("aSize",new we(this.size,1).setUsage(Ys));const t=new Ee({transparent:!0,depthWrite:!1,blending:Bn,vertexColors:!0,uniforms:{uScale:{value:400}},vertexShader:`
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
          gl_PointSize = aSize * uScale / max(0.1, -mv.z);
        }`,fragmentShader:`
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float core = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor * (1.0 + core * 1.5), core * vAlpha);
        }`});this.points=new Ih(this.geo,t),this.points.frustumCulled=!1,this.points.renderOrder=5}setLimit(t){this.limit=Math.max(32,Math.min(Ke,t))}setViewportHeight(t){this.points.material.uniforms.uScale.value=t*.5}emit(t,e,n,i,r,a,o,l,c,h=0,u=0,d=0){const f=this.head;this.head=(this.head+1)%this.limit;const g=f*3;this.pos[g]=t,this.pos[g+1]=e,this.pos[g+2]=n,this.vel[g]=i,this.vel[g+1]=r,this.vel[g+2]=a,this.col[g]=o.r,this.col[g+1]=o.g,this.col[g+2]=o.b,this.baseSize[f]=l,this.size[f]=l,this.alpha[f]=1,this.life[f]=c,this.maxLife[f]=c,this.gravity[f]=h,this.drag[f]=u,this.grow[f]=d}burst(t,e,n,i,r,a,o,l,c=9,h=.3){for(let u=0;u<i;u++){const d=Math.random()*2-1,f=Math.random()*Math.PI*2,g=Math.sqrt(1-d*d),v=r*(.35+Math.random()*.65);this.emit(t,e,n,g*Math.cos(f)*v,(d+h)*v,g*Math.sin(f)*v,a,o*(.6+Math.random()*.6),l*(.6+Math.random()*.6),c,1.5)}}sparks(t,e,n,i,r,a,o,l){for(let c=0;c<o;c++){const h=4+Math.random()*7;this.emit(t,e,n,(i+(Math.random()-.5)*1.4)*h,(r+Math.random()*.8)*h,(a+(Math.random()-.5)*1.4)*h,l,.06+Math.random()*.05,.25+Math.random()*.25,14,2)}}update(t){let e=0;for(let i=0;i<this.limit;i++){if(this.life[i]<=0){this.alpha[i]!==0&&(this.alpha[i]=0,this.size[i]=0);continue}e++,this.life[i]-=t;const r=i*3,a=Math.max(0,1-this.drag[i]*t);this.vel[r]*=a,this.vel[r+1]=this.vel[r+1]*a-this.gravity[i]*t,this.vel[r+2]*=a,this.pos[r]+=this.vel[r]*t,this.pos[r+1]+=this.vel[r+1]*t,this.pos[r+2]+=this.vel[r+2]*t,this.pos[r+1]<.02&&(this.pos[r+1]=.02,this.vel[r+1]*=-.35);const o=Math.max(0,this.life[i]/this.maxLife[i]);this.alpha[i]=o*o,this.size[i]=this.baseSize[i]*(1+this.grow[i]*(1-o))}this.active=e;const n=this.geo.attributes;n.position.needsUpdate=!0,n.aAlpha.needsUpdate=!0,n.aSize.needsUpdate=!0,n.color.needsUpdate=!0}get activeCount(){return this.active}clear(){this.life.fill(0)}dispose(){this.geo.dispose(),this.points.material.dispose()}}const Gh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class fs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const lv=new Zo(-1,1,1,-1,0,1);class cv extends Me{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const hv=new cv;class ll{constructor(t){this._mesh=new Lt(hv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,lv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Wh extends fs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ee?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Os.clone(t.uniforms),this.material=new Ee({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new ll(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Dc extends fs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class uv extends fs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class dv{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Q);this._width=n.width,this._height=n.height,e=new pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Fn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Wh(Gh),this.copyPass.material.blending=Nn,this.clock=new nv}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Dc!==void 0&&(a instanceof Dc?n=!0:a instanceof uv&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class fv extends fs{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new mt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}}const pv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new mt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ls extends fs{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new Q(t.x,t.y):new Q(256,256),this.clearColor=new mt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new pn(r,a,{type:Fn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new pn(r,a,{type:Fn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new pn(r,a,{type:Fn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=pv;this.highPassUniforms=Os.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ee({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Q(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Gh;this.copyUniforms=Os.clone(h.uniforms),this.blendMaterial=new Ee({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Bn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new mt,this.oldClearAlpha=1,this.basic=new ce,this.fsQuad=new ll(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Q(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ls.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ls.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ee({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Q(.5,.5)},direction:{value:new Q(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}ls.BlurDirectionX=new Q(1,0);ls.BlurDirectionY=new Q(0,1);const mv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class gv extends fs{constructor(){super();const t=mv;this.uniforms=Os.clone(t.uniforms),this.material=new jg({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new ll(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Bo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===th?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===eh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const vv={uniforms:{tDiffuse:{value:null},uTime:{value:0},uAberration:{value:.0012},uDamage:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberration;
    uniform float uDamage;
    varying vec2 vUv;
    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);
      vec2 off = c * (uAberration + uDamage * 0.01) * (0.5 + r2 * 4.0);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      col *= 1.0 - smoothstep(0.25, 0.9, r2 * 1.6) * 0.45;
      col *= 0.985 + 0.015 * sin(vUv.y * 900.0 + uTime * 8.0);
      gl_FragColor = vec4(col, 1.0);
    }`};class _v{constructor(t,e,n){E(this,"composer");E(this,"bloom");E(this,"finish");const i=t.getSize(new Q);this.composer=new dv(t),this.composer.addPass(new fv(e,n)),this.bloom=new ls(new Q(i.x/2,i.y/2),.85,.55,.82),this.composer.addPass(this.bloom),this.finish=new Wh(vv),this.composer.addPass(this.finish),this.composer.addPass(new gv)}setBloom(t){this.bloom.enabled=t}setSize(t,e,n){this.composer.setPixelRatio(n),this.composer.setSize(t,e),this.bloom.resolution.set(t*n/2,e*n/2)}render(t,e){this.finish.uniforms.uTime.value=t,this.finish.uniforms.uDamage.value=e,this.composer.render()}dispose(){this.composer.dispose()}}const Hs={value:0},Xh=`
float nvHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float nvNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(nvHash(i), nvHash(i + vec2(1.0, 0.0)), u.x),
             mix(nvHash(i + vec2(0.0, 1.0)), nvHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
`;function xv(){const s=new be({color:16777215,roughness:.78,metalness:.15,envMapIntensity:.35});return s.onBeforeCompile=t=>{t.uniforms.uTime=Hs,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float aSeed;
attribute vec3 aAccent;
varying vec3 vNvPos;
varying vec3 vNvNormal;
varying vec3 vNvLocal;
varying vec3 vNvAccent;
varying float vNvSeed;
varying float vNvHeight;
varying float vNvBase;`).replace("#include <project_vertex>",`#include <project_vertex>
mat4 nvM = modelMatrix * instanceMatrix;
vNvPos = (nvM * vec4(transformed, 1.0)).xyz;
vNvNormal = normalize(mat3(nvM) * objectNormal);
vNvLocal = position;
vNvAccent = aAccent;
vNvSeed = aSeed;
vNvBase = (nvM * vec4(0.0, 0.0, 0.0, 1.0)).y;
vNvHeight = vNvBase + length(nvM[1].xyz);`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
uniform float uTime;
varying vec3 vNvPos;
varying vec3 vNvNormal;
varying vec3 vNvLocal;
varying vec3 vNvAccent;
varying float vNvSeed;
varying float vNvHeight;
varying float vNvBase;
${Xh}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{
  float side = 1.0 - step(0.55, abs(vNvNormal.y));
  bool xFace = abs(vNvNormal.x) > 0.5;
  vec2 wuv = vec2(xFace ? vNvPos.z : vNvPos.x, vNvPos.y);
  float face = xFace ? sign(vNvNormal.x) : 2.0 + sign(vNvNormal.z);
  vec2 g = wuv / vec2(2.1, 3.3);
  vec2 cell = floor(g);
  vec2 f = fract(g);
  vec2 fw = fwidth(g);
  float aaFade = clamp(1.0 - max(fw.x, fw.y) * 1.6, 0.0, 1.0);
  float wx = smoothstep(0.16, 0.16 + fw.x + 0.01, f.x) * (1.0 - smoothstep(0.84 - fw.x - 0.01, 0.84, f.x));
  float wy = smoothstep(0.22, 0.22 + fw.y + 0.01, f.y) * (1.0 - smoothstep(0.78 - fw.y - 0.01, 0.78, f.y));
  float win = wx * wy;
  float zone = side * step(vNvBase + 4.2, vNvPos.y) * step(vNvPos.y, vNvHeight - 1.3);
  float h = nvHash(cell + vec2(vNvSeed * 31.7, face * 7.3));
  float density = 0.22 + 0.4 * fract(vNvSeed * 13.1);
  float lit = step(1.0 - density, h);
  float h2 = nvHash(cell.yx + vNvSeed * 3.1);
  vec3 wcol = h2 < 0.55 ? vec3(1.0, 0.68, 0.38) : (h2 < 0.82 ? vec3(0.4, 0.82, 1.0) : vec3(1.0, 0.4, 0.85));
  float flick = 0.82 + 0.18 * sin(uTime * (1.5 + h * 5.0) + h * 40.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.015, 0.02, 0.045), zone * win * 0.9 * aaFade);
  totalEmissiveRadiance += zone * mix(wcol * density * 0.28, wcol * lit * win * flick * 1.5, aaFade);
  float shopY = vNvPos.y - vNvBase;
  float shop = side * step(vNvBase, 0.5) * smoothstep(0.5, 0.8, shopY) * (1.0 - smoothstep(2.9, 3.2, shopY));
  float shopPattern = step(0.35, fract(wuv.x * 0.18 + vNvSeed * 5.0));
  totalEmissiveRadiance += vNvAccent * shop * shopPattern * 0.45;
  float topBand = side * smoothstep(vNvHeight - 0.95, vNvHeight - 0.8, vNvPos.y) * (1.0 - smoothstep(vNvHeight - 0.5, vNvHeight - 0.35, vNvPos.y));
  float midBand = side * step(vNvBase, 0.5) * smoothstep(3.55, 3.65, shopY) * (1.0 - smoothstep(3.8, 3.9, shopY));
  float edge = xFace ? abs(vNvLocal.z) : abs(vNvLocal.x);
  float cornerOn = step(0.45, fract(vNvSeed * 7.77));
  float corner = side * cornerOn * smoothstep(0.475, 0.488, edge) * step(vNvBase + 4.0, vNvPos.y);
  float pulse = 0.82 + 0.18 * sin(uTime * 1.3 + vNvSeed * 20.0);
  totalEmissiveRadiance += vNvAccent * (topBand * 2.4 + midBand * 1.5 + corner * 1.5) * pulse;
}`)},s.customProgramCacheKey=()=>"nv-building",s}function Mv(s){const t=new be({color:16777215,roughness:.6,metalness:.2,envMapIntensity:1.25}),e=new Float32Array(5).fill(9999),n=new Float32Array(5).fill(9999);return s.xs.forEach((i,r)=>e[r]=i),s.zs.forEach((i,r)=>n[r]=i),t.onBeforeCompile=i=>{i.uniforms.uRoadX={value:e},i.uniforms.uRoadZ={value:n},i.uniforms.uHalf={value:s.halfWidth},i.uniforms.uWalk={value:s.sidewalk},i.uniforms.uTime=Hs,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vGPos;`).replace("#include <project_vertex>",`#include <project_vertex>
vGPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRoadX[5];
uniform float uRoadZ[5];
uniform float uHalf;
uniform float uWalk;
uniform float uTime;
varying vec3 vGPos;
${Xh}
float gRoad; float gWalk; float gMark; float gWet; float gBeach; float gPromenade;
void nvGround(vec2 p) {
  float dx = 1e4; float cx = 0.0;
  float dz = 1e4; float cz = 0.0;
  for (int i = 0; i < 5; i++) {
    float a = abs(p.x - uRoadX[i]); if (a < dx) { dx = a; cx = p.x - uRoadX[i]; }
    float b = abs(p.y - uRoadZ[i]); if (b < dz) { dz = b; cz = p.y - uRoadZ[i]; }
  }
  bool inside = abs(p.y) < 107.0 && p.x > -107.0 && p.x < 107.0;
  float vr = (dx < uHalf && inside) ? 1.0 : 0.0;
  float hr = (dz < uHalf && inside) ? 1.0 : 0.0;
  gRoad = max(vr, hr);
  float walkBand = (dx < uHalf + uWalk || dz < uHalf + uWalk) ? 1.0 : 0.0;
  gWalk = (1.0 - gRoad) * walkBand * (inside ? 1.0 : 0.0);
  gPromenade = (p.x >= 107.0 && p.x < 113.0 && abs(p.y) < 112.0) ? 1.0 : 0.0;
  gBeach = p.x >= 113.0 ? 1.0 : 0.0;
  // lane markings
  float m = 0.0;
  float inter = vr * hr;
  if (vr > 0.5 && inter < 0.5) {
    float o = abs(cx);
    m += step(o, 0.32) * step(0.12, o) * 1.0;                                  // double yellow
    m += step(abs(o - 3.5), 0.1) * step(fract(p.y / 6.0), 0.5) * 2.0;          // dashed lanes
    m += step(abs(o - 6.6), 0.1) * 2.0;                                        // edge line
    float cw = step(uHalf + 0.2, dz) * step(dz, uHalf + 3.2);
    m = mix(m, 2.0 * step(fract(p.x / 1.3), 0.55) * step(o, uHalf - 0.6), cw); // crosswalk
  }
  if (hr > 0.5 && inter < 0.5) {
    float o = abs(cz);
    m += step(o, 0.32) * step(0.12, o) * 1.0;
    m += step(abs(o - 3.5), 0.1) * step(fract(p.x / 6.0), 0.5) * 2.0;
    m += step(abs(o - 6.6), 0.1) * 2.0;
    float cw = step(uHalf + 0.2, dx) * step(dx, uHalf + 3.2);
    m = mix(m, 2.0 * step(fract(p.y / 1.3), 0.55) * step(o, uHalf - 0.6), cw);
  }
  gMark = m;
  float n = nvNoise(p * 0.11) * 0.65 + nvNoise(p * 0.37) * 0.35;
  gWet = smoothstep(0.48, 0.62, n);
}`).replace("#include <color_fragment>",`#include <color_fragment>
nvGround(vGPos.xz);
{
  vec2 p = vGPos.xz;
  vec3 asphalt = vec3(0.028, 0.026, 0.04) * (0.85 + 0.3 * nvNoise(p * 2.7));
  vec2 tile = fract(p / 1.5);
  float grout = step(0.94, max(tile.x, tile.y));
  vec3 walk = vec3(0.1, 0.085, 0.12) * (1.0 - grout * 0.45);
  vec3 lot = vec3(0.05, 0.045, 0.065) * (0.9 + 0.2 * nvNoise(p * 1.3));
  vec2 pt = fract(p / 2.4);
  vec3 prom = mix(vec3(0.2, 0.09, 0.15), vec3(0.12, 0.06, 0.12), step(0.5, fract((floor(p.x/2.4) + floor(p.y/2.4)) * 0.5)));
  prom *= 1.0 - step(0.95, max(pt.x, pt.y)) * 0.4;
  vec3 sand = vec3(0.32, 0.2, 0.2) * (0.85 + 0.3 * nvNoise(p * 3.0));
  vec3 c = lot;
  c = mix(c, walk, gWalk);
  c = mix(c, asphalt, gRoad);
  c = mix(c, prom, gPromenade);
  c = mix(c, sand, gBeach);
  vec3 markCol = gMark > 1.5 ? vec3(0.75, 0.75, 0.8) : vec3(0.9, 0.62, 0.08);
  c = mix(c, markCol, step(0.5, gMark) * gRoad);
  diffuseColor.rgb = c * (1.0 - gWet * 0.35 * gRoad);
}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.82, 0.5, gRoad);
roughnessFactor = mix(roughnessFactor, 0.07, gWet * (gRoad + gWalk * 0.6 + gPromenade * 0.5));
roughnessFactor = mix(roughnessFactor, 0.95, gBeach);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += step(0.5, gMark) * gRoad * (gMark > 1.5 ? vec3(0.05, 0.05, 0.07) : vec3(0.09, 0.05, 0.0));`)},t.customProgramCacheKey=()=>"nv-ground",t}function Gs(s=128){const t=document.createElement("canvas");t.width=t.height=s;const e=t.getContext("2d"),n=e.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.55)"),n.addColorStop(.6,"rgba(255,255,255,0.12)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,s,s);const i=new Vs(t);return i.colorSpace=De,i}function yv(){const e=document.createElement("canvas");e.width=64,e.height=256;const n=e.getContext("2d"),i=n.createImageData(64,256);for(let a=0;a<256;a++)for(let o=0;o<64;o++){const l=o/63*2-1,c=a/255,h=Math.exp(-l*l*6),u=Math.pow(1-c,1.6)*(.75+.25*Math.sin(c*60+o*.3)),d=Math.max(0,h*u),f=(a*64+o)*4;i.data[f]=i.data[f+1]=i.data[f+2]=255,i.data[f+3]=Math.round(d*255)}n.putImageData(i,0,0);const r=new Vs(e);return r.colorSpace=De,r}function _i(s,t,e=1){return new ce({color:s,map:t,transparent:!0,opacity:e,blending:Bn,depthWrite:!1,toneMapped:!1,fog:!0})}function Sv(s,t,e={}){const n=e.width??512,i=e.height??128,r=document.createElement("canvas");r.width=n,r.height=i;const a=r.getContext("2d");a.clearRect(0,0,n,i);const o=Math.floor(i*(e.sub?.5:.62));a.font=e.font??`700 ${o}px "Trebuchet MS", "Segoe UI", sans-serif`,a.textAlign="center",a.textBaseline="middle";const l=e.sub?i*.4:i/2;a.shadowColor=t,a.lineJoin="round";for(const h of[i*.28,i*.14])a.shadowBlur=h,a.strokeStyle=t,a.lineWidth=i*.05,a.strokeText(s,n/2,l);a.shadowBlur=i*.06,a.fillStyle="#ffffff",a.fillText(s,n/2,l),e.sub&&(a.font=`600 ${Math.floor(i*.2)}px "Trebuchet MS", "Segoe UI", sans-serif`,a.shadowBlur=i*.1,a.fillStyle=t,a.fillText(e.sub,n/2,i*.8));const c=new Vs(r);return c.colorSpace=De,c.anisotropy=4,c}const Ua=new A,Ic=new A,wv=new ti,bv=new A(0,0,1);class Ev{constructor(){E(this,"group",new oe);E(this,"tracers",[]);E(this,"flashes",[]);E(this,"beams",[]);E(this,"rings",[]);E(this,"muzzleLight",new Vh(16732120,0,7,2));E(this,"muzzleLife",0);E(this,"glow",Gs());E(this,"box",new Gt(1,1,1));for(let n=0;n<48;n++){const i=new Lt(this.box,_i(16777215,null,1));i.visible=!1,i.renderOrder=6,this.group.add(i),this.tracers.push({mesh:i,ax:0,ay:0,az:0,bx:0,by:0,bz:0,len:0,travelled:0,speed:0,life:0,maxLife:0,width:0,boltLength:0})}for(let n=0;n<8;n++){const i=new jo(new Yr({map:this.glow,blending:Bn,depthWrite:!1,toneMapped:!1,transparent:!0}));i.visible=!1,i.renderOrder=7,this.group.add(i),this.flashes.push({sprite:i,life:0})}const t=new Re(.6,1.2,60,16,1,!0).translate(0,30,0);for(let n=0;n<8;n++){const i=new Lt(t,_i(16777215,null,.5));i.material.side=He,i.visible=!1,this.group.add(i),this.beams.push({mesh:i,life:0,maxLife:1})}const e=new rl(.8,1,40).rotateX(-Math.PI/2);for(let n=0;n<8;n++){const i=new Lt(e,_i(16777215,null,1));i.material.side=He,i.visible=!1,this.group.add(i),this.rings.push({mesh:i,life:0,maxLife:1,size:1})}this.group.add(this.muzzleLight)}tracer(t,e,n,i,r=0,a=2.5){const o=this.tracers.find(l=>l.life<=0)??this.tracers[0];o.ax=t.x,o.ay=t.y,o.az=t.z,o.bx=e.x,o.by=e.y,o.bz=e.z,o.len=t.distanceTo(e),o.travelled=0,o.speed=r,o.width=i,o.boltLength=a,o.maxLife=r>0?o.len/r+.05:.09,o.life=o.maxLife,o.mesh.material.color.copy(n).multiplyScalar(2.2),o.mesh.visible=!0}muzzleFlash(t,e,n,i){const r=this.flashes.find(a=>a.life<=0)??this.flashes[0];r.sprite.position.copy(t),r.sprite.scale.setScalar(i*(.8+Math.random()*.4)),r.sprite.material.color.copy(n).multiplyScalar(1.5),r.sprite.material.rotation=Math.random()*Math.PI,r.sprite.visible=!0,r.life=.05,this.muzzleLight.position.copy(t).addScaledVector(e,.6),this.muzzleLight.color.copy(n),this.muzzleLight.intensity=3.5,this.muzzleLife=.06}spawnBeam(t,e,n){const i=this.beams.find(r=>r.life<=0)??this.beams[0];i.mesh.position.set(t,0,e),i.mesh.material.color.copy(n).multiplyScalar(1.5),i.mesh.visible=!0,i.maxLife=i.life=.9}ring(t,e,n,i,r,a=.45){const o=this.rings.find(l=>l.life<=0)??this.rings[0];o.mesh.position.set(t,e,n),o.mesh.material.color.copy(i).multiplyScalar(2),o.mesh.visible=!0,o.size=r,o.maxLife=o.life=a}update(t){for(const e of this.tracers){if(e.life<=0)continue;if(e.life-=t,e.life<=0){e.mesh.visible=!1;continue}let n,i,r;e.speed>0?(e.travelled+=e.speed*t,i=Math.min(e.len,e.travelled),n=Math.max(0,i-e.boltLength),r=1):(n=0,i=e.len,r=e.life/e.maxLife);const a=i-n;if(a<.01||e.len<.01){e.mesh.visible=!1;continue}Ua.set(e.bx-e.ax,e.by-e.ay,e.bz-e.az).divideScalar(e.len),Ic.set(e.ax,e.ay,e.az).addScaledVector(Ua,(n+i)/2),e.mesh.position.copy(Ic),e.mesh.quaternion.copy(wv.setFromUnitVectors(bv,Ua)),e.mesh.scale.set(e.width,e.width,a),e.mesh.material.opacity=r}for(const e of this.flashes)e.life<=0||(e.life-=t,e.life<=0&&(e.sprite.visible=!1));this.muzzleLife>0&&(this.muzzleLife-=t,this.muzzleLife<=0&&(this.muzzleLight.intensity=0));for(const e of this.beams){if(e.life<=0)continue;e.life-=t;const n=e.life/e.maxLife;e.mesh.material.opacity=Math.sin(n*Math.PI)*.55,e.mesh.scale.set(.4+n,1,.4+n),e.life<=0&&(e.mesh.visible=!1)}for(const e of this.rings){if(e.life<=0)continue;e.life-=t;const n=1-e.life/e.maxLife;e.mesh.scale.setScalar(.3+n*e.size),e.mesh.material.opacity=(1-n)*.9,e.life<=0&&(e.mesh.visible=!1)}}clear(){for(const t of this.tracers)t.life=0,t.mesh.visible=!1;for(const t of this.flashes)t.life=0,t.sprite.visible=!1;for(const t of this.beams)t.life=0,t.mesh.visible=!1;for(const t of this.rings)t.life=0,t.mesh.visible=!1;this.muzzleLight.intensity=0}}function Ji(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new Me;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Uc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);const g=Uc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Uc(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new we(a,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);o.setComponent(d+u,g,v)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const Tv=["position","normal","uv"];function qh(s,t){const e=s.index?s.toNonIndexed():s.clone();for(const n of Object.keys(e.attributes))Tv.includes(n)||e.deleteAttribute(n);return e.attributes.uv||e.setAttribute("uv",new Jt(new Float32Array(e.attributes.position.count*2),2)),e.attributes.normal||e.computeVertexNormals(),e.applyMatrix4(t),e}function Yh(s){return s.isMesh===!0&&!s.isInstancedMesh&&!s.isSkinnedMesh}function Zh(s){const t=new Map;for(const e of s.children){if(!Yh(e)||Array.isArray(e.material)||e.children.length)continue;const n=t.get(e.material)??[];n.push(e),t.set(e.material,n)}for(const[e,n]of t){if(n.length<2)continue;const i=n.map(o=>(o.updateMatrix(),qh(o.geometry,o.matrix))),r=Ji(i);if(i.forEach(o=>o.dispose()),!r)continue;const a=new Lt(r,e);a.castShadow=n.some(o=>o.castShadow),a.receiveShadow=n.some(o=>o.receiveShadow),a.renderOrder=n[0].renderOrder;for(const o of n)s.remove(o);s.add(a)}}function Av(s){s.updateMatrixWorld(!0);const t=new $t().copy(s.matrixWorld).invert(),e=new Map;s.traverse(r=>{if(r===s||!Yh(r)||Array.isArray(r.material))return;const a=e.get(r.material)??[];a.push(r),e.set(r.material,a)});const n=new $t;for(const[r,a]of e){if(a.length<2)continue;const o=a.map(h=>qh(h.geometry,n.multiplyMatrices(t,h.matrixWorld))),l=Ji(o);if(o.forEach(h=>h.dispose()),!l)continue;const c=new Lt(l,r);c.castShadow=a.some(h=>h.castShadow),c.receiveShadow=a.some(h=>h.receiveShadow),c.renderOrder=a[0].renderOrder;for(const h of a)h.parent?.remove(h);s.add(c)}const i=[];s.traverse(r=>{r!==s&&r.type==="Group"&&r.children.length===0&&i.push(r)});for(const r of i)r.parent?.remove(r)}let wr=null;function Cv(){if(wr)return wr;const s=(t,e)=>new Zr(t,e,3,8);return wr={torso:new Gt(.5,.62,.28),pelvis:new Gt(.44,.2,.26),head:new yi(.15,12,10),hair:new yi(.158,12,8,0,Math.PI*2,0,Math.PI*.55),visor:new Gt(.26,.05,.06),neck:new Re(.06,.07,.1,8),upperArm:s(.072,.24).translate(0,-.17,0),foreArm:s(.062,.22).translate(0,-.15,0),hand:new Gt(.08,.1,.08).translate(0,-.05,0),thigh:s(.095,.32).translate(0,-.22,0),shin:s(.08,.32).translate(0,-.21,0),foot:new Gt(.12,.08,.26).translate(0,-.04,.05),pistol:new Gt(.06,.1,.28).translate(0,0,.1),pistolGrip:new Gt(.05,.12,.06).translate(0,-.08,0),rifle:new Gt(.07,.12,.72).translate(0,0,.26),rifleMag:new Gt(.05,.16,.08).translate(0,-.12,.16),glowStrip:new Gt(.015,.02,.5).translate(0,.045,.24),knuckle:new Gt(.1,.05,.1),stripe:new Gt(.02,.6,.02)},wr}class $h{constructor(t){E(this,"root",new oe);E(this,"hips",new oe);E(this,"torso",new oe);E(this,"head",new oe);E(this,"armL",new oe);E(this,"armR",new oe);E(this,"elbowL",new oe);E(this,"elbowR",new oe);E(this,"legL",new oe);E(this,"legR",new oe);E(this,"kneeL",new oe);E(this,"kneeR",new oe);E(this,"weapon",new oe);E(this,"muzzle",new xe);E(this,"materials",[]);E(this,"neonMat");E(this,"neonBase");E(this,"phase",0);E(this,"flash",0);E(this,"deathT",-1);E(this,"hipHeight");E(this,"landing",0);E(this,"wasGrounded",!0);E(this,"weaponMeshes",{});this.look=t;const e=Cv(),n=(v,m=.65,p=.05)=>{const x=new be({color:v,roughness:m,metalness:p,envMapIntensity:.6});return this.materials.push(x),x};this.neonBase=new mt(t.neon).multiplyScalar(2.2),this.neonMat=new ce({color:this.neonBase.clone(),toneMapped:!1});const i=n(t.skin,.55),r=n(t.jacket,.5,.15),a=n(t.shirt,.7),o=n(t.pants,.75),l=n(t.shoes,.4,.2),c=n(t.hair,.8),h=n(2236972,.3,.8),u=t.bulk,d=(v,m,p,x=0,M=0,_=0,I=1,C=1,R=1)=>{const P=new Lt(v,m);return P.position.set(x,M,_),P.scale.set(I,C,R),P.castShadow=!0,p.add(P),P};this.hipHeight=.98,this.root.scale.setScalar(.88*t.height),this.root.add(this.hips),this.hips.position.y=this.hipHeight,d(e.pelvis,o,this.hips,0,0,0,u,1,1),this.hips.add(this.torso),this.torso.position.y=.08,d(e.torso,a,this.torso,0,.32,0,u*.92,1,.95),d(e.torso,r,this.torso,-.15*u,.32,0,.42*u,1.02,1.05),d(e.torso,r,this.torso,.15*u,.32,0,.42*u,1.02,1.05),d(e.torso,r,this.torso,0,.32,-.03,u,1.02,.85),d(e.stripe,this.neonMat,this.torso,-.06*u,.32,.15),d(e.stripe,this.neonMat,this.torso,.06*u,.32,.15),d(e.neck,i,this.torso,0,.68,0),this.torso.add(this.head),this.head.position.y=.86,d(e.head,i,this.head,0,0,0,1,1.08,1),d(e.hair,c,this.head,0,.02,-.01,1,1,1),t.visor?d(e.visor,this.neonMat,this.head,0,.02,.135):(d(e.visor,h,this.head,0,.025,.14,1.05,1.1,1),d(e.visor,this.neonMat,this.head,0,.055,.148,1,.18,.5));for(const[v,m,p]of[[this.armL,this.elbowL,1],[this.armR,this.elbowR,-1]]){this.torso.add(v),v.position.set(p*.31*u,.6,0),d(e.upperArm,r,v,0,0,0,u,1,u),v.add(m),m.position.y=-.34,d(e.foreArm,r,m,0,0,0,u,1,u);const x=d(e.hand,i,m,0,-.3,0);t.weapon==="knuckles"&&d(e.knuckle,this.neonMat,x,0,-.08,.02)}for(const[v,m,p]of[[this.legL,this.kneeL,-1],[this.legR,this.kneeR,1]])this.hips.add(v),v.position.set(p*.12*u,-.05,0),d(e.thigh,o,v,0,0,0,u,1,u),v.add(m),m.position.y=-.45,d(e.shin,o,m,0,0,0,u,1,u),d(e.foot,l,m,0,-.44,0);this.elbowR.add(this.weapon),this.weapon.position.set(0,-.36,.04);const f=new oe;d(e.pistol,h,f),d(e.pistolGrip,h,f),d(e.glowStrip,this.neonMat,f,0,-.005,-.1,1,1,.5);const g=new oe;d(e.rifle,h,g),d(e.rifleMag,h,g),d(e.glowStrip,this.neonMat,g,0,.02,.02,1.2,1,1.3),this.weaponMeshes={pistol:f,rifle:g},this.weapon.add(f,g),this.weapon.add(this.muzzle),this.setWeapon(t.weapon==="knuckles"?null:t.weapon);for(const v of[this.hips,this.torso,this.head,this.armL,this.armR,this.elbowL,this.elbowR,this.legL,this.legR,this.kneeL,this.kneeR,f,g])Zh(v)}setWeapon(t){for(const[e,n]of Object.entries(this.weaponMeshes))n.visible=e===t;this.muzzle.position.set(0,.02,t==="rifle"?.64:.26)}setNeon(t){this.neonBase.set(t).multiplyScalar(2.2),this.neonMat.color.copy(this.neonBase)}hitFlash(){this.flash=1}startDeath(){this.deathT=0}get dead(){return this.deathT>=0}reset(){this.deathT=-1,this.flash=0,this.root.rotation.set(0,this.root.rotation.y,0),this.root.position.y=0,this.hips.position.set(0,this.hipHeight,0),this.hips.rotation.set(0,0,0)}update(t,e){if(this.flash>0){this.flash=Math.max(0,this.flash-t*6);for(const d of this.materials)d.emissive.setRGB(this.flash*.55,this.flash*.12,this.flash*.3);this.neonMat.color.copy(this.neonBase).multiplyScalar(1+this.flash)}if(this.deathT>=0){this.animateDeath(t);return}const n=e.speed,i=Math.min(1,n/2.5),r=ge.clamp((n-4.5)/3,0,1),a=.55+r*.35;this.phase+=t*(n*1.65+(i>0?1.5:0));const o=Math.sin(this.phase),l=Math.cos(this.phase);e.grounded&&!this.wasGrounded&&(this.landing=1),this.wasGrounded=e.grounded,this.landing=Math.max(0,this.landing-t*5),e.grounded?(this.legL.rotation.x=o*a*i,this.legR.rotation.x=-o*a*i,this.kneeL.rotation.x=Math.max(0,-l)*(.9+r*.5)*i+.05,this.kneeR.rotation.x=Math.max(0,l)*(.9+r*.5)*i+.05,this.hips.position.y=this.hipHeight-Math.abs(l)*.05*i-this.landing*.12+(1-i)*Math.sin(this.phase*.6)*.008):(this.legL.rotation.x=ge.lerp(this.legL.rotation.x,-.5,t*10),this.legR.rotation.x=ge.lerp(this.legR.rotation.x,.25,t*10),this.kneeL.rotation.x=ge.lerp(this.kneeL.rotation.x,1.1,t*10),this.kneeR.rotation.x=ge.lerp(this.kneeR.rotation.x,.6,t*10)),this.torso.rotation.x=.06+r*.18-e.kick*.05,this.torso.rotation.y=o*.08*i*(1-e.aim),this.hips.rotation.y=-o*.06*i;const c=-o*.6*i*(.6+r),h=o*.6*i*(.6+r),u=-Math.PI/2-e.aimPitch*.9+e.kick*.25;if(this.armR.rotation.x=ge.lerp(h,u,e.aim),this.armR.rotation.z=ge.lerp(-.08,.06,e.aim),this.armR.rotation.y=0,this.elbowR.rotation.x=ge.lerp(-.25-r*.6,-.05,e.aim),this.armL.rotation.x=ge.lerp(c,u+.15,e.aim*.9),this.armL.rotation.z=ge.lerp(.08,-.5,e.aim),this.armL.rotation.y=0,this.elbowL.rotation.x=ge.lerp(-.25-r*.6,-.45,e.aim),this.weapon.rotation.x=ge.lerp(Math.PI/2-.3,Math.PI/2,e.aim),e.swing>0){const d=e.swing,f=d<.5?d/.5:1-(d-.5)/.5;this.armR.rotation.x=-.4-f*1.6,this.armR.rotation.z=-.7+d*1.5,this.elbowR.rotation.x=-1.2+f*.9,this.torso.rotation.y=.4-d*.9}this.head.rotation.x=e.aimPitch*.4*e.aim}animateDeath(t){this.deathT+=t;const e=Math.min(1,this.deathT/.65),n=1-Math.pow(1-e,3);this.hips.rotation.x=-n*1.45,this.hips.position.y=ge.lerp(this.hipHeight,.22,n),this.hips.position.z=-n*.5,this.armL.rotation.x=-n*2.4,this.armR.rotation.x=-n*2.2,this.armL.rotation.z=n*.5,this.armR.rotation.z=-n*.5,this.legL.rotation.x=n*.3,this.kneeL.rotation.x=n*.4,this.legR.rotation.x=-n*.1,this.deathT>1.6&&(this.root.position.y-=t*.6)}get deathTime(){return this.deathT}dispose(){for(const t of this.materials)t.dispose();this.neonMat.dispose()}}const br={low:{maxPixelRatio:.75,bloom:!1,shadows:!1,grain:!1,maxParticles:160,trafficCars:3,antialias:!1},medium:{maxPixelRatio:1,bloom:!0,shadows:!1,grain:!0,maxParticles:320,trafficCars:5,antialias:!1},high:{maxPixelRatio:1.5,bloom:!0,shadows:!0,grain:!0,maxParticles:520,trafficCars:7,antialias:!1}},Rv=1/60,Pv=.1,ue={radius:.42,height:1.8,walkSpeed:4.6,runSpeed:7.8,aimSpeed:3.2,accel:38,airControl:.35,jumpVelocity:7.2,gravity:22,maxHealth:100,maxArmor:50,stepHeight:.45},nn={maxSpeed:38,accel:17,brake:32,drag:.32,rolling:2.2,maxSteer:.56,wheelBase:2.6,grip:9,handbrakeGrip:1.6},un={totalWaves:6,comboWindow:3.2,maxCombo:6},St={magenta:16723922,pink:16732058,cyan:3076863,blue:4025343,purple:9059839,orange:16747069,yellow:16767050,red:16724821,green:5111706},Lv={enforcer:{kind:"enforcer",label:"STREET ENFORCER",health:95,speed:5.3,minRange:0,maxRange:1.4,attackRange:2.1,damage:14,cooldown:1.1,score:100,radius:.5,height:1.95,look:{skin:9067076,jacket:3804948,shirt:14168638,pants:1315868,shoes:789516,hair:788486,neon:St.orange,bulk:1.28,height:1.08,visor:!0,weapon:"knuckles"}},gunner:{kind:"gunner",label:"NEON GUNNER",health:60,speed:4.1,minRange:11,maxRange:22,attackRange:34,damage:9,cooldown:1.6,score:150,radius:.42,height:1.8,look:{skin:13672576,jacket:2758224,shirt:1314858,pants:1841200,shoes:2763322,hair:14211312,neon:St.cyan,bulk:.92,height:1,visor:!0,weapon:"rifle"}}},Dv=new A;class Kh{constructor(t){E(this,"character");E(this,"position",new A);E(this,"velocity",new A);E(this,"facing",0);E(this,"health",0);E(this,"maxHealth",0);E(this,"alive",!1);E(this,"active",!1);E(this,"attackTimer",0);E(this,"swing",0);E(this,"age",0);E(this,"stagger",0);E(this,"strafeDir",1);E(this,"strafeTimer",0);E(this,"seesPlayer",!1);E(this,"losTimer",0);E(this,"aimTimer",0);E(this,"kick",0);E(this,"lastHitHead",!1);E(this,"pendingDamage",0);E(this,"pendingHead",!1);E(this,"knockX",0);E(this,"knockZ",0);E(this,"dmgScale",1);E(this,"speedScale",1);E(this,"def");E(this,"healthBar");E(this,"barCanvas");E(this,"barTex");E(this,"barShown",0);this.def=Lv[t],this.character=new $h(this.def.look),this.barCanvas=document.createElement("canvas"),this.barCanvas.width=64,this.barCanvas.height=8,this.barTex=new Vs(this.barCanvas),this.healthBar=new jo(new Yr({map:this.barTex,depthTest:!0,depthWrite:!1,toneMapped:!1,transparent:!0})),this.healthBar.scale.set(.9,.11,1),this.healthBar.position.y=this.def.height+.35,this.healthBar.visible=!1,this.character.root.add(this.healthBar),this.healthBar.scale.divideScalar(this.character.root.scale.x),this.healthBar.position.y/=this.character.root.scale.x,this.character.root.visible=!1}spawn(t,e,n,i,r){this.position.set(t,0,e),this.velocity.set(0,0,0),this.maxHealth=this.health=Math.round(this.def.health*n),this.dmgScale=i,this.speedScale=r,this.alive=!0,this.active=!0,this.age=0,this.attackTimer=.8+Math.random()*1.2,this.swing=0,this.stagger=0,this.seesPlayer=!1,this.losTimer=Math.random()*.3,this.strafeDir=Math.random()<.5?-1:1,this.strafeTimer=1+Math.random()*2,this.pendingDamage=0,this.barShown=0,this.healthBar.visible=!1,this.character.reset(),this.character.root.visible=!0,this.character.root.position.copy(this.position)}rayHit(t,e,n,i,r,a,o,l){if(!this.alive)return-1;const c=this.character.root.scale.x/.88,h=this.position.y+1.69*c,u=.24*c;let d=-1;const f=t-this.position.x,g=e-h,v=n-this.position.z,m=f*i+g*r+v*a,p=f*f+g*g+v*v-u*u,x=m*m-p;if(x>=0){const B=-m-Math.sqrt(x);B>0&&B<o&&(d=B,l.head=!0)}const M=this.def.radius*.85,_=this.position.x-M,I=this.position.x+M,C=this.position.z-M,R=this.position.z+M,P=this.position.y,w=h-u*.8;let y=0,D=d>=0?d:o;for(const[B,O,V,q]of[[t,i,_,I],[e,r,P,w],[n,a,C,R]])if(Math.abs(O)<1e-9){if(B<V||B>q)return d}else{let G=(V-B)/O,K=(q-B)/O;if(G>K){const W=G;G=K,K=W}if(y=Math.max(y,G),D=Math.min(D,K),y>D)return d}return y>0&&(d<0||y<d)?(l.head=!1,y):d}applyHit(t,e,n,i){this.alive&&(this.pendingDamage+=t,this.pendingHead=this.pendingHead||e,this.knockX+=n,this.knockZ+=i)}resolveDamage(){return!this.pendingDamage||!this.alive?!1:(this.health-=this.pendingDamage,this.lastHitHead=this.pendingHead,this.pendingDamage=0,this.pendingHead=!1,this.character.hitFlash(),this.stagger=.18,this.velocity.x+=this.knockX*1.6,this.velocity.z+=this.knockZ*1.6,this.knockX=this.knockZ=0,this.barShown=3,this.drawBar(),this.health<=0?(this.kill(),!0):(this.seesPlayer=!0,!1))}kill(){this.alive=!1,this.health=0,this.healthBar.visible=!1,this.character.startDeath()}drawBar(){const t=this.barCanvas.getContext("2d"),e=Math.max(0,this.health/this.maxHealth);t.clearRect(0,0,64,8),t.fillStyle="rgba(10,6,20,0.85)",t.fillRect(0,0,64,8),t.fillStyle=this.def.kind==="gunner"?"#2ef2ff":"#ff8a3d",t.fillRect(1,1,Math.round(62*e),6),this.barTex.needsUpdate=!0}updateVisual(t,e){this.kick=Math.max(0,this.kick-t*6),this.swing>0&&(this.swing=Math.min(1,this.swing+t*2.6)),this.swing>=1&&(this.swing=0);const n=Math.hypot(this.velocity.x,this.velocity.z);this.character.update(t,{speed:n,grounded:!0,aim:this.def.kind==="gunner"&&this.seesPlayer?1:0,aimPitch:0,kick:this.kick,swing:this.swing});const i=this.character.root;return this.alive?i.position.copy(this.position):(i.position.x=this.position.x,i.position.z=this.position.z),i.rotation.y=this.facing,this.barShown=Math.max(0,this.barShown-t),this.healthBar.visible=this.alive&&this.barShown>0&&Dv.copy(this.position).distanceTo(e)<45,!this.alive&&this.character.deathTime>2.6?(this.active=!1,i.visible=!1,!0):!1}dispose(){this.character.dispose(),this.barTex.dispose(),this.healthBar.material.dispose()}}const Wi={hit:!1,nx:0,nz:0},Iv={dist:0,nx:0,ny:0,nz:0},Xi={x:0,z:0},Er=new A,Nc=new A;function Uv(s,t,e){if(s.age+=t,!s.alive){s.velocity.multiplyScalar(Math.max(0,1-t*6)),s.position.addScaledVector(s.velocity,t);return}const n=e.target,i=n.x-s.position.x,r=n.z-s.position.z,a=Math.hypot(i,r),o=i/(a||1),l=r/(a||1);if(s.losTimer-=t,s.losTimer<=0){s.losTimer=.25+Math.random()*.1;const _=e.targetAlive&&a<65&&e.world.lineOfSight(s.position.x,s.position.y+1.5,s.position.z,n.x,n.y+1.2,n.z,Iv);s.seesPlayer=_}let c=0,h=0;const u=s.def.speed*s.speedScale,d=s.seesPlayer&&e.targetAlive;if(!e.targetAlive)c=Math.sin(s.age*.4+s.strafeDir)*.3,h=Math.cos(s.age*.3)*.3;else if(s.def.kind==="enforcer"){const _=s.def.attackRange+(e.targetInVehicle?1.2:0);a>_*.8&&(d&&a<24?(c=o,h=l):e.world.nav.steer(s.position.x,s.position.z,Xi)?(c=Xi.x,h=Xi.z):(c=o,h=l)),s.attackTimer-=t,a<_&&s.attackTimer<=0&&s.swing===0&&s.age>.6&&(s.swing=.001,s.attackTimer=s.def.cooldown,s.aimTimer=.32),s.aimTimer>0&&(s.aimTimer-=t,s.aimTimer<=0&&a<_+.5&&e.onMelee(s,s.def.damage*s.dmgScale))}else s.strafeTimer-=t,s.strafeTimer<=0&&(s.strafeDir*=-1,s.strafeTimer=1.4+Math.random()*2),!d||a>s.def.maxRange?e.world.nav.steer(s.position.x,s.position.z,Xi)?(c=Xi.x,h=Xi.z):(c=o,h=l):a<s.def.minRange?(c=-o*.9+-l*s.strafeDir*.4,h=-l*.9+o*s.strafeDir*.4):(c=-l*s.strafeDir*.6,h=o*s.strafeDir*.6),s.attackTimer-=t,d&&a<s.def.attackRange&&s.age>1&&s.attackTimer<=0&&s.aimTimer<=0&&(s.aimTimer=.45,s.character.setNeon(16777215)),s.aimTimer>0&&(s.aimTimer-=t,c*=.2,h*=.2,s.aimTimer<=0&&(s.character.setNeon(s.def.look.neon),s.attackTimer=s.def.cooldown*(.8+Math.random()*.5),s.seesPlayer&&Nv(s,e,a)));for(const _ of e.enemies){if(_===s||!_.alive)continue;const I=s.position.x-_.position.x,C=s.position.z-_.position.z,R=I*I+C*C;if(R<1.6&&R>1e-6){const P=Math.sqrt(R);c+=I/P*(1.3-P),h+=C/P*(1.3-P)}}const f=Math.hypot(c,h);f>1&&(c/=f,h/=f),s.stagger>0&&(s.stagger-=t,c*=.15,h*=.15),s.swing>0&&(c*=.3,h*=.3);const g=18*t,v=c*u-s.velocity.x,m=h*u-s.velocity.z,p=Math.hypot(v,m);if(p>0){const _=Math.min(1,g/p);s.velocity.x+=v*_,s.velocity.z+=m*_}if(s.position.x+=s.velocity.x*t,s.position.z+=s.velocity.z*t,e.world.resolveCircle(s.position,s.def.radius,.45,1.8,Wi),Wi.hit){const _=s.velocity.x*Wi.nx+s.velocity.z*Wi.nz;_<0&&(s.velocity.x-=_*Wi.nx,s.velocity.z-=_*Wi.nz)}let x=s.facing;d||s.def.kind==="enforcer"&&a<4?x=Math.atan2(o,l):Math.hypot(s.velocity.x,s.velocity.z)>.5&&(x=Math.atan2(s.velocity.x,s.velocity.z));let M=x-s.facing;M=Math.atan2(Math.sin(M),Math.cos(M)),s.facing+=M*Math.min(1,t*10)}function Nv(s,t,e){s.character.muzzle.getWorldPosition(Er),Er.y<.9&&Er.set(s.position.x+Math.sin(s.facing)*.6,1.4,s.position.z+Math.cos(s.facing)*.6);const n=Math.min(.5,e/30),i=.35+e*.035;Nc.set(t.target.x+t.targetVel.x*n+(Math.random()-.5)*i,t.target.y+(t.targetInVehicle?.8:1.15)+(Math.random()-.5)*i*.5,t.target.z+t.targetVel.z*n+(Math.random()-.5)*i),t.projectiles.fire(Er,Nc,30,s.def.damage*s.dmgScale),s.kick=1,t.onShoot(s)}function Fc(s){return{total:5+s*3,maxAlive:Math.min(10,3+s),gunnerRatio:Math.min(.6,.2+s*.07),healthScale:1+(s-1)*.12,dmgScale:1+(s-1)*.1,speedScale:1+(s-1)*.035,interval:Math.max(.6,1.6-s*.15)}}const Fv={dist:0,nx:0,ny:0,nz:0},vn={x:0,z:0};class Na{constructor(t){E(this,"group",new oe);E(this,"pool",[]);E(this,"wave",0);E(this,"spec",Fc(1));E(this,"spawned",0);E(this,"killed",0);E(this,"pending",[]);E(this,"spawnTimer",0);E(this,"fieldTimer",0);this.world=t;for(let e=0;e<12;e++)this.add("enforcer");for(let e=0;e<10;e++)this.add("gunner")}add(t){const e=new Kh(t);this.pool.push(e),this.group.add(e.character.root)}startWave(t){this.wave=t,this.spec=Fc(t),this.spawned=0,this.killed=0,this.pending=[],this.spawnTimer=.5}get remaining(){return this.spec.total-this.killed}get aliveCount(){let t=0;for(const e of this.pool)e.alive&&t++;return t}get waveCleared(){return this.wave>0&&this.killed>=this.spec.total}get isFinalWave(){return this.wave>=un.totalWaves}update(t,e,n){if(this.fieldTimer-=t,this.fieldTimer<=0&&(this.fieldTimer=.35,this.world.nav.computeField(e.x,e.z)),this.wave===0)return;for(let a=this.pending.length-1;a>=0;a--){const o=this.pending[a];if(o.delay-=t,o.delay>0)continue;this.pending.splice(a,1);const l=this.pool.find(c=>!c.active&&c.def.kind===o.kind)??this.pool.find(c=>!c.active);if(!l){this.spawned--;continue}l.spawn(o.x,o.z,this.spec.healthScale,this.spec.dmgScale,this.spec.speedScale),n.onSpawn(l)}const i=this.aliveCount+this.pending.length;if(this.spawned>=this.spec.total||i>=this.spec.maxAlive||(this.spawnTimer-=t,this.spawnTimer>0))return;this.spawnTimer=this.spec.interval*(.7+Math.random()*.6);const r=Math.random()<this.spec.gunnerRatio?"gunner":"enforcer";this.pickSpawn(e)&&(this.pending.push({kind:r,x:vn.x,z:vn.z,delay:.85}),this.spawned++,n.onTelegraph(vn.x,vn.z,r))}pickSpawn(t){const e=this.world.nav.openCells;let n=-1;for(let i=0;i<40;i++){const r=e[Math.floor(Math.random()*e.length)];this.world.nav.cellCenter(r,vn);const a=Math.hypot(vn.x-t.x,vn.z-t.z);if(!(a<22||a>58)&&this.world.nav.dist[r]!==65535&&(n=r,!(i<25&&this.world.lineOfSight(vn.x,1.5,vn.z,t.x,t.y+1.5,t.z,Fv))))return!0}return n>=0?(this.world.nav.cellCenter(n,vn),!0):!1}registerKill(){this.killed++}reset(){this.wave=0,this.spawned=0,this.killed=0,this.pending=[];for(const t of this.pool)t.alive=!1,t.active=!1,t.character.root.visible=!1}static telegraphColor(t){return t==="gunner"?St.cyan:St.orange}}const Us={pistol:{id:"pistol",name:"NEON PISTOL",damage:34,headMultiplier:2.4,interval:.2,automatic:!1,magSize:12,reserveMax:1/0,reloadTime:1.05,spread:.012,aimSpread:.002,bloomPerShot:.01,bloomMax:.03,range:140,color:St.magenta,tracerWidth:.05,tracerSpeed:0,recoil:.025,shake:.12},rifle:{id:"rifle",name:"PULSE RIFLE",damage:17,headMultiplier:1.9,interval:.085,automatic:!0,magSize:32,reserveMax:160,reloadTime:1.6,spread:.026,aimSpread:.008,bloomPerShot:.006,bloomMax:.05,range:120,color:St.cyan,tracerWidth:.09,tracerSpeed:240,recoil:.012,shake:.07}};class Oc{constructor(t){E(this,"mag");E(this,"reserve");E(this,"cooldown",0);E(this,"reloadLeft",0);E(this,"bloom",0);this.def=t,this.mag=t.magSize,this.reserve=t.reserveMax===1/0?1/0:64}get reloading(){return this.reloadLeft>0}get empty(){return this.mag===0&&this.reserve===0}canFire(){return this.cooldown<=0&&!this.reloading&&this.mag>0}fire(){this.mag--,this.cooldown=this.def.interval,this.bloom=Math.min(this.def.bloomMax,this.bloom+this.def.bloomPerShot)}canReload(){return!this.reloading&&this.mag<this.def.magSize&&this.reserve>0}startReload(){return this.canReload()?(this.reloadLeft=this.def.reloadTime,!0):!1}cancelReload(){this.reloadLeft=0}update(t){if(this.cooldown=Math.max(0,this.cooldown-t),this.bloom=Math.max(0,this.bloom-t*.12),this.reloadLeft>0&&(this.reloadLeft-=t,this.reloadLeft<=0)){this.reloadLeft=0;const e=this.def.magSize-this.mag,n=Math.min(e,this.reserve);return this.mag+=n,this.reserve!==1/0&&(this.reserve-=n),!0}return!1}addAmmo(t){this.reserve!==1/0&&(this.reserve=Math.min(this.def.reserveMax,this.reserve+t))}reset(){this.mag=this.def.magSize,this.reserve=this.def.reserveMax===1/0?1/0:64,this.cooldown=0,this.reloadLeft=0,this.bloom=0}}const li={dist:0,nx:0,ny:0,nz:0},ci=new A,Fa=new A,Bc=new A,hn=new A,Xe=new A,qi=new A,Oa=new A,Ba={head:!1};class Ov{constructor(){E(this,"weapons",{pistol:new Oc(Us.pistol),rifle:new Oc(Us.rifle)});E(this,"current","pistol");E(this,"shotsFired",0);E(this,"shotsHit",0);E(this,"damageMultiplier",1);E(this,"buffered",0);E(this,"result",{weapon:"pistol",from:new A,to:new A,target:null,head:!1,damage:0,normal:new A,hitWorld:!1})}get weapon(){return this.weapons[this.current]}reset(){this.weapons.pistol.reset(),this.weapons.rifle.reset(),this.current="pistol",this.shotsFired=0,this.shotsHit=0,this.damageMultiplier=1,this.buffered=0}switchTo(t,e){t!==this.current&&(this.weapon.cancelReload(),this.current=t,this.weapon.cooldown=Math.max(this.weapon.cooldown,.25),e.onSwitch(t))}update(t,e,n,i,r,a,o,l,c){for(const f of["pistol","rifle"])this.weapons[f].update(t)&&f===this.current&&c.onReloadDone(f);if(!r.alive||r.inVehicle)return;n&&(e.wasPressed("Digit1")&&this.switchTo("pistol",c),e.wasPressed("Digit2")&&this.switchTo("rifle",c),e.wasPressed("KeyQ")&&this.switchTo(this.current==="pistol"?"rifle":"pistol",c));const h=this.weapon;n&&e.wasPressed("KeyR")&&h.startReload()&&c.onReloadStart(this.current);const u=n&&e.firePressed;if(u?this.buffered=.2:this.buffered=Math.max(0,this.buffered-t),!!(h.def.automatic?e.fireHeld:this.buffered>0)&&!h.reloading){if(h.mag===0){u&&c.onDryFire(),h.startReload()&&c.onReloadStart(this.current);return}h.canFire()&&(h.fire(),this.buffered=0,this.shotsFired++,r.combatTimer=0,r.kick=1,this.fire(i,r,a,o,l),c.onShot(this.result),h.mag===0&&h.startReload()&&c.onReloadStart(this.current))}}fire(t,e,n,i,r){const a=this.weapon,o=a.def;t.getWorldDirection(ci),qi.set(e.position.x,e.position.y+1.5,e.position.z).sub(t.position);const l=Math.max(0,qi.dot(ci));Fa.copy(t.position).addScaledVector(ci,l);const c=this.castAll(Fa,ci,o.range,n,i);Bc.copy(Fa).addScaledVector(ci,c),e.character.muzzle.getWorldPosition(hn);const h=Math.atan2(ci.x,ci.z);Oa.set(e.position.x-Math.cos(h)*.25+Math.sin(h)*.6,e.position.y+1.42,e.position.z+Math.sin(h)*.25+Math.cos(h)*.6),hn.lerp(Oa,1-e.aimBlend),Xe.subVectors(Bc,hn).normalize();const u=(r?o.aimSpread:o.spread)+a.bloom;if(u>0){qi.set(1,0,0),Math.abs(Xe.x)>.9&&qi.set(0,1,0);const g=Oa.crossVectors(Xe,qi).normalize(),v=qi.crossVectors(Xe,g).normalize(),m=Math.sqrt(Math.random())*Math.tan(u),p=Math.random()*Math.PI*2;Xe.addScaledVector(g,Math.cos(p)*m).addScaledVector(v,Math.sin(p)*m).normalize()}const d=this.result;d.weapon=this.current,d.from.copy(hn),d.target=null,d.head=!1,d.hitWorld=!1,d.damage=0;let f=o.range;n.raycast(hn.x,hn.y,hn.z,Xe.x,Xe.y,Xe.z,f,li)&&(f=li.dist,d.hitWorld=!0,d.normal.set(li.nx,li.ny,li.nz));for(const g of i){const v=g.rayHit(hn.x,hn.y,hn.z,Xe.x,Xe.y,Xe.z,f,Ba);v>=0&&v<f&&(f=v,d.target=g,d.head=Ba.head,d.hitWorld=!1)}d.to.copy(hn).addScaledVector(Xe,f),d.target&&(d.damage=Math.round(o.damage*(d.head?o.headMultiplier:1)*this.damageMultiplier),d.target.applyHit(d.damage,d.head,Xe.x,Xe.z),this.shotsHit++)}castAll(t,e,n,i,r){let a=n;i.raycast(t.x,t.y,t.z,e.x,e.y,e.z,a,li)&&(a=li.dist);for(const o of r){const l=o.rayHit(t.x,t.y,t.z,e.x,e.y,e.z,a,Ba);l>=0&&l<a&&(a=l)}return a}get accuracy(){return this.shotsFired?this.shotsHit/this.shotsFired:0}}const Yi={hit:!1,nx:0,nz:0};class Bv{constructor(){E(this,"character");E(this,"position",new A);E(this,"velocity",new A);E(this,"facing",0);E(this,"grounded",!0);E(this,"health",ue.maxHealth);E(this,"armor",0);E(this,"alive",!0);E(this,"inVehicle",!1);E(this,"combatTimer",10);E(this,"aimBlend",0);E(this,"kick",0);E(this,"stepTimer",0);E(this,"events",{footstep:!1,jumped:!1,landed:!1});this.character=new $h({skin:13012586,jacket:1006702,shirt:15658742,pants:2763320,shoes:15921906,hair:1708560,neon:16723922,bulk:1,height:1,visor:!1,weapon:"pistol"})}spawn(t,e){this.position.copy(t),this.velocity.set(0,0,0),this.facing=e,this.grounded=!0,this.health=ue.maxHealth,this.armor=0,this.alive=!0,this.inVehicle=!1,this.combatTimer=10,this.aimBlend=0,this.character.reset(),this.character.root.visible=!0,this.sync()}damage(t){if(!this.alive)return 0;const e=Math.min(this.armor,t*.6);this.armor-=e;const n=Math.min(this.health,t-e);return this.health-=n,this.character.hitFlash(),this.health<=0&&(this.alive=!1,this.character.startDeath()),n}heal(t){this.health=Math.min(ue.maxHealth,this.health+t)}addArmor(t){this.armor=Math.min(ue.maxArmor,this.armor+t)}update(t,e,n,i,r,a){const o=this.events;if(o.footstep=o.jumped=o.landed=!1,this.combatTimer+=t,this.kick=Math.max(0,this.kick-t*8),!this.alive)return this.velocity.x*=.9,this.velocity.z*=.9,this.character.update(t,{speed:0,grounded:!0,aim:0,aimPitch:0,kick:0,swing:0}),o;const l=e.axis("KeyA","KeyD","ArrowLeft","ArrowRight"),c=e.axis("KeyS","KeyW","ArrowDown","ArrowUp"),h=-Math.sin(n),u=-Math.cos(n),d=Math.cos(n),f=-Math.sin(n);let g=h*c+d*l,v=u*c+f*l;const m=Math.hypot(g,v);m>0&&(g/=m,v/=m);const p=e.isDown("ShiftLeft")||e.isDown("ShiftRight"),x=r?ue.aimSpeed:p&&c>0?ue.runSpeed:ue.walkSpeed,M=this.grounded?1:ue.airControl,_=g*x,I=v*x,C=ue.accel*M*t,R=_-this.velocity.x,P=I-this.velocity.z,w=Math.hypot(R,P);if(w>0){const q=Math.min(1,C/w);this.velocity.x+=R*q,this.velocity.z+=P*q}if(this.grounded&&e.wasPressed("Space")&&(this.velocity.y=ue.jumpVelocity,this.grounded=!1,o.jumped=!0),this.velocity.y-=ue.gravity*t,this.position.x+=this.velocity.x*t,this.position.z+=this.velocity.z*t,this.position.y+=this.velocity.y*t,a.resolveCircle(this.position,ue.radius,this.position.y+ue.stepHeight,this.position.y+ue.height,Yi),Yi.hit){const q=this.velocity.x*Yi.nx+this.velocity.z*Yi.nz;q<0&&(this.velocity.x-=q*Yi.nx,this.velocity.z-=q*Yi.nz)}const y=a.groundHeight(this.position.x,this.position.z,ue.radius,this.position.y);this.position.y<=y+.001||this.grounded&&this.position.y-y<.3&&this.velocity.y<=0?(!this.grounded&&this.velocity.y<-4&&(o.landed=!0),this.position.y=y,this.velocity.y=0,this.grounded=!0):this.grounded=!1;const D=r||this.combatTimer<.8;this.aimBlend+=((D?1:0)-this.aimBlend)*Math.min(1,t*12);const B=Math.hypot(this.velocity.x,this.velocity.z);let O=this.facing;D?O=Math.atan2(h,u):B>.6&&(O=Math.atan2(this.velocity.x,this.velocity.z));let V=O-this.facing;return V=Math.atan2(Math.sin(V),Math.cos(V)),this.facing+=V*Math.min(1,t*(D?20:11)),this.grounded&&B>1&&(this.stepTimer-=t*B,this.stepTimer<=0&&(this.stepTimer=2.1,o.footstep=!0)),this.character.update(t,{speed:B,grounded:this.grounded,aim:this.aimBlend,aimPitch:i,kick:this.kick,swing:0}),this.sync(),o}sync(){this.character.root.position.copy(this.position),this.alive&&(this.character.root.position.y=this.position.y),this.character.root.rotation.y=this.facing}}const Tr={dist:0,nx:0,ny:0,nz:0},Ar=new A,zv=new A;class kv{constructor(t,e){E(this,"yaw",0);E(this,"pitch",.12);E(this,"distance",4.4);E(this,"sensitivity",1);E(this,"invertY",!1);E(this,"reducedShake",!1);E(this,"mode","foot");E(this,"pivot",new A);E(this,"currentDist",4.4);E(this,"aimBlend",0);E(this,"trauma",0);E(this,"shakeTime",0);E(this,"vehicleIdle",0);E(this,"bob",0);E(this,"orbitAngle",0);this.camera=t,this.world=e}addTrauma(t){this.trauma=Math.min(1,this.trauma+t)}snapTo(t,e){this.pivot.copy(t).y+=1.55,this.yaw=e,this.pitch=.12,this.currentDist=this.distance}rotate(t,e,n){const i=.0022*this.sensitivity*(this.aimBlend>.5?.65:1);this.yaw-=t*i,this.pitch+=e*i*(this.invertY?-1:1),this.pitch=ge.clamp(this.pitch,-.75,1.1),n&&(this.distance=ge.clamp(this.distance+n*.5,2.6,7.5)),(t||e)&&(this.vehicleIdle=0)}update(t,e,n,i,r){this.shakeTime+=t,this.trauma=Math.max(0,this.trauma-t*1.6),this.aimBlend+=((n?1:0)-this.aimBlend)*Math.min(1,t*12);const a=this.camera;if(this.mode==="orbit"){this.orbitAngle+=t*.05;const P=62;a.position.set(25+Math.cos(this.orbitAngle)*P,16+Math.sin(this.orbitAngle*.7)*4,10+Math.sin(this.orbitAngle)*P),a.lookAt(10,14,-10),a.fov=60,a.updateProjectionMatrix();return}let o=1.55,l=this.distance,c=.55,h=68;if(this.mode==="vehicle"){if(o=1.7,l=7.6+Math.min(1,i/38)*1.6,c=0,h=68+Math.min(1,i/38)*14,this.vehicleIdle+=t,this.vehicleIdle>1.2){let w=r+Math.PI-this.yaw;w=Math.atan2(Math.sin(w),Math.cos(w)),this.yaw+=w*Math.min(1,t*3.2),this.pitch+=(.22-this.pitch)*Math.min(1,t*2)}}else l=ge.lerp(this.distance,2.1,this.aimBlend),c=ge.lerp(.5,.72,this.aimBlend),o=ge.lerp(1.55,1.62,this.aimBlend),h=ge.lerp(70,54,this.aimBlend),this.bob+=t*i*1.6;const u=1-Math.exp(-t*16),d=1-Math.exp(-t*9);this.pivot.x+=(e.x-this.pivot.x)*u,this.pivot.z+=(e.z-this.pivot.z)*u,this.pivot.y+=(e.y+o-this.pivot.y)*d,this.mode==="foot"&&i>5&&(this.pivot.y+=Math.sin(this.bob)*.012);const f=Math.cos(this.pitch),g=Math.sin(this.pitch),v=-Math.sin(this.yaw)*f,m=-g,p=-Math.cos(this.yaw)*f,x=Math.cos(this.yaw),M=-Math.sin(this.yaw),_=zv.copy(this.pivot);let I=c;c>0&&this.world.raycast(_.x,_.y,_.z,x,0,M,c+.3,Tr)&&(I=Math.max(0,Tr.dist-.3)),_.x+=x*I,_.z+=M*I;let C=l;this.world.raycast(_.x,_.y,_.z,-v,-m,-p,l+.3,Tr)&&(C=Math.max(.6,Tr.dist-.3)),this.currentDist=C<this.currentDist?C:this.currentDist+(C-this.currentDist)*Math.min(1,t*4),Ar.set(_.x-v*this.currentDist,_.y-m*this.currentDist,_.z-p*this.currentDist),Ar.y<.25&&(Ar.y=.25),a.position.copy(Ar);const R=this.trauma*this.trauma*(this.reducedShake?.2:1);if(R>.001){const P=this.shakeTime*30;a.position.x+=(Math.sin(P*1.3)+Math.sin(P*2.9))*.06*R,a.position.y+=(Math.sin(P*1.7+1)+Math.sin(P*3.1))*.06*R}a.lookAt(a.position.x+v,a.position.y+m,a.position.z+p),R>.001&&a.rotateZ(Math.sin(this.shakeTime*40)*.012*R),Math.abs(a.fov-h)>.05&&(a.fov+=(h-a.fov)*Math.min(1,t*8),a.updateProjectionMatrix())}get aimAmount(){return this.aimBlend}}const zt=s=>document.getElementById(s),Cr=new A;class Hv{constructor(){E(this,"root",zt("hud"));E(this,"els",{objective:zt("hudObjective"),wave:zt("hudWave"),pips:zt("wavePips"),enemies:zt("hudEnemies"),score:zt("hudScore"),best:zt("hudBest"),combo:zt("hudCombo"),comboValue:zt("hudComboValue"),comboBar:zt("hudComboBar"),health:zt("hudHealth"),healthGhost:zt("hudHealthGhost"),healthNum:zt("hudHealthNum"),armor:zt("hudArmor"),armorNum:zt("hudArmorNum"),boost:zt("hudBoost"),boostTime:zt("hudBoostTime"),boostVignette:zt("boostVignette"),weaponPanel:zt("hudWeaponPanel"),weaponName:zt("hudWeaponName"),mag:zt("hudMag"),reserve:zt("hudReserve"),reloadWrap:zt("hudReloadWrap"),reload:zt("hudReload"),slotPistol:zt("slotPistol"),slotRifle:zt("slotRifle"),speedo:zt("speedo"),speedArc:zt("speedArc"),speedValue:zt("speedValue"),speedCar:zt("speedCar"),crosshair:zt("crosshair"),hitmarker:zt("hitmarker"),dmgDir:zt("dmgDir"),damageVignette:zt("damageVignette"),prompt:zt("prompt"),banner:zt("banner"),bannerKicker:zt("bannerKicker"),bannerTitle:zt("bannerTitle"),bannerSub:zt("bannerSub"),killfeed:zt("killfeed"),numbers:zt("damageNumbers"),fps:zt("fps")});E(this,"radarCtx");E(this,"cache",new Map);E(this,"numbers",[]);E(this,"damageTimer",0);E(this,"dirTimer",0);this.radarCtx=zt("radar").getContext("2d");for(let t=0;t<18;t++){const e=document.createElement("span");e.style.opacity="0",this.els.numbers.appendChild(e),this.numbers.push({el:e,pos:new A,life:0,vy:0})}}changed(t,e){return this.cache.get(t)===e?!1:(this.cache.set(t,e),!0)}show(t){this.root.classList.toggle("hidden",!t)}setObjective(t){this.changed("obj",t)&&(this.els.objective.textContent=t)}setWave(t,e){this.changed("wave",t)&&(this.els.wave.textContent=String(Math.max(1,t)),this.els.pips.innerHTML=Array.from({length:e},(n,i)=>`<i class="${i+1<t?"done":i+1===t?"now":""}"></i>`).join(""))}setEnemies(t){this.changed("enemies",t)&&(this.els.enemies.textContent=String(t))}setScore(t,e){this.changed("score",t)&&(this.els.score.textContent=t.toLocaleString("en-US"),this.els.score.classList.remove("bump"),this.els.score.offsetWidth,this.els.score.classList.add("bump")),this.changed("best",e)&&(this.els.best.textContent=e.toLocaleString("en-US"))}setCombo(t,e){const n=t>1;this.changed("comboOn",n)&&this.els.combo.classList.toggle("on",n),this.changed("combo",t)&&(this.els.comboValue.textContent=`x${t}`),n&&(this.els.comboBar.style.transform=`scaleX(${e.toFixed(3)})`)}setHealth(t,e){const n=Math.ceil(t);if(!this.changed("hp",n))return;const i=Math.max(0,t/e);this.els.health.style.transform=`scaleX(${i})`,this.els.healthGhost.style.transform=`scaleX(${i})`,this.els.healthNum.textContent=String(n),this.els.health.parentElement.classList.toggle("low",i<.3)}setArmor(t,e){const n=Math.ceil(t);this.changed("arm",n)&&(this.els.armor.style.transform=`scaleX(${Math.max(0,t/e)})`,this.els.armorNum.textContent=String(n))}setBoost(t){const e=t>0;this.changed("boostOn",e)&&(this.els.boost.classList.toggle("hidden",!e),this.els.boostVignette.classList.toggle("on",e));const n=Math.ceil(t);e&&this.changed("boostT",n)&&(this.els.boostTime.textContent=String(n))}setWeapon(t,e){const n=t.def.id;this.changed("wid",n)&&(this.els.weaponName.textContent=t.def.name,this.els.weaponPanel.classList.toggle("rifle",n==="rifle"),this.els.slotPistol.classList.toggle("active",n==="pistol"),this.els.slotRifle.classList.toggle("active",n==="rifle")),this.changed("drv",e)&&this.els.weaponPanel.classList.toggle("faded",e),this.changed("mag",t.mag)&&(this.els.mag.textContent=String(t.mag),this.els.mag.classList.toggle("low",t.mag<=Math.ceil(t.def.magSize*.25)));const i=t.reserve===1/0?"∞":String(t.reserve);this.changed("res",i)&&(this.els.reserve.textContent=i);const r=t.reloading;this.changed("rl",r)&&this.els.reloadWrap.classList.toggle("on",r),r&&(this.els.reload.style.transform=`scaleX(${(1-t.reloadLeft/t.def.reloadTime).toFixed(3)})`)}setSpeed(t,e=""){const n=t!==null;if(this.changed("spdOn",n)&&this.els.speedo.classList.toggle("hidden",!n),!n)return;const i=Math.round(t);if(this.changed("spd",i)){this.els.speedValue.textContent=String(i);const r=Math.min(1,t/140);this.els.speedArc.style.strokeDashoffset=String(252*(1-r))}this.changed("car",e)&&(this.els.speedCar.textContent=e)}setCrosshair(t,e){this.changed("xh",t)&&this.els.crosshair.classList.toggle("hidden-x",!t);const n=Math.round(e);this.changed("xhs",n)&&this.els.crosshair.style.setProperty("--gap",`${n}px`)}hitMarker(t){const e=this.els.hitmarker;e.className="hitmarker",e.offsetWidth,e.classList.add("show"),t!=="hit"&&e.classList.add(t)}damage(t,e){this.damageTimer=Math.min(1,.35+t),this.els.damageVignette.style.transition="none",this.els.damageVignette.style.opacity=String(this.damageTimer),e!==null&&(this.els.dmgDir.style.transform=`rotate(${e}rad)`,this.els.dmgDir.classList.add("on"),this.dirTimer=.1)}prompt(t){this.changed("prompt",t??"")&&(this.els.prompt.classList.toggle("hidden",!t),t&&(this.els.prompt.innerHTML=t))}banner(t,e,n=""){this.els.bannerKicker.textContent=t,this.els.bannerTitle.textContent=e,this.els.bannerSub.textContent=n;const i=this.els.banner;i.classList.remove("show"),i.offsetWidth,i.classList.add("show")}feed(t,e,n=""){const i=document.createElement("div");i.innerHTML=`${t>0?`<span class="pts">+${t}</span>`:""}${e}${n?`<span class="tag">${n}</span>`:""}`;const r=this.els.killfeed;for(r.prepend(i);r.children.length>5;)r.lastElementChild.remove();window.setTimeout(()=>i.remove(),3100)}damageNumber(t,e,n){const i=this.numbers.reduce((r,a)=>a.life<r.life?a:r);i.pos.copy(t),i.pos.x+=(Math.random()-.5)*.4,i.life=.8,i.vy=1.6,i.el.textContent=String(e),i.el.className=n?"head":""}update(t,e,n,i){this.damageTimer>0&&(this.damageTimer=Math.max(0,this.damageTimer-t*1.6),this.els.damageVignette.style.opacity=String(this.damageTimer)),this.dirTimer>0&&(this.dirTimer-=t,this.dirTimer<=0&&this.els.dmgDir.classList.remove("on"));for(const r of this.numbers){if(r.life<=0)continue;if(r.life-=t,r.pos.y+=r.vy*t,r.vy*=.94,Cr.copy(r.pos).project(e),r.life<=0||Cr.z>1){r.el.style.opacity="0";continue}const a=(Cr.x*.5+.5)*n,o=(-Cr.y*.5+.5)*i;r.el.style.transform=`translate(${a.toFixed(1)}px, ${o.toFixed(1)}px) translate(-50%, -50%)`,r.el.style.opacity=String(Math.min(1,r.life*2.5))}}drawRadar(t,e,n,i){const r=this.radarCtx,a=148,o=a/2,l=60;r.clearRect(0,0,a,a),r.save(),r.beginPath(),r.arc(o,o,o-1,0,Math.PI*2),r.clip(),r.strokeStyle="rgba(46,242,255,0.14)",r.lineWidth=1;for(const h of[.33,.66])r.beginPath(),r.arc(o,o,o*h,0,Math.PI*2),r.stroke();r.translate(o,o),r.rotate(n);const c=o/l;r.strokeStyle="rgba(255,79,210,0.18)",r.lineWidth=14*c;for(const h of[-100,-50,0,50,100])r.beginPath(),r.moveTo((h-t)*c,-o*2),r.lineTo((h-t)*c,o*2),r.stroke(),r.beginPath(),r.moveTo(-o*2,(h-e)*c),r.lineTo(o*2,(h-e)*c),r.stroke();for(const h of i){const u=(h.x-t)*c,d=(h.z-e)*c,f=Math.hypot(u,d),g=f>o-6?u/f*(o-6):u,v=f>o-6?d/f*(o-6):d;r.fillStyle=h.color,r.beginPath(),r.arc(g,v,h.size,0,Math.PI*2),r.fill()}r.restore(),r.fillStyle="#ffffff",r.beginPath(),r.moveTo(o,o-7),r.lineTo(o+5,o+5),r.lineTo(o,o+2),r.lineTo(o-5,o+5),r.closePath(),r.fill()}setFps(t){this.changed("fps",t)&&(this.els.fps.textContent=t)}resetTransient(){this.els.killfeed.innerHTML="";for(const t of this.numbers)t.life=0,t.el.style.opacity="0";this.damageTimer=0,this.els.damageVignette.style.opacity="0",this.cache.clear()}}const Yt=s=>document.getElementById(s);class Vv{constructor(t,e){E(this,"settings");E(this,"modalReturn","title");E(this,"current","title");E(this,"screens",{title:Yt("title"),pause:Yt("pause"),end:Yt("end"),how:Yt("how"),settings:Yt("settings"),lock:Yt("lockPrompt")});this.settings={...t};const n=(o,l)=>Yt(o).addEventListener("click",()=>{e.onUiSound("click"),l()});n("btnStart",()=>e.onStart()),n("btnHow",()=>this.openModal("how")),n("btnSettings",()=>this.openModal("settings")),n("btnResume",()=>e.onResume()),n("btnRestart",()=>e.onRestart()),n("btnPauseSettings",()=>this.openModal("settings")),n("btnPauseHow",()=>this.openModal("how")),n("btnQuit",()=>e.onQuit()),n("btnReplay",()=>e.onReplay()),n("btnEndTitle",()=>e.onQuit()),n("btnLock",()=>e.onLock()),n("btnSound",()=>{this.settings.muted=!this.settings.muted,this.syncSettingsUI(),e.onSettings({...this.settings})}),n("btnResetRecords",()=>{window.confirm("Reset your local best score and records? This cannot be undone.")&&e.onResetRecords()}),document.querySelectorAll("[data-close]").forEach(o=>o.addEventListener("click",()=>{e.onUiSound("click"),this.closeModal()})),document.querySelectorAll(".btn").forEach(o=>o.addEventListener("mouseenter",()=>e.onUiSound("hover")));const i=(o,l,c,h)=>{const u=Yt(o);u.addEventListener("input",()=>{this.settings[c]=Number(u.value),Yt(l).textContent=h(this.settings[c]),e.onSettings({...this.settings})})};i("setSens","outSens","sensitivity",o=>o.toFixed(1)),i("setMusic","outMusic","musicVolume",o=>String(Math.round(o*100))),i("setSfx","outSfx","sfxVolume",o=>String(Math.round(o*100)));const r=(o,l)=>{const c=Yt(o);c.addEventListener("change",()=>{this.settings[l]=c.checked,this.syncSettingsUI(),e.onSettings({...this.settings})})};r("setMute","muted"),r("setInvert","invertY"),r("setShake","reducedShake"),r("setContrast","highContrast"),document.querySelectorAll("[data-quality]").forEach(o=>{o.setAttribute("role","radio"),o.addEventListener("click",()=>{e.onUiSound("click"),this.settings.quality=o.dataset.quality,this.syncSettingsUI(),e.onSettings({...this.settings})})});const a=()=>{e.onGesture(),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a)};window.addEventListener("pointerdown",a),window.addEventListener("keydown",a),window.addEventListener("keydown",o=>{o.code==="Escape"&&(!this.screens.how.classList.contains("hidden")||!this.screens.settings.classList.contains("hidden"))&&this.closeModal()}),matchMedia("(pointer: coarse)").matches&&!matchMedia("(pointer: fine)").matches&&(Yt("deviceNote").textContent="This is a desktop game — it needs a keyboard and mouse. Enjoy the view!"),this.syncSettingsUI()}get screen(){return this.current}get modalOpen(){return!this.screens.how.classList.contains("hidden")||!this.screens.settings.classList.contains("hidden")}show(t){this.current=t,this.screens.title.classList.toggle("hidden",t!=="title"),this.screens.pause.classList.toggle("hidden",t!=="pause"),this.screens.end.classList.toggle("hidden",t!=="end"),this.screens.lock.classList.toggle("hidden",t!=="lock"),this.screens.how.classList.add("hidden"),this.screens.settings.classList.add("hidden");const e=t==="title"?"btnStart":t==="pause"?"btnResume":t==="end"?"btnReplay":t==="lock"?"btnLock":null;e&&window.setTimeout(()=>Yt(e).focus({preventScroll:!0}),30)}openModal(t){this.modalReturn=this.current,this.screens.title.classList.add("hidden"),this.screens.pause.classList.add("hidden"),this.screens[t].classList.remove("hidden"),this.syncSettingsUI(),this.screens[t].querySelector("input, button")?.focus({preventScroll:!0})}closeModal(){this.show(this.modalReturn)}setRecords(t){Yt("titleBest").textContent=t.bestScore.toLocaleString("en-US"),Yt("titleWave").textContent=t.highestWave?`HIGHEST WAVE ${t.highestWave} · ${t.totalKills} TAKEDOWNS`:"NO RUNS YET";const e=Yt("recordsList");if(!t.runs.length){e.innerHTML='<li class="empty">No runs yet — set the first record.</li>';return}e.innerHTML=t.runs.map(n=>{const r=new Date(n.date).toLocaleDateString(void 0,{month:"short",day:"numeric"});return`<li><span>W${n.wave}${n.completed?" ✓":""}</span><b>${n.score.toLocaleString("en-US")}</b><em>${r}</em></li>`}).join("")}showEnd(t){Yt("endTitle").textContent=t.won?"CITY SECURED":"FLATLINED",Yt("end").querySelector(".end-card").classList.toggle("win",t.won),Yt("endKicker").textContent=t.won?"MISSION 01 — NIGHTFALL · COMPLETE":"MISSION 01 — NIGHTFALL · FAILED",Yt("endRecord").classList.toggle("hidden",!t.newBest),Yt("endScore").textContent=t.score.toLocaleString("en-US"),Yt("endKills").textContent=String(t.kills),Yt("endWaves").textContent=String(t.waves),Yt("endAccuracy").textContent=`${Math.round(t.accuracy*100)}%`,Yt("endHeads").textContent=String(t.headshots),Yt("endCombo").textContent=`x${t.bestCombo}`;const e=Math.floor(t.time/60),n=Math.floor(t.time%60);Yt("endTime").textContent=`${e}:${String(n).padStart(2,"0")}`,this.show("end")}syncSettingsUI(){const t=this.settings;Yt("setSens").value=String(t.sensitivity),Yt("outSens").textContent=t.sensitivity.toFixed(1),Yt("setMusic").value=String(t.musicVolume),Yt("outMusic").textContent=String(Math.round(t.musicVolume*100)),Yt("setSfx").value=String(t.sfxVolume),Yt("outSfx").textContent=String(Math.round(t.sfxVolume*100)),Yt("setMute").checked=t.muted,Yt("setInvert").checked=t.invertY,Yt("setShake").checked=t.reducedShake,Yt("setContrast").checked=t.highContrast,document.querySelectorAll("[data-quality]").forEach(n=>n.setAttribute("aria-checked",String(n.dataset.quality===t.quality)));const e=Yt("btnSound");e.setAttribute("aria-pressed",String(!t.muted)),e.querySelector("span").textContent=t.muted?"SOUND OFF":"SOUND ON",document.body.classList.toggle("high-contrast",t.highContrast)}}let Rr=null;const zc=new Map;function kc(s,t){const e=new il;e.moveTo(s[0][0],s[0][1]);for(let i=1;i<s.length;i++)e.lineTo(s[i][0],s[i][1]);e.closePath();const n=new jr(e,{depth:t,bevelEnabled:!0,bevelSize:.05,bevelThickness:.05,bevelSegments:1,curveSegments:1});return n.rotateY(-Math.PI/2),n.translate(t/2,0,0),n.computeVertexNormals(),n}function Gv(){if(Rr)return Rr;const s=new Re(.37,.37,.3,16);s.rotateZ(Math.PI/2);const t=new Re(.22,.22,.32,8);return t.rotateZ(Math.PI/2),Rr={wheel:s,rim:t,box:new Gt(1,1,1),sportsBody:kc([[-2.25,.28],[2.3,.28],[2.38,.48],[2.2,.66],[.9,.86],[-1.5,.96],[-2.2,.98],[-2.32,.7]],1.86),sportsCabin:kc([[-1.45,.92],[.85,.86],[.05,1.3],[-.95,1.32]],1.5),tire:new be({color:723728,roughness:.9}),rimMat:new be({color:13158616,roughness:.25,metalness:.9}),glass:new be({color:658460,roughness:.05,metalness:.6,envMapIntensity:1.6}),dark:new be({color:526350,roughness:.6}),glow:Gs()},Rr}function Hc(s){let t=zc.get(s);return t||(t=new be({color:s,roughness:.22,metalness:.55,envMapIntensity:1.5}),zc.set(s,t)),t}function Fe(s,t,e,n,i,r=1,a=1,o=1){const l=new Lt(s,t);return l.position.set(e,n,i),l.scale.set(r,a,o),l}function cl(s,t,e,n){const i=Gv(),r=new oe,a=new oe;r.add(a);const o=Hc(t),l=new ce({color:new mt(16773840).multiplyScalar(2.2),toneMapped:!1}),c=new ce({color:new mt(16715824).multiplyScalar(1.4),toneMapped:!1});let h,u,d,f;if(s==="sports"){h=4.7,u=1.96,d=1.45,f=.88;const p=new Lt(i.sportsBody,o),x=new Lt(i.sportsCabin,i.glass);a.add(p,x);const M=new ce({color:new mt(e).multiplyScalar(1.6),toneMapped:!1});a.add(Fe(i.box,M,.99,.6,.2,.02,.05,2.6)),a.add(Fe(i.box,M,-.99,.6,.2,.02,.05,2.6)),a.add(Fe(i.box,i.dark,0,1.12,-2.05,1.8,.06,.38)),a.add(Fe(i.box,i.dark,.7,1.02,-2.05,.06,.16,.2)),a.add(Fe(i.box,i.dark,-.7,1.02,-2.05,.06,.16,.2)),a.add(Fe(i.box,l,.62,.6,2.33,.42,.08,.06)),a.add(Fe(i.box,l,-.62,.6,2.33,.42,.08,.06)),a.add(Fe(i.box,c,0,.78,-2.33,1.7,.09,.06))}else{h=4.5,u=1.9,d=1.4,f=.86;const p=s==="taxi",x=Hc(p?14262810:t);if(a.add(Fe(i.box,x,0,.66,0,1.86,.62,4.4)),a.add(Fe(i.box,i.glass,0,1.2,-.25,1.64,.5,2.2)),a.add(Fe(i.box,x,0,1.47,-.25,1.66,.06,2)),a.add(Fe(i.box,l,.62,.72,2.21,.38,.14,.04)),a.add(Fe(i.box,l,-.62,.72,2.21,.38,.14,.04)),a.add(Fe(i.box,c,.68,.76,-2.21,.36,.12,.04)),a.add(Fe(i.box,c,-.68,.76,-2.21,.36,.12,.04)),p){const M=new ce({color:new mt(16769658).multiplyScalar(1.5),toneMapped:!1});a.add(Fe(i.box,M,0,1.62,-.25,.7,.22,.3))}}Zh(a);const g=[],v=[];for(const[p,x]of[[f,d],[-f,d],[f,-d],[-f,-d]]){const M=new xe;M.position.set(p,.37,x);const _=new xe;_.add(new Lt(i.wheel,i.tire)),_.add(new Lt(i.rim,i.rimMat)),M.add(_),r.add(M),g.push(_),x>0&&v.push(M)}let m=null;return n&&(m=new Lt(new ke(3.4,6.2),_i(e,i.glow,.9)),m.rotation.x=-Math.PI/2,m.position.y=.04,m.renderOrder=2,r.add(m)),r.traverse(p=>{p instanceof Lt&&p!==m&&(p.castShadow=!0)}),{group:r,body:a,wheels:g,frontPivots:v,tailMat:c,headMat:l,underglow:m,length:h,width:u}}class Vc{constructor(t,e,n){E(this,"perimeter");E(this,"straight");E(this,"arc");this.half=t,this.radius=e,this.dir=n,this.straight=(t-e)*2,this.arc=Math.PI/2*e,this.perimeter=4*(this.straight+this.arc)}sample(t,e){const n=this.half,i=this.radius,r=this.straight,a=this.arc;let o=(t%this.perimeter+this.perimeter)%this.perimeter;this.dir<0&&(o=this.perimeter-o);const l=r+a,c=Math.floor(o/l),h=o-c*l;let u,d,f;if(h<r)u=n,d=-(n-i)+h,f=0;else{const p=(h-r)/i;u=n-i+Math.cos(p)*i,d=n-i+Math.sin(p)*i,f=-p}const g=-c*(Math.PI/2),v=Math.cos(g),m=Math.sin(g);e.x=u*v+d*m,e.z=-u*m+d*v,e.heading=f+g+(this.dir<0?Math.PI:0)}}const Pr={x:0,z:0,heading:0};class Wv{constructor(t){E(this,"group",new oe);E(this,"cars",[]);E(this,"loops",[new Vc(101.75,9,1),new Vc(98.25,6,-1)]);const e=[2779802,9054794,13684952,3816008,1727050,10119722,5909130];for(let n=0;n<t;n++){const i=this.loops[n%2],r=cl(n%3===0?"taxi":"sedan",e[n%e.length],0,!1);this.group.add(r.group);const a=9+Math.random()*4;this.cars.push({model:r,s:n/t*i.perimeter+Math.random()*20,speed:a,cruise:a,loop:i,stunned:0,x:0,z:0,heading:0,honk:0})}this.update(0,[])}get count(){return this.cars.length}update(t,e){for(const n of this.cars){if(n.honk=Math.max(0,n.honk-t),n.stunned>0)n.stunned-=t,n.speed=0;else{const a=Math.sin(n.heading),o=Math.cos(n.heading);let l=!1;for(const h of e){const u=h.x-n.x,d=h.z-n.z,f=u*a+d*o,g=Math.abs(u*o-d*a);if(f>0&&f<9&&g<2.2){l=!0;break}}for(const h of this.cars){if(h===n)continue;const u=h.x-n.x,d=h.z-n.z,f=u*a+d*o,g=Math.abs(u*o-d*a);if(f>0&&f<8&&g<1.6){l=!0;break}}const c=l?0:n.cruise;n.speed+=(c-n.speed)*Math.min(1,t*(l?5:1.2)),l&&n.honk<=0&&(n.honk=-1)}n.s+=n.speed*t,n.loop.sample(n.s,Pr),n.x=Pr.x,n.z=Pr.z,n.heading=Pr.heading,n.model.group.position.set(n.x,0,n.z),n.model.group.rotation.y=n.heading;const i=n.speed/.37*t;for(const a of n.model.wheels)a.rotation.x+=i;const r=n.speed<1?2.6:1;n.model.tailMat.color.setRGB(r,r*.04,r*.1)}}takeHonk(t){for(const e of this.cars)if(e.honk<0)return e.honk=4,t.x=e.x,t.z=e.z,!0;return!1}forEachHull(t){this.cars.forEach((e,n)=>{const i=Math.sin(e.heading),r=Math.cos(e.heading);for(const a of[-1.4,0,1.4])t(e.x+i*a,e.z+r*a,1,n)})}knock(t){this.cars[t].stunned=3}setVisibleCount(t){this.cars.forEach((e,n)=>e.model.group.visible=n<t)}}const za=[-1.45,0,1.45],Gc=1.02,Lr={hit:!1,nx:0,nz:0};class Xv{constructor(t,e,n,i,r,a){E(this,"model");E(this,"position",new A);E(this,"heading",0);E(this,"velocity",new Q);E(this,"steer",0);E(this,"occupied",!1);E(this,"forwardSpeed",0);E(this,"lateralSpeed",0);E(this,"braking",!1);E(this,"wheelSpin",0);E(this,"pitch",0);E(this,"roll",0);E(this,"spawn");E(this,"name");this.model=cl("sports",i,r,!0),this.position.set(t,0,e),this.heading=n,this.spawn={x:t,z:e,heading:n},this.name=a,this.sync()}get speedKmh(){return Math.abs(this.forwardSpeed)*3.6}forward(t){return t.set(Math.sin(this.heading),0,Math.cos(this.heading))}hullPoint(t,e){const n=za[t];e.x=this.position.x+Math.sin(this.heading)*n,e.z=this.position.z+Math.cos(this.heading)*n}get hullCount(){return za.length}get hullRadius(){return Gc}update(t,e,n){const i=e?.throttle??0,r=e?.handbrake??!this.occupied,a=r&&this.occupied,o=this.velocity.x*Math.sin(this.heading)+this.velocity.y*Math.cos(this.heading),l=Math.min(1,Math.abs(o)/nn.maxSpeed),c=nn.maxSteer*(1-.45*l),h=(e?.steer??0)*c;this.steer+=(h-this.steer)*Math.min(1,t*7);let u=o/nn.wheelBase*Math.tan(this.steer);const d=(a?46:26)/Math.max(4,Math.abs(o));u=ge.clamp(u,-d,d),this.heading+=u*t;const f=Math.sin(this.heading),g=Math.cos(this.heading),v=Math.cos(this.heading),m=-Math.sin(this.heading);let p=this.velocity.x*f+this.velocity.y*g,x=this.velocity.x*v+this.velocity.y*m;const M=p;if(this.braking=!1,i>0)p<-.5?(p=Math.min(0,p+nn.brake*t),this.braking=!0):p+=nn.accel*i*Math.max(.15,1-p/nn.maxSpeed)*t;else if(i<0)p>.5?(p=Math.max(0,p-nn.brake*t),this.braking=!0):p=Math.max(-11,p-nn.accel*.6*t);else{const R=nn.rolling*t;p=Math.abs(p)<=R?0:p-Math.sign(p)*R}p-=p*Math.abs(p)*nn.drag*.02*t,r&&(p-=Math.sign(p)*Math.min(Math.abs(p),(this.occupied?7:30)*t),this.braking=this.braking||Math.abs(p)>.5);const _=a?nn.handbrakeGrip:nn.grip;x*=Math.exp(-_*t),this.velocity.set(f*p+v*x,g*p+m*x),this.forwardSpeed=p,this.lateralSpeed=x,this.position.x+=this.velocity.x*t,this.position.z+=this.velocity.y*t;const I=this.collide(n);this.wheelSpin+=p/.37*t;const C=(p-M)/Math.max(t,1e-4);return this.pitch+=(ge.clamp(-C*.004,-.05,.05)-this.pitch)*Math.min(1,t*6),this.roll+=(ge.clamp(u*p*.004,-.07,.07)-this.roll)*Math.min(1,t*6),this.sync(),I}collide(t){let e=null;const n={x:0,z:0};for(let i=0;i<za.length;i++){this.hullPoint(i,n);const r=n.x,a=n.z;t.resolveCircle(n,Gc,.25,1.3,Lr),Lr.hit&&(this.position.x+=n.x-r,this.position.z+=n.z-a,e=this.bounce(Lr.nx,Lr.nz,r,a)??e)}return e}bounce(t,e,n,i){const r=this.velocity.x*t+this.velocity.y*e;if(r>=0)return null;const a=.25;this.velocity.x-=(1+a)*r*t,this.velocity.y-=(1+a)*r*e,this.velocity.multiplyScalar(.88);const o=Math.sin(this.heading),l=Math.cos(this.heading);return this.forwardSpeed=this.velocity.x*o+this.velocity.y*l,-r>3?{speed:-r,x:n,z:i,nx:t,nz:e}:null}sync(){const t=this.model.group;t.position.copy(this.position),t.rotation.y=this.heading,this.model.body.rotation.x=this.pitch,this.model.body.rotation.z=this.roll;for(const n of this.model.wheels)n.rotation.x=this.wheelSpin;for(const n of this.model.frontPivots)n.rotation.y=this.steer;const e=this.braking?3.2:1.2;this.model.tailMat.color.setRGB(e,.04*e,.12*e),this.model.underglow&&(this.model.underglow.material.opacity=this.occupied?1:.65)}reset(){this.position.set(this.spawn.x,0,this.spawn.z),this.heading=this.spawn.heading,this.velocity.set(0,0),this.steer=0,this.forwardSpeed=0,this.lateralSpeed=0,this.occupied=!1,this.sync()}}const hi={dist:0,nx:0,ny:0,nz:0},je=new A,qv=new ti,Yv=new A(0,0,1);class Zv{constructor(t,e){E(this,"group",new oe);E(this,"bolts",[]);this.world=t;const n=new Zr(.07,.9,2,6).rotateX(Math.PI/2),i=_i(new mt(e).multiplyScalar(2.4),null,1),r=Gs(64);for(let a=0;a<40;a++){const o=new Lt(n,i),l=new jo(new Yr({map:r,color:new mt(e).multiplyScalar(1.6),blending:Bn,depthWrite:!1,toneMapped:!1,transparent:!0}));l.scale.setScalar(.9),o.visible=l.visible=!1,this.group.add(o,l),this.bolts.push({core:o,halo:l,pos:new A,vel:new A,life:0,damage:0,active:!1})}}fire(t,e,n,i){const r=this.bolts.find(a=>!a.active);r&&(r.pos.copy(t),r.vel.subVectors(e,t).normalize().multiplyScalar(n),r.life=3,r.damage=i,r.active=!0,r.core.visible=r.halo.visible=!0,r.core.quaternion.copy(qv.setFromUnitVectors(Yv,je.copy(r.vel).normalize())))}update(t,e,n){for(const i of this.bolts){if(!i.active)continue;i.life-=t;const r=i.vel.length()*t;if(je.copy(i.vel).normalize(),e&&this.sweepTarget(i,r,e)){n.onHitTarget(i.damage,i.pos.x-je.x*10,i.pos.z-je.z*10),this.kill(i);continue}if(this.world.raycast(i.pos.x,i.pos.y,i.pos.z,je.x,je.y,je.z,r,hi,!1)){const a=i.pos.x+je.x*hi.dist,o=i.pos.y+je.y*hi.dist,l=i.pos.z+je.z*hi.dist;n.onHitWorld(a,o,l,hi.nx,hi.ny,hi.nz),this.kill(i);continue}if(i.pos.addScaledVector(i.vel,t),i.life<=0){this.kill(i);continue}i.core.position.copy(i.pos),i.halo.position.copy(i.pos)}}sweepTarget(t,e,n){const i=Math.max(1,Math.ceil(e/.25));for(let r=1;r<=i;r++){const a=e*r/i,o=t.pos.x+je.x*a,l=t.pos.y+je.y*a,c=t.pos.z+je.z*a;if(l<n.y0||l>n.y1)continue;const h=o-n.x,u=c-n.z;if(h*h+u*u<n.radius*n.radius)return!0}return!1}kill(t){t.active=!1,t.core.visible=t.halo.visible=!1}clear(){for(const t of this.bolts)this.kill(t)}}const Zn=[-100,-50,0,50,100],$v=new ce({color:new mt(.25,.25,.25),toneMapped:!1}),Kv=new ce({color:new mt(.35,.02,.05),toneMapped:!1}),Le=7,jv=3,Zi=15;function Jv(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Qv={mid:[2761024,2042436,3350842,2434358,2891568,1844792],tower:[1712704,2234938,1450034,2761800,1908019],hotel:[9194610,4161400,7101608,10115682,4876954,10517082],alley:[2826280,2498854,2958368,2040356],backdrop:[1380902,1709360,1183520,1841200]},Wc=[St.magenta,St.cyan,St.purple,St.pink,St.blue,St.orange];class t_{constructor(){E(this,"items",new Map);E(this,"m",new $t);E(this,"q",new ti);E(this,"e",new mn);E(this,"s",new A);E(this,"p",new A)}define(t,e,n,i=!0){this.items.set(t,{geo:e,mat:n,mats:[],shadow:i})}add(t,e,n,i,r=0,a=1,o=1,l=1){const c=this.items.get(t);this.q.setFromEuler(this.e.set(0,r,0)),c.mats.push(this.m.compose(this.p.set(e,n,i),this.q,this.s.set(a,o,l)).clone())}build(t){for(const{geo:e,mat:n,mats:i,shadow:r}of this.items.values()){if(!i.length)continue;const a=new Br(e,n,i.length);i.forEach((o,l)=>a.setMatrixAt(l,o)),a.castShadow=r,a.receiveShadow=!0,a.computeBoundingSphere(),t.add(a)}}}class e_{constructor(t){E(this,"group",new oe);E(this,"rng",Jv(1986));E(this,"buildings",[]);E(this,"props",new t_);E(this,"glowTex",Gs());E(this,"streakTex",yv());E(this,"pools",[]);E(this,"layout",{playerStart:new A(25,0,21),playerStartYaw:0,drivableCars:[],lightSpots:[],signs:[],blinkers:[],steamVents:[]});this.world=t}r(t,e){return t+(e-t)*this.rng()}pick(t){return t[Math.floor(this.rng()*t.length)]}generate(){this.defineProps(),this.buildGround();for(let t=0;t<4;t++)for(let e=0;e<4;e++){const n=-75+t*50,i=-75+e*50,r=`${t},${e}`;r==="2,2"?this.buildPlaza(n,i):r==="0,3"?this.buildGarage(n,i):r==="1,3"?this.buildBackstreet(n,i):r==="3,3"?this.buildParkingLot(n,i):t===3?this.buildHotels(n,i,e):(t===1||t===2)&&(e===1||e===2)?this.buildDowntown(n,i):this.buildMidrise(n,i)}return this.buildStreetFurniture(),this.buildPromenade(),this.buildBoundary(),this.buildBackdrop(),this.buildBridge(),this.buildParkedCars(),Av(this.group),this.emitBuildings(),this.emitLightPools(),this.props.build(this.group),this.world.buildNav(),this.layout}buildGround(){const t={xs:Zn,zs:Zn,halfWidth:Le,sidewalk:jv},e=new ke(420,420,1,1);e.rotateX(-Math.PI/2),e.translate(-90,0,0);const n=new Lt(e,Mv(t));n.receiveShadow=!0,this.group.add(n);const i=new be({color:2761270,roughness:.5}),r=new Gt(1,1,1);this.props.define("kerb",r,i,!1);for(const a of Zn)for(let o=0;o<4;o++){const l=-100+o*50+Le,c=-100+(o+1)*50-Le;for(const h of[-1,1])a===100&&h===1||this.props.add("kerb",a+h*(Le+.1),.06,(l+c)/2,0,.2,.12,c-l)}for(const a of Zn)for(let o=0;o<4;o++){const l=-100+o*50+Le,c=-100+(o+1)*50-Le;for(const h of[-1,1])Math.abs(a)===100&&h===Math.sign(a)||this.props.add("kerb",(l+c)/2,.06,a+h*(Le+.1),0,c-l,.12,.2)}}addBuilding(t,e,n,i,r,a,o=0,l=!0,c){const h={x:e,z:n,w:i,d:r,h:a,y0:o,color:this.pick(Qv[t]),accent:c??this.pick(Wc),seed:this.rng()};return this.buildings.push(h),l&&this.world.addCentered(e,n,i,r,a,o),h}addTieredTower(t,e,n,i,r,a,o,l){const c=this.addBuilding(t,e,n,i,r,a*(o>1?.62:1));let h=c.h,u=i,d=r;for(let f=1;f<o;f++){u*=.74,d*=.74;const g=a*.38/(o-1);this.addBuilding(t,e,n,u,d,g,h,!0,c.accent),h+=g}if(l){this.props.add("spire",e,h,n,0,1,this.r(6,12),1);const f=new ce({color:new mt(16719936).multiplyScalar(3),toneMapped:!1}),g=new Lt(new yi(.35,8,6),f);g.position.set(e,h+12.2,n),this.group.add(g),this.layout.blinkers.push(f)}}buildMidrise(t,e){const n=this.rng()<.5?2:3,i=Zi*2/n;for(let r=0;r<n;r++)for(let a=0;a<2;a++){const o=i-this.r(.2,2.5),l=Zi-this.r(.2,2.5),c=t-Zi+i*(r+.5),h=e-Zi/2+a*Zi,u=this.r(9,30);this.rng()<.3?this.addTieredTower("mid",c,h,o,l,u+8,2,!1):this.addBuilding("mid",c,h,o,l,u),this.rng()<.35&&this.addRooftopBillboard(c,h,o,l,u)}}buildDowntown(t,e){const n=["HELIX CORP","ORBITAL BANK","NOVA TOWER","PRISM MEDIA"];for(let i=0;i<2;i++)for(let r=0;r<2;r++){const a=i===0&&r===1;if(!a&&this.rng()<.18)continue;const o=t-7.5+i*15,l=e-7.5+r*15,c=this.r(11,13.6),h=this.r(11,13.6),u=this.r(42,92);this.addTieredTower("tower",o,l,c,h,u,this.rng()<.7?3:2,this.rng()<.6),a&&this.addSign(this.pick(n),o,Math.min(22,u*.4),l+h/2+.08,0,c*.85,2.4,this.pick([St.cyan,St.magenta,St.purple]),"pulse",!1)}}buildHotels(t,e,n){const i=[["HOTEL SOLANA","VACANCY"],["CORAL PALMS","COCKTAILS"],["FLAMINGO NOIR","HOTEL"],["BLUE MARLIN","SUITES"],["MOONGLOW","MOTOR INN"],["STARLIGHT","CASINO"]],r=[St.pink,St.cyan,St.magenta,St.blue,St.purple,St.orange];for(let a=0;a<2;a++){const o=e-7.4+a*14.8,l=this.r(13,24),c=this.addBuilding("hotel",t+1,o,26,12.4,l);this.addBuilding("hotel",t+1,o,16,8.4,3.2,l,!0,c.accent).color=c.color,this.addBuilding("hotel",t+1,o,6,4,2.4,l+3.2,!0,c.accent).color=c.color;const h=(n*2+a)%i.length,[u,d]=i[h];this.addSign(u,t+14.15,l*.62,o,Math.PI/2,11,3.6,r[h],h%2?"flicker":"steady",!0,d),this.props.add("canopy",t+15.3,3.4,o,0,2.6,.25,6),this.world.addCentered(t+15.3,o,2.6,6,.25,3.3,!1)}this.layout.lightSpots.push({x:t+18,y:5,z:e,color:St.cyan,intensity:30,distance:26})}buildPlaza(t,e){const n=this.createPlazaTexture(),i=new Lt(new ke(30,30),new be({map:n,emissiveMap:n,emissive:16777215,emissiveIntensity:.55,roughness:.18,metalness:.3,envMapIntensity:1.2}));i.rotation.x=-Math.PI/2,i.position.set(t,.02,e),i.receiveShadow=!0,this.group.add(i);const r=new Lt(new Re(3.6,3.8,.7,28,1,!0),new be({color:3812693,roughness:.4,side:He}));r.position.set(t,.35,e);const a=new Lt(new el(3.6,28),new be({color:659504,roughness:.02,metalness:.8,emissive:2768127,emissiveIntensity:.35}));a.rotation.x=-Math.PI/2,a.position.set(t,.55,e);const o=new Lt(new Re(.25,.5,4.5,10),new ce({color:new mt(St.cyan).multiplyScalar(1.6),toneMapped:!1}));o.position.set(t,2.25,e),this.group.add(r,a,o),this.world.addCentered(t,e,6.6,6.6,.7),this.world.addCentered(t,e,1.2,1.2,4.5),this.layout.lightSpots.push({x:t,y:3.5,z:e,color:St.magenta,intensity:45,distance:30}),this.props.add("pylon",t-9,0,e+13,0,1,7,1),this.props.add("pylon",t+9,0,e+13,0,1,7,1),this.world.addCentered(t-9,e+13,.8,.8,7),this.world.addCentered(t+9,e+13,.8,.8,7),this.addSign("PALMWAVE PLAZA",t,6.6,e+13,0,17,3.4,St.magenta,"chase",!0),this.addSign("PALMWAVE PLAZA",t,6.6,e+12.98,Math.PI,17,3.4,St.magenta,"chase",!1);const l=new ol(5,.14,8,32,Math.PI);for(const[c,h,u,d]of[[t,e-14.6,0,St.cyan],[t-14.6,e,Math.PI/2,St.pink]]){const f=new Lt(l,new ce({color:new mt(d).multiplyScalar(2.2),toneMapped:!1}));f.position.set(c,0,h),f.rotation.y=u,this.group.add(f)}for(const[c,h]of[[-9,-9],[9,-9],[-9,6],[9,6]])this.props.add("planter",t+c,0,e+h,0,2.6,1,2.6),this.world.addCentered(t+c,e+h,2.6,2.6,1),this.addPalm(t+c,e+h,1);for(const[c,h,u]of[[-4.5,-12,0],[4.5,-12,0],[-12,-2,Math.PI/2],[12,-2,Math.PI/2]])this.addBench(t+c,e+h,u);for(const[c,h,u]of[[-5,8,0],[5,8,0],[-6.5,0,Math.PI/2],[6.5,0,Math.PI/2]])this.addBarrier(t+c,e+h,u);this.layout.playerStart.set(t,0,e-9.5),this.layout.playerStartYaw=0}buildGarage(t,e){const i=new be({color:3814982,roughness:.85}),r=new Gt(1,1,1),a=(c,h,u,d,f,g,v=i,m=!0)=>{const p=new Lt(r,v);p.position.set(c,h+f/2,u),p.scale.set(d,f,g),p.castShadow=!0,p.receiveShadow=!0,this.group.add(p),m&&this.world.addCentered(c,u,d,g,f,h)};a(t,0,e-14.6,30,5.2,.8),a(t,0,e+14.6,30,5.2,.8),a(t-14.6,0,e,.8,5.2,30),a(t+14.6,0,e-9.5,.8,5.2,11),a(t+14.6,0,e+9.5,.8,5.2,11),a(t+14.6,3.4,e,.8,5.2-3.4,8),a(t,5.2,e,30,.6,30),this.addBuilding("mid",t,e,30,30,9,5.2+.6);for(const c of[-7,0,7])for(const h of[-7,7])a(t+c,0,e+h,.9,5.2,.9);const o=new ce({color:new mt(12580607).multiplyScalar(1.8),toneMapped:!1});for(const c of[-10,-3.5,3.5,10]){const h=new Lt(r,o);h.position.set(t,5.2-.08,e+c),h.scale.set(22,.08,.25),this.group.add(h)}const l=new ce({color:16767050,transparent:!0,opacity:.6});for(let c=-3;c<=3;c++)for(const h of[-1,1]){const u=new Lt(r,l);u.position.set(t+c*3.6,.03,e+h*11),u.scale.set(.12,.02,6),this.group.add(u)}this.addSign("P  LEVEL 1",t+15.1,4.1,e,Math.PI/2,6,1.3,St.cyan,"flicker",!1),this.addSign("MIDNIGHT PARKING",t+15.1,8.2,e,Math.PI/2,14,2.4,St.yellow,"steady",!0),this.layout.lightSpots.push({x:t,y:4.2,z:e,color:10479871,intensity:40,distance:24}),this.layout.drivableCars.push({x:t+4,z:e-3,heading:Math.PI/2,color:1447455,accent:St.cyan});for(const[c,h]of[[-8,-11],[-4.4,11],[8,11]])this.addParkedCar(t+c,e+h,0);for(const[c,h]of[[-10,2],[10,-1]])this.addCrateStack(t+c,e+h)}buildBackstreet(t,e){const i=(Zi*2-6)/2;for(const r of[-1,1])for(const a of[-1,1]){const o=t+r*(3+i/2),l=e+a*(6/2+i/2);this.addBuilding("alley",o,l,i,i,this.r(9,16))}this.addDumpster(t-1.6,e-9,0),this.addDumpster(t+1.8,e+8.5,0),this.addDumpster(t-9,e+1.6,Math.PI/2),this.addCrateStack(t+9.5,e-1.6),this.addCrateStack(t-1.5,e+13),this.addCrateStack(t+1.5,e-13.5),this.addBarrier(t+13,e,Math.PI/2),this.addBarrier(t-13,e,Math.PI/2);for(const[r,a]of[[1.8,-4],[-1.8,5],[5,1.8],[-5,-1.8]])this.props.add("barrel",t+r,0,e+a);for(const[r,a]of[[1.8,-4],[-1.8,5],[5,1.8],[-5,-1.8]])this.world.addCentered(t+r,e+a,.8,.8,1.1);this.addSign("BACK ALLEY",t-2.94,4.5,e-7,Math.PI/2,5.5,1.5,St.orange,"flicker",!1),this.addSign("NOODLE BAR",t+2.94,4,e+8.5,-Math.PI/2,5.5,1.5,St.green,"steady",!1),this.addSign("NO EXIT",t+8,3.6,e-2.94,0,4.5,1.2,St.red,"flicker",!1),this.layout.steamVents.push(new A(t-.5,0,e-4),new A(t+4,0,e+.5),new A(t-6,0,e-.6)),this.layout.lightSpots.push({x:t,y:5,z:e,color:St.orange,intensity:32,distance:20})}buildParkingLot(t,e){const n=new ce({color:14737648,transparent:!0,opacity:.45}),i=new Gt(1,1,1);for(let r=-4;r<=4;r++)for(const a of[-1,1]){const o=new Lt(i,n);o.position.set(t+r*3.2,.02,e+a*9),o.scale.set(.12,.02,5.5),this.group.add(o)}for(const[r,a]of[[-6.4,-9],[3.2,-9],[-9.6,9],[9.6,9]])this.addParkedCar(t+r,e+a,0);this.layout.drivableCars.push({x:t+3.2,z:e+9,heading:Math.PI,color:6953983,accent:St.pink}),this.addBuilding("hotel",t-8,e+1,9,5,4.2,0,!0,St.pink),this.addSign("MIDNIGHT DINER",t-8,5.6,e+3.7,0,9,2,St.pink,"chase",!0,"OPEN 24/7");for(const[r,a]of[[13,-14],[13,14],[-14,-14]])this.addPalm(t+r,e+a,1);this.addBarrier(t+6,e,0),this.addBarrier(t+10,e,0)}buildStreetFurniture(){for(const i of Zn)for(let r=-95;r<=95;r+=25)if(!Zn.some(a=>Math.abs(r-a)<10))for(const a of[-1,1])i===100&&a===1||i===-100&&a===-1||this.addStreetLight(i+a*(Le+1.4),r+(a>0?6:-6),a>0?-Math.PI/2:Math.PI/2);for(const i of Zn)for(let r=-95;r<=95;r+=25)if(!Zn.some(a=>Math.abs(r-a)<10))for(const a of[-1,1])Math.abs(i)===100&&a===Math.sign(i)||this.addStreetLight(r+(a>0?6:-6),i+a*(Le+1.4),a>0?Math.PI:0);for(const i of[-50,0,50])for(const r of[-50,0,50])this.props.add("hydrant",i+Le+2.2,0,r+Le+2.2),this.world.addCentered(i+Le+2.2,r+Le+2.2,.5,.5,.8),this.props.add("bin",i-Le-2.2,0,r-Le-2.2),this.world.addCentered(i-Le-2.2,r-Le-2.2,.7,.7,1.1);const e=[["SOLAR COLA","TASTE THE SUNSET",St.orange],["RETROWAVE FM","88.6 ALL NIGHT",St.magenta],["VISIT CORAL KEY","PARADISE AWAITS",St.cyan],["TURBO ARCADE","INSERT COIN",St.purple]];[[-25,-40.6,Math.PI],[25,-59.4,0],[-59.4,25,Math.PI/2],[59.4,-25,-Math.PI/2]].forEach(([i,r,a],o)=>{const[l,c,h]=e[o];this.addSign(l,i,7.5,r,a,10,4.2,h,o%2?"pulse":"steady",!0,c,0),this.world.addCentered(i-Math.sin(a)*.12,r-Math.cos(a)*.12,.4,.4,5.4)})}buildPromenade(){for(let n=-104;n<=104;n+=9)Math.abs(n)<4||this.addPalm(109.5,n+Math.abs(n)%2,1.1);for(let n=-95;n<=95;n+=18)this.addBench(111,n,-Math.PI/2);const t=new ce({color:new mt(St.cyan).multiplyScalar(1.6),toneMapped:!1}),e=new Lt(new Gt(.1,.08,224),t);e.position.set(112.6,1.05,0),this.group.add(e);for(let n=-110;n<=110;n+=4)this.props.add("post",112.6,0,n,0,1,1,1);this.props.add("tower",117,0,-30,0,1,1,1),this.addSign("LIFEGUARD",117,4.4,-28.7,0,3.2,.8,St.pink,"steady",!1),this.layout.lightSpots.push({x:108,y:5,z:40,color:St.magenta,intensity:28,distance:26})}buildBoundary(){const t=new be({color:2366004,roughness:.7}),e=new ce({color:new mt(St.magenta).multiplyScalar(1.4),toneMapped:!1}),n=new Gt(1,1,1),i=[[0,-110.5,222,1],[0,110.5,222,1],[-110.5,0,1,222]];for(const[r,a,o,l]of i){const c=new Lt(n,t);c.position.set(r,.6,a),c.scale.set(o,1.2,l);const h=new Lt(n,e);h.position.set(r,1.22,a),h.scale.set(o+.02,.06,l+.02),this.group.add(c,h)}}buildBackdrop(){for(let t=0;t<70;t++){const e=Math.floor(this.rng()*3),n=this.r(-150,150),i=this.r(122,175),r=e===0?-i:Math.min(n,105),a=e===0?n:e===1?-i:i;this.addBuilding("backdrop",r,a,this.r(10,22),this.r(10,22),this.r(15,80),0,!1)}for(let t=0;t<90;t++){const e=this.r(Math.PI*.55,Math.PI*1.45),n=this.r(240,380);this.addBuilding("backdrop",Math.cos(e)*n,Math.sin(e)*n,this.r(16,36),this.r(16,36),this.r(30,140),0,!1)}}buildBridge(){const t=new be({color:1709096,roughness:.8}),e=new Lt(new Gt(520,1.2,10),t);e.position.set(380,7,-175),this.group.add(e);const n=new ce({color:new mt(St.yellow).multiplyScalar(2),toneMapped:!1}),i=new yi(.6,6,4),r=new Br(i,n,52),a=new $t;for(let o=0;o<52;o++)r.setMatrixAt(o,a.makeTranslation(125+o*10,8.2,-170));this.group.add(r);for(const o of[250,450]){const l=new Lt(new Gt(3,46,3),t);l.position.set(o,23,-175),this.group.add(l);const c=new Lt(i,new ce({color:new mt(16719936).multiplyScalar(3),toneMapped:!1}));c.position.set(o,46.5,-175),c.scale.setScalar(1.4),this.group.add(c),this.layout.blinkers.push(c.material);const h=new ce({color:new mt(St.cyan).multiplyScalar(1.2),toneMapped:!1});for(const u of[-1,1]){const d=Math.hypot(95,38),f=new Lt(new Re(.12,.12,d,4),h);f.position.set(o+u*47.5,27,-175),f.rotation.z=u*Math.atan2(95,38),this.group.add(f)}}}buildParkedCars(){this.layout.drivableCars.unshift({x:25,z:5.3,heading:Math.PI/2,color:16723837,accent:St.cyan});const t=[[-30,5.3,Math.PI/2],[-18,-5.3,-Math.PI/2],[5.3,-30,Math.PI],[-5.3,22,0],[55.3,70,0],[44.7,-80,Math.PI],[-44.7,-30,Math.PI],[-55.3,38,0],[70,-44.7,-Math.PI/2],[-80,55.3,Math.PI/2],[94.7,-60,Math.PI],[94.7,30,Math.PI]];for(const[e,n,i]of t)this.addParkedCar(e,n,i)}defineProps(){const t=new Gt(1,1,1);t.translate(0,.5,0);const e=(c,h=.7,u=.1)=>new be({color:c,roughness:h,metalness:u}),n=new Re(.09,.13,6.5,6).translate(0,3.25,0),i=new Gt(.1,.1,1.8).translate(0,6.4,.9);this.props.define("lightpole",Ji([n,i]),e(2763322,.4,.7)),this.props.define("lighthead",new Gt(.5,.12,.8).translate(0,6.3,1.7),new ce({color:new mt(16763120).multiplyScalar(2.2),toneMapped:!1}),!1),this.props.define("spire",new Re(.12,.45,1,6).translate(0,.5,0),e(4210778,.4,.8)),this.props.define("canopy",t,new be({color:1710632,emissive:16723922,emissiveIntensity:.25})),this.props.define("pylon",t,e(2761792,.4,.6)),this.props.define("planter",t,e(3812428,.8)),this.props.define("post",new Re(.05,.05,1.05,4).translate(0,.52,0),e(6974080,.3,.9),!1),this.props.define("hydrant",new Re(.18,.22,.8,8).translate(0,.4,0),e(13777498,.5)),this.props.define("bin",new Re(.32,.28,1.05,8).translate(0,.52,0),e(3029576,.6,.4)),this.props.define("barrel",new Re(.38,.38,1.1,10).translate(0,.55,0),e(2775674,.5,.5)),this.props.define("crate",t,e(5914412,.9)),this.props.define("dumpster",t,e(2050620,.6,.3)),this.props.define("dumplid",t,e(1454122,.6,.3));const r=new il;r.moveTo(-.32,0),r.lineTo(.32,0),r.lineTo(.14,.3),r.lineTo(.1,.85),r.lineTo(-.1,.85),r.lineTo(-.14,.3),r.closePath();const a=new jr(r,{depth:2.8,bevelEnabled:!1}).translate(0,0,-1.4);this.props.define("barrier",a,e(9077908,.8)),this.props.define("barrierStripe",new Gt(.22,.06,2.6).translate(0,.62,0),new ce({color:new mt(St.orange).multiplyScalar(1.4),toneMapped:!1}),!1);const o=Ji([new Gt(2,.08,.6).translate(0,.48,0),new Gt(2,.5,.08).translate(0,.8,-.28),new Gt(.1,.46,.5).translate(-.9,.23,0),new Gt(.1,.46,.5).translate(.9,.23,0)]);this.props.define("bench",o,e(7031418,.6,.2));const l=Ji([new Gt(2.4,.2,2.4).translate(0,2.6,0),new Gt(2.2,1.4,2.2).translate(0,3.4,0),new nl(1.8,.9,4).rotateY(Math.PI/4).translate(0,4.55,0),...[-1,1].flatMap(c=>[-1,1].map(h=>new Gt(.15,2.6,.15).translate(c,1.3,h)))]);this.props.define("tower",l,e(5222600,.6)),this.props.define("palm",this.createPalmGeometry(),new be({vertexColors:!0,roughness:.85,side:He}))}createPalmGeometry(){const t=[],e=(h,u)=>{const d=h.attributes.position.count,f=new Float32Array(d*3);for(let g=0;g<d;g++)u.toArray(f,g*3);return h.setAttribute("color",new we(f,3)),h},n=new mt(4863016),i=7;let r=0,a=0;for(let h=0;h<i;h++){const d=.26-h*.018,f=d-.018,g=new Re(f,d+.04,1.15,7).translate(0,1.15/2,0),v=.035+h*.012;g.rotateZ(-v*(h+1)*.6),g.translate(r,a,0),t.push(e(g,n.clone().multiplyScalar(h%2?1:.8))),r+=Math.sin(v*(h+1)*.6)*1.15,a+=Math.cos(v*(h+1)*.6)*1.15}const o=new mt(2054716),l=9;for(let h=0;h<l;h++){const u=new ke(.75,3.4,1,4),d=u.attributes.position;for(let f=0;f<d.count;f++){const g=d.getY(f)+1.7,v=g/3.4;d.setX(f,d.getX(f)*Math.sin(Math.PI*Math.min(1,v*1.15+.1))),d.setZ(f,-v*v*1.8),d.setY(f,g)}u.rotateX(-Math.PI/2+.55),u.rotateY(h/l*Math.PI*2+h%2*.2),u.translate(r,a,0),t.push(e(u,o.clone().multiplyScalar(.8+h%3*.15)))}const c=Ji(t.map(h=>h.index?h.toNonIndexed():h));return c.computeVertexNormals(),c}addStreetLight(t,e,n){this.props.add("lightpole",t,0,e,n),this.props.add("lighthead",t,0,e,n),this.world.addCentered(t,e,.35,.35,6.5);const i=t+Math.sin(n)*1.7,r=e+Math.cos(n)*1.7;this.pools.push({x:i,z:r,color:this.rng()<.6?16743112:7002367,size:7.5})}addPalm(t,e,n){const i=n*this.r(.85,1.15);this.props.add("palm",t,0,e,this.r(0,Math.PI*2),i,i,i),this.world.addCentered(t,e,.55,.55,8)}addBench(t,e,n){this.props.add("bench",t,0,e,n);const i=Math.abs(Math.sin(n))>.5;this.world.addCentered(t,e,i?.6:2,i?2:.6,.55)}addBarrier(t,e,n){this.props.add("barrier",t,0,e,n),this.props.add("barrierStripe",t,0,e,n);const i=Math.abs(Math.sin(n))>.5;this.world.addCentered(t,e,i?2.8:.64,i?.64:2.8,.85)}addDumpster(t,e,n){this.props.add("dumpster",t,0,e,n,2.2,1.2,1.2),this.props.add("dumplid",t,1.2,e,n,2.3,.1,1.3);const i=Math.abs(Math.sin(n))>.5;this.world.addCentered(t,e,i?1.3:2.3,i?2.3:1.3,1.3)}addCrateStack(t,e){this.props.add("crate",t,0,e,.1,1.2,1.2,1.2),this.props.add("crate",t+1.25,0,e+.1,-.05,1.2,1.2,1.2),this.props.add("crate",t+.6,1.2,e,.3,1.1,1.1,1.1),this.world.addBox(t-.65,0,e-.65,t+1.9,1.2,e+.75),this.world.addBox(t+.05,1.2,e-.55,t+1.15,2.3,e+.55)}addParkedCar(t,e,n){const i=[2779802,9054794,13684952,3816008,1727050,10119722],r=this.rng()<.25?"taxi":"sedan",a=cl(r,this.pick(i),0,!1);a.group.position.set(t,0,e),a.group.rotation.y=n,a.group.traverse(l=>{const c=l;c.material===a.headMat?c.material=$v:c.material===a.tailMat&&(c.material=Kv)}),this.group.add(a.group);const o=Math.abs(Math.sin(n))>.5;this.world.addCentered(t,e,o?4.5:1.95,o?1.95:4.5,1.5)}addRooftopBillboard(t,e,n,i,r){const a=[["SYNTH RECORDS","NEW WAVE"],["NEON NOODLES","OPEN LATE"],["LUMEN LOUNGE","LIVE DJ"],["CASINO ORBIT","WIN BIG"]],[o,l]=this.pick(a),c=this.rng()<.5,h=c?i/2:-i/2;this.addSign(o,t,r+2.4,e+h*.6,c?0:Math.PI,Math.min(n*.9,11),3.4,this.pick(Wc),this.pick(["steady","pulse","flicker"]),!1,l,r)}addSign(t,e,n,i,r,a,o,l,c,h,u,d){const f="#"+new mt(l).getHexString(),g=a/o,v=Sv(t,f,{width:512,height:Math.max(64,Math.round(512/g)),sub:u}),m=new mt(16777215).multiplyScalar(1.7),p=new ce({map:v,transparent:!0,toneMapped:!1,depthWrite:!1,color:m.clone()}),x=new Lt(new ke(a,o),p);if(x.position.set(e,n,i),x.rotation.y=r,x.renderOrder=3,this.group.add(x),d!==void 0){const M=new Lt(new ke(a*1.04,o*1.08),new be({color:722964,roughness:.6,side:He}));M.position.set(e-Math.sin(r)*.06,n,i-Math.cos(r)*.06),M.rotation.y=r,this.group.add(M);const _=n-o/2-d;_>.1&&this.props.add("post",e-Math.sin(r)*.12,d,i-Math.cos(r)*.12,0,3,_/1.05,3)}if(this.layout.signs.push({material:p,base:m,mode:c,seed:this.rng()*100}),h){const M=new Lt(new ke(a*.9,Math.min(14,n*1.6)),_i(l,this.streakTex,.42));M.rotation.x=-Math.PI/2,M.rotation.z=r;const _=Math.min(14,n*1.6)/2+.6;M.position.set(e+Math.sin(r)*_,.03,i+Math.cos(r)*_),M.renderOrder=1,this.group.add(M)}}emitBuildings(){const t=this.buildings.length,e=new Gt(1,1,1).translate(0,.5,0),n=new Float32Array(t),i=new Float32Array(t*3),r=new Br(e,xv(),t),a=new $t,o=new mt;this.buildings.forEach((l,c)=>{a.makeScale(l.w,l.h,l.d).setPosition(l.x,l.y0,l.z),r.setMatrixAt(c,a),r.setColorAt(c,o.set(l.color)),n[c]=l.seed,o.set(l.accent).toArray(i,c*3)}),e.setAttribute("aSeed",new Gr(n,1)),e.setAttribute("aAccent",new Gr(i,3)),r.castShadow=!0,r.receiveShadow=!0,r.computeBoundingSphere(),this.group.add(r)}emitLightPools(){const t=new ke(1,1).rotateX(-Math.PI/2),e=new ce({map:this.glowTex,transparent:!0,blending:Bn,depthWrite:!1,toneMapped:!1,opacity:.38}),n=new Br(t,e,this.pools.length),i=new $t,r=new mt;this.pools.forEach((a,o)=>{i.makeScale(a.size,1,a.size).setPosition(a.x,.035,a.z),n.setMatrixAt(o,i),n.setColorAt(o,r.set(a.color))}),n.renderOrder=1,this.group.add(n)}createPlazaTexture(){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d");n.fillStyle="#0b0716",n.fillRect(0,0,512,512);const i=512/12;for(let a=0;a<12;a++)for(let o=0;o<12;o++)n.fillStyle=(a+o)%2?"#120c22":"#0e0a1c",n.fillRect(a*i+1,o*i+1,i-2,i-2);n.strokeStyle="#ff2fd2",n.lineWidth=2,n.shadowColor="#ff2fd2",n.shadowBlur=8;for(let a=0;a<=12;a+=3)n.beginPath(),n.moveTo(a*i,0),n.lineTo(a*i,512),n.stroke(),n.beginPath(),n.moveTo(0,a*i),n.lineTo(512,a*i),n.stroke();n.strokeStyle="#2ef2ff",n.shadowColor="#2ef2ff",n.lineWidth=3,n.beginPath(),n.arc(512/2,512/2,512*.2,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(512/2,512/2,512*.32,0,Math.PI*2),n.stroke();const r=new Vs(e);return r.colorSpace=De,r.anisotropy=8,r}}const $i=8,zr=136,$n=Math.ceil(zr*2/$i);class n_{constructor(){E(this,"boxes",[]);E(this,"cells",Array.from({length:$n*$n},()=>[]));E(this,"stamp",1);E(this,"scratch",[]);E(this,"nav",new s_);E(this,"bounds",{minX:-110,maxX:112,minZ:-110,maxZ:110})}addBox(t,e,n,i,r,a,o=!0){const l={minX:t,minY:e,minZ:n,maxX:i,maxY:r,maxZ:a,solid:o,stamp:0};this.boxes.push(l);const[c,h]=[this.cellIndex(t),this.cellIndex(i)],[u,d]=[this.cellIndex(n),this.cellIndex(a)];for(let f=u;f<=d;f++)for(let g=c;g<=h;g++)this.cells[f*$n+g].push(l);return l}addCentered(t,e,n,i,r,a=0,o=!0){return this.addBox(t-n/2,a,e-i/2,t+n/2,a+r,e+i/2,o)}cellIndex(t){return Math.min($n-1,Math.max(0,Math.floor((t+zr)/$i)))}query(t,e,n,i){const r=this.scratch;r.length=0;const a=++this.stamp,o=this.cellIndex(t),l=this.cellIndex(n),c=this.cellIndex(e),h=this.cellIndex(i);for(let u=c;u<=h;u++)for(let d=o;d<=l;d++){const f=this.cells[u*$n+d];for(let g=0;g<f.length;g++){const v=f[g];v.stamp!==a&&(v.stamp=a,!(v.maxX<t||v.minX>n||v.maxZ<e||v.minZ>i)&&r.push(v))}}return r}resolveCircle(t,e,n,i,r){r.hit=!1,r.nx=0,r.nz=0;for(let l=0;l<3;l++){const c=this.query(t.x-e,t.z-e,t.x+e,t.z+e);let h=!1;for(let u=0;u<c.length;u++){const d=c[u];if(!d.solid||d.maxY<=n||d.minY>=i)continue;const f=Math.max(d.minX,Math.min(t.x,d.maxX)),g=Math.max(d.minZ,Math.min(t.z,d.maxZ));let v=t.x-f,m=t.z-g;const p=v*v+m*m;if(p>=e*e)continue;let x,M,_;if(p>1e-8){const I=Math.sqrt(p);x=v/I,M=m/I,_=e-I}else{const I=t.x-d.minX,C=d.maxX-t.x,R=t.z-d.minZ,P=d.maxZ-t.z,w=Math.min(I,C,R,P);v=w===I?-1:w===C?1:0,m=w===R?-1:w===P?1:0,x=v,M=m,_=w+e}t.x+=x*_,t.z+=M*_,r.hit=!0,r.nx+=x,r.nz+=M,h=!0}if(!h)break}const a=this.bounds;t.x<a.minX+e&&(t.x=a.minX+e,r.hit=!0,r.nx+=1),t.x>a.maxX-e&&(t.x=a.maxX-e,r.hit=!0,r.nx-=1),t.z<a.minZ+e&&(t.z=a.minZ+e,r.hit=!0,r.nz+=1),t.z>a.maxZ-e&&(t.z=a.maxZ-e,r.hit=!0,r.nz-=1);const o=Math.hypot(r.nx,r.nz);return o>0&&(r.nx/=o,r.nz/=o),r}groundHeight(t,e,n,i,r=ue.stepHeight){let a=0;const o=this.query(t-n*.7,e-n*.7,t+n*.7,e+n*.7);for(let l=0;l<o.length;l++){const c=o[l];!c.solid||c.maxY>i+r||c.maxY<=a||t+n*.7<c.minX||t-n*.7>c.maxX||e+n*.7<c.minZ||e-n*.7>c.maxZ||(a=c.maxY)}return a}raycast(t,e,n,i,r,a,o,l,c=!0){let h=o,u=!1;if(r<-1e-6){const y=-e/r;y>=0&&y<h&&(h=y,u=!0,l.nx=0,l.ny=1,l.nz=0)}const d=++this.stamp;let f=this.cellIndex(t),g=this.cellIndex(n);const v=i>0?1:-1,m=a>0?1:-1,p=Math.abs(i)>1e-9?1/i:1/0,x=Math.abs(a)>1e-9?1/a:1/0,M=(f+(v>0?1:0))*$i-zr,_=(g+(m>0?1:0))*$i-zr;let I=p===1/0?1/0:(M-t)*p,C=x===1/0?1/0:(_-n)*x;const R=p===1/0?1/0:$i*Math.abs(p),P=x===1/0?1/0:$i*Math.abs(x);let w=0;for(let y=0;y<128;y++){const D=this.cells[g*$n+f];for(let B=0;B<D.length;B++){const O=D[B];if(O.stamp===d||(O.stamp=d,!c&&!O.solid))continue;const V=i_(t,e,n,p,r,x,i,a,O,h,l);V>=0&&(h=V,u=!0)}if(h<=w||(I<C?(w=I,I+=R,f+=v):(w=C,C+=P,g+=m),w>h||f<0||g<0||f>=$n||g>=$n))break}return u&&(l.dist=h),u}lineOfSight(t,e,n,i,r,a,o){const l=i-t,c=r-e,h=a-n,u=Math.hypot(l,c,h);return u<1e-4?!0:!this.raycast(t,e,n,l/u,c/u,h/u,u,o,!1)}buildNav(){this.nav.build(this)}}function i_(s,t,e,n,i,r,a,o,l,c,h){let u=0,d=c,f=0,g=0,v=0;if(n===1/0){if(s<l.minX||s>l.maxX)return-1}else{let m=(l.minX-s)*n,p=(l.maxX-s)*n;if(m>p){const x=m;m=p,p=x}if(m>u&&(u=m,f=-Math.sign(a),g=0,v=0),d=Math.min(d,p),u>d)return-1}if(Math.abs(i)<1e-9){if(t<l.minY||t>l.maxY)return-1}else{const m=1/i;let p=(l.minY-t)*m,x=(l.maxY-t)*m;if(p>x){const M=p;p=x,x=M}if(p>u&&(u=p,f=0,g=-Math.sign(i),v=0),d=Math.min(d,x),u>d)return-1}if(r===1/0){if(e<l.minZ||e>l.maxZ)return-1}else{let m=(l.minZ-e)*r,p=(l.maxZ-e)*r;if(m>p){const x=m;m=p,p=x}if(m>u&&(u=m,f=0,g=0,v=-Math.sign(o)),d=Math.min(d,p),u>d)return-1}return u<=0||u>=c?-1:(h.nx=f,h.ny=g,h.nz=v,u)}const _n=2,Kn=-112,te=114;class s_{constructor(){E(this,"blocked",new Uint8Array(te*te));E(this,"dist",new Uint16Array(te*te));E(this,"queue",new Int32Array(te*te));E(this,"openCells",[])}build(t){for(let n=0;n<te;n++)for(let i=0;i<te;i++){const r=Kn+i*_n,a=Kn+n*_n,o=r+_n,l=a+_n,c=t.bounds;let h=r<c.minX||o>c.maxX||a<c.minZ||l>c.maxZ;if(!h){const d=t.query(r-.45,a-.45,o+.45,l+.45);for(const f of d)if(f.solid&&f.minY<1.4&&f.maxY>ue.stepHeight){h=!0;break}}const u=n*te+i;this.blocked[u]=h?1:0,h||this.openCells.push(u)}}cellOf(t,e){const n=Math.min(te-1,Math.max(0,Math.floor((t-Kn)/_n)));return Math.min(te-1,Math.max(0,Math.floor((e-Kn)/_n)))*te+n}cellCenter(t,e){e.x=Kn+(t%te+.5)*_n,e.z=Kn+(Math.floor(t/te)+.5)*_n}computeField(t,e){const n=this.dist;n.fill(65535);let i=this.cellOf(t,e);if(this.blocked[i]&&(i=this.nearestOpen(i)),i<0)return;let r=0,a=0;for(n[i]=0,this.queue[a++]=i;r<a;){const o=this.queue[r++],l=o%te,c=(o-l)/te,h=n[o];if(!(h>140))for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++){if(!d&&!u)continue;const f=l+d,g=c+u;if(f<0||g<0||f>=te||g>=te)continue;const v=g*te+f;this.blocked[v]||n[v]!==65535||d&&u&&(this.blocked[c*te+f]||this.blocked[g*te+l])||(n[v]=h+1,this.queue[a++]=v)}}}nearestOpen(t){const e=t%te,n=Math.floor(t/te);for(let i=1;i<6;i++)for(let r=-i;r<=i;r++)for(let a=-i;a<=i;a++){const o=e+a,l=n+r;if(o<0||l<0||o>=te||l>=te)continue;const c=l*te+o;if(!this.blocked[c])return c}return-1}steer(t,e,n){const i=this.cellOf(t,e),r=this.dist[i],a=i%te,o=(i-a)/te;let l=r,c=0,h=0;for(let g=-1;g<=1;g++)for(let v=-1;v<=1;v++){if(!v&&!g)continue;const m=a+v,p=o+g;if(m<0||p<0||m>=te||p>=te)continue;const x=p*te+m;this.blocked[x]||v&&g&&(this.blocked[o*te+m]||this.blocked[p*te+a])||this.dist[x]<l&&(l=this.dist[x],c=v,h=g)}if(l===65535||c===0&&h===0)return!1;const u=Kn+(a+c+.5)*_n-t,d=Kn+(o+h+.5)*_n-e,f=Math.hypot(u,d)||1;return n.x=u/f,n.z=d/f,!0}distanceAt(t,e){return this.dist[this.cellOf(t,e)]}}const Xc=`
uniform vec3 uSunDir;
vec3 skyColor(vec3 d) {
  float h = d.y;
  vec3 top = vec3(0.025, 0.012, 0.075);
  vec3 mid = vec3(0.16, 0.04, 0.26);
  vec3 low = vec3(0.75, 0.16, 0.42);
  vec3 hor = vec3(1.0, 0.42, 0.36);
  float sunFacing = max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(uSunDir.x, 0.0, uSunDir.z))), 0.0);
  vec3 c = mix(mid, top, smoothstep(0.08, 0.6, h));
  c = mix(low, c, smoothstep(-0.02, 0.18 + sunFacing * 0.12, h));
  c = mix(c, hor, (1.0 - smoothstep(-0.02, 0.07, h)) * (0.35 + 0.65 * pow(sunFacing, 3.0)));
  c = mix(c, vec3(0.06, 0.02, 0.1), smoothstep(0.0, -0.08, h));
  return c;
}
`;class r_{constructor(t){E(this,"sunDir",new A(1,.115,.18).normalize());E(this,"hemi");E(this,"moon");E(this,"rim");E(this,"ocean");E(this,"sky");E(this,"envTarget",null);this.scene=t,t.fog=new Ko(1706032,.0085),t.background=new mt(656408),this.sky=this.createSky(),t.add(this.sky),this.ocean=this.createOcean(),t.add(this.ocean),this.hemi=new Jg(8019199,1705512,.9),t.add(this.hemi),t.add(new ev(2757712,.6)),this.moon=new Pc(10135807,.75),this.moon.position.set(-40,80,-30),this.moon.shadow.mapSize.set(2048,2048);const e=this.moon.shadow.camera;e.left=-40,e.right=40,e.top=40,e.bottom=-40,e.near=1,e.far=220,this.moon.shadow.bias=-6e-4,this.moon.shadow.normalBias=.04,t.add(this.moon,this.moon.target),this.rim=new Pc(16735370,.85),this.rim.position.copy(this.sunDir).multiplyScalar(100),t.add(this.rim)}createSky(){const t=new Ee({side:Ve,depthWrite:!1,fog:!1,uniforms:{uSunDir:{value:this.sunDir},uTime:Hs},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,fragmentShader:`
        uniform float uTime;
        varying vec3 vDir;
        ${Xc}
        float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        void main() {
          vec3 d = normalize(vDir);
          vec3 c = skyColor(d);
          // Stars
          vec3 sp = floor(d * 320.0);
          float s = hash3(sp);
          float tw = 0.6 + 0.4 * sin(uTime * (1.0 + s * 3.0) + s * 50.0);
          c += vec3(0.85, 0.8, 1.0) * step(0.9975, s) * smoothstep(0.12, 0.45, d.y) * tw * 1.3;
          // Synthwave sun with horizontal slits
          float sd = acos(clamp(dot(d, uSunDir), -1.0, 1.0));
          float r = 0.13;
          float disc = 1.0 - smoothstep(r - 0.004, r, sd);
          float yRel = (d.y - uSunDir.y) / r;
          float slit = yRel > 0.0 ? 1.0 : step(-yRel * 0.55, fract(yRel * 6.0 + uTime * 0.12));
          vec3 sunCol = mix(vec3(1.0, 0.18, 0.55), vec3(1.0, 0.86, 0.3), smoothstep(-0.9, 0.9, yRel));
          c = mix(c, sunCol * 0.95, disc * slit * step(-0.005, d.y));
          c += vec3(1.0, 0.3, 0.5) * exp(-sd * 9.0) * 0.22;
          // Thin cloud streaks
          float band = smoothstep(0.02, 0.06, d.y) * (1.0 - smoothstep(0.1, 0.22, d.y));
          float cl = sin(d.x * 18.0 + d.z * 9.0 + uTime * 0.02) * 0.5 + 0.5;
          c = mix(c, vec3(0.35, 0.08, 0.3), band * cl * 0.45);
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`}),e=new Lt(new yi(900,48,24),t);return e.frustumCulled=!1,e.renderOrder=-10,e}createOcean(){const t=new ke(1400,2400,1,1);t.rotateX(-Math.PI/2),t.translate(820,-.35,0);const e=new Ee({fog:!1,uniforms:{uSunDir:{value:this.sunDir},uTime:Hs},vertexShader:`
        varying vec3 vWorld;
        void main() {
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,fragmentShader:`
        uniform float uTime;
        varying vec3 vWorld;
        ${Xc}
        void main() {
          vec2 p = vWorld.xz;
          float t = uTime;
          vec3 n = vec3(0.0, 1.0, 0.0);
          n.x += sin(p.x * 0.35 + t * 1.3) * 0.05 + sin(p.x * 1.7 - p.y * 0.6 + t * 2.1) * 0.025;
          n.z += cos(p.y * 0.42 - t * 1.1) * 0.05 + sin(p.y * 2.3 + p.x * 0.4 + t * 2.7) * 0.02;
          n = normalize(n);
          vec3 v = normalize(vWorld - cameraPosition);
          vec3 r = reflect(v, n);
          r.y = abs(r.y);
          float fres = pow(1.0 - max(dot(-v, n), 0.0), 3.0);
          vec3 refl = skyColor(r);
          float sunSpec = pow(max(dot(r, uSunDir), 0.0), 90.0) * 1.1;
          float glitter = pow(max(dot(r, uSunDir), 0.0), 18.0) * step(0.55, fract(sin(dot(floor(p * 2.0), vec2(12.9, 78.2))) * 43758.5 + t)) * 0.5;
          vec3 deep = vec3(0.02, 0.01, 0.06);
          vec3 c = mix(deep, refl, 0.25 + 0.65 * fres) + vec3(1.0, 0.45, 0.55) * (sunSpec + glitter);
          float dist = length(vWorld.xz - cameraPosition.xz);
          c = mix(c, skyColor(normalize(vec3(v.x, 0.01, v.z))), smoothstep(250.0, 900.0, dist));
          // Shore foam line
          c += vec3(0.6, 0.5, 0.9) * (1.0 - smoothstep(0.0, 2.5, vWorld.x - 120.0)) * (0.45 + 0.35 * sin(p.y * 0.5 + t * 2.0));
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`});return new Lt(t,e)}bakeEnvironment(t){const e=new Lh,n=this.sky.clone();n.scale.setScalar(.05),e.add(n);const i=new ke(1,1),r=[[16723922,30,6,-12,16,4],[3076863,-26,8,18,14,3],[9059839,10,14,32,22,6],[16747069,-14,5,-30,10,3],[16732058,-34,10,-6,8,8],[4025343,22,18,24,12,5]];for(const[o,l,c,h,u,d]of r){const f=new Lt(i,new ce({color:new mt(o).multiplyScalar(2.5),side:He}));f.position.set(l,c,h),f.scale.set(u,d,1),f.lookAt(0,c,0),e.add(f)}const a=new Ro(t);this.envTarget=a.fromScene(e,.035),this.scene.environment=this.envTarget.texture,a.dispose(),i.dispose(),e.traverse(o=>{o instanceof Lt&&o!==n&&o.material.dispose()})}setShadows(t){this.moon.castShadow=t}follow(t,e,n){this.sky.position.copy(t.position),this.moon.position.set(e-40,80,n-30),this.moon.target.position.set(e,0,n)}dispose(){this.envTarget?.dispose()}}class a_{constructor(t){E(this,"collision",new n_);E(this,"environment");E(this,"layout");E(this,"root",new oe);E(this,"motes");E(this,"lights",[]);this.environment=new r_(t);const e=new e_(this.collision);this.layout=e.generate(),this.root.add(e.group);for(const n of this.layout.lightSpots){const i=new Vh(n.color,n.intensity,n.distance,1.6);i.position.set(n.x,n.y,n.z),this.lights.push(i),this.root.add(i)}this.motes=this.createMotes(),this.root.add(this.motes),t.add(this.root)}createMotes(){const e=new Float32Array(2700),n=new Float32Array(900);for(let o=0;o<900;o++)e[o*3]=(Math.random()-.5)*220,e[o*3+1]=Math.random()*18,e[o*3+2]=(Math.random()-.5)*220,n[o]=Math.random();const i=new Me;i.setAttribute("position",new we(e,3)),i.setAttribute("aSeed",new we(n,1));const r=new Ee({transparent:!0,depthWrite:!1,blending:Bn,uniforms:{uTime:{value:0}},vertexShader:`
        uniform float uTime;
        attribute float aSeed;
        varying float vA;
        varying vec3 vC;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.2 + aSeed * 30.0) * 2.0;
          p.y = mod(p.y + uTime * (0.2 + aSeed * 0.3), 18.0);
          p.z += cos(uTime * 0.17 + aSeed * 20.0) * 2.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + aSeed * 3.0) * (60.0 / -mv.z);
          vA = (0.35 + 0.65 * sin(uTime * 2.0 + aSeed * 50.0) * 0.5 + 0.5) * smoothstep(90.0, 10.0, -mv.z);
          vC = aSeed < 0.5 ? vec3(1.0, 0.3, 0.85) : vec3(0.3, 0.9, 1.0);
        }`,fragmentShader:`
        varying float vA;
        varying vec3 vC;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          gl_FragColor = vec4(vC * 1.6, smoothstep(0.5, 0.0, d) * vA * 0.7);
        }`}),a=new Ih(i,r);return a.frustumCulled=!1,a}setPointLights(t){for(const e of this.lights)e.visible=t}update(t){this.motes.material.uniforms.uTime.value=t;for(const n of this.layout.signs){let i=1;switch(n.mode){case"flicker":{i=Math.sin(t*.7+n.seed)>.93?Math.sin(t*47+n.seed*13)>0?1:.15:.95+.05*Math.sin(t*9+n.seed);break}case"pulse":i=.7+.3*Math.sin(t*2.2+n.seed);break;case"chase":i=.75+.25*Math.sin(t*5+n.seed)*Math.sin(t*.8);break;default:i=1}n.material.color.copy(n.base).multiplyScalar(i)}const e=Math.sin(t*3)>.6?3:.3;for(const n of this.layout.blinkers)n.color.setRGB(e,e*.06,e*.12);for(let n=0;n<this.lights.length;n++)this.lights[n].intensity=this.layout.lightSpots[n].intensity*(.9+.1*Math.sin(t*1.7+n*2.1))}}class o_{constructor(){E(this,"phase","title");E(this,"wavePhase","intro");E(this,"waveTimer",0);E(this,"score",0);E(this,"kills",0);E(this,"headshots",0);E(this,"combo",0);E(this,"comboTimer",0);E(this,"bestCombo",1);E(this,"boostTimer",0);E(this,"elapsed",0);E(this,"wavesCleared",0);E(this,"won",!1)}reset(){this.phase="playing",this.wavePhase="intro",this.waveTimer=3.2,this.score=0,this.kills=0,this.headshots=0,this.combo=0,this.comboTimer=0,this.bestCombo=1,this.boostTimer=0,this.elapsed=0,this.wavesCleared=0,this.won=!1}get multiplier(){return Math.min(un.maxCombo,1+Math.floor(this.combo/2))}registerKill(t,e){this.kills++,e&&this.headshots++,this.combo++,this.comboTimer=un.comboWindow,this.bestCombo=Math.max(this.bestCombo,this.multiplier);const n=Math.round((t+(e?50:0))*this.multiplier);return this.score+=n,n}addScore(t){this.score+=t}update(t){this.elapsed+=t,this.comboTimer>0&&(this.comboTimer-=t,this.comboTimer<=0&&(this.combo=0)),this.boostTimer>0&&(this.boostTimer=Math.max(0,this.boostTimer-t))}}class l_{constructor(t){E(this,"down",new Set);E(this,"pressed",new Set);E(this,"mouseDX",0);E(this,"mouseDY",0);E(this,"wheel",0);E(this,"fireHeld",!1);E(this,"aimHeld",!1);E(this,"firePressed",!1);E(this,"locked",!1);E(this,"enabled",!1);E(this,"cleanup",[]);this.target=t,this.on(window,"keydown",e=>{const n=e;this.enabled&&["Space","Tab","ArrowUp","ArrowDown"].includes(n.code)&&n.preventDefault(),this.down.has(n.code)||this.pressed.add(n.code),this.down.add(n.code)}),this.on(window,"keyup",e=>this.down.delete(e.code)),this.on(window,"blur",()=>this.releaseAll()),this.on(document,"mousemove",e=>{if(!this.locked)return;const n=e;Math.abs(n.movementX)>400||Math.abs(n.movementY)>400||(this.mouseDX+=n.movementX,this.mouseDY+=n.movementY)}),this.on(t,"mousedown",e=>{const n=e;this.locked&&(n.button===0?(this.fireHeld=!0,this.firePressed=!0):n.button===2&&(this.aimHeld=!0))}),this.on(window,"mouseup",e=>{const n=e;n.button===0?this.fireHeld=!1:n.button===2&&(this.aimHeld=!1)}),this.on(t,"contextmenu",e=>e.preventDefault()),this.on(t,"wheel",e=>{this.wheel+=Math.sign(e.deltaY)},{passive:!0}),this.on(document,"pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target,this.locked||this.releaseAll()})}on(t,e,n,i){t.addEventListener(e,n,i),this.cleanup.push(()=>t.removeEventListener(e,n,i))}isDown(t){return this.enabled&&this.down.has(t)}wasPressed(t){return this.enabled&&this.pressed.has(t)}axis(t,e,n,i){let r=0;return(this.isDown(t)||n&&this.isDown(n))&&(r-=1),(this.isDown(e)||i&&this.isDown(i))&&(r+=1),r}requestLock(){if(document.pointerLockElement!==this.target)try{const t=this.target.requestPointerLock();t instanceof Promise&&t.catch(()=>{})}catch{}}exitLock(){document.pointerLockElement&&document.exitPointerLock()}releaseAll(){this.down.clear(),this.fireHeld=!1,this.aimHeld=!1}endFrame(){this.pressed.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.firePressed=!1}dispose(){this.cleanup.forEach(t=>t()),this.cleanup.length=0}}const c_={health:St.green,ammo:St.cyan,armor:St.blue,boost:St.orange,cash:St.pink},h_={health:"+40 HEALTH",ammo:"+RIFLE AMMO",armor:"+25 ARMOR",boost:"DAMAGE BOOST",cash:"+CASH"};class u_{constructor(){E(this,"group",new oe);E(this,"items",[]);E(this,"geos");const t=Gs(64),e={health:d_(),ammo:new Gt(.3,.42,.18),armor:new sl(.28,0),boost:new al(.32,0),cash:new Re(.22,.22,.06,12).rotateX(Math.PI/2)},n=new ke(1.6,1.6).rotateX(-Math.PI/2);for(let i=0;i<16;i++){const r="cash",a=new oe,o=new Lt(e[r],new ce({color:16777215,toneMapped:!1})),l=new Lt(n,_i(16777215,t,.8));l.position.y=.04,a.add(o,l),a.visible=!1,this.group.add(a),this.items.push({kind:r,group:a,icon:o,ring:l,life:0,active:!1,phase:Math.random()*6})}this.geos=e}spawn(t,e,n){const i=this.items.find(a=>!a.active)??this.items.reduce((a,o)=>a.life<o.life?a:o);i.kind=t,i.icon.geometry=this.geos[t];const r=new mt(c_[t]);i.icon.material.color.copy(r).multiplyScalar(2),i.ring.material.color.copy(r),i.group.position.set(e,0,n),i.life=20,i.active=!0,i.group.visible=!0}update(t,e,n,i,r,a){let o=null;for(const l of this.items){if(!l.active)continue;l.life-=t,l.icon.position.y=.85+Math.sin(e*2.4+l.phase)*.12,l.icon.rotation.y+=t*2.2;const c=l.life<4?Math.sin(e*14)>0?1:.2:1;if(l.ring.material.opacity=.75*c,l.icon.visible=c>.5||l.life>=4,l.life<=0){l.active=!1,l.group.visible=!1;continue}if(r&&!o){const h=l.group.position.x-n,u=l.group.position.z-i;h*h+u*u<a*a&&(o=l.kind,l.active=!1,l.group.visible=!1)}}return o}forEachActive(t){for(const e of this.items)e.active&&t(e.group.position.x,e.group.position.z,e.kind)}clear(){for(const t of this.items)t.active=!1,t.group.visible=!1}}function d_(){const s=new Gt(.42,.13,.13),t=new Gt(.13,.42,.13),e=[...s.toNonIndexed().attributes.position.array,...t.toNonIndexed().attributes.position.array],n=new Me;return n.setAttribute("position",new Jt(e,3)),n.computeVertexNormals(),n}const jh="neon-vice.settings.v1",hl="neon-vice.records.v1";function Jh(s){try{const t=window.localStorage.getItem(s);return t?JSON.parse(t):null}catch{return null}}function ul(s,t){try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}}function dl(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function Sn(s,t,e,n){return typeof s=="number"&&Number.isFinite(s)?Math.min(e,Math.max(t,s)):n}function Cs(s,t){return typeof s=="boolean"?s:t}const Dn={sensitivity:1,invertY:!1,musicVolume:.55,sfxVolume:.8,muted:!1,quality:"medium",reducedShake:!1,highContrast:!1};function f_(){const s=Jh(jh);if(!dl(s))return{...Dn};const t=s.quality;return{sensitivity:Sn(s.sensitivity,.2,3,Dn.sensitivity),invertY:Cs(s.invertY,Dn.invertY),musicVolume:Sn(s.musicVolume,0,1,Dn.musicVolume),sfxVolume:Sn(s.sfxVolume,0,1,Dn.sfxVolume),muted:Cs(s.muted,Dn.muted),quality:t==="low"||t==="medium"||t==="high"?t:Dn.quality,reducedShake:Cs(s.reducedShake,Dn.reducedShake),highContrast:Cs(s.highContrast,Dn.highContrast)}}function p_(s){ul(jh,s)}const Fo={bestScore:0,highestWave:0,totalKills:0,runs:[]},Qh=5;function m_(s){if(!dl(s))return null;const t=typeof s.date=="string"&&!Number.isNaN(Date.parse(s.date))?s.date:null;return t?{score:Math.floor(Sn(s.score,0,1e9,0)),wave:Math.floor(Sn(s.wave,0,999,0)),kills:Math.floor(Sn(s.kills,0,1e6,0)),accuracy:Sn(s.accuracy,0,1,0),completed:Cs(s.completed,!1),date:t}:null}function tu(){const s=Jh(hl);if(!dl(s))return structuredClone(Fo);const t=Array.isArray(s.runs)?s.runs.map(m_).filter(e=>e!==null).slice(0,Qh):[];return{bestScore:Math.floor(Sn(s.bestScore,0,1e9,0)),highestWave:Math.floor(Sn(s.highestWave,0,999,0)),totalKills:Math.floor(Sn(s.totalKills,0,1e9,0)),runs:t}}function g_(s){const t=tu(),e=s.score>t.bestScore;return t.bestScore=Math.max(t.bestScore,s.score),t.highestWave=Math.max(t.highestWave,s.wave),t.totalKills+=s.kills,t.runs=[...t.runs,s].sort((n,i)=>i.score-n.score).slice(0,Qh),ul(hl,t),{records:t,newBest:e}}function v_(){return ul(hl,Fo),structuredClone(Fo)}const qc=["SOLARA GT","NIGHTRUNNER","VELVET VX"],ui=new A,ka=new A,ye=new mt,qe={x:0,z:0},Ha={x:0,z:0};class __{constructor(t){E(this,"renderer");E(this,"scene",new Lh);E(this,"camera",new Je(70,1,.1,1600));E(this,"post");E(this,"world");E(this,"input");E(this,"cam");E(this,"player",new Bv);E(this,"combat",new Ov);E(this,"vehicles",[]);E(this,"traffic");E(this,"spawner");E(this,"bolts");E(this,"fx",new Ev);E(this,"particles",new ov);E(this,"pickups",new u_);E(this,"audio",new av);E(this,"hud",new Hv);E(this,"menus");E(this,"state",new o_);E(this,"settings");E(this,"records");E(this,"vehicle",null);E(this,"aiCtx");E(this,"combatCb");E(this,"targetVel",new A);E(this,"lastTargetPos",new A);E(this,"time",0);E(this,"lastFrame",0);E(this,"raf",0);E(this,"dyingTimer",0);E(this,"resolutionScale",1);E(this,"frameAccum",0);E(this,"frameCount",0);E(this,"workAccum",0);E(this,"slowWindows",0);E(this,"lastWork",0);E(this,"fpsAccum",0);E(this,"fpsFrames",0);E(this,"radarTimer",0);E(this,"steamTimer",0);E(this,"damagePulse",0);E(this,"radarBlips",[]);E(this,"cleanup",[]);E(this,"disposed",!1);E(this,"debugNoLock",!1);this.canvas=t,this.settings=f_(),this.records=tu();const e=br[this.settings.quality];this.renderer=new pg({canvas:t,antialias:e.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=De,this.renderer.toneMapping=Bo,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.type=$c,this.world=new a_(this.scene),this.world.environment.bakeEnvironment(this.renderer),this.input=new l_(t),this.cam=new kv(this.camera,this.world.collision),this.post=new _v(this.renderer,this.scene,this.camera),this.scene.add(this.player.character.root),this.world.layout.drivableCars.forEach((n,i)=>{const r=new Xv(n.x,n.z,n.heading,n.color,n.accent,qc[i%qc.length]);this.vehicles.push(r),this.scene.add(r.model.group)}),this.traffic=new Wv(br.high.trafficCars),this.scene.add(this.traffic.group),this.spawner=new Na(this.world.collision),this.scene.add(this.spawner.group),this.bolts=new Zv(this.world.collision,St.orange),this.scene.add(this.bolts.group,this.fx.group,this.particles.points,this.pickups.group),this.aiCtx={world:this.world.collision,target:this.player.position,targetAlive:!0,targetInVehicle:!1,targetVel:this.targetVel,projectiles:this.bolts,enemies:this.spawner.pool,onMelee:(n,i)=>this.onMelee(n,i),onShoot:n=>this.audio.enemyShoot(n.position.distanceTo(this.player.position))},this.combatCb={onShot:n=>this.onShot(n),onDryFire:()=>this.audio.dryFire(),onReloadStart:n=>this.audio.reload(n),onReloadDone:()=>this.audio.reloadDone(),onSwitch:n=>{this.audio.switchWeapon(),this.player.character.setWeapon(n),this.player.character.setNeon(Us[n].color)}},this.menus=new Vv(this.settings,{onStart:()=>this.startMission(),onResume:()=>this.resume(),onRestart:()=>this.startMission(),onQuit:()=>this.toTitle(),onReplay:()=>this.startMission(),onSettings:n=>this.applySettings(n),onResetRecords:()=>{this.records=v_(),this.menus.setRecords(this.records)},onLock:()=>this.input.requestLock(),onUiSound:n=>n==="click"?this.audio.uiClick():this.audio.uiHover(),onGesture:()=>{this.audio.unlock(),this.audio.startMusic()}}),this.menus.setRecords(this.records),this.applySettings(this.settings),this.bindEvents(),this.resize(),this.toTitle()}start(){this.lastFrame=performance.now();const t=e=>{this.disposed||(this.raf=requestAnimationFrame(t),this.frame(e))};this.raf=requestAnimationFrame(t)}bindEvents(){const t=(e,n,i)=>{e.addEventListener(n,i),this.cleanup.push(()=>e.removeEventListener(n,i))};t(window,"resize",()=>this.resize()),t(document,"visibilitychange",()=>{document.hidden&&this.pause()}),t(window,"blur",()=>this.pause()),t(document,"pointerlockchange",()=>{document.pointerLockElement===this.canvas?this.state.phase==="playing"&&this.menus.show("none"):this.state.phase==="playing"&&!this.debugNoLock&&this.pause()}),t(document,"pointerlockerror",()=>{this.state.phase==="playing"&&!this.debugNoLock&&this.menus.show("lock")}),t(this.canvas,"click",()=>{this.state.phase==="playing"&&!this.input.locked&&this.input.requestLock()}),t(window,"keydown",e=>{const n=e;n.code==="Escape"&&this.state.phase==="playing"&&!this.input.locked?this.pause():n.code==="KeyP"&&this.state.phase==="playing"&&this.pause()}),t(this.canvas,"webglcontextlost",e=>{e.preventDefault(),cancelAnimationFrame(this.raf),document.getElementById("fatalText").textContent="The graphics context was lost. Reload the page to continue.",document.getElementById("fatal").classList.remove("hidden")})}resize(){const t=window.innerWidth,e=window.innerHeight,n=br[this.settings.quality],i=Math.min(window.devicePixelRatio||1,n.maxPixelRatio)*this.resolutionScale;this.renderer.setPixelRatio(i),this.renderer.setSize(t,e,!1),this.post.setSize(t,e,i),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.particles.setViewportHeight(e*i)}applySettings(t){const e=t.quality!==this.settings.quality;this.settings=t,p_(t),this.cam.sensitivity=t.sensitivity,this.cam.invertY=t.invertY,this.cam.reducedShake=t.reducedShake,this.audio.setVolumes(t.musicVolume,t.sfxVolume,t.muted);const n=br[t.quality];this.post.setBloom(n.bloom),this.particles.setLimit(n.maxParticles),this.traffic.setVisibleCount(n.trafficCars),document.body.classList.toggle("no-grain",!n.grain);const i=this.renderer.shadowMap.enabled!==n.shadows;this.renderer.shadowMap.enabled=n.shadows,this.world.environment.setShadows(n.shadows),this.world.setPointLights(t.quality!=="low"),i&&this.scene.traverse(r=>{const a=r.material;Array.isArray(a)?a.forEach(o=>o.needsUpdate=!0):a&&(a.needsUpdate=!0)}),e&&(this.resolutionScale=1),this.resize()}toTitle(){this.state.phase="title",this.input.enabled=!1,this.input.exitLock(),this.resetWorldActors(),this.player.spawn(this.world.layout.playerStart,this.world.layout.playerStartYaw),this.player.character.root.visible=!0,this.cam.mode="orbit",this.hud.show(!1),this.menus.setRecords(this.records),this.menus.show("title"),this.audio.setIntensity(0),this.audio.setEngine(!1,0,0,0)}resetWorldActors(){this.vehicle&&(this.vehicle.occupied=!1),this.vehicle=null;for(const t of this.vehicles)t.reset();this.spawner.reset(),this.bolts.clear(),this.fx.clear(),this.particles.clear(),this.pickups.clear()}startMission(){this.audio.unlock(),this.audio.startMusic(),this.resetWorldActors(),this.state.reset(),this.combat.reset(),this.player.spawn(this.world.layout.playerStart,this.world.layout.playerStartYaw),this.player.character.setWeapon("pistol"),this.player.character.setNeon(Us.pistol.color),this.cam.mode="foot",this.cam.snapTo(this.player.position,this.world.layout.playerStartYaw),this.hud.resetTransient(),this.hud.show(!0),this.hud.setWave(1,un.totalWaves),this.menus.show("none"),this.input.enabled=!0,this.input.releaseAll(),this.input.requestLock(),this.audio.setIntensity(1),this.audio.missionStart(),this.hud.banner("MISSION 01","NIGHTFALL","SURVIVE SIX WAVES"),this.lastTargetPos.copy(this.player.position),!this.input.locked&&!this.debugNoLock&&window.setTimeout(()=>this.checkLock(),400)}checkLock(){this.state.phase==="playing"&&!this.input.locked&&!this.debugNoLock&&this.menus.screen==="none"&&this.menus.show("lock")}pause(){this.state.phase==="playing"&&(this.state.phase="paused",this.input.enabled=!1,this.input.releaseAll(),this.input.exitLock(),this.audio.setEngine(!1,0,0,0),this.menus.show("pause"))}resume(){this.state.phase==="paused"&&(this.state.phase="playing",this.input.enabled=!0,this.menus.show("none"),this.input.requestLock(),this.debugNoLock||window.setTimeout(()=>this.checkLock(),400))}endMission(t){this.state.phase="ended",this.input.enabled=!1,this.input.exitLock(),this.audio.setEngine(!1,0,0,0),this.audio.setIntensity(0);const e=t?un.totalWaves:Math.max(0,this.spawner.wave-1),{records:n,newBest:i}=g_({score:this.state.score,wave:t?un.totalWaves:this.spawner.wave,kills:this.state.kills,accuracy:this.combat.accuracy,completed:t,date:new Date().toISOString()});this.records=n,this.hud.show(!1),this.menus.showEnd({won:t,score:this.state.score,kills:this.state.kills,waves:e,accuracy:this.combat.accuracy,headshots:this.state.headshots,bestCombo:this.state.bestCombo,time:this.state.elapsed,newBest:i})}frame(t){let e=(t-this.lastFrame)/1e3;if(this.lastFrame=t,!(e>0))return;e=Math.min(e,Pv),this.trackPerformance(e,this.lastWork);const n=this.state.phase,i=n==="playing"&&(this.input.locked||this.debugNoLock),r=n==="ended"&&this.dyingTimer>0?.35:1,a=e*r;if(i&&this.cam.rotate(this.input.mouseDX,this.input.mouseDY,this.input.wheel),i||n==="title"||n==="ended"){this.time+=a;const o=Math.max(1,Math.ceil(a/Rv)),l=a/o;for(let c=0;c<o;c++)this.simulate(l,i,c===0);this.frameVisuals(a,i)}Hs.value=this.time,this.input.endFrame(),this.world.environment.follow(this.camera,this.cam.mode==="orbit"?25:this.player.position.x,this.cam.mode==="orbit"?10:this.player.position.z),this.post.render(this.time,this.damagePulse),this.lastWork=performance.now()-t}simulate(t,e,n){const i=this.state,r=[this.player.position];for(const l of this.vehicles)r.push(l.position);for(const l of this.spawner.pool)l.alive&&r.push(l.position);if(this.traffic.update(t,r),this.traffic.takeHonk(Ha)&&i.phase==="playing"&&Math.hypot(Ha.x-this.player.position.x,Ha.z-this.player.position.z)<30&&this.audio.honk(),!e){i.phase==="ended"&&this.simulateCombatants(t,!1);return}i.update(t),this.combat.damageMultiplier=i.boostTimer>0?2:1,n&&this.input.wasPressed("KeyE")&&this.toggleVehicle();const a=this.input.aimHeld&&!this.vehicle&&this.player.alive;if(this.vehicle){const l=this.vehicle,c={throttle:this.input.axis("KeyS","KeyW","ArrowDown","ArrowUp"),steer:this.input.axis("KeyD","KeyA","ArrowRight","ArrowLeft"),handbrake:this.input.isDown("Space")},h=l.update(t,c,this.world.collision);h&&this.onCarImpact(h.speed,h.x,h.z,h.nx,h.nz),this.player.position.set(l.position.x,0,l.position.z)}else{const l=this.player.update(t,this.input,this.cam.yaw,this.cam.pitch,a,this.world.collision);l.footstep&&this.audio.footstep(Math.hypot(this.player.velocity.x,this.player.velocity.z)>ue.walkSpeed+.5),l.jumped&&this.audio.jump(),l.landed&&this.audio.land(),this.combat.update(t,this.input,n,this.camera,this.player,this.world.collision,this.spawner.pool,a,this.combatCb)}for(const l of this.vehicles)l!==this.vehicle&&l.update(t,null,this.world.collision);this.resolveDynamicCollisions(),this.targetVel.subVectors(this.player.position,this.lastTargetPos).divideScalar(t),this.lastTargetPos.copy(this.player.position),this.simulateCombatants(t,!0),this.updateWaves(t);const o=this.pickups.update(t,this.time,this.player.position.x,this.player.position.z,this.player.alive,this.vehicle?2.6:1.4);o&&this.onPickup(o),!this.player.alive&&i.phase==="playing"&&(i.phase="ended",this.dyingTimer=2.8,this.audio.gameOver(),this.hud.banner("SIGNAL LOST","FLATLINED",`${i.score.toLocaleString("en-US")} PTS`))}simulateCombatants(t,e){this.aiCtx.targetAlive=this.player.alive&&e,this.aiCtx.targetInVehicle=this.vehicle!==null,e&&this.spawner.update(t,this.player.position,{onTelegraph:(i,r,a)=>{ye.set(Na.telegraphColor(a)),this.fx.spawnBeam(i,r,ye),this.fx.ring(i,.05,r,ye,4,.9),this.player.position.distanceTo(ui.set(i,0,r))<45&&this.audio.spawnWhoosh()},onSpawn:i=>{ye.set(Na.telegraphColor(i.def.kind)),this.particles.burst(i.position.x,1,i.position.z,18,6,ye,.14,.6,2,.6)}});for(const i of this.spawner.pool)i.active&&Uv(i,t,this.aiCtx);const n=this.boltTarget();this.bolts.update(t,n,{onHitTarget:(i,r,a)=>this.damagePlayer(i,r,a),onHitWorld:(i,r,a,o,l,c)=>this.particles.sparks(i,r,a,o,l,c,6,ye.set(St.orange))})}boltTarget(){if(!this.player.alive||this.state.phase!=="playing")return null;const t=this.player.position;return this.vehicle?{x:t.x,y0:0,y1:1.6,z:t.z,radius:1.3}:{x:t.x,y0:t.y,y1:t.y+ue.height,z:t.z,radius:ue.radius+.08}}updateWaves(t){const e=this.state,n=this.spawner;if(e.wavePhase==="intro"||e.wavePhase==="intermission"){e.waveTimer-=t;const i=n.wave+1;if(e.wavePhase==="intro"?this.hud.setObjective("Hostiles are moving in. Hold the plaza."):this.hud.setObjective(`Next wave in ${Math.ceil(Math.max(0,e.waveTimer))} — grab drops or find a ride`),e.waveTimer<=0){n.startWave(i),e.wavePhase="active",this.hud.setWave(i,un.totalWaves);const r=i===un.totalWaves;this.hud.banner(r?"FINAL WAVE":`WAVE ${i} / ${un.totalWaves}`,r?"LAST STAND":"HOSTILES INBOUND",`${n.spec.total} TARGETS`),this.audio.missionStart()}}else if(this.hud.setObjective(n.wave===un.totalWaves?"Final wave — eliminate every hostile":"Eliminate the hostiles"),n.waveCleared){e.wavesCleared=n.wave;const i=250*n.wave+Math.round(this.player.health)*2;e.addScore(i),this.player.heal(25),this.audio.waveClear(),n.isFinalWave?(e.won=!0,e.addScore(2500),this.audio.missionComplete(),this.hud.banner("MISSION COMPLETE","CITY SECURED",`+${i+2500} BONUS`),e.phase="ended",this.dyingTimer=3):(e.wavePhase="intermission",e.waveTimer=7,this.hud.banner(`WAVE ${n.wave} CLEARED`,"STREETS QUIET",`+${i} BONUS · +25 HP`))}}nearestVehicle(){let t=null,e=2.8;for(const n of this.vehicles)for(let i=0;i<n.hullCount;i++){n.hullPoint(i,qe);const r=Math.hypot(qe.x-this.player.position.x,qe.z-this.player.position.z)-n.hullRadius;r<e&&(e=r,t=n)}return t}toggleVehicle(){if(!this.player.alive)return;if(this.vehicle){const e=this.vehicle;if(Math.abs(e.forwardSpeed)>9)return;const n=e.heading,i=Math.cos(n),r=-Math.sin(n),a=Math.sin(n),o=Math.cos(n),l=[[i*2,r*2],[-i*2,-r*2],[-a*3.4,-o*3.4],[a*3.4,o*3.4]];for(const[c,h]of l)if(ui.set(e.position.x+c,0,e.position.z+h),ka.copy(ui),this.world.collision.resolveCircle(ka,ue.radius,ue.stepHeight,ue.height,{hit:!1,nx:0,nz:0}),ka.distanceTo(ui)<.05){e.occupied=!1,this.vehicle=null,this.player.inVehicle=!1,this.player.position.copy(ui),this.player.velocity.set(0,0,0),this.player.facing=n,this.player.character.root.visible=!0,this.player.sync(),this.cam.mode="foot",this.audio.carDoor(),this.audio.setEngine(!1,0,0,0);return}return}const t=this.nearestVehicle();t&&(this.vehicle=t,t.occupied=!0,this.player.inVehicle=!0,this.player.character.root.visible=!1,this.combat.weapon.cancelReload(),this.cam.mode="vehicle",this.audio.carDoor())}onCarImpact(t,e,n,i,r){this.particles.sparks(e-i*1,.6,n-r*1,i,.2,r,Math.min(24,Math.round(t*1.5)),ye.set(St.yellow)),this.audio.crash(t),this.cam.addTrauma(Math.min(.6,t*.03))}resolveDynamicCollisions(){const t=this.vehicle;if(t){this.traffic.forEachHull((i,r,a,o)=>{for(let l=0;l<t.hullCount;l++){t.hullPoint(l,qe);const c=qe.x-i,h=qe.z-r,u=Math.hypot(c,h),d=a+t.hullRadius;if(u<d&&u>1e-4){const f=c/u,g=h/u;t.position.x+=f*(d-u),t.position.z+=g*(d-u);const v=t.bounce(f,g,qe.x,qe.z);v&&(this.onCarImpact(v.speed,v.x,v.z,f,g),this.traffic.knock(o))}}});const n=Math.abs(t.forwardSpeed);for(const i of this.spawner.pool)if(i.alive)for(let r=0;r<t.hullCount;r++){t.hullPoint(r,qe);const a=i.position.x-qe.x,o=i.position.z-qe.z,l=Math.hypot(a,o),c=t.hullRadius+i.def.radius;if(!(l>=c)){n>6?(i.velocity.set(t.velocity.x*.6+a/(l||1)*4,0,t.velocity.y*.6+o/(l||1)*4),i.kill(),this.onEnemyKilled(i,!1,!0),t.velocity.multiplyScalar(.93)):l>1e-4&&(i.position.x+=a/l*(c-l),i.position.z+=o/l*(c-l));break}}}const e=(n,i)=>{for(const r of this.vehicles)if(r!==t)for(let a=0;a<r.hullCount;a++){r.hullPoint(a,qe);const o=n.x-qe.x,l=n.z-qe.z,c=Math.hypot(o,l),h=i+r.hullRadius;c<h&&c>1e-4&&n.y<1.3&&(n.x+=o/c*(h-c),n.z+=l/c*(h-c))}};t||(e(this.player.position,ue.radius),this.traffic.forEachHull((n,i,r)=>{const a=this.player.position.x-n,o=this.player.position.z-i,l=Math.hypot(a,o),c=r+ue.radius;l<c&&l>1e-4&&(this.player.position.x+=a/l*(c-l),this.player.position.z+=o/l*(c-l))}));for(const n of this.spawner.pool)n.alive&&e(n.position,n.def.radius)}onShot(t){const e=Us[t.weapon];if(ye.set(e.color),ui.subVectors(t.to,t.from).normalize(),this.fx.muzzleFlash(t.from,ui,ye,t.weapon==="rifle"?.42:.34),this.fx.tracer(t.from,t.to,ye,e.tracerWidth,e.tracerSpeed),this.audio.shoot(t.weapon),this.cam.addTrauma(e.shake),this.cam.pitch-=e.recoil*(.6+Math.random()*.4),t.hitWorld&&this.particles.sparks(t.to.x,t.to.y,t.to.z,t.normal.x,t.normal.y,t.normal.z,t.weapon==="rifle"?5:8,ye),t.target instanceof Kh){const n=t.target,i=n.resolveDamage();this.particles.burst(t.to.x,t.to.y,t.to.z,t.head?10:6,4,ye.set(n.def.look.neon),.09,.35,8),this.hud.damageNumber(t.to,t.damage,t.head),this.audio.hitMarker(t.head),this.hud.hitMarker(i?"kill":t.head?"head":"hit"),i&&this.onEnemyKilled(n,t.head,!1)}}onEnemyKilled(t,e,n){const i=this.state.registerKill(t.def.score+(n?75:0),e);this.spawner.registerKill(),this.hud.feed(i,t.def.label,n?"ROADKILL":e?"HEADSHOT":this.state.multiplier>1?`x${this.state.multiplier}`:""),this.state.multiplier>1&&this.audio.combo(this.state.multiplier),this.audio.enemyDie(),ye.set(t.def.look.neon),this.particles.burst(t.position.x,1.1,t.position.z,30,7,ye,.16,.8,9,.5),this.fx.ring(t.position.x,.06,t.position.z,ye,3.5,.5);const r=Math.random();let a=null;this.player.health<45&&r<.45||r<.14?a="health":r<.32?a="ammo":r<.42?a="armor":r<.47?a="boost":r<.75&&(a="cash"),a&&this.pickups.spawn(a,t.position.x,t.position.z)}onMelee(t,e){this.audio.melee(),this.damagePlayer(this.vehicle?e*.5:e,t.position.x,t.position.z)}damagePlayer(t,e,n){if(!this.player.alive||this.state.phase!=="playing")return;const i=this.player.damage(this.vehicle?t*.6:t),r=e-this.player.position.x,a=n-this.player.position.z,o=this.cam.yaw,l=r*-Math.sin(o)+a*-Math.cos(o),c=r*Math.cos(o)+a*-Math.sin(o);this.hud.damage(i/40,Math.atan2(c,l)),this.damagePulse=Math.min(1,this.damagePulse+i/30),this.cam.addTrauma(.25),this.audio.playerHurt()}onPickup(t){switch(t){case"health":this.player.heal(40);break;case"armor":this.player.addArmor(25);break;case"ammo":this.combat.weapons.rifle.addAmmo(64);break;case"boost":this.state.boostTimer=10;break;case"cash":this.state.addScore(75*this.state.multiplier);break}this.audio.pickup(t),this.hud.feed(t==="cash"?75*this.state.multiplier:0,h_[t]),ye.set(t==="health"?St.green:t==="ammo"?St.cyan:t==="armor"?St.blue:t==="boost"?St.orange:St.pink),this.fx.ring(this.player.position.x,.06,this.player.position.z,ye,2.5,.4)}frameVisuals(t,e){const n=this.state;n.phase==="ended"&&(this.cam.yaw+=t*.35,this.dyingTimer>0&&(this.dyingTimer-=t/.35,this.dyingTimer<=0&&this.endMission(n.won))),this.damagePulse=Math.max(0,this.damagePulse-t*2),this.vehicle?this.cam.update(t,this.vehicle.position,!1,Math.abs(this.vehicle.forwardSpeed),this.vehicle.heading):this.cam.update(t,this.player.position,e&&this.input.aimHeld&&this.player.alive,Math.hypot(this.player.velocity.x,this.player.velocity.z),0),!this.vehicle&&!e&&this.player.character.update(t,{speed:0,grounded:!0,aim:0,aimPitch:0,kick:0,swing:0});for(const i of this.spawner.pool)i.active&&i.updateVisual(t,this.camera.position);if(this.world.update(this.time),this.fx.update(t),this.particles.update(t),this.steamTimer-=t,this.steamTimer<=0){this.steamTimer=.12,ye.setRGB(.35,.28,.5);for(const i of this.world.layout.steamVents)Math.abs(i.x-this.camera.position.x)>60||Math.abs(i.z-this.camera.position.z)>60||this.particles.emit(i.x+(Math.random()-.5)*.4,.1,i.z+(Math.random()-.5)*.4,(Math.random()-.5)*.3,1.2+Math.random(),(Math.random()-.5)*.3,ye,.5,2.2,-.2,.5,2.5)}if(this.vehicle&&e){const i=this.vehicle,r=Math.abs(i.lateralSpeed);if(this.audio.setEngine(!0,i.forwardSpeed,this.input.axis("KeyS","KeyW","ArrowDown","ArrowUp"),r),r>3.5&&Math.random()<.6){ye.setRGB(.5,.45,.6);for(const a of[-1.45]){const o=i.position.x+Math.sin(i.heading)*a,l=i.position.z+Math.cos(i.heading)*a;this.particles.emit(o,.25,l,Math.random()-.5,.6,Math.random()-.5,ye,.7,1.2,-.3,1,3)}}}(n.phase==="playing"||n.phase==="ended")&&this.updateHud(t,e)}updateHud(t,e){const n=this.state,i=this.combat.weapon;this.hud.setScore(n.score,Math.max(this.records.bestScore,n.score)),this.hud.setCombo(n.multiplier,Math.max(0,n.comboTimer/un.comboWindow)),this.hud.setHealth(this.player.health,ue.maxHealth),this.hud.setArmor(this.player.armor,ue.maxArmor),this.hud.setBoost(n.boostTimer),this.hud.setWeapon(i,this.vehicle!==null),this.hud.setEnemies(n.wavePhase==="active"?this.spawner.remaining:0),this.hud.setSpeed(this.vehicle?this.vehicle.speedKmh:null,this.vehicle?.name);const r=(this.input.aimHeld?i.def.aimSpread:i.def.spread)+i.bloom,a=Math.tan(r)/Math.tan(ge.degToRad(this.camera.fov/2))*(window.innerHeight/2);this.hud.setCrosshair(!this.vehicle&&this.player.alive&&e,6+a);let o=null;if(this.player.alive&&e)if(this.vehicle)o=Math.abs(this.vehicle.forwardSpeed)>9?null:"<kbd>E</kbd> EXIT VEHICLE";else{const l=this.nearestVehicle();l?o=`<kbd>E</kbd> DRIVE ${l.name}`:i.mag===0&&!i.reloading&&i.reserve>0?o="<kbd>R</kbd> RELOAD":i.empty&&(o=`${i.def.name} DRY — <kbd>1</kbd> SWITCH TO PISTOL`)}if(this.hud.prompt(o),this.hud.update(t,this.camera,window.innerWidth,window.innerHeight),this.radarTimer-=t,this.radarTimer<=0){this.radarTimer=1/20;const l=this.radarBlips;l.length=0;for(const c of this.spawner.pool)c.alive&&l.push({x:c.position.x,z:c.position.z,color:c.def.kind==="gunner"?"#2ef2ff":"#ff8a3d",size:3.2});for(const c of this.vehicles)c!==this.vehicle&&l.push({x:c.position.x,z:c.position.z,color:"#ff4f9a",size:3});this.pickups.forEachActive((c,h)=>l.push({x:c,z:h,color:"#4dff9a",size:2.2})),this.hud.drawRadar(this.player.position.x,this.player.position.z,this.cam.yaw,l)}}trackPerformance(t,e){if(this.fpsAccum+=t,this.fpsFrames++,this.fpsAccum>=.5&&(this.hud.setFps(`${Math.round(this.fpsFrames/this.fpsAccum)} FPS`),this.fpsAccum=0,this.fpsFrames=0),this.frameAccum+=t,this.workAccum+=e,this.frameCount++,this.frameAccum>=1.5){const n=this.frameAccum/this.frameCount,i=this.resolutionScale,r=n>1/40&&n<.125&&document.visibilityState==="visible";this.slowWindows=r?this.slowWindows+1:0,this.slowWindows>=2?(this.resolutionScale=Math.max(.6,this.resolutionScale*.88),this.slowWindows=0):n<1/57&&this.resolutionScale<1&&(this.resolutionScale=Math.min(1,this.resolutionScale*1.06)),i!==this.resolutionScale&&this.resize(),this.frameAccum=0,this.workAccum=0,this.frameCount=0}}get debug(){return{state:this.state,player:this.player,combat:this.combat,spawner:this.spawner,vehicles:this.vehicles,cam:this.cam,input:this.input,world:this.world,renderer:this.renderer,enterNearestVehicle:()=>this.toggleVehicle(),currentVehicle:()=>this.vehicle,startMission:()=>this.startMission(),pause:()=>this.pause(),resume:()=>this.resume(),render:()=>this.post.render(this.time,this.damagePulse),advance:(t,e=60)=>{let n=this.lastFrame;for(let i=0,r=Math.round(t*e);i<r;i++)n+=1e3/e,this.frame(n)}}}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.cleanup.forEach(t=>t()),this.input.dispose(),this.audio.dispose(),this.particles.dispose(),this.post.dispose(),this.world.environment.dispose();for(const t of this.spawner.pool)t.dispose();this.scene.traverse(t=>{const e=t;e.geometry?.dispose();const n=e.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n?.dispose()}),this.renderer.dispose()}}function x_(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Yc(s){document.getElementById("loading")?.classList.add("hidden"),document.getElementById("title")?.classList.add("hidden");const t=document.getElementById("fatal");document.getElementById("fatalText").textContent=s,t.classList.remove("hidden")}function M_(){if(!x_()){Yc("Your browser could not start WebGL 2, which NEON VICE needs to render the city.");return}const s=document.getElementById("scene");let t;try{t=new __(s)}catch(e){console.error(e),Yc("The game failed to start on this device. Details are in the browser console.");return}t.start(),setTimeout(()=>document.getElementById("loading")?.classList.add("hidden"),120),window.addEventListener("pagehide",()=>t.dispose(),{once:!0})}setTimeout(M_,30);
