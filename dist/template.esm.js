function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function r(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,r){if(t){if("string"==typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,a=!0,l=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return a=t.done,t},e:function(t){l=!0,u=t},f:function(){try{a||null==e.return||e.return()}finally{if(l)throw u}}}}var e=[];function o(t,n){e.push({name:t,options:n()})}function i(n,o){var u;3===n.nodeType&&(n.nodeValue=null===(u=n.nodeValue)||void 0===u?void 0:u.replace(/\{\{([^\}]*)\}\}/g,(function(n,r){var e=a(r,o);return"object"===t(e)&&(e=JSON.stringify(e,null,2)),e}))),n.attributes&&e.map((function(t){n.getAttribute(t.name)&&n.parentNode&&t.options.link(o,n,n.attributes)}));var l,f=r(n.childNodes);try{for(f.s();!(l=f.n()).done;){i(l.value,o)}}catch(t){f.e(t)}finally{f.f()}}function u(t,n){if("true"===n)return!0;if("false"===n)return!1;if(void 0!==t[n])return t[n];var r=n.indexOf(".");if(r>-1){var e=n.substr(0,r);if(n=n.substr(r+1),void 0!==t[e])return u(t[e],n)}return""}function a(t,n){return t=t.replace(/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g,(function(t){return"value(scope,'".concat(t.trim(),"')")})),new Function("value","return (scope)=>".concat(t))(u)(n)}export default function(t,n){o("html",(function(){return{priority:9,link:function(t,n){var r,e=a(null!==(r=n.getAttribute("html"))&&void 0!==r?r:"",t);e&&(n.innerHTML=e)}}})),o("text",(function(){return{priority:9,link:function(t,n){var r,e=a(null!==(r=n.getAttribute("text"))&&void 0!==r?r:"",t);e&&(n.innerText=e)}}})),o(":class",(function(){return{link:function(t,n){var e,o,i,u=[],l=r((null!==(o=n.getAttribute(":class"))&&void 0!==o?o:"").split("|"));try{for(l.s();!(i=l.n()).done;){var f=i.value.split(":");a(f[1],t)&&u.push(f[0])}}catch(t){l.e(t)}finally{l.f()}(e=n.classList).add.apply(e,u),n.removeAttribute(":class")}}})),o("for",(function(){return{priority:10,link:function(t,n){var r,e=null!==(r=n.getAttribute("for"))&&void 0!==r?r:"";if(e.includes(" in ")){var o="",a="",l="$index";e=e.replace(/\s+by\s+([^\s]+)$/,(function(t,n){return n&&(l=(n||"").trim()),""}));var f=/([^\s]+)\s+in\s+([^\s]+)|\(([^,]+)\s*,\s*([^)]+)\)\s+in\s+([^\s]+)/.exec(e);if(f){if(f[1]&&f[2]){if(o=(f[1]||"").trim(),a=(f[2]||"").trim(),!o||!a)return}else f[3]&&f[4]&&f[5]&&(l=(f[3]||"").trim(),o=(f[4]||"").trim(),a=(f[5]||"").trim());var c=u(t,a)||[],s=function(r){var e=n.cloneNode(!0),u={};u[l]=r,u[o]=c[r],u.__proto__=t,n.parentNode.insertBefore(e,n),i(e,u)};if(n.removeAttribute("for"),"length"in c)for(var p=0;p<c.length;p++)s(p);else for(var v in c)c.hasOwnProperty(v)&&s(v);n.parentNode.removeChild(n)}}}}})),o("if",(function(){return{priority:9,link:function(t,n){var r=n.getAttribute("if"),e=n.nextElementSibling;a(r,t)?!!(null!=e?e:null!=e.getAttribute("else"))&&e.parentNode&&e.parentNode.removeChild(e):n.parentNode&&n.parentNode.removeChild(n)}}})),e.sort((function(t,n){return Number(n.options.priority||0)-Number(t.options.priority||0)}));var l=document.createElement("div");l.innerHTML=t;var f,c=r(l.childNodes);try{for(c.s();!(f=c.n()).done;){i(f.value,n)}}catch(t){c.e(t)}finally{c.f()}return l.innerHTML}
