var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){"use strict";function t(){}function n(t){for(var n,e,o=1,r=arguments.length;o<r;o++){e=arguments[o];for(n in e)t[n]=e[n]}return t}function e(t,n){n.appendChild(t)}function o(t,n,e){n.insertBefore(t,e)}function r(t){t.parentNode.removeChild(t)}function i(t){for(var n=0;n<t.length;n+=1)t[n]&&t[n].d()}function s(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function c(){return document.createComment("")}function u(t,n,e){t.addEventListener(n,e,!1)}function f(t,n,e){t.removeEventListener(n,e,!1)}function l(t,n,e){t.style.setProperty(n,e)}function h(){return Object.create(null)}function d(n){this.destroy=t,this.fire("destroy"),this.set=this.get=t,!1!==n&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function m(t,n,e,o,r){for(var i in n)if(e[i]){var s=o[i],a=r[i],c=n[i];if(c)for(var u=0;u<c.length;u+=1){var f=c[u];f.__calling||(f.__calling=!0,f.call(t,s,a),f.__calling=!1)}}}function v(t,n){t._observers={pre:h(),post:h()},t._handlers=h(),t._bind=n._bind,t.options=n,t.root=n.root||t,t.store=t.root.store||n.store}function p(t){for(;t&&t.length;)t.pop()()}var g={destroy:d,get:function(t){return t?this._state[t]:this._state},fire:function(t,n){var e=t in this._handlers&&this._handlers[t].slice();if(e)for(var o=0;o<e.length;o+=1)e[o].call(this,n)},observe:function(t,n,e){var o=e&&e.defer?this._observers.post:this._observers.pre;return(o[t]||(o[t]=[])).push(n),e&&!1===e.init||(n.__calling=!0,n.call(this,this._state[t]),n.__calling=!1),{cancel:function(){var e=o[t].indexOf(n);~e&&o[t].splice(e,1)}}},on:function(t,n){if("teardown"===t)return this.on("destroy",n);var e=this._handlers[t]||(this._handlers[t]=[]);return e.push(n),{cancel:function(){var t=e.indexOf(n);~t&&e.splice(t,1)}}},set:function(t){this._set(n({},t)),this.root._lock||(this.root._lock=!0,p(this.root._beforecreate),p(this.root._oncreate),p(this.root._aftercreate),this.root._lock=!1)},teardown:d,_recompute:t,_set:function(t){var e=this._state,o={},r=!1;for(var i in t)s=t[i],a=e[i],(s!==a||s&&"object"===(void 0===s?"undefined":_typeof(s))||"function"==typeof s)&&(o[i]=r=!0);var s,a;r&&(this._state=n({},e,t),this._recompute(o,this._state),this._bind&&this._bind(o,this._state),this._fragment&&(m(this,this._observers.pre,o,this._state,e),this._fragment.p(o,this._state),m(this,this._observers.post,o,this._state,e)))},_mount:function(t,n){this._fragment.m(t,n)},_unmount:function(){this._fragment&&this._fragment.u()}};function _(t){v(this,t),this._state=n({query:""},t.data);var i=function(){var t=this;this.observe("query",function(n,e){console.log('query: new "%s" old "%s"',n,e),(n.length>3||""===n)&&(console.log("is enter..."),t.fire("search",{query:n}))},{init:!1})}.bind(this);t.root?this.root._oncreate.push(i):this._oncreate=[i],this._fragment=function(t,n){var i,c,l,h,d=!1;function m(){d=!0,n.set({query:c.value}),d=!1}function v(t){n.doSearch(13===t.keyCode)}function p(t){n.doSearch()}return{c:function(){i=s("div"),c=s("input"),l=a("\n        "),(h=s("span")).innerHTML='<img src="/img/icons/search-icon.png" alt="Search" title="Search">',this.h()},h:function(){u(c,"input",m),c.id="search-modules",c.name="search-modules",c.placeholder="Search modules…",c.maxLength="150",u(c,"keydown",v),h.className="icon icon-search",u(h,"click",p),i.className="search-bar-1"},m:function(n,r){o(i,n,r),e(c,i),c.value=t.query,e(l,i),e(h,i)},p:function(t,n){d||(c.value=n.query)},u:function(){r(i)},d:function(){f(c,"input",m),f(c,"keydown",v),f(h,"click",p)}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),p(this._oncreate))}n(_.prototype,{doSearch:function(){var t;!(arguments.length>0&&void 0!==arguments[0])||arguments[0];(t=console).log.apply(t,["do search..."].concat(Array.prototype.slice.call(arguments)))}},g);function y(n,e){var i;return{c:function(){(i=s("li")).innerHTML='<a href="#" class="prev">Prev</a>'},m:function(t,n){o(i,t,n)},u:function(){r(i)},d:t}}function b(n,i,c,u,f){var l,h,d,m,v=c.title;return{c:function(){l=s("li"),h=s("a"),d=a(v),this.h()},h:function(){h.href=m=c.link},m:function(t,n){o(l,t,n),e(h,l),e(d,h)},p:function(t,n,e,o,r){t.pages&&v!==(v=o.title)&&(d.data=v),t.pages&&m!==(m=o.link)&&(h.href=m)},u:function(){r(l)},d:t}}function w(n,e){var i;return{c:function(){(i=s("li")).innerHTML='<a href="#" class="next">Next</a>'},m:function(t,n){o(i,t,n)},u:function(){r(i)},d:t}}function N(t){v(this,t),this._state=n({pages:[],hasNext:!1,hasPrev:!1},t.data),this._fragment=function(t,n){for(var a,u,f,l=t.hasPrev&&y(),h=t.pages,d=[],m=0;m<h.length;m+=1)d[m]=b(0,0,h[m]);var v=t.hasNext&&w();return{c:function(){a=s("ul"),l&&l.c(),u=c();for(var t=0;t<d.length;t+=1)d[t].c();f=c(),v&&v.c()},m:function(t,n){o(a,t,n),l&&l.m(a,null),e(u,a);for(var r=0;r<d.length;r+=1)d[r].m(a,null);e(f,a),v&&v.m(a,null)},p:function(t,n){n.hasPrev?l||((l=y()).c(),l.m(a,u)):l&&(l.u(),l.d(),l=null);var e=n.pages;if(t.pages){for(var o=0;o<e.length;o+=1)d[o]?d[o].p(t,n,e,e[o],o):(d[o]=b(0,0,e[o]),d[o].c(),d[o].m(a,f));for(;o<d.length;o+=1)d[o].u(),d[o].d();d.length=e.length}n.hasNext?v||((v=w()).c(),v.m(a,null)):v&&(v.u(),v.d(),v=null)},u:function(){r(a),l&&l.u();for(var t=0;t<d.length;t+=1)d[t].u();v&&v.u()},d:function(){l&&l.d(),i(d),v&&v.d()}}}(this._state),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null))}n(N.prototype,g);function k(n,i,c,u,f){var l,h,d,m=c;return{c:function(){l=s("div"),h=s("span"),d=a(m),this.h()},h:function(){l.className="label green"},m:function(t,n){o(l,t,n),e(h,l),e(d,h)},p:function(t,n,e,o,r){t.entry&&m!==(m=o)&&(d.data=m)},u:function(){r(l)},d:t}}function x(t,n){for(var e,a=t.entry.keywords,c=[],u=0;u<a.length;u+=1)c[u]=k(0,0,a[u]);return{c:function(){e=s("div");for(var t=0;t<c.length;t+=1)c[t].c();this.h()},h:function(){e.className="labels row"},m:function(t,n){o(e,t,n);for(var r=0;r<c.length;r+=1)c[r].m(e,null)},p:function(t,n){var o=n.entry.keywords;if(t.entry){for(var r=0;r<o.length;r+=1)c[r]?c[r].p(t,n,o,o[r],r):(c[r]=k(0,0,o[r]),c[r].c(),c[r].m(e,null));for(;r<c.length;r+=1)c[r].u(),c[r].d();c.length=o.length}},u:function(){r(e);for(var t=0;t<c.length;t+=1)c[t].u()},d:function(){i(c)}}}function S(t){v(this,t),this._state=n({},t.data);var i=function(){var t=this;window.mods||(window.mods=[]),window.mods.push(this),this.observe("entry.readme",function(n,e){n&&(console.log("Update entry.readme",n),console.log("readme",t.get("entry.readme")))}),this.observe("readme",function(n,e){n&&(console.log("Update readme",n),console.log("readme",t.get("readme")))})}.bind(this);t.root?this.root._oncreate.push(i):this._oncreate=[i],this._fragment=function(t,n){var i,c,l,h,d,m,v,p,g,_,y,b,w,N,k,S,q,L,C,M,E,H,P,T,j,B,O,I=t.entry.name,U=t.entry.version,A=t.entry.description,F=t.entry.author;function z(t){n.doExpand()}var D=t.entry.keywords&&x(t);return{c:function(){i=s("div"),c=s("div"),l=s("div"),h=s("div"),d=s("div"),m=s("a"),v=a(I),g=a("\n                "),_=s("div"),y=s("span"),b=a("v"),w=a(U),N=a("\n            "),k=s("div"),S=s("div"),q=s("p"),L=a(A),C=a("\n\n        \n        "),M=s("div"),D&&D.c(),E=a("\n            "),H=s("div"),P=s("span"),T=a("by "),j=a(F),B=a("\n        \n        "),O=s("div"),this.h()},h:function(){m.href=p="https://npmjs.com/package/"+t.entry.name,d.className="title h-small",u(y,"click",z),_.className="tag",h.className="row row-vCentered",S.className="description p-medium-1",k.className="row",H.className="author row",M.className="row",O.className="readme",c.className="post cols",i.className="row"},m:function(t,n){o(i,t,n),e(c,i),e(l,c),e(h,l),e(d,h),e(m,d),e(v,m),e(g,h),e(_,h),e(y,_),e(b,y),e(w,y),e(N,l),e(k,l),e(S,k),e(q,S),e(L,q),e(C,c),e(M,c),D&&D.m(M,null),e(E,M),e(H,M),e(P,H),e(T,P),e(j,P),e(B,c),e(O,c)},p:function(t,n){t.entry&&I!==(I=n.entry.name)&&(v.data=I),t.entry&&p!==(p="https://npmjs.com/package/"+n.entry.name)&&(m.href=p),t.entry&&U!==(U=n.entry.version)&&(w.data=U),t.entry&&A!==(A=n.entry.description)&&(L.data=A),n.entry.keywords?D?D.p(t,n):((D=x(n)).c(),D.m(M,E)):D&&(D.u(),D.d(),D=null),t.entry&&F!==(F=n.entry.author)&&(j.data=F)},u:function(){r(i),D&&D.u()},d:function(){f(y,"click",z),D&&D.d()}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),p(this._oncreate))}n(S.prototype,{doExpand:function(){console.log("do expand...");var t=this.get("entry.readme");console.log("model",t)}},g);function q(n,e,i){var a;return{c:function(){(a=s("div")).innerHTML="<span>Loading modules...</span>",this.h()},h:function(){a.className="message-box row row-centered row-vCentered",l(a,"display","flex"),l(a,"border","none")},m:function(t,n){o(a,t,n)},p:t,u:function(){r(a)},d:t}}function L(t,n,e,o,r,i){var s=new S({root:i.root,data:{entry:o}});return{c:function(){s._fragment.c()},m:function(t,n){s._mount(t,n)},p:function(t,n,e,o,r,i){var a={};t.modules&&(a.entry=r),s._set(a)},u:function(){s._unmount()},d:function(){s.destroy(!1)}}}function C(n,e,i){var a;return{c:function(){(a=s("div")).innerHTML="<span>Search did not return any results...</span>",this.h()},h:function(){a.className="message-box row row-centered row-vCentered",l(a,"display","flex"),l(a,"border","none")},m:function(t,n){o(a,t,n)},u:function(){r(a)},d:t}}function M(t,n,e){for(var s,u,f=n,l=[],h=0;h<f.length;h+=1)l[h]=L(0,0,0,f[h],0,e);var d=0==n.length&&C();return{c:function(){for(var t=0;t<l.length;t+=1)l[t].c();s=a(" \n        "),d&&d.c(),u=c()},m:function(t,n){for(var e=0;e<l.length;e+=1)l[e].m(t,n);o(s,t,n),d&&d.m(t,n),o(u,t,n)},p:function(t,n,o){var r=o;if(t.modules){for(var i=0;i<r.length;i+=1)l[i]?l[i].p(t,n,o,r,r[i],i):(l[i]=L(0,0,0,r[i],0,e),l[i].c(),l[i].m(s.parentNode,s));for(;i<l.length;i+=1)l[i].u(),l[i].d();l.length=r.length}0==o.length?d||((d=C()).c(),d.m(u.parentNode,u)):d&&(d.u(),d.d(),d=null)},u:function(){for(var t=0;t<l.length;t+=1)l[t].u();r(s),d&&d.u(),r(u)},d:function(){i(l),d&&d.d()}}}function E(n,e,i){var a;return{c:function(){(a=s("p")).textContent="well that's odd"},m:function(t,n){o(a,t,n)},p:t,u:function(){r(a)},d:t}}function H(t){v(this,t),this._state=n({},t.data);var e=function(){var t=this;this.observe("query",function(n){var e=n.query,o=void 0,r=void 0;if(!e)return o=t.get("sourceModules"),t.set({modules:o});(r=t.get("sourceModules"))||(r=t.get("modules"),t.set({sourceModules:r})),r&&(o=new Fuse(r,{shouldSort:!0,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["author","name"]}).search(e),t.set({modules:o}))},{init:!1})}.bind(this);t.root?this.root._oncreate.push(e):(this._oncreate=[e],this._beforecreate=[],this._aftercreate=[]),this._fragment=function(t,n){var e,i,a,c,u,f;function l(t,o,r,s){if(t===c){var u=i;i=(a=o)(s,f=r,n),u&&(u.u(),u.d(),i.c(),i.m(e,null))}}function h(t,n){var e=c={};if((o=t)&&"function"==typeof o.then){if(t.then(function(t){l(e,M,t,n)},function(t){l(e,E,t,n)}),a!==q)return l(e,q,null,n),!0}else if(f=t,a!==M)return l(e,M,f,n),!0;var o}return h(u=t.modules,t),{c:function(){e=s("div"),i.c(),this.h()},h:function(){e.className="posts"},m:function(t,n){o(e,t,n),i.m(e,null)},p:function(t,n){"modules"in t&&u!==(u=n.modules)&&h(u,n)||i.p(t,n,f)},u:function(){r(e),i.u()},d:function(){c=null,i.d()}}}(this._state,this),t.target&&(this._fragment.c(),this._fragment.m(t.target,t.anchor||null),this._lock=!0,p(this._beforecreate),p(this._oncreate),p(this._aftercreate),this._lock=!1)}n(H.prototype,g);var P=function(){return fetch("http://npmsearch.com/query?q=core.io&fields=name,author,readme,keywords,description,version,modified").then(function(t){return t.json()}).then(function(t){var n={};return n.total=t.total,n.from=t.from,n.modules=t.results.map(function(t){return t.readme=t.readme[0],t.author=t.author[0],t.name=t.name[0],t.description=t.description[0],t}),n.modules})},T=new _({target:document.getElementById("searchBox"),data:{}});console.log("Here here!!");var j=P(),B=new H({target:document.querySelector(".posts"),data:{modules:j,filter:"",total:0,from:0}});j.then(function(t){console.log("done"),B.set({modules:t})}),T.on("search",function(t){console.log("tell it to filter",t),B.set({query:t})});new N({target:document.getElementById("pagination")})}();