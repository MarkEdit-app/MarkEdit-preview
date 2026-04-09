"use strict";const wt=require("@codemirror/view"),D=require("markedit-api");function vt(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function Be(e,u=!0){const n=document.createElement("style");return n.textContent=e,document.head.appendChild(n),n.disabled=!u,n}function ju(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function _t(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function Ct(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(".cm-line")}function ge(e){const u=parseInt(e.dataset.lineFrom??"0"),n=parseInt(e.dataset.lineTo??"0");return{from:u,to:n}}function ku(e,u){let n=0,t=u;for(;t!==null&&t!==e;)n+=t.offsetTop,t=t.offsetParent;return n}function ru(e,u,n,t=!0){const r=ku(e,u)+u.offsetHeight*n;Le(e,r,t)}function Le(e,u,n=!0){const t=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:u<=t?0:u,behavior:n?"smooth":"instant"})}function Et(e){const u=document.createRange();u.selectNodeContents(e);const n=getSelection();n?.removeAllRanges(),n?.addRange(u)}function Dt(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function _n(e,u){return e.endsWith("/")?e+u:e+"/"+u}function At(e){return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}const Hu={};function Ft(e){let u=Hu[e];if(u)return u;u=Hu[e]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);u.push(t)}for(let n=0;n<e.length;n++){const t=e.charCodeAt(n);u[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return u}function se(e,u){typeof u!="string"&&(u=se.defaultChars);const n=Ft(u);return e.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let o=0,i=t.length;o<i;o+=3){const a=parseInt(t.slice(o+1,o+3),16);if(a<128){r+=n[a];continue}if((a&224)===192&&o+3<i){const s=parseInt(t.slice(o+4,o+6),16);if((s&192)===128){const d=a<<6&1984|s&63;d<128?r+="��":r+=String.fromCharCode(d),o+=3;continue}}if((a&240)===224&&o+6<i){const s=parseInt(t.slice(o+4,o+6),16),d=parseInt(t.slice(o+7,o+9),16);if((s&192)===128&&(d&192)===128){const b=a<<12&61440|s<<6&4032|d&63;b<2048||b>=55296&&b<=57343?r+="���":r+=String.fromCharCode(b),o+=6;continue}}if((a&248)===240&&o+9<i){const s=parseInt(t.slice(o+4,o+6),16),d=parseInt(t.slice(o+7,o+9),16),b=parseInt(t.slice(o+10,o+12),16);if((s&192)===128&&(d&192)===128&&(b&192)===128){let c=a<<18&1835008|s<<12&258048|d<<6&4032|b&63;c<65536||c>1114111?r+="����":(c-=65536,r+=String.fromCharCode(55296+(c>>10),56320+(c&1023))),o+=9;continue}}r+="�"}return r})}se.defaultChars=";/?:@&=+$,#";se.componentChars="";const Gu={};function St(e){let u=Gu[e];if(u)return u;u=Gu[e]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);/^[0-9a-z]$/i.test(t)?u.push(t):u.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)u[e.charCodeAt(n)]=e[n];return u}function Ae(e,u,n){typeof u!="string"&&(n=u,u=Ae.defaultChars),typeof n>"u"&&(n=!0);const t=St(u);let r="";for(let o=0,i=e.length;o<i;o++){const a=e.charCodeAt(o);if(n&&a===37&&o+2<i&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){r+=e.slice(o,o+3),o+=2;continue}if(a<128){r+=t[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&o+1<i){const s=e.charCodeAt(o+1);if(s>=56320&&s<=57343){r+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[o])}return r}Ae.defaultChars=";/?:@&=+$,-_.!~*'()#";Ae.componentChars="-_.!~*'()";function Du(e){let u="";return u+=e.protocol||"",u+=e.slashes?"//":"",u+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?u+="["+e.hostname+"]":u+=e.hostname||"",u+=e.port?":"+e.port:"",u+=e.pathname||"",u+=e.search||"",u+=e.hash||"",u}function Ne(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Tt=/^([a-z0-9.+-]+:)/i,Mt=/:[0-9]*$/,It=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,zt=["<",">",'"',"`"," ","\r",`
`,"	"],Rt=["{","}","|","\\","^","`"].concat(zt),Pt=["'"].concat(Rt),Uu=["%","/","?",";","#"].concat(Pt),Vu=["/","?","#"],Bt=255,Zu=/^[+a-z0-9A-Z_-]{0,63}$/,Lt=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Wu={javascript:!0,"javascript:":!0},Ju={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Au(e,u){if(e&&e instanceof Ne)return e;const n=new Ne;return n.parse(e,u),n}Ne.prototype.parse=function(e,u){let n,t,r,o=e;if(o=o.trim(),!u&&e.split("#").length===1){const d=It.exec(o);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let i=Tt.exec(o);if(i&&(i=i[0],n=i.toLowerCase(),this.protocol=i,o=o.substr(i.length)),(u||i||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(i&&Wu[i])&&(o=o.substr(2),this.slashes=!0)),!Wu[i]&&(r||i&&!Ju[i])){let d=-1;for(let f=0;f<Vu.length;f++)t=o.indexOf(Vu[f]),t!==-1&&(d===-1||t<d)&&(d=t);let b,c;d===-1?c=o.lastIndexOf("@"):c=o.lastIndexOf("@",d),c!==-1&&(b=o.slice(0,c),o=o.slice(c+1),this.auth=b),d=-1;for(let f=0;f<Uu.length;f++)t=o.indexOf(Uu[f]),t!==-1&&(d===-1||t<d)&&(d=t);d===-1&&(d=o.length),o[d-1]===":"&&d--;const h=o.slice(0,d);o=o.slice(d),this.parseHost(h),this.hostname=this.hostname||"";const l=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!l){const f=this.hostname.split(/\./);for(let p=0,m=f.length;p<m;p++){const g=f[p];if(g&&!g.match(Zu)){let k="";for(let y=0,x=g.length;y<x;y++)g.charCodeAt(y)>127?k+="x":k+=g[y];if(!k.match(Zu)){const y=f.slice(0,p),x=f.slice(p+1),w=g.match(Lt);w&&(y.push(w[1]),x.unshift(w[2])),x.length&&(o=x.join(".")+o),this.hostname=y.join(".");break}}}}this.hostname.length>Bt&&(this.hostname=""),l&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=o.indexOf("#");a!==-1&&(this.hash=o.substr(a),o=o.slice(0,a));const s=o.indexOf("?");return s!==-1&&(this.search=o.substr(s),o=o.slice(0,s)),o&&(this.pathname=o),Ju[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Ne.prototype.parseHost=function(e){let u=Mt.exec(e);u&&(u=u[0],u!==":"&&(this.port=u.substr(1)),e=e.substr(0,e.length-u.length)),e&&(this.hostname=e)};const Ot=Object.freeze(Object.defineProperty({__proto__:null,decode:se,encode:Ae,format:Du,parse:Au},Symbol.toStringTag,{value:"Module"})),Cn=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,En=/[\0-\x1F\x7F-\x9F]/,Nt=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Fu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Dn=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,An=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,qt=Object.freeze(Object.defineProperty({__proto__:null,Any:Cn,Cc:En,Cf:Nt,P:Fu,S:Dn,Z:An},Symbol.toStringTag,{value:"Module"})),$t=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),jt=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var ou;const Ht=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Gt=(ou=String.fromCodePoint)!==null&&ou!==void 0?ou:function(e){let u="";return e>65535&&(e-=65536,u+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),u+=String.fromCharCode(e),u};function Ut(e){var u;return e>=55296&&e<=57343||e>1114111?65533:(u=Ht.get(e))!==null&&u!==void 0?u:e}var T;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(T||(T={}));const Vt=32;var K;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(K||(K={}));function yu(e){return e>=T.ZERO&&e<=T.NINE}function Zt(e){return e>=T.UPPER_A&&e<=T.UPPER_F||e>=T.LOWER_A&&e<=T.LOWER_F}function Wt(e){return e>=T.UPPER_A&&e<=T.UPPER_Z||e>=T.LOWER_A&&e<=T.LOWER_Z||yu(e)}function Jt(e){return e===T.EQUALS||Wt(e)}var S;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(S||(S={}));var J;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(J||(J={}));class Kt{constructor(u,n,t){this.decodeTree=u,this.emitCodePoint=n,this.errors=t,this.state=S.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=J.Strict}startEntity(u){this.decodeMode=u,this.state=S.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(u,n){switch(this.state){case S.EntityStart:return u.charCodeAt(n)===T.NUM?(this.state=S.NumericStart,this.consumed+=1,this.stateNumericStart(u,n+1)):(this.state=S.NamedEntity,this.stateNamedEntity(u,n));case S.NumericStart:return this.stateNumericStart(u,n);case S.NumericDecimal:return this.stateNumericDecimal(u,n);case S.NumericHex:return this.stateNumericHex(u,n);case S.NamedEntity:return this.stateNamedEntity(u,n)}}stateNumericStart(u,n){return n>=u.length?-1:(u.charCodeAt(n)|Vt)===T.LOWER_X?(this.state=S.NumericHex,this.consumed+=1,this.stateNumericHex(u,n+1)):(this.state=S.NumericDecimal,this.stateNumericDecimal(u,n))}addToNumericResult(u,n,t,r){if(n!==t){const o=t-n;this.result=this.result*Math.pow(r,o)+parseInt(u.substr(n,o),r),this.consumed+=o}}stateNumericHex(u,n){const t=n;for(;n<u.length;){const r=u.charCodeAt(n);if(yu(r)||Zt(r))n+=1;else return this.addToNumericResult(u,t,n,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(u,t,n,16),-1}stateNumericDecimal(u,n){const t=n;for(;n<u.length;){const r=u.charCodeAt(n);if(yu(r))n+=1;else return this.addToNumericResult(u,t,n,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(u,t,n,10),-1}emitNumericEntity(u,n){var t;if(this.consumed<=n)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(u===T.SEMI)this.consumed+=1;else if(this.decodeMode===J.Strict)return 0;return this.emitCodePoint(Ut(this.result),this.consumed),this.errors&&(u!==T.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(u,n){const{decodeTree:t}=this;let r=t[this.treeIndex],o=(r&K.VALUE_LENGTH)>>14;for(;n<u.length;n++,this.excess++){const i=u.charCodeAt(n);if(this.treeIndex=Qt(t,r,this.treeIndex+Math.max(1,o),i),this.treeIndex<0)return this.result===0||this.decodeMode===J.Attribute&&(o===0||Jt(i))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],o=(r&K.VALUE_LENGTH)>>14,o!==0){if(i===T.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==J.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var u;const{result:n,decodeTree:t}=this,r=(t[n]&K.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,r,this.consumed),(u=this.errors)===null||u===void 0||u.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(u,n,t){const{decodeTree:r}=this;return this.emitCodePoint(n===1?r[u]&~K.VALUE_LENGTH:r[u+1],t),n===3&&this.emitCodePoint(r[u+2],t),t}end(){var u;switch(this.state){case S.NamedEntity:return this.result!==0&&(this.decodeMode!==J.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case S.NumericDecimal:return this.emitNumericEntity(0,2);case S.NumericHex:return this.emitNumericEntity(0,3);case S.NumericStart:return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case S.EntityStart:return 0}}}function Fn(e){let u="";const n=new Kt(e,t=>u+=Gt(t));return function(r,o){let i=0,a=0;for(;(a=r.indexOf("&",a))>=0;){u+=r.slice(i,a),n.startEntity(o);const d=n.write(r,a+1);if(d<0){i=a+n.end();break}i=a+d,a=d===0?i+1:i}const s=u+r.slice(i);return u="",s}}function Qt(e,u,n,t){const r=(u&K.BRANCH_LENGTH)>>7,o=u&K.JUMP_TABLE;if(r===0)return o!==0&&t===o?n:-1;if(o){const s=t-o;return s<0||s>=r?-1:e[n+s]-1}let i=n,a=i+r-1;for(;i<=a;){const s=i+a>>>1,d=e[s];if(d<t)i=s+1;else if(d>t)a=s-1;else return e[s+r]}return-1}const Xt=Fn($t);Fn(jt);function Sn(e,u=J.Legacy){return Xt(e,u)}function Yt(e){return Object.prototype.toString.call(e)}function Su(e){return Yt(e)==="[object String]"}const er=Object.prototype.hasOwnProperty;function ur(e,u){return er.call(e,u)}function Ue(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(t){e[t]=n[t]})}}),e}function Tn(e,u,n){return[].concat(e.slice(0,u),n,e.slice(u+1))}function Tu(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function qe(e){if(e>65535){e-=65536;const u=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(u,n)}return String.fromCharCode(e)}const Mn=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,nr=/&([a-z#][a-z0-9]{1,31});/gi,tr=new RegExp(Mn.source+"|"+nr.source,"gi"),rr=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function or(e,u){if(u.charCodeAt(0)===35&&rr.test(u)){const t=u[1].toLowerCase()==="x"?parseInt(u.slice(2),16):parseInt(u.slice(1),10);return Tu(t)?qe(t):e}const n=Sn(e);return n!==e?n:e}function ar(e){return e.indexOf("\\")<0?e:e.replace(Mn,"$1")}function le(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(tr,function(u,n,t){return n||or(u,t)})}const ir=/[&<>"]/,cr=/[&<>"]/g,sr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function lr(e){return sr[e]}function X(e){return ir.test(e)?e.replace(cr,lr):e}const dr=/[.?*+^$[\]\\(){}|-]/g;function fr(e){return e.replace(dr,"\\$&")}function E(e){switch(e){case 9:case 32:return!0}return!1}function _e(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Ce(e){return Fu.test(e)||Dn.test(e)}function Ee(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Ve(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}const hr={mdurl:Ot,ucmicro:qt},br=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Tn,assign:Ue,escapeHtml:X,escapeRE:fr,fromCodePoint:qe,has:ur,isMdAsciiPunct:Ee,isPunctChar:Ce,isSpace:E,isString:Su,isValidEntityCode:Tu,isWhiteSpace:_e,lib:hr,normalizeReference:Ve,unescapeAll:le,unescapeMd:ar},Symbol.toStringTag,{value:"Module"}));function pr(e,u,n){let t,r,o,i;const a=e.posMax,s=e.pos;for(e.pos=u+1,t=1;e.pos<a;){if(o=e.src.charCodeAt(e.pos),o===93&&(t--,t===0)){r=!0;break}if(i=e.pos,e.md.inline.skipToken(e),o===91){if(i===e.pos-1)t++;else if(n)return e.pos=s,-1}}let d=-1;return r&&(d=e.pos),e.pos=s,d}function mr(e,u,n){let t,r=u;const o={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<n;){if(t=e.charCodeAt(r),t===10||t===60)return o;if(t===62)return o.pos=r+1,o.str=le(e.slice(u+1,r)),o.ok=!0,o;if(t===92&&r+1<n){r+=2;continue}r++}return o}let i=0;for(;r<n&&(t=e.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<n){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(i++,i>32))return o;if(t===41){if(i===0)break;i--}r++}return u===r||i!==0||(o.str=le(e.slice(u,r)),o.pos=r,o.ok=!0),o}function gr(e,u,n,t){let r,o=u;const i={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)i.str=t.str,i.marker=t.marker;else{if(o>=n)return i;let a=e.charCodeAt(o);if(a!==34&&a!==39&&a!==40)return i;u++,o++,a===40&&(a=41),i.marker=a}for(;o<n;){if(r=e.charCodeAt(o),r===i.marker)return i.pos=o+1,i.str+=le(e.slice(u,o)),i.ok=!0,i;if(r===40&&i.marker===41)return i;r===92&&o+1<n&&o++,o++}return i.can_continue=!0,i.str+=le(e.slice(u,o)),i}const kr=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:mr,parseLinkLabel:pr,parseLinkTitle:gr},Symbol.toStringTag,{value:"Module"})),U={};U.code_inline=function(e,u,n,t,r){const o=e[u];return"<code"+r.renderAttrs(o)+">"+X(o.content)+"</code>"};U.code_block=function(e,u,n,t,r){const o=e[u];return"<pre"+r.renderAttrs(o)+"><code>"+X(e[u].content)+`</code></pre>
`};U.fence=function(e,u,n,t,r){const o=e[u],i=o.info?le(o.info).trim():"";let a="",s="";if(i){const b=i.split(/(\s+)/g);a=b[0],s=b.slice(2).join("")}let d;if(n.highlight?d=n.highlight(o.content,a,s)||X(o.content):d=X(o.content),d.indexOf("<pre")===0)return d+`
`;if(i){const b=o.attrIndex("class"),c=o.attrs?o.attrs.slice():[];b<0?c.push(["class",n.langPrefix+a]):(c[b]=c[b].slice(),c[b][1]+=" "+n.langPrefix+a);const h={attrs:c};return`<pre><code${r.renderAttrs(h)}>${d}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${d}</code></pre>
`};U.image=function(e,u,n,t,r){const o=e[u];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,n,t),r.renderToken(e,u,n)};U.hardbreak=function(e,u,n){return n.xhtmlOut?`<br />
`:`<br>
`};U.softbreak=function(e,u,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};U.text=function(e,u){return X(e[u].content)};U.html_block=function(e,u){return e[u].content};U.html_inline=function(e,u){return e[u].content};function he(){this.rules=Ue({},U)}he.prototype.renderAttrs=function(u){let n,t,r;if(!u.attrs)return"";for(r="",n=0,t=u.attrs.length;n<t;n++)r+=" "+X(u.attrs[n][0])+'="'+X(u.attrs[n][1])+'"';return r};he.prototype.renderToken=function(u,n,t){const r=u[n];let o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&n&&u[n-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(o+=" /");let i=!1;if(r.block&&(i=!0,r.nesting===1&&n+1<u.length)){const a=u[n+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===r.tag)&&(i=!1)}return o+=i?`>
`:">",o};he.prototype.renderInline=function(e,u,n){let t="";const r=this.rules;for(let o=0,i=e.length;o<i;o++){const a=e[o].type;typeof r[a]<"u"?t+=r[a](e,o,u,n,this):t+=this.renderToken(e,o,u)}return t};he.prototype.renderInlineAsText=function(e,u,n){let t="";for(let r=0,o=e.length;r<o;r++)switch(e[r].type){case"text":t+=e[r].content;break;case"image":t+=this.renderInlineAsText(e[r].children,u,n);break;case"html_inline":case"html_block":t+=e[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t};he.prototype.render=function(e,u,n){let t="";const r=this.rules;for(let o=0,i=e.length;o<i;o++){const a=e[o].type;a==="inline"?t+=this.renderInline(e[o].children,u,n):typeof r[a]<"u"?t+=r[a](e,o,u,n,this):t+=this.renderToken(e,o,u,n)}return t};function R(){this.__rules__=[],this.__cache__=null}R.prototype.__find__=function(e){for(let u=0;u<this.__rules__.length;u++)if(this.__rules__[u].name===e)return u;return-1};R.prototype.__compile__=function(){const e=this,u=[""];e.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(t){u.indexOf(t)<0&&u.push(t)})}),e.__cache__={},u.forEach(function(n){e.__cache__[n]=[],e.__rules__.forEach(function(t){t.enabled&&(n&&t.alt.indexOf(n)<0||e.__cache__[n].push(t.fn))})})};R.prototype.at=function(e,u,n){const t=this.__find__(e),r=n||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__[t].fn=u,this.__rules__[t].alt=r.alt||[],this.__cache__=null};R.prototype.before=function(e,u,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:u,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};R.prototype.after=function(e,u,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:u,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};R.prototype.push=function(e,u,n){const t=n||{};this.__rules__.push({name:e,enabled:!0,fn:u,alt:t.alt||[]}),this.__cache__=null};R.prototype.enable=function(e,u){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,n.push(t)},this),this.__cache__=null,n};R.prototype.enableOnly=function(e,u){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(e,u)};R.prototype.disable=function(e,u){Array.isArray(e)||(e=[e]);const n=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,n.push(t)},this),this.__cache__=null,n};R.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function $(e,u,n){this.type=e,this.tag=u,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}$.prototype.attrIndex=function(u){if(!this.attrs)return-1;const n=this.attrs;for(let t=0,r=n.length;t<r;t++)if(n[t][0]===u)return t;return-1};$.prototype.attrPush=function(u){this.attrs?this.attrs.push(u):this.attrs=[u]};$.prototype.attrSet=function(u,n){const t=this.attrIndex(u),r=[u,n];t<0?this.attrPush(r):this.attrs[t]=r};$.prototype.attrGet=function(u){const n=this.attrIndex(u);let t=null;return n>=0&&(t=this.attrs[n][1]),t};$.prototype.attrJoin=function(u,n){const t=this.attrIndex(u);t<0?this.attrPush([u,n]):this.attrs[t][1]=this.attrs[t][1]+" "+n};function In(e,u,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=u}In.prototype.Token=$;const yr=/\r\n?|\n/g,xr=/\0/g;function wr(e){let u;u=e.src.replace(yr,`
`),u=u.replace(xr,"�"),e.src=u}function vr(e){let u;e.inlineMode?(u=new e.Token("inline","",0),u.content=e.src,u.map=[0,1],u.children=[],e.tokens.push(u)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function _r(e){const u=e.tokens;for(let n=0,t=u.length;n<t;n++){const r=u[n];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function Cr(e){return/^<a[>\s]/i.test(e)}function Er(e){return/^<\/a\s*>/i.test(e)}function Dr(e){const u=e.tokens;if(e.md.options.linkify)for(let n=0,t=u.length;n<t;n++){if(u[n].type!=="inline"||!e.md.linkify.pretest(u[n].content))continue;let r=u[n].children,o=0;for(let i=r.length-1;i>=0;i--){const a=r[i];if(a.type==="link_close"){for(i--;r[i].level!==a.level&&r[i].type!=="link_open";)i--;continue}if(a.type==="html_inline"&&(Cr(a.content)&&o>0&&o--,Er(a.content)&&o++),!(o>0)&&a.type==="text"&&e.md.linkify.test(a.content)){const s=a.content;let d=e.md.linkify.match(s);const b=[];let c=a.level,h=0;d.length>0&&d[0].index===0&&i>0&&r[i-1].type==="text_special"&&(d=d.slice(1));for(let l=0;l<d.length;l++){const f=d[l].url,p=e.md.normalizeLink(f);if(!e.md.validateLink(p))continue;let m=d[l].text;d[l].schema?d[l].schema==="mailto:"&&!/^mailto:/i.test(m)?m=e.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=e.md.normalizeLinkText(m):m=e.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const g=d[l].index;if(g>h){const w=new e.Token("text","",0);w.content=s.slice(h,g),w.level=c,b.push(w)}const k=new e.Token("link_open","a",1);k.attrs=[["href",p]],k.level=c++,k.markup="linkify",k.info="auto",b.push(k);const y=new e.Token("text","",0);y.content=m,y.level=c,b.push(y);const x=new e.Token("link_close","a",-1);x.level=--c,x.markup="linkify",x.info="auto",b.push(x),h=d[l].lastIndex}if(h<s.length){const l=new e.Token("text","",0);l.content=s.slice(h),l.level=c,b.push(l)}u[n].children=r=Tn(r,i,b)}}}}const zn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Ar=/\((c|tm|r)\)/i,Fr=/\((c|tm|r)\)/ig,Sr={c:"©",r:"®",tm:"™"};function Tr(e,u){return Sr[u.toLowerCase()]}function Mr(e){let u=0;for(let n=e.length-1;n>=0;n--){const t=e[n];t.type==="text"&&!u&&(t.content=t.content.replace(Fr,Tr)),t.type==="link_open"&&t.info==="auto"&&u--,t.type==="link_close"&&t.info==="auto"&&u++}}function Ir(e){let u=0;for(let n=e.length-1;n>=0;n--){const t=e[n];t.type==="text"&&!u&&zn.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&u--,t.type==="link_close"&&t.info==="auto"&&u++}}function zr(e){let u;if(e.md.options.typographer)for(u=e.tokens.length-1;u>=0;u--)e.tokens[u].type==="inline"&&(Ar.test(e.tokens[u].content)&&Mr(e.tokens[u].children),zn.test(e.tokens[u].content)&&Ir(e.tokens[u].children))}const Rr=/['"]/,Ku=/['"]/g,Qu="’";function Ie(e,u,n){return e.slice(0,u)+n+e.slice(u+1)}function Pr(e,u){let n;const t=[];for(let r=0;r<e.length;r++){const o=e[r],i=e[r].level;for(n=t.length-1;n>=0&&!(t[n].level<=i);n--);if(t.length=n+1,o.type!=="text")continue;let a=o.content,s=0,d=a.length;e:for(;s<d;){Ku.lastIndex=s;const b=Ku.exec(a);if(!b)break;let c=!0,h=!0;s=b.index+1;const l=b[0]==="'";let f=32;if(b.index-1>=0)f=a.charCodeAt(b.index-1);else for(n=r-1;n>=0&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n--)if(e[n].content){f=e[n].content.charCodeAt(e[n].content.length-1);break}let p=32;if(s<d)p=a.charCodeAt(s);else for(n=r+1;n<e.length&&!(e[n].type==="softbreak"||e[n].type==="hardbreak");n++)if(e[n].content){p=e[n].content.charCodeAt(0);break}const m=Ee(f)||Ce(String.fromCharCode(f)),g=Ee(p)||Ce(String.fromCharCode(p)),k=_e(f),y=_e(p);if(y?c=!1:g&&(k||m||(c=!1)),k?h=!1:m&&(y||g||(h=!1)),p===34&&b[0]==='"'&&f>=48&&f<=57&&(h=c=!1),c&&h&&(c=m,h=g),!c&&!h){l&&(o.content=Ie(o.content,b.index,Qu));continue}if(h)for(n=t.length-1;n>=0;n--){let x=t[n];if(t[n].level<i)break;if(x.single===l&&t[n].level===i){x=t[n];let w,v;l?(w=u.md.options.quotes[2],v=u.md.options.quotes[3]):(w=u.md.options.quotes[0],v=u.md.options.quotes[1]),o.content=Ie(o.content,b.index,v),e[x.token].content=Ie(e[x.token].content,x.pos,w),s+=v.length-1,x.token===r&&(s+=w.length-1),a=o.content,d=a.length,t.length=n;continue e}}c?t.push({token:r,pos:b.index,single:l,level:i}):h&&l&&(o.content=Ie(o.content,b.index,Qu))}}}function Br(e){if(e.md.options.typographer)for(let u=e.tokens.length-1;u>=0;u--)e.tokens[u].type!=="inline"||!Rr.test(e.tokens[u].content)||Pr(e.tokens[u].children,e)}function Lr(e){let u,n;const t=e.tokens,r=t.length;for(let o=0;o<r;o++){if(t[o].type!=="inline")continue;const i=t[o].children,a=i.length;for(u=0;u<a;u++)i[u].type==="text_special"&&(i[u].type="text");for(u=n=0;u<a;u++)i[u].type==="text"&&u+1<a&&i[u+1].type==="text"?i[u+1].content=i[u].content+i[u+1].content:(u!==n&&(i[n]=i[u]),n++);u!==n&&(i.length=n)}}const au=[["normalize",wr],["block",vr],["inline",_r],["linkify",Dr],["replacements",zr],["smartquotes",Br],["text_join",Lr]];function Mu(){this.ruler=new R;for(let e=0;e<au.length;e++)this.ruler.push(au[e][0],au[e][1])}Mu.prototype.process=function(e){const u=this.ruler.getRules("");for(let n=0,t=u.length;n<t;n++)u[n](e)};Mu.prototype.State=In;function V(e,u,n,t){this.src=e,this.md=u,this.env=n,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let o=0,i=0,a=0,s=0,d=r.length,b=!1;i<d;i++){const c=r.charCodeAt(i);if(!b)if(E(c)){a++,c===9?s+=4-s%4:s++;continue}else b=!0;(c===10||i===d-1)&&(c!==10&&i++,this.bMarks.push(o),this.eMarks.push(i),this.tShift.push(a),this.sCount.push(s),this.bsCount.push(0),b=!1,a=0,s=0,o=i+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}V.prototype.push=function(e,u,n){const t=new $(e,u,n);return t.block=!0,n<0&&this.level--,t.level=this.level,n>0&&this.level++,this.tokens.push(t),t};V.prototype.isEmpty=function(u){return this.bMarks[u]+this.tShift[u]>=this.eMarks[u]};V.prototype.skipEmptyLines=function(u){for(let n=this.lineMax;u<n&&!(this.bMarks[u]+this.tShift[u]<this.eMarks[u]);u++);return u};V.prototype.skipSpaces=function(u){for(let n=this.src.length;u<n;u++){const t=this.src.charCodeAt(u);if(!E(t))break}return u};V.prototype.skipSpacesBack=function(u,n){if(u<=n)return u;for(;u>n;)if(!E(this.src.charCodeAt(--u)))return u+1;return u};V.prototype.skipChars=function(u,n){for(let t=this.src.length;u<t&&this.src.charCodeAt(u)===n;u++);return u};V.prototype.skipCharsBack=function(u,n,t){if(u<=t)return u;for(;u>t;)if(n!==this.src.charCodeAt(--u))return u+1;return u};V.prototype.getLines=function(u,n,t,r){if(u>=n)return"";const o=new Array(n-u);for(let i=0,a=u;a<n;a++,i++){let s=0;const d=this.bMarks[a];let b=d,c;for(a+1<n||r?c=this.eMarks[a]+1:c=this.eMarks[a];b<c&&s<t;){const h=this.src.charCodeAt(b);if(E(h))h===9?s+=4-(s+this.bsCount[a])%4:s++;else if(b-d<this.tShift[a])s++;else break;b++}s>t?o[i]=new Array(s-t+1).join(" ")+this.src.slice(b,c):o[i]=this.src.slice(b,c)}return o.join("")};V.prototype.Token=$;const Or=65536;function iu(e,u){const n=e.bMarks[u]+e.tShift[u],t=e.eMarks[u];return e.src.slice(n,t)}function Xu(e){const u=[],n=e.length;let t=0,r=e.charCodeAt(t),o=!1,i=0,a="";for(;t<n;)r===124&&(o?(a+=e.substring(i,t-1),i=t):(u.push(a+e.substring(i,t)),a="",i=t+1)),o=r===92,t++,r=e.charCodeAt(t);return u.push(a+e.substring(i)),u}function Nr(e,u,n,t){if(u+2>n)return!1;let r=u+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let o=e.bMarks[r]+e.tShift[r];if(o>=e.eMarks[r])return!1;const i=e.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58||o>=e.eMarks[r])return!1;const a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58&&!E(a)||i===45&&E(a))return!1;for(;o<e.eMarks[r];){const x=e.src.charCodeAt(o);if(x!==124&&x!==45&&x!==58&&!E(x))return!1;o++}let s=iu(e,u+1),d=s.split("|");const b=[];for(let x=0;x<d.length;x++){const w=d[x].trim();if(!w){if(x===0||x===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(w))return!1;w.charCodeAt(w.length-1)===58?b.push(w.charCodeAt(0)===58?"center":"right"):w.charCodeAt(0)===58?b.push("left"):b.push("")}if(s=iu(e,u).trim(),s.indexOf("|")===-1||e.sCount[u]-e.blkIndent>=4)return!1;d=Xu(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const c=d.length;if(c===0||c!==b.length)return!1;if(t)return!0;const h=e.parentType;e.parentType="table";const l=e.md.block.ruler.getRules("blockquote"),f=e.push("table_open","table",1),p=[u,0];f.map=p;const m=e.push("thead_open","thead",1);m.map=[u,u+1];const g=e.push("tr_open","tr",1);g.map=[u,u+1];for(let x=0;x<d.length;x++){const w=e.push("th_open","th",1);b[x]&&(w.attrs=[["style","text-align:"+b[x]]]);const v=e.push("inline","",0);v.content=d[x].trim(),v.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let k,y=0;for(r=u+2;r<n&&!(e.sCount[r]<e.blkIndent);r++){let x=!1;for(let v=0,_=l.length;v<_;v++)if(l[v](e,r,n,!0)){x=!0;break}if(x||(s=iu(e,r).trim(),!s)||e.sCount[r]-e.blkIndent>=4||(d=Xu(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),y+=c-d.length,y>Or))break;if(r===u+2){const v=e.push("tbody_open","tbody",1);v.map=k=[u+2,0]}const w=e.push("tr_open","tr",1);w.map=[r,r+1];for(let v=0;v<c;v++){const _=e.push("td_open","td",1);b[v]&&(_.attrs=[["style","text-align:"+b[v]]]);const C=e.push("inline","",0);C.content=d[v]?d[v].trim():"",C.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return k&&(e.push("tbody_close","tbody",-1),k[1]=r),e.push("table_close","table",-1),p[1]=r,e.parentType=h,e.line=r,!0}function qr(e,u,n){if(e.sCount[u]-e.blkIndent<4)return!1;let t=u+1,r=t;for(;t<n;){if(e.isEmpty(t)){t++;continue}if(e.sCount[t]-e.blkIndent>=4){t++,r=t;continue}break}e.line=r;const o=e.push("code_block","code",0);return o.content=e.getLines(u,r,4+e.blkIndent,!1)+`
`,o.map=[u,e.line],!0}function $r(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||r+3>o)return!1;const i=e.src.charCodeAt(r);if(i!==126&&i!==96)return!1;let a=r;r=e.skipChars(r,i);let s=r-a;if(s<3)return!1;const d=e.src.slice(a,r),b=e.src.slice(r,o);if(i===96&&b.indexOf(String.fromCharCode(i))>=0)return!1;if(t)return!0;let c=u,h=!1;for(;c++,!(c>=n||(r=a=e.bMarks[c]+e.tShift[c],o=e.eMarks[c],r<o&&e.sCount[c]<e.blkIndent));)if(e.src.charCodeAt(r)===i&&!(e.sCount[c]-e.blkIndent>=4)&&(r=e.skipChars(r,i),!(r-a<s)&&(r=e.skipSpaces(r),!(r<o)))){h=!0;break}s=e.sCount[u],e.line=c+(h?1:0);const l=e.push("fence","code",0);return l.info=b,l.content=e.getLines(u+1,c,s,!0),l.markup=d,l.map=[u,e.line],!0}function jr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];const i=e.lineMax;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(t)return!0;const a=[],s=[],d=[],b=[],c=e.md.block.ruler.getRules("blockquote"),h=e.parentType;e.parentType="blockquote";let l=!1,f;for(f=u;f<n;f++){const y=e.sCount[f]<e.blkIndent;if(r=e.bMarks[f]+e.tShift[f],o=e.eMarks[f],r>=o)break;if(e.src.charCodeAt(r++)===62&&!y){let w=e.sCount[f]+1,v,_;e.src.charCodeAt(r)===32?(r++,w++,_=!1,v=!0):e.src.charCodeAt(r)===9?(v=!0,(e.bsCount[f]+w)%4===3?(r++,w++,_=!1):_=!0):v=!1;let C=w;for(a.push(e.bMarks[f]),e.bMarks[f]=r;r<o;){const I=e.src.charCodeAt(r);if(E(I))I===9?C+=4-(C+e.bsCount[f]+(_?1:0))%4:C++;else break;r++}l=r>=o,s.push(e.bsCount[f]),e.bsCount[f]=e.sCount[f]+1+(v?1:0),d.push(e.sCount[f]),e.sCount[f]=C-w,b.push(e.tShift[f]),e.tShift[f]=r-e.bMarks[f];continue}if(l)break;let x=!1;for(let w=0,v=c.length;w<v;w++)if(c[w](e,f,n,!0)){x=!0;break}if(x){e.lineMax=f,e.blkIndent!==0&&(a.push(e.bMarks[f]),s.push(e.bsCount[f]),b.push(e.tShift[f]),d.push(e.sCount[f]),e.sCount[f]-=e.blkIndent);break}a.push(e.bMarks[f]),s.push(e.bsCount[f]),b.push(e.tShift[f]),d.push(e.sCount[f]),e.sCount[f]=-1}const p=e.blkIndent;e.blkIndent=0;const m=e.push("blockquote_open","blockquote",1);m.markup=">";const g=[u,0];m.map=g,e.md.block.tokenize(e,u,f);const k=e.push("blockquote_close","blockquote",-1);k.markup=">",e.lineMax=i,e.parentType=h,g[1]=e.line;for(let y=0;y<b.length;y++)e.bMarks[y+u]=a[y],e.tShift[y+u]=b[y],e.sCount[y+u]=d[y],e.bsCount[y+u]=s[y];return e.blkIndent=p,!0}function Hr(e,u,n,t){const r=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let o=e.bMarks[u]+e.tShift[u];const i=e.src.charCodeAt(o++);if(i!==42&&i!==45&&i!==95)return!1;let a=1;for(;o<r;){const d=e.src.charCodeAt(o++);if(d!==i&&!E(d))return!1;d===i&&a++}if(a<3)return!1;if(t)return!0;e.line=u+1;const s=e.push("hr","hr",0);return s.map=[u,e.line],s.markup=Array(a+1).join(String.fromCharCode(i)),!0}function Yu(e,u){const n=e.eMarks[u];let t=e.bMarks[u]+e.tShift[u];const r=e.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<n){const o=e.src.charCodeAt(t);if(!E(o))return-1}return t}function en(e,u){const n=e.bMarks[u]+e.tShift[u],t=e.eMarks[u];let r=n;if(r+1>=t)return-1;let o=e.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=t)return-1;if(o=e.src.charCodeAt(r++),o>=48&&o<=57){if(r-n>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<t&&(o=e.src.charCodeAt(r),!E(o))?-1:r}function Gr(e,u){const n=e.level+2;for(let t=u+2,r=e.tokens.length-2;t<r;t++)e.tokens[t].level===n&&e.tokens[t].type==="paragraph_open"&&(e.tokens[t+2].hidden=!0,e.tokens[t].hidden=!0,t+=2)}function Ur(e,u,n,t){let r,o,i,a,s=u,d=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let b=!1;t&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(b=!0);let c,h,l;if((l=en(e,s))>=0){if(c=!0,i=e.bMarks[s]+e.tShift[s],h=Number(e.src.slice(i,l-1)),b&&h!==1)return!1}else if((l=Yu(e,s))>=0)c=!1;else return!1;if(b&&e.skipSpaces(l)>=e.eMarks[s])return!1;if(t)return!0;const f=e.src.charCodeAt(l-1),p=e.tokens.length;c?(a=e.push("ordered_list_open","ol",1),h!==1&&(a.attrs=[["start",h]])):a=e.push("bullet_list_open","ul",1);const m=[s,0];a.map=m,a.markup=String.fromCharCode(f);let g=!1;const k=e.md.block.ruler.getRules("list"),y=e.parentType;for(e.parentType="list";s<n;){o=l,r=e.eMarks[s];const x=e.sCount[s]+l-(e.bMarks[s]+e.tShift[s]);let w=x;for(;o<r;){const oe=e.src.charCodeAt(o);if(oe===9)w+=4-(w+e.bsCount[s])%4;else if(oe===32)w++;else break;o++}const v=o;let _;v>=r?_=1:_=w-x,_>4&&(_=1);const C=x+_;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(f);const I=[s,0];a.map=I,c&&(a.info=e.src.slice(i,l-1));const Y=e.tight,tu=e.tShift[s],kt=e.sCount[s],yt=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=C,e.tight=!0,e.tShift[s]=v-e.bMarks[s],e.sCount[s]=w,v>=r&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,s,n,!0),(!e.tight||g)&&(d=!1),g=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=yt,e.tShift[s]=tu,e.sCount[s]=kt,e.tight=Y,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(f),s=e.line,I[1]=s,s>=n||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let $u=!1;for(let oe=0,xt=k.length;oe<xt;oe++)if(k[oe](e,s,n,!0)){$u=!0;break}if($u)break;if(c){if(l=en(e,s),l<0)break;i=e.bMarks[s]+e.tShift[s]}else if(l=Yu(e,s),l<0)break;if(f!==e.src.charCodeAt(l-1))break}return c?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(f),m[1]=s,e.line=s,e.parentType=y,d&&Gr(e,p),!0}function Vr(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u],i=u+1;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function a(k){const y=e.lineMax;if(k>=y||e.isEmpty(k))return null;let x=!1;if(e.sCount[k]-e.blkIndent>3&&(x=!0),e.sCount[k]<0&&(x=!0),!x){const _=e.md.block.ruler.getRules("reference"),C=e.parentType;e.parentType="reference";let I=!1;for(let Y=0,tu=_.length;Y<tu;Y++)if(_[Y](e,k,y,!0)){I=!0;break}if(e.parentType=C,I)return null}const w=e.bMarks[k]+e.tShift[k],v=e.eMarks[k];return e.src.slice(w,v+1)}let s=e.src.slice(r,o+1);o=s.length;let d=-1;for(r=1;r<o;r++){const k=s.charCodeAt(r);if(k===91)return!1;if(k===93){d=r;break}else if(k===10){const y=a(i);y!==null&&(s+=y,o=s.length,i++)}else if(k===92&&(r++,r<o&&s.charCodeAt(r)===10)){const y=a(i);y!==null&&(s+=y,o=s.length,i++)}}if(d<0||s.charCodeAt(d+1)!==58)return!1;for(r=d+2;r<o;r++){const k=s.charCodeAt(r);if(k===10){const y=a(i);y!==null&&(s+=y,o=s.length,i++)}else if(!E(k))break}const b=e.md.helpers.parseLinkDestination(s,r,o);if(!b.ok)return!1;const c=e.md.normalizeLink(b.str);if(!e.md.validateLink(c))return!1;r=b.pos;const h=r,l=i,f=r;for(;r<o;r++){const k=s.charCodeAt(r);if(k===10){const y=a(i);y!==null&&(s+=y,o=s.length,i++)}else if(!E(k))break}let p=e.md.helpers.parseLinkTitle(s,r,o);for(;p.can_continue;){const k=a(i);if(k===null)break;s+=k,r=o,o=s.length,i++,p=e.md.helpers.parseLinkTitle(s,r,o,p)}let m;for(r<o&&f!==r&&p.ok?(m=p.str,r=p.pos):(m="",r=h,i=l);r<o;){const k=s.charCodeAt(r);if(!E(k))break;r++}if(r<o&&s.charCodeAt(r)!==10&&m)for(m="",r=h,i=l;r<o;){const k=s.charCodeAt(r);if(!E(k))break;r++}if(r<o&&s.charCodeAt(r)!==10)return!1;const g=Ve(s.slice(1,d));return g?(t||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[g]>"u"&&(e.env.references[g]={title:m,href:c}),e.line=i),!0):!1}const Zr=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Wr="[a-zA-Z_:][a-zA-Z0-9:._-]*",Jr="[^\"'=<>`\\x00-\\x20]+",Kr="'[^']*'",Qr='"[^"]*"',Xr="(?:"+Jr+"|"+Kr+"|"+Qr+")",Yr="(?:\\s+"+Wr+"(?:\\s*=\\s*"+Xr+")?)",Rn="<[A-Za-z][A-Za-z0-9\\-]*"+Yr+"*\\s*\\/?>",Pn="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",eo="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",uo="<[?][\\s\\S]*?[?]>",no="<![A-Za-z][^>]*>",to="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",ro=new RegExp("^(?:"+Rn+"|"+Pn+"|"+eo+"|"+uo+"|"+no+"|"+to+")"),oo=new RegExp("^(?:"+Rn+"|"+Pn+")"),ae=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Zr.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(oo.source+"\\s*$"),/^$/,!1]];function ao(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let i=e.src.slice(r,o),a=0;for(;a<ae.length&&!ae[a][0].test(i);a++);if(a===ae.length)return!1;if(t)return ae[a][2];let s=u+1;if(!ae[a][1].test(i)){for(;s<n&&!(e.sCount[s]<e.blkIndent);s++)if(r=e.bMarks[s]+e.tShift[s],o=e.eMarks[s],i=e.src.slice(r,o),ae[a][1].test(i)){i.length!==0&&s++;break}}e.line=s;const d=e.push("html_block","",0);return d.map=[u,s],d.content=e.getLines(u,s,e.blkIndent,!0),!0}function io(e,u,n,t){let r=e.bMarks[u]+e.tShift[u],o=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let i=e.src.charCodeAt(r);if(i!==35||r>=o)return!1;let a=1;for(i=e.src.charCodeAt(++r);i===35&&r<o&&a<=6;)a++,i=e.src.charCodeAt(++r);if(a>6||r<o&&!E(i))return!1;if(t)return!0;o=e.skipSpacesBack(o,r);const s=e.skipCharsBack(o,35,r);s>r&&E(e.src.charCodeAt(s-1))&&(o=s),e.line=u+1;const d=e.push("heading_open","h"+String(a),1);d.markup="########".slice(0,a),d.map=[u,e.line];const b=e.push("inline","",0);b.content=e.src.slice(r,o).trim(),b.map=[u,e.line],b.children=[];const c=e.push("heading_close","h"+String(a),-1);return c.markup="########".slice(0,a),!0}function co(e,u,n){const t=e.md.block.ruler.getRules("paragraph");if(e.sCount[u]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let o=0,i,a=u+1;for(;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let l=e.bMarks[a]+e.tShift[a];const f=e.eMarks[a];if(l<f&&(i=e.src.charCodeAt(l),(i===45||i===61)&&(l=e.skipChars(l,i),l=e.skipSpaces(l),l>=f))){o=i===61?1:2;break}}if(e.sCount[a]<0)continue;let h=!1;for(let l=0,f=t.length;l<f;l++)if(t[l](e,a,n,!0)){h=!0;break}if(h)break}if(!o)return!1;const s=e.getLines(u,a,e.blkIndent,!1).trim();e.line=a+1;const d=e.push("heading_open","h"+String(o),1);d.markup=String.fromCharCode(i),d.map=[u,e.line];const b=e.push("inline","",0);b.content=s,b.map=[u,e.line-1],b.children=[];const c=e.push("heading_close","h"+String(o),-1);return c.markup=String.fromCharCode(i),e.parentType=r,!0}function so(e,u,n){const t=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let o=u+1;for(e.parentType="paragraph";o<n&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let d=!1;for(let b=0,c=t.length;b<c;b++)if(t[b](e,o,n,!0)){d=!0;break}if(d)break}const i=e.getLines(u,o,e.blkIndent,!1).trim();e.line=o;const a=e.push("paragraph_open","p",1);a.map=[u,e.line];const s=e.push("inline","",0);return s.content=i,s.map=[u,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const ze=[["table",Nr,["paragraph","reference"]],["code",qr],["fence",$r,["paragraph","reference","blockquote","list"]],["blockquote",jr,["paragraph","reference","blockquote","list"]],["hr",Hr,["paragraph","reference","blockquote","list"]],["list",Ur,["paragraph","reference","blockquote"]],["reference",Vr],["html_block",ao,["paragraph","reference","blockquote"]],["heading",io,["paragraph","reference","blockquote"]],["lheading",co],["paragraph",so]];function Ze(){this.ruler=new R;for(let e=0;e<ze.length;e++)this.ruler.push(ze[e][0],ze[e][1],{alt:(ze[e][2]||[]).slice()})}Ze.prototype.tokenize=function(e,u,n){const t=this.ruler.getRules(""),r=t.length,o=e.md.options.maxNesting;let i=u,a=!1;for(;i<n&&(e.line=i=e.skipEmptyLines(i),!(i>=n||e.sCount[i]<e.blkIndent));){if(e.level>=o){e.line=n;break}const s=e.line;let d=!1;for(let b=0;b<r;b++)if(d=t[b](e,i,n,!1),d){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),i=e.line,i<n&&e.isEmpty(i)&&(a=!0,i++,e.line=i)}};Ze.prototype.parse=function(e,u,n,t){if(!e)return;const r=new this.State(e,u,n,t);this.tokenize(r,r.line,r.lineMax)};Ze.prototype.State=V;function Fe(e,u,n,t){this.src=e,this.env=n,this.md=u,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Fe.prototype.pushPending=function(){const e=new $("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};Fe.prototype.push=function(e,u,n){this.pending&&this.pushPending();const t=new $(e,u,n);let r=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t};Fe.prototype.scanDelims=function(e,u){const n=this.posMax,t=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32;let o=e;for(;o<n&&this.src.charCodeAt(o)===t;)o++;const i=o-e,a=o<n?this.src.charCodeAt(o):32,s=Ee(r)||Ce(String.fromCharCode(r)),d=Ee(a)||Ce(String.fromCharCode(a)),b=_e(r),c=_e(a),h=!c&&(!d||b||s),l=!b&&(!s||c||d);return{can_open:h&&(u||!l||s),can_close:l&&(u||!h||d),length:i}};Fe.prototype.Token=$;function lo(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function fo(e,u){let n=e.pos;for(;n<e.posMax&&!lo(e.src.charCodeAt(n));)n++;return n===e.pos?!1:(u||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}const ho=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function bo(e,u){if(!e.md.options.linkify||e.linkLevel>0)return!1;const n=e.pos,t=e.posMax;if(n+3>t||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;const r=e.pending.match(ho);if(!r)return!1;const o=r[1],i=e.md.linkify.matchAtStart(e.src.slice(n-o.length));if(!i)return!1;let a=i.url;if(a.length<=o.length)return!1;let s=a.length;for(;s>0&&a.charCodeAt(s-1)===42;)s--;s!==a.length&&(a=a.slice(0,s));const d=e.md.normalizeLink(a);if(!e.md.validateLink(d))return!1;if(!u){e.pending=e.pending.slice(0,-o.length);const b=e.push("link_open","a",1);b.attrs=[["href",d]],b.markup="linkify",b.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(a);const h=e.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return e.pos+=a.length-o.length,!0}function po(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;const t=e.pending.length-1,r=e.posMax;if(!u)if(t>=0&&e.pending.charCodeAt(t)===32)if(t>=1&&e.pending.charCodeAt(t-1)===32){let o=t-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(n++;n<r&&E(e.src.charCodeAt(n));)n++;return e.pos=n,!0}const Iu=[];for(let e=0;e<256;e++)Iu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Iu[e.charCodeAt(0)]=1});function mo(e,u){let n=e.pos;const t=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=t))return!1;let r=e.src.charCodeAt(n);if(r===10){for(u||e.push("hardbreak","br",0),n++;n<t&&(r=e.src.charCodeAt(n),!!E(r));)n++;return e.pos=n,!0}let o=e.src[n];if(r>=55296&&r<=56319&&n+1<t){const a=e.src.charCodeAt(n+1);a>=56320&&a<=57343&&(o+=e.src[n+1],n++)}const i="\\"+o;if(!u){const a=e.push("text_special","",0);r<256&&Iu[r]!==0?a.content=o:a.content=i,a.markup=i,a.info="escape"}return e.pos=n+1,!0}function go(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;const r=n;n++;const o=e.posMax;for(;n<o&&e.src.charCodeAt(n)===96;)n++;const i=e.src.slice(r,n),a=i.length;if(e.backticksScanned&&(e.backticks[a]||0)<=r)return u||(e.pending+=i),e.pos+=a,!0;let s=n,d;for(;(d=e.src.indexOf("`",s))!==-1;){for(s=d+1;s<o&&e.src.charCodeAt(s)===96;)s++;const b=s-d;if(b===a){if(!u){const c=e.push("code_inline","code",0);c.markup=i,c.content=e.src.slice(n,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[b]=d}return e.backticksScanned=!0,u||(e.pending+=i),e.pos+=a,!0}function ko(e,u){const n=e.pos,t=e.src.charCodeAt(n);if(u||t!==126)return!1;const r=e.scanDelims(e.pos,!0);let o=r.length;const i=String.fromCharCode(t);if(o<2)return!1;let a;o%2&&(a=e.push("text","",0),a.content=i,o--);for(let s=0;s<o;s+=2)a=e.push("text","",0),a.content=i+i,e.delimiters.push({marker:t,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function un(e,u){let n;const t=[],r=u.length;for(let o=0;o<r;o++){const i=u[o];if(i.marker!==126||i.end===-1)continue;const a=u[i.end];n=e.tokens[i.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=e.tokens[a.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&t.push(a.token-1)}for(;t.length;){const o=t.pop();let i=o+1;for(;i<e.tokens.length&&e.tokens[i].type==="s_close";)i++;i--,o!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[o],e.tokens[o]=n)}}function yo(e){const u=e.tokens_meta,n=e.tokens_meta.length;un(e,e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&un(e,u[t].delimiters)}const Bn={tokenize:ko,postProcess:yo};function xo(e,u){const n=e.pos,t=e.src.charCodeAt(n);if(u||t!==95&&t!==42)return!1;const r=e.scanDelims(e.pos,t===42);for(let o=0;o<r.length;o++){const i=e.push("text","",0);i.content=String.fromCharCode(t),e.delimiters.push({marker:t,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function nn(e,u){const n=u.length;for(let t=n-1;t>=0;t--){const r=u[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const o=u[r.end],i=t>0&&u[t-1].end===r.end+1&&u[t-1].marker===r.marker&&u[t-1].token===r.token-1&&u[r.end+1].token===o.token+1,a=String.fromCharCode(r.marker),s=e.tokens[r.token];s.type=i?"strong_open":"em_open",s.tag=i?"strong":"em",s.nesting=1,s.markup=i?a+a:a,s.content="";const d=e.tokens[o.token];d.type=i?"strong_close":"em_close",d.tag=i?"strong":"em",d.nesting=-1,d.markup=i?a+a:a,d.content="",i&&(e.tokens[u[t-1].token].content="",e.tokens[u[r.end+1].token].content="",t--)}}function wo(e){const u=e.tokens_meta,n=e.tokens_meta.length;nn(e,e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&nn(e,u[t].delimiters)}const Ln={tokenize:xo,postProcess:wo};function vo(e,u){let n,t,r,o,i="",a="",s=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const b=e.pos,c=e.posMax,h=e.pos+1,l=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(l<0)return!1;let f=l+1;if(f<c&&e.src.charCodeAt(f)===40){for(d=!1,f++;f<c&&(n=e.src.charCodeAt(f),!(!E(n)&&n!==10));f++);if(f>=c)return!1;if(s=f,r=e.md.helpers.parseLinkDestination(e.src,f,e.posMax),r.ok){for(i=e.md.normalizeLink(r.str),e.md.validateLink(i)?f=r.pos:i="",s=f;f<c&&(n=e.src.charCodeAt(f),!(!E(n)&&n!==10));f++);if(r=e.md.helpers.parseLinkTitle(e.src,f,e.posMax),f<c&&s!==f&&r.ok)for(a=r.str,f=r.pos;f<c&&(n=e.src.charCodeAt(f),!(!E(n)&&n!==10));f++);}(f>=c||e.src.charCodeAt(f)!==41)&&(d=!0),f++}if(d){if(typeof e.env.references>"u")return!1;if(f<c&&e.src.charCodeAt(f)===91?(s=f+1,f=e.md.helpers.parseLinkLabel(e,f),f>=0?t=e.src.slice(s,f++):f=l+1):f=l+1,t||(t=e.src.slice(h,l)),o=e.env.references[Ve(t)],!o)return e.pos=b,!1;i=o.href,a=o.title}if(!u){e.pos=h,e.posMax=l;const p=e.push("link_open","a",1),m=[["href",i]];p.attrs=m,a&&m.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=f,e.posMax=c,!0}function _o(e,u){let n,t,r,o,i,a,s,d,b="";const c=e.pos,h=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const l=e.pos+2,f=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(f<0)return!1;if(o=f+1,o<h&&e.src.charCodeAt(o)===40){for(o++;o<h&&(n=e.src.charCodeAt(o),!(!E(n)&&n!==10));o++);if(o>=h)return!1;for(d=o,a=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),a.ok&&(b=e.md.normalizeLink(a.str),e.md.validateLink(b)?o=a.pos:b=""),d=o;o<h&&(n=e.src.charCodeAt(o),!(!E(n)&&n!==10));o++);if(a=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<h&&d!==o&&a.ok)for(s=a.str,o=a.pos;o<h&&(n=e.src.charCodeAt(o),!(!E(n)&&n!==10));o++);else s="";if(o>=h||e.src.charCodeAt(o)!==41)return e.pos=c,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<h&&e.src.charCodeAt(o)===91?(d=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?r=e.src.slice(d,o++):o=f+1):o=f+1,r||(r=e.src.slice(l,f)),i=e.env.references[Ve(r)],!i)return e.pos=c,!1;b=i.href,s=i.title}if(!u){t=e.src.slice(l,f);const p=[];e.md.inline.parse(t,e.md,e.env,p);const m=e.push("image","img",0),g=[["src",b],["alt",""]];m.attrs=g,m.children=p,m.content=t,s&&g.push(["title",s])}return e.pos=o,e.posMax=h,!0}const Co=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Eo=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Do(e,u){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;const t=e.pos,r=e.posMax;for(;;){if(++n>=r)return!1;const i=e.src.charCodeAt(n);if(i===60)return!1;if(i===62)break}const o=e.src.slice(t+1,n);if(Eo.test(o)){const i=e.md.normalizeLink(o);if(!e.md.validateLink(i))return!1;if(!u){const a=e.push("link_open","a",1);a.attrs=[["href",i]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}if(Co.test(o)){const i=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(i))return!1;if(!u){const a=e.push("link_open","a",1);a.attrs=[["href",i]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}return!1}function Ao(e){return/^<a[>\s]/i.test(e)}function Fo(e){return/^<\/a\s*>/i.test(e)}function So(e){const u=e|32;return u>=97&&u<=122}function To(e,u){if(!e.md.options.html)return!1;const n=e.posMax,t=e.pos;if(e.src.charCodeAt(t)!==60||t+2>=n)return!1;const r=e.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!So(r))return!1;const o=e.src.slice(t).match(ro);if(!o)return!1;if(!u){const i=e.push("html_inline","",0);i.content=o[0],Ao(i.content)&&e.linkLevel++,Fo(i.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}const Mo=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Io=/^&([a-z][a-z0-9]{1,31});/i;function zo(e,u){const n=e.pos,t=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=t)return!1;if(e.src.charCodeAt(n+1)===35){const o=e.src.slice(n).match(Mo);if(o){if(!u){const i=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),a=e.push("text_special","",0);a.content=Tu(i)?qe(i):qe(65533),a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}else{const o=e.src.slice(n).match(Io);if(o){const i=Sn(o[0]);if(i!==o[0]){if(!u){const a=e.push("text_special","",0);a.content=i,a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function tn(e){const u={},n=e.length;if(!n)return;let t=0,r=-2;const o=[];for(let i=0;i<n;i++){const a=e[i];if(o.push(0),(e[t].marker!==a.marker||r!==a.token-1)&&(t=i),r=a.token,a.length=a.length||0,!a.close)continue;u.hasOwnProperty(a.marker)||(u[a.marker]=[-1,-1,-1,-1,-1,-1]);const s=u[a.marker][(a.open?3:0)+a.length%3];let d=t-o[t]-1,b=d;for(;d>s;d-=o[d]+1){const c=e[d];if(c.marker===a.marker&&c.open&&c.end<0){let h=!1;if((c.close||a.open)&&(c.length+a.length)%3===0&&(c.length%3!==0||a.length%3!==0)&&(h=!0),!h){const l=d>0&&!e[d-1].open?o[d-1]+1:0;o[i]=i-d+l,o[d]=l,a.open=!1,c.end=i,c.close=!1,b=-1,r=-2;break}}}b!==-1&&(u[a.marker][(a.open?3:0)+(a.length||0)%3]=b)}}function Ro(e){const u=e.tokens_meta,n=e.tokens_meta.length;tn(e.delimiters);for(let t=0;t<n;t++)u[t]&&u[t].delimiters&&tn(u[t].delimiters)}function Po(e){let u,n,t=0;const r=e.tokens,o=e.tokens.length;for(u=n=0;u<o;u++)r[u].nesting<0&&t--,r[u].level=t,r[u].nesting>0&&t++,r[u].type==="text"&&u+1<o&&r[u+1].type==="text"?r[u+1].content=r[u].content+r[u+1].content:(u!==n&&(r[n]=r[u]),n++);u!==n&&(r.length=n)}const cu=[["text",fo],["linkify",bo],["newline",po],["escape",mo],["backticks",go],["strikethrough",Bn.tokenize],["emphasis",Ln.tokenize],["link",vo],["image",_o],["autolink",Do],["html_inline",To],["entity",zo]],su=[["balance_pairs",Ro],["strikethrough",Bn.postProcess],["emphasis",Ln.postProcess],["fragments_join",Po]];function Se(){this.ruler=new R;for(let e=0;e<cu.length;e++)this.ruler.push(cu[e][0],cu[e][1]);this.ruler2=new R;for(let e=0;e<su.length;e++)this.ruler2.push(su[e][0],su[e][1])}Se.prototype.skipToken=function(e){const u=e.pos,n=this.ruler.getRules(""),t=n.length,r=e.md.options.maxNesting,o=e.cache;if(typeof o[u]<"u"){e.pos=o[u];return}let i=!1;if(e.level<r){for(let a=0;a<t;a++)if(e.level++,i=n[a](e,!0),e.level--,i){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;i||e.pos++,o[u]=e.pos};Se.prototype.tokenize=function(e){const u=this.ruler.getRules(""),n=u.length,t=e.posMax,r=e.md.options.maxNesting;for(;e.pos<t;){const o=e.pos;let i=!1;if(e.level<r){for(let a=0;a<n;a++)if(i=u[a](e,!1),i){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(i){if(e.pos>=t)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Se.prototype.parse=function(e,u,n,t){const r=new this.State(e,u,n,t);this.tokenize(r);const o=this.ruler2.getRules(""),i=o.length;for(let a=0;a<i;a++)o[a](r)};Se.prototype.State=Fe;function Bo(e){const u={};e=e||{},u.src_Any=Cn.source,u.src_Cc=En.source,u.src_Z=An.source,u.src_P=Fu.source,u.src_ZPCc=[u.src_Z,u.src_P,u.src_Cc].join("|"),u.src_ZCc=[u.src_Z,u.src_Cc].join("|");const n="[><｜]";return u.src_pseudo_letter="(?:(?!"+n+"|"+u.src_ZPCc+")"+u.src_Any+")",u.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",u.src_auth="(?:(?:(?!"+u.src_ZCc+"|[@/\\[\\]()]).)+@)?",u.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",u.src_host_terminator="(?=$|"+n+"|"+u.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+u.src_ZPCc+"))",u.src_path="(?:[/?#](?:(?!"+u.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+u.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+u.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+u.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+u.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+u.src_ZCc+"|[']).)+\\'|\\'(?="+u.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+u.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+u.src_ZCc+"|$)|;(?!"+u.src_ZCc+"|$)|\\!+(?!"+u.src_ZCc+"|[!]|$)|\\?(?!"+u.src_ZCc+"|[?]|$))+|\\/)?",u.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',u.src_xn="xn--[a-z0-9\\-]{1,59}",u.src_domain_root="(?:"+u.src_xn+"|"+u.src_pseudo_letter+"{1,63})",u.src_domain="(?:"+u.src_xn+"|(?:"+u.src_pseudo_letter+")|(?:"+u.src_pseudo_letter+"(?:-|"+u.src_pseudo_letter+"){0,61}"+u.src_pseudo_letter+"))",u.src_host="(?:(?:(?:(?:"+u.src_domain+")\\.)*"+u.src_domain+"))",u.tpl_host_fuzzy="(?:"+u.src_ip4+"|(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%)))",u.tpl_host_no_ip_fuzzy="(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%))",u.src_host_strict=u.src_host+u.src_host_terminator,u.tpl_host_fuzzy_strict=u.tpl_host_fuzzy+u.src_host_terminator,u.src_host_port_strict=u.src_host+u.src_port+u.src_host_terminator,u.tpl_host_port_fuzzy_strict=u.tpl_host_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_port_no_ip_fuzzy_strict=u.tpl_host_no_ip_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+u.src_ZPCc+"|>|$))",u.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+u.src_ZCc+")("+u.src_email_name+"@"+u.tpl_host_fuzzy_strict+")",u.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_fuzzy_strict+u.src_path+")",u.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_no_ip_fuzzy_strict+u.src_path+")",u}function xu(e){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(t){e[t]=n[t]})}),e}function We(e){return Object.prototype.toString.call(e)}function Lo(e){return We(e)==="[object String]"}function Oo(e){return We(e)==="[object Object]"}function No(e){return We(e)==="[object RegExp]"}function rn(e){return We(e)==="[object Function]"}function qo(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const On={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function $o(e){return Object.keys(e||{}).reduce(function(u,n){return u||On.hasOwnProperty(n)},!1)}const jo={"http:":{validate:function(e,u,n){const t=e.slice(u);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(t)?t.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,u,n){const t=e.slice(u);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(t)?u>=3&&e[u-3]===":"||u>=3&&e[u-3]==="/"?0:t.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,u,n){const t=e.slice(u);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(t)?t.match(n.re.mailto)[0].length:0}}},Ho="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Go="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Uo(e){e.__index__=-1,e.__text_cache__=""}function Vo(e){return function(u,n){const t=u.slice(n);return e.test(t)?t.match(e)[0].length:0}}function on(){return function(e,u){u.normalize(e)}}function $e(e){const u=e.re=Bo(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(Ho),n.push(u.src_xn),u.src_tlds=n.join("|");function t(a){return a.replace("%TLDS%",u.src_tlds)}u.email_fuzzy=RegExp(t(u.tpl_email_fuzzy),"i"),u.link_fuzzy=RegExp(t(u.tpl_link_fuzzy),"i"),u.link_no_ip_fuzzy=RegExp(t(u.tpl_link_no_ip_fuzzy),"i"),u.host_fuzzy_test=RegExp(t(u.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function o(a,s){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+s)}Object.keys(e.__schemas__).forEach(function(a){const s=e.__schemas__[a];if(s===null)return;const d={validate:null,link:null};if(e.__compiled__[a]=d,Oo(s)){No(s.validate)?d.validate=Vo(s.validate):rn(s.validate)?d.validate=s.validate:o(a,s),rn(s.normalize)?d.normalize=s.normalize:s.normalize?o(a,s):d.normalize=on();return}if(Lo(s)){r.push(a);return}o(a,s)}),r.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:on()};const i=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(qo).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+i+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+i+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),Uo(e)}function Zo(e,u){const n=e.__index__,t=e.__last_index__,r=e.__text_cache__.slice(n,t);this.schema=e.__schema__.toLowerCase(),this.index=n+u,this.lastIndex=t+u,this.raw=r,this.text=r,this.url=r}function wu(e,u){const n=new Zo(e,u);return e.__compiled__[n.schema].normalize(n,e),n}function P(e,u){if(!(this instanceof P))return new P(e,u);u||$o(e)&&(u=e,e={}),this.__opts__=xu({},On,u),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=xu({},jo,e),this.__compiled__={},this.__tlds__=Go,this.__tlds_replaced__=!1,this.re={},$e(this)}P.prototype.add=function(u,n){return this.__schemas__[u]=n,$e(this),this};P.prototype.set=function(u){return this.__opts__=xu(this.__opts__,u),this};P.prototype.test=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return!1;let n,t,r,o,i,a,s,d,b;if(this.re.schema_test.test(u)){for(s=this.re.schema_search,s.lastIndex=0;(n=s.exec(u))!==null;)if(o=this.testSchemaAt(u,n[2],s.lastIndex),o){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+o;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(d=u.search(this.re.host_fuzzy_test),d>=0&&(this.__index__<0||d<this.__index__)&&(t=u.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(i=t.index+t[1].length,(this.__index__<0||i<this.__index__)&&(this.__schema__="",this.__index__=i,this.__last_index__=t.index+t[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(b=u.indexOf("@"),b>=0&&(r=u.match(this.re.email_fuzzy))!==null&&(i=r.index+r[1].length,a=r.index+r[0].length,(this.__index__<0||i<this.__index__||i===this.__index__&&a>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=i,this.__last_index__=a))),this.__index__>=0};P.prototype.pretest=function(u){return this.re.pretest.test(u)};P.prototype.testSchemaAt=function(u,n,t){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(u,t,this):0};P.prototype.match=function(u){const n=[];let t=0;this.__index__>=0&&this.__text_cache__===u&&(n.push(wu(this,t)),t=this.__last_index__);let r=t?u.slice(t):u;for(;this.test(r);)n.push(wu(this,t)),r=r.slice(this.__last_index__),t+=this.__last_index__;return n.length?n:null};P.prototype.matchAtStart=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return null;const n=this.re.schema_at_start.exec(u);if(!n)return null;const t=this.testSchemaAt(u,n[2],n[0].length);return t?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+t,wu(this,0)):null};P.prototype.tlds=function(u,n){return u=Array.isArray(u)?u:[u],n?(this.__tlds__=this.__tlds__.concat(u).sort().filter(function(t,r,o){return t!==o[r-1]}).reverse(),$e(this),this):(this.__tlds__=u.slice(),this.__tlds_replaced__=!0,$e(this),this)};P.prototype.normalize=function(u){u.schema||(u.url="http://"+u.url),u.schema==="mailto:"&&!/^mailto:/i.test(u.url)&&(u.url="mailto:"+u.url)};P.prototype.onCompile=function(){};const ce=2147483647,j=36,zu=1,De=26,Wo=38,Jo=700,Nn=72,qn=128,$n="-",Ko=/^xn--/,Qo=/[^\0-\x7F]/,Xo=/[\x2E\u3002\uFF0E\uFF61]/g,Yo={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},lu=j-zu,H=Math.floor,du=String.fromCharCode;function W(e){throw new RangeError(Yo[e])}function ea(e,u){const n=[];let t=e.length;for(;t--;)n[t]=u(e[t]);return n}function jn(e,u){const n=e.split("@");let t="";n.length>1&&(t=n[0]+"@",e=n[1]),e=e.replace(Xo,".");const r=e.split("."),o=ea(r,u).join(".");return t+o}function Hn(e){const u=[];let n=0;const t=e.length;for(;n<t;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<t){const o=e.charCodeAt(n++);(o&64512)==56320?u.push(((r&1023)<<10)+(o&1023)+65536):(u.push(r),n--)}else u.push(r)}return u}const ua=e=>String.fromCodePoint(...e),na=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:j},an=function(e,u){return e+22+75*(e<26)-((u!=0)<<5)},Gn=function(e,u,n){let t=0;for(e=n?H(e/Jo):e>>1,e+=H(e/u);e>lu*De>>1;t+=j)e=H(e/lu);return H(t+(lu+1)*e/(e+Wo))},Un=function(e){const u=[],n=e.length;let t=0,r=qn,o=Nn,i=e.lastIndexOf($n);i<0&&(i=0);for(let a=0;a<i;++a)e.charCodeAt(a)>=128&&W("not-basic"),u.push(e.charCodeAt(a));for(let a=i>0?i+1:0;a<n;){const s=t;for(let b=1,c=j;;c+=j){a>=n&&W("invalid-input");const h=na(e.charCodeAt(a++));h>=j&&W("invalid-input"),h>H((ce-t)/b)&&W("overflow"),t+=h*b;const l=c<=o?zu:c>=o+De?De:c-o;if(h<l)break;const f=j-l;b>H(ce/f)&&W("overflow"),b*=f}const d=u.length+1;o=Gn(t-s,d,s==0),H(t/d)>ce-r&&W("overflow"),r+=H(t/d),t%=d,u.splice(t++,0,r)}return String.fromCodePoint(...u)},Vn=function(e){const u=[];e=Hn(e);const n=e.length;let t=qn,r=0,o=Nn;for(const s of e)s<128&&u.push(du(s));const i=u.length;let a=i;for(i&&u.push($n);a<n;){let s=ce;for(const b of e)b>=t&&b<s&&(s=b);const d=a+1;s-t>H((ce-r)/d)&&W("overflow"),r+=(s-t)*d,t=s;for(const b of e)if(b<t&&++r>ce&&W("overflow"),b===t){let c=r;for(let h=j;;h+=j){const l=h<=o?zu:h>=o+De?De:h-o;if(c<l)break;const f=c-l,p=j-l;u.push(du(an(l+f%p,0))),c=H(f/p)}u.push(du(an(c,0))),o=Gn(r,d,a===i),r=0,++a}++r,++t}return u.join("")},ta=function(e){return jn(e,function(u){return Ko.test(u)?Un(u.slice(4).toLowerCase()):u})},ra=function(e){return jn(e,function(u){return Qo.test(u)?"xn--"+Vn(u):u})},Zn={version:"2.3.1",ucs2:{decode:Hn,encode:ua},decode:Un,encode:Vn,toASCII:ra,toUnicode:ta},oa={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},aa={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ia={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},ca={default:oa,zero:aa,commonmark:ia},sa=/^(vbscript|javascript|file|data):/,la=/^data:image\/(gif|png|jpeg|webp);/;function da(e){const u=e.trim().toLowerCase();return sa.test(u)?la.test(u):!0}const Wn=["http:","https:","mailto:"];function fa(e){const u=Au(e,!0);if(u.hostname&&(!u.protocol||Wn.indexOf(u.protocol)>=0))try{u.hostname=Zn.toASCII(u.hostname)}catch{}return Ae(Du(u))}function ha(e){const u=Au(e,!0);if(u.hostname&&(!u.protocol||Wn.indexOf(u.protocol)>=0))try{u.hostname=Zn.toUnicode(u.hostname)}catch{}return se(Du(u),se.defaultChars+"%")}function L(e,u){if(!(this instanceof L))return new L(e,u);u||Su(e)||(u=e||{},e="default"),this.inline=new Se,this.block=new Ze,this.core=new Mu,this.renderer=new he,this.linkify=new P,this.validateLink=da,this.normalizeLink=fa,this.normalizeLinkText=ha,this.utils=br,this.helpers=Ue({},kr),this.options={},this.configure(e),u&&this.set(u)}L.prototype.set=function(e){return Ue(this.options,e),this};L.prototype.configure=function(e){const u=this;if(Su(e)){const n=e;if(e=ca[n],!e)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&u.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&u[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&u[n].ruler2.enableOnly(e.components[n].rules2)}),this};L.prototype.enable=function(e,u){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));const t=e.filter(function(r){return n.indexOf(r)<0});if(t.length&&!u)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this};L.prototype.disable=function(e,u){let n=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));const t=e.filter(function(r){return n.indexOf(r)<0});if(t.length&&!u)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this};L.prototype.use=function(e){const u=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,u),this};L.prototype.parse=function(e,u){if(typeof e!="string")throw new Error("Input data should be a String");const n=new this.core.State(e,this,u);return this.core.process(n),n.tokens};L.prototype.render=function(e,u){return u=u||{},this.renderer.render(this.parse(e,u),this.options,u)};L.prototype.parseInline=function(e,u){const n=new this.core.State(e,this,u);return n.inlineMode=!0,this.core.process(n),n.tokens};L.prototype.renderInline=function(e,u){return u=u||{},this.renderer.render(this.parseInline(e,u),this.options,u)};var cn=!1,de={false:"push",true:"unshift",after:"push",before:"unshift"},je={isPermalinkSymbol:!0};function vu(e,u,n,t){var r;if(!cn){var o="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(o):console.warn(o),cn=!0}var i=[Object.assign(new n.Token("link_open","a",1),{attrs:[].concat(u.permalinkClass?[["class",u.permalinkClass]]:[],[["href",u.permalinkHref(e,n)]],Object.entries(u.permalinkAttrs(e,n)))}),Object.assign(new n.Token("html_block","",0),{content:u.permalinkSymbol,meta:je}),new n.Token("link_close","a",-1)];u.permalinkSpace&&n.tokens[t+1].children[de[u.permalinkBefore]](Object.assign(new n.Token("text","",0),{content:" "})),(r=n.tokens[t+1].children)[de[u.permalinkBefore]].apply(r,i)}function Jn(e){return"#"+e}function Kn(e){return{}}var ba={class:"header-anchor",symbol:"#",renderHref:Jn,renderAttrs:Kn};function Te(e){function u(n){return n=Object.assign({},u.defaults,n),function(t,r,o,i){return e(t,n,r,o,i)}}return u.defaults=Object.assign({},ba),u.renderPermalinkImpl=e,u}function Ru(e){var u=[],n=e.filter(function(t){if(t[0]!=="class")return!0;u.push(t[1])});return u.length>0&&n.unshift(["class",u.join(" ")]),n}var Je=Te(function(e,u,n,t,r){var o,i=[Object.assign(new t.Token("link_open","a",1),{attrs:Ru([].concat(u.class?[["class",u.class]]:[],[["href",u.renderHref(e,t)]],u.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(u.renderAttrs(e,t))))}),Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:je}),new t.Token("link_close","a",-1)];if(u.space){var a=typeof u.space=="string"?u.space:" ";t.tokens[r+1].children[de[u.placement]](Object.assign(new t.Token(typeof u.space=="string"?"html_inline":"text","",0),{content:a}))}(o=t.tokens[r+1].children)[de[u.placement]].apply(o,i)});Object.assign(Je.defaults,{space:!0,placement:"after",ariaHidden:!1});var ee=Te(Je.renderPermalinkImpl);ee.defaults=Object.assign({},Je.defaults,{ariaHidden:!0});var Qn=Te(function(e,u,n,t,r){var o=[Object.assign(new t.Token("link_open","a",1),{attrs:Ru([].concat(u.class?[["class",u.class]]:[],[["href",u.renderHref(e,t)]],Object.entries(u.renderAttrs(e,t))))})].concat(u.safariReaderFix?[new t.Token("span_open","span",1)]:[],t.tokens[r+1].children,u.safariReaderFix?[new t.Token("span_close","span",-1)]:[],[new t.Token("link_close","a",-1)]);t.tokens[r+1]=Object.assign(new t.Token("inline","",0),{children:o})});Object.assign(Qn.defaults,{safariReaderFix:!1});var sn=Te(function(e,u,n,t,r){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(u.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+u.style+"`");if(!["aria-describedby","aria-labelledby"].includes(u.style)&&!u.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+u.style+"` style");if(u.style==="visually-hidden"&&!u.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var i=t.tokens[r+1].children.filter(function(c){return c.type==="text"||c.type==="code_inline"}).reduce(function(c,h){return c+h.content},""),a=[],s=[];if(u.class&&s.push(["class",u.class]),s.push(["href",u.renderHref(e,t)]),s.push.apply(s,Object.entries(u.renderAttrs(e,t))),u.style==="visually-hidden"){if(a.push(Object.assign(new t.Token("span_open","span",1),{attrs:[["class",u.visuallyHiddenClass]]}),Object.assign(new t.Token("text","",0),{content:u.assistiveText(i)}),new t.Token("span_close","span",-1)),u.space){var d=typeof u.space=="string"?u.space:" ";a[de[u.placement]](Object.assign(new t.Token(typeof u.space=="string"?"html_inline":"text","",0),{content:d}))}a[de[u.placement]](Object.assign(new t.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:je}),new t.Token("span_close","span",-1))}else a.push(Object.assign(new t.Token("html_inline","",0),{content:u.symbol,meta:je}));u.style==="aria-label"?s.push(["aria-label",u.assistiveText(i)]):["aria-describedby","aria-labelledby"].includes(u.style)&&s.push([u.style,e]);var b=[Object.assign(new t.Token("link_open","a",1),{attrs:Ru(s)})].concat(a,[new t.Token("link_close","a",-1)]);(o=t.tokens).splice.apply(o,[r+3,0].concat(b)),u.wrapper&&(t.tokens.splice(r,0,Object.assign(new t.Token("html_block","",0),{content:u.wrapper[0]+`
`})),t.tokens.splice(r+3+b.length+1,0,Object.assign(new t.Token("html_block","",0),{content:u.wrapper[1]+`
`})))});function ln(e,u,n,t){var r=e,o=t;if(n&&Object.prototype.hasOwnProperty.call(u,r))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(u,r);)r=e+"-"+o,o+=1;return u[r]=!0,r}function ie(e,u){u=Object.assign({},ie.defaults,u),e.core.ruler.push("anchor",function(n){for(var t,r={},o=n.tokens,i=Array.isArray(u.level)?(t=u.level,function(c){return t.includes(c)}):(function(c){return function(h){return h>=c}})(u.level),a=0;a<o.length;a++){var s=o[a];if(s.type==="heading_open"&&i(Number(s.tag.substr(1)))){var d=u.getTokensText(o[a+1].children),b=s.attrGet("id");b=b==null?ln(b=u.slugifyWithState?u.slugifyWithState(d,n):u.slugify(d),r,!1,u.uniqueSlugStartIndex):ln(b,r,!0,u.uniqueSlugStartIndex),s.attrSet("id",b),u.tabIndex!==!1&&s.attrSet("tabindex",""+u.tabIndex),typeof u.permalink=="function"?u.permalink(b,u,n,a):(u.permalink||u.renderPermalink&&u.renderPermalink!==vu)&&u.renderPermalink(b,u,n,a),a=o.indexOf(s),u.callback&&u.callback(s,{slug:b,title:d})}}})}Object.assign(sn.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),ie.permalink={__proto__:null,legacy:vu,renderHref:Jn,renderAttrs:Kn,makePermalink:Te,linkInsideHeader:Je,ariaHidden:ee,headerLink:Qn,linkAfterHeader:sn},ie.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(u){return["text","code_inline"].includes(u.type)}).map(function(u){return u.content}).join("")},permalink:!1,renderPermalink:vu,permalinkClass:ee.defaults.class,permalinkSpace:ee.defaults.space,permalinkSymbol:"¶",permalinkBefore:ee.defaults.placement==="before",permalinkHref:ee.defaults.renderHref,permalinkAttrs:ee.defaults.renderAttrs},ie.default=ie;function Ke(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fu,dn;function pa(){if(dn)return fu;dn=1;function e(t,r){var o,i,a=t.attrs[t.attrIndex("href")][1];for(o=0;o<r.length;++o){if(i=r[o],typeof i.matcher=="function"){if(i.matcher(a,i))return i;continue}return i}}function u(t,r,o){Object.keys(o).forEach(function(i){var a,s=o[i];i==="className"&&(i="class"),a=r[t].attrIndex(i),a<0?r[t].attrPush([i,s]):r[t].attrs[a][1]=s})}function n(t,r){r?r=Array.isArray(r)?r:[r]:r=[],Object.freeze(r);var o=t.renderer.rules.link_open||this.defaultRender;t.renderer.rules.link_open=function(i,a,s,d,b){var c=e(i[a],r),h=c&&c.attrs;return h&&u(a,i,h),o(i,a,s,d,b)}}return n.defaultRender=function(t,r,o,i,a){return a.renderToken(t,r,o)},fu=n,fu}var ma=pa();const ga=Ke(ma);function ka(e,u,n,t){const r=Number(e[u].meta.id+1).toString();let o="";return typeof t.docId=="string"&&(o=`-${t.docId}-`),o+r}function ya(e,u){let n=Number(e[u].meta.id+1).toString();return e[u].meta.subId>0&&(n+=`:${e[u].meta.subId}`),`[${n}]`}function xa(e,u,n,t,r){const o=r.rules.footnote_anchor_name(e,u,n,t,r),i=r.rules.footnote_caption(e,u,n,t,r);let a=o;return e[u].meta.subId>0&&(a+=`:${e[u].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${a}">${i}</a></sup>`}function wa(e,u,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function va(){return`</ol>
</section>
`}function _a(e,u,n,t,r){let o=r.rules.footnote_anchor_name(e,u,n,t,r);return e[u].meta.subId>0&&(o+=`:${e[u].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function Ca(){return`</li>
`}function Ea(e,u,n,t,r){let o=r.rules.footnote_anchor_name(e,u,n,t,r);return e[u].meta.subId>0&&(o+=`:${e[u].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function Da(e){const u=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=xa,e.renderer.rules.footnote_block_open=wa,e.renderer.rules.footnote_block_close=va,e.renderer.rules.footnote_open=_a,e.renderer.rules.footnote_close=Ca,e.renderer.rules.footnote_anchor=Ea,e.renderer.rules.footnote_caption=ya,e.renderer.rules.footnote_anchor_name=ka;function t(a,s,d,b){const c=a.bMarks[s]+a.tShift[s],h=a.eMarks[s];if(c+4>h||a.src.charCodeAt(c)!==91||a.src.charCodeAt(c+1)!==94)return!1;let l;for(l=c+2;l<h;l++){if(a.src.charCodeAt(l)===32)return!1;if(a.src.charCodeAt(l)===93)break}if(l===c+2||l+1>=h||a.src.charCodeAt(++l)!==58)return!1;if(b)return!0;l++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const f=a.src.slice(c+2,l-2);a.env.footnotes.refs[`:${f}`]=-1;const p=new a.Token("footnote_reference_open","",1);p.meta={label:f},p.level=a.level++,a.tokens.push(p);const m=a.bMarks[s],g=a.tShift[s],k=a.sCount[s],y=a.parentType,x=l,w=a.sCount[s]+l-(a.bMarks[s]+a.tShift[s]);let v=w;for(;l<h;){const C=a.src.charCodeAt(l);if(n(C))C===9?v+=4-v%4:v++;else break;l++}a.tShift[s]=l-x,a.sCount[s]=v-w,a.bMarks[s]=x,a.blkIndent+=4,a.parentType="footnote",a.sCount[s]<a.blkIndent&&(a.sCount[s]+=a.blkIndent),a.md.block.tokenize(a,s,d,!0),a.parentType=y,a.blkIndent-=4,a.tShift[s]=g,a.sCount[s]=k,a.bMarks[s]=m;const _=new a.Token("footnote_reference_close","",-1);return _.level=--a.level,a.tokens.push(_),!0}function r(a,s){const d=a.posMax,b=a.pos;if(b+2>=d||a.src.charCodeAt(b)!==94||a.src.charCodeAt(b+1)!==91)return!1;const c=b+2,h=u(a,b+1);if(h<0)return!1;if(!s){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const l=a.env.footnotes.list.length,f=[];a.md.inline.parse(a.src.slice(c,h),a.md,a.env,f);const p=a.push("footnote_ref","",0);p.meta={id:l},a.env.footnotes.list[l]={content:a.src.slice(c,h),tokens:f}}return a.pos=h+1,a.posMax=d,!0}function o(a,s){const d=a.posMax,b=a.pos;if(b+3>d||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(b)!==91||a.src.charCodeAt(b+1)!==94)return!1;let c;for(c=b+2;c<d;c++){if(a.src.charCodeAt(c)===32||a.src.charCodeAt(c)===10)return!1;if(a.src.charCodeAt(c)===93)break}if(c===b+2||c>=d)return!1;c++;const h=a.src.slice(b+2,c-1);if(typeof a.env.footnotes.refs[`:${h}`]>"u")return!1;if(!s){a.env.footnotes.list||(a.env.footnotes.list=[]);let l;a.env.footnotes.refs[`:${h}`]<0?(l=a.env.footnotes.list.length,a.env.footnotes.list[l]={label:h,count:0},a.env.footnotes.refs[`:${h}`]=l):l=a.env.footnotes.refs[`:${h}`];const f=a.env.footnotes.list[l].count;a.env.footnotes.list[l].count++;const p=a.push("footnote_ref","",0);p.meta={id:l,subId:f,label:h}}return a.pos=c,a.posMax=d,!0}function i(a){let s,d,b,c=!1;const h={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(f){return f.type==="footnote_reference_open"?(c=!0,d=[],b=f.meta.label,!1):f.type==="footnote_reference_close"?(c=!1,h[":"+b]=d,!1):(c&&d.push(f),!c)}),!a.env.footnotes.list))return;const l=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let f=0,p=l.length;f<p;f++){const m=new a.Token("footnote_open","",1);if(m.meta={id:f,label:l[f].label},a.tokens.push(m),l[f].tokens){s=[];const y=new a.Token("paragraph_open","p",1);y.block=!0,s.push(y);const x=new a.Token("inline","",0);x.children=l[f].tokens,x.content=l[f].content,s.push(x);const w=new a.Token("paragraph_close","p",-1);w.block=!0,s.push(w)}else l[f].label&&(s=h[`:${l[f].label}`]);s&&(a.tokens=a.tokens.concat(s));let g;a.tokens[a.tokens.length-1].type==="paragraph_close"?g=a.tokens.pop():g=null;const k=l[f].count>0?l[f].count:1;for(let y=0;y<k;y++){const x=new a.Token("footnote_anchor","",0);x.meta={id:f,subId:y,label:l[f].label},a.tokens.push(x)}g&&a.tokens.push(g),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",t,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",r),e.inline.ruler.after("footnote_inline","footnote_ref",o),e.core.ruler.after("inline","footnote_tail",i)}var hu,fn;function Aa(){if(fn)return hu;fn=1;var e=!0,u=!1,n=!1;hu=function(p,m){m&&(e=!m.enabled,u=!!m.label,n=!!m.labelAfter),p.core.ruler.after("inline","github-task-lists",function(g){for(var k=g.tokens,y=2;y<k.length;y++)o(k,y)&&(i(k[y],g.Token),t(k[y-2],"class","task-list-item"+(e?"":" enabled")),t(k[r(k,y-2)],"class","contains-task-list"))})};function t(p,m,g){var k=p.attrIndex(m),y=[m,g];k<0?p.attrPush(y):p.attrs[k]=y}function r(p,m){for(var g=p[m].level-1,k=m-1;k>=0;k--)if(p[k].level===g)return k;return-1}function o(p,m){return c(p[m])&&h(p[m-1])&&l(p[m-2])&&f(p[m])}function i(p,m){if(p.children.unshift(a(p,m)),p.children[1].content=p.children[1].content.slice(3),p.content=p.content.slice(3),u)if(n){p.children.pop();var g="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);p.children[0].content=p.children[0].content.slice(0,-1)+' id="'+g+'">',p.children.push(b(p.content,g,m))}else p.children.unshift(s(m)),p.children.push(d(m))}function a(p,m){var g=new m("html_inline","",0),k=e?' disabled="" ':"";return p.content.indexOf("[ ] ")===0?g.content='<input class="task-list-item-checkbox"'+k+'type="checkbox">':(p.content.indexOf("[x] ")===0||p.content.indexOf("[X] ")===0)&&(g.content='<input class="task-list-item-checkbox" checked=""'+k+'type="checkbox">'),g}function s(p){var m=new p("html_inline","",0);return m.content="<label>",m}function d(p){var m=new p("html_inline","",0);return m.content="</label>",m}function b(p,m,g){var k=new g("html_inline","",0);return k.content='<label class="task-list-item-label" for="'+m+'">'+p+"</label>",k.attrs=[{for:m}],k}function c(p){return p.type==="inline"}function h(p){return p.type==="paragraph_open"}function l(p){return p.type==="list_item_open"}function f(p){return p.content.indexOf("[ ] ")===0||p.content.indexOf("[x] ")===0||p.content.indexOf("[X] ")===0}return hu}var Fa=Aa();const Sa=Ke(Fa),Ta={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},Ma=(e,u={})=>{const{markers:n=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:t=Ta,matchCaseSensitive:r=!1,titles:o={},classPrefix:i="markdown-alert"}=u,a=n==="*"?"\\w+":n.join("|"),s=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,r?"":"i");e.core.ruler.after("block","github-alerts",d=>{const b=d.tokens;for(let c=0;c<b.length;c++)if(b[c].type==="blockquote_open"){const h=b[c],l=c;for(;b[c]?.type!=="blockquote_close"&&c<=b.length;)c+=1;const f=b[c],p=c,m=b.slice(l,p+1).find(w=>w.type==="inline");if(!m)continue;const g=m.content.match(s);if(!g)continue;const k=g[1].toLowerCase(),y=g[2].trim()||(o[k]??Ia(k)),x=t[k]??"";m.content=m.content.slice(g[0].length).trimStart(),h.type="alert_open",h.tag="div",h.meta={title:y,type:k,icon:x},f.type="alert_close",f.tag="div"}}),e.renderer.rules.alert_open=function(d,b){const{title:c,type:h,icon:l}=d[b].meta;return`<div class="${i} ${i}-${h}"><p class="${i}-title">${l}${c}</p>`}};function Ia(e){return e.charAt(0).toUpperCase()+e.slice(1)}var bu,hn;function za(){return hn||(hn=1,bu=function(u,n){var t=3,r="-",o=r.charCodeAt(0),i=r.length;function a(s,d,b,c){var h,l,f,p,m,g,k,y=!1,x=s.bMarks[d]+s.tShift[d],w=s.eMarks[d];if(d!==0||o!==s.src.charCodeAt(0))return!1;for(h=x+1;h<=w;h++)if(r[(h-x)%i]!==s.src[h]){k=h+1;break}if(f=Math.floor((h-x)/i),f<t)return!1;if(h-=(h-x)%i,c)return!0;for(l=d;l++,!(l>=b||s.src.slice(x,w)==="..."||(x=s.bMarks[l]+s.tShift[l],w=s.eMarks[l],x<w&&s.sCount[l]<s.blkIndent));)if(o===s.src.charCodeAt(x)&&!(s.sCount[l]-s.blkIndent>=4)){for(h=x+1;h<=w&&r[(h-x)%i]===s.src[h];h++);if(!(Math.floor((h-x)/i)<f)&&(h-=(h-x)%i,h=s.skipSpaces(h),!(h<w))){y=!0;break}}return m=s.parentType,g=s.lineMax,s.parentType="container",s.lineMax=l,p=s.push("front_matter",null,0),p.hidden=!0,p.markup=s.src.slice(d,h),p.block=!0,p.map=[d,l+(y?1:0)],p.meta=s.src.slice(k,x-1),s.parentType=m,s.lineMax=g,s.line=l+(y?1:0),n(p.meta),!0}u.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),bu}var Ra=za();const Pa=Ke(Ra);async function Ba(e){let u=Oa;return()=>{let n="";e.use(Pa,t=>{const r=La(t,u);r!==void 0?n=Na(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,o,i,a)=>n===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(t[r])}>
${n}
</table>
`}}function La(e,u){try{const n=u(e);if(n!==null&&typeof n=="object"&&!Array.isArray(n))return n}catch{}}function Oa(e){const u={};for(const n of e.split(`
`)){const t=n.indexOf(":");if(t===-1)continue;const r=n.slice(0,t).trim(),o=n.slice(t+1).trim();r.length>0&&(u[r]=At(o))}return u}function Na(e,u){const n=Object.entries(e);if(n.length===0)return"";const t=n.map(([o])=>`<th scope="col">${u(o)}</th>`).join(""),r=n.map(([,o])=>`<td>${Xn(o,u)}</td>`).join("");return`<thead><tr>${t}</tr></thead>
<tbody>
<tr>${r}</tr>
</tbody>`}function Xn(e,u){return e==null?"":Array.isArray(e)?e.map(n=>Xn(n,u)).join(", "):u(typeof e=="object"?JSON.stringify(e):String(e))}const Pu={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},qa=be(D.MarkEdit.userSettings),O=be(qa[Pu.rootValueKey]),Yn=be(O.changeMode),et=be(O.markdownIt),$a=["quiet","notify","never"],_u=(()=>{const e=O.updateBehavior;return e&&$a.includes(e)?e:Me(O.autoUpdate)?"quiet":"never"})(),ja=Me(O.syncScroll);Me(O.hidePreviewButtons);Me(O.syntaxAutoDetect,!1);const Ha=Me(O.imageHoverPreview,!1),Bu=O.themeName??"github",Re=O.styledHtmlColorScheme??O.styledHtmlTheme??"auto";O.mathDelimiters;const Ga=Yn.modes??Pu.defaultModes,bn=be(Yn.hotKey),Ua=et.preset??Pu.defaultPreset,Va=be(et.options);function be(e,u={}){return e??u}function Me(e,u=!0){return e??u}const Za=`.markdown-body {
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
`,Wa=`.markdown-body {
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
`,Ja=`.markdown-body {
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
`,Ka=`.markdown-body {
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
`,Qa=`.markdown-body {
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
`,Xa=`.markdown-body {
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
`,Ya=`.markdown-body {
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
`,e0=`.markdown-body {
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
`,u0=`.markdown-body {
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
`,n0=`.markdown-body {
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
`,t0=`.markdown-body {
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
`,r0=`.markdown-body {
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
`,o0=`.markdown-body {
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
`,a0=`.markdown-body {
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
`,i0=`.markdown-body {
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
`,c0=`.markdown-body {
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
`,s0=`.markdown-body {
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
`,l0=`.markdown-alert {
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
`,d0=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,f0=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,h0=`.code-copy-wrapper {
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
`,b0=`.code-copy-button {
  color: #5b636d;
}

.code-copy-button:hover {
  background: #eeeeee;
}

.code-copy-button:active {
  background: #dddddd;
}
`,p0=`.code-copy-button {
  color: #9398a0;
}

.code-copy-button:hover {
  background: #222222;
}

.code-copy-button:active {
  background: #333333;
}
`,He={github:{light:Wa,dark:Ja},cobalt:{dark:Ka},dracula:{dark:Qa},minimal:{light:Xa,dark:Ya},"night-owl":{dark:e0},"rose-pine":{light:u0,dark:n0},solarized:{light:t0,dark:r0},synthwave84:{dark:o0},"winter-is-coming":{light:a0,dark:i0},xcode:{light:c0,dark:s0}};function m0(e="auto"){const u=He[Bu]??He.github,n=u.light??u.dark,t=u.dark??u.light,r=ju(n)??"#ffffff",o=ju(t)??"#0d1117";return[".markdown-body { padding: 25px; }",...Qe(e,`body { background: ${r}; }`,`body { background: ${o}; }`)].join(`
`)}function ut(e="auto"){const u=He[Bu]??He.github,n=u.light??u.dark,t=u.dark??u.light;return[Za,...Qe(e,n,t)].join(`
`)}function g0(e="auto"){return[l0,...Qe(e,d0,f0)].join(`
`)}function nt(e="auto"){return[h0,...Qe(e,b0,p0)].join(`
`)}function Qe(e,u,n){const t=[];switch(e){case"light":t.push(u);break;case"dark":t.push(n);break;case"auto":t.push(`
        ${u}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`);break}return t}const k0={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本"}};function F(e){return x0[e]}const y0=["default","zh-CN","zh-TW"],x0=k0[(()=>{const e=navigator.language;return y0.includes(e)?e:"default"})()];async function w0(e,u=!0){return await E0,B.render(e,{lineInfo:u})}function v0(e){e()}async function _0(e){const u=t=>`<style>
${t}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,u(m0(Re)),u(ut(Re)),u(g0(Re)),u(nt(Re)),"</body></html>"].join(`
`)}const B=L(Ua,{html:!0,breaks:!0,linkify:!0,...Va}),tt=[];tt.push(Ba(B).then(e=>{B.use(e)}));B.use(ie);B.use(ga,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});B.use(Da);B.use(Sa);B.use(Ma);const C0=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),E0=Promise.all(tt).then(()=>{for(const e of C0){const u=B.renderer.rules[e];B.renderer.rules[e]=(n,t,r,o,i)=>{const a=n[t];return o.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),u?u(n,t,r,o,i):i.renderToken(n,t,r)}}for(const e of["fence","code_block"]){const u=B.renderer.rules[e];B.renderer.rules[e]=(n,t,r,o,i)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${u===void 0?i.renderToken(n,t,r):u(n,t,r,o,i)}
        <button title="${F("copyCode")}" aria-label="${F("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),D0=new DOMParser,A0="image-loader",Lu="cm-md-image-preview",pn=5;function F0(e){const u=D0.parseFromString(e,"text/html");return u.querySelectorAll("img").forEach(t=>{const r=t.getAttribute("src");r!==null&&(r.includes("://")||r.startsWith("data:image/")||(t.src=`${A0}://${r}`))}),u.body.innerHTML}function S0(e){typeof D.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",u=>{Q.panelPresenter!==void 0&&(clearTimeout(Q.panelPresenter),Q.panelPresenter=void 0),Q.panelPresenter=setTimeout(()=>{const n=u.target,t=n?.closest(".cm-md-link"),r=t?.dataset.linkUrl??t?.innerText??"";t!==null&&Dt(r)?T0(t,r):n?.classList.contains(Lu)||ke()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ke(!1)}),e.addEventListener("scroll",()=>ke()))}async function T0(e,u){if(e===Q.focusedElement)return;const n=(await D.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;const t=_n(n,u),r=await D.MarkEdit.getFileObject(t);if(r===void 0)return;const o=e.getBoundingClientRect(),i=document.createElement("img");i.className=Lu,i.style.position="fixed",i.style.left=`${o.left}px`,i.style.zIndex="10000",i.style.borderRadius="5px",i.style.opacity="0",i.style.transition="opacity 120ms",i.style.cursor="pointer",i.onclick=()=>{ke(),window.open(u,"_blank")},i.onload=()=>{const s=Math.min(i.naturalHeight,240);i.style.height=`${s}px`;const d=o.top,b=window.innerHeight-o.bottom;d>b?i.style.top=`${o.top-s-pn}px`:i.style.top=`${o.bottom+pn}px`,requestAnimationFrame(()=>{i.style.opacity="1"})};const a=r.mimeType??"image/png";i.src=`data:${a};base64,${r.data}`,ke(!1),Q.focusedElement=e,document.body.appendChild(i)}function ke(e=!0){Q.focusedElement!==void 0&&(Q.focusedElement=void 0,document.querySelectorAll(`.${Lu}`).forEach(u=>{e?(u.style.opacity="0",u.addEventListener("transitionend",()=>u.remove(),{once:!0})):u.remove()}))}const Q={panelPresenter:void 0,focusedElement:void 0};function M0(e,u){ja&&("onscrollend"in window?e.addEventListener("scrollend",()=>Cu(e,u)):e.addEventListener("scroll",()=>{pu.scrollUpdater!==void 0&&clearTimeout(pu.scrollUpdater),pu.scrollUpdater=setTimeout(()=>{Cu(e,u)},100)}))}function Cu(e,u,n=!0){const{line:t,progress:r}=I0(e);z0(u,t,r,n)}function I0(e,u=0){const n=D.MarkEdit.editorView,t=n.lineBlockAtHeight(e.scrollTop+u),r=n.state.doc.lineAt(t.from).number-1,o=Ct(n.domAtPos(t.from).node);if(o===null)return{line:r,progress:0};const i=e.getBoundingClientRect(),a=o.getBoundingClientRect(),s=i.top-a.top-u,d=Ou(s/a.height);return{line:r,progress:d}}function z0(e,u,n,t=!0){if(u===0&&n===0)return Le(e,0,t);const r=Array.from(document.querySelectorAll("[data-line-from]")),o=R0(r,u);if(o!==void 0){const{from:s,to:d}=ge(o);return ru(e,o,P0(u,n,s,d),t)}if(u===0)return Le(e,0,t);const{beforeBlock:i,afterBlock:a}=B0(r,u);if(i!==void 0&&a!==void 0){const s=ge(i),d=ge(a),b=ku(e,i)+i.offsetHeight,c=ku(e,a),h=d.from-s.to,l=u-s.to+n,f=h>0?Ou(l/h):0,p=b+(c-b)*f;return Le(e,p,t)}if(i!==void 0)return ru(e,i,1,t);if(a!==void 0)return ru(e,a,0,t)}function R0(e,u){return e.find(n=>{const{from:t,to:r}=ge(n);return u>=t&&u<=r})}function P0(e,u,n,t){const r=t-n;if(r<1)return e===n?u:0;const o=e-n+u;return Ou(o/r)}function B0(e,u){let n,t;for(const r of e){const{from:o,to:i}=ge(r);if(i<u)n=r;else if(o>u){t=r;break}}return{beforeBlock:n,afterBlock:t}}function Ou(e){return Math.max(0,Math.min(1,e))}const pu={scrollUpdater:void 0},ne={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},Xe={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var mu=function(e,u){return Number(e.slice(0,-1*u.length))},L0=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:mu(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:mu(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:mu(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},rt=function(e){return e.split(" ").map(L0)},O0=function(e,u,n,t){n===void 0&&(n=0),t===void 0&&(t=!1);var r=t?e+1:e,o=u.slice(0,r).reduce(function(a,s){return a+s.numeric},0),i=n?e*n:0;return o+i},ot=function(e,u,n){return u.concat(n).map(function(t){return t.style[e]}).filter(function(t){return t!==void 0&&t!==""})},N0=function(e,u){return u.endsWith(e)?Number(u.slice(0,-1*e.length)):null},mn=function(e){for(var u=0;u<e.length;u++)if(e[u].numeric>0)return u;return null},te=function(){return!1},q0=function(e,u,n){e.style[u]=n},A=function(e,u,n){var t=e[u];return t!==void 0?t:n};function at(e){var u;return(u=[]).concat.apply(u,Array.from(e.ownerDocument.styleSheets).map(function(n){var t=[];try{t=Array.from(n.cssRules||[])}catch{}return t})).filter(function(n){var t=!1;try{t=e.matches(n.selectorText)}catch{}return t})}var $0="grid-template-columns",j0="grid-template-rows",M=function(u,n,t){this.direction=u,this.element=n.element,this.track=n.track,u==="column"?(this.gridTemplateProp=$0,this.gridGapProp="grid-column-gap",this.cursor=A(t,"columnCursor",A(t,"cursor","col-resize")),this.snapOffset=A(t,"columnSnapOffset",A(t,"snapOffset",30)),this.dragInterval=A(t,"columnDragInterval",A(t,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=A(t,"gridTemplateColumns")):u==="row"&&(this.gridTemplateProp=j0,this.gridGapProp="grid-row-gap",this.cursor=A(t,"rowCursor",A(t,"cursor","row-resize")),this.snapOffset=A(t,"rowSnapOffset",A(t,"snapOffset",30)),this.dragInterval=A(t,"rowDragInterval",A(t,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=A(t,"gridTemplateRows")),this.onDragStart=A(t,"onDragStart",te),this.onDragEnd=A(t,"onDragEnd",te),this.onDrag=A(t,"onDrag",te),this.writeStyle=A(t,"writeStyle",q0),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=n.minSizeStart,this.minSizeEnd=n.minSizeEnd,n.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};M.prototype.getDimensions=function(){var u=this.grid.getBoundingClientRect(),n=u.width,t=u.height,r=u.top,o=u.bottom,i=u.left,a=u.right;this.direction==="column"?(this.start=r,this.end=o,this.size=t):this.direction==="row"&&(this.start=i,this.end=a,this.size=n)};M.prototype.getSizeAtTrack=function(u,n){return O0(u,this.computedPixels,this.computedGapPixels,n)};M.prototype.getSizeOfTrack=function(u){return this.computedPixels[u].numeric};M.prototype.getRawTracks=function(){var u=ot(this.gridTemplateProp,[this.grid],at(this.grid));if(!u.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return u[0]};M.prototype.getGap=function(){var u=ot(this.gridGapProp,[this.grid],at(this.grid));return u.length?u[0]:null};M.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};M.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};M.prototype.setTracks=function(u){this.tracks=u.split(" "),this.trackValues=rt(u)};M.prototype.setComputedTracks=function(u){this.computedTracks=u.split(" "),this.computedPixels=rt(u)};M.prototype.setGap=function(u){this.gap=u};M.prototype.setComputedGap=function(u){this.computedGap=u,this.computedGapPixels=N0("px",this.computedGap)||0};M.prototype.getMousePosition=function(u){return"touches"in u?u.touches[0][this.clientAxis]:u[this.clientAxis]};M.prototype.startDragging=function(u){if(!("button"in u&&u.button!==0)){u.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=u.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var n=this.trackValues.filter(function(a){return a.type==="%"}),t=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=t.length,this.totalFrs){var r=mn(t);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/t[r].numeric)}if(n.length){var o=mn(n);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/n[o].numeric)}var i=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(u)-i,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",te),this.grid.addEventListener("dragstart",te),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};M.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};M.prototype.drag=function(u){var n=this.getMousePosition(u),t=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(t-this.dragStartOffset),i=r+this.snapOffset,a=o-this.snapOffset;n<i&&(n=r),n>a&&(n=o),n<r?n=r:n>o&&(n=o);var s=n-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-n+this.dragStartOffset-t-this.computedGapPixels;if(this.dragInterval>1){var b=Math.round(s/this.dragInterval)*this.dragInterval;d-=b-s,s=b}if(s<this.minSizeStart&&(s=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var c=s/this.frToPixels;this.tracks[this.aTrack]=c+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var h=s/this.percentageToPixels;this.tracks[this.aTrack]=h+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var l=d/this.frToPixels;this.tracks[this.bTrack]=l+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var f=d/this.percentageToPixels;this.tracks[this.bTrack]=f+"%"}var p=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,p),this.onDrag(this.direction,this.track,p)};M.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",te),this.grid.removeEventListener("dragstart",te),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};M.prototype.destroy=function(u,n){u===void 0&&(u=!0),u||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),n&&n()):(this.needsDestroy=!0,n&&(this.destroyCb=n))};var gn=function(e,u,n){return u in e?e[u]:n},fe=function(e,u){return function(n){if(n.track<1)throw Error("Invalid track index: "+n.track+". Track must be between two other tracks.");var t=e==="column"?u.columnMinSizes||{}:u.rowMinSizes||{},r=e==="column"?"columnMinSize":"rowMinSize";return new M(e,Object.assign({},{minSizeStart:gn(t,n.track-1,A(u,r,A(u,"minSize",0))),minSizeEnd:gn(t,n.track+1,A(u,r,A(u,"minSize",0)))},n),u)}},re=function(u){var n=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:u.columnGutters||[],rowGutters:u.rowGutters||[],columnMinSizes:u.columnMinSizes||{},rowMinSizes:u.rowMinSizes||{}},u),this.options.columnGutters.forEach(function(t){n.columnGutters[t.track]=fe("column",n.options)(t)}),this.options.rowGutters.forEach(function(t){n.rowGutters[t.track]=fe("row",n.options)(t)})};re.prototype.addColumnGutter=function(u,n){this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=fe("column",this.options)({element:u,track:n})};re.prototype.addRowGutter=function(u,n){this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=fe("row",this.options)({element:u,track:n})};re.prototype.removeColumnGutter=function(u,n){var t=this;n===void 0&&(n=!0),this.columnGutters[u]&&this.columnGutters[u].destroy(n,function(){delete t.columnGutters[u]})};re.prototype.removeRowGutter=function(u,n){var t=this;n===void 0&&(n=!0),this.rowGutters[u]&&this.rowGutters[u].destroy(n,function(){delete t.rowGutters[u]})};re.prototype.handleDragStart=function(u,n,t){n==="column"?(this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=fe("column",this.options)({track:t}),this.columnGutters[t].startDragging(u)):n==="row"&&(this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=fe("row",this.options)({track:t}),this.rowGutters[t].startDragging(u))};re.prototype.destroy=function(u){var n=this;u===void 0&&(u=!0),Object.keys(this.columnGutters).forEach(function(t){return n.columnGutters[t].destroy(u,function(){delete n.columnGutters[t]})}),Object.keys(this.rowGutters).forEach(function(t){return n.rowGutters[t].destroy(u,function(){delete n.rowGutters[t]})})};function H0(e){return new re(e)}const G0=`.cm-focused {
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
`,Ge=document.body,ye=document.createElement("div"),z=document.createElement("div"),kn=Be("* { cursor: col-resize }",!1);var G=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(G||{});function U0(){Be(G0),Be(ut()),Be(nt());const e=document.createElement("div");e.className=ne.dividerViewClass,ye.appendChild(e),ye.className=ne.gutterViewClass,Ge.appendChild(ye),z.className=ne.previewPaneClass,Ge.appendChild(z),document.addEventListener("keydown",t=>{t.metaKey&&t.key==="a"&&document.activeElement!==D.MarkEdit.editorView.contentDOM&&Et(z)}),new MutationObserver(yn).observe(z,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{yn(),document.querySelector(".mermaid")!==null&&eu()}),typeof D.MarkEdit.getFileInfo=="function"&&z.addEventListener("click",Y0)}function Ye(e,u=!0){const n=N();pe.viewMode=e,e!==n&&localStorage.setItem(Xe.viewModeCacheKey,String(e));const t=D.MarkEdit.editorView;e===0?t.focus():e===2&&t.contentDOM.blur(),e===1?(Ge.classList.add(ne.containerClass),pe.splitter??=H0({columnGutters:[{track:1,element:ye}],minSize:150,onDragStart:()=>kn.disabled=!1,onDragEnd:()=>kn.disabled=!0})):(Ge.classList.remove(ne.containerClass),pe.splitter?.destroy(),pe.splitter=void 0),e===2?z.classList.add("overlay"):z.classList.remove("overlay"),u&&eu()}function V0(){const e=[0,...Ga.map(t=>{switch(t){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(t=>t!==void 0)],u=e.indexOf(N()),n=u===-1?0:(u+1)%e.length;Ye(e[n])}function Z0(){const e=localStorage.getItem(Xe.viewModeCacheKey);if(e===null)return;const u=Number(e);N()!==u&&Ye(u,!0)}function N(){return pe.viewMode}async function eu(){if(N()===0)return;const e=F0(await nu());z.innerHTML=e,v0(()=>{Cu(it(),uu(),!1);const u=localStorage.getItem(Xe.previewPageZoomKey);u!==null&&(z.style.zoom=u)})}function W0(e){if(N()===0||N()===1&&D.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const u=Number(z.style.zoom)||1,n=t=>String(Math.min(Math.max(t,.5),3));switch(e.key){case"-":z.style.zoom=n(u-.1);break;case"=":z.style.zoom=n(u+.1);break;case"0":z.style.zoom="1";break;default:return}localStorage.setItem(Xe.previewPageZoomKey,z.style.zoom),e.preventDefault(),e.stopPropagation()}function J0(){st(!1)}function K0(){st(!0)}async function Q0(){const e=await nu(!1);await navigator.clipboard.writeText(e)}async function X0(){const e=await nu(!1),u=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([z.innerText],{type:"text/plain"})});await navigator.clipboard.write([u])}function it(){return D.MarkEdit.editorView.scrollDOM}function uu(){return z}async function ct(e){const u=await nu(!1);return e?await _0(u):u}async function nu(e=!0){const u=D.MarkEdit.editorAPI.getText();return await w0(u,e)}function yn(){const e=getComputedStyle(z).backgroundColor;ye.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function st(e){const u=await(async()=>{const t=await D.MarkEdit.getFileInfo();return t===void 0?`${F("untitled")}.html`:`${_t(t.filePath)}.html`})(),n=await ct(e);D.MarkEdit.showSavePanel({fileName:u,string:n})}async function Y0(e){if(!(e.target instanceof Element))return;const u=e.target.closest("a");if(u===null)return;const n=u.getAttribute("href");if(!n?.startsWith("../"))return;const t=(await D.MarkEdit.getFileInfo())?.parentPath;if(t!==void 0){e.preventDefault(),e.stopPropagation();try{const r=_n(t,decodeURIComponent(n));await D.MarkEdit.openFile(r)}catch(r){console.error("Failed to open file:",r)}}}const pe={viewMode:0,splitter:void 0};async function xn(){if(_u==="never")return;const e=Date.now(),u=Number(localStorage.getItem(xe.lastCheckCacheKey)??"0");if(e-u<2592e5)return;localStorage.setItem(xe.lastCheckCacheKey,String(e));const t=await(await fetch(xe.latestReleaseURL)).json();t.name!=="1.7.0"&&(ft().has(t.name)||(_u==="quiet"?(Eu.pendingRelease=t,lt(t)):ei(t)))}function lt(e=Eu.pendingRelease){if(e===void 0)return;const u=document.querySelector(`.${ne.updatePillClass}`);if(u!==null){if(u.dataset.releaseName===e.name)return u;u.remove()}const n=document.createElement("button");return n.dataset.releaseName=e.name,n.className=ne.updatePillClass,n.textContent=F("update"),n.style.display=N()===G.edit?"none":"",n.addEventListener("webkitmouseforcedown",t=>{t.preventDefault()}),n.addEventListener("click",()=>{const{title:t,actions:r}=dt(e,()=>{Eu.pendingRelease=void 0,n.remove()}),o=n.getBoundingClientRect(),i={x:o.left,y:o.bottom+10};D.MarkEdit.showContextMenu([{title:t},{separator:!0},...r],i)}),document.body.appendChild(n),n}async function ei(e){const{title:u,actions:n}=dt(e),t=await D.MarkEdit.showAlert({title:u,message:e.body,buttons:n.map(r=>r.title)});n[t]?.action?.()}function dt(e,u=()=>{}){const n=`MarkEdit-preview ${e.name} ${F("newVersionAvailable")}`,t=[{title:F("viewReleasePage"),action:()=>{open(e.html_url),u()}},{title:F("remindMeLater"),action:u},{title:F("skipThisVersion"),action:()=>{const r=ft();r.add(e.name),localStorage.setItem(xe.skippedCacheKey,JSON.stringify([...r])),u()}}];return{title:n,actions:t}}function ft(){const e=localStorage.getItem(xe.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const xe={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},Eu={pendingRelease:void 0};var Oe={exports:{}};var ui=Oe.exports,wn;function ni(){return wn||(wn=1,(function(e,u){(function(n,t){e.exports=t()})(ui,(function(){var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},t=function(d,b){if(!(d instanceof b))throw new TypeError("Cannot call a class as a function")},r=(function(){function d(b,c){for(var h=0;h<c.length;h++){var l=c[h];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(b,l.key,l)}}return function(b,c,h){return c&&d(b.prototype,c),h&&d(b,h),b}})(),o=Object.assign||function(d){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var h in c)Object.prototype.hasOwnProperty.call(c,h)&&(d[h]=c[h])}return d},i=(function(){function d(b){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;t(this,d),this.ctx=b,this.iframes=c,this.exclude=h,this.iframesTimeout=l}return r(d,[{key:"getContexts",value:function(){var c=void 0,h=[];return typeof this.ctx>"u"||!this.ctx?c=[]:NodeList.prototype.isPrototypeOf(this.ctx)?c=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?c=this.ctx:typeof this.ctx=="string"?c=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):c=[this.ctx],c.forEach(function(l){var f=h.filter(function(p){return p.contains(l)}).length>0;h.indexOf(l)===-1&&!f&&h.push(l)}),h}},{key:"getIframeContents",value:function(c,h){var l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},f=void 0;try{var p=c.contentWindow;if(f=p.document,!p||!f)throw new Error("iframe inaccessible")}catch{l()}f&&h(f)}},{key:"isIframeBlank",value:function(c){var h="about:blank",l=c.getAttribute("src").trim(),f=c.contentWindow.location.href;return f===h&&l!==h&&l}},{key:"observeIframeLoad",value:function(c,h,l){var f=this,p=!1,m=null,g=function k(){if(!p){p=!0,clearTimeout(m);try{f.isIframeBlank(c)||(c.removeEventListener("load",k),f.getIframeContents(c,h,l))}catch{l()}}};c.addEventListener("load",g),m=setTimeout(g,this.iframesTimeout)}},{key:"onIframeReady",value:function(c,h,l){try{c.contentWindow.document.readyState==="complete"?this.isIframeBlank(c)?this.observeIframeLoad(c,h,l):this.getIframeContents(c,h,l):this.observeIframeLoad(c,h,l)}catch{l()}}},{key:"waitForIframes",value:function(c,h){var l=this,f=0;this.forEachIframe(c,function(){return!0},function(p){f++,l.waitForIframes(p.querySelector("html"),function(){--f||h()})},function(p){p||h()})}},{key:"forEachIframe",value:function(c,h,l){var f=this,p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=c.querySelectorAll("iframe"),g=m.length,k=0;m=Array.prototype.slice.call(m);var y=function(){--g<=0&&p(k)};g||y(),m.forEach(function(x){d.matches(x,f.exclude)?y():f.onIframeReady(x,function(w){h(x)&&(k++,l(w)),y()},y)})}},{key:"createIterator",value:function(c,h,l){return document.createNodeIterator(c,h,l,!1)}},{key:"createInstanceOnIframe",value:function(c){return new d(c.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(c,h,l){var f=c.compareDocumentPosition(l),p=Node.DOCUMENT_POSITION_PRECEDING;if(f&p)if(h!==null){var m=h.compareDocumentPosition(l),g=Node.DOCUMENT_POSITION_FOLLOWING;if(m&g)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(c){var h=c.previousNode(),l=void 0;return h===null?l=c.nextNode():l=c.nextNode()&&c.nextNode(),{prevNode:h,node:l}}},{key:"checkIframeFilter",value:function(c,h,l,f){var p=!1,m=!1;return f.forEach(function(g,k){g.val===l&&(p=k,m=g.handled)}),this.compareNodeIframe(c,h,l)?(p===!1&&!m?f.push({val:l,handled:!0}):p!==!1&&!m&&(f[p].handled=!0),!0):(p===!1&&f.push({val:l,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(c,h,l,f){var p=this;c.forEach(function(m){m.handled||p.getIframeContents(m.val,function(g){p.createInstanceOnIframe(g).forEachNode(h,l,f)})})}},{key:"iterateThroughNodes",value:function(c,h,l,f,p){for(var m=this,g=this.createIterator(h,c,f),k=[],y=[],x=void 0,w=void 0,v=function(){var C=m.getIteratorNode(g);return w=C.prevNode,x=C.node,x};v();)this.iframes&&this.forEachIframe(h,function(_){return m.checkIframeFilter(x,w,_,k)},function(_){m.createInstanceOnIframe(_).forEachNode(c,function(C){return y.push(C)},f)}),y.push(x);y.forEach(function(_){l(_)}),this.iframes&&this.handleOpenIframes(k,c,l,f),p()}},{key:"forEachNode",value:function(c,h,l){var f=this,p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},m=this.getContexts(),g=m.length;g||p(),m.forEach(function(k){var y=function(){f.iterateThroughNodes(c,k,h,l,function(){--g<=0&&p()})};f.iframes?f.waitForIframes(k,y):y()})}}],[{key:"matches",value:function(c,h){var l=typeof h=="string"?[h]:h,f=c.matches||c.matchesSelector||c.msMatchesSelector||c.mozMatchesSelector||c.oMatchesSelector||c.webkitMatchesSelector;if(f){var p=!1;return l.every(function(m){return f.call(c,m)?(p=!0,!1):!0}),p}else return!1}}]),d})(),a=(function(){function d(b){t(this,d),this.ctx=b,this.ie=!1;var c=window.navigator.userAgent;(c.indexOf("MSIE")>-1||c.indexOf("Trident")>-1)&&(this.ie=!0)}return r(d,[{key:"log",value:function(c){var h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",l=this.opt.log;this.opt.debug&&(typeof l>"u"?"undefined":n(l))==="object"&&typeof l[h]=="function"&&l[h]("mark.js: "+c)}},{key:"escapeStr",value:function(c){return c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(c){return this.opt.wildcards!=="disabled"&&(c=this.setupWildcardsRegExp(c)),c=this.escapeStr(c),Object.keys(this.opt.synonyms).length&&(c=this.createSynonymsRegExp(c)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),this.opt.diacritics&&(c=this.createDiacriticsRegExp(c)),c=this.createMergedBlanksRegExp(c),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.createJoinersRegExp(c)),this.opt.wildcards!=="disabled"&&(c=this.createWildcardsRegExp(c)),c=this.createAccuracyRegExp(c),c}},{key:"createSynonymsRegExp",value:function(c){var h=this.opt.synonyms,l=this.opt.caseSensitive?"":"i",f=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var p in h)if(h.hasOwnProperty(p)){var m=h[p],g=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(p):this.escapeStr(p),k=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(m):this.escapeStr(m);g!==""&&k!==""&&(c=c.replace(new RegExp("("+this.escapeStr(g)+"|"+this.escapeStr(k)+")","gm"+l),f+("("+this.processSynomyms(g)+"|")+(this.processSynomyms(k)+")")+f))}return c}},{key:"processSynomyms",value:function(c){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),c}},{key:"setupWildcardsRegExp",value:function(c){return c=c.replace(/(?:\\)*\?/g,function(h){return h.charAt(0)==="\\"?"?":""}),c.replace(/(?:\\)*\*/g,function(h){return h.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(c){var h=this.opt.wildcards==="withSpaces";return c.replace(/\u0001/g,h?"[\\S\\s]?":"\\S?").replace(/\u0002/g,h?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(c){return c.replace(/[^(|)\\]/g,function(h,l,f){var p=f.charAt(l+1);return/[(|)\\]/.test(p)||p===""?h:h+"\0"})}},{key:"createJoinersRegExp",value:function(c){var h=[],l=this.opt.ignorePunctuation;return Array.isArray(l)&&l.length&&h.push(this.escapeStr(l.join(""))),this.opt.ignoreJoiners&&h.push("\\u00ad\\u200b\\u200c\\u200d"),h.length?c.split(/\u0000+/).join("["+h.join("")+"]*"):c}},{key:"createDiacriticsRegExp",value:function(c){var h=this.opt.caseSensitive?"":"i",l=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],f=[];return c.split("").forEach(function(p){l.every(function(m){if(m.indexOf(p)!==-1){if(f.indexOf(m)>-1)return!1;c=c.replace(new RegExp("["+m+"]","gm"+h),"["+m+"]"),f.push(m)}return!0})}),c}},{key:"createMergedBlanksRegExp",value:function(c){return c.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(c){var h=this,l="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",f=this.opt.accuracy,p=typeof f=="string"?f:f.value,m=typeof f=="string"?[]:f.limiters,g="";switch(m.forEach(function(k){g+="|"+h.escapeStr(k)}),p){case"partially":default:return"()("+c+")";case"complementary":return g="\\s"+(g||this.escapeStr(l)),"()([^"+g+"]*"+c+"[^"+g+"]*)";case"exactly":return"(^|\\s"+g+")("+c+")(?=$|\\s"+g+")"}}},{key:"getSeparatedKeywords",value:function(c){var h=this,l=[];return c.forEach(function(f){h.opt.separateWordSearch?f.split(" ").forEach(function(p){p.trim()&&l.indexOf(p)===-1&&l.push(p)}):f.trim()&&l.indexOf(f)===-1&&l.push(f)}),{keywords:l.sort(function(f,p){return p.length-f.length}),length:l.length}}},{key:"isNumeric",value:function(c){return Number(parseFloat(c))==c}},{key:"checkRanges",value:function(c){var h=this;if(!Array.isArray(c)||Object.prototype.toString.call(c[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(c),[];var l=[],f=0;return c.sort(function(p,m){return p.start-m.start}).forEach(function(p){var m=h.callNoMatchOnInvalidRanges(p,f),g=m.start,k=m.end,y=m.valid;y&&(p.start=g,p.length=k-g,l.push(p),f=k)}),l}},{key:"callNoMatchOnInvalidRanges",value:function(c,h){var l=void 0,f=void 0,p=!1;return c&&typeof c.start<"u"?(l=parseInt(c.start,10),f=l+parseInt(c.length,10),this.isNumeric(c.start)&&this.isNumeric(c.length)&&f-h>0&&f-l>0?p=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(c))),this.opt.noMatch(c))):(this.log("Ignoring invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:l,end:f,valid:p}}},{key:"checkWhitespaceRanges",value:function(c,h,l){var f=void 0,p=!0,m=l.length,g=h-m,k=parseInt(c.start,10)-g;return k=k>m?m:k,f=k+parseInt(c.length,10),f>m&&(f=m,this.log("End range automatically set to the max value of "+m)),k<0||f-k<0||k>m||f>m?(p=!1,this.log("Invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)):l.substring(k,f).replace(/\s+/g,"")===""&&(p=!1,this.log("Skipping whitespace only range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:k,end:f,valid:p}}},{key:"getTextNodes",value:function(c){var h=this,l="",f=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(p){f.push({start:l.length,end:(l+=p.textContent).length,node:p})},function(p){return h.matchesExclude(p.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){c({value:l,nodes:f})})}},{key:"matchesExclude",value:function(c){return i.matches(c,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(c,h,l){var f=this.opt.element?this.opt.element:"mark",p=c.splitText(h),m=p.splitText(l-h),g=document.createElement(f);return g.setAttribute("data-markjs","true"),this.opt.className&&g.setAttribute("class",this.opt.className),g.textContent=p.textContent,p.parentNode.replaceChild(g,p),m}},{key:"wrapRangeInMappedTextNode",value:function(c,h,l,f,p){var m=this;c.nodes.every(function(g,k){var y=c.nodes[k+1];if(typeof y>"u"||y.start>h){if(!f(g.node))return!1;var x=h-g.start,w=(l>g.end?g.end:l)-g.start,v=c.value.substr(0,g.start),_=c.value.substr(w+g.start);if(g.node=m.wrapRangeInTextNode(g.node,x,w),c.value=v+_,c.nodes.forEach(function(C,I){I>=k&&(c.nodes[I].start>0&&I!==k&&(c.nodes[I].start-=w),c.nodes[I].end-=w)}),l-=w,p(g.node.previousSibling,g.start),l>g.end)h=g.end;else return!1}return!0})}},{key:"wrapMatches",value:function(c,h,l,f,p){var m=this,g=h===0?0:h+1;this.getTextNodes(function(k){k.nodes.forEach(function(y){y=y.node;for(var x=void 0;(x=c.exec(y.textContent))!==null&&x[g]!=="";)if(l(x[g],y)){var w=x.index;if(g!==0)for(var v=1;v<g;v++)w+=x[v].length;y=m.wrapRangeInTextNode(y,w,w+x[g].length),f(y.previousSibling),c.lastIndex=0}}),p()})}},{key:"wrapMatchesAcrossElements",value:function(c,h,l,f,p){var m=this,g=h===0?0:h+1;this.getTextNodes(function(k){for(var y=void 0;(y=c.exec(k.value))!==null&&y[g]!=="";){var x=y.index;if(g!==0)for(var w=1;w<g;w++)x+=y[w].length;var v=x+y[g].length;m.wrapRangeInMappedTextNode(k,x,v,function(_){return l(y[g],_)},function(_,C){c.lastIndex=C,f(_)})}p()})}},{key:"wrapRangeFromIndex",value:function(c,h,l,f){var p=this;this.getTextNodes(function(m){var g=m.value.length;c.forEach(function(k,y){var x=p.checkWhitespaceRanges(k,g,m.value),w=x.start,v=x.end,_=x.valid;_&&p.wrapRangeInMappedTextNode(m,w,v,function(C){return h(C,k,m.value.substring(w,v),y)},function(C){l(C,k)})}),f()})}},{key:"unwrapMatches",value:function(c){for(var h=c.parentNode,l=document.createDocumentFragment();c.firstChild;)l.appendChild(c.removeChild(c.firstChild));h.replaceChild(l,c),this.ie?this.normalizeTextNode(h):h.normalize()}},{key:"normalizeTextNode",value:function(c){if(c){if(c.nodeType===3)for(;c.nextSibling&&c.nextSibling.nodeType===3;)c.nodeValue+=c.nextSibling.nodeValue,c.parentNode.removeChild(c.nextSibling);else this.normalizeTextNode(c.firstChild);this.normalizeTextNode(c.nextSibling)}}},{key:"markRegExp",value:function(c,h){var l=this;this.opt=h,this.log('Searching with expression "'+c+'"');var f=0,p="wrapMatches",m=function(k){f++,l.opt.each(k)};this.opt.acrossElements&&(p="wrapMatchesAcrossElements"),this[p](c,this.opt.ignoreGroups,function(g,k){return l.opt.filter(k,g,f)},m,function(){f===0&&l.opt.noMatch(c),l.opt.done(f)})}},{key:"mark",value:function(c,h){var l=this;this.opt=h;var f=0,p="wrapMatches",m=this.getSeparatedKeywords(typeof c=="string"?[c]:c),g=m.keywords,k=m.length,y=this.opt.caseSensitive?"":"i",x=function w(v){var _=new RegExp(l.createRegExp(v),"gm"+y),C=0;l.log('Searching with expression "'+_+'"'),l[p](_,1,function(I,Y){return l.opt.filter(Y,v,f,C)},function(I){C++,f++,l.opt.each(I)},function(){C===0&&l.opt.noMatch(v),g[k-1]===v?l.opt.done(f):w(g[g.indexOf(v)+1])})};this.opt.acrossElements&&(p="wrapMatchesAcrossElements"),k===0?this.opt.done(f):x(g[0])}},{key:"markRanges",value:function(c,h){var l=this;this.opt=h;var f=0,p=this.checkRanges(c);p&&p.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(p)),this.wrapRangeFromIndex(p,function(m,g,k,y){return l.opt.filter(m,g,k,y)},function(m,g){f++,l.opt.each(m,g)},function(){l.opt.done(f)})):this.opt.done(f)}},{key:"unmark",value:function(c){var h=this;this.opt=c;var l=this.opt.element?this.opt.element:"*";l+="[data-markjs]",this.opt.className&&(l+="."+this.opt.className),this.log('Removal selector "'+l+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(f){h.unwrapMatches(f)},function(f){var p=i.matches(f,l),m=h.matchesExclude(f);return!p||m?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(c){this._opt=o({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},c)},get:function(){return this._opt}},{key:"iterator",get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function s(d){var b=this,c=new a(d);return this.mark=function(h,l){return c.mark(h,l),b},this.markRegExp=function(h,l){return c.markRegExp(h,l),b},this.markRanges=function(h,l){return c.markRanges(h,l),b},this.unmark=function(h){return c.unmark(h),b},this}return s}))})(Oe)),Oe.exports}var ti=ni();const ht=Ke(ti),we="markedit-preview-mark",bt="markedit-preview-mark-highlighted";let me=!1,Nu,Z=0,q=[],ve=null,Pe=null;const vn={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function ri(e){if(Nu=e,Z=0,e.search.length===0){pt();return}const u=uu();mt(u),ii(u)}function oi(e){q.length!==0&&(Z=e%q.length,gt())}function pt(){ve?.disconnect(),ve=null,Nu=void 0,Z=0,q=[],new ht(uu()).unmark()}function ai(){if(N()===G.preview)return{numberOfItems:q.length,currentIndex:Z}}function mt(e){const u=Nu;if(u===void 0||u.search.length===0||me)return;ci(),me=!0;const{search:n,caseSensitive:t,wholeWord:r,diacriticInsensitive:o,regexp:i}=u,a=new ht(e),s=()=>{q=Array.from(e.querySelectorAll(`.${we}`)),Z=q.length>0?Math.min(Z,q.length-1):0,gt(),me=!1};a.unmark({done:()=>{if(i)try{const d=t?"":"i";a.markRegExp(new RegExp(n,d),{className:we,done:s})}catch{me=!1,Z=0,q=[]}else a.mark(n,{className:we,caseSensitive:t,diacritics:o,separateWordSearch:!1,accuracy:r?"exactly":"partially",done:s})}})}function gt(){const e=N()!==G.sideBySide;q.forEach((u,n)=>{u.classList.toggle(bt,e&&n===Z)}),e&&q.length>0&&q[Z].scrollIntoView({behavior:"smooth",block:"center"})}function ii(e){ve?.disconnect(),ve=new MutationObserver(()=>{me||mt(e)}),ve.observe(e,{childList:!0})}function ci(){Pe===null&&(Pe=document.createElement("style"),document.head.appendChild(Pe));const{light:e,dark:u}=vn[Bu]??vn.github;Pe.textContent=[`.${we} { background: ${e} !important; color: inherit !important; }`,`.${bt} { background: #ffff00 !important; color: #000000 !important; box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2); }`,"@media (prefers-color-scheme: dark) {",`  .${we} { background: ${u} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(U0(),setTimeout(xn,4e3),_u==="quiet"&&setInterval(xn,6048e5),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=ct;window.__markeditPreviewSPI__={performSearch:ri,setSearchMatchIndex:oi,clearSearch:pt,searchCounterInfo:ai};D.MarkEdit.addMainMenuItem({title:F("viewMode"),icon:vt()?"eye":void 0,children:[{title:F("changeMode"),action:()=>{V0(),qu()},key:bn.key??"V",modifiers:bn.modifiers??["Command"]},{separator:!0},gu(F("editMode"),G.edit),gu(F("sideBySideMode"),G.sideBySide),gu(F("previewMode"),G.preview),{separator:!0},...si(),{separator:!0},{title:`${F("version")} 1.7.0`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.7.0")},{title:`${F("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")}]});D.MarkEdit.addExtension(wt.EditorView.updateListener.of(e=>{e.docChanged&&(ue.renderUpdater!==void 0&&clearTimeout(ue.renderUpdater),ue.renderUpdater=setTimeout(eu,500))}));D.MarkEdit.onEditorReady(()=>{Ha&&S0(D.MarkEdit.editorView.scrollDOM),Z0(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&N()===G.preview&&typeof D.MarkEdit.getFileInfo=="function"&&(await D.MarkEdit.getFileInfo())?.filePath===void 0&&D.MarkEdit.editorAPI.getText().length===0&&Ye(G.edit,!1)}),eu(),qu(),M0(it(),uu()),ue.keyDownListener!==void 0&&document.removeEventListener("keydown",ue.keyDownListener),ue.keyDownListener=e=>W0(e),document.addEventListener("keydown",ue.keyDownListener)});function gu(e,u){return{title:e,action:()=>{Ye(u),qu()},state:()=>({isSelected:N()===u})}}function si(){const e=[{title:F("copyHtml"),action:Q0},{title:F("copyRichText"),action:X0}];return typeof D.MarkEdit.showSavePanel>"u"?e:[{title:F("saveCleanHtml"),action:J0},{title:F("saveStyledHtml"),action:K0},...e]}function qu(){const e=lt();e!==void 0&&(e.style.display=N()===G.edit?"none":"")}const ue={renderUpdater:void 0,keyDownListener:void 0};
