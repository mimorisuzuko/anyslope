!function(e){function t(t){for(var a,i,c=t[0],l=t[1],s=t[2],d=0,u=[];d<c.length;d++)i=c[d],n[i]&&u.push(n[i][0]),n[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(p&&p(t);u.length;)u.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,c=1;c<r.length;c++){var l=r[c];0!==n[l]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={0:0},o=[];function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="http://localhost:3000/";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var p=l;o.push([279,1]),r()}({106:function(e,t){e.exports=require("fs")},124:function(e,t){e.exports=require("net")},125:function(e,t){e.exports=require("http")},13:function(e,t){e.exports=require("util")},168:function(e,t){e.exports=require("punycode")},17:function(e,t){e.exports=require("crypto")},170:function(e,t){e.exports=require("https")},171:function(e,t){e.exports=require("querystring")},229:function(e,t){e.exports=require("buffer")},236:function(e,t){e.exports=require("tls")},268:function(e){e.exports=[{name:"日向坂46",color:"rgb(81, 182, 224)",members:["井口眞緒","潮紗理菜","柿崎芽実","影山優佳","加藤史帆","齊藤京子","佐々木久美","佐々木美玲","高瀬愛奈","高本彩花","東村芽依","金村美玖","河田陽菜","小坂菜緒","富田鈴花","丹生明里","濱岸ひより","松田好花","宮田愛萌","渡邉美穂","上村ひなの"]},{name:"欅坂46",color:"rgb(84, 176, 74)",members:["石森虹花","上村莉菜","尾関梨香","織田奈那","小池美波","小林由依","齋藤冬優花","佐藤詩織","菅井友香","鈴本美愉","長沢菜々香","長濱ねる","土生瑞穂","原田葵","平手友梨奈","守屋茜","渡辺梨加","渡邉理佐","井上梨名","関有美子","武元唯衣","田村保乃","藤吉夏鈴","松田里奈","松平璃子","森田ひかる","山﨑天"]},{name:"乃木坂46",color:"rgb(118, 37, 133)",members:["秋元真夏","生田絵梨花","伊藤かりん","伊藤純奈","伊藤理々杏","井上小百合","岩本蓮加","梅澤美波","大園桃子","北野日奈子","久保史緒里","齋藤飛鳥","斉藤優里","阪口珠美","桜井玲香","佐々木琴子","佐藤楓","白石麻衣","新内眞衣","鈴木絢音","高山一実","寺田蘭世","中田花奈","中村麗乃","樋口日奈","星野みなみ","堀未央奈","松村沙友理","向井葉月","山崎怜奈","山下美月","吉田綾乃クリスティー","与田祐希","渡辺みり愛","和田まあや","遠藤さくら","賀喜遥香","掛橋沙耶香","金川紗耶","北川悠理","柴田柚菜","清宮レイ","田村真佑","筒井あやめ","早川聖来","矢久保美緒","運営スタッフ","４期生"]}]},279:function(e,t,r){r(280),e.exports=r(654)},32:function(e,t,r){"use strict";r.d(t,"a",function(){return O}),r.d(t,"d",function(){return j}),r.d(t,"c",function(){return k}),r.d(t,"b",function(){return E});var a=r(269),n=r(270),o=r.n(n),i=r(0),c=r.n(i),l=r(29),s=r.n(l),p=r(3),d=r(5),u=r.n(d),m=r(54),h=r.n(m),b=r(38),g=r.n(b),f=r(187),y=r.n(f);const v=new a.a,O=e=>o()(v.turndown(e.innerHTML).trim()),w=e=>{const{parentElement:t}=e;return"scroll"===getComputedStyle(e).overflowY?e:w(t)},j=e=>{w(e).scroll({top:e.offsetTop})},x=(e,t)=>{const r=u.a.split(e,t),a=[r.shift()];return u.a.forEach(r,(e,t)=>{a.push(e,c.a.createElement("br",{key:t}))}),a},k=async e=>{const t=await s()(e),[,r]=e.match(/https:\/\/twitter.com\/(.+)\/status/),[,a]=t.match(/<meta\s+property="og:title"\s+content="(.+)\s+on Twitter">/),n=t.match(/<meta\s+property="og:image"\s+content="(.+):large">/),o=t.match(/<meta\s+property="og:video:url"\s+content="(.+)">/),[,i]=t.match(/<meta\s+property="og:description"\s+content="“(.+)”">/),[,l]=t.match(/<img\s+class="ProfileAvatar-image\s+"\s+src="(.+)"\s+alt=".+">/),[,d]=t.match(/data-time-ms="(\d+)"/),m=h()(d).format("HH:mm - YYYY年MM月DD日");return c.a.createElement("a",{href:e,className:Object(p.a)({display:"block",width:500,color:"inherit",textDecoration:"none",cursor:"pointer"})},c.a.createElement("div",{className:Object(p.a)({borderRadius:4,border:"1px solid rgb(225, 232, 237)"})},c.a.createElement("div",{className:Object(p.a)({padding:16})},c.a.createElement("div",{className:Object(p.a)({paddingBottom:8})},c.a.createElement("div",{className:Object(p.a)({display:"flex",lineHeight:1.2})},c.a.createElement("img",{src:l,className:Object(p.a)({width:36,height:36,borderRadius:"50%",marginRight:8})}),c.a.createElement("div",{className:Object(p.a)({display:"flex",flexDirection:"column"})},c.a.createElement("span",{className:Object(p.a)({fontWeight:"bold"})},a),c.a.createElement("span",{className:Object(p.a)({color:"rgb(101, 119, 134)",fontSize:"0.9rem"})},"@",r)))),c.a.createElement("div",{className:Object(p.a)({video:{borderRadius:12,marginTop:8}})},x(i.trim(),/&#10;/),c.a.createElement("div",{className:Object(p.a)({color:"rgb(105, 120, 130)",fontSize:"0.9rem"})},m),n?c.a.createElement("img",{src:n[1],className:Object(p.a)({width:"100%",display:"block",borderRadius:12,marginTop:8})}):o?await(async e=>{const{track:{playbackUrl:t}}=JSON.parse(await s()(`https://api.twitter.com/1.1/videos/tweet/config/${e.match(/https:\/\/twitter.com\/i\/videos\/(\d+)/)[1]}.json`,{headers:{authorization:"Bearer AAAAAAAAAAAAAAAAAAAAAIK1zgAAAAAA2tUWuhGZ2JceoId5GwYWU5GspY4%3DUq7gzFoCZs1QfwGoVdvSac3IniczZEYXIcDyumCauIXpcAPorE"}})),r=u.a.nth(u.a.split(await s()(t),"\n"),-2),a=document.createElement("video"),n=`_hls_${Date.now()}`;a.controls=!0;const o=new y.a;return o.loadSource(g.a.resolve(t,r)),o.attachMedia(a),o.on(y.a.Events.MANIFEST_PARSED,()=>{const e=new MutationObserver(()=>{const t=document.getElementById(n);t&&(t.replaceWith(a),e.disconnect())});e.observe(document.body,{childList:!0,subtree:!0})}),c.a.createElement("div",{id:n})})(o[1]):null))))},E=async e=>{const t=await s()(e),[,r]=t.match(/<script\s+type="text\/javascript">window._sharedData\s+=([\s\S]+);<\/script>\s+<script\s+type="text\/javascript">window\.__initialDataLoaded\(window._sharedData\);<\/script>/),a=JSON.parse(r).entry_data.PostPage[0].graphql.shortcode_media;return c.a.createElement("a",{href:e,className:Object(p.a)({display:"block",width:500,color:"inherit",textDecoration:"none",cursor:"pointer"})},c.a.createElement("div",{className:Object(p.a)({border:"1px solid rgb(225, 232, 237)"})},c.a.createElement("div",{className:Object(p.a)({padding:8,display:"flex",fontSize:"0.9rem"})},c.a.createElement("img",{className:Object(p.a)({width:34,height:34,marginRight:8,borderRadius:"50%"}),src:a.owner.profile_pic_url}),c.a.createElement("div",null,c.a.createElement("div",{className:Object(p.a)({fontWeight:600})},a.owner.full_name),c.a.createElement("div",{className:Object(p.a)({color:"rgb(101, 119, 134)"})},"@",a.owner.username))),c.a.createElement("img",{className:Object(p.a)({display:"block"}),src:a.display_url}),c.a.createElement("div",{className:Object(p.a)({padding:10,lineHeight:"18px",fontSize:"0.9rem"})},x(a.edge_media_to_caption.edges[0].node.text,"\n"))))}},38:function(e,t){e.exports=require("url")},4:function(e,t,r){"use strict";var a=r(656),n=r(5),o=r.n(n),i=r(29),c=r.n(i),l=r(33),s=r(108),p=r.n(s);class d extends(Object(l.b)({id:"",date:new Date,title:"",author:"",contentHtml:"",content:"",temporaryVisible:!1,url:""})){constructor(...e){super(o.a.merge(...e,{id:p()()}))}visible(e,t){const{author:r,temporaryVisible:a}=this;return t.searched()?t.test(this)&&e.includes(r)||a:e.includes(r)||a}}var u=r(43),m=r(32),h=r(38),b=r.n(h),g=r(54),f=r.n(g);const y=new DOMParser,v=async({_fetcher:e,_ids:t,_optionsList:r},a)=>{const n=[],{length:o}=t;for(let i=0;i<o;i+=1)n.push(...await e.fetch(t[i],a,r[i]));return n},O=async(e=0)=>{const t=await c()(`http://blog.nogizaka46.com/?p=${e+1}`),r=y.parseFromString(t,"text/html"),a=r.querySelectorAll(".author"),n=r.querySelectorAll("h1 .entrytitle a"),o=r.querySelectorAll(".entrybody"),i=r.querySelectorAll(".entrybottom"),{length:l}=i,s=[];for(let e=0;e<l;e+=1){const t=o[e];s.push(new d({date:f()(i[e].childNodes[0].nodeValue.slice(0,-1)),title:n[e].innerText,author:a[e].innerText.replace(/\s/g,""),contentHtml:Object(m.a)(t),content:t.innerText,url:n[e].href}))}return s},w=async(e=0)=>{const t=`http://www.keyakizaka46.com/s/k46o/diary/member/list?page=${e}`,r=await c()(t);return o.a.map(y.parseFromString(r,"text/html").querySelectorAll("article"),e=>{const{innerText:r}=e.querySelector(".box-bottom li"),a=e.querySelector("h3 a"),{innerText:n}=e.querySelector(".name"),o=e.querySelector(".box-article");return new d({date:f()(r),title:a.innerText.trim(),author:n.replace(/\s/g,""),contentHtml:Object(m.a)(o),content:o.innerText,url:b.a.resolve(t,a.pathname)})})},j=async(e=0)=>{const t=`https://www.hinatazaka46.com/s/official/diary/member/list?page=${e}`,r=await c()(t);return o.a.map(y.parseFromString(r,"text/html").querySelectorAll(".p-blog-article"),e=>{const r=e.querySelector(".c-blog-article__text");return new d({date:f()(e.querySelector(".c-blog-article__date").innerText),title:e.querySelector(".c-blog-article__title").innerText.trim(),author:e.querySelector(".c-blog-article__name").innerText.replace(/\s/g,""),contentHtml:Object(m.a)(r),content:r.innerText,url:b.a.resolve(t,e.querySelector(".c-button-blog-detail").pathname)})})};var x=r(16),k=r.n(x),E=r(6),S=r.n(E),C=r(53),A=r.n(C),_=r(92),N=r(131),P=r.n(N),T=r(137),z=r(0),q=r.n(z);const D=new DOMParser;var L=new class{constructor(){}getURL(e){return`https://lineblog.me/${e}`}async idToImageUrlAndName(e){const t=await c()(this.getURL(e)),r=D.parseFromString(t,"text/html");return{name:r.querySelector("h2").innerText,url:r.querySelector(".profile-photo-thumbnail img").src}}async fetch(e,t,r){const{pages:a}=r,n=[];for(let r=0;r<a;r+=1){const o=await c()(P()(this.getURL(e),`?p=${t*a+r+1}`)),i=D.parseFromString(o,"text/html");for(const e of i.querySelectorAll(".article")){const t=e.querySelector(".article-title a"),r={};let a=e.querySelector(".article-body");for(const e of a.querySelectorAll(".lineemoji"))e.alt="lineemoji";for(const e of a.querySelectorAll(".twitter-tweet")){const t=`_tweet_${Date.now()}`;r[t]=Object(T.renderToStaticMarkup)(await Object(m.c)(e.children[1].href)),e.outerHTML=t}for(const e of a.querySelectorAll(".instagram-media")){const t=`_instagram_${Date.now()}`;r[t]=Object(T.renderToStaticMarkup)(await Object(m.b)(e.dataset.instgrmPermalink)),e.outerHTML=t}for(const e of a.querySelectorAll(".uploaded-video")){const{src:t}=e.querySelector("source"),a=`_video_${Date.now()}`;r[a]=Object(T.renderToStaticMarkup)(q.a.createElement("p",null,q.a.createElement("video",{controls:!0,src:t}))),e.outerHTML=a}n.push(new d({date:f()(e.querySelector(".article-date").innerText),title:t.innerText,author:i.querySelector("h2").innerText,content:a.innerText,contentHtml:Object(m.a)(a).replace(/<img\s+src="(https:\/\/parts\.lineblog\.me\/img\/emoji\/line\/\d+\/\d+\.png)"\s+alt="lineemoji">/g,(e,t)=>`<img src="${t}" style="width:1.3em;height:1.3em;position:relative;top:0.2em;" alt="lineemoji">`).replace(/<p>(_(video|instagram|tweet)_\d+)<\/p>/g,(e,t)=>r[t]),url:t.href}))}}return n}};const R=new DOMParser;var I=new class{constructor(){}getURL(e){return`https://ameblo.jp/${e}/`}async idToImageUrlAndName(e){const t=await c()(this.getURL(e)),r=R.parseFromString(t,"text/html");return{name:r.querySelector(".skin-profileName").innerText,url:r.querySelector(".skin-profileAvatar img").src}}async fetch(e,t,r){const{pages:a}=r,n=[];for(let r=0;r<a;r+=1){const i=await c()(P()(this.getURL(e),`/page-${t*a+r+1}.html`)),l=R.parseFromString(i,"text/html");for(const e of l.querySelectorAll(".skin-entry.js-entryWrapper")){const t=e.querySelector("a.skinArticleTitle"),r=e.querySelector(".skin-entryBody");n.push(new d({date:f()(o.a.nth(e.querySelector(".skin-textQuiet").childNodes,-1).nodeValue.replace(/[年|月|日]/g,"/").replace(/[時|分|秒]/g,":")),title:t.innerText,author:l.querySelector(".skin-profileName").innerText,content:r.innerText,contentHtml:Object(m.a)(r),url:t.href}))}}return n}};let F=-1;const{app:B}=_.remote,M=S.a.join(A.a.homedir(),".anyzaka"),$=S.a.join(M,"checked.json"),H=S.a.join(M,"following.json"),G=S.a.join(M,"other-blogs.json"),U=S.a.join(B.getAppPath(),"app/dst/assets/icons/extras");t.a=Object(a.a)({LOAD_ARTICLES:async()=>(F+=1,await(async(e=0)=>{const t=[...await w(e),...await O(e),...await j(e)];for(const r of u.a.entries)o.a.has(r,"_fetcher")&&t.push(...await v(r,e));return t})(F)),INIT:async()=>{k.a.existsSync(M)||k.a.mkdirSync(M),k.a.existsSync($)||k.a.writeJsonSync($,[]),k.a.existsSync(H)||k.a.writeJsonSync(H,[]),k.a.existsSync(G)||k.a.writeJsonSync(G,{}),k.a.existsSync(U)&&k.a.removeSync(U),k.a.mkdirSync(U);const e=k.a.readJsonSync(G);return u.a.addOtherBlogs(await(async e=>{const t={},r={line:{name:"LINE BLOG",color:"rgb(90, 196, 127)",_fetcher:L},ameblo:{name:"Ameba Blog",color:"rgb(45, 140, 60)",_fetcher:I}};for(const a of o.a.keys(e))if(!o.a.has(t,a)){t[a]=o.a.merge({_ids:[],_key:a,_optionsList:[],members:[]},r[a]);for(let n of e[a]){"string"==typeof n&&(n=[n,{pages:1}]);const[e,o]=n,{url:i,name:l}=await r[a]._fetcher.idToImageUrlAndName(e);await k.a.writeFile(S.a.join(U,`${l}.jpg`),await c()(i,{encoding:null})),t[a]._optionsList.push(o),t[a]._ids.push(e),t[a].members.push(l)}}return t})(e)),{checked:k.a.readJsonSync($),following:k.a.readJsonSync(H),otherBlogs:JSON.stringify(e,null,4)}}},"START_TO_LOAD_ARTICLES","SET_FILTER","TOGGLE_CHECKED","TOGGLE_FOLLOWING","SHOW_ARTICLE","SET_PREFERENCES_STATE","UPDATE_PREFERENCES","SET_SEARCH_VISIBLE","UPDATE_SEARCH_QUERY","UPDATE_PARSED_QUERY","CAN_LOAD_ARTICLES","UPDATE_OTHER_BLOGS")},43:function(e,t,r){"use strict";var a=r(268),n=r(5),o=r.n(n);t.a=new class{constructor(){this.entries=a}addOtherBlogs(e){let{entries:t}=this;o.a.forEach(o.a.values(e),e=>{(t=o.a.filter(t,({name:t})=>t!==e.name)).push(e)}),this.entries=t}getGroupColorFromMember(e){const{entries:t}=this;let r=null;return o.a.forEach(t,({members:t,color:a})=>{o.a.includes(t,e)&&(r=a)}),r}toMemberIconPath(e){return`assets/icons/${e}.jpg`}toExtraIconPath(e){return`assets/icons/extras/${e}.jpg`}}},472:function(e,t){e.exports=require("zlib")},53:function(e,t){e.exports=require("os")},572:function(e,t){e.exports=require("events")},577:function(e,t){},579:function(e,t){e.exports=require("constants")},6:function(e,t){e.exports=require("path")},610:function(e,t,r){var a=r(611);"string"==typeof a&&(a=[[e.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};r(613)(a,n);a.locals&&(e.exports=a.locals)},611:function(e,t,r){(e.exports=r(612)(!1)).push([e.i,'@charset "UTF-8";\nhtml,\nbody,\nmain {\n  width: 100%;\n  height: 100%; }\n\nbody {\n  margin: 0;\n  font-family: Helvetica Neue, Helvetica, Arial, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, sans-serif; }\n',""])},654:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(109),i=r.n(o),c=r(277),l=r(24),s=r(84),p=r(657),d=r(4),u=r(33),m=Object(p.a)({[d.a.loadArticles]:(e,t)=>{const{payload:r}=t;return e.push(...r).sortBy(({date:e})=>-e)},[d.a.showArticle]:(e,{payload:t})=>e.update(e.findIndex(({id:e})=>e===t),e=>e.set("temporaryVisible",!0)),[d.a.updateParsedQuery]:e=>e.map(e=>e.set("temporaryVisible",!1))},Object(u.a)());var h=Object(p.a)({[d.a.startToLoadArticles]:e=>e.set("_now",!0),[d.a.loadArticles]:e=>e.set("_now",!1),[d.a.canLoadArticles]:(e,{payload:t})=>e.set("_can",t)},new class extends(Object(u.b)({_now:!1,_can:!0})){can(){const{_now:e,_can:t}=this;return!e&&t}now(){const{_now:e}=this;return e}}),b=Object(p.a)({[d.a.setFilter]:(e,t)=>{const{payload:r}=t;return r}},-1),g=r(16),f=r.n(g),y=r(53),v=r.n(y),O=r(6),w=r.n(O);const j=w.a.join(v.a.homedir(),".anyzaka","checked.json");var x=Object(p.a)({[d.a.init]:(e,{payload:{checked:t}})=>Object(u.a)(t),[d.a.toggleChecked]:(e,{payload:t})=>{const r=e.indexOf(t),a=-1===r?e.push(t):e.delete(r);return f.a.writeJsonSync(j,a.toJS()),a}},Object(u.a)());const k=w.a.join(v.a.homedir(),".anyzaka","following.json");var E=Object(p.a)({[d.a.init]:(e,{payload:{following:t}})=>Object(u.a)(t),[d.a.toggleFollowing]:(e,{payload:t})=>{const r=e.indexOf(t),a=-1===r?e.push(t):e.delete(r);return f.a.writeJsonSync(k,a.toJS()),a}},Object(u.a)()),S=Object(p.a)({[d.a.setPreferencesState]:(e,t)=>{const{payload:r}=t;return r}},!1),C=Object(p.a)({[d.a.init]:(e,{payload:{otherBlogs:t}})=>t,[d.a.updateOtherBlogs]:(e,{payload:t})=>t},""),A=r(271),_=r.n(A),N=r(5),P=r.n(N);var T=Object(p.a)({[d.a.setSearchVisible]:(e,{payload:t})=>e.set("visible",t),[d.a.updateSearchQuery]:(e,{payload:t})=>e.set("query",t),[d.a.updateParsedQuery]:(e,{payload:t})=>e.updateParsedQuery(t)},new class extends(Object(u.b)({visible:!1,query:"",parsedQuery:{}})){updateParsedQuery(e){const t=["author","title","content"],r=_.a.parse(e,{keywords:["author","title","content"]});let a={};return"string"==typeof r?a={author:[],title:[],content:[],text:[r]}:P.a.forEach(P.a.concat("text",t),e=>{if(P.a.has(r,e)){const t=r[e];a[e]="string"==typeof t?[t]:t}else a[e]=[]}),this.set("parsedQuery",a)}searched(){const{parsedQuery:e,query:t}=this;return!P.a.isEmpty(e)&&t}test(e){const{parsedQuery:t}=this;return!this.searched()||P.a.some(["title","author","content"],r=>{const a=e.get(r);return P.a.some([r,"text"],e=>P.a.some(t[e],e=>a.indexOf(e)>=0))})}}),z=Object(s.c)({articles:m,loading:h,openFilterIndex:b,checked:x,following:E,openPreferences:S,otherBlogs:C,searchState:T}),q=r(272),D=r.n(q);r(610);const L=Object(s.d)(z,Object(s.a)(D.a)),R=document.querySelector("main");L.dispatch(d.a.init());(()=>{const{default:e}=r(655);i.a.render(n.a.createElement(c.AppContainer,null,n.a.createElement(l.a,{store:L},n.a.createElement(e,null))),R)})()},655:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(15),i=r(3),c=r(4);const l=Object(i.a)({boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"}),s=Object(i.a)({height:22,WebkitAppRegion:"drag"}),p=Object(i.a)({width:220,height:"100%",boxSizing:"border-box"}),d=Object(i.a)({width:"calc(100% - 220px)",height:"100%"}),u="rgb(244, 143, 177)",m=Object(i.a)({margin:"0 8px 0px 24px"});var h=r(24),b=r(43);var g,f,y=class extends a.Component{render(){const{props:{name:e,size:t=48,css:r}}=this;return n.a.createElement("i",{className:Object(i.a)(r,{display:"inline-block",borderRadius:"50%",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url("${b.a.toMemberIconPath(e)}"), url("${b.a.toExtraIconPath(e)}"), url(assets/icons/fallback.png)`,width:t,height:t})})}},v=r(66),O=r(32);let w=Object(h.b)(({following:e,checked:t,searchState:r})=>({following:e,checked:t,searchState:r}))((j=(f=class extends a.Component{onClickItem(){const{props:{article:e,following:t,searchState:r,dispatch:a}}=this;e.visible(t,r)||a(c.a.showArticle(e.id)),Object(O.d)(document.querySelector(`[data-article-id="${e.id}"]`))}render(){const{props:{article:e,following:t,checked:r,searchState:a}}=this,o=e.visible(t,a);return n.a.createElement("div",{onClick:this.onClickItem,className:Object(i.a)({overflowX:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",cursor:"pointer",padding:"0 8px",":hover":{backgroundColor:"rgba(255, 255, 255, 0.3)"}})},n.a.createElement(v.GoCheck,{style:{marginRight:4,verticalAlign:"middle",visibility:r.includes(e.url)?"visible":"hidden",opacity:o?1:.5}}),n.a.createElement(y,{name:e.author,size:24,css:Object(i.a)({verticalAlign:"middle",marginRight:4,opacity:o?1:.5})}),n.a.createElement("span",{className:Object(i.a)({opacity:o?1:.5})},e.title))}}).prototype,x="onClickItem",k=[o.a],E=Object.getOwnPropertyDescriptor(f.prototype,"onClickItem"),S=f.prototype,C={},Object.keys(E).forEach(function(e){C[e]=E[e]}),C.enumerable=!!C.enumerable,C.configurable=!!C.configurable,("value"in C||C.initializer)&&(C.writable=!0),C=k.slice().reverse().reduce(function(e,t){return t(j,x,e)||e},C),S&&void 0!==C.initializer&&(C.value=C.initializer?C.initializer.call(S):void 0,C.initializer=void 0),void 0===C.initializer&&(Object.defineProperty(j,x,C),C=null),g=f))||g;var j,x,k,E,S,C,A,_;class N extends a.PureComponent{render(){const{props:{date:e}}=this;return n.a.createElement("div",{className:Object(i.a)(m,{borderBottom:"1px solid white"})},e.format("YYYY/MM/DD"))}}function P(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let T=Object(h.b)(({searchState:e,loading:t})=>({searchState:e,loading:t}))((P((_=class extends a.Component{constructor(){super(),this.$input=Object(a.createRef)(),this.timer=-1}onChange(e){const{currentTarget:{value:t}}=e,{props:{dispatch:r},timer:a}=this;clearTimeout(a),r(c.a.updateSearchQuery(t)),this.timer=setTimeout(()=>{r(c.a.updateParsedQuery(t))},300)}onFocus(){const{props:{dispatch:e}}=this;e(c.a.canLoadArticles(!1))}onBlur(){const{props:{dispatch:e}}=this;e(c.a.canLoadArticles(!0))}onClick(){const{$input:{current:e}}=this;e.focus()}render(){const{props:{searchState:e}}=this;return n.a.createElement("div",{onClick:this.onClick,className:Object(i.a)({backgroundColor:"rgb(0, 0, 0, 0.1)",borderRadius:4,padding:"4px 8px",marginBottom:8,boxSizing:"border-box",display:"flex",alignItems:"center"})},n.a.createElement(v.GoSearch,null),n.a.createElement("input",{value:e.get("query"),onChange:this.onChange,onFocus:this.onFocus,onBlur:this.onBlur,ref:this.$input,type:"text",spellCheck:!1,className:Object(i.a)({font:"inherit",display:"block",border:"none",outline:"none",width:"100%",color:"white",padding:0,marginLeft:8,backgroundColor:"transparent"})}))}}).prototype,"onChange",[o.a],Object.getOwnPropertyDescriptor(_.prototype,"onChange"),_.prototype),P(_.prototype,"onFocus",[o.a],Object.getOwnPropertyDescriptor(_.prototype,"onFocus"),_.prototype),P(_.prototype,"onBlur",[o.a],Object.getOwnPropertyDescriptor(_.prototype,"onBlur"),_.prototype),P(_.prototype,"onClick",[o.a],Object.getOwnPropertyDescriptor(_.prototype,"onClick"),_.prototype),A=_))||A;var z;let q=Object(h.b)(({articles:e,searchState:t})=>({articles:e,searchState:t}))(z=class extends a.Component{render(){const{props:{articles:e,searchState:t}}=this,r=[],{size:a}=e;let o=null;for(let i=0;i<a;i+=1){const a=e.get(i);t.searched()&&null!==a&&!t.test(a)||(null===o?r.push(n.a.createElement(N,{key:`d${a.id}`,date:a.date})):o.date.get("day")!==a.date.get("day")&&r.push(n.a.createElement(N,{key:`d${a.id}`,date:a.date})),r.push(n.a.createElement(w,{article:a,key:a.id})),o=a)}return n.a.createElement("div",{className:Object(i.a)(p,l,{display:"flex",flexDirection:"column",backgroundColor:u,color:"white"})},n.a.createElement("div",{className:s}),n.a.createElement("div",{className:m},n.a.createElement(T,null)),n.a.createElement("div",{className:Object(i.a)({overflowY:"scroll",flex:1})},r))}})||z;var D,L,R=r(92),I=r(16),F=r.n(I),B=r(53),M=r.n(B),$=r(6),H=r.n($),G=r(273),U=r.n(G),Y=r(135);r(183),r(622),r(624);function J(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}const W=H.a.join(M.a.homedir(),".anyzaka","other-blogs.json");let Q=Object(h.b)(({openPreferences:e,otherBlogs:t})=>({openPreferences:e,otherBlogs:t}))((J((L=class extends a.Component{onClickSaveButton(){const{props:{otherBlogs:e}}=this;try{const t=JSON.parse(e);F.a.writeJsonSync(W,t),location.reload()}catch(e){Y.b.error(String(e),{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!1})}}onChange(e){const{props:{dispatch:t}}=this;t(c.a.updateOtherBlogs(e))}render(){const{props:{openPreferences:e,otherBlogs:t}}=this;return e?n.a.createElement("div",{className:Object(i.a)({position:"fixed",left:0,top:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.435)",display:"flex",justifyContent:"center",alignItems:"center"})},n.a.createElement("div",{className:Object(i.a)(l,{backgroundColor:"white",width:"55%",position:"relative"})},n.a.createElement("div",{className:Object(i.a)(l,{backgroundColor:u,color:"white",padding:16,display:"flex",justifyContent:"space-between",alignItems:"center"})},n.a.createElement("span",{className:Object(i.a)({fontSize:"2rem"})},"Preferences")),n.a.createElement("div",{className:Object(i.a)({padding:24})},n.a.createElement(U.a,{value:t,onChange:this.onChange,mode:"json",theme:"github",showGutter:!1,style:{width:"100%",height:160,border:"1px solid rgb(230, 236, 240)"},editorProps:{$blockScrolling:!0}})),n.a.createElement("div",{className:Object(i.a)({padding:"4px 6px",textAlign:"right"})},n.a.createElement("span",{onClick:this.onClickSaveButton,className:Object(i.a)(l,{margin:"6px 0",padding:"0 16px",lineHeight:"36px",display:"inline-block",backgroundColor:u,color:"white",cursor:"pointer"})},"SAVE & RELOAD")))):null}}).prototype,"onClickSaveButton",[o.a],Object.getOwnPropertyDescriptor(L.prototype,"onClickSaveButton"),L.prototype),J(L.prototype,"onChange",[o.a],Object.getOwnPropertyDescriptor(L.prototype,"onChange"),L.prototype),D=L))||D;var V,K,X=r(5),Z=r.n(X);function ee(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}const te=({article:{date:e,author:t,title:r,url:a},color:o})=>n.a.createElement("div",{className:Object(i.a)({backgroundColor:o,color:"white",padding:"16px 67px",position:"relative"})},n.a.createElement(y,{name:t,size:43,css:Object(i.a)({position:"absolute",left:16,top:16})}),n.a.createElement("div",null,n.a.createElement("div",null,e.format("YYYY/MM/DD HH:mm:ss")),n.a.createElement("div",{className:Object(i.a)({fontSize:20,fontWeight:"bold",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"})},n.a.createElement("a",{href:a,className:Object(i.a)({color:"white",textDecoration:"none",":hover":{textDecoration:"underline"}})},r))));var re,ae,ne=Object(h.b)(({checked:e,following:t,searchState:r})=>({checked:e,following:t,searchState:r}))((ee((K=class extends a.Component{constructor(){super(),this.$base=Object(a.createRef)()}onClickCheck(){const{props:{dispatch:e,article:{url:t}}}=this,{$base:{current:r}}=this;e(c.a.toggleChecked(t)),Object(O.d)(r)}onClickLink(e){e.preventDefault();const{currentTarget:{href:t}}=e;R.shell.openExternal(t)}componentDidMount(){const{$base:{current:e}}=this;Z.a.forEach(e.querySelectorAll("a"),e=>{e.addEventListener("click",this.onClickLink)})}render(){const{props:{article:e,checked:t,following:r,searchState:a,css:o=""}}=this,{author:c,contentHtml:s,url:p,id:d}=e,u=b.a.getGroupColorFromMember(c),m=t.includes(p);return n.a.createElement("div",{className:Object(i.a)(o,l,e.visible(r,a)?null:{height:0,marginBottom:0,overflow:"hidden"},{position:"relative"}),ref:this.$base,"data-article-id":d},n.a.createElement(te,{article:e,color:u}),n.a.createElement("div",{className:Object(i.a)({padding:"0 16px 16px",position:"relative",'img:not([alt="lineemoji"])':{maxWidth:"100%",display:"block"},video:{maxWidth:"100%",display:"block"},display:m?"none":"block"})},n.a.createElement("div",{className:Object(i.a)({"p:last-child":{marginBottom:0}}),dangerouslySetInnerHTML:{__html:s}})),n.a.createElement(v.GoCheck,{size:43,onClick:this.onClickCheck,className:Object(i.a)({position:"absolute",right:16,bottom:16,cursor:"pointer"},m?{fill:"white"}:{fill:"lightgray","&:hover":{fill:u}})}))}}).prototype,"onClickCheck",[o.a],Object.getOwnPropertyDescriptor(K.prototype,"onClickCheck"),K.prototype),ee(K.prototype,"onClickLink",[o.a],Object.getOwnPropertyDescriptor(K.prototype,"onClickLink"),K.prototype),V=K))||V,oe=r(276);function ie(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let ce=Object(h.b)(({openFilterIndex:e,following:t})=>({openFilterIndex:e,following:t}))((ie((ae=class extends a.Component{onClickFilter(e){const{currentTarget:{dataset:{strkey:t}}}=e,{props:{dispatch:r,openFilterIndex:a}}=this,n=parseInt(t);r(c.a.setFilter(n===a?-1:n))}onClickFilterMember(e){const{props:{dispatch:t}}=this,{currentTarget:{dataset:{member:r}}}=e;t(c.a.toggleFollowing(r))}render(){const{props:{following:e,openFilterIndex:t}}=this;return n.a.createElement("div",{className:Object(i.a)(l,{padding:8})},n.a.createElement("div",{className:Object(i.a)({marginBottom:4})},Z.a.map(b.a.entries,({name:r,color:a,members:o},c)=>n.a.createElement("span",{onClick:this.onClickFilter,key:c,"data-strkey":c,className:Object(i.a)({color:a,cursor:"pointer",i:{verticalAlign:"middle"}})},t===c?n.a.createElement(v.GoTriangleDown,{className:Object(i.a)({verticalAlign:"middle"})}):n.a.createElement(v.GoTriangleRight,{className:Object(i.a)({verticalAlign:"middle"})}),n.a.createElement("span",{className:Object(i.a)({fontWeight:"bold",marginRight:2,verticalAlign:"middle"})},r),Z.a.map(o,r=>e.includes(r)&&t!==c?n.a.createElement(y,{name:r,size:24,key:r}):null)))),n.a.createElement("div",{className:Object(i.a)({display:"flex",flexWrap:"wrap"})},Z.a.map(b.a.entries,({members:r},a)=>t===a?Z.a.map(r,t=>n.a.createElement("div",{onClick:this.onClickFilterMember,key:t,"data-member":t,className:Object(i.a)(l,{display:"flex",alignItems:"center",marginRight:8,marginBottom:8,padding:4,borderRadius:4,cursor:"pointer",opacity:e.includes(t)?1:.5,"> :first-of-type":{marginRight:4}})},n.a.createElement(y,{name:t,size:36}),n.a.createElement("span",null,t))):null)))}}).prototype,"onClickFilter",[o.a],Object.getOwnPropertyDescriptor(ae.prototype,"onClickFilter"),ae.prototype),ie(ae.prototype,"onClickFilterMember",[o.a],Object.getOwnPropertyDescriptor(ae.prototype,"onClickFilterMember"),ae.prototype),re=ae))||re;var le,se;function pe(e,t,r,a,n){var o={};return Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}let de=Object(h.b)(({articles:e,loading:t})=>({articles:e,loading:t}))((pe((se=class extends a.Component{constructor(){super(),this.$loading=Object(a.createRef)(),this.$articles=Object(a.createRef)(),this.prevloadingIsVisible=!0}componentDidMount(){this.loadAndAddArticles(),this.watchLoading()}loadAndAddArticles(){const{props:{dispatch:e}}=this;e(c.a.startToLoadArticles()),e(c.a.loadArticles())}onClickResetFilter(){const{props:{dispatch:e}}=this;e(c.a.setFilter(-1))}watchLoading(){const{$loading:{current:e},prevloadingIsVisible:t,props:{loading:r}}=this,{top:a}=e.getBoundingClientRect(),n=innerHeight>=a;!t&&n&&r.can()&&this.loadAndAddArticles(),this.prevloadingIsVisible=n,requestAnimationFrame(this.watchLoading)}onClickLoad(){this.loadAndAddArticles()}render(){const{props:{articles:e,loading:t}}=this;return n.a.createElement("div",{className:Object(i.a)(d,{display:"flex",flexDirection:"column"})},n.a.createElement("div",{className:s}),n.a.createElement("div",{ref:this.$articles,onClick:this.onClickResetFilter,className:Object(i.a)({flex:1,overflow:"scroll",position:"relative"})},n.a.createElement("div",{className:Object(i.a)({minWidth:960,padding:16,marginLeft:"auto",marginRight:"auto"})},e.map(e=>n.a.createElement(ne,{article:e,key:e.id,css:Object(i.a)({marginBottom:16})})),n.a.createElement("div",{ref:this.$loading,className:Object(i.a)({margin:"16px 0",textAlign:"center"})},t.now()?n.a.createElement(oe.BeatLoader,{css:Object(i.a)({display:"inline-block"})}):n.a.createElement("div",{onClick:this.onClickLoad,className:Object(i.a)({color:"rgb(233, 30, 99)",border:"1px solid rgb(233, 30, 99)",padding:"4px 8px",borderRadius:4,cursor:"pointer"})},"さらに記事を読み込む")))),n.a.createElement(ce,null))}}).prototype,"onClickResetFilter",[o.a],Object.getOwnPropertyDescriptor(se.prototype,"onClickResetFilter"),se.prototype),pe(se.prototype,"watchLoading",[o.a],Object.getOwnPropertyDescriptor(se.prototype,"watchLoading"),se.prototype),pe(se.prototype,"onClickLoad",[o.a],Object.getOwnPropertyDescriptor(se.prototype,"onClickLoad"),se.prototype),le=se))||le;var ue,me;let he=Object(h.b)()((function(e,t,r,a,n){var o={};Object.keys(a).forEach(function(e){o[e]=a[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,a){return a(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null)}((me=class extends a.PureComponent{constructor(){super(),R.ipcRenderer.on("menu:preferences",this.onClickPreferencesOfMenuItem)}onClickPreferencesOfMenuItem(){const{props:{dispatch:e}}=this;e(c.a.setPreferencesState(!0))}render(){return n.a.createElement("div",{className:Object(i.a)({width:"100%",height:"100%",display:"flex",flexDirection:"row"})},n.a.createElement(q,null),n.a.createElement(de,null),n.a.createElement(Q,null),n.a.createElement(Y.a,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnVisibilityChange:!0,draggable:!1,pauseOnHover:!0}))}}).prototype,"onClickPreferencesOfMenuItem",[o.a],Object.getOwnPropertyDescriptor(me.prototype,"onClickPreferencesOfMenuItem"),me.prototype),ue=me))||ue;t.default=he},70:function(e,t){e.exports=require("assert")},83:function(e,t){e.exports=require("stream")},92:function(e,t){e.exports=require("electron")}});