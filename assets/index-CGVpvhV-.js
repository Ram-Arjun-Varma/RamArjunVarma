/* empty css                     */import{G as C,W as P,S as E,P as O,a as M,O as W,V as b,b as B,A as F,c as I,D as T,d as q,e as D,f as L,R as H,C as N}from"./three-BacQ9OuD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();window.onload=()=>R();function R(){new C().load("./arjun.glb",t=>{G(t),document.getElementById("avatar-loading").style.display="none"},t=>{const o=Math.round(t.loaded/t.total*100),i=document.getElementById("avatar-loading");i.classList="text-4xl text-white bg-blue-950",i.innerText=`LOADING... ${o}%`,console.log(`Loading model... ${o}%`)},t=>{console.log(t)})}function G(a){const t=new P({antialias:!0,alpha:!0});t.outputColorSpace=E;const o=document.getElementById("avatar-container");t.setSize(o.clientWidth,o.clientHeight),t.setPixelRatio(window.devicePixelRatio),t.shadowMap.enabled=!0,t.shadowMap.type=O,o.appendChild(t.domElement);const i=new M(45,o.clientWidth/o.clientHeight);i.position.set(.2,.5,1);const e=new W(i,t.domElement);e.enableDamping=!0,e.enablePan=!1,e.enableZoom=!1,e.minDistance=3,e.minPolarAngle=1.4,e.maxPolarAngle=1.4,e.target=new b(0,.75,0),e.update();const n=new B;n.add(new F);const s=new I(16777215,20,8,1);s.penumbra=1,s.position.set(0,4,2),s.castShadow=!0,n.add(s);const f=new T(16777215,1);f.position.set(0,6,8),f.lookAt(new b),n.add(f);const u=new q(16777215,1,8,1);u.position.set(2,4,2),u.castShadow=!0,n.add(u);const l=a.scene;l.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0)}),n.add(l);const p=new D(l),g=a.animations,v=L.findByName(g,"idle"),S=L.findByName(g,"waving"),c=p.clipAction(v),d=p.clipAction(S);let m=!1;const h=new H;o.addEventListener("pointermove",r=>{const x={x:r.offsetX/o.clientWidth*2-1,y:-(r.offsetY/o.clientHeight)*2+1};if(h.setFromCamera(x,i),h.intersectObject(l).length>0){if(m)return;y()}}),window.addEventListener("resize",()=>{i.aspect=o.clientWidth/o.clientHeight,i.updateProjectionMatrix(),t.setSize(o.clientWidth,o.clientHeight)});const A=new N;function w(){requestAnimationFrame(w),p.update(A.getDelta()),t.render(n,i)}function y(){m=!0,d.reset(),d.play(),c.crossFadeTo(d,.3),setTimeout(()=>{c.reset(),c.play(),d.crossFadeTo(c,1),setTimeout(()=>m=!1,1e3)},4e3)}w(),c.play(),y()}document.querySelector(".chatbot-toggle").addEventListener("click",function(){const a=document.querySelector(".chatbot-container");a.style.display=a.style.display==="flex"?"none":"flex"});document.querySelectorAll(".predefined-question").forEach(function(a){a.addEventListener("click",function(){const t=this.getAttribute("data-answer");document.getElementById("chatbot-answer").innerText=t})});
