"use strict";(()=>{let e=globalThis;if(typeof e.require>`u`){let t={MarkEdit:e.MarkEdit??Object.freeze({})},n={of:()=>({})},r=()=>({range:()=>({})});class i{}let a={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:n,mouseSelectionStyle:n,editorAttributes:n,baseTheme:()=>({})},Decoration:{mark:r,line:r},ViewPlugin:{fromClass:()=>({})},WidgetType:i,RectangleMarker:i,layer:()=>({})},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}},Facet:{define:()=>n},StateField:{define:()=>({})}}};e.require=e=>a[e]??{}}})();var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,o)=>(o=n==null?{}:e(i(n)),l(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));let d=require("@codemirror/view"),f=require("markedit-api"),p=require("@codemirror/state"),m=require("@codemirror/language"),h=require("@lezer/highlight"),g=require("@lezer/lr");require("@lezer/common");function _(){typeof f.MarkEdit.playSystemBeep==`function`&&f.MarkEdit.playSystemBeep()}function ee(){let e=navigator.userAgent.match(/macOS\/(\d+)/);return e!==null&&parseInt(e[1])>=26}function te(e,t=!0){let n=document.createElement(`style`);return n.textContent=e,document.head.appendChild(n),n.disabled=!t,n}function ne(e){return(e?.match(/--bgColor-default:\s*([^;]+);/))?.[1]?.trim()}function re(e){return(e.split(`/`).pop()??e).split(`.`).slice(0,-1).join(`.`)}function ie(e){return(e instanceof HTMLElement?e:e.parentElement)?.closest(`.cm-line`)}function ae(e){return{from:parseInt(e.dataset.lineFrom??`0`),to:parseInt(e.dataset.lineTo??`0`)}}function oe(e,t){let n=0,r=t;for(;r!==null&&r!==e;)n+=r.offsetTop,r=r.offsetParent;return n}function v(e,t,n,r=!0){se(e,oe(e,t)+t.offsetHeight*n,r)}function se(e,t,n=!0){let r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:t<=r?0:t,behavior:n?`smooth`:`instant`})}function ce(e){let t=document.createRange();t.selectNodeContents(e);let n=getSelection();n?.removeAllRanges(),n?.addRange(t)}function le(e){return!/^(https?:)?\/\//.test(e)&&/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function ue(e,t){return e.endsWith(`/`)?e+t:e+`/`+t}async function de(e){let t=await f.MarkEdit.getFileContent(e);if(t===void 0)return{};try{let e=JSON.parse(t);return typeof e==`object`&&e?e:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}function fe(e,t){return navigator.clipboard.write([e]).catch(e=>{console.error(`Failed to copy:`,e),f.MarkEdit.showAlert(t)})}function pe(e){let t=document.createElement(`div`);t.style.cssText=`position: fixed; left: -10000px; top: 0;`,t.innerHTML=e,document.body.appendChild(t);try{return t.innerText}finally{t.remove()}}var me=o((()=>{}));function he(e){let t=_e[e];if(t)return t;t=_e[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);t.push(n)}for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[r]=`%`+(`0`+r.toString(16).toUpperCase()).slice(-2)}return t}function ge(e,t){typeof t!=`string`&&(t=ge.defaultChars);let n=he(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(e){let t=``;for(let r=0,i=e.length;r<i;r+=3){let a=parseInt(e.slice(r+1,r+3),16);if(a<128){t+=n[a];continue}if((a&224)==192&&r+3<i){let n=parseInt(e.slice(r+4,r+6),16);if((n&192)==128){let e=a<<6&1984|n&63;t+=e<128?`��`:String.fromCharCode(e),r+=3;continue}}if((a&240)==224&&r+6<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16);if((n&192)==128&&(i&192)==128){let e=a<<12&61440|n<<6&4032|i&63;t+=e<2048||e>=55296&&e<=57343?`���`:String.fromCharCode(e),r+=6;continue}}if((a&248)==240&&r+9<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16),o=parseInt(e.slice(r+10,r+12),16);if((n&192)==128&&(i&192)==128&&(o&192)==128){let e=a<<18&1835008|n<<12&258048|i<<6&4032|o&63;e<65536||e>1114111?t+=`����`:(e-=65536,t+=String.fromCharCode(55296+(e>>10),56320+(e&1023))),r+=9;continue}}t+=`�`}return t})}var _e,ve=o((()=>{_e={},ge.defaultChars=`;/?:@&=+$,#`,ge.componentChars=``}));function ye(e){let t=y[e];if(t)return t;t=y[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);/^[0-9a-z]$/i.test(n)?t.push(n):t.push(`%`+(`0`+e.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function be(e,t,n){typeof t!=`string`&&(n=t,t=be.defaultChars),n===void 0&&(n=!0);let r=ye(t),i=``;for(let t=0,a=e.length;t<a;t++){let o=e.charCodeAt(t);if(n&&o===37&&t+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3))){i+=e.slice(t,t+3),t+=2;continue}if(o<128){i+=r[o];continue}if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&t+1<a){let n=e.charCodeAt(t+1);if(n>=56320&&n<=57343){i+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}i+=`%EF%BF%BD`;continue}i+=encodeURIComponent(e[t])}return i}var y,xe=o((()=>{y={},be.defaultChars=`;/?:@&=+$,-_.!~*'()#`,be.componentChars=`-_.!~*'()`}));function Se(e){let t=``;return t+=e.protocol||``,t+=e.slashes?`//`:``,t+=e.auth?e.auth+`@`:``,e.hostname&&e.hostname.indexOf(`:`)!==-1?t+=`[`+e.hostname+`]`:t+=e.hostname||``,t+=e.port?`:`+e.port:``,t+=e.pathname||``,t+=e.search||``,t+=e.hash||``,t}var Ce=o((()=>{}));function we(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}function Te(e,t){if(e&&e instanceof we)return e;let n=new we;return n.parse(e,t),n}var Ee,De,Oe,ke,b,Ae,x,je,Me,Ne,Pe,Fe,Ie=o((()=>{Ee=/^([a-z0-9.+-]+:)/i,De=/:[0-9]*$/,Oe=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,ke=[`{`,`}`,`|`,`\\`,`^`,"`",`<`,`>`,`"`,"`",` `,`\r`,`
`,`	`],b=[`'`].concat(ke),Ae=[`%`,`/`,`?`,`;`,`#`].concat(b),x=[`/`,`?`,`#`],je=255,Me=/^[+a-z0-9A-Z_-]{0,63}$/,Ne=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Pe={javascript:!0,"javascript:":!0},Fe={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},we.prototype.parse=function(e,t){let n,r,i,a=e;if(a=a.trim(),!t&&e.split(`#`).length===1){let e=Oe.exec(a);if(e)return this.pathname=e[1],e[2]&&(this.search=e[2]),this}let o=Ee.exec(a);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,a=a.substr(o.length)),(t||o||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(i=a.substr(0,2)===`//`,i&&!(o&&Pe[o])&&(a=a.substr(2),this.slashes=!0)),!Pe[o]&&(i||o&&!Fe[o])){let e=-1;for(let t=0;t<x.length;t++)r=a.indexOf(x[t]),r!==-1&&(e===-1||r<e)&&(e=r);let t,n;n=e===-1?a.lastIndexOf(`@`):a.lastIndexOf(`@`,e),n!==-1&&(t=a.slice(0,n),a=a.slice(n+1),this.auth=t),e=-1;for(let t=0;t<Ae.length;t++)r=a.indexOf(Ae[t]),r!==-1&&(e===-1||r<e)&&(e=r);e===-1&&(e=a.length),a[e-1]===`:`&&e--;let i=a.slice(0,e);a=a.slice(e),this.parseHost(i),this.hostname=this.hostname||``;let o=this.hostname[0]===`[`&&this.hostname[this.hostname.length-1]===`]`;if(!o){let e=this.hostname.split(/\./);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n&&!n.match(Me)){let r=``;for(let e=0,t=n.length;e<t;e++)n.charCodeAt(e)>127?r+=`x`:r+=n[e];if(!r.match(Me)){let r=e.slice(0,t),i=e.slice(t+1),o=n.match(Ne);o&&(r.push(o[1]),i.unshift(o[2])),i.length&&(a=i.join(`.`)+a),this.hostname=r.join(`.`);break}}}}this.hostname.length>je&&(this.hostname=``),o&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let s=a.indexOf(`#`);s!==-1&&(this.hash=a.substr(s),a=a.slice(0,s));let c=a.indexOf(`?`);return c!==-1&&(this.search=a.substr(c),a=a.slice(0,c)),a&&(this.pathname=a),Fe[n]&&this.hostname&&!this.pathname&&(this.pathname=``),this},we.prototype.parseHost=function(e){let t=De.exec(e);t&&(t=t[0],t!==`:`&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}})),Le=c({decode:()=>ge,encode:()=>be,format:()=>Se,parse:()=>Te}),Re=o((()=>{ve(),xe(),Ce(),Ie()})),ze,Be=o((()=>{ze=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/})),Ve,He=o((()=>{Ve=/[\0-\x1F\x7F-\x9F]/})),Ue,We=o((()=>{Ue=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/})),Ge,Ke=o((()=>{Ge=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/})),qe,Je=o((()=>{qe=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/})),Ye,Xe=o((()=>{Ye=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/})),Ze=c({Any:()=>ze,Cc:()=>Ve,Cf:()=>Ue,P:()=>Ge,S:()=>qe,Z:()=>Ye}),Qe=o((()=>{Be(),He(),We(),Ke(),Je(),Xe()})),$e,et=o((()=>{$e=new Uint16Array(`ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌`.split(``).map(e=>e.charCodeAt(0)))})),tt,nt=o((()=>{tt=new Uint16Array(`Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢`.split(``).map(e=>e.charCodeAt(0)))}));function rt(e){return e>=55296&&e<=57343||e>1114111?65533:it.get(e)??e}var it,at,ot=o((()=>{it=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),at=String.fromCodePoint??function(e){let t=``;return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),t+=String.fromCharCode(e),t}}));function st(e){return e>=S.ZERO&&e<=S.NINE}function ct(e){return e>=S.UPPER_A&&e<=S.UPPER_F||e>=S.LOWER_A&&e<=S.LOWER_F}function lt(e){return e>=S.UPPER_A&&e<=S.UPPER_Z||e>=S.LOWER_A&&e<=S.LOWER_Z||st(e)}function ut(e){return e===S.EQUALS||lt(e)}function dt(e){let t=``,n=new vt(e,e=>t+=at(e));return function(e,r){let i=0,a=0;for(;(a=e.indexOf(`&`,a))>=0;){t+=e.slice(i,a),n.startEntity(r);let o=n.write(e,a+1);if(o<0){i=a+n.end();break}i=a+o,a=o===0?i+1:i}let o=t+e.slice(i);return t=``,o}}function ft(e,t,n,r){let i=(t&gt.BRANCH_LENGTH)>>7,a=t&gt.JUMP_TABLE;if(i===0)return a!==0&&r===a?n:-1;if(a){let t=r-a;return t<0||t>=i?-1:e[n+t]-1}let o=n,s=o+i-1;for(;o<=s;){let t=o+s>>>1,n=e[t];if(n<r)o=t+1;else if(n>r)s=t-1;else return e[t+i]}return-1}function pt(e,t=_t.Legacy){return yt(e,t)}function mt(e){return yt(e,_t.Strict)}var S,ht,gt,C,_t,vt,yt,w=o((()=>{et(),nt(),ot(),(function(e){e[e.NUM=35]=`NUM`,e[e.SEMI=59]=`SEMI`,e[e.EQUALS=61]=`EQUALS`,e[e.ZERO=48]=`ZERO`,e[e.NINE=57]=`NINE`,e[e.LOWER_A=97]=`LOWER_A`,e[e.LOWER_F=102]=`LOWER_F`,e[e.LOWER_X=120]=`LOWER_X`,e[e.LOWER_Z=122]=`LOWER_Z`,e[e.UPPER_A=65]=`UPPER_A`,e[e.UPPER_F=70]=`UPPER_F`,e[e.UPPER_Z=90]=`UPPER_Z`})(S||={}),ht=32,(function(e){e[e.VALUE_LENGTH=49152]=`VALUE_LENGTH`,e[e.BRANCH_LENGTH=16256]=`BRANCH_LENGTH`,e[e.JUMP_TABLE=127]=`JUMP_TABLE`})(gt||={}),(function(e){e[e.EntityStart=0]=`EntityStart`,e[e.NumericStart=1]=`NumericStart`,e[e.NumericDecimal=2]=`NumericDecimal`,e[e.NumericHex=3]=`NumericHex`,e[e.NamedEntity=4]=`NamedEntity`})(C||={}),(function(e){e[e.Legacy=0]=`Legacy`,e[e.Strict=1]=`Strict`,e[e.Attribute=2]=`Attribute`})(_t||={}),vt=class{constructor(e,t,n){this.decodeTree=e,this.emitCodePoint=t,this.errors=n,this.state=C.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=_t.Strict}startEntity(e){this.decodeMode=e,this.state=C.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case C.EntityStart:return e.charCodeAt(t)===S.NUM?(this.state=C.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=C.NamedEntity,this.stateNamedEntity(e,t));case C.NumericStart:return this.stateNumericStart(e,t);case C.NumericDecimal:return this.stateNumericDecimal(e,t);case C.NumericHex:return this.stateNumericHex(e,t);case C.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(e.charCodeAt(t)|ht)===S.LOWER_X?(this.state=C.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=C.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,n,r){if(t!==n){let i=n-t;this.result=this.result*r**+i+parseInt(e.substr(t,i),r),this.consumed+=i}}stateNumericHex(e,t){let n=t;for(;t<e.length;){let r=e.charCodeAt(t);if(st(r)||ct(r))t+=1;else return this.addToNumericResult(e,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,n,t,16),-1}stateNumericDecimal(e,t){let n=t;for(;t<e.length;){let r=e.charCodeAt(t);if(st(r))t+=1;else return this.addToNumericResult(e,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,n,t,10),-1}emitNumericEntity(e,t){var n;if(this.consumed<=t)return(n=this.errors)==null||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===S.SEMI)this.consumed+=1;else if(this.decodeMode===_t.Strict)return 0;return this.emitCodePoint(rt(this.result),this.consumed),this.errors&&(e!==S.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){let{decodeTree:n}=this,r=n[this.treeIndex],i=(r&gt.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){let a=e.charCodeAt(t);if(this.treeIndex=ft(n,r,this.treeIndex+Math.max(1,i),a),this.treeIndex<0)return this.result===0||this.decodeMode===_t.Attribute&&(i===0||ut(a))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],i=(r&gt.VALUE_LENGTH)>>14,i!==0){if(a===S.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==_t.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;let{result:t,decodeTree:n}=this,r=(n[t]&gt.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(e=this.errors)==null||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,n){let{decodeTree:r}=this;return this.emitCodePoint(t===1?r[e]&~gt.VALUE_LENGTH:r[e+1],n),t===3&&this.emitCodePoint(r[e+2],n),n}end(){var e;switch(this.state){case C.NamedEntity:return this.result!==0&&(this.decodeMode!==_t.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case C.NumericDecimal:return this.emitNumericEntity(0,2);case C.NumericHex:return this.emitNumericEntity(0,3);case C.NumericStart:return(e=this.errors)==null||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case C.EntityStart:return 0}}},yt=dt($e),dt(tt)})),bt=o((()=>{w()})),xt=c({arrayReplaceAt:()=>Et,asciiTrim:()=>Bt,assign:()=>Tt,escapeHtml:()=>T,escapeRE:()=>Nt,fromCodePoint:()=>Ot,has:()=>wt,isMdAsciiPunct:()=>Lt,isPunctChar:()=>Ft,isPunctCharCode:()=>It,isSpace:()=>E,isString:()=>Ct,isValidEntityCode:()=>Dt,isWhiteSpace:()=>Pt,lib:()=>Yt,normalizeReference:()=>Rt,unescapeAll:()=>jt,unescapeMd:()=>At});function St(e){return Object.prototype.toString.call(e)}function Ct(e){return St(e)===`[object String]`}function wt(e,t){return Vt.call(e,t)}function Tt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!=`object`)throw TypeError(t+`must be object`);Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function Et(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function Dt(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)==65535||(e&65535)==65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Ot(e){if(e>65535){e-=65536;let t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}function kt(e,t){if(t.charCodeAt(0)===35&&Wt.test(t)){let n=t[1].toLowerCase()===`x`?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return Dt(n)?Ot(n):e}let n=pt(e);return n===e?e:n}function At(e){return e.indexOf(`\\`)<0?e:e.replace(Ht,`$1`)}function jt(e){return e.indexOf(`\\`)<0&&e.indexOf(`&`)<0?e:e.replace(Ut,function(e,t,n){return t||kt(e,n)})}function Mt(e){return qt[e]}function T(e){return Gt.test(e)?e.replace(Kt,Mt):e}function Nt(e){return e.replace(Jt,`\\$&`)}function E(e){switch(e){case 9:case 32:return!0}return!1}function Pt(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Ft(e){return Ge.test(e)||qe.test(e)}function It(e){return Ft(Ot(e))}function Lt(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Rt(e){return e=e.trim().replace(/\s+/g,` `),e.toLowerCase().toUpperCase()}function zt(e){return e===32||e===9||e===10||e===13}function Bt(e){let t=0;for(;t<e.length&&zt(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&zt(e.charCodeAt(n));n--);return e.slice(t,n+1)}var Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,D=o((()=>{Re(),Qe(),bt(),Vt=Object.prototype.hasOwnProperty,Ht=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Ut=RegExp(Ht.source+`|&([a-z#][a-z0-9]{1,31});`,`gi`),Wt=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i,Gt=/[&<>"]/,Kt=/[&<>"]/g,qt={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`},Jt=/[.?*+^$[\]\\(){}|-]/g,Yt={mdurl:Le,ucmicro:Ze}}));function Xt(e,t,n){let r,i,a,o,s=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<s;){if(a=e.src.charCodeAt(e.pos),a===93&&(r--,r===0)){i=!0;break}if(o=e.pos,e.md.inline.skipToken(e),a===91){if(o===e.pos-1)r++;else if(n)return e.pos=c,-1}}let l=-1;return i&&(l=e.pos),e.pos=c,l}var Zt=o((()=>{}));function Qt(e,t,n){let r,i=t,a={ok:!1,pos:0,str:``};if(e.charCodeAt(i)===60){for(i++;i<n;){if(r=e.charCodeAt(i),r===10||r===60)return a;if(r===62)return a.pos=i+1,a.str=jt(e.slice(t+1,i)),a.ok=!0,a;if(r===92&&i+1<n){i+=2;continue}i++}return a}let o=0;for(;i<n&&(r=e.charCodeAt(i),!(r===32||r<32||r===127));){if(r===92&&i+1<n){if(e.charCodeAt(i+1)===32)break;i+=2;continue}if(r===40&&(o++,o>32))return a;if(r===41){if(o===0)break;o--}i++}return t===i||o!==0?a:(a.str=jt(e.slice(t,i)),a.pos=i,a.ok=!0,a)}var $t=o((()=>{D()}));function en(e,t,n,r){let i,a=t,o={ok:!1,can_continue:!1,pos:0,str:``,marker:0};if(r)o.str=r.str,o.marker=r.marker;else{if(a>=n)return o;let r=e.charCodeAt(a);if(r!==34&&r!==39&&r!==40)return o;t++,a++,r===40&&(r=41),o.marker=r}for(;a<n;){if(i=e.charCodeAt(a),i===o.marker)return o.pos=a+1,o.str+=jt(e.slice(t,a)),o.ok=!0,o;if(i===40&&o.marker===41)return o;i===92&&a+1<n&&a++,a++}return o.can_continue=!0,o.str+=jt(e.slice(t,a)),o}var tn=o((()=>{D()})),nn=c({parseLinkDestination:()=>Qt,parseLinkLabel:()=>Xt,parseLinkTitle:()=>en}),rn=o((()=>{Zt(),$t(),tn()}));function an(){this.rules=Tt({},on)}var on,sn=o((()=>{D(),on={},on.code_inline=function(e,t,n,r,i){let a=e[t];return`<code`+i.renderAttrs(a)+`>`+T(a.content)+`</code>`},on.code_block=function(e,t,n,r,i){let a=e[t];return`<pre`+i.renderAttrs(a)+`><code>`+T(e[t].content)+`</code></pre>
`},on.fence=function(e,t,n,r,i){let a=e[t],o=a.info?jt(a.info).trim():``,s=``,c=``;if(o){let e=o.split(/(\s+)/g);s=e[0],c=e.slice(2).join(``)}let l;if(l=n.highlight&&n.highlight(a.content,s,c)||T(a.content),l.indexOf(`<pre`)===0)return l+`
`;if(o){let e=a.attrIndex(`class`),t=a.attrs?a.attrs.slice():[];e<0?t.push([`class`,n.langPrefix+s]):(t[e]=t[e].slice(),t[e][1]+=` `+n.langPrefix+s);let r={attrs:t};return`<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`}return`<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`},on.image=function(e,t,n,r,i){let a=e[t];return a.attrs[a.attrIndex(`alt`)][1]=i.renderInlineAsText(a.children,n,r),i.renderToken(e,t,n)},on.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`},on.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`},on.text=function(e,t){return T(e[t].content)},on.html_block=function(e,t){return e[t].content},on.html_inline=function(e,t){return e[t].content},an.prototype.renderAttrs=function(e){let t,n,r;if(!e.attrs)return``;for(r=``,t=0,n=e.attrs.length;t<n;t++)r+=` `+T(e.attrs[t][0])+`="`+T(e.attrs[t][1])+`"`;return r},an.prototype.renderToken=function(e,t,n){let r=e[t],i=``;if(r.hidden)return``;r.block&&r.nesting!==-1&&t&&e[t-1].hidden&&(i+=`
`),i+=(r.nesting===-1?`</`:`<`)+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=` /`);let a=!1;if(r.block&&(a=!0,r.nesting===1&&t+1<e.length)){let n=e[t+1];(n.type===`inline`||n.hidden||n.nesting===-1&&n.tag===r.tag)&&(a=!1)}return i+=a?`>
`:`>`,i},an.prototype.renderInline=function(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r},an.prototype.renderInlineAsText=function(e,t,n){let r=``;for(let i=0,a=e.length;i<a;i++)switch(e[i].type){case`text`:r+=e[i].content;break;case`image`:r+=this.renderInlineAsText(e[i].children,t,n);break;case`html_inline`:case`html_block`:r+=e[i].content;break;case`softbreak`:case`hardbreak`:r+=`
`}return r},an.prototype.render=function(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;o===`inline`?r+=this.renderInline(e[a].children,t,n):i[o]===void 0?r+=this.renderToken(e,a,t,n):r+=i[o](e,a,t,n,this)}return r}}));function O(){this.__rules__=[],this.__cache__=null}var cn=o((()=>{O.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1},O.prototype.__compile__=function(){let e=this,t=[``];e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){t.indexOf(e)<0&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})},O.prototype.at=function(e,t,n){let r=this.__find__(e),i=n||{};if(r===-1)throw Error(`Parser rule not found: `+e);this.__rules__[r].fn=t,this.__rules__[r].alt=i.alt||[],this.__cache__=null},O.prototype.before=function(e,t,n,r){let i=this.__find__(e),a=r||{};if(i===-1)throw Error(`Parser rule not found: `+e);this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:a.alt||[]}),this.__cache__=null},O.prototype.after=function(e,t,n,r){let i=this.__find__(e),a=r||{};if(i===-1)throw Error(`Parser rule not found: `+e);this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:a.alt||[]}),this.__cache__=null},O.prototype.push=function(e,t,n){let r=n||{};this.__rules__.push({name:e,enabled:!0,fn:t,alt:r.alt||[]}),this.__cache__=null},O.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(function(e){let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name `+e)}this.__rules__[r].enabled=!0,n.push(e)},this),this.__cache__=null,n},O.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(e){e.enabled=!1}),this.enable(e,t)},O.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(function(e){let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name `+e)}this.__rules__[r].enabled=!1,n.push(e)},this),this.__cache__=null,n},O.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]}}));function ln(e,t,n){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=n,this.level=0,this.children=null,this.content=``,this.markup=``,this.info=``,this.meta=null,this.block=!1,this.hidden=!1}var un=o((()=>{ln.prototype.attrIndex=function(e){if(!this.attrs)return-1;let t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1},ln.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},ln.prototype.attrSet=function(e,t){let n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r},ln.prototype.attrGet=function(e){let t=this.attrIndex(e),n=null;return t>=0&&(n=this.attrs[t][1]),n},ln.prototype.attrJoin=function(e,t){let n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=this.attrs[n][1]+` `+t}}));function dn(e,t,n){this.src=e,this.env=n,this.tokens=[],this.inlineMode=!1,this.md=t}var fn=o((()=>{un(),dn.prototype.Token=ln}));function pn(e){let t;t=e.src.replace(mn,`
`),t=t.replace(hn,`�`),e.src=t}var mn,hn,gn=o((()=>{mn=/\r\n?|\n/g,hn=/\0/g}));function _n(e){let t;e.inlineMode?(t=new e.Token(`inline`,``,0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}var vn=o((()=>{}));function yn(e){let t=e.tokens;for(let n=0,r=t.length;n<r;n++){let r=t[n];r.type===`inline`&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}var bn=o((()=>{}));function xn(e){return/^<a[>\s]/i.test(e)}function Sn(e){return/^<\/a\s*>/i.test(e)}function Cn(e){let t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!==`inline`||!e.md.linkify.pretest(t[n].content))continue;let r=t[n].children,i=0;for(let a=r.length-1;a>=0;a--){let o=r[a];if(o.type===`link_close`){for(a--;r[a].level!==o.level&&r[a].type!==`link_open`;)a--;continue}if(o.type===`html_inline`&&(xn(o.content)&&i>0&&i--,Sn(o.content)&&i++),!(i>0)&&o.type===`text`&&e.md.linkify.test(o.content)){let i=o.content,s=e.md.linkify.match(i),c=[],l=o.level,u=0;s.length>0&&s[0].index===0&&a>0&&r[a-1].type===`text_special`&&(s=s.slice(1));for(let t=0;t<s.length;t++){let n=s[t].url,r=e.md.normalizeLink(n);if(!e.md.validateLink(r))continue;let a=s[t].text;a=s[t].schema?s[t].schema===`mailto:`&&!/^mailto:/i.test(a)?e.md.normalizeLinkText(`mailto:`+a).replace(/^mailto:/,``):e.md.normalizeLinkText(a):e.md.normalizeLinkText(`http://`+a).replace(/^http:\/\//,``);let o=s[t].index;if(o>u){let t=new e.Token(`text`,``,0);t.content=i.slice(u,o),t.level=l,c.push(t)}let d=new e.Token(`link_open`,`a`,1);d.attrs=[[`href`,r]],d.level=l++,d.markup=`linkify`,d.info=`auto`,c.push(d);let f=new e.Token(`text`,``,0);f.content=a,f.level=l,c.push(f);let p=new e.Token(`link_close`,`a`,-1);p.level=--l,p.markup=`linkify`,p.info=`auto`,c.push(p),u=s[t].lastIndex}if(u<i.length){let t=new e.Token(`text`,``,0);t.content=i.slice(u),t.level=l,c.push(t)}t[n].children=r=Et(r,a,c)}}}}var wn=o((()=>{D()}));function Tn(e,t){return Mn[t.toLowerCase()]}function En(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&(r.content=r.content.replace(jn,Tn)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function Dn(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&kn.test(r.content)&&(r.content=r.content.replace(/\+-/g,`±`).replace(/\.{2,}/g,`…`).replace(/([?!])…/g,`$1..`).replace(/([?!]){4,}/g,`$1$1$1`).replace(/,{2,}/g,`,`).replace(/(^|[^-])---(?=[^-]|$)/gm,`$1—`).replace(/(^|\s)--(?=\s|$)/gm,`$1–`).replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,`$1–`)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function On(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&(An.test(e.tokens[t].content)&&En(e.tokens[t].children),kn.test(e.tokens[t].content)&&Dn(e.tokens[t].children))}var kn,An,jn,Mn,Nn=o((()=>{kn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,An=/\((c|tm|r)\)/i,jn=/\((c|tm|r)\)/gi,Mn={c:`©`,r:`®`,tm:`™`}}));function Pn(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function Fn(e,t){let n=``,r=0;t.sort((e,t)=>e.pos-t.pos);for(let i=0;i<t.length;i++){let a=t[i];n+=e.slice(r,a.pos)+a.ch,r=a.pos+1}return n+e.slice(r)}function In(e,t){let n,r=[],i={};for(let a=0;a<e.length;a++){let o=e[a],s=e[a].level;for(n=r.length-1;n>=0&&!(r[n].level<=s);n--);if(r.length=n+1,o.type!==`text`)continue;let c=o.content,l=0,u=c.length;OUTER:for(;l<u;){zn.lastIndex=l;let o=zn.exec(c);if(!o)break;let d=!0,f=!0;l=o.index+1;let p=o[0]===`'`,m=32;if(o.index-1>=0)m=c.charCodeAt(o.index-1);else for(n=a-1;n>=0&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n--)if(e[n].content){m=e[n].content.charCodeAt(e[n].content.length-1);break}let h=32;if(l<u)h=c.charCodeAt(l);else for(n=a+1;n<e.length&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n++)if(e[n].content){h=e[n].content.charCodeAt(0);break}let g=Lt(m)||It(m),_=Lt(h)||It(h),ee=Pt(m),te=Pt(h);if(te?d=!1:_&&(ee||g||(d=!1)),ee?f=!1:g&&(te||_||(f=!1)),h===34&&o[0]===`"`&&m>=48&&m<=57&&(f=d=!1),d&&f&&(d=g,f=_),!d&&!f){p&&Pn(i,a,o.index,Bn);continue}if(f)for(n=r.length-1;n>=0;n--){let e=r[n];if(r[n].level<s)break;if(e.single===p&&r[n].level===s){e=r[n];let s,c;p?(s=t.md.options.quotes[2],c=t.md.options.quotes[3]):(s=t.md.options.quotes[0],c=t.md.options.quotes[1]),Pn(i,a,o.index,c),Pn(i,e.token,e.pos,s),r.length=n;continue OUTER}}d?r.push({token:a,pos:o.index,single:p,level:s}):f&&p&&Pn(i,a,o.index,Bn)}}Object.keys(i).forEach(function(t){e[t].content=Fn(e[t].content,i[t])})}function Ln(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&Rn.test(e.tokens[t].content)&&In(e.tokens[t].children,e)}var Rn,zn,Bn,Vn=o((()=>{D(),Rn=/['"]/,zn=/['"]/g,Bn=`’`}));function Hn(e){let t,n,r=e.tokens,i=r.length;for(let e=0;e<i;e++){if(r[e].type!==`inline`)continue;let i=r[e].children,a=i.length;for(t=0;t<a;t++)i[t].type===`text_special`&&(i[t].type=`text`);for(t=n=0;t<a;t++)i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}}var Un=o((()=>{}));function Wn(){this.ruler=new O;for(let e=0;e<Gn.length;e++)this.ruler.push(Gn[e][0],Gn[e][1])}var Gn,Kn=o((()=>{cn(),fn(),gn(),vn(),bn(),wn(),Nn(),Vn(),Un(),Gn=[[`normalize`,pn],[`block`,_n],[`inline`,yn],[`linkify`,Cn],[`replacements`,On],[`smartquotes`,Ln],[`text_join`,Hn]],Wn.prototype.process=function(e){let t=this.ruler.getRules(``);for(let n=0,r=t.length;n<r;n++)t[n](e)},Wn.prototype.State=dn}));function qn(e,t,n,r){this.src=e,this.md=t,this.env=n,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType=`root`,this.level=0;let i=this.src;for(let e=0,t=0,n=0,r=0,a=i.length,o=!1;t<a;t++){let s=i.charCodeAt(t);if(!o){if(E(s)){n++,s===9?r+=4-r%4:r++;continue}o=!0}(s===10||t===a-1)&&(s!==10&&t++,this.bMarks.push(e),this.eMarks.push(t),this.tShift.push(n),this.sCount.push(r),this.bsCount.push(0),o=!1,n=0,r=0,e=t+1)}this.bMarks.push(i.length),this.eMarks.push(i.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}var Jn=o((()=>{un(),D(),qn.prototype.push=function(e,t,n){let r=new ln(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r},qn.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},qn.prototype.skipEmptyLines=function(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},qn.prototype.skipSpaces=function(e){for(let t=this.src.length;e<t&&E(this.src.charCodeAt(e));e++);return e},qn.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!E(this.src.charCodeAt(--e)))return e+1;return e},qn.prototype.skipChars=function(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e},qn.prototype.skipCharsBack=function(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e},qn.prototype.getLines=function(e,t,n,r){if(e>=t)return``;let i=Array(t-e);for(let a=0,o=e;o<t;o++,a++){let e=0,s=this.bMarks[o],c=s,l;for(l=o+1<t||r?this.eMarks[o]+1:this.eMarks[o];c<l&&e<n;){let t=this.src.charCodeAt(c);if(E(t))t===9?e+=4-(e+this.bsCount[o])%4:e++;else if(c-s<this.tShift[o])e++;else break;c++}e>n?i[a]=Array(e-n+1).join(` `)+this.src.slice(c,l):i[a]=this.src.slice(c,l)}return i.join(``)},qn.prototype.Token=ln}));function Yn(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function Xn(e){let t=[],n=e.length,r=0,i=e.charCodeAt(r),a=!1,o=0,s=``;for(;r<n;)i===124&&(a?(s+=e.substring(o,r-1),o=r):(t.push(s+e.substring(o,r)),s=``,o=r+1)),a=i===92,r++,i=e.charCodeAt(r);return t.push(s+e.substring(o)),t}function Zn(e,t,n,r){if(t+2>n)return!1;let i=t+1;if(e.sCount[i]<e.blkIndent||e.sCount[i]-e.blkIndent>=4)return!1;let a=e.bMarks[i]+e.tShift[i];if(a>=e.eMarks[i])return!1;let o=e.src.charCodeAt(a++);if(o!==124&&o!==45&&o!==58||a>=e.eMarks[i])return!1;let s=e.src.charCodeAt(a++);if(s!==124&&s!==45&&s!==58&&!E(s)||o===45&&E(s))return!1;for(;a<e.eMarks[i];){let t=e.src.charCodeAt(a);if(t!==124&&t!==45&&t!==58&&!E(t))return!1;a++}let c=Yn(e,t+1),l=c.split(`|`),u=[];for(let e=0;e<l.length;e++){let t=l[e].trim();if(!t){if(e===0||e===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(t))return!1;t.charCodeAt(t.length-1)===58?u.push(t.charCodeAt(0)===58?`center`:`right`):t.charCodeAt(0)===58?u.push(`left`):u.push(``)}if(c=Yn(e,t).trim(),c.indexOf(`|`)===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=Xn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop();let d=l.length;if(d===0||d!==u.length)return!1;if(r)return!0;let f=e.parentType;e.parentType=`table`;let p=e.md.block.ruler.getRules(`blockquote`),m=e.push(`table_open`,`table`,1),h=[t,0];m.map=h;let g=e.push(`thead_open`,`thead`,1);g.map=[t,t+1];let _=e.push(`tr_open`,`tr`,1);_.map=[t,t+1];for(let t=0;t<l.length;t++){let n=e.push(`th_open`,`th`,1);u[t]&&(n.attrs=[[`style`,`text-align:`+u[t]]]);let r=e.push(`inline`,``,0);r.content=l[t].trim(),r.children=[],e.push(`th_close`,`th`,-1)}e.push(`tr_close`,`tr`,-1),e.push(`thead_close`,`thead`,-1);let ee,te=0;for(i=t+2;i<n&&!(e.sCount[i]<e.blkIndent);i++){let r=!1;for(let t=0,a=p.length;t<a;t++)if(p[t](e,i,n,!0)){r=!0;break}if(r||(c=Yn(e,i).trim(),!c)||e.sCount[i]-e.blkIndent>=4||(l=Xn(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop(),te+=d-l.length,te>Qn))break;if(i===t+2){let n=e.push(`tbody_open`,`tbody`,1);n.map=ee=[t+2,0]}let a=e.push(`tr_open`,`tr`,1);a.map=[i,i+1];for(let t=0;t<d;t++){let n=e.push(`td_open`,`td`,1);u[t]&&(n.attrs=[[`style`,`text-align:`+u[t]]]);let r=e.push(`inline`,``,0);r.content=l[t]?l[t].trim():``,r.children=[],e.push(`td_close`,`td`,-1)}e.push(`tr_close`,`tr`,-1)}return ee&&(e.push(`tbody_close`,`tbody`,-1),ee[1]=i),e.push(`table_close`,`table`,-1),h[1]=i,e.parentType=f,e.line=i,!0}var Qn,$n=o((()=>{D(),Qn=65536}));function er(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,i=r;for(;r<n;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,i=r;continue}break}e.line=i;let a=e.push(`code_block`,`code`,0);return a.content=e.getLines(t,i,4+e.blkIndent,!1)+`
`,a.map=[t,e.line],!0}var tr=o((()=>{}));function nr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||i+3>a)return!1;let o=e.src.charCodeAt(i);if(o!==126&&o!==96)return!1;let s=i;i=e.skipChars(i,o);let c=i-s;if(c<3)return!1;let l=e.src.slice(s,i),u=e.src.slice(i,a);if(o===96&&u.indexOf(String.fromCharCode(o))>=0)return!1;if(r)return!0;let d=t,f=!1;for(;d++,!(d>=n||(i=s=e.bMarks[d]+e.tShift[d],a=e.eMarks[d],i<a&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(i)===o&&!(e.sCount[d]-e.blkIndent>=4)&&(i=e.skipChars(i,o),!(i-s<c)&&(i=e.skipSpaces(i),!(i<a)))){f=!0;break}c=e.sCount[t],e.line=d+ +!!f;let p=e.push(`fence`,`code`,0);return p.info=u,p.content=e.getLines(t+1,d,c,!0),p.markup=l,p.map=[t,e.line],!0}var rr=o((()=>{}));function ir(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==62)return!1;if(r)return!0;let s=[],c=[],l=[],u=[],d=e.md.block.ruler.getRules(`blockquote`),f=e.parentType;e.parentType=`blockquote`;let p=!1,m;for(m=t;m<n;m++){let t=e.sCount[m]<e.blkIndent;if(i=e.bMarks[m]+e.tShift[m],a=e.eMarks[m],i>=a)break;if(e.src.charCodeAt(i++)===62&&!t){let t=e.sCount[m]+1,n,r;e.src.charCodeAt(i)===32?(i++,t++,r=!1,n=!0):e.src.charCodeAt(i)===9?(n=!0,(e.bsCount[m]+t)%4==3?(i++,t++,r=!1):r=!0):n=!1;let o=t;for(s.push(e.bMarks[m]),e.bMarks[m]=i;i<a;){let t=e.src.charCodeAt(i);if(E(t))t===9?o+=4-(o+e.bsCount[m]+ +!!r)%4:o++;else break;i++}p=i>=a,c.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+ +!!n,l.push(e.sCount[m]),e.sCount[m]=o-t,u.push(e.tShift[m]),e.tShift[m]=i-e.bMarks[m];continue}if(p)break;let r=!1;for(let t=0,i=d.length;t<i;t++)if(d[t](e,m,n,!0)){r=!0;break}if(r){e.lineMax=m,e.blkIndent!==0&&(s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]=-1}let h=e.blkIndent;e.blkIndent=0;let g=e.push(`blockquote_open`,`blockquote`,1);g.markup=`>`;let _=[t,0];g.map=_,e.md.block.tokenize(e,t,m);let ee=e.push(`blockquote_close`,`blockquote`,-1);ee.markup=`>`,e.lineMax=o,e.parentType=f,_[1]=e.line;for(let n=0;n<u.length;n++)e.bMarks[n+t]=s[n],e.tShift[n+t]=u[n],e.sCount[n+t]=l[n],e.bsCount[n+t]=c[n];return e.blkIndent=h,!0}var ar=o((()=>{D()}));function or(e,t,n,r){let i=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.bMarks[t]+e.tShift[t],o=e.src.charCodeAt(a++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;a<i;){let t=e.src.charCodeAt(a++);if(t!==o&&!E(t))return!1;t===o&&s++}if(s<3)return!1;if(r)return!0;e.line=t+1;let c=e.push(`hr`,`hr`,0);return c.map=[t,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}var sr=o((()=>{D()}));function cr(e,t){let n=e.eMarks[t],r=e.bMarks[t]+e.tShift[t],i=e.src.charCodeAt(r++);return i!==42&&i!==45&&i!==43||r<n&&!E(e.src.charCodeAt(r))?-1:r}function lr(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t],i=n;if(i+1>=r)return-1;let a=e.src.charCodeAt(i++);if(a<48||a>57)return-1;for(;;){if(i>=r)return-1;if(a=e.src.charCodeAt(i++),a>=48&&a<=57){if(i-n>=10)return-1;continue}if(a===41||a===46)break;return-1}return i<r&&(a=e.src.charCodeAt(i),!E(a))?-1:i}function ur(e,t){let n=e.level+2;for(let r=t+2,i=e.tokens.length-2;r<i;r++)e.tokens[r].level===n&&e.tokens[r].type===`paragraph_open`&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function dr(e,t,n,r){let i,a,o,s,c=t,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let u=!1;r&&e.parentType===`paragraph`&&e.sCount[c]>=e.blkIndent&&(u=!0);let d,f,p;if((p=lr(e,c))>=0){if(d=!0,o=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(o,p-1)),u&&f!==1)return!1}else if((p=cr(e,c))>=0)d=!1;else return!1;if(u&&e.skipSpaces(p)>=e.eMarks[c])return!1;if(r)return!0;let m=e.src.charCodeAt(p-1),h=e.tokens.length;d?(s=e.push(`ordered_list_open`,`ol`,1),f!==1&&(s.attrs=[[`start`,f]])):s=e.push(`bullet_list_open`,`ul`,1);let g=[c,0];s.map=g,s.markup=String.fromCharCode(m);let _=!1,ee=e.md.block.ruler.getRules(`list`),te=e.parentType;for(e.parentType=`list`;c<n;){a=p,i=e.eMarks[c];let t=e.sCount[c]+p-(e.bMarks[c]+e.tShift[c]),r=t;for(;a<i;){let t=e.src.charCodeAt(a);if(t===9)r+=4-(r+e.bsCount[c])%4;else if(t===32)r++;else break;a++}let u=a,f;f=u>=i?1:r-t,f>4&&(f=1);let h=t+f;s=e.push(`list_item_open`,`li`,1),s.markup=String.fromCharCode(m);let g=[c,0];s.map=g,d&&(s.info=e.src.slice(o,p-1));let te=e.tight,ne=e.tShift[c],re=e.sCount[c],ie=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=h,e.tight=!0,e.tShift[c]=u-e.bMarks[c],e.sCount[c]=r,u>=i&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n,!0),(!e.tight||_)&&(l=!1),_=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ie,e.tShift[c]=ne,e.sCount[c]=re,e.tight=te,s=e.push(`list_item_close`,`li`,-1),s.markup=String.fromCharCode(m),c=e.line,g[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let ae=!1;for(let t=0,r=ee.length;t<r;t++)if(ee[t](e,c,n,!0)){ae=!0;break}if(ae)break;if(d){if(p=lr(e,c),p<0)break;o=e.bMarks[c]+e.tShift[c]}else if(p=cr(e,c),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return s=d?e.push(`ordered_list_close`,`ol`,-1):e.push(`bullet_list_close`,`ul`,-1),s.markup=String.fromCharCode(m),g[1]=c,e.line=c,e.parentType=te,l&&ur(e,h),!0}var fr=o((()=>{D()}));function pr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=t+1;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==91)return!1;function s(t){let n=e.lineMax;if(t>=n||e.isEmpty(t))return null;let r=!1;if(e.sCount[t]-e.blkIndent>3&&(r=!0),e.sCount[t]<0&&(r=!0),!r){let r=e.md.block.ruler.getRules(`reference`),i=e.parentType;e.parentType=`reference`;let a=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,t,n,!0)){a=!0;break}if(e.parentType=i,a)return null}let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];return e.src.slice(i,a+1)}let c=e.src.slice(i,a+1);a=c.length;let l=-1;for(i=1;i<a;i++){let e=c.charCodeAt(i);if(e===91)return!1;if(e===93){l=i;break}if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(e===92&&(i++,i<a&&c.charCodeAt(i)===10)){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}}if(l<0||c.charCodeAt(l+1)!==58)return!1;for(i=l+2;i<a;i++){let e=c.charCodeAt(i);if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(!E(e))break}let u=e.md.helpers.parseLinkDestination(c,i,a);if(!u.ok)return!1;let d=e.md.normalizeLink(u.str);if(!e.md.validateLink(d))return!1;i=u.pos;let f=i,p=o,m=i;for(;i<a;i++){let e=c.charCodeAt(i);if(e===10){let e=s(o);e!==null&&(c+=e,a=c.length,o++)}else if(!E(e))break}let h=e.md.helpers.parseLinkTitle(c,i,a);for(;h.can_continue;){let t=s(o);if(t===null)break;c+=t,i=a,a=c.length,o++,h=e.md.helpers.parseLinkTitle(c,i,a,h)}let g;for(i<a&&m!==i&&h.ok?(g=h.str,i=h.pos):(g=``,i=f,o=p);i<a&&E(c.charCodeAt(i));)i++;if(i<a&&c.charCodeAt(i)!==10&&g)for(g=``,i=f,o=p;i<a&&E(c.charCodeAt(i));)i++;if(i<a&&c.charCodeAt(i)!==10)return!1;let _=Rt(c.slice(1,l));return _?r?!0:(e.env.references===void 0&&(e.env.references={}),e.env.references[_]===void 0&&(e.env.references[_]={title:g,href:d}),e.line=o,!0):!1}var mr=o((()=>{D()})),hr,gr=o((()=>{hr=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`)})),_r,vr,yr,br,xr=o((()=>{_r=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,vr=`<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>`,yr=RegExp(`^(?:`+_r+`|`+vr+`|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`),br=RegExp(`^(?:`+_r+`|`+vr+`)`)}));function Sr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(i)!==60)return!1;let o=e.src.slice(i,a),s=0;for(;s<Cr.length&&!Cr[s][0].test(o);s++);if(s===Cr.length)return!1;if(r)return Cr[s][2];let c=t+1,l=Cr[s][1].test(``);if(!Cr[s][1].test(o)){for(;c<n&&!(e.sCount[c]<e.blkIndent&&(l||!e.isEmpty(c)));c++)if(i=e.bMarks[c]+e.tShift[c],a=e.eMarks[c],o=e.src.slice(i,a),Cr[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;let u=e.push(`html_block`,``,0);return u.map=[t,c],u.content=e.getLines(t,c,e.blkIndent,!0),!0}var Cr,wr=o((()=>{gr(),xr(),Cr=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[RegExp(`^</?(`+hr.join(`|`)+`)(?=(\\s|/?>|$))`,`i`),/^$/,!0],[RegExp(br.source+`\\s*$`),/^$/,!1]]}));function Tr(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(i);if(o!==35||i>=a)return!1;let s=1;for(o=e.src.charCodeAt(++i);o===35&&i<a&&s<=6;)s++,o=e.src.charCodeAt(++i);if(s>6||i<a&&!E(o))return!1;if(r)return!0;a=e.skipSpacesBack(a,i);let c=e.skipCharsBack(a,35,i);c>i&&E(e.src.charCodeAt(c-1))&&(a=c),e.line=t+1;let l=e.push(`heading_open`,`h`+String(s),1);l.markup=`########`.slice(0,s),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=Bt(e.src.slice(i,a)),u.map=[t,e.line],u.children=[];let d=e.push(`heading_close`,`h`+String(s),-1);return d.markup=`########`.slice(0,s),!0}var Er=o((()=>{D()}));function Dr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`);if(e.sCount[t]-e.blkIndent>=4)return!1;let i=e.parentType;e.parentType=`paragraph`;let a=0,o,s=t+1;for(;s<n&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let t=e.bMarks[s]+e.tShift[s],n=e.eMarks[s];if(t<n&&(o=e.src.charCodeAt(t),(o===45||o===61)&&(t=e.skipChars(t,o),t=e.skipSpaces(t),t>=n))){a=o===61?1:2;break}}if(e.sCount[s]<0)continue;let t=!1;for(let i=0,a=r.length;i<a;i++)if(r[i](e,s,n,!0)){t=!0;break}if(t)break}if(!a)return e.parentType=i,!1;let c=Bt(e.getLines(t,s,e.blkIndent,!1));e.line=s+1;let l=e.push(`heading_open`,`h`+String(a),1);l.markup=String.fromCharCode(o),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=c,u.map=[t,e.line-1],u.children=[];let d=e.push(`heading_close`,`h`+String(a),-1);return d.markup=String.fromCharCode(o),e.parentType=i,!0}var Or=o((()=>{D()}));function kr(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`),i=e.parentType,a=t+1;for(e.parentType=`paragraph`;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let t=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,a,n,!0)){t=!0;break}if(t)break}let o=Bt(e.getLines(t,a,e.blkIndent,!1));e.line=a;let s=e.push(`paragraph_open`,`p`,1);s.map=[t,e.line];let c=e.push(`inline`,``,0);return c.content=o,c.map=[t,e.line],c.children=[],e.push(`paragraph_close`,`p`,-1),e.parentType=i,!0}var Ar=o((()=>{D()}));function jr(){this.ruler=new O;for(let e=0;e<Mr.length;e++)this.ruler.push(Mr[e][0],Mr[e][1],{alt:(Mr[e][2]||[]).slice()})}var Mr,Nr=o((()=>{cn(),Jn(),$n(),tr(),rr(),ar(),sr(),fr(),mr(),wr(),Er(),Or(),Ar(),Mr=[[`table`,Zn,[`paragraph`,`reference`]],[`code`,er],[`fence`,nr,[`paragraph`,`reference`,`blockquote`,`list`]],[`blockquote`,ir,[`paragraph`,`reference`,`blockquote`,`list`]],[`hr`,or,[`paragraph`,`reference`,`blockquote`,`list`]],[`list`,dr,[`paragraph`,`reference`,`blockquote`]],[`reference`,pr],[`html_block`,Sr,[`paragraph`,`reference`,`blockquote`]],[`heading`,Tr,[`paragraph`,`reference`,`blockquote`]],[`lheading`,Dr],[`paragraph`,kr]],jr.prototype.tokenize=function(e,t,n){let r=this.ruler.getRules(``),i=r.length,a=e.md.options.maxNesting,o=t,s=!1;for(;o<n&&(e.line=o=e.skipEmptyLines(o),!(o>=n||e.sCount[o]<e.blkIndent));){if(e.level>=a){e.line=n;break}let t=e.line,c=!1;for(let a=0;a<i;a++)if(c=r[a](e,o,n,!1),c){if(t>=e.line)throw Error(`block rule didn't increment state.line`);break}if(!c)throw Error(`none of the block rules matched`);e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<n&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}},jr.prototype.parse=function(e,t,n,r){if(!e)return;let i=new this.State(e,t,n,r);this.tokenize(i,i.line,i.lineMax)},jr.prototype.State=qn}));function Pr(e,t,n,r){this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending=``,this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}var Fr=o((()=>{un(),D(),Pr.prototype.pushPending=function(){let e=new ln(`text`,``,0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending=``,e},Pr.prototype.push=function(e,t,n){this.pending&&this.pushPending();let r=new ln(e,t,n),i=null;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],i={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(i),r},Pr.prototype.scanDelims=function(e,t){let n=this.posMax,r=this.src.charCodeAt(e),i;if(e===0)i=32;else if(e===1)i=this.src.charCodeAt(0),(i&63488)==55296&&(i=65533);else if(i=this.src.charCodeAt(e-1),(i&64512)==56320){let t=this.src.charCodeAt(e-2);i=(t&64512)==55296?65536+(t-55296<<10)+(i-56320):65533}else(i&64512)==55296&&(i=65533);let a=e;for(;a<n&&this.src.charCodeAt(a)===r;)a++;let o=a-e,s=a<n?this.src.charCodeAt(a):32;if((s&64512)==55296){let e=this.src.charCodeAt(a+1);s=(e&64512)==56320?65536+(s-55296<<10)+(e-56320):65533}else(s&64512)==56320&&(s=65533);let c=Lt(i)||It(i),l=Lt(s)||It(s),u=Pt(i),d=Pt(s),f=!d&&(!l||u||c),p=!u&&(!c||d||l);return{can_open:f&&(t||!p||c),can_close:p&&(t||!f||l),length:o}},Pr.prototype.Token=ln}));function Ir(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Lr(e,t){let n=e.pos;for(;n<e.posMax&&!Ir(e.src.charCodeAt(n));)n++;return n!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}var Rr=o((()=>{}));function zr(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;let n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;let i=e.pending.match(Br);if(!i)return!1;let a=i[1],o=e.md.linkify.matchAtStart(e.src.slice(n-a.length));if(!o)return!1;let s=o.url;if(s.length<=a.length)return!1;let c=s.length;for(;c>0&&s.charCodeAt(c-1)===42;)c--;c!==s.length&&(s=s.slice(0,c));let l=e.md.normalizeLink(s);if(!e.md.validateLink(l))return!1;if(!t){e.pending=e.pending.slice(0,-a.length);let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,l]],t.markup=`linkify`,t.info=`auto`;let n=e.push(`text`,``,0);n.content=e.md.normalizeLinkText(s);let r=e.push(`link_close`,`a`,-1);r.markup=`linkify`,r.info=`auto`}return e.pos+=s.length-a.length,!0}var Br,Vr=o((()=>{Br=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i}));function Hr(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;let r=e.pending.length-1,i=e.posMax;if(!t){if(r>=0&&e.pending.charCodeAt(r)===32){if(r>=1&&e.pending.charCodeAt(r-1)===32){let t=r-1;for(;t>=1&&e.pending.charCodeAt(t-1)===32;)t--;e.pending=e.pending.slice(0,t),e.push(`hardbreak`,`br`,0)}else e.pending=e.pending.slice(0,-1),e.push(`softbreak`,`br`,0)}else e.push(`softbreak`,`br`,0)}for(n++;n<i&&E(e.src.charCodeAt(n));)n++;return e.pos=n,!0}var Ur=o((()=>{D()}));function Wr(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let i=e.src.charCodeAt(n);if(i===10){for(t||e.push(`hardbreak`,`br`,0),n++;n<r&&(i=e.src.charCodeAt(n),E(i));)n++;return e.pos=n,!0}if(i===32){if(!t){let t=e.push(`text_special`,``,0);t.content=`\\`,t.markup=`\\`,t.info=`escape`}return e.pos=n,!0}let a=e.src[n];if(i>=55296&&i<=56319&&n+1<r){let t=e.src.charCodeAt(n+1);t>=56320&&t<=57343&&(a+=e.src[n+1],n++)}let o=`\\`+a;if(!t){let t=e.push(`text_special`,``,0);t.content=i<256&&Gr[i]!==0?a:o,t.markup=o,t.info=`escape`}return e.pos=n+1,!0}var Gr,Kr=o((()=>{D(),Gr=[];for(let e=0;e<256;e++)Gr.push(0);`\\!"#$%&'()*+,./:;<=>?@[]^_\`{|}~-`.split(``).forEach(function(e){Gr[e.charCodeAt(0)]=1})}));function qr(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==96)return!1;let r=n;n++;let i=e.posMax;for(;n<i&&e.src.charCodeAt(n)===96;)n++;let a=e.src.slice(r,n),o=a.length;if(e.backticksScanned&&(e.backticks[o]||0)<=r)return t||(e.pending+=a),e.pos+=o,!0;let s=n,c;for(;(c=e.src.indexOf("`",s))!==-1;){for(s=c+1;s<i&&e.src.charCodeAt(s)===96;)s++;let r=s-c;if(r===o){if(!t){let t=e.push(`code_inline`,`code`,0);t.markup=a,t.content=e.src.slice(n,c).replace(/\n/g,` `).replace(/^ (.+) $/,`$1`)}return e.pos=s,!0}e.backticks[r]=c}return e.backticksScanned=!0,t||(e.pending+=a),e.pos+=o,!0}var Jr=o((()=>{}));function Yr(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;let i=e.scanDelims(e.pos,!0),a=i.length,o=String.fromCharCode(r);if(a<2)return!1;let s;a%2&&(s=e.push(`text`,``,0),s.content=o,a--);for(let t=0;t<a;t+=2)s=e.push(`text`,``,0),s.content=o+o,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close});return e.pos+=i.length,!0}function Xr(e,t){let n,r=[],i=t.length;for(let a=0;a<i;a++){let i=t[a];if(i.marker!==126||i.end===-1)continue;let o=t[i.end];n=e.tokens[i.token],n.type=`s_open`,n.tag=`s`,n.nesting=1,n.markup=`~~`,n.content=``,n=e.tokens[o.token],n.type=`s_close`,n.tag=`s`,n.nesting=-1,n.markup=`~~`,n.content=``,e.tokens[o.token-1].type===`text`&&e.tokens[o.token-1].content===`~`&&r.push(o.token-1)}for(;r.length;){let t=r.pop(),i=t+1;for(;i<e.tokens.length&&e.tokens[i].type===`s_close`;)i++;i--,t!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[t],e.tokens[t]=n)}}function Zr(e){let t=e.tokens_meta,n=e.tokens_meta.length;Xr(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&Xr(e,t[r].delimiters)}var Qr,$r=o((()=>{Qr={tokenize:Yr,postProcess:Zr}}));function ei(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;let i=e.scanDelims(e.pos,r===42);for(let t=0;t<i.length;t++){let t=e.push(`text`,``,0);t.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:i.length,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close})}return e.pos+=i.length,!0}function ti(e,t){let n=t.length;for(let r=n-1;r>=0;r--){let n=t[r];if(n.marker!==95&&n.marker!==42||n.end===-1)continue;let i=t[n.end],a=r>0&&t[r-1].end===n.end+1&&t[r-1].marker===n.marker&&t[r-1].token===n.token-1&&t[n.end+1].token===i.token+1,o=String.fromCharCode(n.marker),s=e.tokens[n.token];s.type=a?`strong_open`:`em_open`,s.tag=a?`strong`:`em`,s.nesting=1,s.markup=a?o+o:o,s.content=``;let c=e.tokens[i.token];c.type=a?`strong_close`:`em_close`,c.tag=a?`strong`:`em`,c.nesting=-1,c.markup=a?o+o:o,c.content=``,a&&(e.tokens[t[r-1].token].content=``,e.tokens[t[n.end+1].token].content=``,r--)}}function ni(e){let t=e.tokens_meta,n=e.tokens_meta.length;ti(e,e.delimiters);for(let r=0;r<n;r++)t[r]&&t[r].delimiters&&ti(e,t[r].delimiters)}var ri,ii=o((()=>{ri={tokenize:ei,postProcess:ni}}));function ai(e,t){let n,r,i,a,o=``,s=``,c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let u=e.pos,d=e.posMax,f=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<d&&e.src.charCodeAt(m)===40){for(l=!1,m++;m<d&&(n=e.src.charCodeAt(m),E(n)||n===10);m++);if(m>=d)return!1;if(c=m,i=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),i.ok){for(o=e.md.normalizeLink(i.str),e.md.validateLink(o)?m=i.pos:o=``,c=m;m<d&&(n=e.src.charCodeAt(m),E(n)||n===10);m++);if(i=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<d&&c!==m&&i.ok)for(s=i.str,m=i.pos;m<d&&(n=e.src.charCodeAt(m),E(n)||n===10);m++);}(m>=d||e.src.charCodeAt(m)!==41)&&(l=!0),m++}if(l){if(e.env.references===void 0)return!1;if(m<d&&e.src.charCodeAt(m)===91?(c=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?r=e.src.slice(c,m++):m=p+1):m=p+1,r||=e.src.slice(f,p),a=e.env.references[Rt(r)],!a)return e.pos=u,!1;o=a.href,s=a.title}if(!t){e.pos=f,e.posMax=p;let t=e.push(`link_open`,`a`,1),n=[[`href`,o]];t.attrs=n,s&&n.push([`title`,s]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push(`link_close`,`a`,-1)}return e.pos=m,e.posMax=d,!0}var oi=o((()=>{D()}));function si(e,t){let n,r,i,a,o,s,c,l,u=``,d=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(a=m+1,a<f&&e.src.charCodeAt(a)===40){for(a++;a<f&&(n=e.src.charCodeAt(a),E(n)||n===10);a++);if(a>=f)return!1;for(l=a,s=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),s.ok&&(u=e.md.normalizeLink(s.str),e.md.validateLink(u)?a=s.pos:u=``),l=a;a<f&&(n=e.src.charCodeAt(a),E(n)||n===10);a++);if(s=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<f&&l!==a&&s.ok)for(c=s.str,a=s.pos;a<f&&(n=e.src.charCodeAt(a),E(n)||n===10);a++);else c=``;if(a>=f||e.src.charCodeAt(a)!==41)return e.pos=d,!1;a++}else{if(e.env.references===void 0)return!1;if(a<f&&e.src.charCodeAt(a)===91?(l=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?i=e.src.slice(l,a++):a=m+1):a=m+1,i||=e.src.slice(p,m),o=e.env.references[Rt(i)],!o)return e.pos=d,!1;u=o.href,c=o.title}if(!t){r=e.src.slice(p,m);let t=[];e.md.inline.parse(r,e.md,e.env,t);let n=e.push(`image`,`img`,0),i=[[`src`,u],[`alt`,``]];n.attrs=i,n.children=t,n.content=r,c&&i.push([`title`,c])}return e.pos=a,e.posMax=f,!0}var ci=o((()=>{D()}));function li(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;let r=e.pos,i=e.posMax;for(;;){if(++n>=i)return!1;let t=e.src.charCodeAt(n);if(t===60)return!1;if(t===62)break}let a=e.src.slice(r+1,n);if(di.test(a)){let n=e.md.normalizeLink(a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}if(ui.test(a)){let n=e.md.normalizeLink(`mailto:`+a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}return!1}var ui,di,fi=o((()=>{ui=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,di=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/}));function pi(e){return/^<a[>\s]/i.test(e)}function mi(e){return/^<\/a\s*>/i.test(e)}function hi(e){let t=e|32;return t>=97&&t<=122}function gi(e,t){if(!e.md.options.html)return!1;let n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;let i=e.src.charCodeAt(r+1);if(i!==33&&i!==63&&i!==47&&!hi(i))return!1;let a=e.src.slice(r).match(yr);if(!a)return!1;if(!t){let t=e.push(`html_inline`,``,0);t.content=a[0],pi(t.content)&&e.linkLevel++,mi(t.content)&&e.linkLevel--}return e.pos+=a[0].length,!0}var _i=o((()=>{xr()}));function vi(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){let r=e.src.slice(n).match(yi);if(r){if(!t){let t=r[1][0].toLowerCase()===`x`?parseInt(r[1].slice(1),16):parseInt(r[1],10),n=e.push(`text_special`,``,0);n.content=Dt(t)?Ot(t):Ot(65533),n.markup=r[0],n.info=`entity`}return e.pos+=r[0].length,!0}}else{let r=e.src.slice(n).match(bi);if(r){let n=mt(r[0]);if(n!==r[0]){if(!t){let t=e.push(`text_special`,``,0);t.content=n,t.markup=r[0],t.info=`entity`}return e.pos+=r[0].length,!0}}}return!1}var yi,bi,xi=o((()=>{bt(),D(),yi=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,bi=/^&([a-z][a-z0-9]{1,31});/i}));function Si(e){let t={},n=e.length;if(!n)return;let r=0,i=-2,a=[];for(let o=0;o<n;o++){let n=e[o];if(a.push(0),(e[r].marker!==n.marker||i!==n.token-1)&&(r=o),i=n.token,n.length=n.length||0,!n.close)continue;t.hasOwnProperty(n.marker)||(t[n.marker]=[-1,-1,-1,-1,-1,-1]);let s=t[n.marker][(n.open?3:0)+n.length%3],c=r-a[r]-1,l=c;for(;c>s;c-=a[c]+1){let t=e[c];if(t.marker===n.marker&&t.open&&t.end<0){let r=!1;if((t.close||n.open)&&(t.length+n.length)%3==0&&(t.length%3!=0||n.length%3!=0)&&(r=!0),!r){let r=c>0&&!e[c-1].open?a[c-1]+1:0;a[o]=o-c+r,a[c]=r,n.open=!1,t.end=o,t.close=!1,l=-1,i=-2;break}}}l!==-1&&(t[n.marker][(n.open?3:0)+(n.length||0)%3]=l)}}function Ci(e){let t=e.tokens_meta,n=e.tokens_meta.length;Si(e.delimiters);for(let e=0;e<n;e++)t[e]&&t[e].delimiters&&Si(t[e].delimiters)}var wi=o((()=>{}));function Ti(e){let t,n,r=0,i=e.tokens,a=e.tokens.length;for(t=n=0;t<a;t++)i[t].nesting<0&&r--,i[t].level=r,i[t].nesting>0&&r++,i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}var Ei=o((()=>{}));function Di(){this.ruler=new O;for(let e=0;e<Oi.length;e++)this.ruler.push(Oi[e][0],Oi[e][1]);this.ruler2=new O;for(let e=0;e<ki.length;e++)this.ruler2.push(ki[e][0],ki[e][1])}var Oi,ki,Ai=o((()=>{cn(),Fr(),Rr(),Vr(),Ur(),Kr(),Jr(),$r(),ii(),oi(),ci(),fi(),_i(),xi(),wi(),Ei(),Oi=[[`text`,Lr],[`linkify`,zr],[`newline`,Hr],[`escape`,Wr],[`backticks`,qr],[`strikethrough`,Qr.tokenize],[`emphasis`,ri.tokenize],[`link`,ai],[`image`,si],[`autolink`,li],[`html_inline`,gi],[`entity`,vi]],ki=[[`balance_pairs`,Ci],[`strikethrough`,Qr.postProcess],[`emphasis`,ri.postProcess],[`fragments_join`,Ti]],Di.prototype.skipToken=function(e){let t=e.pos,n=this.ruler.getRules(``),r=n.length,i=e.md.options.maxNesting,a=e.cache;if(a[t]!==void 0){e.pos=a[t];return}let o=!1;if(e.level<i){for(let i=0;i<r;i++)if(e.level++,o=n[i](e,!0),e.level--,o){if(t>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}else e.pos=e.posMax;o||e.pos++,a[t]=e.pos},Di.prototype.tokenize=function(e){let t=this.ruler.getRules(``),n=t.length,r=e.posMax,i=e.md.options.maxNesting;for(;e.pos<r;){let a=e.pos,o=!1;if(e.level<i){for(let r=0;r<n;r++)if(o=t[r](e,!1),o){if(a>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}if(o){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},Di.prototype.parse=function(e,t,n,r){let i=new this.State(e,t,n,r);this.tokenize(i);let a=this.ruler2.getRules(``),o=a.length;for(let e=0;e<o;e++)a[e](i)},Di.prototype.State=Pr}));function ji(e){let t={};e||={},t.src_Any=ze.source,t.src_Cc=Ve.source,t.src_Z=Ye.source,t.src_P=Ge.source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join(`|`),t.src_ZCc=[t.src_Z,t.src_Cc].join(`|`);let n=`[><｜]`;return t.src_pseudo_letter=`(?:(?!${n}|${t.src_ZPCc})${t.src_Any})`,t.src_ip4=`(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`,t.src_auth=`(?:(?:(?!${t.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,t.src_port=`(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?`,t.src_host_terminator=`(?=$|${n}|${t.src_ZPCc})(?!${e[`---`]?`-(?!--)|`:`-|`}_|:\\d|\\.-|\\.(?!$|${t.src_ZPCc}))`,t.src_path=`(?:[/?#](?:(?!${t.src_ZCc}|${n}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${t.src_ZCc}|\\]).)*\\]|\\((?:(?!${t.src_ZCc}|[)]).)*\\)|\\{(?:(?!${t.src_ZCc}|[}]).)*\\}|\\"(?:(?!${t.src_ZCc}|["]).)+\\"|\\'(?:(?!${t.src_ZCc}|[']).)+\\'|\\'(?=${t.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${t.src_ZCc}|[.]|$)|`+(e[`---`]?`\\-(?!--(?:[^-]|$))(?:-*)|`:`\\-+|`)+`,(?!${t.src_ZCc}|$)|;(?!${t.src_ZCc}|$)|\\!+(?!${t.src_ZCc}|[!]|$)|\\?(?!${t.src_ZCc}|[?]|$))+|\\/)?`,t.src_email_name=`[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}`,t.src_xn=`xn--[a-z0-9\\-]{1,59}`,t.src_domain_root=`(?:`+t.src_xn+`|${t.src_pseudo_letter}{1,63})`,t.src_domain=`(?:`+t.src_xn+`|(?:${t.src_pseudo_letter})|(?:${t.src_pseudo_letter}(?:-|${t.src_pseudo_letter}){0,61}${t.src_pseudo_letter}))`,t.src_host=`(?:(?:(?:(?:${t.src_domain})\\.)*${t.src_domain}))`,t.tpl_host_fuzzy=`(?:`+t.src_ip4+`|(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%)))`,t.tpl_host_no_ip_fuzzy=`(?:(?:(?:${t.src_domain})\\.)+(?:%TLDS%))`,t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${t.src_ZPCc}|>|$))`,t.tpl_email_fuzzy=`(^|${n}|"|\\(|${t.src_ZCc})(${t.src_email_name}@${t.tpl_host_fuzzy_strict})`,t.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_fuzzy_strict}${t.src_path})`,t.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${t.src_ZPCc}))((?![$+<=>^\`|\uff5c])${t.tpl_host_port_no_ip_fuzzy_strict}${t.src_path})`,t}var Mi=o((()=>{Qe()}));function Ni(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}function Pi(e){return Object.prototype.toString.call(e)}function Fi(e){return Pi(e)===`[object String]`}function Ii(e){return Pi(e)===`[object Object]`}function Li(e){return Pi(e)===`[object RegExp]`}function Ri(e){return Pi(e)===`[object Function]`}function zi(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,`\\$&`)}function Bi(e){return Object.keys(e||{}).reduce(function(e,t){return e||Ki.hasOwnProperty(t)},!1)}function Vi(e){return function(t,n){let r=t.slice(n);return e.test(r)?r.match(e)[0].length:0}}function Hi(){return function(e,t){t.normalize(e)}}function Ui(e){let t=e.re=ji(e.__opts__),n=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||n.push(Ji),n.push(t.src_xn),t.src_tlds=n.join(`|`);function r(e){return e.replace(`%TLDS%`,t.src_tlds)}t.email_fuzzy=RegExp(r(t.tpl_email_fuzzy),`i`),t.email_fuzzy_global=RegExp(r(t.tpl_email_fuzzy),`ig`),t.link_fuzzy=RegExp(r(t.tpl_link_fuzzy),`i`),t.link_fuzzy_global=RegExp(r(t.tpl_link_fuzzy),`ig`),t.link_no_ip_fuzzy=RegExp(r(t.tpl_link_no_ip_fuzzy),`i`),t.link_no_ip_fuzzy_global=RegExp(r(t.tpl_link_no_ip_fuzzy),`ig`),t.host_fuzzy_test=RegExp(r(t.tpl_host_fuzzy_test),`i`);let i=[];e.__compiled__={};function a(e,t){throw Error(`(LinkifyIt) Invalid schema "${e}": ${t}`)}Object.keys(e.__schemas__).forEach(function(t){let n=e.__schemas__[t];if(n===null)return;let r={validate:null,link:null};if(e.__compiled__[t]=r,Ii(n)){Li(n.validate)?r.validate=Vi(n.validate):Ri(n.validate)?r.validate=n.validate:a(t,n),Ri(n.normalize)?r.normalize=n.normalize:n.normalize?a(t,n):r.normalize=Hi();return}if(Fi(n)){i.push(t);return}a(t,n)}),i.forEach(function(t){e.__compiled__[e.__schemas__[t]]&&(e.__compiled__[t].validate=e.__compiled__[e.__schemas__[t]].validate,e.__compiled__[t].normalize=e.__compiled__[e.__schemas__[t]].normalize)}),e.__compiled__[``]={validate:null,normalize:Hi()};let o=Object.keys(e.__compiled__).filter(function(t){return t.length>0&&e.__compiled__[t]}).map(zi).join(`|`);e.re.schema_test=RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`,`i`),e.re.schema_search=RegExp(`(^|(?!_)(?:[><\uff5c]|${t.src_ZPCc}))(${o})`,`ig`),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,`i`),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,`i`)}function Wi(e,t,n,r){let i=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=i,this.text=i,this.url=i}function Gi(e,t){if(!(this instanceof Gi))return new Gi(e,t);t||Bi(e)&&(t=e,e={}),this.__opts__=Ni({},Ki,t),this.__schemas__=Ni({},qi,e),this.__compiled__={},this.__tlds__=Yi,this.__tlds_replaced__=!1,this.re={},Ui(this)}var Ki,qi,Ji,Yi,Xi=o((()=>{Mi(),Ki={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},qi={"http:":{validate:function(e,t,n){let r=e.slice(t);return n.re.http||(n.re.http=RegExp(`^\\/\\/${n.re.src_auth}${n.re.src_host_port_strict}${n.re.src_path}`,`i`)),n.re.http.test(r)?r.match(n.re.http)[0].length:0}},"https:":`http:`,"ftp:":`http:`,"//":{validate:function(e,t,n){let r=e.slice(t);return n.re.no_http||(n.re.no_http=RegExp(`^`+n.re.src_auth+`(?:localhost|(?:(?:${n.re.src_domain})\\.)+${n.re.src_domain_root})`+n.re.src_port+n.re.src_host_terminator+n.re.src_path,`i`)),n.re.no_http.test(r)?t>=3&&e[t-3]===`:`||t>=3&&e[t-3]===`/`?0:r.match(n.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,n){let r=e.slice(t);return n.re.mailto||(n.re.mailto=RegExp(`^${n.re.src_email_name}@${n.re.src_host_strict}`,`i`)),n.re.mailto.test(r)?r.match(n.re.mailto)[0].length:0}}},Ji=`a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]`,Yi=`biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф`.split(`|`),Gi.prototype.add=function(e,t){return this.__schemas__[e]=t,Ui(this),this},Gi.prototype.set=function(e){return this.__opts__=Ni(this.__opts__,e),this},Gi.prototype.test=function(e){if(!e.length)return!1;let t,n;if(this.re.schema_test.test(e)){for(n=this.re.schema_search,n.lastIndex=0;(t=n.exec(e))!==null;)if(this.testSchemaAt(e,t[2],n.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__[`http:`]&&e.search(this.re.host_fuzzy_test)>=0&&e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__[`mailto:`]&&e.indexOf(`@`)>=0&&e.match(this.re.email_fuzzy)!==null)},Gi.prototype.pretest=function(e){return this.re.pretest.test(e)},Gi.prototype.testSchemaAt=function(e,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,n,this):0},Gi.prototype.match=function(e){let t=[],n=[],r=[],i=[],a,o,s;function c(e,t){return e?t?e.index===t.index?e.lastIndex>=t.lastIndex?e:t:e.index<t.index?e:t:e:t}if(!e.length)return null;if(this.re.schema_test.test(e))for(s=this.re.schema_search,s.lastIndex=0;(a=s.exec(e))!==null;)o=this.testSchemaAt(e,a[2],s.lastIndex),o&&n.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+o});if(this.__opts__.fuzzyLink&&this.__compiled__[`http:`])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(a=s.exec(e))!==null;)r.push({schema:``,index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__[`mailto:`])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(a=s.exec(e))!==null;)i.push({schema:`mailto:`,index:a.index+a[1].length,lastIndex:a.index+a[0].length});let l=[0,0,0],u=0;for(;;){let a=[n[l[0]],i[l[1]],r[l[2]]],o=c(c(a[0],a[1]),a[2]);if(!o)break;if(o===a[0]?l[0]++:o===a[1]?l[1]++:l[2]++,o.index<u)continue;let s=new Wi(e,o.schema,o.index,o.lastIndex);this.__compiled__[s.schema].normalize(s,this),t.push(s),u=o.lastIndex}return t.length?t:null},Gi.prototype.matchAtStart=function(e){if(!e.length)return null;let t=this.re.schema_at_start.exec(e);if(!t)return null;let n=this.testSchemaAt(e,t[2],t[0].length);if(!n)return null;let r=new Wi(e,t[2],t.index+t[1].length,t.index+t[0].length+n);return this.__compiled__[r.schema].normalize(r,this),r},Gi.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(e,t,n){return e!==n[t-1]}).reverse(),Ui(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,Ui(this),this)},Gi.prototype.normalize=function(e){e.schema||(e.url=`http://${e.url}`),e.schema===`mailto:`&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)},Gi.prototype.onCompile=function(){}}));function Zi(e){throw RangeError(pa[e])}function Qi(e,t){let n=[],r=e.length;for(;r--;)n[r]=t(e[r]);return n}function $i(e,t){let n=e.split(`@`),r=``;n.length>1&&(r=n[0]+`@`,e=n[1]),e=e.replace(fa,`.`);let i=Qi(e.split(`.`),t).join(`.`);return r+i}function ea(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){let r=e.charCodeAt(n++);(r&64512)==56320?t.push(((i&1023)<<10)+(r&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}var ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea=o((()=>{ta=2147483647,na=36,ra=1,ia=26,aa=38,oa=700,sa=72,ca=128,la=`-`,ua=/^xn--/,da=/[^\0-\x7F]/,fa=/[\x2E\u3002\uFF0E\uFF61]/g,pa={overflow:`Overflow: input needs wider integers to process`,"not-basic":`Illegal input >= 0x80 (not a basic code point)`,"invalid-input":`Invalid input`},ma=35,ha=Math.floor,ga=String.fromCharCode,_a=e=>String.fromCodePoint(...e),va=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:na},ya=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},ba=function(e,t,n){let r=0;for(e=n?ha(e/oa):e>>1,e+=ha(e/t);e>455;r+=na)e=ha(e/ma);return ha(r+36*e/(e+aa))},xa=function(e){let t=[],n=e.length,r=0,i=ca,a=sa,o=e.lastIndexOf(la);o<0&&(o=0);for(let n=0;n<o;++n)e.charCodeAt(n)>=128&&Zi(`not-basic`),t.push(e.charCodeAt(n));for(let s=o>0?o+1:0;s<n;){let o=r;for(let t=1,i=na;;i+=na){s>=n&&Zi(`invalid-input`);let o=va(e.charCodeAt(s++));o>=na&&Zi(`invalid-input`),o>ha((ta-r)/t)&&Zi(`overflow`),r+=o*t;let c=i<=a?ra:i>=a+ia?ia:i-a;if(o<c)break;let l=na-c;t>ha(ta/l)&&Zi(`overflow`),t*=l}let c=t.length+1;a=ba(r-o,c,o==0),ha(r/c)>ta-i&&Zi(`overflow`),i+=ha(r/c),r%=c,t.splice(r++,0,i)}return String.fromCodePoint(...t)},Sa=function(e){let t=[];e=ea(e);let n=e.length,r=ca,i=0,a=sa;for(let n of e)n<128&&t.push(ga(n));let o=t.length,s=o;for(o&&t.push(la);s<n;){let n=ta;for(let t of e)t>=r&&t<n&&(n=t);let c=s+1;n-r>ha((ta-i)/c)&&Zi(`overflow`),i+=(n-r)*c,r=n;for(let n of e)if(n<r&&++i>ta&&Zi(`overflow`),n===r){let e=i;for(let n=na;;n+=na){let r=n<=a?ra:n>=a+ia?ia:n-a;if(e<r)break;let i=e-r,o=na-r;t.push(ga(ya(r+i%o,0))),e=ha(i/o)}t.push(ga(ya(e,0))),a=ba(i,c,s===o),i=0,++s}++i,++r}return t.join(``)},Ca=function(e){return $i(e,function(e){return ua.test(e)?xa(e.slice(4).toLowerCase()):e})},wa=function(e){return $i(e,function(e){return da.test(e)?`xn--`+Sa(e):e})},Ta={version:`2.3.1`,ucs2:{decode:ea,encode:_a},decode:xa,encode:Sa,toASCII:wa,toUnicode:Ca}})),Da,Oa=o((()=>{Da={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}})),ka,Aa=o((()=>{ka={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`inline`,`text_join`]},block:{rules:[`paragraph`]},inline:{rules:[`text`],rules2:[`balance_pairs`,`fragments_join`]}}}})),ja,Ma=o((()=>{ja={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`inline`,`text_join`]},block:{rules:[`blockquote`,`code`,`fence`,`heading`,`hr`,`html_block`,`lheading`,`list`,`reference`,`paragraph`]},inline:{rules:[`autolink`,`backticks`,`emphasis`,`entity`,`escape`,`html_inline`,`image`,`link`,`newline`,`text`],rules2:[`balance_pairs`,`emphasis`,`fragments_join`]}}}}));function Na(e){let t=e.trim().toLowerCase();return!Ra.test(t)||za.test(t)}function Pa(e){let t=Te(e,!0);if(t.hostname&&(!t.protocol||Ba.indexOf(t.protocol)>=0))try{t.hostname=Ta.toASCII(t.hostname)}catch{}return be(Se(t))}function Fa(e){let t=Te(e,!0);if(t.hostname&&(!t.protocol||Ba.indexOf(t.protocol)>=0))try{t.hostname=Ta.toUnicode(t.hostname)}catch{}return ge(Se(t),ge.defaultChars+`%`)}function Ia(e,t){if(!(this instanceof Ia))return new Ia(e,t);t||Ct(e)||(t=e||{},e=`default`),this.inline=new Di,this.block=new jr,this.core=new Wn,this.renderer=new an,this.linkify=new Gi,this.validateLink=Na,this.normalizeLink=Pa,this.normalizeLinkText=Fa,this.utils=xt,this.helpers=Tt({},nn),this.options={},this.configure(e),t&&this.set(t)}var La,Ra,za,Ba,Va=o((()=>{D(),rn(),sn(),Kn(),Nr(),Ai(),Xi(),Re(),Ea(),Oa(),Aa(),Ma(),La={default:Da,zero:ka,commonmark:ja},Ra=/^(vbscript|javascript|file|data):/,za=/^data:image\/(gif|png|jpeg|webp);/,Ba=[`http:`,`https:`,`mailto:`],Ia.prototype.set=function(e){return Tt(this.options,e),this},Ia.prototype.configure=function(e){let t=this;if(Ct(e)){let t=e;if(e=La[t],!e)throw Error('Wrong `markdown-it` preset "'+t+`", check name`)}if(!e)throw Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(n){e.components[n].rules&&t[n].ruler.enableOnly(e.components[n].rules),e.components[n].rules2&&t[n].ruler2.enableOnly(e.components[n].rules2)}),this},Ia.prototype.enable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(function(t){n=n.concat(this[t].ruler.enable(e,!0))},this),n=n.concat(this.inline.ruler2.enable(e,!0));let r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw Error(`MarkdownIt. Failed to enable unknown rule(s): `+r);return this},Ia.prototype.disable=function(e,t){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(function(t){n=n.concat(this[t].ruler.disable(e,!0))},this),n=n.concat(this.inline.ruler2.disable(e,!0));let r=e.filter(function(e){return n.indexOf(e)<0});if(r.length&&!t)throw Error(`MarkdownIt. Failed to disable unknown rule(s): `+r);return this},Ia.prototype.use=function(e){let t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},Ia.prototype.parse=function(e,t){if(typeof e!=`string`)throw Error(`Input data should be a String`);let n=new this.core.State(e,this,t);return this.core.process(n),n.tokens},Ia.prototype.render=function(e,t){return t||={},this.renderer.render(this.parse(e,t),this.options,t)},Ia.prototype.parseInline=function(e,t){let n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens},Ia.prototype.renderInline=function(e,t){return t||={},this.renderer.render(this.parseInline(e,t),this.options,t)}})),Ha=o((()=>{Va()}));function Ua(e,t,n,r){var i;if(!Xa){var a=`Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks`;typeof process==`object`&&process&&process.emitWarning?process.emitWarning(a):console.warn(a),Xa=!0}var o=[Object.assign(new n.Token(`link_open`,`a`,1),{attrs:[].concat(t.permalinkClass?[[`class`,t.permalinkClass]]:[],[[`href`,t.permalinkHref(e,n)]],Object.entries(t.permalinkAttrs(e,n)))}),Object.assign(new n.Token(`html_block`,``,0),{content:t.permalinkSymbol,meta:Qa}),new n.Token(`link_close`,`a`,-1)];t.permalinkSpace&&n.tokens[r+1].children[Za[t.permalinkBefore]](Object.assign(new n.Token(`text`,``,0),{content:` `})),(i=n.tokens[r+1].children)[Za[t.permalinkBefore]].apply(i,o)}function Wa(e){return`#`+e}function Ga(e){return{}}function Ka(e){function t(n){return n=Object.assign({},t.defaults,n),function(t,r,i,a){return e(t,n,r,i,a)}}return t.defaults=Object.assign({},$a),t.renderPermalinkImpl=e,t}function qa(e){var t=[],n=e.filter(function(e){if(e[0]!==`class`)return!0;t.push(e[1])});return t.length>0&&n.unshift([`class`,t.join(` `)]),n}function Ja(e,t,n,r){var i=e,a=r;if(n&&Object.prototype.hasOwnProperty.call(t,i))throw Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(t,i);)i=e+`-`+a,a+=1;return t[i]=!0,i}function Ya(e,t){t=Object.assign({},Ya.defaults,t),e.core.ruler.push(`anchor`,function(e){for(var n,r={},i=e.tokens,a=Array.isArray(t.level)?(n=t.level,function(e){return n.includes(e)}):function(e){return function(t){return t>=e}}(t.level),o=0;o<i.length;o++){var s=i[o];if(s.type===`heading_open`&&a(Number(s.tag.substr(1)))){var c=t.getTokensText(i[o+1].children),l=s.attrGet(`id`);l=l==null?Ja(l=t.slugifyWithState?t.slugifyWithState(c,e):t.slugify(c),r,!1,t.uniqueSlugStartIndex):Ja(l,r,!0,t.uniqueSlugStartIndex),s.attrSet(`id`,l),!1!==t.tabIndex&&s.attrSet(`tabindex`,``+t.tabIndex),typeof t.permalink==`function`?t.permalink(l,t,e,o):(t.permalink||t.renderPermalink&&t.renderPermalink!==Ua)&&t.renderPermalink(l,t,e,o),o=i.indexOf(s),t.callback&&t.callback(s,{slug:l,title:c})}}})}var Xa,Za,Qa,$a,eo,to,no,ro,io=o((()=>{Xa=!1,Za={false:`push`,true:`unshift`,after:`push`,before:`unshift`},Qa={isPermalinkSymbol:!0},$a={class:`header-anchor`,symbol:`#`,renderHref:Wa,renderAttrs:Ga},eo=Ka(function(e,t,n,r,i){var a,o=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:qa([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],t.ariaHidden?[[`aria-hidden`,`true`]]:[],Object.entries(t.renderAttrs(e,r))))}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Qa}),new r.Token(`link_close`,`a`,-1)];if(t.space){var s=typeof t.space==`string`?t.space:` `;r.tokens[i+1].children[Za[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:s}))}(a=r.tokens[i+1].children)[Za[t.placement]].apply(a,o)}),Object.assign(eo.defaults,{space:!0,placement:`after`,ariaHidden:!1}),to=Ka(eo.renderPermalinkImpl),to.defaults=Object.assign({},eo.defaults,{ariaHidden:!0}),no=Ka(function(e,t,n,r,i){var a=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:qa([].concat(t.class?[[`class`,t.class]]:[],[[`href`,t.renderHref(e,r)]],Object.entries(t.renderAttrs(e,r))))})].concat(t.safariReaderFix?[new r.Token(`span_open`,`span`,1)]:[],r.tokens[i+1].children,t.safariReaderFix?[new r.Token(`span_close`,`span`,-1)]:[],[new r.Token(`link_close`,`a`,-1)]);r.tokens[i+1].children=a}),Object.assign(no.defaults,{safariReaderFix:!1}),ro=Ka(function(e,t,n,r,i){var a;if(![`visually-hidden`,`aria-label`,`aria-describedby`,`aria-labelledby`].includes(t.style))throw Error("`permalink.linkAfterHeader` called with unknown style option `"+t.style+"`");if(![`aria-describedby`,`aria-labelledby`].includes(t.style)&&!t.assistiveText)throw Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+t.style+"` style");if(t.style===`visually-hidden`&&!t.visuallyHiddenClass)throw Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var o=r.tokens[i+1].children.filter(function(e){return e.type===`text`||e.type===`code_inline`}).reduce(function(e,t){return e+t.content},``),s=[],c=[];if(t.class&&c.push([`class`,t.class]),c.push([`href`,t.renderHref(e,r)]),c.push.apply(c,Object.entries(t.renderAttrs(e,r))),t.style===`visually-hidden`){if(s.push(Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`class`,t.visuallyHiddenClass]]}),Object.assign(new r.Token(`text`,``,0),{content:t.assistiveText(o)}),new r.Token(`span_close`,`span`,-1)),t.space){var l=typeof t.space==`string`?t.space:` `;s[Za[t.placement]](Object.assign(new r.Token(typeof t.space==`string`?`html_inline`:`text`,``,0),{content:l}))}s[Za[t.placement]](Object.assign(new r.Token(`span_open`,`span`,1),{attrs:[[`aria-hidden`,`true`]]}),Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Qa}),new r.Token(`span_close`,`span`,-1))}else s.push(Object.assign(new r.Token(`html_inline`,``,0),{content:t.symbol,meta:Qa}));t.style===`aria-label`?c.push([`aria-label`,t.assistiveText(o)]):[`aria-describedby`,`aria-labelledby`].includes(t.style)&&c.push([t.style,e]);var u=[Object.assign(new r.Token(`link_open`,`a`,1),{attrs:qa(c)})].concat(s,[new r.Token(`link_close`,`a`,-1)]);(a=r.tokens).splice.apply(a,[i+3,0].concat(u)),t.wrapper&&(r.tokens.splice(i,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[0]+`
`})),r.tokens.splice(i+3+u.length+1,0,Object.assign(new r.Token(`html_block`,``,0),{content:t.wrapper[1]+`
`})))}),Object.assign(ro.defaults,{style:`visually-hidden`,space:!0,placement:`after`,wrapper:null}),Ya.permalink={__proto__:null,legacy:Ua,renderHref:Wa,renderAttrs:Ga,makePermalink:Ka,linkInsideHeader:eo,ariaHidden:to,headerLink:no,linkAfterHeader:ro},Ya.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,`-`))},uniqueSlugStartIndex:1,tabIndex:`-1`,getTokensText:function(e){return e.filter(function(e){return[`text`,`code_inline`].includes(e.type)}).map(function(e){return e.content}).join(``)},permalink:!1,renderPermalink:Ua,permalinkClass:to.defaults.class,permalinkSpace:to.defaults.space,permalinkSymbol:`¶`,permalinkBefore:to.defaults.placement===`before`,permalinkHref:to.defaults.renderHref,permalinkAttrs:to.defaults.renderAttrs},Ya.default=Ya})),ao=s(((e,t)=>{function n(e,t){var n,r,i=e.attrs[e.attrIndex(`href`)][1];for(n=0;n<t.length;++n){if(r=t[n],typeof r.matcher==`function`){if(r.matcher(i,r))return r;continue}return r}}function r(e,t,n){Object.keys(n).forEach(function(r){var i,a=n[r];r===`className`&&(r=`class`),i=t[e].attrIndex(r),i<0?t[e].attrPush([r,a]):t[e].attrs[i][1]=a})}function i(e,t){t=t?Array.isArray(t)?t:[t]:[],Object.freeze(t);var i=e.renderer.rules.link_open||this.defaultRender;e.renderer.rules.link_open=function(e,a,o,s,c){var l=n(e[a],t),u=l&&l.attrs;return u&&r(a,e,u),i(e,a,o,s,c)}}i.defaultRender=function(e,t,n,r,i){return i.renderToken(e,t,n)},t.exports=i}));function oo(e,t,n,r){let i=Number(e[t].meta.id+1).toString(),a=``;return typeof r.docId==`string`&&(a=`-${r.docId}-`),a+i}function so(e,t){let n=Number(e[t].meta.id+1).toString();return e[t].meta.subId>0&&(n+=`:${e[t].meta.subId}`),`[${n}]`}function co(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i),o=i.rules.footnote_caption(e,t,n,r,i),s=a;return e[t].meta.subId>0&&(s+=`:${e[t].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${a}" id="fnref${s}">${o}</a></sup>`}function lo(e,t,n){return(n.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function uo(){return`</ol>
</section>
`}function fo(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),`<li id="fn${a}" class="footnote-item">`}function po(){return`</li>
`}function mo(e,t,n,r,i){let a=i.rules.footnote_anchor_name(e,t,n,r,i);return e[t].meta.subId>0&&(a+=`:${e[t].meta.subId}`),` <a href="#fnref${a}" class="footnote-backref">\u21a9\uFE0E</a>`}function ho(e){let t=e.helpers.parseLinkLabel,n=e.utils.isSpace;e.renderer.rules.footnote_ref=co,e.renderer.rules.footnote_block_open=lo,e.renderer.rules.footnote_block_close=uo,e.renderer.rules.footnote_open=fo,e.renderer.rules.footnote_close=po,e.renderer.rules.footnote_anchor=mo,e.renderer.rules.footnote_caption=so,e.renderer.rules.footnote_anchor_name=oo;function r(e,t,r,i){let a=e.bMarks[t]+e.tShift[t],o=e.eMarks[t];if(a+4>o||e.src.charCodeAt(a)!==91||e.src.charCodeAt(a+1)!==94)return!1;let s;for(s=a+2;s<o;s++){if(e.src.charCodeAt(s)===32)return!1;if(e.src.charCodeAt(s)===93)break}if(s===a+2||s+1>=o||e.src.charCodeAt(++s)!==58)return!1;if(i)return!0;s++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={});let c=e.src.slice(a+2,s-2);e.env.footnotes.refs[`:${c}`]=-1;let l=new e.Token(`footnote_reference_open`,``,1);l.meta={label:c},l.level=e.level++,e.tokens.push(l);let u=e.bMarks[t],d=e.tShift[t],f=e.sCount[t],p=e.parentType,m=s,h=e.sCount[t]+s-(e.bMarks[t]+e.tShift[t]),g=h;for(;s<o;){let t=e.src.charCodeAt(s);if(n(t))t===9?g+=4-g%4:g++;else break;s++}e.tShift[t]=s-m,e.sCount[t]=g-h,e.bMarks[t]=m,e.blkIndent+=4,e.parentType=`footnote`,e.sCount[t]<e.blkIndent&&(e.sCount[t]+=e.blkIndent),e.md.block.tokenize(e,t,r,!0),e.parentType=p,e.blkIndent-=4,e.tShift[t]=d,e.sCount[t]=f,e.bMarks[t]=u;let _=new e.Token(`footnote_reference_close`,``,-1);return _.level=--e.level,e.tokens.push(_),!0}function i(e,n){let r=e.posMax,i=e.pos;if(i+2>=r||e.src.charCodeAt(i)!==94||e.src.charCodeAt(i+1)!==91)return!1;let a=i+2,o=t(e,i+1);if(o<0)return!1;if(!n){e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]);let t=e.env.footnotes.list.length,n=[];e.md.inline.parse(e.src.slice(a,o),e.md,e.env,n);let r=e.push(`footnote_ref`,``,0);r.meta={id:t},e.env.footnotes.list[t]={content:e.src.slice(a,o),tokens:n}}return e.pos=o+1,e.posMax=r,!0}function a(e,t){let n=e.posMax,r=e.pos;if(r+3>n||!e.env.footnotes||!e.env.footnotes.refs||e.src.charCodeAt(r)!==91||e.src.charCodeAt(r+1)!==94)return!1;let i;for(i=r+2;i<n;i++){if(e.src.charCodeAt(i)===32||e.src.charCodeAt(i)===10)return!1;if(e.src.charCodeAt(i)===93)break}if(i===r+2||i>=n)return!1;i++;let a=e.src.slice(r+2,i-1);if(e.env.footnotes.refs[`:${a}`]===void 0)return!1;if(!t){e.env.footnotes.list||(e.env.footnotes.list=[]);let t;e.env.footnotes.refs[`:${a}`]<0?(t=e.env.footnotes.list.length,e.env.footnotes.list[t]={label:a,count:0},e.env.footnotes.refs[`:${a}`]=t):t=e.env.footnotes.refs[`:${a}`];let n=e.env.footnotes.list[t].count;e.env.footnotes.list[t].count++;let r=e.push(`footnote_ref`,``,0);r.meta={id:t,subId:n,label:a}}return e.pos=i,e.posMax=n,!0}function o(e){let t,n,r,i=!1,a={};if(!e.env.footnotes||(e.tokens=e.tokens.filter(function(e){return e.type===`footnote_reference_open`?(i=!0,n=[],r=e.meta.label,!1):e.type===`footnote_reference_close`?(i=!1,a[`:`+r]=n,!1):(i&&n.push(e),!i)}),!e.env.footnotes.list))return;let o=e.env.footnotes.list;e.tokens.push(new e.Token(`footnote_block_open`,``,1));for(let n=0,r=o.length;n<r;n++){let r=new e.Token(`footnote_open`,``,1);if(r.meta={id:n,label:o[n].label},e.tokens.push(r),o[n].tokens){t=[];let r=new e.Token(`paragraph_open`,`p`,1);r.block=!0,t.push(r);let i=new e.Token(`inline`,``,0);i.children=o[n].tokens,i.content=o[n].content,t.push(i);let a=new e.Token(`paragraph_close`,`p`,-1);a.block=!0,t.push(a)}else o[n].label&&(t=a[`:${o[n].label}`]);t&&(e.tokens=e.tokens.concat(t));let i;i=e.tokens[e.tokens.length-1].type===`paragraph_close`?e.tokens.pop():null;let s=o[n].count>0?o[n].count:1;for(let t=0;t<s;t++){let r=new e.Token(`footnote_anchor`,``,0);r.meta={id:n,subId:t,label:o[n].label},e.tokens.push(r)}i&&e.tokens.push(i),e.tokens.push(new e.Token(`footnote_close`,``,-1))}e.tokens.push(new e.Token(`footnote_block_close`,``,-1))}e.block.ruler.before(`reference`,`footnote_def`,r,{alt:[`paragraph`,`reference`]}),e.inline.ruler.after(`image`,`footnote_inline`,i),e.inline.ruler.after(`footnote_inline`,`footnote_ref`,a),e.core.ruler.after(`inline`,`footnote_tail`,o)}var go=o((()=>{})),_o=s(((e,t)=>{var n=!0,r=!1,i=!1;t.exports=function(e,t){t&&(n=!t.enabled,r=!!t.label,i=!!t.labelAfter),e.core.ruler.after(`inline`,`github-task-lists`,function(e){for(var t=e.tokens,r=2;r<t.length;r++)s(t,r)&&(c(t[r],e.Token),a(t[r-2],`class`,`task-list-item`+(n?``:` enabled`)),a(t[o(t,r-2)],`class`,`contains-task-list`))})};function a(e,t,n){var r=e.attrIndex(t),i=[t,n];r<0?e.attrPush(i):e.attrs[r]=i}function o(e,t){for(var n=e[t].level-1,r=t-1;r>=0;r--)if(e[r].level===n)return r;return-1}function s(e,t){return p(e[t])&&m(e[t-1])&&h(e[t-2])&&g(e[t])}function c(e,t){if(e.children.unshift(l(e,t)),e.children[1].content=e.children[1].content.slice(3),e.content=e.content.slice(3),r){if(i){e.children.pop();var n=`task-item-`+Math.ceil(Math.random()*1e7-1e3);e.children[0].content=e.children[0].content.slice(0,-1)+` id="`+n+`">`,e.children.push(f(e.content,n,t))}else e.children.unshift(u(t)),e.children.push(d(t))}}function l(e,t){var r=new t(`html_inline`,``,0),i=n?` disabled="" `:``;return e.content.indexOf(`[ ] `)===0?r.content=`<input class="task-list-item-checkbox"`+i+`type="checkbox">`:(e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0)&&(r.content=`<input class="task-list-item-checkbox" checked=""`+i+`type="checkbox">`),r}function u(e){var t=new e(`html_inline`,``,0);return t.content=`<label>`,t}function d(e){var t=new e(`html_inline`,``,0);return t.content=`</label>`,t}function f(e,t,n){var r=new n(`html_inline`,``,0);return r.content=`<label class="task-list-item-label" for="`+t+`">`+e+`</label>`,r.attrs=[{for:t}],r}function p(e){return e.type===`inline`}function m(e){return e.type===`paragraph_open`}function h(e){return e.type===`list_item_open`}function g(e){return e.content.indexOf(`[ ] `)===0||e.content.indexOf(`[x] `)===0||e.content.indexOf(`[X] `)===0}}));function vo(e){return e.charAt(0).toUpperCase()+e.slice(1)}var yo,bo,xo=o((()=>{yo={note:`<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},bo=(e,t={})=>{let{markers:n=[`TIP`,`NOTE`,`IMPORTANT`,`WARNING`,`CAUTION`],icons:r=yo,matchCaseSensitive:i=!1,titles:a={},classPrefix:o=`markdown-alert`}=t,s=n===`*`?`\\w+`:n.join(`|`),c=RegExp(`^\\\\?\\[\\!(${s})\\]([^\\n\\r]*)`,i?``:`i`);e.core.ruler.after(`block`,`github-alerts`,e=>{let t=e.tokens;for(let e=0;e<t.length;e++)if(t[e].type===`blockquote_open`){let n=t[e],i=e;for(;t[e]?.type!==`blockquote_close`&&e<=t.length;)e+=1;let o=t[e],s=e,l=t.slice(i,s+1).find(e=>e.type===`inline`);if(!l)continue;let u=l.content.match(c);if(!u)continue;let d=u[1].toLowerCase(),f=u[2].trim()||(a[d]??vo(d)),p=r[d]??``;l.content=l.content.slice(u[0].length).trimStart(),n.type=`alert_open`,n.tag=`div`,n.meta={title:f,type:d,icon:p},o.type=`alert_close`,o.tag=`div`}}),e.renderer.rules.alert_open=function(e,t){let{title:n,type:r,icon:i}=e[t].meta;return`<div class="${o} ${o}-${r}"><p class="${o}-title">${i}${n}</p>`}}}));function k(e,t){return{tagName:e,nodeKind:`scalar`,implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(e=>String(e)),representTagName:t.representTagName??(()=>e)}}function So(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`sequence`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function Co(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`mapping`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function wo(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function To(e,t){if(t){if(!Pc.test(e))return F}else if(!Nc.test(e))return F;let n=wo(e);return Number.isFinite(n)?n:F}function Eo(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Do(e,t){if(t){if(!Lc.test(e))return F}else if(!Ic.test(e))return F;let n=Eo(e);return Number.isFinite(n)?n:F}function Oo(e){let t=e.replace(/_/g,``),n=1;if((t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`))return n*parseInt(t.slice(2),2);if(t.startsWith(`0x`))return n*parseInt(t.slice(2),16);if(t.includes(`:`)){let e=0;for(let n of t.split(`:`))e=e*60+Number(n);return n*e}return t!==`0`&&t[0]===`0`?n*parseInt(t,8):n*parseInt(t,10)}function ko(e){if(!zc.test(e))return F;let t=Oo(e);return Number.isFinite(t)?t:F}function Ao(e){if(!Vc.test(e))return F;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||Hc.test(e)?r:F}function jo(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Mo(e,t){if(t){if(!Gc.test(e))return F;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)?r:F}if(!Wc.test(e))return F;let n=Number(e);return Number.isFinite(n)?n:F}function No(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Po(e){if(!qc.test(e))return F;let t=e.toLowerCase().replace(/_/g,``),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=0;if(t.includes(`:`)){for(let e of t.split(`:`))r=r*60+Number(e);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Jc.test(e)?r:F}function Fo(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}function Io(e){let t=e.replace(/\s/g,``);if(t.length%4!=0||!Zc.test(t))return F;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}function Lo(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function Ro(e,t,n,r=0,i=0,a=0,o=0){let s=new Date(Date.UTC(e,t,n,r,i,a,o));return s.setUTCFullYear(e,t,n),s}function zo(e){let t=$c.exec(e);if(t===null&&(t=el.exec(e)),t===null)return F;let n=+t[1],r=t[2]-1,i=+t[3];if(!t[4]){let e=Ro(n,r,i);return e.getUTCFullYear()!==n||e.getUTCMonth()!==r||e.getUTCDate()!==i?F:e}let a=+t[4],o=+t[5],s=+t[6],c=0;if(a>23||o>59||s>59)return F;if(t[7]){let e=t[7].slice(0,3);for(;e.length<3;)e+=`0`;c=+e}let l=Ro(n,r,i,a,o,s,c);if(l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==i)return F;if(t[9]){let e=+t[10],n=+(t[11]||0);if(e>23||n>59)return F;let r=(e*60+n)*6e4;l.setTime(l.getTime()-(t[9]===`-`?-r:r))}return l}function Bo(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function Vo(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}function Ho(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Uo(){return{scalar:[],sequence:[],mapping:[]}}function Wo(e){let t=[];for(let n of e){let e=t.length;for(let r=0;r<t.length;r++){let i=t[r];if(i.nodeKind===n.nodeKind&&i.tagName===n.tagName&&i.matchByTagPrefix===n.matchByTagPrefix){e=r;break}}t[e]=n}return t}function Go(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let e=0;e<t.length;e++){if(Array.isArray(t[e]))return null;typeof t[e]==`object`&&Object.prototype.toString.call(t[e])===`[object Object]`&&(t[e]=`[object Object]`)}return String(t)}return typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`?`[object Object]`:String(e)}function Ko(e,t,n,r,i){let a=``,o=``,s=Math.floor(i/2)-1;return r-t>s&&(a=` ... `,t=r-s+a.length),n-r>s&&(o=` ...`,n=r+s-o.length),{str:a+e.slice(t,n).replace(/\t/g,`→`)+o,pos:r-t+a.length}}function qo(e,t){return` `.repeat(Math.max(t-e.length,0))+e}function Jo(e,t){if(!e.buffer)return null;let n={...dl,...t},r=/\r?\n|\r|\0/g,i=[0],a=[],o,s=-1;for(;o=r.exec(e.buffer);)a.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);let c=``,l=Math.min(e.line+n.linesAfter,a.length).toString().length,u=n.maxLength-(n.indent+l+3);for(let t=1;t<=n.linesBefore&&!(s-t<0);t++){let r=Ko(e.buffer,i[s-t],a[s-t],e.position-(i[s]-i[s-t]),u);c=`${` `.repeat(n.indent)}${qo((e.line-t+1).toString(),l)} | ${r.str}\n${c}`}let d=Ko(e.buffer,i[s],a[s],e.position,u);c+=`${` `.repeat(n.indent)}${qo((e.line+1).toString(),l)} | ${d.str}\n`,c+=`${`-`.repeat(n.indent+l+3+d.pos)}^\n`;for(let t=1;t<=n.linesAfter&&!(s+t>=a.length);t++){let r=Ko(e.buffer,i[s+t],a[s+t],e.position-(i[s]-i[s+t]),u);c+=`${` `.repeat(n.indent)}${qo((e.line+t+1).toString(),l)} | ${r.str}\n`}return c.replace(/\n$/,``)}function Yo(e,t){let n=``;return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`\n\n${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}function Xo(e){switch(e){case 48:return`\0`;case 97:return`\x07`;case 98:return`\b`;case 116:return`	`;case 9:return`	`;case 110:return`
`;case 118:return`\v`;case 102:return`\f`;case 114:return`\r`;case 101:return`\x1B`;case 32:return` `;case 34:return`"`;case 47:return`/`;case 92:return`\\`;case 78:return``;case 95:return`\xA0`;case 76:return`\u2028`;case 80:return`\u2029`;default:return``}}function Zo(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Qo(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function $o(e){return e===120?2:e===117?4:8}function es(e,t,n){let r=0;for(;t<n;){let n=e.charCodeAt(t);if(n===10)r++,t++;else if(n===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(n===32||n===9)t++;else break}return{position:t,breaks:r}}function ts(e){return e===1?` `:`
`.repeat(e-1)}function ns(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===10||t===13){r+=e.slice(a,o);let t=es(e,i,n);r+=ts(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,o)}function rs(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===39)r+=e.slice(a,i)+`'`,i+=2,a=o=i;else if(t===10||t===13){r+=e.slice(a,o);let t=es(e,i,n);r+=ts(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function is(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===92){r+=e.slice(a,i),i++;let t=e.charCodeAt(i);if(t===10||t===13)i=es(e,i,n).position;else if(t<256&&hl[t])r+=gl[t],i++;else{let n=$o(t),a=0;for(;n>0;n--){i++;let t=Qo(e.charCodeAt(i));a=(a<<4)+t}r+=Zo(a),i++}a=o=i}else if(t===10||t===13){r+=e.slice(a,o);let t=es(e,i,n);r+=ts(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function as(e,t,n,r,i,a){let o=r<0?0:r,s=e.slice(t,n).replace(/\r\n?/g,`
`),c=s===``?[]:(s.endsWith(`
`)?s.slice(0,-1):s).split(`
`),l=``,u=!1,d=0,f=!1;for(let e of c){let t=0;for(;t<o&&e.charCodeAt(t)===32;)t++;if(r<0||t>=e.length){d++;continue}let n=e.slice(o),i=n.charCodeAt(0);a?i===32||i===9?(f=!0,l+=`
`.repeat(u?1+d:d)):f?(f=!1,l+=`
`.repeat(d+1)):d===0?u&&(l+=` `):l+=`
`.repeat(d):l+=`
`.repeat(u?1+d:d),l+=n,u=!0,d=0}return i===R.KEEP?l+=`
`.repeat(u?1+d:d):i!==R.STRIP&&u&&(l+=`
`),l}function os(e,t){if(t.valueStart===ml)return``;let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case L.SINGLE_QUOTED:return rs(e,n,r);case L.DOUBLE_QUOTED:return is(e,n,r);case L.LITERAL_BLOCK:return as(e,n,r,t.indent,t.chomping,!1);case L.FOLDED_BLOCK:return as(e,n,r,t.indent,t.chomping,!0);default:return ns(e,n,r)}}function ss(e,t){if(e.startsWith(`!<`)&&e.endsWith(`>`))return decodeURIComponent(e.slice(2,-1));let n=e.indexOf(`!`,1),r=n===-1?`!`:e.slice(0,n+1),i=t?.[r]??_l[r]??r;return decodeURIComponent(i)+decodeURIComponent(e.slice(r.length))}function cs(e){return`tagStart`in e&&e.tagStart!==vl?e.tagStart:`anchorStart`in e&&e.anchorStart!==vl?e.anchorStart:`valueStart`in e&&e.valueStart!==vl?e.valueStart:`start`in e?e.start:0}function A(e,t){fl.throwAt(e.source,e.position,t,e.filename)}function ls(e,t,n,r){try{return n.finalize(r)}catch(n){if(n instanceof fl)throw n;fl.throwAt(e.source,t,n instanceof Error?n.message:String(n),e.filename)}}function us(e,t){let n=os(e.source,t),r=t.tagStart===vl?``:e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==``){if(r===`!`)return{value:n,tag:i};let t=ss(r,e.tagHandlers),a=e.schema.lookupScalarTag(t);if(a){let r=a.resolve(n,!0,t);return r===F&&A(e,`cannot resolve a node with !<${t}> explicit tag`),{value:r,tag:a}}let o=e.schema.lookupMappingTag(t)??e.schema.lookupSequenceTag(t);if(o){n!==``&&A(e,`cannot resolve a node with !<${t}> explicit tag`);let r=o.create(t);return{value:o.carrierIsResult?r:ls(e,e.position,o,r),tag:o}}A(e,`unknown scalar tag !<${t}>`)}return t.style===L.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function ds(e,t,n){let r=t.tagStart===vl?``:e.source.slice(t.tagStart,t.tagEnd);return r===``||r===`!`?n:ss(r,e.tagHandlers)}function fs(e){return e.nodeKind===`mapping`}function ps(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&A(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function ms(e,t,n,r){ps(e);for(let i of r.keys(n)){if(ps(e),t.tag.has(t.value,i))continue;let a=t.tag.addPair(t.value,i,r.get(n,i));a&&A(e,a),t.overridable??=new Set,t.overridable.add(i)}}function hs(e,t,n,r){if(e.position=t.keyPosition,fs(r))ms(e,t,n,r);else if(r.nodeKind===`sequence`&&Array.isArray(n)){n.length>100&&A(e,`abnormal merge sequence size`);for(let r of n){let n=e.nodeTags.get(r);n||A(e,`cannot merge mappings; the provided source object is unacceptable`),ms(e,t,r,n)}}else A(e,`cannot merge mappings; the provided source object is unacceptable`)}function gs(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){hs(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&A(e,`duplicated mapping key`);let a=t.tag.addPair(t.value,n,r);a&&A(e,a),t.overridable?.delete(n)}function _s(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind===`document`)r.value=t,r.hasValue=!0;else if(r.kind===`sequence`){fs(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&A(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,gs(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===yl}function vs(e,t,n,r,i){if(t.anchorStart!==vl){let a={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),a),a}return null}function ys(e,t){let n={...bl,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let e=n.events[n.eventIndex++];switch(n.position=cs(e),e.type){case I.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let t of e.directives)t.kind===`tag`&&(n.tagHandlers[t.handle]=t.prefix);n.frames.push({kind:`document`,position:n.position,value:void 0,hasValue:!1});break;case I.SCALAR:{let{value:t,tag:r}=us(n,e);vs(n,e,t,r,!0),_s(n,t,r);break}case I.SEQUENCE:{let t=ds(n,e,`tag:yaml.org,2002:seq`),r=n.schema.lookupSequenceTag(t);r||A(n,`unknown sequence tag !<${t}>`);let i=r.create(t),a=vs(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`sequence`,position:n.position,value:i,tag:r,anchor:a,index:0});break}case I.MAPPING:{let t=ds(n,e,`tag:yaml.org,2002:map`),r=n.schema.lookupMappingTag(t);r||A(n,`unknown mapping tag !<${t}>`);let i=r.create(t),a=vs(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`mapping`,position:n.position,value:i,tag:r,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case I.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&A(n,`aliases exceeded maxAliases (${n.maxAliases})`);let t=n.source.slice(e.anchorStart,e.anchorEnd),r=n.anchors.get(t);r||A(n,`unidentified alias "${t}"`),r.isValueFinal||A(n,`recursive alias "${t}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),_s(n,r.value,r.tag);break}case I.POP:{let e=n.frames.pop();if(e.kind===`mapping`&&e.hasKey&&(n.position=e.keyPosition,A(n,`incomplete mapping pair in event stream`)),e.kind===`document`)n.documents.push(e.value);else{let t=e.tag.carrierIsResult?e.value:ls(n,e.position,e.tag,e.value);e.anchor&&(e.anchor.value=t,e.anchor.isValueFinal=!0),_s(n,t,e.tag)}break}}}return n.documents}function bs(e,t,n){e.events.push({type:I.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function xs(e,t,n,r,i,a,o){e.events.push({type:I.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function Ss(e,t,n,r,i,a,o){e.events.push({type:I.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function Cs(e,t){e.events.splice(t.eventsLength,0,{type:I.MAPPING,start:t.position,anchorStart:z,anchorEnd:z,tagStart:z,tagEnd:z,style:pl.FLOW})}function ws(e,t,n,r,i,a,o,s,c=R.CLIP,l=-1,u=!1){e.events.push({type:I.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:a,tagEnd:o,style:s,chomping:c,indent:l,fast:u})}function Ts(e,t,n){e.events.push({type:I.ALIAS,anchorStart:t,anchorEnd:n})}function Es(e){e.events.push({type:I.POP})}function j(e){ws(e,z,z,z,z,z,z,L.PLAIN)}function Ds(){return{anchorStart:z,anchorEnd:z,tagStart:z,tagEnd:z}}function Os(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function ks(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function M(e,t){fl.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function N(e){return e===10||e===13}function As(e){return e===9||e===32}function js(e){return As(e)||N(e)}function Ms(e){return e===0||js(e)}function Ns(e){return e===44||e===91||e===93||e===123||e===125}function Ps(e){return e>=48&&e<=57?e-48:-1}function Fs(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function Is(e){return e===120?2:e===117?4:e===85?8:0}function Ls(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function Rs(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function P(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||js(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;As(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!N(r)&&r!==0);if(!N(r))break;for(Rs(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function zs(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let n=e.input.charCodeAt(t+3);return n===0||js(n)}return!1}function Bs(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function Vs(e){if(e.position!==e.lineStart)return!1;if(zs(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=Os(e);Bs(e),P(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&zs(e));return ks(e,t),r}function Hs(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!N(t);)t=e.input.charCodeAt(++e.position)}function Us(e,t,n){El.test(e.input.slice(t,n))&&M(e,`the stream contains non-printable characters`)}function Ws(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==z&&M(e,`duplication of a tag property`);let r=e.position,i=!1,a=!1,o=`!`,s=e.input.charCodeAt(++e.position);s===60?(i=!0,s=e.input.charCodeAt(++e.position)):s===33&&(a=!0,o=`!!`,s=e.input.charCodeAt(++e.position));let c=e.position,l;if(i){for(;s!==0&&s!==62;)s=e.input.charCodeAt(++e.position);s!==62&&M(e,`unexpected end of the stream within a verbatim tag`),l=e.input.slice(c,e.position),e.position++}else{for(;s!==0&&!js(s)&&!(n&&Ns(s));)s===33&&(a?M(e,`tag suffix cannot contain exclamation marks`):(o=e.input.slice(c-1,e.position+1),Ol.test(o)||M(e,`named tag handle cannot contain such characters`),a=!0,c=e.position+1)),s=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),Dl.test(l)&&M(e,`tag suffix cannot contain flow indicator characters`)}return l&&!(i?jl.test(l):Ml.test(l))&&M(e,`tag name cannot contain such characters: ${l}`),!i&&o!==`!`&&o!==`!!`&&!xl.call(e.tagHandlers,o)&&M(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Gs(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==z&&M(e,`duplication of an anchor property`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!js(e.input.charCodeAt(e.position))&&!Ns(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&M(e,`name of an anchor node must contain at least one character`),t.anchorStart=n,t.anchorEnd=e.position,!0}function Ks(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==z||t.tagStart!==z)&&M(e,`alias node should not have any properties`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!js(e.input.charCodeAt(e.position))&&!Ns(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&M(e,`name of an alias node must contain at least one character`),Ts(e,n,e.position),!0}function qs(e,t){P(e,!1),e.lineIndent<t&&M(e,`deficient indentation`)}function Js(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let t=e.position;return e.position++,ws(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,L.SINGLE_QUOTED,R.CLIP,-1,i),!0}N(a)?(i=!1,qs(e,t)):e.position===e.lineStart&&zs(e)?M(e,`unexpected end of the document within a single quoted scalar`):a!==9&&a<32?M(e,`expected valid JSON character`):e.position++}M(e,`unexpected end of the stream within a single quoted scalar`)}function Ys(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===34){let t=e.position;return e.position++,ws(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,L.DOUBLE_QUOTED,R.CLIP,-1,i),!0}if(a===92){i=!1;let n=e.input.charCodeAt(++e.position);if(N(n))qs(e,t);else if(Ls(n))e.position++;else{let t=Is(n);for(t===0&&M(e,`unknown escape sequence`);t-->0;)e.position++,Fs(e.input.charCodeAt(e.position))<0&&M(e,`expected hexadecimal character`);e.position++}}else N(a)?(i=!1,qs(e,t)):e.position===e.lineStart&&zs(e)?M(e,`unexpected end of the document within a double quoted scalar`):a!==9&&a<32?M(e,`expected valid JSON character`):e.position++}M(e,`unexpected end of the stream within a double quoted scalar`)}function Xs(e,t,n){let r=e.input.charCodeAt(e.position),i=R.CLIP,a=-1,o=!1;if(r!==124&&r!==62)return!1;let s=r===124?L.LITERAL_BLOCK:L.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let n=e.input.charCodeAt(e.position),r=Ps(n);if(n===43||n===45)i!==R.CLIP&&M(e,`repeat of a chomping mode identifier`),i=n===43?R.KEEP:R.STRIP,e.position++;else if(r>=0)r===0&&M(e,`bad explicit indentation width of a block scalar; it cannot be less than one`),o&&M(e,`repeat of an indentation width identifier`),a=t+r-1,o=!0,e.position++;else break}let c=!1;for(;As(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&Hs(e),N(e.input.charCodeAt(e.position))?Rs(e):e.input.charCodeAt(e.position)!==0&&M(e,`a line break is expected`);let l=o?a:-1,u=0,d=e.position,f=e.position;for(;e.input.charCodeAt(e.position)!==0;){let n=e.position,r=0;for(;e.input.charCodeAt(n+r)===32;)r++;let i=e.input.charCodeAt(n+r);if(i===0){l>=0?r>l&&(f=n+r):r>0&&(f=n+r);break}if(Vs(e))break;if(!o&&l===-1&&N(i)&&(u=Math.max(u,r)),!o&&l===-1&&!N(i)&&(i===9&&r<t&&(e.position=n+r,M(e,`tab characters must not be used in indentation`)),r>=t&&r<u&&(e.position=n+r,M(e,`bad indentation of a mapping entry`))),l===-1&&i!==0&&!N(i)&&r<t){e.lineIndent=r,e.position=n+r;break}!o&&i!==0&&!N(i)&&l===-1&&(l=r);let a=l===-1?t+1:l;if(i!==0&&!N(i)&&r<a){e.lineIndent=r,e.position=n+r;break}Hs(e),f=e.position,N(e.input.charCodeAt(e.position))&&(Rs(e),f=e.position)}return Us(e,d,f),ws(e,d,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,s,i,l),!0}function Zs(e,t){let n=e.input.charCodeAt(e.position),r=t===Sl;if(n===0||js(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||r&&Ns(n))return!1;if(n===63||n===45){let t=e.input.charCodeAt(e.position+1);if(Ms(t)||r&&Ns(t))return!1}return!0}function Qs(e,t,n,r){if(!Zs(e,n))return!1;let i=e.position,a=e.position,o=e.input.charCodeAt(e.position),s=n===Sl,c=!1;for(;o!==0&&!Vs(e);){if(o===58){let t=e.input.charCodeAt(e.position+1);if(Ms(t)||s&&Ns(t))break}else if(o===35){if(js(e.input.charCodeAt(e.position-1)))break}else if(s&&Ns(o))break;else if(N(o)){let n=e.position,r=e.line,i=e.lineStart,a=e.lineIndent;if(P(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=n,e.line=r,e.lineStart=i,e.lineIndent=a;break}As(o)||(a=e.position+1),o=e.input.charCodeAt(++e.position)}return a!==i&&(Us(e,i,a),ws(e,i,a,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,L.PLAIN,R.CLIP,-1,!c),!0)}function $s(e,t){let n=e.line;P(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&M(e,`deficient indentation`)}function ec(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,a=e.position,o=!0;if(r!==91&&r!==123)return!1;let s=i?125:93;for(i?Ss(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,pl.FLOW):xs(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,pl.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){$s(e,t);let n=e.input.charCodeAt(e.position);if(n===s)return e.position++,Es(e),!0;o?n===44&&M(e,`expected the node content, but found ','`):M(e,`missed comma between flow collection entries`);let r=!1,a=!1;n===63&&js(e.input.charCodeAt(e.position+1))&&(r=a=!0,e.position+=1,$s(e,t));let c=e.line,l=Os(e),u=rc(e,t,Sl,!1,!0);$s(e,t),n=e.input.charCodeAt(e.position),(i||a||e.line===c)&&n===58?(r=!0,e.position++,$s(e,t),i||Cs(e,l),u||j(e),rc(e,t,Sl,!1,!0)||j(e),$s(e,t),i||Es(e)):i&&r?(u||j(e),j(e)):i?j(e):r&&(Cs(e,l),u||j(e),j(e),Es(e)),n=e.input.charCodeAt(e.position),n===44?(o=!0,e.position++):o=!1}M(e,`unexpected end of the stream within a flow collection`)}function tc(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!Ms(e.input.charCodeAt(e.position+1)))return!1;for(xs(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,pl.BLOCK);e.input.charCodeAt(e.position)===45&&Ms(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,M(e,`tab characters must not be used in indentation`));let n=e.line;e.position++;let r=P(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&Ms(e.input.charCodeAt(e.position+1))&&M(e,`bad indentation of a sequence entry`),r&&e.lineIndent<=t?j(e):rc(e,t,wl,!1,!0),P(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&M(e,`bad indentation of a sequence entry`),e.line===n&&e.input.charCodeAt(e.position)===45&&Ms(e.input.charCodeAt(e.position+1))&&M(e,`bad indentation of a sequence entry`)}return Es(e),!0}function nc(e,t,n,r){let i=!1,a=!1,o=!1,s=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,M(e,`tab characters must not be used in indentation`));let l=e.input.charCodeAt(e.position+1),u=e.line;if((c===63||c===58)&&Ms(l))o||=(Ss(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,pl.BLOCK),!0),c===63?(i&&j(e),a=!0,i=!0):i?i=!1:(j(e),a=!0,i=!1),e.position+=1,s=!0;else{i&&=(j(e),!1);let t=Os(e);if(!rc(e,n,Cl,!1,!0))break;if(e.line===u){for(c=e.input.charCodeAt(e.position);As(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),Ms(c)||M(e,`a whitespace character is expected after the key-value separator within a block mapping`),o||=(e.events.splice(t.eventsLength,0,{type:I.MAPPING,start:t.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:pl.BLOCK}),!0),a=!0,i=!1,s=!1;else if(a)M(e,`expected ':' after a mapping key`);else return r.anchorStart!==z||r.tagStart!==z?(ks(e,t),!1):!0}else if(a)M(e,`can not read a block mapping entry; a multiline key may not be an implicit key`);else return r.anchorStart!==z||r.tagStart!==z?(ks(e,t),!1):!0}if(rc(e,t,Tl,!0,s)&&(s=!1),i||(s&&=(j(e),!1)),P(e,!0),c=e.input.charCodeAt(e.position),(e.line===u||e.lineIndent>t)&&c!==0)M(e,`bad indentation of a mapping entry`);else if(e.lineIndent<t)break}return a?(i&&j(e),o&&Es(e),!0):!1}function rc(e,t,n,r,i,a=!0){e.depth>=e.maxDepth&&M(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,s=!1,c=!1,l=null,u=Ds(),d=n===Tl||n===wl,f=d,p=d;if(r&&P(e,!0)&&(s=!0,o=e.lineIndent>t?1:e.lineIndent===t?0:-1),o===1)for(;;){let r=e.input.charCodeAt(e.position),i=Os(e);if(s&&o!==1&&(r===33||r===38))break;if(s&&p&&(u.tagStart!==z||u.anchorStart!==z)&&(r===33||r===38)){let n=Os(e),r=t+1;if(nc(e,e.position-e.lineStart,r,u)&&e.events[n.eventsLength]?.type===I.MAPPING)return e.depth--,!0;ks(e,n)}if(s&&(r===33&&u.tagStart!==z||r===38&&u.anchorStart!==z)||!Ws(e,u,n===Sl)&&!Gs(e,u))break;l===null&&(l=i),P(e,!0)?(s=!0,f=p,o=e.lineIndent>t?1:e.lineIndent===t?0:-1):f=!1}if(f&&=s||i,o===1||n===Tl){let r=n===Sl||n===Cl?t:t+1,i=e.position-e.lineStart;if(o===1){if(f&&(tc(e,i,u)||nc(e,i,r,u))||ec(e,r,u))c=!0;else{let t=e.input.charCodeAt(e.position);if(l!==null&&a&&p&&!f&&t!==124&&t!==62){let t=Os(e),n=l.position-l.lineStart;ks(e,l),nc(e,n,r,Ds())&&e.events[t.eventsLength]?.type===I.MAPPING?c=!0:ks(e,t)}!c&&(d&&Xs(e,r,u)||Js(e,r,u)||Ys(e,r,u)||Ks(e,u)||Qs(e,r,n,u))&&(c=!0)}}else o===0&&(c=f&&tc(e,i,u))}return d&&=!c,!c&&(u.anchorStart!==z||u.tagStart!==z||d)&&(ws(e,z,z,u.anchorStart,u.anchorEnd,u.tagStart,u.tagEnd,L.PLAIN),c=!0),e.depth--,c||u.anchorStart!==z||u.tagStart!==z}function ic(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!js(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&M(e,`directive name must not be less than one character in length`);e.input.charCodeAt(e.position)!==0&&!N(e.input.charCodeAt(e.position));){for(;As(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||N(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!js(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(t,e.position))}if(N(e.input.charCodeAt(e.position))&&Rs(e),n===`YAML`){e.directives.some(e=>e.kind===`yaml`)&&M(e,`duplication of %YAML directive`),r.length!==1&&M(e,`YAML directive accepts exactly one argument`);let t=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);t===null&&M(e,`ill-formed argument of the YAML directive`),parseInt(t[1],10)!==1&&M(e,`unacceptable YAML version of the document`),e.directives.push({kind:`yaml`,version:r[0]})}else if(n===`TAG`){r.length!==2&&M(e,`TAG directive accepts exactly two arguments`);let[t,n]=r;Ol.test(t)||M(e,`ill-formed tag handle (first argument) of the TAG directive`),xl.call(e.tagHandlers,t)&&M(e,`there is a previously declared suffix for "${t}" tag handle`),Nl.test(n)||M(e,`ill-formed tag prefix (second argument) of the TAG directive`),e.tagHandlers[t]=n,e.directives.push({kind:`tag`,handle:t,prefix:n})}return!0}function ac(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(P(e,!0);ic(e);)t=!0,P(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&Ms(e.input.charCodeAt(e.position+3))){n=!0;let t=e.line;e.position+=3,P(e,!0),i=e.line>t}else t&&M(e,`directives end mark is expected`);let a=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&zs(e)){e.position+=3,P(e,!0);return}if(bs(e,n,!1),rc(e,e.lineIndent-1,Tl,!1,i,i)||j(e),P(e,!0),e.position===e.lineStart&&zs(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let t=e.line;e.position+=3,P(e,!0),e.line===t&&e.position<e.length&&M(e,`end of the stream or a document separator is expected`)}let o=e.events[a];o?.type===I.DOCUMENT&&(o.explicitEnd=r),Es(e),!r&&e.position<e.length&&!Vs(e)&&M(e,`end of the stream or a document separator is expected`)}function oc(e,t){let n=e.length,r={...Pl,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf(`\0`);for(i!==-1&&fl.throwAt(e,i,`null byte is not allowed in input`,r.filename);r.position<r.length&&(Bs(r),P(r,!0),!(r.position>=r.length));){let e=r.position;ac(r),r.position===e&&M(r,`can not read a document`)}return r.events}function sc(e,t={}){let n={...Fl,...t},r=String(e),i=Object.keys(Pl),a=Object.keys(bl);return ys(oc(r,Vo(n,i)),{...Vo(n,a),source:r})}function cc(e,t){let n=sc(e,t);if(n.length===0)throw new fl(`expected a document, but the input is empty`);if(n.length===1)return n[0];throw new fl(`expected a single document in the stream, but found more`)}function lc(e,t){return!!(e&1<<t)}function uc(e){return e.presenterOptions.quoteStyle===`single`&&lc(e.allowedStylesMask,L.SINGLE_QUOTED)?L.SINGLE_QUOTED:L.DOUBLE_QUOTED}function dc(e){e.presenterOptions.quoteFlowKeys&&e.isKey&&e.flowOnly&&e.style===L.PLAIN&&(e.style=L.DOUBLE_QUOTED)}function fc(e){e.style===L.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=L.DOUBLE_QUOTED)}function pc(e){e.style===L.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=L.DOUBLE_QUOTED)}function mc(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==L.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?L.DOUBLE_QUOTED:uc(e)))}function hc(e){if(e.style!==L.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!lc(e.allowedStylesMask,L.LITERAL_BLOCK)){n&&(e.style=L.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=L.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),a=0,o=!1;for(;a<=t.length;){let e=t.length,n=t.indexOf(`
`,a);n!==-1&&(e=n);let r=t.slice(a,e);if(r.length>i&&r[0]!==` `&&/ [^ \t]/.test(r)&&(o=!0),n===-1)break;a=n+1}o?e.style=L.FOLDED_BLOCK:n&&(e.style=L.LITERAL_BLOCK)}function gc(e){e.style===L.PLAIN&&!lc(e.allowedStylesMask,L.PLAIN)&&(e.style=uc(e))}function _c(e){lc(e.allowedStylesMask,e.style)||(e.style=L.DOUBLE_QUOTED)}var F,vc,yc,bc,xc,Sc,Cc,wc,Tc,Ec,Dc,Oc,kc,Ac,jc,Mc,Nc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl,ll,ul,dl,fl,I,L,pl,R,ml,hl,gl,_l,vl,yl,bl,z,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl,Ql,$l,eu,tu,nu,ru,iu,au,ou,su,cu,lu=o((()=>{F=Symbol(`NOT_RESOLVED`),vc=k(`tag:yaml.org,2002:str`,{resolve:e=>e,identify:e=>typeof e==`string`}),yc=[``,`~`,`null`,`Null`,`NULL`],bc=k(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>yc.indexOf(e)===-1?F:null,identify:e=>e===null,represent:()=>`null`}),xc=k(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[`n`],resolve:(e,t)=>e===`null`||t&&e===``?null:F,identify:e=>e===null,represent:()=>`null`}),Sc=[``,`~`,`null`,`Null`,`NULL`],Cc=k(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>Sc.indexOf(e)===-1?F:null,identify:e=>e===null,represent:()=>`null`}),wc=[`true`,`True`,`TRUE`],Tc=[`false`,`False`,`FALSE`],Ec=k(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`T`,`f`,`F`],resolve:e=>wc.indexOf(e)!==-1||Tc.indexOf(e)===-1&&F,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Dc=[`true`],Oc=[`false`],kc=k(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`f`],resolve:e=>Dc.indexOf(e)!==-1||Oc.indexOf(e)===-1&&F,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Ac=[`true`,`True`,`TRUE`,`y`,`Y`,`yes`,`Yes`,`YES`,`on`,`On`,`ON`],jc=[`false`,`False`,`FALSE`,`n`,`N`,`no`,`No`,`NO`,`off`,`Off`,`OFF`],Mc=k(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`y`,`Y`,`n`,`N`,`t`,`T`,`f`,`F`,`o`,`O`],resolve:e=>Ac.indexOf(e)!==-1||jc.indexOf(e)===-1&&F,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),Nc=RegExp(`^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Pc=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Fc=k(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:To,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Ic=RegExp(`^-?(?:0|[1-9][0-9]*)$`),Lc=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),Rc=k(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Do,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),zc=RegExp(`^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$`),Bc=k(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:ko,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Vc=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Hc=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Uc=k(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Ao,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:jo}),Wc=RegExp(`^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$`),Gc=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Kc=k(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Mo,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:No}),qc=RegExp(`^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Jc=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Yc=k(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Po,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Fo}),Xc=k(`tag:yaml.org,2002:merge`,{implicit:!0,implicitFirstChars:[`<`],resolve:(e,t)=>e===`<<`||t&&e===``?`<<`:F,identify:()=>!1}),Zc=/^[A-Za-z0-9+/]*={0,2}$/,Qc=k(`tag:yaml.org,2002:binary`,{resolve:Io,identify:e=>Object.prototype.toString.call(e)===`[object Uint8Array]`,represent:Lo}),$c=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$`),el=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$`),tl=k(`tag:yaml.org,2002:timestamp`,{implicit:!0,implicitFirstChars:[...`0123456789`],resolve:zo,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),nl=So(`tag:yaml.org,2002:seq`,{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray}),rl=So(`tag:yaml.org,2002:omap`,{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return`cannot resolve an ordered map item`;n=t.keys().next().value}else if(Bo(t)){let e=Object.keys(t);if(e.length!==1)return`cannot resolve an ordered map item`;n=e[0]}else return`cannot resolve an ordered map item`;return e.seen.has(n)?`duplicate key in ordered map`:(e.seen.add(n),e.list.push(t),``)},finalize:e=>e.list,identify:()=>!1}),il=So(`tag:yaml.org,2002:pairs`,{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size===1?(e.push(t.entries().next().value),``):`cannot resolve a pairs item`;if(Object.prototype.toString.call(t)!==`[object Object]`)return`cannot resolve a pairs item`;let n=t,r=Object.keys(n);return r.length===1?(e.push([r[0],n[r[0]]]),``):`cannot resolve a pairs item`},identify:()=>!1}),al=Co(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Bo,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(typeof t==`object`&&t)return`object-based map does not support complex keys`;let r=String(t);return r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``},has:(e,t)=>typeof t==`object`&&t?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),ol=Co(`tag:yaml.org,2002:set`,{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n===null?(e.add(t),``):`cannot resolve a set item`,has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null}),sl=class e{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(e){let t=Wo(e),n=[],r=Ho(),i=Uo();for(let e of t){if(e.nodeKind===`scalar`&&e.implicit){if(e.matchByTagPrefix)throw Error(`Implicit scalar tags cannot match by tag prefix`);n.push(e)}switch(e.nodeKind){case`scalar`:e.matchByTagPrefix?i.scalar.push(e):r.scalar[e.tagName]=e;break;case`sequence`:e.matchByTagPrefix?i.sequence.push(e):r.sequence[e.tagName]=e;break;case`mapping`:e.matchByTagPrefix?i.mapping.push(e):r.mapping[e.tagName]=e}}let a=n.filter(e=>e.implicitFirstChars===null),o=new Set;for(let e of n)if(e.implicitFirstChars!==null)for(let t of e.implicitFirstChars)o.add(t);let s=new Map;for(let e of o)s.set(e,n.filter(t=>t.implicitFirstChars===null||t.implicitFirstChars.indexOf(e)!==-1));let c=r.scalar[`tag:yaml.org,2002:str`];if(!c)throw Error(`schema does not define the default scalar tag (tag:yaml.org,2002:str)`);this.tags=t,this.implicitScalarTags=n,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=c,this.defaultSequenceTag=r.sequence[`tag:yaml.org,2002:seq`],this.defaultMappingTag=r.mapping[`tag:yaml.org,2002:map`],this.exact=r,this.prefix=i}lookupScalarTag(e){let t=this.exact.scalar[e];if(t)return t;for(let t of this.prefix.scalar)if(e.startsWith(t.tagName))return t}lookupSequenceTag(e){let t=this.exact.sequence[e];if(t)return t;for(let t of this.prefix.sequence)if(e.startsWith(t.tagName))return t}lookupMappingTag(e){let t=this.exact.mapping[e];if(t)return t;for(let t of this.prefix.mapping)if(e.startsWith(t.tagName))return t}resolveImplicitScalarTag(e){let t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(let n of t){let t=n.resolve(e,!1,n.tagName);if(t!==F)return{value:t,tag:n}}let n=this.defaultScalarTag;return{value:n.resolve(e,!1,n.tagName),tag:n}}withTags(...t){let n=[];for(let e of t)n=n.concat(e);return new e([...this.tags,...n])}},cl=new sl([vc,nl,al]),new sl([...cl.tags,xc,kc,Rc,Kc]),ll=new sl([...cl.tags,bc,Ec,Fc,Uc]),ul=new sl([...cl.tags,Cc,Mc,Bc,Yc,tl,Xc,Qc,rl,il,ol]),ul.withTags({...Bc,resolve:(e,t,n)=>{let r=Bc.resolve(e,t,n);return r===F?Fc.resolve(e,t,n):r}},{...Yc,resolve:(e,t,n)=>{let r=Yc.resolve(e,t,n);return r===F?Uc.resolve(e,t,n):r}}),Co(`tag:yaml.org,2002:map`,{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),``),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Bo(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let e of Object.keys(n))t.set(e,n[e]);return t}}),Co(`tag:yaml.org,2002:map`,{create:()=>({}),identify:Bo,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=Go(t);return r===null?`nested arrays are not supported inside keys`:(r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``)},has:(e,t)=>{let n=Go(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),dl={maxLength:79,indent:1,linesBefore:3,linesAfter:2},fl=class e extends Error{reason;mark;constructor(e,t){super(),this.name=`YAMLException`,this.reason=e,this.mark=t,this.message=Yo(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Yo(this,e)}`}static throwAt(t,n,r,i=``){let a=0,o=0;for(let e=0;e<n;e++){let n=t.charCodeAt(e);n===10?(a++,o=e+1):n===13&&(a++,t.charCodeAt(e+1)===10&&e++,o=e+1)}let s={name:i,buffer:t,position:n,line:a,column:n-o};throw s.snippet=Jo(s),new e(r,s)}},I={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},L={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},pl={BLOCK:1,FLOW:2},R={CLIP:1,STRIP:2,KEEP:3},ml=-1,hl=Array(256),gl=Array(256);for(let e=0;e<256;e++)hl[e]=+!!Xo(e),gl[e]=Xo(e);_l=Object.assign(Object.create(null),{"!":`!`,"!!":`tag:yaml.org,2002:`}),vl=-1,yl=`tag:yaml.org,2002:merge`,bl={filename:``,schema:ll,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1},z=-1,xl=Object.prototype.hasOwnProperty,Sl=1,Cl=2,wl=3,Tl=4,El=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Dl=/[,\[\]{}]/,Ol=/^(?:!|!!|![0-9A-Za-z-]+!)$/,kl=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Al=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,jl=RegExp(`^(?:${kl})*$`),Ml=RegExp(`^(?:${Al})+$`),Nl=RegExp(`^(?:!(?:${kl})*|${Al}(?:${kl})*)$`),Pl={filename:``,maxDepth:100},Fl={...Pl,...bl},Il={applyQuoteFlowKeysOption:dc,doubleQuoteForInvisibles:fc,doubleQuoteWhitespaceOnly:pc,applyForceQuotesOption:mc,tryLongOrMultilineAsBlock:hc,quoteInvalidPlain:gc,fallbackToDoubleQuoted:_c},Ll=`[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]`,Rl=`[\\n\\r]`,zl=`\\uFEFF`,Bl=`[ \\t]`,Vl=`(?:(?!(?:${Rl}|${zl}))${Ll})`,Hl=`(?:(?!${Bl})${Vl})`,Ul=`[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]`,Wl=`[-?:,\\[\\]{}#&*!|>'"%@\`]`,Gl=`[,\\[\\]{}]`,Kl=Hl,ql=`(?:(?!${Gl})${Hl})`,Jl=`(?:(?:(?!${Wl})${Hl})|[?:-](?=${Kl}))`,Yl=`(?:(?:(?!${Wl})${Hl})|[?:-](?=${ql}))`,Xl=`(?:(?:(?![:#])${Kl})|:(?=${Kl}))#*`,Zl=`(?:(?:(?![:#])${ql})|:(?=${ql}))#*`,Ql=`(?:${Bl}*${Xl})*`,$l=`(?:${Bl}*${Zl})*`,eu=`${Jl}#*${Ql}`,tu=`${Yl}#*${$l}`,nu=eu,ru=tu,iu=`\\n+${Xl}${Ql}`,au=`\\n+${Zl}${$l}`,ou=`${eu}(?:${iu})*`,su=`${tu}(?:${au})*`,RegExp(`^(?:${ou})$`,`u`),RegExp(`^(?:${su})$`,`u`),RegExp(`^(?:${nu})$`,`u`),RegExp(`^(?:${ru})$`,`u`),RegExp(`^(?:${Ul})*$`,`u`),RegExp(`^(?:${Ul}|\\n)*$`,`u`),RegExp(`^(?:${Vl}|\\n)*$`,`u`),cu={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:`single`,forceQuotes:!1,scalarStyleRules:Object.keys(Il).map(e=>Reflect.get(Il,e)),tagBeforeAnchor:!1},{...cu},I.DOCUMENT,I.SEQUENCE,I.MAPPING,I.SCALAR,I.ALIAS,I.POP,L.PLAIN,L.SINGLE_QUOTED,L.DOUBLE_QUOTED,L.LITERAL_BLOCK,L.FOLDED_BLOCK,pl.BLOCK,pl.FLOW,R.CLIP,R.STRIP,R.KEEP})),uu=s(((e,t)=>{t.exports=function(e,t){var n=`-`,r=n.charCodeAt(0),i=n.length;function a(e,a,o,s){var c,l,u,d,f,p,m,h=!1,g=e.bMarks[a]+e.tShift[a],_=e.eMarks[a];if(a!==0||r!==e.src.charCodeAt(0))return!1;for(c=g+1;c<=_;c++)if(n[(c-g)%i]!==e.src[c]){m=c+1;break}if(u=Math.floor((c-g)/i),u<3)return!1;if(c-=(c-g)%i,s)return!0;for(l=a;l++,!(l>=o||e.src.slice(g,_)===`...`||(g=e.bMarks[l]+e.tShift[l],_=e.eMarks[l],g<_&&e.sCount[l]<e.blkIndent));)if(r===e.src.charCodeAt(g)&&!(e.sCount[l]-e.blkIndent>=4)){for(c=g+1;c<=_&&n[(c-g)%i]===e.src[c];c++);if(!(Math.floor((c-g)/i)<u)&&(c-=(c-g)%i,c=e.skipSpaces(c),!(c<_))){h=!0;break}}return f=e.parentType,p=e.lineMax,e.parentType=`container`,e.lineMax=l,d=e.push(`front_matter`,null,0),d.hidden=!0,d.markup=e.src.slice(a,c),d.block=!0,d.map=[a,l+ +!!h],d.meta=e.src.slice(m,g-1),e.parentType=f,e.lineMax=p,e.line=l+ +!!h,t(d.meta),!0}e.block.ruler.before(`table`,`front_matter`,a,{alt:[`paragraph`,`reference`,`blockquote`,`list`]})}}));function du(){return e=>{let t=``;e.use(_u.default,n=>{let r=fu(n);t=r===void 0?``:pu(r,e.utils.escapeHtml)}),e.renderer.rules.front_matter=(e,n,r,i,a)=>t===``?``:`<table class="markdown-frontMatter"${a.renderAttrs(e[n])}>\n${t}\n</table>\n`}}function fu(e){try{let t=cc(e,{schema:ll});if(typeof t==`object`&&t&&!Array.isArray(t)&&Object.keys(t).length>0)return t}catch{}}function pu(e,t){let n=Object.entries(e);return n.length===0?``:`<tbody>\n${n.map(([e,n])=>`<tr><th scope="row">${t(e)}</th><td>${mu(n,t)}</td></tr>`).join(`
`)}\n</tbody>`}function mu(e,t){if(e==null)return``;if(e instanceof Date)return t(hu(e));if(Array.isArray(e))return e.every(gu)?e.map(e=>mu(e,t)).join(`, `):`<ul>${e.map(e=>`<li>${mu(e,t)}</li>`).join(``)}</ul>`;if(typeof e==`object`){let n=pu(e,t);return n===``?``:`<table>${n}</table>`}return t(String(e))}function hu(e){if(Number.isNaN(e.getTime()))return``;let t=e.toISOString();return t.endsWith(`T00:00:00.000Z`)?t.slice(0,10):t}function gu(e){if(e==null||e instanceof Date)return!0;let t=typeof e;return t===`string`||t===`number`||t===`boolean`||t===`bigint`}var _u,vu=o((()=>{lu(),_u=u(uu())}));function yu(e,t={}){return e??t}function bu(e,t=!0){return e??t}var xu,B,Su,Cu,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Nu,Pu,Fu=o((()=>{xu={rootValueKey:`extension.markeditPreview`,defaultModes:[`edit`,`side-by-side`,`preview`,`syntax-hidden`],defaultPreset:`default`},B=yu(yu(f.MarkEdit.userSettings)[xu.rootValueKey]),Su=yu(B.changeMode),Cu=yu(B.markdownIt),wu=bu(B.syncScroll),B.hidePreviewButtons,B.syntaxAutoDetect,Tu=bu(B.imageHoverPreview,!1),Eu=bu(B.inlineImages,!1),Du=Array.isArray(B.inlineRendering)?B.inlineRendering.filter(e=>e===`image`||e===`table`||e===`math`||e===`mermaid`||e===`html`):Eu?[`image`,`math`,`mermaid`]:[`math`,`mermaid`],Ou=B.themeName??`github`,ku=Ou===`none`,Au=B.styledHtmlColorScheme??B.styledHtmlTheme??`auto`,B.mathDelimiters,ju=Su.modes??xu.defaultModes,Mu=yu(Su.hotKey),Nu=Cu.preset??xu.defaultPreset,Pu=yu(Cu.options)})),Iu,Lu=o((()=>{Iu=`.markdown-body {
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
`})),Ru,zu=o((()=>{Ru=`.markdown-body {
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
`})),Bu,Vu=o((()=>{Bu=`.markdown-body {
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
`})),Hu,Uu=o((()=>{Hu=`.markdown-body {
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
`})),Wu,Gu=o((()=>{Wu=`.markdown-body {
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
`})),Ku,qu=o((()=>{Ku=`.markdown-body {
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
`})),Ju,Yu=o((()=>{Ju=`.markdown-body {
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
`})),Xu,Zu=o((()=>{Xu=`.markdown-body {
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
`})),Qu,$u=o((()=>{Qu=`.markdown-body {
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
`})),ed,td=o((()=>{ed=`.markdown-body {
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
`})),nd,rd=o((()=>{nd=`.markdown-body {
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
`})),id,ad=o((()=>{id=`.markdown-body {
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
`})),od,sd=o((()=>{od=`.markdown-body {
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
`})),cd,ld=o((()=>{cd=`.markdown-body {
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
`})),ud,dd=o((()=>{ud=`.markdown-body {
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
`})),fd,pd=o((()=>{fd=`.markdown-body {
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
`})),md,hd=o((()=>{md=`.markdown-body {
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
`})),gd,_d=o((()=>{gd=`.markdown-alert {
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
`})),vd,yd=o((()=>{vd=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`})),bd,xd=o((()=>{bd=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`})),Sd,Cd=o((()=>{Sd=`.code-copy-wrapper {
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
`}));function wd(e=`auto`){if(ku)return``;let t=Ad[Ou]??Ad.github,n=t.light??t.dark,r=t.dark??t.light,i=ne(n)??`#ffffff`,a=ne(r)??`#0d1117`;return[`.markdown-body { padding: 25px; }`,...kd(e,`body { background: ${i}; }`,`body { background: ${a}; }`)].join(`
`)}function Td(e,t){let n=Ad[e.replace(/-(light|dark|dawn)$/,``)]??Ad.github,r=t?n.dark??n.light:n.light??n.dark;return`${Iu}\n${r}`}function Ed(e=`auto`){if(ku)return[`:root { color-scheme: ${e===`auto`?`light dark`:e}; }`,`body, .markdown-body { background: Canvas; color: CanvasText; }`].join(`
`);let t=Ad[Ou]??Ad.github,n=t.light??t.dark,r=t.dark??t.light;return[Iu,...kd(e,n,r)].join(`
`)}function Dd(e=`auto`){return[gd,...kd(e,vd,bd)].join(`
`)}function Od(){return Sd}function kd(e,t,n){let r=[];switch(e){case`light`:r.push(t);break;case`dark`:r.push(n);break;case`auto`:r.push(`
        ${t}
        @media (prefers-color-scheme: dark) {
          ${n}
        }`)}return r}var Ad,jd=o((()=>{me(),Fu(),Lu(),zu(),Vu(),Uu(),Gu(),qu(),Yu(),Zu(),$u(),td(),rd(),ad(),sd(),ld(),dd(),pd(),hd(),_d(),yd(),xd(),Cd(),Ad={github:{light:Ru,dark:Bu},cobalt:{dark:Hu},dracula:{dark:Wu},minimal:{light:Ku,dark:Ju},"night-owl":{dark:Xu},"rose-pine":{light:Qu,dark:ed},solarized:{light:nd,dark:id},synthwave84:{dark:od},"winter-is-coming":{light:cd,dark:ud},xcode:{light:fd,dark:md}}}));function V(e){return Pd[e]}var Md,Nd,Pd,Fd=o((()=>{Md={default:{viewMode:`View Mode`,changeMode:`Change Mode`,editMode:`Markdown Source`,sideBySideMode:`Preview (Side-by-Side)`,previewMode:`Preview (Overlay)`,syntaxHiddenMode:`Mixed (Syntax Hidden)`,saveCleanHtml:`Save Clean HTML`,saveStyledHtml:`Save Styled HTML`,copyHtml:`Copy HTML`,copyRichText:`Copy Rich Text`,copyCode:`Copy Code`,failedToCopy:`Failed to copy. Please try again.`,untitled:`Untitled`,version:`Version`,source:`Source`,preview:`Preview`,goToFootnoteDefinition:`Go to definition [%s]`,backToFootnoteReference:`Back to reference [%s]`},"zh-CN":{viewMode:`视图模式`,changeMode:`切换模式`,editMode:`Markdown 源码`,sideBySideMode:`预览（并排）`,previewMode:`预览（覆盖）`,syntaxHiddenMode:`混合（隐藏语法）`,saveCleanHtml:`保存无样式 HTML`,saveStyledHtml:`保存带样式 HTML`,copyHtml:`复制 HTML`,copyRichText:`复制富文本`,copyCode:`复制代码`,failedToCopy:`复制失败，请重试。`,untitled:`未命名`,version:`版本`,source:`源码`,preview:`预览`,goToFootnoteDefinition:`跳转到定义 [%s]`,backToFootnoteReference:`返回引用 [%s]`},"zh-TW":{viewMode:`視圖模式`,changeMode:`切換模式`,saveCleanHtml:`儲存無樣式 HTML`,saveStyledHtml:`儲存帶樣式 HTML`,copyHtml:`拷貝 HTML`,copyRichText:`複製富文字`,copyCode:`拷貝程式碼`,failedToCopy:`複製失敗，請再試一次。`,editMode:`Markdown 原始碼`,sideBySideMode:`預覽（並排）`,previewMode:`預覽（覆蓋）`,syntaxHiddenMode:`混合（隱藏語法）`,untitled:`未命名`,version:`版本`,source:`原始碼`,preview:`預覽`,goToFootnoteDefinition:`前往定義 [%s]`,backToFootnoteReference:`返回引用 [%s]`}},Nd=[`default`,`zh-CN`,`zh-TW`],Pd=Md[(()=>{let e=navigator.language;return Nd.includes(e)?e:`default`})()]}));function Id(){return typeof f.MarkEdit.addExtension==`function`}var Ld=o((()=>{}));async function Rd(e,t=!0){return await qd,H.render(e,{lineInfo:t})}async function zd(e){await qd;let t={lineInfo:!1},n=H.parse(e,t),r=[];for(let e=0;e<n.length;e+=1){let i=n[e];if(i.type!==`table_open`||i.level!==0||i.map===null)continue;let a=e+1;for(;a<n.length&&n[a].type!==`table_close`;)a+=1;a!==n.length&&(r.push({fromLine:i.map[0]+1,toLine:i.map[1],html:H.renderer.render(n.slice(e,a+1),H.options,t)}),e=a)}return r}async function Bd(e,t){if(!t.startsWith(`#`))return;await qd;let n=H.normalizeLink(t).substring(1);return H.parse(e,{}).find(e=>e.type===`heading_open`&&e.attrGet(`id`)===n)?.map?.[0]}function Vd(e){e()}async function Hd(e){let t=e=>`<style>\n${e}\n</style>`;return[`<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>`,`<div class="markdown-body">\n${e}\n</div>`,t(wd(Au)),t(Ed(Au)),t(Dd(Au)),t(Od()),`</body></html>`].join(`
`)}var Ud,Wd,H,Gd,Kd,qd,Jd=o((()=>{Ha(),io(),Ud=u(ao()),go(),Wd=u(_o()),xo(),vu(),jd(),Fd(),Ld(),Fu(),H=Ia(Nu,{html:!0,breaks:!0,linkify:!0,...Pu}),Gd=[],H.use(du()),H.use(Ya),H.use(Ud.default,{matcher:e=>!e.startsWith(`#`),attrs:{target:`_blank`,rel:`noopener`}}),H.use(ho),H.use(Wd.default,{enabled:Id(),label:!0}),H.use(bo),Kd=new Set([`paragraph_open`,`heading_open`,`blockquote_open`,`list_item_open`,`bullet_list_open`,`ordered_list_open`,`fence`,`code_block`,`table_open`,`html_block`,`front_matter`]),qd=Promise.all(Gd).then(()=>{for(let e of Kd){let t=H.renderer.rules[e];H.renderer.rules[e]=(e,n,r,i,a)=>{let o=e[n];return i.lineInfo&&o.map?.length===2&&(o.attrSet(`data-line-from`,String(o.map[0])),o.attrSet(`data-line-to`,String(o.map[1]-1))),t?t(e,n,r,i,a):a.renderToken(e,n,r)}}for(let e of[`fence`,`code_block`]){let t=H.renderer.rules[e];H.renderer.rules[e]=(e,n,r,i,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${t===void 0?a.renderToken(e,n,r):t(e,n,r,i,a)}
        <button title="${V(`copyCode`)}" aria-label="${V(`copyCode`)}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}})}));function Yd(e){let t=ef.parseFromString(e,`text/html`);return t.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Xd(t))}),t.body.innerHTML}function Xd(e){return e.includes(`://`)||e.startsWith(`//`)||e.startsWith(`data:image/`)?e:`${tf}://${e}`}function Zd(e){typeof f.MarkEdit.getFileInfo==`function`&&(document.addEventListener(`mousemove`,e=>{af.panelPresenter!==void 0&&(clearTimeout(af.panelPresenter),af.panelPresenter=void 0),af.panelPresenter=setTimeout(()=>{let t=e.target,n=t?.closest(`.cm-md-link`),r=n?.dataset.linkUrl??n?.innerText??``;n!==null&&le(r)?Qd(n,r):t?.classList.contains(nf)||$d()},600)}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&$d(!1)}),e.addEventListener(`scroll`,()=>$d()))}async function Qd(e,t){if(e===af.focusedElement)return;let n=(await f.MarkEdit.getFileInfo())?.parentPath;if(n===void 0)return;let r=ue(n,t),i=await f.MarkEdit.getFileObject(r);if(i===void 0)return;let a=e.getBoundingClientRect(),o=document.createElement(`img`);o.className=nf,o.style.position=`fixed`,o.style.left=`${a.left}px`,o.style.zIndex=`10000`,o.style.borderRadius=`5px`,o.style.opacity=`0`,o.style.transition=`opacity 120ms`,o.style.cursor=`pointer`,o.onclick=()=>{$d(),window.open(t,`_blank`)},o.onload=()=>{let e=Math.min(o.naturalHeight,240);o.style.height=`${e}px`,a.top>window.innerHeight-a.bottom?o.style.top=`${a.top-e-rf}px`:o.style.top=`${a.bottom+rf}px`,requestAnimationFrame(()=>{o.style.opacity=`1`})},o.src=`data:${i.mimeType??`image/png`};base64,${i.data}`,$d(!1),af.focusedElement=e,document.body.appendChild(o)}function $d(e=!0){af.focusedElement!==void 0&&(af.focusedElement=void 0,document.querySelectorAll(`.${nf}`).forEach(t=>{e?(t.style.opacity=`0`,t.addEventListener(`transitionend`,()=>t.remove(),{once:!0})):t.remove()}))}var ef,tf,nf,rf,af,of=o((()=>{me(),ef=new DOMParser,tf=`image-loader`,nf=`cm-md-image-preview`,rf=5,af={panelPresenter:void 0,focusedElement:void 0}}));Jd(),of(),me(),Fu();function sf(e,t){if(!wu)return;hf.scrollUpdater!==void 0&&clearTimeout(hf.scrollUpdater);let n=f.MarkEdit.editorView.state.doc,r=f.MarkEdit.editorView.state.selection;hf.lastSourceScrollTop=e.scrollTop;let i=()=>{let{doc:i,selection:a}=f.MarkEdit.editorView.state,o=i===n&&!a.eq(r);n=i,r=a,!(!o&&Math.abs(e.scrollTop-hf.lastSourceScrollTop)<.5)&&(hf.lastSourceScrollTop=e.scrollTop,(o||!t.classList.contains(`overlay`))&&cf(e,t))};`onscrollend`in window?e.addEventListener(`scrollend`,i):e.addEventListener(`scroll`,()=>{hf.scrollUpdater!==void 0&&clearTimeout(hf.scrollUpdater),hf.scrollUpdater=setTimeout(i,100)})}function cf(e,t,n=!0){let{line:r,progress:i}=lf(e);uf(t,r,i,n)}function lf(e,t=0){let n=f.MarkEdit.editorView,r=n.lineBlockAtHeight(e.scrollTop+t),i=n.state.doc.lineAt(r.from).number-1,a=ie(n.domAtPos(r.from).node);if(a===null)return{line:i,progress:0};let o=e.getBoundingClientRect(),s=a.getBoundingClientRect(),c=o.top-s.top-t;return{line:i,progress:s.height>0?mf(c/s.height):0}}function uf(e,t,n,r=!0){if(t===0&&n===0)return se(e,0,r);let i=Array.from(document.querySelectorAll(`[data-line-from]`)),a=df(i,t);if(a!==void 0){let{from:i,to:o}=ae(a);return v(e,a,ff(t,n,i,o),r)}if(t===0)return se(e,0,r);let{beforeBlock:o,afterBlock:s}=pf(i,t);if(o!==void 0&&s!==void 0){let i=ae(o),a=ae(s),c=oe(e,o)+o.offsetHeight,l=oe(e,s),u=a.from-i.to,d=t-i.to+n,f=u>0?mf(d/u):0;return se(e,c+(l-c)*f,r)}if(o!==void 0)return v(e,o,1,r);if(s!==void 0)return v(e,s,0,r)}function df(e,t){return e.find(e=>{let{from:n,to:r}=ae(e);return t>=n&&t<=r})}function ff(e,t,n,r){let i=r-n;return i<1?e===n?t:0:mf((e-n+t)/i)}function pf(e,t){let n,r;for(let i of e){let{from:e,to:a}=ae(i);if(a<t)n=i;else if(e>t){r=i;break}}return{beforeBlock:n,afterBlock:r}}function mf(e){return Math.max(0,Math.min(1,e))}var hf={lastSourceScrollTop:0,scrollUpdater:void 0};function gf(e){let t=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return t===null?null:{offset:t[1].length,replacement:t[2]===` `?`x`:` `}}me();function _f(e,t){let n=(t.target instanceof Element?t.target.closest(`a`):null)?.getAttribute(`href`)??``;if(!n.startsWith(`#`))return!1;let r=vf(e,n);return r&&t.preventDefault(),r}function vf(e,t){if(!t.startsWith(`#`))return!1;let n=yf(t.substring(1)),r=[...e.querySelectorAll(`[id]`)].find(e=>e.id===n);return r!==void 0&&(v(e,r,0,!1),!0)}function yf(e){try{return decodeURIComponent(e)}catch{return e}}var bf={containerClass:`markdown-container`,gutterViewClass:`markdown-gutter`,dividerViewClass:`markdown-divider`,previewPaneClass:`markdown-body`},xf={viewModeCacheKey:`ui.view-mode`,previewPageZoomKey:`ui.preview-page-zoom`};function U(e,t,n){return e.selection.ranges.some(e=>e.from<=n&&e.to>=t)}function Sf(e){return t=>{let n=p.EditorSelection.create(t.state.selection.ranges.map(n=>{let r=n;e&&r.undirectional&&r.head>=r.anchor&&(r=p.EditorSelection.range(r.head,r.anchor));let i=e||r.empty?Cf(t,r):p.EditorSelection.cursor(r.from);return!e&&r.empty&&i.head===r.head&&(i=t.moveToLineBoundary(r,!1)),e?p.EditorSelection.range(r.anchor,i.head,i.goalColumn,i.bidiLevel??void 0,i.assoc):i}),t.state.selection.mainIndex);return!n.eq(t.state.selection,!0)&&(t.dispatch({selection:n,scrollIntoView:!0,userEvent:`select`}),!0)}}function Cf(e,t){let n=e.moveVertically(t,!1),r=e.state.doc.lineAt(t.head),i=e.state.doc.lineAt(n.head);if(r.number-i.number<=1)return n;let a=e.state.doc.line(r.number-1);if(!wf(e,a.from))return n;let o=e.lineBlockAt(a.from),s=n.goalColumn,c=e.coordsAtPos(t.head,t.assoc||1),l=s===void 0?c?.left:e.contentDOM.getBoundingClientRect().left+s;if(l===void 0)return n;let u=e.posAndSideAtCoords({x:l,y:e.documentTop+o.top+o.height/2});return u===null||u.pos<a.from||u.pos>a.to?n:p.EditorSelection.cursor(u.pos,u.assoc,void 0,s)}function wf(e,t){for(let n=(0,m.syntaxTree)(e.state).resolve(t,1);n!==null;n=n.parent)if(n.name.startsWith(`ATXHeading`))return!0;return!1}var Tf,Ef,Df,Of,kf=o((()=>{Tf=Sf(!1),Ef=Sf(!0),Df=p.Prec.high(d.keymap.of([{key:`ArrowUp`,run:Tf,shift:Ef}])),Of=d.EditorView.mouseSelectionStyle.of((e,t)=>{if(t.button!==0||t.detail!==1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)return null;let n={x:t.clientX,y:t.clientY},r=e.posAndSideAtCoords(n,!1);return{get(t){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(t.clientX-n.x),Math.abs(t.clientY-n.y))<=5)return p.EditorSelection.create([p.EditorSelection.cursor(r.pos,r.assoc)]);let i=e.posAndSideAtCoords({x:t.clientX,y:t.clientY},!1);return Number.isFinite(i.pos)?i.pos===r.pos?p.EditorSelection.create([p.EditorSelection.cursor(i.pos,i.assoc)]):p.EditorSelection.create([p.EditorSelection.range(r.pos,i.pos,void 0,void 0,i.assoc)]):e.state.selection},update(e){e.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:e.changes.mapPos(r.pos)})}}})}));function Af(e,t){if(e.name!==`Blockquote`)return;let n=e.node.getChild(`Paragraph`);if(n===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==n.from||r.to!==n.to);){if(r.name!==`QuoteMark`)return;r=r.nextSibling}if(r===null)return;let i=t.doc.lineAt(n.from),a=t.sliceDoc(n.from,i.to),o=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(a);if(o===null)return;let s=o[1].toLowerCase(),c=n.from,l=c+o[0].length;if(!U(t,c,l))return{from:c,to:l,type:s,title:Nf[s]}}function jf(e,t){if(e.name===`QuoteMark`&&!U(t,e.from,e.to))return{from:e.from,to:e.to}}function Mf(e){if(e.name!==`Blockquote`)return;let t=1,n=e.node.parent;for(;n!==null;)n.name===`Blockquote`&&(t+=1),n=n.parent;return{from:e.from,to:e.to,depth:t}}var Nf,Pf=o((()=>{kf(),Nf={note:`Note`,tip:`Tip`,important:`Important`,warning:`Warning`,caution:`Caution`}})),Ff,If,Lf=o((()=>{Ff={note:`<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,tip:`<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,important:`<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,warning:`<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,caution:`<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`},If=class extends d.WidgetType{type;title;constructor(e,t){super(),this.type=e,this.title=t}eq(e){return e.type===this.type&&e.title===this.title}toDOM(){let e=document.createElement(`span`);e.className=`cm-md-syntaxHiddenAlert`,e.dataset.type=this.type;let t=e.appendChild(document.createElement(`span`));t.className=`cm-md-syntaxHiddenAlertIcon`,t.innerHTML=Ff[this.type],t.setAttribute(`aria-hidden`,`true`);let n=e.appendChild(document.createElement(`span`));return n.textContent=this.title,e}ignoreEvent(){return!1}}}));function Rf(e){let t=new Map,n=new Map;for(let{from:r,to:i}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:r,to:i,enter:r=>{let i=Mf(r);if(i!==void 0&&t.set(Gf(i),i),r.name!==`QuoteMark`)return;let a=Wf(r.node);if(a===null)return;let o=Gf(a),s=e.state.doc.lineAt(r.from).from,c=n.get(o)??new Map;c.set(s,{position:r.from,active:U(e.state,r.from,r.to)}),n.set(o,c)}});let r=[];return t.forEach((t,i)=>{let a=n.get(i),o=new Set;e.viewportLineBlocks.forEach(n=>{let i=e.state.doc.lineAt(n.from);if(o.has(i.from)||i.to<t.from||i.from>=t.to)return;o.add(i.from);let s=a?.get(i.from);s?.active!==!0&&r.push({line:i.from,ownerFrom:t.from,anchor:s?.position,depth:t.depth})})}),r}function zf(e){let t=Uf(e),n=new Map;return Rf(e).flatMap(r=>{let i=Hf(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(i===void 0||a===null)return[];let o=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(o===void 0){let t=n.get(r.ownerFrom);t===void 0&&(t=Vf(e,r.ownerFrom),n.set(r.ownerFrom,t)),o=a.left+t}let s=Bf(e,r.anchor??r.ownerFrom);return[new qf(r.depth,o-t.left,i.top-t.top,3,i.height,s.color,s.opacity)]})}function Bf(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(i*=e)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:i}}function Vf(e,t){let n=e.state.doc.lineAt(t),r=e.coordsAtPos(n.from,1),i=e.coordsAtPos(t,1);if(r!==null&&i!==null)return i.left-r.left;let a=0;for(let r of e.state.sliceDoc(n.from,t))a=r===`	`?a+e.state.tabSize-a%e.state.tabSize:a+1;return a*e.defaultCharacterWidth}function Hf(e,t){let n=e.domAtPos(t).node;return(n instanceof HTMLElement?n:n.parentElement)?.closest(`.cm-line`)}function Uf(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}function Wf(e){let t=e.parent;for(;t!==null&&t.name!==`Blockquote`;)t=t.parent;return t}function Gf(e){return`${e.from}:${e.to}`}var Kf,qf,Jf=o((()=>{Pf(),kf(),Kf=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenBlockquoteLayer`,markers:zf,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),qf=class extends d.RectangleMarker{color;opacity;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${e}`,t,n,r,i),this.color=a,this.opacity=o}draw(){let e=super.draw();return e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,e}update(e,t){return super.update(e,t)?(e.style.backgroundColor=this.color,e.style.opacity=`${this.opacity}`,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity}}}));function Yf(e,t){if(e.name!==`ListMark`)return;let n=e.node.parent,r=n?.getChild(`Task`),i=r?.getChild(`TaskMarker`);if(n?.name===`ListItem`&&n.parent?.name===`BulletList`&&/^[ \t]$/.test(t.sliceDoc(e.to,e.to+1))&&!U(t,e.from,i?.to??e.to))return{from:e.from,to:e.to,task:r!==null}}var Xf=o((()=>{kf()}));function Zf(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{let r=Yf(n,e.state);r!==void 0&&!r.task&&t.push({from:r.from,to:r.to})}});return t}function Qf(e){let t=ep(e);return Zf(e).flatMap(n=>{let r=e.coordsForChar(n.from);if(r===null)return[];let i=$f(e,n.from);return[new np(r.left-t.left,r.top-t.top,r.right-r.left,r.bottom-r.top,i.color,i.opacity,i.textShadow)]})}function $f(e,t){let n=e.domAtPos(t).node,r=n instanceof HTMLElement?n:n.parentElement,i=getComputedStyle(r??e.contentDOM),a=1;for(let t=r;t!==null&&t!==e.scrollDOM;t=t.parentElement){let e=parseFloat(getComputedStyle(t).opacity);Number.isNaN(e)||(a*=e)}return{color:i.color,opacity:a,textShadow:i.textShadow===`none`?``:i.textShadow}}function ep(e){let t=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===d.Direction.LTR?t.left:t.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:t.top-e.scrollDOM.scrollTop*e.scaleY}}var tp,np,rp=o((()=>{Xf(),tp=(0,d.layer)({above:!1,class:`cm-md-syntaxHiddenListBulletLayer`,markers:Qf,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured),mount:e=>e.setAttribute(`aria-hidden`,`true`)}),np=class extends d.RectangleMarker{color;opacity;textShadow;constructor(e,t,n,r,i,a,o){super(`cm-md-syntaxHiddenListBullet`,e,t,n,r),this.color=i,this.opacity=a,this.textShadow=o}draw(){let e=super.draw();return e.textContent=`•`,e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,e}update(e,t){return super.update(e,t)?(e.style.color=this.color,e.style.opacity=`${this.opacity}`,e.style.textShadow=this.textShadow,!0):!1}eq(e){return super.eq(e)&&this.color===e.color&&this.opacity===e.opacity&&this.textShadow===e.textShadow}}}));function ip(e){let t=[];for(let{from:n,to:r}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:n,to:r,enter:n=>{if(n.name!==`TaskMarker`)return;let r=n.node.parent,i=r?.parent,a=i?.getChild(`ListMark`),o=n.to+1;r?.name===`Task`&&i?.name===`ListItem`&&i.parent?.name===`BulletList`&&a!=null&&e.state.sliceDoc(n.to,o)===` `&&!U(e.state,a.from,n.to)&&t.push({from:a.from,to:o,markerFrom:n.from,listPrefix:e.state.sliceDoc(a.from,a.to+1),checked:e.state.sliceDoc(n.from,n.to)!==`[ ]`,label:e.state.sliceDoc(o,e.state.doc.lineAt(n.to).to).trim()||`Task`})}});return t}function ap(e){let t=e.state.readOnly||!e.state.facet(d.EditorView.editable),n=ip(e).map(e=>d.Decoration.replace({widget:new up(e.markerFrom,e.listPrefix,e.checked,e.label,t)}).range(e.from,e.to));return d.Decoration.set(n,!0)}function op(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);if(t===null||t.offsetWidth===0)return;let n=parseFloat(getComputedStyle(e).fontSize);t.style.setProperty(`--cm-md-task-checkbox-scale`,`${n/t.offsetWidth}`)}function sp(e,t,n){let r=e.state.sliceDoc(t,t+3);if(e.state.readOnly||!e.state.facet(d.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;let i=e.state.changes({from:t+1,to:t+2,insert:n?`x`:` `});e.dispatch({changes:i,effects:e.scrollSnapshot().map(i)??[],userEvent:`input`})}var cp,lp,up,dp=o((()=>{kf(),cp=typeof ResizeObserver>`u`?void 0:new ResizeObserver(e=>{for(let t of e)op(t.target)}),lp=[d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=ap(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(e=>e.reconfigured))&&(this.decorations=ap(e.view))}},{decorations:e=>e.decorations}),d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:`inline-block`,position:`relative`,height:`1lh`,margin:`0`,textIndent:`0`,verticalAlign:`top`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:`absolute`,insetBlockStart:`0`,insetInlineStart:`-0.15em`,display:`grid`,placeItems:`center`,width:`1em`,height:`1lh`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:`0`,transform:`translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))`}})],up=class extends d.WidgetType{markerFrom;listPrefix;checked;label;disabled;constructor(e,t,n,r,i){super(),this.markerFrom=e,this.listPrefix=t,this.checked=n,this.label=r,this.disabled=i}eq(e){return this.markerFrom===e.markerFrom&&this.listPrefix===e.listPrefix&&this.checked===e.checked&&this.label===e.label&&this.disabled===e.disabled}toDOM(e){let t=document.createElement(`span`);t.className=`cm-md-syntaxHiddenTaskCheckboxFrame`;let n=t.appendChild(document.createElement(`span`));n.className=`cm-md-syntaxHiddenTaskCheckboxMarker`,n.textContent=this.listPrefix;let r=t.appendChild(document.createElement(`span`));r.className=`cm-md-syntaxHiddenTaskCheckboxControl`;let i=r.appendChild(document.createElement(`input`));return i.className=`cm-md-syntaxHiddenTaskCheckbox`,i.type=`checkbox`,this.updateInput(i),i.addEventListener(`change`,()=>sp(e,Number(i.dataset.markerFrom),i.checked)),cp?.observe(t),t}updateDOM(e){let t=e.querySelector(`.cm-md-syntaxHiddenTaskCheckbox`);return t!==null&&(this.updateInput(t),!0)}destroy(e){cp?.unobserve(e)}ignoreEvent(){return!0}updateInput(e){e.checked=this.checked,e.disabled=this.disabled,e.dataset.markerFrom=`${this.markerFrom}`,e.setAttribute(`aria-label`,this.label)}}}));function fp(e,t,n){if(![`Link`,`Image`,`Autolink`].includes(e.name)||U(t,e.from,e.to))return;let r=bp(e.node);if(e.name===`Autolink`){if(r.length<2)return;let n=t.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(n)?{hidden:r.map(e=>({from:e.from,to:e.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:n,highlightTags:hp(e.node)}:void 0}if(r.length<2||pp(e,t).length>0)return;let i=e.node.getChild(`LinkLabel`);if(r.length===2&&(i===null||i.to-i.from===2))return;let a=e.node.getChild(`URL`);if(r.length>2&&a===null||[`(`,`[`].includes(t.sliceDoc(e.to,e.to+1)))return;let o=r[0],s=r[1],c=t.sliceDoc(o.to,s.from);if(!/\S/.test(c)||c.startsWith(`^`)&&e.to===s.to)return;let l=a===null?_p(i,t,n):t.sliceDoc(a.from,a.to);if(e.name!==`Image`||a!==null||l!==``)return{hidden:[{from:o.from,to:o.to},{from:s.from,to:e.to}],label:{from:o.to,to:s.from},image:e.name===`Image`,destination:l,highlightTags:hp(e.node)}}function pp(e,t){if(e.name!==`Link`)return[];let n=t.sliceDoc(e.from,e.to),r=/\[\^[^\][\s]+\]/g,i=[];for(let e=r.exec(n);e!==null;e=r.exec(n))i.push(e);return i.map(e=>e[0]).join(``)===n?i.map(t=>({from:e.from+t.index,to:e.from+t.index+t[0].length,label:t[0].slice(1,-1),highlightTags:hp(e.node)})):[]}function mp(e,t){if(e.name===`LinkDefinition`&&!U(t,e.from,e.to+1)&&xp.test(t.sliceDoc(e.from,e.to))&&t.sliceDoc(e.to,e.to+1)===`:`)return{hidden:[{from:e.from+1,to:e.from+2}],label:t.sliceDoc(e.from+1,e.to-1),highlightTags:hp(e.node),suffixPosition:e.to+1,suffix:/^[ \t]/.test(t.sliceDoc(e.to+1,e.to+2))?``:` `}}function hp(e){let t=[];for(let n=e;n!==null;n=n.parent)t.unshift(n);let n=new Set;for(let r of t){let t=(0,h.getStyleTags)(r);t!==null&&(r===e||t.inherit)&&t.tags.forEach(e=>n.add(e))}return[...n]}function gp(e){let t=(0,m.syntaxTree)(e),n;return r=>{let i=Sp.get(t);return n??=i?.doc===e.doc?i.destinations:void 0,n===void 0&&(n=vp(e,t),Sp.set(t,{doc:e.doc,destinations:n})),n.get(yp(r))??``}}function _p(e,t,n){return e===null?``:n(t.sliceDoc(e.from+1,e.to-1))}function vp(e,t){let n=new Map;return t.iterate({enter:t=>{if(t.name!==`LinkDefinitionID`)return;let r=yp(e.sliceDoc(t.from,t.to));if(n.has(r))return;let i=e.doc.lineAt(t.to),a=e.sliceDoc(t.node.parent?.to??t.to,i.to),o=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),s=o?.[1]??o?.[2];s!==void 0&&n.set(r,s)}}),n}function yp(e){return e.trim().replace(/\s+/g,` `).toLowerCase()}function bp(e){let t=[];for(let n=e.firstChild;n!==null;n=n.nextSibling)n.name===`LinkMark`&&t.push(n);return t}var xp,Sp,Cp=o((()=>{kf(),xp=/^\[\^[^\][\s]+\]$/,Sp=new WeakMap}));function wp(e){let t=e.trim().toLowerCase();return Op.test(t)&&!kp.test(t)?!1:(window.open(e,`_blank`,`noopener`),!0)}async function Tp(e,t,n=`definition`){let r=e.state,i=(0,m.ensureSyntaxTree)(r,r.doc.length,5e3);if(i===null)return!1;let a;return i.iterate({enter:e=>{if(a!==void 0)return!1;if(n===`reference`){let n=pp(e,r).find(e=>e.label===t);n!==void 0&&(a=p.EditorSelection.range(n.from,n.to))}else e.name===`LinkDefinition`&&r.sliceDoc(e.from,e.to)===`[${t}]`&&(a=p.EditorSelection.range(e.from,e.to))}}),a===void 0?(_(),!1):(Dp(e,a),!0)}async function Ep(e,t){let n=e.state.doc,r=await Bd(n.toString(),t);if(r===void 0||e.state.doc!==n)return!1;let i=e.state.doc.line(r+1).from;return Dp(e,p.EditorSelection.cursor(i)),!0}function Dp(e,t){let n=e.state.doc,r=e.scrollDOM.scrollTop,i=n=>e.dispatch({effects:d.EditorView.scrollIntoView(t.from,{y:n,yMargin:5})});e.dispatch({selection:t}),i(`start`),setTimeout(()=>{e.state.doc===n&&Math.abs(e.scrollDOM.scrollTop-r)<.001&&i(`center`)},50)}var Op,kp,Ap=o((()=>{Cp(),me(),Op=/^(?:vbscript|javascript|file|data):/,kp=/^data:image\/(?:gif|png|jpeg|webp);/})),jp,Mp,Np=o((()=>{Ap(),me(),Fd(),jp={link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>`,footnoteBack:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 14-5-5 5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>`},Mp=class extends d.WidgetType{kind;destination;label;highlightClasses;constructor(e,t,n,r,i){super(),this.kind=e,this.destination=n,this.label=r,this.highlightClasses=(0,m.highlightingFor)(t,i)??``}toDOM(e){let t=document.createElement(`button`);return t.type=`button`,t.className=[`cm-md-syntaxHiddenLinkButton`,this.highlightClasses].filter(Boolean).join(` `),t.dataset.kind=this.kind,t.title=this.kind===`footnote`||this.kind===`footnoteBack`?V(this.kind===`footnote`?`goToFootnoteDefinition`:`backToFootnoteReference`).replace(`%s`,()=>this.destination.slice(1)):this.destination,t.innerHTML=jp[this.kind===`footnote`?`link`:this.kind],t.setAttribute(`aria-label`,t.title||this.label),t.addEventListener(`click`,t=>{t.stopPropagation(),this.kind===`footnote`?Tp(e,this.destination):this.kind===`footnoteBack`?Tp(e,this.destination,`reference`):this.destination.startsWith(`#`)?Ep(e,this.destination):this.destination===``?_():wp(this.destination)}),t}eq(e){return e.kind===this.kind&&e.highlightClasses===this.highlightClasses&&e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!0}}})),Pp,Fp=o((()=>{Pp=class extends d.WidgetType{text;constructor(e){super(),this.text=e}eq(e){return e.text===this.text}toDOM(){let e=document.createElement(`span`);return e.textContent=this.text,e}ignoreEvent(){return!1}}})),Ip,Lp=o((()=>{Ip=class extends d.WidgetType{destination;label;constructor(e,t){super(),this.destination=e,this.label=t}toDOM(){let e=document.createElement(`img`);return e.className=`cm-md-syntaxHiddenImage`,e.src=Xd(this.destination),e.alt=this.label,e.title=this.destination,e.draggable=!1,e}eq(e){return e.destination===this.destination&&e.label===this.label}ignoreEvent(){return!1}}}));function Rp(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}function zp(e,t){let n=e.pos+t;if(vm==n&&_m==e)return gm;let r=e.peek(t),i=``;for(;Rp(r);)i+=String.fromCharCode(r),r=e.peek(++t);return _m=e,vm=n,gm=i?i.toLowerCase():r==Sm||r==Cm?void 0:null}function Bp(e,t){this.name=e,this.parent=t}function Vp(e){for(;e;e=e.parent)if(e.name==`svg`||e.name==`math`)return!0;return!1}function Hp(e,t,n){let r=2+e.length;return new g.ExternalTokenizer(i=>{for(let a=0,o=0,s=0;;s++){if(i.next<0){s&&i.acceptToken(t);break}if(a==0&&i.next==ym||a==1&&i.next==xm||a>=2&&a<r&&i.next==e.charCodeAt(a-2))a++,o++;else if(a==r&&i.next==bm){s>o?i.acceptToken(t,-o):i.acceptToken(n,-(o-2));break}else if((i.next==10||i.next==13)&&s){i.acceptToken(t,1);break}else a=o=0;i.advance()}})}var Up,Wp,Gp,Kp,qp,Jp,Yp,Xp,Zp,Qp,$p,em,tm,nm,rm,im,am,om,sm,cm,lm,um,dm,fm,pm,mm,hm,gm,_m,vm,ym,bm,xm,Sm,Cm,wm,Tm,Em,Dm,Om,km,Am,jm,Mm,Nm,Pm,Fm=o((()=>{Up=55,Wp=1,Gp=56,Kp=2,qp=57,Jp=3,Yp=4,Xp=5,Zp=6,Qp=7,$p=8,em=9,tm=10,nm=11,rm=12,im=13,am=58,om=14,sm=15,cm=59,lm=21,um=37,dm=0,fm=1,pm={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},mm={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},hm={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},gm=null,_m=null,vm=0,ym=60,bm=62,xm=47,Sm=63,Cm=33,wm=45,Tm=[Zp,tm,Qp,$p,em],Em=new g.ContextTracker({start:null,shift(e,t,n,r){return Tm.indexOf(t)>-1?new Bp(zp(r,1)||``,e):e},reduce(e,t){return t==lm&&e?e.parent:e},reuse(e,t,n,r){let i=t.type.id;return i==Zp||i==um?new Bp(zp(r,1)||``,e):e},strict:!1}),Dm=new g.ExternalTokenizer((e,t)=>{if(e.next!=ym){e.next<0&&t.context&&e.acceptToken(am);return}e.advance();let n=e.next==xm;n&&e.advance();let r=zp(e,0);if(r===void 0)return;if(!r)return e.acceptToken(n?sm:om);let i=t.context?t.context.name:null;if(n){if(r==i)return e.acceptToken(nm);if(i&&mm[i])return e.acceptToken(am,-2);if(t.dialectEnabled(dm))return e.acceptToken(rm);for(let e=t.context;e;e=e.parent)if(e.name==r)return;e.acceptToken(im)}else{if(r==`script`)return e.acceptToken(Qp);if(r==`style`)return e.acceptToken($p);if(r==`textarea`)return e.acceptToken(em);if(pm.hasOwnProperty(r))return e.acceptToken(tm);i&&hm[i]&&hm[i][r]?e.acceptToken(am,-1):e.acceptToken(Zp)}},{contextual:!0}),Om=new g.ExternalTokenizer(e=>{for(let t=0,n=0;;n++){if(e.next<0){n&&e.acceptToken(cm);break}if(e.next==wm)t++;else if(e.next==bm&&t>=2){n>=3&&e.acceptToken(cm,-2);break}else t=0;e.advance()}}),km=new g.ExternalTokenizer((e,t)=>{if(e.next==xm&&e.peek(1)==bm){let n=t.dialectEnabled(fm)||Vp(t.context);e.acceptToken(n?Xp:Yp,2)}else e.next==bm&&e.acceptToken(Yp,1)}),Am=Hp(`script`,Up,Wp),jm=Hp(`style`,Gp,Kp),Mm=Hp(`textarea`,qp,Jp),Nm=(0,h.styleTags)({"Text RawText IncompleteTag IncompleteCloseTag":h.tags.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":h.tags.angleBracket,TagName:h.tags.tagName,"MismatchedCloseTag/TagName":[h.tags.tagName,h.tags.invalid],AttributeName:h.tags.attributeName,"AttributeValue UnquotedAttributeValue":h.tags.attributeValue,Is:h.tags.definitionOperator,"EntityReference CharacterReference":h.tags.character,Comment:h.tags.blockComment,ProcessingInst:h.tags.processingInstruction,DoctypeDecl:h.tags.documentMeta}),Pm=g.LRParser.deserialize({version:14,states:",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",stateData:`,c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~`,goto:"%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:`⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl`,maxTerm:68,context:Em,nodeProps:[[`closedBy`,-10,1,2,3,7,8,9,10,11,12,13,`EndTag`,6,`EndTag SelfClosingEndTag`,-4,22,31,34,37,`CloseTag`],[`openedBy`,4,`StartTag StartCloseTag`,5,`StartTag`,-4,30,33,36,38,`OpenTag`],[`group`,-10,14,15,18,19,20,21,40,41,42,43,`Entity`,17,`Entity TextContent`,-3,29,32,35,`TextContent Entity`],[`isolate`,-11,22,30,31,33,34,36,37,38,39,42,43,`ltr`,-3,27,28,40,``]],propSources:[Nm],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[Am,jm,Mm,km,Dm,Om,0,1,2,3,4,5],topRules:{Document:[0,16]},dialects:{noMatch:0,selfClosing:515},tokenPrec:517})}));function Im(e,t){this.v=e,this.k=t}function Lm(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Rm(e){if(Array.isArray(e))return e}function zm(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Bm(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Vm(e,t){return Rm(e)||zm(e,t)||Hm(e,t)||Bm()}function Hm(e,t){if(e){if(typeof e==`string`)return Lm(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Lm(e,t):void 0}}function Um(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Im;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}function W(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ih(e,t,n)}}function Wm(e){return function(){return ah(e,[...arguments])}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:fh;if(Qm&&Qm(e,null),!dh(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&($m(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Gm(e){for(let t=0;t<e.length;t++)J(e,t)||(e[t]=null);return e}function Km(e){let t=nh(null);for(let r of Zm(e)){var n=Vm(r,2);let i=n[0],a=n[1];J(e,i)&&(t[i]=dh(a)?Gm(a):a&&typeof a==`object`&&a.constructor===Object?Km(a):a)}return t}function qm(e){switch(typeof e){case`string`:return e;case`number`:return vh(e);case`boolean`:return yh(e);case`bigint`:return bh?bh(e):`0`;case`symbol`:return xh?xh(e):`Symbol()`;case`undefined`:return Sh(e);case`function`:case`object`:{if(e===null)return Sh(e);let t=e,n=Jm(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Sh(e)}return Sh(e)}default:return Sh(e)}}function Jm(e,t){for(;e!==null;){let n=th(e,t);if(n){if(n.get)return W(n.get);if(typeof n.value==`function`)return W(n.value)}e=eh(e)}function n(){return null}return n}function Ym(e){try{return Y(e,``),!0}catch{return!1}}function Xm(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qh(),t=e=>Xm(e);if(t.version=`3.4.16`,t.removed=[],!e||!e.document||e.document.nodeType!==X.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Jm(d,`cloneNode`),p=Jm(d,`remove`),m=Jm(d,`removeAttributeNode`),h=Jm(d,`nextSibling`),g=Jm(d,`childNodes`),_=Jm(d,`parentNode`),ee=Jm(d,`shadowRoot`),te=Jm(d,`attributes`),ne=o&&o.prototype?Jm(o.prototype,`nodeType`):null,re=o&&o.prototype?Jm(o.prototype,`nodeName`):null,ie=o&&o.prototype?Jm(o.prototype,`ownerDocument`):null,ae=function(e){return ne?ne(e):e.nodeType},oe=function(e){return re?re(e):e.nodeName};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let v,se=``,ce,le=!1,ue=0,de=function(){if(ue>0)throw Ch(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},fe=function(e){de(),ue++;try{return v.createHTML(e)}finally{ue--}},pe=function(e){de(),ue++;try{return v.createScriptURL(e)}finally{ue--}},me=function(){return le||=(ce=$h(u,i),!0),ce},he=n,ge=he.implementation,_e=he.createNodeIterator,ve=he.createDocumentFragment,ye=he.getElementsByTagName,be=r.importNode,y=eg();t.isSupported=typeof Zm==`function`&&typeof _==`function`&&ge&&ge.createHTMLDocument!==void 0;let xe=Fh,Se=Ih,Ce=Lh,we=Rh,Te=zh,Ee=Vh,De=Hh,Oe=Wh,ke=Bh,b=null,Ae=G({},[...wh,...Th,...Eh,...Oh,...Ah]),x=null,je=G({},[...jh,...Mh,...Nh,...Ph]),Me=Object.seal(nh(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,Pe=null,Fe=Object.seal(nh(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ie=!0,Le=!0,Re=!1,ze=!0,Be=!1,Ve=!0,He=!1,Ue=!1,We=null,Ge=null,Ke=!1,qe=!1,Je=!1,Ye=!1,Xe=!0,Ze=!1,Qe=`user-content-`,$e=!0,et=!1,tt={},nt=null,rt=G({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),it=null,at=G({},[`audio`,`video`,`img`,`source`,`image`,`track`]),ot=null,st=G({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),ct=`http://www.w3.org/1998/Math/MathML`,lt=`http://www.w3.org/2000/svg`,ut=`http://www.w3.org/1999/xhtml`,dt=ut,ft=!1,pt=null,mt=G({},[ct,lt,ut],ph),S=K([`mi`,`mo`,`mn`,`ms`,`mtext`]),ht=G({},S),gt=K([`annotation-xml`]),C=G({},gt),_t=G({},[`title`,`style`,`font`,`a`,`script`]),vt=null,yt=[`application/xhtml+xml`,`text/html`],w=null,bt=null,xt=n.createElement(`form`),St=function(e){return e instanceof RegExp||e instanceof Function},Ct=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(bt&&bt===e)return;(!e||typeof e!=`object`)&&(e={}),e=Km(e),vt=yt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,w=vt===`application/xhtml+xml`?ph:fh,b=tg(e,`ALLOWED_TAGS`,Ae,{transform:w}),x=tg(e,`ALLOWED_ATTR`,je,{transform:w}),pt=tg(e,`ALLOWED_NAMESPACES`,mt,{transform:ph}),ot=tg(e,`ADD_URI_SAFE_ATTR`,st,{transform:w,base:st}),it=tg(e,`ADD_DATA_URI_TAGS`,at,{transform:w,base:at}),nt=tg(e,`FORBID_CONTENTS`,rt,{transform:w}),Ne=tg(e,`FORBID_TAGS`,Km({}),{transform:w}),Pe=tg(e,`FORBID_ATTR`,Km({}),{transform:w}),tt=J(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?Km(e.USE_PROFILES):e.USE_PROFILES:!1,Ie=e.ALLOW_ARIA_ATTR!==!1,Le=e.ALLOW_DATA_ATTR!==!1,Re=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ze=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=e.SAFE_FOR_TEMPLATES||!1,Ve=e.SAFE_FOR_XML!==!1,He=e.WHOLE_DOCUMENT||!1,qe=e.RETURN_DOM||!1,Je=e.RETURN_DOM_FRAGMENT||!1,Ye=e.RETURN_TRUSTED_TYPE||!1,Ke=e.FORCE_BODY||!1,Xe=e.SANITIZE_DOM!==!1,Ze=e.SANITIZE_NAMED_PROPS||!1,$e=e.KEEP_CONTENT!==!1,et=e.IN_PLACE||!1,ke=Ym(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Bh,dt=typeof e.NAMESPACE==`string`?e.NAMESPACE:ut,ht=ng(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>G({},S)),C=ng(e,`HTML_INTEGRATION_POINTS`,()=>G({},gt));let t=ng(e,`CUSTOM_ELEMENT_HANDLING`,()=>nh(null));if(Me=nh(null),J(t,`tagNameCheck`)&&St(t.tagNameCheck)&&(Me.tagNameCheck=t.tagNameCheck),J(t,`attributeNameCheck`)&&St(t.attributeNameCheck)&&(Me.attributeNameCheck=t.attributeNameCheck),J(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Me.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),q(Me),Be&&(Le=!1),Je&&(qe=!0),tt&&(b=G({},Ah),x=nh(null),tt.html===!0&&(G(b,wh),G(x,jh)),tt.svg===!0&&(G(b,Th),G(x,Mh),G(x,Ph)),tt.svgFilters===!0&&(G(b,Eh),G(x,Mh),G(x,Ph)),tt.mathMl===!0&&(G(b,Oh),G(x,Nh),G(x,Ph))),Fe.tagCheck=null,Fe.attributeCheck=null,J(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Fe.tagCheck=e.ADD_TAGS:dh(e.ADD_TAGS)&&(b===Ae&&(b=Km(b)),G(b,e.ADD_TAGS,w))),J(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Fe.attributeCheck=e.ADD_ATTR:dh(e.ADD_ATTR)&&(x===je&&(x=Km(x)),G(x,e.ADD_ATTR,w))),J(e,`ADD_FORBID_CONTENTS`)&&dh(e.ADD_FORBID_CONTENTS)&&(nt===rt&&(nt=Km(nt)),G(nt,e.ADD_FORBID_CONTENTS,w)),$e&&(b[`#text`]=!0),He&&G(b,[`html`,`head`,`body`]),b.table&&(G(b,[`tbody`]),delete Ne.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Ch(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Ch(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=v;v=e.TRUSTED_TYPES_POLICY;try{se=fe(``)}catch(e){throw v=t,e}}else e.TRUSTED_TYPES_POLICY===null?(v=void 0,se=``):(v===void 0&&(v=me()),v&&typeof se==`string`&&(se=fe(``)));K&&K(e),bt=e},wt=G({},[...Th,...Eh,...Dh]),Tt=G({},[...Oh,...kh]),Et=function(e,t,n){return t.namespaceURI===ut?e===`svg`:t.namespaceURI===ct?e===`svg`&&(n===`annotation-xml`||ht[n]):!!wt[e]},Dt=function(e,t,n){return t.namespaceURI===ut?e===`math`:t.namespaceURI===lt?e===`math`&&C[n]:!!Tt[e]},Ot=function(e,t,n){return t.namespaceURI===lt&&!C[n]||t.namespaceURI===ct&&!ht[n]?!1:!Tt[e]&&(_t[e]||!wt[e])},kt=function(e){let t=_(e);(!t||!t.tagName)&&(t={namespaceURI:dt,tagName:`template`});let n=fh(e.tagName),r=fh(t.tagName);return pt[e.namespaceURI]?e.namespaceURI===lt?Et(n,t,r):e.namespaceURI===ct?Dt(n,t,r):e.namespaceURI===ut?Ot(n,t,r):!!(vt===`application/xhtml+xml`&&pt[e.namespaceURI]):!1},At=function(e){lh(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw Ch(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},jt=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},Mt=function(e){E(e);let t=g(e);if(t){let e=[];oh(t,t=>{lh(e,t)}),oh(e,e=>{try{p(e)}catch{}})}let n=te(e);if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&jt(e,r,i)}},T=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}lh(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(qe||Je)try{At(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},Nt=function(e){let t=te(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||x[w(i)]||jt(e,r,i)}},E=function(e){let t=[e];for(;t.length>0;){let e=t.pop();ae(e)===X.element&&Nt(e);let n=g(e);if(n)for(let e=n.length-1;e>=0;--e)t.push(n[e])}},Pt=function(e,t){return Ve?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Ft=function(e){if(!Ve)return;let t=[e];for(;t.length>0;){let e=t.pop(),n=ae(e);if(n===X.processingInstruction||n===X.comment&&Y(Kh,e.data)){try{p(e)}catch{}continue}if(n===X.element){let t=e,n=w(oe(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Pt(`for`,n)&&t.removeAttribute(`for`)}catch{}}let r=g(e);if(r)for(let e=r.length-1;e>=0;--e)t.push(r[e])}},It=function(e){let t=null,r=null;if(Ke)e=`<remove></remove>`+e;else{let t=mh(e,/^[\r\n\t ]+/);r=t&&t[0]}vt===`application/xhtml+xml`&&dt===ut&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=v?fe(e):e;if(dt===ut)try{t=new l().parseFromString(i,vt)}catch{}if(!t||!t.documentElement){t=ge.createDocument(dt,`template`,null);try{t.documentElement.innerHTML=ft?se:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),dt===ut?ye.call(t,He?`html`:`body`)[0]:He?t.documentElement:a},Lt=function(e){let t=ie?ie(e):e.ownerDocument;return _e.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Rt=function(e){return e=hh(e,xe,` `),e=hh(e,Se,` `),e=hh(e,Ce,` `),e},zt=function(e){e.normalize();let t=ie?ie(e):e.ownerDocument,n=_e.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Rt(r.data),r=n.nextNode();let i=e.querySelectorAll?.call(e,`template`);i&&oh(i,e=>{Vt(e.content)&&zt(e.content)})},Bt=function(e){let t=re?re(e):null;return typeof t!=`string`||w(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==te(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==ne(e)||e.childNodes!==g(e)},Vt=function(e){if(!ne||typeof e!=`object`||!e)return!1;try{return ne(e)===X.documentFragment}catch{return!1}},Ht=function(e){if(!ne||typeof e!=`object`||!e)return!1;try{return typeof ne(e)==`number`}catch{return!1}};function Ut(e,n,r){e.length!==0&&oh(e,e=>{e.call(t,n,r,bt)})}let Wt=function(e,t){return!!(Ve&&e.hasChildNodes()&&!Ht(e.firstElementChild)&&Y(Gh,e.textContent)&&Y(Gh,e.innerHTML)||Ve&&e.namespaceURI===ut&&Xh[t]&&(Ht(e.firstElementChild)||typeof e.textContent==`string`&&Y(Zh[t],e.textContent))||e.nodeType===X.processingInstruction||Ve&&e.nodeType===X.comment&&Y(Kh,e.data))},Gt=function(e,t){return e instanceof RegExp?Y(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Kt=function(e,t,n){if(!Ne[t]&&Zt(t)&&Gt(Me.tagNameCheck,t))return!1;if($e&&!nt[t]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return At(e),!0},qt=function(e,t,n,r){return e.length===0?t:t===n||t===r?Km(t):t},Jt=function(e,t){return e===t||_(e)!==null?!1:(et&&E(e),!0)},Yt=function(e,n){if(Ut(y.beforeSanitizeElements,e,null),Jt(e,n))return!0;if(Bt(e))return At(e),!0;let r=w(oe(e));if(b=qt(y.uponSanitizeElement,b,Ae,We),Ut(y.uponSanitizeElement,e,{tagName:r,allowedTags:b}),Jt(e,n))return!0;if(Wt(e,r))return At(e),!0;if(Ne[r]||!(Fe.tagCheck instanceof Function&&Fe.tagCheck(r))&&!b[r]){let t=Kt(e,r,n);return t===!1&&(Ut(y.afterSanitizeElements,e,null),Jt(e,n))?!0:t}if(ae(e)===X.element&&!kt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&Y(qh,e.innerHTML))return At(e),!0;if(Be&&e.nodeType===X.text){let n=Rt(e.textContent);e.textContent!==n&&(lh(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Ut(y.afterSanitizeElements,e,null),Jt(e,n)},D=function(e,t,r){if(Pe[t]||Pt(t,e)||Xe&&(t===`id`||t===`name`)&&(r in n||r in xt))return!1;let i=x[t]||Fe.attributeCheck instanceof Function&&Fe.attributeCheck(t,e);return Le&&Y(we,t)||Ie&&Y(Te,t)?!0:i?ot[t]||Y(ke,hh(r,De,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&gh(r,`data:`)===0&&it[e]||Re&&!Y(Ee,hh(r,De,``))?!0:!r:Zt(e)&&Gt(Me.tagNameCheck,e)&&Gt(Me.attributeNameCheck,t,e)||t===`is`&&Me.allowCustomizedBuiltInElements&&Gt(Me.tagNameCheck,r)},Xt=G({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Zt=function(e){return!Xt[fh(e)]&&Y(Oe,e)},Qt=function(e,t,n,r){if(v&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return fe(r);case`TrustedScriptURL`:return pe(r)}return r},$t=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Bt(e)||(At(e),!1)}catch{return T(t,e),!1}},en=function(e,n){if(Ut(y.beforeSanitizeAttributes,e,null),Jt(e,n))return;let r=e.attributes;if(!r||Bt(e))return;x=qt(y.uponSanitizeAttribute,x,je,Ge);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:x,forceKeepAttr:void 0},a=r.length,o=w(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=w(s),d=l,f=s===`value`?d:_h(d),p=!1;if(i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Ut(y.uponSanitizeAttribute,e,i),f=i.attrValue,Ze&&(u===`id`||u===`name`)&&gh(f,Qe)!==0&&(T(s,e,n),f=Qe+f,p=!0),Ve&&Y(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,f)){T(s,e,n);continue}if(u===`attributename`&&mh(f,`href`)){T(s,e,n);continue}if(!i.forceKeepAttr){if(!i.keepAttr){T(s,e,n);continue}if(!ze&&Y(Jh,f)){T(s,e,n);continue}if(Be&&(f=Rt(f)),!D(o,u,f)){T(s,e,n);continue}f=Qt(o,u,c,f),f!==d&&$t(e,s,c,f)&&p&&ch(t.removed)}}Ut(y.afterSanitizeAttributes,e,null),Jt(e,n)},tn=function(e){let t=null,n=Lt(e);for(Ut(y.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Ut(y.uponSanitizeShadowNode,t,null),Yt(t,e),en(t,e),Vt(t.content)&&tn(t.content),ae(t)===X.element){let e=ee(t);Vt(e)&&(nn(e),tn(e))}Ut(y.afterSanitizeShadowDOM,e,null)},nn=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){tn(e.shadow);continue}let n=e.node,r=ae(n)===X.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=re?re(n):null;if(typeof e==`string`&&w(e)===`template`){let e=n.content;Vt(e)&&t.push({node:e,shadow:null})}}if(r){let e=ee(n);Vt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(ft=!e,ft&&(e=`<!-->`),typeof e!=`string`&&!Ht(e)&&(e=qm(e),typeof e!=`string`))throw Ch(`dirty is not a string, aborting`);if(!t.isSupported)return e;Ue?(b=We,x=Ge):Ct(n),(y.uponSanitizeElement.length>0||y.uponSanitizeAttribute.length>0)&&(b=Km(b)),y.uponSanitizeAttribute.length>0&&(x=Km(x)),t.removed=[];let c=et&&typeof e!=`string`&&Ht(e);if(c){Ft(e);let t=oe(e);if(typeof t==`string`){let n=w(t);if(!b[n]||Ne[n])throw Mt(e),Ch(`root node is forbidden and cannot be sanitized in-place`)}if(Bt(e))throw Mt(e),Ch(`root node is clobbered and cannot be sanitized in-place`);try{nn(e)}catch(t){throw Mt(e),t}}else if(Ht(e))i=It(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===X.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),nn(i);else{if(!qe&&!Be&&!He&&e.indexOf(`<`)===-1)return v&&Ye?fe(e):e;if(i=It(e),!i)return qe?null:Ye?se:``}i&&Ke&&At(i.firstChild);let l=c?e:i;try{let e=Lt(l);for(;o=e.nextNode();)Yt(o,l),en(o,l),Vt(o.content)&&tn(o.content)}catch(n){throw c&&(Mt(e),oh(t.removed,e=>{e.element&&E(e.element)})),n}if(c){let n=!1;if(oh(t.removed,t=>{t.element&&(t.element===e&&(n=!0),E(t.element))}),n)throw Ch(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Be&&zt(e),e}if(qe){if(Be&&zt(i),Je)for(s=ve.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(x.shadowroot||x.shadowrootmode)&&(s=be.call(r,s,!0)),s}let u=He?i.outerHTML:i.innerHTML;return He&&b[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&Y(Uh,i.ownerDocument.doctype.name)&&(u=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+u),Be&&(u=Rt(u)),v&&Ye?fe(u):u},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ct(e),Ue=!0,We=b,Ge=x},t.clearConfig=function(){bt=null,Ue=!1,We=null,Ge=null,v=ce,se=``},t.isValidAttribute=function(e,t,n){bt||Ct({});let r=w(e),i=w(t);return D(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&J(y,e)&&lh(y[e],t)},t.removeHook=function(e,t){if(J(y,e)){if(t!==void 0){let n=sh(y[e],t);return n===-1?void 0:uh(y[e],n,1)[0]}return ch(y[e])}},t.removeHooks=function(e){J(y,e)&&(y[e]=[])},t.removeAllHooks=function(){y=eg()},t}var Zm,Qm,$m,eh,th,K,q,nh,rh,ih,ah,oh,sh,ch,lh,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh,bh,xh,J,Sh,Y,Ch,wh,Th,Eh,Dh,Oh,kh,Ah,jh,Mh,Nh,Ph,Fh,Ih,Lh,Rh,zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh,X,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg,ig=o((()=>{Um.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},Um.prototype.next=function(e){return this._invoke(`next`,e)},Um.prototype.throw=function(e){return this._invoke(`throw`,e)},Um.prototype.return=function(e){return this._invoke(`return`,e)},Zm=Object.entries,Qm=Object.setPrototypeOf,$m=Object.isFrozen,eh=Object.getPrototypeOf,th=Object.getOwnPropertyDescriptor,K=Object.freeze,q=Object.seal,nh=Object.create,rh=typeof Reflect<`u`&&Reflect,ih=rh.apply,ah=rh.construct,K||=function(e){return e},q||=function(e){return e},ih||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},ah||=function(e){return new e(...[...arguments].slice(1))},oh=W(Array.prototype.forEach),Array.prototype.indexOf,sh=W(Array.prototype.lastIndexOf),ch=W(Array.prototype.pop),lh=W(Array.prototype.push),Array.prototype.slice,uh=W(Array.prototype.splice),dh=Array.isArray,fh=W(String.prototype.toLowerCase),ph=W(String.prototype.toString),mh=W(String.prototype.match),hh=W(String.prototype.replace),gh=W(String.prototype.indexOf),_h=W(String.prototype.trim),vh=W(Number.prototype.toString),yh=W(Boolean.prototype.toString),bh=typeof BigInt>`u`?null:W(BigInt.prototype.toString),xh=typeof Symbol>`u`?null:W(Symbol.prototype.toString),J=W(Object.prototype.hasOwnProperty),Sh=W(Object.prototype.toString),Y=W(RegExp.prototype.test),Ch=Wm(TypeError),wh=K(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Th=K(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),Eh=K([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Dh=K([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),Oh=K(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),kh=K([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Ah=K([`#text`]),jh=K(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Mh=K(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Nh=K(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Ph=K([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Fh=q(/{{[\w\W]*|^[\w\W]*}}/g),Ih=q(/<%[\w\W]*|^[\w\W]*%>/g),Lh=q(/\${[\w\W]*/g),Rh=q(/^data-[\-\w.\u00B7-\uFFFF]+$/),zh=q(/^aria-[\-\w]+$/),Bh=q(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vh=q(/^(?:\w+script|data):/i),Hh=q(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Uh=q(/^html$/i),Wh=q(/^[a-z][.\w]*(-[.\w]+)+$/i),Gh=q(/<[/\w!]/g),Kh=q(/<[/\w]/g),qh=q(/<\/no(script|embed|frames)/i),Jh=q(/\/>/i),X={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yh=[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`],Xh=K(G({},Yh)),Zh=function(){let e={};return oh(Yh,t=>{e[t]=q(RegExp(`</`+t+`(?=[\\t\\n\\f\\r />])`,`i`))}),K(e)}(),Qh=function(){return typeof window>`u`?null:window},$h=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},eg=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},tg=function(e,t,n,r){return J(e,t)&&dh(e[t])?G(r.base?Km(r.base):{},e[t],r.transform):n},ng=function(e,t,n){let r=J(e,t)?e[t]:void 0;return r&&typeof r==`object`?Km(r):n()},rg=Xm()}));function ag(e,t){let n=e.doc.toString(),r=[],i=[];if((0,m.syntaxTree)(e).iterate({enter:n=>{if([`FencedCode`,`CodeBlock`,`InlineCode`,`Frontmatter`,`CommentBlock`,`BlockMath`].includes(n.name)||t&&n.name===`Table`)return!1;if(n.name===`HTMLBlock`||n.name===`HTMLTag`){let t=e.doc.length;for(let e=n.node.parent;e!==null;e=e.parent)(e.name===`ListItem`||e.name===`Blockquote`)&&(t=Math.min(t,e.to));if(r.push({from:n.from,to:n.to,limit:t}),n.name===`HTMLTag`)return!1}else n.name===`QuoteMark`&&i.push({from:n.from,to:n.to})}}),r.length===0)return[];let a=0,o=n.replace(/</g,(e,t)=>{for(;a<r.length&&r[a].to<=t;)a++;let n=r[a];return n!==void 0&&n.from<=t?e:` `}),s=[];return a=0,Pm.parse(o).iterate({enter:e=>{if(e.name!==`Element`)return;let{from:t,to:o}=e;for(;a<r.length&&r[a].to<=t;)a++;let c=r[a],l=n.slice(t,o);for(let e=i.length-1;e>=0;e--){let n=i[e];n.from>=t&&n.to<=o&&(l=l.slice(0,n.from-t)+l.slice(n.to-t))}if(c!==void 0&&c.from<=t&&o<=c.limit&&og(l))return s.push({from:t,to:o,source:l}),!1}}),s}function og(e){let t=Pm.parse(e),n=!0,r=0;return t.iterate({enter:t=>{if((t.type.isError||t.name===`MismatchedCloseTag`)&&(n=!1),t.name===`Element`){r++;let e=t.node.firstChild,i=t.node.lastChild;e?.name!==`SelfClosingTag`&&i?.name!==`CloseTag`&&(n=!1)}else t.node.parent?.name===`Document`&&(t.name!==`Text`||e.slice(t.from,t.to).trim()!==``)&&(n=!1)}}),n&&r>0}var sg,cg,lg,ug=o((()=>{Fm(),jd(),of(),ig(),sg=class e extends d.WidgetType{source;fragment;block;constructor(e,t){super(),this.source=e,this.fragment=t,this.block=t.querySelector(`address, article, aside, blockquote, dd, details, dialog, div, dl, dt, fieldset, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, ul`)!==null}static create(t){if(!og(t))return;let n=rg.sanitize(t,{RETURN_DOM_FRAGMENT:!0,USE_PROFILES:{html:!0},FORBID_TAGS:[`script`,`style`,`link`,`meta`,`base`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0});if(n.childElementCount===0)return;let r=document.createElement(`span`).style;return n.querySelectorAll(`[style]`).forEach(e=>{r.cssText=e.getAttribute(`style`)??``,e.removeAttribute(`style`);for(let t of lg){let n=r.getPropertyValue(t);n!==``&&e.style.setProperty(t,n)}}),n.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),n.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Xd(t))}),new e(t,n)}toDOM(e){let t=document.createElement(this.block?`div`:`span`);t.className=`cm-md-syntaxHiddenHtml`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=Td(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i),cg.set(t,()=>window.removeEventListener(`editor-colors-changed`,i));let a=document.createElement(`style`);a.textContent=this.block?`:host { display: block; } .markdown-body { font: inherit; white-space: normal; overflow-wrap: anywhere; overflow: auto; }`:`:host { display: inline; } .markdown-body { display: inline; font: inherit; white-space: normal; overflow-wrap: anywhere; } .markdown-body::before, .markdown-body::after { content: none; }`;let o=document.createElement(this.block?`div`:`span`);return o.className=`markdown-body`,o.inert=!0,o.append(this.fragment.cloneNode(!0)),n.append(r,a,o),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),t}updateDOM(e,t){return e.tagName===`DIV`===this.block&&(e.shadowRoot.querySelector(`.markdown-body`).replaceChildren(this.fragment.cloneNode(!0)),t.requestMeasure(),!0)}eq(e){return this.source===e.source}destroy(e){cg.get(e)?.(),cg.delete(e)}ignoreEvent(){return!1}},cg=new WeakMap,lg=[`text-align`,`color`,`background-color`,`font-family`,`font-weight`,`font-style`,`text-decoration-line`,`text-decoration-color`,`text-decoration-style`]})),dg=o((()=>{Jd()})),fg=o((()=>{Jd()})),pg,mg,hg,gg=o((()=>{ig(),jd(),of(),pg=p.StateEffect.define(),mg=class extends d.WidgetType{doc;from;to;render;referenceContext;constructor(e,t,n,r,i=``){super(),this.doc=e,this.from=t,this.to=n,this.render=r,this.referenceContext=i}get source(){return this.doc.sliceString(this.from,this.to)}toDOM(e){let t=document.createElement(`div`);t.className=`cm-md-syntaxHiddenTable`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`),i=()=>{r.textContent=Td(f.MarkEdit.editorConfig?.theme??`github`,e.state.facet(d.EditorView.darkTheme)),e.requestMeasure()};i(),window.addEventListener(`editor-colors-changed`,i);let a=document.createElement(`style`);a.textContent=`
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;let o=document.createElement(`div`);o.className=`markdown-body source`,o.textContent=this.source;let s=document.createElement(`style`);return n.append(r,a,s,o),hg.set(t,{body:o,mathStyle:s,dispose:()=>window.removeEventListener(`editor-colors-changed`,i)}),t.addEventListener(`mousedown`,n=>{n.button!==0||n.shiftKey||n.altKey||n.metaKey||n.ctrlKey||(n.preventDefault(),n.stopPropagation(),e.dispatch({selection:p.EditorSelection.cursor(e.posAtDOM(t)),scrollIntoView:!1}),e.focus())}),t.addEventListener(`click`,e=>e.preventDefault()),n.addEventListener(`load`,()=>e.requestMeasure(),!0),n.addEventListener(`error`,()=>e.requestMeasure(),!0),this.renderInto(t,e),t}updateDOM(e,t){return this.renderInto(e,t),!0}renderInto(e,t){let n=hg.get(e),r={};n.request=r;let i=()=>e.isConnected&&hg.get(e)?.request===r,a=()=>{if(i()){let n=t.posAtDOM(e);t.dispatch({effects:pg.of({doc:t.state.doc,from:n,to:n+this.source.length})})}};Promise.all([this.render(),``]).then(([e,r])=>{if(!i())return;let o=e.find(e=>e.fromLine===this.doc.lineAt(this.from).number&&e.toLine===this.doc.lineAt(this.to).number);if(o===void 0){a();return}let s=rg.sanitize(o.html,{RETURN_DOM_FRAGMENT:!0,FORBID_TAGS:[`style`,`link`,`meta`,`form`,`input`,`button`,`select`,`textarea`,`iframe`,`object`,`embed`,`audio`,`video`],FORBID_ATTR:[`tabindex`,`autofocus`,`contenteditable`],SANITIZE_NAMED_PROPS:!0}).querySelector(`table`);if(s===null){a();return}s.querySelectorAll(`a`).forEach(e=>e.setAttribute(`tabindex`,`-1`)),s.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t!==null&&(e.src=Xd(t))}),n.mathStyle.textContent!==r&&(n.mathStyle.textContent=r),n.body.firstElementChild?.isEqualNode(s)||(n.body.classList.remove(`source`),n.body.replaceChildren(s),t.requestMeasure())}).catch(a)}destroy(e){hg.get(e)?.dispose(),hg.delete(e)}eq(e){return e.source===this.source&&e.referenceContext===this.referenceContext}ignoreEvent(){return!1}},hg=new WeakMap})),_g,vg=o((()=>{Fu(),_g=p.Facet.define({combine:e=>e[e.length-1]??Du})}));function yg(e,t=d.Decoration.none){let n=bg(e,t);return{all:n,visible:xg(n,e)}}function bg(e,t){let n=[],r=(0,m.syntaxTree)(e),i=e.facet(_g),a=[];r.iterate({enter:t=>{if(t.name===`Document`)return;let n=e.sliceDoc(e.doc.lineAt(t.from).from,e.doc.lineAt(t.to).to);return(t.name!==`Paragraph`&&t.name!==`Table`||n.includes(`[`))&&a.push(n),!1}});let o=e.sliceDoc(r.length);a.push(o);let s,c=()=>s??=zd(e.doc.toString()),l=JSON.stringify(a);if(i.includes(`html`))for(let{from:a,to:o,source:s}of ag(e,i.includes(`table`))){if(r.length<e.doc.length&&o>=r.length)continue;let i;t.between(a,o,(e,t,n)=>{let r=n.spec.widget;e===a&&t===o&&r instanceof sg&&r.source===s&&(i=r)}),i??=sg.create(s),i!==void 0&&n.push(d.Decoration.replace({block:i.block,widget:i}).range(a,o))}let u=n.slice(),f=0;return r.iterate({enter:a=>{for(;f<u.length&&u[f].to<=a.from;)f++;let o=u[f];if(a.name!==`Document`&&o!==void 0&&o.from<=a.from&&o.to>=a.to)return!1;let s;if(a.name===`Table`&&i.includes(`table`)){for(let e=a.node.parent;e!==null;e=e.parent)if(e.name!==`Document`)return!1;if(r.length<e.doc.length&&a.to>=r.length)return!1;let n=e.doc.lineAt(a.from).from,i=e.doc.lineAt(a.to).to,o=new mg(e.doc,n,i,c,l);t.between(n,i,(e,t,r)=>{let a=r.spec.widget;e===n&&t===i&&a instanceof mg&&o.eq(a)&&(o=a)}),s=d.Decoration.replace({block:!0,widget:o}).range(n,i)}if(s!==void 0)return n.push(s),!1}}),d.Decoration.set(n,!0)}function xg(e,t){return e.size===0?e:e.update({filter:(e,n,r)=>{let i=r.spec.widget instanceof mg,a=!1;if((i||r.spec.widget instanceof sg)&&(0,m.foldedRanges)(t).between(e,n,()=>{a=!0}),a||U(t,e,n))return!1;if(i&&n<t.doc.length){let e=t.doc.lineAt(n+1);if(e.text.trim()===``&&t.selection.ranges.some(t=>t.empty&&t.goalColumn===void 0&&t.head>=e.from&&t.head<=e.to))return!1}return!0}})}var Sg,Cg=o((()=>{dg(),fg(),gg(),ug(),vg(),kf(),Jd(),Sg=p.StateField.define({create:e=>yg(e),update(e,t){if(t.docChanged||t.reconfigured||(0,m.syntaxTree)(t.startState)!==(0,m.syntaxTree)(t.state)){let n=[];for(let r=e.all.iter();r.value!==null;r.next())if(r.value.spec.widget instanceof mg||r.value.spec.widget instanceof sg){let e=t.changes.mapPos(r.from,1),i=t.changes.mapPos(r.to,-1);e<i&&n.push(r.value.range(e,i))}return yg(t.state,d.Decoration.set(n,!0))}let n=e.all;for(let e of t.effects)e.is(pg)&&e.value.doc===t.state.doc&&(n=n.update({filter:(t,n)=>t!==e.value.from||n!==e.value.to}));return t.selection!==void 0||t.effects.length>0?{all:n,visible:xg(n,t.state)}:e},provide:e=>d.EditorView.decorations.from(e,e=>e.visible)})}));function wg(e,t){let n=[];if(e.name!==`FencedCode`)return n;let r=t.state,i=e.node.firstChild,a=e.node.lastChild;if(i?.name!==`CodeMark`||a?.name!==`CodeMark`||i.from===a.from||!r.sliceDoc(i.from,i.to).startsWith("```"))return n;let o=r.doc.lineAt(i.from),s=r.doc.lineAt(a.from),c=e.node.getChild(`CodeInfo`),l=!1;if((0,m.foldedRanges)(r).between(o.to,s.to,(e,t)=>{if(e>=o.to&&t>=s.to)return l=!0,!1}),l)return n;let u=U(r,e.from,e.to);for(let{from:e,to:i}of t.visibleRanges){let t=Math.max(o.number,r.doc.lineAt(e).number),a=Math.min(s.number,r.doc.lineAt(i).number);for(let e=t;e<=a;e++){let t=r.doc.line(e),i=[`cm-md-syntaxHiddenCodeBlock`];e===o.number&&i.push(`cm-md-syntaxHiddenCodeStart`),e===s.number&&i.push(`cm-md-syntaxHiddenCodeEnd`);let a=e===o.number&&!u&&c!==null?{"data-code-language":r.sliceDoc(c.from,c.to).trim().split(/\s+/)[0]}:void 0;n.push(d.Decoration.line({class:i.join(` `),attributes:a}).range(t.from))}}return u||(n.push(Tg.range(i.from,o.to)),n.push(Tg.range(a.from,s.to))),n}var Tg,Eg=o((()=>{kf(),Tg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence`})}));function Dg(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`ATXHeading`)!==!0||n.firstChild?.from!==e.from)return;let r=kg(t,e.to,n.to);if(Ag(t,r,n.to)&&!U(t,n.from,n.to))return{from:e.from,to:r}}function Og(e,t){let n=e.node.parent;if(e.name!==`HeaderMark`||n?.name.startsWith(`SetextHeading`)!==!0)return;let r=t.doc.lineAt(e.from);if(!U(t,n.from,n.to))return r.from}function kg(e,t,n){return t+(/^ */.exec(e.sliceDoc(t,n))?.[0].length??0)}function Ag(e,t,n){return/\S/.test(e.sliceDoc(t,n))}var jg=o((()=>{kf()}));function Mg(e,t){if(e.name!==`HorizontalRule`||e.node.parent?.name!==`Document`)return;let n=t.doc.lineAt(e.from);if(!U(t,n.from,n.to))return d.Decoration.replace({widget:new Ng((0,m.highlightingFor)(t,[h.tags.contentSeparator])??``)}).range(n.from,n.to)}var Ng,Pg=o((()=>{kf(),Ng=class extends d.WidgetType{highlightClass;constructor(e){super(),this.highlightClass=e}eq(e){return e.highlightClass===this.highlightClass}toDOM(){let e=document.createElement(`span`);return e.className=[`cm-md-syntaxHiddenHorizontalRule`,this.highlightClass].filter(Boolean).join(` `),e.setAttribute(`role`,`separator`),e.setAttribute(`aria-orientation`,`horizontal`),e}}}));function Fg(e,t){let n=e.node.parent;if(n===null||Ig.get(n.name)!==e.name||U(t,n.from,n.to))return[];let r=[Lg.range(e.from,e.to)];if(n.name!==`InlineCode`||e.from!==n.from)return r;let i=n.firstChild?.to,a=n.lastChild?.from;return i===void 0||a===void 0||i>=a||(a-i===1?r.push(Vg.range(i,a)):(r.push(zg.range(i,i+1)),r.push(Bg.range(a-1,a)))),r}var Ig,Lg,Rg,zg,Bg,Vg,Hg=o((()=>{kf(),Ig=new Map([[`Emphasis`,`EmphasisMark`],[`StrongEmphasis`,`EmphasisMark`],[`Strikethrough`,`StrikethroughMark`],[`InlineCode`,`CodeMark`]]),Lg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),Rg=`cm-md-syntaxHiddenInlineCodeBoundary`,zg=d.Decoration.mark({class:`${Rg} cm-md-syntaxHiddenInlineCodeStart`}),Bg=d.Decoration.mark({class:`${Rg} cm-md-syntaxHiddenInlineCodeEnd`}),Vg=d.Decoration.mark({class:`${Rg} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`})})),Ug,Wg=o((()=>{Ug=d.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTable":{boxSizing:`border-box`,width:`100%`,padding:`0.5em 6px`,overflow:`hidden`,contain:`content`,cursor:`text`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeBlock":{"--code-border":`color-mix(in srgb, currentColor 18%, transparent)`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border)`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart":{position:`relative`,boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 1px var(--code-border)`,borderTopLeftRadius:`6px`,borderTopRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeStart[data-code-language]::after":{content:`attr(data-code-language)`,position:`absolute`,top:`0.5em`,right:`0.5em`,maxWidth:`calc(100% - 1em)`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,fontSize:`0.8em`,lineHeight:`1`,opacity:`0.55`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenCodeEnd":{boxShadow:`inset 1px 0 var(--code-border), inset -1px 0 var(--code-border), inset 0 -1px var(--code-border)`,borderBottomLeftRadius:`6px`,borderBottomRightRadius:`6px`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:`0px !important`,fontVariantLigatures:`none !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:`inherit !important`,lineHeight:`inherit !important`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenFence *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:`inherit !important`,visibility:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:`flex`,alignItems:`center`,justifyContent:`center`,fontFamily:`Menlo, monospace`,fontSize:`0.9em`,pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:`0 !important`},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:`0`,lineHeight:`0`,overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:`3px`,borderBottomLeftRadius:`3px`,paddingInlineStart:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:`3px`,borderBottomRightRadius:`3px`,paddingInlineEnd:`0.25em`},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:`hidden`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:`none`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:`inline-flex`,alignItems:`center`,boxSizing:`border-box`,height:`1em`,lineHeight:`1em`,verticalAlign:`middle`,gap:`0.4em`,fontFamily:`system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,fontStyle:`normal`,fontWeight:`500`,textIndent:`0`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#0969da`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#1a7f37`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#8250df`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#9a6700`},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#d1242f`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:`#2f81f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:`#3fb950`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:`#a371f7`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:`#d29922`},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:`#f85149`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:`inline-block`,width:`1em`,height:`1em`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:`block`,width:`100%`,height:`100%`,fill:`currentColor`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:`inline-block`,appearance:`none`,width:`0.9em`,height:`0.9em`,padding:`0`,border:`0`,background:`transparent`,font:`inherit`,marginInlineStart:`0.25em`,verticalAlign:`-0.1em`,cursor:`pointer`},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:`inherit`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:`block`,width:`100%`,height:`100%`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:`inline-block`,width:`100%`,borderTop:`2px solid currentColor`,verticalAlign:`middle`,opacity:`0.35`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:`inline-block`,maxWidth:`100%`,height:`auto`,verticalAlign:`middle`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:`0`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:`border-box`,width:`100%`,paddingBlock:`0.5em`,overflowX:`auto`,overflowY:`hidden`,textAlign:`center`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:`block`,maxWidth:`100%`,height:`auto`,marginInline:`auto`},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:`pre-wrap`,textAlign:`start`}})})),Gg=c({createHiddenSyntaxExtension:()=>Kg,hiddenSyntaxExtension:()=>n_});function Kg(e=Du){return[_g.of(e),t_]}function qg(e){let t=[],n=new Set,r=new Set,i=e.state.facet(_g).includes(`image`),a=e.state.facet(_g).includes(`html`),o=gp(e.state);for(let{from:s,to:c}of e.visibleRanges)(0,m.syntaxTree)(e.state).iterate({from:s,to:c,enter:s=>{if(a){let t=!1;if(e.state.field(Sg).visible.between(s.from,s.to,(e,n,r)=>{r.spec.widget instanceof sg&&e<s.to&&n>s.from&&(t||=e<=s.from&&n>=s.to)}),t)return!1}s.name===`FencedCode`&&!r.has(s.from)&&(r.add(s.from),t.push(...wg(s,e)));let c=Af(s,e.state);c!==void 0&&!n.has(c.from)&&(n.add(c.from),t.push(d.Decoration.replace({widget:new If(c.type,c.title)}).range(c.from,c.to)));let l=jf(s,e.state);l!==void 0&&t.push(Yg.range(l.from,l.to));let u=Yf(s,e.state);if(u!==void 0){let e=u.task?Zg:Xg;t.push(e.range(u.from,u.to))}let f=fp(s,e.state,o);if(f!==void 0){let n=e.state.sliceDoc(f.label.from,f.label.to);if(i&&f.image&&f.destination!==``)t.push(d.Decoration.replace({widget:new Ip(f.destination,n)}).range(s.from,s.to));else{f.hidden.forEach(e=>t.push(Jg.range(e.from,e.to)));let r=f.image?e_:$g;t.push(r.range(f.label.from,f.label.to)),t.push(d.Decoration.widget({widget:new Mp(f.image?`image`:`link`,e.state,f.destination,n,f.highlightTags),side:-1}).range(f.label.to))}}let p=pp(s,e.state);for(let n of p)U(e.state,n.from,n.to)||(t.push(Jg.range(n.from+1,n.from+2)),t.push($g.range(n.from,n.to)),t.push(d.Decoration.widget({widget:new Mp(`footnote`,e.state,n.label,n.label,n.highlightTags),side:-1}).range(n.to)));let m=mp(s,e.state);m!==void 0&&(m.hidden.forEach(e=>t.push(Jg.range(e.from,e.to))),t.push(d.Decoration.widget({widget:new Mp(`footnoteBack`,e.state,m.label,m.label,m.highlightTags),side:-1}).range(m.suffixPosition)),m.suffix!==``&&t.push(d.Decoration.widget({widget:new Pp(m.suffix),side:1}).range(m.suffixPosition)));let h=Fg(s,e.state);t.push(...h);let g=Mg(s,e.state);g!==void 0&&t.push(g);let _=Dg(s,e.state);_!==void 0&&t.push(Jg.range(_.from,_.to));let ee=Og(s,e.state);ee!==void 0&&t.push(Qg.range(ee))}});return d.Decoration.set(t,!0)}var Jg,Yg,Xg,Zg,Qg,$g,e_,t_,n_,r_=o((()=>{Pf(),Lf(),Jf(),rp(),dp(),Np(),Fp(),Lp(),ug(),Cg(),vg(),Eg(),jg(),Pg(),Hg(),Cp(),Wg(),Xf(),kf(),Fu(),Jg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource`}),Yg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark`}),Xg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark`}),Zg=d.Decoration.mark({class:`cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark`}),Qg=d.Decoration.line({class:`cm-md-syntaxHiddenSetextUnderline`}),$g=d.Decoration.mark({class:`cm-md-syntaxHiddenLinkLabel`}),e_=d.Decoration.mark({class:`cm-md-syntaxHiddenImageLabel`}),t_=[d.EditorView.editorAttributes.of({class:`cm-md-syntaxHiddenMode`}),Df,Of,d.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=qg(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(e=>e.reconfigured))&&(this.decorations=qg(e.view))}},{decorations:e=>e.decorations}),Kf,tp,lp,Sg,Ug],n_=Kg()})),i_=new p.Compartment,a_=i_.of([]),o_=0;async function s_(e,t){let n=++o_,r=t?await l_():[];n===o_&&(e.dispatch({effects:i_.reconfigure(r)}),t&&e.requestMeasure())}var c_;function l_(){return c_??=Promise.resolve().then(()=>(r_(),Gg)).then(e=>e.hiddenSyntaxExtension)}var u_=function(e,t){return Number(e.slice(0,-1*t.length))},d_=function(e){return e.endsWith(`px`)?{value:e,type:`px`,numeric:u_(e,`px`)}:e.endsWith(`fr`)?{value:e,type:`fr`,numeric:u_(e,`fr`)}:e.endsWith(`%`)?{value:e,type:`%`,numeric:u_(e,`%`)}:e===`auto`?{value:e,type:`auto`}:null},f_=function(e){return e.split(` `).map(d_)},p_=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=!1);var i=r?e+1:e;return t.slice(0,i).reduce(function(e,t){return e+t.numeric},0)+(n?e*n:0)},m_=function(e,t,n){return t.concat(n).map(function(t){return t.style[e]}).filter(function(e){return e!==void 0&&e!==``})},h_=function(e,t){return t.endsWith(e)?Number(t.slice(0,-1*e.length)):null},g_=function(e){for(var t=0;t<e.length;t++)if(e[t].numeric>0)return t;return null},__=function(){return!1},v_=function(e,t,n){e.style[t]=n},Z=function(e,t,n){var r=e[t];return r===void 0?n:r};function y_(e){var t;return(t=[]).concat.apply(t,Array.from(e.ownerDocument.styleSheets).map(function(e){var t=[];try{t=Array.from(e.cssRules||[])}catch{}return t})).filter(function(t){var n=!1;try{n=e.matches(t.selectorText)}catch{}return n})}var b_=`grid-template-columns`,x_=`grid-template-rows`,Q=function(e,t,n){this.direction=e,this.element=t.element,this.track=t.track,e===`column`?(this.gridTemplateProp=b_,this.gridGapProp=`grid-column-gap`,this.cursor=Z(n,`columnCursor`,Z(n,`cursor`,`col-resize`)),this.snapOffset=Z(n,`columnSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`columnDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientX`,this.optionStyle=Z(n,`gridTemplateColumns`)):e===`row`&&(this.gridTemplateProp=x_,this.gridGapProp=`grid-row-gap`,this.cursor=Z(n,`rowCursor`,Z(n,`cursor`,`row-resize`)),this.snapOffset=Z(n,`rowSnapOffset`,Z(n,`snapOffset`,30)),this.dragInterval=Z(n,`rowDragInterval`,Z(n,`dragInterval`,1)),this.clientAxis=`clientY`,this.optionStyle=Z(n,`gridTemplateRows`)),this.onDragStart=Z(n,`onDragStart`,__),this.onDragEnd=Z(n,`onDragEnd`,__),this.onDrag=Z(n,`onDrag`,__),this.writeStyle=Z(n,`writeStyle`,v_),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener(`mousedown`,this.startDragging),this.element.addEventListener(`touchstart`,this.startDragging))};Q.prototype.getDimensions=function(){var e=this.grid.getBoundingClientRect(),t=e.width,n=e.height,r=e.top,i=e.bottom,a=e.left,o=e.right;this.direction===`column`?(this.start=r,this.end=i,this.size=n):this.direction===`row`&&(this.start=a,this.end=o,this.size=t)},Q.prototype.getSizeAtTrack=function(e,t){return p_(e,this.computedPixels,this.computedGapPixels,t)},Q.prototype.getSizeOfTrack=function(e){return this.computedPixels[e].numeric},Q.prototype.getRawTracks=function(){var e=m_(this.gridTemplateProp,[this.grid],y_(this.grid));if(!e.length){if(this.optionStyle)return this.optionStyle;throw Error(`Unable to determine grid template tracks from styles.`)}return e[0]},Q.prototype.getGap=function(){var e=m_(this.gridGapProp,[this.grid],y_(this.grid));return e.length?e[0]:null},Q.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]},Q.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]},Q.prototype.setTracks=function(e){this.tracks=e.split(` `),this.trackValues=f_(e)},Q.prototype.setComputedTracks=function(e){this.computedTracks=e.split(` `),this.computedPixels=f_(e)},Q.prototype.setGap=function(e){this.gap=e},Q.prototype.setComputedGap=function(e){this.computedGap=e,this.computedGapPixels=h_(`px`,this.computedGap)||0},Q.prototype.getMousePosition=function(e){return`touches`in e?e.touches[0][this.clientAxis]:e[this.clientAxis]},Q.prototype.startDragging=function(e){if(!(`button`in e&&e.button!==0)){e.preventDefault(),this.grid=this.element?this.element.parentNode:e.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(e){return e.type===`%`}),n=this.trackValues.filter(function(e){return e.type===`fr`});if(this.totalFrs=n.length,this.totalFrs){var r=g_(n);r!==null&&(this.frToPixels=this.computedPixels[r].numeric/n[r].numeric)}if(t.length){var i=g_(t);i!==null&&(this.percentageToPixels=this.computedPixels[i].numeric/t[i].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(e)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error(`Invalid track index: `+this.track+`. Track must be between two other tracks and only `+this.tracks.length+` tracks were found.`);this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener(`mouseup`,this.stopDragging),window.addEventListener(`touchend`,this.stopDragging),window.addEventListener(`touchcancel`,this.stopDragging),window.addEventListener(`mousemove`,this.drag),window.addEventListener(`touchmove`,this.drag),this.grid.addEventListener(`selectstart`,__),this.grid.addEventListener(`dragstart`,__),this.grid.style.userSelect=`none`,this.grid.style.webkitUserSelect=`none`,this.grid.style.MozUserSelect=`none`,this.grid.style.pointerEvents=`none`,this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}},Q.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)},Q.prototype.drag=function(e){var t=this.getMousePosition(e),n=this.getSizeOfTrack(this.track),r=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,i=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(n-this.dragStartOffset),a=r+this.snapOffset,o=i-this.snapOffset;t<a&&(t=r),t>o&&(t=i),t<r?t=r:t>i&&(t=i);var s=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,c=this.bTrackEnd-t+this.dragStartOffset-n-this.computedGapPixels;if(this.dragInterval>1){var l=Math.round(s/this.dragInterval)*this.dragInterval;c-=l-s,s=l}if(s<this.minSizeStart&&(s=this.minSizeStart),c<this.minSizeEnd&&(c=this.minSizeEnd),this.trackValues[this.aTrack].type===`px`)this.tracks[this.aTrack]=s+`px`;else if(this.trackValues[this.aTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.aTrack]=`1fr`;else{var u=s/this.frToPixels;this.tracks[this.aTrack]=u+`fr`}}else if(this.trackValues[this.aTrack].type===`%`){var d=s/this.percentageToPixels;this.tracks[this.aTrack]=d+`%`}if(this.trackValues[this.bTrack].type===`px`)this.tracks[this.bTrack]=c+`px`;else if(this.trackValues[this.bTrack].type===`fr`){if(this.totalFrs===1)this.tracks[this.bTrack]=`1fr`;else{var f=c/this.frToPixels;this.tracks[this.bTrack]=f+`fr`}}else if(this.trackValues[this.bTrack].type===`%`){var p=c/this.percentageToPixels;this.tracks[this.bTrack]=p+`%`}var m=this.tracks.join(` `);this.writeStyle(this.grid,this.gridTemplateProp,m),this.onDrag(this.direction,this.track,m)},Q.prototype.cleanup=function(){window.removeEventListener(`mouseup`,this.stopDragging),window.removeEventListener(`touchend`,this.stopDragging),window.removeEventListener(`touchcancel`,this.stopDragging),window.removeEventListener(`mousemove`,this.drag),window.removeEventListener(`touchmove`,this.drag),this.grid&&(this.grid.removeEventListener(`selectstart`,__),this.grid.removeEventListener(`dragstart`,__),this.grid.style.userSelect=``,this.grid.style.webkitUserSelect=``,this.grid.style.MozUserSelect=``,this.grid.style.pointerEvents=``,this.grid.style.cursor=``),window.document.body.style.cursor=``},Q.prototype.destroy=function(e,t){e===void 0&&(e=!0),e||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener(`mousedown`,this.startDragging),this.element.removeEventListener(`touchstart`,this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var S_=function(e,t,n){return t in e?e[t]:n},C_=function(e,t){return function(n){if(n.track<1)throw Error(`Invalid track index: `+n.track+`. Track must be between two other tracks.`);var r=e===`column`?t.columnMinSizes||{}:t.rowMinSizes||{},i=e===`column`?`columnMinSize`:`rowMinSize`;return new Q(e,Object.assign({},{minSizeStart:S_(r,n.track-1,Z(t,i,Z(t,`minSize`,0))),minSizeEnd:S_(r,n.track+1,Z(t,i,Z(t,`minSize`,0)))},n),t)}},w_=function(e){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:e.columnGutters||[],rowGutters:e.rowGutters||[],columnMinSizes:e.columnMinSizes||{},rowMinSizes:e.rowMinSizes||{}},e),this.options.columnGutters.forEach(function(e){t.columnGutters[e.track]=C_(`column`,t.options)(e)}),this.options.rowGutters.forEach(function(e){t.rowGutters[e.track]=C_(`row`,t.options)(e)})};w_.prototype.addColumnGutter=function(e,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=C_(`column`,this.options)({element:e,track:t})},w_.prototype.addRowGutter=function(e,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=C_(`row`,this.options)({element:e,track:t})},w_.prototype.removeColumnGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.columnGutters[e]&&this.columnGutters[e].destroy(t,function(){delete n.columnGutters[e]})},w_.prototype.removeRowGutter=function(e,t){var n=this;t===void 0&&(t=!0),this.rowGutters[e]&&this.rowGutters[e].destroy(t,function(){delete n.rowGutters[e]})},w_.prototype.handleDragStart=function(e,t,n){t===`column`?(this.columnGutters[n]&&this.columnGutters[n].destroy(),this.columnGutters[n]=C_(`column`,this.options)({track:n}),this.columnGutters[n].startDragging(e)):t===`row`&&(this.rowGutters[n]&&this.rowGutters[n].destroy(),this.rowGutters[n]=C_(`row`,this.options)({track:n}),this.rowGutters[n].startDragging(e))},w_.prototype.destroy=function(e){var t=this;e===void 0&&(e=!0),Object.keys(this.columnGutters).forEach(function(n){return t.columnGutters[n].destroy(e,function(){delete t.columnGutters[n]})}),Object.keys(this.rowGutters).forEach(function(n){return t.rowGutters[n].destroy(e,function(){delete t.rowGutters[n]})})};function T_(e){return new w_(e)}var E_=`body .markdown-body details summary,
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
`;me(),Jd(),of(),Fu(),Fd(),jd();var D_=document.body,O_=document.createElement(`div`),$=document.createElement(`div`),k_=te(`* { cursor: col-resize }`,!1),A_=p.Annotation.define(),j_=function(e){return e[e.edit=0]=`edit`,e[e.sideBySide=1]=`sideBySide`,e[e.preview=2]=`preview`,e[e.syntaxHidden=3]=`syntaxHidden`,e}({});function M_(){te(E_),te(Ed()),te(Od());let e=document.createElement(`div`);e.className=bf.dividerViewClass,O_.appendChild(e),O_.className=bf.gutterViewClass,D_.appendChild(O_),$.className=bf.previewPaneClass,D_.appendChild($),document.addEventListener(`keydown`,e=>{if(!e.metaKey||e.key!==`a`)return;let t=f.MarkEdit.editorView?.contentDOM??document.querySelector(`.cm-content`);($.classList.contains(`overlay`)||document.activeElement!==t)&&(ce($),e.preventDefault())}),new MutationObserver(Y_).observe($,{attributes:!0,attributeFilter:[`style`,`class`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{Y_(),document.querySelector(`.mermaid`)!==null&&R_()}),typeof f.MarkEdit.getFileInfo==`function`&&typeof f.MarkEdit.openFile==`function`&&$.addEventListener(`click`,Q_),$.addEventListener(`click`,e=>{$_(e),ev(e)})}function N_(e,t=!0){let n=I_();tv.viewMode=e,e!==n&&localStorage.setItem(xf.viewModeCacheKey,String(e));let r=f.MarkEdit.editorView;s_(r,e===3),L_()?r.focus():e===2&&r.contentDOM.blur(),e===1?(D_.classList.add(bf.containerClass),tv.splitter??=T_({columnGutters:[{track:1,element:O_}],minSize:150,onDragStart:()=>k_.disabled=!1,onDragEnd:()=>k_.disabled=!0})):(D_.classList.remove(bf.containerClass),tv.splitter?.destroy(),tv.splitter=void 0),e===2?$.classList.add(`overlay`):$.classList.remove(`overlay`),t?R_(!0):++tv.renderVersion}function P_(){let e=ju.map(e=>{switch(e){case`edit`:return 0;case`side-by-side`:return 1;case`preview`:return 2;case`syntax-hidden`:return 3;default:return}}).filter(e=>e!==void 0),t=e.some(e=>e===0||e===3)?e:[0,...e],n=t.indexOf(I_());N_(t[n===-1?0:(n+1)%t.length])}function F_(){let e=localStorage.getItem(xf.viewModeCacheKey);if(e===null)return;let t=Number(e);if(I_()===t){t===3&&s_(f.MarkEdit.editorView,!0);return}N_(t,!0)}function I_(){return tv.viewMode}function L_(){let e=I_();return e===0||e===3}async function R_(e=I_()!==2||!$.hasChildNodes()){let t=++tv.renderVersion;if(L_())return;let n=Yd(await J_());if(t!==tv.renderVersion)return;let r={top:$.scrollTop,left:$.scrollLeft};$.innerHTML=n;let i=localStorage.getItem(xf.previewPageZoomKey);i!==null&&X_(i);let a=()=>{e&&t===tv.renderVersion&&cf(W_(),$,!1)};e?a():$.scrollTo(r),Vd(a)}function z_(e){if(L_()||I_()===1&&f.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key===`0`)return;let t=Number($.style.zoom)||1,n=e=>String(Math.min(Math.max(e,.5),3));switch(e.key){case`-`:case`_`:X_(n(t-.1));break;case`=`:case`+`:X_(n(t+.1));break;case`0`:X_(`1`);break;default:return}localStorage.setItem(xf.previewPageZoomKey,$.style.zoom),e.preventDefault(),e.stopPropagation()}function B_(){Z_(!1)}function V_(){Z_(!0)}function H_(){let e=J_(!1);return fe(new ClipboardItem({"text/plain":e.then(e=>new Blob([e],{type:`text/plain`}))}),V(`failedToCopy`))}function U_(){let e=J_(!1);return fe(new ClipboardItem({"text/html":e.then(e=>new Blob([e],{type:`text/html`})),"text/plain":e.then(e=>new Blob([pe(e)],{type:`text/plain`}))}),V(`failedToCopy`))}function W_(){return f.MarkEdit.editorView.scrollDOM}function G_(){return $}async function K_(e){let t=await J_(!1);return e?await Hd(t):`<meta charset="UTF-8">\n${t}`}async function q_(e,t){let n=await Rd(e,!1);return t?await Hd(n):`<meta charset="UTF-8">\n${n}`}async function J_(e=!0){return await Rd(f.MarkEdit.editorAPI.getText(),e)}function Y_(){let e=getComputedStyle($).backgroundColor;O_.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function X_(e){$.style.zoom=e,$.classList.toggle(`zoomed-in`,Number(e)>1)}async function Z_(e){let t=await(async()=>{let e=await f.MarkEdit.getFileInfo();return e===void 0?`${V(`untitled`)}.html`:`${re(e.filePath)}.html`})(),n=await K_(e);f.MarkEdit.showSavePanel({fileName:t,string:n})}async function Q_(e){if(!(e.target instanceof Element))return;let t=e.target.closest(`a`);if(t===null)return;let n=t.getAttribute(`href`);if(!n?.startsWith(`../`))return;let r=(await f.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{let e=ue(r,decodeURIComponent(n));await f.MarkEdit.openFile(e)}catch(e){console.error(`Failed to open file:`,e)}}}function $_(e){let t=`suppress-underline`,n=e.target instanceof Element?e.target.closest(`a`):null;n!==null&&_f($,e),n!==null&&!n.classList.contains(t)&&n.matches(`:hover`)&&(n.classList.add(t),n.addEventListener(`mouseleave`,()=>n.classList.remove(t),{once:!0}))}function ev(e){let t=e.target;if(!(t instanceof HTMLInputElement)||!t.classList.contains(`task-list-item-checkbox`))return;let n=t.closest(`[data-line-from]`);if(n===null){console.error(`Failed to find task item block`);return}let r=f.MarkEdit.editorAPI,i=r.getLineRange(ae(n).from),a=gf(r.getText(i));if(a===null){t.checked=!t.checked,console.error(`Failed to resolve task toggle`);return}let o=i.from+a.offset;f.MarkEdit.editorView.dispatch({changes:{from:o,to:o+1,insert:a.replacement},annotations:A_.of(!0)})}var tv={viewMode:0,splitter:void 0,renderVersion:0};me();var nv=`markedit-preview`,rv=`${nv}.js`;function iv(e){let{destExists:t,bundleInfo:n,currentVersion:r}=e,i=n?.version===r,a=n?.fullBuild===!1;return!(t&&i&&a)}async function av(){try{let e=f.MarkEdit.getDirectoryPath(`documents`),t=f.MarkEdit.getDirectoryPath(`sharedContainer`);if(e===void 0||t===void 0){console.error(`Required directories are not accessible`);return}let n=typeof __FILE_PATH__==`string`?__FILE_PATH__:ue(e,`scripts/${rv}`);if(await f.MarkEdit.getFileInfo(n)===void 0){console.error(`Source file not found at ${n}`);return}let r=n.split(`/`).pop()??rv,i=ue(t,`Shared/scripts`),a=ue(i,r),o=await f.MarkEdit.getFileInfo(a)!==void 0,s=ue(t,`Shared/metadata.json`),c=await de(s),l=c[nv];if(!iv({destExists:o,bundleInfo:l,currentVersion:`1.12.0`}))return;let u=await f.MarkEdit.getFileContent(n);if(u===void 0){console.error(`Failed to read content from ${n}`);return}await f.MarkEdit.createFile({path:i,isDirectory:!0}),await f.MarkEdit.createFile({path:a,string:u,overwrites:!0}),await f.MarkEdit.createFile({path:s,string:JSON.stringify({...c,[nv]:{version:`1.12.0`,fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error(`Failed to copy the current file to shared container:`,e)}}Fd();var ov=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>`,sv=`<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>`;function cv(){let e=lv(V(`source`),ov),t=lv(V(`preview`),sv),n=document.createElement(`div`);n.className=`quicklook-segmented`,n.setAttribute(`role`,`tablist`),n.append(e,t);let r=document.createElement(`div`);return r.className=`quicklook-toolbar`,r.appendChild(n),{toolbar:r,sourceButton:e,previewButton:t}}function lv(e,t){let n=document.createElement(`button`);n.title=e,n.type=`button`,n.className=`quicklook-segment`,n.setAttribute(`role`,`tab`),n.setAttribute(`aria-label`,e);let r=document.createElement(`span`);r.textContent=e,r.className=`quicklook-segment-label`;let i=document.createElement(`span`);return i.innerHTML=t,i.className=`quicklook-segment-icon`,n.append(r,i),n}function uv(){if(fv!==void 0)return fv;try{fv=localStorage.getItem(pv)===`preview`?`preview`:`source`}catch{console.error(`Failed to read quick look mode from localStorage`),fv=`source`}return fv}function dv(e){fv=e;try{localStorage.setItem(pv,e)}catch{console.error(`Failed to write quick look mode to localStorage`)}}var fv,pv=`ui.quicklook-mode`;function mv(){let e=window,t=e.editor?.state?.doc.toString();return typeof t==`string`?t:(console.error(`Failed to get text from host editor state`),e.config?.text??``)}function hv(){document.addEventListener(`webkitmouseforcewillbegin`,e=>{let t=e.target;t instanceof Element&&t.closest(`a`)!==null&&e.preventDefault()})}function gv(e,t){let n=window,r=n.pinchZoomTarget;n.pinchZoomTarget=()=>{if(e()!==`preview`)return r?.()??null;let n=t.querySelector(`.quicklook-content`);return n===null?null:{scroller:t,inner:n}};for(let n of[`gesturechange`,`gestureend`])document.addEventListener(n,()=>{if(e()!==`preview`)return;let n=t.querySelector(`.quicklook-content`);n?.style.zoom.length?n?.style.setProperty(`--quicklook-zoom`,n.style.zoom):n?.style.removeProperty(`--quicklook-zoom`)},{passive:!1})}function _v(e,t){let n,r=window,i={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},a=()=>{let e=t.clientHeight,n=t.scrollHeight,r=n-e;if(r<=0||n<=0)return{clientHeight:e,scrollHeight:n,scrollbarHeight:e,scrollbarTop:0};let i=e/n*e;return{clientHeight:e,scrollHeight:n,scrollbarHeight:i,scrollbarTop:t.scrollTop/r*(e-i)}},o=(e,n,r=`auto`)=>{let{clientHeight:i,scrollHeight:o,scrollbarHeight:s}=a(),c=i-s;if(c>0){let a=(e-n)/c;t.scrollTo({top:a*(o-i),behavior:r})}};r.startDragging=r=>{if(e()!==`preview`){i.start?.(r);return}let{scrollbarTop:s,scrollbarHeight:c}=a(),l=xv(t,r);n=l-s,(l<s||l>s+c)&&o(l,c*.5,`smooth`)},r.updateDragging=r=>{if(e()!==`preview`){i.update?.(r);return}n!==void 0&&o(xv(t,r),n)},r.cancelDragging=()=>{if(e()!==`preview`){i.cancel?.();return}n=void 0}}function vv(e,t,n){n.addEventListener(`wheel`,n=>{let r=e()===`preview`?t:document.querySelector(`.cm-scroller`);r!==null&&(r.scrollTop+=n.deltaY,r.scrollLeft+=n.deltaX,n.preventDefault())},{passive:!1})}function yv(e,t,n){let r=document.querySelector(`.cm-scroller`),i=()=>{let i=(e()===`preview`?t:r)?.scrollTop??0;n.classList.toggle(`scrolled`,i>0),n.classList.toggle(`scrolled-far`,i>20)};return t.addEventListener(`scroll`,i,{passive:!0}),r?.addEventListener(`scroll`,i,{passive:!0}),i}function bv(e){document.addEventListener(`copy`,t=>{if(!e.classList.contains(`overlay`))return;let n=getSelection(),r=n!==null&&n.rangeCount>0?n.getRangeAt(0):null,i=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,a=i??(()=>{let t=document.createRange();return t.selectNodeContents(e),t})(),o=document.createElement(`div`);o.appendChild(a.cloneContents()),t.clipboardData?.setData(`text/html`,o.innerHTML),t.clipboardData?.setData(`text/plain`,i===null?e.innerText:i.toString()),t.preventDefault(),t.stopPropagation()},!0)}function xv(e,t){return t-e.getBoundingClientRect().top}var Sv=`body {
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
`;Jd(),of(),me();function Cv(e){te(Sv),document.body.classList.add(`quicklook`);let{toolbar:t,sourceButton:n,previewButton:r}=cv();document.body.appendChild(t);let i=Tv(e),a={previewPane:e,sourceButton:n,previewButton:r,refreshSeparator:yv(uv,e,t),ensureRendered:i.ensureRendered};n.addEventListener(`click`,()=>{dv(`source`),wv(a)}),r.addEventListener(`click`,()=>{dv(`preview`),wv(a)}),wv(a),setTimeout(i.ensureRendered,0),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{e.querySelector(`.mermaid`)!==null&&(i.invalidate(),uv()===`preview`&&i.ensureRendered())}),hv(),gv(uv,e),_v(uv,e),vv(uv,e,t),bv(e)}function wv(e){let t=uv()===`source`,n=!t;e.sourceButton.classList.toggle(`active`,t),e.previewButton.classList.toggle(`active`,n),e.sourceButton.setAttribute(`aria-selected`,String(t)),e.previewButton.setAttribute(`aria-selected`,String(n)),e.previewPane.classList.toggle(`overlay`,n),e.refreshSeparator(),n&&e.ensureRendered()}function Tv(e){let t=!1,n;return{ensureRendered:()=>(t||n||(n=(async()=>{try{e.innerHTML=`<div class="quicklook-content">${Yd(await Rd(mv(),!1))}</div>`,e.querySelectorAll(`a[href]`).forEach(e=>{e.removeAttribute(`href`),e.removeAttribute(`target`)}),Vd(()=>{}),t=!0}catch(e){throw n=void 0,e}})()),n),invalidate:()=>{t=!1,n=void 0}}}var Ev=u(s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):n.Mark=r()})(e,(function(){var e=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t=function(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;t(this,e),this.ctx=n,this.iframes=r,this.exclude=i,this.iframesTimeout=a}return n(e,[{key:`getContexts`,value:function(){var e=void 0,t=[];return e=this.ctx===void 0||!this.ctx?[]:NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:typeof this.ctx==`string`?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx],e.forEach(function(e){var n=t.filter(function(t){return t.contains(e)}).length>0;t.indexOf(e)===-1&&!n&&t.push(e)}),t}},{key:`getIframeContents`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw Error(`iframe inaccessible`)}catch{n()}r&&t(r)}},{key:`isIframeBlank`,value:function(e){var t=`about:blank`,n=e.getAttribute(`src`).trim();return e.contentWindow.location.href===t&&n!==t&&n}},{key:`observeIframeLoad`,value:function(e,t,n){var r=this,i=!1,a=null,o=function o(){if(!i){i=!0,clearTimeout(a);try{r.isIframeBlank(e)||(e.removeEventListener(`load`,o),r.getIframeContents(e,t,n))}catch{n()}}};e.addEventListener(`load`,o),a=setTimeout(o,this.iframesTimeout)}},{key:`onIframeReady`,value:function(e,t,n){try{e.contentWindow.document.readyState===`complete`?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch{n()}}},{key:`waitForIframes`,value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector(`html`),function(){--r||t()})},function(e){e||t()})}},{key:`forEachIframe`,value:function(t,n,r){var i=this,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},o=t.querySelectorAll(`iframe`),s=o.length,c=0;o=Array.prototype.slice.call(o);var l=function(){--s<=0&&a(c)};s||l(),o.forEach(function(t){e.matches(t,i.exclude)?l():i.onIframeReady(t,function(e){n(t)&&(c++,r(e)),l()},l)})}},{key:`createIterator`,value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:`createInstanceOnIframe`,value:function(t){return new e(t.querySelector(`html`),this.iframes)}},{key:`compareNodeIframe`,value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(t!==null){if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}else return!0}return!1}},{key:`getIteratorNode`,value:function(e){var t=e.previousNode(),n=void 0;return n=(t===null||e.nextNode())&&e.nextNode(),{prevNode:t,node:n}}},{key:`checkIframeFilter`,value:function(e,t,n,r){var i=!1,a=!1;return r.forEach(function(e,t){e.val===n&&(i=t,a=e.handled)}),this.compareNodeIframe(e,t,n)?(i===!1&&!a?r.push({val:n,handled:!0}):i!==!1&&!a&&(r[i].handled=!0),!0):(i===!1&&r.push({val:n,handled:!1}),!1)}},{key:`handleOpenIframes`,value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:`iterateThroughNodes`,value:function(e,t,n,r,i){for(var a=this,o=this.createIterator(t,e,r),s=[],c=[],l=void 0,u=void 0,d=function(){var e=a.getIteratorNode(o);return u=e.prevNode,l=e.node,l};d();)this.iframes&&this.forEachIframe(t,function(e){return a.checkIframeFilter(l,u,e,s)},function(t){a.createInstanceOnIframe(t).forEachNode(e,function(e){return c.push(e)},r)}),c.push(l);c.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(s,e,n,r),i()}},{key:`forEachNode`,value:function(e,t,n){var r=this,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},a=this.getContexts(),o=a.length;o||i(),a.forEach(function(a){var s=function(){r.iterateThroughNodes(e,a,t,n,function(){--o<=0&&i()})};r.iframes?r.waitForIframes(a,s):s()})}}],[{key:`matches`,value:function(e,t){var n=typeof t==`string`?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){var i=!1;return n.every(function(t){return!r.call(e,t)||(i=!0,!1)}),i}return!1}}]),e}(),a=function(){function a(e){t(this,a),this.ctx=e,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf(`MSIE`)>-1||n.indexOf(`Trident`)>-1)&&(this.ie=!0)}return n(a,[{key:`log`,value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`debug`,r=this.opt.log;this.opt.debug&&(r===void 0?`undefined`:e(r))===`object`&&typeof r[n]==`function`&&r[n](`mark.js: `+t)}},{key:`escapeStr`,value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,`\\$&`)}},{key:`createRegExp`,value:function(e){return this.opt.wildcards!==`disabled`&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),this.opt.wildcards!==`disabled`&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e),e}},{key:`createSynonymsRegExp`,value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?``:`i`,r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?`\0`:``;for(var i in t)if(t.hasOwnProperty(i)){var a=t[i],o=this.opt.wildcards===`disabled`?this.escapeStr(i):this.setupWildcardsRegExp(i),s=this.opt.wildcards===`disabled`?this.escapeStr(a):this.setupWildcardsRegExp(a);o!==``&&s!==``&&(e=e.replace(RegExp(`(`+this.escapeStr(o)+`|`+this.escapeStr(s)+`)`,`gm`+n),r+(`(`+this.processSynomyms(o)+`|`)+(this.processSynomyms(s)+`)`)+r))}return e}},{key:`processSynomyms`,value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:`setupWildcardsRegExp`,value:function(e){return e=e.replace(/(?:\\)*\?/g,function(e){return e.charAt(0)===`\\`?`?`:``}),e.replace(/(?:\\)*\*/g,function(e){return e.charAt(0)===`\\`?`*`:``})}},{key:`createWildcardsRegExp`,value:function(e){var t=this.opt.wildcards===`withSpaces`;return e.replace(/\u0001/g,t?`[\\S\\s]?`:`\\S?`).replace(/\u0002/g,t?`[\\S\\s]*?`:`\\S*`)}},{key:`setupIgnoreJoinersRegExp`,value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||r===``?e:e+`\0`})}},{key:`createJoinersRegExp`,value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(``))),this.opt.ignoreJoiners&&t.push(`\\u00ad\\u200b\\u200c\\u200d`),t.length?e.split(/\u0000+/).join(`[`+t.join(``)+`]*`):e}},{key:`createDiacriticsRegExp`,value:function(e){var t=this.opt.caseSensitive?``:`i`,n=this.opt.caseSensitive?`aàáảãạăằắẳẵặâầấẩẫậäåāą.AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ.cçćč.CÇĆČ.dđď.DĐĎ.eèéẻẽẹêềếểễệëěēę.EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ.iìíỉĩịîïī.IÌÍỈĨỊÎÏĪ.lł.LŁ.nñňń.NÑŇŃ.oòóỏõọôồốổỗộơởỡớờợöøō.OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ.rř.RŘ.sšśșş.SŠŚȘŞ.tťțţ.TŤȚŢ.uùúủũụưừứửữựûüůū.UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ.yýỳỷỹỵÿ.YÝỲỶỸỴŸ.zžżź.ZŽŻŹ`.split(`.`):[`aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ`,`cçćčCÇĆČ`,`dđďDĐĎ`,`eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ`,`iìíỉĩịîïīIÌÍỈĨỊÎÏĪ`,`lłLŁ`,`nñňńNÑŇŃ`,`oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ`,`rřRŘ`,`sšśșşSŠŚȘŞ`,`tťțţTŤȚŢ`,`uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ`,`yýỳỷỹỵÿYÝỲỶỸỴŸ`,`zžżźZŽŻŹ`],r=[];return e.split(``).forEach(function(i){n.every(function(n){if(n.indexOf(i)!==-1){if(r.indexOf(n)>-1)return!1;e=e.replace(RegExp(`[`+n+`]`,`gm`+t),`[`+n+`]`),r.push(n)}return!0})}),e}},{key:`createMergedBlanksRegExp`,value:function(e){return e.replace(/[\s]+/gim,`[\\s]+`)}},{key:`createAccuracyRegExp`,value:function(e){var t=this,n=`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~¡¿`,r=this.opt.accuracy,i=typeof r==`string`?r:r.value,a=typeof r==`string`?[]:r.limiters,o=``;switch(a.forEach(function(e){o+=`|`+t.escapeStr(e)}),i){case`partially`:default:return`()(`+e+`)`;case`complementary`:return o=`\\s`+(o||this.escapeStr(n)),`()([^`+o+`]*`+e+`[^`+o+`]*)`;case`exactly`:return`(^|\\s`+o+`)(`+e+`)(?=$|\\s`+o+`)`}}},{key:`getSeparatedKeywords`,value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(` `).forEach(function(e){e.trim()&&n.indexOf(e)===-1&&n.push(e)}):e.trim()&&n.indexOf(e)===-1&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:`isNumeric`,value:function(e){return Number(parseFloat(e))==e}},{key:`checkRanges`,value:function(e){var t=this;if(!Array.isArray(e)||Object.prototype.toString.call(e[0])!==`[object Object]`)return this.log(`markRanges() will only accept an array of objects`),this.opt.noMatch(e),[];var n=[],r=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var i=t.callNoMatchOnInvalidRanges(e,r),a=i.start,o=i.end;i.valid&&(e.start=a,e.length=o-a,n.push(e),r=o)}),n}},{key:`callNoMatchOnInvalidRanges`,value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&e.start!==void 0?(n=parseInt(e.start,10),r=n+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-n>0?i=!0:(this.log(`Ignoring invalid or overlapping range: `+(``+JSON.stringify(e))),this.opt.noMatch(e))):(this.log(`Ignoring invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:`checkWhitespaceRanges`,value:function(e,t,n){var r=void 0,i=!0,a=n.length,o=t-a,s=parseInt(e.start,10)-o;return s=s>a?a:s,r=s+parseInt(e.length,10),r>a&&(r=a,this.log(`End range automatically set to the max value of `+a)),s<0||r-s<0||s>a||r>a?(i=!1,this.log(`Invalid range: `+JSON.stringify(e)),this.opt.noMatch(e)):n.substring(s,r).replace(/\s+/g,``)===``&&(i=!1,this.log(`Skipping whitespace only range: `+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:`getTextNodes`,value:function(e){var t=this,n=``,r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:`matchesExclude`,value:function(e){return i.matches(e,this.opt.exclude.concat([`script`,`style`,`title`,`head`,`html`]))}},{key:`wrapRangeInTextNode`,value:function(e,t,n){var r=this.opt.element?this.opt.element:`mark`,i=e.splitText(t),a=i.splitText(n-t),o=document.createElement(r);return o.setAttribute(`data-markjs`,`true`),this.opt.className&&o.setAttribute(`class`,this.opt.className),o.textContent=i.textContent,i.parentNode.replaceChild(o,i),a}},{key:`wrapRangeInMappedTextNode`,value:function(e,t,n,r,i){var a=this;e.nodes.every(function(o,s){var c=e.nodes[s+1];if(c===void 0||c.start>t){if(!r(o.node))return!1;var l=t-o.start,u=(n>o.end?o.end:n)-o.start,d=e.value.substr(0,o.start),f=e.value.substr(u+o.start);if(o.node=a.wrapRangeInTextNode(o.node,l,u),e.value=d+f,e.nodes.forEach(function(t,n){n>=s&&(e.nodes[n].start>0&&n!==s&&(e.nodes[n].start-=u),e.nodes[n].end-=u)}),n-=u,i(o.node.previousSibling,o.start),n>o.end)t=o.end;else return!1}return!0})}},{key:`wrapMatches`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){t.nodes.forEach(function(t){t=t.node;for(var i=void 0;(i=e.exec(t.textContent))!==null&&i[o]!==``;)if(n(i[o],t)){var s=i.index;if(o!==0)for(var c=1;c<o;c++)s+=i[c].length;t=a.wrapRangeInTextNode(t,s,s+i[o].length),r(t.previousSibling),e.lastIndex=0}}),i()})}},{key:`wrapMatchesAcrossElements`,value:function(e,t,n,r,i){var a=this,o=t===0?0:t+1;this.getTextNodes(function(t){for(var s=void 0;(s=e.exec(t.value))!==null&&s[o]!==``;){var c=s.index;if(o!==0)for(var l=1;l<o;l++)c+=s[l].length;var u=c+s[o].length;a.wrapRangeInMappedTextNode(t,c,u,function(e){return n(s[o],e)},function(t,n){e.lastIndex=n,r(t)})}i()})}},{key:`wrapRangeFromIndex`,value:function(e,t,n,r){var i=this;this.getTextNodes(function(a){var o=a.value.length;e.forEach(function(e,r){var s=i.checkWhitespaceRanges(e,o,a.value),c=s.start,l=s.end;s.valid&&i.wrapRangeInMappedTextNode(a,c,l,function(n){return t(n,e,a.value.substring(c,l),r)},function(t){n(t,e)})}),r()})}},{key:`unwrapMatches`,value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:`normalizeTextNode`,value:function(e){if(e){if(e.nodeType===3)for(;e.nextSibling&&e.nextSibling.nodeType===3;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:`markRegExp`,value:function(e,t){var n=this;this.opt=t,this.log(`Searching with expression "`+e+`"`);var r=0,i=`wrapMatches`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){r===0&&n.opt.noMatch(e),n.opt.done(r)})}},{key:`mark`,value:function(e,t){var n=this;this.opt=t;var r=0,i=`wrapMatches`,a=this.getSeparatedKeywords(typeof e==`string`?[e]:e),o=a.keywords,s=a.length,c=this.opt.caseSensitive?``:`i`;this.opt.acrossElements&&(i=`wrapMatchesAcrossElements`),s===0?this.opt.done(r):function e(t){var a=new RegExp(n.createRegExp(t),`gm`+c),l=0;n.log(`Searching with expression "`+a+`"`),n[i](a,1,function(e,i){return n.opt.filter(i,t,r,l)},function(e){l++,r++,n.opt.each(e)},function(){l===0&&n.opt.noMatch(t),o[s-1]===t?n.opt.done(r):e(o[o.indexOf(t)+1])})}(o[0])}},{key:`markRanges`,value:function(e,t){var n=this;this.opt=t;var r=0,i=this.checkRanges(e);i&&i.length?(this.log(`Starting to mark with the following ranges: `+JSON.stringify(i)),this.wrapRangeFromIndex(i,function(e,t,r,i){return n.opt.filter(e,t,r,i)},function(e,t){r++,n.opt.each(e,t)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:`unmark`,value:function(e){var t=this;this.opt=e;var n=this.opt.element?this.opt.element:`*`;n+=`[data-markjs]`,this.opt.className&&(n+=`.`+this.opt.className),this.log(`Removal selector "`+n+`"`),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){t.unwrapMatches(e)},function(e){var r=i.matches(e,n),a=t.matchesExclude(e);return!r||a?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:`opt`,set:function(e){this._opt=r({},{element:``,className:``,exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:`partially`,acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:`disabled`,each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:`iterator`,get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),a}();function o(e){var t=this,n=new a(e);return this.mark=function(e,r){return n.mark(e,r),t},this.markRegExp=function(e,r){return n.markRegExp(e,r),t},this.markRanges=function(e,r){return n.markRanges(e,r),t},this.unmark=function(e){return n.unmark(e),t},this}return o}))}))());Fu();var Dv=`markedit-preview-mark`,Ov=`markedit-preview-mark-highlighted`,kv=!1,Av,jv=0,Mv=[],Nv=null,Pv=null,Fv={github:{light:`#fae17d7f`,dark:`#f2cc607f`},cobalt:{light:`#cad40f66`,dark:`#cad40f66`},dracula:{light:`#ffffff40`,dark:`#ffffff40`},minimal:{light:`#fae17d7f`,dark:`#f2cc607f`},"night-owl":{light:`#5f7e9779`,dark:`#5f7e9779`},"rose-pine":{light:`#6e6a864c`,dark:`#6e6a8666`},solarized:{light:`#f4c09d`,dark:`#584032`},synthwave84:{light:`#d18616bb`,dark:`#d18616bb`},"winter-is-coming":{light:`#cee1f0`,dark:`#103362`},xcode:{light:`#e4e4e4`,dark:`#545558`}};function Iv(e){if(Av=e,jv=0,e.search.length===0){Rv();return}let t=G_();Bv(t),Hv(t)}function Lv(e){Mv.length!==0&&(jv=e%Mv.length,Vv())}function Rv(){Nv?.disconnect(),Nv=null,Av=void 0,jv=0,Mv=[],new Ev.default(G_()).unmark()}function zv(){if(I_()===j_.preview)return{numberOfItems:Mv.length,currentIndex:jv}}function Bv(e){let t=Av;if(t===void 0||t.search.length===0||kv)return;Uv(),kv=!0;let{search:n,caseSensitive:r,wholeWord:i,diacriticInsensitive:a,regexp:o}=t,s=new Ev.default(e),c=()=>{Mv=Array.from(e.querySelectorAll(`.${Dv}`)),jv=Mv.length>0?Math.min(jv,Mv.length-1):0,Vv(),kv=!1};s.unmark({done:()=>{if(o)try{let e=r?``:`i`;s.markRegExp(new RegExp(n,e),{className:Dv,done:c})}catch{kv=!1,jv=0,Mv=[]}else s.mark(n,{className:Dv,caseSensitive:r,diacritics:a,separateWordSearch:!1,accuracy:i?`exactly`:`partially`,done:c})}})}function Vv(){let e=I_()!==j_.sideBySide;Mv.forEach((t,n)=>{t.classList.toggle(Ov,e&&n===jv)}),e&&Mv.length>0&&Mv[jv].scrollIntoView({behavior:`smooth`,block:`center`})}function Hv(e){Nv?.disconnect(),Nv=new MutationObserver(()=>{kv||Bv(e)}),Nv.observe(e,{childList:!0})}function Uv(){Pv===null&&(Pv=document.createElement(`style`),document.head.appendChild(Pv));let{light:e,dark:t}=Fv[Ou]??Fv.github;Pv.textContent=[`.${Dv} { background: ${e} !important; color: inherit !important; }`,`.${Ov} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,`@media (prefers-color-scheme: dark) {`,`  .${Dv} { background: ${t} !important; }`,`}`].join(`
`)}of(),Fu(),Ld(),Fd(),me(),window.__markeditPreviewInitialized__?console.error(`MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior.`):(M_(),Id()?typeof f.MarkEdit.onAppReady==`function`&&f.MarkEdit.onAppReady(av):Cv(G_()),window.__markeditPreviewInitialized__=!0),window.MarkEditGetHtml??=K_,window.MarkEditRenderHtml??=q_,window.__markeditPreviewSPI__={performSearch:Iv,setSearchMatchIndex:Lv,clearSearch:Rv,searchCounterInfo:zv},Id()&&(f.MarkEdit.addMainMenuItem({title:V(`viewMode`),icon:ee()?`eye`:void 0,children:[{title:V(`changeMode`),action:P_,key:Mu.key??`V`,modifiers:Mu.modifiers??[`Command`]},{separator:!0},Wv(V(`editMode`),j_.edit),Wv(V(`sideBySideMode`),j_.sideBySide),Wv(V(`previewMode`),j_.preview),Wv(V(`syntaxHiddenMode`),j_.syntaxHidden),{separator:!0},...Gv(),{separator:!0},{title:`${V(`version`)} 1.12.0`,action:()=>open(`https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.12.0`)}]}),f.MarkEdit.addExtension([d.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(e=>e.annotation(A_))||(Kv.renderUpdater!==void 0&&clearTimeout(Kv.renderUpdater),Kv.renderUpdater=setTimeout(R_,500)))}),a_]),f.MarkEdit.onEditorReady(()=>{Tu&&Zd(f.MarkEdit.editorView.scrollDOM),F_(),requestAnimationFrame(async()=>{document.visibilityState===`visible`&&I_()===j_.preview&&typeof f.MarkEdit.getFileInfo==`function`&&(await f.MarkEdit.getFileInfo())?.filePath===void 0&&f.MarkEdit.editorAPI.getText().length===0&&N_(j_.edit,!1)}),R_(),sf(W_(),G_()),Kv.keyDownListener!==void 0&&document.removeEventListener(`keydown`,Kv.keyDownListener),Kv.keyDownListener=e=>z_(e),document.addEventListener(`keydown`,Kv.keyDownListener)}),typeof f.MarkEdit.onEditorConfigChange==`function`&&f.MarkEdit.onEditorConfigChange(e=>{e===`lineHeight`&&I_()===j_.syntaxHidden&&f.MarkEdit.editorView?.requestMeasure()}));function Wv(e,t){return{title:e,action:()=>N_(t),state:()=>({isSelected:I_()===t})}}function Gv(){let e=[{title:V(`copyHtml`),action:H_},{title:V(`copyRichText`),action:U_}];return f.MarkEdit.showSavePanel===void 0?e:[{title:V(`saveCleanHtml`),action:B_},{title:V(`saveStyledHtml`),action:V_},...e]}var Kv={renderUpdater:void 0,keyDownListener:void 0};