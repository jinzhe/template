function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function r(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,r){if(t){if("string"==typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,a=!0,l=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return a=t.done,t},e:function(t){l=!0,u=t},f:function(){try{a||null==e.return||e.return()}finally{if(l)throw u}}}}var e={},o=[];function i(t,n){e[t]=n(),o.push({name:t,options:e[t]})}function u(t){for(var n=[],r=0;r<t.length;r++)n.push(t[r]);return n}function a(n,r){var e;3===n.nodeType&&(n.nodeValue=null===(e=n.nodeValue)||void 0===e?void 0:e.replace(/\{\{([^\}]*)\}\}/g,(function(n,e){var o=f(e,r);return"object"===t(o)&&(o=JSON.stringify(o,null,2)),o}))),n.attributes&&o.map((function(t){n.getAttribute(t.name)&&n.parentNode&&t.options.link(r,n,n.attributes)})),u(n.childNodes).map((function(t){a(t,r)}))}function l(t,n){if("true"===n)return!0;if("false"===n)return!1;if(void 0!==t[n])return t[n];var r=n.indexOf(".");if(r>-1){var e=n.substr(0,r);if(n=n.substr(r+1),void 0!==t[e])return l(t[e],n)}return""}function f(t,n){return t=t.replace(/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g,(function(t){return"value(scope,'".concat(t.trim(),"')")})),new Function("value","return (scope)=>".concat(t))(l)(n)}export default function(t,n){i("html",(function(){return{priority:9,link:function(t,n){var r,e=f(null!==(r=n.getAttribute("html"))&&void 0!==r?r:"",t);e&&(n.innerHTML=e)}}})),i("text",(function(){return{priority:9,link:function(t,n){var r,e=f(null!==(r=n.getAttribute("text"))&&void 0!==r?r:"",t);e&&(n.innerText=e)}}})),i(":class",(function(){return{link:function(t,n){var e,o,i,u=[],a=r((null!==(o=n.getAttribute(":class"))&&void 0!==o?o:"").split("|"));try{for(a.s();!(i=a.n()).done;){var l=i.value.split(":");f(l[1],t)&&u.push(l[0])}}catch(t){a.e(t)}finally{a.f()}(e=n.classList).add.apply(e,u),n.removeAttribute(":class")}}})),i("for",(function(){return{priority:10,link:function(t,n){var r,e=null!==(r=n.getAttribute("for"))&&void 0!==r?r:"";if(e.includes(" in ")){var o="",i="",u="$index";e=e.replace(/\s+by\s+([^\s]+)$/,(function(t,n){return n&&(u=(n||"").trim()),""}));var f=/([^\s]+)\s+in\s+([^\s]+)|\(([^,]+)\s*,\s*([^)]+)\)\s+in\s+([^\s]+)/.exec(e);if(f){if(f[1]&&f[2]){if(o=(f[1]||"").trim(),i=(f[2]||"").trim(),!o||!i)return}else f[3]&&f[4]&&f[5]&&(u=(f[3]||"").trim(),o=(f[4]||"").trim(),i=(f[5]||"").trim());var c=l(t,i)||[],s=function(r){var e=n.cloneNode(!0),i={};i[u]=r,i[o]=c[r],i.__proto__=t,n.parentNode.insertBefore(e,n),a(e,i)};n.removeAttribute("for");var p=function(t){return Object.prototype.toString.call(t).toLowerCase().slice(8,-1)}(c);if("array"==p)for(var v=0;v<c.length;v++)s(v);else if("object"==p)for(var d in c)c.hasOwnProperty(d)&&s(d);n.parentNode.removeChild(n)}}}}})),i("if",(function(){return{priority:9,link:function(t,n){var r=n.getAttribute("if"),e=n.nextElementSibling;f(r,t)?!!(null!=e?e:null!=e.getAttribute("else"))&&e.parentNode&&e.parentNode.removeChild(e):n.parentNode&&n.parentNode.removeChild(n)}}})),o.sort((function(t,n){return Number(n.options.priority||0)-Number(t.options.priority||0)}));var e=document.createElement("div");return e.innerHTML=t,u(e.childNodes).map((function(t){a(t,n)})),e.innerHTML}