"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=u=>n[u]??{}}})();const Lt=require("@codemirror/view"),_=require("markedit-api"),Ot=require("@codemirror/state");function Pt(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function ou(){return typeof __FILE_PATH__=="string"}function Oe(e,n=!0){const u=document.createElement("style");return u.textContent=e,document.head.appendChild(u),u.disabled=!n,u}function Au(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function Nt(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function Bt(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function _e(e){const n=parseInt(e.dataset.lineFrom??"0"),u=parseInt(e.dataset.lineTo??"0");return{from:n,to:u}}function Wn(e,n){let u=0,r=n;for(;r!==null&&r!==e;)u+=r.offsetTop,r=r.offsetParent;return u}function Tn(e,n,u,r=!0){const t=Wn(e,n)+n.offsetHeight*u;tn(e,t,r)}function tn(e,n,u=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:u?"smooth":"instant"})}function qt(e){const n=document.createRange();n.selectNodeContents(e);const u=getSelection();u?.removeAllRanges(),u?.addRange(n)}function jt(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function ye(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function $t(e){const n=await _.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const u=JSON.parse(n);return typeof u=="object"&&u!==null?u:{}}catch(u){return console.error(`Failed to parse JSON from ${e}:`,u),{}}}const Du={};function Ht(e){let n=Du[e];if(n)return n;n=Du[e]=[];for(let u=0;u<128;u++){const r=String.fromCharCode(u);n.push(r)}for(let u=0;u<e.length;u++){const r=e.charCodeAt(u);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function Ae(e,n){typeof n!="string"&&(n=Ae.defaultChars);const u=Ht(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let t="";for(let o=0,a=r.length;o<a;o+=3){const i=parseInt(r.slice(o+1,o+3),16);if(i<128){t+=u[i];continue}if((i&224)===192&&o+3<a){const l=parseInt(r.slice(o+4,o+6),16);if((l&192)===128){const d=i<<6&1984|l&63;d<128?t+="��":t+=String.fromCharCode(d),o+=3;continue}}if((i&240)===224&&o+6<a){const l=parseInt(r.slice(o+4,o+6),16),d=parseInt(r.slice(o+7,o+9),16);if((l&192)===128&&(d&192)===128){const h=i<<12&61440|l<<6&4032|d&63;h<2048||h>=55296&&h<=57343?t+="���":t+=String.fromCharCode(h),o+=6;continue}}if((i&248)===240&&o+9<a){const l=parseInt(r.slice(o+4,o+6),16),d=parseInt(r.slice(o+7,o+9),16),h=parseInt(r.slice(o+10,o+12),16);if((l&192)===128&&(d&192)===128&&(h&192)===128){let c=i<<18&1835008|l<<12&258048|d<<6&4032|h&63;c<65536||c>1114111?t+="����":(c-=65536,t+=String.fromCharCode(55296+(c>>10),56320+(c&1023))),o+=9;continue}}t+="�"}return t})}Ae.defaultChars=";/?:@&=+$,#";Ae.componentChars="";const Fu={};function Ut(e){let n=Fu[e];if(n)return n;n=Fu[e]=[];for(let u=0;u<128;u++){const r=String.fromCharCode(u);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+u.toString(16).toUpperCase()).slice(-2))}for(let u=0;u<e.length;u++)n[e.charCodeAt(u)]=e[u];return n}function We(e,n,u){typeof n!="string"&&(u=n,n=We.defaultChars),typeof u>"u"&&(u=!0);const r=Ut(n);let t="";for(let o=0,a=e.length;o<a;o++){const i=e.charCodeAt(o);if(u&&i===37&&o+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){t+=e.slice(o,o+3),o+=2;continue}if(i<128){t+=r[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&o+1<a){const l=e.charCodeAt(o+1);if(l>=56320&&l<=57343){t+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}t+="%EF%BF%BD";continue}t+=encodeURIComponent(e[o])}return t}We.defaultChars=";/?:@&=+$,-_.!~*'()#";We.componentChars="-_.!~*'()";function iu(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function an(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Gt=/^([a-z0-9.+-]+:)/i,Vt=/:[0-9]*$/,Zt=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Wt=["<",">",'"',"`"," ","\r",`
`,"	"],Yt=["{","}","|","\\","^","`"].concat(Wt),Kt=["'"].concat(Yt),Su=["%","/","?",";","#"].concat(Kt),Tu=["/","?","#"],Jt=255,Mu=/^[+a-z0-9A-Z_-]{0,63}$/,Xt=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Iu={javascript:!0,"javascript:":!0},Ru={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function au(e,n){if(e&&e instanceof an)return e;const u=new an;return u.parse(e,n),u}an.prototype.parse=function(e,n){let u,r,t,o=e;if(o=o.trim(),!n&&e.split("#").length===1){const d=Zt.exec(o);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let a=Gt.exec(o);if(a&&(a=a[0],u=a.toLowerCase(),this.protocol=a,o=o.substr(a.length)),(n||a||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(t=o.substr(0,2)==="//",t&&!(a&&Iu[a])&&(o=o.substr(2),this.slashes=!0)),!Iu[a]&&(t||a&&!Ru[a])){let d=-1;for(let p=0;p<Tu.length;p++)r=o.indexOf(Tu[p]),r!==-1&&(d===-1||r<d)&&(d=r);let h,c;d===-1?c=o.lastIndexOf("@"):c=o.lastIndexOf("@",d),c!==-1&&(h=o.slice(0,c),o=o.slice(c+1),this.auth=h),d=-1;for(let p=0;p<Su.length;p++)r=o.indexOf(Su[p]),r!==-1&&(d===-1||r<d)&&(d=r);d===-1&&(d=o.length),o[d-1]===":"&&d--;const f=o.slice(0,d);o=o.slice(d),this.parseHost(f),this.hostname=this.hostname||"";const s=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!s){const p=this.hostname.split(/\./);for(let b=0,m=p.length;b<m;b++){const k=p[b];if(k&&!k.match(Mu)){let g="";for(let x=0,y=k.length;x<y;x++)k.charCodeAt(x)>127?g+="x":g+=k[x];if(!g.match(Mu)){const x=p.slice(0,b),y=p.slice(b+1),w=k.match(Xt);w&&(x.push(w[1]),y.unshift(w[2])),y.length&&(o=y.join(".")+o),this.hostname=x.join(".");break}}}}this.hostname.length>Jt&&(this.hostname=""),s&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=o.indexOf("#");i!==-1&&(this.hash=o.substr(i),o=o.slice(0,i));const l=o.indexOf("?");return l!==-1&&(this.search=o.substr(l),o=o.slice(0,l)),o&&(this.pathname=o),Ru[u]&&this.hostname&&!this.pathname&&(this.pathname=""),this};an.prototype.parseHost=function(e){let n=Vt.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const Qt=Object.freeze(Object.defineProperty({__proto__:null,decode:Ae,encode:We,format:iu,parse:au},Symbol.toStringTag,{value:"Module"})),gr=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,kr=/[\0-\x1F\x7F-\x9F]/,eo=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,cu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,xr=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,yr=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,no=Object.freeze(Object.defineProperty({__proto__:null,Any:gr,Cc:kr,Cf:eo,P:cu,S:xr,Z:yr},Symbol.toStringTag,{value:"Module"})),uo=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),ro=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Mn;const to=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),oo=(Mn=String.fromCodePoint)!==null&&Mn!==void 0?Mn:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function io(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=to.get(e))!==null&&n!==void 0?n:e}var R;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(R||(R={}));const ao=32;var re;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(re||(re={}));function Yn(e){return e>=R.ZERO&&e<=R.NINE}function co(e){return e>=R.UPPER_A&&e<=R.UPPER_F||e>=R.LOWER_A&&e<=R.LOWER_F}function lo(e){return e>=R.UPPER_A&&e<=R.UPPER_Z||e>=R.LOWER_A&&e<=R.LOWER_Z||Yn(e)}function so(e){return e===R.EQUALS||lo(e)}var M;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(M||(M={}));var Q;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Q||(Q={}));class fo{constructor(n,u,r){this.decodeTree=n,this.emitCodePoint=u,this.errors=r,this.state=M.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Q.Strict}startEntity(n){this.decodeMode=n,this.state=M.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,u){switch(this.state){case M.EntityStart:return n.charCodeAt(u)===R.NUM?(this.state=M.NumericStart,this.consumed+=1,this.stateNumericStart(n,u+1)):(this.state=M.NamedEntity,this.stateNamedEntity(n,u));case M.NumericStart:return this.stateNumericStart(n,u);case M.NumericDecimal:return this.stateNumericDecimal(n,u);case M.NumericHex:return this.stateNumericHex(n,u);case M.NamedEntity:return this.stateNamedEntity(n,u)}}stateNumericStart(n,u){return u>=n.length?-1:(n.charCodeAt(u)|ao)===R.LOWER_X?(this.state=M.NumericHex,this.consumed+=1,this.stateNumericHex(n,u+1)):(this.state=M.NumericDecimal,this.stateNumericDecimal(n,u))}addToNumericResult(n,u,r,t){if(u!==r){const o=r-u;this.result=this.result*Math.pow(t,o)+parseInt(n.substr(u,o),t),this.consumed+=o}}stateNumericHex(n,u){const r=u;for(;u<n.length;){const t=n.charCodeAt(u);if(Yn(t)||co(t))u+=1;else return this.addToNumericResult(n,r,u,16),this.emitNumericEntity(t,3)}return this.addToNumericResult(n,r,u,16),-1}stateNumericDecimal(n,u){const r=u;for(;u<n.length;){const t=n.charCodeAt(u);if(Yn(t))u+=1;else return this.addToNumericResult(n,r,u,10),this.emitNumericEntity(t,2)}return this.addToNumericResult(n,r,u,10),-1}emitNumericEntity(n,u){var r;if(this.consumed<=u)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===R.SEMI)this.consumed+=1;else if(this.decodeMode===Q.Strict)return 0;return this.emitCodePoint(io(this.result),this.consumed),this.errors&&(n!==R.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,u){const{decodeTree:r}=this;let t=r[this.treeIndex],o=(t&re.VALUE_LENGTH)>>14;for(;u<n.length;u++,this.excess++){const a=n.charCodeAt(u);if(this.treeIndex=ho(r,t,this.treeIndex+Math.max(1,o),a),this.treeIndex<0)return this.result===0||this.decodeMode===Q.Attribute&&(o===0||so(a))?0:this.emitNotTerminatedNamedEntity();if(t=r[this.treeIndex],o=(t&re.VALUE_LENGTH)>>14,o!==0){if(a===R.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==Q.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:u,decodeTree:r}=this,t=(r[u]&re.VALUE_LENGTH)>>14;return this.emitNamedEntityData(u,t,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,u,r){const{decodeTree:t}=this;return this.emitCodePoint(u===1?t[n]&~re.VALUE_LENGTH:t[n+1],r),u===3&&this.emitCodePoint(t[n+2],r),r}end(){var n;switch(this.state){case M.NamedEntity:return this.result!==0&&(this.decodeMode!==Q.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case M.NumericDecimal:return this.emitNumericEntity(0,2);case M.NumericHex:return this.emitNumericEntity(0,3);case M.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case M.EntityStart:return 0}}}function wr(e){let n="";const u=new fo(e,r=>n+=oo(r));return function(t,o){let a=0,i=0;for(;(i=t.indexOf("&",i))>=0;){n+=t.slice(a,i),u.startEntity(o);const d=u.write(t,i+1);if(d<0){a=i+u.end();break}a=i+d,i=d===0?a+1:a}const l=n+t.slice(a);return n="",l}}function ho(e,n,u,r){const t=(n&re.BRANCH_LENGTH)>>7,o=n&re.JUMP_TABLE;if(t===0)return o!==0&&r===o?u:-1;if(o){const l=r-o;return l<0||l>=t?-1:e[u+l]-1}let a=u,i=a+t-1;for(;a<=i;){const l=a+i>>>1,d=e[l];if(d<r)a=l+1;else if(d>r)i=l-1;else return e[l+t]}return-1}const vr=wr(uo);wr(ro);function po(e,n=Q.Legacy){return vr(e,n)}function bo(e){return vr(e,Q.Strict)}function mo(e){return Object.prototype.toString.call(e)}function lu(e){return mo(e)==="[object String]"}const go=Object.prototype.hasOwnProperty;function ko(e,n){return go.call(e,n)}function mn(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){if(u){if(typeof u!="object")throw new TypeError(u+"must be object");Object.keys(u).forEach(function(r){e[r]=u[r]})}}),e}function Cr(e,n,u){return[].concat(e.slice(0,n),u,e.slice(n+1))}function su(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function $e(e){if(e>65535){e-=65536;const n=55296+(e>>10),u=56320+(e&1023);return String.fromCharCode(n,u)}return String.fromCharCode(e)}const _r=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,xo=/&([a-z#][a-z0-9]{1,31});/gi,yo=new RegExp(_r.source+"|"+xo.source,"gi"),wo=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function vo(e,n){if(n.charCodeAt(0)===35&&wo.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return su(r)?$e(r):e}const u=po(e);return u!==e?u:e}function Co(e){return e.indexOf("\\")<0?e:e.replace(_r,"$1")}function De(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(yo,function(n,u,r){return u||vo(n,r)})}const _o=/[&<>"]/,Eo=/[&<>"]/g,Ao={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Do(e){return Ao[e]}function ie(e){return _o.test(e)?e.replace(Eo,Do):e}const Fo=/[.?*+^$[\]\\(){}|-]/g;function So(e){return e.replace(Fo,"\\$&")}function D(e){switch(e){case 9:case 32:return!0}return!1}function He(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Er(e){return cu.test(e)||xr.test(e)}function Ue(e){return Er($e(e))}function Ge(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function gn(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function zu(e){return e===32||e===9||e===10||e===13}function kn(e){let n=0;for(;n<e.length&&zu(e.charCodeAt(n));n++);let u=e.length-1;for(;u>=n&&zu(e.charCodeAt(u));u--);return e.slice(n,u+1)}const To={mdurl:Qt,ucmicro:no},Mo=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Cr,asciiTrim:kn,assign:mn,escapeHtml:ie,escapeRE:So,fromCodePoint:$e,has:ko,isMdAsciiPunct:Ge,isPunctChar:Er,isPunctCharCode:Ue,isSpace:D,isString:lu,isValidEntityCode:su,isWhiteSpace:He,lib:To,normalizeReference:gn,unescapeAll:De,unescapeMd:Co},Symbol.toStringTag,{value:"Module"}));function Io(e,n,u){let r,t,o,a;const i=e.posMax,l=e.pos;for(e.pos=n+1,r=1;e.pos<i;){if(o=e.src.charCodeAt(e.pos),o===93&&(r--,r===0)){t=!0;break}if(a=e.pos,e.md.inline.skipToken(e),o===91){if(a===e.pos-1)r++;else if(u)return e.pos=l,-1}}let d=-1;return t&&(d=e.pos),e.pos=l,d}function Ro(e,n,u){let r,t=n;const o={ok:!1,pos:0,str:""};if(e.charCodeAt(t)===60){for(t++;t<u;){if(r=e.charCodeAt(t),r===10||r===60)return o;if(r===62)return o.pos=t+1,o.str=De(e.slice(n+1,t)),o.ok=!0,o;if(r===92&&t+1<u){t+=2;continue}t++}return o}let a=0;for(;t<u&&(r=e.charCodeAt(t),!(r===32||r<32||r===127));){if(r===92&&t+1<u){if(e.charCodeAt(t+1)===32)break;t+=2;continue}if(r===40&&(a++,a>32))return o;if(r===41){if(a===0)break;a--}t++}return n===t||a!==0||(o.str=De(e.slice(n,t)),o.pos=t,o.ok=!0),o}function zo(e,n,u,r){let t,o=n;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)a.str=r.str,a.marker=r.marker;else{if(o>=u)return a;let i=e.charCodeAt(o);if(i!==34&&i!==39&&i!==40)return a;n++,o++,i===40&&(i=41),a.marker=i}for(;o<u;){if(t=e.charCodeAt(o),t===a.marker)return a.pos=o+1,a.str+=De(e.slice(n,o)),a.ok=!0,a;if(t===40&&a.marker===41)return a;t===92&&o+1<u&&o++,o++}return a.can_continue=!0,a.str+=De(e.slice(n,o)),a}const Lo=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Ro,parseLinkLabel:Io,parseLinkTitle:zo},Symbol.toStringTag,{value:"Module"})),J={};J.code_inline=function(e,n,u,r,t){const o=e[n];return"<code"+t.renderAttrs(o)+">"+ie(o.content)+"</code>"};J.code_block=function(e,n,u,r,t){const o=e[n];return"<pre"+t.renderAttrs(o)+"><code>"+ie(e[n].content)+`</code></pre>
`};J.fence=function(e,n,u,r,t){const o=e[n],a=o.info?De(o.info).trim():"";let i="",l="";if(a){const h=a.split(/(\s+)/g);i=h[0],l=h.slice(2).join("")}let d;if(u.highlight?d=u.highlight(o.content,i,l)||ie(o.content):d=ie(o.content),d.indexOf("<pre")===0)return d+`
`;if(a){const h=o.attrIndex("class"),c=o.attrs?o.attrs.slice():[];h<0?c.push(["class",u.langPrefix+i]):(c[h]=c[h].slice(),c[h][1]+=" "+u.langPrefix+i);const f={attrs:c};return`<pre><code${t.renderAttrs(f)}>${d}</code></pre>
`}return`<pre><code${t.renderAttrs(o)}>${d}</code></pre>
`};J.image=function(e,n,u,r,t){const o=e[n];return o.attrs[o.attrIndex("alt")][1]=t.renderInlineAsText(o.children,u,r),t.renderToken(e,n,u)};J.hardbreak=function(e,n,u){return u.xhtmlOut?`<br />
`:`<br>
`};J.softbreak=function(e,n,u){return u.breaks?u.xhtmlOut?`<br />
`:`<br>
`:`
`};J.text=function(e,n){return ie(e[n].content)};J.html_block=function(e,n){return e[n].content};J.html_inline=function(e,n){return e[n].content};function Ie(){this.rules=mn({},J)}Ie.prototype.renderAttrs=function(n){let u,r,t;if(!n.attrs)return"";for(t="",u=0,r=n.attrs.length;u<r;u++)t+=" "+ie(n.attrs[u][0])+'="'+ie(n.attrs[u][1])+'"';return t};Ie.prototype.renderToken=function(n,u,r){const t=n[u];let o="";if(t.hidden)return"";t.block&&t.nesting!==-1&&u&&n[u-1].hidden&&(o+=`
`),o+=(t.nesting===-1?"</":"<")+t.tag,o+=this.renderAttrs(t),t.nesting===0&&r.xhtmlOut&&(o+=" /");let a=!1;if(t.block&&(a=!0,t.nesting===1&&u+1<n.length)){const i=n[u+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===t.tag)&&(a=!1)}return o+=a?`>
`:">",o};Ie.prototype.renderInline=function(e,n,u){let r="";const t=this.rules;for(let o=0,a=e.length;o<a;o++){const i=e[o].type;typeof t[i]<"u"?r+=t[i](e,o,n,u,this):r+=this.renderToken(e,o,n)}return r};Ie.prototype.renderInlineAsText=function(e,n,u){let r="";for(let t=0,o=e.length;t<o;t++)switch(e[t].type){case"text":r+=e[t].content;break;case"image":r+=this.renderInlineAsText(e[t].children,n,u);break;case"html_inline":case"html_block":r+=e[t].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};Ie.prototype.render=function(e,n,u){let r="";const t=this.rules;for(let o=0,a=e.length;o<a;o++){const i=e[o].type;i==="inline"?r+=this.renderInline(e[o].children,n,u):typeof t[i]<"u"?r+=t[i](e,o,n,u,this):r+=this.renderToken(e,o,n,u)}return r};function B(){this.__rules__=[],this.__cache__=null}B.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};B.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(u){u.enabled&&u.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(u){e.__cache__[u]=[],e.__rules__.forEach(function(r){r.enabled&&(u&&r.alt.indexOf(u)<0||e.__cache__[u].push(r.fn))})})};B.prototype.at=function(e,n,u){const r=this.__find__(e),t=u||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=t.alt||[],this.__cache__=null};B.prototype.before=function(e,n,u,r){const t=this.__find__(e),o=r||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(t,0,{name:n,enabled:!0,fn:u,alt:o.alt||[]}),this.__cache__=null};B.prototype.after=function(e,n,u,r){const t=this.__find__(e),o=r||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(t+1,0,{name:n,enabled:!0,fn:u,alt:o.alt||[]}),this.__cache__=null};B.prototype.push=function(e,n,u){const r=u||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};B.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(r){const t=this.__find__(r);if(t<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[t].enabled=!0,u.push(r)},this),this.__cache__=null,u};B.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(u){u.enabled=!1}),this.enable(e,n)};B.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(r){const t=this.__find__(r);if(t<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[t].enabled=!1,u.push(r)},this),this.__cache__=null,u};B.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function V(e,n,u){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=u,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}V.prototype.attrIndex=function(n){if(!this.attrs)return-1;const u=this.attrs;for(let r=0,t=u.length;r<t;r++)if(u[r][0]===n)return r;return-1};V.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};V.prototype.attrSet=function(n,u){const r=this.attrIndex(n),t=[n,u];r<0?this.attrPush(t):this.attrs[r]=t};V.prototype.attrGet=function(n){const u=this.attrIndex(n);let r=null;return u>=0&&(r=this.attrs[u][1]),r};V.prototype.attrJoin=function(n,u){const r=this.attrIndex(n);r<0?this.attrPush([n,u]):this.attrs[r][1]=this.attrs[r][1]+" "+u};function Ar(e,n,u){this.src=e,this.env=u,this.tokens=[],this.inlineMode=!1,this.md=n}Ar.prototype.Token=V;const Oo=/\r\n?|\n/g,Po=/\0/g;function No(e){let n;n=e.src.replace(Oo,`
`),n=n.replace(Po,"�"),e.src=n}function Bo(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function qo(e){const n=e.tokens;for(let u=0,r=n.length;u<r;u++){const t=n[u];t.type==="inline"&&e.md.inline.parse(t.content,e.md,e.env,t.children)}}function jo(e){return/^<a[>\s]/i.test(e)}function $o(e){return/^<\/a\s*>/i.test(e)}function Ho(e){const n=e.tokens;if(e.md.options.linkify)for(let u=0,r=n.length;u<r;u++){if(n[u].type!=="inline"||!e.md.linkify.pretest(n[u].content))continue;let t=n[u].children,o=0;for(let a=t.length-1;a>=0;a--){const i=t[a];if(i.type==="link_close"){for(a--;t[a].level!==i.level&&t[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(jo(i.content)&&o>0&&o--,$o(i.content)&&o++),!(o>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const l=i.content;let d=e.md.linkify.match(l);const h=[];let c=i.level,f=0;d.length>0&&d[0].index===0&&a>0&&t[a-1].type==="text_special"&&(d=d.slice(1));for(let s=0;s<d.length;s++){const p=d[s].url,b=e.md.normalizeLink(p);if(!e.md.validateLink(b))continue;let m=d[s].text;d[s].schema?d[s].schema==="mailto:"&&!/^mailto:/i.test(m)?m=e.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=e.md.normalizeLinkText(m):m=e.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const k=d[s].index;if(k>f){const w=new e.Token("text","",0);w.content=l.slice(f,k),w.level=c,h.push(w)}const g=new e.Token("link_open","a",1);g.attrs=[["href",b]],g.level=c++,g.markup="linkify",g.info="auto",h.push(g);const x=new e.Token("text","",0);x.content=m,x.level=c,h.push(x);const y=new e.Token("link_close","a",-1);y.level=--c,y.markup="linkify",y.info="auto",h.push(y),f=d[s].lastIndex}if(f<l.length){const s=new e.Token("text","",0);s.content=l.slice(f),s.level=c,h.push(s)}n[u].children=t=Cr(t,a,h)}}}}const Dr=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Uo=/\((c|tm|r)\)/i,Go=/\((c|tm|r)\)/ig,Vo={c:"©",r:"®",tm:"™"};function Zo(e,n){return Vo[n.toLowerCase()]}function Wo(e){let n=0;for(let u=e.length-1;u>=0;u--){const r=e[u];r.type==="text"&&!n&&(r.content=r.content.replace(Go,Zo)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Yo(e){let n=0;for(let u=e.length-1;u>=0;u--){const r=e[u];r.type==="text"&&!n&&Dr.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Ko(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(Uo.test(e.tokens[n].content)&&Wo(e.tokens[n].children),Dr.test(e.tokens[n].content)&&Yo(e.tokens[n].children))}const Jo=/['"]/,Lu=/['"]/g,Ou="’";function en(e,n,u,r){e[n]||(e[n]=[]),e[n].push({pos:u,ch:r})}function Xo(e,n){let u="",r=0;n.sort((t,o)=>t.pos-o.pos);for(let t=0;t<n.length;t++){const o=n[t];u+=e.slice(r,o.pos)+o.ch,r=o.pos+1}return u+e.slice(r)}function Qo(e,n){let u;const r=[],t={};for(let o=0;o<e.length;o++){const a=e[o],i=e[o].level;for(u=r.length-1;u>=0&&!(r[u].level<=i);u--);if(r.length=u+1,a.type!=="text")continue;const l=a.content;let d=0;const h=l.length;e:for(;d<h;){Lu.lastIndex=d;const c=Lu.exec(l);if(!c)break;let f=!0,s=!0;d=c.index+1;const p=c[0]==="'";let b=32;if(c.index-1>=0)b=l.charCodeAt(c.index-1);else for(u=o-1;u>=0&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u--)if(e[u].content){b=e[u].content.charCodeAt(e[u].content.length-1);break}let m=32;if(d<h)m=l.charCodeAt(d);else for(u=o+1;u<e.length&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u++)if(e[u].content){m=e[u].content.charCodeAt(0);break}const k=Ge(b)||Ue(b),g=Ge(m)||Ue(m),x=He(b),y=He(m);if(y?f=!1:g&&(x||k||(f=!1)),x?s=!1:k&&(y||g||(s=!1)),m===34&&c[0]==='"'&&b>=48&&b<=57&&(s=f=!1),f&&s&&(f=k,s=g),!f&&!s){p&&en(t,o,c.index,Ou);continue}if(s)for(u=r.length-1;u>=0;u--){let w=r[u];if(r[u].level<i)break;if(w.single===p&&r[u].level===i){w=r[u];let v,E;p?(v=n.md.options.quotes[2],E=n.md.options.quotes[3]):(v=n.md.options.quotes[0],E=n.md.options.quotes[1]),en(t,o,c.index,E),en(t,w.token,w.pos,v),r.length=u;continue e}}f?r.push({token:o,pos:c.index,single:p,level:i}):s&&p&&en(t,o,c.index,Ou)}}Object.keys(t).forEach(function(o){e[o].content=Xo(e[o].content,t[o])})}function ei(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Jo.test(e.tokens[n].content)||Qo(e.tokens[n].children,e)}function ni(e){let n,u;const r=e.tokens,t=r.length;for(let o=0;o<t;o++){if(r[o].type!=="inline")continue;const a=r[o].children,i=a.length;for(n=0;n<i;n++)a[n].type==="text_special"&&(a[n].type="text");for(n=u=0;n<i;n++)a[n].type==="text"&&n+1<i&&a[n+1].type==="text"?a[n+1].content=a[n].content+a[n+1].content:(n!==u&&(a[u]=a[n]),u++);n!==u&&(a.length=u)}}const In=[["normalize",No],["block",Bo],["inline",qo],["linkify",Ho],["replacements",Ko],["smartquotes",ei],["text_join",ni]];function du(){this.ruler=new B;for(let e=0;e<In.length;e++)this.ruler.push(In[e][0],In[e][1])}du.prototype.process=function(e){const n=this.ruler.getRules("");for(let u=0,r=n.length;u<r;u++)n[u](e)};du.prototype.State=Ar;function X(e,n,u,r){this.src=e,this.md=n,this.env=u,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const t=this.src;for(let o=0,a=0,i=0,l=0,d=t.length,h=!1;a<d;a++){const c=t.charCodeAt(a);if(!h)if(D(c)){i++,c===9?l+=4-l%4:l++;continue}else h=!0;(c===10||a===d-1)&&(c!==10&&a++,this.bMarks.push(o),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(l),this.bsCount.push(0),h=!1,i=0,l=0,o=a+1)}this.bMarks.push(t.length),this.eMarks.push(t.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}X.prototype.push=function(e,n,u){const r=new V(e,n,u);return r.block=!0,u<0&&this.level--,r.level=this.level,u>0&&this.level++,this.tokens.push(r),r};X.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};X.prototype.skipEmptyLines=function(n){for(let u=this.lineMax;n<u&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};X.prototype.skipSpaces=function(n){for(let u=this.src.length;n<u;n++){const r=this.src.charCodeAt(n);if(!D(r))break}return n};X.prototype.skipSpacesBack=function(n,u){if(n<=u)return n;for(;n>u;)if(!D(this.src.charCodeAt(--n)))return n+1;return n};X.prototype.skipChars=function(n,u){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===u;n++);return n};X.prototype.skipCharsBack=function(n,u,r){if(n<=r)return n;for(;n>r;)if(u!==this.src.charCodeAt(--n))return n+1;return n};X.prototype.getLines=function(n,u,r,t){if(n>=u)return"";const o=new Array(u-n);for(let a=0,i=n;i<u;i++,a++){let l=0;const d=this.bMarks[i];let h=d,c;for(i+1<u||t?c=this.eMarks[i]+1:c=this.eMarks[i];h<c&&l<r;){const f=this.src.charCodeAt(h);if(D(f))f===9?l+=4-(l+this.bsCount[i])%4:l++;else if(h-d<this.tShift[i])l++;else break;h++}l>r?o[a]=new Array(l-r+1).join(" ")+this.src.slice(h,c):o[a]=this.src.slice(h,c)}return o.join("")};X.prototype.Token=V;const ui=65536;function Rn(e,n){const u=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(u,r)}function Pu(e){const n=[],u=e.length;let r=0,t=e.charCodeAt(r),o=!1,a=0,i="";for(;r<u;)t===124&&(o?(i+=e.substring(a,r-1),a=r):(n.push(i+e.substring(a,r)),i="",a=r+1)),o=t===92,r++,t=e.charCodeAt(r);return n.push(i+e.substring(a)),n}function ri(e,n,u,r){if(n+2>u)return!1;let t=n+1;if(e.sCount[t]<e.blkIndent||e.sCount[t]-e.blkIndent>=4)return!1;let o=e.bMarks[t]+e.tShift[t];if(o>=e.eMarks[t])return!1;const a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58||o>=e.eMarks[t])return!1;const i=e.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58&&!D(i)||a===45&&D(i))return!1;for(;o<e.eMarks[t];){const y=e.src.charCodeAt(o);if(y!==124&&y!==45&&y!==58&&!D(y))return!1;o++}let l=Rn(e,n+1),d=l.split("|");const h=[];for(let y=0;y<d.length;y++){const w=d[y].trim();if(!w){if(y===0||y===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(w))return!1;w.charCodeAt(w.length-1)===58?h.push(w.charCodeAt(0)===58?"center":"right"):w.charCodeAt(0)===58?h.push("left"):h.push("")}if(l=Rn(e,n).trim(),l.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;d=Pu(l),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const c=d.length;if(c===0||c!==h.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const s=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),b=[n,0];p.map=b;const m=e.push("thead_open","thead",1);m.map=[n,n+1];const k=e.push("tr_open","tr",1);k.map=[n,n+1];for(let y=0;y<d.length;y++){const w=e.push("th_open","th",1);h[y]&&(w.attrs=[["style","text-align:"+h[y]]]);const v=e.push("inline","",0);v.content=d[y].trim(),v.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let g,x=0;for(t=n+2;t<u&&!(e.sCount[t]<e.blkIndent);t++){let y=!1;for(let v=0,E=s.length;v<E;v++)if(s[v](e,t,u,!0)){y=!0;break}if(y||(l=Rn(e,t).trim(),!l)||e.sCount[t]-e.blkIndent>=4||(d=Pu(l),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),x+=c-d.length,x>ui))break;if(t===n+2){const v=e.push("tbody_open","tbody",1);v.map=g=[n+2,0]}const w=e.push("tr_open","tr",1);w.map=[t,t+1];for(let v=0;v<c;v++){const E=e.push("td_open","td",1);h[v]&&(E.attrs=[["style","text-align:"+h[v]]]);const A=e.push("inline","",0);A.content=d[v]?d[v].trim():"",A.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return g&&(e.push("tbody_close","tbody",-1),g[1]=t),e.push("table_close","table",-1),b[1]=t,e.parentType=f,e.line=t,!0}function ti(e,n,u){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,t=r;for(;r<u;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,t=r;continue}break}e.line=t;const o=e.push("code_block","code",0);return o.content=e.getLines(n,t,4+e.blkIndent,!1)+`
`,o.map=[n,e.line],!0}function oi(e,n,u,r){let t=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||t+3>o)return!1;const a=e.src.charCodeAt(t);if(a!==126&&a!==96)return!1;let i=t;t=e.skipChars(t,a);let l=t-i;if(l<3)return!1;const d=e.src.slice(i,t),h=e.src.slice(t,o);if(a===96&&h.indexOf(String.fromCharCode(a))>=0)return!1;if(r)return!0;let c=n,f=!1;for(;c++,!(c>=u||(t=i=e.bMarks[c]+e.tShift[c],o=e.eMarks[c],t<o&&e.sCount[c]<e.blkIndent));)if(e.src.charCodeAt(t)===a&&!(e.sCount[c]-e.blkIndent>=4)&&(t=e.skipChars(t,a),!(t-i<l)&&(t=e.skipSpaces(t),!(t<o)))){f=!0;break}l=e.sCount[n],e.line=c+(f?1:0);const s=e.push("fence","code",0);return s.info=h,s.content=e.getLines(n+1,c,l,!0),s.markup=d,s.map=[n,e.line],!0}function ii(e,n,u,r){let t=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];const a=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(t)!==62)return!1;if(r)return!0;const i=[],l=[],d=[],h=[],c=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let s=!1,p;for(p=n;p<u;p++){const x=e.sCount[p]<e.blkIndent;if(t=e.bMarks[p]+e.tShift[p],o=e.eMarks[p],t>=o)break;if(e.src.charCodeAt(t++)===62&&!x){let w=e.sCount[p]+1,v,E;e.src.charCodeAt(t)===32?(t++,w++,E=!1,v=!0):e.src.charCodeAt(t)===9?(v=!0,(e.bsCount[p]+w)%4===3?(t++,w++,E=!1):E=!0):v=!1;let A=w;for(i.push(e.bMarks[p]),e.bMarks[p]=t;t<o;){const L=e.src.charCodeAt(t);if(D(L))L===9?A+=4-(A+e.bsCount[p]+(E?1:0))%4:A++;else break;t++}s=t>=o,l.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(v?1:0),d.push(e.sCount[p]),e.sCount[p]=A-w,h.push(e.tShift[p]),e.tShift[p]=t-e.bMarks[p];continue}if(s)break;let y=!1;for(let w=0,v=c.length;w<v;w++)if(c[w](e,p,u,!0)){y=!0;break}if(y){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),l.push(e.bsCount[p]),h.push(e.tShift[p]),d.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),l.push(e.bsCount[p]),h.push(e.tShift[p]),d.push(e.sCount[p]),e.sCount[p]=-1}const b=e.blkIndent;e.blkIndent=0;const m=e.push("blockquote_open","blockquote",1);m.markup=">";const k=[n,0];m.map=k,e.md.block.tokenize(e,n,p);const g=e.push("blockquote_close","blockquote",-1);g.markup=">",e.lineMax=a,e.parentType=f,k[1]=e.line;for(let x=0;x<h.length;x++)e.bMarks[x+n]=i[x],e.tShift[x+n]=h[x],e.sCount[x+n]=d[x],e.bsCount[x+n]=l[x];return e.blkIndent=b,!0}function ai(e,n,u,r){const t=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.bMarks[n]+e.tShift[n];const a=e.src.charCodeAt(o++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;o<t;){const d=e.src.charCodeAt(o++);if(d!==a&&!D(d))return!1;d===a&&i++}if(i<3)return!1;if(r)return!0;e.line=n+1;const l=e.push("hr","hr",0);return l.map=[n,e.line],l.markup=Array(i+1).join(String.fromCharCode(a)),!0}function Nu(e,n){const u=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const t=e.src.charCodeAt(r++);if(t!==42&&t!==45&&t!==43)return-1;if(r<u){const o=e.src.charCodeAt(r);if(!D(o))return-1}return r}function Bu(e,n){const u=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let t=u;if(t+1>=r)return-1;let o=e.src.charCodeAt(t++);if(o<48||o>57)return-1;for(;;){if(t>=r)return-1;if(o=e.src.charCodeAt(t++),o>=48&&o<=57){if(t-u>=10)return-1;continue}if(o===41||o===46)break;return-1}return t<r&&(o=e.src.charCodeAt(t),!D(o))?-1:t}function ci(e,n){const u=e.level+2;for(let r=n+2,t=e.tokens.length-2;r<t;r++)e.tokens[r].level===u&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function li(e,n,u,r){let t,o,a,i,l=n,d=!0;if(e.sCount[l]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[l]-e.listIndent>=4&&e.sCount[l]<e.blkIndent)return!1;let h=!1;r&&e.parentType==="paragraph"&&e.sCount[l]>=e.blkIndent&&(h=!0);let c,f,s;if((s=Bu(e,l))>=0){if(c=!0,a=e.bMarks[l]+e.tShift[l],f=Number(e.src.slice(a,s-1)),h&&f!==1)return!1}else if((s=Nu(e,l))>=0)c=!1;else return!1;if(h&&e.skipSpaces(s)>=e.eMarks[l])return!1;if(r)return!0;const p=e.src.charCodeAt(s-1),b=e.tokens.length;c?(i=e.push("ordered_list_open","ol",1),f!==1&&(i.attrs=[["start",f]])):i=e.push("bullet_list_open","ul",1);const m=[l,0];i.map=m,i.markup=String.fromCharCode(p);let k=!1;const g=e.md.block.ruler.getRules("list"),x=e.parentType;for(e.parentType="list";l<u;){o=s,t=e.eMarks[l];const y=e.sCount[l]+s-(e.bMarks[l]+e.tShift[l]);let w=y;for(;o<t;){const me=e.src.charCodeAt(o);if(me===9)w+=4-(w+e.bsCount[l])%4;else if(me===32)w++;else break;o++}const v=o;let E;v>=t?E=1:E=w-y,E>4&&(E=1);const A=y+E;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const L=[l,0];i.map=L,c&&(i.info=e.src.slice(a,s-1));const ce=e.tight,Sn=e.tShift[l],It=e.sCount[l],Rt=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=A,e.tight=!0,e.tShift[l]=v-e.bMarks[l],e.sCount[l]=w,v>=t&&e.isEmpty(l+1)?e.line=Math.min(e.line+2,u):e.md.block.tokenize(e,l,u,!0),(!e.tight||k)&&(d=!1),k=e.line-l>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Rt,e.tShift[l]=Sn,e.sCount[l]=It,e.tight=ce,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),l=e.line,L[1]=l,l>=u||e.sCount[l]<e.blkIndent||e.sCount[l]-e.blkIndent>=4)break;let Eu=!1;for(let me=0,zt=g.length;me<zt;me++)if(g[me](e,l,u,!0)){Eu=!0;break}if(Eu)break;if(c){if(s=Bu(e,l),s<0)break;a=e.bMarks[l]+e.tShift[l]}else if(s=Nu(e,l),s<0)break;if(p!==e.src.charCodeAt(s-1))break}return c?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),m[1]=l,e.line=l,e.parentType=x,d&&ci(e,b),!0}function si(e,n,u,r){let t=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],a=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(t)!==91)return!1;function i(g){const x=e.lineMax;if(g>=x||e.isEmpty(g))return null;let y=!1;if(e.sCount[g]-e.blkIndent>3&&(y=!0),e.sCount[g]<0&&(y=!0),!y){const E=e.md.block.ruler.getRules("reference"),A=e.parentType;e.parentType="reference";let L=!1;for(let ce=0,Sn=E.length;ce<Sn;ce++)if(E[ce](e,g,x,!0)){L=!0;break}if(e.parentType=A,L)return null}const w=e.bMarks[g]+e.tShift[g],v=e.eMarks[g];return e.src.slice(w,v+1)}let l=e.src.slice(t,o+1);o=l.length;let d=-1;for(t=1;t<o;t++){const g=l.charCodeAt(t);if(g===91)return!1;if(g===93){d=t;break}else if(g===10){const x=i(a);x!==null&&(l+=x,o=l.length,a++)}else if(g===92&&(t++,t<o&&l.charCodeAt(t)===10)){const x=i(a);x!==null&&(l+=x,o=l.length,a++)}}if(d<0||l.charCodeAt(d+1)!==58)return!1;for(t=d+2;t<o;t++){const g=l.charCodeAt(t);if(g===10){const x=i(a);x!==null&&(l+=x,o=l.length,a++)}else if(!D(g))break}const h=e.md.helpers.parseLinkDestination(l,t,o);if(!h.ok)return!1;const c=e.md.normalizeLink(h.str);if(!e.md.validateLink(c))return!1;t=h.pos;const f=t,s=a,p=t;for(;t<o;t++){const g=l.charCodeAt(t);if(g===10){const x=i(a);x!==null&&(l+=x,o=l.length,a++)}else if(!D(g))break}let b=e.md.helpers.parseLinkTitle(l,t,o);for(;b.can_continue;){const g=i(a);if(g===null)break;l+=g,t=o,o=l.length,a++,b=e.md.helpers.parseLinkTitle(l,t,o,b)}let m;for(t<o&&p!==t&&b.ok?(m=b.str,t=b.pos):(m="",t=f,a=s);t<o;){const g=l.charCodeAt(t);if(!D(g))break;t++}if(t<o&&l.charCodeAt(t)!==10&&m)for(m="",t=f,a=s;t<o;){const g=l.charCodeAt(t);if(!D(g))break;t++}if(t<o&&l.charCodeAt(t)!==10)return!1;const k=gn(l.slice(1,d));return k?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[k]>"u"&&(e.env.references[k]={title:m,href:c}),e.line=a),!0):!1}const di=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],fi="[a-zA-Z_:][a-zA-Z0-9:._-]*",hi="[^\"'=<>`\\x00-\\x20]+",pi="'[^']*'",bi='"[^"]*"',mi="(?:"+hi+"|"+pi+"|"+bi+")",gi="(?:\\s+"+fi+"(?:\\s*=\\s*"+mi+")?)",Fr="<[A-Za-z][A-Za-z0-9\\-]*"+gi+"*\\s*\\/?>",Sr="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",ki="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",xi="<[?][\\s\\S]*?[?]>",yi="<![A-Za-z][^>]*>",wi="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",vi=new RegExp("^(?:"+Fr+"|"+Sr+"|"+ki+"|"+xi+"|"+yi+"|"+wi+")"),Ci=new RegExp("^(?:"+Fr+"|"+Sr+")"),le=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+di.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ci.source+"\\s*$"),/^$/,!1]];function _i(e,n,u,r){let t=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(t)!==60)return!1;let a=e.src.slice(t,o),i=0;for(;i<le.length&&!le[i][0].test(a);i++);if(i===le.length)return!1;if(r)return le[i][2];let l=n+1;const d=le[i][1].test("");if(!le[i][1].test(a)){for(;l<u&&!(e.sCount[l]<e.blkIndent&&(d||!e.isEmpty(l)));l++)if(t=e.bMarks[l]+e.tShift[l],o=e.eMarks[l],a=e.src.slice(t,o),le[i][1].test(a)){a.length!==0&&l++;break}}e.line=l;const h=e.push("html_block","",0);return h.map=[n,l],h.content=e.getLines(n,l,e.blkIndent,!0),!0}function Ei(e,n,u,r){let t=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(t);if(a!==35||t>=o)return!1;let i=1;for(a=e.src.charCodeAt(++t);a===35&&t<o&&i<=6;)i++,a=e.src.charCodeAt(++t);if(i>6||t<o&&!D(a))return!1;if(r)return!0;o=e.skipSpacesBack(o,t);const l=e.skipCharsBack(o,35,t);l>t&&D(e.src.charCodeAt(l-1))&&(o=l),e.line=n+1;const d=e.push("heading_open","h"+String(i),1);d.markup="########".slice(0,i),d.map=[n,e.line];const h=e.push("inline","",0);h.content=kn(e.src.slice(t,o)),h.map=[n,e.line],h.children=[];const c=e.push("heading_close","h"+String(i),-1);return c.markup="########".slice(0,i),!0}function Ai(e,n,u){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const t=e.parentType;e.parentType="paragraph";let o=0,a,i=n+1;for(;i<u&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let s=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(s<p&&(a=e.src.charCodeAt(s),(a===45||a===61)&&(s=e.skipChars(s,a),s=e.skipSpaces(s),s>=p))){o=a===61?1:2;break}}if(e.sCount[i]<0)continue;let f=!1;for(let s=0,p=r.length;s<p;s++)if(r[s](e,i,u,!0)){f=!0;break}if(f)break}if(!o)return e.parentType=t,!1;const l=kn(e.getLines(n,i,e.blkIndent,!1));e.line=i+1;const d=e.push("heading_open","h"+String(o),1);d.markup=String.fromCharCode(a),d.map=[n,e.line];const h=e.push("inline","",0);h.content=l,h.map=[n,e.line-1],h.children=[];const c=e.push("heading_close","h"+String(o),-1);return c.markup=String.fromCharCode(a),e.parentType=t,!0}function Di(e,n,u){const r=e.md.block.ruler.getRules("paragraph"),t=e.parentType;let o=n+1;for(e.parentType="paragraph";o<u&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let d=!1;for(let h=0,c=r.length;h<c;h++)if(r[h](e,o,u,!0)){d=!0;break}if(d)break}const a=kn(e.getLines(n,o,e.blkIndent,!1));e.line=o;const i=e.push("paragraph_open","p",1);i.map=[n,e.line];const l=e.push("inline","",0);return l.content=a,l.map=[n,e.line],l.children=[],e.push("paragraph_close","p",-1),e.parentType=t,!0}const nn=[["table",ri,["paragraph","reference"]],["code",ti],["fence",oi,["paragraph","reference","blockquote","list"]],["blockquote",ii,["paragraph","reference","blockquote","list"]],["hr",ai,["paragraph","reference","blockquote","list"]],["list",li,["paragraph","reference","blockquote"]],["reference",si],["html_block",_i,["paragraph","reference","blockquote"]],["heading",Ei,["paragraph","reference","blockquote"]],["lheading",Ai],["paragraph",Di]];function xn(){this.ruler=new B;for(let e=0;e<nn.length;e++)this.ruler.push(nn[e][0],nn[e][1],{alt:(nn[e][2]||[]).slice()})}xn.prototype.tokenize=function(e,n,u){const r=this.ruler.getRules(""),t=r.length,o=e.md.options.maxNesting;let a=n,i=!1;for(;a<u&&(e.line=a=e.skipEmptyLines(a),!(a>=u||e.sCount[a]<e.blkIndent));){if(e.level>=o){e.line=u;break}const l=e.line;let d=!1;for(let h=0;h<t;h++)if(d=r[h](e,a,u,!1),d){if(l>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<u&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};xn.prototype.parse=function(e,n,u,r){if(!e)return;const t=new this.State(e,n,u,r);this.tokenize(t,t.line,t.lineMax)};xn.prototype.State=X;function Ye(e,n,u,r){this.src=e,this.env=u,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Ye.prototype.pushPending=function(){const e=new V("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};Ye.prototype.push=function(e,n,u){this.pending&&this.pushPending();const r=new V(e,n,u);let t=null;return u<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,u>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],t={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(t),r};Ye.prototype.scanDelims=function(e,n){const u=this.posMax,r=this.src.charCodeAt(e);let t;if(e===0)t=32;else if(e===1)t=this.src.charCodeAt(0),(t&63488)===55296&&(t=65533);else if(t=this.src.charCodeAt(e-1),(t&64512)===56320){const m=this.src.charCodeAt(e-2);t=(m&64512)===55296?65536+(m-55296<<10)+(t-56320):65533}else(t&64512)===55296&&(t=65533);let o=e;for(;o<u&&this.src.charCodeAt(o)===r;)o++;const a=o-e;let i=o<u?this.src.charCodeAt(o):32;if((i&64512)===55296){const m=this.src.charCodeAt(o+1);i=(m&64512)===56320?65536+(i-55296<<10)+(m-56320):65533}else(i&64512)===56320&&(i=65533);const l=Ge(t)||Ue(t),d=Ge(i)||Ue(i),h=He(t),c=He(i),f=!c&&(!d||h||l),s=!h&&(!l||c||d);return{can_open:f&&(n||!s||l),can_close:s&&(n||!f||d),length:a}};Ye.prototype.Token=V;function Fi(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Si(e,n){let u=e.pos;for(;u<e.posMax&&!Fi(e.src.charCodeAt(u));)u++;return u===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,u)),e.pos=u,!0)}const Ti=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Mi(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const u=e.pos,r=e.posMax;if(u+3>r||e.src.charCodeAt(u)!==58||e.src.charCodeAt(u+1)!==47||e.src.charCodeAt(u+2)!==47)return!1;const t=e.pending.match(Ti);if(!t)return!1;const o=t[1],a=e.md.linkify.matchAtStart(e.src.slice(u-o.length));if(!a)return!1;let i=a.url;if(i.length<=o.length)return!1;let l=i.length;for(;l>0&&i.charCodeAt(l-1)===42;)l--;l!==i.length&&(i=i.slice(0,l));const d=e.md.normalizeLink(i);if(!e.md.validateLink(d))return!1;if(!n){e.pending=e.pending.slice(0,-o.length);const h=e.push("link_open","a",1);h.attrs=[["href",d]],h.markup="linkify",h.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=i.length-o.length,!0}function Ii(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==10)return!1;const r=e.pending.length-1,t=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let o=r-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(u++;u<t&&D(e.src.charCodeAt(u));)u++;return e.pos=u,!0}const fu=[];for(let e=0;e<256;e++)fu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){fu[e.charCodeAt(0)]=1});function Ri(e,n){let u=e.pos;const r=e.posMax;if(e.src.charCodeAt(u)!==92||(u++,u>=r))return!1;let t=e.src.charCodeAt(u);if(t===10){for(n||e.push("hardbreak","br",0),u++;u<r&&(t=e.src.charCodeAt(u),!!D(t));)u++;return e.pos=u,!0}let o=e.src[u];if(t>=55296&&t<=56319&&u+1<r){const i=e.src.charCodeAt(u+1);i>=56320&&i<=57343&&(o+=e.src[u+1],u++)}const a="\\"+o;if(!n){const i=e.push("text_special","",0);t<256&&fu[t]!==0?i.content=o:i.content=a,i.markup=a,i.info="escape"}return e.pos=u+1,!0}function zi(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==96)return!1;const t=u;u++;const o=e.posMax;for(;u<o&&e.src.charCodeAt(u)===96;)u++;const a=e.src.slice(t,u),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=t)return n||(e.pending+=a),e.pos+=i,!0;let l=u,d;for(;(d=e.src.indexOf("`",l))!==-1;){for(l=d+1;l<o&&e.src.charCodeAt(l)===96;)l++;const h=l-d;if(h===i){if(!n){const c=e.push("code_inline","code",0);c.markup=a,c.content=e.src.slice(u,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=l,!0}e.backticks[h]=d}return e.backticksScanned=!0,n||(e.pending+=a),e.pos+=i,!0}function Li(e,n){const u=e.pos,r=e.src.charCodeAt(u);if(n||r!==126)return!1;const t=e.scanDelims(e.pos,!0);let o=t.length;const a=String.fromCharCode(r);if(o<2)return!1;let i;o%2&&(i=e.push("text","",0),i.content=a,o--);for(let l=0;l<o;l+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:t.can_open,close:t.can_close});return e.pos+=t.length,!0}function qu(e,n){let u;const r=[],t=n.length;for(let o=0;o<t;o++){const a=n[o];if(a.marker!==126||a.end===-1)continue;const i=n[a.end];u=e.tokens[a.token],u.type="s_open",u.tag="s",u.nesting=1,u.markup="~~",u.content="",u=e.tokens[i.token],u.type="s_close",u.tag="s",u.nesting=-1,u.markup="~~",u.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&r.push(i.token-1)}for(;r.length;){const o=r.pop();let a=o+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,o!==a&&(u=e.tokens[a],e.tokens[a]=e.tokens[o],e.tokens[o]=u)}}function Oi(e){const n=e.tokens_meta,u=e.tokens_meta.length;qu(e,e.delimiters);for(let r=0;r<u;r++)n[r]&&n[r].delimiters&&qu(e,n[r].delimiters)}const Tr={tokenize:Li,postProcess:Oi};function Pi(e,n){const u=e.pos,r=e.src.charCodeAt(u);if(n||r!==95&&r!==42)return!1;const t=e.scanDelims(e.pos,r===42);for(let o=0;o<t.length;o++){const a=e.push("text","",0);a.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:t.length,token:e.tokens.length-1,end:-1,open:t.can_open,close:t.can_close})}return e.pos+=t.length,!0}function ju(e,n){const u=n.length;for(let r=u-1;r>=0;r--){const t=n[r];if(t.marker!==95&&t.marker!==42||t.end===-1)continue;const o=n[t.end],a=r>0&&n[r-1].end===t.end+1&&n[r-1].marker===t.marker&&n[r-1].token===t.token-1&&n[t.end+1].token===o.token+1,i=String.fromCharCode(t.marker),l=e.tokens[t.token];l.type=a?"strong_open":"em_open",l.tag=a?"strong":"em",l.nesting=1,l.markup=a?i+i:i,l.content="";const d=e.tokens[o.token];d.type=a?"strong_close":"em_close",d.tag=a?"strong":"em",d.nesting=-1,d.markup=a?i+i:i,d.content="",a&&(e.tokens[n[r-1].token].content="",e.tokens[n[t.end+1].token].content="",r--)}}function Ni(e){const n=e.tokens_meta,u=e.tokens_meta.length;ju(e,e.delimiters);for(let r=0;r<u;r++)n[r]&&n[r].delimiters&&ju(e,n[r].delimiters)}const Mr={tokenize:Pi,postProcess:Ni};function Bi(e,n){let u,r,t,o,a="",i="",l=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const h=e.pos,c=e.posMax,f=e.pos+1,s=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(s<0)return!1;let p=s+1;if(p<c&&e.src.charCodeAt(p)===40){for(d=!1,p++;p<c&&(u=e.src.charCodeAt(p),!(!D(u)&&u!==10));p++);if(p>=c)return!1;if(l=p,t=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),t.ok){for(a=e.md.normalizeLink(t.str),e.md.validateLink(a)?p=t.pos:a="",l=p;p<c&&(u=e.src.charCodeAt(p),!(!D(u)&&u!==10));p++);if(t=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<c&&l!==p&&t.ok)for(i=t.str,p=t.pos;p<c&&(u=e.src.charCodeAt(p),!(!D(u)&&u!==10));p++);}(p>=c||e.src.charCodeAt(p)!==41)&&(d=!0),p++}if(d){if(typeof e.env.references>"u")return!1;if(p<c&&e.src.charCodeAt(p)===91?(l=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?r=e.src.slice(l,p++):p=s+1):p=s+1,r||(r=e.src.slice(f,s)),o=e.env.references[gn(r)],!o)return e.pos=h,!1;a=o.href,i=o.title}if(!n){e.pos=f,e.posMax=s;const b=e.push("link_open","a",1),m=[["href",a]];b.attrs=m,i&&m.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=c,!0}function qi(e,n){let u,r,t,o,a,i,l,d,h="";const c=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const s=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(o=p+1,o<f&&e.src.charCodeAt(o)===40){for(o++;o<f&&(u=e.src.charCodeAt(o),!(!D(u)&&u!==10));o++);if(o>=f)return!1;for(d=o,i=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),i.ok&&(h=e.md.normalizeLink(i.str),e.md.validateLink(h)?o=i.pos:h=""),d=o;o<f&&(u=e.src.charCodeAt(o),!(!D(u)&&u!==10));o++);if(i=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<f&&d!==o&&i.ok)for(l=i.str,o=i.pos;o<f&&(u=e.src.charCodeAt(o),!(!D(u)&&u!==10));o++);else l="";if(o>=f||e.src.charCodeAt(o)!==41)return e.pos=c,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<f&&e.src.charCodeAt(o)===91?(d=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?t=e.src.slice(d,o++):o=p+1):o=p+1,t||(t=e.src.slice(s,p)),a=e.env.references[gn(t)],!a)return e.pos=c,!1;h=a.href,l=a.title}if(!n){r=e.src.slice(s,p);const b=[];e.md.inline.parse(r,e.md,e.env,b);const m=e.push("image","img",0),k=[["src",h],["alt",""]];m.attrs=k,m.children=b,m.content=r,l&&k.push(["title",l])}return e.pos=o,e.posMax=f,!0}const ji=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,$i=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Hi(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==60)return!1;const r=e.pos,t=e.posMax;for(;;){if(++u>=t)return!1;const a=e.src.charCodeAt(u);if(a===60)return!1;if(a===62)break}const o=e.src.slice(r+1,u);if($i.test(o)){const a=e.md.normalizeLink(o);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}if(ji.test(o)){const a=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}return!1}function Ui(e){return/^<a[>\s]/i.test(e)}function Gi(e){return/^<\/a\s*>/i.test(e)}function Vi(e){const n=e|32;return n>=97&&n<=122}function Zi(e,n){if(!e.md.options.html)return!1;const u=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=u)return!1;const t=e.src.charCodeAt(r+1);if(t!==33&&t!==63&&t!==47&&!Vi(t))return!1;const o=e.src.slice(r).match(vi);if(!o)return!1;if(!n){const a=e.push("html_inline","",0);a.content=o[0],Ui(a.content)&&e.linkLevel++,Gi(a.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}const Wi=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Yi=/^&([a-z][a-z0-9]{1,31});/i;function Ki(e,n){const u=e.pos,r=e.posMax;if(e.src.charCodeAt(u)!==38||u+1>=r)return!1;if(e.src.charCodeAt(u+1)===35){const o=e.src.slice(u).match(Wi);if(o){if(!n){const a=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),i=e.push("text_special","",0);i.content=su(a)?$e(a):$e(65533),i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}else{const o=e.src.slice(u).match(Yi);if(o){const a=bo(o[0]);if(a!==o[0]){if(!n){const i=e.push("text_special","",0);i.content=a,i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function $u(e){const n={},u=e.length;if(!u)return;let r=0,t=-2;const o=[];for(let a=0;a<u;a++){const i=e[a];if(o.push(0),(e[r].marker!==i.marker||t!==i.token-1)&&(r=a),t=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);const l=n[i.marker][(i.open?3:0)+i.length%3];let d=r-o[r]-1,h=d;for(;d>l;d-=o[d]+1){const c=e[d];if(c.marker===i.marker&&c.open&&c.end<0){let f=!1;if((c.close||i.open)&&(c.length+i.length)%3===0&&(c.length%3!==0||i.length%3!==0)&&(f=!0),!f){const s=d>0&&!e[d-1].open?o[d-1]+1:0;o[a]=a-d+s,o[d]=s,i.open=!1,c.end=a,c.close=!1,h=-1,t=-2;break}}}h!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=h)}}function Ji(e){const n=e.tokens_meta,u=e.tokens_meta.length;$u(e.delimiters);for(let r=0;r<u;r++)n[r]&&n[r].delimiters&&$u(n[r].delimiters)}function Xi(e){let n,u,r=0;const t=e.tokens,o=e.tokens.length;for(n=u=0;n<o;n++)t[n].nesting<0&&r--,t[n].level=r,t[n].nesting>0&&r++,t[n].type==="text"&&n+1<o&&t[n+1].type==="text"?t[n+1].content=t[n].content+t[n+1].content:(n!==u&&(t[u]=t[n]),u++);n!==u&&(t.length=u)}const zn=[["text",Si],["linkify",Mi],["newline",Ii],["escape",Ri],["backticks",zi],["strikethrough",Tr.tokenize],["emphasis",Mr.tokenize],["link",Bi],["image",qi],["autolink",Hi],["html_inline",Zi],["entity",Ki]],Ln=[["balance_pairs",Ji],["strikethrough",Tr.postProcess],["emphasis",Mr.postProcess],["fragments_join",Xi]];function Ke(){this.ruler=new B;for(let e=0;e<zn.length;e++)this.ruler.push(zn[e][0],zn[e][1]);this.ruler2=new B;for(let e=0;e<Ln.length;e++)this.ruler2.push(Ln[e][0],Ln[e][1])}Ke.prototype.skipToken=function(e){const n=e.pos,u=this.ruler.getRules(""),r=u.length,t=e.md.options.maxNesting,o=e.cache;if(typeof o[n]<"u"){e.pos=o[n];return}let a=!1;if(e.level<t){for(let i=0;i<r;i++)if(e.level++,a=u[i](e,!0),e.level--,a){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,o[n]=e.pos};Ke.prototype.tokenize=function(e){const n=this.ruler.getRules(""),u=n.length,r=e.posMax,t=e.md.options.maxNesting;for(;e.pos<r;){const o=e.pos;let a=!1;if(e.level<t){for(let i=0;i<u;i++)if(a=n[i](e,!1),a){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Ke.prototype.parse=function(e,n,u,r){const t=new this.State(e,n,u,r);this.tokenize(t);const o=this.ruler2.getRules(""),a=o.length;for(let i=0;i<a;i++)o[i](t)};Ke.prototype.State=Ye;function Qi(e){const n={};e=e||{},n.src_Any=gr.source,n.src_Cc=kr.source,n.src_Z=yr.source,n.src_P=cu.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const u="[><｜]";return n.src_pseudo_letter="(?:(?!"+u+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+u+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+u+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+u+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Kn(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){u&&Object.keys(u).forEach(function(r){e[r]=u[r]})}),e}function yn(e){return Object.prototype.toString.call(e)}function ea(e){return yn(e)==="[object String]"}function na(e){return yn(e)==="[object Object]"}function ua(e){return yn(e)==="[object RegExp]"}function Hu(e){return yn(e)==="[object Function]"}function ra(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Ir={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function ta(e){return Object.keys(e||{}).reduce(function(n,u){return n||Ir.hasOwnProperty(u)},!1)}const oa={"http:":{validate:function(e,n,u){const r=e.slice(n);return u.re.http||(u.re.http=new RegExp("^\\/\\/"+u.re.src_auth+u.re.src_host_port_strict+u.re.src_path,"i")),u.re.http.test(r)?r.match(u.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,u){const r=e.slice(n);return u.re.no_http||(u.re.no_http=new RegExp("^"+u.re.src_auth+"(?:localhost|(?:(?:"+u.re.src_domain+")\\.)+"+u.re.src_domain_root+")"+u.re.src_port+u.re.src_host_terminator+u.re.src_path,"i")),u.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(u.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,u){const r=e.slice(n);return u.re.mailto||(u.re.mailto=new RegExp("^"+u.re.src_email_name+"@"+u.re.src_host_strict,"i")),u.re.mailto.test(r)?r.match(u.re.mailto)[0].length:0}}},ia="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",aa="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function ca(e){return function(n,u){const r=n.slice(u);return e.test(r)?r.match(e)[0].length:0}}function Uu(){return function(e,n){n.normalize(e)}}function cn(e){const n=e.re=Qi(e.__opts__),u=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||u.push(ia),u.push(n.src_xn),n.src_tlds=u.join("|");function r(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const t=[];e.__compiled__={};function o(i,l){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+l)}Object.keys(e.__schemas__).forEach(function(i){const l=e.__schemas__[i];if(l===null)return;const d={validate:null,link:null};if(e.__compiled__[i]=d,na(l)){ua(l.validate)?d.validate=ca(l.validate):Hu(l.validate)?d.validate=l.validate:o(i,l),Hu(l.normalize)?d.normalize=l.normalize:l.normalize?o(i,l):d.normalize=Uu();return}if(ea(l)){t.push(i);return}o(i,l)}),t.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Uu()};const a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(ra).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+a+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+a+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function Rr(e,n,u,r){const t=e.slice(u,r);this.schema=n.toLowerCase(),this.index=u,this.lastIndex=r,this.raw=t,this.text=t,this.url=t}function q(e,n){if(!(this instanceof q))return new q(e,n);n||ta(e)&&(n=e,e={}),this.__opts__=Kn({},Ir,n),this.__schemas__=Kn({},oa,e),this.__compiled__={},this.__tlds__=aa,this.__tlds_replaced__=!1,this.re={},cn(this)}q.prototype.add=function(n,u){return this.__schemas__[n]=u,cn(this),this};q.prototype.set=function(n){return this.__opts__=Kn(this.__opts__,n),this};q.prototype.test=function(n){if(!n.length)return!1;let u,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(u=r.exec(n))!==null;)if(this.testSchemaAt(n,u[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};q.prototype.pretest=function(n){return this.re.pretest.test(n)};q.prototype.testSchemaAt=function(n,u,r){return this.__compiled__[u.toLowerCase()]?this.__compiled__[u.toLowerCase()].validate(n,r,this):0};q.prototype.match=function(n){const u=[],r=[],t=[],o=[];let a,i,l;function d(f,s){return f?s?f.index!==s.index?f.index<s.index?f:s:f.lastIndex>=s.lastIndex?f:s:f:s}if(!n.length)return null;if(this.re.schema_test.test(n))for(l=this.re.schema_search,l.lastIndex=0;(a=l.exec(n))!==null;)i=this.testSchemaAt(n,a[2],l.lastIndex),i&&r.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(l=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,l.lastIndex=0;(a=l.exec(n))!==null;)t.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(l=this.re.email_fuzzy_global,l.lastIndex=0;(a=l.exec(n))!==null;)o.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});const h=[0,0,0];let c=0;for(;;){const f=[r[h[0]],o[h[1]],t[h[2]]],s=d(d(f[0],f[1]),f[2]);if(!s)break;if(s===f[0]?h[0]++:s===f[1]?h[1]++:h[2]++,s.index<c)continue;const p=new Rr(n,s.schema,s.index,s.lastIndex);this.__compiled__[p.schema].normalize(p,this),u.push(p),c=s.lastIndex}return u.length?u:null};q.prototype.matchAtStart=function(n){if(!n.length)return null;const u=this.re.schema_at_start.exec(n);if(!u)return null;const r=this.testSchemaAt(n,u[2],u[0].length);if(!r)return null;const t=new Rr(n,u[2],u.index+u[1].length,u.index+u[0].length+r);return this.__compiled__[t.schema].normalize(t,this),t};q.prototype.tlds=function(n,u){return n=Array.isArray(n)?n:[n],u?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,t,o){return r!==o[t-1]}).reverse(),cn(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,cn(this),this)};q.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};q.prototype.onCompile=function(){};const Ee=2147483647,W=36,hu=1,Ve=26,la=38,sa=700,zr=72,Lr=128,Or="-",da=/^xn--/,fa=/[^\0-\x7F]/,ha=/[\x2E\u3002\uFF0E\uFF61]/g,pa={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},On=W-hu,Y=Math.floor,Pn=String.fromCharCode;function ue(e){throw new RangeError(pa[e])}function ba(e,n){const u=[];let r=e.length;for(;r--;)u[r]=n(e[r]);return u}function Pr(e,n){const u=e.split("@");let r="";u.length>1&&(r=u[0]+"@",e=u[1]),e=e.replace(ha,".");const t=e.split("."),o=ba(t,n).join(".");return r+o}function Nr(e){const n=[];let u=0;const r=e.length;for(;u<r;){const t=e.charCodeAt(u++);if(t>=55296&&t<=56319&&u<r){const o=e.charCodeAt(u++);(o&64512)==56320?n.push(((t&1023)<<10)+(o&1023)+65536):(n.push(t),u--)}else n.push(t)}return n}const ma=e=>String.fromCodePoint(...e),ga=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:W},Gu=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},Br=function(e,n,u){let r=0;for(e=u?Y(e/sa):e>>1,e+=Y(e/n);e>On*Ve>>1;r+=W)e=Y(e/On);return Y(r+(On+1)*e/(e+la))},qr=function(e){const n=[],u=e.length;let r=0,t=Lr,o=zr,a=e.lastIndexOf(Or);a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&ue("not-basic"),n.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<u;){const l=r;for(let h=1,c=W;;c+=W){i>=u&&ue("invalid-input");const f=ga(e.charCodeAt(i++));f>=W&&ue("invalid-input"),f>Y((Ee-r)/h)&&ue("overflow"),r+=f*h;const s=c<=o?hu:c>=o+Ve?Ve:c-o;if(f<s)break;const p=W-s;h>Y(Ee/p)&&ue("overflow"),h*=p}const d=n.length+1;o=Br(r-l,d,l==0),Y(r/d)>Ee-t&&ue("overflow"),t+=Y(r/d),r%=d,n.splice(r++,0,t)}return String.fromCodePoint(...n)},jr=function(e){const n=[];e=Nr(e);const u=e.length;let r=Lr,t=0,o=zr;for(const l of e)l<128&&n.push(Pn(l));const a=n.length;let i=a;for(a&&n.push(Or);i<u;){let l=Ee;for(const h of e)h>=r&&h<l&&(l=h);const d=i+1;l-r>Y((Ee-t)/d)&&ue("overflow"),t+=(l-r)*d,r=l;for(const h of e)if(h<r&&++t>Ee&&ue("overflow"),h===r){let c=t;for(let f=W;;f+=W){const s=f<=o?hu:f>=o+Ve?Ve:f-o;if(c<s)break;const p=c-s,b=W-s;n.push(Pn(Gu(s+p%b,0))),c=Y(p/b)}n.push(Pn(Gu(c,0))),o=Br(t,d,i===a),t=0,++i}++t,++r}return n.join("")},ka=function(e){return Pr(e,function(n){return da.test(n)?qr(n.slice(4).toLowerCase()):n})},xa=function(e){return Pr(e,function(n){return fa.test(n)?"xn--"+jr(n):n})},$r={version:"2.3.1",ucs2:{decode:Nr,encode:ma},decode:qr,encode:jr,toASCII:xa,toUnicode:ka},ya={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},wa={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},va={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Ca={default:ya,zero:wa,commonmark:va},_a=/^(vbscript|javascript|file|data):/,Ea=/^data:image\/(gif|png|jpeg|webp);/;function Aa(e){const n=e.trim().toLowerCase();return _a.test(n)?Ea.test(n):!0}const Hr=["http:","https:","mailto:"];function Da(e){const n=au(e,!0);if(n.hostname&&(!n.protocol||Hr.indexOf(n.protocol)>=0))try{n.hostname=$r.toASCII(n.hostname)}catch{}return We(iu(n))}function Fa(e){const n=au(e,!0);if(n.hostname&&(!n.protocol||Hr.indexOf(n.protocol)>=0))try{n.hostname=$r.toUnicode(n.hostname)}catch{}return Ae(iu(n),Ae.defaultChars+"%")}function j(e,n){if(!(this instanceof j))return new j(e,n);n||lu(e)||(n=e||{},e="default"),this.inline=new Ke,this.block=new xn,this.core=new du,this.renderer=new Ie,this.linkify=new q,this.validateLink=Aa,this.normalizeLink=Da,this.normalizeLinkText=Fa,this.utils=Mo,this.helpers=mn({},Lo),this.options={},this.configure(e),n&&this.set(n)}j.prototype.set=function(e){return mn(this.options,e),this};j.prototype.configure=function(e){const n=this;if(lu(e)){const u=e;if(e=Ca[u],!e)throw new Error('Wrong `markdown-it` preset "'+u+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(u){e.components[u].rules&&n[u].ruler.enableOnly(e.components[u].rules),e.components[u].rules2&&n[u].ruler2.enableOnly(e.components[u].rules2)}),this};j.prototype.enable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){u=u.concat(this[t].ruler.enable(e,!0))},this),u=u.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(t){return u.indexOf(t)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};j.prototype.disable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){u=u.concat(this[t].ruler.disable(e,!0))},this),u=u.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(t){return u.indexOf(t)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};j.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};j.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const u=new this.core.State(e,this,n);return this.core.process(u),u.tokens};j.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};j.prototype.parseInline=function(e,n){const u=new this.core.State(e,this,n);return u.inlineMode=!0,this.core.process(u),u.tokens};j.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var Vu=!1,Fe={false:"push",true:"unshift",after:"push",before:"unshift"},ln={isPermalinkSymbol:!0};function Jn(e,n,u,r){var t;if(!Vu){var o="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(o):console.warn(o),Vu=!0}var a=[Object.assign(new u.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,u)]],Object.entries(n.permalinkAttrs(e,u)))}),Object.assign(new u.Token("html_block","",0),{content:n.permalinkSymbol,meta:ln}),new u.Token("link_close","a",-1)];n.permalinkSpace&&u.tokens[r+1].children[Fe[n.permalinkBefore]](Object.assign(new u.Token("text","",0),{content:" "})),(t=u.tokens[r+1].children)[Fe[n.permalinkBefore]].apply(t,a)}function Ur(e){return"#"+e}function Gr(e){return{}}var Sa={class:"header-anchor",symbol:"#",renderHref:Ur,renderAttrs:Gr};function Je(e){function n(u){return u=Object.assign({},n.defaults,u),function(r,t,o,a){return e(r,u,t,o,a)}}return n.defaults=Object.assign({},Sa),n.renderPermalinkImpl=e,n}function pu(e){var n=[],u=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&u.unshift(["class",n.join(" ")]),u}var wn=Je(function(e,n,u,r,t){var o,a=[Object.assign(new r.Token("link_open","a",1),{attrs:pu([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ln}),new r.Token("link_close","a",-1)];if(n.space){var i=typeof n.space=="string"?n.space:" ";r.tokens[t+1].children[Fe[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:i}))}(o=r.tokens[t+1].children)[Fe[n.placement]].apply(o,a)});Object.assign(wn.defaults,{space:!0,placement:"after",ariaHidden:!1});var de=Je(wn.renderPermalinkImpl);de.defaults=Object.assign({},wn.defaults,{ariaHidden:!0});var Vr=Je(function(e,n,u,r,t){var o=[Object.assign(new r.Token("link_open","a",1),{attrs:pu([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[t+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[t+1]=Object.assign(new r.Token("inline","",0),{children:o})});Object.assign(Vr.defaults,{safariReaderFix:!1});var Zu=Je(function(e,n,u,r,t){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var a=r.tokens[t+1].children.filter(function(c){return c.type==="text"||c.type==="code_inline"}).reduce(function(c,f){return c+f.content},""),i=[],l=[];if(n.class&&l.push(["class",n.class]),l.push(["href",n.renderHref(e,r)]),l.push.apply(l,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(i.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(a)}),new r.Token("span_close","span",-1)),n.space){var d=typeof n.space=="string"?n.space:" ";i[Fe[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:d}))}i[Fe[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ln}),new r.Token("span_close","span",-1))}else i.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ln}));n.style==="aria-label"?l.push(["aria-label",n.assistiveText(a)]):["aria-describedby","aria-labelledby"].includes(n.style)&&l.push([n.style,e]);var h=[Object.assign(new r.Token("link_open","a",1),{attrs:pu(l)})].concat(i,[new r.Token("link_close","a",-1)]);(o=r.tokens).splice.apply(o,[t+3,0].concat(h)),n.wrapper&&(r.tokens.splice(t,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(t+3+h.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function Wu(e,n,u,r){var t=e,o=r;if(u&&Object.prototype.hasOwnProperty.call(n,t))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,t);)t=e+"-"+o,o+=1;return n[t]=!0,t}function we(e,n){n=Object.assign({},we.defaults,n),e.core.ruler.push("anchor",function(u){for(var r,t={},o=u.tokens,a=Array.isArray(n.level)?(r=n.level,function(c){return r.includes(c)}):(function(c){return function(f){return f>=c}})(n.level),i=0;i<o.length;i++){var l=o[i];if(l.type==="heading_open"&&a(Number(l.tag.substr(1)))){var d=n.getTokensText(o[i+1].children),h=l.attrGet("id");h=h==null?Wu(h=n.slugifyWithState?n.slugifyWithState(d,u):n.slugify(d),t,!1,n.uniqueSlugStartIndex):Wu(h,t,!0,n.uniqueSlugStartIndex),l.attrSet("id",h),n.tabIndex!==!1&&l.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(h,n,u,i):(n.permalink||n.renderPermalink&&n.renderPermalink!==Jn)&&n.renderPermalink(h,n,u,i),i=o.indexOf(l),n.callback&&n.callback(l,{slug:h,title:d})}}})}Object.assign(Zu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),we.permalink={__proto__:null,legacy:Jn,renderHref:Ur,renderAttrs:Gr,makePermalink:Je,linkInsideHeader:wn,ariaHidden:de,headerLink:Vr,linkAfterHeader:Zu},we.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:Jn,permalinkClass:de.defaults.class,permalinkSpace:de.defaults.space,permalinkSymbol:"¶",permalinkBefore:de.defaults.placement==="before",permalinkHref:de.defaults.renderHref,permalinkAttrs:de.defaults.renderAttrs},we.default=we;function vn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Nn,Yu;function Ta(){if(Yu)return Nn;Yu=1;function e(r,t){var o,a,i=r.attrs[r.attrIndex("href")][1];for(o=0;o<t.length;++o){if(a=t[o],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function n(r,t,o){Object.keys(o).forEach(function(a){var i,l=o[a];a==="className"&&(a="class"),i=t[r].attrIndex(a),i<0?t[r].attrPush([a,l]):t[r].attrs[i][1]=l})}function u(r,t){t?t=Array.isArray(t)?t:[t]:t=[],Object.freeze(t);var o=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(a,i,l,d,h){var c=e(a[i],t),f=c&&c.attrs;return f&&n(i,a,f),o(a,i,l,d,h)}}return u.defaultRender=function(r,t,o,a,i){return i.renderToken(r,t,o)},Nn=u,Nn}var Ma=Ta();const Ia=vn(Ma);function Ra(e,n,u,r){const t=Number(e[n].meta.id+1).toString();let o="";return typeof r.docId=="string"&&(o=`-${r.docId}-`),o+t}function za(e,n){let u=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),`[${u}]`}function La(e,n,u,r,t){const o=t.rules.footnote_anchor_name(e,n,u,r,t),a=t.rules.footnote_caption(e,n,u,r,t);let i=o;return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${i}">${a}</a></sup>`}function Oa(e,n,u){return(u.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function Pa(){return`</ol>
</section>
`}function Na(e,n,u,r,t){let o=t.rules.footnote_anchor_name(e,n,u,r,t);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function Ba(){return`</li>
`}function qa(e,n,u,r,t){let o=t.rules.footnote_anchor_name(e,n,u,r,t);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function ja(e){const n=e.helpers.parseLinkLabel,u=e.utils.isSpace;e.renderer.rules.footnote_ref=La,e.renderer.rules.footnote_block_open=Oa,e.renderer.rules.footnote_block_close=Pa,e.renderer.rules.footnote_open=Na,e.renderer.rules.footnote_close=Ba,e.renderer.rules.footnote_anchor=qa,e.renderer.rules.footnote_caption=za,e.renderer.rules.footnote_anchor_name=Ra;function r(i,l,d,h){const c=i.bMarks[l]+i.tShift[l],f=i.eMarks[l];if(c+4>f||i.src.charCodeAt(c)!==91||i.src.charCodeAt(c+1)!==94)return!1;let s;for(s=c+2;s<f;s++){if(i.src.charCodeAt(s)===32)return!1;if(i.src.charCodeAt(s)===93)break}if(s===c+2||s+1>=f||i.src.charCodeAt(++s)!==58)return!1;if(h)return!0;s++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const p=i.src.slice(c+2,s-2);i.env.footnotes.refs[`:${p}`]=-1;const b=new i.Token("footnote_reference_open","",1);b.meta={label:p},b.level=i.level++,i.tokens.push(b);const m=i.bMarks[l],k=i.tShift[l],g=i.sCount[l],x=i.parentType,y=s,w=i.sCount[l]+s-(i.bMarks[l]+i.tShift[l]);let v=w;for(;s<f;){const A=i.src.charCodeAt(s);if(u(A))A===9?v+=4-v%4:v++;else break;s++}i.tShift[l]=s-y,i.sCount[l]=v-w,i.bMarks[l]=y,i.blkIndent+=4,i.parentType="footnote",i.sCount[l]<i.blkIndent&&(i.sCount[l]+=i.blkIndent),i.md.block.tokenize(i,l,d,!0),i.parentType=x,i.blkIndent-=4,i.tShift[l]=k,i.sCount[l]=g,i.bMarks[l]=m;const E=new i.Token("footnote_reference_close","",-1);return E.level=--i.level,i.tokens.push(E),!0}function t(i,l){const d=i.posMax,h=i.pos;if(h+2>=d||i.src.charCodeAt(h)!==94||i.src.charCodeAt(h+1)!==91)return!1;const c=h+2,f=n(i,h+1);if(f<0)return!1;if(!l){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const s=i.env.footnotes.list.length,p=[];i.md.inline.parse(i.src.slice(c,f),i.md,i.env,p);const b=i.push("footnote_ref","",0);b.meta={id:s},i.env.footnotes.list[s]={content:i.src.slice(c,f),tokens:p}}return i.pos=f+1,i.posMax=d,!0}function o(i,l){const d=i.posMax,h=i.pos;if(h+3>d||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(h)!==91||i.src.charCodeAt(h+1)!==94)return!1;let c;for(c=h+2;c<d;c++){if(i.src.charCodeAt(c)===32||i.src.charCodeAt(c)===10)return!1;if(i.src.charCodeAt(c)===93)break}if(c===h+2||c>=d)return!1;c++;const f=i.src.slice(h+2,c-1);if(typeof i.env.footnotes.refs[`:${f}`]>"u")return!1;if(!l){i.env.footnotes.list||(i.env.footnotes.list=[]);let s;i.env.footnotes.refs[`:${f}`]<0?(s=i.env.footnotes.list.length,i.env.footnotes.list[s]={label:f,count:0},i.env.footnotes.refs[`:${f}`]=s):s=i.env.footnotes.refs[`:${f}`];const p=i.env.footnotes.list[s].count;i.env.footnotes.list[s].count++;const b=i.push("footnote_ref","",0);b.meta={id:s,subId:p,label:f}}return i.pos=c,i.posMax=d,!0}function a(i){let l,d,h,c=!1;const f={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(p){return p.type==="footnote_reference_open"?(c=!0,d=[],h=p.meta.label,!1):p.type==="footnote_reference_close"?(c=!1,f[":"+h]=d,!1):(c&&d.push(p),!c)}),!i.env.footnotes.list))return;const s=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let p=0,b=s.length;p<b;p++){const m=new i.Token("footnote_open","",1);if(m.meta={id:p,label:s[p].label},i.tokens.push(m),s[p].tokens){l=[];const x=new i.Token("paragraph_open","p",1);x.block=!0,l.push(x);const y=new i.Token("inline","",0);y.children=s[p].tokens,y.content=s[p].content,l.push(y);const w=new i.Token("paragraph_close","p",-1);w.block=!0,l.push(w)}else s[p].label&&(l=f[`:${s[p].label}`]);l&&(i.tokens=i.tokens.concat(l));let k;i.tokens[i.tokens.length-1].type==="paragraph_close"?k=i.tokens.pop():k=null;const g=s[p].count>0?s[p].count:1;for(let x=0;x<g;x++){const y=new i.Token("footnote_anchor","",0);y.meta={id:p,subId:x,label:s[p].label},i.tokens.push(y)}k&&i.tokens.push(k),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",t),e.inline.ruler.after("footnote_inline","footnote_ref",o),e.core.ruler.after("inline","footnote_tail",a)}var Bn,Ku;function $a(){if(Ku)return Bn;Ku=1;var e=!0,n=!1,u=!1;Bn=function(b,m){m&&(e=!m.enabled,n=!!m.label,u=!!m.labelAfter),b.core.ruler.after("inline","github-task-lists",function(k){for(var g=k.tokens,x=2;x<g.length;x++)o(g,x)&&(a(g[x],k.Token),r(g[x-2],"class","task-list-item"+(e?"":" enabled")),r(g[t(g,x-2)],"class","contains-task-list"))})};function r(b,m,k){var g=b.attrIndex(m),x=[m,k];g<0?b.attrPush(x):b.attrs[g]=x}function t(b,m){for(var k=b[m].level-1,g=m-1;g>=0;g--)if(b[g].level===k)return g;return-1}function o(b,m){return c(b[m])&&f(b[m-1])&&s(b[m-2])&&p(b[m])}function a(b,m){if(b.children.unshift(i(b,m)),b.children[1].content=b.children[1].content.slice(3),b.content=b.content.slice(3),n)if(u){b.children.pop();var k="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);b.children[0].content=b.children[0].content.slice(0,-1)+' id="'+k+'">',b.children.push(h(b.content,k,m))}else b.children.unshift(l(m)),b.children.push(d(m))}function i(b,m){var k=new m("html_inline","",0),g=e?' disabled="" ':"";return b.content.indexOf("[ ] ")===0?k.content='<input class="task-list-item-checkbox"'+g+'type="checkbox">':(b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0)&&(k.content='<input class="task-list-item-checkbox" checked=""'+g+'type="checkbox">'),k}function l(b){var m=new b("html_inline","",0);return m.content="<label>",m}function d(b){var m=new b("html_inline","",0);return m.content="</label>",m}function h(b,m,k){var g=new k("html_inline","",0);return g.content='<label class="task-list-item-label" for="'+m+'">'+b+"</label>",g.attrs=[{for:m}],g}function c(b){return b.type==="inline"}function f(b){return b.type==="paragraph_open"}function s(b){return b.type==="list_item_open"}function p(b){return b.content.indexOf("[ ] ")===0||b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0}return Bn}var Ha=$a();const Ua=vn(Ha),Ga={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},Va=(e,n={})=>{const{markers:u=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=Ga,matchCaseSensitive:t=!1,titles:o={},classPrefix:a="markdown-alert"}=n,i=u==="*"?"\\w+":u.join("|"),l=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,t?"":"i");e.core.ruler.after("block","github-alerts",d=>{const h=d.tokens;for(let c=0;c<h.length;c++)if(h[c].type==="blockquote_open"){const f=h[c],s=c;for(;h[c]?.type!=="blockquote_close"&&c<=h.length;)c+=1;const p=h[c],b=c,m=h.slice(s,b+1).find(w=>w.type==="inline");if(!m)continue;const k=m.content.match(l);if(!k)continue;const g=k[1].toLowerCase(),x=k[2].trim()||(o[g]??Za(g)),y=r[g]??"";m.content=m.content.slice(k[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:x,type:g,icon:y},p.type="alert_close",p.tag="div"}}),e.renderer.rules.alert_open=function(d,h){const{title:c,type:f,icon:s}=d[h].meta;return`<div class="${a} ${a}-${f}"><p class="${a}-title">${s}${c}</p>`}};function Za(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Zr(e){return typeof e>"u"||e===null}function Wa(e){return typeof e=="object"&&e!==null}function Ya(e){return Array.isArray(e)?e:Zr(e)?[]:[e]}function Ka(e,n){var u,r,t,o;if(n)for(o=Object.keys(n),u=0,r=o.length;u<r;u+=1)t=o[u],e[t]=n[t];return e}function Ja(e,n){var u="",r;for(r=0;r<n;r+=1)u+=e;return u}function Xa(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var Qa=Zr,e0=Wa,n0=Ya,u0=Ja,r0=Xa,t0=Ka,P={isNothing:Qa,isObject:e0,toArray:n0,repeat:u0,isNegativeZero:r0,extend:t0};function Wr(e,n){var u="",r=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(u+='in "'+e.mark.name+'" '),u+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(u+=`

`+e.mark.snippet),r+" "+u):r}function Ze(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=Wr(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Ze.prototype=Object.create(Error.prototype);Ze.prototype.constructor=Ze;Ze.prototype.toString=function(n){return this.name+": "+Wr(this,n)};var ee=Ze;function qn(e,n,u,r,t){var o="",a="",i=Math.floor(t/2)-1;return r-n>i&&(o=" ... ",n=r-i+o.length),u-r>i&&(a=" ...",u=r+i-a.length),{str:o+e.slice(n,u).replace(/\t/g,"→")+a,pos:r-n+o.length}}function jn(e,n){return P.repeat(" ",n-e.length)+e}function o0(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var u=/\r?\n|\r|\0/g,r=[0],t=[],o,a=-1;o=u.exec(e.buffer);)t.push(o.index),r.push(o.index+o[0].length),e.position<=o.index&&a<0&&(a=r.length-2);a<0&&(a=r.length-1);var i="",l,d,h=Math.min(e.line+n.linesAfter,t.length).toString().length,c=n.maxLength-(n.indent+h+3);for(l=1;l<=n.linesBefore&&!(a-l<0);l++)d=qn(e.buffer,r[a-l],t[a-l],e.position-(r[a]-r[a-l]),c),i=P.repeat(" ",n.indent)+jn((e.line-l+1).toString(),h)+" | "+d.str+`
`+i;for(d=qn(e.buffer,r[a],t[a],e.position,c),i+=P.repeat(" ",n.indent)+jn((e.line+1).toString(),h)+" | "+d.str+`
`,i+=P.repeat("-",n.indent+h+3+d.pos)+`^
`,l=1;l<=n.linesAfter&&!(a+l>=t.length);l++)d=qn(e.buffer,r[a+l],t[a+l],e.position-(r[a]-r[a+l]),c),i+=P.repeat(" ",n.indent)+jn((e.line+l+1).toString(),h)+" | "+d.str+`
`;return i.replace(/\n$/,"")}var i0=o0,a0=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],c0=["scalar","sequence","mapping"];function l0(e){var n={};return e!==null&&Object.keys(e).forEach(function(u){e[u].forEach(function(r){n[String(r)]=u})}),n}function s0(e,n){if(n=n||{},Object.keys(n).forEach(function(u){if(a0.indexOf(u)===-1)throw new ee('Unknown option "'+u+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(u){return u},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=l0(n.styleAliases||null),c0.indexOf(this.kind)===-1)throw new ee('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var O=s0;function Ju(e,n){var u=[];return e[n].forEach(function(r){var t=u.length;u.forEach(function(o,a){o.tag===r.tag&&o.kind===r.kind&&o.multi===r.multi&&(t=a)}),u[t]=r}),u}function d0(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,u;function r(t){t.multi?(e.multi[t.kind].push(t),e.multi.fallback.push(t)):e[t.kind][t.tag]=e.fallback[t.tag]=t}for(n=0,u=arguments.length;n<u;n+=1)arguments[n].forEach(r);return e}function Xn(e){return this.extend(e)}Xn.prototype.extend=function(n){var u=[],r=[];if(n instanceof O)r.push(n);else if(Array.isArray(n))r=r.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(u=u.concat(n.implicit)),n.explicit&&(r=r.concat(n.explicit));else throw new ee("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");u.forEach(function(o){if(!(o instanceof O))throw new ee("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new ee("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new ee("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),r.forEach(function(o){if(!(o instanceof O))throw new ee("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var t=Object.create(Xn.prototype);return t.implicit=(this.implicit||[]).concat(u),t.explicit=(this.explicit||[]).concat(r),t.compiledImplicit=Ju(t,"implicit"),t.compiledExplicit=Ju(t,"explicit"),t.compiledTypeMap=d0(t.compiledImplicit,t.compiledExplicit),t};var f0=Xn,h0=new O("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),p0=new O("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),b0=new O("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),m0=new f0({explicit:[h0,p0,b0]});function g0(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function k0(){return null}function x0(e){return e===null}var y0=new O("tag:yaml.org,2002:null",{kind:"scalar",resolve:g0,construct:k0,predicate:x0,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function w0(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function v0(e){return e==="true"||e==="True"||e==="TRUE"}function C0(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var _0=new O("tag:yaml.org,2002:bool",{kind:"scalar",resolve:w0,construct:v0,predicate:C0,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function E0(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function A0(e){return 48<=e&&e<=55}function D0(e){return 48<=e&&e<=57}function F0(e){if(e===null)return!1;var n=e.length,u=0,r=!1,t;if(!n)return!1;if(t=e[u],(t==="-"||t==="+")&&(t=e[++u]),t==="0"){if(u+1===n)return!0;if(t=e[++u],t==="b"){for(u++;u<n;u++)if(t=e[u],t!=="_"){if(t!=="0"&&t!=="1")return!1;r=!0}return r&&t!=="_"}if(t==="x"){for(u++;u<n;u++)if(t=e[u],t!=="_"){if(!E0(e.charCodeAt(u)))return!1;r=!0}return r&&t!=="_"}if(t==="o"){for(u++;u<n;u++)if(t=e[u],t!=="_"){if(!A0(e.charCodeAt(u)))return!1;r=!0}return r&&t!=="_"}}if(t==="_")return!1;for(;u<n;u++)if(t=e[u],t!=="_"){if(!D0(e.charCodeAt(u)))return!1;r=!0}return!(!r||t==="_")}function S0(e){var n=e,u=1,r;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),r=n[0],(r==="-"||r==="+")&&(r==="-"&&(u=-1),n=n.slice(1),r=n[0]),n==="0")return 0;if(r==="0"){if(n[1]==="b")return u*parseInt(n.slice(2),2);if(n[1]==="x")return u*parseInt(n.slice(2),16);if(n[1]==="o")return u*parseInt(n.slice(2),8)}return u*parseInt(n,10)}function T0(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!P.isNegativeZero(e)}var M0=new O("tag:yaml.org,2002:int",{kind:"scalar",resolve:F0,construct:S0,predicate:T0,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),I0=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function R0(e){return!(e===null||!I0.test(e)||e[e.length-1]==="_")}function z0(e){var n,u;return n=e.replace(/_/g,"").toLowerCase(),u=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?u===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:u*parseFloat(n,10)}var L0=/^[-+]?[0-9]+e/;function O0(e,n){var u;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(P.isNegativeZero(e))return"-0.0";return u=e.toString(10),L0.test(u)?u.replace("e",".e"):u}function P0(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||P.isNegativeZero(e))}var N0=new O("tag:yaml.org,2002:float",{kind:"scalar",resolve:R0,construct:z0,predicate:P0,represent:O0,defaultStyle:"lowercase"}),B0=m0.extend({implicit:[y0,_0,M0,N0]}),Yr=B0,Kr=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Jr=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function q0(e){return e===null?!1:Kr.exec(e)!==null||Jr.exec(e)!==null}function j0(e){var n,u,r,t,o,a,i,l=0,d=null,h,c,f;if(n=Kr.exec(e),n===null&&(n=Jr.exec(e)),n===null)throw new Error("Date resolve error");if(u=+n[1],r=+n[2]-1,t=+n[3],!n[4])return new Date(Date.UTC(u,r,t));if(o=+n[4],a=+n[5],i=+n[6],n[7]){for(l=n[7].slice(0,3);l.length<3;)l+="0";l=+l}return n[9]&&(h=+n[10],c=+(n[11]||0),d=(h*60+c)*6e4,n[9]==="-"&&(d=-d)),f=new Date(Date.UTC(u,r,t,o,a,i,l)),d&&f.setTime(f.getTime()-d),f}function $0(e){return e.toISOString()}var H0=new O("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:q0,construct:j0,instanceOf:Date,represent:$0});function U0(e){return e==="<<"||e===null}var G0=new O("tag:yaml.org,2002:merge",{kind:"scalar",resolve:U0}),bu=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function V0(e){if(e===null)return!1;var n,u,r=0,t=e.length,o=bu;for(u=0;u<t;u++)if(n=o.indexOf(e.charAt(u)),!(n>64)){if(n<0)return!1;r+=6}return r%8===0}function Z0(e){var n,u,r=e.replace(/[\r\n=]/g,""),t=r.length,o=bu,a=0,i=[];for(n=0;n<t;n++)n%4===0&&n&&(i.push(a>>16&255),i.push(a>>8&255),i.push(a&255)),a=a<<6|o.indexOf(r.charAt(n));return u=t%4*6,u===0?(i.push(a>>16&255),i.push(a>>8&255),i.push(a&255)):u===18?(i.push(a>>10&255),i.push(a>>2&255)):u===12&&i.push(a>>4&255),new Uint8Array(i)}function W0(e){var n="",u=0,r,t,o=e.length,a=bu;for(r=0;r<o;r++)r%3===0&&r&&(n+=a[u>>18&63],n+=a[u>>12&63],n+=a[u>>6&63],n+=a[u&63]),u=(u<<8)+e[r];return t=o%3,t===0?(n+=a[u>>18&63],n+=a[u>>12&63],n+=a[u>>6&63],n+=a[u&63]):t===2?(n+=a[u>>10&63],n+=a[u>>4&63],n+=a[u<<2&63],n+=a[64]):t===1&&(n+=a[u>>2&63],n+=a[u<<4&63],n+=a[64],n+=a[64]),n}function Y0(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var K0=new O("tag:yaml.org,2002:binary",{kind:"scalar",resolve:V0,construct:Z0,predicate:Y0,represent:W0}),J0=Object.prototype.hasOwnProperty,X0=Object.prototype.toString;function Q0(e){if(e===null)return!0;var n=[],u,r,t,o,a,i=e;for(u=0,r=i.length;u<r;u+=1){if(t=i[u],a=!1,X0.call(t)!=="[object Object]")return!1;for(o in t)if(J0.call(t,o))if(!a)a=!0;else return!1;if(!a)return!1;if(n.indexOf(o)===-1)n.push(o);else return!1}return!0}function ec(e){return e!==null?e:[]}var nc=new O("tag:yaml.org,2002:omap",{kind:"sequence",resolve:Q0,construct:ec}),uc=Object.prototype.toString;function rc(e){if(e===null)return!0;var n,u,r,t,o,a=e;for(o=new Array(a.length),n=0,u=a.length;n<u;n+=1){if(r=a[n],uc.call(r)!=="[object Object]"||(t=Object.keys(r),t.length!==1))return!1;o[n]=[t[0],r[t[0]]]}return!0}function tc(e){if(e===null)return[];var n,u,r,t,o,a=e;for(o=new Array(a.length),n=0,u=a.length;n<u;n+=1)r=a[n],t=Object.keys(r),o[n]=[t[0],r[t[0]]];return o}var oc=new O("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:rc,construct:tc}),ic=Object.prototype.hasOwnProperty;function ac(e){if(e===null)return!0;var n,u=e;for(n in u)if(ic.call(u,n)&&u[n]!==null)return!1;return!0}function cc(e){return e!==null?e:{}}var lc=new O("tag:yaml.org,2002:set",{kind:"mapping",resolve:ac,construct:cc}),sc=Yr.extend({implicit:[H0,G0],explicit:[K0,nc,oc,lc]}),ae=Object.prototype.hasOwnProperty,sn=1,Xr=2,Qr=3,dn=4,$n=1,dc=2,Xu=3,fc=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,hc=/[\x85\u2028\u2029]/,pc=/[,\[\]\{\}]/,et=/^(?:!|!!|![a-z\-]+!)$/i,nt=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Qu(e){return Object.prototype.toString.call(e)}function K(e){return e===10||e===13}function fe(e){return e===9||e===32}function N(e){return e===9||e===32||e===10||e===13}function ve(e){return e===44||e===91||e===93||e===123||e===125}function bc(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function mc(e){return e===120?2:e===117?4:e===85?8:0}function gc(e){return 48<=e&&e<=57?e-48:-1}function er(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function kc(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function ut(e,n,u){n==="__proto__"?Object.defineProperty(e,n,{configurable:!0,enumerable:!0,writable:!0,value:u}):e[n]=u}var rt=new Array(256),tt=new Array(256);for(var ge=0;ge<256;ge++)rt[ge]=er(ge)?1:0,tt[ge]=er(ge);function xc(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||sc,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function ot(e,n){var u={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return u.snippet=i0(u),new ee(n,u)}function C(e,n){throw ot(e,n)}function fn(e,n){e.onWarning&&e.onWarning.call(null,ot(e,n))}var nr={YAML:function(n,u,r){var t,o,a;n.version!==null&&C(n,"duplication of %YAML directive"),r.length!==1&&C(n,"YAML directive accepts exactly one argument"),t=/^([0-9]+)\.([0-9]+)$/.exec(r[0]),t===null&&C(n,"ill-formed argument of the YAML directive"),o=parseInt(t[1],10),a=parseInt(t[2],10),o!==1&&C(n,"unacceptable YAML version of the document"),n.version=r[0],n.checkLineBreaks=a<2,a!==1&&a!==2&&fn(n,"unsupported YAML version of the document")},TAG:function(n,u,r){var t,o;r.length!==2&&C(n,"TAG directive accepts exactly two arguments"),t=r[0],o=r[1],et.test(t)||C(n,"ill-formed tag handle (first argument) of the TAG directive"),ae.call(n.tagMap,t)&&C(n,'there is a previously declared suffix for "'+t+'" tag handle'),nt.test(o)||C(n,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{C(n,"tag prefix is malformed: "+o)}n.tagMap[t]=o}};function oe(e,n,u,r){var t,o,a,i;if(n<u){if(i=e.input.slice(n,u),r)for(t=0,o=i.length;t<o;t+=1)a=i.charCodeAt(t),a===9||32<=a&&a<=1114111||C(e,"expected valid JSON character");else fc.test(i)&&C(e,"the stream contains non-printable characters");e.result+=i}}function ur(e,n,u,r){var t,o,a,i;for(P.isObject(u)||C(e,"cannot merge mappings; the provided source object is unacceptable"),t=Object.keys(u),a=0,i=t.length;a<i;a+=1)o=t[a],ae.call(n,o)||(ut(n,o,u[o]),r[o]=!0)}function Ce(e,n,u,r,t,o,a,i,l){var d,h;if(Array.isArray(t))for(t=Array.prototype.slice.call(t),d=0,h=t.length;d<h;d+=1)Array.isArray(t[d])&&C(e,"nested arrays are not supported inside keys"),typeof t=="object"&&Qu(t[d])==="[object Object]"&&(t[d]="[object Object]");if(typeof t=="object"&&Qu(t)==="[object Object]"&&(t="[object Object]"),t=String(t),n===null&&(n={}),r==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(d=0,h=o.length;d<h;d+=1)ur(e,n,o[d],u);else ur(e,n,o,u);else!e.json&&!ae.call(u,t)&&ae.call(n,t)&&(e.line=a||e.line,e.lineStart=i||e.lineStart,e.position=l||e.position,C(e,"duplicated mapping key")),ut(n,t,o),delete u[t];return n}function mu(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):C(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function T(e,n,u){for(var r=0,t=e.input.charCodeAt(e.position);t!==0;){for(;fe(t);)t===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),t=e.input.charCodeAt(++e.position);if(n&&t===35)do t=e.input.charCodeAt(++e.position);while(t!==10&&t!==13&&t!==0);if(K(t))for(mu(e),t=e.input.charCodeAt(e.position),r++,e.lineIndent=0;t===32;)e.lineIndent++,t=e.input.charCodeAt(++e.position);else break}return u!==-1&&r!==0&&e.lineIndent<u&&fn(e,"deficient indentation"),r}function Cn(e){var n=e.position,u;return u=e.input.charCodeAt(n),!!((u===45||u===46)&&u===e.input.charCodeAt(n+1)&&u===e.input.charCodeAt(n+2)&&(n+=3,u=e.input.charCodeAt(n),u===0||N(u)))}function gu(e,n){n===1?e.result+=" ":n>1&&(e.result+=P.repeat(`
`,n-1))}function yc(e,n,u){var r,t,o,a,i,l,d,h,c=e.kind,f=e.result,s;if(s=e.input.charCodeAt(e.position),N(s)||ve(s)||s===35||s===38||s===42||s===33||s===124||s===62||s===39||s===34||s===37||s===64||s===96||(s===63||s===45)&&(t=e.input.charCodeAt(e.position+1),N(t)||u&&ve(t)))return!1;for(e.kind="scalar",e.result="",o=a=e.position,i=!1;s!==0;){if(s===58){if(t=e.input.charCodeAt(e.position+1),N(t)||u&&ve(t))break}else if(s===35){if(r=e.input.charCodeAt(e.position-1),N(r))break}else{if(e.position===e.lineStart&&Cn(e)||u&&ve(s))break;if(K(s))if(l=e.line,d=e.lineStart,h=e.lineIndent,T(e,!1,-1),e.lineIndent>=n){i=!0,s=e.input.charCodeAt(e.position);continue}else{e.position=a,e.line=l,e.lineStart=d,e.lineIndent=h;break}}i&&(oe(e,o,a,!1),gu(e,e.line-l),o=a=e.position,i=!1),fe(s)||(a=e.position+1),s=e.input.charCodeAt(++e.position)}return oe(e,o,a,!1),e.result?!0:(e.kind=c,e.result=f,!1)}function wc(e,n){var u,r,t;if(u=e.input.charCodeAt(e.position),u!==39)return!1;for(e.kind="scalar",e.result="",e.position++,r=t=e.position;(u=e.input.charCodeAt(e.position))!==0;)if(u===39)if(oe(e,r,e.position,!0),u=e.input.charCodeAt(++e.position),u===39)r=e.position,e.position++,t=e.position;else return!0;else K(u)?(oe(e,r,t,!0),gu(e,T(e,!1,n)),r=t=e.position):e.position===e.lineStart&&Cn(e)?C(e,"unexpected end of the document within a single quoted scalar"):(e.position++,t=e.position);C(e,"unexpected end of the stream within a single quoted scalar")}function vc(e,n){var u,r,t,o,a,i;if(i=e.input.charCodeAt(e.position),i!==34)return!1;for(e.kind="scalar",e.result="",e.position++,u=r=e.position;(i=e.input.charCodeAt(e.position))!==0;){if(i===34)return oe(e,u,e.position,!0),e.position++,!0;if(i===92){if(oe(e,u,e.position,!0),i=e.input.charCodeAt(++e.position),K(i))T(e,!1,n);else if(i<256&&rt[i])e.result+=tt[i],e.position++;else if((a=mc(i))>0){for(t=a,o=0;t>0;t--)i=e.input.charCodeAt(++e.position),(a=bc(i))>=0?o=(o<<4)+a:C(e,"expected hexadecimal character");e.result+=kc(o),e.position++}else C(e,"unknown escape sequence");u=r=e.position}else K(i)?(oe(e,u,r,!0),gu(e,T(e,!1,n)),u=r=e.position):e.position===e.lineStart&&Cn(e)?C(e,"unexpected end of the document within a double quoted scalar"):(e.position++,r=e.position)}C(e,"unexpected end of the stream within a double quoted scalar")}function Cc(e,n){var u=!0,r,t,o,a=e.tag,i,l=e.anchor,d,h,c,f,s,p=Object.create(null),b,m,k,g;if(g=e.input.charCodeAt(e.position),g===91)h=93,s=!1,i=[];else if(g===123)h=125,s=!0,i={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=i),g=e.input.charCodeAt(++e.position);g!==0;){if(T(e,!0,n),g=e.input.charCodeAt(e.position),g===h)return e.position++,e.tag=a,e.anchor=l,e.kind=s?"mapping":"sequence",e.result=i,!0;u?g===44&&C(e,"expected the node content, but found ','"):C(e,"missed comma between flow collection entries"),m=b=k=null,c=f=!1,g===63&&(d=e.input.charCodeAt(e.position+1),N(d)&&(c=f=!0,e.position++,T(e,!0,n))),r=e.line,t=e.lineStart,o=e.position,Se(e,n,sn,!1,!0),m=e.tag,b=e.result,T(e,!0,n),g=e.input.charCodeAt(e.position),(f||e.line===r)&&g===58&&(c=!0,g=e.input.charCodeAt(++e.position),T(e,!0,n),Se(e,n,sn,!1,!0),k=e.result),s?Ce(e,i,p,m,b,k,r,t,o):c?i.push(Ce(e,null,p,m,b,k,r,t,o)):i.push(b),T(e,!0,n),g=e.input.charCodeAt(e.position),g===44?(u=!0,g=e.input.charCodeAt(++e.position)):u=!1}C(e,"unexpected end of the stream within a flow collection")}function _c(e,n){var u,r,t=$n,o=!1,a=!1,i=n,l=0,d=!1,h,c;if(c=e.input.charCodeAt(e.position),c===124)r=!1;else if(c===62)r=!0;else return!1;for(e.kind="scalar",e.result="";c!==0;)if(c=e.input.charCodeAt(++e.position),c===43||c===45)$n===t?t=c===43?Xu:dc:C(e,"repeat of a chomping mode identifier");else if((h=gc(c))>=0)h===0?C(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?C(e,"repeat of an indentation width identifier"):(i=n+h-1,a=!0);else break;if(fe(c)){do c=e.input.charCodeAt(++e.position);while(fe(c));if(c===35)do c=e.input.charCodeAt(++e.position);while(!K(c)&&c!==0)}for(;c!==0;){for(mu(e),e.lineIndent=0,c=e.input.charCodeAt(e.position);(!a||e.lineIndent<i)&&c===32;)e.lineIndent++,c=e.input.charCodeAt(++e.position);if(!a&&e.lineIndent>i&&(i=e.lineIndent),K(c)){l++;continue}if(e.lineIndent<i){t===Xu?e.result+=P.repeat(`
`,o?1+l:l):t===$n&&o&&(e.result+=`
`);break}for(r?fe(c)?(d=!0,e.result+=P.repeat(`
`,o?1+l:l)):d?(d=!1,e.result+=P.repeat(`
`,l+1)):l===0?o&&(e.result+=" "):e.result+=P.repeat(`
`,l):e.result+=P.repeat(`
`,o?1+l:l),o=!0,a=!0,l=0,u=e.position;!K(c)&&c!==0;)c=e.input.charCodeAt(++e.position);oe(e,u,e.position,!1)}return!0}function rr(e,n){var u,r=e.tag,t=e.anchor,o=[],a,i=!1,l;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),l=e.input.charCodeAt(e.position);l!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,C(e,"tab characters must not be used in indentation")),!(l!==45||(a=e.input.charCodeAt(e.position+1),!N(a))));){if(i=!0,e.position++,T(e,!0,-1)&&e.lineIndent<=n){o.push(null),l=e.input.charCodeAt(e.position);continue}if(u=e.line,Se(e,n,Qr,!1,!0),o.push(e.result),T(e,!0,-1),l=e.input.charCodeAt(e.position),(e.line===u||e.lineIndent>n)&&l!==0)C(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return i?(e.tag=r,e.anchor=t,e.kind="sequence",e.result=o,!0):!1}function Ec(e,n,u){var r,t,o,a,i,l,d=e.tag,h=e.anchor,c={},f=Object.create(null),s=null,p=null,b=null,m=!1,k=!1,g;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=c),g=e.input.charCodeAt(e.position);g!==0;){if(!m&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,C(e,"tab characters must not be used in indentation")),r=e.input.charCodeAt(e.position+1),o=e.line,(g===63||g===58)&&N(r))g===63?(m&&(Ce(e,c,f,s,p,null,a,i,l),s=p=b=null),k=!0,m=!0,t=!0):m?(m=!1,t=!0):C(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,g=r;else{if(a=e.line,i=e.lineStart,l=e.position,!Se(e,u,Xr,!1,!0))break;if(e.line===o){for(g=e.input.charCodeAt(e.position);fe(g);)g=e.input.charCodeAt(++e.position);if(g===58)g=e.input.charCodeAt(++e.position),N(g)||C(e,"a whitespace character is expected after the key-value separator within a block mapping"),m&&(Ce(e,c,f,s,p,null,a,i,l),s=p=b=null),k=!0,m=!1,t=!1,s=e.tag,p=e.result;else if(k)C(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=d,e.anchor=h,!0}else if(k)C(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=d,e.anchor=h,!0}if((e.line===o||e.lineIndent>n)&&(m&&(a=e.line,i=e.lineStart,l=e.position),Se(e,n,dn,!0,t)&&(m?p=e.result:b=e.result),m||(Ce(e,c,f,s,p,b,a,i,l),s=p=b=null),T(e,!0,-1),g=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>n)&&g!==0)C(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return m&&Ce(e,c,f,s,p,null,a,i,l),k&&(e.tag=d,e.anchor=h,e.kind="mapping",e.result=c),k}function Ac(e){var n,u=!1,r=!1,t,o,a;if(a=e.input.charCodeAt(e.position),a!==33)return!1;if(e.tag!==null&&C(e,"duplication of a tag property"),a=e.input.charCodeAt(++e.position),a===60?(u=!0,a=e.input.charCodeAt(++e.position)):a===33?(r=!0,t="!!",a=e.input.charCodeAt(++e.position)):t="!",n=e.position,u){do a=e.input.charCodeAt(++e.position);while(a!==0&&a!==62);e.position<e.length?(o=e.input.slice(n,e.position),a=e.input.charCodeAt(++e.position)):C(e,"unexpected end of the stream within a verbatim tag")}else{for(;a!==0&&!N(a);)a===33&&(r?C(e,"tag suffix cannot contain exclamation marks"):(t=e.input.slice(n-1,e.position+1),et.test(t)||C(e,"named tag handle cannot contain such characters"),r=!0,n=e.position+1)),a=e.input.charCodeAt(++e.position);o=e.input.slice(n,e.position),pc.test(o)&&C(e,"tag suffix cannot contain flow indicator characters")}o&&!nt.test(o)&&C(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{C(e,"tag name is malformed: "+o)}return u?e.tag=o:ae.call(e.tagMap,t)?e.tag=e.tagMap[t]+o:t==="!"?e.tag="!"+o:t==="!!"?e.tag="tag:yaml.org,2002:"+o:C(e,'undeclared tag handle "'+t+'"'),!0}function Dc(e){var n,u;if(u=e.input.charCodeAt(e.position),u!==38)return!1;for(e.anchor!==null&&C(e,"duplication of an anchor property"),u=e.input.charCodeAt(++e.position),n=e.position;u!==0&&!N(u)&&!ve(u);)u=e.input.charCodeAt(++e.position);return e.position===n&&C(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function Fc(e){var n,u,r;if(r=e.input.charCodeAt(e.position),r!==42)return!1;for(r=e.input.charCodeAt(++e.position),n=e.position;r!==0&&!N(r)&&!ve(r);)r=e.input.charCodeAt(++e.position);return e.position===n&&C(e,"name of an alias node must contain at least one character"),u=e.input.slice(n,e.position),ae.call(e.anchorMap,u)||C(e,'unidentified alias "'+u+'"'),e.result=e.anchorMap[u],T(e,!0,-1),!0}function Se(e,n,u,r,t){var o,a,i,l=1,d=!1,h=!1,c,f,s,p,b,m;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=a=i=dn===u||Qr===u,r&&T(e,!0,-1)&&(d=!0,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)),l===1)for(;Ac(e)||Dc(e);)T(e,!0,-1)?(d=!0,i=o,e.lineIndent>n?l=1:e.lineIndent===n?l=0:e.lineIndent<n&&(l=-1)):i=!1;if(i&&(i=d||t),(l===1||dn===u)&&(sn===u||Xr===u?b=n:b=n+1,m=e.position-e.lineStart,l===1?i&&(rr(e,m)||Ec(e,m,b))||Cc(e,b)?h=!0:(a&&_c(e,b)||wc(e,b)||vc(e,b)?h=!0:Fc(e)?(h=!0,(e.tag!==null||e.anchor!==null)&&C(e,"alias node should not have any properties")):yc(e,b,sn===u)&&(h=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):l===0&&(h=i&&rr(e,m))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&C(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),c=0,f=e.implicitTypes.length;c<f;c+=1)if(p=e.implicitTypes[c],p.resolve(e.result)){e.result=p.construct(e.result),e.tag=p.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(ae.call(e.typeMap[e.kind||"fallback"],e.tag))p=e.typeMap[e.kind||"fallback"][e.tag];else for(p=null,s=e.typeMap.multi[e.kind||"fallback"],c=0,f=s.length;c<f;c+=1)if(e.tag.slice(0,s[c].tag.length)===s[c].tag){p=s[c];break}p||C(e,"unknown tag !<"+e.tag+">"),e.result!==null&&p.kind!==e.kind&&C(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+p.kind+'", not "'+e.kind+'"'),p.resolve(e.result,e.tag)?(e.result=p.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):C(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||h}function Sc(e){var n=e.position,u,r,t,o=!1,a;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(a=e.input.charCodeAt(e.position))!==0&&(T(e,!0,-1),a=e.input.charCodeAt(e.position),!(e.lineIndent>0||a!==37));){for(o=!0,a=e.input.charCodeAt(++e.position),u=e.position;a!==0&&!N(a);)a=e.input.charCodeAt(++e.position);for(r=e.input.slice(u,e.position),t=[],r.length<1&&C(e,"directive name must not be less than one character in length");a!==0;){for(;fe(a);)a=e.input.charCodeAt(++e.position);if(a===35){do a=e.input.charCodeAt(++e.position);while(a!==0&&!K(a));break}if(K(a))break;for(u=e.position;a!==0&&!N(a);)a=e.input.charCodeAt(++e.position);t.push(e.input.slice(u,e.position))}a!==0&&mu(e),ae.call(nr,r)?nr[r](e,r,t):fn(e,'unknown document directive "'+r+'"')}if(T(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,T(e,!0,-1)):o&&C(e,"directives end mark is expected"),Se(e,e.lineIndent-1,dn,!1,!0),T(e,!0,-1),e.checkLineBreaks&&hc.test(e.input.slice(n,e.position))&&fn(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&Cn(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,T(e,!0,-1));return}if(e.position<e.length-1)C(e,"end of the stream or a document separator is expected");else return}function Tc(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var u=new xc(e,n),r=e.indexOf("\0");for(r!==-1&&(u.position=r,C(u,"null byte is not allowed in input")),u.input+="\0";u.input.charCodeAt(u.position)===32;)u.lineIndent+=1,u.position+=1;for(;u.position<u.length-1;)Sc(u);return u.documents}function Mc(e,n){var u=Tc(e,n);if(u.length!==0){if(u.length===1)return u[0];throw new ee("expected a single document in the stream, but found more")}}var Ic=Mc,Rc={load:Ic},zc=Yr,Lc=Rc.load,Hn,tr;function Oc(){return tr||(tr=1,Hn=function(n,u){var r=3,t="-",o=t.charCodeAt(0),a=t.length;function i(l,d,h,c){var f,s,p,b,m,k,g,x=!1,y=l.bMarks[d]+l.tShift[d],w=l.eMarks[d];if(d!==0||o!==l.src.charCodeAt(0))return!1;for(f=y+1;f<=w;f++)if(t[(f-y)%a]!==l.src[f]){g=f+1;break}if(p=Math.floor((f-y)/a),p<r)return!1;if(f-=(f-y)%a,c)return!0;for(s=d;s++,!(s>=h||l.src.slice(y,w)==="..."||(y=l.bMarks[s]+l.tShift[s],w=l.eMarks[s],y<w&&l.sCount[s]<l.blkIndent));)if(o===l.src.charCodeAt(y)&&!(l.sCount[s]-l.blkIndent>=4)){for(f=y+1;f<=w&&t[(f-y)%a]===l.src[f];f++);if(!(Math.floor((f-y)/a)<p)&&(f-=(f-y)%a,f=l.skipSpaces(f),!(f<w))){x=!0;break}}return m=l.parentType,k=l.lineMax,l.parentType="container",l.lineMax=s,b=l.push("front_matter",null,0),b.hidden=!0,b.markup=l.src.slice(d,f),b.block=!0,b.map=[d,s+(x?1:0)],b.meta=l.src.slice(g,y-1),l.parentType=m,l.lineMax=k,l.line=s+(x?1:0),u(b.meta),!0}n.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),Hn}var Pc=Oc();const Nc=vn(Pc);function Bc(){return e=>{let n="";e.use(Nc,u=>{const r=qc(u);r!==void 0?n=it(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(u,r,t,o,a)=>n===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(u[r])}>
${n}
</table>
`}}function qc(e){try{const n=Lc(e,{schema:zc});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function it(e,n){const u=Object.entries(e);return u.length===0?"":`<tbody>
${u.map(([t,o])=>`<tr><th scope="row">${n(t)}</th><td>${Qn(o,n)}</td></tr>`).join(`
`)}
</tbody>`}function Qn(e,n){if(e==null)return"";if(e instanceof Date)return n(jc(e));if(Array.isArray(e))return e.every($c)?e.map(r=>Qn(r,n)).join(", "):`<ul>${e.map(r=>`<li>${Qn(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const u=it(e,n);return u===""?"":`<table>${u}</table>`}return n(String(e))}function jc(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function $c(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const ku={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},Hc=Re(_.MarkEdit.userSettings),$=Re(Hc[ku.rootValueKey]),at=Re($.changeMode),ct=Re($.markdownIt),Uc=["automatic","quiet","notify","never"],Pe=(()=>{const e=$.updateBehavior;return e&&Uc.includes(e)?e:Xe($.autoUpdate)?"quiet":"never"})(),Gc=Xe($.syncScroll);Xe($.hidePreviewButtons);Xe($.syntaxAutoDetect,!1);const Vc=Xe($.imageHoverPreview,!1),_n=$.themeName??"github",lt=_n==="none",un=$.styledHtmlColorScheme??$.styledHtmlTheme??"auto";$.mathDelimiters;const Zc=at.modes??ku.defaultModes,or=Re(at.hotKey),Wc=ct.preset??ku.defaultPreset,Yc=Re(ct.options);function Re(e,n={}){return e??n}function Xe(e,n=!0){return e??n}const Kc=`.markdown-body {
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
`,Jc=`.markdown-body {
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
`,Xc=`.markdown-body {
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
`,Qc=`.markdown-body {
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
`,el=`.markdown-body {
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
`,nl=`.markdown-body {
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
`,ul=`.markdown-body {
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
`,rl=`.markdown-body {
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
`,tl=`.markdown-body {
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
`,ol=`.markdown-body {
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
`,il=`.markdown-body {
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
`,al=`.markdown-body {
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
`,cl=`.markdown-body {
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
`,ll=`.markdown-body {
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
`,sl=`.markdown-body {
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
`,dl=`.markdown-body {
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
`,fl=`.markdown-body {
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
`,hl=`.markdown-alert {
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
`,pl=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,bl=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,ml=`.code-copy-wrapper {
  position: relative;
}

.code-copy-button {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  border: none;
  border-radius: 8px;
  padding: 6px 7px;
  background: none;

  /* Prevent elements from moving during opacity changes in Safari */
  will-change: opacity, background;
}
`,gl=`.code-copy-button {
  color: #5b636d;
}

.code-copy-button:hover {
  background: #eeeeee;
}

.code-copy-button:active {
  background: #dddddd;
}
`,kl=`.code-copy-button {
  color: #9398a0;
}

.code-copy-button:hover {
  background: #222222;
}

.code-copy-button:active {
  background: #333333;
}
`,hn={github:{light:Jc,dark:Xc},cobalt:{dark:Qc},dracula:{dark:el},minimal:{light:nl,dark:ul},"night-owl":{dark:rl},"rose-pine":{light:tl,dark:ol},solarized:{light:il,dark:al},synthwave84:{dark:cl},"winter-is-coming":{light:ll,dark:sl},xcode:{light:dl,dark:fl}};function xl(e="auto"){if(lt)return"";const n=hn[_n]??hn.github,u=n.light??n.dark,r=n.dark??n.light,t=Au(u)??"#ffffff",o=Au(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...En(e,`body { background: ${t}; }`,`body { background: ${o}; }`)].join(`
`)}function st(e="auto"){if(lt)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=hn[_n]??hn.github,u=n.light??n.dark,r=n.dark??n.light;return[Kc,...En(e,u,r)].join(`
`)}function yl(e="auto"){return[hl,...En(e,pl,bl)].join(`
`)}function dt(e="auto"){return[ml,...En(e,gl,kl)].join(`
`)}function En(e,n,u){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(u);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${u}
        }`);break}return r}const wl={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function F(e){return Cl[e]}const vl=["default","zh-CN","zh-TW"],Cl=wl[(()=>{const e=navigator.language;return vl.includes(e)?e:"default"})()];function xu(){return typeof _.MarkEdit.addExtension=="function"}async function yu(e,n=!0){return await Al,U.render(e,{lineInfo:n})}function ft(e){e()}async function ht(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(xl(un)),n(st(un)),n(yl(un)),n(dt(un)),"</body></html>"].join(`
`)}const U=j(Wc,{html:!0,breaks:!0,linkify:!0,...Yc}),_l=[];U.use(Bc());U.use(we);U.use(Ia,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});U.use(ja);U.use(Ua,{enabled:xu(),label:!0});U.use(Va);const El=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),Al=Promise.all(_l).then(()=>{for(const e of El){const n=U.renderer.rules[e];U.renderer.rules[e]=(u,r,t,o,a)=>{const i=u[r];return o.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),n?n(u,r,t,o,a):a.renderToken(u,r,t)}}for(const e of["fence","code_block"]){const n=U.renderer.rules[e];U.renderer.rules[e]=(u,r,t,o,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?a.renderToken(u,r,t):n(u,r,t,o,a)}
        <button title="${F("copyCode")}" aria-label="${F("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),Dl=new DOMParser,Fl="image-loader",wu="cm-md-image-preview",ir=5;function pt(e){const n=Dl.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const t=r.getAttribute("src");t!==null&&(t.includes("://")||t.startsWith("data:image/")||(r.src=`${Fl}://${t}`))}),n.body.innerHTML}function Sl(e){typeof _.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{te.panelPresenter!==void 0&&(clearTimeout(te.panelPresenter),te.panelPresenter=void 0),te.panelPresenter=setTimeout(()=>{const u=n.target,r=u?.closest(".cm-md-link"),t=r?.dataset.linkUrl??r?.innerText??"";r!==null&&jt(t)?Tl(r,t):u?.classList.contains(wu)||Ne()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ne(!1)}),e.addEventListener("scroll",()=>Ne()))}async function Tl(e,n){if(e===te.focusedElement)return;const u=(await _.MarkEdit.getFileInfo())?.parentPath;if(u===void 0)return;const r=ye(u,n),t=await _.MarkEdit.getFileObject(r);if(t===void 0)return;const o=e.getBoundingClientRect(),a=document.createElement("img");a.className=wu,a.style.position="fixed",a.style.left=`${o.left}px`,a.style.zIndex="10000",a.style.borderRadius="5px",a.style.opacity="0",a.style.transition="opacity 120ms",a.style.cursor="pointer",a.onclick=()=>{Ne(),window.open(n,"_blank")},a.onload=()=>{const l=Math.min(a.naturalHeight,240);a.style.height=`${l}px`;const d=o.top,h=window.innerHeight-o.bottom;d>h?a.style.top=`${o.top-l-ir}px`:a.style.top=`${o.bottom+ir}px`,requestAnimationFrame(()=>{a.style.opacity="1"})};const i=t.mimeType??"image/png";a.src=`data:${i};base64,${t.data}`,Ne(!1),te.focusedElement=e,document.body.appendChild(a)}function Ne(e=!0){te.focusedElement!==void 0&&(te.focusedElement=void 0,document.querySelectorAll(`.${wu}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const te={panelPresenter:void 0,focusedElement:void 0};function Ml(e,n){Gc&&("onscrollend"in window?e.addEventListener("scrollend",()=>eu(e,n)):e.addEventListener("scroll",()=>{Un.scrollUpdater!==void 0&&clearTimeout(Un.scrollUpdater),Un.scrollUpdater=setTimeout(()=>{eu(e,n)},100)}))}function eu(e,n,u=!0){const{line:r,progress:t}=Il(e);Rl(n,r,t,u)}function Il(e,n=0){const u=_.MarkEdit.editorView,r=u.lineBlockAtHeight(e.scrollTop+n),t=u.state.doc.lineAt(r.from).number-1,o=Bt(u.domAtPos(r.from).node);if(o===null)return{line:t,progress:0};const a=e.getBoundingClientRect(),i=o.getBoundingClientRect(),l=a.top-i.top-n,d=i.height>0?vu(l/i.height):0;return{line:t,progress:d}}function Rl(e,n,u,r=!0){if(n===0&&u===0)return tn(e,0,r);const t=Array.from(document.querySelectorAll("[data-line-from]")),o=zl(t,n);if(o!==void 0){const{from:l,to:d}=_e(o);return Tn(e,o,Ll(n,u,l,d),r)}if(n===0)return tn(e,0,r);const{beforeBlock:a,afterBlock:i}=Ol(t,n);if(a!==void 0&&i!==void 0){const l=_e(a),d=_e(i),h=Wn(e,a)+a.offsetHeight,c=Wn(e,i),f=d.from-l.to,s=n-l.to+u,p=f>0?vu(s/f):0,b=h+(c-h)*p;return tn(e,b,r)}if(a!==void 0)return Tn(e,a,1,r);if(i!==void 0)return Tn(e,i,0,r)}function zl(e,n){return e.find(u=>{const{from:r,to:t}=_e(u);return n>=r&&n<=t})}function Ll(e,n,u,r){const t=r-u;if(t<1)return e===u?n:0;const o=e-u+n;return vu(o/t)}function Ol(e,n){let u,r;for(const t of e){const{from:o,to:a}=_e(t);if(a<n)u=t;else if(o>n){r=t;break}}return{beforeBlock:u,afterBlock:r}}function vu(e){return Math.max(0,Math.min(1,e))}const Un={scrollUpdater:void 0};function Pl(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}const he={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},An={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var Gn=function(e,n){return Number(e.slice(0,-1*n.length))},Nl=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Gn(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Gn(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Gn(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},bt=function(e){return e.split(" ").map(Nl)},Bl=function(e,n,u,r){u===void 0&&(u=0),r===void 0&&(r=!1);var t=r?e+1:e,o=n.slice(0,t).reduce(function(i,l){return i+l.numeric},0),a=u?e*u:0;return o+a},mt=function(e,n,u){return n.concat(u).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},ql=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},ar=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},pe=function(){return!1},jl=function(e,n,u){e.style[n]=u},S=function(e,n,u){var r=e[n];return r!==void 0?r:u};function gt(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(u){var r=[];try{r=Array.from(u.cssRules||[])}catch{}return r})).filter(function(u){var r=!1;try{r=e.matches(u.selectorText)}catch{}return r})}var $l="grid-template-columns",Hl="grid-template-rows",z=function(n,u,r){this.direction=n,this.element=u.element,this.track=u.track,n==="column"?(this.gridTemplateProp=$l,this.gridGapProp="grid-column-gap",this.cursor=S(r,"columnCursor",S(r,"cursor","col-resize")),this.snapOffset=S(r,"columnSnapOffset",S(r,"snapOffset",30)),this.dragInterval=S(r,"columnDragInterval",S(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=S(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=Hl,this.gridGapProp="grid-row-gap",this.cursor=S(r,"rowCursor",S(r,"cursor","row-resize")),this.snapOffset=S(r,"rowSnapOffset",S(r,"snapOffset",30)),this.dragInterval=S(r,"rowDragInterval",S(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=S(r,"gridTemplateRows")),this.onDragStart=S(r,"onDragStart",pe),this.onDragEnd=S(r,"onDragEnd",pe),this.onDrag=S(r,"onDrag",pe),this.writeStyle=S(r,"writeStyle",jl),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=u.minSizeStart,this.minSizeEnd=u.minSizeEnd,u.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};z.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),u=n.width,r=n.height,t=n.top,o=n.bottom,a=n.left,i=n.right;this.direction==="column"?(this.start=t,this.end=o,this.size=r):this.direction==="row"&&(this.start=a,this.end=i,this.size=u)};z.prototype.getSizeAtTrack=function(n,u){return Bl(n,this.computedPixels,this.computedGapPixels,u)};z.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};z.prototype.getRawTracks=function(){var n=mt(this.gridTemplateProp,[this.grid],gt(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};z.prototype.getGap=function(){var n=mt(this.gridGapProp,[this.grid],gt(this.grid));return n.length?n[0]:null};z.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};z.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};z.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=bt(n)};z.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=bt(n)};z.prototype.setGap=function(n){this.gap=n};z.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=ql("px",this.computedGap)||0};z.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};z.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var u=this.trackValues.filter(function(i){return i.type==="%"}),r=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var t=ar(r);t!==null&&(this.frToPixels=this.computedPixels[t].numeric/r[t].numeric)}if(u.length){var o=ar(u);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/u[o].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",pe),this.grid.addEventListener("dragstart",pe),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};z.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};z.prototype.drag=function(n){var u=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),t=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),a=t+this.snapOffset,i=o-this.snapOffset;u<a&&(u=t),u>i&&(u=o),u<t?u=t:u>o&&(u=o);var l=u-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-u+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var h=Math.round(l/this.dragInterval)*this.dragInterval;d-=h-l,l=h}if(l<this.minSizeStart&&(l=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=l+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var c=l/this.frToPixels;this.tracks[this.aTrack]=c+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=l/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var s=d/this.frToPixels;this.tracks[this.bTrack]=s+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var p=d/this.percentageToPixels;this.tracks[this.bTrack]=p+"%"}var b=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,b),this.onDrag(this.direction,this.track,b)};z.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",pe),this.grid.removeEventListener("dragstart",pe),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};z.prototype.destroy=function(n,u){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),u&&u()):(this.needsDestroy=!0,u&&(this.destroyCb=u))};var cr=function(e,n,u){return n in e?e[n]:u},Te=function(e,n){return function(u){if(u.track<1)throw Error("Invalid track index: "+u.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},t=e==="column"?"columnMinSize":"rowMinSize";return new z(e,Object.assign({},{minSizeStart:cr(r,u.track-1,S(n,t,S(n,"minSize",0))),minSizeEnd:cr(r,u.track+1,S(n,t,S(n,"minSize",0)))},u),n)}},be=function(n){var u=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){u.columnGutters[r.track]=Te("column",u.options)(r)}),this.options.rowGutters.forEach(function(r){u.rowGutters[r.track]=Te("row",u.options)(r)})};be.prototype.addColumnGutter=function(n,u){this.columnGutters[u]&&this.columnGutters[u].destroy(),this.columnGutters[u]=Te("column",this.options)({element:n,track:u})};be.prototype.addRowGutter=function(n,u){this.rowGutters[u]&&this.rowGutters[u].destroy(),this.rowGutters[u]=Te("row",this.options)({element:n,track:u})};be.prototype.removeColumnGutter=function(n,u){var r=this;u===void 0&&(u=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(u,function(){delete r.columnGutters[n]})};be.prototype.removeRowGutter=function(n,u){var r=this;u===void 0&&(u=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(u,function(){delete r.rowGutters[n]})};be.prototype.handleDragStart=function(n,u,r){u==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=Te("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):u==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=Te("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};be.prototype.destroy=function(n){var u=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return u.columnGutters[r].destroy(n,function(){delete u.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return u.rowGutters[r].destroy(n,function(){delete u.rowGutters[r]})})};function Ul(e){return new be(e)}const Gl=`.cm-focused {
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
  cursor: pointer;
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
  cursor: pointer;
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
`,pn=document.body,Be=document.createElement("div"),I=document.createElement("div"),lr=Oe("* { cursor: col-resize }",!1),kt=Ot.Annotation.define();var Z=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(Z||{});function Vl(){Oe(Gl),Oe(st()),Oe(dt());const e=document.createElement("div");e.className=he.dividerViewClass,Be.appendChild(e),Be.className=he.gutterViewClass,pn.appendChild(Be),I.className=he.previewPaneClass,pn.appendChild(I),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const t=_.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");document.activeElement!==t&&qt(I)}),new MutationObserver(sr).observe(I,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{sr(),document.querySelector(".mermaid")!==null&&bn()}),typeof _.MarkEdit.getFileInfo=="function"&&typeof _.MarkEdit.openFile=="function"&&I.addEventListener("click",ns),I.addEventListener("click",us)}function Dn(e,n=!0){const u=H();ze.viewMode=e,e!==u&&localStorage.setItem(An.viewModeCacheKey,String(e));const r=_.MarkEdit.editorView;e===0?r.focus():e===2&&r.contentDOM.blur(),e===1?(pn.classList.add(he.containerClass),ze.splitter??=Ul({columnGutters:[{track:1,element:Be}],minSize:150,onDragStart:()=>lr.disabled=!1,onDragEnd:()=>lr.disabled=!0})):(pn.classList.remove(he.containerClass),ze.splitter?.destroy(),ze.splitter=void 0),e===2?I.classList.add("overlay"):I.classList.remove("overlay"),n&&bn()}function Zl(){const e=[0,...Zc.map(r=>{switch(r){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(r=>r!==void 0)],n=e.indexOf(H()),u=n===-1?0:(n+1)%e.length;Dn(e[u])}function Wl(){const e=localStorage.getItem(An.viewModeCacheKey);if(e===null)return;const n=Number(e);H()!==n&&Dn(n,!0)}function H(){return ze.viewMode}async function bn(){if(H()===0)return;const e=pt(await Fn());I.innerHTML=e,ft(()=>{eu(xt(),Qe(),!1);const n=localStorage.getItem(An.previewPageZoomKey);n!==null&&(I.style.zoom=n)})}function Yl(e){if(H()===0||H()===1&&_.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(I.style.zoom)||1,u=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":I.style.zoom=u(n-.1);break;case"=":I.style.zoom=u(n+.1);break;case"0":I.style.zoom="1";break;default:return}localStorage.setItem(An.previewPageZoomKey,I.style.zoom),e.preventDefault(),e.stopPropagation()}function Kl(){wt(!1)}function Jl(){wt(!0)}async function Xl(){const e=await Fn(!1);await navigator.clipboard.writeText(e)}async function Ql(){const e=await Fn(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([I.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function xt(){return _.MarkEdit.editorView.scrollDOM}function Qe(){return I}async function yt(e){const n=await Fn(!1);return e?await ht(n):`<meta charset="UTF-8">
${n}`}async function es(e,n){const u=await yu(e,!1);return n?await ht(u):`<meta charset="UTF-8">
${u}`}async function Fn(e=!0){const n=_.MarkEdit.editorAPI.getText();return await yu(n,e)}function sr(){const e=getComputedStyle(I).backgroundColor;Be.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function wt(e){const n=await(async()=>{const r=await _.MarkEdit.getFileInfo();return r===void 0?`${F("untitled")}.html`:`${Nt(r.filePath)}.html`})(),u=await yt(e);_.MarkEdit.showSavePanel({fileName:n,string:u})}async function ns(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const u=n.getAttribute("href");if(!u?.startsWith("../"))return;const r=(await _.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const t=ye(r,decodeURIComponent(u));await _.MarkEdit.openFile(t)}catch(t){console.error("Failed to open file:",t)}}}function us(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const u=n.closest("[data-line-from]");if(u===null){console.error("Failed to find task item block");return}const r=_.MarkEdit.editorAPI,t=r.getLineRange(_e(u).from),o=Pl(r.getText(t));if(o===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const a=t.from+o.offset;_.MarkEdit.editorView.dispatch({changes:{from:a,to:a+1,insert:o.replacement},annotations:kt.of(!0)})}const ze={viewMode:0,splitter:void 0};async function nu(){if(Pe==="never")return;const e=await vt();typeof e.tag_name=="string"&&e.name!=="1.7.1"&&(Et().has(e.name)||(Pe==="automatic"&&ou()?await Cu(e.tag_name):Pe==="quiet"?(uu.pendingRelease=e,Ct(e)):ts(e)))}async function rs(){const e=Date.now(),n=Number(localStorage.getItem(Me.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await nu(),localStorage.setItem(Me.lastCheckCacheKey,String(e))}catch(u){console.error("Failed to check for updates:",u)}}async function vt(){return await(await fetch(Me.latestReleaseURL)).json()}async function Cu(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,u="lite/",r=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,t=`${Me.rawBaseURL}${r}/dist/${u}markedit-preview.js`,o=await fetch(t);if(!o.ok)return console.error(`Failed to download the latest build from ${t}`),!1;const a=await o.text();return await _.MarkEdit.createFile({path:n,string:a,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function Ct(e=uu.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${he.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const u=document.createElement("button");return u.dataset.releaseName=e.name,u.className=he.updatePillClass,u.textContent=F("update"),u.style.display=H()===Z.edit?"none":"",u.addEventListener("webkitmouseforcedown",r=>{r.preventDefault()}),u.addEventListener("click",()=>{const{title:r,actions:t}=_t(e,()=>{uu.pendingRelease=void 0,u.remove()}),[o,...a]=t,i=u.getBoundingClientRect(),l={x:i.left,y:i.bottom+10};_.MarkEdit.showContextMenu([{title:r},o,{separator:!0},...a],l)}),document.body.appendChild(u),u}async function ts(e){const{title:n,actions:u}=_t(e),r=await _.MarkEdit.showAlert({title:n,message:e.body,buttons:u.map(t=>t.title)});u[r]?.action?.()}function _t(e,n=()=>{}){const u=`MarkEdit-preview ${e.name} ${F("newVersionAvailable")}`,r=[...ou()?[{title:F("updateAndRelaunch"),action:async()=>{await Cu(e.tag_name)?_.MarkEdit.relaunchApp():_.MarkEdit.showAlert(F("failedToUpdate")),n()}}]:[],{title:F("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:F("remindMeLater"),action:n},{title:F("skipThisVersion"),action:()=>{const t=Et();t.add(e.name),localStorage.setItem(Me.skippedCacheKey,JSON.stringify([...t])),n()}}];return{title:u,actions:r}}function Et(){const e=localStorage.getItem(Me.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const Me={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},uu={pendingRelease:void 0},ru="markedit-preview",dr=`${ru}.js`;function os(e){const{destExists:n,bundleInfo:u,currentVersion:r}=e,t=u?.version===r,o=u?.fullBuild===!1;return!(n&&t&&o)}async function is(){try{const e=_.MarkEdit.getDirectoryPath("documents"),n=_.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const u=typeof __FILE_PATH__=="string"?__FILE_PATH__:ye(e,`scripts/${dr}`);if(await _.MarkEdit.getFileInfo(u)===void 0){console.error(`Source file not found at ${u}`);return}const t=u.split("/").pop()??dr,o=ye(n,"Shared/scripts"),a=ye(o,t),i=await _.MarkEdit.getFileInfo(a)!==void 0,l=ye(n,"Shared/metadata.json"),d=await $t(l),h=d[ru];if(!os({destExists:i,bundleInfo:h,currentVersion:"1.7.1"}))return;const c=await _.MarkEdit.getFileContent(u);if(c===void 0){console.error(`Failed to read content from ${u}`);return}await _.MarkEdit.createFile({path:o,isDirectory:!0}),await _.MarkEdit.createFile({path:a,string:c,overwrites:!0}),await _.MarkEdit.createFile({path:l,string:JSON.stringify({...d,[ru]:{version:"1.7.1",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}function as(){const e=fr(F("source")),n=fr(F("preview")),u=document.createElement("div");u.className="quicklook-segmented",u.setAttribute("role","tablist"),u.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(u),{toolbar:r,sourceButton:e,previewButton:n}}function fr(e){const n=document.createElement("button");return n.textContent=e,n.type="button",n.className="quicklook-segment",n.setAttribute("role","tab"),n}function ke(){if(xe!==void 0)return xe;try{xe=localStorage.getItem(At)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),xe="source"}return xe}function hr(e){xe=e;try{localStorage.setItem(At,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let xe;const At="ui.quicklook-mode";function cs(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function ls(e,n){const u=window,r=u.pinchZoomTarget;u.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const t=n.querySelector(".quicklook-content");return t!==null?{scroller:n,inner:t}:null}}function ss(e,n){let u;const r=window,t={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},o=()=>{const i=n.clientHeight,l=n.scrollHeight,d=l-i;if(d<=0||l<=0)return{clientHeight:i,scrollHeight:l,scrollbarHeight:i,scrollbarTop:0};const h=i*(i/l),f=n.scrollTop/d*(i-h);return{clientHeight:i,scrollHeight:l,scrollbarHeight:h,scrollbarTop:f}},a=(i,l,d="auto")=>{const{clientHeight:h,scrollHeight:c,scrollbarHeight:f}=o(),s=h-f;if(s>0){const p=(i-l)/s;n.scrollTo({top:p*(c-h),behavior:d})}};r.startDragging=i=>{if(e()!=="preview"){t.start?.(i);return}const{scrollbarTop:l,scrollbarHeight:d}=o(),h=pr(n,i);u=h-l,(h<l||h>l+d)&&a(h,d*.5,"smooth")},r.updateDragging=i=>{if(e()!=="preview"){t.update?.(i);return}u!==void 0&&a(pr(n,i),u)},r.cancelDragging=()=>{if(e()!=="preview"){t.cancel?.();return}u=void 0}}function ds(e,n,u){u.addEventListener("wheel",r=>{const t=e()==="preview"?n:document.querySelector(".cm-scroller");t!==null&&(t.scrollTop+=r.deltaY,t.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function fs(e,n,u){const r=document.querySelector(".cm-scroller"),t=()=>{const a=(e()==="preview"?n:r)?.scrollTop??0;u.classList.toggle("scrolled",a>0),u.classList.toggle("scrolled-far",a>20)};return n.addEventListener("scroll",t,{passive:!0}),r?.addEventListener("scroll",t,{passive:!0}),t}function pr(e,n){return n-e.getBoundingClientRect().top}const hs=`body {
  --editor-inset-top: 34px;
}

/* Force scrolling bounces */
.cm-scroller > .cm-content {
  min-height: calc(100% + 1px);
}

.quicklook .markdown-body.overlay > .quicklook-content {
  display: flow-root;
  zoom: 0.9;
  min-height: calc(100% + 1px);
}

/* Links are not interactive in quicklook */
.quicklook .markdown-body a,
.quicklook .markdown-body a:hover {
  text-decoration: none;
  cursor: text;
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
  cursor: pointer;
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
    zoom: 0.8;
  }

  .quicklook-toolbar {
    top: 6px;
    left: auto;
    right: 8px;
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
    gap: 2px;
    overflow: hidden;
    background: rgba(242, 242, 245, 0.85);
    backdrop-filter: saturate(180%) blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .quicklook-segment {
    font-size: 11px;
    padding: 2px 4px;
    min-width: 0;
    border-radius: 4px;
  }

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
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

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.45);
  }
}
`;function ps(e){Oe(hs),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:u,previewButton:r}=as();document.body.appendChild(n);const t=bs(e),o=fs(ke,e,n),a={previewPane:e,sourceButton:u,previewButton:r,refreshSeparator:o,ensureRendered:t.ensureRendered};u.addEventListener("click",()=>{hr("source"),Vn(a)}),r.addEventListener("click",()=>{hr("preview"),Vn(a)}),Vn(a),setTimeout(t.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(t.invalidate(),ke()==="preview"&&t.ensureRendered())}),ls(ke,e),ss(ke,e),ds(ke,e,n)}function Vn(e){const n=ke()==="source",u=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",u),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(u)),e.previewPane.classList.toggle("overlay",u),e.refreshSeparator(),u&&e.ensureRendered()}function bs(e){let n=!1,u;return{ensureRendered:()=>(n||u||(u=(async()=>{try{const o=pt(await yu(cs(),!1));e.innerHTML=`<div class="quicklook-content">${o}</div>`,ft(()=>{}),n=!0}catch(o){throw u=void 0,o}})()),u),invalidate:()=>{n=!1,u=void 0}}}var on={exports:{}};var ms=on.exports,br;function gs(){return br||(br=1,(function(e,n){(function(u,r){e.exports=r()})(ms,(function(){var u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},r=function(d,h){if(!(d instanceof h))throw new TypeError("Cannot call a class as a function")},t=(function(){function d(h,c){for(var f=0;f<c.length;f++){var s=c[f];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(h,s.key,s)}}return function(h,c,f){return c&&d(h.prototype,c),f&&d(h,f),h}})(),o=Object.assign||function(d){for(var h=1;h<arguments.length;h++){var c=arguments[h];for(var f in c)Object.prototype.hasOwnProperty.call(c,f)&&(d[f]=c[f])}return d},a=(function(){function d(h){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,d),this.ctx=h,this.iframes=c,this.exclude=f,this.iframesTimeout=s}return t(d,[{key:"getContexts",value:function(){var c=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?c=[]:NodeList.prototype.isPrototypeOf(this.ctx)?c=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?c=this.ctx:typeof this.ctx=="string"?c=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):c=[this.ctx],c.forEach(function(s){var p=f.filter(function(b){return b.contains(s)}).length>0;f.indexOf(s)===-1&&!p&&f.push(s)}),f}},{key:"getIframeContents",value:function(c,f){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},p=void 0;try{var b=c.contentWindow;if(p=b.document,!b||!p)throw new Error("iframe inaccessible")}catch{s()}p&&f(p)}},{key:"isIframeBlank",value:function(c){var f="about:blank",s=c.getAttribute("src").trim(),p=c.contentWindow.location.href;return p===f&&s!==f&&s}},{key:"observeIframeLoad",value:function(c,f,s){var p=this,b=!1,m=null,k=function g(){if(!b){b=!0,clearTimeout(m);try{p.isIframeBlank(c)||(c.removeEventListener("load",g),p.getIframeContents(c,f,s))}catch{s()}}};c.addEventListener("load",k),m=setTimeout(k,this.iframesTimeout)}},{key:"onIframeReady",value:function(c,f,s){try{c.contentWindow.document.readyState==="complete"?this.isIframeBlank(c)?this.observeIframeLoad(c,f,s):this.getIframeContents(c,f,s):this.observeIframeLoad(c,f,s)}catch{s()}}},{key:"waitForIframes",value:function(c,f){var s=this,p=0;this.forEachIframe(c,function(){return!0},function(b){p++,s.waitForIframes(b.querySelector("html"),function(){--p||f()})},function(b){b||f()})}},{key:"forEachIframe",value:function(c,f,s){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=c.querySelectorAll("iframe"),k=m.length,g=0;m=Array.prototype.slice.call(m);var x=function(){--k<=0&&b(g)};k||x(),m.forEach(function(y){d.matches(y,p.exclude)?x():p.onIframeReady(y,function(w){f(y)&&(g++,s(w)),x()},x)})}},{key:"createIterator",value:function(c,f,s){return document.createNodeIterator(c,f,s,!1)}},{key:"createInstanceOnIframe",value:function(c){return new d(c.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(c,f,s){var p=c.compareDocumentPosition(s),b=Node.DOCUMENT_POSITION_PRECEDING;if(p&b)if(f!==null){var m=f.compareDocumentPosition(s),k=Node.DOCUMENT_POSITION_FOLLOWING;if(m&k)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(c){var f=c.previousNode(),s=void 0;return f===null?s=c.nextNode():s=c.nextNode()&&c.nextNode(),{prevNode:f,node:s}}},{key:"checkIframeFilter",value:function(c,f,s,p){var b=!1,m=!1;return p.forEach(function(k,g){k.val===s&&(b=g,m=k.handled)}),this.compareNodeIframe(c,f,s)?(b===!1&&!m?p.push({val:s,handled:!0}):b!==!1&&!m&&(p[b].handled=!0),!0):(b===!1&&p.push({val:s,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(c,f,s,p){var b=this;c.forEach(function(m){m.handled||b.getIframeContents(m.val,function(k){b.createInstanceOnIframe(k).forEachNode(f,s,p)})})}},{key:"iterateThroughNodes",value:function(c,f,s,p,b){for(var m=this,k=this.createIterator(f,c,p),g=[],x=[],y=void 0,w=void 0,v=function(){var A=m.getIteratorNode(k);return w=A.prevNode,y=A.node,y};v();)this.iframes&&this.forEachIframe(f,function(E){return m.checkIframeFilter(y,w,E,g)},function(E){m.createInstanceOnIframe(E).forEachNode(c,function(A){return x.push(A)},p)}),x.push(y);x.forEach(function(E){s(E)}),this.iframes&&this.handleOpenIframes(g,c,s,p),b()}},{key:"forEachNode",value:function(c,f,s){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=this.getContexts(),k=m.length;k||b(),m.forEach(function(g){var x=function(){p.iterateThroughNodes(c,g,f,s,function(){--k<=0&&b()})};p.iframes?p.waitForIframes(g,x):x()})}}],[{key:"matches",value:function(c,f){var s=typeof f=="string"?[f]:f,p=c.matches||c.matchesSelector||c.msMatchesSelector||c.mozMatchesSelector||c.oMatchesSelector||c.webkitMatchesSelector;if(p){var b=!1;return s.every(function(m){return p.call(c,m)?(b=!0,!1):!0}),b}else return!1}}]),d})(),i=(function(){function d(h){r(this,d),this.ctx=h,this.ie=!1;var c=window.navigator.userAgent;(c.indexOf("MSIE")>-1||c.indexOf("Trident")>-1)&&(this.ie=!0)}return t(d,[{key:"log",value:function(c){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",s=this.opt.log;this.opt.debug&&(typeof s>"u"?"undefined":u(s))==="object"&&typeof s[f]=="function"&&s[f]("mark.js: "+c)}},{key:"escapeStr",value:function(c){return c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(c){return this.opt.wildcards!=="disabled"&&(c=this.setupWildcardsRegExp(c)),c=this.escapeStr(c),Object.keys(this.opt.synonyms).length&&(c=this.createSynonymsRegExp(c)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),this.opt.diacritics&&(c=this.createDiacriticsRegExp(c)),c=this.createMergedBlanksRegExp(c),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.createJoinersRegExp(c)),this.opt.wildcards!=="disabled"&&(c=this.createWildcardsRegExp(c)),c=this.createAccuracyRegExp(c),c}},{key:"createSynonymsRegExp",value:function(c){var f=this.opt.synonyms,s=this.opt.caseSensitive?"":"i",p=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var b in f)if(f.hasOwnProperty(b)){var m=f[b],k=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(b):this.escapeStr(b),g=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(m):this.escapeStr(m);k!==""&&g!==""&&(c=c.replace(new RegExp("("+this.escapeStr(k)+"|"+this.escapeStr(g)+")","gm"+s),p+("("+this.processSynomyms(k)+"|")+(this.processSynomyms(g)+")")+p))}return c}},{key:"processSynomyms",value:function(c){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),c}},{key:"setupWildcardsRegExp",value:function(c){return c=c.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),c.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(c){var f=this.opt.wildcards==="withSpaces";return c.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(c){return c.replace(/[^(|)\\]/g,function(f,s,p){var b=p.charAt(s+1);return/[(|)\\]/.test(b)||b===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(c){var f=[],s=this.opt.ignorePunctuation;return Array.isArray(s)&&s.length&&f.push(this.escapeStr(s.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?c.split(/\u0000+/).join("["+f.join("")+"]*"):c}},{key:"createDiacriticsRegExp",value:function(c){var f=this.opt.caseSensitive?"":"i",s=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],p=[];return c.split("").forEach(function(b){s.every(function(m){if(m.indexOf(b)!==-1){if(p.indexOf(m)>-1)return!1;c=c.replace(new RegExp("["+m+"]","gm"+f),"["+m+"]"),p.push(m)}return!0})}),c}},{key:"createMergedBlanksRegExp",value:function(c){return c.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(c){var f=this,s="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",p=this.opt.accuracy,b=typeof p=="string"?p:p.value,m=typeof p=="string"?[]:p.limiters,k="";switch(m.forEach(function(g){k+="|"+f.escapeStr(g)}),b){case"partially":default:return"()("+c+")";case"complementary":return k="\\s"+(k||this.escapeStr(s)),"()([^"+k+"]*"+c+"[^"+k+"]*)";case"exactly":return"(^|\\s"+k+")("+c+")(?=$|\\s"+k+")"}}},{key:"getSeparatedKeywords",value:function(c){var f=this,s=[];return c.forEach(function(p){f.opt.separateWordSearch?p.split(" ").forEach(function(b){b.trim()&&s.indexOf(b)===-1&&s.push(b)}):p.trim()&&s.indexOf(p)===-1&&s.push(p)}),{keywords:s.sort(function(p,b){return b.length-p.length}),length:s.length}}},{key:"isNumeric",value:function(c){return Number(parseFloat(c))==c}},{key:"checkRanges",value:function(c){var f=this;if(!Array.isArray(c)||Object.prototype.toString.call(c[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(c),[];var s=[],p=0;return c.sort(function(b,m){return b.start-m.start}).forEach(function(b){var m=f.callNoMatchOnInvalidRanges(b,p),k=m.start,g=m.end,x=m.valid;x&&(b.start=k,b.length=g-k,s.push(b),p=g)}),s}},{key:"callNoMatchOnInvalidRanges",value:function(c,f){var s=void 0,p=void 0,b=!1;return c&&typeof c.start<"u"?(s=parseInt(c.start,10),p=s+parseInt(c.length,10),this.isNumeric(c.start)&&this.isNumeric(c.length)&&p-f>0&&p-s>0?b=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(c))),this.opt.noMatch(c))):(this.log("Ignoring invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:s,end:p,valid:b}}},{key:"checkWhitespaceRanges",value:function(c,f,s){var p=void 0,b=!0,m=s.length,k=f-m,g=parseInt(c.start,10)-k;return g=g>m?m:g,p=g+parseInt(c.length,10),p>m&&(p=m,this.log("End range automatically set to the max value of "+m)),g<0||p-g<0||g>m||p>m?(b=!1,this.log("Invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)):s.substring(g,p).replace(/\s+/g,"")===""&&(b=!1,this.log("Skipping whitespace only range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:g,end:p,valid:b}}},{key:"getTextNodes",value:function(c){var f=this,s="",p=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(b){p.push({start:s.length,end:(s+=b.textContent).length,node:b})},function(b){return f.matchesExclude(b.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){c({value:s,nodes:p})})}},{key:"matchesExclude",value:function(c){return a.matches(c,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(c,f,s){var p=this.opt.element?this.opt.element:"mark",b=c.splitText(f),m=b.splitText(s-f),k=document.createElement(p);return k.setAttribute("data-markjs","true"),this.opt.className&&k.setAttribute("class",this.opt.className),k.textContent=b.textContent,b.parentNode.replaceChild(k,b),m}},{key:"wrapRangeInMappedTextNode",value:function(c,f,s,p,b){var m=this;c.nodes.every(function(k,g){var x=c.nodes[g+1];if(typeof x>"u"||x.start>f){if(!p(k.node))return!1;var y=f-k.start,w=(s>k.end?k.end:s)-k.start,v=c.value.substr(0,k.start),E=c.value.substr(w+k.start);if(k.node=m.wrapRangeInTextNode(k.node,y,w),c.value=v+E,c.nodes.forEach(function(A,L){L>=g&&(c.nodes[L].start>0&&L!==g&&(c.nodes[L].start-=w),c.nodes[L].end-=w)}),s-=w,b(k.node.previousSibling,k.start),s>k.end)f=k.end;else return!1}return!0})}},{key:"wrapMatches",value:function(c,f,s,p,b){var m=this,k=f===0?0:f+1;this.getTextNodes(function(g){g.nodes.forEach(function(x){x=x.node;for(var y=void 0;(y=c.exec(x.textContent))!==null&&y[k]!=="";)if(s(y[k],x)){var w=y.index;if(k!==0)for(var v=1;v<k;v++)w+=y[v].length;x=m.wrapRangeInTextNode(x,w,w+y[k].length),p(x.previousSibling),c.lastIndex=0}}),b()})}},{key:"wrapMatchesAcrossElements",value:function(c,f,s,p,b){var m=this,k=f===0?0:f+1;this.getTextNodes(function(g){for(var x=void 0;(x=c.exec(g.value))!==null&&x[k]!=="";){var y=x.index;if(k!==0)for(var w=1;w<k;w++)y+=x[w].length;var v=y+x[k].length;m.wrapRangeInMappedTextNode(g,y,v,function(E){return s(x[k],E)},function(E,A){c.lastIndex=A,p(E)})}b()})}},{key:"wrapRangeFromIndex",value:function(c,f,s,p){var b=this;this.getTextNodes(function(m){var k=m.value.length;c.forEach(function(g,x){var y=b.checkWhitespaceRanges(g,k,m.value),w=y.start,v=y.end,E=y.valid;E&&b.wrapRangeInMappedTextNode(m,w,v,function(A){return f(A,g,m.value.substring(w,v),x)},function(A){s(A,g)})}),p()})}},{key:"unwrapMatches",value:function(c){for(var f=c.parentNode,s=document.createDocumentFragment();c.firstChild;)s.appendChild(c.removeChild(c.firstChild));f.replaceChild(s,c),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(c){if(c){if(c.nodeType===3)for(;c.nextSibling&&c.nextSibling.nodeType===3;)c.nodeValue+=c.nextSibling.nodeValue,c.parentNode.removeChild(c.nextSibling);else this.normalizeTextNode(c.firstChild);this.normalizeTextNode(c.nextSibling)}}},{key:"markRegExp",value:function(c,f){var s=this;this.opt=f,this.log('Searching with expression "'+c+'"');var p=0,b="wrapMatches",m=function(g){p++,s.opt.each(g)};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),this[b](c,this.opt.ignoreGroups,function(k,g){return s.opt.filter(g,k,p)},m,function(){p===0&&s.opt.noMatch(c),s.opt.done(p)})}},{key:"mark",value:function(c,f){var s=this;this.opt=f;var p=0,b="wrapMatches",m=this.getSeparatedKeywords(typeof c=="string"?[c]:c),k=m.keywords,g=m.length,x=this.opt.caseSensitive?"":"i",y=function w(v){var E=new RegExp(s.createRegExp(v),"gm"+x),A=0;s.log('Searching with expression "'+E+'"'),s[b](E,1,function(L,ce){return s.opt.filter(ce,v,p,A)},function(L){A++,p++,s.opt.each(L)},function(){A===0&&s.opt.noMatch(v),k[g-1]===v?s.opt.done(p):w(k[k.indexOf(v)+1])})};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),g===0?this.opt.done(p):y(k[0])}},{key:"markRanges",value:function(c,f){var s=this;this.opt=f;var p=0,b=this.checkRanges(c);b&&b.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(b)),this.wrapRangeFromIndex(b,function(m,k,g,x){return s.opt.filter(m,k,g,x)},function(m,k){p++,s.opt.each(m,k)},function(){s.opt.done(p)})):this.opt.done(p)}},{key:"unmark",value:function(c){var f=this;this.opt=c;var s=this.opt.element?this.opt.element:"*";s+="[data-markjs]",this.opt.className&&(s+="."+this.opt.className),this.log('Removal selector "'+s+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(p){f.unwrapMatches(p)},function(p){var b=a.matches(p,s),m=f.matchesExclude(p);return!b||m?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(c){this._opt=o({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},c)},get:function(){return this._opt}},{key:"iterator",get:function(){return new a(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function l(d){var h=this,c=new i(d);return this.mark=function(f,s){return c.mark(f,s),h},this.markRegExp=function(f,s){return c.markRegExp(f,s),h},this.markRanges=function(f,s){return c.markRanges(f,s),h},this.unmark=function(f){return c.unmark(f),h},this}return l}))})(on)),on.exports}var ks=gs();const Dt=vn(ks),qe="markedit-preview-mark",Ft="markedit-preview-mark-highlighted";let Le=!1,_u,ne=0,G=[],je=null,rn=null;const mr={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function xs(e){if(_u=e,ne=0,e.search.length===0){St();return}const n=Qe();Tt(n),vs(n)}function ys(e){G.length!==0&&(ne=e%G.length,Mt())}function St(){je?.disconnect(),je=null,_u=void 0,ne=0,G=[],new Dt(Qe()).unmark()}function ws(){if(H()===Z.preview)return{numberOfItems:G.length,currentIndex:ne}}function Tt(e){const n=_u;if(n===void 0||n.search.length===0||Le)return;Cs(),Le=!0;const{search:u,caseSensitive:r,wholeWord:t,diacriticInsensitive:o,regexp:a}=n,i=new Dt(e),l=()=>{G=Array.from(e.querySelectorAll(`.${qe}`)),ne=G.length>0?Math.min(ne,G.length-1):0,Mt(),Le=!1};i.unmark({done:()=>{if(a)try{const d=r?"":"i";i.markRegExp(new RegExp(u,d),{className:qe,done:l})}catch{Le=!1,ne=0,G=[]}else i.mark(u,{className:qe,caseSensitive:r,diacritics:o,separateWordSearch:!1,accuracy:t?"exactly":"partially",done:l})}})}function Mt(){const e=H()!==Z.sideBySide;G.forEach((n,u)=>{n.classList.toggle(Ft,e&&u===ne)}),e&&G.length>0&&G[ne].scrollIntoView({behavior:"smooth",block:"center"})}function vs(e){je?.disconnect(),je=new MutationObserver(()=>{Le||Tt(e)}),je.observe(e,{childList:!0})}function Cs(){rn===null&&(rn=document.createElement("style"),document.head.appendChild(rn));const{light:e,dark:n}=mr[_n]??mr.github;rn.textContent=[`.${qe} { background: ${e} !important; color: inherit !important; }`,`.${Ft} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${qe} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(Vl(),xu()?(typeof _.MarkEdit.onAppReady=="function"?_.MarkEdit.onAppReady(()=>{is(),setTimeout(()=>{nu()},2e3)}):setTimeout(()=>{rs()},4e3),(Pe==="automatic"||Pe==="quiet")&&setInterval(()=>{nu()},6048e5)):ps(Qe()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=yt;window.MarkEditRenderHtml??=es;window.__markeditPreviewSPI__={performSearch:xs,setSearchMatchIndex:ys,clearSearch:St,searchCounterInfo:ws};xu()&&(_.MarkEdit.addMainMenuItem({title:F("viewMode"),icon:Pt()?"eye":void 0,children:[{title:F("changeMode"),action:()=>{Zl(),tu()},key:or.key??"V",modifiers:or.modifiers??["Command"]},{separator:!0},Zn(F("editMode"),Z.edit),Zn(F("sideBySideMode"),Z.sideBySide),Zn(F("previewMode"),Z.preview),{separator:!0},..._s(),{separator:!0},{title:`${F("version")} 1.7.1`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.7.1")},{title:`${F("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...ou()?[{title:F("updateAndRelaunch"),action:async()=>{const e=await vt();await Cu(e.tag_name)?_.MarkEdit.relaunchApp():_.MarkEdit.showAlert(F("failedToUpdate"))}}]:[]]}),_.MarkEdit.addExtension(Lt.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(kt))||(se.renderUpdater!==void 0&&clearTimeout(se.renderUpdater),se.renderUpdater=setTimeout(bn,500)))})),_.MarkEdit.onEditorReady(()=>{Vc&&Sl(_.MarkEdit.editorView.scrollDOM),Wl(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&H()===Z.preview&&typeof _.MarkEdit.getFileInfo=="function"&&(await _.MarkEdit.getFileInfo())?.filePath===void 0&&_.MarkEdit.editorAPI.getText().length===0&&Dn(Z.edit,!1)}),bn(),tu(),Ml(xt(),Qe()),se.keyDownListener!==void 0&&document.removeEventListener("keydown",se.keyDownListener),se.keyDownListener=e=>Yl(e),document.addEventListener("keydown",se.keyDownListener)}));function Zn(e,n){return{title:e,action:()=>{Dn(n),tu()},state:()=>({isSelected:H()===n})}}function _s(){const e=[{title:F("copyHtml"),action:Xl},{title:F("copyRichText"),action:Ql}];return typeof _.MarkEdit.showSavePanel>"u"?e:[{title:F("saveCleanHtml"),action:Kl},{title:F("saveStyledHtml"),action:Jl},...e]}function tu(){const e=Ct();e!==void 0&&(e.style.display=H()===Z.edit?"none":"")}const se={renderUpdater:void 0,keyDownListener:void 0};
