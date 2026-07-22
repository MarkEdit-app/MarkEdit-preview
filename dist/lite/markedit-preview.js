"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=u=>n[u]??{}}})();const ii=require("@codemirror/view"),H=require("markedit-api"),ai=require("@codemirror/state");function ci(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function st(){return typeof __FILE_PATH__=="string"}function pn(e,n=!0){const u=document.createElement("style");return u.textContent=e,document.head.appendChild(u),u.disabled=!n,u}function Tt(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function li(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function si(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function Qe(e){const n=parseInt(e.dataset.lineFrom??"0"),u=parseInt(e.dataset.lineTo??"0");return{from:n,to:u}}function nt(e,n){let u=0,t=n;for(;t!==null&&t!==e;)u+=t.offsetTop,t=t.offsetParent;return u}function ku(e,n,u,t=!0){const r=nt(e,n)+n.offsetHeight*u;Zn(e,r,t)}function Zn(e,n,u=!0){const t=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=t?0:n,behavior:u?"smooth":"instant"})}function di(e){const n=document.createRange();n.selectNodeContents(e);const u=getSelection();u?.removeAllRanges(),u?.addRange(n)}function fi(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function Ke(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function hi(e){const n=await H.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const u=JSON.parse(n);return typeof u=="object"&&u!==null?u:{}}catch(u){return console.error(`Failed to parse JSON from ${e}:`,u),{}}}const Mt={};function pi(e){let n=Mt[e];if(n)return n;n=Mt[e]=[];for(let u=0;u<128;u++){const t=String.fromCharCode(u);n.push(t)}for(let u=0;u<e.length;u++){const t=e.charCodeAt(u);n[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return n}function en(e,n){typeof n!="string"&&(n=en.defaultChars);const u=pi(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let i=0,c=t.length;i<c;i+=3){const a=parseInt(t.slice(i+1,i+3),16);if(a<128){r+=u[a];continue}if((a&224)===192&&i+3<c){const s=parseInt(t.slice(i+4,i+6),16);if((s&192)===128){const d=a<<6&1984|s&63;d<128?r+="��":r+=String.fromCharCode(d),i+=3;continue}}if((a&240)===224&&i+6<c){const s=parseInt(t.slice(i+4,i+6),16),d=parseInt(t.slice(i+7,i+9),16);if((s&192)===128&&(d&192)===128){const f=a<<12&61440|s<<6&4032|d&63;f<2048||f>=55296&&f<=57343?r+="���":r+=String.fromCharCode(f),i+=6;continue}}if((a&248)===240&&i+9<c){const s=parseInt(t.slice(i+4,i+6),16),d=parseInt(t.slice(i+7,i+9),16),f=parseInt(t.slice(i+10,i+12),16);if((s&192)===128&&(d&192)===128&&(f&192)===128){let l=a<<18&1835008|s<<12&258048|d<<6&4032|f&63;l<65536||l>1114111?r+="����":(l-=65536,r+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),i+=9;continue}}r+="�"}return r})}en.defaultChars=";/?:@&=+$,#";en.componentChars="";const It={};function bi(e){let n=It[e];if(n)return n;n=It[e]=[];for(let u=0;u<128;u++){const t=String.fromCharCode(u);/^[0-9a-z]$/i.test(t)?n.push(t):n.push("%"+("0"+u.toString(16).toUpperCase()).slice(-2))}for(let u=0;u<e.length;u++)n[e.charCodeAt(u)]=e[u];return n}function En(e,n,u){typeof n!="string"&&(u=n,n=En.defaultChars),typeof u>"u"&&(u=!0);const t=bi(n);let r="";for(let i=0,c=e.length;i<c;i++){const a=e.charCodeAt(i);if(u&&a===37&&i+2<c&&/^[0-9a-f]{2}$/i.test(e.slice(i+1,i+3))){r+=e.slice(i,i+3),i+=2;continue}if(a<128){r+=t[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&i+1<c){const s=e.charCodeAt(i+1);if(s>=56320&&s<=57343){r+=encodeURIComponent(e[i]+e[i+1]),i++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[i])}return r}En.defaultChars=";/?:@&=+$,-_.!~*'()#";En.componentChars="-_.!~*'()";function dt(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function Yn(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const mi=/^([a-z0-9.+-]+:)/i,gi=/:[0-9]*$/,ki=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,yi=["<",">",'"',"`"," ","\r",`
`,"	"],xi=["{","}","|","\\","^","`"].concat(yi),wi=["'"].concat(xi),Rt=["%","/","?",";","#"].concat(wi),Lt=["/","?","#"],vi=255,Ot=/^[+a-z0-9A-Z_-]{0,63}$/,Ci=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Nt={javascript:!0,"javascript:":!0},zt={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function ft(e,n){if(e&&e instanceof Yn)return e;const u=new Yn;return u.parse(e,n),u}Yn.prototype.parse=function(e,n){let u,t,r,i=e;if(i=i.trim(),!n&&e.split("#").length===1){const d=ki.exec(i);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let c=mi.exec(i);if(c&&(c=c[0],u=c.toLowerCase(),this.protocol=c,i=i.substr(c.length)),(n||c||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=i.substr(0,2)==="//",r&&!(c&&Nt[c])&&(i=i.substr(2),this.slashes=!0)),!Nt[c]&&(r||c&&!zt[c])){let d=-1;for(let m=0;m<Lt.length;m++)t=i.indexOf(Lt[m]),t!==-1&&(d===-1||t<d)&&(d=t);let f,l;d===-1?l=i.lastIndexOf("@"):l=i.lastIndexOf("@",d),l!==-1&&(f=i.slice(0,l),i=i.slice(l+1),this.auth=f),d=-1;for(let m=0;m<Rt.length;m++)t=i.indexOf(Rt[m]),t!==-1&&(d===-1||t<d)&&(d=t);d===-1&&(d=i.length),i[d-1]===":"&&d--;const b=i.slice(0,d);i=i.slice(d),this.parseHost(b),this.hostname=this.hostname||"";const p=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!p){const m=this.hostname.split(/\./);for(let g=0,k=m.length;g<k;g++){const v=m[g];if(v&&!v.match(Ot)){let w="";for(let _=0,A=v.length;_<A;_++)v.charCodeAt(_)>127?w+="x":w+=v[_];if(!w.match(Ot)){const _=m.slice(0,g),A=m.slice(g+1),L=v.match(Ci);L&&(_.push(L[1]),A.unshift(L[2])),A.length&&(i=A.join(".")+i),this.hostname=_.join(".");break}}}}this.hostname.length>vi&&(this.hostname=""),p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=i.indexOf("#");a!==-1&&(this.hash=i.substr(a),i=i.slice(0,a));const s=i.indexOf("?");return s!==-1&&(this.search=i.substr(s),i=i.slice(0,s)),i&&(this.pathname=i),zt[u]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Yn.prototype.parseHost=function(e){let n=gi.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const _i=Object.freeze(Object.defineProperty({__proto__:null,decode:en,encode:En,format:dt,parse:ft},Symbol.toStringTag,{value:"Module"})),Pr=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Br=/[\0-\x1F\x7F-\x9F]/,Ei=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,ht=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,jr=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Hr=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Ai=Object.freeze(Object.defineProperty({__proto__:null,Any:Pr,Cc:Br,Cf:Ei,P:ht,S:jr,Z:Hr},Symbol.toStringTag,{value:"Module"})),Di=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Si=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var yu;const Fi=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ti=(yu=String.fromCodePoint)!==null&&yu!==void 0?yu:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Mi(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Fi.get(e))!==null&&n!==void 0?n:e}var ee;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ee||(ee={}));const Ii=32;var Me;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Me||(Me={}));function ut(e){return e>=ee.ZERO&&e<=ee.NINE}function Ri(e){return e>=ee.UPPER_A&&e<=ee.UPPER_F||e>=ee.LOWER_A&&e<=ee.LOWER_F}function Li(e){return e>=ee.UPPER_A&&e<=ee.UPPER_Z||e>=ee.LOWER_A&&e<=ee.LOWER_Z||ut(e)}function Oi(e){return e===ee.EQUALS||Li(e)}var X;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(X||(X={}));var Ae;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Ae||(Ae={}));class Ni{constructor(n,u,t){this.decodeTree=n,this.emitCodePoint=u,this.errors=t,this.state=X.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Ae.Strict}startEntity(n){this.decodeMode=n,this.state=X.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,u){switch(this.state){case X.EntityStart:return n.charCodeAt(u)===ee.NUM?(this.state=X.NumericStart,this.consumed+=1,this.stateNumericStart(n,u+1)):(this.state=X.NamedEntity,this.stateNamedEntity(n,u));case X.NumericStart:return this.stateNumericStart(n,u);case X.NumericDecimal:return this.stateNumericDecimal(n,u);case X.NumericHex:return this.stateNumericHex(n,u);case X.NamedEntity:return this.stateNamedEntity(n,u)}}stateNumericStart(n,u){return u>=n.length?-1:(n.charCodeAt(u)|Ii)===ee.LOWER_X?(this.state=X.NumericHex,this.consumed+=1,this.stateNumericHex(n,u+1)):(this.state=X.NumericDecimal,this.stateNumericDecimal(n,u))}addToNumericResult(n,u,t,r){if(u!==t){const i=t-u;this.result=this.result*Math.pow(r,i)+parseInt(n.substr(u,i),r),this.consumed+=i}}stateNumericHex(n,u){const t=u;for(;u<n.length;){const r=n.charCodeAt(u);if(ut(r)||Ri(r))u+=1;else return this.addToNumericResult(n,t,u,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(n,t,u,16),-1}stateNumericDecimal(n,u){const t=u;for(;u<n.length;){const r=n.charCodeAt(u);if(ut(r))u+=1;else return this.addToNumericResult(n,t,u,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(n,t,u,10),-1}emitNumericEntity(n,u){var t;if(this.consumed<=u)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===ee.SEMI)this.consumed+=1;else if(this.decodeMode===Ae.Strict)return 0;return this.emitCodePoint(Mi(this.result),this.consumed),this.errors&&(n!==ee.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,u){const{decodeTree:t}=this;let r=t[this.treeIndex],i=(r&Me.VALUE_LENGTH)>>14;for(;u<n.length;u++,this.excess++){const c=n.charCodeAt(u);if(this.treeIndex=zi(t,r,this.treeIndex+Math.max(1,i),c),this.treeIndex<0)return this.result===0||this.decodeMode===Ae.Attribute&&(i===0||Oi(c))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],i=(r&Me.VALUE_LENGTH)>>14,i!==0){if(c===ee.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==Ae.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:u,decodeTree:t}=this,r=(t[u]&Me.VALUE_LENGTH)>>14;return this.emitNamedEntityData(u,r,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,u,t){const{decodeTree:r}=this;return this.emitCodePoint(u===1?r[n]&~Me.VALUE_LENGTH:r[n+1],t),u===3&&this.emitCodePoint(r[n+2],t),t}end(){var n;switch(this.state){case X.NamedEntity:return this.result!==0&&(this.decodeMode!==Ae.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case X.NumericDecimal:return this.emitNumericEntity(0,2);case X.NumericHex:return this.emitNumericEntity(0,3);case X.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case X.EntityStart:return 0}}}function $r(e){let n="";const u=new Ni(e,t=>n+=Ti(t));return function(r,i){let c=0,a=0;for(;(a=r.indexOf("&",a))>=0;){n+=r.slice(c,a),u.startEntity(i);const d=u.write(r,a+1);if(d<0){c=a+u.end();break}c=a+d,a=d===0?c+1:c}const s=n+r.slice(c);return n="",s}}function zi(e,n,u,t){const r=(n&Me.BRANCH_LENGTH)>>7,i=n&Me.JUMP_TABLE;if(r===0)return i!==0&&t===i?u:-1;if(i){const s=t-i;return s<0||s>=r?-1:e[u+s]-1}let c=u,a=c+r-1;for(;c<=a;){const s=c+a>>>1,d=e[s];if(d<t)c=s+1;else if(d>t)a=s-1;else return e[s+r]}return-1}const Ur=$r(Di);$r(Si);function qi(e,n=Ae.Legacy){return Ur(e,n)}function Pi(e){return Ur(e,Ae.Strict)}function Bi(e){return Object.prototype.toString.call(e)}function pt(e){return Bi(e)==="[object String]"}const ji=Object.prototype.hasOwnProperty;function Hi(e,n){return ji.call(e,n)}function nu(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){if(u){if(typeof u!="object")throw new TypeError(u+"must be object");Object.keys(u).forEach(function(t){e[t]=u[t]})}}),e}function Gr(e,n,u){return[].concat(e.slice(0,n),u,e.slice(n+1))}function bt(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function xn(e){if(e>65535){e-=65536;const n=55296+(e>>10),u=56320+(e&1023);return String.fromCharCode(n,u)}return String.fromCharCode(e)}const Vr=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,$i=/&([a-z#][a-z0-9]{1,31});/gi,Ui=new RegExp(Vr.source+"|"+$i.source,"gi"),Gi=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Vi(e,n){if(n.charCodeAt(0)===35&&Gi.test(n)){const t=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return bt(t)?xn(t):e}const u=qi(e);return u!==e?u:e}function Zi(e){return e.indexOf("\\")<0?e:e.replace(Vr,"$1")}function nn(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Ui,function(n,u,t){return u||Vi(n,t)})}const Wi=/[&<>"]/,Yi=/[&<>"]/g,Ki={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Ji(e){return Ki[e]}function Re(e){return Wi.test(e)?e.replace(Yi,Ji):e}const Qi=/[.?*+^$[\]\\(){}|-]/g;function Xi(e){return e.replace(Qi,"\\$&")}function G(e){switch(e){case 9:case 32:return!0}return!1}function wn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Zr(e){return ht.test(e)||jr.test(e)}function vn(e){return Zr(xn(e))}function Cn(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function uu(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function qt(e){return e===32||e===9||e===10||e===13}function tu(e){let n=0;for(;n<e.length&&qt(e.charCodeAt(n));n++);let u=e.length-1;for(;u>=n&&qt(e.charCodeAt(u));u--);return e.slice(n,u+1)}const ea={mdurl:_i,ucmicro:Ai},na=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Gr,asciiTrim:tu,assign:nu,escapeHtml:Re,escapeRE:Xi,fromCodePoint:xn,has:Hi,isMdAsciiPunct:Cn,isPunctChar:Zr,isPunctCharCode:vn,isSpace:G,isString:pt,isValidEntityCode:bt,isWhiteSpace:wn,lib:ea,normalizeReference:uu,unescapeAll:nn,unescapeMd:Zi},Symbol.toStringTag,{value:"Module"}));function ua(e,n,u){let t,r,i,c;const a=e.posMax,s=e.pos;for(e.pos=n+1,t=1;e.pos<a;){if(i=e.src.charCodeAt(e.pos),i===93&&(t--,t===0)){r=!0;break}if(c=e.pos,e.md.inline.skipToken(e),i===91){if(c===e.pos-1)t++;else if(u)return e.pos=s,-1}}let d=-1;return r&&(d=e.pos),e.pos=s,d}function ta(e,n,u){let t,r=n;const i={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<u;){if(t=e.charCodeAt(r),t===10||t===60)return i;if(t===62)return i.pos=r+1,i.str=nn(e.slice(n+1,r)),i.ok=!0,i;if(t===92&&r+1<u){r+=2;continue}r++}return i}let c=0;for(;r<u&&(t=e.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<u){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(c++,c>32))return i;if(t===41){if(c===0)break;c--}r++}return n===r||c!==0||(i.str=nn(e.slice(n,r)),i.pos=r,i.ok=!0),i}function ra(e,n,u,t){let r,i=n;const c={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)c.str=t.str,c.marker=t.marker;else{if(i>=u)return c;let a=e.charCodeAt(i);if(a!==34&&a!==39&&a!==40)return c;n++,i++,a===40&&(a=41),c.marker=a}for(;i<u;){if(r=e.charCodeAt(i),r===c.marker)return c.pos=i+1,c.str+=nn(e.slice(n,i)),c.ok=!0,c;if(r===40&&c.marker===41)return c;r===92&&i+1<u&&i++,i++}return c.can_continue=!0,c.str+=nn(e.slice(n,i)),c}const oa=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:ta,parseLinkLabel:ua,parseLinkTitle:ra},Symbol.toStringTag,{value:"Module"})),ke={};ke.code_inline=function(e,n,u,t,r){const i=e[n];return"<code"+r.renderAttrs(i)+">"+Re(i.content)+"</code>"};ke.code_block=function(e,n,u,t,r){const i=e[n];return"<pre"+r.renderAttrs(i)+"><code>"+Re(e[n].content)+`</code></pre>
`};ke.fence=function(e,n,u,t,r){const i=e[n],c=i.info?nn(i.info).trim():"";let a="",s="";if(c){const f=c.split(/(\s+)/g);a=f[0],s=f.slice(2).join("")}let d;if(u.highlight?d=u.highlight(i.content,a,s)||Re(i.content):d=Re(i.content),d.indexOf("<pre")===0)return d+`
`;if(c){const f=i.attrIndex("class"),l=i.attrs?i.attrs.slice():[];f<0?l.push(["class",u.langPrefix+a]):(l[f]=l[f].slice(),l[f][1]+=" "+u.langPrefix+a);const b={attrs:l};return`<pre><code${r.renderAttrs(b)}>${d}</code></pre>
`}return`<pre><code${r.renderAttrs(i)}>${d}</code></pre>
`};ke.image=function(e,n,u,t,r){const i=e[n];return i.attrs[i.attrIndex("alt")][1]=r.renderInlineAsText(i.children,u,t),r.renderToken(e,n,u)};ke.hardbreak=function(e,n,u){return u.xhtmlOut?`<br />
`:`<br>
`};ke.softbreak=function(e,n,u){return u.breaks?u.xhtmlOut?`<br />
`:`<br>
`:`
`};ke.text=function(e,n){return Re(e[n].content)};ke.html_block=function(e,n){return e[n].content};ke.html_inline=function(e,n){return e[n].content};function on(){this.rules=nu({},ke)}on.prototype.renderAttrs=function(n){let u,t,r;if(!n.attrs)return"";for(r="",u=0,t=n.attrs.length;u<t;u++)r+=" "+Re(n.attrs[u][0])+'="'+Re(n.attrs[u][1])+'"';return r};on.prototype.renderToken=function(n,u,t){const r=n[u];let i="";if(r.hidden)return"";r.block&&r.nesting!==-1&&u&&n[u-1].hidden&&(i+=`
`),i+=(r.nesting===-1?"</":"<")+r.tag,i+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(i+=" /");let c=!1;if(r.block&&(c=!0,r.nesting===1&&u+1<n.length)){const a=n[u+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===r.tag)&&(c=!1)}return i+=c?`>
`:">",i};on.prototype.renderInline=function(e,n,u){let t="";const r=this.rules;for(let i=0,c=e.length;i<c;i++){const a=e[i].type;typeof r[a]<"u"?t+=r[a](e,i,n,u,this):t+=this.renderToken(e,i,n)}return t};on.prototype.renderInlineAsText=function(e,n,u){let t="";for(let r=0,i=e.length;r<i;r++)switch(e[r].type){case"text":t+=e[r].content;break;case"image":t+=this.renderInlineAsText(e[r].children,n,u);break;case"html_inline":case"html_block":t+=e[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t};on.prototype.render=function(e,n,u){let t="";const r=this.rules;for(let i=0,c=e.length;i<c;i++){const a=e[i].type;a==="inline"?t+=this.renderInline(e[i].children,n,u):typeof r[a]<"u"?t+=r[a](e,i,n,u,this):t+=this.renderToken(e,i,n,u)}return t};function re(){this.__rules__=[],this.__cache__=null}re.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};re.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(u){u.enabled&&u.alt.forEach(function(t){n.indexOf(t)<0&&n.push(t)})}),e.__cache__={},n.forEach(function(u){e.__cache__[u]=[],e.__rules__.forEach(function(t){t.enabled&&(u&&t.alt.indexOf(u)<0||e.__cache__[u].push(t.fn))})})};re.prototype.at=function(e,n,u){const t=this.__find__(e),r=u||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__[t].fn=n,this.__rules__[t].alt=r.alt||[],this.__cache__=null};re.prototype.before=function(e,n,u,t){const r=this.__find__(e),i=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:n,enabled:!0,fn:u,alt:i.alt||[]}),this.__cache__=null};re.prototype.after=function(e,n,u,t){const r=this.__find__(e),i=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:n,enabled:!0,fn:u,alt:i.alt||[]}),this.__cache__=null};re.prototype.push=function(e,n,u){const t=u||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:t.alt||[]}),this.__cache__=null};re.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,u.push(t)},this),this.__cache__=null,u};re.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(u){u.enabled=!1}),this.enable(e,n)};re.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,u.push(t)},this),this.__cache__=null,u};re.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function pe(e,n,u){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=u,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}pe.prototype.attrIndex=function(n){if(!this.attrs)return-1;const u=this.attrs;for(let t=0,r=u.length;t<r;t++)if(u[t][0]===n)return t;return-1};pe.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};pe.prototype.attrSet=function(n,u){const t=this.attrIndex(n),r=[n,u];t<0?this.attrPush(r):this.attrs[t]=r};pe.prototype.attrGet=function(n){const u=this.attrIndex(n);let t=null;return u>=0&&(t=this.attrs[u][1]),t};pe.prototype.attrJoin=function(n,u){const t=this.attrIndex(n);t<0?this.attrPush([n,u]):this.attrs[t][1]=this.attrs[t][1]+" "+u};function Wr(e,n,u){this.src=e,this.env=u,this.tokens=[],this.inlineMode=!1,this.md=n}Wr.prototype.Token=pe;const ia=/\r\n?|\n/g,aa=/\0/g;function ca(e){let n;n=e.src.replace(ia,`
`),n=n.replace(aa,"�"),e.src=n}function la(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function sa(e){const n=e.tokens;for(let u=0,t=n.length;u<t;u++){const r=n[u];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function da(e){return/^<a[>\s]/i.test(e)}function fa(e){return/^<\/a\s*>/i.test(e)}function ha(e){const n=e.tokens;if(e.md.options.linkify)for(let u=0,t=n.length;u<t;u++){if(n[u].type!=="inline"||!e.md.linkify.pretest(n[u].content))continue;let r=n[u].children,i=0;for(let c=r.length-1;c>=0;c--){const a=r[c];if(a.type==="link_close"){for(c--;r[c].level!==a.level&&r[c].type!=="link_open";)c--;continue}if(a.type==="html_inline"&&(da(a.content)&&i>0&&i--,fa(a.content)&&i++),!(i>0)&&a.type==="text"&&e.md.linkify.test(a.content)){const s=a.content;let d=e.md.linkify.match(s);const f=[];let l=a.level,b=0;d.length>0&&d[0].index===0&&c>0&&r[c-1].type==="text_special"&&(d=d.slice(1));for(let p=0;p<d.length;p++){const m=d[p].url,g=e.md.normalizeLink(m);if(!e.md.validateLink(g))continue;let k=d[p].text;d[p].schema?d[p].schema==="mailto:"&&!/^mailto:/i.test(k)?k=e.md.normalizeLinkText("mailto:"+k).replace(/^mailto:/,""):k=e.md.normalizeLinkText(k):k=e.md.normalizeLinkText("http://"+k).replace(/^http:\/\//,"");const v=d[p].index;if(v>b){const L=new e.Token("text","",0);L.content=s.slice(b,v),L.level=l,f.push(L)}const w=new e.Token("link_open","a",1);w.attrs=[["href",g]],w.level=l++,w.markup="linkify",w.info="auto",f.push(w);const _=new e.Token("text","",0);_.content=k,_.level=l,f.push(_);const A=new e.Token("link_close","a",-1);A.level=--l,A.markup="linkify",A.info="auto",f.push(A),b=d[p].lastIndex}if(b<s.length){const p=new e.Token("text","",0);p.content=s.slice(b),p.level=l,f.push(p)}n[u].children=r=Gr(r,c,f)}}}}const Yr=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,pa=/\((c|tm|r)\)/i,ba=/\((c|tm|r)\)/ig,ma={c:"©",r:"®",tm:"™"};function ga(e,n){return ma[n.toLowerCase()]}function ka(e){let n=0;for(let u=e.length-1;u>=0;u--){const t=e[u];t.type==="text"&&!n&&(t.content=t.content.replace(ba,ga)),t.type==="link_open"&&t.info==="auto"&&n--,t.type==="link_close"&&t.info==="auto"&&n++}}function ya(e){let n=0;for(let u=e.length-1;u>=0;u--){const t=e[u];t.type==="text"&&!n&&Yr.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&n--,t.type==="link_close"&&t.info==="auto"&&n++}}function xa(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(pa.test(e.tokens[n].content)&&ka(e.tokens[n].children),Yr.test(e.tokens[n].content)&&ya(e.tokens[n].children))}const wa=/['"]/,Pt=/['"]/g,Bt="’";function $n(e,n,u,t){e[n]||(e[n]=[]),e[n].push({pos:u,ch:t})}function va(e,n){let u="",t=0;n.sort((r,i)=>r.pos-i.pos);for(let r=0;r<n.length;r++){const i=n[r];u+=e.slice(t,i.pos)+i.ch,t=i.pos+1}return u+e.slice(t)}function Ca(e,n){let u;const t=[],r={};for(let i=0;i<e.length;i++){const c=e[i],a=e[i].level;for(u=t.length-1;u>=0&&!(t[u].level<=a);u--);if(t.length=u+1,c.type!=="text")continue;const s=c.content;let d=0;const f=s.length;e:for(;d<f;){Pt.lastIndex=d;const l=Pt.exec(s);if(!l)break;let b=!0,p=!0;d=l.index+1;const m=l[0]==="'";let g=32;if(l.index-1>=0)g=s.charCodeAt(l.index-1);else for(u=i-1;u>=0&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u--)if(e[u].content){g=e[u].content.charCodeAt(e[u].content.length-1);break}let k=32;if(d<f)k=s.charCodeAt(d);else for(u=i+1;u<e.length&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u++)if(e[u].content){k=e[u].content.charCodeAt(0);break}const v=Cn(g)||vn(g),w=Cn(k)||vn(k),_=wn(g),A=wn(k);if(A?b=!1:w&&(_||v||(b=!1)),_?p=!1:v&&(A||w||(p=!1)),k===34&&l[0]==='"'&&g>=48&&g<=57&&(p=b=!1),b&&p&&(b=v,p=w),!b&&!p){m&&$n(r,i,l.index,Bt);continue}if(p)for(u=t.length-1;u>=0;u--){let L=t[u];if(t[u].level<a)break;if(L.single===m&&t[u].level===a){L=t[u];let q,j;m?(q=n.md.options.quotes[2],j=n.md.options.quotes[3]):(q=n.md.options.quotes[0],j=n.md.options.quotes[1]),$n(r,i,l.index,j),$n(r,L.token,L.pos,q),t.length=u;continue e}}b?t.push({token:i,pos:l.index,single:m,level:a}):p&&m&&$n(r,i,l.index,Bt)}}Object.keys(r).forEach(function(i){e[i].content=va(e[i].content,r[i])})}function _a(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!wa.test(e.tokens[n].content)||Ca(e.tokens[n].children,e)}function Ea(e){let n,u;const t=e.tokens,r=t.length;for(let i=0;i<r;i++){if(t[i].type!=="inline")continue;const c=t[i].children,a=c.length;for(n=0;n<a;n++)c[n].type==="text_special"&&(c[n].type="text");for(n=u=0;n<a;n++)c[n].type==="text"&&n+1<a&&c[n+1].type==="text"?c[n+1].content=c[n].content+c[n+1].content:(n!==u&&(c[u]=c[n]),u++);n!==u&&(c.length=u)}}const xu=[["normalize",ca],["block",la],["inline",sa],["linkify",ha],["replacements",xa],["smartquotes",_a],["text_join",Ea]];function mt(){this.ruler=new re;for(let e=0;e<xu.length;e++)this.ruler.push(xu[e][0],xu[e][1])}mt.prototype.process=function(e){const n=this.ruler.getRules("");for(let u=0,t=n.length;u<t;u++)n[u](e)};mt.prototype.State=Wr;function ye(e,n,u,t){this.src=e,this.md=n,this.env=u,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let i=0,c=0,a=0,s=0,d=r.length,f=!1;c<d;c++){const l=r.charCodeAt(c);if(!f)if(G(l)){a++,l===9?s+=4-s%4:s++;continue}else f=!0;(l===10||c===d-1)&&(l!==10&&c++,this.bMarks.push(i),this.eMarks.push(c),this.tShift.push(a),this.sCount.push(s),this.bsCount.push(0),f=!1,a=0,s=0,i=c+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ye.prototype.push=function(e,n,u){const t=new pe(e,n,u);return t.block=!0,u<0&&this.level--,t.level=this.level,u>0&&this.level++,this.tokens.push(t),t};ye.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};ye.prototype.skipEmptyLines=function(n){for(let u=this.lineMax;n<u&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};ye.prototype.skipSpaces=function(n){for(let u=this.src.length;n<u;n++){const t=this.src.charCodeAt(n);if(!G(t))break}return n};ye.prototype.skipSpacesBack=function(n,u){if(n<=u)return n;for(;n>u;)if(!G(this.src.charCodeAt(--n)))return n+1;return n};ye.prototype.skipChars=function(n,u){for(let t=this.src.length;n<t&&this.src.charCodeAt(n)===u;n++);return n};ye.prototype.skipCharsBack=function(n,u,t){if(n<=t)return n;for(;n>t;)if(u!==this.src.charCodeAt(--n))return n+1;return n};ye.prototype.getLines=function(n,u,t,r){if(n>=u)return"";const i=new Array(u-n);for(let c=0,a=n;a<u;a++,c++){let s=0;const d=this.bMarks[a];let f=d,l;for(a+1<u||r?l=this.eMarks[a]+1:l=this.eMarks[a];f<l&&s<t;){const b=this.src.charCodeAt(f);if(G(b))b===9?s+=4-(s+this.bsCount[a])%4:s++;else if(f-d<this.tShift[a])s++;else break;f++}s>t?i[c]=new Array(s-t+1).join(" ")+this.src.slice(f,l):i[c]=this.src.slice(f,l)}return i.join("")};ye.prototype.Token=pe;const Aa=65536;function wu(e,n){const u=e.bMarks[n]+e.tShift[n],t=e.eMarks[n];return e.src.slice(u,t)}function jt(e){const n=[],u=e.length;let t=0,r=e.charCodeAt(t),i=!1,c=0,a="";for(;t<u;)r===124&&(i?(a+=e.substring(c,t-1),c=t):(n.push(a+e.substring(c,t)),a="",c=t+1)),i=r===92,t++,r=e.charCodeAt(t);return n.push(a+e.substring(c)),n}function Da(e,n,u,t){if(n+2>u)return!1;let r=n+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let i=e.bMarks[r]+e.tShift[r];if(i>=e.eMarks[r])return!1;const c=e.src.charCodeAt(i++);if(c!==124&&c!==45&&c!==58||i>=e.eMarks[r])return!1;const a=e.src.charCodeAt(i++);if(a!==124&&a!==45&&a!==58&&!G(a)||c===45&&G(a))return!1;for(;i<e.eMarks[r];){const A=e.src.charCodeAt(i);if(A!==124&&A!==45&&A!==58&&!G(A))return!1;i++}let s=wu(e,n+1),d=s.split("|");const f=[];for(let A=0;A<d.length;A++){const L=d[A].trim();if(!L){if(A===0||A===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(L))return!1;L.charCodeAt(L.length-1)===58?f.push(L.charCodeAt(0)===58?"center":"right"):L.charCodeAt(0)===58?f.push("left"):f.push("")}if(s=wu(e,n).trim(),s.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;d=jt(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const l=d.length;if(l===0||l!==f.length)return!1;if(t)return!0;const b=e.parentType;e.parentType="table";const p=e.md.block.ruler.getRules("blockquote"),m=e.push("table_open","table",1),g=[n,0];m.map=g;const k=e.push("thead_open","thead",1);k.map=[n,n+1];const v=e.push("tr_open","tr",1);v.map=[n,n+1];for(let A=0;A<d.length;A++){const L=e.push("th_open","th",1);f[A]&&(L.attrs=[["style","text-align:"+f[A]]]);const q=e.push("inline","",0);q.content=d[A].trim(),q.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let w,_=0;for(r=n+2;r<u&&!(e.sCount[r]<e.blkIndent);r++){let A=!1;for(let q=0,j=p.length;q<j;q++)if(p[q](e,r,u,!0)){A=!0;break}if(A||(s=wu(e,r).trim(),!s)||e.sCount[r]-e.blkIndent>=4||(d=jt(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),_+=l-d.length,_>Aa))break;if(r===n+2){const q=e.push("tbody_open","tbody",1);q.map=w=[n+2,0]}const L=e.push("tr_open","tr",1);L.map=[r,r+1];for(let q=0;q<l;q++){const j=e.push("td_open","td",1);f[q]&&(j.attrs=[["style","text-align:"+f[q]]]);const $=e.push("inline","",0);$.content=d[q]?d[q].trim():"",$.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return w&&(e.push("tbody_close","tbody",-1),w[1]=r),e.push("table_close","table",-1),g[1]=r,e.parentType=b,e.line=r,!0}function Sa(e,n,u){if(e.sCount[n]-e.blkIndent<4)return!1;let t=n+1,r=t;for(;t<u;){if(e.isEmpty(t)){t++;continue}if(e.sCount[t]-e.blkIndent>=4){t++,r=t;continue}break}e.line=r;const i=e.push("code_block","code",0);return i.content=e.getLines(n,r,4+e.blkIndent,!1)+`
`,i.map=[n,e.line],!0}function Fa(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||r+3>i)return!1;const c=e.src.charCodeAt(r);if(c!==126&&c!==96)return!1;let a=r;r=e.skipChars(r,c);let s=r-a;if(s<3)return!1;const d=e.src.slice(a,r),f=e.src.slice(r,i);if(c===96&&f.indexOf(String.fromCharCode(c))>=0)return!1;if(t)return!0;let l=n,b=!1;for(;l++,!(l>=u||(r=a=e.bMarks[l]+e.tShift[l],i=e.eMarks[l],r<i&&e.sCount[l]<e.blkIndent));)if(e.src.charCodeAt(r)===c&&!(e.sCount[l]-e.blkIndent>=4)&&(r=e.skipChars(r,c),!(r-a<s)&&(r=e.skipSpaces(r),!(r<i)))){b=!0;break}s=e.sCount[n],e.line=l+(b?1:0);const p=e.push("fence","code",0);return p.info=f,p.content=e.getLines(n+1,l,s,!0),p.markup=d,p.map=[n,e.line],!0}function Ta(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];const c=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(t)return!0;const a=[],s=[],d=[],f=[],l=e.md.block.ruler.getRules("blockquote"),b=e.parentType;e.parentType="blockquote";let p=!1,m;for(m=n;m<u;m++){const _=e.sCount[m]<e.blkIndent;if(r=e.bMarks[m]+e.tShift[m],i=e.eMarks[m],r>=i)break;if(e.src.charCodeAt(r++)===62&&!_){let L=e.sCount[m]+1,q,j;e.src.charCodeAt(r)===32?(r++,L++,j=!1,q=!0):e.src.charCodeAt(r)===9?(q=!0,(e.bsCount[m]+L)%4===3?(r++,L++,j=!1):j=!0):q=!1;let $=L;for(a.push(e.bMarks[m]),e.bMarks[m]=r;r<i;){const W=e.src.charCodeAt(r);if(G(W))W===9?$+=4-($+e.bsCount[m]+(j?1:0))%4:$++;else break;r++}p=r>=i,s.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+(q?1:0),d.push(e.sCount[m]),e.sCount[m]=$-L,f.push(e.tShift[m]),e.tShift[m]=r-e.bMarks[m];continue}if(p)break;let A=!1;for(let L=0,q=l.length;L<q;L++)if(l[L](e,m,u,!0)){A=!0;break}if(A){e.lineMax=m,e.blkIndent!==0&&(a.push(e.bMarks[m]),s.push(e.bsCount[m]),f.push(e.tShift[m]),d.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}a.push(e.bMarks[m]),s.push(e.bsCount[m]),f.push(e.tShift[m]),d.push(e.sCount[m]),e.sCount[m]=-1}const g=e.blkIndent;e.blkIndent=0;const k=e.push("blockquote_open","blockquote",1);k.markup=">";const v=[n,0];k.map=v,e.md.block.tokenize(e,n,m);const w=e.push("blockquote_close","blockquote",-1);w.markup=">",e.lineMax=c,e.parentType=b,v[1]=e.line;for(let _=0;_<f.length;_++)e.bMarks[_+n]=a[_],e.tShift[_+n]=f[_],e.sCount[_+n]=d[_],e.bsCount[_+n]=s[_];return e.blkIndent=g,!0}function Ma(e,n,u,t){const r=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let i=e.bMarks[n]+e.tShift[n];const c=e.src.charCodeAt(i++);if(c!==42&&c!==45&&c!==95)return!1;let a=1;for(;i<r;){const d=e.src.charCodeAt(i++);if(d!==c&&!G(d))return!1;d===c&&a++}if(a<3)return!1;if(t)return!0;e.line=n+1;const s=e.push("hr","hr",0);return s.map=[n,e.line],s.markup=Array(a+1).join(String.fromCharCode(c)),!0}function Ht(e,n){const u=e.eMarks[n];let t=e.bMarks[n]+e.tShift[n];const r=e.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<u){const i=e.src.charCodeAt(t);if(!G(i))return-1}return t}function $t(e,n){const u=e.bMarks[n]+e.tShift[n],t=e.eMarks[n];let r=u;if(r+1>=t)return-1;let i=e.src.charCodeAt(r++);if(i<48||i>57)return-1;for(;;){if(r>=t)return-1;if(i=e.src.charCodeAt(r++),i>=48&&i<=57){if(r-u>=10)return-1;continue}if(i===41||i===46)break;return-1}return r<t&&(i=e.src.charCodeAt(r),!G(i))?-1:r}function Ia(e,n){const u=e.level+2;for(let t=n+2,r=e.tokens.length-2;t<r;t++)e.tokens[t].level===u&&e.tokens[t].type==="paragraph_open"&&(e.tokens[t+2].hidden=!0,e.tokens[t].hidden=!0,t+=2)}function Ra(e,n,u,t){let r,i,c,a,s=n,d=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let f=!1;t&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(f=!0);let l,b,p;if((p=$t(e,s))>=0){if(l=!0,c=e.bMarks[s]+e.tShift[s],b=Number(e.src.slice(c,p-1)),f&&b!==1)return!1}else if((p=Ht(e,s))>=0)l=!1;else return!1;if(f&&e.skipSpaces(p)>=e.eMarks[s])return!1;if(t)return!0;const m=e.src.charCodeAt(p-1),g=e.tokens.length;l?(a=e.push("ordered_list_open","ol",1),b!==1&&(a.attrs=[["start",b]])):a=e.push("bullet_list_open","ul",1);const k=[s,0];a.map=k,a.markup=String.fromCharCode(m);let v=!1;const w=e.md.block.ruler.getRules("list"),_=e.parentType;for(e.parentType="list";s<u;){i=p,r=e.eMarks[s];const A=e.sCount[s]+p-(e.bMarks[s]+e.tShift[s]);let L=A;for(;i<r;){const de=e.src.charCodeAt(i);if(de===9)L+=4-(L+e.bsCount[s])%4;else if(de===32)L++;else break;i++}const q=i;let j;q>=r?j=1:j=L-A,j>4&&(j=1);const $=A+j;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(m);const W=[s,0];a.map=W,l&&(a.info=e.src.slice(c,p-1));const se=e.tight,xe=e.tShift[s],He=e.sCount[s],Le=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=$,e.tight=!0,e.tShift[s]=q-e.bMarks[s],e.sCount[s]=L,q>=r&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,u):e.md.block.tokenize(e,s,u,!0),(!e.tight||v)&&(d=!1),v=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Le,e.tShift[s]=xe,e.sCount[s]=He,e.tight=se,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(m),s=e.line,W[1]=s,s>=u||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let J=!1;for(let de=0,z=w.length;de<z;de++)if(w[de](e,s,u,!0)){J=!0;break}if(J)break;if(l){if(p=$t(e,s),p<0)break;c=e.bMarks[s]+e.tShift[s]}else if(p=Ht(e,s),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return l?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(m),k[1]=s,e.line=s,e.parentType=_,d&&Ia(e,g),!0}function La(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],i=e.eMarks[n],c=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function a(w){const _=e.lineMax;if(w>=_||e.isEmpty(w))return null;let A=!1;if(e.sCount[w]-e.blkIndent>3&&(A=!0),e.sCount[w]<0&&(A=!0),!A){const j=e.md.block.ruler.getRules("reference"),$=e.parentType;e.parentType="reference";let W=!1;for(let se=0,xe=j.length;se<xe;se++)if(j[se](e,w,_,!0)){W=!0;break}if(e.parentType=$,W)return null}const L=e.bMarks[w]+e.tShift[w],q=e.eMarks[w];return e.src.slice(L,q+1)}let s=e.src.slice(r,i+1);i=s.length;let d=-1;for(r=1;r<i;r++){const w=s.charCodeAt(r);if(w===91)return!1;if(w===93){d=r;break}else if(w===10){const _=a(c);_!==null&&(s+=_,i=s.length,c++)}else if(w===92&&(r++,r<i&&s.charCodeAt(r)===10)){const _=a(c);_!==null&&(s+=_,i=s.length,c++)}}if(d<0||s.charCodeAt(d+1)!==58)return!1;for(r=d+2;r<i;r++){const w=s.charCodeAt(r);if(w===10){const _=a(c);_!==null&&(s+=_,i=s.length,c++)}else if(!G(w))break}const f=e.md.helpers.parseLinkDestination(s,r,i);if(!f.ok)return!1;const l=e.md.normalizeLink(f.str);if(!e.md.validateLink(l))return!1;r=f.pos;const b=r,p=c,m=r;for(;r<i;r++){const w=s.charCodeAt(r);if(w===10){const _=a(c);_!==null&&(s+=_,i=s.length,c++)}else if(!G(w))break}let g=e.md.helpers.parseLinkTitle(s,r,i);for(;g.can_continue;){const w=a(c);if(w===null)break;s+=w,r=i,i=s.length,c++,g=e.md.helpers.parseLinkTitle(s,r,i,g)}let k;for(r<i&&m!==r&&g.ok?(k=g.str,r=g.pos):(k="",r=b,c=p);r<i;){const w=s.charCodeAt(r);if(!G(w))break;r++}if(r<i&&s.charCodeAt(r)!==10&&k)for(k="",r=b,c=p;r<i;){const w=s.charCodeAt(r);if(!G(w))break;r++}if(r<i&&s.charCodeAt(r)!==10)return!1;const v=uu(s.slice(1,d));return v?(t||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[v]>"u"&&(e.env.references[v]={title:k,href:l}),e.line=c),!0):!1}const Oa=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Na="[a-zA-Z_:][a-zA-Z0-9:._-]*",za="[^\"'=<>`\\x00-\\x20]+",qa="'[^']*'",Pa='"[^"]*"',Ba="(?:"+za+"|"+qa+"|"+Pa+")",ja="(?:\\s+"+Na+"(?:\\s*=\\s*"+Ba+")?)",Kr="<[A-Za-z][A-Za-z0-9\\-]*"+ja+"*\\s*\\/?>",Jr="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Ha="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",$a="<[?][\\s\\S]*?[?]>",Ua="<![A-Za-z][^>]*>",Ga="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Va=new RegExp("^(?:"+Kr+"|"+Jr+"|"+Ha+"|"+$a+"|"+Ua+"|"+Ga+")"),Za=new RegExp("^(?:"+Kr+"|"+Jr+")"),Ne=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Oa.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Za.source+"\\s*$"),/^$/,!1]];function Wa(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let c=e.src.slice(r,i),a=0;for(;a<Ne.length&&!Ne[a][0].test(c);a++);if(a===Ne.length)return!1;if(t)return Ne[a][2];let s=n+1;const d=Ne[a][1].test("");if(!Ne[a][1].test(c)){for(;s<u&&!(e.sCount[s]<e.blkIndent&&(d||!e.isEmpty(s)));s++)if(r=e.bMarks[s]+e.tShift[s],i=e.eMarks[s],c=e.src.slice(r,i),Ne[a][1].test(c)){c.length!==0&&s++;break}}e.line=s;const f=e.push("html_block","",0);return f.map=[n,s],f.content=e.getLines(n,s,e.blkIndent,!0),!0}function Ya(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let c=e.src.charCodeAt(r);if(c!==35||r>=i)return!1;let a=1;for(c=e.src.charCodeAt(++r);c===35&&r<i&&a<=6;)a++,c=e.src.charCodeAt(++r);if(a>6||r<i&&!G(c))return!1;if(t)return!0;i=e.skipSpacesBack(i,r);const s=e.skipCharsBack(i,35,r);s>r&&G(e.src.charCodeAt(s-1))&&(i=s),e.line=n+1;const d=e.push("heading_open","h"+String(a),1);d.markup="########".slice(0,a),d.map=[n,e.line];const f=e.push("inline","",0);f.content=tu(e.src.slice(r,i)),f.map=[n,e.line],f.children=[];const l=e.push("heading_close","h"+String(a),-1);return l.markup="########".slice(0,a),!0}function Ka(e,n,u){const t=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let i=0,c,a=n+1;for(;a<u&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let p=e.bMarks[a]+e.tShift[a];const m=e.eMarks[a];if(p<m&&(c=e.src.charCodeAt(p),(c===45||c===61)&&(p=e.skipChars(p,c),p=e.skipSpaces(p),p>=m))){i=c===61?1:2;break}}if(e.sCount[a]<0)continue;let b=!1;for(let p=0,m=t.length;p<m;p++)if(t[p](e,a,u,!0)){b=!0;break}if(b)break}if(!i)return e.parentType=r,!1;const s=tu(e.getLines(n,a,e.blkIndent,!1));e.line=a+1;const d=e.push("heading_open","h"+String(i),1);d.markup=String.fromCharCode(c),d.map=[n,e.line];const f=e.push("inline","",0);f.content=s,f.map=[n,e.line-1],f.children=[];const l=e.push("heading_close","h"+String(i),-1);return l.markup=String.fromCharCode(c),e.parentType=r,!0}function Ja(e,n,u){const t=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let i=n+1;for(e.parentType="paragraph";i<u&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3||e.sCount[i]<0)continue;let d=!1;for(let f=0,l=t.length;f<l;f++)if(t[f](e,i,u,!0)){d=!0;break}if(d)break}const c=tu(e.getLines(n,i,e.blkIndent,!1));e.line=i;const a=e.push("paragraph_open","p",1);a.map=[n,e.line];const s=e.push("inline","",0);return s.content=c,s.map=[n,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const Un=[["table",Da,["paragraph","reference"]],["code",Sa],["fence",Fa,["paragraph","reference","blockquote","list"]],["blockquote",Ta,["paragraph","reference","blockquote","list"]],["hr",Ma,["paragraph","reference","blockquote","list"]],["list",Ra,["paragraph","reference","blockquote"]],["reference",La],["html_block",Wa,["paragraph","reference","blockquote"]],["heading",Ya,["paragraph","reference","blockquote"]],["lheading",Ka],["paragraph",Ja]];function ru(){this.ruler=new re;for(let e=0;e<Un.length;e++)this.ruler.push(Un[e][0],Un[e][1],{alt:(Un[e][2]||[]).slice()})}ru.prototype.tokenize=function(e,n,u){const t=this.ruler.getRules(""),r=t.length,i=e.md.options.maxNesting;let c=n,a=!1;for(;c<u&&(e.line=c=e.skipEmptyLines(c),!(c>=u||e.sCount[c]<e.blkIndent));){if(e.level>=i){e.line=u;break}const s=e.line;let d=!1;for(let f=0;f<r;f++)if(d=t[f](e,c,u,!1),d){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),c=e.line,c<u&&e.isEmpty(c)&&(a=!0,c++,e.line=c)}};ru.prototype.parse=function(e,n,u,t){if(!e)return;const r=new this.State(e,n,u,t);this.tokenize(r,r.line,r.lineMax)};ru.prototype.State=ye;function An(e,n,u,t){this.src=e,this.env=u,this.md=n,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}An.prototype.pushPending=function(){const e=new pe("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};An.prototype.push=function(e,n,u){this.pending&&this.pushPending();const t=new pe(e,n,u);let r=null;return u<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,u>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t};An.prototype.scanDelims=function(e,n){const u=this.posMax,t=this.src.charCodeAt(e);let r;if(e===0)r=32;else if(e===1)r=this.src.charCodeAt(0),(r&63488)===55296&&(r=65533);else if(r=this.src.charCodeAt(e-1),(r&64512)===56320){const k=this.src.charCodeAt(e-2);r=(k&64512)===55296?65536+(k-55296<<10)+(r-56320):65533}else(r&64512)===55296&&(r=65533);let i=e;for(;i<u&&this.src.charCodeAt(i)===t;)i++;const c=i-e;let a=i<u?this.src.charCodeAt(i):32;if((a&64512)===55296){const k=this.src.charCodeAt(i+1);a=(k&64512)===56320?65536+(a-55296<<10)+(k-56320):65533}else(a&64512)===56320&&(a=65533);const s=Cn(r)||vn(r),d=Cn(a)||vn(a),f=wn(r),l=wn(a),b=!l&&(!d||f||s),p=!f&&(!s||l||d);return{can_open:b&&(n||!p||s),can_close:p&&(n||!b||d),length:c}};An.prototype.Token=pe;function Qa(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Xa(e,n){let u=e.pos;for(;u<e.posMax&&!Qa(e.src.charCodeAt(u));)u++;return u===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,u)),e.pos=u,!0)}const ec=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function nc(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const u=e.pos,t=e.posMax;if(u+3>t||e.src.charCodeAt(u)!==58||e.src.charCodeAt(u+1)!==47||e.src.charCodeAt(u+2)!==47)return!1;const r=e.pending.match(ec);if(!r)return!1;const i=r[1],c=e.md.linkify.matchAtStart(e.src.slice(u-i.length));if(!c)return!1;let a=c.url;if(a.length<=i.length)return!1;let s=a.length;for(;s>0&&a.charCodeAt(s-1)===42;)s--;s!==a.length&&(a=a.slice(0,s));const d=e.md.normalizeLink(a);if(!e.md.validateLink(d))return!1;if(!n){e.pending=e.pending.slice(0,-i.length);const f=e.push("link_open","a",1);f.attrs=[["href",d]],f.markup="linkify",f.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(a);const b=e.push("link_close","a",-1);b.markup="linkify",b.info="auto"}return e.pos+=a.length-i.length,!0}function uc(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==10)return!1;const t=e.pending.length-1,r=e.posMax;if(!n)if(t>=0&&e.pending.charCodeAt(t)===32)if(t>=1&&e.pending.charCodeAt(t-1)===32){let i=t-1;for(;i>=1&&e.pending.charCodeAt(i-1)===32;)i--;e.pending=e.pending.slice(0,i),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(u++;u<r&&G(e.src.charCodeAt(u));)u++;return e.pos=u,!0}const gt=[];for(let e=0;e<256;e++)gt.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){gt[e.charCodeAt(0)]=1});function tc(e,n){let u=e.pos;const t=e.posMax;if(e.src.charCodeAt(u)!==92||(u++,u>=t))return!1;let r=e.src.charCodeAt(u);if(r===10){for(n||e.push("hardbreak","br",0),u++;u<t&&(r=e.src.charCodeAt(u),!!G(r));)u++;return e.pos=u,!0}let i=e.src[u];if(r>=55296&&r<=56319&&u+1<t){const a=e.src.charCodeAt(u+1);a>=56320&&a<=57343&&(i+=e.src[u+1],u++)}const c="\\"+i;if(!n){const a=e.push("text_special","",0);r<256&&gt[r]!==0?a.content=i:a.content=c,a.markup=c,a.info="escape"}return e.pos=u+1,!0}function rc(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==96)return!1;const r=u;u++;const i=e.posMax;for(;u<i&&e.src.charCodeAt(u)===96;)u++;const c=e.src.slice(r,u),a=c.length;if(e.backticksScanned&&(e.backticks[a]||0)<=r)return n||(e.pending+=c),e.pos+=a,!0;let s=u,d;for(;(d=e.src.indexOf("`",s))!==-1;){for(s=d+1;s<i&&e.src.charCodeAt(s)===96;)s++;const f=s-d;if(f===a){if(!n){const l=e.push("code_inline","code",0);l.markup=c,l.content=e.src.slice(u,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[f]=d}return e.backticksScanned=!0,n||(e.pending+=c),e.pos+=a,!0}function oc(e,n){const u=e.pos,t=e.src.charCodeAt(u);if(n||t!==126)return!1;const r=e.scanDelims(e.pos,!0);let i=r.length;const c=String.fromCharCode(t);if(i<2)return!1;let a;i%2&&(a=e.push("text","",0),a.content=c,i--);for(let s=0;s<i;s+=2)a=e.push("text","",0),a.content=c+c,e.delimiters.push({marker:t,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function Ut(e,n){let u;const t=[],r=n.length;for(let i=0;i<r;i++){const c=n[i];if(c.marker!==126||c.end===-1)continue;const a=n[c.end];u=e.tokens[c.token],u.type="s_open",u.tag="s",u.nesting=1,u.markup="~~",u.content="",u=e.tokens[a.token],u.type="s_close",u.tag="s",u.nesting=-1,u.markup="~~",u.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&t.push(a.token-1)}for(;t.length;){const i=t.pop();let c=i+1;for(;c<e.tokens.length&&e.tokens[c].type==="s_close";)c++;c--,i!==c&&(u=e.tokens[c],e.tokens[c]=e.tokens[i],e.tokens[i]=u)}}function ic(e){const n=e.tokens_meta,u=e.tokens_meta.length;Ut(e,e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&Ut(e,n[t].delimiters)}const Qr={tokenize:oc,postProcess:ic};function ac(e,n){const u=e.pos,t=e.src.charCodeAt(u);if(n||t!==95&&t!==42)return!1;const r=e.scanDelims(e.pos,t===42);for(let i=0;i<r.length;i++){const c=e.push("text","",0);c.content=String.fromCharCode(t),e.delimiters.push({marker:t,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function Gt(e,n){const u=n.length;for(let t=u-1;t>=0;t--){const r=n[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const i=n[r.end],c=t>0&&n[t-1].end===r.end+1&&n[t-1].marker===r.marker&&n[t-1].token===r.token-1&&n[r.end+1].token===i.token+1,a=String.fromCharCode(r.marker),s=e.tokens[r.token];s.type=c?"strong_open":"em_open",s.tag=c?"strong":"em",s.nesting=1,s.markup=c?a+a:a,s.content="";const d=e.tokens[i.token];d.type=c?"strong_close":"em_close",d.tag=c?"strong":"em",d.nesting=-1,d.markup=c?a+a:a,d.content="",c&&(e.tokens[n[t-1].token].content="",e.tokens[n[r.end+1].token].content="",t--)}}function cc(e){const n=e.tokens_meta,u=e.tokens_meta.length;Gt(e,e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&Gt(e,n[t].delimiters)}const Xr={tokenize:ac,postProcess:cc};function lc(e,n){let u,t,r,i,c="",a="",s=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const f=e.pos,l=e.posMax,b=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<l&&e.src.charCodeAt(m)===40){for(d=!1,m++;m<l&&(u=e.src.charCodeAt(m),!(!G(u)&&u!==10));m++);if(m>=l)return!1;if(s=m,r=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),r.ok){for(c=e.md.normalizeLink(r.str),e.md.validateLink(c)?m=r.pos:c="",s=m;m<l&&(u=e.src.charCodeAt(m),!(!G(u)&&u!==10));m++);if(r=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<l&&s!==m&&r.ok)for(a=r.str,m=r.pos;m<l&&(u=e.src.charCodeAt(m),!(!G(u)&&u!==10));m++);}(m>=l||e.src.charCodeAt(m)!==41)&&(d=!0),m++}if(d){if(typeof e.env.references>"u")return!1;if(m<l&&e.src.charCodeAt(m)===91?(s=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?t=e.src.slice(s,m++):m=p+1):m=p+1,t||(t=e.src.slice(b,p)),i=e.env.references[uu(t)],!i)return e.pos=f,!1;c=i.href,a=i.title}if(!n){e.pos=b,e.posMax=p;const g=e.push("link_open","a",1),k=[["href",c]];g.attrs=k,a&&k.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=m,e.posMax=l,!0}function sc(e,n){let u,t,r,i,c,a,s,d,f="";const l=e.pos,b=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(i=m+1,i<b&&e.src.charCodeAt(i)===40){for(i++;i<b&&(u=e.src.charCodeAt(i),!(!G(u)&&u!==10));i++);if(i>=b)return!1;for(d=i,a=e.md.helpers.parseLinkDestination(e.src,i,e.posMax),a.ok&&(f=e.md.normalizeLink(a.str),e.md.validateLink(f)?i=a.pos:f=""),d=i;i<b&&(u=e.src.charCodeAt(i),!(!G(u)&&u!==10));i++);if(a=e.md.helpers.parseLinkTitle(e.src,i,e.posMax),i<b&&d!==i&&a.ok)for(s=a.str,i=a.pos;i<b&&(u=e.src.charCodeAt(i),!(!G(u)&&u!==10));i++);else s="";if(i>=b||e.src.charCodeAt(i)!==41)return e.pos=l,!1;i++}else{if(typeof e.env.references>"u")return!1;if(i<b&&e.src.charCodeAt(i)===91?(d=i+1,i=e.md.helpers.parseLinkLabel(e,i),i>=0?r=e.src.slice(d,i++):i=m+1):i=m+1,r||(r=e.src.slice(p,m)),c=e.env.references[uu(r)],!c)return e.pos=l,!1;f=c.href,s=c.title}if(!n){t=e.src.slice(p,m);const g=[];e.md.inline.parse(t,e.md,e.env,g);const k=e.push("image","img",0),v=[["src",f],["alt",""]];k.attrs=v,k.children=g,k.content=t,s&&v.push(["title",s])}return e.pos=i,e.posMax=b,!0}const dc=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,fc=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function hc(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==60)return!1;const t=e.pos,r=e.posMax;for(;;){if(++u>=r)return!1;const c=e.src.charCodeAt(u);if(c===60)return!1;if(c===62)break}const i=e.src.slice(t+1,u);if(fc.test(i)){const c=e.md.normalizeLink(i);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(i);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=i.length+2,!0}if(dc.test(i)){const c=e.md.normalizeLink("mailto:"+i);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(i);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=i.length+2,!0}return!1}function pc(e){return/^<a[>\s]/i.test(e)}function bc(e){return/^<\/a\s*>/i.test(e)}function mc(e){const n=e|32;return n>=97&&n<=122}function gc(e,n){if(!e.md.options.html)return!1;const u=e.posMax,t=e.pos;if(e.src.charCodeAt(t)!==60||t+2>=u)return!1;const r=e.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!mc(r))return!1;const i=e.src.slice(t).match(Va);if(!i)return!1;if(!n){const c=e.push("html_inline","",0);c.content=i[0],pc(c.content)&&e.linkLevel++,bc(c.content)&&e.linkLevel--}return e.pos+=i[0].length,!0}const kc=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,yc=/^&([a-z][a-z0-9]{1,31});/i;function xc(e,n){const u=e.pos,t=e.posMax;if(e.src.charCodeAt(u)!==38||u+1>=t)return!1;if(e.src.charCodeAt(u+1)===35){const i=e.src.slice(u).match(kc);if(i){if(!n){const c=i[1][0].toLowerCase()==="x"?parseInt(i[1].slice(1),16):parseInt(i[1],10),a=e.push("text_special","",0);a.content=bt(c)?xn(c):xn(65533),a.markup=i[0],a.info="entity"}return e.pos+=i[0].length,!0}}else{const i=e.src.slice(u).match(yc);if(i){const c=Pi(i[0]);if(c!==i[0]){if(!n){const a=e.push("text_special","",0);a.content=c,a.markup=i[0],a.info="entity"}return e.pos+=i[0].length,!0}}}return!1}function Vt(e){const n={},u=e.length;if(!u)return;let t=0,r=-2;const i=[];for(let c=0;c<u;c++){const a=e[c];if(i.push(0),(e[t].marker!==a.marker||r!==a.token-1)&&(t=c),r=a.token,a.length=a.length||0,!a.close)continue;n.hasOwnProperty(a.marker)||(n[a.marker]=[-1,-1,-1,-1,-1,-1]);const s=n[a.marker][(a.open?3:0)+a.length%3];let d=t-i[t]-1,f=d;for(;d>s;d-=i[d]+1){const l=e[d];if(l.marker===a.marker&&l.open&&l.end<0){let b=!1;if((l.close||a.open)&&(l.length+a.length)%3===0&&(l.length%3!==0||a.length%3!==0)&&(b=!0),!b){const p=d>0&&!e[d-1].open?i[d-1]+1:0;i[c]=c-d+p,i[d]=p,a.open=!1,l.end=c,l.close=!1,f=-1,r=-2;break}}}f!==-1&&(n[a.marker][(a.open?3:0)+(a.length||0)%3]=f)}}function wc(e){const n=e.tokens_meta,u=e.tokens_meta.length;Vt(e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&Vt(n[t].delimiters)}function vc(e){let n,u,t=0;const r=e.tokens,i=e.tokens.length;for(n=u=0;n<i;n++)r[n].nesting<0&&t--,r[n].level=t,r[n].nesting>0&&t++,r[n].type==="text"&&n+1<i&&r[n+1].type==="text"?r[n+1].content=r[n].content+r[n+1].content:(n!==u&&(r[u]=r[n]),u++);n!==u&&(r.length=u)}const vu=[["text",Xa],["linkify",nc],["newline",uc],["escape",tc],["backticks",rc],["strikethrough",Qr.tokenize],["emphasis",Xr.tokenize],["link",lc],["image",sc],["autolink",hc],["html_inline",gc],["entity",xc]],Cu=[["balance_pairs",wc],["strikethrough",Qr.postProcess],["emphasis",Xr.postProcess],["fragments_join",vc]];function Dn(){this.ruler=new re;for(let e=0;e<vu.length;e++)this.ruler.push(vu[e][0],vu[e][1]);this.ruler2=new re;for(let e=0;e<Cu.length;e++)this.ruler2.push(Cu[e][0],Cu[e][1])}Dn.prototype.skipToken=function(e){const n=e.pos,u=this.ruler.getRules(""),t=u.length,r=e.md.options.maxNesting,i=e.cache;if(typeof i[n]<"u"){e.pos=i[n];return}let c=!1;if(e.level<r){for(let a=0;a<t;a++)if(e.level++,c=u[a](e,!0),e.level--,c){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;c||e.pos++,i[n]=e.pos};Dn.prototype.tokenize=function(e){const n=this.ruler.getRules(""),u=n.length,t=e.posMax,r=e.md.options.maxNesting;for(;e.pos<t;){const i=e.pos;let c=!1;if(e.level<r){for(let a=0;a<u;a++)if(c=n[a](e,!1),c){if(i>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(c){if(e.pos>=t)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Dn.prototype.parse=function(e,n,u,t){const r=new this.State(e,n,u,t);this.tokenize(r);const i=this.ruler2.getRules(""),c=i.length;for(let a=0;a<c;a++)i[a](r)};Dn.prototype.State=An;function Cc(e){const n={};e=e||{},n.src_Any=Pr.source,n.src_Cc=Br.source,n.src_Z=Hr.source,n.src_P=ht.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const u="[><｜]";return n.src_pseudo_letter="(?:(?!"+u+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+u+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+u+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+u+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function tt(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){u&&Object.keys(u).forEach(function(t){e[t]=u[t]})}),e}function ou(e){return Object.prototype.toString.call(e)}function _c(e){return ou(e)==="[object String]"}function Ec(e){return ou(e)==="[object Object]"}function Ac(e){return ou(e)==="[object RegExp]"}function Zt(e){return ou(e)==="[object Function]"}function Dc(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const eo={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Sc(e){return Object.keys(e||{}).reduce(function(n,u){return n||eo.hasOwnProperty(u)},!1)}const Fc={"http:":{validate:function(e,n,u){const t=e.slice(n);return u.re.http||(u.re.http=new RegExp("^\\/\\/"+u.re.src_auth+u.re.src_host_port_strict+u.re.src_path,"i")),u.re.http.test(t)?t.match(u.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,u){const t=e.slice(n);return u.re.no_http||(u.re.no_http=new RegExp("^"+u.re.src_auth+"(?:localhost|(?:(?:"+u.re.src_domain+")\\.)+"+u.re.src_domain_root+")"+u.re.src_port+u.re.src_host_terminator+u.re.src_path,"i")),u.re.no_http.test(t)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:t.match(u.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,u){const t=e.slice(n);return u.re.mailto||(u.re.mailto=new RegExp("^"+u.re.src_email_name+"@"+u.re.src_host_strict,"i")),u.re.mailto.test(t)?t.match(u.re.mailto)[0].length:0}}},Tc="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Mc="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Ic(e){return function(n,u){const t=n.slice(u);return e.test(t)?t.match(e)[0].length:0}}function Wt(){return function(e,n){n.normalize(e)}}function Kn(e){const n=e.re=Cc(e.__opts__),u=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||u.push(Tc),u.push(n.src_xn),n.src_tlds=u.join("|");function t(a){return a.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(t(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(t(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(t(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(t(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(t(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(t(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(t(n.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function i(a,s){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+s)}Object.keys(e.__schemas__).forEach(function(a){const s=e.__schemas__[a];if(s===null)return;const d={validate:null,link:null};if(e.__compiled__[a]=d,Ec(s)){Ac(s.validate)?d.validate=Ic(s.validate):Zt(s.validate)?d.validate=s.validate:i(a,s),Zt(s.normalize)?d.normalize=s.normalize:s.normalize?i(a,s):d.normalize=Wt();return}if(_c(s)){r.push(a);return}i(a,s)}),r.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:Wt()};const c=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(Dc).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function no(e,n,u,t){const r=e.slice(u,t);this.schema=n.toLowerCase(),this.index=u,this.lastIndex=t,this.raw=r,this.text=r,this.url=r}function ie(e,n){if(!(this instanceof ie))return new ie(e,n);n||Sc(e)&&(n=e,e={}),this.__opts__=tt({},eo,n),this.__schemas__=tt({},Fc,e),this.__compiled__={},this.__tlds__=Mc,this.__tlds_replaced__=!1,this.re={},Kn(this)}ie.prototype.add=function(n,u){return this.__schemas__[n]=u,Kn(this),this};ie.prototype.set=function(n){return this.__opts__=tt(this.__opts__,n),this};ie.prototype.test=function(n){if(!n.length)return!1;let u,t;if(this.re.schema_test.test(n)){for(t=this.re.schema_search,t.lastIndex=0;(u=t.exec(n))!==null;)if(this.testSchemaAt(n,u[2],t.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};ie.prototype.pretest=function(n){return this.re.pretest.test(n)};ie.prototype.testSchemaAt=function(n,u,t){return this.__compiled__[u.toLowerCase()]?this.__compiled__[u.toLowerCase()].validate(n,t,this):0};ie.prototype.match=function(n){const u=[],t=[],r=[],i=[];let c,a,s;function d(b,p){return b?p?b.index!==p.index?b.index<p.index?b:p:b.lastIndex>=p.lastIndex?b:p:b:p}if(!n.length)return null;if(this.re.schema_test.test(n))for(s=this.re.schema_search,s.lastIndex=0;(c=s.exec(n))!==null;)a=this.testSchemaAt(n,c[2],s.lastIndex),a&&t.push({schema:c[2],index:c.index+c[1].length,lastIndex:c.index+c[0].length+a});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)r.push({schema:"",index:c.index+c[1].length,lastIndex:c.index+c[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)i.push({schema:"mailto:",index:c.index+c[1].length,lastIndex:c.index+c[0].length});const f=[0,0,0];let l=0;for(;;){const b=[t[f[0]],i[f[1]],r[f[2]]],p=d(d(b[0],b[1]),b[2]);if(!p)break;if(p===b[0]?f[0]++:p===b[1]?f[1]++:f[2]++,p.index<l)continue;const m=new no(n,p.schema,p.index,p.lastIndex);this.__compiled__[m.schema].normalize(m,this),u.push(m),l=p.lastIndex}return u.length?u:null};ie.prototype.matchAtStart=function(n){if(!n.length)return null;const u=this.re.schema_at_start.exec(n);if(!u)return null;const t=this.testSchemaAt(n,u[2],u[0].length);if(!t)return null;const r=new no(n,u[2],u.index+u[1].length,u.index+u[0].length+t);return this.__compiled__[r.schema].normalize(r,this),r};ie.prototype.tlds=function(n,u){return n=Array.isArray(n)?n:[n],u?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(t,r,i){return t!==i[r-1]}).reverse(),Kn(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,Kn(this),this)};ie.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};ie.prototype.onCompile=function(){};const Xe=2147483647,me=36,kt=1,_n=26,Rc=38,Lc=700,uo=72,to=128,ro="-",Oc=/^xn--/,Nc=/[^\0-\x7F]/,zc=/[\x2E\u3002\uFF0E\uFF61]/g,qc={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},_u=me-kt,ge=Math.floor,Eu=String.fromCharCode;function Te(e){throw new RangeError(qc[e])}function Pc(e,n){const u=[];let t=e.length;for(;t--;)u[t]=n(e[t]);return u}function oo(e,n){const u=e.split("@");let t="";u.length>1&&(t=u[0]+"@",e=u[1]),e=e.replace(zc,".");const r=e.split("."),i=Pc(r,n).join(".");return t+i}function io(e){const n=[];let u=0;const t=e.length;for(;u<t;){const r=e.charCodeAt(u++);if(r>=55296&&r<=56319&&u<t){const i=e.charCodeAt(u++);(i&64512)==56320?n.push(((r&1023)<<10)+(i&1023)+65536):(n.push(r),u--)}else n.push(r)}return n}const Bc=e=>String.fromCodePoint(...e),jc=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:me},Yt=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},ao=function(e,n,u){let t=0;for(e=u?ge(e/Lc):e>>1,e+=ge(e/n);e>_u*_n>>1;t+=me)e=ge(e/_u);return ge(t+(_u+1)*e/(e+Rc))},co=function(e){const n=[],u=e.length;let t=0,r=to,i=uo,c=e.lastIndexOf(ro);c<0&&(c=0);for(let a=0;a<c;++a)e.charCodeAt(a)>=128&&Te("not-basic"),n.push(e.charCodeAt(a));for(let a=c>0?c+1:0;a<u;){const s=t;for(let f=1,l=me;;l+=me){a>=u&&Te("invalid-input");const b=jc(e.charCodeAt(a++));b>=me&&Te("invalid-input"),b>ge((Xe-t)/f)&&Te("overflow"),t+=b*f;const p=l<=i?kt:l>=i+_n?_n:l-i;if(b<p)break;const m=me-p;f>ge(Xe/m)&&Te("overflow"),f*=m}const d=n.length+1;i=ao(t-s,d,s==0),ge(t/d)>Xe-r&&Te("overflow"),r+=ge(t/d),t%=d,n.splice(t++,0,r)}return String.fromCodePoint(...n)},lo=function(e){const n=[];e=io(e);const u=e.length;let t=to,r=0,i=uo;for(const s of e)s<128&&n.push(Eu(s));const c=n.length;let a=c;for(c&&n.push(ro);a<u;){let s=Xe;for(const f of e)f>=t&&f<s&&(s=f);const d=a+1;s-t>ge((Xe-r)/d)&&Te("overflow"),r+=(s-t)*d,t=s;for(const f of e)if(f<t&&++r>Xe&&Te("overflow"),f===t){let l=r;for(let b=me;;b+=me){const p=b<=i?kt:b>=i+_n?_n:b-i;if(l<p)break;const m=l-p,g=me-p;n.push(Eu(Yt(p+m%g,0))),l=ge(m/g)}n.push(Eu(Yt(l,0))),i=ao(r,d,a===c),r=0,++a}++r,++t}return n.join("")},Hc=function(e){return oo(e,function(n){return Oc.test(n)?co(n.slice(4).toLowerCase()):n})},$c=function(e){return oo(e,function(n){return Nc.test(n)?"xn--"+lo(n):n})},so={version:"2.3.1",ucs2:{decode:io,encode:Bc},decode:co,encode:lo,toASCII:$c,toUnicode:Hc},Uc={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},Gc={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Vc={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Zc={default:Uc,zero:Gc,commonmark:Vc},Wc=/^(vbscript|javascript|file|data):/,Yc=/^data:image\/(gif|png|jpeg|webp);/;function Kc(e){const n=e.trim().toLowerCase();return Wc.test(n)?Yc.test(n):!0}const fo=["http:","https:","mailto:"];function Jc(e){const n=ft(e,!0);if(n.hostname&&(!n.protocol||fo.indexOf(n.protocol)>=0))try{n.hostname=so.toASCII(n.hostname)}catch{}return En(dt(n))}function Qc(e){const n=ft(e,!0);if(n.hostname&&(!n.protocol||fo.indexOf(n.protocol)>=0))try{n.hostname=so.toUnicode(n.hostname)}catch{}return en(dt(n),en.defaultChars+"%")}function ae(e,n){if(!(this instanceof ae))return new ae(e,n);n||pt(e)||(n=e||{},e="default"),this.inline=new Dn,this.block=new ru,this.core=new mt,this.renderer=new on,this.linkify=new ie,this.validateLink=Kc,this.normalizeLink=Jc,this.normalizeLinkText=Qc,this.utils=na,this.helpers=nu({},oa),this.options={},this.configure(e),n&&this.set(n)}ae.prototype.set=function(e){return nu(this.options,e),this};ae.prototype.configure=function(e){const n=this;if(pt(e)){const u=e;if(e=Zc[u],!e)throw new Error('Wrong `markdown-it` preset "'+u+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(u){e.components[u].rules&&n[u].ruler.enableOnly(e.components[u].rules),e.components[u].rules2&&n[u].ruler2.enableOnly(e.components[u].rules2)}),this};ae.prototype.enable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){u=u.concat(this[r].ruler.enable(e,!0))},this),u=u.concat(this.inline.ruler2.enable(e,!0));const t=e.filter(function(r){return u.indexOf(r)<0});if(t.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this};ae.prototype.disable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){u=u.concat(this[r].ruler.disable(e,!0))},this),u=u.concat(this.inline.ruler2.disable(e,!0));const t=e.filter(function(r){return u.indexOf(r)<0});if(t.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this};ae.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};ae.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const u=new this.core.State(e,this,n);return this.core.process(u),u.tokens};ae.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};ae.prototype.parseInline=function(e,n){const u=new this.core.State(e,this,n);return u.inlineMode=!0,this.core.process(u),u.tokens};ae.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var Kt=!1,un={false:"push",true:"unshift",after:"push",before:"unshift"},Jn={isPermalinkSymbol:!0};function rt(e,n,u,t){var r;if(!Kt){var i="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(i):console.warn(i),Kt=!0}var c=[Object.assign(new u.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,u)]],Object.entries(n.permalinkAttrs(e,u)))}),Object.assign(new u.Token("html_block","",0),{content:n.permalinkSymbol,meta:Jn}),new u.Token("link_close","a",-1)];n.permalinkSpace&&u.tokens[t+1].children[un[n.permalinkBefore]](Object.assign(new u.Token("text","",0),{content:" "})),(r=u.tokens[t+1].children)[un[n.permalinkBefore]].apply(r,c)}function ho(e){return"#"+e}function po(e){return{}}var Xc={class:"header-anchor",symbol:"#",renderHref:ho,renderAttrs:po};function Sn(e){function n(u){return u=Object.assign({},n.defaults,u),function(t,r,i,c){return e(t,u,r,i,c)}}return n.defaults=Object.assign({},Xc),n.renderPermalinkImpl=e,n}function yt(e){var n=[],u=e.filter(function(t){if(t[0]!=="class")return!0;n.push(t[1])});return n.length>0&&u.unshift(["class",n.join(" ")]),u}var iu=Sn(function(e,n,u,t,r){var i,c=[Object.assign(new t.Token("link_open","a",1),{attrs:yt([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,t)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,t))))}),Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:Jn}),new t.Token("link_close","a",-1)];if(n.space){var a=typeof n.space=="string"?n.space:" ";t.tokens[r+1].children[un[n.placement]](Object.assign(new t.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:a}))}(i=t.tokens[r+1].children)[un[n.placement]].apply(i,c)});Object.assign(iu.defaults,{space:!0,placement:"after",ariaHidden:!1});var qe=Sn(iu.renderPermalinkImpl);qe.defaults=Object.assign({},iu.defaults,{ariaHidden:!0});var bo=Sn(function(e,n,u,t,r){var i=[Object.assign(new t.Token("link_open","a",1),{attrs:yt([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,t)]],Object.entries(n.renderAttrs(e,t))))})].concat(n.safariReaderFix?[new t.Token("span_open","span",1)]:[],t.tokens[r+1].children,n.safariReaderFix?[new t.Token("span_close","span",-1)]:[],[new t.Token("link_close","a",-1)]);t.tokens[r+1]=Object.assign(new t.Token("inline","",0),{children:i})});Object.assign(bo.defaults,{safariReaderFix:!1});var Jt=Sn(function(e,n,u,t,r){var i;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var c=t.tokens[r+1].children.filter(function(l){return l.type==="text"||l.type==="code_inline"}).reduce(function(l,b){return l+b.content},""),a=[],s=[];if(n.class&&s.push(["class",n.class]),s.push(["href",n.renderHref(e,t)]),s.push.apply(s,Object.entries(n.renderAttrs(e,t))),n.style==="visually-hidden"){if(a.push(Object.assign(new t.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new t.Token("text","",0),{content:n.assistiveText(c)}),new t.Token("span_close","span",-1)),n.space){var d=typeof n.space=="string"?n.space:" ";a[un[n.placement]](Object.assign(new t.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:d}))}a[un[n.placement]](Object.assign(new t.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:Jn}),new t.Token("span_close","span",-1))}else a.push(Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:Jn}));n.style==="aria-label"?s.push(["aria-label",n.assistiveText(c)]):["aria-describedby","aria-labelledby"].includes(n.style)&&s.push([n.style,e]);var f=[Object.assign(new t.Token("link_open","a",1),{attrs:yt(s)})].concat(a,[new t.Token("link_close","a",-1)]);(i=t.tokens).splice.apply(i,[r+3,0].concat(f)),n.wrapper&&(t.tokens.splice(r,0,Object.assign(new t.Token("html_block","",0),{content:n.wrapper[0]+`
`})),t.tokens.splice(r+3+f.length+1,0,Object.assign(new t.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function Qt(e,n,u,t){var r=e,i=t;if(u&&Object.prototype.hasOwnProperty.call(n,r))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,r);)r=e+"-"+i,i+=1;return n[r]=!0,r}function Je(e,n){n=Object.assign({},Je.defaults,n),e.core.ruler.push("anchor",function(u){for(var t,r={},i=u.tokens,c=Array.isArray(n.level)?(t=n.level,function(l){return t.includes(l)}):(function(l){return function(b){return b>=l}})(n.level),a=0;a<i.length;a++){var s=i[a];if(s.type==="heading_open"&&c(Number(s.tag.substr(1)))){var d=n.getTokensText(i[a+1].children),f=s.attrGet("id");f=f==null?Qt(f=n.slugifyWithState?n.slugifyWithState(d,u):n.slugify(d),r,!1,n.uniqueSlugStartIndex):Qt(f,r,!0,n.uniqueSlugStartIndex),s.attrSet("id",f),n.tabIndex!==!1&&s.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(f,n,u,a):(n.permalink||n.renderPermalink&&n.renderPermalink!==rt)&&n.renderPermalink(f,n,u,a),a=i.indexOf(s),n.callback&&n.callback(s,{slug:f,title:d})}}})}Object.assign(Jt.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),Je.permalink={__proto__:null,legacy:rt,renderHref:ho,renderAttrs:po,makePermalink:Sn,linkInsideHeader:iu,ariaHidden:qe,headerLink:bo,linkAfterHeader:Jt},Je.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:rt,permalinkClass:qe.defaults.class,permalinkSpace:qe.defaults.space,permalinkSymbol:"¶",permalinkBefore:qe.defaults.placement==="before",permalinkHref:qe.defaults.renderHref,permalinkAttrs:qe.defaults.renderAttrs},Je.default=Je;function au(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Au,Xt;function el(){if(Xt)return Au;Xt=1;function e(t,r){var i,c,a=t.attrs[t.attrIndex("href")][1];for(i=0;i<r.length;++i){if(c=r[i],typeof c.matcher=="function"){if(c.matcher(a,c))return c;continue}return c}}function n(t,r,i){Object.keys(i).forEach(function(c){var a,s=i[c];c==="className"&&(c="class"),a=r[t].attrIndex(c),a<0?r[t].attrPush([c,s]):r[t].attrs[a][1]=s})}function u(t,r){r?r=Array.isArray(r)?r:[r]:r=[],Object.freeze(r);var i=t.renderer.rules.link_open||this.defaultRender;t.renderer.rules.link_open=function(c,a,s,d,f){var l=e(c[a],r),b=l&&l.attrs;return b&&n(a,c,b),i(c,a,s,d,f)}}return u.defaultRender=function(t,r,i,c,a){return a.renderToken(t,r,i)},Au=u,Au}var nl=el();const ul=au(nl);function tl(e,n,u,t){const r=Number(e[n].meta.id+1).toString();let i="";return typeof t.docId=="string"&&(i=`-${t.docId}-`),i+r}function rl(e,n){let u=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),`[${u}]`}function ol(e,n,u,t,r){const i=r.rules.footnote_anchor_name(e,n,u,t,r),c=r.rules.footnote_caption(e,n,u,t,r);let a=i;return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${i}" id="fnref${a}">${c}</a></sup>`}function il(e,n,u){return(u.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function al(){return`</ol>
</section>
`}function cl(e,n,u,t,r){let i=r.rules.footnote_anchor_name(e,n,u,t,r);return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<li id="fn${i}" class="footnote-item">`}function ll(){return`</li>
`}function sl(e,n,u,t,r){let i=r.rules.footnote_anchor_name(e,n,u,t,r);return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),` <a href="#fnref${i}" class="footnote-backref">↩︎</a>`}function dl(e){const n=e.helpers.parseLinkLabel,u=e.utils.isSpace;e.renderer.rules.footnote_ref=ol,e.renderer.rules.footnote_block_open=il,e.renderer.rules.footnote_block_close=al,e.renderer.rules.footnote_open=cl,e.renderer.rules.footnote_close=ll,e.renderer.rules.footnote_anchor=sl,e.renderer.rules.footnote_caption=rl,e.renderer.rules.footnote_anchor_name=tl;function t(a,s,d,f){const l=a.bMarks[s]+a.tShift[s],b=a.eMarks[s];if(l+4>b||a.src.charCodeAt(l)!==91||a.src.charCodeAt(l+1)!==94)return!1;let p;for(p=l+2;p<b;p++){if(a.src.charCodeAt(p)===32)return!1;if(a.src.charCodeAt(p)===93)break}if(p===l+2||p+1>=b||a.src.charCodeAt(++p)!==58)return!1;if(f)return!0;p++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const m=a.src.slice(l+2,p-2);a.env.footnotes.refs[`:${m}`]=-1;const g=new a.Token("footnote_reference_open","",1);g.meta={label:m},g.level=a.level++,a.tokens.push(g);const k=a.bMarks[s],v=a.tShift[s],w=a.sCount[s],_=a.parentType,A=p,L=a.sCount[s]+p-(a.bMarks[s]+a.tShift[s]);let q=L;for(;p<b;){const $=a.src.charCodeAt(p);if(u($))$===9?q+=4-q%4:q++;else break;p++}a.tShift[s]=p-A,a.sCount[s]=q-L,a.bMarks[s]=A,a.blkIndent+=4,a.parentType="footnote",a.sCount[s]<a.blkIndent&&(a.sCount[s]+=a.blkIndent),a.md.block.tokenize(a,s,d,!0),a.parentType=_,a.blkIndent-=4,a.tShift[s]=v,a.sCount[s]=w,a.bMarks[s]=k;const j=new a.Token("footnote_reference_close","",-1);return j.level=--a.level,a.tokens.push(j),!0}function r(a,s){const d=a.posMax,f=a.pos;if(f+2>=d||a.src.charCodeAt(f)!==94||a.src.charCodeAt(f+1)!==91)return!1;const l=f+2,b=n(a,f+1);if(b<0)return!1;if(!s){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const p=a.env.footnotes.list.length,m=[];a.md.inline.parse(a.src.slice(l,b),a.md,a.env,m);const g=a.push("footnote_ref","",0);g.meta={id:p},a.env.footnotes.list[p]={content:a.src.slice(l,b),tokens:m}}return a.pos=b+1,a.posMax=d,!0}function i(a,s){const d=a.posMax,f=a.pos;if(f+3>d||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(f)!==91||a.src.charCodeAt(f+1)!==94)return!1;let l;for(l=f+2;l<d;l++){if(a.src.charCodeAt(l)===32||a.src.charCodeAt(l)===10)return!1;if(a.src.charCodeAt(l)===93)break}if(l===f+2||l>=d)return!1;l++;const b=a.src.slice(f+2,l-1);if(typeof a.env.footnotes.refs[`:${b}`]>"u")return!1;if(!s){a.env.footnotes.list||(a.env.footnotes.list=[]);let p;a.env.footnotes.refs[`:${b}`]<0?(p=a.env.footnotes.list.length,a.env.footnotes.list[p]={label:b,count:0},a.env.footnotes.refs[`:${b}`]=p):p=a.env.footnotes.refs[`:${b}`];const m=a.env.footnotes.list[p].count;a.env.footnotes.list[p].count++;const g=a.push("footnote_ref","",0);g.meta={id:p,subId:m,label:b}}return a.pos=l,a.posMax=d,!0}function c(a){let s,d,f,l=!1;const b={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(m){return m.type==="footnote_reference_open"?(l=!0,d=[],f=m.meta.label,!1):m.type==="footnote_reference_close"?(l=!1,b[":"+f]=d,!1):(l&&d.push(m),!l)}),!a.env.footnotes.list))return;const p=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let m=0,g=p.length;m<g;m++){const k=new a.Token("footnote_open","",1);if(k.meta={id:m,label:p[m].label},a.tokens.push(k),p[m].tokens){s=[];const _=new a.Token("paragraph_open","p",1);_.block=!0,s.push(_);const A=new a.Token("inline","",0);A.children=p[m].tokens,A.content=p[m].content,s.push(A);const L=new a.Token("paragraph_close","p",-1);L.block=!0,s.push(L)}else p[m].label&&(s=b[`:${p[m].label}`]);s&&(a.tokens=a.tokens.concat(s));let v;a.tokens[a.tokens.length-1].type==="paragraph_close"?v=a.tokens.pop():v=null;const w=p[m].count>0?p[m].count:1;for(let _=0;_<w;_++){const A=new a.Token("footnote_anchor","",0);A.meta={id:m,subId:_,label:p[m].label},a.tokens.push(A)}v&&a.tokens.push(v),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",t,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",r),e.inline.ruler.after("footnote_inline","footnote_ref",i),e.core.ruler.after("inline","footnote_tail",c)}var Du,er;function fl(){if(er)return Du;er=1;var e=!0,n=!1,u=!1;Du=function(g,k){k&&(e=!k.enabled,n=!!k.label,u=!!k.labelAfter),g.core.ruler.after("inline","github-task-lists",function(v){for(var w=v.tokens,_=2;_<w.length;_++)i(w,_)&&(c(w[_],v.Token),t(w[_-2],"class","task-list-item"+(e?"":" enabled")),t(w[r(w,_-2)],"class","contains-task-list"))})};function t(g,k,v){var w=g.attrIndex(k),_=[k,v];w<0?g.attrPush(_):g.attrs[w]=_}function r(g,k){for(var v=g[k].level-1,w=k-1;w>=0;w--)if(g[w].level===v)return w;return-1}function i(g,k){return l(g[k])&&b(g[k-1])&&p(g[k-2])&&m(g[k])}function c(g,k){if(g.children.unshift(a(g,k)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),n)if(u){g.children.pop();var v="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+v+'">',g.children.push(f(g.content,v,k))}else g.children.unshift(s(k)),g.children.push(d(k))}function a(g,k){var v=new k("html_inline","",0),w=e?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?v.content='<input class="task-list-item-checkbox"'+w+'type="checkbox">':(g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0)&&(v.content='<input class="task-list-item-checkbox" checked=""'+w+'type="checkbox">'),v}function s(g){var k=new g("html_inline","",0);return k.content="<label>",k}function d(g){var k=new g("html_inline","",0);return k.content="</label>",k}function f(g,k,v){var w=new v("html_inline","",0);return w.content='<label class="task-list-item-label" for="'+k+'">'+g+"</label>",w.attrs=[{for:k}],w}function l(g){return g.type==="inline"}function b(g){return g.type==="paragraph_open"}function p(g){return g.type==="list_item_open"}function m(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}return Du}var hl=fl();const pl=au(hl),bl={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},ml=(e,n={})=>{const{markers:u=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:t=bl,matchCaseSensitive:r=!1,titles:i={},classPrefix:c="markdown-alert"}=n,a=u==="*"?"\\w+":u.join("|"),s=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,r?"":"i");e.core.ruler.after("block","github-alerts",d=>{const f=d.tokens;for(let l=0;l<f.length;l++)if(f[l].type==="blockquote_open"){const b=f[l],p=l;for(;f[l]?.type!=="blockquote_close"&&l<=f.length;)l+=1;const m=f[l],g=l,k=f.slice(p,g+1).find(L=>L.type==="inline");if(!k)continue;const v=k.content.match(s);if(!v)continue;const w=v[1].toLowerCase(),_=v[2].trim()||(i[w]??gl(w)),A=t[w]??"";k.content=k.content.slice(v[0].length).trimStart(),b.type="alert_open",b.tag="div",b.meta={title:_,type:w,icon:A},m.type="alert_close",m.tag="div"}}),e.renderer.rules.alert_open=function(d,f){const{title:l,type:b,icon:p}=d[f].meta;return`<div class="${c} ${c}-${b}"><p class="${c}-title">${p}${l}</p>`}};function gl(e){return e.charAt(0).toUpperCase()+e.slice(1)}function kl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ue={},Gn={},Fe={},nr;function Fn(){if(nr)return Fe;nr=1;function e(c){return typeof c>"u"||c===null}function n(c){return typeof c=="object"&&c!==null}function u(c){return Array.isArray(c)?c:e(c)?[]:[c]}function t(c,a){if(a){const s=Object.keys(a);for(let d=0,f=s.length;d<f;d+=1){const l=s[d];c[l]=a[l]}}return c}function r(c,a){let s="";for(let d=0;d<a;d+=1)s+=c;return s}function i(c){return c===0&&Number.NEGATIVE_INFINITY===1/c}return Fe.isNothing=e,Fe.isObject=n,Fe.toArray=u,Fe.repeat=r,Fe.isNegativeZero=i,Fe.extend=t,Fe}var Su,ur;function Tn(){if(ur)return Su;ur=1;function e(u,t){let r="";const i=u.reason||"(unknown reason)";return u.mark?(u.mark.name&&(r+='in "'+u.mark.name+'" '),r+="("+(u.mark.line+1)+":"+(u.mark.column+1)+")",!t&&u.mark.snippet&&(r+=`

`+u.mark.snippet),i+" "+r):i}function n(u,t){Error.call(this),this.name="YAMLException",this.reason=u,this.mark=t,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.toString=function(t){return this.name+": "+e(this,t)},Su=n,Su}var Fu,tr;function yl(){if(tr)return Fu;tr=1;const e=Fn();function n(r,i,c,a,s){let d="",f="";const l=Math.floor(s/2)-1;return a-i>l&&(d=" ... ",i=a-l+d.length),c-a>l&&(f=" ...",c=a+l-f.length),{str:d+r.slice(i,c).replace(/\t/g,"→")+f,pos:a-i+d.length}}function u(r,i){return e.repeat(" ",i-r.length)+r}function t(r,i){if(i=Object.create(i||null),!r.buffer)return null;i.maxLength||(i.maxLength=79),typeof i.indent!="number"&&(i.indent=1),typeof i.linesBefore!="number"&&(i.linesBefore=3),typeof i.linesAfter!="number"&&(i.linesAfter=2);const c=/\r?\n|\r|\0/g,a=[0],s=[];let d,f=-1;for(;d=c.exec(r.buffer);)s.push(d.index),a.push(d.index+d[0].length),r.position<=d.index&&f<0&&(f=a.length-2);f<0&&(f=a.length-1);let l="";const b=Math.min(r.line+i.linesAfter,s.length).toString().length,p=i.maxLength-(i.indent+b+3);for(let g=1;g<=i.linesBefore&&!(f-g<0);g++){const k=n(r.buffer,a[f-g],s[f-g],r.position-(a[f]-a[f-g]),p);l=e.repeat(" ",i.indent)+u((r.line-g+1).toString(),b)+" | "+k.str+`
`+l}const m=n(r.buffer,a[f],s[f],r.position,p);l+=e.repeat(" ",i.indent)+u((r.line+1).toString(),b)+" | "+m.str+`
`,l+=e.repeat("-",i.indent+b+3+m.pos)+`^
`;for(let g=1;g<=i.linesAfter&&!(f+g>=s.length);g++){const k=n(r.buffer,a[f+g],s[f+g],r.position-(a[f]-a[f+g]),p);l+=e.repeat(" ",i.indent)+u((r.line+g+1).toString(),b)+" | "+k.str+`
`}return l.replace(/\n$/,"")}return Fu=t,Fu}var Tu,rr;function te(){if(rr)return Tu;rr=1;const e=Tn(),n=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],u=["scalar","sequence","mapping"];function t(i){const c={};return i!==null&&Object.keys(i).forEach(function(a){i[a].forEach(function(s){c[String(s)]=a})}),c}function r(i,c){if(c=c||{},Object.keys(c).forEach(function(a){if(n.indexOf(a)===-1)throw new e('Unknown option "'+a+'" is met in definition of "'+i+'" YAML type.')}),this.options=c,this.tag=i,this.kind=c.kind||null,this.resolve=c.resolve||function(){return!0},this.construct=c.construct||function(a){return a},this.instanceOf=c.instanceOf||null,this.predicate=c.predicate||null,this.represent=c.represent||null,this.representName=c.representName||null,this.defaultStyle=c.defaultStyle||null,this.multi=c.multi||!1,this.styleAliases=t(c.styleAliases||null),u.indexOf(this.kind)===-1)throw new e('Unknown kind "'+this.kind+'" is specified for "'+i+'" YAML type.')}return Tu=r,Tu}var Mu,or;function mo(){if(or)return Mu;or=1;const e=Tn(),n=te();function u(i,c){const a=[];return i[c].forEach(function(s){let d=a.length;a.forEach(function(f,l){f.tag===s.tag&&f.kind===s.kind&&f.multi===s.multi&&(d=l)}),a[d]=s}),a}function t(){const i={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function c(a){a.multi?(i.multi[a.kind].push(a),i.multi.fallback.push(a)):i[a.kind][a.tag]=i.fallback[a.tag]=a}for(let a=0,s=arguments.length;a<s;a+=1)arguments[a].forEach(c);return i}function r(i){return this.extend(i)}return r.prototype.extend=function(c){let a=[],s=[];if(c instanceof n)s.push(c);else if(Array.isArray(c))s=s.concat(c);else if(c&&(Array.isArray(c.implicit)||Array.isArray(c.explicit)))c.implicit&&(a=a.concat(c.implicit)),c.explicit&&(s=s.concat(c.explicit));else throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");a.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),s.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const d=Object.create(r.prototype);return d.implicit=(this.implicit||[]).concat(a),d.explicit=(this.explicit||[]).concat(s),d.compiledImplicit=u(d,"implicit"),d.compiledExplicit=u(d,"explicit"),d.compiledTypeMap=t(d.compiledImplicit,d.compiledExplicit),d},Mu=r,Mu}var Iu,ir;function go(){if(ir)return Iu;ir=1;const e=te();return Iu=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),Iu}var Ru,ar;function ko(){if(ar)return Ru;ar=1;const e=te();return Ru=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),Ru}var Lu,cr;function yo(){if(cr)return Lu;cr=1;const e=te();return Lu=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),Lu}var Ou,lr;function xo(){if(lr)return Ou;lr=1;const e=mo();return Ou=new e({explicit:[go(),ko(),yo()]}),Ou}var Nu,sr;function wo(){if(sr)return Nu;sr=1;const e=te();function n(r){if(r===null)return!0;const i=r.length;return i===1&&r==="~"||i===4&&(r==="null"||r==="Null"||r==="NULL")}function u(){return null}function t(r){return r===null}return Nu=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:n,construct:u,predicate:t,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),Nu}var zu,dr;function vo(){if(dr)return zu;dr=1;const e=te();function n(r){if(r===null)return!1;const i=r.length;return i===4&&(r==="true"||r==="True"||r==="TRUE")||i===5&&(r==="false"||r==="False"||r==="FALSE")}function u(r){return r==="true"||r==="True"||r==="TRUE"}function t(r){return Object.prototype.toString.call(r)==="[object Boolean]"}return zu=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:n,construct:u,predicate:t,represent:{lowercase:function(r){return r?"true":"false"},uppercase:function(r){return r?"TRUE":"FALSE"},camelcase:function(r){return r?"True":"False"}},defaultStyle:"lowercase"}),zu}var qu,fr;function Co(){if(fr)return qu;fr=1;const e=Fn(),n=te();function u(d){return d>=48&&d<=57||d>=65&&d<=70||d>=97&&d<=102}function t(d){return d>=48&&d<=55}function r(d){return d>=48&&d<=57}function i(d){if(d===null)return!1;const f=d.length;let l=0,b=!1;if(!f)return!1;let p=d[l];if((p==="-"||p==="+")&&(p=d[++l]),p==="0"){if(l+1===f)return!0;if(p=d[++l],p==="b"){for(l++;l<f;l++){if(p=d[l],p!=="0"&&p!=="1")return!1;b=!0}return b&&isFinite(c(d))}if(p==="x"){for(l++;l<f;l++){if(!u(d.charCodeAt(l)))return!1;b=!0}return b&&isFinite(c(d))}if(p==="o"){for(l++;l<f;l++){if(!t(d.charCodeAt(l)))return!1;b=!0}return b&&isFinite(c(d))}}for(;l<f;l++){if(!r(d.charCodeAt(l)))return!1;b=!0}return b?isFinite(c(d)):!1}function c(d){let f=d,l=1,b=f[0];if((b==="-"||b==="+")&&(b==="-"&&(l=-1),f=f.slice(1),b=f[0]),f==="0")return 0;if(b==="0"){if(f[1]==="b")return l*parseInt(f.slice(2),2);if(f[1]==="x")return l*parseInt(f.slice(2),16);if(f[1]==="o")return l*parseInt(f.slice(2),8)}return l*parseInt(f,10)}function a(d){return c(d)}function s(d){return Object.prototype.toString.call(d)==="[object Number]"&&d%1===0&&!e.isNegativeZero(d)}return qu=new n("tag:yaml.org,2002:int",{kind:"scalar",resolve:i,construct:a,predicate:s,represent:{binary:function(d){return d>=0?"0b"+d.toString(2):"-0b"+d.toString(2).slice(1)},octal:function(d){return d>=0?"0o"+d.toString(8):"-0o"+d.toString(8).slice(1)},decimal:function(d){return d.toString(10)},hexadecimal:function(d){return d>=0?"0x"+d.toString(16).toUpperCase():"-0x"+d.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),qu}var Pu,hr;function _o(){if(hr)return Pu;hr=1;const e=Fn(),n=te(),u=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),t=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function r(d){return d===null||!u.test(d)?!1:isFinite(parseFloat(d,10))?!0:t.test(d)}function i(d){let f=d.toLowerCase();const l=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?l===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:l*parseFloat(f,10)}const c=/^[-+]?[0-9]+e/;function a(d,f){if(isNaN(d))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===d)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===d)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(d))return"-0.0";const l=d.toString(10);return c.test(l)?l.replace("e",".e"):l}function s(d){return Object.prototype.toString.call(d)==="[object Number]"&&(d%1!==0||e.isNegativeZero(d))}return Pu=new n("tag:yaml.org,2002:float",{kind:"scalar",resolve:r,construct:i,predicate:s,represent:a,defaultStyle:"lowercase"}),Pu}var Bu,pr;function Eo(){return pr||(pr=1,Bu=xo().extend({implicit:[wo(),vo(),Co(),_o()]})),Bu}var ju,br;function Ao(){return br||(br=1,ju=Eo()),ju}var Hu,mr;function Do(){if(mr)return Hu;mr=1;const e=te(),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),u=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function t(c){return c===null?!1:n.exec(c)!==null||u.exec(c)!==null}function r(c){let a=0,s=null,d=n.exec(c);if(d===null&&(d=u.exec(c)),d===null)throw new Error("Date resolve error");const f=+d[1],l=+d[2]-1,b=+d[3];if(!d[4])return new Date(Date.UTC(f,l,b));const p=+d[4],m=+d[5],g=+d[6];if(d[7]){for(a=d[7].slice(0,3);a.length<3;)a+="0";a=+a}if(d[9]){const v=+d[10],w=+(d[11]||0);s=(v*60+w)*6e4,d[9]==="-"&&(s=-s)}const k=new Date(Date.UTC(f,l,b,p,m,g,a));return s&&k.setTime(k.getTime()-s),k}function i(c){return c.toISOString()}return Hu=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:t,construct:r,instanceOf:Date,represent:i}),Hu}var $u,gr;function So(){if(gr)return $u;gr=1;const e=te();function n(u){return u==="<<"||u===null}return $u=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:n}),$u}var Uu,kr;function Fo(){if(kr)return Uu;kr=1;const e=te(),n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function u(c){if(c===null)return!1;let a=0;const s=c.length,d=n;for(let f=0;f<s;f++){const l=d.indexOf(c.charAt(f));if(!(l>64)){if(l<0)return!1;a+=6}}return a%8===0}function t(c){const a=c.replace(/[\r\n=]/g,""),s=a.length,d=n;let f=0;const l=[];for(let p=0;p<s;p++)p%4===0&&p&&(l.push(f>>16&255),l.push(f>>8&255),l.push(f&255)),f=f<<6|d.indexOf(a.charAt(p));const b=s%4*6;return b===0?(l.push(f>>16&255),l.push(f>>8&255),l.push(f&255)):b===18?(l.push(f>>10&255),l.push(f>>2&255)):b===12&&l.push(f>>4&255),new Uint8Array(l)}function r(c){let a="",s=0;const d=c.length,f=n;for(let b=0;b<d;b++)b%3===0&&b&&(a+=f[s>>18&63],a+=f[s>>12&63],a+=f[s>>6&63],a+=f[s&63]),s=(s<<8)+c[b];const l=d%3;return l===0?(a+=f[s>>18&63],a+=f[s>>12&63],a+=f[s>>6&63],a+=f[s&63]):l===2?(a+=f[s>>10&63],a+=f[s>>4&63],a+=f[s<<2&63],a+=f[64]):l===1&&(a+=f[s>>2&63],a+=f[s<<4&63],a+=f[64],a+=f[64]),a}function i(c){return Object.prototype.toString.call(c)==="[object Uint8Array]"}return Uu=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:u,construct:t,predicate:i,represent:r}),Uu}var Gu,yr;function To(){if(yr)return Gu;yr=1;const e=te(),n=Object.prototype.hasOwnProperty,u=Object.prototype.toString;function t(i){if(i===null)return!0;const c=[],a=i;for(let s=0,d=a.length;s<d;s+=1){const f=a[s];let l=!1;if(u.call(f)!=="[object Object]")return!1;let b;for(b in f)if(n.call(f,b))if(!l)l=!0;else return!1;if(!l)return!1;if(c.indexOf(b)===-1)c.push(b);else return!1}return!0}function r(i){return i!==null?i:[]}return Gu=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:t,construct:r}),Gu}var Vu,xr;function Mo(){if(xr)return Vu;xr=1;const e=te(),n=Object.prototype.toString;function u(r){if(r===null)return!0;const i=r,c=new Array(i.length);for(let a=0,s=i.length;a<s;a+=1){const d=i[a];if(n.call(d)!=="[object Object]")return!1;const f=Object.keys(d);if(f.length!==1)return!1;c[a]=[f[0],d[f[0]]]}return!0}function t(r){if(r===null)return[];const i=r,c=new Array(i.length);for(let a=0,s=i.length;a<s;a+=1){const d=i[a],f=Object.keys(d);c[a]=[f[0],d[f[0]]]}return c}return Vu=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:u,construct:t}),Vu}var Zu,wr;function Io(){if(wr)return Zu;wr=1;const e=te(),n=Object.prototype.hasOwnProperty;function u(r){if(r===null)return!0;const i=r;for(const c in i)if(n.call(i,c)&&i[c]!==null)return!1;return!0}function t(r){return r!==null?r:{}}return Zu=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:u,construct:t}),Zu}var Wu,vr;function xt(){return vr||(vr=1,Wu=Ao().extend({implicit:[Do(),So()],explicit:[Fo(),To(),Mo(),Io()]})),Wu}var Cr;function xl(){if(Cr)return Gn;Cr=1;const e=Fn(),n=Tn(),u=yl(),t=xt(),r=Object.prototype.hasOwnProperty,i=1,c=2,a=3,s=4,d=1,f=2,l=3,b=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,p=/[\x85\u2028\u2029]/,m=/[,\[\]{}]/,g=/^(?:!|!!|![0-9A-Za-z-]+!)$/,k=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function v(o){return Object.prototype.toString.call(o)}function w(o){return o===10||o===13}function _(o){return o===9||o===32}function A(o){return o===9||o===32||o===10||o===13}function L(o){return o===44||o===91||o===93||o===123||o===125}function q(o){if(o>=48&&o<=57)return o-48;const y=o|32;return y>=97&&y<=102?y-97+10:-1}function j(o){return o===120?2:o===117?4:o===85?8:0}function $(o){return o>=48&&o<=57?o-48:-1}function W(o){switch(o){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function se(o){return o<=65535?String.fromCharCode(o):String.fromCharCode((o-65536>>10)+55296,(o-65536&1023)+56320)}function xe(o,y,E){y==="__proto__"?Object.defineProperty(o,y,{configurable:!0,enumerable:!0,writable:!0,value:E}):o[y]=E}const He=new Array(256),Le=new Array(256);for(let o=0;o<256;o++)He[o]=W(o)?1:0,Le[o]=W(o);function J(o,y){this.input=o,this.filename=y.filename||null,this.schema=y.schema||t,this.onWarning=y.onWarning||null,this.legacy=y.legacy||!1,this.json=y.json||!1,this.listener=y.listener||null,this.maxDepth=typeof y.maxDepth=="number"?y.maxDepth:100,this.maxTotalMergeKeys=typeof y.maxTotalMergeKeys=="number"?y.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=o.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function de(o,y){const E={name:o.filename,buffer:o.input.slice(0,-1),position:o.position,line:o.line,column:o.position-o.lineStart};return E.snippet=u(E),new n(y,E)}function z(o,y){throw de(o,y)}function $e(o,y){o.onWarning&&o.onWarning.call(null,de(o,y))}function we(o,y,E){const F=o.anchorMapTransactions;if(F.length!==0){const C=F[F.length-1];r.call(C,y)||(C[y]={existed:r.call(o.anchorMap,y),value:o.anchorMap[y]})}o.anchorMap[y]=E}function fu(o){o.anchorMapTransactions.push(Object.create(null))}function Oe(o){const y=o.anchorMapTransactions.pop(),E=o.anchorMapTransactions;if(E.length===0)return;const F=E[E.length-1],C=Object.keys(y);for(let R=0,h=C.length;R<h;R+=1){const x=C[R];r.call(F,x)||(F[x]=y[x])}}function hu(o){const y=o.anchorMapTransactions.pop(),E=Object.keys(y);for(let F=E.length-1;F>=0;F-=1){const C=y[E[F]];C.existed?o.anchorMap[E[F]]=C.value:delete o.anchorMap[E[F]]}}function cn(o){return{position:o.position,line:o.line,lineStart:o.lineStart,lineIndent:o.lineIndent,firstTabInLine:o.firstTabInLine,tag:o.tag,anchor:o.anchor,kind:o.kind,result:o.result}}function Ue(o,y){o.position=y.position,o.line=y.line,o.lineStart=y.lineStart,o.lineIndent=y.lineIndent,o.firstTabInLine=y.firstTabInLine,o.tag=y.tag,o.anchor=y.anchor,o.kind=y.kind,o.result=y.result}const Rn={YAML:function(y,E,F){y.version!==null&&z(y,"duplication of %YAML directive"),F.length!==1&&z(y,"YAML directive accepts exactly one argument");const C=/^([0-9]+)\.([0-9]+)$/.exec(F[0]);C===null&&z(y,"ill-formed argument of the YAML directive");const R=parseInt(C[1],10),h=parseInt(C[2],10);R!==1&&z(y,"unacceptable YAML version of the document"),y.version=F[0],y.checkLineBreaks=h<2,h!==1&&h!==2&&$e(y,"unsupported YAML version of the document")},TAG:function(y,E,F){let C;F.length!==2&&z(y,"TAG directive accepts exactly two arguments");const R=F[0];C=F[1],g.test(R)||z(y,"ill-formed tag handle (first argument) of the TAG directive"),r.call(y.tagMap,R)&&z(y,'there is a previously declared suffix for "'+R+'" tag handle'),k.test(C)||z(y,"ill-formed tag prefix (second argument) of the TAG directive");try{C=decodeURIComponent(C)}catch{z(y,"tag prefix is malformed: "+C)}y.tagMap[R]=C}};function oe(o,y,E,F){if(y<E){const C=o.input.slice(y,E);if(F)for(let R=0,h=C.length;R<h;R+=1){const x=C.charCodeAt(R);x===9||x>=32&&x<=1114111||z(o,"expected valid JSON character")}else b.test(C)&&z(o,"the stream contains non-printable characters");o.result+=C}}function Se(o,y,E,F){e.isObject(E)||z(o,"cannot merge mappings; the provided source object is unacceptable");const C=Object.keys(E);for(let R=0,h=C.length;R<h;R+=1){const x=C[R];o.maxTotalMergeKeys!==-1&&++o.totalMergeKeys>o.maxTotalMergeKeys&&z(o,"merge keys exceeded maxTotalMergeKeys ("+o.maxTotalMergeKeys+")"),r.call(y,x)||(xe(y,x,E[x]),F[x]=!0)}}function ve(o,y,E,F,C,R,h,x,M){if(Array.isArray(C)){C=Array.prototype.slice.call(C);for(let D=0,S=C.length;D<S;D+=1)Array.isArray(C[D])&&z(o,"nested arrays are not supported inside keys"),typeof C=="object"&&v(C[D])==="[object Object]"&&(C[D]="[object Object]")}if(typeof C=="object"&&v(C)==="[object Object]"&&(C="[object Object]"),C=String(C),y===null&&(y={}),F==="tag:yaml.org,2002:merge")if(Array.isArray(R))for(let D=0,S=R.length;D<S;D+=1)Se(o,y,R[D],E);else Se(o,y,R,E);else!o.json&&!r.call(E,C)&&r.call(y,C)&&(o.line=h||o.line,o.lineStart=x||o.lineStart,o.position=M||o.position,z(o,"duplicated mapping key")),xe(y,C,R),delete E[C];return y}function Ge(o){const y=o.input.charCodeAt(o.position);y===10?o.position++:y===13?(o.position++,o.input.charCodeAt(o.position)===10&&o.position++):z(o,"a line break is expected"),o.line+=1,o.lineStart=o.position,o.firstTabInLine=-1}function Y(o,y,E){let F=0,C=o.input.charCodeAt(o.position);for(;C!==0;){for(;_(C);)C===9&&o.firstTabInLine===-1&&(o.firstTabInLine=o.position),C=o.input.charCodeAt(++o.position);if(y&&C===35)do C=o.input.charCodeAt(++o.position);while(C!==10&&C!==13&&C!==0);if(w(C))for(Ge(o),C=o.input.charCodeAt(o.position),F++,o.lineIndent=0;C===32;)o.lineIndent++,C=o.input.charCodeAt(++o.position);else break}return E!==-1&&F!==0&&o.lineIndent<E&&$e(o,"deficient indentation"),F}function Ve(o){let y=o.position,E=o.input.charCodeAt(y);return!!((E===45||E===46)&&E===o.input.charCodeAt(y+1)&&E===o.input.charCodeAt(y+2)&&(y+=3,E=o.input.charCodeAt(y),E===0||A(E)))}function Ce(o,y){y===1?o.result+=" ":y>1&&(o.result+=e.repeat(`
`,y-1))}function Ln(o,y,E){let F,C,R,h,x,M;const D=o.kind,S=o.result;let I=o.input.charCodeAt(o.position);if(A(I)||L(I)||I===35||I===38||I===42||I===33||I===124||I===62||I===39||I===34||I===37||I===64||I===96)return!1;if(I===63||I===45){const T=o.input.charCodeAt(o.position+1);if(A(T)||E&&L(T))return!1}for(o.kind="scalar",o.result="",F=C=o.position,R=!1;I!==0;){if(I===58){const T=o.input.charCodeAt(o.position+1);if(A(T)||E&&L(T))break}else if(I===35){const T=o.input.charCodeAt(o.position-1);if(A(T))break}else{if(o.position===o.lineStart&&Ve(o)||E&&L(I))break;if(w(I))if(h=o.line,x=o.lineStart,M=o.lineIndent,Y(o,!1,-1),o.lineIndent>=y){R=!0,I=o.input.charCodeAt(o.position);continue}else{o.position=C,o.line=h,o.lineStart=x,o.lineIndent=M;break}}R&&(oe(o,F,C,!1),Ce(o,o.line-h),F=C=o.position,R=!1),_(I)||(C=o.position+1),I=o.input.charCodeAt(++o.position)}return oe(o,F,C,!1),o.result?!0:(o.kind=D,o.result=S,!1)}function On(o,y){let E,F,C=o.input.charCodeAt(o.position);if(C!==39)return!1;for(o.kind="scalar",o.result="",o.position++,E=F=o.position;(C=o.input.charCodeAt(o.position))!==0;)if(C===39)if(oe(o,E,o.position,!0),C=o.input.charCodeAt(++o.position),C===39)E=o.position,o.position++,F=o.position;else return!0;else w(C)?(oe(o,E,F,!0),Ce(o,Y(o,!1,y)),E=F=o.position):o.position===o.lineStart&&Ve(o)?z(o,"unexpected end of the document within a single quoted scalar"):(o.position++,_(C)||(F=o.position));z(o,"unexpected end of the stream within a single quoted scalar")}function ln(o,y){let E,F,C,R=o.input.charCodeAt(o.position);if(R!==34)return!1;for(o.kind="scalar",o.result="",o.position++,E=F=o.position;(R=o.input.charCodeAt(o.position))!==0;){if(R===34)return oe(o,E,o.position,!0),o.position++,!0;if(R===92){if(oe(o,E,o.position,!0),R=o.input.charCodeAt(++o.position),w(R))Y(o,!1,y);else if(R<256&&He[R])o.result+=Le[R],o.position++;else if((C=j(R))>0){let h=C,x=0;for(;h>0;h--)R=o.input.charCodeAt(++o.position),(C=q(R))>=0?x=(x<<4)+C:z(o,"expected hexadecimal character");o.result+=se(x),o.position++}else z(o,"unknown escape sequence");E=F=o.position}else w(R)?(oe(o,E,F,!0),Ce(o,Y(o,!1,y)),E=F=o.position):o.position===o.lineStart&&Ve(o)?z(o,"unexpected end of the document within a double quoted scalar"):(o.position++,_(R)||(F=o.position))}z(o,"unexpected end of the stream within a double quoted scalar")}function Nn(o,y){let E=!0,F,C,R;const h=o.tag;let x;const M=o.anchor;let D,S,I,T;const N=Object.create(null);let O,P,B,U=o.input.charCodeAt(o.position);if(U===91)D=93,T=!1,x=[];else if(U===123)D=125,T=!0,x={};else return!1;for(o.anchor!==null&&we(o,o.anchor,x),U=o.input.charCodeAt(++o.position);U!==0;){if(Y(o,!0,y),U=o.input.charCodeAt(o.position),U===D)return o.position++,o.tag=h,o.anchor=M,o.kind=T?"mapping":"sequence",o.result=x,!0;if(E?U===44&&z(o,"expected the node content, but found ','"):z(o,"missed comma between flow collection entries"),P=O=B=null,S=I=!1,U===63){const V=o.input.charCodeAt(o.position+1);A(V)&&(S=I=!0,o.position++,Y(o,!0,y))}F=o.line,C=o.lineStart,R=o.position,Ee(o,y,i,!1,!0),P=o.tag,O=o.result,Y(o,!0,y),U=o.input.charCodeAt(o.position),(I||o.line===F)&&U===58&&(S=!0,U=o.input.charCodeAt(++o.position),Y(o,!0,y),Ee(o,y,i,!1,!0),B=o.result),T?ve(o,x,N,P,O,B,F,C,R):S?x.push(ve(o,null,N,P,O,B,F,C,R)):x.push(O),Y(o,!0,y),U=o.input.charCodeAt(o.position),U===44?(E=!0,U=o.input.charCodeAt(++o.position)):E=!1}z(o,"unexpected end of the stream within a flow collection")}function zn(o,y){let E,F=d,C=!1,R=!1,h=y,x=0,M=!1,D,S=o.input.charCodeAt(o.position);if(S===124)E=!1;else if(S===62)E=!0;else return!1;for(o.kind="scalar",o.result="";S!==0;)if(S=o.input.charCodeAt(++o.position),S===43||S===45)d===F?F=S===43?l:f:z(o,"repeat of a chomping mode identifier");else if((D=$(S))>=0)D===0?z(o,"bad explicit indentation width of a block scalar; it cannot be less than one"):R?z(o,"repeat of an indentation width identifier"):(h=y+D-1,R=!0);else break;if(_(S)){do S=o.input.charCodeAt(++o.position);while(_(S));if(S===35)do S=o.input.charCodeAt(++o.position);while(!w(S)&&S!==0)}for(;S!==0;){for(Ge(o),o.lineIndent=0,S=o.input.charCodeAt(o.position);(!R||o.lineIndent<h)&&S===32;)o.lineIndent++,S=o.input.charCodeAt(++o.position);if(!R&&o.lineIndent>h&&(h=o.lineIndent),w(S)){x++;continue}if(!R&&h===0&&z(o,"missing indentation for block scalar"),o.lineIndent<h){F===l?o.result+=e.repeat(`
`,C?1+x:x):F===d&&C&&(o.result+=`
`);break}E?_(S)?(M=!0,o.result+=e.repeat(`
`,C?1+x:x)):M?(M=!1,o.result+=e.repeat(`
`,x+1)):x===0?C&&(o.result+=" "):o.result+=e.repeat(`
`,x):o.result+=e.repeat(`
`,C?1+x:x),C=!0,R=!0,x=0;const I=o.position;for(;!w(S)&&S!==0;)S=o.input.charCodeAt(++o.position);oe(o,I,o.position,!1)}return!0}function _e(o,y){const E=o.tag,F=o.anchor,C=[];let R=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&we(o,o.anchor,C);let h=o.input.charCodeAt(o.position);for(;h!==0&&(o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,z(o,"tab characters must not be used in indentation")),h===45);){const x=o.input.charCodeAt(o.position+1);if(!A(x))break;if(R=!0,o.position++,Y(o,!0,-1)&&o.lineIndent<=y){C.push(null),h=o.input.charCodeAt(o.position);continue}const M=o.line;if(Ee(o,y,a,!1,!0),C.push(o.result),Y(o,!0,-1),h=o.input.charCodeAt(o.position),(o.line===M||o.lineIndent>y)&&h!==0)z(o,"bad indentation of a sequence entry");else if(o.lineIndent<y)break}return R?(o.tag=E,o.anchor=F,o.kind="sequence",o.result=C,!0):!1}function qn(o,y,E){let F,C,R,h;const x=o.tag,M=o.anchor,D={},S=Object.create(null);let I=null,T=null,N=null,O=!1,P=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&we(o,o.anchor,D);let B=o.input.charCodeAt(o.position);for(;B!==0;){!O&&o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,z(o,"tab characters must not be used in indentation"));const U=o.input.charCodeAt(o.position+1),V=o.line;if((B===63||B===58)&&A(U))B===63?(O&&(ve(o,D,S,I,T,null,C,R,h),I=T=N=null),P=!0,O=!0,F=!0):O?(O=!1,F=!0):z(o,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),o.position+=1,B=U;else{if(C=o.line,R=o.lineStart,h=o.position,!Ee(o,E,c,!1,!0))break;if(o.line===V){for(B=o.input.charCodeAt(o.position);_(B);)B=o.input.charCodeAt(++o.position);if(B===58)B=o.input.charCodeAt(++o.position),A(B)||z(o,"a whitespace character is expected after the key-value separator within a block mapping"),O&&(ve(o,D,S,I,T,null,C,R,h),I=T=N=null),P=!0,O=!1,F=!1,I=o.tag,T=o.result;else if(P)z(o,"can not read an implicit mapping pair; a colon is missed");else return o.tag=x,o.anchor=M,!0}else if(P)z(o,"can not read a block mapping entry; a multiline key may not be an implicit key");else return o.tag=x,o.anchor=M,!0}if((o.line===V||o.lineIndent>y)&&(O&&(C=o.line,R=o.lineStart,h=o.position),Ee(o,y,s,!0,F)&&(O?T=o.result:N=o.result),O||(ve(o,D,S,I,T,N,C,R,h),I=T=N=null),Y(o,!0,-1),B=o.input.charCodeAt(o.position)),(o.line===V||o.lineIndent>y)&&B!==0)z(o,"bad indentation of a mapping entry");else if(o.lineIndent<y)break}return O&&ve(o,D,S,I,T,null,C,R,h),P&&(o.tag=x,o.anchor=M,o.kind="mapping",o.result=D),P}function pu(o){let y=!1,E=!1,F,C,R=o.input.charCodeAt(o.position);if(R!==33)return!1;o.tag!==null&&z(o,"duplication of a tag property"),R=o.input.charCodeAt(++o.position),R===60?(y=!0,R=o.input.charCodeAt(++o.position)):R===33?(E=!0,F="!!",R=o.input.charCodeAt(++o.position)):F="!";let h=o.position;if(y){do R=o.input.charCodeAt(++o.position);while(R!==0&&R!==62);o.position<o.length?(C=o.input.slice(h,o.position),R=o.input.charCodeAt(++o.position)):z(o,"unexpected end of the stream within a verbatim tag")}else{for(;R!==0&&!A(R);)R===33&&(E?z(o,"tag suffix cannot contain exclamation marks"):(F=o.input.slice(h-1,o.position+1),g.test(F)||z(o,"named tag handle cannot contain such characters"),E=!0,h=o.position+1)),R=o.input.charCodeAt(++o.position);C=o.input.slice(h,o.position),m.test(C)&&z(o,"tag suffix cannot contain flow indicator characters")}C&&!k.test(C)&&z(o,"tag name cannot contain such characters: "+C);try{C=decodeURIComponent(C)}catch{z(o,"tag name is malformed: "+C)}return y?o.tag=C:r.call(o.tagMap,F)?o.tag=o.tagMap[F]+C:F==="!"?o.tag="!"+C:F==="!!"?o.tag="tag:yaml.org,2002:"+C:z(o,'undeclared tag handle "'+F+'"'),!0}function Pn(o){let y=o.input.charCodeAt(o.position);if(y!==38)return!1;o.anchor!==null&&z(o,"duplication of an anchor property"),y=o.input.charCodeAt(++o.position);const E=o.position;for(;y!==0&&!A(y)&&!L(y);)y=o.input.charCodeAt(++o.position);return o.position===E&&z(o,"name of an anchor node must contain at least one character"),o.anchor=o.input.slice(E,o.position),!0}function Bn(o){let y=o.input.charCodeAt(o.position);if(y!==42)return!1;y=o.input.charCodeAt(++o.position);const E=o.position;for(;y!==0&&!A(y)&&!L(y);)y=o.input.charCodeAt(++o.position);o.position===E&&z(o,"name of an alias node must contain at least one character");const F=o.input.slice(E,o.position);return r.call(o.anchorMap,F)||z(o,'unidentified alias "'+F+'"'),o.result=o.anchorMap[F],Y(o,!0,-1),!0}function bu(o,y,E,F){const C=cn(o);return fu(o),Ue(o,y),o.tag=null,o.anchor=null,o.kind=null,o.result=null,qn(o,E,F)&&o.kind==="mapping"?(Oe(o),!0):(hu(o),Ue(o,C),!1)}function Ee(o,y,E,F,C){let R,h,x=1,M=!1,D=!1,S=null,I,T,N;o.depth>=o.maxDepth&&z(o,"nesting exceeded maxDepth ("+o.maxDepth+")"),o.depth+=1,o.listener!==null&&o.listener("open",o),o.tag=null,o.anchor=null,o.kind=null,o.result=null;const O=R=h=s===E||a===E;if(F&&Y(o,!0,-1)&&(M=!0,o.lineIndent>y?x=1:o.lineIndent===y?x=0:o.lineIndent<y&&(x=-1)),x===1)for(;;){const P=o.input.charCodeAt(o.position),B=cn(o);if(M&&(P===33&&o.tag!==null||P===38&&o.anchor!==null)||!pu(o)&&!Pn(o))break;S===null&&(S=B),Y(o,!0,-1)?(M=!0,h=O,o.lineIndent>y?x=1:o.lineIndent===y?x=0:o.lineIndent<y&&(x=-1)):h=!1}if(h&&(h=M||C),x===1||s===E)if(i===E||c===E?T=y:T=y+1,N=o.position-o.lineStart,x===1)if(h&&(_e(o,N)||qn(o,N,T))||Nn(o,T))D=!0;else{const P=o.input.charCodeAt(o.position);S!==null&&O&&!h&&P!==124&&P!==62&&bu(o,S,S.position-S.lineStart,T)||R&&zn(o,T)||On(o,T)||ln(o,T)?D=!0:Bn(o)?(D=!0,(o.tag!==null||o.anchor!==null)&&z(o,"alias node should not have any properties")):Ln(o,T,i===E)&&(D=!0,o.tag===null&&(o.tag="?")),o.anchor!==null&&we(o,o.anchor,o.result)}else x===0&&(D=h&&_e(o,N));if(o.tag===null)o.anchor!==null&&we(o,o.anchor,o.result);else if(o.tag==="?"){o.result!==null&&o.kind!=="scalar"&&z(o,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+o.kind+'"');for(let P=0,B=o.implicitTypes.length;P<B;P+=1)if(I=o.implicitTypes[P],I.resolve(o.result)){o.result=I.construct(o.result),o.tag=I.tag,o.anchor!==null&&we(o,o.anchor,o.result);break}}else if(o.tag!=="!"){if(r.call(o.typeMap[o.kind||"fallback"],o.tag))I=o.typeMap[o.kind||"fallback"][o.tag];else{I=null;const P=o.typeMap.multi[o.kind||"fallback"];for(let B=0,U=P.length;B<U;B+=1)if(o.tag.slice(0,P[B].tag.length)===P[B].tag){I=P[B];break}}I||z(o,"unknown tag !<"+o.tag+">"),o.result!==null&&I.kind!==o.kind&&z(o,"unacceptable node kind for !<"+o.tag+'> tag; it should be "'+I.kind+'", not "'+o.kind+'"'),I.resolve(o.result,o.tag)?(o.result=I.construct(o.result,o.tag),o.anchor!==null&&we(o,o.anchor,o.result)):z(o,"cannot resolve a node with !<"+o.tag+"> explicit tag")}return o.listener!==null&&o.listener("close",o),o.depth-=1,o.tag!==null||o.anchor!==null||D}function mu(o){const y=o.position;let E=!1,F;for(o.version=null,o.checkLineBreaks=o.legacy,o.tagMap=Object.create(null),o.anchorMap=Object.create(null);(F=o.input.charCodeAt(o.position))!==0&&(Y(o,!0,-1),F=o.input.charCodeAt(o.position),!(o.lineIndent>0||F!==37));){E=!0,F=o.input.charCodeAt(++o.position);let C=o.position;for(;F!==0&&!A(F);)F=o.input.charCodeAt(++o.position);const R=o.input.slice(C,o.position),h=[];for(R.length<1&&z(o,"directive name must not be less than one character in length");F!==0;){for(;_(F);)F=o.input.charCodeAt(++o.position);if(F===35){do F=o.input.charCodeAt(++o.position);while(F!==0&&!w(F));break}if(w(F))break;for(C=o.position;F!==0&&!A(F);)F=o.input.charCodeAt(++o.position);h.push(o.input.slice(C,o.position))}F!==0&&Ge(o),r.call(Rn,R)?Rn[R](o,R,h):$e(o,'unknown document directive "'+R+'"')}if(Y(o,!0,-1),o.lineIndent===0&&o.input.charCodeAt(o.position)===45&&o.input.charCodeAt(o.position+1)===45&&o.input.charCodeAt(o.position+2)===45?(o.position+=3,Y(o,!0,-1)):E&&z(o,"directives end mark is expected"),Ee(o,o.lineIndent-1,s,!1,!0),Y(o,!0,-1),o.checkLineBreaks&&p.test(o.input.slice(y,o.position))&&$e(o,"non-ASCII line breaks are interpreted as content"),o.documents.push(o.result),o.position===o.lineStart&&Ve(o)){o.input.charCodeAt(o.position)===46&&(o.position+=3,Y(o,!0,-1));return}o.position<o.length-1&&z(o,"end of the stream or a document separator is expected")}function jn(o,y){o=String(o),y=y||{},o.length!==0&&(o.charCodeAt(o.length-1)!==10&&o.charCodeAt(o.length-1)!==13&&(o+=`
`),o.charCodeAt(0)===65279&&(o=o.slice(1)));const E=new J(o,y),F=o.indexOf("\0");for(F!==-1&&(E.position=F,z(E,"null byte is not allowed in input")),E.input+="\0";E.input.charCodeAt(E.position)===32;)E.lineIndent+=1,E.position+=1;for(;E.position<E.length-1;)mu(E);return E.documents}function Hn(o,y,E){y!==null&&typeof y=="object"&&typeof E>"u"&&(E=y,y=null);const F=jn(o,E);if(typeof y!="function")return F;for(let C=0,R=F.length;C<R;C+=1)y(F[C])}function gu(o,y){const E=jn(o,y);if(E.length!==0){if(E.length===1)return E[0];throw new n("expected a single document in the stream, but found more")}}return Gn.loadAll=Hn,Gn.load=gu,Gn}var Yu={},_r;function wl(){if(_r)return Yu;_r=1;const e=Fn(),n=Tn(),u=xt(),t=Object.prototype.toString,r=Object.prototype.hasOwnProperty,i=65279,c=9,a=10,s=13,d=32,f=33,l=34,b=35,p=37,m=38,g=39,k=42,v=44,w=45,_=58,A=61,L=62,q=63,j=64,$=91,W=93,se=96,xe=123,He=124,Le=125,J={};J[0]="\\0",J[7]="\\a",J[8]="\\b",J[9]="\\t",J[10]="\\n",J[11]="\\v",J[12]="\\f",J[13]="\\r",J[27]="\\e",J[34]='\\"',J[92]="\\\\",J[133]="\\N",J[160]="\\_",J[8232]="\\L",J[8233]="\\P";const de=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],z=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function $e(h,x){if(x===null)return{};const M={},D=Object.keys(x);for(let S=0,I=D.length;S<I;S+=1){let T=D[S],N=String(x[T]);T.slice(0,2)==="!!"&&(T="tag:yaml.org,2002:"+T.slice(2));const O=h.compiledTypeMap.fallback[T];O&&r.call(O.styleAliases,N)&&(N=O.styleAliases[N]),M[T]=N}return M}function we(h){let x,M;const D=h.toString(16).toUpperCase();if(h<=255)x="x",M=2;else if(h<=65535)x="u",M=4;else if(h<=4294967295)x="U",M=8;else throw new n("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+x+e.repeat("0",M-D.length)+D}const fu=1,Oe=2;function hu(h){this.schema=h.schema||u,this.indent=Math.max(1,h.indent||2),this.noArrayIndent=h.noArrayIndent||!1,this.skipInvalid=h.skipInvalid||!1,this.flowLevel=e.isNothing(h.flowLevel)?-1:h.flowLevel,this.styleMap=$e(this.schema,h.styles||null),this.sortKeys=h.sortKeys||!1,this.lineWidth=h.lineWidth||80,this.noRefs=h.noRefs||!1,this.noCompatMode=h.noCompatMode||!1,this.condenseFlow=h.condenseFlow||!1,this.quotingType=h.quotingType==='"'?Oe:fu,this.forceQuotes=h.forceQuotes||!1,this.replacer=typeof h.replacer=="function"?h.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function cn(h,x){const M=e.repeat(" ",x);let D=0,S="";const I=h.length;for(;D<I;){let T;const N=h.indexOf(`
`,D);N===-1?(T=h.slice(D),D=I):(T=h.slice(D,N+1),D=N+1),T.length&&T!==`
`&&(S+=M),S+=T}return S}function Ue(h,x){return`
`+e.repeat(" ",h.indent*x)}function Rn(h,x){for(let M=0,D=h.implicitTypes.length;M<D;M+=1)if(h.implicitTypes[M].resolve(x))return!0;return!1}function oe(h){return h===d||h===c}function Se(h){return h>=32&&h<=126||h>=161&&h<=55295&&h!==8232&&h!==8233||h>=57344&&h<=65533&&h!==i||h>=65536&&h<=1114111}function ve(h){return Se(h)&&h!==i&&h!==s&&h!==a}function Ge(h,x,M){const D=ve(h),S=D&&!oe(h);return(M?D:D&&h!==v&&h!==$&&h!==W&&h!==xe&&h!==Le)&&h!==b&&!(x===_&&!S)||ve(x)&&!oe(x)&&h===b||x===_&&S}function Y(h){return Se(h)&&h!==i&&!oe(h)&&h!==w&&h!==q&&h!==_&&h!==v&&h!==$&&h!==W&&h!==xe&&h!==Le&&h!==b&&h!==m&&h!==k&&h!==f&&h!==He&&h!==A&&h!==L&&h!==g&&h!==l&&h!==p&&h!==j&&h!==se}function Ve(h){return!oe(h)&&h!==_}function Ce(h,x){const M=h.charCodeAt(x);let D;return M>=55296&&M<=56319&&x+1<h.length&&(D=h.charCodeAt(x+1),D>=56320&&D<=57343)?(M-55296)*1024+D-56320+65536:M}function Ln(h){return/^\n* /.test(h)}const On=1,ln=2,Nn=3,zn=4,_e=5;function qn(h,x,M,D,S,I,T,N){let O,P=0,B=null,U=!1,V=!1;const Ft=D!==-1;let sn=-1,dn=Y(Ce(h,0))&&Ve(Ce(h,h.length-1));if(x||T)for(O=0;O<h.length;P>=65536?O+=2:O++){if(P=Ce(h,O),!Se(P))return _e;dn=dn&&Ge(P,B,N),B=P}else{for(O=0;O<h.length;P>=65536?O+=2:O++){if(P=Ce(h,O),P===a)U=!0,Ft&&(V=V||O-sn-1>D&&h[sn+1]!==" ",sn=O);else if(!Se(P))return _e;dn=dn&&Ge(P,B,N),B=P}V=V||Ft&&O-sn-1>D&&h[sn+1]!==" "}return!U&&!V?dn&&!T&&!S(h)?On:I===Oe?_e:ln:M>9&&Ln(h)?_e:T?I===Oe?_e:ln:V?zn:Nn}function pu(h,x,M,D,S){h.dump=(function(){if(x.length===0)return h.quotingType===Oe?'""':"''";if(!h.noCompatMode&&(de.indexOf(x)!==-1||z.test(x)))return h.quotingType===Oe?'"'+x+'"':"'"+x+"'";const I=h.indent*Math.max(1,M),T=h.lineWidth===-1?-1:Math.max(Math.min(h.lineWidth,40),h.lineWidth-I),N=D||h.flowLevel>-1&&M>=h.flowLevel;function O(P){return Rn(h,P)}switch(qn(x,N,h.indent,T,O,h.quotingType,h.forceQuotes&&!D,S)){case On:return x;case ln:return"'"+x.replace(/'/g,"''")+"'";case Nn:return"|"+Pn(x,h.indent)+Bn(cn(x,I));case zn:return">"+Pn(x,h.indent)+Bn(cn(bu(x,T),I));case _e:return'"'+mu(x)+'"';default:throw new n("impossible error: invalid scalar style")}})()}function Pn(h,x){const M=Ln(h)?String(x):"",D=h[h.length-1]===`
`,I=D&&(h[h.length-2]===`
`||h===`
`)?"+":D?"":"-";return M+I+`
`}function Bn(h){return h[h.length-1]===`
`?h.slice(0,-1):h}function bu(h,x){const M=/(\n+)([^\n]*)/g;let D=(function(){let N=h.indexOf(`
`);return N=N!==-1?N:h.length,M.lastIndex=N,Ee(h.slice(0,N),x)})(),S=h[0]===`
`||h[0]===" ",I,T;for(;T=M.exec(h);){const N=T[1],O=T[2];I=O[0]===" ",D+=N+(!S&&!I&&O!==""?`
`:"")+Ee(O,x),S=I}return D}function Ee(h,x){if(h===""||h[0]===" ")return h;const M=/ [^ ]/g;let D,S=0,I,T=0,N=0,O="";for(;D=M.exec(h);)N=D.index,N-S>x&&(I=T>S?T:N,O+=`
`+h.slice(S,I),S=I+1),T=N;return O+=`
`,h.length-S>x&&T>S?O+=h.slice(S,T)+`
`+h.slice(T+1):O+=h.slice(S),O.slice(1)}function mu(h){let x="",M=0;for(let D=0;D<h.length;M>=65536?D+=2:D++){M=Ce(h,D);const S=J[M];!S&&Se(M)?(x+=h[D],M>=65536&&(x+=h[D+1])):x+=S||we(M)}return x}function jn(h,x,M){let D="";const S=h.tag;for(let I=0,T=M.length;I<T;I+=1){let N=M[I];h.replacer&&(N=h.replacer.call(M,String(I),N)),(E(h,x,N,!1,!1)||typeof N>"u"&&E(h,x,null,!1,!1))&&(D!==""&&(D+=","+(h.condenseFlow?"":" ")),D+=h.dump)}h.tag=S,h.dump="["+D+"]"}function Hn(h,x,M,D){let S="";const I=h.tag;for(let T=0,N=M.length;T<N;T+=1){let O=M[T];h.replacer&&(O=h.replacer.call(M,String(T),O)),(E(h,x+1,O,!0,!0,!1,!0)||typeof O>"u"&&E(h,x+1,null,!0,!0,!1,!0))&&((!D||S!=="")&&(S+=Ue(h,x)),h.dump&&a===h.dump.charCodeAt(0)?S+="-":S+="- ",S+=h.dump)}h.tag=I,h.dump=S||"[]"}function gu(h,x,M){let D="";const S=h.tag,I=Object.keys(M);for(let T=0,N=I.length;T<N;T+=1){let O="";D!==""&&(O+=", "),h.condenseFlow&&(O+='"');const P=I[T];let B=M[P];h.replacer&&(B=h.replacer.call(M,P,B)),E(h,x,P,!1,!1)&&(h.dump.length>1024&&(O+="? "),O+=h.dump+(h.condenseFlow?'"':"")+":"+(h.condenseFlow?"":" "),E(h,x,B,!1,!1)&&(O+=h.dump,D+=O))}h.tag=S,h.dump="{"+D+"}"}function o(h,x,M,D){let S="";const I=h.tag,T=Object.keys(M);if(h.sortKeys===!0)T.sort();else if(typeof h.sortKeys=="function")T.sort(h.sortKeys);else if(h.sortKeys)throw new n("sortKeys must be a boolean or a function");for(let N=0,O=T.length;N<O;N+=1){let P="";(!D||S!=="")&&(P+=Ue(h,x));const B=T[N];let U=M[B];if(h.replacer&&(U=h.replacer.call(M,B,U)),!E(h,x+1,B,!0,!0,!0))continue;const V=h.tag!==null&&h.tag!=="?"||h.dump&&h.dump.length>1024;V&&(h.dump&&a===h.dump.charCodeAt(0)?P+="?":P+="? "),P+=h.dump,V&&(P+=Ue(h,x)),E(h,x+1,U,!0,V)&&(h.dump&&a===h.dump.charCodeAt(0)?P+=":":P+=": ",P+=h.dump,S+=P)}h.tag=I,h.dump=S||"{}"}function y(h,x,M){const D=M?h.explicitTypes:h.implicitTypes;for(let S=0,I=D.length;S<I;S+=1){const T=D[S];if((T.instanceOf||T.predicate)&&(!T.instanceOf||typeof x=="object"&&x instanceof T.instanceOf)&&(!T.predicate||T.predicate(x))){if(M?T.multi&&T.representName?h.tag=T.representName(x):h.tag=T.tag:h.tag="?",T.represent){const N=h.styleMap[T.tag]||T.defaultStyle;let O;if(t.call(T.represent)==="[object Function]")O=T.represent(x,N);else if(r.call(T.represent,N))O=T.represent[N](x,N);else throw new n("!<"+T.tag+'> tag resolver accepts not "'+N+'" style');h.dump=O}return!0}}return!1}function E(h,x,M,D,S,I,T){h.tag=null,h.dump=M,y(h,M,!1)||y(h,M,!0);const N=t.call(h.dump),O=D;D&&(D=h.flowLevel<0||h.flowLevel>x);const P=N==="[object Object]"||N==="[object Array]";let B,U;if(P&&(B=h.duplicates.indexOf(M),U=B!==-1),(h.tag!==null&&h.tag!=="?"||U||h.indent!==2&&x>0)&&(S=!1),U&&h.usedDuplicates[B])h.dump="*ref_"+B;else{if(P&&U&&!h.usedDuplicates[B]&&(h.usedDuplicates[B]=!0),N==="[object Object]")D&&Object.keys(h.dump).length!==0?(o(h,x,h.dump,S),U&&(h.dump="&ref_"+B+h.dump)):(gu(h,x,h.dump),U&&(h.dump="&ref_"+B+" "+h.dump));else if(N==="[object Array]")D&&h.dump.length!==0?(h.noArrayIndent&&!T&&x>0?Hn(h,x-1,h.dump,S):Hn(h,x,h.dump,S),U&&(h.dump="&ref_"+B+h.dump)):(jn(h,x,h.dump),U&&(h.dump="&ref_"+B+" "+h.dump));else if(N==="[object String]")h.tag!=="?"&&pu(h,h.dump,x,I,O);else{if(N==="[object Undefined]")return!1;if(h.skipInvalid)return!1;throw new n("unacceptable kind of an object to dump "+N)}if(h.tag!==null&&h.tag!=="?"){let V=encodeURI(h.tag[0]==="!"?h.tag.slice(1):h.tag).replace(/!/g,"%21");h.tag[0]==="!"?V="!"+V:V.slice(0,18)==="tag:yaml.org,2002:"?V="!!"+V.slice(18):V="!<"+V+">",h.dump=V+" "+h.dump}}return!0}function F(h,x){const M=[],D=[];C(h,M,D);const S=D.length;for(let I=0;I<S;I+=1)x.duplicates.push(M[D[I]]);x.usedDuplicates=new Array(S)}function C(h,x,M){if(h!==null&&typeof h=="object"){const D=x.indexOf(h);if(D!==-1)M.indexOf(D)===-1&&M.push(D);else if(x.push(h),Array.isArray(h))for(let S=0,I=h.length;S<I;S+=1)C(h[S],x,M);else{const S=Object.keys(h);for(let I=0,T=S.length;I<T;I+=1)C(h[S[I]],x,M)}}}function R(h,x){x=x||{};const M=new hu(x);M.noRefs||F(h,M);let D=h;return M.replacer&&(D=M.replacer.call({"":D},"",D)),E(M,0,D,!0,!0)?M.dump+`
`:""}return Yu.dump=R,Yu}var Er;function vl(){if(Er)return ue;Er=1;const e=xl(),n=wl();function u(t,r){return function(){throw new Error("Function yaml."+t+" is removed in js-yaml 4. Use yaml."+r+" instead, which is now safe by default.")}}return ue.Type=te(),ue.Schema=mo(),ue.FAILSAFE_SCHEMA=xo(),ue.JSON_SCHEMA=Eo(),ue.CORE_SCHEMA=Ao(),ue.DEFAULT_SCHEMA=xt(),ue.load=e.load,ue.loadAll=e.loadAll,ue.dump=n.dump,ue.YAMLException=Tn(),ue.types={binary:Fo(),float:_o(),map:yo(),null:wo(),pairs:Mo(),set:Io(),timestamp:Do(),bool:vo(),int:Co(),merge:So(),omap:To(),seq:ko(),str:go()},ue.safeLoad=u("safeLoad","load"),ue.safeLoadAll=u("safeLoadAll","loadAll"),ue.safeDump=u("safeDump","dump"),ue}var Cl=vl();const _l=kl(Cl),{Type:ks,Schema:ys,FAILSAFE_SCHEMA:xs,JSON_SCHEMA:ws,CORE_SCHEMA:El,DEFAULT_SCHEMA:vs,load:Al,loadAll:Cs,dump:_s,YAMLException:Es,types:As,safeLoad:Ds,safeLoadAll:Ss,safeDump:Fs}=_l;var Ku,Ar;function Dl(){return Ar||(Ar=1,Ku=function(n,u){var t=3,r="-",i=r.charCodeAt(0),c=r.length;function a(s,d,f,l){var b,p,m,g,k,v,w,_=!1,A=s.bMarks[d]+s.tShift[d],L=s.eMarks[d];if(d!==0||i!==s.src.charCodeAt(0))return!1;for(b=A+1;b<=L;b++)if(r[(b-A)%c]!==s.src[b]){w=b+1;break}if(m=Math.floor((b-A)/c),m<t)return!1;if(b-=(b-A)%c,l)return!0;for(p=d;p++,!(p>=f||s.src.slice(A,L)==="..."||(A=s.bMarks[p]+s.tShift[p],L=s.eMarks[p],A<L&&s.sCount[p]<s.blkIndent));)if(i===s.src.charCodeAt(A)&&!(s.sCount[p]-s.blkIndent>=4)){for(b=A+1;b<=L&&r[(b-A)%c]===s.src[b];b++);if(!(Math.floor((b-A)/c)<m)&&(b-=(b-A)%c,b=s.skipSpaces(b),!(b<L))){_=!0;break}}return k=s.parentType,v=s.lineMax,s.parentType="container",s.lineMax=p,g=s.push("front_matter",null,0),g.hidden=!0,g.markup=s.src.slice(d,b),g.block=!0,g.map=[d,p+(_?1:0)],g.meta=s.src.slice(w,A-1),s.parentType=k,s.lineMax=v,s.line=p+(_?1:0),u(g.meta),!0}n.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),Ku}var Sl=Dl();const Fl=au(Sl);function Tl(){return e=>{let n="";e.use(Fl,u=>{const t=Ml(u);t!==void 0?n=Ro(t,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(u,t,r,i,c)=>n===""?"":`<table class="markdown-frontMatter"${c.renderAttrs(u[t])}>
${n}
</table>
`}}function Ml(e){try{const n=Al(e,{schema:El});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function Ro(e,n){const u=Object.entries(e);return u.length===0?"":`<tbody>
${u.map(([r,i])=>`<tr><th scope="row">${n(r)}</th><td>${ot(i,n)}</td></tr>`).join(`
`)}
</tbody>`}function ot(e,n){if(e==null)return"";if(e instanceof Date)return n(Il(e));if(Array.isArray(e))return e.every(Rl)?e.map(t=>ot(t,n)).join(", "):`<ul>${e.map(t=>`<li>${ot(t,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const u=Ro(e,n);return u===""?"":`<table>${u}</table>`}return n(String(e))}function Il(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function Rl(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const wt={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},Ll=an(H.MarkEdit.userSettings),ce=an(Ll[wt.rootValueKey]),Lo=an(ce.changeMode),Oo=an(ce.markdownIt),Ol=["automatic","quiet","notify","never"],bn=(()=>{const e=ce.updateBehavior;return e&&Ol.includes(e)?e:Mn(ce.autoUpdate)?"quiet":"never"})(),Nl=Mn(ce.syncScroll);Mn(ce.hidePreviewButtons);Mn(ce.syntaxAutoDetect,!1);const zl=Mn(ce.imageHoverPreview,!1),cu=ce.themeName??"github",No=cu==="none",Ju=ce.styledHtmlColorScheme??ce.styledHtmlTheme??"auto";ce.mathDelimiters;const ql=Lo.modes??wt.defaultModes,Dr=an(Lo.hotKey),Pl=Oo.preset??wt.defaultPreset,Bl=an(Oo.options);function an(e,n={}){return e??n}function Mn(e,n=!0){return e??n}const jl=`.markdown-body {
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
`,Hl=`.markdown-body {
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
`,$l=`.markdown-body {
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
`,Ul=`.markdown-body {
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
`,Gl=`.markdown-body {
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
`,Vl=`.markdown-body {
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
`,Zl=`.markdown-body {
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
`,Wl=`.markdown-body {
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
`,Yl=`.markdown-body {
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
`,Kl=`.markdown-body {
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
`,Jl=`.markdown-body {
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
`,Ql=`.markdown-body {
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
`,Xl=`.markdown-body {
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
`,e0=`.markdown-body {
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
`,n0=`.markdown-body {
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
`,u0=`.markdown-body {
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
`,t0=`.markdown-body {
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
`,r0=`.markdown-alert {
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
`,o0=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,i0=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,a0=`.code-copy-wrapper {
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
`,Qn={github:{light:Hl,dark:$l},cobalt:{dark:Ul},dracula:{dark:Gl},minimal:{light:Vl,dark:Zl},"night-owl":{dark:Wl},"rose-pine":{light:Yl,dark:Kl},solarized:{light:Jl,dark:Ql},synthwave84:{dark:Xl},"winter-is-coming":{light:e0,dark:n0},xcode:{light:u0,dark:t0}};function c0(e="auto"){if(No)return"";const n=Qn[cu]??Qn.github,u=n.light??n.dark,t=n.dark??n.light,r=Tt(u)??"#ffffff",i=Tt(t)??"#0d1117";return[".markdown-body { padding: 25px; }",...vt(e,`body { background: ${r}; }`,`body { background: ${i}; }`)].join(`
`)}function zo(e="auto"){if(No)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=Qn[cu]??Qn.github,u=n.light??n.dark,t=n.dark??n.light;return[jl,...vt(e,u,t)].join(`
`)}function l0(e="auto"){return[r0,...vt(e,o0,i0)].join(`
`)}function qo(){return a0}function vt(e,n,u){const t=[];switch(e){case"light":t.push(n);break;case"dark":t.push(u);break;case"auto":t.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${u}
        }`);break}return t}const s0={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function Z(e){return f0[e]}const d0=["default","zh-CN","zh-TW"],f0=s0[(()=>{const e=navigator.language;return d0.includes(e)?e:"default"})()];function Ct(){return typeof H.MarkEdit.addExtension=="function"}async function _t(e,n=!0){return await b0,fe.render(e,{lineInfo:n})}function Po(e){e()}async function Bo(e){const n=t=>`<style>
${t}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(c0(Ju)),n(zo(Ju)),n(l0(Ju)),n(qo()),"</body></html>"].join(`
`)}const fe=ae(Pl,{html:!0,breaks:!0,linkify:!0,...Bl}),h0=[];fe.use(Tl());fe.use(Je);fe.use(ul,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});fe.use(dl);fe.use(pl,{enabled:Ct(),label:!0});fe.use(ml);const p0=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),b0=Promise.all(h0).then(()=>{for(const e of p0){const n=fe.renderer.rules[e];fe.renderer.rules[e]=(u,t,r,i,c)=>{const a=u[t];return i.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),n?n(u,t,r,i,c):c.renderToken(u,t,r)}}for(const e of["fence","code_block"]){const n=fe.renderer.rules[e];fe.renderer.rules[e]=(u,t,r,i,c)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?c.renderToken(u,t,r):n(u,t,r,i,c)}
        <button title="${Z("copyCode")}" aria-label="${Z("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),m0=new DOMParser,g0="image-loader",Et="cm-md-image-preview",Sr=5;function jo(e){const n=m0.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(t=>{const r=t.getAttribute("src");r!==null&&(r.includes("://")||r.startsWith("data:image/")||(t.src=`${g0}://${r}`))}),n.body.innerHTML}function k0(e){typeof H.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{Ie.panelPresenter!==void 0&&(clearTimeout(Ie.panelPresenter),Ie.panelPresenter=void 0),Ie.panelPresenter=setTimeout(()=>{const u=n.target,t=u?.closest(".cm-md-link"),r=t?.dataset.linkUrl??t?.innerText??"";t!==null&&fi(r)?y0(t,r):u?.classList.contains(Et)||mn()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&mn(!1)}),e.addEventListener("scroll",()=>mn()))}async function y0(e,n){if(e===Ie.focusedElement)return;const u=(await H.MarkEdit.getFileInfo())?.parentPath;if(u===void 0)return;const t=Ke(u,n),r=await H.MarkEdit.getFileObject(t);if(r===void 0)return;const i=e.getBoundingClientRect(),c=document.createElement("img");c.className=Et,c.style.position="fixed",c.style.left=`${i.left}px`,c.style.zIndex="10000",c.style.borderRadius="5px",c.style.opacity="0",c.style.transition="opacity 120ms",c.style.cursor="pointer",c.onclick=()=>{mn(),window.open(n,"_blank")},c.onload=()=>{const s=Math.min(c.naturalHeight,240);c.style.height=`${s}px`;const d=i.top,f=window.innerHeight-i.bottom;d>f?c.style.top=`${i.top-s-Sr}px`:c.style.top=`${i.bottom+Sr}px`,requestAnimationFrame(()=>{c.style.opacity="1"})};const a=r.mimeType??"image/png";c.src=`data:${a};base64,${r.data}`,mn(!1),Ie.focusedElement=e,document.body.appendChild(c)}function mn(e=!0){Ie.focusedElement!==void 0&&(Ie.focusedElement=void 0,document.querySelectorAll(`.${Et}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const Ie={panelPresenter:void 0,focusedElement:void 0};function x0(e,n){if(!Nl)return;Ze.lastSourceScrollTop=e.scrollTop;const u=()=>{Math.abs(e.scrollTop-Ze.lastSourceScrollTop)<.5||(Ze.lastSourceScrollTop=e.scrollTop,Ho(e,n))};"onscrollend"in window?e.addEventListener("scrollend",u):e.addEventListener("scroll",()=>{Ze.scrollUpdater!==void 0&&clearTimeout(Ze.scrollUpdater),Ze.scrollUpdater=setTimeout(u,100)})}function Ho(e,n,u=!0){const{line:t,progress:r}=w0(e);v0(n,t,r,u)}function w0(e,n=0){const u=H.MarkEdit.editorView,t=u.lineBlockAtHeight(e.scrollTop+n),r=u.state.doc.lineAt(t.from).number-1,i=si(u.domAtPos(t.from).node);if(i===null)return{line:r,progress:0};const c=e.getBoundingClientRect(),a=i.getBoundingClientRect(),s=c.top-a.top-n,d=a.height>0?At(s/a.height):0;return{line:r,progress:d}}function v0(e,n,u,t=!0){if(n===0&&u===0)return Zn(e,0,t);const r=Array.from(document.querySelectorAll("[data-line-from]")),i=C0(r,n);if(i!==void 0){const{from:s,to:d}=Qe(i);return ku(e,i,_0(n,u,s,d),t)}if(n===0)return Zn(e,0,t);const{beforeBlock:c,afterBlock:a}=E0(r,n);if(c!==void 0&&a!==void 0){const s=Qe(c),d=Qe(a),f=nt(e,c)+c.offsetHeight,l=nt(e,a),b=d.from-s.to,p=n-s.to+u,m=b>0?At(p/b):0,g=f+(l-f)*m;return Zn(e,g,t)}if(c!==void 0)return ku(e,c,1,t);if(a!==void 0)return ku(e,a,0,t)}function C0(e,n){return e.find(u=>{const{from:t,to:r}=Qe(u);return n>=t&&n<=r})}function _0(e,n,u,t){const r=t-u;if(r<1)return e===u?n:0;const i=e-u+n;return At(i/r)}function E0(e,n){let u,t;for(const r of e){const{from:i,to:c}=Qe(r);if(c<n)u=r;else if(i>n){t=r;break}}return{beforeBlock:u,afterBlock:t}}function At(e){return Math.max(0,Math.min(1,e))}const Ze={lastSourceScrollTop:0,scrollUpdater:void 0};function A0(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}const Pe={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},lu={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var Qu=function(e,n){return Number(e.slice(0,-1*n.length))},D0=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Qu(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Qu(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Qu(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},$o=function(e){return e.split(" ").map(D0)},S0=function(e,n,u,t){u===void 0&&(u=0),t===void 0&&(t=!1);var r=t?e+1:e,i=n.slice(0,r).reduce(function(a,s){return a+s.numeric},0),c=u?e*u:0;return i+c},Uo=function(e,n,u){return n.concat(u).map(function(t){return t.style[e]}).filter(function(t){return t!==void 0&&t!==""})},F0=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Fr=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},Be=function(){return!1},T0=function(e,n,u){e.style[n]=u},K=function(e,n,u){var t=e[n];return t!==void 0?t:u};function Go(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(u){var t=[];try{t=Array.from(u.cssRules||[])}catch{}return t})).filter(function(u){var t=!1;try{t=e.matches(u.selectorText)}catch{}return t})}var M0="grid-template-columns",I0="grid-template-rows",ne=function(n,u,t){this.direction=n,this.element=u.element,this.track=u.track,n==="column"?(this.gridTemplateProp=M0,this.gridGapProp="grid-column-gap",this.cursor=K(t,"columnCursor",K(t,"cursor","col-resize")),this.snapOffset=K(t,"columnSnapOffset",K(t,"snapOffset",30)),this.dragInterval=K(t,"columnDragInterval",K(t,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=K(t,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=I0,this.gridGapProp="grid-row-gap",this.cursor=K(t,"rowCursor",K(t,"cursor","row-resize")),this.snapOffset=K(t,"rowSnapOffset",K(t,"snapOffset",30)),this.dragInterval=K(t,"rowDragInterval",K(t,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=K(t,"gridTemplateRows")),this.onDragStart=K(t,"onDragStart",Be),this.onDragEnd=K(t,"onDragEnd",Be),this.onDrag=K(t,"onDrag",Be),this.writeStyle=K(t,"writeStyle",T0),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=u.minSizeStart,this.minSizeEnd=u.minSizeEnd,u.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};ne.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),u=n.width,t=n.height,r=n.top,i=n.bottom,c=n.left,a=n.right;this.direction==="column"?(this.start=r,this.end=i,this.size=t):this.direction==="row"&&(this.start=c,this.end=a,this.size=u)};ne.prototype.getSizeAtTrack=function(n,u){return S0(n,this.computedPixels,this.computedGapPixels,u)};ne.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};ne.prototype.getRawTracks=function(){var n=Uo(this.gridTemplateProp,[this.grid],Go(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};ne.prototype.getGap=function(){var n=Uo(this.gridGapProp,[this.grid],Go(this.grid));return n.length?n[0]:null};ne.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};ne.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};ne.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=$o(n)};ne.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=$o(n)};ne.prototype.setGap=function(n){this.gap=n};ne.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=F0("px",this.computedGap)||0};ne.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};ne.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var u=this.trackValues.filter(function(a){return a.type==="%"}),t=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=t.length,this.totalFrs){var r=Fr(t);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/t[r].numeric)}if(u.length){var i=Fr(u);i!==null&&(this.percentageToPixels=this.computedPixels[i].numeric/u[i].numeric)}var c=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-c,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Be),this.grid.addEventListener("dragstart",Be),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};ne.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};ne.prototype.drag=function(n){var u=this.getMousePosition(n),t=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,i=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(t-this.dragStartOffset),c=r+this.snapOffset,a=i-this.snapOffset;u<c&&(u=r),u>a&&(u=i),u<r?u=r:u>i&&(u=i);var s=u-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-u+this.dragStartOffset-t-this.computedGapPixels;if(this.dragInterval>1){var f=Math.round(s/this.dragInterval)*this.dragInterval;d-=f-s,s=f}if(s<this.minSizeStart&&(s=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var l=s/this.frToPixels;this.tracks[this.aTrack]=l+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var b=s/this.percentageToPixels;this.tracks[this.aTrack]=b+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var p=d/this.frToPixels;this.tracks[this.bTrack]=p+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var m=d/this.percentageToPixels;this.tracks[this.bTrack]=m+"%"}var g=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,g),this.onDrag(this.direction,this.track,g)};ne.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Be),this.grid.removeEventListener("dragstart",Be),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};ne.prototype.destroy=function(n,u){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),u&&u()):(this.needsDestroy=!0,u&&(this.destroyCb=u))};var Tr=function(e,n,u){return n in e?e[n]:u},tn=function(e,n){return function(u){if(u.track<1)throw Error("Invalid track index: "+u.track+". Track must be between two other tracks.");var t=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},r=e==="column"?"columnMinSize":"rowMinSize";return new ne(e,Object.assign({},{minSizeStart:Tr(t,u.track-1,K(n,r,K(n,"minSize",0))),minSizeEnd:Tr(t,u.track+1,K(n,r,K(n,"minSize",0)))},u),n)}},je=function(n){var u=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(t){u.columnGutters[t.track]=tn("column",u.options)(t)}),this.options.rowGutters.forEach(function(t){u.rowGutters[t.track]=tn("row",u.options)(t)})};je.prototype.addColumnGutter=function(n,u){this.columnGutters[u]&&this.columnGutters[u].destroy(),this.columnGutters[u]=tn("column",this.options)({element:n,track:u})};je.prototype.addRowGutter=function(n,u){this.rowGutters[u]&&this.rowGutters[u].destroy(),this.rowGutters[u]=tn("row",this.options)({element:n,track:u})};je.prototype.removeColumnGutter=function(n,u){var t=this;u===void 0&&(u=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(u,function(){delete t.columnGutters[n]})};je.prototype.removeRowGutter=function(n,u){var t=this;u===void 0&&(u=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(u,function(){delete t.rowGutters[n]})};je.prototype.handleDragStart=function(n,u,t){u==="column"?(this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=tn("column",this.options)({track:t}),this.columnGutters[t].startDragging(n)):u==="row"&&(this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=tn("row",this.options)({track:t}),this.rowGutters[t].startDragging(n))};je.prototype.destroy=function(n){var u=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(t){return u.columnGutters[t].destroy(n,function(){delete u.columnGutters[t]})}),Object.keys(this.rowGutters).forEach(function(t){return u.rowGutters[t].destroy(n,function(){delete u.rowGutters[t]})})};function R0(e){return new je(e)}const L0=`body .markdown-body details summary,
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
`,Xn=document.body,gn=document.createElement("div"),Q=document.createElement("div"),Mr=pn("* { cursor: col-resize }",!1),Vo=ai.Annotation.define();var be=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(be||{});function O0(){pn(L0),pn(zo()),pn(qo());const e=document.createElement("div");e.className=Pe.dividerViewClass,gn.appendChild(e),gn.className=Pe.gutterViewClass,Xn.appendChild(gn),Q.className=Pe.previewPaneClass,Xn.appendChild(Q),document.addEventListener("keydown",t=>{if(!t.metaKey||t.key!=="a")return;const r=H.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(Q.classList.contains("overlay")||document.activeElement!==r)&&(di(Q),t.preventDefault())}),new MutationObserver(Ir).observe(Q,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Ir(),document.querySelector(".mermaid")!==null&&eu()}),typeof H.MarkEdit.getFileInfo=="function"&&typeof H.MarkEdit.openFile=="function"&&Q.addEventListener("click",U0),Q.addEventListener("click",G0)}function su(e,n=!0){const u=le();fn.viewMode=e,e!==u&&localStorage.setItem(lu.viewModeCacheKey,String(e));const t=H.MarkEdit.editorView;e===0?t.focus():e===2&&t.contentDOM.blur(),e===1?(Xn.classList.add(Pe.containerClass),fn.splitter??=R0({columnGutters:[{track:1,element:gn}],minSize:150,onDragStart:()=>Mr.disabled=!1,onDragEnd:()=>Mr.disabled=!0})):(Xn.classList.remove(Pe.containerClass),fn.splitter?.destroy(),fn.splitter=void 0),e===2?Q.classList.add("overlay"):Q.classList.remove("overlay"),n&&eu()}function N0(){const e=[0,...ql.map(t=>{switch(t){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(t=>t!==void 0)],n=e.indexOf(le()),u=n===-1?0:(n+1)%e.length;su(e[u])}function z0(){const e=localStorage.getItem(lu.viewModeCacheKey);if(e===null)return;const n=Number(e);le()!==n&&su(n,!0)}function le(){return fn.viewMode}async function eu(){if(le()===0)return;const e=jo(await du());Q.innerHTML=e,Po(()=>{Ho(Zo(),In(),!1);const n=localStorage.getItem(lu.previewPageZoomKey);n!==null&&(Q.style.zoom=n)})}function q0(e){if(le()===0||le()===1&&H.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(Q.style.zoom)||1,u=t=>String(Math.min(Math.max(t,.5),3));switch(e.key){case"-":Q.style.zoom=u(n-.1);break;case"=":Q.style.zoom=u(n+.1);break;case"0":Q.style.zoom="1";break;default:return}localStorage.setItem(lu.previewPageZoomKey,Q.style.zoom),e.preventDefault(),e.stopPropagation()}function P0(){Yo(!1)}function B0(){Yo(!0)}async function j0(){const e=await du(!1);await navigator.clipboard.writeText(e)}async function H0(){const e=await du(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([Q.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function Zo(){return H.MarkEdit.editorView.scrollDOM}function In(){return Q}async function Wo(e){const n=await du(!1);return e?await Bo(n):`<meta charset="UTF-8">
${n}`}async function $0(e,n){const u=await _t(e,!1);return n?await Bo(u):`<meta charset="UTF-8">
${u}`}async function du(e=!0){const n=H.MarkEdit.editorAPI.getText();return await _t(n,e)}function Ir(){const e=getComputedStyle(Q).backgroundColor;gn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function Yo(e){const n=await(async()=>{const t=await H.MarkEdit.getFileInfo();return t===void 0?`${Z("untitled")}.html`:`${li(t.filePath)}.html`})(),u=await Wo(e);H.MarkEdit.showSavePanel({fileName:n,string:u})}async function U0(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const u=n.getAttribute("href");if(!u?.startsWith("../"))return;const t=(await H.MarkEdit.getFileInfo())?.parentPath;if(t!==void 0){e.preventDefault(),e.stopPropagation();try{const r=Ke(t,decodeURIComponent(u));await H.MarkEdit.openFile(r)}catch(r){console.error("Failed to open file:",r)}}}function G0(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const u=n.closest("[data-line-from]");if(u===null){console.error("Failed to find task item block");return}const t=H.MarkEdit.editorAPI,r=t.getLineRange(Qe(u).from),i=A0(t.getText(r));if(i===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const c=r.from+i.offset;H.MarkEdit.editorView.dispatch({changes:{from:c,to:c+1,insert:i.replacement},annotations:Vo.of(!0)})}const fn={viewMode:0,splitter:void 0};async function it(){if(bn==="never")return;const e=await Ko();typeof e.tag_name=="string"&&e.name!=="1.8.1"&&(Xo().has(e.name)||(bn==="automatic"&&st()?await Dt(e.tag_name):bn==="quiet"?(at.pendingRelease=e,Jo(e)):Z0(e)))}async function V0(){const e=Date.now(),n=Number(localStorage.getItem(rn.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await it(),localStorage.setItem(rn.lastCheckCacheKey,String(e))}catch(u){console.error("Failed to check for updates:",u)}}async function Ko(){return await(await fetch(rn.latestReleaseURL)).json()}async function Dt(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,u="lite/",t=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,r=`${rn.rawBaseURL}${t}/dist/${u}markedit-preview.js`,i=await fetch(r);if(!i.ok)return console.error(`Failed to download the latest build from ${r}`),!1;const c=await i.text();return await H.MarkEdit.createFile({path:n,string:c,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function Jo(e=at.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${Pe.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const u=document.createElement("button");return u.dataset.releaseName=e.name,u.className=Pe.updatePillClass,u.textContent=Z("update"),u.style.display=le()===be.edit?"none":"",u.addEventListener("webkitmouseforcedown",t=>{t.preventDefault()}),u.addEventListener("click",()=>{const{title:t,actions:r}=Qo(e,()=>{at.pendingRelease=void 0,u.remove()}),[i,...c]=r,a=u.getBoundingClientRect(),s={x:a.left,y:a.bottom+10};H.MarkEdit.showContextMenu([{title:t},i,{separator:!0},...c],s)}),document.body.appendChild(u),u}async function Z0(e){const{title:n,actions:u}=Qo(e),t=await H.MarkEdit.showAlert({title:n,message:e.body,buttons:u.map(r=>r.title)});u[t]?.action?.()}function Qo(e,n=()=>{}){const u=`MarkEdit-preview ${e.name} ${Z("newVersionAvailable")}`,t=[...st()?[{title:Z("updateAndRelaunch"),action:async()=>{await Dt(e.tag_name)?H.MarkEdit.relaunchApp():H.MarkEdit.showAlert(Z("failedToUpdate")),n()}}]:[],{title:Z("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:Z("remindMeLater"),action:n},{title:Z("skipThisVersion"),action:()=>{const r=Xo();r.add(e.name),localStorage.setItem(rn.skippedCacheKey,JSON.stringify([...r])),n()}}];return{title:u,actions:t}}function Xo(){const e=localStorage.getItem(rn.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const rn={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},at={pendingRelease:void 0},ct="markedit-preview",Rr=`${ct}.js`;function W0(e){const{destExists:n,bundleInfo:u,currentVersion:t}=e,r=u?.version===t,i=u?.fullBuild===!1;return!(n&&r&&i)}async function Y0(){try{const e=H.MarkEdit.getDirectoryPath("documents"),n=H.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const u=typeof __FILE_PATH__=="string"?__FILE_PATH__:Ke(e,`scripts/${Rr}`);if(await H.MarkEdit.getFileInfo(u)===void 0){console.error(`Source file not found at ${u}`);return}const r=u.split("/").pop()??Rr,i=Ke(n,"Shared/scripts"),c=Ke(i,r),a=await H.MarkEdit.getFileInfo(c)!==void 0,s=Ke(n,"Shared/metadata.json"),d=await hi(s),f=d[ct];if(!W0({destExists:a,bundleInfo:f,currentVersion:"1.8.1"}))return;const l=await H.MarkEdit.getFileContent(u);if(l===void 0){console.error(`Failed to read content from ${u}`);return}await H.MarkEdit.createFile({path:i,isDirectory:!0}),await H.MarkEdit.createFile({path:c,string:l,overwrites:!0}),await H.MarkEdit.createFile({path:s,string:JSON.stringify({...d,[ct]:{version:"1.8.1",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const K0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',J0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function Q0(){const e=Lr(Z("source"),K0),n=Lr(Z("preview"),J0),u=document.createElement("div");u.className="quicklook-segmented",u.setAttribute("role","tablist"),u.append(e,n);const t=document.createElement("div");return t.className="quicklook-toolbar",t.appendChild(u),{toolbar:t,sourceButton:e,previewButton:n}}function Lr(e,n){const u=document.createElement("button");u.title=e,u.type="button",u.className="quicklook-segment",u.setAttribute("role","tab"),u.setAttribute("aria-label",e);const t=document.createElement("span");t.textContent=e,t.className="quicklook-segment-label";const r=document.createElement("span");return r.innerHTML=n,r.className="quicklook-segment-icon",u.append(t,r),u}function We(){if(Ye!==void 0)return Ye;try{Ye=localStorage.getItem(ei)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),Ye="source"}return Ye}function Or(e){Ye=e;try{localStorage.setItem(ei,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let Ye;const ei="ui.quicklook-mode";function X0(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function es(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function ns(e,n){const u=window,t=u.pinchZoomTarget;u.pinchZoomTarget=()=>{if(e()!=="preview")return t?.()??null;const r=n.querySelector(".quicklook-content");return r!==null?{scroller:n,inner:r}:null};for(const r of["gesturechange","gestureend"])document.addEventListener(r,()=>{if(e()!=="preview")return;const i=n.querySelector(".quicklook-content");i?.style.zoom.length?i?.style.setProperty("--quicklook-zoom",i.style.zoom):i?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function us(e,n){let u;const t=window,r={start:t.startDragging,update:t.updateDragging,cancel:t.cancelDragging},i=()=>{const a=n.clientHeight,s=n.scrollHeight,d=s-a;if(d<=0||s<=0)return{clientHeight:a,scrollHeight:s,scrollbarHeight:a,scrollbarTop:0};const f=a*(a/s),b=n.scrollTop/d*(a-f);return{clientHeight:a,scrollHeight:s,scrollbarHeight:f,scrollbarTop:b}},c=(a,s,d="auto")=>{const{clientHeight:f,scrollHeight:l,scrollbarHeight:b}=i(),p=f-b;if(p>0){const m=(a-s)/p;n.scrollTo({top:m*(l-f),behavior:d})}};t.startDragging=a=>{if(e()!=="preview"){r.start?.(a);return}const{scrollbarTop:s,scrollbarHeight:d}=i(),f=Nr(n,a);u=f-s,(f<s||f>s+d)&&c(f,d*.5,"smooth")},t.updateDragging=a=>{if(e()!=="preview"){r.update?.(a);return}u!==void 0&&c(Nr(n,a),u)},t.cancelDragging=()=>{if(e()!=="preview"){r.cancel?.();return}u=void 0}}function ts(e,n,u){u.addEventListener("wheel",t=>{const r=e()==="preview"?n:document.querySelector(".cm-scroller");r!==null&&(r.scrollTop+=t.deltaY,r.scrollLeft+=t.deltaX,t.preventDefault())},{passive:!1})}function rs(e,n,u){const t=document.querySelector(".cm-scroller"),r=()=>{const c=(e()==="preview"?n:t)?.scrollTop??0;u.classList.toggle("scrolled",c>0),u.classList.toggle("scrolled-far",c>20)};return n.addEventListener("scroll",r,{passive:!0}),t?.addEventListener("scroll",r,{passive:!0}),r}function os(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const u=getSelection(),t=u!==null&&u.rangeCount>0?u.getRangeAt(0):null,r=t!==null&&!t.collapsed&&e.contains(t.commonAncestorContainer)?t:null,i=r??(()=>{const a=document.createRange();return a.selectNodeContents(e),a})(),c=document.createElement("div");c.appendChild(i.cloneContents()),n.clipboardData?.setData("text/html",c.innerHTML),n.clipboardData?.setData("text/plain",r!==null?r.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function Nr(e,n){return n-e.getBoundingClientRect().top}const is=`body {
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
`;function as(e){pn(is),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:u,previewButton:t}=Q0();document.body.appendChild(n);const r=cs(e),i=rs(We,e,n),c={previewPane:e,sourceButton:u,previewButton:t,refreshSeparator:i,ensureRendered:r.ensureRendered};u.addEventListener("click",()=>{Or("source"),Xu(c)}),t.addEventListener("click",()=>{Or("preview"),Xu(c)}),Xu(c),setTimeout(r.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(r.invalidate(),We()==="preview"&&r.ensureRendered())}),es(),ns(We,e),us(We,e),ts(We,e,n),os(e)}function Xu(e){const n=We()==="source",u=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",u),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(u)),e.previewPane.classList.toggle("overlay",u),e.refreshSeparator(),u&&e.ensureRendered()}function cs(e){let n=!1,u;return{ensureRendered:()=>(n||u||(u=(async()=>{try{const i=jo(await _t(X0(),!1));e.innerHTML=`<div class="quicklook-content">${i}</div>`,e.querySelectorAll("a[href]").forEach(c=>{c.removeAttribute("href"),c.removeAttribute("target")}),Po(()=>{}),n=!0}catch(i){throw u=void 0,i}})()),u),invalidate:()=>{n=!1,u=void 0}}}var Wn={exports:{}};var ls=Wn.exports,zr;function ss(){return zr||(zr=1,(function(e,n){(function(u,t){e.exports=t()})(ls,(function(){var u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},t=function(d,f){if(!(d instanceof f))throw new TypeError("Cannot call a class as a function")},r=(function(){function d(f,l){for(var b=0;b<l.length;b++){var p=l[b];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(f,p.key,p)}}return function(f,l,b){return l&&d(f.prototype,l),b&&d(f,b),f}})(),i=Object.assign||function(d){for(var f=1;f<arguments.length;f++){var l=arguments[f];for(var b in l)Object.prototype.hasOwnProperty.call(l,b)&&(d[b]=l[b])}return d},c=(function(){function d(f){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,b=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;t(this,d),this.ctx=f,this.iframes=l,this.exclude=b,this.iframesTimeout=p}return r(d,[{key:"getContexts",value:function(){var l=void 0,b=[];return typeof this.ctx>"u"||!this.ctx?l=[]:NodeList.prototype.isPrototypeOf(this.ctx)?l=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?l=this.ctx:typeof this.ctx=="string"?l=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):l=[this.ctx],l.forEach(function(p){var m=b.filter(function(g){return g.contains(p)}).length>0;b.indexOf(p)===-1&&!m&&b.push(p)}),b}},{key:"getIframeContents",value:function(l,b){var p=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},m=void 0;try{var g=l.contentWindow;if(m=g.document,!g||!m)throw new Error("iframe inaccessible")}catch{p()}m&&b(m)}},{key:"isIframeBlank",value:function(l){var b="about:blank",p=l.getAttribute("src").trim(),m=l.contentWindow.location.href;return m===b&&p!==b&&p}},{key:"observeIframeLoad",value:function(l,b,p){var m=this,g=!1,k=null,v=function w(){if(!g){g=!0,clearTimeout(k);try{m.isIframeBlank(l)||(l.removeEventListener("load",w),m.getIframeContents(l,b,p))}catch{p()}}};l.addEventListener("load",v),k=setTimeout(v,this.iframesTimeout)}},{key:"onIframeReady",value:function(l,b,p){try{l.contentWindow.document.readyState==="complete"?this.isIframeBlank(l)?this.observeIframeLoad(l,b,p):this.getIframeContents(l,b,p):this.observeIframeLoad(l,b,p)}catch{p()}}},{key:"waitForIframes",value:function(l,b){var p=this,m=0;this.forEachIframe(l,function(){return!0},function(g){m++,p.waitForIframes(g.querySelector("html"),function(){--m||b()})},function(g){g||b()})}},{key:"forEachIframe",value:function(l,b,p){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=l.querySelectorAll("iframe"),v=k.length,w=0;k=Array.prototype.slice.call(k);var _=function(){--v<=0&&g(w)};v||_(),k.forEach(function(A){d.matches(A,m.exclude)?_():m.onIframeReady(A,function(L){b(A)&&(w++,p(L)),_()},_)})}},{key:"createIterator",value:function(l,b,p){return document.createNodeIterator(l,b,p,!1)}},{key:"createInstanceOnIframe",value:function(l){return new d(l.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(l,b,p){var m=l.compareDocumentPosition(p),g=Node.DOCUMENT_POSITION_PRECEDING;if(m&g)if(b!==null){var k=b.compareDocumentPosition(p),v=Node.DOCUMENT_POSITION_FOLLOWING;if(k&v)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(l){var b=l.previousNode(),p=void 0;return b===null?p=l.nextNode():p=l.nextNode()&&l.nextNode(),{prevNode:b,node:p}}},{key:"checkIframeFilter",value:function(l,b,p,m){var g=!1,k=!1;return m.forEach(function(v,w){v.val===p&&(g=w,k=v.handled)}),this.compareNodeIframe(l,b,p)?(g===!1&&!k?m.push({val:p,handled:!0}):g!==!1&&!k&&(m[g].handled=!0),!0):(g===!1&&m.push({val:p,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(l,b,p,m){var g=this;l.forEach(function(k){k.handled||g.getIframeContents(k.val,function(v){g.createInstanceOnIframe(v).forEachNode(b,p,m)})})}},{key:"iterateThroughNodes",value:function(l,b,p,m,g){for(var k=this,v=this.createIterator(b,l,m),w=[],_=[],A=void 0,L=void 0,q=function(){var $=k.getIteratorNode(v);return L=$.prevNode,A=$.node,A};q();)this.iframes&&this.forEachIframe(b,function(j){return k.checkIframeFilter(A,L,j,w)},function(j){k.createInstanceOnIframe(j).forEachNode(l,function($){return _.push($)},m)}),_.push(A);_.forEach(function(j){p(j)}),this.iframes&&this.handleOpenIframes(w,l,p,m),g()}},{key:"forEachNode",value:function(l,b,p){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=this.getContexts(),v=k.length;v||g(),k.forEach(function(w){var _=function(){m.iterateThroughNodes(l,w,b,p,function(){--v<=0&&g()})};m.iframes?m.waitForIframes(w,_):_()})}}],[{key:"matches",value:function(l,b){var p=typeof b=="string"?[b]:b,m=l.matches||l.matchesSelector||l.msMatchesSelector||l.mozMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector;if(m){var g=!1;return p.every(function(k){return m.call(l,k)?(g=!0,!1):!0}),g}else return!1}}]),d})(),a=(function(){function d(f){t(this,d),this.ctx=f,this.ie=!1;var l=window.navigator.userAgent;(l.indexOf("MSIE")>-1||l.indexOf("Trident")>-1)&&(this.ie=!0)}return r(d,[{key:"log",value:function(l){var b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",p=this.opt.log;this.opt.debug&&(typeof p>"u"?"undefined":u(p))==="object"&&typeof p[b]=="function"&&p[b]("mark.js: "+l)}},{key:"escapeStr",value:function(l){return l.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(l){return this.opt.wildcards!=="disabled"&&(l=this.setupWildcardsRegExp(l)),l=this.escapeStr(l),Object.keys(this.opt.synonyms).length&&(l=this.createSynonymsRegExp(l)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),this.opt.diacritics&&(l=this.createDiacriticsRegExp(l)),l=this.createMergedBlanksRegExp(l),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.createJoinersRegExp(l)),this.opt.wildcards!=="disabled"&&(l=this.createWildcardsRegExp(l)),l=this.createAccuracyRegExp(l),l}},{key:"createSynonymsRegExp",value:function(l){var b=this.opt.synonyms,p=this.opt.caseSensitive?"":"i",m=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var g in b)if(b.hasOwnProperty(g)){var k=b[g],v=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g),w=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(k):this.escapeStr(k);v!==""&&w!==""&&(l=l.replace(new RegExp("("+this.escapeStr(v)+"|"+this.escapeStr(w)+")","gm"+p),m+("("+this.processSynomyms(v)+"|")+(this.processSynomyms(w)+")")+m))}return l}},{key:"processSynomyms",value:function(l){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),l}},{key:"setupWildcardsRegExp",value:function(l){return l=l.replace(/(?:\\)*\?/g,function(b){return b.charAt(0)==="\\"?"?":""}),l.replace(/(?:\\)*\*/g,function(b){return b.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(l){var b=this.opt.wildcards==="withSpaces";return l.replace(/\u0001/g,b?"[\\S\\s]?":"\\S?").replace(/\u0002/g,b?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(l){return l.replace(/[^(|)\\]/g,function(b,p,m){var g=m.charAt(p+1);return/[(|)\\]/.test(g)||g===""?b:b+"\0"})}},{key:"createJoinersRegExp",value:function(l){var b=[],p=this.opt.ignorePunctuation;return Array.isArray(p)&&p.length&&b.push(this.escapeStr(p.join(""))),this.opt.ignoreJoiners&&b.push("\\u00ad\\u200b\\u200c\\u200d"),b.length?l.split(/\u0000+/).join("["+b.join("")+"]*"):l}},{key:"createDiacriticsRegExp",value:function(l){var b=this.opt.caseSensitive?"":"i",p=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],m=[];return l.split("").forEach(function(g){p.every(function(k){if(k.indexOf(g)!==-1){if(m.indexOf(k)>-1)return!1;l=l.replace(new RegExp("["+k+"]","gm"+b),"["+k+"]"),m.push(k)}return!0})}),l}},{key:"createMergedBlanksRegExp",value:function(l){return l.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(l){var b=this,p="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",m=this.opt.accuracy,g=typeof m=="string"?m:m.value,k=typeof m=="string"?[]:m.limiters,v="";switch(k.forEach(function(w){v+="|"+b.escapeStr(w)}),g){case"partially":default:return"()("+l+")";case"complementary":return v="\\s"+(v||this.escapeStr(p)),"()([^"+v+"]*"+l+"[^"+v+"]*)";case"exactly":return"(^|\\s"+v+")("+l+")(?=$|\\s"+v+")"}}},{key:"getSeparatedKeywords",value:function(l){var b=this,p=[];return l.forEach(function(m){b.opt.separateWordSearch?m.split(" ").forEach(function(g){g.trim()&&p.indexOf(g)===-1&&p.push(g)}):m.trim()&&p.indexOf(m)===-1&&p.push(m)}),{keywords:p.sort(function(m,g){return g.length-m.length}),length:p.length}}},{key:"isNumeric",value:function(l){return Number(parseFloat(l))==l}},{key:"checkRanges",value:function(l){var b=this;if(!Array.isArray(l)||Object.prototype.toString.call(l[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(l),[];var p=[],m=0;return l.sort(function(g,k){return g.start-k.start}).forEach(function(g){var k=b.callNoMatchOnInvalidRanges(g,m),v=k.start,w=k.end,_=k.valid;_&&(g.start=v,g.length=w-v,p.push(g),m=w)}),p}},{key:"callNoMatchOnInvalidRanges",value:function(l,b){var p=void 0,m=void 0,g=!1;return l&&typeof l.start<"u"?(p=parseInt(l.start,10),m=p+parseInt(l.length,10),this.isNumeric(l.start)&&this.isNumeric(l.length)&&m-b>0&&m-p>0?g=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(l))),this.opt.noMatch(l))):(this.log("Ignoring invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:p,end:m,valid:g}}},{key:"checkWhitespaceRanges",value:function(l,b,p){var m=void 0,g=!0,k=p.length,v=b-k,w=parseInt(l.start,10)-v;return w=w>k?k:w,m=w+parseInt(l.length,10),m>k&&(m=k,this.log("End range automatically set to the max value of "+k)),w<0||m-w<0||w>k||m>k?(g=!1,this.log("Invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)):p.substring(w,m).replace(/\s+/g,"")===""&&(g=!1,this.log("Skipping whitespace only range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:w,end:m,valid:g}}},{key:"getTextNodes",value:function(l){var b=this,p="",m=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(g){m.push({start:p.length,end:(p+=g.textContent).length,node:g})},function(g){return b.matchesExclude(g.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){l({value:p,nodes:m})})}},{key:"matchesExclude",value:function(l){return c.matches(l,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(l,b,p){var m=this.opt.element?this.opt.element:"mark",g=l.splitText(b),k=g.splitText(p-b),v=document.createElement(m);return v.setAttribute("data-markjs","true"),this.opt.className&&v.setAttribute("class",this.opt.className),v.textContent=g.textContent,g.parentNode.replaceChild(v,g),k}},{key:"wrapRangeInMappedTextNode",value:function(l,b,p,m,g){var k=this;l.nodes.every(function(v,w){var _=l.nodes[w+1];if(typeof _>"u"||_.start>b){if(!m(v.node))return!1;var A=b-v.start,L=(p>v.end?v.end:p)-v.start,q=l.value.substr(0,v.start),j=l.value.substr(L+v.start);if(v.node=k.wrapRangeInTextNode(v.node,A,L),l.value=q+j,l.nodes.forEach(function($,W){W>=w&&(l.nodes[W].start>0&&W!==w&&(l.nodes[W].start-=L),l.nodes[W].end-=L)}),p-=L,g(v.node.previousSibling,v.start),p>v.end)b=v.end;else return!1}return!0})}},{key:"wrapMatches",value:function(l,b,p,m,g){var k=this,v=b===0?0:b+1;this.getTextNodes(function(w){w.nodes.forEach(function(_){_=_.node;for(var A=void 0;(A=l.exec(_.textContent))!==null&&A[v]!=="";)if(p(A[v],_)){var L=A.index;if(v!==0)for(var q=1;q<v;q++)L+=A[q].length;_=k.wrapRangeInTextNode(_,L,L+A[v].length),m(_.previousSibling),l.lastIndex=0}}),g()})}},{key:"wrapMatchesAcrossElements",value:function(l,b,p,m,g){var k=this,v=b===0?0:b+1;this.getTextNodes(function(w){for(var _=void 0;(_=l.exec(w.value))!==null&&_[v]!=="";){var A=_.index;if(v!==0)for(var L=1;L<v;L++)A+=_[L].length;var q=A+_[v].length;k.wrapRangeInMappedTextNode(w,A,q,function(j){return p(_[v],j)},function(j,$){l.lastIndex=$,m(j)})}g()})}},{key:"wrapRangeFromIndex",value:function(l,b,p,m){var g=this;this.getTextNodes(function(k){var v=k.value.length;l.forEach(function(w,_){var A=g.checkWhitespaceRanges(w,v,k.value),L=A.start,q=A.end,j=A.valid;j&&g.wrapRangeInMappedTextNode(k,L,q,function($){return b($,w,k.value.substring(L,q),_)},function($){p($,w)})}),m()})}},{key:"unwrapMatches",value:function(l){for(var b=l.parentNode,p=document.createDocumentFragment();l.firstChild;)p.appendChild(l.removeChild(l.firstChild));b.replaceChild(p,l),this.ie?this.normalizeTextNode(b):b.normalize()}},{key:"normalizeTextNode",value:function(l){if(l){if(l.nodeType===3)for(;l.nextSibling&&l.nextSibling.nodeType===3;)l.nodeValue+=l.nextSibling.nodeValue,l.parentNode.removeChild(l.nextSibling);else this.normalizeTextNode(l.firstChild);this.normalizeTextNode(l.nextSibling)}}},{key:"markRegExp",value:function(l,b){var p=this;this.opt=b,this.log('Searching with expression "'+l+'"');var m=0,g="wrapMatches",k=function(w){m++,p.opt.each(w)};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),this[g](l,this.opt.ignoreGroups,function(v,w){return p.opt.filter(w,v,m)},k,function(){m===0&&p.opt.noMatch(l),p.opt.done(m)})}},{key:"mark",value:function(l,b){var p=this;this.opt=b;var m=0,g="wrapMatches",k=this.getSeparatedKeywords(typeof l=="string"?[l]:l),v=k.keywords,w=k.length,_=this.opt.caseSensitive?"":"i",A=function L(q){var j=new RegExp(p.createRegExp(q),"gm"+_),$=0;p.log('Searching with expression "'+j+'"'),p[g](j,1,function(W,se){return p.opt.filter(se,q,m,$)},function(W){$++,m++,p.opt.each(W)},function(){$===0&&p.opt.noMatch(q),v[w-1]===q?p.opt.done(m):L(v[v.indexOf(q)+1])})};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),w===0?this.opt.done(m):A(v[0])}},{key:"markRanges",value:function(l,b){var p=this;this.opt=b;var m=0,g=this.checkRanges(l);g&&g.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(g)),this.wrapRangeFromIndex(g,function(k,v,w,_){return p.opt.filter(k,v,w,_)},function(k,v){m++,p.opt.each(k,v)},function(){p.opt.done(m)})):this.opt.done(m)}},{key:"unmark",value:function(l){var b=this;this.opt=l;var p=this.opt.element?this.opt.element:"*";p+="[data-markjs]",this.opt.className&&(p+="."+this.opt.className),this.log('Removal selector "'+p+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(m){b.unwrapMatches(m)},function(m){var g=c.matches(m,p),k=b.matchesExclude(m);return!g||k?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(l){this._opt=i({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},l)},get:function(){return this._opt}},{key:"iterator",get:function(){return new c(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function s(d){var f=this,l=new a(d);return this.mark=function(b,p){return l.mark(b,p),f},this.markRegExp=function(b,p){return l.markRegExp(b,p),f},this.markRanges=function(b,p){return l.markRanges(b,p),f},this.unmark=function(b){return l.unmark(b),f},this}return s}))})(Wn)),Wn.exports}var ds=ss();const ni=au(ds),kn="markedit-preview-mark",ui="markedit-preview-mark-highlighted";let hn=!1,St,De=0,he=[],yn=null,Vn=null;const qr={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function fs(e){if(St=e,De=0,e.search.length===0){ti();return}const n=In();ri(n),bs(n)}function hs(e){he.length!==0&&(De=e%he.length,oi())}function ti(){yn?.disconnect(),yn=null,St=void 0,De=0,he=[],new ni(In()).unmark()}function ps(){if(le()===be.preview)return{numberOfItems:he.length,currentIndex:De}}function ri(e){const n=St;if(n===void 0||n.search.length===0||hn)return;ms(),hn=!0;const{search:u,caseSensitive:t,wholeWord:r,diacriticInsensitive:i,regexp:c}=n,a=new ni(e),s=()=>{he=Array.from(e.querySelectorAll(`.${kn}`)),De=he.length>0?Math.min(De,he.length-1):0,oi(),hn=!1};a.unmark({done:()=>{if(c)try{const d=t?"":"i";a.markRegExp(new RegExp(u,d),{className:kn,done:s})}catch{hn=!1,De=0,he=[]}else a.mark(u,{className:kn,caseSensitive:t,diacritics:i,separateWordSearch:!1,accuracy:r?"exactly":"partially",done:s})}})}function oi(){const e=le()!==be.sideBySide;he.forEach((n,u)=>{n.classList.toggle(ui,e&&u===De)}),e&&he.length>0&&he[De].scrollIntoView({behavior:"smooth",block:"center"})}function bs(e){yn?.disconnect(),yn=new MutationObserver(()=>{hn||ri(e)}),yn.observe(e,{childList:!0})}function ms(){Vn===null&&(Vn=document.createElement("style"),document.head.appendChild(Vn));const{light:e,dark:n}=qr[cu]??qr.github;Vn.textContent=[`.${kn} { background: ${e} !important; color: inherit !important; }`,`.${ui} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${kn} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(O0(),Ct()?(typeof H.MarkEdit.onAppReady=="function"?H.MarkEdit.onAppReady(()=>{Y0(),setTimeout(()=>{it()},2e3)}):setTimeout(()=>{V0()},4e3),(bn==="automatic"||bn==="quiet")&&setInterval(()=>{it()},6048e5)):as(In()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=Wo;window.MarkEditRenderHtml??=$0;window.__markeditPreviewSPI__={performSearch:fs,setSearchMatchIndex:hs,clearSearch:ti,searchCounterInfo:ps};Ct()&&(H.MarkEdit.addMainMenuItem({title:Z("viewMode"),icon:ci()?"eye":void 0,children:[{title:Z("changeMode"),action:()=>{N0(),lt()},key:Dr.key??"V",modifiers:Dr.modifiers??["Command"]},{separator:!0},et(Z("editMode"),be.edit),et(Z("sideBySideMode"),be.sideBySide),et(Z("previewMode"),be.preview),{separator:!0},...gs(),{separator:!0},{title:`${Z("version")} 1.8.1`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.8.1")},{title:`${Z("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...st()?[{title:Z("updateAndRelaunch"),action:async()=>{const e=await Ko();await Dt(e.tag_name)?H.MarkEdit.relaunchApp():H.MarkEdit.showAlert(Z("failedToUpdate"))}}]:[]]}),H.MarkEdit.addExtension(ii.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(Vo))||(ze.renderUpdater!==void 0&&clearTimeout(ze.renderUpdater),ze.renderUpdater=setTimeout(eu,500)))})),H.MarkEdit.onEditorReady(()=>{zl&&k0(H.MarkEdit.editorView.scrollDOM),z0(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&le()===be.preview&&typeof H.MarkEdit.getFileInfo=="function"&&(await H.MarkEdit.getFileInfo())?.filePath===void 0&&H.MarkEdit.editorAPI.getText().length===0&&su(be.edit,!1)}),eu(),lt(),x0(Zo(),In()),ze.keyDownListener!==void 0&&document.removeEventListener("keydown",ze.keyDownListener),ze.keyDownListener=e=>q0(e),document.addEventListener("keydown",ze.keyDownListener)}));function et(e,n){return{title:e,action:()=>{su(n),lt()},state:()=>({isSelected:le()===n})}}function gs(){const e=[{title:Z("copyHtml"),action:j0},{title:Z("copyRichText"),action:H0}];return typeof H.MarkEdit.showSavePanel>"u"?e:[{title:Z("saveCleanHtml"),action:P0},{title:Z("saveStyledHtml"),action:B0},...e]}function lt(){const e=Jo();e!==void 0&&(e.style.display=le()===be.edit?"none":"")}const ze={renderUpdater:void 0,keyDownListener:void 0};
