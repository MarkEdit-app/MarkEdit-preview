"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const t={MarkEdit:e.MarkEdit??Object.freeze({})},n={of:()=>({})},r=()=>({range:()=>({})});class o{}const u={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:n,mouseSelectionStyle:n,editorAttributes:n,baseTheme:()=>({})},Decoration:{mark:r,line:r},ViewPlugin:{fromClass:()=>({})},WidgetType:o,RectangleMarker:o,layer:()=>({})},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}},Facet:{define:()=>n},StateField:{define:()=>({})}}};e.require=a=>u[a]??{}}})();const T=require("@codemirror/view"),M=require("markedit-api"),W=require("@codemirror/state"),fe=require("@codemirror/language"),ce=require("@lezer/highlight"),qt=require("@lezer/lr");require("@lezer/common");function Gi(){typeof M.MarkEdit.playSystemBeep=="function"&&M.MarkEdit.playSystemBeep()}function oc(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function Kt(e,t=!0){const n=document.createElement("style");return n.textContent=e,document.head.appendChild(n),n.disabled=!t,n}function ku(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function uc(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function ic(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function Dt(e){const t=parseInt(e.dataset.lineFrom??"0"),n=parseInt(e.dataset.lineTo??"0");return{from:t,to:n}}function ro(e,t){let n=0,r=t;for(;r!==null&&r!==e;)n+=r.offsetTop,r=r.offsetParent;return n}function Fn(e,t,n,r=!0){const o=ro(e,t)+t.offsetHeight*n;In(e,o,r)}function In(e,t,n=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:t<=r?0:t,behavior:n?"smooth":"instant"})}function ac(e){const t=document.createRange();t.selectNodeContents(e);const n=getSelection();n?.removeAllRanges(),n?.addRange(t)}function sc(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function Tt(e,t){return e.endsWith("/")?e+t:e+"/"+t}async function cc(e){const t=await M.MarkEdit.getFileContent(e);if(t===void 0)return{};try{const n=JSON.parse(t);return typeof n=="object"&&n!==null?n:{}}catch(n){return console.error(`Failed to parse JSON from ${e}:`,n),{}}}function Wi(e,t){return navigator.clipboard.write([e]).catch(n=>{console.error("Failed to copy:",n),M.MarkEdit.showAlert(t)})}function lc(e){const t=document.createElement("div");t.style.cssText="position: fixed; left: -10000px; top: 0;",t.innerHTML=e,document.body.appendChild(t);try{return t.innerText}finally{t.remove()}}const xu={};function dc(e){let t=xu[e];if(t)return t;t=xu[e]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);t.push(r)}for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);t[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return t}function Pt(e,t){typeof t!="string"&&(t=Pt.defaultChars);const n=dc(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let o="";for(let u=0,a=r.length;u<a;u+=3){const i=parseInt(r.slice(u+1,u+3),16);if(i<128){o+=n[i];continue}if((i&224)===192&&u+3<a){const s=parseInt(r.slice(u+4,u+6),16);if((s&192)===128){const l=i<<6&1984|s&63;l<128?o+="��":o+=String.fromCharCode(l),u+=3;continue}}if((i&240)===224&&u+6<a){const s=parseInt(r.slice(u+4,u+6),16),l=parseInt(r.slice(u+7,u+9),16);if((s&192)===128&&(l&192)===128){const d=i<<12&61440|s<<6&4032|l&63;d<2048||d>=55296&&d<=57343?o+="���":o+=String.fromCharCode(d),u+=6;continue}}if((i&248)===240&&u+9<a){const s=parseInt(r.slice(u+4,u+6),16),l=parseInt(r.slice(u+7,u+9),16),d=parseInt(r.slice(u+10,u+12),16);if((s&192)===128&&(l&192)===128&&(d&192)===128){let c=i<<18&1835008|s<<12&258048|l<<6&4032|d&63;c<65536||c>1114111?o+="����":(c-=65536,o+=String.fromCharCode(55296+(c>>10),56320+(c&1023))),u+=9;continue}}o+="�"}return o})}Pt.defaultChars=";/?:@&=+$,#";Pt.componentChars="";const wu={};function fc(e){let t=wu[e];if(t)return t;t=wu[e]=[];for(let n=0;n<128;n++){const r=String.fromCharCode(n);/^[0-9a-z]$/i.test(r)?t.push(r):t.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function fn(e,t,n){typeof t!="string"&&(n=t,t=fn.defaultChars),typeof n>"u"&&(n=!0);const r=fc(t);let o="";for(let u=0,a=e.length;u<a;u++){const i=e.charCodeAt(u);if(n&&i===37&&u+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(u+1,u+3))){o+=e.slice(u,u+3),u+=2;continue}if(i<128){o+=r[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&u+1<a){const s=e.charCodeAt(u+1);if(s>=56320&&s<=57343){o+=encodeURIComponent(e[u]+e[u+1]),u++;continue}}o+="%EF%BF%BD";continue}o+=encodeURIComponent(e[u])}return o}fn.defaultChars=";/?:@&=+$,-_.!~*'()#";fn.componentChars="-_.!~*'()";function yo(e){let t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||"",t}function Nn(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const hc=/^([a-z0-9.+-]+:)/i,pc=/:[0-9]*$/,mc=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,bc=["<",">",'"',"`"," ","\r",`
`,"	"],gc=["{","}","|","\\","^","`"].concat(bc),yc=["'"].concat(gc),Cu=["%","/","?",";","#"].concat(yc),vu=["/","?","#"],kc=255,_u=/^[+a-z0-9A-Z_-]{0,63}$/,xc=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Su={javascript:!0,"javascript:":!0},Eu={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function ko(e,t){if(e&&e instanceof Nn)return e;const n=new Nn;return n.parse(e,t),n}Nn.prototype.parse=function(e,t){let n,r,o,u=e;if(u=u.trim(),!t&&e.split("#").length===1){const l=mc.exec(u);if(l)return this.pathname=l[1],l[2]&&(this.search=l[2]),this}let a=hc.exec(u);if(a&&(a=a[0],n=a.toLowerCase(),this.protocol=a,u=u.substr(a.length)),(t||a||u.match(/^\/\/[^@\/]+@[^@\/]+/))&&(o=u.substr(0,2)==="//",o&&!(a&&Su[a])&&(u=u.substr(2),this.slashes=!0)),!Su[a]&&(o||a&&!Eu[a])){let l=-1;for(let p=0;p<vu.length;p++)r=u.indexOf(vu[p]),r!==-1&&(l===-1||r<l)&&(l=r);let d,c;l===-1?c=u.lastIndexOf("@"):c=u.lastIndexOf("@",l),c!==-1&&(d=u.slice(0,c),u=u.slice(c+1),this.auth=d),l=-1;for(let p=0;p<Cu.length;p++)r=u.indexOf(Cu[p]),r!==-1&&(l===-1||r<l)&&(l=r);l===-1&&(l=u.length),u[l-1]===":"&&l--;const f=u.slice(0,l);u=u.slice(l),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const p=this.hostname.split(/\./);for(let b=0,g=p.length;b<g;b++){const y=p[b];if(y&&!y.match(_u)){let k="";for(let C=0,w=y.length;C<w;C++)y.charCodeAt(C)>127?k+="x":k+=y[C];if(!k.match(_u)){const C=p.slice(0,b),w=p.slice(b+1),v=y.match(xc);v&&(C.push(v[1]),w.unshift(v[2])),w.length&&(u=w.join(".")+u),this.hostname=C.join(".");break}}}}this.hostname.length>kc&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=u.indexOf("#");i!==-1&&(this.hash=u.substr(i),u=u.slice(0,i));const s=u.indexOf("?");return s!==-1&&(this.search=u.substr(s),u=u.slice(0,s)),u&&(this.pathname=u),Eu[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Nn.prototype.parseHost=function(e){let t=pc.exec(e);t&&(t=t[0],t!==":"&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};const wc=Object.freeze(Object.defineProperty({__proto__:null,decode:Pt,encode:fn,format:yo,parse:ko},Symbol.toStringTag,{value:"Module"})),Xi=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Yi=/[\0-\x1F\x7F-\x9F]/,Cc=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,xo=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Zi=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Qi=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,vc=Object.freeze(Object.defineProperty({__proto__:null,Any:Xi,Cc:Yi,Cf:Cc,P:xo,S:Zi,Z:Qi},Symbol.toStringTag,{value:"Module"})),_c=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Sc=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Mr;const Ec=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ac=(Mr=String.fromCodePoint)!==null&&Mr!==void 0?Mr:function(e){let t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t};function Tc(e){var t;return e>=55296&&e<=57343||e>1114111?65533:(t=Ec.get(e))!==null&&t!==void 0?t:e}var te;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(te||(te={}));const Oc=32;var Je;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Je||(Je={}));function oo(e){return e>=te.ZERO&&e<=te.NINE}function Dc(e){return e>=te.UPPER_A&&e<=te.UPPER_F||e>=te.LOWER_A&&e<=te.LOWER_F}function Mc(e){return e>=te.UPPER_A&&e<=te.UPPER_Z||e>=te.LOWER_A&&e<=te.LOWER_Z||oo(e)}function Fc(e){return e===te.EQUALS||Mc(e)}var K;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(K||(K={}));var qe;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(qe||(qe={}));class Ic{constructor(t,n,r){this.decodeTree=t,this.emitCodePoint=n,this.errors=r,this.state=K.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=qe.Strict}startEntity(t){this.decodeMode=t,this.state=K.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(t,n){switch(this.state){case K.EntityStart:return t.charCodeAt(n)===te.NUM?(this.state=K.NumericStart,this.consumed+=1,this.stateNumericStart(t,n+1)):(this.state=K.NamedEntity,this.stateNamedEntity(t,n));case K.NumericStart:return this.stateNumericStart(t,n);case K.NumericDecimal:return this.stateNumericDecimal(t,n);case K.NumericHex:return this.stateNumericHex(t,n);case K.NamedEntity:return this.stateNamedEntity(t,n)}}stateNumericStart(t,n){return n>=t.length?-1:(t.charCodeAt(n)|Oc)===te.LOWER_X?(this.state=K.NumericHex,this.consumed+=1,this.stateNumericHex(t,n+1)):(this.state=K.NumericDecimal,this.stateNumericDecimal(t,n))}addToNumericResult(t,n,r,o){if(n!==r){const u=r-n;this.result=this.result*Math.pow(o,u)+parseInt(t.substr(n,u),o),this.consumed+=u}}stateNumericHex(t,n){const r=n;for(;n<t.length;){const o=t.charCodeAt(n);if(oo(o)||Dc(o))n+=1;else return this.addToNumericResult(t,r,n,16),this.emitNumericEntity(o,3)}return this.addToNumericResult(t,r,n,16),-1}stateNumericDecimal(t,n){const r=n;for(;n<t.length;){const o=t.charCodeAt(n);if(oo(o))n+=1;else return this.addToNumericResult(t,r,n,10),this.emitNumericEntity(o,2)}return this.addToNumericResult(t,r,n,10),-1}emitNumericEntity(t,n){var r;if(this.consumed<=n)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(t===te.SEMI)this.consumed+=1;else if(this.decodeMode===qe.Strict)return 0;return this.emitCodePoint(Tc(this.result),this.consumed),this.errors&&(t!==te.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(t,n){const{decodeTree:r}=this;let o=r[this.treeIndex],u=(o&Je.VALUE_LENGTH)>>14;for(;n<t.length;n++,this.excess++){const a=t.charCodeAt(n);if(this.treeIndex=Pc(r,o,this.treeIndex+Math.max(1,u),a),this.treeIndex<0)return this.result===0||this.decodeMode===qe.Attribute&&(u===0||Fc(a))?0:this.emitNotTerminatedNamedEntity();if(o=r[this.treeIndex],u=(o&Je.VALUE_LENGTH)>>14,u!==0){if(a===te.SEMI)return this.emitNamedEntityData(this.treeIndex,u,this.consumed+this.excess);this.decodeMode!==qe.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var t;const{result:n,decodeTree:r}=this,o=(r[n]&Je.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,o,this.consumed),(t=this.errors)===null||t===void 0||t.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(t,n,r){const{decodeTree:o}=this;return this.emitCodePoint(n===1?o[t]&~Je.VALUE_LENGTH:o[t+1],r),n===3&&this.emitCodePoint(o[t+2],r),r}end(){var t;switch(this.state){case K.NamedEntity:return this.result!==0&&(this.decodeMode!==qe.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case K.NumericDecimal:return this.emitNumericEntity(0,2);case K.NumericHex:return this.emitNumericEntity(0,3);case K.NumericStart:return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case K.EntityStart:return 0}}}function Ki(e){let t="";const n=new Ic(e,r=>t+=Ac(r));return function(o,u){let a=0,i=0;for(;(i=o.indexOf("&",i))>=0;){t+=o.slice(a,i),n.startEntity(u);const l=n.write(o,i+1);if(l<0){a=i+n.end();break}a=i+l,i=l===0?a+1:a}const s=t+o.slice(a);return t="",s}}function Pc(e,t,n,r){const o=(t&Je.BRANCH_LENGTH)>>7,u=t&Je.JUMP_TABLE;if(o===0)return u!==0&&r===u?n:-1;if(u){const s=r-u;return s<0||s>=o?-1:e[n+s]-1}let a=n,i=a+o-1;for(;a<=i;){const s=a+i>>>1,l=e[s];if(l<r)a=s+1;else if(l>r)i=s-1;else return e[s+o]}return-1}const Ji=Ki(_c);Ki(Sc);function Rc(e,t=qe.Legacy){return Ji(e,t)}function Lc(e){return Ji(e,qe.Strict)}function Nc(e){return Object.prototype.toString.call(e)}function wo(e){return Nc(e)==="[object String]"}const zc=Object.prototype.hasOwnProperty;function qc(e,t){return zc.call(e,t)}function Zn(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(r){e[r]=n[r]})}}),e}function ea(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function Co(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function an(e){if(e>65535){e-=65536;const t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}const ta=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Bc=/&([a-z#][a-z0-9]{1,31});/gi,Hc=new RegExp(ta.source+"|"+Bc.source,"gi"),$c=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Vc(e,t){if(t.charCodeAt(0)===35&&$c.test(t)){const r=t[1].toLowerCase()==="x"?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return Co(r)?an(r):e}const n=Rc(e);return n!==e?n:e}function Uc(e){return e.indexOf("\\")<0?e:e.replace(ta,"$1")}function Rt(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Hc,function(t,n,r){return n||Vc(t,r)})}const jc=/[&<>"]/,Gc=/[&<>"]/g,Wc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Xc(e){return Wc[e]}function ot(e){return jc.test(e)?e.replace(Gc,Xc):e}const Yc=/[.?*+^$[\]\\(){}|-]/g;function Zc(e){return e.replace(Yc,"\\$&")}function z(e){switch(e){case 9:case 32:return!0}return!1}function sn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function na(e){return xo.test(e)||Zi.test(e)}function cn(e){return na(an(e))}function ln(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Qn(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function Au(e){return e===32||e===9||e===10||e===13}function Kn(e){let t=0;for(;t<e.length&&Au(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&Au(e.charCodeAt(n));n--);return e.slice(t,n+1)}const Qc={mdurl:wc,ucmicro:vc},Kc=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:ea,asciiTrim:Kn,assign:Zn,escapeHtml:ot,escapeRE:Zc,fromCodePoint:an,has:qc,isMdAsciiPunct:ln,isPunctChar:na,isPunctCharCode:cn,isSpace:z,isString:wo,isValidEntityCode:Co,isWhiteSpace:sn,lib:Qc,normalizeReference:Qn,unescapeAll:Rt,unescapeMd:Uc},Symbol.toStringTag,{value:"Module"}));function Jc(e,t,n){let r,o,u,a;const i=e.posMax,s=e.pos;for(e.pos=t+1,r=1;e.pos<i;){if(u=e.src.charCodeAt(e.pos),u===93&&(r--,r===0)){o=!0;break}if(a=e.pos,e.md.inline.skipToken(e),u===91){if(a===e.pos-1)r++;else if(n)return e.pos=s,-1}}let l=-1;return o&&(l=e.pos),e.pos=s,l}function el(e,t,n){let r,o=t;const u={ok:!1,pos:0,str:""};if(e.charCodeAt(o)===60){for(o++;o<n;){if(r=e.charCodeAt(o),r===10||r===60)return u;if(r===62)return u.pos=o+1,u.str=Rt(e.slice(t+1,o)),u.ok=!0,u;if(r===92&&o+1<n){o+=2;continue}o++}return u}let a=0;for(;o<n&&(r=e.charCodeAt(o),!(r===32||r<32||r===127));){if(r===92&&o+1<n){if(e.charCodeAt(o+1)===32)break;o+=2;continue}if(r===40&&(a++,a>32))return u;if(r===41){if(a===0)break;a--}o++}return t===o||a!==0||(u.str=Rt(e.slice(t,o)),u.pos=o,u.ok=!0),u}function tl(e,t,n,r){let o,u=t;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)a.str=r.str,a.marker=r.marker;else{if(u>=n)return a;let i=e.charCodeAt(u);if(i!==34&&i!==39&&i!==40)return a;t++,u++,i===40&&(i=41),a.marker=i}for(;u<n;){if(o=e.charCodeAt(u),o===a.marker)return a.pos=u+1,a.str+=Rt(e.slice(t,u)),a.ok=!0,a;if(o===40&&a.marker===41)return a;o===92&&u+1<n&&u++,u++}return a.can_continue=!0,a.str+=Rt(e.slice(t,u)),a}const nl=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:el,parseLinkLabel:Jc,parseLinkTitle:tl},Symbol.toStringTag,{value:"Module"})),Ne={};Ne.code_inline=function(e,t,n,r,o){const u=e[t];return"<code"+o.renderAttrs(u)+">"+ot(u.content)+"</code>"};Ne.code_block=function(e,t,n,r,o){const u=e[t];return"<pre"+o.renderAttrs(u)+"><code>"+ot(e[t].content)+`</code></pre>
`};Ne.fence=function(e,t,n,r,o){const u=e[t],a=u.info?Rt(u.info).trim():"";let i="",s="";if(a){const d=a.split(/(\s+)/g);i=d[0],s=d.slice(2).join("")}let l;if(n.highlight?l=n.highlight(u.content,i,s)||ot(u.content):l=ot(u.content),l.indexOf("<pre")===0)return l+`
`;if(a){const d=u.attrIndex("class"),c=u.attrs?u.attrs.slice():[];d<0?c.push(["class",n.langPrefix+i]):(c[d]=c[d].slice(),c[d][1]+=" "+n.langPrefix+i);const f={attrs:c};return`<pre><code${o.renderAttrs(f)}>${l}</code></pre>
`}return`<pre><code${o.renderAttrs(u)}>${l}</code></pre>
`};Ne.image=function(e,t,n,r,o){const u=e[t];return u.attrs[u.attrIndex("alt")][1]=o.renderInlineAsText(u.children,n,r),o.renderToken(e,t,n)};Ne.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`};Ne.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};Ne.text=function(e,t){return ot(e[t].content)};Ne.html_block=function(e,t){return e[t].content};Ne.html_inline=function(e,t){return e[t].content};function Bt(){this.rules=Zn({},Ne)}Bt.prototype.renderAttrs=function(t){let n,r,o;if(!t.attrs)return"";for(o="",n=0,r=t.attrs.length;n<r;n++)o+=" "+ot(t.attrs[n][0])+'="'+ot(t.attrs[n][1])+'"';return o};Bt.prototype.renderToken=function(t,n,r){const o=t[n];let u="";if(o.hidden)return"";o.block&&o.nesting!==-1&&n&&t[n-1].hidden&&(u+=`
`),u+=(o.nesting===-1?"</":"<")+o.tag,u+=this.renderAttrs(o),o.nesting===0&&r.xhtmlOut&&(u+=" /");let a=!1;if(o.block&&(a=!0,o.nesting===1&&n+1<t.length)){const i=t[n+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===o.tag)&&(a=!1)}return u+=a?`>
`:">",u};Bt.prototype.renderInline=function(e,t,n){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;typeof o[i]<"u"?r+=o[i](e,u,t,n,this):r+=this.renderToken(e,u,t)}return r};Bt.prototype.renderInlineAsText=function(e,t,n){let r="";for(let o=0,u=e.length;o<u;o++)switch(e[o].type){case"text":r+=e[o].content;break;case"image":r+=this.renderInlineAsText(e[o].children,t,n);break;case"html_inline":case"html_block":r+=e[o].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};Bt.prototype.render=function(e,t,n){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;i==="inline"?r+=this.renderInline(e[u].children,t,n):typeof o[i]<"u"?r+=o[i](e,u,t,n,this):r+=this.renderToken(e,u,t,n)}return r};function be(){this.__rules__=[],this.__cache__=null}be.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1};be.prototype.__compile__=function(){const e=this,t=[""];e.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(r){t.indexOf(r)<0&&t.push(r)})}),e.__cache__={},t.forEach(function(n){e.__cache__[n]=[],e.__rules__.forEach(function(r){r.enabled&&(n&&r.alt.indexOf(n)<0||e.__cache__[n].push(r.fn))})})};be.prototype.at=function(e,t,n){const r=this.__find__(e),o=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=t,this.__rules__[r].alt=o.alt||[],this.__cache__=null};be.prototype.before=function(e,t,n,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o,0,{name:t,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};be.prototype.after=function(e,t,n,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o+1,0,{name:t,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};be.prototype.push=function(e,t,n){const r=n||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null};be.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(t)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!0,n.push(r)},this),this.__cache__=null,n};be.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(e,t)};be.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(t)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!1,n.push(r)},this),this.__cache__=null,n};be.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function Oe(e,t,n){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}Oe.prototype.attrIndex=function(t){if(!this.attrs)return-1;const n=this.attrs;for(let r=0,o=n.length;r<o;r++)if(n[r][0]===t)return r;return-1};Oe.prototype.attrPush=function(t){this.attrs?this.attrs.push(t):this.attrs=[t]};Oe.prototype.attrSet=function(t,n){const r=this.attrIndex(t),o=[t,n];r<0?this.attrPush(o):this.attrs[r]=o};Oe.prototype.attrGet=function(t){const n=this.attrIndex(t);let r=null;return n>=0&&(r=this.attrs[n][1]),r};Oe.prototype.attrJoin=function(t,n){const r=this.attrIndex(t);r<0?this.attrPush([t,n]):this.attrs[r][1]=this.attrs[r][1]+" "+n};function ra(e,t,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=t}ra.prototype.Token=Oe;const rl=/\r\n?|\n/g,ol=/\0/g;function ul(e){let t;t=e.src.replace(rl,`
`),t=t.replace(ol,"�"),e.src=t}function il(e){let t;e.inlineMode?(t=new e.Token("inline","",0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function al(e){const t=e.tokens;for(let n=0,r=t.length;n<r;n++){const o=t[n];o.type==="inline"&&e.md.inline.parse(o.content,e.md,e.env,o.children)}}function sl(e){return/^<a[>\s]/i.test(e)}function cl(e){return/^<\/a\s*>/i.test(e)}function ll(e){const t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!=="inline"||!e.md.linkify.pretest(t[n].content))continue;let o=t[n].children,u=0;for(let a=o.length-1;a>=0;a--){const i=o[a];if(i.type==="link_close"){for(a--;o[a].level!==i.level&&o[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(sl(i.content)&&u>0&&u--,cl(i.content)&&u++),!(u>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const s=i.content;let l=e.md.linkify.match(s);const d=[];let c=i.level,f=0;l.length>0&&l[0].index===0&&a>0&&o[a-1].type==="text_special"&&(l=l.slice(1));for(let h=0;h<l.length;h++){const p=l[h].url,b=e.md.normalizeLink(p);if(!e.md.validateLink(b))continue;let g=l[h].text;l[h].schema?l[h].schema==="mailto:"&&!/^mailto:/i.test(g)?g=e.md.normalizeLinkText("mailto:"+g).replace(/^mailto:/,""):g=e.md.normalizeLinkText(g):g=e.md.normalizeLinkText("http://"+g).replace(/^http:\/\//,"");const y=l[h].index;if(y>f){const v=new e.Token("text","",0);v.content=s.slice(f,y),v.level=c,d.push(v)}const k=new e.Token("link_open","a",1);k.attrs=[["href",b]],k.level=c++,k.markup="linkify",k.info="auto",d.push(k);const C=new e.Token("text","",0);C.content=g,C.level=c,d.push(C);const w=new e.Token("link_close","a",-1);w.level=--c,w.markup="linkify",w.info="auto",d.push(w),f=l[h].lastIndex}if(f<s.length){const h=new e.Token("text","",0);h.content=s.slice(f),h.level=c,d.push(h)}t[n].children=o=ea(o,a,d)}}}}const oa=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,dl=/\((c|tm|r)\)/i,fl=/\((c|tm|r)\)/ig,hl={c:"©",r:"®",tm:"™"};function pl(e,t){return hl[t.toLowerCase()]}function ml(e){let t=0;for(let n=e.length-1;n>=0;n--){const r=e[n];r.type==="text"&&!t&&(r.content=r.content.replace(fl,pl)),r.type==="link_open"&&r.info==="auto"&&t--,r.type==="link_close"&&r.info==="auto"&&t++}}function bl(e){let t=0;for(let n=e.length-1;n>=0;n--){const r=e[n];r.type==="text"&&!t&&oa.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&t--,r.type==="link_close"&&r.info==="auto"&&t++}}function gl(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type==="inline"&&(dl.test(e.tokens[t].content)&&ml(e.tokens[t].children),oa.test(e.tokens[t].content)&&bl(e.tokens[t].children))}const yl=/['"]/,Tu=/['"]/g,Ou="’";function En(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function kl(e,t){let n="",r=0;t.sort((o,u)=>o.pos-u.pos);for(let o=0;o<t.length;o++){const u=t[o];n+=e.slice(r,u.pos)+u.ch,r=u.pos+1}return n+e.slice(r)}function xl(e,t){let n;const r=[],o={};for(let u=0;u<e.length;u++){const a=e[u],i=e[u].level;for(n=r.length-1;n>=0&&!(r[n].level<=i);n--);if(r.length=n+1,a.type!=="text")continue;const s=a.content;let l=0;const d=s.length;e:for(;l<d;){Tu.lastIndex=l;const c=Tu.exec(s);if(!c)break;let f=!0,h=!0;l=c.index+1;const p=c[0]==="'";let b=32;if(c.index-1>=0)b=s.charCodeAt(c.index-1);else for(n=u-1;n>=0&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n--)if(e[n].content){b=e[n].content.charCodeAt(e[n].content.length-1);break}let g=32;if(l<d)g=s.charCodeAt(l);else for(n=u+1;n<e.length&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n++)if(e[n].content){g=e[n].content.charCodeAt(0);break}const y=ln(b)||cn(b),k=ln(g)||cn(g),C=sn(b),w=sn(g);if(w?f=!1:k&&(C||y||(f=!1)),C?h=!1:y&&(w||k||(h=!1)),g===34&&c[0]==='"'&&b>=48&&b<=57&&(h=f=!1),f&&h&&(f=y,h=k),!f&&!h){p&&En(o,u,c.index,Ou);continue}if(h)for(n=r.length-1;n>=0;n--){let v=r[n];if(r[n].level<i)break;if(v.single===p&&r[n].level===i){v=r[n];let E,D;p?(E=t.md.options.quotes[2],D=t.md.options.quotes[3]):(E=t.md.options.quotes[0],D=t.md.options.quotes[1]),En(o,u,c.index,D),En(o,v.token,v.pos,E),r.length=n;continue e}}f?r.push({token:u,pos:c.index,single:p,level:i}):h&&p&&En(o,u,c.index,Ou)}}Object.keys(o).forEach(function(u){e[u].content=kl(e[u].content,o[u])})}function wl(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type!=="inline"||!yl.test(e.tokens[t].content)||xl(e.tokens[t].children,e)}function Cl(e){let t,n;const r=e.tokens,o=r.length;for(let u=0;u<o;u++){if(r[u].type!=="inline")continue;const a=r[u].children,i=a.length;for(t=0;t<i;t++)a[t].type==="text_special"&&(a[t].type="text");for(t=n=0;t<i;t++)a[t].type==="text"&&t+1<i&&a[t+1].type==="text"?a[t+1].content=a[t].content+a[t+1].content:(t!==n&&(a[n]=a[t]),n++);t!==n&&(a.length=n)}}const Fr=[["normalize",ul],["block",il],["inline",al],["linkify",ll],["replacements",gl],["smartquotes",wl],["text_join",Cl]];function vo(){this.ruler=new be;for(let e=0;e<Fr.length;e++)this.ruler.push(Fr[e][0],Fr[e][1])}vo.prototype.process=function(e){const t=this.ruler.getRules("");for(let n=0,r=t.length;n<r;n++)t[n](e)};vo.prototype.State=ra;function ze(e,t,n,r){this.src=e,this.md=t,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const o=this.src;for(let u=0,a=0,i=0,s=0,l=o.length,d=!1;a<l;a++){const c=o.charCodeAt(a);if(!d)if(z(c)){i++,c===9?s+=4-s%4:s++;continue}else d=!0;(c===10||a===l-1)&&(c!==10&&a++,this.bMarks.push(u),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(s),this.bsCount.push(0),d=!1,i=0,s=0,u=a+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ze.prototype.push=function(e,t,n){const r=new Oe(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r};ze.prototype.isEmpty=function(t){return this.bMarks[t]+this.tShift[t]>=this.eMarks[t]};ze.prototype.skipEmptyLines=function(t){for(let n=this.lineMax;t<n&&!(this.bMarks[t]+this.tShift[t]<this.eMarks[t]);t++);return t};ze.prototype.skipSpaces=function(t){for(let n=this.src.length;t<n;t++){const r=this.src.charCodeAt(t);if(!z(r))break}return t};ze.prototype.skipSpacesBack=function(t,n){if(t<=n)return t;for(;t>n;)if(!z(this.src.charCodeAt(--t)))return t+1;return t};ze.prototype.skipChars=function(t,n){for(let r=this.src.length;t<r&&this.src.charCodeAt(t)===n;t++);return t};ze.prototype.skipCharsBack=function(t,n,r){if(t<=r)return t;for(;t>r;)if(n!==this.src.charCodeAt(--t))return t+1;return t};ze.prototype.getLines=function(t,n,r,o){if(t>=n)return"";const u=new Array(n-t);for(let a=0,i=t;i<n;i++,a++){let s=0;const l=this.bMarks[i];let d=l,c;for(i+1<n||o?c=this.eMarks[i]+1:c=this.eMarks[i];d<c&&s<r;){const f=this.src.charCodeAt(d);if(z(f))f===9?s+=4-(s+this.bsCount[i])%4:s++;else if(d-l<this.tShift[i])s++;else break;d++}s>r?u[a]=new Array(s-r+1).join(" ")+this.src.slice(d,c):u[a]=this.src.slice(d,c)}return u.join("")};ze.prototype.Token=Oe;const vl=65536;function Ir(e,t){const n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function Du(e){const t=[],n=e.length;let r=0,o=e.charCodeAt(r),u=!1,a=0,i="";for(;r<n;)o===124&&(u?(i+=e.substring(a,r-1),a=r):(t.push(i+e.substring(a,r)),i="",a=r+1)),u=o===92,r++,o=e.charCodeAt(r);return t.push(i+e.substring(a)),t}function _l(e,t,n,r){if(t+2>n)return!1;let o=t+1;if(e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)return!1;let u=e.bMarks[o]+e.tShift[o];if(u>=e.eMarks[o])return!1;const a=e.src.charCodeAt(u++);if(a!==124&&a!==45&&a!==58||u>=e.eMarks[o])return!1;const i=e.src.charCodeAt(u++);if(i!==124&&i!==45&&i!==58&&!z(i)||a===45&&z(i))return!1;for(;u<e.eMarks[o];){const w=e.src.charCodeAt(u);if(w!==124&&w!==45&&w!==58&&!z(w))return!1;u++}let s=Ir(e,t+1),l=s.split("|");const d=[];for(let w=0;w<l.length;w++){const v=l[w].trim();if(!v){if(w===0||w===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(v))return!1;v.charCodeAt(v.length-1)===58?d.push(v.charCodeAt(0)===58?"center":"right"):v.charCodeAt(0)===58?d.push("left"):d.push("")}if(s=Ir(e,t).trim(),s.indexOf("|")===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=Du(s),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop();const c=l.length;if(c===0||c!==d.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),b=[t,0];p.map=b;const g=e.push("thead_open","thead",1);g.map=[t,t+1];const y=e.push("tr_open","tr",1);y.map=[t,t+1];for(let w=0;w<l.length;w++){const v=e.push("th_open","th",1);d[w]&&(v.attrs=[["style","text-align:"+d[w]]]);const E=e.push("inline","",0);E.content=l[w].trim(),E.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let k,C=0;for(o=t+2;o<n&&!(e.sCount[o]<e.blkIndent);o++){let w=!1;for(let E=0,D=h.length;E<D;E++)if(h[E](e,o,n,!0)){w=!0;break}if(w||(s=Ir(e,o).trim(),!s)||e.sCount[o]-e.blkIndent>=4||(l=Du(s),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop(),C+=c-l.length,C>vl))break;if(o===t+2){const E=e.push("tbody_open","tbody",1);E.map=k=[t+2,0]}const v=e.push("tr_open","tr",1);v.map=[o,o+1];for(let E=0;E<c;E++){const D=e.push("td_open","td",1);d[E]&&(D.attrs=[["style","text-align:"+d[E]]]);const R=e.push("inline","",0);R.content=l[E]?l[E].trim():"",R.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return k&&(e.push("tbody_close","tbody",-1),k[1]=o),e.push("table_close","table",-1),b[1]=o,e.parentType=f,e.line=o,!0}function Sl(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,o=r;for(;r<n;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,o=r;continue}break}e.line=o;const u=e.push("code_block","code",0);return u.content=e.getLines(t,o,4+e.blkIndent,!1)+`
`,u.map=[t,e.line],!0}function El(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||o+3>u)return!1;const a=e.src.charCodeAt(o);if(a!==126&&a!==96)return!1;let i=o;o=e.skipChars(o,a);let s=o-i;if(s<3)return!1;const l=e.src.slice(i,o),d=e.src.slice(o,u);if(a===96&&d.indexOf(String.fromCharCode(a))>=0)return!1;if(r)return!0;let c=t,f=!1;for(;c++,!(c>=n||(o=i=e.bMarks[c]+e.tShift[c],u=e.eMarks[c],o<u&&e.sCount[c]<e.blkIndent));)if(e.src.charCodeAt(o)===a&&!(e.sCount[c]-e.blkIndent>=4)&&(o=e.skipChars(o,a),!(o-i<s)&&(o=e.skipSpaces(o),!(o<u)))){f=!0;break}s=e.sCount[t],e.line=c+(f?1:0);const h=e.push("fence","code",0);return h.info=d,h.content=e.getLines(t+1,c,s,!0),h.markup=l,h.map=[t,e.line],!0}function Al(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];const a=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(o)!==62)return!1;if(r)return!0;const i=[],s=[],l=[],d=[],c=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,p;for(p=t;p<n;p++){const C=e.sCount[p]<e.blkIndent;if(o=e.bMarks[p]+e.tShift[p],u=e.eMarks[p],o>=u)break;if(e.src.charCodeAt(o++)===62&&!C){let v=e.sCount[p]+1,E,D;e.src.charCodeAt(o)===32?(o++,v++,D=!1,E=!0):e.src.charCodeAt(o)===9?(E=!0,(e.bsCount[p]+v)%4===3?(o++,v++,D=!1):D=!0):E=!1;let R=v;for(i.push(e.bMarks[p]),e.bMarks[p]=o;o<u;){const X=e.src.charCodeAt(o);if(z(X))X===9?R+=4-(R+e.bsCount[p]+(D?1:0))%4:R++;else break;o++}h=o>=u,s.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(E?1:0),l.push(e.sCount[p]),e.sCount[p]=R-v,d.push(e.tShift[p]),e.tShift[p]=o-e.bMarks[p];continue}if(h)break;let w=!1;for(let v=0,E=c.length;v<E;v++)if(c[v](e,p,n,!0)){w=!0;break}if(w){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),s.push(e.bsCount[p]),d.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),s.push(e.bsCount[p]),d.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]=-1}const b=e.blkIndent;e.blkIndent=0;const g=e.push("blockquote_open","blockquote",1);g.markup=">";const y=[t,0];g.map=y,e.md.block.tokenize(e,t,p);const k=e.push("blockquote_close","blockquote",-1);k.markup=">",e.lineMax=a,e.parentType=f,y[1]=e.line;for(let C=0;C<d.length;C++)e.bMarks[C+t]=i[C],e.tShift[C+t]=d[C],e.sCount[C+t]=l[C],e.bsCount[C+t]=s[C];return e.blkIndent=b,!0}function Tl(e,t,n,r){const o=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let u=e.bMarks[t]+e.tShift[t];const a=e.src.charCodeAt(u++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;u<o;){const l=e.src.charCodeAt(u++);if(l!==a&&!z(l))return!1;l===a&&i++}if(i<3)return!1;if(r)return!0;e.line=t+1;const s=e.push("hr","hr",0);return s.map=[t,e.line],s.markup=Array(i+1).join(String.fromCharCode(a)),!0}function Mu(e,t){const n=e.eMarks[t];let r=e.bMarks[t]+e.tShift[t];const o=e.src.charCodeAt(r++);if(o!==42&&o!==45&&o!==43)return-1;if(r<n){const u=e.src.charCodeAt(r);if(!z(u))return-1}return r}function Fu(e,t){const n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];let o=n;if(o+1>=r)return-1;let u=e.src.charCodeAt(o++);if(u<48||u>57)return-1;for(;;){if(o>=r)return-1;if(u=e.src.charCodeAt(o++),u>=48&&u<=57){if(o-n>=10)return-1;continue}if(u===41||u===46)break;return-1}return o<r&&(u=e.src.charCodeAt(o),!z(u))?-1:o}function Ol(e,t){const n=e.level+2;for(let r=t+2,o=e.tokens.length-2;r<o;r++)e.tokens[r].level===n&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Dl(e,t,n,r){let o,u,a,i,s=t,l=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let d=!1;r&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(d=!0);let c,f,h;if((h=Fu(e,s))>=0){if(c=!0,a=e.bMarks[s]+e.tShift[s],f=Number(e.src.slice(a,h-1)),d&&f!==1)return!1}else if((h=Mu(e,s))>=0)c=!1;else return!1;if(d&&e.skipSpaces(h)>=e.eMarks[s])return!1;if(r)return!0;const p=e.src.charCodeAt(h-1),b=e.tokens.length;c?(i=e.push("ordered_list_open","ol",1),f!==1&&(i.attrs=[["start",f]])):i=e.push("bullet_list_open","ul",1);const g=[s,0];i.map=g,i.markup=String.fromCharCode(p);let y=!1;const k=e.md.block.ruler.getRules("list"),C=e.parentType;for(e.parentType="list";s<n;){u=h,o=e.eMarks[s];const w=e.sCount[s]+h-(e.bMarks[s]+e.tShift[s]);let v=w;for(;u<o;){const ve=e.src.charCodeAt(u);if(ve===9)v+=4-(v+e.bsCount[s])%4;else if(ve===32)v++;else break;u++}const E=u;let D;E>=o?D=1:D=v-w,D>4&&(D=1);const R=w+D;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const X=[s,0];i.map=X,c&&(i.info=e.src.slice(a,h-1));const ye=e.tight,gt=e.tShift[s],Ue=e.sCount[s],hr=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=R,e.tight=!0,e.tShift[s]=E-e.bMarks[s],e.sCount[s]=v,E>=o&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,s,n,!0),(!e.tight||y)&&(l=!1),y=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=hr,e.tShift[s]=gt,e.sCount[s]=Ue,e.tight=ye,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),s=e.line,X[1]=s,s>=n||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let gn=!1;for(let ve=0,Vt=k.length;ve<Vt;ve++)if(k[ve](e,s,n,!0)){gn=!0;break}if(gn)break;if(c){if(h=Fu(e,s),h<0)break;a=e.bMarks[s]+e.tShift[s]}else if(h=Mu(e,s),h<0)break;if(p!==e.src.charCodeAt(h-1))break}return c?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),g[1]=s,e.line=s,e.parentType=C,l&&Ol(e,b),!0}function Ml(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t],a=t+1;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(o)!==91)return!1;function i(k){const C=e.lineMax;if(k>=C||e.isEmpty(k))return null;let w=!1;if(e.sCount[k]-e.blkIndent>3&&(w=!0),e.sCount[k]<0&&(w=!0),!w){const D=e.md.block.ruler.getRules("reference"),R=e.parentType;e.parentType="reference";let X=!1;for(let ye=0,gt=D.length;ye<gt;ye++)if(D[ye](e,k,C,!0)){X=!0;break}if(e.parentType=R,X)return null}const v=e.bMarks[k]+e.tShift[k],E=e.eMarks[k];return e.src.slice(v,E+1)}let s=e.src.slice(o,u+1);u=s.length;let l=-1;for(o=1;o<u;o++){const k=s.charCodeAt(o);if(k===91)return!1;if(k===93){l=o;break}else if(k===10){const C=i(a);C!==null&&(s+=C,u=s.length,a++)}else if(k===92&&(o++,o<u&&s.charCodeAt(o)===10)){const C=i(a);C!==null&&(s+=C,u=s.length,a++)}}if(l<0||s.charCodeAt(l+1)!==58)return!1;for(o=l+2;o<u;o++){const k=s.charCodeAt(o);if(k===10){const C=i(a);C!==null&&(s+=C,u=s.length,a++)}else if(!z(k))break}const d=e.md.helpers.parseLinkDestination(s,o,u);if(!d.ok)return!1;const c=e.md.normalizeLink(d.str);if(!e.md.validateLink(c))return!1;o=d.pos;const f=o,h=a,p=o;for(;o<u;o++){const k=s.charCodeAt(o);if(k===10){const C=i(a);C!==null&&(s+=C,u=s.length,a++)}else if(!z(k))break}let b=e.md.helpers.parseLinkTitle(s,o,u);for(;b.can_continue;){const k=i(a);if(k===null)break;s+=k,o=u,u=s.length,a++,b=e.md.helpers.parseLinkTitle(s,o,u,b)}let g;for(o<u&&p!==o&&b.ok?(g=b.str,o=b.pos):(g="",o=f,a=h);o<u;){const k=s.charCodeAt(o);if(!z(k))break;o++}if(o<u&&s.charCodeAt(o)!==10&&g)for(g="",o=f,a=h;o<u;){const k=s.charCodeAt(o);if(!z(k))break;o++}if(o<u&&s.charCodeAt(o)!==10)return!1;const y=Qn(s.slice(1,l));return y?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[y]>"u"&&(e.env.references[y]={title:g,href:c}),e.line=a),!0):!1}const Fl=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Il="[a-zA-Z_:][a-zA-Z0-9:._-]*",Pl="[^\"'=<>`\\x00-\\x20]+",Rl="'[^']*'",Ll='"[^"]*"',Nl="(?:"+Pl+"|"+Rl+"|"+Ll+")",zl="(?:\\s+"+Il+"(?:\\s*=\\s*"+Nl+")?)",ua="<[A-Za-z][A-Za-z0-9\\-]*"+zl+"*\\s*\\/?>",ia="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",ql="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Bl="<[?][\\s\\S]*?[?]>",Hl="<![A-Za-z][^>]*>",$l="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Vl=new RegExp("^(?:"+ua+"|"+ia+"|"+ql+"|"+Bl+"|"+Hl+"|"+$l+")"),Ul=new RegExp("^(?:"+ua+"|"+ia+")"),at=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Fl.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ul.source+"\\s*$"),/^$/,!1]];function jl(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(o)!==60)return!1;let a=e.src.slice(o,u),i=0;for(;i<at.length&&!at[i][0].test(a);i++);if(i===at.length)return!1;if(r)return at[i][2];let s=t+1;const l=at[i][1].test("");if(!at[i][1].test(a)){for(;s<n&&!(e.sCount[s]<e.blkIndent&&(l||!e.isEmpty(s)));s++)if(o=e.bMarks[s]+e.tShift[s],u=e.eMarks[s],a=e.src.slice(o,u),at[i][1].test(a)){a.length!==0&&s++;break}}e.line=s;const d=e.push("html_block","",0);return d.map=[t,s],d.content=e.getLines(t,s,e.blkIndent,!0),!0}function Gl(e,t,n,r){let o=e.bMarks[t]+e.tShift[t],u=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(o);if(a!==35||o>=u)return!1;let i=1;for(a=e.src.charCodeAt(++o);a===35&&o<u&&i<=6;)i++,a=e.src.charCodeAt(++o);if(i>6||o<u&&!z(a))return!1;if(r)return!0;u=e.skipSpacesBack(u,o);const s=e.skipCharsBack(u,35,o);s>o&&z(e.src.charCodeAt(s-1))&&(u=s),e.line=t+1;const l=e.push("heading_open","h"+String(i),1);l.markup="########".slice(0,i),l.map=[t,e.line];const d=e.push("inline","",0);d.content=Kn(e.src.slice(o,u)),d.map=[t,e.line],d.children=[];const c=e.push("heading_close","h"+String(i),-1);return c.markup="########".slice(0,i),!0}function Wl(e,t,n){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;const o=e.parentType;e.parentType="paragraph";let u=0,a,i=t+1;for(;i<n&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let h=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(h<p&&(a=e.src.charCodeAt(h),(a===45||a===61)&&(h=e.skipChars(h,a),h=e.skipSpaces(h),h>=p))){u=a===61?1:2;break}}if(e.sCount[i]<0)continue;let f=!1;for(let h=0,p=r.length;h<p;h++)if(r[h](e,i,n,!0)){f=!0;break}if(f)break}if(!u)return e.parentType=o,!1;const s=Kn(e.getLines(t,i,e.blkIndent,!1));e.line=i+1;const l=e.push("heading_open","h"+String(u),1);l.markup=String.fromCharCode(a),l.map=[t,e.line];const d=e.push("inline","",0);d.content=s,d.map=[t,e.line-1],d.children=[];const c=e.push("heading_close","h"+String(u),-1);return c.markup=String.fromCharCode(a),e.parentType=o,!0}function Xl(e,t,n){const r=e.md.block.ruler.getRules("paragraph"),o=e.parentType;let u=t+1;for(e.parentType="paragraph";u<n&&!e.isEmpty(u);u++){if(e.sCount[u]-e.blkIndent>3||e.sCount[u]<0)continue;let l=!1;for(let d=0,c=r.length;d<c;d++)if(r[d](e,u,n,!0)){l=!0;break}if(l)break}const a=Kn(e.getLines(t,u,e.blkIndent,!1));e.line=u;const i=e.push("paragraph_open","p",1);i.map=[t,e.line];const s=e.push("inline","",0);return s.content=a,s.map=[t,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=o,!0}const An=[["table",_l,["paragraph","reference"]],["code",Sl],["fence",El,["paragraph","reference","blockquote","list"]],["blockquote",Al,["paragraph","reference","blockquote","list"]],["hr",Tl,["paragraph","reference","blockquote","list"]],["list",Dl,["paragraph","reference","blockquote"]],["reference",Ml],["html_block",jl,["paragraph","reference","blockquote"]],["heading",Gl,["paragraph","reference","blockquote"]],["lheading",Wl],["paragraph",Xl]];function Jn(){this.ruler=new be;for(let e=0;e<An.length;e++)this.ruler.push(An[e][0],An[e][1],{alt:(An[e][2]||[]).slice()})}Jn.prototype.tokenize=function(e,t,n){const r=this.ruler.getRules(""),o=r.length,u=e.md.options.maxNesting;let a=t,i=!1;for(;a<n&&(e.line=a=e.skipEmptyLines(a),!(a>=n||e.sCount[a]<e.blkIndent));){if(e.level>=u){e.line=n;break}const s=e.line;let l=!1;for(let d=0;d<o;d++)if(l=r[d](e,a,n,!1),l){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!l)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<n&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};Jn.prototype.parse=function(e,t,n,r){if(!e)return;const o=new this.State(e,t,n,r);this.tokenize(o,o.line,o.lineMax)};Jn.prototype.State=ze;function hn(e,t,n,r){this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}hn.prototype.pushPending=function(){const e=new Oe("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};hn.prototype.push=function(e,t,n){this.pending&&this.pushPending();const r=new Oe(e,t,n);let o=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],o={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(o),r};hn.prototype.scanDelims=function(e,t){const n=this.posMax,r=this.src.charCodeAt(e);let o;if(e===0)o=32;else if(e===1)o=this.src.charCodeAt(0),(o&63488)===55296&&(o=65533);else if(o=this.src.charCodeAt(e-1),(o&64512)===56320){const g=this.src.charCodeAt(e-2);o=(g&64512)===55296?65536+(g-55296<<10)+(o-56320):65533}else(o&64512)===55296&&(o=65533);let u=e;for(;u<n&&this.src.charCodeAt(u)===r;)u++;const a=u-e;let i=u<n?this.src.charCodeAt(u):32;if((i&64512)===55296){const g=this.src.charCodeAt(u+1);i=(g&64512)===56320?65536+(i-55296<<10)+(g-56320):65533}else(i&64512)===56320&&(i=65533);const s=ln(o)||cn(o),l=ln(i)||cn(i),d=sn(o),c=sn(i),f=!c&&(!l||d||s),h=!d&&(!s||c||l);return{can_open:f&&(t||!h||s),can_close:h&&(t||!f||l),length:a}};hn.prototype.Token=Oe;function Yl(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Zl(e,t){let n=e.pos;for(;n<e.posMax&&!Yl(e.src.charCodeAt(n));)n++;return n===e.pos?!1:(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}const Ql=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Kl(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;const n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;const o=e.pending.match(Ql);if(!o)return!1;const u=o[1],a=e.md.linkify.matchAtStart(e.src.slice(n-u.length));if(!a)return!1;let i=a.url;if(i.length<=u.length)return!1;let s=i.length;for(;s>0&&i.charCodeAt(s-1)===42;)s--;s!==i.length&&(i=i.slice(0,s));const l=e.md.normalizeLink(i);if(!e.md.validateLink(l))return!1;if(!t){e.pending=e.pending.slice(0,-u.length);const d=e.push("link_open","a",1);d.attrs=[["href",l]],d.markup="linkify",d.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=i.length-u.length,!0}function Jl(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;const r=e.pending.length-1,o=e.posMax;if(!t)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let u=r-1;for(;u>=1&&e.pending.charCodeAt(u-1)===32;)u--;e.pending=e.pending.slice(0,u),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(n++;n<o&&z(e.src.charCodeAt(n));)n++;return e.pos=n,!0}const _o=[];for(let e=0;e<256;e++)_o.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){_o[e.charCodeAt(0)]=1});function e0(e,t){let n=e.pos;const r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let o=e.src.charCodeAt(n);if(o===10){for(t||e.push("hardbreak","br",0),n++;n<r&&(o=e.src.charCodeAt(n),!!z(o));)n++;return e.pos=n,!0}if(o===32){if(!t){const i=e.push("text_special","",0);i.content="\\",i.markup="\\",i.info="escape"}return e.pos=n,!0}let u=e.src[n];if(o>=55296&&o<=56319&&n+1<r){const i=e.src.charCodeAt(n+1);i>=56320&&i<=57343&&(u+=e.src[n+1],n++)}const a="\\"+u;if(!t){const i=e.push("text_special","",0);o<256&&_o[o]!==0?i.content=u:i.content=a,i.markup=a,i.info="escape"}return e.pos=n+1,!0}function t0(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;const o=n;n++;const u=e.posMax;for(;n<u&&e.src.charCodeAt(n)===96;)n++;const a=e.src.slice(o,n),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=o)return t||(e.pending+=a),e.pos+=i,!0;let s=n,l;for(;(l=e.src.indexOf("`",s))!==-1;){for(s=l+1;s<u&&e.src.charCodeAt(s)===96;)s++;const d=s-l;if(d===i){if(!t){const c=e.push("code_inline","code",0);c.markup=a,c.content=e.src.slice(n,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[d]=l}return e.backticksScanned=!0,t||(e.pending+=a),e.pos+=i,!0}function n0(e,t){const n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;const o=e.scanDelims(e.pos,!0);let u=o.length;const a=String.fromCharCode(r);if(u<2)return!1;let i;u%2&&(i=e.push("text","",0),i.content=a,u--);for(let s=0;s<u;s+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close});return e.pos+=o.length,!0}function Iu(e,t){let n;const r=[],o=t.length;for(let u=0;u<o;u++){const a=t[u];if(a.marker!==126||a.end===-1)continue;const i=t[a.end];n=e.tokens[a.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=e.tokens[i.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&r.push(i.token-1)}for(;r.length;){const u=r.pop();let a=u+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,u!==a&&(n=e.tokens[a],e.tokens[a]=e.tokens[u],e.tokens[u]=n)}}function r0(e){const t=e.tokens_meta,n=e.tokens_meta.length;Iu(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Iu(e,t[r].delimiters)}const aa={tokenize:n0,postProcess:r0};function o0(e,t){const n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;const o=e.scanDelims(e.pos,r===42);for(let u=0;u<o.length;u++){const a=e.push("text","",0);a.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:o.length,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close})}return e.pos+=o.length,!0}function Pu(e,t){const n=t.length;for(let r=n-1;r>=0;r--){const o=t[r];if(o.marker!==95&&o.marker!==42||o.end===-1)continue;const u=t[o.end],a=r>0&&t[r-1].end===o.end+1&&t[r-1].marker===o.marker&&t[r-1].token===o.token-1&&t[o.end+1].token===u.token+1,i=String.fromCharCode(o.marker),s=e.tokens[o.token];s.type=a?"strong_open":"em_open",s.tag=a?"strong":"em",s.nesting=1,s.markup=a?i+i:i,s.content="";const l=e.tokens[u.token];l.type=a?"strong_close":"em_close",l.tag=a?"strong":"em",l.nesting=-1,l.markup=a?i+i:i,l.content="",a&&(e.tokens[t[r-1].token].content="",e.tokens[t[o.end+1].token].content="",r--)}}function u0(e){const t=e.tokens_meta,n=e.tokens_meta.length;Pu(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Pu(e,t[r].delimiters)}const sa={tokenize:o0,postProcess:u0};function i0(e,t){let n,r,o,u,a="",i="",s=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const d=e.pos,c=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let p=h+1;if(p<c&&e.src.charCodeAt(p)===40){for(l=!1,p++;p<c&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);if(p>=c)return!1;if(s=p,o=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),o.ok){for(a=e.md.normalizeLink(o.str),e.md.validateLink(a)?p=o.pos:a="",s=p;p<c&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);if(o=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<c&&s!==p&&o.ok)for(i=o.str,p=o.pos;p<c&&(n=e.src.charCodeAt(p),!(!z(n)&&n!==10));p++);}(p>=c||e.src.charCodeAt(p)!==41)&&(l=!0),p++}if(l){if(typeof e.env.references>"u")return!1;if(p<c&&e.src.charCodeAt(p)===91?(s=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?r=e.src.slice(s,p++):p=h+1):p=h+1,r||(r=e.src.slice(f,h)),u=e.env.references[Qn(r)],!u)return e.pos=d,!1;a=u.href,i=u.title}if(!t){e.pos=f,e.posMax=h;const b=e.push("link_open","a",1),g=[["href",a]];b.attrs=g,i&&g.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=c,!0}function a0(e,t){let n,r,o,u,a,i,s,l,d="";const c=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(u=p+1,u<f&&e.src.charCodeAt(u)===40){for(u++;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);if(u>=f)return!1;for(l=u,i=e.md.helpers.parseLinkDestination(e.src,u,e.posMax),i.ok&&(d=e.md.normalizeLink(i.str),e.md.validateLink(d)?u=i.pos:d=""),l=u;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);if(i=e.md.helpers.parseLinkTitle(e.src,u,e.posMax),u<f&&l!==u&&i.ok)for(s=i.str,u=i.pos;u<f&&(n=e.src.charCodeAt(u),!(!z(n)&&n!==10));u++);else s="";if(u>=f||e.src.charCodeAt(u)!==41)return e.pos=c,!1;u++}else{if(typeof e.env.references>"u")return!1;if(u<f&&e.src.charCodeAt(u)===91?(l=u+1,u=e.md.helpers.parseLinkLabel(e,u),u>=0?o=e.src.slice(l,u++):u=p+1):u=p+1,o||(o=e.src.slice(h,p)),a=e.env.references[Qn(o)],!a)return e.pos=c,!1;d=a.href,s=a.title}if(!t){r=e.src.slice(h,p);const b=[];e.md.inline.parse(r,e.md,e.env,b);const g=e.push("image","img",0),y=[["src",d],["alt",""]];g.attrs=y,g.children=b,g.content=r,s&&y.push(["title",s])}return e.pos=u,e.posMax=f,!0}const s0=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,c0=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function l0(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;const r=e.pos,o=e.posMax;for(;;){if(++n>=o)return!1;const a=e.src.charCodeAt(n);if(a===60)return!1;if(a===62)break}const u=e.src.slice(r+1,n);if(c0.test(u)){const a=e.md.normalizeLink(u);if(!e.md.validateLink(a))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(u);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=u.length+2,!0}if(s0.test(u)){const a=e.md.normalizeLink("mailto:"+u);if(!e.md.validateLink(a))return!1;if(!t){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(u);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=u.length+2,!0}return!1}function d0(e){return/^<a[>\s]/i.test(e)}function f0(e){return/^<\/a\s*>/i.test(e)}function h0(e){const t=e|32;return t>=97&&t<=122}function p0(e,t){if(!e.md.options.html)return!1;const n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;const o=e.src.charCodeAt(r+1);if(o!==33&&o!==63&&o!==47&&!h0(o))return!1;const u=e.src.slice(r).match(Vl);if(!u)return!1;if(!t){const a=e.push("html_inline","",0);a.content=u[0],d0(a.content)&&e.linkLevel++,f0(a.content)&&e.linkLevel--}return e.pos+=u[0].length,!0}const m0=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,b0=/^&([a-z][a-z0-9]{1,31});/i;function g0(e,t){const n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){const u=e.src.slice(n).match(m0);if(u){if(!t){const a=u[1][0].toLowerCase()==="x"?parseInt(u[1].slice(1),16):parseInt(u[1],10),i=e.push("text_special","",0);i.content=Co(a)?an(a):an(65533),i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}else{const u=e.src.slice(n).match(b0);if(u){const a=Lc(u[0]);if(a!==u[0]){if(!t){const i=e.push("text_special","",0);i.content=a,i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}}return!1}function Ru(e){const t={},n=e.length;if(!n)return;let r=0,o=-2;const u=[];for(let a=0;a<n;a++){const i=e[a];if(u.push(0),(e[r].marker!==i.marker||o!==i.token-1)&&(r=a),o=i.token,i.length=i.length||0,!i.close)continue;t.hasOwnProperty(i.marker)||(t[i.marker]=[-1,-1,-1,-1,-1,-1]);const s=t[i.marker][(i.open?3:0)+i.length%3];let l=r-u[r]-1,d=l;for(;l>s;l-=u[l]+1){const c=e[l];if(c.marker===i.marker&&c.open&&c.end<0){let f=!1;if((c.close||i.open)&&(c.length+i.length)%3===0&&(c.length%3!==0||i.length%3!==0)&&(f=!0),!f){const h=l>0&&!e[l-1].open?u[l-1]+1:0;u[a]=a-l+h,u[l]=h,i.open=!1,c.end=a,c.close=!1,d=-1,o=-2;break}}}d!==-1&&(t[i.marker][(i.open?3:0)+(i.length||0)%3]=d)}}function y0(e){const t=e.tokens_meta,n=e.tokens_meta.length;Ru(e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Ru(t[r].delimiters)}function k0(e){let t,n,r=0;const o=e.tokens,u=e.tokens.length;for(t=n=0;t<u;t++)o[t].nesting<0&&r--,o[t].level=r,o[t].nesting>0&&r++,o[t].type==="text"&&t+1<u&&o[t+1].type==="text"?o[t+1].content=o[t].content+o[t+1].content:(t!==n&&(o[n]=o[t]),n++);t!==n&&(o.length=n)}const Pr=[["text",Zl],["linkify",Kl],["newline",Jl],["escape",e0],["backticks",t0],["strikethrough",aa.tokenize],["emphasis",sa.tokenize],["link",i0],["image",a0],["autolink",l0],["html_inline",p0],["entity",g0]],Rr=[["balance_pairs",y0],["strikethrough",aa.postProcess],["emphasis",sa.postProcess],["fragments_join",k0]];function pn(){this.ruler=new be;for(let e=0;e<Pr.length;e++)this.ruler.push(Pr[e][0],Pr[e][1]);this.ruler2=new be;for(let e=0;e<Rr.length;e++)this.ruler2.push(Rr[e][0],Rr[e][1])}pn.prototype.skipToken=function(e){const t=e.pos,n=this.ruler.getRules(""),r=n.length,o=e.md.options.maxNesting,u=e.cache;if(typeof u[t]<"u"){e.pos=u[t];return}let a=!1;if(e.level<o){for(let i=0;i<r;i++)if(e.level++,a=n[i](e,!0),e.level--,a){if(t>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,u[t]=e.pos};pn.prototype.tokenize=function(e){const t=this.ruler.getRules(""),n=t.length,r=e.posMax,o=e.md.options.maxNesting;for(;e.pos<r;){const u=e.pos;let a=!1;if(e.level<o){for(let i=0;i<n;i++)if(a=t[i](e,!1),a){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};pn.prototype.parse=function(e,t,n,r){const o=new this.State(e,t,n,r);this.tokenize(o);const u=this.ruler2.getRules(""),a=u.length;for(let i=0;i<a;i++)u[i](o)};pn.prototype.State=hn;function x0(e){const t={};e=e||{},t.src_Any=Xi.source,t.src_Cc=Yi.source,t.src_Z=Qi.source,t.src_P=xo.source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join("|"),t.src_ZCc=[t.src_Z,t.src_Cc].join("|");const n="[><｜]";return t.src_pseudo_letter=`(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`,t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",t.src_auth=`(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",t.src_host_terminator=`(?=$|${n}|${t.src_ZPCc})(?!${e["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`,t.src_path=`(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|`+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`,t.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',t.src_xn="xn--[a-z0-9\\-]{1,59}",t.src_domain_root="(?:"+t.src_xn+`|${t.src_pseudo_letter}{1,63})`,t.src_domain="(?:"+t.src_xn+`|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`,t.src_host=`(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`,t.tpl_host_fuzzy="(?:"+t.src_ip4+`|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`,t.tpl_host_no_ip_fuzzy=`(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`,t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`,t.tpl_email_fuzzy=`(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`,t.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${t.src_ZPCc}))((?![$+<=>^\`|｜])${t.tpl_host_port_fuzzy_strict}${t.src_path})`,t.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${t.src_ZPCc}))((?![$+<=>^\`|｜])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`,t}function uo(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(r){e[r]=n[r]})}),e}function er(e){return Object.prototype.toString.call(e)}function w0(e){return er(e)==="[object String]"}function C0(e){return er(e)==="[object Object]"}function v0(e){return er(e)==="[object RegExp]"}function Lu(e){return er(e)==="[object Function]"}function _0(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const ca={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function S0(e){return Object.keys(e||{}).reduce(function(t,n){return t||ca.hasOwnProperty(n)},!1)}const E0={"http:":{validate:function(e,t,n){const r=e.slice(t);return n.re.http||(n.re.http=new RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`,"i")),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,t,n){const r=e.slice(t);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+`(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})`+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(r)?t>=3&&e[t-3]===":"||t>=3&&e[t-3]==="/"?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,n){const r=e.slice(t);return n.re.mailto||(n.re.mailto=new RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`,"i")),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},A0="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",T0="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function O0(e){return function(t,n){const r=t.slice(n);return e.test(r)?r.match(e)[0].length:0}}function Nu(){return function(e,t){t.normalize(e)}}function zn(e){const t=e.re=x0(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(A0),n.push(t.src_xn),t.src_tlds=n.join("|");function r(i){return i.replace("%TLDS%",t.src_tlds)}t.email_fuzzy=RegExp(r(t.tpl_email_fuzzy),"i"),t.email_fuzzy_global=RegExp(r(t.tpl_email_fuzzy),"ig"),t.link_fuzzy=RegExp(r(t.tpl_link_fuzzy),"i"),t.link_fuzzy_global=RegExp(r(t.tpl_link_fuzzy),"ig"),t.link_no_ip_fuzzy=RegExp(r(t.tpl_link_no_ip_fuzzy),"i"),t.link_no_ip_fuzzy_global=RegExp(r(t.tpl_link_no_ip_fuzzy),"ig"),t.host_fuzzy_test=RegExp(r(t.tpl_host_fuzzy_test),"i");const o=[];e.__compiled__={};function u(i,s){throw new Error(`(LinkifyIt) Invalid schema "${i}": ${s}`)}Object.keys(e.__schemas__).forEach(function(i){const s=e.__schemas__[i];if(s===null)return;const l={validate:null,link:null};if(e.__compiled__[i]=l,C0(s)){v0(s.validate)?l.validate=O0(s.validate):Lu(s.validate)?l.validate=s.validate:u(i,s),Lu(s.normalize)?l.normalize=s.normalize:s.normalize?u(i,s):l.normalize=Nu();return}if(w0(s)){o.push(i);return}u(i,s)}),o.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Nu()};const a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(_0).join("|");e.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${t.src_ZPCc}))(${a})`,"i"),e.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${t.src_ZPCc}))(${a})`,"ig"),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,"i"),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,"i")}function la(e,t,n,r){const o=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=o,this.text=o,this.url=o}function xe(e,t){if(!(this instanceof xe))return new xe(e,t);t||S0(e)&&(t=e,e={}),this.__opts__=uo({},ca,t),this.__schemas__=uo({},E0,e),this.__compiled__={},this.__tlds__=T0,this.__tlds_replaced__=!1,this.re={},zn(this)}xe.prototype.add=function(t,n){return this.__schemas__[t]=n,zn(this),this};xe.prototype.set=function(t){return this.__opts__=uo(this.__opts__,t),this};xe.prototype.test=function(t){if(!t.length)return!1;let n,r;if(this.re.schema_test.test(t)){for(r=this.re.schema_search,r.lastIndex=0;(n=r.exec(t))!==null;)if(this.testSchemaAt(t,n[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&t.search(this.re.host_fuzzy_test)>=0&&t.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&t.indexOf("@")>=0&&t.match(this.re.email_fuzzy)!==null)};xe.prototype.pretest=function(t){return this.re.pretest.test(t)};xe.prototype.testSchemaAt=function(t,n,r){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(t,r,this):0};xe.prototype.match=function(t){const n=[],r=[],o=[],u=[];let a,i,s;function l(f,h){return f?h?f.index!==h.index?f.index<h.index?f:h:f.lastIndex>=h.lastIndex?f:h:f:h}if(!t.length)return null;if(this.re.schema_test.test(t))for(s=this.re.schema_search,s.lastIndex=0;(a=s.exec(t))!==null;)i=this.testSchemaAt(t,a[2],s.lastIndex),i&&r.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(a=s.exec(t))!==null;)o.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(a=s.exec(t))!==null;)u.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});const d=[0,0,0];let c=0;for(;;){const f=[r[d[0]],u[d[1]],o[d[2]]],h=l(l(f[0],f[1]),f[2]);if(!h)break;if(h===f[0]?d[0]++:h===f[1]?d[1]++:d[2]++,h.index<c)continue;const p=new la(t,h.schema,h.index,h.lastIndex);this.__compiled__[p.schema].normalize(p,this),n.push(p),c=h.lastIndex}return n.length?n:null};xe.prototype.matchAtStart=function(t){if(!t.length)return null;const n=this.re.schema_at_start.exec(t);if(!n)return null;const r=this.testSchemaAt(t,n[2],n[0].length);if(!r)return null;const o=new la(t,n[2],n.index+n[1].length,n.index+n[0].length+r);return this.__compiled__[o.schema].normalize(o,this),o};xe.prototype.tlds=function(t,n){return t=Array.isArray(t)?t:[t],n?(this.__tlds__=this.__tlds__.concat(t).sort().filter(function(r,o,u){return r!==u[o-1]}).reverse(),zn(this),this):(this.__tlds__=t.slice(),this.__tlds_replaced__=!0,zn(this),this)};xe.prototype.normalize=function(t){t.schema||(t.url=`http://${t.url}`),t.schema==="mailto:"&&!/^mailto:/i.test(t.url)&&(t.url=`mailto:${t.url}`)};xe.prototype.onCompile=function(){};const Mt=2147483647,Re=36,So=1,dn=26,D0=38,M0=700,da=72,fa=128,ha="-",F0=/^xn--/,I0=/[^\0-\x7F]/,P0=/[\x2E\u3002\uFF0E\uFF61]/g,R0={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Lr=Re-So,Le=Math.floor,Nr=String.fromCharCode;function Qe(e){throw new RangeError(R0[e])}function L0(e,t){const n=[];let r=e.length;for(;r--;)n[r]=t(e[r]);return n}function pa(e,t){const n=e.split("@");let r="";n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(P0,".");const o=e.split("."),u=L0(o,t).join(".");return r+u}function ma(e){const t=[];let n=0;const r=e.length;for(;n<r;){const o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<r){const u=e.charCodeAt(n++);(u&64512)==56320?t.push(((o&1023)<<10)+(u&1023)+65536):(t.push(o),n--)}else t.push(o)}return t}const N0=e=>String.fromCodePoint(...e),z0=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:Re},zu=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},ba=function(e,t,n){let r=0;for(e=n?Le(e/M0):e>>1,e+=Le(e/t);e>Lr*dn>>1;r+=Re)e=Le(e/Lr);return Le(r+(Lr+1)*e/(e+D0))},ga=function(e){const t=[],n=e.length;let r=0,o=fa,u=da,a=e.lastIndexOf(ha);a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&Qe("not-basic"),t.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<n;){const s=r;for(let d=1,c=Re;;c+=Re){i>=n&&Qe("invalid-input");const f=z0(e.charCodeAt(i++));f>=Re&&Qe("invalid-input"),f>Le((Mt-r)/d)&&Qe("overflow"),r+=f*d;const h=c<=u?So:c>=u+dn?dn:c-u;if(f<h)break;const p=Re-h;d>Le(Mt/p)&&Qe("overflow"),d*=p}const l=t.length+1;u=ba(r-s,l,s==0),Le(r/l)>Mt-o&&Qe("overflow"),o+=Le(r/l),r%=l,t.splice(r++,0,o)}return String.fromCodePoint(...t)},ya=function(e){const t=[];e=ma(e);const n=e.length;let r=fa,o=0,u=da;for(const s of e)s<128&&t.push(Nr(s));const a=t.length;let i=a;for(a&&t.push(ha);i<n;){let s=Mt;for(const d of e)d>=r&&d<s&&(s=d);const l=i+1;s-r>Le((Mt-o)/l)&&Qe("overflow"),o+=(s-r)*l,r=s;for(const d of e)if(d<r&&++o>Mt&&Qe("overflow"),d===r){let c=o;for(let f=Re;;f+=Re){const h=f<=u?So:f>=u+dn?dn:f-u;if(c<h)break;const p=c-h,b=Re-h;t.push(Nr(zu(h+p%b,0))),c=Le(p/b)}t.push(Nr(zu(c,0))),u=ba(o,l,i===a),o=0,++i}++o,++r}return t.join("")},q0=function(e){return pa(e,function(t){return F0.test(t)?ga(t.slice(4).toLowerCase()):t})},B0=function(e){return pa(e,function(t){return I0.test(t)?"xn--"+ya(t):t})},ka={version:"2.3.1",ucs2:{decode:ma,encode:N0},decode:ga,encode:ya,toASCII:B0,toUnicode:q0},H0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},$0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},V0={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},U0={default:H0,zero:$0,commonmark:V0},j0=/^(vbscript|javascript|file|data):/,G0=/^data:image\/(gif|png|jpeg|webp);/;function W0(e){const t=e.trim().toLowerCase();return j0.test(t)?G0.test(t):!0}const xa=["http:","https:","mailto:"];function X0(e){const t=ko(e,!0);if(t.hostname&&(!t.protocol||xa.indexOf(t.protocol)>=0))try{t.hostname=ka.toASCII(t.hostname)}catch{}return fn(yo(t))}function Y0(e){const t=ko(e,!0);if(t.hostname&&(!t.protocol||xa.indexOf(t.protocol)>=0))try{t.hostname=ka.toUnicode(t.hostname)}catch{}return Pt(yo(t),Pt.defaultChars+"%")}function Ce(e,t){if(!(this instanceof Ce))return new Ce(e,t);t||wo(e)||(t=e||{},e="default"),this.inline=new pn,this.block=new Jn,this.core=new vo,this.renderer=new Bt,this.linkify=new xe,this.validateLink=W0,this.normalizeLink=X0,this.normalizeLinkText=Y0,this.utils=Kc,this.helpers=Zn({},nl),this.options={},this.configure(e),t&&this.set(t)}Ce.prototype.set=function(e){return Zn(this.options,e),this};Ce.prototype.configure=function(e){const t=this;if(wo(e)){const n=e;if(e=U0[n],!e)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&t[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&t[n].ruler2.enableOnly(e.components[n].rules2)}),this};Ce.prototype.enable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){n=n.concat(this[o].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(o){return n.indexOf(o)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};Ce.prototype.disable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){n=n.concat(this[o].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(o){return n.indexOf(o)<0});if(r.length&&!t)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};Ce.prototype.use=function(e){const t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this};Ce.prototype.parse=function(e,t){if(typeof e!="string")throw new Error("Input data should be a String");const n=new this.core.State(e,this,t);return this.core.process(n),n.tokens};Ce.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)};Ce.prototype.parseInline=function(e,t){const n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens};Ce.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)};var qu=!1,Lt={false:"push",true:"unshift",after:"push",before:"unshift"},qn={isPermalinkSymbol:!0};function io(e,t,n,r){var o;if(!qu){var u="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(u):console.warn(u),qu=!0}var a=[Object.assign(new n.Token("link_open","a",1),{attrs:[].concat(t.permalinkClass?[["class",t.permalinkClass]]:[],[["href",t.permalinkHref(e,n)]],Object.entries(t.permalinkAttrs(e,n)))}),Object.assign(new n.Token("html_block","",0),{content:t.permalinkSymbol,meta:qn}),new n.Token("link_close","a",-1)];t.permalinkSpace&&n.tokens[r+1].children[Lt[t.permalinkBefore]](Object.assign(new n.Token("text","",0),{content:" "})),(o=n.tokens[r+1].children)[Lt[t.permalinkBefore]].apply(o,a)}function wa(e){return"#"+e}function Ca(e){return{}}var Z0={class:"header-anchor",symbol:"#",renderHref:wa,renderAttrs:Ca};function mn(e){function t(n){return n=Object.assign({},t.defaults,n),function(r,o,u,a){return e(r,n,o,u,a)}}return t.defaults=Object.assign({},Z0),t.renderPermalinkImpl=e,t}function Eo(e){var t=[],n=e.filter(function(r){if(r[0]!=="class")return!0;t.push(r[1])});return t.length>0&&n.unshift(["class",t.join(" ")]),n}var tr=mn(function(e,t,n,r,o){var u,a=[Object.assign(new r.Token("link_open","a",1),{attrs:Eo([].concat(t.class?[["class",t.class]]:[],[["href",t.renderHref(e,r)]],t.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(t.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:qn}),new r.Token("link_close","a",-1)];if(t.space){var i=typeof t.space=="string"?t.space:" ";r.tokens[o+1].children[Lt[t.placement]](Object.assign(new r.Token(typeof t.space=="string"?"html_inline":"text","",0),{content:i}))}(u=r.tokens[o+1].children)[Lt[t.placement]].apply(u,a)});Object.assign(tr.defaults,{space:!0,placement:"after",ariaHidden:!1});var dt=mn(tr.renderPermalinkImpl);dt.defaults=Object.assign({},tr.defaults,{ariaHidden:!0});var va=mn(function(e,t,n,r,o){var u=[Object.assign(new r.Token("link_open","a",1),{attrs:Eo([].concat(t.class?[["class",t.class]]:[],[["href",t.renderHref(e,r)]],Object.entries(t.renderAttrs(e,r))))})].concat(t.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[o+1].children,t.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[o+1].children=u});Object.assign(va.defaults,{safariReaderFix:!1});var Bu=mn(function(e,t,n,r,o){var u;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(t.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+t.style+"`");if(!["aria-describedby","aria-labelledby"].includes(t.style)&&!t.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+t.style+"` style");if(t.style==="visually-hidden"&&!t.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var a=r.tokens[o+1].children.filter(function(c){return c.type==="text"||c.type==="code_inline"}).reduce(function(c,f){return c+f.content},""),i=[],s=[];if(t.class&&s.push(["class",t.class]),s.push(["href",t.renderHref(e,r)]),s.push.apply(s,Object.entries(t.renderAttrs(e,r))),t.style==="visually-hidden"){if(i.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",t.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:t.assistiveText(a)}),new r.Token("span_close","span",-1)),t.space){var l=typeof t.space=="string"?t.space:" ";i[Lt[t.placement]](Object.assign(new r.Token(typeof t.space=="string"?"html_inline":"text","",0),{content:l}))}i[Lt[t.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:qn}),new r.Token("span_close","span",-1))}else i.push(Object.assign(new r.Token("html_inline","",0),{content:t.symbol,meta:qn}));t.style==="aria-label"?s.push(["aria-label",t.assistiveText(a)]):["aria-describedby","aria-labelledby"].includes(t.style)&&s.push([t.style,e]);var d=[Object.assign(new r.Token("link_open","a",1),{attrs:Eo(s)})].concat(i,[new r.Token("link_close","a",-1)]);(u=r.tokens).splice.apply(u,[o+3,0].concat(d)),t.wrapper&&(r.tokens.splice(o,0,Object.assign(new r.Token("html_block","",0),{content:t.wrapper[0]+`
`})),r.tokens.splice(o+3+d.length+1,0,Object.assign(new r.Token("html_block","",0),{content:t.wrapper[1]+`
`})))});function Hu(e,t,n,r){var o=e,u=r;if(n&&Object.prototype.hasOwnProperty.call(t,o))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(t,o);)o=e+"-"+u,u+=1;return t[o]=!0,o}function Ot(e,t){t=Object.assign({},Ot.defaults,t),e.core.ruler.push("anchor",function(n){for(var r,o={},u=n.tokens,a=Array.isArray(t.level)?(r=t.level,function(c){return r.includes(c)}):(function(c){return function(f){return f>=c}})(t.level),i=0;i<u.length;i++){var s=u[i];if(s.type==="heading_open"&&a(Number(s.tag.substr(1)))){var l=t.getTokensText(u[i+1].children),d=s.attrGet("id");d=d==null?Hu(d=t.slugifyWithState?t.slugifyWithState(l,n):t.slugify(l),o,!1,t.uniqueSlugStartIndex):Hu(d,o,!0,t.uniqueSlugStartIndex),s.attrSet("id",d),t.tabIndex!==!1&&s.attrSet("tabindex",""+t.tabIndex),typeof t.permalink=="function"?t.permalink(d,t,n,i):(t.permalink||t.renderPermalink&&t.renderPermalink!==io)&&t.renderPermalink(d,t,n,i),i=u.indexOf(s),t.callback&&t.callback(s,{slug:d,title:l})}}})}Object.assign(Bu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),Ot.permalink={__proto__:null,legacy:io,renderHref:wa,renderAttrs:Ca,makePermalink:mn,linkInsideHeader:tr,ariaHidden:dt,headerLink:va,linkAfterHeader:Bu},Ot.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(t){return["text","code_inline"].includes(t.type)}).map(function(t){return t.content}).join("")},permalink:!1,renderPermalink:io,permalinkClass:dt.defaults.class,permalinkSpace:dt.defaults.space,permalinkSymbol:"¶",permalinkBefore:dt.defaults.placement==="before",permalinkHref:dt.defaults.renderHref,permalinkAttrs:dt.defaults.renderAttrs},Ot.default=Ot;function nr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var zr,$u;function Q0(){if($u)return zr;$u=1;function e(r,o){var u,a,i=r.attrs[r.attrIndex("href")][1];for(u=0;u<o.length;++u){if(a=o[u],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function t(r,o,u){Object.keys(u).forEach(function(a){var i,s=u[a];a==="className"&&(a="class"),i=o[r].attrIndex(a),i<0?o[r].attrPush([a,s]):o[r].attrs[i][1]=s})}function n(r,o){o?o=Array.isArray(o)?o:[o]:o=[],Object.freeze(o);var u=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(a,i,s,l,d){var c=e(a[i],o),f=c&&c.attrs;return f&&t(i,a,f),u(a,i,s,l,d)}}return n.defaultRender=function(r,o,u,a,i){return i.renderToken(r,o,u)},zr=n,zr}var K0=Q0();const J0=nr(K0);function ed(e,t,n,r){const o=Number(e[t].meta.id+1).toString();let u="";return typeof r.docId=="string"&&(u=`-${r.docId}-`),u+o}function td(e,t){let n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=`:${e[t].meta.subId}`),`[${n}]`}function nd(e,t,n,r,o){const u=o.rules.footnote_anchor_name(e,t,n,r,o),a=o.rules.footnote_caption(e,t,n,r,o);let i=u;return e[t].meta.subId>0&&(i+=`:${e[t].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${u}" id="fnref${i}">${a}</a></sup>`}function rd(e,t,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function od(){return`</ol>
</section>
`}function ud(e,t,n,r,o){let u=o.rules.footnote_anchor_name(e,t,n,r,o);return e[t].meta.subId>0&&(u+=`:${e[t].meta.subId}`),`<li id="fn${u}" class="footnote-item">`}function id(){return`</li>
`}function ad(e,t,n,r,o){let u=o.rules.footnote_anchor_name(e,t,n,r,o);return e[t].meta.subId>0&&(u+=`:${e[t].meta.subId}`),` <a href="#fnref${u}" class="footnote-backref">↩︎</a>`}function sd(e){const t=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=nd,e.renderer.rules.footnote_block_open=rd,e.renderer.rules.footnote_block_close=od,e.renderer.rules.footnote_open=ud,e.renderer.rules.footnote_close=id,e.renderer.rules.footnote_anchor=ad,e.renderer.rules.footnote_caption=td,e.renderer.rules.footnote_anchor_name=ed;function r(i,s,l,d){const c=i.bMarks[s]+i.tShift[s],f=i.eMarks[s];if(c+4>f||i.src.charCodeAt(c)!==91||i.src.charCodeAt(c+1)!==94)return!1;let h;for(h=c+2;h<f;h++){if(i.src.charCodeAt(h)===32)return!1;if(i.src.charCodeAt(h)===93)break}if(h===c+2||h+1>=f||i.src.charCodeAt(++h)!==58)return!1;if(d)return!0;h++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const p=i.src.slice(c+2,h-2);i.env.footnotes.refs[`:${p}`]=-1;const b=new i.Token("footnote_reference_open","",1);b.meta={label:p},b.level=i.level++,i.tokens.push(b);const g=i.bMarks[s],y=i.tShift[s],k=i.sCount[s],C=i.parentType,w=h,v=i.sCount[s]+h-(i.bMarks[s]+i.tShift[s]);let E=v;for(;h<f;){const R=i.src.charCodeAt(h);if(n(R))R===9?E+=4-E%4:E++;else break;h++}i.tShift[s]=h-w,i.sCount[s]=E-v,i.bMarks[s]=w,i.blkIndent+=4,i.parentType="footnote",i.sCount[s]<i.blkIndent&&(i.sCount[s]+=i.blkIndent),i.md.block.tokenize(i,s,l,!0),i.parentType=C,i.blkIndent-=4,i.tShift[s]=y,i.sCount[s]=k,i.bMarks[s]=g;const D=new i.Token("footnote_reference_close","",-1);return D.level=--i.level,i.tokens.push(D),!0}function o(i,s){const l=i.posMax,d=i.pos;if(d+2>=l||i.src.charCodeAt(d)!==94||i.src.charCodeAt(d+1)!==91)return!1;const c=d+2,f=t(i,d+1);if(f<0)return!1;if(!s){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const h=i.env.footnotes.list.length,p=[];i.md.inline.parse(i.src.slice(c,f),i.md,i.env,p);const b=i.push("footnote_ref","",0);b.meta={id:h},i.env.footnotes.list[h]={content:i.src.slice(c,f),tokens:p}}return i.pos=f+1,i.posMax=l,!0}function u(i,s){const l=i.posMax,d=i.pos;if(d+3>l||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(d)!==91||i.src.charCodeAt(d+1)!==94)return!1;let c;for(c=d+2;c<l;c++){if(i.src.charCodeAt(c)===32||i.src.charCodeAt(c)===10)return!1;if(i.src.charCodeAt(c)===93)break}if(c===d+2||c>=l)return!1;c++;const f=i.src.slice(d+2,c-1);if(typeof i.env.footnotes.refs[`:${f}`]>"u")return!1;if(!s){i.env.footnotes.list||(i.env.footnotes.list=[]);let h;i.env.footnotes.refs[`:${f}`]<0?(h=i.env.footnotes.list.length,i.env.footnotes.list[h]={label:f,count:0},i.env.footnotes.refs[`:${f}`]=h):h=i.env.footnotes.refs[`:${f}`];const p=i.env.footnotes.list[h].count;i.env.footnotes.list[h].count++;const b=i.push("footnote_ref","",0);b.meta={id:h,subId:p,label:f}}return i.pos=c,i.posMax=l,!0}function a(i){let s,l,d,c=!1;const f={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(p){return p.type==="footnote_reference_open"?(c=!0,l=[],d=p.meta.label,!1):p.type==="footnote_reference_close"?(c=!1,f[":"+d]=l,!1):(c&&l.push(p),!c)}),!i.env.footnotes.list))return;const h=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let p=0,b=h.length;p<b;p++){const g=new i.Token("footnote_open","",1);if(g.meta={id:p,label:h[p].label},i.tokens.push(g),h[p].tokens){s=[];const C=new i.Token("paragraph_open","p",1);C.block=!0,s.push(C);const w=new i.Token("inline","",0);w.children=h[p].tokens,w.content=h[p].content,s.push(w);const v=new i.Token("paragraph_close","p",-1);v.block=!0,s.push(v)}else h[p].label&&(s=f[`:${h[p].label}`]);s&&(i.tokens=i.tokens.concat(s));let y;i.tokens[i.tokens.length-1].type==="paragraph_close"?y=i.tokens.pop():y=null;const k=h[p].count>0?h[p].count:1;for(let C=0;C<k;C++){const w=new i.Token("footnote_anchor","",0);w.meta={id:p,subId:C,label:h[p].label},i.tokens.push(w)}y&&i.tokens.push(y),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",o),e.inline.ruler.after("footnote_inline","footnote_ref",u),e.core.ruler.after("inline","footnote_tail",a)}var qr,Vu;function cd(){if(Vu)return qr;Vu=1;var e=!0,t=!1,n=!1;qr=function(b,g){g&&(e=!g.enabled,t=!!g.label,n=!!g.labelAfter),b.core.ruler.after("inline","github-task-lists",function(y){for(var k=y.tokens,C=2;C<k.length;C++)u(k,C)&&(a(k[C],y.Token),r(k[C-2],"class","task-list-item"+(e?"":" enabled")),r(k[o(k,C-2)],"class","contains-task-list"))})};function r(b,g,y){var k=b.attrIndex(g),C=[g,y];k<0?b.attrPush(C):b.attrs[k]=C}function o(b,g){for(var y=b[g].level-1,k=g-1;k>=0;k--)if(b[k].level===y)return k;return-1}function u(b,g){return c(b[g])&&f(b[g-1])&&h(b[g-2])&&p(b[g])}function a(b,g){if(b.children.unshift(i(b,g)),b.children[1].content=b.children[1].content.slice(3),b.content=b.content.slice(3),t)if(n){b.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);b.children[0].content=b.children[0].content.slice(0,-1)+' id="'+y+'">',b.children.push(d(b.content,y,g))}else b.children.unshift(s(g)),b.children.push(l(g))}function i(b,g){var y=new g("html_inline","",0),k=e?' disabled="" ':"";return b.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+k+'type="checkbox">':(b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+k+'type="checkbox">'),y}function s(b){var g=new b("html_inline","",0);return g.content="<label>",g}function l(b){var g=new b("html_inline","",0);return g.content="</label>",g}function d(b,g,y){var k=new y("html_inline","",0);return k.content='<label class="task-list-item-label" for="'+g+'">'+b+"</label>",k.attrs=[{for:g}],k}function c(b){return b.type==="inline"}function f(b){return b.type==="paragraph_open"}function h(b){return b.type==="list_item_open"}function p(b){return b.content.indexOf("[ ] ")===0||b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0}return qr}var ld=cd();const dd=nr(ld),fd={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},hd=(e,t={})=>{const{markers:n=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=fd,matchCaseSensitive:o=!1,titles:u={},classPrefix:a="markdown-alert"}=t,i=n==="*"?"\\w+":n.join("|"),s=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,o?"":"i");e.core.ruler.after("block","github-alerts",l=>{const d=l.tokens;for(let c=0;c<d.length;c++)if(d[c].type==="blockquote_open"){const f=d[c],h=c;for(;d[c]?.type!=="blockquote_close"&&c<=d.length;)c+=1;const p=d[c],b=c,g=d.slice(h,b+1).find(v=>v.type==="inline");if(!g)continue;const y=g.content.match(s);if(!y)continue;const k=y[1].toLowerCase(),C=y[2].trim()||(u[k]??pd(k)),w=r[k]??"";g.content=g.content.slice(y[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:C,type:k,icon:w},p.type="alert_close",p.tag="div"}}),e.renderer.rules.alert_open=function(l,d){const{title:c,type:f,icon:h}=l[d].meta;return`<div class="${a} ${a}-${f}"><p class="${a}-title">${h}${c}</p>`}};function pd(e){return e.charAt(0).toUpperCase()+e.slice(1)}var N=Symbol("NOT_RESOLVED"),Ao=Symbol("MERGE_KEY");function ae(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify??null,represent:t.represent??(n=>String(n)),representTagName:t.representTagName??null}}function To(e,t){const n=t.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify??null,represent:t.represent??(r=>r),representTagName:t.representTagName??null}}function rr(e,t){const n=t.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify??null,represent:t.represent??(r=>r),representTagName:t.representTagName??null}}var md=ae("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),bd=["","~","null","Null","NULL"],gd=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>bd.indexOf(e)!==-1?null:N,identify:e=>e===null,represent:()=>"null"}),yd=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>e==="null"||t&&e===""?null:N,identify:e=>e===null,represent:()=>"null"}),kd=["","~","null","Null","NULL"],xd=ae("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>kd.indexOf(e)!==-1?null:N,identify:e=>e===null,represent:()=>"null"}),wd=["true","True","TRUE"],Cd=["false","False","FALSE"],vd=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>wd.indexOf(e)!==-1?!0:Cd.indexOf(e)!==-1?!1:N,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),_d=["true"],Sd=["false"],Ed=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>_d.indexOf(e)!==-1?!0:Sd.indexOf(e)!==-1?!1:N,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Ad=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],Td=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Od=ae("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>Ad.indexOf(e)!==-1?!0:Td.indexOf(e)!==-1?!1:N,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Dd=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Md=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Fd(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Id(e,t){if(t){if(!Md.test(e))return N}else if(!Dd.test(e))return N;const n=Fd(e);return Number.isFinite(n)?n:N}var _a=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Id,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Pd=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Rd=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Ld(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Nd(e,t){if(t){if(!Rd.test(e))return N}else if(!Pd.test(e))return N;const n=Ld(e);return Number.isFinite(n)?n:N}var zd=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Nd,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),qd=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Bd(e){let t=e.replace(/_/g,""),n=1;if((t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b"))return n*parseInt(t.slice(2),2);if(t.startsWith("0x"))return n*parseInt(t.slice(2),16);if(t.includes(":")){let r=0;for(const o of t.split(":"))r=r*60+Number(o);return n*r}return t!=="0"&&t[0]==="0"?n*parseInt(t,8):n*parseInt(t,10)}function Hd(e){if(!qd.test(e))return N;const t=Bd(e);return Number.isFinite(t)?t:N}var ao=ae("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Hd,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),$d=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Vd=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Ud(e){if(!$d.test(e))return N;let t=e.toLowerCase();const n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;const r=n*parseFloat(t);return Number.isFinite(r)||Vd.test(e)?r:N}function jd(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var Sa=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Ud,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:jd}),Gd=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),Wd=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Xd(e,t){if(t){if(!Wd.test(e))return N;let r=e.toLowerCase();const o=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return o===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;const u=o*parseFloat(r);return Number.isFinite(u)?u:N}if(!Gd.test(e))return N;const n=Number(e);return Number.isFinite(n)?n:N}function Yd(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var Zd=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Xd,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Yd}),Qd=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Kd=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Jd(e){if(!Qd.test(e))return N;let t=e.toLowerCase().replace(/_/g,"");const n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=0;if(t.includes(":")){for(const o of t.split(":"))r=r*60+Number(o);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Kd.test(e)?r:N}function ef(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var so=ae("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Jd,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:ef}),tf=ae("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>e==="<<"||t&&e===""?Ao:N}),nf=/^[A-Za-z0-9+/]*={0,2}$/;function rf(e){const t=e.replace(/\s/g,"");if(t.length%4!==0||!nf.test(t))return N;const n=atob(t),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}function of(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var uf=ae("tag:yaml.org,2002:binary",{resolve:rf,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:of}),af=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),sf=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function cf(e){let t=af.exec(e);if(t===null&&(t=sf.exec(e)),t===null)return N;const n=+t[1],r=+t[2]-1,o=+t[3];if(!t[4]){const d=new Date(Date.UTC(n,r,o));return d.getUTCFullYear()!==n||d.getUTCMonth()!==r||d.getUTCDate()!==o?N:d}const u=+t[4],a=+t[5],i=+t[6];let s=0;if(u>23||a>59||i>59)return N;if(t[7]){let d=t[7].slice(0,3);for(;d.length<3;)d+="0";s=+d}const l=new Date(Date.UTC(n,r,o,u,a,i,s));if(l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==o)return N;if(t[9]){const d=+t[10],c=+(t[11]||0);if(d>23||c>59)return N;const f=(d*60+c)*6e4;l.setTime(l.getTime()-(t[9]==="-"?-f:f))}return l}var lf=ae("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:cf,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),df=To("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function or(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function Uu(e,t){const n={};for(const r of t)e[r]!==void 0&&(n[r]=e[r]);return n}var ff=To("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return"cannot resolve an ordered map item";n=t.keys().next().value}else if(or(t)){const r=Object.keys(t);if(r.length!==1)return"cannot resolve an ordered map item";n=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(n)?"duplicate key in ordered map":(e.seen.add(n),e.list.push(t),"")},finalize:e=>e.list}),hf=To("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size!==1?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if(Object.prototype.toString.call(t)!=="[object Object]")return"cannot resolve a pairs item";const n=t,r=Object.keys(n);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],n[r[0]]]),"")}}),pf=rr("tag:yaml.org,2002:map",{create:()=>({}),identify:or,represent:e=>{const t=new Map;for(const n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(t!==null&&typeof t=="object")return"object-based map does not support complex keys";const r=String(t);return r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,""},has:(e,t)=>t!==null&&typeof t=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>e[String(t)]}),mf=rr("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{const t=new Map;for(const n of e)t.set(n,null);return t},addPair:(e,t,n)=>n!==null?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function bf(){return{scalar:{},sequence:{},mapping:{}}}function gf(){return{scalar:[],sequence:[],mapping:[]}}function yf(e){const t=[];for(const n of e){let r=t.length;for(let o=0;o<t.length;o++){const u=t[o];if(u.nodeKind===n.nodeKind&&u.tagName===n.tagName&&u.matchByTagPrefix===n.matchByTagPrefix){r=o;break}}t[r]=n}return t}var ur=class Ea{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(t){const n=yf(t),r=[],o=bf(),u=gf();for(const d of n){if(d.nodeKind==="scalar"&&d.implicit){if(d.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(d)}switch(d.nodeKind){case"scalar":d.matchByTagPrefix?u.scalar.push(d):o.scalar[d.tagName]=d;break;case"sequence":d.matchByTagPrefix?u.sequence.push(d):o.sequence[d.tagName]=d;break;case"mapping":d.matchByTagPrefix?u.mapping.push(d):o.mapping[d.tagName]=d;break}}const a=r.filter(d=>d.implicitFirstChars===null),i=new Set;for(const d of r)if(d.implicitFirstChars!==null)for(const c of d.implicitFirstChars)i.add(c);const s=new Map;for(const d of i)s.set(d,r.filter(c=>c.implicitFirstChars===null||c.implicitFirstChars.indexOf(d)!==-1));const l=o.scalar["tag:yaml.org,2002:str"];if(!l)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=n,this.implicitScalarTags=r,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=l,this.defaultSequenceTag=o.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=o.mapping["tag:yaml.org,2002:map"],this.exact=o,this.prefix=u}withTags(...t){let n=[];for(const r of t)n=n.concat(r);return new Ea([...this.tags,...n])}},Oo=new ur([md,df,pf]);new ur([...Oo.tags,yd,Ed,zd,Zd]);var Aa=new ur([...Oo.tags,gd,vd,_a,Sa]),kf=new ur([...Oo.tags,xd,Od,ao,so,lf,tf,uf,ff,hf,mf]);rr("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||or(e),represent:e=>{if(e instanceof Map)return e;const t=new Map,n=e;for(const r of Object.keys(n))t.set(r,n[r]);return t}});function ju(e){if(Array.isArray(e)){const t=Array.prototype.slice.call(e);for(let n=0;n<t.length;n++){if(Array.isArray(t[n]))return null;typeof t[n]=="object"&&Object.prototype.toString.call(t[n])==="[object Object]"&&(t[n]="[object Object]")}return String(t)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}rr("tag:yaml.org,2002:map",{create:()=>({}),identify:or,represent:e=>{const t=new Map;for(const n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{const r=ju(t);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,"")},has:(e,t)=>{const n=ju(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>e[String(t)]});var xf={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Br(e,t,n,r,o){let u="",a="";const i=Math.floor(o/2)-1;return r-t>i&&(u=" ... ",t=r-i+u.length),n-r>i&&(a=" ...",n=r+i-a.length),{str:u+e.slice(t,n).replace(/\t/g,"→")+a,pos:r-t+u.length}}function Hr(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function wf(e,t){if(!e.buffer)return null;const n={...xf,...t},r=/\r?\n|\r|\0/g,o=[0],u=[];let a,i=-1;for(;a=r.exec(e.buffer);)u.push(a.index),o.push(a.index+a[0].length),e.position<=a.index&&i<0&&(i=o.length-2);i<0&&(i=o.length-1);let s="";const l=Math.min(e.line+n.linesAfter,u.length).toString().length,d=n.maxLength-(n.indent+l+3);for(let f=1;f<=n.linesBefore&&!(i-f<0);f++){const h=Br(e.buffer,o[i-f],u[i-f],e.position-(o[i]-o[i-f]),d);s=`${" ".repeat(n.indent)}${Hr((e.line-f+1).toString(),l)} | ${h.str}
${s}`}const c=Br(e.buffer,o[i],u[i],e.position,d);s+=`${" ".repeat(n.indent)}${Hr((e.line+1).toString(),l)} | ${c.str}
`,s+=`${"-".repeat(n.indent+l+3+c.pos)}^
`;for(let f=1;f<=n.linesAfter&&!(i+f>=u.length);f++){const h=Br(e.buffer,o[i+f],u[i+f],e.position-(o[i]-o[i+f]),d);s+=`${" ".repeat(n.indent)}${Hr((e.line+f+1).toString(),l)} | ${h.str}
`}return s.replace(/\n$/,"")}function Gu(e,t){let n="";return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`

${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var Bn=class extends Error{reason;mark;constructor(e,t){super(),this.name="YAMLException",this.reason=e,this.mark=t,this.message=Gu(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Gu(this,e)}`}};function ir(e,t,n,r=""){let o=0,u=0;for(let i=0;i<t;i++){const s=e.charCodeAt(i);s===10?(o++,u=i+1):s===13&&(o++,e.charCodeAt(i+1)===10&&i++,u=i+1)}const a={name:r,buffer:e,position:t,line:o,column:t-u};throw a.snippet=wf(a),new Bn(n,a)}var Cf=-1;function Wu(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Ta=new Array(256),Oa=new Array(256);for(let e=0;e<256;e++)Ta[e]=Wu(e)?1:0,Oa[e]=Wu(e);function vf(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function _f(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Sf(e){return e===120?2:e===117?4:8}function Hn(e,t,n){let r=0;for(;t<n;){const o=e.charCodeAt(t);if(o===10)r++,t++;else if(o===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(o===32||o===9)t++;else break}return{position:t,breaks:r}}function Do(e){return e===1?" ":`
`.repeat(e-1)}function Ef(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===10||i===13){r+=e.slice(u,a);const s=Hn(e,o,n);r+=Do(s.breaks),o=u=a=s.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,a)}function Af(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===39)r+=e.slice(u,o)+"'",o+=2,u=a=o;else if(i===10||i===13){r+=e.slice(u,a);const s=Hn(e,o,n);r+=Do(s.breaks),o=u=a=s.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,n)}function Tf(e,t,n){let r="",o=t,u=t,a=t;for(;o<n;){const i=e.charCodeAt(o);if(i===92){r+=e.slice(u,o),o++;const s=e.charCodeAt(o);if(s===10||s===13)o=Hn(e,o,n).position;else if(s<256&&Ta[s])r+=Oa[s],o++;else{let l=Sf(s),d=0;for(;l>0;l--){o++;const c=_f(e.charCodeAt(o));d=(d<<4)+c}r+=vf(d),o++}u=a=o}else if(i===10||i===13){r+=e.slice(u,a);const s=Hn(e,o,n);r+=Do(s.breaks),o=u=a=s.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,n)}function Xu(e,t,n,r,o,u){const a=r<0?0:r,i=e.slice(t,n).replace(/\r\n?/g,`
`),s=i===""?[]:(i.endsWith(`
`)?i.slice(0,-1):i).split(`
`);let l="",d=!1,c=0,f=!1;for(const h of s){let p=0;for(;p<a&&h.charCodeAt(p)===32;)p++;if(r<0||p>=h.length){c++;continue}const b=h.slice(a),g=b.charCodeAt(0);u?g===32||g===9?(f=!0,l+=`
`.repeat(d?1+c:c)):f?(f=!1,l+=`
`.repeat(c+1)):c===0?d&&(l+=" "):l+=`
`.repeat(c):l+=`
`.repeat(d?1+c:c),l+=b,d=!0,c=0}return o===3?l+=`
`.repeat(d?1+c:c):o!==2&&d&&(l+=`
`),l}function Of(e,t){if(t.valueStart===Cf)return"";const{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case 2:return Af(e,n,r);case 3:return Tf(e,n,r);case 4:return Xu(e,n,r,t.indent,t.chomping,!1);case 5:return Xu(e,n,r,t.indent,t.chomping,!0);default:return Ef(e,n,r)}}var Df={"!":"!","!!":"tag:yaml.org,2002:"};function Da(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return decodeURIComponent(e.slice(2,-1));const n=e.indexOf("!",1),r=n===-1?"!":e.slice(0,n+1),o=t?.[r]??Df[r]??r;return decodeURIComponent(o)+decodeURIComponent(e.slice(r.length))}var Ft=-1,Mo={filename:"",schema:Aa,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Mf(e){return"tagStart"in e&&e.tagStart!==Ft?e.tagStart:"anchorStart"in e&&e.anchorStart!==Ft?e.anchorStart:"valueStart"in e&&e.valueStart!==Ft?e.valueStart:"start"in e?e.start:0}function me(e,t){ir(e.source,e.position,t,e.filename)}function Ma(e,t,n,r){try{return n.finalize(r)}catch(o){if(o instanceof Bn)throw o;ir(e.source,t,o instanceof Error?o.message:String(o),e.filename)}}function Pn(e,t,n){const r=e[n];if(r)return r;for(const o of t)if(n.startsWith(o.tagName))return o}function Ff(e,t,n,r,o){const u=Pn(t,n,r);if(u)return u;me(e,`unknown ${o} tag !<${r}>`)}function If(e,t){const n=Of(e.source,t),r=t.tagStart===Ft?"":e.source.slice(t.tagStart,t.tagEnd),o=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:n,tag:o};const u=Da(r,e.tagHandlers),a=Pn(e.schema.exact.scalar,e.schema.prefix.scalar,u);if(a){const s=a.resolve(n,!0,u);return s===N&&me(e,`cannot resolve a node with !<${u}> explicit tag`),{value:s,tag:a}}const i=Pn(e.schema.exact.mapping,e.schema.prefix.mapping,u)??Pn(e.schema.exact.sequence,e.schema.prefix.sequence,u);if(i){n!==""&&me(e,`cannot resolve a node with !<${u}> explicit tag`);const s=i.create(u);return{value:i.carrierIsResult?s:Ma(e,e.position,i,s),tag:i}}me(e,`unknown scalar tag !<${u}>`)}if(t.style===1){const u=e.schema.implicitScalarByFirstChar.get(n.charAt(0))??e.schema.implicitScalarAnyFirstChar;for(const a of u){const i=a.resolve(n,!1,a.tagName);if(i!==N)return{value:i,tag:a}}}return{value:o.resolve(n,!1,o.tagName),tag:o}}function Yu(e,t,n,r,o,u){const a=t.tagStart===Ft?"":e.source.slice(t.tagStart,t.tagEnd),i=a===""||a==="!"?o:Da(a,e.tagHandlers);return{tagName:i,tag:Ff(e,n,r,i,u)}}function Fa(e){return e.nodeKind==="mapping"}function Zu(e,t,n,r){for(const o of r.keys(n)){if(e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&me(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`),t.tag.has(t.value,o))continue;const u=t.tag.addPair(t.value,o,r.get(n,o));u&&me(e,u),(t.overridable??=new Set).add(o)}}function Pf(e,t,n,r){if(e.position=t.keyPosition,Fa(r))Zu(e,t,n,r);else if(r.nodeKind==="sequence"&&Array.isArray(n))for(const o of n)Zu(e,t,o,t.tag);else me(e,"cannot merge mappings; the provided source object is unacceptable")}function Rf(e,t,n,r,o){if(e.position=t.keyPosition,n===Ao){Pf(e,t,r,o);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&me(e,"duplicated mapping key");const u=t.tag.addPair(t.value,n,r);u&&me(e,u),t.overridable?.delete(n)}function $r(e,t,n){const r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=t,r.hasValue=!0;else if(r.kind==="sequence"){r.merge&&(Fa(n)||me(e,"cannot merge mappings; the provided source object is unacceptable"));const o=r.tag.addItem(r.value,t,r.index++);o&&me(e,o)}else if(r.hasKey){const o=r.key;r.key=void 0,r.hasKey=!1,Rf(e,r,o,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0}function Vr(e,t,n,r,o){if(t.anchorStart!==Ft){const u={value:n,tag:r,isValueFinal:o};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),u),u}return null}function Lf(e,t){const n={...Mo,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){const r=n.events[n.eventIndex++];switch(n.position=Mf(r),r.type){case 1:n.anchors=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(const o of r.directives)o.kind==="tag"&&(n.tagHandlers[o.handle]=o.prefix);n.frames.push({kind:"document",position:n.position,value:void 0,hasValue:!1});break;case 4:{const{value:o,tag:u}=If(n,r);Vr(n,r,o,u,!0),$r(n,o,u);break}case 2:{const o=Yu(n,r,n.schema.exact.sequence,n.schema.prefix.sequence,"tag:yaml.org,2002:seq","sequence"),u=o.tag.create(o.tagName),a=Vr(n,r,u,o.tag,o.tag.carrierIsResult),i=n.frames[n.frames.length-1],s=i!==void 0&&i.kind==="mapping"&&i.hasKey&&i.key===Ao;n.frames.push({kind:"sequence",position:n.position,value:u,tag:o.tag,anchor:a,index:0,merge:s});break}case 3:{const o=Yu(n,r,n.schema.exact.mapping,n.schema.prefix.mapping,"tag:yaml.org,2002:map","mapping"),u=o.tag.create(o.tagName),a=Vr(n,r,u,o.tag,o.tag.carrierIsResult);n.frames.push({kind:"mapping",position:n.position,value:u,tag:o.tag,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,overridable:null});break}case 5:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&me(n,`aliases exceeded maxAliases (${n.maxAliases})`);const o=n.source.slice(r.anchorStart,r.anchorEnd),u=n.anchors.get(o);u||me(n,`unidentified alias "${o}"`),u.isValueFinal||me(n,`recursive alias "${o}" is not supported for tag ${u.tag.tagName} because it uses finalize()`),$r(n,u.value,u.tag);break}case 6:{const o=n.frames.pop();if(o.kind==="document")n.documents.push(o.value);else{const u=o.tag.carrierIsResult?o.value:Ma(n,o.position,o.tag,o.value);o.anchor&&(o.anchor.value=u,o.anchor.isValueFinal=!0),$r(n,u,o.tag)}break}}}return n.documents}var P=-1,Ia=Object.prototype.hasOwnProperty,et=1,co=2,Pa=3,$n=4,Nf=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,zf=/[,\[\]{}]/,Ra=/^(?:!|!!|![0-9A-Za-z-]+!)$/,lo=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,La=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,qf=new RegExp(`^(?:${lo})*$`),Bf=new RegExp(`^(?:${La})+$`),Hf=new RegExp(`^(?:!(?:${lo})*|${La}(?:${lo})*)$`),Fo={filename:"",maxDepth:100};function $f(e,t,n){e.events.push({type:1,explicitStart:t,explicitEnd:n,directives:e.directives})}function Na(e,t,n,r,o,u,a){e.events.push({type:2,start:t,anchorStart:n,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function Jt(e,t,n,r,o,u,a){e.events.push({type:3,start:t,anchorStart:n,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function Ht(e,t,n,r,o,u,a,i,s=1,l=-1,d=!1){e.events.push({type:4,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:o,tagStart:u,tagEnd:a,style:i,chomping:s,indent:l,fast:d})}function Vf(e,t,n){e.events.push({type:5,anchorStart:t,anchorEnd:n})}function It(e){e.events.push({type:6})}function pe(e){Ht(e,P,P,P,P,P,P,1)}function Qu(){return{anchorStart:P,anchorEnd:P,tagStart:P,tagEnd:P}}function en(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function nt(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function O(e,t){ir(e.input.slice(0,e.length),e.position,t,e.filename)}function ee(e){return e===10||e===13}function ht(e){return e===9||e===32}function Ae(e){return ht(e)||ee(e)}function He(e){return e===0||Ae(e)}function pt(e){return e===44||e===91||e===93||e===123||e===125}function Uf(e){return e>=48&&e<=57?e-48:-1}function jf(e){if(e>=48&&e<=57)return e-48;const t=e|32;return t>=97&&t<=102?t-97+10:-1}function Gf(e){return e===120?2:e===117?4:e===85?8:0}function Wf(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function Vn(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function de(e,t){let n=0,r=e.input.charCodeAt(e.position),o=e.position===e.lineStart||Ae(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;ht(r);)o=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&o&&r===35)do r=e.input.charCodeAt(++e.position);while(!ee(r)&&r!==0);if(!ee(r))break;for(Vn(e),n++,o=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function rt(e,t=e.position){const n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){const r=e.input.charCodeAt(t+3);return r===0||Ae(r)}return!1}function Ku(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!ee(t);)t=e.input.charCodeAt(++e.position)}function za(e,t,n){Nf.test(e.input.slice(t,n))&&O(e,"the stream contains non-printable characters")}function Xf(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==P&&O(e,"duplication of a tag property");const r=e.position;let o=!1,u=!1,a="!",i=e.input.charCodeAt(++e.position);i===60?(o=!0,i=e.input.charCodeAt(++e.position)):i===33&&(u=!0,a="!!",i=e.input.charCodeAt(++e.position));let s=e.position,l;if(o){for(;i!==0&&i!==62;)i=e.input.charCodeAt(++e.position);i!==62&&O(e,"unexpected end of the stream within a verbatim tag"),l=e.input.slice(s,e.position),e.position++}else{for(;i!==0&&!Ae(i)&&!(n&&pt(i));)i===33&&(u?O(e,"tag suffix cannot contain exclamation marks"):(a=e.input.slice(s-1,e.position+1),Ra.test(a)||O(e,"named tag handle cannot contain such characters"),u=!0,s=e.position+1)),i=e.input.charCodeAt(++e.position);l=e.input.slice(s,e.position),zf.test(l)&&O(e,"tag suffix cannot contain flow indicator characters")}return l&&!(o?qf.test(l):Bf.test(l))&&O(e,`tag name cannot contain such characters: ${l}`),!o&&a!=="!"&&a!=="!!"&&!Ia.call(e.tagHandlers,a)&&O(e,`undeclared tag handle "${a}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Yf(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==P&&O(e,"duplication of an anchor property"),e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position))&&!pt(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&O(e,"name of an anchor node must contain at least one character"),t.anchorStart=n,t.anchorEnd=e.position,!0}function Zf(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==P||t.tagStart!==P)&&O(e,"alias node should not have any properties"),e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position))&&!pt(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&O(e,"name of an alias node must contain at least one character"),Vf(e,n,e.position),!0}function fo(e,t){de(e,!1),e.lineIndent<t&&O(e,"deficient indentation")}function Qf(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===39){if(e.input.charCodeAt(e.position+1)===39){o=!1,e.position+=2;continue}const a=e.position;return e.position++,Ht(e,r,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2,1,-1,o),!0}ee(u)?(o=!1,fo(e,t)):e.position===e.lineStart&&rt(e)?O(e,"unexpected end of the document within a single quoted scalar"):u!==9&&u<32?O(e,"expected valid JSON character"):e.position++}O(e,"unexpected end of the stream within a single quoted scalar")}function Kf(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===34){const a=e.position;return e.position++,Ht(e,r,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,3,1,-1,o),!0}if(u===92){o=!1;const a=e.input.charCodeAt(++e.position);if(ee(a))fo(e,t);else if(Wf(a))e.position++;else{let i=Gf(a);for(i===0&&O(e,"unknown escape sequence");i-- >0;)e.position++,jf(e.input.charCodeAt(e.position))<0&&O(e,"expected hexadecimal character");e.position++}}else ee(u)?(o=!1,fo(e,t)):e.position===e.lineStart&&rt(e)?O(e,"unexpected end of the document within a double quoted scalar"):u!==9&&u<32?O(e,"expected valid JSON character"):e.position++}O(e,"unexpected end of the stream within a double quoted scalar")}function Jf(e,t,n){const r=e.input.charCodeAt(e.position);let o=1,u=-1,a=!1;if(r!==124&&r!==62)return!1;const i=r===124?4:5;for(e.position++;e.input.charCodeAt(e.position)!==0;){const h=e.input.charCodeAt(e.position),p=Uf(h);if(h===43||h===45)o!==1&&O(e,"repeat of a chomping mode identifier"),o=h===43?3:2,e.position++;else if(p>=0)p===0&&O(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),a&&O(e,"repeat of an indentation width identifier"),u=t+p-1,a=!0,e.position++;else break}let s=!1;for(;ht(e.input.charCodeAt(e.position));)s=!0,e.position++;s&&e.input.charCodeAt(e.position)===35&&Ku(e),ee(e.input.charCodeAt(e.position))?Vn(e):e.input.charCodeAt(e.position)!==0&&O(e,"a line break is expected");let l=a?u:-1,d=0;const c=e.position;let f=e.position;for(;e.input.charCodeAt(e.position)!==0;){const h=e.position;let p=0;for(;e.input.charCodeAt(h+p)===32;)p++;const b=e.input.charCodeAt(h+p);if(b===0){l>=0?p>l&&(f=h+p):p>0&&(f=h+p);break}if(h===e.lineStart&&rt(e,h))break;if(!a&&l===-1&&ee(b)&&(d=Math.max(d,p)),!a&&l===-1&&!ee(b)&&(b===9&&p<t&&(e.position=h+p,O(e,"tab characters must not be used in indentation")),p<d&&(e.position=h+p,O(e,"bad indentation of a mapping entry"))),l===-1&&b!==0&&!ee(b)&&p<t){e.lineIndent=p,e.position=h+p;break}!a&&b!==0&&!ee(b)&&l===-1&&(l=p);const g=l===-1?t+1:l;if(b!==0&&!ee(b)&&p<g){e.lineIndent=p,e.position=h+p;break}Ku(e),f=e.position,ee(e.input.charCodeAt(e.position))&&(Vn(e),f=e.position)}return za(e,c,f),Ht(e,c,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,i,o,l),!0}function eh(e,t){const n=e.input.charCodeAt(e.position),r=t===et;if(n===0||Ae(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||r&&pt(n))return!1;if(n===63||n===45){const o=e.input.charCodeAt(e.position+1);if(He(o)||r&&pt(o))return!1}return!0}function th(e,t,n,r){if(!eh(e,n))return!1;const o=e.position;let u=e.position,a=e.input.charCodeAt(e.position);const i=n===et;let s=!1;for(;a!==0&&!(e.position===e.lineStart&&rt(e));){if(a===58){const l=e.input.charCodeAt(e.position+1);if(He(l)||i&&pt(l))break}else if(a===35){if(Ae(e.input.charCodeAt(e.position-1)))break}else{if(i&&pt(a))break;if(ee(a)){const l=e.position,d=e.line,c=e.lineStart,f=e.lineIndent;if(de(e,!1),e.lineIndent>=t){s=!0,a=e.input.charCodeAt(e.position);continue}e.position=l,e.line=d,e.lineStart=c,e.lineIndent=f;break}}ht(a)||(u=e.position+1),a=e.input.charCodeAt(++e.position)}return u===o?!1:(za(e,o,u),Ht(e,o,u,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1,1,-1,!s),!0)}function st(e,t){const n=e.line;de(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&O(e,"deficient indentation")}function nh(e,t,n){const r=e.input.charCodeAt(e.position),o=r===123,u=e.position;let a=!0;if(r!==91&&r!==123)return!1;const i=o?125:93;for(o?Jt(e,u,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2):Na(e,u,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,2),e.position++;e.input.charCodeAt(e.position)!==0;){st(e,t);let s=e.input.charCodeAt(e.position);if(s===i)return e.position++,It(e),!0;a?s===44&&O(e,"expected the node content, but found ','"):O(e,"missed comma between flow collection entries");let l=!1,d=!1;s===63&&Ae(e.input.charCodeAt(e.position+1))&&(l=d=!0,e.position+=1,st(e,t));const c=e.line,f=en(e),h=$e(e,t,et,!1,!0);st(e,t),s=e.input.charCodeAt(e.position),(o||d||e.line===c)&&s===58?(l=!0,e.position++,st(e,t),o?h||pe(e):(nt(e,f),Jt(e,f.position,P,P,P,P,2),$e(e,t,et,!1,!0)||pe(e),st(e,t),e.position++,st(e,t)),$e(e,t,et,!1,!0)||pe(e),st(e,t),o||It(e)):o&&l?(h||pe(e),pe(e)):o?pe(e):l&&(nt(e,f),Jt(e,f.position,P,P,P,P,2),$e(e,t,et,!1,!0),pe(e),It(e)),s=e.input.charCodeAt(e.position),s===44?(a=!0,e.position++):a=!1}O(e,"unexpected end of the stream within a flow collection")}function Ju(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!He(e.input.charCodeAt(e.position+1)))return!1;for(Na(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,1);e.input.charCodeAt(e.position)===45&&He(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,O(e,"tab characters must not be used in indentation"));const r=e.line;e.position++;const o=de(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&He(e.input.charCodeAt(e.position+1))&&O(e,"bad indentation of a sequence entry"),o&&e.lineIndent<=t?pe(e):$e(e,t,Pa,!1,!0),de(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&O(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&He(e.input.charCodeAt(e.position+1))&&O(e,"bad indentation of a sequence entry")}return It(e),!0}function Ur(e,t,n,r){let o=!1,u=!1,a=!1,i=!1;if(e.firstTabInLine!==-1)return!1;let s=e.input.charCodeAt(e.position);for(;s!==0;){!o&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,O(e,"tab characters must not be used in indentation"));const l=e.input.charCodeAt(e.position+1),d=e.line;if((s===63||s===58)&&He(l))a||(Jt(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0),s===63?(o&&pe(e),u=!0,o=!0):(o||(pe(e),u=!0),o=!1),e.position+=1,i=!0;else{o&&(pe(e),o=!1);const c=en(e);if(!$e(e,n,co,!1,!0))break;if(e.line===d){for(s=e.input.charCodeAt(e.position);ht(s);)s=e.input.charCodeAt(++e.position);if(s===58){if(s=e.input.charCodeAt(++e.position),He(s)||O(e,"a whitespace character is expected after the key-value separator within a block mapping"),!a){for(nt(e,c),Jt(e,c.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0,$e(e,n,co,!1,!0),s=e.input.charCodeAt(e.position);ht(s);)s=e.input.charCodeAt(++e.position);e.position++}u=!0,o=!1,i=!1}else if(u)O(e,"expected ':' after a mapping key");else return r.anchorStart!==P||r.tagStart!==P?(nt(e,c),!1):!0}else if(u)O(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==P||r.tagStart!==P?(nt(e,c),!1):!0}if($e(e,t,$n,!0,i)&&(i=!1),o||i&&(pe(e),i=!1),de(e,!0),s=e.input.charCodeAt(e.position),(e.line===d||e.lineIndent>t)&&s!==0)O(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return u?(o&&pe(e),a&&It(e),!0):!1}function $e(e,t,n,r,o,u=!0){e.depth>=e.maxDepth&&O(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let a=1,i=!1,s=!1,l=null;const d=Qu();let c=n===$n||n===Pa,f=c;const h=c;if(r&&de(e,!0)&&(i=!0,e.lineIndent>t?a=1:e.lineIndent===t?a=0:a=-1),e.position===e.lineStart&&rt(e))return e.depth--,!1;if(a===1)for(;;){const p=e.input.charCodeAt(e.position),b=en(e);if(i&&a!==1&&(p===33||p===38))break;if(i&&h&&(d.tagStart!==P||d.anchorStart!==P)&&(p===33||p===38)){const g=en(e),y=t+1;if(Ur(e,e.position-e.lineStart,y,d)&&e.events[g.eventsLength]?.type===3)return e.depth--,!0;nt(e,g)}if(i&&(p===33&&d.tagStart!==P||p===38&&d.anchorStart!==P)||!Xf(e,d,n===et)&&!Yf(e,d))break;l===null&&(l=b),de(e,!0)?(i=!0,f=h,e.lineIndent>t?a=1:e.lineIndent===t?a=0:a=-1):f=!1}if(f&&(f=i||o),a===1||n===$n){const p=n===et||n===co?t:t+1,b=e.position-e.lineStart;if(a===1)if(f&&(Ju(e,b,d)||Ur(e,b,p,d))||nh(e,p,d))s=!0;else{const g=e.input.charCodeAt(e.position);if(l!==null&&u&&h&&!f&&g!==124&&g!==62){const y=en(e),k=l.position-l.lineStart;nt(e,l),Ur(e,k,p,Qu())&&e.events[y.eventsLength]?.type===3?s=!0:nt(e,y)}!s&&(c&&Jf(e,p,d)||Qf(e,p,d)||Kf(e,p,d)||Zf(e,d)||th(e,p,n,d))&&(s=!0)}else a===0&&(s=f&&Ju(e,b,d))}return c=c&&!s,!s&&(d.anchorStart!==P||d.tagStart!==P||c)&&(Ht(e,P,P,d.anchorStart,d.anchorEnd,d.tagStart,d.tagEnd,1),s=!0),e.depth--,s||d.anchorStart!==P||d.tagStart!==P}function rh(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position));)e.position++;const n=e.input.slice(t,e.position),r=[];for(n.length===0&&O(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position));){for(;ht(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||ee(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;const o=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Ae(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(o,e.position))}if(ee(e.input.charCodeAt(e.position))&&Vn(e),n==="YAML"){e.directives.some(u=>u.kind==="yaml")&&O(e,"duplication of %YAML directive"),r.length!==1&&O(e,"YAML directive accepts exactly one argument");const o=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);o===null&&O(e,"ill-formed argument of the YAML directive"),parseInt(o[1],10)!==1&&O(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(n==="TAG"){r.length!==2&&O(e,"TAG directive accepts exactly two arguments");const[o,u]=r;Ra.test(o)||O(e,"ill-formed tag handle (first argument) of the TAG directive"),Ia.call(e.tagHandlers,o)&&O(e,`there is a previously declared suffix for "${o}" tag handle`),Hf.test(u)||O(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[o]=u,e.directives.push({kind:"tag",handle:o,prefix:u})}return!0}function oh(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(de(e,!0);rh(e);)t=!0,de(e,!0);let n=!1,r=!1,o=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&He(e.input.charCodeAt(e.position+3))){n=!0;const i=e.line;e.position+=3,de(e,!0),o=e.line>i}else t&&O(e,"directives end mark is expected");const u=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&rt(e)){e.position+=3,de(e,!0);return}if($f(e,n,!1),$e(e,e.lineIndent-1,$n,!1,o,o)||pe(e),de(e,!0),e.position===e.lineStart&&rt(e)&&(r=e.input.charCodeAt(e.position)===46,r)){const i=e.line;e.position+=3,de(e,!0),e.line===i&&e.position<e.length&&O(e,"end of the stream or a document separator is expected")}const a=e.events[u];a?.type===1&&(a.explicitEnd=r),It(e),!r&&e.position<e.length&&!(e.position===e.lineStart&&rt(e))&&O(e,"end of the stream or a document separator is expected")}function uh(e,t){const n=e.length,r={...Fo,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},o=e.indexOf("\0");for(o!==-1&&ir(e,o,"null byte is not allowed in input",r.filename),r.input.charCodeAt(r.position)===65279&&r.position++;r.position<r.length&&(de(r,!0),!(r.position>=r.length));){const u=r.position;oh(r),r.position===u&&O(r,"can not read a document")}return r.events}var ih={...Fo,...Mo};function ah(e,t={}){const n={...ih,...t},r=String(e),o=Object.keys(Fo),u=Object.keys(Mo);return Lf(uh(r,Uu(n,o)),{...Uu(n,u),source:r})}function sh(e,t){const n=ah(e,t);if(n.length===0)throw new Bn("expected a document, but the input is empty");if(n.length===1)return n[0];throw new Bn("expected a single document in the stream, but found more")}kf.withTags({...ao,resolve:(e,t,n)=>{const r=ao.resolve(e,t,n);return r===N?_a.resolve(e,t,n):r}},{...so,resolve:(e,t,n)=>{const r=so.resolve(e,t,n);return r===N?Sa.resolve(e,t,n):r}});var jr,ei;function ch(){return ei||(ei=1,jr=function(t,n){var r=3,o="-",u=o.charCodeAt(0),a=o.length;function i(s,l,d,c){var f,h,p,b,g,y,k,C=!1,w=s.bMarks[l]+s.tShift[l],v=s.eMarks[l];if(l!==0||u!==s.src.charCodeAt(0))return!1;for(f=w+1;f<=v;f++)if(o[(f-w)%a]!==s.src[f]){k=f+1;break}if(p=Math.floor((f-w)/a),p<r)return!1;if(f-=(f-w)%a,c)return!0;for(h=l;h++,!(h>=d||s.src.slice(w,v)==="..."||(w=s.bMarks[h]+s.tShift[h],v=s.eMarks[h],w<v&&s.sCount[h]<s.blkIndent));)if(u===s.src.charCodeAt(w)&&!(s.sCount[h]-s.blkIndent>=4)){for(f=w+1;f<=v&&o[(f-w)%a]===s.src[f];f++);if(!(Math.floor((f-w)/a)<p)&&(f-=(f-w)%a,f=s.skipSpaces(f),!(f<v))){C=!0;break}}return g=s.parentType,y=s.lineMax,s.parentType="container",s.lineMax=h,b=s.push("front_matter",null,0),b.hidden=!0,b.markup=s.src.slice(l,f),b.block=!0,b.map=[l,h+(C?1:0)],b.meta=s.src.slice(k,w-1),s.parentType=g,s.lineMax=y,s.line=h+(C?1:0),n(b.meta),!0}t.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),jr}var lh=ch();const dh=nr(lh);function fh(){return e=>{let t="";e.use(dh,n=>{const r=hh(n);r!==void 0?t=qa(r,e.utils.escapeHtml):t=""}),e.renderer.rules.front_matter=(n,r,o,u,a)=>t===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(n[r])}>
${t}
</table>
`}}function hh(e){try{const t=sh(e,{schema:Aa});if(t!==null&&typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length>0)return t}catch{}}function qa(e,t){const n=Object.entries(e);return n.length===0?"":`<tbody>
${n.map(([o,u])=>`<tr><th scope="row">${t(o)}</th><td>${ho(u,t)}</td></tr>`).join(`
`)}
</tbody>`}function ho(e,t){if(e==null)return"";if(e instanceof Date)return t(ph(e));if(Array.isArray(e))return e.every(mh)?e.map(r=>ho(r,t)).join(", "):`<ul>${e.map(r=>`<li>${ho(r,t)}</li>`).join("")}</ul>`;if(typeof e=="object"){const n=qa(e,t);return n===""?"":`<table>${n}</table>`}return t(String(e))}function ph(e){if(Number.isNaN(e.getTime()))return"";const t=e.toISOString();return t.endsWith("T00:00:00.000Z")?t.slice(0,10):t}function mh(e){if(e==null||e instanceof Date)return!0;const t=typeof e;return t==="string"||t==="number"||t==="boolean"||t==="bigint"}const Io={rootValueKey:"extension.markeditPreview",defaultModes:["edit","side-by-side","preview","syntax-hidden"],defaultPreset:"default"},bh=$t(M.MarkEdit.userSettings),we=$t(bh[Io.rootValueKey]),Ba=$t(we.changeMode),Ha=$t(we.markdownIt),gh=bn(we.syncScroll);bn(we.hidePreviewButtons);bn(we.syntaxAutoDetect,!1);const yh=bn(we.imageHoverPreview,!1),kh=bn(we.inlineImages,!1),$a=Array.isArray(we.inlineRendering)?we.inlineRendering.filter(e=>e==="image"||e==="table"||e==="math"||e==="mermaid"||e==="html"):kh?["image","math","mermaid"]:["math","mermaid"],ar=we.themeName??"github",Va=ar==="none",Gr=we.styledHtmlColorScheme??we.styledHtmlTheme??"auto";we.mathDelimiters;const xh=Ba.modes??Io.defaultModes,ti=$t(Ba.hotKey),wh=Ha.preset??Io.defaultPreset,Ch=$t(Ha.options);function $t(e,t={}){return e??t}function bn(e,t=!0){return e??t}const Ua=`.markdown-body {
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
  max-width: 100%;
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
`,vh=`.markdown-body {
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
`,_h=`.markdown-body {
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
`,Sh=`.markdown-body {
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
`,Eh=`.markdown-body {
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
`,Ah=`.markdown-body {
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
`,Th=`.markdown-body {
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
`,Oh=`.markdown-body {
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
`,Dh=`.markdown-body {
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
`,Mh=`.markdown-body {
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
`,Fh=`.markdown-body {
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
`,Ih=`.markdown-body {
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
`,Ph=`.markdown-body {
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
`,Rh=`.markdown-body {
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
`,Lh=`.markdown-body {
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
`,Nh=`.markdown-body {
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
`,zh=`.markdown-body {
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
`,qh=`.markdown-alert {
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
`,Bh=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,Hh=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,$h=`.code-copy-wrapper {
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
`,Nt={github:{light:vh,dark:_h},cobalt:{dark:Sh},dracula:{dark:Eh},minimal:{light:Ah,dark:Th},"night-owl":{dark:Oh},"rose-pine":{light:Dh,dark:Mh},solarized:{light:Fh,dark:Ih},synthwave84:{dark:Ph},"winter-is-coming":{light:Rh,dark:Lh},xcode:{light:Nh,dark:zh}};function Vh(e="auto"){if(Va)return"";const t=Nt[ar]??Nt.github,n=t.light??t.dark,r=t.dark??t.light,o=ku(n)??"#ffffff",u=ku(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...Po(e,`body { background: ${o}; }`,`body { background: ${u}; }`)].join(`
`)}function ja(e,t){const n=Nt[e.replace(/-(light|dark|dawn)$/,"")]??Nt.github,r=t?n.dark??n.light:n.light??n.dark;return`${Ua}
${r}`}function Ga(e="auto"){if(Va)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const t=Nt[ar]??Nt.github,n=t.light??t.dark,r=t.dark??t.light;return[Ua,...Po(e,n,r)].join(`
`)}function Uh(e="auto"){return[qh,...Po(e,Bh,Hh)].join(`
`)}function Wa(){return $h}function Po(e,t,n){const r=[];switch(e){case"light":r.push(t);break;case"dark":r.push(n);break;case"auto":r.push(`
        ${t}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`);break}return r}const jh={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Markdown Source",sideBySideMode:"Preview (Side-by-Side)",previewMode:"Preview (Overlay)",syntaxHiddenMode:"Mixed (Syntax Hidden)",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",failedToCopy:"Failed to copy. Please try again.",untitled:"Untitled",version:"Version",source:"Source",preview:"Preview",goToFootnoteDefinition:"Go to definition [%s]",backToFootnoteReference:"Back to reference [%s]"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"Markdown 源码",sideBySideMode:"预览（并排）",previewMode:"预览（覆盖）",syntaxHiddenMode:"混合（隐藏语法）",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",failedToCopy:"复制失败，请重试。",untitled:"未命名",version:"版本",source:"源码",preview:"预览",goToFootnoteDefinition:"跳转到定义 [%s]",backToFootnoteReference:"返回引用 [%s]"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",failedToCopy:"複製失敗，請再試一次。",editMode:"Markdown 原始碼",sideBySideMode:"預覽（並排）",previewMode:"預覽（覆蓋）",syntaxHiddenMode:"混合（隱藏語法）",untitled:"未命名",version:"版本",source:"原始碼",preview:"預覽",goToFootnoteDefinition:"前往定義 [%s]",backToFootnoteReference:"返回引用 [%s]"}};function Z(e){return Wh[e]}const Gh=["default","zh-CN","zh-TW"],Wh=jh[(()=>{const e=navigator.language;return Gh.includes(e)?e:"default"})()];function Ro(){return typeof M.MarkEdit.addExtension=="function"}async function Lo(e,t=!0){return await No,ie.render(e,{lineInfo:t})}async function Xh(e){await No;const t={lineInfo:!1},n=ie.parse(e,t),r=[];for(let o=0;o<n.length;o+=1){const u=n[o];if(u.type!=="table_open"||u.level!==0||u.map===null)continue;let a=o+1;for(;a<n.length&&n[a].type!=="table_close";)a+=1;a!==n.length&&(r.push({fromLine:u.map[0]+1,toLine:u.map[1],html:ie.renderer.render(n.slice(o,a+1),ie.options,t)}),o=a)}return r}async function Yh(e,t){if(!t.startsWith("#"))return;await No;const n=ie.normalizeLink(t).substring(1);return ie.parse(e,{}).find(o=>o.type==="heading_open"&&o.attrGet("id")===n)?.map?.[0]}const ni=new WeakMap;function Zh(e){const t=(ni.get(e)??0)+1;return ni.set(e,t),t}function Qh(e){Zh(e)}function Xa(e){{e();return}}async function Ya(e){const t=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,t(Vh(Gr)),t(Ga(Gr)),t(Uh(Gr)),t(Wa()),"</body></html>"].join(`
`)}const ie=Ce(wh,{html:!0,breaks:!0,linkify:!0,...Ch}),Kh=[];ie.use(fh());ie.use(Ot);ie.use(J0,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});ie.use(sd);ie.use(dd,{enabled:Ro(),label:!0});ie.use(hd);const Jh=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),No=Promise.all(Kh).then(()=>{for(const e of Jh){const t=ie.renderer.rules[e];ie.renderer.rules[e]=(n,r,o,u,a)=>{const i=n[r];return u.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),t?t(n,r,o,u,a):a.renderToken(n,r,o)}}for(const e of["fence","code_block"]){const t=ie.renderer.rules[e];ie.renderer.rules[e]=(n,r,o,u,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${t===void 0?a.renderToken(n,r,o):t(n,r,o,u,a)}
        <button title="${Z("copyCode")}" aria-label="${Z("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),ep=new DOMParser,tp="image-loader",zo="cm-md-image-preview",ri=5;function Za(e){const t=ep.parseFromString(e,"text/html");return t.querySelectorAll("img").forEach(r=>{const o=r.getAttribute("src");o!==null&&(r.src=sr(o))}),t.body.innerHTML}function sr(e){return e.includes("://")||e.startsWith("//")||e.startsWith("data:image/")?e:`${tp}://${e}`}function np(e){typeof M.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",t=>{tt.panelPresenter!==void 0&&(clearTimeout(tt.panelPresenter),tt.panelPresenter=void 0),tt.panelPresenter=setTimeout(()=>{const n=t.target,r=n?.closest(".cm-md-link"),o=r?.dataset.linkUrl??r?.innerText??"";r!==null&&sc(o)?rp(r,o):n?.classList.contains(zo)||tn()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&tn(!1)}),e.addEventListener("scroll",()=>tn()))}async function rp(e,t){if(e===tt.focusedElement)return;const n=(await M.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;const r=Tt(n,t),o=await M.MarkEdit.getFileObject(r);if(o===void 0)return;const u=e.getBoundingClientRect(),a=document.createElement("img");a.className=zo,a.style.position="fixed",a.style.left=`${u.left}px`,a.style.zIndex="10000",a.style.borderRadius="5px",a.style.opacity="0",a.style.transition="opacity 120ms",a.style.cursor="pointer",a.onclick=()=>{tn(),window.open(t,"_blank")},a.onload=()=>{const s=Math.min(a.naturalHeight,240);a.style.height=`${s}px`;const l=u.top,d=window.innerHeight-u.bottom;l>d?a.style.top=`${u.top-s-ri}px`:a.style.top=`${u.bottom+ri}px`,requestAnimationFrame(()=>{a.style.opacity="1"})};const i=o.mimeType??"image/png";a.src=`data:${i};base64,${o.data}`,tn(!1),tt.focusedElement=e,document.body.appendChild(a)}function tn(e=!0){tt.focusedElement!==void 0&&(tt.focusedElement=void 0,document.querySelectorAll(`.${zo}`).forEach(t=>{e?(t.style.opacity="0",t.addEventListener("transitionend",()=>t.remove(),{once:!0})):t.remove()}))}const tt={panelPresenter:void 0,focusedElement:void 0};function op(e,t){if(!gh)return;Ye.scrollUpdater!==void 0&&clearTimeout(Ye.scrollUpdater);let n=M.MarkEdit.editorView.state.doc,r=M.MarkEdit.editorView.state.selection;Ye.lastSourceScrollTop=e.scrollTop;const o=()=>{const{doc:u,selection:a}=M.MarkEdit.editorView.state,i=u===n&&!a.eq(r);n=u,r=a,!(!i&&Math.abs(e.scrollTop-Ye.lastSourceScrollTop)<.5)&&(Ye.lastSourceScrollTop=e.scrollTop,(i||!t.classList.contains("overlay"))&&Qa(e,t))};"onscrollend"in window?e.addEventListener("scrollend",o):e.addEventListener("scroll",()=>{Ye.scrollUpdater!==void 0&&clearTimeout(Ye.scrollUpdater),Ye.scrollUpdater=setTimeout(o,100)})}function Qa(e,t,n=!0){const{line:r,progress:o}=up(e);ip(t,r,o,n)}function up(e,t=0){const n=M.MarkEdit.editorView,r=n.lineBlockAtHeight(e.scrollTop+t),o=n.state.doc.lineAt(r.from).number-1,u=ic(n.domAtPos(r.from).node);if(u===null)return{line:o,progress:0};const a=e.getBoundingClientRect(),i=u.getBoundingClientRect(),s=a.top-i.top-t,l=i.height>0?qo(s/i.height):0;return{line:o,progress:l}}function ip(e,t,n,r=!0){if(t===0&&n===0)return In(e,0,r);const o=Array.from(document.querySelectorAll("[data-line-from]")),u=ap(o,t);if(u!==void 0){const{from:s,to:l}=Dt(u);return Fn(e,u,sp(t,n,s,l),r)}if(t===0)return In(e,0,r);const{beforeBlock:a,afterBlock:i}=cp(o,t);if(a!==void 0&&i!==void 0){const s=Dt(a),l=Dt(i),d=ro(e,a)+a.offsetHeight,c=ro(e,i),f=l.from-s.to,h=t-s.to+n,p=f>0?qo(h/f):0,b=d+(c-d)*p;return In(e,b,r)}if(a!==void 0)return Fn(e,a,1,r);if(i!==void 0)return Fn(e,i,0,r)}function ap(e,t){return e.find(n=>{const{from:r,to:o}=Dt(n);return t>=r&&t<=o})}function sp(e,t,n,r){const o=r-n;if(o<1)return e===n?t:0;const u=e-n+t;return qo(u/o)}function cp(e,t){let n,r;for(const o of e){const{from:u,to:a}=Dt(o);if(a<t)n=o;else if(u>t){r=o;break}}return{beforeBlock:n,afterBlock:r}}function qo(e){return Math.max(0,Math.min(1,e))}const Ye={lastSourceScrollTop:0,scrollUpdater:void 0};function lp(e){const t=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return t===null?null:{offset:t[1].length,replacement:t[2]===" "?"x":" "}}function dp(e,t){const r=(t.target instanceof Element?t.target.closest("a"):null)?.getAttribute("href")??"";if(!r.startsWith("#"))return!1;const o=fp(e,r);return o&&t.preventDefault(),o}function fp(e,t){if(!t.startsWith("#"))return!1;const n=hp(t.substring(1)),r=[...e.querySelectorAll("[id]")].find(o=>o.id===n);return r===void 0?!1:(Fn(e,r,0,!1),!0)}function hp(e){try{return decodeURIComponent(e)}catch{return e}}const nn={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body"},cr={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"},Ka=new W.Compartment,pp=Ka.of([]);let oi=0;async function Ja(e,t){const n=++oi,r=t?await bp():[];n===oi&&(e.dispatch({effects:Ka.reconfigure(r)}),t&&e.requestMeasure())}let mp;function bp(){return mp??=Promise.resolve().then(()=>Ib).then(e=>e.hiddenSyntaxExtension)}var Wr=function(e,t){return Number(e.slice(0,-1*t.length))},gp=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Wr(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Wr(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Wr(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},es=function(e){return e.split(" ").map(gp)},yp=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=!1);var o=r?e+1:e,u=t.slice(0,o).reduce(function(i,s){return i+s.numeric},0),a=n?e*n:0;return u+a},ts=function(e,t,n){return t.concat(n).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},kp=function(e,t){return t.endsWith(e)?Number(t.slice(0,-1*e.length)):null},ui=function(e){for(var t=0;t<e.length;t++)if(e[t].numeric>0)return t;return null},ft=function(){return!1},xp=function(e,t,n){e.style[t]=n},G=function(e,t,n){var r=e[t];return r!==void 0?r:n};function ns(e){var t;return(t=[]).concat.apply(t,Array.from(e.ownerDocument.styleSheets).map(function(n){var r=[];try{r=Array.from(n.cssRules||[])}catch{}return r})).filter(function(n){var r=!1;try{r=e.matches(n.selectorText)}catch{}return r})}var wp="grid-template-columns",Cp="grid-template-rows",ne=function(t,n,r){this.direction=t,this.element=n.element,this.track=n.track,t==="column"?(this.gridTemplateProp=wp,this.gridGapProp="grid-column-gap",this.cursor=G(r,"columnCursor",G(r,"cursor","col-resize")),this.snapOffset=G(r,"columnSnapOffset",G(r,"snapOffset",30)),this.dragInterval=G(r,"columnDragInterval",G(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=G(r,"gridTemplateColumns")):t==="row"&&(this.gridTemplateProp=Cp,this.gridGapProp="grid-row-gap",this.cursor=G(r,"rowCursor",G(r,"cursor","row-resize")),this.snapOffset=G(r,"rowSnapOffset",G(r,"snapOffset",30)),this.dragInterval=G(r,"rowDragInterval",G(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=G(r,"gridTemplateRows")),this.onDragStart=G(r,"onDragStart",ft),this.onDragEnd=G(r,"onDragEnd",ft),this.onDrag=G(r,"onDrag",ft),this.writeStyle=G(r,"writeStyle",xp),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=n.minSizeStart,this.minSizeEnd=n.minSizeEnd,n.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};ne.prototype.getDimensions=function(){var t=this.grid.getBoundingClientRect(),n=t.width,r=t.height,o=t.top,u=t.bottom,a=t.left,i=t.right;this.direction==="column"?(this.start=o,this.end=u,this.size=r):this.direction==="row"&&(this.start=a,this.end=i,this.size=n)};ne.prototype.getSizeAtTrack=function(t,n){return yp(t,this.computedPixels,this.computedGapPixels,n)};ne.prototype.getSizeOfTrack=function(t){return this.computedPixels[t].numeric};ne.prototype.getRawTracks=function(){var t=ts(this.gridTemplateProp,[this.grid],ns(this.grid));if(!t.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return t[0]};ne.prototype.getGap=function(){var t=ts(this.gridGapProp,[this.grid],ns(this.grid));return t.length?t[0]:null};ne.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};ne.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};ne.prototype.setTracks=function(t){this.tracks=t.split(" "),this.trackValues=es(t)};ne.prototype.setComputedTracks=function(t){this.computedTracks=t.split(" "),this.computedPixels=es(t)};ne.prototype.setGap=function(t){this.gap=t};ne.prototype.setComputedGap=function(t){this.computedGap=t,this.computedGapPixels=kp("px",this.computedGap)||0};ne.prototype.getMousePosition=function(t){return"touches"in t?t.touches[0][this.clientAxis]:t[this.clientAxis]};ne.prototype.startDragging=function(t){if(!("button"in t&&t.button!==0)){t.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=t.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var n=this.trackValues.filter(function(i){return i.type==="%"}),r=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var o=ui(r);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/r[o].numeric)}if(n.length){var u=ui(n);u!==null&&(this.percentageToPixels=this.computedPixels[u].numeric/n[u].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(t)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",ft),this.grid.addEventListener("dragstart",ft),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};ne.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};ne.prototype.drag=function(t){var n=this.getMousePosition(t),r=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,u=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),a=o+this.snapOffset,i=u-this.snapOffset;n<a&&(n=o),n>i&&(n=u),n<o?n=o:n>u&&(n=u);var s=n-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,l=this.bTrackEnd-n+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var d=Math.round(s/this.dragInterval)*this.dragInterval;l-=d-s,s=d}if(s<this.minSizeStart&&(s=this.minSizeStart),l<this.minSizeEnd&&(l=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var c=s/this.frToPixels;this.tracks[this.aTrack]=c+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=s/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=l+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=l/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var p=l/this.percentageToPixels;this.tracks[this.bTrack]=p+"%"}var b=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,b),this.onDrag(this.direction,this.track,b)};ne.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",ft),this.grid.removeEventListener("dragstart",ft),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};ne.prototype.destroy=function(t,n){t===void 0&&(t=!0),t||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),n&&n()):(this.needsDestroy=!0,n&&(this.destroyCb=n))};var ii=function(e,t,n){return t in e?e[t]:n},zt=function(e,t){return function(n){if(n.track<1)throw Error("Invalid track index: "+n.track+". Track must be between two other tracks.");var r=e==="column"?t.columnMinSizes||{}:t.rowMinSizes||{},o=e==="column"?"columnMinSize":"rowMinSize";return new ne(e,Object.assign({},{minSizeStart:ii(r,n.track-1,G(t,o,G(t,"minSize",0))),minSizeEnd:ii(r,n.track+1,G(t,o,G(t,"minSize",0)))},n),t)}},bt=function(t){var n=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:t.columnGutters||[],rowGutters:t.rowGutters||[],columnMinSizes:t.columnMinSizes||{},rowMinSizes:t.rowMinSizes||{}},t),this.options.columnGutters.forEach(function(r){n.columnGutters[r.track]=zt("column",n.options)(r)}),this.options.rowGutters.forEach(function(r){n.rowGutters[r.track]=zt("row",n.options)(r)})};bt.prototype.addColumnGutter=function(t,n){this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=zt("column",this.options)({element:t,track:n})};bt.prototype.addRowGutter=function(t,n){this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=zt("row",this.options)({element:t,track:n})};bt.prototype.removeColumnGutter=function(t,n){var r=this;n===void 0&&(n=!0),this.columnGutters[t]&&this.columnGutters[t].destroy(n,function(){delete r.columnGutters[t]})};bt.prototype.removeRowGutter=function(t,n){var r=this;n===void 0&&(n=!0),this.rowGutters[t]&&this.rowGutters[t].destroy(n,function(){delete r.rowGutters[t]})};bt.prototype.handleDragStart=function(t,n,r){n==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=zt("column",this.options)({track:r}),this.columnGutters[r].startDragging(t)):n==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=zt("row",this.options)({track:r}),this.rowGutters[r].startDragging(t))};bt.prototype.destroy=function(t){var n=this;t===void 0&&(t=!0),Object.keys(this.columnGutters).forEach(function(r){return n.columnGutters[r].destroy(t,function(){delete n.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return n.rowGutters[r].destroy(t,function(){delete n.rowGutters[r]})})};function vp(e){return new bt(e)}const _p=`body .markdown-body details summary,
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
`,Un=document.body,rn=document.createElement("div"),B=document.createElement("div"),ai=Kt("* { cursor: col-resize }",!1),rs=W.Annotation.define();var Pe=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e[e.syntaxHidden=3]="syntaxHidden",e))(Pe||{});function Sp(){Kt(_p),Kt(Ga()),Kt(Wa());const e=document.createElement("div");e.className=nn.dividerViewClass,rn.appendChild(e),rn.className=nn.gutterViewClass,Un.appendChild(rn),B.className=nn.previewPaneClass,Un.appendChild(B),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const o=M.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(B.classList.contains("overlay")||document.activeElement!==o)&&(ac(B),r.preventDefault())}),new MutationObserver(si).observe(B,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{si(),document.querySelector(".mermaid")!==null&&jn()}),typeof M.MarkEdit.getFileInfo=="function"&&typeof M.MarkEdit.openFile=="function"&&B.addEventListener("click",Pp),B.addEventListener("click",r=>{Rp(r),Lp(r)})}function lr(e,t=!0){const n=Te();Be.viewMode=e,e!==n&&localStorage.setItem(cr.viewModeCacheKey,String(e));const r=M.MarkEdit.editorView;Ja(r,e===3),Bo()?r.focus():e===2&&r.contentDOM.blur(),e===1?(Un.classList.add(nn.containerClass),Be.splitter??=vp({columnGutters:[{track:1,element:rn}],minSize:150,onDragStart:()=>ai.disabled=!1,onDragEnd:()=>ai.disabled=!0})):(Un.classList.remove(nn.containerClass),Be.splitter?.destroy(),Be.splitter=void 0),e===2?B.classList.add("overlay"):B.classList.remove("overlay"),t?jn(!0):++Be.renderVersion}function Ep(){const e=xh.map(u=>{switch(u){case"edit":return 0;case"side-by-side":return 1;case"preview":return 2;case"syntax-hidden":return 3;default:return}}).filter(u=>u!==void 0),n=e.some(u=>u===0||u===3)?e:[0,...e],r=n.indexOf(Te()),o=r===-1?0:(r+1)%n.length;lr(n[o])}function Ap(){const e=localStorage.getItem(cr.viewModeCacheKey);if(e===null)return;const t=Number(e);if(Te()===t){t===3&&Ja(M.MarkEdit.editorView,!0);return}lr(t,!0)}function Te(){return Be.viewMode}function Bo(){const e=Te();return e===0||e===3}async function jn(e=Te()!==2||!B.hasChildNodes()){const t=++Be.renderVersion;if(Bo())return;const n=Za(await fr());if(t!==Be.renderVersion)return;const r={top:B.scrollTop,left:B.scrollLeft};B.innerHTML=n;const o=localStorage.getItem(cr.previewPageZoomKey);o!==null&&Rn(o);const u=()=>{e&&t===Be.renderVersion&&Qa(os(),B,!1)};e?u():B.scrollTo(r),Xa(u)}function Tp(e){if(Bo()||Te()===1&&M.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key==="0")return;const t=Number(B.style.zoom)||1,n=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":case"_":Rn(n(t-.1));break;case"=":case"+":Rn(n(t+.1));break;case"0":Rn("1");break;default:return}localStorage.setItem(cr.previewPageZoomKey,B.style.zoom),e.preventDefault(),e.stopPropagation()}function Op(){is(!1)}function Dp(){is(!0)}function Mp(){const e=fr(!1),t=new ClipboardItem({"text/plain":e.then(n=>new Blob([n],{type:"text/plain"}))});return Wi(t,Z("failedToCopy"))}function Fp(){const e=fr(!1),t=new ClipboardItem({"text/html":e.then(n=>new Blob([n],{type:"text/html"})),"text/plain":e.then(n=>new Blob([lc(n)],{type:"text/plain"}))});return Wi(t,Z("failedToCopy"))}function os(){return M.MarkEdit.editorView.scrollDOM}function dr(){return B}async function us(e){const t=await fr(!1);return e?await Ya(t):`<meta charset="UTF-8">
${t}`}async function Ip(e,t){const n=await Lo(e,!1);return t?await Ya(n):`<meta charset="UTF-8">
${n}`}async function fr(e=!0){const t=M.MarkEdit.editorAPI.getText();return await Lo(t,e)}function si(){const e=getComputedStyle(B).backgroundColor;rn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function Rn(e){Qh(B),B.style.zoom=e,B.classList.toggle("zoomed-in",Number(e)>1)}async function is(e){const t=await(async()=>{const r=await M.MarkEdit.getFileInfo();return r===void 0?`${Z("untitled")}.html`:`${uc(r.filePath)}.html`})(),n=await us(e);M.MarkEdit.showSavePanel({fileName:t,string:n})}async function Pp(e){if(!(e.target instanceof Element))return;const t=e.target.closest("a");if(t===null)return;const n=t.getAttribute("href");if(!n?.startsWith("../"))return;const r=(await M.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const o=Tt(r,decodeURIComponent(n));await M.MarkEdit.openFile(o)}catch(o){console.error("Failed to open file:",o)}}}function Rp(e){const t="suppress-underline",n=e.target instanceof Element?e.target.closest("a"):null;n!==null&&dp(B,e),!(n===null||n.classList.contains(t)||!n.matches(":hover"))&&(n.classList.add(t),n.addEventListener("mouseleave",()=>n.classList.remove(t),{once:!0}))}function Lp(e){const t=e.target;if(!(t instanceof HTMLInputElement)||!t.classList.contains("task-list-item-checkbox"))return;const n=t.closest("[data-line-from]");if(n===null){console.error("Failed to find task item block");return}const r=M.MarkEdit.editorAPI,o=r.getLineRange(Dt(n).from),u=lp(r.getText(o));if(u===null){t.checked=!t.checked,console.error("Failed to resolve task toggle");return}const a=o.from+u.offset;M.MarkEdit.editorView.dispatch({changes:{from:a,to:a+1,insert:u.replacement},annotations:rs.of(!0)})}const Be={viewMode:0,splitter:void 0,renderVersion:0},po="markedit-preview",ci=`${po}.js`;function Np(e){const{destExists:t,bundleInfo:n,currentVersion:r}=e,o=n?.version===r,u=n?.fullBuild===!1;return!(t&&o&&u)}async function zp(){try{const e=M.MarkEdit.getDirectoryPath("documents"),t=M.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||t===void 0){console.error("Required directories are not accessible");return}const n=typeof __FILE_PATH__=="string"?__FILE_PATH__:Tt(e,`scripts/${ci}`);if(await M.MarkEdit.getFileInfo(n)===void 0){console.error(`Source file not found at ${n}`);return}const o=n.split("/").pop()??ci,u=Tt(t,"Shared/scripts"),a=Tt(u,o),i=await M.MarkEdit.getFileInfo(a)!==void 0,s=Tt(t,"Shared/metadata.json"),l=await cc(s),d=l[po];if(!Np({destExists:i,bundleInfo:d,currentVersion:"1.12.0"}))return;const c=await M.MarkEdit.getFileContent(n);if(c===void 0){console.error(`Failed to read content from ${n}`);return}await M.MarkEdit.createFile({path:u,isDirectory:!0}),await M.MarkEdit.createFile({path:a,string:c,overwrites:!0}),await M.MarkEdit.createFile({path:s,string:JSON.stringify({...l,[po]:{version:"1.12.0",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const qp='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',Bp='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function Hp(){const e=li(Z("source"),qp),t=li(Z("preview"),Bp),n=document.createElement("div");n.className="quicklook-segmented",n.setAttribute("role","tablist"),n.append(e,t);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(n),{toolbar:r,sourceButton:e,previewButton:t}}function li(e,t){const n=document.createElement("button");n.title=e,n.type="button",n.className="quicklook-segment",n.setAttribute("role","tab"),n.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const o=document.createElement("span");return o.innerHTML=t,o.className="quicklook-segment-icon",n.append(r,o),n}function St(){if(Et!==void 0)return Et;try{Et=localStorage.getItem(as)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),Et="source"}return Et}function di(e){Et=e;try{localStorage.setItem(as,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let Et;const as="ui.quicklook-mode";function $p(){const e=window,t=e.editor?.state?.doc.toString();return typeof t=="string"?t:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function Vp(){document.addEventListener("webkitmouseforcewillbegin",e=>{const t=e.target;t instanceof Element&&t.closest("a")!==null&&e.preventDefault()})}function Up(e,t){const n=window,r=n.pinchZoomTarget;n.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const o=t.querySelector(".quicklook-content");return o!==null?{scroller:t,inner:o}:null};for(const o of["gesturechange","gestureend"])document.addEventListener(o,()=>{if(e()!=="preview")return;const u=t.querySelector(".quicklook-content");u?.style.zoom.length?u?.style.setProperty("--quicklook-zoom",u.style.zoom):u?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function jp(e,t){let n;const r=window,o={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},u=()=>{const i=t.clientHeight,s=t.scrollHeight,l=s-i;if(l<=0||s<=0)return{clientHeight:i,scrollHeight:s,scrollbarHeight:i,scrollbarTop:0};const d=i*(i/s),f=t.scrollTop/l*(i-d);return{clientHeight:i,scrollHeight:s,scrollbarHeight:d,scrollbarTop:f}},a=(i,s,l="auto")=>{const{clientHeight:d,scrollHeight:c,scrollbarHeight:f}=u(),h=d-f;if(h>0){const p=(i-s)/h;t.scrollTo({top:p*(c-d),behavior:l})}};r.startDragging=i=>{if(e()!=="preview"){o.start?.(i);return}const{scrollbarTop:s,scrollbarHeight:l}=u(),d=fi(t,i);n=d-s,(d<s||d>s+l)&&a(d,l*.5,"smooth")},r.updateDragging=i=>{if(e()!=="preview"){o.update?.(i);return}n!==void 0&&a(fi(t,i),n)},r.cancelDragging=()=>{if(e()!=="preview"){o.cancel?.();return}n=void 0}}function Gp(e,t,n){n.addEventListener("wheel",r=>{const o=e()==="preview"?t:document.querySelector(".cm-scroller");o!==null&&(o.scrollTop+=r.deltaY,o.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function Wp(e,t,n){const r=document.querySelector(".cm-scroller"),o=()=>{const a=(e()==="preview"?t:r)?.scrollTop??0;n.classList.toggle("scrolled",a>0),n.classList.toggle("scrolled-far",a>20)};return t.addEventListener("scroll",o,{passive:!0}),r?.addEventListener("scroll",o,{passive:!0}),o}function Xp(e){document.addEventListener("copy",t=>{if(!e.classList.contains("overlay"))return;const n=getSelection(),r=n!==null&&n.rangeCount>0?n.getRangeAt(0):null,o=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,u=o??(()=>{const i=document.createRange();return i.selectNodeContents(e),i})(),a=document.createElement("div");a.appendChild(u.cloneContents()),t.clipboardData?.setData("text/html",a.innerHTML),t.clipboardData?.setData("text/plain",o!==null?o.toString():e.innerText),t.preventDefault(),t.stopPropagation()},!0)}function fi(e,t){return t-e.getBoundingClientRect().top}const Yp=`body {
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
`;function Zp(e){Kt(Yp),document.body.classList.add("quicklook");const{toolbar:t,sourceButton:n,previewButton:r}=Hp();document.body.appendChild(t);const o=Qp(e),u=Wp(St,e,t),a={previewPane:e,sourceButton:n,previewButton:r,refreshSeparator:u,ensureRendered:o.ensureRendered};n.addEventListener("click",()=>{di("source"),Xr(a)}),r.addEventListener("click",()=>{di("preview"),Xr(a)}),Xr(a),setTimeout(o.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(o.invalidate(),St()==="preview"&&o.ensureRendered())}),Vp(),Up(St,e),jp(St,e),Gp(St,e,t),Xp(e)}function Xr(e){const t=St()==="source",n=!t;e.sourceButton.classList.toggle("active",t),e.previewButton.classList.toggle("active",n),e.sourceButton.setAttribute("aria-selected",String(t)),e.previewButton.setAttribute("aria-selected",String(n)),e.previewPane.classList.toggle("overlay",n),e.refreshSeparator(),n&&e.ensureRendered()}function Qp(e){let t=!1,n;return{ensureRendered:()=>(t||n||(n=(async()=>{try{const u=Za(await Lo($p(),!1));e.innerHTML=`<div class="quicklook-content">${u}</div>`,e.querySelectorAll("a[href]").forEach(a=>{a.removeAttribute("href"),a.removeAttribute("target")}),Xa(()=>{}),t=!0}catch(u){throw n=void 0,u}})()),n),invalidate:()=>{t=!1,n=void 0}}}var Ln={exports:{}};var Kp=Ln.exports,hi;function Jp(){return hi||(hi=1,(function(e,t){(function(n,r){e.exports=r()})(Kp,(function(){var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},r=function(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")},o=(function(){function l(d,c){for(var f=0;f<c.length;f++){var h=c[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,c,f){return c&&l(d.prototype,c),f&&l(d,f),d}})(),u=Object.assign||function(l){for(var d=1;d<arguments.length;d++){var c=arguments[d];for(var f in c)Object.prototype.hasOwnProperty.call(c,f)&&(l[f]=c[f])}return l},a=(function(){function l(d){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,l),this.ctx=d,this.iframes=c,this.exclude=f,this.iframesTimeout=h}return o(l,[{key:"getContexts",value:function(){var c=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?c=[]:NodeList.prototype.isPrototypeOf(this.ctx)?c=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?c=this.ctx:typeof this.ctx=="string"?c=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):c=[this.ctx],c.forEach(function(h){var p=f.filter(function(b){return b.contains(h)}).length>0;f.indexOf(h)===-1&&!p&&f.push(h)}),f}},{key:"getIframeContents",value:function(c,f){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},p=void 0;try{var b=c.contentWindow;if(p=b.document,!b||!p)throw new Error("iframe inaccessible")}catch{h()}p&&f(p)}},{key:"isIframeBlank",value:function(c){var f="about:blank",h=c.getAttribute("src").trim(),p=c.contentWindow.location.href;return p===f&&h!==f&&h}},{key:"observeIframeLoad",value:function(c,f,h){var p=this,b=!1,g=null,y=function k(){if(!b){b=!0,clearTimeout(g);try{p.isIframeBlank(c)||(c.removeEventListener("load",k),p.getIframeContents(c,f,h))}catch{h()}}};c.addEventListener("load",y),g=setTimeout(y,this.iframesTimeout)}},{key:"onIframeReady",value:function(c,f,h){try{c.contentWindow.document.readyState==="complete"?this.isIframeBlank(c)?this.observeIframeLoad(c,f,h):this.getIframeContents(c,f,h):this.observeIframeLoad(c,f,h)}catch{h()}}},{key:"waitForIframes",value:function(c,f){var h=this,p=0;this.forEachIframe(c,function(){return!0},function(b){p++,h.waitForIframes(b.querySelector("html"),function(){--p||f()})},function(b){b||f()})}},{key:"forEachIframe",value:function(c,f,h){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},g=c.querySelectorAll("iframe"),y=g.length,k=0;g=Array.prototype.slice.call(g);var C=function(){--y<=0&&b(k)};y||C(),g.forEach(function(w){l.matches(w,p.exclude)?C():p.onIframeReady(w,function(v){f(w)&&(k++,h(v)),C()},C)})}},{key:"createIterator",value:function(c,f,h){return document.createNodeIterator(c,f,h,!1)}},{key:"createInstanceOnIframe",value:function(c){return new l(c.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(c,f,h){var p=c.compareDocumentPosition(h),b=Node.DOCUMENT_POSITION_PRECEDING;if(p&b)if(f!==null){var g=f.compareDocumentPosition(h),y=Node.DOCUMENT_POSITION_FOLLOWING;if(g&y)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(c){var f=c.previousNode(),h=void 0;return f===null?h=c.nextNode():h=c.nextNode()&&c.nextNode(),{prevNode:f,node:h}}},{key:"checkIframeFilter",value:function(c,f,h,p){var b=!1,g=!1;return p.forEach(function(y,k){y.val===h&&(b=k,g=y.handled)}),this.compareNodeIframe(c,f,h)?(b===!1&&!g?p.push({val:h,handled:!0}):b!==!1&&!g&&(p[b].handled=!0),!0):(b===!1&&p.push({val:h,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(c,f,h,p){var b=this;c.forEach(function(g){g.handled||b.getIframeContents(g.val,function(y){b.createInstanceOnIframe(y).forEachNode(f,h,p)})})}},{key:"iterateThroughNodes",value:function(c,f,h,p,b){for(var g=this,y=this.createIterator(f,c,p),k=[],C=[],w=void 0,v=void 0,E=function(){var R=g.getIteratorNode(y);return v=R.prevNode,w=R.node,w};E();)this.iframes&&this.forEachIframe(f,function(D){return g.checkIframeFilter(w,v,D,k)},function(D){g.createInstanceOnIframe(D).forEachNode(c,function(R){return C.push(R)},p)}),C.push(w);C.forEach(function(D){h(D)}),this.iframes&&this.handleOpenIframes(k,c,h,p),b()}},{key:"forEachNode",value:function(c,f,h){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},g=this.getContexts(),y=g.length;y||b(),g.forEach(function(k){var C=function(){p.iterateThroughNodes(c,k,f,h,function(){--y<=0&&b()})};p.iframes?p.waitForIframes(k,C):C()})}}],[{key:"matches",value:function(c,f){var h=typeof f=="string"?[f]:f,p=c.matches||c.matchesSelector||c.msMatchesSelector||c.mozMatchesSelector||c.oMatchesSelector||c.webkitMatchesSelector;if(p){var b=!1;return h.every(function(g){return p.call(c,g)?(b=!0,!1):!0}),b}else return!1}}]),l})(),i=(function(){function l(d){r(this,l),this.ctx=d,this.ie=!1;var c=window.navigator.userAgent;(c.indexOf("MSIE")>-1||c.indexOf("Trident")>-1)&&(this.ie=!0)}return o(l,[{key:"log",value:function(c){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",h=this.opt.log;this.opt.debug&&(typeof h>"u"?"undefined":n(h))==="object"&&typeof h[f]=="function"&&h[f]("mark.js: "+c)}},{key:"escapeStr",value:function(c){return c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(c){return this.opt.wildcards!=="disabled"&&(c=this.setupWildcardsRegExp(c)),c=this.escapeStr(c),Object.keys(this.opt.synonyms).length&&(c=this.createSynonymsRegExp(c)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),this.opt.diacritics&&(c=this.createDiacriticsRegExp(c)),c=this.createMergedBlanksRegExp(c),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.createJoinersRegExp(c)),this.opt.wildcards!=="disabled"&&(c=this.createWildcardsRegExp(c)),c=this.createAccuracyRegExp(c),c}},{key:"createSynonymsRegExp",value:function(c){var f=this.opt.synonyms,h=this.opt.caseSensitive?"":"i",p=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var b in f)if(f.hasOwnProperty(b)){var g=f[b],y=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(b):this.escapeStr(b),k=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g);y!==""&&k!==""&&(c=c.replace(new RegExp("("+this.escapeStr(y)+"|"+this.escapeStr(k)+")","gm"+h),p+("("+this.processSynomyms(y)+"|")+(this.processSynomyms(k)+")")+p))}return c}},{key:"processSynomyms",value:function(c){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),c}},{key:"setupWildcardsRegExp",value:function(c){return c=c.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),c.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(c){var f=this.opt.wildcards==="withSpaces";return c.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(c){return c.replace(/[^(|)\\]/g,function(f,h,p){var b=p.charAt(h+1);return/[(|)\\]/.test(b)||b===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(c){var f=[],h=this.opt.ignorePunctuation;return Array.isArray(h)&&h.length&&f.push(this.escapeStr(h.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?c.split(/\u0000+/).join("["+f.join("")+"]*"):c}},{key:"createDiacriticsRegExp",value:function(c){var f=this.opt.caseSensitive?"":"i",h=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],p=[];return c.split("").forEach(function(b){h.every(function(g){if(g.indexOf(b)!==-1){if(p.indexOf(g)>-1)return!1;c=c.replace(new RegExp("["+g+"]","gm"+f),"["+g+"]"),p.push(g)}return!0})}),c}},{key:"createMergedBlanksRegExp",value:function(c){return c.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(c){var f=this,h="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",p=this.opt.accuracy,b=typeof p=="string"?p:p.value,g=typeof p=="string"?[]:p.limiters,y="";switch(g.forEach(function(k){y+="|"+f.escapeStr(k)}),b){case"partially":default:return"()("+c+")";case"complementary":return y="\\s"+(y||this.escapeStr(h)),"()([^"+y+"]*"+c+"[^"+y+"]*)";case"exactly":return"(^|\\s"+y+")("+c+")(?=$|\\s"+y+")"}}},{key:"getSeparatedKeywords",value:function(c){var f=this,h=[];return c.forEach(function(p){f.opt.separateWordSearch?p.split(" ").forEach(function(b){b.trim()&&h.indexOf(b)===-1&&h.push(b)}):p.trim()&&h.indexOf(p)===-1&&h.push(p)}),{keywords:h.sort(function(p,b){return b.length-p.length}),length:h.length}}},{key:"isNumeric",value:function(c){return Number(parseFloat(c))==c}},{key:"checkRanges",value:function(c){var f=this;if(!Array.isArray(c)||Object.prototype.toString.call(c[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(c),[];var h=[],p=0;return c.sort(function(b,g){return b.start-g.start}).forEach(function(b){var g=f.callNoMatchOnInvalidRanges(b,p),y=g.start,k=g.end,C=g.valid;C&&(b.start=y,b.length=k-y,h.push(b),p=k)}),h}},{key:"callNoMatchOnInvalidRanges",value:function(c,f){var h=void 0,p=void 0,b=!1;return c&&typeof c.start<"u"?(h=parseInt(c.start,10),p=h+parseInt(c.length,10),this.isNumeric(c.start)&&this.isNumeric(c.length)&&p-f>0&&p-h>0?b=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(c))),this.opt.noMatch(c))):(this.log("Ignoring invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:h,end:p,valid:b}}},{key:"checkWhitespaceRanges",value:function(c,f,h){var p=void 0,b=!0,g=h.length,y=f-g,k=parseInt(c.start,10)-y;return k=k>g?g:k,p=k+parseInt(c.length,10),p>g&&(p=g,this.log("End range automatically set to the max value of "+g)),k<0||p-k<0||k>g||p>g?(b=!1,this.log("Invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)):h.substring(k,p).replace(/\s+/g,"")===""&&(b=!1,this.log("Skipping whitespace only range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:k,end:p,valid:b}}},{key:"getTextNodes",value:function(c){var f=this,h="",p=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(b){p.push({start:h.length,end:(h+=b.textContent).length,node:b})},function(b){return f.matchesExclude(b.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){c({value:h,nodes:p})})}},{key:"matchesExclude",value:function(c){return a.matches(c,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(c,f,h){var p=this.opt.element?this.opt.element:"mark",b=c.splitText(f),g=b.splitText(h-f),y=document.createElement(p);return y.setAttribute("data-markjs","true"),this.opt.className&&y.setAttribute("class",this.opt.className),y.textContent=b.textContent,b.parentNode.replaceChild(y,b),g}},{key:"wrapRangeInMappedTextNode",value:function(c,f,h,p,b){var g=this;c.nodes.every(function(y,k){var C=c.nodes[k+1];if(typeof C>"u"||C.start>f){if(!p(y.node))return!1;var w=f-y.start,v=(h>y.end?y.end:h)-y.start,E=c.value.substr(0,y.start),D=c.value.substr(v+y.start);if(y.node=g.wrapRangeInTextNode(y.node,w,v),c.value=E+D,c.nodes.forEach(function(R,X){X>=k&&(c.nodes[X].start>0&&X!==k&&(c.nodes[X].start-=v),c.nodes[X].end-=v)}),h-=v,b(y.node.previousSibling,y.start),h>y.end)f=y.end;else return!1}return!0})}},{key:"wrapMatches",value:function(c,f,h,p,b){var g=this,y=f===0?0:f+1;this.getTextNodes(function(k){k.nodes.forEach(function(C){C=C.node;for(var w=void 0;(w=c.exec(C.textContent))!==null&&w[y]!=="";)if(h(w[y],C)){var v=w.index;if(y!==0)for(var E=1;E<y;E++)v+=w[E].length;C=g.wrapRangeInTextNode(C,v,v+w[y].length),p(C.previousSibling),c.lastIndex=0}}),b()})}},{key:"wrapMatchesAcrossElements",value:function(c,f,h,p,b){var g=this,y=f===0?0:f+1;this.getTextNodes(function(k){for(var C=void 0;(C=c.exec(k.value))!==null&&C[y]!=="";){var w=C.index;if(y!==0)for(var v=1;v<y;v++)w+=C[v].length;var E=w+C[y].length;g.wrapRangeInMappedTextNode(k,w,E,function(D){return h(C[y],D)},function(D,R){c.lastIndex=R,p(D)})}b()})}},{key:"wrapRangeFromIndex",value:function(c,f,h,p){var b=this;this.getTextNodes(function(g){var y=g.value.length;c.forEach(function(k,C){var w=b.checkWhitespaceRanges(k,y,g.value),v=w.start,E=w.end,D=w.valid;D&&b.wrapRangeInMappedTextNode(g,v,E,function(R){return f(R,k,g.value.substring(v,E),C)},function(R){h(R,k)})}),p()})}},{key:"unwrapMatches",value:function(c){for(var f=c.parentNode,h=document.createDocumentFragment();c.firstChild;)h.appendChild(c.removeChild(c.firstChild));f.replaceChild(h,c),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(c){if(c){if(c.nodeType===3)for(;c.nextSibling&&c.nextSibling.nodeType===3;)c.nodeValue+=c.nextSibling.nodeValue,c.parentNode.removeChild(c.nextSibling);else this.normalizeTextNode(c.firstChild);this.normalizeTextNode(c.nextSibling)}}},{key:"markRegExp",value:function(c,f){var h=this;this.opt=f,this.log('Searching with expression "'+c+'"');var p=0,b="wrapMatches",g=function(k){p++,h.opt.each(k)};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),this[b](c,this.opt.ignoreGroups,function(y,k){return h.opt.filter(k,y,p)},g,function(){p===0&&h.opt.noMatch(c),h.opt.done(p)})}},{key:"mark",value:function(c,f){var h=this;this.opt=f;var p=0,b="wrapMatches",g=this.getSeparatedKeywords(typeof c=="string"?[c]:c),y=g.keywords,k=g.length,C=this.opt.caseSensitive?"":"i",w=function v(E){var D=new RegExp(h.createRegExp(E),"gm"+C),R=0;h.log('Searching with expression "'+D+'"'),h[b](D,1,function(X,ye){return h.opt.filter(ye,E,p,R)},function(X){R++,p++,h.opt.each(X)},function(){R===0&&h.opt.noMatch(E),y[k-1]===E?h.opt.done(p):v(y[y.indexOf(E)+1])})};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),k===0?this.opt.done(p):w(y[0])}},{key:"markRanges",value:function(c,f){var h=this;this.opt=f;var p=0,b=this.checkRanges(c);b&&b.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(b)),this.wrapRangeFromIndex(b,function(g,y,k,C){return h.opt.filter(g,y,k,C)},function(g,y){p++,h.opt.each(g,y)},function(){h.opt.done(p)})):this.opt.done(p)}},{key:"unmark",value:function(c){var f=this;this.opt=c;var h=this.opt.element?this.opt.element:"*";h+="[data-markjs]",this.opt.className&&(h+="."+this.opt.className),this.log('Removal selector "'+h+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(p){f.unwrapMatches(p)},function(p){var b=a.matches(p,h),g=f.matchesExclude(p);return!b||g?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(c){this._opt=u({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},c)},get:function(){return this._opt}},{key:"iterator",get:function(){return new a(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),l})();function s(l){var d=this,c=new i(l);return this.mark=function(f,h){return c.mark(f,h),d},this.markRegExp=function(f,h){return c.markRegExp(f,h),d},this.markRanges=function(f,h){return c.markRanges(f,h),d},this.unmark=function(f){return c.unmark(f),d},this}return s}))})(Ln)),Ln.exports}var e1=Jp();const ss=nr(e1),on="markedit-preview-mark",cs="markedit-preview-mark-highlighted";let Zt=!1,Ho,Ve=0,Ee=[],un=null,Tn=null;const pi={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function t1(e){if(Ho=e,Ve=0,e.search.length===0){ls();return}const t=dr();ds(t),o1(t)}function n1(e){Ee.length!==0&&(Ve=e%Ee.length,fs())}function ls(){un?.disconnect(),un=null,Ho=void 0,Ve=0,Ee=[],new ss(dr()).unmark()}function r1(){if(Te()===Pe.preview)return{numberOfItems:Ee.length,currentIndex:Ve}}function ds(e){const t=Ho;if(t===void 0||t.search.length===0||Zt)return;u1(),Zt=!0;const{search:n,caseSensitive:r,wholeWord:o,diacriticInsensitive:u,regexp:a}=t,i=new ss(e),s=()=>{Ee=Array.from(e.querySelectorAll(`.${on}`)),Ve=Ee.length>0?Math.min(Ve,Ee.length-1):0,fs(),Zt=!1};i.unmark({done:()=>{if(a)try{const l=r?"":"i";i.markRegExp(new RegExp(n,l),{className:on,done:s})}catch{Zt=!1,Ve=0,Ee=[]}else i.mark(n,{className:on,caseSensitive:r,diacritics:u,separateWordSearch:!1,accuracy:o?"exactly":"partially",done:s})}})}function fs(){const e=Te()!==Pe.sideBySide;Ee.forEach((t,n)=>{t.classList.toggle(cs,e&&n===Ve)}),e&&Ee.length>0&&Ee[Ve].scrollIntoView({behavior:"smooth",block:"center"})}function o1(e){un?.disconnect(),un=new MutationObserver(()=>{Zt||ds(e)}),un.observe(e,{childList:!0})}function u1(){Tn===null&&(Tn=document.createElement("style"),document.head.appendChild(Tn));const{light:e,dark:t}=pi[ar]??pi.github;Tn.textContent=[`.${on} { background: ${e} !important; color: inherit !important; }`,`.${cs} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${on} { background: ${t} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(Sp(),Ro()?typeof M.MarkEdit.onAppReady=="function"&&M.MarkEdit.onAppReady(zp):Zp(dr()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=us;window.MarkEditRenderHtml??=Ip;window.__markeditPreviewSPI__={performSearch:t1,setSearchMatchIndex:n1,clearSearch:ls,searchCounterInfo:r1};Ro()&&(M.MarkEdit.addMainMenuItem({title:Z("viewMode"),icon:oc()?"eye":void 0,children:[{title:Z("changeMode"),action:Ep,key:ti.key??"V",modifiers:ti.modifiers??["Command"]},{separator:!0},On(Z("editMode"),Pe.edit),On(Z("sideBySideMode"),Pe.sideBySide),On(Z("previewMode"),Pe.preview),On(Z("syntaxHiddenMode"),Pe.syntaxHidden),{separator:!0},...i1(),{separator:!0},{title:`${Z("version")} 1.12.0`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.12.0")}]}),M.MarkEdit.addExtension([T.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(t=>t.annotation(rs))||(ct.renderUpdater!==void 0&&clearTimeout(ct.renderUpdater),ct.renderUpdater=setTimeout(jn,500)))}),pp]),M.MarkEdit.onEditorReady(()=>{yh&&np(M.MarkEdit.editorView.scrollDOM),Ap(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&Te()===Pe.preview&&typeof M.MarkEdit.getFileInfo=="function"&&(await M.MarkEdit.getFileInfo())?.filePath===void 0&&M.MarkEdit.editorAPI.getText().length===0&&lr(Pe.edit,!1)}),jn(),op(os(),dr()),ct.keyDownListener!==void 0&&document.removeEventListener("keydown",ct.keyDownListener),ct.keyDownListener=e=>Tp(e),document.addEventListener("keydown",ct.keyDownListener)}),typeof M.MarkEdit.onEditorConfigChange=="function"&&M.MarkEdit.onEditorConfigChange(e=>{e==="lineHeight"&&Te()===Pe.syntaxHidden&&M.MarkEdit.editorView?.requestMeasure()}));function On(e,t){return{title:e,action:()=>lr(t),state:()=>({isSelected:Te()===t})}}function i1(){const e=[{title:Z("copyHtml"),action:Mp},{title:Z("copyRichText"),action:Fp}];return typeof M.MarkEdit.showSavePanel>"u"?e:[{title:Z("saveCleanHtml"),action:Op},{title:Z("saveStyledHtml"),action:Dp},...e]}const ct={renderUpdater:void 0,keyDownListener:void 0},a1=hs(!1),s1=hs(!0),c1=W.Prec.high(T.keymap.of([{key:"ArrowUp",run:a1,shift:s1}])),l1=T.EditorView.mouseSelectionStyle.of((e,t)=>{if(t.button!==0||t.detail!==1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)return null;const n={x:t.clientX,y:t.clientY};let r=e.posAndSideAtCoords(n,!1);return{get(o){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(o.clientX-n.x),Math.abs(o.clientY-n.y))<=5)return W.EditorSelection.create([W.EditorSelection.cursor(r.pos,r.assoc)]);const a=e.posAndSideAtCoords({x:o.clientX,y:o.clientY},!1);return Number.isFinite(a.pos)?a.pos===r.pos?W.EditorSelection.create([W.EditorSelection.cursor(a.pos,a.assoc)]):W.EditorSelection.create([W.EditorSelection.range(r.pos,a.pos,void 0,void 0,a.assoc)]):e.state.selection},update(o){o.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:o.changes.mapPos(r.pos)})}}});function ge(e,t,n){return e.selection.ranges.some(r=>r.from<=n&&r.to>=t)}function hs(e){return t=>{const n=W.EditorSelection.create(t.state.selection.ranges.map(r=>{let o=r;e&&o.undirectional&&o.head>=o.anchor&&(o=W.EditorSelection.range(o.head,o.anchor));let u=e||o.empty?d1(t,o):W.EditorSelection.cursor(o.from);return!e&&o.empty&&u.head===o.head&&(u=t.moveToLineBoundary(o,!1)),e?W.EditorSelection.range(o.anchor,u.head,u.goalColumn,u.bidiLevel??void 0,u.assoc):u}),t.state.selection.mainIndex);return n.eq(t.state.selection,!0)?!1:(t.dispatch({selection:n,scrollIntoView:!0,userEvent:"select"}),!0)}}function d1(e,t){const n=e.moveVertically(t,!1),r=e.state.doc.lineAt(t.head),o=e.state.doc.lineAt(n.head);if(r.number-o.number<=1)return n;const u=e.state.doc.line(r.number-1);if(!f1(e,u.from))return n;const a=e.lineBlockAt(u.from),i=n.goalColumn,s=e.coordsAtPos(t.head,t.assoc||1),l=i===void 0?s?.left:e.contentDOM.getBoundingClientRect().left+i;if(l===void 0)return n;const d=e.posAndSideAtCoords({x:l,y:e.documentTop+a.top+a.height/2});return d===null||d.pos<u.from||d.pos>u.to?n:W.EditorSelection.cursor(d.pos,d.assoc,void 0,i)}function f1(e,t){for(let n=fe.syntaxTree(e.state).resolve(t,1);n!==null;n=n.parent)if(n.name.startsWith("ATXHeading"))return!0;return!1}const h1={note:"Note",tip:"Tip",important:"Important",warning:"Warning",caution:"Caution"};function p1(e,t){if(e.name!=="Blockquote")return;const n=e.node.getChild("Paragraph");if(n===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==n.from||r.to!==n.to);){if(r.name!=="QuoteMark")return;r=r.nextSibling}if(r===null)return;const o=t.doc.lineAt(n.from),u=t.sliceDoc(n.from,o.to),a=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(u);if(a===null)return;const i=a[1].toLowerCase(),s=n.from,l=s+a[0].length;if(!ge(t,s,l))return{from:s,to:l,type:i,title:h1[i]}}function m1(e,t){if(e.name==="QuoteMark"&&!ge(t,e.from,e.to))return{from:e.from,to:e.to}}function b1(e){if(e.name!=="Blockquote")return;let t=1,n=e.node.parent;for(;n!==null;)n.name==="Blockquote"&&(t+=1),n=n.parent;return{from:e.from,to:e.to,depth:t}}const g1={note:'<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};class y1 extends T.WidgetType{constructor(t,n){super(),this.type=t,this.title=n}eq(t){return t.type===this.type&&t.title===this.title}toDOM(){const t=document.createElement("span");t.className="cm-md-syntaxHiddenAlert",t.dataset.type=this.type;const n=t.appendChild(document.createElement("span"));n.className="cm-md-syntaxHiddenAlertIcon",n.innerHTML=g1[this.type],n.setAttribute("aria-hidden","true");const r=t.appendChild(document.createElement("span"));return r.textContent=this.title,t}ignoreEvent(){return!1}}const k1=T.layer({above:!1,class:"cm-md-syntaxHiddenBlockquoteLayer",markers:w1,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function x1(e){const t=new Map,n=new Map;for(const{from:o,to:u}of e.visibleRanges)fe.syntaxTree(e.state).iterate({from:o,to:u,enter:a=>{const i=b1(a);if(i!==void 0&&t.set(mi(i),i),a.name!=="QuoteMark")return;const s=A1(a.node);if(s===null)return;const l=mi(s),d=e.state.doc.lineAt(a.from).from,c=n.get(l)??new Map;c.set(d,{position:a.from,active:ge(e.state,a.from,a.to)}),n.set(l,c)}});const r=[];return t.forEach((o,u)=>{const a=n.get(u),i=new Set;e.viewportLineBlocks.forEach(s=>{const l=e.state.doc.lineAt(s.from);if(i.has(l.from)||l.to<o.from||l.from>=o.to)return;i.add(l.from);const d=a?.get(l.from);d?.active!==!0&&r.push({line:l.from,ownerFrom:o.from,anchor:d?.position,depth:o.depth})})}),r}function w1(e){const t=E1(e),n=new Map;return x1(e).flatMap(r=>{const u=S1(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(u===void 0||a===null)return[];let i=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(i===void 0){let l=n.get(r.ownerFrom);l===void 0&&(l=_1(e,r.ownerFrom),n.set(r.ownerFrom,l)),i=a.left+l}const s=v1(e,r.anchor??r.ownerFrom);return[new C1(r.depth,i-t.left,u.top-t.top,3,u.height,s.color,s.opacity)]})}class C1 extends T.RectangleMarker{constructor(t,n,r,o,u,a,i){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${t}`,n,r,o,u),this.color=a,this.opacity=i}draw(){const t=super.draw();return t.style.backgroundColor=this.color,t.style.opacity=`${this.opacity}`,t}update(t,n){return super.update(t,n)?(t.style.backgroundColor=this.color,t.style.opacity=`${this.opacity}`,!0):!1}eq(t){return super.eq(t)&&this.color===t.color&&this.opacity===t.opacity}}function v1(e,t){const n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement;let o=1;for(let u=r;u!==null&&u!==e.scrollDOM;u=u.parentElement){const a=parseFloat(getComputedStyle(u).opacity);Number.isNaN(a)||(o*=a)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:o}}function _1(e,t){const n=e.state.doc.lineAt(t),r=e.coordsAtPos(n.from,1),o=e.coordsAtPos(t,1);if(r!==null&&o!==null)return o.left-r.left;let u=0;for(const a of e.state.sliceDoc(n.from,t))u=a==="	"?u+e.state.tabSize-u%e.state.tabSize:u+1;return u*e.defaultCharacterWidth}function S1(e,t){const n=e.domAtPos(t).node;return(n instanceof HTMLElement?n:n.parentElement)?.closest(".cm-line")}function E1(e){const t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===T.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function A1(e){let t=e.parent;for(;t!==null&&t.name!=="Blockquote";)t=t.parent;return t}function mi(e){return`${e.from}:${e.to}`}function ps(e,t){if(e.name!=="ListMark")return;const n=e.node.parent,r=n?.getChild("Task"),o=r?.getChild("TaskMarker");if(!(n?.name!=="ListItem"||n.parent?.name!=="BulletList"||!/^[ \t]$/.test(t.sliceDoc(e.to,e.to+1))||ge(t,e.from,o?.to??e.to)))return{from:e.from,to:e.to,task:r!==null}}const T1=T.layer({above:!1,class:"cm-md-syntaxHiddenListBulletLayer",markers:D1,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function O1(e){const t=[];for(const{from:n,to:r}of e.visibleRanges)fe.syntaxTree(e.state).iterate({from:n,to:r,enter:o=>{const u=ps(o,e.state);u!==void 0&&!u.task&&t.push({from:u.from,to:u.to})}});return t}function D1(e){const t=I1(e);return O1(e).flatMap(n=>{const r=e.coordsForChar(n.from);if(r===null)return[];const o=F1(e,n.from);return[new M1(r.left-t.left,r.top-t.top,r.right-r.left,r.bottom-r.top,o.color,o.opacity,o.textShadow)]})}class M1 extends T.RectangleMarker{constructor(t,n,r,o,u,a,i){super("cm-md-syntaxHiddenListBullet",t,n,r,o),this.color=u,this.opacity=a,this.textShadow=i}draw(){const t=super.draw();return t.textContent="•",t.style.color=this.color,t.style.opacity=`${this.opacity}`,t.style.textShadow=this.textShadow,t}update(t,n){return super.update(t,n)?(t.style.color=this.color,t.style.opacity=`${this.opacity}`,t.style.textShadow=this.textShadow,!0):!1}eq(t){return super.eq(t)&&this.color===t.color&&this.opacity===t.opacity&&this.textShadow===t.textShadow}}function F1(e,t){const n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,o=getComputedStyle(r??e.contentDOM);let u=1;for(let a=r;a!==null&&a!==e.scrollDOM;a=a.parentElement){const i=parseFloat(getComputedStyle(a).opacity);Number.isNaN(i)||(u*=i)}return{color:o.color,opacity:u,textShadow:o.textShadow==="none"?"":o.textShadow}}function I1(e){const t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===T.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}const bi=typeof ResizeObserver>"u"?void 0:new ResizeObserver(e=>{for(const t of e)N1(t.target)}),P1=[T.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=gi(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(t=>t.reconfigured))&&(this.decorations=gi(e.view))}},{decorations:e=>e.decorations}),T.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:"inline-block",position:"relative",height:"1lh",margin:"0",textIndent:"0",verticalAlign:"top"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:"absolute",insetBlockStart:"0",insetInlineStart:"-0.15em",display:"grid",placeItems:"center",width:"1em",height:"1lh"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:"0",transform:"translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))"}})];function R1(e){const t=[];for(const{from:n,to:r}of e.visibleRanges)fe.syntaxTree(e.state).iterate({from:n,to:r,enter:o=>{if(o.name!=="TaskMarker")return;const u=o.node.parent,a=u?.parent,i=a?.getChild("ListMark"),s=o.to+1;u?.name==="Task"&&a?.name==="ListItem"&&a.parent?.name==="BulletList"&&i!==null&&i!==void 0&&e.state.sliceDoc(o.to,s)===" "&&!ge(e.state,i.from,o.to)&&t.push({from:i.from,to:s,markerFrom:o.from,listPrefix:e.state.sliceDoc(i.from,i.to+1),checked:e.state.sliceDoc(o.from,o.to)!=="[ ]",label:e.state.sliceDoc(s,e.state.doc.lineAt(o.to).to).trim()||"Task"})}});return t}function gi(e){const t=e.state.readOnly||!e.state.facet(T.EditorView.editable),n=R1(e).map(r=>T.Decoration.replace({widget:new L1(r.markerFrom,r.listPrefix,r.checked,r.label,t)}).range(r.from,r.to));return T.Decoration.set(n,!0)}class L1 extends T.WidgetType{constructor(t,n,r,o,u){super(),this.markerFrom=t,this.listPrefix=n,this.checked=r,this.label=o,this.disabled=u}eq(t){return this.markerFrom===t.markerFrom&&this.listPrefix===t.listPrefix&&this.checked===t.checked&&this.label===t.label&&this.disabled===t.disabled}toDOM(t){const n=document.createElement("span");n.className="cm-md-syntaxHiddenTaskCheckboxFrame";const r=n.appendChild(document.createElement("span"));r.className="cm-md-syntaxHiddenTaskCheckboxMarker",r.textContent=this.listPrefix;const o=n.appendChild(document.createElement("span"));o.className="cm-md-syntaxHiddenTaskCheckboxControl";const u=o.appendChild(document.createElement("input"));return u.className="cm-md-syntaxHiddenTaskCheckbox",u.type="checkbox",this.updateInput(u),u.addEventListener("change",()=>z1(t,Number(u.dataset.markerFrom),u.checked)),bi?.observe(n),n}updateDOM(t){const n=t.querySelector(".cm-md-syntaxHiddenTaskCheckbox");return n===null?!1:(this.updateInput(n),!0)}destroy(t){bi?.unobserve(t)}ignoreEvent(){return!0}updateInput(t){t.checked=this.checked,t.disabled=this.disabled,t.dataset.markerFrom=`${this.markerFrom}`,t.setAttribute("aria-label",this.label)}}function N1(e){const t=e.querySelector(".cm-md-syntaxHiddenTaskCheckbox");if(t===null||t.offsetWidth===0)return;const n=parseFloat(getComputedStyle(e).fontSize);t.style.setProperty("--cm-md-task-checkbox-scale",`${n/t.offsetWidth}`)}function z1(e,t,n){const r=e.state.sliceDoc(t,t+3);if(e.state.readOnly||!e.state.facet(T.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;const o=e.state.changes({from:t+1,to:t+2,insert:n?"x":" "});e.dispatch({changes:o,effects:e.scrollSnapshot().map(o)??[],userEvent:"input"})}const q1=/^\[\^[^\][\s]+\]$/,yi=new WeakMap;function B1(e,t,n){if(!["Link","Image","Autolink"].includes(e.name)||ge(t,e.from,e.to))return;const r=j1(e.node);if(e.name==="Autolink"){if(r.length<2)return;const d=t.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(d)?{hidden:r.map(c=>({from:c.from,to:c.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:d,highlightTags:Gn(e.node)}:void 0}if(r.length<2||$o(e,t).length>0)return;const o=e.node.getChild("LinkLabel");if(r.length===2&&(o===null||o.to-o.from===2))return;const u=e.node.getChild("URL");if(r.length>2&&u===null||["(","["].includes(t.sliceDoc(e.to,e.to+1)))return;const a=r[0],i=r[1],s=t.sliceDoc(a.to,i.from);if(!/\S/.test(s)||s.startsWith("^")&&e.to===i.to)return;const l=u===null?V1(o,t,n):t.sliceDoc(u.from,u.to);if(!(e.name==="Image"&&u===null&&l===""))return{hidden:[{from:a.from,to:a.to},{from:i.from,to:e.to}],label:{from:a.to,to:i.from},image:e.name==="Image",destination:l,highlightTags:Gn(e.node)}}function $o(e,t){if(e.name!=="Link")return[];const n=t.sliceDoc(e.from,e.to),r=/\[\^[^\][\s]+\]/g,o=[];for(let u=r.exec(n);u!==null;u=r.exec(n))o.push(u);return o.map(u=>u[0]).join("")!==n?[]:o.map(u=>({from:e.from+u.index,to:e.from+u.index+u[0].length,label:u[0].slice(1,-1),highlightTags:Gn(e.node)}))}function H1(e,t){if(!(e.name!=="LinkDefinition"||ge(t,e.from,e.to+1)||!q1.test(t.sliceDoc(e.from,e.to))||t.sliceDoc(e.to,e.to+1)!==":"))return{hidden:[{from:e.from+1,to:e.from+2}],label:t.sliceDoc(e.from+1,e.to-1),highlightTags:Gn(e.node),suffixPosition:e.to+1,suffix:/^[ \t]/.test(t.sliceDoc(e.to+1,e.to+2))?"":" "}}function Gn(e){const t=[];for(let r=e;r!==null;r=r.parent)t.unshift(r);const n=new Set;for(const r of t){const o=ce.getStyleTags(r);o!==null&&(r===e||o.inherit)&&o.tags.forEach(u=>n.add(u))}return[...n]}function $1(e){const t=fe.syntaxTree(e);let n;return r=>{const o=yi.get(t);return n??=o?.doc===e.doc?o.destinations:void 0,n===void 0&&(n=U1(e,t),yi.set(t,{doc:e.doc,destinations:n})),n.get(ms(r))??""}}function V1(e,t,n){return e===null?"":n(t.sliceDoc(e.from+1,e.to-1))}function U1(e,t){const n=new Map;return t.iterate({enter:r=>{if(r.name!=="LinkDefinitionID")return;const o=ms(e.sliceDoc(r.from,r.to));if(n.has(o))return;const u=e.doc.lineAt(r.to),a=e.sliceDoc(r.node.parent?.to??r.to,u.to),i=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),s=i?.[1]??i?.[2];s!==void 0&&n.set(o,s)}}),n}function ms(e){return e.trim().replace(/\s+/g," ").toLowerCase()}function j1(e){const t=[];for(let n=e.firstChild;n!==null;n=n.nextSibling)n.name==="LinkMark"&&t.push(n);return t}const G1=/^(?:vbscript|javascript|file|data):/,W1=/^data:image\/(?:gif|png|jpeg|webp);/;function X1(e){const t=e.trim().toLowerCase();return G1.test(t)&&!W1.test(t)?!1:(window.open(e,"_blank","noopener"),!0)}async function ki(e,t,n="definition"){const r=e.state,o=fe.ensureSyntaxTree(r,r.doc.length,5e3);if(o===null)return!1;let u;return o.iterate({enter:a=>{if(u!==void 0)return!1;if(n==="reference"){const i=$o(a,r).find(s=>s.label===t);i!==void 0&&(u=W.EditorSelection.range(i.from,i.to))}else a.name==="LinkDefinition"&&r.sliceDoc(a.from,a.to)===`[${t}]`&&(u=W.EditorSelection.range(a.from,a.to))}}),u===void 0?(Gi(),!1):(bs(e,u),!0)}async function Y1(e,t){const n=e.state.doc,r=n.toString(),o=await Yh(r,t);if(o===void 0||e.state.doc!==n)return!1;const u=e.state.doc.line(o+1).from;return bs(e,W.EditorSelection.cursor(u)),!0}function bs(e,t){const n=e.state.doc,r=e.scrollDOM.scrollTop,o=u=>e.dispatch({effects:T.EditorView.scrollIntoView(t.from,{y:u,yMargin:5})});e.dispatch({selection:t}),o("start"),setTimeout(()=>{e.state.doc===n&&Math.abs(e.scrollDOM.scrollTop-r)<.001&&o("center")},50)}const Z1={link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>',footnoteBack:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>'};class Yr extends T.WidgetType{constructor(t,n,r,o,u){super(),this.kind=t,this.destination=r,this.label=o,this.highlightClasses=fe.highlightingFor(n,u)??""}highlightClasses;toDOM(t){const n=document.createElement("button");return n.type="button",n.className=["cm-md-syntaxHiddenLinkButton",this.highlightClasses].filter(Boolean).join(" "),n.dataset.kind=this.kind,n.title=this.kind==="footnote"||this.kind==="footnoteBack"?Z(this.kind==="footnote"?"goToFootnoteDefinition":"backToFootnoteReference").replace("%s",()=>this.destination.slice(1)):this.destination,n.innerHTML=Z1[this.kind==="footnote"?"link":this.kind],n.setAttribute("aria-label",n.title||this.label),n.addEventListener("click",r=>{r.stopPropagation(),this.kind==="footnote"?ki(t,this.destination):this.kind==="footnoteBack"?ki(t,this.destination,"reference"):this.destination.startsWith("#")?Y1(t,this.destination):this.destination!==""?X1(this.destination):Gi()}),n}eq(t){return t.kind===this.kind&&t.highlightClasses===this.highlightClasses&&t.destination===this.destination&&t.label===this.label}ignoreEvent(){return!0}}class Q1 extends T.WidgetType{constructor(t){super(),this.text=t}eq(t){return t.text===this.text}toDOM(){const t=document.createElement("span");return t.textContent=this.text,t}ignoreEvent(){return!1}}class K1 extends T.WidgetType{constructor(t,n){super(),this.destination=t,this.label=n}toDOM(){const t=document.createElement("img");return t.className="cm-md-syntaxHiddenImage",t.src=sr(this.destination),t.alt=this.label,t.title=this.destination,t.draggable=!1,t}eq(t){return t.destination===this.destination&&t.label===this.label}ignoreEvent(){return!1}}const J1=55,em=1,tm=56,nm=2,rm=57,om=3,xi=4,um=5,Vo=6,gs=7,ys=8,ks=9,xs=10,im=11,am=12,sm=13,Zr=58,cm=14,lm=15,wi=59,dm=21,fm=37,hm=0,pm=1,mm={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},bm={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},Ci={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}};function gm(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}let vi=null,_i=null,Si=0;function mo(e,t){let n=e.pos+t;if(Si==n&&_i==e)return vi;let r=e.peek(t),o="";for(;gm(r);)o+=String.fromCharCode(r),r=e.peek(++t);return _i=e,Si=n,vi=o?o.toLowerCase():r==ym||r==km?void 0:null}const ws=60,Wn=62,Uo=47,ym=63,km=33,xm=45;function Ei(e,t){this.name=e,this.parent=t}const wm=[Vo,xs,gs,ys,ks],Cm=new qt.ContextTracker({start:null,shift(e,t,n,r){return wm.indexOf(t)>-1?new Ei(mo(r,1)||"",e):e},reduce(e,t){return t==dm&&e?e.parent:e},reuse(e,t,n,r){let o=t.type.id;return o==Vo||o==fm?new Ei(mo(r,1)||"",e):e},strict:!1}),vm=new qt.ExternalTokenizer((e,t)=>{if(e.next!=ws){e.next<0&&t.context&&e.acceptToken(Zr);return}e.advance();let n=e.next==Uo;n&&e.advance();let r=mo(e,0);if(r===void 0)return;if(!r)return e.acceptToken(n?lm:cm);let o=t.context?t.context.name:null;if(n){if(r==o)return e.acceptToken(im);if(o&&bm[o])return e.acceptToken(Zr,-2);if(t.dialectEnabled(hm))return e.acceptToken(am);for(let u=t.context;u;u=u.parent)if(u.name==r)return;e.acceptToken(sm)}else{if(r=="script")return e.acceptToken(gs);if(r=="style")return e.acceptToken(ys);if(r=="textarea")return e.acceptToken(ks);if(mm.hasOwnProperty(r))return e.acceptToken(xs);o&&Ci[o]&&Ci[o][r]?e.acceptToken(Zr,-1):e.acceptToken(Vo)}},{contextual:!0}),_m=new qt.ExternalTokenizer(e=>{for(let t=0,n=0;;n++){if(e.next<0){n&&e.acceptToken(wi);break}if(e.next==xm)t++;else if(e.next==Wn&&t>=2){n>=3&&e.acceptToken(wi,-2);break}else t=0;e.advance()}});function Sm(e){for(;e;e=e.parent)if(e.name=="svg"||e.name=="math")return!0;return!1}const Em=new qt.ExternalTokenizer((e,t)=>{if(e.next==Uo&&e.peek(1)==Wn){let n=t.dialectEnabled(pm)||Sm(t.context);e.acceptToken(n?um:xi,2)}else e.next==Wn&&e.acceptToken(xi,1)});function jo(e,t,n){let r=2+e.length;return new qt.ExternalTokenizer(o=>{for(let u=0,a=0,i=0;;i++){if(o.next<0){i&&o.acceptToken(t);break}if(u==0&&o.next==ws||u==1&&o.next==Uo||u>=2&&u<r&&o.next==e.charCodeAt(u-2))u++,a++;else if(u==r&&o.next==Wn){i>a?o.acceptToken(t,-a):o.acceptToken(n,-(a-2));break}else if((o.next==10||o.next==13)&&i){o.acceptToken(t,1);break}else u=a=0;o.advance()}})}const Am=jo("script",J1,em),Tm=jo("style",tm,nm),Om=jo("textarea",rm,om),Dm=ce.styleTags({"Text RawText IncompleteTag IncompleteCloseTag":ce.tags.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":ce.tags.angleBracket,TagName:ce.tags.tagName,"MismatchedCloseTag/TagName":[ce.tags.tagName,ce.tags.invalid],AttributeName:ce.tags.attributeName,"AttributeValue UnquotedAttributeValue":ce.tags.attributeValue,Is:ce.tags.definitionOperator,"EntityReference CharacterReference":ce.tags.character,Comment:ce.tags.blockComment,ProcessingInst:ce.tags.processingInstruction,DoctypeDecl:ce.tags.documentMeta}),Cs=qt.LRParser.deserialize({version:14,states:",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",stateData:",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",goto:"%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:"⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",maxTerm:68,context:Cm,nodeProps:[["closedBy",-10,1,2,3,7,8,9,10,11,12,13,"EndTag",6,"EndTag SelfClosingEndTag",-4,22,31,34,37,"CloseTag"],["openedBy",4,"StartTag StartCloseTag",5,"StartTag",-4,30,33,36,38,"OpenTag"],["group",-10,14,15,18,19,20,21,40,41,42,43,"Entity",17,"Entity TextContent",-3,29,32,35,"TextContent Entity"],["isolate",-11,22,30,31,33,34,36,37,38,39,42,43,"ltr",-3,27,28,40,""]],propSources:[Dm],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[Am,Tm,Om,Em,vm,_m,0,1,2,3,4,5],topRules:{Document:[0,16]},dialects:{noMatch:0,selfClosing:515},tokenPrec:517});function Ai(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Mm(e){if(Array.isArray(e))return e}function Fm(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,u,a,i=[],s=!0,l=!1;try{if(u=(n=n.call(e)).next,t!==0)for(;!(s=(r=u.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(d){l=!0,o=d}finally{try{if(!s&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}function Im(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Pm(e,t){return Mm(e)||Fm(e,t)||Rm(e,t)||Im()}function Rm(e,t){if(e){if(typeof e=="string")return Ai(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ai(e,t):void 0}}const vs=Object.entries,Ti=Object.setPrototypeOf,Lm=Object.isFrozen,Nm=Object.getPrototypeOf,zm=Object.getOwnPropertyDescriptor;let re=Object.freeze,oe=Object.seal,At=Object.create,_s=typeof Reflect<"u"&&Reflect,bo=_s.apply,go=_s.construct;re||(re=function(t){return t});oe||(oe=function(t){return t});bo||(bo=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),u=2;u<r;u++)o[u-2]=arguments[u];return t.apply(n,o)});go||(go=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});const vt=Y(Array.prototype.forEach),qm=Y(Array.prototype.lastIndexOf),Oi=Y(Array.prototype.pop),_t=Y(Array.prototype.push),Bm=Y(Array.prototype.splice),Ke=Array.isArray,Qt=Y(String.prototype.toLowerCase),Qr=Y(String.prototype.toString),Di=Y(String.prototype.match),Wt=Y(String.prototype.replace),Mi=Y(String.prototype.indexOf),Hm=Y(String.prototype.trim),$m=Y(Number.prototype.toString),Vm=Y(Boolean.prototype.toString),Fi=typeof BigInt>"u"?null:Y(BigInt.prototype.toString),Ii=typeof Symbol>"u"?null:Y(Symbol.prototype.toString),J=Y(Object.prototype.hasOwnProperty),Xt=Y(Object.prototype.toString),Q=Y(RegExp.prototype.test),lt=Um(TypeError);function Y(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return bo(e,t,r)}}function Um(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return go(e,n)}}function L(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qt;if(Ti&&Ti(e,null),!Ke(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){const u=n(o);u!==o&&(Lm(t)||(t[r]=u),o=u)}e[o]=!0}return e}function jm(e){for(let t=0;t<e.length;t++)J(e,t)||(e[t]=null);return e}function le(e){const t=At(null);for(const r of vs(e)){var n=Pm(r,2);const o=n[0],u=n[1];J(e,o)&&(Ke(u)?t[o]=jm(u):u&&typeof u=="object"&&u.constructor===Object?t[o]=le(u):t[o]=u)}return t}function Gm(e){switch(typeof e){case"string":return e;case"number":return $m(e);case"boolean":return Vm(e);case"bigint":return Fi?Fi(e):"0";case"symbol":return Ii?Ii(e):"Symbol()";case"undefined":return Xt(e);case"function":case"object":{if(e===null)return Xt(e);const t=e,n=Ie(t,"toString");if(typeof n=="function"){const r=n(t);return typeof r=="string"?r:Xt(r)}return Xt(e)}default:return Xt(e)}}function Ie(e,t){for(;e!==null;){const r=zm(e,t);if(r){if(r.get)return Y(r.get);if(typeof r.value=="function")return Y(r.value)}e=Nm(e)}function n(){return null}return n}function Wm(e){try{return Q(e,""),!0}catch{return!1}}const Pi=re(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kr=re(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Jr=re(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xm=re(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),eo=re(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ym=re(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ri=re(["#text"]),Li=re(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),to=re(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ni=re(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Dn=re(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zm=oe(/{{[\w\W]*|^[\w\W]*}}/g),Qm=oe(/<%[\w\W]*|^[\w\W]*%>/g),Km=oe(/\${[\w\W]*/g),Jm=oe(/^data-[\-\w.\u00B7-\uFFFF]+$/),eb=oe(/^aria-[\-\w]+$/),zi=oe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),tb=oe(/^(?:\w+script|data):/i),nb=oe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rb=oe(/^html$/i),ob=oe(/^[a-z][.\w]*(-[.\w]+)+$/i),qi=oe(/<[/\w!]/g),Bi=oe(/<[/\w]/g),ub=oe(/<\/no(script|embed|frames)/i),ib=oe(/\/>/i),ke={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ab=function(){return typeof window>"u"?null:window},sb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));const u="dompurify"+(r?"#"+r:"");try{return t.createPolicy(u,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+u+" could not be created."),null}},Hi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ze=function(t,n,r,o){return J(t,n)&&Ke(t[n])?L(o.base?le(o.base):{},t[n],o.transform):r};function Ss(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ab();const t=S=>Ss(S);if(t.version="3.4.12",t.removed=[],!e||!e.document||e.document.nodeType!==ke.document||!e.Element)return t.isSupported=!1,t;let n=e.document;const r=n,o=r.currentScript;e.DocumentFragment;const u=e.HTMLTemplateElement,a=e.Node,i=e.Element,s=e.NodeFilter,l=e.NamedNodeMap;l===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;const d=e.DOMParser,c=e.trustedTypes,f=i.prototype,h=Ie(f,"cloneNode"),p=Ie(f,"remove"),b=Ie(f,"nextSibling"),g=Ie(f,"childNodes"),y=Ie(f,"parentNode"),k=Ie(f,"shadowRoot"),C=Ie(f,"attributes"),w=a&&a.prototype?Ie(a.prototype,"nodeType"):null,v=a&&a.prototype?Ie(a.prototype,"nodeName"):null;if(typeof u=="function"){const S=n.createElement("template");S.content&&S.content.ownerDocument&&(n=S.content.ownerDocument)}let E,D="",R,X=!1,ye=0;const gt=function(){if(ye>0)throw lt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ue=function(m){gt(),ye++;try{return E.createHTML(m)}finally{ye--}},hr=function(m){gt(),ye++;try{return E.createScriptURL(m)}finally{ye--}},gn=function(){return X||(R=sb(c,o),X=!0),R},ve=n,Vt=ve.implementation,Wo=ve.createNodeIterator,Fs=ve.createDocumentFragment,Is=ve.getElementsByTagName,Ps=r.importNode;let H=Hi();t.isSupported=typeof vs=="function"&&typeof y=="function"&&Vt&&Vt.createHTMLDocument!==void 0;const Rs=Zm,Ls=Qm,Ns=Km,zs=Jm,qs=eb,Bs=tb,Xo=nb,Hs=ob;let Yo=zi,$=null;const Zo=L({},[...Pi,...Kr,...Jr,...eo,...Ri]);let V=null;const Qo=L({},[...Li,...to,...Ni,...Dn]);let U=Object.seal(At(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ut=null,Ko=null;const je=Object.seal(At(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Jo=!0,pr=!0,eu=!1,tu=!0,Ge=!1,We=!0,ut=!1,mr=!1,br=null,gr=null,yr=!1,yt=!1,yn=!1,kn=!1,nu=!0,ru=!1;const ou="user-content-";let kr=!0,xr=!1,kt={},De=null;const wr=L({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let uu=null;const iu=L({},["audio","video","img","source","image","track"]);let Cr=null;const au=L({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),xn="http://www.w3.org/1998/Math/MathML",wn="http://www.w3.org/2000/svg",Me="http://www.w3.org/1999/xhtml";let xt=Me,vr=!1,_r=null;const $s=L({},[xn,wn,Me],Qr),su=re(["mi","mo","mn","ms","mtext"]);let Sr=L({},su);const cu=re(["annotation-xml"]);let Er=L({},cu);const Vs=L({},["title","style","font","a","script"]);let jt=null;const Us=["application/xhtml+xml","text/html"],js="text/html";let q=null,wt=null;const Gs=n.createElement("form"),lu=function(m){return m instanceof RegExp||m instanceof Function},Ar=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(wt&&wt===m)return;(!m||typeof m!="object")&&(m={}),m=le(m),jt=Us.indexOf(m.PARSER_MEDIA_TYPE)===-1?js:m.PARSER_MEDIA_TYPE,q=jt==="application/xhtml+xml"?Qr:Qt,$=Ze(m,"ALLOWED_TAGS",Zo,{transform:q}),V=Ze(m,"ALLOWED_ATTR",Qo,{transform:q}),_r=Ze(m,"ALLOWED_NAMESPACES",$s,{transform:Qr}),Cr=Ze(m,"ADD_URI_SAFE_ATTR",au,{transform:q,base:au}),uu=Ze(m,"ADD_DATA_URI_TAGS",iu,{transform:q,base:iu}),De=Ze(m,"FORBID_CONTENTS",wr,{transform:q}),Ut=Ze(m,"FORBID_TAGS",le({}),{transform:q}),Ko=Ze(m,"FORBID_ATTR",le({}),{transform:q}),kt=J(m,"USE_PROFILES")?m.USE_PROFILES&&typeof m.USE_PROFILES=="object"?le(m.USE_PROFILES):m.USE_PROFILES:!1,Jo=m.ALLOW_ARIA_ATTR!==!1,pr=m.ALLOW_DATA_ATTR!==!1,eu=m.ALLOW_UNKNOWN_PROTOCOLS||!1,tu=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ge=m.SAFE_FOR_TEMPLATES||!1,We=m.SAFE_FOR_XML!==!1,ut=m.WHOLE_DOCUMENT||!1,yt=m.RETURN_DOM||!1,yn=m.RETURN_DOM_FRAGMENT||!1,kn=m.RETURN_TRUSTED_TYPE||!1,yr=m.FORCE_BODY||!1,nu=m.SANITIZE_DOM!==!1,ru=m.SANITIZE_NAMED_PROPS||!1,kr=m.KEEP_CONTENT!==!1,xr=m.IN_PLACE||!1,Yo=Wm(m.ALLOWED_URI_REGEXP)?m.ALLOWED_URI_REGEXP:zi,xt=typeof m.NAMESPACE=="string"?m.NAMESPACE:Me,Sr=J(m,"MATHML_TEXT_INTEGRATION_POINTS")&&m.MATHML_TEXT_INTEGRATION_POINTS&&typeof m.MATHML_TEXT_INTEGRATION_POINTS=="object"?le(m.MATHML_TEXT_INTEGRATION_POINTS):L({},su),Er=J(m,"HTML_INTEGRATION_POINTS")&&m.HTML_INTEGRATION_POINTS&&typeof m.HTML_INTEGRATION_POINTS=="object"?le(m.HTML_INTEGRATION_POINTS):L({},cu);const x=J(m,"CUSTOM_ELEMENT_HANDLING")&&m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING=="object"?le(m.CUSTOM_ELEMENT_HANDLING):At(null);if(U=At(null),J(x,"tagNameCheck")&&lu(x.tagNameCheck)&&(U.tagNameCheck=x.tagNameCheck),J(x,"attributeNameCheck")&&lu(x.attributeNameCheck)&&(U.attributeNameCheck=x.attributeNameCheck),J(x,"allowCustomizedBuiltInElements")&&typeof x.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=x.allowCustomizedBuiltInElements),oe(U),Ge&&(pr=!1),yn&&(yt=!0),kt&&($=L({},Ri),V=At(null),kt.html===!0&&(L($,Pi),L(V,Li)),kt.svg===!0&&(L($,Kr),L(V,to),L(V,Dn)),kt.svgFilters===!0&&(L($,Jr),L(V,to),L(V,Dn)),kt.mathMl===!0&&(L($,eo),L(V,Ni),L(V,Dn))),je.tagCheck=null,je.attributeCheck=null,J(m,"ADD_TAGS")&&(typeof m.ADD_TAGS=="function"?je.tagCheck=m.ADD_TAGS:Ke(m.ADD_TAGS)&&($===Zo&&($=le($)),L($,m.ADD_TAGS,q))),J(m,"ADD_ATTR")&&(typeof m.ADD_ATTR=="function"?je.attributeCheck=m.ADD_ATTR:Ke(m.ADD_ATTR)&&(V===Qo&&(V=le(V)),L(V,m.ADD_ATTR,q))),J(m,"ADD_URI_SAFE_ATTR")&&Ke(m.ADD_URI_SAFE_ATTR)&&L(Cr,m.ADD_URI_SAFE_ATTR,q),J(m,"FORBID_CONTENTS")&&Ke(m.FORBID_CONTENTS)&&(De===wr&&(De=le(De)),L(De,m.FORBID_CONTENTS,q)),J(m,"ADD_FORBID_CONTENTS")&&Ke(m.ADD_FORBID_CONTENTS)&&(De===wr&&(De=le(De)),L(De,m.ADD_FORBID_CONTENTS,q)),kr&&($["#text"]=!0),ut&&L($,["html","head","body"]),$.table&&(L($,["tbody"]),delete Ut.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw lt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw lt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const _=E;E=m.TRUSTED_TYPES_POLICY;try{D=Ue("")}catch(A){throw E=_,A}}else m.TRUSTED_TYPES_POLICY===null?(E=void 0,D=""):(E===void 0&&(E=gn()),E&&typeof D=="string"&&(D=Ue("")));re&&re(m),wt=m},du=L({},[...Kr,...Jr,...Xm]),fu=L({},[...eo,...Ym]),Ws=function(m,x,_){return x.namespaceURI===Me?m==="svg":x.namespaceURI===xn?m==="svg"&&(_==="annotation-xml"||Sr[_]):!!du[m]},Xs=function(m,x,_){return x.namespaceURI===Me?m==="math":x.namespaceURI===wn?m==="math"&&Er[_]:!!fu[m]},Ys=function(m,x,_){return x.namespaceURI===wn&&!Er[_]||x.namespaceURI===xn&&!Sr[_]?!1:!fu[m]&&(Vs[m]||!du[m])},Zs=function(m){let x=y(m);(!x||!x.tagName)&&(x={namespaceURI:xt,tagName:"template"});const _=Qt(m.tagName),A=Qt(x.tagName);return _r[m.namespaceURI]?m.namespaceURI===wn?Ws(_,x,A):m.namespaceURI===xn?Xs(_,x,A):m.namespaceURI===Me?Ys(_,x,A):!!(jt==="application/xhtml+xml"&&_r[m.namespaceURI]):!1},Xe=function(m){_t(t.removed,{element:m});try{y(m).removeChild(m)}catch{if(p(m),!y(m))throw lt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Cn=function(m){Tr(m);const x=g(m);if(x){const A=[];vt(x,F=>{_t(A,F)}),vt(A,F=>{try{p(F)}catch{}})}const _=C(m);if(_)for(let A=_.length-1;A>=0;--A){const F=_[A],I=F&&F.name;if(typeof I=="string")try{m.removeAttribute(I)}catch{}}},it=function(m,x){try{_t(t.removed,{attribute:x.getAttributeNode(m),from:x})}catch{_t(t.removed,{attribute:null,from:x})}if(x.removeAttribute(m),m==="is")if(yt||yn)try{Xe(x)}catch{}else try{x.setAttribute(m,"")}catch{}},Qs=function(m){const x=C(m);if(x)for(let _=x.length-1;_>=0;--_){const A=x[_],F=A&&A.name;if(!(typeof F!="string"||V[q(F)]))try{m.removeAttribute(F)}catch{}}},Tr=function(m){const x=[m];for(;x.length>0;){const _=x.pop();(w?w(_):_.nodeType)===ke.element&&Qs(_);const F=g(_);if(F)for(let I=F.length-1;I>=0;--I)x.push(F[I])}},Ks=function(m){if(!We)return;const x=[m];for(;x.length>0;){const _=x.pop(),A=w?w(_):_.nodeType;if(A===ke.processingInstruction||A===ke.comment&&Q(Bi,_.data)){try{p(_)}catch{}continue}if(A===ke.element){const I=_,j=q(v?v(_):_.nodeName);try{I.hasAttribute&&I.hasAttribute("patchsrc")&&I.removeAttribute("patchsrc"),I.hasAttribute&&I.hasAttribute("for")&&j!=="label"&&j!=="output"&&I.removeAttribute("for")}catch{}}const F=g(_);if(F)for(let I=F.length-1;I>=0;--I)x.push(F[I])}},hu=function(m){let x=null,_=null;if(yr)m="<remove></remove>"+m;else{const I=Di(m,/^[\r\n\t ]+/);_=I&&I[0]}jt==="application/xhtml+xml"&&xt===Me&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");const A=E?Ue(m):m;if(xt===Me)try{x=new d().parseFromString(A,jt)}catch{}if(!x||!x.documentElement){x=Vt.createDocument(xt,"template",null);try{x.documentElement.innerHTML=vr?D:A}catch{}}const F=x.body||x.documentElement;return m&&_&&F.insertBefore(n.createTextNode(_),F.childNodes[0]||null),xt===Me?Is.call(x,ut?"html":"body")[0]:ut?x.documentElement:F},pu=function(m){return Wo.call(m.ownerDocument||m,m,s.SHOW_ELEMENT|s.SHOW_COMMENT|s.SHOW_TEXT|s.SHOW_PROCESSING_INSTRUCTION|s.SHOW_CDATA_SECTION,null)},vn=function(m){return m=Wt(m,Rs," "),m=Wt(m,Ls," "),m=Wt(m,Ns," "),m},Or=function(m){var x;m.normalize();const _=Wo.call(m.ownerDocument||m,m,s.SHOW_TEXT|s.SHOW_COMMENT|s.SHOW_CDATA_SECTION|s.SHOW_PROCESSING_INSTRUCTION,null);let A=_.nextNode();for(;A;)A.data=vn(A.data),A=_.nextNode();const F=(x=m.querySelectorAll)===null||x===void 0?void 0:x.call(m,"template");F&&vt(F,I=>{Ct(I.content)&&Or(I.content)})},_n=function(m){const x=v?v(m):null;return typeof x!="string"||q(x)!=="form"?!1:typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||m.attributes!==C(m)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function"||m.nodeType!==w(m)||m.childNodes!==g(m)},Ct=function(m){if(!w||typeof m!="object"||m===null)return!1;try{return w(m)===ke.documentFragment}catch{return!1}},Gt=function(m){if(!w||typeof m!="object"||m===null)return!1;try{return typeof w(m)=="number"}catch{return!1}};function Fe(S,m,x){S.length!==0&&vt(S,_=>{_.call(t,m,x,wt)})}const Js=function(m,x){return!!(We&&m.hasChildNodes()&&!Gt(m.firstElementChild)&&Q(qi,m.textContent)&&Q(qi,m.innerHTML)||We&&m.namespaceURI===Me&&x==="style"&&Gt(m.firstElementChild)||m.nodeType===ke.processingInstruction||We&&m.nodeType===ke.comment&&Q(Bi,m.data))},ec=function(m,x){if(!Ut[x]&&gu(x)&&(U.tagNameCheck instanceof RegExp&&Q(U.tagNameCheck,x)||U.tagNameCheck instanceof Function&&U.tagNameCheck(x)))return!1;if(kr&&!De[x]){const _=y(m),A=g(m);if(A&&_){const F=A.length;for(let I=F-1;I>=0;--I){const j=xr?A[I]:h(A[I],!0);_.insertBefore(j,b(m))}}}return Xe(m),!0},mu=function(m,x){if(Fe(H.beforeSanitizeElements,m,null),m!==x&&y(m)===null)return!0;if(_n(m))return Xe(m),!0;const _=q(v?v(m):m.nodeName);if(Fe(H.uponSanitizeElement,m,{tagName:_,allowedTags:$}),m!==x&&y(m)===null)return!0;if(Js(m,_))return Xe(m),!0;if(Ut[_]||!(je.tagCheck instanceof Function&&je.tagCheck(_))&&!$[_]){const F=ec(m,_);return F===!1&&Fe(H.afterSanitizeElements,m,null),F}if((w?w(m):m.nodeType)===ke.element&&!Zs(m)||(_==="noscript"||_==="noembed"||_==="noframes")&&Q(ub,m.innerHTML))return Xe(m),!0;if(Ge&&m.nodeType===ke.text){const F=vn(m.textContent);m.textContent!==F&&(_t(t.removed,{element:m.cloneNode()}),m.textContent=F)}return Fe(H.afterSanitizeElements,m,null),!1},bu=function(m,x,_){if(Ko[x]||We&&x==="patchsrc"||We&&x==="for"&&m!=="label"&&m!=="output"||nu&&(x==="id"||x==="name")&&(_ in n||_ in Gs))return!1;const A=V[x]||je.attributeCheck instanceof Function&&je.attributeCheck(x,m);if(!(pr&&Q(zs,x))){if(!(Jo&&Q(qs,x))){if(A){if(!Cr[x]){if(!Q(Yo,Wt(_,Xo,""))){if(!((x==="src"||x==="xlink:href"||x==="href")&&m!=="script"&&Mi(_,"data:")===0&&uu[m])){if(!(eu&&!Q(Bs,Wt(_,Xo,"")))){if(_)return!1}}}}}else if(!(gu(m)&&(U.tagNameCheck instanceof RegExp&&Q(U.tagNameCheck,m)||U.tagNameCheck instanceof Function&&U.tagNameCheck(m))&&(U.attributeNameCheck instanceof RegExp&&Q(U.attributeNameCheck,x)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(x,m))||x==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&Q(U.tagNameCheck,_)||U.tagNameCheck instanceof Function&&U.tagNameCheck(_))))return!1}}return!0},tc=L({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),gu=function(m){return!tc[Qt(m)]&&Q(Hs,m)},nc=function(m,x,_,A){if(E&&typeof c=="object"&&typeof c.getAttributeType=="function"&&!_)switch(c.getAttributeType(m,x)){case"TrustedHTML":return Ue(A);case"TrustedScriptURL":return hr(A)}return A},rc=function(m,x,_,A){try{_?m.setAttributeNS(_,x,A):m.setAttribute(x,A),_n(m)?Xe(m):Oi(t.removed)}catch{it(x,m)}},yu=function(m){Fe(H.beforeSanitizeAttributes,m,null);const x=m.attributes;if(!x||_n(m))return;const _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:V,forceKeepAttr:void 0};let A=x.length;const F=q(m.nodeName);for(;A--;){const I=x[A],j=I.name,ue=I.namespaceURI,_e=I.value,he=q(j),Se=_e;let se=j==="value"?Se:Hm(Se);if(_.attrName=he,_.attrValue=se,_.keepAttr=!0,_.forceKeepAttr=void 0,Fe(H.uponSanitizeAttribute,m,_),se=_.attrValue,ru&&(he==="id"||he==="name")&&Mi(se,ou)!==0&&(it(j,m),se=ou+se),We&&Q(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,se)){it(j,m);continue}if(he==="attributename"&&Di(se,"href")){it(j,m);continue}if(!_.forceKeepAttr){if(!_.keepAttr){it(j,m);continue}if(!tu&&Q(ib,se)){it(j,m);continue}if(Ge&&(se=vn(se)),!bu(F,he,se)){it(j,m);continue}se=nc(F,he,ue,se),se!==Se&&rc(m,j,ue,se)}}Fe(H.afterSanitizeAttributes,m,null)},Sn=function(m){let x=null;const _=pu(m);for(Fe(H.beforeSanitizeShadowDOM,m,null);x=_.nextNode();)if(Fe(H.uponSanitizeShadowNode,x,null),mu(x,m),yu(x),Ct(x.content)&&Sn(x.content),(w?w(x):x.nodeType)===ke.element){const F=k(x);Ct(F)&&(Dr(F),Sn(F))}Fe(H.afterSanitizeShadowDOM,m,null)},Dr=function(m){const x=[{node:m,shadow:null}];for(;x.length>0;){const _=x.pop();if(_.shadow){Sn(_.shadow);continue}const A=_.node,I=(w?w(A):A.nodeType)===ke.element,j=g(A);if(j)for(let ue=j.length-1;ue>=0;--ue)x.push({node:j[ue],shadow:null});if(I){const ue=v?v(A):null;if(typeof ue=="string"&&q(ue)==="template"){const _e=A.content;Ct(_e)&&x.push({node:_e,shadow:null})}}if(I){const ue=k(A);Ct(ue)&&x.push({node:null,shadow:ue},{node:ue,shadow:null})}}};return t.sanitize=function(S){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},x=null,_=null,A=null,F=null;if(vr=!S,vr&&(S="<!-->"),typeof S!="string"&&!Gt(S)&&(S=Gm(S),typeof S!="string"))throw lt("dirty is not a string, aborting");if(!t.isSupported)return S;mr?($=br,V=gr):Ar(m),(H.uponSanitizeElement.length>0||H.uponSanitizeAttribute.length>0)&&($=le($)),H.uponSanitizeAttribute.length>0&&(V=le(V)),t.removed=[];const I=xr&&typeof S!="string"&&Gt(S);if(I){Ks(S);const he=v?v(S):S.nodeName;if(typeof he=="string"){const Se=q(he);if(!$[Se]||Ut[Se])throw Cn(S),lt("root node is forbidden and cannot be sanitized in-place")}if(_n(S))throw Cn(S),lt("root node is clobbered and cannot be sanitized in-place");try{Dr(S)}catch(Se){throw Cn(S),Se}}else if(Gt(S))x=hu("<!---->"),_=x.ownerDocument.importNode(S,!0),_.nodeType===ke.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?x=_:x.appendChild(_),Dr(_);else{if(!yt&&!Ge&&!ut&&S.indexOf("<")===-1)return E&&kn?Ue(S):S;if(x=hu(S),!x)return yt?null:kn?D:""}x&&yr&&Xe(x.firstChild);const j=I?S:x,ue=pu(j);try{for(;A=ue.nextNode();)mu(A,j),yu(A),Ct(A.content)&&Sn(A.content)}catch(he){throw I&&(Cn(S),vt(t.removed,Se=>{Se.element&&Tr(Se.element)})),he}if(I)return vt(t.removed,he=>{he.element&&Tr(he.element)}),Ge&&Or(S),S;if(yt){if(Ge&&Or(x),yn)for(F=Fs.call(x.ownerDocument);x.firstChild;)F.appendChild(x.firstChild);else F=x;return(V.shadowroot||V.shadowrootmode)&&(F=Ps.call(r,F,!0)),F}let _e=ut?x.outerHTML:x.innerHTML;return ut&&$["!doctype"]&&x.ownerDocument&&x.ownerDocument.doctype&&x.ownerDocument.doctype.name&&Q(rb,x.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+x.ownerDocument.doctype.name+`>
`+_e),Ge&&(_e=vn(_e)),E&&kn?Ue(_e):_e},t.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ar(S),mr=!0,br=$,gr=V},t.clearConfig=function(){wt=null,mr=!1,br=null,gr=null,E=R,D=""},t.isValidAttribute=function(S,m,x){wt||Ar({});const _=q(S),A=q(m);return bu(_,A,x)},t.addHook=function(S,m){typeof m=="function"&&J(H,S)&&_t(H[S],m)},t.removeHook=function(S,m){if(J(H,S)){if(m!==void 0){const x=qm(H[S],m);return x===-1?void 0:Bm(H[S],x,1)[0]}return Oi(H[S])}},t.removeHooks=function(S){J(H,S)&&(H[S]=[])},t.removeAllHooks=function(){H=Hi()},t}var Es=Ss();function cb(e,t){const n=e.doc.toString(),r=[],o=[];if(fe.syntaxTree(e).iterate({enter:s=>{if(["FencedCode","CodeBlock","InlineCode","Frontmatter","CommentBlock","BlockMath"].includes(s.name)||t&&s.name==="Table")return!1;if(s.name==="HTMLBlock"||s.name==="HTMLTag"){let l=e.doc.length;for(let d=s.node.parent;d!==null;d=d.parent)(d.name==="ListItem"||d.name==="Blockquote")&&(l=Math.min(l,d.to));if(r.push({from:s.from,to:s.to,limit:l}),s.name==="HTMLTag")return!1}else s.name==="QuoteMark"&&o.push({from:s.from,to:s.to})}}),r.length===0)return[];let u=0;const a=n.replace(/</g,(s,l)=>{for(;u<r.length&&r[u].to<=l;)u++;const d=r[u];return d!==void 0&&d.from<=l?s:" "}),i=[];return u=0,Cs.parse(a).iterate({enter:s=>{if(s.name!=="Element")return;const{from:l,to:d}=s;for(;u<r.length&&r[u].to<=l;)u++;const c=r[u];let f=n.slice(l,d);for(let h=o.length-1;h>=0;h--){const p=o[h];p.from>=l&&p.to<=d&&(f=f.slice(0,p.from-l)+f.slice(p.to-l))}if(c!==void 0&&c.from<=l&&d<=c.limit&&As(f))return i.push({from:l,to:d,source:f}),!1}}),i}function As(e){const t=Cs.parse(e);let n=!0,r=0;return t.iterate({enter:o=>{if((o.type.isError||o.name==="MismatchedCloseTag")&&(n=!1),o.name==="Element"){r++;const u=o.node.firstChild,a=o.node.lastChild;u?.name!=="SelfClosingTag"&&a?.name!=="CloseTag"&&(n=!1)}else o.node.parent?.name==="Document"&&(o.name!=="Text"||e.slice(o.from,o.to).trim()!=="")&&(n=!1)}}),n&&r>0}class mt extends T.WidgetType{constructor(t,n){super(),this.source=t,this.fragment=n,this.block=n.querySelector("address, article, aside, blockquote, dd, details, dialog, div, dl, dt, fieldset, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, ul")!==null}block;static create(t){if(!As(t))return;const n=Es.sanitize(t,{RETURN_DOM_FRAGMENT:!0,USE_PROFILES:{html:!0},FORBID_TAGS:["script","style","link","meta","base","form","input","button","select","textarea","iframe","object","embed","audio","video"],FORBID_ATTR:["tabindex","autofocus","contenteditable"],SANITIZE_NAMED_PROPS:!0});if(n.childElementCount===0)return;const r=document.createElement("span").style;return n.querySelectorAll("[style]").forEach(o=>{r.cssText=o.getAttribute("style")??"",o.removeAttribute("style");for(const u of lb){const a=r.getPropertyValue(u);a!==""&&o.style.setProperty(u,a)}}),n.querySelectorAll("a").forEach(o=>o.setAttribute("tabindex","-1")),n.querySelectorAll("img").forEach(o=>{const u=o.getAttribute("src");u!==null&&(o.src=sr(u))}),new mt(t,n)}toDOM(t){const n=document.createElement(this.block?"div":"span");n.className="cm-md-syntaxHiddenHtml";const r=n.attachShadow({mode:"open"}),o=document.createElement("style"),u=()=>{o.textContent=ja(M.MarkEdit.editorConfig?.theme??"github",t.state.facet(T.EditorView.darkTheme)),t.requestMeasure()};u(),window.addEventListener("editor-colors-changed",u),no.set(n,()=>window.removeEventListener("editor-colors-changed",u));const a=document.createElement("style");a.textContent=this.block?":host { display: block; } .markdown-body { font: inherit; white-space: normal; overflow-wrap: anywhere; overflow: auto; }":":host { display: inline; } .markdown-body { display: inline; font: inherit; white-space: normal; overflow-wrap: anywhere; } .markdown-body::before, .markdown-body::after { content: none; }";const i=document.createElement(this.block?"div":"span");return i.className="markdown-body",i.inert=!0,i.append(this.fragment.cloneNode(!0)),r.append(o,a,i),n.addEventListener("mousedown",s=>{s.button!==0||s.shiftKey||s.altKey||s.metaKey||s.ctrlKey||(s.preventDefault(),s.stopPropagation(),t.dispatch({selection:W.EditorSelection.cursor(t.posAtDOM(n)),scrollIntoView:!1}),t.focus())}),n.addEventListener("click",s=>s.preventDefault()),r.addEventListener("load",()=>t.requestMeasure(),!0),r.addEventListener("error",()=>t.requestMeasure(),!0),n}updateDOM(t,n){return t.tagName==="DIV"!==this.block?!1:(t.shadowRoot.querySelector(".markdown-body").replaceChildren(this.fragment.cloneNode(!0)),n.requestMeasure(),!0)}eq(t){return this.source===t.source}destroy(t){no.get(t)?.(),no.delete(t)}ignoreEvent(){return!1}}const no=new WeakMap,lb=["text-align","color","background-color","font-family","font-weight","font-style","text-decoration-line","text-decoration-color","text-decoration-style"],Ts=W.StateEffect.define();class Xn extends T.WidgetType{constructor(t,n,r,o,u=""){super(),this.doc=t,this.from=n,this.to=r,this.render=o,this.referenceContext=u}get source(){return this.doc.sliceString(this.from,this.to)}toDOM(t){const n=document.createElement("div");n.className="cm-md-syntaxHiddenTable";const r=n.attachShadow({mode:"open"}),o=document.createElement("style"),u=()=>{o.textContent=ja(M.MarkEdit.editorConfig?.theme??"github",t.state.facet(T.EditorView.darkTheme)),t.requestMeasure()};u(),window.addEventListener("editor-colors-changed",u);const a=document.createElement("style");a.textContent=`
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;const i=document.createElement("div");i.className="markdown-body source",i.textContent=this.source;const s=document.createElement("style");r.append(o,a,s,i),Yt.set(n,{body:i,mathStyle:s,dispose:()=>window.removeEventListener("editor-colors-changed",u)});const l=d=>{d.button!==0||d.shiftKey||d.altKey||d.metaKey||d.ctrlKey||(d.preventDefault(),d.stopPropagation(),t.dispatch({selection:W.EditorSelection.cursor(t.posAtDOM(n)),scrollIntoView:!1}),t.focus())};return n.addEventListener("mousedown",l),n.addEventListener("click",d=>d.preventDefault()),r.addEventListener("load",()=>t.requestMeasure(),!0),r.addEventListener("error",()=>t.requestMeasure(),!0),this.renderInto(n,t),n}updateDOM(t,n){return this.renderInto(t,n),!0}renderInto(t,n){const r=Yt.get(t),o={};r.request=o;const u=()=>t.isConnected&&Yt.get(t)?.request===o,a=()=>{if(u()){const i=n.posAtDOM(t);n.dispatch({effects:Ts.of({doc:n.state.doc,from:i,to:i+this.source.length})})}};Promise.all([this.render(),""]).then(([i,s])=>{if(!u())return;const l=i.find(f=>f.fromLine===this.doc.lineAt(this.from).number&&f.toLine===this.doc.lineAt(this.to).number);if(l===void 0){a();return}const c=Es.sanitize(l.html,{RETURN_DOM_FRAGMENT:!0,FORBID_TAGS:["style","link","meta","form","input","button","select","textarea","iframe","object","embed","audio","video"],FORBID_ATTR:["tabindex","autofocus","contenteditable"],SANITIZE_NAMED_PROPS:!0}).querySelector("table");if(c===null){a();return}c.querySelectorAll("a").forEach(f=>f.setAttribute("tabindex","-1")),c.querySelectorAll("img").forEach(f=>{const h=f.getAttribute("src");h!==null&&(f.src=sr(h))}),r.mathStyle.textContent!==s&&(r.mathStyle.textContent=s),r.body.firstElementChild?.isEqualNode(c)||(r.body.classList.remove("source"),r.body.replaceChildren(c),n.requestMeasure())}).catch(a)}destroy(t){Yt.get(t)?.dispose(),Yt.delete(t)}eq(t){return t.source===this.source&&t.referenceContext===this.referenceContext}ignoreEvent(){return!1}}const Yt=new WeakMap,Yn=W.Facet.define({combine:e=>e[e.length-1]??$a}),Os=W.StateField.define({create:e=>$i(e),update(e,t){if(t.docChanged||t.reconfigured||fe.syntaxTree(t.startState)!==fe.syntaxTree(t.state)){const r=[];for(const o=e.all.iter();o.value!==null;o.next())if(o.value.spec.widget instanceof Xn||o.value.spec.widget instanceof mt){const u=t.changes.mapPos(o.from,1),a=t.changes.mapPos(o.to,-1);u<a&&r.push(o.value.range(u,a))}return $i(t.state,T.Decoration.set(r,!0))}let n=e.all;for(const r of t.effects)r.is(Ts)&&r.value.doc===t.state.doc&&(n=n.update({filter:(o,u)=>o!==r.value.from||u!==r.value.to}));return t.selection!==void 0||t.effects.length>0?{all:n,visible:Ds(n,t.state)}:e},provide:e=>T.EditorView.decorations.from(e,t=>t.visible)});function $i(e,t=T.Decoration.none){const n=db(e,t);return{all:n,visible:Ds(n,e)}}function db(e,t){const n=[],r=fe.syntaxTree(e),o=e.facet(Yn),u=[];r.iterate({enter:f=>{if(f.name==="Document")return;const h=e.sliceDoc(e.doc.lineAt(f.from).from,e.doc.lineAt(f.to).to);return(f.name!=="Paragraph"&&f.name!=="Table"||h.includes("["))&&u.push(h),!1}});const a=e.sliceDoc(r.length);u.push(a);let i;const s=()=>i??=Xh(e.doc.toString()),l=JSON.stringify(u);if(o.includes("html"))for(const{from:f,to:h,source:p}of cb(e,o.includes("table"))){if(r.length<e.doc.length&&h>=r.length)continue;let b;t.between(f,h,(g,y,k)=>{const C=k.spec.widget;g===f&&y===h&&C instanceof mt&&C.source===p&&(b=C)}),b??=mt.create(p),b!==void 0&&n.push(T.Decoration.replace({block:b.block,widget:b}).range(f,h))}const d=n.slice();let c=0;return r.iterate({enter:f=>{for(;c<d.length&&d[c].to<=f.from;)c++;const h=d[c];if(f.name!=="Document"&&h!==void 0&&h.from<=f.from&&h.to>=f.to)return!1;let p;if(f.name==="Table"&&o.includes("table")){for(let k=f.node.parent;k!==null;k=k.parent)if(k.name!=="Document")return!1;if(r.length<e.doc.length&&f.to>=r.length)return!1;const b=e.doc.lineAt(f.from).from,g=e.doc.lineAt(f.to).to;let y=new Xn(e.doc,b,g,s,l);t.between(b,g,(k,C,w)=>{const v=w.spec.widget;k===b&&C===g&&v instanceof Xn&&y.eq(v)&&(y=v)}),p=T.Decoration.replace({block:!0,widget:y}).range(b,g)}if(p!==void 0)return n.push(p),!1}}),T.Decoration.set(n,!0)}function Ds(e,t){return e.size===0?e:e.update({filter:(n,r,o)=>{const u=o.spec.widget instanceof Xn;let a=!1;if((u||o.spec.widget instanceof mt)&&fe.foldedRanges(t).between(n,r,()=>{a=!0}),a||ge(t,n,r))return!1;if(u&&r<t.doc.length){const i=t.doc.lineAt(r+1);if(i.text.trim()===""&&t.selection.ranges.some(s=>s.empty&&s.goalColumn===void 0&&s.head>=i.from&&s.head<=i.to))return!1}return!0}})}const Vi=T.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence"});function fb(e,t){const n=[];if(e.name!=="FencedCode")return n;const r=t.state,o=e.node.firstChild,u=e.node.lastChild;if(o?.name!=="CodeMark"||u?.name!=="CodeMark"||o.from===u.from||!r.sliceDoc(o.from,o.to).startsWith("```"))return n;const a=r.doc.lineAt(o.from),i=r.doc.lineAt(u.from),s=e.node.getChild("CodeInfo");let l=!1;if(fe.foldedRanges(r).between(a.to,i.to,(c,f)=>{if(c>=a.to&&f>=i.to)return l=!0,!1}),l)return n;const d=ge(r,e.from,e.to);for(const{from:c,to:f}of t.visibleRanges){const h=Math.max(a.number,r.doc.lineAt(c).number),p=Math.min(i.number,r.doc.lineAt(f).number);for(let b=h;b<=p;b++){const g=r.doc.line(b),y=["cm-md-syntaxHiddenCodeBlock"];b===a.number&&y.push("cm-md-syntaxHiddenCodeStart"),b===i.number&&y.push("cm-md-syntaxHiddenCodeEnd");const k=b===a.number&&!d&&s!==null?{"data-code-language":r.sliceDoc(s.from,s.to).trim().split(/\s+/)[0]}:void 0;n.push(T.Decoration.line({class:y.join(" "),attributes:k}).range(g.from))}}return d||(n.push(Vi.range(o.from,a.to)),n.push(Vi.range(u.from,i.to))),n}function hb(e,t){const n=e.node.parent;if(e.name!=="HeaderMark"||n?.name.startsWith("ATXHeading")!==!0||n.firstChild?.from!==e.from)return;const o=mb(t,e.to,n.to);if(!(!bb(t,o,n.to)||ge(t,n.from,n.to)))return{from:e.from,to:o}}function pb(e,t){const n=e.node.parent;if(e.name!=="HeaderMark"||n?.name.startsWith("SetextHeading")!==!0)return;const r=t.doc.lineAt(e.from);if(!ge(t,n.from,n.to))return r.from}function mb(e,t,n){return t+(/^ */.exec(e.sliceDoc(t,n))?.[0].length??0)}function bb(e,t,n){return/\S/.test(e.sliceDoc(t,n))}function gb(e,t){if(e.name!=="HorizontalRule"||e.node.parent?.name!=="Document")return;const n=t.doc.lineAt(e.from);if(!ge(t,n.from,n.to))return T.Decoration.replace({widget:new yb(fe.highlightingFor(t,[ce.tags.contentSeparator])??"")}).range(n.from,n.to)}class yb extends T.WidgetType{constructor(t){super(),this.highlightClass=t}eq(t){return t.highlightClass===this.highlightClass}toDOM(){const t=document.createElement("span");return t.className=["cm-md-syntaxHiddenHorizontalRule",this.highlightClass].filter(Boolean).join(" "),t.setAttribute("role","separator"),t.setAttribute("aria-orientation","horizontal"),t}}const kb=new Map([["Emphasis","EmphasisMark"],["StrongEmphasis","EmphasisMark"],["Strikethrough","StrikethroughMark"],["InlineCode","CodeMark"]]),xb=T.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),Go="cm-md-syntaxHiddenInlineCodeBoundary",wb=T.Decoration.mark({class:`${Go} cm-md-syntaxHiddenInlineCodeStart`}),Cb=T.Decoration.mark({class:`${Go} cm-md-syntaxHiddenInlineCodeEnd`}),vb=T.Decoration.mark({class:`${Go} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`});function _b(e,t){const n=e.node.parent;if(n===null||kb.get(n.name)!==e.name||ge(t,n.from,n.to))return[];const r=[xb.range(e.from,e.to)];if(n.name!=="InlineCode"||e.from!==n.from)return r;const o=n.firstChild?.to,u=n.lastChild?.from;return o===void 0||u===void 0||o>=u||(u-o===1?r.push(vb.range(o,u)):(r.push(wb.range(o,o+1)),r.push(Cb.range(u-1,u)))),r}const Sb=T.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTable":{boxSizing:"border-box",width:"100%",padding:"0.5em 6px",overflow:"hidden",contain:"content",cursor:"text"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeBlock":{"--code-border":"color-mix(in srgb, currentColor 18%, transparent)",boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border)"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart":{position:"relative",boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 1px var(--code-border)",borderTopLeftRadius:"6px",borderTopRightRadius:"6px"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart[data-code-language]::after":{content:"attr(data-code-language)",position:"absolute",top:"0.5em",right:"0.5em",maxWidth:"calc(100% - 1em)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"0.8em",lineHeight:"1",opacity:"0.55",pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeEnd":{boxShadow:"inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 -1px var(--code-border)",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:"0px !important",fontVariantLigatures:"none !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:"inherit !important",lineHeight:"inherit !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Menlo, monospace",fontSize:"0.9em",pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:"0 !important"},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:"0",lineHeight:"0",overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px",paddingInlineStart:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:"3px",borderBottomRightRadius:"3px",paddingInlineEnd:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:"inline-flex",alignItems:"center",boxSizing:"border-box",height:"1em",lineHeight:"1em",verticalAlign:"middle",gap:"0.4em",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, sans-serif",fontStyle:"normal",fontWeight:"500",textIndent:"0"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#0969da"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#1a7f37"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#8250df"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#9a6700"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#d1242f"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#2f81f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#3fb950"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#a371f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#d29922"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#f85149"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:"inline-block",width:"1em",height:"1em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:"block",width:"100%",height:"100%",fill:"currentColor"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:"inline-block",appearance:"none",width:"0.9em",height:"0.9em",padding:"0",border:"0",background:"transparent",font:"inherit",marginInlineStart:"0.25em",verticalAlign:"-0.1em",cursor:"pointer"},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:"inherit"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:"block",width:"100%",height:"100%"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:"inline-block",width:"100%",borderTop:"2px solid currentColor",verticalAlign:"middle",opacity:"0.35"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:"inline-block",maxWidth:"100%",height:"auto",verticalAlign:"middle"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:"0"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:"block",maxWidth:"100%",height:"auto",marginInline:"auto"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:"pre-wrap",textAlign:"start"}}),Mn=T.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),Eb=T.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark"}),Ab=T.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark"}),Tb=T.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark"}),Ob=T.Decoration.line({class:"cm-md-syntaxHiddenSetextUnderline"}),Ui=T.Decoration.mark({class:"cm-md-syntaxHiddenLinkLabel"}),Db=T.Decoration.mark({class:"cm-md-syntaxHiddenImageLabel"}),Mb=[T.EditorView.editorAttributes.of({class:"cm-md-syntaxHiddenMode"}),c1,l1,T.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=ji(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(t=>t.reconfigured))&&(this.decorations=ji(e.view))}},{decorations:e=>e.decorations}),k1,T1,P1,Os,Sb];function Ms(e=$a){return[Yn.of(e),Mb]}const Fb=Ms();function ji(e){const t=[],n=new Set,r=new Set,o=e.state.facet(Yn).includes("image"),u=e.state.facet(Yn).includes("html"),a=$1(e.state);for(const{from:i,to:s}of e.visibleRanges)fe.syntaxTree(e.state).iterate({from:i,to:s,enter:l=>{if(u){let w=!1;if(e.state.field(Os).visible.between(l.from,l.to,(v,E,D)=>{D.spec.widget instanceof mt&&v<l.to&&E>l.from&&(w||=v<=l.from&&E>=l.to)}),w)return!1}l.name==="FencedCode"&&!r.has(l.from)&&(r.add(l.from),t.push(...fb(l,e)));const d=p1(l,e.state);d!==void 0&&!n.has(d.from)&&(n.add(d.from),t.push(T.Decoration.replace({widget:new y1(d.type,d.title)}).range(d.from,d.to)));const c=m1(l,e.state);c!==void 0&&t.push(Eb.range(c.from,c.to));const f=ps(l,e.state);if(f!==void 0){const w=f.task?Tb:Ab;t.push(w.range(f.from,f.to))}const h=B1(l,e.state,a);if(h!==void 0){const w=e.state.sliceDoc(h.label.from,h.label.to);if(o&&h.image&&h.destination!=="")t.push(T.Decoration.replace({widget:new K1(h.destination,w)}).range(l.from,l.to));else{h.hidden.forEach(E=>t.push(Mn.range(E.from,E.to)));const v=h.image?Db:Ui;t.push(v.range(h.label.from,h.label.to)),t.push(T.Decoration.widget({widget:new Yr(h.image?"image":"link",e.state,h.destination,w,h.highlightTags),side:-1}).range(h.label.to))}}const p=$o(l,e.state);for(const w of p)ge(e.state,w.from,w.to)||(t.push(Mn.range(w.from+1,w.from+2)),t.push(Ui.range(w.from,w.to)),t.push(T.Decoration.widget({widget:new Yr("footnote",e.state,w.label,w.label,w.highlightTags),side:-1}).range(w.to)));const b=H1(l,e.state);b!==void 0&&(b.hidden.forEach(w=>t.push(Mn.range(w.from,w.to))),t.push(T.Decoration.widget({widget:new Yr("footnoteBack",e.state,b.label,b.label,b.highlightTags),side:-1}).range(b.suffixPosition)),b.suffix!==""&&t.push(T.Decoration.widget({widget:new Q1(b.suffix),side:1}).range(b.suffixPosition)));const g=_b(l,e.state);t.push(...g);const y=gb(l,e.state);y!==void 0&&t.push(y);const k=hb(l,e.state);k!==void 0&&t.push(Mn.range(k.from,k.to));const C=pb(l,e.state);C!==void 0&&t.push(Ob.range(C))}});return T.Decoration.set(t,!0)}const Ib=Object.freeze(Object.defineProperty({__proto__:null,createHiddenSyntaxExtension:Ms,hiddenSyntaxExtension:Fb},Symbol.toStringTag,{value:"Module"}));
