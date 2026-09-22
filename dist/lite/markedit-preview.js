"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const t={MarkEdit:e.MarkEdit??Object.freeze({})},n={of:()=>({})},r=()=>({range:()=>({})});class o{}const u={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:n,mouseSelectionStyle:n,editorAttributes:n,baseTheme:()=>({})},Decoration:{mark:r,line:r},ViewPlugin:{fromClass:()=>({})},WidgetType:o,RectangleMarker:o,layer:()=>({})},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}},Facet:{define:()=>n},StateField:{define:()=>({})}}};e.require=a=>u[a]??{}}})();const D=require("@codemirror/view"),I=require("markedit-api"),V=require("@codemirror/state"),pe=require("@codemirror/language"),Ti=require("@lezer/highlight");function Di(){typeof I.MarkEdit.playSystemBeep=="function"&&I.MarkEdit.playSystemBeep()}function Mc(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function Zt(e,t=!0){const n=document.createElement("style");return n.textContent=e,document.head.appendChild(n),n.disabled=!t,n}function su(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function Ic(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function Lc(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function Tt(e){const t=parseInt(e.dataset.lineFrom??"0"),n=parseInt(e.dataset.lineTo??"0");return{from:t,to:n}}function Yr(e,t){let n=0,r=t;for(;r!==null&&r!==e;)n+=r.offsetTop,r=r.offsetParent;return n}function Tn(e,t,n,r=!0){const o=Yr(e,t)+t.offsetHeight*n;Dn(e,o,r)}function Dn(e,t,n=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:t<=r?0:t,behavior:n?"smooth":"instant"})}function Rc(e){const t=document.createRange();t.selectNodeContents(e);const n=getSelection();n?.removeAllRanges(),n?.addRange(t)}function Nc(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function At(e,t){return e.endsWith("/")?e+t:e+"/"+t}async function Oc(e){const t=await I.MarkEdit.getFileContent(e);if(t===void 0)return{};try{const n=JSON.parse(t);return typeof n=="object"&&n!==null?n:{}}catch(n){return console.error(`Failed to parse JSON from ${e}:`,n),{}}}function Fi(e,t){return navigator.clipboard.write([e]).catch(n=>{console.error("Failed to copy:",n),I.MarkEdit.showAlert(t)})}function Pc(e){const t=document.createElement("div");t.style.cssText="position: fixed; left: -10000px; top: 0;",t.innerHTML=e,document.body.appendChild(t);try{return t.innerText}finally{t.remove()}}const lu={};function zc(e){let t=lu[e];if(t)return t;t=lu[e]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);t.push(r)}for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);t[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return t}function It(e,t){typeof t!="string"&&(t=It.defaultChars);const n=zc(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let o="";for(let u=0,a=r.length;u<a;u+=3){const i=parseInt(r.slice(u+1,u+3),16);if(i<128){o+=n[i];continue}if((i&224)===192&&u+3<a){const c=parseInt(r.slice(u+4,u+6),16);if((c&192)===128){const d=i<<6&1984|c&63;d<128?o+="��":o+=String.fromCharCode(d),u+=3;continue}}if((i&240)===224&&u+6<a){const c=parseInt(r.slice(u+4,u+6),16),d=parseInt(r.slice(u+7,u+9),16);if((c&192)===128&&(d&192)===128){const l=i<<12&61440|c<<6&4032|d&63;l<2048||l>=55296&&l<=57343?o+="���":o+=String.fromCharCode(l),u+=6;continue}}if((i&248)===240&&u+9<a){const c=parseInt(r.slice(u+4,u+6),16),d=parseInt(r.slice(u+7,u+9),16),l=parseInt(r.slice(u+10,u+12),16);if((c&192)===128&&(d&192)===128&&(l&192)===128){let s=i<<18&1835008|c<<12&258048|d<<6&4032|l&63;s<65536||s>1114111?o+="����":(s-=65536,o+=String.fromCharCode(55296+(s>>10),56320+(s&1023))),u+=9;continue}}o+="�"}return o})}It.defaultChars=";/?:@&=+$,#";It.componentChars="";const du={};function Hc(e){let t=du[e];if(t)return t;t=du[e]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);/^[0-9a-z]$/i.test(r)?t.push(r):t.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function cn(e,t,n){typeof t!="string"&&(n=t,t=cn.defaultChars),typeof n>"u"&&(n=!0);const r=Hc(t);let o="";for(let u=0,a=e.length;u<a;u++){const i=e.charCodeAt(u);if(n&&i===37&&u+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(u+1,u+3))){o+=e.slice(u,u+3),u+=2;continue}if(i<128){o+=r[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&u+1<a){const c=e.charCodeAt(u+1);if(c>=56320&&c<=57343){o+=encodeURIComponent(e[u]+e[u+1]),u++;continue}}o+="%EF%BF%BD";continue}o+=encodeURIComponent(e[u])}return o}cn.defaultChars=";/?:@&=+$,-_.!~*'()#";cn.componentChars="-_.!~*'()";function co(e){let t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||"",t}function Ln(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Bc=/^([a-z0-9.+-]+:)/i,qc=/:[0-9]*$/,$c=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Uc=["<",">",'"',"`"," ","\r",`
`,"	"],jc=["{","}","|","\\","^","`"].concat(Uc),Gc=["'"].concat(jc),fu=["%","/","?",";","#"].concat(Gc),hu=["/","?","#"],Wc=255,pu=/^[+a-z0-9A-Z_-]{0,63}$/,Vc=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,mu={javascript:!0,"javascript:":!0},bu={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function so(e,t){if(e&&e instanceof Ln)return e;const n=new Ln;return n.parse(e,t),n}Ln.prototype.parse=function(e,t){let n,r,o,u=e;if(u=u.trim(),!t&&e.split("#").length===1){const d=$c.exec(u);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let a=Bc.exec(u);if(a&&(a=a[0],n=a.toLowerCase(),this.protocol=a,u=u.substr(a.length)),(t||a||u.match(/^\/\/[^@\/]+@[^@\/]+/))&&(o=u.substr(0,2)==="//",o&&!(a&&mu[a])&&(u=u.substr(2),this.slashes=!0)),!mu[a]&&(o||a&&!bu[a])){let d=-1;for(let p=0;p<hu.length;p++)r=u.indexOf(hu[p]),r!==-1&&(d===-1||r<d)&&(d=r);let l,s;d===-1?s=u.lastIndexOf("@"):s=u.lastIndexOf("@",d),s!==-1&&(l=u.slice(0,s),u=u.slice(s+1),this.auth=l),d=-1;for(let p=0;p<fu.length;p++)r=u.indexOf(fu[p]),r!==-1&&(d===-1||r<d)&&(d=r);d===-1&&(d=u.length),u[d-1]===":"&&d--;const f=u.slice(0,d);u=u.slice(d),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const p=this.hostname.split(/\./);for(let b=0,g=p.length;b<g;b++){const y=p[b];if(y&&!y.match(pu)){let x="";for(let C=0,w=y.length;C<w;C++)y.charCodeAt(C)>127?x+="x":x+=y[C];if(!x.match(pu)){const C=p.slice(0,b),w=p.slice(b+1),_=y.match(Vc);_&&(C.push(_[1]),w.unshift(_[2])),w.length&&(u=w.join(".")+u),this.hostname=C.join(".");break}}}}this.hostname.length>Wc&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=u.indexOf("#");i!==-1&&(this.hash=u.substr(i),u=u.slice(0,i));const c=u.indexOf("?");return c!==-1&&(this.search=u.substr(c),u=u.slice(0,c)),u&&(this.pathname=u),bu[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Ln.prototype.parseHost=function(e){let t=qc.exec(e);t&&(t=t[0],t!==":"&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};const Zc=Object.freeze(Object.defineProperty({__proto__:null,decode:It,encode:cn,format:co,parse:so},Symbol.toStringTag,{value:"Module"})),Mi=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Ii=/[\0-\x1F\x7F-\x9F]/,Yc=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,lo=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Li=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Ri=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Kc=Object.freeze(Object.defineProperty({__proto__:null,Any:Mi,Cc:Ii,Cf:Yc,P:lo,S:Li,Z:Ri},Symbol.toStringTag,{value:"Module"})),Xc=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Jc=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var _r;const Qc=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),es=(_r=String.fromCodePoint)!==null&&_r!==void 0?_r:function(e){let t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t};function ts(e){var t;return e>=55296&&e<=57343||e>1114111?65533:(t=Qc.get(e))!==null&&t!==void 0?t:e}var te;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(te||(te={}));const ns=32;var Je;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Je||(Je={}));function Kr(e){return e>=te.ZERO&&e<=te.NINE}function rs(e){return e>=te.UPPER_A&&e<=te.UPPER_F||e>=te.LOWER_A&&e<=te.LOWER_F}function os(e){return e>=te.UPPER_A&&e<=te.UPPER_Z||e>=te.LOWER_A&&e<=te.LOWER_Z||Kr(e)}function us(e){return e===te.EQUALS||os(e)}var J;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(J||(J={}));var ze;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(ze||(ze={}));class is{constructor(t,n,r){this.decodeTree=t,this.emitCodePoint=n,this.errors=r,this.state=J.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=ze.Strict}startEntity(t){this.decodeMode=t,this.state=J.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(t,n){switch(this.state){case J.EntityStart:return t.charCodeAt(n)===te.NUM?(this.state=J.NumericStart,this.consumed+=1,this.stateNumericStart(t,n+1)):(this.state=J.NamedEntity,this.stateNamedEntity(t,n));case J.NumericStart:return this.stateNumericStart(t,n);case J.NumericDecimal:return this.stateNumericDecimal(t,n);case J.NumericHex:return this.stateNumericHex(t,n);case J.NamedEntity:return this.stateNamedEntity(t,n)}}stateNumericStart(t,n){return n>=t.length?-1:(t.charCodeAt(n)|ns)===te.LOWER_X?(this.state=J.NumericHex,this.consumed+=1,this.stateNumericHex(t,n+1)):(this.state=J.NumericDecimal,this.stateNumericDecimal(t,n))}addToNumericResult(t,n,r,o){if(n!==r){const u=r-n;this.result=this.result*Math.pow(o,u)+parseInt(t.substr(n,u),o),this.consumed+=u}}stateNumericHex(t,n){const r=n;for(;n<t.length;){const o=t.charCodeAt(n);if(Kr(o)||rs(o))n+=1;else return this.addToNumericResult(t,r,n,16),this.emitNumericEntity(o,3)}return this.addToNumericResult(t,r,n,16),-1}stateNumericDecimal(t,n){const r=n;for(;n<t.length;){const o=t.charCodeAt(n);if(Kr(o))n+=1;else return this.addToNumericResult(t,r,n,10),this.emitNumericEntity(o,2)}return this.addToNumericResult(t,r,n,10),-1}emitNumericEntity(t,n){var r;if(this.consumed<=n)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(t===te.SEMI)this.consumed+=1;else if(this.decodeMode===ze.Strict)return 0;return this.emitCodePoint(ts(this.result),this.consumed),this.errors&&(t!==te.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(t,n){const{decodeTree:r}=this;let o=r[this.treeIndex],u=(o&Je.VALUE_LENGTH)>>14;for(;n<t.length;n++,this.excess++){const a=t.charCodeAt(n);if(this.treeIndex=as(r,o,this.treeIndex+Math.max(1,u),a),this.treeIndex<0)return this.result===0||this.decodeMode===ze.Attribute&&(u===0||us(a))?0:this.emitNotTerminatedNamedEntity();if(o=r[this.treeIndex],u=(o&Je.VALUE_LENGTH)>>14,u!==0){if(a===te.SEMI)return this.emitNamedEntityData(this.treeIndex,u,this.consumed+this.excess);this.decodeMode!==ze.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var t;const{result:n,decodeTree:r}=this,o=(r[n]&Je.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,o,this.consumed),(t=this.errors)===null||t===void 0||t.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(t,n,r){const{decodeTree:o}=this;return this.emitCodePoint(n===1?o[t]&~Je.VALUE_LENGTH:o[t+1],r),n===3&&this.emitCodePoint(o[t+2],r),r}end(){var t;switch(this.state){case J.NamedEntity:return this.result!==0&&(this.decodeMode!==ze.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case J.NumericDecimal:return this.emitNumericEntity(0,2);case J.NumericHex:return this.emitNumericEntity(0,3);case J.NumericStart:return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case J.EntityStart:return 0}}}function Ni(e){let t="";const n=new is(e,r=>t+=es(r));return function(o,u){let a=0,i=0;for(;(i=o.indexOf("&",i))>=0;){t+=o.slice(a,i),n.startEntity(u);const d=n.write(o,i+1);if(d<0){a=i+n.end();break}a=i+d,i=d===0?a+1:a}const c=t+o.slice(a);return t="",c}}function as(e,t,n,r){const o=(t&Je.BRANCH_LENGTH)>>7,u=t&Je.JUMP_TABLE;if(o===0)return u!==0&&r===u?n:-1;if(u){const c=r-u;return c<0||c>=o?-1:e[n+c]-1}let a=n,i=a+o-1;for(;a<=i;){const c=a+i>>>1,d=e[c];if(d<r)a=c+1;else if(d>r)i=c-1;else return e[c+o]}return-1}const Oi=Ni(Xc);Ni(Jc);function cs(e,t=ze.Legacy){return Oi(e,t)}function ss(e){return Oi(e,ze.Strict)}function ls(e){return Object.prototype.toString.call(e)}function fo(e){return ls(e)==="[object String]"}const ds=Object.prototype.hasOwnProperty;function fs(e,t){return ds.call(e,t)}function jn(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(r){e[r]=n[r]})}}),e}function Pi(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function ho(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function nn(e){if(e>65535){e-=65536;const t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}const zi=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,hs=/&([a-z#][a-z0-9]{1,31});/gi,ps=new RegExp(zi.source+"|"+hs.source,"gi"),ms=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function bs(e,t){if(t.charCodeAt(0)===35&&ms.test(t)){const r=t[1].toLowerCase()==="x"?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return ho(r)?nn(r):e}const n=cs(e);return n!==e?n:e}function gs(e){return e.indexOf("\\")<0?e:e.replace(zi,"$1")}function Lt(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(ps,function(t,n,r){return n||bs(t,r)})}const ys=/[&<>"]/,ks=/[&<>"]/g,xs={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Cs(e){return xs[e]}function rt(e){return ys.test(e)?e.replace(ks,Cs):e}const ws=/[.?*+^$[\]\\(){}|-]/g;function vs(e){return e.replace(ws,"\\$&")}function z(e){switch(e){case 9:case 32:return!0}return!1}function rn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Hi(e){return lo.test(e)||Li.test(e)}function on(e){return Hi(nn(e))}function un(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Gn(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function gu(e){return e===32||e===9||e===10||e===13}function Wn(e){let t=0;for(;t<e.length&&gu(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&gu(e.charCodeAt(n));n--);return e.slice(t,n+1)}const _s={mdurl:Zc,ucmicro:Kc},Es=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Pi,asciiTrim:Wn,assign:jn,escapeHtml:rt,escapeRE:vs,fromCodePoint:nn,has:fs,isMdAsciiPunct:un,isPunctChar:Hi,isPunctCharCode:on,isSpace:z,isString:fo,isValidEntityCode:ho,isWhiteSpace:rn,lib:_s,normalizeReference:Gn,unescapeAll:Lt,unescapeMd:gs},Symbol.toStringTag,{value:"Module"}));function As(e,t,n){let r,o,u,a;const i=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<i;){if(u=e.src.charCodeAt(e.pos),u===93&&(r--,r===0)){o=!0;break}if(a=e.pos,e.md.inline.skipToken(e),u===91){if(a===e.pos-1)r++;else if(n)return e.pos=c,-1}}let d=-1;return o&&(d=e.pos),e.pos=c,d}function Ss(e,t,n){let r,o=t;const u={ok:!1,pos:0,str:""};if(e.charCodeAt(o)===60){for(o++;o<n;){if(r=e.charCodeAt(o),r===10||r===60)return u;if(r===62)return u.pos=o+1,u.str=Lt(e.slice(t+1,o)),u.ok=!0,u;if(r===92&&o+1<n){o+=2;continue}o++}return u}let a=0;for(;o<n&&(r=e.charCodeAt(o),!(r===32||r<32||r===127));){if(r===92&&o+1<n){if(e.charCodeAt(o+1)===32)break;o+=2;continue}if(r===40&&(a++,a>32))return u;if(r===41){if(a===0)break;a--}o++}return t===o||a!==0||(u.str=Lt(e.slice(t,o)),u.pos=o,u.ok=!0),u}function Ts(e,t,n,r){let o,u=t;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)a.str=r.str,a.marker=r.marker;else{if(u>=n)return a;let i=e.charCodeAt(u);if(i!==34&&i!==39&&i!==40)return a;t++,u++,i===40&&(i=41),a.marker=i}for(;u<n;){if(o=e.charCodeAt(u),o===a.marker)return a.pos=u+1,a.str+=Lt(e.slice(t,u)),a.ok=!0,a;if(o===40&&a.marker===41)return a;o===92&&u+1<n&&u++,u++}return a.can_continue=!0,a.str+=Lt(e.slice(t,u)),a}const Ds=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Ss,parseLinkLabel:As,parseLinkTitle:Ts},Symbol.toStringTag,{value:"Module"})),Oe={};Oe.code_inline=function(e,t,n,r,o){const u=e[t];return"<code"+o.renderAttrs(u)+">"+rt(u.content)+"</code>"};Oe.code_block=function(e,t,n,r,o){const u=e[t];return"<pre"+o.renderAttrs(u)+"><code>"+rt(e[t].content)+`</code></pre>
`};Oe.fence=function(e,t,n,r,o){const u=e[t],a=u.info?Lt(u.info).trim():"";let i="",c="";if(a){const l=a.split(/(\s+)/g);i=l[0],c=l.slice(2).join("")}let d;if(n.highlight?d=n.highlight(u.content,i,c)||rt(u.content):d=rt(u.content),d.indexOf("<pre")===0)return d+`
`;if(a){const l=u.attrIndex("class"),s=u.attrs?u.attrs.slice():[];l<0?s.push(["class",n.langPrefix+i]):(s[l]=s[l].slice(),s[l][1]+=" "+n.langPrefix+i);const f={attrs:s};return`<pre><code${o.renderAttrs(f)}>${d}</code></pre>
`}return`<pre><code${o.renderAttrs(u)}>${d}</code></pre>
`};Oe.image=function(e,t,n,r,o){const u=e[t];return u.attrs[u.attrIndex("alt")][1]=o.renderInlineAsText(u.children,n,r),o.renderToken(e,t,n)};Oe.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`};Oe.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};Oe.text=function(e,t){return rt(e[t].content)};Oe.html_block=function(e,t){return e[t].content};Oe.html_inline=function(e,t){return e[t].content};function Pt(){this.rules=jn({},Oe)}Pt.prototype.renderAttrs=function(t){let n,r,o;if(!t.attrs)return"";for(o="",n=0,r=t.attrs.length;n<r;n++)o+=" "+rt(t.attrs[n][0])+'="'+rt(t.attrs[n][1])+'"';return o};Pt.prototype.renderToken=function(t,n,r){const o=t[n];let u="";if(o.hidden)return"";o.block&&o.nesting!==-1&&n&&t[n-1].hidden&&(u+=`
`),u+=(o.nesting===-1?"</":"<")+o.tag,u+=this.renderAttrs(o),o.nesting===0&&r.xhtmlOut&&(u+=" /");let a=!1;if(o.block&&(a=!0,o.nesting===1&&n+1<t.length)){const i=t[n+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===o.tag)&&(a=!1)}return u+=a?`>
`:">",u};Pt.prototype.renderInline=function(e,t,n){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;typeof o[i]<"u"?r+=o[i](e,u,t,n,this):r+=this.renderToken(e,u,t)}return r};Pt.prototype.renderInlineAsText=function(e,t,n){let r="";for(let o=0,u=e.length;o<u;o++)switch(e[o].type){case"text":r+=e[o].content;break;case"image":r+=this.renderInlineAsText(e[o].children,t,n);break;case"html_inline":case"html_block":r+=e[o].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};Pt.prototype.render=function(e,t,n){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;i==="inline"?r+=this.renderInline(e[u].children,t,n):typeof o[i]<"u"?r+=o[i](e,u,t,n,this):r+=this.renderToken(e,u,t,n)}return r};function me(){this.__rules__=[],this.__cache__=null}me.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1};me.prototype.__compile__=function(){const e=this,t=[""];e.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(r){t.indexOf(r)<0&&t.push(r)})}),e.__cache__={},t.forEach(function(n){e.__cache__[n]=[],e.__rules__.forEach(function(r){r.enabled&&(n&&r.alt.indexOf(n)<0||e.__cache__[n].push(r.fn))})})};me.prototype.at=function(e,t,n){const r=this.__find__(e),o=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=t,this.__rules__[r].alt=o.alt||[],this.__cache__=null};me.prototype.before=function(e,t,n,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o,0,{name:t,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};me.prototype.after=function(e,t,n,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o+1,0,{name:t,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};me.prototype.push=function(e,t,n){const r=n||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null};me.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(t)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!0,n.push(r)},this),this.__cache__=null,n};me.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(e,t)};me.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(t)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!1,n.push(r)},this),this.__cache__=null,n};me.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function Te(e,t,n){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}Te.prototype.attrIndex=function(t){if(!this.attrs)return-1;const n=this.attrs;for(let r=0,o=n.length;r<o;r++)if(n[r][0]===t)return r;return-1};Te.prototype.attrPush=function(t){this.attrs?this.attrs.push(t):this.attrs=[t]};Te.prototype.attrSet=function(t,n){const r=this.attrIndex(t),o=[t,n];r<0?this.attrPush(o):this.attrs[r]=o};Te.prototype.attrGet=function(t){const n=this.attrIndex(t);let r=null;return n>=0&&(r=this.attrs[n][1]),r};Te.prototype.attrJoin=function(t,n){const r=this.attrIndex(t);r<0?this.attrPush([t,n]):this.attrs[r][1]=this.attrs[r][1]+" "+n};function Bi(e,t,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=t}Bi.prototype.Token=Te;const Fs=/\r\n?|\n/g,Ms=/\0/g;function Is(e){let t;t=e.src.replace(Fs,`
`),t=t.replace(Ms,"�"),e.src=t}function Ls(e){let t;e.inlineMode?(t=new e.Token("inline","",0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Rs(e){const t=e.tokens;for(let n=0,r=t.length;n<r;n++){const o=t[n];o.type==="inline"&&e.md.inline.parse(o.content,e.md,e.env,o.children)}}function Ns(e){return/^<a[>\s]/i.test(e)}function Os(e){return/^<\/a\s*>/i.test(e)}function Ps(e){const t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!=="inline"||!e.md.linkify.pretest(t[n].content))continue;let o=t[n].children,u=0;for(let a=o.length-1;a>=0;a--){const i=o[a];if(i.type==="link_close"){for(a--;o[a].level!==i.level&&o[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(Ns(i.content)&&u>0&&u--,Os(i.content)&&u++),!(u>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const c=i.content;let d=e.md.linkify.match(c);const l=[];let s=i.level,f=0;d.length>0&&d[0].index===0&&a>0&&o[a-1].type==="text_special"&&(d=d.slice(1));for(let h=0;h<d.length;h++){const p=d[h].url,b=e.md.normalizeLink(p);if(!e.md.validateLink(b))continue;let g=d[h].text;d[h].schema?d[h].schema==="mailto:"&&!/^mailto:/i.test(g)?g=e.md.normalizeLinkText("mailto:"+g).replace(/^mailto:/,""):g=e.md.normalizeLinkText(g):g=e.md.normalizeLinkText("http://"+g).replace(/^http:\/\//,"");const y=d[h].index;if(y>f){const _=new e.Token("text","",0);_.content=c.slice(f,y),_.level=s,l.push(_)}const x=new e.Token("link_open","a",1);x.attrs=[["href",b]],x.level=s++,x.markup="linkify",x.info="auto",l.push(x);const C=new e.Token("text","",0);C.content=g,C.level=s,l.push(C);const w=new e.Token("link_close","a",-1);w.level=--s,w.markup="linkify",w.info="auto",l.push(w),f=d[h].lastIndex}if(f<c.length){const h=new e.Token("text","",0);h.content=c.slice(f),h.level=s,l.push(h)}t[n].children=o=Pi(o,a,l)}}}}const qi=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,zs=/\((c|tm|r)\)/i,Hs=/\((c|tm|r)\)/ig,Bs={c:"©",r:"®",tm:"™"};function qs(e,t){return Bs[t.toLowerCase()]}function $s(e){let t=0;for(let n=e.length-1;n>=0;n--){const r=e[n];r.type==="text"&&!t&&(r.content=r.content.replace(Hs,qs)),r.type==="link_open"&&r.info==="auto"&&t--,r.type==="link_close"&&r.info==="auto"&&t++}}function Us(e){let t=0;for(let n=e.length-1;n>=0;n--){const r=e[n];r.type==="text"&&!t&&qi.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&t--,r.type==="link_close"&&r.info==="auto"&&t++}}function js(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type==="inline"&&(zs.test(e.tokens[t].content)&&$s(e.tokens[t].children),qi.test(e.tokens[t].content)&&Us(e.tokens[t].children))}const Gs=/['"]/,yu=/['"]/g,ku="’";function wn(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function Ws(e,t){let n="",r=0;t.sort((o,u)=>o.pos-u.pos);for(let o=0;o<t.length;o++){const u=t[o];n+=e.slice(r,u.pos)+u.ch,r=u.pos+1}return n+e.slice(r)}function Vs(e,t){let n;const r=[],o={};for(let u=0;u<e.length;u++){const a=e[u],i=e[u].level;for(n=r.length-1;n>=0&&!(r[n].level<=i);n--);if(r.length=n+1,a.type!=="text")continue;const c=a.content;let d=0;const l=c.length;e:for(;d<l;){yu.lastIndex=d;const s=yu.exec(c);if(!s)break;let f=!0,h=!0;d=s.index+1;const p=s[0]==="'";let b=32;if(s.index-1>=0)b=c.charCodeAt(s.index-1);else for(n=u-1;n>=0&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n--)if(e[n].content){b=e[n].content.charCodeAt(e[n].content.length-1);break}let g=32;if(d<l)g=c.charCodeAt(d);else for(n=u+1;n<e.length&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n++)if(e[n].content){g=e[n].content.charCodeAt(0);break}const y=un(b)||on(b),x=un(g)||on(g),C=rn(b),w=rn(g);if(w?f=!1:x&&(C||y||(f=!1)),C?h=!1:y&&(w||x||(h=!1)),g===34&&s[0]==='"'&&b>=48&&b<=57&&(h=f=!1),f&&h&&(f=y,h=x),!f&&!h){p&&wn(o,u,s.index,ku);continue}if(h)for(n=r.length-1;n>=0;n--){let _=r[n];if(r[n].level<i)break;if(_.single===p&&r[n].level===i){_=r[n];let A,F;p?(A=t.md.options.quotes[2],F=t.md.options.quotes[3]):(A=t.md.options.quotes[0],F=t.md.options.quotes[1]),wn(o,u,s.index,F),wn(o,_.token,_.pos,A),r.length=n;continue e}}f?r.push({token:u,pos:s.index,single:p,level:i}):h&&p&&wn(o,u,s.index,ku)}}Object.keys(o).forEach(function(u){e[u].content=Ws(e[u].content,o[u])})}function Zs(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type!=="inline"||!Gs.test(e.tokens[t].content)||Vs(e.tokens[t].children,e)}function Ys(e){let t,n;const r=e.tokens,o=r.length;for(let u=0;u<o;u++){if(r[u].type!=="inline")continue;const a=r[u].children,i=a.length;for(t=0;t<i;t++)a[t].type==="text_special"&&(a[t].type="text");for(t=n=0;t<i;t++)a[t].type==="text"&&t+1<i&&a[t+1].type==="text"?a[t+1].content=a[t].content+a[t+1].content:(t!==n&&(a[n]=a[t]),n++);t!==n&&(a.length=n)}}const Er=[["normalize",Is],["block",Ls],["inline",Rs],["linkify",Ps],["replacements",js],["smartquotes",Zs],["text_join",Ys]];function po(){this.ruler=new me;for(let e=0;e<Er.length;e++)this.ruler.push(Er[e][0],Er[e][1])}po.prototype.process=function(e){const t=this.ruler.getRules("");for(let n=0,r=t.length;n<r;n++)t[n](e)};po.prototype.State=Bi;function Pe(e,t,n,r){this.src=e,this.md=t,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const o=this.src;for(let u=0,a=0,i=0,c=0,d=o.length,l=!1;a<d;a++){const s=o.charCodeAt(a);if(!l)if(z(s)){i++,s===9?c+=4-c%4:c++;continue}else l=!0;(s===10||a===d-1)&&(s!==10&&a++,this.bMarks.push(u),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(c),this.bsCount.push(0),l=!1,i=0,c=0,u=a+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}Pe.prototype.push=function(e,t,n){const r=new Te(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r};Pe.prototype.isEmpty=function(t){return this.bMarks[t]+this.tShift[t]>=this.eMarks[t]};Pe.prototype.skipEmptyLines=function(t){for(let n=this.lineMax;t<n&&!(this.bMarks[t]+this.tShift[t]<this.eMarks[t]);t++);return t};Pe.prototype.skipSpaces=function(t){for(let n=this.src.length;t<n;t++){const r=this.src.charCodeAt(t);if(!z(r))break}return t};Pe.prototype.skipSpacesBack=function(t,n){if(t<=n)return t;for(;t>n;)if(!z(this.src.charCodeAt(--t)))return t+1;return t};Pe.prototype.skipChars=function(t,n){for(let r=this.src.length;t<r&&this.src.charCodeAt(t)===n;t++);return t};Pe.prototype.skipCharsBack=function(t,n,r){if(t<=r)return t;for(;t>r;)if(n!==this.src.charCodeAt(--t))return t+1;return t};Pe.prototype.getLines=function(t,n,r,o){if(t>=n)return"";const u=new Array(n-t);for(let a=0,i=t;i<n;i++,a++){let c=0;const d=this.bMarks[i];let l=d,s;for(i+1<n||o?s=this.eMarks[i]+1:s=this.eMarks[i];l<s&&c<r;){const f=this.src.charCodeAt(l);if(z(f))f===9?c+=4-(c+this.bsCount[i])%4:c++;else if(l-d<this.tShift[i])c++;else break;l++}c>r?u[a]=new Array(c-r+1).join(" ")+this.src.slice(l,s):u[a]=this.src.slice(l,s)}return u.join("")};Pe.prototype.Token=Te;const Ks=65536;function Ar(e,t){const n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function xu(e){const t=[],n=e.length;let r=0,o=e.charCodeAt(r),u=!1,a=0,i="";for(;r<n;)o===124&&(u?(i+=e.substring(a,r-1),a=r):(t.push(i+e.substring(a,r)),i="",a=r+1)),u=o===92,r++,o=e.charCodeAt(r);return t.push(i+e.substring(a)),t}function Xs(e,t,n,r){if(t+2>n)return!1;let o=t+1;if(e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)return!1;let u=e.bMarks[o]+e.tShift[o];if(u>=e.eMarks[o])return!1;const a=e.src.charCodeAt(u++);if(a!==124&&a!==45&&a!==58||u>=e.eMarks[o])return!1;const i=e.src.charCodeAt(u++);if(i!==124&&i!==45&&i!==58&&!z(i)||a===45&&z(i))return!1;for(;u<e.eMarks[o];){const w=e.src.charCodeAt(u);if(w!==124&&w!==45&&w!==58&&!z(w))return!1;u++}let c=Ar(e,t+1),d=c.split("|");const l=[];for(let w=0;w<d.length;w++){const _=d[w].trim();if(!_){if(w===0||w===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(_))return!1;_.charCodeAt(_.length-1)===58?l.push(_.charCodeAt(0)===58?"center":"right"):_.charCodeAt(0)===58?l.push("left"):l.push("")}if(c=Ar(e,t).trim(),c.indexOf("|")===-1||e.sCount[t]-e.blkIndent>=4)return!1;d=xu(c),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const s=d.length;if(s===0||s!==l.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),b=[t,0];p.map=b;const g=e.push("thead_open","thead",1);g.map=[t,t+1];const y=e.push("tr_open","tr",1);y.map=[t,t+1];for(let w=0;w<d.length;w++){const _=e.push("th_open","th",1);l[w]&&(_.attrs=[["style","text-align:"+l[w]]]);const A=e.push("inline","",0);A.content=d[w].trim(),A.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let x,C=0;for(o=t+2;o<n&&!(e.sCount[o]<e.blkIndent);o++){let w=!1;for(let A=0,F=h.length;A<F;A++)if(h[A](e,o,n,!0)){w=!0;break}if(w||(c=Ar(e,o).trim(),!c)||e.sCount[o]-e.blkIndent>=4||(d=xu(c),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),C+=s-d.length,C>Ks))break;if(o===t+2){const A=e.push("tbody_open","tbody",1);A.map=x=[t+2,0]}const _=e.push("tr_open","tr",1);_.map=[o,o+1];for(let A=0;A<s;A++){const F=e.push("td_open","td",1);l[A]&&(F.attrs=[["style","text-align:"+l[A]]]);const N=e.push("inline","",0);N.content=d[A]?d[A].trim():"",N.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return x&&(e.push("tbody_close","tbody",-1),x[1]=o),e.push("table_close","table",-1),b[1]=o,e.parentType=f,e.line=o,!0}function Js(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,o=r;for(;r<n;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,o=r;continue}break}e.line=o;const u=e.push("code_block","code",0);return u.content=e.getLines(t,o,4+e.blkIndent,!1)+`
`,u.map=[t,e.line],!0}function Qs(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||o+3>u)return!1;const a=e.src.charCodeAt(o);if(a!==126&&a!==96)return!1;let i=o;o=e.skipChars(o,a);let c=o-i;if(c<3)return!1;const d=e.src.slice(i,o),l=e.src.slice(o,u);if(a===96&&l.indexOf(String.fromCharCode(a))>=0)return!1;if(r)return!0;let s=t,f=!1;for(;s++,!(s>=n||(o=i=e.bMarks[s]+e.tShift[s],u=e.eMarks[s],o<u&&e.sCount[s]<e.blkIndent));)if(e.src.charCodeAt(o)===a&&!(e.sCount[s]-e.blkIndent>=4)&&(o=e.skipChars(o,a),!(o-i<c)&&(o=e.skipSpaces(o),!(o<u)))){f=!0;break}c=e.sCount[t],e.line=s+(f?1:0);const h=e.push("fence","code",0);return h.info=l,h.content=e.getLines(t+1,s,c,!0),h.markup=d,h.map=[t,e.line],!0}function el(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];const a=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(o)!==62)return!1;if(r)return!0;const i=[],c=[],d=[],l=[],s=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,p;for(p=t;p<n;p++){const C=e.sCount[p]<e.blkIndent;if(o=e.bMarks[p]+e.tShift[p],u=e.eMarks[p],o>=u)break;if(e.src.charCodeAt(o++)===62&&!C){let _=e.sCount[p]+1,A,F;e.src.charCodeAt(o)===32?(o++,_++,F=!1,A=!0):e.src.charCodeAt(o)===9?(A=!0,(e.bsCount[p]+_)%4===3?(o++,_++,F=!1):F=!0):A=!1;let N=_;for(i.push(e.bMarks[p]),e.bMarks[p]=o;o<u;){const Z=e.src.charCodeAt(o);if(z(Z))Z===9?N+=4-(N+e.bsCount[p]+(F?1:0))%4:N++;else break;o++}h=o>=u,c.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(A?1:0),d.push(e.sCount[p]),e.sCount[p]=N-_,l.push(e.tShift[p]),e.tShift[p]=o-e.bMarks[p];continue}if(h)break;let w=!1;for(let _=0,A=s.length;_<A;_++)if(s[_](e,p,n,!0)){w=!0;break}if(w){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),c.push(e.bsCount[p]),l.push(e.tShift[p]),d.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),c.push(e.bsCount[p]),l.push(e.tShift[p]),d.push(e.sCount[p]),e.sCount[p]=-1}const b=e.blkIndent;e.blkIndent=0;const g=e.push("blockquote_open","blockquote",1);g.markup=">";const y=[t,0];g.map=y,e.md.block.tokenize(e,t,p);const x=e.push("blockquote_close","blockquote",-1);x.markup=">",e.lineMax=a,e.parentType=f,y[1]=e.line;for(let C=0;C<l.length;C++)e.bMarks[C+t]=i[C],e.tShift[C+t]=l[C],e.sCount[C+t]=d[C],e.bsCount[C+t]=c[C];return e.blkIndent=b,!0}function tl(e,t,n,r){const o=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let u=e.bMarks[t]+e.tShift[t];const a=e.src.charCodeAt(u++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;u<o;){const d=e.src.charCodeAt(u++);if(d!==a&&!z(d))return!1;d===a&&i++}if(i<3)return!1;if(r)return!0;e.line=t+1;const c=e.push("hr","hr",0);return c.map=[t,e.line],c.markup=Array(i+1).join(String.fromCharCode(a)),!0}function Cu(e,t){const n=e.eMarks[t];let r=e.bMarks[t]+e.tShift[t];const o=e.src.charCodeAt(r++);if(o!==42&&o!==45&&o!==43)return-1;if(r<n){const u=e.src.charCodeAt(r);if(!z(u))return-1}return r}function wu(e,t){const n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];let o=n;if(o+1>=r)return-1;let u=e.src.charCodeAt(o++);if(u<48||u>57)return-1;for(;;){if(o>=r)return-1;if(u=e.src.charCodeAt(o++),u>=48&&u<=57){if(o-n>=10)return-1;continue}if(u===41||u===46)break;return-1}return o<r&&(u=e.src.charCodeAt(o),!z(u))?-1:o}function nl(e,t){const n=e.level+2;for(let r=t+2,o=e.tokens.length-2;r<o;r++)e.tokens[r].level===n&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function rl(e,t,n,r){let o,u,a,i,c=t,d=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let l=!1;r&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(l=!0);let s,f,h;if((h=wu(e,c))>=0){if(s=!0,a=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(a,h-1)),l&&f!==1)return!1}else if((h=Cu(e,c))>=0)s=!1;else return!1;if(l&&e.skipSpaces(h)>=e.eMarks[c])return!1;if(r)return!0;const p=e.src.charCodeAt(h-1),b=e.tokens.length;s?(i=e.push("ordered_list_open","ol",1),f!==1&&(i.attrs=[["start",f]])):i=e.push("bullet_list_open","ul",1);const g=[c,0];i.map=g,i.markup=String.fromCharCode(p);let y=!1;const x=e.md.block.ruler.getRules("list"),C=e.parentType;for(e.parentType="list";c<n;){u=h,o=e.eMarks[c];const w=e.sCount[c]+h-(e.bMarks[c]+e.tShift[c]);let _=w;for(;u<o;){const we=e.src.charCodeAt(u);if(we===9)_+=4-(_+e.bsCount[c])%4;else if(we===32)_++;else break;u++}const A=u;let F;A>=o?F=1:F=_-w,F>4&&(F=1);const N=w+F;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const Z=[c,0];i.map=Z,s&&(i.info=e.src.slice(a,h-1));const ge=e.tight,mt=e.tShift[c],Ue=e.sCount[c],ir=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=N,e.tight=!0,e.tShift[c]=A-e.bMarks[c],e.sCount[c]=_,A>=o&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n,!0),(!e.tight||y)&&(d=!1),y=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ir,e.tShift[c]=mt,e.sCount[c]=Ue,e.tight=ge,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),c=e.line,Z[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let hn=!1;for(let we=0,Bt=x.length;we<Bt;we++)if(x[we](e,c,n,!0)){hn=!0;break}if(hn)break;if(s){if(h=wu(e,c),h<0)break;a=e.bMarks[c]+e.tShift[c]}else if(h=Cu(e,c),h<0)break;if(p!==e.src.charCodeAt(h-1))break}return s?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),g[1]=c,e.line=c,e.parentType=C,d&&nl(e,b),!0}function ol(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t],a=t+1;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(o)!==91)return!1;function i(x){const C=e.lineMax;if(x>=C||e.isEmpty(x))return null;let w=!1;if(e.sCount[x]-e.blkIndent>3&&(w=!0),e.sCount[x]<0&&(w=!0),!w){const F=e.md.block.ruler.getRules("reference"),N=e.parentType;e.parentType="reference";let Z=!1;for(let ge=0,mt=F.length;ge<mt;ge++)if(F[ge](e,x,C,!0)){Z=!0;break}if(e.parentType=N,Z)return null}const _=e.bMarks[x]+e.tShift[x],A=e.eMarks[x];return e.src.slice(_,A+1)}let c=e.src.slice(o,u+1);u=c.length;let d=-1;for(o=1;o<u;o++){const x=c.charCodeAt(o);if(x===91)return!1;if(x===93){d=o;break}else if(x===10){const C=i(a);C!==null&&(c+=C,u=c.length,a++)}else if(x===92&&(o++,o<u&&c.charCodeAt(o)===10)){const C=i(a);C!==null&&(c+=C,u=c.length,a++)}}if(d<0||c.charCodeAt(d+1)!==58)return!1;for(o=d+2;o<u;o++){const x=c.charCodeAt(o);if(x===10){const C=i(a);C!==null&&(c+=C,u=c.length,a++)}else if(!z(x))break}const l=e.md.helpers.parseLinkDestination(c,o,u);if(!l.ok)return!1;const s=e.md.normalizeLink(l.str);if(!e.md.validateLink(s))return!1;o=l.pos;const f=o,h=a,p=o;for(;o<u;o++){const x=c.charCodeAt(o);if(x===10){const C=i(a);C!==null&&(c+=C,u=c.length,a++)}else if(!z(x))break}let b=e.md.helpers.parseLinkTitle(c,o,u);for(;b.can_continue;){const x=i(a);if(x===null)break;c+=x,o=u,u=c.length,a++,b=e.md.helpers.parseLinkTitle(c,o,u,b)}let g;for(o<u&&p!==o&&b.ok?(g=b.str,o=b.pos):(g="",o=f,a=h);o<u;){const x=c.charCodeAt(o);if(!z(x))break;o++}if(o<u&&c.charCodeAt(o)!==10&&g)for(g="",o=f,a=h;o<u;){const x=c.charCodeAt(o);if(!z(x))break;o++}if(o<u&&c.charCodeAt(o)!==10)return!1;const y=Gn(c.slice(1,d));return y?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[y]>"u"&&(e.env.references[y]={title:g,href:s}),e.line=a),!0):!1}const ul=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],il="[a-zA-Z_:][a-zA-Z0-9:._-]*",al="[^\"'=<>`\\x00-\\x20]+",cl="'[^']*'",sl='"[^"]*"',ll="(?:"+al+"|"+cl+"|"+sl+")",dl="(?:\\s+"+il+"(?:\\s*=\\s*"+ll+")?)",$i="<[A-Za-z][A-Za-z0-9\\-]*"+dl+"*\\s*\\/?>",Ui="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",fl="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",hl="<[?][\\s\\S]*?[?]>",pl="<![A-Za-z][^>]*>",ml="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",bl=new RegExp("^(?:"+$i+"|"+Ui+"|"+fl+"|"+hl+"|"+pl+"|"+ml+")"),gl=new RegExp("^(?:"+$i+"|"+Ui+")"),it=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+ul.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(gl.source+"\\s*$"),/^$/,!1]];function yl(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(o)!==60)return!1;let a=e.src.slice(o,u),i=0;for(;i<it.length&&!it[i][0].test(a);i++);if(i===it.length)return!1;if(r)return it[i][2];let c=t+1;const d=it[i][1].test("");if(!it[i][1].test(a)){for(;c<n&&!(e.sCount[c]<e.blkIndent&&(d||!e.isEmpty(c)));c++)if(o=e.bMarks[c]+e.tShift[c],u=e.eMarks[c],a=e.src.slice(o,u),it[i][1].test(a)){a.length!==0&&c++;break}}e.line=c;const l=e.push("html_block","",0);return l.map=[t,c],l.content=e.getLines(t,c,e.blkIndent,!0),!0}function kl(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(o);if(a!==35||o>=u)return!1;let i=1;for(a=e.src.charCodeAt(++o);a===35&&o<u&&i<=6;)i++,a=e.src.charCodeAt(++o);if(i>6||o<u&&!z(a))return!1;if(r)return!0;u=e.skipSpacesBack(u,o);const c=e.skipCharsBack(u,35,o);c>o&&z(e.src.charCodeAt(c-1))&&(u=c),e.line=t+1;const d=e.push("heading_open","h"+String(i),1);d.markup="########".slice(0,i),d.map=[t,e.line];const l=e.push("inline","",0);l.content=Wn(e.src.slice(o,u)),l.map=[t,e.line],l.children=[];const s=e.push("heading_close","h"+String(i),-1);return s.markup="########".slice(0,i),!0}function xl(e,t,n){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;const o=e.parentType;e.parentType="paragraph";let u=0,a,i=t+1;for(;i<n&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let h=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(h<p&&(a=e.src.charCodeAt(h),(a===45||a===61)&&(h=e.skipChars(h,a),h=e.skipSpaces(h),h>=p))){u=a===61?1:2;break}}if(e.sCount[i]<0)continue;let f=!1;for(let h=0,p=r.length;h<p;h++)if(r[h](e,i,n,!0)){f=!0;break}if(f)break}if(!u)return e.parentType=o,!1;const c=Wn(e.getLines(t,i,e.blkIndent,!1));e.line=i+1;const d=e.push("heading_open","h"+String(u),1);d.markup=String.fromCharCode(a),d.map=[t,e.line];const l=e.push("inline","",0);l.content=c,l.map=[t,e.line-1],l.children=[];const s=e.push("heading_close","h"+String(u),-1);return s.markup=String.fromCharCode(a),e.parentType=o,!0}function Cl(e,t,n){const r=e.md.block.ruler.getRules("paragraph"),o=e.parentType;let u=t+1;for(e.parentType="paragraph";u<n&&!e.isEmpty(u);u++){if(e.sCount[u]-e.blkIndent>3||e.sCount[u]<0)continue;let d=!1;for(let l=0,s=r.length;l<s;l++)if(r[l](e,u,n,!0)){d=!0;break}if(d)break}const a=Wn(e.getLines(t,u,e.blkIndent,!1));e.line=u;const i=e.push("paragraph_open","p",1);i.map=[t,e.line];const c=e.push("inline","",0);return c.content=a,c.map=[t,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=o,!0}const vn=[["table",Xs,["paragraph","reference"]],["code",Js],["fence",Qs,["paragraph","reference","blockquote","list"]],["blockquote",el,["paragraph","reference","blockquote","list"]],["hr",tl,["paragraph","reference","blockquote","list"]],["list",rl,["paragraph","reference","blockquote"]],["reference",ol],["html_block",yl,["paragraph","reference","blockquote"]],["heading",kl,["paragraph","reference","blockquote"]],["lheading",xl],["paragraph",Cl]];function Vn(){this.ruler=new me;for(let e=0;e<vn.length;e++)this.ruler.push(vn[e][0],vn[e][1],{alt:(vn[e][2]||[]).slice()})}Vn.prototype.tokenize=function(e,t,n){const r=this.ruler.getRules(""),o=r.length,u=e.md.options.maxNesting;let a=t,i=!1;for(;a<n&&(e.line=a=e.skipEmptyLines(a),!(a>=n||e.sCount[a]<e.blkIndent));){if(e.level>=u){e.line=n;break}const c=e.line;let d=!1;for(let l=0;l<o;l++)if(d=r[l](e,a,n,!1),d){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<n&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};Vn.prototype.parse=function(e,t,n,r){if(!e)return;const o=new this.State(e,t,n,r);this.tokenize(o,o.line,o.lineMax)};Vn.prototype.State=Pe;function sn(e,t,n,r){this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}sn.prototype.pushPending=function(){const e=new Te("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};sn.prototype.push=function(e,t,n){this.pending&&this.pushPending();const r=new Te(e,t,n);let o=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],o={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(o),r};sn.prototype.scanDelims=function(e,t){const n=this.posMax,r=this.src.charCodeAt(e);let o;if(e===0)o=32;else if(e===1)o=this.src.charCodeAt(0),(o&63488)===55296&&(o=65533);else if(o=this.src.charCodeAt(e-1),(o&64512)===56320){const g=this.src.charCodeAt(e-2);o=(g&64512)===55296?65536+(g-55296<<10)+(o-56320):65533}else(o&64512)===55296&&(o=65533);let u=e;for(;u<n&&this.src.charCodeAt(u)===r;)u++;const a=u-e;let i=u<n?this.src.charCodeAt(u):32;if((i&64512)===55296){const g=this.src.charCodeAt(u+1);i=(g&64512)===56320?65536+(i-55296<<10)+(g-56320):65533}else(i&64512)===56320&&(i=65533);const c=un(o)||on(o),d=un(i)||on(i),l=rn(o),s=rn(i),f=!s&&(!d||l||c),h=!l&&(!c||s||d);return{can_open:f&&(t||!h||c),can_close:h&&(t||!f||d),length:a}};sn.prototype.Token=Te;function wl(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function vl(e,t){let n=e.pos;for(;n<e.posMax&&!wl(e.src.charCodeAt(n));)n++;return n===e.pos?!1:(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}const _l=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function El(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;const n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;const o=e.pending.match(_l);if(!o)return!1;const u=o[1],a=e.md.linkify.matchAtStart(e.src.slice(n-u.length));if(!a)return!1;let i=a.url;if(i.length<=u.length)return!1;let c=i.length;for(;c>0&&i.charCodeAt(c-1)===42;)c--;c!==i.length&&(i=i.slice(0,c));const d=e.md.normalizeLink(i);if(!e.md.validateLink(d))return!1;if(!t){e.pending=e.pending.slice(0,-u.length);const l=e.push("link_open","a",1);l.attrs=[["href",d]],l.markup="linkify",l.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=i.length-u.length,!0}function Al(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;const r=e.pending.length-1,o=e.posMax;if(!t)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let u=r-1;for(;u>=1&&e.pending.charCodeAt(u-1)===32;)u--;e.pending=e.pending.slice(0,u),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(n++;n<o&&z(e.src.charCodeAt(n));)n++;return e.pos=n,!0}const mo=[];for(let e=0;e<256;e++)mo.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){mo[e.charCodeAt(0)]=1});function Sl(e,t){let n=e.pos;const r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let o=e.src.charCodeAt(n);if(o===10){for(t||e.push("hardbreak","br",0),n++;n<r&&(o=e.src.charCodeAt(n),!!z(o));)n++;return e.pos=n,!0}if(o===32){if(!t){const i=e.push("text_special","",0);i.content="\\",i.markup="\\",i.info="escape"}return e.pos=n,!0}let u=e.src[n];if(o>=55296&&o<=56319&&n+1<r){const i=e.src.charCodeAt(n+1);i>=56320&&i<=57343&&(u+=e.src[n+1],n++)}const a="\\"+u;if(!t){const i=e.push("text_special","",0);o<256&&mo[o]!==0?i.content=u:i.content=a,i.markup=a,i.info="escape"}return e.pos=n+1,!0}function Tl(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;const o=n;n++;const u=e.posMax;for(;n<u&&e.src.charCodeAt(n)===96;)n++;const a=e.src.slice(o,n),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=o)return t||(e.pending+=a),e.pos+=i,!0;let c=n,d;for(;(d=e.src.indexOf("`",c))!==-1;){for(c=d+1;c<u&&e.src.charCodeAt(c)===96;)c++;const l=c-d;if(l===i){if(!t){const s=e.push("code_inline","code",0);s.markup=a,s.content=e.src.slice(n,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[l]=d}return e.backticksScanned=!0,t||(e.pending+=a),e.pos+=i,!0}function Dl(e,t){const n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;const o=e.scanDelims(e.pos,!0);let u=o.length;const a=String.fromCharCode(r);if(u<2)return!1;let i;u%2&&(i=e.push("text","",0),i.content=a,u--);for(let c=0;c<u;c+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close});return e.pos+=o.length,!0}function vu(e,t){let n;const r=[],o=t.length;for(let u=0;u<o;u++){const a=t[u];if(a.marker!==126||a.end===-1)continue;const i=t[a.end];n=e.tokens[a.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=e.tokens[i.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&r.push(i.token-1)}for(;r.length;){const u=r.pop();let a=u+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,u!==a&&(n=e.tokens[a],e.tokens[a]=e.tokens[u],e.tokens[u]=n)}}function Fl(e){const t=e.tokens_meta,n=e.tokens_meta.length;vu(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&vu(e,t[r].delimiters)}const ji={tokenize:Dl,postProcess:Fl};function Ml(e,t){const n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;const o=e.scanDelims(e.pos,r===42);for(let u=0;u<o.length;u++){const a=e.push("text","",0);a.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:o.length,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close})}return e.pos+=o.length,!0}function _u(e,t){const n=t.length;for(let r=n-1;r>=0;r--){const o=t[r];if(o.marker!==95&&o.marker!==42||o.end===-1)continue;const u=t[o.end],a=r>0&&t[r-1].end===o.end+1&&t[r-1].marker===o.marker&&t[r-1].token===o.token-1&&t[o.end+1].token===u.token+1,i=String.fromCharCode(o.marker),c=e.tokens[o.token];c.type=a?"strong_open":"em_open",c.tag=a?"strong":"em",c.nesting=1,c.markup=a?i+i:i,c.content="";const d=e.tokens[u.token];d.type=a?"strong_close":"em_close",d.tag=a?"strong":"em",d.nesting=-1,d.markup=a?i+i:i,d.content="",a&&(e.tokens[t[r-1].token].content="",e.tokens[t[o.end+1].token].content="",r--)}}function Il(e){const t=e.tokens_meta,n=e.tokens_meta.length;_u(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&_u(e,t[r].delimiters)}const Gi={tokenize:Ml,postProcess:Il};function Ll(e,t){let n,r,o,u,a="",i="",c=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const l=e.pos,s=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let p=h+1;if(p<s&&e.src.charCodeAt(p)===40){for(d=!1,p++;p<s&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);if(p>=s)return!1;if(c=p,o=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),o.ok){for(a=e.md.normalizeLink(o.str),e.md.validateLink(a)?p=o.pos:a="",c=p;p<s&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);if(o=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<s&&c!==p&&o.ok)for(i=o.str,p=o.pos;p<s&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);}(p>=s||e.src.charCodeAt(p)!==41)&&(d=!0),p++}if(d){if(typeof e.env.references>"u")return!1;if(p<s&&e.src.charCodeAt(p)===91?(c=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?r=e.src.slice(c,p++):p=h+1):p=h+1,r||(r=e.src.slice(f,h)),u=e.env.references[Gn(r)],!u)return e.pos=l,!1;a=u.href,i=u.title}if(!t){e.pos=f,e.posMax=h;const b=e.push("link_open","a",1),g=[["href",a]];b.attrs=g,i&&g.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=s,!0}function Rl(e,t){let n,r,o,u,a,i,c,d,l="";const s=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(u=p+1,u<f&&e.src.charCodeAt(u)===40){for(u++;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);if(u>=f)return!1;for(d=u,i=e.md.helpers.parseLinkDestination(e.src,u,e.posMax),i.ok&&(l=e.md.normalizeLink(i.str),e.md.validateLink(l)?u=i.pos:l=""),d=u;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);if(i=e.md.helpers.parseLinkTitle(e.src,u,e.posMax),u<f&&d!==u&&i.ok)for(c=i.str,u=i.pos;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);else c="";if(u>=f||e.src.charCodeAt(u)!==41)return e.pos=s,!1;u++}else{if(typeof e.env.references>"u")return!1;if(u<f&&e.src.charCodeAt(u)===91?(d=u+1,u=e.md.helpers.parseLinkLabel(e,u),u>=0?o=e.src.slice(d,u++):u=p+1):u=p+1,o||(o=e.src.slice(h,p)),a=e.env.references[Gn(o)],!a)return e.pos=s,!1;l=a.href,c=a.title}if(!t){r=e.src.slice(h,p);const b=[];e.md.inline.parse(r,e.md,e.env,b);const g=e.push("image","img",0),y=[["src",l],["alt",""]];g.attrs=y,g.children=b,g.content=r,c&&y.push(["title",c])}return e.pos=u,e.posMax=f,!0}const Nl=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Ol=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Pl(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;const r=e.pos,o=e.posMax;for(;;){if(++n>=o)return!1;const a=e.src.charCodeAt(n);if(a===60)return!1;if(a===62)break}const u=e.src.slice(r+1,n);if(Ol.test(u)){const a=e.md.normalizeLink(u);if(!e.md.validateLink(a))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(u);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=u.length+2,!0}if(Nl.test(u)){const a=e.md.normalizeLink("mailto:"+u);if(!e.md.validateLink(a))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(u);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=u.length+2,!0}return!1}function zl(e){return/^<a[>\s]/i.test(e)}function Hl(e){return/^<\/a\s*>/i.test(e)}function Bl(e){const t=e|32;return t>=97&&t<=122}function ql(e,t){if(!e.md.options.html)return!1;const n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;const o=e.src.charCodeAt(r+1);if(o!==33&&o!==63&&o!==47&&!Bl(o))return!1;const u=e.src.slice(r).match(bl);if(!u)return!1;if(!t){const a=e.push("html_inline","",0);a.content=u[0],zl(a.content)&&e.linkLevel++,Hl(a.content)&&e.linkLevel--}return e.pos+=u[0].length,!0}const $l=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Ul=/^&([a-z][a-z0-9]{1,31});/i;function jl(e,t){const n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){const u=e.src.slice(n).match($l);if(u){if(!t){const a=u[1][0].toLowerCase()==="x"?parseInt(u[1].slice(1),16):parseInt(u[1],10),i=e.push("text_special","",0);i.content=ho(a)?nn(a):nn(65533),i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}else{const u=e.src.slice(n).match(Ul);if(u){const a=ss(u[0]);if(a!==u[0]){if(!t){const i=e.push("text_special","",0);i.content=a,i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}}return!1}function Eu(e){const t={},n=e.length;if(!n)return;let r=0,o=-2;const u=[];for(let a=0;a<n;a++){const i=e[a];if(u.push(0),(e[r].marker!==i.marker||o!==i.token-1)&&(r=a),o=i.token,i.length=i.length||0,!i.close)continue;t.hasOwnProperty(i.marker)||(t[i.marker]=[-1,-1,-1,-1,-1,-1]);const c=t[i.marker][(i.open?3:0)+i.length%3];let d=r-u[r]-1,l=d;for(;d>c;d-=u[d]+1){const s=e[d];if(s.marker===i.marker&&s.open&&s.end<0){let f=!1;if((s.close||i.open)&&(s.length+i.length)%3===0&&(s.length%3!==0||i.length%3!==0)&&(f=!0),!f){const h=d>0&&!e[d-1].open?u[d-1]+1:0;u[a]=a-d+h,u[d]=h,i.open=!1,s.end=a,s.close=!1,l=-1,o=-2;break}}}l!==-1&&(t[i.marker][(i.open?3:0)+(i.length||0)%3]=l)}}function Gl(e){const t=e.tokens_meta,n=e.tokens_meta.length;Eu(e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Eu(t[r].delimiters)}function Wl(e){let t,n,r=0;const o=e.tokens,u=e.tokens.length;for(t=n=0;t<u;t++)o[t].nesting<0&&r--,o[t].level=r,o[t].nesting>0&&r++,o[t].type==="text"&&t+1<u&&o[t+1].type==="text"?o[t+1].content=o[t].content+o[t+1].content:(t!==n&&(o[n]=o[t]),n++);t!==n&&(o.length=n)}const Sr=[["text",vl],["linkify",El],["newline",Al],["escape",Sl],["backticks",Tl],["strikethrough",ji.tokenize],["emphasis",Gi.tokenize],["link",Ll],["image",Rl],["autolink",Pl],["html_inline",ql],["entity",jl]],Tr=[["balance_pairs",Gl],["strikethrough",ji.postProcess],["emphasis",Gi.postProcess],["fragments_join",Wl]];function ln(){this.ruler=new me;for(let e=0;e<Sr.length;e++)this.ruler.push(Sr[e][0],Sr[e][1]);this.ruler2=new me;for(let e=0;e<Tr.length;e++)this.ruler2.push(Tr[e][0],Tr[e][1])}ln.prototype.skipToken=function(e){const t=e.pos,n=this.ruler.getRules(""),r=n.length,o=e.md.options.maxNesting,u=e.cache;if(typeof u[t]<"u"){e.pos=u[t];return}let a=!1;if(e.level<o){for(let i=0;i<r;i++)if(e.level++,a=n[i](e,!0),e.level--,a){if(t>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,u[t]=e.pos};ln.prototype.tokenize=function(e){const t=this.ruler.getRules(""),n=t.length,r=e.posMax,o=e.md.options.maxNesting;for(;e.pos<r;){const u=e.pos;let a=!1;if(e.level<o){for(let i=0;i<n;i++)if(a=t[i](e,!1),a){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};ln.prototype.parse=function(e,t,n,r){const o=new this.State(e,t,n,r);this.tokenize(o);const u=this.ruler2.getRules(""),a=u.length;for(let i=0;i<a;i++)u[i](o)};ln.prototype.State=sn;function Vl(e){const t={};e=e||{},t.src_Any=Mi.source,t.src_Cc=Ii.source,t.src_Z=Ri.source,t.src_P=lo.source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join("|"),t.src_ZCc=[t.src_Z,t.src_Cc].join("|");const n="[><｜]";return t.src_pseudo_letter=`(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`,t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",t.src_auth=`(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",t.src_host_terminator=`(?=$|${n}|${t.src_ZPCc})(?!${e["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`,t.src_path=`(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|`+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`,t.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',t.src_xn="xn--[a-z0-9\\-]{1,59}",t.src_domain_root="(?:"+t.src_xn+`|${t.src_pseudo_letter}{1,63})`,t.src_domain="(?:"+t.src_xn+`|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`,t.src_host=`(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`,t.tpl_host_fuzzy="(?:"+t.src_ip4+`|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`,t.tpl_host_no_ip_fuzzy=`(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`,t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`,t.tpl_email_fuzzy=`(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`,t.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${t.src_ZPCc}))((?![$+<=>^\`|｜])${t.tpl_host_port_fuzzy_strict}${t.src_path})`,t.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${t.src_ZPCc}))((?![$+<=>^\`|｜])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`,t}function Xr(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(r){e[r]=n[r]})}),e}function Zn(e){return Object.prototype.toString.call(e)}function Zl(e){return Zn(e)==="[object String]"}function Yl(e){return Zn(e)==="[object Object]"}function Kl(e){return Zn(e)==="[object RegExp]"}function Au(e){return Zn(e)==="[object Function]"}function Xl(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Wi={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Jl(e){return Object.keys(e||{}).reduce(function(t,n){return t||Wi.hasOwnProperty(n)},!1)}const Ql={"http:":{validate:function(e,t,n){const r=e.slice(t);return n.re.http||(n.re.http=new RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,t,n){const r=e.slice(t);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+`(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})`+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?t>=3&&e[t-3]===":"||t>=3&&e[t-3]==="/"?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,n){const r=e.slice(t);return n.re.mailto||(n.re.mailto=new RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},e0="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",t0="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function n0(e){return function(t,n){const r=t.slice(n);return e.test(r)?r.match(e)[0].length:0}}function Su(){return function(e,t){t.normalize(e)}}function Rn(e){const t=e.re=Vl(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(e0),n.push(t.src_xn),t.src_tlds=n.join("|");function r(i){return i.replace("%TLDS%",t.src_tlds)}t.email_fuzzy=RegExp(r(t.tpl_email_fuzzy),"i"),t.email_fuzzy_global=RegExp(r(t.tpl_email_fuzzy),"ig"),t.link_fuzzy=RegExp(r(t.tpl_link_fuzzy),"i"),t.link_fuzzy_global=RegExp(r(t.tpl_link_fuzzy),"ig"),t.link_no_ip_fuzzy=RegExp(r(t.tpl_link_no_ip_fuzzy),"i"),t.link_no_ip_fuzzy_global=RegExp(r(t.tpl_link_no_ip_fuzzy),"ig"),t.host_fuzzy_test=RegExp(r(t.tpl_host_fuzzy_test),"i");const o=[];e.__compiled__={};function u(i,c){throw new Error(`(LinkifyIt) Invalid schema "${i}": ${c}`)}Object.keys(e.__schemas__).forEach(function(i){const c=e.__schemas__[i];if(c===null)return;const d={validate:null,link:null};if(e.__compiled__[i]=d,Yl(c)){Kl(c.validate)?d.validate=n0(c.validate):Au(c.validate)?d.validate=c.validate:u(i,c),Au(c.normalize)?d.normalize=c.normalize:c.normalize?u(i,c):d.normalize=Su();return}if(Zl(c)){o.push(i);return}u(i,c)}),o.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Su()};const a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(Xl).join("|");e.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${t.src_ZPCc}))(${a})`,"i"),e.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${t.src_ZPCc}))(${a})`,"ig"),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,"i"),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,"i")}function Vi(e,t,n,r){const o=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=o,this.text=o,this.url=o}function ke(e,t){if(!(this instanceof ke))return new ke(e,t);t||Jl(e)&&(t=e,e={}),this.__opts__=Xr({},Wi,t),this.__schemas__=Xr({},Ql,e),this.__compiled__={},this.__tlds__=t0,this.__tlds_replaced__=!1,this.re={},Rn(this)}ke.prototype.add=function(t,n){return this.__schemas__[t]=n,Rn(this),this};ke.prototype.set=function(t){return this.__opts__=Xr(this.__opts__,t),this};ke.prototype.test=function(t){if(!t.length)return!1;let n,r;if(this.re.schema_test.test(t)){for(r=this.re.schema_search,r.lastIndex=0;(n=r.exec(t))!==null;)if(this.testSchemaAt(t,n[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&t.search(this.re.host_fuzzy_test)>=0&&t.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&t.indexOf("@")>=0&&t.match(this.re.email_fuzzy)!==null)};ke.prototype.pretest=function(t){return this.re.pretest.test(t)};ke.prototype.testSchemaAt=function(t,n,r){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(t,r,this):0};ke.prototype.match=function(t){const n=[],r=[],o=[],u=[];let a,i,c;function d(f,h){return f?h?f.index!==h.index?f.index<h.index?f:h:f.lastIndex>=h.lastIndex?f:h:f:h}if(!t.length)return null;if(this.re.schema_test.test(t))for(c=this.re.schema_search,c.lastIndex=0;(a=c.exec(t))!==null;)i=this.testSchemaAt(t,a[2],c.lastIndex),i&&r.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(c=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,c.lastIndex=0;(a=c.exec(t))!==null;)o.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(c=this.re.email_fuzzy_global,c.lastIndex=0;(a=c.exec(t))!==null;)u.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});const l=[0,0,0];let s=0;for(;;){const f=[r[l[0]],u[l[1]],o[l[2]]],h=d(d(f[0],f[1]),f[2]);if(!h)break;if(h===f[0]?l[0]++:h===f[1]?l[1]++:l[2]++,h.index<s)continue;const p=new Vi(t,h.schema,h.index,h.lastIndex);this.__compiled__[p.schema].normalize(p,this),n.push(p),s=h.lastIndex}return n.length?n:null};ke.prototype.matchAtStart=function(t){if(!t.length)return null;const n=this.re.schema_at_start.exec(t);if(!n)return null;const r=this.testSchemaAt(t,n[2],n[0].length);if(!r)return null;const o=new Vi(t,n[2],n.index+n[1].length,n.index+n[0].length+r);return this.__compiled__[o.schema].normalize(o,this),o};ke.prototype.tlds=function(t,n){return t=Array.isArray(t)?t:[t],n?(this.__tlds__=this.__tlds__.concat(t).sort().filter(function(r,o,u){return r!==u[o-1]}).reverse(),Rn(this),this):(this.__tlds__=t.slice(),this.__tlds_replaced__=!0,Rn(this),this)};ke.prototype.normalize=function(t){t.schema||(t.url=`http://${t.url}`),t.schema==="mailto:"&&!/^mailto:/i.test(t.url)&&(t.url=`mailto:${t.url}`)};ke.prototype.onCompile=function(){};const Dt=2147483647,Re=36,bo=1,an=26,r0=38,o0=700,Zi=72,Yi=128,Ki="-",u0=/^xn--/,i0=/[^\0-\x7F]/,a0=/[\x2E\u3002\uFF0E\uFF61]/g,c0={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Dr=Re-bo,Ne=Math.floor,Fr=String.fromCharCode;function Ke(e){throw new RangeError(c0[e])}function s0(e,t){const n=[];let r=e.length;for(;r--;)n[r]=t(e[r]);return n}function Xi(e,t){const n=e.split("@");let r="";n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(a0,".");const o=e.split("."),u=s0(o,t).join(".");return r+u}function Ji(e){const t=[];let n=0;const r=e.length;for(;n<r;){const o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<r){const u=e.charCodeAt(n++);(u&64512)==56320?t.push(((o&1023)<<10)+(u&1023)+65536):(t.push(o),n--)}else t.push(o)}return t}const l0=e=>String.fromCodePoint(...e),d0=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:Re},Tu=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},Qi=function(e,t,n){let r=0;for(e=n?Ne(e/o0):e>>1,e+=Ne(e/t);e>Dr*an>>1;r+=Re)e=Ne(e/Dr);return Ne(r+(Dr+1)*e/(e+r0))},ea=function(e){const t=[],n=e.length;let r=0,o=Yi,u=Zi,a=e.lastIndexOf(Ki);a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&Ke("not-basic"),t.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<n;){const c=r;for(let l=1,s=Re;;s+=Re){i>=n&&Ke("invalid-input");const f=d0(e.charCodeAt(i++));f>=Re&&Ke("invalid-input"),f>Ne((Dt-r)/l)&&Ke("overflow"),r+=f*l;const h=s<=u?bo:s>=u+an?an:s-u;if(f<h)break;const p=Re-h;l>Ne(Dt/p)&&Ke("overflow"),l*=p}const d=t.length+1;u=Qi(r-c,d,c==0),Ne(r/d)>Dt-o&&Ke("overflow"),o+=Ne(r/d),r%=d,t.splice(r++,0,o)}return String.fromCodePoint(...t)},ta=function(e){const t=[];e=Ji(e);const n=e.length;let r=Yi,o=0,u=Zi;for(const c of e)c<128&&t.push(Fr(c));const a=t.length;let i=a;for(a&&t.push(Ki);i<n;){let c=Dt;for(const l of e)l>=r&&l<c&&(c=l);const d=i+1;c-r>Ne((Dt-o)/d)&&Ke("overflow"),o+=(c-r)*d,r=c;for(const l of e)if(l<r&&++o>Dt&&Ke("overflow"),l===r){let s=o;for(let f=Re;;f+=Re){const h=f<=u?bo:f>=u+an?an:f-u;if(s<h)break;const p=s-h,b=Re-h;t.push(Fr(Tu(h+p%b,0))),s=Ne(p/b)}t.push(Fr(Tu(s,0))),u=Qi(o,d,i===a),o=0,++i}++o,++r}return t.join("")},f0=function(e){return Xi(e,function(t){return u0.test(t)?ea(t.slice(4).toLowerCase()):t})},h0=function(e){return Xi(e,function(t){return i0.test(t)?"xn--"+ta(t):t})},na={version:"2.3.1",ucs2:{decode:Ji,encode:l0},decode:ea,encode:ta,toASCII:h0,toUnicode:f0},p0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},m0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},b0={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},g0={default:p0,zero:m0,commonmark:b0},y0=/^(vbscript|javascript|file|data):/,k0=/^data:image\/(gif|png|jpeg|webp);/;function x0(e){const t=e.trim().toLowerCase();return y0.test(t)?k0.test(t):!0}const ra=["http:","https:","mailto:"];function C0(e){const t=so(e,!0);if(t.hostname&&(!t.protocol||ra.indexOf(t.protocol)>=0))try{t.hostname=na.toASCII(t.hostname)}catch{}return cn(co(t))}function w0(e){const t=so(e,!0);if(t.hostname&&(!t.protocol||ra.indexOf(t.protocol)>=0))try{t.hostname=na.toUnicode(t.hostname)}catch{}return It(co(t),It.defaultChars+"%")}function Ce(e,t){if(!(this instanceof Ce))return new Ce(e,t);t||fo(e)||(t=e||{},e="default"),this.inline=new ln,this.block=new Vn,this.core=new po,this.renderer=new Pt,this.linkify=new ke,this.validateLink=x0,this.normalizeLink=C0,this.normalizeLinkText=w0,this.utils=Es,this.helpers=jn({},Ds),this.options={},this.configure(e),t&&this.set(t)}Ce.prototype.set=function(e){return jn(this.options,e),this};Ce.prototype.configure=function(e){const t=this;if(fo(e)){const n=e;if(e=g0[n],!e)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&t[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&t[n].ruler2.enableOnly(e.components[n].rules2)}),this};Ce.prototype.enable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){n=n.concat(this[o].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(o){return n.indexOf(o)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};Ce.prototype.disable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){n=n.concat(this[o].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(o){return n.indexOf(o)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};Ce.prototype.use=function(e){const t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this};Ce.prototype.parse=function(e,t){if(typeof e!="string")throw new Error("Input data should be a String");const n=new this.core.State(e,this,t);return this.core.process(n),n.tokens};Ce.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)};Ce.prototype.parseInline=function(e,t){const n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens};Ce.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)};var Du=!1,Rt={false:"push",true:"unshift",after:"push",before:"unshift"},Nn={isPermalinkSymbol:!0};function Jr(e,t,n,r){var o;if(!Du){var u="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(u):console.warn(u),Du=!0}var a=[Object.assign(new n.Token("link_open","a",1),{attrs:[].concat(t.permalinkClass?[["class",t.permalinkClass]]:[],[["href",t.permalinkHref(e,n)]],Object.entries(t.permalinkAttrs(e,n)))}),Object.assign(new n.Token("html_block","",0),{content:t.permalinkSymbol,meta:Nn}),new n.Token("link_close","a",-1)];t.permalinkSpace&&n.tokens[r+1].children[Rt[t.permalinkBefore]](Object.assign(new n.Token("text","",0),{content:" "})),(o=n.tokens[r+1].children)[Rt[t.permalinkBefore]].apply(o,a)}function oa(e){return"#"+e}function ua(e){return{}}var v0={class:"header-anchor",symbol:"#",renderHref:oa,renderAttrs:ua};function dn(e){function t(n){return n=Object.assign({},t.defaults,n),function(r,o,u,a){return e(r,n,o,u,a)}}return t.defaults=Object.assign({},v0),t.renderPermalinkImpl=e,t}function go(e){var t=[],n=e.filter(function(r){if(r[0]!=="class")return!0;t.push(r[1])});return t.length>0&&n.unshift(["class",t.join(" ")]),n}var Yn=dn(function(e,t,n,r,o){var u,a=[Object.assign(new r.Token("link_open","a",1),{attrs:go([].concat(t.class?[["class",t.class]]:[],[["href",t.renderHref(e,r)]],t.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(t.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:Nn}),new r.Token("link_close","a",-1)];if(t.space){var i=typeof t.space=="string"?t.space:" ";r.tokens[o+1].children[Rt[t.placement]](Object.assign(new r.Token(typeof t.space=="string"?"html_inline":"text","",0),{content:i}))}(u=r.tokens[o+1].children)[Rt[t.placement]].apply(u,a)});Object.assign(Yn.defaults,{space:!0,placement:"after",ariaHidden:!1});var lt=dn(Yn.renderPermalinkImpl);lt.defaults=Object.assign({},Yn.defaults,{ariaHidden:!0});var ia=dn(function(e,t,n,r,o){var u=[Object.assign(new r.Token("link_open","a",1),{attrs:go([].concat(t.class?[["class",t.class]]:[],[["href",t.renderHref(e,r)]],Object.entries(t.renderAttrs(e,r))))})].concat(t.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[o+1].children,t.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[o+1].children=u});Object.assign(ia.defaults,{safariReaderFix:!1});var Fu=dn(function(e,t,n,r,o){var u;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(t.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+t.style+"`");if(!["aria-describedby","aria-labelledby"].includes(t.style)&&!t.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+t.style+"` style");if(t.style==="visually-hidden"&&!t.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var a=r.tokens[o+1].children.filter(function(s){return s.type==="text"||s.type==="code_inline"}).reduce(function(s,f){return s+f.content},""),i=[],c=[];if(t.class&&c.push(["class",t.class]),c.push(["href",t.renderHref(e,r)]),c.push.apply(c,Object.entries(t.renderAttrs(e,r))),t.style==="visually-hidden"){if(i.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",t.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:t.assistiveText(a)}),new r.Token("span_close","span",-1)),t.space){var d=typeof t.space=="string"?t.space:" ";i[Rt[t.placement]](Object.assign(new r.Token(typeof t.space=="string"?"html_inline":"text","",0),{content:d}))}i[Rt[t.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:Nn}),new r.Token("span_close","span",-1))}else i.push(Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:Nn}));t.style==="aria-label"?c.push(["aria-label",t.assistiveText(a)]):["aria-describedby","aria-labelledby"].includes(t.style)&&c.push([t.style,e]);var l=[Object.assign(new r.Token("link_open","a",1),{attrs:go(c)})].concat(i,[new r.Token("link_close","a",-1)]);(u=r.tokens).splice.apply(u,[o+3,0].concat(l)),t.wrapper&&(r.tokens.splice(o,0,Object.assign(new r.Token("html_block","",0),{content:t.wrapper[0]+`
`})),r.tokens.splice(o+3+l.length+1,0,Object.assign(new r.Token("html_block","",0),{content:t.wrapper[1]+`
`})))});function Mu(e,t,n,r){var o=e,u=r;if(n&&Object.prototype.hasOwnProperty.call(t,o))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(t,o);)o=e+"-"+u,u+=1;return t[o]=!0,o}function St(e,t){t=Object.assign({},St.defaults,t),e.core.ruler.push("anchor",function(n){for(var r,o={},u=n.tokens,a=Array.isArray(t.level)?(r=t.level,function(s){return r.includes(s)}):(function(s){return function(f){return f>=s}})(t.level),i=0;i<u.length;i++){var c=u[i];if(c.type==="heading_open"&&a(Number(c.tag.substr(1)))){var d=t.getTokensText(u[i+1].children),l=c.attrGet("id");l=l==null?Mu(l=t.slugifyWithState?t.slugifyWithState(d,n):t.slugify(d),o,!1,t.uniqueSlugStartIndex):Mu(l,o,!0,t.uniqueSlugStartIndex),c.attrSet("id",l),t.tabIndex!==!1&&c.attrSet("tabindex",""+t.tabIndex),typeof t.permalink=="function"?t.permalink(l,t,n,i):(t.permalink||t.renderPermalink&&t.renderPermalink!==Jr)&&t.renderPermalink(l,t,n,i),i=u.indexOf(c),t.callback&&t.callback(c,{slug:l,title:d})}}})}Object.assign(Fu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),St.permalink={__proto__:null,legacy:Jr,renderHref:oa,renderAttrs:ua,makePermalink:dn,linkInsideHeader:Yn,ariaHidden:lt,headerLink:ia,linkAfterHeader:Fu},St.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(t){return["text","code_inline"].includes(t.type)}).map(function(t){return t.content}).join("")},permalink:!1,renderPermalink:Jr,permalinkClass:lt.defaults.class,permalinkSpace:lt.defaults.space,permalinkSymbol:"¶",permalinkBefore:lt.defaults.placement==="before",permalinkHref:lt.defaults.renderHref,permalinkAttrs:lt.defaults.renderAttrs},St.default=St;function Kn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Mr,Iu;function _0(){if(Iu)return Mr;Iu=1;function e(r,o){var u,a,i=r.attrs[r.attrIndex("href")][1];for(u=0;u<o.length;++u){if(a=o[u],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function t(r,o,u){Object.keys(u).forEach(function(a){var i,c=u[a];a==="className"&&(a="class"),i=o[r].attrIndex(a),i<0?o[r].attrPush([a,c]):o[r].attrs[i][1]=c})}function n(r,o){o?o=Array.isArray(o)?o:[o]:o=[],Object.freeze(o);var u=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(a,i,c,d,l){var s=e(a[i],o),f=s&&s.attrs;return f&&t(i,a,f),u(a,i,c,d,l)}}return n.defaultRender=function(r,o,u,a,i){return i.renderToken(r,o,u)},Mr=n,Mr}var E0=_0();const A0=Kn(E0);function S0(e,t,n,r){const o=Number(e[t].meta.id+1).toString();let u="";return typeof r.docId=="string"&&(u=`-${r.docId}-`),u+o}function T0(e,t){let n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=`:${e[t].meta.subId}`),`[${n}]`}function D0(e,t,n,r,o){const u=o.rules.footnote_anchor_name(e,t,n,r,o),a=o.rules.footnote_caption(e,t,n,r,o);let i=u;return e[t].meta.subId>0&&(i+=`:${e[t].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${u}" id="fnref${i}">${a}</a></sup>`}function F0(e,t,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function M0(){return`</ol>
</section>
`}function I0(e,t,n,r,o){let u=o.rules.footnote_anchor_name(e,t,n,r,o);return e[t].meta.subId>0&&(u+=`:${e[t].meta.subId}`),`<li id="fn${u}" class="footnote-item">`}function L0(){return`</li>
`}function R0(e,t,n,r,o){let u=o.rules.footnote_anchor_name(e,t,n,r,o);return e[t].meta.subId>0&&(u+=`:${e[t].meta.subId}`),` <a href="#fnref${u}" class="footnote-backref">↩︎</a>`}function N0(e){const t=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=D0,e.renderer.rules.footnote_block_open=F0,e.renderer.rules.footnote_block_close=M0,e.renderer.rules.footnote_open=I0,e.renderer.rules.footnote_close=L0,e.renderer.rules.footnote_anchor=R0,e.renderer.rules.footnote_caption=T0,e.renderer.rules.footnote_anchor_name=S0;function r(i,c,d,l){const s=i.bMarks[c]+i.tShift[c],f=i.eMarks[c];if(s+4>f||i.src.charCodeAt(s)!==91||i.src.charCodeAt(s+1)!==94)return!1;let h;for(h=s+2;h<f;h++){if(i.src.charCodeAt(h)===32)return!1;if(i.src.charCodeAt(h)===93)break}if(h===s+2||h+1>=f||i.src.charCodeAt(++h)!==58)return!1;if(l)return!0;h++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const p=i.src.slice(s+2,h-2);i.env.footnotes.refs[`:${p}`]=-1;const b=new i.Token("footnote_reference_open","",1);b.meta={label:p},b.level=i.level++,i.tokens.push(b);const g=i.bMarks[c],y=i.tShift[c],x=i.sCount[c],C=i.parentType,w=h,_=i.sCount[c]+h-(i.bMarks[c]+i.tShift[c]);let A=_;for(;h<f;){const N=i.src.charCodeAt(h);if(n(N))N===9?A+=4-A%4:A++;else break;h++}i.tShift[c]=h-w,i.sCount[c]=A-_,i.bMarks[c]=w,i.blkIndent+=4,i.parentType="footnote",i.sCount[c]<i.blkIndent&&(i.sCount[c]+=i.blkIndent),i.md.block.tokenize(i,c,d,!0),i.parentType=C,i.blkIndent-=4,i.tShift[c]=y,i.sCount[c]=x,i.bMarks[c]=g;const F=new i.Token("footnote_reference_close","",-1);return F.level=--i.level,i.tokens.push(F),!0}function o(i,c){const d=i.posMax,l=i.pos;if(l+2>=d||i.src.charCodeAt(l)!==94||i.src.charCodeAt(l+1)!==91)return!1;const s=l+2,f=t(i,l+1);if(f<0)return!1;if(!c){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const h=i.env.footnotes.list.length,p=[];i.md.inline.parse(i.src.slice(s,f),i.md,i.env,p);const b=i.push("footnote_ref","",0);b.meta={id:h},i.env.footnotes.list[h]={content:i.src.slice(s,f),tokens:p}}return i.pos=f+1,i.posMax=d,!0}function u(i,c){const d=i.posMax,l=i.pos;if(l+3>d||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(l)!==91||i.src.charCodeAt(l+1)!==94)return!1;let s;for(s=l+2;s<d;s++){if(i.src.charCodeAt(s)===32||i.src.charCodeAt(s)===10)return!1;if(i.src.charCodeAt(s)===93)break}if(s===l+2||s>=d)return!1;s++;const f=i.src.slice(l+2,s-1);if(typeof i.env.footnotes.refs[`:${f}`]>"u")return!1;if(!c){i.env.footnotes.list||(i.env.footnotes.list=[]);let h;i.env.footnotes.refs[`:${f}`]<0?(h=i.env.footnotes.list.length,i.env.footnotes.list[h]={label:f,count:0},i.env.footnotes.refs[`:${f}`]=h):h=i.env.footnotes.refs[`:${f}`];const p=i.env.footnotes.list[h].count;i.env.footnotes.list[h].count++;const b=i.push("footnote_ref","",0);b.meta={id:h,subId:p,label:f}}return i.pos=s,i.posMax=d,!0}function a(i){let c,d,l,s=!1;const f={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(p){return p.type==="footnote_reference_open"?(s=!0,d=[],l=p.meta.label,!1):p.type==="footnote_reference_close"?(s=!1,f[":"+l]=d,!1):(s&&d.push(p),!s)}),!i.env.footnotes.list))return;const h=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let p=0,b=h.length;p<b;p++){const g=new i.Token("footnote_open","",1);if(g.meta={id:p,label:h[p].label},i.tokens.push(g),h[p].tokens){c=[];const C=new i.Token("paragraph_open","p",1);C.block=!0,c.push(C);const w=new i.Token("inline","",0);w.children=h[p].tokens,w.content=h[p].content,c.push(w);const _=new i.Token("paragraph_close","p",-1);_.block=!0,c.push(_)}else h[p].label&&(c=f[`:${h[p].label}`]);c&&(i.tokens=i.tokens.concat(c));let y;i.tokens[i.tokens.length-1].type==="paragraph_close"?y=i.tokens.pop():y=null;const x=h[p].count>0?h[p].count:1;for(let C=0;C<x;C++){const w=new i.Token("footnote_anchor","",0);w.meta={id:p,subId:C,label:h[p].label},i.tokens.push(w)}y&&i.tokens.push(y),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",o),e.inline.ruler.after("footnote_inline","footnote_ref",u),e.core.ruler.after("inline","footnote_tail",a)}var Ir,Lu;function O0(){if(Lu)return Ir;Lu=1;var e=!0,t=!1,n=!1;Ir=function(b,g){g&&(e=!g.enabled,t=!!g.label,n=!!g.labelAfter),b.core.ruler.after("inline","github-task-lists",function(y){for(var x=y.tokens,C=2;C<x.length;C++)u(x,C)&&(a(x[C],y.Token),r(x[C-2],"class","task-list-item"+(e?"":" enabled")),r(x[o(x,C-2)],"class","contains-task-list"))})};function r(b,g,y){var x=b.attrIndex(g),C=[g,y];x<0?b.attrPush(C):b.attrs[x]=C}function o(b,g){for(var y=b[g].level-1,x=g-1;x>=0;x--)if(b[x].level===y)return x;return-1}function u(b,g){return s(b[g])&&f(b[g-1])&&h(b[g-2])&&p(b[g])}function a(b,g){if(b.children.unshift(i(b,g)),b.children[1].content=b.children[1].content.slice(3),b.content=b.content.slice(3),t)if(n){b.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);b.children[0].content=b.children[0].content.slice(0,-1)+' id="'+y+'">',b.children.push(l(b.content,y,g))}else b.children.unshift(c(g)),b.children.push(d(g))}function i(b,g){var y=new g("html_inline","",0),x=e?' disabled="" ':"";return b.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+x+'type="checkbox">':(b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+x+'type="checkbox">'),y}function c(b){var g=new b("html_inline","",0);return g.content="<label>",g}function d(b){var g=new b("html_inline","",0);return g.content="</label>",g}function l(b,g,y){var x=new y("html_inline","",0);return x.content='<label class="task-list-item-label" for="'+g+'">'+b+"</label>",x.attrs=[{for:g}],x}function s(b){return b.type==="inline"}function f(b){return b.type==="paragraph_open"}function h(b){return b.type==="list_item_open"}function p(b){return b.content.indexOf("[ ] ")===0||b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0}return Ir}var P0=O0();const z0=Kn(P0),H0={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},B0=(e,t={})=>{const{markers:n=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=H0,matchCaseSensitive:o=!1,titles:u={},classPrefix:a="markdown-alert"}=t,i=n==="*"?"\\w+":n.join("|"),c=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,o?"":"i");e.core.ruler.after("block","github-alerts",d=>{const l=d.tokens;for(let s=0;s<l.length;s++)if(l[s].type==="blockquote_open"){const f=l[s],h=s;for(;l[s]?.type!=="blockquote_close"&&s<=l.length;)s+=1;const p=l[s],b=s,g=l.slice(h,b+1).find(_=>_.type==="inline");if(!g)continue;const y=g.content.match(c);if(!y)continue;const x=y[1].toLowerCase(),C=y[2].trim()||(u[x]??q0(x)),w=r[x]??"";g.content=g.content.slice(y[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:C,type:x,icon:w},p.type="alert_close",p.tag="div"}}),e.renderer.rules.alert_open=function(d,l){const{title:s,type:f,icon:h}=d[l].meta;return`<div class="${a} ${a}-${f}"><p class="${a}-title">${h}${s}</p>`}};function q0(e){return e.charAt(0).toUpperCase()+e.slice(1)}var P=Symbol("NOT_RESOLVED"),yo=Symbol("MERGE_KEY");function ae(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify??null,represent:t.represent??(n=>String(n)),representTagName:t.representTagName??null}}function ko(e,t){const n=t.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify??null,represent:t.represent??(r=>r),representTagName:t.representTagName??null}}function Xn(e,t){const n=t.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify??null,represent:t.represent??(r=>r),representTagName:t.representTagName??null}}var $0=ae("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),U0=["","~","null","Null","NULL"],j0=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>U0.indexOf(e)!==-1?null:P,identify:e=>e===null,represent:()=>"null"}),G0=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>e==="null"||t&&e===""?null:P,identify:e=>e===null,represent:()=>"null"}),W0=["","~","null","Null","NULL"],V0=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>W0.indexOf(e)!==-1?null:P,identify:e=>e===null,represent:()=>"null"}),Z0=["true","True","TRUE"],Y0=["false","False","FALSE"],K0=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>Z0.indexOf(e)!==-1?!0:Y0.indexOf(e)!==-1?!1:P,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),X0=["true"],J0=["false"],Q0=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>X0.indexOf(e)!==-1?!0:J0.indexOf(e)!==-1?!1:P,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),ed=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],td=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],nd=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>ed.indexOf(e)!==-1?!0:td.indexOf(e)!==-1?!1:P,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),rd=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),od=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function ud(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function id(e,t){if(t){if(!od.test(e))return P}else if(!rd.test(e))return P;const n=ud(e);return Number.isFinite(n)?n:P}var aa=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:id,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),ad=new RegExp("^-?(?:0|[1-9][0-9]*)$"),cd=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function sd(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function ld(e,t){if(t){if(!cd.test(e))return P}else if(!ad.test(e))return P;const n=sd(e);return Number.isFinite(n)?n:P}var dd=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:ld,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),fd=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function hd(e){let t=e.replace(/_/g,""),n=1;if((t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b"))return n*parseInt(t.slice(2),2);if(t.startsWith("0x"))return n*parseInt(t.slice(2),16);if(t.includes(":")){let r=0;for(const o of t.split(":"))r=r*60+Number(o);return n*r}return t!=="0"&&t[0]==="0"?n*parseInt(t,8):n*parseInt(t,10)}function pd(e){if(!fd.test(e))return P;const t=hd(e);return Number.isFinite(t)?t:P}var Qr=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:pd,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),md=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),bd=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function gd(e){if(!md.test(e))return P;let t=e.toLowerCase();const n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;const r=n*parseFloat(t);return Number.isFinite(r)||bd.test(e)?r:P}function yd(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var ca=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:gd,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:yd}),kd=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),xd=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Cd(e,t){if(t){if(!xd.test(e))return P;let r=e.toLowerCase();const o=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return o===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;const u=o*parseFloat(r);return Number.isFinite(u)?u:P}if(!kd.test(e))return P;const n=Number(e);return Number.isFinite(n)?n:P}function wd(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var vd=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Cd,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:wd}),_d=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Ed=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Ad(e){if(!_d.test(e))return P;let t=e.toLowerCase().replace(/_/g,"");const n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=0;if(t.includes(":")){for(const o of t.split(":"))r=r*60+Number(o);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Ed.test(e)?r:P}function Sd(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var eo=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Ad,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Sd}),Td=ae("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>e==="<<"||t&&e===""?yo:P}),Dd=/^[A-Za-z0-9+/]*={0,2}$/;function Fd(e){const t=e.replace(/\s/g,"");if(t.length%4!==0||!Dd.test(t))return P;const n=atob(t),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}function Md(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var Id=ae("tag:yaml.org,2002:binary",{resolve:Fd,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:Md}),Ld=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Rd=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Nd(e){let t=Ld.exec(e);if(t===null&&(t=Rd.exec(e)),t===null)return P;const n=+t[1],r=+t[2]-1,o=+t[3];if(!t[4]){const l=new Date(Date.UTC(n,r,o));return l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==o?P:l}const u=+t[4],a=+t[5],i=+t[6];let c=0;if(u>23||a>59||i>59)return P;if(t[7]){let l=t[7].slice(0,3);for(;l.length<3;)l+="0";c=+l}const d=new Date(Date.UTC(n,r,o,u,a,i,c));if(d.getUTCFullYear()!==n||d.getUTCMonth()!==r||d.getUTCDate()!==o)return P;if(t[9]){const l=+t[10],s=+(t[11]||0);if(l>23||s>59)return P;const f=(l*60+s)*6e4;d.setTime(d.getTime()-(t[9]==="-"?-f:f))}return d}var Od=ae("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:Nd,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),Pd=ko("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function Jn(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function Ru(e,t){const n={};for(const r of t)e[r]!==void 0&&(n[r]=e[r]);return n}var zd=ko("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return"cannot resolve an ordered map item";n=t.keys().next().value}else if(Jn(t)){const r=Object.keys(t);if(r.length!==1)return"cannot resolve an ordered map item";n=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(n)?"duplicate key in ordered map":(e.seen.add(n),e.list.push(t),"")},finalize:e=>e.list}),Hd=ko("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size!==1?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if(Object.prototype.toString.call(t)!=="[object Object]")return"cannot resolve a pairs item";const n=t,r=Object.keys(n);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],n[r[0]]]),"")}}),Bd=Xn("tag:yaml.org,2002:map",{create:()=>({}),identify:Jn,represent:e=>{const t=new Map;for(const n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(t!==null&&typeof t=="object")return"object-based map does not support complex keys";const r=String(t);return r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,""},has:(e,t)=>t!==null&&typeof t=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>e[String(t)]}),qd=Xn("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{const t=new Map;for(const n of e)t.set(n,null);return t},addPair:(e,t,n)=>n!==null?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function $d(){return{scalar:{},sequence:{},mapping:{}}}function Ud(){return{scalar:[],sequence:[],mapping:[]}}function jd(e){const t=[];for(const n of e){let r=t.length;for(let o=0;o<t.length;o++){const u=t[o];if(u.nodeKind===n.nodeKind&&u.tagName===n.tagName&&u.matchByTagPrefix===n.matchByTagPrefix){r=o;break}}t[r]=n}return t}var Qn=class sa{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(t){const n=jd(t),r=[],o=$d(),u=Ud();for(const l of n){if(l.nodeKind==="scalar"&&l.implicit){if(l.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(l)}switch(l.nodeKind){case"scalar":l.matchByTagPrefix?u.scalar.push(l):o.scalar[l.tagName]=l;break;case"sequence":l.matchByTagPrefix?u.sequence.push(l):o.sequence[l.tagName]=l;break;case"mapping":l.matchByTagPrefix?u.mapping.push(l):o.mapping[l.tagName]=l;break}}const a=r.filter(l=>l.implicitFirstChars===null),i=new Set;for(const l of r)if(l.implicitFirstChars!==null)for(const s of l.implicitFirstChars)i.add(s);const c=new Map;for(const l of i)c.set(l,r.filter(s=>s.implicitFirstChars===null||s.implicitFirstChars.indexOf(l)!==-1));const d=o.scalar["tag:yaml.org,2002:str"];if(!d)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=n,this.implicitScalarTags=r,this.implicitScalarByFirstChar=c,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=d,this.defaultSequenceTag=o.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=o.mapping["tag:yaml.org,2002:map"],this.exact=o,this.prefix=u}withTags(...t){let n=[];for(const r of t)n=n.concat(r);return new sa([...this.tags,...n])}},xo=new Qn([$0,Pd,Bd]);new Qn([...xo.tags,G0,Q0,dd,vd]);var la=new Qn([...xo.tags,j0,K0,aa,ca]),Gd=new Qn([...xo.tags,V0,nd,Qr,eo,Od,Td,Id,zd,Hd,qd]);Xn("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Jn(e),represent:e=>{if(e instanceof Map)return e;const t=new Map,n=e;for(const r of Object.keys(n))t.set(r,n[r]);return t}});function Nu(e){if(Array.isArray(e)){const t=Array.prototype.slice.call(e);for(let n=0;n<t.length;n++){if(Array.isArray(t[n]))return null;typeof t[n]=="object"&&Object.prototype.toString.call(t[n])==="[object Object]"&&(t[n]="[object Object]")}return String(t)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}Xn("tag:yaml.org,2002:map",{create:()=>({}),identify:Jn,represent:e=>{const t=new Map;for(const n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{const r=Nu(t);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,"")},has:(e,t)=>{const n=Nu(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>e[String(t)]});var Wd={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Lr(e,t,n,r,o){let u="",a="";const i=Math.floor(o/2)-1;return r-t>i&&(u=" ... ",t=r-i+u.length),n-r>i&&(a=" ...",n=r+i-a.length),{str:u+e.slice(t,n).replace(/\t/g,"→")+a,pos:r-t+u.length}}function Rr(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function Vd(e,t){if(!e.buffer)return null;const n={...Wd,...t},r=/\r?\n|\r|\0/g,o=[0],u=[];let a,i=-1;for(;a=r.exec(e.buffer);)u.push(a.index),o.push(a.index+a[0].length),e.position<=a.index&&i<0&&(i=o.length-2);i<0&&(i=o.length-1);let c="";const d=Math.min(e.line+n.linesAfter,u.length).toString().length,l=n.maxLength-(n.indent+d+3);for(let f=1;f<=n.linesBefore&&!(i-f<0);f++){const h=Lr(e.buffer,o[i-f],u[i-f],e.position-(o[i]-o[i-f]),l);c=`${" ".repeat(n.indent)}${Rr((e.line-f+1).toString(),d)} | ${h.str}
${c}`}const s=Lr(e.buffer,o[i],u[i],e.position,l);c+=`${" ".repeat(n.indent)}${Rr((e.line+1).toString(),d)} | ${s.str}
`,c+=`${"-".repeat(n.indent+d+3+s.pos)}^
`;for(let f=1;f<=n.linesAfter&&!(i+f>=u.length);f++){const h=Lr(e.buffer,o[i+f],u[i+f],e.position-(o[i]-o[i+f]),l);c+=`${" ".repeat(n.indent)}${Rr((e.line+f+1).toString(),d)} | ${h.str}
`}return c.replace(/\n$/,"")}function Ou(e,t){let n="";return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`

${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var On=class extends Error{reason;mark;constructor(e,t){super(),this.name="YAMLException",this.reason=e,this.mark=t,this.message=Ou(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Ou(this,e)}`}};function er(e,t,n,r=""){let o=0,u=0;for(let i=0;i<t;i++){const c=e.charCodeAt(i);c===10?(o++,u=i+1):c===13&&(o++,e.charCodeAt(i+1)===10&&i++,u=i+1)}const a={name:r,buffer:e,position:t,line:o,column:t-u};throw a.snippet=Vd(a),new On(n,a)}var Zd=-1;function Pu(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var da=new Array(256),fa=new Array(256);for(let e=0;e<256;e++)da[e]=Pu(e)?1:0,fa[e]=Pu(e);function Yd(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Kd(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Xd(e){return e===120?2:e===117?4:8}function Pn(e,t,n){let r=0;for(;t<n;){const o=e.charCodeAt(t);if(o===10)r++,t++;else if(o===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(o===32||o===9)t++;else break}return{position:t,breaks:r}}function Co(e){return e===1?" ":`
`.repeat(e-1)}function Jd(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===10||i===13){r+=e.slice(u,a);const c=Pn(e,o,n);r+=Co(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,a)}function Qd(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===39)r+=e.slice(u,o)+"'",o+=2,u=a=o;else if(i===10||i===13){r+=e.slice(u,a);const c=Pn(e,o,n);r+=Co(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,n)}function ef(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===92){r+=e.slice(u,o),o++;const c=e.charCodeAt(o);if(c===10||c===13)o=Pn(e,o,n).position;else if(c<256&&da[c])r+=fa[c],o++;else{let d=Xd(c),l=0;for(;d>0;d--){o++;const s=Kd(e.charCodeAt(o));l=(l<<4)+s}r+=Yd(l),o++}u=a=o}else if(i===10||i===13){r+=e.slice(u,a);const c=Pn(e,o,n);r+=Co(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,n)}function zu(e,t,n,r,o,u){const a=r<0?0:r,i=e.slice(t,n).replace(/\r\n?/g,`
`),c=i===""?[]:(i.endsWith(`
`)?i.slice(0,-1):i).split(`
`);let d="",l=!1,s=0,f=!1;for(const h of c){let p=0;for(;p<a&&h.charCodeAt(p)===32;)p++;if(r<0||p>=h.length){s++;continue}const b=h.slice(a),g=b.charCodeAt(0);u?g===32||g===9?(f=!0,d+=`
`.repeat(l?1+s:s)):f?(f=!1,d+=`
`.repeat(s+1)):s===0?l&&(d+=" "):d+=`
`.repeat(s):d+=`
`.repeat(l?1+s:s),d+=b,l=!0,s=0}return o===3?d+=`
`.repeat(l?1+s:s):o!==2&&l&&(d+=`
`),d}function tf(e,t){if(t.valueStart===Zd)return"";const{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case 2:return Qd(e,n,r);case 3:return ef(e,n,r);case 4:return zu(e,n,r,t.indent,t.chomping,!1);case 5:return zu(e,n,r,t.indent,t.chomping,!0);default:return Jd(e,n,r)}}var nf={"!":"!","!!":"tag:yaml.org,2002:"};function ha(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return decodeURIComponent(e.slice(2,-1));const n=e.indexOf("!",1),r=n===-1?"!":e.slice(0,n+1),o=t?.[r]??nf[r]??r;return decodeURIComponent(o)+decodeURIComponent(e.slice(r.length))}var Ft=-1,wo={filename:"",schema:la,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function rf(e){return"tagStart"in e&&e.tagStart!==Ft?e.tagStart:"anchorStart"in e&&e.anchorStart!==Ft?e.anchorStart:"valueStart"in e&&e.valueStart!==Ft?e.valueStart:"start"in e?e.start:0}function he(e,t){er(e.source,e.position,t,e.filename)}function pa(e,t,n,r){try{return n.finalize(r)}catch(o){if(o instanceof On)throw o;er(e.source,t,o instanceof Error?o.message:String(o),e.filename)}}function Fn(e,t,n){const r=e[n];if(r)return r;for(const o of t)if(n.startsWith(o.tagName))return o}function of(e,t,n,r,o){const u=Fn(t,n,r);if(u)return u;he(e,`unknown ${o} tag !<${r}>`)}function uf(e,t){const n=tf(e.source,t),r=t.tagStart===Ft?"":e.source.slice(t.tagStart,t.tagEnd),o=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:n,tag:o};const u=ha(r,e.tagHandlers),a=Fn(e.schema.exact.scalar,e.schema.prefix.scalar,u);if(a){const c=a.resolve(n,!0,u);return c===P&&he(e,`cannot resolve a node with !<${u}> explicit tag`),{value:c,tag:a}}const i=Fn(e.schema.exact.mapping,e.schema.prefix.mapping,u)??Fn(e.schema.exact.sequence,e.schema.prefix.sequence,u);if(i){n!==""&&he(e,`cannot resolve a node with !<${u}> explicit tag`);const c=i.create(u);return{value:i.carrierIsResult?c:pa(e,e.position,i,c),tag:i}}he(e,`unknown scalar tag !<${u}>`)}if(t.style===1){const u=e.schema.implicitScalarByFirstChar.get(n.charAt(0))??e.schema.implicitScalarAnyFirstChar;for(const a of u){const i=a.resolve(n,!1,a.tagName);if(i!==P)return{value:i,tag:a}}}return{value:o.resolve(n,!1,o.tagName),tag:o}}function Hu(e,t,n,r,o,u){const a=t.tagStart===Ft?"":e.source.slice(t.tagStart,t.tagEnd),i=a===""||a==="!"?o:ha(a,e.tagHandlers);return{tagName:i,tag:of(e,n,r,i,u)}}function ma(e){return e.nodeKind==="mapping"}function Bu(e,t,n,r){for(const o of r.keys(n)){if(e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&he(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`),t.tag.has(t.value,o))continue;const u=t.tag.addPair(t.value,o,r.get(n,o));u&&he(e,u),(t.overridable??=new Set).add(o)}}function af(e,t,n,r){if(e.position=t.keyPosition,ma(r))Bu(e,t,n,r);else if(r.nodeKind==="sequence"&&Array.isArray(n))for(const o of n)Bu(e,t,o,t.tag);else he(e,"cannot merge mappings; the provided source object is unacceptable")}function cf(e,t,n,r,o){if(e.position=t.keyPosition,n===yo){af(e,t,r,o);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&he(e,"duplicated mapping key");const u=t.tag.addPair(t.value,n,r);u&&he(e,u),t.overridable?.delete(n)}function Nr(e,t,n){const r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=t,r.hasValue=!0;else if(r.kind==="sequence"){r.merge&&(ma(n)||he(e,"cannot merge mappings; the provided source object is unacceptable"));const o=r.tag.addItem(r.value,t,r.index++);o&&he(e,o)}else if(r.hasKey){const o=r.key;r.key=void 0,r.hasKey=!1,cf(e,r,o,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0}function Or(e,t,n,r,o){if(t.anchorStart!==Ft){const u={value:n,tag:r,isValueFinal:o};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),u),u}return null}function sf(e,t){const n={...wo,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){const r=n.events[n.eventIndex++];switch(n.position=rf(r),r.type){case 1:n.anchors=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(const o of r.directives)o.kind==="tag"&&(n.tagHandlers[o.handle]=o.prefix);n.frames.push({kind:"document",position:n.position,value:void 0,hasValue:!1});break;case 4:{const{value:o,tag:u}=uf(n,r);Or(n,r,o,u,!0),Nr(n,o,u);break}case 2:{const o=Hu(n,r,n.schema.exact.sequence,n.schema.prefix.sequence,"tag:yaml.org,2002:seq","sequence"),u=o.tag.create(o.tagName),a=Or(n,r,u,o.tag,o.tag.carrierIsResult),i=n.frames[n.frames.length-1],c=i!==void 0&&i.kind==="mapping"&&i.hasKey&&i.key===yo;n.frames.push({kind:"sequence",position:n.position,value:u,tag:o.tag,anchor:a,index:0,merge:c});break}case 3:{const o=Hu(n,r,n.schema.exact.mapping,n.schema.prefix.mapping,"tag:yaml.org,2002:map","mapping"),u=o.tag.create(o.tagName),a=Or(n,r,u,o.tag,o.tag.carrierIsResult);n.frames.push({kind:"mapping",position:n.position,value:u,tag:o.tag,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,overridable:null});break}case 5:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&he(n,`aliases exceeded maxAliases (${n.maxAliases})`);const o=n.source.slice(r.anchorStart,r.anchorEnd),u=n.anchors.get(o);u||he(n,`unidentified alias "${o}"`),u.isValueFinal||he(n,`recursive alias "${o}" is not supported for tag ${u.tag.tagName} because it uses finalize()`),Nr(n,u.value,u.tag);break}case 6:{const o=n.frames.pop();if(o.kind==="document")n.documents.push(o.value);else{const u=o.tag.carrierIsResult?o.value:pa(n,o.position,o.tag,o.value);o.anchor&&(o.anchor.value=u,o.anchor.isValueFinal=!0),Nr(n,u,o.tag)}break}}}return n.documents}var R=-1,ba=Object.prototype.hasOwnProperty,Qe=1,to=2,ga=3,zn=4,lf=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,df=/[,\[\]{}]/,ya=/^(?:!|!!|![0-9A-Za-z-]+!)$/,no=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,ka=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,ff=new RegExp(`^(?:${no})*$`),hf=new RegExp(`^(?:${ka})+$`),pf=new RegExp(`^(?:!(?:${no})*|${ka}(?:${no})*)$`),vo={filename:"",maxDepth:100};function mf(e,t,n){e.events.push({type:1,explicitStart:t,explicitEnd:n,directives:e.directives})}function xa(e,t,n,r,o,u,a){e.events.push({type:2,start:t,anchorStart:n,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function Yt(e,t,n,r,o,u,a){e.events.push({type:3,start:t,anchorStart:n,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function zt(e,t,n,r,o,u,a,i,c=1,d=-1,l=!1){e.events.push({type:4,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:o,tagStart:u,tagEnd:a,style:i,chomping:c,indent:d,fast:l})}function bf(e,t,n){e.events.push({type:5,anchorStart:t,anchorEnd:n})}function Mt(e){e.events.push({type:6})}function fe(e){zt(e,R,R,R,R,R,R,1)}function qu(){return{anchorStart:R,anchorEnd:R,tagStart:R,tagEnd:R}}function Kt(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function tt(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function T(e,t){er(e.input.slice(0,e.length),e.position,t,e.filename)}function ee(e){return e===10||e===13}function ft(e){return e===9||e===32}function Ae(e){return ft(e)||ee(e)}function Be(e){return e===0||Ae(e)}function ht(e){return e===44||e===91||e===93||e===123||e===125}function gf(e){return e>=48&&e<=57?e-48:-1}function yf(e){if(e>=48&&e<=57)return e-48;const t=e|32;return t>=97&&t<=102?t-97+10:-1}function kf(e){return e===120?2:e===117?4:e===85?8:0}function xf(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function Hn(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function le(e,t){let n=0,r=e.input.charCodeAt(e.position),o=e.position===e.lineStart||Ae(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;ft(r);)o=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&o&&r===35)do r=e.input.charCodeAt(++e.position);while(!ee(r)&&r!==0);if(!ee(r))break;for(Hn(e),n++,o=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function nt(e,t=e.position){const n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){const r=e.input.charCodeAt(t+3);return r===0||Ae(r)}return!1}function $u(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!ee(t);)t=e.input.charCodeAt(++e.position)}function Ca(e,t,n){lf.test(e.input.slice(t,n))&&T(e,"the stream contains non-printable characters")}function Cf(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==R&&T(e,"duplication of a tag property");const r=e.position;let o=!1,u=!1,a="!",i=e.input.charCodeAt(++e.position);i===60?(o=!0,i=e.input.charCodeAt(++e.position)):i===33&&(u=!0,a="!!",i=e.input.charCodeAt(++e.position));let c=e.position,d;if(o){for(;i!==0&&i!==62;)i=e.input.charCodeAt(++e.position);i!==62&&T(e,"unexpected end of the stream within a verbatim tag"),d=e.input.slice(c,e.position),e.position++}else{for(;i!==0&&!Ae(i)&&!(n&&ht(i));)i===33&&(u?T(e,"tag suffix cannot contain exclamation marks"):(a=e.input.slice(c-1,e.position+1),ya.test(a)||T(e,"named tag handle cannot contain such characters"),u=!0,c=e.position+1)),i=e.input.charCodeAt(++e.position);d=e.input.slice(c,e.position),df.test(d)&&T(e,"tag suffix cannot contain flow indicator characters")}return d&&!(o?ff.test(d):hf.test(d))&&T(e,`tag name cannot contain such characters: ${d}`),!o&&a!=="!"&&a!=="!!"&&!ba.call(e.tagHandlers,a)&&T(e,`undeclared tag handle "${a}"`),t.tagStart=r,t.tagEnd=e.position,!0}function wf(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==R&&T(e,"duplication of an anchor property"),e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position))&&!ht(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&T(e,"name of an anchor node must contain at least one character"),t.anchorStart=n,t.anchorEnd=e.position,!0}function vf(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==R||t.tagStart!==R)&&T(e,"alias node should not have any properties"),e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position))&&!ht(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&T(e,"name of an alias node must contain at least one character"),bf(e,n,e.position),!0}function ro(e,t){le(e,!1),e.lineIndent<t&&T(e,"deficient indentation")}function _f(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===39){if(e.input.charCodeAt(e.position+1)===39){o=!1,e.position+=2;continue}const a=e.position;return e.position++,zt(e,r,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2,1,-1,o),!0}ee(u)?(o=!1,ro(e,t)):e.position===e.lineStart&&nt(e)?T(e,"unexpected end of the document within a single quoted scalar"):u!==9&&u<32?T(e,"expected valid JSON character"):e.position++}T(e,"unexpected end of the stream within a single quoted scalar")}function Ef(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===34){const a=e.position;return e.position++,zt(e,r,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,3,1,-1,o),!0}if(u===92){o=!1;const a=e.input.charCodeAt(++e.position);if(ee(a))ro(e,t);else if(xf(a))e.position++;else{let i=kf(a);for(i===0&&T(e,"unknown escape sequence");i-- >0;)e.position++,yf(e.input.charCodeAt(e.position))<0&&T(e,"expected hexadecimal character");e.position++}}else ee(u)?(o=!1,ro(e,t)):e.position===e.lineStart&&nt(e)?T(e,"unexpected end of the document within a double quoted scalar"):u!==9&&u<32?T(e,"expected valid JSON character"):e.position++}T(e,"unexpected end of the stream within a double quoted scalar")}function Af(e,t,n){const r=e.input.charCodeAt(e.position);let o=1,u=-1,a=!1;if(r!==124&&r!==62)return!1;const i=r===124?4:5;for(e.position++;e.input.charCodeAt(e.position)!==0;){const h=e.input.charCodeAt(e.position),p=gf(h);if(h===43||h===45)o!==1&&T(e,"repeat of a chomping mode identifier"),o=h===43?3:2,e.position++;else if(p>=0)p===0&&T(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),a&&T(e,"repeat of an indentation width identifier"),u=t+p-1,a=!0,e.position++;else break}let c=!1;for(;ft(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&$u(e),ee(e.input.charCodeAt(e.position))?Hn(e):e.input.charCodeAt(e.position)!==0&&T(e,"a line break is expected");let d=a?u:-1,l=0;const s=e.position;let f=e.position;for(;e.input.charCodeAt(e.position)!==0;){const h=e.position;let p=0;for(;e.input.charCodeAt(h+p)===32;)p++;const b=e.input.charCodeAt(h+p);if(b===0){d>=0?p>d&&(f=h+p):p>0&&(f=h+p);break}if(h===e.lineStart&&nt(e,h))break;if(!a&&d===-1&&ee(b)&&(l=Math.max(l,p)),!a&&d===-1&&!ee(b)&&(b===9&&p<t&&(e.position=h+p,T(e,"tab characters must not be used in indentation")),p<l&&(e.position=h+p,T(e,"bad indentation of a mapping entry"))),d===-1&&b!==0&&!ee(b)&&p<t){e.lineIndent=p,e.position=h+p;break}!a&&b!==0&&!ee(b)&&d===-1&&(d=p);const g=d===-1?t+1:d;if(b!==0&&!ee(b)&&p<g){e.lineIndent=p,e.position=h+p;break}$u(e),f=e.position,ee(e.input.charCodeAt(e.position))&&(Hn(e),f=e.position)}return Ca(e,s,f),zt(e,s,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,i,o,d),!0}function Sf(e,t){const n=e.input.charCodeAt(e.position),r=t===Qe;if(n===0||Ae(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||r&&ht(n))return!1;if(n===63||n===45){const o=e.input.charCodeAt(e.position+1);if(Be(o)||r&&ht(o))return!1}return!0}function Tf(e,t,n,r){if(!Sf(e,n))return!1;const o=e.position;let u=e.position,a=e.input.charCodeAt(e.position);const i=n===Qe;let c=!1;for(;a!==0&&!(e.position===e.lineStart&&nt(e));){if(a===58){const d=e.input.charCodeAt(e.position+1);if(Be(d)||i&&ht(d))break}else if(a===35){if(Ae(e.input.charCodeAt(e.position-1)))break}else{if(i&&ht(a))break;if(ee(a)){const d=e.position,l=e.line,s=e.lineStart,f=e.lineIndent;if(le(e,!1),e.lineIndent>=t){c=!0,a=e.input.charCodeAt(e.position);continue}e.position=d,e.line=l,e.lineStart=s,e.lineIndent=f;break}}ft(a)||(u=e.position+1),a=e.input.charCodeAt(++e.position)}return u===o?!1:(Ca(e,o,u),zt(e,o,u,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1,1,-1,!c),!0)}function at(e,t){const n=e.line;le(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&T(e,"deficient indentation")}function Df(e,t,n){const r=e.input.charCodeAt(e.position),o=r===123,u=e.position;let a=!0;if(r!==91&&r!==123)return!1;const i=o?125:93;for(o?Yt(e,u,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2):xa(e,u,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2),e.position++;e.input.charCodeAt(e.position)!==0;){at(e,t);let c=e.input.charCodeAt(e.position);if(c===i)return e.position++,Mt(e),!0;a?c===44&&T(e,"expected the node content, but found ','"):T(e,"missed comma between flow collection entries");let d=!1,l=!1;c===63&&Ae(e.input.charCodeAt(e.position+1))&&(d=l=!0,e.position+=1,at(e,t));const s=e.line,f=Kt(e),h=qe(e,t,Qe,!1,!0);at(e,t),c=e.input.charCodeAt(e.position),(o||l||e.line===s)&&c===58?(d=!0,e.position++,at(e,t),o?h||fe(e):(tt(e,f),Yt(e,f.position,R,R,R,R,2),qe(e,t,Qe,!1,!0)||fe(e),at(e,t),e.position++,at(e,t)),qe(e,t,Qe,!1,!0)||fe(e),at(e,t),o||Mt(e)):o&&d?(h||fe(e),fe(e)):o?fe(e):d&&(tt(e,f),Yt(e,f.position,R,R,R,R,2),qe(e,t,Qe,!1,!0),fe(e),Mt(e)),c=e.input.charCodeAt(e.position),c===44?(a=!0,e.position++):a=!1}T(e,"unexpected end of the stream within a flow collection")}function Uu(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!Be(e.input.charCodeAt(e.position+1)))return!1;for(xa(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,1);e.input.charCodeAt(e.position)===45&&Be(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,T(e,"tab characters must not be used in indentation"));const r=e.line;e.position++;const o=le(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&Be(e.input.charCodeAt(e.position+1))&&T(e,"bad indentation of a sequence entry"),o&&e.lineIndent<=t?fe(e):qe(e,t,ga,!1,!0),le(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&T(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&Be(e.input.charCodeAt(e.position+1))&&T(e,"bad indentation of a sequence entry")}return Mt(e),!0}function Pr(e,t,n,r){let o=!1,u=!1,a=!1,i=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!o&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,T(e,"tab characters must not be used in indentation"));const d=e.input.charCodeAt(e.position+1),l=e.line;if((c===63||c===58)&&Be(d))a||(Yt(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0),c===63?(o&&fe(e),u=!0,o=!0):(o||(fe(e),u=!0),o=!1),e.position+=1,i=!0;else{o&&(fe(e),o=!1);const s=Kt(e);if(!qe(e,n,to,!1,!0))break;if(e.line===l){for(c=e.input.charCodeAt(e.position);ft(c);)c=e.input.charCodeAt(++e.position);if(c===58){if(c=e.input.charCodeAt(++e.position),Be(c)||T(e,"a whitespace character is expected after the key-value separator within a block mapping"),!a){for(tt(e,s),Yt(e,s.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0,qe(e,n,to,!1,!0),c=e.input.charCodeAt(e.position);ft(c);)c=e.input.charCodeAt(++e.position);e.position++}u=!0,o=!1,i=!1}else if(u)T(e,"expected ':' after a mapping key");else return r.anchorStart!==R||r.tagStart!==R?(tt(e,s),!1):!0}else if(u)T(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==R||r.tagStart!==R?(tt(e,s),!1):!0}if(qe(e,t,zn,!0,i)&&(i=!1),o||i&&(fe(e),i=!1),le(e,!0),c=e.input.charCodeAt(e.position),(e.line===l||e.lineIndent>t)&&c!==0)T(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return u?(o&&fe(e),a&&Mt(e),!0):!1}function qe(e,t,n,r,o,u=!0){e.depth>=e.maxDepth&&T(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let a=1,i=!1,c=!1,d=null;const l=qu();let s=n===zn||n===ga,f=s;const h=s;if(r&&le(e,!0)&&(i=!0,e.lineIndent>t?a=1:e.lineIndent===t?a=0:a=-1),e.position===e.lineStart&&nt(e))return e.depth--,!1;if(a===1)for(;;){const p=e.input.charCodeAt(e.position),b=Kt(e);if(i&&a!==1&&(p===33||p===38))break;if(i&&h&&(l.tagStart!==R||l.anchorStart!==R)&&(p===33||p===38)){const g=Kt(e),y=t+1;if(Pr(e,e.position-e.lineStart,y,l)&&e.events[g.eventsLength]?.type===3)return e.depth--,!0;tt(e,g)}if(i&&(p===33&&l.tagStart!==R||p===38&&l.anchorStart!==R)||!Cf(e,l,n===Qe)&&!wf(e,l))break;d===null&&(d=b),le(e,!0)?(i=!0,f=h,e.lineIndent>t?a=1:e.lineIndent===t?a=0:a=-1):f=!1}if(f&&(f=i||o),a===1||n===zn){const p=n===Qe||n===to?t:t+1,b=e.position-e.lineStart;if(a===1)if(f&&(Uu(e,b,l)||Pr(e,b,p,l))||Df(e,p,l))c=!0;else{const g=e.input.charCodeAt(e.position);if(d!==null&&u&&h&&!f&&g!==124&&g!==62){const y=Kt(e),x=d.position-d.lineStart;tt(e,d),Pr(e,x,p,qu())&&e.events[y.eventsLength]?.type===3?c=!0:tt(e,y)}!c&&(s&&Af(e,p,l)||_f(e,p,l)||Ef(e,p,l)||vf(e,l)||Tf(e,p,n,l))&&(c=!0)}else a===0&&(c=f&&Uu(e,b,l))}return s=s&&!c,!c&&(l.anchorStart!==R||l.tagStart!==R||s)&&(zt(e,R,R,l.anchorStart,l.anchorEnd,l.tagStart,l.tagEnd,1),c=!0),e.depth--,c||l.anchorStart!==R||l.tagStart!==R}function Ff(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position));)e.position++;const n=e.input.slice(t,e.position),r=[];for(n.length===0&&T(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position));){for(;ft(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||ee(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;const o=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(o,e.position))}if(ee(e.input.charCodeAt(e.position))&&Hn(e),n==="YAML"){e.directives.some(u=>u.kind==="yaml")&&T(e,"duplication of %YAML directive"),r.length!==1&&T(e,"YAML directive accepts exactly one argument");const o=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);o===null&&T(e,"ill-formed argument of the YAML directive"),parseInt(o[1],10)!==1&&T(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(n==="TAG"){r.length!==2&&T(e,"TAG directive accepts exactly two arguments");const[o,u]=r;ya.test(o)||T(e,"ill-formed tag handle (first argument) of the TAG directive"),ba.call(e.tagHandlers,o)&&T(e,`there is a previously declared suffix for "${o}" tag handle`),pf.test(u)||T(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[o]=u,e.directives.push({kind:"tag",handle:o,prefix:u})}return!0}function Mf(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(le(e,!0);Ff(e);)t=!0,le(e,!0);let n=!1,r=!1,o=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&Be(e.input.charCodeAt(e.position+3))){n=!0;const i=e.line;e.position+=3,le(e,!0),o=e.line>i}else t&&T(e,"directives end mark is expected");const u=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&nt(e)){e.position+=3,le(e,!0);return}if(mf(e,n,!1),qe(e,e.lineIndent-1,zn,!1,o,o)||fe(e),le(e,!0),e.position===e.lineStart&&nt(e)&&(r=e.input.charCodeAt(e.position)===46,r)){const i=e.line;e.position+=3,le(e,!0),e.line===i&&e.position<e.length&&T(e,"end of the stream or a document separator is expected")}const a=e.events[u];a?.type===1&&(a.explicitEnd=r),Mt(e),!r&&e.position<e.length&&!(e.position===e.lineStart&&nt(e))&&T(e,"end of the stream or a document separator is expected")}function If(e,t){const n=e.length,r={...vo,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},o=e.indexOf("\0");for(o!==-1&&er(e,o,"null byte is not allowed in input",r.filename),r.input.charCodeAt(r.position)===65279&&r.position++;r.position<r.length&&(le(r,!0),!(r.position>=r.length));){const u=r.position;Mf(r),r.position===u&&T(r,"can not read a document")}return r.events}var Lf={...vo,...wo};function Rf(e,t={}){const n={...Lf,...t},r=String(e),o=Object.keys(vo),u=Object.keys(wo);return sf(If(r,Ru(n,o)),{...Ru(n,u),source:r})}function Nf(e,t){const n=Rf(e,t);if(n.length===0)throw new On("expected a document, but the input is empty");if(n.length===1)return n[0];throw new On("expected a single document in the stream, but found more")}Gd.withTags({...Qr,resolve:(e,t,n)=>{const r=Qr.resolve(e,t,n);return r===P?aa.resolve(e,t,n):r}},{...eo,resolve:(e,t,n)=>{const r=eo.resolve(e,t,n);return r===P?ca.resolve(e,t,n):r}});var zr,ju;function Of(){return ju||(ju=1,zr=function(t,n){var r=3,o="-",u=o.charCodeAt(0),a=o.length;function i(c,d,l,s){var f,h,p,b,g,y,x,C=!1,w=c.bMarks[d]+c.tShift[d],_=c.eMarks[d];if(d!==0||u!==c.src.charCodeAt(0))return!1;for(f=w+1;f<=_;f++)if(o[(f-w)%a]!==c.src[f]){x=f+1;break}if(p=Math.floor((f-w)/a),p<r)return!1;if(f-=(f-w)%a,s)return!0;for(h=d;h++,!(h>=l||c.src.slice(w,_)==="..."||(w=c.bMarks[h]+c.tShift[h],_=c.eMarks[h],w<_&&c.sCount[h]<c.blkIndent));)if(u===c.src.charCodeAt(w)&&!(c.sCount[h]-c.blkIndent>=4)){for(f=w+1;f<=_&&o[(f-w)%a]===c.src[f];f++);if(!(Math.floor((f-w)/a)<p)&&(f-=(f-w)%a,f=c.skipSpaces(f),!(f<_))){C=!0;break}}return g=c.parentType,y=c.lineMax,c.parentType="container",c.lineMax=h,b=c.push("front_matter",null,0),b.hidden=!0,b.markup=c.src.slice(d,f),b.block=!0,b.map=[d,h+(C?1:0)],b.meta=c.src.slice(x,w-1),c.parentType=g,c.lineMax=y,c.line=h+(C?1:0),n(b.meta),!0}t.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),zr}var Pf=Of();const zf=Kn(Pf);function Hf(){return e=>{let t="";e.use(zf,n=>{const r=Bf(n);r!==void 0?t=wa(r,e.utils.escapeHtml):t=""}),e.renderer.rules.front_matter=(n,r,o,u,a)=>t===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(n[r])}>
${t}
</table>
`}}function Bf(e){try{const t=Nf(e,{schema:la});if(t!==null&&typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length>0)return t}catch{}}function wa(e,t){const n=Object.entries(e);return n.length===0?"":`<tbody>
${n.map(([o,u])=>`<tr><th scope="row">${t(o)}</th><td>${oo(u,t)}</td></tr>`).join(`
`)}
</tbody>`}function oo(e,t){if(e==null)return"";if(e instanceof Date)return t(qf(e));if(Array.isArray(e))return e.every($f)?e.map(r=>oo(r,t)).join(", "):`<ul>${e.map(r=>`<li>${oo(r,t)}</li>`).join("")}</ul>`;if(typeof e=="object"){const n=wa(e,t);return n===""?"":`<table>${n}</table>`}return t(String(e))}function qf(e){if(Number.isNaN(e.getTime()))return"";const t=e.toISOString();return t.endsWith("T00:00:00.000Z")?t.slice(0,10):t}function $f(e){if(e==null||e instanceof Date)return!0;const t=typeof e;return t==="string"||t==="number"||t==="boolean"||t==="bigint"}const _o={rootValueKey:"extension.markeditPreview",defaultModes:["edit","side-by-side","preview","syntax-hidden"],defaultPreset:"default"},Uf=Ht(I.MarkEdit.userSettings),xe=Ht(Uf[_o.rootValueKey]),va=Ht(xe.changeMode),_a=Ht(xe.markdownIt),jf=fn(xe.syncScroll);fn(xe.hidePreviewButtons);fn(xe.syntaxAutoDetect,!1);const Gf=fn(xe.imageHoverPreview,!1),Wf=fn(xe.inlineImages,!1),Ea=Array.isArray(xe.inlineRendering)?xe.inlineRendering.filter(e=>e==="image"||e==="table"||e==="math"||e==="mermaid"):Wf?["image","table","math","mermaid"]:["table","math","mermaid"],tr=xe.themeName??"github",Aa=tr==="none",Hr=xe.styledHtmlColorScheme??xe.styledHtmlTheme??"auto";xe.mathDelimiters;const Vf=va.modes??_o.defaultModes,Gu=Ht(va.hotKey),Zf=_a.preset??_o.defaultPreset,Yf=Ht(_a.options);function Ht(e,t={}){return e??t}function fn(e,t=!0){return e??t}const Sa=`.markdown-body {
  --base-size-16: 1rem;
  --base-size-24: 1.5rem;
  --base-size-4: 0.25rem;
  --base-size-40: 2.5rem;
  --base-size-8: 0.5rem;
  --base-text-weight-medium: 500;
  --base-text-weight-normal: 400;
  --base-text-weight-semibold: 600;
  --fontStack-monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  --fontStack-sansSerif: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --fgColor-accent: Highlight;
}

.markdown-body {
  /** CSS default easing. Use for hover state changes and micro-interactions. */
  /** Accelerating motion. Use for elements exiting the viewport (moving off-screen). */
  /** Smooth acceleration and deceleration. Use for elements moving or morphing within the viewport. */
  /** Decelerating motion. Use for elements entering the viewport or appearing on screen. */
  /** Constant motion with no acceleration. Use for continuous animations like progress bars or loaders. */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  font-weight: var(--base-text-weight-normal, 400);
  color: var(--fgColor-default);
  background-color: var(--bgColor-default);
  font-family: var(--fontStack-sansSerif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji");
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body a {
  text-decoration: underline;
  text-underline-offset: .2rem;
}

.markdown-body .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}

.markdown-body h1:hover .anchor .octicon-link:before,
.markdown-body h2:hover .anchor .octicon-link:before,
.markdown-body h3:hover .anchor .octicon-link:before,
.markdown-body h4:hover .anchor .octicon-link:before,
.markdown-body h5:hover .anchor .octicon-link:before,
.markdown-body h6:hover .anchor .octicon-link:before {
  width: 16px;
  height: 16px;
  content: ' ';
  display: inline-block;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
}

.markdown-body details,
.markdown-body figcaption,
.markdown-body figure {
  display: block;
}

.markdown-body summary {
  display: list-item;
}

.markdown-body [hidden] {
  display: none !important;
}

.markdown-body a {
  background-color: rgba(0,0,0,0);
  color: var(--fgColor-accent);
  text-decoration: none;
}

.markdown-body abbr[title] {
  border-bottom: none;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

.markdown-body b,
.markdown-body strong {
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body dfn {
  font-style: italic;
}

.markdown-body h1 {
  margin: .67em 0;
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid var(--borderColor-muted);
}

.markdown-body mark {
  background-color: var(--bgColor-attention-muted);
  color: var(--fgColor-default);
}

.markdown-body small {
  font-size: 90%;
}

.markdown-body sub,
.markdown-body sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.markdown-body sub {
  bottom: -0.25em;
}

.markdown-body sup {
  top: -0.5em;
}

.markdown-body img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre,
.markdown-body samp {
  font-family: monospace;
  font-size: 1em;
}

.markdown-body figure {
  margin: 1em var(--base-size-40);
}

.markdown-body hr {
  box-sizing: content-box;
  overflow: hidden;
  background: rgba(0,0,0,0);
  border-bottom: 1px solid var(--borderColor-muted);
  height: .25em;
  padding: 0;
  margin: var(--base-size-24) 0;
  background-color: var(--borderColor-default);
  border: 0;
}

.markdown-body input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.markdown-body [type=button],
.markdown-body [type=reset],
.markdown-body [type=submit] {
  -webkit-appearance: button;
  appearance: button;
}

.markdown-body [type=checkbox],
.markdown-body [type=radio] {
  box-sizing: border-box;
  padding: 0;
}

.markdown-body [type=number]::-webkit-inner-spin-button,
.markdown-body [type=number]::-webkit-outer-spin-button {
  height: auto;
}

.markdown-body [type=search]::-webkit-search-cancel-button,
.markdown-body [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.markdown-body ::-webkit-input-placeholder {
  color: inherit;
  opacity: .54;
}

.markdown-body ::-webkit-file-upload-button {
  -webkit-appearance: button;
  appearance: button;
  font: inherit;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body ::placeholder {
  color: var(--fgColor-muted);
  opacity: 1;
}

.markdown-body hr::before {
  display: table;
  content: "";
}

.markdown-body hr::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: fit-content;
  max-width: min(100%, 960px);
  overflow: auto;
  font-variant: tabular-nums;
}

.markdown-body td,
.markdown-body th {
  padding: 0;
}

.markdown-body details summary {
  cursor: pointer;
}

.markdown-body a:focus,
.markdown-body [role=button]:focus,
.markdown-body input[type=radio]:focus,
.markdown-body input[type=checkbox]:focus {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body a:focus:not(:focus-visible),
.markdown-body [role=button]:focus:not(:focus-visible),
.markdown-body input[type=radio]:focus:not(:focus-visible),
.markdown-body input[type=checkbox]:focus:not(:focus-visible) {
  outline: solid 1px rgba(0,0,0,0);
}

.markdown-body a:focus-visible,
.markdown-body [role=button]:focus-visible,
.markdown-body input[type=radio]:focus-visible,
.markdown-body input[type=checkbox]:focus-visible {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body a:not([class]):focus,
.markdown-body a:not([class]):focus-visible,
.markdown-body input[type=radio]:focus,
.markdown-body input[type=radio]:focus-visible,
.markdown-body input[type=checkbox]:focus,
.markdown-body input[type=checkbox]:focus-visible {
  outline-offset: 0;
}

.markdown-body kbd {
  display: inline-block;
  padding: var(--base-size-4);
  font: 11px var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  line-height: 10px;
  color: var(--fgColor-default);
  vertical-align: middle;
  background-color: var(--bgColor-muted);
  border: solid 1px var(--borderColor-neutral-muted);
  border-bottom-color: var(--borderColor-neutral-muted);
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 var(--borderColor-neutral-muted);
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: var(--base-size-24);
  margin-bottom: var(--base-size-16);
  font-weight: var(--base-text-weight-semibold, 600);
  line-height: 1.25;
}

.markdown-body h2 {
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--borderColor-muted);
}

.markdown-body h3 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1.25em;
}

.markdown-body h4 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1em;
}

.markdown-body h5 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .875em;
}

.markdown-body h6 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .85em;
  color: var(--fgColor-muted);
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 10px;
}

.markdown-body blockquote {
  margin: 0;
  padding: 0 1em;
  color: var(--fgColor-muted);
  border-left: .25em solid var(--borderColor-default);
}

.markdown-body ul,
.markdown-body ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ol ol,
.markdown-body ul ol {
  list-style-type: lower-roman;
}

.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
  list-style-type: lower-alpha;
}

.markdown-body dd {
  margin-left: 0;
}

.markdown-body tt,
.markdown-body code,
.markdown-body samp {
  font-family: var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  font-size: 12px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  font-size: 12px;
  word-wrap: normal;
}

.markdown-body .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

.markdown-body input::-webkit-outer-spin-button,
.markdown-body input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

.markdown-body .mr-2 {
  margin-right: var(--base-size-8, 8px) !important;
}

.markdown-body::before {
  display: table;
  content: "";
}

.markdown-body::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.markdown-body .absent {
  color: var(--fgColor-danger);
}

.markdown-body .anchor {
  float: left;
  padding-right: var(--base-size-4);
  margin-left: -20px;
  line-height: 1;
}

.markdown-body .anchor:focus {
  outline: none;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre,
.markdown-body details {
  margin-top: 0;
  margin-bottom: var(--base-size-16);
}

.markdown-body blockquote>:first-child {
  margin-top: 0;
}

.markdown-body blockquote>:last-child {
  margin-bottom: 0;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
  color: var(--fgColor-default);
  vertical-align: middle;
  visibility: hidden;
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
  text-decoration: none;
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
  visibility: visible;
}

.markdown-body h1 tt,
.markdown-body h1 code,
.markdown-body h2 tt,
.markdown-body h2 code,
.markdown-body h3 tt,
.markdown-body h3 code,
.markdown-body h4 tt,
.markdown-body h4 code,
.markdown-body h5 tt,
.markdown-body h5 code,
.markdown-body h6 tt,
.markdown-body h6 code {
  padding: 0 .2em;
  font-size: inherit;
}

.markdown-body summary h1,
.markdown-body summary h2,
.markdown-body summary h3,
.markdown-body summary h4,
.markdown-body summary h5,
.markdown-body summary h6 {
  display: inline-block;
}

.markdown-body summary h1 .anchor,
.markdown-body summary h2 .anchor,
.markdown-body summary h3 .anchor,
.markdown-body summary h4 .anchor,
.markdown-body summary h5 .anchor,
.markdown-body summary h6 .anchor {
  margin-left: -40px;
}

.markdown-body summary h1,
.markdown-body summary h2 {
  padding-bottom: 0;
  border-bottom: 0;
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
  padding: 0;
  list-style-type: none;
}

.markdown-body ol[type="a s"] {
  list-style-type: lower-alpha;
}

.markdown-body ol[type="A s"] {
  list-style-type: upper-alpha;
}

.markdown-body ol[type="i s"] {
  list-style-type: lower-roman;
}

.markdown-body ol[type="I s"] {
  list-style-type: upper-roman;
}

.markdown-body ol[type="1"] {
  list-style-type: decimal;
}

.markdown-body div>ol:not([type]) {
  list-style-type: decimal;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li>p {
  margin-top: var(--base-size-16);
}

.markdown-body li+li {
  margin-top: .25em;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: var(--base-size-16);
  font-size: 1em;
  font-style: italic;
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body dl dd {
  padding: 0 var(--base-size-16);
  margin-bottom: var(--base-size-16);
}

.markdown-body table th {
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid var(--borderColor-default);
}

.markdown-body table td>:last-child {
  margin-bottom: 0;
}

.markdown-body table tr {
  background-color: var(--bgColor-default);
  border-top: 1px solid var(--borderColor-muted);
}

.markdown-body table tr:nth-child(2n) {
  background-color: var(--bgColor-muted);
}

.markdown-body table img {
  background-color: rgba(0,0,0,0);
}

.markdown-body img[align=right] {
  padding-left: 20px;
}

.markdown-body img[align=left] {
  padding-right: 20px;
}

.markdown-body .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: rgba(0,0,0,0);
}

.markdown-body span.frame {
  display: block;
  overflow: hidden;
}

.markdown-body span.frame>span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid var(--borderColor-default);
}

.markdown-body span.frame span img {
  display: block;
  float: left;
}

.markdown-body span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: var(--fgColor-default);
}

.markdown-body span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-center>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

.markdown-body span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

.markdown-body span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-right>span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body span.align-right span img {
  margin: 0;
  text-align: right;
}

.markdown-body span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

.markdown-body span.float-left span {
  margin: 13px 0 0;
}

.markdown-body span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

.markdown-body span.float-right>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body code,
.markdown-body tt {
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: var(--bgColor-neutral-muted);
  border-radius: 6px;
}

.markdown-body code br,
.markdown-body tt br {
  display: none;
}

.markdown-body del code {
  text-decoration: inherit;
}

.markdown-body samp {
  font-size: 85%;
}

.markdown-body pre code {
  font-size: 100%;
}

.markdown-body pre>code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: rgba(0,0,0,0);
  border: 0;
}

.markdown-body .highlight {
  margin-bottom: var(--base-size-16);
}

.markdown-body .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
  padding: var(--base-size-16);
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  color: var(--fgColor-default);
  background-color: var(--bgColor-muted);
  border-radius: 6px;
}

.markdown-body pre code,
.markdown-body pre tt {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: rgba(0,0,0,0);
  border: 0;
}

.markdown-body .csv-data td,
.markdown-body .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}

.markdown-body .csv-data .blob-num {
  padding: 10px var(--base-size-8) 9px;
  text-align: right;
  background: var(--bgColor-default);
  border: 0;
}

.markdown-body .csv-data tr {
  border-top: 0;
}

.markdown-body .csv-data th {
  font-weight: var(--base-text-weight-semibold, 600);
  background: var(--bgColor-muted);
  border-top: 0;
}

.markdown-body [data-footnote-ref]::before {
  content: "[";
}

.markdown-body [data-footnote-ref]::after {
  content: "]";
}

.markdown-body .footnotes {
  font-size: 12px;
  color: var(--fgColor-muted);
  border-top: 1px solid var(--borderColor-default);
}

.markdown-body .footnotes ol {
  padding-left: var(--base-size-16);
}

.markdown-body .footnotes ol ul {
  display: inline-block;
  padding-left: var(--base-size-16);
  margin-top: var(--base-size-16);
}

.markdown-body .footnotes li {
  position: relative;
}

.markdown-body .footnotes li:target::before {
  position: absolute;
  top: calc(var(--base-size-8)*-1);
  right: calc(var(--base-size-8)*-1);
  bottom: calc(var(--base-size-8)*-1);
  left: calc(var(--base-size-24)*-1);
  pointer-events: none;
  content: "";
  border: 2px solid var(--borderColor-accent-emphasis);
  border-radius: 6px;
}

.markdown-body .footnotes li:target {
  color: var(--fgColor-default);
}

.markdown-body .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}

.markdown-body .pl-c {
  color: var(--color-prettylights-syntax-comment);
}

.markdown-body .pl-c1,
.markdown-body .pl-s .pl-v {
  color: var(--color-prettylights-syntax-constant);
}

.markdown-body .pl-e,
.markdown-body .pl-en {
  color: var(--color-prettylights-syntax-entity);
}

.markdown-body .pl-smi,
.markdown-body .pl-s .pl-s1 {
  color: var(--color-prettylights-syntax-storage-modifier-import);
}

.markdown-body .pl-ent {
  color: var(--color-prettylights-syntax-entity-tag);
}

.markdown-body .pl-k {
  color: var(--color-prettylights-syntax-keyword);
}

.markdown-body .pl-s,
.markdown-body .pl-pds,
.markdown-body .pl-s .pl-pse .pl-s1,
.markdown-body .pl-sr,
.markdown-body .pl-sr .pl-cce,
.markdown-body .pl-sr .pl-sre,
.markdown-body .pl-sr .pl-sra {
  color: var(--color-prettylights-syntax-string);
}

.markdown-body .pl-v,
.markdown-body .pl-smw {
  color: var(--color-prettylights-syntax-variable);
}

.markdown-body .pl-bu {
  color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
}

.markdown-body .pl-ii {
  color: var(--color-prettylights-syntax-invalid-illegal-text);
  background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
}

.markdown-body .pl-c2 {
  color: var(--color-prettylights-syntax-carriage-return-text);
  background-color: var(--color-prettylights-syntax-carriage-return-bg);
}

.markdown-body .pl-sr .pl-cce {
  font-weight: bold;
  color: var(--color-prettylights-syntax-string-regexp);
}

.markdown-body .pl-ml {
  color: var(--color-prettylights-syntax-markup-list);
}

.markdown-body .pl-mh,
.markdown-body .pl-mh .pl-en,
.markdown-body .pl-ms {
  font-weight: bold;
  color: var(--color-prettylights-syntax-markup-heading);
}

.markdown-body .pl-mi {
  font-style: italic;
  color: var(--color-prettylights-syntax-markup-italic);
}

.markdown-body .pl-mb {
  font-weight: bold;
  color: var(--color-prettylights-syntax-markup-bold);
}

.markdown-body .pl-md {
  color: var(--color-prettylights-syntax-markup-deleted-text);
  background-color: var(--color-prettylights-syntax-markup-deleted-bg);
}

.markdown-body .pl-mi1 {
  color: var(--color-prettylights-syntax-markup-inserted-text);
  background-color: var(--color-prettylights-syntax-markup-inserted-bg);
}

.markdown-body .pl-mc {
  color: var(--color-prettylights-syntax-markup-changed-text);
  background-color: var(--color-prettylights-syntax-markup-changed-bg);
}

.markdown-body .pl-mi2 {
  color: var(--color-prettylights-syntax-markup-ignored-text);
  background-color: var(--color-prettylights-syntax-markup-ignored-bg);
}

.markdown-body .pl-mdr {
  font-weight: bold;
  color: var(--color-prettylights-syntax-meta-diff-range);
}

.markdown-body .pl-ba {
  color: var(--color-prettylights-syntax-brackethighlighter-angle);
}

.markdown-body .pl-sg {
  color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
}

.markdown-body .pl-corl {
  text-decoration: underline;
  color: var(--color-prettylights-syntax-constant-other-reference-link);
}

.markdown-body [role=button]:focus:not(:focus-visible),
.markdown-body [role=tabpanel][tabindex="0"]:focus:not(:focus-visible),
.markdown-body button:focus:not(:focus-visible),
.markdown-body summary:focus:not(:focus-visible),
.markdown-body a:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

.markdown-body [tabindex="0"]:focus:not(:focus-visible),
.markdown-body details-dialog:focus:not(:focus-visible) {
  outline: none;
}

.markdown-body g-emoji {
  display: inline-block;
  min-width: 1ch;
  font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1em;
  font-style: normal !important;
  font-weight: var(--base-text-weight-normal, 400);
  line-height: 1;
  vertical-align: -0.075em;
}

.markdown-body g-emoji img {
  width: 1em;
  height: 1em;
}

.markdown-body a:has(>p,>div,>pre,>blockquote) {
  display: block;
}

.markdown-body a:has(>p,>div,>pre,>blockquote):not(:has(.snippet-clipboard-content,>pre)) {
  width: fit-content;
}

.markdown-body a:has(>p,>div,>pre,>blockquote):has(.snippet-clipboard-content,>pre):focus-visible {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: 2px;
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item label {
  font-weight: var(--base-text-weight-normal, 400);
}

.markdown-body .task-list-item.enabled label {
  cursor: pointer;
}

.markdown-body .task-list-item+.task-list-item {
  margin-top: var(--base-size-4);
}

.markdown-body .task-list-item .handle {
  display: none;
}

.markdown-body .task-list-item-checkbox {
  margin: 0 .2em .25em -1.4em;
  vertical-align: middle;
}

.markdown-body ul:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}

.markdown-body ol:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}

.markdown-body .contains-task-list:hover .task-list-item-convert-container,
.markdown-body .contains-task-list:focus-within .task-list-item-convert-container {
  display: block;
  width: auto;
  height: 24px;
  overflow: visible;
  clip-path: none;
}

.markdown-body ::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}

.markdown-body .markdown-alert {
  padding: var(--base-size-8) var(--base-size-16);
  margin-bottom: var(--base-size-16);
  color: inherit;
  border-left: .25em solid var(--borderColor-default);
}

.markdown-body .markdown-alert>:first-child {
  margin-top: 0;
}

.markdown-body .markdown-alert>:last-child {
  margin-bottom: 0;
}

.markdown-body .markdown-alert .markdown-alert-title {
  display: flex;
  font-weight: var(--base-text-weight-medium, 500);
  align-items: center;
  line-height: 1;
}

.markdown-body .markdown-alert.markdown-alert-note {
  border-left-color: var(--borderColor-accent-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title {
  color: var(--fgColor-accent);
}

.markdown-body .markdown-alert.markdown-alert-important {
  border-left-color: var(--borderColor-done-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-important .markdown-alert-title {
  color: var(--fgColor-done);
}

.markdown-body .markdown-alert.markdown-alert-warning {
  border-left-color: var(--borderColor-attention-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title {
  color: var(--fgColor-attention);
}

.markdown-body .markdown-alert.markdown-alert-tip {
  border-left-color: var(--borderColor-success-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title {
  color: var(--fgColor-success);
}

.markdown-body .markdown-alert.markdown-alert-caution {
  border-left-color: var(--borderColor-danger-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title {
  color: var(--fgColor-danger);
}

.markdown-body>*:first-child>.heading-element:first-child {
  margin-top: 0 !important;
}

.markdown-body .highlight pre:has(+.zeroclipboard-container) {
  min-height: 52px;
}
`,Kf=`.markdown-body {
  /* light */
  color-scheme: light;
  --fgColor-danger: #d1242f;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-muted: #f6f8fa;
  --bgColor-neutral-muted: #818b981f;
  --borderColor-accent-emphasis: #0969da;
  --borderColor-attention-emphasis: #9a6700;
  --borderColor-danger-emphasis: #cf222e;
  --borderColor-default: #d1d9e0;
  --borderColor-done-emphasis: #8250df;
  --borderColor-success-emphasis: #1a7f37;
  --color-prettylights-syntax-brackethighlighter-angle: #59636e;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-comment: #59636e;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-prettylights-syntax-entity: #6639ba;
  --color-prettylights-syntax-entity-tag: #0550ae;
  --color-prettylights-syntax-invalid-illegal-text: var(--fgColor-danger);
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-markup-ignored-text: #d1d9e0;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #818b98;
  --color-prettylights-syntax-variable: #953800;
  --fgColor-accent: #0969da;
  --fgColor-attention: #9a6700;
  --fgColor-done: #8250df;
  --fgColor-muted: #59636e;
  --fgColor-success: #1a7f37;
  --bgColor-default: #ffffff;
  --borderColor-muted: #d1d9e0b3;
  --color-prettylights-syntax-invalid-illegal-bg: var(--bgColor-danger-muted);
  --color-prettylights-syntax-markup-bold: #1f2328;
  --color-prettylights-syntax-markup-italic: #1f2328;
  --color-prettylights-syntax-storage-modifier-import: #1f2328;
  --fgColor-default: #1f2328;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,Xf=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --fgColor-accent: #4493f8;
  --bgColor-attention-muted: #bb800926;
  --bgColor-default: #0d1117;
  --bgColor-muted: #151b23;
  --bgColor-neutral-muted: #656c7633;
  --borderColor-accent-emphasis: #1f6feb;
  --borderColor-attention-emphasis: #9e6a03;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3d444d;
  --borderColor-done-emphasis: #8957e5;
  --borderColor-success-emphasis: #238636;
  --color-prettylights-syntax-brackethighlighter-angle: #9198a1;
  --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
  --color-prettylights-syntax-carriage-return-bg: #b62324;
  --color-prettylights-syntax-carriage-return-text: #f0f6fc;
  --color-prettylights-syntax-comment: #9198a1;
  --color-prettylights-syntax-constant: #79c0ff;
  --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
  --color-prettylights-syntax-entity: #d2a8ff;
  --color-prettylights-syntax-entity-tag: #7ee787;
  --color-prettylights-syntax-keyword: #ff7b72;
  --color-prettylights-syntax-markup-bold: #f0f6fc;
  --color-prettylights-syntax-markup-changed-bg: #5a1e02;
  --color-prettylights-syntax-markup-changed-text: #ffdfb6;
  --color-prettylights-syntax-markup-deleted-bg: #67060c;
  --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
  --color-prettylights-syntax-markup-heading: #1f6feb;
  --color-prettylights-syntax-markup-ignored-bg: #1158c7;
  --color-prettylights-syntax-markup-ignored-text: #f0f6fc;
  --color-prettylights-syntax-markup-inserted-bg: #033a16;
  --color-prettylights-syntax-markup-inserted-text: #aff5b4;
  --color-prettylights-syntax-markup-italic: #f0f6fc;
  --color-prettylights-syntax-markup-list: #f2cc60;
  --color-prettylights-syntax-meta-diff-range: #d2a8ff;
  --color-prettylights-syntax-storage-modifier-import: #f0f6fc;
  --color-prettylights-syntax-string: #a5d6ff;
  --color-prettylights-syntax-string-regexp: #7ee787;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #3d444d;
  --color-prettylights-syntax-variable: #ffa657;
  --fgColor-attention: #d29922;
  --fgColor-danger: #f85149;
  --fgColor-default: #f0f6fc;
  --fgColor-done: #ab7df8;
  --fgColor-muted: #9198a1;
  --fgColor-success: #3fb950;
  --borderColor-muted: #3d444db3;
  --color-prettylights-syntax-invalid-illegal-bg: var(--bgColor-danger-muted);
  --color-prettylights-syntax-invalid-illegal-text: var(--fgColor-danger);
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,Jf=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #ffc60015;
  --bgColor-default: #193549;
  --bgColor-muted: #1f4662;
  --bgColor-neutral-muted: #e1efff1f;
  --borderColor-accent-emphasis: #ffc600;
  --borderColor-attention-emphasis: #e0a225;
  --borderColor-danger-emphasis: #f44747;
  --borderColor-default: #2a5070;
  --borderColor-done-emphasis: #a87ff0;
  --borderColor-success-emphasis: #3ad900;
  --fgColor-accent: #ffc600;
  --fgColor-attention: #e0a225;
  --fgColor-danger: #f44747;
  --fgColor-default: #e1efff;
  --fgColor-done: #b99bf0;
  --fgColor-muted: #7ca4bf;
  --fgColor-success: #3ad900;
  --borderColor-muted: #2a507080;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,Qf=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f1fa8c15;
  --bgColor-default: #282a36;
  --bgColor-muted: #21222c;
  --bgColor-neutral-muted: #f8f8f21a;
  --borderColor-accent-emphasis: #bd93f9;
  --borderColor-attention-emphasis: #f1fa8c;
  --borderColor-danger-emphasis: #ff5555;
  --borderColor-default: #44475a;
  --borderColor-done-emphasis: #bd93f9;
  --borderColor-success-emphasis: #50fa7b;
  --fgColor-accent: #bd93f9;
  --fgColor-attention: #f1fa8c;
  --fgColor-danger: #ff5555;
  --fgColor-default: #f8f8f2;
  --fgColor-done: #bd93f9;
  --fgColor-muted: #6272a4;
  --fgColor-success: #50fa7b;
  --borderColor-muted: #44475ab3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,eh=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f2f2f7;
  --bgColor-neutral-muted: #0000000d;
  --borderColor-accent-emphasis: #007aff;
  --borderColor-attention-emphasis: #9a6700;
  --borderColor-danger-emphasis: #d1242f;
  --borderColor-default: #d1d1d6;
  --borderColor-done-emphasis: #8250df;
  --borderColor-success-emphasis: #1a7f37;
  --fgColor-accent: #007aff;
  --fgColor-attention: #9a6700;
  --fgColor-danger: #d1242f;
  --fgColor-default: #000000;
  --fgColor-done: #8250df;
  --fgColor-muted: #8e8e93;
  --fgColor-success: #1a7f37;
  --borderColor-muted: #d1d1d6b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,th=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #bb800926;
  --bgColor-default: #1e1e1e;
  --bgColor-muted: #2c2c2e;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #007aff;
  --borderColor-attention-emphasis: #9e6a03;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3a3a3c;
  --borderColor-done-emphasis: #8957e5;
  --borderColor-success-emphasis: #238636;
  --fgColor-accent: #007aff;
  --fgColor-attention: #d29922;
  --fgColor-danger: #f85149;
  --fgColor-default: #d1d1d6;
  --fgColor-done: #ab7df8;
  --fgColor-muted: #8e8e93;
  --fgColor-success: #3fb950;
  --borderColor-muted: #3a3a3cb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,nh=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #ecc48d1a;
  --bgColor-default: #011627;
  --bgColor-muted: #0b2942;
  --bgColor-neutral-muted: #d6deeb1a;
  --borderColor-accent-emphasis: #82b1ff;
  --borderColor-attention-emphasis: #ecc48d;
  --borderColor-danger-emphasis: #ef5350;
  --borderColor-default: #1d3b53;
  --borderColor-done-emphasis: #c792ea;
  --borderColor-success-emphasis: #22da6e;
  --fgColor-accent: #82b1ff;
  --fgColor-attention: #ecc48d;
  --fgColor-danger: #ef5350;
  --fgColor-default: #d6deeb;
  --fgColor-done: #c792ea;
  --fgColor-muted: #637777;
  --fgColor-success: #22da6e;
  --borderColor-muted: #1d3b5380;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,rh=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #ea9d341a;
  --bgColor-default: #faf4ed;
  --bgColor-muted: #f2e9de;
  --bgColor-neutral-muted: #5752791a;
  --borderColor-accent-emphasis: #56949f;
  --borderColor-attention-emphasis: #ea9d34;
  --borderColor-danger-emphasis: #b4637a;
  --borderColor-default: #cecacd;
  --borderColor-done-emphasis: #907aa9;
  --borderColor-success-emphasis: #286983;
  --fgColor-accent: #56949f;
  --fgColor-attention: #ea9d34;
  --fgColor-danger: #b4637a;
  --fgColor-default: #575279;
  --fgColor-done: #907aa9;
  --fgColor-muted: #9893a5;
  --fgColor-success: #286983;
  --borderColor-muted: #cecacdb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,oh=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f6c1771a;
  --bgColor-default: #191724;
  --bgColor-muted: #1f1d2e;
  --bgColor-neutral-muted: #e0def41a;
  --borderColor-accent-emphasis: #9ccfd8;
  --borderColor-attention-emphasis: #f6c177;
  --borderColor-danger-emphasis: #eb6f92;
  --borderColor-default: #403d52;
  --borderColor-done-emphasis: #c4a7e7;
  --borderColor-success-emphasis: #31748f;
  --fgColor-accent: #9ccfd8;
  --fgColor-attention: #f6c177;
  --fgColor-danger: #eb6f92;
  --fgColor-default: #e0def4;
  --fgColor-done: #c4a7e7;
  --fgColor-muted: #6e6a86;
  --fgColor-success: #31748f;
  --borderColor-muted: #403d5280;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,uh=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #b5890026;
  --bgColor-default: #fdf6e3;
  --bgColor-muted: #eee8d5;
  --bgColor-neutral-muted: #586e751a;
  --borderColor-accent-emphasis: #268bd2;
  --borderColor-attention-emphasis: #b58900;
  --borderColor-danger-emphasis: #dc322f;
  --borderColor-default: #d5cec3;
  --borderColor-done-emphasis: #6c71c4;
  --borderColor-success-emphasis: #859900;
  --fgColor-accent: #268bd2;
  --fgColor-attention: #b58900;
  --fgColor-danger: #dc322f;
  --fgColor-default: #586e75;
  --fgColor-done: #6c71c4;
  --fgColor-muted: #93a1a1;
  --fgColor-success: #859900;
  --borderColor-muted: #d5cec3b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,ih=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #b5890026;
  --bgColor-default: #002b36;
  --bgColor-muted: #073642;
  --bgColor-neutral-muted: #93a1a11a;
  --borderColor-accent-emphasis: #268bd2;
  --borderColor-attention-emphasis: #b58900;
  --borderColor-danger-emphasis: #dc322f;
  --borderColor-default: #2a4f5c;
  --borderColor-done-emphasis: #6c71c4;
  --borderColor-success-emphasis: #859900;
  --fgColor-accent: #268bd2;
  --fgColor-attention: #b58900;
  --fgColor-danger: #dc322f;
  --fgColor-default: #93a1a1;
  --fgColor-done: #6c71c4;
  --fgColor-muted: #657b83;
  --fgColor-success: #859900;
  --borderColor-muted: #2a4f5c80;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,ah=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f4eee41a;
  --bgColor-default: #252335;
  --bgColor-muted: #2b2640;
  --bgColor-neutral-muted: #f0eff11a;
  --borderColor-accent-emphasis: #f92aad;
  --borderColor-attention-emphasis: #f4eee4;
  --borderColor-danger-emphasis: #f97e72;
  --borderColor-default: #443f5c;
  --borderColor-done-emphasis: #c792ea;
  --borderColor-success-emphasis: #72f1b8;
  --fgColor-accent: #f92aad;
  --fgColor-attention: #f4eee4;
  --fgColor-danger: #f97e72;
  --fgColor-default: #f0eff1;
  --fgColor-done: #c792ea;
  --fgColor-muted: #848bbd;
  --fgColor-success: #72f1b8;
  --borderColor-muted: #443f5c80;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,ch=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #df86181a;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f0f4f8;
  --bgColor-neutral-muted: #3e3e3e0d;
  --borderColor-accent-emphasis: #034c7c;
  --borderColor-attention-emphasis: #df8618;
  --borderColor-danger-emphasis: #d1242f;
  --borderColor-default: #cee1f0;
  --borderColor-done-emphasis: #6c36a9;
  --borderColor-success-emphasis: #357b42;
  --fgColor-accent: #034c7c;
  --fgColor-attention: #df8618;
  --fgColor-danger: #d1242f;
  --fgColor-default: #3e3e3e;
  --fgColor-done: #6c36a9;
  --fgColor-muted: #828282;
  --fgColor-success: #357b42;
  --borderColor-muted: #cee1f0b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,sh=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f7ecb51a;
  --bgColor-default: #282822;
  --bgColor-muted: #1e1e1a;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #5abeb0;
  --borderColor-attention-emphasis: #f7ecb5;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3b3a32;
  --borderColor-done-emphasis: #d29ffc;
  --borderColor-success-emphasis: #8dec95;
  --fgColor-accent: #5abeb0;
  --fgColor-attention: #f7ecb5;
  --fgColor-danger: #f85149;
  --fgColor-default: #ffffff;
  --fgColor-done: #d29ffc;
  --fgColor-muted: #999999;
  --fgColor-success: #8dec95;
  --borderColor-muted: #3b3a3280;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,lh=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f2f2f7;
  --bgColor-neutral-muted: #0000000d;
  --borderColor-accent-emphasis: #0b4f79;
  --borderColor-attention-emphasis: #815f03;
  --borderColor-danger-emphasis: #c41a16;
  --borderColor-default: #d1d1d6;
  --borderColor-done-emphasis: #6c36a9;
  --borderColor-success-emphasis: #326d74;
  --fgColor-accent: #0b4f79;
  --fgColor-attention: #815f03;
  --fgColor-danger: #c41a16;
  --fgColor-default: #000000;
  --fgColor-done: #6c36a9;
  --fgColor-muted: #5d6c79;
  --fgColor-success: #326d74;
  --borderColor-muted: #d1d1d6b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,dh=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #d0bf691a;
  --bgColor-default: #1f1f24;
  --bgColor-muted: #2c2c31;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #5dd8ff;
  --borderColor-attention-emphasis: #d0bf69;
  --borderColor-danger-emphasis: #fc6a5d;
  --borderColor-default: #3a3a3f;
  --borderColor-done-emphasis: #a167e6;
  --borderColor-success-emphasis: #67b7a4;
  --fgColor-accent: #5dd8ff;
  --fgColor-attention: #d0bf69;
  --fgColor-danger: #fc6a5d;
  --fgColor-default: #ffffffd9;
  --fgColor-done: #a167e6;
  --fgColor-muted: #6c7986;
  --fgColor-success: #67b7a4;
  --borderColor-muted: #3a3a3fb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,fh=`.markdown-alert {
  padding: 0.5rem 1rem;
  margin-bottom: 16px;
  color: inherit;
  border-left: .25em solid #888;
}

.markdown-alert>:first-child {
  margin-top: 0
}

.markdown-alert>:last-child {
  margin-bottom: 0
}

.markdown-alert .markdown-alert-title {
  display: flex;
  font-weight: 500;
  align-items: center;
  line-height: 1
}

.markdown-alert .markdown-alert-title .octicon {
  margin-right: 0.5rem;
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

.markdown-alert.markdown-alert-note {
  border-left-color: var(--color-note);
}

.markdown-alert.markdown-alert-note .markdown-alert-title {
  color: var(--color-note);
}

.markdown-alert.markdown-alert-important {
  border-left-color: var(--color-important);
}

.markdown-alert.markdown-alert-important .markdown-alert-title {
  color: var(--color-important);
}

.markdown-alert.markdown-alert-warning {
  border-left-color: var(--color-warning);
}

.markdown-alert.markdown-alert-warning .markdown-alert-title {
  color: var(--color-warning);
}

.markdown-alert.markdown-alert-tip {
  border-left-color: var(--color-tip);
}

.markdown-alert.markdown-alert-tip .markdown-alert-title {
  color: var(--color-tip);
}

.markdown-alert.markdown-alert-caution {
  border-left-color: var(--color-caution);
}

.markdown-alert.markdown-alert-caution .markdown-alert-title {
  color: var(--color-caution);
}
`,hh=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,ph=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,mh=`.code-copy-wrapper {
  position: relative;
}

.code-copy-button {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  border: 1px solid var(--borderColor-default, ButtonBorder);
  border-radius: 8px;
  padding: 6px 7px;
  background: var(--bgColor-muted, Canvas);
  color: var(--fgColor-muted, GrayText);

  /* Prevent elements from moving during opacity changes in Safari */
  will-change: opacity, background;
}

.code-copy-button:hover {
  background: color-mix(in srgb, var(--fgColor-muted, GrayText) 10%, var(--bgColor-muted, Canvas));
}

.code-copy-button:active {
  background: var(--borderColor-default, ButtonBorder);
}
`,Nt={github:{light:Kf,dark:Xf},cobalt:{dark:Jf},dracula:{dark:Qf},minimal:{light:eh,dark:th},"night-owl":{dark:nh},"rose-pine":{light:rh,dark:oh},solarized:{light:uh,dark:ih},synthwave84:{dark:ah},"winter-is-coming":{light:ch,dark:sh},xcode:{light:lh,dark:dh}};function bh(e="auto"){if(Aa)return"";const t=Nt[tr]??Nt.github,n=t.light??t.dark,r=t.dark??t.light,o=su(n)??"#ffffff",u=su(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...Eo(e,`body { background: ${o}; }`,`body { background: ${u}; }`)].join(`
`)}function gh(e,t){const n=Nt[e.replace(/-(light|dark|dawn)$/,"")]??Nt.github,r=t?n.dark??n.light:n.light??n.dark;return`${Sa}
${r}`}function Ta(e="auto"){if(Aa)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const t=Nt[tr]??Nt.github,n=t.light??t.dark,r=t.dark??t.light;return[Sa,...Eo(e,n,r)].join(`
`)}function yh(e="auto"){return[fh,...Eo(e,hh,ph)].join(`
`)}function Da(){return mh}function Eo(e,t,n){const r=[];switch(e){case"light":r.push(t);break;case"dark":r.push(n);break;case"auto":r.push(`
        ${t}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`);break}return r}const kh={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Markdown Source",sideBySideMode:"Preview (Side-by-Side)",previewMode:"Preview (Overlay)",syntaxHiddenMode:"Mixed (Syntax Hidden)",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",failedToCopy:"Failed to copy. Please try again.",untitled:"Untitled",version:"Version",source:"Source",preview:"Preview",goToFootnoteDefinition:"Go to definition [%s]",backToFootnoteReference:"Back to reference [%s]"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"Markdown 源码",sideBySideMode:"预览（并排）",previewMode:"预览（覆盖）",syntaxHiddenMode:"混合（隐藏语法）",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",failedToCopy:"复制失败，请重试。",untitled:"未命名",version:"版本",source:"源码",preview:"预览",goToFootnoteDefinition:"跳转到定义 [%s]",backToFootnoteReference:"返回引用 [%s]"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",failedToCopy:"複製失敗，請再試一次。",editMode:"Markdown 原始碼",sideBySideMode:"預覽（並排）",previewMode:"預覽（覆蓋）",syntaxHiddenMode:"混合（隱藏語法）",untitled:"未命名",version:"版本",source:"原始碼",preview:"預覽",goToFootnoteDefinition:"前往定義 [%s]",backToFootnoteReference:"返回引用 [%s]"}};function K(e){return Ch[e]}const xh=["default","zh-CN","zh-TW"],Ch=kh[(()=>{const e=navigator.language;return xh.includes(e)?e:"default"})()];function Ao(){return typeof I.MarkEdit.addExtension=="function"}async function So(e,t=!0){return await To,ie.render(e,{lineInfo:t})}async function wh(e){await To;const t={lineInfo:!1},n=ie.parse(e,t),r=[];for(let o=0;o<n.length;o+=1){const u=n[o];if(u.type!=="table_open"||u.level!==0||u.map===null)continue;let a=o+1;for(;a<n.length&&n[a].type!=="table_close";)a+=1;a!==n.length&&(r.push({fromLine:u.map[0]+1,toLine:u.map[1],html:ie.renderer.render(n.slice(o,a+1),ie.options,t)}),o=a)}return r}async function vh(e,t){if(!t.startsWith("#"))return;await To;const n=ie.normalizeLink(t).substring(1);return ie.parse(e,{}).find(o=>o.type==="heading_open"&&o.attrGet("id")===n)?.map?.[0]}function Fa(e){e()}async function Ma(e){const t=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,t(bh(Hr)),t(Ta(Hr)),t(yh(Hr)),t(Da()),"</body></html>"].join(`
`)}const ie=Ce(Zf,{html:!0,breaks:!0,linkify:!0,...Yf}),_h=[];ie.use(Hf());ie.use(St);ie.use(A0,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});ie.use(N0);ie.use(z0,{enabled:Ao(),label:!0});ie.use(B0);const Eh=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),To=Promise.all(_h).then(()=>{for(const e of Eh){const t=ie.renderer.rules[e];ie.renderer.rules[e]=(n,r,o,u,a)=>{const i=n[r];return u.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),t?t(n,r,o,u,a):a.renderToken(n,r,o)}}for(const e of["fence","code_block"]){const t=ie.renderer.rules[e];ie.renderer.rules[e]=(n,r,o,u,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${t===void 0?a.renderToken(n,r,o):t(n,r,o,u,a)}
        <button title="${K("copyCode")}" aria-label="${K("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),Ah=new DOMParser,Sh="image-loader",Do="cm-md-image-preview",Wu=5;function Ia(e){const t=Ah.parseFromString(e,"text/html");return t.querySelectorAll("img").forEach(r=>{const o=r.getAttribute("src");o!==null&&(r.src=Fo(o))}),t.body.innerHTML}function Fo(e){return e.includes("://")||e.startsWith("//")||e.startsWith("data:image/")?e:`${Sh}://${e}`}function Th(e){typeof I.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",t=>{et.panelPresenter!==void 0&&(clearTimeout(et.panelPresenter),et.panelPresenter=void 0),et.panelPresenter=setTimeout(()=>{const n=t.target,r=n?.closest(".cm-md-link"),o=r?.dataset.linkUrl??r?.innerText??"";r!==null&&Nc(o)?Dh(r,o):n?.classList.contains(Do)||Xt()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Xt(!1)}),e.addEventListener("scroll",()=>Xt()))}async function Dh(e,t){if(e===et.focusedElement)return;const n=(await I.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;const r=At(n,t),o=await I.MarkEdit.getFileObject(r);if(o===void 0)return;const u=e.getBoundingClientRect(),a=document.createElement("img");a.className=Do,a.style.position="fixed",a.style.left=`${u.left}px`,a.style.zIndex="10000",a.style.borderRadius="5px",a.style.opacity="0",a.style.transition="opacity 120ms",a.style.cursor="pointer",a.onclick=()=>{Xt(),window.open(t,"_blank")},a.onload=()=>{const c=Math.min(a.naturalHeight,240);a.style.height=`${c}px`;const d=u.top,l=window.innerHeight-u.bottom;d>l?a.style.top=`${u.top-c-Wu}px`:a.style.top=`${u.bottom+Wu}px`,requestAnimationFrame(()=>{a.style.opacity="1"})};const i=o.mimeType??"image/png";a.src=`data:${i};base64,${o.data}`,Xt(!1),et.focusedElement=e,document.body.appendChild(a)}function Xt(e=!0){et.focusedElement!==void 0&&(et.focusedElement=void 0,document.querySelectorAll(`.${Do}`).forEach(t=>{e?(t.style.opacity="0",t.addEventListener("transitionend",()=>t.remove(),{once:!0})):t.remove()}))}const et={panelPresenter:void 0,focusedElement:void 0};function Fh(e,t){if(!jf)return;Ze.scrollUpdater!==void 0&&clearTimeout(Ze.scrollUpdater);let n=I.MarkEdit.editorView.state.doc,r=I.MarkEdit.editorView.state.selection;Ze.lastSourceScrollTop=e.scrollTop;const o=()=>{const{doc:u,selection:a}=I.MarkEdit.editorView.state,i=u===n&&!a.eq(r);n=u,r=a,!(!i&&Math.abs(e.scrollTop-Ze.lastSourceScrollTop)<.5)&&(Ze.lastSourceScrollTop=e.scrollTop,(i||!t.classList.contains("overlay"))&&La(e,t))};"onscrollend"in window?e.addEventListener("scrollend",o):e.addEventListener("scroll",()=>{Ze.scrollUpdater!==void 0&&clearTimeout(Ze.scrollUpdater),Ze.scrollUpdater=setTimeout(o,100)})}function La(e,t,n=!0){const{line:r,progress:o}=Mh(e);Ih(t,r,o,n)}function Mh(e,t=0){const n=I.MarkEdit.editorView,r=n.lineBlockAtHeight(e.scrollTop+t),o=n.state.doc.lineAt(r.from).number-1,u=Lc(n.domAtPos(r.from).node);if(u===null)return{line:o,progress:0};const a=e.getBoundingClientRect(),i=u.getBoundingClientRect(),c=a.top-i.top-t,d=i.height>0?Mo(c/i.height):0;return{line:o,progress:d}}function Ih(e,t,n,r=!0){if(t===0&&n===0)return Dn(e,0,r);const o=Array.from(document.querySelectorAll("[data-line-from]")),u=Lh(o,t);if(u!==void 0){const{from:c,to:d}=Tt(u);return Tn(e,u,Rh(t,n,c,d),r)}if(t===0)return Dn(e,0,r);const{beforeBlock:a,afterBlock:i}=Nh(o,t);if(a!==void 0&&i!==void 0){const c=Tt(a),d=Tt(i),l=Yr(e,a)+a.offsetHeight,s=Yr(e,i),f=d.from-c.to,h=t-c.to+n,p=f>0?Mo(h/f):0,b=l+(s-l)*p;return Dn(e,b,r)}if(a!==void 0)return Tn(e,a,1,r);if(i!==void 0)return Tn(e,i,0,r)}function Lh(e,t){return e.find(n=>{const{from:r,to:o}=Tt(n);return t>=r&&t<=o})}function Rh(e,t,n,r){const o=r-n;if(o<1)return e===n?t:0;const u=e-n+t;return Mo(u/o)}function Nh(e,t){let n,r;for(const o of e){const{from:u,to:a}=Tt(o);if(a<t)n=o;else if(u>t){r=o;break}}return{beforeBlock:n,afterBlock:r}}function Mo(e){return Math.max(0,Math.min(1,e))}const Ze={lastSourceScrollTop:0,scrollUpdater:void 0};function Oh(e){const t=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return t===null?null:{offset:t[1].length,replacement:t[2]===" "?"x":" "}}function Ph(e,t){const r=(t.target instanceof Element?t.target.closest("a"):null)?.getAttribute("href")??"";if(!r.startsWith("#"))return!1;const o=zh(e,r);return o&&t.preventDefault(),o}function zh(e,t){if(!t.startsWith("#"))return!1;const n=Hh(t.substring(1)),r=[...e.querySelectorAll("[id]")].find(o=>o.id===n);return r===void 0?!1:(Tn(e,r,0,!1),!0)}function Hh(e){try{return decodeURIComponent(e)}catch{return e}}const Jt={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body"},nr={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"},Ra=new V.Compartment,Bh=Ra.of([]);let Vu=0;async function Na(e,t){const n=++Vu,r=t?await $h():[];n===Vu&&(e.dispatch({effects:Ra.reconfigure(r)}),t&&e.requestMeasure())}let qh;function $h(){return qh??=Promise.resolve().then(()=>Sm).then(e=>e.hiddenSyntaxExtension)}var Br=function(e,t){return Number(e.slice(0,-1*t.length))},Uh=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Br(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Br(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Br(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},Oa=function(e){return e.split(" ").map(Uh)},jh=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=!1);var o=r?e+1:e,u=t.slice(0,o).reduce(function(i,c){return i+c.numeric},0),a=n?e*n:0;return u+a},Pa=function(e,t,n){return t.concat(n).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},Gh=function(e,t){return t.endsWith(e)?Number(t.slice(0,-1*e.length)):null},Zu=function(e){for(var t=0;t<e.length;t++)if(e[t].numeric>0)return t;return null},dt=function(){return!1},Wh=function(e,t,n){e.style[t]=n},G=function(e,t,n){var r=e[t];return r!==void 0?r:n};function za(e){var t;return(t=[]).concat.apply(t,Array.from(e.ownerDocument.styleSheets).map(function(n){var r=[];try{r=Array.from(n.cssRules||[])}catch{}return r})).filter(function(n){var r=!1;try{r=e.matches(n.selectorText)}catch{}return r})}var Vh="grid-template-columns",Zh="grid-template-rows",ne=function(t,n,r){this.direction=t,this.element=n.element,this.track=n.track,t==="column"?(this.gridTemplateProp=Vh,this.gridGapProp="grid-column-gap",this.cursor=G(r,"columnCursor",G(r,"cursor","col-resize")),this.snapOffset=G(r,"columnSnapOffset",G(r,"snapOffset",30)),this.dragInterval=G(r,"columnDragInterval",G(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=G(r,"gridTemplateColumns")):t==="row"&&(this.gridTemplateProp=Zh,this.gridGapProp="grid-row-gap",this.cursor=G(r,"rowCursor",G(r,"cursor","row-resize")),this.snapOffset=G(r,"rowSnapOffset",G(r,"snapOffset",30)),this.dragInterval=G(r,"rowDragInterval",G(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=G(r,"gridTemplateRows")),this.onDragStart=G(r,"onDragStart",dt),this.onDragEnd=G(r,"onDragEnd",dt),this.onDrag=G(r,"onDrag",dt),this.writeStyle=G(r,"writeStyle",Wh),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=n.minSizeStart,this.minSizeEnd=n.minSizeEnd,n.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};ne.prototype.getDimensions=function(){var t=this.grid.getBoundingClientRect(),n=t.width,r=t.height,o=t.top,u=t.bottom,a=t.left,i=t.right;this.direction==="column"?(this.start=o,this.end=u,this.size=r):this.direction==="row"&&(this.start=a,this.end=i,this.size=n)};ne.prototype.getSizeAtTrack=function(t,n){return jh(t,this.computedPixels,this.computedGapPixels,n)};ne.prototype.getSizeOfTrack=function(t){return this.computedPixels[t].numeric};ne.prototype.getRawTracks=function(){var t=Pa(this.gridTemplateProp,[this.grid],za(this.grid));if(!t.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return t[0]};ne.prototype.getGap=function(){var t=Pa(this.gridGapProp,[this.grid],za(this.grid));return t.length?t[0]:null};ne.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};ne.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};ne.prototype.setTracks=function(t){this.tracks=t.split(" "),this.trackValues=Oa(t)};ne.prototype.setComputedTracks=function(t){this.computedTracks=t.split(" "),this.computedPixels=Oa(t)};ne.prototype.setGap=function(t){this.gap=t};ne.prototype.setComputedGap=function(t){this.computedGap=t,this.computedGapPixels=Gh("px",this.computedGap)||0};ne.prototype.getMousePosition=function(t){return"touches"in t?t.touches[0][this.clientAxis]:t[this.clientAxis]};ne.prototype.startDragging=function(t){if(!("button"in t&&t.button!==0)){t.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=t.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var n=this.trackValues.filter(function(i){return i.type==="%"}),r=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var o=Zu(r);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/r[o].numeric)}if(n.length){var u=Zu(n);u!==null&&(this.percentageToPixels=this.computedPixels[u].numeric/n[u].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(t)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",dt),this.grid.addEventListener("dragstart",dt),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};ne.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};ne.prototype.drag=function(t){var n=this.getMousePosition(t),r=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,u=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),a=o+this.snapOffset,i=u-this.snapOffset;n<a&&(n=o),n>i&&(n=u),n<o?n=o:n>u&&(n=u);var c=n-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-n+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var l=Math.round(c/this.dragInterval)*this.dragInterval;d-=l-c,c=l}if(c<this.minSizeStart&&(c=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=c+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var s=c/this.frToPixels;this.tracks[this.aTrack]=s+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=c/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=d/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var p=d/this.percentageToPixels;this.tracks[this.bTrack]=p+"%"}var b=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,b),this.onDrag(this.direction,this.track,b)};ne.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",dt),this.grid.removeEventListener("dragstart",dt),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};ne.prototype.destroy=function(t,n){t===void 0&&(t=!0),t||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),n&&n()):(this.needsDestroy=!0,n&&(this.destroyCb=n))};var Yu=function(e,t,n){return t in e?e[t]:n},Ot=function(e,t){return function(n){if(n.track<1)throw Error("Invalid track index: "+n.track+". Track must be between two other tracks.");var r=e==="column"?t.columnMinSizes||{}:t.rowMinSizes||{},o=e==="column"?"columnMinSize":"rowMinSize";return new ne(e,Object.assign({},{minSizeStart:Yu(r,n.track-1,G(t,o,G(t,"minSize",0))),minSizeEnd:Yu(r,n.track+1,G(t,o,G(t,"minSize",0)))},n),t)}},pt=function(t){var n=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:t.columnGutters||[],rowGutters:t.rowGutters||[],columnMinSizes:t.columnMinSizes||{},rowMinSizes:t.rowMinSizes||{}},t),this.options.columnGutters.forEach(function(r){n.columnGutters[r.track]=Ot("column",n.options)(r)}),this.options.rowGutters.forEach(function(r){n.rowGutters[r.track]=Ot("row",n.options)(r)})};pt.prototype.addColumnGutter=function(t,n){this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=Ot("column",this.options)({element:t,track:n})};pt.prototype.addRowGutter=function(t,n){this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=Ot("row",this.options)({element:t,track:n})};pt.prototype.removeColumnGutter=function(t,n){var r=this;n===void 0&&(n=!0),this.columnGutters[t]&&this.columnGutters[t].destroy(n,function(){delete r.columnGutters[t]})};pt.prototype.removeRowGutter=function(t,n){var r=this;n===void 0&&(n=!0),this.rowGutters[t]&&this.rowGutters[t].destroy(n,function(){delete r.rowGutters[t]})};pt.prototype.handleDragStart=function(t,n,r){n==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=Ot("column",this.options)({track:r}),this.columnGutters[r].startDragging(t)):n==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=Ot("row",this.options)({track:r}),this.rowGutters[r].startDragging(t))};pt.prototype.destroy=function(t){var n=this;t===void 0&&(t=!0),Object.keys(this.columnGutters).forEach(function(r){return n.columnGutters[r].destroy(t,function(){delete n.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return n.rowGutters[r].destroy(t,function(){delete n.rowGutters[r]})})};function Yh(e){return new pt(e)}const Kh=`body .markdown-body details summary,
body .markdown-body .task-list-item.enabled label {
  cursor: default;
}

.cm-focused {
  outline: none !important;
}

.markdown-container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5px 1fr;
}

.markdown-gutter {
  grid-row: 1/-1;
  grid-column: 2;
  cursor: col-resize;
  display: none;
  justify-content: center;
}

.markdown-divider {
  width: 1px;
  height: 100%;
  background: #e0e0e0;
}

.markdown-body {
  padding: 25px;
  overflow: scroll;
  display: none;
}

.markdown-body.overlay {
  position: absolute;
  inset: var(--markedit-content-inset, 0);
  display: block;
  z-index: 10000;
}

.markdown-body a.suppress-underline {
  text-decoration: none !important;
}

.markdown-container .markdown-gutter {
  display: flex;
}

.markdown-container .markdown-body {
  display: block;
}

.markdown-body .task-list-item-checkbox {
  width: 1.1em;
  height: 1.1em;
}

.markdown-body.zoomed-in .mermaid {
  overflow-x: auto;
}

/* Clamped by mermaid's inline max-width, i.e. it ends up being the natural size */
.markdown-body.zoomed-in .mermaid > svg[style*="max-width"] {
  width: 10000px;
}

@media (prefers-color-scheme: dark) {
  .markdown-divider {
    background: #2a2a2a;
  }
}
`,Bn=document.body,Qt=document.createElement("div"),W=document.createElement("div"),Ku=Zt("* { cursor: col-resize }",!1),Ha=V.Annotation.define();var Le=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e[e.syntaxHidden=3]="syntaxHidden",e))(Le||{});function Xh(){Zt(Kh),Zt(Ta()),Zt(Da());const e=document.createElement("div");e.className=Jt.dividerViewClass,Qt.appendChild(e),Qt.className=Jt.gutterViewClass,Bn.appendChild(Qt),W.className=Jt.previewPaneClass,Bn.appendChild(W),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const o=I.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(W.classList.contains("overlay")||document.activeElement!==o)&&(Rc(W),r.preventDefault())}),new MutationObserver(Xu).observe(W,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Xu(),document.querySelector(".mermaid")!==null&&qn()}),typeof I.MarkEdit.getFileInfo=="function"&&typeof I.MarkEdit.openFile=="function"&&W.addEventListener("click",ip),W.addEventListener("click",r=>{ap(r),cp(r)})}function rr(e,t=!0){const n=Se();He.viewMode=e,e!==n&&localStorage.setItem(nr.viewModeCacheKey,String(e));const r=I.MarkEdit.editorView;Na(r,e===3),Io()?r.focus():e===2&&r.contentDOM.blur(),e===1?(Bn.classList.add(Jt.containerClass),He.splitter??=Yh({columnGutters:[{track:1,element:Qt}],minSize:150,onDragStart:()=>Ku.disabled=!1,onDragEnd:()=>Ku.disabled=!0})):(Bn.classList.remove(Jt.containerClass),He.splitter?.destroy(),He.splitter=void 0),e===2?W.classList.add("overlay"):W.classList.remove("overlay"),t?qn(!0):++He.renderVersion}function Jh(){const e=Vf.map(u=>{switch(u){case"edit":return 0;case"side-by-side":return 1;case"preview":return 2;case"syntax-hidden":return 3;default:return}}).filter(u=>u!==void 0),n=e.some(u=>u===0||u===3)?e:[0,...e],r=n.indexOf(Se()),o=r===-1?0:(r+1)%n.length;rr(n[o])}function Qh(){const e=localStorage.getItem(nr.viewModeCacheKey);if(e===null)return;const t=Number(e);if(Se()===t){t===3&&Na(I.MarkEdit.editorView,!0);return}rr(t,!0)}function Se(){return He.viewMode}function Io(){const e=Se();return e===0||e===3}async function qn(e=Se()!==2||!W.hasChildNodes()){const t=++He.renderVersion;if(Io())return;const n=Ia(await ur());if(t!==He.renderVersion)return;const r={top:W.scrollTop,left:W.scrollLeft};W.innerHTML=n;const o=localStorage.getItem(nr.previewPageZoomKey);o!==null&&Mn(o);const u=()=>{e&&t===He.renderVersion&&La(Ba(),W,!1)};e?u():W.scrollTo(r),Fa(u)}function ep(e){if(Io()||Se()===1&&I.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key==="0")return;const t=Number(W.style.zoom)||1,n=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":case"_":Mn(n(t-.1));break;case"=":case"+":Mn(n(t+.1));break;case"0":Mn("1");break;default:return}localStorage.setItem(nr.previewPageZoomKey,W.style.zoom),e.preventDefault(),e.stopPropagation()}function tp(){$a(!1)}function np(){$a(!0)}function rp(){const e=ur(!1),t=new ClipboardItem({"text/plain":e.then(n=>new Blob([n],{type:"text/plain"}))});return Fi(t,K("failedToCopy"))}function op(){const e=ur(!1),t=new ClipboardItem({"text/html":e.then(n=>new Blob([n],{type:"text/html"})),"text/plain":e.then(n=>new Blob([Pc(n)],{type:"text/plain"}))});return Fi(t,K("failedToCopy"))}function Ba(){return I.MarkEdit.editorView.scrollDOM}function or(){return W}async function qa(e){const t=await ur(!1);return e?await Ma(t):`<meta charset="UTF-8">
${t}`}async function up(e,t){const n=await So(e,!1);return t?await Ma(n):`<meta charset="UTF-8">
${n}`}async function ur(e=!0){const t=I.MarkEdit.editorAPI.getText();return await So(t,e)}function Xu(){const e=getComputedStyle(W).backgroundColor;Qt.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function Mn(e){W.style.zoom=e,W.classList.toggle("zoomed-in",Number(e)>1)}async function $a(e){const t=await(async()=>{const r=await I.MarkEdit.getFileInfo();return r===void 0?`${K("untitled")}.html`:`${Ic(r.filePath)}.html`})(),n=await qa(e);I.MarkEdit.showSavePanel({fileName:t,string:n})}async function ip(e){if(!(e.target instanceof Element))return;const t=e.target.closest("a");if(t===null)return;const n=t.getAttribute("href");if(!n?.startsWith("../"))return;const r=(await I.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const o=At(r,decodeURIComponent(n));await I.MarkEdit.openFile(o)}catch(o){console.error("Failed to open file:",o)}}}function ap(e){const t="suppress-underline",n=e.target instanceof Element?e.target.closest("a"):null;n!==null&&Ph(W,e),!(n===null||n.classList.contains(t)||!n.matches(":hover"))&&(n.classList.add(t),n.addEventListener("mouseleave",()=>n.classList.remove(t),{once:!0}))}function cp(e){const t=e.target;if(!(t instanceof HTMLInputElement)||!t.classList.contains("task-list-item-checkbox"))return;const n=t.closest("[data-line-from]");if(n===null){console.error("Failed to find task item block");return}const r=I.MarkEdit.editorAPI,o=r.getLineRange(Tt(n).from),u=Oh(r.getText(o));if(u===null){t.checked=!t.checked,console.error("Failed to resolve task toggle");return}const a=o.from+u.offset;I.MarkEdit.editorView.dispatch({changes:{from:a,to:a+1,insert:u.replacement},annotations:Ha.of(!0)})}const He={viewMode:0,splitter:void 0,renderVersion:0},uo="markedit-preview",Ju=`${uo}.js`;function sp(e){const{destExists:t,bundleInfo:n,currentVersion:r}=e,o=n?.version===r,u=n?.fullBuild===!1;return!(t&&o&&u)}async function lp(){try{const e=I.MarkEdit.getDirectoryPath("documents"),t=I.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||t===void 0){console.error("Required directories are not accessible");return}const n=typeof __FILE_PATH__=="string"?__FILE_PATH__:At(e,`scripts/${Ju}`);if(await I.MarkEdit.getFileInfo(n)===void 0){console.error(`Source file not found at ${n}`);return}const o=n.split("/").pop()??Ju,u=At(t,"Shared/scripts"),a=At(u,o),i=await I.MarkEdit.getFileInfo(a)!==void 0,c=At(t,"Shared/metadata.json"),d=await Oc(c),l=d[uo];if(!sp({destExists:i,bundleInfo:l,currentVersion:"1.12.0"}))return;const s=await I.MarkEdit.getFileContent(n);if(s===void 0){console.error(`Failed to read content from ${n}`);return}await I.MarkEdit.createFile({path:u,isDirectory:!0}),await I.MarkEdit.createFile({path:a,string:s,overwrites:!0}),await I.MarkEdit.createFile({path:c,string:JSON.stringify({...d,[uo]:{version:"1.12.0",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const dp='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',fp='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function hp(){const e=Qu(K("source"),dp),t=Qu(K("preview"),fp),n=document.createElement("div");n.className="quicklook-segmented",n.setAttribute("role","tablist"),n.append(e,t);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(n),{toolbar:r,sourceButton:e,previewButton:t}}function Qu(e,t){const n=document.createElement("button");n.title=e,n.type="button",n.className="quicklook-segment",n.setAttribute("role","tab"),n.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const o=document.createElement("span");return o.innerHTML=t,o.className="quicklook-segment-icon",n.append(r,o),n}function vt(){if(_t!==void 0)return _t;try{_t=localStorage.getItem(Ua)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),_t="source"}return _t}function ei(e){_t=e;try{localStorage.setItem(Ua,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let _t;const Ua="ui.quicklook-mode";function pp(){const e=window,t=e.editor?.state?.doc.toString();return typeof t=="string"?t:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function mp(){document.addEventListener("webkitmouseforcewillbegin",e=>{const t=e.target;t instanceof Element&&t.closest("a")!==null&&e.preventDefault()})}function bp(e,t){const n=window,r=n.pinchZoomTarget;n.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const o=t.querySelector(".quicklook-content");return o!==null?{scroller:t,inner:o}:null};for(const o of["gesturechange","gestureend"])document.addEventListener(o,()=>{if(e()!=="preview")return;const u=t.querySelector(".quicklook-content");u?.style.zoom.length?u?.style.setProperty("--quicklook-zoom",u.style.zoom):u?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function gp(e,t){let n;const r=window,o={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},u=()=>{const i=t.clientHeight,c=t.scrollHeight,d=c-i;if(d<=0||c<=0)return{clientHeight:i,scrollHeight:c,scrollbarHeight:i,scrollbarTop:0};const l=i*(i/c),f=t.scrollTop/d*(i-l);return{clientHeight:i,scrollHeight:c,scrollbarHeight:l,scrollbarTop:f}},a=(i,c,d="auto")=>{const{clientHeight:l,scrollHeight:s,scrollbarHeight:f}=u(),h=l-f;if(h>0){const p=(i-c)/h;t.scrollTo({top:p*(s-l),behavior:d})}};r.startDragging=i=>{if(e()!=="preview"){o.start?.(i);return}const{scrollbarTop:c,scrollbarHeight:d}=u(),l=ti(t,i);n=l-c,(l<c||l>c+d)&&a(l,d*.5,"smooth")},r.updateDragging=i=>{if(e()!=="preview"){o.update?.(i);return}n!==void 0&&a(ti(t,i),n)},r.cancelDragging=()=>{if(e()!=="preview"){o.cancel?.();return}n=void 0}}function yp(e,t,n){n.addEventListener("wheel",r=>{const o=e()==="preview"?t:document.querySelector(".cm-scroller");o!==null&&(o.scrollTop+=r.deltaY,o.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function kp(e,t,n){const r=document.querySelector(".cm-scroller"),o=()=>{const a=(e()==="preview"?t:r)?.scrollTop??0;n.classList.toggle("scrolled",a>0),n.classList.toggle("scrolled-far",a>20)};return t.addEventListener("scroll",o,{passive:!0}),r?.addEventListener("scroll",o,{passive:!0}),o}function xp(e){document.addEventListener("copy",t=>{if(!e.classList.contains("overlay"))return;const n=getSelection(),r=n!==null&&n.rangeCount>0?n.getRangeAt(0):null,o=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,u=o??(()=>{const i=document.createRange();return i.selectNodeContents(e),i})(),a=document.createElement("div");a.appendChild(u.cloneContents()),t.clipboardData?.setData("text/html",a.innerHTML),t.clipboardData?.setData("text/plain",o!==null?o.toString():e.innerText),t.preventDefault(),t.stopPropagation()},!0)}function ti(e,t){return t-e.getBoundingClientRect().top}const Cp=`body {
  --editor-inset-top: 34px;
}

/* Force scrolling bounces */
.cm-scroller > .cm-content {
  min-height: calc(100% + 1px);
}

.quicklook .markdown-body.overlay > .quicklook-content {
  display: flow-root;
  --quicklook-default-zoom: 0.9;
  zoom: var(--quicklook-default-zoom);

  /* Toolbar clearance minus the inset, normalized so it stays constant under pinch-zoom */
  --quicklook-toolbar-inset: 8px;
  --quicklook-toolbar-clearance: calc((var(--editor-inset-top) - var(--quicklook-toolbar-inset)) * var(--quicklook-default-zoom) / var(--quicklook-zoom, var(--quicklook-default-zoom)));
  /* Scroll content under the toolbar; scroller stays inset so its scrollbar is clear */
  margin-top: calc(-1 * var(--quicklook-toolbar-clearance)) !important;
  /* Add the clearance back so the bounce stays in the pane, not the page */
  min-height: calc(100% + var(--quicklook-toolbar-clearance) + 1px);
}

/* Tighten heading spacing for the limited Quick Look viewport */
.quicklook .markdown-body h1,
.quicklook .markdown-body h2,
.quicklook .markdown-body h3,
.quicklook .markdown-body h4,
.quicklook .markdown-body h5,
.quicklook .markdown-body h6 {
  margin-top: var(--base-size-16, 1rem);
  margin-bottom: var(--base-size-8, 0.5rem);
}

/* Links are not interactive in quicklook */
.quicklook .markdown-body a,
.quicklook .markdown-body a:hover,
.quicklook .markdown-body a:not([href]) {
  color: var(--fgColor-accent);
  text-decoration: none;
  cursor: text;
  user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: none;
}

.quicklook .markdown-body.overlay {
  top: var(--editor-inset-top);
  overscroll-behavior: contain;
}

.quicklook-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--editor-inset-top);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.2s ease;
  z-index: 10001;
}

.quicklook-toolbar.scrolled {
  backdrop-filter: saturate(200%) blur(20px);
  background: rgba(248, 248, 250, 0.8);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

.quicklook-segmented {
  display: inline-flex;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.quicklook-segment {
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 12px;
  font-weight: 500;
  padding: 2px 16px;
  border-radius: 4px;
  user-select: none;
  -webkit-user-select: none;
  min-width: 64px;
}

.quicklook-segment:hover:not(.active) {
  background: rgba(0, 0, 0, 0.04);
}

.quicklook-segment.active {
  background: #ffffff;
  color: #000000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.quicklook-segment-icon {
  display: none;
}

.quicklook-segment-icon svg {
  display: block;
  width: 13px;
  height: 13px;
}

/* Compact layout: hide the toolbar and show floating buttons */
@media (max-width: 580px) {
  body {
    --editor-inset-top: 0px;
  }

  .quicklook .markdown-body.overlay {
    top: 0;
    padding: 12px;
  }

  .quicklook .markdown-body.overlay > .quicklook-content {
    --quicklook-default-zoom: 0.8;
    --quicklook-toolbar-inset: 0px;
  }

  .quicklook-toolbar {
    top: 8px;
    right: 16px;
    left: auto;
    height: auto;
    background: transparent !important;
    border-bottom: none !important;
    backdrop-filter: none !important;
    transition: none;
    pointer-events: none;
  }

  /* Gradient behind the buttons, when content scrolls */
  .quicklook-toolbar::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: linear-gradient(to bottom, rgba(250, 250, 252, 0.95), rgba(250, 250, 252, 0));
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: -1;
  }

  body:hover .quicklook-toolbar.scrolled-far::before {
    opacity: 1;
  }

  .quicklook-segmented {
    pointer-events: auto;
    padding: 0;
    gap: 0;
    overflow: hidden;
    opacity: 0;
    background: rgba(242, 242, 245, 0.85);
    backdrop-filter: saturate(180%) blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    transition: opacity 0.2s ease;
  }

  body:hover .quicklook-segmented, .quicklook-segmented:focus-within {
    opacity: 1;
  }

  .quicklook-segment {
    padding: 2px 3px;
    min-width: 0;
  }

  .quicklook-segment:hover:not(.active) {
    background: transparent;
  }

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .quicklook-segment-label {
    display: none;
  }

  .quicklook-segment-icon {
    display: flex;
    padding: 1px 2px;
  }
}

@media (prefers-color-scheme: dark) {
  .quicklook-toolbar.scrolled {
    background: rgba(28, 28, 30, 0.6);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .quicklook-segmented {
    background: rgba(255, 255, 255, 0.08);
  }

  .quicklook-segment {
    color: rgba(255, 255, 255, 0.8);
  }

  .quicklook-segment:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
  }

  .quicklook-segment.active {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}

@media (prefers-color-scheme: dark) and (max-width: 580px) {
  .quicklook-toolbar::before {
    background: linear-gradient(to bottom, rgba(18, 22, 28, 0.95), rgba(18, 22, 28, 0));
  }

  .quicklook-segmented {
    background: rgba(40, 40, 42, 0.85);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
    border-color: rgba(128, 128, 128, 0.15);
  }

  .quicklook-segment:hover:not(.active) {
    background: transparent;
  }

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.45);
  }
}
`;function wp(e){Zt(Cp),document.body.classList.add("quicklook");const{toolbar:t,sourceButton:n,previewButton:r}=hp();document.body.appendChild(t);const o=vp(e),u=kp(vt,e,t),a={previewPane:e,sourceButton:n,previewButton:r,refreshSeparator:u,ensureRendered:o.ensureRendered};n.addEventListener("click",()=>{ei("source"),qr(a)}),r.addEventListener("click",()=>{ei("preview"),qr(a)}),qr(a),setTimeout(o.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(o.invalidate(),vt()==="preview"&&o.ensureRendered())}),mp(),bp(vt,e),gp(vt,e),yp(vt,e,t),xp(e)}function qr(e){const t=vt()==="source",n=!t;e.sourceButton.classList.toggle("active",t),e.previewButton.classList.toggle("active",n),e.sourceButton.setAttribute("aria-selected",String(t)),e.previewButton.setAttribute("aria-selected",String(n)),e.previewPane.classList.toggle("overlay",n),e.refreshSeparator(),n&&e.ensureRendered()}function vp(e){let t=!1,n;return{ensureRendered:()=>(t||n||(n=(async()=>{try{const u=Ia(await So(pp(),!1));e.innerHTML=`<div class="quicklook-content">${u}</div>`,e.querySelectorAll("a[href]").forEach(a=>{a.removeAttribute("href"),a.removeAttribute("target")}),Fa(()=>{}),t=!0}catch(u){throw n=void 0,u}})()),n),invalidate:()=>{t=!1,n=void 0}}}var In={exports:{}};var _p=In.exports,ni;function Ep(){return ni||(ni=1,(function(e,t){(function(n,r){e.exports=r()})(_p,(function(){var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},r=function(d,l){if(!(d instanceof l))throw new TypeError("Cannot call a class as a function")},o=(function(){function d(l,s){for(var f=0;f<s.length;f++){var h=s[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(l,h.key,h)}}return function(l,s,f){return s&&d(l.prototype,s),f&&d(l,f),l}})(),u=Object.assign||function(d){for(var l=1;l<arguments.length;l++){var s=arguments[l];for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&(d[f]=s[f])}return d},a=(function(){function d(l){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,d),this.ctx=l,this.iframes=s,this.exclude=f,this.iframesTimeout=h}return o(d,[{key:"getContexts",value:function(){var s=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?s=[]:NodeList.prototype.isPrototypeOf(this.ctx)?s=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?s=this.ctx:typeof this.ctx=="string"?s=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):s=[this.ctx],s.forEach(function(h){var p=f.filter(function(b){return b.contains(h)}).length>0;f.indexOf(h)===-1&&!p&&f.push(h)}),f}},{key:"getIframeContents",value:function(s,f){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},p=void 0;try{var b=s.contentWindow;if(p=b.document,!b||!p)throw new Error("iframe inaccessible")}catch{h()}p&&f(p)}},{key:"isIframeBlank",value:function(s){var f="about:blank",h=s.getAttribute("src").trim(),p=s.contentWindow.location.href;return p===f&&h!==f&&h}},{key:"observeIframeLoad",value:function(s,f,h){var p=this,b=!1,g=null,y=function x(){if(!b){b=!0,clearTimeout(g);try{p.isIframeBlank(s)||(s.removeEventListener("load",x),p.getIframeContents(s,f,h))}catch{h()}}};s.addEventListener("load",y),g=setTimeout(y,this.iframesTimeout)}},{key:"onIframeReady",value:function(s,f,h){try{s.contentWindow.document.readyState==="complete"?this.isIframeBlank(s)?this.observeIframeLoad(s,f,h):this.getIframeContents(s,f,h):this.observeIframeLoad(s,f,h)}catch{h()}}},{key:"waitForIframes",value:function(s,f){var h=this,p=0;this.forEachIframe(s,function(){return!0},function(b){p++,h.waitForIframes(b.querySelector("html"),function(){--p||f()})},function(b){b||f()})}},{key:"forEachIframe",value:function(s,f,h){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},g=s.querySelectorAll("iframe"),y=g.length,x=0;g=Array.prototype.slice.call(g);var C=function(){--y<=0&&b(x)};y||C(),g.forEach(function(w){d.matches(w,p.exclude)?C():p.onIframeReady(w,function(_){f(w)&&(x++,h(_)),C()},C)})}},{key:"createIterator",value:function(s,f,h){return document.createNodeIterator(s,f,h,!1)}},{key:"createInstanceOnIframe",value:function(s){return new d(s.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(s,f,h){var p=s.compareDocumentPosition(h),b=Node.DOCUMENT_POSITION_PRECEDING;if(p&b)if(f!==null){var g=f.compareDocumentPosition(h),y=Node.DOCUMENT_POSITION_FOLLOWING;if(g&y)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(s){var f=s.previousNode(),h=void 0;return f===null?h=s.nextNode():h=s.nextNode()&&s.nextNode(),{prevNode:f,node:h}}},{key:"checkIframeFilter",value:function(s,f,h,p){var b=!1,g=!1;return p.forEach(function(y,x){y.val===h&&(b=x,g=y.handled)}),this.compareNodeIframe(s,f,h)?(b===!1&&!g?p.push({val:h,handled:!0}):b!==!1&&!g&&(p[b].handled=!0),!0):(b===!1&&p.push({val:h,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(s,f,h,p){var b=this;s.forEach(function(g){g.handled||b.getIframeContents(g.val,function(y){b.createInstanceOnIframe(y).forEachNode(f,h,p)})})}},{key:"iterateThroughNodes",value:function(s,f,h,p,b){for(var g=this,y=this.createIterator(f,s,p),x=[],C=[],w=void 0,_=void 0,A=function(){var N=g.getIteratorNode(y);return _=N.prevNode,w=N.node,w};A();)this.iframes&&this.forEachIframe(f,function(F){return g.checkIframeFilter(w,_,F,x)},function(F){g.createInstanceOnIframe(F).forEachNode(s,function(N){return C.push(N)},p)}),C.push(w);C.forEach(function(F){h(F)}),this.iframes&&this.handleOpenIframes(x,s,h,p),b()}},{key:"forEachNode",value:function(s,f,h){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},g=this.getContexts(),y=g.length;y||b(),g.forEach(function(x){var C=function(){p.iterateThroughNodes(s,x,f,h,function(){--y<=0&&b()})};p.iframes?p.waitForIframes(x,C):C()})}}],[{key:"matches",value:function(s,f){var h=typeof f=="string"?[f]:f,p=s.matches||s.matchesSelector||s.msMatchesSelector||s.mozMatchesSelector||s.oMatchesSelector||s.webkitMatchesSelector;if(p){var b=!1;return h.every(function(g){return p.call(s,g)?(b=!0,!1):!0}),b}else return!1}}]),d})(),i=(function(){function d(l){r(this,d),this.ctx=l,this.ie=!1;var s=window.navigator.userAgent;(s.indexOf("MSIE")>-1||s.indexOf("Trident")>-1)&&(this.ie=!0)}return o(d,[{key:"log",value:function(s){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",h=this.opt.log;this.opt.debug&&(typeof h>"u"?"undefined":n(h))==="object"&&typeof h[f]=="function"&&h[f]("mark.js: "+s)}},{key:"escapeStr",value:function(s){return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(s){return this.opt.wildcards!=="disabled"&&(s=this.setupWildcardsRegExp(s)),s=this.escapeStr(s),Object.keys(this.opt.synonyms).length&&(s=this.createSynonymsRegExp(s)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),this.opt.diacritics&&(s=this.createDiacriticsRegExp(s)),s=this.createMergedBlanksRegExp(s),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.createJoinersRegExp(s)),this.opt.wildcards!=="disabled"&&(s=this.createWildcardsRegExp(s)),s=this.createAccuracyRegExp(s),s}},{key:"createSynonymsRegExp",value:function(s){var f=this.opt.synonyms,h=this.opt.caseSensitive?"":"i",p=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var b in f)if(f.hasOwnProperty(b)){var g=f[b],y=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(b):this.escapeStr(b),x=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g);y!==""&&x!==""&&(s=s.replace(new RegExp("("+this.escapeStr(y)+"|"+this.escapeStr(x)+")","gm"+h),p+("("+this.processSynomyms(y)+"|")+(this.processSynomyms(x)+")")+p))}return s}},{key:"processSynomyms",value:function(s){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),s}},{key:"setupWildcardsRegExp",value:function(s){return s=s.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),s.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(s){var f=this.opt.wildcards==="withSpaces";return s.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(s){return s.replace(/[^(|)\\]/g,function(f,h,p){var b=p.charAt(h+1);return/[(|)\\]/.test(b)||b===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(s){var f=[],h=this.opt.ignorePunctuation;return Array.isArray(h)&&h.length&&f.push(this.escapeStr(h.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?s.split(/\u0000+/).join("["+f.join("")+"]*"):s}},{key:"createDiacriticsRegExp",value:function(s){var f=this.opt.caseSensitive?"":"i",h=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],p=[];return s.split("").forEach(function(b){h.every(function(g){if(g.indexOf(b)!==-1){if(p.indexOf(g)>-1)return!1;s=s.replace(new RegExp("["+g+"]","gm"+f),"["+g+"]"),p.push(g)}return!0})}),s}},{key:"createMergedBlanksRegExp",value:function(s){return s.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(s){var f=this,h="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",p=this.opt.accuracy,b=typeof p=="string"?p:p.value,g=typeof p=="string"?[]:p.limiters,y="";switch(g.forEach(function(x){y+="|"+f.escapeStr(x)}),b){case"partially":default:return"()("+s+")";case"complementary":return y="\\s"+(y||this.escapeStr(h)),"()([^"+y+"]*"+s+"[^"+y+"]*)";case"exactly":return"(^|\\s"+y+")("+s+")(?=$|\\s"+y+")"}}},{key:"getSeparatedKeywords",value:function(s){var f=this,h=[];return s.forEach(function(p){f.opt.separateWordSearch?p.split(" ").forEach(function(b){b.trim()&&h.indexOf(b)===-1&&h.push(b)}):p.trim()&&h.indexOf(p)===-1&&h.push(p)}),{keywords:h.sort(function(p,b){return b.length-p.length}),length:h.length}}},{key:"isNumeric",value:function(s){return Number(parseFloat(s))==s}},{key:"checkRanges",value:function(s){var f=this;if(!Array.isArray(s)||Object.prototype.toString.call(s[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(s),[];var h=[],p=0;return s.sort(function(b,g){return b.start-g.start}).forEach(function(b){var g=f.callNoMatchOnInvalidRanges(b,p),y=g.start,x=g.end,C=g.valid;C&&(b.start=y,b.length=x-y,h.push(b),p=x)}),h}},{key:"callNoMatchOnInvalidRanges",value:function(s,f){var h=void 0,p=void 0,b=!1;return s&&typeof s.start<"u"?(h=parseInt(s.start,10),p=h+parseInt(s.length,10),this.isNumeric(s.start)&&this.isNumeric(s.length)&&p-f>0&&p-h>0?b=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(s))),this.opt.noMatch(s))):(this.log("Ignoring invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:h,end:p,valid:b}}},{key:"checkWhitespaceRanges",value:function(s,f,h){var p=void 0,b=!0,g=h.length,y=f-g,x=parseInt(s.start,10)-y;return x=x>g?g:x,p=x+parseInt(s.length,10),p>g&&(p=g,this.log("End range automatically set to the max value of "+g)),x<0||p-x<0||x>g||p>g?(b=!1,this.log("Invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)):h.substring(x,p).replace(/\s+/g,"")===""&&(b=!1,this.log("Skipping whitespace only range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:x,end:p,valid:b}}},{key:"getTextNodes",value:function(s){var f=this,h="",p=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(b){p.push({start:h.length,end:(h+=b.textContent).length,node:b})},function(b){return f.matchesExclude(b.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){s({value:h,nodes:p})})}},{key:"matchesExclude",value:function(s){return a.matches(s,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(s,f,h){var p=this.opt.element?this.opt.element:"mark",b=s.splitText(f),g=b.splitText(h-f),y=document.createElement(p);return y.setAttribute("data-markjs","true"),this.opt.className&&y.setAttribute("class",this.opt.className),y.textContent=b.textContent,b.parentNode.replaceChild(y,b),g}},{key:"wrapRangeInMappedTextNode",value:function(s,f,h,p,b){var g=this;s.nodes.every(function(y,x){var C=s.nodes[x+1];if(typeof C>"u"||C.start>f){if(!p(y.node))return!1;var w=f-y.start,_=(h>y.end?y.end:h)-y.start,A=s.value.substr(0,y.start),F=s.value.substr(_+y.start);if(y.node=g.wrapRangeInTextNode(y.node,w,_),s.value=A+F,s.nodes.forEach(function(N,Z){Z>=x&&(s.nodes[Z].start>0&&Z!==x&&(s.nodes[Z].start-=_),s.nodes[Z].end-=_)}),h-=_,b(y.node.previousSibling,y.start),h>y.end)f=y.end;else return!1}return!0})}},{key:"wrapMatches",value:function(s,f,h,p,b){var g=this,y=f===0?0:f+1;this.getTextNodes(function(x){x.nodes.forEach(function(C){C=C.node;for(var w=void 0;(w=s.exec(C.textContent))!==null&&w[y]!=="";)if(h(w[y],C)){var _=w.index;if(y!==0)for(var A=1;A<y;A++)_+=w[A].length;C=g.wrapRangeInTextNode(C,_,_+w[y].length),p(C.previousSibling),s.lastIndex=0}}),b()})}},{key:"wrapMatchesAcrossElements",value:function(s,f,h,p,b){var g=this,y=f===0?0:f+1;this.getTextNodes(function(x){for(var C=void 0;(C=s.exec(x.value))!==null&&C[y]!=="";){var w=C.index;if(y!==0)for(var _=1;_<y;_++)w+=C[_].length;var A=w+C[y].length;g.wrapRangeInMappedTextNode(x,w,A,function(F){return h(C[y],F)},function(F,N){s.lastIndex=N,p(F)})}b()})}},{key:"wrapRangeFromIndex",value:function(s,f,h,p){var b=this;this.getTextNodes(function(g){var y=g.value.length;s.forEach(function(x,C){var w=b.checkWhitespaceRanges(x,y,g.value),_=w.start,A=w.end,F=w.valid;F&&b.wrapRangeInMappedTextNode(g,_,A,function(N){return f(N,x,g.value.substring(_,A),C)},function(N){h(N,x)})}),p()})}},{key:"unwrapMatches",value:function(s){for(var f=s.parentNode,h=document.createDocumentFragment();s.firstChild;)h.appendChild(s.removeChild(s.firstChild));f.replaceChild(h,s),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(s){if(s){if(s.nodeType===3)for(;s.nextSibling&&s.nextSibling.nodeType===3;)s.nodeValue+=s.nextSibling.nodeValue,s.parentNode.removeChild(s.nextSibling);else this.normalizeTextNode(s.firstChild);this.normalizeTextNode(s.nextSibling)}}},{key:"markRegExp",value:function(s,f){var h=this;this.opt=f,this.log('Searching with expression "'+s+'"');var p=0,b="wrapMatches",g=function(x){p++,h.opt.each(x)};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),this[b](s,this.opt.ignoreGroups,function(y,x){return h.opt.filter(x,y,p)},g,function(){p===0&&h.opt.noMatch(s),h.opt.done(p)})}},{key:"mark",value:function(s,f){var h=this;this.opt=f;var p=0,b="wrapMatches",g=this.getSeparatedKeywords(typeof s=="string"?[s]:s),y=g.keywords,x=g.length,C=this.opt.caseSensitive?"":"i",w=function _(A){var F=new RegExp(h.createRegExp(A),"gm"+C),N=0;h.log('Searching with expression "'+F+'"'),h[b](F,1,function(Z,ge){return h.opt.filter(ge,A,p,N)},function(Z){N++,p++,h.opt.each(Z)},function(){N===0&&h.opt.noMatch(A),y[x-1]===A?h.opt.done(p):_(y[y.indexOf(A)+1])})};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),x===0?this.opt.done(p):w(y[0])}},{key:"markRanges",value:function(s,f){var h=this;this.opt=f;var p=0,b=this.checkRanges(s);b&&b.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(b)),this.wrapRangeFromIndex(b,function(g,y,x,C){return h.opt.filter(g,y,x,C)},function(g,y){p++,h.opt.each(g,y)},function(){h.opt.done(p)})):this.opt.done(p)}},{key:"unmark",value:function(s){var f=this;this.opt=s;var h=this.opt.element?this.opt.element:"*";h+="[data-markjs]",this.opt.className&&(h+="."+this.opt.className),this.log('Removal selector "'+h+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(p){f.unwrapMatches(p)},function(p){var b=a.matches(p,h),g=f.matchesExclude(p);return!b||g?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(s){this._opt=u({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},s)},get:function(){return this._opt}},{key:"iterator",get:function(){return new a(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function c(d){var l=this,s=new i(d);return this.mark=function(f,h){return s.mark(f,h),l},this.markRegExp=function(f,h){return s.markRegExp(f,h),l},this.markRanges=function(f,h){return s.markRanges(f,h),l},this.unmark=function(f){return s.unmark(f),l},this}return c}))})(In)),In.exports}var Ap=Ep();const ja=Kn(Ap),en="markedit-preview-mark",Ga="markedit-preview-mark-highlighted";let Wt=!1,Lo,$e=0,Ee=[],tn=null,_n=null;const ri={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function Sp(e){if(Lo=e,$e=0,e.search.length===0){Wa();return}const t=or();Va(t),Fp(t)}function Tp(e){Ee.length!==0&&($e=e%Ee.length,Za())}function Wa(){tn?.disconnect(),tn=null,Lo=void 0,$e=0,Ee=[],new ja(or()).unmark()}function Dp(){if(Se()===Le.preview)return{numberOfItems:Ee.length,currentIndex:$e}}function Va(e){const t=Lo;if(t===void 0||t.search.length===0||Wt)return;Mp(),Wt=!0;const{search:n,caseSensitive:r,wholeWord:o,diacriticInsensitive:u,regexp:a}=t,i=new ja(e),c=()=>{Ee=Array.from(e.querySelectorAll(`.${en}`)),$e=Ee.length>0?Math.min($e,Ee.length-1):0,Za(),Wt=!1};i.unmark({done:()=>{if(a)try{const d=r?"":"i";i.markRegExp(new RegExp(n,d),{className:en,done:c})}catch{Wt=!1,$e=0,Ee=[]}else i.mark(n,{className:en,caseSensitive:r,diacritics:u,separateWordSearch:!1,accuracy:o?"exactly":"partially",done:c})}})}function Za(){const e=Se()!==Le.sideBySide;Ee.forEach((t,n)=>{t.classList.toggle(Ga,e&&n===$e)}),e&&Ee.length>0&&Ee[$e].scrollIntoView({behavior:"smooth",block:"center"})}function Fp(e){tn?.disconnect(),tn=new MutationObserver(()=>{Wt||Va(e)}),tn.observe(e,{childList:!0})}function Mp(){_n===null&&(_n=document.createElement("style"),document.head.appendChild(_n));const{light:e,dark:t}=ri[tr]??ri.github;_n.textContent=[`.${en} { background: ${e} !important; color: inherit !important; }`,`.${Ga} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${en} { background: ${t} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(Xh(),Ao()?typeof I.MarkEdit.onAppReady=="function"&&I.MarkEdit.onAppReady(lp):wp(or()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=qa;window.MarkEditRenderHtml??=up;window.__markeditPreviewSPI__={performSearch:Sp,setSearchMatchIndex:Tp,clearSearch:Wa,searchCounterInfo:Dp};Ao()&&(I.MarkEdit.addMainMenuItem({title:K("viewMode"),icon:Mc()?"eye":void 0,children:[{title:K("changeMode"),action:Jh,key:Gu.key??"V",modifiers:Gu.modifiers??["Command"]},{separator:!0},En(K("editMode"),Le.edit),En(K("sideBySideMode"),Le.sideBySide),En(K("previewMode"),Le.preview),En(K("syntaxHiddenMode"),Le.syntaxHidden),{separator:!0},...Ip(),{separator:!0},{title:`${K("version")} 1.12.0`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.12.0")}]}),I.MarkEdit.addExtension([D.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(t=>t.annotation(Ha))||(ct.renderUpdater!==void 0&&clearTimeout(ct.renderUpdater),ct.renderUpdater=setTimeout(qn,500)))}),Bh]),I.MarkEdit.onEditorReady(()=>{Gf&&Th(I.MarkEdit.editorView.scrollDOM),Qh(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&Se()===Le.preview&&typeof I.MarkEdit.getFileInfo=="function"&&(await I.MarkEdit.getFileInfo())?.filePath===void 0&&I.MarkEdit.editorAPI.getText().length===0&&rr(Le.edit,!1)}),qn(),Fh(Ba(),or()),ct.keyDownListener!==void 0&&document.removeEventListener("keydown",ct.keyDownListener),ct.keyDownListener=e=>ep(e),document.addEventListener("keydown",ct.keyDownListener)}),typeof I.MarkEdit.onEditorConfigChange=="function"&&I.MarkEdit.onEditorConfigChange(e=>{e==="lineHeight"&&Se()===Le.syntaxHidden&&I.MarkEdit.editorView?.requestMeasure()}));function En(e,t){return{title:e,action:()=>rr(t),state:()=>({isSelected:Se()===t})}}function Ip(){const e=[{title:K("copyHtml"),action:rp},{title:K("copyRichText"),action:op}];return typeof I.MarkEdit.showSavePanel>"u"?e:[{title:K("saveCleanHtml"),action:tp},{title:K("saveStyledHtml"),action:np},...e]}const ct={renderUpdater:void 0,keyDownListener:void 0},Lp=Ya(!1),Rp=Ya(!0),Np=V.Prec.high(D.keymap.of([{key:"ArrowUp",run:Lp,shift:Rp}])),Op=D.EditorView.mouseSelectionStyle.of((e,t)=>{if(t.button!==0||t.detail!==1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)return null;const n={x:t.clientX,y:t.clientY};let r=e.posAndSideAtCoords(n,!1);return{get(o){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(o.clientX-n.x),Math.abs(o.clientY-n.y))<=5)return V.EditorSelection.create([V.EditorSelection.cursor(r.pos,r.assoc)]);const a=e.posAndSideAtCoords({x:o.clientX,y:o.clientY},!1);return Number.isFinite(a.pos)?a.pos===r.pos?V.EditorSelection.create([V.EditorSelection.cursor(a.pos,a.assoc)]):V.EditorSelection.create([V.EditorSelection.range(r.pos,a.pos,void 0,void 0,a.assoc)]):e.state.selection},update(o){o.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:o.changes.mapPos(r.pos)})}}});function be(e,t,n){return e.selection.ranges.some(r=>r.from<=n&&r.to>=t)}function Ya(e){return t=>{const n=V.EditorSelection.create(t.state.selection.ranges.map(r=>{let o=r;e&&o.undirectional&&o.head>=o.anchor&&(o=V.EditorSelection.range(o.head,o.anchor));let u=e||o.empty?Pp(t,o):V.EditorSelection.cursor(o.from);return!e&&o.empty&&u.head===o.head&&(u=t.moveToLineBoundary(o,!1)),e?V.EditorSelection.range(o.anchor,u.head,u.goalColumn,u.bidiLevel??void 0,u.assoc):u}),t.state.selection.mainIndex);return n.eq(t.state.selection,!0)?!1:(t.dispatch({selection:n,scrollIntoView:!0,userEvent:"select"}),!0)}}function Pp(e,t){const n=e.moveVertically(t,!1),r=e.state.doc.lineAt(t.head),o=e.state.doc.lineAt(n.head);if(r.number-o.number<=1)return n;const u=e.state.doc.line(r.number-1);if(!zp(e,u.from))return n;const a=e.lineBlockAt(u.from),i=n.goalColumn,c=e.coordsAtPos(t.head,t.assoc||1),d=i===void 0?c?.left:e.contentDOM.getBoundingClientRect().left+i;if(d===void 0)return n;const l=e.posAndSideAtCoords({x:d,y:e.documentTop+a.top+a.height/2});return l===null||l.pos<u.from||l.pos>u.to?n:V.EditorSelection.cursor(l.pos,l.assoc,void 0,i)}function zp(e,t){for(let n=pe.syntaxTree(e.state).resolve(t,1);n!==null;n=n.parent)if(n.name.startsWith("ATXHeading"))return!0;return!1}const Hp={note:"Note",tip:"Tip",important:"Important",warning:"Warning",caution:"Caution"};function Bp(e,t){if(e.name!=="Blockquote")return;const n=e.node.getChild("Paragraph");if(n===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==n.from||r.to!==n.to);){if(r.name!=="QuoteMark")return;r=r.nextSibling}if(r===null)return;const o=t.doc.lineAt(n.from),u=t.sliceDoc(n.from,o.to),a=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(u);if(a===null)return;const i=a[1].toLowerCase(),c=n.from,d=c+a[0].length;if(!be(t,c,d))return{from:c,to:d,type:i,title:Hp[i]}}function qp(e,t){if(e.name==="QuoteMark"&&!be(t,e.from,e.to))return{from:e.from,to:e.to}}function $p(e){if(e.name!=="Blockquote")return;let t=1,n=e.node.parent;for(;n!==null;)n.name==="Blockquote"&&(t+=1),n=n.parent;return{from:e.from,to:e.to,depth:t}}const Up={note:'<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};class jp extends D.WidgetType{constructor(t,n){super(),this.type=t,this.title=n}eq(t){return t.type===this.type&&t.title===this.title}toDOM(){const t=document.createElement("span");t.className="cm-md-syntaxHiddenAlert",t.dataset.type=this.type;const n=t.appendChild(document.createElement("span"));n.className="cm-md-syntaxHiddenAlertIcon",n.innerHTML=Up[this.type],n.setAttribute("aria-hidden","true");const r=t.appendChild(document.createElement("span"));return r.textContent=this.title,t}ignoreEvent(){return!1}}const Gp=D.layer({above:!1,class:"cm-md-syntaxHiddenBlockquoteLayer",markers:Vp,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function Wp(e){const t=new Map,n=new Map;for(const{from:o,to:u}of e.visibleRanges)pe.syntaxTree(e.state).iterate({from:o,to:u,enter:a=>{const i=$p(a);if(i!==void 0&&t.set(oi(i),i),a.name!=="QuoteMark")return;const c=Qp(a.node);if(c===null)return;const d=oi(c),l=e.state.doc.lineAt(a.from).from,s=n.get(d)??new Map;s.set(l,{position:a.from,active:be(e.state,a.from,a.to)}),n.set(d,s)}});const r=[];return t.forEach((o,u)=>{const a=n.get(u),i=new Set;e.viewportLineBlocks.forEach(c=>{const d=e.state.doc.lineAt(c.from);if(i.has(d.from)||d.to<o.from||d.from>=o.to)return;i.add(d.from);const l=a?.get(d.from);l?.active!==!0&&r.push({line:d.from,ownerFrom:o.from,anchor:l?.position,depth:o.depth})})}),r}function Vp(e){const t=Jp(e),n=new Map;return Wp(e).flatMap(r=>{const u=Xp(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(u===void 0||a===null)return[];let i=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(i===void 0){let d=n.get(r.ownerFrom);d===void 0&&(d=Kp(e,r.ownerFrom),n.set(r.ownerFrom,d)),i=a.left+d}const c=Yp(e,r.anchor??r.ownerFrom);return[new Zp(r.depth,i-t.left,u.top-t.top,3,u.height,c.color,c.opacity)]})}class Zp extends D.RectangleMarker{constructor(t,n,r,o,u,a,i){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${t}`,n,r,o,u),this.color=a,this.opacity=i}draw(){const t=super.draw();return t.style.backgroundColor=this.color,t.style.opacity=`${this.opacity}`,t}update(t,n){return super.update(t,n)?(t.style.backgroundColor=this.color,t.style.opacity=`${this.opacity}`,!0):!1}eq(t){return super.eq(t)&&this.color===t.color&&this.opacity===t.opacity}}function Yp(e,t){const n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement;let o=1;for(let u=r;u!==null&&u!==e.scrollDOM;u=u.parentElement){const a=parseFloat(getComputedStyle(u).opacity);Number.isNaN(a)||(o*=a)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:o}}function Kp(e,t){const n=e.state.doc.lineAt(t),r=e.coordsAtPos(n.from,1),o=e.coordsAtPos(t,1);if(r!==null&&o!==null)return o.left-r.left;let u=0;for(const a of e.state.sliceDoc(n.from,t))u=a==="	"?u+e.state.tabSize-u%e.state.tabSize:u+1;return u*e.defaultCharacterWidth}function Xp(e,t){const n=e.domAtPos(t).node;return(n instanceof HTMLElement?n:n.parentElement)?.closest(".cm-line")}function Jp(e){const t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===D.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function Qp(e){let t=e.parent;for(;t!==null&&t.name!=="Blockquote";)t=t.parent;return t}function oi(e){return`${e.from}:${e.to}`}function Ka(e,t){if(e.name!=="ListMark")return;const n=e.node.parent,r=n?.getChild("Task"),o=r?.getChild("TaskMarker");if(!(n?.name!=="ListItem"||n.parent?.name!=="BulletList"||!/^[ \t]$/.test(t.sliceDoc(e.to,e.to+1))||be(t,e.from,o?.to??e.to)))return{from:e.from,to:e.to,task:r!==null}}const e1=D.layer({above:!1,class:"cm-md-syntaxHiddenListBulletLayer",markers:n1,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function t1(e){const t=[];for(const{from:n,to:r}of e.visibleRanges)pe.syntaxTree(e.state).iterate({from:n,to:r,enter:o=>{const u=Ka(o,e.state);u!==void 0&&!u.task&&t.push({from:u.from,to:u.to})}});return t}function n1(e){const t=u1(e);return t1(e).flatMap(n=>{const r=e.coordsForChar(n.from);if(r===null)return[];const o=o1(e,n.from);return[new r1(r.left-t.left,r.top-t.top,r.right-r.left,r.bottom-r.top,o.color,o.opacity,o.textShadow)]})}class r1 extends D.RectangleMarker{constructor(t,n,r,o,u,a,i){super("cm-md-syntaxHiddenListBullet",t,n,r,o),this.color=u,this.opacity=a,this.textShadow=i}draw(){const t=super.draw();return t.textContent="•",t.style.color=this.color,t.style.opacity=`${this.opacity}`,t.style.textShadow=this.textShadow,t}update(t,n){return super.update(t,n)?(t.style.color=this.color,t.style.opacity=`${this.opacity}`,t.style.textShadow=this.textShadow,!0):!1}eq(t){return super.eq(t)&&this.color===t.color&&this.opacity===t.opacity&&this.textShadow===t.textShadow}}function o1(e,t){const n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,o=getComputedStyle(r??e.contentDOM);let u=1;for(let a=r;a!==null&&a!==e.scrollDOM;a=a.parentElement){const i=parseFloat(getComputedStyle(a).opacity);Number.isNaN(i)||(u*=i)}return{color:o.color,opacity:u,textShadow:o.textShadow==="none"?"":o.textShadow}}function u1(e){const t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===D.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}const ui=typeof ResizeObserver>"u"?void 0:new ResizeObserver(e=>{for(const t of e)s1(t.target)}),i1=[D.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=ii(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(t=>t.reconfigured))&&(this.decorations=ii(e.view))}},{decorations:e=>e.decorations}),D.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:"inline-block",position:"relative",height:"1lh",margin:"0",textIndent:"0",verticalAlign:"top"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:"absolute",insetBlockStart:"0",insetInlineStart:"-0.15em",display:"grid",placeItems:"center",width:"1em",height:"1lh"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:"0",transform:"translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))"}})];function a1(e){const t=[];for(const{from:n,to:r}of e.visibleRanges)pe.syntaxTree(e.state).iterate({from:n,to:r,enter:o=>{if(o.name!=="TaskMarker")return;const u=o.node.parent,a=u?.parent,i=a?.getChild("ListMark"),c=o.to+1;u?.name==="Task"&&a?.name==="ListItem"&&a.parent?.name==="BulletList"&&i!==null&&i!==void 0&&e.state.sliceDoc(o.to,c)===" "&&!be(e.state,i.from,o.to)&&t.push({from:i.from,to:c,markerFrom:o.from,listPrefix:e.state.sliceDoc(i.from,i.to+1),checked:e.state.sliceDoc(o.from,o.to)!=="[ ]",label:e.state.sliceDoc(c,e.state.doc.lineAt(o.to).to).trim()||"Task"})}});return t}function ii(e){const t=e.state.readOnly||!e.state.facet(D.EditorView.editable),n=a1(e).map(r=>D.Decoration.replace({widget:new c1(r.markerFrom,r.listPrefix,r.checked,r.label,t)}).range(r.from,r.to));return D.Decoration.set(n,!0)}class c1 extends D.WidgetType{constructor(t,n,r,o,u){super(),this.markerFrom=t,this.listPrefix=n,this.checked=r,this.label=o,this.disabled=u}eq(t){return this.markerFrom===t.markerFrom&&this.listPrefix===t.listPrefix&&this.checked===t.checked&&this.label===t.label&&this.disabled===t.disabled}toDOM(t){const n=document.createElement("span");n.className="cm-md-syntaxHiddenTaskCheckboxFrame";const r=n.appendChild(document.createElement("span"));r.className="cm-md-syntaxHiddenTaskCheckboxMarker",r.textContent=this.listPrefix;const o=n.appendChild(document.createElement("span"));o.className="cm-md-syntaxHiddenTaskCheckboxControl";const u=o.appendChild(document.createElement("input"));return u.className="cm-md-syntaxHiddenTaskCheckbox",u.type="checkbox",this.updateInput(u),u.addEventListener("change",()=>l1(t,Number(u.dataset.markerFrom),u.checked)),ui?.observe(n),n}updateDOM(t){const n=t.querySelector(".cm-md-syntaxHiddenTaskCheckbox");return n===null?!1:(this.updateInput(n),!0)}destroy(t){ui?.unobserve(t)}ignoreEvent(){return!0}updateInput(t){t.checked=this.checked,t.disabled=this.disabled,t.dataset.markerFrom=`${this.markerFrom}`,t.setAttribute("aria-label",this.label)}}function s1(e){const t=e.querySelector(".cm-md-syntaxHiddenTaskCheckbox");if(t===null||t.offsetWidth===0)return;const n=parseFloat(getComputedStyle(e).fontSize);t.style.setProperty("--cm-md-task-checkbox-scale",`${n/t.offsetWidth}`)}function l1(e,t,n){const r=e.state.sliceDoc(t,t+3);if(e.state.readOnly||!e.state.facet(D.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;const o=e.state.changes({from:t+1,to:t+2,insert:n?"x":" "});e.dispatch({changes:o,effects:e.scrollSnapshot().map(o)??[],userEvent:"input"})}const d1=/^\[\^[^\][\s]+\]$/,ai=new WeakMap;function f1(e,t,n){if(!["Link","Image","Autolink"].includes(e.name)||be(t,e.from,e.to))return;const r=g1(e.node);if(e.name==="Autolink"){if(r.length<2)return;const l=t.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(l)?{hidden:r.map(s=>({from:s.from,to:s.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:l,highlightTags:$n(e.node)}:void 0}if(r.length<2||Ro(e,t).length>0)return;const o=e.node.getChild("LinkLabel");if(r.length===2&&(o===null||o.to-o.from===2))return;const u=e.node.getChild("URL");if(r.length>2&&u===null||["(","["].includes(t.sliceDoc(e.to,e.to+1)))return;const a=r[0],i=r[1],c=t.sliceDoc(a.to,i.from);if(!/\S/.test(c)||c.startsWith("^")&&e.to===i.to)return;const d=u===null?m1(o,t,n):t.sliceDoc(u.from,u.to);if(!(e.name==="Image"&&u===null&&d===""))return{hidden:[{from:a.from,to:a.to},{from:i.from,to:e.to}],label:{from:a.to,to:i.from},image:e.name==="Image",destination:d,highlightTags:$n(e.node)}}function Ro(e,t){if(e.name!=="Link")return[];const n=t.sliceDoc(e.from,e.to),r=/\[\^[^\][\s]+\]/g,o=[];for(let u=r.exec(n);u!==null;u=r.exec(n))o.push(u);return o.map(u=>u[0]).join("")!==n?[]:o.map(u=>({from:e.from+u.index,to:e.from+u.index+u[0].length,label:u[0].slice(1,-1),highlightTags:$n(e.node)}))}function h1(e,t){if(!(e.name!=="LinkDefinition"||be(t,e.from,e.to+1)||!d1.test(t.sliceDoc(e.from,e.to))||t.sliceDoc(e.to,e.to+1)!==":"))return{hidden:[{from:e.from+1,to:e.from+2}],label:t.sliceDoc(e.from+1,e.to-1),highlightTags:$n(e.node),suffixPosition:e.to+1,suffix:/^[ \t]/.test(t.sliceDoc(e.to+1,e.to+2))?"":" "}}function $n(e){const t=[];for(let r=e;r!==null;r=r.parent)t.unshift(r);const n=new Set;for(const r of t){const o=Ti.getStyleTags(r);o!==null&&(r===e||o.inherit)&&o.tags.forEach(u=>n.add(u))}return[...n]}function p1(e){const t=pe.syntaxTree(e);let n;return r=>{const o=ai.get(t);return n??=o?.doc===e.doc?o.destinations:void 0,n===void 0&&(n=b1(e,t),ai.set(t,{doc:e.doc,destinations:n})),n.get(Xa(r))??""}}function m1(e,t,n){return e===null?"":n(t.sliceDoc(e.from+1,e.to-1))}function b1(e,t){const n=new Map;return t.iterate({enter:r=>{if(r.name!=="LinkDefinitionID")return;const o=Xa(e.sliceDoc(r.from,r.to));if(n.has(o))return;const u=e.doc.lineAt(r.to),a=e.sliceDoc(r.node.parent?.to??r.to,u.to),i=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),c=i?.[1]??i?.[2];c!==void 0&&n.set(o,c)}}),n}function Xa(e){return e.trim().replace(/\s+/g," ").toLowerCase()}function g1(e){const t=[];for(let n=e.firstChild;n!==null;n=n.nextSibling)n.name==="LinkMark"&&t.push(n);return t}const y1=/^(?:vbscript|javascript|file|data):/,k1=/^data:image\/(?:gif|png|jpeg|webp);/;function x1(e){const t=e.trim().toLowerCase();return y1.test(t)&&!k1.test(t)?!1:(window.open(e,"_blank","noopener"),!0)}async function ci(e,t,n="definition"){const r=e.state,o=pe.ensureSyntaxTree(r,r.doc.length,5e3);if(o===null)return!1;let u;return o.iterate({enter:a=>{if(u!==void 0)return!1;if(n==="reference"){const i=Ro(a,r).find(c=>c.label===t);i!==void 0&&(u=V.EditorSelection.range(i.from,i.to))}else a.name==="LinkDefinition"&&r.sliceDoc(a.from,a.to)===`[${t}]`&&(u=V.EditorSelection.range(a.from,a.to))}}),u===void 0?(Di(),!1):(Ja(e,u),!0)}async function C1(e,t){const n=e.state.doc,r=n.toString(),o=await vh(r,t);if(o===void 0||e.state.doc!==n)return!1;const u=e.state.doc.line(o+1).from;return Ja(e,V.EditorSelection.cursor(u)),!0}function Ja(e,t){const n=e.state.doc,r=e.scrollDOM.scrollTop,o=u=>e.dispatch({effects:D.EditorView.scrollIntoView(t.from,{y:u,yMargin:5})});e.dispatch({selection:t}),o("start"),setTimeout(()=>{e.state.doc===n&&Math.abs(e.scrollDOM.scrollTop-r)<.001&&o("center")},50)}const w1={link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>',footnoteBack:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>'};class $r extends D.WidgetType{constructor(t,n,r,o,u){super(),this.kind=t,this.destination=r,this.label=o,this.highlightClasses=pe.highlightingFor(n,u)??""}highlightClasses;toDOM(t){const n=document.createElement("button");return n.type="button",n.className=["cm-md-syntaxHiddenLinkButton",this.highlightClasses].filter(Boolean).join(" "),n.dataset.kind=this.kind,n.title=this.kind==="footnote"||this.kind==="footnoteBack"?K(this.kind==="footnote"?"goToFootnoteDefinition":"backToFootnoteReference").replace("%s",()=>this.destination.slice(1)):this.destination,n.innerHTML=w1[this.kind==="footnote"?"link":this.kind],n.setAttribute("aria-label",n.title||this.label),n.addEventListener("click",r=>{r.stopPropagation(),this.kind==="footnote"?ci(t,this.destination):this.kind==="footnoteBack"?ci(t,this.destination,"reference"):this.destination.startsWith("#")?C1(t,this.destination):this.destination!==""?x1(this.destination):Di()}),n}eq(t){return t.kind===this.kind&&t.highlightClasses===this.highlightClasses&&t.destination===this.destination&&t.label===this.label}ignoreEvent(){return!0}}class v1 extends D.WidgetType{constructor(t){super(),this.text=t}eq(t){return t.text===this.text}toDOM(){const t=document.createElement("span");return t.textContent=this.text,t}ignoreEvent(){return!1}}class _1 extends D.WidgetType{constructor(t,n){super(),this.destination=t,this.label=n}toDOM(){const t=document.createElement("img");return t.className="cm-md-syntaxHiddenImage",t.src=Fo(this.destination),t.alt=this.label,t.title=this.destination,t.draggable=!1,t}eq(t){return t.destination===this.destination&&t.label===this.label}ignoreEvent(){return!1}}function si(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function E1(e){if(Array.isArray(e))return e}function A1(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,u,a,i=[],c=!0,d=!1;try{if(u=(n=n.call(e)).next,t!==0)for(;!(c=(r=u.call(n)).done)&&(i.push(r.value),i.length!==t);c=!0);}catch(l){d=!0,o=l}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(d)throw o}}return i}}function S1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function T1(e,t){return E1(e)||A1(e,t)||D1(e,t)||S1()}function D1(e,t){if(e){if(typeof e=="string")return si(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?si(e,t):void 0}}const Qa=Object.entries,li=Object.setPrototypeOf,F1=Object.isFrozen,M1=Object.getPrototypeOf,I1=Object.getOwnPropertyDescriptor;let re=Object.freeze,oe=Object.seal,Et=Object.create,ec=typeof Reflect<"u"&&Reflect,io=ec.apply,ao=ec.construct;re||(re=function(t){return t});oe||(oe=function(t){return t});io||(io=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),u=2;u<r;u++)o[u-2]=arguments[u];return t.apply(n,o)});ao||(ao=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});const Ct=Y(Array.prototype.forEach),L1=Y(Array.prototype.lastIndexOf),di=Y(Array.prototype.pop),wt=Y(Array.prototype.push),R1=Y(Array.prototype.splice),Xe=Array.isArray,Vt=Y(String.prototype.toLowerCase),Ur=Y(String.prototype.toString),fi=Y(String.prototype.match),jt=Y(String.prototype.replace),hi=Y(String.prototype.indexOf),N1=Y(String.prototype.trim),O1=Y(Number.prototype.toString),P1=Y(Boolean.prototype.toString),pi=typeof BigInt>"u"?null:Y(BigInt.prototype.toString),mi=typeof Symbol>"u"?null:Y(Symbol.prototype.toString),Q=Y(Object.prototype.hasOwnProperty),Gt=Y(Object.prototype.toString),X=Y(RegExp.prototype.test),st=z1(TypeError);function Y(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return io(e,t,r)}}function z1(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ao(e,n)}}function O(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vt;if(li&&li(e,null),!Xe(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){const u=n(o);u!==o&&(F1(t)||(t[r]=u),o=u)}e[o]=!0}return e}function H1(e){for(let t=0;t<e.length;t++)Q(e,t)||(e[t]=null);return e}function se(e){const t=Et(null);for(const r of Qa(e)){var n=T1(r,2);const o=n[0],u=n[1];Q(e,o)&&(Xe(u)?t[o]=H1(u):u&&typeof u=="object"&&u.constructor===Object?t[o]=se(u):t[o]=u)}return t}function B1(e){switch(typeof e){case"string":return e;case"number":return O1(e);case"boolean":return P1(e);case"bigint":return pi?pi(e):"0";case"symbol":return mi?mi(e):"Symbol()";case"undefined":return Gt(e);case"function":case"object":{if(e===null)return Gt(e);const t=e,n=Ie(t,"toString");if(typeof n=="function"){const r=n(t);return typeof r=="string"?r:Gt(r)}return Gt(e)}default:return Gt(e)}}function Ie(e,t){for(;e!==null;){const r=I1(e,t);if(r){if(r.get)return Y(r.get);if(typeof r.value=="function")return Y(r.value)}e=M1(e)}function n(){return null}return n}function q1(e){try{return X(e,""),!0}catch{return!1}}const bi=re(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),jr=re(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Gr=re(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$1=re(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Wr=re(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),U1=re(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gi=re(["#text"]),yi=re(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Vr=re(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ki=re(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),An=re(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),j1=oe(/{{[\w\W]*|^[\w\W]*}}/g),G1=oe(/<%[\w\W]*|^[\w\W]*%>/g),W1=oe(/\${[\w\W]*/g),V1=oe(/^data-[\-\w.\u00B7-\uFFFF]+$/),Z1=oe(/^aria-[\-\w]+$/),xi=oe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Y1=oe(/^(?:\w+script|data):/i),K1=oe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),X1=oe(/^html$/i),J1=oe(/^[a-z][.\w]*(-[.\w]+)+$/i),Ci=oe(/<[/\w!]/g),wi=oe(/<[/\w]/g),Q1=oe(/<\/no(script|embed|frames)/i),em=oe(/\/>/i),ye={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tm=function(){return typeof window>"u"?null:window},nm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const u="dompurify"+(r?"#"+r:"");try{return t.createPolicy(u,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+u+" could not be created."),null}},vi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ye=function(t,n,r,o){return Q(t,n)&&Xe(t[n])?O(o.base?se(o.base):{},t[n],o.transform):r};function tc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tm();const t=E=>tc(E);if(t.version="3.4.12",t.removed=[],!e||!e.document||e.document.nodeType!==ye.document||!e.Element)return t.isSupported=!1,t;let n=e.document;const r=n,o=r.currentScript;e.DocumentFragment;const u=e.HTMLTemplateElement,a=e.Node,i=e.Element,c=e.NodeFilter,d=e.NamedNodeMap;d===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const l=e.DOMParser,s=e.trustedTypes,f=i.prototype,h=Ie(f,"cloneNode"),p=Ie(f,"remove"),b=Ie(f,"nextSibling"),g=Ie(f,"childNodes"),y=Ie(f,"parentNode"),x=Ie(f,"shadowRoot"),C=Ie(f,"attributes"),w=a&&a.prototype?Ie(a.prototype,"nodeType"):null,_=a&&a.prototype?Ie(a.prototype,"nodeName"):null;if(typeof u=="function"){const E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let A,F="",N,Z=!1,ge=0;const mt=function(){if(ge>0)throw st('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ue=function(m){mt(),ge++;try{return A.createHTML(m)}finally{ge--}},ir=function(m){mt(),ge++;try{return A.createScriptURL(m)}finally{ge--}},hn=function(){return Z||(N=nm(s,o),Z=!0),N},we=n,Bt=we.implementation,Po=we.createNodeIterator,uc=we.createDocumentFragment,ic=we.getElementsByTagName,ac=r.importNode;let B=vi();t.isSupported=typeof Qa=="function"&&typeof y=="function"&&Bt&&Bt.createHTMLDocument!==void 0;const cc=j1,sc=G1,lc=W1,dc=V1,fc=Z1,hc=Y1,zo=K1,pc=J1;let Ho=xi,q=null;const Bo=O({},[...bi,...jr,...Gr,...Wr,...gi]);let $=null;const qo=O({},[...yi,...Vr,...ki,...An]);let U=Object.seal(Et(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),qt=null,$o=null;const je=Object.seal(Et(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Uo=!0,ar=!0,jo=!1,Go=!0,Ge=!1,We=!0,ot=!1,cr=!1,sr=null,lr=null,dr=!1,bt=!1,pn=!1,mn=!1,Wo=!0,Vo=!1;const Zo="user-content-";let fr=!0,hr=!1,gt={},De=null;const pr=O({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Yo=null;const Ko=O({},["audio","video","img","source","image","track"]);let mr=null;const Xo=O({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),bn="http://www.w3.org/1998/Math/MathML",gn="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml";let yt=Fe,br=!1,gr=null;const mc=O({},[bn,gn,Fe],Ur),Jo=re(["mi","mo","mn","ms","mtext"]);let yr=O({},Jo);const Qo=re(["annotation-xml"]);let kr=O({},Qo);const bc=O({},["title","style","font","a","script"]);let $t=null;const gc=["application/xhtml+xml","text/html"],yc="text/html";let H=null,kt=null;const kc=n.createElement("form"),eu=function(m){return m instanceof RegExp||m instanceof Function},xr=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(kt&&kt===m)return;(!m||typeof m!="object")&&(m={}),m=se(m),$t=gc.indexOf(m.PARSER_MEDIA_TYPE)===-1?yc:m.PARSER_MEDIA_TYPE,H=$t==="application/xhtml+xml"?Ur:Vt,q=Ye(m,"ALLOWED_TAGS",Bo,{transform:H}),$=Ye(m,"ALLOWED_ATTR",qo,{transform:H}),gr=Ye(m,"ALLOWED_NAMESPACES",mc,{transform:Ur}),mr=Ye(m,"ADD_URI_SAFE_ATTR",Xo,{transform:H,base:Xo}),Yo=Ye(m,"ADD_DATA_URI_TAGS",Ko,{transform:H,base:Ko}),De=Ye(m,"FORBID_CONTENTS",pr,{transform:H}),qt=Ye(m,"FORBID_TAGS",se({}),{transform:H}),$o=Ye(m,"FORBID_ATTR",se({}),{transform:H}),gt=Q(m,"USE_PROFILES")?m.USE_PROFILES&&typeof m.USE_PROFILES=="object"?se(m.USE_PROFILES):m.USE_PROFILES:!1,Uo=m.ALLOW_ARIA_ATTR!==!1,ar=m.ALLOW_DATA_ATTR!==!1,jo=m.ALLOW_UNKNOWN_PROTOCOLS||!1,Go=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ge=m.SAFE_FOR_TEMPLATES||!1,We=m.SAFE_FOR_XML!==!1,ot=m.WHOLE_DOCUMENT||!1,bt=m.RETURN_DOM||!1,pn=m.RETURN_DOM_FRAGMENT||!1,mn=m.RETURN_TRUSTED_TYPE||!1,dr=m.FORCE_BODY||!1,Wo=m.SANITIZE_DOM!==!1,Vo=m.SANITIZE_NAMED_PROPS||!1,fr=m.KEEP_CONTENT!==!1,hr=m.IN_PLACE||!1,Ho=q1(m.ALLOWED_URI_REGEXP)?m.ALLOWED_URI_REGEXP:xi,yt=typeof m.NAMESPACE=="string"?m.NAMESPACE:Fe,yr=Q(m,"MATHML_TEXT_INTEGRATION_POINTS")&&m.MATHML_TEXT_INTEGRATION_POINTS&&typeof m.MATHML_TEXT_INTEGRATION_POINTS=="object"?se(m.MATHML_TEXT_INTEGRATION_POINTS):O({},Jo),kr=Q(m,"HTML_INTEGRATION_POINTS")&&m.HTML_INTEGRATION_POINTS&&typeof m.HTML_INTEGRATION_POINTS=="object"?se(m.HTML_INTEGRATION_POINTS):O({},Qo);const k=Q(m,"CUSTOM_ELEMENT_HANDLING")&&m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING=="object"?se(m.CUSTOM_ELEMENT_HANDLING):Et(null);if(U=Et(null),Q(k,"tagNameCheck")&&eu(k.tagNameCheck)&&(U.tagNameCheck=k.tagNameCheck),Q(k,"attributeNameCheck")&&eu(k.attributeNameCheck)&&(U.attributeNameCheck=k.attributeNameCheck),Q(k,"allowCustomizedBuiltInElements")&&typeof k.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=k.allowCustomizedBuiltInElements),oe(U),Ge&&(ar=!1),pn&&(bt=!0),gt&&(q=O({},gi),$=Et(null),gt.html===!0&&(O(q,bi),O($,yi)),gt.svg===!0&&(O(q,jr),O($,Vr),O($,An)),gt.svgFilters===!0&&(O(q,Gr),O($,Vr),O($,An)),gt.mathMl===!0&&(O(q,Wr),O($,ki),O($,An))),je.tagCheck=null,je.attributeCheck=null,Q(m,"ADD_TAGS")&&(typeof m.ADD_TAGS=="function"?je.tagCheck=m.ADD_TAGS:Xe(m.ADD_TAGS)&&(q===Bo&&(q=se(q)),O(q,m.ADD_TAGS,H))),Q(m,"ADD_ATTR")&&(typeof m.ADD_ATTR=="function"?je.attributeCheck=m.ADD_ATTR:Xe(m.ADD_ATTR)&&($===qo&&($=se($)),O($,m.ADD_ATTR,H))),Q(m,"ADD_URI_SAFE_ATTR")&&Xe(m.ADD_URI_SAFE_ATTR)&&O(mr,m.ADD_URI_SAFE_ATTR,H),Q(m,"FORBID_CONTENTS")&&Xe(m.FORBID_CONTENTS)&&(De===pr&&(De=se(De)),O(De,m.FORBID_CONTENTS,H)),Q(m,"ADD_FORBID_CONTENTS")&&Xe(m.ADD_FORBID_CONTENTS)&&(De===pr&&(De=se(De)),O(De,m.ADD_FORBID_CONTENTS,H)),fr&&(q["#text"]=!0),ot&&O(q,["html","head","body"]),q.table&&(O(q,["tbody"]),delete qt.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const v=A;A=m.TRUSTED_TYPES_POLICY;try{F=Ue("")}catch(S){throw A=v,S}}else m.TRUSTED_TYPES_POLICY===null?(A=void 0,F=""):(A===void 0&&(A=hn()),A&&typeof F=="string"&&(F=Ue("")));re&&re(m),kt=m},tu=O({},[...jr,...Gr,...$1]),nu=O({},[...Wr,...U1]),xc=function(m,k,v){return k.namespaceURI===Fe?m==="svg":k.namespaceURI===bn?m==="svg"&&(v==="annotation-xml"||yr[v]):!!tu[m]},Cc=function(m,k,v){return k.namespaceURI===Fe?m==="math":k.namespaceURI===gn?m==="math"&&kr[v]:!!nu[m]},wc=function(m,k,v){return k.namespaceURI===gn&&!kr[v]||k.namespaceURI===bn&&!yr[v]?!1:!nu[m]&&(bc[m]||!tu[m])},vc=function(m){let k=y(m);(!k||!k.tagName)&&(k={namespaceURI:yt,tagName:"template"});const v=Vt(m.tagName),S=Vt(k.tagName);return gr[m.namespaceURI]?m.namespaceURI===gn?xc(v,k,S):m.namespaceURI===bn?Cc(v,k,S):m.namespaceURI===Fe?wc(v,k,S):!!($t==="application/xhtml+xml"&&gr[m.namespaceURI]):!1},Ve=function(m){wt(t.removed,{element:m});try{y(m).removeChild(m)}catch{if(p(m),!y(m))throw st("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},yn=function(m){Cr(m);const k=g(m);if(k){const S=[];Ct(k,M=>{wt(S,M)}),Ct(S,M=>{try{p(M)}catch{}})}const v=C(m);if(v)for(let S=v.length-1;S>=0;--S){const M=v[S],L=M&&M.name;if(typeof L=="string")try{m.removeAttribute(L)}catch{}}},ut=function(m,k){try{wt(t.removed,{attribute:k.getAttributeNode(m),from:k})}catch{wt(t.removed,{attribute:null,from:k})}if(k.removeAttribute(m),m==="is")if(bt||pn)try{Ve(k)}catch{}else try{k.setAttribute(m,"")}catch{}},_c=function(m){const k=C(m);if(k)for(let v=k.length-1;v>=0;--v){const S=k[v],M=S&&S.name;if(!(typeof M!="string"||$[H(M)]))try{m.removeAttribute(M)}catch{}}},Cr=function(m){const k=[m];for(;k.length>0;){const v=k.pop();(w?w(v):v.nodeType)===ye.element&&_c(v);const M=g(v);if(M)for(let L=M.length-1;L>=0;--L)k.push(M[L])}},Ec=function(m){if(!We)return;const k=[m];for(;k.length>0;){const v=k.pop(),S=w?w(v):v.nodeType;if(S===ye.processingInstruction||S===ye.comment&&X(wi,v.data)){try{p(v)}catch{}continue}if(S===ye.element){const L=v,j=H(_?_(v):v.nodeName);try{L.hasAttribute&&L.hasAttribute("patchsrc")&&L.removeAttribute("patchsrc"),L.hasAttribute&&L.hasAttribute("for")&&j!=="label"&&j!=="output"&&L.removeAttribute("for")}catch{}}const M=g(v);if(M)for(let L=M.length-1;L>=0;--L)k.push(M[L])}},ru=function(m){let k=null,v=null;if(dr)m="<remove></remove>"+m;else{const L=fi(m,/^[\r\n\t ]+/);v=L&&L[0]}$t==="application/xhtml+xml"&&yt===Fe&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");const S=A?Ue(m):m;if(yt===Fe)try{k=new l().parseFromString(S,$t)}catch{}if(!k||!k.documentElement){k=Bt.createDocument(yt,"template",null);try{k.documentElement.innerHTML=br?F:S}catch{}}const M=k.body||k.documentElement;return m&&v&&M.insertBefore(n.createTextNode(v),M.childNodes[0]||null),yt===Fe?ic.call(k,ot?"html":"body")[0]:ot?k.documentElement:M},ou=function(m){return Po.call(m.ownerDocument||m,m,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},kn=function(m){return m=jt(m,cc," "),m=jt(m,sc," "),m=jt(m,lc," "),m},wr=function(m){var k;m.normalize();const v=Po.call(m.ownerDocument||m,m,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let S=v.nextNode();for(;S;)S.data=kn(S.data),S=v.nextNode();const M=(k=m.querySelectorAll)===null||k===void 0?void 0:k.call(m,"template");M&&Ct(M,L=>{xt(L.content)&&wr(L.content)})},xn=function(m){const k=_?_(m):null;return typeof k!="string"||H(k)!=="form"?!1:typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||m.attributes!==C(m)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function"||m.nodeType!==w(m)||m.childNodes!==g(m)},xt=function(m){if(!w||typeof m!="object"||m===null)return!1;try{return w(m)===ye.documentFragment}catch{return!1}},Ut=function(m){if(!w||typeof m!="object"||m===null)return!1;try{return typeof w(m)=="number"}catch{return!1}};function Me(E,m,k){E.length!==0&&Ct(E,v=>{v.call(t,m,k,kt)})}const Ac=function(m,k){return!!(We&&m.hasChildNodes()&&!Ut(m.firstElementChild)&&X(Ci,m.textContent)&&X(Ci,m.innerHTML)||We&&m.namespaceURI===Fe&&k==="style"&&Ut(m.firstElementChild)||m.nodeType===ye.processingInstruction||We&&m.nodeType===ye.comment&&X(wi,m.data))},Sc=function(m,k){if(!qt[k]&&au(k)&&(U.tagNameCheck instanceof RegExp&&X(U.tagNameCheck,k)||U.tagNameCheck instanceof Function&&U.tagNameCheck(k)))return!1;if(fr&&!De[k]){const v=y(m),S=g(m);if(S&&v){const M=S.length;for(let L=M-1;L>=0;--L){const j=hr?S[L]:h(S[L],!0);v.insertBefore(j,b(m))}}}return Ve(m),!0},uu=function(m,k){if(Me(B.beforeSanitizeElements,m,null),m!==k&&y(m)===null)return!0;if(xn(m))return Ve(m),!0;const v=H(_?_(m):m.nodeName);if(Me(B.uponSanitizeElement,m,{tagName:v,allowedTags:q}),m!==k&&y(m)===null)return!0;if(Ac(m,v))return Ve(m),!0;if(qt[v]||!(je.tagCheck instanceof Function&&je.tagCheck(v))&&!q[v]){const M=Sc(m,v);return M===!1&&Me(B.afterSanitizeElements,m,null),M}if((w?w(m):m.nodeType)===ye.element&&!vc(m)||(v==="noscript"||v==="noembed"||v==="noframes")&&X(Q1,m.innerHTML))return Ve(m),!0;if(Ge&&m.nodeType===ye.text){const M=kn(m.textContent);m.textContent!==M&&(wt(t.removed,{element:m.cloneNode()}),m.textContent=M)}return Me(B.afterSanitizeElements,m,null),!1},iu=function(m,k,v){if($o[k]||We&&k==="patchsrc"||We&&k==="for"&&m!=="label"&&m!=="output"||Wo&&(k==="id"||k==="name")&&(v in n||v in kc))return!1;const S=$[k]||je.attributeCheck instanceof Function&&je.attributeCheck(k,m);if(!(ar&&X(dc,k))){if(!(Uo&&X(fc,k))){if(S){if(!mr[k]){if(!X(Ho,jt(v,zo,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&m!=="script"&&hi(v,"data:")===0&&Yo[m])){if(!(jo&&!X(hc,jt(v,zo,"")))){if(v)return!1}}}}}else if(!(au(m)&&(U.tagNameCheck instanceof RegExp&&X(U.tagNameCheck,m)||U.tagNameCheck instanceof Function&&U.tagNameCheck(m))&&(U.attributeNameCheck instanceof RegExp&&X(U.attributeNameCheck,k)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(k,m))||k==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&X(U.tagNameCheck,v)||U.tagNameCheck instanceof Function&&U.tagNameCheck(v))))return!1}}return!0},Tc=O({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),au=function(m){return!Tc[Vt(m)]&&X(pc,m)},Dc=function(m,k,v,S){if(A&&typeof s=="object"&&typeof s.getAttributeType=="function"&&!v)switch(s.getAttributeType(m,k)){case"TrustedHTML":return Ue(S);case"TrustedScriptURL":return ir(S)}return S},Fc=function(m,k,v,S){try{v?m.setAttributeNS(v,k,S):m.setAttribute(k,S),xn(m)?Ve(m):di(t.removed)}catch{ut(k,m)}},cu=function(m){Me(B.beforeSanitizeAttributes,m,null);const k=m.attributes;if(!k||xn(m))return;const v={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$,forceKeepAttr:void 0};let S=k.length;const M=H(m.nodeName);for(;S--;){const L=k[S],j=L.name,ue=L.namespaceURI,ve=L.value,de=H(j),_e=ve;let ce=j==="value"?_e:N1(_e);if(v.attrName=de,v.attrValue=ce,v.keepAttr=!0,v.forceKeepAttr=void 0,Me(B.uponSanitizeAttribute,m,v),ce=v.attrValue,Vo&&(de==="id"||de==="name")&&hi(ce,Zo)!==0&&(ut(j,m),ce=Zo+ce),We&&X(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ce)){ut(j,m);continue}if(de==="attributename"&&fi(ce,"href")){ut(j,m);continue}if(!v.forceKeepAttr){if(!v.keepAttr){ut(j,m);continue}if(!Go&&X(em,ce)){ut(j,m);continue}if(Ge&&(ce=kn(ce)),!iu(M,de,ce)){ut(j,m);continue}ce=Dc(M,de,ue,ce),ce!==_e&&Fc(m,j,ue,ce)}}Me(B.afterSanitizeAttributes,m,null)},Cn=function(m){let k=null;const v=ou(m);for(Me(B.beforeSanitizeShadowDOM,m,null);k=v.nextNode();)if(Me(B.uponSanitizeShadowNode,k,null),uu(k,m),cu(k),xt(k.content)&&Cn(k.content),(w?w(k):k.nodeType)===ye.element){const M=x(k);xt(M)&&(vr(M),Cn(M))}Me(B.afterSanitizeShadowDOM,m,null)},vr=function(m){const k=[{node:m,shadow:null}];for(;k.length>0;){const v=k.pop();if(v.shadow){Cn(v.shadow);continue}const S=v.node,L=(w?w(S):S.nodeType)===ye.element,j=g(S);if(j)for(let ue=j.length-1;ue>=0;--ue)k.push({node:j[ue],shadow:null});if(L){const ue=_?_(S):null;if(typeof ue=="string"&&H(ue)==="template"){const ve=S.content;xt(ve)&&k.push({node:ve,shadow:null})}}if(L){const ue=x(S);xt(ue)&&k.push({node:null,shadow:ue},{node:ue,shadow:null})}}};return t.sanitize=function(E){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,v=null,S=null,M=null;if(br=!E,br&&(E="<!-->"),typeof E!="string"&&!Ut(E)&&(E=B1(E),typeof E!="string"))throw st("dirty is not a string, aborting");if(!t.isSupported)return E;cr?(q=sr,$=lr):xr(m),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(q=se(q)),B.uponSanitizeAttribute.length>0&&($=se($)),t.removed=[];const L=hr&&typeof E!="string"&&Ut(E);if(L){Ec(E);const de=_?_(E):E.nodeName;if(typeof de=="string"){const _e=H(de);if(!q[_e]||qt[_e])throw yn(E),st("root node is forbidden and cannot be sanitized in-place")}if(xn(E))throw yn(E),st("root node is clobbered and cannot be sanitized in-place");try{vr(E)}catch(_e){throw yn(E),_e}}else if(Ut(E))k=ru("<!---->"),v=k.ownerDocument.importNode(E,!0),v.nodeType===ye.element&&v.nodeName==="BODY"||v.nodeName==="HTML"?k=v:k.appendChild(v),vr(v);else{if(!bt&&!Ge&&!ot&&E.indexOf("<")===-1)return A&&mn?Ue(E):E;if(k=ru(E),!k)return bt?null:mn?F:""}k&&dr&&Ve(k.firstChild);const j=L?E:k,ue=ou(j);try{for(;S=ue.nextNode();)uu(S,j),cu(S),xt(S.content)&&Cn(S.content)}catch(de){throw L&&(yn(E),Ct(t.removed,_e=>{_e.element&&Cr(_e.element)})),de}if(L)return Ct(t.removed,de=>{de.element&&Cr(de.element)}),Ge&&wr(E),E;if(bt){if(Ge&&wr(k),pn)for(M=uc.call(k.ownerDocument);k.firstChild;)M.appendChild(k.firstChild);else M=k;return($.shadowroot||$.shadowrootmode)&&(M=ac.call(r,M,!0)),M}let ve=ot?k.outerHTML:k.innerHTML;return ot&&q["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&X(X1,k.ownerDocument.doctype.name)&&(ve="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+ve),Ge&&(ve=kn(ve)),A&&mn?Ue(ve):ve},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xr(E),cr=!0,sr=q,lr=$},t.clearConfig=function(){kt=null,cr=!1,sr=null,lr=null,A=N,F=""},t.isValidAttribute=function(E,m,k){kt||xr({});const v=H(E),S=H(m);return iu(v,S,k)},t.addHook=function(E,m){typeof m=="function"&&Q(B,E)&&wt(B[E],m)},t.removeHook=function(E,m){if(Q(B,E)){if(m!==void 0){const k=L1(B[E],m);return k===-1?void 0:R1(B[E],k,1)[0]}return di(B[E])}},t.removeHooks=function(E){Q(B,E)&&(B[E]=[])},t.removeAllHooks=function(){B=vi()},t}var rm=tc();const nc=V.StateEffect.define();class Un extends D.WidgetType{constructor(t,n,r,o,u=""){super(),this.doc=t,this.from=n,this.to=r,this.render=o,this.referenceContext=u}get source(){return this.doc.sliceString(this.from,this.to)}toDOM(t){const n=document.createElement("div");n.className="cm-md-syntaxHiddenTable";const r=n.attachShadow({mode:"open"}),o=document.createElement("style"),u=()=>{o.textContent=gh(I.MarkEdit.editorConfig?.theme??"github",t.state.facet(D.EditorView.darkTheme)),t.requestMeasure()};u(),window.addEventListener("editor-colors-changed",u),Zr.set(n,()=>window.removeEventListener("editor-colors-changed",u));const a=document.createElement("style");a.textContent=`
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;const i=document.createElement("div");i.className="markdown-body source",i.textContent=this.source,r.append(o,a,i);const c=l=>{l.button!==0||l.shiftKey||l.altKey||l.metaKey||l.ctrlKey||(l.preventDefault(),l.stopPropagation(),t.dispatch({selection:V.EditorSelection.cursor(t.posAtDOM(n)),scrollIntoView:!1}),t.focus())};n.addEventListener("mousedown",c),n.addEventListener("click",l=>l.preventDefault()),r.addEventListener("load",()=>t.requestMeasure(),!0),r.addEventListener("error",()=>t.requestMeasure(),!0);const d=()=>{if(n.isConnected){const l=t.posAtDOM(n);t.dispatch({effects:nc.of({doc:t.state.doc,from:l,to:l+this.source.length})})}};return Promise.all([this.render(),""]).then(([l,s])=>{if(!n.isConnected)return;const f=l.find(b=>b.fromLine===this.doc.lineAt(this.from).number&&b.toLine===this.doc.lineAt(this.to).number);if(f===void 0){d();return}const p=rm.sanitize(f.html,{RETURN_DOM_FRAGMENT:!0,FORBID_TAGS:["style","link","meta","form","input","button","select","textarea","iframe","object","embed","audio","video"],FORBID_ATTR:["tabindex","autofocus","contenteditable"],SANITIZE_NAMED_PROPS:!0}).querySelector("table");if(p===null){d();return}p.querySelectorAll("a").forEach(b=>b.setAttribute("tabindex","-1")),p.querySelectorAll("img").forEach(b=>{const g=b.getAttribute("src");g!==null&&(b.src=Fo(g))}),a.textContent+=s,i.classList.remove("source"),i.replaceChildren(p),t.requestMeasure()}).catch(d),n}destroy(t){Zr.get(t)?.(),Zr.delete(t)}eq(t){return t.source===this.source&&t.referenceContext===this.referenceContext}ignoreEvent(){return!1}}const Zr=new WeakMap,No=V.Facet.define({combine:e=>e[e.length-1]??Ea}),om=V.StateField.define({create:e=>_i(e),update(e,t){if(t.docChanged||t.reconfigured||pe.syntaxTree(t.startState)!==pe.syntaxTree(t.state)){const r=[];for(const o=e.all.iter();o.value!==null;o.next())if(o.value.spec.widget instanceof Un){const u=t.changes.mapPos(o.from,1),a=t.changes.mapPos(o.to,-1);u<a&&r.push(o.value.range(u,a))}return _i(t.state,D.Decoration.set(r,!0))}let n=e.all;for(const r of t.effects)r.is(nc)&&r.value.doc===t.state.doc&&(n=n.update({filter:(o,u)=>o!==r.value.from||u!==r.value.to}));return t.selection!==void 0||t.effects.length>0?{all:n,visible:rc(n,t.state)}:e},provide:e=>D.EditorView.decorations.from(e,t=>t.visible)});function _i(e,t=D.Decoration.none){const n=um(e,t);return{all:n,visible:rc(n,e)}}function um(e,t){const n=[],r=pe.syntaxTree(e),o=e.facet(No),u=[];r.iterate({enter:l=>{if(l.name==="Document")return;const s=e.sliceDoc(e.doc.lineAt(l.from).from,e.doc.lineAt(l.to).to);return(l.name!=="Paragraph"&&l.name!=="Table"||s.includes("["))&&u.push(s),!1}});const a=e.sliceDoc(r.length);u.push(a);let i;const c=()=>i??=wh(e.doc.toString()),d=JSON.stringify(u);return r.iterate({enter:l=>{let s;if(l.name==="Table"&&o.includes("table")){for(let b=l.node.parent;b!==null;b=b.parent)if(b.name!=="Document")return!1;if(r.length<e.doc.length&&l.to>=r.length)return!1;const f=e.doc.lineAt(l.from).from,h=e.doc.lineAt(l.to).to;let p=new Un(e.doc,f,h,c,d);t.between(f,h,(b,g,y)=>{const x=y.spec.widget;b===f&&g===h&&x instanceof Un&&p.eq(x)&&(p=x)}),s=D.Decoration.replace({block:!0,widget:p}).range(f,h)}if(s!==void 0)return n.push(s),!1}}),D.Decoration.set(n,!0)}function rc(e,t){return e.size===0?e:e.update({filter:(n,r,o)=>{const u=o.spec.widget instanceof Un;let a=!1;if(u&&pe.foldedRanges(t).between(n,r,()=>{a=!0}),a||be(t,n,r))return!1;if(u&&r<t.doc.length){const i=t.doc.lineAt(r+1);if(i.text.trim()===""&&t.selection.ranges.some(c=>c.empty&&c.goalColumn===void 0&&c.head>=i.from&&c.head<=i.to))return!1}return!0}})}const Ei=D.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence"});function im(e,t){const n=[];if(e.name!=="FencedCode")return n;const r=t.state,o=e.node.firstChild,u=e.node.lastChild;if(o?.name!=="CodeMark"||u?.name!=="CodeMark"||o.from===u.from||!r.sliceDoc(o.from,o.to).startsWith("```"))return n;const a=r.doc.lineAt(o.from),i=r.doc.lineAt(u.from),c=e.node.getChild("CodeInfo");let d=!1;if(pe.foldedRanges(r).between(a.to,i.to,(s,f)=>{if(s>=a.to&&f>=i.to)return d=!0,!1}),d)return n;const l=be(r,e.from,e.to);for(const{from:s,to:f}of t.visibleRanges){const h=Math.max(a.number,r.doc.lineAt(s).number),p=Math.min(i.number,r.doc.lineAt(f).number);for(let b=h;b<=p;b++){const g=r.doc.line(b),y=["cm-md-syntaxHiddenCodeBlock"];b===a.number&&y.push("cm-md-syntaxHiddenCodeStart"),b===i.number&&y.push("cm-md-syntaxHiddenCodeEnd");const x=b===a.number&&!l&&c!==null?{"data-code-language":r.sliceDoc(c.from,c.to).trim().split(/\s+/)[0]}:void 0;n.push(D.Decoration.line({class:y.join(" "),attributes:x}).range(g.from))}}return l||(n.push(Ei.range(o.from,a.to)),n.push(Ei.range(u.from,i.to))),n}function am(e,t){const n=e.node.parent;if(e.name!=="HeaderMark"||n?.name.startsWith("ATXHeading")!==!0||n.firstChild?.from!==e.from)return;const o=sm(t,e.to,n.to);if(!(!lm(t,o,n.to)||be(t,n.from,n.to)))return{from:e.from,to:o}}function cm(e,t){const n=e.node.parent;if(e.name!=="HeaderMark"||n?.name.startsWith("SetextHeading")!==!0)return;const r=t.doc.lineAt(e.from);if(!be(t,n.from,n.to))return r.from}function sm(e,t,n){return t+(/^ */.exec(e.sliceDoc(t,n))?.[0].length??0)}function lm(e,t,n){return/\S/.test(e.sliceDoc(t,n))}function dm(e,t){if(e.name!=="HorizontalRule"||e.node.parent?.name!=="Document")return;const n=t.doc.lineAt(e.from);if(!be(t,n.from,n.to))return D.Decoration.replace({widget:new fm(pe.highlightingFor(t,[Ti.tags.contentSeparator])??"")}).range(n.from,n.to)}class fm extends D.WidgetType{constructor(t){super(),this.highlightClass=t}eq(t){return t.highlightClass===this.highlightClass}toDOM(){const t=document.createElement("span");return t.className=["cm-md-syntaxHiddenHorizontalRule",this.highlightClass].filter(Boolean).join(" "),t.setAttribute("role","separator"),t.setAttribute("aria-orientation","horizontal"),t}}const hm=new Map([["Emphasis","EmphasisMark"],["StrongEmphasis","EmphasisMark"],["Strikethrough","StrikethroughMark"],["InlineCode","CodeMark"]]),pm=D.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),Oo="cm-md-syntaxHiddenInlineCodeBoundary",mm=D.Decoration.mark({class:`${Oo} cm-md-syntaxHiddenInlineCodeStart`}),bm=D.Decoration.mark({class:`${Oo} cm-md-syntaxHiddenInlineCodeEnd`}),gm=D.Decoration.mark({class:`${Oo} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`});function ym(e,t){const n=e.node.parent;if(n===null||hm.get(n.name)!==e.name||be(t,n.from,n.to))return[];const r=[pm.range(e.from,e.to)];if(n.name!=="InlineCode"||e.from!==n.from)return r;const o=n.firstChild?.to,u=n.lastChild?.from;return o===void 0||u===void 0||o>=u||(u-o===1?r.push(gm.range(o,u)):(r.push(mm.range(o,o+1)),r.push(bm.range(u-1,u)))),r}const km=D.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTable":{boxSizing:"border-box",width:"100%",padding:"0.5em 6px",overflow:"hidden",contain:"content",cursor:"text"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeBlock":{"--code-border":"color-mix(in srgb, currentColor 18%, transparent)",boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border)"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart":{position:"relative",boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 1px var(--code-border)",borderTopLeftRadius:"6px",borderTopRightRadius:"6px"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart[data-code-language]::after":{content:"attr(data-code-language)",position:"absolute",top:"0.5em",right:"0.5em",maxWidth:"calc(100% - 1em)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"0.8em",lineHeight:"1",opacity:"0.55",pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeEnd":{boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 -1px var(--code-border)",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:"0px !important",fontVariantLigatures:"none !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:"inherit !important",lineHeight:"inherit !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Menlo, monospace",fontSize:"0.9em",pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:"0 !important"},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:"0",lineHeight:"0",overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px",paddingInlineStart:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:"3px",borderBottomRightRadius:"3px",paddingInlineEnd:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:"inline-flex",alignItems:"center",boxSizing:"border-box",height:"1em",lineHeight:"1em",verticalAlign:"middle",gap:"0.4em",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, sans-serif",fontStyle:"normal",fontWeight:"500",textIndent:"0"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#0969da"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#1a7f37"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#8250df"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#9a6700"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#d1242f"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#2f81f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#3fb950"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#a371f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#d29922"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#f85149"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:"inline-block",width:"1em",height:"1em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:"block",width:"100%",height:"100%",fill:"currentColor"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:"inline-block",appearance:"none",width:"0.9em",height:"0.9em",padding:"0",border:"0",background:"transparent",font:"inherit",marginInlineStart:"0.25em",verticalAlign:"-0.1em",cursor:"pointer"},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:"inherit"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:"block",width:"100%",height:"100%"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:"inline-block",width:"100%",borderTop:"2px solid currentColor",verticalAlign:"middle",opacity:"0.35"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:"inline-block",maxWidth:"100%",height:"auto",verticalAlign:"middle"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:"0"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:"block",maxWidth:"100%",height:"auto",marginInline:"auto"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:"pre-wrap",textAlign:"start"}}),Sn=D.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),xm=D.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark"}),Cm=D.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark"}),wm=D.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark"}),vm=D.Decoration.line({class:"cm-md-syntaxHiddenSetextUnderline"}),Ai=D.Decoration.mark({class:"cm-md-syntaxHiddenLinkLabel"}),_m=D.Decoration.mark({class:"cm-md-syntaxHiddenImageLabel"}),Em=[D.EditorView.editorAttributes.of({class:"cm-md-syntaxHiddenMode"}),Np,Op,D.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=Si(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured))&&(this.decorations=Si(e.view))}},{decorations:e=>e.decorations}),Gp,e1,i1,om,km];function oc(e=Ea){return[No.of(e),Em]}const Am=oc();function Si(e){const t=[],n=new Set,r=new Set,o=e.state.facet(No).includes("image"),u=p1(e.state);for(const{from:a,to:i}of e.visibleRanges)pe.syntaxTree(e.state).iterate({from:a,to:i,enter:c=>{c.name==="FencedCode"&&!r.has(c.from)&&(r.add(c.from),t.push(...im(c,e)));const d=Bp(c,e.state);d!==void 0&&!n.has(d.from)&&(n.add(d.from),t.push(D.Decoration.replace({widget:new jp(d.type,d.title)}).range(d.from,d.to)));const l=qp(c,e.state);l!==void 0&&t.push(xm.range(l.from,l.to));const s=Ka(c,e.state);if(s!==void 0){const C=s.task?wm:Cm;t.push(C.range(s.from,s.to))}const f=f1(c,e.state,u);if(f!==void 0){const C=e.state.sliceDoc(f.label.from,f.label.to);if(o&&f.image&&f.destination!=="")t.push(D.Decoration.replace({widget:new _1(f.destination,C)}).range(c.from,c.to));else{f.hidden.forEach(_=>t.push(Sn.range(_.from,_.to)));const w=f.image?_m:Ai;t.push(w.range(f.label.from,f.label.to)),t.push(D.Decoration.widget({widget:new $r(f.image?"image":"link",e.state,f.destination,C,f.highlightTags),side:-1}).range(f.label.to))}}const h=Ro(c,e.state);for(const C of h)be(e.state,C.from,C.to)||(t.push(Sn.range(C.from+1,C.from+2)),t.push(Ai.range(C.from,C.to)),t.push(D.Decoration.widget({widget:new $r("footnote",e.state,C.label,C.label,C.highlightTags),side:-1}).range(C.to)));const p=h1(c,e.state);p!==void 0&&(p.hidden.forEach(C=>t.push(Sn.range(C.from,C.to))),t.push(D.Decoration.widget({widget:new $r("footnoteBack",e.state,p.label,p.label,p.highlightTags),side:-1}).range(p.suffixPosition)),p.suffix!==""&&t.push(D.Decoration.widget({widget:new v1(p.suffix),side:1}).range(p.suffixPosition)));const b=ym(c,e.state);t.push(...b);const g=dm(c,e.state);g!==void 0&&t.push(g);const y=am(c,e.state);y!==void 0&&t.push(Sn.range(y.from,y.to));const x=cm(c,e.state);x!==void 0&&t.push(vm.range(x))}});return D.Decoration.set(t,!0)}const Sm=Object.freeze(Object.defineProperty({__proto__:null,createHiddenSyntaxExtension:oc,hiddenSyntaxExtension:Am},Symbol.toStringTag,{value:"Module"}));
