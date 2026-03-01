"use strict";const Kn=require("@codemirror/view"),E=require("markedit-api");function Jn(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function Se(e,u=!0){const n=document.createElement("style");return n.textContent=e,document.head.appendChild(n),n.disabled=!u,n}function Du(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function Qn(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function Xn(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function he(e){const u=parseInt(e.dataset.lineFrom??"0"),n=parseInt(e.dataset.lineTo??"0");return{from:u,to:n}}function au(e,u){let n=0,t=u;for(;t!==null&&t!==e;)n+=t.offsetTop,t=t.offsetParent;return n}function Ze(e,u,n,t=!0){const r=au(e,u)+u.offsetHeight*n;iu(e,r,t)}function iu(e,u,n=!0){const t=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:u<=t?0:u,behavior:n?"smooth":"instant"})}function Yn(e){const u=document.createRange();u.selectNodeContents(e);const n=getSelection();n?.removeAllRanges(),n?.addRange(u)}function et(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function ut(e,u){return e.endsWith("/")?e+u:e+"/"+u}function nt(e){return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}const Au={};function tt(e){let u=Au[e];if(u)return u;u=Au[e]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);u.push(t)}for(let n=0;n<e.length;n++){const t=e.charCodeAt(n);u[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return u}function oe(e,u){typeof u!="string"&&(u=oe.defaultChars);const n=tt(u);return e.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let o=0,i=t.length;o<i;o+=3){const a=parseInt(t.slice(o+1,o+3),16);if(a<128){r+=n[a];continue}if((a&224)===192&&o+3<i){const c=parseInt(t.slice(o+4,o+6),16);if((c&192)===128){const s=a<<6&1984|c&63;s<128?r+="��":r+=String.fromCharCode(s),o+=3;continue}}if((a&240)===224&&o+6<i){const c=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16);if((c&192)===128&&(s&192)===128){const l=a<<12&61440|c<<6&4032|s&63;l<2048||l>=55296&&l<=57343?r+="���":r+=String.fromCharCode(l),o+=6;continue}}if((a&248)===240&&o+9<i){const c=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16),l=parseInt(t.slice(o+10,o+12),16);if((c&192)===128&&(s&192)===128&&(l&192)===128){let d=a<<18&1835008|c<<12&258048|s<<6&4032|l&63;d<65536||d>1114111?r+="����":(d-=65536,r+=String.fromCharCode(55296+(d>>10),56320+(d&1023))),o+=9;continue}}r+="�"}return r})}oe.defaultChars=";/?:@&=+$,#";oe.componentChars="";const Fu={};function rt(e){let u=Fu[e];if(u)return u;u=Fu[e]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);/^[0-9a-z]$/i.test(t)?u.push(t):u.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)u[e.charCodeAt(n)]=e[n];return u}function we(e,u,n){typeof u!="string"&&(n=u,u=we.defaultChars),typeof n>"u"&&(n=!0);const t=rt(u);let r="";for(let o=0,i=e.length;o<i;o++){const a=e.charCodeAt(o);if(n&&a===37&&o+2<i&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){r+=e.slice(o,o+3),o+=2;continue}if(a<128){r+=t[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&o+1<i){const c=e.charCodeAt(o+1);if(c>=56320&&c<=57343){r+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[o])}return r}we.defaultChars=";/?:@&=+$,-_.!~*'()#";we.componentChars="-_.!~*'()";function fu(e){let u="";return u+=e.protocol||"",u+=e.slashes?"//":"",u+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?u+="["+e.hostname+"]":u+=e.hostname||"",u+=e.port?":"+e.port:"",u+=e.pathname||"",u+=e.search||"",u+=e.hash||"",u}function Te(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const ot=/^([a-z0-9.+-]+:)/i,at=/:[0-9]*$/,it=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,ct=["<",">",'"',"`"," ","\r",`
`,"	"],st=["{","}","|","\\","^","`"].concat(ct),lt=["'"].concat(st),Su=["%","/","?",";","#"].concat(lt),Tu=["/","?","#"],dt=255,Mu=/^[+a-z0-9A-Z_-]{0,63}$/,ft=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,zu={javascript:!0,"javascript:":!0},Iu={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function hu(e,u){if(e&&e instanceof Te)return e;const n=new Te;return n.parse(e,u),n}Te.prototype.parse=function(e,u){let n,t,r,o=e;if(o=o.trim(),!u&&e.split("#").length===1){const s=it.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let i=ot.exec(o);if(i&&(i=i[0],n=i.toLowerCase(),this.protocol=i,o=o.substr(i.length)),(u||i||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(i&&zu[i])&&(o=o.substr(2),this.slashes=!0)),!zu[i]&&(r||i&&!Iu[i])){let s=-1;for(let f=0;f<Tu.length;f++)t=o.indexOf(Tu[f]),t!==-1&&(s===-1||t<s)&&(s=t);let l,d;s===-1?d=o.lastIndexOf("@"):d=o.lastIndexOf("@",s),d!==-1&&(l=o.slice(0,d),o=o.slice(d+1),this.auth=l),s=-1;for(let f=0;f<Su.length;f++)t=o.indexOf(Su[f]),t!==-1&&(s===-1||t<s)&&(s=t);s===-1&&(s=o.length),o[s-1]===":"&&s--;const b=o.slice(0,s);o=o.slice(s),this.parseHost(b),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const f=this.hostname.split(/\./);for(let p=0,g=f.length;p<g;p++){const y=f[p];if(y&&!y.match(Mu)){let m="";for(let x=0,k=y.length;x<k;x++)y.charCodeAt(x)>127?m+="x":m+=y[x];if(!m.match(Mu)){const x=f.slice(0,p),k=f.slice(p+1),w=y.match(ft);w&&(x.push(w[1]),k.unshift(w[2])),k.length&&(o=k.join(".")+o),this.hostname=x.join(".");break}}}}this.hostname.length>dt&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=o.indexOf("#");a!==-1&&(this.hash=o.substr(a),o=o.slice(0,a));const c=o.indexOf("?");return c!==-1&&(this.search=o.substr(c),o=o.slice(0,c)),o&&(this.pathname=o),Iu[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Te.prototype.parseHost=function(e){let u=at.exec(e);u&&(u=u[0],u!==":"&&(this.port=u.substr(1)),e=e.substr(0,e.length-u.length)),e&&(this.hostname=e)};const ht=Object.freeze(Object.defineProperty({__proto__:null,decode:oe,encode:we,format:fu,parse:hu},Symbol.toStringTag,{value:"Module"})),tn=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,rn=/[\0-\x1F\x7F-\x9F]/,bt=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,bu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,on=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,an=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,pt=Object.freeze(Object.defineProperty({__proto__:null,Any:tn,Cc:rn,Cf:bt,P:bu,S:on,Z:an},Symbol.toStringTag,{value:"Module"})),mt=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),gt=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Ve;const kt=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),xt=(Ve=String.fromCodePoint)!==null&&Ve!==void 0?Ve:function(e){let u="";return e>65535&&(e-=65536,u+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),u+=String.fromCharCode(e),u};function yt(e){var u;return e>=55296&&e<=57343||e>1114111?65533:(u=kt.get(e))!==null&&u!==void 0?u:e}var S;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(S||(S={}));const wt=32;var K;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(K||(K={}));function cu(e){return e>=S.ZERO&&e<=S.NINE}function _t(e){return e>=S.UPPER_A&&e<=S.UPPER_F||e>=S.LOWER_A&&e<=S.LOWER_F}function Ct(e){return e>=S.UPPER_A&&e<=S.UPPER_Z||e>=S.LOWER_A&&e<=S.LOWER_Z||cu(e)}function vt(e){return e===S.EQUALS||Ct(e)}var F;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(F||(F={}));var W;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(W||(W={}));class Et{constructor(u,n,t){this.decodeTree=u,this.emitCodePoint=n,this.errors=t,this.state=F.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=W.Strict}startEntity(u){this.decodeMode=u,this.state=F.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(u,n){switch(this.state){case F.EntityStart:return u.charCodeAt(n)===S.NUM?(this.state=F.NumericStart,this.consumed+=1,this.stateNumericStart(u,n+1)):(this.state=F.NamedEntity,this.stateNamedEntity(u,n));case F.NumericStart:return this.stateNumericStart(u,n);case F.NumericDecimal:return this.stateNumericDecimal(u,n);case F.NumericHex:return this.stateNumericHex(u,n);case F.NamedEntity:return this.stateNamedEntity(u,n)}}stateNumericStart(u,n){return n>=u.length?-1:(u.charCodeAt(n)|wt)===S.LOWER_X?(this.state=F.NumericHex,this.consumed+=1,this.stateNumericHex(u,n+1)):(this.state=F.NumericDecimal,this.stateNumericDecimal(u,n))}addToNumericResult(u,n,t,r){if(n!==t){const o=t-n;this.result=this.result*Math.pow(r,o)+parseInt(u.substr(n,o),r),this.consumed+=o}}stateNumericHex(u,n){const t=n;for(;n<u.length;){const r=u.charCodeAt(n);if(cu(r)||_t(r))n+=1;else return this.addToNumericResult(u,t,n,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(u,t,n,16),-1}stateNumericDecimal(u,n){const t=n;for(;n<u.length;){const r=u.charCodeAt(n);if(cu(r))n+=1;else return this.addToNumericResult(u,t,n,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(u,t,n,10),-1}emitNumericEntity(u,n){var t;if(this.consumed<=n)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(u===S.SEMI)this.consumed+=1;else if(this.decodeMode===W.Strict)return 0;return this.emitCodePoint(yt(this.result),this.consumed),this.errors&&(u!==S.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(u,n){const{decodeTree:t}=this;let r=t[this.treeIndex],o=(r&K.VALUE_LENGTH)>>14;for(;n<u.length;n++,this.excess++){const i=u.charCodeAt(n);if(this.treeIndex=Dt(t,r,this.treeIndex+Math.max(1,o),i),this.treeIndex<0)return this.result===0||this.decodeMode===W.Attribute&&(o===0||vt(i))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],o=(r&K.VALUE_LENGTH)>>14,o!==0){if(i===S.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==W.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var u;const{result:n,decodeTree:t}=this,r=(t[n]&K.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,r,this.consumed),(u=this.errors)===null||u===void 0||u.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(u,n,t){const{decodeTree:r}=this;return this.emitCodePoint(n===1?r[u]&~K.VALUE_LENGTH:r[u+1],t),n===3&&this.emitCodePoint(r[u+2],t),t}end(){var u;switch(this.state){case F.NamedEntity:return this.result!==0&&(this.decodeMode!==W.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case F.NumericDecimal:return this.emitNumericEntity(0,2);case F.NumericHex:return this.emitNumericEntity(0,3);case F.NumericStart:return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case F.EntityStart:return 0}}}function cn(e){let u="";const n=new Et(e,t=>u+=xt(t));return function(r,o){let i=0,a=0;for(;(a=r.indexOf("&",a))>=0;){u+=r.slice(i,a),n.startEntity(o);const s=n.write(r,a+1);if(s<0){i=a+n.end();break}i=a+s,a=s===0?i+1:i}const c=u+r.slice(i);return u="",c}}function Dt(e,u,n,t){const r=(u&K.BRANCH_LENGTH)>>7,o=u&K.JUMP_TABLE;if(r===0)return o!==0&&t===o?n:-1;if(o){const c=t-o;return c<0||c>=r?-1:e[n+c]-1}let i=n,a=i+r-1;for(;i<=a;){const c=i+a>>>1,s=e[c];if(s<t)i=c+1;else if(s>t)a=c-1;else return e[c+r]}return-1}const At=cn(mt);cn(gt);function sn(e,u=W.Legacy){return At(e,u)}function Ft(e){return Object.prototype.toString.call(e)}function pu(e){return Ft(e)==="[object String]"}const St=Object.prototype.hasOwnProperty;function Tt(e,u){return St.call(e,u)}function Re(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(t){e[t]=n[t]})}}),e}function ln(e,u,n){return[].concat(e.slice(0,u),n,e.slice(u+1))}function mu(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Me(e){if(e>65535){e-=65536;const u=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(u,n)}return String.fromCharCode(e)}const dn=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Mt=/&([a-z#][a-z0-9]{1,31});/gi,zt=new RegExp(dn.source+"|"+Mt.source,"gi"),It=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Pt(e,u){if(u.charCodeAt(0)===35&&It.test(u)){const t=u[1].toLowerCase()==="x"?parseInt(u.slice(2),16):parseInt(u.slice(1),10);return mu(t)?Me(t):e}const n=sn(e);return n!==e?n:e}function Bt(e){return e.indexOf("\\")<0?e:e.replace(dn,"$1")}function ae(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(zt,function(u,n,t){return n||Pt(u,t)})}const Rt=/[&<>"]/,Lt=/[&<>"]/g,Ot={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function qt(e){return Ot[e]}function Q(e){return Rt.test(e)?e.replace(Lt,qt):e}const jt=/[.?*+^$[\]\\(){}|-]/g;function Nt(e){return e.replace(jt,"\\$&")}function C(e){switch(e){case 9:case 32:return!0}return!1}function ge(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function ke(e){return bu.test(e)||on.test(e)}function xe(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Le(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}const $t={mdurl:ht,ucmicro:pt},Ht=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:ln,assign:Re,escapeHtml:Q,escapeRE:Nt,fromCodePoint:Me,has:Tt,isMdAsciiPunct:xe,isPunctChar:ke,isSpace:C,isString:pu,isValidEntityCode:mu,isWhiteSpace:ge,lib:$t,normalizeReference:Le,unescapeAll:ae,unescapeMd:Bt},Symbol.toStringTag,{value:"Module"}));function Gt(e,u,n){let t,r,o,i;const a=e.posMax,c=e.pos;for(e.pos=u+1,t=1;e.pos<a;){if(o=e.src.charCodeAt(e.pos),o===93&&(t--,t===0)){r=!0;break}if(i=e.pos,e.md.inline.skipToken(e),o===91){if(i===e.pos-1)t++;else if(n)return e.pos=c,-1}}let s=-1;return r&&(s=e.pos),e.pos=c,s}function Ut(e,u,n){let t,r=u;const o={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<n;){if(t=e.charCodeAt(r),t===10||t===60)return o;if(t===62)return o.pos=r+1,o.str=ae(e.slice(u+1,r)),o.ok=!0,o;if(t===92&&r+1<n){r+=2;continue}r++}return o}let i=0;for(;r<n&&(t=e.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<n){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(i++,i>32))return o;if(t===41){if(i===0)break;i--}r++}return u===r||i!==0||(o.str=ae(e.slice(u,r)),o.pos=r,o.ok=!0),o}function Zt(e,u,n,t){let r,o=u;const i={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)i.str=t.str,i.marker=t.marker;else{if(o>=n)return i;let a=e.charCodeAt(o);if(a!==34&&a!==39&&a!==40)return i;u++,o++,a===40&&(a=41),i.marker=a}for(;o<n;){if(r=e.charCodeAt(o),r===i.marker)return i.pos=o+1,i.str+=ae(e.slice(u,o)),i.ok=!0,i;if(r===40&&i.marker===41)return i;r===92&&o+1<n&&o++,o++}return i.can_continue=!0,i.str+=ae(e.slice(u,o)),i}const Vt=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Ut,parseLinkLabel:Gt,parseLinkTitle:Zt},Symbol.toStringTag,{value:"Module"})),N={};N.code_inline=function(e,u,n,t,r){const o=e[u];return"<code"+r.renderAttrs(o)+">"+Q(o.content)+"</code>"};N.code_block=function(e,u,n,t,r){const o=e[u];return"<pre"+r.renderAttrs(o)+"><code>"+Q(e[u].content)+`</code></pre>
`};N.fence=function(e,u,n,t,r){const o=e[u],i=o.info?ae(o.info).trim():"";let a="",c="";if(i){const l=i.split(/(\s+)/g);a=l[0],c=l.slice(2).join("")}let s;if(n.highlight?s=n.highlight(o.content,a,c)||Q(o.content):s=Q(o.content),s.indexOf("<pre")===0)return s+`
`;if(i){const l=o.attrIndex("class"),d=o.attrs?o.attrs.slice():[];l<0?d.push(["class",n.langPrefix+a]):(d[l]=d[l].slice(),d[l][1]+=" "+n.langPrefix+a);const b={attrs:d};return`<pre><code${r.renderAttrs(b)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${s}</code></pre>
`};N.image=function(e,u,n,t,r){const o=e[u];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,n,t),r.renderToken(e,u,n)};N.hardbreak=function(e,u,n){return n.xhtmlOut?`<br />
`:`<br>
`};N.softbreak=function(e,u,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};N.text=function(e,u){return Q(e[u].content)};N.html_block=function(e,u){return e[u].content};N.html_inline=function(e,u){return e[u].content};function se(){this.rules=Re({},N)}se.prototype.renderAttrs=function(u){let n,t,r;if(!u.attrs)return"";for(r="",n=0,t=u.attrs.length;n<t;n++)r+=" "+Q(u.attrs[n][0])+'="'+Q(u.attrs[n][1])+'"';return r};se.prototype.renderToken=function(u,n,t){const r=u[n];let o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&n&&u[n-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(o+=" /");let i=!1;if(r.block&&(i=!0,r.nesting===1&&n+1<u.length)){const a=u[n+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===r.tag)&&(i=!1)}return o+=i?`>
`:">",o};se.prototype.renderInline=function(e,u,n){let t="";const r=this.rules;for(let o=0,i=e.length;o<i;o++){const a=e[o].type;typeof r[a]<"u"?t+=r[a](e,o,u,n,this):t+=this.renderToken(e,o,u)}return t};se.prototype.renderInlineAsText=function(e,u,n){let t="";for(let r=0,o=e.length;r<o;r++)switch(e[r].type){case"text":t+=e[r].content;break;case"image":t+=this.renderInlineAsText(e[r].children,u,n);break;case"html_inline":case"html_block":t+=e[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t};se.prototype.render=function(e,u,n){let t="";const r=this.rules;for(let o=0,i=e.length;o<i;o++){const a=e[o].type;a==="inline"?t+=this.renderInline(e[o].children,u,n):typeof r[a]<"u"?t+=r[a](e,o,u,n,this):t+=this.renderToken(e,o,u,n)}return t};function I(){this.__rules__=[],this.__cache__=null}I.prototype.__find__=function(e){for(let u=0;u<this.__rules__.length;u++)if(this.__rules__[u].name===e)return u;return-1};I.prototype.__compile__=function(){const e=this,u=[""];e.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(t){u.indexOf(t)<0&&u.push(t)})}),e.__cache__={},u.forEach(function(n){e.__cache__[n]=[],e.__rules__.forEach(function(t){t.enabled&&(n&&t.alt.indexOf(n)<0||e.__cache__[n].push(t.fn))})})};I.prototype.at=function(e,u,n){const t=this.__find__(e),r=n||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__[t].fn=u,this.__rules__[t].alt=r.alt||[],this.__cache__=null};I.prototype.before=function(e,u,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:u,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};I.prototype.after=function(e,u,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:u,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};I.prototype.push=function(e,u,n){const t=n||{};this.__rules__.push({name:e,enabled:!0,fn:u,alt:t.alt||[]}),this.__cache__=null};I.prototype.enable=function(e,u){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,n.push(t)},this),this.__cache__=null,n};I.prototype.enableOnly=function(e,u){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(e,u)};I.prototype.disable=function(e,u){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,n.push(t)},this),this.__cache__=null,n};I.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function O(e,u,n){this.type=e,this.tag=u,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}O.prototype.attrIndex=function(u){if(!this.attrs)return-1;const n=this.attrs;for(let t=0,r=n.length;t<r;t++)if(n[t][0]===u)return t;return-1};O.prototype.attrPush=function(u){this.attrs?this.attrs.push(u):this.attrs=[u]};O.prototype.attrSet=function(u,n){const t=this.attrIndex(u),r=[u,n];t<0?this.attrPush(r):this.attrs[t]=r};O.prototype.attrGet=function(u){const n=this.attrIndex(u);let t=null;return n>=0&&(t=this.attrs[n][1]),t};O.prototype.attrJoin=function(u,n){const t=this.attrIndex(u);t<0?this.attrPush([u,n]):this.attrs[t][1]=this.attrs[t][1]+" "+n};function fn(e,u,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=u}fn.prototype.Token=O;const Wt=/\r\n?|\n/g,Kt=/\0/g;function Jt(e){let u;u=e.src.replace(Wt,`
`),u=u.replace(Kt,"�"),e.src=u}function Qt(e){let u;e.inlineMode?(u=new e.Token("inline","",0),u.content=e.src,u.map=[0,1],u.children=[],e.tokens.push(u)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Xt(e){const u=e.tokens;for(let n=0,t=u.length;n<t;n++){const r=u[n];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function Yt(e){return/^<a[>\s]/i.test(e)}function er(e){return/^<\/a\s*>/i.test(e)}function ur(e){const u=e.tokens;if(e.md.options.linkify)for(let n=0,t=u.length;n<t;n++){if(u[n].type!=="inline"||!e.md.linkify.pretest(u[n].content))continue;let r=u[n].children,o=0;for(let i=r.length-1;i>=0;i--){const a=r[i];if(a.type==="link_close"){for(i--;r[i].level!==a.level&&r[i].type!=="link_open";)i--;continue}if(a.type==="html_inline"&&(Yt(a.content)&&o>0&&o--,er(a.content)&&o++),!(o>0)&&a.type==="text"&&e.md.linkify.test(a.content)){const c=a.content;let s=e.md.linkify.match(c);const l=[];let d=a.level,b=0;s.length>0&&s[0].index===0&&i>0&&r[i-1].type==="text_special"&&(s=s.slice(1));for(let h=0;h<s.length;h++){const f=s[h].url,p=e.md.normalizeLink(f);if(!e.md.validateLink(p))continue;let g=s[h].text;s[h].schema?s[h].schema==="mailto:"&&!/^mailto:/i.test(g)?g=e.md.normalizeLinkText("mailto:"+g).replace(/^mailto:/,""):g=e.md.normalizeLinkText(g):g=e.md.normalizeLinkText("http://"+g).replace(/^http:\/\//,"");const y=s[h].index;if(y>b){const w=new e.Token("text","",0);w.content=c.slice(b,y),w.level=d,l.push(w)}const m=new e.Token("link_open","a",1);m.attrs=[["href",p]],m.level=d++,m.markup="linkify",m.info="auto",l.push(m);const x=new e.Token("text","",0);x.content=g,x.level=d,l.push(x);const k=new e.Token("link_close","a",-1);k.level=--d,k.markup="linkify",k.info="auto",l.push(k),b=s[h].lastIndex}if(b<c.length){const h=new e.Token("text","",0);h.content=c.slice(b),h.level=d,l.push(h)}u[n].children=r=ln(r,i,l)}}}}const hn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,nr=/\((c|tm|r)\)/i,tr=/\((c|tm|r)\)/ig,rr={c:"©",r:"®",tm:"™"};function or(e,u){return rr[u.toLowerCase()]}function ar(e){let u=0;for(let n=e.length-1;n>=0;n--){const t=e[n];t.type==="text"&&!u&&(t.content=t.content.replace(tr,or)),t.type==="link_open"&&t.info==="auto"&&u--,t.type==="link_close"&&t.info==="auto"&&u++}}function ir(e){let u=0;for(let n=e.length-1;n>=0;n--){const t=e[n];t.type==="text"&&!u&&hn.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&u--,t.type==="link_close"&&t.info==="auto"&&u++}}function cr(e){let u;if(e.md.options.typographer)for(u=e.tokens.length-1;u>=0;u--)e.tokens[u].type==="inline"&&(nr.test(e.tokens[u].content)&&ar(e.tokens[u].children),hn.test(e.tokens[u].content)&&ir(e.tokens[u].children))}const sr=/['"]/,Pu=/['"]/g,Bu="’";function De(e,u,n){return e.slice(0,u)+n+e.slice(u+1)}function lr(e,u){let n;const t=[];for(let r=0;r<e.length;r++){const o=e[r],i=e[r].level;for(n=t.length-1;n>=0&&!(t[n].level<=i);n--);if(t.length=n+1,o.type!=="text")continue;let a=o.content,c=0,s=a.length;e:for(;c<s;){Pu.lastIndex=c;const l=Pu.exec(a);if(!l)break;let d=!0,b=!0;c=l.index+1;const h=l[0]==="'";let f=32;if(l.index-1>=0)f=a.charCodeAt(l.index-1);else for(n=r-1;n>=0&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n--)if(e[n].content){f=e[n].content.charCodeAt(e[n].content.length-1);break}let p=32;if(c<s)p=a.charCodeAt(c);else for(n=r+1;n<e.length&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n++)if(e[n].content){p=e[n].content.charCodeAt(0);break}const g=xe(f)||ke(String.fromCharCode(f)),y=xe(p)||ke(String.fromCharCode(p)),m=ge(f),x=ge(p);if(x?d=!1:y&&(m||g||(d=!1)),m?b=!1:g&&(x||y||(b=!1)),p===34&&l[0]==='"'&&f>=48&&f<=57&&(b=d=!1),d&&b&&(d=g,b=y),!d&&!b){h&&(o.content=De(o.content,l.index,Bu));continue}if(b)for(n=t.length-1;n>=0;n--){let k=t[n];if(t[n].level<i)break;if(k.single===h&&t[n].level===i){k=t[n];let w,_;h?(w=u.md.options.quotes[2],_=u.md.options.quotes[3]):(w=u.md.options.quotes[0],_=u.md.options.quotes[1]),o.content=De(o.content,l.index,_),e[k.token].content=De(e[k.token].content,k.pos,w),c+=_.length-1,k.token===r&&(c+=w.length-1),a=o.content,s=a.length,t.length=n;continue e}}d?t.push({token:r,pos:l.index,single:h,level:i}):b&&h&&(o.content=De(o.content,l.index,Bu))}}}function dr(e){if(e.md.options.typographer)for(let u=e.tokens.length-1;u>=0;u--)e.tokens[u].type!=="inline"||!sr.test(e.tokens[u].content)||lr(e.tokens[u].children,e)}function fr(e){let u,n;const t=e.tokens,r=t.length;for(let o=0;o<r;o++){if(t[o].type!=="inline")continue;const i=t[o].children,a=i.length;for(u=0;u<a;u++)i[u].type==="text_special"&&(i[u].type="text");for(u=n=0;u<a;u++)i[u].type==="text"&&u+1<a&&i[u+1].type==="text"?i[u+1].content=i[u].content+i[u+1].content:(u!==n&&(i[n]=i[u]),n++);u!==n&&(i.length=n)}}const We=[["normalize",Jt],["block",Qt],["inline",Xt],["linkify",ur],["replacements",cr],["smartquotes",dr],["text_join",fr]];function gu(){this.ruler=new I;for(let e=0;e<We.length;e++)this.ruler.push(We[e][0],We[e][1])}gu.prototype.process=function(e){const u=this.ruler.getRules("");for(let n=0,t=u.length;n<t;n++)u[n](e)};gu.prototype.State=fn;function $(e,u,n,t){this.src=e,this.md=u,this.env=n,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let o=0,i=0,a=0,c=0,s=r.length,l=!1;i<s;i++){const d=r.charCodeAt(i);if(!l)if(C(d)){a++,d===9?c+=4-c%4:c++;continue}else l=!0;(d===10||i===s-1)&&(d!==10&&i++,this.bMarks.push(o),this.eMarks.push(i),this.tShift.push(a),this.sCount.push(c),this.bsCount.push(0),l=!1,a=0,c=0,o=i+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}$.prototype.push=function(e,u,n){const t=new O(e,u,n);return t.block=!0,n<0&&this.level--,t.level=this.level,n>0&&this.level++,this.tokens.push(t),t};$.prototype.isEmpty=function(u){return this.bMarks[u]+this.tShift[u]>=this.eMarks[u]};$.prototype.skipEmptyLines=function(u){for(let n=this.lineMax;u<n&&!(this.bMarks[u]+this.tShift[u]<this.eMarks[u]);u++);return u};$.prototype.skipSpaces=function(u){for(let n=this.src.length;u<n;u++){const t=this.src.charCodeAt(u);if(!C(t))break}return u};$.prototype.skipSpacesBack=function(u,n){if(u<=n)return u;for(;u>n;)if(!C(this.src.charCodeAt(--u)))return u+1;return u};$.prototype.skipChars=function(u,n){for(let t=this.src.length;u<t&&this.src.charCodeAt(u)===n;u++);return u};$.prototype.skipCharsBack=function(u,n,t){if(u<=t)return u;for(;u>t;)if(n!==this.src.charCodeAt(--u))return u+1;return u};$.prototype.getLines=function(u,n,t,r){if(u>=n)return"";const o=new Array(n-u);for(let i=0,a=u;a<n;a++,i++){let c=0;const s=this.bMarks[a];let l=s,d;for(a+1<n||r?d=this.eMarks[a]+1:d=this.eMarks[a];l<d&&c<t;){const b=this.src.charCodeAt(l);if(C(b))b===9?c+=4-(c+this.bsCount[a])%4:c++;else if(l-s<this.tShift[a])c++;else break;l++}c>t?o[i]=new Array(c-t+1).join(" ")+this.src.slice(l,d):o[i]=this.src.slice(l,d)}return o.join("")};$.prototype.Token=O;const hr=65536;function Ke(e,u){const n=e.bMarks[u]+e.tShift[u],t=e.eMarks[u];return e.src.slice(n,t)}function Ru(e){const u=[],n=e.length;let t=0,r=e.charCodeAt(t),o=!1,i=0,a="";for(;t<n;)r===124&&(o?(a+=e.substring(i,t-1),i=t):(u.push(a+e.substring(i,t)),a="",i=t+1)),o=r===92,t++,r=e.charCodeAt(t);return u.push(a+e.substring(i)),u}function br(e,u,n,t){if(u+2>n)return!1;let r=u+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let o=e.bMarks[r]+e.tShift[r];if(o>=e.eMarks[r])return!1;const i=e.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58||o>=e.eMarks[r])return!1;const a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58&&!C(a)||i===45&&C(a))return!1;for(;o<e.eMarks[r];){const k=e.src.charCodeAt(o);if(k!==124&&k!==45&&k!==58&&!C(k))return!1;o++}let c=Ke(e,u+1),s=c.split("|");const l=[];for(let k=0;k<s.length;k++){const w=s[k].trim();if(!w){if(k===0||k===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(w))return!1;w.charCodeAt(w.length-1)===58?l.push(w.charCodeAt(0)===58?"center":"right"):w.charCodeAt(0)===58?l.push("left"):l.push("")}if(c=Ke(e,u).trim(),c.indexOf("|")===-1||e.sCount[u]-e.blkIndent>=4)return!1;s=Ru(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const d=s.length;if(d===0||d!==l.length)return!1;if(t)return!0;const b=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),f=e.push("table_open","table",1),p=[u,0];f.map=p;const g=e.push("thead_open","thead",1);g.map=[u,u+1];const y=e.push("tr_open","tr",1);y.map=[u,u+1];for(let k=0;k<s.length;k++){const w=e.push("th_open","th",1);l[k]&&(w.attrs=[["style","text-align:"+l[k]]]);const _=e.push("inline","",0);_.content=s[k].trim(),_.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let m,x=0;for(r=u+2;r<n&&!(e.sCount[r]<e.blkIndent);r++){let k=!1;for(let _=0,D=h.length;_<D;_++)if(h[_](e,r,n,!0)){k=!0;break}if(k||(c=Ke(e,r).trim(),!c)||e.sCount[r]-e.blkIndent>=4||(s=Ru(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),x+=d-s.length,x>hr))break;if(r===u+2){const _=e.push("tbody_open","tbody",1);_.map=m=[u+2,0]}const w=e.push("tr_open","tr",1);w.map=[r,r+1];for(let _=0;_<d;_++){const D=e.push("td_open","td",1);l[_]&&(D.attrs=[["style","text-align:"+l[_]]]);const z=e.push("inline","",0);z.content=s[_]?s[_].trim():"",z.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return m&&(e.push("tbody_close","tbody",-1),m[1]=r),e.push("table_close","table",-1),p[1]=r,e.parentType=b,e.line=r,!0}function pr(e,u,n){if(e.sCount[u]-e.blkIndent<4)return!1;let t=u+1,r=t;for(;t<n;){if(e.isEmpty(t)){t++;continue}if(e.sCount[t]-e.blkIndent>=4){t++,r=t;continue}break}e.line=r;const o=e.push("code_block","code",0);return o.content=e.getLines(u,r,4+e.blkIndent,!1)+`
`,o.map=[u,e.line],!0}function mr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||r+3>o)return!1;const i=e.src.charCodeAt(r);if(i!==126&&i!==96)return!1;let a=r;r=e.skipChars(r,i);let c=r-a;if(c<3)return!1;const s=e.src.slice(a,r),l=e.src.slice(r,o);if(i===96&&l.indexOf(String.fromCharCode(i))>=0)return!1;if(t)return!0;let d=u,b=!1;for(;d++,!(d>=n||(r=a=e.bMarks[d]+e.tShift[d],o=e.eMarks[d],r<o&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(r)===i&&!(e.sCount[d]-e.blkIndent>=4)&&(r=e.skipChars(r,i),!(r-a<c)&&(r=e.skipSpaces(r),!(r<o)))){b=!0;break}c=e.sCount[u],e.line=d+(b?1:0);const h=e.push("fence","code",0);return h.info=l,h.content=e.getLines(u+1,d,c,!0),h.markup=s,h.map=[u,e.line],!0}function gr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];const i=e.lineMax;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(t)return!0;const a=[],c=[],s=[],l=[],d=e.md.block.ruler.getRules("blockquote"),b=e.parentType;e.parentType="blockquote";let h=!1,f;for(f=u;f<n;f++){const x=e.sCount[f]<e.blkIndent;if(r=e.bMarks[f]+e.tShift[f],o=e.eMarks[f],r>=o)break;if(e.src.charCodeAt(r++)===62&&!x){let w=e.sCount[f]+1,_,D;e.src.charCodeAt(r)===32?(r++,w++,D=!1,_=!0):e.src.charCodeAt(r)===9?(_=!0,(e.bsCount[f]+w)%4===3?(r++,w++,D=!1):D=!0):_=!1;let z=w;for(a.push(e.bMarks[f]),e.bMarks[f]=r;r<o;){const Z=e.src.charCodeAt(r);if(C(Z))Z===9?z+=4-(z+e.bsCount[f]+(D?1:0))%4:z++;else break;r++}h=r>=o,c.push(e.bsCount[f]),e.bsCount[f]=e.sCount[f]+1+(_?1:0),s.push(e.sCount[f]),e.sCount[f]=z-w,l.push(e.tShift[f]),e.tShift[f]=r-e.bMarks[f];continue}if(h)break;let k=!1;for(let w=0,_=d.length;w<_;w++)if(d[w](e,f,n,!0)){k=!0;break}if(k){e.lineMax=f,e.blkIndent!==0&&(a.push(e.bMarks[f]),c.push(e.bsCount[f]),l.push(e.tShift[f]),s.push(e.sCount[f]),e.sCount[f]-=e.blkIndent);break}a.push(e.bMarks[f]),c.push(e.bsCount[f]),l.push(e.tShift[f]),s.push(e.sCount[f]),e.sCount[f]=-1}const p=e.blkIndent;e.blkIndent=0;const g=e.push("blockquote_open","blockquote",1);g.markup=">";const y=[u,0];g.map=y,e.md.block.tokenize(e,u,f);const m=e.push("blockquote_close","blockquote",-1);m.markup=">",e.lineMax=i,e.parentType=b,y[1]=e.line;for(let x=0;x<l.length;x++)e.bMarks[x+u]=a[x],e.tShift[x+u]=l[x],e.sCount[x+u]=s[x],e.bsCount[x+u]=c[x];return e.blkIndent=p,!0}function kr(e,u,n,t){const r=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let o=e.bMarks[u]+e.tShift[u];const i=e.src.charCodeAt(o++);if(i!==42&&i!==45&&i!==95)return!1;let a=1;for(;o<r;){const s=e.src.charCodeAt(o++);if(s!==i&&!C(s))return!1;s===i&&a++}if(a<3)return!1;if(t)return!0;e.line=u+1;const c=e.push("hr","hr",0);return c.map=[u,e.line],c.markup=Array(a+1).join(String.fromCharCode(i)),!0}function Lu(e,u){const n=e.eMarks[u];let t=e.bMarks[u]+e.tShift[u];const r=e.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<n){const o=e.src.charCodeAt(t);if(!C(o))return-1}return t}function Ou(e,u){const n=e.bMarks[u]+e.tShift[u],t=e.eMarks[u];let r=n;if(r+1>=t)return-1;let o=e.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=t)return-1;if(o=e.src.charCodeAt(r++),o>=48&&o<=57){if(r-n>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<t&&(o=e.src.charCodeAt(r),!C(o))?-1:r}function xr(e,u){const n=e.level+2;for(let t=u+2,r=e.tokens.length-2;t<r;t++)e.tokens[t].level===n&&e.tokens[t].type==="paragraph_open"&&(e.tokens[t+2].hidden=!0,e.tokens[t].hidden=!0,t+=2)}function yr(e,u,n,t){let r,o,i,a,c=u,s=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let l=!1;t&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(l=!0);let d,b,h;if((h=Ou(e,c))>=0){if(d=!0,i=e.bMarks[c]+e.tShift[c],b=Number(e.src.slice(i,h-1)),l&&b!==1)return!1}else if((h=Lu(e,c))>=0)d=!1;else return!1;if(l&&e.skipSpaces(h)>=e.eMarks[c])return!1;if(t)return!0;const f=e.src.charCodeAt(h-1),p=e.tokens.length;d?(a=e.push("ordered_list_open","ol",1),b!==1&&(a.attrs=[["start",b]])):a=e.push("bullet_list_open","ul",1);const g=[c,0];a.map=g,a.markup=String.fromCharCode(f);let y=!1;const m=e.md.block.ruler.getRules("list"),x=e.parentType;for(e.parentType="list";c<n;){o=h,r=e.eMarks[c];const k=e.sCount[c]+h-(e.bMarks[c]+e.tShift[c]);let w=k;for(;o<r;){const ue=e.src.charCodeAt(o);if(ue===9)w+=4-(w+e.bsCount[c])%4;else if(ue===32)w++;else break;o++}const _=o;let D;_>=r?D=1:D=w-k,D>4&&(D=1);const z=k+D;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(f);const Z=[c,0];a.map=Z,d&&(a.info=e.src.slice(i,h-1));const de=e.tight,Ue=e.tShift[c],Zn=e.sCount[c],Vn=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=z,e.tight=!0,e.tShift[c]=_-e.bMarks[c],e.sCount[c]=w,_>=r&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n,!0),(!e.tight||y)&&(s=!1),y=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Vn,e.tShift[c]=Ue,e.sCount[c]=Zn,e.tight=de,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(f),c=e.line,Z[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let Eu=!1;for(let ue=0,Wn=m.length;ue<Wn;ue++)if(m[ue](e,c,n,!0)){Eu=!0;break}if(Eu)break;if(d){if(h=Ou(e,c),h<0)break;i=e.bMarks[c]+e.tShift[c]}else if(h=Lu(e,c),h<0)break;if(f!==e.src.charCodeAt(h-1))break}return d?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(f),g[1]=c,e.line=c,e.parentType=x,s&&xr(e,p),!0}function wr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u],i=u+1;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function a(m){const x=e.lineMax;if(m>=x||e.isEmpty(m))return null;let k=!1;if(e.sCount[m]-e.blkIndent>3&&(k=!0),e.sCount[m]<0&&(k=!0),!k){const D=e.md.block.ruler.getRules("reference"),z=e.parentType;e.parentType="reference";let Z=!1;for(let de=0,Ue=D.length;de<Ue;de++)if(D[de](e,m,x,!0)){Z=!0;break}if(e.parentType=z,Z)return null}const w=e.bMarks[m]+e.tShift[m],_=e.eMarks[m];return e.src.slice(w,_+1)}let c=e.src.slice(r,o+1);o=c.length;let s=-1;for(r=1;r<o;r++){const m=c.charCodeAt(r);if(m===91)return!1;if(m===93){s=r;break}else if(m===10){const x=a(i);x!==null&&(c+=x,o=c.length,i++)}else if(m===92&&(r++,r<o&&c.charCodeAt(r)===10)){const x=a(i);x!==null&&(c+=x,o=c.length,i++)}}if(s<0||c.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<o;r++){const m=c.charCodeAt(r);if(m===10){const x=a(i);x!==null&&(c+=x,o=c.length,i++)}else if(!C(m))break}const l=e.md.helpers.parseLinkDestination(c,r,o);if(!l.ok)return!1;const d=e.md.normalizeLink(l.str);if(!e.md.validateLink(d))return!1;r=l.pos;const b=r,h=i,f=r;for(;r<o;r++){const m=c.charCodeAt(r);if(m===10){const x=a(i);x!==null&&(c+=x,o=c.length,i++)}else if(!C(m))break}let p=e.md.helpers.parseLinkTitle(c,r,o);for(;p.can_continue;){const m=a(i);if(m===null)break;c+=m,r=o,o=c.length,i++,p=e.md.helpers.parseLinkTitle(c,r,o,p)}let g;for(r<o&&f!==r&&p.ok?(g=p.str,r=p.pos):(g="",r=b,i=h);r<o;){const m=c.charCodeAt(r);if(!C(m))break;r++}if(r<o&&c.charCodeAt(r)!==10&&g)for(g="",r=b,i=h;r<o;){const m=c.charCodeAt(r);if(!C(m))break;r++}if(r<o&&c.charCodeAt(r)!==10)return!1;const y=Le(c.slice(1,s));return y?(t||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[y]>"u"&&(e.env.references[y]={title:g,href:d}),e.line=i),!0):!1}const _r=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Cr="[a-zA-Z_:][a-zA-Z0-9:._-]*",vr="[^\"'=<>`\\x00-\\x20]+",Er="'[^']*'",Dr='"[^"]*"',Ar="(?:"+vr+"|"+Er+"|"+Dr+")",Fr="(?:\\s+"+Cr+"(?:\\s*=\\s*"+Ar+")?)",bn="<[A-Za-z][A-Za-z0-9\\-]*"+Fr+"*\\s*\\/?>",pn="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Sr="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Tr="<[?][\\s\\S]*?[?]>",Mr="<![A-Za-z][^>]*>",zr="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ir=new RegExp("^(?:"+bn+"|"+pn+"|"+Sr+"|"+Tr+"|"+Mr+"|"+zr+")"),Pr=new RegExp("^(?:"+bn+"|"+pn+")"),ne=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+_r.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Pr.source+"\\s*$"),/^$/,!1]];function Br(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let i=e.src.slice(r,o),a=0;for(;a<ne.length&&!ne[a][0].test(i);a++);if(a===ne.length)return!1;if(t)return ne[a][2];let c=u+1;if(!ne[a][1].test(i)){for(;c<n&&!(e.sCount[c]<e.blkIndent);c++)if(r=e.bMarks[c]+e.tShift[c],o=e.eMarks[c],i=e.src.slice(r,o),ne[a][1].test(i)){i.length!==0&&c++;break}}e.line=c;const s=e.push("html_block","",0);return s.map=[u,c],s.content=e.getLines(u,c,e.blkIndent,!0),!0}function Rr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let i=e.src.charCodeAt(r);if(i!==35||r>=o)return!1;let a=1;for(i=e.src.charCodeAt(++r);i===35&&r<o&&a<=6;)a++,i=e.src.charCodeAt(++r);if(a>6||r<o&&!C(i))return!1;if(t)return!0;o=e.skipSpacesBack(o,r);const c=e.skipCharsBack(o,35,r);c>r&&C(e.src.charCodeAt(c-1))&&(o=c),e.line=u+1;const s=e.push("heading_open","h"+String(a),1);s.markup="########".slice(0,a),s.map=[u,e.line];const l=e.push("inline","",0);l.content=e.src.slice(r,o).trim(),l.map=[u,e.line],l.children=[];const d=e.push("heading_close","h"+String(a),-1);return d.markup="########".slice(0,a),!0}function Lr(e,u,n){const t=e.md.block.ruler.getRules("paragraph");if(e.sCount[u]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let o=0,i,a=u+1;for(;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let h=e.bMarks[a]+e.tShift[a];const f=e.eMarks[a];if(h<f&&(i=e.src.charCodeAt(h),(i===45||i===61)&&(h=e.skipChars(h,i),h=e.skipSpaces(h),h>=f))){o=i===61?1:2;break}}if(e.sCount[a]<0)continue;let b=!1;for(let h=0,f=t.length;h<f;h++)if(t[h](e,a,n,!0)){b=!0;break}if(b)break}if(!o)return!1;const c=e.getLines(u,a,e.blkIndent,!1).trim();e.line=a+1;const s=e.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(i),s.map=[u,e.line];const l=e.push("inline","",0);l.content=c,l.map=[u,e.line-1],l.children=[];const d=e.push("heading_close","h"+String(o),-1);return d.markup=String.fromCharCode(i),e.parentType=r,!0}function Or(e,u,n){const t=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let o=u+1;for(e.parentType="paragraph";o<n&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let s=!1;for(let l=0,d=t.length;l<d;l++)if(t[l](e,o,n,!0)){s=!0;break}if(s)break}const i=e.getLines(u,o,e.blkIndent,!1).trim();e.line=o;const a=e.push("paragraph_open","p",1);a.map=[u,e.line];const c=e.push("inline","",0);return c.content=i,c.map=[u,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const Ae=[["table",br,["paragraph","reference"]],["code",pr],["fence",mr,["paragraph","reference","blockquote","list"]],["blockquote",gr,["paragraph","reference","blockquote","list"]],["hr",kr,["paragraph","reference","blockquote","list"]],["list",yr,["paragraph","reference","blockquote"]],["reference",wr],["html_block",Br,["paragraph","reference","blockquote"]],["heading",Rr,["paragraph","reference","blockquote"]],["lheading",Lr],["paragraph",Or]];function Oe(){this.ruler=new I;for(let e=0;e<Ae.length;e++)this.ruler.push(Ae[e][0],Ae[e][1],{alt:(Ae[e][2]||[]).slice()})}Oe.prototype.tokenize=function(e,u,n){const t=this.ruler.getRules(""),r=t.length,o=e.md.options.maxNesting;let i=u,a=!1;for(;i<n&&(e.line=i=e.skipEmptyLines(i),!(i>=n||e.sCount[i]<e.blkIndent));){if(e.level>=o){e.line=n;break}const c=e.line;let s=!1;for(let l=0;l<r;l++)if(s=t[l](e,i,n,!1),s){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),i=e.line,i<n&&e.isEmpty(i)&&(a=!0,i++,e.line=i)}};Oe.prototype.parse=function(e,u,n,t){if(!e)return;const r=new this.State(e,u,n,t);this.tokenize(r,r.line,r.lineMax)};Oe.prototype.State=$;function _e(e,u,n,t){this.src=e,this.env=n,this.md=u,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}_e.prototype.pushPending=function(){const e=new O("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};_e.prototype.push=function(e,u,n){this.pending&&this.pushPending();const t=new O(e,u,n);let r=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t};_e.prototype.scanDelims=function(e,u){const n=this.posMax,t=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32;let o=e;for(;o<n&&this.src.charCodeAt(o)===t;)o++;const i=o-e,a=o<n?this.src.charCodeAt(o):32,c=xe(r)||ke(String.fromCharCode(r)),s=xe(a)||ke(String.fromCharCode(a)),l=ge(r),d=ge(a),b=!d&&(!s||l||c),h=!l&&(!c||d||s);return{can_open:b&&(u||!h||c),can_close:h&&(u||!b||s),length:i}};_e.prototype.Token=O;function qr(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function jr(e,u){let n=e.pos;for(;n<e.posMax&&!qr(e.src.charCodeAt(n));)n++;return n===e.pos?!1:(u||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}const Nr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function $r(e,u){if(!e.md.options.linkify||e.linkLevel>0)return!1;const n=e.pos,t=e.posMax;if(n+3>t||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;const r=e.pending.match(Nr);if(!r)return!1;const o=r[1],i=e.md.linkify.matchAtStart(e.src.slice(n-o.length));if(!i)return!1;let a=i.url;if(a.length<=o.length)return!1;let c=a.length;for(;c>0&&a.charCodeAt(c-1)===42;)c--;c!==a.length&&(a=a.slice(0,c));const s=e.md.normalizeLink(a);if(!e.md.validateLink(s))return!1;if(!u){e.pending=e.pending.slice(0,-o.length);const l=e.push("link_open","a",1);l.attrs=[["href",s]],l.markup="linkify",l.info="auto";const d=e.push("text","",0);d.content=e.md.normalizeLinkText(a);const b=e.push("link_close","a",-1);b.markup="linkify",b.info="auto"}return e.pos+=a.length-o.length,!0}function Hr(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;const t=e.pending.length-1,r=e.posMax;if(!u)if(t>=0&&e.pending.charCodeAt(t)===32)if(t>=1&&e.pending.charCodeAt(t-1)===32){let o=t-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(n++;n<r&&C(e.src.charCodeAt(n));)n++;return e.pos=n,!0}const ku=[];for(let e=0;e<256;e++)ku.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){ku[e.charCodeAt(0)]=1});function Gr(e,u){let n=e.pos;const t=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=t))return!1;let r=e.src.charCodeAt(n);if(r===10){for(u||e.push("hardbreak","br",0),n++;n<t&&(r=e.src.charCodeAt(n),!!C(r));)n++;return e.pos=n,!0}let o=e.src[n];if(r>=55296&&r<=56319&&n+1<t){const a=e.src.charCodeAt(n+1);a>=56320&&a<=57343&&(o+=e.src[n+1],n++)}const i="\\"+o;if(!u){const a=e.push("text_special","",0);r<256&&ku[r]!==0?a.content=o:a.content=i,a.markup=i,a.info="escape"}return e.pos=n+1,!0}function Ur(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;const r=n;n++;const o=e.posMax;for(;n<o&&e.src.charCodeAt(n)===96;)n++;const i=e.src.slice(r,n),a=i.length;if(e.backticksScanned&&(e.backticks[a]||0)<=r)return u||(e.pending+=i),e.pos+=a,!0;let c=n,s;for(;(s=e.src.indexOf("`",c))!==-1;){for(c=s+1;c<o&&e.src.charCodeAt(c)===96;)c++;const l=c-s;if(l===a){if(!u){const d=e.push("code_inline","code",0);d.markup=i,d.content=e.src.slice(n,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[l]=s}return e.backticksScanned=!0,u||(e.pending+=i),e.pos+=a,!0}function Zr(e,u){const n=e.pos,t=e.src.charCodeAt(n);if(u||t!==126)return!1;const r=e.scanDelims(e.pos,!0);let o=r.length;const i=String.fromCharCode(t);if(o<2)return!1;let a;o%2&&(a=e.push("text","",0),a.content=i,o--);for(let c=0;c<o;c+=2)a=e.push("text","",0),a.content=i+i,e.delimiters.push({marker:t,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function qu(e,u){let n;const t=[],r=u.length;for(let o=0;o<r;o++){const i=u[o];if(i.marker!==126||i.end===-1)continue;const a=u[i.end];n=e.tokens[i.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=e.tokens[a.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&t.push(a.token-1)}for(;t.length;){const o=t.pop();let i=o+1;for(;i<e.tokens.length&&e.tokens[i].type==="s_close";)i++;i--,o!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[o],e.tokens[o]=n)}}function Vr(e){const u=e.tokens_meta,n=e.tokens_meta.length;qu(e,e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&qu(e,u[t].delimiters)}const mn={tokenize:Zr,postProcess:Vr};function Wr(e,u){const n=e.pos,t=e.src.charCodeAt(n);if(u||t!==95&&t!==42)return!1;const r=e.scanDelims(e.pos,t===42);for(let o=0;o<r.length;o++){const i=e.push("text","",0);i.content=String.fromCharCode(t),e.delimiters.push({marker:t,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function ju(e,u){const n=u.length;for(let t=n-1;t>=0;t--){const r=u[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const o=u[r.end],i=t>0&&u[t-1].end===r.end+1&&u[t-1].marker===r.marker&&u[t-1].token===r.token-1&&u[r.end+1].token===o.token+1,a=String.fromCharCode(r.marker),c=e.tokens[r.token];c.type=i?"strong_open":"em_open",c.tag=i?"strong":"em",c.nesting=1,c.markup=i?a+a:a,c.content="";const s=e.tokens[o.token];s.type=i?"strong_close":"em_close",s.tag=i?"strong":"em",s.nesting=-1,s.markup=i?a+a:a,s.content="",i&&(e.tokens[u[t-1].token].content="",e.tokens[u[r.end+1].token].content="",t--)}}function Kr(e){const u=e.tokens_meta,n=e.tokens_meta.length;ju(e,e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&ju(e,u[t].delimiters)}const gn={tokenize:Wr,postProcess:Kr};function Jr(e,u){let n,t,r,o,i="",a="",c=e.pos,s=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const l=e.pos,d=e.posMax,b=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let f=h+1;if(f<d&&e.src.charCodeAt(f)===40){for(s=!1,f++;f<d&&(n=e.src.charCodeAt(f),!(!C(n)&&n!==10));f++);if(f>=d)return!1;if(c=f,r=e.md.helpers.parseLinkDestination(e.src,f,e.posMax),r.ok){for(i=e.md.normalizeLink(r.str),e.md.validateLink(i)?f=r.pos:i="",c=f;f<d&&(n=e.src.charCodeAt(f),!(!C(n)&&n!==10));f++);if(r=e.md.helpers.parseLinkTitle(e.src,f,e.posMax),f<d&&c!==f&&r.ok)for(a=r.str,f=r.pos;f<d&&(n=e.src.charCodeAt(f),!(!C(n)&&n!==10));f++);}(f>=d||e.src.charCodeAt(f)!==41)&&(s=!0),f++}if(s){if(typeof e.env.references>"u")return!1;if(f<d&&e.src.charCodeAt(f)===91?(c=f+1,f=e.md.helpers.parseLinkLabel(e,f),f>=0?t=e.src.slice(c,f++):f=h+1):f=h+1,t||(t=e.src.slice(b,h)),o=e.env.references[Le(t)],!o)return e.pos=l,!1;i=o.href,a=o.title}if(!u){e.pos=b,e.posMax=h;const p=e.push("link_open","a",1),g=[["href",i]];p.attrs=g,a&&g.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=f,e.posMax=d,!0}function Qr(e,u){let n,t,r,o,i,a,c,s,l="";const d=e.pos,b=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,f=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(f<0)return!1;if(o=f+1,o<b&&e.src.charCodeAt(o)===40){for(o++;o<b&&(n=e.src.charCodeAt(o),!(!C(n)&&n!==10));o++);if(o>=b)return!1;for(s=o,a=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),a.ok&&(l=e.md.normalizeLink(a.str),e.md.validateLink(l)?o=a.pos:l=""),s=o;o<b&&(n=e.src.charCodeAt(o),!(!C(n)&&n!==10));o++);if(a=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<b&&s!==o&&a.ok)for(c=a.str,o=a.pos;o<b&&(n=e.src.charCodeAt(o),!(!C(n)&&n!==10));o++);else c="";if(o>=b||e.src.charCodeAt(o)!==41)return e.pos=d,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<b&&e.src.charCodeAt(o)===91?(s=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?r=e.src.slice(s,o++):o=f+1):o=f+1,r||(r=e.src.slice(h,f)),i=e.env.references[Le(r)],!i)return e.pos=d,!1;l=i.href,c=i.title}if(!u){t=e.src.slice(h,f);const p=[];e.md.inline.parse(t,e.md,e.env,p);const g=e.push("image","img",0),y=[["src",l],["alt",""]];g.attrs=y,g.children=p,g.content=t,c&&y.push(["title",c])}return e.pos=o,e.posMax=b,!0}const Xr=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Yr=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function eo(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;const t=e.pos,r=e.posMax;for(;;){if(++n>=r)return!1;const i=e.src.charCodeAt(n);if(i===60)return!1;if(i===62)break}const o=e.src.slice(t+1,n);if(Yr.test(o)){const i=e.md.normalizeLink(o);if(!e.md.validateLink(i))return!1;if(!u){const a=e.push("link_open","a",1);a.attrs=[["href",i]],a.markup="autolink",a.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);const s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}if(Xr.test(o)){const i=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(i))return!1;if(!u){const a=e.push("link_open","a",1);a.attrs=[["href",i]],a.markup="autolink",a.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);const s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}return!1}function uo(e){return/^<a[>\s]/i.test(e)}function no(e){return/^<\/a\s*>/i.test(e)}function to(e){const u=e|32;return u>=97&&u<=122}function ro(e,u){if(!e.md.options.html)return!1;const n=e.posMax,t=e.pos;if(e.src.charCodeAt(t)!==60||t+2>=n)return!1;const r=e.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!to(r))return!1;const o=e.src.slice(t).match(Ir);if(!o)return!1;if(!u){const i=e.push("html_inline","",0);i.content=o[0],uo(i.content)&&e.linkLevel++,no(i.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}const oo=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,ao=/^&([a-z][a-z0-9]{1,31});/i;function io(e,u){const n=e.pos,t=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=t)return!1;if(e.src.charCodeAt(n+1)===35){const o=e.src.slice(n).match(oo);if(o){if(!u){const i=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),a=e.push("text_special","",0);a.content=mu(i)?Me(i):Me(65533),a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}else{const o=e.src.slice(n).match(ao);if(o){const i=sn(o[0]);if(i!==o[0]){if(!u){const a=e.push("text_special","",0);a.content=i,a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function Nu(e){const u={},n=e.length;if(!n)return;let t=0,r=-2;const o=[];for(let i=0;i<n;i++){const a=e[i];if(o.push(0),(e[t].marker!==a.marker||r!==a.token-1)&&(t=i),r=a.token,a.length=a.length||0,!a.close)continue;u.hasOwnProperty(a.marker)||(u[a.marker]=[-1,-1,-1,-1,-1,-1]);const c=u[a.marker][(a.open?3:0)+a.length%3];let s=t-o[t]-1,l=s;for(;s>c;s-=o[s]+1){const d=e[s];if(d.marker===a.marker&&d.open&&d.end<0){let b=!1;if((d.close||a.open)&&(d.length+a.length)%3===0&&(d.length%3!==0||a.length%3!==0)&&(b=!0),!b){const h=s>0&&!e[s-1].open?o[s-1]+1:0;o[i]=i-s+h,o[s]=h,a.open=!1,d.end=i,d.close=!1,l=-1,r=-2;break}}}l!==-1&&(u[a.marker][(a.open?3:0)+(a.length||0)%3]=l)}}function co(e){const u=e.tokens_meta,n=e.tokens_meta.length;Nu(e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&Nu(u[t].delimiters)}function so(e){let u,n,t=0;const r=e.tokens,o=e.tokens.length;for(u=n=0;u<o;u++)r[u].nesting<0&&t--,r[u].level=t,r[u].nesting>0&&t++,r[u].type==="text"&&u+1<o&&r[u+1].type==="text"?r[u+1].content=r[u].content+r[u+1].content:(u!==n&&(r[n]=r[u]),n++);u!==n&&(r.length=n)}const Je=[["text",jr],["linkify",$r],["newline",Hr],["escape",Gr],["backticks",Ur],["strikethrough",mn.tokenize],["emphasis",gn.tokenize],["link",Jr],["image",Qr],["autolink",eo],["html_inline",ro],["entity",io]],Qe=[["balance_pairs",co],["strikethrough",mn.postProcess],["emphasis",gn.postProcess],["fragments_join",so]];function Ce(){this.ruler=new I;for(let e=0;e<Je.length;e++)this.ruler.push(Je[e][0],Je[e][1]);this.ruler2=new I;for(let e=0;e<Qe.length;e++)this.ruler2.push(Qe[e][0],Qe[e][1])}Ce.prototype.skipToken=function(e){const u=e.pos,n=this.ruler.getRules(""),t=n.length,r=e.md.options.maxNesting,o=e.cache;if(typeof o[u]<"u"){e.pos=o[u];return}let i=!1;if(e.level<r){for(let a=0;a<t;a++)if(e.level++,i=n[a](e,!0),e.level--,i){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;i||e.pos++,o[u]=e.pos};Ce.prototype.tokenize=function(e){const u=this.ruler.getRules(""),n=u.length,t=e.posMax,r=e.md.options.maxNesting;for(;e.pos<t;){const o=e.pos;let i=!1;if(e.level<r){for(let a=0;a<n;a++)if(i=u[a](e,!1),i){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(i){if(e.pos>=t)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Ce.prototype.parse=function(e,u,n,t){const r=new this.State(e,u,n,t);this.tokenize(r);const o=this.ruler2.getRules(""),i=o.length;for(let a=0;a<i;a++)o[a](r)};Ce.prototype.State=_e;function lo(e){const u={};e=e||{},u.src_Any=tn.source,u.src_Cc=rn.source,u.src_Z=an.source,u.src_P=bu.source,u.src_ZPCc=[u.src_Z,u.src_P,u.src_Cc].join("|"),u.src_ZCc=[u.src_Z,u.src_Cc].join("|");const n="[><｜]";return u.src_pseudo_letter="(?:(?!"+n+"|"+u.src_ZPCc+")"+u.src_Any+")",u.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",u.src_auth="(?:(?:(?!"+u.src_ZCc+"|[@/\\[\\]()]).)+@)?",u.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",u.src_host_terminator="(?=$|"+n+"|"+u.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+u.src_ZPCc+"))",u.src_path="(?:[/?#](?:(?!"+u.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+u.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+u.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+u.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+u.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+u.src_ZCc+"|[']).)+\\'|\\'(?="+u.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+u.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+u.src_ZCc+"|$)|;(?!"+u.src_ZCc+"|$)|\\!+(?!"+u.src_ZCc+"|[!]|$)|\\?(?!"+u.src_ZCc+"|[?]|$))+|\\/)?",u.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',u.src_xn="xn--[a-z0-9\\-]{1,59}",u.src_domain_root="(?:"+u.src_xn+"|"+u.src_pseudo_letter+"{1,63})",u.src_domain="(?:"+u.src_xn+"|(?:"+u.src_pseudo_letter+")|(?:"+u.src_pseudo_letter+"(?:-|"+u.src_pseudo_letter+"){0,61}"+u.src_pseudo_letter+"))",u.src_host="(?:(?:(?:(?:"+u.src_domain+")\\.)*"+u.src_domain+"))",u.tpl_host_fuzzy="(?:"+u.src_ip4+"|(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%)))",u.tpl_host_no_ip_fuzzy="(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%))",u.src_host_strict=u.src_host+u.src_host_terminator,u.tpl_host_fuzzy_strict=u.tpl_host_fuzzy+u.src_host_terminator,u.src_host_port_strict=u.src_host+u.src_port+u.src_host_terminator,u.tpl_host_port_fuzzy_strict=u.tpl_host_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_port_no_ip_fuzzy_strict=u.tpl_host_no_ip_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+u.src_ZPCc+"|>|$))",u.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+u.src_ZCc+")("+u.src_email_name+"@"+u.tpl_host_fuzzy_strict+")",u.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_fuzzy_strict+u.src_path+")",u.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_no_ip_fuzzy_strict+u.src_path+")",u}function su(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(t){e[t]=n[t]})}),e}function qe(e){return Object.prototype.toString.call(e)}function fo(e){return qe(e)==="[object String]"}function ho(e){return qe(e)==="[object Object]"}function bo(e){return qe(e)==="[object RegExp]"}function $u(e){return qe(e)==="[object Function]"}function po(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const kn={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function mo(e){return Object.keys(e||{}).reduce(function(u,n){return u||kn.hasOwnProperty(n)},!1)}const go={"http:":{validate:function(e,u,n){const t=e.slice(u);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(t)?t.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,u,n){const t=e.slice(u);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(t)?u>=3&&e[u-3]===":"||u>=3&&e[u-3]==="/"?0:t.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,u,n){const t=e.slice(u);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(t)?t.match(n.re.mailto)[0].length:0}}},ko="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",xo="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function yo(e){e.__index__=-1,e.__text_cache__=""}function wo(e){return function(u,n){const t=u.slice(n);return e.test(t)?t.match(e)[0].length:0}}function Hu(){return function(e,u){u.normalize(e)}}function ze(e){const u=e.re=lo(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(ko),n.push(u.src_xn),u.src_tlds=n.join("|");function t(a){return a.replace("%TLDS%",u.src_tlds)}u.email_fuzzy=RegExp(t(u.tpl_email_fuzzy),"i"),u.link_fuzzy=RegExp(t(u.tpl_link_fuzzy),"i"),u.link_no_ip_fuzzy=RegExp(t(u.tpl_link_no_ip_fuzzy),"i"),u.host_fuzzy_test=RegExp(t(u.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function o(a,c){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+c)}Object.keys(e.__schemas__).forEach(function(a){const c=e.__schemas__[a];if(c===null)return;const s={validate:null,link:null};if(e.__compiled__[a]=s,ho(c)){bo(c.validate)?s.validate=wo(c.validate):$u(c.validate)?s.validate=c.validate:o(a,c),$u(c.normalize)?s.normalize=c.normalize:c.normalize?o(a,c):s.normalize=Hu();return}if(fo(c)){r.push(a);return}o(a,c)}),r.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:Hu()};const i=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(po).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+i+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+i+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),yo(e)}function _o(e,u){const n=e.__index__,t=e.__last_index__,r=e.__text_cache__.slice(n,t);this.schema=e.__schema__.toLowerCase(),this.index=n+u,this.lastIndex=t+u,this.raw=r,this.text=r,this.url=r}function lu(e,u){const n=new _o(e,u);return e.__compiled__[n.schema].normalize(n,e),n}function P(e,u){if(!(this instanceof P))return new P(e,u);u||mo(e)&&(u=e,e={}),this.__opts__=su({},kn,u),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=su({},go,e),this.__compiled__={},this.__tlds__=xo,this.__tlds_replaced__=!1,this.re={},ze(this)}P.prototype.add=function(u,n){return this.__schemas__[u]=n,ze(this),this};P.prototype.set=function(u){return this.__opts__=su(this.__opts__,u),this};P.prototype.test=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return!1;let n,t,r,o,i,a,c,s,l;if(this.re.schema_test.test(u)){for(c=this.re.schema_search,c.lastIndex=0;(n=c.exec(u))!==null;)if(o=this.testSchemaAt(u,n[2],c.lastIndex),o){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+o;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(s=u.search(this.re.host_fuzzy_test),s>=0&&(this.__index__<0||s<this.__index__)&&(t=u.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(i=t.index+t[1].length,(this.__index__<0||i<this.__index__)&&(this.__schema__="",this.__index__=i,this.__last_index__=t.index+t[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(l=u.indexOf("@"),l>=0&&(r=u.match(this.re.email_fuzzy))!==null&&(i=r.index+r[1].length,a=r.index+r[0].length,(this.__index__<0||i<this.__index__||i===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=i,this.__last_index__=a))),this.__index__>=0};P.prototype.pretest=function(u){return this.re.pretest.test(u)};P.prototype.testSchemaAt=function(u,n,t){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(u,t,this):0};P.prototype.match=function(u){const n=[];let t=0;this.__index__>=0&&this.__text_cache__===u&&(n.push(lu(this,t)),t=this.__last_index__);let r=t?u.slice(t):u;for(;this.test(r);)n.push(lu(this,t)),r=r.slice(this.__last_index__),t+=this.__last_index__;return n.length?n:null};P.prototype.matchAtStart=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return null;const n=this.re.schema_at_start.exec(u);if(!n)return null;const t=this.testSchemaAt(u,n[2],n[0].length);return t?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+t,lu(this,0)):null};P.prototype.tlds=function(u,n){return u=Array.isArray(u)?u:[u],n?(this.__tlds__=this.__tlds__.concat(u).sort().filter(function(t,r,o){return t!==o[r-1]}).reverse(),ze(this),this):(this.__tlds__=u.slice(),this.__tlds_replaced__=!0,ze(this),this)};P.prototype.normalize=function(u){u.schema||(u.url="http://"+u.url),u.schema==="mailto:"&&!/^mailto:/i.test(u.url)&&(u.url="mailto:"+u.url)};P.prototype.onCompile=function(){};const re=2147483647,q=36,xu=1,ye=26,Co=38,vo=700,xn=72,yn=128,wn="-",Eo=/^xn--/,Do=/[^\0-\x7F]/,Ao=/[\x2E\u3002\uFF0E\uFF61]/g,Fo={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Xe=q-xu,j=Math.floor,Ye=String.fromCharCode;function V(e){throw new RangeError(Fo[e])}function So(e,u){const n=[];let t=e.length;for(;t--;)n[t]=u(e[t]);return n}function _n(e,u){const n=e.split("@");let t="";n.length>1&&(t=n[0]+"@",e=n[1]),e=e.replace(Ao,".");const r=e.split("."),o=So(r,u).join(".");return t+o}function Cn(e){const u=[];let n=0;const t=e.length;for(;n<t;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<t){const o=e.charCodeAt(n++);(o&64512)==56320?u.push(((r&1023)<<10)+(o&1023)+65536):(u.push(r),n--)}else u.push(r)}return u}const To=e=>String.fromCodePoint(...e),Mo=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:q},Gu=function(e,u){return e+22+75*(e<26)-((u!=0)<<5)},vn=function(e,u,n){let t=0;for(e=n?j(e/vo):e>>1,e+=j(e/u);e>Xe*ye>>1;t+=q)e=j(e/Xe);return j(t+(Xe+1)*e/(e+Co))},En=function(e){const u=[],n=e.length;let t=0,r=yn,o=xn,i=e.lastIndexOf(wn);i<0&&(i=0);for(let a=0;a<i;++a)e.charCodeAt(a)>=128&&V("not-basic"),u.push(e.charCodeAt(a));for(let a=i>0?i+1:0;a<n;){const c=t;for(let l=1,d=q;;d+=q){a>=n&&V("invalid-input");const b=Mo(e.charCodeAt(a++));b>=q&&V("invalid-input"),b>j((re-t)/l)&&V("overflow"),t+=b*l;const h=d<=o?xu:d>=o+ye?ye:d-o;if(b<h)break;const f=q-h;l>j(re/f)&&V("overflow"),l*=f}const s=u.length+1;o=vn(t-c,s,c==0),j(t/s)>re-r&&V("overflow"),r+=j(t/s),t%=s,u.splice(t++,0,r)}return String.fromCodePoint(...u)},Dn=function(e){const u=[];e=Cn(e);const n=e.length;let t=yn,r=0,o=xn;for(const c of e)c<128&&u.push(Ye(c));const i=u.length;let a=i;for(i&&u.push(wn);a<n;){let c=re;for(const l of e)l>=t&&l<c&&(c=l);const s=a+1;c-t>j((re-r)/s)&&V("overflow"),r+=(c-t)*s,t=c;for(const l of e)if(l<t&&++r>re&&V("overflow"),l===t){let d=r;for(let b=q;;b+=q){const h=b<=o?xu:b>=o+ye?ye:b-o;if(d<h)break;const f=d-h,p=q-h;u.push(Ye(Gu(h+f%p,0))),d=j(f/p)}u.push(Ye(Gu(d,0))),o=vn(r,s,a===i),r=0,++a}++r,++t}return u.join("")},zo=function(e){return _n(e,function(u){return Eo.test(u)?En(u.slice(4).toLowerCase()):u})},Io=function(e){return _n(e,function(u){return Do.test(u)?"xn--"+Dn(u):u})},An={version:"2.3.1",ucs2:{decode:Cn,encode:To},decode:En,encode:Dn,toASCII:Io,toUnicode:zo},Po={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},Bo={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Ro={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Lo={default:Po,zero:Bo,commonmark:Ro},Oo=/^(vbscript|javascript|file|data):/,qo=/^data:image\/(gif|png|jpeg|webp);/;function jo(e){const u=e.trim().toLowerCase();return Oo.test(u)?qo.test(u):!0}const Fn=["http:","https:","mailto:"];function No(e){const u=hu(e,!0);if(u.hostname&&(!u.protocol||Fn.indexOf(u.protocol)>=0))try{u.hostname=An.toASCII(u.hostname)}catch{}return we(fu(u))}function $o(e){const u=hu(e,!0);if(u.hostname&&(!u.protocol||Fn.indexOf(u.protocol)>=0))try{u.hostname=An.toUnicode(u.hostname)}catch{}return oe(fu(u),oe.defaultChars+"%")}function R(e,u){if(!(this instanceof R))return new R(e,u);u||pu(e)||(u=e||{},e="default"),this.inline=new Ce,this.block=new Oe,this.core=new gu,this.renderer=new se,this.linkify=new P,this.validateLink=jo,this.normalizeLink=No,this.normalizeLinkText=$o,this.utils=Ht,this.helpers=Re({},Vt),this.options={},this.configure(e),u&&this.set(u)}R.prototype.set=function(e){return Re(this.options,e),this};R.prototype.configure=function(e){const u=this;if(pu(e)){const n=e;if(e=Lo[n],!e)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&u.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&u[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&u[n].ruler2.enableOnly(e.components[n].rules2)}),this};R.prototype.enable=function(e,u){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));const t=e.filter(function(r){return n.indexOf(r)<0});if(t.length&&!u)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this};R.prototype.disable=function(e,u){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));const t=e.filter(function(r){return n.indexOf(r)<0});if(t.length&&!u)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this};R.prototype.use=function(e){const u=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,u),this};R.prototype.parse=function(e,u){if(typeof e!="string")throw new Error("Input data should be a String");const n=new this.core.State(e,this,u);return this.core.process(n),n.tokens};R.prototype.render=function(e,u){return u=u||{},this.renderer.render(this.parse(e,u),this.options,u)};R.prototype.parseInline=function(e,u){const n=new this.core.State(e,this,u);return n.inlineMode=!0,this.core.process(n),n.tokens};R.prototype.renderInline=function(e,u){return u=u||{},this.renderer.render(this.parseInline(e,u),this.options,u)};var Uu=!1,ie={false:"push",true:"unshift",after:"push",before:"unshift"},Ie={isPermalinkSymbol:!0};function du(e,u,n,t){var r;if(!Uu){var o="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(o):console.warn(o),Uu=!0}var i=[Object.assign(new n.Token("link_open","a",1),{attrs:[].concat(u.permalinkClass?[["class",u.permalinkClass]]:[],[["href",u.permalinkHref(e,n)]],Object.entries(u.permalinkAttrs(e,n)))}),Object.assign(new n.Token("html_block","",0),{content:u.permalinkSymbol,meta:Ie}),new n.Token("link_close","a",-1)];u.permalinkSpace&&n.tokens[t+1].children[ie[u.permalinkBefore]](Object.assign(new n.Token("text","",0),{content:" "})),(r=n.tokens[t+1].children)[ie[u.permalinkBefore]].apply(r,i)}function Sn(e){return"#"+e}function Tn(e){return{}}var Ho={class:"header-anchor",symbol:"#",renderHref:Sn,renderAttrs:Tn};function ve(e){function u(n){return n=Object.assign({},u.defaults,n),function(t,r,o,i){return e(t,n,r,o,i)}}return u.defaults=Object.assign({},Ho),u.renderPermalinkImpl=e,u}function yu(e){var u=[],n=e.filter(function(t){if(t[0]!=="class")return!0;u.push(t[1])});return u.length>0&&n.unshift(["class",u.join(" ")]),n}var je=ve(function(e,u,n,t,r){var o,i=[Object.assign(new t.Token("link_open","a",1),{attrs:yu([].concat(u.class?[["class",u.class]]:[],[["href",u.renderHref(e,t)]],u.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(u.renderAttrs(e,t))))}),Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:Ie}),new t.Token("link_close","a",-1)];if(u.space){var a=typeof u.space=="string"?u.space:" ";t.tokens[r+1].children[ie[u.placement]](Object.assign(new t.Token(typeof u.space=="string"?"html_inline":"text","",0),{content:a}))}(o=t.tokens[r+1].children)[ie[u.placement]].apply(o,i)});Object.assign(je.defaults,{space:!0,placement:"after",ariaHidden:!1});var X=ve(je.renderPermalinkImpl);X.defaults=Object.assign({},je.defaults,{ariaHidden:!0});var Mn=ve(function(e,u,n,t,r){var o=[Object.assign(new t.Token("link_open","a",1),{attrs:yu([].concat(u.class?[["class",u.class]]:[],[["href",u.renderHref(e,t)]],Object.entries(u.renderAttrs(e,t))))})].concat(u.safariReaderFix?[new t.Token("span_open","span",1)]:[],t.tokens[r+1].children,u.safariReaderFix?[new t.Token("span_close","span",-1)]:[],[new t.Token("link_close","a",-1)]);t.tokens[r+1]=Object.assign(new t.Token("inline","",0),{children:o})});Object.assign(Mn.defaults,{safariReaderFix:!1});var Zu=ve(function(e,u,n,t,r){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(u.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+u.style+"`");if(!["aria-describedby","aria-labelledby"].includes(u.style)&&!u.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+u.style+"` style");if(u.style==="visually-hidden"&&!u.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var i=t.tokens[r+1].children.filter(function(d){return d.type==="text"||d.type==="code_inline"}).reduce(function(d,b){return d+b.content},""),a=[],c=[];if(u.class&&c.push(["class",u.class]),c.push(["href",u.renderHref(e,t)]),c.push.apply(c,Object.entries(u.renderAttrs(e,t))),u.style==="visually-hidden"){if(a.push(Object.assign(new t.Token("span_open","span",1),{attrs:[["class",u.visuallyHiddenClass]]}),Object.assign(new t.Token("text","",0),{content:u.assistiveText(i)}),new t.Token("span_close","span",-1)),u.space){var s=typeof u.space=="string"?u.space:" ";a[ie[u.placement]](Object.assign(new t.Token(typeof u.space=="string"?"html_inline":"text","",0),{content:s}))}a[ie[u.placement]](Object.assign(new t.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:Ie}),new t.Token("span_close","span",-1))}else a.push(Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:Ie}));u.style==="aria-label"?c.push(["aria-label",u.assistiveText(i)]):["aria-describedby","aria-labelledby"].includes(u.style)&&c.push([u.style,e]);var l=[Object.assign(new t.Token("link_open","a",1),{attrs:yu(c)})].concat(a,[new t.Token("link_close","a",-1)]);(o=t.tokens).splice.apply(o,[r+3,0].concat(l)),u.wrapper&&(t.tokens.splice(r,0,Object.assign(new t.Token("html_block","",0),{content:u.wrapper[0]+`
`})),t.tokens.splice(r+3+l.length+1,0,Object.assign(new t.Token("html_block","",0),{content:u.wrapper[1]+`
`})))});function Vu(e,u,n,t){var r=e,o=t;if(n&&Object.prototype.hasOwnProperty.call(u,r))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(u,r);)r=e+"-"+o,o+=1;return u[r]=!0,r}function te(e,u){u=Object.assign({},te.defaults,u),e.core.ruler.push("anchor",function(n){for(var t,r={},o=n.tokens,i=Array.isArray(u.level)?(t=u.level,function(d){return t.includes(d)}):(function(d){return function(b){return b>=d}})(u.level),a=0;a<o.length;a++){var c=o[a];if(c.type==="heading_open"&&i(Number(c.tag.substr(1)))){var s=u.getTokensText(o[a+1].children),l=c.attrGet("id");l=l==null?Vu(l=u.slugifyWithState?u.slugifyWithState(s,n):u.slugify(s),r,!1,u.uniqueSlugStartIndex):Vu(l,r,!0,u.uniqueSlugStartIndex),c.attrSet("id",l),u.tabIndex!==!1&&c.attrSet("tabindex",""+u.tabIndex),typeof u.permalink=="function"?u.permalink(l,u,n,a):(u.permalink||u.renderPermalink&&u.renderPermalink!==du)&&u.renderPermalink(l,u,n,a),a=o.indexOf(c),u.callback&&u.callback(c,{slug:l,title:s})}}})}Object.assign(Zu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),te.permalink={__proto__:null,legacy:du,renderHref:Sn,renderAttrs:Tn,makePermalink:ve,linkInsideHeader:je,ariaHidden:X,headerLink:Mn,linkAfterHeader:Zu},te.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(u){return["text","code_inline"].includes(u.type)}).map(function(u){return u.content}).join("")},permalink:!1,renderPermalink:du,permalinkClass:X.defaults.class,permalinkSpace:X.defaults.space,permalinkSymbol:"¶",permalinkBefore:X.defaults.placement==="before",permalinkHref:X.defaults.renderHref,permalinkAttrs:X.defaults.renderAttrs},te.default=te;function wu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var eu,Wu;function Go(){if(Wu)return eu;Wu=1;function e(t,r){var o,i,a=t.attrs[t.attrIndex("href")][1];for(o=0;o<r.length;++o){if(i=r[o],typeof i.matcher=="function"){if(i.matcher(a,i))return i;continue}return i}}function u(t,r,o){Object.keys(o).forEach(function(i){var a,c=o[i];i==="className"&&(i="class"),a=r[t].attrIndex(i),a<0?r[t].attrPush([i,c]):r[t].attrs[a][1]=c})}function n(t,r){r?r=Array.isArray(r)?r:[r]:r=[],Object.freeze(r);var o=t.renderer.rules.link_open||this.defaultRender;t.renderer.rules.link_open=function(i,a,c,s,l){var d=e(i[a],r),b=d&&d.attrs;return b&&u(a,i,b),o(i,a,c,s,l)}}return n.defaultRender=function(t,r,o,i,a){return a.renderToken(t,r,o)},eu=n,eu}var Uo=Go();const Zo=wu(Uo);function Vo(e,u,n,t){const r=Number(e[u].meta.id+1).toString();let o="";return typeof t.docId=="string"&&(o=`-${t.docId}-`),o+r}function Wo(e,u){let n=Number(e[u].meta.id+1).toString();return e[u].meta.subId>0&&(n+=`:${e[u].meta.subId}`),`[${n}]`}function Ko(e,u,n,t,r){const o=r.rules.footnote_anchor_name(e,u,n,t,r),i=r.rules.footnote_caption(e,u,n,t,r);let a=o;return e[u].meta.subId>0&&(a+=`:${e[u].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${a}">${i}</a></sup>`}function Jo(e,u,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function Qo(){return`</ol>
</section>
`}function Xo(e,u,n,t,r){let o=r.rules.footnote_anchor_name(e,u,n,t,r);return e[u].meta.subId>0&&(o+=`:${e[u].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function Yo(){return`</li>
`}function e0(e,u,n,t,r){let o=r.rules.footnote_anchor_name(e,u,n,t,r);return e[u].meta.subId>0&&(o+=`:${e[u].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function u0(e){const u=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=Ko,e.renderer.rules.footnote_block_open=Jo,e.renderer.rules.footnote_block_close=Qo,e.renderer.rules.footnote_open=Xo,e.renderer.rules.footnote_close=Yo,e.renderer.rules.footnote_anchor=e0,e.renderer.rules.footnote_caption=Wo,e.renderer.rules.footnote_anchor_name=Vo;function t(a,c,s,l){const d=a.bMarks[c]+a.tShift[c],b=a.eMarks[c];if(d+4>b||a.src.charCodeAt(d)!==91||a.src.charCodeAt(d+1)!==94)return!1;let h;for(h=d+2;h<b;h++){if(a.src.charCodeAt(h)===32)return!1;if(a.src.charCodeAt(h)===93)break}if(h===d+2||h+1>=b||a.src.charCodeAt(++h)!==58)return!1;if(l)return!0;h++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const f=a.src.slice(d+2,h-2);a.env.footnotes.refs[`:${f}`]=-1;const p=new a.Token("footnote_reference_open","",1);p.meta={label:f},p.level=a.level++,a.tokens.push(p);const g=a.bMarks[c],y=a.tShift[c],m=a.sCount[c],x=a.parentType,k=h,w=a.sCount[c]+h-(a.bMarks[c]+a.tShift[c]);let _=w;for(;h<b;){const z=a.src.charCodeAt(h);if(n(z))z===9?_+=4-_%4:_++;else break;h++}a.tShift[c]=h-k,a.sCount[c]=_-w,a.bMarks[c]=k,a.blkIndent+=4,a.parentType="footnote",a.sCount[c]<a.blkIndent&&(a.sCount[c]+=a.blkIndent),a.md.block.tokenize(a,c,s,!0),a.parentType=x,a.blkIndent-=4,a.tShift[c]=y,a.sCount[c]=m,a.bMarks[c]=g;const D=new a.Token("footnote_reference_close","",-1);return D.level=--a.level,a.tokens.push(D),!0}function r(a,c){const s=a.posMax,l=a.pos;if(l+2>=s||a.src.charCodeAt(l)!==94||a.src.charCodeAt(l+1)!==91)return!1;const d=l+2,b=u(a,l+1);if(b<0)return!1;if(!c){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const h=a.env.footnotes.list.length,f=[];a.md.inline.parse(a.src.slice(d,b),a.md,a.env,f);const p=a.push("footnote_ref","",0);p.meta={id:h},a.env.footnotes.list[h]={content:a.src.slice(d,b),tokens:f}}return a.pos=b+1,a.posMax=s,!0}function o(a,c){const s=a.posMax,l=a.pos;if(l+3>s||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(l)!==91||a.src.charCodeAt(l+1)!==94)return!1;let d;for(d=l+2;d<s;d++){if(a.src.charCodeAt(d)===32||a.src.charCodeAt(d)===10)return!1;if(a.src.charCodeAt(d)===93)break}if(d===l+2||d>=s)return!1;d++;const b=a.src.slice(l+2,d-1);if(typeof a.env.footnotes.refs[`:${b}`]>"u")return!1;if(!c){a.env.footnotes.list||(a.env.footnotes.list=[]);let h;a.env.footnotes.refs[`:${b}`]<0?(h=a.env.footnotes.list.length,a.env.footnotes.list[h]={label:b,count:0},a.env.footnotes.refs[`:${b}`]=h):h=a.env.footnotes.refs[`:${b}`];const f=a.env.footnotes.list[h].count;a.env.footnotes.list[h].count++;const p=a.push("footnote_ref","",0);p.meta={id:h,subId:f,label:b}}return a.pos=d,a.posMax=s,!0}function i(a){let c,s,l,d=!1;const b={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(f){return f.type==="footnote_reference_open"?(d=!0,s=[],l=f.meta.label,!1):f.type==="footnote_reference_close"?(d=!1,b[":"+l]=s,!1):(d&&s.push(f),!d)}),!a.env.footnotes.list))return;const h=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let f=0,p=h.length;f<p;f++){const g=new a.Token("footnote_open","",1);if(g.meta={id:f,label:h[f].label},a.tokens.push(g),h[f].tokens){c=[];const x=new a.Token("paragraph_open","p",1);x.block=!0,c.push(x);const k=new a.Token("inline","",0);k.children=h[f].tokens,k.content=h[f].content,c.push(k);const w=new a.Token("paragraph_close","p",-1);w.block=!0,c.push(w)}else h[f].label&&(c=b[`:${h[f].label}`]);c&&(a.tokens=a.tokens.concat(c));let y;a.tokens[a.tokens.length-1].type==="paragraph_close"?y=a.tokens.pop():y=null;const m=h[f].count>0?h[f].count:1;for(let x=0;x<m;x++){const k=new a.Token("footnote_anchor","",0);k.meta={id:f,subId:x,label:h[f].label},a.tokens.push(k)}y&&a.tokens.push(y),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",t,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",r),e.inline.ruler.after("footnote_inline","footnote_ref",o),e.core.ruler.after("inline","footnote_tail",i)}var uu,Ku;function n0(){if(Ku)return uu;Ku=1;var e=!0,u=!1,n=!1;uu=function(p,g){g&&(e=!g.enabled,u=!!g.label,n=!!g.labelAfter),p.core.ruler.after("inline","github-task-lists",function(y){for(var m=y.tokens,x=2;x<m.length;x++)o(m,x)&&(i(m[x],y.Token),t(m[x-2],"class","task-list-item"+(e?"":" enabled")),t(m[r(m,x-2)],"class","contains-task-list"))})};function t(p,g,y){var m=p.attrIndex(g),x=[g,y];m<0?p.attrPush(x):p.attrs[m]=x}function r(p,g){for(var y=p[g].level-1,m=g-1;m>=0;m--)if(p[m].level===y)return m;return-1}function o(p,g){return d(p[g])&&b(p[g-1])&&h(p[g-2])&&f(p[g])}function i(p,g){if(p.children.unshift(a(p,g)),p.children[1].content=p.children[1].content.slice(3),p.content=p.content.slice(3),u)if(n){p.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);p.children[0].content=p.children[0].content.slice(0,-1)+' id="'+y+'">',p.children.push(l(p.content,y,g))}else p.children.unshift(c(g)),p.children.push(s(g))}function a(p,g){var y=new g("html_inline","",0),m=e?' disabled="" ':"";return p.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+m+'type="checkbox">':(p.content.indexOf("[x] ")===0||p.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+m+'type="checkbox">'),y}function c(p){var g=new p("html_inline","",0);return g.content="<label>",g}function s(p){var g=new p("html_inline","",0);return g.content="</label>",g}function l(p,g,y){var m=new y("html_inline","",0);return m.content='<label class="task-list-item-label" for="'+g+'">'+p+"</label>",m.attrs=[{for:g}],m}function d(p){return p.type==="inline"}function b(p){return p.type==="paragraph_open"}function h(p){return p.type==="list_item_open"}function f(p){return p.content.indexOf("[ ] ")===0||p.content.indexOf("[x] ")===0||p.content.indexOf("[X] ")===0}return uu}var t0=n0();const r0=wu(t0),o0={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},a0=(e,u={})=>{const{markers:n=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:t=o0,matchCaseSensitive:r=!1,titles:o={},classPrefix:i="markdown-alert"}=u,a=n==="*"?"\\w+":n.join("|"),c=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,r?"":"i");e.core.ruler.after("block","github-alerts",s=>{const l=s.tokens;for(let d=0;d<l.length;d++)if(l[d].type==="blockquote_open"){const b=l[d],h=d;for(;l[d]?.type!=="blockquote_close"&&d<=l.length;)d+=1;const f=l[d],p=d,g=l.slice(h,p+1).find(w=>w.type==="inline");if(!g)continue;const y=g.content.match(c);if(!y)continue;const m=y[1].toLowerCase(),x=y[2].trim()||(o[m]??i0(m)),k=t[m]??"";g.content=g.content.slice(y[0].length).trimStart(),b.type="alert_open",b.tag="div",b.meta={title:x,type:m,icon:k},f.type="alert_close",f.tag="div"}}),e.renderer.rules.alert_open=function(s,l){const{title:d,type:b,icon:h}=s[l].meta;return`<div class="${i} ${i}-${b}"><p class="${i}-title">${h}${d}</p>`}};function i0(e){return e.charAt(0).toUpperCase()+e.slice(1)}var nu,Ju;function c0(){return Ju||(Ju=1,nu=function(u,n){var t=3,r="-",o=r.charCodeAt(0),i=r.length;function a(c,s,l,d){var b,h,f,p,g,y,m,x=!1,k=c.bMarks[s]+c.tShift[s],w=c.eMarks[s];if(s!==0||o!==c.src.charCodeAt(0))return!1;for(b=k+1;b<=w;b++)if(r[(b-k)%i]!==c.src[b]){m=b+1;break}if(f=Math.floor((b-k)/i),f<t)return!1;if(b-=(b-k)%i,d)return!0;for(h=s;h++,!(h>=l||c.src.slice(k,w)==="..."||(k=c.bMarks[h]+c.tShift[h],w=c.eMarks[h],k<w&&c.sCount[h]<c.blkIndent));)if(o===c.src.charCodeAt(k)&&!(c.sCount[h]-c.blkIndent>=4)){for(b=k+1;b<=w&&r[(b-k)%i]===c.src[b];b++);if(!(Math.floor((b-k)/i)<f)&&(b-=(b-k)%i,b=c.skipSpaces(b),!(b<w))){x=!0;break}}return g=c.parentType,y=c.lineMax,c.parentType="container",c.lineMax=h,p=c.push("front_matter",null,0),p.hidden=!0,p.markup=c.src.slice(s,b),p.block=!0,p.map=[s,h+(x?1:0)],p.meta=c.src.slice(m,k-1),c.parentType=g,c.lineMax=y,c.line=h+(x?1:0),n(p.meta),!0}u.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),nu}var s0=c0();const l0=wu(s0);async function d0(e){let u=h0;return()=>{let n="";e.use(l0,t=>{const r=f0(t,u);r!==void 0?n=b0(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,o,i,a)=>n===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(t[r])}>
${n}
</table>
`}}function f0(e,u){try{const n=u(e);if(n!==null&&typeof n=="object"&&!Array.isArray(n))return n}catch{}}function h0(e){const u={};for(const n of e.split(`
`)){const t=n.indexOf(":");if(t===-1)continue;const r=n.slice(0,t).trim(),o=n.slice(t+1).trim();r.length>0&&(u[r]=nt(o))}return u}function b0(e,u){const n=Object.entries(e);if(n.length===0)return"";const t=n.map(([o])=>`<th scope="col">${u(o)}</th>`).join(""),r=n.map(([,o])=>`<td>${zn(o,u)}</td>`).join("");return`<thead><tr>${t}</tr></thead>
<tbody>
<tr>${r}</tr>
</tbody>`}function zn(e,u){return e==null?"":Array.isArray(e)?e.map(n=>zn(n,u)).join(", "):u(typeof e=="object"?JSON.stringify(e):String(e))}const _u={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},p0=le(E.MarkEdit.userSettings),L=le(p0[_u.rootValueKey]),In=le(L.changeMode),Pn=le(L.markdownIt),m0=Ee(L.autoUpdate),g0=Ee(L.syncScroll);Ee(L.hidePreviewButtons);Ee(L.syntaxAutoDetect,!1);const k0=Ee(L.imageHoverPreview,!1),Bn=L.themeName??"github",Fe=L.styledHtmlColorScheme??L.styledHtmlTheme??"auto";L.mathDelimiters;const x0=In.modes??_u.defaultModes,Qu=le(In.hotKey),y0=Pn.preset??_u.defaultPreset,w0=le(Pn.options);function le(e,u={}){return e??u}function Ee(e,u=!0){return e??u}const _0=`.markdown-body {
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
`,C0=`.markdown-body {
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
`,v0=`.markdown-body {
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
`,E0=`.markdown-body {
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
`,D0=`.markdown-body {
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
`,A0=`.markdown-body {
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
`,F0=`.markdown-body {
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
`,S0=`.markdown-body {
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
`,T0=`.markdown-body {
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
`,M0=`.markdown-body {
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
`,z0=`.markdown-body {
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
`,I0=`.markdown-body {
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
`,P0=`.markdown-body {
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
`,B0=`.markdown-body {
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
`,R0=`.markdown-body {
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
`,L0=`.markdown-body {
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
`,O0=`.markdown-body {
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
`,q0=`.markdown-alert {
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
`,j0=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,N0=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,$0=`.code-copy-wrapper {
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
`,H0=`.code-copy-button {
  color: #5b636d;
}

.code-copy-button:hover {
  background: #eeeeee;
}

.code-copy-button:active {
  background: #dddddd;
}
`,G0=`.code-copy-button {
  color: #9398a0;
}

.code-copy-button:hover {
  background: #222222;
}

.code-copy-button:active {
  background: #333333;
}
`,Pe={github:{light:C0,dark:v0},cobalt:{dark:E0},dracula:{dark:D0},minimal:{light:A0,dark:F0},"night-owl":{dark:S0},"rose-pine":{light:T0,dark:M0},solarized:{light:z0,dark:I0},synthwave84:{dark:P0},"winter-is-coming":{light:B0,dark:R0},xcode:{light:L0,dark:O0}};function U0(e="auto"){const u=Pe[Bn]??Pe.github,n=u.light??u.dark,t=u.dark??u.light,r=Du(n)??"#ffffff",o=Du(t)??"#0d1117";return[".markdown-body { padding: 25px; }",...Ne(e,`body { background: ${r}; }`,`body { background: ${o}; }`)].join(`
`)}function Rn(e="auto"){const u=Pe[Bn]??Pe.github,n=u.light??u.dark,t=u.dark??u.light;return[_0,...Ne(e,n,t)].join(`
`)}function Z0(e="auto"){return[q0,...Ne(e,j0,N0)].join(`
`)}function Ln(e="auto"){return[$0,...Ne(e,H0,G0)].join(`
`)}function Ne(e,u,n){const t=[];switch(e){case"light":t.push(u);break;case"dark":t.push(n);break;case"auto":t.push(`
        ${u}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`);break}return t}const V0={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",version:"Version",checkReleases:"Check Releases",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",version:"版本",checkReleases:"查看版本",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",version:"版本",checkReleases:"檢視版本",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本"}};function A(e){return K0[e]}const W0=["default","zh-CN","zh-TW"],K0=V0[(()=>{const e=navigator.language;return W0.includes(e)?e:"default"})()];async function J0(e,u=!0){return await ea,B.render(e,{lineInfo:u})}function Q0(e){e()}async function X0(e){const u=t=>`<style>
${t}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,u(U0(Fe)),u(Rn(Fe)),u(Z0(Fe)),u(Ln(Fe)),"</body></html>"].join(`
`)}const B=R(y0,{html:!0,breaks:!0,linkify:!0,...w0}),On=[];On.push(d0(B).then(e=>{B.use(e)}));B.use(te);B.use(Zo,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});B.use(u0);B.use(r0);B.use(a0);const Y0=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),ea=Promise.all(On).then(()=>{for(const e of Y0){const u=B.renderer.rules[e];B.renderer.rules[e]=(n,t,r,o,i)=>{const a=n[t];return o.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),u?u(n,t,r,o,i):i.renderToken(n,t,r)}}for(const e of["fence","code_block"]){const u=B.renderer.rules[e];B.renderer.rules[e]=(n,t,r,o,i)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${u===void 0?i.renderToken(n,t,r):u(n,t,r,o,i)}
        <button title="${A("copyCode")}" aria-label="${A("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),ua=new DOMParser,na="image-loader",Cu="cm-md-image-preview",Xu=5;function ta(e){const u=ua.parseFromString(e,"text/html");return u.querySelectorAll("img").forEach(t=>{const r=t.getAttribute("src");r!==null&&(r.includes("://")||r.startsWith("data:image/")||(t.src=`${na}://${r}`))}),u.body.innerHTML}function ra(e){typeof E.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",u=>{J.panelPresenter!==void 0&&(clearTimeout(J.panelPresenter),J.panelPresenter=void 0),J.panelPresenter=setTimeout(()=>{const n=u.target,t=n?.closest(".cm-md-link"),r=t?.dataset.linkUrl??t?.innerText??"";t!==null&&et(r)?oa(t,r):n?.classList.contains(Cu)||be()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&be(!1)}),e.addEventListener("scroll",()=>be()))}async function oa(e,u){if(e===J.focusedElement)return;const n=(await E.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;const t=ut(n,u),r=await E.MarkEdit.getFileObject(t);if(r===void 0)return;const o=e.getBoundingClientRect(),i=document.createElement("img");i.className=Cu,i.style.position="fixed",i.style.left=`${o.left}px`,i.style.zIndex="10000",i.style.borderRadius="5px",i.style.opacity="0",i.style.transition="opacity 120ms",i.style.cursor="pointer",i.onclick=()=>{be(),window.open(u,"_blank")},i.onload=()=>{const c=Math.min(i.naturalHeight,240);i.style.height=`${c}px`;const s=o.top,l=window.innerHeight-o.bottom;s>l?i.style.top=`${o.top-c-Xu}px`:i.style.top=`${o.bottom+Xu}px`,requestAnimationFrame(()=>{i.style.opacity="1"})};const a=r.mimeType??"image/png";i.src=`data:${a};base64,${r.data}`,be(!1),J.focusedElement=e,document.body.appendChild(i)}function be(e=!0){J.focusedElement!==void 0&&(J.focusedElement=void 0,document.querySelectorAll(`.${Cu}`).forEach(u=>{e?(u.style.opacity="0",u.addEventListener("transitionend",()=>u.remove(),{once:!0})):u.remove()}))}const J={panelPresenter:void 0,focusedElement:void 0};function aa(e,u){g0&&e.addEventListener("scroll",()=>{tu.scrollUpdater!==void 0&&clearTimeout(tu.scrollUpdater),tu.scrollUpdater=setTimeout(()=>{qn(e,u)},100)})}function qn(e,u,n=!0){const{line:t,progress:r}=ia(e);ca(u,t,r,n)}function ia(e,u=0){const n=E.MarkEdit.editorView,t=n.lineBlockAtHeight(e.scrollTop+u),r=n.state.doc.lineAt(t.from).number-1,o=Xn(n.domAtPos(t.from).node);if(o===null)return{line:r,progress:0};const i=e.getBoundingClientRect(),a=o.getBoundingClientRect(),c=i.top-a.top-u,s=vu(c/a.height);return{line:r,progress:s}}function ca(e,u,n,t=!0){const r=Array.from(document.querySelectorAll("[data-line-from]")),o=sa(r,u);if(o!==void 0){const{from:c,to:s}=he(o);return Ze(e,o,la(u,n,c,s),t)}if(u===0)return iu(e,0,t);const{beforeBlock:i,afterBlock:a}=da(r,u);if(i!==void 0&&a!==void 0){const c=he(i),s=he(a),l=au(e,i)+i.offsetHeight,d=au(e,a),b=s.from-c.to,h=u-c.to+n,f=b>0?vu(h/b):0,p=l+(d-l)*f;return iu(e,p,t)}if(i!==void 0)return Ze(e,i,1,t);if(a!==void 0)return Ze(e,a,0,t)}function sa(e,u){return e.find(n=>{const{from:t,to:r}=he(n);return u>=t&&u<=r})}function la(e,u,n,t){const r=t-n;if(r<1)return e===n?u:0;const o=e-n+u;return vu(o/r)}function da(e,u){let n,t;for(const r of e){const{from:o,to:i}=he(r);if(i<u)n=r;else if(o>u){t=r;break}}return{beforeBlock:n,afterBlock:t}}function vu(e){return Math.max(0,Math.min(1,e))}const tu={scrollUpdater:void 0};var ru=function(e,u){return Number(e.slice(0,-1*u.length))},fa=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:ru(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:ru(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:ru(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},jn=function(e){return e.split(" ").map(fa)},ha=function(e,u,n,t){n===void 0&&(n=0),t===void 0&&(t=!1);var r=t?e+1:e,o=u.slice(0,r).reduce(function(a,c){return a+c.numeric},0),i=n?e*n:0;return o+i},Nn=function(e,u,n){return u.concat(n).map(function(t){return t.style[e]}).filter(function(t){return t!==void 0&&t!==""})},ba=function(e,u){return u.endsWith(e)?Number(u.slice(0,-1*e.length)):null},Yu=function(e){for(var u=0;u<e.length;u++)if(e[u].numeric>0)return u;return null},Y=function(){return!1},pa=function(e,u,n){e.style[u]=n},v=function(e,u,n){var t=e[u];return t!==void 0?t:n};function $n(e){var u;return(u=[]).concat.apply(u,Array.from(e.ownerDocument.styleSheets).map(function(n){var t=[];try{t=Array.from(n.cssRules||[])}catch{}return t})).filter(function(n){var t=!1;try{t=e.matches(n.selectorText)}catch{}return t})}var ma="grid-template-columns",ga="grid-template-rows",T=function(u,n,t){this.direction=u,this.element=n.element,this.track=n.track,u==="column"?(this.gridTemplateProp=ma,this.gridGapProp="grid-column-gap",this.cursor=v(t,"columnCursor",v(t,"cursor","col-resize")),this.snapOffset=v(t,"columnSnapOffset",v(t,"snapOffset",30)),this.dragInterval=v(t,"columnDragInterval",v(t,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=v(t,"gridTemplateColumns")):u==="row"&&(this.gridTemplateProp=ga,this.gridGapProp="grid-row-gap",this.cursor=v(t,"rowCursor",v(t,"cursor","row-resize")),this.snapOffset=v(t,"rowSnapOffset",v(t,"snapOffset",30)),this.dragInterval=v(t,"rowDragInterval",v(t,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=v(t,"gridTemplateRows")),this.onDragStart=v(t,"onDragStart",Y),this.onDragEnd=v(t,"onDragEnd",Y),this.onDrag=v(t,"onDrag",Y),this.writeStyle=v(t,"writeStyle",pa),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=n.minSizeStart,this.minSizeEnd=n.minSizeEnd,n.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};T.prototype.getDimensions=function(){var u=this.grid.getBoundingClientRect(),n=u.width,t=u.height,r=u.top,o=u.bottom,i=u.left,a=u.right;this.direction==="column"?(this.start=r,this.end=o,this.size=t):this.direction==="row"&&(this.start=i,this.end=a,this.size=n)};T.prototype.getSizeAtTrack=function(u,n){return ha(u,this.computedPixels,this.computedGapPixels,n)};T.prototype.getSizeOfTrack=function(u){return this.computedPixels[u].numeric};T.prototype.getRawTracks=function(){var u=Nn(this.gridTemplateProp,[this.grid],$n(this.grid));if(!u.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return u[0]};T.prototype.getGap=function(){var u=Nn(this.gridGapProp,[this.grid],$n(this.grid));return u.length?u[0]:null};T.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};T.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};T.prototype.setTracks=function(u){this.tracks=u.split(" "),this.trackValues=jn(u)};T.prototype.setComputedTracks=function(u){this.computedTracks=u.split(" "),this.computedPixels=jn(u)};T.prototype.setGap=function(u){this.gap=u};T.prototype.setComputedGap=function(u){this.computedGap=u,this.computedGapPixels=ba("px",this.computedGap)||0};T.prototype.getMousePosition=function(u){return"touches"in u?u.touches[0][this.clientAxis]:u[this.clientAxis]};T.prototype.startDragging=function(u){if(!("button"in u&&u.button!==0)){u.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=u.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var n=this.trackValues.filter(function(a){return a.type==="%"}),t=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=t.length,this.totalFrs){var r=Yu(t);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/t[r].numeric)}if(n.length){var o=Yu(n);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/n[o].numeric)}var i=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(u)-i,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Y),this.grid.addEventListener("dragstart",Y),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};T.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};T.prototype.drag=function(u){var n=this.getMousePosition(u),t=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(t-this.dragStartOffset),i=r+this.snapOffset,a=o-this.snapOffset;n<i&&(n=r),n>a&&(n=o),n<r?n=r:n>o&&(n=o);var c=n-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,s=this.bTrackEnd-n+this.dragStartOffset-t-this.computedGapPixels;if(this.dragInterval>1){var l=Math.round(c/this.dragInterval)*this.dragInterval;s-=l-c,c=l}if(c<this.minSizeStart&&(c=this.minSizeStart),s<this.minSizeEnd&&(s=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=c+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var d=c/this.frToPixels;this.tracks[this.aTrack]=d+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var b=c/this.percentageToPixels;this.tracks[this.aTrack]=b+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=s+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=s/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var f=s/this.percentageToPixels;this.tracks[this.bTrack]=f+"%"}var p=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,p),this.onDrag(this.direction,this.track,p)};T.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Y),this.grid.removeEventListener("dragstart",Y),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};T.prototype.destroy=function(u,n){u===void 0&&(u=!0),u||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),n&&n()):(this.needsDestroy=!0,n&&(this.destroyCb=n))};var en=function(e,u,n){return u in e?e[u]:n},ce=function(e,u){return function(n){if(n.track<1)throw Error("Invalid track index: "+n.track+". Track must be between two other tracks.");var t=e==="column"?u.columnMinSizes||{}:u.rowMinSizes||{},r=e==="column"?"columnMinSize":"rowMinSize";return new T(e,Object.assign({},{minSizeStart:en(t,n.track-1,v(u,r,v(u,"minSize",0))),minSizeEnd:en(t,n.track+1,v(u,r,v(u,"minSize",0)))},n),u)}},ee=function(u){var n=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:u.columnGutters||[],rowGutters:u.rowGutters||[],columnMinSizes:u.columnMinSizes||{},rowMinSizes:u.rowMinSizes||{}},u),this.options.columnGutters.forEach(function(t){n.columnGutters[t.track]=ce("column",n.options)(t)}),this.options.rowGutters.forEach(function(t){n.rowGutters[t.track]=ce("row",n.options)(t)})};ee.prototype.addColumnGutter=function(u,n){this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=ce("column",this.options)({element:u,track:n})};ee.prototype.addRowGutter=function(u,n){this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=ce("row",this.options)({element:u,track:n})};ee.prototype.removeColumnGutter=function(u,n){var t=this;n===void 0&&(n=!0),this.columnGutters[u]&&this.columnGutters[u].destroy(n,function(){delete t.columnGutters[u]})};ee.prototype.removeRowGutter=function(u,n){var t=this;n===void 0&&(n=!0),this.rowGutters[u]&&this.rowGutters[u].destroy(n,function(){delete t.rowGutters[u]})};ee.prototype.handleDragStart=function(u,n,t){n==="column"?(this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=ce("column",this.options)({track:t}),this.columnGutters[t].startDragging(u)):n==="row"&&(this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=ce("row",this.options)({track:t}),this.rowGutters[t].startDragging(u))};ee.prototype.destroy=function(u){var n=this;u===void 0&&(u=!0),Object.keys(this.columnGutters).forEach(function(t){return n.columnGutters[t].destroy(u,function(){delete n.columnGutters[t]})}),Object.keys(this.rowGutters).forEach(function(t){return n.rowGutters[t].destroy(u,function(){delete n.rowGutters[t]})})};function ka(e){return new ee(e)}const xa=`.cm-focused {
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
  inset: 0;
  display: block;
  z-index: 10000;
}

.markdown-container .markdown-gutter {
  display: flex;
}

.markdown-container .markdown-body {
  display: block;
}

@media (prefers-color-scheme: dark) {
  .markdown-divider {
    background: #2a2a2a;
  }
}
`,Be=document.body,pe=document.createElement("div"),M=document.createElement("div"),un=Se("* { cursor: col-resize }",!1);var me=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(me||{});function ya(){Se(xa),Se(Rn()),Se(Ln());const e=document.createElement("div");e.className=U.dividerViewClass,pe.appendChild(e),pe.className=U.gutterViewClass,Be.appendChild(pe),M.className=U.previewPaneClass,Be.appendChild(M),document.addEventListener("keydown",t=>{t.metaKey&&t.key==="a"&&document.activeElement!==E.MarkEdit.editorView.contentDOM&&Yn(M)}),new MutationObserver(nn).observe(M,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{nn(),document.querySelector(".mermaid")!==null&&He()})}function $e(e,u=!0){const n=G.viewMode;G.viewMode=e,e!==n&&localStorage.setItem(U.viewModeCacheKey,String(e));const t=E.MarkEdit.editorView;e===0?t.focus():e===2&&t.contentDOM.blur(),e===1?(Be.classList.add(U.containerClass),G.splitter=ka({columnGutters:[{track:1,element:pe}],minSize:150,onDragStart:()=>un.disabled=!1,onDragEnd:()=>un.disabled=!0})):(Be.classList.remove(U.containerClass),G.splitter?.destroy()),e===2?M.classList.add("overlay"):M.classList.remove("overlay"),u&&He()}function wa(){const e=[0,...x0.map(t=>{switch(t){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(t=>t!==void 0)],u=e.indexOf(G.viewMode),n=u===-1?0:(u+1)%e.length;$e(e[n])}function _a(){const e=localStorage.getItem(U.viewModeCacheKey);e!==null&&$e(Number(e),!1)}function Ca(){return G.viewMode}async function He(){if(G.viewMode===0)return;const e=ta(await Ge());M.innerHTML=e,Q0(()=>{qn(Hn(),Gn(),!1);const u=localStorage.getItem(U.previewPageZoomKey);u!==null&&(M.style.zoom=u)})}function va(e){if(G.viewMode===0||G.viewMode===1&&E.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const u=Number(M.style.zoom)||1,n=t=>String(Math.min(Math.max(t,.5),3));switch(e.key){case"-":M.style.zoom=n(u-.1);break;case"=":M.style.zoom=n(u+.1);break;case"0":M.style.zoom="1";break;default:return}localStorage.setItem(U.previewPageZoomKey,M.style.zoom),e.preventDefault(),e.stopPropagation()}function Ea(){Un(!1)}function Da(){Un(!0)}async function Aa(){const e=await Ge(!1);await navigator.clipboard.writeText(e)}async function Fa(){const e=await Ge(!1),u=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([M.innerText],{type:"text/plain"})});await navigator.clipboard.write([u])}function Hn(){return E.MarkEdit.editorView.scrollDOM}function Gn(){return M}async function Ge(e=!0){const u=E.MarkEdit.editorAPI.getText();return await J0(u,e)}function nn(){const e=getComputedStyle(M).backgroundColor;pe.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function Un(e){const u=await(async()=>{const t=await E.MarkEdit.getFileInfo();return t===void 0?`${A("untitled")}.html`:`${Qn(t.filePath)}.html`})(),n=await(async()=>{const t=await Ge(!1);return e?await X0(t):t})();E.MarkEdit.showSavePanel({fileName:u,string:n})}const U={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"},G={viewMode:0,splitter:void 0};async function Sa(){if(!m0)return;const e=Date.now(),u=Number(localStorage.getItem(fe.lastCheckCacheKey)??"0");if(e-u<2592e5)return;localStorage.setItem(fe.lastCheckCacheKey,String(e));const t=await(await fetch(fe.latestReleaseURL)).json();if(t.name==="1.6.0")return;const r=new Set(JSON.parse(localStorage.getItem(fe.skippedCacheKey)??"[]"));if(r.has(t.name))return;const o=[A("viewReleasePage"),A("remindMeLater"),A("skipThisVersion")],i=await E.MarkEdit.showAlert({title:`MarkEdit-preview ${t.name} ${A("newVersionAvailable")}`,message:t.body,buttons:o});i===o.indexOf(A("viewReleasePage"))&&open(t.html_url),i===o.indexOf(A("skipThisVersion"))&&(r.add(t.name),localStorage.setItem(fe.skippedCacheKey,JSON.stringify([...r])))}const fe={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"};ya();setTimeout(Sa,4e3);E.MarkEdit.addMainMenuItem({title:A("viewMode"),icon:Jn()?"eye":void 0,children:[{title:A("changeMode"),action:wa,key:Qu.key??"V",modifiers:Qu.modifiers??["Command"]},{separator:!0},ou(A("editMode"),me.edit),ou(A("sideBySideMode"),me.sideBySide),ou(A("previewMode"),me.preview),{separator:!0},...Ta(),{separator:!0},{title:`${A("version")} 1.6.0`},{title:`${A("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")}]});E.MarkEdit.addExtension(Kn.EditorView.updateListener.of(e=>{e.docChanged&&(H.renderUpdater!==void 0&&clearTimeout(H.renderUpdater),H.renderUpdater=setTimeout(He,500))}));E.MarkEdit.onEditorReady(async()=>{k0&&ra(E.MarkEdit.editorView.scrollDOM),H.isInitiating&&(H.isInitiating=!1,_a()),typeof E.MarkEdit.getFileInfo=="function"&&(await E.MarkEdit.getFileInfo())?.filePath===void 0&&E.MarkEdit.editorAPI.getText().length===0&&$e(me.edit,!1),He(),aa(Hn(),Gn()),H.keyDownListener!==void 0&&document.removeEventListener("keydown",H.keyDownListener),H.keyDownListener=e=>va(e),document.addEventListener("keydown",H.keyDownListener)});function ou(e,u){return{title:e,action:()=>$e(u),state:()=>({isSelected:Ca()===u})}}function Ta(){const e=[{title:A("copyHtml"),action:Aa},{title:A("copyRichText"),action:Fa}];return typeof E.MarkEdit.showSavePanel>"u"?e:[{title:A("saveCleanHtml"),action:Ea},{title:A("saveStyledHtml"),action:Da},...e]}const H={isInitiating:!0,renderUpdater:void 0,keyDownListener:void 0};
