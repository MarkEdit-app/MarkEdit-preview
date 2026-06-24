"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=r=>n[r]??{}}})();const bo=require("@codemirror/view"),H=require("markedit-api"),mo=require("@codemirror/state");function go(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function Hr(){return typeof __FILE_PATH__=="string"}function pn(e,n=!0){const r=document.createElement("style");return r.textContent=e,document.head.appendChild(r),r.disabled=!n,r}function cu(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function ko(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function yo(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function Je(e){const n=parseInt(e.dataset.lineFrom??"0"),r=parseInt(e.dataset.lineTo??"0");return{from:n,to:r}}function Rr(e,n){let r=0,u=n;for(;u!==null&&u!==e;)r+=u.offsetTop,u=u.offsetParent;return r}function kr(e,n,r,u=!0){const o=Rr(e,n)+n.offsetHeight*r;Zn(e,o,u)}function Zn(e,n,r=!0){const u=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=u?0:n,behavior:r?"smooth":"instant"})}function xo(e){const n=document.createRange();n.selectNodeContents(e);const r=getSelection();r?.removeAllRanges(),r?.addRange(n)}function wo(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function Ye(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function vo(e){const n=await H.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const r=JSON.parse(n);return typeof r=="object"&&r!==null?r:{}}catch(r){return console.error(`Failed to parse JSON from ${e}:`,r),{}}}const lu={};function Co(e){let n=lu[e];if(n)return n;n=lu[e]=[];for(let r=0;r<128;r++){const u=String.fromCharCode(r);n.push(u)}for(let r=0;r<e.length;r++){const u=e.charCodeAt(r);n[u]="%"+("0"+u.toString(16).toUpperCase()).slice(-2)}return n}function Xe(e,n){typeof n!="string"&&(n=Xe.defaultChars);const r=Co(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(u){let o="";for(let a=0,c=u.length;a<c;a+=3){const i=parseInt(u.slice(a+1,a+3),16);if(i<128){o+=r[i];continue}if((i&224)===192&&a+3<c){const s=parseInt(u.slice(a+4,a+6),16);if((s&192)===128){const f=i<<6&1984|s&63;f<128?o+="��":o+=String.fromCharCode(f),a+=3;continue}}if((i&240)===224&&a+6<c){const s=parseInt(u.slice(a+4,a+6),16),f=parseInt(u.slice(a+7,a+9),16);if((s&192)===128&&(f&192)===128){const b=i<<12&61440|s<<6&4032|f&63;b<2048||b>=55296&&b<=57343?o+="���":o+=String.fromCharCode(b),a+=6;continue}}if((i&248)===240&&a+9<c){const s=parseInt(u.slice(a+4,a+6),16),f=parseInt(u.slice(a+7,a+9),16),b=parseInt(u.slice(a+10,a+12),16);if((s&192)===128&&(f&192)===128&&(b&192)===128){let l=i<<18&1835008|s<<12&258048|f<<6&4032|b&63;l<65536||l>1114111?o+="����":(l-=65536,o+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),a+=9;continue}}o+="�"}return o})}Xe.defaultChars=";/?:@&=+$,#";Xe.componentChars="";const su={};function _o(e){let n=su[e];if(n)return n;n=su[e]=[];for(let r=0;r<128;r++){const u=String.fromCharCode(r);/^[0-9a-z]$/i.test(u)?n.push(u):n.push("%"+("0"+r.toString(16).toUpperCase()).slice(-2))}for(let r=0;r<e.length;r++)n[e.charCodeAt(r)]=e[r];return n}function En(e,n,r){typeof n!="string"&&(r=n,n=En.defaultChars),typeof r>"u"&&(r=!0);const u=_o(n);let o="";for(let a=0,c=e.length;a<c;a++){const i=e.charCodeAt(a);if(r&&i===37&&a+2<c&&/^[0-9a-f]{2}$/i.test(e.slice(a+1,a+3))){o+=e.slice(a,a+3),a+=2;continue}if(i<128){o+=u[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&a+1<c){const s=e.charCodeAt(a+1);if(s>=56320&&s<=57343){o+=encodeURIComponent(e[a]+e[a+1]),a++;continue}}o+="%EF%BF%BD";continue}o+=encodeURIComponent(e[a])}return o}En.defaultChars=";/?:@&=+$,-_.!~*'()#";En.componentChars="-_.!~*'()";function $r(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function Yn(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Eo=/^([a-z0-9.+-]+:)/i,Ao=/:[0-9]*$/,Do=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,So=["<",">",'"',"`"," ","\r",`
`,"	"],Fo=["{","}","|","\\","^","`"].concat(So),To=["'"].concat(Fo),du=["%","/","?",";","#"].concat(To),fu=["/","?","#"],Mo=255,hu=/^[+a-z0-9A-Z_-]{0,63}$/,Io=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,pu={javascript:!0,"javascript:":!0},bu={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Ur(e,n){if(e&&e instanceof Yn)return e;const r=new Yn;return r.parse(e,n),r}Yn.prototype.parse=function(e,n){let r,u,o,a=e;if(a=a.trim(),!n&&e.split("#").length===1){const f=Do.exec(a);if(f)return this.pathname=f[1],f[2]&&(this.search=f[2]),this}let c=Eo.exec(a);if(c&&(c=c[0],r=c.toLowerCase(),this.protocol=c,a=a.substr(c.length)),(n||c||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(o=a.substr(0,2)==="//",o&&!(c&&pu[c])&&(a=a.substr(2),this.slashes=!0)),!pu[c]&&(o||c&&!bu[c])){let f=-1;for(let m=0;m<fu.length;m++)u=a.indexOf(fu[m]),u!==-1&&(f===-1||u<f)&&(f=u);let b,l;f===-1?l=a.lastIndexOf("@"):l=a.lastIndexOf("@",f),l!==-1&&(b=a.slice(0,l),a=a.slice(l+1),this.auth=b),f=-1;for(let m=0;m<du.length;m++)u=a.indexOf(du[m]),u!==-1&&(f===-1||u<f)&&(f=u);f===-1&&(f=a.length),a[f-1]===":"&&f--;const d=a.slice(0,f);a=a.slice(f),this.parseHost(d),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const m=this.hostname.split(/\./);for(let g=0,k=m.length;g<k;g++){const x=m[g];if(x&&!x.match(hu)){let v="";for(let E=0,A=x.length;E<A;E++)x.charCodeAt(E)>127?v+="x":v+=x[E];if(!v.match(hu)){const E=m.slice(0,g),A=m.slice(g+1),R=x.match(Io);R&&(E.push(R[1]),A.unshift(R[2])),A.length&&(a=A.join(".")+a),this.hostname=E.join(".");break}}}}this.hostname.length>Mo&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=a.indexOf("#");i!==-1&&(this.hash=a.substr(i),a=a.slice(0,i));const s=a.indexOf("?");return s!==-1&&(this.search=a.substr(s),a=a.slice(0,s)),a&&(this.pathname=a),bu[r]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Yn.prototype.parseHost=function(e){let n=Ao.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const Ro=Object.freeze(Object.defineProperty({__proto__:null,decode:Xe,encode:En,format:$r,parse:Ur},Symbol.toStringTag,{value:"Module"})),Vu=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Zu=/[\0-\x1F\x7F-\x9F]/,Lo=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Gr=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Wu=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Yu=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Oo=Object.freeze(Object.defineProperty({__proto__:null,Any:Vu,Cc:Zu,Cf:Lo,P:Gr,S:Wu,Z:Yu},Symbol.toStringTag,{value:"Module"})),No=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),zo=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var yr;const Po=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),qo=(yr=String.fromCodePoint)!==null&&yr!==void 0?yr:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Bo(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Po.get(e))!==null&&n!==void 0?n:e}var ne;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ne||(ne={}));const jo=32;var Te;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Te||(Te={}));function Lr(e){return e>=ne.ZERO&&e<=ne.NINE}function Ho(e){return e>=ne.UPPER_A&&e<=ne.UPPER_F||e>=ne.LOWER_A&&e<=ne.LOWER_F}function $o(e){return e>=ne.UPPER_A&&e<=ne.UPPER_Z||e>=ne.LOWER_A&&e<=ne.LOWER_Z||Lr(e)}function Uo(e){return e===ne.EQUALS||$o(e)}var ee;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(ee||(ee={}));var Ae;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Ae||(Ae={}));class Go{constructor(n,r,u){this.decodeTree=n,this.emitCodePoint=r,this.errors=u,this.state=ee.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Ae.Strict}startEntity(n){this.decodeMode=n,this.state=ee.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,r){switch(this.state){case ee.EntityStart:return n.charCodeAt(r)===ne.NUM?(this.state=ee.NumericStart,this.consumed+=1,this.stateNumericStart(n,r+1)):(this.state=ee.NamedEntity,this.stateNamedEntity(n,r));case ee.NumericStart:return this.stateNumericStart(n,r);case ee.NumericDecimal:return this.stateNumericDecimal(n,r);case ee.NumericHex:return this.stateNumericHex(n,r);case ee.NamedEntity:return this.stateNamedEntity(n,r)}}stateNumericStart(n,r){return r>=n.length?-1:(n.charCodeAt(r)|jo)===ne.LOWER_X?(this.state=ee.NumericHex,this.consumed+=1,this.stateNumericHex(n,r+1)):(this.state=ee.NumericDecimal,this.stateNumericDecimal(n,r))}addToNumericResult(n,r,u,o){if(r!==u){const a=u-r;this.result=this.result*Math.pow(o,a)+parseInt(n.substr(r,a),o),this.consumed+=a}}stateNumericHex(n,r){const u=r;for(;r<n.length;){const o=n.charCodeAt(r);if(Lr(o)||Ho(o))r+=1;else return this.addToNumericResult(n,u,r,16),this.emitNumericEntity(o,3)}return this.addToNumericResult(n,u,r,16),-1}stateNumericDecimal(n,r){const u=r;for(;r<n.length;){const o=n.charCodeAt(r);if(Lr(o))r+=1;else return this.addToNumericResult(n,u,r,10),this.emitNumericEntity(o,2)}return this.addToNumericResult(n,u,r,10),-1}emitNumericEntity(n,r){var u;if(this.consumed<=r)return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===ne.SEMI)this.consumed+=1;else if(this.decodeMode===Ae.Strict)return 0;return this.emitCodePoint(Bo(this.result),this.consumed),this.errors&&(n!==ne.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,r){const{decodeTree:u}=this;let o=u[this.treeIndex],a=(o&Te.VALUE_LENGTH)>>14;for(;r<n.length;r++,this.excess++){const c=n.charCodeAt(r);if(this.treeIndex=Vo(u,o,this.treeIndex+Math.max(1,a),c),this.treeIndex<0)return this.result===0||this.decodeMode===Ae.Attribute&&(a===0||Uo(c))?0:this.emitNotTerminatedNamedEntity();if(o=u[this.treeIndex],a=(o&Te.VALUE_LENGTH)>>14,a!==0){if(c===ne.SEMI)return this.emitNamedEntityData(this.treeIndex,a,this.consumed+this.excess);this.decodeMode!==Ae.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:r,decodeTree:u}=this,o=(u[r]&Te.VALUE_LENGTH)>>14;return this.emitNamedEntityData(r,o,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,r,u){const{decodeTree:o}=this;return this.emitCodePoint(r===1?o[n]&~Te.VALUE_LENGTH:o[n+1],u),r===3&&this.emitCodePoint(o[n+2],u),u}end(){var n;switch(this.state){case ee.NamedEntity:return this.result!==0&&(this.decodeMode!==Ae.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case ee.NumericDecimal:return this.emitNumericEntity(0,2);case ee.NumericHex:return this.emitNumericEntity(0,3);case ee.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case ee.EntityStart:return 0}}}function Ku(e){let n="";const r=new Go(e,u=>n+=qo(u));return function(o,a){let c=0,i=0;for(;(i=o.indexOf("&",i))>=0;){n+=o.slice(c,i),r.startEntity(a);const f=r.write(o,i+1);if(f<0){c=i+r.end();break}c=i+f,i=f===0?c+1:c}const s=n+o.slice(c);return n="",s}}function Vo(e,n,r,u){const o=(n&Te.BRANCH_LENGTH)>>7,a=n&Te.JUMP_TABLE;if(o===0)return a!==0&&u===a?r:-1;if(a){const s=u-a;return s<0||s>=o?-1:e[r+s]-1}let c=r,i=c+o-1;for(;c<=i;){const s=c+i>>>1,f=e[s];if(f<u)c=s+1;else if(f>u)i=s-1;else return e[s+o]}return-1}const Ju=Ku(No);Ku(zo);function Zo(e,n=Ae.Legacy){return Ju(e,n)}function Wo(e){return Ju(e,Ae.Strict)}function Yo(e){return Object.prototype.toString.call(e)}function Vr(e){return Yo(e)==="[object String]"}const Ko=Object.prototype.hasOwnProperty;function Jo(e,n){return Ko.call(e,n)}function nr(e){return Array.prototype.slice.call(arguments,1).forEach(function(r){if(r){if(typeof r!="object")throw new TypeError(r+"must be object");Object.keys(r).forEach(function(u){e[u]=r[u]})}}),e}function Qu(e,n,r){return[].concat(e.slice(0,n),r,e.slice(n+1))}function Zr(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function xn(e){if(e>65535){e-=65536;const n=55296+(e>>10),r=56320+(e&1023);return String.fromCharCode(n,r)}return String.fromCharCode(e)}const Xu=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Qo=/&([a-z#][a-z0-9]{1,31});/gi,Xo=new RegExp(Xu.source+"|"+Qo.source,"gi"),ei=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function ni(e,n){if(n.charCodeAt(0)===35&&ei.test(n)){const u=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return Zr(u)?xn(u):e}const r=Zo(e);return r!==e?r:e}function ri(e){return e.indexOf("\\")<0?e:e.replace(Xu,"$1")}function en(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Xo,function(n,r,u){return r||ni(n,u)})}const ui=/[&<>"]/,ti=/[&<>"]/g,oi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function ii(e){return oi[e]}function Ie(e){return ui.test(e)?e.replace(ti,ii):e}const ai=/[.?*+^$[\]\\(){}|-]/g;function ci(e){return e.replace(ai,"\\$&")}function G(e){switch(e){case 9:case 32:return!0}return!1}function wn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function et(e){return Gr.test(e)||Wu.test(e)}function vn(e){return et(xn(e))}function Cn(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function rr(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function mu(e){return e===32||e===9||e===10||e===13}function ur(e){let n=0;for(;n<e.length&&mu(e.charCodeAt(n));n++);let r=e.length-1;for(;r>=n&&mu(e.charCodeAt(r));r--);return e.slice(n,r+1)}const li={mdurl:Ro,ucmicro:Oo},si=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Qu,asciiTrim:ur,assign:nr,escapeHtml:Ie,escapeRE:ci,fromCodePoint:xn,has:Jo,isMdAsciiPunct:Cn,isPunctChar:et,isPunctCharCode:vn,isSpace:G,isString:Vr,isValidEntityCode:Zr,isWhiteSpace:wn,lib:li,normalizeReference:rr,unescapeAll:en,unescapeMd:ri},Symbol.toStringTag,{value:"Module"}));function di(e,n,r){let u,o,a,c;const i=e.posMax,s=e.pos;for(e.pos=n+1,u=1;e.pos<i;){if(a=e.src.charCodeAt(e.pos),a===93&&(u--,u===0)){o=!0;break}if(c=e.pos,e.md.inline.skipToken(e),a===91){if(c===e.pos-1)u++;else if(r)return e.pos=s,-1}}let f=-1;return o&&(f=e.pos),e.pos=s,f}function fi(e,n,r){let u,o=n;const a={ok:!1,pos:0,str:""};if(e.charCodeAt(o)===60){for(o++;o<r;){if(u=e.charCodeAt(o),u===10||u===60)return a;if(u===62)return a.pos=o+1,a.str=en(e.slice(n+1,o)),a.ok=!0,a;if(u===92&&o+1<r){o+=2;continue}o++}return a}let c=0;for(;o<r&&(u=e.charCodeAt(o),!(u===32||u<32||u===127));){if(u===92&&o+1<r){if(e.charCodeAt(o+1)===32)break;o+=2;continue}if(u===40&&(c++,c>32))return a;if(u===41){if(c===0)break;c--}o++}return n===o||c!==0||(a.str=en(e.slice(n,o)),a.pos=o,a.ok=!0),a}function hi(e,n,r,u){let o,a=n;const c={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(u)c.str=u.str,c.marker=u.marker;else{if(a>=r)return c;let i=e.charCodeAt(a);if(i!==34&&i!==39&&i!==40)return c;n++,a++,i===40&&(i=41),c.marker=i}for(;a<r;){if(o=e.charCodeAt(a),o===c.marker)return c.pos=a+1,c.str+=en(e.slice(n,a)),c.ok=!0,c;if(o===40&&c.marker===41)return c;o===92&&a+1<r&&a++,a++}return c.can_continue=!0,c.str+=en(e.slice(n,a)),c}const pi=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:fi,parseLinkLabel:di,parseLinkTitle:hi},Symbol.toStringTag,{value:"Module"})),ke={};ke.code_inline=function(e,n,r,u,o){const a=e[n];return"<code"+o.renderAttrs(a)+">"+Ie(a.content)+"</code>"};ke.code_block=function(e,n,r,u,o){const a=e[n];return"<pre"+o.renderAttrs(a)+"><code>"+Ie(e[n].content)+`</code></pre>
`};ke.fence=function(e,n,r,u,o){const a=e[n],c=a.info?en(a.info).trim():"";let i="",s="";if(c){const b=c.split(/(\s+)/g);i=b[0],s=b.slice(2).join("")}let f;if(r.highlight?f=r.highlight(a.content,i,s)||Ie(a.content):f=Ie(a.content),f.indexOf("<pre")===0)return f+`
`;if(c){const b=a.attrIndex("class"),l=a.attrs?a.attrs.slice():[];b<0?l.push(["class",r.langPrefix+i]):(l[b]=l[b].slice(),l[b][1]+=" "+r.langPrefix+i);const d={attrs:l};return`<pre><code${o.renderAttrs(d)}>${f}</code></pre>
`}return`<pre><code${o.renderAttrs(a)}>${f}</code></pre>
`};ke.image=function(e,n,r,u,o){const a=e[n];return a.attrs[a.attrIndex("alt")][1]=o.renderInlineAsText(a.children,r,u),o.renderToken(e,n,r)};ke.hardbreak=function(e,n,r){return r.xhtmlOut?`<br />
`:`<br>
`};ke.softbreak=function(e,n,r){return r.breaks?r.xhtmlOut?`<br />
`:`<br>
`:`
`};ke.text=function(e,n){return Ie(e[n].content)};ke.html_block=function(e,n){return e[n].content};ke.html_inline=function(e,n){return e[n].content};function tn(){this.rules=nr({},ke)}tn.prototype.renderAttrs=function(n){let r,u,o;if(!n.attrs)return"";for(o="",r=0,u=n.attrs.length;r<u;r++)o+=" "+Ie(n.attrs[r][0])+'="'+Ie(n.attrs[r][1])+'"';return o};tn.prototype.renderToken=function(n,r,u){const o=n[r];let a="";if(o.hidden)return"";o.block&&o.nesting!==-1&&r&&n[r-1].hidden&&(a+=`
`),a+=(o.nesting===-1?"</":"<")+o.tag,a+=this.renderAttrs(o),o.nesting===0&&u.xhtmlOut&&(a+=" /");let c=!1;if(o.block&&(c=!0,o.nesting===1&&r+1<n.length)){const i=n[r+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===o.tag)&&(c=!1)}return a+=c?`>
`:">",a};tn.prototype.renderInline=function(e,n,r){let u="";const o=this.rules;for(let a=0,c=e.length;a<c;a++){const i=e[a].type;typeof o[i]<"u"?u+=o[i](e,a,n,r,this):u+=this.renderToken(e,a,n)}return u};tn.prototype.renderInlineAsText=function(e,n,r){let u="";for(let o=0,a=e.length;o<a;o++)switch(e[o].type){case"text":u+=e[o].content;break;case"image":u+=this.renderInlineAsText(e[o].children,n,r);break;case"html_inline":case"html_block":u+=e[o].content;break;case"softbreak":case"hardbreak":u+=`
`;break}return u};tn.prototype.render=function(e,n,r){let u="";const o=this.rules;for(let a=0,c=e.length;a<c;a++){const i=e[a].type;i==="inline"?u+=this.renderInline(e[a].children,n,r):typeof o[i]<"u"?u+=o[i](e,a,n,r,this):u+=this.renderToken(e,a,n,r)}return u};function te(){this.__rules__=[],this.__cache__=null}te.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};te.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(r){r.enabled&&r.alt.forEach(function(u){n.indexOf(u)<0&&n.push(u)})}),e.__cache__={},n.forEach(function(r){e.__cache__[r]=[],e.__rules__.forEach(function(u){u.enabled&&(r&&u.alt.indexOf(r)<0||e.__cache__[r].push(u.fn))})})};te.prototype.at=function(e,n,r){const u=this.__find__(e),o=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__[u].fn=n,this.__rules__[u].alt=o.alt||[],this.__cache__=null};te.prototype.before=function(e,n,r,u){const o=this.__find__(e),a=u||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o,0,{name:n,enabled:!0,fn:r,alt:a.alt||[]}),this.__cache__=null};te.prototype.after=function(e,n,r,u){const o=this.__find__(e),a=u||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o+1,0,{name:n,enabled:!0,fn:r,alt:a.alt||[]}),this.__cache__=null};te.prototype.push=function(e,n,r){const u=r||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};te.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const r=[];return e.forEach(function(u){const o=this.__find__(u);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[o].enabled=!0,r.push(u)},this),this.__cache__=null,r};te.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(r){r.enabled=!1}),this.enable(e,n)};te.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const r=[];return e.forEach(function(u){const o=this.__find__(u);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[o].enabled=!1,r.push(u)},this),this.__cache__=null,r};te.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function pe(e,n,r){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=r,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}pe.prototype.attrIndex=function(n){if(!this.attrs)return-1;const r=this.attrs;for(let u=0,o=r.length;u<o;u++)if(r[u][0]===n)return u;return-1};pe.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};pe.prototype.attrSet=function(n,r){const u=this.attrIndex(n),o=[n,r];u<0?this.attrPush(o):this.attrs[u]=o};pe.prototype.attrGet=function(n){const r=this.attrIndex(n);let u=null;return r>=0&&(u=this.attrs[r][1]),u};pe.prototype.attrJoin=function(n,r){const u=this.attrIndex(n);u<0?this.attrPush([n,r]):this.attrs[u][1]=this.attrs[u][1]+" "+r};function nt(e,n,r){this.src=e,this.env=r,this.tokens=[],this.inlineMode=!1,this.md=n}nt.prototype.Token=pe;const bi=/\r\n?|\n/g,mi=/\0/g;function gi(e){let n;n=e.src.replace(bi,`
`),n=n.replace(mi,"�"),e.src=n}function ki(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function yi(e){const n=e.tokens;for(let r=0,u=n.length;r<u;r++){const o=n[r];o.type==="inline"&&e.md.inline.parse(o.content,e.md,e.env,o.children)}}function xi(e){return/^<a[>\s]/i.test(e)}function wi(e){return/^<\/a\s*>/i.test(e)}function vi(e){const n=e.tokens;if(e.md.options.linkify)for(let r=0,u=n.length;r<u;r++){if(n[r].type!=="inline"||!e.md.linkify.pretest(n[r].content))continue;let o=n[r].children,a=0;for(let c=o.length-1;c>=0;c--){const i=o[c];if(i.type==="link_close"){for(c--;o[c].level!==i.level&&o[c].type!=="link_open";)c--;continue}if(i.type==="html_inline"&&(xi(i.content)&&a>0&&a--,wi(i.content)&&a++),!(a>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const s=i.content;let f=e.md.linkify.match(s);const b=[];let l=i.level,d=0;f.length>0&&f[0].index===0&&c>0&&o[c-1].type==="text_special"&&(f=f.slice(1));for(let h=0;h<f.length;h++){const m=f[h].url,g=e.md.normalizeLink(m);if(!e.md.validateLink(g))continue;let k=f[h].text;f[h].schema?f[h].schema==="mailto:"&&!/^mailto:/i.test(k)?k=e.md.normalizeLinkText("mailto:"+k).replace(/^mailto:/,""):k=e.md.normalizeLinkText(k):k=e.md.normalizeLinkText("http://"+k).replace(/^http:\/\//,"");const x=f[h].index;if(x>d){const R=new e.Token("text","",0);R.content=s.slice(d,x),R.level=l,b.push(R)}const v=new e.Token("link_open","a",1);v.attrs=[["href",g]],v.level=l++,v.markup="linkify",v.info="auto",b.push(v);const E=new e.Token("text","",0);E.content=k,E.level=l,b.push(E);const A=new e.Token("link_close","a",-1);A.level=--l,A.markup="linkify",A.info="auto",b.push(A),d=f[h].lastIndex}if(d<s.length){const h=new e.Token("text","",0);h.content=s.slice(d),h.level=l,b.push(h)}n[r].children=o=Qu(o,c,b)}}}}const rt=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Ci=/\((c|tm|r)\)/i,_i=/\((c|tm|r)\)/ig,Ei={c:"©",r:"®",tm:"™"};function Ai(e,n){return Ei[n.toLowerCase()]}function Di(e){let n=0;for(let r=e.length-1;r>=0;r--){const u=e[r];u.type==="text"&&!n&&(u.content=u.content.replace(_i,Ai)),u.type==="link_open"&&u.info==="auto"&&n--,u.type==="link_close"&&u.info==="auto"&&n++}}function Si(e){let n=0;for(let r=e.length-1;r>=0;r--){const u=e[r];u.type==="text"&&!n&&rt.test(u.content)&&(u.content=u.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),u.type==="link_open"&&u.info==="auto"&&n--,u.type==="link_close"&&u.info==="auto"&&n++}}function Fi(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(Ci.test(e.tokens[n].content)&&Di(e.tokens[n].children),rt.test(e.tokens[n].content)&&Si(e.tokens[n].children))}const Ti=/['"]/,gu=/['"]/g,ku="’";function Un(e,n,r,u){e[n]||(e[n]=[]),e[n].push({pos:r,ch:u})}function Mi(e,n){let r="",u=0;n.sort((o,a)=>o.pos-a.pos);for(let o=0;o<n.length;o++){const a=n[o];r+=e.slice(u,a.pos)+a.ch,u=a.pos+1}return r+e.slice(u)}function Ii(e,n){let r;const u=[],o={};for(let a=0;a<e.length;a++){const c=e[a],i=e[a].level;for(r=u.length-1;r>=0&&!(u[r].level<=i);r--);if(u.length=r+1,c.type!=="text")continue;const s=c.content;let f=0;const b=s.length;e:for(;f<b;){gu.lastIndex=f;const l=gu.exec(s);if(!l)break;let d=!0,h=!0;f=l.index+1;const m=l[0]==="'";let g=32;if(l.index-1>=0)g=s.charCodeAt(l.index-1);else for(r=a-1;r>=0&&!(e[r].type==="softbreak"||e[r].type==="hardbreak");r--)if(e[r].content){g=e[r].content.charCodeAt(e[r].content.length-1);break}let k=32;if(f<b)k=s.charCodeAt(f);else for(r=a+1;r<e.length&&!(e[r].type==="softbreak"||e[r].type==="hardbreak");r++)if(e[r].content){k=e[r].content.charCodeAt(0);break}const x=Cn(g)||vn(g),v=Cn(k)||vn(k),E=wn(g),A=wn(k);if(A?d=!1:v&&(E||x||(d=!1)),E?h=!1:x&&(A||v||(h=!1)),k===34&&l[0]==='"'&&g>=48&&g<=57&&(h=d=!1),d&&h&&(d=x,h=v),!d&&!h){m&&Un(o,a,l.index,ku);continue}if(h)for(r=u.length-1;r>=0;r--){let R=u[r];if(u[r].level<i)break;if(R.single===m&&u[r].level===i){R=u[r];let O,j;m?(O=n.md.options.quotes[2],j=n.md.options.quotes[3]):(O=n.md.options.quotes[0],j=n.md.options.quotes[1]),Un(o,a,l.index,j),Un(o,R.token,R.pos,O),u.length=r;continue e}}d?u.push({token:a,pos:l.index,single:m,level:i}):h&&m&&Un(o,a,l.index,ku)}}Object.keys(o).forEach(function(a){e[a].content=Mi(e[a].content,o[a])})}function Ri(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Ti.test(e.tokens[n].content)||Ii(e.tokens[n].children,e)}function Li(e){let n,r;const u=e.tokens,o=u.length;for(let a=0;a<o;a++){if(u[a].type!=="inline")continue;const c=u[a].children,i=c.length;for(n=0;n<i;n++)c[n].type==="text_special"&&(c[n].type="text");for(n=r=0;n<i;n++)c[n].type==="text"&&n+1<i&&c[n+1].type==="text"?c[n+1].content=c[n].content+c[n+1].content:(n!==r&&(c[r]=c[n]),r++);n!==r&&(c.length=r)}}const xr=[["normalize",gi],["block",ki],["inline",yi],["linkify",vi],["replacements",Fi],["smartquotes",Ri],["text_join",Li]];function Wr(){this.ruler=new te;for(let e=0;e<xr.length;e++)this.ruler.push(xr[e][0],xr[e][1])}Wr.prototype.process=function(e){const n=this.ruler.getRules("");for(let r=0,u=n.length;r<u;r++)n[r](e)};Wr.prototype.State=nt;function ye(e,n,r,u){this.src=e,this.md=n,this.env=r,this.tokens=u,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const o=this.src;for(let a=0,c=0,i=0,s=0,f=o.length,b=!1;c<f;c++){const l=o.charCodeAt(c);if(!b)if(G(l)){i++,l===9?s+=4-s%4:s++;continue}else b=!0;(l===10||c===f-1)&&(l!==10&&c++,this.bMarks.push(a),this.eMarks.push(c),this.tShift.push(i),this.sCount.push(s),this.bsCount.push(0),b=!1,i=0,s=0,a=c+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ye.prototype.push=function(e,n,r){const u=new pe(e,n,r);return u.block=!0,r<0&&this.level--,u.level=this.level,r>0&&this.level++,this.tokens.push(u),u};ye.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};ye.prototype.skipEmptyLines=function(n){for(let r=this.lineMax;n<r&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};ye.prototype.skipSpaces=function(n){for(let r=this.src.length;n<r;n++){const u=this.src.charCodeAt(n);if(!G(u))break}return n};ye.prototype.skipSpacesBack=function(n,r){if(n<=r)return n;for(;n>r;)if(!G(this.src.charCodeAt(--n)))return n+1;return n};ye.prototype.skipChars=function(n,r){for(let u=this.src.length;n<u&&this.src.charCodeAt(n)===r;n++);return n};ye.prototype.skipCharsBack=function(n,r,u){if(n<=u)return n;for(;n>u;)if(r!==this.src.charCodeAt(--n))return n+1;return n};ye.prototype.getLines=function(n,r,u,o){if(n>=r)return"";const a=new Array(r-n);for(let c=0,i=n;i<r;i++,c++){let s=0;const f=this.bMarks[i];let b=f,l;for(i+1<r||o?l=this.eMarks[i]+1:l=this.eMarks[i];b<l&&s<u;){const d=this.src.charCodeAt(b);if(G(d))d===9?s+=4-(s+this.bsCount[i])%4:s++;else if(b-f<this.tShift[i])s++;else break;b++}s>u?a[c]=new Array(s-u+1).join(" ")+this.src.slice(b,l):a[c]=this.src.slice(b,l)}return a.join("")};ye.prototype.Token=pe;const Oi=65536;function wr(e,n){const r=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];return e.src.slice(r,u)}function yu(e){const n=[],r=e.length;let u=0,o=e.charCodeAt(u),a=!1,c=0,i="";for(;u<r;)o===124&&(a?(i+=e.substring(c,u-1),c=u):(n.push(i+e.substring(c,u)),i="",c=u+1)),a=o===92,u++,o=e.charCodeAt(u);return n.push(i+e.substring(c)),n}function Ni(e,n,r,u){if(n+2>r)return!1;let o=n+1;if(e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)return!1;let a=e.bMarks[o]+e.tShift[o];if(a>=e.eMarks[o])return!1;const c=e.src.charCodeAt(a++);if(c!==124&&c!==45&&c!==58||a>=e.eMarks[o])return!1;const i=e.src.charCodeAt(a++);if(i!==124&&i!==45&&i!==58&&!G(i)||c===45&&G(i))return!1;for(;a<e.eMarks[o];){const A=e.src.charCodeAt(a);if(A!==124&&A!==45&&A!==58&&!G(A))return!1;a++}let s=wr(e,n+1),f=s.split("|");const b=[];for(let A=0;A<f.length;A++){const R=f[A].trim();if(!R){if(A===0||A===f.length-1)continue;return!1}if(!/^:?-+:?$/.test(R))return!1;R.charCodeAt(R.length-1)===58?b.push(R.charCodeAt(0)===58?"center":"right"):R.charCodeAt(0)===58?b.push("left"):b.push("")}if(s=wr(e,n).trim(),s.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;f=yu(s),f.length&&f[0]===""&&f.shift(),f.length&&f[f.length-1]===""&&f.pop();const l=f.length;if(l===0||l!==b.length)return!1;if(u)return!0;const d=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),m=e.push("table_open","table",1),g=[n,0];m.map=g;const k=e.push("thead_open","thead",1);k.map=[n,n+1];const x=e.push("tr_open","tr",1);x.map=[n,n+1];for(let A=0;A<f.length;A++){const R=e.push("th_open","th",1);b[A]&&(R.attrs=[["style","text-align:"+b[A]]]);const O=e.push("inline","",0);O.content=f[A].trim(),O.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let v,E=0;for(o=n+2;o<r&&!(e.sCount[o]<e.blkIndent);o++){let A=!1;for(let O=0,j=h.length;O<j;O++)if(h[O](e,o,r,!0)){A=!0;break}if(A||(s=wr(e,o).trim(),!s)||e.sCount[o]-e.blkIndent>=4||(f=yu(s),f.length&&f[0]===""&&f.shift(),f.length&&f[f.length-1]===""&&f.pop(),E+=l-f.length,E>Oi))break;if(o===n+2){const O=e.push("tbody_open","tbody",1);O.map=v=[n+2,0]}const R=e.push("tr_open","tr",1);R.map=[o,o+1];for(let O=0;O<l;O++){const j=e.push("td_open","td",1);b[O]&&(j.attrs=[["style","text-align:"+b[O]]]);const U=e.push("inline","",0);U.content=f[O]?f[O].trim():"",U.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return v&&(e.push("tbody_close","tbody",-1),v[1]=o),e.push("table_close","table",-1),g[1]=o,e.parentType=d,e.line=o,!0}function zi(e,n,r){if(e.sCount[n]-e.blkIndent<4)return!1;let u=n+1,o=u;for(;u<r;){if(e.isEmpty(u)){u++;continue}if(e.sCount[u]-e.blkIndent>=4){u++,o=u;continue}break}e.line=o;const a=e.push("code_block","code",0);return a.content=e.getLines(n,o,4+e.blkIndent,!1)+`
`,a.map=[n,e.line],!0}function Pi(e,n,r,u){let o=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||o+3>a)return!1;const c=e.src.charCodeAt(o);if(c!==126&&c!==96)return!1;let i=o;o=e.skipChars(o,c);let s=o-i;if(s<3)return!1;const f=e.src.slice(i,o),b=e.src.slice(o,a);if(c===96&&b.indexOf(String.fromCharCode(c))>=0)return!1;if(u)return!0;let l=n,d=!1;for(;l++,!(l>=r||(o=i=e.bMarks[l]+e.tShift[l],a=e.eMarks[l],o<a&&e.sCount[l]<e.blkIndent));)if(e.src.charCodeAt(o)===c&&!(e.sCount[l]-e.blkIndent>=4)&&(o=e.skipChars(o,c),!(o-i<s)&&(o=e.skipSpaces(o),!(o<a)))){d=!0;break}s=e.sCount[n],e.line=l+(d?1:0);const h=e.push("fence","code",0);return h.info=b,h.content=e.getLines(n+1,l,s,!0),h.markup=f,h.map=[n,e.line],!0}function qi(e,n,r,u){let o=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];const c=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==62)return!1;if(u)return!0;const i=[],s=[],f=[],b=[],l=e.md.block.ruler.getRules("blockquote"),d=e.parentType;e.parentType="blockquote";let h=!1,m;for(m=n;m<r;m++){const E=e.sCount[m]<e.blkIndent;if(o=e.bMarks[m]+e.tShift[m],a=e.eMarks[m],o>=a)break;if(e.src.charCodeAt(o++)===62&&!E){let R=e.sCount[m]+1,O,j;e.src.charCodeAt(o)===32?(o++,R++,j=!1,O=!0):e.src.charCodeAt(o)===9?(O=!0,(e.bsCount[m]+R)%4===3?(o++,R++,j=!1):j=!0):O=!1;let U=R;for(i.push(e.bMarks[m]),e.bMarks[m]=o;o<a;){const J=e.src.charCodeAt(o);if(G(J))J===9?U+=4-(U+e.bsCount[m]+(j?1:0))%4:U++;else break;o++}h=o>=a,s.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+(O?1:0),f.push(e.sCount[m]),e.sCount[m]=U-R,b.push(e.tShift[m]),e.tShift[m]=o-e.bMarks[m];continue}if(h)break;let A=!1;for(let R=0,O=l.length;R<O;R++)if(l[R](e,m,r,!0)){A=!0;break}if(A){e.lineMax=m,e.blkIndent!==0&&(i.push(e.bMarks[m]),s.push(e.bsCount[m]),b.push(e.tShift[m]),f.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}i.push(e.bMarks[m]),s.push(e.bsCount[m]),b.push(e.tShift[m]),f.push(e.sCount[m]),e.sCount[m]=-1}const g=e.blkIndent;e.blkIndent=0;const k=e.push("blockquote_open","blockquote",1);k.markup=">";const x=[n,0];k.map=x,e.md.block.tokenize(e,n,m);const v=e.push("blockquote_close","blockquote",-1);v.markup=">",e.lineMax=c,e.parentType=d,x[1]=e.line;for(let E=0;E<b.length;E++)e.bMarks[E+n]=i[E],e.tShift[E+n]=b[E],e.sCount[E+n]=f[E],e.bsCount[E+n]=s[E];return e.blkIndent=g,!0}function Bi(e,n,r,u){const o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.bMarks[n]+e.tShift[n];const c=e.src.charCodeAt(a++);if(c!==42&&c!==45&&c!==95)return!1;let i=1;for(;a<o;){const f=e.src.charCodeAt(a++);if(f!==c&&!G(f))return!1;f===c&&i++}if(i<3)return!1;if(u)return!0;e.line=n+1;const s=e.push("hr","hr",0);return s.map=[n,e.line],s.markup=Array(i+1).join(String.fromCharCode(c)),!0}function xu(e,n){const r=e.eMarks[n];let u=e.bMarks[n]+e.tShift[n];const o=e.src.charCodeAt(u++);if(o!==42&&o!==45&&o!==43)return-1;if(u<r){const a=e.src.charCodeAt(u);if(!G(a))return-1}return u}function wu(e,n){const r=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];let o=r;if(o+1>=u)return-1;let a=e.src.charCodeAt(o++);if(a<48||a>57)return-1;for(;;){if(o>=u)return-1;if(a=e.src.charCodeAt(o++),a>=48&&a<=57){if(o-r>=10)return-1;continue}if(a===41||a===46)break;return-1}return o<u&&(a=e.src.charCodeAt(o),!G(a))?-1:o}function ji(e,n){const r=e.level+2;for(let u=n+2,o=e.tokens.length-2;u<o;u++)e.tokens[u].level===r&&e.tokens[u].type==="paragraph_open"&&(e.tokens[u+2].hidden=!0,e.tokens[u].hidden=!0,u+=2)}function Hi(e,n,r,u){let o,a,c,i,s=n,f=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let b=!1;u&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(b=!0);let l,d,h;if((h=wu(e,s))>=0){if(l=!0,c=e.bMarks[s]+e.tShift[s],d=Number(e.src.slice(c,h-1)),b&&d!==1)return!1}else if((h=xu(e,s))>=0)l=!1;else return!1;if(b&&e.skipSpaces(h)>=e.eMarks[s])return!1;if(u)return!0;const m=e.src.charCodeAt(h-1),g=e.tokens.length;l?(i=e.push("ordered_list_open","ol",1),d!==1&&(i.attrs=[["start",d]])):i=e.push("bullet_list_open","ul",1);const k=[s,0];i.map=k,i.markup=String.fromCharCode(m);let x=!1;const v=e.md.block.ruler.getRules("list"),E=e.parentType;for(e.parentType="list";s<r;){a=h,o=e.eMarks[s];const A=e.sCount[s]+h-(e.bMarks[s]+e.tShift[s]);let R=A;for(;a<o;){const ce=e.src.charCodeAt(a);if(ce===9)R+=4-(R+e.bsCount[s])%4;else if(ce===32)R++;else break;a++}const O=a;let j;O>=o?j=1:j=R-A,j>4&&(j=1);const U=A+j;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(m);const J=[s,0];i.map=J,l&&(i.info=e.src.slice(c,h-1));const ae=e.tight,xe=e.tShift[s],an=e.sCount[s],Re=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=U,e.tight=!0,e.tShift[s]=O-e.bMarks[s],e.sCount[s]=R,O>=o&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,r):e.md.block.tokenize(e,s,r,!0),(!e.tight||x)&&(f=!1),x=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Re,e.tShift[s]=xe,e.sCount[s]=an,e.tight=ae,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(m),s=e.line,J[1]=s,s>=r||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let Le=!1;for(let ce=0,Q=v.length;ce<Q;ce++)if(v[ce](e,s,r,!0)){Le=!0;break}if(Le)break;if(l){if(h=wu(e,s),h<0)break;c=e.bMarks[s]+e.tShift[s]}else if(h=xu(e,s),h<0)break;if(m!==e.src.charCodeAt(h-1))break}return l?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(m),k[1]=s,e.line=s,e.parentType=E,f&&ji(e,g),!0}function $i(e,n,r,u){let o=e.bMarks[n]+e.tShift[n],a=e.eMarks[n],c=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==91)return!1;function i(v){const E=e.lineMax;if(v>=E||e.isEmpty(v))return null;let A=!1;if(e.sCount[v]-e.blkIndent>3&&(A=!0),e.sCount[v]<0&&(A=!0),!A){const j=e.md.block.ruler.getRules("reference"),U=e.parentType;e.parentType="reference";let J=!1;for(let ae=0,xe=j.length;ae<xe;ae++)if(j[ae](e,v,E,!0)){J=!0;break}if(e.parentType=U,J)return null}const R=e.bMarks[v]+e.tShift[v],O=e.eMarks[v];return e.src.slice(R,O+1)}let s=e.src.slice(o,a+1);a=s.length;let f=-1;for(o=1;o<a;o++){const v=s.charCodeAt(o);if(v===91)return!1;if(v===93){f=o;break}else if(v===10){const E=i(c);E!==null&&(s+=E,a=s.length,c++)}else if(v===92&&(o++,o<a&&s.charCodeAt(o)===10)){const E=i(c);E!==null&&(s+=E,a=s.length,c++)}}if(f<0||s.charCodeAt(f+1)!==58)return!1;for(o=f+2;o<a;o++){const v=s.charCodeAt(o);if(v===10){const E=i(c);E!==null&&(s+=E,a=s.length,c++)}else if(!G(v))break}const b=e.md.helpers.parseLinkDestination(s,o,a);if(!b.ok)return!1;const l=e.md.normalizeLink(b.str);if(!e.md.validateLink(l))return!1;o=b.pos;const d=o,h=c,m=o;for(;o<a;o++){const v=s.charCodeAt(o);if(v===10){const E=i(c);E!==null&&(s+=E,a=s.length,c++)}else if(!G(v))break}let g=e.md.helpers.parseLinkTitle(s,o,a);for(;g.can_continue;){const v=i(c);if(v===null)break;s+=v,o=a,a=s.length,c++,g=e.md.helpers.parseLinkTitle(s,o,a,g)}let k;for(o<a&&m!==o&&g.ok?(k=g.str,o=g.pos):(k="",o=d,c=h);o<a;){const v=s.charCodeAt(o);if(!G(v))break;o++}if(o<a&&s.charCodeAt(o)!==10&&k)for(k="",o=d,c=h;o<a;){const v=s.charCodeAt(o);if(!G(v))break;o++}if(o<a&&s.charCodeAt(o)!==10)return!1;const x=rr(s.slice(1,f));return x?(u||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[x]>"u"&&(e.env.references[x]={title:k,href:l}),e.line=c),!0):!1}const Ui=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Gi="[a-zA-Z_:][a-zA-Z0-9:._-]*",Vi="[^\"'=<>`\\x00-\\x20]+",Zi="'[^']*'",Wi='"[^"]*"',Yi="(?:"+Vi+"|"+Zi+"|"+Wi+")",Ki="(?:\\s+"+Gi+"(?:\\s*=\\s*"+Yi+")?)",ut="<[A-Za-z][A-Za-z0-9\\-]*"+Ki+"*\\s*\\/?>",tt="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Ji="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Qi="<[?][\\s\\S]*?[?]>",Xi="<![A-Za-z][^>]*>",ea="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",na=new RegExp("^(?:"+ut+"|"+tt+"|"+Ji+"|"+Qi+"|"+Xi+"|"+ea+")"),ra=new RegExp("^(?:"+ut+"|"+tt+")"),Ne=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Ui.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(ra.source+"\\s*$"),/^$/,!1]];function ua(e,n,r,u){let o=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(o)!==60)return!1;let c=e.src.slice(o,a),i=0;for(;i<Ne.length&&!Ne[i][0].test(c);i++);if(i===Ne.length)return!1;if(u)return Ne[i][2];let s=n+1;const f=Ne[i][1].test("");if(!Ne[i][1].test(c)){for(;s<r&&!(e.sCount[s]<e.blkIndent&&(f||!e.isEmpty(s)));s++)if(o=e.bMarks[s]+e.tShift[s],a=e.eMarks[s],c=e.src.slice(o,a),Ne[i][1].test(c)){c.length!==0&&s++;break}}e.line=s;const b=e.push("html_block","",0);return b.map=[n,s],b.content=e.getLines(n,s,e.blkIndent,!0),!0}function ta(e,n,r,u){let o=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let c=e.src.charCodeAt(o);if(c!==35||o>=a)return!1;let i=1;for(c=e.src.charCodeAt(++o);c===35&&o<a&&i<=6;)i++,c=e.src.charCodeAt(++o);if(i>6||o<a&&!G(c))return!1;if(u)return!0;a=e.skipSpacesBack(a,o);const s=e.skipCharsBack(a,35,o);s>o&&G(e.src.charCodeAt(s-1))&&(a=s),e.line=n+1;const f=e.push("heading_open","h"+String(i),1);f.markup="########".slice(0,i),f.map=[n,e.line];const b=e.push("inline","",0);b.content=ur(e.src.slice(o,a)),b.map=[n,e.line],b.children=[];const l=e.push("heading_close","h"+String(i),-1);return l.markup="########".slice(0,i),!0}function oa(e,n,r){const u=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const o=e.parentType;e.parentType="paragraph";let a=0,c,i=n+1;for(;i<r&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let h=e.bMarks[i]+e.tShift[i];const m=e.eMarks[i];if(h<m&&(c=e.src.charCodeAt(h),(c===45||c===61)&&(h=e.skipChars(h,c),h=e.skipSpaces(h),h>=m))){a=c===61?1:2;break}}if(e.sCount[i]<0)continue;let d=!1;for(let h=0,m=u.length;h<m;h++)if(u[h](e,i,r,!0)){d=!0;break}if(d)break}if(!a)return e.parentType=o,!1;const s=ur(e.getLines(n,i,e.blkIndent,!1));e.line=i+1;const f=e.push("heading_open","h"+String(a),1);f.markup=String.fromCharCode(c),f.map=[n,e.line];const b=e.push("inline","",0);b.content=s,b.map=[n,e.line-1],b.children=[];const l=e.push("heading_close","h"+String(a),-1);return l.markup=String.fromCharCode(c),e.parentType=o,!0}function ia(e,n,r){const u=e.md.block.ruler.getRules("paragraph"),o=e.parentType;let a=n+1;for(e.parentType="paragraph";a<r&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let f=!1;for(let b=0,l=u.length;b<l;b++)if(u[b](e,a,r,!0)){f=!0;break}if(f)break}const c=ur(e.getLines(n,a,e.blkIndent,!1));e.line=a;const i=e.push("paragraph_open","p",1);i.map=[n,e.line];const s=e.push("inline","",0);return s.content=c,s.map=[n,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=o,!0}const Gn=[["table",Ni,["paragraph","reference"]],["code",zi],["fence",Pi,["paragraph","reference","blockquote","list"]],["blockquote",qi,["paragraph","reference","blockquote","list"]],["hr",Bi,["paragraph","reference","blockquote","list"]],["list",Hi,["paragraph","reference","blockquote"]],["reference",$i],["html_block",ua,["paragraph","reference","blockquote"]],["heading",ta,["paragraph","reference","blockquote"]],["lheading",oa],["paragraph",ia]];function tr(){this.ruler=new te;for(let e=0;e<Gn.length;e++)this.ruler.push(Gn[e][0],Gn[e][1],{alt:(Gn[e][2]||[]).slice()})}tr.prototype.tokenize=function(e,n,r){const u=this.ruler.getRules(""),o=u.length,a=e.md.options.maxNesting;let c=n,i=!1;for(;c<r&&(e.line=c=e.skipEmptyLines(c),!(c>=r||e.sCount[c]<e.blkIndent));){if(e.level>=a){e.line=r;break}const s=e.line;let f=!1;for(let b=0;b<o;b++)if(f=u[b](e,c,r,!1),f){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!f)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),c=e.line,c<r&&e.isEmpty(c)&&(i=!0,c++,e.line=c)}};tr.prototype.parse=function(e,n,r,u){if(!e)return;const o=new this.State(e,n,r,u);this.tokenize(o,o.line,o.lineMax)};tr.prototype.State=ye;function An(e,n,r,u){this.src=e,this.env=r,this.md=n,this.tokens=u,this.tokens_meta=Array(u.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}An.prototype.pushPending=function(){const e=new pe("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};An.prototype.push=function(e,n,r){this.pending&&this.pushPending();const u=new pe(e,n,r);let o=null;return r<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),u.level=this.level,r>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],o={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(u),this.tokens_meta.push(o),u};An.prototype.scanDelims=function(e,n){const r=this.posMax,u=this.src.charCodeAt(e);let o;if(e===0)o=32;else if(e===1)o=this.src.charCodeAt(0),(o&63488)===55296&&(o=65533);else if(o=this.src.charCodeAt(e-1),(o&64512)===56320){const k=this.src.charCodeAt(e-2);o=(k&64512)===55296?65536+(k-55296<<10)+(o-56320):65533}else(o&64512)===55296&&(o=65533);let a=e;for(;a<r&&this.src.charCodeAt(a)===u;)a++;const c=a-e;let i=a<r?this.src.charCodeAt(a):32;if((i&64512)===55296){const k=this.src.charCodeAt(a+1);i=(k&64512)===56320?65536+(i-55296<<10)+(k-56320):65533}else(i&64512)===56320&&(i=65533);const s=Cn(o)||vn(o),f=Cn(i)||vn(i),b=wn(o),l=wn(i),d=!l&&(!f||b||s),h=!b&&(!s||l||f);return{can_open:d&&(n||!h||s),can_close:h&&(n||!d||f),length:c}};An.prototype.Token=pe;function aa(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function ca(e,n){let r=e.pos;for(;r<e.posMax&&!aa(e.src.charCodeAt(r));)r++;return r===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,r)),e.pos=r,!0)}const la=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function sa(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const r=e.pos,u=e.posMax;if(r+3>u||e.src.charCodeAt(r)!==58||e.src.charCodeAt(r+1)!==47||e.src.charCodeAt(r+2)!==47)return!1;const o=e.pending.match(la);if(!o)return!1;const a=o[1],c=e.md.linkify.matchAtStart(e.src.slice(r-a.length));if(!c)return!1;let i=c.url;if(i.length<=a.length)return!1;let s=i.length;for(;s>0&&i.charCodeAt(s-1)===42;)s--;s!==i.length&&(i=i.slice(0,s));const f=e.md.normalizeLink(i);if(!e.md.validateLink(f))return!1;if(!n){e.pending=e.pending.slice(0,-a.length);const b=e.push("link_open","a",1);b.attrs=[["href",f]],b.markup="linkify",b.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(i);const d=e.push("link_close","a",-1);d.markup="linkify",d.info="auto"}return e.pos+=i.length-a.length,!0}function da(e,n){let r=e.pos;if(e.src.charCodeAt(r)!==10)return!1;const u=e.pending.length-1,o=e.posMax;if(!n)if(u>=0&&e.pending.charCodeAt(u)===32)if(u>=1&&e.pending.charCodeAt(u-1)===32){let a=u-1;for(;a>=1&&e.pending.charCodeAt(a-1)===32;)a--;e.pending=e.pending.slice(0,a),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(r++;r<o&&G(e.src.charCodeAt(r));)r++;return e.pos=r,!0}const Yr=[];for(let e=0;e<256;e++)Yr.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Yr[e.charCodeAt(0)]=1});function fa(e,n){let r=e.pos;const u=e.posMax;if(e.src.charCodeAt(r)!==92||(r++,r>=u))return!1;let o=e.src.charCodeAt(r);if(o===10){for(n||e.push("hardbreak","br",0),r++;r<u&&(o=e.src.charCodeAt(r),!!G(o));)r++;return e.pos=r,!0}let a=e.src[r];if(o>=55296&&o<=56319&&r+1<u){const i=e.src.charCodeAt(r+1);i>=56320&&i<=57343&&(a+=e.src[r+1],r++)}const c="\\"+a;if(!n){const i=e.push("text_special","",0);o<256&&Yr[o]!==0?i.content=a:i.content=c,i.markup=c,i.info="escape"}return e.pos=r+1,!0}function ha(e,n){let r=e.pos;if(e.src.charCodeAt(r)!==96)return!1;const o=r;r++;const a=e.posMax;for(;r<a&&e.src.charCodeAt(r)===96;)r++;const c=e.src.slice(o,r),i=c.length;if(e.backticksScanned&&(e.backticks[i]||0)<=o)return n||(e.pending+=c),e.pos+=i,!0;let s=r,f;for(;(f=e.src.indexOf("`",s))!==-1;){for(s=f+1;s<a&&e.src.charCodeAt(s)===96;)s++;const b=s-f;if(b===i){if(!n){const l=e.push("code_inline","code",0);l.markup=c,l.content=e.src.slice(r,f).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[b]=f}return e.backticksScanned=!0,n||(e.pending+=c),e.pos+=i,!0}function pa(e,n){const r=e.pos,u=e.src.charCodeAt(r);if(n||u!==126)return!1;const o=e.scanDelims(e.pos,!0);let a=o.length;const c=String.fromCharCode(u);if(a<2)return!1;let i;a%2&&(i=e.push("text","",0),i.content=c,a--);for(let s=0;s<a;s+=2)i=e.push("text","",0),i.content=c+c,e.delimiters.push({marker:u,length:0,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close});return e.pos+=o.length,!0}function vu(e,n){let r;const u=[],o=n.length;for(let a=0;a<o;a++){const c=n[a];if(c.marker!==126||c.end===-1)continue;const i=n[c.end];r=e.tokens[c.token],r.type="s_open",r.tag="s",r.nesting=1,r.markup="~~",r.content="",r=e.tokens[i.token],r.type="s_close",r.tag="s",r.nesting=-1,r.markup="~~",r.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&u.push(i.token-1)}for(;u.length;){const a=u.pop();let c=a+1;for(;c<e.tokens.length&&e.tokens[c].type==="s_close";)c++;c--,a!==c&&(r=e.tokens[c],e.tokens[c]=e.tokens[a],e.tokens[a]=r)}}function ba(e){const n=e.tokens_meta,r=e.tokens_meta.length;vu(e,e.delimiters);for(let u=0;u<r;u++)n[u]&&n[u].delimiters&&vu(e,n[u].delimiters)}const ot={tokenize:pa,postProcess:ba};function ma(e,n){const r=e.pos,u=e.src.charCodeAt(r);if(n||u!==95&&u!==42)return!1;const o=e.scanDelims(e.pos,u===42);for(let a=0;a<o.length;a++){const c=e.push("text","",0);c.content=String.fromCharCode(u),e.delimiters.push({marker:u,length:o.length,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close})}return e.pos+=o.length,!0}function Cu(e,n){const r=n.length;for(let u=r-1;u>=0;u--){const o=n[u];if(o.marker!==95&&o.marker!==42||o.end===-1)continue;const a=n[o.end],c=u>0&&n[u-1].end===o.end+1&&n[u-1].marker===o.marker&&n[u-1].token===o.token-1&&n[o.end+1].token===a.token+1,i=String.fromCharCode(o.marker),s=e.tokens[o.token];s.type=c?"strong_open":"em_open",s.tag=c?"strong":"em",s.nesting=1,s.markup=c?i+i:i,s.content="";const f=e.tokens[a.token];f.type=c?"strong_close":"em_close",f.tag=c?"strong":"em",f.nesting=-1,f.markup=c?i+i:i,f.content="",c&&(e.tokens[n[u-1].token].content="",e.tokens[n[o.end+1].token].content="",u--)}}function ga(e){const n=e.tokens_meta,r=e.tokens_meta.length;Cu(e,e.delimiters);for(let u=0;u<r;u++)n[u]&&n[u].delimiters&&Cu(e,n[u].delimiters)}const it={tokenize:ma,postProcess:ga};function ka(e,n){let r,u,o,a,c="",i="",s=e.pos,f=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const b=e.pos,l=e.posMax,d=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let m=h+1;if(m<l&&e.src.charCodeAt(m)===40){for(f=!1,m++;m<l&&(r=e.src.charCodeAt(m),!(!G(r)&&r!==10));m++);if(m>=l)return!1;if(s=m,o=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),o.ok){for(c=e.md.normalizeLink(o.str),e.md.validateLink(c)?m=o.pos:c="",s=m;m<l&&(r=e.src.charCodeAt(m),!(!G(r)&&r!==10));m++);if(o=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<l&&s!==m&&o.ok)for(i=o.str,m=o.pos;m<l&&(r=e.src.charCodeAt(m),!(!G(r)&&r!==10));m++);}(m>=l||e.src.charCodeAt(m)!==41)&&(f=!0),m++}if(f){if(typeof e.env.references>"u")return!1;if(m<l&&e.src.charCodeAt(m)===91?(s=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?u=e.src.slice(s,m++):m=h+1):m=h+1,u||(u=e.src.slice(d,h)),a=e.env.references[rr(u)],!a)return e.pos=b,!1;c=a.href,i=a.title}if(!n){e.pos=d,e.posMax=h;const g=e.push("link_open","a",1),k=[["href",c]];g.attrs=k,i&&k.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=m,e.posMax=l,!0}function ya(e,n){let r,u,o,a,c,i,s,f,b="";const l=e.pos,d=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(a=m+1,a<d&&e.src.charCodeAt(a)===40){for(a++;a<d&&(r=e.src.charCodeAt(a),!(!G(r)&&r!==10));a++);if(a>=d)return!1;for(f=a,i=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),i.ok&&(b=e.md.normalizeLink(i.str),e.md.validateLink(b)?a=i.pos:b=""),f=a;a<d&&(r=e.src.charCodeAt(a),!(!G(r)&&r!==10));a++);if(i=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<d&&f!==a&&i.ok)for(s=i.str,a=i.pos;a<d&&(r=e.src.charCodeAt(a),!(!G(r)&&r!==10));a++);else s="";if(a>=d||e.src.charCodeAt(a)!==41)return e.pos=l,!1;a++}else{if(typeof e.env.references>"u")return!1;if(a<d&&e.src.charCodeAt(a)===91?(f=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?o=e.src.slice(f,a++):a=m+1):a=m+1,o||(o=e.src.slice(h,m)),c=e.env.references[rr(o)],!c)return e.pos=l,!1;b=c.href,s=c.title}if(!n){u=e.src.slice(h,m);const g=[];e.md.inline.parse(u,e.md,e.env,g);const k=e.push("image","img",0),x=[["src",b],["alt",""]];k.attrs=x,k.children=g,k.content=u,s&&x.push(["title",s])}return e.pos=a,e.posMax=d,!0}const xa=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,wa=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function va(e,n){let r=e.pos;if(e.src.charCodeAt(r)!==60)return!1;const u=e.pos,o=e.posMax;for(;;){if(++r>=o)return!1;const c=e.src.charCodeAt(r);if(c===60)return!1;if(c===62)break}const a=e.src.slice(u+1,r);if(wa.test(a)){const c=e.md.normalizeLink(a);if(!e.md.validateLink(c))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",c]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(a);const f=e.push("link_close","a",-1);f.markup="autolink",f.info="auto"}return e.pos+=a.length+2,!0}if(xa.test(a)){const c=e.md.normalizeLink("mailto:"+a);if(!e.md.validateLink(c))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",c]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(a);const f=e.push("link_close","a",-1);f.markup="autolink",f.info="auto"}return e.pos+=a.length+2,!0}return!1}function Ca(e){return/^<a[>\s]/i.test(e)}function _a(e){return/^<\/a\s*>/i.test(e)}function Ea(e){const n=e|32;return n>=97&&n<=122}function Aa(e,n){if(!e.md.options.html)return!1;const r=e.posMax,u=e.pos;if(e.src.charCodeAt(u)!==60||u+2>=r)return!1;const o=e.src.charCodeAt(u+1);if(o!==33&&o!==63&&o!==47&&!Ea(o))return!1;const a=e.src.slice(u).match(na);if(!a)return!1;if(!n){const c=e.push("html_inline","",0);c.content=a[0],Ca(c.content)&&e.linkLevel++,_a(c.content)&&e.linkLevel--}return e.pos+=a[0].length,!0}const Da=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Sa=/^&([a-z][a-z0-9]{1,31});/i;function Fa(e,n){const r=e.pos,u=e.posMax;if(e.src.charCodeAt(r)!==38||r+1>=u)return!1;if(e.src.charCodeAt(r+1)===35){const a=e.src.slice(r).match(Da);if(a){if(!n){const c=a[1][0].toLowerCase()==="x"?parseInt(a[1].slice(1),16):parseInt(a[1],10),i=e.push("text_special","",0);i.content=Zr(c)?xn(c):xn(65533),i.markup=a[0],i.info="entity"}return e.pos+=a[0].length,!0}}else{const a=e.src.slice(r).match(Sa);if(a){const c=Wo(a[0]);if(c!==a[0]){if(!n){const i=e.push("text_special","",0);i.content=c,i.markup=a[0],i.info="entity"}return e.pos+=a[0].length,!0}}}return!1}function _u(e){const n={},r=e.length;if(!r)return;let u=0,o=-2;const a=[];for(let c=0;c<r;c++){const i=e[c];if(a.push(0),(e[u].marker!==i.marker||o!==i.token-1)&&(u=c),o=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);const s=n[i.marker][(i.open?3:0)+i.length%3];let f=u-a[u]-1,b=f;for(;f>s;f-=a[f]+1){const l=e[f];if(l.marker===i.marker&&l.open&&l.end<0){let d=!1;if((l.close||i.open)&&(l.length+i.length)%3===0&&(l.length%3!==0||i.length%3!==0)&&(d=!0),!d){const h=f>0&&!e[f-1].open?a[f-1]+1:0;a[c]=c-f+h,a[f]=h,i.open=!1,l.end=c,l.close=!1,b=-1,o=-2;break}}}b!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=b)}}function Ta(e){const n=e.tokens_meta,r=e.tokens_meta.length;_u(e.delimiters);for(let u=0;u<r;u++)n[u]&&n[u].delimiters&&_u(n[u].delimiters)}function Ma(e){let n,r,u=0;const o=e.tokens,a=e.tokens.length;for(n=r=0;n<a;n++)o[n].nesting<0&&u--,o[n].level=u,o[n].nesting>0&&u++,o[n].type==="text"&&n+1<a&&o[n+1].type==="text"?o[n+1].content=o[n].content+o[n+1].content:(n!==r&&(o[r]=o[n]),r++);n!==r&&(o.length=r)}const vr=[["text",ca],["linkify",sa],["newline",da],["escape",fa],["backticks",ha],["strikethrough",ot.tokenize],["emphasis",it.tokenize],["link",ka],["image",ya],["autolink",va],["html_inline",Aa],["entity",Fa]],Cr=[["balance_pairs",Ta],["strikethrough",ot.postProcess],["emphasis",it.postProcess],["fragments_join",Ma]];function Dn(){this.ruler=new te;for(let e=0;e<vr.length;e++)this.ruler.push(vr[e][0],vr[e][1]);this.ruler2=new te;for(let e=0;e<Cr.length;e++)this.ruler2.push(Cr[e][0],Cr[e][1])}Dn.prototype.skipToken=function(e){const n=e.pos,r=this.ruler.getRules(""),u=r.length,o=e.md.options.maxNesting,a=e.cache;if(typeof a[n]<"u"){e.pos=a[n];return}let c=!1;if(e.level<o){for(let i=0;i<u;i++)if(e.level++,c=r[i](e,!0),e.level--,c){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;c||e.pos++,a[n]=e.pos};Dn.prototype.tokenize=function(e){const n=this.ruler.getRules(""),r=n.length,u=e.posMax,o=e.md.options.maxNesting;for(;e.pos<u;){const a=e.pos;let c=!1;if(e.level<o){for(let i=0;i<r;i++)if(c=n[i](e,!1),c){if(a>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(c){if(e.pos>=u)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Dn.prototype.parse=function(e,n,r,u){const o=new this.State(e,n,r,u);this.tokenize(o);const a=this.ruler2.getRules(""),c=a.length;for(let i=0;i<c;i++)a[i](o)};Dn.prototype.State=An;function Ia(e){const n={};e=e||{},n.src_Any=Vu.source,n.src_Cc=Zu.source,n.src_Z=Yu.source,n.src_P=Gr.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const r="[><｜]";return n.src_pseudo_letter="(?:(?!"+r+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+r+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+r+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+r+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Or(e){return Array.prototype.slice.call(arguments,1).forEach(function(r){r&&Object.keys(r).forEach(function(u){e[u]=r[u]})}),e}function or(e){return Object.prototype.toString.call(e)}function Ra(e){return or(e)==="[object String]"}function La(e){return or(e)==="[object Object]"}function Oa(e){return or(e)==="[object RegExp]"}function Eu(e){return or(e)==="[object Function]"}function Na(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const at={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function za(e){return Object.keys(e||{}).reduce(function(n,r){return n||at.hasOwnProperty(r)},!1)}const Pa={"http:":{validate:function(e,n,r){const u=e.slice(n);return r.re.http||(r.re.http=new RegExp("^\\/\\/"+r.re.src_auth+r.re.src_host_port_strict+r.re.src_path,"i")),r.re.http.test(u)?u.match(r.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,r){const u=e.slice(n);return r.re.no_http||(r.re.no_http=new RegExp("^"+r.re.src_auth+"(?:localhost|(?:(?:"+r.re.src_domain+")\\.)+"+r.re.src_domain_root+")"+r.re.src_port+r.re.src_host_terminator+r.re.src_path,"i")),r.re.no_http.test(u)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:u.match(r.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,r){const u=e.slice(n);return r.re.mailto||(r.re.mailto=new RegExp("^"+r.re.src_email_name+"@"+r.re.src_host_strict,"i")),r.re.mailto.test(u)?u.match(r.re.mailto)[0].length:0}}},qa="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Ba="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function ja(e){return function(n,r){const u=n.slice(r);return e.test(u)?u.match(e)[0].length:0}}function Au(){return function(e,n){n.normalize(e)}}function Kn(e){const n=e.re=Ia(e.__opts__),r=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||r.push(qa),r.push(n.src_xn),n.src_tlds=r.join("|");function u(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(u(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(u(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(u(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(u(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(u(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(u(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(u(n.tpl_host_fuzzy_test),"i");const o=[];e.__compiled__={};function a(i,s){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+s)}Object.keys(e.__schemas__).forEach(function(i){const s=e.__schemas__[i];if(s===null)return;const f={validate:null,link:null};if(e.__compiled__[i]=f,La(s)){Oa(s.validate)?f.validate=ja(s.validate):Eu(s.validate)?f.validate=s.validate:a(i,s),Eu(s.normalize)?f.normalize=s.normalize:s.normalize?a(i,s):f.normalize=Au();return}if(Ra(s)){o.push(i);return}a(i,s)}),o.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Au()};const c=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(Na).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function ct(e,n,r,u){const o=e.slice(r,u);this.schema=n.toLowerCase(),this.index=r,this.lastIndex=u,this.raw=o,this.text=o,this.url=o}function ie(e,n){if(!(this instanceof ie))return new ie(e,n);n||za(e)&&(n=e,e={}),this.__opts__=Or({},at,n),this.__schemas__=Or({},Pa,e),this.__compiled__={},this.__tlds__=Ba,this.__tlds_replaced__=!1,this.re={},Kn(this)}ie.prototype.add=function(n,r){return this.__schemas__[n]=r,Kn(this),this};ie.prototype.set=function(n){return this.__opts__=Or(this.__opts__,n),this};ie.prototype.test=function(n){if(!n.length)return!1;let r,u;if(this.re.schema_test.test(n)){for(u=this.re.schema_search,u.lastIndex=0;(r=u.exec(n))!==null;)if(this.testSchemaAt(n,r[2],u.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};ie.prototype.pretest=function(n){return this.re.pretest.test(n)};ie.prototype.testSchemaAt=function(n,r,u){return this.__compiled__[r.toLowerCase()]?this.__compiled__[r.toLowerCase()].validate(n,u,this):0};ie.prototype.match=function(n){const r=[],u=[],o=[],a=[];let c,i,s;function f(d,h){return d?h?d.index!==h.index?d.index<h.index?d:h:d.lastIndex>=h.lastIndex?d:h:d:h}if(!n.length)return null;if(this.re.schema_test.test(n))for(s=this.re.schema_search,s.lastIndex=0;(c=s.exec(n))!==null;)i=this.testSchemaAt(n,c[2],s.lastIndex),i&&u.push({schema:c[2],index:c.index+c[1].length,lastIndex:c.index+c[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)o.push({schema:"",index:c.index+c[1].length,lastIndex:c.index+c[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)a.push({schema:"mailto:",index:c.index+c[1].length,lastIndex:c.index+c[0].length});const b=[0,0,0];let l=0;for(;;){const d=[u[b[0]],a[b[1]],o[b[2]]],h=f(f(d[0],d[1]),d[2]);if(!h)break;if(h===d[0]?b[0]++:h===d[1]?b[1]++:b[2]++,h.index<l)continue;const m=new ct(n,h.schema,h.index,h.lastIndex);this.__compiled__[m.schema].normalize(m,this),r.push(m),l=h.lastIndex}return r.length?r:null};ie.prototype.matchAtStart=function(n){if(!n.length)return null;const r=this.re.schema_at_start.exec(n);if(!r)return null;const u=this.testSchemaAt(n,r[2],r[0].length);if(!u)return null;const o=new ct(n,r[2],r.index+r[1].length,r.index+r[0].length+u);return this.__compiled__[o.schema].normalize(o,this),o};ie.prototype.tlds=function(n,r){return n=Array.isArray(n)?n:[n],r?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(u,o,a){return u!==a[o-1]}).reverse(),Kn(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,Kn(this),this)};ie.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};ie.prototype.onCompile=function(){};const Qe=2147483647,me=36,Kr=1,_n=26,Ha=38,$a=700,lt=72,st=128,dt="-",Ua=/^xn--/,Ga=/[^\0-\x7F]/,Va=/[\x2E\u3002\uFF0E\uFF61]/g,Za={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},_r=me-Kr,ge=Math.floor,Er=String.fromCharCode;function Fe(e){throw new RangeError(Za[e])}function Wa(e,n){const r=[];let u=e.length;for(;u--;)r[u]=n(e[u]);return r}function ft(e,n){const r=e.split("@");let u="";r.length>1&&(u=r[0]+"@",e=r[1]),e=e.replace(Va,".");const o=e.split("."),a=Wa(o,n).join(".");return u+a}function ht(e){const n=[];let r=0;const u=e.length;for(;r<u;){const o=e.charCodeAt(r++);if(o>=55296&&o<=56319&&r<u){const a=e.charCodeAt(r++);(a&64512)==56320?n.push(((o&1023)<<10)+(a&1023)+65536):(n.push(o),r--)}else n.push(o)}return n}const Ya=e=>String.fromCodePoint(...e),Ka=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:me},Du=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},pt=function(e,n,r){let u=0;for(e=r?ge(e/$a):e>>1,e+=ge(e/n);e>_r*_n>>1;u+=me)e=ge(e/_r);return ge(u+(_r+1)*e/(e+Ha))},bt=function(e){const n=[],r=e.length;let u=0,o=st,a=lt,c=e.lastIndexOf(dt);c<0&&(c=0);for(let i=0;i<c;++i)e.charCodeAt(i)>=128&&Fe("not-basic"),n.push(e.charCodeAt(i));for(let i=c>0?c+1:0;i<r;){const s=u;for(let b=1,l=me;;l+=me){i>=r&&Fe("invalid-input");const d=Ka(e.charCodeAt(i++));d>=me&&Fe("invalid-input"),d>ge((Qe-u)/b)&&Fe("overflow"),u+=d*b;const h=l<=a?Kr:l>=a+_n?_n:l-a;if(d<h)break;const m=me-h;b>ge(Qe/m)&&Fe("overflow"),b*=m}const f=n.length+1;a=pt(u-s,f,s==0),ge(u/f)>Qe-o&&Fe("overflow"),o+=ge(u/f),u%=f,n.splice(u++,0,o)}return String.fromCodePoint(...n)},mt=function(e){const n=[];e=ht(e);const r=e.length;let u=st,o=0,a=lt;for(const s of e)s<128&&n.push(Er(s));const c=n.length;let i=c;for(c&&n.push(dt);i<r;){let s=Qe;for(const b of e)b>=u&&b<s&&(s=b);const f=i+1;s-u>ge((Qe-o)/f)&&Fe("overflow"),o+=(s-u)*f,u=s;for(const b of e)if(b<u&&++o>Qe&&Fe("overflow"),b===u){let l=o;for(let d=me;;d+=me){const h=d<=a?Kr:d>=a+_n?_n:d-a;if(l<h)break;const m=l-h,g=me-h;n.push(Er(Du(h+m%g,0))),l=ge(m/g)}n.push(Er(Du(l,0))),a=pt(o,f,i===c),o=0,++i}++o,++u}return n.join("")},Ja=function(e){return ft(e,function(n){return Ua.test(n)?bt(n.slice(4).toLowerCase()):n})},Qa=function(e){return ft(e,function(n){return Ga.test(n)?"xn--"+mt(n):n})},gt={version:"2.3.1",ucs2:{decode:ht,encode:Ya},decode:bt,encode:mt,toASCII:Qa,toUnicode:Ja},Xa={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},ec={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},nc={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},rc={default:Xa,zero:ec,commonmark:nc},uc=/^(vbscript|javascript|file|data):/,tc=/^data:image\/(gif|png|jpeg|webp);/;function oc(e){const n=e.trim().toLowerCase();return uc.test(n)?tc.test(n):!0}const kt=["http:","https:","mailto:"];function ic(e){const n=Ur(e,!0);if(n.hostname&&(!n.protocol||kt.indexOf(n.protocol)>=0))try{n.hostname=gt.toASCII(n.hostname)}catch{}return En($r(n))}function ac(e){const n=Ur(e,!0);if(n.hostname&&(!n.protocol||kt.indexOf(n.protocol)>=0))try{n.hostname=gt.toUnicode(n.hostname)}catch{}return Xe($r(n),Xe.defaultChars+"%")}function le(e,n){if(!(this instanceof le))return new le(e,n);n||Vr(e)||(n=e||{},e="default"),this.inline=new Dn,this.block=new tr,this.core=new Wr,this.renderer=new tn,this.linkify=new ie,this.validateLink=oc,this.normalizeLink=ic,this.normalizeLinkText=ac,this.utils=si,this.helpers=nr({},pi),this.options={},this.configure(e),n&&this.set(n)}le.prototype.set=function(e){return nr(this.options,e),this};le.prototype.configure=function(e){const n=this;if(Vr(e)){const r=e;if(e=rc[r],!e)throw new Error('Wrong `markdown-it` preset "'+r+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(r){e.components[r].rules&&n[r].ruler.enableOnly(e.components[r].rules),e.components[r].rules2&&n[r].ruler2.enableOnly(e.components[r].rules2)}),this};le.prototype.enable=function(e,n){let r=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){r=r.concat(this[o].ruler.enable(e,!0))},this),r=r.concat(this.inline.ruler2.enable(e,!0));const u=e.filter(function(o){return r.indexOf(o)<0});if(u.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+u);return this};le.prototype.disable=function(e,n){let r=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){r=r.concat(this[o].ruler.disable(e,!0))},this),r=r.concat(this.inline.ruler2.disable(e,!0));const u=e.filter(function(o){return r.indexOf(o)<0});if(u.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+u);return this};le.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};le.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const r=new this.core.State(e,this,n);return this.core.process(r),r.tokens};le.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};le.prototype.parseInline=function(e,n){const r=new this.core.State(e,this,n);return r.inlineMode=!0,this.core.process(r),r.tokens};le.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var Su=!1,nn={false:"push",true:"unshift",after:"push",before:"unshift"},Jn={isPermalinkSymbol:!0};function Nr(e,n,r,u){var o;if(!Su){var a="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(a):console.warn(a),Su=!0}var c=[Object.assign(new r.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,r)]],Object.entries(n.permalinkAttrs(e,r)))}),Object.assign(new r.Token("html_block","",0),{content:n.permalinkSymbol,meta:Jn}),new r.Token("link_close","a",-1)];n.permalinkSpace&&r.tokens[u+1].children[nn[n.permalinkBefore]](Object.assign(new r.Token("text","",0),{content:" "})),(o=r.tokens[u+1].children)[nn[n.permalinkBefore]].apply(o,c)}function yt(e){return"#"+e}function xt(e){return{}}var cc={class:"header-anchor",symbol:"#",renderHref:yt,renderAttrs:xt};function Sn(e){function n(r){return r=Object.assign({},n.defaults,r),function(u,o,a,c){return e(u,r,o,a,c)}}return n.defaults=Object.assign({},cc),n.renderPermalinkImpl=e,n}function Jr(e){var n=[],r=e.filter(function(u){if(u[0]!=="class")return!0;n.push(u[1])});return n.length>0&&r.unshift(["class",n.join(" ")]),r}var ir=Sn(function(e,n,r,u,o){var a,c=[Object.assign(new u.Token("link_open","a",1),{attrs:Jr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,u)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,u))))}),Object.assign(new u.Token("html_inline","",0),{content:n.symbol,meta:Jn}),new u.Token("link_close","a",-1)];if(n.space){var i=typeof n.space=="string"?n.space:" ";u.tokens[o+1].children[nn[n.placement]](Object.assign(new u.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:i}))}(a=u.tokens[o+1].children)[nn[n.placement]].apply(a,c)});Object.assign(ir.defaults,{space:!0,placement:"after",ariaHidden:!1});var Pe=Sn(ir.renderPermalinkImpl);Pe.defaults=Object.assign({},ir.defaults,{ariaHidden:!0});var wt=Sn(function(e,n,r,u,o){var a=[Object.assign(new u.Token("link_open","a",1),{attrs:Jr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,u)]],Object.entries(n.renderAttrs(e,u))))})].concat(n.safariReaderFix?[new u.Token("span_open","span",1)]:[],u.tokens[o+1].children,n.safariReaderFix?[new u.Token("span_close","span",-1)]:[],[new u.Token("link_close","a",-1)]);u.tokens[o+1]=Object.assign(new u.Token("inline","",0),{children:a})});Object.assign(wt.defaults,{safariReaderFix:!1});var Fu=Sn(function(e,n,r,u,o){var a;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var c=u.tokens[o+1].children.filter(function(l){return l.type==="text"||l.type==="code_inline"}).reduce(function(l,d){return l+d.content},""),i=[],s=[];if(n.class&&s.push(["class",n.class]),s.push(["href",n.renderHref(e,u)]),s.push.apply(s,Object.entries(n.renderAttrs(e,u))),n.style==="visually-hidden"){if(i.push(Object.assign(new u.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new u.Token("text","",0),{content:n.assistiveText(c)}),new u.Token("span_close","span",-1)),n.space){var f=typeof n.space=="string"?n.space:" ";i[nn[n.placement]](Object.assign(new u.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:f}))}i[nn[n.placement]](Object.assign(new u.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new u.Token("html_inline","",0),{content:n.symbol,meta:Jn}),new u.Token("span_close","span",-1))}else i.push(Object.assign(new u.Token("html_inline","",0),{content:n.symbol,meta:Jn}));n.style==="aria-label"?s.push(["aria-label",n.assistiveText(c)]):["aria-describedby","aria-labelledby"].includes(n.style)&&s.push([n.style,e]);var b=[Object.assign(new u.Token("link_open","a",1),{attrs:Jr(s)})].concat(i,[new u.Token("link_close","a",-1)]);(a=u.tokens).splice.apply(a,[o+3,0].concat(b)),n.wrapper&&(u.tokens.splice(o,0,Object.assign(new u.Token("html_block","",0),{content:n.wrapper[0]+`
`})),u.tokens.splice(o+3+b.length+1,0,Object.assign(new u.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function Tu(e,n,r,u){var o=e,a=u;if(r&&Object.prototype.hasOwnProperty.call(n,o))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,o);)o=e+"-"+a,a+=1;return n[o]=!0,o}function Ke(e,n){n=Object.assign({},Ke.defaults,n),e.core.ruler.push("anchor",function(r){for(var u,o={},a=r.tokens,c=Array.isArray(n.level)?(u=n.level,function(l){return u.includes(l)}):(function(l){return function(d){return d>=l}})(n.level),i=0;i<a.length;i++){var s=a[i];if(s.type==="heading_open"&&c(Number(s.tag.substr(1)))){var f=n.getTokensText(a[i+1].children),b=s.attrGet("id");b=b==null?Tu(b=n.slugifyWithState?n.slugifyWithState(f,r):n.slugify(f),o,!1,n.uniqueSlugStartIndex):Tu(b,o,!0,n.uniqueSlugStartIndex),s.attrSet("id",b),n.tabIndex!==!1&&s.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(b,n,r,i):(n.permalink||n.renderPermalink&&n.renderPermalink!==Nr)&&n.renderPermalink(b,n,r,i),i=a.indexOf(s),n.callback&&n.callback(s,{slug:b,title:f})}}})}Object.assign(Fu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),Ke.permalink={__proto__:null,legacy:Nr,renderHref:yt,renderAttrs:xt,makePermalink:Sn,linkInsideHeader:ir,ariaHidden:Pe,headerLink:wt,linkAfterHeader:Fu},Ke.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:Nr,permalinkClass:Pe.defaults.class,permalinkSpace:Pe.defaults.space,permalinkSymbol:"¶",permalinkBefore:Pe.defaults.placement==="before",permalinkHref:Pe.defaults.renderHref,permalinkAttrs:Pe.defaults.renderAttrs},Ke.default=Ke;function ar(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ar,Mu;function lc(){if(Mu)return Ar;Mu=1;function e(u,o){var a,c,i=u.attrs[u.attrIndex("href")][1];for(a=0;a<o.length;++a){if(c=o[a],typeof c.matcher=="function"){if(c.matcher(i,c))return c;continue}return c}}function n(u,o,a){Object.keys(a).forEach(function(c){var i,s=a[c];c==="className"&&(c="class"),i=o[u].attrIndex(c),i<0?o[u].attrPush([c,s]):o[u].attrs[i][1]=s})}function r(u,o){o?o=Array.isArray(o)?o:[o]:o=[],Object.freeze(o);var a=u.renderer.rules.link_open||this.defaultRender;u.renderer.rules.link_open=function(c,i,s,f,b){var l=e(c[i],o),d=l&&l.attrs;return d&&n(i,c,d),a(c,i,s,f,b)}}return r.defaultRender=function(u,o,a,c,i){return i.renderToken(u,o,a)},Ar=r,Ar}var sc=lc();const dc=ar(sc);function fc(e,n,r,u){const o=Number(e[n].meta.id+1).toString();let a="";return typeof u.docId=="string"&&(a=`-${u.docId}-`),a+o}function hc(e,n){let r=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(r+=`:${e[n].meta.subId}`),`[${r}]`}function pc(e,n,r,u,o){const a=o.rules.footnote_anchor_name(e,n,r,u,o),c=o.rules.footnote_caption(e,n,r,u,o);let i=a;return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${a}" id="fnref${i}">${c}</a></sup>`}function bc(e,n,r){return(r.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function mc(){return`</ol>
</section>
`}function gc(e,n,r,u,o){let a=o.rules.footnote_anchor_name(e,n,r,u,o);return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),`<li id="fn${a}" class="footnote-item">`}function kc(){return`</li>
`}function yc(e,n,r,u,o){let a=o.rules.footnote_anchor_name(e,n,r,u,o);return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),` <a href="#fnref${a}" class="footnote-backref">↩︎</a>`}function xc(e){const n=e.helpers.parseLinkLabel,r=e.utils.isSpace;e.renderer.rules.footnote_ref=pc,e.renderer.rules.footnote_block_open=bc,e.renderer.rules.footnote_block_close=mc,e.renderer.rules.footnote_open=gc,e.renderer.rules.footnote_close=kc,e.renderer.rules.footnote_anchor=yc,e.renderer.rules.footnote_caption=hc,e.renderer.rules.footnote_anchor_name=fc;function u(i,s,f,b){const l=i.bMarks[s]+i.tShift[s],d=i.eMarks[s];if(l+4>d||i.src.charCodeAt(l)!==91||i.src.charCodeAt(l+1)!==94)return!1;let h;for(h=l+2;h<d;h++){if(i.src.charCodeAt(h)===32)return!1;if(i.src.charCodeAt(h)===93)break}if(h===l+2||h+1>=d||i.src.charCodeAt(++h)!==58)return!1;if(b)return!0;h++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const m=i.src.slice(l+2,h-2);i.env.footnotes.refs[`:${m}`]=-1;const g=new i.Token("footnote_reference_open","",1);g.meta={label:m},g.level=i.level++,i.tokens.push(g);const k=i.bMarks[s],x=i.tShift[s],v=i.sCount[s],E=i.parentType,A=h,R=i.sCount[s]+h-(i.bMarks[s]+i.tShift[s]);let O=R;for(;h<d;){const U=i.src.charCodeAt(h);if(r(U))U===9?O+=4-O%4:O++;else break;h++}i.tShift[s]=h-A,i.sCount[s]=O-R,i.bMarks[s]=A,i.blkIndent+=4,i.parentType="footnote",i.sCount[s]<i.blkIndent&&(i.sCount[s]+=i.blkIndent),i.md.block.tokenize(i,s,f,!0),i.parentType=E,i.blkIndent-=4,i.tShift[s]=x,i.sCount[s]=v,i.bMarks[s]=k;const j=new i.Token("footnote_reference_close","",-1);return j.level=--i.level,i.tokens.push(j),!0}function o(i,s){const f=i.posMax,b=i.pos;if(b+2>=f||i.src.charCodeAt(b)!==94||i.src.charCodeAt(b+1)!==91)return!1;const l=b+2,d=n(i,b+1);if(d<0)return!1;if(!s){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const h=i.env.footnotes.list.length,m=[];i.md.inline.parse(i.src.slice(l,d),i.md,i.env,m);const g=i.push("footnote_ref","",0);g.meta={id:h},i.env.footnotes.list[h]={content:i.src.slice(l,d),tokens:m}}return i.pos=d+1,i.posMax=f,!0}function a(i,s){const f=i.posMax,b=i.pos;if(b+3>f||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(b)!==91||i.src.charCodeAt(b+1)!==94)return!1;let l;for(l=b+2;l<f;l++){if(i.src.charCodeAt(l)===32||i.src.charCodeAt(l)===10)return!1;if(i.src.charCodeAt(l)===93)break}if(l===b+2||l>=f)return!1;l++;const d=i.src.slice(b+2,l-1);if(typeof i.env.footnotes.refs[`:${d}`]>"u")return!1;if(!s){i.env.footnotes.list||(i.env.footnotes.list=[]);let h;i.env.footnotes.refs[`:${d}`]<0?(h=i.env.footnotes.list.length,i.env.footnotes.list[h]={label:d,count:0},i.env.footnotes.refs[`:${d}`]=h):h=i.env.footnotes.refs[`:${d}`];const m=i.env.footnotes.list[h].count;i.env.footnotes.list[h].count++;const g=i.push("footnote_ref","",0);g.meta={id:h,subId:m,label:d}}return i.pos=l,i.posMax=f,!0}function c(i){let s,f,b,l=!1;const d={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(m){return m.type==="footnote_reference_open"?(l=!0,f=[],b=m.meta.label,!1):m.type==="footnote_reference_close"?(l=!1,d[":"+b]=f,!1):(l&&f.push(m),!l)}),!i.env.footnotes.list))return;const h=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let m=0,g=h.length;m<g;m++){const k=new i.Token("footnote_open","",1);if(k.meta={id:m,label:h[m].label},i.tokens.push(k),h[m].tokens){s=[];const E=new i.Token("paragraph_open","p",1);E.block=!0,s.push(E);const A=new i.Token("inline","",0);A.children=h[m].tokens,A.content=h[m].content,s.push(A);const R=new i.Token("paragraph_close","p",-1);R.block=!0,s.push(R)}else h[m].label&&(s=d[`:${h[m].label}`]);s&&(i.tokens=i.tokens.concat(s));let x;i.tokens[i.tokens.length-1].type==="paragraph_close"?x=i.tokens.pop():x=null;const v=h[m].count>0?h[m].count:1;for(let E=0;E<v;E++){const A=new i.Token("footnote_anchor","",0);A.meta={id:m,subId:E,label:h[m].label},i.tokens.push(A)}x&&i.tokens.push(x),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",u,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",o),e.inline.ruler.after("footnote_inline","footnote_ref",a),e.core.ruler.after("inline","footnote_tail",c)}var Dr,Iu;function wc(){if(Iu)return Dr;Iu=1;var e=!0,n=!1,r=!1;Dr=function(g,k){k&&(e=!k.enabled,n=!!k.label,r=!!k.labelAfter),g.core.ruler.after("inline","github-task-lists",function(x){for(var v=x.tokens,E=2;E<v.length;E++)a(v,E)&&(c(v[E],x.Token),u(v[E-2],"class","task-list-item"+(e?"":" enabled")),u(v[o(v,E-2)],"class","contains-task-list"))})};function u(g,k,x){var v=g.attrIndex(k),E=[k,x];v<0?g.attrPush(E):g.attrs[v]=E}function o(g,k){for(var x=g[k].level-1,v=k-1;v>=0;v--)if(g[v].level===x)return v;return-1}function a(g,k){return l(g[k])&&d(g[k-1])&&h(g[k-2])&&m(g[k])}function c(g,k){if(g.children.unshift(i(g,k)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),n)if(r){g.children.pop();var x="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+x+'">',g.children.push(b(g.content,x,k))}else g.children.unshift(s(k)),g.children.push(f(k))}function i(g,k){var x=new k("html_inline","",0),v=e?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?x.content='<input class="task-list-item-checkbox"'+v+'type="checkbox">':(g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0)&&(x.content='<input class="task-list-item-checkbox" checked=""'+v+'type="checkbox">'),x}function s(g){var k=new g("html_inline","",0);return k.content="<label>",k}function f(g){var k=new g("html_inline","",0);return k.content="</label>",k}function b(g,k,x){var v=new x("html_inline","",0);return v.content='<label class="task-list-item-label" for="'+k+'">'+g+"</label>",v.attrs=[{for:k}],v}function l(g){return g.type==="inline"}function d(g){return g.type==="paragraph_open"}function h(g){return g.type==="list_item_open"}function m(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}return Dr}var vc=wc();const Cc=ar(vc),_c={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},Ec=(e,n={})=>{const{markers:r=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:u=_c,matchCaseSensitive:o=!1,titles:a={},classPrefix:c="markdown-alert"}=n,i=r==="*"?"\\w+":r.join("|"),s=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,o?"":"i");e.core.ruler.after("block","github-alerts",f=>{const b=f.tokens;for(let l=0;l<b.length;l++)if(b[l].type==="blockquote_open"){const d=b[l],h=l;for(;b[l]?.type!=="blockquote_close"&&l<=b.length;)l+=1;const m=b[l],g=l,k=b.slice(h,g+1).find(R=>R.type==="inline");if(!k)continue;const x=k.content.match(s);if(!x)continue;const v=x[1].toLowerCase(),E=x[2].trim()||(a[v]??Ac(v)),A=u[v]??"";k.content=k.content.slice(x[0].length).trimStart(),d.type="alert_open",d.tag="div",d.meta={title:E,type:v,icon:A},m.type="alert_close",m.tag="div"}}),e.renderer.rules.alert_open=function(f,b){const{title:l,type:d,icon:h}=f[b].meta;return`<div class="${c} ${c}-${d}"><p class="${c}-title">${h}${l}</p>`}};function Ac(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Dc=Object.create,vt=Object.defineProperty,Sc=Object.getOwnPropertyDescriptor,Fc=Object.getOwnPropertyNames,Tc=Object.getPrototypeOf,Mc=Object.prototype.hasOwnProperty,Z=(e,n)=>()=>(n||(e((n={exports:{}}).exports,n),e=null),n.exports),Ic=(e,n,r,u)=>{if(n&&typeof n=="object"||typeof n=="function")for(var o=Fc(n),a=0,c=o.length,i;a<c;a++)i=o[a],!Mc.call(e,i)&&i!==r&&vt(e,i,{get:(s=>n[s]).bind(null,i),enumerable:!(u=Sc(n,i))||u.enumerable});return e},Rc=(e,n,r)=>(r=e!=null?Dc(Tc(e)):{},Ic(vt(r,"default",{value:e,enumerable:!0}),e)),Fn=Z(((e,n)=>{function r(s){return typeof s>"u"||s===null}function u(s){return typeof s=="object"&&s!==null}function o(s){return Array.isArray(s)?s:r(s)?[]:[s]}function a(s,f){if(f){const b=Object.keys(f);for(let l=0,d=b.length;l<d;l+=1){const h=b[l];s[h]=f[h]}}return s}function c(s,f){let b="";for(let l=0;l<f;l+=1)b+=s;return b}function i(s){return s===0&&Number.NEGATIVE_INFINITY===1/s}n.exports.isNothing=r,n.exports.isObject=u,n.exports.toArray=o,n.exports.repeat=c,n.exports.isNegativeZero=i,n.exports.extend=a})),Tn=Z(((e,n)=>{function r(o,a){let c="";const i=o.reason||"(unknown reason)";return o.mark?(o.mark.name&&(c+='in "'+o.mark.name+'" '),c+="("+(o.mark.line+1)+":"+(o.mark.column+1)+")",!a&&o.mark.snippet&&(c+=`

`+o.mark.snippet),i+" "+c):i}function u(o,a){Error.call(this),this.name="YAMLException",this.reason=o,this.mark=a,this.message=r(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}u.prototype=Object.create(Error.prototype),u.prototype.constructor=u,u.prototype.toString=function(a){return this.name+": "+r(this,a)},n.exports=u})),Lc=Z(((e,n)=>{var r=Fn();function u(c,i,s,f,b){let l="",d="";const h=Math.floor(b/2)-1;return f-i>h&&(l=" ... ",i=f-h+l.length),s-f>h&&(d=" ...",s=f+h-d.length),{str:l+c.slice(i,s).replace(/\t/g,"→")+d,pos:f-i+l.length}}function o(c,i){return r.repeat(" ",i-c.length)+c}function a(c,i){if(i=Object.create(i||null),!c.buffer)return null;i.maxLength||(i.maxLength=79),typeof i.indent!="number"&&(i.indent=1),typeof i.linesBefore!="number"&&(i.linesBefore=3),typeof i.linesAfter!="number"&&(i.linesAfter=2);const s=/\r?\n|\r|\0/g,f=[0],b=[];let l,d=-1;for(;l=s.exec(c.buffer);)b.push(l.index),f.push(l.index+l[0].length),c.position<=l.index&&d<0&&(d=f.length-2);d<0&&(d=f.length-1);let h="";const m=Math.min(c.line+i.linesAfter,b.length).toString().length,g=i.maxLength-(i.indent+m+3);for(let x=1;x<=i.linesBefore&&!(d-x<0);x++){const v=u(c.buffer,f[d-x],b[d-x],c.position-(f[d]-f[d-x]),g);h=r.repeat(" ",i.indent)+o((c.line-x+1).toString(),m)+" | "+v.str+`
`+h}const k=u(c.buffer,f[d],b[d],c.position,g);h+=r.repeat(" ",i.indent)+o((c.line+1).toString(),m)+" | "+k.str+`
`,h+=r.repeat("-",i.indent+m+3+k.pos)+`^
`;for(let x=1;x<=i.linesAfter&&!(d+x>=b.length);x++){const v=u(c.buffer,f[d+x],b[d+x],c.position-(f[d]-f[d+x]),g);h+=r.repeat(" ",i.indent)+o((c.line+x+1).toString(),m)+" | "+v.str+`
`}return h.replace(/\n$/,"")}n.exports=a})),ue=Z(((e,n)=>{var r=Tn(),u=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],o=["scalar","sequence","mapping"];function a(i){const s={};return i!==null&&Object.keys(i).forEach(function(f){i[f].forEach(function(b){s[String(b)]=f})}),s}function c(i,s){if(s=s||{},Object.keys(s).forEach(function(f){if(u.indexOf(f)===-1)throw new r('Unknown option "'+f+'" is met in definition of "'+i+'" YAML type.')}),this.options=s,this.tag=i,this.kind=s.kind||null,this.resolve=s.resolve||function(){return!0},this.construct=s.construct||function(f){return f},this.instanceOf=s.instanceOf||null,this.predicate=s.predicate||null,this.represent=s.represent||null,this.representName=s.representName||null,this.defaultStyle=s.defaultStyle||null,this.multi=s.multi||!1,this.styleAliases=a(s.styleAliases||null),o.indexOf(this.kind)===-1)throw new r('Unknown kind "'+this.kind+'" is specified for "'+i+'" YAML type.')}n.exports=c})),Ct=Z(((e,n)=>{var r=Tn(),u=ue();function o(i,s){const f=[];return i[s].forEach(function(b){let l=f.length;f.forEach(function(d,h){d.tag===b.tag&&d.kind===b.kind&&d.multi===b.multi&&(l=h)}),f[l]=b}),f}function a(){const i={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function s(f){f.multi?(i.multi[f.kind].push(f),i.multi.fallback.push(f)):i[f.kind][f.tag]=i.fallback[f.tag]=f}for(let f=0,b=arguments.length;f<b;f+=1)arguments[f].forEach(s);return i}function c(i){return this.extend(i)}c.prototype.extend=function(s){let f=[],b=[];if(s instanceof u)b.push(s);else if(Array.isArray(s))b=b.concat(s);else if(s&&(Array.isArray(s.implicit)||Array.isArray(s.explicit)))s.implicit&&(f=f.concat(s.implicit)),s.explicit&&(b=b.concat(s.explicit));else throw new r("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");f.forEach(function(d){if(!(d instanceof u))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(d.loadKind&&d.loadKind!=="scalar")throw new r("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(d.multi)throw new r("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),b.forEach(function(d){if(!(d instanceof u))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const l=Object.create(c.prototype);return l.implicit=(this.implicit||[]).concat(f),l.explicit=(this.explicit||[]).concat(b),l.compiledImplicit=o(l,"implicit"),l.compiledExplicit=o(l,"explicit"),l.compiledTypeMap=a(l.compiledImplicit,l.compiledExplicit),l},n.exports=c})),_t=Z(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:str",{kind:"scalar",construct:function(r){return r!==null?r:""}})})),Et=Z(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(r){return r!==null?r:[]}})})),At=Z(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:map",{kind:"mapping",construct:function(r){return r!==null?r:{}}})})),Dt=Z(((e,n)=>{n.exports=new(Ct())({explicit:[_t(),Et(),At()]})})),St=Z(((e,n)=>{var r=ue();function u(c){if(c===null)return!0;const i=c.length;return i===1&&c==="~"||i===4&&(c==="null"||c==="Null"||c==="NULL")}function o(){return null}function a(c){return c===null}n.exports=new r("tag:yaml.org,2002:null",{kind:"scalar",resolve:u,construct:o,predicate:a,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})})),Ft=Z(((e,n)=>{var r=ue();function u(c){if(c===null)return!1;const i=c.length;return i===4&&(c==="true"||c==="True"||c==="TRUE")||i===5&&(c==="false"||c==="False"||c==="FALSE")}function o(c){return c==="true"||c==="True"||c==="TRUE"}function a(c){return Object.prototype.toString.call(c)==="[object Boolean]"}n.exports=new r("tag:yaml.org,2002:bool",{kind:"scalar",resolve:u,construct:o,predicate:a,represent:{lowercase:function(c){return c?"true":"false"},uppercase:function(c){return c?"TRUE":"FALSE"},camelcase:function(c){return c?"True":"False"}},defaultStyle:"lowercase"})})),Tt=Z(((e,n)=>{var r=Fn(),u=ue();function o(l){return l>=48&&l<=57||l>=65&&l<=70||l>=97&&l<=102}function a(l){return l>=48&&l<=55}function c(l){return l>=48&&l<=57}function i(l){if(l===null)return!1;const d=l.length;let h=0,m=!1;if(!d)return!1;let g=l[h];if((g==="-"||g==="+")&&(g=l[++h]),g==="0"){if(h+1===d)return!0;if(g=l[++h],g==="b"){for(h++;h<d;h++){if(g=l[h],g!=="0"&&g!=="1")return!1;m=!0}return m&&Number.isFinite(s(l))}if(g==="x"){for(h++;h<d;h++){if(!o(l.charCodeAt(h)))return!1;m=!0}return m&&Number.isFinite(s(l))}if(g==="o"){for(h++;h<d;h++){if(!a(l.charCodeAt(h)))return!1;m=!0}return m&&Number.isFinite(s(l))}}for(;h<d;h++){if(!c(l.charCodeAt(h)))return!1;m=!0}return m?Number.isFinite(s(l)):!1}function s(l){let d=l,h=1,m=d[0];if((m==="-"||m==="+")&&(m==="-"&&(h=-1),d=d.slice(1),m=d[0]),d==="0")return 0;if(m==="0"){if(d[1]==="b")return h*parseInt(d.slice(2),2);if(d[1]==="x")return h*parseInt(d.slice(2),16);if(d[1]==="o")return h*parseInt(d.slice(2),8)}return h*parseInt(d,10)}function f(l){return s(l)}function b(l){return Object.prototype.toString.call(l)==="[object Number]"&&l%1===0&&!r.isNegativeZero(l)}n.exports=new u("tag:yaml.org,2002:int",{kind:"scalar",resolve:i,construct:f,predicate:b,represent:{binary:function(l){return l>=0?"0b"+l.toString(2):"-0b"+l.toString(2).slice(1)},octal:function(l){return l>=0?"0o"+l.toString(8):"-0o"+l.toString(8).slice(1)},decimal:function(l){return l.toString(10)},hexadecimal:function(l){return l>=0?"0x"+l.toString(16).toUpperCase():"-0x"+l.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})})),Mt=Z(((e,n)=>{var r=Fn(),u=ue(),o=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),a=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function c(l){return l===null||!o.test(l)?!1:Number.isFinite(parseFloat(l,10))?!0:a.test(l)}function i(l){let d=l.toLowerCase();const h=d[0]==="-"?-1:1;return"+-".indexOf(d[0])>=0&&(d=d.slice(1)),d===".inf"?h===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:d===".nan"?NaN:h*parseFloat(d,10)}var s=/^[-+]?[0-9]+e/;function f(l,d){if(isNaN(l))switch(d){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===l)switch(d){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===l)switch(d){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(r.isNegativeZero(l))return"-0.0";const h=l.toString(10);return s.test(h)?h.replace("e",".e"):h}function b(l){return Object.prototype.toString.call(l)==="[object Number]"&&(l%1!==0||r.isNegativeZero(l))}n.exports=new u("tag:yaml.org,2002:float",{kind:"scalar",resolve:c,construct:i,predicate:b,represent:f,defaultStyle:"lowercase"})})),It=Z(((e,n)=>{n.exports=Dt().extend({implicit:[St(),Ft(),Tt(),Mt()]})})),Rt=Z(((e,n)=>{n.exports=It()})),Lt=Z(((e,n)=>{var r=ue(),u=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),o=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function a(s){return s===null?!1:u.exec(s)!==null||o.exec(s)!==null}function c(s){let f=0,b=null,l=u.exec(s);if(l===null&&(l=o.exec(s)),l===null)throw new Error("Date resolve error");const d=+l[1],h=+l[2]-1,m=+l[3];if(!l[4])return new Date(Date.UTC(d,h,m));const g=+l[4],k=+l[5],x=+l[6];if(l[7]){for(f=l[7].slice(0,3);f.length<3;)f+="0";f=+f}if(l[9]){const E=+l[10],A=+(l[11]||0);b=(E*60+A)*6e4,l[9]==="-"&&(b=-b)}const v=new Date(Date.UTC(d,h,m,g,k,x,f));return b&&v.setTime(v.getTime()-b),v}function i(s){return s.toISOString()}n.exports=new r("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:a,construct:c,instanceOf:Date,represent:i})})),Ot=Z(((e,n)=>{var r=ue();function u(o){return o==="<<"||o===null}n.exports=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:u})})),Nt=Z(((e,n)=>{var r=ue(),u=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function o(s){if(s===null)return!1;let f=0;const b=s.length,l=u;for(let d=0;d<b;d++){const h=l.indexOf(s.charAt(d));if(!(h>64)){if(h<0)return!1;f+=6}}return f%8===0}function a(s){const f=s.replace(/[\r\n=]/g,""),b=f.length,l=u;let d=0;const h=[];for(let g=0;g<b;g++)g%4===0&&g&&(h.push(d>>16&255),h.push(d>>8&255),h.push(d&255)),d=d<<6|l.indexOf(f.charAt(g));const m=b%4*6;return m===0?(h.push(d>>16&255),h.push(d>>8&255),h.push(d&255)):m===18?(h.push(d>>10&255),h.push(d>>2&255)):m===12&&h.push(d>>4&255),new Uint8Array(h)}function c(s){let f="",b=0;const l=s.length,d=u;for(let m=0;m<l;m++)m%3===0&&m&&(f+=d[b>>18&63],f+=d[b>>12&63],f+=d[b>>6&63],f+=d[b&63]),b=(b<<8)+s[m];const h=l%3;return h===0?(f+=d[b>>18&63],f+=d[b>>12&63],f+=d[b>>6&63],f+=d[b&63]):h===2?(f+=d[b>>10&63],f+=d[b>>4&63],f+=d[b<<2&63],f+=d[64]):h===1&&(f+=d[b>>2&63],f+=d[b<<4&63],f+=d[64],f+=d[64]),f}function i(s){return Object.prototype.toString.call(s)==="[object Uint8Array]"}n.exports=new r("tag:yaml.org,2002:binary",{kind:"scalar",resolve:o,construct:a,predicate:i,represent:c})})),zt=Z(((e,n)=>{var r=ue(),u=Object.prototype.hasOwnProperty,o=Object.prototype.toString;function a(i){if(i===null)return!0;const s=[],f=i;for(let b=0,l=f.length;b<l;b+=1){const d=f[b];let h=!1;if(o.call(d)!=="[object Object]")return!1;let m;for(m in d)if(u.call(d,m))if(!h)h=!0;else return!1;if(!h)return!1;if(s.indexOf(m)===-1)s.push(m);else return!1}return!0}function c(i){return i!==null?i:[]}n.exports=new r("tag:yaml.org,2002:omap",{kind:"sequence",resolve:a,construct:c})})),Pt=Z(((e,n)=>{var r=ue(),u=Object.prototype.toString;function o(c){if(c===null)return!0;const i=c,s=new Array(i.length);for(let f=0,b=i.length;f<b;f+=1){const l=i[f];if(u.call(l)!=="[object Object]")return!1;const d=Object.keys(l);if(d.length!==1)return!1;s[f]=[d[0],l[d[0]]]}return!0}function a(c){if(c===null)return[];const i=c,s=new Array(i.length);for(let f=0,b=i.length;f<b;f+=1){const l=i[f],d=Object.keys(l);s[f]=[d[0],l[d[0]]]}return s}n.exports=new r("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:o,construct:a})})),qt=Z(((e,n)=>{var r=ue(),u=Object.prototype.hasOwnProperty;function o(c){if(c===null)return!0;const i=c;for(const s in i)if(u.call(i,s)&&i[s]!==null)return!1;return!0}function a(c){return c!==null?c:{}}n.exports=new r("tag:yaml.org,2002:set",{kind:"mapping",resolve:o,construct:a})})),Qr=Z(((e,n)=>{n.exports=Rt().extend({implicit:[Lt(),Ot()],explicit:[Nt(),zt(),Pt(),qt()]})})),Oc=Z(((e,n)=>{var r=Fn(),u=Tn(),o=Lc(),a=Qr(),c=Object.prototype.hasOwnProperty,i=1,s=2,f=3,b=4,l=1,d=2,h=3,m=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/[\x85\u2028\u2029]/,k=/[,\[\]{}]/,x=/^(?:!|!!|![0-9A-Za-z-]+!)$/,v=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function E(t){return Object.prototype.toString.call(t)}function A(t){return t===10||t===13}function R(t){return t===9||t===32}function O(t){return t===9||t===32||t===10||t===13}function j(t){return t===44||t===91||t===93||t===123||t===125}function U(t){if(t>=48&&t<=57)return t-48;const y=t|32;return y>=97&&y<=102?y-97+10:-1}function J(t){return t===120?2:t===117?4:t===85?8:0}function ae(t){return t>=48&&t<=57?t-48:-1}function xe(t){switch(t){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function an(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function Re(t,y,_){y==="__proto__"?Object.defineProperty(t,y,{configurable:!0,enumerable:!0,writable:!0,value:_}):t[y]=_}var Le=new Array(256),ce=new Array(256);for(let t=0;t<256;t++)Le[t]=xe(t)?1:0,ce[t]=xe(t);function Q(t,y){this.input=t,this.filename=y.filename||null,this.schema=y.schema||a,this.onWarning=y.onWarning||null,this.legacy=y.legacy||!1,this.json=y.json||!1,this.listener=y.listener||null,this.maxDepth=typeof y.maxDepth=="number"?y.maxDepth:100,this.maxMergeSeqLength=typeof y.maxMergeSeqLength=="number"?y.maxMergeSeqLength:20,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=t.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function Rn(t,y){const _={name:t.filename,buffer:t.input.slice(0,-1),position:t.position,line:t.line,column:t.position-t.lineStart};return _.snippet=o(_),new u(y,_)}function P(t,y){throw Rn(t,y)}function He(t,y){t.onWarning&&t.onWarning.call(null,Rn(t,y))}function we(t,y,_){const F=t.anchorMapTransactions;if(F.length!==0){const C=F[F.length-1];c.call(C,y)||(C[y]={existed:c.call(t.anchorMap,y),value:t.anchorMap[y]})}t.anchorMap[y]=_}function fr(t){t.anchorMapTransactions.push(Object.create(null))}function Oe(t){const y=t.anchorMapTransactions.pop(),_=t.anchorMapTransactions;if(_.length===0)return;const F=_[_.length-1],C=Object.keys(y);for(let L=0,p=C.length;L<p;L+=1){const w=C[L];c.call(F,w)||(F[w]=y[w])}}function hr(t){const y=t.anchorMapTransactions.pop(),_=Object.keys(y);for(let F=_.length-1;F>=0;F-=1){const C=y[_[F]];C.existed?t.anchorMap[_[F]]=C.value:delete t.anchorMap[_[F]]}}function cn(t){return{position:t.position,line:t.line,lineStart:t.lineStart,lineIndent:t.lineIndent,firstTabInLine:t.firstTabInLine,tag:t.tag,anchor:t.anchor,kind:t.kind,result:t.result}}function $e(t,y){t.position=y.position,t.line=y.line,t.lineStart=y.lineStart,t.lineIndent=y.lineIndent,t.firstTabInLine=y.firstTabInLine,t.tag=y.tag,t.anchor=y.anchor,t.kind=y.kind,t.result=y.result}var Ln={YAML:function(y,_,F){y.version!==null&&P(y,"duplication of %YAML directive"),F.length!==1&&P(y,"YAML directive accepts exactly one argument");const C=/^([0-9]+)\.([0-9]+)$/.exec(F[0]);C===null&&P(y,"ill-formed argument of the YAML directive");const L=parseInt(C[1],10),p=parseInt(C[2],10);L!==1&&P(y,"unacceptable YAML version of the document"),y.version=F[0],y.checkLineBreaks=p<2,p!==1&&p!==2&&He(y,"unsupported YAML version of the document")},TAG:function(y,_,F){let C;F.length!==2&&P(y,"TAG directive accepts exactly two arguments");const L=F[0];C=F[1],x.test(L)||P(y,"ill-formed tag handle (first argument) of the TAG directive"),c.call(y.tagMap,L)&&P(y,'there is a previously declared suffix for "'+L+'" tag handle'),v.test(C)||P(y,"ill-formed tag prefix (second argument) of the TAG directive");try{C=decodeURIComponent(C)}catch{P(y,"tag prefix is malformed: "+C)}y.tagMap[L]=C}};function oe(t,y,_,F){if(y<_){const C=t.input.slice(y,_);if(F)for(let L=0,p=C.length;L<p;L+=1){const w=C.charCodeAt(L);w===9||w>=32&&w<=1114111||P(t,"expected valid JSON character")}else m.test(C)&&P(t,"the stream contains non-printable characters");t.result+=C}}function Se(t,y,_,F){r.isObject(_)||P(t,"cannot merge mappings; the provided source object is unacceptable");const C=Object.keys(_);for(let L=0,p=C.length;L<p;L+=1){const w=C[L];c.call(y,w)||(Re(y,w,_[w]),F[w]=!0)}}function ve(t,y,_,F,C,L,p,w,I){if(Array.isArray(C)){C=Array.prototype.slice.call(C);for(let D=0,S=C.length;D<S;D+=1)Array.isArray(C[D])&&P(t,"nested arrays are not supported inside keys"),typeof C=="object"&&E(C[D])==="[object Object]"&&(C[D]="[object Object]")}if(typeof C=="object"&&E(C)==="[object Object]"&&(C="[object Object]"),C=String(C),y===null&&(y={}),F==="tag:yaml.org,2002:merge")if(Array.isArray(L)){L.length>t.maxMergeSeqLength&&P(t,"merge sequence length exceeded maxMergeSeqLength ("+t.maxMergeSeqLength+")");const D=new Set;for(let S=0,M=L.length;S<M;S+=1){const T=L[S];D.has(T)||(D.add(T),Se(t,y,T,_))}}else Se(t,y,L,_);else!t.json&&!c.call(_,C)&&c.call(y,C)&&(t.line=p||t.line,t.lineStart=w||t.lineStart,t.position=I||t.position,P(t,"duplicated mapping key")),Re(y,C,L),delete _[C];return y}function Ue(t){const y=t.input.charCodeAt(t.position);y===10?t.position++:y===13?(t.position++,t.input.charCodeAt(t.position)===10&&t.position++):P(t,"a line break is expected"),t.line+=1,t.lineStart=t.position,t.firstTabInLine=-1}function Y(t,y,_){let F=0,C=t.input.charCodeAt(t.position);for(;C!==0;){for(;R(C);)C===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),C=t.input.charCodeAt(++t.position);if(y&&C===35)do C=t.input.charCodeAt(++t.position);while(C!==10&&C!==13&&C!==0);if(A(C))for(Ue(t),C=t.input.charCodeAt(t.position),F++,t.lineIndent=0;C===32;)t.lineIndent++,C=t.input.charCodeAt(++t.position);else break}return _!==-1&&F!==0&&t.lineIndent<_&&He(t,"deficient indentation"),F}function Ge(t){let y=t.position,_=t.input.charCodeAt(y);return!!((_===45||_===46)&&_===t.input.charCodeAt(y+1)&&_===t.input.charCodeAt(y+2)&&(y+=3,_=t.input.charCodeAt(y),_===0||O(_)))}function Ce(t,y){y===1?t.result+=" ":y>1&&(t.result+=r.repeat(`
`,y-1))}function On(t,y,_){let F,C,L,p,w,I;const D=t.kind,S=t.result;let M=t.input.charCodeAt(t.position);if(O(M)||j(M)||M===35||M===38||M===42||M===33||M===124||M===62||M===39||M===34||M===37||M===64||M===96)return!1;if(M===63||M===45){const T=t.input.charCodeAt(t.position+1);if(O(T)||_&&j(T))return!1}for(t.kind="scalar",t.result="",F=C=t.position,L=!1;M!==0;){if(M===58){const T=t.input.charCodeAt(t.position+1);if(O(T)||_&&j(T))break}else if(M===35){if(O(t.input.charCodeAt(t.position-1)))break}else{if(t.position===t.lineStart&&Ge(t)||_&&j(M))break;if(A(M))if(p=t.line,w=t.lineStart,I=t.lineIndent,Y(t,!1,-1),t.lineIndent>=y){L=!0,M=t.input.charCodeAt(t.position);continue}else{t.position=C,t.line=p,t.lineStart=w,t.lineIndent=I;break}}L&&(oe(t,F,C,!1),Ce(t,t.line-p),F=C=t.position,L=!1),R(M)||(C=t.position+1),M=t.input.charCodeAt(++t.position)}return oe(t,F,C,!1),t.result?!0:(t.kind=D,t.result=S,!1)}function Nn(t,y){let _,F,C=t.input.charCodeAt(t.position);if(C!==39)return!1;for(t.kind="scalar",t.result="",t.position++,_=F=t.position;(C=t.input.charCodeAt(t.position))!==0;)if(C===39)if(oe(t,_,t.position,!0),C=t.input.charCodeAt(++t.position),C===39)_=t.position,t.position++,F=t.position;else return!0;else A(C)?(oe(t,_,F,!0),Ce(t,Y(t,!1,y)),_=F=t.position):t.position===t.lineStart&&Ge(t)?P(t,"unexpected end of the document within a single quoted scalar"):(t.position++,R(C)||(F=t.position));P(t,"unexpected end of the stream within a single quoted scalar")}function ln(t,y){let _,F,C,L=t.input.charCodeAt(t.position);if(L!==34)return!1;for(t.kind="scalar",t.result="",t.position++,_=F=t.position;(L=t.input.charCodeAt(t.position))!==0;){if(L===34)return oe(t,_,t.position,!0),t.position++,!0;if(L===92){if(oe(t,_,t.position,!0),L=t.input.charCodeAt(++t.position),A(L))Y(t,!1,y);else if(L<256&&Le[L])t.result+=ce[L],t.position++;else if((C=J(L))>0){let p=C,w=0;for(;p>0;p--)L=t.input.charCodeAt(++t.position),(C=U(L))>=0?w=(w<<4)+C:P(t,"expected hexadecimal character");t.result+=an(w),t.position++}else P(t,"unknown escape sequence");_=F=t.position}else A(L)?(oe(t,_,F,!0),Ce(t,Y(t,!1,y)),_=F=t.position):t.position===t.lineStart&&Ge(t)?P(t,"unexpected end of the document within a double quoted scalar"):(t.position++,R(L)||(F=t.position))}P(t,"unexpected end of the stream within a double quoted scalar")}function zn(t,y){let _=!0,F,C,L;const p=t.tag;let w;const I=t.anchor;let D,S,M,T;const z=Object.create(null);let N,q,B,$=t.input.charCodeAt(t.position);if($===91)D=93,T=!1,w=[];else if($===123)D=125,T=!0,w={};else return!1;for(t.anchor!==null&&we(t,t.anchor,w),$=t.input.charCodeAt(++t.position);$!==0;){if(Y(t,!0,y),$=t.input.charCodeAt(t.position),$===D)return t.position++,t.tag=p,t.anchor=I,t.kind=T?"mapping":"sequence",t.result=w,!0;_?$===44&&P(t,"expected the node content, but found ','"):P(t,"missed comma between flow collection entries"),q=N=B=null,S=M=!1,$===63&&O(t.input.charCodeAt(t.position+1))&&(S=M=!0,t.position++,Y(t,!0,y)),F=t.line,C=t.lineStart,L=t.position,Ee(t,y,i,!1,!0),q=t.tag,N=t.result,Y(t,!0,y),$=t.input.charCodeAt(t.position),(M||t.line===F)&&$===58&&(S=!0,$=t.input.charCodeAt(++t.position),Y(t,!0,y),Ee(t,y,i,!1,!0),B=t.result),T?ve(t,w,z,q,N,B,F,C,L):S?w.push(ve(t,null,z,q,N,B,F,C,L)):w.push(N),Y(t,!0,y),$=t.input.charCodeAt(t.position),$===44?(_=!0,$=t.input.charCodeAt(++t.position)):_=!1}P(t,"unexpected end of the stream within a flow collection")}function Pn(t,y){let _,F=l,C=!1,L=!1,p=y,w=0,I=!1,D,S=t.input.charCodeAt(t.position);if(S===124)_=!1;else if(S===62)_=!0;else return!1;for(t.kind="scalar",t.result="";S!==0;)if(S=t.input.charCodeAt(++t.position),S===43||S===45)l===F?F=S===43?h:d:P(t,"repeat of a chomping mode identifier");else if((D=ae(S))>=0)D===0?P(t,"bad explicit indentation width of a block scalar; it cannot be less than one"):L?P(t,"repeat of an indentation width identifier"):(p=y+D-1,L=!0);else break;if(R(S)){do S=t.input.charCodeAt(++t.position);while(R(S));if(S===35)do S=t.input.charCodeAt(++t.position);while(!A(S)&&S!==0)}for(;S!==0;){for(Ue(t),t.lineIndent=0,S=t.input.charCodeAt(t.position);(!L||t.lineIndent<p)&&S===32;)t.lineIndent++,S=t.input.charCodeAt(++t.position);if(!L&&t.lineIndent>p&&(p=t.lineIndent),A(S)){w++;continue}if(!L&&p===0&&P(t,"missing indentation for block scalar"),t.lineIndent<p){F===h?t.result+=r.repeat(`
`,C?1+w:w):F===l&&C&&(t.result+=`
`);break}_?R(S)?(I=!0,t.result+=r.repeat(`
`,C?1+w:w)):I?(I=!1,t.result+=r.repeat(`
`,w+1)):w===0?C&&(t.result+=" "):t.result+=r.repeat(`
`,w):t.result+=r.repeat(`
`,C?1+w:w),C=!0,L=!0,w=0;const M=t.position;for(;!A(S)&&S!==0;)S=t.input.charCodeAt(++t.position);oe(t,M,t.position,!1)}return!0}function _e(t,y){const _=t.tag,F=t.anchor,C=[];let L=!1;if(t.firstTabInLine!==-1)return!1;t.anchor!==null&&we(t,t.anchor,C);let p=t.input.charCodeAt(t.position);for(;p!==0&&(t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,P(t,"tab characters must not be used in indentation")),!(p!==45||!O(t.input.charCodeAt(t.position+1))));){if(L=!0,t.position++,Y(t,!0,-1)&&t.lineIndent<=y){C.push(null),p=t.input.charCodeAt(t.position);continue}const w=t.line;if(Ee(t,y,f,!1,!0),C.push(t.result),Y(t,!0,-1),p=t.input.charCodeAt(t.position),(t.line===w||t.lineIndent>y)&&p!==0)P(t,"bad indentation of a sequence entry");else if(t.lineIndent<y)break}return L?(t.tag=_,t.anchor=F,t.kind="sequence",t.result=C,!0):!1}function qn(t,y,_){let F,C,L,p;const w=t.tag,I=t.anchor,D={},S=Object.create(null);let M=null,T=null,z=null,N=!1,q=!1;if(t.firstTabInLine!==-1)return!1;t.anchor!==null&&we(t,t.anchor,D);let B=t.input.charCodeAt(t.position);for(;B!==0;){!N&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,P(t,"tab characters must not be used in indentation"));const $=t.input.charCodeAt(t.position+1),W=t.line;if((B===63||B===58)&&O($))B===63?(N&&(ve(t,D,S,M,T,null,C,L,p),M=T=z=null),q=!0,N=!0,F=!0):N?(N=!1,F=!0):P(t,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),t.position+=1,B=$;else{if(C=t.line,L=t.lineStart,p=t.position,!Ee(t,_,s,!1,!0))break;if(t.line===W){for(B=t.input.charCodeAt(t.position);R(B);)B=t.input.charCodeAt(++t.position);if(B===58)B=t.input.charCodeAt(++t.position),O(B)||P(t,"a whitespace character is expected after the key-value separator within a block mapping"),N&&(ve(t,D,S,M,T,null,C,L,p),M=T=z=null),q=!0,N=!1,F=!1,M=t.tag,T=t.result;else if(q)P(t,"can not read an implicit mapping pair; a colon is missed");else return t.tag=w,t.anchor=I,!0}else if(q)P(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return t.tag=w,t.anchor=I,!0}if((t.line===W||t.lineIndent>y)&&(N&&(C=t.line,L=t.lineStart,p=t.position),Ee(t,y,b,!0,F)&&(N?T=t.result:z=t.result),N||(ve(t,D,S,M,T,z,C,L,p),M=T=z=null),Y(t,!0,-1),B=t.input.charCodeAt(t.position)),(t.line===W||t.lineIndent>y)&&B!==0)P(t,"bad indentation of a mapping entry");else if(t.lineIndent<y)break}return N&&ve(t,D,S,M,T,null,C,L,p),q&&(t.tag=w,t.anchor=I,t.kind="mapping",t.result=D),q}function pr(t){let y=!1,_=!1,F,C,L=t.input.charCodeAt(t.position);if(L!==33)return!1;t.tag!==null&&P(t,"duplication of a tag property"),L=t.input.charCodeAt(++t.position),L===60?(y=!0,L=t.input.charCodeAt(++t.position)):L===33?(_=!0,F="!!",L=t.input.charCodeAt(++t.position)):F="!";let p=t.position;if(y){do L=t.input.charCodeAt(++t.position);while(L!==0&&L!==62);t.position<t.length?(C=t.input.slice(p,t.position),L=t.input.charCodeAt(++t.position)):P(t,"unexpected end of the stream within a verbatim tag")}else{for(;L!==0&&!O(L);)L===33&&(_?P(t,"tag suffix cannot contain exclamation marks"):(F=t.input.slice(p-1,t.position+1),x.test(F)||P(t,"named tag handle cannot contain such characters"),_=!0,p=t.position+1)),L=t.input.charCodeAt(++t.position);C=t.input.slice(p,t.position),k.test(C)&&P(t,"tag suffix cannot contain flow indicator characters")}C&&!v.test(C)&&P(t,"tag name cannot contain such characters: "+C);try{C=decodeURIComponent(C)}catch{P(t,"tag name is malformed: "+C)}return y?t.tag=C:c.call(t.tagMap,F)?t.tag=t.tagMap[F]+C:F==="!"?t.tag="!"+C:F==="!!"?t.tag="tag:yaml.org,2002:"+C:P(t,'undeclared tag handle "'+F+'"'),!0}function Bn(t){let y=t.input.charCodeAt(t.position);if(y!==38)return!1;t.anchor!==null&&P(t,"duplication of an anchor property"),y=t.input.charCodeAt(++t.position);const _=t.position;for(;y!==0&&!O(y)&&!j(y);)y=t.input.charCodeAt(++t.position);return t.position===_&&P(t,"name of an anchor node must contain at least one character"),t.anchor=t.input.slice(_,t.position),!0}function jn(t){let y=t.input.charCodeAt(t.position);if(y!==42)return!1;y=t.input.charCodeAt(++t.position);const _=t.position;for(;y!==0&&!O(y)&&!j(y);)y=t.input.charCodeAt(++t.position);t.position===_&&P(t,"name of an alias node must contain at least one character");const F=t.input.slice(_,t.position);return c.call(t.anchorMap,F)||P(t,'unidentified alias "'+F+'"'),t.result=t.anchorMap[F],Y(t,!0,-1),!0}function br(t,y,_,F){const C=cn(t);return fr(t),$e(t,y),t.tag=null,t.anchor=null,t.kind=null,t.result=null,qn(t,_,F)&&t.kind==="mapping"?(Oe(t),!0):(hr(t),$e(t,C),!1)}function Ee(t,y,_,F,C){let L,p,w=1,I=!1,D=!1,S=null,M,T,z;t.depth>=t.maxDepth&&P(t,"nesting exceeded maxDepth ("+t.maxDepth+")"),t.depth+=1,t.listener!==null&&t.listener("open",t),t.tag=null,t.anchor=null,t.kind=null,t.result=null;const N=L=p=b===_||f===_;if(F&&Y(t,!0,-1)&&(I=!0,t.lineIndent>y?w=1:t.lineIndent===y?w=0:t.lineIndent<y&&(w=-1)),w===1)for(;;){const q=t.input.charCodeAt(t.position),B=cn(t);if(I&&(q===33&&t.tag!==null||q===38&&t.anchor!==null)||!pr(t)&&!Bn(t))break;S===null&&(S=B),Y(t,!0,-1)?(I=!0,p=N,t.lineIndent>y?w=1:t.lineIndent===y?w=0:t.lineIndent<y&&(w=-1)):p=!1}if(p&&(p=I||C),w===1||b===_)if(i===_||s===_?T=y:T=y+1,z=t.position-t.lineStart,w===1)if(p&&(_e(t,z)||qn(t,z,T))||zn(t,T))D=!0;else{const q=t.input.charCodeAt(t.position);S!==null&&N&&!p&&q!==124&&q!==62&&br(t,S,S.position-S.lineStart,T)||L&&Pn(t,T)||Nn(t,T)||ln(t,T)?D=!0:jn(t)?(D=!0,(t.tag!==null||t.anchor!==null)&&P(t,"alias node should not have any properties")):On(t,T,i===_)&&(D=!0,t.tag===null&&(t.tag="?")),t.anchor!==null&&we(t,t.anchor,t.result)}else w===0&&(D=p&&_e(t,z));if(t.tag===null)t.anchor!==null&&we(t,t.anchor,t.result);else if(t.tag==="?"){t.result!==null&&t.kind!=="scalar"&&P(t,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+t.kind+'"');for(let q=0,B=t.implicitTypes.length;q<B;q+=1)if(M=t.implicitTypes[q],M.resolve(t.result)){t.result=M.construct(t.result),t.tag=M.tag,t.anchor!==null&&we(t,t.anchor,t.result);break}}else if(t.tag!=="!"){if(c.call(t.typeMap[t.kind||"fallback"],t.tag))M=t.typeMap[t.kind||"fallback"][t.tag];else{M=null;const q=t.typeMap.multi[t.kind||"fallback"];for(let B=0,$=q.length;B<$;B+=1)if(t.tag.slice(0,q[B].tag.length)===q[B].tag){M=q[B];break}}M||P(t,"unknown tag !<"+t.tag+">"),t.result!==null&&M.kind!==t.kind&&P(t,"unacceptable node kind for !<"+t.tag+'> tag; it should be "'+M.kind+'", not "'+t.kind+'"'),M.resolve(t.result,t.tag)?(t.result=M.construct(t.result,t.tag),t.anchor!==null&&we(t,t.anchor,t.result)):P(t,"cannot resolve a node with !<"+t.tag+"> explicit tag")}return t.listener!==null&&t.listener("close",t),t.depth-=1,t.tag!==null||t.anchor!==null||D}function mr(t){const y=t.position;let _=!1,F;for(t.version=null,t.checkLineBreaks=t.legacy,t.tagMap=Object.create(null),t.anchorMap=Object.create(null);(F=t.input.charCodeAt(t.position))!==0&&(Y(t,!0,-1),F=t.input.charCodeAt(t.position),!(t.lineIndent>0||F!==37));){_=!0,F=t.input.charCodeAt(++t.position);let C=t.position;for(;F!==0&&!O(F);)F=t.input.charCodeAt(++t.position);const L=t.input.slice(C,t.position),p=[];for(L.length<1&&P(t,"directive name must not be less than one character in length");F!==0;){for(;R(F);)F=t.input.charCodeAt(++t.position);if(F===35){do F=t.input.charCodeAt(++t.position);while(F!==0&&!A(F));break}if(A(F))break;for(C=t.position;F!==0&&!O(F);)F=t.input.charCodeAt(++t.position);p.push(t.input.slice(C,t.position))}F!==0&&Ue(t),c.call(Ln,L)?Ln[L](t,L,p):He(t,'unknown document directive "'+L+'"')}if(Y(t,!0,-1),t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45?(t.position+=3,Y(t,!0,-1)):_&&P(t,"directives end mark is expected"),Ee(t,t.lineIndent-1,b,!1,!0),Y(t,!0,-1),t.checkLineBreaks&&g.test(t.input.slice(y,t.position))&&He(t,"non-ASCII line breaks are interpreted as content"),t.documents.push(t.result),t.position===t.lineStart&&Ge(t)){t.input.charCodeAt(t.position)===46&&(t.position+=3,Y(t,!0,-1));return}t.position<t.length-1&&P(t,"end of the stream or a document separator is expected")}function Hn(t,y){t=String(t),y=y||{},t.length!==0&&(t.charCodeAt(t.length-1)!==10&&t.charCodeAt(t.length-1)!==13&&(t+=`
`),t.charCodeAt(0)===65279&&(t=t.slice(1)));const _=new Q(t,y),F=t.indexOf("\0");for(F!==-1&&(_.position=F,P(_,"null byte is not allowed in input")),_.input+="\0";_.input.charCodeAt(_.position)===32;)_.lineIndent+=1,_.position+=1;for(;_.position<_.length-1;)mr(_);return _.documents}function $n(t,y,_){y!==null&&typeof y=="object"&&typeof _>"u"&&(_=y,y=null);const F=Hn(t,_);if(typeof y!="function")return F;for(let C=0,L=F.length;C<L;C+=1)y(F[C])}function gr(t,y){const _=Hn(t,y);if(_.length!==0){if(_.length===1)return _[0];throw new u("expected a single document in the stream, but found more")}}n.exports.loadAll=$n,n.exports.load=gr})),Nc=Z(((e,n)=>{var r=Fn(),u=Tn(),o=Qr(),a=Object.prototype.toString,c=Object.prototype.hasOwnProperty,i=65279,s=9,f=10,b=13,l=32,d=33,h=34,m=35,g=37,k=38,x=39,v=42,E=44,A=45,R=58,O=61,j=62,U=63,J=64,ae=91,xe=93,an=96,Re=123,Le=124,ce=125,Q={};Q[0]="\\0",Q[7]="\\a",Q[8]="\\b",Q[9]="\\t",Q[10]="\\n",Q[11]="\\v",Q[12]="\\f",Q[13]="\\r",Q[27]="\\e",Q[34]='\\"',Q[92]="\\\\",Q[133]="\\N",Q[160]="\\_",Q[8232]="\\L",Q[8233]="\\P";var Rn=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],P=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function He(p,w){if(w===null)return{};const I={},D=Object.keys(w);for(let S=0,M=D.length;S<M;S+=1){let T=D[S],z=String(w[T]);T.slice(0,2)==="!!"&&(T="tag:yaml.org,2002:"+T.slice(2));const N=p.compiledTypeMap.fallback[T];N&&c.call(N.styleAliases,z)&&(z=N.styleAliases[z]),I[T]=z}return I}function we(p){let w,I;const D=p.toString(16).toUpperCase();if(p<=255)w="x",I=2;else if(p<=65535)w="u",I=4;else if(p<=4294967295)w="U",I=8;else throw new u("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+w+r.repeat("0",I-D.length)+D}var fr=1,Oe=2;function hr(p){this.schema=p.schema||o,this.indent=Math.max(1,p.indent||2),this.noArrayIndent=p.noArrayIndent||!1,this.skipInvalid=p.skipInvalid||!1,this.flowLevel=r.isNothing(p.flowLevel)?-1:p.flowLevel,this.styleMap=He(this.schema,p.styles||null),this.sortKeys=p.sortKeys||!1,this.lineWidth=p.lineWidth||80,this.noRefs=p.noRefs||!1,this.noCompatMode=p.noCompatMode||!1,this.condenseFlow=p.condenseFlow||!1,this.quotingType=p.quotingType==='"'?Oe:fr,this.forceQuotes=p.forceQuotes||!1,this.replacer=typeof p.replacer=="function"?p.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function cn(p,w){const I=r.repeat(" ",w);let D=0,S="";const M=p.length;for(;D<M;){let T;const z=p.indexOf(`
`,D);z===-1?(T=p.slice(D),D=M):(T=p.slice(D,z+1),D=z+1),T.length&&T!==`
`&&(S+=I),S+=T}return S}function $e(p,w){return`
`+r.repeat(" ",p.indent*w)}function Ln(p,w){for(let I=0,D=p.implicitTypes.length;I<D;I+=1)if(p.implicitTypes[I].resolve(w))return!0;return!1}function oe(p){return p===l||p===s}function Se(p){return p>=32&&p<=126||p>=161&&p<=55295&&p!==8232&&p!==8233||p>=57344&&p<=65533&&p!==i||p>=65536&&p<=1114111}function ve(p){return Se(p)&&p!==i&&p!==b&&p!==f}function Ue(p,w,I){const D=ve(p),S=D&&!oe(p);return(I?D:D&&p!==E&&p!==ae&&p!==xe&&p!==Re&&p!==ce)&&p!==m&&!(w===R&&!S)||ve(w)&&!oe(w)&&p===m||w===R&&S}function Y(p){return Se(p)&&p!==i&&!oe(p)&&p!==A&&p!==U&&p!==R&&p!==E&&p!==ae&&p!==xe&&p!==Re&&p!==ce&&p!==m&&p!==k&&p!==v&&p!==d&&p!==Le&&p!==O&&p!==j&&p!==x&&p!==h&&p!==g&&p!==J&&p!==an}function Ge(p){return!oe(p)&&p!==R}function Ce(p,w){const I=p.charCodeAt(w);let D;return I>=55296&&I<=56319&&w+1<p.length&&(D=p.charCodeAt(w+1),D>=56320&&D<=57343)?(I-55296)*1024+D-56320+65536:I}function On(p){return/^\n* /.test(p)}var Nn=1,ln=2,zn=3,Pn=4,_e=5;function qn(p,w,I,D,S,M,T,z){let N,q=0,B=null,$=!1,W=!1;const au=D!==-1;let sn=-1,dn=Y(Ce(p,0))&&Ge(Ce(p,p.length-1));if(w||T)for(N=0;N<p.length;q>=65536?N+=2:N++){if(q=Ce(p,N),!Se(q))return _e;dn=dn&&Ue(q,B,z),B=q}else{for(N=0;N<p.length;q>=65536?N+=2:N++){if(q=Ce(p,N),q===f)$=!0,au&&(W=W||N-sn-1>D&&p[sn+1]!==" ",sn=N);else if(!Se(q))return _e;dn=dn&&Ue(q,B,z),B=q}W=W||au&&N-sn-1>D&&p[sn+1]!==" "}return!$&&!W?dn&&!T&&!S(p)?Nn:M===Oe?_e:ln:I>9&&On(p)?_e:T?M===Oe?_e:ln:W?Pn:zn}function pr(p,w,I,D,S){p.dump=(function(){if(w.length===0)return p.quotingType===Oe?'""':"''";if(!p.noCompatMode&&(Rn.indexOf(w)!==-1||P.test(w)))return p.quotingType===Oe?'"'+w+'"':"'"+w+"'";const M=p.indent*Math.max(1,I),T=p.lineWidth===-1?-1:Math.max(Math.min(p.lineWidth,40),p.lineWidth-M),z=D||p.flowLevel>-1&&I>=p.flowLevel;function N(q){return Ln(p,q)}switch(qn(w,z,p.indent,T,N,p.quotingType,p.forceQuotes&&!D,S)){case Nn:return w;case ln:return"'"+w.replace(/'/g,"''")+"'";case zn:return"|"+Bn(w,p.indent)+jn(cn(w,M));case Pn:return">"+Bn(w,p.indent)+jn(cn(br(w,T),M));case _e:return'"'+mr(w)+'"';default:throw new u("impossible error: invalid scalar style")}})()}function Bn(p,w){const I=On(p)?String(w):"",D=p[p.length-1]===`
`;return I+(D&&(p[p.length-2]===`
`||p===`
`)?"+":D?"":"-")+`
`}function jn(p){return p[p.length-1]===`
`?p.slice(0,-1):p}function br(p,w){const I=/(\n+)([^\n]*)/g;let D=(function(){let z=p.indexOf(`
`);return z=z!==-1?z:p.length,I.lastIndex=z,Ee(p.slice(0,z),w)})(),S=p[0]===`
`||p[0]===" ",M,T;for(;T=I.exec(p);){const z=T[1],N=T[2];M=N[0]===" ",D+=z+(!S&&!M&&N!==""?`
`:"")+Ee(N,w),S=M}return D}function Ee(p,w){if(p===""||p[0]===" ")return p;const I=/ [^ ]/g;let D,S=0,M,T=0,z=0,N="";for(;D=I.exec(p);)z=D.index,z-S>w&&(M=T>S?T:z,N+=`
`+p.slice(S,M),S=M+1),T=z;return N+=`
`,p.length-S>w&&T>S?N+=p.slice(S,T)+`
`+p.slice(T+1):N+=p.slice(S),N.slice(1)}function mr(p){let w="",I=0;for(let D=0;D<p.length;I>=65536?D+=2:D++){I=Ce(p,D);const S=Q[I];!S&&Se(I)?(w+=p[D],I>=65536&&(w+=p[D+1])):w+=S||we(I)}return w}function Hn(p,w,I){let D="";const S=p.tag;for(let M=0,T=I.length;M<T;M+=1){let z=I[M];p.replacer&&(z=p.replacer.call(I,String(M),z)),(_(p,w,z,!1,!1)||typeof z>"u"&&_(p,w,null,!1,!1))&&(D!==""&&(D+=","+(p.condenseFlow?"":" ")),D+=p.dump)}p.tag=S,p.dump="["+D+"]"}function $n(p,w,I,D){let S="";const M=p.tag;for(let T=0,z=I.length;T<z;T+=1){let N=I[T];p.replacer&&(N=p.replacer.call(I,String(T),N)),(_(p,w+1,N,!0,!0,!1,!0)||typeof N>"u"&&_(p,w+1,null,!0,!0,!1,!0))&&((!D||S!=="")&&(S+=$e(p,w)),p.dump&&f===p.dump.charCodeAt(0)?S+="-":S+="- ",S+=p.dump)}p.tag=M,p.dump=S||"[]"}function gr(p,w,I){let D="";const S=p.tag,M=Object.keys(I);for(let T=0,z=M.length;T<z;T+=1){let N="";D!==""&&(N+=", "),p.condenseFlow&&(N+='"');const q=M[T];let B=I[q];p.replacer&&(B=p.replacer.call(I,q,B)),_(p,w,q,!1,!1)&&(p.dump.length>1024&&(N+="? "),N+=p.dump+(p.condenseFlow?'"':"")+":"+(p.condenseFlow?"":" "),_(p,w,B,!1,!1)&&(N+=p.dump,D+=N))}p.tag=S,p.dump="{"+D+"}"}function t(p,w,I,D){let S="";const M=p.tag,T=Object.keys(I);if(p.sortKeys===!0)T.sort();else if(typeof p.sortKeys=="function")T.sort(p.sortKeys);else if(p.sortKeys)throw new u("sortKeys must be a boolean or a function");for(let z=0,N=T.length;z<N;z+=1){let q="";(!D||S!=="")&&(q+=$e(p,w));const B=T[z];let $=I[B];if(p.replacer&&($=p.replacer.call(I,B,$)),!_(p,w+1,B,!0,!0,!0))continue;const W=p.tag!==null&&p.tag!=="?"||p.dump&&p.dump.length>1024;W&&(p.dump&&f===p.dump.charCodeAt(0)?q+="?":q+="? "),q+=p.dump,W&&(q+=$e(p,w)),_(p,w+1,$,!0,W)&&(p.dump&&f===p.dump.charCodeAt(0)?q+=":":q+=": ",q+=p.dump,S+=q)}p.tag=M,p.dump=S||"{}"}function y(p,w,I){const D=I?p.explicitTypes:p.implicitTypes;for(let S=0,M=D.length;S<M;S+=1){const T=D[S];if((T.instanceOf||T.predicate)&&(!T.instanceOf||typeof w=="object"&&w instanceof T.instanceOf)&&(!T.predicate||T.predicate(w))){if(I?T.multi&&T.representName?p.tag=T.representName(w):p.tag=T.tag:p.tag="?",T.represent){const z=p.styleMap[T.tag]||T.defaultStyle;let N;if(a.call(T.represent)==="[object Function]")N=T.represent(w,z);else if(c.call(T.represent,z))N=T.represent[z](w,z);else throw new u("!<"+T.tag+'> tag resolver accepts not "'+z+'" style');p.dump=N}return!0}}return!1}function _(p,w,I,D,S,M,T){p.tag=null,p.dump=I,y(p,I,!1)||y(p,I,!0);const z=a.call(p.dump),N=D;D&&(D=p.flowLevel<0||p.flowLevel>w);const q=z==="[object Object]"||z==="[object Array]";let B,$;if(q&&(B=p.duplicates.indexOf(I),$=B!==-1),(p.tag!==null&&p.tag!=="?"||$||p.indent!==2&&w>0)&&(S=!1),$&&p.usedDuplicates[B])p.dump="*ref_"+B;else{if(q&&$&&!p.usedDuplicates[B]&&(p.usedDuplicates[B]=!0),z==="[object Object]")D&&Object.keys(p.dump).length!==0?(t(p,w,p.dump,S),$&&(p.dump="&ref_"+B+p.dump)):(gr(p,w,p.dump),$&&(p.dump="&ref_"+B+" "+p.dump));else if(z==="[object Array]")D&&p.dump.length!==0?(p.noArrayIndent&&!T&&w>0?$n(p,w-1,p.dump,S):$n(p,w,p.dump,S),$&&(p.dump="&ref_"+B+p.dump)):(Hn(p,w,p.dump),$&&(p.dump="&ref_"+B+" "+p.dump));else if(z==="[object String]")p.tag!=="?"&&pr(p,p.dump,w,M,N);else{if(z==="[object Undefined]")return!1;if(p.skipInvalid)return!1;throw new u("unacceptable kind of an object to dump "+z)}if(p.tag!==null&&p.tag!=="?"){let W=encodeURI(p.tag[0]==="!"?p.tag.slice(1):p.tag).replace(/!/g,"%21");p.tag[0]==="!"?W="!"+W:W.slice(0,18)==="tag:yaml.org,2002:"?W="!!"+W.slice(18):W="!<"+W+">",p.dump=W+" "+p.dump}}return!0}function F(p,w){const I=[],D=[];C(p,I,D);const S=D.length;for(let M=0;M<S;M+=1)w.duplicates.push(I[D[M]]);w.usedDuplicates=new Array(S)}function C(p,w,I){if(p!==null&&typeof p=="object"){const D=w.indexOf(p);if(D!==-1)I.indexOf(D)===-1&&I.push(D);else if(w.push(p),Array.isArray(p))for(let S=0,M=p.length;S<M;S+=1)C(p[S],w,I);else{const S=Object.keys(p);for(let M=0,T=S.length;M<T;M+=1)C(p[S[M]],w,I)}}}function L(p,w){w=w||{};const I=new hr(w);I.noRefs||F(p,I);let D=p;return I.replacer&&(D=I.replacer.call({"":D},"",D)),_(I,0,D,!0,!0)?I.dump+`
`:""}n.exports.dump=L})),Bt=Rc(Z(((e,n)=>{var r=Oc(),u=Nc();function o(a,c){return function(){throw new Error("Function yaml."+a+" is removed in js-yaml 4. Use yaml."+c+" instead, which is now safe by default.")}}n.exports.Type=ue(),n.exports.Schema=Ct(),n.exports.FAILSAFE_SCHEMA=Dt(),n.exports.JSON_SCHEMA=It(),n.exports.CORE_SCHEMA=Rt(),n.exports.DEFAULT_SCHEMA=Qr(),n.exports.load=r.load,n.exports.loadAll=r.loadAll,n.exports.dump=u.dump,n.exports.YAMLException=Tn(),n.exports.types={binary:Nt(),float:Mt(),map:At(),null:St(),pairs:Pt(),set:qt(),timestamp:Lt(),bool:Ft(),int:Tt(),merge:Ot(),omap:zt(),seq:Et(),str:_t()},n.exports.safeLoad=o("safeLoad","load"),n.exports.safeLoadAll=o("safeLoadAll","loadAll"),n.exports.safeDump=o("safeDump","dump")}))()),{Type:T0,Schema:M0,FAILSAFE_SCHEMA:I0,JSON_SCHEMA:R0,CORE_SCHEMA:zc,DEFAULT_SCHEMA:L0,load:Pc,loadAll:O0,dump:N0,YAMLException:z0,types:P0,safeLoad:q0,safeLoadAll:B0,safeDump:j0}=Bt.default;Bt.default;var Sr,Ru;function qc(){return Ru||(Ru=1,Sr=function(n,r){var u=3,o="-",a=o.charCodeAt(0),c=o.length;function i(s,f,b,l){var d,h,m,g,k,x,v,E=!1,A=s.bMarks[f]+s.tShift[f],R=s.eMarks[f];if(f!==0||a!==s.src.charCodeAt(0))return!1;for(d=A+1;d<=R;d++)if(o[(d-A)%c]!==s.src[d]){v=d+1;break}if(m=Math.floor((d-A)/c),m<u)return!1;if(d-=(d-A)%c,l)return!0;for(h=f;h++,!(h>=b||s.src.slice(A,R)==="..."||(A=s.bMarks[h]+s.tShift[h],R=s.eMarks[h],A<R&&s.sCount[h]<s.blkIndent));)if(a===s.src.charCodeAt(A)&&!(s.sCount[h]-s.blkIndent>=4)){for(d=A+1;d<=R&&o[(d-A)%c]===s.src[d];d++);if(!(Math.floor((d-A)/c)<m)&&(d-=(d-A)%c,d=s.skipSpaces(d),!(d<R))){E=!0;break}}return k=s.parentType,x=s.lineMax,s.parentType="container",s.lineMax=h,g=s.push("front_matter",null,0),g.hidden=!0,g.markup=s.src.slice(f,d),g.block=!0,g.map=[f,h+(E?1:0)],g.meta=s.src.slice(v,A-1),s.parentType=k,s.lineMax=x,s.line=h+(E?1:0),r(g.meta),!0}n.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),Sr}var Bc=qc();const jc=ar(Bc);function Hc(){return e=>{let n="";e.use(jc,r=>{const u=$c(r);u!==void 0?n=jt(u,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(r,u,o,a,c)=>n===""?"":`<table class="markdown-frontMatter"${c.renderAttrs(r[u])}>
${n}
</table>
`}}function $c(e){try{const n=Pc(e,{schema:zc});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function jt(e,n){const r=Object.entries(e);return r.length===0?"":`<tbody>
${r.map(([o,a])=>`<tr><th scope="row">${n(o)}</th><td>${zr(a,n)}</td></tr>`).join(`
`)}
</tbody>`}function zr(e,n){if(e==null)return"";if(e instanceof Date)return n(Uc(e));if(Array.isArray(e))return e.every(Gc)?e.map(u=>zr(u,n)).join(", "):`<ul>${e.map(u=>`<li>${zr(u,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const r=jt(e,n);return r===""?"":`<table>${r}</table>`}return n(String(e))}function Uc(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function Gc(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const Xr={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},Vc=on(H.MarkEdit.userSettings),se=on(Vc[Xr.rootValueKey]),Ht=on(se.changeMode),$t=on(se.markdownIt),Zc=["automatic","quiet","notify","never"],bn=(()=>{const e=se.updateBehavior;return e&&Zc.includes(e)?e:Mn(se.autoUpdate)?"quiet":"never"})(),Wc=Mn(se.syncScroll);Mn(se.hidePreviewButtons);Mn(se.syntaxAutoDetect,!1);const Yc=Mn(se.imageHoverPreview,!1),cr=se.themeName??"github",Ut=cr==="none",Fr=se.styledHtmlColorScheme??se.styledHtmlTheme??"auto";se.mathDelimiters;const Kc=Ht.modes??Xr.defaultModes,Lu=on(Ht.hotKey),Jc=$t.preset??Xr.defaultPreset,Qc=on($t.options);function on(e,n={}){return e??n}function Mn(e,n=!0){return e??n}const Xc=`.markdown-body {
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
  width: max-content;
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
`,el=`.markdown-body {
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
`,nl=`.markdown-body {
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
`,rl=`.markdown-body {
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
`,ul=`.markdown-body {
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
`,tl=`.markdown-body {
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
`,ol=`.markdown-body {
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
`,il=`.markdown-body {
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
`,al=`.markdown-body {
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
`,cl=`.markdown-body {
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
`,ll=`.markdown-body {
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
`,sl=`.markdown-body {
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
`,dl=`.markdown-body {
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
`,fl=`.markdown-body {
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
`,hl=`.markdown-body {
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
`,pl=`.markdown-body {
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
`,bl=`.markdown-body {
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
`,ml=`.markdown-alert {
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
`,gl=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,kl=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,yl=`.code-copy-wrapper {
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
  background: var(--bgColor-neutral-muted, ButtonFace);
}

.code-copy-button:active {
  background: var(--borderColor-default, ButtonBorder);
}
`,Qn={github:{light:el,dark:nl},cobalt:{dark:rl},dracula:{dark:ul},minimal:{light:tl,dark:ol},"night-owl":{dark:il},"rose-pine":{light:al,dark:cl},solarized:{light:ll,dark:sl},synthwave84:{dark:dl},"winter-is-coming":{light:fl,dark:hl},xcode:{light:pl,dark:bl}};function xl(e="auto"){if(Ut)return"";const n=Qn[cr]??Qn.github,r=n.light??n.dark,u=n.dark??n.light,o=cu(r)??"#ffffff",a=cu(u)??"#0d1117";return[".markdown-body { padding: 25px; }",...eu(e,`body { background: ${o}; }`,`body { background: ${a}; }`)].join(`
`)}function Gt(e="auto"){if(Ut)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=Qn[cr]??Qn.github,r=n.light??n.dark,u=n.dark??n.light;return[Xc,...eu(e,r,u)].join(`
`)}function wl(e="auto"){return[ml,...eu(e,gl,kl)].join(`
`)}function Vt(){return yl}function eu(e,n,r){const u=[];switch(e){case"light":u.push(n);break;case"dark":u.push(r);break;case"auto":u.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${r}
        }`);break}return u}const vl={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function V(e){return _l[e]}const Cl=["default","zh-CN","zh-TW"],_l=vl[(()=>{const e=navigator.language;return Cl.includes(e)?e:"default"})()];function nu(){return typeof H.MarkEdit.addExtension=="function"}async function ru(e,n=!0){return await Dl,fe.render(e,{lineInfo:n})}function Zt(e){e()}async function Wt(e){const n=u=>`<style>
${u}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(xl(Fr)),n(Gt(Fr)),n(wl(Fr)),n(Vt()),"</body></html>"].join(`
`)}const fe=le(Jc,{html:!0,breaks:!0,linkify:!0,...Qc}),El=[];fe.use(Hc());fe.use(Ke);fe.use(dc,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});fe.use(xc);fe.use(Cc,{enabled:nu(),label:!0});fe.use(Ec);const Al=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),Dl=Promise.all(El).then(()=>{for(const e of Al){const n=fe.renderer.rules[e];fe.renderer.rules[e]=(r,u,o,a,c)=>{const i=r[u];return a.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),n?n(r,u,o,a,c):c.renderToken(r,u,o)}}for(const e of["fence","code_block"]){const n=fe.renderer.rules[e];fe.renderer.rules[e]=(r,u,o,a,c)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?c.renderToken(r,u,o):n(r,u,o,a,c)}
        <button title="${V("copyCode")}" aria-label="${V("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),Sl=new DOMParser,Fl="image-loader",uu="cm-md-image-preview",Ou=5;function Yt(e){const n=Sl.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(u=>{const o=u.getAttribute("src");o!==null&&(o.includes("://")||o.startsWith("data:image/")||(u.src=`${Fl}://${o}`))}),n.body.innerHTML}function Tl(e){typeof H.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{Me.panelPresenter!==void 0&&(clearTimeout(Me.panelPresenter),Me.panelPresenter=void 0),Me.panelPresenter=setTimeout(()=>{const r=n.target,u=r?.closest(".cm-md-link"),o=u?.dataset.linkUrl??u?.innerText??"";u!==null&&wo(o)?Ml(u,o):r?.classList.contains(uu)||mn()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&mn(!1)}),e.addEventListener("scroll",()=>mn()))}async function Ml(e,n){if(e===Me.focusedElement)return;const r=(await H.MarkEdit.getFileInfo())?.parentPath;if(r===void 0)return;const u=Ye(r,n),o=await H.MarkEdit.getFileObject(u);if(o===void 0)return;const a=e.getBoundingClientRect(),c=document.createElement("img");c.className=uu,c.style.position="fixed",c.style.left=`${a.left}px`,c.style.zIndex="10000",c.style.borderRadius="5px",c.style.opacity="0",c.style.transition="opacity 120ms",c.style.cursor="pointer",c.onclick=()=>{mn(),window.open(n,"_blank")},c.onload=()=>{const s=Math.min(c.naturalHeight,240);c.style.height=`${s}px`;const f=a.top,b=window.innerHeight-a.bottom;f>b?c.style.top=`${a.top-s-Ou}px`:c.style.top=`${a.bottom+Ou}px`,requestAnimationFrame(()=>{c.style.opacity="1"})};const i=o.mimeType??"image/png";c.src=`data:${i};base64,${o.data}`,mn(!1),Me.focusedElement=e,document.body.appendChild(c)}function mn(e=!0){Me.focusedElement!==void 0&&(Me.focusedElement=void 0,document.querySelectorAll(`.${uu}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const Me={panelPresenter:void 0,focusedElement:void 0};function Il(e,n){if(!Wc)return;Ve.lastSourceScrollTop=e.scrollTop;const r=()=>{Math.abs(e.scrollTop-Ve.lastSourceScrollTop)<.5||(Ve.lastSourceScrollTop=e.scrollTop,Kt(e,n))};"onscrollend"in window?e.addEventListener("scrollend",r):e.addEventListener("scroll",()=>{Ve.scrollUpdater!==void 0&&clearTimeout(Ve.scrollUpdater),Ve.scrollUpdater=setTimeout(r,100)})}function Kt(e,n,r=!0){const{line:u,progress:o}=Rl(e);Ll(n,u,o,r)}function Rl(e,n=0){const r=H.MarkEdit.editorView,u=r.lineBlockAtHeight(e.scrollTop+n),o=r.state.doc.lineAt(u.from).number-1,a=yo(r.domAtPos(u.from).node);if(a===null)return{line:o,progress:0};const c=e.getBoundingClientRect(),i=a.getBoundingClientRect(),s=c.top-i.top-n,f=i.height>0?tu(s/i.height):0;return{line:o,progress:f}}function Ll(e,n,r,u=!0){if(n===0&&r===0)return Zn(e,0,u);const o=Array.from(document.querySelectorAll("[data-line-from]")),a=Ol(o,n);if(a!==void 0){const{from:s,to:f}=Je(a);return kr(e,a,Nl(n,r,s,f),u)}if(n===0)return Zn(e,0,u);const{beforeBlock:c,afterBlock:i}=zl(o,n);if(c!==void 0&&i!==void 0){const s=Je(c),f=Je(i),b=Rr(e,c)+c.offsetHeight,l=Rr(e,i),d=f.from-s.to,h=n-s.to+r,m=d>0?tu(h/d):0,g=b+(l-b)*m;return Zn(e,g,u)}if(c!==void 0)return kr(e,c,1,u);if(i!==void 0)return kr(e,i,0,u)}function Ol(e,n){return e.find(r=>{const{from:u,to:o}=Je(r);return n>=u&&n<=o})}function Nl(e,n,r,u){const o=u-r;if(o<1)return e===r?n:0;const a=e-r+n;return tu(a/o)}function zl(e,n){let r,u;for(const o of e){const{from:a,to:c}=Je(o);if(c<n)r=o;else if(a>n){u=o;break}}return{beforeBlock:r,afterBlock:u}}function tu(e){return Math.max(0,Math.min(1,e))}const Ve={lastSourceScrollTop:0,scrollUpdater:void 0};function Pl(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}const qe={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},lr={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var Tr=function(e,n){return Number(e.slice(0,-1*n.length))},ql=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Tr(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Tr(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Tr(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},Jt=function(e){return e.split(" ").map(ql)},Bl=function(e,n,r,u){r===void 0&&(r=0),u===void 0&&(u=!1);var o=u?e+1:e,a=n.slice(0,o).reduce(function(i,s){return i+s.numeric},0),c=r?e*r:0;return a+c},Qt=function(e,n,r){return n.concat(r).map(function(u){return u.style[e]}).filter(function(u){return u!==void 0&&u!==""})},jl=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Nu=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},Be=function(){return!1},Hl=function(e,n,r){e.style[n]=r},K=function(e,n,r){var u=e[n];return u!==void 0?u:r};function Xt(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(r){var u=[];try{u=Array.from(r.cssRules||[])}catch{}return u})).filter(function(r){var u=!1;try{u=e.matches(r.selectorText)}catch{}return u})}var $l="grid-template-columns",Ul="grid-template-rows",re=function(n,r,u){this.direction=n,this.element=r.element,this.track=r.track,n==="column"?(this.gridTemplateProp=$l,this.gridGapProp="grid-column-gap",this.cursor=K(u,"columnCursor",K(u,"cursor","col-resize")),this.snapOffset=K(u,"columnSnapOffset",K(u,"snapOffset",30)),this.dragInterval=K(u,"columnDragInterval",K(u,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=K(u,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=Ul,this.gridGapProp="grid-row-gap",this.cursor=K(u,"rowCursor",K(u,"cursor","row-resize")),this.snapOffset=K(u,"rowSnapOffset",K(u,"snapOffset",30)),this.dragInterval=K(u,"rowDragInterval",K(u,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=K(u,"gridTemplateRows")),this.onDragStart=K(u,"onDragStart",Be),this.onDragEnd=K(u,"onDragEnd",Be),this.onDrag=K(u,"onDrag",Be),this.writeStyle=K(u,"writeStyle",Hl),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=r.minSizeStart,this.minSizeEnd=r.minSizeEnd,r.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};re.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),r=n.width,u=n.height,o=n.top,a=n.bottom,c=n.left,i=n.right;this.direction==="column"?(this.start=o,this.end=a,this.size=u):this.direction==="row"&&(this.start=c,this.end=i,this.size=r)};re.prototype.getSizeAtTrack=function(n,r){return Bl(n,this.computedPixels,this.computedGapPixels,r)};re.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};re.prototype.getRawTracks=function(){var n=Qt(this.gridTemplateProp,[this.grid],Xt(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};re.prototype.getGap=function(){var n=Qt(this.gridGapProp,[this.grid],Xt(this.grid));return n.length?n[0]:null};re.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};re.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};re.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=Jt(n)};re.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=Jt(n)};re.prototype.setGap=function(n){this.gap=n};re.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=jl("px",this.computedGap)||0};re.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};re.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var r=this.trackValues.filter(function(i){return i.type==="%"}),u=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=u.length,this.totalFrs){var o=Nu(u);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/u[o].numeric)}if(r.length){var a=Nu(r);a!==null&&(this.percentageToPixels=this.computedPixels[a].numeric/r[a].numeric)}var c=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-c,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Be),this.grid.addEventListener("dragstart",Be),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};re.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};re.prototype.drag=function(n){var r=this.getMousePosition(n),u=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,a=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(u-this.dragStartOffset),c=o+this.snapOffset,i=a-this.snapOffset;r<c&&(r=o),r>i&&(r=a),r<o?r=o:r>a&&(r=a);var s=r-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,f=this.bTrackEnd-r+this.dragStartOffset-u-this.computedGapPixels;if(this.dragInterval>1){var b=Math.round(s/this.dragInterval)*this.dragInterval;f-=b-s,s=b}if(s<this.minSizeStart&&(s=this.minSizeStart),f<this.minSizeEnd&&(f=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var l=s/this.frToPixels;this.tracks[this.aTrack]=l+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var d=s/this.percentageToPixels;this.tracks[this.aTrack]=d+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=f+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=f/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var m=f/this.percentageToPixels;this.tracks[this.bTrack]=m+"%"}var g=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,g),this.onDrag(this.direction,this.track,g)};re.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Be),this.grid.removeEventListener("dragstart",Be),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};re.prototype.destroy=function(n,r){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),r&&r()):(this.needsDestroy=!0,r&&(this.destroyCb=r))};var zu=function(e,n,r){return n in e?e[n]:r},rn=function(e,n){return function(r){if(r.track<1)throw Error("Invalid track index: "+r.track+". Track must be between two other tracks.");var u=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},o=e==="column"?"columnMinSize":"rowMinSize";return new re(e,Object.assign({},{minSizeStart:zu(u,r.track-1,K(n,o,K(n,"minSize",0))),minSizeEnd:zu(u,r.track+1,K(n,o,K(n,"minSize",0)))},r),n)}},je=function(n){var r=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(u){r.columnGutters[u.track]=rn("column",r.options)(u)}),this.options.rowGutters.forEach(function(u){r.rowGutters[u.track]=rn("row",r.options)(u)})};je.prototype.addColumnGutter=function(n,r){this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=rn("column",this.options)({element:n,track:r})};je.prototype.addRowGutter=function(n,r){this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=rn("row",this.options)({element:n,track:r})};je.prototype.removeColumnGutter=function(n,r){var u=this;r===void 0&&(r=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(r,function(){delete u.columnGutters[n]})};je.prototype.removeRowGutter=function(n,r){var u=this;r===void 0&&(r=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(r,function(){delete u.rowGutters[n]})};je.prototype.handleDragStart=function(n,r,u){r==="column"?(this.columnGutters[u]&&this.columnGutters[u].destroy(),this.columnGutters[u]=rn("column",this.options)({track:u}),this.columnGutters[u].startDragging(n)):r==="row"&&(this.rowGutters[u]&&this.rowGutters[u].destroy(),this.rowGutters[u]=rn("row",this.options)({track:u}),this.rowGutters[u].startDragging(n))};je.prototype.destroy=function(n){var r=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(u){return r.columnGutters[u].destroy(n,function(){delete r.columnGutters[u]})}),Object.keys(this.rowGutters).forEach(function(u){return r.rowGutters[u].destroy(n,function(){delete r.rowGutters[u]})})};function Gl(e){return new je(e)}const Vl=`body .markdown-body details summary,
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

.markdown-update-pill {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10000;
  padding: 4px 10px;
  border: none;
  border-radius: 999px;
  background-color: #0088ff;
  color: white;
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  user-select: none;
  -webkit-user-select: none;
}

.markdown-update-pill:hover {
  filter: brightness(1.08);
}

.markdown-update-pill:active {
  filter: brightness(0.92);
}

@media (prefers-color-scheme: dark) {
  .markdown-divider {
    background: #2a2a2a;
  }

  .markdown-update-pill {
    background-color: #0091ff;
  }
}
`,Xn=document.body,gn=document.createElement("div"),X=document.createElement("div"),Pu=pn("* { cursor: col-resize }",!1),eo=mo.Annotation.define();var be=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(be||{});function Zl(){pn(Vl),pn(Gt()),pn(Vt());const e=document.createElement("div");e.className=qe.dividerViewClass,gn.appendChild(e),gn.className=qe.gutterViewClass,Xn.appendChild(gn),X.className=qe.previewPaneClass,Xn.appendChild(X),document.addEventListener("keydown",u=>{if(!u.metaKey||u.key!=="a")return;const o=H.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(X.classList.contains("overlay")||document.activeElement!==o)&&(xo(X),u.preventDefault())}),new MutationObserver(qu).observe(X,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{qu(),document.querySelector(".mermaid")!==null&&er()}),typeof H.MarkEdit.getFileInfo=="function"&&typeof H.MarkEdit.openFile=="function"&&X.addEventListener("click",r0),X.addEventListener("click",u0)}function sr(e,n=!0){const r=de();fn.viewMode=e,e!==r&&localStorage.setItem(lr.viewModeCacheKey,String(e));const u=H.MarkEdit.editorView;e===0?u.focus():e===2&&u.contentDOM.blur(),e===1?(Xn.classList.add(qe.containerClass),fn.splitter??=Gl({columnGutters:[{track:1,element:gn}],minSize:150,onDragStart:()=>Pu.disabled=!1,onDragEnd:()=>Pu.disabled=!0})):(Xn.classList.remove(qe.containerClass),fn.splitter?.destroy(),fn.splitter=void 0),e===2?X.classList.add("overlay"):X.classList.remove("overlay"),n&&er()}function Wl(){const e=[0,...Kc.map(u=>{switch(u){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(u=>u!==void 0)],n=e.indexOf(de()),r=n===-1?0:(n+1)%e.length;sr(e[r])}function Yl(){const e=localStorage.getItem(lr.viewModeCacheKey);if(e===null)return;const n=Number(e);de()!==n&&sr(n,!0)}function de(){return fn.viewMode}async function er(){if(de()===0)return;const e=Yt(await dr());X.innerHTML=e,Zt(()=>{Kt(no(),In(),!1);const n=localStorage.getItem(lr.previewPageZoomKey);n!==null&&(X.style.zoom=n)})}function Kl(e){if(de()===0||de()===1&&H.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(X.style.zoom)||1,r=u=>String(Math.min(Math.max(u,.5),3));switch(e.key){case"-":X.style.zoom=r(n-.1);break;case"=":X.style.zoom=r(n+.1);break;case"0":X.style.zoom="1";break;default:return}localStorage.setItem(lr.previewPageZoomKey,X.style.zoom),e.preventDefault(),e.stopPropagation()}function Jl(){uo(!1)}function Ql(){uo(!0)}async function Xl(){const e=await dr(!1);await navigator.clipboard.writeText(e)}async function e0(){const e=await dr(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([X.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function no(){return H.MarkEdit.editorView.scrollDOM}function In(){return X}async function ro(e){const n=await dr(!1);return e?await Wt(n):`<meta charset="UTF-8">
${n}`}async function n0(e,n){const r=await ru(e,!1);return n?await Wt(r):`<meta charset="UTF-8">
${r}`}async function dr(e=!0){const n=H.MarkEdit.editorAPI.getText();return await ru(n,e)}function qu(){const e=getComputedStyle(X).backgroundColor;gn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function uo(e){const n=await(async()=>{const u=await H.MarkEdit.getFileInfo();return u===void 0?`${V("untitled")}.html`:`${ko(u.filePath)}.html`})(),r=await ro(e);H.MarkEdit.showSavePanel({fileName:n,string:r})}async function r0(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const r=n.getAttribute("href");if(!r?.startsWith("../"))return;const u=(await H.MarkEdit.getFileInfo())?.parentPath;if(u!==void 0){e.preventDefault(),e.stopPropagation();try{const o=Ye(u,decodeURIComponent(r));await H.MarkEdit.openFile(o)}catch(o){console.error("Failed to open file:",o)}}}function u0(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const r=n.closest("[data-line-from]");if(r===null){console.error("Failed to find task item block");return}const u=H.MarkEdit.editorAPI,o=u.getLineRange(Je(r).from),a=Pl(u.getText(o));if(a===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const c=o.from+a.offset;H.MarkEdit.editorView.dispatch({changes:{from:c,to:c+1,insert:a.replacement},annotations:eo.of(!0)})}const fn={viewMode:0,splitter:void 0};async function Pr(){if(bn==="never")return;const e=await to();typeof e.tag_name=="string"&&e.name!=="1.8.1"&&(ao().has(e.name)||(bn==="automatic"&&Hr()?await ou(e.tag_name):bn==="quiet"?(qr.pendingRelease=e,oo(e)):o0(e)))}async function t0(){const e=Date.now(),n=Number(localStorage.getItem(un.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await Pr(),localStorage.setItem(un.lastCheckCacheKey,String(e))}catch(r){console.error("Failed to check for updates:",r)}}async function to(){return await(await fetch(un.latestReleaseURL)).json()}async function ou(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,r="lite/",u=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,o=`${un.rawBaseURL}${u}/dist/${r}markedit-preview.js`,a=await fetch(o);if(!a.ok)return console.error(`Failed to download the latest build from ${o}`),!1;const c=await a.text();return await H.MarkEdit.createFile({path:n,string:c,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function oo(e=qr.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${qe.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const r=document.createElement("button");return r.dataset.releaseName=e.name,r.className=qe.updatePillClass,r.textContent=V("update"),r.style.display=de()===be.edit?"none":"",r.addEventListener("webkitmouseforcedown",u=>{u.preventDefault()}),r.addEventListener("click",()=>{const{title:u,actions:o}=io(e,()=>{qr.pendingRelease=void 0,r.remove()}),[a,...c]=o,i=r.getBoundingClientRect(),s={x:i.left,y:i.bottom+10};H.MarkEdit.showContextMenu([{title:u},a,{separator:!0},...c],s)}),document.body.appendChild(r),r}async function o0(e){const{title:n,actions:r}=io(e),u=await H.MarkEdit.showAlert({title:n,message:e.body,buttons:r.map(o=>o.title)});r[u]?.action?.()}function io(e,n=()=>{}){const r=`MarkEdit-preview ${e.name} ${V("newVersionAvailable")}`,u=[...Hr()?[{title:V("updateAndRelaunch"),action:async()=>{await ou(e.tag_name)?H.MarkEdit.relaunchApp():H.MarkEdit.showAlert(V("failedToUpdate")),n()}}]:[],{title:V("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:V("remindMeLater"),action:n},{title:V("skipThisVersion"),action:()=>{const o=ao();o.add(e.name),localStorage.setItem(un.skippedCacheKey,JSON.stringify([...o])),n()}}];return{title:r,actions:u}}function ao(){const e=localStorage.getItem(un.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const un={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},qr={pendingRelease:void 0},Br="markedit-preview",Bu=`${Br}.js`;function i0(e){const{destExists:n,bundleInfo:r,currentVersion:u}=e,o=r?.version===u,a=r?.fullBuild===!1;return!(n&&o&&a)}async function a0(){try{const e=H.MarkEdit.getDirectoryPath("documents"),n=H.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const r=typeof __FILE_PATH__=="string"?__FILE_PATH__:Ye(e,`scripts/${Bu}`);if(await H.MarkEdit.getFileInfo(r)===void 0){console.error(`Source file not found at ${r}`);return}const o=r.split("/").pop()??Bu,a=Ye(n,"Shared/scripts"),c=Ye(a,o),i=await H.MarkEdit.getFileInfo(c)!==void 0,s=Ye(n,"Shared/metadata.json"),f=await vo(s),b=f[Br];if(!i0({destExists:i,bundleInfo:b,currentVersion:"1.8.1"}))return;const l=await H.MarkEdit.getFileContent(r);if(l===void 0){console.error(`Failed to read content from ${r}`);return}await H.MarkEdit.createFile({path:a,isDirectory:!0}),await H.MarkEdit.createFile({path:c,string:l,overwrites:!0}),await H.MarkEdit.createFile({path:s,string:JSON.stringify({...f,[Br]:{version:"1.8.1",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const c0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',l0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function s0(){const e=ju(V("source"),c0),n=ju(V("preview"),l0),r=document.createElement("div");r.className="quicklook-segmented",r.setAttribute("role","tablist"),r.append(e,n);const u=document.createElement("div");return u.className="quicklook-toolbar",u.appendChild(r),{toolbar:u,sourceButton:e,previewButton:n}}function ju(e,n){const r=document.createElement("button");r.title=e,r.type="button",r.className="quicklook-segment",r.setAttribute("role","tab"),r.setAttribute("aria-label",e);const u=document.createElement("span");u.textContent=e,u.className="quicklook-segment-label";const o=document.createElement("span");return o.innerHTML=n,o.className="quicklook-segment-icon",r.append(u,o),r}function Ze(){if(We!==void 0)return We;try{We=localStorage.getItem(co)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),We="source"}return We}function Hu(e){We=e;try{localStorage.setItem(co,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let We;const co="ui.quicklook-mode";function d0(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function f0(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function h0(e,n){const r=window,u=r.pinchZoomTarget;r.pinchZoomTarget=()=>{if(e()!=="preview")return u?.()??null;const o=n.querySelector(".quicklook-content");return o!==null?{scroller:n,inner:o}:null};for(const o of["gesturechange","gestureend"])document.addEventListener(o,()=>{if(e()!=="preview")return;const a=n.querySelector(".quicklook-content");a?.style.zoom.length?a?.style.setProperty("--quicklook-zoom",a.style.zoom):a?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function p0(e,n){let r;const u=window,o={start:u.startDragging,update:u.updateDragging,cancel:u.cancelDragging},a=()=>{const i=n.clientHeight,s=n.scrollHeight,f=s-i;if(f<=0||s<=0)return{clientHeight:i,scrollHeight:s,scrollbarHeight:i,scrollbarTop:0};const b=i*(i/s),d=n.scrollTop/f*(i-b);return{clientHeight:i,scrollHeight:s,scrollbarHeight:b,scrollbarTop:d}},c=(i,s,f="auto")=>{const{clientHeight:b,scrollHeight:l,scrollbarHeight:d}=a(),h=b-d;if(h>0){const m=(i-s)/h;n.scrollTo({top:m*(l-b),behavior:f})}};u.startDragging=i=>{if(e()!=="preview"){o.start?.(i);return}const{scrollbarTop:s,scrollbarHeight:f}=a(),b=$u(n,i);r=b-s,(b<s||b>s+f)&&c(b,f*.5,"smooth")},u.updateDragging=i=>{if(e()!=="preview"){o.update?.(i);return}r!==void 0&&c($u(n,i),r)},u.cancelDragging=()=>{if(e()!=="preview"){o.cancel?.();return}r=void 0}}function b0(e,n,r){r.addEventListener("wheel",u=>{const o=e()==="preview"?n:document.querySelector(".cm-scroller");o!==null&&(o.scrollTop+=u.deltaY,o.scrollLeft+=u.deltaX,u.preventDefault())},{passive:!1})}function m0(e,n,r){const u=document.querySelector(".cm-scroller"),o=()=>{const c=(e()==="preview"?n:u)?.scrollTop??0;r.classList.toggle("scrolled",c>0),r.classList.toggle("scrolled-far",c>20)};return n.addEventListener("scroll",o,{passive:!0}),u?.addEventListener("scroll",o,{passive:!0}),o}function g0(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const r=getSelection(),u=r!==null&&r.rangeCount>0?r.getRangeAt(0):null,o=u!==null&&!u.collapsed&&e.contains(u.commonAncestorContainer)?u:null,a=o??(()=>{const i=document.createRange();return i.selectNodeContents(e),i})(),c=document.createElement("div");c.appendChild(a.cloneContents()),n.clipboardData?.setData("text/html",c.innerHTML),n.clipboardData?.setData("text/plain",o!==null?o.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function $u(e,n){return n-e.getBoundingClientRect().top}const k0=`body {
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
  transition: background-color 0.15s ease;
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
    top: 6px;
    right: 6px;
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
    transition: opacity 0.15s ease;
    pointer-events: none;
    z-index: -1;
  }

  .quicklook-toolbar.scrolled-far::before {
    opacity: 1;
  }

  .quicklook-segmented {
    pointer-events: auto;
    padding: 0;
    gap: 0;
    overflow: hidden;
    background: rgba(242, 242, 245, 0.85);
    backdrop-filter: saturate(180%) blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
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
`;function y0(e){pn(k0),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:r,previewButton:u}=s0();document.body.appendChild(n);const o=x0(e),a=m0(Ze,e,n),c={previewPane:e,sourceButton:r,previewButton:u,refreshSeparator:a,ensureRendered:o.ensureRendered};r.addEventListener("click",()=>{Hu("source"),Mr(c)}),u.addEventListener("click",()=>{Hu("preview"),Mr(c)}),Mr(c),setTimeout(o.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(o.invalidate(),Ze()==="preview"&&o.ensureRendered())}),f0(),h0(Ze,e),p0(Ze,e),b0(Ze,e,n),g0(e)}function Mr(e){const n=Ze()==="source",r=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",r),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(r)),e.previewPane.classList.toggle("overlay",r),e.refreshSeparator(),r&&e.ensureRendered()}function x0(e){let n=!1,r;return{ensureRendered:()=>(n||r||(r=(async()=>{try{const a=Yt(await ru(d0(),!1));e.innerHTML=`<div class="quicklook-content">${a}</div>`,e.querySelectorAll("a[href]").forEach(c=>{c.removeAttribute("href"),c.removeAttribute("target")}),Zt(()=>{}),n=!0}catch(a){throw r=void 0,a}})()),r),invalidate:()=>{n=!1,r=void 0}}}var Wn={exports:{}};var w0=Wn.exports,Uu;function v0(){return Uu||(Uu=1,(function(e,n){(function(r,u){e.exports=u()})(w0,(function(){var r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},u=function(f,b){if(!(f instanceof b))throw new TypeError("Cannot call a class as a function")},o=(function(){function f(b,l){for(var d=0;d<l.length;d++){var h=l[d];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(b,h.key,h)}}return function(b,l,d){return l&&f(b.prototype,l),d&&f(b,d),b}})(),a=Object.assign||function(f){for(var b=1;b<arguments.length;b++){var l=arguments[b];for(var d in l)Object.prototype.hasOwnProperty.call(l,d)&&(f[d]=l[d])}return f},c=(function(){function f(b){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;u(this,f),this.ctx=b,this.iframes=l,this.exclude=d,this.iframesTimeout=h}return o(f,[{key:"getContexts",value:function(){var l=void 0,d=[];return typeof this.ctx>"u"||!this.ctx?l=[]:NodeList.prototype.isPrototypeOf(this.ctx)?l=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?l=this.ctx:typeof this.ctx=="string"?l=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):l=[this.ctx],l.forEach(function(h){var m=d.filter(function(g){return g.contains(h)}).length>0;d.indexOf(h)===-1&&!m&&d.push(h)}),d}},{key:"getIframeContents",value:function(l,d){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},m=void 0;try{var g=l.contentWindow;if(m=g.document,!g||!m)throw new Error("iframe inaccessible")}catch{h()}m&&d(m)}},{key:"isIframeBlank",value:function(l){var d="about:blank",h=l.getAttribute("src").trim(),m=l.contentWindow.location.href;return m===d&&h!==d&&h}},{key:"observeIframeLoad",value:function(l,d,h){var m=this,g=!1,k=null,x=function v(){if(!g){g=!0,clearTimeout(k);try{m.isIframeBlank(l)||(l.removeEventListener("load",v),m.getIframeContents(l,d,h))}catch{h()}}};l.addEventListener("load",x),k=setTimeout(x,this.iframesTimeout)}},{key:"onIframeReady",value:function(l,d,h){try{l.contentWindow.document.readyState==="complete"?this.isIframeBlank(l)?this.observeIframeLoad(l,d,h):this.getIframeContents(l,d,h):this.observeIframeLoad(l,d,h)}catch{h()}}},{key:"waitForIframes",value:function(l,d){var h=this,m=0;this.forEachIframe(l,function(){return!0},function(g){m++,h.waitForIframes(g.querySelector("html"),function(){--m||d()})},function(g){g||d()})}},{key:"forEachIframe",value:function(l,d,h){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=l.querySelectorAll("iframe"),x=k.length,v=0;k=Array.prototype.slice.call(k);var E=function(){--x<=0&&g(v)};x||E(),k.forEach(function(A){f.matches(A,m.exclude)?E():m.onIframeReady(A,function(R){d(A)&&(v++,h(R)),E()},E)})}},{key:"createIterator",value:function(l,d,h){return document.createNodeIterator(l,d,h,!1)}},{key:"createInstanceOnIframe",value:function(l){return new f(l.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(l,d,h){var m=l.compareDocumentPosition(h),g=Node.DOCUMENT_POSITION_PRECEDING;if(m&g)if(d!==null){var k=d.compareDocumentPosition(h),x=Node.DOCUMENT_POSITION_FOLLOWING;if(k&x)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(l){var d=l.previousNode(),h=void 0;return d===null?h=l.nextNode():h=l.nextNode()&&l.nextNode(),{prevNode:d,node:h}}},{key:"checkIframeFilter",value:function(l,d,h,m){var g=!1,k=!1;return m.forEach(function(x,v){x.val===h&&(g=v,k=x.handled)}),this.compareNodeIframe(l,d,h)?(g===!1&&!k?m.push({val:h,handled:!0}):g!==!1&&!k&&(m[g].handled=!0),!0):(g===!1&&m.push({val:h,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(l,d,h,m){var g=this;l.forEach(function(k){k.handled||g.getIframeContents(k.val,function(x){g.createInstanceOnIframe(x).forEachNode(d,h,m)})})}},{key:"iterateThroughNodes",value:function(l,d,h,m,g){for(var k=this,x=this.createIterator(d,l,m),v=[],E=[],A=void 0,R=void 0,O=function(){var U=k.getIteratorNode(x);return R=U.prevNode,A=U.node,A};O();)this.iframes&&this.forEachIframe(d,function(j){return k.checkIframeFilter(A,R,j,v)},function(j){k.createInstanceOnIframe(j).forEachNode(l,function(U){return E.push(U)},m)}),E.push(A);E.forEach(function(j){h(j)}),this.iframes&&this.handleOpenIframes(v,l,h,m),g()}},{key:"forEachNode",value:function(l,d,h){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=this.getContexts(),x=k.length;x||g(),k.forEach(function(v){var E=function(){m.iterateThroughNodes(l,v,d,h,function(){--x<=0&&g()})};m.iframes?m.waitForIframes(v,E):E()})}}],[{key:"matches",value:function(l,d){var h=typeof d=="string"?[d]:d,m=l.matches||l.matchesSelector||l.msMatchesSelector||l.mozMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector;if(m){var g=!1;return h.every(function(k){return m.call(l,k)?(g=!0,!1):!0}),g}else return!1}}]),f})(),i=(function(){function f(b){u(this,f),this.ctx=b,this.ie=!1;var l=window.navigator.userAgent;(l.indexOf("MSIE")>-1||l.indexOf("Trident")>-1)&&(this.ie=!0)}return o(f,[{key:"log",value:function(l){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",h=this.opt.log;this.opt.debug&&(typeof h>"u"?"undefined":r(h))==="object"&&typeof h[d]=="function"&&h[d]("mark.js: "+l)}},{key:"escapeStr",value:function(l){return l.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(l){return this.opt.wildcards!=="disabled"&&(l=this.setupWildcardsRegExp(l)),l=this.escapeStr(l),Object.keys(this.opt.synonyms).length&&(l=this.createSynonymsRegExp(l)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),this.opt.diacritics&&(l=this.createDiacriticsRegExp(l)),l=this.createMergedBlanksRegExp(l),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.createJoinersRegExp(l)),this.opt.wildcards!=="disabled"&&(l=this.createWildcardsRegExp(l)),l=this.createAccuracyRegExp(l),l}},{key:"createSynonymsRegExp",value:function(l){var d=this.opt.synonyms,h=this.opt.caseSensitive?"":"i",m=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var g in d)if(d.hasOwnProperty(g)){var k=d[g],x=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g),v=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(k):this.escapeStr(k);x!==""&&v!==""&&(l=l.replace(new RegExp("("+this.escapeStr(x)+"|"+this.escapeStr(v)+")","gm"+h),m+("("+this.processSynomyms(x)+"|")+(this.processSynomyms(v)+")")+m))}return l}},{key:"processSynomyms",value:function(l){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),l}},{key:"setupWildcardsRegExp",value:function(l){return l=l.replace(/(?:\\)*\?/g,function(d){return d.charAt(0)==="\\"?"?":""}),l.replace(/(?:\\)*\*/g,function(d){return d.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(l){var d=this.opt.wildcards==="withSpaces";return l.replace(/\u0001/g,d?"[\\S\\s]?":"\\S?").replace(/\u0002/g,d?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(l){return l.replace(/[^(|)\\]/g,function(d,h,m){var g=m.charAt(h+1);return/[(|)\\]/.test(g)||g===""?d:d+"\0"})}},{key:"createJoinersRegExp",value:function(l){var d=[],h=this.opt.ignorePunctuation;return Array.isArray(h)&&h.length&&d.push(this.escapeStr(h.join(""))),this.opt.ignoreJoiners&&d.push("\\u00ad\\u200b\\u200c\\u200d"),d.length?l.split(/\u0000+/).join("["+d.join("")+"]*"):l}},{key:"createDiacriticsRegExp",value:function(l){var d=this.opt.caseSensitive?"":"i",h=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],m=[];return l.split("").forEach(function(g){h.every(function(k){if(k.indexOf(g)!==-1){if(m.indexOf(k)>-1)return!1;l=l.replace(new RegExp("["+k+"]","gm"+d),"["+k+"]"),m.push(k)}return!0})}),l}},{key:"createMergedBlanksRegExp",value:function(l){return l.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(l){var d=this,h="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",m=this.opt.accuracy,g=typeof m=="string"?m:m.value,k=typeof m=="string"?[]:m.limiters,x="";switch(k.forEach(function(v){x+="|"+d.escapeStr(v)}),g){case"partially":default:return"()("+l+")";case"complementary":return x="\\s"+(x||this.escapeStr(h)),"()([^"+x+"]*"+l+"[^"+x+"]*)";case"exactly":return"(^|\\s"+x+")("+l+")(?=$|\\s"+x+")"}}},{key:"getSeparatedKeywords",value:function(l){var d=this,h=[];return l.forEach(function(m){d.opt.separateWordSearch?m.split(" ").forEach(function(g){g.trim()&&h.indexOf(g)===-1&&h.push(g)}):m.trim()&&h.indexOf(m)===-1&&h.push(m)}),{keywords:h.sort(function(m,g){return g.length-m.length}),length:h.length}}},{key:"isNumeric",value:function(l){return Number(parseFloat(l))==l}},{key:"checkRanges",value:function(l){var d=this;if(!Array.isArray(l)||Object.prototype.toString.call(l[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(l),[];var h=[],m=0;return l.sort(function(g,k){return g.start-k.start}).forEach(function(g){var k=d.callNoMatchOnInvalidRanges(g,m),x=k.start,v=k.end,E=k.valid;E&&(g.start=x,g.length=v-x,h.push(g),m=v)}),h}},{key:"callNoMatchOnInvalidRanges",value:function(l,d){var h=void 0,m=void 0,g=!1;return l&&typeof l.start<"u"?(h=parseInt(l.start,10),m=h+parseInt(l.length,10),this.isNumeric(l.start)&&this.isNumeric(l.length)&&m-d>0&&m-h>0?g=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(l))),this.opt.noMatch(l))):(this.log("Ignoring invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:h,end:m,valid:g}}},{key:"checkWhitespaceRanges",value:function(l,d,h){var m=void 0,g=!0,k=h.length,x=d-k,v=parseInt(l.start,10)-x;return v=v>k?k:v,m=v+parseInt(l.length,10),m>k&&(m=k,this.log("End range automatically set to the max value of "+k)),v<0||m-v<0||v>k||m>k?(g=!1,this.log("Invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)):h.substring(v,m).replace(/\s+/g,"")===""&&(g=!1,this.log("Skipping whitespace only range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:v,end:m,valid:g}}},{key:"getTextNodes",value:function(l){var d=this,h="",m=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(g){m.push({start:h.length,end:(h+=g.textContent).length,node:g})},function(g){return d.matchesExclude(g.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){l({value:h,nodes:m})})}},{key:"matchesExclude",value:function(l){return c.matches(l,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(l,d,h){var m=this.opt.element?this.opt.element:"mark",g=l.splitText(d),k=g.splitText(h-d),x=document.createElement(m);return x.setAttribute("data-markjs","true"),this.opt.className&&x.setAttribute("class",this.opt.className),x.textContent=g.textContent,g.parentNode.replaceChild(x,g),k}},{key:"wrapRangeInMappedTextNode",value:function(l,d,h,m,g){var k=this;l.nodes.every(function(x,v){var E=l.nodes[v+1];if(typeof E>"u"||E.start>d){if(!m(x.node))return!1;var A=d-x.start,R=(h>x.end?x.end:h)-x.start,O=l.value.substr(0,x.start),j=l.value.substr(R+x.start);if(x.node=k.wrapRangeInTextNode(x.node,A,R),l.value=O+j,l.nodes.forEach(function(U,J){J>=v&&(l.nodes[J].start>0&&J!==v&&(l.nodes[J].start-=R),l.nodes[J].end-=R)}),h-=R,g(x.node.previousSibling,x.start),h>x.end)d=x.end;else return!1}return!0})}},{key:"wrapMatches",value:function(l,d,h,m,g){var k=this,x=d===0?0:d+1;this.getTextNodes(function(v){v.nodes.forEach(function(E){E=E.node;for(var A=void 0;(A=l.exec(E.textContent))!==null&&A[x]!=="";)if(h(A[x],E)){var R=A.index;if(x!==0)for(var O=1;O<x;O++)R+=A[O].length;E=k.wrapRangeInTextNode(E,R,R+A[x].length),m(E.previousSibling),l.lastIndex=0}}),g()})}},{key:"wrapMatchesAcrossElements",value:function(l,d,h,m,g){var k=this,x=d===0?0:d+1;this.getTextNodes(function(v){for(var E=void 0;(E=l.exec(v.value))!==null&&E[x]!=="";){var A=E.index;if(x!==0)for(var R=1;R<x;R++)A+=E[R].length;var O=A+E[x].length;k.wrapRangeInMappedTextNode(v,A,O,function(j){return h(E[x],j)},function(j,U){l.lastIndex=U,m(j)})}g()})}},{key:"wrapRangeFromIndex",value:function(l,d,h,m){var g=this;this.getTextNodes(function(k){var x=k.value.length;l.forEach(function(v,E){var A=g.checkWhitespaceRanges(v,x,k.value),R=A.start,O=A.end,j=A.valid;j&&g.wrapRangeInMappedTextNode(k,R,O,function(U){return d(U,v,k.value.substring(R,O),E)},function(U){h(U,v)})}),m()})}},{key:"unwrapMatches",value:function(l){for(var d=l.parentNode,h=document.createDocumentFragment();l.firstChild;)h.appendChild(l.removeChild(l.firstChild));d.replaceChild(h,l),this.ie?this.normalizeTextNode(d):d.normalize()}},{key:"normalizeTextNode",value:function(l){if(l){if(l.nodeType===3)for(;l.nextSibling&&l.nextSibling.nodeType===3;)l.nodeValue+=l.nextSibling.nodeValue,l.parentNode.removeChild(l.nextSibling);else this.normalizeTextNode(l.firstChild);this.normalizeTextNode(l.nextSibling)}}},{key:"markRegExp",value:function(l,d){var h=this;this.opt=d,this.log('Searching with expression "'+l+'"');var m=0,g="wrapMatches",k=function(v){m++,h.opt.each(v)};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),this[g](l,this.opt.ignoreGroups,function(x,v){return h.opt.filter(v,x,m)},k,function(){m===0&&h.opt.noMatch(l),h.opt.done(m)})}},{key:"mark",value:function(l,d){var h=this;this.opt=d;var m=0,g="wrapMatches",k=this.getSeparatedKeywords(typeof l=="string"?[l]:l),x=k.keywords,v=k.length,E=this.opt.caseSensitive?"":"i",A=function R(O){var j=new RegExp(h.createRegExp(O),"gm"+E),U=0;h.log('Searching with expression "'+j+'"'),h[g](j,1,function(J,ae){return h.opt.filter(ae,O,m,U)},function(J){U++,m++,h.opt.each(J)},function(){U===0&&h.opt.noMatch(O),x[v-1]===O?h.opt.done(m):R(x[x.indexOf(O)+1])})};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),v===0?this.opt.done(m):A(x[0])}},{key:"markRanges",value:function(l,d){var h=this;this.opt=d;var m=0,g=this.checkRanges(l);g&&g.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(g)),this.wrapRangeFromIndex(g,function(k,x,v,E){return h.opt.filter(k,x,v,E)},function(k,x){m++,h.opt.each(k,x)},function(){h.opt.done(m)})):this.opt.done(m)}},{key:"unmark",value:function(l){var d=this;this.opt=l;var h=this.opt.element?this.opt.element:"*";h+="[data-markjs]",this.opt.className&&(h+="."+this.opt.className),this.log('Removal selector "'+h+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(m){d.unwrapMatches(m)},function(m){var g=c.matches(m,h),k=d.matchesExclude(m);return!g||k?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(l){this._opt=a({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},l)},get:function(){return this._opt}},{key:"iterator",get:function(){return new c(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),f})();function s(f){var b=this,l=new i(f);return this.mark=function(d,h){return l.mark(d,h),b},this.markRegExp=function(d,h){return l.markRegExp(d,h),b},this.markRanges=function(d,h){return l.markRanges(d,h),b},this.unmark=function(d){return l.unmark(d),b},this}return s}))})(Wn)),Wn.exports}var C0=v0();const lo=ar(C0),kn="markedit-preview-mark",so="markedit-preview-mark-highlighted";let hn=!1,iu,De=0,he=[],yn=null,Vn=null;const Gu={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function _0(e){if(iu=e,De=0,e.search.length===0){fo();return}const n=In();ho(n),D0(n)}function E0(e){he.length!==0&&(De=e%he.length,po())}function fo(){yn?.disconnect(),yn=null,iu=void 0,De=0,he=[],new lo(In()).unmark()}function A0(){if(de()===be.preview)return{numberOfItems:he.length,currentIndex:De}}function ho(e){const n=iu;if(n===void 0||n.search.length===0||hn)return;S0(),hn=!0;const{search:r,caseSensitive:u,wholeWord:o,diacriticInsensitive:a,regexp:c}=n,i=new lo(e),s=()=>{he=Array.from(e.querySelectorAll(`.${kn}`)),De=he.length>0?Math.min(De,he.length-1):0,po(),hn=!1};i.unmark({done:()=>{if(c)try{const f=u?"":"i";i.markRegExp(new RegExp(r,f),{className:kn,done:s})}catch{hn=!1,De=0,he=[]}else i.mark(r,{className:kn,caseSensitive:u,diacritics:a,separateWordSearch:!1,accuracy:o?"exactly":"partially",done:s})}})}function po(){const e=de()!==be.sideBySide;he.forEach((n,r)=>{n.classList.toggle(so,e&&r===De)}),e&&he.length>0&&he[De].scrollIntoView({behavior:"smooth",block:"center"})}function D0(e){yn?.disconnect(),yn=new MutationObserver(()=>{hn||ho(e)}),yn.observe(e,{childList:!0})}function S0(){Vn===null&&(Vn=document.createElement("style"),document.head.appendChild(Vn));const{light:e,dark:n}=Gu[cr]??Gu.github;Vn.textContent=[`.${kn} { background: ${e} !important; color: inherit !important; }`,`.${so} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${kn} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(Zl(),nu()?(typeof H.MarkEdit.onAppReady=="function"?H.MarkEdit.onAppReady(()=>{a0(),setTimeout(()=>{Pr()},2e3)}):setTimeout(()=>{t0()},4e3),(bn==="automatic"||bn==="quiet")&&setInterval(()=>{Pr()},6048e5)):y0(In()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=ro;window.MarkEditRenderHtml??=n0;window.__markeditPreviewSPI__={performSearch:_0,setSearchMatchIndex:E0,clearSearch:fo,searchCounterInfo:A0};nu()&&(H.MarkEdit.addMainMenuItem({title:V("viewMode"),icon:go()?"eye":void 0,children:[{title:V("changeMode"),action:()=>{Wl(),jr()},key:Lu.key??"V",modifiers:Lu.modifiers??["Command"]},{separator:!0},Ir(V("editMode"),be.edit),Ir(V("sideBySideMode"),be.sideBySide),Ir(V("previewMode"),be.preview),{separator:!0},...F0(),{separator:!0},{title:`${V("version")} 1.8.1`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.8.1")},{title:`${V("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...Hr()?[{title:V("updateAndRelaunch"),action:async()=>{const e=await to();await ou(e.tag_name)?H.MarkEdit.relaunchApp():H.MarkEdit.showAlert(V("failedToUpdate"))}}]:[]]}),H.MarkEdit.addExtension(bo.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(eo))||(ze.renderUpdater!==void 0&&clearTimeout(ze.renderUpdater),ze.renderUpdater=setTimeout(er,500)))})),H.MarkEdit.onEditorReady(()=>{Yc&&Tl(H.MarkEdit.editorView.scrollDOM),Yl(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&de()===be.preview&&typeof H.MarkEdit.getFileInfo=="function"&&(await H.MarkEdit.getFileInfo())?.filePath===void 0&&H.MarkEdit.editorAPI.getText().length===0&&sr(be.edit,!1)}),er(),jr(),Il(no(),In()),ze.keyDownListener!==void 0&&document.removeEventListener("keydown",ze.keyDownListener),ze.keyDownListener=e=>Kl(e),document.addEventListener("keydown",ze.keyDownListener)}));function Ir(e,n){return{title:e,action:()=>{sr(n),jr()},state:()=>({isSelected:de()===n})}}function F0(){const e=[{title:V("copyHtml"),action:Xl},{title:V("copyRichText"),action:e0}];return typeof H.MarkEdit.showSavePanel>"u"?e:[{title:V("saveCleanHtml"),action:Jl},{title:V("saveStyledHtml"),action:Ql},...e]}function jr(){const e=oo();e!==void 0&&(e.style.display=de()===be.edit?"none":"")}const ze={renderUpdater:void 0,keyDownListener:void 0};
