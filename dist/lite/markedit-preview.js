"use strict";(()=>{let e=globalThis;if(typeof e.require>`u`){let t={MarkEdit:e.MarkEdit??Object.freeze({})},n={of:()=>({})},r=()=>({range:()=>({})});class i{}let a={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:n,mouseSelectionStyle:n,editorAttributes:n,baseTheme:()=>({})},Decoration:{mark:r,line:r},ViewPlugin:{fromClass:()=>({})},WidgetType:i,RectangleMarker:i,layer:()=>({})},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}},Facet:{define:()=>n},StateField:{define:()=>({})}}};e.require=e=>a[e]??{}}})();var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,o)=>(o=n==null?{}:e(i(n)),l(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));let d=require("@codemirror/view"),f=require("markedit-api"),p=require("@codemirror/state"),m=require("@codemirror/language"),h=require("@lezer/highlight"),g=require("@lezer/lr");require("@lezer/common");function _(){typeof f.MarkEdit.playSystemBeep==`function`&&f.MarkEdit.playSystemBeep()}function v(){let e=navigator.userAgent.match(/macOS\/(\d+)/);return e!==null&&parseInt(e[1])>=26}function y(e,t=!0){let n=document.createElement(`style`);return n.textContent=e,document.head.appendChild(n),n.disabled=!t,n}function b(e){return(e?.match(/--bgColor-default:\s*([^;]+);/))?.[1]?.trim()}function ee(e){return(e.split(`/`).pop()??e).split(`.`).slice(0,-1).join(`.`)}function te(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(`.cm-line`)}function x(e){return{from:parseInt(e.dataset.lineFrom??`0`),to:parseInt(e.dataset.lineTo??`0`)}}function ne(e,t){let n=0,r=t;for(;r!==null&&r!==e;)n+=r.offsetTop,r=r.offsetParent;return n}function S(e,t,n,r=!0){re(e,ne(e,t)+t.offsetHeight*n,r)}function re(e,t,n=!0){let r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:t<=r?0:t,behavior:n?`smooth`:`instant`})}function ie(e){let t=document.createRange();t.selectNodeContents(e);let n=getSelection();n?.removeAllRanges(),n?.addRange(t)}function ae(e){return!/^(https?:)?\/\//.test(e)&&/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function oe(e,t){return e.endsWith(`/`)?e+t:e+`/`+t}async function se(e){let t=await f.MarkEdit.getFileContent(e);if(t===void 0)return{};try{let e=JSON.parse(t);return typeof e==`object`&&e?e:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}function ce(e,t){return navigator.clipboard.write([e]).catch(e=>{console.error(`Failed to copy:`,e),f.MarkEdit.showAlert(t)})}function le(e){let t=document.createElement(`div`);t.style.cssText=`position: fixed; left: -10000px; top: 0;`,t.innerHTML=e,document.body.appendChild(t);try{return t.innerText}finally{t.remove()}}var ue=o((()=>{}));function de(e){let t=pe[e];if(t)return t;t=pe[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);t.push(n)}for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[r]=`%`+(`0`+r.toString(16).toUpperCase()).slice(-2)}return t}function fe(e,t){typeof t!=`string`&&(t=fe.defaultChars);let n=de(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(e){let t=``;for(let r=0,i=e.length;r<i;r+=3){let a=parseInt(e.slice(r+1,r+3),16);if(a<128){t+=n[a];continue}if((a&224)==192&&r+3<i){let n=parseInt(e.slice(r+4,r+6),16);if((n&192)==128){let e=a<<6&1984|n&63;t+=e<128?`��`:String.fromCharCode(e),r+=3;continue}}if((a&240)==224&&r+6<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16);if((n&192)==128&&(i&192)==128){let e=a<<12&61440|n<<6&4032|i&63;t+=e<2048||e>=55296&&e<=57343?`���`:String.fromCharCode(e),r+=6;continue}}if((a&248)==240&&r+9<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16),o=parseInt(e.slice(r+10,r+12),16);if((n&192)==128&&(i&192)==128&&(o&192)==128){let e=a<<18&1835008|n<<12&258048|i<<6&4032|o&63;e<65536||e>1114111?t+=`����`:(e-=65536,t+=String.fromCharCode(55296+(e>>10),56320+(e&1023))),r+=9;continue}}t+=`�`}return t})}var pe,me=o((()=>{pe={},fe.defaultChars=`;/?:@&=+$,#`,fe.componentChars=``}));function he(e){let t=C[e];if(t)return t;t=C[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);/^[0-9a-z]$/i.test(n)?t.push(n):t.push(`%`+(`0`+e.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function ge(e,t,n){typeof t!=`string`&&(n=t,t=ge.defaultChars),n===void 0&&(n=!0);let r=he(t),i=``;for(let t=0,a=e.length;t<a;t++){let o=e.charCodeAt(t);if(n&&o===37&&t+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3))){i+=e.slice(t,t+3),t+=2;continue}if(o<128){i+=r[o];continue}if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&t+1<a){let n=e.charCodeAt(t+1);if(n>=56320&&n<=57343){i+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}i+=`%EF%BF%BD`;continue}i+=encodeURIComponent(e[t])}return i}var C,_e=o((()=>{C={},ge.defaultChars=`;/?:@&=+$,-_.!~*'()#`,ge.componentChars=`-_.!~*'()`}));function ve(e){let t=``;return t+=e.protocol||``,t+=e.slashes?`//`:``,t+=e.auth?e.auth+`@`:``,e.hostname&&e.hostname.indexOf(`:`)!==-1?t+=`[`+e.hostname+`]`:t+=e.hostname||``,t+=e.port?`:`+e.port:``,t+=e.pathname||``,t+=e.search||``,t+=e.hash||``,t}var ye=o((()=>{}));function be(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function xe(e,t){if(e&&e instanceof be)return e;let n=new be;return n.parse(e,t),n}var Se,Ce,we,Te,w,Ee,T,De,Oe,ke,Ae,je,Me=o((()=>{Se=/^([a-z0-9.+-]+:)/i,Ce=/:[0-9]*$/,we=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Te=[`{`,`}`,`|`,`\\`,`^`,"`",`<`,`>`,`"`,"`",` `,`\r`,`
`,`	`],w=[`'`].concat(Te),Ee=[`%`,`/`,`?`,`;`,`#`].concat(w),T=[`/`,`?`,`#`],De=255,Oe=/^[+a-z0-9A-Z_-]{0,63}$/,ke=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Ae={javascript:!0,"javascript:":!0},je={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},be.prototype.parse=function(e,t){let n,r,i,a=e;if(a=a.trim(),!t&&e.split(`#`).length===1){let e=we.exec(a);if(e)return this.pathname=e[1],e[2]&&(this.search=e[2]),this}let o=Se.exec(a);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,a=a.substr(o.length)),(t||o||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(i=a.substr(0,2)===`//`,i&&!(o&&Ae[o])&&(a=a.substr(2),this.slashes=!0)),!Ae[o]&&(i||o&&!je[o])){let e=-1;for(let t=0;t<T.length;t++)r=a.indexOf(T[t]),r!==-1&&(e===-1||r<e)&&(e=r);let t,n;n=e===-1?a.lastIndexOf(`@`):a.lastIndexOf(`@`,e),n!==-1&&(t=a.slice(0,n),a=a.slice(n+1),this.auth=t),e=-1;for(let t=0;t<Ee.length;t++)r=a.indexOf(Ee[t]),r!==-1&&(e===-1||r<e)&&(e=r);e===-1&&(e=a.length),a[e-1]===`:`&&e--;let i=a.slice(0,e);a=a.slice(e),this.parseHost(i),this.hostname=this.hostname||``;let o=this.hostname[0]===`[`&&this.hostname[this.hostname.length-1]===`]`;if(!o){let e=this.hostname.split(/\./);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n&&!n.match(Oe)){let r=``;for(let e=0,t=n.length;e<t;e++)n.charCodeAt(e)>127?r+=`x`:r+=n[e];if(!r.match(Oe)){let r=e.slice(0,t),i=e.slice(t+1),o=n.match(ke);o&&(r.push(o[1]),i.unshift(o[2])),i.length&&(a=i.join(`.`)+a),this.hostname=r.join(`.`);break}}}}this.hostname.length>De&&(this.hostname=``),o&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let s=a.indexOf(`#`);s!==-1&&(this.hash=a.substr(s),a=a.slice(0,s));let c=a.indexOf(`?`);return c!==-1&&(this.search=a.substr(c),a=a.slice(0,c)),a&&(this.pathname=a),je[n]&&this.hostname&&!this.pathname&&(this.pathname=``),this},be.prototype.parseHost=function(e){let t=Ce.exec(e);t&&(t=t[0],t!==`:`&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}})),Ne=c({decode:()=>fe,encode:()=>ge,format:()=>ve,parse:()=>xe}),Pe=o((()=>{me(),_e(),ye(),Me()})),Fe=c({Any:()=>Ie,Cc:()=>Le,Cf:()=>Re,P:()=>ze,S:()=>Be,Z:()=>Ve}),Ie,Le,Re,ze,Be,Ve,He=o((()=>{Ie=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Le=/[\0-\x1F\x7F-\x9F]/,Re=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,ze=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/,Be=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/,Ve=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/}));function Ue(e){return e===0||e>=55296&&e<=57343||e>1114111}function We(e){return Ue(e)?65533:e>=128&&e<=159&&Ke[e-128]||e}function Ge(e){return e-1>>>0<127||e-160>>>0<55136?String.fromCharCode(e):String.fromCodePoint(We(e))}var Ke,qe=o((()=>{Ke=[8364,0,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,0,381,0,0,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,0,382,376]}));function Je(e,t,n,r,i,a){let o=e.length,s=a*90,c=0,l=()=>{let t=E[e.charCodeAt(c++)];return t<a?t:t*91-s+E[e.charCodeAt(c++)]},u=n-r,d=n+i,f=new Int32Array(d);f.fill(-1,r,a),f.fill(-1,a+u,d);let p=new Int32Array(d),m=new Int32Array(d);function h(t,n){let r=0,i=n,a=n+t;for(;i<a;){let t=E[e.charCodeAt(c++)];if(t<89)r+=t,f[i++]=r;else if(t===89){let t=E[e.charCodeAt(c++)]+2;for(;t--;)f[i++]=++r}else{let t=E[e.charCodeAt(c++)];r+=89+(t<90?t*91+E[e.charCodeAt(c++)]:E[e.charCodeAt(c++)]*8281+E[e.charCodeAt(c++)]*91+E[e.charCodeAt(c++)]),f[i++]=r}}}h(r,0),h(u,a);let g=new Int32Array(i*2),_=0,v=0;function y(e,t){for(let n=0;n<e;n++){let e=t+n,r=l(),i=l();g[v*2]=r,g[v*2+1]=i,v+=1,p[e]=_;let a=(f[r]<0?m[r]:1)+(f[i]<0?m[i]:1);m[e]=a,_+=a}}y(i-a+r,a+u),y(a-r,r);let b=new Uint16Array(_),ee=0;for(let e=0;e<v;e++)for(let t=0;t<2;t++){let n=g[e*2+t],r=f[n];if(r<0){let e=p[n],t=e+m[n];for(;e<t;)b[ee++]=b[e++]}else b[ee++]=r}let te=new Uint16Array(t),x=0;for(;c<o;){let t=E[e.charCodeAt(c++)];t>=a&&(t=t*91-s+E[e.charCodeAt(c++)]);let n=f[t];if(n<0){let e=p[t],n=e+m[t];for(;e<n;)te[x++]=b[e++]}else te[x++]=n}return te}var E,Ye=o((()=>{E=(()=>{let e=new Uint8Array(127),t=0;for(let n=33;n<=126;n++)n!==34&&n!==36&&n!==92&&(e[n]=t++);return e})()})),Xe,Ze=o((()=>{Ye(),Xe=Je("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P",13494,2713,49,25,61)})),D,Qe=o((()=>{(function(e){e[e.VALUE_LENGTH=49152]=`VALUE_LENGTH`,e[e.FLAG13=8192]=`FLAG13`,e[e.BRANCH_LENGTH=8064]=`BRANCH_LENGTH`,e[e.JUMP_TABLE=127]=`JUMP_TABLE`,e[e.VALUE_MASK=8191]=`VALUE_MASK`})(D||={})}));function $e(e){let t=e>>>ut;return t===ft?pt:t}function et(e){return e-O.ZERO>>>0<=9}function tt(e){return(e|lt)-O.LOWER_A>>>0<=5}function nt(e){return(e|lt)-O.LOWER_A>>>0<=25}function rt(e){return e===O.EQUALS||nt(e)||et(e)}function it(e,t,n,r){let i=(t&D.BRANCH_LENGTH)>>7,a=t&D.JUMP_TABLE;if(a){if(i===0)return r===a?n:-1;let t=r-a;if(t>>>0>=i)return-1;let o=e[n+t];return o===0?-1:n+i+o-1&65535}if(i===0)return-1;let o=i+1>>1,s=n+o+i;for(let t=0;t<i;t++){let i=e[n+(t>>1)]>>((t&1)<<3)&255;if(i===r)return s+e[n+o+t]&65535;if(i>r)return-1}return-1}function at(e,t,n){return n===1?String.fromCharCode(e[t]&D.VALUE_MASK):n===2?String.fromCharCode(e[t+1]):String.fromCharCode(e[t+1],e[t+2])}function ot(e,t,n){let r=t+1,i=0,a=r;if(r<n&&(e.charCodeAt(r)|lt)===O.LOWER_X)for(r+=1,a=r;r<n;){let t=e.charCodeAt(r);if(et(t))i=i*16+(t-O.ZERO);else if(tt(t))i=i*16+((t|lt)-O.LOWER_A+10);else break;r+=1}else for(;r<n;){let t=e.charCodeAt(r)-O.ZERO;if(t>>>0>9)break;i=i*10+t,r+=1}if(r===a)return 0;r<n&&e.charCodeAt(r)===O.SEMI&&(r+=1),i>1114111&&(i=1114112);let o=r-t;return o>=ft&&(pt=o,o=ft),o<<ut|i}function st(e,t,n){let r=Xe,i=e.indexOf(`&`);if(i<0)return e;let a=e.length,o=0,s=``,c=r[0],l=c&D.JUMP_TABLE,u=(c&D.BRANCH_LENGTH)>>7;do{let c=i+1,d=e.charCodeAt(c),f,p;if(d===O.NUM){let n=ot(e,c,a);f=$e(n),t&&f>0&&e.charCodeAt(c+f-1)!==O.SEMI&&(f=0),p=f===0?``:Ge(n&dt)}else if(nt(d)){f=0,p=``;let n=d-l,i;if(n>>>0<u){let e=r[1+n];i=e===0?-1:u+e&65535}else i=-1;let o=0,s=0,m=i<0?0:r[i],h=c+1;trie:for(;h<a;){for(;(m&(D.VALUE_LENGTH|D.FLAG13))===0&&(m&D.JUMP_TABLE)!==0;){let t=m&D.JUMP_TABLE,n=(m&D.BRANCH_LENGTH)>>7;if(n===0){if(e.charCodeAt(h)!==t)break trie;i+=1}else{let a=e.charCodeAt(h)-t;if(a>>>0>=n)break trie;let o=r[i+1+a];if(o===0)break trie;i=i+n+o&65535}if(m=r[i],h+=1,h>=a)break trie}if((m&(D.VALUE_LENGTH|D.FLAG13))===D.FLAG13){let t=(m&D.BRANCH_LENGTH)>>7;if(e.charCodeAt(h)!==(m&D.JUMP_TABLE))break;h+=1;let n=t-1,a=i+1,o=0;for(;o+1<n;o+=2){let t=r[a];if(e.charCodeAt(h)!==(t&255)||(h+=1,e.charCodeAt(h)!==(t>>8&255)))break trie;h+=1,a+=1}if(o<n){if(e.charCodeAt(h)!==(r[a]&255))break;h+=1}i+=1+(t>>1),m=r[i];continue}let n=m>>>14,l=e.charCodeAt(h);if(n!==0){if(l===O.SEMI){f=h-c+1,p=n===1?String.fromCharCode(m&D.VALUE_MASK):at(r,i,n);break}if(!t&&(m&D.FLAG13)===0&&(f=h-c,o=i,s=n),n===1)break}let u=it(r,m,i+(n||1),l);if(u<0)break;i=u,m=r[i],h+=1}if(p===``){let e=m>>>14;e!==0&&!t&&(m&D.FLAG13)===0&&(f=h-c,o=i,s=e),f>0&&(p=at(r,o,s))}}else f=0,p=``;f===0||n&&d!==O.NUM&&e.charCodeAt(c+f-1)!==O.SEMI&&c+f<a&&rt(e.charCodeAt(c+f))?i=c:(o<i&&(s+=e.slice(o,i)),s+=p,i=o=c+f),e.charCodeAt(i)!==O.AMP&&(i=e.indexOf(`&`,i))}while(i>=0);return s+e.slice(o)}function ct(e){return st(e,!0,!1)}var O,lt,ut,dt,ft,pt,mt,k,ht=o((()=>{qe(),Ze(),Qe(),(function(e){e[e.AMP=38]=`AMP`,e[e.NUM=35]=`NUM`,e[e.SEMI=59]=`SEMI`,e[e.EQUALS=61]=`EQUALS`,e[e.ZERO=48]=`ZERO`,e[e.NINE=57]=`NINE`,e[e.LOWER_A=97]=`LOWER_A`,e[e.LOWER_X=120]=`LOWER_X`})(O||={}),lt=32,ut=21,dt=2097151,ft=2047,pt=0,(function(e){e[e.EntityStart=0]=`EntityStart`,e[e.NumericStart=1]=`NumericStart`,e[e.NumericDecimal=2]=`NumericDecimal`,e[e.NumericHex=3]=`NumericHex`,e[e.NamedEntity=4]=`NamedEntity`})(mt||={}),(function(e){e[e.Legacy=0]=`Legacy`,e[e.Strict=1]=`Strict`,e[e.Attribute=2]=`Attribute`})(k||={})})),gt=o((()=>{ht()}));function _t(){let e=St.split(`|`);return xt.split(`|`).forEach(t=>{let n=t.indexOf(`:`),r=t.slice(0,n);for(let i of t.slice(n+1))e.push(r+i)}),e}var vt,yt,bt,xt,St,Ct,wt,Tt,Et=o((()=>{He(),vt=class{src_Any=Ie.source;src_Cc=Le.source;src_Z=Ve.source;src_P=ze.source;src_ZPCc=[this.src_Z,this.src_P,this.src_Cc].join(`|`);src_ZCc=[this.src_Z,this.src_Cc].join(`|`);cache={};opts={maxLength:1e4,urlAuth:!1,schema_names:[]};constructor(e={}){this.opts={...this.opts,...e}}set(e={}){return this.opts={...this.opts,...e},this.cache={},this}escapeRE(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,`\\$&`)}nestedPairRE(e,t,n=4){let r=this.escapeRE(e),i=this.escapeRE(t),a=`(?:(?!${this.src_ZCc}|${r}|${i}).)`,o=`${r}${a}{0,1000}${i}`;for(let e=2;e<=n;e++)o=`${r}(?:${a}|${o}){0,1000}${i}`;return o}get_text_separators(){return this.cache.text_separators??=/[><\uff5c]/}get_pseudo_letter(){return this.cache.src_pseudo_letter??=RegExp(`(?:(?!${this.get_text_separators().source}|${this.src_ZPCc})${this.src_Any})`)}get_ipv4_addr(){return this.cache.src_ip4??=RegExp(`(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[.]){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])`)}get_ipv6_addr(){let e=`[0-9A-Fa-f]{1,4}`,t=`(?:(?:${e}:${e})|${this.get_ipv4_addr().source})`;return this.cache.src_ip6_addr??=RegExp(`(?:(?:${e}:){6}${t}|::(?:${e}:){5}${t}|(?:${e})?::(?:${e}:){4}${t}|(?:(?:${e}:){0,1}${e})?::(?:${e}:){3}${t}|(?:(?:${e}:){0,2}${e})?::(?:${e}:){2}${t}|(?:(?:${e}:){0,3}${e})?::${e}:${t}|(?:(?:${e}:){0,4}${e})?::${t}|(?:(?:${e}:){0,5}${e})?::${e}|(?:(?:${e}:){0,6}${e})?::)`)}get_ipv6_url_host(){return this.cache.src_ip6_host??=RegExp(`\\[${this.get_ipv6_addr().source}\\]`)}get_ipv6_mail_host(){return this.cache.src_ipv6_mail_host??=RegExp(`\\[IPv6:${this.get_ipv6_addr().source}\\]`)}get_auth(){return this.cache.src_auth??=RegExp(`(?:(?:(?!${this.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`)}get_port(){return this.cache.src_port??=RegExp(`(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?`)}get_host_terminator(){return this.cache.src_host_terminator??=RegExp(`(?=$|${this.get_text_separators().source}|${this.src_ZPCc})(?!${this.opts[`---`]?`-(?!--)|`:`-|`}_|:\\d|\\.-|\\.(?!$|${this.src_ZPCc}))`)}get_path_terminator(){return this.cache.src_path_terminator??=RegExp(`${this.src_ZPCc}|${this.get_text_separators().source}`)}get_path(){return this.cache.src_path??=RegExp(`(?:[/?#](?:${this.nestedPairRE(`[`,`]`)}|${this.nestedPairRE(`(`,`)`)}|${this.nestedPairRE(`{`,`}`)}|\\"(?:(?!${this.src_ZCc}|["]).){1,100}\\"|\\'(?:(?!${this.src_ZCc}|[']).){1,100}\\'|\\'(?=${this.get_pseudo_letter().source}|[-])|\\.{2,20}[:]?[a-zA-Z0-9%/&]|\\.(?!${this.src_ZCc}|[.]|$)|`+(this.opts[`---`]?`\\-(?!--(?:[^-]|$))(?:-{0,19})|`:`\\-{1,20}|`)+`,(?!${this.src_ZCc}|$)|;(?!${this.src_ZCc}|$)|\\!{1,20}(?!${this.src_ZCc}|[!]|$)|\\?(?!${this.src_ZCc}|[?]|$)|`+this.get_path_extra().source+`[\\\\/:%@#&=_~*]|(?!${this.get_path_terminator().source}).){1,${this.opts.maxLength}}|\\/)?`)}get_mail_name(){return this.cache.src_mail_name??=RegExp("[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9](?:[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9]|[.](?=[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9])){0,63}")}get_xn(){return this.cache.src_xn??=RegExp(`xn--[a-z0-9\\-]{1,59}`)}get_tld(){if(this.cache.tld)return this.cache.tld;let e=[...new Set(this.opts.tlds||[])].sort().reverse().join(`|`);return this.cache.tld=RegExp(`${e||`$#none#$`}|${this.get_xn().source}`),this.cache.tld}get_domain_root(){return this.cache.src_domain_root??=RegExp(`(?:`+this.get_xn().source+`|${this.get_pseudo_letter().source}{1,63})`)}get_domain(){return this.cache.src_domain??=RegExp(`(?:`+this.get_xn().source+`|(?:${this.get_pseudo_letter().source})|(?:${this.get_pseudo_letter().source}(?:-|${this.get_pseudo_letter().source}){0,61}${this.get_pseudo_letter().source}))`)}get_url_host_port(){return this.cache.url_host_port??=RegExp(`(?:`+this.get_ipv6_url_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,10}${this.get_domain().source}))`+this.get_port().source+this.get_host_terminator().source)}get_fuzzy_url_host_port(){return this.cache.fuzzy_url_host_port??=RegExp(`(?:`+(this.opts.fuzzyIP?this.get_ipv4_addr().source+`|`:``)+`(?:(?:(?:${this.get_domain().source})\\.){1,10}(?:${this.get_tld().source})))`+this.get_host_terminator().source)}get_mail_host(){return this.cache.src_mail_host??=RegExp(`(?:`+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,4}${this.get_domain().source}))`+this.get_host_terminator().source)}get_fuzzy_mail_host(){return this.cache.src_fuzzy_mail_host??=RegExp(`(?:`+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})[.]){1,4}${this.get_domain_root().source}))`+this.get_host_terminator().source)}get_path_extra(){return this.cache.src_path_extra??=RegExp(``)}get_fuzzy_mail_host_search(){return this.cache.mail_fuzzy_host_search??=RegExp(`@${this.get_fuzzy_mail_host().source}`,`ig`)}get_fuzzy_link_search(){return this.cache.link_fuzzy_search??=RegExp(`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${this.src_ZPCc}))(?:(?![$+<=>^\`|\uff5c])${this.get_fuzzy_url_host_port().source}${this.get_path().source})`,`ig`)}get_http_validator(){return this.cache.http_validator??=RegExp(`\\/\\/`+(this.opts.urlAuth?this.get_auth().source:``)+this.get_url_host_port().source+this.get_path().source,`iy`)}get_relative_proto_validator(){return this.cache.relative_proto_validator??=RegExp((this.opts.urlAuth?this.get_auth().source:``)+`(?:localhost|${this.get_ipv6_url_host().source}|(?:(?:${this.get_domain().source})[.]){1,10}${this.get_domain_root().source})`+this.get_port().source+this.get_host_terminator().source+this.get_path().source,`iy`)}get_mail_name_validator(){return this.cache.mail_name_validator??=RegExp(`(?:^|${this.get_text_separators().source}|"|\\(|${this.src_ZCc})(${this.get_mail_name().source})$`)}get_mailto_validator(){return this.cache.mailto_validator??=RegExp(`${this.get_mail_name().source}@${this.get_mail_host().source}`,`iy`)}get_schema_names(){return this.cache.schema_names??=new RegExp((this.opts.schema_names||[]).map(e=>this.escapeRE(e)).join(`|`))}get_schema_search(){return this.cache.schema_search??=RegExp(`(^|(?!_)(?:[><\uff5c]|${this.src_ZPCc}))(${this.get_schema_names().source})`,`ig`)}get_schema_at_start(){return this.cache.schema_at_start??=RegExp(`^${this.get_schema_search().source}`,`i`)}},yt={validate:(e,t,n)=>{let r=n.re.get_http_validator();r.lastIndex=t;let i=r.exec(e);return i?i[0].length:0},normalize:(e,t)=>t.normalize(e)},bt={"http:":yt,"https:":yt,"ftp:":yt,"//":{validate:function(e,t,n){let r=n.re.get_relative_proto_validator();r.lastIndex=t;let i=r.exec(e);return i?t>=3&&e[t-3]===`:`||t>=3&&e[t-3]===`/`?0:i[0].length:0},normalize:(e,t)=>t.normalize(e)},"mailto:":{validate:function(e,t,n){let r=n.re.get_mailto_validator();r.lastIndex=t;let i=r.exec(e);return i?i[0].length:0},normalize:(e,t)=>t.normalize(e)}},xt=`a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw`,St=`biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф`,Ct={fuzzyLink:!1,fuzzyEmail:!0,fuzzyIP:!1,"---":!1,tlds:_t(),urlAuth:!1,maxLength:1e4},wt=class{schema;index;lastIndex;raw;text;url;constructor(e,t,n,r){let i=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=i,this.text=i,this.url=i}},Tt=class{__opts__;__schemas__;re;constructor(e={}){let{rebuilder:t,...n}=e;this.__opts__={...Ct,...n},this.__schemas__={...bt},this.re=t||new vt,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)})}add(e,t=null){if(!t)delete this.__schemas__[e];else{let n={normalize:(e,t)=>t.normalize(e),...t};this.__schemas__[e]=n}return this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}set(e={}){return this.__opts__={...this.__opts__,...e},this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}test(e){if(!e.length)return!1;let t,n;for(n=this.re.get_schema_search(),n.lastIndex=0;(t=n.exec(e))!==null;)if(this.testSchemaAt(e,t[2],n.lastIndex))return!0;if(this.__opts__.fuzzyLink&&this.__schemas__[`http:`]&&(n=this.re.get_fuzzy_link_search(),n.lastIndex=0,n.exec(e)!==null))return!0;if(this.__opts__.fuzzyEmail&&this.__schemas__[`mailto:`]&&e.indexOf(`@`)>=0){let n=this.re.get_fuzzy_mail_host_search(),r=this.re.get_mail_name_validator();for(n.lastIndex=0;(t=n.exec(e))!==null;){let n=e.slice(Math.max(0,t.index-65),t.index);if(r.test(n))return!0}}return!1}testSchemaAt(e,t,n){return this.__schemas__[t.toLowerCase()]?this.__schemas__[t.toLowerCase()].validate(e.slice(0,n+this.__opts__.maxLength),n,this):0}match(e){let t=[],n=this.re.get_schema_search(),r,i,a,o,s,c,l=!1,u=!1,d=!1,f=0;if(!e.length)return null;for(n.lastIndex=0,this.__opts__.fuzzyLink&&this.__schemas__[`http:`]&&(r=this.re.get_fuzzy_link_search(),r.lastIndex=0),this.__opts__.fuzzyEmail&&this.__schemas__[`mailto:`]&&(i=this.re.get_fuzzy_mail_host_search(),i.lastIndex=0,a=this.re.get_mail_name_validator());;){let p=Math.max(f-1,0);if(i&&a&&!d&&(!s||s.index<f))for(i.lastIndex<p&&(i.lastIndex=p);;){let t=i.exec(e);if(!t){d=!0,s=void 0;break}let n=a.exec(e.slice(Math.max(0,t.index-65),t.index));if(n){if(s={schema:`mailto:`,index:t.index-n[1].length,lastIndex:t.index+t[0].length},s.index>=f)break;i.lastIndex<p&&(i.lastIndex=p)}}if(r&&!u&&(!o||o.index<f))for(r.lastIndex<p&&(r.lastIndex=p);;){let t=r.exec(e);if(!t){u=!0,o=void 0;break}if(o={schema:``,index:t.index+t[1].length,lastIndex:t.index+t[0].length},o.index>=f)break;r.lastIndex<p&&(r.lastIndex=p)}let m=s;(!m||o&&(o.index<m.index||o.index===m.index&&o.lastIndex>m.lastIndex))&&(m=o);let h;if(!l)for(;;){if(!c){n.lastIndex<p&&(n.lastIndex=p);let t=n.exec(e);if(!t){l=!0;break}c={schema:t[2],index:t.index+t[1].length,lastIndex:t.index+t[0].length}}if(c.index<f){c=void 0;continue}if(m&&c.index>m.index)break;let t=c;c=void 0;let r=this.testSchemaAt(e,t.schema,t.lastIndex);if(r){h={schema:t.schema,index:t.index,lastIndex:t.lastIndex+r};break}}let g=h;if((!g||s&&(s.index<g.index||s.index===g.index&&s.lastIndex>g.lastIndex))&&(g=s),(!g||o&&(o.index<g.index||o.index===g.index&&o.lastIndex>g.lastIndex))&&(g=o),!g)break;g===s?s=void 0:g===o&&(o=void 0);let _=new wt(e,g.schema,g.index,g.lastIndex);_.schema?this.__schemas__[_.schema].normalize(_,this):this.normalize(_),t.push(_),f=g.lastIndex}return t.length?t:null}matchAtStart(e){if(!e.length)return null;let t=this.re.get_schema_at_start().exec(e);if(!t)return null;let n=this.testSchemaAt(e,t[2],t[0].length);if(!n)return null;let r=new wt(e,t[2],t.index+t[1].length,t.index+t[0].length+n);return this.__schemas__[r.schema].normalize(r,this),r}tlds(e,t=!1){return e=Array.isArray(e)?e:[e],t?this.__opts__.tlds=this.__opts__.tlds.concat(e):this.__opts__.tlds=e,this.re.set({...this.__opts__,schema_names:Object.keys(this.__schemas__)}),this}normalize(e){e.schema||(e.url=`http://${e.url}`),e.schema===`mailto:`&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)}}}));function Dt(e){throw RangeError(Ut[e])}function Ot(e,t){let n=[],r=e.length;for(;r--;)n[r]=t(e[r]);return n}function kt(e,t){let n=e.split(`@`),r=``;n.length>1&&(r=n[0]+`@`,e=n[1]),e=e.replace(Ht,`.`);let i=Ot(e.split(`.`),t).join(`.`);return r+i}function At(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){let r=e.charCodeAt(n++);(r&64512)==56320?t.push(((i&1023)<<10)+(r&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}var jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,A,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn=o((()=>{jt=2147483647,Mt=36,Nt=1,Pt=26,Ft=38,It=700,Lt=72,Rt=128,zt=`-`,Bt=/^xn--/,Vt=/[^\0-\x7F]/,Ht=/[\x2E\u3002\uFF0E\uFF61]/g,Ut={overflow:`Overflow: input needs wider integers to process`,"not-basic":`Illegal input >= 0x80 (not a basic code point)`,"invalid-input":`Invalid input`},Wt=35,A=Math.floor,Gt=String.fromCharCode,Kt=e=>String.fromCodePoint(...e),qt=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:Mt},Jt=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},Yt=function(e,t,n){let r=0;for(e=n?A(e/It):e>>1,e+=A(e/t);e>455;r+=Mt)e=A(e/Wt);return A(r+36*e/(e+Ft))},Xt=function(e){let t=[],n=e.length,r=0,i=Rt,a=Lt,o=e.lastIndexOf(zt);o<0&&(o=0);for(let n=0;n<o;++n)e.charCodeAt(n)>=128&&Dt(`not-basic`),t.push(e.charCodeAt(n));for(let s=o>0?o+1:0;s<n;){let o=r;for(let t=1,i=Mt;;i+=Mt){s>=n&&Dt(`invalid-input`);let o=qt(e.charCodeAt(s++));o>=Mt&&Dt(`invalid-input`),o>A((jt-r)/t)&&Dt(`overflow`),r+=o*t;let c=i<=a?Nt:i>=a+Pt?Pt:i-a;if(o<c)break;let l=Mt-c;t>A(jt/l)&&Dt(`overflow`),t*=l}let c=t.length+1;a=Yt(r-o,c,o==0),A(r/c)>jt-i&&Dt(`overflow`),i+=A(r/c),r%=c,t.splice(r++,0,i)}return String.fromCodePoint(...t)},Zt=function(e){let t=[];e=At(e);let n=e.length,r=Rt,i=0,a=Lt;for(let n of e)n<128&&t.push(Gt(n));let o=t.length,s=o;for(o&&t.push(zt);s<n;){let n=jt;for(let t of e)t>=r&&t<n&&(n=t);let c=s+1;n-r>A((jt-i)/c)&&Dt(`overflow`),i+=(n-r)*c,r=n;for(let n of e)if(n<r&&++i>jt&&Dt(`overflow`),n===r){let e=i;for(let n=Mt;;n+=Mt){let r=n<=a?Nt:n>=a+Pt?Pt:n-a;if(e<r)break;let i=e-r,o=Mt-r;t.push(Gt(Jt(r+i%o,0))),e=A(i/o)}t.push(Gt(Jt(e,0))),a=Yt(i,c,s===o),i=0,++s}++i,++r}return t.join(``)},Qt=function(e){return kt(e,function(e){return Bt.test(e)?Xt(e.slice(4).toLowerCase()):e})},$t=function(e){return kt(e,function(e){return Vt.test(e)?`xn--`+Zt(e):e})},en={version:`2.3.1`,ucs2:{decode:At,encode:Kt},decode:Xt,encode:Zt,toASCII:$t,toUnicode:Qt}}));function nn(e){let t=function(...n){return Reflect.construct(e,n,new.target&&new.target!==t?new.target:e)};return Object.defineProperty(t,"name",{value:e.name}),Object.setPrototypeOf(t,e),t.prototype=e.prototype,t}function rn(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function an(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)==65535||(e&65535)==65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function on(e){if(e>65535){e-=65536;let t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}function sn(e,t){if(t.charCodeAt(0)===35&&Vr.test(t)){let n=t[1].toLowerCase()===`x`?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return an(n)?on(n):e}let n=ct(e);return n===e?e:n}function cn(e){return e.indexOf(`\\`)<0?e:e.replace(zr,`$1`)}function ln(e){return e.indexOf(`\\`)<0&&e.indexOf(`&`)<0?e:e.replace(Br,function(e,t,n){return t||sn(e,n)})}function un(e){return Wr[e]}function dn(e){return Hr.test(e)?e.replace(Ur,un):e}function fn(e){return e.replace(Gr,`\\$&`)}function j(e){switch(e){case 9:case 32:return!0}return!1}function pn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function mn(e){return ze.test(e)||Be.test(e)}function hn(e){return mn(on(e))}function gn(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function _n(e){return e=e.trim().replace(/\s+/g,` `),e.toLowerCase().toUpperCase()}function vn(e){return e===32||e===9||e===10||e===13}function yn(e){let t=0;for(;t<e.length&&vn(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&vn(e.charCodeAt(n));n--);return e.slice(t,n+1)}function bn(e,t,n){let r,i,a,o,s=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<s;){if(a=e.src.charCodeAt(e.pos),a===93&&(r--,r===0)){i=!0;break}if(o=e.pos,e.md.inline.skipToken(e),a===91){if(o===e.pos-1)r++;else if(n)return e.pos=c,-1}}let l=-1;return i&&(l=e.pos),e.pos=c,l}function xn(e,t,n){let r,i=t,a={ok:!1,pos:0,str:``};if(e.charCodeAt(i)===60){for(i++;i<n;){if(r=e.charCodeAt(i),r===10||r===60)return a;if(r===62)return a.pos=i+1,a.str=ln(e.slice(t+1,i)),a.ok=!0,a;if(r===92&&i+1<n){i+=2;continue}i++}return a}let o=0;for(;i<n&&(r=e.charCodeAt(i),!(r===32||r<32||r===127));){if(r===92&&i+1<n){if(e.charCodeAt(i+1)===32){i++;continue}i+=2;continue}if(r===40&&(o++,o>32))return a;if(r===41){if(o===0)break;o--}i++}return t===i||o!==0?a:(a.str=ln(e.slice(t,i)),a.pos=i,a.ok=!0,a)}function Sn(e,t,n,r){let i,a=t,o={ok:!1,can_continue:!1,pos:0,str:``,marker:0};if(r)o.str=r.str,o.marker=r.marker;else{if(a>=n)return o;let r=e.charCodeAt(a);if(r!==34&&r!==39&&r!==40)return o;t++,a++,r===40&&(r=41),o.marker=r}for(;a<n;){if(i=e.charCodeAt(a),i===o.marker)return o.pos=a+1,o.str+=ln(e.slice(t,a)),o.ok=!0,o;if(i===40&&o.marker===41)return o;i===92&&a+1<n&&a++,a++}return o.can_continue=!0,o.str+=ln(e.slice(t,a)),o}function Cn(e){"@babel/helpers - typeof";return Cn=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Cn(e)}function wn(e,t){if(Cn(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Cn(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Tn(e){var t=wn(e,`string`);return Cn(t)==`symbol`?t:t+``}function M(e,t,n){return(t=Tn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function En(e){let t;t=e.src.replace($r,`
`),t=t.replace(ei,`�`),e.src=t}function Dn(e){let t;e.inlineMode?(t=new e.Token(`inline`,``,0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function On(e){let t=e.tokens,n=0;for(let e=0;e<t.length;e++)t[e].type!==`reference_definition`&&(e!==n&&(t[n]=t[e]),n++);t.length!==n&&(t.length=n)}function kn(e){let t=e.tokens;for(let n=0,r=t.length;n<r;n++){let r=t[n];r.type===`inline`&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function An(e){return/^<a[>\s]/i.test(e)}function jn(e){return/^<\/a\s*>/i.test(e)}function Mn(e){let t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!==`inline`||!e.md.linkify.test(t[n].content))continue;let r=t[n].children,i=[],a=0;for(let t=r.length-1;t>=0;t--){let n=r[t];if(n.type===`link_close`){for(t--;r[t].level!==n.level&&r[t].type!==`link_open`;)t--;continue}if(n.type===`html_inline`&&(An(n.content)&&a>0&&a--,jn(n.content)&&a++),!(a>0)&&n.type===`text`&&e.md.linkify.test(n.content)){let a=n.content,o=e.md.linkify.match(a),s=[],c=n.level,l=0;o.length>0&&o[0].index===0&&t>0&&r[t-1].type===`text_special`&&(o=o.slice(1));for(let t=0;t<o.length;t++){let n=o[t].url,r=e.md.normalizeLink(n);if(!e.md.validateLink(r))continue;let i=o[t].text;i=o[t].schema?o[t].schema===`mailto:`&&!/^mailto:/i.test(i)?e.md.normalizeLinkText(`mailto:${i}`).replace(/^mailto:/,``):e.md.normalizeLinkText(i):e.md.normalizeLinkText(`http://${i}`).replace(/^http:\/\//,``);let u=o[t].index;if(u>l){let t=new e.Token(`text`,``,0);t.content=a.slice(l,u),t.level=c,s.push(t)}let d=new e.Token(`link_open`,`a`,1);d.attrs=[[`href`,r]],d.level=c++,d.markup=`linkify`,d.info=`auto`,s.push(d);let f=new e.Token(`text`,``,0);f.content=i,f.level=c,s.push(f);let p=new e.Token(`link_close`,`a`,-1);p.level=--c,p.markup=`linkify`,p.info=`auto`,s.push(p),l=o[t].lastIndex}if(l<a.length){let t=new e.Token(`text`,``,0);t.content=a.slice(l),t.level=c,s.push(t)}i.push({index:t,nodes:s})}}if(i.length>0){let e=r.length;for(let t of i)e+=t.nodes.length-1;let a=Array(e),o=0,s=0;i.reverse();for(let e=0;e<r.length;e++){let t=i[o];if(t?.index===e){for(let e of t.nodes)a[s++]=e;o++}else a[s++]=r[e]}t[n].children=a}}}function Nn(e,t){return ii[t.toLowerCase()]}function Pn(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&(r.content=r.content.replace(ri,Nn)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function Fn(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&ti.test(r.content)&&(r.content=r.content.replace(/\+-/g,`±`).replace(/\.{2,}/g,`…`).replace(/([?!])…/g,`$1..`).replace(/([?!]){4,}/g,`$1$1$1`).replace(/,{2,}/g,`,`).replace(/(^|[^-])---(?=[^-]|$)/gm,`$1—`).replace(/(^|\s)--(?=\s|$)/gm,`$1–`).replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,`$1–`)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function In(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&(ni.test(e.tokens[t].content)&&Pn(e.tokens[t].children),ti.test(e.tokens[t].content)&&Fn(e.tokens[t].children))}function Ln(e,t,n){for(;e.length>n;){let n=e.pop();n.isSingleQuote?t.single=n.prevSameQuoteIdx:t.double=n.prevSameQuoteIdx}}function Rn(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function zn(e,t){let n=``,r=0;t.sort((e,t)=>e.pos-t.pos);for(let i=0;i<t.length;i++){let a=t[i];n+=e.slice(r,a.pos)+a.ch,r=a.pos+1}return n+e.slice(r)}function Bn(e,t){let n,r=[],i={single:-1,double:-1},a={};for(let o=0;o<e.length;o++){let s=e[o],c=e[o].level;for(n=r.length-1;n>=0&&!(r[n].level<=c);n--);if(Ln(r,i,n+1),s.type!==`text`)continue;let l=s.content,u=0,d=l.length;OUTER:for(;u<d;){oi.lastIndex=u;let s=oi.exec(l);if(!s)break;let f=!0,p=!0;u=s.index+1;let m=s[0]===`'`,h=32;if(s.index-1>=0)h=l.charCodeAt(s.index-1);else for(n=o-1;n>=0&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n--)if(e[n].content){h=e[n].content.charCodeAt(e[n].content.length-1);break}let g=32;if(u<d)g=l.charCodeAt(u);else for(n=o+1;n<e.length&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n++)if(e[n].content){g=e[n].content.charCodeAt(0);break}let _=gn(h)||hn(h),v=gn(g)||hn(g),y=pn(h),b=pn(g);if(b?f=!1:v&&(y||_||(f=!1)),y?p=!1:_&&(b||v||(p=!1)),g===34&&s[0]===`"`&&h>=48&&h<=57&&(p=f=!1),f&&p&&(f=_,p=v),!f&&!p){m&&Rn(a,o,s.index,si);continue}if(p&&(n=m?i.single:i.double,n>=0&&r[n].level===c)){let e=r[n],c,l;m?(c=t.md.options.quotes[2],l=t.md.options.quotes[3]):(c=t.md.options.quotes[0],l=t.md.options.quotes[1]),Rn(a,o,s.index,l),Rn(a,e.tokenIdx,e.contentPos,c),Ln(r,i,n);continue OUTER}if(f){if(r.length>=ci)return;r.push({tokenIdx:o,contentPos:s.index,isSingleQuote:m,level:c,prevSameQuoteIdx:m?i.single:i.double}),m?i.single=r.length-1:i.double=r.length-1}else p&&m&&Rn(a,o,s.index,si)}}Object.keys(a).forEach(function(t){let n=Number(t);e[n].content=zn(e[n].content,a[t])})}function Vn(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&ai.test(e.tokens[t].content)&&Bn(e.tokens[t].children,e)}function Hn(e){let t,n,r=e.length;for(t=0;t<r;t++)e[t].type===`text_special`&&(e[t].type=`text`);for(t=n=0;t<r;t++)e[t].type===`text`&&t+1<r&&e[t+1].type===`text`?e[t+1].content=e[t].content+e[t+1].content:(t!==n&&(e[n]=e[t]),n++);t!==n&&(e.length=n)}function Un(e){let t,n,r=e.tokens,i=r.length;for(let e=0;e<i;e++){if(r[e].type!==`inline`)continue;let i=r[e].children,a=i.length;for(t=0;t<a;t++)i[t].type===`text_special`&&(i[t].type=`text`),i[t].children&&Hn(i[t].children);for(t=n=0;t<a;t++)i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}}function Wn(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function Gn(e){let t=[],n=e.length,r=0,i=e.charCodeAt(r),a=!1,o=0,s=``;for(;r<n;)i===124&&(a?(s+=e.substring(o,r-1),o=r):(t.push(s+e.substring(o,r)),s=``,o=r+1)),a=i===92,r++,i=e.charCodeAt(r);return t.push(s+e.substring(o)),t}function Kn(e,t,n,r){if(t+2>n)return!1;let i=t+1;if(e.sCount[i]<e.blkIndent||e.sCount[i]-e.blkIndent>=4)return!1;let a=e.bMarks[i]+e.tShift[i];if(a>=e.eMarks[i])return!1;let o=e.src.charCodeAt(a++);if(o!==124&&o!==45&&o!==58||a>=e.eMarks[i])return!1;let s=e.src.charCodeAt(a++);if(s!==124&&s!==45&&s!==58&&!j(s)||o===45&&j(s))return!1;for(;a<e.eMarks[i];){let t=e.src.charCodeAt(a);if(t!==124&&t!==45&&t!==58&&!j(t))return!1;a++}let c=Wn(e,t+1),l=c.split(`|`),u=[];for(let e=0;e<l.length;e++){let t=l[e].trim();if(!t){if(e===0||e===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(t))return!1;t.charCodeAt(t.length-1)===58?u.push(t.charCodeAt(0)===58?`center`:`right`):t.charCodeAt(0)===58?u.push(`left`):u.push(``)}if(c=Wn(e,t).trim(),c.indexOf(`|`)===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=Gn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop();let d=l.length;if(d===0||d!==u.length)return!1;if(r)return!0;let f=e.parentType;e.parentType=`table`;let p=e.md.block.ruler.getRules(`blockquote`),m=e.push(`table_open`,`table`,1),h=[t,0];m.map=h;let g=e.push(`thead_open`,`thead`,1);g.map=[t,t+1];let _=e.push(`tr_open`,`tr`,1);_.map=[t,t+1];for(let t=0;t<l.length;t++){let n=e.push(`th_open`,`th`,1);u[t]&&(n.attrs=[[`style`,`text-align:${u[t]}`]]);let r=e.push(`inline`,``,0);r.content=l[t].trim(),r.children=[],e.push(`th_close`,`th`,-1)}e.push(`tr_close`,`tr`,-1),e.push(`thead_close`,`thead`,-1);let v,y=0;for(i=t+2;i<n&&!(e.sCount[i]<e.blkIndent);i++){let r=!1;for(let t=0,a=p.length;t<a;t++)if(p[t](e,i,n,!0)){r=!0;break}if(r||(c=Wn(e,i).trim(),!c)||e.sCount[i]-e.blkIndent>=4||(l=Gn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop(),y+=d-l.length,y>fi))break;if(i===t+2){let n=e.push(`tbody_open`,`tbody`,1);n.map=v=[t+2,0]}let a=e.push(`tr_open`,`tr`,1);a.map=[i,i+1];for(let t=0;t<d;t++){let n=e.push(`td_open`,`td`,1);u[t]&&(n.attrs=[[`style`,`text-align:${u[t]}`]]);let r=e.push(`inline`,``,0);r.content=l[t]?l[t].trim():``,r.children=[],e.push(`td_close`,`td`,-1)}e.push(`tr_close`,`tr`,-1)}return v&&(e.push(`tbody_close`,`tbody`,-1),v[1]=i),e.push(`table_close`,`table`,-1),h[1]=i,e.parentType=f,e.line=i,!0}function qn(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,i=r;for(;r<n;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,i=r;continue}break}e.line=i;let a=e.push(`code_block`,`code`,0);return a.content=e.getLines(t,i,4+e.blkIndent,!1)+`
`,a.map=[t,e.line],!0}function Jn(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||i+3>a)return!1;let o=e.src.charCodeAt(i);if(o!==126&&o!==96)return!1;let s=i;i=e.skipChars(i,o);let c=i-s;if(c<3)return!1;let l=e.src.slice(s,i),u=e.src.slice(i,a);if(o===96&&u.indexOf(String.fromCharCode(o))>=0)return!1;if(r)return!0;let d=t,f=!1;for(;d++,!(d>=n||(i=s=e.bMarks[d]+e.tShift[d],a=e.eMarks[d],i<a&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(i)===o&&!(e.sCount[d]-e.blkIndent>=4)&&(i=e.skipChars(i,o),!(i-s<c)&&(i=e.skipSpaces(i),!(i<a)))){f=!0;break}c=e.sCount[t],e.line=d+ +!!f;let p=e.push(`fence`,`code`,0);return p.info=u,p.content=e.getLines(t+1,d,c,!0),p.markup=l,p.map=[t,e.line],!0}function Yn(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==62)return!1;if(r)return!0;let s=[],c=[],l=[],u=[],d=e.md.block.ruler.getRules(`blockquote`),f=e.parentType;e.parentType=`blockquote`;let p=!1,m;for(m=t;m<n;m++){let t=e.sCount[m]<e.blkIndent;if(i=e.bMarks[m]+e.tShift[m],a=e.eMarks[m],i>=a)break;if(e.src.charCodeAt(i++)===62&&!t){let t=e.sCount[m]+1,n,r;e.src.charCodeAt(i)===32?(i++,t++,r=!1,n=!0):e.src.charCodeAt(i)===9?(n=!0,(e.bsCount[m]+t)%4==3?(i++,t++,r=!1):r=!0):n=!1;let o=t;for(s.push(e.bMarks[m]),e.bMarks[m]=i;i<a;){let t=e.src.charCodeAt(i);if(j(t))t===9?o+=4-(o+e.bsCount[m]+ +!!r)%4:o++;else break;i++}p=i>=a,c.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+ +!!n,l.push(e.sCount[m]),e.sCount[m]=o-t,u.push(e.tShift[m]),e.tShift[m]=i-e.bMarks[m];continue}if(p)break;let r=!1;for(let t=0,i=d.length;t<i;t++)if(d[t](e,m,n,!0)){r=!0;break}if(r){e.lineMax=m,e.blkIndent!==0&&(s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]=-1}let h=e.blkIndent;e.blkIndent=0;let g=e.push(`blockquote_open`,`blockquote`,1);g.markup=`>`;let _=[t,0];g.map=_,e.md.block.tokenize(e,t,m);let v=e.push(`blockquote_close`,`blockquote`,-1);v.markup=`>`,e.lineMax=o,e.parentType=f,_[1]=e.line;for(let n=0;n<u.length;n++)e.bMarks[n+t]=s[n],e.tShift[n+t]=u[n],e.sCount[n+t]=l[n],e.bsCount[n+t]=c[n];return e.blkIndent=h,!0}function Xn(e,t,n,r){let i=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.bMarks[t]+e.tShift[t],o=e.src.charCodeAt(a++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;a<i;){let t=e.src.charCodeAt(a++);if(t!==o&&!j(t))return!1;t===o&&s++}if(s<3)return!1;if(r)return!0;e.line=t+1;let c=e.push(`hr`,`hr`,0);return c.map=[t,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}function Zn(e,t){let n=e.eMarks[t],r=e.bMarks[t]+e.tShift[t],i=e.src.charCodeAt(r++);return i!==42&&i!==45&&i!==43||r<n&&!j(e.src.charCodeAt(r))?-1:r}function Qn(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t],i=n;if(i+1>=r)return-1;let a=e.src.charCodeAt(i++);if(a<48||a>57)return-1;for(;;){if(i>=r)return-1;if(a=e.src.charCodeAt(i++),a>=48&&a<=57){if(i-n>=10)return-1;continue}if(a===41||a===46)break;return-1}return i<r&&(a=e.src.charCodeAt(i),!j(a))?-1:i}function $n(e,t){let n=e.level+2;for(let r=t+2,i=e.tokens.length-2;r<i;r++)e.tokens[r].level===n&&e.tokens[r].type===`paragraph_open`&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function er(e,t,n,r){let i,a,o,s,c=t,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let u=!1;r&&e.parentType===`paragraph`&&e.sCount[c]>=e.blkIndent&&(u=!0);let d,f,p;if((p=Qn(e,c))>=0){if(d=!0,o=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(o,p-1)),u&&f!==1)return!1}else if((p=Zn(e,c))>=0)d=!1;else return!1;if(u&&e.skipSpaces(p)>=e.eMarks[c])return!1;if(r)return!0;let m=e.src.charCodeAt(p-1),h=e.tokens.length;d?(s=e.push(`ordered_list_open`,`ol`,1),f!==1&&(s.attrs=[[`start`,f]])):s=e.push(`bullet_list_open`,`ul`,1);let g=[c,0];s.map=g,s.markup=String.fromCharCode(m);let _=!1,v=e.md.block.ruler.getRules(`list`),y=e.parentType;for(e.parentType=`list`;c<n;){a=p,i=e.eMarks[c];let t=e.sCount[c]+p-(e.bMarks[c]+e.tShift[c]),r=t;for(;a<i;){let t=e.src.charCodeAt(a);if(t===9)r+=4-(r+e.bsCount[c])%4;else if(t===32)r++;else break;a++}let u=a,f;f=u>=i?1:r-t,f>4&&(f=1);let h=t+f;s=e.push(`list_item_open`,`li`,1),s.markup=String.fromCharCode(m);let g=[c,0];s.map=g,d&&(s.info=e.src.slice(o,p-1));let y=e.tight,b=e.tShift[c],ee=e.sCount[c],te=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=h,e.tight=!0,e.tShift[c]=u-e.bMarks[c],e.sCount[c]=r,u>=i&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n),(!e.tight||_)&&(l=!1),_=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=te,e.tShift[c]=b,e.sCount[c]=ee,e.tight=y,s=e.push(`list_item_close`,`li`,-1),s.markup=String.fromCharCode(m),c=e.line,g[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let x=!1;for(let t=0,r=v.length;t<r;t++)if(v[t](e,c,n,!0)){x=!0;break}if(x)break;if(d){if(p=Qn(e,c),p<0)break;o=e.bMarks[c]+e.tShift[c]}else if(p=Zn(e,c),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return s=d?e.push(`ordered_list_close`,`ol`,-1):e.push(`bullet_list_close`,`ul`,-1),s.markup=String.fromCharCode(m),g[1]=c,e.line=c,e.parentType=y,l&&$n(e,h),!0}function tr(e){let t=e.length;for(let n=0;n<e.length-1;n++){let r=e.charCodeAt(n);if(r<55296||r>56319)continue;let i=e.charCodeAt(n+1);i>=56320&&i<=57343&&(t--,n++)}return t}function nr(e,t){return Math.min(e.eMarks[t]+1,e.src.length)}function rr(e,t){let n=e.lineMax;if(t>=n||e.isEmpty(t))return-1;let r=!1;if(e.sCount[t]-e.blkIndent>3&&(r=!0),e.sCount[t]<0&&(r=!0),!r){let r=e.md.block.ruler.getRules(`reference`),i=e.parentType;e.parentType=`reference`;let a=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,t,n,!0)){a=!0;break}if(e.parentType=i,a)return-1}return e.bMarks[t]+e.tShift[t]}function ir(e,t,n,r){let i=e.src,a=e.bMarks[t]+e.tShift[t],o=t+1;if(e.sCount[t]-e.blkIndent>=4||i.charCodeAt(a)!==91)return!1;let s=nr(e,t),c=``,l=-1,u=++a;for(;a<s;){if(c.length+a-u>pi*2)return!1;let t=i.charCodeAt(a);if(t===91)return!1;if(t===93){l=a;break}if(t===92&&(t=i.charCodeAt(++a)),t===10&&a<s){let t=rr(e,o);if(t<0)return!1;c+=i.slice(u,s),a=u=t,s=nr(e,o++);continue}a++}if(l<0||i.charCodeAt(l+1)!==58||(c+=i.slice(u,l),c.length>pi&&tr(c)>pi))return!1;for(a=l+2;a<s;){let t=i.charCodeAt(a);if(t===10){let t=rr(e,o);if(t<0)break;a=t,s=nr(e,o++)}else if(j(t))a++;else break}let d=e.md.helpers.parseLinkDestination(i,a,s);if(!d.ok)return!1;let f=e.md.normalizeLink(d.str);if(!e.md.validateLink(f))return!1;a=d.pos;let p=a,m=s,h=o;for(;a<s;){let t=i.charCodeAt(a);if(t===10){let t=rr(e,o);if(t<0)break;a=t,s=nr(e,o++)}else if(j(t))a++;else break}let g=a,_=e.md.helpers.parseLinkTitle(i,a,s);for(;_.can_continue;){let t=rr(e,o);if(t<0)break;a=t,s=nr(e,o++),_=e.md.helpers.parseLinkTitle(i,a,s,_)}let v;for(g!==p&&_.ok?(v=_.str,a=_.pos):(v=``,a=p,s=m,o=h);a<s&&j(i.charCodeAt(a));)a++;if(a<s&&i.charCodeAt(a)!==10&&v)for(v=``,a=p,s=m,o=h;a<s&&j(i.charCodeAt(a));)a++;if(a<s&&i.charCodeAt(a)!==10)return!1;let y=_n(c);if(!y)return!1;if(r)return!0;e.env.references===void 0&&(e.env.references={}),e.env.references[y]===void 0&&(e.env.references[y]={title:v,href:f});let b=e.push(`reference_definition`,``,0);b.map=[t,o],b.hidden=!0;let ee=Object.create(null);return ee.label=y,b.meta=ee,e.line=o,!0}function ar(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(i)!==60)return!1;let o=e.src.slice(i,a),s=0;for(;s<vi.length&&!vi[s][0].test(o);s++);if(s===vi.length)return!1;if(r)return vi[s][2];let c=t+1,l=vi[s][1].test(``);if(!vi[s][1].test(o)){for(;c<n&&!(e.sCount[c]<e.blkIndent&&(l||!e.isEmpty(c)));c++)if(i=e.bMarks[c]+e.tShift[c],a=e.eMarks[c],o=e.src.slice(i,a),vi[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;let u=e.push(`html_block`,``,0);return u.map=[t,c],u.content=e.getLines(t,c,e.blkIndent,!0),!0}function or(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(i);if(o!==35||i>=a)return!1;let s=1;for(o=e.src.charCodeAt(++i);o===35&&i<a&&s<=6;)s++,o=e.src.charCodeAt(++i);if(s>6||i<a&&!j(o))return!1;if(r)return!0;a=e.skipSpacesBack(a,i);let c=e.skipCharsBack(a,35,i);c>i&&j(e.src.charCodeAt(c-1))&&(a=c),e.line=t+1;let l=e.push(`heading_open`,`h${s}`,1);l.markup=`########`.slice(0,s),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=yn(e.src.slice(i,a)),u.map=[t,e.line],u.children=[];let d=e.push(`heading_close`,`h${s}`,-1);return d.markup=`########`.slice(0,s),!0}function sr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`);if(e.sCount[t]-e.blkIndent>=4)return!1;let i=e.parentType;e.parentType=`paragraph`;let a=0,o,s=t+1;for(;s<n&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let t=e.bMarks[s]+e.tShift[s],n=e.eMarks[s];if(t<n&&(o=e.src.charCodeAt(t),(o===45||o===61)&&(t=e.skipChars(t,o),t=e.skipSpaces(t),t>=n))){a=o===61?1:2;break}}if(e.sCount[s]<0)continue;let t=!1;for(let i=0,a=r.length;i<a;i++)if(r[i](e,s,n,!0)){t=!0;break}if(t)break}if(!a)return e.parentType=i,!1;let c=yn(e.getLines(t,s,e.blkIndent,!1));e.line=s+1;let l=e.push(`heading_open`,`h${a}`,1);l.markup=String.fromCharCode(o),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=c,u.map=[t,e.line-1],u.children=[];let d=e.push(`heading_close`,`h${a}`,-1);return d.markup=String.fromCharCode(o),e.parentType=i,!0}function cr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`),i=e.parentType,a=t+1;for(e.parentType=`paragraph`;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let t=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,a,n,!0)){t=!0;break}if(t)break}let o=yn(e.getLines(t,a,e.blkIndent,!1));e.line=a;let s=e.push(`paragraph_open`,`p`,1);s.map=[t,e.line];let c=e.push(`inline`,``,0);return c.content=o,c.map=[t,e.line],c.children=[],e.push(`paragraph_close`,`p`,-1),e.parentType=i,!0}function lr(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function ur(e,t){let n=e.pos;for(;n<e.posMax&&!lr(e.src.charCodeAt(n));)n++;return n!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}function dr(e){return e>=65&&e<=90||e>=97&&e<=122}function fr(e){return e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===45||e===46}function pr(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;let n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;let i=n-Math.min(10,e.pending.length,n),a=n;for(;a>i&&fr(e.src.charCodeAt(a-1));)a--;if(a===n||!dr(e.src.charCodeAt(a)))return!1;let o=n-a,s=e.md.linkify.matchAtStart(e.src.slice(a));if(!s)return!1;let c=s.url;if(c.length<=o)return!1;let l=c.length;for(;l>0&&c.charCodeAt(l-1)===42;)l--;l!==c.length&&(c=c.slice(0,l));let u=e.md.normalizeLink(c);if(!e.md.validateLink(u))return!1;if(!t){e.pending=e.pending.slice(0,-o);let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,u]],t.markup=`linkify`,t.info=`auto`;let n=e.push(`text`,``,0);n.content=e.md.normalizeLinkText(c);let r=e.push(`link_close`,`a`,-1);r.markup=`linkify`,r.info=`auto`}return e.pos+=c.length-o,!0}function mr(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;let r=e.pending.length-1,i=e.posMax;if(!t){if(r>=0&&e.pending.charCodeAt(r)===32){if(r>=1&&e.pending.charCodeAt(r-1)===32){let t=r-1;for(;t>=1&&e.pending.charCodeAt(t-1)===32;)t--;e.pending=e.pending.slice(0,t),e.push(`hardbreak`,`br`,0)}else e.pending=e.pending.slice(0,-1),e.push(`softbreak`,`br`,0)}else e.push(`softbreak`,`br`,0)}for(n++;n<i&&j(e.src.charCodeAt(n));)n++;return e.pos=n,!0}function hr(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let i=e.src.charCodeAt(n);if(i===10){for(t||e.push(`hardbreak`,`br`,0),n++;n<r&&(i=e.src.charCodeAt(n),j(i));)n++;return e.pos=n,!0}if(i===32){if(!t){let t=e.push(`text_special`,``,0);t.content=`\\`,t.markup=`\\`,t.info=`escape`}return e.pos=n,!0}let a=e.src[n];if(i>=55296&&i<=56319&&n+1<r){let t=e.src.charCodeAt(n+1);t>=56320&&t<=57343&&(a+=e.src[n+1],n++)}let o=`\\`+a;if(!t){let t=e.push(`text_special`,``,0);t.content=i<256&&Si[i]!==0?a:o,t.markup=o,t.info=`escape`}return e.pos=n+1,!0}function gr(e){let t={},n=0;for(;(n=e.indexOf("`",n))!==-1;){let r=n;for(;e.charCodeAt(++n)===96;);t[n-r]=r}return t}function _r(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;let r=e.posMax,i=n+1;for(;i<r&&e.src.charCodeAt(i)===96;)i++;let a=e.src.slice(n,i),o=a.length;if(e.backticksScanned||=(e.backticks=gr(e.src),!0),(e.backticks[o]??-1)>=i){let n=i,s;for(;(s=e.src.indexOf("`",n))!==-1&&s<r;){for(n=s+1;e.src.charCodeAt(n)===96;)n++;if(n>r)break;if(n-s===o){if(!t){let t=e.push(`code_inline`,`code`,0);t.markup=a;let n=e.src.slice(i,s).replace(/\n/g,` `);n.startsWith(` `)&&n.endsWith(` `)&&/[^ ]/.test(n)&&(n=n.slice(1,-1)),t.content=n}return e.pos=n,!0}}}return t||(e.pending+=a),e.pos=i,!0}function vr(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;let i=e.scanDelims(e.pos,!0),a=i.length,o=String.fromCharCode(r);if(a<2)return!1;let s;a%2&&(s=e.push(`text`,``,0),s.content=o,a--);for(let t=0;t<a;t+=2)s=e.push(`text`,``,0),s.content=o+o,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close});return e.pos+=i.length,!0}function yr(e,t){let n,r=[],i=t.length;for(let a=0;a<i;a++){let i=t[a];if(i.marker!==126||i.end===-1)continue;let o=t[i.end];n=e.tokens[i.token],n.type=`s_open`,n.tag=`s`,n.nesting=1,n.markup=`~~`,n.content=``,n=e.tokens[o.token],n.type=`s_close`,n.tag=`s`,n.nesting=-1,n.markup=`~~`,n.content=``,e.tokens[o.token-1].type===`text`&&e.tokens[o.token-1].content===`~`&&r.push(o.token-1)}for(;r.length;){let t=r.pop(),i=t+1;for(;i<e.tokens.length&&e.tokens[i].type===`s_close`;)i++;i--,t!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[t],e.tokens[t]=n)}}function br(e){let t=e.tokens_meta,n=e.tokens_meta.length;yr(e,e.delimiters);for(let r=0;r<n;r++){let n=t[r]?.delimiters;n&&yr(e,n)}}function xr(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;let i=e.scanDelims(e.pos,r===42);for(let t=0;t<i.length;t++){let t=e.push(`text`,``,0);t.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:i.length,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close})}return e.pos+=i.length,!0}function Sr(e,t){let n=t.length;for(let r=n-1;r>=0;r--){let n=t[r];if(n.marker!==95&&n.marker!==42||n.end===-1)continue;let i=t[n.end],a=r>0&&t[r-1].end===n.end+1&&t[r-1].marker===n.marker&&t[r-1].token===n.token-1&&t[n.end+1].token===i.token+1,o=String.fromCharCode(n.marker),s=e.tokens[n.token];s.type=a?`strong_open`:`em_open`,s.tag=a?`strong`:`em`,s.nesting=1,s.markup=a?o+o:o,s.content=``;let c=e.tokens[i.token];c.type=a?`strong_close`:`em_close`,c.tag=a?`strong`:`em`,c.nesting=-1,c.markup=a?o+o:o,c.content=``,a&&(e.tokens[t[r-1].token].content=``,e.tokens[t[n.end+1].token].content=``,r--)}}function Cr(e){let t=e.tokens_meta,n=e.tokens_meta.length;Sr(e,e.delimiters);for(let r=0;r<n;r++){let n=t[r]?.delimiters;n&&Sr(e,n)}}function wr(e,t){let n,r,i,a,o=``,s=``,c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let u=e.pos,d=e.posMax,f=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<d&&e.src.charCodeAt(m)===40){for(l=!1,m++;m<d&&(n=e.src.charCodeAt(m),j(n)||n===10);m++);if(m>=d)return!1;if(c=m,i=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),i.ok){for(o=e.md.normalizeLink(i.str),e.md.validateLink(o)?m=i.pos:o=``,c=m;m<d&&(n=e.src.charCodeAt(m),j(n)||n===10);m++);if(i=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<d&&c!==m&&i.ok)for(s=i.str,m=i.pos;m<d&&(n=e.src.charCodeAt(m),j(n)||n===10);m++);}(m>=d||e.src.charCodeAt(m)!==41)&&(l=!0),m++}if(l){if(e.env.references===void 0)return!1;if(m<d&&e.src.charCodeAt(m)===91?(c=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?r=e.src.slice(c,m++):m=p+1):m=p+1,r||=e.src.slice(f,p),r=_n(r),a=e.env.references[r],!a)return e.pos=u,!1;o=a.href,s=a.title}if(!t){e.pos=f,e.posMax=p;let t=e.push(`link_open`,`a`,1),n=[[`href`,o]];if(t.attrs=n,s&&n.push([`title`,s]),r){let e=Object.create(null);e.label=r,t.meta=e}e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push(`link_close`,`a`,-1)}return e.pos=m,e.posMax=d,!0}function Tr(e,t){let n,r,i,a,o,s,c,l,u=``,d=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(a=m+1,a<f&&e.src.charCodeAt(a)===40){for(a++;a<f&&(n=e.src.charCodeAt(a),j(n)||n===10);a++);if(a>=f)return!1;for(l=a,s=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),s.ok&&(u=e.md.normalizeLink(s.str),e.md.validateLink(u)?a=s.pos:u=``),l=a;a<f&&(n=e.src.charCodeAt(a),j(n)||n===10);a++);if(s=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<f&&l!==a&&s.ok)for(c=s.str,a=s.pos;a<f&&(n=e.src.charCodeAt(a),j(n)||n===10);a++);else c=``;if(a>=f||e.src.charCodeAt(a)!==41)return e.pos=d,!1;a++}else{if(e.env.references===void 0)return!1;if(a<f&&e.src.charCodeAt(a)===91?(l=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?i=e.src.slice(l,a++):a=m+1):a=m+1,i||=e.src.slice(p,m),i=_n(i),o=e.env.references[i],!o)return e.pos=d,!1;u=o.href,c=o.title}if(!t){r=e.src.slice(p,m);let t=[];e.md.inline.parse(r,e.md,e.env,t);let n=e.push(`image`,`img`,0),a=[[`src`,u],[`alt`,``]];if(n.attrs=a,n.children=t,n.content=r,c&&a.push([`title`,c]),i){let e=Object.create(null);e.label=i,n.meta=e}}return e.pos=a,e.posMax=f,!0}function Er(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;let r=e.pos,i=e.posMax;for(;;){if(++n>=i)return!1;let t=e.src.charCodeAt(n);if(t===60)return!1;if(t===62)break}let a=e.src.slice(r+1,n);if(Ei.test(a)){let n=e.md.normalizeLink(a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}if(Ti.test(a)){let n=e.md.normalizeLink(`mailto:${a}`);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}return!1}function Dr(e){return/^<a[>\s]/i.test(e)}function Or(e){return/^<\/a\s*>/i.test(e)}function kr(e){let t=e|32;return t>=97&&t<=122}function Ar(e,t){let n=e.src,r,i;if(n.startsWith(`<!--`,t)){if(n.startsWith(`>`,t+4))return t+5;if(n.startsWith(`->`,t+4))return t+6;r=t+4,i=`-->`}else if(n.startsWith(`<![CDATA[`,t))r=t+9,i=`]]>`;else if(n.charCodeAt(t+1)===63)r=t+2,i=`?>`;else if(kr(n.charCodeAt(t+2)))r=t+3,i=`>`;else return-1;if(e.skipHtmlSpecial)return-1;let a=n.indexOf(i,r);return a<0?(e.skipHtmlSpecial=!0,-1):a+i.length}function jr(e,t){if(!e.md.options.html)return!1;let n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;let i,a=e.src.charCodeAt(r+1);if(a===33||a===63)i=Ar(e,r);else if(a===47||kr(a)){let t=e.src.slice(r).match(_i);i=t?r+t[0].length:-1}else return!1;if(i<0)return!1;if(!t){let t=e.push(`html_inline`,``,0);t.content=e.src.slice(r,i),Dr(t.content)&&e.linkLevel++,Or(t.content)&&e.linkLevel--}return e.pos=i,!0}function Mr(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){let r=e.src.slice(n).match(Di);if(r){if(!t){let t=r[1][0].toLowerCase()===`x`?parseInt(r[1].slice(1),16):parseInt(r[1],10),n=e.push(`text_special`,``,0);n.content=an(t)?on(t):on(65533),n.markup=r[0],n.info=`entity`}return e.pos+=r[0].length,!0}}else{let r=e.src.slice(n).match(Oi);if(r){let n=ct(r[0]);if(n!==r[0]){if(!t){let t=e.push(`text_special`,``,0);t.content=n,t.markup=r[0],t.info=`entity`}return e.pos+=r[0].length,!0}}}return!1}function Nr(e){let t={},n=e.length;if(!n)return;let r=0,i=-2,a=[];for(let o=0;o<n;o++){let n=e[o];if(a.push(0),(e[r].marker!==n.marker||i!==n.token-1)&&(r=o),i=n.token,n.length=n.length||0,!n.close)continue;t.hasOwnProperty(n.marker)||(t[n.marker]=[-1,-1,-1,-1,-1,-1]);let s=t[n.marker][(n.open?3:0)+n.length%3],c=r-a[r]-1,l=c;for(;c>s;c-=a[c]+1){let t=e[c];if(t.marker===n.marker&&t.open&&t.end<0){let r=!1;if((t.close||n.open)&&(t.length+n.length)%3==0&&(t.length%3!=0||n.length%3!=0)&&(r=!0),!r){let r=c>0&&!e[c-1].open?a[c-1]+1:0;a[o]=o-c+r,a[c]=r,n.open=!1,t.end=o,t.close=!1,l=-1,i=-2;break}}}l!==-1&&(t[n.marker][(n.open?3:0)+(n.length||0)%3]=l)}}function Pr(e){let t=e.tokens_meta,n=e.tokens_meta.length;Nr(e.delimiters);for(let e=0;e<n;e++){let n=t[e]?.delimiters;n&&Nr(n)}}function Fr(e){let t,n,r=0,i=e.tokens,a=e.tokens.length;for(t=n=0;t<a;t++)i[t].nesting<0&&r--,i[t].level=r,i[t].nesting>0&&r++,i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}var Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri=o((()=>{Pe(),He(),gt(),Et(),tn(),Ir=Object.defineProperty,Lr=(e,t)=>{let n={};for(var r in e)Ir(n,r,{get:e[r],enumerable:!0});return t||Ir(n,Symbol.toStringTag,{value:`Module`}),n},Rr=Lr({arrayReplaceAt:()=>rn,asciiTrim:()=>yn,callable:()=>nn,escapeHtml:()=>dn,escapeRE:()=>fn,fromCodePoint:()=>on,isMdAsciiPunct:()=>gn,isPunctChar:()=>mn,isPunctCharCode:()=>hn,isSpace:()=>j,isValidEntityCode:()=>an,isWhiteSpace:()=>pn,lib:()=>Kr,normalizeReference:()=>_n,unescapeAll:()=>ln,unescapeMd:()=>cn}),zr=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Br=RegExp(`${zr.source}|&([a-z#][a-z0-9]{1,31});`,`gi`),Vr=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i,Hr=/[&<>"]/,Ur=/[&<>"]/g,Wr={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`},Gr=/[.?*+^$[\]\\(){}|-]/g,Kr={mdurl:Ne,ucmicro:Fe},qr=Lr({parseLinkDestination:()=>xn,parseLinkLabel:()=>bn,parseLinkTitle:()=>Sn}),Jr=class{constructor(e,t,n){M(this,`map`,null),M(this,`level`,0),M(this,`children`,null),M(this,`content`,``),M(this,`markup`,``),M(this,`info`,``),M(this,`block`,!1),M(this,`hidden`,!1),this.type=e,this.tag=t,this.attrs=null,this.nesting=n,this.meta=null}attrIndex(e){if(!this.attrs)return-1;let t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1}attrPush(e){this.attrs?this.attrs.push(e):this.attrs=[e]}attrSet(e,t){let n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r}attrGet(e){let t=this.attrIndex(e),n=null;return t>=0&&(n=this.attrs[t][1]),n}attrJoin(e,t){let n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=`${this.attrs[n][1]} ${t}`}},Yr=class{constructor(){M(this,`__rules__`,[]),M(this,`__cache__`,null)}__find__(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1}__compile__(){let e=new Set;this.__rules__.forEach(t=>{t.enabled&&t.alt.forEach(t=>{t&&e.add(t)})}),this.__cache__=Object.create(null),this.__cache__[``]=[],this.__rules__.forEach(e=>{e.enabled&&this.__cache__[``].push(e.fn)}),e.forEach(e=>{this.__cache__[e]=[],this.__rules__.forEach(t=>{t.enabled&&t.alt.indexOf(e)>=0&&this.__cache__[e].push(t.fn)})})}at(e,t,n={}){let r=this.__find__(e);if(r===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__[r].fn=t,this.__rules__[r].alt=n.alt||[],this.__cache__=null}before(e,t,n,r={}){let i=this.__find__(e);if(i===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null}after(e,t,n,r={}){let i=this.__find__(e);if(i===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null}push(e,t,n={}){this.__rules__.push({name:e,enabled:!0,fn:t,alt:n.alt||[]}),this.__cache__=null}enable(e,t=!1){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(e=>{let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name ${e}`)}this.__rules__[r].enabled=!0,n.push(e)}),this.__cache__=null,n}enableOnly(e,t=!1){Array.isArray(e)||(e=[e]),this.__rules__.forEach(e=>{e.enabled=!1}),this.enable(e,t)}disable(e,t=!1){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(e=>{let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name ${e}`)}this.__rules__[r].enabled=!1,n.push(e)}),this.__cache__=null,n}getRules(e){return this.__cache__||this.__compile__(),this.__cache__[e]||[]}},Xr={},Xr.code_inline=function(e,t,n,r,i){let a=e[t];return`<code${i.renderAttrs(a)}>${dn(a.content)}</code>`},Xr.code_block=function(e,t,n,r,i){let a=e[t];return`<pre${i.renderAttrs(a)}><code>${dn(e[t].content)}</code></pre>\n`},Xr.fence=function(e,t,n,r,i){let a=e[t],o=a.info?ln(a.info).trim():``,s=``,c=``;if(o){let e=o.split(/(\s+)/g);s=e[0],c=e.slice(2).join(``)}let l;if(l=n.highlight&&n.highlight(a.content,s,c)||dn(a.content),l.indexOf(`<pre`)===0)return l+`
`;if(o){let e=a.attrIndex(`class`),t=a.attrs?a.attrs.slice():[];e<0?t.push([`class`,`${n.langPrefix}${s}`]):(t[e]=[t[e][0],t[e][1]],t[e][1]+=` ${n.langPrefix}${s}`);let r={attrs:t};return`<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`}return`<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`},Xr.image=function(e,t,n,r,i){let a=e[t];return a.attrs[a.attrIndex(`alt`)][1]=i.renderInlineAsText(a.children,n,r),i.renderToken(e,t,n)},Xr.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`},Xr.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`},Xr.text=function(e,t){return dn(e[t].content)},Xr.html_block=function(e,t){return e[t].content},Xr.html_inline=function(e,t){return e[t].content},Zr=class{constructor(){M(this,`rules`,Object.assign({},Xr))}renderAttrs(e){let t,n,r;if(!e.attrs)return``;for(r=``,t=0,n=e.attrs.length;t<n;t++)r+=` ${dn(e.attrs[t][0])}="${dn(String(e.attrs[t][1]))}"`;return r}renderToken(e,t,n){let r=e[t],i=``;if(r.hidden)return``;let a=t-1;for(;a>=0&&e[a].hidden&&e[a].nesting===0;)a--;r.block&&r.nesting!==-1&&a>=0&&e[a].hidden&&e[a].nesting===-1&&(i+=`
`),i+=(r.nesting===-1?`</`:`<`)+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=` /`);let o=!1;if(r.block&&(o=!0,r.nesting===1)){let n=t+1;for(;n<e.length&&e[n].hidden&&e[n].nesting===0;)n++;if(n<e.length){let t=e[n];(t.type===`inline`||t.hidden||t.nesting===-1&&t.tag===r.tag)&&(o=!1)}}return i+=o?`>
`:`>`,i}renderInline(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r}renderInlineAsText(e,t,n){let r=``;for(let i=0,a=e.length;i<a;i++)switch(e[i].type){case`text`:case`code_inline`:r+=e[i].content;break;case`image`:r+=this.renderInlineAsText(e[i].children,t,n);break;case`html_inline`:case`html_block`:r+=e[i].content;break;case`softbreak`:case`hardbreak`:r+=`
`}return r}render(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;o===`inline`?r+=this.renderInline(e[a].children,t,n):i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r}},Qr=class{constructor(e,t,n){M(this,`tokens`,[]),M(this,`inlineMode`,!1),M(this,`Token`,Jr),this.src=e,this.env=n,this.md=t}},$r=/\r\n?/g,ei=/\0/g,ti=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ni=/\((c|tm|r)\)/i,ri=/\((c|tm|r)\)/gi,ii={c:`©`,r:`®`,tm:`™`},ai=/['"]/,oi=/['"]/g,si=`’`,ci=1e3,li=[[`normalize`,En],[`block`,Dn],[`strip_references`,On],[`inline`,kn],[`linkify`,Mn],[`replacements`,In],[`smartquotes`,Vn],[`text_join`,Un]],ui=class{constructor(){M(this,`ruler`,new Yr),M(this,`State`,Qr);for(let e=0;e<li.length;e++)this.ruler.push(li[e][0],li[e][1])}process(e){let t=this.ruler.getRules(``);for(let n=0,r=t.length;n<r;n++)t[n](e)}},di=class{constructor(e,t,n,r){M(this,`bMarks`,[]),M(this,`eMarks`,[]),M(this,`tShift`,[]),M(this,`sCount`,[]),M(this,`bsCount`,[]),M(this,`blkIndent`,0),M(this,`line`,0),M(this,`lineMax`,0),M(this,`tight`,!1),M(this,`listIndent`,-1),M(this,`parentType`,`root`),M(this,`level`,0),M(this,`Token`,Jr),this.src=e,this.md=t,this.env=n,this.tokens=r;let i=this.src;for(let e=0,t=0,n=0,r=0,a=i.length,o=!1;t<a;t++){let s=i.charCodeAt(t);if(!o){if(j(s)){n++,s===9?r+=4-r%4:r++;continue}o=!0}(s===10||t===a-1)&&(s!==10&&t++,this.bMarks.push(e),this.eMarks.push(t),this.tShift.push(n),this.sCount.push(r),this.bsCount.push(0),o=!1,n=0,r=0,e=t+1)}this.bMarks.push(i.length),this.eMarks.push(i.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}push(e,t,n){let r=new Jr(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r}isEmpty(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]}skipEmptyLines(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e}skipSpaces(e){for(let t=this.src.length;e<t&&j(this.src.charCodeAt(e));e++);return e}skipSpacesBack(e,t){if(e<=t)return e;for(;e>t;)if(!j(this.src.charCodeAt(--e)))return e+1;return e}skipChars(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e}skipCharsBack(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e}getLines(e,t,n,r){if(e>=t)return``;let i=Array(t-e);for(let a=0,o=e;o<t;o++,a++){let e=0,s=this.bMarks[o],c=s,l;for(l=o+1<t||r?this.eMarks[o]+1:this.eMarks[o];c<l&&e<n;){let t=this.src.charCodeAt(c);if(j(t))t===9?e+=4-(e+this.bsCount[o])%4:e++;else if(c-s<this.tShift[o])e++;else break;c++}e>n?i[a]=Array(e-n+1).join(` `)+this.src.slice(c,l):i[a]=this.src.slice(c,l)}return i.join(``)}},fi=65536,pi=999,mi=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),hi=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,gi=`<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>`,RegExp(`^(?:${hi}|${gi}|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`),_i=RegExp(`^(?:${hi}|${gi})`),vi=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[RegExp(`^</?(${mi.join(`|`)})(?=(\\s|/?>|$))`,`i`),/^$/,!0],[RegExp(`${_i.source}\\s*$`),/^$/,!1]],yi=[[`table`,Kn,[`paragraph`,`reference`]],[`code`,qn],[`fence`,Jn,[`paragraph`,`reference`,`blockquote`,`list`]],[`blockquote`,Yn,[`paragraph`,`reference`,`blockquote`,`list`]],[`hr`,Xn,[`paragraph`,`reference`,`blockquote`,`list`]],[`list`,er,[`paragraph`,`reference`,`blockquote`]],[`reference`,ir],[`html_block`,ar,[`paragraph`,`reference`,`blockquote`]],[`heading`,or,[`paragraph`,`reference`,`blockquote`]],[`lheading`,sr],[`paragraph`,cr]],bi=class{constructor(){M(this,`ruler`,new Yr),M(this,`State`,di);for(let e=0;e<yi.length;e++)this.ruler.push(yi[e][0],yi[e][1],{alt:(yi[e][2]||[]).slice()})}tokenize(e,t,n){let r=this.ruler.getRules(``),i=r.length,a=e.md.options.maxNesting,o=t,s=!1;for(;o<n&&(e.line=o=e.skipEmptyLines(o),!(o>=n||e.sCount[o]<e.blkIndent));){if(e.level>=a){e.line=n;break}let t=e.line,c=!1;for(let a=0;a<i;a++)if(c=r[a](e,o,n,!1),c){if(t>=e.line)throw Error(`block rule didn't increment state.line`);break}if(!c)throw Error(`none of the block rules matched`);e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<n&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}}parse(e,t,n,r){if(!e)return;let i=new this.State(e,t,n,r);this.tokenize(i,i.line,i.lineMax)}},xi=class{constructor(e,t,n,r){M(this,`pos`,0),M(this,`level`,0),M(this,`pending`,``),M(this,`pendingLevel`,0),M(this,`cache`,{}),M(this,`backticks`,{}),M(this,`backticksScanned`,!1),M(this,`skipHtmlSpecial`,!1),M(this,`linkLevel`,0),M(this,`delimiters`,[]),M(this,`_prev_delimiters`,[]),M(this,`Token`,Jr),this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.posMax=this.src.length}pushPending(){let e=new Jr(`text`,``,0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending=``,e}push(e,t,n){this.pending&&this.pushPending();let r=new Jr(e,t,n),i;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],i={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(i),r}scanDelims(e,t){let n=this.posMax,r=this.src.charCodeAt(e),i;if(e===0)i=32;else if(e===1)i=this.src.charCodeAt(0),(i&63488)==55296&&(i=65533);else if(i=this.src.charCodeAt(e-1),(i&64512)==56320){let t=this.src.charCodeAt(e-2);i=(t&64512)==55296?65536+(t-55296<<10)+(i-56320):65533}else(i&64512)==55296&&(i=65533);let a=e;for(;a<n&&this.src.charCodeAt(a)===r;)a++;let o=a-e,s=a<n?this.src.charCodeAt(a):32;if((s&64512)==55296){let e=this.src.charCodeAt(a+1);s=(e&64512)==56320?65536+(s-55296<<10)+(e-56320):65533}else(s&64512)==56320&&(s=65533);let c=gn(i)||hn(i),l=gn(s)||hn(s),u=pn(i),d=pn(s),f=!d&&(!l||u||c),p=!u&&(!c||d||l);return{can_open:f&&(t||!p||c),can_close:p&&(t||!f||l),length:o}}},Si=[];for(let e=0;e<256;e++)Si.push(0);`\\!"#$%&'()*+,./:;<=>?@[]^_\`{|}~-`.split(``).forEach(function(e){Si[e.charCodeAt(0)]=1}),Ci={tokenize:vr,postProcess:br},wi={tokenize:xr,postProcess:Cr},Ti=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Ei=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/,Di=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Oi=/^&([a-z][a-z0-9]{1,31});/i,ki=[[`text`,ur],[`linkify`,pr],[`newline`,mr],[`escape`,hr],[`backticks`,_r],[`strikethrough`,Ci.tokenize],[`emphasis`,wi.tokenize],[`link`,wr],[`image`,Tr],[`autolink`,Er],[`html_inline`,jr],[`entity`,Mr]],Ai=[[`balance_pairs`,Pr],[`strikethrough`,Ci.postProcess],[`emphasis`,wi.postProcess],[`fragments_join`,Fr]],ji=class{constructor(){M(this,`ruler`,new Yr),M(this,`ruler2`,new Yr),M(this,`State`,xi);for(let e=0;e<ki.length;e++)this.ruler.push(ki[e][0],ki[e][1]);for(let e=0;e<Ai.length;e++)this.ruler2.push(Ai[e][0],Ai[e][1])}skipToken(e){let t=e.pos,n=this.ruler.getRules(``),r=n.length,i=e.md.options.maxNesting,a=e.cache;if(a[t]!==void 0){e.pos=a[t];return}let o=!1;if(e.level<i){for(let i=0;i<r;i++)if(e.level++,o=n[i](e,!0),e.level--,o){if(t>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}else e.pos=e.posMax;o||e.pos++,a[t]=e.pos}tokenize(e){let t=this.ruler.getRules(``),n=t.length,r=e.posMax,i=e.md.options.maxNesting;for(;e.pos<r;){let a=e.pos,o=!1;if(e.level<i){for(let r=0;r<n;r++)if(o=t[r](e,!1),o){if(a>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}if(o){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()}parse(e,t,n,r){let i=new this.State(e,t,n,r);this.tokenize(i);let a=this.ruler2.getRules(``),o=a.length;for(let e=0;e<o;e++)a[e](i)}},Mi={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`strip_references`,`inline`,`text_join`]},block:{rules:[`paragraph`]},inline:{rules:[`text`],rules2:[`balance_pairs`,`fragments_join`]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`strip_references`,`inline`,`text_join`]},block:{rules:[`blockquote`,`code`,`fence`,`heading`,`hr`,`html_block`,`lheading`,`list`,`reference`,`paragraph`]},inline:{rules:[`autolink`,`backticks`,`emphasis`,`entity`,`escape`,`html_inline`,`image`,`link`,`newline`,`text`],rules2:[`balance_pairs`,`emphasis`,`fragments_join`]}}}},Ni=/^(vbscript|javascript|file|data):/,Pi=/^data:image\/(gif|png|jpeg|webp);/,Fi=[`http:`,`https:`,`mailto:`],Ii=class{validateLink(e){let t=e.trim().toLowerCase();return!Ni.test(t)||Pi.test(t)}normalizeLink(e){let t=xe(e,!0);if(t.hostname&&(!t.protocol||Fi.indexOf(t.protocol)>=0))try{t.hostname=en.toASCII(t.hostname)}catch{}return t.auth&&=ge(t.auth),t.hostname&&=ge(t.hostname),t.pathname&&=ge(t.pathname),t.search&&=ge(t.search),t.hash&&=ge(t.hash),ve(t)}normalizeLinkText(e){let t=xe(e,!0);if(t.hostname&&(!t.protocol||Fi.indexOf(t.protocol)>=0))try{t.hostname=en.toUnicode(t.hostname)}catch{}return fe(ve(t),fe.defaultChars+`%`)}constructor(...e){M(this,`inline`,new ji),M(this,`block`,new bi),M(this,`core`,new ui),M(this,`renderer`,new Zr),M(this,`linkify`,new Tt),M(this,`utils`,Rr),M(this,`helpers`,Object.assign({},qr));let[t,n]=e;typeof t==`string`?(this.configure(t),n&&this.set(n)):(this.configure(`default`),this.set(t||{}))}set(e){return Object.assign(this.options,e),this}configure(e){let t;if(typeof e==`string`){let n=e;if(t=Mi[n],!t)throw Error(`Wrong 'markdown-it' preset "${n}", check name`)}else t=e;if(!t)throw Error("Wrong `markdown-it` preset, can't be empty");t.options&&(this.options={...t.options});let n=t.components;if(n){[`core`,`block`,`inline`].forEach(e=>{let t=n[e]?.rules;t&&this[e].ruler.enableOnly(t)});let e=n.inline?.rules2;e&&this.inline.ruler2.enableOnly(e)}return this}enable(e,t=!1){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(t=>{n=n.concat(this[t].ruler.enable(e,!0))}),n=n.concat(this.inline.ruler2.enable(e,!0));let r=e.filter(e=>n.indexOf(e)<0);if(r.length&&!t)throw Error(`MarkdownIt. Failed to enable unknown rule(s): ${r}`);return this}disable(e,t=!1){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(t=>{n=n.concat(this[t].ruler.disable(e,!0))}),n=n.concat(this.inline.ruler2.disable(e,!0));let r=e.filter(e=>n.indexOf(e)<0);if(r.length&&!t)throw Error(`MarkdownIt. Failed to disable unknown rule(s): ${r}`);return this}use(e,...t){return e.apply(e,[this,...t]),this}parse(e,t){if(typeof e!=`string`)throw Error(`Input data should be a String`);let n=new this.core.State(e,this,t);return this.core.process(n),n.tokens}render(e,t={}){return this.renderer.render(this.parse(e,t),this.options,t)}parseInline(e,t){let n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens}renderInline(e,t={}){return this.renderer.render(this.parseInline(e,t),this.options,t)}},M(Ii,`Token`,Jr),M(Ii,`Ruler`,Yr),M(Ii,`Renderer`,Zr),M(Ii,`ParserCore`,ui),M(Ii,`StateCore`,Qr),M(Ii,`ParserBlock`,bi),M(Ii,`StateBlock`,di),M(Ii,`ParserInline`,ji),M(Ii,`StateInline`,xi),Li=nn(Ii)}));function zi(e,t,n,r){var i;if(!Ki){var a=`Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks`;typeof process==`object`&&process&&process.emitWarning?process.emitWarning(a):console.warn(a),Ki=!0}var o=[Object.assign(new n.Token(`link_open`,`a`,1),{attrs:[].concat(t.permalinkClass?[[`class`,t.permalinkClass]]:[],[[`href`,t.permalinkHref(e,n)]],Object.entries(t.permalinkAttrs(e,n)))}),Object.assign(new n.Token(`html_block`,``,0),{content:t.permalinkSymbol,meta:Ji}),new n.Token(`link_close`,`a`,-1)];t.permalinkSpace&&n.tokens[r+1].children[qi[t.permalinkBefore]](Object.assign(new n.Token(`text`,``,0),{content:` `})),(i=n.tokens[r+1].children)[qi[t.permalinkBefore]].apply(i,o)}function Bi(e){return`#`+e}function Vi(e){return{}}function Hi(e){function t(n){return n=Object.assign({},t.defaults,n),function(t,r,i,a){return e(t,n,r,i,a)}}return t.defaults=Object.assign({},Yi),t.renderPermalinkImpl=e,t}function Ui(e){var t=[],n=e.filter(function(e){if(e[0]!==`class`)return!0;t.push(e[1])});return t.length>0&&n.unshift([`class`,t.join(` `)]),n}function Wi(e,t,n,r){var i=e,a=r;if(n&&Object.prototype.hasOwnProperty.call(t,i))throw Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(t,i);)i=e+`-`+a,a+=1;return t[i]=!0,i}function Gi(e,t){t=Object.assign({},Gi.defaults,t),e.core.ruler.push(`anchor`,function(e){e.env.markdownItAnchor||(e.env.markdownItAnchor={});for(var n,r=e.env.markdownItAnchor.slugs||(e.env.markdownItAnchor.slugs={}),i=e.tokens,a=Array.isArray(t.level)?(n=t.level,function(e){return n.includes(e)}):function(e){return function(t){return t>=e}}(t.level),o=0;o<i.length;o++){var s=i[o];if(s.type===`heading_open`&&a(Number(s.tag.substr(1)))){var c=t.getTokensText(i[o+1].children),l=s.attrGet(`id`);l=l==null?Wi(l=t.slugifyWithState?t.slugifyWithState(c,e):t.slugify(c),r,!1,t.uniqueSlugStartIndex):Wi(l,r,t.failOnNonUnique,t.uniqueSlugStartIndex),s.attrSet(`id`,l),!1!==t.tabIndex&&s.attrSet(`tabindex`,``+t.tabIndex),typeof t.permalink==`function`?t.permalink(l,t,e,o):(t.permalink||t.renderPermalink&&t.renderPermalink!==zi)&&t.renderPermalink(l,t,e,o),o=i.indexOf(s),t.callback&&t.callback(s,{slug:l,title:c})}}})}var Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea=o((()=>{Ki=!1,qi={false:`push`,true:`unshift`,after:`push`,before:`unshift`},Ji={isPermalinkSymbol:!0},Yi={class:`header-anchor`,symbol:`#`,renderHref:Bi,renderAttrs:Vi},Xi=Hi(function(e,t,n,r,i){var a,o=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ui([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],t.ariaHidden?[[`aria-hidden`,`true`]]:[],Object.entries(t.renderAttrs(e,r))))}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Ji}),new r.Token(`link_close`,`a`,-1)];if(t.space){var s=typeof t.space==`string`?t.space:` `;r.tokens[i+1].children[qi[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:s}))}(a=r.tokens[i+1].children)[qi[t.placement]].apply(a,o)}),Object.assign(Xi.defaults,{space:!0,placement:`after`,ariaHidden:!1}),Zi=Hi(Xi.renderPermalinkImpl),Zi.defaults=Object.assign({},Xi.defaults,{ariaHidden:!0}),Qi=Hi(function(e,t,n,r,i){var a=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ui([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],Object.entries(t.renderAttrs(e,r))))})].concat(t.safariReaderFix?[new r.Token(`span_open`,`span`,1)]:[],r.tokens[i+1].children,t.safariReaderFix?[new r.Token(`span_close`,`span`,-1)]:[],[new r.Token(`link_close`,`a`,-1)]);r.tokens[i+1].children=a}),Object.assign(Qi.defaults,{safariReaderFix:!1}),$i=Hi(function(e,t,n,r,i){var a;if(![`visually-hidden`,`aria-label`,`aria-describedby`,`aria-labelledby`].includes(t.style))throw Error("`permalink.linkAfterHeader` called with unknown style option `"+t.style+"`");if(![`aria-describedby`,`aria-labelledby`].includes(t.style)&&!t.assistiveText)throw Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+t.style+"` style");if(t.style===`visually-hidden`&&!t.visuallyHiddenClass)throw Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var o=r.tokens[i+1].children.filter(function(e){return e.type===`text`||e.type===`code_inline`}).reduce(function(e,t){return e+t.content},``),s=[],c=[];if(t.class&&c.push([`class`,t.class]),c.push([`href`,t.renderHref(e,r)]),c.push.apply(c,Object.entries(t.renderAttrs(e,r))),t.style===`visually-hidden`){if(s.push(Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`class`,t.visuallyHiddenClass]]}),Object.assign(new r.Token(`text`,``,0),{content:t.assistiveText(o)}),new r.Token(`span_close`,`span`,-1)),t.space){var l=typeof t.space==`string`?t.space:` `;s[qi[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:l}))}s[qi[t.placement]](Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`aria-hidden`,`true`]]}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Ji}),new r.Token(`span_close`,`span`,-1))}else s.push(Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Ji}));t.style===`aria-label`?c.push([`aria-label`,t.assistiveText(o)]):[`aria-describedby`,`aria-labelledby`].includes(t.style)&&c.push([t.style,e]);var u=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ui(c)})].concat(s,[new r.Token(`link_close`,`a`,-1)]);(a=r.tokens).splice.apply(a,[i+3,0].concat(u)),t.wrapper&&(r.tokens.splice(i,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[0]+`
`})),r.tokens.splice(i+3+u.length+1,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[1]+`
`})))}),Object.assign($i.defaults,{style:`visually-hidden`,space:!0,placement:`after`,wrapper:null}),Gi.permalink={__proto__:null,legacy:zi,renderHref:Bi,renderAttrs:Vi,makePermalink:Hi,linkInsideHeader:Xi,ariaHidden:Zi,headerLink:Qi,linkAfterHeader:$i},Gi.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,`-`))},uniqueSlugStartIndex:1,tabIndex:`-1`,getTokensText:function(e){return e.filter(function(e){return[`text`,`code_inline`].includes(e.type)}).map(function(e){return e.content}).join(``)},failOnNonUnique:!0,permalink:!1,renderPermalink:zi,permalinkClass:Zi.defaults.class,permalinkSpace:Zi.defaults.space,permalinkSymbol:`¶`,permalinkBefore:Zi.defaults.placement===`before`,permalinkHref:Zi.defaults.renderHref,permalinkAttrs:Zi.defaults.renderAttrs},Gi.default=Gi})),ta=s(((e,t)=>{function n(e,t){var n,r,i=e.attrs[e.attrIndex(`href`)][1];for(n=0;n<t.length;++n){if(r=t[n],typeof r.matcher==`function`){if(r.matcher(i,r))return r;continue}return r}}function r(e,t,n){Object.keys(n).forEach(function(r){var i,a=n[r];r===`className`&&(r=`class`),i=t[e].attrIndex(r),i<0?t[e].attrPush([r,a]):t[e].attrs[i][1]=a})}function i(e,t){t=t?Array.isArray(t)?t:[t]:[],Object.freeze(t);var i=e.renderer.rules.link_open||this.defaultRender;e.renderer.rules.link_open=function(e,a,o,s,c){var l=n(e[a],t),u=l&&l.attrs;return u&&r(a,e,u),i(e,a,o,s,c)}}i.defaultRender=function(e,t,n,r,i){return i.renderToken(e,t,n)},t.exports=i}));function na(e,t,n,r){let i=Number(e[t].meta.id+1).toString(),a=``;return typeof r.docId==`string`&&(a=`-${r.docId}-`),a+i}function ra(e,t){let n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=`:${e[t].meta.subId}`),`[${n}]`}function ia(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i),o=i.rules.footnote_caption(e,t,n,r,i),s=a;return e[t].meta.subId>0&&(s+=`:${e[t].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${a}" id="fnref${s}">${o}</a></sup>`}function aa(e,t,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function oa(){return`</ol>
</section>
`}function sa(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),`<li id="fn${a}" class="footnote-item">`}function ca(){return`</li>
`}function la(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),` <a href="#fnref${a}" class="footnote-backref">\u21a9\uFE0E</a>`}function ua(e){let t=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=ia,e.renderer.rules.footnote_block_open=aa,e.renderer.rules.footnote_block_close=oa,e.renderer.rules.footnote_open=sa,e.renderer.rules.footnote_close=ca,e.renderer.rules.footnote_anchor=la,e.renderer.rules.footnote_caption=ra,e.renderer.rules.footnote_anchor_name=na;function r(e,t,r,i){let a=e.bMarks[t]+e.tShift[t],o=e.eMarks[t];if(a+4>o||e.src.charCodeAt(a)!==91||e.src.charCodeAt(a+1)!==94)return!1;let s;for(s=a+2;s<o;s++){if(e.src.charCodeAt(s)===32)return!1;if(e.src.charCodeAt(s)===93)break}if(s===a+2||s+1>=o||e.src.charCodeAt(++s)!==58)return!1;if(i)return!0;s++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={});let c=e.src.slice(a+2,s-2);e.env.footnotes.refs[`:${c}`]=-1;let l=new e.Token(`footnote_reference_open`,``,1);l.meta={label:c},l.level=e.level++,e.tokens.push(l);let u=e.bMarks[t],d=e.tShift[t],f=e.sCount[t],p=e.parentType,m=s,h=e.sCount[t]+s-(e.bMarks[t]+e.tShift[t]),g=h;for(;s<o;){let t=e.src.charCodeAt(s);if(n(t))t===9?g+=4-g%4:g++;else break;s++}e.tShift[t]=s-m,e.sCount[t]=g-h,e.bMarks[t]=m,e.blkIndent+=4,e.parentType=`footnote`,e.sCount[t]<e.blkIndent&&(e.sCount[t]+=e.blkIndent),e.md.block.tokenize(e,t,r,!0),e.parentType=p,e.blkIndent-=4,e.tShift[t]=d,e.sCount[t]=f,e.bMarks[t]=u;let _=new e.Token(`footnote_reference_close`,``,-1);return _.level=--e.level,e.tokens.push(_),!0}function i(e,n){let r=e.posMax,i=e.pos;if(i+2>=r||e.src.charCodeAt(i)!==94||e.src.charCodeAt(i+1)!==91)return!1;let a=i+2,o=t(e,i+1);if(o<0)return!1;if(!n){e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]);let t=e.env.footnotes.list.length,n=[];e.md.inline.parse(e.src.slice(a,o),e.md,e.env,n);let r=e.push(`footnote_ref`,``,0);r.meta={id:t},e.env.footnotes.list[t]={content:e.src.slice(a,o),tokens:n}}return e.pos=o+1,e.posMax=r,!0}function a(e,t){let n=e.posMax,r=e.pos;if(r+3>n||!e.env.footnotes||!e.env.footnotes.refs||e.src.charCodeAt(r)!==91||e.src.charCodeAt(r+1)!==94)return!1;let i;for(i=r+2;i<n;i++){if(e.src.charCodeAt(i)===32||e.src.charCodeAt(i)===10)return!1;if(e.src.charCodeAt(i)===93)break}if(i===r+2||i>=n)return!1;i++;let a=e.src.slice(r+2,i-1);if(e.env.footnotes.refs[`:${a}`]===void 0)return!1;if(!t){e.env.footnotes.list||(e.env.footnotes.list=[]);let t;e.env.footnotes.refs[`:${a}`]<0?(t=e.env.footnotes.list.length,e.env.footnotes.list[t]={label:a,count:0},e.env.footnotes.refs[`:${a}`]=t):t=e.env.footnotes.refs[`:${a}`];let n=e.env.footnotes.list[t].count;e.env.footnotes.list[t].count++;let r=e.push(`footnote_ref`,``,0);r.meta={id:t,subId:n,label:a}}return e.pos=i,e.posMax=n,!0}function o(e){let t,n,r,i=!1,a={};if(!e.env.footnotes||(e.tokens=e.tokens.filter(function(e){return e.type===`footnote_reference_open`?(i=!0,n=[],r=e.meta.label,!1):e.type===`footnote_reference_close`?(i=!1,a[`:`+r]=n,!1):(i&&n.push(e),!i)}),!e.env.footnotes.list))return;let o=e.env.footnotes.list;e.tokens.push(new e.Token(`footnote_block_open`,``,1));for(let n=0,r=o.length;n<r;n++){let r=new e.Token(`footnote_open`,``,1);if(r.meta={id:n,label:o[n].label},e.tokens.push(r),o[n].tokens){t=[];let r=new e.Token(`paragraph_open`,`p`,1);r.block=!0,t.push(r);let i=new e.Token(`inline`,``,0);i.children=o[n].tokens,i.content=o[n].content,t.push(i);let a=new e.Token(`paragraph_close`,`p`,-1);a.block=!0,t.push(a)}else o[n].label&&(t=a[`:${o[n].label}`]);t&&(e.tokens=e.tokens.concat(t));let i;i=e.tokens[e.tokens.length-1].type===`paragraph_close`?e.tokens.pop():null;let s=o[n].count>0?o[n].count:1;for(let t=0;t<s;t++){let r=new e.Token(`footnote_anchor`,``,0);r.meta={id:n,subId:t,label:o[n].label},e.tokens.push(r)}i&&e.tokens.push(i),e.tokens.push(new e.Token(`footnote_close`,``,-1))}e.tokens.push(new e.Token(`footnote_block_close`,``,-1))}e.block.ruler.before(`reference`,`footnote_def`,r,{alt:[`paragraph`,`reference`]}),e.inline.ruler.after(`image`,`footnote_inline`,i),e.inline.ruler.after(`footnote_inline`,`footnote_ref`,a),e.core.ruler.after(`inline`,`footnote_tail`,o)}var da=o((()=>{})),fa=s(((e,t)=>{var n=!0,r=!1,i=!1;t.exports=function(e,t){t&&(n=!t.enabled,r=!!t.label,i=!!t.labelAfter),e.core.ruler.after(`inline`,`github-task-lists`,function(e){for(var t=e.tokens,r=2;r<t.length;r++)s(t,r)&&(c(t[r],e.Token),a(t[r-2],`class`,`task-list-item`+(n?``:` enabled`)),a(t[o(t,r-2)],`class`,`contains-task-list`))})};function a(e,t,n){var r=e.attrIndex(t),i=[t,n];r<0?e.attrPush(i):e.attrs[r]=i}function o(e,t){for(var n=e[t].level-1,r=t-1;r>=0;r--)if(e[r].level===n)return r;return-1}function s(e,t){return p(e[t])&&m(e[t-1])&&h(e[t-2])&&g(e[t])}function c(e,t){if(e.children.unshift(l(e,t)),e.children[1].content=e.children[1].content.slice(3),e.content=e.content.slice(3),r){if(i){e.children.pop();var n=`task-item-`+Math.ceil(Math.random()*1e7-1e3);e.children[0].content=e.children[0].content.slice(0,-1)+` id="`+n+`">`,e.children.push(f(e.content,n,t))}else e.children.unshift(u(t)),e.children.push(d(t))}}function l(e,t){var r=new t(`html_inline`,``,0),i=n?` disabled="" `:``;return e.content.indexOf(`[ ] `)===0?r.content=`<input class="task-list-item-checkbox"`+i+`type="checkbox">`:(e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0)&&(r.content=`<input class="task-list-item-checkbox" checked=""`+i+`type="checkbox">`),r}function u(e){var t=new e(`html_inline`,``,0);return t.content=`<label>`,t}function d(e){var t=new e(`html_inline`,``,0);return t.content=`</label>`,t}function f(e,t,n){var r=new n(`html_inline`,``,0);return r.content=`<label class="task-list-item-label" for="`+t+`">`+e+`</label>`,r.attrs=[{for:t}],r}function p(e){return e.type===`inline`}function m(e){return e.type===`paragraph_open`}function h(e){return e.type===`list_item_open`}function g(e){return e.content.indexOf(`[ ] `)===0||e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0}}));function pa(e){return e.charAt(0).toUpperCase()+e.slice(1)}var ma,ha,ga=o((()=>{ma={note:`<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},ha=(e,t={})=>{let{markers:n=[`TIP`,`NOTE`,`IMPORTANT`,`WARNING`,`CAUTION`],icons:r=ma,matchCaseSensitive:i=!1,titles:a={},classPrefix:o=`markdown-alert`}=t,s=n===`*`?`\\w+`:n.join(`|`),c=RegExp(`^\\\\?\\[\\!(${s})\\]([^\\n\\r]*)`,i?``:`i`);e.core.ruler.after(`block`,`github-alerts`,e=>{let t=e.tokens;for(let e=0;e<t.length;e++)if(t[e].type===`blockquote_open`){let n=t[e],i=e;for(;t[e]?.type!==`blockquote_close`&&e<=t.length;)e+=1;let o=t[e],s=e,l=t.slice(i,s+1).find(e=>e.type===`inline`);if(!l)continue;let u=l.content.match(c);if(!u)continue;let d=u[1].toLowerCase(),f=u[2].trim()||(a[d]??pa(d)),p=r[d]??``;l.content=l.content.slice(u[0].length).trimStart(),n.type=`alert_open`,n.tag=`div`,n.meta={title:f,type:d,icon:p},o.type=`alert_close`,o.tag=`div`}}),e.renderer.rules.alert_open=function(e,t){let{title:n,type:r,icon:i}=e[t].meta;return`<div class="${o} ${o}-${r}"><p class="${o}-title">${i}${n}</p>`}}}));function N(e,t){return{tagName:e,nodeKind:`scalar`,implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(e=>String(e)),representTagName:t.representTagName??(()=>e)}}function _a(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`sequence`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function va(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`mapping`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function ya(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function ba(e,t){if(t){if(!js.test(e))return R}else if(!As.test(e))return R;let n=ya(e);return Number.isFinite(n)?n:R}function xa(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Sa(e,t){if(t){if(!Ps.test(e))return R}else if(!Ns.test(e))return R;let n=xa(e);return Number.isFinite(n)?n:R}function Ca(e){let t=e.replace(/_/g,``),n=1;if((t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`))return n*parseInt(t.slice(2),2);if(t.startsWith(`0x`))return n*parseInt(t.slice(2),16);if(t.includes(`:`)){let e=0;for(let n of t.split(`:`))e=e*60+Number(n);return n*e}return t!==`0`&&t[0]===`0`?n*parseInt(t,8):n*parseInt(t,10)}function wa(e){if(!Is.test(e))return R;let t=Ca(e);return Number.isFinite(t)?t:R}function Ta(e){if(!Rs.test(e))return R;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||zs.test(e)?r:R}function Ea(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Da(e,t){if(t){if(!Hs.test(e))return R;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)?r:R}if(!Vs.test(e))return R;let n=Number(e);return Number.isFinite(n)?n:R}function Oa(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function ka(e){if(!Ws.test(e))return R;let t=e.toLowerCase().replace(/_/g,``),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=0;if(t.includes(`:`)){for(let e of t.split(`:`))r=r*60+Number(e);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Gs.test(e)?r:R}function Aa(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function ja(e){let t=e.replace(/\s/g,``);if(t.length%4!=0||!Js.test(t))return R;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}function Ma(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function Na(e,t,n,r=0,i=0,a=0,o=0){let s=new Date(Date.UTC(e,t,n,r,i,a,o));return s.setUTCFullYear(e,t,n),s}function Pa(e){let t=Xs.exec(e);if(t===null&&(t=Zs.exec(e)),t===null)return R;let n=+t[1],r=t[2]-1,i=+t[3];if(!t[4]){let e=Na(n,r,i);return e.getUTCFullYear()!==n||e.getUTCMonth()!==r||e.getUTCDate()!==i?R:e}let a=+t[4],o=+t[5],s=+t[6],c=0;if(a>23||o>59||s>59)return R;if(t[7]){let e=t[7].slice(0,3);for(;e.length<3;)e+=`0`;c=+e}let l=Na(n,r,i,a,o,s,c);if(l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==i)return R;if(t[9]){let e=+t[10],n=+(t[11]||0);if(e>23||n>59)return R;let r=(e*60+n)*6e4;l.setTime(l.getTime()-(t[9]===`-`?-r:r))}return l}function Fa(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function Ia(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}function La(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Ra(){return{scalar:[],sequence:[],mapping:[]}}function za(e){let t=[];for(let n of e){let e=t.length;for(let r=0;r<t.length;r++){let i=t[r];if(i.nodeKind===n.nodeKind&&i.tagName===n.tagName&&i.matchByTagPrefix===n.matchByTagPrefix){e=r;break}}t[e]=n}return t}function Ba(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let e=0;e<t.length;e++){if(Array.isArray(t[e]))return null;typeof t[e]==`object`&&Object.prototype.toString.call(t[e])===`[object Object]`&&(t[e]=`[object Object]`)}return String(t)}return typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`?`[object Object]`:String(e)}function Va(e,t,n,r,i){let a=``,o=``,s=Math.floor(i/2)-1;return r-t>s&&(a=` ... `,t=r-s+a.length),n-r>s&&(o=` ...`,n=r+s-o.length),{str:a+e.slice(t,n).replace(/\t/g,`→`)+o,pos:r-t+a.length}}function Ha(e,t){return` `.repeat(Math.max(t-e.length,0))+e}function Ua(e,t){if(!e.buffer)return null;let n={...cc,...t},r=/\r?\n|\r|\0/g,i=[0],a=[],o,s=-1;for(;o=r.exec(e.buffer);)a.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);let c=``,l=Math.min(e.line+n.linesAfter,a.length).toString().length,u=n.maxLength-(n.indent+l+3);for(let t=1;t<=n.linesBefore&&!(s-t<0);t++){let r=Va(e.buffer,i[s-t],a[s-t],e.position-(i[s]-i[s-t]),u);c=`${` `.repeat(n.indent)}${Ha((e.line-t+1).toString(),l)} | ${r.str}\n${c}`}let d=Va(e.buffer,i[s],a[s],e.position,u);c+=`${` `.repeat(n.indent)}${Ha((e.line+1).toString(),l)} | ${d.str}\n`,c+=`${`-`.repeat(n.indent+l+3+d.pos)}^\n`;for(let t=1;t<=n.linesAfter&&!(s+t>=a.length);t++){let r=Va(e.buffer,i[s+t],a[s+t],e.position-(i[s]-i[s+t]),u);c+=`${` `.repeat(n.indent)}${Ha((e.line+t+1).toString(),l)} | ${r.str}\n`}return c.replace(/\n$/,``)}function Wa(e,t){let n=``;return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`\n\n${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}function Ga(e){switch(e){case 48:return`\0`;case 97:return`\x07`;case 98:return`\b`;case 116:return`	`;case 9:return`	`;case 110:return`
`;case 118:return`\v`;case 102:return`\f`;case 114:return`\r`;case 101:return`\x1B`;case 32:return` `;case 34:return`"`;case 47:return`/`;case 92:return`\\`;case 78:return``;case 95:return`\xA0`;case 76:return`\u2028`;case 80:return`\u2029`;default:return``}}function Ka(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function qa(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Ja(e){return e===120?2:e===117?4:8}function Ya(e,t,n){let r=0;for(;t<n;){let n=e.charCodeAt(t);if(n===10)r++,t++;else if(n===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(n===32||n===9)t++;else break}return{position:t,breaks:r}}function Xa(e){return e===1?` `:`
`.repeat(e-1)}function Za(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===10||t===13){r+=e.slice(a,o);let t=Ya(e,i,n);r+=Xa(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,o)}function Qa(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===39)r+=e.slice(a,i)+`'`,i+=2,a=o=i;else if(t===10||t===13){r+=e.slice(a,o);let t=Ya(e,i,n);r+=Xa(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function $a(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===92){r+=e.slice(a,i),i++;let t=e.charCodeAt(i);if(t===10||t===13)i=Ya(e,i,n).position;else if(t<256&&fc[t])r+=pc[t],i++;else{let n=Ja(t),a=0;for(;n>0;n--){i++;let t=qa(e.charCodeAt(i));a=(a<<4)+t}r+=Ka(a),i++}a=o=i}else if(t===10||t===13){r+=e.slice(a,o);let t=Ya(e,i,n);r+=Xa(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function eo(e,t,n,r,i,a){let o=r<0?0:r,s=e.slice(t,n).replace(/\r\n?/g,`
`),c=s===``?[]:(s.endsWith(`
`)?s.slice(0,-1):s).split(`
`),l=``,u=!1,d=0,f=!1;for(let e of c){let t=0;for(;t<o&&e.charCodeAt(t)===32;)t++;if(r<0||t>=e.length){d++;continue}let n=e.slice(o),i=n.charCodeAt(0);a?i===32||i===9?(f=!0,l+=`
`.repeat(u?1+d:d)):f?(f=!1,l+=`
`.repeat(d+1)):d===0?u&&(l+=` `):l+=`
`.repeat(d):l+=`
`.repeat(u?1+d:d),l+=n,u=!0,d=0}return i===V.KEEP?l+=`
`.repeat(u?1+d:d):i!==V.STRIP&&u&&(l+=`
`),l}function to(e,t){if(t.valueStart===dc)return``;let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case B.SINGLE_QUOTED:return Qa(e,n,r);case B.DOUBLE_QUOTED:return $a(e,n,r);case B.LITERAL_BLOCK:return eo(e,n,r,t.indent,t.chomping,!1);case B.FOLDED_BLOCK:return eo(e,n,r,t.indent,t.chomping,!0);default:return Za(e,n,r)}}function no(e,t){if(e.startsWith(`!<`)&&e.endsWith(`>`))return decodeURIComponent(e.slice(2,-1));let n=e.indexOf(`!`,1),r=n===-1?`!`:e.slice(0,n+1),i=t?.[r]??mc[r]??r;return decodeURIComponent(i)+decodeURIComponent(e.slice(r.length))}function ro(e){return`tagStart`in e&&e.tagStart!==hc?e.tagStart:`anchorStart`in e&&e.anchorStart!==hc?e.anchorStart:`valueStart`in e&&e.valueStart!==hc?e.valueStart:`start`in e?e.start:0}function P(e,t){lc.throwAt(e.source,e.position,t,e.filename)}function io(e,t,n,r){try{return n.finalize(r)}catch(n){if(n instanceof lc)throw n;lc.throwAt(e.source,t,n instanceof Error?n.message:String(n),e.filename)}}function ao(e,t){let n=to(e.source,t),r=t.tagStart===hc?``:e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==``){if(r===`!`)return{value:n,tag:i};let t=no(r,e.tagHandlers),a=e.schema.lookupScalarTag(t);if(a){let r=a.resolve(n,!0,t);return r===R&&P(e,`cannot resolve a node with !<${t}> explicit tag`),{value:r,tag:a}}let o=e.schema.lookupMappingTag(t)??e.schema.lookupSequenceTag(t);if(o){n!==``&&P(e,`cannot resolve a node with !<${t}> explicit tag`);let r=o.create(t);return{value:o.carrierIsResult?r:io(e,e.position,o,r),tag:o}}P(e,`unknown scalar tag !<${t}>`)}return t.style===B.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function oo(e,t,n){let r=t.tagStart===hc?``:e.source.slice(t.tagStart,t.tagEnd);return r===``||r===`!`?n:no(r,e.tagHandlers)}function so(e){return e.nodeKind===`mapping`}function co(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&P(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function lo(e,t,n,r){co(e);for(let i of r.keys(n)){if(co(e),t.tag.has(t.value,i))continue;let a=t.tag.addPair(t.value,i,r.get(n,i));a&&P(e,a),t.overridable??=new Set,t.overridable.add(i)}}function uo(e,t,n,r){if(e.position=t.keyPosition,so(r))lo(e,t,n,r);else if(r.nodeKind===`sequence`&&Array.isArray(n)){n.length>100&&P(e,`abnormal merge sequence size`);for(let r of n){let n=e.nodeTags.get(r);n||P(e,`cannot merge mappings; the provided source object is unacceptable`),lo(e,t,r,n)}}else P(e,`cannot merge mappings; the provided source object is unacceptable`)}function fo(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){uo(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&P(e,`duplicated mapping key`);let a=t.tag.addPair(t.value,n,r);a&&P(e,a),t.overridable?.delete(n)}function po(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind===`document`)r.value=t,r.hasValue=!0;else if(r.kind===`sequence`){so(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&P(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,fo(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===gc}function mo(e,t,n,r,i){if(t.anchorStart!==hc){let a={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),a),a}return null}function ho(e,t){let n={..._c,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let e=n.events[n.eventIndex++];switch(n.position=ro(e),e.type){case z.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let t of e.directives)t.kind===`tag`&&(n.tagHandlers[t.handle]=t.prefix);n.frames.push({kind:`document`,position:n.position,value:void 0,hasValue:!1});break;case z.SCALAR:{let{value:t,tag:r}=ao(n,e);mo(n,e,t,r,!0),po(n,t,r);break}case z.SEQUENCE:{let t=oo(n,e,`tag:yaml.org,2002:seq`),r=n.schema.lookupSequenceTag(t);r||P(n,`unknown sequence tag !<${t}>`);let i=r.create(t),a=mo(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`sequence`,position:n.position,value:i,tag:r,anchor:a,index:0});break}case z.MAPPING:{let t=oo(n,e,`tag:yaml.org,2002:map`),r=n.schema.lookupMappingTag(t);r||P(n,`unknown mapping tag !<${t}>`);let i=r.create(t),a=mo(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`mapping`,position:n.position,value:i,tag:r,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case z.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&P(n,`aliases exceeded maxAliases (${n.maxAliases})`);let t=n.source.slice(e.anchorStart,e.anchorEnd),r=n.anchors.get(t);r||P(n,`unidentified alias "${t}"`),r.isValueFinal||P(n,`recursive alias "${t}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),po(n,r.value,r.tag);break}case z.POP:{let e=n.frames.pop();if(e.kind===`mapping`&&e.hasKey&&(n.position=e.keyPosition,P(n,`incomplete mapping pair in event stream`)),e.kind===`document`)n.documents.push(e.value);else{let t=e.tag.carrierIsResult?e.value:io(n,e.position,e.tag,e.value);e.anchor&&(e.anchor.value=t,e.anchor.isValueFinal=!0),po(n,t,e.tag)}break}}}return n.documents}function go(e,t,n){e.events.push({type:z.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function _o(e,t,n,r,i,a,o){e.events.push({type:z.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function vo(e,t,n,r,i,a,o){e.events.push({type:z.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function yo(e,t){e.events.splice(t.eventsLength,0,{type:z.MAPPING,start:t.position,anchorStart:H,anchorEnd:H,tagStart:H,tagEnd:H,style:uc.FLOW})}function bo(e,t,n,r,i,a,o,s,c=V.CLIP,l=-1,u=!1){e.events.push({type:z.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:a,tagEnd:o,style:s,chomping:c,indent:l,fast:u})}function xo(e,t,n){e.events.push({type:z.ALIAS,anchorStart:t,anchorEnd:n})}function So(e){e.events.push({type:z.POP})}function Co(e){bo(e,H,H,H,H,H,H,B.PLAIN)}function wo(){return{anchorStart:H,anchorEnd:H,tagStart:H,tagEnd:H}}function To(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Eo(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function F(e,t){lc.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function I(e){return e===10||e===13}function Do(e){return e===9||e===32}function Oo(e){return Do(e)||I(e)}function ko(e){return e===0||Oo(e)}function Ao(e){return e===44||e===91||e===93||e===123||e===125}function jo(e){return e>=48&&e<=57?e-48:-1}function Mo(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function No(e){return e===120?2:e===117?4:e===85?8:0}function Po(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function Fo(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function L(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||Oo(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;Do(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!I(r)&&r!==0);if(!I(r))break;for(Fo(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function Io(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let n=e.input.charCodeAt(t+3);return n===0||Oo(n)}return!1}function Lo(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function Ro(e){if(e.position!==e.lineStart)return!1;if(Io(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=To(e);Lo(e),L(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&Io(e));return Eo(e,t),r}function zo(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!I(t);)t=e.input.charCodeAt(++e.position)}function Bo(e,t,n){Cc.test(e.input.slice(t,n))&&F(e,`the stream contains non-printable characters`)}function Vo(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==H&&F(e,`duplication of a tag property`);let r=e.position,i=!1,a=!1,o=`!`,s=e.input.charCodeAt(++e.position);s===60?(i=!0,s=e.input.charCodeAt(++e.position)):s===33&&(a=!0,o=`!!`,s=e.input.charCodeAt(++e.position));let c=e.position,l;if(i){for(;s!==0&&s!==62;)s=e.input.charCodeAt(++e.position);s!==62&&F(e,`unexpected end of the stream within a verbatim tag`),l=e.input.slice(c,e.position),e.position++}else{for(;s!==0&&!Oo(s)&&!(n&&Ao(s));)s===33&&(a?F(e,`tag suffix cannot contain exclamation marks`):(o=e.input.slice(c-1,e.position+1),Tc.test(o)||F(e,`named tag handle cannot contain such characters`),a=!0,c=e.position+1)),s=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),wc.test(l)&&F(e,`tag suffix cannot contain flow indicator characters`)}return l&&!(i?Oc.test(l):kc.test(l))&&F(e,`tag name cannot contain such characters: ${l}`),!i&&o!==`!`&&o!==`!!`&&!vc.call(e.tagHandlers,o)&&F(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Ho(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==H&&F(e,`duplication of an anchor property`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Oo(e.input.charCodeAt(e.position))&&!Ao(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&F(e,`name of an anchor node must contain at least one character`),t.anchorStart=n,t.anchorEnd=e.position,!0}function Uo(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==H||t.tagStart!==H)&&F(e,`alias node should not have any properties`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Oo(e.input.charCodeAt(e.position))&&!Ao(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&F(e,`name of an alias node must contain at least one character`),xo(e,n,e.position),!0}function Wo(e,t){L(e,!1),e.lineIndent<t&&F(e,`deficient indentation`)}function Go(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let t=e.position;return e.position++,bo(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,B.SINGLE_QUOTED,V.CLIP,-1,i),!0}I(a)?(i=!1,Wo(e,t)):e.position===e.lineStart&&Io(e)?F(e,`unexpected end of the document within a single quoted scalar`):a!==9&&a<32?F(e,`expected valid JSON character`):e.position++}F(e,`unexpected end of the stream within a single quoted scalar`)}function Ko(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===34){let t=e.position;return e.position++,bo(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,B.DOUBLE_QUOTED,V.CLIP,-1,i),!0}if(a===92){i=!1;let n=e.input.charCodeAt(++e.position);if(I(n))Wo(e,t);else if(Po(n))e.position++;else{let t=No(n);for(t===0&&F(e,`unknown escape sequence`);t-->0;)e.position++,Mo(e.input.charCodeAt(e.position))<0&&F(e,`expected hexadecimal character`);e.position++}}else I(a)?(i=!1,Wo(e,t)):e.position===e.lineStart&&Io(e)?F(e,`unexpected end of the document within a double quoted scalar`):a!==9&&a<32?F(e,`expected valid JSON character`):e.position++}F(e,`unexpected end of the stream within a double quoted scalar`)}function qo(e,t,n){let r=e.input.charCodeAt(e.position),i=V.CLIP,a=-1,o=!1;if(r!==124&&r!==62)return!1;let s=r===124?B.LITERAL_BLOCK:B.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let n=e.input.charCodeAt(e.position),r=jo(n);if(n===43||n===45)i!==V.CLIP&&F(e,`repeat of a chomping mode identifier`),i=n===43?V.KEEP:V.STRIP,e.position++;else if(r>=0)r===0&&F(e,`bad explicit indentation width of a block scalar; it cannot be less than one`),o&&F(e,`repeat of an indentation width identifier`),a=t+r-1,o=!0,e.position++;else break}let c=!1;for(;Do(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&zo(e),I(e.input.charCodeAt(e.position))?Fo(e):e.input.charCodeAt(e.position)!==0&&F(e,`a line break is expected`);let l=o?a:-1,u=0,d=e.position,f=e.position;for(;e.input.charCodeAt(e.position)!==0;){let n=e.position,r=0;for(;e.input.charCodeAt(n+r)===32;)r++;let i=e.input.charCodeAt(n+r);if(i===0){l>=0?r>l&&(f=n+r):r>0&&(f=n+r);break}if(Ro(e))break;if(!o&&l===-1&&I(i)&&(u=Math.max(u,r)),!o&&l===-1&&!I(i)&&(i===9&&r<t&&(e.position=n+r,F(e,`tab characters must not be used in indentation`)),r>=t&&r<u&&(e.position=n+r,F(e,`bad indentation of a mapping entry`))),l===-1&&i!==0&&!I(i)&&r<t){e.lineIndent=r,e.position=n+r;break}!o&&i!==0&&!I(i)&&l===-1&&(l=r);let a=l===-1?t+1:l;if(i!==0&&!I(i)&&r<a){e.lineIndent=r,e.position=n+r;break}zo(e),f=e.position,I(e.input.charCodeAt(e.position))&&(Fo(e),f=e.position)}return Bo(e,d,f),bo(e,d,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,s,i,l),!0}function Jo(e,t){let n=e.input.charCodeAt(e.position),r=t===yc;if(n===0||Oo(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||r&&Ao(n))return!1;if(n===63||n===45){let t=e.input.charCodeAt(e.position+1);if(ko(t)||r&&Ao(t))return!1}return!0}function Yo(e,t,n,r){if(!Jo(e,n))return!1;let i=e.position,a=e.position,o=e.input.charCodeAt(e.position),s=n===yc,c=!1;for(;o!==0&&!Ro(e);){if(o===58){let t=e.input.charCodeAt(e.position+1);if(ko(t)||s&&Ao(t))break}else if(o===35){if(Oo(e.input.charCodeAt(e.position-1)))break}else if(s&&Ao(o))break;else if(I(o)){let n=e.position,r=e.line,i=e.lineStart,a=e.lineIndent;if(L(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=n,e.line=r,e.lineStart=i,e.lineIndent=a;break}Do(o)||(a=e.position+1),o=e.input.charCodeAt(++e.position)}return a!==i&&(Bo(e,i,a),bo(e,i,a,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,B.PLAIN,V.CLIP,-1,!c),!0)}function Xo(e,t){let n=e.line;L(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&F(e,`deficient indentation`)}function Zo(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,a=e.position,o=!0;if(r!==91&&r!==123)return!1;let s=i?125:93;for(i?vo(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,uc.FLOW):_o(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,uc.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){Xo(e,t);let n=e.input.charCodeAt(e.position);if(n===s)return e.position++,So(e),!0;o?n===44&&F(e,`expected the node content, but found ','`):F(e,`missed comma between flow collection entries`);let r=!1,a=!1;n===63&&Oo(e.input.charCodeAt(e.position+1))&&(r=a=!0,e.position+=1,Xo(e,t));let c=e.line,l=To(e),u=es(e,t,yc,!1,!0);Xo(e,t),n=e.input.charCodeAt(e.position),(i||a||e.line===c)&&n===58?(r=!0,e.position++,Xo(e,t),i||yo(e,l),u||Co(e),es(e,t,yc,!1,!0)||Co(e),Xo(e,t),i||So(e)):i&&r?(u||Co(e),Co(e)):i?Co(e):r&&(yo(e,l),u||Co(e),Co(e),So(e)),n=e.input.charCodeAt(e.position),n===44?(o=!0,e.position++):o=!1}F(e,`unexpected end of the stream within a flow collection`)}function Qo(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!ko(e.input.charCodeAt(e.position+1)))return!1;for(_o(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,uc.BLOCK);e.input.charCodeAt(e.position)===45&&ko(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,F(e,`tab characters must not be used in indentation`));let n=e.line;e.position++;let r=L(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&ko(e.input.charCodeAt(e.position+1))&&F(e,`bad indentation of a sequence entry`),r&&e.lineIndent<=t?Co(e):es(e,t,xc,!1,!0),L(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&F(e,`bad indentation of a sequence entry`),e.line===n&&e.input.charCodeAt(e.position)===45&&ko(e.input.charCodeAt(e.position+1))&&F(e,`bad indentation of a sequence entry`)}return So(e),!0}function $o(e,t,n,r){let i=!1,a=!1,o=!1,s=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,F(e,`tab characters must not be used in indentation`));let l=e.input.charCodeAt(e.position+1),u=e.line;if((c===63||c===58)&&ko(l))o||=(vo(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,uc.BLOCK),!0),c===63?(i&&Co(e),a=!0,i=!0):i?i=!1:(Co(e),a=!0,i=!1),e.position+=1,s=!0;else{i&&=(Co(e),!1);let t=To(e);if(!es(e,n,bc,!1,!0))break;if(e.line===u){for(c=e.input.charCodeAt(e.position);Do(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),ko(c)||F(e,`a whitespace character is expected after the key-value separator within a block mapping`),o||=(e.events.splice(t.eventsLength,0,{type:z.MAPPING,start:t.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:uc.BLOCK}),!0),a=!0,i=!1,s=!1;else if(a)F(e,`expected ':' after a mapping key`);else return r.anchorStart!==H||r.tagStart!==H?(Eo(e,t),!1):!0}else if(a)F(e,`can not read a block mapping entry; a multiline key may not be an implicit key`);else return r.anchorStart!==H||r.tagStart!==H?(Eo(e,t),!1):!0}if(es(e,t,Sc,!0,s)&&(s=!1),i||(s&&=(Co(e),!1)),L(e,!0),c=e.input.charCodeAt(e.position),(e.line===u||e.lineIndent>t)&&c!==0)F(e,`bad indentation of a mapping entry`);else if(e.lineIndent<t)break}return a?(i&&Co(e),o&&So(e),!0):!1}function es(e,t,n,r,i,a=!0){e.depth>=e.maxDepth&&F(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,s=!1,c=!1,l=null,u=wo(),d=n===Sc||n===xc,f=d,p=d;if(r&&L(e,!0)&&(s=!0,o=e.lineIndent>t?1:e.lineIndent===t?0:-1),o===1)for(;;){let r=e.input.charCodeAt(e.position),i=To(e);if(s&&o!==1&&(r===33||r===38))break;if(s&&p&&(u.tagStart!==H||u.anchorStart!==H)&&(r===33||r===38)){let n=To(e),r=t+1;if($o(e,e.position-e.lineStart,r,u)&&e.events[n.eventsLength]?.type===z.MAPPING)return e.depth--,!0;Eo(e,n)}if(s&&(r===33&&u.tagStart!==H||r===38&&u.anchorStart!==H)||!Vo(e,u,n===yc)&&!Ho(e,u))break;l===null&&(l=i),L(e,!0)?(s=!0,f=p,o=e.lineIndent>t?1:e.lineIndent===t?0:-1):f=!1}if(f&&=s||i,o===1||n===Sc){let r=n===yc||n===bc?t:t+1,i=e.position-e.lineStart;if(o===1){if(f&&(Qo(e,i,u)||$o(e,i,r,u))||Zo(e,r,u))c=!0;else{let t=e.input.charCodeAt(e.position);if(l!==null&&a&&p&&!f&&t!==124&&t!==62){let t=To(e),n=l.position-l.lineStart;Eo(e,l),$o(e,n,r,wo())&&e.events[t.eventsLength]?.type===z.MAPPING?c=!0:Eo(e,t)}!c&&(d&&qo(e,r,u)||Go(e,r,u)||Ko(e,r,u)||Uo(e,u)||Yo(e,r,n,u))&&(c=!0)}}else o===0&&(c=f&&Qo(e,i,u))}return d&&=!c,!c&&(u.anchorStart!==H||u.tagStart!==H||d)&&(bo(e,H,H,u.anchorStart,u.anchorEnd,u.tagStart,u.tagEnd,B.PLAIN),c=!0),e.depth--,c||u.anchorStart!==H||u.tagStart!==H}function ts(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Oo(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&F(e,`directive name must not be less than one character in length`);e.input.charCodeAt(e.position)!==0&&!I(e.input.charCodeAt(e.position));){for(;Do(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||I(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!Oo(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(t,e.position))}if(I(e.input.charCodeAt(e.position))&&Fo(e),n===`YAML`){e.directives.some(e=>e.kind===`yaml`)&&F(e,`duplication of %YAML directive`),r.length!==1&&F(e,`YAML directive accepts exactly one argument`);let t=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);t===null&&F(e,`ill-formed argument of the YAML directive`),parseInt(t[1],10)!==1&&F(e,`unacceptable YAML version of the document`),e.directives.push({kind:`yaml`,version:r[0]})}else if(n===`TAG`){r.length!==2&&F(e,`TAG directive accepts exactly two arguments`);let[t,n]=r;Tc.test(t)||F(e,`ill-formed tag handle (first argument) of the TAG directive`),vc.call(e.tagHandlers,t)&&F(e,`there is a previously declared suffix for "${t}" tag handle`),Ac.test(n)||F(e,`ill-formed tag prefix (second argument) of the TAG directive`),e.tagHandlers[t]=n,e.directives.push({kind:`tag`,handle:t,prefix:n})}return!0}function ns(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(L(e,!0);ts(e);)t=!0,L(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&ko(e.input.charCodeAt(e.position+3))){n=!0;let t=e.line;e.position+=3,L(e,!0),i=e.line>t}else t&&F(e,`directives end mark is expected`);let a=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&Io(e)){e.position+=3,L(e,!0);return}if(go(e,n,!1),es(e,e.lineIndent-1,Sc,!1,i,i)||Co(e),L(e,!0),e.position===e.lineStart&&Io(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let t=e.line;e.position+=3,L(e,!0),e.line===t&&e.position<e.length&&F(e,`end of the stream or a document separator is expected`)}let o=e.events[a];o?.type===z.DOCUMENT&&(o.explicitEnd=r),So(e),!r&&e.position<e.length&&!Ro(e)&&F(e,`end of the stream or a document separator is expected`)}function rs(e,t){let n=e.length,r={...jc,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf(`\0`);for(i!==-1&&lc.throwAt(e,i,`null byte is not allowed in input`,r.filename);r.position<r.length&&(Lo(r),L(r,!0),!(r.position>=r.length));){let e=r.position;ns(r),r.position===e&&F(r,`can not read a document`)}return r.events}function is(e,t={}){let n={...Mc,...t},r=String(e),i=Object.keys(jc),a=Object.keys(_c);return ho(rs(r,Ia(n,i)),{...Ia(n,a),source:r})}function as(e,t){let n=is(e,t);if(n.length===0)throw new lc(`expected a document, but the input is empty`);if(n.length===1)return n[0];throw new lc(`expected a single document in the stream, but found more`)}function os(e,t){return!!(e&1<<t)}function ss(e){return e.presenterOptions.quoteStyle===`single`&&os(e.allowedStylesMask,B.SINGLE_QUOTED)?B.SINGLE_QUOTED:B.DOUBLE_QUOTED}function cs(e){e.presenterOptions.quoteFlowKeys&&e.isKey&&e.flowOnly&&e.style===B.PLAIN&&(e.style=B.DOUBLE_QUOTED)}function ls(e){e.style===B.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=B.DOUBLE_QUOTED)}function us(e){e.style===B.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=B.DOUBLE_QUOTED)}function ds(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==B.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?B.DOUBLE_QUOTED:ss(e)))}function fs(e){if(e.style!==B.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!os(e.allowedStylesMask,B.LITERAL_BLOCK)){n&&(e.style=B.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=B.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),a=0,o=!1;for(;a<=t.length;){let e=t.length,n=t.indexOf(`
`,a);n!==-1&&(e=n);let r=t.slice(a,e);if(r.length>i&&r[0]!==` `&&/ [^ \t]/.test(r)&&(o=!0),n===-1)break;a=n+1}o?e.style=B.FOLDED_BLOCK:n&&(e.style=B.LITERAL_BLOCK)}function ps(e){e.style===B.PLAIN&&!os(e.allowedStylesMask,B.PLAIN)&&(e.style=ss(e))}function ms(e){os(e.allowedStylesMask,e.style)||(e.style=B.DOUBLE_QUOTED)}var R,hs,gs,_s,vs,ys,bs,xs,Ss,Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc,nc,rc,ic,ac,oc,sc,cc,lc,z,B,uc,V,dc,fc,pc,mc,hc,gc,_c,H,vc,yc,bc,xc,Sc,Cc,wc,Tc,Ec,Dc,Oc,kc,Ac,jc,Mc,Nc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol=o((()=>{R=Symbol(`NOT_RESOLVED`),hs=N(`tag:yaml.org,2002:str`,{resolve:e=>e,identify:e=>typeof e==`string`}),gs=[``,`~`,`null`,`Null`,`NULL`],_s=N(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>gs.indexOf(e)===-1?R:null,identify:e=>e===null,represent:()=>`null`}),vs=N(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[`n`],resolve:(e,t)=>e===`null`||t&&e===``?null:R,identify:e=>e===null,represent:()=>`null`}),ys=[``,`~`,`null`,`Null`,`NULL`],bs=N(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>ys.indexOf(e)===-1?R:null,identify:e=>e===null,represent:()=>`null`}),xs=[`true`,`True`,`TRUE`],Ss=[`false`,`False`,`FALSE`],Cs=N(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`T`,`f`,`F`],resolve:e=>xs.indexOf(e)!==-1||Ss.indexOf(e)===-1&&R,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),ws=[`true`],Ts=[`false`],Es=N(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`f`],resolve:e=>ws.indexOf(e)!==-1||Ts.indexOf(e)===-1&&R,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Ds=[`true`,`True`,`TRUE`,`y`,`Y`,`yes`,`Yes`,`YES`,`on`,`On`,`ON`],Os=[`false`,`False`,`FALSE`,`n`,`N`,`no`,`No`,`NO`,`off`,`Off`,`OFF`],ks=N(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`y`,`Y`,`n`,`N`,`t`,`T`,`f`,`F`,`o`,`O`],resolve:e=>Ds.indexOf(e)!==-1||Os.indexOf(e)===-1&&R,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),As=RegExp(`^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),js=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Ms=N(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:ba,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Ns=RegExp(`^-?(?:0|[1-9][0-9]*)$`),Ps=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Fs=N(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Sa,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Is=RegExp(`^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$`),Ls=N(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:wa,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Rs=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),zs=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Bs=N(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Ta,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Ea}),Vs=RegExp(`^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$`),Hs=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Us=N(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Da,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Oa}),Ws=RegExp(`^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Gs=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Ks=N(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:ka,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Aa}),qs=N(`tag:yaml.org,2002:merge`,{implicit:!0,implicitFirstChars:[`<`],resolve:(e,t)=>e===`<<`||t&&e===``?`<<`:R,identify:()=>!1}),Js=/^[A-Za-z0-9+/]*={0,2}$/,Ys=N(`tag:yaml.org,2002:binary`,{resolve:ja,identify:e=>Object.prototype.toString.call(e)===`[object Uint8Array]`,represent:Ma}),Xs=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$`),Zs=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$`),Qs=N(`tag:yaml.org,2002:timestamp`,{implicit:!0,implicitFirstChars:[...`0123456789`],resolve:Pa,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),$s=_a(`tag:yaml.org,2002:seq`,{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray}),ec=_a(`tag:yaml.org,2002:omap`,{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return`cannot resolve an ordered map item`;n=t.keys().next().value}else if(Fa(t)){let e=Object.keys(t);if(e.length!==1)return`cannot resolve an ordered map item`;n=e[0]}else return`cannot resolve an ordered map item`;return e.seen.has(n)?`duplicate key in ordered map`:(e.seen.add(n),e.list.push(t),``)},finalize:e=>e.list,identify:()=>!1}),tc=_a(`tag:yaml.org,2002:pairs`,{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size===1?(e.push(t.entries().next().value),``):`cannot resolve a pairs item`;if(Object.prototype.toString.call(t)!==`[object Object]`)return`cannot resolve a pairs item`;let n=t,r=Object.keys(n);return r.length===1?(e.push([r[0],n[r[0]]]),``):`cannot resolve a pairs item`},identify:()=>!1}),nc=va(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Fa,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(typeof t==`object`&&t)return`object-based map does not support complex keys`;let r=String(t);return r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``},has:(e,t)=>typeof t==`object`&&t?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),rc=va(`tag:yaml.org,2002:set`,{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n===null?(e.add(t),``):`cannot resolve a set item`,has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null}),ic=class e{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(e){let t=za(e),n=[],r=La(),i=Ra();for(let e of t){if(e.nodeKind===`scalar`&&e.implicit){if(e.matchByTagPrefix)throw Error(`Implicit scalar tags cannot match by tag prefix`);n.push(e)}switch(e.nodeKind){case`scalar`:e.matchByTagPrefix?i.scalar.push(e):r.scalar[e.tagName]=e;break;case`sequence`:e.matchByTagPrefix?i.sequence.push(e):r.sequence[e.tagName]=e;break;case`mapping`:e.matchByTagPrefix?i.mapping.push(e):r.mapping[e.tagName]=e}}let a=n.filter(e=>e.implicitFirstChars===null),o=new Set;for(let e of n)if(e.implicitFirstChars!==null)for(let t of e.implicitFirstChars)o.add(t);let s=new Map;for(let e of o)s.set(e,n.filter(t=>t.implicitFirstChars===null||t.implicitFirstChars.indexOf(e)!==-1));let c=r.scalar[`tag:yaml.org,2002:str`];if(!c)throw Error(`schema does not define the default scalar tag (tag:yaml.org,2002:str)`);this.tags=t,this.implicitScalarTags=n,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=c,this.defaultSequenceTag=r.sequence[`tag:yaml.org,2002:seq`],this.defaultMappingTag=r.mapping[`tag:yaml.org,2002:map`],this.exact=r,this.prefix=i}lookupScalarTag(e){let t=this.exact.scalar[e];if(t)return t;for(let t of this.prefix.scalar)if(e.startsWith(t.tagName))return t}lookupSequenceTag(e){let t=this.exact.sequence[e];if(t)return t;for(let t of this.prefix.sequence)if(e.startsWith(t.tagName))return t}lookupMappingTag(e){let t=this.exact.mapping[e];if(t)return t;for(let t of this.prefix.mapping)if(e.startsWith(t.tagName))return t}resolveImplicitScalarTag(e){let t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(let n of t){let t=n.resolve(e,!1,n.tagName);if(t!==R)return{value:t,tag:n}}let n=this.defaultScalarTag;return{value:n.resolve(e,!1,n.tagName),tag:n}}withTags(...t){let n=[];for(let e of t)n=n.concat(e);return new e([...this.tags,...n])}},ac=new ic([hs,$s,nc]),new ic([...ac.tags,vs,Es,Fs,Us]),oc=new ic([...ac.tags,_s,Cs,Ms,Bs]),sc=new ic([...ac.tags,bs,ks,Ls,Ks,Qs,qs,Ys,ec,tc,rc]),sc.withTags({...Ls,resolve:(e,t,n)=>{let r=Ls.resolve(e,t,n);return r===R?Ms.resolve(e,t,n):r}},{...Ks,resolve:(e,t,n)=>{let r=Ks.resolve(e,t,n);return r===R?Bs.resolve(e,t,n):r}}),va(`tag:yaml.org,2002:map`,{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),``),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Fa(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let e of Object.keys(n))t.set(e,n[e]);return t}}),va(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Fa,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=Ba(t);return r===null?`nested arrays are not supported inside keys`:(r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``)},has:(e,t)=>{let n=Ba(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),cc={maxLength:79,indent:1,linesBefore:3,linesAfter:2},lc=class e extends Error{reason;mark;constructor(e,t){super(),this.name=`YAMLException`,this.reason=e,this.mark=t,this.message=Wa(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Wa(this,e)}`}static throwAt(t,n,r,i=``){let a=0,o=0;for(let e=0;e<n;e++){let n=t.charCodeAt(e);n===10?(a++,o=e+1):n===13&&(a++,t.charCodeAt(e+1)===10&&e++,o=e+1)}let s={name:i,buffer:t,position:n,line:a,column:n-o};throw s.snippet=Ua(s),new e(r,s)}},z={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},B={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},uc={BLOCK:1,FLOW:2},V={CLIP:1,STRIP:2,KEEP:3},dc=-1,fc=Array(256),pc=Array(256);for(let e=0;e<256;e++)fc[e]=+!!Ga(e),pc[e]=Ga(e);mc=Object.assign(Object.create(null),{"!":`!`,"!!":`tag:yaml.org,2002:`}),hc=-1,gc=`tag:yaml.org,2002:merge`,_c={filename:``,schema:oc,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1},H=-1,vc=Object.prototype.hasOwnProperty,yc=1,bc=2,xc=3,Sc=4,Cc=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,wc=/[,\[\]{}]/,Tc=/^(?:!|!!|![0-9A-Za-z-]+!)$/,Ec=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Dc=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Oc=RegExp(`^(?:${Ec})*$`),kc=RegExp(`^(?:${Dc})+$`),Ac=RegExp(`^(?:!(?:${Ec})*|${Dc}(?:${Ec})*)$`),jc={filename:``,maxDepth:100},Mc={...jc,..._c},Nc={applyQuoteFlowKeysOption:cs,doubleQuoteForInvisibles:ls,doubleQuoteWhitespaceOnly:us,applyForceQuotesOption:ds,tryLongOrMultilineAsBlock:fs,quoteInvalidPlain:ps,fallbackToDoubleQuoted:ms},Pc=`[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]`,Fc=`[\\n\\r]`,Ic=`\\uFEFF`,Lc=`[ \\t]`,Rc=`(?:(?!(?:${Fc}|${Ic}))${Pc})`,zc=`(?:(?!${Lc})${Rc})`,Bc=`[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]`,Vc=`[-?:,\\[\\]{}#&*!|>'"%@\`]`,Hc=`[,\\[\\]{}]`,Uc=zc,Wc=`(?:(?!${Hc})${zc})`,Gc=`(?:(?:(?!${Vc})${zc})|[?:-](?=${Uc}))`,Kc=`(?:(?:(?!${Vc})${zc})|[?:-](?=${Wc}))`,qc=`(?:(?:(?![:#])${Uc})|:(?=${Uc}))#*`,Jc=`(?:(?:(?![:#])${Wc})|:(?=${Wc}))#*`,Yc=`(?:${Lc}*${qc})*`,Xc=`(?:${Lc}*${Jc})*`,Zc=`${Gc}#*${Yc}`,Qc=`${Kc}#*${Xc}`,$c=Zc,el=Qc,tl=`\\n+${qc}${Yc}`,nl=`\\n+${Jc}${Xc}`,rl=`${Zc}(?:${tl})*`,il=`${Qc}(?:${nl})*`,RegExp(`^(?:${rl})$`,`u`),RegExp(`^(?:${il})$`,`u`),RegExp(`^(?:${$c})$`,`u`),RegExp(`^(?:${el})$`,`u`),RegExp(`^(?:${Bc})*$`,`u`),RegExp(`^(?:${Bc}|\\n)*$`,`u`),RegExp(`^(?:${Rc}|\\n)*$`,`u`),al={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:`single`,forceQuotes:!1,scalarStyleRules:Object.keys(Nc).map(e=>Reflect.get(Nc,e)),tagBeforeAnchor:!1},{...al},z.DOCUMENT,z.SEQUENCE,z.MAPPING,z.SCALAR,z.ALIAS,z.POP,B.PLAIN,B.SINGLE_QUOTED,B.DOUBLE_QUOTED,B.LITERAL_BLOCK,B.FOLDED_BLOCK,uc.BLOCK,uc.FLOW,V.CLIP,V.STRIP,V.KEEP})),sl=s(((e,t)=>{t.exports=function(e,t){var n=`-`,r=n.charCodeAt(0),i=n.length;function a(e,a,o,s){var c,l,u,d,f,p,m,h=!1,g=e.bMarks[a]+e.tShift[a],_=e.eMarks[a];if(a!==0||r!==e.src.charCodeAt(0))return!1;for(c=g+1;c<=_;c++)if(n[(c-g)%i]!==e.src[c]){m=c+1;break}if(u=Math.floor((c-g)/i),u<3)return!1;if(c-=(c-g)%i,s)return!0;for(l=a;l++,!(l>=o||e.src.slice(g,_)===`...`||(g=e.bMarks[l]+e.tShift[l],_=e.eMarks[l],g<_&&e.sCount[l]<e.blkIndent));)if(r===e.src.charCodeAt(g)&&!(e.sCount[l]-e.blkIndent>=4)){for(c=g+1;c<=_&&n[(c-g)%i]===e.src[c];c++);if(!(Math.floor((c-g)/i)<u)&&(c-=(c-g)%i,c=e.skipSpaces(c),!(c<_))){h=!0;break}}return f=e.parentType,p=e.lineMax,e.parentType=`container`,e.lineMax=l,d=e.push(`front_matter`,null,0),d.hidden=!0,d.markup=e.src.slice(a,c),d.block=!0,d.map=[a,l+ +!!h],d.meta=e.src.slice(m,g-1),e.parentType=f,e.lineMax=p,e.line=l+ +!!h,t(d.meta),!0}e.block.ruler.before(`table`,`front_matter`,a,{alt:[`paragraph`,`reference`,`blockquote`,`list`]})}}));function cl(){return e=>{let t=``;e.use(ml.default,n=>{let r=ll(n);t=r===void 0?``:ul(r,e.utils.escapeHtml)}),e.renderer.rules.front_matter=(e,n,r,i,a)=>t===``?``:`<table class="markdown-frontMatter"${a.renderAttrs(e[n])}>\n${t}\n</table>\n`}}function ll(e){try{let t=as(e,{schema:oc});if(typeof t==`object`&&t&&!Array.isArray(t)&&Object.keys(t).length>0)return t}catch{}}function ul(e,t){let n=Object.entries(e);return n.length===0?``:`<tbody>\n${n.map(([e,n])=>`<tr><th scope="row">${t(e)}</th><td>${dl(n,t)}</td></tr>`).join(`
`)}\n</tbody>`}function dl(e,t){if(e==null)return``;if(e instanceof Date)return t(fl(e));if(Array.isArray(e))return e.every(pl)?e.map(e=>dl(e,t)).join(`, `):`<ul>${e.map(e=>`<li>${dl(e,t)}</li>`).join(``)}</ul>`;if(typeof e==`object`){let n=ul(e,t);return n===``?``:`<table>${n}</table>`}return t(String(e))}function fl(e){if(Number.isNaN(e.getTime()))return``;let t=e.toISOString();return t.endsWith(`T00:00:00.000Z`)?t.slice(0,10):t}function pl(e){if(e==null||e instanceof Date)return!0;let t=typeof e;return t===`string`||t===`number`||t===`boolean`||t===`bigint`}var ml,hl=o((()=>{ol(),ml=u(sl())}));function gl(e,t={}){return e??t}function _l(e,t=!0){return e??t}function vl(e){if(e){if(!Array.isArray(e)||!e.every(e=>typeof e==`object`&&!!e&&`left`in e&&typeof e.left==`string`&&`right`in e&&typeof e.right==`string`&&`display`in e&&typeof e.display==`boolean`))throw TypeError(`Invalid mathDelimiters setting: expected an array of { left: string, right: string, display: boolean }`);return e}}var yl,bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl=o((()=>{yl={rootValueKey:`extension.markeditPreview`,defaultModes:[`edit`,`side-by-side`,`preview`,`syntax-hidden`],defaultPreset:`default`},bl=gl(gl(f.MarkEdit.userSettings)[yl.rootValueKey]),xl=gl(bl.changeMode),Sl=gl(bl.markdownIt),Cl=_l(bl.syncScroll),bl.hidePreviewButtons,bl.syntaxAutoDetect,wl=_l(bl.imageHoverPreview,!1),Tl=_l(bl.inlineImages,!1),El=Array.isArray(bl.inlineRendering)?bl.inlineRendering.filter(e=>e===`image`||e===`table`||e===`math`||e===`mermaid`||e===`html`):Tl?[`image`,`math`,`mermaid`]:[`math`,`mermaid`],Dl=bl.themeName??`github`,Ol=Dl===`none`,kl=bl.styledHtmlColorScheme??bl.styledHtmlTheme??`auto`,vl(bl.mathDelimiters),Al=xl.modes??yl.defaultModes,jl=gl(xl.hotKey),Ml=Sl.preset??yl.defaultPreset,Nl=gl(Sl.options)})),Fl,Il=o((()=>{Fl=`.markdown-body {
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
`})),Ll,Rl=o((()=>{Ll=`.markdown-body {
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
`})),zl,Bl=o((()=>{zl=`.markdown-body {
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
`})),Vl,Hl=o((()=>{Vl=`.markdown-body {
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
`})),Ul,Wl=o((()=>{Ul=`.markdown-body {
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
`})),Gl,Kl=o((()=>{Gl=`.markdown-body {
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
`})),ql,Jl=o((()=>{ql=`.markdown-body {
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
`})),Yl,Xl=o((()=>{Yl=`.markdown-body {
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
`})),Zl,Ql=o((()=>{Zl=`.markdown-body {
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
`})),$l,eu=o((()=>{$l=`.markdown-body {
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
`})),tu,nu=o((()=>{tu=`.markdown-body {
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
`})),ru,iu=o((()=>{ru=`.markdown-body {
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
`})),au,ou=o((()=>{au=`.markdown-body {
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
`})),su,cu=o((()=>{su=`.markdown-body {
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
`})),lu,uu=o((()=>{lu=`.markdown-body {
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
`})),du,fu=o((()=>{du=`.markdown-body {
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
`})),pu,mu=o((()=>{pu=`.markdown-body {
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
`})),hu,gu=o((()=>{hu=`.markdown-alert {
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
`})),_u,vu=o((()=>{_u=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`})),yu,bu=o((()=>{yu=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`})),xu,Su=o((()=>{xu=`.code-copy-wrapper {
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
`}));function Cu(e=`auto`){if(Ol)return``;let t=ku[Dl]??ku.github,n=t.light??t.dark,r=t.dark??t.light,i=b(n)??`#ffffff`,a=b(r)??`#0d1117`;return[`.markdown-body { padding: 25px; }`,...Ou(e,`body { background: ${i}; }`,`body { background: ${a}; }`)].join(`
`)}function wu(e,t){let n=ku[e.replace(/-(light|dark|dawn)$/,``)]??ku.github,r=t?n.dark??n.light:n.light??n.dark;return`${Fl}\n${r}`}function Tu(e=`auto`){if(Ol)return[`:root { color-scheme: ${e===`auto`?`light dark`:e}; }`,`body, .markdown-body { background: Canvas; color: CanvasText; }`].join(`
`);let t=ku[Dl]??ku.github,n=t.light??t.dark,r=t.dark??t.light;return[Fl,...Ou(e,n,r)].join(`
`)}function Eu(e=`auto`){return[hu,...Ou(e,_u,yu)].join(`
`)}function Du(){return xu}function Ou(e,t,n){let r=[];switch(e){case`light`:r.push(t);break;case`dark`:r.push(n);break;case`auto`:r.push(`
        ${t}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`)}return r}var ku,Au=o((()=>{ue(),Pl(),Il(),Rl(),Bl(),Hl(),Wl(),Kl(),Jl(),Xl(),Ql(),eu(),nu(),iu(),ou(),cu(),uu(),fu(),mu(),gu(),vu(),bu(),Su(),ku={github:{light:Ll,dark:zl},cobalt:{dark:Vl},dracula:{dark:Ul},minimal:{light:Gl,dark:ql},"night-owl":{dark:Yl},"rose-pine":{light:Zl,dark:$l},solarized:{light:tu,dark:ru},synthwave84:{dark:au},"winter-is-coming":{light:su,dark:lu},xcode:{light:du,dark:pu}}}));function U(e){return Nu[e]}var ju,Mu,Nu,Pu=o((()=>{ju={default:{viewMode:`View Mode`,changeMode:`Change Mode`,editMode:`Markdown Source`,sideBySideMode:`Preview (Side-by-Side)`,previewMode:`Preview (Overlay)`,syntaxHiddenMode:`Mixed (Syntax Hidden)`,saveCleanHtml:`Save Clean HTML`,saveStyledHtml:`Save Styled HTML`,copyHtml:`Copy HTML`,copyRichText:`Copy Rich Text`,copyCode:`Copy Code`,failedToCopy:`Failed to copy. Please try again.`,untitled:`Untitled`,version:`Version`,source:`Source`,preview:`Preview`,goToFootnoteDefinition:`Go to definition [%s]`,backToFootnoteReference:`Back to reference [%s]`},"zh-CN":{viewMode:`视图模式`,changeMode:`切换模式`,editMode:`Markdown 源码`,sideBySideMode:`预览（并排）`,previewMode:`预览（覆盖）`,syntaxHiddenMode:`混合（隐藏语法）`,saveCleanHtml:`保存无样式 HTML`,saveStyledHtml:`保存带样式 HTML`,copyHtml:`复制 HTML`,copyRichText:`复制富文本`,copyCode:`复制代码`,failedToCopy:`复制失败，请重试。`,untitled:`未命名`,version:`版本`,source:`源码`,preview:`预览`,goToFootnoteDefinition:`跳转到定义 [%s]`,backToFootnoteReference:`返回引用 [%s]`},"zh-TW":{viewMode:`視圖模式`,changeMode:`切換模式`,saveCleanHtml:`儲存無樣式 HTML`,saveStyledHtml:`儲存帶樣式 HTML`,copyHtml:`拷貝 HTML`,copyRichText:`複製富文字`,copyCode:`拷貝程式碼`,failedToCopy:`複製失敗，請再試一次。`,editMode:`Markdown 原始碼`,sideBySideMode:`預覽（並排）`,previewMode:`預覽（覆蓋）`,syntaxHiddenMode:`混合（隱藏語法）`,untitled:`未命名`,version:`版本`,source:`原始碼`,preview:`預覽`,goToFootnoteDefinition:`前往定義 [%s]`,backToFootnoteReference:`返回引用 [%s]`}},Mu=[`default`,`zh-CN`,`zh-TW`],Nu=ju[(()=>{let e=navigator.language;return Mu.includes(e)?e:`default`})()]}));function Fu(){return typeof f.MarkEdit.addExtension==`function`}var Iu=o((()=>{}));async function Lu(e,t=!0){return await Ku,W.render(e,{lineInfo:t})}async function Ru(e){await Ku;let t={lineInfo:!1},n=W.parse(e,t),r=[];for(let e=0;e<n.length;e+=1){let i=n[e];if(i.type!==`table_open`||i.level!==0||i.map===null)continue;let a=e+1;for(;a<n.length&&n[a].type!==`table_close`;)a+=1;a!==n.length&&(r.push({fromLine:i.map[0]+1,toLine:i.map[1],html:W.renderer.render(n.slice(e,a+1),W.options,t)}),e=a)}return r}async function zu(e,t){if(!t.startsWith(`#`))return;await Ku;let n=W.normalizeLink(t).substring(1),r=W.normalizeLink(t.toLowerCase()).substring(1).toLowerCase(),i=W.parse(e,{}),a=e.split(/\r\n?|\n/);return(i.find((e,t)=>{let n=i[t+1];if(e.type!==`heading_open`||n?.type!==`inline`||e.map===null)return!1;let o=a[e.map[0]],s=e.markup.startsWith(`#`)?o.slice(o.indexOf(e.markup)).replace(/ {0,3}#+ +/,``):n.content.split(`
`)[0].trim(),c=(s.length>64?s.substring(0,64)+`...`:s).normalize(`NFKD`).trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s\-_]/gu,``).replace(/\s+/g,`-`);return W.normalizeLink(`#${c}`).substring(1).toLowerCase()===r})??i.find(e=>e.type===`heading_open`&&e.attrGet(`id`)===n))?.map?.[0]}function Bu(e,t){e()}async function Vu(e){let t=e=>`<style>\n${e}\n</style>`;return[`<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>`,`<div class="markdown-body">\n${e}\n</div>`,t(Cu(kl)),t(Tu(kl)),t(Eu(kl)),t(Du()),`</body></html>`].join(`
`)}var Hu,Uu,W,Wu,Gu,Ku,qu=o((()=>{Ri(),ea(),Hu=u(ta()),da(),Uu=u(fa()),ga(),hl(),Au(),Pu(),Iu(),Pl(),W=Li(Ml,{html:!0,breaks:!0,linkify:!0,...Nl}),W.linkify.set({fuzzyLink:!0,urlAuth:!0}),Wu=[],W.use(cl()),W.use(Gi),W.use(Hu.default,{matcher:e=>!e.startsWith(`#`),attrs:{target:`_blank`,rel:`noopener`}}),W.use(ua),W.use(Uu.default,{enabled:Fu(),label:!0}),W.use(ha),Gu=new Set([`paragraph_open`,`heading_open`,`blockquote_open`,`list_item_open`,`bullet_list_open`,`ordered_list_open`,`fence`,`code_block`,`table_open`,`html_block`,`front_matter`]),Ku=Promise.all(Wu).then(()=>{for(let e of Gu){let t=W.renderer.rules[e];W.renderer.rules[e]=(e,n,r,i,a)=>{let o=e[n];return i?.lineInfo&&o.map?.length===2&&(o.attrSet(`data-line-from`,String(o.map[0])),o.attrSet(`data-line-to`,String(o.map[1]-1))),t?t(e,n,r,i,a):a.renderToken(e,n,r)}}for(let e of[`fence`,`code_block`]){let t=W.renderer.rules[e];W.renderer.rules[e]=(e,n,r,i,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${t===void 0?a.renderToken(e,n,r):t(e,n,r,i,a)}
        <button title="${U(`copyCode`)}" aria-label="${U(`copyCode`)}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}})}));function Ju(e){let t=$u.parseFromString(e,`text/html`);return t.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yu(t))}),t.body.innerHTML}function Yu(e){return e.includes(`://`)||e.startsWith(`//`)||e.startsWith(`data:image/`)?e:`${ed}://${e}`}function Xu(e){typeof f.MarkEdit.getFileInfo==`function`&&(document.addEventListener(`mousemove`,e=>{rd.panelPresenter!==void 0&&(clearTimeout(rd.panelPresenter),rd.panelPresenter=void 0),rd.panelPresenter=setTimeout(()=>{let t=e.target,n=t?.closest(`.cm-md-link`),r=n?.dataset.linkUrl??n?.innerText??``;n!==null&&ae(r)?Zu(n,r):t?.classList.contains(td)||Qu()},600)}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&Qu(!1)}),e.addEventListener(`scroll`,()=>Qu()))}async function Zu(e,t){if(e===rd.focusedElement)return;let n=(await f.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;let r=oe(n,t),i=await f.MarkEdit.getFileObject(r);if(i===void 0)return;let a=e.getBoundingClientRect(),o=document.createElement(`img`);o.className=td,o.style.position=`fixed`,o.style.left=`${a.left}px`,o.style.zIndex=`10000`,o.style.borderRadius=`5px`,o.style.opacity=`0`,o.style.transition=`opacity 120ms`,o.style.cursor=`pointer`,o.onclick=()=>{Qu(),window.open(t,`_blank`)},o.onload=()=>{let e=Math.min(o.naturalHeight,240);o.style.height=`${e}px`,a.top>window.innerHeight-a.bottom?o.style.top=`${a.top-e-nd}px`:o.style.top=`${a.bottom+nd}px`,requestAnimationFrame(()=>{o.style.opacity=`1`})},o.src=`data:${i.mimeType??`image/png`};base64,${i.data}`,Qu(!1),rd.focusedElement=e,document.body.appendChild(o)}function Qu(e=!0){rd.focusedElement!==void 0&&(rd.focusedElement=void 0,document.querySelectorAll(`.${td}`).forEach(t=>{e?(t.style.opacity=`0`,t.addEventListener(`transitionend`,()=>t.remove(),{once:!0})):t.remove()}))}var $u,ed,td,nd,rd,id=o((()=>{ue(),$u=new DOMParser,ed=`image-loader`,td=`cm-md-image-preview`,nd=5,rd={panelPresenter:void 0,focusedElement:void 0}}));qu(),id(),ue(),Pl();function ad(e,t){if(!Cl)return;pd.scrollUpdater!==void 0&&clearTimeout(pd.scrollUpdater);let n=f.MarkEdit.editorView.state.doc,r=f.MarkEdit.editorView.state.selection;pd.lastSourceScrollTop=e.scrollTop;let i=()=>{let{doc:i,selection:a}=f.MarkEdit.editorView.state,o=i===n&&!a.eq(r);n=i,r=a,!(!o&&Math.abs(e.scrollTop-pd.lastSourceScrollTop)<.5)&&(pd.lastSourceScrollTop=e.scrollTop,(o||!t.classList.contains(`overlay`))&&od(e,t))};`onscrollend`in window?e.addEventListener(`scrollend`,i):e.addEventListener(`scroll`,()=>{pd.scrollUpdater!==void 0&&clearTimeout(pd.scrollUpdater),pd.scrollUpdater=setTimeout(i,100)})}function od(e,t,n=!0){let{line:r,progress:i}=sd(e);cd(t,r,i,n)}function sd(e,t=0){let n=f.MarkEdit.editorView,r=n.lineBlockAtHeight(e.scrollTop+t),i=n.state.doc.lineAt(r.from).number-1,a=te(n.domAtPos(r.from).node);if(a===null)return{line:i,progress:0};let o=e.getBoundingClientRect(),s=a.getBoundingClientRect(),c=o.top-s.top-t;return{line:i,progress:s.height>0?fd(c/s.height):0}}function cd(e,t,n,r=!0){if(t===0&&n===0)return re(e,0,r);let i=Array.from(e.querySelectorAll(`[data-line-from]`)),a=ld(i,t);if(a!==void 0){let{from:i,to:o}=x(a);return S(e,a,ud(t,n,i,o),r)}if(t===0)return re(e,0,r);let{beforeBlock:o,afterBlock:s}=dd(i,t);if(o!==void 0&&s!==void 0){let i=x(o),a=x(s),c=ne(e,o)+o.offsetHeight,l=ne(e,s),u=a.from-i.to,d=t-i.to+n,f=u>0?fd(d/u):0;return re(e,c+(l-c)*f,r)}if(o!==void 0)return S(e,o,1,r);if(s!==void 0)return S(e,s,0,r)}function ld(e,t){return e.find(e=>{let{from:n,to:r}=x(e);return t>=n&&t<=r})}function ud(e,t,n,r){let i=r-n;return i<1?e===n?t:0:fd((e-n+t)/i)}function dd(e,t){let n,r;for(let i of e){let{from:e,to:a}=x(i);if(a<t)n=i;else if(e>t){r=i;break}}return{beforeBlock:n,afterBlock:r}}function fd(e){return Math.max(0,Math.min(1,e))}var pd={lastSourceScrollTop:0,scrollUpdater:void 0};function md(e){let t=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return t===null?null:{offset:t[1].length,replacement:t[2]===` `?`x`:` `}}ue();function hd(e,t){let n=(t.target instanceof Element?t.target.closest(`a`):null)?.getAttribute(`href`)??``;if(!n.startsWith(`#`))return!1;let r=gd(e,n);return r&&t.preventDefault(),r}function gd(e,t){if(!t.startsWith(`#`))return!1;let n=_d(t.substring(1)),r=[...e.querySelectorAll(`[id]`)].find(e=>e.id===n);return r!==void 0&&(S(e,r,0,!1),!0)}function _d(e){try{return decodeURIComponent(e)}catch{return e}}var vd={containerClass:`markdown-container`,gutterViewClass:`markdown-gutter`,dividerViewClass:`markdown-divider`,previewPaneClass:`markdown-body`},yd={viewModeCacheKey:`ui.view-mode`,previewPageZoomKey:`ui.preview-page-zoom`};function bd(e,t,n){if(![`Link`,`Image`,`Autolink`].includes(e.name))return;let r=Od(e.node);if(e.name===`Autolink`){if(r.length<2)return;let n=t.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(n)?{hidden:r.map(e=>({from:e.from,to:e.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:n,highlightTags:Cd(e.node)}:void 0}if(r.length<2||xd(e,t).length>0)return;let i=e.node.getChild(`LinkLabel`);if(r.length===2&&(i===null||i.to-i.from===2))return;let a=e.node.getChild(`URL`);if(r.length>2&&a===null||[`(`,`[`].includes(t.sliceDoc(e.to,e.to+1)))return;let o=r[0],s=r[1],c=t.sliceDoc(o.to,s.from);if(!/\S/.test(c)||c.startsWith(`^`)&&e.to===s.to)return;let l=a===null?Td(i,t,n):t.sliceDoc(a.from,a.to);if(e.name!==`Image`||a!==null||l!==``)return{hidden:[{from:o.from,to:o.to},{from:s.from,to:e.to}],label:{from:o.to,to:s.from},image:e.name===`Image`,destination:l,highlightTags:Cd(e.node)}}function xd(e,t){if(e.name!==`Link`)return[];let n=t.sliceDoc(e.from,e.to),r=/\[\^[^\][\s]+\]/g,i=[];for(let e=r.exec(n);e!==null;e=r.exec(n))i.push(e);return i.map(e=>e[0]).join(``)===n?i.map(t=>({from:e.from+t.index,to:e.from+t.index+t[0].length,label:t[0].slice(1,-1),highlightTags:Cd(e.node)})):[]}function Sd(e,t){if(e.name===`LinkDefinition`&&!km(t,e.from,e.to+1)&&kd.test(t.sliceDoc(e.from,e.to))&&t.sliceDoc(e.to,e.to+1)===`:`)return{hidden:[{from:e.from+1,to:e.from+2}],label:t.sliceDoc(e.from+1,e.to-1),highlightTags:Cd(e.node),suffixPosition:e.to+1,suffix:/^[ \t]/.test(t.sliceDoc(e.to+1,e.to+2))?``:` `}}function Cd(e){let t=[];for(let n=e;n!==null;n=n.parent)t.unshift(n);let n=new Set;for(let r of t){let t=(0,h.getStyleTags)(r);t!==null&&(r===e||t.inherit)&&t.tags.forEach(e=>n.add(e))}return[...n]}function wd(e){let t=(0,m.syntaxTree)(e),n;return r=>{let i=Ad.get(t);return n??=i?.doc===e.doc?i.destinations:void 0,n===void 0&&(n=Ed(e,t),Ad.set(t,{doc:e.doc,destinations:n})),n.get(Dd(r))??``}}function Td(e,t,n){return e===null?``:n(t.sliceDoc(e.from+1,e.to-1))}function Ed(e,t){let n=new Map;return t.iterate({enter:t=>{if(t.name!==`LinkDefinitionID`)return;let r=Dd(e.sliceDoc(t.from,t.to));if(n.has(r))return;let i=e.doc.lineAt(t.to),a=e.sliceDoc(t.node.parent?.to??t.to,i.to),o=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),s=o?.[1]??o?.[2];s!==void 0&&n.set(r,s)}}),n}function Dd(e){return e.trim().replace(/\s+/g,` `).toLowerCase()}function Od(e){let t=[];for(let n=e.firstChild;n!==null;n=n.nextSibling)n.name===`LinkMark`&&t.push(n);return t}var kd,Ad,jd=o((()=>{Ym(),kd=/^\[\^[^\][\s]+\]$/,Ad=new WeakMap}));function Md(e,t){let n=Nd(e);if(n===void 0||Am(t,e.from,e.to))return[];let r=n.hidden.map(e=>Fd.range(e.from,e.to));if(e.name!==`InlineCode`)return r;let i=e.node.firstChild?.to,a=e.node.lastChild?.from;return i===void 0||a===void 0||i>=a||(a-i===1?r.push(zd.range(i,a)):(r.push(Ld.range(i,i+1)),r.push(Rd.range(a-1,a)))),r}function Nd(e){let t=Pd.get(e.name),n=t===void 0?[]:e.node.getChildren(t);if(n.length>0)return{hidden:n}}var Pd,Fd,Id,Ld,Rd,zd,Bd=o((()=>{Ym(),Pd=new Map([[`Emphasis`,`EmphasisMark`],[`StrongEmphasis`,`EmphasisMark`],[`Strikethrough`,`StrikethroughMark`],[`InlineCode`,`CodeMark`]]),Fd=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),Id=`cm-md-syntaxHiddenInlineCodeBoundary`,Ld=d.Decoration.mark({class:`${Id} cm-md-syntaxHiddenInlineCodeStart`}),Rd=d.Decoration.mark({class:`${Id} cm-md-syntaxHiddenInlineCodeEnd`}),zd=d.Decoration.mark({class:`${Id} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`})})),Vd=o((()=>{})),Hd=o((()=>{qu()}));function Ud(e,t){this.v=e,this.k=t}function Wd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Gd(e){if(Array.isArray(e))return e}function Kd(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function qd(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Jd(e,t){return Gd(e)||Kd(e,t)||Yd(e,t)||qd()}function Yd(e,t){if(e){if(typeof e==`string`)return Wd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Wd(e,t):void 0}}function Xd(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Ud;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}function G(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ff(e,t,n)}}function Zd(e){return function(){return pf(e,[...arguments])}}function K(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:bf;if(of&&of(e,null),!yf(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(sf(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Qd(e){for(let t=0;t<e.length;t++)Y(e,t)||(e[t]=null);return e}function $d(e){let t=uf(null);for(let r of af(e)){var n=Jd(r,2);let i=n[0],a=n[1];Y(e,i)&&(t[i]=yf(a)?Qd(a):a&&typeof a==`object`&&a.constructor===Object?$d(a):a)}return t}function ef(e){switch(typeof e){case`string`:return e;case`number`:return Ef(e);case`boolean`:return Df(e);case`bigint`:return Of?Of(e):`0`;case`symbol`:return kf?kf(e):`Symbol()`;case`undefined`:return Af(e);case`function`:case`object`:{if(e===null)return Af(e);let t=e,n=tf(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Af(e)}return Af(e)}default:return Af(e)}}function tf(e,t){for(;e!==null;){let n=lf(e,t);if(n){if(n.get)return G(n.get);if(typeof n.value==`function`)return G(n.value)}e=cf(e)}function n(){return null}return n}function nf(e){try{return X(e,``),!0}catch{return!1}}function rf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sp(),t=e=>rf(e);if(t.version=`3.4.16`,t.removed=[],!e||!e.document||e.document.nodeType!==rp.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=tf(d,`cloneNode`),p=tf(d,`remove`),m=tf(d,`removeAttributeNode`),h=tf(d,`nextSibling`),g=tf(d,`childNodes`),_=tf(d,`parentNode`),v=tf(d,`shadowRoot`),y=tf(d,`attributes`),b=o&&o.prototype?tf(o.prototype,`nodeType`):null,ee=o&&o.prototype?tf(o.prototype,`nodeName`):null,te=o&&o.prototype?tf(o.prototype,`ownerDocument`):null,x=function(e){return b?b(e):e.nodeType},ne=function(e){return ee?ee(e):e.nodeName};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let S,re=``,ie,ae=!1,oe=0,se=function(){if(oe>0)throw jf(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},ce=function(e){se(),oe++;try{return S.createHTML(e)}finally{oe--}},le=function(e){se(),oe++;try{return S.createScriptURL(e)}finally{oe--}},ue=function(){return ae||=(ie=cp(u,i),!0),ie},de=n,fe=de.implementation,pe=de.createNodeIterator,me=de.createDocumentFragment,he=de.getElementsByTagName,ge=r.importNode,C=lp();t.isSupported=typeof af==`function`&&typeof _==`function`&&fe&&fe.createHTMLDocument!==void 0;let _e=Uf,ve=Wf,ye=Gf,be=Kf,xe=qf,Se=Yf,Ce=Xf,we=Qf,Te=Jf,w=null,Ee=K({},[...Mf,...Nf,...Pf,...If,...Rf]),T=null,De=K({},[...zf,...Bf,...Vf,...Hf]),Oe=Object.seal(uf(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,Ae=null,je=Object.seal(uf(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,Ne=!0,Pe=!1,Fe=!0,Ie=!1,Le=!0,Re=!1,ze=!1,Be=null,Ve=null,He=!1,Ue=!1,We=!1,Ge=!1,Ke=!0,qe=!1,Je=`user-content-`,E=!0,Ye=!1,Xe={},Ze=null,D=K({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),Qe=null,$e=K({},[`audio`,`video`,`img`,`source`,`image`,`track`]),et=null,tt=K({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),nt=`http://www.w3.org/1998/Math/MathML`,rt=`http://www.w3.org/2000/svg`,it=`http://www.w3.org/1999/xhtml`,at=it,ot=!1,st=null,ct=K({},[nt,rt,it],xf),O=q([`mi`,`mo`,`mn`,`ms`,`mtext`]),lt=K({},O),ut=q([`annotation-xml`]),dt=K({},ut),ft=K({},[`title`,`style`,`font`,`a`,`script`]),pt=null,mt=[`application/xhtml+xml`,`text/html`],k=null,ht=null,gt=n.createElement(`form`),_t=function(e){return e instanceof RegExp||e instanceof Function},vt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ht&&ht===e)return;(!e||typeof e!=`object`)&&(e={}),e=$d(e),pt=mt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,k=pt===`application/xhtml+xml`?xf:bf,w=up(e,`ALLOWED_TAGS`,Ee,{transform:k}),T=up(e,`ALLOWED_ATTR`,De,{transform:k}),st=up(e,`ALLOWED_NAMESPACES`,ct,{transform:xf}),et=up(e,`ADD_URI_SAFE_ATTR`,tt,{transform:k,base:tt}),Qe=up(e,`ADD_DATA_URI_TAGS`,$e,{transform:k,base:$e}),Ze=up(e,`FORBID_CONTENTS`,D,{transform:k}),ke=up(e,`FORBID_TAGS`,$d({}),{transform:k}),Ae=up(e,`FORBID_ATTR`,$d({}),{transform:k}),Xe=Y(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?$d(e.USE_PROFILES):e.USE_PROFILES:!1,Me=e.ALLOW_ARIA_ATTR!==!1,Ne=e.ALLOW_DATA_ATTR!==!1,Pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Fe=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=e.SAFE_FOR_TEMPLATES||!1,Le=e.SAFE_FOR_XML!==!1,Re=e.WHOLE_DOCUMENT||!1,Ue=e.RETURN_DOM||!1,We=e.RETURN_DOM_FRAGMENT||!1,Ge=e.RETURN_TRUSTED_TYPE||!1,He=e.FORCE_BODY||!1,Ke=e.SANITIZE_DOM!==!1,qe=e.SANITIZE_NAMED_PROPS||!1,E=e.KEEP_CONTENT!==!1,Ye=e.IN_PLACE||!1,Te=nf(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Jf,at=typeof e.NAMESPACE==`string`?e.NAMESPACE:it,lt=dp(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>K({},O)),dt=dp(e,`HTML_INTEGRATION_POINTS`,()=>K({},ut));let t=dp(e,`CUSTOM_ELEMENT_HANDLING`,()=>uf(null));if(Oe=uf(null),Y(t,`tagNameCheck`)&&_t(t.tagNameCheck)&&(Oe.tagNameCheck=t.tagNameCheck),Y(t,`attributeNameCheck`)&&_t(t.attributeNameCheck)&&(Oe.attributeNameCheck=t.attributeNameCheck),Y(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Oe.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),J(Oe),Ie&&(Ne=!1),We&&(Ue=!0),Xe&&(w=K({},Rf),T=uf(null),Xe.html===!0&&(K(w,Mf),K(T,zf)),Xe.svg===!0&&(K(w,Nf),K(T,Bf),K(T,Hf)),Xe.svgFilters===!0&&(K(w,Pf),K(T,Bf),K(T,Hf)),Xe.mathMl===!0&&(K(w,If),K(T,Vf),K(T,Hf))),je.tagCheck=null,je.attributeCheck=null,Y(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?je.tagCheck=e.ADD_TAGS:yf(e.ADD_TAGS)&&(w===Ee&&(w=$d(w)),K(w,e.ADD_TAGS,k))),Y(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?je.attributeCheck=e.ADD_ATTR:yf(e.ADD_ATTR)&&(T===De&&(T=$d(T)),K(T,e.ADD_ATTR,k))),Y(e,`ADD_FORBID_CONTENTS`)&&yf(e.ADD_FORBID_CONTENTS)&&(Ze===D&&(Ze=$d(Ze)),K(Ze,e.ADD_FORBID_CONTENTS,k)),E&&(w[`#text`]=!0),Re&&K(w,[`html`,`head`,`body`]),w.table&&(K(w,[`tbody`]),delete ke.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw jf(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw jf(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=S;S=e.TRUSTED_TYPES_POLICY;try{re=ce(``)}catch(e){throw S=t,e}}else e.TRUSTED_TYPES_POLICY===null?(S=void 0,re=``):(S===void 0&&(S=ue()),S&&typeof re==`string`&&(re=ce(``)));q&&q(e),ht=e},yt=K({},[...Nf,...Pf,...Ff]),bt=K({},[...If,...Lf]),xt=function(e,t,n){return t.namespaceURI===it?e===`svg`:t.namespaceURI===nt?e===`svg`&&(n===`annotation-xml`||lt[n]):!!yt[e]},St=function(e,t,n){return t.namespaceURI===it?e===`math`:t.namespaceURI===rt?e===`math`&&dt[n]:!!bt[e]},Ct=function(e,t,n){return t.namespaceURI===rt&&!dt[n]||t.namespaceURI===nt&&!lt[n]?!1:!bt[e]&&(ft[e]||!yt[e])},wt=function(e){let t=_(e);(!t||!t.tagName)&&(t={namespaceURI:at,tagName:`template`});let n=bf(e.tagName),r=bf(t.tagName);return st[e.namespaceURI]?e.namespaceURI===rt?xt(n,t,r):e.namespaceURI===nt?St(n,t,r):e.namespaceURI===it?Ct(n,t,r):!!(pt===`application/xhtml+xml`&&st[e.namespaceURI]):!1},Tt=function(e){_f(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw jf(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},Et=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},Dt=function(e){At(e);let t=g(e);if(t){let e=[];mf(t,t=>{_f(e,t)}),mf(e,e=>{try{p(e)}catch{}})}let n=y(e);if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&Et(e,r,i)}},Ot=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}_f(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(Ue||We)try{Tt(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},kt=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||T[k(i)]||Et(e,r,i)}},At=function(e){let t=[e];for(;t.length>0;){let e=t.pop();x(e)===rp.element&&kt(e);let n=g(e);if(n)for(let e=n.length-1;e>=0;--e)t.push(n[e])}},jt=function(e,t){return Le?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Mt=function(e){if(!Le)return;let t=[e];for(;t.length>0;){let e=t.pop(),n=x(e);if(n===rp.processingInstruction||n===rp.comment&&X(ep,e.data)){try{p(e)}catch{}continue}if(n===rp.element){let t=e,n=k(ne(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&jt(`for`,n)&&t.removeAttribute(`for`)}catch{}}let r=g(e);if(r)for(let e=r.length-1;e>=0;--e)t.push(r[e])}},Nt=function(e){let t=null,r=null;if(He)e=`<remove></remove>`+e;else{let t=Sf(e,/^[\r\n\t ]+/);r=t&&t[0]}pt===`application/xhtml+xml`&&at===it&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=S?ce(e):e;if(at===it)try{t=new l().parseFromString(i,pt)}catch{}if(!t||!t.documentElement){t=fe.createDocument(at,`template`,null);try{t.documentElement.innerHTML=ot?re:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),at===it?he.call(t,Re?`html`:`body`)[0]:Re?t.documentElement:a},Pt=function(e){let t=te?te(e):e.ownerDocument;return pe.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ft=function(e){return e=Cf(e,_e,` `),e=Cf(e,ve,` `),e=Cf(e,ye,` `),e},It=function(e){e.normalize();let t=te?te(e):e.ownerDocument,n=pe.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Ft(r.data),r=n.nextNode();let i=e.querySelectorAll?.call(e,`template`);i&&mf(i,e=>{Rt(e.content)&&It(e.content)})},Lt=function(e){let t=ee?ee(e):null;return typeof t!=`string`||k(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Rt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return b(e)===rp.documentFragment}catch{return!1}},zt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return typeof b(e)==`number`}catch{return!1}};function Bt(e,n,r){e.length!==0&&mf(e,e=>{e.call(t,n,r,ht)})}let Vt=function(e,t){return!!(Le&&e.hasChildNodes()&&!zt(e.firstElementChild)&&X($f,e.textContent)&&X($f,e.innerHTML)||Le&&e.namespaceURI===it&&ap[t]&&(zt(e.firstElementChild)||typeof e.textContent==`string`&&X(op[t],e.textContent))||e.nodeType===rp.processingInstruction||Le&&e.nodeType===rp.comment&&X(ep,e.data))},Ht=function(e,t){return e instanceof RegExp?X(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Ut=function(e,t,n){if(!ke[t]&&Jt(t)&&Ht(Oe.tagNameCheck,t))return!1;if(E&&!Ze[t]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return Tt(e),!0},Wt=function(e,t,n,r){return e.length===0?t:t===n||t===r?$d(t):t},A=function(e,t){return e===t||_(e)!==null?!1:(Ye&&At(e),!0)},Gt=function(e,n){if(Bt(C.beforeSanitizeElements,e,null),A(e,n))return!0;if(Lt(e))return Tt(e),!0;let r=k(ne(e));if(w=Wt(C.uponSanitizeElement,w,Ee,Be),Bt(C.uponSanitizeElement,e,{tagName:r,allowedTags:w}),A(e,n))return!0;if(Vt(e,r))return Tt(e),!0;if(ke[r]||!(je.tagCheck instanceof Function&&je.tagCheck(r))&&!w[r]){let t=Ut(e,r,n);return t===!1&&(Bt(C.afterSanitizeElements,e,null),A(e,n))?!0:t}if(x(e)===rp.element&&!wt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&X(tp,e.innerHTML))return Tt(e),!0;if(Ie&&e.nodeType===rp.text){let n=Ft(e.textContent);e.textContent!==n&&(_f(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Bt(C.afterSanitizeElements,e,null),A(e,n)},Kt=function(e,t,r){if(Ae[t]||jt(t,e)||Ke&&(t===`id`||t===`name`)&&(r in n||r in gt))return!1;let i=T[t]||je.attributeCheck instanceof Function&&je.attributeCheck(t,e);return Ne&&X(be,t)||Me&&X(xe,t)?!0:i?et[t]||X(Te,Cf(r,Ce,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&wf(r,`data:`)===0&&Qe[e]||Pe&&!X(Se,Cf(r,Ce,``))?!0:!r:Jt(e)&&Ht(Oe.tagNameCheck,e)&&Ht(Oe.attributeNameCheck,t,e)||t===`is`&&Oe.allowCustomizedBuiltInElements&&Ht(Oe.tagNameCheck,r)},qt=K({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Jt=function(e){return!qt[bf(e)]&&X(we,e)},Yt=function(e,t,n,r){if(S&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return ce(r);case`TrustedScriptURL`:return le(r)}return r},Xt=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Lt(e)||(Tt(e),!1)}catch{return Ot(t,e),!1}},Zt=function(e,n){if(Bt(C.beforeSanitizeAttributes,e,null),A(e,n))return;let r=e.attributes;if(!r||Lt(e))return;T=Wt(C.uponSanitizeAttribute,T,De,Ve);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:T,forceKeepAttr:void 0},a=r.length,o=k(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=k(s),d=l,f=s===`value`?d:Tf(d),p=!1;if(i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Bt(C.uponSanitizeAttribute,e,i),f=i.attrValue,qe&&(u===`id`||u===`name`)&&wf(f,Je)!==0&&(Ot(s,e,n),f=Je+f,p=!0),Le&&X(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){Ot(s,e,n);continue}if(u===`attributename`&&Sf(f,`href`)){Ot(s,e,n);continue}if(!i.forceKeepAttr){if(!i.keepAttr){Ot(s,e,n);continue}if(!Fe&&X(np,f)){Ot(s,e,n);continue}if(Ie&&(f=Ft(f)),!Kt(o,u,f)){Ot(s,e,n);continue}f=Yt(o,u,c,f),f!==d&&Xt(e,s,c,f)&&p&&gf(t.removed)}}Bt(C.afterSanitizeAttributes,e,null),A(e,n)},Qt=function(e){let t=null,n=Pt(e);for(Bt(C.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Bt(C.uponSanitizeShadowNode,t,null),Gt(t,e),Zt(t,e),Rt(t.content)&&Qt(t.content),x(t)===rp.element){let e=v(t);Rt(e)&&($t(e),Qt(e))}Bt(C.afterSanitizeShadowDOM,e,null)},$t=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){Qt(e.shadow);continue}let n=e.node,r=x(n)===rp.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=ee?ee(n):null;if(typeof e==`string`&&k(e)===`template`){let e=n.content;Rt(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Rt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(ot=!e,ot&&(e=`<!-->`),typeof e!=`string`&&!zt(e)&&(e=ef(e),typeof e!=`string`))throw jf(`dirty is not a string, aborting`);if(!t.isSupported)return e;ze?(w=Be,T=Ve):vt(n),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(w=$d(w)),C.uponSanitizeAttribute.length>0&&(T=$d(T)),t.removed=[];let c=Ye&&typeof e!=`string`&&zt(e);if(c){Mt(e);let t=ne(e);if(typeof t==`string`){let n=k(t);if(!w[n]||ke[n])throw Dt(e),jf(`root node is forbidden and cannot be sanitized in-place`)}if(Lt(e))throw Dt(e),jf(`root node is clobbered and cannot be sanitized in-place`);try{$t(e)}catch(t){throw Dt(e),t}}else if(zt(e))i=Nt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===rp.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),$t(i);else{if(!Ue&&!Ie&&!Re&&e.indexOf(`<`)===-1)return S&&Ge?ce(e):e;if(i=Nt(e),!i)return Ue?null:Ge?re:``}i&&He&&Tt(i.firstChild);let l=c?e:i;try{let e=Pt(l);for(;o=e.nextNode();)Gt(o,l),Zt(o,l),Rt(o.content)&&Qt(o.content)}catch(n){throw c&&(Dt(e),mf(t.removed,e=>{e.element&&At(e.element)})),n}if(c){let n=!1;if(mf(t.removed,t=>{t.element&&(t.element===e&&(n=!0),At(t.element))}),n)throw jf(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Ie&&It(e),e}if(Ue){if(Ie&&It(i),We)for(s=me.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(T.shadowroot||T.shadowrootmode)&&(s=ge.call(r,s,!0)),s}let u=Re?i.outerHTML:i.innerHTML;return Re&&w[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&X(Zf,i.ownerDocument.doctype.name)&&(u=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+u),Ie&&(u=Ft(u)),S&&Ge?ce(u):u},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt(e),ze=!0,Be=w,Ve=T},t.clearConfig=function(){ht=null,ze=!1,Be=null,Ve=null,S=ie,re=``},t.isValidAttribute=function(e,t,n){ht||vt({});let r=k(e),i=k(t);return Kt(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&Y(C,e)&&_f(C[e],t)},t.removeHook=function(e,t){if(Y(C,e)){if(t!==void 0){let n=hf(C[e],t);return n===-1?void 0:vf(C[e],n,1)[0]}return gf(C[e])}},t.removeHooks=function(e){Y(C,e)&&(C[e]=[])},t.removeAllHooks=function(){C=lp()},t}var af,of,sf,cf,lf,q,J,uf,df,ff,pf,mf,hf,gf,_f,vf,yf,bf,xf,Sf,Cf,wf,Tf,Ef,Df,Of,kf,Y,Af,X,jf,Mf,Nf,Pf,Ff,If,Lf,Rf,zf,Bf,Vf,Hf,Uf,Wf,Gf,Kf,qf,Jf,Yf,Xf,Zf,Qf,$f,ep,tp,np,rp,ip,ap,op,sp,cp,lp,up,dp,fp,pp=o((()=>{Xd.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},Xd.prototype.next=function(e){return this._invoke(`next`,e)},Xd.prototype.throw=function(e){return this._invoke(`throw`,e)},Xd.prototype.return=function(e){return this._invoke(`return`,e)},af=Object.entries,of=Object.setPrototypeOf,sf=Object.isFrozen,cf=Object.getPrototypeOf,lf=Object.getOwnPropertyDescriptor,q=Object.freeze,J=Object.seal,uf=Object.create,df=typeof Reflect<`u`&&Reflect,ff=df.apply,pf=df.construct,q||=function(e){return e},J||=function(e){return e},ff||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},pf||=function(e){return new e(...[...arguments].slice(1))},mf=G(Array.prototype.forEach),Array.prototype.indexOf,hf=G(Array.prototype.lastIndexOf),gf=G(Array.prototype.pop),_f=G(Array.prototype.push),Array.prototype.slice,vf=G(Array.prototype.splice),yf=Array.isArray,bf=G(String.prototype.toLowerCase),xf=G(String.prototype.toString),Sf=G(String.prototype.match),Cf=G(String.prototype.replace),wf=G(String.prototype.indexOf),Tf=G(String.prototype.trim),Ef=G(Number.prototype.toString),Df=G(Boolean.prototype.toString),Of=typeof BigInt>`u`?null:G(BigInt.prototype.toString),kf=typeof Symbol>`u`?null:G(Symbol.prototype.toString),Y=G(Object.prototype.hasOwnProperty),Af=G(Object.prototype.toString),X=G(RegExp.prototype.test),jf=Zd(TypeError),Mf=q(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Nf=q(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),Pf=q([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Ff=q([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),If=q(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Lf=q([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Rf=q([`#text`]),zf=q(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Bf=q(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Vf=q(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Hf=q([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Uf=J(/{{[\w\W]*|^[\w\W]*}}/g),Wf=J(/<%[\w\W]*|^[\w\W]*%>/g),Gf=J(/\${[\w\W]*/g),Kf=J(/^data-[\-\w.\u00B7-\uFFFF]+$/),qf=J(/^aria-[\-\w]+$/),Jf=J(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yf=J(/^(?:\w+script|data):/i),Xf=J(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zf=J(/^html$/i),Qf=J(/^[a-z][.\w]*(-[.\w]+)+$/i),$f=J(/<[/\w!]/g),ep=J(/<[/\w]/g),tp=J(/<\/no(script|embed|frames)/i),np=J(/\/>/i),rp={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ip=[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`],ap=q(K({},ip)),op=function(){let e={};return mf(ip,t=>{e[t]=J(RegExp(`</`+t+`(?=[\\t\\n\\f\\r />])`,`i`))}),q(e)}(),sp=function(){return typeof window>`u`?null:window},cp=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},lp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},up=function(e,t,n,r){return Y(e,t)&&yf(e[t])?K(r.base?$d(r.base):{},e[t],r.transform):n},dp=function(e,t,n){let r=Y(e,t)?e[t]:void 0;return r&&typeof r==`object`?$d(r):n()},fp=rf()})),mp,hp,gp,_p=o((()=>{pp(),Au(),mp=p.StateEffect.define(),hp=class extends d.WidgetType{doc;from;to;render;referenceContext;constructor(e,t,n,r,i=``){super(),this.doc=e,this.from=t,this.to=n,this.render=r,this.referenceContext=i}get source(){return this.doc.sliceString(this.from,this.to)}toDOM(e){let t=document.createElement(`div`);t.className=`cm-md-syntaxHiddenTable`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=wu(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i);let a=document.createElement(`style`);a.textContent=`
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;let o=document.createElement(`div`);o.className=`markdown-body source`,o.textContent=this.source;let s=document.createElement(`style`);return n.append(r,a,s,o),gp.set(t,{body:o,mathStyle:s,dispose:()=>window.removeEventListener(`editor-colors-changed`,i)}),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),this.renderInto(t,e),t}updateDOM(e,t){return this.renderInto(e,t),!0}renderInto(e,t){let n=gp.get(e),r={};n.request=r;let i=()=>e.isConnected&&gp.get(e)?.request===r,a=()=>{if(i()){let n=t.posAtDOM(e);t.dispatch({effects:mp.of({doc:t.state.doc,from:n,to:n+this.source.length})})}};Promise.all([this.render(),``]).then(([e,r])=>{if(!i())return;let o=e.find(e=>e.fromLine===this.doc.lineAt(this.from).number&&e.toLine===this.doc.lineAt(this.to).number);if(o===void 0){a();return}let s=fp.sanitize(o.html,{RETURN_DOM_FRAGMENT:!0,FORBID_TAGS:[`style`,`link`,`meta`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0}).querySelector(`table`);if(s===null){a();return}s.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),s.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yu(t))}),n.mathStyle.textContent!==r&&(n.mathStyle.textContent=r),n.body.firstElementChild?.isEqualNode(s)||(n.body.classList.remove(`source`),n.body.replaceChildren(s),t.requestMeasure())}).catch(a)}destroy(e){gp.get(e)?.dispose(),gp.delete(e)}eq(e){return e.source===this.source&&e.referenceContext===this.referenceContext}ignoreEvent(){return!1}},gp=new WeakMap}));function vp(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}function yp(e,t){let n=e.pos+t;if(Qp==n&&Zp==e)return Xp;let r=e.peek(t),i=``;for(;vp(r);)i+=String.fromCharCode(r),r=e.peek(++t);return Zp=e,Qp=n,Xp=i?i.toLowerCase():r==nm||r==rm?void 0:null}function bp(e,t){this.name=e,this.parent=t}function xp(e){for(;e;e=e.parent)if(e.name==`svg`||e.name==`math`)return!0;return!1}function Sp(e,t,n){let r=2+e.length;return new g.ExternalTokenizer(i=>{for(let a=0,o=0,s=0;;s++){if(i.next<0){s&&i.acceptToken(t);break}if(a==0&&i.next==$p||a==1&&i.next==tm||a>=2&&a<r&&i.next==e.charCodeAt(a-2))a++,o++;else if(a==r&&i.next==em){s>o?i.acceptToken(t,-o):i.acceptToken(n,-(o-2));break}else if((i.next==10||i.next==13)&&s){i.acceptToken(t,1);break}else a=o=0;i.advance()}})}var Cp,wp,Tp,Ep,Dp,Op,kp,Ap,jp,Mp,Np,Pp,Fp,Ip,Lp,Rp,zp,Bp,Vp,Hp,Up,Wp,Gp,Kp,qp,Jp,Yp,Xp,Zp,Qp,$p,em,tm,nm,rm,im,am,om,sm,cm,lm,um,dm,fm,pm,mm,hm=o((()=>{Cp=55,wp=1,Tp=56,Ep=2,Dp=57,Op=3,kp=4,Ap=5,jp=6,Mp=7,Np=8,Pp=9,Fp=10,Ip=11,Lp=12,Rp=13,zp=58,Bp=14,Vp=15,Hp=59,Up=21,Wp=37,Gp=0,Kp=1,qp={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},Jp={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},Yp={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},Xp=null,Zp=null,Qp=0,$p=60,em=62,tm=47,nm=63,rm=33,im=45,am=[jp,Fp,Mp,Np,Pp],om=new g.ContextTracker({start:null,shift(e,t,n,r){return am.indexOf(t)>-1?new bp(yp(r,1)||``,e):e},reduce(e,t){return t==Up&&e?e.parent:e},reuse(e,t,n,r){let i=t.type.id;return i==jp||i==Wp?new bp(yp(r,1)||``,e):e},strict:!1}),sm=new g.ExternalTokenizer((e,t)=>{if(e.next!=$p){e.next<0&&t.context&&e.acceptToken(zp);return}e.advance();let n=e.next==tm;n&&e.advance();let r=yp(e,0);if(r===void 0)return;if(!r)return e.acceptToken(n?Vp:Bp);let i=t.context?t.context.name:null;if(n){if(r==i)return e.acceptToken(Ip);if(i&&Jp[i])return e.acceptToken(zp,-2);if(t.dialectEnabled(Gp))return e.acceptToken(Lp);for(let e=t.context;e;e=e.parent)if(e.name==r)return;e.acceptToken(Rp)}else{if(r==`script`)return e.acceptToken(Mp);if(r==`style`)return e.acceptToken(Np);if(r==`textarea`)return e.acceptToken(Pp);if(qp.hasOwnProperty(r))return e.acceptToken(Fp);i&&Yp[i]&&Yp[i][r]?e.acceptToken(zp,-1):e.acceptToken(jp)}},{contextual:!0}),cm=new g.ExternalTokenizer(e=>{for(let t=0,n=0;;n++){if(e.next<0){n&&e.acceptToken(Hp);break}if(e.next==im)t++;else if(e.next==em&&t>=2){n>=3&&e.acceptToken(Hp,-2);break}else t=0;e.advance()}}),lm=new g.ExternalTokenizer((e,t)=>{if(e.next==tm&&e.peek(1)==em){let n=t.dialectEnabled(Kp)||xp(t.context);e.acceptToken(n?Ap:kp,2)}else e.next==em&&e.acceptToken(kp,1)}),um=Sp(`script`,Cp,wp),dm=Sp(`style`,Tp,Ep),fm=Sp(`textarea`,Dp,Op),pm=(0,h.styleTags)({"Text RawText IncompleteTag IncompleteCloseTag":h.tags.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":h.tags.angleBracket,TagName:h.tags.tagName,"MismatchedCloseTag/TagName":[h.tags.tagName,h.tags.invalid],AttributeName:h.tags.attributeName,"AttributeValue UnquotedAttributeValue":h.tags.attributeValue,Is:h.tags.definitionOperator,"EntityReference CharacterReference":h.tags.character,Comment:h.tags.blockComment,ProcessingInst:h.tags.processingInstruction,DoctypeDecl:h.tags.documentMeta}),mm=g.LRParser.deserialize({version:14,states:",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",stateData:`,c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~`,goto:"%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:`⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl`,maxTerm:68,context:om,nodeProps:[[`closedBy`,-10,1,2,3,7,8,9,10,11,12,13,`EndTag`,6,`EndTag SelfClosingEndTag`,-4,22,31,34,37,`CloseTag`],[`openedBy`,4,`StartTag StartCloseTag`,5,`StartTag`,-4,30,33,36,38,`OpenTag`],[`group`,-10,14,15,18,19,20,21,40,41,42,43,`Entity`,17,`Entity TextContent`,-3,29,32,35,`TextContent Entity`],[`isolate`,-11,22,30,31,33,34,36,37,38,39,42,43,`ltr`,-3,27,28,40,``]],propSources:[pm],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[um,dm,fm,lm,sm,cm,0,1,2,3,4,5],topRules:{Document:[0,16]},dialects:{noMatch:0,selfClosing:515},tokenPrec:517})}));function gm(e,t){let n=e.doc.toString(),r=[],i=[];if((0,m.syntaxTree)(e).iterate({enter:n=>{if([`FencedCode`,`CodeBlock`,`InlineCode`,`Frontmatter`,`CommentBlock`,`BlockMath`].includes(n.name)||t&&n.name===`Table`)return!1;if(n.name===`HTMLBlock`||n.name===`HTMLTag`){let t=e.doc.length;for(let e=n.node.parent;e!==null;e=e.parent)(e.name===`ListItem`||e.name===`Blockquote`)&&(t=Math.min(t,e.to));if(r.push({from:n.from,to:n.to,limit:t}),n.name===`HTMLTag`)return!1}else n.name===`QuoteMark`&&i.push({from:n.from,to:n.to})}}),r.length===0)return[];let a=0,o=n.replace(/</g,(e,t)=>{for(;a<r.length&&r[a].to<=t;)a++;let n=r[a];return n!==void 0&&n.from<=t?e:` `}),s=[];return a=0,mm.parse(o).iterate({enter:e=>{if(e.name!==`Element`)return;let{from:t,to:o}=e;for(;a<r.length&&r[a].to<=t;)a++;let c=r[a],l=n.slice(t,o);for(let e=i.length-1;e>=0;e--){let n=i[e];n.from>=t&&n.to<=o&&(l=l.slice(0,n.from-t)+l.slice(n.to-t))}if(c!==void 0&&c.from<=t&&o<=c.limit&&_m(l))return s.push({from:t,to:o,source:l}),!1}}),s}function _m(e){let t=mm.parse(e),n=!0,r=0;return t.iterate({enter:t=>{if((t.type.isError||t.name===`MismatchedCloseTag`)&&(n=!1),t.name===`Element`){r++;let e=t.node.firstChild,i=t.node.lastChild;e?.name!==`SelfClosingTag`&&i?.name!==`CloseTag`&&(n=!1)}else t.node.parent?.name===`Document`&&(t.name!==`Text`||e.slice(t.from,t.to).trim()!==``)&&(n=!1)}}),n&&r>0}var vm,ym,bm,xm=o((()=>{hm(),Au(),id(),pp(),vm=class e extends d.WidgetType{source;fragment;block;constructor(e,t){super(),this.source=e,this.fragment=t,this.block=t.querySelector(`address, article, aside, blockquote, dd, details, dialog, div, dl, dt, fieldset, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, ul`)!==null}static create(t){if(!_m(t))return;let n=fp.sanitize(t,{RETURN_DOM_FRAGMENT:!0,USE_PROFILES:{html:!0},FORBID_TAGS:[`script`,`style`,`link`,`meta`,`base`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0});if(n.childElementCount===0)return;let r=document.createElement(`span`).style;return n.querySelectorAll(`[style]`).forEach(e=>{r.cssText=e.getAttribute(`style`)??``,e.removeAttribute(`style`);for(let t of bm){let n=r.getPropertyValue(t);n!==``&&e.style.setProperty(t,n)}}),n.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),n.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yu(t))}),new e(t,n)}toDOM(e){let t=document.createElement(this.block?`div`:`span`);t.className=`cm-md-syntaxHiddenHtml`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=wu(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i),ym.set(t,()=>window.removeEventListener(`editor-colors-changed`,i));let a=document.createElement(`style`);a.textContent=this.block?`:host { display: block; } .markdown-body { font: inherit; white-space: normal; overflow-wrap: anywhere; overflow: auto; }`:`:host { display: inline; } .markdown-body { display: inline; font: inherit; white-space: normal; overflow-wrap: anywhere; } .markdown-body::before, .markdown-body::after { content: none; }`;let o=document.createElement(this.block?`div`:`span`);return o.className=`markdown-body`,o.inert=!0,o.append(this.fragment.cloneNode(!0)),n.append(r,a,o),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),t}updateDOM(e,t){return e.tagName===`DIV`===this.block&&(e.shadowRoot.querySelector(`.markdown-body`).replaceChildren(this.fragment.cloneNode(!0)),t.requestMeasure(),!0)}eq(e){return this.source===e.source}destroy(e){ym.get(e)?.(),ym.delete(e)}ignoreEvent(){return!1}},ym=new WeakMap,bm=[`text-align`,`color`,`background-color`,`font-family`,`font-weight`,`font-style`,`text-decoration-line`,`text-decoration-color`,`text-decoration-style`]})),Sm,Cm=o((()=>{Pl(),Sm=p.Facet.define({combine:e=>e[e.length-1]??El})}));function wm(e,t=d.Decoration.none){let n=Tm(e,t);return{all:n,visible:Em(n,e)}}function Tm(e,t){let n=[],r=(0,m.syntaxTree)(e),i=e.facet(Sm),a=[];r.iterate({enter:t=>{if(t.name===`Document`)return;let n=e.sliceDoc(e.doc.lineAt(t.from).from,e.doc.lineAt(t.to).to);return(t.name!==`Paragraph`&&t.name!==`Table`||n.includes(`[`))&&a.push(n),!1}});let o=e.sliceDoc(r.length);a.push(o);let s,c=()=>s??=Ru(e.doc.toString()),l=JSON.stringify(a);if(i.includes(`html`))for(let{from:a,to:o,source:s}of gm(e,i.includes(`table`))){if(r.length<e.doc.length&&o>=r.length)continue;let i;t.between(a,o,(e,t,n)=>{let r=n.spec.widget;e===a&&t===o&&r instanceof vm&&r.source===s&&(i=r)}),i??=vm.create(s),i!==void 0&&n.push(d.Decoration.replace({block:i.block,widget:i}).range(a,o))}let u=n.slice(),f=0;return r.iterate({enter:a=>{for(;f<u.length&&u[f].to<=a.from;)f++;let o=u[f];if(a.name!==`Document`&&o!==void 0&&o.from<=a.from&&o.to>=a.to)return!1;let s;if(a.name===`Table`&&i.includes(`table`)){for(let e=a.node.parent;e!==null;e=e.parent)if(e.name!==`Document`)return!1;if(r.length<e.doc.length&&a.to>=r.length)return!1;let n=e.doc.lineAt(a.from).from,i=e.doc.lineAt(a.to).to,o=new hp(e.doc,n,i,c,l);t.between(n,i,(e,t,r)=>{let a=r.spec.widget;e===n&&t===i&&a instanceof hp&&o.eq(a)&&(o=a)}),s=d.Decoration.replace({block:!0,widget:o}).range(n,i)}if(s!==void 0)return n.push(s),!1}}),d.Decoration.set(n,!0)}function Em(e,t){return e.size===0?e:e.update({filter:(e,n,r)=>{let i=r.spec.widget instanceof hp,a=!1;if((i||r.spec.widget instanceof vm)&&(0,m.foldedRanges)(t).between(e,n,()=>{a=!0}),a||km(t,e,n))return!1;if(i&&n<t.doc.length){let e=t.doc.lineAt(n+1);if(e.text.trim()===``&&t.selection.ranges.some(t=>t.empty&&t.goalColumn===void 0&&t.head>=e.from&&t.head<=e.to))return!1}return!0}})}var Dm,Om=o((()=>{Vd(),Hd(),_p(),xm(),Cm(),Ym(),qu(),Dm=p.StateField.define({create:e=>wm(e),update(e,t){if(t.docChanged||t.reconfigured||(0,m.syntaxTree)(t.startState)!==(0,m.syntaxTree)(t.state)){let n=[];for(let r=e.all.iter();r.value!==null;r.next())if(r.value.spec.widget instanceof hp||r.value.spec.widget instanceof vm){let e=t.changes.mapPos(r.from,1),i=t.changes.mapPos(r.to,-1);e<i&&n.push(r.value.range(e,i))}return wm(t.state,d.Decoration.set(n,!0))}let n=e.all;for(let e of t.effects)e.is(mp)&&e.value.doc===t.state.doc&&(n=n.update({filter:(t,n)=>t!==e.value.from||n!==e.value.to}));return t.selection!==void 0||t.effects.length>0?{all:n,visible:Em(n,t.state)}:e},provide:e=>d.EditorView.decorations.from(e,e=>e.visible)})}));function km(e,t,n){return e.selection.ranges.some(e=>e.from<=n&&e.to>=t)}function Am(e,t,n){return km(e,t,n)||e.field(Vm,!1)?.some(e=>e.from<=t&&e.to>=n)===!0}function jm(e,t){if(e.textDirectionAt(t)!==d.Direction.LTR)return;let n=wd(e.state),r;for(let i=(0,m.syntaxTree)(e.state).resolveInner(t,-1);i!==null;i=i.parent){if(i.name===`Image`)return;if(Am(e.state,i.from,i.to))continue;let a=Fm(i,e.state,n);if(a!==void 0&&Pm(e,i))return;let o=a?.hidden.find(e=>e.to===i.to),s=r?.to??t;o!==void 0&&s>=o.from&&s<i.to&&(r={from:r?.from??o.from,to:i.to})}return r}function Mm(e){return t=>{let n=t.state,r=n.selection,i=n.field(Vm,!1);if(i===void 0||r.ranges.length!==1)return!1;let a=n.doc.lineAt(r.main.head),o=t.lineBlockAt(r.main.head);if(r.main.from<a.from||r.main.to>a.to||o.from!==a.from||o.to!==a.to||t.textDirectionAt(r.main.head)!==d.Direction.LTR)return!1;let s=()=>t.state.doc===n.doc&&t.state.selection.eq(r,!0)&&t.state.field(Vm,!1)!==void 0,c=Im(t,r,e);if(!s())return!0;if(i.length===0){if(!Nm(t,a,c.main))return!1;if(i=[{from:a.from,to:a.to}],t.dispatch({effects:Bm.of(i)}),!s())return!0;if(t.state.field(Vm)!==i)return!1;if(t.coordsAtPos(r.main.head),!s())return!0;c=Im(t,r,e)}return!s()||!c.eq(r,!0)&&(t.dispatch({selection:c,effects:Bm.of(i),scrollIntoView:!0,userEvent:`select`}),!0)}}function Nm(e,t,n){let r=!1,i=wd(e.state);return(0,m.syntaxTree)(e.state).iterate({from:t.from,to:t.to,enter:a=>{if(r||a.name===`Image`)return!1;a.from>=t.from&&a.to<=t.to&&Fm(a,e.state,i)!==void 0&&!Pm(e,a)&&(r=(n.from<=a.to&&n.to>=a.from)!==km(e.state,a.from,a.to))}}),r}function Pm(e,t){let n=!1;return e.state.field(Dm,!1)?.visible.between(t.from,t.to,(e,r)=>{n||=e<=t.from&&r>=t.to}),n}function Fm(e,t,n){return e.name===`Link`||e.name===`Autolink`?bd(e,t,n):Nd(e)}function Im(e,t,n){return p.EditorSelection.create(t.ranges.map(t=>{let r=n&&t.undirectional&&t.head<t.anchor?p.EditorSelection.range(t.head,t.anchor):t,i=e.moveToLineBoundary(r,!0);return i.head===r.head&&i.head!==e.lineBlockAt(r.head).to&&(i=e.moveToLineBoundary(r,!0,!1)),n?p.EditorSelection.range(r.anchor,i.head,i.goalColumn,i.bidiLevel??void 0,i.assoc):i}),t.mainIndex)}function Lm(e){return t=>{let n=p.EditorSelection.create(t.state.selection.ranges.map(n=>{let r=n;e&&r.undirectional&&r.head>=r.anchor&&(r=p.EditorSelection.range(r.head,r.anchor));let i=e||r.empty?Rm(t,r):p.EditorSelection.cursor(r.from);return!e&&r.empty&&i.head===r.head&&(i=t.moveToLineBoundary(r,!1)),e?p.EditorSelection.range(r.anchor,i.head,i.goalColumn,i.bidiLevel??void 0,i.assoc):i}),t.state.selection.mainIndex);return!n.eq(t.state.selection,!0)&&(t.dispatch({selection:n,scrollIntoView:!0,userEvent:`select`}),!0)}}function Rm(e,t){let n=e.moveVertically(t,!1),r=e.state.doc.lineAt(t.head),i=e.state.doc.lineAt(n.head);if(r.number-i.number<=1)return n;let a=e.state.doc.line(r.number-1);if(!zm(e,a.from))return n;let o=e.lineBlockAt(a.from),s=n.goalColumn,c=e.coordsAtPos(t.head,t.assoc||1),l=s===void 0?c?.left:e.contentDOM.getBoundingClientRect().left+s;if(l===void 0)return n;let u=e.posAndSideAtCoords({x:l,y:e.documentTop+o.top+o.height/2});return u===null||u.pos<a.from||u.pos>a.to?n:p.EditorSelection.cursor(u.pos,u.assoc,void 0,s)}function zm(e,t){for(let n=(0,m.syntaxTree)(e.state).resolve(t,1);n!==null;n=n.parent)if(n.name.startsWith(`ATXHeading`))return!0;return!1}var Bm,Vm,Hm,Um,Wm,Gm,Km,qm,Jm,Ym=o((()=>{jd(),Bd(),Om(),Bm=p.StateEffect.define(),Vm=p.StateField.define({create:()=>[],update(e,t){if(t.docChanged)return[];for(let e of t.effects)if(e.is(Bm))return e.value;return t.newSelection.eq(t.startState.selection,!0)?e:[]}}),Hm=Lm(!1),Um=Lm(!0),Wm=Mm(!1),Gm=Mm(!0),Km=p.Prec.high(d.keymap.of([{mac:`Cmd-ArrowRight`,run:Wm,shift:Gm}])),qm=p.Prec.high(d.keymap.of([{key:`ArrowUp`,run:Hm,shift:Um}])),Jm=d.EditorView.mouseSelectionStyle.of((e,t)=>{if(t.button!==0||t.detail!==1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)return null;let n={x:t.clientX,y:t.clientY},r=e.posAndSideAtCoords(n,!1);if(Number.isFinite(r.pos)){let t=jm(e,r.pos),i=t===void 0?null:e.coordsAtPos(t.from,-1);t!==void 0&&i!==null&&n.x>i.right&&n.y>=i.top&&n.y<=i.bottom&&(r={pos:t.to,assoc:-1})}return{get(t){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(t.clientX-n.x),Math.abs(t.clientY-n.y))<=5)return p.EditorSelection.create([p.EditorSelection.cursor(r.pos,r.assoc)]);let i=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1);return Number.isFinite(i.pos)?i.pos===r.pos?p.EditorSelection.create([p.EditorSelection.cursor(i.pos,i.assoc)]):p.EditorSelection.create([p.EditorSelection.range(r.pos,i.pos,void 0,void 0,i.assoc)]):e.state.selection},update(e){e.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:e.changes.mapPos(r.pos)})}}})}));function Xm(e,t){if(e.name!==`Blockquote`)return;let n=e.node.getChild(`Paragraph`);if(n===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==n.from||r.to!==n.to);){if(r.name!==`QuoteMark`)return;r=r.nextSibling}if(r===null)return;let i=t.doc.lineAt(n.from),a=t.sliceDoc(n.from,i.to),o=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(a);if(o===null)return;let s=o[1].toLowerCase(),c=n.from,l=c+o[0].length;if(!km(t,c,l))return{from:c,to:l,type:s,title:$m[s]}}function Zm(e,t){if(e.name===`QuoteMark`&&!km(t,e.from,e.to))return{from:e.from,to:e.to}}function Qm(e){if(e.name!==`Blockquote`)return;let t=1,n=e.node.parent;for(;n!==null;)n.name===`Blockquote`&&(t+=1),n=n.parent;return{from:e.from,to:e.to,depth:t}}var $m,eh=o((()=>{Ym(),$m={note:`Note`,tip:`Tip`,important:`Important`,warning:`Warning`,caution:`Caution`}})),th,nh,rh=o((()=>{th={note:`<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},nh=class extends d.WidgetType{type;title;constructor(e,t){super(),this.type=e,this.title=t}eq(e){return e.type===this.type&&e.title===this.title}toDOM(){let e=document.createElement(`span`);e.className=`cm-md-syntaxHiddenAlert`,e.dataset.type=this.type;let t=e.appendChild(document.createElement(`span`));t.className=`cm-md-syntaxHiddenAlertIcon`,t.innerHTML=th[this.type],t.setAttribute(`aria-hidden`,`true`);let n=e.appendChild(document.createElement(`span`));return n.textContent=this.title,e}ignoreEvent(){return!1}}}));function ih(e){let t=new Map,n=new Map;for(let{from:r,to:i}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:r,to:i,enter:r=>{let i=Qm(r);if(i!==void 0&&t.set(dh(i),i),r.name!==`QuoteMark`)return;let a=uh(r.node);if(a===null)return;let o=dh(a),s=e.state.doc.lineAt(r.from).from,c=n.get(o)??new Map;c.set(s,{position:r.from,active:km(e.state,r.from,r.to)}),n.set(o,c)}});let r=[];return t.forEach((t,i)=>{let a=n.get(i),o=new Set;e.viewportLineBlocks.forEach(n=>{let i=e.state.doc.lineAt(n.from);if(o.has(i.from)||i.to<t.from||i.from>=t.to)return;o.add(i.from);let s=a?.get(i.from);s?.active!==!0&&r.push({line:i.from,ownerFrom:t.from,anchor:s?.position,depth:t.depth})})}),r}function ah(e){let t=lh(e),n=new Map;return ih(e).flatMap(r=>{let i=ch(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(i===void 0||a===null)return[];let o=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(o===void 0){let t=n.get(r.ownerFrom);t===void 0&&(t=sh(e,r.ownerFrom),n.set(r.ownerFrom,t)),o=a.left+t}let s=oh(e,r.anchor??r.ownerFrom);return[new ph(r.depth,o-t.left,i.top-t.top,3,i.height,s.color,s.opacity)]})}function oh(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(i*=e)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:i}}function sh(e,t){let n=e.state.doc.lineAt(t),r=e.coordsAtPos(n.from,1),i=e.coordsAtPos(t,1);if(r!==null&&i!==null)return i.left-r.left;let a=0;for(let r of e.state.sliceDoc(n.from,t))a=r===`	`?a+e.state.tabSize-a%e.state.tabSize:a+1;return a*e.defaultCharacterWidth}function ch(e,t){let n=e.domAtPos(t).node;return(n instanceof HTMLElement?n:n.parentElement)?.closest(`.cm-line`)}function lh(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function uh(e){let t=e.parent;for(;t!==null&&t.name!==`Blockquote`;)t=t.parent;return t}function dh(e){return`${e.from}:${e.to}`}var fh,ph,mh=o((()=>{eh(),Ym(),fh=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenBlockquoteLayer`,markers:ah,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),ph=class extends d.RectangleMarker{color;opacity;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${e}`,t,n,r,i),this.color=a,this.opacity=o}draw(){let e=super.draw();return e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,e}update(e,t){return super.update(e,t)?(e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity}}}));function hh(e,t){if(e.name!==`ListMark`)return;let n=e.node.parent,r=n?.getChild(`Task`),i=r?.getChild(`TaskMarker`);if(n?.name===`ListItem`&&n.parent?.name===`BulletList`&&/^[ \t]$/.test(t.sliceDoc(e.to,e.to+1))&&!km(t,e.from,i?.to??e.to))return{from:e.from,to:e.to,task:r!==null}}var gh=o((()=>{Ym()}));function _h(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{let r=hh(n,e.state);r!==void 0&&!r.task&&t.push({from:r.from,to:r.to})}});return t}function vh(e){let t=bh(e);return _h(e).flatMap(n=>{let r=e.coordsForChar(n.from);if(r===null)return[];let i=yh(e,n.from);return[new Sh(r.left-t.left,r.top-t.top,r.right-r.left,r.bottom-r.top,i.color,i.opacity,i.textShadow)]})}function yh(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=getComputedStyle(r??e.contentDOM),a=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(a*=e)}return{color:i.color,opacity:a,textShadow:i.textShadow===`none`?``:i.textShadow}}function bh(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}var xh,Sh,Ch=o((()=>{gh(),xh=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenListBulletLayer`,markers:vh,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),Sh=class extends d.RectangleMarker{color;opacity;textShadow;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenListBullet`,e,t,n,r),this.color=i,this.opacity=a,this.textShadow=o}draw(){let e=super.draw();return e.textContent=`•`,e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,e}update(e,t){return super.update(e,t)?(e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity&&this.textShadow===e.textShadow}}}));function wh(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{if(n.name!==`TaskMarker`)return;let r=n.node.parent,i=r?.parent,a=i?.getChild(`ListMark`),o=n.to+1;r?.name===`Task`&&i?.name===`ListItem`&&i.parent?.name===`BulletList`&&a!=null&&e.state.sliceDoc(n.to,o)===` `&&!km(e.state,a.from,n.to)&&t.push({from:a.from,to:o,markerFrom:n.from,listPrefix:e.state.sliceDoc(a.from,a.to+1),checked:e.state.sliceDoc(n.from,n.to)!==`[ ]`,label:e.state.sliceDoc(o,e.state.doc.lineAt(n.to).to).trim()||`Task`})}});return t}function Th(e){let t=e.state.readOnly||!e.state.facet(d.EditorView.editable),n=wh(e).map(e=>d.Decoration.replace({widget:new Ah(e.markerFrom,e.listPrefix,e.checked,e.label,t)}).range(e.from,e.to));return d.Decoration.set(n,!0)}function Eh(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);if(t===null||t.offsetWidth===0)return;let n=parseFloat(getComputedStyle(e).fontSize);t.style.setProperty(`--cm-md-task-checkbox-scale`,`${n/t.offsetWidth}`)}function Dh(e,t,n){let r=e.state.sliceDoc(t,t+3);if(e.state.readOnly||!e.state.facet(d.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;let i=e.state.changes({from:t+1,to:t+2,insert:n?`x`:` `});e.dispatch({changes:i,effects:e.scrollSnapshot().map(i)??[],userEvent:`input`})}var Oh,kh,Ah,jh=o((()=>{Ym(),Oh=typeof ResizeObserver>`u`?void 0:new ResizeObserver(e=>{for(let t of e)Eh(t.target)}),kh=[d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=Th(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(e=>e.reconfigured))&&(this.decorations=Th(e.view))}},{decorations:e=>e.decorations}),d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:`inline-block`,position:`relative`,height:`1lh`,margin:`0`,textIndent:`0`,verticalAlign:`top`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:`absolute`,insetBlockStart:`0`,insetInlineStart:`-0.15em`,display:`grid`,placeItems:`center`,width:`1em`,height:`1lh`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:`0`,transform:`translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))`}})],Ah=class extends d.WidgetType{markerFrom;listPrefix;checked;label;disabled;constructor(e,t,n,r,i){super(),this.markerFrom=e,this.listPrefix=t,this.checked=n,this.label=r,this.disabled=i}eq(e){return this.markerFrom===e.markerFrom&&this.listPrefix===e.listPrefix&&this.checked===e.checked&&this.label===e.label&&this.disabled===e.disabled}toDOM(e){let t=document.createElement(`span`);t.className=`cm-md-syntaxHiddenTaskCheckboxFrame`;let n=t.appendChild(document.createElement(`span`));n.className=`cm-md-syntaxHiddenTaskCheckboxMarker`,n.textContent=this.listPrefix;let r=t.appendChild(document.createElement(`span`));r.className=`cm-md-syntaxHiddenTaskCheckboxControl`;let i=r.appendChild(document.createElement(`input`));return i.className=`cm-md-syntaxHiddenTaskCheckbox`,i.type=`checkbox`,this.updateInput(i),i.addEventListener(`change`,()=>Dh(e,Number(i.dataset.markerFrom),i.checked)),Oh?.observe(t),t}updateDOM(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);return t!==null&&(this.updateInput(t),!0)}destroy(e){Oh?.unobserve(e)}ignoreEvent(){return!0}updateInput(e){e.checked=this.checked,e.disabled=this.disabled,e.dataset.markerFrom=`${this.markerFrom}`,e.setAttribute(`aria-label`,this.label)}}}));function Mh(e){let t=e.trim().toLowerCase();return Ih.test(t)&&!Lh.test(t)?!1:(window.open(e,`_blank`,`noopener`),!0)}async function Nh(e,t,n=`definition`){let r=e.state,i=(0,m.ensureSyntaxTree)(r,r.doc.length,5e3);if(i===null)return!1;let a;return i.iterate({enter:e=>{if(a!==void 0)return!1;if(n===`reference`){let n=xd(e,r).find(e=>e.label===t);n!==void 0&&(a=p.EditorSelection.range(n.from,n.to))}else e.name===`LinkDefinition`&&r.sliceDoc(e.from,e.to)===`[${t}]`&&(a=p.EditorSelection.range(e.from,e.to))}}),a===void 0?(_(),!1):(Fh(e,a),!0)}async function Ph(e,t){let n=e.state.doc,r=await zu(n.toString(),t);if(r===void 0||e.state.doc!==n)return!1;let i=e.state.doc.line(r+1).from;return Fh(e,p.EditorSelection.cursor(i)),!0}function Fh(e,t){let n=e.state.doc,r=e.scrollDOM.scrollTop,i=n=>e.dispatch({effects:d.EditorView.scrollIntoView(t.from,{y:n,yMargin:5})});e.dispatch({selection:t}),i(`start`),setTimeout(()=>{e.state.doc===n&&Math.abs(e.scrollDOM.scrollTop-r)<.001&&i(`center`)},50)}var Ih,Lh,Rh=o((()=>{jd(),qu(),ue(),Ih=/^(?:vbscript|javascript|file|data):/,Lh=/^data:image\/(?:gif|png|jpeg|webp);/})),zh,Bh,Vh=o((()=>{Rh(),ue(),Pu(),zh={link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>`,footnoteBack:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>`},Bh=class extends d.WidgetType{kind;destination;label;highlightClasses;constructor(e,t,n,r,i){super(),this.kind=e,this.destination=n,this.label=r,this.highlightClasses=(0,m.highlightingFor)(t,i)??``}toDOM(e){let t=document.createElement(`button`);return t.type=`button`,t.className=[`cm-md-syntaxHiddenLinkButton`,this.highlightClasses].filter(Boolean).join(` `),t.dataset.kind=this.kind,t.title=this.kind===`footnote`||this.kind===`footnoteBack`?U(this.kind===`footnote`?`goToFootnoteDefinition`:`backToFootnoteReference`).replace(`%s`,()=>this.destination.slice(1)):this.destination,t.innerHTML=zh[this.kind===`footnote`?`link`:this.kind],t.setAttribute(`aria-label`,t.title||this.label),t.addEventListener(`click`,t=>{t.stopPropagation(),this.kind===`footnote`?Nh(e,this.destination):this.kind===`footnoteBack`?Nh(e,this.destination,`reference`):this.destination.startsWith(`#`)?Ph(e,this.destination):this.destination===``?_():Mh(this.destination)}),t}eq(e){return e.kind===this.kind&&e.highlightClasses===this.highlightClasses&&e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!0}}})),Hh,Uh=o((()=>{Hh=class extends d.WidgetType{text;constructor(e){super(),this.text=e}eq(e){return e.text===this.text}toDOM(){let e=document.createElement(`span`);return e.textContent=this.text,e}ignoreEvent(){return!1}}})),Wh,Gh=o((()=>{id(),Wh=class extends d.WidgetType{destination;label;constructor(e,t){super(),this.destination=e,this.label=t}toDOM(){let e=document.createElement(`img`);return e.className=`cm-md-syntaxHiddenImage`,e.src=Yu(this.destination),e.alt=this.label,e.title=this.destination,e.draggable=!1,e}eq(e){return e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!1}}}));function Kh(e,t){let n=[];if(e.name!==`FencedCode`)return n;let r=t.state,i=e.node.firstChild,a=e.node.lastChild;if(i?.name!==`CodeMark`||a?.name!==`CodeMark`||i.from===a.from||!r.sliceDoc(i.from,i.to).startsWith("```"))return n;let o=r.doc.lineAt(i.from),s=r.doc.lineAt(a.from);e.node.getChild(`CodeInfo`);let c=!1;if((0,m.foldedRanges)(r).between(o.to,s.to,(e,t)=>{if(e>=o.to&&t>=s.to)return c=!0,!1}),c)return n;for(let{from:e,to:i}of t.visibleRanges){let t=Math.max(o.number,r.doc.lineAt(e).number),a=Math.min(s.number,r.doc.lineAt(i).number);for(let e=t;e<=a;e++){let t=r.doc.line(e),i=[`cm-md-syntaxHiddenCodeBlock`];e===o.number&&i.push(`cm-md-syntaxHiddenCodeStart`),e===s.number&&i.push(`cm-md-syntaxHiddenCodeEnd`),o.number,n.push(d.Decoration.line({class:i.join(` `),attributes:void 0}).range(t.from))}}return n}var qh=o((()=>{Ym(),d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence`})}));function Jh(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`ATXHeading`)!==!0||n.firstChild?.from!==e.from)return;let r=Xh(t,e.to,n.to);if(Zh(t,r,n.to)&&!km(t,n.from,n.to))return{from:e.from,to:r}}function Yh(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`SetextHeading`)!==!0)return;let r=t.doc.lineAt(e.from);if(!km(t,n.from,n.to))return r.from}function Xh(e,t,n){return t+(/^ */.exec(e.sliceDoc(t,n))?.[0].length??0)}function Zh(e,t,n){return/\S/.test(e.sliceDoc(t,n))}var Qh=o((()=>{Ym()}));function $h(e,t){if(e.name!==`HorizontalRule`||e.node.parent?.name!==`Document`)return;let n=t.doc.lineAt(e.from);if(!km(t,n.from,n.to))return d.Decoration.replace({widget:new eg((0,m.highlightingFor)(t,[h.tags.contentSeparator])??``)}).range(n.from,n.to)}var eg,tg=o((()=>{Ym(),eg=class extends d.WidgetType{highlightClass;constructor(e){super(),this.highlightClass=e}eq(e){return e.highlightClass===this.highlightClass}toDOM(){let e=document.createElement(`span`);return e.className=[`cm-md-syntaxHiddenHorizontalRule`,this.highlightClass].filter(Boolean).join(` `),e.setAttribute(`role`,`separator`),e.setAttribute(`aria-orientation`,`horizontal`),e}}})),ng,rg=o((()=>{ng=d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTable":{boxSizing:`border-box`,width:`100%`,padding:`0.5em 6px`,overflow:`hidden`,contain:`content`,cursor:`text`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeBlock":{"--code-border":`color-mix(in srgb, currentColor 18%, transparent)`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border)`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart":{position:`relative`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 1px var(--code-border)`,borderTopLeftRadius:`6px`,borderTopRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart[data-code-language]::after":{content:`attr(data-code-language)`,position:`absolute`,top:`0.5em`,right:`0.5em`,maxWidth:`calc(100% - 1em)`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,fontSize:`0.8em`,lineHeight:`1`,opacity:`0.55`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeEnd":{boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 -1px var(--code-border)`,borderBottomLeftRadius:`6px`,borderBottomRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:`0px !important`,fontVariantLigatures:`none !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:`inherit !important`,lineHeight:`inherit !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`Menlo, monospace`,fontSize:`0.9em`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:`0 !important`},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:`0`,lineHeight:`0`,overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:`3px`,borderBottomLeftRadius:`3px`,paddingInlineStart:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:`3px`,borderBottomRightRadius:`3px`,paddingInlineEnd:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:`inline-flex`,alignItems:`center`,boxSizing:`border-box`,height:`1em`,lineHeight:`1em`,verticalAlign:`middle`,gap:`0.4em`,fontFamily:`system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,fontStyle:`normal`,fontWeight:`500`,textIndent:`0`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#0969da`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#1a7f37`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#8250df`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#9a6700`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#d1242f`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#2f81f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#3fb950`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#a371f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#d29922`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#f85149`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:`inline-block`,width:`1em`,height:`1em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:`block`,width:`100%`,height:`100%`,fill:`currentColor`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:`inline-block`,appearance:`none`,width:`0.9em`,height:`0.9em`,padding:`0`,border:`0`,background:`transparent`,font:`inherit`,marginInlineStart:`0.25em`,verticalAlign:`-0.1em`,cursor:`pointer`},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:`inherit`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:`block`,width:`100%`,height:`100%`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:`inline-block`,width:`100%`,borderTop:`2px solid currentColor`,verticalAlign:`middle`,opacity:`0.35`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:`inline-block`,maxWidth:`100%`,height:`auto`,verticalAlign:`middle`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:`0`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:`block`,maxWidth:`100%`,height:`auto`,marginInline:`auto`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:`pre-wrap`,textAlign:`start`}})})),ig=c({createHiddenSyntaxExtension:()=>ag,hiddenSyntaxExtension:()=>hg});function ag(e=El){return[Sm.of(e),mg]}function og(e){let t=[],n=new Set,r=new Set,i=e.state.facet(Sm).includes(`image`),a=e.state.facet(Sm).includes(`html`),o=wd(e.state);for(let{from:s,to:c}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:s,to:c,enter:s=>{if(a){let t=!1;if(e.state.field(Dm).visible.between(s.from,s.to,(e,n,r)=>{r.spec.widget instanceof vm&&e<s.to&&n>s.from&&(t||=e<=s.from&&n>=s.to)}),t)return!1}s.name===`FencedCode`&&!r.has(s.from)&&(r.add(s.from),t.push(...Kh(s,e)));let c=Xm(s,e.state);c!==void 0&&!n.has(c.from)&&(n.add(c.from),t.push(d.Decoration.replace({widget:new nh(c.type,c.title)}).range(c.from,c.to)));let l=Zm(s,e.state);l!==void 0&&t.push(cg.range(l.from,l.to));let u=hh(s,e.state);if(u!==void 0){let e=u.task?ug:lg;t.push(e.range(u.from,u.to))}let f=bd(s,e.state,o),p=f?.image?km:Am;if(f!==void 0&&!p(e.state,s.from,s.to)){let n=e.state.sliceDoc(f.label.from,f.label.to);if(i&&f.image&&f.destination!==``)t.push(d.Decoration.replace({widget:new Wh(f.destination,n)}).range(s.from,s.to));else{f.hidden.forEach(e=>t.push(sg.range(e.from,e.to)));let r=f.image?pg:fg;t.push(r.range(f.label.from,f.label.to)),t.push(d.Decoration.widget({widget:new Bh(f.image?`image`:`link`,e.state,f.destination,n,f.highlightTags),side:-1}).range(f.label.to))}}let m=xd(s,e.state);for(let n of m)km(e.state,n.from,n.to)||(t.push(sg.range(n.from+1,n.from+2)),t.push(fg.range(n.from,n.to)),t.push(d.Decoration.widget({widget:new Bh(`footnote`,e.state,n.label,n.label,n.highlightTags),side:-1}).range(n.to)));let h=Sd(s,e.state);h!==void 0&&(h.hidden.forEach(e=>t.push(sg.range(e.from,e.to))),t.push(d.Decoration.widget({widget:new Bh(`footnoteBack`,e.state,h.label,h.label,h.highlightTags),side:-1}).range(h.suffixPosition)),h.suffix!==``&&t.push(d.Decoration.widget({widget:new Hh(h.suffix),side:1}).range(h.suffixPosition)));let g=Md(s,e.state);t.push(...g);let _=$h(s,e.state);_!==void 0&&t.push(_);let v=Jh(s,e.state);v!==void 0&&t.push(sg.range(v.from,v.to));let y=Yh(s,e.state);y!==void 0&&t.push(dg.range(y))}});return d.Decoration.set(t,!0)}var sg,cg,lg,ug,dg,fg,pg,mg,hg,gg=o((()=>{eh(),rh(),mh(),Ch(),jh(),Vh(),Uh(),Gh(),xm(),Om(),Cm(),qh(),Qh(),tg(),Bd(),jd(),rg(),gh(),Ym(),Pl(),sg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),cg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark`}),lg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark`}),ug=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark`}),dg=d.Decoration.line({class:`cm-md-syntaxHiddenSetextUnderline`}),fg=d.Decoration.mark({class:`cm-md-syntaxHiddenLinkLabel`}),pg=d.Decoration.mark({class:`cm-md-syntaxHiddenImageLabel`}),mg=[d.EditorView.editorAttributes.of({class:`cm-md-syntaxHiddenMode`}),qm,Vm,Km,Jm,d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=og(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.field(Vm)!==e.state.field(Vm)||e.transactions.some(e=>e.reconfigured))&&(this.decorations=og(e.view))}},{decorations:e=>e.decorations}),fh,xh,kh,Dm,ng],hg=ag()})),_g=new p.Compartment,vg=_g.of([]),yg=0;async function bg(e,t){let n=++yg,r=t?await Sg():[];n===yg&&(e.dispatch({effects:_g.reconfigure(r)}),t&&e.requestMeasure())}var xg;function Sg(){return xg??=Promise.resolve().then(()=>(gg(),ig)).then(e=>e.hiddenSyntaxExtension)}var Cg=function(e,t){return Number(e.slice(0,-1*t.length))},wg=function(e){return e.endsWith(`px`)?{value:e,type:`px`,numeric:Cg(e,`px`)}:e.endsWith(`fr`)?{value:e,type:`fr`,numeric:Cg(e,`fr`)}:e.endsWith(`%`)?{value:e,type:`%`,numeric:Cg(e,`%`)}:e===`auto`?{value:e,type:`auto`}:null},Tg=function(e){return e.split(` `).map(wg)},Eg=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=!1);var i=r?e+1:e;return t.slice(0,i).reduce(function(e,t){return e+t.numeric},0)+(n?e*n:0)},Dg=function(e,t,n){return t.concat(n).map(function(t){return t.style[e]}).filter(function(e){return e!==void 0&&e!==``})},Og=function(e,t){return t.endsWith(e)?Number(t.slice(0,-1*e.length)):null},kg=function(e){for(var t=0;t<e.length;t++)if(e[t].numeric>0)return t;return null},Ag=function(){return!1},jg=function(e,t,n){e.style[t]=n},Z=function(e,t,n){var r=e[t];return r===void 0?n:r};function Mg(e){var t;return(t=[]).concat.apply(t,Array.from(e.ownerDocument.styleSheets).map(function(e){var t=[];try{t=Array.from(e.cssRules||[])}catch{}return t})).filter(function(t){var n=!1;try{n=e.matches(t.selectorText)}catch{}return n})}var Ng=`grid-template-columns`,Pg=`grid-template-rows`,Q=function(e,t,n){this.direction=e,this.element=t.element,this.track=t.track,e===`column`?(this.gridTemplateProp=Ng,this.gridGapProp=`grid-column-gap`,this.cursor=Z(n,`columnCursor`,Z(n,`cursor`,`col-resize`)),this.snapOffset=Z(n,`columnSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`columnDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientX`,this.optionStyle=Z(n,`gridTemplateColumns`)):e===`row`&&(this.gridTemplateProp=Pg,this.gridGapProp=`grid-row-gap`,this.cursor=Z(n,`rowCursor`,Z(n,`cursor`,`row-resize`)),this.snapOffset=Z(n,`rowSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`rowDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientY`,this.optionStyle=Z(n,`gridTemplateRows`)),this.onDragStart=Z(n,`onDragStart`,Ag),this.onDragEnd=Z(n,`onDragEnd`,Ag),this.onDrag=Z(n,`onDrag`,Ag),this.writeStyle=Z(n,`writeStyle`,jg),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener(`mousedown`,this.startDragging),this.element.addEventListener(`touchstart`,this.startDragging))};Q.prototype.getDimensions=function(){var e=this.grid.getBoundingClientRect(),t=e.width,n=e.height,r=e.top,i=e.bottom,a=e.left,o=e.right;this.direction===`column`?(this.start=r,this.end=i,this.size=n):this.direction===`row`&&(this.start=a,this.end=o,this.size=t)},Q.prototype.getSizeAtTrack=function(e,t){return Eg(e,this.computedPixels,this.computedGapPixels,t)},Q.prototype.getSizeOfTrack=function(e){return this.computedPixels[e].numeric},Q.prototype.getRawTracks=function(){var e=Dg(this.gridTemplateProp,[this.grid],Mg(this.grid));if(!e.length){if(this.optionStyle)return this.optionStyle;throw Error(`Unable to determine grid template tracks from styles.`)}return e[0]},Q.prototype.getGap=function(){var e=Dg(this.gridGapProp,[this.grid],Mg(this.grid));return e.length?e[0]:null},Q.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]},Q.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]},Q.prototype.setTracks=function(e){this.tracks=e.split(` `),this.trackValues=Tg(e)},Q.prototype.setComputedTracks=function(e){this.computedTracks=e.split(` `),this.computedPixels=Tg(e)},Q.prototype.setGap=function(e){this.gap=e},Q.prototype.setComputedGap=function(e){this.computedGap=e,this.computedGapPixels=Og(`px`,this.computedGap)||0},Q.prototype.getMousePosition=function(e){return`touches`in e?e.touches[0][this.clientAxis]:e[this.clientAxis]},Q.prototype.startDragging=function(e){if(!(`button`in e&&e.button!==0)){e.preventDefault(),this.grid=this.element?this.element.parentNode:e.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(e){return e.type===`%`}),n=this.trackValues.filter(function(e){return e.type===`fr`});if(this.totalFrs=n.length,this.totalFrs){var r=kg(n);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/n[r].numeric)}if(t.length){var i=kg(t);i!==null&&(this.percentageToPixels=this.computedPixels[i].numeric/t[i].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(e)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error(`Invalid track index: `+this.track+`. Track must be between two other tracks and only `+this.tracks.length+` tracks were found.`);this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener(`mouseup`,this.stopDragging),window.addEventListener(`touchend`,this.stopDragging),window.addEventListener(`touchcancel`,this.stopDragging),window.addEventListener(`mousemove`,this.drag),window.addEventListener(`touchmove`,this.drag),this.grid.addEventListener(`selectstart`,Ag),this.grid.addEventListener(`dragstart`,Ag),this.grid.style.userSelect=`none`,this.grid.style.webkitUserSelect=`none`,this.grid.style.MozUserSelect=`none`,this.grid.style.pointerEvents=`none`,this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}},Q.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)},Q.prototype.drag=function(e){var t=this.getMousePosition(e),n=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,i=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(n-this.dragStartOffset),a=r+this.snapOffset,o=i-this.snapOffset;t<a&&(t=r),t>o&&(t=i),t<r?t=r:t>i&&(t=i);var s=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,c=this.bTrackEnd-t+this.dragStartOffset-n-this.computedGapPixels;if(this.dragInterval>1){var l=Math.round(s/this.dragInterval)*this.dragInterval;c-=l-s,s=l}if(s<this.minSizeStart&&(s=this.minSizeStart),c<this.minSizeEnd&&(c=this.minSizeEnd),this.trackValues[this.aTrack].type===`px`)this.tracks[this.aTrack]=s+`px`;else if(this.trackValues[this.aTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.aTrack]=`1fr`;else{var u=s/this.frToPixels;this.tracks[this.aTrack]=u+`fr`}}else if(this.trackValues[this.aTrack].type===`%`){var d=s/this.percentageToPixels;this.tracks[this.aTrack]=d+`%`}if(this.trackValues[this.bTrack].type===`px`)this.tracks[this.bTrack]=c+`px`;else if(this.trackValues[this.bTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.bTrack]=`1fr`;else{var f=c/this.frToPixels;this.tracks[this.bTrack]=f+`fr`}}else if(this.trackValues[this.bTrack].type===`%`){var p=c/this.percentageToPixels;this.tracks[this.bTrack]=p+`%`}var m=this.tracks.join(` `);this.writeStyle(this.grid,this.gridTemplateProp,m),this.onDrag(this.direction,this.track,m)},Q.prototype.cleanup=function(){window.removeEventListener(`mouseup`,this.stopDragging),window.removeEventListener(`touchend`,this.stopDragging),window.removeEventListener(`touchcancel`,this.stopDragging),window.removeEventListener(`mousemove`,this.drag),window.removeEventListener(`touchmove`,this.drag),this.grid&&(this.grid.removeEventListener(`selectstart`,Ag),this.grid.removeEventListener(`dragstart`,Ag),this.grid.style.userSelect=``,this.grid.style.webkitUserSelect=``,this.grid.style.MozUserSelect=``,this.grid.style.pointerEvents=``,this.grid.style.cursor=``),window.document.body.style.cursor=``},Q.prototype.destroy=function(e,t){e===void 0&&(e=!0),e||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var Fg=function(e,t,n){return t in e?e[t]:n},Ig=function(e,t){return function(n){if(n.track<1)throw Error(`Invalid track index: `+n.track+`. Track must be between two other tracks.`);var r=e===`column`?t.columnMinSizes||{}:t.rowMinSizes||{},i=e===`column`?`columnMinSize`:`rowMinSize`;return new Q(e,Object.assign({},{minSizeStart:Fg(r,n.track-1,Z(t,i,Z(t,`minSize`,0))),minSizeEnd:Fg(r,n.track+1,Z(t,i,Z(t,`minSize`,0)))},n),t)}},Lg=function(e){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:e.columnGutters||[],rowGutters:e.rowGutters||[],columnMinSizes:e.columnMinSizes||{},rowMinSizes:e.rowMinSizes||{}},e),this.options.columnGutters.forEach(function(e){t.columnGutters[e.track]=Ig(`column`,t.options)(e)}),this.options.rowGutters.forEach(function(e){t.rowGutters[e.track]=Ig(`row`,t.options)(e)})};Lg.prototype.addColumnGutter=function(e,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=Ig(`column`,this.options)({element:e,track:t})},Lg.prototype.addRowGutter=function(e,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=Ig(`row`,this.options)({element:e,track:t})},Lg.prototype.removeColumnGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.columnGutters[e]&&this.columnGutters[e].destroy(t,function(){delete n.columnGutters[e]})},Lg.prototype.removeRowGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.rowGutters[e]&&this.rowGutters[e].destroy(t,function(){delete n.rowGutters[e]})},Lg.prototype.handleDragStart=function(e,t,n){t===`column`?(this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=Ig(`column`,this.options)({track:n}),this.columnGutters[n].startDragging(e)):t===`row`&&(this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=Ig(`row`,this.options)({track:n}),this.rowGutters[n].startDragging(e))},Lg.prototype.destroy=function(e){var t=this;e===void 0&&(e=!0),Object.keys(this.columnGutters).forEach(function(n){return t.columnGutters[n].destroy(e,function(){delete t.columnGutters[n]})}),Object.keys(this.rowGutters).forEach(function(n){return t.rowGutters[n].destroy(e,function(){delete t.rowGutters[n]})})};function Rg(e){return new Lg(e)}var zg=`body .markdown-body details summary,
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
`;ue(),qu(),id(),Pl(),Pu(),Au();var Bg=document.body,Vg=document.createElement(`div`),$=document.createElement(`div`),Hg=y(`* { cursor: col-resize }`,!1),Ug=p.Annotation.define(),Wg=function(e){return e[e.edit=0]=`edit`,e[e.sideBySide=1]=`sideBySide`,e[e.preview=2]=`preview`,e[e.syntaxHidden=3]=`syntaxHidden`,e}({});function Gg(){y(zg),y(Tu()),y(Du());let e=document.createElement(`div`);e.className=vd.dividerViewClass,Vg.appendChild(e),Vg.className=vd.gutterViewClass,Bg.appendChild(Vg),$.className=vd.previewPaneClass,Bg.appendChild($),document.addEventListener(`keydown`,e=>{if(!e.metaKey||e.key!==`a`)return;let t=f.MarkEdit.editorView?.contentDOM??document.querySelector(`.cm-content`);($.classList.contains(`overlay`)||document.activeElement!==t)&&(ie($),e.preventDefault())}),new MutationObserver(c_).observe($,{attributes:!0,attributeFilter:[`style`,`class`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{c_(),document.querySelector(`.mermaid`)!==null&&Zg()}),typeof f.MarkEdit.getFileInfo==`function`&&typeof f.MarkEdit.openFile==`function`&&$.addEventListener(`click`,d_),$.addEventListener(`click`,e=>{f_(e),p_(e)})}function Kg(e,t=!0){let n=Yg();m_.viewMode=e,e!==n&&localStorage.setItem(yd.viewModeCacheKey,String(e));let r=f.MarkEdit.editorView;bg(r,e===3),Xg()?r.focus():e===2&&r.contentDOM.blur(),e===1?(Bg.classList.add(vd.containerClass),m_.splitter??=Rg({columnGutters:[{track:1,element:Vg}],minSize:150,onDragStart:()=>Hg.disabled=!1,onDragEnd:()=>Hg.disabled=!0})):(Bg.classList.remove(vd.containerClass),m_.splitter?.destroy(),m_.splitter=void 0),e===2?$.classList.add(`overlay`):$.classList.remove(`overlay`),t?Zg(!0):++m_.renderVersion}function qg(){let e=Al.map(e=>{switch(e){case`edit`:return 0;case`side-by-side`:return 1;case`preview`:return 2;case`syntax-hidden`:return 3;default:return}}).filter(e=>e!==void 0),t=e.some(e=>e===0||e===3)?e:[0,...e],n=t.indexOf(Yg());Kg(t[n===-1?0:(n+1)%t.length])}function Jg(){let e=localStorage.getItem(yd.viewModeCacheKey);if(e===null)return;let t=Number(e);if(Yg()===t){t===3&&bg(f.MarkEdit.editorView,!0);return}Kg(t,!0)}function Yg(){return m_.viewMode}function Xg(){let e=Yg();return e===0||e===3}async function Zg(e=Yg()!==2||!$.hasChildNodes()){let t=++m_.renderVersion;if(Xg())return;let n=Ju(await s_());if(t!==m_.renderVersion)return;let r={top:$.scrollTop,left:$.scrollLeft};$.innerHTML=n;let i=localStorage.getItem(yd.previewPageZoomKey);i!==null&&l_(i);let a=()=>{e&&t===m_.renderVersion&&od(r_(),$,!1)};e?a():$.scrollTo(r),Bu(a,$)}function Qg(e){if(Xg()||Yg()===1&&f.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key===`0`)return;let t=Number($.style.zoom)||1,n=e=>String(Math.min(Math.max(e,.5),3));switch(e.key){case`-`:case`_`:l_(n(t-.1));break;case`=`:case`+`:l_(n(t+.1));break;case`0`:l_(`1`);break;default:return}localStorage.setItem(yd.previewPageZoomKey,$.style.zoom),e.preventDefault(),e.stopPropagation()}function $g(){u_(!1)}function e_(){u_(!0)}function t_(){let e=s_(!1);return ce(new ClipboardItem({"text/plain":e.then(e=>new Blob([e],{type:`text/plain`}))}),U(`failedToCopy`))}function n_(){let e=s_(!1);return ce(new ClipboardItem({"text/html":e.then(e=>new Blob([e],{type:`text/html`})),"text/plain":e.then(e=>new Blob([le(e)],{type:`text/plain`}))}),U(`failedToCopy`))}function r_(){return f.MarkEdit.editorView.scrollDOM}function i_(){return $}async function a_(e){let t=await s_(!1);return e?await Vu(t):`<meta charset="UTF-8">\n${t}`}async function o_(e,t){let n=await Lu(e,!1);return t?await Vu(n):`<meta charset="UTF-8">\n${n}`}async function s_(e=!0){return await Lu(f.MarkEdit.editorAPI.getText(),e)}function c_(){let e=getComputedStyle($).backgroundColor;Vg.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function l_(e){$.style.zoom=e,$.classList.toggle(`zoomed-in`,Number(e)>1)}async function u_(e){let t=await(async()=>{let e=await f.MarkEdit.getFileInfo();return e===void 0?`${U(`untitled`)}.html`:`${ee(e.filePath)}.html`})(),n=await a_(e);f.MarkEdit.showSavePanel({fileName:t,string:n})}async function d_(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`a`);if(t===null)return;let n=t.getAttribute(`href`);if(!n?.startsWith(`../`))return;let r=(await f.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{let e=oe(r,decodeURIComponent(n));await f.MarkEdit.openFile(e)}catch(e){console.error(`Failed to open file:`,e)}}}function f_(e){let t=`suppress-underline`,n=e.target instanceof Element?e.target.closest(`a`):null;n!==null&&hd($,e),n!==null&&!n.classList.contains(t)&&n.matches(`:hover`)&&(n.classList.add(t),n.addEventListener(`mouseleave`,()=>n.classList.remove(t),{once:!0}))}function p_(e){let t=e.target;if(!(t instanceof HTMLInputElement)||!t.classList.contains(`task-list-item-checkbox`))return;let n=t.closest(`[data-line-from]`);if(n===null){console.error(`Failed to find task item block`);return}let r=f.MarkEdit.editorAPI,i=r.getLineRange(x(n).from),a=md(r.getText(i));if(a===null){t.checked=!t.checked,console.error(`Failed to resolve task toggle`);return}let o=i.from+a.offset;f.MarkEdit.editorView.dispatch({changes:{from:o,to:o+1,insert:a.replacement},annotations:Ug.of(!0)})}var m_={viewMode:0,splitter:void 0,renderVersion:0};ue();var h_=`markedit-preview`,g_=`${h_}.js`;function __(e){let{destExists:t,bundleInfo:n,currentVersion:r}=e,i=n?.version===r,a=n?.fullBuild===!1;return!(t&&i&&a)}async function v_(){try{let e=f.MarkEdit.getDirectoryPath(`documents`),t=f.MarkEdit.getDirectoryPath(`sharedContainer`);if(e===void 0||t===void 0){console.error(`Required directories are not accessible`);return}let n=typeof __FILE_PATH__==`string`?__FILE_PATH__:oe(e,`scripts/${g_}`);if(await f.MarkEdit.getFileInfo(n)===void 0){console.error(`Source file not found at ${n}`);return}let r=n.split(`/`).pop()??g_,i=oe(t,`Shared/scripts`),a=oe(i,r),o=await f.MarkEdit.getFileInfo(a)!==void 0,s=oe(t,`Shared/metadata.json`),c=await se(s),l=c[h_];if(!__({destExists:o,bundleInfo:l,currentVersion:`1.13.0`}))return;let u=await f.MarkEdit.getFileContent(n);if(u===void 0){console.error(`Failed to read content from ${n}`);return}await f.MarkEdit.createFile({path:i,isDirectory:!0}),await f.MarkEdit.createFile({path:a,string:u,overwrites:!0}),await f.MarkEdit.createFile({path:s,string:JSON.stringify({...c,[h_]:{version:`1.13.0`,fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error(`Failed to copy the current file to shared container:`,e)}}Pu();var y_=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>`,b_=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>`;function x_(){let e=S_(U(`source`),y_),t=S_(U(`preview`),b_),n=document.createElement(`div`);n.className=`quicklook-segmented`,n.setAttribute(`role`,`tablist`),n.append(e,t);let r=document.createElement(`div`);return r.className=`quicklook-toolbar`,r.appendChild(n),{toolbar:r,sourceButton:e,previewButton:t}}function S_(e,t){let n=document.createElement(`button`);n.title=e,n.type=`button`,n.className=`quicklook-segment`,n.setAttribute(`role`,`tab`),n.setAttribute(`aria-label`,e);let r=document.createElement(`span`);r.textContent=e,r.className=`quicklook-segment-label`;let i=document.createElement(`span`);return i.innerHTML=t,i.className=`quicklook-segment-icon`,n.append(r,i),n}function C_(){if(T_!==void 0)return T_;try{T_=localStorage.getItem(E_)===`preview`?`preview`:`source`}catch{console.error(`Failed to read quick look mode from localStorage`),T_=`source`}return T_}function w_(e){T_=e;try{localStorage.setItem(E_,e)}catch{console.error(`Failed to write quick look mode to localStorage`)}}var T_,E_=`ui.quicklook-mode`;function D_(){let e=window,t=e.editor?.state?.doc.toString();return typeof t==`string`?t:(console.error(`Failed to get text from host editor state`),e.config?.text??``)}function O_(){document.addEventListener(`webkitmouseforcewillbegin`,e=>{let t=e.target;t instanceof Element&&t.closest(`a`)!==null&&e.preventDefault()})}function k_(e,t){let n=window,r=n.pinchZoomTarget;n.pinchZoomTarget=()=>{if(e()!==`preview`)return r?.()??null;let n=t.querySelector(`.quicklook-content`);return n===null?null:{scroller:t,inner:n}};for(let n of[`gesturechange`,`gestureend`])document.addEventListener(n,()=>{if(e()!==`preview`)return;let n=t.querySelector(`.quicklook-content`);n?.style.zoom.length?n?.style.setProperty(`--quicklook-zoom`,n.style.zoom):n?.style.removeProperty(`--quicklook-zoom`)},{passive:!1})}function A_(e,t){let n,r=window,i={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},a=()=>{let e=t.clientHeight,n=t.scrollHeight,r=n-e;if(r<=0||n<=0)return{clientHeight:e,scrollHeight:n,scrollbarHeight:e,scrollbarTop:0};let i=e/n*e;return{clientHeight:e,scrollHeight:n,scrollbarHeight:i,scrollbarTop:t.scrollTop/r*(e-i)}},o=(e,n,r=`auto`)=>{let{clientHeight:i,scrollHeight:o,scrollbarHeight:s}=a(),c=i-s;if(c>0){let a=(e-n)/c;t.scrollTo({top:a*(o-i),behavior:r})}};r.startDragging=r=>{if(e()!==`preview`){i.start?.(r);return}let{scrollbarTop:s,scrollbarHeight:c}=a(),l=P_(t,r);n=l-s,(l<s||l>s+c)&&o(l,c*.5,`smooth`)},r.updateDragging=r=>{if(e()!==`preview`){i.update?.(r);return}n!==void 0&&o(P_(t,r),n)},r.cancelDragging=()=>{if(e()!==`preview`){i.cancel?.();return}n=void 0}}function j_(e,t,n){n.addEventListener(`wheel`,n=>{let r=e()===`preview`?t:document.querySelector(`.cm-scroller`);r!==null&&(r.scrollTop+=n.deltaY,r.scrollLeft+=n.deltaX,n.preventDefault())},{passive:!1})}function M_(e,t,n){let r=document.querySelector(`.cm-scroller`),i=()=>{let i=(e()===`preview`?t:r)?.scrollTop??0;n.classList.toggle(`scrolled`,i>0),n.classList.toggle(`scrolled-far`,i>20)};return t.addEventListener(`scroll`,i,{passive:!0}),r?.addEventListener(`scroll`,i,{passive:!0}),i}function N_(e){document.addEventListener(`copy`,t=>{if(!e.classList.contains(`overlay`))return;let n=getSelection(),r=n!==null&&n.rangeCount>0?n.getRangeAt(0):null,i=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,a=i??(()=>{let t=document.createRange();return t.selectNodeContents(e),t})(),o=document.createElement(`div`);o.appendChild(a.cloneContents()),t.clipboardData?.setData(`text/html`,o.innerHTML),t.clipboardData?.setData(`text/plain`,i===null?e.innerText:i.toString()),t.preventDefault(),t.stopPropagation()},!0)}function P_(e,t){return t-e.getBoundingClientRect().top}var F_=`body {
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
`;qu(),id(),ue();function I_(e){y(F_),document.body.classList.add(`quicklook`);let{toolbar:t,sourceButton:n,previewButton:r}=x_();document.body.appendChild(t);let i=R_(e),a={previewPane:e,sourceButton:n,previewButton:r,refreshSeparator:M_(C_,e,t),ensureRendered:i.ensureRendered};n.addEventListener(`click`,()=>{w_(`source`),L_(a)}),r.addEventListener(`click`,()=>{w_(`preview`),L_(a)}),L_(a),setTimeout(i.ensureRendered,0),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{e.querySelector(`.mermaid`)!==null&&(i.invalidate(),C_()===`preview`&&i.ensureRendered())}),O_(),k_(C_,e),A_(C_,e),j_(C_,e,t),N_(e)}function L_(e){let t=C_()===`source`,n=!t;e.sourceButton.classList.toggle(`active`,t),e.previewButton.classList.toggle(`active`,n),e.sourceButton.setAttribute(`aria-selected`,String(t)),e.previewButton.setAttribute(`aria-selected`,String(n)),e.previewPane.classList.toggle(`overlay`,n),e.refreshSeparator(),n&&e.ensureRendered()}function R_(e){let t=!1,n;return{ensureRendered:()=>(t||n||(n=(async()=>{try{e.innerHTML=`<div class="quicklook-content">${Ju(await Lu(D_(),!1))}</div>`,e.querySelectorAll(`a[href]`).forEach(e=>{e.removeAttribute(`href`),e.removeAttribute(`target`)}),Bu(()=>{},e),t=!0}catch(e){throw n=void 0,e}})()),n),invalidate:()=>{t=!1,n=void 0}}}var z_=u(s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):n.Mark=r()})(e,(function(){var e=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t=function(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;t(this,e),this.ctx=n,this.iframes=r,this.exclude=i,this.iframesTimeout=a}return n(e,[{key:`getContexts`,value:function(){var e=void 0,t=[];return e=this.ctx===void 0||!this.ctx?[]:NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:typeof this.ctx==`string`?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx],e.forEach(function(e){var n=t.filter(function(t){return t.contains(e)}).length>0;t.indexOf(e)===-1&&!n&&t.push(e)}),t}},{key:`getIframeContents`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw Error(`iframe inaccessible`)}catch{n()}r&&t(r)}},{key:`isIframeBlank`,value:function(e){var t=`about:blank`,n=e.getAttribute(`src`).trim();return e.contentWindow.location.href===t&&n!==t&&n}},{key:`observeIframeLoad`,value:function(e,t,n){var r=this,i=!1,a=null,o=function o(){if(!i){i=!0,clearTimeout(a);try{r.isIframeBlank(e)||(e.removeEventListener(`load`,o),r.getIframeContents(e,t,n))}catch{n()}}};e.addEventListener(`load`,o),a=setTimeout(o,this.iframesTimeout)}},{key:`onIframeReady`,value:function(e,t,n){try{e.contentWindow.document.readyState===`complete`?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch{n()}}},{key:`waitForIframes`,value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector(`html`),function(){--r||t()})},function(e){e||t()})}},{key:`forEachIframe`,value:function(t,n,r){var i=this,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},o=t.querySelectorAll(`iframe`),s=o.length,c=0;o=Array.prototype.slice.call(o);var l=function(){--s<=0&&a(c)};s||l(),o.forEach(function(t){e.matches(t,i.exclude)?l():i.onIframeReady(t,function(e){n(t)&&(c++,r(e)),l()},l)})}},{key:`createIterator`,value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:`createInstanceOnIframe`,value:function(t){return new e(t.querySelector(`html`),this.iframes)}},{key:`compareNodeIframe`,value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(t!==null){if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}else return!0}return!1}},{key:`getIteratorNode`,value:function(e){var t=e.previousNode(),n=void 0;return n=(t===null||e.nextNode())&&e.nextNode(),{prevNode:t,node:n}}},{key:`checkIframeFilter`,value:function(e,t,n,r){var i=!1,a=!1;return r.forEach(function(e,t){e.val===n&&(i=t,a=e.handled)}),this.compareNodeIframe(e,t,n)?(i===!1&&!a?r.push({val:n,handled:!0}):i!==!1&&!a&&(r[i].handled=!0),!0):(i===!1&&r.push({val:n,handled:!1}),!1)}},{key:`handleOpenIframes`,value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:`iterateThroughNodes`,value:function(e,t,n,r,i){for(var a=this,o=this.createIterator(t,e,r),s=[],c=[],l=void 0,u=void 0,d=function(){var e=a.getIteratorNode(o);return u=e.prevNode,l=e.node,l};d();)this.iframes&&this.forEachIframe(t,function(e){return a.checkIframeFilter(l,u,e,s)},function(t){a.createInstanceOnIframe(t).forEachNode(e,function(e){return c.push(e)},r)}),c.push(l);c.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(s,e,n,r),i()}},{key:`forEachNode`,value:function(e,t,n){var r=this,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},a=this.getContexts(),o=a.length;o||i(),a.forEach(function(a){var s=function(){r.iterateThroughNodes(e,a,t,n,function(){--o<=0&&i()})};r.iframes?r.waitForIframes(a,s):s()})}}],[{key:`matches`,value:function(e,t){var n=typeof t==`string`?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){var i=!1;return n.every(function(t){return!r.call(e,t)||(i=!0,!1)}),i}return!1}}]),e}(),a=function(){function a(e){t(this,a),this.ctx=e,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf(`MSIE`)>-1||n.indexOf(`Trident`)>-1)&&(this.ie=!0)}return n(a,[{key:`log`,value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`debug`,r=this.opt.log;this.opt.debug&&(r===void 0?`undefined`:e(r))===`object`&&typeof r[n]==`function`&&r[n](`mark.js: `+t)}},{key:`escapeStr`,value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,`\\$&`)}},{key:`createRegExp`,value:function(e){return this.opt.wildcards!==`disabled`&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),this.opt.wildcards!==`disabled`&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e),e}},{key:`createSynonymsRegExp`,value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?``:`i`,r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?`\0`:``;for(var i in t)if(t.hasOwnProperty(i)){var a=t[i],o=this.opt.wildcards===`disabled`?this.escapeStr(i):this.setupWildcardsRegExp(i),s=this.opt.wildcards===`disabled`?this.escapeStr(a):this.setupWildcardsRegExp(a);o!==``&&s!==``&&(e=e.replace(RegExp(`(`+this.escapeStr(o)+`|`+this.escapeStr(s)+`)`,`gm`+n),r+(`(`+this.processSynomyms(o)+`|`)+(this.processSynomyms(s)+`)`)+r))}return e}},{key:`processSynomyms`,value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:`setupWildcardsRegExp`,value:function(e){return e=e.replace(/(?:\\)*\?/g,function(e){return e.charAt(0)===`\\`?`?`:``}),e.replace(/(?:\\)*\*/g,function(e){return e.charAt(0)===`\\`?`*`:``})}},{key:`createWildcardsRegExp`,value:function(e){var t=this.opt.wildcards===`withSpaces`;return e.replace(/\u0001/g,t?`[\\S\\s]?`:`\\S?`).replace(/\u0002/g,t?`[\\S\\s]*?`:`\\S*`)}},{key:`setupIgnoreJoinersRegExp`,value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||r===``?e:e+`\0`})}},{key:`createJoinersRegExp`,value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(``))),this.opt.ignoreJoiners&&t.push(`\\u00ad\\u200b\\u200c\\u200d`),t.length?e.split(/\u0000+/).join(`[`+t.join(``)+`]*`):e}},{key:`createDiacriticsRegExp`,value:function(e){var t=this.opt.caseSensitive?``:`i`,n=this.opt.caseSensitive?`aàáảãạăằắẳẵặâầấẩẫậäåāą.AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ.cçćč.CÇĆČ.dđď.DĐĎ.eèéẻẽẹêềếểễệëěēę.EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ.iìíỉĩịîïī.IÌÍỈĨỊÎÏĪ.lł.LŁ.nñňń.NÑŇŃ.oòóỏõọôồốổỗộơởỡớờợöøō.OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ.rř.RŘ.sšśșş.SŠŚȘŞ.tťțţ.TŤȚŢ.uùúủũụưừứửữựûüůū.UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ.yýỳỷỹỵÿ.YÝỲỶỸỴŸ.zžżź.ZŽŻŹ`.split(`.`):[`aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ`,`cçćčCÇĆČ`,`dđďDĐĎ`,`eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ`,`iìíỉĩịîïīIÌÍỈĨỊÎÏĪ`,`lłLŁ`,`nñňńNÑŇŃ`,`oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ`,`rřRŘ`,`sšśșşSŠŚȘŞ`,`tťțţTŤȚŢ`,`uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ`,`yýỳỷỹỵÿYÝỲỶỸỴŸ`,`zžżźZŽŻŹ`],r=[];return e.split(``).forEach(function(i){n.every(function(n){if(n.indexOf(i)!==-1){if(r.indexOf(n)>-1)return!1;e=e.replace(RegExp(`[`+n+`]`,`gm`+t),`[`+n+`]`),r.push(n)}return!0})}),e}},{key:`createMergedBlanksRegExp`,value:function(e){return e.replace(/[\s]+/gim,`[\\s]+`)}},{key:`createAccuracyRegExp`,value:function(e){var t=this,n=`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~¡¿`,r=this.opt.accuracy,i=typeof r==`string`?r:r.value,a=typeof r==`string`?[]:r.limiters,o=``;switch(a.forEach(function(e){o+=`|`+t.escapeStr(e)}),i){case`partially`:default:return`()(`+e+`)`;case`complementary`:return o=`\\s`+(o||this.escapeStr(n)),`()([^`+o+`]*`+e+`[^`+o+`]*)`;case`exactly`:return`(^|\\s`+o+`)(`+e+`)(?=$|\\s`+o+`)`}}},{key:`getSeparatedKeywords`,value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(` `).forEach(function(e){e.trim()&&n.indexOf(e)===-1&&n.push(e)}):e.trim()&&n.indexOf(e)===-1&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:`isNumeric`,value:function(e){return Number(parseFloat(e))==e}},{key:`checkRanges`,value:function(e){var t=this;if(!Array.isArray(e)||Object.prototype.toString.call(e[0])!==`[object Object]`)return this.log(`markRanges() will only accept an array of objects`),this.opt.noMatch(e),[];var n=[],r=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var i=t.callNoMatchOnInvalidRanges(e,r),a=i.start,o=i.end;i.valid&&(e.start=a,e.length=o-a,n.push(e),r=o)}),n}},{key:`callNoMatchOnInvalidRanges`,value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&e.start!==void 0?(n=parseInt(e.start,10),r=n+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-n>0?i=!0:(this.log(`Ignoring invalid or overlapping range: `+(``+JSON.stringify(e))),this.opt.noMatch(e))):(this.log(`Ignoring invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:`checkWhitespaceRanges`,value:function(e,t,n){var r=void 0,i=!0,a=n.length,o=t-a,s=parseInt(e.start,10)-o;return s=s>a?a:s,r=s+parseInt(e.length,10),r>a&&(r=a,this.log(`End range automatically set to the max value of `+a)),s<0||r-s<0||s>a||r>a?(i=!1,this.log(`Invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)):n.substring(s,r).replace(/\s+/g,``)===``&&(i=!1,this.log(`Skipping whitespace only range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:`getTextNodes`,value:function(e){var t=this,n=``,r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:`matchesExclude`,value:function(e){return i.matches(e,this.opt.exclude.concat([`script`,`style`,`title`,`head`,`html`]))}},{key:`wrapRangeInTextNode`,value:function(e,t,n){var r=this.opt.element?this.opt.element:`mark`,i=e.splitText(t),a=i.splitText(n-t),o=document.createElement(r);return o.setAttribute(`data-markjs`,`true`),this.opt.className&&o.setAttribute(`class`,this.opt.className),o.textContent=i.textContent,i.parentNode.replaceChild(o,i),a}},{key:`wrapRangeInMappedTextNode`,value:function(e,t,n,r,i){var a=this;e.nodes.every(function(o,s){var c=e.nodes[s+1];if(c===void 0||c.start>t){if(!r(o.node))return!1;var l=t-o.start,u=(n>o.end?o.end:n)-o.start,d=e.value.substr(0,o.start),f=e.value.substr(u+o.start);if(o.node=a.wrapRangeInTextNode(o.node,l,u),e.value=d+f,e.nodes.forEach(function(t,n){n>=s&&(e.nodes[n].start>0&&n!==s&&(e.nodes[n].start-=u),e.nodes[n].end-=u)}),n-=u,i(o.node.previousSibling,o.start),n>o.end)t=o.end;else return!1}return!0})}},{key:`wrapMatches`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){t.nodes.forEach(function(t){t=t.node;for(var i=void 0;(i=e.exec(t.textContent))!==null&&i[o]!==``;)if(n(i[o],t)){var s=i.index;if(o!==0)for(var c=1;c<o;c++)s+=i[c].length;t=a.wrapRangeInTextNode(t,s,s+i[o].length),r(t.previousSibling),e.lastIndex=0}}),i()})}},{key:`wrapMatchesAcrossElements`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){for(var s=void 0;(s=e.exec(t.value))!==null&&s[o]!==``;){var c=s.index;if(o!==0)for(var l=1;l<o;l++)c+=s[l].length;var u=c+s[o].length;a.wrapRangeInMappedTextNode(t,c,u,function(e){return n(s[o],e)},function(t,n){e.lastIndex=n,r(t)})}i()})}},{key:`wrapRangeFromIndex`,value:function(e,t,n,r){var i=this;this.getTextNodes(function(a){var o=a.value.length;e.forEach(function(e,r){var s=i.checkWhitespaceRanges(e,o,a.value),c=s.start,l=s.end;s.valid&&i.wrapRangeInMappedTextNode(a,c,l,function(n){return t(n,e,a.value.substring(c,l),r)},function(t){n(t,e)})}),r()})}},{key:`unwrapMatches`,value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:`normalizeTextNode`,value:function(e){if(e){if(e.nodeType===3)for(;e.nextSibling&&e.nextSibling.nodeType===3;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:`markRegExp`,value:function(e,t){var n=this;this.opt=t,this.log(`Searching with expression "`+e+`"`);var r=0,i=`wrapMatches`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){r===0&&n.opt.noMatch(e),n.opt.done(r)})}},{key:`mark`,value:function(e,t){var n=this;this.opt=t;var r=0,i=`wrapMatches`,a=this.getSeparatedKeywords(typeof e==`string`?[e]:e),o=a.keywords,s=a.length,c=this.opt.caseSensitive?``:`i`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),s===0?this.opt.done(r):function e(t){var a=new RegExp(n.createRegExp(t),`gm`+c),l=0;n.log(`Searching with expression "`+a+`"`),n[i](a,1,function(e,i){return n.opt.filter(i,t,r,l)},function(e){l++,r++,n.opt.each(e)},function(){l===0&&n.opt.noMatch(t),o[s-1]===t?n.opt.done(r):e(o[o.indexOf(t)+1])})}(o[0])}},{key:`markRanges`,value:function(e,t){var n=this;this.opt=t;var r=0,i=this.checkRanges(e);i&&i.length?(this.log(`Starting to mark with the following ranges: `+JSON.stringify(i)),this.wrapRangeFromIndex(i,function(e,t,r,i){return n.opt.filter(e,t,r,i)},function(e,t){r++,n.opt.each(e,t)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:`unmark`,value:function(e){var t=this;this.opt=e;var n=this.opt.element?this.opt.element:`*`;n+=`[data-markjs]`,this.opt.className&&(n+=`.`+this.opt.className),this.log(`Removal selector "`+n+`"`),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){t.unwrapMatches(e)},function(e){var r=i.matches(e,n),a=t.matchesExclude(e);return!r||a?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:`opt`,set:function(e){this._opt=r({},{element:``,className:``,exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:`partially`,acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:`disabled`,each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:`iterator`,get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),a}();function o(e){var t=this,n=new a(e);return this.mark=function(e,r){return n.mark(e,r),t},this.markRegExp=function(e,r){return n.markRegExp(e,r),t},this.markRanges=function(e,r){return n.markRanges(e,r),t},this.unmark=function(e){return n.unmark(e),t},this}return o}))}))());Pl();var B_=`markedit-preview-mark`,V_=`markedit-preview-mark-highlighted`,H_=!1,U_,W_=0,G_=[],K_=null,q_=null,J_={github:{light:`#fae17d7f`,dark:`#f2cc607f`},cobalt:{light:`#cad40f66`,dark:`#cad40f66`},dracula:{light:`#ffffff40`,dark:`#ffffff40`},minimal:{light:`#fae17d7f`,dark:`#f2cc607f`},"night-owl":{light:`#5f7e9779`,dark:`#5f7e9779`},"rose-pine":{light:`#6e6a864c`,dark:`#6e6a8666`},solarized:{light:`#f4c09d`,dark:`#584032`},synthwave84:{light:`#d18616bb`,dark:`#d18616bb`},"winter-is-coming":{light:`#cee1f0`,dark:`#103362`},xcode:{light:`#e4e4e4`,dark:`#545558`}};function Y_(e){if(U_=e,W_=0,e.search.length===0){Z_();return}let t=i_();$_(t),tv(t)}function X_(e){G_.length!==0&&(W_=e%G_.length,ev())}function Z_(){K_?.disconnect(),K_=null,U_=void 0,W_=0,G_=[],new z_.default(i_()).unmark()}function Q_(){if(Yg()===Wg.preview)return{numberOfItems:G_.length,currentIndex:W_}}function $_(e){let t=U_;if(t===void 0||t.search.length===0||H_)return;nv(),H_=!0;let{search:n,caseSensitive:r,wholeWord:i,diacriticInsensitive:a,regexp:o}=t,s=new z_.default(e),c=()=>{G_=Array.from(e.querySelectorAll(`.${B_}`)),W_=G_.length>0?Math.min(W_,G_.length-1):0,ev(),H_=!1};s.unmark({done:()=>{if(o)try{let e=r?``:`i`;s.markRegExp(new RegExp(n,e),{className:B_,done:c})}catch{H_=!1,W_=0,G_=[]}else s.mark(n,{className:B_,caseSensitive:r,diacritics:a,separateWordSearch:!1,accuracy:i?`exactly`:`partially`,done:c})}})}function ev(){let e=Yg()!==Wg.sideBySide;G_.forEach((t,n)=>{t.classList.toggle(V_,e&&n===W_)}),e&&G_.length>0&&G_[W_].scrollIntoView({behavior:`smooth`,block:`center`})}function tv(e){K_?.disconnect(),K_=new MutationObserver(()=>{H_||$_(e)}),K_.observe(e,{childList:!0})}function nv(){q_===null&&(q_=document.createElement(`style`),document.head.appendChild(q_));let{light:e,dark:t}=J_[Dl]??J_.github;q_.textContent=[`.${B_} { background: ${e} !important; color: inherit !important; }`,`.${V_} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,`@media (prefers-color-scheme: dark) {`,`  .${B_} { background: ${t} !important; }`,`}`].join(`
`)}id(),Pl(),Iu(),Pu(),ue(),window.__markeditPreviewInitialized__?console.error(`MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior.`):(Gg(),Fu()?typeof f.MarkEdit.onAppReady==`function`&&f.MarkEdit.onAppReady(v_):I_(i_()),window.__markeditPreviewInitialized__=!0),window.MarkEditGetHtml??=a_,window.MarkEditRenderHtml??=o_,window.__markeditPreviewSPI__={performSearch:Y_,setSearchMatchIndex:X_,clearSearch:Z_,searchCounterInfo:Q_},Fu()&&(f.MarkEdit.addMainMenuItem({title:U(`viewMode`),icon:v()?`eye`:void 0,children:[{title:U(`changeMode`),action:qg,key:jl.key??`V`,modifiers:jl.modifiers??[`Command`]},{separator:!0},rv(U(`editMode`),Wg.edit),rv(U(`sideBySideMode`),Wg.sideBySide),rv(U(`previewMode`),Wg.preview),rv(U(`syntaxHiddenMode`),Wg.syntaxHidden),{separator:!0},...iv(),{separator:!0},{title:`${U(`version`)} 1.13.0`,action:()=>open(`https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.13.0`)}]}),f.MarkEdit.addExtension([d.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(e=>e.annotation(Ug))||(av.renderUpdater!==void 0&&clearTimeout(av.renderUpdater),av.renderUpdater=setTimeout(Zg,500)))}),vg]),f.MarkEdit.onEditorReady(()=>{wl&&Xu(f.MarkEdit.editorView.scrollDOM),Jg(),requestAnimationFrame(async()=>{document.visibilityState===`visible`&&Yg()===Wg.preview&&typeof f.MarkEdit.getFileInfo==`function`&&(await f.MarkEdit.getFileInfo())?.filePath===void 0&&f.MarkEdit.editorAPI.getText().length===0&&Kg(Wg.edit,!1)}),Zg(),ad(r_(),i_()),av.keyDownListener!==void 0&&document.removeEventListener(`keydown`,av.keyDownListener),av.keyDownListener=e=>Qg(e),document.addEventListener(`keydown`,av.keyDownListener)}),typeof f.MarkEdit.onEditorConfigChange==`function`&&f.MarkEdit.onEditorConfigChange(e=>{e===`lineHeight`&&Yg()===Wg.syntaxHidden&&f.MarkEdit.editorView?.requestMeasure()}));function rv(e,t){return{title:e,action:()=>Kg(t),state:()=>({isSelected:Yg()===t})}}function iv(){let e=[{title:U(`copyHtml`),action:t_},{title:U(`copyRichText`),action:n_}];return f.MarkEdit.showSavePanel===void 0?e:[{title:U(`saveCleanHtml`),action:$g},{title:U(`saveStyledHtml`),action:e_},...e]}var av={renderUpdater:void 0,keyDownListener:void 0};