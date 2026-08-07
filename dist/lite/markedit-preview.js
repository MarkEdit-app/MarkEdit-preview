"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=t=>n[t]??{}}})();const lo=require("@codemirror/view"),_=require("markedit-api"),so=require("@codemirror/state");function fo(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function wt(){return typeof __FILE_PATH__=="string"}function He(e,n=!0){const t=document.createElement("style");return t.textContent=e,document.head.appendChild(t),t.disabled=!n,t}function Zt(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function ho(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function po(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function De(e){const n=parseInt(e.dataset.lineFrom??"0"),t=parseInt(e.dataset.lineTo??"0");return{from:n,to:t}}function ct(e,n){let t=0,r=n;for(;r!==null&&r!==e;)t+=r.offsetTop,r=r.offsetParent;return t}function jn(e,n,t,r=!0){const u=ct(e,n)+n.offsetHeight*t;fn(e,u,r)}function fn(e,n,t=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:t?"smooth":"instant"})}function bo(e){const n=document.createRange();n.selectNodeContents(e);const t=getSelection();t?.removeAllRanges(),t?.addRange(n)}function mo(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function Se(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function go(e){const n=await _.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const t=JSON.parse(n);return typeof t=="object"&&t!==null?t:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}const Wt={};function ko(e){let n=Wt[e];if(n)return n;n=Wt[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);n.push(r)}for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function Ne(e,n){typeof n!="string"&&(n=Ne.defaultChars);const t=ko(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let u="";for(let o=0,a=r.length;o<a;o+=3){const i=parseInt(r.slice(o+1,o+3),16);if(i<128){u+=t[i];continue}if((i&224)===192&&o+3<a){const c=parseInt(r.slice(o+4,o+6),16);if((c&192)===128){const s=i<<6&1984|c&63;s<128?u+="��":u+=String.fromCharCode(s),o+=3;continue}}if((i&240)===224&&o+6<a){const c=parseInt(r.slice(o+4,o+6),16),s=parseInt(r.slice(o+7,o+9),16);if((c&192)===128&&(s&192)===128){const d=i<<12&61440|c<<6&4032|s&63;d<2048||d>=55296&&d<=57343?u+="���":u+=String.fromCharCode(d),o+=6;continue}}if((i&248)===240&&o+9<a){const c=parseInt(r.slice(o+4,o+6),16),s=parseInt(r.slice(o+7,o+9),16),d=parseInt(r.slice(o+10,o+12),16);if((c&192)===128&&(s&192)===128&&(d&192)===128){let l=i<<18&1835008|c<<12&258048|s<<6&4032|d&63;l<65536||l>1114111?u+="����":(l-=65536,u+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),o+=9;continue}}u+="�"}return u})}Ne.defaultChars=";/?:@&=+$,#";Ne.componentChars="";const Yt={};function yo(e){let n=Yt[e];if(n)return n;n=Yt[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function tn(e,n,t){typeof n!="string"&&(t=n,n=tn.defaultChars),typeof t>"u"&&(t=!0);const r=yo(n);let u="";for(let o=0,a=e.length;o<a;o++){const i=e.charCodeAt(o);if(t&&i===37&&o+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){u+=e.slice(o,o+3),o+=2;continue}if(i<128){u+=r[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&o+1<a){const c=e.charCodeAt(o+1);if(c>=56320&&c<=57343){u+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}u+="%EF%BF%BD";continue}u+=encodeURIComponent(e[o])}return u}tn.defaultChars=";/?:@&=+$,-_.!~*'()#";tn.componentChars="-_.!~*'()";function Ct(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function mn(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const xo=/^([a-z0-9.+-]+:)/i,vo=/:[0-9]*$/,wo=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Co=["<",">",'"',"`"," ","\r",`
`,"	"],_o=["{","}","|","\\","^","`"].concat(Co),Eo=["'"].concat(_o),Kt=["%","/","?",";","#"].concat(Eo),Jt=["/","?","#"],Ao=255,Xt=/^[+a-z0-9A-Z_-]{0,63}$/,So=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Qt={javascript:!0,"javascript:":!0},er={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function _t(e,n){if(e&&e instanceof mn)return e;const t=new mn;return t.parse(e,n),t}mn.prototype.parse=function(e,n){let t,r,u,o=e;if(o=o.trim(),!n&&e.split("#").length===1){const s=wo.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let a=xo.exec(o);if(a&&(a=a[0],t=a.toLowerCase(),this.protocol=a,o=o.substr(a.length)),(n||a||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(u=o.substr(0,2)==="//",u&&!(a&&Qt[a])&&(o=o.substr(2),this.slashes=!0)),!Qt[a]&&(u||a&&!er[a])){let s=-1;for(let p=0;p<Jt.length;p++)r=o.indexOf(Jt[p]),r!==-1&&(s===-1||r<s)&&(s=r);let d,l;s===-1?l=o.lastIndexOf("@"):l=o.lastIndexOf("@",s),l!==-1&&(d=o.slice(0,l),o=o.slice(l+1),this.auth=d),s=-1;for(let p=0;p<Kt.length;p++)r=o.indexOf(Kt[p]),r!==-1&&(s===-1||r<s)&&(s=r);s===-1&&(s=o.length),o[s-1]===":"&&s--;const h=o.slice(0,s);o=o.slice(s),this.parseHost(h),this.hostname=this.hostname||"";const f=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!f){const p=this.hostname.split(/\./);for(let b=0,m=p.length;b<m;b++){const g=p[b];if(g&&!g.match(Xt)){let k="";for(let y=0,x=g.length;y<x;y++)g.charCodeAt(y)>127?k+="x":k+=g[y];if(!k.match(Xt)){const y=p.slice(0,b),x=p.slice(b+1),v=g.match(So);v&&(y.push(v[1]),x.unshift(v[2])),x.length&&(o=x.join(".")+o),this.hostname=y.join(".");break}}}}this.hostname.length>Ao&&(this.hostname=""),f&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=o.indexOf("#");i!==-1&&(this.hash=o.substr(i),o=o.slice(0,i));const c=o.indexOf("?");return c!==-1&&(this.search=o.substr(c),o=o.slice(0,c)),o&&(this.pathname=o),er[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};mn.prototype.parseHost=function(e){let n=vo.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const Fo=Object.freeze(Object.defineProperty({__proto__:null,decode:Ne,encode:tn,format:Ct,parse:_t},Symbol.toStringTag,{value:"Module"})),qr=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,jr=/[\0-\x1F\x7F-\x9F]/,Do=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Et=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Hr=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Ur=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,To=Object.freeze(Object.defineProperty({__proto__:null,Any:qr,Cc:jr,Cf:Do,P:Et,S:Hr,Z:Ur},Symbol.toStringTag,{value:"Module"})),Io=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Mo=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Hn;const No=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ro=(Hn=String.fromCodePoint)!==null&&Hn!==void 0?Hn:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Lo(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=No.get(e))!==null&&n!==void 0?n:e}var R;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(R||(R={}));const zo=32;var ae;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(ae||(ae={}));function lt(e){return e>=R.ZERO&&e<=R.NINE}function Po(e){return e>=R.UPPER_A&&e<=R.UPPER_F||e>=R.LOWER_A&&e<=R.LOWER_F}function Oo(e){return e>=R.UPPER_A&&e<=R.UPPER_Z||e>=R.LOWER_A&&e<=R.LOWER_Z||lt(e)}function $o(e){return e===R.EQUALS||Oo(e)}var M;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(M||(M={}));var te;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(te||(te={}));class Bo{constructor(n,t,r){this.decodeTree=n,this.emitCodePoint=t,this.errors=r,this.state=M.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=te.Strict}startEntity(n){this.decodeMode=n,this.state=M.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case M.EntityStart:return n.charCodeAt(t)===R.NUM?(this.state=M.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=M.NamedEntity,this.stateNamedEntity(n,t));case M.NumericStart:return this.stateNumericStart(n,t);case M.NumericDecimal:return this.stateNumericDecimal(n,t);case M.NumericHex:return this.stateNumericHex(n,t);case M.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|zo)===R.LOWER_X?(this.state=M.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=M.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,r,u){if(t!==r){const o=r-t;this.result=this.result*Math.pow(u,o)+parseInt(n.substr(t,o),u),this.consumed+=o}}stateNumericHex(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(lt(u)||Po(u))t+=1;else return this.addToNumericResult(n,r,t,16),this.emitNumericEntity(u,3)}return this.addToNumericResult(n,r,t,16),-1}stateNumericDecimal(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(lt(u))t+=1;else return this.addToNumericResult(n,r,t,10),this.emitNumericEntity(u,2)}return this.addToNumericResult(n,r,t,10),-1}emitNumericEntity(n,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===R.SEMI)this.consumed+=1;else if(this.decodeMode===te.Strict)return 0;return this.emitCodePoint(Lo(this.result),this.consumed),this.errors&&(n!==R.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:r}=this;let u=r[this.treeIndex],o=(u&ae.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const a=n.charCodeAt(t);if(this.treeIndex=qo(r,u,this.treeIndex+Math.max(1,o),a),this.treeIndex<0)return this.result===0||this.decodeMode===te.Attribute&&(o===0||$o(a))?0:this.emitNotTerminatedNamedEntity();if(u=r[this.treeIndex],o=(u&ae.VALUE_LENGTH)>>14,o!==0){if(a===R.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==te.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:r}=this,u=(r[t]&ae.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,u,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,r){const{decodeTree:u}=this;return this.emitCodePoint(t===1?u[n]&~ae.VALUE_LENGTH:u[n+1],r),t===3&&this.emitCodePoint(u[n+2],r),r}end(){var n;switch(this.state){case M.NamedEntity:return this.result!==0&&(this.decodeMode!==te.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case M.NumericDecimal:return this.emitNumericEntity(0,2);case M.NumericHex:return this.emitNumericEntity(0,3);case M.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case M.EntityStart:return 0}}}function Gr(e){let n="";const t=new Bo(e,r=>n+=Ro(r));return function(u,o){let a=0,i=0;for(;(i=u.indexOf("&",i))>=0;){n+=u.slice(a,i),t.startEntity(o);const s=t.write(u,i+1);if(s<0){a=i+t.end();break}a=i+s,i=s===0?a+1:a}const c=n+u.slice(a);return n="",c}}function qo(e,n,t,r){const u=(n&ae.BRANCH_LENGTH)>>7,o=n&ae.JUMP_TABLE;if(u===0)return o!==0&&r===o?t:-1;if(o){const c=r-o;return c<0||c>=u?-1:e[t+c]-1}let a=t,i=a+u-1;for(;a<=i;){const c=a+i>>>1,s=e[c];if(s<r)a=c+1;else if(s>r)i=c-1;else return e[c+u]}return-1}const Vr=Gr(Io);Gr(Mo);function jo(e,n=te.Legacy){return Vr(e,n)}function Ho(e){return Vr(e,te.Strict)}function Uo(e){return Object.prototype.toString.call(e)}function At(e){return Uo(e)==="[object String]"}const Go=Object.prototype.hasOwnProperty;function Vo(e,n){return Go.call(e,n)}function An(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}function Zr(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function St(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Je(e){if(e>65535){e-=65536;const n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}const Wr=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Zo=/&([a-z#][a-z0-9]{1,31});/gi,Wo=new RegExp(Wr.source+"|"+Zo.source,"gi"),Yo=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Ko(e,n){if(n.charCodeAt(0)===35&&Yo.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return St(r)?Je(r):e}const t=jo(e);return t!==e?t:e}function Jo(e){return e.indexOf("\\")<0?e:e.replace(Wr,"$1")}function Re(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Wo,function(n,t,r){return t||Ko(n,r)})}const Xo=/[&<>"]/,Qo=/[&<>"]/g,ei={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function ni(e){return ei[e]}function fe(e){return Xo.test(e)?e.replace(Qo,ni):e}const ti=/[.?*+^$[\]\\(){}|-]/g;function ri(e){return e.replace(ti,"\\$&")}function D(e){switch(e){case 9:case 32:return!0}return!1}function Xe(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Yr(e){return Et.test(e)||Hr.test(e)}function Qe(e){return Yr(Je(e))}function en(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Sn(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function nr(e){return e===32||e===9||e===10||e===13}function Fn(e){let n=0;for(;n<e.length&&nr(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&nr(e.charCodeAt(t));t--);return e.slice(n,t+1)}const ui={mdurl:Fo,ucmicro:To},oi=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Zr,asciiTrim:Fn,assign:An,escapeHtml:fe,escapeRE:ri,fromCodePoint:Je,has:Vo,isMdAsciiPunct:en,isPunctChar:Yr,isPunctCharCode:Qe,isSpace:D,isString:At,isValidEntityCode:St,isWhiteSpace:Xe,lib:ui,normalizeReference:Sn,unescapeAll:Re,unescapeMd:Jo},Symbol.toStringTag,{value:"Module"}));function ii(e,n,t){let r,u,o,a;const i=e.posMax,c=e.pos;for(e.pos=n+1,r=1;e.pos<i;){if(o=e.src.charCodeAt(e.pos),o===93&&(r--,r===0)){u=!0;break}if(a=e.pos,e.md.inline.skipToken(e),o===91){if(a===e.pos-1)r++;else if(t)return e.pos=c,-1}}let s=-1;return u&&(s=e.pos),e.pos=c,s}function ai(e,n,t){let r,u=n;const o={ok:!1,pos:0,str:""};if(e.charCodeAt(u)===60){for(u++;u<t;){if(r=e.charCodeAt(u),r===10||r===60)return o;if(r===62)return o.pos=u+1,o.str=Re(e.slice(n+1,u)),o.ok=!0,o;if(r===92&&u+1<t){u+=2;continue}u++}return o}let a=0;for(;u<t&&(r=e.charCodeAt(u),!(r===32||r<32||r===127));){if(r===92&&u+1<t){if(e.charCodeAt(u+1)===32)break;u+=2;continue}if(r===40&&(a++,a>32))return o;if(r===41){if(a===0)break;a--}u++}return n===u||a!==0||(o.str=Re(e.slice(n,u)),o.pos=u,o.ok=!0),o}function ci(e,n,t,r){let u,o=n;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)a.str=r.str,a.marker=r.marker;else{if(o>=t)return a;let i=e.charCodeAt(o);if(i!==34&&i!==39&&i!==40)return a;n++,o++,i===40&&(i=41),a.marker=i}for(;o<t;){if(u=e.charCodeAt(o),u===a.marker)return a.pos=o+1,a.str+=Re(e.slice(n,o)),a.ok=!0,a;if(u===40&&a.marker===41)return a;u===92&&o+1<t&&o++,o++}return a.can_continue=!0,a.str+=Re(e.slice(n,o)),a}const li=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:ai,parseLinkLabel:ii,parseLinkTitle:ci},Symbol.toStringTag,{value:"Module"})),ee={};ee.code_inline=function(e,n,t,r,u){const o=e[n];return"<code"+u.renderAttrs(o)+">"+fe(o.content)+"</code>"};ee.code_block=function(e,n,t,r,u){const o=e[n];return"<pre"+u.renderAttrs(o)+"><code>"+fe(e[n].content)+`</code></pre>
`};ee.fence=function(e,n,t,r,u){const o=e[n],a=o.info?Re(o.info).trim():"";let i="",c="";if(a){const d=a.split(/(\s+)/g);i=d[0],c=d.slice(2).join("")}let s;if(t.highlight?s=t.highlight(o.content,i,c)||fe(o.content):s=fe(o.content),s.indexOf("<pre")===0)return s+`
`;if(a){const d=o.attrIndex("class"),l=o.attrs?o.attrs.slice():[];d<0?l.push(["class",t.langPrefix+i]):(l[d]=l[d].slice(),l[d][1]+=" "+t.langPrefix+i);const h={attrs:l};return`<pre><code${u.renderAttrs(h)}>${s}</code></pre>
`}return`<pre><code${u.renderAttrs(o)}>${s}</code></pre>
`};ee.image=function(e,n,t,r,u){const o=e[n];return o.attrs[o.attrIndex("alt")][1]=u.renderInlineAsText(o.children,t,r),u.renderToken(e,n,t)};ee.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};ee.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};ee.text=function(e,n){return fe(e[n].content)};ee.html_block=function(e,n){return e[n].content};ee.html_inline=function(e,n){return e[n].content};function Oe(){this.rules=An({},ee)}Oe.prototype.renderAttrs=function(n){let t,r,u;if(!n.attrs)return"";for(u="",t=0,r=n.attrs.length;t<r;t++)u+=" "+fe(n.attrs[t][0])+'="'+fe(n.attrs[t][1])+'"';return u};Oe.prototype.renderToken=function(n,t,r){const u=n[t];let o="";if(u.hidden)return"";u.block&&u.nesting!==-1&&t&&n[t-1].hidden&&(o+=`
`),o+=(u.nesting===-1?"</":"<")+u.tag,o+=this.renderAttrs(u),u.nesting===0&&r.xhtmlOut&&(o+=" /");let a=!1;if(u.block&&(a=!0,u.nesting===1&&t+1<n.length)){const i=n[t+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===u.tag)&&(a=!1)}return o+=a?`>
`:">",o};Oe.prototype.renderInline=function(e,n,t){let r="";const u=this.rules;for(let o=0,a=e.length;o<a;o++){const i=e[o].type;typeof u[i]<"u"?r+=u[i](e,o,n,t,this):r+=this.renderToken(e,o,n)}return r};Oe.prototype.renderInlineAsText=function(e,n,t){let r="";for(let u=0,o=e.length;u<o;u++)switch(e[u].type){case"text":r+=e[u].content;break;case"image":r+=this.renderInlineAsText(e[u].children,n,t);break;case"html_inline":case"html_block":r+=e[u].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};Oe.prototype.render=function(e,n,t){let r="";const u=this.rules;for(let o=0,a=e.length;o<a;o++){const i=e[o].type;i==="inline"?r+=this.renderInline(e[o].children,n,t):typeof u[i]<"u"?r+=u[i](e,o,n,t,this):r+=this.renderToken(e,o,n,t)}return r};function j(){this.__rules__=[],this.__cache__=null}j.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};j.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){r.enabled&&(t&&r.alt.indexOf(t)<0||e.__cache__[t].push(r.fn))})})};j.prototype.at=function(e,n,t){const r=this.__find__(e),u=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=u.alt||[],this.__cache__=null};j.prototype.before=function(e,n,t,r){const u=this.__find__(e),o=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};j.prototype.after=function(e,n,t,r){const u=this.__find__(e),o=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u+1,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};j.prototype.push=function(e,n,t){const r=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};j.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!0,t.push(r)},this),this.__cache__=null,t};j.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};j.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!1,t.push(r)},this),this.__cache__=null,t};j.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function K(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}K.prototype.attrIndex=function(n){if(!this.attrs)return-1;const t=this.attrs;for(let r=0,u=t.length;r<u;r++)if(t[r][0]===n)return r;return-1};K.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};K.prototype.attrSet=function(n,t){const r=this.attrIndex(n),u=[n,t];r<0?this.attrPush(u):this.attrs[r]=u};K.prototype.attrGet=function(n){const t=this.attrIndex(n);let r=null;return t>=0&&(r=this.attrs[t][1]),r};K.prototype.attrJoin=function(n,t){const r=this.attrIndex(n);r<0?this.attrPush([n,t]):this.attrs[r][1]=this.attrs[r][1]+" "+t};function Kr(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}Kr.prototype.Token=K;const si=/\r\n?|\n/g,di=/\0/g;function fi(e){let n;n=e.src.replace(si,`
`),n=n.replace(di,"�"),e.src=n}function hi(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function pi(e){const n=e.tokens;for(let t=0,r=n.length;t<r;t++){const u=n[t];u.type==="inline"&&e.md.inline.parse(u.content,e.md,e.env,u.children)}}function bi(e){return/^<a[>\s]/i.test(e)}function mi(e){return/^<\/a\s*>/i.test(e)}function gi(e){const n=e.tokens;if(e.md.options.linkify)for(let t=0,r=n.length;t<r;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;let u=n[t].children,o=0;for(let a=u.length-1;a>=0;a--){const i=u[a];if(i.type==="link_close"){for(a--;u[a].level!==i.level&&u[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(bi(i.content)&&o>0&&o--,mi(i.content)&&o++),!(o>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const c=i.content;let s=e.md.linkify.match(c);const d=[];let l=i.level,h=0;s.length>0&&s[0].index===0&&a>0&&u[a-1].type==="text_special"&&(s=s.slice(1));for(let f=0;f<s.length;f++){const p=s[f].url,b=e.md.normalizeLink(p);if(!e.md.validateLink(b))continue;let m=s[f].text;s[f].schema?s[f].schema==="mailto:"&&!/^mailto:/i.test(m)?m=e.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=e.md.normalizeLinkText(m):m=e.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const g=s[f].index;if(g>h){const v=new e.Token("text","",0);v.content=c.slice(h,g),v.level=l,d.push(v)}const k=new e.Token("link_open","a",1);k.attrs=[["href",b]],k.level=l++,k.markup="linkify",k.info="auto",d.push(k);const y=new e.Token("text","",0);y.content=m,y.level=l,d.push(y);const x=new e.Token("link_close","a",-1);x.level=--l,x.markup="linkify",x.info="auto",d.push(x),h=s[f].lastIndex}if(h<c.length){const f=new e.Token("text","",0);f.content=c.slice(h),f.level=l,d.push(f)}n[t].children=u=Zr(u,a,d)}}}}const Jr=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ki=/\((c|tm|r)\)/i,yi=/\((c|tm|r)\)/ig,xi={c:"©",r:"®",tm:"™"};function vi(e,n){return xi[n.toLowerCase()]}function wi(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&(r.content=r.content.replace(yi,vi)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Ci(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&Jr.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function _i(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(ki.test(e.tokens[n].content)&&wi(e.tokens[n].children),Jr.test(e.tokens[n].content)&&Ci(e.tokens[n].children))}const Ei=/['"]/,tr=/['"]/g,rr="’";function ln(e,n,t,r){e[n]||(e[n]=[]),e[n].push({pos:t,ch:r})}function Ai(e,n){let t="",r=0;n.sort((u,o)=>u.pos-o.pos);for(let u=0;u<n.length;u++){const o=n[u];t+=e.slice(r,o.pos)+o.ch,r=o.pos+1}return t+e.slice(r)}function Si(e,n){let t;const r=[],u={};for(let o=0;o<e.length;o++){const a=e[o],i=e[o].level;for(t=r.length-1;t>=0&&!(r[t].level<=i);t--);if(r.length=t+1,a.type!=="text")continue;const c=a.content;let s=0;const d=c.length;e:for(;s<d;){tr.lastIndex=s;const l=tr.exec(c);if(!l)break;let h=!0,f=!0;s=l.index+1;const p=l[0]==="'";let b=32;if(l.index-1>=0)b=c.charCodeAt(l.index-1);else for(t=o-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){b=e[t].content.charCodeAt(e[t].content.length-1);break}let m=32;if(s<d)m=c.charCodeAt(s);else for(t=o+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){m=e[t].content.charCodeAt(0);break}const g=en(b)||Qe(b),k=en(m)||Qe(m),y=Xe(b),x=Xe(m);if(x?h=!1:k&&(y||g||(h=!1)),y?f=!1:g&&(x||k||(f=!1)),m===34&&l[0]==='"'&&b>=48&&b<=57&&(f=h=!1),h&&f&&(h=g,f=k),!h&&!f){p&&ln(u,o,l.index,rr);continue}if(f)for(t=r.length-1;t>=0;t--){let v=r[t];if(r[t].level<i)break;if(v.single===p&&r[t].level===i){v=r[t];let w,E;p?(w=n.md.options.quotes[2],E=n.md.options.quotes[3]):(w=n.md.options.quotes[0],E=n.md.options.quotes[1]),ln(u,o,l.index,E),ln(u,v.token,v.pos,w),r.length=t;continue e}}h?r.push({token:o,pos:l.index,single:p,level:i}):f&&p&&ln(u,o,l.index,rr)}}Object.keys(u).forEach(function(o){e[o].content=Ai(e[o].content,u[o])})}function Fi(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Ei.test(e.tokens[n].content)||Si(e.tokens[n].children,e)}function Di(e){let n,t;const r=e.tokens,u=r.length;for(let o=0;o<u;o++){if(r[o].type!=="inline")continue;const a=r[o].children,i=a.length;for(n=0;n<i;n++)a[n].type==="text_special"&&(a[n].type="text");for(n=t=0;n<i;n++)a[n].type==="text"&&n+1<i&&a[n+1].type==="text"?a[n+1].content=a[n].content+a[n+1].content:(n!==t&&(a[t]=a[n]),t++);n!==t&&(a.length=t)}}const Un=[["normalize",fi],["block",hi],["inline",pi],["linkify",gi],["replacements",_i],["smartquotes",Fi],["text_join",Di]];function Ft(){this.ruler=new j;for(let e=0;e<Un.length;e++)this.ruler.push(Un[e][0],Un[e][1])}Ft.prototype.process=function(e){const n=this.ruler.getRules("");for(let t=0,r=n.length;t<r;t++)n[t](e)};Ft.prototype.State=Kr;function ne(e,n,t,r){this.src=e,this.md=n,this.env=t,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const u=this.src;for(let o=0,a=0,i=0,c=0,s=u.length,d=!1;a<s;a++){const l=u.charCodeAt(a);if(!d)if(D(l)){i++,l===9?c+=4-c%4:c++;continue}else d=!0;(l===10||a===s-1)&&(l!==10&&a++,this.bMarks.push(o),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(c),this.bsCount.push(0),d=!1,i=0,c=0,o=a+1)}this.bMarks.push(u.length),this.eMarks.push(u.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ne.prototype.push=function(e,n,t){const r=new K(e,n,t);return r.block=!0,t<0&&this.level--,r.level=this.level,t>0&&this.level++,this.tokens.push(r),r};ne.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};ne.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};ne.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){const r=this.src.charCodeAt(n);if(!D(r))break}return n};ne.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!D(this.src.charCodeAt(--n)))return n+1;return n};ne.prototype.skipChars=function(n,t){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===t;n++);return n};ne.prototype.skipCharsBack=function(n,t,r){if(n<=r)return n;for(;n>r;)if(t!==this.src.charCodeAt(--n))return n+1;return n};ne.prototype.getLines=function(n,t,r,u){if(n>=t)return"";const o=new Array(t-n);for(let a=0,i=n;i<t;i++,a++){let c=0;const s=this.bMarks[i];let d=s,l;for(i+1<t||u?l=this.eMarks[i]+1:l=this.eMarks[i];d<l&&c<r;){const h=this.src.charCodeAt(d);if(D(h))h===9?c+=4-(c+this.bsCount[i])%4:c++;else if(d-s<this.tShift[i])c++;else break;d++}c>r?o[a]=new Array(c-r+1).join(" ")+this.src.slice(d,l):o[a]=this.src.slice(d,l)}return o.join("")};ne.prototype.Token=K;const Ti=65536;function Gn(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(t,r)}function ur(e){const n=[],t=e.length;let r=0,u=e.charCodeAt(r),o=!1,a=0,i="";for(;r<t;)u===124&&(o?(i+=e.substring(a,r-1),a=r):(n.push(i+e.substring(a,r)),i="",a=r+1)),o=u===92,r++,u=e.charCodeAt(r);return n.push(i+e.substring(a)),n}function Ii(e,n,t,r){if(n+2>t)return!1;let u=n+1;if(e.sCount[u]<e.blkIndent||e.sCount[u]-e.blkIndent>=4)return!1;let o=e.bMarks[u]+e.tShift[u];if(o>=e.eMarks[u])return!1;const a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58||o>=e.eMarks[u])return!1;const i=e.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58&&!D(i)||a===45&&D(i))return!1;for(;o<e.eMarks[u];){const x=e.src.charCodeAt(o);if(x!==124&&x!==45&&x!==58&&!D(x))return!1;o++}let c=Gn(e,n+1),s=c.split("|");const d=[];for(let x=0;x<s.length;x++){const v=s[x].trim();if(!v){if(x===0||x===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(v))return!1;v.charCodeAt(v.length-1)===58?d.push(v.charCodeAt(0)===58?"center":"right"):v.charCodeAt(0)===58?d.push("left"):d.push("")}if(c=Gn(e,n).trim(),c.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;s=ur(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const l=s.length;if(l===0||l!==d.length)return!1;if(r)return!0;const h=e.parentType;e.parentType="table";const f=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),b=[n,0];p.map=b;const m=e.push("thead_open","thead",1);m.map=[n,n+1];const g=e.push("tr_open","tr",1);g.map=[n,n+1];for(let x=0;x<s.length;x++){const v=e.push("th_open","th",1);d[x]&&(v.attrs=[["style","text-align:"+d[x]]]);const w=e.push("inline","",0);w.content=s[x].trim(),w.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let k,y=0;for(u=n+2;u<t&&!(e.sCount[u]<e.blkIndent);u++){let x=!1;for(let w=0,E=f.length;w<E;w++)if(f[w](e,u,t,!0)){x=!0;break}if(x||(c=Gn(e,u).trim(),!c)||e.sCount[u]-e.blkIndent>=4||(s=ur(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),y+=l-s.length,y>Ti))break;if(u===n+2){const w=e.push("tbody_open","tbody",1);w.map=k=[n+2,0]}const v=e.push("tr_open","tr",1);v.map=[u,u+1];for(let w=0;w<l;w++){const E=e.push("td_open","td",1);d[w]&&(E.attrs=[["style","text-align:"+d[w]]]);const F=e.push("inline","",0);F.content=s[w]?s[w].trim():"",F.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return k&&(e.push("tbody_close","tbody",-1),k[1]=u),e.push("table_close","table",-1),b[1]=u,e.parentType=h,e.line=u,!0}function Mi(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,u=r;for(;r<t;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,u=r;continue}break}e.line=u;const o=e.push("code_block","code",0);return o.content=e.getLines(n,u,4+e.blkIndent,!1)+`
`,o.map=[n,e.line],!0}function Ni(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||u+3>o)return!1;const a=e.src.charCodeAt(u);if(a!==126&&a!==96)return!1;let i=u;u=e.skipChars(u,a);let c=u-i;if(c<3)return!1;const s=e.src.slice(i,u),d=e.src.slice(u,o);if(a===96&&d.indexOf(String.fromCharCode(a))>=0)return!1;if(r)return!0;let l=n,h=!1;for(;l++,!(l>=t||(u=i=e.bMarks[l]+e.tShift[l],o=e.eMarks[l],u<o&&e.sCount[l]<e.blkIndent));)if(e.src.charCodeAt(u)===a&&!(e.sCount[l]-e.blkIndent>=4)&&(u=e.skipChars(u,a),!(u-i<c)&&(u=e.skipSpaces(u),!(u<o)))){h=!0;break}c=e.sCount[n],e.line=l+(h?1:0);const f=e.push("fence","code",0);return f.info=d,f.content=e.getLines(n+1,l,c,!0),f.markup=s,f.map=[n,e.line],!0}function Ri(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];const a=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==62)return!1;if(r)return!0;const i=[],c=[],s=[],d=[],l=e.md.block.ruler.getRules("blockquote"),h=e.parentType;e.parentType="blockquote";let f=!1,p;for(p=n;p<t;p++){const y=e.sCount[p]<e.blkIndent;if(u=e.bMarks[p]+e.tShift[p],o=e.eMarks[p],u>=o)break;if(e.src.charCodeAt(u++)===62&&!y){let v=e.sCount[p]+1,w,E;e.src.charCodeAt(u)===32?(u++,v++,E=!1,w=!0):e.src.charCodeAt(u)===9?(w=!0,(e.bsCount[p]+v)%4===3?(u++,v++,E=!1):E=!0):w=!1;let F=v;for(i.push(e.bMarks[p]),e.bMarks[p]=u;u<o;){const z=e.src.charCodeAt(u);if(D(z))z===9?F+=4-(F+e.bsCount[p]+(E?1:0))%4:F++;else break;u++}f=u>=o,c.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(w?1:0),s.push(e.sCount[p]),e.sCount[p]=F-v,d.push(e.tShift[p]),e.tShift[p]=u-e.bMarks[p];continue}if(f)break;let x=!1;for(let v=0,w=l.length;v<w;v++)if(l[v](e,p,t,!0)){x=!0;break}if(x){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),c.push(e.bsCount[p]),d.push(e.tShift[p]),s.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),c.push(e.bsCount[p]),d.push(e.tShift[p]),s.push(e.sCount[p]),e.sCount[p]=-1}const b=e.blkIndent;e.blkIndent=0;const m=e.push("blockquote_open","blockquote",1);m.markup=">";const g=[n,0];m.map=g,e.md.block.tokenize(e,n,p);const k=e.push("blockquote_close","blockquote",-1);k.markup=">",e.lineMax=a,e.parentType=h,g[1]=e.line;for(let y=0;y<d.length;y++)e.bMarks[y+n]=i[y],e.tShift[y+n]=d[y],e.sCount[y+n]=s[y],e.bsCount[y+n]=c[y];return e.blkIndent=b,!0}function Li(e,n,t,r){const u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.bMarks[n]+e.tShift[n];const a=e.src.charCodeAt(o++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;o<u;){const s=e.src.charCodeAt(o++);if(s!==a&&!D(s))return!1;s===a&&i++}if(i<3)return!1;if(r)return!0;e.line=n+1;const c=e.push("hr","hr",0);return c.map=[n,e.line],c.markup=Array(i+1).join(String.fromCharCode(a)),!0}function or(e,n){const t=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const u=e.src.charCodeAt(r++);if(u!==42&&u!==45&&u!==43)return-1;if(r<t){const o=e.src.charCodeAt(r);if(!D(o))return-1}return r}function ir(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let u=t;if(u+1>=r)return-1;let o=e.src.charCodeAt(u++);if(o<48||o>57)return-1;for(;;){if(u>=r)return-1;if(o=e.src.charCodeAt(u++),o>=48&&o<=57){if(u-t>=10)return-1;continue}if(o===41||o===46)break;return-1}return u<r&&(o=e.src.charCodeAt(u),!D(o))?-1:u}function zi(e,n){const t=e.level+2;for(let r=n+2,u=e.tokens.length-2;r<u;r++)e.tokens[r].level===t&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Pi(e,n,t,r){let u,o,a,i,c=n,s=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let d=!1;r&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(d=!0);let l,h,f;if((f=ir(e,c))>=0){if(l=!0,a=e.bMarks[c]+e.tShift[c],h=Number(e.src.slice(a,f-1)),d&&h!==1)return!1}else if((f=or(e,c))>=0)l=!1;else return!1;if(d&&e.skipSpaces(f)>=e.eMarks[c])return!1;if(r)return!0;const p=e.src.charCodeAt(f-1),b=e.tokens.length;l?(i=e.push("ordered_list_open","ol",1),h!==1&&(i.attrs=[["start",h]])):i=e.push("bullet_list_open","ul",1);const m=[c,0];i.map=m,i.markup=String.fromCharCode(p);let g=!1;const k=e.md.block.ruler.getRules("list"),y=e.parentType;for(e.parentType="list";c<t;){o=f,u=e.eMarks[c];const x=e.sCount[c]+f-(e.bMarks[c]+e.tShift[c]);let v=x;for(;o<u;){const Ce=e.src.charCodeAt(o);if(Ce===9)v+=4-(v+e.bsCount[c])%4;else if(Ce===32)v++;else break;o++}const w=o;let E;w>=u?E=1:E=v-x,E>4&&(E=1);const F=x+E;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const z=[c,0];i.map=z,l&&(i.info=e.src.slice(a,f-1));const he=e.tight,qn=e.tShift[c],io=e.sCount[c],ao=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=F,e.tight=!0,e.tShift[c]=w-e.bMarks[c],e.sCount[c]=v,w>=u&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,c,t,!0),(!e.tight||g)&&(s=!1),g=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ao,e.tShift[c]=qn,e.sCount[c]=io,e.tight=he,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),c=e.line,z[1]=c,c>=t||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let Vt=!1;for(let Ce=0,co=k.length;Ce<co;Ce++)if(k[Ce](e,c,t,!0)){Vt=!0;break}if(Vt)break;if(l){if(f=ir(e,c),f<0)break;a=e.bMarks[c]+e.tShift[c]}else if(f=or(e,c),f<0)break;if(p!==e.src.charCodeAt(f-1))break}return l?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),m[1]=c,e.line=c,e.parentType=y,s&&zi(e,b),!0}function Oi(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],a=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==91)return!1;function i(k){const y=e.lineMax;if(k>=y||e.isEmpty(k))return null;let x=!1;if(e.sCount[k]-e.blkIndent>3&&(x=!0),e.sCount[k]<0&&(x=!0),!x){const E=e.md.block.ruler.getRules("reference"),F=e.parentType;e.parentType="reference";let z=!1;for(let he=0,qn=E.length;he<qn;he++)if(E[he](e,k,y,!0)){z=!0;break}if(e.parentType=F,z)return null}const v=e.bMarks[k]+e.tShift[k],w=e.eMarks[k];return e.src.slice(v,w+1)}let c=e.src.slice(u,o+1);o=c.length;let s=-1;for(u=1;u<o;u++){const k=c.charCodeAt(u);if(k===91)return!1;if(k===93){s=u;break}else if(k===10){const y=i(a);y!==null&&(c+=y,o=c.length,a++)}else if(k===92&&(u++,u<o&&c.charCodeAt(u)===10)){const y=i(a);y!==null&&(c+=y,o=c.length,a++)}}if(s<0||c.charCodeAt(s+1)!==58)return!1;for(u=s+2;u<o;u++){const k=c.charCodeAt(u);if(k===10){const y=i(a);y!==null&&(c+=y,o=c.length,a++)}else if(!D(k))break}const d=e.md.helpers.parseLinkDestination(c,u,o);if(!d.ok)return!1;const l=e.md.normalizeLink(d.str);if(!e.md.validateLink(l))return!1;u=d.pos;const h=u,f=a,p=u;for(;u<o;u++){const k=c.charCodeAt(u);if(k===10){const y=i(a);y!==null&&(c+=y,o=c.length,a++)}else if(!D(k))break}let b=e.md.helpers.parseLinkTitle(c,u,o);for(;b.can_continue;){const k=i(a);if(k===null)break;c+=k,u=o,o=c.length,a++,b=e.md.helpers.parseLinkTitle(c,u,o,b)}let m;for(u<o&&p!==u&&b.ok?(m=b.str,u=b.pos):(m="",u=h,a=f);u<o;){const k=c.charCodeAt(u);if(!D(k))break;u++}if(u<o&&c.charCodeAt(u)!==10&&m)for(m="",u=h,a=f;u<o;){const k=c.charCodeAt(u);if(!D(k))break;u++}if(u<o&&c.charCodeAt(u)!==10)return!1;const g=Sn(c.slice(1,s));return g?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[g]>"u"&&(e.env.references[g]={title:m,href:l}),e.line=a),!0):!1}const $i=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Bi="[a-zA-Z_:][a-zA-Z0-9:._-]*",qi="[^\"'=<>`\\x00-\\x20]+",ji="'[^']*'",Hi='"[^"]*"',Ui="(?:"+qi+"|"+ji+"|"+Hi+")",Gi="(?:\\s+"+Bi+"(?:\\s*=\\s*"+Ui+")?)",Xr="<[A-Za-z][A-Za-z0-9\\-]*"+Gi+"*\\s*\\/?>",Qr="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Vi="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Zi="<[?][\\s\\S]*?[?]>",Wi="<![A-Za-z][^>]*>",Yi="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ki=new RegExp("^(?:"+Xr+"|"+Qr+"|"+Vi+"|"+Zi+"|"+Wi+"|"+Yi+")"),Ji=new RegExp("^(?:"+Xr+"|"+Qr+")"),pe=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+$i.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ji.source+"\\s*$"),/^$/,!1]];function Xi(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(u)!==60)return!1;let a=e.src.slice(u,o),i=0;for(;i<pe.length&&!pe[i][0].test(a);i++);if(i===pe.length)return!1;if(r)return pe[i][2];let c=n+1;const s=pe[i][1].test("");if(!pe[i][1].test(a)){for(;c<t&&!(e.sCount[c]<e.blkIndent&&(s||!e.isEmpty(c)));c++)if(u=e.bMarks[c]+e.tShift[c],o=e.eMarks[c],a=e.src.slice(u,o),pe[i][1].test(a)){a.length!==0&&c++;break}}e.line=c;const d=e.push("html_block","",0);return d.map=[n,c],d.content=e.getLines(n,c,e.blkIndent,!0),!0}function Qi(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(u);if(a!==35||u>=o)return!1;let i=1;for(a=e.src.charCodeAt(++u);a===35&&u<o&&i<=6;)i++,a=e.src.charCodeAt(++u);if(i>6||u<o&&!D(a))return!1;if(r)return!0;o=e.skipSpacesBack(o,u);const c=e.skipCharsBack(o,35,u);c>u&&D(e.src.charCodeAt(c-1))&&(o=c),e.line=n+1;const s=e.push("heading_open","h"+String(i),1);s.markup="########".slice(0,i),s.map=[n,e.line];const d=e.push("inline","",0);d.content=Fn(e.src.slice(u,o)),d.map=[n,e.line],d.children=[];const l=e.push("heading_close","h"+String(i),-1);return l.markup="########".slice(0,i),!0}function ea(e,n,t){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const u=e.parentType;e.parentType="paragraph";let o=0,a,i=n+1;for(;i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let f=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(f<p&&(a=e.src.charCodeAt(f),(a===45||a===61)&&(f=e.skipChars(f,a),f=e.skipSpaces(f),f>=p))){o=a===61?1:2;break}}if(e.sCount[i]<0)continue;let h=!1;for(let f=0,p=r.length;f<p;f++)if(r[f](e,i,t,!0)){h=!0;break}if(h)break}if(!o)return e.parentType=u,!1;const c=Fn(e.getLines(n,i,e.blkIndent,!1));e.line=i+1;const s=e.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(a),s.map=[n,e.line];const d=e.push("inline","",0);d.content=c,d.map=[n,e.line-1],d.children=[];const l=e.push("heading_close","h"+String(o),-1);return l.markup=String.fromCharCode(a),e.parentType=u,!0}function na(e,n,t){const r=e.md.block.ruler.getRules("paragraph"),u=e.parentType;let o=n+1;for(e.parentType="paragraph";o<t&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let s=!1;for(let d=0,l=r.length;d<l;d++)if(r[d](e,o,t,!0)){s=!0;break}if(s)break}const a=Fn(e.getLines(n,o,e.blkIndent,!1));e.line=o;const i=e.push("paragraph_open","p",1);i.map=[n,e.line];const c=e.push("inline","",0);return c.content=a,c.map=[n,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=u,!0}const sn=[["table",Ii,["paragraph","reference"]],["code",Mi],["fence",Ni,["paragraph","reference","blockquote","list"]],["blockquote",Ri,["paragraph","reference","blockquote","list"]],["hr",Li,["paragraph","reference","blockquote","list"]],["list",Pi,["paragraph","reference","blockquote"]],["reference",Oi],["html_block",Xi,["paragraph","reference","blockquote"]],["heading",Qi,["paragraph","reference","blockquote"]],["lheading",ea],["paragraph",na]];function Dn(){this.ruler=new j;for(let e=0;e<sn.length;e++)this.ruler.push(sn[e][0],sn[e][1],{alt:(sn[e][2]||[]).slice()})}Dn.prototype.tokenize=function(e,n,t){const r=this.ruler.getRules(""),u=r.length,o=e.md.options.maxNesting;let a=n,i=!1;for(;a<t&&(e.line=a=e.skipEmptyLines(a),!(a>=t||e.sCount[a]<e.blkIndent));){if(e.level>=o){e.line=t;break}const c=e.line;let s=!1;for(let d=0;d<u;d++)if(s=r[d](e,a,t,!1),s){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<t&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};Dn.prototype.parse=function(e,n,t,r){if(!e)return;const u=new this.State(e,n,t,r);this.tokenize(u,u.line,u.lineMax)};Dn.prototype.State=ne;function rn(e,n,t,r){this.src=e,this.env=t,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}rn.prototype.pushPending=function(){const e=new K("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};rn.prototype.push=function(e,n,t){this.pending&&this.pushPending();const r=new K(e,n,t);let u=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],u={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(u),r};rn.prototype.scanDelims=function(e,n){const t=this.posMax,r=this.src.charCodeAt(e);let u;if(e===0)u=32;else if(e===1)u=this.src.charCodeAt(0),(u&63488)===55296&&(u=65533);else if(u=this.src.charCodeAt(e-1),(u&64512)===56320){const m=this.src.charCodeAt(e-2);u=(m&64512)===55296?65536+(m-55296<<10)+(u-56320):65533}else(u&64512)===55296&&(u=65533);let o=e;for(;o<t&&this.src.charCodeAt(o)===r;)o++;const a=o-e;let i=o<t?this.src.charCodeAt(o):32;if((i&64512)===55296){const m=this.src.charCodeAt(o+1);i=(m&64512)===56320?65536+(i-55296<<10)+(m-56320):65533}else(i&64512)===56320&&(i=65533);const c=en(u)||Qe(u),s=en(i)||Qe(i),d=Xe(u),l=Xe(i),h=!l&&(!s||d||c),f=!d&&(!c||l||s);return{can_open:h&&(n||!f||c),can_close:f&&(n||!h||s),length:a}};rn.prototype.Token=K;function ta(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function ra(e,n){let t=e.pos;for(;t<e.posMax&&!ta(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}const ua=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function oa(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,r=e.posMax;if(t+3>r||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const u=e.pending.match(ua);if(!u)return!1;const o=u[1],a=e.md.linkify.matchAtStart(e.src.slice(t-o.length));if(!a)return!1;let i=a.url;if(i.length<=o.length)return!1;let c=i.length;for(;c>0&&i.charCodeAt(c-1)===42;)c--;c!==i.length&&(i=i.slice(0,c));const s=e.md.normalizeLink(i);if(!e.md.validateLink(s))return!1;if(!n){e.pending=e.pending.slice(0,-o.length);const d=e.push("link_open","a",1);d.attrs=[["href",s]],d.markup="linkify",d.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(i);const h=e.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return e.pos+=i.length-o.length,!0}function ia(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const r=e.pending.length-1,u=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let o=r-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<u&&D(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const Dt=[];for(let e=0;e<256;e++)Dt.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Dt[e.charCodeAt(0)]=1});function aa(e,n){let t=e.pos;const r=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=r))return!1;let u=e.src.charCodeAt(t);if(u===10){for(n||e.push("hardbreak","br",0),t++;t<r&&(u=e.src.charCodeAt(t),!!D(u));)t++;return e.pos=t,!0}if(u===32){if(!n){const i=e.push("text_special","",0);i.content="\\",i.markup="\\",i.info="escape"}return e.pos=t,!0}let o=e.src[t];if(u>=55296&&u<=56319&&t+1<r){const i=e.src.charCodeAt(t+1);i>=56320&&i<=57343&&(o+=e.src[t+1],t++)}const a="\\"+o;if(!n){const i=e.push("text_special","",0);u<256&&Dt[u]!==0?i.content=o:i.content=a,i.markup=a,i.info="escape"}return e.pos=t+1,!0}function ca(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const u=t;t++;const o=e.posMax;for(;t<o&&e.src.charCodeAt(t)===96;)t++;const a=e.src.slice(u,t),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=u)return n||(e.pending+=a),e.pos+=i,!0;let c=t,s;for(;(s=e.src.indexOf("`",c))!==-1;){for(c=s+1;c<o&&e.src.charCodeAt(c)===96;)c++;const d=c-s;if(d===i){if(!n){const l=e.push("code_inline","code",0);l.markup=a,l.content=e.src.slice(t,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[d]=s}return e.backticksScanned=!0,n||(e.pending+=a),e.pos+=i,!0}function la(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==126)return!1;const u=e.scanDelims(e.pos,!0);let o=u.length;const a=String.fromCharCode(r);if(o<2)return!1;let i;o%2&&(i=e.push("text","",0),i.content=a,o--);for(let c=0;c<o;c+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close});return e.pos+=u.length,!0}function ar(e,n){let t;const r=[],u=n.length;for(let o=0;o<u;o++){const a=n[o];if(a.marker!==126||a.end===-1)continue;const i=n[a.end];t=e.tokens[a.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[i.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&r.push(i.token-1)}for(;r.length;){const o=r.pop();let a=o+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,o!==a&&(t=e.tokens[a],e.tokens[a]=e.tokens[o],e.tokens[o]=t)}}function sa(e){const n=e.tokens_meta,t=e.tokens_meta.length;ar(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&ar(e,n[r].delimiters)}const eu={tokenize:la,postProcess:sa};function da(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==95&&r!==42)return!1;const u=e.scanDelims(e.pos,r===42);for(let o=0;o<u.length;o++){const a=e.push("text","",0);a.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:u.length,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close})}return e.pos+=u.length,!0}function cr(e,n){const t=n.length;for(let r=t-1;r>=0;r--){const u=n[r];if(u.marker!==95&&u.marker!==42||u.end===-1)continue;const o=n[u.end],a=r>0&&n[r-1].end===u.end+1&&n[r-1].marker===u.marker&&n[r-1].token===u.token-1&&n[u.end+1].token===o.token+1,i=String.fromCharCode(u.marker),c=e.tokens[u.token];c.type=a?"strong_open":"em_open",c.tag=a?"strong":"em",c.nesting=1,c.markup=a?i+i:i,c.content="";const s=e.tokens[o.token];s.type=a?"strong_close":"em_close",s.tag=a?"strong":"em",s.nesting=-1,s.markup=a?i+i:i,s.content="",a&&(e.tokens[n[r-1].token].content="",e.tokens[n[u.end+1].token].content="",r--)}}function fa(e){const n=e.tokens_meta,t=e.tokens_meta.length;cr(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&cr(e,n[r].delimiters)}const nu={tokenize:da,postProcess:fa};function ha(e,n){let t,r,u,o,a="",i="",c=e.pos,s=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const d=e.pos,l=e.posMax,h=e.pos+1,f=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(f<0)return!1;let p=f+1;if(p<l&&e.src.charCodeAt(p)===40){for(s=!1,p++;p<l&&(t=e.src.charCodeAt(p),!(!D(t)&&t!==10));p++);if(p>=l)return!1;if(c=p,u=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),u.ok){for(a=e.md.normalizeLink(u.str),e.md.validateLink(a)?p=u.pos:a="",c=p;p<l&&(t=e.src.charCodeAt(p),!(!D(t)&&t!==10));p++);if(u=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<l&&c!==p&&u.ok)for(i=u.str,p=u.pos;p<l&&(t=e.src.charCodeAt(p),!(!D(t)&&t!==10));p++);}(p>=l||e.src.charCodeAt(p)!==41)&&(s=!0),p++}if(s){if(typeof e.env.references>"u")return!1;if(p<l&&e.src.charCodeAt(p)===91?(c=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?r=e.src.slice(c,p++):p=f+1):p=f+1,r||(r=e.src.slice(h,f)),o=e.env.references[Sn(r)],!o)return e.pos=d,!1;a=o.href,i=o.title}if(!n){e.pos=h,e.posMax=f;const b=e.push("link_open","a",1),m=[["href",a]];b.attrs=m,i&&m.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=l,!0}function pa(e,n){let t,r,u,o,a,i,c,s,d="";const l=e.pos,h=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const f=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(o=p+1,o<h&&e.src.charCodeAt(o)===40){for(o++;o<h&&(t=e.src.charCodeAt(o),!(!D(t)&&t!==10));o++);if(o>=h)return!1;for(s=o,i=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),i.ok&&(d=e.md.normalizeLink(i.str),e.md.validateLink(d)?o=i.pos:d=""),s=o;o<h&&(t=e.src.charCodeAt(o),!(!D(t)&&t!==10));o++);if(i=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<h&&s!==o&&i.ok)for(c=i.str,o=i.pos;o<h&&(t=e.src.charCodeAt(o),!(!D(t)&&t!==10));o++);else c="";if(o>=h||e.src.charCodeAt(o)!==41)return e.pos=l,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<h&&e.src.charCodeAt(o)===91?(s=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?u=e.src.slice(s,o++):o=p+1):o=p+1,u||(u=e.src.slice(f,p)),a=e.env.references[Sn(u)],!a)return e.pos=l,!1;d=a.href,c=a.title}if(!n){r=e.src.slice(f,p);const b=[];e.md.inline.parse(r,e.md,e.env,b);const m=e.push("image","img",0),g=[["src",d],["alt",""]];m.attrs=g,m.children=b,m.content=r,c&&g.push(["title",c])}return e.pos=o,e.posMax=h,!0}const ba=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,ma=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function ga(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const r=e.pos,u=e.posMax;for(;;){if(++t>=u)return!1;const a=e.src.charCodeAt(t);if(a===60)return!1;if(a===62)break}const o=e.src.slice(r+1,t);if(ma.test(o)){const a=e.md.normalizeLink(o);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);const s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}if(ba.test(o)){const a=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);const s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}return!1}function ka(e){return/^<a[>\s]/i.test(e)}function ya(e){return/^<\/a\s*>/i.test(e)}function xa(e){const n=e|32;return n>=97&&n<=122}function va(e,n){if(!e.md.options.html)return!1;const t=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=t)return!1;const u=e.src.charCodeAt(r+1);if(u!==33&&u!==63&&u!==47&&!xa(u))return!1;const o=e.src.slice(r).match(Ki);if(!o)return!1;if(!n){const a=e.push("html_inline","",0);a.content=o[0],ka(a.content)&&e.linkLevel++,ya(a.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}const wa=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Ca=/^&([a-z][a-z0-9]{1,31});/i;function _a(e,n){const t=e.pos,r=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=r)return!1;if(e.src.charCodeAt(t+1)===35){const o=e.src.slice(t).match(wa);if(o){if(!n){const a=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),i=e.push("text_special","",0);i.content=St(a)?Je(a):Je(65533),i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}else{const o=e.src.slice(t).match(Ca);if(o){const a=Ho(o[0]);if(a!==o[0]){if(!n){const i=e.push("text_special","",0);i.content=a,i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function lr(e){const n={},t=e.length;if(!t)return;let r=0,u=-2;const o=[];for(let a=0;a<t;a++){const i=e[a];if(o.push(0),(e[r].marker!==i.marker||u!==i.token-1)&&(r=a),u=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);const c=n[i.marker][(i.open?3:0)+i.length%3];let s=r-o[r]-1,d=s;for(;s>c;s-=o[s]+1){const l=e[s];if(l.marker===i.marker&&l.open&&l.end<0){let h=!1;if((l.close||i.open)&&(l.length+i.length)%3===0&&(l.length%3!==0||i.length%3!==0)&&(h=!0),!h){const f=s>0&&!e[s-1].open?o[s-1]+1:0;o[a]=a-s+f,o[s]=f,i.open=!1,l.end=a,l.close=!1,d=-1,u=-2;break}}}d!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=d)}}function Ea(e){const n=e.tokens_meta,t=e.tokens_meta.length;lr(e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&lr(n[r].delimiters)}function Aa(e){let n,t,r=0;const u=e.tokens,o=e.tokens.length;for(n=t=0;n<o;n++)u[n].nesting<0&&r--,u[n].level=r,u[n].nesting>0&&r++,u[n].type==="text"&&n+1<o&&u[n+1].type==="text"?u[n+1].content=u[n].content+u[n+1].content:(n!==t&&(u[t]=u[n]),t++);n!==t&&(u.length=t)}const Vn=[["text",ra],["linkify",oa],["newline",ia],["escape",aa],["backticks",ca],["strikethrough",eu.tokenize],["emphasis",nu.tokenize],["link",ha],["image",pa],["autolink",ga],["html_inline",va],["entity",_a]],Zn=[["balance_pairs",Ea],["strikethrough",eu.postProcess],["emphasis",nu.postProcess],["fragments_join",Aa]];function un(){this.ruler=new j;for(let e=0;e<Vn.length;e++)this.ruler.push(Vn[e][0],Vn[e][1]);this.ruler2=new j;for(let e=0;e<Zn.length;e++)this.ruler2.push(Zn[e][0],Zn[e][1])}un.prototype.skipToken=function(e){const n=e.pos,t=this.ruler.getRules(""),r=t.length,u=e.md.options.maxNesting,o=e.cache;if(typeof o[n]<"u"){e.pos=o[n];return}let a=!1;if(e.level<u){for(let i=0;i<r;i++)if(e.level++,a=t[i](e,!0),e.level--,a){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,o[n]=e.pos};un.prototype.tokenize=function(e){const n=this.ruler.getRules(""),t=n.length,r=e.posMax,u=e.md.options.maxNesting;for(;e.pos<r;){const o=e.pos;let a=!1;if(e.level<u){for(let i=0;i<t;i++)if(a=n[i](e,!1),a){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};un.prototype.parse=function(e,n,t,r){const u=new this.State(e,n,t,r);this.tokenize(u);const o=this.ruler2.getRules(""),a=o.length;for(let i=0;i<a;i++)o[i](u)};un.prototype.State=rn;function Sa(e){const n={};e=e||{},n.src_Any=qr.source,n.src_Cc=jr.source,n.src_Z=Ur.source,n.src_P=Et.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const t="[><｜]";return n.src_pseudo_letter=`(?:(?!${t}|${n.src_ZPCc})${n.src_Any})`,n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth=`(?:(?:(?!${n.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator=`(?=$|${t}|${n.src_ZPCc})(?!${e["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${n.src_ZPCc}))`,n.src_path=`(?:[/?#](?:(?!${n.src_ZCc}|${t}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${n.src_ZCc}|\\]).)*\\]|\\((?:(?!${n.src_ZCc}|[)]).)*\\)|\\{(?:(?!${n.src_ZCc}|[}]).)*\\}|\\"(?:(?!${n.src_ZCc}|["]).)+\\"|\\'(?:(?!${n.src_ZCc}|[']).)+\\'|\\'(?=${n.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${n.src_ZCc}|[.]|$)|`+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${n.src_ZCc}|$)|;(?!${n.src_ZCc}|$)|\\!+(?!${n.src_ZCc}|[!]|$)|\\?(?!${n.src_ZCc}|[?]|$))+|\\/)?`,n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+`|${n.src_pseudo_letter}{1,63})`,n.src_domain="(?:"+n.src_xn+`|(?:${n.src_pseudo_letter})|(?:${n.src_pseudo_letter}(?:-|${n.src_pseudo_letter}){0,61}${n.src_pseudo_letter}))`,n.src_host=`(?:(?:(?:(?:${n.src_domain})\\.)*${n.src_domain}))`,n.tpl_host_fuzzy="(?:"+n.src_ip4+`|(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%)))`,n.tpl_host_no_ip_fuzzy=`(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%))`,n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${n.src_ZPCc}|>|$))`,n.tpl_email_fuzzy=`(^|${t}|"|\\(|${n.src_ZCc})(${n.src_email_name}@${n.tpl_host_fuzzy_strict})`,n.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_fuzzy_strict}${n.src_path})`,n.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_no_ip_fuzzy_strict}${n.src_path})`,n}function st(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}function Tn(e){return Object.prototype.toString.call(e)}function Fa(e){return Tn(e)==="[object String]"}function Da(e){return Tn(e)==="[object Object]"}function Ta(e){return Tn(e)==="[object RegExp]"}function sr(e){return Tn(e)==="[object Function]"}function Ia(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const tu={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Ma(e){return Object.keys(e||{}).reduce(function(n,t){return n||tu.hasOwnProperty(t)},!1)}const Na={"http:":{validate:function(e,n,t){const r=e.slice(n);return t.re.http||(t.re.http=new RegExp(`^\\/\\/${t.re.src_auth}${t.re.src_host_port_strict}${t.re.src_path}`,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){const r=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+`(?:localhost|(?:(?:${t.re.src_domain})\\.)+${t.re.src_domain_root})`+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){const r=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp(`^${t.re.src_email_name}@${t.re.src_host_strict}`,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},Ra="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",La="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function za(e){return function(n,t){const r=n.slice(t);return e.test(r)?r.match(e)[0].length:0}}function dr(){return function(e,n){n.normalize(e)}}function gn(e){const n=e.re=Sa(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Ra),t.push(n.src_xn),n.src_tlds=t.join("|");function r(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const u=[];e.__compiled__={};function o(i,c){throw new Error(`(LinkifyIt) Invalid schema "${i}": ${c}`)}Object.keys(e.__schemas__).forEach(function(i){const c=e.__schemas__[i];if(c===null)return;const s={validate:null,link:null};if(e.__compiled__[i]=s,Da(c)){Ta(c.validate)?s.validate=za(c.validate):sr(c.validate)?s.validate=c.validate:o(i,c),sr(c.normalize)?s.normalize=c.normalize:c.normalize?o(i,c):s.normalize=dr();return}if(Fa(c)){u.push(i);return}o(i,c)}),u.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:dr()};const a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(Ia).join("|");e.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${a})`,"i"),e.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${a})`,"ig"),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,"i"),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,"i")}function ru(e,n,t,r){const u=e.slice(t,r);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=r,this.raw=u,this.text=u,this.url=u}function H(e,n){if(!(this instanceof H))return new H(e,n);n||Ma(e)&&(n=e,e={}),this.__opts__=st({},tu,n),this.__schemas__=st({},Na,e),this.__compiled__={},this.__tlds__=La,this.__tlds_replaced__=!1,this.re={},gn(this)}H.prototype.add=function(n,t){return this.__schemas__[n]=t,gn(this),this};H.prototype.set=function(n){return this.__opts__=st(this.__opts__,n),this};H.prototype.test=function(n){if(!n.length)return!1;let t,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(t=r.exec(n))!==null;)if(this.testSchemaAt(n,t[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};H.prototype.pretest=function(n){return this.re.pretest.test(n)};H.prototype.testSchemaAt=function(n,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,r,this):0};H.prototype.match=function(n){const t=[],r=[],u=[],o=[];let a,i,c;function s(h,f){return h?f?h.index!==f.index?h.index<f.index?h:f:h.lastIndex>=f.lastIndex?h:f:h:f}if(!n.length)return null;if(this.re.schema_test.test(n))for(c=this.re.schema_search,c.lastIndex=0;(a=c.exec(n))!==null;)i=this.testSchemaAt(n,a[2],c.lastIndex),i&&r.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(c=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)u.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(c=this.re.email_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)o.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});const d=[0,0,0];let l=0;for(;;){const h=[r[d[0]],o[d[1]],u[d[2]]],f=s(s(h[0],h[1]),h[2]);if(!f)break;if(f===h[0]?d[0]++:f===h[1]?d[1]++:d[2]++,f.index<l)continue;const p=new ru(n,f.schema,f.index,f.lastIndex);this.__compiled__[p.schema].normalize(p,this),t.push(p),l=f.lastIndex}return t.length?t:null};H.prototype.matchAtStart=function(n){if(!n.length)return null;const t=this.re.schema_at_start.exec(n);if(!t)return null;const r=this.testSchemaAt(n,t[2],t[0].length);if(!r)return null;const u=new ru(n,t[2],t.index+t[1].length,t.index+t[0].length+r);return this.__compiled__[u.schema].normalize(u,this),u};H.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,u,o){return r!==o[u-1]}).reverse(),gn(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,gn(this),this)};H.prototype.normalize=function(n){n.schema||(n.url=`http://${n.url}`),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url=`mailto:${n.url}`)};H.prototype.onCompile=function(){};const Te=2147483647,X=36,Tt=1,nn=26,Pa=38,Oa=700,uu=72,ou=128,iu="-",$a=/^xn--/,Ba=/[^\0-\x7F]/,qa=/[\x2E\u3002\uFF0E\uFF61]/g,ja={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Wn=X-Tt,Q=Math.floor,Yn=String.fromCharCode;function ie(e){throw new RangeError(ja[e])}function Ha(e,n){const t=[];let r=e.length;for(;r--;)t[r]=n(e[r]);return t}function au(e,n){const t=e.split("@");let r="";t.length>1&&(r=t[0]+"@",e=t[1]),e=e.replace(qa,".");const u=e.split("."),o=Ha(u,n).join(".");return r+o}function cu(e){const n=[];let t=0;const r=e.length;for(;t<r;){const u=e.charCodeAt(t++);if(u>=55296&&u<=56319&&t<r){const o=e.charCodeAt(t++);(o&64512)==56320?n.push(((u&1023)<<10)+(o&1023)+65536):(n.push(u),t--)}else n.push(u)}return n}const Ua=e=>String.fromCodePoint(...e),Ga=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:X},fr=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},lu=function(e,n,t){let r=0;for(e=t?Q(e/Oa):e>>1,e+=Q(e/n);e>Wn*nn>>1;r+=X)e=Q(e/Wn);return Q(r+(Wn+1)*e/(e+Pa))},su=function(e){const n=[],t=e.length;let r=0,u=ou,o=uu,a=e.lastIndexOf(iu);a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&ie("not-basic"),n.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<t;){const c=r;for(let d=1,l=X;;l+=X){i>=t&&ie("invalid-input");const h=Ga(e.charCodeAt(i++));h>=X&&ie("invalid-input"),h>Q((Te-r)/d)&&ie("overflow"),r+=h*d;const f=l<=o?Tt:l>=o+nn?nn:l-o;if(h<f)break;const p=X-f;d>Q(Te/p)&&ie("overflow"),d*=p}const s=n.length+1;o=lu(r-c,s,c==0),Q(r/s)>Te-u&&ie("overflow"),u+=Q(r/s),r%=s,n.splice(r++,0,u)}return String.fromCodePoint(...n)},du=function(e){const n=[];e=cu(e);const t=e.length;let r=ou,u=0,o=uu;for(const c of e)c<128&&n.push(Yn(c));const a=n.length;let i=a;for(a&&n.push(iu);i<t;){let c=Te;for(const d of e)d>=r&&d<c&&(c=d);const s=i+1;c-r>Q((Te-u)/s)&&ie("overflow"),u+=(c-r)*s,r=c;for(const d of e)if(d<r&&++u>Te&&ie("overflow"),d===r){let l=u;for(let h=X;;h+=X){const f=h<=o?Tt:h>=o+nn?nn:h-o;if(l<f)break;const p=l-f,b=X-f;n.push(Yn(fr(f+p%b,0))),l=Q(p/b)}n.push(Yn(fr(l,0))),o=lu(u,s,i===a),u=0,++i}++u,++r}return n.join("")},Va=function(e){return au(e,function(n){return $a.test(n)?su(n.slice(4).toLowerCase()):n})},Za=function(e){return au(e,function(n){return Ba.test(n)?"xn--"+du(n):n})},fu={version:"2.3.1",ucs2:{decode:cu,encode:Ua},decode:su,encode:du,toASCII:Za,toUnicode:Va},Wa={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},Ya={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Ka={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Ja={default:Wa,zero:Ya,commonmark:Ka},Xa=/^(vbscript|javascript|file|data):/,Qa=/^data:image\/(gif|png|jpeg|webp);/;function ec(e){const n=e.trim().toLowerCase();return Xa.test(n)?Qa.test(n):!0}const hu=["http:","https:","mailto:"];function nc(e){const n=_t(e,!0);if(n.hostname&&(!n.protocol||hu.indexOf(n.protocol)>=0))try{n.hostname=fu.toASCII(n.hostname)}catch{}return tn(Ct(n))}function tc(e){const n=_t(e,!0);if(n.hostname&&(!n.protocol||hu.indexOf(n.protocol)>=0))try{n.hostname=fu.toUnicode(n.hostname)}catch{}return Ne(Ct(n),Ne.defaultChars+"%")}function U(e,n){if(!(this instanceof U))return new U(e,n);n||At(e)||(n=e||{},e="default"),this.inline=new un,this.block=new Dn,this.core=new Ft,this.renderer=new Oe,this.linkify=new H,this.validateLink=ec,this.normalizeLink=nc,this.normalizeLinkText=tc,this.utils=oi,this.helpers=An({},li),this.options={},this.configure(e),n&&this.set(n)}U.prototype.set=function(e){return An(this.options,e),this};U.prototype.configure=function(e){const n=this;if(At(e)){const t=e;if(e=Ja[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};U.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};U.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};U.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};U.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};U.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};U.prototype.parseInline=function(e,n){const t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};U.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var hr=!1,Le={false:"push",true:"unshift",after:"push",before:"unshift"},kn={isPermalinkSymbol:!0};function dt(e,n,t,r){var u;if(!hr){var o="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(o):console.warn(o),hr=!0}var a=[Object.assign(new t.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,t)]],Object.entries(n.permalinkAttrs(e,t)))}),Object.assign(new t.Token("html_block","",0),{content:n.permalinkSymbol,meta:kn}),new t.Token("link_close","a",-1)];n.permalinkSpace&&t.tokens[r+1].children[Le[n.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(u=t.tokens[r+1].children)[Le[n.permalinkBefore]].apply(u,a)}function pu(e){return"#"+e}function bu(e){return{}}var rc={class:"header-anchor",symbol:"#",renderHref:pu,renderAttrs:bu};function on(e){function n(t){return t=Object.assign({},n.defaults,t),function(r,u,o,a){return e(r,t,u,o,a)}}return n.defaults=Object.assign({},rc),n.renderPermalinkImpl=e,n}function It(e){var n=[],t=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&t.unshift(["class",n.join(" ")]),t}var In=on(function(e,n,t,r,u){var o,a=[Object.assign(new r.Token("link_open","a",1),{attrs:It([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:kn}),new r.Token("link_close","a",-1)];if(n.space){var i=typeof n.space=="string"?n.space:" ";r.tokens[u+1].children[Le[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:i}))}(o=r.tokens[u+1].children)[Le[n.placement]].apply(o,a)});Object.assign(In.defaults,{space:!0,placement:"after",ariaHidden:!1});var ge=on(In.renderPermalinkImpl);ge.defaults=Object.assign({},In.defaults,{ariaHidden:!0});var mu=on(function(e,n,t,r,u){var o=[Object.assign(new r.Token("link_open","a",1),{attrs:It([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[u+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[u+1].children=o});Object.assign(mu.defaults,{safariReaderFix:!1});var pr=on(function(e,n,t,r,u){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var a=r.tokens[u+1].children.filter(function(l){return l.type==="text"||l.type==="code_inline"}).reduce(function(l,h){return l+h.content},""),i=[],c=[];if(n.class&&c.push(["class",n.class]),c.push(["href",n.renderHref(e,r)]),c.push.apply(c,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(i.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(a)}),new r.Token("span_close","span",-1)),n.space){var s=typeof n.space=="string"?n.space:" ";i[Le[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:s}))}i[Le[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:kn}),new r.Token("span_close","span",-1))}else i.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:kn}));n.style==="aria-label"?c.push(["aria-label",n.assistiveText(a)]):["aria-describedby","aria-labelledby"].includes(n.style)&&c.push([n.style,e]);var d=[Object.assign(new r.Token("link_open","a",1),{attrs:It(c)})].concat(i,[new r.Token("link_close","a",-1)]);(o=r.tokens).splice.apply(o,[u+3,0].concat(d)),n.wrapper&&(r.tokens.splice(u,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(u+3+d.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function br(e,n,t,r){var u=e,o=r;if(t&&Object.prototype.hasOwnProperty.call(n,u))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,u);)u=e+"-"+o,o+=1;return n[u]=!0,u}function Fe(e,n){n=Object.assign({},Fe.defaults,n),e.core.ruler.push("anchor",function(t){for(var r,u={},o=t.tokens,a=Array.isArray(n.level)?(r=n.level,function(l){return r.includes(l)}):(function(l){return function(h){return h>=l}})(n.level),i=0;i<o.length;i++){var c=o[i];if(c.type==="heading_open"&&a(Number(c.tag.substr(1)))){var s=n.getTokensText(o[i+1].children),d=c.attrGet("id");d=d==null?br(d=n.slugifyWithState?n.slugifyWithState(s,t):n.slugify(s),u,!1,n.uniqueSlugStartIndex):br(d,u,!0,n.uniqueSlugStartIndex),c.attrSet("id",d),n.tabIndex!==!1&&c.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(d,n,t,i):(n.permalink||n.renderPermalink&&n.renderPermalink!==dt)&&n.renderPermalink(d,n,t,i),i=o.indexOf(c),n.callback&&n.callback(c,{slug:d,title:s})}}})}Object.assign(pr.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),Fe.permalink={__proto__:null,legacy:dt,renderHref:pu,renderAttrs:bu,makePermalink:on,linkInsideHeader:In,ariaHidden:ge,headerLink:mu,linkAfterHeader:pr},Fe.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:dt,permalinkClass:ge.defaults.class,permalinkSpace:ge.defaults.space,permalinkSymbol:"¶",permalinkBefore:ge.defaults.placement==="before",permalinkHref:ge.defaults.renderHref,permalinkAttrs:ge.defaults.renderAttrs},Fe.default=Fe;function Mn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Kn,mr;function uc(){if(mr)return Kn;mr=1;function e(r,u){var o,a,i=r.attrs[r.attrIndex("href")][1];for(o=0;o<u.length;++o){if(a=u[o],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function n(r,u,o){Object.keys(o).forEach(function(a){var i,c=o[a];a==="className"&&(a="class"),i=u[r].attrIndex(a),i<0?u[r].attrPush([a,c]):u[r].attrs[i][1]=c})}function t(r,u){u?u=Array.isArray(u)?u:[u]:u=[],Object.freeze(u);var o=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(a,i,c,s,d){var l=e(a[i],u),h=l&&l.attrs;return h&&n(i,a,h),o(a,i,c,s,d)}}return t.defaultRender=function(r,u,o,a,i){return i.renderToken(r,u,o)},Kn=t,Kn}var oc=uc();const ic=Mn(oc);function ac(e,n,t,r){const u=Number(e[n].meta.id+1).toString();let o="";return typeof r.docId=="string"&&(o=`-${r.docId}-`),o+u}function cc(e,n){let t=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(t+=`:${e[n].meta.subId}`),`[${t}]`}function lc(e,n,t,r,u){const o=u.rules.footnote_anchor_name(e,n,t,r,u),a=u.rules.footnote_caption(e,n,t,r,u);let i=o;return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${i}">${a}</a></sup>`}function sc(e,n,t){return(t.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function dc(){return`</ol>
</section>
`}function fc(e,n,t,r,u){let o=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function hc(){return`</li>
`}function pc(e,n,t,r,u){let o=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function bc(e){const n=e.helpers.parseLinkLabel,t=e.utils.isSpace;e.renderer.rules.footnote_ref=lc,e.renderer.rules.footnote_block_open=sc,e.renderer.rules.footnote_block_close=dc,e.renderer.rules.footnote_open=fc,e.renderer.rules.footnote_close=hc,e.renderer.rules.footnote_anchor=pc,e.renderer.rules.footnote_caption=cc,e.renderer.rules.footnote_anchor_name=ac;function r(i,c,s,d){const l=i.bMarks[c]+i.tShift[c],h=i.eMarks[c];if(l+4>h||i.src.charCodeAt(l)!==91||i.src.charCodeAt(l+1)!==94)return!1;let f;for(f=l+2;f<h;f++){if(i.src.charCodeAt(f)===32)return!1;if(i.src.charCodeAt(f)===93)break}if(f===l+2||f+1>=h||i.src.charCodeAt(++f)!==58)return!1;if(d)return!0;f++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const p=i.src.slice(l+2,f-2);i.env.footnotes.refs[`:${p}`]=-1;const b=new i.Token("footnote_reference_open","",1);b.meta={label:p},b.level=i.level++,i.tokens.push(b);const m=i.bMarks[c],g=i.tShift[c],k=i.sCount[c],y=i.parentType,x=f,v=i.sCount[c]+f-(i.bMarks[c]+i.tShift[c]);let w=v;for(;f<h;){const F=i.src.charCodeAt(f);if(t(F))F===9?w+=4-w%4:w++;else break;f++}i.tShift[c]=f-x,i.sCount[c]=w-v,i.bMarks[c]=x,i.blkIndent+=4,i.parentType="footnote",i.sCount[c]<i.blkIndent&&(i.sCount[c]+=i.blkIndent),i.md.block.tokenize(i,c,s,!0),i.parentType=y,i.blkIndent-=4,i.tShift[c]=g,i.sCount[c]=k,i.bMarks[c]=m;const E=new i.Token("footnote_reference_close","",-1);return E.level=--i.level,i.tokens.push(E),!0}function u(i,c){const s=i.posMax,d=i.pos;if(d+2>=s||i.src.charCodeAt(d)!==94||i.src.charCodeAt(d+1)!==91)return!1;const l=d+2,h=n(i,d+1);if(h<0)return!1;if(!c){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const f=i.env.footnotes.list.length,p=[];i.md.inline.parse(i.src.slice(l,h),i.md,i.env,p);const b=i.push("footnote_ref","",0);b.meta={id:f},i.env.footnotes.list[f]={content:i.src.slice(l,h),tokens:p}}return i.pos=h+1,i.posMax=s,!0}function o(i,c){const s=i.posMax,d=i.pos;if(d+3>s||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(d)!==91||i.src.charCodeAt(d+1)!==94)return!1;let l;for(l=d+2;l<s;l++){if(i.src.charCodeAt(l)===32||i.src.charCodeAt(l)===10)return!1;if(i.src.charCodeAt(l)===93)break}if(l===d+2||l>=s)return!1;l++;const h=i.src.slice(d+2,l-1);if(typeof i.env.footnotes.refs[`:${h}`]>"u")return!1;if(!c){i.env.footnotes.list||(i.env.footnotes.list=[]);let f;i.env.footnotes.refs[`:${h}`]<0?(f=i.env.footnotes.list.length,i.env.footnotes.list[f]={label:h,count:0},i.env.footnotes.refs[`:${h}`]=f):f=i.env.footnotes.refs[`:${h}`];const p=i.env.footnotes.list[f].count;i.env.footnotes.list[f].count++;const b=i.push("footnote_ref","",0);b.meta={id:f,subId:p,label:h}}return i.pos=l,i.posMax=s,!0}function a(i){let c,s,d,l=!1;const h={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(p){return p.type==="footnote_reference_open"?(l=!0,s=[],d=p.meta.label,!1):p.type==="footnote_reference_close"?(l=!1,h[":"+d]=s,!1):(l&&s.push(p),!l)}),!i.env.footnotes.list))return;const f=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let p=0,b=f.length;p<b;p++){const m=new i.Token("footnote_open","",1);if(m.meta={id:p,label:f[p].label},i.tokens.push(m),f[p].tokens){c=[];const y=new i.Token("paragraph_open","p",1);y.block=!0,c.push(y);const x=new i.Token("inline","",0);x.children=f[p].tokens,x.content=f[p].content,c.push(x);const v=new i.Token("paragraph_close","p",-1);v.block=!0,c.push(v)}else f[p].label&&(c=h[`:${f[p].label}`]);c&&(i.tokens=i.tokens.concat(c));let g;i.tokens[i.tokens.length-1].type==="paragraph_close"?g=i.tokens.pop():g=null;const k=f[p].count>0?f[p].count:1;for(let y=0;y<k;y++){const x=new i.Token("footnote_anchor","",0);x.meta={id:p,subId:y,label:f[p].label},i.tokens.push(x)}g&&i.tokens.push(g),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",u),e.inline.ruler.after("footnote_inline","footnote_ref",o),e.core.ruler.after("inline","footnote_tail",a)}var Jn,gr;function mc(){if(gr)return Jn;gr=1;var e=!0,n=!1,t=!1;Jn=function(b,m){m&&(e=!m.enabled,n=!!m.label,t=!!m.labelAfter),b.core.ruler.after("inline","github-task-lists",function(g){for(var k=g.tokens,y=2;y<k.length;y++)o(k,y)&&(a(k[y],g.Token),r(k[y-2],"class","task-list-item"+(e?"":" enabled")),r(k[u(k,y-2)],"class","contains-task-list"))})};function r(b,m,g){var k=b.attrIndex(m),y=[m,g];k<0?b.attrPush(y):b.attrs[k]=y}function u(b,m){for(var g=b[m].level-1,k=m-1;k>=0;k--)if(b[k].level===g)return k;return-1}function o(b,m){return l(b[m])&&h(b[m-1])&&f(b[m-2])&&p(b[m])}function a(b,m){if(b.children.unshift(i(b,m)),b.children[1].content=b.children[1].content.slice(3),b.content=b.content.slice(3),n)if(t){b.children.pop();var g="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);b.children[0].content=b.children[0].content.slice(0,-1)+' id="'+g+'">',b.children.push(d(b.content,g,m))}else b.children.unshift(c(m)),b.children.push(s(m))}function i(b,m){var g=new m("html_inline","",0),k=e?' disabled="" ':"";return b.content.indexOf("[ ] ")===0?g.content='<input class="task-list-item-checkbox"'+k+'type="checkbox">':(b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0)&&(g.content='<input class="task-list-item-checkbox" checked=""'+k+'type="checkbox">'),g}function c(b){var m=new b("html_inline","",0);return m.content="<label>",m}function s(b){var m=new b("html_inline","",0);return m.content="</label>",m}function d(b,m,g){var k=new g("html_inline","",0);return k.content='<label class="task-list-item-label" for="'+m+'">'+b+"</label>",k.attrs=[{for:m}],k}function l(b){return b.type==="inline"}function h(b){return b.type==="paragraph_open"}function f(b){return b.type==="list_item_open"}function p(b){return b.content.indexOf("[ ] ")===0||b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0}return Jn}var gc=mc();const kc=Mn(gc),yc={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},xc=(e,n={})=>{const{markers:t=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=yc,matchCaseSensitive:u=!1,titles:o={},classPrefix:a="markdown-alert"}=n,i=t==="*"?"\\w+":t.join("|"),c=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,u?"":"i");e.core.ruler.after("block","github-alerts",s=>{const d=s.tokens;for(let l=0;l<d.length;l++)if(d[l].type==="blockquote_open"){const h=d[l],f=l;for(;d[l]?.type!=="blockquote_close"&&l<=d.length;)l+=1;const p=d[l],b=l,m=d.slice(f,b+1).find(v=>v.type==="inline");if(!m)continue;const g=m.content.match(c);if(!g)continue;const k=g[1].toLowerCase(),y=g[2].trim()||(o[k]??vc(k)),x=r[k]??"";m.content=m.content.slice(g[0].length).trimStart(),h.type="alert_open",h.tag="div",h.meta={title:y,type:k,icon:x},p.type="alert_close",p.tag="div"}}),e.renderer.rules.alert_open=function(s,d){const{title:l,type:h,icon:f}=s[d].meta;return`<div class="${a} ${a}-${h}"><p class="${a}-title">${f}${l}</p>`}};function vc(e){return e.charAt(0).toUpperCase()+e.slice(1)}var S=Symbol("NOT_RESOLVED"),Mt=Symbol("MERGE_KEY");function O(e,n){return{tagName:e,nodeKind:"scalar",implicit:n.implicit??!1,matchByTagPrefix:n.matchByTagPrefix??!1,implicitFirstChars:n.implicitFirstChars??null,resolve:n.resolve,identify:n.identify??null,represent:n.represent??(t=>String(t)),representTagName:n.representTagName??null}}function Nt(e,n){const t=n.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addItem:n.addItem,finalize:n.finalize??(r=>r),carrierIsResult:t,identify:n.identify??null,represent:n.represent??(r=>r),representTagName:n.representTagName??null}}function Nn(e,n){const t=n.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addPair:n.addPair,has:n.has,keys:n.keys,get:n.get,finalize:n.finalize??(r=>r),carrierIsResult:t,identify:n.identify??null,represent:n.represent??(r=>r),representTagName:n.representTagName??null}}var wc=O("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),Cc=["","~","null","Null","NULL"],_c=O("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>Cc.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),Ec=O("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,n)=>e==="null"||n&&e===""?null:S,identify:e=>e===null,represent:()=>"null"}),Ac=["","~","null","Null","NULL"],Sc=O("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>Ac.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),Fc=["true","True","TRUE"],Dc=["false","False","FALSE"],Tc=O("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>Fc.indexOf(e)!==-1?!0:Dc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Ic=["true"],Mc=["false"],Nc=O("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>Ic.indexOf(e)!==-1?!0:Mc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Rc=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],Lc=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],zc=O("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>Rc.indexOf(e)!==-1?!0:Lc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Pc=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Oc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function $c(e){let n=e,t=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b")?t*parseInt(n.slice(2),2):n.startsWith("0o")?t*parseInt(n.slice(2),8):n.startsWith("0x")?t*parseInt(n.slice(2),16):t*parseInt(n,10)}function Bc(e,n){if(n){if(!Oc.test(e))return S}else if(!Pc.test(e))return S;const t=$c(e);return Number.isFinite(t)?t:S}var gu=O("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Bc,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),qc=new RegExp("^-?(?:0|[1-9][0-9]*)$"),jc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Hc(e){let n=e,t=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b")?t*parseInt(n.slice(2),2):n.startsWith("0o")?t*parseInt(n.slice(2),8):n.startsWith("0x")?t*parseInt(n.slice(2),16):t*parseInt(n,10)}function Uc(e,n){if(n){if(!jc.test(e))return S}else if(!qc.test(e))return S;const t=Hc(e);return Number.isFinite(t)?t:S}var Gc=O("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Uc,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Vc=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Zc(e){let n=e.replace(/_/g,""),t=1;if((n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b"))return t*parseInt(n.slice(2),2);if(n.startsWith("0x"))return t*parseInt(n.slice(2),16);if(n.includes(":")){let r=0;for(const u of n.split(":"))r=r*60+Number(u);return t*r}return n!=="0"&&n[0]==="0"?t*parseInt(n,8):t*parseInt(n,10)}function Wc(e){if(!Vc.test(e))return S;const n=Zc(e);return Number.isFinite(n)?n:S}var ft=O("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Wc,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Yc=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Kc=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Jc(e){if(!Yc.test(e))return S;let n=e.toLowerCase();const t=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;const r=t*parseFloat(n);return Number.isFinite(r)||Kc.test(e)?r:S}function Xc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var ku=O("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Jc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Xc}),Qc=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),e0=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function n0(e,n){if(n){if(!e0.test(e))return S;let r=e.toLowerCase();const u=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return u===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;const o=u*parseFloat(r);return Number.isFinite(o)?o:S}if(!Qc.test(e))return S;const t=Number(e);return Number.isFinite(t)?t:S}function t0(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var r0=O("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:n0,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:t0}),u0=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),o0=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i0(e){if(!u0.test(e))return S;let n=e.toLowerCase().replace(/_/g,"");const t=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let r=0;if(n.includes(":")){for(const u of n.split(":"))r=r*60+Number(u);r*=t}else r=t*parseFloat(n);return Number.isFinite(r)||o0.test(e)?r:S}function a0(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var ht=O("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:i0,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:a0}),c0=O("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,n)=>e==="<<"||n&&e===""?Mt:S}),l0=/^[A-Za-z0-9+/]*={0,2}$/;function s0(e){const n=e.replace(/\s/g,"");if(n.length%4!==0||!l0.test(n))return S;const t=atob(n),r=new Uint8Array(t.length);for(let u=0;u<t.length;u++)r[u]=t.charCodeAt(u);return r}function d0(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}var f0=O("tag:yaml.org,2002:binary",{resolve:s0,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:d0}),h0=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),p0=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function b0(e){let n=h0.exec(e);if(n===null&&(n=p0.exec(e)),n===null)return S;const t=+n[1],r=+n[2]-1,u=+n[3];if(!n[4]){const d=new Date(Date.UTC(t,r,u));return d.getUTCFullYear()!==t||d.getUTCMonth()!==r||d.getUTCDate()!==u?S:d}const o=+n[4],a=+n[5],i=+n[6];let c=0;if(o>23||a>59||i>59)return S;if(n[7]){let d=n[7].slice(0,3);for(;d.length<3;)d+="0";c=+d}const s=new Date(Date.UTC(t,r,u,o,a,i,c));if(s.getUTCFullYear()!==t||s.getUTCMonth()!==r||s.getUTCDate()!==u)return S;if(n[9]){const d=+n[10],l=+(n[11]||0);if(d>23||l>59)return S;const h=(d*60+l)*6e4;s.setTime(s.getTime()-(n[9]==="-"?-h:h))}return s}var m0=O("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:b0,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),g0=Nt("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,n)=>{e.push(n)},identify:Array.isArray});function Rn(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const n=Object.getPrototypeOf(e);return n===null||n===Object.prototype}function kr(e,n){const t={};for(const r of n)e[r]!==void 0&&(t[r]=e[r]);return t}var k0=Nt("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,n)=>{let t;if(n instanceof Map){if(n.size!==1)return"cannot resolve an ordered map item";t=n.keys().next().value}else if(Rn(n)){const r=Object.keys(n);if(r.length!==1)return"cannot resolve an ordered map item";t=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(t)?"duplicate key in ordered map":(e.seen.add(t),e.list.push(n),"")},finalize:e=>e.list}),y0=Nt("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,n)=>{if(n instanceof Map)return n.size!==1?"cannot resolve a pairs item":(e.push(n.entries().next().value),"");if(Object.prototype.toString.call(n)!=="[object Object]")return"cannot resolve a pairs item";const t=n,r=Object.keys(t);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],t[r[0]]]),"")}}),x0=Nn("tag:yaml.org,2002:map",{create:()=>({}),identify:Rn,represent:e=>{const n=new Map;for(const t of Object.keys(e))n.set(t,e[t]);return n},addPair:(e,n,t)=>{if(n!==null&&typeof n=="object")return"object-based map does not support complex keys";const r=String(n);return r==="__proto__"?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,""},has:(e,n)=>n!==null&&typeof n=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(n)),keys:e=>Object.keys(e),get:(e,n)=>e[String(n)]}),v0=Nn("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{const n=new Map;for(const t of e)n.set(t,null);return n},addPair:(e,n,t)=>t!==null?"cannot resolve a set item":(e.add(n),""),has:(e,n)=>e.has(n),keys:e=>e.keys(),get:()=>null});function w0(){return{scalar:{},sequence:{},mapping:{}}}function C0(){return{scalar:[],sequence:[],mapping:[]}}function _0(e){const n=[];for(const t of e){let r=n.length;for(let u=0;u<n.length;u++){const o=n[u];if(o.nodeKind===t.nodeKind&&o.tagName===t.tagName&&o.matchByTagPrefix===t.matchByTagPrefix){r=u;break}}n[r]=t}return n}var Ln=class yu{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(n){const t=_0(n),r=[],u=w0(),o=C0();for(const d of t){if(d.nodeKind==="scalar"&&d.implicit){if(d.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(d)}switch(d.nodeKind){case"scalar":d.matchByTagPrefix?o.scalar.push(d):u.scalar[d.tagName]=d;break;case"sequence":d.matchByTagPrefix?o.sequence.push(d):u.sequence[d.tagName]=d;break;case"mapping":d.matchByTagPrefix?o.mapping.push(d):u.mapping[d.tagName]=d;break}}const a=r.filter(d=>d.implicitFirstChars===null),i=new Set;for(const d of r)if(d.implicitFirstChars!==null)for(const l of d.implicitFirstChars)i.add(l);const c=new Map;for(const d of i)c.set(d,r.filter(l=>l.implicitFirstChars===null||l.implicitFirstChars.indexOf(d)!==-1));const s=u.scalar["tag:yaml.org,2002:str"];if(!s)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=t,this.implicitScalarTags=r,this.implicitScalarByFirstChar=c,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=s,this.defaultSequenceTag=u.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=u.mapping["tag:yaml.org,2002:map"],this.exact=u,this.prefix=o}withTags(...n){let t=[];for(const r of n)t=t.concat(r);return new yu([...this.tags,...t])}},Rt=new Ln([wc,g0,x0]);new Ln([...Rt.tags,Ec,Nc,Gc,r0]);var xu=new Ln([...Rt.tags,_c,Tc,gu,ku]),E0=new Ln([...Rt.tags,Sc,zc,ft,ht,m0,c0,f0,k0,y0,v0]);Nn("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,n,t)=>(e.set(n,t),""),has:(e,n)=>e.has(n),keys:e=>e.keys(),get:(e,n)=>e.get(n),identify:e=>e instanceof Map||Rn(e),represent:e=>{if(e instanceof Map)return e;const n=new Map,t=e;for(const r of Object.keys(t))n.set(r,t[r]);return n}});function yr(e){if(Array.isArray(e)){const n=Array.prototype.slice.call(e);for(let t=0;t<n.length;t++){if(Array.isArray(n[t]))return null;typeof n[t]=="object"&&Object.prototype.toString.call(n[t])==="[object Object]"&&(n[t]="[object Object]")}return String(n)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}Nn("tag:yaml.org,2002:map",{create:()=>({}),identify:Rn,represent:e=>{const n=new Map;for(const t of Object.keys(e))n.set(t,e[t]);return n},addPair:(e,n,t)=>{const r=yr(n);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,"")},has:(e,n)=>{const t=yr(n);return t!==null&&Object.prototype.hasOwnProperty.call(e,t)},keys:e=>Object.keys(e),get:(e,n)=>e[String(n)]});var A0={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Xn(e,n,t,r,u){let o="",a="";const i=Math.floor(u/2)-1;return r-n>i&&(o=" ... ",n=r-i+o.length),t-r>i&&(a=" ...",t=r+i-a.length),{str:o+e.slice(n,t).replace(/\t/g,"→")+a,pos:r-n+o.length}}function Qn(e,n){return" ".repeat(Math.max(n-e.length,0))+e}function S0(e,n){if(!e.buffer)return null;const t={...A0,...n},r=/\r?\n|\r|\0/g,u=[0],o=[];let a,i=-1;for(;a=r.exec(e.buffer);)o.push(a.index),u.push(a.index+a[0].length),e.position<=a.index&&i<0&&(i=u.length-2);i<0&&(i=u.length-1);let c="";const s=Math.min(e.line+t.linesAfter,o.length).toString().length,d=t.maxLength-(t.indent+s+3);for(let h=1;h<=t.linesBefore&&!(i-h<0);h++){const f=Xn(e.buffer,u[i-h],o[i-h],e.position-(u[i]-u[i-h]),d);c=`${" ".repeat(t.indent)}${Qn((e.line-h+1).toString(),s)} | ${f.str}
${c}`}const l=Xn(e.buffer,u[i],o[i],e.position,d);c+=`${" ".repeat(t.indent)}${Qn((e.line+1).toString(),s)} | ${l.str}
`,c+=`${"-".repeat(t.indent+s+3+l.pos)}^
`;for(let h=1;h<=t.linesAfter&&!(i+h>=o.length);h++){const f=Xn(e.buffer,u[i+h],o[i+h],e.position-(u[i]-u[i+h]),d);c+=`${" ".repeat(t.indent)}${Qn((e.line+h+1).toString(),s)} | ${f.str}
`}return c.replace(/\n$/,"")}function xr(e,n){let t="";return e.mark?(e.mark.name&&(t+=`in "${e.mark.name}" `),t+=`(${e.mark.line+1}:${e.mark.column+1})`,!n&&e.mark.snippet&&(t+=`

${e.mark.snippet}`),`${e.reason} ${t}`):e.reason}var yn=class extends Error{reason;mark;constructor(e,n){super(),this.name="YAMLException",this.reason=e,this.mark=n,this.message=xr(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${xr(this,e)}`}};function zn(e,n,t,r=""){let u=0,o=0;for(let i=0;i<n;i++){const c=e.charCodeAt(i);c===10?(u++,o=i+1):c===13&&(u++,e.charCodeAt(i+1)===10&&i++,o=i+1)}const a={name:r,buffer:e,position:n,line:u,column:n-o};throw a.snippet=S0(a),new yn(t,a)}var F0=-1;function vr(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var vu=new Array(256),wu=new Array(256);for(let e=0;e<256;e++)vu[e]=vr(e)?1:0,wu[e]=vr(e);function D0(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function T0(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function I0(e){return e===120?2:e===117?4:8}function xn(e,n,t){let r=0;for(;n<t;){const u=e.charCodeAt(n);if(u===10)r++,n++;else if(u===13)r++,n++,e.charCodeAt(n)===10&&n++;else if(u===32||u===9)n++;else break}return{position:n,breaks:r}}function Lt(e){return e===1?" ":`
`.repeat(e-1)}function M0(e,n,t){let r="",u=n,o=n,a=n;for(;u<t;){const i=e.charCodeAt(u);if(i===10||i===13){r+=e.slice(o,a);const c=xn(e,u,t);r+=Lt(c.breaks),u=o=a=c.position}else u++,i!==32&&i!==9&&(a=u)}return r+e.slice(o,a)}function N0(e,n,t){let r="",u=n,o=n,a=n;for(;u<t;){const i=e.charCodeAt(u);if(i===39)r+=e.slice(o,u)+"'",u+=2,o=a=u;else if(i===10||i===13){r+=e.slice(o,a);const c=xn(e,u,t);r+=Lt(c.breaks),u=o=a=c.position}else u++,i!==32&&i!==9&&(a=u)}return r+e.slice(o,t)}function R0(e,n,t){let r="",u=n,o=n,a=n;for(;u<t;){const i=e.charCodeAt(u);if(i===92){r+=e.slice(o,u),u++;const c=e.charCodeAt(u);if(c===10||c===13)u=xn(e,u,t).position;else if(c<256&&vu[c])r+=wu[c],u++;else{let s=I0(c),d=0;for(;s>0;s--){u++;const l=T0(e.charCodeAt(u));d=(d<<4)+l}r+=D0(d),u++}o=a=u}else if(i===10||i===13){r+=e.slice(o,a);const c=xn(e,u,t);r+=Lt(c.breaks),u=o=a=c.position}else u++,i!==32&&i!==9&&(a=u)}return r+e.slice(o,t)}function wr(e,n,t,r,u,o){const a=r<0?0:r,i=e.slice(n,t).replace(/\r\n?/g,`
`),c=i===""?[]:(i.endsWith(`
`)?i.slice(0,-1):i).split(`
`);let s="",d=!1,l=0,h=!1;for(const f of c){let p=0;for(;p<a&&f.charCodeAt(p)===32;)p++;if(r<0||p>=f.length){l++;continue}const b=f.slice(a),m=b.charCodeAt(0);o?m===32||m===9?(h=!0,s+=`
`.repeat(d?1+l:l)):h?(h=!1,s+=`
`.repeat(l+1)):l===0?d&&(s+=" "):s+=`
`.repeat(l):s+=`
`.repeat(d?1+l:l),s+=b,d=!0,l=0}return u===3?s+=`
`.repeat(d?1+l:l):u!==2&&d&&(s+=`
`),s}function L0(e,n){if(n.valueStart===F0)return"";const{valueStart:t,valueEnd:r}=n;if(n.fast)return e.slice(t,r);switch(n.style){case 2:return N0(e,t,r);case 3:return R0(e,t,r);case 4:return wr(e,t,r,n.indent,n.chomping,!1);case 5:return wr(e,t,r,n.indent,n.chomping,!0);default:return M0(e,t,r)}}var z0={"!":"!","!!":"tag:yaml.org,2002:"};function Cu(e,n){if(e.startsWith("!<")&&e.endsWith(">"))return decodeURIComponent(e.slice(2,-1));const t=e.indexOf("!",1),r=t===-1?"!":e.slice(0,t+1),u=n?.[r]??z0[r]??r;return decodeURIComponent(u)+decodeURIComponent(e.slice(r.length))}var Ie=-1,zt={filename:"",schema:xu,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function P0(e){return"tagStart"in e&&e.tagStart!==Ie?e.tagStart:"anchorStart"in e&&e.anchorStart!==Ie?e.anchorStart:"valueStart"in e&&e.valueStart!==Ie?e.valueStart:"start"in e?e.start:0}function q(e,n){zn(e.source,e.position,n,e.filename)}function _u(e,n,t,r){try{return t.finalize(r)}catch(u){if(u instanceof yn)throw u;zn(e.source,n,u instanceof Error?u.message:String(u),e.filename)}}function hn(e,n,t){const r=e[t];if(r)return r;for(const u of n)if(t.startsWith(u.tagName))return u}function O0(e,n,t,r,u){const o=hn(n,t,r);if(o)return o;q(e,`unknown ${u} tag !<${r}>`)}function $0(e,n){const t=L0(e.source,n),r=n.tagStart===Ie?"":e.source.slice(n.tagStart,n.tagEnd),u=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:t,tag:u};const o=Cu(r,e.tagHandlers),a=hn(e.schema.exact.scalar,e.schema.prefix.scalar,o);if(a){const c=a.resolve(t,!0,o);return c===S&&q(e,`cannot resolve a node with !<${o}> explicit tag`),{value:c,tag:a}}const i=hn(e.schema.exact.mapping,e.schema.prefix.mapping,o)??hn(e.schema.exact.sequence,e.schema.prefix.sequence,o);if(i){t!==""&&q(e,`cannot resolve a node with !<${o}> explicit tag`);const c=i.create(o);return{value:i.carrierIsResult?c:_u(e,e.position,i,c),tag:i}}q(e,`unknown scalar tag !<${o}>`)}if(n.style===1){const o=e.schema.implicitScalarByFirstChar.get(t.charAt(0))??e.schema.implicitScalarAnyFirstChar;for(const a of o){const i=a.resolve(t,!1,a.tagName);if(i!==S)return{value:i,tag:a}}}return{value:u.resolve(t,!1,u.tagName),tag:u}}function Cr(e,n,t,r,u,o){const a=n.tagStart===Ie?"":e.source.slice(n.tagStart,n.tagEnd),i=a===""||a==="!"?u:Cu(a,e.tagHandlers);return{tagName:i,tag:O0(e,t,r,i,o)}}function Eu(e){return e.nodeKind==="mapping"}function _r(e,n,t,r){for(const u of r.keys(t)){if(e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&q(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`),n.tag.has(n.value,u))continue;const o=n.tag.addPair(n.value,u,r.get(t,u));o&&q(e,o),(n.overridable??=new Set).add(u)}}function B0(e,n,t,r){if(e.position=n.keyPosition,Eu(r))_r(e,n,t,r);else if(r.nodeKind==="sequence"&&Array.isArray(t))for(const u of t)_r(e,n,u,n.tag);else q(e,"cannot merge mappings; the provided source object is unacceptable")}function q0(e,n,t,r,u){if(e.position=n.keyPosition,t===Mt){B0(e,n,r,u);return}!e.json&&n.tag.has(n.value,t)&&!n.overridable?.has(t)&&q(e,"duplicated mapping key");const o=n.tag.addPair(n.value,t,r);o&&q(e,o),n.overridable?.delete(t)}function et(e,n,t){const r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=n,r.hasValue=!0;else if(r.kind==="sequence"){r.merge&&(Eu(t)||q(e,"cannot merge mappings; the provided source object is unacceptable"));const u=r.tag.addItem(r.value,n,r.index++);u&&q(e,u)}else if(r.hasKey){const u=r.key;r.key=void 0,r.hasKey=!1,q0(e,r,u,n,t)}else r.key=n,r.keyPosition=e.position,r.hasKey=!0}function nt(e,n,t,r,u){if(n.anchorStart!==Ie){const o={value:t,tag:r,isValueFinal:u};return e.anchors.set(e.source.slice(n.anchorStart,n.anchorEnd),o),o}return null}function j0(e,n){const t={...zt,...n,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;t.eventIndex<t.events.length;){const r=t.events[t.eventIndex++];switch(t.position=P0(r),r.type){case 1:t.anchors=new Map,t.aliasCount=0,t.tagHandlers=Object.create(null);for(const u of r.directives)u.kind==="tag"&&(t.tagHandlers[u.handle]=u.prefix);t.frames.push({kind:"document",position:t.position,value:void 0,hasValue:!1});break;case 4:{const{value:u,tag:o}=$0(t,r);nt(t,r,u,o,!0),et(t,u,o);break}case 2:{const u=Cr(t,r,t.schema.exact.sequence,t.schema.prefix.sequence,"tag:yaml.org,2002:seq","sequence"),o=u.tag.create(u.tagName),a=nt(t,r,o,u.tag,u.tag.carrierIsResult),i=t.frames[t.frames.length-1],c=i!==void 0&&i.kind==="mapping"&&i.hasKey&&i.key===Mt;t.frames.push({kind:"sequence",position:t.position,value:o,tag:u.tag,anchor:a,index:0,merge:c});break}case 3:{const u=Cr(t,r,t.schema.exact.mapping,t.schema.prefix.mapping,"tag:yaml.org,2002:map","mapping"),o=u.tag.create(u.tagName),a=nt(t,r,o,u.tag,u.tag.carrierIsResult);t.frames.push({kind:"mapping",position:t.position,value:o,tag:u.tag,anchor:a,key:void 0,keyPosition:t.position,hasKey:!1,overridable:null});break}case 5:{t.maxAliases!==-1&&++t.aliasCount>t.maxAliases&&q(t,`aliases exceeded maxAliases (${t.maxAliases})`);const u=t.source.slice(r.anchorStart,r.anchorEnd),o=t.anchors.get(u);o||q(t,`unidentified alias "${u}"`),o.isValueFinal||q(t,`recursive alias "${u}" is not supported for tag ${o.tag.tagName} because it uses finalize()`),et(t,o.value,o.tag);break}case 6:{const u=t.frames.pop();if(u.kind==="document")t.documents.push(u.value);else{const o=u.tag.carrierIsResult?u.value:_u(t,u.position,u.tag,u.value);u.anchor&&(u.anchor.value=o,u.anchor.isValueFinal=!0),et(t,o,u.tag)}break}}}return t.documents}var A=-1,Au=Object.prototype.hasOwnProperty,ce=1,pt=2,Su=3,vn=4,H0=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,U0=/[,\[\]{}]/,Fu=/^(?:!|!!|![0-9A-Za-z-]+!)$/,bt=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Du=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,G0=new RegExp(`^(?:${bt})*$`),V0=new RegExp(`^(?:${Du})+$`),Z0=new RegExp(`^(?:!(?:${bt})*|${Du}(?:${bt})*)$`),Pt={filename:"",maxDepth:100};function W0(e,n,t){e.events.push({type:1,explicitStart:n,explicitEnd:t,directives:e.directives})}function Tu(e,n,t,r,u,o,a){e.events.push({type:2,start:n,anchorStart:t,anchorEnd:r,tagStart:u,tagEnd:o,style:a})}function Ue(e,n,t,r,u,o,a){e.events.push({type:3,start:n,anchorStart:t,anchorEnd:r,tagStart:u,tagEnd:o,style:a})}function $e(e,n,t,r,u,o,a,i,c=1,s=-1,d=!1){e.events.push({type:4,valueStart:n,valueEnd:t,anchorStart:r,anchorEnd:u,tagStart:o,tagEnd:a,style:i,chomping:c,indent:s,fast:d})}function Y0(e,n,t){e.events.push({type:5,anchorStart:n,anchorEnd:t})}function Me(e){e.events.push({type:6})}function B(e){$e(e,A,A,A,A,A,A,1)}function Er(){return{anchorStart:A,anchorEnd:A,tagStart:A,tagEnd:A}}function Ge(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function se(e,n){e.position=n.position,e.line=n.line,e.lineStart=n.lineStart,e.lineIndent=n.lineIndent,e.firstTabInLine=n.firstTabInLine,e.events.length=n.eventsLength}function C(e,n){zn(e.input.slice(0,e.length),e.position,n,e.filename)}function N(e){return e===10||e===13}function xe(e){return e===9||e===32}function Y(e){return xe(e)||N(e)}function re(e){return e===0||Y(e)}function ve(e){return e===44||e===91||e===93||e===123||e===125}function K0(e){return e>=48&&e<=57?e-48:-1}function J0(e){if(e>=48&&e<=57)return e-48;const n=e|32;return n>=97&&n<=102?n-97+10:-1}function X0(e){return e===120?2:e===117?4:e===85?8:0}function Q0(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function wn(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function $(e,n){let t=0,r=e.input.charCodeAt(e.position),u=e.position===e.lineStart||Y(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;xe(r);)u=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(n&&u&&r===35)do r=e.input.charCodeAt(++e.position);while(!N(r)&&r!==0);if(!N(r))break;for(wn(e),t++,u=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return t}function de(e,n=e.position){const t=e.input.charCodeAt(n);if((t===45||t===46)&&t===e.input.charCodeAt(n+1)&&t===e.input.charCodeAt(n+2)){const r=e.input.charCodeAt(n+3);return r===0||Y(r)}return!1}function Ar(e){let n=e.input.charCodeAt(e.position);for(;n!==0&&!N(n);)n=e.input.charCodeAt(++e.position)}function Iu(e,n,t){H0.test(e.input.slice(n,t))&&C(e,"the stream contains non-printable characters")}function el(e,n,t){if(e.input.charCodeAt(e.position)!==33)return!1;n.tagStart!==A&&C(e,"duplication of a tag property");const r=e.position;let u=!1,o=!1,a="!",i=e.input.charCodeAt(++e.position);i===60?(u=!0,i=e.input.charCodeAt(++e.position)):i===33&&(o=!0,a="!!",i=e.input.charCodeAt(++e.position));let c=e.position,s;if(u){for(;i!==0&&i!==62;)i=e.input.charCodeAt(++e.position);i!==62&&C(e,"unexpected end of the stream within a verbatim tag"),s=e.input.slice(c,e.position),e.position++}else{for(;i!==0&&!Y(i)&&!(t&&ve(i));)i===33&&(o?C(e,"tag suffix cannot contain exclamation marks"):(a=e.input.slice(c-1,e.position+1),Fu.test(a)||C(e,"named tag handle cannot contain such characters"),o=!0,c=e.position+1)),i=e.input.charCodeAt(++e.position);s=e.input.slice(c,e.position),U0.test(s)&&C(e,"tag suffix cannot contain flow indicator characters")}return s&&!(u?G0.test(s):V0.test(s))&&C(e,`tag name cannot contain such characters: ${s}`),!u&&a!=="!"&&a!=="!!"&&!Au.call(e.tagHandlers,a)&&C(e,`undeclared tag handle "${a}"`),n.tagStart=r,n.tagEnd=e.position,!0}function nl(e,n){if(e.input.charCodeAt(e.position)!==38)return!1;n.anchorStart!==A&&C(e,"duplication of an anchor property"),e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Y(e.input.charCodeAt(e.position))&&!ve(e.input.charCodeAt(e.position));)e.position++;return e.position===t&&C(e,"name of an anchor node must contain at least one character"),n.anchorStart=t,n.anchorEnd=e.position,!0}function tl(e,n){if(e.input.charCodeAt(e.position)!==42)return!1;(n.anchorStart!==A||n.tagStart!==A)&&C(e,"alias node should not have any properties"),e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Y(e.input.charCodeAt(e.position))&&!ve(e.input.charCodeAt(e.position));)e.position++;return e.position===t&&C(e,"name of an alias node must contain at least one character"),Y0(e,t,e.position),!0}function mt(e,n){$(e,!1),e.lineIndent<n&&C(e,"deficient indentation")}function rl(e,n,t){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;const r=e.position;let u=!0;for(;e.input.charCodeAt(e.position)!==0;){const o=e.input.charCodeAt(e.position);if(o===39){if(e.input.charCodeAt(e.position+1)===39){u=!1,e.position+=2;continue}const a=e.position;return e.position++,$e(e,r,a,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,2,1,-1,u),!0}N(o)?(u=!1,mt(e,n)):e.position===e.lineStart&&de(e)?C(e,"unexpected end of the document within a single quoted scalar"):o!==9&&o<32?C(e,"expected valid JSON character"):e.position++}C(e,"unexpected end of the stream within a single quoted scalar")}function ul(e,n,t){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;const r=e.position;let u=!0;for(;e.input.charCodeAt(e.position)!==0;){const o=e.input.charCodeAt(e.position);if(o===34){const a=e.position;return e.position++,$e(e,r,a,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,3,1,-1,u),!0}if(o===92){u=!1;const a=e.input.charCodeAt(++e.position);if(N(a))mt(e,n);else if(Q0(a))e.position++;else{let i=X0(a);for(i===0&&C(e,"unknown escape sequence");i-- >0;)e.position++,J0(e.input.charCodeAt(e.position))<0&&C(e,"expected hexadecimal character");e.position++}}else N(o)?(u=!1,mt(e,n)):e.position===e.lineStart&&de(e)?C(e,"unexpected end of the document within a double quoted scalar"):o!==9&&o<32?C(e,"expected valid JSON character"):e.position++}C(e,"unexpected end of the stream within a double quoted scalar")}function ol(e,n,t){const r=e.input.charCodeAt(e.position);let u=1,o=-1,a=!1;if(r!==124&&r!==62)return!1;const i=r===124?4:5;for(e.position++;e.input.charCodeAt(e.position)!==0;){const f=e.input.charCodeAt(e.position),p=K0(f);if(f===43||f===45)u!==1&&C(e,"repeat of a chomping mode identifier"),u=f===43?3:2,e.position++;else if(p>=0)p===0&&C(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),a&&C(e,"repeat of an indentation width identifier"),o=n+p-1,a=!0,e.position++;else break}let c=!1;for(;xe(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&Ar(e),N(e.input.charCodeAt(e.position))?wn(e):e.input.charCodeAt(e.position)!==0&&C(e,"a line break is expected");let s=a?o:-1,d=0;const l=e.position;let h=e.position;for(;e.input.charCodeAt(e.position)!==0;){const f=e.position;let p=0;for(;e.input.charCodeAt(f+p)===32;)p++;const b=e.input.charCodeAt(f+p);if(b===0){s>=0?p>s&&(h=f+p):p>0&&(h=f+p);break}if(f===e.lineStart&&de(e,f))break;if(!a&&s===-1&&N(b)&&(d=Math.max(d,p)),!a&&s===-1&&!N(b)&&(b===9&&p<n&&(e.position=f+p,C(e,"tab characters must not be used in indentation")),p<d&&(e.position=f+p,C(e,"bad indentation of a mapping entry"))),s===-1&&b!==0&&!N(b)&&p<n){e.lineIndent=p,e.position=f+p;break}!a&&b!==0&&!N(b)&&s===-1&&(s=p);const m=s===-1?n+1:s;if(b!==0&&!N(b)&&p<m){e.lineIndent=p,e.position=f+p;break}Ar(e),h=e.position,N(e.input.charCodeAt(e.position))&&(wn(e),h=e.position)}return Iu(e,l,h),$e(e,l,h,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,i,u,s),!0}function il(e,n){const t=e.input.charCodeAt(e.position),r=n===ce;if(t===0||Y(t)||t===35||t===38||t===42||t===33||t===124||t===62||t===39||t===34||t===37||t===64||t===96||r&&ve(t))return!1;if(t===63||t===45){const u=e.input.charCodeAt(e.position+1);if(re(u)||r&&ve(u))return!1}return!0}function al(e,n,t,r){if(!il(e,t))return!1;const u=e.position;let o=e.position,a=e.input.charCodeAt(e.position);const i=t===ce;let c=!1;for(;a!==0&&!(e.position===e.lineStart&&de(e));){if(a===58){const s=e.input.charCodeAt(e.position+1);if(re(s)||i&&ve(s))break}else if(a===35){if(Y(e.input.charCodeAt(e.position-1)))break}else{if(i&&ve(a))break;if(N(a)){const s=e.position,d=e.line,l=e.lineStart,h=e.lineIndent;if($(e,!1),e.lineIndent>=n){c=!0,a=e.input.charCodeAt(e.position);continue}e.position=s,e.line=d,e.lineStart=l,e.lineIndent=h;break}}xe(a)||(o=e.position+1),a=e.input.charCodeAt(++e.position)}return o===u?!1:(Iu(e,u,o),$e(e,u,o,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1,1,-1,!c),!0)}function be(e,n){const t=e.line;$(e,!0),(e.line>t&&e.lineIndent<n||e.firstTabInLine!==-1&&e.lineIndent<n)&&C(e,"deficient indentation")}function cl(e,n,t){const r=e.input.charCodeAt(e.position),u=r===123,o=e.position;let a=!0;if(r!==91&&r!==123)return!1;const i=u?125:93;for(u?Ue(e,o,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,2):Tu(e,o,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,2),e.position++;e.input.charCodeAt(e.position)!==0;){be(e,n);let c=e.input.charCodeAt(e.position);if(c===i)return e.position++,Me(e),!0;a?c===44&&C(e,"expected the node content, but found ','"):C(e,"missed comma between flow collection entries");let s=!1,d=!1;c===63&&Y(e.input.charCodeAt(e.position+1))&&(s=d=!0,e.position+=1,be(e,n));const l=e.line,h=Ge(e),f=ue(e,n,ce,!1,!0);be(e,n),c=e.input.charCodeAt(e.position),(u||d||e.line===l)&&c===58?(s=!0,e.position++,be(e,n),u?f||B(e):(se(e,h),Ue(e,h.position,A,A,A,A,2),ue(e,n,ce,!1,!0)||B(e),be(e,n),e.position++,be(e,n)),ue(e,n,ce,!1,!0)||B(e),be(e,n),u||Me(e)):u&&s?(f||B(e),B(e)):u?B(e):s&&(se(e,h),Ue(e,h.position,A,A,A,A,2),ue(e,n,ce,!1,!0),B(e),Me(e)),c=e.input.charCodeAt(e.position),c===44?(a=!0,e.position++):a=!1}C(e,"unexpected end of the stream within a flow collection")}function Sr(e,n,t){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!re(e.input.charCodeAt(e.position+1)))return!1;for(Tu(e,e.position,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,1);e.input.charCodeAt(e.position)===45&&re(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,C(e,"tab characters must not be used in indentation"));const r=e.line;e.position++;const u=$(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&re(e.input.charCodeAt(e.position+1))&&C(e,"bad indentation of a sequence entry"),u&&e.lineIndent<=n?B(e):ue(e,n,Su,!1,!0),$(e,!0),e.lineIndent<n||e.position>=e.length)break;e.lineIndent>n&&C(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&re(e.input.charCodeAt(e.position+1))&&C(e,"bad indentation of a sequence entry")}return Me(e),!0}function tt(e,n,t,r){let u=!1,o=!1,a=!1,i=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!u&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,C(e,"tab characters must not be used in indentation"));const s=e.input.charCodeAt(e.position+1),d=e.line;if((c===63||c===58)&&re(s))a||(Ue(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0),c===63?(u&&B(e),o=!0,u=!0):(u||(B(e),o=!0),u=!1),e.position+=1,i=!0;else{u&&(B(e),u=!1);const l=Ge(e);if(!ue(e,t,pt,!1,!0))break;if(e.line===d){for(c=e.input.charCodeAt(e.position);xe(c);)c=e.input.charCodeAt(++e.position);if(c===58){if(c=e.input.charCodeAt(++e.position),re(c)||C(e,"a whitespace character is expected after the key-value separator within a block mapping"),!a){for(se(e,l),Ue(e,l.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,1),a=!0,ue(e,t,pt,!1,!0),c=e.input.charCodeAt(e.position);xe(c);)c=e.input.charCodeAt(++e.position);e.position++}o=!0,u=!1,i=!1}else if(o)C(e,"expected ':' after a mapping key");else return r.anchorStart!==A||r.tagStart!==A?(se(e,l),!1):!0}else if(o)C(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==A||r.tagStart!==A?(se(e,l),!1):!0}if(ue(e,n,vn,!0,i)&&(i=!1),u||i&&(B(e),i=!1),$(e,!0),c=e.input.charCodeAt(e.position),(e.line===d||e.lineIndent>n)&&c!==0)C(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return o?(u&&B(e),a&&Me(e),!0):!1}function ue(e,n,t,r,u,o=!0){e.depth>=e.maxDepth&&C(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let a=1,i=!1,c=!1,s=null;const d=Er();let l=t===vn||t===Su,h=l;const f=l;if(r&&$(e,!0)&&(i=!0,e.lineIndent>n?a=1:e.lineIndent===n?a=0:a=-1),e.position===e.lineStart&&de(e))return e.depth--,!1;if(a===1)for(;;){const p=e.input.charCodeAt(e.position),b=Ge(e);if(i&&a!==1&&(p===33||p===38))break;if(i&&f&&(d.tagStart!==A||d.anchorStart!==A)&&(p===33||p===38)){const m=Ge(e),g=n+1;if(tt(e,e.position-e.lineStart,g,d)&&e.events[m.eventsLength]?.type===3)return e.depth--,!0;se(e,m)}if(i&&(p===33&&d.tagStart!==A||p===38&&d.anchorStart!==A)||!el(e,d,t===ce)&&!nl(e,d))break;s===null&&(s=b),$(e,!0)?(i=!0,h=f,e.lineIndent>n?a=1:e.lineIndent===n?a=0:a=-1):h=!1}if(h&&(h=i||u),a===1||t===vn){const p=t===ce||t===pt?n:n+1,b=e.position-e.lineStart;if(a===1)if(h&&(Sr(e,b,d)||tt(e,b,p,d))||cl(e,p,d))c=!0;else{const m=e.input.charCodeAt(e.position);if(s!==null&&o&&f&&!h&&m!==124&&m!==62){const g=Ge(e),k=s.position-s.lineStart;se(e,s),tt(e,k,p,Er())&&e.events[g.eventsLength]?.type===3?c=!0:se(e,g)}!c&&(l&&ol(e,p,d)||rl(e,p,d)||ul(e,p,d)||tl(e,d)||al(e,p,t,d))&&(c=!0)}else a===0&&(c=h&&Sr(e,b,d))}return l=l&&!c,!c&&(d.anchorStart!==A||d.tagStart!==A||l)&&($e(e,A,A,d.anchorStart,d.anchorEnd,d.tagStart,d.tagEnd,1),c=!0),e.depth--,c||d.anchorStart!==A||d.tagStart!==A}function ll(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Y(e.input.charCodeAt(e.position));)e.position++;const t=e.input.slice(n,e.position),r=[];for(t.length===0&&C(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!N(e.input.charCodeAt(e.position));){for(;xe(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||N(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;const u=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Y(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(u,e.position))}if(N(e.input.charCodeAt(e.position))&&wn(e),t==="YAML"){e.directives.some(o=>o.kind==="yaml")&&C(e,"duplication of %YAML directive"),r.length!==1&&C(e,"YAML directive accepts exactly one argument");const u=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);u===null&&C(e,"ill-formed argument of the YAML directive"),parseInt(u[1],10)!==1&&C(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(t==="TAG"){r.length!==2&&C(e,"TAG directive accepts exactly two arguments");const[u,o]=r;Fu.test(u)||C(e,"ill-formed tag handle (first argument) of the TAG directive"),Au.call(e.tagHandlers,u)&&C(e,`there is a previously declared suffix for "${u}" tag handle`),Z0.test(o)||C(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[u]=o,e.directives.push({kind:"tag",handle:u,prefix:o})}return!0}function sl(e){e.directives=[],e.tagHandlers=Object.create(null);let n=!1;for($(e,!0);ll(e);)n=!0,$(e,!0);let t=!1,r=!1,u=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&re(e.input.charCodeAt(e.position+3))){t=!0;const i=e.line;e.position+=3,$(e,!0),u=e.line>i}else n&&C(e,"directives end mark is expected");const o=e.events.length;if(!t&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&de(e)){e.position+=3,$(e,!0);return}if(W0(e,t,!1),ue(e,e.lineIndent-1,vn,!1,u,u)||B(e),$(e,!0),e.position===e.lineStart&&de(e)&&(r=e.input.charCodeAt(e.position)===46,r)){const i=e.line;e.position+=3,$(e,!0),e.line===i&&e.position<e.length&&C(e,"end of the stream or a document separator is expected")}const a=e.events[o];a?.type===1&&(a.explicitEnd=r),Me(e),!r&&e.position<e.length&&!(e.position===e.lineStart&&de(e))&&C(e,"end of the stream or a document separator is expected")}function dl(e,n){const t=e.length,r={...Pt,...n,input:`${e}\0`,length:t,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},u=e.indexOf("\0");for(u!==-1&&zn(e,u,"null byte is not allowed in input",r.filename),r.input.charCodeAt(r.position)===65279&&r.position++;r.position<r.length&&($(r,!0),!(r.position>=r.length));){const o=r.position;sl(r),r.position===o&&C(r,"can not read a document")}return r.events}var fl={...Pt,...zt};function hl(e,n={}){const t={...fl,...n},r=String(e),u=Object.keys(Pt),o=Object.keys(zt);return j0(dl(r,kr(t,u)),{...kr(t,o),source:r})}function pl(e,n){const t=hl(e,n);if(t.length===0)throw new yn("expected a document, but the input is empty");if(t.length===1)return t[0];throw new yn("expected a single document in the stream, but found more")}E0.withTags({...ft,resolve:(e,n,t)=>{const r=ft.resolve(e,n,t);return r===S?gu.resolve(e,n,t):r}},{...ht,resolve:(e,n,t)=>{const r=ht.resolve(e,n,t);return r===S?ku.resolve(e,n,t):r}});var rt,Fr;function bl(){return Fr||(Fr=1,rt=function(n,t){var r=3,u="-",o=u.charCodeAt(0),a=u.length;function i(c,s,d,l){var h,f,p,b,m,g,k,y=!1,x=c.bMarks[s]+c.tShift[s],v=c.eMarks[s];if(s!==0||o!==c.src.charCodeAt(0))return!1;for(h=x+1;h<=v;h++)if(u[(h-x)%a]!==c.src[h]){k=h+1;break}if(p=Math.floor((h-x)/a),p<r)return!1;if(h-=(h-x)%a,l)return!0;for(f=s;f++,!(f>=d||c.src.slice(x,v)==="..."||(x=c.bMarks[f]+c.tShift[f],v=c.eMarks[f],x<v&&c.sCount[f]<c.blkIndent));)if(o===c.src.charCodeAt(x)&&!(c.sCount[f]-c.blkIndent>=4)){for(h=x+1;h<=v&&u[(h-x)%a]===c.src[h];h++);if(!(Math.floor((h-x)/a)<p)&&(h-=(h-x)%a,h=c.skipSpaces(h),!(h<v))){y=!0;break}}return m=c.parentType,g=c.lineMax,c.parentType="container",c.lineMax=f,b=c.push("front_matter",null,0),b.hidden=!0,b.markup=c.src.slice(s,h),b.block=!0,b.map=[s,f+(y?1:0)],b.meta=c.src.slice(k,x-1),c.parentType=m,c.lineMax=g,c.line=f+(y?1:0),t(b.meta),!0}n.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),rt}var ml=bl();const gl=Mn(ml);function kl(){return e=>{let n="";e.use(gl,t=>{const r=yl(t);r!==void 0?n=Mu(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,u,o,a)=>n===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(t[r])}>
${n}
</table>
`}}function yl(e){try{const n=pl(e,{schema:xu});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function Mu(e,n){const t=Object.entries(e);return t.length===0?"":`<tbody>
${t.map(([u,o])=>`<tr><th scope="row">${n(u)}</th><td>${gt(o,n)}</td></tr>`).join(`
`)}
</tbody>`}function gt(e,n){if(e==null)return"";if(e instanceof Date)return n(xl(e));if(Array.isArray(e))return e.every(vl)?e.map(r=>gt(r,n)).join(", "):`<ul>${e.map(r=>`<li>${gt(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const t=Mu(e,n);return t===""?"":`<table>${t}</table>`}return n(String(e))}function xl(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function vl(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}function Ot(){return typeof _.MarkEdit.addExtension=="function"}function Nu(){return typeof _.MarkEdit.runtimeInfo!="function"?!1:_.MarkEdit.runtimeInfo().appVersion.localeCompare("1.34.0",void 0,{numeric:!0})>=0}const $t={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},wl=Be(_.MarkEdit.userSettings),G=Be(wl[$t.rootValueKey]),Ru=Be(G.changeMode),Lu=Be(G.markdownIt),Cl=["automatic","quiet","notify","never"],Ve=(()=>{if(Nu())return"never";const e=G.updateBehavior;return e&&Cl.includes(e)?e:an(G.autoUpdate)?"quiet":"never"})(),_l=an(G.syncScroll);an(G.hidePreviewButtons);an(G.syntaxAutoDetect,!1);const El=an(G.imageHoverPreview,!1),Pn=G.themeName??"github",zu=Pn==="none",ut=G.styledHtmlColorScheme??G.styledHtmlTheme??"auto";G.mathDelimiters;const Al=Ru.modes??$t.defaultModes,Dr=Be(Ru.hotKey),Sl=Lu.preset??$t.defaultPreset,Fl=Be(Lu.options);function Be(e,n={}){return e??n}function an(e,n=!0){return e??n}const Dl=`.markdown-body {
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
`,Tl=`.markdown-body {
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
`,Il=`.markdown-body {
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
`,Ml=`.markdown-body {
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
`,Nl=`.markdown-body {
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
`,Rl=`.markdown-body {
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
`,Ll=`.markdown-body {
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
`,zl=`.markdown-body {
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
`,Pl=`.markdown-body {
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
`,Ol=`.markdown-body {
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
`,$l=`.markdown-body {
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
`,Bl=`.markdown-body {
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
`,ql=`.markdown-body {
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
`,jl=`.markdown-body {
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
`,Hl=`.markdown-body {
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
`,Ul=`.markdown-body {
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
`,Gl=`.markdown-body {
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
`,Vl=`.markdown-alert {
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
`,Zl=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,Wl=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,Yl=`.code-copy-wrapper {
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
`,Cn={github:{light:Tl,dark:Il},cobalt:{dark:Ml},dracula:{dark:Nl},minimal:{light:Rl,dark:Ll},"night-owl":{dark:zl},"rose-pine":{light:Pl,dark:Ol},solarized:{light:$l,dark:Bl},synthwave84:{dark:ql},"winter-is-coming":{light:jl,dark:Hl},xcode:{light:Ul,dark:Gl}};function Kl(e="auto"){if(zu)return"";const n=Cn[Pn]??Cn.github,t=n.light??n.dark,r=n.dark??n.light,u=Zt(t)??"#ffffff",o=Zt(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...Bt(e,`body { background: ${u}; }`,`body { background: ${o}; }`)].join(`
`)}function Pu(e="auto"){if(zu)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=Cn[Pn]??Cn.github,t=n.light??n.dark,r=n.dark??n.light;return[Dl,...Bt(e,t,r)].join(`
`)}function Jl(e="auto"){return[Vl,...Bt(e,Zl,Wl)].join(`
`)}function Ou(){return Yl}function Bt(e,n,t){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(t);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${t}
        }`);break}return r}const Xl={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function T(e){return es[e]}const Ql=["default","zh-CN","zh-TW"],es=Xl[(()=>{const e=navigator.language;return Ql.includes(e)?e:"default"})()];async function qt(e,n=!0){return await rs,Z.render(e,{lineInfo:n})}function $u(e){e()}async function Bu(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(Kl(ut)),n(Pu(ut)),n(Jl(ut)),n(Ou()),"</body></html>"].join(`
`)}const Z=U(Sl,{html:!0,breaks:!0,linkify:!0,...Fl}),ns=[];Z.use(kl());Z.use(Fe);Z.use(ic,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});Z.use(bc);Z.use(kc,{enabled:Ot(),label:!0});Z.use(xc);const ts=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),rs=Promise.all(ns).then(()=>{for(const e of ts){const n=Z.renderer.rules[e];Z.renderer.rules[e]=(t,r,u,o,a)=>{const i=t[r];return o.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),n?n(t,r,u,o,a):a.renderToken(t,r,u)}}for(const e of["fence","code_block"]){const n=Z.renderer.rules[e];Z.renderer.rules[e]=(t,r,u,o,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?a.renderToken(t,r,u):n(t,r,u,o,a)}
        <button title="${T("copyCode")}" aria-label="${T("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),us=new DOMParser,os="image-loader",jt="cm-md-image-preview",Tr=5;function qu(e){const n=us.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const u=r.getAttribute("src");u!==null&&(u.includes("://")||u.startsWith("data:image/")||(r.src=`${os}://${u}`))}),n.body.innerHTML}function is(e){typeof _.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{le.panelPresenter!==void 0&&(clearTimeout(le.panelPresenter),le.panelPresenter=void 0),le.panelPresenter=setTimeout(()=>{const t=n.target,r=t?.closest(".cm-md-link"),u=r?.dataset.linkUrl??r?.innerText??"";r!==null&&mo(u)?as(r,u):t?.classList.contains(jt)||Ze()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ze(!1)}),e.addEventListener("scroll",()=>Ze()))}async function as(e,n){if(e===le.focusedElement)return;const t=(await _.MarkEdit.getFileInfo())?.parentPath;if(t===void 0)return;const r=Se(t,n),u=await _.MarkEdit.getFileObject(r);if(u===void 0)return;const o=e.getBoundingClientRect(),a=document.createElement("img");a.className=jt,a.style.position="fixed",a.style.left=`${o.left}px`,a.style.zIndex="10000",a.style.borderRadius="5px",a.style.opacity="0",a.style.transition="opacity 120ms",a.style.cursor="pointer",a.onclick=()=>{Ze(),window.open(n,"_blank")},a.onload=()=>{const c=Math.min(a.naturalHeight,240);a.style.height=`${c}px`;const s=o.top,d=window.innerHeight-o.bottom;s>d?a.style.top=`${o.top-c-Tr}px`:a.style.top=`${o.bottom+Tr}px`,requestAnimationFrame(()=>{a.style.opacity="1"})};const i=u.mimeType??"image/png";a.src=`data:${i};base64,${u.data}`,Ze(!1),le.focusedElement=e,document.body.appendChild(a)}function Ze(e=!0){le.focusedElement!==void 0&&(le.focusedElement=void 0,document.querySelectorAll(`.${jt}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const le={panelPresenter:void 0,focusedElement:void 0};function cs(e,n){if(!_l)return;_e.lastSourceScrollTop=e.scrollTop;const t=()=>{Math.abs(e.scrollTop-_e.lastSourceScrollTop)<.5||(_e.lastSourceScrollTop=e.scrollTop,ju(e,n))};"onscrollend"in window?e.addEventListener("scrollend",t):e.addEventListener("scroll",()=>{_e.scrollUpdater!==void 0&&clearTimeout(_e.scrollUpdater),_e.scrollUpdater=setTimeout(t,100)})}function ju(e,n,t=!0){const{line:r,progress:u}=ls(e);ss(n,r,u,t)}function ls(e,n=0){const t=_.MarkEdit.editorView,r=t.lineBlockAtHeight(e.scrollTop+n),u=t.state.doc.lineAt(r.from).number-1,o=po(t.domAtPos(r.from).node);if(o===null)return{line:u,progress:0};const a=e.getBoundingClientRect(),i=o.getBoundingClientRect(),c=a.top-i.top-n,s=i.height>0?Ht(c/i.height):0;return{line:u,progress:s}}function ss(e,n,t,r=!0){if(n===0&&t===0)return fn(e,0,r);const u=Array.from(document.querySelectorAll("[data-line-from]")),o=ds(u,n);if(o!==void 0){const{from:c,to:s}=De(o);return jn(e,o,fs(n,t,c,s),r)}if(n===0)return fn(e,0,r);const{beforeBlock:a,afterBlock:i}=hs(u,n);if(a!==void 0&&i!==void 0){const c=De(a),s=De(i),d=ct(e,a)+a.offsetHeight,l=ct(e,i),h=s.from-c.to,f=n-c.to+t,p=h>0?Ht(f/h):0,b=d+(l-d)*p;return fn(e,b,r)}if(a!==void 0)return jn(e,a,1,r);if(i!==void 0)return jn(e,i,0,r)}function ds(e,n){return e.find(t=>{const{from:r,to:u}=De(t);return n>=r&&n<=u})}function fs(e,n,t,r){const u=r-t;if(u<1)return e===t?n:0;const o=e-t+n;return Ht(o/u)}function hs(e,n){let t,r;for(const u of e){const{from:o,to:a}=De(u);if(a<n)t=u;else if(o>n){r=u;break}}return{beforeBlock:t,afterBlock:r}}function Ht(e){return Math.max(0,Math.min(1,e))}const _e={lastSourceScrollTop:0,scrollUpdater:void 0};function ps(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}const ke={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},On={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var ot=function(e,n){return Number(e.slice(0,-1*n.length))},bs=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:ot(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:ot(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:ot(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},Hu=function(e){return e.split(" ").map(bs)},ms=function(e,n,t,r){t===void 0&&(t=0),r===void 0&&(r=!1);var u=r?e+1:e,o=n.slice(0,u).reduce(function(i,c){return i+c.numeric},0),a=t?e*t:0;return o+a},Uu=function(e,n,t){return n.concat(t).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},gs=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Ir=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},ye=function(){return!1},ks=function(e,n,t){e.style[n]=t},I=function(e,n,t){var r=e[n];return r!==void 0?r:t};function Gu(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(t){var r=[];try{r=Array.from(t.cssRules||[])}catch{}return r})).filter(function(t){var r=!1;try{r=e.matches(t.selectorText)}catch{}return r})}var ys="grid-template-columns",xs="grid-template-rows",L=function(n,t,r){this.direction=n,this.element=t.element,this.track=t.track,n==="column"?(this.gridTemplateProp=ys,this.gridGapProp="grid-column-gap",this.cursor=I(r,"columnCursor",I(r,"cursor","col-resize")),this.snapOffset=I(r,"columnSnapOffset",I(r,"snapOffset",30)),this.dragInterval=I(r,"columnDragInterval",I(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=I(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=xs,this.gridGapProp="grid-row-gap",this.cursor=I(r,"rowCursor",I(r,"cursor","row-resize")),this.snapOffset=I(r,"rowSnapOffset",I(r,"snapOffset",30)),this.dragInterval=I(r,"rowDragInterval",I(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=I(r,"gridTemplateRows")),this.onDragStart=I(r,"onDragStart",ye),this.onDragEnd=I(r,"onDragEnd",ye),this.onDrag=I(r,"onDrag",ye),this.writeStyle=I(r,"writeStyle",ks),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};L.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),t=n.width,r=n.height,u=n.top,o=n.bottom,a=n.left,i=n.right;this.direction==="column"?(this.start=u,this.end=o,this.size=r):this.direction==="row"&&(this.start=a,this.end=i,this.size=t)};L.prototype.getSizeAtTrack=function(n,t){return ms(n,this.computedPixels,this.computedGapPixels,t)};L.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};L.prototype.getRawTracks=function(){var n=Uu(this.gridTemplateProp,[this.grid],Gu(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};L.prototype.getGap=function(){var n=Uu(this.gridGapProp,[this.grid],Gu(this.grid));return n.length?n[0]:null};L.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};L.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};L.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=Hu(n)};L.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=Hu(n)};L.prototype.setGap=function(n){this.gap=n};L.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=gs("px",this.computedGap)||0};L.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};L.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(i){return i.type==="%"}),r=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var u=Ir(r);u!==null&&(this.frToPixels=this.computedPixels[u].numeric/r[u].numeric)}if(t.length){var o=Ir(t);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/t[o].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",ye),this.grid.addEventListener("dragstart",ye),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};L.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};L.prototype.drag=function(n){var t=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),u=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),a=u+this.snapOffset,i=o-this.snapOffset;t<a&&(t=u),t>i&&(t=o),t<u?t=u:t>o&&(t=o);var c=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,s=this.bTrackEnd-t+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var d=Math.round(c/this.dragInterval)*this.dragInterval;s-=d-c,c=d}if(c<this.minSizeStart&&(c=this.minSizeStart),s<this.minSizeEnd&&(s=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=c+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var l=c/this.frToPixels;this.tracks[this.aTrack]=l+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var h=c/this.percentageToPixels;this.tracks[this.aTrack]=h+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=s+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var f=s/this.frToPixels;this.tracks[this.bTrack]=f+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var p=s/this.percentageToPixels;this.tracks[this.bTrack]=p+"%"}var b=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,b),this.onDrag(this.direction,this.track,b)};L.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",ye),this.grid.removeEventListener("dragstart",ye),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};L.prototype.destroy=function(n,t){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var Mr=function(e,n,t){return n in e?e[n]:t},ze=function(e,n){return function(t){if(t.track<1)throw Error("Invalid track index: "+t.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},u=e==="column"?"columnMinSize":"rowMinSize";return new L(e,Object.assign({},{minSizeStart:Mr(r,t.track-1,I(n,u,I(n,"minSize",0))),minSizeEnd:Mr(r,t.track+1,I(n,u,I(n,"minSize",0)))},t),n)}},we=function(n){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){t.columnGutters[r.track]=ze("column",t.options)(r)}),this.options.rowGutters.forEach(function(r){t.rowGutters[r.track]=ze("row",t.options)(r)})};we.prototype.addColumnGutter=function(n,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=ze("column",this.options)({element:n,track:t})};we.prototype.addRowGutter=function(n,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=ze("row",this.options)({element:n,track:t})};we.prototype.removeColumnGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(t,function(){delete r.columnGutters[n]})};we.prototype.removeRowGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(t,function(){delete r.rowGutters[n]})};we.prototype.handleDragStart=function(n,t,r){t==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=ze("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):t==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=ze("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};we.prototype.destroy=function(n){var t=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return t.columnGutters[r].destroy(n,function(){delete t.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return t.rowGutters[r].destroy(n,function(){delete t.rowGutters[r]})})};function vs(e){return new we(e)}const ws=`body .markdown-body details summary,
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
`,_n=document.body,We=document.createElement("div"),P=document.createElement("div"),Nr=He("* { cursor: col-resize }",!1),Vu=so.Annotation.define();var J=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(J||{});function Cs(){He(ws),He(Pu()),He(Ou());const e=document.createElement("div");e.className=ke.dividerViewClass,We.appendChild(e),We.className=ke.gutterViewClass,_n.appendChild(We),P.className=ke.previewPaneClass,_n.appendChild(P),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const u=_.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(P.classList.contains("overlay")||document.activeElement!==u)&&(bo(P),r.preventDefault())}),new MutationObserver(Rr).observe(P,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Rr(),document.querySelector(".mermaid")!==null&&En()}),typeof _.MarkEdit.getFileInfo=="function"&&typeof _.MarkEdit.openFile=="function"&&P.addEventListener("click",Ms),P.addEventListener("click",r=>{Ns(r),Rs(r)})}function $n(e,n=!0){const t=V();qe.viewMode=e,e!==t&&localStorage.setItem(On.viewModeCacheKey,String(e));const r=_.MarkEdit.editorView;e===0?r.focus():e===2&&r.contentDOM.blur(),e===1?(_n.classList.add(ke.containerClass),qe.splitter??=vs({columnGutters:[{track:1,element:We}],minSize:150,onDragStart:()=>Nr.disabled=!1,onDragEnd:()=>Nr.disabled=!0})):(_n.classList.remove(ke.containerClass),qe.splitter?.destroy(),qe.splitter=void 0),e===2?P.classList.add("overlay"):P.classList.remove("overlay"),n&&En()}function _s(){const e=[0,...Al.map(r=>{switch(r){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(r=>r!==void 0)],n=e.indexOf(V()),t=n===-1?0:(n+1)%e.length;$n(e[t])}function Es(){const e=localStorage.getItem(On.viewModeCacheKey);if(e===null)return;const n=Number(e);V()!==n&&$n(n,!0)}function V(){return qe.viewMode}async function En(){if(V()===0)return;const e=qu(await Bn());P.innerHTML=e,$u(()=>{ju(Zu(),cn(),!1);const n=localStorage.getItem(On.previewPageZoomKey);n!==null&&pn(n)})}function As(e){if(V()===0||V()===1&&_.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key==="0")return;const n=Number(P.style.zoom)||1,t=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":case"_":pn(t(n-.1));break;case"=":case"+":pn(t(n+.1));break;case"0":pn("1");break;default:return}localStorage.setItem(On.previewPageZoomKey,P.style.zoom),e.preventDefault(),e.stopPropagation()}function Ss(){Yu(!1)}function Fs(){Yu(!0)}async function Ds(){const e=await Bn(!1);await navigator.clipboard.writeText(e)}async function Ts(){const e=await Bn(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([P.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function Zu(){return _.MarkEdit.editorView.scrollDOM}function cn(){return P}async function Wu(e){const n=await Bn(!1);return e?await Bu(n):`<meta charset="UTF-8">
${n}`}async function Is(e,n){const t=await qt(e,!1);return n?await Bu(t):`<meta charset="UTF-8">
${t}`}async function Bn(e=!0){const n=_.MarkEdit.editorAPI.getText();return await qt(n,e)}function Rr(){const e=getComputedStyle(P).backgroundColor;We.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function pn(e){P.style.zoom=e,P.classList.toggle("zoomed-in",Number(e)>1)}async function Yu(e){const n=await(async()=>{const r=await _.MarkEdit.getFileInfo();return r===void 0?`${T("untitled")}.html`:`${ho(r.filePath)}.html`})(),t=await Wu(e);_.MarkEdit.showSavePanel({fileName:n,string:t})}async function Ms(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const t=n.getAttribute("href");if(!t?.startsWith("../"))return;const r=(await _.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const u=Se(r,decodeURIComponent(t));await _.MarkEdit.openFile(u)}catch(u){console.error("Failed to open file:",u)}}}function Ns(e){const n="suppress-underline",t=e.target instanceof Element?e.target.closest("a"):null;t===null||t.classList.contains(n)||!t.matches(":hover")||(t.classList.add(n),t.addEventListener("mouseleave",()=>t.classList.remove(n),{once:!0}))}function Rs(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const t=n.closest("[data-line-from]");if(t===null){console.error("Failed to find task item block");return}const r=_.MarkEdit.editorAPI,u=r.getLineRange(De(t).from),o=ps(r.getText(u));if(o===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const a=u.from+o.offset;_.MarkEdit.editorView.dispatch({changes:{from:a,to:a+1,insert:o.replacement},annotations:Vu.of(!0)})}const qe={viewMode:0,splitter:void 0};async function kt(){if(Ve==="never")return;const e=await Ku();typeof e.tag_name=="string"&&e.name!=="1.9.0"&&(Qu().has(e.name)||(Ve==="automatic"&&wt()?await Ut(e.tag_name):Ve==="quiet"?(yt.pendingRelease=e,Ju(e)):zs(e)))}async function Ls(){const e=Date.now(),n=Number(localStorage.getItem(Pe.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await kt(),localStorage.setItem(Pe.lastCheckCacheKey,String(e))}catch(t){console.error("Failed to check for updates:",t)}}async function Ku(){return await(await fetch(Pe.latestReleaseURL)).json()}async function Ut(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,t="lite/",r=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,u=`${Pe.rawBaseURL}${r}/dist/${t}markedit-preview.js`,o=await fetch(u);if(!o.ok)return console.error(`Failed to download the latest build from ${u}`),!1;const a=await o.text();return await _.MarkEdit.createFile({path:n,string:a,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function Ju(e=yt.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${ke.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const t=document.createElement("button");return t.dataset.releaseName=e.name,t.className=ke.updatePillClass,t.textContent=T("update"),t.style.display=V()===J.edit?"none":"",t.addEventListener("webkitmouseforcedown",r=>{r.preventDefault()}),t.addEventListener("click",()=>{const{title:r,actions:u}=Xu(e,()=>{yt.pendingRelease=void 0,t.remove()}),[o,...a]=u,i=t.getBoundingClientRect(),c={x:i.left,y:i.bottom+10};_.MarkEdit.showContextMenu([{title:r},o,{separator:!0},...a],c)}),document.body.appendChild(t),t}async function zs(e){const{title:n,actions:t}=Xu(e),r=await _.MarkEdit.showAlert({title:n,message:e.body,buttons:t.map(u=>u.title)});t[r]?.action?.()}function Xu(e,n=()=>{}){const t=`MarkEdit-preview ${e.name} ${T("newVersionAvailable")}`,r=[...wt()?[{title:T("updateAndRelaunch"),action:async()=>{await Ut(e.tag_name)?_.MarkEdit.relaunchApp():_.MarkEdit.showAlert(T("failedToUpdate")),n()}}]:[],{title:T("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:T("remindMeLater"),action:n},{title:T("skipThisVersion"),action:()=>{const u=Qu();u.add(e.name),localStorage.setItem(Pe.skippedCacheKey,JSON.stringify([...u])),n()}}];return{title:t,actions:r}}function Qu(){const e=localStorage.getItem(Pe.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const Pe={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},yt={pendingRelease:void 0},xt="markedit-preview",Lr=`${xt}.js`;function Ps(e){const{destExists:n,bundleInfo:t,currentVersion:r}=e,u=t?.version===r,o=t?.fullBuild===!1;return!(n&&u&&o)}async function Os(){try{const e=_.MarkEdit.getDirectoryPath("documents"),n=_.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const t=typeof __FILE_PATH__=="string"?__FILE_PATH__:Se(e,`scripts/${Lr}`);if(await _.MarkEdit.getFileInfo(t)===void 0){console.error(`Source file not found at ${t}`);return}const u=t.split("/").pop()??Lr,o=Se(n,"Shared/scripts"),a=Se(o,u),i=await _.MarkEdit.getFileInfo(a)!==void 0,c=Se(n,"Shared/metadata.json"),s=await go(c),d=s[xt];if(!Ps({destExists:i,bundleInfo:d,currentVersion:"1.9.0"}))return;const l=await _.MarkEdit.getFileContent(t);if(l===void 0){console.error(`Failed to read content from ${t}`);return}await _.MarkEdit.createFile({path:o,isDirectory:!0}),await _.MarkEdit.createFile({path:a,string:l,overwrites:!0}),await _.MarkEdit.createFile({path:c,string:JSON.stringify({...s,[xt]:{version:"1.9.0",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const $s='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',Bs='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function qs(){const e=zr(T("source"),$s),n=zr(T("preview"),Bs),t=document.createElement("div");t.className="quicklook-segmented",t.setAttribute("role","tablist"),t.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(t),{toolbar:r,sourceButton:e,previewButton:n}}function zr(e,n){const t=document.createElement("button");t.title=e,t.type="button",t.className="quicklook-segment",t.setAttribute("role","tab"),t.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const u=document.createElement("span");return u.innerHTML=n,u.className="quicklook-segment-icon",t.append(r,u),t}function Ee(){if(Ae!==void 0)return Ae;try{Ae=localStorage.getItem(eo)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),Ae="source"}return Ae}function Pr(e){Ae=e;try{localStorage.setItem(eo,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let Ae;const eo="ui.quicklook-mode";function js(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function Hs(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function Us(e,n){const t=window,r=t.pinchZoomTarget;t.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const u=n.querySelector(".quicklook-content");return u!==null?{scroller:n,inner:u}:null};for(const u of["gesturechange","gestureend"])document.addEventListener(u,()=>{if(e()!=="preview")return;const o=n.querySelector(".quicklook-content");o?.style.zoom.length?o?.style.setProperty("--quicklook-zoom",o.style.zoom):o?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function Gs(e,n){let t;const r=window,u={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},o=()=>{const i=n.clientHeight,c=n.scrollHeight,s=c-i;if(s<=0||c<=0)return{clientHeight:i,scrollHeight:c,scrollbarHeight:i,scrollbarTop:0};const d=i*(i/c),h=n.scrollTop/s*(i-d);return{clientHeight:i,scrollHeight:c,scrollbarHeight:d,scrollbarTop:h}},a=(i,c,s="auto")=>{const{clientHeight:d,scrollHeight:l,scrollbarHeight:h}=o(),f=d-h;if(f>0){const p=(i-c)/f;n.scrollTo({top:p*(l-d),behavior:s})}};r.startDragging=i=>{if(e()!=="preview"){u.start?.(i);return}const{scrollbarTop:c,scrollbarHeight:s}=o(),d=Or(n,i);t=d-c,(d<c||d>c+s)&&a(d,s*.5,"smooth")},r.updateDragging=i=>{if(e()!=="preview"){u.update?.(i);return}t!==void 0&&a(Or(n,i),t)},r.cancelDragging=()=>{if(e()!=="preview"){u.cancel?.();return}t=void 0}}function Vs(e,n,t){t.addEventListener("wheel",r=>{const u=e()==="preview"?n:document.querySelector(".cm-scroller");u!==null&&(u.scrollTop+=r.deltaY,u.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function Zs(e,n,t){const r=document.querySelector(".cm-scroller"),u=()=>{const a=(e()==="preview"?n:r)?.scrollTop??0;t.classList.toggle("scrolled",a>0),t.classList.toggle("scrolled-far",a>20)};return n.addEventListener("scroll",u,{passive:!0}),r?.addEventListener("scroll",u,{passive:!0}),u}function Ws(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const t=getSelection(),r=t!==null&&t.rangeCount>0?t.getRangeAt(0):null,u=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,o=u??(()=>{const i=document.createRange();return i.selectNodeContents(e),i})(),a=document.createElement("div");a.appendChild(o.cloneContents()),n.clipboardData?.setData("text/html",a.innerHTML),n.clipboardData?.setData("text/plain",u!==null?u.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function Or(e,n){return n-e.getBoundingClientRect().top}const Ys=`body {
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
`;function Ks(e){He(Ys),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:t,previewButton:r}=qs();document.body.appendChild(n);const u=Js(e),o=Zs(Ee,e,n),a={previewPane:e,sourceButton:t,previewButton:r,refreshSeparator:o,ensureRendered:u.ensureRendered};t.addEventListener("click",()=>{Pr("source"),it(a)}),r.addEventListener("click",()=>{Pr("preview"),it(a)}),it(a),setTimeout(u.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(u.invalidate(),Ee()==="preview"&&u.ensureRendered())}),Hs(),Us(Ee,e),Gs(Ee,e),Vs(Ee,e,n),Ws(e)}function it(e){const n=Ee()==="source",t=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",t),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(t)),e.previewPane.classList.toggle("overlay",t),e.refreshSeparator(),t&&e.ensureRendered()}function Js(e){let n=!1,t;return{ensureRendered:()=>(n||t||(t=(async()=>{try{const o=qu(await qt(js(),!1));e.innerHTML=`<div class="quicklook-content">${o}</div>`,e.querySelectorAll("a[href]").forEach(a=>{a.removeAttribute("href"),a.removeAttribute("target")}),$u(()=>{}),n=!0}catch(o){throw t=void 0,o}})()),t),invalidate:()=>{n=!1,t=void 0}}}var bn={exports:{}};var Xs=bn.exports,$r;function Qs(){return $r||($r=1,(function(e,n){(function(t,r){e.exports=r()})(Xs,(function(){var t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},r=function(s,d){if(!(s instanceof d))throw new TypeError("Cannot call a class as a function")},u=(function(){function s(d,l){for(var h=0;h<l.length;h++){var f=l[h];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(d,f.key,f)}}return function(d,l,h){return l&&s(d.prototype,l),h&&s(d,h),d}})(),o=Object.assign||function(s){for(var d=1;d<arguments.length;d++){var l=arguments[d];for(var h in l)Object.prototype.hasOwnProperty.call(l,h)&&(s[h]=l[h])}return s},a=(function(){function s(d){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,s),this.ctx=d,this.iframes=l,this.exclude=h,this.iframesTimeout=f}return u(s,[{key:"getContexts",value:function(){var l=void 0,h=[];return typeof this.ctx>"u"||!this.ctx?l=[]:NodeList.prototype.isPrototypeOf(this.ctx)?l=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?l=this.ctx:typeof this.ctx=="string"?l=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):l=[this.ctx],l.forEach(function(f){var p=h.filter(function(b){return b.contains(f)}).length>0;h.indexOf(f)===-1&&!p&&h.push(f)}),h}},{key:"getIframeContents",value:function(l,h){var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},p=void 0;try{var b=l.contentWindow;if(p=b.document,!b||!p)throw new Error("iframe inaccessible")}catch{f()}p&&h(p)}},{key:"isIframeBlank",value:function(l){var h="about:blank",f=l.getAttribute("src").trim(),p=l.contentWindow.location.href;return p===h&&f!==h&&f}},{key:"observeIframeLoad",value:function(l,h,f){var p=this,b=!1,m=null,g=function k(){if(!b){b=!0,clearTimeout(m);try{p.isIframeBlank(l)||(l.removeEventListener("load",k),p.getIframeContents(l,h,f))}catch{f()}}};l.addEventListener("load",g),m=setTimeout(g,this.iframesTimeout)}},{key:"onIframeReady",value:function(l,h,f){try{l.contentWindow.document.readyState==="complete"?this.isIframeBlank(l)?this.observeIframeLoad(l,h,f):this.getIframeContents(l,h,f):this.observeIframeLoad(l,h,f)}catch{f()}}},{key:"waitForIframes",value:function(l,h){var f=this,p=0;this.forEachIframe(l,function(){return!0},function(b){p++,f.waitForIframes(b.querySelector("html"),function(){--p||h()})},function(b){b||h()})}},{key:"forEachIframe",value:function(l,h,f){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=l.querySelectorAll("iframe"),g=m.length,k=0;m=Array.prototype.slice.call(m);var y=function(){--g<=0&&b(k)};g||y(),m.forEach(function(x){s.matches(x,p.exclude)?y():p.onIframeReady(x,function(v){h(x)&&(k++,f(v)),y()},y)})}},{key:"createIterator",value:function(l,h,f){return document.createNodeIterator(l,h,f,!1)}},{key:"createInstanceOnIframe",value:function(l){return new s(l.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(l,h,f){var p=l.compareDocumentPosition(f),b=Node.DOCUMENT_POSITION_PRECEDING;if(p&b)if(h!==null){var m=h.compareDocumentPosition(f),g=Node.DOCUMENT_POSITION_FOLLOWING;if(m&g)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(l){var h=l.previousNode(),f=void 0;return h===null?f=l.nextNode():f=l.nextNode()&&l.nextNode(),{prevNode:h,node:f}}},{key:"checkIframeFilter",value:function(l,h,f,p){var b=!1,m=!1;return p.forEach(function(g,k){g.val===f&&(b=k,m=g.handled)}),this.compareNodeIframe(l,h,f)?(b===!1&&!m?p.push({val:f,handled:!0}):b!==!1&&!m&&(p[b].handled=!0),!0):(b===!1&&p.push({val:f,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(l,h,f,p){var b=this;l.forEach(function(m){m.handled||b.getIframeContents(m.val,function(g){b.createInstanceOnIframe(g).forEachNode(h,f,p)})})}},{key:"iterateThroughNodes",value:function(l,h,f,p,b){for(var m=this,g=this.createIterator(h,l,p),k=[],y=[],x=void 0,v=void 0,w=function(){var F=m.getIteratorNode(g);return v=F.prevNode,x=F.node,x};w();)this.iframes&&this.forEachIframe(h,function(E){return m.checkIframeFilter(x,v,E,k)},function(E){m.createInstanceOnIframe(E).forEachNode(l,function(F){return y.push(F)},p)}),y.push(x);y.forEach(function(E){f(E)}),this.iframes&&this.handleOpenIframes(k,l,f,p),b()}},{key:"forEachNode",value:function(l,h,f){var p=this,b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=this.getContexts(),g=m.length;g||b(),m.forEach(function(k){var y=function(){p.iterateThroughNodes(l,k,h,f,function(){--g<=0&&b()})};p.iframes?p.waitForIframes(k,y):y()})}}],[{key:"matches",value:function(l,h){var f=typeof h=="string"?[h]:h,p=l.matches||l.matchesSelector||l.msMatchesSelector||l.mozMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector;if(p){var b=!1;return f.every(function(m){return p.call(l,m)?(b=!0,!1):!0}),b}else return!1}}]),s})(),i=(function(){function s(d){r(this,s),this.ctx=d,this.ie=!1;var l=window.navigator.userAgent;(l.indexOf("MSIE")>-1||l.indexOf("Trident")>-1)&&(this.ie=!0)}return u(s,[{key:"log",value:function(l){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",f=this.opt.log;this.opt.debug&&(typeof f>"u"?"undefined":t(f))==="object"&&typeof f[h]=="function"&&f[h]("mark.js: "+l)}},{key:"escapeStr",value:function(l){return l.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(l){return this.opt.wildcards!=="disabled"&&(l=this.setupWildcardsRegExp(l)),l=this.escapeStr(l),Object.keys(this.opt.synonyms).length&&(l=this.createSynonymsRegExp(l)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),this.opt.diacritics&&(l=this.createDiacriticsRegExp(l)),l=this.createMergedBlanksRegExp(l),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.createJoinersRegExp(l)),this.opt.wildcards!=="disabled"&&(l=this.createWildcardsRegExp(l)),l=this.createAccuracyRegExp(l),l}},{key:"createSynonymsRegExp",value:function(l){var h=this.opt.synonyms,f=this.opt.caseSensitive?"":"i",p=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var b in h)if(h.hasOwnProperty(b)){var m=h[b],g=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(b):this.escapeStr(b),k=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(m):this.escapeStr(m);g!==""&&k!==""&&(l=l.replace(new RegExp("("+this.escapeStr(g)+"|"+this.escapeStr(k)+")","gm"+f),p+("("+this.processSynomyms(g)+"|")+(this.processSynomyms(k)+")")+p))}return l}},{key:"processSynomyms",value:function(l){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),l}},{key:"setupWildcardsRegExp",value:function(l){return l=l.replace(/(?:\\)*\?/g,function(h){return h.charAt(0)==="\\"?"?":""}),l.replace(/(?:\\)*\*/g,function(h){return h.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(l){var h=this.opt.wildcards==="withSpaces";return l.replace(/\u0001/g,h?"[\\S\\s]?":"\\S?").replace(/\u0002/g,h?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(l){return l.replace(/[^(|)\\]/g,function(h,f,p){var b=p.charAt(f+1);return/[(|)\\]/.test(b)||b===""?h:h+"\0"})}},{key:"createJoinersRegExp",value:function(l){var h=[],f=this.opt.ignorePunctuation;return Array.isArray(f)&&f.length&&h.push(this.escapeStr(f.join(""))),this.opt.ignoreJoiners&&h.push("\\u00ad\\u200b\\u200c\\u200d"),h.length?l.split(/\u0000+/).join("["+h.join("")+"]*"):l}},{key:"createDiacriticsRegExp",value:function(l){var h=this.opt.caseSensitive?"":"i",f=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],p=[];return l.split("").forEach(function(b){f.every(function(m){if(m.indexOf(b)!==-1){if(p.indexOf(m)>-1)return!1;l=l.replace(new RegExp("["+m+"]","gm"+h),"["+m+"]"),p.push(m)}return!0})}),l}},{key:"createMergedBlanksRegExp",value:function(l){return l.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(l){var h=this,f="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",p=this.opt.accuracy,b=typeof p=="string"?p:p.value,m=typeof p=="string"?[]:p.limiters,g="";switch(m.forEach(function(k){g+="|"+h.escapeStr(k)}),b){case"partially":default:return"()("+l+")";case"complementary":return g="\\s"+(g||this.escapeStr(f)),"()([^"+g+"]*"+l+"[^"+g+"]*)";case"exactly":return"(^|\\s"+g+")("+l+")(?=$|\\s"+g+")"}}},{key:"getSeparatedKeywords",value:function(l){var h=this,f=[];return l.forEach(function(p){h.opt.separateWordSearch?p.split(" ").forEach(function(b){b.trim()&&f.indexOf(b)===-1&&f.push(b)}):p.trim()&&f.indexOf(p)===-1&&f.push(p)}),{keywords:f.sort(function(p,b){return b.length-p.length}),length:f.length}}},{key:"isNumeric",value:function(l){return Number(parseFloat(l))==l}},{key:"checkRanges",value:function(l){var h=this;if(!Array.isArray(l)||Object.prototype.toString.call(l[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(l),[];var f=[],p=0;return l.sort(function(b,m){return b.start-m.start}).forEach(function(b){var m=h.callNoMatchOnInvalidRanges(b,p),g=m.start,k=m.end,y=m.valid;y&&(b.start=g,b.length=k-g,f.push(b),p=k)}),f}},{key:"callNoMatchOnInvalidRanges",value:function(l,h){var f=void 0,p=void 0,b=!1;return l&&typeof l.start<"u"?(f=parseInt(l.start,10),p=f+parseInt(l.length,10),this.isNumeric(l.start)&&this.isNumeric(l.length)&&p-h>0&&p-f>0?b=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(l))),this.opt.noMatch(l))):(this.log("Ignoring invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:f,end:p,valid:b}}},{key:"checkWhitespaceRanges",value:function(l,h,f){var p=void 0,b=!0,m=f.length,g=h-m,k=parseInt(l.start,10)-g;return k=k>m?m:k,p=k+parseInt(l.length,10),p>m&&(p=m,this.log("End range automatically set to the max value of "+m)),k<0||p-k<0||k>m||p>m?(b=!1,this.log("Invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)):f.substring(k,p).replace(/\s+/g,"")===""&&(b=!1,this.log("Skipping whitespace only range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:k,end:p,valid:b}}},{key:"getTextNodes",value:function(l){var h=this,f="",p=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(b){p.push({start:f.length,end:(f+=b.textContent).length,node:b})},function(b){return h.matchesExclude(b.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){l({value:f,nodes:p})})}},{key:"matchesExclude",value:function(l){return a.matches(l,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(l,h,f){var p=this.opt.element?this.opt.element:"mark",b=l.splitText(h),m=b.splitText(f-h),g=document.createElement(p);return g.setAttribute("data-markjs","true"),this.opt.className&&g.setAttribute("class",this.opt.className),g.textContent=b.textContent,b.parentNode.replaceChild(g,b),m}},{key:"wrapRangeInMappedTextNode",value:function(l,h,f,p,b){var m=this;l.nodes.every(function(g,k){var y=l.nodes[k+1];if(typeof y>"u"||y.start>h){if(!p(g.node))return!1;var x=h-g.start,v=(f>g.end?g.end:f)-g.start,w=l.value.substr(0,g.start),E=l.value.substr(v+g.start);if(g.node=m.wrapRangeInTextNode(g.node,x,v),l.value=w+E,l.nodes.forEach(function(F,z){z>=k&&(l.nodes[z].start>0&&z!==k&&(l.nodes[z].start-=v),l.nodes[z].end-=v)}),f-=v,b(g.node.previousSibling,g.start),f>g.end)h=g.end;else return!1}return!0})}},{key:"wrapMatches",value:function(l,h,f,p,b){var m=this,g=h===0?0:h+1;this.getTextNodes(function(k){k.nodes.forEach(function(y){y=y.node;for(var x=void 0;(x=l.exec(y.textContent))!==null&&x[g]!=="";)if(f(x[g],y)){var v=x.index;if(g!==0)for(var w=1;w<g;w++)v+=x[w].length;y=m.wrapRangeInTextNode(y,v,v+x[g].length),p(y.previousSibling),l.lastIndex=0}}),b()})}},{key:"wrapMatchesAcrossElements",value:function(l,h,f,p,b){var m=this,g=h===0?0:h+1;this.getTextNodes(function(k){for(var y=void 0;(y=l.exec(k.value))!==null&&y[g]!=="";){var x=y.index;if(g!==0)for(var v=1;v<g;v++)x+=y[v].length;var w=x+y[g].length;m.wrapRangeInMappedTextNode(k,x,w,function(E){return f(y[g],E)},function(E,F){l.lastIndex=F,p(E)})}b()})}},{key:"wrapRangeFromIndex",value:function(l,h,f,p){var b=this;this.getTextNodes(function(m){var g=m.value.length;l.forEach(function(k,y){var x=b.checkWhitespaceRanges(k,g,m.value),v=x.start,w=x.end,E=x.valid;E&&b.wrapRangeInMappedTextNode(m,v,w,function(F){return h(F,k,m.value.substring(v,w),y)},function(F){f(F,k)})}),p()})}},{key:"unwrapMatches",value:function(l){for(var h=l.parentNode,f=document.createDocumentFragment();l.firstChild;)f.appendChild(l.removeChild(l.firstChild));h.replaceChild(f,l),this.ie?this.normalizeTextNode(h):h.normalize()}},{key:"normalizeTextNode",value:function(l){if(l){if(l.nodeType===3)for(;l.nextSibling&&l.nextSibling.nodeType===3;)l.nodeValue+=l.nextSibling.nodeValue,l.parentNode.removeChild(l.nextSibling);else this.normalizeTextNode(l.firstChild);this.normalizeTextNode(l.nextSibling)}}},{key:"markRegExp",value:function(l,h){var f=this;this.opt=h,this.log('Searching with expression "'+l+'"');var p=0,b="wrapMatches",m=function(k){p++,f.opt.each(k)};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),this[b](l,this.opt.ignoreGroups,function(g,k){return f.opt.filter(k,g,p)},m,function(){p===0&&f.opt.noMatch(l),f.opt.done(p)})}},{key:"mark",value:function(l,h){var f=this;this.opt=h;var p=0,b="wrapMatches",m=this.getSeparatedKeywords(typeof l=="string"?[l]:l),g=m.keywords,k=m.length,y=this.opt.caseSensitive?"":"i",x=function v(w){var E=new RegExp(f.createRegExp(w),"gm"+y),F=0;f.log('Searching with expression "'+E+'"'),f[b](E,1,function(z,he){return f.opt.filter(he,w,p,F)},function(z){F++,p++,f.opt.each(z)},function(){F===0&&f.opt.noMatch(w),g[k-1]===w?f.opt.done(p):v(g[g.indexOf(w)+1])})};this.opt.acrossElements&&(b="wrapMatchesAcrossElements"),k===0?this.opt.done(p):x(g[0])}},{key:"markRanges",value:function(l,h){var f=this;this.opt=h;var p=0,b=this.checkRanges(l);b&&b.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(b)),this.wrapRangeFromIndex(b,function(m,g,k,y){return f.opt.filter(m,g,k,y)},function(m,g){p++,f.opt.each(m,g)},function(){f.opt.done(p)})):this.opt.done(p)}},{key:"unmark",value:function(l){var h=this;this.opt=l;var f=this.opt.element?this.opt.element:"*";f+="[data-markjs]",this.opt.className&&(f+="."+this.opt.className),this.log('Removal selector "'+f+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(p){h.unwrapMatches(p)},function(p){var b=a.matches(p,f),m=h.matchesExclude(p);return!b||m?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(l){this._opt=o({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},l)},get:function(){return this._opt}},{key:"iterator",get:function(){return new a(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),s})();function c(s){var d=this,l=new i(s);return this.mark=function(h,f){return l.mark(h,f),d},this.markRegExp=function(h,f){return l.markRegExp(h,f),d},this.markRanges=function(h,f){return l.markRanges(h,f),d},this.unmark=function(h){return l.unmark(h),d},this}return c}))})(bn)),bn.exports}var ed=Qs();const no=Mn(ed),Ye="markedit-preview-mark",to="markedit-preview-mark-highlighted";let je=!1,Gt,oe=0,W=[],Ke=null,dn=null;const Br={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function nd(e){if(Gt=e,oe=0,e.search.length===0){ro();return}const n=cn();uo(n),ud(n)}function td(e){W.length!==0&&(oe=e%W.length,oo())}function ro(){Ke?.disconnect(),Ke=null,Gt=void 0,oe=0,W=[],new no(cn()).unmark()}function rd(){if(V()===J.preview)return{numberOfItems:W.length,currentIndex:oe}}function uo(e){const n=Gt;if(n===void 0||n.search.length===0||je)return;od(),je=!0;const{search:t,caseSensitive:r,wholeWord:u,diacriticInsensitive:o,regexp:a}=n,i=new no(e),c=()=>{W=Array.from(e.querySelectorAll(`.${Ye}`)),oe=W.length>0?Math.min(oe,W.length-1):0,oo(),je=!1};i.unmark({done:()=>{if(a)try{const s=r?"":"i";i.markRegExp(new RegExp(t,s),{className:Ye,done:c})}catch{je=!1,oe=0,W=[]}else i.mark(t,{className:Ye,caseSensitive:r,diacritics:o,separateWordSearch:!1,accuracy:u?"exactly":"partially",done:c})}})}function oo(){const e=V()!==J.sideBySide;W.forEach((n,t)=>{n.classList.toggle(to,e&&t===oe)}),e&&W.length>0&&W[oe].scrollIntoView({behavior:"smooth",block:"center"})}function ud(e){Ke?.disconnect(),Ke=new MutationObserver(()=>{je||uo(e)}),Ke.observe(e,{childList:!0})}function od(){dn===null&&(dn=document.createElement("style"),document.head.appendChild(dn));const{light:e,dark:n}=Br[Pn]??Br.github;dn.textContent=[`.${Ye} { background: ${e} !important; color: inherit !important; }`,`.${to} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${Ye} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(Cs(),Ot()?(typeof _.MarkEdit.onAppReady=="function"?_.MarkEdit.onAppReady(()=>{Os(),setTimeout(()=>{kt()},2e3)}):setTimeout(()=>{Ls()},4e3),(Ve==="automatic"||Ve==="quiet")&&setInterval(()=>{kt()},6048e5)):Ks(cn()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=Wu;window.MarkEditRenderHtml??=Is;window.__markeditPreviewSPI__={performSearch:nd,setSearchMatchIndex:td,clearSearch:ro,searchCounterInfo:rd};Ot()&&(_.MarkEdit.addMainMenuItem({title:T("viewMode"),icon:fo()?"eye":void 0,children:[{title:T("changeMode"),action:()=>{_s(),vt()},key:Dr.key??"V",modifiers:Dr.modifiers??["Command"]},{separator:!0},at(T("editMode"),J.edit),at(T("sideBySideMode"),J.sideBySide),at(T("previewMode"),J.preview),{separator:!0},...id(),{separator:!0},{title:`${T("version")} 1.9.0`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.9.0")},{title:`${T("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...wt()&&!Nu()?[{title:T("updateAndRelaunch"),action:async()=>{const e=await Ku();await Ut(e.tag_name)?_.MarkEdit.relaunchApp():_.MarkEdit.showAlert(T("failedToUpdate"))}}]:[]]}),_.MarkEdit.addExtension(lo.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(Vu))||(me.renderUpdater!==void 0&&clearTimeout(me.renderUpdater),me.renderUpdater=setTimeout(En,500)))})),_.MarkEdit.onEditorReady(()=>{El&&is(_.MarkEdit.editorView.scrollDOM),Es(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&V()===J.preview&&typeof _.MarkEdit.getFileInfo=="function"&&(await _.MarkEdit.getFileInfo())?.filePath===void 0&&_.MarkEdit.editorAPI.getText().length===0&&$n(J.edit,!1)}),En(),vt(),cs(Zu(),cn()),me.keyDownListener!==void 0&&document.removeEventListener("keydown",me.keyDownListener),me.keyDownListener=e=>As(e),document.addEventListener("keydown",me.keyDownListener)}));function at(e,n){return{title:e,action:()=>{$n(n),vt()},state:()=>({isSelected:V()===n})}}function id(){const e=[{title:T("copyHtml"),action:Ds},{title:T("copyRichText"),action:Ts}];return typeof _.MarkEdit.showSavePanel>"u"?e:[{title:T("saveCleanHtml"),action:Ss},{title:T("saveStyledHtml"),action:Fs},...e]}function vt(){const e=Ju();e!==void 0&&(e.style.display=V()===J.edit?"none":"")}const me={renderUpdater:void 0,keyDownListener:void 0};
