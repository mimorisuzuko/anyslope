!function(e){function t(t){for(var a,i,c=t[0],l=t[1],s=t[2],d=0,u=[];d<c.length;d++)i=c[d],n[i]&&u.push(n[i][0]),n[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(p&&p(t);u.length;)u.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,c=1;c<r.length;c++){var l=r[c];0!==n[l]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={0:0},o=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="http://localhost:3000/";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var p=l;o.push([282,1]),r()}({100:function(e,t){e.exports=require("fs")},112:function(e){e.exports=[{name:"日向坂46",color:"rgb(81, 182, 224)",members:["井口眞緒","潮紗理菜","柿崎芽実","影山優佳","加藤史帆","齊藤京子","佐々木久美","佐々木美玲","高瀬愛奈","高本彩花","東村芽依","金村美玖","河田陽菜","小坂菜緒","富田鈴花","丹生明里","濱岸ひより","松田好花","宮田愛萌","渡邉美穂","上村ひなの"],extra:!1,page:0},{name:"欅坂46",color:"rgb(84, 176, 74)",members:["石森虹花","上村莉菜","尾関梨香","織田奈那","小池美波","小林由依","齋藤冬優花","佐藤詩織","菅井友香","鈴本美愉","長沢菜々香","長濱ねる","土生瑞穂","原田葵","平手友梨奈","守屋茜","渡辺梨加","渡邉理佐","井上梨名","関有美子","武元唯衣","田村保乃","藤吉夏鈴","松田里奈","松平璃子","森田ひかる","山﨑天"],extra:!1,page:0},{name:"乃木坂46",color:"rgb(118, 37, 133)",members:["秋元真夏","生田絵梨花","伊藤かりん","伊藤純奈","伊藤理々杏","井上小百合","岩本蓮加","梅澤美波","大園桃子","北野日奈子","久保史緒里","齋藤飛鳥","斉藤優里","阪口珠美","桜井玲香","佐々木琴子","佐藤楓","白石麻衣","新内眞衣","鈴木絢音","高山一実","寺田蘭世","中田花奈","中村麗乃","樋口日奈","星野みなみ","堀未央奈","松村沙友理","向井葉月","山崎怜奈","山下美月","吉田綾乃クリスティー","与田祐希","渡辺みり愛","和田まあや","遠藤さくら","賀喜遥香","掛橋沙耶香","金川紗耶","北川悠理","柴田柚菜","清宮レイ","田村真佑","筒井あやめ","早川聖来","矢久保美緒","運営スタッフ","４期生"],extra:!1,page:1}]},129:function(e,t){e.exports=require("net")},130:function(e,t){e.exports=require("http")},134:function(e,t){e.exports=require("os")},136:function(e,t,r){"use strict";var a=r(95),n=r.n(a),o=r(30),i=r.n(o),c=r(33),l=r(47),s=r(40),p=r.n(s),d=r(5),u=r.n(d);function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),a.forEach(function(t){g(e,t,r[t])})}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const b=new DOMParser;class h{static get URL_ORIGIN(){return"https://ameblo.jp"}static getURL(e){return n()(h.URL_ORIGIN,e)}static parse(e){const t=b.parseFromString(e,"text/html"),r=[];for(const e of t.querySelectorAll(".skin-entry.js-entryWrapper")){const a=e.querySelector("a.skinArticleTitle"),o=e.querySelector(".skin-entryBody");r.push({date:p()(u.a.nth(e.querySelector(".skin-textQuiet").childNodes,-1).nodeValue.replace(/[年|月|日]/g,"/").replace(/[時|分|秒]/g,":")),title:a.innerText,author:t.querySelector(".skin-profileName").innerText,content:o.innerText,html:Object(c.a)(o).replace(/<img\s+src="(https:\/\/stat100.ameba.jp\/blog\/ucs\/img\/char\/\w+\/\w+\.png)".+>/g,(e,t)=>`<img src="${t}" width="24" width="24" alt="emoji">`),url:n()(h.URL_ORIGIN,...a.href.split("/").slice(-2))})}return r}static async idToImageUrlAndName(e){const t=await i()(h.getURL(e)),r=b.parseFromString(t,"text/html");return{name:r.querySelector(".skin-profileName").innerText,url:r.querySelector(".skin-profileAvatar img").src}}static async fetch(e){const t=[],r=e.get("_ids"),{size:a}=r,o=e.get("page");for(let c=0;c<a;c+=1){const a=e.getIn(["_optionsList",c]),s=a.get("multi"),p=a.get("filters");for(let e=0;e<s;e+=1)t.push(...u.a.map(h.parse(await i()(n()(h.getURL(r.get(c)),`/page-${(o-1)*s+e+1}.html`))),e=>new l.a(m({},e,{filtered:p.some(t=>null===e[t.get(0)].match(t.get(1)))}))))}return t}}t.a=h},14:function(e,t){e.exports=require("util")},16:function(e,t,r){"use strict";r.d(t,"a",function(){return p}),r.d(t,"d",function(){return d}),r.d(t,"c",function(){return u}),r.d(t,"b",function(){return m}),r.d(t,"e",function(){return g});var a=r(85),n=r(6),o=r.n(n),i=r(134),c=r.n(i);const{env:{NODE_ENV:l}}=process,s=o.a.join(void 0===a.remote?process.cwd():a.remote.app.getAppPath(),"app/dst"),p=o.a.join(c.a.homedir(),".anyzaka"),d=o.a.join(s,"assets/icons"),u=o.a.join(d,"extra"),m=o.a.join(p,"extra-blogs.json"),g="development"===l},173:function(e,t){e.exports=require("punycode")},175:function(e,t){e.exports=require("https")},176:function(e,t){e.exports=require("querystring")},18:function(e,t){e.exports=require("crypto")},238:function(e,t){e.exports=require("buffer")},245:function(e,t){e.exports=require("tls")},282:function(e,t,r){r(283),e.exports=r(652)},33:function(e,t,r){"use strict";r.d(t,"a",function(){return v}),r.d(t,"e",function(){return j}),r.d(t,"d",function(){return k}),r.d(t,"b",function(){return E}),r.d(t,"c",function(){return S});var a=r(271),n=r(272),o=r.n(n),i=r(0),c=r.n(i),l=r(30),s=r.n(l),p=r(3),d=r(5),u=r.n(d),m=r(40),g=r.n(m),b=r(39),h=r.n(b),f=r(273),y=r.n(f);const O=new a.a,v=e=>o()(O.turndown(e.innerHTML).trim()),w=e=>{const{parentElement:t}=e;return"scroll"===getComputedStyle(e).overflowY?e:w(t)},j=e=>{w(e).scroll({top:e.offsetTop})},x=(e,t)=>{const r=u.a.split(e,t),a=[r.shift()];return u.a.forEach(r,(e,t)=>{a.push(e,c.a.createElement("br",{key:t}))}),a},k=async e=>{const t=await s()(e),[,r]=e.match(/https:\/\/twitter.com\/(.+)\/status/),[,a]=t.match(/<meta\s+property="og:title"\s+content="(.+)\s+on Twitter">/),n=t.match(/<meta\s+property="og:image"\s+content="(.+):large">/),o=t.match(/<meta\s+property="og:video:url"\s+content="(.+)">/),[,i]=t.match(/<meta\s+property="og:description"\s+content="“(.+)”">/),[,l]=t.match(/<img\s+class="ProfileAvatar-image\s+"\s+src="(.+)"\s+alt=".+">/),[,d]=t.match(/data-time-ms="(\d+)"/),m=g()(d).format("HH:mm - YYYY年MM月DD日");return c.a.createElement("a",{href:e,className:Object(p.a)({display:"block",width:500,color:"inherit",textDecoration:"none",cursor:"pointer"})},c.a.createElement("div",{className:Object(p.a)({borderRadius:4,border:"1px solid rgb(225, 232, 237)"})},c.a.createElement("div",{className:Object(p.a)({padding:16})},c.a.createElement("div",{className:Object(p.a)({paddingBottom:8})},c.a.createElement("div",{className:Object(p.a)({display:"flex",lineHeight:1.2})},c.a.createElement("img",{src:l,className:Object(p.a)({width:36,height:36,borderRadius:"50%",marginRight:8})}),c.a.createElement("div",{className:Object(p.a)({display:"flex",flexDirection:"column"})},c.a.createElement("span",{className:Object(p.a)({fontWeight:"bold"})},a),c.a.createElement("span",{className:Object(p.a)({color:"rgb(101, 119, 134)",fontSize:"0.9rem"})},"@",r)))),c.a.createElement("div",{className:Object(p.a)({video:{borderRadius:12,marginTop:8}})},x(i.trim(),/&#10;/),c.a.createElement("div",{className:Object(p.a)({color:"rgb(105, 120, 130)",fontSize:"0.9rem"})},m),n?c.a.createElement("img",{src:n[1],className:Object(p.a)({width:"100%",display:"block",borderRadius:12,marginTop:8})}):o?await(async e=>{const{track:{playbackUrl:t}}=JSON.parse(await s()(`https://api.twitter.com/1.1/videos/tweet/config/${e.match(/https:\/\/twitter.com\/i\/videos\/(\d+)/)[1]}.json`,{headers:{authorization:"Bearer AAAAAAAAAAAAAAAAAAAAAIK1zgAAAAAA2tUWuhGZ2JceoId5GwYWU5GspY4%3DUq7gzFoCZs1QfwGoVdvSac3IniczZEYXIcDyumCauIXpcAPorE"}})),r=u.a.nth(u.a.split(await s()(t),"\n"),-2),a=`_hls_${Date.now()}`,n=new MutationObserver(()=>{const e=new y.a;e.loadSource(h.a.resolve(t,r)),e.attachMedia(document.getElementById(a)),n.disconnect()});return n.observe(document.body,{childList:!0,subtree:!0}),c.a.createElement("video",{id:a,controls:!0})})(o[1]):null))))},E=async e=>{const t=await s()(e),[,r]=t.match(/<script\s+type="text\/javascript">window._sharedData\s+=([\s\S]+);<\/script>\s+<script\s+type="text\/javascript">window\.__initialDataLoaded\(window._sharedData\);<\/script>/),a=JSON.parse(r).entry_data.PostPage[0].graphql.shortcode_media;return c.a.createElement("a",{href:e,className:Object(p.a)({display:"block",width:500,color:"inherit",textDecoration:"none",cursor:"pointer"})},c.a.createElement("div",{className:Object(p.a)({border:"1px solid rgb(225, 232, 237)"})},c.a.createElement("div",{className:Object(p.a)({padding:8,display:"flex",fontSize:"0.9rem"})},c.a.createElement("img",{className:Object(p.a)({width:34,height:34,marginRight:8,borderRadius:"50%"}),src:a.owner.profile_pic_url}),c.a.createElement("div",null,c.a.createElement("div",{className:Object(p.a)({fontWeight:600})},a.owner.full_name),c.a.createElement("div",{className:Object(p.a)({color:"rgb(101, 119, 134)"})},"@",a.owner.username))),c.a.createElement("img",{className:Object(p.a)({display:"block"}),src:a.display_url}),c.a.createElement("div",{className:Object(p.a)({padding:10,lineHeight:"18px",fontSize:"0.9rem"})},x(a.edge_media_to_caption.edges[0].node.text,"\n"))))},S=async e=>{const t=await s()(e),[,r]=t.match(/<meta\s+property="og:image"\s+content="(.+)">/),[,a]=t.match(/<meta\s+property="og:site_name"\s+content="(.+)">/),[,n]=t.match(/<meta\s+property="og:description"\s+content="(.+)">/);return c.a.createElement("a",{href:e,className:Object(p.a)({textDecoration:"none",color:"inherit"})},c.a.createElement("div",{className:Object(p.a)({border:"1px solid rgb(229, 229, 229)",display:"flex"})},c.a.createElement("div",{className:Object(p.a)({backgroundImage:`url(${r})`,width:118,height:118,backgroundPosition:"50% 50%",backgroundRepeat:"no-repeat",backgroundSize:"cover"})}),c.a.createElement("div",{className:Object(p.a)({padding:22,width:"calc(100% - 118px)",boxSizing:"border-box"})},c.a.createElement("div",{className:Object(p.a)({fontSize:17,fontWeight:"bold",marginBottom:3,wordBreak:"break-all",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})},a),c.a.createElement("div",{className:Object(p.a)({fontSize:13,color:"rgb(115, 115, 115)",wordBreak:"break-all",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})},n),c.a.createElement("div",{className:Object(p.a)({fontSize:12,color:"rgb(200, 200, 200)",wordBreak:"break-all",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})},new URL(e).hostname))))}},39:function(e,t){e.exports=require("url")},4:function(e,t,r){"use strict";var a=r(654),n=r(12),o=r.n(n),i=r(94),c=r(16);t.a=Object(a.a)({INIT:async()=>{const e=await o.a.readFile(c.b,{encoding:"utf-8"});return{extraBlogsText:e,extraBlogs:await i.b.convertExtraBlogs(JSON.parse(e))}}},"ADD_ARTICLES","START_TO_LOAD_ARTICLES","SET_FILTER","TOGGLE_CHECKED","TOGGLE_FOLLOWING","SHOW_ARTICLE","SET_PREFERENCES_STATE","UPDATE_PREFERENCES","SET_SEARCH_VISIBLE","UPDATE_SEARCH_QUERY","UPDATE_PARSED_QUERY","CAN_LOAD_ARTICLES","UPDATE_OTHER_BLOGS")},458:function(e,t){e.exports=require("constants")},47:function(e,t,r){"use strict";r.d(t,"a",function(){return l});var a=r(32),n=r(110),o=r.n(n),i=r(5),c=r.n(i);class l extends(Object(a.b)({id:"",date:new Date,title:"",author:"",html:"",content:"",temporaryVisible:!1,url:"",filtered:!1,debug:!1})){constructor(...e){super(c.a.merge(...e,{id:o()()}))}visible(e,t){const{author:r,temporaryVisible:a,filtered:n}=this;return t.searched()?t.test(this)&&e.includes(r)&&!n||a:e.includes(r)&&!n||a}}},498:function(e,t){e.exports=require("zlib")},598:function(e,t){e.exports=require("events")},6:function(e,t){e.exports=require("path")},603:function(e,t){},652:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(111),i=r.n(o),c=r(280),l=r(20),s=r(84),p=r(655),d=r(4),u=r(32),m=r(5),g=r.n(m),b=r(47),h=r(16),f=r(136),y=r(12),O=r.n(y),v=r(6),w=r.n(v),j=r(40),x=r.n(j),k=r(94);function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),a.forEach(function(t){S(e,t,r[t])})}return e}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const C=[];h.e&&C.push(...g.a.map(f.a.parse(O.a.readFileSync(w.a.join(process.cwd(),"src/test-htmls/ameblo-emoji.html"),{encoding:"utf-8"})),e=>new b.a(E({},e,{date:x()(),debug:!0}))),...g.a.map(k.a.parse(O.a.readFileSync(w.a.join(process.cwd(),"src/test-htmls/nogi-emoji.html"),{encoding:"utf-8"})),e=>new b.a(E({},e,{date:x()(),debug:!0}))));var A=Object(p.a)({[d.a.addArticles]:(e,{payload:t})=>(g.a.forEach(t,t=>{g.a.forEach(t,t=>{e=e.push(t)})}),e.sortBy(({date:e})=>-e)),[d.a.showArticle]:(e,{payload:t})=>e.update(e.findIndex(({id:e})=>e===t),e=>e.set("temporaryVisible",!0)),[d.a.updateParsedQuery]:e=>e.map(e=>e.set("temporaryVisible",!1))},Object(u.a)(C));var z=Object(p.a)({[d.a.startToLoadArticles]:e=>e.set("_now",!0),[d.a.addArticles]:e=>e.set("_now",!1),[d.a.canLoadArticles]:(e,{payload:t})=>e.set("_can",t)},new class extends(Object(u.b)({_now:!1,_can:!0})){can(){const{_now:e,_can:t}=this;return!e&&t}now(){const{_now:e}=this;return e}}({_now:!0})),_=Object(p.a)({[d.a.setFilter]:(e,t)=>{const{payload:r}=t;return r}},-1);const N=w.a.join(h.a,"checked.json");O.a.existsSync(N)||O.a.writeJsonSync(N,[]);var P=Object(p.a)({[d.a.toggleChecked]:(e,{payload:t})=>{const r=e.indexOf(t),a=-1===r?e.push(t):e.delete(r);return O.a.writeJsonSync(N,a.toJS()),a}},Object(u.a)(O.a.readJsonSync(N)));const T=w.a.join(h.a,"following.json");O.a.existsSync(T)||O.a.writeJsonSync(T,[]);var q=Object(p.a)({[d.a.toggleFollowing]:(e,{payload:t})=>{const r=e.indexOf(t),a=-1===r?e.push(t):e.delete(r);return O.a.writeJsonSync(T,a.toJS()),a}},Object(u.a)(O.a.readJsonSync(T))),D=Object(p.a)({[d.a.setPreferencesState]:(e,t)=>{const{payload:r}=t;return r}},!1),R=Object(p.a)({[d.a.init]:(e,{payload:{extraBlogsText:t}})=>t,[d.a.updateOtherBlogs]:(e,{payload:t})=>t},""),L=r(274),I=r.n(L);class B extends(Object(u.b)({visible:!1,query:"",parsedQuery:{}})){static get KEYWORDS(){return["author","title","content","html"]}updateParsedQuery(e){const t=I.a.parse(e,{keywords:B.KEYWORDS});let r={};return"string"==typeof t?r={author:[],title:[],content:[],text:[t]}:g.a.forEach(g.a.concat("text",B.KEYWORDS),e=>{if(g.a.has(t,e)){const a=t[e];r[e]="string"==typeof a?[a]:a}else r[e]=[]}),this.set("parsedQuery",r)}searched(){const{parsedQuery:e,query:t}=this;return!g.a.isEmpty(e)&&t}test(e){const{parsedQuery:t}=this;return!this.searched()||g.a.some(B.KEYWORDS,r=>{const a=e.get(r);return g.a.some([r,"text"],e=>g.a.some(t[e],e=>a.indexOf(e)>=0))})}}var F=Object(p.a)({[d.a.setSearchVisible]:(e,{payload:t})=>e.set("visible",t),[d.a.updateSearchQuery]:(e,{payload:t})=>e.set("query",t),[d.a.updateParsedQuery]:(e,{payload:t})=>e.updateParsedQuery(t)},new B),M=Object(p.a)({[d.a.init]:(e,{payload:{extraBlogs:t}})=>e.addExtraBlogs(t),[d.a.addArticles]:(e,{payload:t})=>(g.a.forEach(t,({length:t},r)=>{t>0&&(e=e.updateIn(["slopes",r],e=>e.update("page",e=>e+1)))}),e)},new k.b),$=Object(s.c)({articles:A,loading:z,openFilterIndex:_,checked:P,following:q,openPreferences:D,extraBlogs:R,searchState:F,anyzaka:M}),U=r(275),Y=r.n(U);O.a.existsSync(h.a)||O.a.mkdirSync(h.a),O.a.existsSync(h.b)||O.a.writeJsonSync(h.b,{}),O.a.existsSync(h.c)&&O.a.removeSync(h.c),O.a.mkdirSync(h.c);const G=Object(s.d)($,Object(s.a)(Y.a)),H=document.querySelector("main");(()=>{const{default:e}=r(653);i.a.render(n.a.createElement(c.AppContainer,null,n.a.createElement(l.a,{store:G},n.a.createElement(e,null))),H)})()},653:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(17),i=r(3),c=r(4);const l=Object(i.a)({boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"}),s=Object(i.a)({height:22,WebkitAppRegion:"drag"}),p=Object(i.a)({width:220,height:"100%",boxSizing:"border-box"}),d=Object(i.a)({width:"calc(100% - 220px)",height:"100%"}),u="rgb(244, 143, 177)",m=Object(i.a)({margin:"0 8px 0px 24px"});var g,b=r(20);var h,f,y=Object(b.b)(({anyzaka:e})=>({anyzaka:e}))(g=class extends a.Component{render(){const{props:{name:e,size:t=48,css:r,anyzaka:a}}=this;return n.a.createElement("i",{className:Object(i.a)(r,{display:"inline-block",borderRadius:"50%",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url("file://${a.toMemberIconPath(e)}")`,width:t,height:t})})}})||g,O=r(67),v=r(33);let w=Object(b.b)(({following:e,checked:t,searchState:r})=>({following:e,checked:t,searchState:r}))((j=(f=class extends a.Component{onClickItem(){const{props:{article:e,following:t,searchState:r,dispatch:a}}=this;e.visible(t,r)||a(c.a.showArticle(e.id)),Object(v.e)(document.querySelector(`[data-article-id="${e.id}"]`))}render(){const{props:{article:e,following:t,checked:r,searchState:a}}=this,o=e.visible(t,a);return n.a.createElement("div",{onClick:this.onClickItem,className:Object(i.a)({overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer",padding:"0 8px",":hover":{backgroundColor:"rgba(255, 255, 255, 0.3)"}})},n.a.createElement(O.GoCheck,{style:{marginRight:4,verticalAlign:"middle",visibility:r.includes(e.url)?"visible":"hidden",opacity:o?1:.5}}),n.a.createElement(y,{name:e.author,size:24,css:Object(i.a)({verticalAlign:"middle",marginRight:4,opacity:o?1:.5})}),n.a.createElement("span",{className:Object(i.a)({opacity:o?1:.5})},e.title))}}).prototype,x="onClickItem",k=[o.a],E=Object.getOwnPropertyDescriptor(f.prototype,"onClickItem"),S=f.prototype,C={},Object.keys(E).forEach(function(e){C[e]=E[e]}),C.enumerable=!!C.enumerable,C.configurable=!!C.configurable,("value"in C||C.initializer)&&(C.writable=!0),C=k.slice().reverse().reduce(function(e,t){return t(j,x,e)||e},C),S&&void 0!==C.initializer&&(C.value=C.initializer?C.initializer.call(S):void 0,C.initializer=void 0),void 0===C.initializer&&(Object.defineProperty(j,x,C),C=null),h=f))||h;var j,x,k,E,S,C,A,z;class _ extends a.PureComponent{render(){const{props:{date:e}}=this;return n.a.createElement("div",{className:Object(i.a)(m,{borderBottom:"1px solid white"})},e.format("YYYY/MM/DD"))}}function N(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let P=Object(b.b)(({searchState:e,loading:t})=>({searchState:e,loading:t}))((N((z=class extends a.Component{constructor(){super(),this.$input=Object(a.createRef)(),this.timer=-1}onChange(e){const{currentTarget:{value:t}}=e,{props:{dispatch:r},timer:a}=this;clearTimeout(a),r(c.a.updateSearchQuery(t)),this.timer=setTimeout(()=>{r(c.a.updateParsedQuery(t))},300)}onFocus(){const{props:{dispatch:e}}=this;e(c.a.canLoadArticles(!1))}onBlur(){const{props:{dispatch:e}}=this;e(c.a.canLoadArticles(!0))}onClick(){const{$input:{current:e}}=this;e.focus()}render(){const{props:{searchState:e}}=this;return n.a.createElement("div",{onClick:this.onClick,className:Object(i.a)({backgroundColor:"rgb(0, 0, 0, 0.1)",borderRadius:4,padding:"4px 8px",marginBottom:8,boxSizing:"border-box",display:"flex",alignItems:"center"})},n.a.createElement(O.GoSearch,null),n.a.createElement("input",{value:e.get("query"),onChange:this.onChange,onFocus:this.onFocus,onBlur:this.onBlur,ref:this.$input,type:"text",spellCheck:!1,className:Object(i.a)({font:"inherit",display:"block",border:"none",outline:"none",width:"100%",color:"white",padding:0,marginLeft:8,backgroundColor:"transparent"})}))}}).prototype,"onChange",[o.a],Object.getOwnPropertyDescriptor(z.prototype,"onChange"),z.prototype),N(z.prototype,"onFocus",[o.a],Object.getOwnPropertyDescriptor(z.prototype,"onFocus"),z.prototype),N(z.prototype,"onBlur",[o.a],Object.getOwnPropertyDescriptor(z.prototype,"onBlur"),z.prototype),N(z.prototype,"onClick",[o.a],Object.getOwnPropertyDescriptor(z.prototype,"onClick"),z.prototype),A=z))||A;var T;let q=Object(b.b)(({articles:e,searchState:t})=>({articles:e,searchState:t}))(T=class extends a.Component{render(){const{props:{articles:e,searchState:t}}=this,r=[],{size:a}=e;let o=null;for(let i=0;i<a;i+=1){const a=e.get(i);t.searched()&&null!==a&&!t.test(a)||(null===o?r.push(n.a.createElement(_,{key:`d${a.id}`,date:a.date})):o.date.get("day")!==a.date.get("day")&&r.push(n.a.createElement(_,{key:`d${a.id}`,date:a.date})),r.push(n.a.createElement(w,{article:a,key:a.id})),o=a)}return n.a.createElement("div",{className:Object(i.a)(p,l,{display:"flex",flexDirection:"column",backgroundColor:u,color:"white"})},n.a.createElement("div",{className:s}),n.a.createElement("div",{className:m},n.a.createElement(P,null)),n.a.createElement("div",{className:Object(i.a)({overflowY:"scroll",flex:1})},r))}})||T;var D,R,L=r(85),I=r(12),B=r.n(I),F=r(276),M=r.n(F),$=r(140),U=(r(187),r(620),r(622),r(16));function Y(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let G=Object(b.b)(({openPreferences:e,extraBlogs:t})=>({openPreferences:e,extraBlogs:t}))((Y((R=class extends a.Component{onClickSaveButton(){const{props:{extraBlogs:e}}=this;try{JSON.parse(e),B.a.writeFileSync(U.b,e),location.reload()}catch(e){$.b.error(String(e),{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!1})}}onChange(e){const{props:{dispatch:t}}=this;t(c.a.updateOtherBlogs(e))}render(){const{props:{openPreferences:e,extraBlogs:t}}=this;return e?n.a.createElement("div",{className:Object(i.a)({position:"fixed",left:0,top:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.435)",display:"flex",justifyContent:"center",alignItems:"center"})},n.a.createElement("div",{className:Object(i.a)(l,{backgroundColor:"white",width:"55%",position:"relative"})},n.a.createElement("div",{className:Object(i.a)(l,{backgroundColor:u,color:"white",padding:16,display:"flex",justifyContent:"space-between",alignItems:"center"})},n.a.createElement("span",{className:Object(i.a)({fontSize:"2rem"})},"Preferences")),n.a.createElement("div",{className:Object(i.a)({padding:24})},n.a.createElement(M.a,{value:t,onChange:this.onChange,mode:"json",theme:"github",showGutter:!1,style:{width:"100%",height:160,border:"1px solid rgb(230, 236, 240)"},editorProps:{$blockScrolling:!0}})),n.a.createElement("div",{className:Object(i.a)({padding:"4px 6px",textAlign:"right"})},n.a.createElement("span",{onClick:this.onClickSaveButton,className:Object(i.a)(l,{margin:"6px 0",padding:"0 16px",lineHeight:"36px",display:"inline-block",backgroundColor:u,color:"white",cursor:"pointer"})},"SAVE & RELOAD")))):null}}).prototype,"onClickSaveButton",[o.a],Object.getOwnPropertyDescriptor(R.prototype,"onClickSaveButton"),R.prototype),Y(R.prototype,"onChange",[o.a],Object.getOwnPropertyDescriptor(R.prototype,"onChange"),R.prototype),D=R))||D;var H,W,J=r(5),Q=r.n(J);function V(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}const K=({article:{date:e,author:t,title:r,url:a},color:o})=>n.a.createElement("div",{className:Object(i.a)({backgroundColor:o,color:"white",padding:"16px 67px",position:"relative"})},n.a.createElement(y,{name:t,size:43,css:Object(i.a)({position:"absolute",left:16,top:16})}),n.a.createElement("div",null,n.a.createElement("div",null,e.format("YYYY/MM/DD HH:mm:ss")),n.a.createElement("div",{className:Object(i.a)({fontSize:20,fontWeight:"bold",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"})},n.a.createElement("a",{href:a,className:Object(i.a)({color:"white",textDecoration:"none",":hover":{textDecoration:"underline"}})},r))));var X,Z,ee=Object(b.b)(({checked:e,following:t,searchState:r,anyzaka:a})=>({checked:e,following:t,searchState:r,anyzaka:a}))((V((W=class extends a.Component{constructor(){super(),this.$base=Object(a.createRef)()}onClickCheck(){const{props:{dispatch:e,article:{url:t}}}=this,{$base:{current:r}}=this;e(c.a.toggleChecked(t)),Object(v.e)(r)}onClickLink(e){e.preventDefault();const{currentTarget:{href:t}}=e;L.shell.openExternal(t)}componentDidMount(){const{$base:{current:e}}=this;Q.a.forEach(e.querySelectorAll("a"),e=>{e.addEventListener("click",this.onClickLink)})}render(){const{props:{article:e,checked:t,following:r,searchState:a,css:o="",anyzaka:c}}=this,{author:s,html:p,url:d,id:u,debug:m}=e,g=m?"gray":c.getGroupColorFromMember(s),b=m||!t.includes(d);return n.a.createElement("div",{className:Object(i.a)(o,l,m||e.visible(r,a)?null:{height:0,marginBottom:0,overflow:"hidden"},{position:"relative"}),ref:this.$base,"data-article-id":u},n.a.createElement(K,{article:e,color:g}),n.a.createElement("div",{className:Object(i.a)({padding:"0 16px 16px",position:"relative",'img:not([alt="emoji"])':{maxWidth:"100%",display:"block"},video:{maxWidth:"100%",display:"block"},display:b?"block":"none"})},n.a.createElement("div",{className:Object(i.a)({"p:last-child":{marginBottom:0}}),dangerouslySetInnerHTML:{__html:p}})),n.a.createElement(O.GoCheck,{size:43,onClick:this.onClickCheck,className:Object(i.a)({position:"absolute",right:16,bottom:16,cursor:"pointer"},b?{fill:"lightgray","&:hover":{fill:g}}:{fill:"white"})}))}}).prototype,"onClickCheck",[o.a],Object.getOwnPropertyDescriptor(W.prototype,"onClickCheck"),W.prototype),V(W.prototype,"onClickLink",[o.a],Object.getOwnPropertyDescriptor(W.prototype,"onClickLink"),W.prototype),H=W))||H,te=r(279);function re(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let ae=Object(b.b)(({openFilterIndex:e,following:t,anyzaka:r})=>({openFilterIndex:e,following:t,anyzaka:r}))((re((Z=class extends a.Component{onClickFilter(e){const{currentTarget:{dataset:{strkey:t}}}=e,{props:{dispatch:r,openFilterIndex:a}}=this,n=parseInt(t);r(c.a.setFilter(n===a?-1:n))}onClickFilterMember(e){const{props:{dispatch:t}}=this,{currentTarget:{dataset:{member:r}}}=e;t(c.a.toggleFollowing(r))}render(){const{props:{following:e,openFilterIndex:t,anyzaka:r}}=this,a=r.get("slopes");return n.a.createElement("div",{className:Object(i.a)(l,{padding:8})},n.a.createElement("div",{className:Object(i.a)({marginBottom:4})},a.map((r,a)=>n.a.createElement("span",{onClick:this.onClickFilter,key:a,"data-strkey":a,className:Object(i.a)({color:r.get("color"),cursor:"pointer",i:{verticalAlign:"middle"}})},t===a?n.a.createElement(O.GoTriangleDown,{className:Object(i.a)({verticalAlign:"middle"})}):n.a.createElement(O.GoTriangleRight,{className:Object(i.a)({verticalAlign:"middle"})}),n.a.createElement("span",{className:Object(i.a)({fontWeight:"bold",marginRight:2,verticalAlign:"middle"})},r.get("name")),r.get("members").map(r=>e.includes(r)&&t!==a?n.a.createElement(y,{name:r,size:24,key:r}):null)))),n.a.createElement("div",{className:Object(i.a)({display:"flex",flexWrap:"wrap"})},a.map((r,a)=>t===a?r.get("members").map(t=>n.a.createElement("div",{onClick:this.onClickFilterMember,key:t,"data-member":t,className:Object(i.a)(l,{display:"flex",alignItems:"center",marginRight:8,marginBottom:8,padding:4,borderRadius:4,cursor:"pointer",opacity:e.includes(t)?1:.5,"> :first-of-type":{marginRight:4}})},n.a.createElement(y,{name:t,size:36}),n.a.createElement("span",null,t))):null)))}}).prototype,"onClickFilter",[o.a],Object.getOwnPropertyDescriptor(Z.prototype,"onClickFilter"),Z.prototype),re(Z.prototype,"onClickFilterMember",[o.a],Object.getOwnPropertyDescriptor(Z.prototype,"onClickFilterMember"),Z.prototype),X=Z))||X;var ne,oe;function ie(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let ce=Object(b.b)(({articles:e,loading:t,anyzaka:r})=>({articles:e,loading:t,anyzaka:r}))((ie((oe=class extends a.Component{constructor(){super(),this.$loading=Object(a.createRef)(),this.$articles=Object(a.createRef)(),this.prevloadingIsVisible=!0}async fetch(){const{props:{anyzaka:e}}=this,t=e.get("slopes"),{size:r}=t;let a=[];for(let e=0;e<r;e+=1){const r=t.get(e);a.push(await(r.has("fetch")?r.get("fetch")(r):r.get("_fetcher").fetch(r)).catch(e=>(console.error(`Failed to fetch (${r.get("name")})`,e),[])))}return a}componentDidMount(){const{props:{dispatch:e}}=this;e(c.a.init()).then(()=>{e(c.a.addArticles(this.fetch())),this.watchLoading()})}loadAndAddArticles(){const{props:{dispatch:e}}=this;e(c.a.startToLoadArticles()),e(c.a.addArticles(this.fetch()))}onClickResetFilter(){const{props:{dispatch:e}}=this;e(c.a.setFilter(-1))}watchLoading(){const{$loading:{current:e},prevloadingIsVisible:t,props:{loading:r}}=this,{top:a}=e.getBoundingClientRect(),n=innerHeight>=a;!t&&n&&r.can()&&this.loadAndAddArticles(),this.prevloadingIsVisible=n,requestAnimationFrame(this.watchLoading)}onClickLoad(){this.loadAndAddArticles()}render(){const{props:{articles:e,loading:t}}=this;return n.a.createElement("div",{className:Object(i.a)(d,{display:"flex",flexDirection:"column"})},n.a.createElement("div",{className:s}),n.a.createElement("div",{ref:this.$articles,onClick:this.onClickResetFilter,className:Object(i.a)({flex:1,overflow:"scroll",position:"relative"})},n.a.createElement("div",{className:Object(i.a)({minWidth:960,padding:16,marginLeft:"auto",marginRight:"auto"})},e.map(e=>n.a.createElement(ee,{article:e,key:e.id,css:Object(i.a)({marginBottom:16})})),n.a.createElement("div",{ref:this.$loading,className:Object(i.a)({margin:"16px 0",textAlign:"center"})},t.now()?n.a.createElement(te.BeatLoader,{css:Object(i.a)({display:"inline-block"})}):n.a.createElement("div",{onClick:this.onClickLoad,className:Object(i.a)({color:"rgb(233, 30, 99)",border:"1px solid rgb(233, 30, 99)",padding:"4px 8px",borderRadius:4,cursor:"pointer"})},"さらに記事を読み込む")))),n.a.createElement(ae,null))}}).prototype,"onClickResetFilter",[o.a],Object.getOwnPropertyDescriptor(oe.prototype,"onClickResetFilter"),oe.prototype),ie(oe.prototype,"watchLoading",[o.a],Object.getOwnPropertyDescriptor(oe.prototype,"watchLoading"),oe.prototype),ie(oe.prototype,"onClickLoad",[o.a],Object.getOwnPropertyDescriptor(oe.prototype,"onClickLoad"),oe.prototype),ne=oe))||ne;var le,se;let pe=Object(b.b)()((function(e,t,r,a,n){var o={};Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null)}((se=class extends a.PureComponent{constructor(){super(),L.ipcRenderer.on("menu:preferences",this.onClickPreferencesOfMenuItem)}onClickPreferencesOfMenuItem(){const{props:{dispatch:e}}=this;e(c.a.setPreferencesState(!0))}render(){return n.a.createElement("div",{className:Object(i.a)({width:"100%",height:"100%",display:"flex",flexDirection:"row"})},n.a.createElement(q,null),n.a.createElement(ce,null),n.a.createElement(G,null),n.a.createElement($.a,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnVisibilityChange:!0,draggable:!1,pauseOnHover:!0}))}}).prototype,"onClickPreferencesOfMenuItem",[o.a],Object.getOwnPropertyDescriptor(se.prototype,"onClickPreferencesOfMenuItem"),se.prototype),le=se))||le;t.default=pe},70:function(e,t){e.exports=require("assert")},83:function(e,t){e.exports=require("stream")},85:function(e,t){e.exports=require("electron")},94:function(e,t,r){"use strict";var a=r(112),n=r(5),o=r.n(n),i=r(16),c=r(6),l=r.n(c),s=r(30),p=r.n(s),d=r(47),u=r(33),m=r(39),g=r.n(m),b=r(40),h=r.n(b),f=r(95),y=r.n(f),O=r(113),v=r(0),w=r.n(v);function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),a.forEach(function(t){x(e,t,r[t])})}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const k=new DOMParser;var E=new class{constructor(){}getURL(e){return`https://lineblog.me/${e}`}async idToImageUrlAndName(e){const t=await p()(this.getURL(e)),r=k.parseFromString(t,"text/html");return{name:r.querySelector("h2").innerText,url:r.querySelector(".profile-photo-thumbnail img").src}}async fetch(e){const t=[],r=e.get("_ids"),{size:a}=r,n=e.get("page");for(let o=0;o<a;o+=1){const a=e.getIn(["_optionsList",o]),i=a.get("multi"),c=a.get("filters");for(let e=0;e<i;e+=1){const a=await p()(y()(this.getURL(r.get(o)),`?p=${n*i+e}`)),l=k.parseFromString(a,"text/html");for(const e of l.querySelectorAll(".article")){const r=e.querySelector(".article-title a"),a={};let n=e.querySelector(".article-body");for(const e of n.querySelectorAll(".lineemoji"))e.alt="emoji";for(const e of n.querySelectorAll(".twitter-tweet")){const t=`_tweet_${Date.now()}`;a[t]=Object(O.renderToStaticMarkup)(await Object(u.d)(e.children[1].href)),e.outerHTML=t}for(const e of n.querySelectorAll(".instagram-media")){const t=`_instagram_${Date.now()}`;a[t]=Object(O.renderToStaticMarkup)(await Object(u.b)(e.dataset.instgrmPermalink)),e.outerHTML=t}for(const e of n.querySelectorAll(".uploaded-video")){const{src:t}=e.querySelector("source"),r=`_video_${Date.now()}`;a[r]=Object(O.renderToStaticMarkup)(w.a.createElement("p",null,w.a.createElement("video",{controls:!0,src:t}))),e.outerHTML=r}for(const e of n.querySelectorAll(".ogpLink")){const t=`_ogp_${Date.now()}`;a[t]=Object(O.renderToStaticMarkup)(await Object(u.c)(e.href)),e.outerHTML=t}const o={date:h()(e.querySelector(".article-date").innerText),title:r.innerText,author:l.querySelector("h2").innerText,content:n.innerText,html:Object(u.a)(n).replace(/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,(e,t)=>`<img src="${t}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="emoji">`).replace(/<p>(_(video|instagram|tweet|ogp)_\d+)<\/p>/g,(e,t)=>a[t]),url:r.href};t.push(new d.a(j({},o,{filtered:c.some(e=>null===o[e.get(0)].match(e.get(1)))})))}}}return t}},S=r(136),C=r(12),A=r.n(C),z=r(32);r.d(t,"a",function(){return N}),r.d(t,"b",function(){return P});const _=new DOMParser;class N{static parse(e){const t=_.parseFromString(e,"text/html"),r=t.querySelectorAll(".author"),a=t.querySelectorAll("h1 .entrytitle"),n=t.querySelectorAll(".entrybody"),o=t.querySelectorAll(".entrybottom"),i=t.querySelectorAll("#siderecententry .inner li:not(.last) a"),{length:c}=o,l=[];for(let e=0;e<c;e+=1){const t=n[e];l.push({date:h()(o[e].childNodes[0].nodeValue.slice(0,-1)),title:a[e].innerText,author:r[e].innerText.replace(/\s/g,""),html:Object(u.a)(t),content:t.innerText,url:(i[e]?i[e]:a[e].querySelector("a")).href})}return l}static async fetch(e){return o.a.map(N.parse(await p()(`http://blog.nogizaka46.com/?p=${e.get("page")}`)),e=>new d.a(e))}}o.a.find(a,{name:"乃木坂46"})._fetcher=N,o.a.find(a,{name:"欅坂46"}).fetch=(async e=>{const t=`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${e.get("page")}`,r=await p()(t);return o.a.map(_.parseFromString(r,"text/html").querySelectorAll("article"),e=>{const{innerText:r}=e.querySelector(".box-bottom li"),a=e.querySelector("h3 a"),{innerText:n}=e.querySelector(".name"),o=e.querySelector(".box-article");return new d.a({date:h()(r),title:a.innerText.trim(),author:n.replace(/\s/g,""),html:Object(u.a)(o),content:o.innerText,url:g.a.resolve(t,a.pathname)})})}),o.a.find(a,{name:"日向坂46"}).fetch=(async e=>{const t=`https://www.hinatazaka46.com/s/official/diary/member/list?page=${e.get("page")}`,r=await p()(t);return o.a.map(_.parseFromString(r,"text/html").querySelectorAll(".p-blog-article"),e=>{const r=e.querySelector(".c-blog-article__text");return new d.a({date:h()(e.querySelector(".c-blog-article__date").innerText),title:e.querySelector(".c-blog-article__title").innerText.trim(),author:e.querySelector(".c-blog-article__name").innerText.replace(/\s/g,""),html:Object(u.a)(r),content:r.innerText,url:g.a.resolve(t,e.querySelector(".c-button-blog-detail").pathname)})})});class P extends(Object(z.b)({slopes:Object(z.c)(a)})){static async convertExtraBlogs(e){const t={},r={line:{name:"LINE BLOG",color:"rgb(90, 196, 127)",_fetcher:E,page:1},ameblo:{name:"Ameba Blog",color:"rgb(45, 140, 60)",_fetcher:S.a,page:1}};for(const a of o.a.keys(e))if(!o.a.has(t,a)){t[a]=o.a.merge({_ids:[],_key:a,_optionsList:[],members:[],extra:!0},r[a]);for(let n of e[a]){"string"==typeof n&&(n=[n,{}]);const[e,c]=n,{url:s,name:d}=await r[a]._fetcher.idToImageUrlAndName(e);await A.a.writeFile(l.a.join(i.c,`${d}.jpg`),await p()(s,{encoding:null})),t[a]._optionsList.push(o.a.update(o.a.merge({multi:1,filters:[]},c),"filters",e=>o.a.map(e,([e,t])=>[e,new RegExp(t)]))),t[a]._ids.push(e),t[a].members.push(d)}}return Object(z.c)(o.a.values(t))}addExtraBlogs(e){let{slopes:t}=this;return e.forEach(e=>{t=t.filter(t=>t.get("name")!==e.get("name")).push(e)}),this.set("slopes",t)}getGroupColorFromMember(e){const{slopes:t}=this,{size:r}=t;let a=null;for(let n=0;n<r;n+=1){const r=t.get(n);if(r.get("members").includes(e)){a=r.get("color");break}}return a}toMemberIconPath(e){const{slopes:t}=this,{size:r}=t;let a=l.a.join(i.d,"fallback.png");for(let n=0;n<r;n+=1){const r=t.get(n);if(r.get("members").includes(e)){a=l.a.join(r.get("extra")?i.c:i.d,`${e}.jpg`);break}}return a}}}});