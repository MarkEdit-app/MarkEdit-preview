"use strict";const _n=require("@codemirror/view"),z=require("markedit-api");function Gu(u,e=!0){const n=document.createElement("style");return n.textContent=u,document.head.appendChild(n),n.disabled=!e,n}function wn(u){return(u.split("/").pop()??u).split(".").slice(0,-1).join(".")}function Cn(u){return(u instanceof HTMLElement?u:u.parentElement)?.closest(".cm-line")}function Me(u){const e=parseInt(u.dataset.lineFrom??"0"),n=parseInt(u.dataset.lineTo??"0");return{from:e,to:n}}function re(u,e,n,t=!0){const r=e.offsetTop+e.offsetHeight*n;ze(u,r,t)}function ze(u,e,n=!0){const t=parseFloat(getComputedStyle(u).paddingTop);u.scrollTo({top:e<=t?0:e,behavior:n?"smooth":"instant"})}function vn(u){const e=document.createRange();e.selectNodeContents(u);const n=getSelection();n?.removeAllRanges(),n?.addRange(e)}const oe={};function Dn(u){let e=oe[u];if(e)return e;e=oe[u]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);e.push(t)}for(let n=0;n<u.length;n++){const t=u.charCodeAt(n);e[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return e}function Y(u,e){typeof e!="string"&&(e=Y.defaultChars);const n=Dn(e);return u.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let o=0,a=t.length;o<a;o+=3){const i=parseInt(t.slice(o+1,o+3),16);if(i<128){r+=n[i];continue}if((i&224)===192&&o+3<a){const c=parseInt(t.slice(o+4,o+6),16);if((c&192)===128){const s=i<<6&1984|c&63;s<128?r+="��":r+=String.fromCharCode(s),o+=3;continue}}if((i&240)===224&&o+6<a){const c=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16);if((c&192)===128&&(s&192)===128){const f=i<<12&61440|c<<6&4032|s&63;f<2048||f>=55296&&f<=57343?r+="���":r+=String.fromCharCode(f),o+=6;continue}}if((i&248)===240&&o+9<a){const c=parseInt(t.slice(o+4,o+6),16),s=parseInt(t.slice(o+7,o+9),16),f=parseInt(t.slice(o+10,o+12),16);if((c&192)===128&&(s&192)===128&&(f&192)===128){let l=i<<18&1835008|c<<12&258048|s<<6&4032|f&63;l<65536||l>1114111?r+="����":(l-=65536,r+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),o+=9;continue}}r+="�"}return r})}Y.defaultChars=";/?:@&=+$,#";Y.componentChars="";const ie={};function En(u){let e=ie[u];if(e)return e;e=ie[u]=[];for(let n=0;n<128;n++){const t=String.fromCharCode(n);/^[0-9a-z]$/i.test(t)?e.push(t):e.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<u.length;n++)e[u.charCodeAt(n)]=u[n];return e}function hu(u,e,n){typeof e!="string"&&(n=e,e=hu.defaultChars),typeof n>"u"&&(n=!0);const t=En(e);let r="";for(let o=0,a=u.length;o<a;o++){const i=u.charCodeAt(o);if(n&&i===37&&o+2<a&&/^[0-9a-f]{2}$/i.test(u.slice(o+1,o+3))){r+=u.slice(o,o+3),o+=2;continue}if(i<128){r+=t[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&o+1<a){const c=u.charCodeAt(o+1);if(c>=56320&&c<=57343){r+=encodeURIComponent(u[o]+u[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(u[o])}return r}hu.defaultChars=";/?:@&=+$,-_.!~*'()#";hu.componentChars="-_.!~*'()";function Vu(u){let e="";return e+=u.protocol||"",e+=u.slashes?"//":"",e+=u.auth?u.auth+"@":"",u.hostname&&u.hostname.indexOf(":")!==-1?e+="["+u.hostname+"]":e+=u.hostname||"",e+=u.port?":"+u.port:"",e+=u.pathname||"",e+=u.search||"",e+=u.hash||"",e}function xu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const An=/^([a-z0-9.+-]+:)/i,Fn=/:[0-9]*$/,Sn=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Tn=["<",">",'"',"`"," ","\r",`
`,"	"],Mn=["{","}","|","\\","^","`"].concat(Tn),zn=["'"].concat(Mn),ae=["%","/","?",";","#"].concat(zn),ce=["/","?","#"],In=255,se=/^[+a-z0-9A-Z_-]{0,63}$/,Rn=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,le={javascript:!0,"javascript:":!0},de={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Zu(u,e){if(u&&u instanceof xu)return u;const n=new xu;return n.parse(u,e),n}xu.prototype.parse=function(u,e){let n,t,r,o=u;if(o=o.trim(),!e&&u.split("#").length===1){const s=Sn.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let a=An.exec(o);if(a&&(a=a[0],n=a.toLowerCase(),this.protocol=a,o=o.substr(a.length)),(e||a||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(a&&le[a])&&(o=o.substr(2),this.slashes=!0)),!le[a]&&(r||a&&!de[a])){let s=-1;for(let d=0;d<ce.length;d++)t=o.indexOf(ce[d]),t!==-1&&(s===-1||t<s)&&(s=t);let f,l;s===-1?l=o.lastIndexOf("@"):l=o.lastIndexOf("@",s),l!==-1&&(f=o.slice(0,l),o=o.slice(l+1),this.auth=f),s=-1;for(let d=0;d<ae.length;d++)t=o.indexOf(ae[d]),t!==-1&&(s===-1||t<s)&&(s=t);s===-1&&(s=o.length),o[s-1]===":"&&s--;const p=o.slice(0,s);o=o.slice(s),this.parseHost(p),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const d=this.hostname.split(/\./);for(let b=0,g=d.length;b<g;b++){const y=d[b];if(y&&!y.match(se)){let m="";for(let k=0,x=y.length;k<x;k++)y.charCodeAt(k)>127?m+="x":m+=y[k];if(!m.match(se)){const k=d.slice(0,b),x=d.slice(b+1),_=y.match(Rn);_&&(k.push(_[1]),x.unshift(_[2])),x.length&&(o=x.join(".")+o),this.hostname=k.join(".");break}}}}this.hostname.length>In&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=o.indexOf("#");i!==-1&&(this.hash=o.substr(i),o=o.slice(0,i));const c=o.indexOf("?");return c!==-1&&(this.search=o.substr(c),o=o.slice(0,c)),o&&(this.pathname=o),de[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};xu.prototype.parseHost=function(u){let e=Fn.exec(u);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),u=u.substr(0,u.length-e.length)),u&&(this.hostname=u)};const Bn=Object.freeze(Object.defineProperty({__proto__:null,decode:Y,encode:hu,format:Vu,parse:Zu},Symbol.toStringTag,{value:"Module"})),Ie=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Re=/[\0-\x1F\x7F-\x9F]/,Pn=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Wu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Be=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Pe=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Ln=Object.freeze(Object.defineProperty({__proto__:null,Any:Ie,Cc:Re,Cf:Pn,P:Wu,S:Be,Z:Pe},Symbol.toStringTag,{value:"Module"})),qn=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(u=>u.charCodeAt(0))),On=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(u=>u.charCodeAt(0)));var Tu;const Nn=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),$n=(Tu=String.fromCodePoint)!==null&&Tu!==void 0?Tu:function(u){let e="";return u>65535&&(u-=65536,e+=String.fromCharCode(u>>>10&1023|55296),u=56320|u&1023),e+=String.fromCharCode(u),e};function Gn(u){var e;return u>=55296&&u<=57343||u>1114111?65533:(e=Nn.get(u))!==null&&e!==void 0?e:u}var F;(function(u){u[u.NUM=35]="NUM",u[u.SEMI=59]="SEMI",u[u.EQUALS=61]="EQUALS",u[u.ZERO=48]="ZERO",u[u.NINE=57]="NINE",u[u.LOWER_A=97]="LOWER_A",u[u.LOWER_F=102]="LOWER_F",u[u.LOWER_X=120]="LOWER_X",u[u.LOWER_Z=122]="LOWER_Z",u[u.UPPER_A=65]="UPPER_A",u[u.UPPER_F=70]="UPPER_F",u[u.UPPER_Z=90]="UPPER_Z"})(F||(F={}));const jn=32;var H;(function(u){u[u.VALUE_LENGTH=49152]="VALUE_LENGTH",u[u.BRANCH_LENGTH=16256]="BRANCH_LENGTH",u[u.JUMP_TABLE=127]="JUMP_TABLE"})(H||(H={}));function ju(u){return u>=F.ZERO&&u<=F.NINE}function Hn(u){return u>=F.UPPER_A&&u<=F.UPPER_F||u>=F.LOWER_A&&u<=F.LOWER_F}function Un(u){return u>=F.UPPER_A&&u<=F.UPPER_Z||u>=F.LOWER_A&&u<=F.LOWER_Z||ju(u)}function Vn(u){return u===F.EQUALS||Un(u)}var E;(function(u){u[u.EntityStart=0]="EntityStart",u[u.NumericStart=1]="NumericStart",u[u.NumericDecimal=2]="NumericDecimal",u[u.NumericHex=3]="NumericHex",u[u.NamedEntity=4]="NamedEntity"})(E||(E={}));var j;(function(u){u[u.Legacy=0]="Legacy",u[u.Strict=1]="Strict",u[u.Attribute=2]="Attribute"})(j||(j={}));class Zn{constructor(e,n,t){this.decodeTree=e,this.emitCodePoint=n,this.errors=t,this.state=E.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=j.Strict}startEntity(e){this.decodeMode=e,this.state=E.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,n){switch(this.state){case E.EntityStart:return e.charCodeAt(n)===F.NUM?(this.state=E.NumericStart,this.consumed+=1,this.stateNumericStart(e,n+1)):(this.state=E.NamedEntity,this.stateNamedEntity(e,n));case E.NumericStart:return this.stateNumericStart(e,n);case E.NumericDecimal:return this.stateNumericDecimal(e,n);case E.NumericHex:return this.stateNumericHex(e,n);case E.NamedEntity:return this.stateNamedEntity(e,n)}}stateNumericStart(e,n){return n>=e.length?-1:(e.charCodeAt(n)|jn)===F.LOWER_X?(this.state=E.NumericHex,this.consumed+=1,this.stateNumericHex(e,n+1)):(this.state=E.NumericDecimal,this.stateNumericDecimal(e,n))}addToNumericResult(e,n,t,r){if(n!==t){const o=t-n;this.result=this.result*Math.pow(r,o)+parseInt(e.substr(n,o),r),this.consumed+=o}}stateNumericHex(e,n){const t=n;for(;n<e.length;){const r=e.charCodeAt(n);if(ju(r)||Hn(r))n+=1;else return this.addToNumericResult(e,t,n,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,t,n,16),-1}stateNumericDecimal(e,n){const t=n;for(;n<e.length;){const r=e.charCodeAt(n);if(ju(r))n+=1;else return this.addToNumericResult(e,t,n,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,t,n,10),-1}emitNumericEntity(e,n){var t;if(this.consumed<=n)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===F.SEMI)this.consumed+=1;else if(this.decodeMode===j.Strict)return 0;return this.emitCodePoint(Gn(this.result),this.consumed),this.errors&&(e!==F.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,n){const{decodeTree:t}=this;let r=t[this.treeIndex],o=(r&H.VALUE_LENGTH)>>14;for(;n<e.length;n++,this.excess++){const a=e.charCodeAt(n);if(this.treeIndex=Wn(t,r,this.treeIndex+Math.max(1,o),a),this.treeIndex<0)return this.result===0||this.decodeMode===j.Attribute&&(o===0||Vn(a))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],o=(r&H.VALUE_LENGTH)>>14,o!==0){if(a===F.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==j.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:n,decodeTree:t}=this,r=(t[n]&H.VALUE_LENGTH)>>14;return this.emitNamedEntityData(n,r,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,n,t){const{decodeTree:r}=this;return this.emitCodePoint(n===1?r[e]&~H.VALUE_LENGTH:r[e+1],t),n===3&&this.emitCodePoint(r[e+2],t),t}end(){var e;switch(this.state){case E.NamedEntity:return this.result!==0&&(this.decodeMode!==j.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case E.NumericDecimal:return this.emitNumericEntity(0,2);case E.NumericHex:return this.emitNumericEntity(0,3);case E.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case E.EntityStart:return 0}}}function Le(u){let e="";const n=new Zn(u,t=>e+=$n(t));return function(r,o){let a=0,i=0;for(;(i=r.indexOf("&",i))>=0;){e+=r.slice(a,i),n.startEntity(o);const s=n.write(r,i+1);if(s<0){a=i+n.end();break}a=i+s,i=s===0?a+1:a}const c=e+r.slice(a);return e="",c}}function Wn(u,e,n,t){const r=(e&H.BRANCH_LENGTH)>>7,o=e&H.JUMP_TABLE;if(r===0)return o!==0&&t===o?n:-1;if(o){const c=t-o;return c<0||c>=r?-1:u[n+c]-1}let a=n,i=a+r-1;for(;a<=i;){const c=a+i>>>1,s=u[c];if(s<t)a=c+1;else if(s>t)i=c-1;else return u[c+r]}return-1}const Jn=Le(qn);Le(On);function qe(u,e=j.Legacy){return Jn(u,e)}function Kn(u){return Object.prototype.toString.call(u)}function Ju(u){return Kn(u)==="[object String]"}const Qn=Object.prototype.hasOwnProperty;function Xn(u,e){return Qn.call(u,e)}function Cu(u){return Array.prototype.slice.call(arguments,1).forEach(function(n){if(n){if(typeof n!="object")throw new TypeError(n+"must be object");Object.keys(n).forEach(function(t){u[t]=n[t]})}}),u}function Oe(u,e,n){return[].concat(u.slice(0,e),n,u.slice(e+1))}function Ku(u){return!(u>=55296&&u<=57343||u>=64976&&u<=65007||(u&65535)===65535||(u&65535)===65534||u>=0&&u<=8||u===11||u>=14&&u<=31||u>=127&&u<=159||u>1114111)}function yu(u){if(u>65535){u-=65536;const e=55296+(u>>10),n=56320+(u&1023);return String.fromCharCode(e,n)}return String.fromCharCode(u)}const Ne=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Yn=/&([a-z#][a-z0-9]{1,31});/gi,ut=new RegExp(Ne.source+"|"+Yn.source,"gi"),et=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function nt(u,e){if(e.charCodeAt(0)===35&&et.test(e)){const t=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Ku(t)?yu(t):u}const n=qe(u);return n!==u?n:u}function tt(u){return u.indexOf("\\")<0?u:u.replace(Ne,"$1")}function uu(u){return u.indexOf("\\")<0&&u.indexOf("&")<0?u:u.replace(ut,function(e,n,t){return n||nt(e,t)})}const rt=/[&<>"]/,ot=/[&<>"]/g,it={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function at(u){return it[u]}function U(u){return rt.test(u)?u.replace(ot,at):u}const ct=/[.?*+^$[\]\\(){}|-]/g;function st(u){return u.replace(ct,"\\$&")}function C(u){switch(u){case 9:case 32:return!0}return!1}function su(u){if(u>=8192&&u<=8202)return!0;switch(u){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function lu(u){return Wu.test(u)||Be.test(u)}function du(u){switch(u){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function vu(u){return u=u.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(u=u.replace(/ẞ/g,"ß")),u.toLowerCase().toUpperCase()}const lt={mdurl:Bn,ucmicro:Ln},dt=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Oe,assign:Cu,escapeHtml:U,escapeRE:st,fromCodePoint:yu,has:Xn,isMdAsciiPunct:du,isPunctChar:lu,isSpace:C,isString:Ju,isValidEntityCode:Ku,isWhiteSpace:su,lib:lt,normalizeReference:vu,unescapeAll:uu,unescapeMd:tt},Symbol.toStringTag,{value:"Module"}));function ft(u,e,n){let t,r,o,a;const i=u.posMax,c=u.pos;for(u.pos=e+1,t=1;u.pos<i;){if(o=u.src.charCodeAt(u.pos),o===93&&(t--,t===0)){r=!0;break}if(a=u.pos,u.md.inline.skipToken(u),o===91){if(a===u.pos-1)t++;else if(n)return u.pos=c,-1}}let s=-1;return r&&(s=u.pos),u.pos=c,s}function ht(u,e,n){let t,r=e;const o={ok:!1,pos:0,str:""};if(u.charCodeAt(r)===60){for(r++;r<n;){if(t=u.charCodeAt(r),t===10||t===60)return o;if(t===62)return o.pos=r+1,o.str=uu(u.slice(e+1,r)),o.ok=!0,o;if(t===92&&r+1<n){r+=2;continue}r++}return o}let a=0;for(;r<n&&(t=u.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<n){if(u.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(a++,a>32))return o;if(t===41){if(a===0)break;a--}r++}return e===r||a!==0||(o.str=uu(u.slice(e,r)),o.pos=r,o.ok=!0),o}function bt(u,e,n,t){let r,o=e;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)a.str=t.str,a.marker=t.marker;else{if(o>=n)return a;let i=u.charCodeAt(o);if(i!==34&&i!==39&&i!==40)return a;e++,o++,i===40&&(i=41),a.marker=i}for(;o<n;){if(r=u.charCodeAt(o),r===a.marker)return a.pos=o+1,a.str+=uu(u.slice(e,o)),a.ok=!0,a;if(r===40&&a.marker===41)return a;r===92&&o+1<n&&o++,o++}return a.can_continue=!0,a.str+=uu(u.slice(e,o)),a}const pt=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:ht,parseLinkLabel:ft,parseLinkTitle:bt},Symbol.toStringTag,{value:"Module"})),O={};O.code_inline=function(u,e,n,t,r){const o=u[e];return"<code"+r.renderAttrs(o)+">"+U(o.content)+"</code>"};O.code_block=function(u,e,n,t,r){const o=u[e];return"<pre"+r.renderAttrs(o)+"><code>"+U(u[e].content)+`</code></pre>
`};O.fence=function(u,e,n,t,r){const o=u[e],a=o.info?uu(o.info).trim():"";let i="",c="";if(a){const f=a.split(/(\s+)/g);i=f[0],c=f.slice(2).join("")}let s;if(n.highlight?s=n.highlight(o.content,i,c)||U(o.content):s=U(o.content),s.indexOf("<pre")===0)return s+`
`;if(a){const f=o.attrIndex("class"),l=o.attrs?o.attrs.slice():[];f<0?l.push(["class",n.langPrefix+i]):(l[f]=l[f].slice(),l[f][1]+=" "+n.langPrefix+i);const p={attrs:l};return`<pre><code${r.renderAttrs(p)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${s}</code></pre>
`};O.image=function(u,e,n,t,r){const o=u[e];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,n,t),r.renderToken(u,e,n)};O.hardbreak=function(u,e,n){return n.xhtmlOut?`<br />
`:`<br>
`};O.softbreak=function(u,e,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`};O.text=function(u,e){return U(u[e].content)};O.html_block=function(u,e){return u[e].content};O.html_inline=function(u,e){return u[e].content};function tu(){this.rules=Cu({},O)}tu.prototype.renderAttrs=function(e){let n,t,r;if(!e.attrs)return"";for(r="",n=0,t=e.attrs.length;n<t;n++)r+=" "+U(e.attrs[n][0])+'="'+U(e.attrs[n][1])+'"';return r};tu.prototype.renderToken=function(e,n,t){const r=e[n];let o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&n&&e[n-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(o+=" /");let a=!1;if(r.block&&(a=!0,r.nesting===1&&n+1<e.length)){const i=e[n+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===r.tag)&&(a=!1)}return o+=a?`>
`:">",o};tu.prototype.renderInline=function(u,e,n){let t="";const r=this.rules;for(let o=0,a=u.length;o<a;o++){const i=u[o].type;typeof r[i]<"u"?t+=r[i](u,o,e,n,this):t+=this.renderToken(u,o,e)}return t};tu.prototype.renderInlineAsText=function(u,e,n){let t="";for(let r=0,o=u.length;r<o;r++)switch(u[r].type){case"text":t+=u[r].content;break;case"image":t+=this.renderInlineAsText(u[r].children,e,n);break;case"html_inline":case"html_block":t+=u[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t};tu.prototype.render=function(u,e,n){let t="";const r=this.rules;for(let o=0,a=u.length;o<a;o++){const i=u[o].type;i==="inline"?t+=this.renderInline(u[o].children,e,n):typeof r[i]<"u"?t+=r[i](u,o,e,n,this):t+=this.renderToken(u,o,e,n)}return t};function M(){this.__rules__=[],this.__cache__=null}M.prototype.__find__=function(u){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===u)return e;return-1};M.prototype.__compile__=function(){const u=this,e=[""];u.__rules__.forEach(function(n){n.enabled&&n.alt.forEach(function(t){e.indexOf(t)<0&&e.push(t)})}),u.__cache__={},e.forEach(function(n){u.__cache__[n]=[],u.__rules__.forEach(function(t){t.enabled&&(n&&t.alt.indexOf(n)<0||u.__cache__[n].push(t.fn))})})};M.prototype.at=function(u,e,n){const t=this.__find__(u),r=n||{};if(t===-1)throw new Error("Parser rule not found: "+u);this.__rules__[t].fn=e,this.__rules__[t].alt=r.alt||[],this.__cache__=null};M.prototype.before=function(u,e,n,t){const r=this.__find__(u),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r,0,{name:e,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};M.prototype.after=function(u,e,n,t){const r=this.__find__(u),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r+1,0,{name:e,enabled:!0,fn:n,alt:o.alt||[]}),this.__cache__=null};M.prototype.push=function(u,e,n){const t=n||{};this.__rules__.push({name:u,enabled:!0,fn:e,alt:t.alt||[]}),this.__cache__=null};M.prototype.enable=function(u,e){Array.isArray(u)||(u=[u]);const n=[];return u.forEach(function(t){const r=this.__find__(t);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,n.push(t)},this),this.__cache__=null,n};M.prototype.enableOnly=function(u,e){Array.isArray(u)||(u=[u]),this.__rules__.forEach(function(n){n.enabled=!1}),this.enable(u,e)};M.prototype.disable=function(u,e){Array.isArray(u)||(u=[u]);const n=[];return u.forEach(function(t){const r=this.__find__(t);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,n.push(t)},this),this.__cache__=null,n};M.prototype.getRules=function(u){return this.__cache__===null&&this.__compile__(),this.__cache__[u]||[]};function B(u,e,n){this.type=u,this.tag=e,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}B.prototype.attrIndex=function(e){if(!this.attrs)return-1;const n=this.attrs;for(let t=0,r=n.length;t<r;t++)if(n[t][0]===e)return t;return-1};B.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]};B.prototype.attrSet=function(e,n){const t=this.attrIndex(e),r=[e,n];t<0?this.attrPush(r):this.attrs[t]=r};B.prototype.attrGet=function(e){const n=this.attrIndex(e);let t=null;return n>=0&&(t=this.attrs[n][1]),t};B.prototype.attrJoin=function(e,n){const t=this.attrIndex(e);t<0?this.attrPush([e,n]):this.attrs[t][1]=this.attrs[t][1]+" "+n};function $e(u,e,n){this.src=u,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=e}$e.prototype.Token=B;const mt=/\r\n?|\n/g,gt=/\0/g;function kt(u){let e;e=u.src.replace(mt,`
`),e=e.replace(gt,"�"),u.src=e}function xt(u){let e;u.inlineMode?(e=new u.Token("inline","",0),e.content=u.src,e.map=[0,1],e.children=[],u.tokens.push(e)):u.md.block.parse(u.src,u.md,u.env,u.tokens)}function yt(u){const e=u.tokens;for(let n=0,t=e.length;n<t;n++){const r=e[n];r.type==="inline"&&u.md.inline.parse(r.content,u.md,u.env,r.children)}}function _t(u){return/^<a[>\s]/i.test(u)}function wt(u){return/^<\/a\s*>/i.test(u)}function Ct(u){const e=u.tokens;if(u.md.options.linkify)for(let n=0,t=e.length;n<t;n++){if(e[n].type!=="inline"||!u.md.linkify.pretest(e[n].content))continue;let r=e[n].children,o=0;for(let a=r.length-1;a>=0;a--){const i=r[a];if(i.type==="link_close"){for(a--;r[a].level!==i.level&&r[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(_t(i.content)&&o>0&&o--,wt(i.content)&&o++),!(o>0)&&i.type==="text"&&u.md.linkify.test(i.content)){const c=i.content;let s=u.md.linkify.match(c);const f=[];let l=i.level,p=0;s.length>0&&s[0].index===0&&a>0&&r[a-1].type==="text_special"&&(s=s.slice(1));for(let h=0;h<s.length;h++){const d=s[h].url,b=u.md.normalizeLink(d);if(!u.md.validateLink(b))continue;let g=s[h].text;s[h].schema?s[h].schema==="mailto:"&&!/^mailto:/i.test(g)?g=u.md.normalizeLinkText("mailto:"+g).replace(/^mailto:/,""):g=u.md.normalizeLinkText(g):g=u.md.normalizeLinkText("http://"+g).replace(/^http:\/\//,"");const y=s[h].index;if(y>p){const _=new u.Token("text","",0);_.content=c.slice(p,y),_.level=l,f.push(_)}const m=new u.Token("link_open","a",1);m.attrs=[["href",b]],m.level=l++,m.markup="linkify",m.info="auto",f.push(m);const k=new u.Token("text","",0);k.content=g,k.level=l,f.push(k);const x=new u.Token("link_close","a",-1);x.level=--l,x.markup="linkify",x.info="auto",f.push(x),p=s[h].lastIndex}if(p<c.length){const h=new u.Token("text","",0);h.content=c.slice(p),h.level=l,f.push(h)}e[n].children=r=Oe(r,a,f)}}}}const Ge=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,vt=/\((c|tm|r)\)/i,Dt=/\((c|tm|r)\)/ig,Et={c:"©",r:"®",tm:"™"};function At(u,e){return Et[e.toLowerCase()]}function Ft(u){let e=0;for(let n=u.length-1;n>=0;n--){const t=u[n];t.type==="text"&&!e&&(t.content=t.content.replace(Dt,At)),t.type==="link_open"&&t.info==="auto"&&e--,t.type==="link_close"&&t.info==="auto"&&e++}}function St(u){let e=0;for(let n=u.length-1;n>=0;n--){const t=u[n];t.type==="text"&&!e&&Ge.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&e--,t.type==="link_close"&&t.info==="auto"&&e++}}function Tt(u){let e;if(u.md.options.typographer)for(e=u.tokens.length-1;e>=0;e--)u.tokens[e].type==="inline"&&(vt.test(u.tokens[e].content)&&Ft(u.tokens[e].children),Ge.test(u.tokens[e].content)&&St(u.tokens[e].children))}const Mt=/['"]/,fe=/['"]/g,he="’";function mu(u,e,n){return u.slice(0,e)+n+u.slice(e+1)}function zt(u,e){let n;const t=[];for(let r=0;r<u.length;r++){const o=u[r],a=u[r].level;for(n=t.length-1;n>=0&&!(t[n].level<=a);n--);if(t.length=n+1,o.type!=="text")continue;let i=o.content,c=0,s=i.length;u:for(;c<s;){fe.lastIndex=c;const f=fe.exec(i);if(!f)break;let l=!0,p=!0;c=f.index+1;const h=f[0]==="'";let d=32;if(f.index-1>=0)d=i.charCodeAt(f.index-1);else for(n=r-1;n>=0&&!(u[n].type==="softbreak"||u[n].type==="hardbreak");n--)if(u[n].content){d=u[n].content.charCodeAt(u[n].content.length-1);break}let b=32;if(c<s)b=i.charCodeAt(c);else for(n=r+1;n<u.length&&!(u[n].type==="softbreak"||u[n].type==="hardbreak");n++)if(u[n].content){b=u[n].content.charCodeAt(0);break}const g=du(d)||lu(String.fromCharCode(d)),y=du(b)||lu(String.fromCharCode(b)),m=su(d),k=su(b);if(k?l=!1:y&&(m||g||(l=!1)),m?p=!1:g&&(k||y||(p=!1)),b===34&&f[0]==='"'&&d>=48&&d<=57&&(p=l=!1),l&&p&&(l=g,p=y),!l&&!p){h&&(o.content=mu(o.content,f.index,he));continue}if(p)for(n=t.length-1;n>=0;n--){let x=t[n];if(t[n].level<a)break;if(x.single===h&&t[n].level===a){x=t[n];let _,w;h?(_=e.md.options.quotes[2],w=e.md.options.quotes[3]):(_=e.md.options.quotes[0],w=e.md.options.quotes[1]),o.content=mu(o.content,f.index,w),u[x.token].content=mu(u[x.token].content,x.pos,_),c+=w.length-1,x.token===r&&(c+=_.length-1),i=o.content,s=i.length,t.length=n;continue u}}l?t.push({token:r,pos:f.index,single:h,level:a}):p&&h&&(o.content=mu(o.content,f.index,he))}}}function It(u){if(u.md.options.typographer)for(let e=u.tokens.length-1;e>=0;e--)u.tokens[e].type!=="inline"||!Mt.test(u.tokens[e].content)||zt(u.tokens[e].children,u)}function Rt(u){let e,n;const t=u.tokens,r=t.length;for(let o=0;o<r;o++){if(t[o].type!=="inline")continue;const a=t[o].children,i=a.length;for(e=0;e<i;e++)a[e].type==="text_special"&&(a[e].type="text");for(e=n=0;e<i;e++)a[e].type==="text"&&e+1<i&&a[e+1].type==="text"?a[e+1].content=a[e].content+a[e+1].content:(e!==n&&(a[n]=a[e]),n++);e!==n&&(a.length=n)}}const Mu=[["normalize",kt],["block",xt],["inline",yt],["linkify",Ct],["replacements",Tt],["smartquotes",It],["text_join",Rt]];function Qu(){this.ruler=new M;for(let u=0;u<Mu.length;u++)this.ruler.push(Mu[u][0],Mu[u][1])}Qu.prototype.process=function(u){const e=this.ruler.getRules("");for(let n=0,t=e.length;n<t;n++)e[n](u)};Qu.prototype.State=$e;function N(u,e,n,t){this.src=u,this.md=e,this.env=n,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let o=0,a=0,i=0,c=0,s=r.length,f=!1;a<s;a++){const l=r.charCodeAt(a);if(!f)if(C(l)){i++,l===9?c+=4-c%4:c++;continue}else f=!0;(l===10||a===s-1)&&(l!==10&&a++,this.bMarks.push(o),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(c),this.bsCount.push(0),f=!1,i=0,c=0,o=a+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}N.prototype.push=function(u,e,n){const t=new B(u,e,n);return t.block=!0,n<0&&this.level--,t.level=this.level,n>0&&this.level++,this.tokens.push(t),t};N.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]};N.prototype.skipEmptyLines=function(e){for(let n=this.lineMax;e<n&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e};N.prototype.skipSpaces=function(e){for(let n=this.src.length;e<n;e++){const t=this.src.charCodeAt(e);if(!C(t))break}return e};N.prototype.skipSpacesBack=function(e,n){if(e<=n)return e;for(;e>n;)if(!C(this.src.charCodeAt(--e)))return e+1;return e};N.prototype.skipChars=function(e,n){for(let t=this.src.length;e<t&&this.src.charCodeAt(e)===n;e++);return e};N.prototype.skipCharsBack=function(e,n,t){if(e<=t)return e;for(;e>t;)if(n!==this.src.charCodeAt(--e))return e+1;return e};N.prototype.getLines=function(e,n,t,r){if(e>=n)return"";const o=new Array(n-e);for(let a=0,i=e;i<n;i++,a++){let c=0;const s=this.bMarks[i];let f=s,l;for(i+1<n||r?l=this.eMarks[i]+1:l=this.eMarks[i];f<l&&c<t;){const p=this.src.charCodeAt(f);if(C(p))p===9?c+=4-(c+this.bsCount[i])%4:c++;else if(f-s<this.tShift[i])c++;else break;f++}c>t?o[a]=new Array(c-t+1).join(" ")+this.src.slice(f,l):o[a]=this.src.slice(f,l)}return o.join("")};N.prototype.Token=B;const Bt=65536;function zu(u,e){const n=u.bMarks[e]+u.tShift[e],t=u.eMarks[e];return u.src.slice(n,t)}function be(u){const e=[],n=u.length;let t=0,r=u.charCodeAt(t),o=!1,a=0,i="";for(;t<n;)r===124&&(o?(i+=u.substring(a,t-1),a=t):(e.push(i+u.substring(a,t)),i="",a=t+1)),o=r===92,t++,r=u.charCodeAt(t);return e.push(i+u.substring(a)),e}function Pt(u,e,n,t){if(e+2>n)return!1;let r=e+1;if(u.sCount[r]<u.blkIndent||u.sCount[r]-u.blkIndent>=4)return!1;let o=u.bMarks[r]+u.tShift[r];if(o>=u.eMarks[r])return!1;const a=u.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58||o>=u.eMarks[r])return!1;const i=u.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58&&!C(i)||a===45&&C(i))return!1;for(;o<u.eMarks[r];){const x=u.src.charCodeAt(o);if(x!==124&&x!==45&&x!==58&&!C(x))return!1;o++}let c=zu(u,e+1),s=c.split("|");const f=[];for(let x=0;x<s.length;x++){const _=s[x].trim();if(!_){if(x===0||x===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(_))return!1;_.charCodeAt(_.length-1)===58?f.push(_.charCodeAt(0)===58?"center":"right"):_.charCodeAt(0)===58?f.push("left"):f.push("")}if(c=zu(u,e).trim(),c.indexOf("|")===-1||u.sCount[e]-u.blkIndent>=4)return!1;s=be(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const l=s.length;if(l===0||l!==f.length)return!1;if(t)return!0;const p=u.parentType;u.parentType="table";const h=u.md.block.ruler.getRules("blockquote"),d=u.push("table_open","table",1),b=[e,0];d.map=b;const g=u.push("thead_open","thead",1);g.map=[e,e+1];const y=u.push("tr_open","tr",1);y.map=[e,e+1];for(let x=0;x<s.length;x++){const _=u.push("th_open","th",1);f[x]&&(_.attrs=[["style","text-align:"+f[x]]]);const w=u.push("inline","",0);w.content=s[x].trim(),w.children=[],u.push("th_close","th",-1)}u.push("tr_close","tr",-1),u.push("thead_close","thead",-1);let m,k=0;for(r=e+2;r<n&&!(u.sCount[r]<u.blkIndent);r++){let x=!1;for(let w=0,D=h.length;w<D;w++)if(h[w](u,r,n,!0)){x=!0;break}if(x||(c=zu(u,r).trim(),!c)||u.sCount[r]-u.blkIndent>=4||(s=be(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),k+=l-s.length,k>Bt))break;if(r===e+2){const w=u.push("tbody_open","tbody",1);w.map=m=[e+2,0]}const _=u.push("tr_open","tr",1);_.map=[r,r+1];for(let w=0;w<l;w++){const D=u.push("td_open","td",1);f[w]&&(D.attrs=[["style","text-align:"+f[w]]]);const T=u.push("inline","",0);T.content=s[w]?s[w].trim():"",T.children=[],u.push("td_close","td",-1)}u.push("tr_close","tr",-1)}return m&&(u.push("tbody_close","tbody",-1),m[1]=r),u.push("table_close","table",-1),b[1]=r,u.parentType=p,u.line=r,!0}function Lt(u,e,n){if(u.sCount[e]-u.blkIndent<4)return!1;let t=e+1,r=t;for(;t<n;){if(u.isEmpty(t)){t++;continue}if(u.sCount[t]-u.blkIndent>=4){t++,r=t;continue}break}u.line=r;const o=u.push("code_block","code",0);return o.content=u.getLines(e,r,4+u.blkIndent,!1)+`
`,o.map=[e,u.line],!0}function qt(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||r+3>o)return!1;const a=u.src.charCodeAt(r);if(a!==126&&a!==96)return!1;let i=r;r=u.skipChars(r,a);let c=r-i;if(c<3)return!1;const s=u.src.slice(i,r),f=u.src.slice(r,o);if(a===96&&f.indexOf(String.fromCharCode(a))>=0)return!1;if(t)return!0;let l=e,p=!1;for(;l++,!(l>=n||(r=i=u.bMarks[l]+u.tShift[l],o=u.eMarks[l],r<o&&u.sCount[l]<u.blkIndent));)if(u.src.charCodeAt(r)===a&&!(u.sCount[l]-u.blkIndent>=4)&&(r=u.skipChars(r,a),!(r-i<c)&&(r=u.skipSpaces(r),!(r<o)))){p=!0;break}c=u.sCount[e],u.line=l+(p?1:0);const h=u.push("fence","code",0);return h.info=f,h.content=u.getLines(e+1,l,c,!0),h.markup=s,h.map=[e,u.line],!0}function Ot(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];const a=u.lineMax;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==62)return!1;if(t)return!0;const i=[],c=[],s=[],f=[],l=u.md.block.ruler.getRules("blockquote"),p=u.parentType;u.parentType="blockquote";let h=!1,d;for(d=e;d<n;d++){const k=u.sCount[d]<u.blkIndent;if(r=u.bMarks[d]+u.tShift[d],o=u.eMarks[d],r>=o)break;if(u.src.charCodeAt(r++)===62&&!k){let _=u.sCount[d]+1,w,D;u.src.charCodeAt(r)===32?(r++,_++,D=!1,w=!0):u.src.charCodeAt(r)===9?(w=!0,(u.bsCount[d]+_)%4===3?(r++,_++,D=!1):D=!0):w=!1;let T=_;for(i.push(u.bMarks[d]),u.bMarks[d]=r;r<o;){const $=u.src.charCodeAt(r);if(C($))$===9?T+=4-(T+u.bsCount[d]+(D?1:0))%4:T++;else break;r++}h=r>=o,c.push(u.bsCount[d]),u.bsCount[d]=u.sCount[d]+1+(w?1:0),s.push(u.sCount[d]),u.sCount[d]=T-_,f.push(u.tShift[d]),u.tShift[d]=r-u.bMarks[d];continue}if(h)break;let x=!1;for(let _=0,w=l.length;_<w;_++)if(l[_](u,d,n,!0)){x=!0;break}if(x){u.lineMax=d,u.blkIndent!==0&&(i.push(u.bMarks[d]),c.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]-=u.blkIndent);break}i.push(u.bMarks[d]),c.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]=-1}const b=u.blkIndent;u.blkIndent=0;const g=u.push("blockquote_open","blockquote",1);g.markup=">";const y=[e,0];g.map=y,u.md.block.tokenize(u,e,d);const m=u.push("blockquote_close","blockquote",-1);m.markup=">",u.lineMax=a,u.parentType=p,y[1]=u.line;for(let k=0;k<f.length;k++)u.bMarks[k+e]=i[k],u.tShift[k+e]=f[k],u.sCount[k+e]=s[k],u.bsCount[k+e]=c[k];return u.blkIndent=b,!0}function Nt(u,e,n,t){const r=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let o=u.bMarks[e]+u.tShift[e];const a=u.src.charCodeAt(o++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;o<r;){const s=u.src.charCodeAt(o++);if(s!==a&&!C(s))return!1;s===a&&i++}if(i<3)return!1;if(t)return!0;u.line=e+1;const c=u.push("hr","hr",0);return c.map=[e,u.line],c.markup=Array(i+1).join(String.fromCharCode(a)),!0}function pe(u,e){const n=u.eMarks[e];let t=u.bMarks[e]+u.tShift[e];const r=u.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<n){const o=u.src.charCodeAt(t);if(!C(o))return-1}return t}function me(u,e){const n=u.bMarks[e]+u.tShift[e],t=u.eMarks[e];let r=n;if(r+1>=t)return-1;let o=u.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=t)return-1;if(o=u.src.charCodeAt(r++),o>=48&&o<=57){if(r-n>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<t&&(o=u.src.charCodeAt(r),!C(o))?-1:r}function $t(u,e){const n=u.level+2;for(let t=e+2,r=u.tokens.length-2;t<r;t++)u.tokens[t].level===n&&u.tokens[t].type==="paragraph_open"&&(u.tokens[t+2].hidden=!0,u.tokens[t].hidden=!0,t+=2)}function Gt(u,e,n,t){let r,o,a,i,c=e,s=!0;if(u.sCount[c]-u.blkIndent>=4||u.listIndent>=0&&u.sCount[c]-u.listIndent>=4&&u.sCount[c]<u.blkIndent)return!1;let f=!1;t&&u.parentType==="paragraph"&&u.sCount[c]>=u.blkIndent&&(f=!0);let l,p,h;if((h=me(u,c))>=0){if(l=!0,a=u.bMarks[c]+u.tShift[c],p=Number(u.src.slice(a,h-1)),f&&p!==1)return!1}else if((h=pe(u,c))>=0)l=!1;else return!1;if(f&&u.skipSpaces(h)>=u.eMarks[c])return!1;if(t)return!0;const d=u.src.charCodeAt(h-1),b=u.tokens.length;l?(i=u.push("ordered_list_open","ol",1),p!==1&&(i.attrs=[["start",p]])):i=u.push("bullet_list_open","ul",1);const g=[c,0];i.map=g,i.markup=String.fromCharCode(d);let y=!1;const m=u.md.block.ruler.getRules("list"),k=u.parentType;for(u.parentType="list";c<n;){o=h,r=u.eMarks[c];const x=u.sCount[c]+h-(u.bMarks[c]+u.tShift[c]);let _=x;for(;o<r;){const K=u.src.charCodeAt(o);if(K===9)_+=4-(_+u.bsCount[c])%4;else if(K===32)_++;else break;o++}const w=o;let D;w>=r?D=1:D=_-x,D>4&&(D=1);const T=x+D;i=u.push("list_item_open","li",1),i.markup=String.fromCharCode(d);const $=[c,0];i.map=$,l&&(i.info=u.src.slice(a,h-1));const ou=u.tight,Su=u.tShift[c],kn=u.sCount[c],xn=u.listIndent;if(u.listIndent=u.blkIndent,u.blkIndent=T,u.tight=!0,u.tShift[c]=w-u.bMarks[c],u.sCount[c]=_,w>=r&&u.isEmpty(c+1)?u.line=Math.min(u.line+2,n):u.md.block.tokenize(u,c,n,!0),(!u.tight||y)&&(s=!1),y=u.line-c>1&&u.isEmpty(u.line-1),u.blkIndent=u.listIndent,u.listIndent=xn,u.tShift[c]=Su,u.sCount[c]=kn,u.tight=ou,i=u.push("list_item_close","li",-1),i.markup=String.fromCharCode(d),c=u.line,$[1]=c,c>=n||u.sCount[c]<u.blkIndent||u.sCount[c]-u.blkIndent>=4)break;let te=!1;for(let K=0,yn=m.length;K<yn;K++)if(m[K](u,c,n,!0)){te=!0;break}if(te)break;if(l){if(h=me(u,c),h<0)break;a=u.bMarks[c]+u.tShift[c]}else if(h=pe(u,c),h<0)break;if(d!==u.src.charCodeAt(h-1))break}return l?i=u.push("ordered_list_close","ol",-1):i=u.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(d),g[1]=c,u.line=c,u.parentType=k,s&&$t(u,b),!0}function jt(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e],a=e+1;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==91)return!1;function i(m){const k=u.lineMax;if(m>=k||u.isEmpty(m))return null;let x=!1;if(u.sCount[m]-u.blkIndent>3&&(x=!0),u.sCount[m]<0&&(x=!0),!x){const D=u.md.block.ruler.getRules("reference"),T=u.parentType;u.parentType="reference";let $=!1;for(let ou=0,Su=D.length;ou<Su;ou++)if(D[ou](u,m,k,!0)){$=!0;break}if(u.parentType=T,$)return null}const _=u.bMarks[m]+u.tShift[m],w=u.eMarks[m];return u.src.slice(_,w+1)}let c=u.src.slice(r,o+1);o=c.length;let s=-1;for(r=1;r<o;r++){const m=c.charCodeAt(r);if(m===91)return!1;if(m===93){s=r;break}else if(m===10){const k=i(a);k!==null&&(c+=k,o=c.length,a++)}else if(m===92&&(r++,r<o&&c.charCodeAt(r)===10)){const k=i(a);k!==null&&(c+=k,o=c.length,a++)}}if(s<0||c.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<o;r++){const m=c.charCodeAt(r);if(m===10){const k=i(a);k!==null&&(c+=k,o=c.length,a++)}else if(!C(m))break}const f=u.md.helpers.parseLinkDestination(c,r,o);if(!f.ok)return!1;const l=u.md.normalizeLink(f.str);if(!u.md.validateLink(l))return!1;r=f.pos;const p=r,h=a,d=r;for(;r<o;r++){const m=c.charCodeAt(r);if(m===10){const k=i(a);k!==null&&(c+=k,o=c.length,a++)}else if(!C(m))break}let b=u.md.helpers.parseLinkTitle(c,r,o);for(;b.can_continue;){const m=i(a);if(m===null)break;c+=m,r=o,o=c.length,a++,b=u.md.helpers.parseLinkTitle(c,r,o,b)}let g;for(r<o&&d!==r&&b.ok?(g=b.str,r=b.pos):(g="",r=p,a=h);r<o;){const m=c.charCodeAt(r);if(!C(m))break;r++}if(r<o&&c.charCodeAt(r)!==10&&g)for(g="",r=p,a=h;r<o;){const m=c.charCodeAt(r);if(!C(m))break;r++}if(r<o&&c.charCodeAt(r)!==10)return!1;const y=vu(c.slice(1,s));return y?(t||(typeof u.env.references>"u"&&(u.env.references={}),typeof u.env.references[y]>"u"&&(u.env.references[y]={title:g,href:l}),u.line=a),!0):!1}const Ht=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Ut="[a-zA-Z_:][a-zA-Z0-9:._-]*",Vt="[^\"'=<>`\\x00-\\x20]+",Zt="'[^']*'",Wt='"[^"]*"',Jt="(?:"+Vt+"|"+Zt+"|"+Wt+")",Kt="(?:\\s+"+Ut+"(?:\\s*=\\s*"+Jt+")?)",je="<[A-Za-z][A-Za-z0-9\\-]*"+Kt+"*\\s*\\/?>",He="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Qt="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Xt="<[?][\\s\\S]*?[?]>",Yt="<![A-Za-z][^>]*>",ur="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",er=new RegExp("^(?:"+je+"|"+He+"|"+Qt+"|"+Xt+"|"+Yt+"|"+ur+")"),nr=new RegExp("^(?:"+je+"|"+He+")"),Q=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Ht.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(nr.source+"\\s*$"),/^$/,!1]];function tr(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||!u.md.options.html||u.src.charCodeAt(r)!==60)return!1;let a=u.src.slice(r,o),i=0;for(;i<Q.length&&!Q[i][0].test(a);i++);if(i===Q.length)return!1;if(t)return Q[i][2];let c=e+1;if(!Q[i][1].test(a)){for(;c<n&&!(u.sCount[c]<u.blkIndent);c++)if(r=u.bMarks[c]+u.tShift[c],o=u.eMarks[c],a=u.src.slice(r,o),Q[i][1].test(a)){a.length!==0&&c++;break}}u.line=c;const s=u.push("html_block","",0);return s.map=[e,c],s.content=u.getLines(e,c,u.blkIndent,!0),!0}function rr(u,e,n,t){let r=u.bMarks[e]+u.tShift[e],o=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let a=u.src.charCodeAt(r);if(a!==35||r>=o)return!1;let i=1;for(a=u.src.charCodeAt(++r);a===35&&r<o&&i<=6;)i++,a=u.src.charCodeAt(++r);if(i>6||r<o&&!C(a))return!1;if(t)return!0;o=u.skipSpacesBack(o,r);const c=u.skipCharsBack(o,35,r);c>r&&C(u.src.charCodeAt(c-1))&&(o=c),u.line=e+1;const s=u.push("heading_open","h"+String(i),1);s.markup="########".slice(0,i),s.map=[e,u.line];const f=u.push("inline","",0);f.content=u.src.slice(r,o).trim(),f.map=[e,u.line],f.children=[];const l=u.push("heading_close","h"+String(i),-1);return l.markup="########".slice(0,i),!0}function or(u,e,n){const t=u.md.block.ruler.getRules("paragraph");if(u.sCount[e]-u.blkIndent>=4)return!1;const r=u.parentType;u.parentType="paragraph";let o=0,a,i=e+1;for(;i<n&&!u.isEmpty(i);i++){if(u.sCount[i]-u.blkIndent>3)continue;if(u.sCount[i]>=u.blkIndent){let h=u.bMarks[i]+u.tShift[i];const d=u.eMarks[i];if(h<d&&(a=u.src.charCodeAt(h),(a===45||a===61)&&(h=u.skipChars(h,a),h=u.skipSpaces(h),h>=d))){o=a===61?1:2;break}}if(u.sCount[i]<0)continue;let p=!1;for(let h=0,d=t.length;h<d;h++)if(t[h](u,i,n,!0)){p=!0;break}if(p)break}if(!o)return!1;const c=u.getLines(e,i,u.blkIndent,!1).trim();u.line=i+1;const s=u.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(a),s.map=[e,u.line];const f=u.push("inline","",0);f.content=c,f.map=[e,u.line-1],f.children=[];const l=u.push("heading_close","h"+String(o),-1);return l.markup=String.fromCharCode(a),u.parentType=r,!0}function ir(u,e,n){const t=u.md.block.ruler.getRules("paragraph"),r=u.parentType;let o=e+1;for(u.parentType="paragraph";o<n&&!u.isEmpty(o);o++){if(u.sCount[o]-u.blkIndent>3||u.sCount[o]<0)continue;let s=!1;for(let f=0,l=t.length;f<l;f++)if(t[f](u,o,n,!0)){s=!0;break}if(s)break}const a=u.getLines(e,o,u.blkIndent,!1).trim();u.line=o;const i=u.push("paragraph_open","p",1);i.map=[e,u.line];const c=u.push("inline","",0);return c.content=a,c.map=[e,u.line],c.children=[],u.push("paragraph_close","p",-1),u.parentType=r,!0}const gu=[["table",Pt,["paragraph","reference"]],["code",Lt],["fence",qt,["paragraph","reference","blockquote","list"]],["blockquote",Ot,["paragraph","reference","blockquote","list"]],["hr",Nt,["paragraph","reference","blockquote","list"]],["list",Gt,["paragraph","reference","blockquote"]],["reference",jt],["html_block",tr,["paragraph","reference","blockquote"]],["heading",rr,["paragraph","reference","blockquote"]],["lheading",or],["paragraph",ir]];function Du(){this.ruler=new M;for(let u=0;u<gu.length;u++)this.ruler.push(gu[u][0],gu[u][1],{alt:(gu[u][2]||[]).slice()})}Du.prototype.tokenize=function(u,e,n){const t=this.ruler.getRules(""),r=t.length,o=u.md.options.maxNesting;let a=e,i=!1;for(;a<n&&(u.line=a=u.skipEmptyLines(a),!(a>=n||u.sCount[a]<u.blkIndent));){if(u.level>=o){u.line=n;break}const c=u.line;let s=!1;for(let f=0;f<r;f++)if(s=t[f](u,a,n,!1),s){if(c>=u.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");u.tight=!i,u.isEmpty(u.line-1)&&(i=!0),a=u.line,a<n&&u.isEmpty(a)&&(i=!0,a++,u.line=a)}};Du.prototype.parse=function(u,e,n,t){if(!u)return;const r=new this.State(u,e,n,t);this.tokenize(r,r.line,r.lineMax)};Du.prototype.State=N;function bu(u,e,n,t){this.src=u,this.env=n,this.md=e,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}bu.prototype.pushPending=function(){const u=new B("text","",0);return u.content=this.pending,u.level=this.pendingLevel,this.tokens.push(u),this.pending="",u};bu.prototype.push=function(u,e,n){this.pending&&this.pushPending();const t=new B(u,e,n);let r=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t};bu.prototype.scanDelims=function(u,e){const n=this.posMax,t=this.src.charCodeAt(u),r=u>0?this.src.charCodeAt(u-1):32;let o=u;for(;o<n&&this.src.charCodeAt(o)===t;)o++;const a=o-u,i=o<n?this.src.charCodeAt(o):32,c=du(r)||lu(String.fromCharCode(r)),s=du(i)||lu(String.fromCharCode(i)),f=su(r),l=su(i),p=!l&&(!s||f||c),h=!f&&(!c||l||s);return{can_open:p&&(e||!h||c),can_close:h&&(e||!p||s),length:a}};bu.prototype.Token=B;function ar(u){switch(u){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function cr(u,e){let n=u.pos;for(;n<u.posMax&&!ar(u.src.charCodeAt(n));)n++;return n===u.pos?!1:(e||(u.pending+=u.src.slice(u.pos,n)),u.pos=n,!0)}const sr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function lr(u,e){if(!u.md.options.linkify||u.linkLevel>0)return!1;const n=u.pos,t=u.posMax;if(n+3>t||u.src.charCodeAt(n)!==58||u.src.charCodeAt(n+1)!==47||u.src.charCodeAt(n+2)!==47)return!1;const r=u.pending.match(sr);if(!r)return!1;const o=r[1],a=u.md.linkify.matchAtStart(u.src.slice(n-o.length));if(!a)return!1;let i=a.url;if(i.length<=o.length)return!1;i=i.replace(/\*+$/,"");const c=u.md.normalizeLink(i);if(!u.md.validateLink(c))return!1;if(!e){u.pending=u.pending.slice(0,-o.length);const s=u.push("link_open","a",1);s.attrs=[["href",c]],s.markup="linkify",s.info="auto";const f=u.push("text","",0);f.content=u.md.normalizeLinkText(i);const l=u.push("link_close","a",-1);l.markup="linkify",l.info="auto"}return u.pos+=i.length-o.length,!0}function dr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==10)return!1;const t=u.pending.length-1,r=u.posMax;if(!e)if(t>=0&&u.pending.charCodeAt(t)===32)if(t>=1&&u.pending.charCodeAt(t-1)===32){let o=t-1;for(;o>=1&&u.pending.charCodeAt(o-1)===32;)o--;u.pending=u.pending.slice(0,o),u.push("hardbreak","br",0)}else u.pending=u.pending.slice(0,-1),u.push("softbreak","br",0);else u.push("softbreak","br",0);for(n++;n<r&&C(u.src.charCodeAt(n));)n++;return u.pos=n,!0}const Xu=[];for(let u=0;u<256;u++)Xu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u){Xu[u.charCodeAt(0)]=1});function fr(u,e){let n=u.pos;const t=u.posMax;if(u.src.charCodeAt(n)!==92||(n++,n>=t))return!1;let r=u.src.charCodeAt(n);if(r===10){for(e||u.push("hardbreak","br",0),n++;n<t&&(r=u.src.charCodeAt(n),!!C(r));)n++;return u.pos=n,!0}let o=u.src[n];if(r>=55296&&r<=56319&&n+1<t){const i=u.src.charCodeAt(n+1);i>=56320&&i<=57343&&(o+=u.src[n+1],n++)}const a="\\"+o;if(!e){const i=u.push("text_special","",0);r<256&&Xu[r]!==0?i.content=o:i.content=a,i.markup=a,i.info="escape"}return u.pos=n+1,!0}function hr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==96)return!1;const r=n;n++;const o=u.posMax;for(;n<o&&u.src.charCodeAt(n)===96;)n++;const a=u.src.slice(r,n),i=a.length;if(u.backticksScanned&&(u.backticks[i]||0)<=r)return e||(u.pending+=a),u.pos+=i,!0;let c=n,s;for(;(s=u.src.indexOf("`",c))!==-1;){for(c=s+1;c<o&&u.src.charCodeAt(c)===96;)c++;const f=c-s;if(f===i){if(!e){const l=u.push("code_inline","code",0);l.markup=a,l.content=u.src.slice(n,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return u.pos=c,!0}u.backticks[f]=s}return u.backticksScanned=!0,e||(u.pending+=a),u.pos+=i,!0}function br(u,e){const n=u.pos,t=u.src.charCodeAt(n);if(e||t!==126)return!1;const r=u.scanDelims(u.pos,!0);let o=r.length;const a=String.fromCharCode(t);if(o<2)return!1;let i;o%2&&(i=u.push("text","",0),i.content=a,o--);for(let c=0;c<o;c+=2)i=u.push("text","",0),i.content=a+a,u.delimiters.push({marker:t,length:0,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return u.pos+=r.length,!0}function ge(u,e){let n;const t=[],r=e.length;for(let o=0;o<r;o++){const a=e[o];if(a.marker!==126||a.end===-1)continue;const i=e[a.end];n=u.tokens[a.token],n.type="s_open",n.tag="s",n.nesting=1,n.markup="~~",n.content="",n=u.tokens[i.token],n.type="s_close",n.tag="s",n.nesting=-1,n.markup="~~",n.content="",u.tokens[i.token-1].type==="text"&&u.tokens[i.token-1].content==="~"&&t.push(i.token-1)}for(;t.length;){const o=t.pop();let a=o+1;for(;a<u.tokens.length&&u.tokens[a].type==="s_close";)a++;a--,o!==a&&(n=u.tokens[a],u.tokens[a]=u.tokens[o],u.tokens[o]=n)}}function pr(u){const e=u.tokens_meta,n=u.tokens_meta.length;ge(u,u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&ge(u,e[t].delimiters)}const Ue={tokenize:br,postProcess:pr};function mr(u,e){const n=u.pos,t=u.src.charCodeAt(n);if(e||t!==95&&t!==42)return!1;const r=u.scanDelims(u.pos,t===42);for(let o=0;o<r.length;o++){const a=u.push("text","",0);a.content=String.fromCharCode(t),u.delimiters.push({marker:t,length:r.length,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return u.pos+=r.length,!0}function ke(u,e){const n=e.length;for(let t=n-1;t>=0;t--){const r=e[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const o=e[r.end],a=t>0&&e[t-1].end===r.end+1&&e[t-1].marker===r.marker&&e[t-1].token===r.token-1&&e[r.end+1].token===o.token+1,i=String.fromCharCode(r.marker),c=u.tokens[r.token];c.type=a?"strong_open":"em_open",c.tag=a?"strong":"em",c.nesting=1,c.markup=a?i+i:i,c.content="";const s=u.tokens[o.token];s.type=a?"strong_close":"em_close",s.tag=a?"strong":"em",s.nesting=-1,s.markup=a?i+i:i,s.content="",a&&(u.tokens[e[t-1].token].content="",u.tokens[e[r.end+1].token].content="",t--)}}function gr(u){const e=u.tokens_meta,n=u.tokens_meta.length;ke(u,u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&ke(u,e[t].delimiters)}const Ve={tokenize:mr,postProcess:gr};function kr(u,e){let n,t,r,o,a="",i="",c=u.pos,s=!0;if(u.src.charCodeAt(u.pos)!==91)return!1;const f=u.pos,l=u.posMax,p=u.pos+1,h=u.md.helpers.parseLinkLabel(u,u.pos,!0);if(h<0)return!1;let d=h+1;if(d<l&&u.src.charCodeAt(d)===40){for(s=!1,d++;d<l&&(n=u.src.charCodeAt(d),!(!C(n)&&n!==10));d++);if(d>=l)return!1;if(c=d,r=u.md.helpers.parseLinkDestination(u.src,d,u.posMax),r.ok){for(a=u.md.normalizeLink(r.str),u.md.validateLink(a)?d=r.pos:a="",c=d;d<l&&(n=u.src.charCodeAt(d),!(!C(n)&&n!==10));d++);if(r=u.md.helpers.parseLinkTitle(u.src,d,u.posMax),d<l&&c!==d&&r.ok)for(i=r.str,d=r.pos;d<l&&(n=u.src.charCodeAt(d),!(!C(n)&&n!==10));d++);}(d>=l||u.src.charCodeAt(d)!==41)&&(s=!0),d++}if(s){if(typeof u.env.references>"u")return!1;if(d<l&&u.src.charCodeAt(d)===91?(c=d+1,d=u.md.helpers.parseLinkLabel(u,d),d>=0?t=u.src.slice(c,d++):d=h+1):d=h+1,t||(t=u.src.slice(p,h)),o=u.env.references[vu(t)],!o)return u.pos=f,!1;a=o.href,i=o.title}if(!e){u.pos=p,u.posMax=h;const b=u.push("link_open","a",1),g=[["href",a]];b.attrs=g,i&&g.push(["title",i]),u.linkLevel++,u.md.inline.tokenize(u),u.linkLevel--,u.push("link_close","a",-1)}return u.pos=d,u.posMax=l,!0}function xr(u,e){let n,t,r,o,a,i,c,s,f="";const l=u.pos,p=u.posMax;if(u.src.charCodeAt(u.pos)!==33||u.src.charCodeAt(u.pos+1)!==91)return!1;const h=u.pos+2,d=u.md.helpers.parseLinkLabel(u,u.pos+1,!1);if(d<0)return!1;if(o=d+1,o<p&&u.src.charCodeAt(o)===40){for(o++;o<p&&(n=u.src.charCodeAt(o),!(!C(n)&&n!==10));o++);if(o>=p)return!1;for(s=o,i=u.md.helpers.parseLinkDestination(u.src,o,u.posMax),i.ok&&(f=u.md.normalizeLink(i.str),u.md.validateLink(f)?o=i.pos:f=""),s=o;o<p&&(n=u.src.charCodeAt(o),!(!C(n)&&n!==10));o++);if(i=u.md.helpers.parseLinkTitle(u.src,o,u.posMax),o<p&&s!==o&&i.ok)for(c=i.str,o=i.pos;o<p&&(n=u.src.charCodeAt(o),!(!C(n)&&n!==10));o++);else c="";if(o>=p||u.src.charCodeAt(o)!==41)return u.pos=l,!1;o++}else{if(typeof u.env.references>"u")return!1;if(o<p&&u.src.charCodeAt(o)===91?(s=o+1,o=u.md.helpers.parseLinkLabel(u,o),o>=0?r=u.src.slice(s,o++):o=d+1):o=d+1,r||(r=u.src.slice(h,d)),a=u.env.references[vu(r)],!a)return u.pos=l,!1;f=a.href,c=a.title}if(!e){t=u.src.slice(h,d);const b=[];u.md.inline.parse(t,u.md,u.env,b);const g=u.push("image","img",0),y=[["src",f],["alt",""]];g.attrs=y,g.children=b,g.content=t,c&&y.push(["title",c])}return u.pos=o,u.posMax=p,!0}const yr=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,_r=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function wr(u,e){let n=u.pos;if(u.src.charCodeAt(n)!==60)return!1;const t=u.pos,r=u.posMax;for(;;){if(++n>=r)return!1;const a=u.src.charCodeAt(n);if(a===60)return!1;if(a===62)break}const o=u.src.slice(t+1,n);if(_r.test(o)){const a=u.md.normalizeLink(o);if(!u.md.validateLink(a))return!1;if(!e){const i=u.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=u.push("text","",0);c.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}if(yr.test(o)){const a=u.md.normalizeLink("mailto:"+o);if(!u.md.validateLink(a))return!1;if(!e){const i=u.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=u.push("text","",0);c.content=u.md.normalizeLinkText(o);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=o.length+2,!0}return!1}function Cr(u){return/^<a[>\s]/i.test(u)}function vr(u){return/^<\/a\s*>/i.test(u)}function Dr(u){const e=u|32;return e>=97&&e<=122}function Er(u,e){if(!u.md.options.html)return!1;const n=u.posMax,t=u.pos;if(u.src.charCodeAt(t)!==60||t+2>=n)return!1;const r=u.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!Dr(r))return!1;const o=u.src.slice(t).match(er);if(!o)return!1;if(!e){const a=u.push("html_inline","",0);a.content=o[0],Cr(a.content)&&u.linkLevel++,vr(a.content)&&u.linkLevel--}return u.pos+=o[0].length,!0}const Ar=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Fr=/^&([a-z][a-z0-9]{1,31});/i;function Sr(u,e){const n=u.pos,t=u.posMax;if(u.src.charCodeAt(n)!==38||n+1>=t)return!1;if(u.src.charCodeAt(n+1)===35){const o=u.src.slice(n).match(Ar);if(o){if(!e){const a=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),i=u.push("text_special","",0);i.content=Ku(a)?yu(a):yu(65533),i.markup=o[0],i.info="entity"}return u.pos+=o[0].length,!0}}else{const o=u.src.slice(n).match(Fr);if(o){const a=qe(o[0]);if(a!==o[0]){if(!e){const i=u.push("text_special","",0);i.content=a,i.markup=o[0],i.info="entity"}return u.pos+=o[0].length,!0}}}return!1}function xe(u){const e={},n=u.length;if(!n)return;let t=0,r=-2;const o=[];for(let a=0;a<n;a++){const i=u[a];if(o.push(0),(u[t].marker!==i.marker||r!==i.token-1)&&(t=a),r=i.token,i.length=i.length||0,!i.close)continue;e.hasOwnProperty(i.marker)||(e[i.marker]=[-1,-1,-1,-1,-1,-1]);const c=e[i.marker][(i.open?3:0)+i.length%3];let s=t-o[t]-1,f=s;for(;s>c;s-=o[s]+1){const l=u[s];if(l.marker===i.marker&&l.open&&l.end<0){let p=!1;if((l.close||i.open)&&(l.length+i.length)%3===0&&(l.length%3!==0||i.length%3!==0)&&(p=!0),!p){const h=s>0&&!u[s-1].open?o[s-1]+1:0;o[a]=a-s+h,o[s]=h,i.open=!1,l.end=a,l.close=!1,f=-1,r=-2;break}}}f!==-1&&(e[i.marker][(i.open?3:0)+(i.length||0)%3]=f)}}function Tr(u){const e=u.tokens_meta,n=u.tokens_meta.length;xe(u.delimiters);for(let t=0;t<n;t++)e[t]&&e[t].delimiters&&xe(e[t].delimiters)}function Mr(u){let e,n,t=0;const r=u.tokens,o=u.tokens.length;for(e=n=0;e<o;e++)r[e].nesting<0&&t--,r[e].level=t,r[e].nesting>0&&t++,r[e].type==="text"&&e+1<o&&r[e+1].type==="text"?r[e+1].content=r[e].content+r[e+1].content:(e!==n&&(r[n]=r[e]),n++);e!==n&&(r.length=n)}const Iu=[["text",cr],["linkify",lr],["newline",dr],["escape",fr],["backticks",hr],["strikethrough",Ue.tokenize],["emphasis",Ve.tokenize],["link",kr],["image",xr],["autolink",wr],["html_inline",Er],["entity",Sr]],Ru=[["balance_pairs",Tr],["strikethrough",Ue.postProcess],["emphasis",Ve.postProcess],["fragments_join",Mr]];function pu(){this.ruler=new M;for(let u=0;u<Iu.length;u++)this.ruler.push(Iu[u][0],Iu[u][1]);this.ruler2=new M;for(let u=0;u<Ru.length;u++)this.ruler2.push(Ru[u][0],Ru[u][1])}pu.prototype.skipToken=function(u){const e=u.pos,n=this.ruler.getRules(""),t=n.length,r=u.md.options.maxNesting,o=u.cache;if(typeof o[e]<"u"){u.pos=o[e];return}let a=!1;if(u.level<r){for(let i=0;i<t;i++)if(u.level++,a=n[i](u,!0),u.level--,a){if(e>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}else u.pos=u.posMax;a||u.pos++,o[e]=u.pos};pu.prototype.tokenize=function(u){const e=this.ruler.getRules(""),n=e.length,t=u.posMax,r=u.md.options.maxNesting;for(;u.pos<t;){const o=u.pos;let a=!1;if(u.level<r){for(let i=0;i<n;i++)if(a=e[i](u,!1),a){if(o>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(u.pos>=t)break;continue}u.pending+=u.src[u.pos++]}u.pending&&u.pushPending()};pu.prototype.parse=function(u,e,n,t){const r=new this.State(u,e,n,t);this.tokenize(r);const o=this.ruler2.getRules(""),a=o.length;for(let i=0;i<a;i++)o[i](r)};pu.prototype.State=bu;function zr(u){const e={};u=u||{},e.src_Any=Ie.source,e.src_Cc=Re.source,e.src_Z=Pe.source,e.src_P=Wu.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const n="[><｜]";return e.src_pseudo_letter="(?:(?!"+n+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+n+"|"+e.src_ZPCc+")(?!"+(u["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+n+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(u["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function Hu(u){return Array.prototype.slice.call(arguments,1).forEach(function(n){n&&Object.keys(n).forEach(function(t){u[t]=n[t]})}),u}function Eu(u){return Object.prototype.toString.call(u)}function Ir(u){return Eu(u)==="[object String]"}function Rr(u){return Eu(u)==="[object Object]"}function Br(u){return Eu(u)==="[object RegExp]"}function ye(u){return Eu(u)==="[object Function]"}function Pr(u){return u.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Ze={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Lr(u){return Object.keys(u||{}).reduce(function(e,n){return e||Ze.hasOwnProperty(n)},!1)}const qr={"http:":{validate:function(u,e,n){const t=u.slice(e);return n.re.http||(n.re.http=new RegExp("^\\/\\/"+n.re.src_auth+n.re.src_host_port_strict+n.re.src_path,"i")),n.re.http.test(t)?t.match(n.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(u,e,n){const t=u.slice(e);return n.re.no_http||(n.re.no_http=new RegExp("^"+n.re.src_auth+"(?:localhost|(?:(?:"+n.re.src_domain+")\\.)+"+n.re.src_domain_root+")"+n.re.src_port+n.re.src_host_terminator+n.re.src_path,"i")),n.re.no_http.test(t)?e>=3&&u[e-3]===":"||e>=3&&u[e-3]==="/"?0:t.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(u,e,n){const t=u.slice(e);return n.re.mailto||(n.re.mailto=new RegExp("^"+n.re.src_email_name+"@"+n.re.src_host_strict,"i")),n.re.mailto.test(t)?t.match(n.re.mailto)[0].length:0}}},Or="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Nr="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function $r(u){u.__index__=-1,u.__text_cache__=""}function Gr(u){return function(e,n){const t=e.slice(n);return u.test(t)?t.match(u)[0].length:0}}function _e(){return function(u,e){e.normalize(u)}}function _u(u){const e=u.re=zr(u.__opts__),n=u.__tlds__.slice();u.onCompile(),u.__tlds_replaced__||n.push(Or),n.push(e.src_xn),e.src_tlds=n.join("|");function t(i){return i.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(t(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(t(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(t(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(t(e.tpl_host_fuzzy_test),"i");const r=[];u.__compiled__={};function o(i,c){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+c)}Object.keys(u.__schemas__).forEach(function(i){const c=u.__schemas__[i];if(c===null)return;const s={validate:null,link:null};if(u.__compiled__[i]=s,Rr(c)){Br(c.validate)?s.validate=Gr(c.validate):ye(c.validate)?s.validate=c.validate:o(i,c),ye(c.normalize)?s.normalize=c.normalize:c.normalize?o(i,c):s.normalize=_e();return}if(Ir(c)){r.push(i);return}o(i,c)}),r.forEach(function(i){u.__compiled__[u.__schemas__[i]]&&(u.__compiled__[i].validate=u.__compiled__[u.__schemas__[i]].validate,u.__compiled__[i].normalize=u.__compiled__[u.__schemas__[i]].normalize)}),u.__compiled__[""]={validate:null,normalize:_e()};const a=Object.keys(u.__compiled__).filter(function(i){return i.length>0&&u.__compiled__[i]}).map(Pr).join("|");u.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+a+")","i"),u.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+a+")","ig"),u.re.schema_at_start=RegExp("^"+u.re.schema_search.source,"i"),u.re.pretest=RegExp("("+u.re.schema_test.source+")|("+u.re.host_fuzzy_test.source+")|@","i"),$r(u)}function jr(u,e){const n=u.__index__,t=u.__last_index__,r=u.__text_cache__.slice(n,t);this.schema=u.__schema__.toLowerCase(),this.index=n+e,this.lastIndex=t+e,this.raw=r,this.text=r,this.url=r}function Uu(u,e){const n=new jr(u,e);return u.__compiled__[n.schema].normalize(n,u),n}function I(u,e){if(!(this instanceof I))return new I(u,e);e||Lr(u)&&(e=u,u={}),this.__opts__=Hu({},Ze,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Hu({},qr,u),this.__compiled__={},this.__tlds__=Nr,this.__tlds_replaced__=!1,this.re={},_u(this)}I.prototype.add=function(e,n){return this.__schemas__[e]=n,_u(this),this};I.prototype.set=function(e){return this.__opts__=Hu(this.__opts__,e),this};I.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let n,t,r,o,a,i,c,s,f;if(this.re.schema_test.test(e)){for(c=this.re.schema_search,c.lastIndex=0;(n=c.exec(e))!==null;)if(o=this.testSchemaAt(e,n[2],c.lastIndex),o){this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+o;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(s=e.search(this.re.host_fuzzy_test),s>=0&&(this.__index__<0||s<this.__index__)&&(t=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(a=t.index+t[1].length,(this.__index__<0||a<this.__index__)&&(this.__schema__="",this.__index__=a,this.__last_index__=t.index+t[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(f=e.indexOf("@"),f>=0&&(r=e.match(this.re.email_fuzzy))!==null&&(a=r.index+r[1].length,i=r.index+r[0].length,(this.__index__<0||a<this.__index__||a===this.__index__&&i>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=a,this.__last_index__=i))),this.__index__>=0};I.prototype.pretest=function(e){return this.re.pretest.test(e)};I.prototype.testSchemaAt=function(e,n,t){return this.__compiled__[n.toLowerCase()]?this.__compiled__[n.toLowerCase()].validate(e,t,this):0};I.prototype.match=function(e){const n=[];let t=0;this.__index__>=0&&this.__text_cache__===e&&(n.push(Uu(this,t)),t=this.__last_index__);let r=t?e.slice(t):e;for(;this.test(r);)n.push(Uu(this,t)),r=r.slice(this.__last_index__),t+=this.__last_index__;return n.length?n:null};I.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const n=this.re.schema_at_start.exec(e);if(!n)return null;const t=this.testSchemaAt(e,n[2],n[0].length);return t?(this.__schema__=n[2],this.__index__=n.index+n[1].length,this.__last_index__=n.index+n[0].length+t,Uu(this,0)):null};I.prototype.tlds=function(e,n){return e=Array.isArray(e)?e:[e],n?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(t,r,o){return t!==o[r-1]}).reverse(),_u(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,_u(this),this)};I.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};I.prototype.onCompile=function(){};const X=2147483647,P=36,Yu=1,fu=26,Hr=38,Ur=700,We=72,Je=128,Ke="-",Vr=/^xn--/,Zr=/[^\0-\x7F]/,Wr=/[\x2E\u3002\uFF0E\uFF61]/g,Jr={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Bu=P-Yu,L=Math.floor,Pu=String.fromCharCode;function G(u){throw new RangeError(Jr[u])}function Kr(u,e){const n=[];let t=u.length;for(;t--;)n[t]=e(u[t]);return n}function Qe(u,e){const n=u.split("@");let t="";n.length>1&&(t=n[0]+"@",u=n[1]),u=u.replace(Wr,".");const r=u.split("."),o=Kr(r,e).join(".");return t+o}function Xe(u){const e=[];let n=0;const t=u.length;for(;n<t;){const r=u.charCodeAt(n++);if(r>=55296&&r<=56319&&n<t){const o=u.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}const Qr=u=>String.fromCodePoint(...u),Xr=function(u){return u>=48&&u<58?26+(u-48):u>=65&&u<91?u-65:u>=97&&u<123?u-97:P},we=function(u,e){return u+22+75*(u<26)-((e!=0)<<5)},Ye=function(u,e,n){let t=0;for(u=n?L(u/Ur):u>>1,u+=L(u/e);u>Bu*fu>>1;t+=P)u=L(u/Bu);return L(t+(Bu+1)*u/(u+Hr))},un=function(u){const e=[],n=u.length;let t=0,r=Je,o=We,a=u.lastIndexOf(Ke);a<0&&(a=0);for(let i=0;i<a;++i)u.charCodeAt(i)>=128&&G("not-basic"),e.push(u.charCodeAt(i));for(let i=a>0?a+1:0;i<n;){const c=t;for(let f=1,l=P;;l+=P){i>=n&&G("invalid-input");const p=Xr(u.charCodeAt(i++));p>=P&&G("invalid-input"),p>L((X-t)/f)&&G("overflow"),t+=p*f;const h=l<=o?Yu:l>=o+fu?fu:l-o;if(p<h)break;const d=P-h;f>L(X/d)&&G("overflow"),f*=d}const s=e.length+1;o=Ye(t-c,s,c==0),L(t/s)>X-r&&G("overflow"),r+=L(t/s),t%=s,e.splice(t++,0,r)}return String.fromCodePoint(...e)},en=function(u){const e=[];u=Xe(u);const n=u.length;let t=Je,r=0,o=We;for(const c of u)c<128&&e.push(Pu(c));const a=e.length;let i=a;for(a&&e.push(Ke);i<n;){let c=X;for(const f of u)f>=t&&f<c&&(c=f);const s=i+1;c-t>L((X-r)/s)&&G("overflow"),r+=(c-t)*s,t=c;for(const f of u)if(f<t&&++r>X&&G("overflow"),f===t){let l=r;for(let p=P;;p+=P){const h=p<=o?Yu:p>=o+fu?fu:p-o;if(l<h)break;const d=l-h,b=P-h;e.push(Pu(we(h+d%b,0))),l=L(d/b)}e.push(Pu(we(l,0))),o=Ye(r,s,i===a),r=0,++i}++r,++t}return e.join("")},Yr=function(u){return Qe(u,function(e){return Vr.test(e)?un(e.slice(4).toLowerCase()):e})},u0=function(u){return Qe(u,function(e){return Zr.test(e)?"xn--"+en(e):e})},nn={version:"2.3.1",ucs2:{decode:Xe,encode:Qr},decode:un,encode:en,toASCII:u0,toUnicode:Yr},e0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},n0={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},t0={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},r0={default:e0,zero:n0,commonmark:t0},o0=/^(vbscript|javascript|file|data):/,i0=/^data:image\/(gif|png|jpeg|webp);/;function a0(u){const e=u.trim().toLowerCase();return o0.test(e)?i0.test(e):!0}const tn=["http:","https:","mailto:"];function c0(u){const e=Zu(u,!0);if(e.hostname&&(!e.protocol||tn.indexOf(e.protocol)>=0))try{e.hostname=nn.toASCII(e.hostname)}catch{}return hu(Vu(e))}function s0(u){const e=Zu(u,!0);if(e.hostname&&(!e.protocol||tn.indexOf(e.protocol)>=0))try{e.hostname=nn.toUnicode(e.hostname)}catch{}return Y(Vu(e),Y.defaultChars+"%")}function R(u,e){if(!(this instanceof R))return new R(u,e);e||Ju(u)||(e=u||{},u="default"),this.inline=new pu,this.block=new Du,this.core=new Qu,this.renderer=new tu,this.linkify=new I,this.validateLink=a0,this.normalizeLink=c0,this.normalizeLinkText=s0,this.utils=dt,this.helpers=Cu({},pt),this.options={},this.configure(u),e&&this.set(e)}R.prototype.set=function(u){return Cu(this.options,u),this};R.prototype.configure=function(u){const e=this;if(Ju(u)){const n=u;if(u=r0[n],!u)throw new Error('Wrong `markdown-it` preset "'+n+'", check name')}if(!u)throw new Error("Wrong `markdown-it` preset, can't be empty");return u.options&&e.set(u.options),u.components&&Object.keys(u.components).forEach(function(n){u.components[n].rules&&e[n].ruler.enableOnly(u.components[n].rules),u.components[n].rules2&&e[n].ruler2.enableOnly(u.components[n].rules2)}),this};R.prototype.enable=function(u,e){let n=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.enable(u,!0))},this),n=n.concat(this.inline.ruler2.enable(u,!0));const t=u.filter(function(r){return n.indexOf(r)<0});if(t.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this};R.prototype.disable=function(u,e){let n=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){n=n.concat(this[r].ruler.disable(u,!0))},this),n=n.concat(this.inline.ruler2.disable(u,!0));const t=u.filter(function(r){return n.indexOf(r)<0});if(t.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this};R.prototype.use=function(u){const e=[this].concat(Array.prototype.slice.call(arguments,1));return u.apply(u,e),this};R.prototype.parse=function(u,e){if(typeof u!="string")throw new Error("Input data should be a String");const n=new this.core.State(u,this,e);return this.core.process(n),n.tokens};R.prototype.render=function(u,e){return e=e||{},this.renderer.render(this.parse(u,e),this.options,e)};R.prototype.parseInline=function(u,e){const n=new this.core.State(u,this,e);return n.inlineMode=!0,this.core.process(n),n.tokens};R.prototype.renderInline=function(u,e){return e=e||{},this.renderer.render(this.parseInline(u,e),this.options,e)};function rn(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}var Lu,Ce;function l0(){if(Ce)return Lu;Ce=1;function u(t,r){var o,a,i=t.attrs[t.attrIndex("href")][1];for(o=0;o<r.length;++o){if(a=r[o],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function e(t,r,o){Object.keys(o).forEach(function(a){var i,c=o[a];a==="className"&&(a="class"),i=r[t].attrIndex(a),i<0?r[t].attrPush([a,c]):r[t].attrs[i][1]=c})}function n(t,r){r?r=Array.isArray(r)?r:[r]:r=[],Object.freeze(r);var o=t.renderer.rules.link_open||this.defaultRender;t.renderer.rules.link_open=function(a,i,c,s,f){var l=u(a[i],r),p=l&&l.attrs;return p&&e(i,a,p),o(a,i,c,s,f)}}return n.defaultRender=function(t,r,o,a,i){return i.renderToken(t,r,o)},Lu=n,Lu}var d0=l0();const f0=rn(d0);function h0(u,e,n,t){const r=Number(u[e].meta.id+1).toString();let o="";return typeof t.docId=="string"&&(o=`-${t.docId}-`),o+r}function b0(u,e){let n=Number(u[e].meta.id+1).toString();return u[e].meta.subId>0&&(n+=`:${u[e].meta.subId}`),`[${n}]`}function p0(u,e,n,t,r){const o=r.rules.footnote_anchor_name(u,e,n,t,r),a=r.rules.footnote_caption(u,e,n,t,r);let i=o;return u[e].meta.subId>0&&(i+=`:${u[e].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${i}">${a}</a></sup>`}function m0(u,e,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function g0(){return`</ol>
</section>
`}function k0(u,e,n,t,r){let o=r.rules.footnote_anchor_name(u,e,n,t,r);return u[e].meta.subId>0&&(o+=`:${u[e].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function x0(){return`</li>
`}function y0(u,e,n,t,r){let o=r.rules.footnote_anchor_name(u,e,n,t,r);return u[e].meta.subId>0&&(o+=`:${u[e].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function _0(u){const e=u.helpers.parseLinkLabel,n=u.utils.isSpace;u.renderer.rules.footnote_ref=p0,u.renderer.rules.footnote_block_open=m0,u.renderer.rules.footnote_block_close=g0,u.renderer.rules.footnote_open=k0,u.renderer.rules.footnote_close=x0,u.renderer.rules.footnote_anchor=y0,u.renderer.rules.footnote_caption=b0,u.renderer.rules.footnote_anchor_name=h0;function t(i,c,s,f){const l=i.bMarks[c]+i.tShift[c],p=i.eMarks[c];if(l+4>p||i.src.charCodeAt(l)!==91||i.src.charCodeAt(l+1)!==94)return!1;let h;for(h=l+2;h<p;h++){if(i.src.charCodeAt(h)===32)return!1;if(i.src.charCodeAt(h)===93)break}if(h===l+2||h+1>=p||i.src.charCodeAt(++h)!==58)return!1;if(f)return!0;h++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const d=i.src.slice(l+2,h-2);i.env.footnotes.refs[`:${d}`]=-1;const b=new i.Token("footnote_reference_open","",1);b.meta={label:d},b.level=i.level++,i.tokens.push(b);const g=i.bMarks[c],y=i.tShift[c],m=i.sCount[c],k=i.parentType,x=h,_=i.sCount[c]+h-(i.bMarks[c]+i.tShift[c]);let w=_;for(;h<p;){const T=i.src.charCodeAt(h);if(n(T))T===9?w+=4-w%4:w++;else break;h++}i.tShift[c]=h-x,i.sCount[c]=w-_,i.bMarks[c]=x,i.blkIndent+=4,i.parentType="footnote",i.sCount[c]<i.blkIndent&&(i.sCount[c]+=i.blkIndent),i.md.block.tokenize(i,c,s,!0),i.parentType=k,i.blkIndent-=4,i.tShift[c]=y,i.sCount[c]=m,i.bMarks[c]=g;const D=new i.Token("footnote_reference_close","",-1);return D.level=--i.level,i.tokens.push(D),!0}function r(i,c){const s=i.posMax,f=i.pos;if(f+2>=s||i.src.charCodeAt(f)!==94||i.src.charCodeAt(f+1)!==91)return!1;const l=f+2,p=e(i,f+1);if(p<0)return!1;if(!c){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const h=i.env.footnotes.list.length,d=[];i.md.inline.parse(i.src.slice(l,p),i.md,i.env,d);const b=i.push("footnote_ref","",0);b.meta={id:h},i.env.footnotes.list[h]={content:i.src.slice(l,p),tokens:d}}return i.pos=p+1,i.posMax=s,!0}function o(i,c){const s=i.posMax,f=i.pos;if(f+3>s||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(f)!==91||i.src.charCodeAt(f+1)!==94)return!1;let l;for(l=f+2;l<s;l++){if(i.src.charCodeAt(l)===32||i.src.charCodeAt(l)===10)return!1;if(i.src.charCodeAt(l)===93)break}if(l===f+2||l>=s)return!1;l++;const p=i.src.slice(f+2,l-1);if(typeof i.env.footnotes.refs[`:${p}`]>"u")return!1;if(!c){i.env.footnotes.list||(i.env.footnotes.list=[]);let h;i.env.footnotes.refs[`:${p}`]<0?(h=i.env.footnotes.list.length,i.env.footnotes.list[h]={label:p,count:0},i.env.footnotes.refs[`:${p}`]=h):h=i.env.footnotes.refs[`:${p}`];const d=i.env.footnotes.list[h].count;i.env.footnotes.list[h].count++;const b=i.push("footnote_ref","",0);b.meta={id:h,subId:d,label:p}}return i.pos=l,i.posMax=s,!0}function a(i){let c,s,f,l=!1;const p={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(d){return d.type==="footnote_reference_open"?(l=!0,s=[],f=d.meta.label,!1):d.type==="footnote_reference_close"?(l=!1,p[":"+f]=s,!1):(l&&s.push(d),!l)}),!i.env.footnotes.list))return;const h=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let d=0,b=h.length;d<b;d++){const g=new i.Token("footnote_open","",1);if(g.meta={id:d,label:h[d].label},i.tokens.push(g),h[d].tokens){c=[];const k=new i.Token("paragraph_open","p",1);k.block=!0,c.push(k);const x=new i.Token("inline","",0);x.children=h[d].tokens,x.content=h[d].content,c.push(x);const _=new i.Token("paragraph_close","p",-1);_.block=!0,c.push(_)}else h[d].label&&(c=p[`:${h[d].label}`]);c&&(i.tokens=i.tokens.concat(c));let y;i.tokens[i.tokens.length-1].type==="paragraph_close"?y=i.tokens.pop():y=null;const m=h[d].count>0?h[d].count:1;for(let k=0;k<m;k++){const x=new i.Token("footnote_anchor","",0);x.meta={id:d,subId:k,label:h[d].label},i.tokens.push(x)}y&&i.tokens.push(y),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}u.block.ruler.before("reference","footnote_def",t,{alt:["paragraph","reference"]}),u.inline.ruler.after("image","footnote_inline",r),u.inline.ruler.after("footnote_inline","footnote_ref",o),u.core.ruler.after("inline","footnote_tail",a)}var qu,ve;function w0(){if(ve)return qu;ve=1;var u=!0,e=!1,n=!1;qu=function(b,g){g&&(u=!g.enabled,e=!!g.label,n=!!g.labelAfter),b.core.ruler.after("inline","github-task-lists",function(y){for(var m=y.tokens,k=2;k<m.length;k++)o(m,k)&&(a(m[k],y.Token),t(m[k-2],"class","task-list-item"+(u?"":" enabled")),t(m[r(m,k-2)],"class","contains-task-list"))})};function t(b,g,y){var m=b.attrIndex(g),k=[g,y];m<0?b.attrPush(k):b.attrs[m]=k}function r(b,g){for(var y=b[g].level-1,m=g-1;m>=0;m--)if(b[m].level===y)return m;return-1}function o(b,g){return l(b[g])&&p(b[g-1])&&h(b[g-2])&&d(b[g])}function a(b,g){if(b.children.unshift(i(b,g)),b.children[1].content=b.children[1].content.slice(3),b.content=b.content.slice(3),e)if(n){b.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);b.children[0].content=b.children[0].content.slice(0,-1)+' id="'+y+'">',b.children.push(f(b.content,y,g))}else b.children.unshift(c(g)),b.children.push(s(g))}function i(b,g){var y=new g("html_inline","",0),m=u?' disabled="" ':"";return b.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+m+'type="checkbox">':(b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+m+'type="checkbox">'),y}function c(b){var g=new b("html_inline","",0);return g.content="<label>",g}function s(b){var g=new b("html_inline","",0);return g.content="</label>",g}function f(b,g,y){var m=new y("html_inline","",0);return m.content='<label class="task-list-item-label" for="'+g+'">'+b+"</label>",m.attrs=[{for:g}],m}function l(b){return b.type==="inline"}function p(b){return b.type==="paragraph_open"}function h(b){return b.type==="list_item_open"}function d(b){return b.content.indexOf("[ ] ")===0||b.content.indexOf("[x] ")===0||b.content.indexOf("[X] ")===0}return qu}var C0=w0();const v0=rn(C0),on=`.markdown-body {
  --base-size-4: 0.25rem;
  --base-size-8: 0.5rem;
  --base-size-16: 1rem;
  --base-size-24: 1.5rem;
  --base-size-40: 2.5rem;
  --base-text-weight-normal: 400;
  --base-text-weight-medium: 500;
  --base-text-weight-semibold: 600;
  --fontStack-monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  --fgColor-accent: Highlight;
}
@media (prefers-color-scheme: dark) {
  .markdown-body, [data-theme="dark"] {
    /* dark */
    color-scheme: dark;
    --focus-outlineColor: #1f6feb;
    --fgColor-default: #f0f6fc;
    --fgColor-muted: #9198a1;
    --fgColor-accent: #4493f8;
    --fgColor-success: #3fb950;
    --fgColor-attention: #d29922;
    --fgColor-danger: #f85149;
    --fgColor-done: #ab7df8;
    --bgColor-default: #0d1117;
    --bgColor-muted: #151b23;
    --bgColor-neutral-muted: #656c7633;
    --bgColor-attention-muted: #bb800926;
    --borderColor-default: #3d444d;
    --borderColor-muted: #3d444db3;
    --borderColor-neutral-muted: #3d444db3;
    --borderColor-accent-emphasis: #1f6feb;
    --borderColor-success-emphasis: #238636;
    --borderColor-attention-emphasis: #9e6a03;
    --borderColor-danger-emphasis: #da3633;
    --borderColor-done-emphasis: #8957e5;
    --color-prettylights-syntax-comment: #9198a1;
    --color-prettylights-syntax-constant: #79c0ff;
    --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
    --color-prettylights-syntax-entity: #d2a8ff;
    --color-prettylights-syntax-storage-modifier-import: #f0f6fc;
    --color-prettylights-syntax-entity-tag: #7ee787;
    --color-prettylights-syntax-keyword: #ff7b72;
    --color-prettylights-syntax-string: #a5d6ff;
    --color-prettylights-syntax-variable: #ffa657;
    --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
    --color-prettylights-syntax-brackethighlighter-angle: #9198a1;
    --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
    --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
    --color-prettylights-syntax-carriage-return-text: #f0f6fc;
    --color-prettylights-syntax-carriage-return-bg: #b62324;
    --color-prettylights-syntax-string-regexp: #7ee787;
    --color-prettylights-syntax-markup-list: #f2cc60;
    --color-prettylights-syntax-markup-heading: #1f6feb;
    --color-prettylights-syntax-markup-italic: #f0f6fc;
    --color-prettylights-syntax-markup-bold: #f0f6fc;
    --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
    --color-prettylights-syntax-markup-deleted-bg: #67060c;
    --color-prettylights-syntax-markup-inserted-text: #aff5b4;
    --color-prettylights-syntax-markup-inserted-bg: #033a16;
    --color-prettylights-syntax-markup-changed-text: #ffdfb6;
    --color-prettylights-syntax-markup-changed-bg: #5a1e02;
    --color-prettylights-syntax-markup-ignored-text: #f0f6fc;
    --color-prettylights-syntax-markup-ignored-bg: #1158c7;
    --color-prettylights-syntax-meta-diff-range: #d2a8ff;
    --color-prettylights-syntax-sublimelinter-gutter-mark: #3d444d;
  }
}
@media (prefers-color-scheme: light) {
  .markdown-body, [data-theme="light"] {
    /* light */
    color-scheme: light;
    --focus-outlineColor: #0969da;
    --fgColor-default: #1f2328;
    --fgColor-muted: #59636e;
    --fgColor-accent: #0969da;
    --fgColor-success: #1a7f37;
    --fgColor-attention: #9a6700;
    --fgColor-danger: #d1242f;
    --fgColor-done: #8250df;
    --bgColor-default: #ffffff;
    --bgColor-muted: #f6f8fa;
    --bgColor-neutral-muted: #818b981f;
    --bgColor-attention-muted: #fff8c5;
    --borderColor-default: #d1d9e0;
    --borderColor-muted: #d1d9e0b3;
    --borderColor-neutral-muted: #d1d9e0b3;
    --borderColor-accent-emphasis: #0969da;
    --borderColor-success-emphasis: #1a7f37;
    --borderColor-attention-emphasis: #9a6700;
    --borderColor-danger-emphasis: #cf222e;
    --borderColor-done-emphasis: #8250df;
    --color-prettylights-syntax-comment: #59636e;
    --color-prettylights-syntax-constant: #0550ae;
    --color-prettylights-syntax-constant-other-reference-link: #0a3069;
    --color-prettylights-syntax-entity: #6639ba;
    --color-prettylights-syntax-storage-modifier-import: #1f2328;
    --color-prettylights-syntax-entity-tag: #0550ae;
    --color-prettylights-syntax-keyword: #cf222e;
    --color-prettylights-syntax-string: #0a3069;
    --color-prettylights-syntax-variable: #953800;
    --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
    --color-prettylights-syntax-brackethighlighter-angle: #59636e;
    --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
    --color-prettylights-syntax-invalid-illegal-bg: #82071e;
    --color-prettylights-syntax-carriage-return-text: #f6f8fa;
    --color-prettylights-syntax-carriage-return-bg: #cf222e;
    --color-prettylights-syntax-string-regexp: #116329;
    --color-prettylights-syntax-markup-list: #3b2300;
    --color-prettylights-syntax-markup-heading: #0550ae;
    --color-prettylights-syntax-markup-italic: #1f2328;
    --color-prettylights-syntax-markup-bold: #1f2328;
    --color-prettylights-syntax-markup-deleted-text: #82071e;
    --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
    --color-prettylights-syntax-markup-inserted-text: #116329;
    --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
    --color-prettylights-syntax-markup-changed-text: #953800;
    --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
    --color-prettylights-syntax-markup-ignored-text: #d1d9e0;
    --color-prettylights-syntax-markup-ignored-bg: #0550ae;
    --color-prettylights-syntax-meta-diff-range: #8250df;
    --color-prettylights-syntax-sublimelinter-gutter-mark: #818b98;
  }
}

.markdown-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: var(--fgColor-default);
  background-color: var(--bgColor-default);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
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
  background-color: transparent;
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
  background: transparent;
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
  outline: solid 1px transparent;
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
  background-color: transparent;
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
  background-color: transparent;
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
  background: transparent;
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
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
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

.markdown-body body:has(:modal) {
  padding-right: var(--dialog-scrollgutter) !important;
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
  clip: auto;
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
`,ue={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},D0=ru(z.MarkEdit.userSettings),Au=ru(D0[ue.rootValueKey]),an=ru(Au.changeMode),cn=ru(Au.markdownIt),E0=sn(Au.autoUpdate),A0=sn(Au.syncScroll),F0=an.modes??ue.defaultModes,De=ru(an.hotKey),S0=cn.preset??ue.defaultPreset,T0=ru(cn.options);function ru(u,e={}){return u??e}function sn(u,e=!0){return u??e}function M0(u,e=!0){return eu.render(u,{lineInfo:e})}function z0(u){u()}async function I0(u){const e=t=>`<style>
${t}
</style>`;return[`<div class="markdown-body">
${u}
</div>`,e(on)].join(`
`)}const eu=R(S0,{html:!0,breaks:!0,linkify:!0,...T0});eu.use(f0,{attrs:{target:"_blank",rel:"noopener"}});eu.use(_0);eu.use(v0);const R0=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block"]);for(const u of R0){const e=eu.renderer.rules[u];eu.renderer.rules[u]=(n,t,r,o,a)=>{const i=n[t];return o.lineInfo&&i.map&&i.map.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),e?e(n,t,r,o,a):a.renderToken(n,t,r)}}const B0=new DOMParser,P0="image-loader";function L0(u){const e=B0.parseFromString(u,"text/html");return e.querySelectorAll("img").forEach(t=>{const r=t.getAttribute("src");r!==null&&(r.includes("://")||r.startsWith("data:image/")||(t.src=`${P0}://${r}`))}),e.body.innerHTML}const q0={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",untitled:"Untitled",version:"Version",checkReleases:"Check Releases",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",copyHtml:"复制 HTML",copyRichText:"复制富文本",untitled:"未命名",version:"版本",checkReleases:"查看版本",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",version:"版本",checkReleases:"檢視版本",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本"}};function A(u){return N0[u]}const O0=["default","zh-CN","zh-TW"],N0=q0[(()=>{const u=navigator.language;return O0.includes(u)?u:"default"})()];function $0(u,e){A0&&u.addEventListener("scroll",()=>{Ou.scrollUpdater!==void 0&&clearTimeout(Ou.scrollUpdater),Ou.scrollUpdater=setTimeout(()=>{ln(u,e)},100)})}function ln(u,e,n=!0){const{line:t,progress:r}=G0(u);j0(e,t,r,n)}function G0(u,e=0){const n=z.MarkEdit.editorView,t=n.lineBlockAtHeight(u.scrollTop+e),r=n.state.doc.lineAt(t.from).number-1,o=Cn(n.domAtPos(t.from).node);if(o===null)return{line:r,progress:0};const a=u.getBoundingClientRect(),i=o.getBoundingClientRect(),c=a.top-i.top-e,s=dn(c/i.height);return{line:r,progress:s}}function j0(u,e,n,t=!0){const r=Array.from(document.querySelectorAll("[data-line-from]")),o=Ee(r,e);if(o!==void 0){const{from:a,to:i}=Me(o);return re(u,o,H0(e,n,a,i),t)}if(e===0)return ze(u,0,t);for(const a of[e-1,e+1,e-2,e+2]){const i=Ee(r,a);if(i!==void 0){const c=a<e?1:0;return re(u,i,c,t)}}}function Ee(u,e){return u.find(n=>{const{from:t,to:r}=Me(n);return e>=t&&e<=r})}function H0(u,e,n,t){const r=t-n;if(r<1)return u===n?e:0;const o=u-n+e;return dn(o/r)}function dn(u){return Math.max(0,Math.min(1,u))}const Ou={scrollUpdater:void 0};var Nu=function(u,e){return Number(u.slice(0,-1*e.length))},U0=function(u){return u.endsWith("px")?{value:u,type:"px",numeric:Nu(u,"px")}:u.endsWith("fr")?{value:u,type:"fr",numeric:Nu(u,"fr")}:u.endsWith("%")?{value:u,type:"%",numeric:Nu(u,"%")}:u==="auto"?{value:u,type:"auto"}:null},fn=function(u){return u.split(" ").map(U0)},V0=function(u,e,n,t){n===void 0&&(n=0),t===void 0&&(t=!1);var r=t?u+1:u,o=e.slice(0,r).reduce(function(i,c){return i+c.numeric},0),a=n?u*n:0;return o+a},hn=function(u,e,n){return e.concat(n).map(function(t){return t.style[u]}).filter(function(t){return t!==void 0&&t!==""})},Z0=function(u,e){return e.endsWith(u)?Number(e.slice(0,-1*u.length)):null},Ae=function(u){for(var e=0;e<u.length;e++)if(u[e].numeric>0)return e;return null},Z=function(){return!1},W0=function(u,e,n){u.style[e]=n},v=function(u,e,n){var t=u[e];return t!==void 0?t:n};function bn(u){var e;return(e=[]).concat.apply(e,Array.from(u.ownerDocument.styleSheets).map(function(n){var t=[];try{t=Array.from(n.cssRules||[])}catch{}return t})).filter(function(n){var t=!1;try{t=u.matches(n.selectorText)}catch{}return t})}var J0="grid-template-columns",K0="grid-template-rows",S=function(e,n,t){this.direction=e,this.element=n.element,this.track=n.track,e==="column"?(this.gridTemplateProp=J0,this.gridGapProp="grid-column-gap",this.cursor=v(t,"columnCursor",v(t,"cursor","col-resize")),this.snapOffset=v(t,"columnSnapOffset",v(t,"snapOffset",30)),this.dragInterval=v(t,"columnDragInterval",v(t,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=v(t,"gridTemplateColumns")):e==="row"&&(this.gridTemplateProp=K0,this.gridGapProp="grid-row-gap",this.cursor=v(t,"rowCursor",v(t,"cursor","row-resize")),this.snapOffset=v(t,"rowSnapOffset",v(t,"snapOffset",30)),this.dragInterval=v(t,"rowDragInterval",v(t,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=v(t,"gridTemplateRows")),this.onDragStart=v(t,"onDragStart",Z),this.onDragEnd=v(t,"onDragEnd",Z),this.onDrag=v(t,"onDrag",Z),this.writeStyle=v(t,"writeStyle",W0),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=n.minSizeStart,this.minSizeEnd=n.minSizeEnd,n.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};S.prototype.getDimensions=function(){var e=this.grid.getBoundingClientRect(),n=e.width,t=e.height,r=e.top,o=e.bottom,a=e.left,i=e.right;this.direction==="column"?(this.start=r,this.end=o,this.size=t):this.direction==="row"&&(this.start=a,this.end=i,this.size=n)};S.prototype.getSizeAtTrack=function(e,n){return V0(e,this.computedPixels,this.computedGapPixels,n)};S.prototype.getSizeOfTrack=function(e){return this.computedPixels[e].numeric};S.prototype.getRawTracks=function(){var e=hn(this.gridTemplateProp,[this.grid],bn(this.grid));if(!e.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return e[0]};S.prototype.getGap=function(){var e=hn(this.gridGapProp,[this.grid],bn(this.grid));return e.length?e[0]:null};S.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};S.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};S.prototype.setTracks=function(e){this.tracks=e.split(" "),this.trackValues=fn(e)};S.prototype.setComputedTracks=function(e){this.computedTracks=e.split(" "),this.computedPixels=fn(e)};S.prototype.setGap=function(e){this.gap=e};S.prototype.setComputedGap=function(e){this.computedGap=e,this.computedGapPixels=Z0("px",this.computedGap)||0};S.prototype.getMousePosition=function(e){return"touches"in e?e.touches[0][this.clientAxis]:e[this.clientAxis]};S.prototype.startDragging=function(e){if(!("button"in e&&e.button!==0)){e.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=e.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var n=this.trackValues.filter(function(i){return i.type==="%"}),t=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=t.length,this.totalFrs){var r=Ae(t);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/t[r].numeric)}if(n.length){var o=Ae(n);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/n[o].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(e)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Z),this.grid.addEventListener("dragstart",Z),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};S.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};S.prototype.drag=function(e){var n=this.getMousePosition(e),t=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(t-this.dragStartOffset),a=r+this.snapOffset,i=o-this.snapOffset;n<a&&(n=r),n>i&&(n=o),n<r?n=r:n>o&&(n=o);var c=n-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,s=this.bTrackEnd-n+this.dragStartOffset-t-this.computedGapPixels;if(this.dragInterval>1){var f=Math.round(c/this.dragInterval)*this.dragInterval;s-=f-c,c=f}if(c<this.minSizeStart&&(c=this.minSizeStart),s<this.minSizeEnd&&(s=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=c+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var l=c/this.frToPixels;this.tracks[this.aTrack]=l+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var p=c/this.percentageToPixels;this.tracks[this.aTrack]=p+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=s+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=s/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var d=s/this.percentageToPixels;this.tracks[this.bTrack]=d+"%"}var b=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,b),this.onDrag(this.direction,this.track,b)};S.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Z),this.grid.removeEventListener("dragstart",Z),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};S.prototype.destroy=function(e,n){e===void 0&&(e=!0),e||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),n&&n()):(this.needsDestroy=!0,n&&(this.destroyCb=n))};var Fe=function(u,e,n){return e in u?u[e]:n},nu=function(u,e){return function(n){if(n.track<1)throw Error("Invalid track index: "+n.track+". Track must be between two other tracks.");var t=u==="column"?e.columnMinSizes||{}:e.rowMinSizes||{},r=u==="column"?"columnMinSize":"rowMinSize";return new S(u,Object.assign({},{minSizeStart:Fe(t,n.track-1,v(e,r,v(e,"minSize",0))),minSizeEnd:Fe(t,n.track+1,v(e,r,v(e,"minSize",0)))},n),e)}},J=function(e){var n=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:e.columnGutters||[],rowGutters:e.rowGutters||[],columnMinSizes:e.columnMinSizes||{},rowMinSizes:e.rowMinSizes||{}},e),this.options.columnGutters.forEach(function(t){n.columnGutters[t.track]=nu("column",n.options)(t)}),this.options.rowGutters.forEach(function(t){n.rowGutters[t.track]=nu("row",n.options)(t)})};J.prototype.addColumnGutter=function(e,n){this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=nu("column",this.options)({element:e,track:n})};J.prototype.addRowGutter=function(e,n){this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=nu("row",this.options)({element:e,track:n})};J.prototype.removeColumnGutter=function(e,n){var t=this;n===void 0&&(n=!0),this.columnGutters[e]&&this.columnGutters[e].destroy(n,function(){delete t.columnGutters[e]})};J.prototype.removeRowGutter=function(e,n){var t=this;n===void 0&&(n=!0),this.rowGutters[e]&&this.rowGutters[e].destroy(n,function(){delete t.rowGutters[e]})};J.prototype.handleDragStart=function(e,n,t){n==="column"?(this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=nu("column",this.options)({track:t}),this.columnGutters[t].startDragging(e)):n==="row"&&(this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=nu("row",this.options)({track:t}),this.rowGutters[t].startDragging(e))};J.prototype.destroy=function(e){var n=this;e===void 0&&(e=!0),Object.keys(this.columnGutters).forEach(function(t){return n.columnGutters[t].destroy(e,function(){delete n.columnGutters[t]})}),Object.keys(this.rowGutters).forEach(function(t){return n.rowGutters[t].destroy(e,function(){delete n.rowGutters[t]})})};function Q0(u){return new J(u)}const X0=`.cm-focused {
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
`,wu=document.body,au=document.createElement("div"),q=document.createElement("div"),Se=Gu("* { cursor: col-resize }",!1);var ku=(u=>(u[u.edit=0]="edit",u[u.sideBySide=1]="sideBySide",u[u.preview=2]="preview",u))(ku||{});function Y0(){Gu(X0),Gu(on);const u=document.createElement("div");u.className=W.dividerViewClass,au.appendChild(u),au.className=W.gutterViewClass,wu.appendChild(au),q.className=W.previewPaneClass,wu.appendChild(q),document.addEventListener("keydown",t=>{t.metaKey&&t.key==="a"&&document.activeElement!==z.MarkEdit.editorView.contentDOM&&vn(q)}),new MutationObserver(Te).observe(q,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Te)}function ee(u,e=!0){const n=V.viewMode;V.viewMode=u,u!==n&&localStorage.setItem(W.viewModeCacheKey,String(u));const t=z.MarkEdit.editorView;u===0?t.focus():u===2&&t.contentDOM.blur(),u===1?(wu.classList.add(W.containerClass),V.splitter=Q0({columnGutters:[{track:1,element:au}],minSize:150,onDragStart:()=>Se.disabled=!1,onDragEnd:()=>Se.disabled=!0})):(wu.classList.remove(W.containerClass),V.splitter?.destroy()),u===2?q.classList.add("overlay"):q.classList.remove("overlay"),e&&ne()}function uo(){const u=[0,...F0.map(t=>{switch(t){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(t=>t!==void 0)],e=u.indexOf(V.viewMode),n=e===-1?0:(e+1)%u.length;ee(u[n])}function eo(){const u=localStorage.getItem(W.viewModeCacheKey);u!==null&&ee(Number(u),!1)}function no(){return V.viewMode}function ne(){if(V.viewMode===0)return;const u=L0(Fu());q.innerHTML=u,z0(()=>ln(pn(),mn(),!1))}function to(){gn(!1)}function ro(){gn(!0)}async function oo(){const u=Fu(!1);await navigator.clipboard.writeText(u)}async function io(){const u=new ClipboardItem({"text/html":new Blob([Fu(!1)],{type:"text/html"}),"text/plain":new Blob([q.innerText],{type:"text/plain"})});await navigator.clipboard.write([u])}function pn(){return z.MarkEdit.editorView.scrollDOM}function mn(){return q}function Fu(u=!0){const e=z.MarkEdit.editorAPI.getText();return M0(e,u)}function Te(){const u=getComputedStyle(q).backgroundColor;au.style.background=`linear-gradient(to right, transparent 50%, ${u} 50%)`}async function gn(u){const e=await(async()=>{const t=await z.MarkEdit.getFileInfo();return t===void 0?`${A("untitled")}.html`:`${wn(t.filePath)}.html`})(),n=await(async()=>{const t=Fu(!1);return u?await I0(t):t})();z.MarkEdit.showSavePanel({fileName:e,string:n})}const W={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",viewModeCacheKey:"ui.view-mode"},V={viewMode:0,splitter:void 0};async function ao(){if(!E0)return;const u=Date.now(),e=Number(localStorage.getItem(iu.lastCheckCacheKey)??"0");if(u-e<2592e5)return;localStorage.setItem(iu.lastCheckCacheKey,String(u));const t=await(await fetch(iu.latestReleaseURL)).json();if(t.name==="1.0.0")return;const r=new Set(JSON.parse(localStorage.getItem(iu.skippedCacheKey)??"[]"));if(r.has(t.name))return;const o=[A("viewReleasePage"),A("remindMeLater"),A("skipThisVersion")],a=await z.MarkEdit.showAlert({title:`MarkEdit-preview ${t.name} ${A("newVersionAvailable")}`,message:t.body,buttons:o});a===o.indexOf(A("viewReleasePage"))&&open(t.html_url),a===o.indexOf(A("skipThisVersion"))&&(r.add(t.name),localStorage.setItem(iu.skippedCacheKey,JSON.stringify([...r])))}const iu={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"};Y0();setTimeout(ao,4e3);z.MarkEdit.addMainMenuItem({title:A("viewMode"),children:[{title:A("changeMode"),action:uo,key:De.key??"V",modifiers:De.modifiers??["Command"]},{separator:!0},$u(A("editMode"),ku.edit),$u(A("sideBySideMode"),ku.sideBySide),$u(A("previewMode"),ku.preview),{separator:!0},...co(),{separator:!0},{title:`${A("version")} 1.0.0`},{title:`${A("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")}]});z.MarkEdit.addExtension(_n.EditorView.updateListener.of(u=>{u.docChanged&&(cu.renderUpdater!==void 0&&clearTimeout(cu.renderUpdater),cu.renderUpdater=setTimeout(ne,500))}));z.MarkEdit.onEditorReady(()=>{cu.isInitiating&&(cu.isInitiating=!1,eo()),ne(),$0(pn(),mn())});function $u(u,e){return{title:u,action:()=>ee(e),state:()=>({isSelected:no()===e})}}function co(){const u=[{title:A("copyHtml"),action:oo},{title:A("copyRichText"),action:io}];return typeof z.MarkEdit.showSavePanel>"u"?u:[{title:A("saveCleanHtml"),action:to},{title:A("saveStyledHtml"),action:ro},...u]}const cu={isInitiating:!0,renderUpdater:void 0};
