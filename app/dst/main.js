!function(e){function t(t){for(var n,o,l=t[0],c=t[1],s=t[2],p=0,u=[];p<l.length;p++)o=l[p],i[o]&&u.push(i[o][0]),i[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(d&&d(t);u.length;)u.shift()();return a.push.apply(a,s||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,l=1;l<r.length;l++){var c=r[l];0!==i[c]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},i={0:0},a=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="http://localhost:3000/";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var d=c;a.push([262,1]),r()}({102:function(e,t){e.exports=require("fs")},118:function(e,t){e.exports=require("net")},119:function(e,t){e.exports=require("http")},12:function(e,t){e.exports=require("util")},14:function(e,t){e.exports=require("crypto")},157:function(e,t){e.exports=require("punycode")},159:function(e,t){e.exports=require("https")},160:function(e,t){e.exports=require("querystring")},175:function(e){e.exports=[{name:"日向坂46",color:"rgb(81, 182, 224)",members:["井口眞緒","潮紗理菜","柿崎芽実","影山優佳","加藤史帆","齊藤京子","佐々木久美","佐々木美玲","高瀬愛奈","高本彩花","東村芽依","金村美玖","河田陽菜","小坂菜緒","富田鈴花","丹生明里","濱岸ひより","松田好花","宮田愛萌","渡邉美穂","上村ひなの"]},{name:"乃木坂46",color:"rgb(118, 37, 133)",members:["秋元真夏","生田絵梨花","伊藤かりん","伊藤純奈","伊藤理々杏","井上小百合","岩本蓮加","梅澤美波","衛藤美彩","大園桃子","北野日奈子","久保史緒里","齋藤飛鳥","斉藤優里","阪口珠美","桜井玲香","佐々木琴子","佐藤楓","白石麻衣","新内眞衣","鈴木絢音","高山一実","寺田蘭世","中田花奈","中村麗乃","樋口日奈","星野みなみ","堀未央奈","松村沙友理","向井葉月","山崎怜奈","山下美月","吉田綾乃クリスティー","与田祐希","渡辺みり愛","和田まあや","遠藤さくら","賀喜遥香","掛橋沙耶香","金川紗耶","北川悠理","柴田柚菜","清宮レイ","田村真佑","筒井あやめ","早川聖来","矢久保美緒"]},{name:"欅坂46",color:"rgb(84, 176, 74)",members:["石森虹花","上村莉菜","尾関梨香","織田奈那","小池美波","小林由依","齋藤冬優花","佐藤詩織","菅井友香","鈴本美愉","長沢菜々香","長濱ねる","土生瑞穂","原田葵","平手友梨奈","守屋茜","渡辺梨加","渡邉理佐","井上梨名","関有美子","武元唯衣","田村保乃","藤吉夏鈴","松田里奈","松平璃子","森田ひかる","山﨑天","欅坂46二期生"]}]},220:function(e,t){e.exports=require("buffer")},227:function(e,t){e.exports=require("tls")},259:function(e,t){e.exports=require("electron")},262:function(e,t,r){r(263),e.exports=r(626)},41:function(e,t,r){"use strict";var n=r(27),i=r.n(n),a=r(255),o=r(175),l=r(176),c=r.n(l),s=r(256),d=r.n(s),p=r(49),u=r(104),m=r.n(u);class b extends(Object(p.b)({id:"",date:new Date,title:"",name:"",content:"",temporaryVisible:!1})){constructor(...e){super(i.a.merge(...e,{id:m()()}))}visible(e){const{name:t,temporaryVisible:r}=this;return e.includes(t)||r}get key(){const{title:e,name:t}=this;return`${t}-${e}`}}r.d(t,"b",function(){return y}),r.d(t,"a",function(){return k}),r.d(t,"c",function(){return x});const f=new DOMParser,h=new a.a,g=e=>d()(h.turndown(e.innerHTML).trim()),y=async(e=0)=>i.a.sortBy(i.a.concat(await O(e),await v(e)),({date:e})=>-e),v=async(e=0)=>{const t=await c()(`http://blog.nogizaka46.com/?p=${e+1}`),r=f.parseFromString(t,"text/html"),n=r.querySelectorAll(".author"),i=r.querySelectorAll("h1 .entrytitle"),a=r.querySelectorAll(".entrybody"),o=r.querySelectorAll(".entrybottom"),{length:l}=o,s=[];for(let e=0;e<l;e+=1)s.push(new b({date:new Date(o[e].childNodes[0].nodeValue.slice(0,-1)),title:i[e].innerText,name:n[e].innerText.replace(/\s/g,""),content:g(a[e])}));return s},O=async(e=0)=>{const t=await c()(`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${e}`);return i.a.map(f.parseFromString(t,"text/html").querySelectorAll("article"),e=>{const{innerText:t}=e.querySelector(".box-bottom li"),{innerText:r}=e.querySelector("h3"),{innerText:n}=e.querySelector(".name");return new b({date:new Date(t),title:r.trim(),name:n.replace(/\s/g,""),content:g(e.querySelector(".box-article"))})})};const k=new class{json(){return o}getGroupColorFromMember(e){let t=null;return i.a.forEach(o,({members:r,color:n})=>{i.a.includes(r,e)&&(t=n)}),t}toMemberIconPath(e){return`assets/icons/${e}.jpg`}},j=e=>{const{parentElement:t}=e;return"scroll"===getComputedStyle(e).overflowY?e:j(t)},x=e=>{const t=j(e);t.scroll({top:e.offsetTop-t.offsetTop})}},437:function(e,t){},456:function(e,t){e.exports=require("zlib")},556:function(e,t){e.exports=require("events")},562:function(e,t){e.exports=require("constants")},591:function(e,t,r){var n=r(592);"string"==typeof n&&(n=[[e.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(594)(n,i);n.locals&&(e.exports=n.locals)},592:function(e,t,r){(e.exports=r(593)(!1)).push([e.i,'@charset "UTF-8";\nhtml,\nbody,\nmain {\n  width: 100%;\n  height: 100%; }\n\nbody {\n  margin: 0;\n  font-family: Helvetica Neue, Helvetica, Arial, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, sans-serif; }\n',""])},625:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),a=r(32),o=r(258),l=r(41),c=r(2);var s=class extends n.Component{render(){const{props:{name:e,size:t=48,css:r}}=this;return i.a.createElement("i",{className:Object(c.a)(r,{display:"inline-block",borderRadius:"50%",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url("${l.a.toMemberIconPath(e)}"), url(assets/icons/fallback.png)`,width:t,height:t})})}},d=r(69),p=r(27),u=r.n(p);const m=Object(c.a)({boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"}),b=Object(c.a)({height:22,WebkitAppRegion:"drag"});var f,h,g=r(259),y=r(38),v=r(8);var O,k,j,x,w,C,E,z,S=Object(y.b)(({checked:e,following:t})=>({checked:e,following:t}))((O=(h=class extends n.Component{constructor(){super(),this.$base=Object(n.createRef)(),this.$content=Object(n.createRef)()}onClickCheck(){const{props:{dispatch:e,article:{key:t}}}=this,{$base:{current:r}}=this;e(v.a.toggleChecked(t)),Object(l.c)(r)}onClickLink(e){e.preventDefault();const{currentTarget:{href:t}}=e;g.shell.openExternal(t)}componentDidMount(){const{$content:{current:e}}=this;u.a.forEach(e.querySelectorAll("a"),e=>{e.addEventListener("click",this.onClickLink)})}render(){const{props:{article:e,checked:t,following:r,css:n=""}}=this,{title:a,name:p,date:u,content:b,key:f,id:h}=e,g=l.a.getGroupColorFromMember(p),y=t.includes(f);return i.a.createElement("div",{className:Object(c.a)(n,m,e.visible(r)?null:{height:0,marginBottom:0,overflow:"hidden"}),ref:this.$base,"data-article-id":h},i.a.createElement("div",{className:Object(c.a)({backgroundColor:g,color:"white",padding:16,display:"flex",alignItems:"center","> :first-of-type":{marginRight:8}})},i.a.createElement("div",null,i.a.createElement(s,{name:p,size:43})),i.a.createElement("div",{className:Object(c.a)({flex:1})},i.a.createElement("div",null,o.a.format(u,"YY/MM/DD HH:mm:ss")),i.a.createElement("div",{className:Object(c.a)({fontSize:20,fontWeight:"bold"})},a)),y?i.a.createElement(d.GoCheck,{size:36,fill:"white",onClick:this.onClickCheck,"data-key":f,className:Object(c.a)({cursor:"pointer"})}):null),i.a.createElement("div",{className:Object(c.a)({padding:"0 16px 16px",position:"relative",img:{maxWidth:"100%",display:"block"},display:y?"none":"block"})},i.a.createElement("div",{ref:this.$content,dangerouslySetInnerHTML:{__html:b}}),i.a.createElement(d.GoCheck,{size:36,onClick:this.onClickCheck,className:Object(c.a)({position:"absolute",right:16,bottom:16,cursor:"pointer",fill:"lightgray","&:hover":{fill:g}})})))}}).prototype,k="onClickCheck",j=[a.a],x=Object.getOwnPropertyDescriptor(h.prototype,"onClickCheck"),w=h.prototype,C={},Object.keys(x).forEach(function(e){C[e]=x[e]}),C.enumerable=!!C.enumerable,C.configurable=!!C.configurable,("value"in C||C.initializer)&&(C.writable=!0),C=j.slice().reverse().reduce(function(e,t){return t(O,k,e)||e},C),w&&void 0!==C.initializer&&(C.value=C.initializer?C.initializer.call(w):void 0,C.initializer=void 0),void 0===C.initializer&&(Object.defineProperty(O,k,C),C=null),f=h))||f,A=r(260);function q(e,t,r,n,i){var a={};return Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}const I=l.a.json();let F=Object(y.b)(({openFilterIndex:e,following:t})=>({openFilterIndex:e,following:t}))((q((z=class extends n.Component{onClickFilter(e){const{currentTarget:{dataset:{strkey:t}}}=e,{props:{dispatch:r,openFilterIndex:n}}=this,i=parseInt(t);r(v.a.setFilter(i===n?-1:i))}onClickFilterMember(e){const{props:{dispatch:t}}=this,{currentTarget:{dataset:{name:r}}}=e;t(v.a.toggleFollowing(r))}render(){const{props:{following:e,openFilterIndex:t}}=this;return i.a.createElement("div",{className:Object(c.a)(m,{padding:8})},i.a.createElement("div",{className:Object(c.a)({marginBottom:4})},u.a.map(I,({name:r,color:n,members:a},o)=>i.a.createElement("span",{onClick:this.onClickFilter,key:o,"data-strkey":o,className:Object(c.a)({color:n,cursor:"pointer",i:{verticalAlign:"middle"}})},t===o?i.a.createElement(d.GoTriangleDown,null):i.a.createElement(d.GoTriangleRight,null),i.a.createElement("span",{className:Object(c.a)({fontWeight:"bold",marginRight:2})},r),u.a.map(a,r=>e.includes(r)&&t!==o?i.a.createElement(s,{name:r,size:24,key:r}):null)))),i.a.createElement("div",{className:Object(c.a)({display:"flex",flexWrap:"wrap"})},u.a.map(I,({members:r},n)=>t===n?u.a.map(r,t=>i.a.createElement("div",{onClick:this.onClickFilterMember,key:t,"data-name":t,className:Object(c.a)(m,{display:"flex",alignItems:"center",marginRight:8,marginBottom:8,padding:4,borderRadius:4,cursor:"pointer",opacity:e.includes(t)?1:.5,"> :first-of-type":{marginRight:4}})},i.a.createElement(s,{name:t,size:36}),i.a.createElement("span",null,t))):null)))}}).prototype,"onClickFilter",[a.a],Object.getOwnPropertyDescriptor(z.prototype,"onClickFilter"),z.prototype),q(z.prototype,"onClickFilterMember",[a.a],Object.getOwnPropertyDescriptor(z.prototype,"onClickFilterMember"),z.prototype),E=z))||E;var N,T;let L=Object(y.b)(({following:e,checked:t})=>({following:e,checked:t}))((function(e,t,r,n,i){var a={};Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null)}((T=class extends n.Component{onClickItem(){const{props:{article:e,following:t,dispatch:r}}=this;e.visible(t)||r(v.a.showArticle(e.id)),Object(l.c)(document.querySelector(`[data-article-id="${e.id}"]`))}render(){const{props:{article:e,following:t,checked:r}}=this,n=e.visible(t);return i.a.createElement("div",{onClick:this.onClickItem,className:Object(c.a)({overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer",padding:"0 8px",":hover":{backgroundColor:"rgba(255, 255, 255, 0.3)"}})},i.a.createElement(d.GoCheck,{style:{marginRight:4,verticalAlign:"middle",visibility:r.includes(e.key)?"visible":"hidden",opacity:n?1:.5}}),i.a.createElement(s,{name:e.name,size:24,css:Object(c.a)({verticalAlign:"middle",marginRight:4,opacity:n?1:.5})}),i.a.createElement("span",{className:Object(c.a)({opacity:n?1:.5})},e.title))}}).prototype,"onClickItem",[a.a],Object.getOwnPropertyDescriptor(T.prototype,"onClickItem"),T.prototype),N=T))||N;var R,P;let D=Object(y.b)(({articles:e})=>({articles:e}))((function(e,t,r,n,i){var a={};Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null)}((P=class extends n.Component{onClickItem(){}render(){const{props:{articles:e}}=this;return i.a.createElement("div",{className:Object(c.a)(m,{width:220,height:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",backgroundColor:"rgb(244, 143, 177)",color:"white"})},i.a.createElement("div",{className:b}),i.a.createElement("div",{className:Object(c.a)({overflowY:"scroll",flex:1})},e.map(e=>{const{id:t}=e;return i.a.createElement(L,{article:e,key:t})})))}}).prototype,"onClickItem",[a.a],Object.getOwnPropertyDescriptor(P.prototype,"onClickItem"),P.prototype),R=P))||R;var M,$;function _(e,t,r,n,i){var a={};return Object.keys(n).forEach(function(e){a[e]=n[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}let G=Object(y.b)(({articles:e,loading:t})=>({articles:e,loading:t}))((_(($=class extends n.Component{constructor(){super(),this.$loading=Object(n.createRef)(),this.$articles=Object(n.createRef)(),this.prevloadingIsVisible=!0}componentDidMount(){this.loadAndAddArticles(),this.watchLoading()}loadAndAddArticles(){const{props:{dispatch:e,loading:t}}=this;t||(e(v.a.startToLoadArticles()),e(v.a.loadArticles()))}onClickResetFilter(){const{props:{dispatch:e}}=this;e(v.a.setFilter(-1))}watchLoading(){const{$loading:{current:e},prevloadingIsVisible:t}=this,{top:r}=e.getBoundingClientRect(),n=innerHeight>=r;!t&&n&&this.loadAndAddArticles(),this.prevloadingIsVisible=n,requestAnimationFrame(this.watchLoading)}onClickLoad(){this.loadAndAddArticles()}render(){const{props:{articles:e,loading:t}}=this;return i.a.createElement("div",{className:Object(c.a)({width:"100%",height:"100%",display:"flex",flexDirection:"row"})},i.a.createElement(D,null),i.a.createElement("div",{className:Object(c.a)({flex:1,height:"100%",display:"flex",flexDirection:"column"})},i.a.createElement("div",{className:b}),i.a.createElement("div",{ref:this.$articles,onClick:this.onClickResetFilter,className:Object(c.a)({flex:1,overflow:"scroll"})},i.a.createElement("div",{className:Object(c.a)({minWidth:960,padding:16,marginLeft:"auto",marginRight:"auto"})},e.map(e=>i.a.createElement(S,{article:e,key:e.id,css:Object(c.a)({marginBottom:16})})),i.a.createElement("div",{ref:this.$loading,className:Object(c.a)({margin:"16px 0",textAlign:"center"})},t?i.a.createElement(A.BeatLoader,{css:Object(c.a)({display:"inline-block"})}):i.a.createElement("div",{onClick:this.onClickLoad,className:Object(c.a)({color:"rgb(233, 30, 99)",border:"1px solid rgb(233, 30, 99)",padding:"4px 8px",borderRadius:4,cursor:"pointer"})},"さらに記事を読み込む")))),i.a.createElement(F,null)))}}).prototype,"onClickResetFilter",[a.a],Object.getOwnPropertyDescriptor($.prototype,"onClickResetFilter"),$.prototype),_($.prototype,"watchLoading",[a.a],Object.getOwnPropertyDescriptor($.prototype,"watchLoading"),$.prototype),_($.prototype,"onClickLoad",[a.a],Object.getOwnPropertyDescriptor($.prototype,"onClickLoad"),$.prototype),M=$))||M;t.default=G},626:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),a=r(253),o=r.n(a),l=r(261),c=r(38),s=r(80),d=r(628),p=r(8),u=r(49),m=Object(d.a)({[p.a.loadArticles]:(e,t)=>{const{payload:r}=t;return e.push(...r)},[p.a.showArticle]:(e,{payload:t})=>e.update(e.findIndex(({id:e})=>e===t),e=>e.set("temporaryVisible",!0))},Object(u.a)()),b=Object(d.a)({[p.a.startToLoadArticles]:()=>!0,[p.a.loadArticles]:()=>!1},!1),f=Object(d.a)({[p.a.setFilter]:(e,t)=>{const{payload:r}=t;return r}},-1),h=r(33),g=r.n(h),y=r(67),v=r.n(y),O=r(9),k=r.n(O);const j=k.a.join(v.a.homedir(),".anyzaka","checked.json");var x=Object(d.a)({[p.a.init]:(e,{payload:{checked:t}})=>Object(u.a)(t),[p.a.toggleChecked]:(e,{payload:t})=>{const r=e.indexOf(t),n=-1===r?e.push(t):e.delete(r);return g.a.writeJsonSync(j,n.toJS()),n}},Object(u.a)());const w=k.a.join(v.a.homedir(),".anyzaka","following.json");var C=Object(d.a)({[p.a.init]:(e,{payload:{following:t}})=>Object(u.a)(t),[p.a.toggleFollowing]:(e,{payload:t})=>{const r=e.indexOf(t),n=-1===r?e.push(t):e.delete(r);return g.a.writeJsonSync(w,n.toJS()),n}},Object(u.a)()),E=Object(s.c)({articles:m,loading:b,openFilterIndex:f,checked:x,following:C}),z=r(257),S=r.n(z);r(591);const A=Object(s.d)(E,Object(s.a)(S.a)),q=document.querySelector("main");A.dispatch(p.a.init());(()=>{const{default:e}=r(625);o.a.render(i.a.createElement(l.AppContainer,null,i.a.createElement(c.a,{store:A},i.a.createElement(e,null))),q)})()},63:function(e,t){e.exports=require("url")},64:function(e,t){e.exports=require("assert")},67:function(e,t){e.exports=require("os")},79:function(e,t){e.exports=require("stream")},8:function(e,t,r){"use strict";var n=r(627),i=r(41),a=r(33),o=r.n(a),l=r(9),c=r.n(l),s=r(67),d=r.n(s);let p=-1;t.a=Object(n.a)({LOAD_ARTICLES:async()=>(p+=1,await Object(i.b)(p)),INIT:()=>{const e=c.a.join(d.a.homedir(),".anyzaka"),t=c.a.join(e,"checked.json"),r=c.a.join(e,"following.json");return o.a.existsSync(e)||o.a.mkdirSync(e),o.a.existsSync(t)||o.a.writeJsonSync(t,[]),o.a.existsSync(r)||o.a.writeJsonSync(r,[]),{checked:o.a.readJsonSync(t),following:o.a.readJsonSync(r)}}},"START_TO_LOAD_ARTICLES","SET_FILTER","TOGGLE_CHECKED","TOGGLE_FOLLOWING","SHOW_ARTICLE")},9:function(e,t){e.exports=require("path")}});