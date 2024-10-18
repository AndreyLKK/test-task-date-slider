(function(){"use strict";var e={4050:function(e,l,t){var a=t(5130),u=t(6768),n=t(144),r=t(4232);const s=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];function i(e,l,t){const a={},u=c([...t]);for(let n=e;n<=l;n++)a[n]=[...u];return a}function o(e,l){const t=Number(Object.keys(e)[0]),a=Math.max(l.getFullYear(),t);return{[a]:e[a],[a+1]:e[a],[a+2]:[]}}function v(e,l){if(!e)return l;if(console.log(Object.keys(l).length),Object.keys(l).length>15&&Object.keys(l).length<45){const e=Object.keys(l).map(Number),t=e.filter(((e,l)=>l%2===0));return t.reduce(((e,t)=>(e[t]=l[t],e)),{})}if(Object.keys(l).length>45&&Object.keys(l).length<60){const e=Object.keys(l).map(Number),t=e.filter(((e,l)=>l%3===0));return t.reduce(((e,t)=>(e[t]=l[t],e)),{})}if(Object.keys(l).length>60){const e=Object.keys(l).map(Number),t=e.filter(((e,l)=>l%4===0));return t.reduce(((e,t)=>(e[t]=l[t],e)),{})}return l}function c(e){return e?e.map((e=>e.charAt(0).toLowerCase()+e.substr(1,2))).slice(1):[]}function d(e){return e>1118?[...s]:e<=560?s.filter(((e,l)=>l%4===1)):e<=830?s.filter(((e,l)=>(l+1)%3===1)):s.filter(((e,l)=>l%2!==1))}function _(e){const l=Object.keys(e).length-1,t=12,a=t*l+.01;return(a>1?100/a:1).toFixed(13)}const p={class:"slider"},f={class:"slider__text-date"},m={class:"slider__inner"},k={class:"slider__control"},g={class:"slider__tooltip-text"},h={class:"slider__tooltip-text"},b={class:"slider__tooltip-text"},y={class:"slider__tooltip-text"},x={class:"slider__year-text"},w={class:"slider__month-item"},L={class:"slider__month-text"};var E=(0,u.pM)({__name:"MySlider",props:{minDate:{},maxDate:{},minYearWithDate:{},maxYearWithDate:{}},setup(e){const l=e,t=(0,u.EW)((()=>l.minDate)),a=(0,u.EW)((()=>l.maxDate)),c=(0,u.EW)((()=>l.minYearWithDate)),E=(0,u.EW)((()=>l.maxYearWithDate)),R=(0,n.KR)(null),K=(0,n.KR)(null),C=(0,n.KR)(null),M=(0,n.KR)(window.innerWidth),W=(0,n.KR)(i(t.value.getFullYear(),a.value.getFullYear(),s)),O=(0,n.KR)(o(W.value,c.value)),D=(0,n.KR)(v(R.value,W.value)),X=(0,n.KR)({}),j=(0,n.KR)(!0);let F=!1,Y=null;const T=()=>{M.value=window.innerWidth};(0,u.sV)((()=>{P(),window.addEventListener("resize",T),v(R.value,W.value)})),(0,u.hi)((()=>{window.removeEventListener("resize",T)})),(0,u.wB)((()=>t.value),(()=>{W.value=i(t.value.getFullYear(),a.value.getFullYear(),s),D.value=v(R.value,W.value)})),(0,u.wB)((()=>a.value),(()=>{(0,u.dY)((()=>{D.value=v(R.value,W.value)}))}),{immediate:!0}),(0,u.wB)((()=>c.value),(()=>{O.value=o(W.value,c.value),U.value=I()})),(0,u.wB)((()=>E.value),(()=>{$.value=V()}));const B=e=>{Y=e,document.addEventListener("mousemove",N),document.addEventListener("mouseup",Q)};function N(e){if(K.value&&R.value){const l=R.value.getBoundingClientRect();if("left"===Y){const t=e.clientX-l.left,a=t/l.width*100;U.value=Math.min(Math.max(a,0),$.value)}if("right"===Y){const t=l.width-(l.right-e.clientX),a=t/l.width*100;$.value=Math.max(Math.min(a,100),U.value)}}}const Q=()=>{document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",Q)},I=()=>c.value.getMonth()/24*100,V=()=>(E.value.getMonth()+12)/24*100,U=(0,n.KR)(I()),$=(0,n.KR)(V()),z=()=>{j.value=!j.value},A=e=>{W.value=i(t.value.getFullYear(),a.value.getFullYear(),e),O.value=o(W.value,c.value)},J=()=>{if(!R.value)return;const e=window.innerWidth-R.value.getBoundingClientRect().right;if(e<10){const e=Object.keys(D.value),l=e.filter(((e,l)=>l%3===0)).map(Number);X.value={...D.value},F=!0,D.value=l.reduce(((e,l)=>(e[l]=W.value[l],e)),{})}e>85&&F&&(D.value=X.value,F=!1)},P=()=>{const e=d(M.value);A(e),J()};(0,u.wB)(M,P),window.addEventListener("resize",T);const S=(0,u.EW)((()=>_(W.value))),Z=(0,u.EW)((()=>_(O.value))),q=(e,l)=>{const t=Math.round(e/Number(l)),a=t%12;return s[a]},G=(e,l,t)=>{const a=Math.round(e/Number(l)),u=12,n=Object.keys(t),r=Math.floor(a/u);return n[Math.min(r,n.length-1)]},H=(0,u.EW)((()=>({left:`${U.value}%`,width:$.value-U.value+"%"}))),ee=(0,u.EW)((()=>({left:`${U.value}%`}))),le=(0,u.EW)((()=>({right:100-$.value+"%"}))),te=e=>({opacity:e?"1":"0.6",borderBottom:e?"none":"1px solid rgba(120, 169, 205, 0.5)"});return(e,l)=>((0,u.uX)(),(0,u.CE)("div",p,[(0,u.Lk)("div",f,[(0,u.Lk)("button",{class:"slider__text",onClick:z,style:(0,r.Tr)(te(j.value))}," Все года ",4),(0,u.Lk)("button",{class:"slider__text",onClick:z,style:(0,r.Tr)(te(!j.value))}," Месяц ",4)]),(0,u.Lk)("div",m,[(0,u.Lk)("div",k,[l[4]||(l[4]=(0,u.Lk)("div",{class:"slider__bg-line"},null,-1)),(0,u.Lk)("span",{style:(0,r.Tr)(H.value),class:"slider__progress"},null,4),(0,u.Lk)("div",{style:(0,r.Tr)(ee.value),class:"slider__tooltip slider__tooltip--left"},[(0,u.Lk)("p",g,(0,r.v_)(j.value?q(U.value,S.value):q(U.value,Z.value)),1),(0,u.Lk)("p",h,(0,r.v_)(j.value?G(U.value,S.value,W.value):G(U.value,Z.value,O.value)),1),l[2]||(l[2]=(0,u.Lk)("span",{class:"slider__tooltip-triangle slider__tooltip-triangle--left"},null,-1))],4),(0,u.Lk)("div",{style:(0,r.Tr)(le.value),class:"slider__tooltip slider__tooltip--right"},[(0,u.Lk)("p",b,(0,r.v_)(j.value?q($.value,S.value):q($.value,Z.value)),1),(0,u.Lk)("p",y,(0,r.v_)(j.value?G($.value,S.value,W.value):G($.value,Z.value,O.value)),1),l[3]||(l[3]=(0,u.Lk)("span",{class:"slider__tooltip-triangle slider__tooltip-triangle--right"},null,-1))],4),(0,u.Lk)("div",{onMousedown:l[0]||(l[0]=e=>B("left")),ref_key:"outerCircleFrom",ref:K,style:(0,r.Tr)({left:`${U.value}%`}),class:"slider__circle-outside slider__circle-outside--left"},null,36),(0,u.Lk)("div",{onMousedown:l[1]||(l[1]=e=>B("right")),ref_key:"outerCircleTo",ref:C,style:(0,r.Tr)({left:`${$.value}%`}),class:"slider__circle-outside slider__circle-outside--right"},null,36)]),j.value?((0,u.uX)(),(0,u.CE)("ul",{key:0,class:"slider__list",ref_key:"containerWidth",ref:R},[((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(D.value,((e,l)=>((0,u.uX)(),(0,u.CE)("li",{class:"slider__item",key:l},[(0,u.Lk)("p",x,(0,r.v_)(l),1)])))),128))],512)):(0,u.Q3)("",!0),j.value?(0,u.Q3)("",!0):((0,u.uX)(),(0,u.CE)("ul",{key:1,class:"slider__list",ref_key:"containerWidth",ref:R},[((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(O.value,((e,l)=>((0,u.uX)(),(0,u.CE)("li",{class:"slider__item",key:l},[(0,u.Lk)("p",{class:(0,r.C4)(["slider__year-text",{"slider__year-color":!j.value}])},(0,r.v_)(l),3),((0,u.uX)(!0),(0,u.CE)(u.FK,null,(0,u.pI)(e,((e,l)=>((0,u.uX)(),(0,u.CE)("ul",{class:"slider__month-list",key:l},[(0,u.Lk)("li",w,[(0,u.Lk)("p",L,(0,r.v_)(e),1)])])))),128))])))),128))],512))])]))}}),R=t(1241);const K=(0,R.A)(E,[["__scopeId","data-v-062f653d"]]);var C=K;const M={class:"icon"},W={key:0,xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#797979"};var O=(0,u.pM)({__name:"MyIcon",props:{type:{}},setup(e){return(e,l)=>((0,u.uX)(),(0,u.CE)("div",M,["arrow-select"===e.type?((0,u.uX)(),(0,u.CE)("svg",W,l[0]||(l[0]=[(0,u.Lk)("path",{d:"M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"},null,-1)]))):(0,u.Q3)("",!0)]))}});const D=O;var X=D;const j={class:"content"},F={class:"content__flex-container"},Y={class:"container"},T={class:"settings__date"},B={for:"yearMin",class:"setting__label settings__input-text"},N={key:0,class:"setting__error"},Q={key:1,class:"setting__error"},I={for:"yearMax",class:"setting__label settings__input-text"},V={key:0,class:"setting__error"},U={key:1,class:"setting__error"},$={for:"yearMonthMin",class:"setting__label settings__input-text"},z={key:0,class:"setting__error"},A={class:"setting__label setting__select-text"},J={class:"setting__inner"},P=["value"],S={class:"setting__label setting__select-text"},Z={class:"setting__inner"},q=["value"];var G=(0,u.pM)({__name:"App",setup(e){const l=(0,n.KR)(null),t=(0,n.KR)(null),s=(0,n.KR)(1),i=(0,n.KR)(null),o=(0,n.KR)(1),v=(0,n.KR)(null),c=(0,n.KR)(!1),d=(0,n.KR)(!1),_=(0,n.KR)(!1),p=(0,n.KR)(!1),f=(0,n.KR)(!1),m=["1","2","3","4","5","6","7","8","9","10","11","12"];(0,u.sV)((()=>{null==l.value&&null==t.value&&(c.value=!0,d.value=!0)})),(0,u.wB)((()=>l.value),(e=>{e&&(c.value=!1),e||(c.value=!0)})),(0,u.wB)((()=>t.value),(e=>{_.value=!1,e&&(d.value=!1),e||(d.value=!0)}));const k=(e,l)=>null!==e&&null!==l?new Date(e,l):new Date(0),g=()=>{h(l.value,t.value,i.value)&&(w.value=k(l.value,0),L.value=k(t.value,0),E.value=k(i.value?i.value:l.value,Number(s.value-1)),R.value=k(v.value+2,Number(o.value-1)))},h=(e,l,t)=>null!=e&&null!=l&&(null!==l&&null!==e&&l<e?(_.value=!0,!1):null!==t&&(l<t||e>t)?(p.value=!0,!1):(console.log(l,e),l-e>90?(f.value=!0,!1):(f.value=!1,_.value=!1,p.value=!1,!0))),b=(0,u.EW)((()=>null!==l.value)),y=(0,u.EW)((()=>null!==t.value&&t.value>=(l.value||0))),x=(0,u.EW)((()=>null===i.value||null!==t.value&&null!==l.value&&(t.value>=i.value&&l.value<=i.value)));let w=(0,n.KR)(new Date(2e3,1)),L=(0,n.KR)(new Date(2030,1)),E=(0,n.KR)(new Date(2e3,5)),R=(0,n.KR)(new Date(2008,11));return(e,v)=>((0,u.uX)(),(0,u.CE)("div",j,[(0,u.Lk)("div",F,[(0,u.Lk)("div",Y,[(0,u.bF)(C,{minDate:(0,n.R1)(w),maxDate:(0,n.R1)(L),minYearWithDate:(0,n.R1)(E),maxYearWithDate:(0,n.R1)(R)},null,8,["minDate","maxDate","minYearWithDate","maxYearWithDate"]),(0,u.Lk)("div",T,[(0,u.Lk)("label",B,[v[5]||(v[5]=(0,u.eW)('Минимальный год для секции "Все года": ')),(0,u.bo)((0,u.Lk)("input",{id:"yearMin",class:"setting__input",placeholder:"1990",type:"text","onUpdate:modelValue":v[0]||(v[0]=e=>l.value=e),style:(0,r.Tr)({border:b.value?"1px solid #797979":"2px solid #fb9696"})},null,4),[[a.Jo,l.value,void 0,{number:!0}]]),c.value?((0,u.uX)(),(0,u.CE)("p",N,"Заполните поле")):(0,u.Q3)("",!0),f.value?((0,u.uX)(),(0,u.CE)("p",Q," Большой диапазон годов. Уменьшите его ")):(0,u.Q3)("",!0)]),(0,u.Lk)("label",I,[v[6]||(v[6]=(0,u.eW)('Макисмальынй год для секции "Все года": ')),(0,u.bo)((0,u.Lk)("input",{id:"yearMax",class:"setting__input",placeholder:"2010",type:"text","onUpdate:modelValue":v[1]||(v[1]=e=>t.value=e),style:(0,r.Tr)({border:y.value?"1px solid #797979":"2px solid #fb9696"})},null,4),[[a.Jo,t.value,void 0,{number:!0}]]),d.value?((0,u.uX)(),(0,u.CE)("p",V,"Заполните поле")):(0,u.Q3)("",!0),_.value?((0,u.uX)(),(0,u.CE)("p",U," Макисмальынй год не должен быть меньше минимального ")):(0,u.Q3)("",!0)]),(0,u.Lk)("label",$,[v[7]||(v[7]=(0,u.eW)('Выбор года для секции "Месяц": ')),(0,u.bo)((0,u.Lk)("input",{id:"yearMonthMin",class:"setting__input",placeholder:"2004",type:"text","onUpdate:modelValue":v[2]||(v[2]=e=>i.value=e),style:(0,r.Tr)({border:x.value?"1px solid #797979":"2px solid #fb9696"})},null,4),[[a.Jo,i.value,void 0,{number:!0}]]),p.value?((0,u.uX)(),(0,u.CE)("p",z," Год должен быть в диапазон ")):(0,u.Q3)("",!0)]),(0,u.Lk)("label",A,[v[8]||(v[8]=(0,u.eW)('Выберите месяц для секции "Месяц": ')),(0,u.Lk)("div",J,[(0,u.bo)((0,u.Lk)("select",{class:"setting__select",name:"monthMin","onUpdate:modelValue":v[3]||(v[3]=e=>s.value=e)},[((0,u.uX)(),(0,u.CE)(u.FK,null,(0,u.pI)(m,(e=>(0,u.Lk)("option",{value:e,key:e},(0,r.v_)(e),9,P))),64))],512),[[a.u1,s.value]]),(0,u.bF)(X,{class:"setting-select-icon",type:"arrow-select"})])]),(0,u.Lk)("label",S,[v[9]||(v[9]=(0,u.eW)('Выберите месяц для секции "Месяц": ')),(0,u.Lk)("div",Z,[(0,u.bo)((0,u.Lk)("select",{class:"setting__select",name:"monthMax","onUpdate:modelValue":v[4]||(v[4]=e=>o.value=e)},[((0,u.uX)(),(0,u.CE)(u.FK,null,(0,u.pI)(m,(e=>(0,u.Lk)("option",{value:e,key:e},(0,r.v_)(e),9,q))),64))],512),[[a.u1,o.value]]),(0,u.bF)(X,{class:"setting-select-icon",type:"arrow-select"})])]),(0,u.Lk)("button",{class:"setting__button",onClick:g}," Сформировать слайдер ")])])])]))}});const H=G;var ee=H;(0,a.Ef)(ee).mount("#app")}},l={};function t(a){var u=l[a];if(void 0!==u)return u.exports;var n=l[a]={exports:{}};return e[a].call(n.exports,n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(l,a,u,n){if(!a){var r=1/0;for(v=0;v<e.length;v++){a=e[v][0],u=e[v][1],n=e[v][2];for(var s=!0,i=0;i<a.length;i++)(!1&n||r>=n)&&Object.keys(t.O).every((function(e){return t.O[e](a[i])}))?a.splice(i--,1):(s=!1,n<r&&(r=n));if(s){e.splice(v--,1);var o=u();void 0!==o&&(l=o)}}return l}n=n||0;for(var v=e.length;v>0&&e[v-1][2]>n;v--)e[v]=e[v-1];e[v]=[a,u,n]}}(),function(){t.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(l,{a:l}),l}}(),function(){t.d=function(e,l){for(var a in l)t.o(l,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:l[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={524:0};t.O.j=function(l){return 0===e[l]};var l=function(l,a){var u,n,r=a[0],s=a[1],i=a[2],o=0;if(r.some((function(l){return 0!==e[l]}))){for(u in s)t.o(s,u)&&(t.m[u]=s[u]);if(i)var v=i(t)}for(l&&l(a);o<r.length;o++)n=r[o],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(v)},a=self["webpackChunkdate_period_slider"]=self["webpackChunkdate_period_slider"]||[];a.forEach(l.bind(null,0)),a.push=l.bind(null,a.push.bind(a))}();var a=t.O(void 0,[504],(function(){return t(4050)}));a=t.O(a)})();
//# sourceMappingURL=app.798cb723.js.map