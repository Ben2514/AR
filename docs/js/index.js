(()=>{"use strict";window.cameraOK=!1,window.studentName="",window.studentID="",window.currentQ=0,window.record=function(){let e=[];for(let t=0;t<numQ;t++)e.push([]);return e}(),function(){let e=new bootstrap.Modal(document.querySelector("#starter")),t=document.querySelector("#starter-form");t.addEventListener("submit",(function(n){t.classList.add("was-validated"),n.preventDefault(),n.stopPropagation(),t.checkValidity()&&(window.studentName=document.querySelector("#studentName").value,window.studentID=document.querySelector("#studentID").value,e.hide(),cameraOK&&(document.querySelector(".arjs-loader").style.display="none"))}),!1),e.show()}(),window.addEventListener("camera-init",(()=>{document.querySelector("#toggle").style.display="",document.querySelector("#commit").style.display="",cameraOK=!0,0!==studentName.length&&0!==studentID.length&&(document.querySelector(".arjs-loader").style.display="none")})),document.querySelectorAll("a-marker").forEach((e=>{e.addEventListener("markerFound",(e=>{!function(e){currentQ&&document.querySelector(`#exam${currentQ}`).classList.remove("active");let t=document.querySelector(`#exam${e}`);t.classList.add("active"),"題目"!==document.querySelector("#toggle").innerHTML?t.style.display="none":t.style.display="",currentQ=e}(parseInt(e.target.id.slice(6)))}))})),function(){function e(e,t){let n=[...e.parentElement.children].indexOf(e)+1;if(t)record[currentQ-1].push(n),record[currentQ-1].sort();else{let e=record[currentQ-1].indexOf(n);record[currentQ-1].splice(e,1)}let r=record.reduce(((e,t)=>e&&t.length),record[0].length),o=document.querySelector("#commit");o.disabled=!r,o.innerHTML=r?"提交":"未完成",o.className=r?"btn btn-success":"btn btn-light"}document.querySelectorAll("input[type=checkbox][name=options]").forEach((t=>{let n=t.nextElementSibling,r=[...t.parentElement.parentElement.children].indexOf(t.parentElement)+1;n.innerHTML+=`&nbsp;(${String.fromCharCode(65+r-1)})`,t.addEventListener("change",(t=>{let n=t.target,r=n.parentElement;n.checked?(r.classList.add("btn-primary"),r.classList.remove("btn-secondary"),n.nextElementSibling.className="far fa-check-square",e(r,!0)):(r.classList.remove("btn-primary"),r.classList.add("btn-secondary"),n.nextElementSibling.className="far fa-square",e(r,!1))}))}))}(),document.querySelector("#toggle").addEventListener("click",(function(e){let t=document.querySelector("a-scene"),n=document.querySelector(".exam.active");"題目"===e.target.innerHTML?(e.target.innerHTML="圖片",t.object3D.visible=!0,t.style.zIndex=0,n&&(n.style.display="none")):(e.target.innerHTML="題目",t.object3D.visible=!1,t.style.zIndex=-1,n&&(n.style.display=""))})),function(){let e={},t=document.querySelector("#commit");function n(t){let n=document.querySelector(`#exam${t+1} > input[name=answer]`).value.split(",").map((e=>parseInt(e))),r=record[t];e.ans.push({correct:n,answer:r});let o=`<td>\n      ${c=r,a=n,Array.isArray(c)&&Array.isArray(a)&&c.length===a.length&&c.every(((e,t)=>e===a[t]))?'<i class="fas fa-check" style="width: 1.5rem; color: green"></i>':'<i class="fas fa-times" style="width: 1.5rem; color: red"></i>'} ${t+1}\n      </td>`;var c,a;let l=function(){let e=Array.from(new Set([...r,...n])).sort(),t="";return e.forEach(((o,c)=>{r.includes(o)&&n.includes(o)?t+=`<span style="color: green;">${String.fromCharCode(65+o-1)}</span>`:r.includes(o)?t+=`<span style="color: red; text-decoration:line-through;">${String.fromCharCode(65+o-1)}</span>`:t+=`<span style="color: red;">${String.fromCharCode(65+o-1)}</span>`,c<e.length-1&&(t+="、")})),`<td style="font-weight: bolder;">${t}</td>`}();return o+l}t.addEventListener("click",(function(){if(t.disabled)return;let r=new bootstrap.Modal(document.querySelector("#finisher")),o=document.querySelector("#result");document.querySelector("#finisher_name").innerHTML=studentName,document.querySelector("#finisher_id").innerHTML=studentID,e.name=studentName,e.id=studentID,e.ans=[];for(let e=0;e<numQ;e++)o.innerHTML+=n(e);r.show()}))}()})();