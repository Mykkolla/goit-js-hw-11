var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,r=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof t&&t&&t.Object===Object&&t,a="object"==typeof self&&self&&self.Object===Object&&self,c=f||a||Function("return this")(),l=Object.prototype.toString,s=Math.max,d=Math.min,v=function(){return c.Date.now()};function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function b(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(p(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=p(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var f=i.test(t);return f||r.test(t)?u(t.slice(2),f?2:8):o.test(t)?NaN:+t}e=function(t,e,n){var o,i,r,u,f,a,c=0,l=!1,y=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function m(e){var n=o,r=i;return o=i=void 0,c=e,u=t.apply(r,n)}function h(t){return c=t,f=setTimeout(w,e),l?m(t):u}function j(t){var n=t-a;return void 0===a||n>=e||n<0||y&&t-c>=r}function w(){var t=v();if(j(t))return T(t);f=setTimeout(w,function(t){var n=e-(t-a);return y?d(n,r-(t-c)):n}(t))}function T(t){return f=void 0,g&&o?m(t):(o=i=void 0,u)}function O(){var t=v(),n=j(t);if(o=arguments,i=this,a=t,n){if(void 0===f)return h(a);if(y)return f=setTimeout(w,e),m(a)}return void 0===f&&(f=setTimeout(w,e)),u}return e=b(e)||0,p(n)&&(l=!!n.leading,r=(y="maxWait"in n)?s(b(n.maxWait)||0,e):r,g="trailing"in n?!!n.trailing:g),O.cancel=function(){void 0!==f&&clearTimeout(f),c=0,o=a=i=f=void 0},O.flush=function(){return void 0===f?u:T(v())},O};const y=document.getElementById("search-box");y.addEventListener("input",e((t=>{console.log(t.target.value);const e=t.target.value;var n;(n=e,void fetch(`https://restcountries.com/v2/name/${n}?fields=name,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))).then(console.log)}),300));
//# sourceMappingURL=index.89db35dd.js.map
