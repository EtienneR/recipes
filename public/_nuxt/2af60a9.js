(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{220:function(t,e,n){"use strict";n.r(e);n(36);var r=n(15),c={name:"PageRecipe",asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,e.next=3,n("recipes",r.slug).fetch();case 3:return c=e.sent,e.abrupt("return",{recipe:c});case 5:case"end":return e.stop()}}),e)})))()},head:function(){return{title:this.recipe.title}}},l=n(48),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("div",{staticClass:"row mx-auto d-print-none"},[n("b-breadcrumb",{staticClass:"col-lg-9"},[n("b-breadcrumb-item",{attrs:{to:"/"}},[t._v("Accueil")]),t._v(" "),n("b-breadcrumb-item",{attrs:{active:""}},[t._v(t._s(t.recipe.title))])],1),t._v(" "),n("b-col",{staticClass:"h5 px-0 px-lg-2",attrs:{lg:"3"}},[n("b-badge",{staticClass:"py-2 px-3 mt-lg-2 mt-0",attrs:{variant:"sucré"===t.recipe.type?"info":"success"}},[t._v(t._s(t.recipe.type))])],1)],1),t._v(" "),n("article",{staticClass:"row"},[n("b-col",{attrs:{cols:"12"}},[n("h1",{staticClass:"d-none d-sm-block text-white bg-dark p-2 mb-4 text-center"},[t._v("\n        "+t._s(t.recipe.title)+"\n      ")]),t._v(" "),t.recipe.image?n("div",{staticClass:"flex items-center justify-center d-print-none"},[n("img",{attrs:{src:t.recipe.image,alt:"",width:"720"}})]):t._e(),t._v(" "),n("nuxt-content",{staticClass:"d-print-none",attrs:{document:t.recipe}})],1),t._v(" "),n("section",{staticClass:"col-md-5"},[n("h2",{staticClass:"h4"},[t._v("Ingrédients")]),t._v(" "),t._l(t.recipe.ingredients,(function(e,r){return n("div",{key:r},[e.step?n("h3",{staticClass:"h5"},[t._v(t._s(e.step))]):t._e(),t._v(" "),n("ul",{staticClass:"ml-0"},t._l(e.list,(function(e){return n("li",{key:e},[t._v("\n            "+t._s(e)+"\n          ")])})),0)])}))],2),t._v(" "),n("section",{staticClass:"col-md-7"},[n("h2",{staticClass:"h4"},[t._v("Instructions")]),t._v(" "),t._l(t.recipe.directions,(function(e,r){return n("div",{key:r},[e.step?n("h3",{staticClass:"h5"},[t._v(t._s(e.step))]):t._e(),t._v(" "),n("ol",t._l(e.list,(function(e){return n("li",{key:e},[t._v("\n            "+t._s(e)+"\n          ")])})),0)])}))],2)],1)])}),[],!1,null,null,null);e.default=component.exports}}]);