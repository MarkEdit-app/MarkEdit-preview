"use strict";(()=>{let e=globalThis;if(typeof e.require>`u`){let t={MarkEdit:e.MarkEdit??Object.freeze({})},n={of:()=>({})},r=()=>({range:()=>({})});class i{}let a={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:n,mouseSelectionStyle:n,editorAttributes:n,baseTheme:()=>({})},Decoration:{mark:r,line:r},ViewPlugin:{fromClass:()=>({})},WidgetType:i,RectangleMarker:i,layer:()=>({})},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}},Facet:{define:()=>n},StateField:{define:()=>({})}}};e.require=e=>a[e]??{}}})();var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,o)=>(o=n==null?{}:e(i(n)),l(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));let d=require("@codemirror/view"),f=require("markedit-api"),p=require("@codemirror/state"),m=require("@codemirror/language"),h=require("@lezer/highlight"),g=require("@lezer/lr");require("@lezer/common");function _(){typeof f.MarkEdit.playSystemBeep==`function`&&f.MarkEdit.playSystemBeep()}function v(){let e=navigator.userAgent.match(/macOS\/(\d+)/);return e!==null&&parseInt(e[1])>=26}function y(e,t=!0){let n=document.createElement(`style`);return n.textContent=e,document.head.appendChild(n),n.disabled=!t,n}function ee(e){return(e?.match(/--bgColor-default:\s*([^;]+);/))?.[1]?.trim()}function te(e){return(e.split(`/`).pop()??e).split(`.`).slice(0,-1).join(`.`)}function ne(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(`.cm-line`)}function re(e){return{from:parseInt(e.dataset.lineFrom??`0`),to:parseInt(e.dataset.lineTo??`0`)}}function ie(e,t){let n=0,r=t;for(;r!==null&&r!==e;)n+=r.offsetTop,r=r.offsetParent;return n}function b(e,t,n,r=!0){ae(e,ie(e,t)+t.offsetHeight*n,r)}function ae(e,t,n=!0){let r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:t<=r?0:t,behavior:n?`smooth`:`instant`})}function oe(e){let t=document.createRange();t.selectNodeContents(e);let n=getSelection();n?.removeAllRanges(),n?.addRange(t)}function se(e){return!/^(https?:)?\/\//.test(e)&&/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function ce(e,t){return e.endsWith(`/`)?e+t:e+`/`+t}async function le(e){let t=await f.MarkEdit.getFileContent(e);if(t===void 0)return{};try{let e=JSON.parse(t);return typeof e==`object`&&e?e:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}function ue(e,t){return navigator.clipboard.write([e]).catch(e=>{console.error(`Failed to copy:`,e),f.MarkEdit.showAlert(t)})}function de(e){let t=document.createElement(`div`);t.style.cssText=`position: fixed; left: -10000px; top: 0;`,t.innerHTML=e,document.body.appendChild(t);try{return t.innerText}finally{t.remove()}}var fe=o((()=>{}));function pe(e){let t=he[e];if(t)return t;t=he[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);t.push(n)}for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[r]=`%`+(`0`+r.toString(16).toUpperCase()).slice(-2)}return t}function me(e,t){typeof t!=`string`&&(t=me.defaultChars);let n=pe(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(e){let t=``;for(let r=0,i=e.length;r<i;r+=3){let a=parseInt(e.slice(r+1,r+3),16);if(a<128){t+=n[a];continue}if((a&224)==192&&r+3<i){let n=parseInt(e.slice(r+4,r+6),16);if((n&192)==128){let e=a<<6&1984|n&63;t+=e<128?`��`:String.fromCharCode(e),r+=3;continue}}if((a&240)==224&&r+6<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16);if((n&192)==128&&(i&192)==128){let e=a<<12&61440|n<<6&4032|i&63;t+=e<2048||e>=55296&&e<=57343?`���`:String.fromCharCode(e),r+=6;continue}}if((a&248)==240&&r+9<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16),o=parseInt(e.slice(r+10,r+12),16);if((n&192)==128&&(i&192)==128&&(o&192)==128){let e=a<<18&1835008|n<<12&258048|i<<6&4032|o&63;e<65536||e>1114111?t+=`����`:(e-=65536,t+=String.fromCharCode(55296+(e>>10),56320+(e&1023))),r+=9;continue}}t+=`�`}return t})}var he,ge=o((()=>{he={},me.defaultChars=`;/?:@&=+$,#`,me.componentChars=``}));function _e(e){let t=x[e];if(t)return t;t=x[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);/^[0-9a-z]$/i.test(n)?t.push(n):t.push(`%`+(`0`+e.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function ve(e,t,n){typeof t!=`string`&&(n=t,t=ve.defaultChars),n===void 0&&(n=!0);let r=_e(t),i=``;for(let t=0,a=e.length;t<a;t++){let o=e.charCodeAt(t);if(n&&o===37&&t+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3))){i+=e.slice(t,t+3),t+=2;continue}if(o<128){i+=r[o];continue}if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&t+1<a){let n=e.charCodeAt(t+1);if(n>=56320&&n<=57343){i+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}i+=`%EF%BF%BD`;continue}i+=encodeURIComponent(e[t])}return i}var x,ye=o((()=>{x={},ve.defaultChars=`;/?:@&=+$,-_.!~*'()#`,ve.componentChars=`-_.!~*'()`}));function be(e){let t=``;return t+=e.protocol||``,t+=e.slashes?`//`:``,t+=e.auth?e.auth+`@`:``,e.hostname&&e.hostname.indexOf(`:`)!==-1?t+=`[`+e.hostname+`]`:t+=e.hostname||``,t+=e.port?`:`+e.port:``,t+=e.pathname||``,t+=e.search||``,t+=e.hash||``,t}var xe=o((()=>{}));function Se(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function Ce(e,t){if(e&&e instanceof Se)return e;let n=new Se;return n.parse(e,t),n}var we,Te,Ee,De,S,Oe,C,ke,Ae,je,Me,Ne,Pe=o((()=>{we=/^([a-z0-9.+-]+:)/i,Te=/:[0-9]*$/,Ee=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,De=[`{`,`}`,`|`,`\\`,`^`,"`",`<`,`>`,`"`,"`",` `,`\r`,`
`,`	`],S=[`'`].concat(De),Oe=[`%`,`/`,`?`,`;`,`#`].concat(S),C=[`/`,`?`,`#`],ke=255,Ae=/^[+a-z0-9A-Z_-]{0,63}$/,je=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Me={javascript:!0,"javascript:":!0},Ne={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},Se.prototype.parse=function(e,t){let n,r,i,a=e;if(a=a.trim(),!t&&e.split(`#`).length===1){let e=Ee.exec(a);if(e)return this.pathname=e[1],e[2]&&(this.search=e[2]),this}let o=we.exec(a);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,a=a.substr(o.length)),(t||o||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(i=a.substr(0,2)===`//`,i&&!(o&&Me[o])&&(a=a.substr(2),this.slashes=!0)),!Me[o]&&(i||o&&!Ne[o])){let e=-1;for(let t=0;t<C.length;t++)r=a.indexOf(C[t]),r!==-1&&(e===-1||r<e)&&(e=r);let t,n;n=e===-1?a.lastIndexOf(`@`):a.lastIndexOf(`@`,e),n!==-1&&(t=a.slice(0,n),a=a.slice(n+1),this.auth=t),e=-1;for(let t=0;t<Oe.length;t++)r=a.indexOf(Oe[t]),r!==-1&&(e===-1||r<e)&&(e=r);e===-1&&(e=a.length),a[e-1]===`:`&&e--;let i=a.slice(0,e);a=a.slice(e),this.parseHost(i),this.hostname=this.hostname||``;let o=this.hostname[0]===`[`&&this.hostname[this.hostname.length-1]===`]`;if(!o){let e=this.hostname.split(/\./);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n&&!n.match(Ae)){let r=``;for(let e=0,t=n.length;e<t;e++)n.charCodeAt(e)>127?r+=`x`:r+=n[e];if(!r.match(Ae)){let r=e.slice(0,t),i=e.slice(t+1),o=n.match(je);o&&(r.push(o[1]),i.unshift(o[2])),i.length&&(a=i.join(`.`)+a),this.hostname=r.join(`.`);break}}}}this.hostname.length>ke&&(this.hostname=``),o&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let s=a.indexOf(`#`);s!==-1&&(this.hash=a.substr(s),a=a.slice(0,s));let c=a.indexOf(`?`);return c!==-1&&(this.search=a.substr(c),a=a.slice(0,c)),a&&(this.pathname=a),Ne[n]&&this.hostname&&!this.pathname&&(this.pathname=``),this},Se.prototype.parseHost=function(e){let t=Te.exec(e);t&&(t=t[0],t!==`:`&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}})),Fe=c({decode:()=>me,encode:()=>ve,format:()=>be,parse:()=>Ce}),Ie=o((()=>{ge(),ye(),xe(),Pe()})),Le,Re=o((()=>{Le=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/})),ze,Be=o((()=>{ze=/[\0-\x1F\x7F-\x9F]/})),Ve,He=o((()=>{Ve=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/})),Ue,We=o((()=>{Ue=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/})),Ge,Ke=o((()=>{Ge=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/})),qe,Je=o((()=>{qe=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/})),Ye=c({Any:()=>Le,Cc:()=>ze,Cf:()=>Ve,P:()=>Ue,S:()=>Ge,Z:()=>qe}),Xe=o((()=>{Re(),Be(),He(),We(),Ke(),Je()})),Ze,Qe=o((()=>{Ze=new Uint16Array(`ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌`.split(``).map(e=>e.charCodeAt(0)))})),$e,et=o((()=>{$e=new Uint16Array(`Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢`.split(``).map(e=>e.charCodeAt(0)))}));function tt(e){return e>=55296&&e<=57343||e>1114111?65533:nt.get(e)??e}var nt,rt,it=o((()=>{nt=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),rt=String.fromCodePoint??function(e){let t=``;return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t}}));function at(e){return e>=w.ZERO&&e<=w.NINE}function ot(e){return e>=w.UPPER_A&&e<=w.UPPER_F||e>=w.LOWER_A&&e<=w.LOWER_F}function st(e){return e>=w.UPPER_A&&e<=w.UPPER_Z||e>=w.LOWER_A&&e<=w.LOWER_Z||at(e)}function ct(e){return e===w.EQUALS||st(e)}function lt(e){let t=``,n=new gt(e,e=>t+=rt(e));return function(e,r){let i=0,a=0;for(;(a=e.indexOf(`&`,a))>=0;){t+=e.slice(i,a),n.startEntity(r);let o=n.write(e,a+1);if(o<0){i=a+n.end();break}i=a+o,a=o===0?i+1:i}let o=t+e.slice(i);return t=``,o}}function ut(e,t,n,r){let i=(t&mt.BRANCH_LENGTH)>>7,a=t&mt.JUMP_TABLE;if(i===0)return a!==0&&r===a?n:-1;if(a){let t=r-a;return t<0||t>=i?-1:e[n+t]-1}let o=n,s=o+i-1;for(;o<=s;){let t=o+s>>>1,n=e[t];if(n<r)o=t+1;else if(n>r)s=t-1;else return e[t+i]}return-1}function dt(e,t=ht.Legacy){return _t(e,t)}function ft(e){return _t(e,ht.Strict)}var w,pt,mt,T,ht,gt,_t,E=o((()=>{Qe(),et(),it(),(function(e){e[e.NUM=35]=`NUM`,e[e.SEMI=59]=`SEMI`,e[e.EQUALS=61]=`EQUALS`,e[e.ZERO=48]=`ZERO`,e[e.NINE=57]=`NINE`,e[e.LOWER_A=97]=`LOWER_A`,e[e.LOWER_F=102]=`LOWER_F`,e[e.LOWER_X=120]=`LOWER_X`,e[e.LOWER_Z=122]=`LOWER_Z`,e[e.UPPER_A=65]=`UPPER_A`,e[e.UPPER_F=70]=`UPPER_F`,e[e.UPPER_Z=90]=`UPPER_Z`})(w||={}),pt=32,(function(e){e[e.VALUE_LENGTH=49152]=`VALUE_LENGTH`,e[e.BRANCH_LENGTH=16256]=`BRANCH_LENGTH`,e[e.JUMP_TABLE=127]=`JUMP_TABLE`})(mt||={}),(function(e){e[e.EntityStart=0]=`EntityStart`,e[e.NumericStart=1]=`NumericStart`,e[e.NumericDecimal=2]=`NumericDecimal`,e[e.NumericHex=3]=`NumericHex`,e[e.NamedEntity=4]=`NamedEntity`})(T||={}),(function(e){e[e.Legacy=0]=`Legacy`,e[e.Strict=1]=`Strict`,e[e.Attribute=2]=`Attribute`})(ht||={}),gt=class{constructor(e,t,n){this.decodeTree=e,this.emitCodePoint=t,this.errors=n,this.state=T.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=ht.Strict}startEntity(e){this.decodeMode=e,this.state=T.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case T.EntityStart:return e.charCodeAt(t)===w.NUM?(this.state=T.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=T.NamedEntity,this.stateNamedEntity(e,t));case T.NumericStart:return this.stateNumericStart(e,t);case T.NumericDecimal:return this.stateNumericDecimal(e,t);case T.NumericHex:return this.stateNumericHex(e,t);case T.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(e.charCodeAt(t)|pt)===w.LOWER_X?(this.state=T.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=T.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,n,r){if(t!==n){let i=n-t;this.result=this.result*r**+i+parseInt(e.substr(t,i),r),this.consumed+=i}}stateNumericHex(e,t){let n=t;for(;t<e.length;){let r=e.charCodeAt(t);if(at(r)||ot(r))t+=1;else return this.addToNumericResult(e,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,n,t,16),-1}stateNumericDecimal(e,t){let n=t;for(;t<e.length;){let r=e.charCodeAt(t);if(at(r))t+=1;else return this.addToNumericResult(e,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,n,t,10),-1}emitNumericEntity(e,t){var n;if(this.consumed<=t)return(n=this.errors)==null||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===w.SEMI)this.consumed+=1;else if(this.decodeMode===ht.Strict)return 0;return this.emitCodePoint(tt(this.result),this.consumed),this.errors&&(e!==w.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){let{decodeTree:n}=this,r=n[this.treeIndex],i=(r&mt.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){let a=e.charCodeAt(t);if(this.treeIndex=ut(n,r,this.treeIndex+Math.max(1,i),a),this.treeIndex<0)return this.result===0||this.decodeMode===ht.Attribute&&(i===0||ct(a))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],i=(r&mt.VALUE_LENGTH)>>14,i!==0){if(a===w.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==ht.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;let{result:t,decodeTree:n}=this,r=(n[t]&mt.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(e=this.errors)==null||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,n){let{decodeTree:r}=this;return this.emitCodePoint(t===1?r[e]&~mt.VALUE_LENGTH:r[e+1],n),t===3&&this.emitCodePoint(r[e+2],n),n}end(){var e;switch(this.state){case T.NamedEntity:return this.result!==0&&(this.decodeMode!==ht.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case T.NumericDecimal:return this.emitNumericEntity(0,2);case T.NumericHex:return this.emitNumericEntity(0,3);case T.NumericStart:return(e=this.errors)==null||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case T.EntityStart:return 0}}},_t=lt(Ze),lt($e)})),vt=o((()=>{E()})),yt=c({arrayReplaceAt:()=>wt,asciiTrim:()=>Rt,assign:()=>Ct,escapeHtml:()=>D,escapeRE:()=>jt,fromCodePoint:()=>Et,has:()=>St,isMdAsciiPunct:()=>Ft,isPunctChar:()=>Nt,isPunctCharCode:()=>Pt,isSpace:()=>O,isString:()=>xt,isValidEntityCode:()=>Tt,isWhiteSpace:()=>Mt,lib:()=>qt,normalizeReference:()=>It,unescapeAll:()=>kt,unescapeMd:()=>Ot});function bt(e){return Object.prototype.toString.call(e)}function xt(e){return bt(e)===`[object String]`}function St(e,t){return zt.call(e,t)}function Ct(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!=`object`)throw TypeError(t+`must be object`);Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function wt(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function Tt(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)==65535||(e&65535)==65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Et(e){if(e>65535){e-=65536;let t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}function Dt(e,t){if(t.charCodeAt(0)===35&&Ht.test(t)){let n=t[1].toLowerCase()===`x`?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return Tt(n)?Et(n):e}let n=dt(e);return n===e?e:n}function Ot(e){return e.indexOf(`\\`)<0?e:e.replace(Bt,`$1`)}function kt(e){return e.indexOf(`\\`)<0&&e.indexOf(`&`)<0?e:e.replace(Vt,function(e,t,n){return t||Dt(e,n)})}function At(e){return Gt[e]}function D(e){return Ut.test(e)?e.replace(Wt,At):e}function jt(e){return e.replace(Kt,`\\$&`)}function O(e){switch(e){case 9:case 32:return!0}return!1}function Mt(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Nt(e){return Ue.test(e)||Ge.test(e)}function Pt(e){return Nt(Et(e))}function Ft(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function It(e){return e=e.trim().replace(/\s+/g,` `),e.toLowerCase().toUpperCase()}function Lt(e){return e===32||e===9||e===10||e===13}function Rt(e){let t=0;for(;t<e.length&&Lt(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&Lt(e.charCodeAt(n));n--);return e.slice(t,n+1)}var zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,k=o((()=>{Ie(),Xe(),vt(),zt=Object.prototype.hasOwnProperty,Bt=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Vt=RegExp(Bt.source+`|&([a-z#][a-z0-9]{1,31});`,`gi`),Ht=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i,Ut=/[&<>"]/,Wt=/[&<>"]/g,Gt={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`},Kt=/[.?*+^$[\]\\(){}|-]/g,qt={mdurl:Fe,ucmicro:Ye}}));function Jt(e,t,n){let r,i,a,o,s=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<s;){if(a=e.src.charCodeAt(e.pos),a===93&&(r--,r===0)){i=!0;break}if(o=e.pos,e.md.inline.skipToken(e),a===91){if(o===e.pos-1)r++;else if(n)return e.pos=c,-1}}let l=-1;return i&&(l=e.pos),e.pos=c,l}var Yt=o((()=>{}));function Xt(e,t,n){let r,i=t,a={ok:!1,pos:0,str:``};if(e.charCodeAt(i)===60){for(i++;i<n;){if(r=e.charCodeAt(i),r===10||r===60)return a;if(r===62)return a.pos=i+1,a.str=kt(e.slice(t+1,i)),a.ok=!0,a;if(r===92&&i+1<n){i+=2;continue}i++}return a}let o=0;for(;i<n&&(r=e.charCodeAt(i),!(r===32||r<32||r===127));){if(r===92&&i+1<n){if(e.charCodeAt(i+1)===32)break;i+=2;continue}if(r===40&&(o++,o>32))return a;if(r===41){if(o===0)break;o--}i++}return t===i||o!==0?a:(a.str=kt(e.slice(t,i)),a.pos=i,a.ok=!0,a)}var Zt=o((()=>{k()}));function Qt(e,t,n,r){let i,a=t,o={ok:!1,can_continue:!1,pos:0,str:``,marker:0};if(r)o.str=r.str,o.marker=r.marker;else{if(a>=n)return o;let r=e.charCodeAt(a);if(r!==34&&r!==39&&r!==40)return o;t++,a++,r===40&&(r=41),o.marker=r}for(;a<n;){if(i=e.charCodeAt(a),i===o.marker)return o.pos=a+1,o.str+=kt(e.slice(t,a)),o.ok=!0,o;if(i===40&&o.marker===41)return o;i===92&&a+1<n&&a++,a++}return o.can_continue=!0,o.str+=kt(e.slice(t,a)),o}var $t=o((()=>{k()})),en=c({parseLinkDestination:()=>Xt,parseLinkLabel:()=>Jt,parseLinkTitle:()=>Qt}),tn=o((()=>{Yt(),Zt(),$t()}));function nn(){this.rules=Ct({},rn)}var rn,an=o((()=>{k(),rn={},rn.code_inline=function(e,t,n,r,i){let a=e[t];return`<code`+i.renderAttrs(a)+`>`+D(a.content)+`</code>`},rn.code_block=function(e,t,n,r,i){let a=e[t];return`<pre`+i.renderAttrs(a)+`><code>`+D(e[t].content)+`</code></pre>
`},rn.fence=function(e,t,n,r,i){let a=e[t],o=a.info?kt(a.info).trim():``,s=``,c=``;if(o){let e=o.split(/(\s+)/g);s=e[0],c=e.slice(2).join(``)}let l;if(l=n.highlight&&n.highlight(a.content,s,c)||D(a.content),l.indexOf(`<pre`)===0)return l+`
`;if(o){let e=a.attrIndex(`class`),t=a.attrs?a.attrs.slice():[];e<0?t.push([`class`,n.langPrefix+s]):(t[e]=t[e].slice(),t[e][1]+=` `+n.langPrefix+s);let r={attrs:t};return`<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`}return`<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`},rn.image=function(e,t,n,r,i){let a=e[t];return a.attrs[a.attrIndex(`alt`)][1]=i.renderInlineAsText(a.children,n,r),i.renderToken(e,t,n)},rn.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`},rn.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`},rn.text=function(e,t){return D(e[t].content)},rn.html_block=function(e,t){return e[t].content},rn.html_inline=function(e,t){return e[t].content},nn.prototype.renderAttrs=function(e){let t,n,r;if(!e.attrs)return``;for(r=``,t=0,n=e.attrs.length;t<n;t++)r+=` `+D(e.attrs[t][0])+`="`+D(e.attrs[t][1])+`"`;return r},nn.prototype.renderToken=function(e,t,n){let r=e[t],i=``;if(r.hidden)return``;r.block&&r.nesting!==-1&&t&&e[t-1].hidden&&(i+=`
`),i+=(r.nesting===-1?`</`:`<`)+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=` /`);let a=!1;if(r.block&&(a=!0,r.nesting===1&&t+1<e.length)){let n=e[t+1];(n.type===`inline`||n.hidden||n.nesting===-1&&n.tag===r.tag)&&(a=!1)}return i+=a?`>
`:`>`,i},nn.prototype.renderInline=function(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r},nn.prototype.renderInlineAsText=function(e,t,n){let r=``;for(let i=0,a=e.length;i<a;i++)switch(e[i].type){case`text`:r+=e[i].content;break;case`image`:r+=this.renderInlineAsText(e[i].children,t,n);break;case`html_inline`:case`html_block`:r+=e[i].content;break;case`softbreak`:case`hardbreak`:r+=`
`}return r},nn.prototype.render=function(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;o===`inline`?r+=this.renderInline(e[a].children,t,n):i[o]===void 0?r+=this.renderToken(e,a,t,n):r+=i[o](e,a,t,n,this)}return r}}));function A(){this.__rules__=[],this.__cache__=null}var on=o((()=>{A.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1},A.prototype.__compile__=function(){let e=this,t=[``];e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){t.indexOf(e)<0&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})},A.prototype.at=function(e,t,n){let r=this.__find__(e),i=n||{};if(r===-1)throw Error(`Parser rule not found: `+e);this.__rules__[r].fn=t,this.__rules__[r].alt=i.alt||[],this.__cache__=null},A.prototype.before=function(e,t,n,r){let i=this.__find__(e),a=r||{};if(i===-1)throw Error(`Parser rule not found: `+e);this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:a.alt||[]}),this.__cache__=null},A.prototype.after=function(e,t,n,r){let i=this.__find__(e),a=r||{};if(i===-1)throw Error(`Parser rule not found: `+e);this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:a.alt||[]}),this.__cache__=null},A.prototype.push=function(e,t,n){let r=n||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null},A.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(function(e){let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name `+e)}this.__rules__[r].enabled=!0,n.push(e)},this),this.__cache__=null,n},A.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(e){e.enabled=!1}),this.enable(e,t)},A.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(function(e){let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name `+e)}this.__rules__[r].enabled=!1,n.push(e)},this),this.__cache__=null,n},A.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]}}));function sn(e,t,n){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content=``,this.markup=``,this.info=``,this.meta=null,this.block=!1,this.hidden=!1}var cn=o((()=>{sn.prototype.attrIndex=function(e){if(!this.attrs)return-1;let t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1},sn.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},sn.prototype.attrSet=function(e,t){let n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r},sn.prototype.attrGet=function(e){let t=this.attrIndex(e),n=null;return t>=0&&(n=this.attrs[t][1]),n},sn.prototype.attrJoin=function(e,t){let n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=this.attrs[n][1]+` `+t}}));function ln(e,t,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=t}var un=o((()=>{cn(),ln.prototype.Token=sn}));function dn(e){let t;t=e.src.replace(fn,`
`),t=t.replace(pn,`�`),e.src=t}var fn,pn,mn=o((()=>{fn=/\r\n?|\n/g,pn=/\0/g}));function hn(e){let t;e.inlineMode?(t=new e.Token(`inline`,``,0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}var gn=o((()=>{}));function _n(e){let t=e.tokens;for(let n=0,r=t.length;n<r;n++){let r=t[n];r.type===`inline`&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}var vn=o((()=>{}));function yn(e){return/^<a[>\s]/i.test(e)}function bn(e){return/^<\/a\s*>/i.test(e)}function xn(e){let t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!==`inline`||!e.md.linkify.pretest(t[n].content))continue;let r=t[n].children,i=0;for(let a=r.length-1;a>=0;a--){let o=r[a];if(o.type===`link_close`){for(a--;r[a].level!==o.level&&r[a].type!==`link_open`;)a--;continue}if(o.type===`html_inline`&&(yn(o.content)&&i>0&&i--,bn(o.content)&&i++),!(i>0)&&o.type===`text`&&e.md.linkify.test(o.content)){let i=o.content,s=e.md.linkify.match(i),c=[],l=o.level,u=0;s.length>0&&s[0].index===0&&a>0&&r[a-1].type===`text_special`&&(s=s.slice(1));for(let t=0;t<s.length;t++){let n=s[t].url,r=e.md.normalizeLink(n);if(!e.md.validateLink(r))continue;let a=s[t].text;a=s[t].schema?s[t].schema===`mailto:`&&!/^mailto:/i.test(a)?e.md.normalizeLinkText(`mailto:`+a).replace(/^mailto:/,``):e.md.normalizeLinkText(a):e.md.normalizeLinkText(`http://`+a).replace(/^http:\/\//,``);let o=s[t].index;if(o>u){let t=new e.Token(`text`,``,0);t.content=i.slice(u,o),t.level=l,c.push(t)}let d=new e.Token(`link_open`,`a`,1);d.attrs=[[`href`,r]],d.level=l++,d.markup=`linkify`,d.info=`auto`,c.push(d);let f=new e.Token(`text`,``,0);f.content=a,f.level=l,c.push(f);let p=new e.Token(`link_close`,`a`,-1);p.level=--l,p.markup=`linkify`,p.info=`auto`,c.push(p),u=s[t].lastIndex}if(u<i.length){let t=new e.Token(`text`,``,0);t.content=i.slice(u),t.level=l,c.push(t)}t[n].children=r=wt(r,a,c)}}}}var Sn=o((()=>{k()}));function Cn(e,t){return An[t.toLowerCase()]}function wn(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&(r.content=r.content.replace(kn,Cn)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function Tn(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&Dn.test(r.content)&&(r.content=r.content.replace(/\+-/g,`±`).replace(/\.{2,}/g,`…`).replace(/([?!])…/g,`$1..`).replace(/([?!]){4,}/g,`$1$1$1`).replace(/,{2,}/g,`,`).replace(/(^|[^-])---(?=[^-]|$)/gm,`$1—`).replace(/(^|\s)--(?=\s|$)/gm,`$1–`).replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,`$1–`)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function En(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&(On.test(e.tokens[t].content)&&wn(e.tokens[t].children),Dn.test(e.tokens[t].content)&&Tn(e.tokens[t].children))}var Dn,On,kn,An,jn=o((()=>{Dn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,On=/\((c|tm|r)\)/i,kn=/\((c|tm|r)\)/gi,An={c:`©`,r:`®`,tm:`™`}}));function Mn(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function Nn(e,t){let n=``,r=0;t.sort((e,t)=>e.pos-t.pos);for(let i=0;i<t.length;i++){let a=t[i];n+=e.slice(r,a.pos)+a.ch,r=a.pos+1}return n+e.slice(r)}function Pn(e,t){let n,r=[],i={};for(let a=0;a<e.length;a++){let o=e[a],s=e[a].level;for(n=r.length-1;n>=0&&!(r[n].level<=s);n--);if(r.length=n+1,o.type!==`text`)continue;let c=o.content,l=0,u=c.length;OUTER:for(;l<u;){Ln.lastIndex=l;let o=Ln.exec(c);if(!o)break;let d=!0,f=!0;l=o.index+1;let p=o[0]===`'`,m=32;if(o.index-1>=0)m=c.charCodeAt(o.index-1);else for(n=a-1;n>=0&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n--)if(e[n].content){m=e[n].content.charCodeAt(e[n].content.length-1);break}let h=32;if(l<u)h=c.charCodeAt(l);else for(n=a+1;n<e.length&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n++)if(e[n].content){h=e[n].content.charCodeAt(0);break}let g=Ft(m)||Pt(m),_=Ft(h)||Pt(h),v=Mt(m),y=Mt(h);if(y?d=!1:_&&(v||g||(d=!1)),v?f=!1:g&&(y||_||(f=!1)),h===34&&o[0]===`"`&&m>=48&&m<=57&&(f=d=!1),d&&f&&(d=g,f=_),!d&&!f){p&&Mn(i,a,o.index,Rn);continue}if(f)for(n=r.length-1;n>=0;n--){let e=r[n];if(r[n].level<s)break;if(e.single===p&&r[n].level===s){e=r[n];let s,c;p?(s=t.md.options.quotes[2],c=t.md.options.quotes[3]):(s=t.md.options.quotes[0],c=t.md.options.quotes[1]),Mn(i,a,o.index,c),Mn(i,e.token,e.pos,s),r.length=n;continue OUTER}}d?r.push({token:a,pos:o.index,single:p,level:s}):f&&p&&Mn(i,a,o.index,Rn)}}Object.keys(i).forEach(function(t){e[t].content=Nn(e[t].content,i[t])})}function Fn(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&In.test(e.tokens[t].content)&&Pn(e.tokens[t].children,e)}var In,Ln,Rn,zn=o((()=>{k(),In=/['"]/,Ln=/['"]/g,Rn=`’`}));function Bn(e){let t,n,r=e.tokens,i=r.length;for(let e=0;e<i;e++){if(r[e].type!==`inline`)continue;let i=r[e].children,a=i.length;for(t=0;t<a;t++)i[t].type===`text_special`&&(i[t].type=`text`);for(t=n=0;t<a;t++)i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}}var Vn=o((()=>{}));function Hn(){this.ruler=new A;for(let e=0;e<Un.length;e++)this.ruler.push(Un[e][0],Un[e][1])}var Un,Wn=o((()=>{on(),un(),mn(),gn(),vn(),Sn(),jn(),zn(),Vn(),Un=[[`normalize`,dn],[`block`,hn],[`inline`,_n],[`linkify`,xn],[`replacements`,En],[`smartquotes`,Fn],[`text_join`,Bn]],Hn.prototype.process=function(e){let t=this.ruler.getRules(``);for(let n=0,r=t.length;n<r;n++)t[n](e)},Hn.prototype.State=ln}));function Gn(e,t,n,r){this.src=e,this.md=t,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType=`root`,this.level=0;let i=this.src;for(let e=0,t=0,n=0,r=0,a=i.length,o=!1;t<a;t++){let s=i.charCodeAt(t);if(!o){if(O(s)){n++,s===9?r+=4-r%4:r++;continue}o=!0}(s===10||t===a-1)&&(s!==10&&t++,this.bMarks.push(e),this.eMarks.push(t),this.tShift.push(n),this.sCount.push(r),this.bsCount.push(0),o=!1,n=0,r=0,e=t+1)}this.bMarks.push(i.length),this.eMarks.push(i.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}var Kn=o((()=>{cn(),k(),Gn.prototype.push=function(e,t,n){let r=new sn(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r},Gn.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},Gn.prototype.skipEmptyLines=function(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},Gn.prototype.skipSpaces=function(e){for(let t=this.src.length;e<t&&O(this.src.charCodeAt(e));e++);return e},Gn.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!O(this.src.charCodeAt(--e)))return e+1;return e},Gn.prototype.skipChars=function(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e},Gn.prototype.skipCharsBack=function(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e},Gn.prototype.getLines=function(e,t,n,r){if(e>=t)return``;let i=Array(t-e);for(let a=0,o=e;o<t;o++,a++){let e=0,s=this.bMarks[o],c=s,l;for(l=o+1<t||r?this.eMarks[o]+1:this.eMarks[o];c<l&&e<n;){let t=this.src.charCodeAt(c);if(O(t))t===9?e+=4-(e+this.bsCount[o])%4:e++;else if(c-s<this.tShift[o])e++;else break;c++}e>n?i[a]=Array(e-n+1).join(` `)+this.src.slice(c,l):i[a]=this.src.slice(c,l)}return i.join(``)},Gn.prototype.Token=sn}));function qn(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function Jn(e){let t=[],n=e.length,r=0,i=e.charCodeAt(r),a=!1,o=0,s=``;for(;r<n;)i===124&&(a?(s+=e.substring(o,r-1),o=r):(t.push(s+e.substring(o,r)),s=``,o=r+1)),a=i===92,r++,i=e.charCodeAt(r);return t.push(s+e.substring(o)),t}function Yn(e,t,n,r){if(t+2>n)return!1;let i=t+1;if(e.sCount[i]<e.blkIndent||e.sCount[i]-e.blkIndent>=4)return!1;let a=e.bMarks[i]+e.tShift[i];if(a>=e.eMarks[i])return!1;let o=e.src.charCodeAt(a++);if(o!==124&&o!==45&&o!==58||a>=e.eMarks[i])return!1;let s=e.src.charCodeAt(a++);if(s!==124&&s!==45&&s!==58&&!O(s)||o===45&&O(s))return!1;for(;a<e.eMarks[i];){let t=e.src.charCodeAt(a);if(t!==124&&t!==45&&t!==58&&!O(t))return!1;a++}let c=qn(e,t+1),l=c.split(`|`),u=[];for(let e=0;e<l.length;e++){let t=l[e].trim();if(!t){if(e===0||e===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(t))return!1;t.charCodeAt(t.length-1)===58?u.push(t.charCodeAt(0)===58?`center`:`right`):t.charCodeAt(0)===58?u.push(`left`):u.push(``)}if(c=qn(e,t).trim(),c.indexOf(`|`)===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=Jn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop();let d=l.length;if(d===0||d!==u.length)return!1;if(r)return!0;let f=e.parentType;e.parentType=`table`;let p=e.md.block.ruler.getRules(`blockquote`),m=e.push(`table_open`,`table`,1),h=[t,0];m.map=h;let g=e.push(`thead_open`,`thead`,1);g.map=[t,t+1];let _=e.push(`tr_open`,`tr`,1);_.map=[t,t+1];for(let t=0;t<l.length;t++){let n=e.push(`th_open`,`th`,1);u[t]&&(n.attrs=[[`style`,`text-align:`+u[t]]]);let r=e.push(`inline`,``,0);r.content=l[t].trim(),r.children=[],e.push(`th_close`,`th`,-1)}e.push(`tr_close`,`tr`,-1),e.push(`thead_close`,`thead`,-1);let v,y=0;for(i=t+2;i<n&&!(e.sCount[i]<e.blkIndent);i++){let r=!1;for(let t=0,a=p.length;t<a;t++)if(p[t](e,i,n,!0)){r=!0;break}if(r||(c=qn(e,i).trim(),!c)||e.sCount[i]-e.blkIndent>=4||(l=Jn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop(),y+=d-l.length,y>Xn))break;if(i===t+2){let n=e.push(`tbody_open`,`tbody`,1);n.map=v=[t+2,0]}let a=e.push(`tr_open`,`tr`,1);a.map=[i,i+1];for(let t=0;t<d;t++){let n=e.push(`td_open`,`td`,1);u[t]&&(n.attrs=[[`style`,`text-align:`+u[t]]]);let r=e.push(`inline`,``,0);r.content=l[t]?l[t].trim():``,r.children=[],e.push(`td_close`,`td`,-1)}e.push(`tr_close`,`tr`,-1)}return v&&(e.push(`tbody_close`,`tbody`,-1),v[1]=i),e.push(`table_close`,`table`,-1),h[1]=i,e.parentType=f,e.line=i,!0}var Xn,Zn=o((()=>{k(),Xn=65536}));function Qn(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,i=r;for(;r<n;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,i=r;continue}break}e.line=i;let a=e.push(`code_block`,`code`,0);return a.content=e.getLines(t,i,4+e.blkIndent,!1)+`
`,a.map=[t,e.line],!0}var $n=o((()=>{}));function er(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||i+3>a)return!1;let o=e.src.charCodeAt(i);if(o!==126&&o!==96)return!1;let s=i;i=e.skipChars(i,o);let c=i-s;if(c<3)return!1;let l=e.src.slice(s,i),u=e.src.slice(i,a);if(o===96&&u.indexOf(String.fromCharCode(o))>=0)return!1;if(r)return!0;let d=t,f=!1;for(;d++,!(d>=n||(i=s=e.bMarks[d]+e.tShift[d],a=e.eMarks[d],i<a&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(i)===o&&!(e.sCount[d]-e.blkIndent>=4)&&(i=e.skipChars(i,o),!(i-s<c)&&(i=e.skipSpaces(i),!(i<a)))){f=!0;break}c=e.sCount[t],e.line=d+ +!!f;let p=e.push(`fence`,`code`,0);return p.info=u,p.content=e.getLines(t+1,d,c,!0),p.markup=l,p.map=[t,e.line],!0}var tr=o((()=>{}));function nr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==62)return!1;if(r)return!0;let s=[],c=[],l=[],u=[],d=e.md.block.ruler.getRules(`blockquote`),f=e.parentType;e.parentType=`blockquote`;let p=!1,m;for(m=t;m<n;m++){let t=e.sCount[m]<e.blkIndent;if(i=e.bMarks[m]+e.tShift[m],a=e.eMarks[m],i>=a)break;if(e.src.charCodeAt(i++)===62&&!t){let t=e.sCount[m]+1,n,r;e.src.charCodeAt(i)===32?(i++,t++,r=!1,n=!0):e.src.charCodeAt(i)===9?(n=!0,(e.bsCount[m]+t)%4==3?(i++,t++,r=!1):r=!0):n=!1;let o=t;for(s.push(e.bMarks[m]),e.bMarks[m]=i;i<a;){let t=e.src.charCodeAt(i);if(O(t))t===9?o+=4-(o+e.bsCount[m]+ +!!r)%4:o++;else break;i++}p=i>=a,c.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+ +!!n,l.push(e.sCount[m]),e.sCount[m]=o-t,u.push(e.tShift[m]),e.tShift[m]=i-e.bMarks[m];continue}if(p)break;let r=!1;for(let t=0,i=d.length;t<i;t++)if(d[t](e,m,n,!0)){r=!0;break}if(r){e.lineMax=m,e.blkIndent!==0&&(s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]=-1}let h=e.blkIndent;e.blkIndent=0;let g=e.push(`blockquote_open`,`blockquote`,1);g.markup=`>`;let _=[t,0];g.map=_,e.md.block.tokenize(e,t,m);let v=e.push(`blockquote_close`,`blockquote`,-1);v.markup=`>`,e.lineMax=o,e.parentType=f,_[1]=e.line;for(let n=0;n<u.length;n++)e.bMarks[n+t]=s[n],e.tShift[n+t]=u[n],e.sCount[n+t]=l[n],e.bsCount[n+t]=c[n];return e.blkIndent=h,!0}var rr=o((()=>{k()}));function ir(e,t,n,r){let i=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.bMarks[t]+e.tShift[t],o=e.src.charCodeAt(a++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;a<i;){let t=e.src.charCodeAt(a++);if(t!==o&&!O(t))return!1;t===o&&s++}if(s<3)return!1;if(r)return!0;e.line=t+1;let c=e.push(`hr`,`hr`,0);return c.map=[t,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}var ar=o((()=>{k()}));function or(e,t){let n=e.eMarks[t],r=e.bMarks[t]+e.tShift[t],i=e.src.charCodeAt(r++);return i!==42&&i!==45&&i!==43||r<n&&!O(e.src.charCodeAt(r))?-1:r}function sr(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t],i=n;if(i+1>=r)return-1;let a=e.src.charCodeAt(i++);if(a<48||a>57)return-1;for(;;){if(i>=r)return-1;if(a=e.src.charCodeAt(i++),a>=48&&a<=57){if(i-n>=10)return-1;continue}if(a===41||a===46)break;return-1}return i<r&&(a=e.src.charCodeAt(i),!O(a))?-1:i}function cr(e,t){let n=e.level+2;for(let r=t+2,i=e.tokens.length-2;r<i;r++)e.tokens[r].level===n&&e.tokens[r].type===`paragraph_open`&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function lr(e,t,n,r){let i,a,o,s,c=t,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let u=!1;r&&e.parentType===`paragraph`&&e.sCount[c]>=e.blkIndent&&(u=!0);let d,f,p;if((p=sr(e,c))>=0){if(d=!0,o=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(o,p-1)),u&&f!==1)return!1}else if((p=or(e,c))>=0)d=!1;else return!1;if(u&&e.skipSpaces(p)>=e.eMarks[c])return!1;if(r)return!0;let m=e.src.charCodeAt(p-1),h=e.tokens.length;d?(s=e.push(`ordered_list_open`,`ol`,1),f!==1&&(s.attrs=[[`start`,f]])):s=e.push(`bullet_list_open`,`ul`,1);let g=[c,0];s.map=g,s.markup=String.fromCharCode(m);let _=!1,v=e.md.block.ruler.getRules(`list`),y=e.parentType;for(e.parentType=`list`;c<n;){a=p,i=e.eMarks[c];let t=e.sCount[c]+p-(e.bMarks[c]+e.tShift[c]),r=t;for(;a<i;){let t=e.src.charCodeAt(a);if(t===9)r+=4-(r+e.bsCount[c])%4;else if(t===32)r++;else break;a++}let u=a,f;f=u>=i?1:r-t,f>4&&(f=1);let h=t+f;s=e.push(`list_item_open`,`li`,1),s.markup=String.fromCharCode(m);let g=[c,0];s.map=g,d&&(s.info=e.src.slice(o,p-1));let y=e.tight,ee=e.tShift[c],te=e.sCount[c],ne=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=h,e.tight=!0,e.tShift[c]=u-e.bMarks[c],e.sCount[c]=r,u>=i&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n,!0),(!e.tight||_)&&(l=!1),_=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ne,e.tShift[c]=ee,e.sCount[c]=te,e.tight=y,s=e.push(`list_item_close`,`li`,-1),s.markup=String.fromCharCode(m),c=e.line,g[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let re=!1;for(let t=0,r=v.length;t<r;t++)if(v[t](e,c,n,!0)){re=!0;break}if(re)break;if(d){if(p=sr(e,c),p<0)break;o=e.bMarks[c]+e.tShift[c]}else if(p=or(e,c),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return s=d?e.push(`ordered_list_close`,`ol`,-1):e.push(`bullet_list_close`,`ul`,-1),s.markup=String.fromCharCode(m),g[1]=c,e.line=c,e.parentType=y,l&&cr(e,h),!0}var ur=o((()=>{k()}));function dr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=t+1;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==91)return!1;function s(t){let n=e.lineMax;if(t>=n||e.isEmpty(t))return null;let r=!1;if(e.sCount[t]-e.blkIndent>3&&(r=!0),e.sCount[t]<0&&(r=!0),!r){let r=e.md.block.ruler.getRules(`reference`),i=e.parentType;e.parentType=`reference`;let a=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,t,n,!0)){a=!0;break}if(e.parentType=i,a)return null}let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];return e.src.slice(i,a+1)}let c=e.src.slice(i,a+1);a=c.length;let l=-1;for(i=1;i<a;i++){let e=c.charCodeAt(i);if(e===91)return!1;if(e===93){l=i;break}if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(e===92&&(i++,i<a&&c.charCodeAt(i)===10)){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}}if(l<0||c.charCodeAt(l+1)!==58)return!1;for(i=l+2;i<a;i++){let e=c.charCodeAt(i);if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(!O(e))break}let u=e.md.helpers.parseLinkDestination(c,i,a);if(!u.ok)return!1;let d=e.md.normalizeLink(u.str);if(!e.md.validateLink(d))return!1;i=u.pos;let f=i,p=o,m=i;for(;i<a;i++){let e=c.charCodeAt(i);if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(!O(e))break}let h=e.md.helpers.parseLinkTitle(c,i,a);for(;h.can_continue;){let t=s(o);if(t===null)break;c+=t,i=a,a=c.length,o++,h=e.md.helpers.parseLinkTitle(c,i,a,h)}let g;for(i<a&&m!==i&&h.ok?(g=h.str,i=h.pos):(g=``,i=f,o=p);i<a&&O(c.charCodeAt(i));)i++;if(i<a&&c.charCodeAt(i)!==10&&g)for(g=``,i=f,o=p;i<a&&O(c.charCodeAt(i));)i++;if(i<a&&c.charCodeAt(i)!==10)return!1;let _=It(c.slice(1,l));return _?r?!0:(e.env.references===void 0&&(e.env.references={}),e.env.references[_]===void 0&&(e.env.references[_]={title:g,href:d}),e.line=o,!0):!1}var fr=o((()=>{k()})),pr,mr=o((()=>{pr=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`)})),hr,gr,_r,vr,yr=o((()=>{hr=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,gr=`<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>`,_r=RegExp(`^(?:`+hr+`|`+gr+`|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`),vr=RegExp(`^(?:`+hr+`|`+gr+`)`)}));function br(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(i)!==60)return!1;let o=e.src.slice(i,a),s=0;for(;s<xr.length&&!xr[s][0].test(o);s++);if(s===xr.length)return!1;if(r)return xr[s][2];let c=t+1,l=xr[s][1].test(``);if(!xr[s][1].test(o)){for(;c<n&&!(e.sCount[c]<e.blkIndent&&(l||!e.isEmpty(c)));c++)if(i=e.bMarks[c]+e.tShift[c],a=e.eMarks[c],o=e.src.slice(i,a),xr[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;let u=e.push(`html_block`,``,0);return u.map=[t,c],u.content=e.getLines(t,c,e.blkIndent,!0),!0}var xr,Sr=o((()=>{mr(),yr(),xr=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[RegExp(`^</?(`+pr.join(`|`)+`)(?=(\\s|/?>|$))`,`i`),/^$/,!0],[RegExp(vr.source+`\\s*$`),/^$/,!1]]}));function Cr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(i);if(o!==35||i>=a)return!1;let s=1;for(o=e.src.charCodeAt(++i);o===35&&i<a&&s<=6;)s++,o=e.src.charCodeAt(++i);if(s>6||i<a&&!O(o))return!1;if(r)return!0;a=e.skipSpacesBack(a,i);let c=e.skipCharsBack(a,35,i);c>i&&O(e.src.charCodeAt(c-1))&&(a=c),e.line=t+1;let l=e.push(`heading_open`,`h`+String(s),1);l.markup=`########`.slice(0,s),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=Rt(e.src.slice(i,a)),u.map=[t,e.line],u.children=[];let d=e.push(`heading_close`,`h`+String(s),-1);return d.markup=`########`.slice(0,s),!0}var wr=o((()=>{k()}));function Tr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`);if(e.sCount[t]-e.blkIndent>=4)return!1;let i=e.parentType;e.parentType=`paragraph`;let a=0,o,s=t+1;for(;s<n&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let t=e.bMarks[s]+e.tShift[s],n=e.eMarks[s];if(t<n&&(o=e.src.charCodeAt(t),(o===45||o===61)&&(t=e.skipChars(t,o),t=e.skipSpaces(t),t>=n))){a=o===61?1:2;break}}if(e.sCount[s]<0)continue;let t=!1;for(let i=0,a=r.length;i<a;i++)if(r[i](e,s,n,!0)){t=!0;break}if(t)break}if(!a)return e.parentType=i,!1;let c=Rt(e.getLines(t,s,e.blkIndent,!1));e.line=s+1;let l=e.push(`heading_open`,`h`+String(a),1);l.markup=String.fromCharCode(o),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=c,u.map=[t,e.line-1],u.children=[];let d=e.push(`heading_close`,`h`+String(a),-1);return d.markup=String.fromCharCode(o),e.parentType=i,!0}var Er=o((()=>{k()}));function Dr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`),i=e.parentType,a=t+1;for(e.parentType=`paragraph`;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let t=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,a,n,!0)){t=!0;break}if(t)break}let o=Rt(e.getLines(t,a,e.blkIndent,!1));e.line=a;let s=e.push(`paragraph_open`,`p`,1);s.map=[t,e.line];let c=e.push(`inline`,``,0);return c.content=o,c.map=[t,e.line],c.children=[],e.push(`paragraph_close`,`p`,-1),e.parentType=i,!0}var Or=o((()=>{k()}));function kr(){this.ruler=new A;for(let e=0;e<Ar.length;e++)this.ruler.push(Ar[e][0],Ar[e][1],{alt:(Ar[e][2]||[]).slice()})}var Ar,jr=o((()=>{on(),Kn(),Zn(),$n(),tr(),rr(),ar(),ur(),fr(),Sr(),wr(),Er(),Or(),Ar=[[`table`,Yn,[`paragraph`,`reference`]],[`code`,Qn],[`fence`,er,[`paragraph`,`reference`,`blockquote`,`list`]],[`blockquote`,nr,[`paragraph`,`reference`,`blockquote`,`list`]],[`hr`,ir,[`paragraph`,`reference`,`blockquote`,`list`]],[`list`,lr,[`paragraph`,`reference`,`blockquote`]],[`reference`,dr],[`html_block`,br,[`paragraph`,`reference`,`blockquote`]],[`heading`,Cr,[`paragraph`,`reference`,`blockquote`]],[`lheading`,Tr],[`paragraph`,Dr]],kr.prototype.tokenize=function(e,t,n){let r=this.ruler.getRules(``),i=r.length,a=e.md.options.maxNesting,o=t,s=!1;for(;o<n&&(e.line=o=e.skipEmptyLines(o),!(o>=n||e.sCount[o]<e.blkIndent));){if(e.level>=a){e.line=n;break}let t=e.line,c=!1;for(let a=0;a<i;a++)if(c=r[a](e,o,n,!1),c){if(t>=e.line)throw Error(`block rule didn't increment state.line`);break}if(!c)throw Error(`none of the block rules matched`);e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<n&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}},kr.prototype.parse=function(e,t,n,r){if(!e)return;let i=new this.State(e,t,n,r);this.tokenize(i,i.line,i.lineMax)},kr.prototype.State=Gn}));function Mr(e,t,n,r){this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending=``,this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}var Nr=o((()=>{cn(),k(),Mr.prototype.pushPending=function(){let e=new sn(`text`,``,0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending=``,e},Mr.prototype.push=function(e,t,n){this.pending&&this.pushPending();let r=new sn(e,t,n),i=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],i={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(i),r},Mr.prototype.scanDelims=function(e,t){let n=this.posMax,r=this.src.charCodeAt(e),i;if(e===0)i=32;else if(e===1)i=this.src.charCodeAt(0),(i&63488)==55296&&(i=65533);else if(i=this.src.charCodeAt(e-1),(i&64512)==56320){let t=this.src.charCodeAt(e-2);i=(t&64512)==55296?65536+(t-55296<<10)+(i-56320):65533}else(i&64512)==55296&&(i=65533);let a=e;for(;a<n&&this.src.charCodeAt(a)===r;)a++;let o=a-e,s=a<n?this.src.charCodeAt(a):32;if((s&64512)==55296){let e=this.src.charCodeAt(a+1);s=(e&64512)==56320?65536+(s-55296<<10)+(e-56320):65533}else(s&64512)==56320&&(s=65533);let c=Ft(i)||Pt(i),l=Ft(s)||Pt(s),u=Mt(i),d=Mt(s),f=!d&&(!l||u||c),p=!u&&(!c||d||l);return{can_open:f&&(t||!p||c),can_close:p&&(t||!f||l),length:o}},Mr.prototype.Token=sn}));function Pr(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Fr(e,t){let n=e.pos;for(;n<e.posMax&&!Pr(e.src.charCodeAt(n));)n++;return n!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}var Ir=o((()=>{}));function Lr(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;let n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;let i=e.pending.match(Rr);if(!i)return!1;let a=i[1],o=e.md.linkify.matchAtStart(e.src.slice(n-a.length));if(!o)return!1;let s=o.url;if(s.length<=a.length)return!1;let c=s.length;for(;c>0&&s.charCodeAt(c-1)===42;)c--;c!==s.length&&(s=s.slice(0,c));let l=e.md.normalizeLink(s);if(!e.md.validateLink(l))return!1;if(!t){e.pending=e.pending.slice(0,-a.length);let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,l]],t.markup=`linkify`,t.info=`auto`;let n=e.push(`text`,``,0);n.content=e.md.normalizeLinkText(s);let r=e.push(`link_close`,`a`,-1);r.markup=`linkify`,r.info=`auto`}return e.pos+=s.length-a.length,!0}var Rr,zr=o((()=>{Rr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i}));function Br(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;let r=e.pending.length-1,i=e.posMax;if(!t){if(r>=0&&e.pending.charCodeAt(r)===32){if(r>=1&&e.pending.charCodeAt(r-1)===32){let t=r-1;for(;t>=1&&e.pending.charCodeAt(t-1)===32;)t--;e.pending=e.pending.slice(0,t),e.push(`hardbreak`,`br`,0)}else e.pending=e.pending.slice(0,-1),e.push(`softbreak`,`br`,0)}else e.push(`softbreak`,`br`,0)}for(n++;n<i&&O(e.src.charCodeAt(n));)n++;return e.pos=n,!0}var Vr=o((()=>{k()}));function Hr(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let i=e.src.charCodeAt(n);if(i===10){for(t||e.push(`hardbreak`,`br`,0),n++;n<r&&(i=e.src.charCodeAt(n),O(i));)n++;return e.pos=n,!0}if(i===32){if(!t){let t=e.push(`text_special`,``,0);t.content=`\\`,t.markup=`\\`,t.info=`escape`}return e.pos=n,!0}let a=e.src[n];if(i>=55296&&i<=56319&&n+1<r){let t=e.src.charCodeAt(n+1);t>=56320&&t<=57343&&(a+=e.src[n+1],n++)}let o=`\\`+a;if(!t){let t=e.push(`text_special`,``,0);t.content=i<256&&Ur[i]!==0?a:o,t.markup=o,t.info=`escape`}return e.pos=n+1,!0}var Ur,Wr=o((()=>{k(),Ur=[];for(let e=0;e<256;e++)Ur.push(0);`\\!"#$%&'()*+,./:;<=>?@[]^_\`{|}~-`.split(``).forEach(function(e){Ur[e.charCodeAt(0)]=1})}));function Gr(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;let r=n;n++;let i=e.posMax;for(;n<i&&e.src.charCodeAt(n)===96;)n++;let a=e.src.slice(r,n),o=a.length;if(e.backticksScanned&&(e.backticks[o]||0)<=r)return t||(e.pending+=a),e.pos+=o,!0;let s=n,c;for(;(c=e.src.indexOf("`",s))!==-1;){for(s=c+1;s<i&&e.src.charCodeAt(s)===96;)s++;let r=s-c;if(r===o){if(!t){let t=e.push(`code_inline`,`code`,0);t.markup=a,t.content=e.src.slice(n,c).replace(/\n/g,` `).replace(/^ (.+) $/,`$1`)}return e.pos=s,!0}e.backticks[r]=c}return e.backticksScanned=!0,t||(e.pending+=a),e.pos+=o,!0}var Kr=o((()=>{}));function qr(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;let i=e.scanDelims(e.pos,!0),a=i.length,o=String.fromCharCode(r);if(a<2)return!1;let s;a%2&&(s=e.push(`text`,``,0),s.content=o,a--);for(let t=0;t<a;t+=2)s=e.push(`text`,``,0),s.content=o+o,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close});return e.pos+=i.length,!0}function Jr(e,t){let n,r=[],i=t.length;for(let a=0;a<i;a++){let i=t[a];if(i.marker!==126||i.end===-1)continue;let o=t[i.end];n=e.tokens[i.token],n.type=`s_open`,n.tag=`s`,n.nesting=1,n.markup=`~~`,n.content=``,n=e.tokens[o.token],n.type=`s_close`,n.tag=`s`,n.nesting=-1,n.markup=`~~`,n.content=``,e.tokens[o.token-1].type===`text`&&e.tokens[o.token-1].content===`~`&&r.push(o.token-1)}for(;r.length;){let t=r.pop(),i=t+1;for(;i<e.tokens.length&&e.tokens[i].type===`s_close`;)i++;i--,t!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[t],e.tokens[t]=n)}}function Yr(e){let t=e.tokens_meta,n=e.tokens_meta.length;Jr(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Jr(e,t[r].delimiters)}var Xr,Zr=o((()=>{Xr={tokenize:qr,postProcess:Yr}}));function Qr(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;let i=e.scanDelims(e.pos,r===42);for(let t=0;t<i.length;t++){let t=e.push(`text`,``,0);t.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:i.length,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close})}return e.pos+=i.length,!0}function $r(e,t){let n=t.length;for(let r=n-1;r>=0;r--){let n=t[r];if(n.marker!==95&&n.marker!==42||n.end===-1)continue;let i=t[n.end],a=r>0&&t[r-1].end===n.end+1&&t[r-1].marker===n.marker&&t[r-1].token===n.token-1&&t[n.end+1].token===i.token+1,o=String.fromCharCode(n.marker),s=e.tokens[n.token];s.type=a?`strong_open`:`em_open`,s.tag=a?`strong`:`em`,s.nesting=1,s.markup=a?o+o:o,s.content=``;let c=e.tokens[i.token];c.type=a?`strong_close`:`em_close`,c.tag=a?`strong`:`em`,c.nesting=-1,c.markup=a?o+o:o,c.content=``,a&&(e.tokens[t[r-1].token].content=``,e.tokens[t[n.end+1].token].content=``,r--)}}function ei(e){let t=e.tokens_meta,n=e.tokens_meta.length;$r(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&$r(e,t[r].delimiters)}var ti,ni=o((()=>{ti={tokenize:Qr,postProcess:ei}}));function ri(e,t){let n,r,i,a,o=``,s=``,c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let u=e.pos,d=e.posMax,f=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<d&&e.src.charCodeAt(m)===40){for(l=!1,m++;m<d&&(n=e.src.charCodeAt(m),O(n)||n===10);m++);if(m>=d)return!1;if(c=m,i=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),i.ok){for(o=e.md.normalizeLink(i.str),e.md.validateLink(o)?m=i.pos:o=``,c=m;m<d&&(n=e.src.charCodeAt(m),O(n)||n===10);m++);if(i=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<d&&c!==m&&i.ok)for(s=i.str,m=i.pos;m<d&&(n=e.src.charCodeAt(m),O(n)||n===10);m++);}(m>=d||e.src.charCodeAt(m)!==41)&&(l=!0),m++}if(l){if(e.env.references===void 0)return!1;if(m<d&&e.src.charCodeAt(m)===91?(c=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?r=e.src.slice(c,m++):m=p+1):m=p+1,r||=e.src.slice(f,p),a=e.env.references[It(r)],!a)return e.pos=u,!1;o=a.href,s=a.title}if(!t){e.pos=f,e.posMax=p;let t=e.push(`link_open`,`a`,1),n=[[`href`,o]];t.attrs=n,s&&n.push([`title`,s]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push(`link_close`,`a`,-1)}return e.pos=m,e.posMax=d,!0}var ii=o((()=>{k()}));function ai(e,t){let n,r,i,a,o,s,c,l,u=``,d=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(a=m+1,a<f&&e.src.charCodeAt(a)===40){for(a++;a<f&&(n=e.src.charCodeAt(a),O(n)||n===10);a++);if(a>=f)return!1;for(l=a,s=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),s.ok&&(u=e.md.normalizeLink(s.str),e.md.validateLink(u)?a=s.pos:u=``),l=a;a<f&&(n=e.src.charCodeAt(a),O(n)||n===10);a++);if(s=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<f&&l!==a&&s.ok)for(c=s.str,a=s.pos;a<f&&(n=e.src.charCodeAt(a),O(n)||n===10);a++);else c=``;if(a>=f||e.src.charCodeAt(a)!==41)return e.pos=d,!1;a++}else{if(e.env.references===void 0)return!1;if(a<f&&e.src.charCodeAt(a)===91?(l=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?i=e.src.slice(l,a++):a=m+1):a=m+1,i||=e.src.slice(p,m),o=e.env.references[It(i)],!o)return e.pos=d,!1;u=o.href,c=o.title}if(!t){r=e.src.slice(p,m);let t=[];e.md.inline.parse(r,e.md,e.env,t);let n=e.push(`image`,`img`,0),i=[[`src`,u],[`alt`,``]];n.attrs=i,n.children=t,n.content=r,c&&i.push([`title`,c])}return e.pos=a,e.posMax=f,!0}var oi=o((()=>{k()}));function si(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;let r=e.pos,i=e.posMax;for(;;){if(++n>=i)return!1;let t=e.src.charCodeAt(n);if(t===60)return!1;if(t===62)break}let a=e.src.slice(r+1,n);if(li.test(a)){let n=e.md.normalizeLink(a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}if(ci.test(a)){let n=e.md.normalizeLink(`mailto:`+a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}return!1}var ci,li,ui=o((()=>{ci=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,li=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/}));function di(e){return/^<a[>\s]/i.test(e)}function fi(e){return/^<\/a\s*>/i.test(e)}function pi(e){let t=e|32;return t>=97&&t<=122}function mi(e,t){if(!e.md.options.html)return!1;let n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;let i=e.src.charCodeAt(r+1);if(i!==33&&i!==63&&i!==47&&!pi(i))return!1;let a=e.src.slice(r).match(_r);if(!a)return!1;if(!t){let t=e.push(`html_inline`,``,0);t.content=a[0],di(t.content)&&e.linkLevel++,fi(t.content)&&e.linkLevel--}return e.pos+=a[0].length,!0}var hi=o((()=>{yr()}));function gi(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){let r=e.src.slice(n).match(_i);if(r){if(!t){let t=r[1][0].toLowerCase()===`x`?parseInt(r[1].slice(1),16):parseInt(r[1],10),n=e.push(`text_special`,``,0);n.content=Tt(t)?Et(t):Et(65533),n.markup=r[0],n.info=`entity`}return e.pos+=r[0].length,!0}}else{let r=e.src.slice(n).match(vi);if(r){let n=ft(r[0]);if(n!==r[0]){if(!t){let t=e.push(`text_special`,``,0);t.content=n,t.markup=r[0],t.info=`entity`}return e.pos+=r[0].length,!0}}}return!1}var _i,vi,yi=o((()=>{vt(),k(),_i=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,vi=/^&([a-z][a-z0-9]{1,31});/i}));function bi(e){let t={},n=e.length;if(!n)return;let r=0,i=-2,a=[];for(let o=0;o<n;o++){let n=e[o];if(a.push(0),(e[r].marker!==n.marker||i!==n.token-1)&&(r=o),i=n.token,n.length=n.length||0,!n.close)continue;t.hasOwnProperty(n.marker)||(t[n.marker]=[-1,-1,-1,-1,-1,-1]);let s=t[n.marker][(n.open?3:0)+n.length%3],c=r-a[r]-1,l=c;for(;c>s;c-=a[c]+1){let t=e[c];if(t.marker===n.marker&&t.open&&t.end<0){let r=!1;if((t.close||n.open)&&(t.length+n.length)%3==0&&(t.length%3!=0||n.length%3!=0)&&(r=!0),!r){let r=c>0&&!e[c-1].open?a[c-1]+1:0;a[o]=o-c+r,a[c]=r,n.open=!1,t.end=o,t.close=!1,l=-1,i=-2;break}}}l!==-1&&(t[n.marker][(n.open?3:0)+(n.length||0)%3]=l)}}function xi(e){let t=e.tokens_meta,n=e.tokens_meta.length;bi(e.delimiters);for(let e=0;e<n;e++)t[e]&&t[e].delimiters&&bi(t[e].delimiters)}var Si=o((()=>{}));function Ci(e){let t,n,r=0,i=e.tokens,a=e.tokens.length;for(t=n=0;t<a;t++)i[t].nesting<0&&r--,i[t].level=r,i[t].nesting>0&&r++,i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}var wi=o((()=>{}));function Ti(){this.ruler=new A;for(let e=0;e<Ei.length;e++)this.ruler.push(Ei[e][0],Ei[e][1]);this.ruler2=new A;for(let e=0;e<Di.length;e++)this.ruler2.push(Di[e][0],Di[e][1])}var Ei,Di,Oi=o((()=>{on(),Nr(),Ir(),zr(),Vr(),Wr(),Kr(),Zr(),ni(),ii(),oi(),ui(),hi(),yi(),Si(),wi(),Ei=[[`text`,Fr],[`linkify`,Lr],[`newline`,Br],[`escape`,Hr],[`backticks`,Gr],[`strikethrough`,Xr.tokenize],[`emphasis`,ti.tokenize],[`link`,ri],[`image`,ai],[`autolink`,si],[`html_inline`,mi],[`entity`,gi]],Di=[[`balance_pairs`,xi],[`strikethrough`,Xr.postProcess],[`emphasis`,ti.postProcess],[`fragments_join`,Ci]],Ti.prototype.skipToken=function(e){let t=e.pos,n=this.ruler.getRules(``),r=n.length,i=e.md.options.maxNesting,a=e.cache;if(a[t]!==void 0){e.pos=a[t];return}let o=!1;if(e.level<i){for(let i=0;i<r;i++)if(e.level++,o=n[i](e,!0),e.level--,o){if(t>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}else e.pos=e.posMax;o||e.pos++,a[t]=e.pos},Ti.prototype.tokenize=function(e){let t=this.ruler.getRules(``),n=t.length,r=e.posMax,i=e.md.options.maxNesting;for(;e.pos<r;){let a=e.pos,o=!1;if(e.level<i){for(let r=0;r<n;r++)if(o=t[r](e,!1),o){if(a>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}if(o){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},Ti.prototype.parse=function(e,t,n,r){let i=new this.State(e,t,n,r);this.tokenize(i);let a=this.ruler2.getRules(``),o=a.length;for(let e=0;e<o;e++)a[e](i)},Ti.prototype.State=Mr}));function ki(e){let t={};e||={},t.src_Any=Le.source,t.src_Cc=ze.source,t.src_Z=qe.source,t.src_P=Ue.source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join(`|`),t.src_ZCc=[t.src_Z,t.src_Cc].join(`|`);let n=`[><｜]`;return t.src_pseudo_letter=`(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`,t.src_ip4=`(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`,t.src_auth=`(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,t.src_port=`(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?`,t.src_host_terminator=`(?=$|${n}|${t.src_ZPCc})(?!${e[`---`]?`-(?!--)|`:`-|`}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`,t.src_path=`(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|`+(e[`---`]?`\\-(?!--(?:[^-]|$))(?:-*)|`:`\\-+|`)+`,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`,t.src_email_name=`[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}`,t.src_xn=`xn--[a-z0-9\\-]{1,59}`,t.src_domain_root=`(?:`+t.src_xn+`|${t.src_pseudo_letter}{1,63})`,t.src_domain=`(?:`+t.src_xn+`|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`,t.src_host=`(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`,t.tpl_host_fuzzy=`(?:`+t.src_ip4+`|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`,t.tpl_host_no_ip_fuzzy=`(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`,t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`,t.tpl_email_fuzzy=`(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`,t.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_fuzzy_strict}${t.src_path})`,t.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`,t}var Ai=o((()=>{Xe()}));function ji(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}function Mi(e){return Object.prototype.toString.call(e)}function Ni(e){return Mi(e)===`[object String]`}function Pi(e){return Mi(e)===`[object Object]`}function Fi(e){return Mi(e)===`[object RegExp]`}function Ii(e){return Mi(e)===`[object Function]`}function Li(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,`\\$&`)}function Ri(e){return Object.keys(e||{}).reduce(function(e,t){return e||Wi.hasOwnProperty(t)},!1)}function zi(e){return function(t,n){let r=t.slice(n);return e.test(r)?r.match(e)[0].length:0}}function Bi(){return function(e,t){t.normalize(e)}}function Vi(e){let t=e.re=ki(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(Ki),n.push(t.src_xn),t.src_tlds=n.join(`|`);function r(e){return e.replace(`%TLDS%`,t.src_tlds)}t.email_fuzzy=RegExp(r(t.tpl_email_fuzzy),`i`),t.email_fuzzy_global=RegExp(r(t.tpl_email_fuzzy),`ig`),t.link_fuzzy=RegExp(r(t.tpl_link_fuzzy),`i`),t.link_fuzzy_global=RegExp(r(t.tpl_link_fuzzy),`ig`),t.link_no_ip_fuzzy=RegExp(r(t.tpl_link_no_ip_fuzzy),`i`),t.link_no_ip_fuzzy_global=RegExp(r(t.tpl_link_no_ip_fuzzy),`ig`),t.host_fuzzy_test=RegExp(r(t.tpl_host_fuzzy_test),`i`);let i=[];e.__compiled__={};function a(e,t){throw Error(`(LinkifyIt) Invalid schema "${e}": ${t}`)}Object.keys(e.__schemas__).forEach(function(t){let n=e.__schemas__[t];if(n===null)return;let r={validate:null,link:null};if(e.__compiled__[t]=r,Pi(n)){Fi(n.validate)?r.validate=zi(n.validate):Ii(n.validate)?r.validate=n.validate:a(t,n),Ii(n.normalize)?r.normalize=n.normalize:n.normalize?a(t,n):r.normalize=Bi();return}if(Ni(n)){i.push(t);return}a(t,n)}),i.forEach(function(t){e.__compiled__[e.__schemas__[t]]&&(e.__compiled__[t].validate=e.__compiled__[e.__schemas__[t]].validate,e.__compiled__[t].normalize=e.__compiled__[e.__schemas__[t]].normalize)}),e.__compiled__[``]={validate:null,normalize:Bi()};let o=Object.keys(e.__compiled__).filter(function(t){return t.length>0&&e.__compiled__[t]}).map(Li).join(`|`);e.re.schema_test=RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`,`i`),e.re.schema_search=RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`,`ig`),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,`i`),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,`i`)}function Hi(e,t,n,r){let i=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=i,this.text=i,this.url=i}function Ui(e,t){if(!(this instanceof Ui))return new Ui(e,t);t||Ri(e)&&(t=e,e={}),this.__opts__=ji({},Wi,t),this.__schemas__=ji({},Gi,e),this.__compiled__={},this.__tlds__=qi,this.__tlds_replaced__=!1,this.re={},Vi(this)}var Wi,Gi,Ki,qi,Ji=o((()=>{Ai(),Wi={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},Gi={"http:":{validate:function(e,t,n){let r=e.slice(t);return n.re.http||(n.re.http=RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`,`i`)),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":`http:`,"ftp:":`http:`,"//":{validate:function(e,t,n){let r=e.slice(t);return n.re.no_http||(n.re.no_http=RegExp(`^`+n.re.src_auth+`(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})`+n.re.src_port+n.re.src_host_terminator+n.re.src_path,`i`)),n.re.no_http.test(r)?t>=3&&e[t-3]===`:`||t>=3&&e[t-3]===`/`?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,n){let r=e.slice(t);return n.re.mailto||(n.re.mailto=RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`,`i`)),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},Ki=`a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]`,qi=`biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф`.split(`|`),Ui.prototype.add=function(e,t){return this.__schemas__[e]=t,Vi(this),this},Ui.prototype.set=function(e){return this.__opts__=ji(this.__opts__,e),this},Ui.prototype.test=function(e){if(!e.length)return!1;let t,n;if(this.re.schema_test.test(e)){for(n=this.re.schema_search,n.lastIndex=0;(t=n.exec(e))!==null;)if(this.testSchemaAt(e,t[2],n.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__[`http:`]&&e.search(this.re.host_fuzzy_test)>=0&&e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__[`mailto:`]&&e.indexOf(`@`)>=0&&e.match(this.re.email_fuzzy)!==null)},Ui.prototype.pretest=function(e){return this.re.pretest.test(e)},Ui.prototype.testSchemaAt=function(e,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,n,this):0},Ui.prototype.match=function(e){let t=[],n=[],r=[],i=[],a,o,s;function c(e,t){return e?t?e.index===t.index?e.lastIndex>=t.lastIndex?e:t:e.index<t.index?e:t:e:t}if(!e.length)return null;if(this.re.schema_test.test(e))for(s=this.re.schema_search,s.lastIndex=0;(a=s.exec(e))!==null;)o=this.testSchemaAt(e,a[2],s.lastIndex),o&&n.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+o});if(this.__opts__.fuzzyLink&&this.__compiled__[`http:`])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(a=s.exec(e))!==null;)r.push({schema:``,index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__[`mailto:`])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(a=s.exec(e))!==null;)i.push({schema:`mailto:`,index:a.index+a[1].length,lastIndex:a.index+a[0].length});let l=[0,0,0],u=0;for(;;){let a=[n[l[0]],i[l[1]],r[l[2]]],o=c(c(a[0],a[1]),a[2]);if(!o)break;if(o===a[0]?l[0]++:o===a[1]?l[1]++:l[2]++,o.index<u)continue;let s=new Hi(e,o.schema,o.index,o.lastIndex);this.__compiled__[s.schema].normalize(s,this),t.push(s),u=o.lastIndex}return t.length?t:null},Ui.prototype.matchAtStart=function(e){if(!e.length)return null;let t=this.re.schema_at_start.exec(e);if(!t)return null;let n=this.testSchemaAt(e,t[2],t[0].length);if(!n)return null;let r=new Hi(e,t[2],t.index+t[1].length,t.index+t[0].length+n);return this.__compiled__[r.schema].normalize(r,this),r},Ui.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(e,t,n){return e!==n[t-1]}).reverse(),Vi(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,Vi(this),this)},Ui.prototype.normalize=function(e){e.schema||(e.url=`http://${e.url}`),e.schema===`mailto:`&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)},Ui.prototype.onCompile=function(){}}));function Yi(e){throw RangeError(da[e])}function Xi(e,t){let n=[],r=e.length;for(;r--;)n[r]=t(e[r]);return n}function Zi(e,t){let n=e.split(`@`),r=``;n.length>1&&(r=n[0]+`@`,e=n[1]),e=e.replace(ua,`.`);let i=Xi(e.split(`.`),t).join(`.`);return r+i}function Qi(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){let r=e.charCodeAt(n++);(r&64512)==56320?t.push(((i&1023)<<10)+(r&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}var $i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa=o((()=>{$i=2147483647,ea=36,ta=1,na=26,ra=38,ia=700,aa=72,oa=128,sa=`-`,ca=/^xn--/,la=/[^\0-\x7F]/,ua=/[\x2E\u3002\uFF0E\uFF61]/g,da={overflow:`Overflow: input needs wider integers to process`,"not-basic":`Illegal input >= 0x80 (not a basic code point)`,"invalid-input":`Invalid input`},fa=35,pa=Math.floor,ma=String.fromCharCode,ha=e=>String.fromCodePoint(...e),ga=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:ea},_a=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},va=function(e,t,n){let r=0;for(e=n?pa(e/ia):e>>1,e+=pa(e/t);e>455;r+=ea)e=pa(e/fa);return pa(r+36*e/(e+ra))},ya=function(e){let t=[],n=e.length,r=0,i=oa,a=aa,o=e.lastIndexOf(sa);o<0&&(o=0);for(let n=0;n<o;++n)e.charCodeAt(n)>=128&&Yi(`not-basic`),t.push(e.charCodeAt(n));for(let s=o>0?o+1:0;s<n;){let o=r;for(let t=1,i=ea;;i+=ea){s>=n&&Yi(`invalid-input`);let o=ga(e.charCodeAt(s++));o>=ea&&Yi(`invalid-input`),o>pa(($i-r)/t)&&Yi(`overflow`),r+=o*t;let c=i<=a?ta:i>=a+na?na:i-a;if(o<c)break;let l=ea-c;t>pa($i/l)&&Yi(`overflow`),t*=l}let c=t.length+1;a=va(r-o,c,o==0),pa(r/c)>$i-i&&Yi(`overflow`),i+=pa(r/c),r%=c,t.splice(r++,0,i)}return String.fromCodePoint(...t)},ba=function(e){let t=[];e=Qi(e);let n=e.length,r=oa,i=0,a=aa;for(let n of e)n<128&&t.push(ma(n));let o=t.length,s=o;for(o&&t.push(sa);s<n;){let n=$i;for(let t of e)t>=r&&t<n&&(n=t);let c=s+1;n-r>pa(($i-i)/c)&&Yi(`overflow`),i+=(n-r)*c,r=n;for(let n of e)if(n<r&&++i>$i&&Yi(`overflow`),n===r){let e=i;for(let n=ea;;n+=ea){let r=n<=a?ta:n>=a+na?na:n-a;if(e<r)break;let i=e-r,o=ea-r;t.push(ma(_a(r+i%o,0))),e=pa(i/o)}t.push(ma(_a(e,0))),a=va(i,c,s===o),i=0,++s}++i,++r}return t.join(``)},xa=function(e){return Zi(e,function(e){return ca.test(e)?ya(e.slice(4).toLowerCase()):e})},Sa=function(e){return Zi(e,function(e){return la.test(e)?`xn--`+ba(e):e})},Ca={version:`2.3.1`,ucs2:{decode:Qi,encode:ha},decode:ya,encode:ba,toASCII:Sa,toUnicode:xa}})),Ta,Ea=o((()=>{Ta={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}})),Da,Oa=o((()=>{Da={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`inline`,`text_join`]},block:{rules:[`paragraph`]},inline:{rules:[`text`],rules2:[`balance_pairs`,`fragments_join`]}}}})),ka,Aa=o((()=>{ka={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`inline`,`text_join`]},block:{rules:[`blockquote`,`code`,`fence`,`heading`,`hr`,`html_block`,`lheading`,`list`,`reference`,`paragraph`]},inline:{rules:[`autolink`,`backticks`,`emphasis`,`entity`,`escape`,`html_inline`,`image`,`link`,`newline`,`text`],rules2:[`balance_pairs`,`emphasis`,`fragments_join`]}}}}));function ja(e){let t=e.trim().toLowerCase();return!Ia.test(t)||La.test(t)}function Ma(e){let t=Ce(e,!0);if(t.hostname&&(!t.protocol||Ra.indexOf(t.protocol)>=0))try{t.hostname=Ca.toASCII(t.hostname)}catch{}return ve(be(t))}function Na(e){let t=Ce(e,!0);if(t.hostname&&(!t.protocol||Ra.indexOf(t.protocol)>=0))try{t.hostname=Ca.toUnicode(t.hostname)}catch{}return me(be(t),me.defaultChars+`%`)}function Pa(e,t){if(!(this instanceof Pa))return new Pa(e,t);t||xt(e)||(t=e||{},e=`default`),this.inline=new Ti,this.block=new kr,this.core=new Hn,this.renderer=new nn,this.linkify=new Ui,this.validateLink=ja,this.normalizeLink=Ma,this.normalizeLinkText=Na,this.utils=yt,this.helpers=Ct({},en),this.options={},this.configure(e),t&&this.set(t)}var Fa,Ia,La,Ra,za=o((()=>{k(),tn(),an(),Wn(),jr(),Oi(),Ji(),Ie(),wa(),Ea(),Oa(),Aa(),Fa={default:Ta,zero:Da,commonmark:ka},Ia=/^(vbscript|javascript|file|data):/,La=/^data:image\/(gif|png|jpeg|webp);/,Ra=[`http:`,`https:`,`mailto:`],Pa.prototype.set=function(e){return Ct(this.options,e),this},Pa.prototype.configure=function(e){let t=this;if(xt(e)){let t=e;if(e=Fa[t],!e)throw Error('Wrong `markdown-it` preset "'+t+`", check name`)}if(!e)throw Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&t[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&t[n].ruler2.enableOnly(e.components[n].rules2)}),this},Pa.prototype.enable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(function(t){n=n.concat(this[t].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));let r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw Error(`MarkdownIt. Failed to enable unknown rule(s): `+r);return this},Pa.prototype.disable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(function(t){n=n.concat(this[t].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));let r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw Error(`MarkdownIt. Failed to disable unknown rule(s): `+r);return this},Pa.prototype.use=function(e){let t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},Pa.prototype.parse=function(e,t){if(typeof e!=`string`)throw Error(`Input data should be a String`);let n=new this.core.State(e,this,t);return this.core.process(n),n.tokens},Pa.prototype.render=function(e,t){return t||={},this.renderer.render(this.parse(e,t),this.options,t)},Pa.prototype.parseInline=function(e,t){let n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens},Pa.prototype.renderInline=function(e,t){return t||={},this.renderer.render(this.parseInline(e,t),this.options,t)}})),Ba=o((()=>{za()}));function Va(e,t,n,r){var i;if(!Ja){var a=`Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks`;typeof process==`object`&&process&&process.emitWarning?process.emitWarning(a):console.warn(a),Ja=!0}var o=[Object.assign(new n.Token(`link_open`,`a`,1),{attrs:[].concat(t.permalinkClass?[[`class`,t.permalinkClass]]:[],[[`href`,t.permalinkHref(e,n)]],Object.entries(t.permalinkAttrs(e,n)))}),Object.assign(new n.Token(`html_block`,``,0),{content:t.permalinkSymbol,meta:Xa}),new n.Token(`link_close`,`a`,-1)];t.permalinkSpace&&n.tokens[r+1].children[Ya[t.permalinkBefore]](Object.assign(new n.Token(`text`,``,0),{content:` `})),(i=n.tokens[r+1].children)[Ya[t.permalinkBefore]].apply(i,o)}function Ha(e){return`#`+e}function Ua(e){return{}}function Wa(e){function t(n){return n=Object.assign({},t.defaults,n),function(t,r,i,a){return e(t,n,r,i,a)}}return t.defaults=Object.assign({},Za),t.renderPermalinkImpl=e,t}function Ga(e){var t=[],n=e.filter(function(e){if(e[0]!==`class`)return!0;t.push(e[1])});return t.length>0&&n.unshift([`class`,t.join(` `)]),n}function Ka(e,t,n,r){var i=e,a=r;if(n&&Object.prototype.hasOwnProperty.call(t,i))throw Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(t,i);)i=e+`-`+a,a+=1;return t[i]=!0,i}function qa(e,t){t=Object.assign({},qa.defaults,t),e.core.ruler.push(`anchor`,function(e){for(var n,r={},i=e.tokens,a=Array.isArray(t.level)?(n=t.level,function(e){return n.includes(e)}):function(e){return function(t){return t>=e}}(t.level),o=0;o<i.length;o++){var s=i[o];if(s.type===`heading_open`&&a(Number(s.tag.substr(1)))){var c=t.getTokensText(i[o+1].children),l=s.attrGet(`id`);l=l==null?Ka(l=t.slugifyWithState?t.slugifyWithState(c,e):t.slugify(c),r,!1,t.uniqueSlugStartIndex):Ka(l,r,!0,t.uniqueSlugStartIndex),s.attrSet(`id`,l),!1!==t.tabIndex&&s.attrSet(`tabindex`,``+t.tabIndex),typeof t.permalink==`function`?t.permalink(l,t,e,o):(t.permalink||t.renderPermalink&&t.renderPermalink!==Va)&&t.renderPermalink(l,t,e,o),o=i.indexOf(s),t.callback&&t.callback(s,{slug:l,title:c})}}})}var Ja,Ya,Xa,Za,Qa,$a,eo,to,no=o((()=>{Ja=!1,Ya={false:`push`,true:`unshift`,after:`push`,before:`unshift`},Xa={isPermalinkSymbol:!0},Za={class:`header-anchor`,symbol:`#`,renderHref:Ha,renderAttrs:Ua},Qa=Wa(function(e,t,n,r,i){var a,o=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ga([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],t.ariaHidden?[[`aria-hidden`,`true`]]:[],Object.entries(t.renderAttrs(e,r))))}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Xa}),new r.Token(`link_close`,`a`,-1)];if(t.space){var s=typeof t.space==`string`?t.space:` `;r.tokens[i+1].children[Ya[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:s}))}(a=r.tokens[i+1].children)[Ya[t.placement]].apply(a,o)}),Object.assign(Qa.defaults,{space:!0,placement:`after`,ariaHidden:!1}),$a=Wa(Qa.renderPermalinkImpl),$a.defaults=Object.assign({},Qa.defaults,{ariaHidden:!0}),eo=Wa(function(e,t,n,r,i){var a=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ga([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],Object.entries(t.renderAttrs(e,r))))})].concat(t.safariReaderFix?[new r.Token(`span_open`,`span`,1)]:[],r.tokens[i+1].children,t.safariReaderFix?[new r.Token(`span_close`,`span`,-1)]:[],[new r.Token(`link_close`,`a`,-1)]);r.tokens[i+1].children=a}),Object.assign(eo.defaults,{safariReaderFix:!1}),to=Wa(function(e,t,n,r,i){var a;if(![`visually-hidden`,`aria-label`,`aria-describedby`,`aria-labelledby`].includes(t.style))throw Error("`permalink.linkAfterHeader` called with unknown style option `"+t.style+"`");if(![`aria-describedby`,`aria-labelledby`].includes(t.style)&&!t.assistiveText)throw Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+t.style+"` style");if(t.style===`visually-hidden`&&!t.visuallyHiddenClass)throw Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var o=r.tokens[i+1].children.filter(function(e){return e.type===`text`||e.type===`code_inline`}).reduce(function(e,t){return e+t.content},``),s=[],c=[];if(t.class&&c.push([`class`,t.class]),c.push([`href`,t.renderHref(e,r)]),c.push.apply(c,Object.entries(t.renderAttrs(e,r))),t.style===`visually-hidden`){if(s.push(Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`class`,t.visuallyHiddenClass]]}),Object.assign(new r.Token(`text`,``,0),{content:t.assistiveText(o)}),new r.Token(`span_close`,`span`,-1)),t.space){var l=typeof t.space==`string`?t.space:` `;s[Ya[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:l}))}s[Ya[t.placement]](Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`aria-hidden`,`true`]]}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Xa}),new r.Token(`span_close`,`span`,-1))}else s.push(Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Xa}));t.style===`aria-label`?c.push([`aria-label`,t.assistiveText(o)]):[`aria-describedby`,`aria-labelledby`].includes(t.style)&&c.push([t.style,e]);var u=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:Ga(c)})].concat(s,[new r.Token(`link_close`,`a`,-1)]);(a=r.tokens).splice.apply(a,[i+3,0].concat(u)),t.wrapper&&(r.tokens.splice(i,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[0]+`
`})),r.tokens.splice(i+3+u.length+1,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[1]+`
`})))}),Object.assign(to.defaults,{style:`visually-hidden`,space:!0,placement:`after`,wrapper:null}),qa.permalink={__proto__:null,legacy:Va,renderHref:Ha,renderAttrs:Ua,makePermalink:Wa,linkInsideHeader:Qa,ariaHidden:$a,headerLink:eo,linkAfterHeader:to},qa.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,`-`))},uniqueSlugStartIndex:1,tabIndex:`-1`,getTokensText:function(e){return e.filter(function(e){return[`text`,`code_inline`].includes(e.type)}).map(function(e){return e.content}).join(``)},permalink:!1,renderPermalink:Va,permalinkClass:$a.defaults.class,permalinkSpace:$a.defaults.space,permalinkSymbol:`¶`,permalinkBefore:$a.defaults.placement===`before`,permalinkHref:$a.defaults.renderHref,permalinkAttrs:$a.defaults.renderAttrs},qa.default=qa})),ro=s(((e,t)=>{function n(e,t){var n,r,i=e.attrs[e.attrIndex(`href`)][1];for(n=0;n<t.length;++n){if(r=t[n],typeof r.matcher==`function`){if(r.matcher(i,r))return r;continue}return r}}function r(e,t,n){Object.keys(n).forEach(function(r){var i,a=n[r];r===`className`&&(r=`class`),i=t[e].attrIndex(r),i<0?t[e].attrPush([r,a]):t[e].attrs[i][1]=a})}function i(e,t){t=t?Array.isArray(t)?t:[t]:[],Object.freeze(t);var i=e.renderer.rules.link_open||this.defaultRender;e.renderer.rules.link_open=function(e,a,o,s,c){var l=n(e[a],t),u=l&&l.attrs;return u&&r(a,e,u),i(e,a,o,s,c)}}i.defaultRender=function(e,t,n,r,i){return i.renderToken(e,t,n)},t.exports=i}));function io(e,t,n,r){let i=Number(e[t].meta.id+1).toString(),a=``;return typeof r.docId==`string`&&(a=`-${r.docId}-`),a+i}function ao(e,t){let n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=`:${e[t].meta.subId}`),`[${n}]`}function oo(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i),o=i.rules.footnote_caption(e,t,n,r,i),s=a;return e[t].meta.subId>0&&(s+=`:${e[t].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${a}" id="fnref${s}">${o}</a></sup>`}function so(e,t,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function co(){return`</ol>
</section>
`}function lo(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),`<li id="fn${a}" class="footnote-item">`}function uo(){return`</li>
`}function fo(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),` <a href="#fnref${a}" class="footnote-backref">\u21a9\uFE0E</a>`}function po(e){let t=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=oo,e.renderer.rules.footnote_block_open=so,e.renderer.rules.footnote_block_close=co,e.renderer.rules.footnote_open=lo,e.renderer.rules.footnote_close=uo,e.renderer.rules.footnote_anchor=fo,e.renderer.rules.footnote_caption=ao,e.renderer.rules.footnote_anchor_name=io;function r(e,t,r,i){let a=e.bMarks[t]+e.tShift[t],o=e.eMarks[t];if(a+4>o||e.src.charCodeAt(a)!==91||e.src.charCodeAt(a+1)!==94)return!1;let s;for(s=a+2;s<o;s++){if(e.src.charCodeAt(s)===32)return!1;if(e.src.charCodeAt(s)===93)break}if(s===a+2||s+1>=o||e.src.charCodeAt(++s)!==58)return!1;if(i)return!0;s++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={});let c=e.src.slice(a+2,s-2);e.env.footnotes.refs[`:${c}`]=-1;let l=new e.Token(`footnote_reference_open`,``,1);l.meta={label:c},l.level=e.level++,e.tokens.push(l);let u=e.bMarks[t],d=e.tShift[t],f=e.sCount[t],p=e.parentType,m=s,h=e.sCount[t]+s-(e.bMarks[t]+e.tShift[t]),g=h;for(;s<o;){let t=e.src.charCodeAt(s);if(n(t))t===9?g+=4-g%4:g++;else break;s++}e.tShift[t]=s-m,e.sCount[t]=g-h,e.bMarks[t]=m,e.blkIndent+=4,e.parentType=`footnote`,e.sCount[t]<e.blkIndent&&(e.sCount[t]+=e.blkIndent),e.md.block.tokenize(e,t,r,!0),e.parentType=p,e.blkIndent-=4,e.tShift[t]=d,e.sCount[t]=f,e.bMarks[t]=u;let _=new e.Token(`footnote_reference_close`,``,-1);return _.level=--e.level,e.tokens.push(_),!0}function i(e,n){let r=e.posMax,i=e.pos;if(i+2>=r||e.src.charCodeAt(i)!==94||e.src.charCodeAt(i+1)!==91)return!1;let a=i+2,o=t(e,i+1);if(o<0)return!1;if(!n){e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]);let t=e.env.footnotes.list.length,n=[];e.md.inline.parse(e.src.slice(a,o),e.md,e.env,n);let r=e.push(`footnote_ref`,``,0);r.meta={id:t},e.env.footnotes.list[t]={content:e.src.slice(a,o),tokens:n}}return e.pos=o+1,e.posMax=r,!0}function a(e,t){let n=e.posMax,r=e.pos;if(r+3>n||!e.env.footnotes||!e.env.footnotes.refs||e.src.charCodeAt(r)!==91||e.src.charCodeAt(r+1)!==94)return!1;let i;for(i=r+2;i<n;i++){if(e.src.charCodeAt(i)===32||e.src.charCodeAt(i)===10)return!1;if(e.src.charCodeAt(i)===93)break}if(i===r+2||i>=n)return!1;i++;let a=e.src.slice(r+2,i-1);if(e.env.footnotes.refs[`:${a}`]===void 0)return!1;if(!t){e.env.footnotes.list||(e.env.footnotes.list=[]);let t;e.env.footnotes.refs[`:${a}`]<0?(t=e.env.footnotes.list.length,e.env.footnotes.list[t]={label:a,count:0},e.env.footnotes.refs[`:${a}`]=t):t=e.env.footnotes.refs[`:${a}`];let n=e.env.footnotes.list[t].count;e.env.footnotes.list[t].count++;let r=e.push(`footnote_ref`,``,0);r.meta={id:t,subId:n,label:a}}return e.pos=i,e.posMax=n,!0}function o(e){let t,n,r,i=!1,a={};if(!e.env.footnotes||(e.tokens=e.tokens.filter(function(e){return e.type===`footnote_reference_open`?(i=!0,n=[],r=e.meta.label,!1):e.type===`footnote_reference_close`?(i=!1,a[`:`+r]=n,!1):(i&&n.push(e),!i)}),!e.env.footnotes.list))return;let o=e.env.footnotes.list;e.tokens.push(new e.Token(`footnote_block_open`,``,1));for(let n=0,r=o.length;n<r;n++){let r=new e.Token(`footnote_open`,``,1);if(r.meta={id:n,label:o[n].label},e.tokens.push(r),o[n].tokens){t=[];let r=new e.Token(`paragraph_open`,`p`,1);r.block=!0,t.push(r);let i=new e.Token(`inline`,``,0);i.children=o[n].tokens,i.content=o[n].content,t.push(i);let a=new e.Token(`paragraph_close`,`p`,-1);a.block=!0,t.push(a)}else o[n].label&&(t=a[`:${o[n].label}`]);t&&(e.tokens=e.tokens.concat(t));let i;i=e.tokens[e.tokens.length-1].type===`paragraph_close`?e.tokens.pop():null;let s=o[n].count>0?o[n].count:1;for(let t=0;t<s;t++){let r=new e.Token(`footnote_anchor`,``,0);r.meta={id:n,subId:t,label:o[n].label},e.tokens.push(r)}i&&e.tokens.push(i),e.tokens.push(new e.Token(`footnote_close`,``,-1))}e.tokens.push(new e.Token(`footnote_block_close`,``,-1))}e.block.ruler.before(`reference`,`footnote_def`,r,{alt:[`paragraph`,`reference`]}),e.inline.ruler.after(`image`,`footnote_inline`,i),e.inline.ruler.after(`footnote_inline`,`footnote_ref`,a),e.core.ruler.after(`inline`,`footnote_tail`,o)}var mo=o((()=>{})),ho=s(((e,t)=>{var n=!0,r=!1,i=!1;t.exports=function(e,t){t&&(n=!t.enabled,r=!!t.label,i=!!t.labelAfter),e.core.ruler.after(`inline`,`github-task-lists`,function(e){for(var t=e.tokens,r=2;r<t.length;r++)s(t,r)&&(c(t[r],e.Token),a(t[r-2],`class`,`task-list-item`+(n?``:` enabled`)),a(t[o(t,r-2)],`class`,`contains-task-list`))})};function a(e,t,n){var r=e.attrIndex(t),i=[t,n];r<0?e.attrPush(i):e.attrs[r]=i}function o(e,t){for(var n=e[t].level-1,r=t-1;r>=0;r--)if(e[r].level===n)return r;return-1}function s(e,t){return p(e[t])&&m(e[t-1])&&h(e[t-2])&&g(e[t])}function c(e,t){if(e.children.unshift(l(e,t)),e.children[1].content=e.children[1].content.slice(3),e.content=e.content.slice(3),r){if(i){e.children.pop();var n=`task-item-`+Math.ceil(Math.random()*1e7-1e3);e.children[0].content=e.children[0].content.slice(0,-1)+` id="`+n+`">`,e.children.push(f(e.content,n,t))}else e.children.unshift(u(t)),e.children.push(d(t))}}function l(e,t){var r=new t(`html_inline`,``,0),i=n?` disabled="" `:``;return e.content.indexOf(`[ ] `)===0?r.content=`<input class="task-list-item-checkbox"`+i+`type="checkbox">`:(e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0)&&(r.content=`<input class="task-list-item-checkbox" checked=""`+i+`type="checkbox">`),r}function u(e){var t=new e(`html_inline`,``,0);return t.content=`<label>`,t}function d(e){var t=new e(`html_inline`,``,0);return t.content=`</label>`,t}function f(e,t,n){var r=new n(`html_inline`,``,0);return r.content=`<label class="task-list-item-label" for="`+t+`">`+e+`</label>`,r.attrs=[{for:t}],r}function p(e){return e.type===`inline`}function m(e){return e.type===`paragraph_open`}function h(e){return e.type===`list_item_open`}function g(e){return e.content.indexOf(`[ ] `)===0||e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0}}));function go(e){return e.charAt(0).toUpperCase()+e.slice(1)}var _o,vo,yo=o((()=>{_o={note:`<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},vo=(e,t={})=>{let{markers:n=[`TIP`,`NOTE`,`IMPORTANT`,`WARNING`,`CAUTION`],icons:r=_o,matchCaseSensitive:i=!1,titles:a={},classPrefix:o=`markdown-alert`}=t,s=n===`*`?`\\w+`:n.join(`|`),c=RegExp(`^\\\\?\\[\\!(${s})\\]([^\\n\\r]*)`,i?``:`i`);e.core.ruler.after(`block`,`github-alerts`,e=>{let t=e.tokens;for(let e=0;e<t.length;e++)if(t[e].type===`blockquote_open`){let n=t[e],i=e;for(;t[e]?.type!==`blockquote_close`&&e<=t.length;)e+=1;let o=t[e],s=e,l=t.slice(i,s+1).find(e=>e.type===`inline`);if(!l)continue;let u=l.content.match(c);if(!u)continue;let d=u[1].toLowerCase(),f=u[2].trim()||(a[d]??go(d)),p=r[d]??``;l.content=l.content.slice(u[0].length).trimStart(),n.type=`alert_open`,n.tag=`div`,n.meta={title:f,type:d,icon:p},o.type=`alert_close`,o.tag=`div`}}),e.renderer.rules.alert_open=function(e,t){let{title:n,type:r,icon:i}=e[t].meta;return`<div class="${o} ${o}-${r}"><p class="${o}-title">${i}${n}</p>`}}}));function j(e,t){return{tagName:e,nodeKind:`scalar`,implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(e=>String(e)),representTagName:t.representTagName??(()=>e)}}function bo(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`sequence`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function xo(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`mapping`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function So(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Co(e,t){if(t){if(!Mc.test(e))return L}else if(!jc.test(e))return L;let n=So(e);return Number.isFinite(n)?n:L}function wo(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function To(e,t){if(t){if(!Fc.test(e))return L}else if(!Pc.test(e))return L;let n=wo(e);return Number.isFinite(n)?n:L}function Eo(e){let t=e.replace(/_/g,``),n=1;if((t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`))return n*parseInt(t.slice(2),2);if(t.startsWith(`0x`))return n*parseInt(t.slice(2),16);if(t.includes(`:`)){let e=0;for(let n of t.split(`:`))e=e*60+Number(n);return n*e}return t!==`0`&&t[0]===`0`?n*parseInt(t,8):n*parseInt(t,10)}function Do(e){if(!Lc.test(e))return L;let t=Eo(e);return Number.isFinite(t)?t:L}function Oo(e){if(!zc.test(e))return L;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||Bc.test(e)?r:L}function ko(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Ao(e,t){if(t){if(!Uc.test(e))return L;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)?r:L}if(!Hc.test(e))return L;let n=Number(e);return Number.isFinite(n)?n:L}function jo(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Mo(e){if(!Gc.test(e))return L;let t=e.toLowerCase().replace(/_/g,``),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=0;if(t.includes(`:`)){for(let e of t.split(`:`))r=r*60+Number(e);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Kc.test(e)?r:L}function No(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Po(e){let t=e.replace(/\s/g,``);if(t.length%4!=0||!Yc.test(t))return L;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}function Fo(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function Io(e,t,n,r=0,i=0,a=0,o=0){let s=new Date(Date.UTC(e,t,n,r,i,a,o));return s.setUTCFullYear(e,t,n),s}function Lo(e){let t=Zc.exec(e);if(t===null&&(t=Qc.exec(e)),t===null)return L;let n=+t[1],r=t[2]-1,i=+t[3];if(!t[4]){let e=Io(n,r,i);return e.getUTCFullYear()!==n||e.getUTCMonth()!==r||e.getUTCDate()!==i?L:e}let a=+t[4],o=+t[5],s=+t[6],c=0;if(a>23||o>59||s>59)return L;if(t[7]){let e=t[7].slice(0,3);for(;e.length<3;)e+=`0`;c=+e}let l=Io(n,r,i,a,o,s,c);if(l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==i)return L;if(t[9]){let e=+t[10],n=+(t[11]||0);if(e>23||n>59)return L;let r=(e*60+n)*6e4;l.setTime(l.getTime()-(t[9]===`-`?-r:r))}return l}function Ro(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function zo(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}function Bo(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Vo(){return{scalar:[],sequence:[],mapping:[]}}function Ho(e){let t=[];for(let n of e){let e=t.length;for(let r=0;r<t.length;r++){let i=t[r];if(i.nodeKind===n.nodeKind&&i.tagName===n.tagName&&i.matchByTagPrefix===n.matchByTagPrefix){e=r;break}}t[e]=n}return t}function Uo(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let e=0;e<t.length;e++){if(Array.isArray(t[e]))return null;typeof t[e]==`object`&&Object.prototype.toString.call(t[e])===`[object Object]`&&(t[e]=`[object Object]`)}return String(t)}return typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`?`[object Object]`:String(e)}function Wo(e,t,n,r,i){let a=``,o=``,s=Math.floor(i/2)-1;return r-t>s&&(a=` ... `,t=r-s+a.length),n-r>s&&(o=` ...`,n=r+s-o.length),{str:a+e.slice(t,n).replace(/\t/g,`→`)+o,pos:r-t+a.length}}function Go(e,t){return` `.repeat(Math.max(t-e.length,0))+e}function Ko(e,t){if(!e.buffer)return null;let n={...ll,...t},r=/\r?\n|\r|\0/g,i=[0],a=[],o,s=-1;for(;o=r.exec(e.buffer);)a.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);let c=``,l=Math.min(e.line+n.linesAfter,a.length).toString().length,u=n.maxLength-(n.indent+l+3);for(let t=1;t<=n.linesBefore&&!(s-t<0);t++){let r=Wo(e.buffer,i[s-t],a[s-t],e.position-(i[s]-i[s-t]),u);c=`${` `.repeat(n.indent)}${Go((e.line-t+1).toString(),l)} | ${r.str}\n${c}`}let d=Wo(e.buffer,i[s],a[s],e.position,u);c+=`${` `.repeat(n.indent)}${Go((e.line+1).toString(),l)} | ${d.str}\n`,c+=`${`-`.repeat(n.indent+l+3+d.pos)}^\n`;for(let t=1;t<=n.linesAfter&&!(s+t>=a.length);t++){let r=Wo(e.buffer,i[s+t],a[s+t],e.position-(i[s]-i[s+t]),u);c+=`${` `.repeat(n.indent)}${Go((e.line+t+1).toString(),l)} | ${r.str}\n`}return c.replace(/\n$/,``)}function qo(e,t){let n=``;return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`\n\n${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}function Jo(e){switch(e){case 48:return`\0`;case 97:return`\x07`;case 98:return`\b`;case 116:return`	`;case 9:return`	`;case 110:return`
`;case 118:return`\v`;case 102:return`\f`;case 114:return`\r`;case 101:return`\x1B`;case 32:return` `;case 34:return`"`;case 47:return`/`;case 92:return`\\`;case 78:return``;case 95:return`\xA0`;case 76:return`\u2028`;case 80:return`\u2029`;default:return``}}function Yo(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Xo(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Zo(e){return e===120?2:e===117?4:8}function Qo(e,t,n){let r=0;for(;t<n;){let n=e.charCodeAt(t);if(n===10)r++,t++;else if(n===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(n===32||n===9)t++;else break}return{position:t,breaks:r}}function $o(e){return e===1?` `:`
`.repeat(e-1)}function es(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===10||t===13){r+=e.slice(a,o);let t=Qo(e,i,n);r+=$o(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,o)}function ts(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===39)r+=e.slice(a,i)+`'`,i+=2,a=o=i;else if(t===10||t===13){r+=e.slice(a,o);let t=Qo(e,i,n);r+=$o(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function ns(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===92){r+=e.slice(a,i),i++;let t=e.charCodeAt(i);if(t===10||t===13)i=Qo(e,i,n).position;else if(t<256&&pl[t])r+=ml[t],i++;else{let n=Zo(t),a=0;for(;n>0;n--){i++;let t=Xo(e.charCodeAt(i));a=(a<<4)+t}r+=Yo(a),i++}a=o=i}else if(t===10||t===13){r+=e.slice(a,o);let t=Qo(e,i,n);r+=$o(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function rs(e,t,n,r,i,a){let o=r<0?0:r,s=e.slice(t,n).replace(/\r\n?/g,`
`),c=s===``?[]:(s.endsWith(`
`)?s.slice(0,-1):s).split(`
`),l=``,u=!1,d=0,f=!1;for(let e of c){let t=0;for(;t<o&&e.charCodeAt(t)===32;)t++;if(r<0||t>=e.length){d++;continue}let n=e.slice(o),i=n.charCodeAt(0);a?i===32||i===9?(f=!0,l+=`
`.repeat(u?1+d:d)):f?(f=!1,l+=`
`.repeat(d+1)):d===0?u&&(l+=` `):l+=`
`.repeat(d):l+=`
`.repeat(u?1+d:d),l+=n,u=!0,d=0}return i===B.KEEP?l+=`
`.repeat(u?1+d:d):i!==B.STRIP&&u&&(l+=`
`),l}function is(e,t){if(t.valueStart===fl)return``;let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case z.SINGLE_QUOTED:return ts(e,n,r);case z.DOUBLE_QUOTED:return ns(e,n,r);case z.LITERAL_BLOCK:return rs(e,n,r,t.indent,t.chomping,!1);case z.FOLDED_BLOCK:return rs(e,n,r,t.indent,t.chomping,!0);default:return es(e,n,r)}}function as(e,t){if(e.startsWith(`!<`)&&e.endsWith(`>`))return decodeURIComponent(e.slice(2,-1));let n=e.indexOf(`!`,1),r=n===-1?`!`:e.slice(0,n+1),i=t?.[r]??hl[r]??r;return decodeURIComponent(i)+decodeURIComponent(e.slice(r.length))}function os(e){return`tagStart`in e&&e.tagStart!==gl?e.tagStart:`anchorStart`in e&&e.anchorStart!==gl?e.anchorStart:`valueStart`in e&&e.valueStart!==gl?e.valueStart:`start`in e?e.start:0}function M(e,t){ul.throwAt(e.source,e.position,t,e.filename)}function ss(e,t,n,r){try{return n.finalize(r)}catch(n){if(n instanceof ul)throw n;ul.throwAt(e.source,t,n instanceof Error?n.message:String(n),e.filename)}}function cs(e,t){let n=is(e.source,t),r=t.tagStart===gl?``:e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==``){if(r===`!`)return{value:n,tag:i};let t=as(r,e.tagHandlers),a=e.schema.lookupScalarTag(t);if(a){let r=a.resolve(n,!0,t);return r===L&&M(e,`cannot resolve a node with !<${t}> explicit tag`),{value:r,tag:a}}let o=e.schema.lookupMappingTag(t)??e.schema.lookupSequenceTag(t);if(o){n!==``&&M(e,`cannot resolve a node with !<${t}> explicit tag`);let r=o.create(t);return{value:o.carrierIsResult?r:ss(e,e.position,o,r),tag:o}}M(e,`unknown scalar tag !<${t}>`)}return t.style===z.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function ls(e,t,n){let r=t.tagStart===gl?``:e.source.slice(t.tagStart,t.tagEnd);return r===``||r===`!`?n:as(r,e.tagHandlers)}function us(e){return e.nodeKind===`mapping`}function ds(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&M(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function fs(e,t,n,r){ds(e);for(let i of r.keys(n)){if(ds(e),t.tag.has(t.value,i))continue;let a=t.tag.addPair(t.value,i,r.get(n,i));a&&M(e,a),t.overridable??=new Set,t.overridable.add(i)}}function ps(e,t,n,r){if(e.position=t.keyPosition,us(r))fs(e,t,n,r);else if(r.nodeKind===`sequence`&&Array.isArray(n)){n.length>100&&M(e,`abnormal merge sequence size`);for(let r of n){let n=e.nodeTags.get(r);n||M(e,`cannot merge mappings; the provided source object is unacceptable`),fs(e,t,r,n)}}else M(e,`cannot merge mappings; the provided source object is unacceptable`)}function ms(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){ps(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&M(e,`duplicated mapping key`);let a=t.tag.addPair(t.value,n,r);a&&M(e,a),t.overridable?.delete(n)}function hs(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind===`document`)r.value=t,r.hasValue=!0;else if(r.kind===`sequence`){us(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&M(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,ms(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===_l}function gs(e,t,n,r,i){if(t.anchorStart!==gl){let a={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),a),a}return null}function _s(e,t){let n={...vl,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let e=n.events[n.eventIndex++];switch(n.position=os(e),e.type){case R.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let t of e.directives)t.kind===`tag`&&(n.tagHandlers[t.handle]=t.prefix);n.frames.push({kind:`document`,position:n.position,value:void 0,hasValue:!1});break;case R.SCALAR:{let{value:t,tag:r}=cs(n,e);gs(n,e,t,r,!0),hs(n,t,r);break}case R.SEQUENCE:{let t=ls(n,e,`tag:yaml.org,2002:seq`),r=n.schema.lookupSequenceTag(t);r||M(n,`unknown sequence tag !<${t}>`);let i=r.create(t),a=gs(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`sequence`,position:n.position,value:i,tag:r,anchor:a,index:0});break}case R.MAPPING:{let t=ls(n,e,`tag:yaml.org,2002:map`),r=n.schema.lookupMappingTag(t);r||M(n,`unknown mapping tag !<${t}>`);let i=r.create(t),a=gs(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`mapping`,position:n.position,value:i,tag:r,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case R.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&M(n,`aliases exceeded maxAliases (${n.maxAliases})`);let t=n.source.slice(e.anchorStart,e.anchorEnd),r=n.anchors.get(t);r||M(n,`unidentified alias "${t}"`),r.isValueFinal||M(n,`recursive alias "${t}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),hs(n,r.value,r.tag);break}case R.POP:{let e=n.frames.pop();if(e.kind===`mapping`&&e.hasKey&&(n.position=e.keyPosition,M(n,`incomplete mapping pair in event stream`)),e.kind===`document`)n.documents.push(e.value);else{let t=e.tag.carrierIsResult?e.value:ss(n,e.position,e.tag,e.value);e.anchor&&(e.anchor.value=t,e.anchor.isValueFinal=!0),hs(n,t,e.tag)}break}}}return n.documents}function vs(e,t,n){e.events.push({type:R.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function ys(e,t,n,r,i,a,o){e.events.push({type:R.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function bs(e,t,n,r,i,a,o){e.events.push({type:R.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function xs(e,t){e.events.splice(t.eventsLength,0,{type:R.MAPPING,start:t.position,anchorStart:V,anchorEnd:V,tagStart:V,tagEnd:V,style:dl.FLOW})}function Ss(e,t,n,r,i,a,o,s,c=B.CLIP,l=-1,u=!1){e.events.push({type:R.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:a,tagEnd:o,style:s,chomping:c,indent:l,fast:u})}function Cs(e,t,n){e.events.push({type:R.ALIAS,anchorStart:t,anchorEnd:n})}function ws(e){e.events.push({type:R.POP})}function N(e){Ss(e,V,V,V,V,V,V,z.PLAIN)}function Ts(){return{anchorStart:V,anchorEnd:V,tagStart:V,tagEnd:V}}function Es(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Ds(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function P(e,t){ul.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function F(e){return e===10||e===13}function Os(e){return e===9||e===32}function ks(e){return Os(e)||F(e)}function As(e){return e===0||ks(e)}function js(e){return e===44||e===91||e===93||e===123||e===125}function Ms(e){return e>=48&&e<=57?e-48:-1}function Ns(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function Ps(e){return e===120?2:e===117?4:e===85?8:0}function Fs(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function Is(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function I(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||ks(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;Os(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!F(r)&&r!==0);if(!F(r))break;for(Is(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function Ls(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let n=e.input.charCodeAt(t+3);return n===0||ks(n)}return!1}function Rs(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function zs(e){if(e.position!==e.lineStart)return!1;if(Ls(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=Es(e);Rs(e),I(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&Ls(e));return Ds(e,t),r}function Bs(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!F(t);)t=e.input.charCodeAt(++e.position)}function Vs(e,t,n){wl.test(e.input.slice(t,n))&&P(e,`the stream contains non-printable characters`)}function Hs(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==V&&P(e,`duplication of a tag property`);let r=e.position,i=!1,a=!1,o=`!`,s=e.input.charCodeAt(++e.position);s===60?(i=!0,s=e.input.charCodeAt(++e.position)):s===33&&(a=!0,o=`!!`,s=e.input.charCodeAt(++e.position));let c=e.position,l;if(i){for(;s!==0&&s!==62;)s=e.input.charCodeAt(++e.position);s!==62&&P(e,`unexpected end of the stream within a verbatim tag`),l=e.input.slice(c,e.position),e.position++}else{for(;s!==0&&!ks(s)&&!(n&&js(s));)s===33&&(a?P(e,`tag suffix cannot contain exclamation marks`):(o=e.input.slice(c-1,e.position+1),El.test(o)||P(e,`named tag handle cannot contain such characters`),a=!0,c=e.position+1)),s=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),Tl.test(l)&&P(e,`tag suffix cannot contain flow indicator characters`)}return l&&!(i?kl.test(l):Al.test(l))&&P(e,`tag name cannot contain such characters: ${l}`),!i&&o!==`!`&&o!==`!!`&&!yl.call(e.tagHandlers,o)&&P(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Us(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==V&&P(e,`duplication of an anchor property`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ks(e.input.charCodeAt(e.position))&&!js(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&P(e,`name of an anchor node must contain at least one character`),t.anchorStart=n,t.anchorEnd=e.position,!0}function Ws(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==V||t.tagStart!==V)&&P(e,`alias node should not have any properties`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ks(e.input.charCodeAt(e.position))&&!js(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&P(e,`name of an alias node must contain at least one character`),Cs(e,n,e.position),!0}function Gs(e,t){I(e,!1),e.lineIndent<t&&P(e,`deficient indentation`)}function Ks(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let t=e.position;return e.position++,Ss(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,z.SINGLE_QUOTED,B.CLIP,-1,i),!0}F(a)?(i=!1,Gs(e,t)):e.position===e.lineStart&&Ls(e)?P(e,`unexpected end of the document within a single quoted scalar`):a!==9&&a<32?P(e,`expected valid JSON character`):e.position++}P(e,`unexpected end of the stream within a single quoted scalar`)}function qs(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===34){let t=e.position;return e.position++,Ss(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,z.DOUBLE_QUOTED,B.CLIP,-1,i),!0}if(a===92){i=!1;let n=e.input.charCodeAt(++e.position);if(F(n))Gs(e,t);else if(Fs(n))e.position++;else{let t=Ps(n);for(t===0&&P(e,`unknown escape sequence`);t-->0;)e.position++,Ns(e.input.charCodeAt(e.position))<0&&P(e,`expected hexadecimal character`);e.position++}}else F(a)?(i=!1,Gs(e,t)):e.position===e.lineStart&&Ls(e)?P(e,`unexpected end of the document within a double quoted scalar`):a!==9&&a<32?P(e,`expected valid JSON character`):e.position++}P(e,`unexpected end of the stream within a double quoted scalar`)}function Js(e,t,n){let r=e.input.charCodeAt(e.position),i=B.CLIP,a=-1,o=!1;if(r!==124&&r!==62)return!1;let s=r===124?z.LITERAL_BLOCK:z.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let n=e.input.charCodeAt(e.position),r=Ms(n);if(n===43||n===45)i!==B.CLIP&&P(e,`repeat of a chomping mode identifier`),i=n===43?B.KEEP:B.STRIP,e.position++;else if(r>=0)r===0&&P(e,`bad explicit indentation width of a block scalar; it cannot be less than one`),o&&P(e,`repeat of an indentation width identifier`),a=t+r-1,o=!0,e.position++;else break}let c=!1;for(;Os(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&Bs(e),F(e.input.charCodeAt(e.position))?Is(e):e.input.charCodeAt(e.position)!==0&&P(e,`a line break is expected`);let l=o?a:-1,u=0,d=e.position,f=e.position;for(;e.input.charCodeAt(e.position)!==0;){let n=e.position,r=0;for(;e.input.charCodeAt(n+r)===32;)r++;let i=e.input.charCodeAt(n+r);if(i===0){l>=0?r>l&&(f=n+r):r>0&&(f=n+r);break}if(zs(e))break;if(!o&&l===-1&&F(i)&&(u=Math.max(u,r)),!o&&l===-1&&!F(i)&&(i===9&&r<t&&(e.position=n+r,P(e,`tab characters must not be used in indentation`)),r>=t&&r<u&&(e.position=n+r,P(e,`bad indentation of a mapping entry`))),l===-1&&i!==0&&!F(i)&&r<t){e.lineIndent=r,e.position=n+r;break}!o&&i!==0&&!F(i)&&l===-1&&(l=r);let a=l===-1?t+1:l;if(i!==0&&!F(i)&&r<a){e.lineIndent=r,e.position=n+r;break}Bs(e),f=e.position,F(e.input.charCodeAt(e.position))&&(Is(e),f=e.position)}return Vs(e,d,f),Ss(e,d,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,s,i,l),!0}function Ys(e,t){let n=e.input.charCodeAt(e.position),r=t===bl;if(n===0||ks(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||r&&js(n))return!1;if(n===63||n===45){let t=e.input.charCodeAt(e.position+1);if(As(t)||r&&js(t))return!1}return!0}function Xs(e,t,n,r){if(!Ys(e,n))return!1;let i=e.position,a=e.position,o=e.input.charCodeAt(e.position),s=n===bl,c=!1;for(;o!==0&&!zs(e);){if(o===58){let t=e.input.charCodeAt(e.position+1);if(As(t)||s&&js(t))break}else if(o===35){if(ks(e.input.charCodeAt(e.position-1)))break}else if(s&&js(o))break;else if(F(o)){let n=e.position,r=e.line,i=e.lineStart,a=e.lineIndent;if(I(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=n,e.line=r,e.lineStart=i,e.lineIndent=a;break}Os(o)||(a=e.position+1),o=e.input.charCodeAt(++e.position)}return a!==i&&(Vs(e,i,a),Ss(e,i,a,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,z.PLAIN,B.CLIP,-1,!c),!0)}function Zs(e,t){let n=e.line;I(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&P(e,`deficient indentation`)}function Qs(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,a=e.position,o=!0;if(r!==91&&r!==123)return!1;let s=i?125:93;for(i?bs(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,dl.FLOW):ys(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,dl.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){Zs(e,t);let n=e.input.charCodeAt(e.position);if(n===s)return e.position++,ws(e),!0;o?n===44&&P(e,`expected the node content, but found ','`):P(e,`missed comma between flow collection entries`);let r=!1,a=!1;n===63&&ks(e.input.charCodeAt(e.position+1))&&(r=a=!0,e.position+=1,Zs(e,t));let c=e.line,l=Es(e),u=tc(e,t,bl,!1,!0);Zs(e,t),n=e.input.charCodeAt(e.position),(i||a||e.line===c)&&n===58?(r=!0,e.position++,Zs(e,t),i||xs(e,l),u||N(e),tc(e,t,bl,!1,!0)||N(e),Zs(e,t),i||ws(e)):i&&r?(u||N(e),N(e)):i?N(e):r&&(xs(e,l),u||N(e),N(e),ws(e)),n=e.input.charCodeAt(e.position),n===44?(o=!0,e.position++):o=!1}P(e,`unexpected end of the stream within a flow collection`)}function $s(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!As(e.input.charCodeAt(e.position+1)))return!1;for(ys(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,dl.BLOCK);e.input.charCodeAt(e.position)===45&&As(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,P(e,`tab characters must not be used in indentation`));let n=e.line;e.position++;let r=I(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&As(e.input.charCodeAt(e.position+1))&&P(e,`bad indentation of a sequence entry`),r&&e.lineIndent<=t?N(e):tc(e,t,Sl,!1,!0),I(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&P(e,`bad indentation of a sequence entry`),e.line===n&&e.input.charCodeAt(e.position)===45&&As(e.input.charCodeAt(e.position+1))&&P(e,`bad indentation of a sequence entry`)}return ws(e),!0}function ec(e,t,n,r){let i=!1,a=!1,o=!1,s=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,P(e,`tab characters must not be used in indentation`));let l=e.input.charCodeAt(e.position+1),u=e.line;if((c===63||c===58)&&As(l))o||=(bs(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,dl.BLOCK),!0),c===63?(i&&N(e),a=!0,i=!0):i?i=!1:(N(e),a=!0,i=!1),e.position+=1,s=!0;else{i&&=(N(e),!1);let t=Es(e);if(!tc(e,n,xl,!1,!0))break;if(e.line===u){for(c=e.input.charCodeAt(e.position);Os(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),As(c)||P(e,`a whitespace character is expected after the key-value separator within a block mapping`),o||=(e.events.splice(t.eventsLength,0,{type:R.MAPPING,start:t.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:dl.BLOCK}),!0),a=!0,i=!1,s=!1;else if(a)P(e,`expected ':' after a mapping key`);else return r.anchorStart!==V||r.tagStart!==V?(Ds(e,t),!1):!0}else if(a)P(e,`can not read a block mapping entry; a multiline key may not be an implicit key`);else return r.anchorStart!==V||r.tagStart!==V?(Ds(e,t),!1):!0}if(tc(e,t,Cl,!0,s)&&(s=!1),i||(s&&=(N(e),!1)),I(e,!0),c=e.input.charCodeAt(e.position),(e.line===u||e.lineIndent>t)&&c!==0)P(e,`bad indentation of a mapping entry`);else if(e.lineIndent<t)break}return a?(i&&N(e),o&&ws(e),!0):!1}function tc(e,t,n,r,i,a=!0){e.depth>=e.maxDepth&&P(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,s=!1,c=!1,l=null,u=Ts(),d=n===Cl||n===Sl,f=d,p=d;if(r&&I(e,!0)&&(s=!0,o=e.lineIndent>t?1:e.lineIndent===t?0:-1),o===1)for(;;){let r=e.input.charCodeAt(e.position),i=Es(e);if(s&&o!==1&&(r===33||r===38))break;if(s&&p&&(u.tagStart!==V||u.anchorStart!==V)&&(r===33||r===38)){let n=Es(e),r=t+1;if(ec(e,e.position-e.lineStart,r,u)&&e.events[n.eventsLength]?.type===R.MAPPING)return e.depth--,!0;Ds(e,n)}if(s&&(r===33&&u.tagStart!==V||r===38&&u.anchorStart!==V)||!Hs(e,u,n===bl)&&!Us(e,u))break;l===null&&(l=i),I(e,!0)?(s=!0,f=p,o=e.lineIndent>t?1:e.lineIndent===t?0:-1):f=!1}if(f&&=s||i,o===1||n===Cl){let r=n===bl||n===xl?t:t+1,i=e.position-e.lineStart;if(o===1){if(f&&($s(e,i,u)||ec(e,i,r,u))||Qs(e,r,u))c=!0;else{let t=e.input.charCodeAt(e.position);if(l!==null&&a&&p&&!f&&t!==124&&t!==62){let t=Es(e),n=l.position-l.lineStart;Ds(e,l),ec(e,n,r,Ts())&&e.events[t.eventsLength]?.type===R.MAPPING?c=!0:Ds(e,t)}!c&&(d&&Js(e,r,u)||Ks(e,r,u)||qs(e,r,u)||Ws(e,u)||Xs(e,r,n,u))&&(c=!0)}}else o===0&&(c=f&&$s(e,i,u))}return d&&=!c,!c&&(u.anchorStart!==V||u.tagStart!==V||d)&&(Ss(e,V,V,u.anchorStart,u.anchorEnd,u.tagStart,u.tagEnd,z.PLAIN),c=!0),e.depth--,c||u.anchorStart!==V||u.tagStart!==V}function nc(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ks(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&P(e,`directive name must not be less than one character in length`);e.input.charCodeAt(e.position)!==0&&!F(e.input.charCodeAt(e.position));){for(;Os(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||F(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ks(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(t,e.position))}if(F(e.input.charCodeAt(e.position))&&Is(e),n===`YAML`){e.directives.some(e=>e.kind===`yaml`)&&P(e,`duplication of %YAML directive`),r.length!==1&&P(e,`YAML directive accepts exactly one argument`);let t=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);t===null&&P(e,`ill-formed argument of the YAML directive`),parseInt(t[1],10)!==1&&P(e,`unacceptable YAML version of the document`),e.directives.push({kind:`yaml`,version:r[0]})}else if(n===`TAG`){r.length!==2&&P(e,`TAG directive accepts exactly two arguments`);let[t,n]=r;El.test(t)||P(e,`ill-formed tag handle (first argument) of the TAG directive`),yl.call(e.tagHandlers,t)&&P(e,`there is a previously declared suffix for "${t}" tag handle`),jl.test(n)||P(e,`ill-formed tag prefix (second argument) of the TAG directive`),e.tagHandlers[t]=n,e.directives.push({kind:`tag`,handle:t,prefix:n})}return!0}function rc(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(I(e,!0);nc(e);)t=!0,I(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&As(e.input.charCodeAt(e.position+3))){n=!0;let t=e.line;e.position+=3,I(e,!0),i=e.line>t}else t&&P(e,`directives end mark is expected`);let a=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&Ls(e)){e.position+=3,I(e,!0);return}if(vs(e,n,!1),tc(e,e.lineIndent-1,Cl,!1,i,i)||N(e),I(e,!0),e.position===e.lineStart&&Ls(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let t=e.line;e.position+=3,I(e,!0),e.line===t&&e.position<e.length&&P(e,`end of the stream or a document separator is expected`)}let o=e.events[a];o?.type===R.DOCUMENT&&(o.explicitEnd=r),ws(e),!r&&e.position<e.length&&!zs(e)&&P(e,`end of the stream or a document separator is expected`)}function ic(e,t){let n=e.length,r={...Ml,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf(`\0`);for(i!==-1&&ul.throwAt(e,i,`null byte is not allowed in input`,r.filename);r.position<r.length&&(Rs(r),I(r,!0),!(r.position>=r.length));){let e=r.position;rc(r),r.position===e&&P(r,`can not read a document`)}return r.events}function ac(e,t={}){let n={...Nl,...t},r=String(e),i=Object.keys(Ml),a=Object.keys(vl);return _s(ic(r,zo(n,i)),{...zo(n,a),source:r})}function oc(e,t){let n=ac(e,t);if(n.length===0)throw new ul(`expected a document, but the input is empty`);if(n.length===1)return n[0];throw new ul(`expected a single document in the stream, but found more`)}function sc(e,t){return!!(e&1<<t)}function cc(e){return e.presenterOptions.quoteStyle===`single`&&sc(e.allowedStylesMask,z.SINGLE_QUOTED)?z.SINGLE_QUOTED:z.DOUBLE_QUOTED}function lc(e){e.presenterOptions.quoteFlowKeys&&e.isKey&&e.flowOnly&&e.style===z.PLAIN&&(e.style=z.DOUBLE_QUOTED)}function uc(e){e.style===z.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=z.DOUBLE_QUOTED)}function dc(e){e.style===z.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=z.DOUBLE_QUOTED)}function fc(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==z.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?z.DOUBLE_QUOTED:cc(e)))}function pc(e){if(e.style!==z.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!sc(e.allowedStylesMask,z.LITERAL_BLOCK)){n&&(e.style=z.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=z.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),a=0,o=!1;for(;a<=t.length;){let e=t.length,n=t.indexOf(`
`,a);n!==-1&&(e=n);let r=t.slice(a,e);if(r.length>i&&r[0]!==` `&&/ [^ \t]/.test(r)&&(o=!0),n===-1)break;a=n+1}o?e.style=z.FOLDED_BLOCK:n&&(e.style=z.LITERAL_BLOCK)}function mc(e){e.style===z.PLAIN&&!sc(e.allowedStylesMask,z.PLAIN)&&(e.style=cc(e))}function hc(e){sc(e.allowedStylesMask,e.style)||(e.style=z.DOUBLE_QUOTED)}var L,gc,_c,vc,yc,bc,xc,Sc,Cc,wc,Tc,Ec,Dc,Oc,kc,Ac,jc,Mc,Nc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl,ll,ul,R,z,dl,B,fl,pl,ml,hl,gl,_l,vl,V,yl,bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl,Ql,$l,eu,tu,nu,ru,iu,au,ou,su=o((()=>{L=Symbol(`NOT_RESOLVED`),gc=j(`tag:yaml.org,2002:str`,{resolve:e=>e,identify:e=>typeof e==`string`}),_c=[``,`~`,`null`,`Null`,`NULL`],vc=j(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>_c.indexOf(e)===-1?L:null,identify:e=>e===null,represent:()=>`null`}),yc=j(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[`n`],resolve:(e,t)=>e===`null`||t&&e===``?null:L,identify:e=>e===null,represent:()=>`null`}),bc=[``,`~`,`null`,`Null`,`NULL`],xc=j(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>bc.indexOf(e)===-1?L:null,identify:e=>e===null,represent:()=>`null`}),Sc=[`true`,`True`,`TRUE`],Cc=[`false`,`False`,`FALSE`],wc=j(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`T`,`f`,`F`],resolve:e=>Sc.indexOf(e)!==-1||Cc.indexOf(e)===-1&&L,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Tc=[`true`],Ec=[`false`],Dc=j(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`f`],resolve:e=>Tc.indexOf(e)!==-1||Ec.indexOf(e)===-1&&L,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Oc=[`true`,`True`,`TRUE`,`y`,`Y`,`yes`,`Yes`,`YES`,`on`,`On`,`ON`],kc=[`false`,`False`,`FALSE`,`n`,`N`,`no`,`No`,`NO`,`off`,`Off`,`OFF`],Ac=j(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`y`,`Y`,`n`,`N`,`t`,`T`,`f`,`F`,`o`,`O`],resolve:e=>Oc.indexOf(e)!==-1||kc.indexOf(e)===-1&&L,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),jc=RegExp(`^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Mc=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Nc=j(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:Co,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Pc=RegExp(`^-?(?:0|[1-9][0-9]*)$`),Fc=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Ic=j(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:To,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Lc=RegExp(`^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$`),Rc=j(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:Do,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),zc=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Bc=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Vc=j(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Oo,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:ko}),Hc=RegExp(`^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$`),Uc=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Wc=j(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Ao,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:jo}),Gc=RegExp(`^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Kc=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),qc=j(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Mo,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:No}),Jc=j(`tag:yaml.org,2002:merge`,{implicit:!0,implicitFirstChars:[`<`],resolve:(e,t)=>e===`<<`||t&&e===``?`<<`:L,identify:()=>!1}),Yc=/^[A-Za-z0-9+/]*={0,2}$/,Xc=j(`tag:yaml.org,2002:binary`,{resolve:Po,identify:e=>Object.prototype.toString.call(e)===`[object Uint8Array]`,represent:Fo}),Zc=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$`),Qc=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$`),$c=j(`tag:yaml.org,2002:timestamp`,{implicit:!0,implicitFirstChars:[...`0123456789`],resolve:Lo,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),el=bo(`tag:yaml.org,2002:seq`,{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray}),tl=bo(`tag:yaml.org,2002:omap`,{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return`cannot resolve an ordered map item`;n=t.keys().next().value}else if(Ro(t)){let e=Object.keys(t);if(e.length!==1)return`cannot resolve an ordered map item`;n=e[0]}else return`cannot resolve an ordered map item`;return e.seen.has(n)?`duplicate key in ordered map`:(e.seen.add(n),e.list.push(t),``)},finalize:e=>e.list,identify:()=>!1}),nl=bo(`tag:yaml.org,2002:pairs`,{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size===1?(e.push(t.entries().next().value),``):`cannot resolve a pairs item`;if(Object.prototype.toString.call(t)!==`[object Object]`)return`cannot resolve a pairs item`;let n=t,r=Object.keys(n);return r.length===1?(e.push([r[0],n[r[0]]]),``):`cannot resolve a pairs item`},identify:()=>!1}),rl=xo(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Ro,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(typeof t==`object`&&t)return`object-based map does not support complex keys`;let r=String(t);return r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``},has:(e,t)=>typeof t==`object`&&t?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),il=xo(`tag:yaml.org,2002:set`,{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n===null?(e.add(t),``):`cannot resolve a set item`,has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null}),al=class e{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(e){let t=Ho(e),n=[],r=Bo(),i=Vo();for(let e of t){if(e.nodeKind===`scalar`&&e.implicit){if(e.matchByTagPrefix)throw Error(`Implicit scalar tags cannot match by tag prefix`);n.push(e)}switch(e.nodeKind){case`scalar`:e.matchByTagPrefix?i.scalar.push(e):r.scalar[e.tagName]=e;break;case`sequence`:e.matchByTagPrefix?i.sequence.push(e):r.sequence[e.tagName]=e;break;case`mapping`:e.matchByTagPrefix?i.mapping.push(e):r.mapping[e.tagName]=e}}let a=n.filter(e=>e.implicitFirstChars===null),o=new Set;for(let e of n)if(e.implicitFirstChars!==null)for(let t of e.implicitFirstChars)o.add(t);let s=new Map;for(let e of o)s.set(e,n.filter(t=>t.implicitFirstChars===null||t.implicitFirstChars.indexOf(e)!==-1));let c=r.scalar[`tag:yaml.org,2002:str`];if(!c)throw Error(`schema does not define the default scalar tag (tag:yaml.org,2002:str)`);this.tags=t,this.implicitScalarTags=n,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=c,this.defaultSequenceTag=r.sequence[`tag:yaml.org,2002:seq`],this.defaultMappingTag=r.mapping[`tag:yaml.org,2002:map`],this.exact=r,this.prefix=i}lookupScalarTag(e){let t=this.exact.scalar[e];if(t)return t;for(let t of this.prefix.scalar)if(e.startsWith(t.tagName))return t}lookupSequenceTag(e){let t=this.exact.sequence[e];if(t)return t;for(let t of this.prefix.sequence)if(e.startsWith(t.tagName))return t}lookupMappingTag(e){let t=this.exact.mapping[e];if(t)return t;for(let t of this.prefix.mapping)if(e.startsWith(t.tagName))return t}resolveImplicitScalarTag(e){let t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(let n of t){let t=n.resolve(e,!1,n.tagName);if(t!==L)return{value:t,tag:n}}let n=this.defaultScalarTag;return{value:n.resolve(e,!1,n.tagName),tag:n}}withTags(...t){let n=[];for(let e of t)n=n.concat(e);return new e([...this.tags,...n])}},ol=new al([gc,el,rl]),new al([...ol.tags,yc,Dc,Ic,Wc]),sl=new al([...ol.tags,vc,wc,Nc,Vc]),cl=new al([...ol.tags,xc,Ac,Rc,qc,$c,Jc,Xc,tl,nl,il]),cl.withTags({...Rc,resolve:(e,t,n)=>{let r=Rc.resolve(e,t,n);return r===L?Nc.resolve(e,t,n):r}},{...qc,resolve:(e,t,n)=>{let r=qc.resolve(e,t,n);return r===L?Vc.resolve(e,t,n):r}}),xo(`tag:yaml.org,2002:map`,{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),``),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Ro(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let e of Object.keys(n))t.set(e,n[e]);return t}}),xo(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Ro,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=Uo(t);return r===null?`nested arrays are not supported inside keys`:(r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``)},has:(e,t)=>{let n=Uo(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),ll={maxLength:79,indent:1,linesBefore:3,linesAfter:2},ul=class e extends Error{reason;mark;constructor(e,t){super(),this.name=`YAMLException`,this.reason=e,this.mark=t,this.message=qo(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${qo(this,e)}`}static throwAt(t,n,r,i=``){let a=0,o=0;for(let e=0;e<n;e++){let n=t.charCodeAt(e);n===10?(a++,o=e+1):n===13&&(a++,t.charCodeAt(e+1)===10&&e++,o=e+1)}let s={name:i,buffer:t,position:n,line:a,column:n-o};throw s.snippet=Ko(s),new e(r,s)}},R={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},z={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},dl={BLOCK:1,FLOW:2},B={CLIP:1,STRIP:2,KEEP:3},fl=-1,pl=Array(256),ml=Array(256);for(let e=0;e<256;e++)pl[e]=+!!Jo(e),ml[e]=Jo(e);hl=Object.assign(Object.create(null),{"!":`!`,"!!":`tag:yaml.org,2002:`}),gl=-1,_l=`tag:yaml.org,2002:merge`,vl={filename:``,schema:sl,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1},V=-1,yl=Object.prototype.hasOwnProperty,bl=1,xl=2,Sl=3,Cl=4,wl=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Tl=/[,\[\]{}]/,El=/^(?:!|!!|![0-9A-Za-z-]+!)$/,Dl=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Ol=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,kl=RegExp(`^(?:${Dl})*$`),Al=RegExp(`^(?:${Ol})+$`),jl=RegExp(`^(?:!(?:${Dl})*|${Ol}(?:${Dl})*)$`),Ml={filename:``,maxDepth:100},Nl={...Ml,...vl},Pl={applyQuoteFlowKeysOption:lc,doubleQuoteForInvisibles:uc,doubleQuoteWhitespaceOnly:dc,applyForceQuotesOption:fc,tryLongOrMultilineAsBlock:pc,quoteInvalidPlain:mc,fallbackToDoubleQuoted:hc},Fl=`[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]`,Il=`[\\n\\r]`,Ll=`\\uFEFF`,Rl=`[ \\t]`,zl=`(?:(?!(?:${Il}|${Ll}))${Fl})`,Bl=`(?:(?!${Rl})${zl})`,Vl=`[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]`,Hl=`[-?:,\\[\\]{}#&*!|>'"%@\`]`,Ul=`[,\\[\\]{}]`,Wl=Bl,Gl=`(?:(?!${Ul})${Bl})`,Kl=`(?:(?:(?!${Hl})${Bl})|[?:-](?=${Wl}))`,ql=`(?:(?:(?!${Hl})${Bl})|[?:-](?=${Gl}))`,Jl=`(?:(?:(?![:#])${Wl})|:(?=${Wl}))#*`,Yl=`(?:(?:(?![:#])${Gl})|:(?=${Gl}))#*`,Xl=`(?:${Rl}*${Jl})*`,Zl=`(?:${Rl}*${Yl})*`,Ql=`${Kl}#*${Xl}`,$l=`${ql}#*${Zl}`,eu=Ql,tu=$l,nu=`\\n+${Jl}${Xl}`,ru=`\\n+${Yl}${Zl}`,iu=`${Ql}(?:${nu})*`,au=`${$l}(?:${ru})*`,RegExp(`^(?:${iu})$`,`u`),RegExp(`^(?:${au})$`,`u`),RegExp(`^(?:${eu})$`,`u`),RegExp(`^(?:${tu})$`,`u`),RegExp(`^(?:${Vl})*$`,`u`),RegExp(`^(?:${Vl}|\\n)*$`,`u`),RegExp(`^(?:${zl}|\\n)*$`,`u`),ou={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:`single`,forceQuotes:!1,scalarStyleRules:Object.keys(Pl).map(e=>Reflect.get(Pl,e)),tagBeforeAnchor:!1},{...ou},R.DOCUMENT,R.SEQUENCE,R.MAPPING,R.SCALAR,R.ALIAS,R.POP,z.PLAIN,z.SINGLE_QUOTED,z.DOUBLE_QUOTED,z.LITERAL_BLOCK,z.FOLDED_BLOCK,dl.BLOCK,dl.FLOW,B.CLIP,B.STRIP,B.KEEP})),cu=s(((e,t)=>{t.exports=function(e,t){var n=`-`,r=n.charCodeAt(0),i=n.length;function a(e,a,o,s){var c,l,u,d,f,p,m,h=!1,g=e.bMarks[a]+e.tShift[a],_=e.eMarks[a];if(a!==0||r!==e.src.charCodeAt(0))return!1;for(c=g+1;c<=_;c++)if(n[(c-g)%i]!==e.src[c]){m=c+1;break}if(u=Math.floor((c-g)/i),u<3)return!1;if(c-=(c-g)%i,s)return!0;for(l=a;l++,!(l>=o||e.src.slice(g,_)===`...`||(g=e.bMarks[l]+e.tShift[l],_=e.eMarks[l],g<_&&e.sCount[l]<e.blkIndent));)if(r===e.src.charCodeAt(g)&&!(e.sCount[l]-e.blkIndent>=4)){for(c=g+1;c<=_&&n[(c-g)%i]===e.src[c];c++);if(!(Math.floor((c-g)/i)<u)&&(c-=(c-g)%i,c=e.skipSpaces(c),!(c<_))){h=!0;break}}return f=e.parentType,p=e.lineMax,e.parentType=`container`,e.lineMax=l,d=e.push(`front_matter`,null,0),d.hidden=!0,d.markup=e.src.slice(a,c),d.block=!0,d.map=[a,l+ +!!h],d.meta=e.src.slice(m,g-1),e.parentType=f,e.lineMax=p,e.line=l+ +!!h,t(d.meta),!0}e.block.ruler.before(`table`,`front_matter`,a,{alt:[`paragraph`,`reference`,`blockquote`,`list`]})}}));function lu(){return e=>{let t=``;e.use(hu.default,n=>{let r=uu(n);t=r===void 0?``:du(r,e.utils.escapeHtml)}),e.renderer.rules.front_matter=(e,n,r,i,a)=>t===``?``:`<table class="markdown-frontMatter"${a.renderAttrs(e[n])}>\n${t}\n</table>\n`}}function uu(e){try{let t=oc(e,{schema:sl});if(typeof t==`object`&&t&&!Array.isArray(t)&&Object.keys(t).length>0)return t}catch{}}function du(e,t){let n=Object.entries(e);return n.length===0?``:`<tbody>\n${n.map(([e,n])=>`<tr><th scope="row">${t(e)}</th><td>${fu(n,t)}</td></tr>`).join(`
`)}\n</tbody>`}function fu(e,t){if(e==null)return``;if(e instanceof Date)return t(pu(e));if(Array.isArray(e))return e.every(mu)?e.map(e=>fu(e,t)).join(`, `):`<ul>${e.map(e=>`<li>${fu(e,t)}</li>`).join(``)}</ul>`;if(typeof e==`object`){let n=du(e,t);return n===``?``:`<table>${n}</table>`}return t(String(e))}function pu(e){if(Number.isNaN(e.getTime()))return``;let t=e.toISOString();return t.endsWith(`T00:00:00.000Z`)?t.slice(0,10):t}function mu(e){if(e==null||e instanceof Date)return!0;let t=typeof e;return t===`string`||t===`number`||t===`boolean`||t===`bigint`}var hu,gu=o((()=>{su(),hu=u(cu())}));function _u(e,t={}){return e??t}function vu(e,t=!0){return e??t}var yu,bu,xu,Su,Cu,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Nu,Pu=o((()=>{yu={rootValueKey:`extension.markeditPreview`,defaultModes:[`edit`,`side-by-side`,`preview`,`syntax-hidden`],defaultPreset:`default`},bu=_u(_u(f.MarkEdit.userSettings)[yu.rootValueKey]),xu=_u(bu.changeMode),Su=_u(bu.markdownIt),Cu=vu(bu.syncScroll),bu.hidePreviewButtons,bu.syntaxAutoDetect,wu=vu(bu.imageHoverPreview,!1),Tu=vu(bu.inlineImages,!1),Eu=Array.isArray(bu.inlineRendering)?bu.inlineRendering.filter(e=>e===`image`||e===`table`||e===`math`||e===`mermaid`||e===`html`):Tu?[`image`,`math`,`mermaid`]:[`math`,`mermaid`],Du=bu.themeName??`github`,Ou=Du===`none`,ku=bu.styledHtmlColorScheme??bu.styledHtmlTheme??`auto`,bu.mathDelimiters,Au=xu.modes??yu.defaultModes,ju=_u(xu.hotKey),Mu=Su.preset??yu.defaultPreset,Nu=_u(Su.options)})),Fu,Iu=o((()=>{Fu=`.markdown-body {
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
`})),Lu,Ru=o((()=>{Lu=`.markdown-body {
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
`})),zu,Bu=o((()=>{zu=`.markdown-body {
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
`})),Vu,Hu=o((()=>{Vu=`.markdown-body {
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
`})),Uu,Wu=o((()=>{Uu=`.markdown-body {
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
`})),Gu,Ku=o((()=>{Gu=`.markdown-body {
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
`})),qu,Ju=o((()=>{qu=`.markdown-body {
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
`})),Yu,Xu=o((()=>{Yu=`.markdown-body {
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
`})),Zu,Qu=o((()=>{Zu=`.markdown-body {
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
`})),$u,ed=o((()=>{$u=`.markdown-body {
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
`})),td,nd=o((()=>{td=`.markdown-body {
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
`})),rd,id=o((()=>{rd=`.markdown-body {
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
`})),ad,od=o((()=>{ad=`.markdown-body {
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
`})),sd,cd=o((()=>{sd=`.markdown-body {
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
`})),ld,ud=o((()=>{ld=`.markdown-body {
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
`})),dd,fd=o((()=>{dd=`.markdown-body {
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
`})),pd,md=o((()=>{pd=`.markdown-body {
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
`})),hd,gd=o((()=>{hd=`.markdown-alert {
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
`})),_d,vd=o((()=>{_d=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`})),yd,bd=o((()=>{yd=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`})),xd,Sd=o((()=>{xd=`.code-copy-wrapper {
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
`}));function Cd(e=`auto`){if(Ou)return``;let t=kd[Du]??kd.github,n=t.light??t.dark,r=t.dark??t.light,i=ee(n)??`#ffffff`,a=ee(r)??`#0d1117`;return[`.markdown-body { padding: 25px; }`,...Od(e,`body { background: ${i}; }`,`body { background: ${a}; }`)].join(`
`)}function wd(e,t){let n=kd[e.replace(/-(light|dark|dawn)$/,``)]??kd.github,r=t?n.dark??n.light:n.light??n.dark;return`${Fu}\n${r}`}function Td(e=`auto`){if(Ou)return[`:root { color-scheme: ${e===`auto`?`light dark`:e}; }`,`body, .markdown-body { background: Canvas; color: CanvasText; }`].join(`
`);let t=kd[Du]??kd.github,n=t.light??t.dark,r=t.dark??t.light;return[Fu,...Od(e,n,r)].join(`
`)}function Ed(e=`auto`){return[hd,...Od(e,_d,yd)].join(`
`)}function Dd(){return xd}function Od(e,t,n){let r=[];switch(e){case`light`:r.push(t);break;case`dark`:r.push(n);break;case`auto`:r.push(`
        ${t}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`)}return r}var kd,Ad=o((()=>{fe(),Pu(),Iu(),Ru(),Bu(),Hu(),Wu(),Ku(),Ju(),Xu(),Qu(),ed(),nd(),id(),od(),cd(),ud(),fd(),md(),gd(),vd(),bd(),Sd(),kd={github:{light:Lu,dark:zu},cobalt:{dark:Vu},dracula:{dark:Uu},minimal:{light:Gu,dark:qu},"night-owl":{dark:Yu},"rose-pine":{light:Zu,dark:$u},solarized:{light:td,dark:rd},synthwave84:{dark:ad},"winter-is-coming":{light:sd,dark:ld},xcode:{light:dd,dark:pd}}}));function H(e){return Nd[e]}var jd,Md,Nd,Pd=o((()=>{jd={default:{viewMode:`View Mode`,changeMode:`Change Mode`,editMode:`Markdown Source`,sideBySideMode:`Preview (Side-by-Side)`,previewMode:`Preview (Overlay)`,syntaxHiddenMode:`Mixed (Syntax Hidden)`,saveCleanHtml:`Save Clean HTML`,saveStyledHtml:`Save Styled HTML`,copyHtml:`Copy HTML`,copyRichText:`Copy Rich Text`,copyCode:`Copy Code`,failedToCopy:`Failed to copy. Please try again.`,untitled:`Untitled`,version:`Version`,source:`Source`,preview:`Preview`,goToFootnoteDefinition:`Go to definition [%s]`,backToFootnoteReference:`Back to reference [%s]`},"zh-CN":{viewMode:`视图模式`,changeMode:`切换模式`,editMode:`Markdown 源码`,sideBySideMode:`预览（并排）`,previewMode:`预览（覆盖）`,syntaxHiddenMode:`混合（隐藏语法）`,saveCleanHtml:`保存无样式 HTML`,saveStyledHtml:`保存带样式 HTML`,copyHtml:`复制 HTML`,copyRichText:`复制富文本`,copyCode:`复制代码`,failedToCopy:`复制失败，请重试。`,untitled:`未命名`,version:`版本`,source:`源码`,preview:`预览`,goToFootnoteDefinition:`跳转到定义 [%s]`,backToFootnoteReference:`返回引用 [%s]`},"zh-TW":{viewMode:`視圖模式`,changeMode:`切換模式`,saveCleanHtml:`儲存無樣式 HTML`,saveStyledHtml:`儲存帶樣式 HTML`,copyHtml:`拷貝 HTML`,copyRichText:`複製富文字`,copyCode:`拷貝程式碼`,failedToCopy:`複製失敗，請再試一次。`,editMode:`Markdown 原始碼`,sideBySideMode:`預覽（並排）`,previewMode:`預覽（覆蓋）`,syntaxHiddenMode:`混合（隱藏語法）`,untitled:`未命名`,version:`版本`,source:`原始碼`,preview:`預覽`,goToFootnoteDefinition:`前往定義 [%s]`,backToFootnoteReference:`返回引用 [%s]`}},Md=[`default`,`zh-CN`,`zh-TW`],Nd=jd[(()=>{let e=navigator.language;return Md.includes(e)?e:`default`})()]}));function Fd(){return typeof f.MarkEdit.addExtension==`function`}var Id=o((()=>{}));async function Ld(e,t=!0){return await Kd,U.render(e,{lineInfo:t})}async function Rd(e){await Kd;let t={lineInfo:!1},n=U.parse(e,t),r=[];for(let e=0;e<n.length;e+=1){let i=n[e];if(i.type!==`table_open`||i.level!==0||i.map===null)continue;let a=e+1;for(;a<n.length&&n[a].type!==`table_close`;)a+=1;a!==n.length&&(r.push({fromLine:i.map[0]+1,toLine:i.map[1],html:U.renderer.render(n.slice(e,a+1),U.options,t)}),e=a)}return r}async function zd(e,t){if(!t.startsWith(`#`))return;await Kd;let n=U.normalizeLink(t).substring(1);return U.parse(e,{}).find(e=>e.type===`heading_open`&&e.attrGet(`id`)===n)?.map?.[0]}function Bd(e,t){e()}async function Vd(e){let t=e=>`<style>\n${e}\n</style>`;return[`<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>`,`<div class="markdown-body">\n${e}\n</div>`,t(Cd(ku)),t(Td(ku)),t(Ed(ku)),t(Dd()),`</body></html>`].join(`
`)}var Hd,Ud,U,Wd,Gd,Kd,qd=o((()=>{Ba(),no(),Hd=u(ro()),mo(),Ud=u(ho()),yo(),gu(),Ad(),Pd(),Id(),Pu(),U=Pa(Mu,{html:!0,breaks:!0,linkify:!0,...Nu}),Wd=[],U.use(lu()),U.use(qa),U.use(Hd.default,{matcher:e=>!e.startsWith(`#`),attrs:{target:`_blank`,rel:`noopener`}}),U.use(po),U.use(Ud.default,{enabled:Fd(),label:!0}),U.use(vo),Gd=new Set([`paragraph_open`,`heading_open`,`blockquote_open`,`list_item_open`,`bullet_list_open`,`ordered_list_open`,`fence`,`code_block`,`table_open`,`html_block`,`front_matter`]),Kd=Promise.all(Wd).then(()=>{for(let e of Gd){let t=U.renderer.rules[e];U.renderer.rules[e]=(e,n,r,i,a)=>{let o=e[n];return i.lineInfo&&o.map?.length===2&&(o.attrSet(`data-line-from`,String(o.map[0])),o.attrSet(`data-line-to`,String(o.map[1]-1))),t?t(e,n,r,i,a):a.renderToken(e,n,r)}}for(let e of[`fence`,`code_block`]){let t=U.renderer.rules[e];U.renderer.rules[e]=(e,n,r,i,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${t===void 0?a.renderToken(e,n,r):t(e,n,r,i,a)}
        <button title="${H(`copyCode`)}" aria-label="${H(`copyCode`)}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}})}));function Jd(e){let t=$d.parseFromString(e,`text/html`);return t.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yd(t))}),t.body.innerHTML}function Yd(e){return e.includes(`://`)||e.startsWith(`//`)||e.startsWith(`data:image/`)?e:`${ef}://${e}`}function Xd(e){typeof f.MarkEdit.getFileInfo==`function`&&(document.addEventListener(`mousemove`,e=>{rf.panelPresenter!==void 0&&(clearTimeout(rf.panelPresenter),rf.panelPresenter=void 0),rf.panelPresenter=setTimeout(()=>{let t=e.target,n=t?.closest(`.cm-md-link`),r=n?.dataset.linkUrl??n?.innerText??``;n!==null&&se(r)?Zd(n,r):t?.classList.contains(tf)||Qd()},600)}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&Qd(!1)}),e.addEventListener(`scroll`,()=>Qd()))}async function Zd(e,t){if(e===rf.focusedElement)return;let n=(await f.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;let r=ce(n,t),i=await f.MarkEdit.getFileObject(r);if(i===void 0)return;let a=e.getBoundingClientRect(),o=document.createElement(`img`);o.className=tf,o.style.position=`fixed`,o.style.left=`${a.left}px`,o.style.zIndex=`10000`,o.style.borderRadius=`5px`,o.style.opacity=`0`,o.style.transition=`opacity 120ms`,o.style.cursor=`pointer`,o.onclick=()=>{Qd(),window.open(t,`_blank`)},o.onload=()=>{let e=Math.min(o.naturalHeight,240);o.style.height=`${e}px`,a.top>window.innerHeight-a.bottom?o.style.top=`${a.top-e-nf}px`:o.style.top=`${a.bottom+nf}px`,requestAnimationFrame(()=>{o.style.opacity=`1`})},o.src=`data:${i.mimeType??`image/png`};base64,${i.data}`,Qd(!1),rf.focusedElement=e,document.body.appendChild(o)}function Qd(e=!0){rf.focusedElement!==void 0&&(rf.focusedElement=void 0,document.querySelectorAll(`.${tf}`).forEach(t=>{e?(t.style.opacity=`0`,t.addEventListener(`transitionend`,()=>t.remove(),{once:!0})):t.remove()}))}var $d,ef,tf,nf,rf,af=o((()=>{fe(),$d=new DOMParser,ef=`image-loader`,tf=`cm-md-image-preview`,nf=5,rf={panelPresenter:void 0,focusedElement:void 0}}));qd(),af(),fe(),Pu();function of(e,t){if(!Cu)return;mf.scrollUpdater!==void 0&&clearTimeout(mf.scrollUpdater);let n=f.MarkEdit.editorView.state.doc,r=f.MarkEdit.editorView.state.selection;mf.lastSourceScrollTop=e.scrollTop;let i=()=>{let{doc:i,selection:a}=f.MarkEdit.editorView.state,o=i===n&&!a.eq(r);n=i,r=a,!(!o&&Math.abs(e.scrollTop-mf.lastSourceScrollTop)<.5)&&(mf.lastSourceScrollTop=e.scrollTop,(o||!t.classList.contains(`overlay`))&&sf(e,t))};`onscrollend`in window?e.addEventListener(`scrollend`,i):e.addEventListener(`scroll`,()=>{mf.scrollUpdater!==void 0&&clearTimeout(mf.scrollUpdater),mf.scrollUpdater=setTimeout(i,100)})}function sf(e,t,n=!0){let{line:r,progress:i}=cf(e);lf(t,r,i,n)}function cf(e,t=0){let n=f.MarkEdit.editorView,r=n.lineBlockAtHeight(e.scrollTop+t),i=n.state.doc.lineAt(r.from).number-1,a=ne(n.domAtPos(r.from).node);if(a===null)return{line:i,progress:0};let o=e.getBoundingClientRect(),s=a.getBoundingClientRect(),c=o.top-s.top-t;return{line:i,progress:s.height>0?pf(c/s.height):0}}function lf(e,t,n,r=!0){if(t===0&&n===0)return ae(e,0,r);let i=Array.from(e.querySelectorAll(`[data-line-from]`)),a=uf(i,t);if(a!==void 0){let{from:i,to:o}=re(a);return b(e,a,df(t,n,i,o),r)}if(t===0)return ae(e,0,r);let{beforeBlock:o,afterBlock:s}=ff(i,t);if(o!==void 0&&s!==void 0){let i=re(o),a=re(s),c=ie(e,o)+o.offsetHeight,l=ie(e,s),u=a.from-i.to,d=t-i.to+n,f=u>0?pf(d/u):0;return ae(e,c+(l-c)*f,r)}if(o!==void 0)return b(e,o,1,r);if(s!==void 0)return b(e,s,0,r)}function uf(e,t){return e.find(e=>{let{from:n,to:r}=re(e);return t>=n&&t<=r})}function df(e,t,n,r){let i=r-n;return i<1?e===n?t:0:pf((e-n+t)/i)}function ff(e,t){let n,r;for(let i of e){let{from:e,to:a}=re(i);if(a<t)n=i;else if(e>t){r=i;break}}return{beforeBlock:n,afterBlock:r}}function pf(e){return Math.max(0,Math.min(1,e))}var mf={lastSourceScrollTop:0,scrollUpdater:void 0};function hf(e){let t=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return t===null?null:{offset:t[1].length,replacement:t[2]===` `?`x`:` `}}fe();function gf(e,t){let n=(t.target instanceof Element?t.target.closest(`a`):null)?.getAttribute(`href`)??``;if(!n.startsWith(`#`))return!1;let r=_f(e,n);return r&&t.preventDefault(),r}function _f(e,t){if(!t.startsWith(`#`))return!1;let n=vf(t.substring(1)),r=[...e.querySelectorAll(`[id]`)].find(e=>e.id===n);return r!==void 0&&(b(e,r,0,!1),!0)}function vf(e){try{return decodeURIComponent(e)}catch{return e}}var yf={containerClass:`markdown-container`,gutterViewClass:`markdown-gutter`,dividerViewClass:`markdown-divider`,previewPaneClass:`markdown-body`},bf={viewModeCacheKey:`ui.view-mode`,previewPageZoomKey:`ui.preview-page-zoom`};function xf(e,t,n){if(![`Link`,`Image`,`Autolink`].includes(e.name))return;let r=kf(e.node);if(e.name===`Autolink`){if(r.length<2)return;let n=t.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(n)?{hidden:r.map(e=>({from:e.from,to:e.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:n,highlightTags:wf(e.node)}:void 0}if(r.length<2||Sf(e,t).length>0)return;let i=e.node.getChild(`LinkLabel`);if(r.length===2&&(i===null||i.to-i.from===2))return;let a=e.node.getChild(`URL`);if(r.length>2&&a===null||[`(`,`[`].includes(t.sliceDoc(e.to,e.to+1)))return;let o=r[0],s=r[1],c=t.sliceDoc(o.to,s.from);if(!/\S/.test(c)||c.startsWith(`^`)&&e.to===s.to)return;let l=a===null?Ef(i,t,n):t.sliceDoc(a.from,a.to);if(e.name!==`Image`||a!==null||l!==``)return{hidden:[{from:o.from,to:o.to},{from:s.from,to:e.to}],label:{from:o.to,to:s.from},image:e.name===`Image`,destination:l,highlightTags:wf(e.node)}}function Sf(e,t){if(e.name!==`Link`)return[];let n=t.sliceDoc(e.from,e.to),r=/\[\^[^\][\s]+\]/g,i=[];for(let e=r.exec(n);e!==null;e=r.exec(n))i.push(e);return i.map(e=>e[0]).join(``)===n?i.map(t=>({from:e.from+t.index,to:e.from+t.index+t[0].length,label:t[0].slice(1,-1),highlightTags:wf(e.node)})):[]}function Cf(e,t){if(e.name===`LinkDefinition`&&!X(t,e.from,e.to+1)&&Af.test(t.sliceDoc(e.from,e.to))&&t.sliceDoc(e.to,e.to+1)===`:`)return{hidden:[{from:e.from+1,to:e.from+2}],label:t.sliceDoc(e.from+1,e.to-1),highlightTags:wf(e.node),suffixPosition:e.to+1,suffix:/^[ \t]/.test(t.sliceDoc(e.to+1,e.to+2))?``:` `}}function wf(e){let t=[];for(let n=e;n!==null;n=n.parent)t.unshift(n);let n=new Set;for(let r of t){let t=(0,h.getStyleTags)(r);t!==null&&(r===e||t.inherit)&&t.tags.forEach(e=>n.add(e))}return[...n]}function Tf(e){let t=(0,m.syntaxTree)(e),n;return r=>{let i=jf.get(t);return n??=i?.doc===e.doc?i.destinations:void 0,n===void 0&&(n=Df(e,t),jf.set(t,{doc:e.doc,destinations:n})),n.get(Of(r))??``}}function Ef(e,t,n){return e===null?``:n(t.sliceDoc(e.from+1,e.to-1))}function Df(e,t){let n=new Map;return t.iterate({enter:t=>{if(t.name!==`LinkDefinitionID`)return;let r=Of(e.sliceDoc(t.from,t.to));if(n.has(r))return;let i=e.doc.lineAt(t.to),a=e.sliceDoc(t.node.parent?.to??t.to,i.to),o=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),s=o?.[1]??o?.[2];s!==void 0&&n.set(r,s)}}),n}function Of(e){return e.trim().replace(/\s+/g,` `).toLowerCase()}function kf(e){let t=[];for(let n=e.firstChild;n!==null;n=n.nextSibling)n.name===`LinkMark`&&t.push(n);return t}var Af,jf,Mf=o((()=>{Jh(),Af=/^\[\^[^\][\s]+\]$/,jf=new WeakMap}));function Nf(e,t){let n=Pf(e);if(n===void 0||kh(t,e.from,e.to))return[];let r=n.hidden.map(e=>If.range(e.from,e.to));if(e.name!==`InlineCode`)return r;let i=e.node.firstChild?.to,a=e.node.lastChild?.from;return i===void 0||a===void 0||i>=a||(a-i===1?r.push(Bf.range(i,a)):(r.push(Rf.range(i,i+1)),r.push(zf.range(a-1,a)))),r}function Pf(e){let t=Ff.get(e.name),n=t===void 0?[]:e.node.getChildren(t);if(n.length>0)return{hidden:n}}var Ff,If,Lf,Rf,zf,Bf,Vf=o((()=>{Jh(),Ff=new Map([[`Emphasis`,`EmphasisMark`],[`StrongEmphasis`,`EmphasisMark`],[`Strikethrough`,`StrikethroughMark`],[`InlineCode`,`CodeMark`]]),If=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),Lf=`cm-md-syntaxHiddenInlineCodeBoundary`,Rf=d.Decoration.mark({class:`${Lf} cm-md-syntaxHiddenInlineCodeStart`}),zf=d.Decoration.mark({class:`${Lf} cm-md-syntaxHiddenInlineCodeEnd`}),Bf=d.Decoration.mark({class:`${Lf} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`})})),Hf=o((()=>{})),Uf=o((()=>{qd()}));function Wf(e,t){this.v=e,this.k=t}function Gf(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Kf(e){if(Array.isArray(e))return e}function qf(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Jf(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Yf(e,t){return Kf(e)||qf(e,t)||Xf(e,t)||Jf()}function Xf(e,t){if(e){if(typeof e==`string`)return Gf(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Gf(e,t):void 0}}function Zf(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Wf;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}function W(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return fp(e,t,n)}}function Qf(e){return function(){return pp(e,[...arguments])}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:bp;if(op&&op(e,null),!yp(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(sp(t)||(t[r]=e),i=e)}e[i]=!0}return e}function $f(e){for(let t=0;t<e.length;t++)J(e,t)||(e[t]=null);return e}function ep(e){let t=up(null);for(let r of ap(e)){var n=Yf(r,2);let i=n[0],a=n[1];J(e,i)&&(t[i]=yp(a)?$f(a):a&&typeof a==`object`&&a.constructor===Object?ep(a):a)}return t}function tp(e){switch(typeof e){case`string`:return e;case`number`:return Ep(e);case`boolean`:return Dp(e);case`bigint`:return Op?Op(e):`0`;case`symbol`:return kp?kp(e):`Symbol()`;case`undefined`:return Ap(e);case`function`:case`object`:{if(e===null)return Ap(e);let t=e,n=np(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Ap(e)}return Ap(e)}default:return Ap(e)}}function np(e,t){for(;e!==null;){let n=lp(e,t);if(n){if(n.get)return W(n.get);if(typeof n.value==`function`)return W(n.value)}e=cp(e)}function n(){return null}return n}function rp(e){try{return Y(e,``),!0}catch{return!1}}function ip(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sm(),t=e=>ip(e);if(t.version=`3.4.16`,t.removed=[],!e||!e.document||e.document.nodeType!==rm.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=np(d,`cloneNode`),p=np(d,`remove`),m=np(d,`removeAttributeNode`),h=np(d,`nextSibling`),g=np(d,`childNodes`),_=np(d,`parentNode`),v=np(d,`shadowRoot`),y=np(d,`attributes`),ee=o&&o.prototype?np(o.prototype,`nodeType`):null,te=o&&o.prototype?np(o.prototype,`nodeName`):null,ne=o&&o.prototype?np(o.prototype,`ownerDocument`):null,re=function(e){return ee?ee(e):e.nodeType},ie=function(e){return te?te(e):e.nodeName};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let b,ae=``,oe,se=!1,ce=0,le=function(){if(ce>0)throw jp(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},ue=function(e){le(),ce++;try{return b.createHTML(e)}finally{ce--}},de=function(e){le(),ce++;try{return b.createScriptURL(e)}finally{ce--}},fe=function(){return se||=(oe=cm(u,i),!0),oe},pe=n,me=pe.implementation,he=pe.createNodeIterator,ge=pe.createDocumentFragment,_e=pe.getElementsByTagName,ve=r.importNode,x=lm();t.isSupported=typeof ap==`function`&&typeof _==`function`&&me&&me.createHTMLDocument!==void 0;let ye=Up,be=Wp,xe=Gp,Se=Kp,Ce=qp,we=Yp,Te=Xp,Ee=Qp,De=Jp,S=null,Oe=G({},[...Mp,...Np,...Pp,...Ip,...Rp]),C=null,ke=G({},[...zp,...Bp,...Vp,...Hp]),Ae=Object.seal(up(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,Me=null,Ne=Object.seal(up(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Pe=!0,Fe=!0,Ie=!1,Le=!0,Re=!1,ze=!0,Be=!1,Ve=!1,He=null,Ue=null,We=!1,Ge=!1,Ke=!1,qe=!1,Je=!0,Ye=!1,Xe=`user-content-`,Ze=!0,Qe=!1,$e={},et=null,tt=G({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),nt=null,rt=G({},[`audio`,`video`,`img`,`source`,`image`,`track`]),it=null,at=G({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),ot=`http://www.w3.org/1998/Math/MathML`,st=`http://www.w3.org/2000/svg`,ct=`http://www.w3.org/1999/xhtml`,lt=ct,ut=!1,dt=null,ft=G({},[ot,st,ct],xp),w=K([`mi`,`mo`,`mn`,`ms`,`mtext`]),pt=G({},w),mt=K([`annotation-xml`]),T=G({},mt),ht=G({},[`title`,`style`,`font`,`a`,`script`]),gt=null,_t=[`application/xhtml+xml`,`text/html`],E=null,vt=null,yt=n.createElement(`form`),bt=function(e){return e instanceof RegExp||e instanceof Function},xt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(vt&&vt===e)return;(!e||typeof e!=`object`)&&(e={}),e=ep(e),gt=_t.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,E=gt===`application/xhtml+xml`?xp:bp,S=um(e,`ALLOWED_TAGS`,Oe,{transform:E}),C=um(e,`ALLOWED_ATTR`,ke,{transform:E}),dt=um(e,`ALLOWED_NAMESPACES`,ft,{transform:xp}),it=um(e,`ADD_URI_SAFE_ATTR`,at,{transform:E,base:at}),nt=um(e,`ADD_DATA_URI_TAGS`,rt,{transform:E,base:rt}),et=um(e,`FORBID_CONTENTS`,tt,{transform:E}),je=um(e,`FORBID_TAGS`,ep({}),{transform:E}),Me=um(e,`FORBID_ATTR`,ep({}),{transform:E}),$e=J(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?ep(e.USE_PROFILES):e.USE_PROFILES:!1,Pe=e.ALLOW_ARIA_ATTR!==!1,Fe=e.ALLOW_DATA_ATTR!==!1,Ie=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Le=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=e.SAFE_FOR_TEMPLATES||!1,ze=e.SAFE_FOR_XML!==!1,Be=e.WHOLE_DOCUMENT||!1,Ge=e.RETURN_DOM||!1,Ke=e.RETURN_DOM_FRAGMENT||!1,qe=e.RETURN_TRUSTED_TYPE||!1,We=e.FORCE_BODY||!1,Je=e.SANITIZE_DOM!==!1,Ye=e.SANITIZE_NAMED_PROPS||!1,Ze=e.KEEP_CONTENT!==!1,Qe=e.IN_PLACE||!1,De=rp(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Jp,lt=typeof e.NAMESPACE==`string`?e.NAMESPACE:ct,pt=dm(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>G({},w)),T=dm(e,`HTML_INTEGRATION_POINTS`,()=>G({},mt));let t=dm(e,`CUSTOM_ELEMENT_HANDLING`,()=>up(null));if(Ae=up(null),J(t,`tagNameCheck`)&&bt(t.tagNameCheck)&&(Ae.tagNameCheck=t.tagNameCheck),J(t,`attributeNameCheck`)&&bt(t.attributeNameCheck)&&(Ae.attributeNameCheck=t.attributeNameCheck),J(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Ae.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),q(Ae),Re&&(Fe=!1),Ke&&(Ge=!0),$e&&(S=G({},Rp),C=up(null),$e.html===!0&&(G(S,Mp),G(C,zp)),$e.svg===!0&&(G(S,Np),G(C,Bp),G(C,Hp)),$e.svgFilters===!0&&(G(S,Pp),G(C,Bp),G(C,Hp)),$e.mathMl===!0&&(G(S,Ip),G(C,Vp),G(C,Hp))),Ne.tagCheck=null,Ne.attributeCheck=null,J(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Ne.tagCheck=e.ADD_TAGS:yp(e.ADD_TAGS)&&(S===Oe&&(S=ep(S)),G(S,e.ADD_TAGS,E))),J(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Ne.attributeCheck=e.ADD_ATTR:yp(e.ADD_ATTR)&&(C===ke&&(C=ep(C)),G(C,e.ADD_ATTR,E))),J(e,`ADD_FORBID_CONTENTS`)&&yp(e.ADD_FORBID_CONTENTS)&&(et===tt&&(et=ep(et)),G(et,e.ADD_FORBID_CONTENTS,E)),Ze&&(S[`#text`]=!0),Be&&G(S,[`html`,`head`,`body`]),S.table&&(G(S,[`tbody`]),delete je.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw jp(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw jp(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=b;b=e.TRUSTED_TYPES_POLICY;try{ae=ue(``)}catch(e){throw b=t,e}}else e.TRUSTED_TYPES_POLICY===null?(b=void 0,ae=``):(b===void 0&&(b=fe()),b&&typeof ae==`string`&&(ae=ue(``)));K&&K(e),vt=e},St=G({},[...Np,...Pp,...Fp]),Ct=G({},[...Ip,...Lp]),wt=function(e,t,n){return t.namespaceURI===ct?e===`svg`:t.namespaceURI===ot?e===`svg`&&(n===`annotation-xml`||pt[n]):!!St[e]},Tt=function(e,t,n){return t.namespaceURI===ct?e===`math`:t.namespaceURI===st?e===`math`&&T[n]:!!Ct[e]},Et=function(e,t,n){return t.namespaceURI===st&&!T[n]||t.namespaceURI===ot&&!pt[n]?!1:!Ct[e]&&(ht[e]||!St[e])},Dt=function(e){let t=_(e);(!t||!t.tagName)&&(t={namespaceURI:lt,tagName:`template`});let n=bp(e.tagName),r=bp(t.tagName);return dt[e.namespaceURI]?e.namespaceURI===st?wt(n,t,r):e.namespaceURI===ot?Tt(n,t,r):e.namespaceURI===ct?Et(n,t,r):!!(gt===`application/xhtml+xml`&&dt[e.namespaceURI]):!1},Ot=function(e){_p(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw jp(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},kt=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},At=function(e){O(e);let t=g(e);if(t){let e=[];mp(t,t=>{_p(e,t)}),mp(e,e=>{try{p(e)}catch{}})}let n=y(e);if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&kt(e,r,i)}},D=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}_p(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(Ge||Ke)try{Ot(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},jt=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||C[E(i)]||kt(e,r,i)}},O=function(e){let t=[e];for(;t.length>0;){let e=t.pop();re(e)===rm.element&&jt(e);let n=g(e);if(n)for(let e=n.length-1;e>=0;--e)t.push(n[e])}},Mt=function(e,t){return ze?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Nt=function(e){if(!ze)return;let t=[e];for(;t.length>0;){let e=t.pop(),n=re(e);if(n===rm.processingInstruction||n===rm.comment&&Y(em,e.data)){try{p(e)}catch{}continue}if(n===rm.element){let t=e,n=E(ie(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Mt(`for`,n)&&t.removeAttribute(`for`)}catch{}}let r=g(e);if(r)for(let e=r.length-1;e>=0;--e)t.push(r[e])}},Pt=function(e){let t=null,r=null;if(We)e=`<remove></remove>`+e;else{let t=Sp(e,/^[\r\n\t ]+/);r=t&&t[0]}gt===`application/xhtml+xml`&&lt===ct&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=b?ue(e):e;if(lt===ct)try{t=new l().parseFromString(i,gt)}catch{}if(!t||!t.documentElement){t=me.createDocument(lt,`template`,null);try{t.documentElement.innerHTML=ut?ae:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),lt===ct?_e.call(t,Be?`html`:`body`)[0]:Be?t.documentElement:a},Ft=function(e){let t=ne?ne(e):e.ownerDocument;return he.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},It=function(e){return e=Cp(e,ye,` `),e=Cp(e,be,` `),e=Cp(e,xe,` `),e},Lt=function(e){e.normalize();let t=ne?ne(e):e.ownerDocument,n=he.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=It(r.data),r=n.nextNode();let i=e.querySelectorAll?.call(e,`template`);i&&mp(i,e=>{zt(e.content)&&Lt(e.content)})},Rt=function(e){let t=te?te(e):null;return typeof t!=`string`||E(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==ee(e)||e.childNodes!==g(e)},zt=function(e){if(!ee||typeof e!=`object`||!e)return!1;try{return ee(e)===rm.documentFragment}catch{return!1}},Bt=function(e){if(!ee||typeof e!=`object`||!e)return!1;try{return typeof ee(e)==`number`}catch{return!1}};function Vt(e,n,r){e.length!==0&&mp(e,e=>{e.call(t,n,r,vt)})}let Ht=function(e,t){return!!(ze&&e.hasChildNodes()&&!Bt(e.firstElementChild)&&Y($p,e.textContent)&&Y($p,e.innerHTML)||ze&&e.namespaceURI===ct&&am[t]&&(Bt(e.firstElementChild)||typeof e.textContent==`string`&&Y(om[t],e.textContent))||e.nodeType===rm.processingInstruction||ze&&e.nodeType===rm.comment&&Y(em,e.data))},Ut=function(e,t){return e instanceof RegExp?Y(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Wt=function(e,t,n){if(!je[t]&&Yt(t)&&Ut(Ae.tagNameCheck,t))return!1;if(Ze&&!et[t]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return Ot(e),!0},Gt=function(e,t,n,r){return e.length===0?t:t===n||t===r?ep(t):t},Kt=function(e,t){return e===t||_(e)!==null?!1:(Qe&&O(e),!0)},qt=function(e,n){if(Vt(x.beforeSanitizeElements,e,null),Kt(e,n))return!0;if(Rt(e))return Ot(e),!0;let r=E(ie(e));if(S=Gt(x.uponSanitizeElement,S,Oe,He),Vt(x.uponSanitizeElement,e,{tagName:r,allowedTags:S}),Kt(e,n))return!0;if(Ht(e,r))return Ot(e),!0;if(je[r]||!(Ne.tagCheck instanceof Function&&Ne.tagCheck(r))&&!S[r]){let t=Wt(e,r,n);return t===!1&&(Vt(x.afterSanitizeElements,e,null),Kt(e,n))?!0:t}if(re(e)===rm.element&&!Dt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&Y(tm,e.innerHTML))return Ot(e),!0;if(Re&&e.nodeType===rm.text){let n=It(e.textContent);e.textContent!==n&&(_p(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Vt(x.afterSanitizeElements,e,null),Kt(e,n)},k=function(e,t,r){if(Me[t]||Mt(t,e)||Je&&(t===`id`||t===`name`)&&(r in n||r in yt))return!1;let i=C[t]||Ne.attributeCheck instanceof Function&&Ne.attributeCheck(t,e);return Fe&&Y(Se,t)||Pe&&Y(Ce,t)?!0:i?it[t]||Y(De,Cp(r,Te,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&wp(r,`data:`)===0&&nt[e]||Ie&&!Y(we,Cp(r,Te,``))?!0:!r:Yt(e)&&Ut(Ae.tagNameCheck,e)&&Ut(Ae.attributeNameCheck,t,e)||t===`is`&&Ae.allowCustomizedBuiltInElements&&Ut(Ae.tagNameCheck,r)},Jt=G({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Yt=function(e){return!Jt[bp(e)]&&Y(Ee,e)},Xt=function(e,t,n,r){if(b&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return ue(r);case`TrustedScriptURL`:return de(r)}return r},Zt=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Rt(e)||(Ot(e),!1)}catch{return D(t,e),!1}},Qt=function(e,n){if(Vt(x.beforeSanitizeAttributes,e,null),Kt(e,n))return;let r=e.attributes;if(!r||Rt(e))return;C=Gt(x.uponSanitizeAttribute,C,ke,Ue);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:C,forceKeepAttr:void 0},a=r.length,o=E(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=E(s),d=l,f=s===`value`?d:Tp(d),p=!1;if(i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Vt(x.uponSanitizeAttribute,e,i),f=i.attrValue,Ye&&(u===`id`||u===`name`)&&wp(f,Xe)!==0&&(D(s,e,n),f=Xe+f,p=!0),ze&&Y(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){D(s,e,n);continue}if(u===`attributename`&&Sp(f,`href`)){D(s,e,n);continue}if(!i.forceKeepAttr){if(!i.keepAttr){D(s,e,n);continue}if(!Le&&Y(nm,f)){D(s,e,n);continue}if(Re&&(f=It(f)),!k(o,u,f)){D(s,e,n);continue}f=Xt(o,u,c,f),f!==d&&Zt(e,s,c,f)&&p&&gp(t.removed)}}Vt(x.afterSanitizeAttributes,e,null),Kt(e,n)},$t=function(e){let t=null,n=Ft(e);for(Vt(x.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Vt(x.uponSanitizeShadowNode,t,null),qt(t,e),Qt(t,e),zt(t.content)&&$t(t.content),re(t)===rm.element){let e=v(t);zt(e)&&(en(e),$t(e))}Vt(x.afterSanitizeShadowDOM,e,null)},en=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){$t(e.shadow);continue}let n=e.node,r=re(n)===rm.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=te?te(n):null;if(typeof e==`string`&&E(e)===`template`){let e=n.content;zt(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);zt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(ut=!e,ut&&(e=`<!-->`),typeof e!=`string`&&!Bt(e)&&(e=tp(e),typeof e!=`string`))throw jp(`dirty is not a string, aborting`);if(!t.isSupported)return e;Ve?(S=He,C=Ue):xt(n),(x.uponSanitizeElement.length>0||x.uponSanitizeAttribute.length>0)&&(S=ep(S)),x.uponSanitizeAttribute.length>0&&(C=ep(C)),t.removed=[];let c=Qe&&typeof e!=`string`&&Bt(e);if(c){Nt(e);let t=ie(e);if(typeof t==`string`){let n=E(t);if(!S[n]||je[n])throw At(e),jp(`root node is forbidden and cannot be sanitized in-place`)}if(Rt(e))throw At(e),jp(`root node is clobbered and cannot be sanitized in-place`);try{en(e)}catch(t){throw At(e),t}}else if(Bt(e))i=Pt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===rm.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),en(i);else{if(!Ge&&!Re&&!Be&&e.indexOf(`<`)===-1)return b&&qe?ue(e):e;if(i=Pt(e),!i)return Ge?null:qe?ae:``}i&&We&&Ot(i.firstChild);let l=c?e:i;try{let e=Ft(l);for(;o=e.nextNode();)qt(o,l),Qt(o,l),zt(o.content)&&$t(o.content)}catch(n){throw c&&(At(e),mp(t.removed,e=>{e.element&&O(e.element)})),n}if(c){let n=!1;if(mp(t.removed,t=>{t.element&&(t.element===e&&(n=!0),O(t.element))}),n)throw jp(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Re&&Lt(e),e}if(Ge){if(Re&&Lt(i),Ke)for(s=ge.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(C.shadowroot||C.shadowrootmode)&&(s=ve.call(r,s,!0)),s}let u=Be?i.outerHTML:i.innerHTML;return Be&&S[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&Y(Zp,i.ownerDocument.doctype.name)&&(u=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+u),Re&&(u=It(u)),b&&qe?ue(u):u},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(e),Ve=!0,He=S,Ue=C},t.clearConfig=function(){vt=null,Ve=!1,He=null,Ue=null,b=oe,ae=``},t.isValidAttribute=function(e,t,n){vt||xt({});let r=E(e),i=E(t);return k(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&J(x,e)&&_p(x[e],t)},t.removeHook=function(e,t){if(J(x,e)){if(t!==void 0){let n=hp(x[e],t);return n===-1?void 0:vp(x[e],n,1)[0]}return gp(x[e])}},t.removeHooks=function(e){J(x,e)&&(x[e]=[])},t.removeAllHooks=function(){x=lm()},t}var ap,op,sp,cp,lp,K,q,up,dp,fp,pp,mp,hp,gp,_p,vp,yp,bp,xp,Sp,Cp,wp,Tp,Ep,Dp,Op,kp,J,Ap,Y,jp,Mp,Np,Pp,Fp,Ip,Lp,Rp,zp,Bp,Vp,Hp,Up,Wp,Gp,Kp,qp,Jp,Yp,Xp,Zp,Qp,$p,em,tm,nm,rm,im,am,om,sm,cm,lm,um,dm,fm,pm=o((()=>{Zf.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},Zf.prototype.next=function(e){return this._invoke(`next`,e)},Zf.prototype.throw=function(e){return this._invoke(`throw`,e)},Zf.prototype.return=function(e){return this._invoke(`return`,e)},ap=Object.entries,op=Object.setPrototypeOf,sp=Object.isFrozen,cp=Object.getPrototypeOf,lp=Object.getOwnPropertyDescriptor,K=Object.freeze,q=Object.seal,up=Object.create,dp=typeof Reflect<`u`&&Reflect,fp=dp.apply,pp=dp.construct,K||=function(e){return e},q||=function(e){return e},fp||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},pp||=function(e){return new e(...[...arguments].slice(1))},mp=W(Array.prototype.forEach),Array.prototype.indexOf,hp=W(Array.prototype.lastIndexOf),gp=W(Array.prototype.pop),_p=W(Array.prototype.push),Array.prototype.slice,vp=W(Array.prototype.splice),yp=Array.isArray,bp=W(String.prototype.toLowerCase),xp=W(String.prototype.toString),Sp=W(String.prototype.match),Cp=W(String.prototype.replace),wp=W(String.prototype.indexOf),Tp=W(String.prototype.trim),Ep=W(Number.prototype.toString),Dp=W(Boolean.prototype.toString),Op=typeof BigInt>`u`?null:W(BigInt.prototype.toString),kp=typeof Symbol>`u`?null:W(Symbol.prototype.toString),J=W(Object.prototype.hasOwnProperty),Ap=W(Object.prototype.toString),Y=W(RegExp.prototype.test),jp=Qf(TypeError),Mp=K(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Np=K(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),Pp=K([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Fp=K([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),Ip=K(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Lp=K([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Rp=K([`#text`]),zp=K(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Bp=K(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Vp=K(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Hp=K([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Up=q(/{{[\w\W]*|^[\w\W]*}}/g),Wp=q(/<%[\w\W]*|^[\w\W]*%>/g),Gp=q(/\${[\w\W]*/g),Kp=q(/^data-[\-\w.\u00B7-\uFFFF]+$/),qp=q(/^aria-[\-\w]+$/),Jp=q(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yp=q(/^(?:\w+script|data):/i),Xp=q(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zp=q(/^html$/i),Qp=q(/^[a-z][.\w]*(-[.\w]+)+$/i),$p=q(/<[/\w!]/g),em=q(/<[/\w]/g),tm=q(/<\/no(script|embed|frames)/i),nm=q(/\/>/i),rm={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},im=[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`],am=K(G({},im)),om=function(){let e={};return mp(im,t=>{e[t]=q(RegExp(`</`+t+`(?=[\\t\\n\\f\\r />])`,`i`))}),K(e)}(),sm=function(){return typeof window>`u`?null:window},cm=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},lm=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},um=function(e,t,n,r){return J(e,t)&&yp(e[t])?G(r.base?ep(r.base):{},e[t],r.transform):n},dm=function(e,t,n){let r=J(e,t)?e[t]:void 0;return r&&typeof r==`object`?ep(r):n()},fm=ip()})),mm,hm,gm,_m=o((()=>{pm(),Ad(),mm=p.StateEffect.define(),hm=class extends d.WidgetType{doc;from;to;render;referenceContext;constructor(e,t,n,r,i=``){super(),this.doc=e,this.from=t,this.to=n,this.render=r,this.referenceContext=i}get source(){return this.doc.sliceString(this.from,this.to)}toDOM(e){let t=document.createElement(`div`);t.className=`cm-md-syntaxHiddenTable`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=wd(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i);let a=document.createElement(`style`);a.textContent=`
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;let o=document.createElement(`div`);o.className=`markdown-body source`,o.textContent=this.source;let s=document.createElement(`style`);return n.append(r,a,s,o),gm.set(t,{body:o,mathStyle:s,dispose:()=>window.removeEventListener(`editor-colors-changed`,i)}),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),this.renderInto(t,e),t}updateDOM(e,t){return this.renderInto(e,t),!0}renderInto(e,t){let n=gm.get(e),r={};n.request=r;let i=()=>e.isConnected&&gm.get(e)?.request===r,a=()=>{if(i()){let n=t.posAtDOM(e);t.dispatch({effects:mm.of({doc:t.state.doc,from:n,to:n+this.source.length})})}};Promise.all([this.render(),``]).then(([e,r])=>{if(!i())return;let o=e.find(e=>e.fromLine===this.doc.lineAt(this.from).number&&e.toLine===this.doc.lineAt(this.to).number);if(o===void 0){a();return}let s=fm.sanitize(o.html,{RETURN_DOM_FRAGMENT:!0,FORBID_TAGS:[`style`,`link`,`meta`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0}).querySelector(`table`);if(s===null){a();return}s.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),s.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yd(t))}),n.mathStyle.textContent!==r&&(n.mathStyle.textContent=r),n.body.firstElementChild?.isEqualNode(s)||(n.body.classList.remove(`source`),n.body.replaceChildren(s),t.requestMeasure())}).catch(a)}destroy(e){gm.get(e)?.dispose(),gm.delete(e)}eq(e){return e.source===this.source&&e.referenceContext===this.referenceContext}ignoreEvent(){return!1}},gm=new WeakMap}));function vm(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}function ym(e,t){let n=e.pos+t;if(Qm==n&&Zm==e)return Xm;let r=e.peek(t),i=``;for(;vm(r);)i+=String.fromCharCode(r),r=e.peek(++t);return Zm=e,Qm=n,Xm=i?i.toLowerCase():r==nh||r==rh?void 0:null}function bm(e,t){this.name=e,this.parent=t}function xm(e){for(;e;e=e.parent)if(e.name==`svg`||e.name==`math`)return!0;return!1}function Sm(e,t,n){let r=2+e.length;return new g.ExternalTokenizer(i=>{for(let a=0,o=0,s=0;;s++){if(i.next<0){s&&i.acceptToken(t);break}if(a==0&&i.next==$m||a==1&&i.next==th||a>=2&&a<r&&i.next==e.charCodeAt(a-2))a++,o++;else if(a==r&&i.next==eh){s>o?i.acceptToken(t,-o):i.acceptToken(n,-(o-2));break}else if((i.next==10||i.next==13)&&s){i.acceptToken(t,1);break}else a=o=0;i.advance()}})}var Cm,wm,Tm,Em,Dm,Om,km,Am,jm,Mm,Nm,Pm,Fm,Im,Lm,Rm,zm,Bm,Vm,Hm,Um,Wm,Gm,Km,qm,Jm,Ym,Xm,Zm,Qm,$m,eh,th,nh,rh,ih,ah,oh,sh,ch,lh,uh,dh,fh,ph,mh,hh=o((()=>{Cm=55,wm=1,Tm=56,Em=2,Dm=57,Om=3,km=4,Am=5,jm=6,Mm=7,Nm=8,Pm=9,Fm=10,Im=11,Lm=12,Rm=13,zm=58,Bm=14,Vm=15,Hm=59,Um=21,Wm=37,Gm=0,Km=1,qm={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},Jm={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},Ym={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},Xm=null,Zm=null,Qm=0,$m=60,eh=62,th=47,nh=63,rh=33,ih=45,ah=[jm,Fm,Mm,Nm,Pm],oh=new g.ContextTracker({start:null,shift(e,t,n,r){return ah.indexOf(t)>-1?new bm(ym(r,1)||``,e):e},reduce(e,t){return t==Um&&e?e.parent:e},reuse(e,t,n,r){let i=t.type.id;return i==jm||i==Wm?new bm(ym(r,1)||``,e):e},strict:!1}),sh=new g.ExternalTokenizer((e,t)=>{if(e.next!=$m){e.next<0&&t.context&&e.acceptToken(zm);return}e.advance();let n=e.next==th;n&&e.advance();let r=ym(e,0);if(r===void 0)return;if(!r)return e.acceptToken(n?Vm:Bm);let i=t.context?t.context.name:null;if(n){if(r==i)return e.acceptToken(Im);if(i&&Jm[i])return e.acceptToken(zm,-2);if(t.dialectEnabled(Gm))return e.acceptToken(Lm);for(let e=t.context;e;e=e.parent)if(e.name==r)return;e.acceptToken(Rm)}else{if(r==`script`)return e.acceptToken(Mm);if(r==`style`)return e.acceptToken(Nm);if(r==`textarea`)return e.acceptToken(Pm);if(qm.hasOwnProperty(r))return e.acceptToken(Fm);i&&Ym[i]&&Ym[i][r]?e.acceptToken(zm,-1):e.acceptToken(jm)}},{contextual:!0}),ch=new g.ExternalTokenizer(e=>{for(let t=0,n=0;;n++){if(e.next<0){n&&e.acceptToken(Hm);break}if(e.next==ih)t++;else if(e.next==eh&&t>=2){n>=3&&e.acceptToken(Hm,-2);break}else t=0;e.advance()}}),lh=new g.ExternalTokenizer((e,t)=>{if(e.next==th&&e.peek(1)==eh){let n=t.dialectEnabled(Km)||xm(t.context);e.acceptToken(n?Am:km,2)}else e.next==eh&&e.acceptToken(km,1)}),uh=Sm(`script`,Cm,wm),dh=Sm(`style`,Tm,Em),fh=Sm(`textarea`,Dm,Om),ph=(0,h.styleTags)({"Text RawText IncompleteTag IncompleteCloseTag":h.tags.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":h.tags.angleBracket,TagName:h.tags.tagName,"MismatchedCloseTag/TagName":[h.tags.tagName,h.tags.invalid],AttributeName:h.tags.attributeName,"AttributeValue UnquotedAttributeValue":h.tags.attributeValue,Is:h.tags.definitionOperator,"EntityReference CharacterReference":h.tags.character,Comment:h.tags.blockComment,ProcessingInst:h.tags.processingInstruction,DoctypeDecl:h.tags.documentMeta}),mh=g.LRParser.deserialize({version:14,states:",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",stateData:`,c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~`,goto:"%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:`⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl`,maxTerm:68,context:oh,nodeProps:[[`closedBy`,-10,1,2,3,7,8,9,10,11,12,13,`EndTag`,6,`EndTag SelfClosingEndTag`,-4,22,31,34,37,`CloseTag`],[`openedBy`,4,`StartTag StartCloseTag`,5,`StartTag`,-4,30,33,36,38,`OpenTag`],[`group`,-10,14,15,18,19,20,21,40,41,42,43,`Entity`,17,`Entity TextContent`,-3,29,32,35,`TextContent Entity`],[`isolate`,-11,22,30,31,33,34,36,37,38,39,42,43,`ltr`,-3,27,28,40,``]],propSources:[ph],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[uh,dh,fh,lh,sh,ch,0,1,2,3,4,5],topRules:{Document:[0,16]},dialects:{noMatch:0,selfClosing:515},tokenPrec:517})}));function gh(e,t){let n=e.doc.toString(),r=[],i=[];if((0,m.syntaxTree)(e).iterate({enter:n=>{if([`FencedCode`,`CodeBlock`,`InlineCode`,`Frontmatter`,`CommentBlock`,`BlockMath`].includes(n.name)||t&&n.name===`Table`)return!1;if(n.name===`HTMLBlock`||n.name===`HTMLTag`){let t=e.doc.length;for(let e=n.node.parent;e!==null;e=e.parent)(e.name===`ListItem`||e.name===`Blockquote`)&&(t=Math.min(t,e.to));if(r.push({from:n.from,to:n.to,limit:t}),n.name===`HTMLTag`)return!1}else n.name===`QuoteMark`&&i.push({from:n.from,to:n.to})}}),r.length===0)return[];let a=0,o=n.replace(/</g,(e,t)=>{for(;a<r.length&&r[a].to<=t;)a++;let n=r[a];return n!==void 0&&n.from<=t?e:` `}),s=[];return a=0,mh.parse(o).iterate({enter:e=>{if(e.name!==`Element`)return;let{from:t,to:o}=e;for(;a<r.length&&r[a].to<=t;)a++;let c=r[a],l=n.slice(t,o);for(let e=i.length-1;e>=0;e--){let n=i[e];n.from>=t&&n.to<=o&&(l=l.slice(0,n.from-t)+l.slice(n.to-t))}if(c!==void 0&&c.from<=t&&o<=c.limit&&_h(l))return s.push({from:t,to:o,source:l}),!1}}),s}function _h(e){let t=mh.parse(e),n=!0,r=0;return t.iterate({enter:t=>{if((t.type.isError||t.name===`MismatchedCloseTag`)&&(n=!1),t.name===`Element`){r++;let e=t.node.firstChild,i=t.node.lastChild;e?.name!==`SelfClosingTag`&&i?.name!==`CloseTag`&&(n=!1)}else t.node.parent?.name===`Document`&&(t.name!==`Text`||e.slice(t.from,t.to).trim()!==``)&&(n=!1)}}),n&&r>0}var vh,yh,bh,xh=o((()=>{hh(),Ad(),af(),pm(),vh=class e extends d.WidgetType{source;fragment;block;constructor(e,t){super(),this.source=e,this.fragment=t,this.block=t.querySelector(`address, article, aside, blockquote, dd, details, dialog, div, dl, dt, fieldset, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, ul`)!==null}static create(t){if(!_h(t))return;let n=fm.sanitize(t,{RETURN_DOM_FRAGMENT:!0,USE_PROFILES:{html:!0},FORBID_TAGS:[`script`,`style`,`link`,`meta`,`base`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0});if(n.childElementCount===0)return;let r=document.createElement(`span`).style;return n.querySelectorAll(`[style]`).forEach(e=>{r.cssText=e.getAttribute(`style`)??``,e.removeAttribute(`style`);for(let t of bh){let n=r.getPropertyValue(t);n!==``&&e.style.setProperty(t,n)}}),n.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),n.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Yd(t))}),new e(t,n)}toDOM(e){let t=document.createElement(this.block?`div`:`span`);t.className=`cm-md-syntaxHiddenHtml`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=wd(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i),yh.set(t,()=>window.removeEventListener(`editor-colors-changed`,i));let a=document.createElement(`style`);a.textContent=this.block?`:host { display: block; } .markdown-body { font: inherit; white-space: normal; overflow-wrap: anywhere; overflow: auto; }`:`:host { display: inline; } .markdown-body { display: inline; font: inherit; white-space: normal; overflow-wrap: anywhere; } .markdown-body::before, .markdown-body::after { content: none; }`;let o=document.createElement(this.block?`div`:`span`);return o.className=`markdown-body`,o.inert=!0,o.append(this.fragment.cloneNode(!0)),n.append(r,a,o),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),t}updateDOM(e,t){return e.tagName===`DIV`===this.block&&(e.shadowRoot.querySelector(`.markdown-body`).replaceChildren(this.fragment.cloneNode(!0)),t.requestMeasure(),!0)}eq(e){return this.source===e.source}destroy(e){yh.get(e)?.(),yh.delete(e)}ignoreEvent(){return!1}},yh=new WeakMap,bh=[`text-align`,`color`,`background-color`,`font-family`,`font-weight`,`font-style`,`text-decoration-line`,`text-decoration-color`,`text-decoration-style`]})),Sh,Ch=o((()=>{Pu(),Sh=p.Facet.define({combine:e=>e[e.length-1]??Eu})}));function wh(e,t=d.Decoration.none){let n=Th(e,t);return{all:n,visible:Eh(n,e)}}function Th(e,t){let n=[],r=(0,m.syntaxTree)(e),i=e.facet(Sh),a=[];r.iterate({enter:t=>{if(t.name===`Document`)return;let n=e.sliceDoc(e.doc.lineAt(t.from).from,e.doc.lineAt(t.to).to);return(t.name!==`Paragraph`&&t.name!==`Table`||n.includes(`[`))&&a.push(n),!1}});let o=e.sliceDoc(r.length);a.push(o);let s,c=()=>s??=Rd(e.doc.toString()),l=JSON.stringify(a);if(i.includes(`html`))for(let{from:a,to:o,source:s}of gh(e,i.includes(`table`))){if(r.length<e.doc.length&&o>=r.length)continue;let i;t.between(a,o,(e,t,n)=>{let r=n.spec.widget;e===a&&t===o&&r instanceof vh&&r.source===s&&(i=r)}),i??=vh.create(s),i!==void 0&&n.push(d.Decoration.replace({block:i.block,widget:i}).range(a,o))}let u=n.slice(),f=0;return r.iterate({enter:a=>{for(;f<u.length&&u[f].to<=a.from;)f++;let o=u[f];if(a.name!==`Document`&&o!==void 0&&o.from<=a.from&&o.to>=a.to)return!1;let s;if(a.name===`Table`&&i.includes(`table`)){for(let e=a.node.parent;e!==null;e=e.parent)if(e.name!==`Document`)return!1;if(r.length<e.doc.length&&a.to>=r.length)return!1;let n=e.doc.lineAt(a.from).from,i=e.doc.lineAt(a.to).to,o=new hm(e.doc,n,i,c,l);t.between(n,i,(e,t,r)=>{let a=r.spec.widget;e===n&&t===i&&a instanceof hm&&o.eq(a)&&(o=a)}),s=d.Decoration.replace({block:!0,widget:o}).range(n,i)}if(s!==void 0)return n.push(s),!1}}),d.Decoration.set(n,!0)}function Eh(e,t){return e.size===0?e:e.update({filter:(e,n,r)=>{let i=r.spec.widget instanceof hm,a=!1;if((i||r.spec.widget instanceof vh)&&(0,m.foldedRanges)(t).between(e,n,()=>{a=!0}),a||X(t,e,n))return!1;if(i&&n<t.doc.length){let e=t.doc.lineAt(n+1);if(e.text.trim()===``&&t.selection.ranges.some(t=>t.empty&&t.goalColumn===void 0&&t.head>=e.from&&t.head<=e.to))return!1}return!0}})}var Dh,Oh=o((()=>{Hf(),Uf(),_m(),xh(),Ch(),Jh(),qd(),Dh=p.StateField.define({create:e=>wh(e),update(e,t){if(t.docChanged||t.reconfigured||(0,m.syntaxTree)(t.startState)!==(0,m.syntaxTree)(t.state)){let n=[];for(let r=e.all.iter();r.value!==null;r.next())if(r.value.spec.widget instanceof hm||r.value.spec.widget instanceof vh){let e=t.changes.mapPos(r.from,1),i=t.changes.mapPos(r.to,-1);e<i&&n.push(r.value.range(e,i))}return wh(t.state,d.Decoration.set(n,!0))}let n=e.all;for(let e of t.effects)e.is(mm)&&e.value.doc===t.state.doc&&(n=n.update({filter:(t,n)=>t!==e.value.from||n!==e.value.to}));return t.selection!==void 0||t.effects.length>0?{all:n,visible:Eh(n,t.state)}:e},provide:e=>d.EditorView.decorations.from(e,e=>e.visible)})}));function X(e,t,n){return e.selection.ranges.some(e=>e.from<=n&&e.to>=t)}function kh(e,t,n){return X(e,t,n)||e.field(Bh,!1)?.some(e=>e.from<=t&&e.to>=n)===!0}function Ah(e,t){if(e.textDirectionAt(t)!==d.Direction.LTR)return;let n=Tf(e.state),r;for(let i=(0,m.syntaxTree)(e.state).resolveInner(t,-1);i!==null;i=i.parent){if(i.name===`Image`)return;if(kh(e.state,i.from,i.to))continue;let a=Ph(i,e.state,n);if(a!==void 0&&Nh(e,i))return;let o=a?.hidden.find(e=>e.to===i.to),s=r?.to??t;o!==void 0&&s>=o.from&&s<i.to&&(r={from:r?.from??o.from,to:i.to})}return r}function jh(e){return t=>{let n=t.state,r=n.selection,i=n.field(Bh,!1);if(i===void 0||r.ranges.length!==1)return!1;let a=n.doc.lineAt(r.main.head),o=t.lineBlockAt(r.main.head);if(r.main.from<a.from||r.main.to>a.to||o.from!==a.from||o.to!==a.to||t.textDirectionAt(r.main.head)!==d.Direction.LTR)return!1;let s=()=>t.state.doc===n.doc&&t.state.selection.eq(r,!0)&&t.state.field(Bh,!1)!==void 0,c=Fh(t,r,e);if(!s())return!0;if(i.length===0){if(!Mh(t,a,c.main))return!1;if(i=[{from:a.from,to:a.to}],t.dispatch({effects:zh.of(i)}),!s())return!0;if(t.state.field(Bh)!==i)return!1;if(t.coordsAtPos(r.main.head),!s())return!0;c=Fh(t,r,e)}return!s()||!c.eq(r,!0)&&(t.dispatch({selection:c,effects:zh.of(i),scrollIntoView:!0,userEvent:`select`}),!0)}}function Mh(e,t,n){let r=!1,i=Tf(e.state);return(0,m.syntaxTree)(e.state).iterate({from:t.from,to:t.to,enter:a=>{if(r||a.name===`Image`)return!1;a.from>=t.from&&a.to<=t.to&&Ph(a,e.state,i)!==void 0&&!Nh(e,a)&&(r=(n.from<=a.to&&n.to>=a.from)!==X(e.state,a.from,a.to))}}),r}function Nh(e,t){let n=!1;return e.state.field(Dh,!1)?.visible.between(t.from,t.to,(e,r)=>{n||=e<=t.from&&r>=t.to}),n}function Ph(e,t,n){return e.name===`Link`||e.name===`Autolink`?xf(e,t,n):Pf(e)}function Fh(e,t,n){return p.EditorSelection.create(t.ranges.map(t=>{let r=n&&t.undirectional&&t.head<t.anchor?p.EditorSelection.range(t.head,t.anchor):t,i=e.moveToLineBoundary(r,!0);return i.head===r.head&&i.head!==e.lineBlockAt(r.head).to&&(i=e.moveToLineBoundary(r,!0,!1)),n?p.EditorSelection.range(r.anchor,i.head,i.goalColumn,i.bidiLevel??void 0,i.assoc):i}),t.mainIndex)}function Ih(e){return t=>{let n=p.EditorSelection.create(t.state.selection.ranges.map(n=>{let r=n;e&&r.undirectional&&r.head>=r.anchor&&(r=p.EditorSelection.range(r.head,r.anchor));let i=e||r.empty?Lh(t,r):p.EditorSelection.cursor(r.from);return!e&&r.empty&&i.head===r.head&&(i=t.moveToLineBoundary(r,!1)),e?p.EditorSelection.range(r.anchor,i.head,i.goalColumn,i.bidiLevel??void 0,i.assoc):i}),t.state.selection.mainIndex);return!n.eq(t.state.selection,!0)&&(t.dispatch({selection:n,scrollIntoView:!0,userEvent:`select`}),!0)}}function Lh(e,t){let n=e.moveVertically(t,!1),r=e.state.doc.lineAt(t.head),i=e.state.doc.lineAt(n.head);if(r.number-i.number<=1)return n;let a=e.state.doc.line(r.number-1);if(!Rh(e,a.from))return n;let o=e.lineBlockAt(a.from),s=n.goalColumn,c=e.coordsAtPos(t.head,t.assoc||1),l=s===void 0?c?.left:e.contentDOM.getBoundingClientRect().left+s;if(l===void 0)return n;let u=e.posAndSideAtCoords({x:l,y:e.documentTop+o.top+o.height/2});return u===null||u.pos<a.from||u.pos>a.to?n:p.EditorSelection.cursor(u.pos,u.assoc,void 0,s)}function Rh(e,t){for(let n=(0,m.syntaxTree)(e.state).resolve(t,1);n!==null;n=n.parent)if(n.name.startsWith(`ATXHeading`))return!0;return!1}var zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh=o((()=>{Mf(),Vf(),Oh(),zh=p.StateEffect.define(),Bh=p.StateField.define({create:()=>[],update(e,t){if(t.docChanged)return[];for(let e of t.effects)if(e.is(zh))return e.value;return t.newSelection.eq(t.startState.selection,!0)?e:[]}}),Vh=Ih(!1),Hh=Ih(!0),Uh=jh(!1),Wh=jh(!0),Gh=p.Prec.high(d.keymap.of([{mac:`Cmd-ArrowRight`,run:Uh,shift:Wh}])),Kh=p.Prec.high(d.keymap.of([{key:`ArrowUp`,run:Vh,shift:Hh}])),qh=d.EditorView.mouseSelectionStyle.of((e,t)=>{if(t.button!==0||t.detail!==1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)return null;let n={x:t.clientX,y:t.clientY},r=e.posAndSideAtCoords(n,!1);if(Number.isFinite(r.pos)){let t=Ah(e,r.pos),i=t===void 0?null:e.coordsAtPos(t.from,-1);t!==void 0&&i!==null&&n.x>i.right&&n.y>=i.top&&n.y<=i.bottom&&(r={pos:t.to,assoc:-1})}return{get(t){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(t.clientX-n.x),Math.abs(t.clientY-n.y))<=5)return p.EditorSelection.create([p.EditorSelection.cursor(r.pos,r.assoc)]);let i=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1);return Number.isFinite(i.pos)?i.pos===r.pos?p.EditorSelection.create([p.EditorSelection.cursor(i.pos,i.assoc)]):p.EditorSelection.create([p.EditorSelection.range(r.pos,i.pos,void 0,void 0,i.assoc)]):e.state.selection},update(e){e.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:e.changes.mapPos(r.pos)})}}})}));function Yh(e,t){if(e.name!==`Blockquote`)return;let n=e.node.getChild(`Paragraph`);if(n===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==n.from||r.to!==n.to);){if(r.name!==`QuoteMark`)return;r=r.nextSibling}if(r===null)return;let i=t.doc.lineAt(n.from),a=t.sliceDoc(n.from,i.to),o=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(a);if(o===null)return;let s=o[1].toLowerCase(),c=n.from,l=c+o[0].length;if(!X(t,c,l))return{from:c,to:l,type:s,title:Qh[s]}}function Xh(e,t){if(e.name===`QuoteMark`&&!X(t,e.from,e.to))return{from:e.from,to:e.to}}function Zh(e){if(e.name!==`Blockquote`)return;let t=1,n=e.node.parent;for(;n!==null;)n.name===`Blockquote`&&(t+=1),n=n.parent;return{from:e.from,to:e.to,depth:t}}var Qh,$h=o((()=>{Jh(),Qh={note:`Note`,tip:`Tip`,important:`Important`,warning:`Warning`,caution:`Caution`}})),eg,tg,ng=o((()=>{eg={note:`<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},tg=class extends d.WidgetType{type;title;constructor(e,t){super(),this.type=e,this.title=t}eq(e){return e.type===this.type&&e.title===this.title}toDOM(){let e=document.createElement(`span`);e.className=`cm-md-syntaxHiddenAlert`,e.dataset.type=this.type;let t=e.appendChild(document.createElement(`span`));t.className=`cm-md-syntaxHiddenAlertIcon`,t.innerHTML=eg[this.type],t.setAttribute(`aria-hidden`,`true`);let n=e.appendChild(document.createElement(`span`));return n.textContent=this.title,e}ignoreEvent(){return!1}}}));function rg(e){let t=new Map,n=new Map;for(let{from:r,to:i}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:r,to:i,enter:r=>{let i=Zh(r);if(i!==void 0&&t.set(ug(i),i),r.name!==`QuoteMark`)return;let a=lg(r.node);if(a===null)return;let o=ug(a),s=e.state.doc.lineAt(r.from).from,c=n.get(o)??new Map;c.set(s,{position:r.from,active:X(e.state,r.from,r.to)}),n.set(o,c)}});let r=[];return t.forEach((t,i)=>{let a=n.get(i),o=new Set;e.viewportLineBlocks.forEach(n=>{let i=e.state.doc.lineAt(n.from);if(o.has(i.from)||i.to<t.from||i.from>=t.to)return;o.add(i.from);let s=a?.get(i.from);s?.active!==!0&&r.push({line:i.from,ownerFrom:t.from,anchor:s?.position,depth:t.depth})})}),r}function ig(e){let t=cg(e),n=new Map;return rg(e).flatMap(r=>{let i=sg(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(i===void 0||a===null)return[];let o=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(o===void 0){let t=n.get(r.ownerFrom);t===void 0&&(t=og(e,r.ownerFrom),n.set(r.ownerFrom,t)),o=a.left+t}let s=ag(e,r.anchor??r.ownerFrom);return[new fg(r.depth,o-t.left,i.top-t.top,3,i.height,s.color,s.opacity)]})}function ag(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(i*=e)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:i}}function og(e,t){let n=e.state.doc.lineAt(t),r=e.coordsAtPos(n.from,1),i=e.coordsAtPos(t,1);if(r!==null&&i!==null)return i.left-r.left;let a=0;for(let r of e.state.sliceDoc(n.from,t))a=r===`	`?a+e.state.tabSize-a%e.state.tabSize:a+1;return a*e.defaultCharacterWidth}function sg(e,t){let n=e.domAtPos(t).node;return(n instanceof HTMLElement?n:n.parentElement)?.closest(`.cm-line`)}function cg(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function lg(e){let t=e.parent;for(;t!==null&&t.name!==`Blockquote`;)t=t.parent;return t}function ug(e){return`${e.from}:${e.to}`}var dg,fg,pg=o((()=>{$h(),Jh(),dg=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenBlockquoteLayer`,markers:ig,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),fg=class extends d.RectangleMarker{color;opacity;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${e}`,t,n,r,i),this.color=a,this.opacity=o}draw(){let e=super.draw();return e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,e}update(e,t){return super.update(e,t)?(e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity}}}));function mg(e,t){if(e.name!==`ListMark`)return;let n=e.node.parent,r=n?.getChild(`Task`),i=r?.getChild(`TaskMarker`);if(n?.name===`ListItem`&&n.parent?.name===`BulletList`&&/^[ \t]$/.test(t.sliceDoc(e.to,e.to+1))&&!X(t,e.from,i?.to??e.to))return{from:e.from,to:e.to,task:r!==null}}var hg=o((()=>{Jh()}));function gg(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{let r=mg(n,e.state);r!==void 0&&!r.task&&t.push({from:r.from,to:r.to})}});return t}function _g(e){let t=yg(e);return gg(e).flatMap(n=>{let r=e.coordsForChar(n.from);if(r===null)return[];let i=vg(e,n.from);return[new xg(r.left-t.left,r.top-t.top,r.right-r.left,r.bottom-r.top,i.color,i.opacity,i.textShadow)]})}function vg(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=getComputedStyle(r??e.contentDOM),a=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(a*=e)}return{color:i.color,opacity:a,textShadow:i.textShadow===`none`?``:i.textShadow}}function yg(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}var bg,xg,Sg=o((()=>{hg(),bg=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenListBulletLayer`,markers:_g,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),xg=class extends d.RectangleMarker{color;opacity;textShadow;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenListBullet`,e,t,n,r),this.color=i,this.opacity=a,this.textShadow=o}draw(){let e=super.draw();return e.textContent=`•`,e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,e}update(e,t){return super.update(e,t)?(e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity&&this.textShadow===e.textShadow}}}));function Cg(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{if(n.name!==`TaskMarker`)return;let r=n.node.parent,i=r?.parent,a=i?.getChild(`ListMark`),o=n.to+1;r?.name===`Task`&&i?.name===`ListItem`&&i.parent?.name===`BulletList`&&a!=null&&e.state.sliceDoc(n.to,o)===` `&&!X(e.state,a.from,n.to)&&t.push({from:a.from,to:o,markerFrom:n.from,listPrefix:e.state.sliceDoc(a.from,a.to+1),checked:e.state.sliceDoc(n.from,n.to)!==`[ ]`,label:e.state.sliceDoc(o,e.state.doc.lineAt(n.to).to).trim()||`Task`})}});return t}function wg(e){let t=e.state.readOnly||!e.state.facet(d.EditorView.editable),n=Cg(e).map(e=>d.Decoration.replace({widget:new kg(e.markerFrom,e.listPrefix,e.checked,e.label,t)}).range(e.from,e.to));return d.Decoration.set(n,!0)}function Tg(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);if(t===null||t.offsetWidth===0)return;let n=parseFloat(getComputedStyle(e).fontSize);t.style.setProperty(`--cm-md-task-checkbox-scale`,`${n/t.offsetWidth}`)}function Eg(e,t,n){let r=e.state.sliceDoc(t,t+3);if(e.state.readOnly||!e.state.facet(d.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;let i=e.state.changes({from:t+1,to:t+2,insert:n?`x`:` `});e.dispatch({changes:i,effects:e.scrollSnapshot().map(i)??[],userEvent:`input`})}var Dg,Og,kg,Ag=o((()=>{Jh(),Dg=typeof ResizeObserver>`u`?void 0:new ResizeObserver(e=>{for(let t of e)Tg(t.target)}),Og=[d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=wg(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(e=>e.reconfigured))&&(this.decorations=wg(e.view))}},{decorations:e=>e.decorations}),d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:`inline-block`,position:`relative`,height:`1lh`,margin:`0`,textIndent:`0`,verticalAlign:`top`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:`absolute`,insetBlockStart:`0`,insetInlineStart:`-0.15em`,display:`grid`,placeItems:`center`,width:`1em`,height:`1lh`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:`0`,transform:`translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))`}})],kg=class extends d.WidgetType{markerFrom;listPrefix;checked;label;disabled;constructor(e,t,n,r,i){super(),this.markerFrom=e,this.listPrefix=t,this.checked=n,this.label=r,this.disabled=i}eq(e){return this.markerFrom===e.markerFrom&&this.listPrefix===e.listPrefix&&this.checked===e.checked&&this.label===e.label&&this.disabled===e.disabled}toDOM(e){let t=document.createElement(`span`);t.className=`cm-md-syntaxHiddenTaskCheckboxFrame`;let n=t.appendChild(document.createElement(`span`));n.className=`cm-md-syntaxHiddenTaskCheckboxMarker`,n.textContent=this.listPrefix;let r=t.appendChild(document.createElement(`span`));r.className=`cm-md-syntaxHiddenTaskCheckboxControl`;let i=r.appendChild(document.createElement(`input`));return i.className=`cm-md-syntaxHiddenTaskCheckbox`,i.type=`checkbox`,this.updateInput(i),i.addEventListener(`change`,()=>Eg(e,Number(i.dataset.markerFrom),i.checked)),Dg?.observe(t),t}updateDOM(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);return t!==null&&(this.updateInput(t),!0)}destroy(e){Dg?.unobserve(e)}ignoreEvent(){return!0}updateInput(e){e.checked=this.checked,e.disabled=this.disabled,e.dataset.markerFrom=`${this.markerFrom}`,e.setAttribute(`aria-label`,this.label)}}}));function jg(e){let t=e.trim().toLowerCase();return Fg.test(t)&&!Ig.test(t)?!1:(window.open(e,`_blank`,`noopener`),!0)}async function Mg(e,t,n=`definition`){let r=e.state,i=(0,m.ensureSyntaxTree)(r,r.doc.length,5e3);if(i===null)return!1;let a;return i.iterate({enter:e=>{if(a!==void 0)return!1;if(n===`reference`){let n=Sf(e,r).find(e=>e.label===t);n!==void 0&&(a=p.EditorSelection.range(n.from,n.to))}else e.name===`LinkDefinition`&&r.sliceDoc(e.from,e.to)===`[${t}]`&&(a=p.EditorSelection.range(e.from,e.to))}}),a===void 0?(_(),!1):(Pg(e,a),!0)}async function Ng(e,t){let n=e.state.doc,r=await zd(n.toString(),t);if(r===void 0||e.state.doc!==n)return!1;let i=e.state.doc.line(r+1).from;return Pg(e,p.EditorSelection.cursor(i)),!0}function Pg(e,t){let n=e.state.doc,r=e.scrollDOM.scrollTop,i=n=>e.dispatch({effects:d.EditorView.scrollIntoView(t.from,{y:n,yMargin:5})});e.dispatch({selection:t}),i(`start`),setTimeout(()=>{e.state.doc===n&&Math.abs(e.scrollDOM.scrollTop-r)<.001&&i(`center`)},50)}var Fg,Ig,Lg=o((()=>{Mf(),qd(),fe(),Fg=/^(?:vbscript|javascript|file|data):/,Ig=/^data:image\/(?:gif|png|jpeg|webp);/})),Rg,zg,Bg=o((()=>{Lg(),fe(),Pd(),Rg={link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>`,footnoteBack:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>`},zg=class extends d.WidgetType{kind;destination;label;highlightClasses;constructor(e,t,n,r,i){super(),this.kind=e,this.destination=n,this.label=r,this.highlightClasses=(0,m.highlightingFor)(t,i)??``}toDOM(e){let t=document.createElement(`button`);return t.type=`button`,t.className=[`cm-md-syntaxHiddenLinkButton`,this.highlightClasses].filter(Boolean).join(` `),t.dataset.kind=this.kind,t.title=this.kind===`footnote`||this.kind===`footnoteBack`?H(this.kind===`footnote`?`goToFootnoteDefinition`:`backToFootnoteReference`).replace(`%s`,()=>this.destination.slice(1)):this.destination,t.innerHTML=Rg[this.kind===`footnote`?`link`:this.kind],t.setAttribute(`aria-label`,t.title||this.label),t.addEventListener(`click`,t=>{t.stopPropagation(),this.kind===`footnote`?Mg(e,this.destination):this.kind===`footnoteBack`?Mg(e,this.destination,`reference`):this.destination.startsWith(`#`)?Ng(e,this.destination):this.destination===``?_():jg(this.destination)}),t}eq(e){return e.kind===this.kind&&e.highlightClasses===this.highlightClasses&&e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!0}}})),Vg,Hg=o((()=>{Vg=class extends d.WidgetType{text;constructor(e){super(),this.text=e}eq(e){return e.text===this.text}toDOM(){let e=document.createElement(`span`);return e.textContent=this.text,e}ignoreEvent(){return!1}}})),Ug,Wg=o((()=>{af(),Ug=class extends d.WidgetType{destination;label;constructor(e,t){super(),this.destination=e,this.label=t}toDOM(){let e=document.createElement(`img`);return e.className=`cm-md-syntaxHiddenImage`,e.src=Yd(this.destination),e.alt=this.label,e.title=this.destination,e.draggable=!1,e}eq(e){return e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!1}}}));function Gg(e,t){let n=[];if(e.name!==`FencedCode`)return n;let r=t.state,i=e.node.firstChild,a=e.node.lastChild;if(i?.name!==`CodeMark`||a?.name!==`CodeMark`||i.from===a.from||!r.sliceDoc(i.from,i.to).startsWith("```"))return n;let o=r.doc.lineAt(i.from),s=r.doc.lineAt(a.from);e.node.getChild(`CodeInfo`);let c=!1;if((0,m.foldedRanges)(r).between(o.to,s.to,(e,t)=>{if(e>=o.to&&t>=s.to)return c=!0,!1}),c)return n;for(let{from:e,to:i}of t.visibleRanges){let t=Math.max(o.number,r.doc.lineAt(e).number),a=Math.min(s.number,r.doc.lineAt(i).number);for(let e=t;e<=a;e++){let t=r.doc.line(e),i=[`cm-md-syntaxHiddenCodeBlock`];e===o.number&&i.push(`cm-md-syntaxHiddenCodeStart`),e===s.number&&i.push(`cm-md-syntaxHiddenCodeEnd`),o.number,n.push(d.Decoration.line({class:i.join(` `),attributes:void 0}).range(t.from))}}return n}var Kg=o((()=>{Jh(),d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence`})}));function qg(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`ATXHeading`)!==!0||n.firstChild?.from!==e.from)return;let r=Yg(t,e.to,n.to);if(Xg(t,r,n.to)&&!X(t,n.from,n.to))return{from:e.from,to:r}}function Jg(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`SetextHeading`)!==!0)return;let r=t.doc.lineAt(e.from);if(!X(t,n.from,n.to))return r.from}function Yg(e,t,n){return t+(/^ */.exec(e.sliceDoc(t,n))?.[0].length??0)}function Xg(e,t,n){return/\S/.test(e.sliceDoc(t,n))}var Zg=o((()=>{Jh()}));function Qg(e,t){if(e.name!==`HorizontalRule`||e.node.parent?.name!==`Document`)return;let n=t.doc.lineAt(e.from);if(!X(t,n.from,n.to))return d.Decoration.replace({widget:new $g((0,m.highlightingFor)(t,[h.tags.contentSeparator])??``)}).range(n.from,n.to)}var $g,e_=o((()=>{Jh(),$g=class extends d.WidgetType{highlightClass;constructor(e){super(),this.highlightClass=e}eq(e){return e.highlightClass===this.highlightClass}toDOM(){let e=document.createElement(`span`);return e.className=[`cm-md-syntaxHiddenHorizontalRule`,this.highlightClass].filter(Boolean).join(` `),e.setAttribute(`role`,`separator`),e.setAttribute(`aria-orientation`,`horizontal`),e}}})),t_,n_=o((()=>{t_=d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTable":{boxSizing:`border-box`,width:`100%`,padding:`0.5em 6px`,overflow:`hidden`,contain:`content`,cursor:`text`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeBlock":{"--code-border":`color-mix(in srgb, currentColor 18%, transparent)`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border)`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart":{position:`relative`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 1px var(--code-border)`,borderTopLeftRadius:`6px`,borderTopRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart[data-code-language]::after":{content:`attr(data-code-language)`,position:`absolute`,top:`0.5em`,right:`0.5em`,maxWidth:`calc(100% - 1em)`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,fontSize:`0.8em`,lineHeight:`1`,opacity:`0.55`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeEnd":{boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 -1px var(--code-border)`,borderBottomLeftRadius:`6px`,borderBottomRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:`0px !important`,fontVariantLigatures:`none !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:`inherit !important`,lineHeight:`inherit !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`Menlo, monospace`,fontSize:`0.9em`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:`0 !important`},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:`0`,lineHeight:`0`,overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:`3px`,borderBottomLeftRadius:`3px`,paddingInlineStart:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:`3px`,borderBottomRightRadius:`3px`,paddingInlineEnd:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:`inline-flex`,alignItems:`center`,boxSizing:`border-box`,height:`1em`,lineHeight:`1em`,verticalAlign:`middle`,gap:`0.4em`,fontFamily:`system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,fontStyle:`normal`,fontWeight:`500`,textIndent:`0`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#0969da`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#1a7f37`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#8250df`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#9a6700`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#d1242f`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#2f81f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#3fb950`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#a371f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#d29922`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#f85149`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:`inline-block`,width:`1em`,height:`1em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:`block`,width:`100%`,height:`100%`,fill:`currentColor`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:`inline-block`,appearance:`none`,width:`0.9em`,height:`0.9em`,padding:`0`,border:`0`,background:`transparent`,font:`inherit`,marginInlineStart:`0.25em`,verticalAlign:`-0.1em`,cursor:`pointer`},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:`inherit`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:`block`,width:`100%`,height:`100%`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:`inline-block`,width:`100%`,borderTop:`2px solid currentColor`,verticalAlign:`middle`,opacity:`0.35`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:`inline-block`,maxWidth:`100%`,height:`auto`,verticalAlign:`middle`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:`0`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:`block`,maxWidth:`100%`,height:`auto`,marginInline:`auto`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:`pre-wrap`,textAlign:`start`}})})),r_=c({createHiddenSyntaxExtension:()=>i_,hiddenSyntaxExtension:()=>m_});function i_(e=Eu){return[Sh.of(e),p_]}function a_(e){let t=[],n=new Set,r=new Set,i=e.state.facet(Sh).includes(`image`),a=e.state.facet(Sh).includes(`html`),o=Tf(e.state);for(let{from:s,to:c}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:s,to:c,enter:s=>{if(a){let t=!1;if(e.state.field(Dh).visible.between(s.from,s.to,(e,n,r)=>{r.spec.widget instanceof vh&&e<s.to&&n>s.from&&(t||=e<=s.from&&n>=s.to)}),t)return!1}s.name===`FencedCode`&&!r.has(s.from)&&(r.add(s.from),t.push(...Gg(s,e)));let c=Yh(s,e.state);c!==void 0&&!n.has(c.from)&&(n.add(c.from),t.push(d.Decoration.replace({widget:new tg(c.type,c.title)}).range(c.from,c.to)));let l=Xh(s,e.state);l!==void 0&&t.push(s_.range(l.from,l.to));let u=mg(s,e.state);if(u!==void 0){let e=u.task?l_:c_;t.push(e.range(u.from,u.to))}let f=xf(s,e.state,o),p=f?.image?X:kh;if(f!==void 0&&!p(e.state,s.from,s.to)){let n=e.state.sliceDoc(f.label.from,f.label.to);if(i&&f.image&&f.destination!==``)t.push(d.Decoration.replace({widget:new Ug(f.destination,n)}).range(s.from,s.to));else{f.hidden.forEach(e=>t.push(o_.range(e.from,e.to)));let r=f.image?f_:d_;t.push(r.range(f.label.from,f.label.to)),t.push(d.Decoration.widget({widget:new zg(f.image?`image`:`link`,e.state,f.destination,n,f.highlightTags),side:-1}).range(f.label.to))}}let m=Sf(s,e.state);for(let n of m)X(e.state,n.from,n.to)||(t.push(o_.range(n.from+1,n.from+2)),t.push(d_.range(n.from,n.to)),t.push(d.Decoration.widget({widget:new zg(`footnote`,e.state,n.label,n.label,n.highlightTags),side:-1}).range(n.to)));let h=Cf(s,e.state);h!==void 0&&(h.hidden.forEach(e=>t.push(o_.range(e.from,e.to))),t.push(d.Decoration.widget({widget:new zg(`footnoteBack`,e.state,h.label,h.label,h.highlightTags),side:-1}).range(h.suffixPosition)),h.suffix!==``&&t.push(d.Decoration.widget({widget:new Vg(h.suffix),side:1}).range(h.suffixPosition)));let g=Nf(s,e.state);t.push(...g);let _=Qg(s,e.state);_!==void 0&&t.push(_);let v=qg(s,e.state);v!==void 0&&t.push(o_.range(v.from,v.to));let y=Jg(s,e.state);y!==void 0&&t.push(u_.range(y))}});return d.Decoration.set(t,!0)}var o_,s_,c_,l_,u_,d_,f_,p_,m_,h_=o((()=>{$h(),ng(),pg(),Sg(),Ag(),Bg(),Hg(),Wg(),xh(),Oh(),Ch(),Kg(),Zg(),e_(),Vf(),Mf(),n_(),hg(),Jh(),Pu(),o_=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),s_=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark`}),c_=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark`}),l_=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark`}),u_=d.Decoration.line({class:`cm-md-syntaxHiddenSetextUnderline`}),d_=d.Decoration.mark({class:`cm-md-syntaxHiddenLinkLabel`}),f_=d.Decoration.mark({class:`cm-md-syntaxHiddenImageLabel`}),p_=[d.EditorView.editorAttributes.of({class:`cm-md-syntaxHiddenMode`}),Kh,Bh,Gh,qh,d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=a_(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.field(Bh)!==e.state.field(Bh)||e.transactions.some(e=>e.reconfigured))&&(this.decorations=a_(e.view))}},{decorations:e=>e.decorations}),dg,bg,Og,Dh,t_],m_=i_()})),g_=new p.Compartment,__=g_.of([]),v_=0;async function y_(e,t){let n=++v_,r=t?await x_():[];n===v_&&(e.dispatch({effects:g_.reconfigure(r)}),t&&e.requestMeasure())}var b_;function x_(){return b_??=Promise.resolve().then(()=>(h_(),r_)).then(e=>e.hiddenSyntaxExtension)}var S_=function(e,t){return Number(e.slice(0,-1*t.length))},C_=function(e){return e.endsWith(`px`)?{value:e,type:`px`,numeric:S_(e,`px`)}:e.endsWith(`fr`)?{value:e,type:`fr`,numeric:S_(e,`fr`)}:e.endsWith(`%`)?{value:e,type:`%`,numeric:S_(e,`%`)}:e===`auto`?{value:e,type:`auto`}:null},w_=function(e){return e.split(` `).map(C_)},T_=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=!1);var i=r?e+1:e;return t.slice(0,i).reduce(function(e,t){return e+t.numeric},0)+(n?e*n:0)},E_=function(e,t,n){return t.concat(n).map(function(t){return t.style[e]}).filter(function(e){return e!==void 0&&e!==``})},D_=function(e,t){return t.endsWith(e)?Number(t.slice(0,-1*e.length)):null},O_=function(e){for(var t=0;t<e.length;t++)if(e[t].numeric>0)return t;return null},k_=function(){return!1},A_=function(e,t,n){e.style[t]=n},Z=function(e,t,n){var r=e[t];return r===void 0?n:r};function j_(e){var t;return(t=[]).concat.apply(t,Array.from(e.ownerDocument.styleSheets).map(function(e){var t=[];try{t=Array.from(e.cssRules||[])}catch{}return t})).filter(function(t){var n=!1;try{n=e.matches(t.selectorText)}catch{}return n})}var M_=`grid-template-columns`,N_=`grid-template-rows`,Q=function(e,t,n){this.direction=e,this.element=t.element,this.track=t.track,e===`column`?(this.gridTemplateProp=M_,this.gridGapProp=`grid-column-gap`,this.cursor=Z(n,`columnCursor`,Z(n,`cursor`,`col-resize`)),this.snapOffset=Z(n,`columnSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`columnDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientX`,this.optionStyle=Z(n,`gridTemplateColumns`)):e===`row`&&(this.gridTemplateProp=N_,this.gridGapProp=`grid-row-gap`,this.cursor=Z(n,`rowCursor`,Z(n,`cursor`,`row-resize`)),this.snapOffset=Z(n,`rowSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`rowDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientY`,this.optionStyle=Z(n,`gridTemplateRows`)),this.onDragStart=Z(n,`onDragStart`,k_),this.onDragEnd=Z(n,`onDragEnd`,k_),this.onDrag=Z(n,`onDrag`,k_),this.writeStyle=Z(n,`writeStyle`,A_),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener(`mousedown`,this.startDragging),this.element.addEventListener(`touchstart`,this.startDragging))};Q.prototype.getDimensions=function(){var e=this.grid.getBoundingClientRect(),t=e.width,n=e.height,r=e.top,i=e.bottom,a=e.left,o=e.right;this.direction===`column`?(this.start=r,this.end=i,this.size=n):this.direction===`row`&&(this.start=a,this.end=o,this.size=t)},Q.prototype.getSizeAtTrack=function(e,t){return T_(e,this.computedPixels,this.computedGapPixels,t)},Q.prototype.getSizeOfTrack=function(e){return this.computedPixels[e].numeric},Q.prototype.getRawTracks=function(){var e=E_(this.gridTemplateProp,[this.grid],j_(this.grid));if(!e.length){if(this.optionStyle)return this.optionStyle;throw Error(`Unable to determine grid template tracks from styles.`)}return e[0]},Q.prototype.getGap=function(){var e=E_(this.gridGapProp,[this.grid],j_(this.grid));return e.length?e[0]:null},Q.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]},Q.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]},Q.prototype.setTracks=function(e){this.tracks=e.split(` `),this.trackValues=w_(e)},Q.prototype.setComputedTracks=function(e){this.computedTracks=e.split(` `),this.computedPixels=w_(e)},Q.prototype.setGap=function(e){this.gap=e},Q.prototype.setComputedGap=function(e){this.computedGap=e,this.computedGapPixels=D_(`px`,this.computedGap)||0},Q.prototype.getMousePosition=function(e){return`touches`in e?e.touches[0][this.clientAxis]:e[this.clientAxis]},Q.prototype.startDragging=function(e){if(!(`button`in e&&e.button!==0)){e.preventDefault(),this.grid=this.element?this.element.parentNode:e.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(e){return e.type===`%`}),n=this.trackValues.filter(function(e){return e.type===`fr`});if(this.totalFrs=n.length,this.totalFrs){var r=O_(n);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/n[r].numeric)}if(t.length){var i=O_(t);i!==null&&(this.percentageToPixels=this.computedPixels[i].numeric/t[i].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(e)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error(`Invalid track index: `+this.track+`. Track must be between two other tracks and only `+this.tracks.length+` tracks were found.`);this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener(`mouseup`,this.stopDragging),window.addEventListener(`touchend`,this.stopDragging),window.addEventListener(`touchcancel`,this.stopDragging),window.addEventListener(`mousemove`,this.drag),window.addEventListener(`touchmove`,this.drag),this.grid.addEventListener(`selectstart`,k_),this.grid.addEventListener(`dragstart`,k_),this.grid.style.userSelect=`none`,this.grid.style.webkitUserSelect=`none`,this.grid.style.MozUserSelect=`none`,this.grid.style.pointerEvents=`none`,this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}},Q.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)},Q.prototype.drag=function(e){var t=this.getMousePosition(e),n=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,i=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(n-this.dragStartOffset),a=r+this.snapOffset,o=i-this.snapOffset;t<a&&(t=r),t>o&&(t=i),t<r?t=r:t>i&&(t=i);var s=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,c=this.bTrackEnd-t+this.dragStartOffset-n-this.computedGapPixels;if(this.dragInterval>1){var l=Math.round(s/this.dragInterval)*this.dragInterval;c-=l-s,s=l}if(s<this.minSizeStart&&(s=this.minSizeStart),c<this.minSizeEnd&&(c=this.minSizeEnd),this.trackValues[this.aTrack].type===`px`)this.tracks[this.aTrack]=s+`px`;else if(this.trackValues[this.aTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.aTrack]=`1fr`;else{var u=s/this.frToPixels;this.tracks[this.aTrack]=u+`fr`}}else if(this.trackValues[this.aTrack].type===`%`){var d=s/this.percentageToPixels;this.tracks[this.aTrack]=d+`%`}if(this.trackValues[this.bTrack].type===`px`)this.tracks[this.bTrack]=c+`px`;else if(this.trackValues[this.bTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.bTrack]=`1fr`;else{var f=c/this.frToPixels;this.tracks[this.bTrack]=f+`fr`}}else if(this.trackValues[this.bTrack].type===`%`){var p=c/this.percentageToPixels;this.tracks[this.bTrack]=p+`%`}var m=this.tracks.join(` `);this.writeStyle(this.grid,this.gridTemplateProp,m),this.onDrag(this.direction,this.track,m)},Q.prototype.cleanup=function(){window.removeEventListener(`mouseup`,this.stopDragging),window.removeEventListener(`touchend`,this.stopDragging),window.removeEventListener(`touchcancel`,this.stopDragging),window.removeEventListener(`mousemove`,this.drag),window.removeEventListener(`touchmove`,this.drag),this.grid&&(this.grid.removeEventListener(`selectstart`,k_),this.grid.removeEventListener(`dragstart`,k_),this.grid.style.userSelect=``,this.grid.style.webkitUserSelect=``,this.grid.style.MozUserSelect=``,this.grid.style.pointerEvents=``,this.grid.style.cursor=``),window.document.body.style.cursor=``},Q.prototype.destroy=function(e,t){e===void 0&&(e=!0),e||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var P_=function(e,t,n){return t in e?e[t]:n},F_=function(e,t){return function(n){if(n.track<1)throw Error(`Invalid track index: `+n.track+`. Track must be between two other tracks.`);var r=e===`column`?t.columnMinSizes||{}:t.rowMinSizes||{},i=e===`column`?`columnMinSize`:`rowMinSize`;return new Q(e,Object.assign({},{minSizeStart:P_(r,n.track-1,Z(t,i,Z(t,`minSize`,0))),minSizeEnd:P_(r,n.track+1,Z(t,i,Z(t,`minSize`,0)))},n),t)}},I_=function(e){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:e.columnGutters||[],rowGutters:e.rowGutters||[],columnMinSizes:e.columnMinSizes||{},rowMinSizes:e.rowMinSizes||{}},e),this.options.columnGutters.forEach(function(e){t.columnGutters[e.track]=F_(`column`,t.options)(e)}),this.options.rowGutters.forEach(function(e){t.rowGutters[e.track]=F_(`row`,t.options)(e)})};I_.prototype.addColumnGutter=function(e,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=F_(`column`,this.options)({element:e,track:t})},I_.prototype.addRowGutter=function(e,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=F_(`row`,this.options)({element:e,track:t})},I_.prototype.removeColumnGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.columnGutters[e]&&this.columnGutters[e].destroy(t,function(){delete n.columnGutters[e]})},I_.prototype.removeRowGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.rowGutters[e]&&this.rowGutters[e].destroy(t,function(){delete n.rowGutters[e]})},I_.prototype.handleDragStart=function(e,t,n){t===`column`?(this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=F_(`column`,this.options)({track:n}),this.columnGutters[n].startDragging(e)):t===`row`&&(this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=F_(`row`,this.options)({track:n}),this.rowGutters[n].startDragging(e))},I_.prototype.destroy=function(e){var t=this;e===void 0&&(e=!0),Object.keys(this.columnGutters).forEach(function(n){return t.columnGutters[n].destroy(e,function(){delete t.columnGutters[n]})}),Object.keys(this.rowGutters).forEach(function(n){return t.rowGutters[n].destroy(e,function(){delete t.rowGutters[n]})})};function L_(e){return new I_(e)}var R_=`body .markdown-body details summary,
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
`;fe(),qd(),af(),Pu(),Pd(),Ad();var z_=document.body,B_=document.createElement(`div`),$=document.createElement(`div`),V_=y(`* { cursor: col-resize }`,!1),H_=p.Annotation.define(),U_=function(e){return e[e.edit=0]=`edit`,e[e.sideBySide=1]=`sideBySide`,e[e.preview=2]=`preview`,e[e.syntaxHidden=3]=`syntaxHidden`,e}({});function W_(){y(R_),y(Td()),y(Dd());let e=document.createElement(`div`);e.className=yf.dividerViewClass,B_.appendChild(e),B_.className=yf.gutterViewClass,z_.appendChild(B_),$.className=yf.previewPaneClass,z_.appendChild($),document.addEventListener(`keydown`,e=>{if(!e.metaKey||e.key!==`a`)return;let t=f.MarkEdit.editorView?.contentDOM??document.querySelector(`.cm-content`);($.classList.contains(`overlay`)||document.activeElement!==t)&&(oe($),e.preventDefault())}),new MutationObserver(sv).observe($,{attributes:!0,attributeFilter:[`style`,`class`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{sv(),document.querySelector(`.mermaid`)!==null&&X_()}),typeof f.MarkEdit.getFileInfo==`function`&&typeof f.MarkEdit.openFile==`function`&&$.addEventListener(`click`,uv),$.addEventListener(`click`,e=>{dv(e),fv(e)})}function G_(e,t=!0){let n=J_();pv.viewMode=e,e!==n&&localStorage.setItem(bf.viewModeCacheKey,String(e));let r=f.MarkEdit.editorView;y_(r,e===3),Y_()?r.focus():e===2&&r.contentDOM.blur(),e===1?(z_.classList.add(yf.containerClass),pv.splitter??=L_({columnGutters:[{track:1,element:B_}],minSize:150,onDragStart:()=>V_.disabled=!1,onDragEnd:()=>V_.disabled=!0})):(z_.classList.remove(yf.containerClass),pv.splitter?.destroy(),pv.splitter=void 0),e===2?$.classList.add(`overlay`):$.classList.remove(`overlay`),t?X_(!0):++pv.renderVersion}function K_(){let e=Au.map(e=>{switch(e){case`edit`:return 0;case`side-by-side`:return 1;case`preview`:return 2;case`syntax-hidden`:return 3;default:return}}).filter(e=>e!==void 0),t=e.some(e=>e===0||e===3)?e:[0,...e],n=t.indexOf(J_());G_(t[n===-1?0:(n+1)%t.length])}function q_(){let e=localStorage.getItem(bf.viewModeCacheKey);if(e===null)return;let t=Number(e);if(J_()===t){t===3&&y_(f.MarkEdit.editorView,!0);return}G_(t,!0)}function J_(){return pv.viewMode}function Y_(){let e=J_();return e===0||e===3}async function X_(e=J_()!==2||!$.hasChildNodes()){let t=++pv.renderVersion;if(Y_())return;let n=Jd(await ov());if(t!==pv.renderVersion)return;let r={top:$.scrollTop,left:$.scrollLeft};$.innerHTML=n;let i=localStorage.getItem(bf.previewPageZoomKey);i!==null&&cv(i);let a=()=>{e&&t===pv.renderVersion&&sf(nv(),$,!1)};e?a():$.scrollTo(r),Bd(a,$)}function Z_(e){if(Y_()||J_()===1&&f.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key===`0`)return;let t=Number($.style.zoom)||1,n=e=>String(Math.min(Math.max(e,.5),3));switch(e.key){case`-`:case`_`:cv(n(t-.1));break;case`=`:case`+`:cv(n(t+.1));break;case`0`:cv(`1`);break;default:return}localStorage.setItem(bf.previewPageZoomKey,$.style.zoom),e.preventDefault(),e.stopPropagation()}function Q_(){lv(!1)}function $_(){lv(!0)}function ev(){let e=ov(!1);return ue(new ClipboardItem({"text/plain":e.then(e=>new Blob([e],{type:`text/plain`}))}),H(`failedToCopy`))}function tv(){let e=ov(!1);return ue(new ClipboardItem({"text/html":e.then(e=>new Blob([e],{type:`text/html`})),"text/plain":e.then(e=>new Blob([de(e)],{type:`text/plain`}))}),H(`failedToCopy`))}function nv(){return f.MarkEdit.editorView.scrollDOM}function rv(){return $}async function iv(e){let t=await ov(!1);return e?await Vd(t):`<meta charset="UTF-8">\n${t}`}async function av(e,t){let n=await Ld(e,!1);return t?await Vd(n):`<meta charset="UTF-8">\n${n}`}async function ov(e=!0){return await Ld(f.MarkEdit.editorAPI.getText(),e)}function sv(){let e=getComputedStyle($).backgroundColor;B_.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function cv(e){$.style.zoom=e,$.classList.toggle(`zoomed-in`,Number(e)>1)}async function lv(e){let t=await(async()=>{let e=await f.MarkEdit.getFileInfo();return e===void 0?`${H(`untitled`)}.html`:`${te(e.filePath)}.html`})(),n=await iv(e);f.MarkEdit.showSavePanel({fileName:t,string:n})}async function uv(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`a`);if(t===null)return;let n=t.getAttribute(`href`);if(!n?.startsWith(`../`))return;let r=(await f.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{let e=ce(r,decodeURIComponent(n));await f.MarkEdit.openFile(e)}catch(e){console.error(`Failed to open file:`,e)}}}function dv(e){let t=`suppress-underline`,n=e.target instanceof Element?e.target.closest(`a`):null;n!==null&&gf($,e),n!==null&&!n.classList.contains(t)&&n.matches(`:hover`)&&(n.classList.add(t),n.addEventListener(`mouseleave`,()=>n.classList.remove(t),{once:!0}))}function fv(e){let t=e.target;if(!(t instanceof HTMLInputElement)||!t.classList.contains(`task-list-item-checkbox`))return;let n=t.closest(`[data-line-from]`);if(n===null){console.error(`Failed to find task item block`);return}let r=f.MarkEdit.editorAPI,i=r.getLineRange(re(n).from),a=hf(r.getText(i));if(a===null){t.checked=!t.checked,console.error(`Failed to resolve task toggle`);return}let o=i.from+a.offset;f.MarkEdit.editorView.dispatch({changes:{from:o,to:o+1,insert:a.replacement},annotations:H_.of(!0)})}var pv={viewMode:0,splitter:void 0,renderVersion:0};fe();var mv=`markedit-preview`,hv=`${mv}.js`;function gv(e){let{destExists:t,bundleInfo:n,currentVersion:r}=e,i=n?.version===r,a=n?.fullBuild===!1;return!(t&&i&&a)}async function _v(){try{let e=f.MarkEdit.getDirectoryPath(`documents`),t=f.MarkEdit.getDirectoryPath(`sharedContainer`);if(e===void 0||t===void 0){console.error(`Required directories are not accessible`);return}let n=typeof __FILE_PATH__==`string`?__FILE_PATH__:ce(e,`scripts/${hv}`);if(await f.MarkEdit.getFileInfo(n)===void 0){console.error(`Source file not found at ${n}`);return}let r=n.split(`/`).pop()??hv,i=ce(t,`Shared/scripts`),a=ce(i,r),o=await f.MarkEdit.getFileInfo(a)!==void 0,s=ce(t,`Shared/metadata.json`),c=await le(s),l=c[mv];if(!gv({destExists:o,bundleInfo:l,currentVersion:`1.13.0`}))return;let u=await f.MarkEdit.getFileContent(n);if(u===void 0){console.error(`Failed to read content from ${n}`);return}await f.MarkEdit.createFile({path:i,isDirectory:!0}),await f.MarkEdit.createFile({path:a,string:u,overwrites:!0}),await f.MarkEdit.createFile({path:s,string:JSON.stringify({...c,[mv]:{version:`1.13.0`,fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error(`Failed to copy the current file to shared container:`,e)}}Pd();var vv=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>`,yv=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>`;function bv(){let e=xv(H(`source`),vv),t=xv(H(`preview`),yv),n=document.createElement(`div`);n.className=`quicklook-segmented`,n.setAttribute(`role`,`tablist`),n.append(e,t);let r=document.createElement(`div`);return r.className=`quicklook-toolbar`,r.appendChild(n),{toolbar:r,sourceButton:e,previewButton:t}}function xv(e,t){let n=document.createElement(`button`);n.title=e,n.type=`button`,n.className=`quicklook-segment`,n.setAttribute(`role`,`tab`),n.setAttribute(`aria-label`,e);let r=document.createElement(`span`);r.textContent=e,r.className=`quicklook-segment-label`;let i=document.createElement(`span`);return i.innerHTML=t,i.className=`quicklook-segment-icon`,n.append(r,i),n}function Sv(){if(wv!==void 0)return wv;try{wv=localStorage.getItem(Tv)===`preview`?`preview`:`source`}catch{console.error(`Failed to read quick look mode from localStorage`),wv=`source`}return wv}function Cv(e){wv=e;try{localStorage.setItem(Tv,e)}catch{console.error(`Failed to write quick look mode to localStorage`)}}var wv,Tv=`ui.quicklook-mode`;function Ev(){let e=window,t=e.editor?.state?.doc.toString();return typeof t==`string`?t:(console.error(`Failed to get text from host editor state`),e.config?.text??``)}function Dv(){document.addEventListener(`webkitmouseforcewillbegin`,e=>{let t=e.target;t instanceof Element&&t.closest(`a`)!==null&&e.preventDefault()})}function Ov(e,t){let n=window,r=n.pinchZoomTarget;n.pinchZoomTarget=()=>{if(e()!==`preview`)return r?.()??null;let n=t.querySelector(`.quicklook-content`);return n===null?null:{scroller:t,inner:n}};for(let n of[`gesturechange`,`gestureend`])document.addEventListener(n,()=>{if(e()!==`preview`)return;let n=t.querySelector(`.quicklook-content`);n?.style.zoom.length?n?.style.setProperty(`--quicklook-zoom`,n.style.zoom):n?.style.removeProperty(`--quicklook-zoom`)},{passive:!1})}function kv(e,t){let n,r=window,i={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},a=()=>{let e=t.clientHeight,n=t.scrollHeight,r=n-e;if(r<=0||n<=0)return{clientHeight:e,scrollHeight:n,scrollbarHeight:e,scrollbarTop:0};let i=e/n*e;return{clientHeight:e,scrollHeight:n,scrollbarHeight:i,scrollbarTop:t.scrollTop/r*(e-i)}},o=(e,n,r=`auto`)=>{let{clientHeight:i,scrollHeight:o,scrollbarHeight:s}=a(),c=i-s;if(c>0){let a=(e-n)/c;t.scrollTo({top:a*(o-i),behavior:r})}};r.startDragging=r=>{if(e()!==`preview`){i.start?.(r);return}let{scrollbarTop:s,scrollbarHeight:c}=a(),l=Nv(t,r);n=l-s,(l<s||l>s+c)&&o(l,c*.5,`smooth`)},r.updateDragging=r=>{if(e()!==`preview`){i.update?.(r);return}n!==void 0&&o(Nv(t,r),n)},r.cancelDragging=()=>{if(e()!==`preview`){i.cancel?.();return}n=void 0}}function Av(e,t,n){n.addEventListener(`wheel`,n=>{let r=e()===`preview`?t:document.querySelector(`.cm-scroller`);r!==null&&(r.scrollTop+=n.deltaY,r.scrollLeft+=n.deltaX,n.preventDefault())},{passive:!1})}function jv(e,t,n){let r=document.querySelector(`.cm-scroller`),i=()=>{let i=(e()===`preview`?t:r)?.scrollTop??0;n.classList.toggle(`scrolled`,i>0),n.classList.toggle(`scrolled-far`,i>20)};return t.addEventListener(`scroll`,i,{passive:!0}),r?.addEventListener(`scroll`,i,{passive:!0}),i}function Mv(e){document.addEventListener(`copy`,t=>{if(!e.classList.contains(`overlay`))return;let n=getSelection(),r=n!==null&&n.rangeCount>0?n.getRangeAt(0):null,i=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,a=i??(()=>{let t=document.createRange();return t.selectNodeContents(e),t})(),o=document.createElement(`div`);o.appendChild(a.cloneContents()),t.clipboardData?.setData(`text/html`,o.innerHTML),t.clipboardData?.setData(`text/plain`,i===null?e.innerText:i.toString()),t.preventDefault(),t.stopPropagation()},!0)}function Nv(e,t){return t-e.getBoundingClientRect().top}var Pv=`body {
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
`;qd(),af(),fe();function Fv(e){y(Pv),document.body.classList.add(`quicklook`);let{toolbar:t,sourceButton:n,previewButton:r}=bv();document.body.appendChild(t);let i=Lv(e),a={previewPane:e,sourceButton:n,previewButton:r,refreshSeparator:jv(Sv,e,t),ensureRendered:i.ensureRendered};n.addEventListener(`click`,()=>{Cv(`source`),Iv(a)}),r.addEventListener(`click`,()=>{Cv(`preview`),Iv(a)}),Iv(a),setTimeout(i.ensureRendered,0),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{e.querySelector(`.mermaid`)!==null&&(i.invalidate(),Sv()===`preview`&&i.ensureRendered())}),Dv(),Ov(Sv,e),kv(Sv,e),Av(Sv,e,t),Mv(e)}function Iv(e){let t=Sv()===`source`,n=!t;e.sourceButton.classList.toggle(`active`,t),e.previewButton.classList.toggle(`active`,n),e.sourceButton.setAttribute(`aria-selected`,String(t)),e.previewButton.setAttribute(`aria-selected`,String(n)),e.previewPane.classList.toggle(`overlay`,n),e.refreshSeparator(),n&&e.ensureRendered()}function Lv(e){let t=!1,n;return{ensureRendered:()=>(t||n||(n=(async()=>{try{e.innerHTML=`<div class="quicklook-content">${Jd(await Ld(Ev(),!1))}</div>`,e.querySelectorAll(`a[href]`).forEach(e=>{e.removeAttribute(`href`),e.removeAttribute(`target`)}),Bd(()=>{},e),t=!0}catch(e){throw n=void 0,e}})()),n),invalidate:()=>{t=!1,n=void 0}}}var Rv=u(s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):n.Mark=r()})(e,(function(){var e=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t=function(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;t(this,e),this.ctx=n,this.iframes=r,this.exclude=i,this.iframesTimeout=a}return n(e,[{key:`getContexts`,value:function(){var e=void 0,t=[];return e=this.ctx===void 0||!this.ctx?[]:NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:typeof this.ctx==`string`?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx],e.forEach(function(e){var n=t.filter(function(t){return t.contains(e)}).length>0;t.indexOf(e)===-1&&!n&&t.push(e)}),t}},{key:`getIframeContents`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw Error(`iframe inaccessible`)}catch{n()}r&&t(r)}},{key:`isIframeBlank`,value:function(e){var t=`about:blank`,n=e.getAttribute(`src`).trim();return e.contentWindow.location.href===t&&n!==t&&n}},{key:`observeIframeLoad`,value:function(e,t,n){var r=this,i=!1,a=null,o=function o(){if(!i){i=!0,clearTimeout(a);try{r.isIframeBlank(e)||(e.removeEventListener(`load`,o),r.getIframeContents(e,t,n))}catch{n()}}};e.addEventListener(`load`,o),a=setTimeout(o,this.iframesTimeout)}},{key:`onIframeReady`,value:function(e,t,n){try{e.contentWindow.document.readyState===`complete`?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch{n()}}},{key:`waitForIframes`,value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector(`html`),function(){--r||t()})},function(e){e||t()})}},{key:`forEachIframe`,value:function(t,n,r){var i=this,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},o=t.querySelectorAll(`iframe`),s=o.length,c=0;o=Array.prototype.slice.call(o);var l=function(){--s<=0&&a(c)};s||l(),o.forEach(function(t){e.matches(t,i.exclude)?l():i.onIframeReady(t,function(e){n(t)&&(c++,r(e)),l()},l)})}},{key:`createIterator`,value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:`createInstanceOnIframe`,value:function(t){return new e(t.querySelector(`html`),this.iframes)}},{key:`compareNodeIframe`,value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(t!==null){if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}else return!0}return!1}},{key:`getIteratorNode`,value:function(e){var t=e.previousNode(),n=void 0;return n=(t===null||e.nextNode())&&e.nextNode(),{prevNode:t,node:n}}},{key:`checkIframeFilter`,value:function(e,t,n,r){var i=!1,a=!1;return r.forEach(function(e,t){e.val===n&&(i=t,a=e.handled)}),this.compareNodeIframe(e,t,n)?(i===!1&&!a?r.push({val:n,handled:!0}):i!==!1&&!a&&(r[i].handled=!0),!0):(i===!1&&r.push({val:n,handled:!1}),!1)}},{key:`handleOpenIframes`,value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:`iterateThroughNodes`,value:function(e,t,n,r,i){for(var a=this,o=this.createIterator(t,e,r),s=[],c=[],l=void 0,u=void 0,d=function(){var e=a.getIteratorNode(o);return u=e.prevNode,l=e.node,l};d();)this.iframes&&this.forEachIframe(t,function(e){return a.checkIframeFilter(l,u,e,s)},function(t){a.createInstanceOnIframe(t).forEachNode(e,function(e){return c.push(e)},r)}),c.push(l);c.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(s,e,n,r),i()}},{key:`forEachNode`,value:function(e,t,n){var r=this,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},a=this.getContexts(),o=a.length;o||i(),a.forEach(function(a){var s=function(){r.iterateThroughNodes(e,a,t,n,function(){--o<=0&&i()})};r.iframes?r.waitForIframes(a,s):s()})}}],[{key:`matches`,value:function(e,t){var n=typeof t==`string`?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){var i=!1;return n.every(function(t){return!r.call(e,t)||(i=!0,!1)}),i}return!1}}]),e}(),a=function(){function a(e){t(this,a),this.ctx=e,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf(`MSIE`)>-1||n.indexOf(`Trident`)>-1)&&(this.ie=!0)}return n(a,[{key:`log`,value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`debug`,r=this.opt.log;this.opt.debug&&(r===void 0?`undefined`:e(r))===`object`&&typeof r[n]==`function`&&r[n](`mark.js: `+t)}},{key:`escapeStr`,value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,`\\$&`)}},{key:`createRegExp`,value:function(e){return this.opt.wildcards!==`disabled`&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),this.opt.wildcards!==`disabled`&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e),e}},{key:`createSynonymsRegExp`,value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?``:`i`,r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?`\0`:``;for(var i in t)if(t.hasOwnProperty(i)){var a=t[i],o=this.opt.wildcards===`disabled`?this.escapeStr(i):this.setupWildcardsRegExp(i),s=this.opt.wildcards===`disabled`?this.escapeStr(a):this.setupWildcardsRegExp(a);o!==``&&s!==``&&(e=e.replace(RegExp(`(`+this.escapeStr(o)+`|`+this.escapeStr(s)+`)`,`gm`+n),r+(`(`+this.processSynomyms(o)+`|`)+(this.processSynomyms(s)+`)`)+r))}return e}},{key:`processSynomyms`,value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:`setupWildcardsRegExp`,value:function(e){return e=e.replace(/(?:\\)*\?/g,function(e){return e.charAt(0)===`\\`?`?`:``}),e.replace(/(?:\\)*\*/g,function(e){return e.charAt(0)===`\\`?`*`:``})}},{key:`createWildcardsRegExp`,value:function(e){var t=this.opt.wildcards===`withSpaces`;return e.replace(/\u0001/g,t?`[\\S\\s]?`:`\\S?`).replace(/\u0002/g,t?`[\\S\\s]*?`:`\\S*`)}},{key:`setupIgnoreJoinersRegExp`,value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||r===``?e:e+`\0`})}},{key:`createJoinersRegExp`,value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(``))),this.opt.ignoreJoiners&&t.push(`\\u00ad\\u200b\\u200c\\u200d`),t.length?e.split(/\u0000+/).join(`[`+t.join(``)+`]*`):e}},{key:`createDiacriticsRegExp`,value:function(e){var t=this.opt.caseSensitive?``:`i`,n=this.opt.caseSensitive?`aàáảãạăằắẳẵặâầấẩẫậäåāą.AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ.cçćč.CÇĆČ.dđď.DĐĎ.eèéẻẽẹêềếểễệëěēę.EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ.iìíỉĩịîïī.IÌÍỈĨỊÎÏĪ.lł.LŁ.nñňń.NÑŇŃ.oòóỏõọôồốổỗộơởỡớờợöøō.OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ.rř.RŘ.sšśșş.SŠŚȘŞ.tťțţ.TŤȚŢ.uùúủũụưừứửữựûüůū.UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ.yýỳỷỹỵÿ.YÝỲỶỸỴŸ.zžżź.ZŽŻŹ`.split(`.`):[`aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ`,`cçćčCÇĆČ`,`dđďDĐĎ`,`eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ`,`iìíỉĩịîïīIÌÍỈĨỊÎÏĪ`,`lłLŁ`,`nñňńNÑŇŃ`,`oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ`,`rřRŘ`,`sšśșşSŠŚȘŞ`,`tťțţTŤȚŢ`,`uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ`,`yýỳỷỹỵÿYÝỲỶỸỴŸ`,`zžżźZŽŻŹ`],r=[];return e.split(``).forEach(function(i){n.every(function(n){if(n.indexOf(i)!==-1){if(r.indexOf(n)>-1)return!1;e=e.replace(RegExp(`[`+n+`]`,`gm`+t),`[`+n+`]`),r.push(n)}return!0})}),e}},{key:`createMergedBlanksRegExp`,value:function(e){return e.replace(/[\s]+/gim,`[\\s]+`)}},{key:`createAccuracyRegExp`,value:function(e){var t=this,n=`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~¡¿`,r=this.opt.accuracy,i=typeof r==`string`?r:r.value,a=typeof r==`string`?[]:r.limiters,o=``;switch(a.forEach(function(e){o+=`|`+t.escapeStr(e)}),i){case`partially`:default:return`()(`+e+`)`;case`complementary`:return o=`\\s`+(o||this.escapeStr(n)),`()([^`+o+`]*`+e+`[^`+o+`]*)`;case`exactly`:return`(^|\\s`+o+`)(`+e+`)(?=$|\\s`+o+`)`}}},{key:`getSeparatedKeywords`,value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(` `).forEach(function(e){e.trim()&&n.indexOf(e)===-1&&n.push(e)}):e.trim()&&n.indexOf(e)===-1&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:`isNumeric`,value:function(e){return Number(parseFloat(e))==e}},{key:`checkRanges`,value:function(e){var t=this;if(!Array.isArray(e)||Object.prototype.toString.call(e[0])!==`[object Object]`)return this.log(`markRanges() will only accept an array of objects`),this.opt.noMatch(e),[];var n=[],r=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var i=t.callNoMatchOnInvalidRanges(e,r),a=i.start,o=i.end;i.valid&&(e.start=a,e.length=o-a,n.push(e),r=o)}),n}},{key:`callNoMatchOnInvalidRanges`,value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&e.start!==void 0?(n=parseInt(e.start,10),r=n+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-n>0?i=!0:(this.log(`Ignoring invalid or overlapping range: `+(``+JSON.stringify(e))),this.opt.noMatch(e))):(this.log(`Ignoring invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:`checkWhitespaceRanges`,value:function(e,t,n){var r=void 0,i=!0,a=n.length,o=t-a,s=parseInt(e.start,10)-o;return s=s>a?a:s,r=s+parseInt(e.length,10),r>a&&(r=a,this.log(`End range automatically set to the max value of `+a)),s<0||r-s<0||s>a||r>a?(i=!1,this.log(`Invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)):n.substring(s,r).replace(/\s+/g,``)===``&&(i=!1,this.log(`Skipping whitespace only range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:`getTextNodes`,value:function(e){var t=this,n=``,r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:`matchesExclude`,value:function(e){return i.matches(e,this.opt.exclude.concat([`script`,`style`,`title`,`head`,`html`]))}},{key:`wrapRangeInTextNode`,value:function(e,t,n){var r=this.opt.element?this.opt.element:`mark`,i=e.splitText(t),a=i.splitText(n-t),o=document.createElement(r);return o.setAttribute(`data-markjs`,`true`),this.opt.className&&o.setAttribute(`class`,this.opt.className),o.textContent=i.textContent,i.parentNode.replaceChild(o,i),a}},{key:`wrapRangeInMappedTextNode`,value:function(e,t,n,r,i){var a=this;e.nodes.every(function(o,s){var c=e.nodes[s+1];if(c===void 0||c.start>t){if(!r(o.node))return!1;var l=t-o.start,u=(n>o.end?o.end:n)-o.start,d=e.value.substr(0,o.start),f=e.value.substr(u+o.start);if(o.node=a.wrapRangeInTextNode(o.node,l,u),e.value=d+f,e.nodes.forEach(function(t,n){n>=s&&(e.nodes[n].start>0&&n!==s&&(e.nodes[n].start-=u),e.nodes[n].end-=u)}),n-=u,i(o.node.previousSibling,o.start),n>o.end)t=o.end;else return!1}return!0})}},{key:`wrapMatches`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){t.nodes.forEach(function(t){t=t.node;for(var i=void 0;(i=e.exec(t.textContent))!==null&&i[o]!==``;)if(n(i[o],t)){var s=i.index;if(o!==0)for(var c=1;c<o;c++)s+=i[c].length;t=a.wrapRangeInTextNode(t,s,s+i[o].length),r(t.previousSibling),e.lastIndex=0}}),i()})}},{key:`wrapMatchesAcrossElements`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){for(var s=void 0;(s=e.exec(t.value))!==null&&s[o]!==``;){var c=s.index;if(o!==0)for(var l=1;l<o;l++)c+=s[l].length;var u=c+s[o].length;a.wrapRangeInMappedTextNode(t,c,u,function(e){return n(s[o],e)},function(t,n){e.lastIndex=n,r(t)})}i()})}},{key:`wrapRangeFromIndex`,value:function(e,t,n,r){var i=this;this.getTextNodes(function(a){var o=a.value.length;e.forEach(function(e,r){var s=i.checkWhitespaceRanges(e,o,a.value),c=s.start,l=s.end;s.valid&&i.wrapRangeInMappedTextNode(a,c,l,function(n){return t(n,e,a.value.substring(c,l),r)},function(t){n(t,e)})}),r()})}},{key:`unwrapMatches`,value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:`normalizeTextNode`,value:function(e){if(e){if(e.nodeType===3)for(;e.nextSibling&&e.nextSibling.nodeType===3;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:`markRegExp`,value:function(e,t){var n=this;this.opt=t,this.log(`Searching with expression "`+e+`"`);var r=0,i=`wrapMatches`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){r===0&&n.opt.noMatch(e),n.opt.done(r)})}},{key:`mark`,value:function(e,t){var n=this;this.opt=t;var r=0,i=`wrapMatches`,a=this.getSeparatedKeywords(typeof e==`string`?[e]:e),o=a.keywords,s=a.length,c=this.opt.caseSensitive?``:`i`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),s===0?this.opt.done(r):function e(t){var a=new RegExp(n.createRegExp(t),`gm`+c),l=0;n.log(`Searching with expression "`+a+`"`),n[i](a,1,function(e,i){return n.opt.filter(i,t,r,l)},function(e){l++,r++,n.opt.each(e)},function(){l===0&&n.opt.noMatch(t),o[s-1]===t?n.opt.done(r):e(o[o.indexOf(t)+1])})}(o[0])}},{key:`markRanges`,value:function(e,t){var n=this;this.opt=t;var r=0,i=this.checkRanges(e);i&&i.length?(this.log(`Starting to mark with the following ranges: `+JSON.stringify(i)),this.wrapRangeFromIndex(i,function(e,t,r,i){return n.opt.filter(e,t,r,i)},function(e,t){r++,n.opt.each(e,t)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:`unmark`,value:function(e){var t=this;this.opt=e;var n=this.opt.element?this.opt.element:`*`;n+=`[data-markjs]`,this.opt.className&&(n+=`.`+this.opt.className),this.log(`Removal selector "`+n+`"`),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){t.unwrapMatches(e)},function(e){var r=i.matches(e,n),a=t.matchesExclude(e);return!r||a?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:`opt`,set:function(e){this._opt=r({},{element:``,className:``,exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:`partially`,acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:`disabled`,each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:`iterator`,get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),a}();function o(e){var t=this,n=new a(e);return this.mark=function(e,r){return n.mark(e,r),t},this.markRegExp=function(e,r){return n.markRegExp(e,r),t},this.markRanges=function(e,r){return n.markRanges(e,r),t},this.unmark=function(e){return n.unmark(e),t},this}return o}))}))());Pu();var zv=`markedit-preview-mark`,Bv=`markedit-preview-mark-highlighted`,Vv=!1,Hv,Uv=0,Wv=[],Gv=null,Kv=null,qv={github:{light:`#fae17d7f`,dark:`#f2cc607f`},cobalt:{light:`#cad40f66`,dark:`#cad40f66`},dracula:{light:`#ffffff40`,dark:`#ffffff40`},minimal:{light:`#fae17d7f`,dark:`#f2cc607f`},"night-owl":{light:`#5f7e9779`,dark:`#5f7e9779`},"rose-pine":{light:`#6e6a864c`,dark:`#6e6a8666`},solarized:{light:`#f4c09d`,dark:`#584032`},synthwave84:{light:`#d18616bb`,dark:`#d18616bb`},"winter-is-coming":{light:`#cee1f0`,dark:`#103362`},xcode:{light:`#e4e4e4`,dark:`#545558`}};function Jv(e){if(Hv=e,Uv=0,e.search.length===0){Xv();return}let t=rv();Qv(t),ey(t)}function Yv(e){Wv.length!==0&&(Uv=e%Wv.length,$v())}function Xv(){Gv?.disconnect(),Gv=null,Hv=void 0,Uv=0,Wv=[],new Rv.default(rv()).unmark()}function Zv(){if(J_()===U_.preview)return{numberOfItems:Wv.length,currentIndex:Uv}}function Qv(e){let t=Hv;if(t===void 0||t.search.length===0||Vv)return;ty(),Vv=!0;let{search:n,caseSensitive:r,wholeWord:i,diacriticInsensitive:a,regexp:o}=t,s=new Rv.default(e),c=()=>{Wv=Array.from(e.querySelectorAll(`.${zv}`)),Uv=Wv.length>0?Math.min(Uv,Wv.length-1):0,$v(),Vv=!1};s.unmark({done:()=>{if(o)try{let e=r?``:`i`;s.markRegExp(new RegExp(n,e),{className:zv,done:c})}catch{Vv=!1,Uv=0,Wv=[]}else s.mark(n,{className:zv,caseSensitive:r,diacritics:a,separateWordSearch:!1,accuracy:i?`exactly`:`partially`,done:c})}})}function $v(){let e=J_()!==U_.sideBySide;Wv.forEach((t,n)=>{t.classList.toggle(Bv,e&&n===Uv)}),e&&Wv.length>0&&Wv[Uv].scrollIntoView({behavior:`smooth`,block:`center`})}function ey(e){Gv?.disconnect(),Gv=new MutationObserver(()=>{Vv||Qv(e)}),Gv.observe(e,{childList:!0})}function ty(){Kv===null&&(Kv=document.createElement(`style`),document.head.appendChild(Kv));let{light:e,dark:t}=qv[Du]??qv.github;Kv.textContent=[`.${zv} { background: ${e} !important; color: inherit !important; }`,`.${Bv} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,`@media (prefers-color-scheme: dark) {`,`  .${zv} { background: ${t} !important; }`,`}`].join(`
`)}af(),Pu(),Id(),Pd(),fe(),window.__markeditPreviewInitialized__?console.error(`MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior.`):(W_(),Fd()?typeof f.MarkEdit.onAppReady==`function`&&f.MarkEdit.onAppReady(_v):Fv(rv()),window.__markeditPreviewInitialized__=!0),window.MarkEditGetHtml??=iv,window.MarkEditRenderHtml??=av,window.__markeditPreviewSPI__={performSearch:Jv,setSearchMatchIndex:Yv,clearSearch:Xv,searchCounterInfo:Zv},Fd()&&(f.MarkEdit.addMainMenuItem({title:H(`viewMode`),icon:v()?`eye`:void 0,children:[{title:H(`changeMode`),action:K_,key:ju.key??`V`,modifiers:ju.modifiers??[`Command`]},{separator:!0},ny(H(`editMode`),U_.edit),ny(H(`sideBySideMode`),U_.sideBySide),ny(H(`previewMode`),U_.preview),ny(H(`syntaxHiddenMode`),U_.syntaxHidden),{separator:!0},...ry(),{separator:!0},{title:`${H(`version`)} 1.13.0`,action:()=>open(`https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.13.0`)}]}),f.MarkEdit.addExtension([d.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(e=>e.annotation(H_))||(iy.renderUpdater!==void 0&&clearTimeout(iy.renderUpdater),iy.renderUpdater=setTimeout(X_,500)))}),__]),f.MarkEdit.onEditorReady(()=>{wu&&Xd(f.MarkEdit.editorView.scrollDOM),q_(),requestAnimationFrame(async()=>{document.visibilityState===`visible`&&J_()===U_.preview&&typeof f.MarkEdit.getFileInfo==`function`&&(await f.MarkEdit.getFileInfo())?.filePath===void 0&&f.MarkEdit.editorAPI.getText().length===0&&G_(U_.edit,!1)}),X_(),of(nv(),rv()),iy.keyDownListener!==void 0&&document.removeEventListener(`keydown`,iy.keyDownListener),iy.keyDownListener=e=>Z_(e),document.addEventListener(`keydown`,iy.keyDownListener)}),typeof f.MarkEdit.onEditorConfigChange==`function`&&f.MarkEdit.onEditorConfigChange(e=>{e===`lineHeight`&&J_()===U_.syntaxHidden&&f.MarkEdit.editorView?.requestMeasure()}));function ny(e,t){return{title:e,action:()=>G_(t),state:()=>({isSelected:J_()===t})}}function ry(){let e=[{title:H(`copyHtml`),action:ev},{title:H(`copyRichText`),action:tv}];return f.MarkEdit.showSavePanel===void 0?e:[{title:H(`saveCleanHtml`),action:Q_},{title:H(`saveStyledHtml`),action:$_},...e]}var iy={renderUpdater:void 0,keyDownListener:void 0};