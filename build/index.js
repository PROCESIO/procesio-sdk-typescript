/*!
 * 
 *   @procesio/procesio-sdk-typescript v1.0.0
 *   https://github.com/PROCESIO/procesio-sdk-typesscript
 *
 *   Copyright (c) PROCESIO (https://github.com/PROCESIO) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ProcesioSDK=e():t.ProcesioSDK=e()}(self,(function(){return(()=>{var t={757:(t,e,r)=>{t.exports=r(666)},666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new T(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return _()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=O(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?y:h,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",p="executing",y="completed",d={};function v(){}function m(){}function w(){}var g={};g[i]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(S([])));x&&x!==r&&n.call(x,i)&&(g=x);var k=w.prototype=v.prototype=Object.create(g);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(o,i,a,c){var u=l(t[o],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function O(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function S(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:_}}function _(){return{value:e,done:!0}}return m.prototype=k.constructor=w,w.constructor=m,m.displayName=u(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,u(t,c,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},E(j.prototype),j.prototype[a]=function(){return this},t.AsyncIterator=j,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new j(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(k),u(k,c,"Generator"),k[i]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function e(e,r){return function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,c=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(c)throw o}}return i}}(e,r)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function c(t){o(a,n,i,c,u,"next",t)}function u(t){o(a,n,i,c,u,"throw",t)}c(void 0)}))}}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.r(n),r.d(n,{default:()=>h});var c,u=r(757),s=r.n(u);function l(t){return f.apply(this,arguments)}function f(){return(f=i(s().mark((function t(e){var r,n,o,i,a,u,l,f,h,p,y,d,v;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.bearerToken,n=e.url,o=e.method,i=void 0===o?c.POST:o,a=e.workspace,u=void 0===a?"":a,l=e.body,(f=new Headers).set("Content-type","application/json"),f.set("Authorization","Bearer ".concat(r)),f.set("realm","procesio01"),f.set("workspace",u),t.next=8,fetch("https://api.procesio.app:4321/api/".concat(n),{method:i,headers:f,body:JSON.stringify(l)});case 8:return h=t.sent,p=h.status,h.status,t.next=13,h.json();case 13:return y=t.sent,v={status:p,isError:d=200!==p,errorContent:d?y:null,content:d?null:y},t.abrupt("return",v);case 17:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(t){t.GET="GET",t.POST="POST",t.DELETE="DELETE",t.PUT="PUT"}(c||(c={}));const h=function(){function t(){var e,r,n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=void 0,(r="token")in(e=this)?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n}var r,n,o,u,f,h;return r=t,(n=[{key:"authorize",value:(h=i(s().mark((function t(e,r){var n,o,i,a,c,u,l,f,h;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(i in o=[],n={username:e,password:r,realm:"procesio01",client_id:"procesio-ui"})a=encodeURIComponent(i),c=encodeURIComponent(n[i]),o.push(a+"="+c);return u=o.join("&"),(l=new Headers).set("Content-type","application/x-www-form-urlencoded"),t.next=8,fetch("https://api.procesio.app:4532/api/authentication",{method:"POST",body:u,headers:l});case 8:return f=t.sent,t.next=11,f.json();case 11:return h=t.sent,this.token=h.access_token,t.abrupt("return",h);case 14:case"end":return t.stop()}}),t,this)}))),function(t,e){return h.apply(this,arguments)})},{key:"publish",value:function(t,e,r){if(!this.token)throw Error("Authorization information missing.");return l({url:"Projects/".concat(t,"/instances/publish"),bearerToken:this.token,workspace:r,body:e,method:c.POST})}},{key:"launch",value:function(t,e){if(!this.token)throw Error("Authorization information missing.");return l({url:"Projects/instances/".concat(t,"/launch"),bearerToken:this.token,workspace:e,body:{connectionId:""}})}},{key:"uploadFile",value:(f=i(s().mark((function t(e,r,n,o){var i,a,c,u,l=arguments;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=l.length>4&&void 0!==l[4]?l[4]:"",this.token){t.next=3;break}throw Error("Authorization information missing.");case 3:return(a=new Headers).set("Accept","application/json"),a.set("Authorization","Bearer ".concat(this.token)),a.set("realm","procesio01"),a.set("flowInstanceId",e),a.set("variableName",r),a.set("fileId",n),a.set("workspace",i),(c=new FormData).append("package",o),a.delete("Content-Type"),delete a["Content-Type"],t.next=17,fetch("https://api.procesio.app:4321/api/file/upload/flow",{method:"POST",headers:a,body:c});case 17:return u=t.sent,t.abrupt("return",u.json());case 19:case"end":return t.stop()}}),t,this)}))),function(t,e,r,n){return f.apply(this,arguments)})},{key:"run",value:function(t,e,r){if(!this.token)throw Error("Authorization information missing.");return l({url:"Projects/".concat(t,"/run"),bearerToken:this.token,workspace:r,body:{payload:e}})}},{key:"runProcess",value:(u=i(s().mark((function t(r,n,o){var i,a,c,u,l,f,h,p,y,d,v,m=this;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=!1,a={},c=Object.entries(n).reduce((function(t,r){var n=e(r,2),o=n[0],c=n[1];if(c instanceof File)i=!0,t[o]={name:c.name},a[o]={package:c};else if(c instanceof FileList){i=!0;var u=Array.from(c);t[o]=u.map((function(t){return{name:t.name}})),a[o]=u.map((function(t){return{package:t}}))}else t[o]=c;return t}),{}),!i){t.next=40;break}return t.next=6,this.publish(r,c,o);case 6:if((u=t.sent).isError||!u.content.flows.isValid){t.next=38;break}for(h in l=u.content.flows,f=function(t){if(Object.prototype.hasOwnProperty.call(a,t)){var e=a[t],r=l.variables.find((function(e){return e.name===t})).defaultValue;Array.isArray(e)?e.forEach((function(t,e){t.fileId=r[e].id})):e.fileId=r.id}},a)f(h);p=[],t.t0=s().keys(a);case 13:if((t.t1=t.t0()).done){t.next=37;break}if(y=t.t1.value,!Object.prototype.hasOwnProperty.call(a,y)){t.next=35;break}if(d=a[y],!Array.isArray(d)){t.next=30;break}v=0;case 19:if(!(v<d.length)){t.next=28;break}return t.t2=p,t.next=23,this.uploadFile(l.id,y,d[v].fileId,d[v].package);case 23:t.t3=t.sent,t.t2.push.call(t.t2,t.t3);case 25:v++,t.next=19;break;case 28:t.next=35;break;case 30:return t.t4=p,t.next=33,this.uploadFile(l.id,y,d.fileId,d.package);case 33:t.t5=t.sent,t.t4.push.call(t.t4,t.t5);case 35:t.next=13;break;case 37:return t.abrupt("return",Promise.all(p).then((function(){return m.launch(l.id,o)})));case 38:t.next=41;break;case 40:return t.abrupt("return",this.run(r,n,o));case 41:case"end":return t.stop()}}),t,this)}))),function(t,e,r){return u.apply(this,arguments)})}])&&a(r.prototype,n),o&&a(r,o),t}()})(),n})()}));
//# sourceMappingURL=index.js.map