!function(e){function t(t){for(var n,o,l=t[0],c=t[1],s=t[2],d=0,u=[];d<l.length;d++)o=l[d],i[o]&&u.push(i[o][0]),i[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(p&&p(t);u.length;)u.shift()();return a.push.apply(a,s||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,l=1;l<r.length;l++){var c=r[l];0!==i[c]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},i={0:0},a=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="http://localhost:3000/";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var p=c;a.push([275,1]),r()}({105:function(e,t){e.exports=require("fs")},12:function(e,t){e.exports=require("util")},123:function(e,t){e.exports=require("net")},124:function(e,t){e.exports=require("http")},16:function(e,t){e.exports=require("crypto")},164:function(e,t){e.exports=require("punycode")},166:function(e,t){e.exports=require("https")},167:function(e,t){e.exports=require("querystring")},225:function(e,t){e.exports=require("buffer")},232:function(e,t){e.exports=require("tls")},264:function(e){e.exports=[{name:"日向坂46",color:"rgb(81, 182, 224)",members:["井口眞緒","潮紗理菜","柿崎芽実","影山優佳","加藤史帆","齊藤京子","佐々木久美","佐々木美玲","高瀬愛奈","高本彩花","東村芽依","金村美玖","河田陽菜","小坂菜緒","富田鈴花","丹生明里","濱岸ひより","松田好花","宮田愛萌","渡邉美穂","上村ひなの"]},{name:"乃木坂46",color:"rgb(118, 37, 133)",members:["秋元真夏","生田絵梨花","伊藤かりん","伊藤純奈","伊藤理々杏","井上小百合","岩本蓮加","梅澤美波","衛藤美彩","大園桃子","北野日奈子","久保史緒里","齋藤飛鳥","斉藤優里","阪口珠美","桜井玲香","佐々木琴子","佐藤楓","白石麻衣","新内眞衣","鈴木絢音","高山一実","寺田蘭世","中田花奈","中村麗乃","樋口日奈","星野みなみ","堀未央奈","松村沙友理","向井葉月","山崎怜奈","山下美月","吉田綾乃クリスティー","与田祐希","渡辺みり愛","和田まあや","遠藤さくら","賀喜遥香","掛橋沙耶香","金川紗耶","北川悠理","柴田柚菜","清宮レイ","田村真佑","筒井あやめ","早川聖来","矢久保美緒"]},{name:"欅坂46",color:"rgb(84, 176, 74)",members:["石森虹花","上村莉菜","尾関梨香","織田奈那","小池美波","小林由依","齋藤冬優花","佐藤詩織","菅井友香","鈴本美愉","長沢菜々香","長濱ねる","土生瑞穂","原田葵","平手友梨奈","守屋茜","渡辺梨加","渡邉理佐","井上梨名","関有美子","武元唯衣","田村保乃","藤吉夏鈴","松田里奈","松平璃子","森田ひかる","山﨑天","欅坂46二期生"]}]},275:function(e,t,r){r(276),e.exports=r(648)},39:function(e,t,r){"use strict";var n=r(264),i=r(13),a=r.n(i);t.a=new class{constructor(){this.entries=n}addOtherBlogs(e){let{entries:t}=this;a.a.forEach(a.a.values(e),e=>{(t=a.a.filter(t,({name:t})=>t!==e.name)).push(e)}),this.entries=t}getGroupColorFromMember(e){const{entries:t}=this;let r=null;return a.a.forEach(t,({members:t,color:n})=>{a.a.includes(t,e)&&(r=n)}),r}toMemberIconPath(e){return`assets/icons/${e}.jpg`}toExtraIconPath(e){return`assets/icons/extras/${e}.jpg`}}},4:function(e,t,r){"use strict";var n=r(651),i=r(13),a=r.n(i),o=r(70),l=r.n(o),c=r(51),s=r(107),p=r.n(s);class d extends(Object(c.b)({id:"",date:new Date,title:"",name:"",content:"",temporaryVisible:!1,url:""})){constructor(...e){super(a.a.merge(...e,{id:p()()}))}visible(e){const{name:t,temporaryVisible:r}=this;return e.includes(t)||r}}var u=r(39),m=r(63),b=r(267),h=r.n(b);const g=new DOMParser;var f=new class{constructor(){}getURL(e){return`https://lineblog.me/${e}`}async idToImageUrlAndName(e){const t=await l()(this.getURL(e)),r=g.parseFromString(t,"text/html");return{name:r.querySelector("h2").innerText,url:r.querySelector(".profile-photo-thumbnail img").src}}async fetch(e,t,r){const{pages:n}=r,i=[];for(let r=0;r<n;r+=1){const o=await l()(h()(this.getURL(e),`?p=${t*n+r+1}`)),c=g.parseFromString(o,"text/html");a.a.forEach(c.querySelectorAll(".article"),e=>{const t=e.querySelector(".article-title a");let r=e.querySelector(".article-body");a.a.forEach(r.querySelectorAll(".lineemoji"),e=>{e.alt="lineemoji"}),i.push(new d({date:new Date(e.querySelector(".article-date").innerText),title:t.innerText,name:c.querySelector("h2").innerText,content:Object(m.a)(r).replace(/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,(e,t)=>`<img src="${t}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="lineemoji">`),url:t.href}))})}return i}},y=r(49),v=r.n(y);const O=new DOMParser,j={fetchLineBlog:async({_ids:e,_optionsList:t},r=0)=>{const n=[],{length:i}=e;for(let a=0;a<i;a+=1)n.push(...await f.fetch(e[a],r,t[a]));return n}},w=async(e=0)=>{const t=await l()(`http://blog.nogizaka46.com/?p=${e+1}`),r=O.parseFromString(t,"text/html"),n=r.querySelectorAll(".author"),i=r.querySelectorAll("h1 .entrytitle a"),a=r.querySelectorAll(".entrybody"),o=r.querySelectorAll(".entrybottom"),{length:c}=o,s=[];for(let e=0;e<c;e+=1)s.push(new d({date:new Date(o[e].childNodes[0].nodeValue.slice(0,-1)),title:i[e].innerText,name:n[e].innerText.replace(/\s/g,""),content:Object(m.a)(a[e]),url:i[e].href}));return s},k=async(e=0)=>{const t=`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${e}`,r=await l()(t);return a.a.map(O.parseFromString(r,"text/html").querySelectorAll("article"),e=>{const{innerText:r}=e.querySelector(".box-bottom li"),n=e.querySelector("h3 a"),{innerText:i}=e.querySelector(".name");return new d({date:new Date(r),title:n.innerText.trim(),name:i.replace(/\s/g,""),content:Object(m.a)(e.querySelector(".box-article")),url:v.a.resolve(t,n.pathname)})})};var x=r(15),E=r.n(x),C=r(5),S=r.n(C),z=r(50),A=r.n(z),P=r(91);let N=-1;const{app:I}=P.remote,T=S.a.join(A.a.homedir(),".anyzaka"),q=S.a.join(T,"checked.json"),L=S.a.join(T,"following.json"),F=S.a.join(T,"other-blogs.json"),R=S.a.join(I.getAppPath(),"app/dst/assets/icons/extras");t.a=Object(n.a)({LOAD_ARTICLES:async()=>(N+=1,await(async(e=0)=>{const t=[...await k(e),...await w(e)];for(const r of u.a.entries)a.a.has(r,"_fetcher")&&t.push(...await j[r._fetcher](r,e));return t})(N)),INIT:async()=>{E.a.existsSync(T)||E.a.mkdirSync(T),E.a.existsSync(q)||E.a.writeJsonSync(q,[]),E.a.existsSync(L)||E.a.writeJsonSync(L,[]),E.a.existsSync(F)||E.a.writeJsonSync(F,{}),E.a.existsSync(R)&&E.a.removeSync(R),E.a.mkdirSync(R);const e=E.a.readJsonSync(F);return u.a.addOtherBlogs(await(async e=>{const t={};for(const r of a.a.keys(e))if("line"===r){a.a.has(t,r)||(t[r]={name:"LINE BLOG",color:"rgb(90, 196, 127)",_ids:[],_fetcher:"fetchLineBlog",_optionsList:[],members:[]});for(let n of e[r]){"string"==typeof n&&(n=[n,{pages:1}]);const[e,i]=n,{url:a,name:o}=await f.idToImageUrlAndName(e);await E.a.writeFile(S.a.join(R,`${o}.jpg`),await l()(a,{encoding:null})),t[r]._optionsList.push(i),t[r]._ids.push(e),t[r].members.push(o)}}return t})(e)),{checked:E.a.readJsonSync(q),following:E.a.readJsonSync(L),otherBlogs:JSON.stringify(e,null,4)}}},"START_TO_LOAD_ARTICLES","SET_FILTER","TOGGLE_CHECKED","TOGGLE_FOLLOWING","SHOW_ARTICLE","SET_PREFERENCES_STATE","UPDATE_PREFERENCES")},468:function(e,t){e.exports=require("zlib")},49:function(e,t){e.exports=require("url")},5:function(e,t){e.exports=require("path")},50:function(e,t){e.exports=require("os")},568:function(e,t){e.exports=require("events")},573:function(e,t){},575:function(e,t){e.exports=require("constants")},604:function(e,t,r){var n=r(605);"string"==typeof n&&(n=[[e.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(607)(n,i);n.locals&&(e.exports=n.locals)},605:function(e,t,r){(e.exports=r(606)(!1)).push([e.i,'@charset "UTF-8";\nhtml,\nbody,\nmain {\n  width: 100%;\n  height: 100%; }\n\nbody {\n  margin: 0;\n  font-family: Helvetica Neue, Helvetica, Arial, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, sans-serif; }\n',""])},63:function(e,t,r){"use strict";r.d(t,"a",function(){return l}),r.d(t,"b",function(){return s});var n=r(265),i=r(266),a=r.n(i);const o=new n.a,l=e=>a()(o.turndown(e.innerHTML).trim()),c=e=>{const{parentElement:t}=e;return"scroll"===getComputedStyle(e).overflowY?e:c(t)},s=e=>{const t=c(e);t.scroll({top:e.offsetTop-t.offsetTop})}},648:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),a=r(108),o=r.n(a),l=r(274),c=r(30),s=r(82),p=r(652),d=r(4),u=r(51),m=Object(p.a)({[d.a.loadArticles]:(e,t)=>{const{payload:r}=t;return e.push(...r).sortBy(({date:e})=>-e)},[d.a.showArticle]:(e,{payload:t})=>e.update(e.findIndex(({id:e})=>e===t),e=>e.set("temporaryVisible",!0))},Object(u.a)()),b=Object(p.a)({[d.a.startToLoadArticles]:()=>!0,[d.a.loadArticles]:()=>!1},!1),h=Object(p.a)({[d.a.setFilter]:(e,t)=>{const{payload:r}=t;return r}},-1),g=r(15),f=r.n(g),y=r(50),v=r.n(y),O=r(5),j=r.n(O);const w=j.a.join(v.a.homedir(),".anyzaka","checked.json");var k=Object(p.a)({[d.a.init]:(e,{payload:{checked:t}})=>Object(u.a)(t),[d.a.toggleChecked]:(e,{payload:t})=>{const r=e.indexOf(t),n=-1===r?e.push(t):e.delete(r);return f.a.writeJsonSync(w,n.toJS()),n}},Object(u.a)());const x=j.a.join(v.a.homedir(),".anyzaka","following.json");var E=Object(p.a)({[d.a.init]:(e,{payload:{following:t}})=>Object(u.a)(t),[d.a.toggleFollowing]:(e,{payload:t})=>{const r=e.indexOf(t),n=-1===r?e.push(t):e.delete(r);return f.a.writeJsonSync(x,n.toJS()),n}},Object(u.a)()),C=Object(p.a)({[d.a.setPreferencesState]:(e,t)=>{const{payload:r}=t;return r}},!1),S=Object(p.a)({[d.a.init]:(e,{payload:{otherBlogs:t}})=>t},""),z=Object(s.c)({articles:m,loading:b,openFilterIndex:h,checked:k,following:E,openPreferences:C,otherBlogs:S}),A=r(268),P=r.n(A);r(604);const N=Object(s.d)(z,Object(s.a)(P.a)),I=document.querySelector("main");N.dispatch(d.a.init());(()=>{const{default:e}=r(649);o.a.render(i.a.createElement(l.AppContainer,null,i.a.createElement(c.a,{store:N},i.a.createElement(e,null))),I)})()},649:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),a=r(27),o=r(269),l=r(39),c=r(3);var s=class extends n.Component{render(){const{props:{name:e,size:t=48,css:r}}=this;return i.a.createElement("i",{className:Object(c.a)(r,{display:"inline-block",borderRadius:"50%",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url("${l.a.toMemberIconPath(e)}"), url("${l.a.toExtraIconPath(e)}"), url(assets/icons/fallback.png)`,width:t,height:t})})}},p=r(63),d=r(83),u=r(13),m=r.n(u);const b=Object(c.a)({boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"}),h=Object(c.a)({height:22,WebkitAppRegion:"drag"}),g=Object(c.a)({width:220,height:"100%",boxSizing:"border-box"}),f=Object(c.a)({width:"calc(100% - 220px)",height:"100%"}),y="rgb(244, 143, 177)";var v,O,j=r(91),w=r(30),k=r(4);function x(e,t,r,n,i){var a={};return Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}const E=({article:{date:e,name:t,title:r,url:n},color:a})=>i.a.createElement("div",{className:Object(c.a)({backgroundColor:a,color:"white",padding:"16px 67px",position:"relative"})},i.a.createElement(s,{name:t,size:43,css:Object(c.a)({position:"absolute",left:16,top:16})}),i.a.createElement("div",null,i.a.createElement("div",null,o.a.format(e,"YY/MM/DD HH:mm:ss")),i.a.createElement("div",{className:Object(c.a)({fontSize:20,fontWeight:"bold",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"})},i.a.createElement("a",{href:n,className:Object(c.a)({color:"white",textDecoration:"none",":hover":{textDecoration:"underline"}})},r))));var C,S,z=Object(w.b)(({checked:e,following:t})=>({checked:e,following:t}))((x((O=class extends n.Component{constructor(){super(),this.$base=Object(n.createRef)()}onClickCheck(){const{props:{dispatch:e,article:{url:t}}}=this,{$base:{current:r}}=this;e(k.a.toggleChecked(t)),Object(p.b)(r)}onClickLink(e){e.preventDefault();const{currentTarget:{href:t}}=e;j.shell.openExternal(t)}componentDidMount(){const{$base:{current:e}}=this;m.a.forEach(e.querySelectorAll("a"),e=>{e.addEventListener("click",this.onClickLink)})}render(){const{props:{article:e,checked:t,following:r,css:n=""}}=this,{name:a,content:o,url:s,id:p}=e,u=l.a.getGroupColorFromMember(a),m=t.includes(s);return i.a.createElement("div",{className:Object(c.a)(n,b,e.visible(r)?null:{height:0,marginBottom:0,overflow:"hidden"},{position:"relative"}),ref:this.$base,"data-article-id":p},i.a.createElement(E,{article:e,color:u}),i.a.createElement("div",{className:Object(c.a)({padding:"0 16px 16px",position:"relative",'img[^="lineemoji"]':{maxWidth:"100%",display:"block"},display:m?"none":"block"})},i.a.createElement("div",{dangerouslySetInnerHTML:{__html:o}})),i.a.createElement(d.GoCheck,{size:43,onClick:this.onClickCheck,className:Object(c.a)({position:"absolute",right:16,bottom:16,cursor:"pointer"},m?{fill:"white"}:{fill:"lightgray","&:hover":{fill:u}})}))}}).prototype,"onClickCheck",[a.a],Object.getOwnPropertyDescriptor(O.prototype,"onClickCheck"),O.prototype),x(O.prototype,"onClickLink",[a.a],Object.getOwnPropertyDescriptor(O.prototype,"onClickLink"),O.prototype),v=O))||v,A=r(270);function P(e,t,r,n,i){var a={};return Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}let N=Object(w.b)(({openFilterIndex:e,following:t})=>({openFilterIndex:e,following:t}))((P((S=class extends n.Component{onClickFilter(e){const{currentTarget:{dataset:{strkey:t}}}=e,{props:{dispatch:r,openFilterIndex:n}}=this,i=parseInt(t);r(k.a.setFilter(i===n?-1:i))}onClickFilterMember(e){const{props:{dispatch:t}}=this,{currentTarget:{dataset:{name:r}}}=e;t(k.a.toggleFollowing(r))}render(){const{props:{following:e,openFilterIndex:t}}=this;return i.a.createElement("div",{className:Object(c.a)(b,{padding:8})},i.a.createElement("div",{className:Object(c.a)({marginBottom:4})},m.a.map(l.a.entries,({name:r,color:n,members:a},o)=>i.a.createElement("span",{onClick:this.onClickFilter,key:o,"data-strkey":o,className:Object(c.a)({color:n,cursor:"pointer",i:{verticalAlign:"middle"}})},t===o?i.a.createElement(d.GoTriangleDown,{className:Object(c.a)({verticalAlign:"middle"})}):i.a.createElement(d.GoTriangleRight,{className:Object(c.a)({verticalAlign:"middle"})}),i.a.createElement("span",{className:Object(c.a)({fontWeight:"bold",marginRight:2,verticalAlign:"middle"})},r),m.a.map(a,r=>e.includes(r)&&t!==o?i.a.createElement(s,{name:r,size:24,key:r}):null)))),i.a.createElement("div",{className:Object(c.a)({display:"flex",flexWrap:"wrap"})},m.a.map(l.a.entries,({members:r},n)=>t===n?m.a.map(r,t=>i.a.createElement("div",{onClick:this.onClickFilterMember,key:t,"data-name":t,className:Object(c.a)(b,{display:"flex",alignItems:"center",marginRight:8,marginBottom:8,padding:4,borderRadius:4,cursor:"pointer",opacity:e.includes(t)?1:.5,"> :first-of-type":{marginRight:4}})},i.a.createElement(s,{name:t,size:36}),i.a.createElement("span",null,t))):null)))}}).prototype,"onClickFilter",[a.a],Object.getOwnPropertyDescriptor(S.prototype,"onClickFilter"),S.prototype),P(S.prototype,"onClickFilterMember",[a.a],Object.getOwnPropertyDescriptor(S.prototype,"onClickFilterMember"),S.prototype),C=S))||C;var I,T;let q=Object(w.b)(({following:e,checked:t})=>({following:e,checked:t}))((L=(T=class extends n.Component{onClickItem(){const{props:{article:e,following:t,dispatch:r}}=this;e.visible(t)||r(k.a.showArticle(e.id)),Object(p.b)(document.querySelector(`[data-article-id="${e.id}"]`))}render(){const{props:{article:e,following:t,checked:r}}=this,n=e.visible(t);return i.a.createElement("div",{onClick:this.onClickItem,className:Object(c.a)({overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer",padding:"0 8px",":hover":{backgroundColor:"rgba(255, 255, 255, 0.3)"}})},i.a.createElement(d.GoCheck,{style:{marginRight:4,verticalAlign:"middle",visibility:r.includes(e.url)?"visible":"hidden",opacity:n?1:.5}}),i.a.createElement(s,{name:e.name,size:24,css:Object(c.a)({verticalAlign:"middle",marginRight:4,opacity:n?1:.5})}),i.a.createElement("span",{className:Object(c.a)({opacity:n?1:.5})},e.title))}}).prototype,F="onClickItem",R=[a.a],D=Object.getOwnPropertyDescriptor(T.prototype,"onClickItem"),_=T.prototype,M={},Object.keys(D).forEach(function(e){M[e]=D[e]}),M.enumerable=!!M.enumerable,M.configurable=!!M.configurable,("value"in M||M.initializer)&&(M.writable=!0),M=R.slice().reverse().reduce(function(e,t){return t(L,F,e)||e},M),_&&void 0!==M.initializer&&(M.value=M.initializer?M.initializer.call(_):void 0,M.initializer=void 0),void 0===M.initializer&&(Object.defineProperty(L,F,M),M=null),I=T))||I;var L,F,R,D,_,M,B,$;let G=Object(w.b)(({articles:e})=>({articles:e}))((function(e,t,r,n,i){var a={};Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null)}(($=class extends n.Component{onClickItem(){}render(){const{props:{articles:e}}=this;return i.a.createElement("div",{className:Object(c.a)(g,b,{display:"flex",flexDirection:"column",backgroundColor:y,color:"white"})},i.a.createElement("div",{className:h}),i.a.createElement("div",{className:Object(c.a)({overflowY:"scroll",flex:1})},e.map(e=>{const{id:t}=e;return i.a.createElement(q,{article:e,key:t})})))}}).prototype,"onClickItem",[a.a],Object.getOwnPropertyDescriptor($.prototype,"onClickItem"),$.prototype),B=$))||B;var J,H,V=r(15),W=r.n(V),U=r(50),Y=r.n(U),K=r(5),X=r.n(K),Q=r(271),Z=r.n(Q),ee=r(133);r(179),r(642),r(644);const te=X.a.join(Y.a.homedir(),".anyzaka","other-blogs.json");let re=Object(w.b)(({openPreferences:e,otherBlogs:t})=>({openPreferences:e,otherBlogs:t}))((function(e,t,r,n,i){var a={};Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null)}((H=class extends n.Component{onClickSaveButton(){const{innerText:e}=document.getElementById("brace-editor");try{const t=JSON.parse(e.slice(1));W.a.writeJsonSync(te,t),location.reload()}catch(e){ee.b.error(String(e),{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!1})}}render(){const{props:{openPreferences:e,otherBlogs:t}}=this;return e?i.a.createElement("div",{className:Object(c.a)({position:"fixed",left:0,top:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.435)",display:"flex",justifyContent:"center",alignItems:"center"})},i.a.createElement("div",{className:Object(c.a)(b,{backgroundColor:"white",width:"55%",position:"relative"})},i.a.createElement("div",{className:Object(c.a)(b,{backgroundColor:y,color:"white",padding:16,display:"flex",justifyContent:"space-between",alignItems:"center"})},i.a.createElement("span",{className:Object(c.a)({fontSize:"2rem"})},"Preferences")),i.a.createElement("div",{className:Object(c.a)({padding:24})},i.a.createElement(Z.a,{defaultValue:t,mode:"json",theme:"github",showGutter:!1,style:{width:"100%",height:160,border:"1px solid rgb(230, 236, 240)"},editorProps:{$blockScrolling:!0}})),i.a.createElement("div",{className:Object(c.a)({padding:"4px 6px",textAlign:"right"})},i.a.createElement("span",{onClick:this.onClickSaveButton,className:Object(c.a)(b,{margin:"6px 0",padding:"0 16px",lineHeight:"36px",display:"inline-block",backgroundColor:y,color:"white",cursor:"pointer"})},"SAVE & RELOAD")))):null}}).prototype,"onClickSaveButton",[a.a],Object.getOwnPropertyDescriptor(H.prototype,"onClickSaveButton"),H.prototype),J=H))||J;var ne,ie;function ae(e,t,r,n,i){var a={};return Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}let oe=Object(w.b)(({articles:e,loading:t})=>({articles:e,loading:t}))((ae((ie=class extends n.Component{constructor(){super(),this.$loading=Object(n.createRef)(),this.$articles=Object(n.createRef)(),this.prevloadingIsVisible=!0,j.ipcRenderer.on("menu:preferences",this.onClickPreferencesOfMenuItem)}componentDidMount(){this.loadAndAddArticles(),this.watchLoading()}onClickPreferencesOfMenuItem(){const{props:{dispatch:e}}=this;e(k.a.setPreferencesState(!0))}loadAndAddArticles(){const{props:{dispatch:e,loading:t}}=this;t||(e(k.a.startToLoadArticles()),e(k.a.loadArticles()))}onClickResetFilter(){const{props:{dispatch:e}}=this;e(k.a.setFilter(-1))}watchLoading(){const{$loading:{current:e},prevloadingIsVisible:t}=this,{top:r}=e.getBoundingClientRect(),n=innerHeight>=r;!t&&n&&this.loadAndAddArticles(),this.prevloadingIsVisible=n,requestAnimationFrame(this.watchLoading)}onClickLoad(){this.loadAndAddArticles()}render(){const{props:{articles:e,loading:t}}=this;return i.a.createElement("div",{className:Object(c.a)({width:"100%",height:"100%",display:"flex",flexDirection:"row"})},i.a.createElement(G,null),i.a.createElement("div",{className:Object(c.a)(f,{display:"flex",flexDirection:"column"})},i.a.createElement("div",{className:h}),i.a.createElement("div",{ref:this.$articles,onClick:this.onClickResetFilter,className:Object(c.a)({flex:1,overflow:"scroll"})},i.a.createElement("div",{className:Object(c.a)({minWidth:960,padding:16,marginLeft:"auto",marginRight:"auto"})},e.map(e=>i.a.createElement(z,{article:e,key:e.id,css:Object(c.a)({marginBottom:16})})),i.a.createElement("div",{ref:this.$loading,className:Object(c.a)({margin:"16px 0",textAlign:"center"})},t?i.a.createElement(A.BeatLoader,{css:Object(c.a)({display:"inline-block"})}):i.a.createElement("div",{onClick:this.onClickLoad,className:Object(c.a)({color:"rgb(233, 30, 99)",border:"1px solid rgb(233, 30, 99)",padding:"4px 8px",borderRadius:4,cursor:"pointer"})},"さらに記事を読み込む")))),i.a.createElement(N,null)),i.a.createElement(re,null),i.a.createElement(ee.a,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnVisibilityChange:!0,draggable:!1,pauseOnHover:!0}))}}).prototype,"onClickPreferencesOfMenuItem",[a.a],Object.getOwnPropertyDescriptor(ie.prototype,"onClickPreferencesOfMenuItem"),ie.prototype),ae(ie.prototype,"onClickResetFilter",[a.a],Object.getOwnPropertyDescriptor(ie.prototype,"onClickResetFilter"),ie.prototype),ae(ie.prototype,"watchLoading",[a.a],Object.getOwnPropertyDescriptor(ie.prototype,"watchLoading"),ie.prototype),ae(ie.prototype,"onClickLoad",[a.a],Object.getOwnPropertyDescriptor(ie.prototype,"onClickLoad"),ie.prototype),ne=ie))||ne;t.default=oe},66:function(e,t){e.exports=require("assert")},81:function(e,t){e.exports=require("stream")},91:function(e,t){e.exports=require("electron")}});