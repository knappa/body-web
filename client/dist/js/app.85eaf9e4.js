(function(t){function e(e){for(var r,i,l=e[0],o=e[1],c=e[2],f=0,u=[];f<l.length;f++)i=l[f],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&u.push(n[i][0]),n[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);d&&d(e);while(u.length)u.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,l=1;l<a.length;l++){var o=a[l];0!==n[o]&&(r=!1)}r&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},n={app:0},s=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=o;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-main",[a("router-view")],1)],1)},s=[],i={name:"App",data:function(){return{}}},l=i,o=a("2877"),c=a("6544"),d=a.n(c),f=a("7496"),u=a("f6c4"),h=Object(o["a"])(l,n,s,!1,null,null,null),v=h.exports;d()(h,{VApp:f["a"],VMain:u["a"]});var m=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("center",[a("svg",{attrs:{width:"4in",height:"6in",version:"1.1",viewBox:"0 0 50.8 76.2",xmlns:"http://www.w3.org/2000/svg","xmlns:cc":"http://creativecommons.org/ns#","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#"}},[a("defs",[a("filter",{staticStyle:{"color-interpolation-filters":"sRGB"},attrs:{id:"filter960",x:"-7.0399e-5",y:"-3.1161e-5",width:"1.0001",height:"1.0001"}},[a("feGaussianBlur",{attrs:{stdDeviation:"0.00027837144"}})],1)]),a("g",[a("path",{staticStyle:{"fill-rule":"evenodd",fill:"#de8787","stroke-width":".26458",stroke:"#000"},attrs:{id:"lungs",d:"m16.008 15.328v13.791h-0.66818v-2.1327l-9.1657 1.928-0.93406 20.954\n           9.1758-4.9292 0.92398-13.35h3.3771l0.68547 13.395 9.6181 5.6431\n           0.05843-21.691-10.362-1.9379v2.1208h-0.6873v-13.791z"},on:{click:function(e){return t.search("lungs")}}}),a("g",{attrs:{id:"heart",transform:"matrix(.60933 0 0 .70278 30.608 -4.2845)"},on:{click:function(e){return t.search("heart")}}},[a("path",{staticStyle:{fill:"#ff2a2a","stroke-width":"1px",stroke:"#000"},attrs:{transform:"scale(.26458)",d:"m-63.615 192.06-11.893 0.22852-7.8125 10.9 5.2949 11.531 5.309\n            32.087-1.138 37.739 3.599-0.0647 0.74905-19.517 1.6528 9.4645 23.533\n            -56.047-15.779-17.479zm-9.6578 5.2254 6.8383 0.19614 2.0453 6.2674-12.263\n             2.3175-1.521-2.8099z"}}),a("path",{staticStyle:{fill:"#06f",filter:"url(#filter960)","stroke-width":".265",stroke:"#000"},attrs:{d:"m-17.953 72.61-2.6913-15.798 2.1924-2.2714 4.5319-0.16296\n             0.05703-1.2235-4.8608 0.10533-4.0376 3.3681-0.0031-5.4574-1.1544 0.02432-0.07955\n              5.4744-3.4446 4.6863 4.0794 5.3458-0.12006 8.4909 1.1565 0.14197 0.18018-7.601z"}})]),a("g",{attrs:{id:"brain",transform:"matrix(.79867 0 0 .78056 -2.988 -.31062)"},on:{click:function(e){return t.search("brain")}}},[a("ellipse",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".22825",stroke:"#000"},attrs:{cx:"30.208",cy:"13.412",rx:"3.6334",ry:"2.8254"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".33993",stroke:"#000"},attrs:{d:"m24.442 1.3671a10.174 5.8265 0 0 0-10.175 5.8265 10.174 5.8265 0 0 0\n             4.0969 4.6726 8.0671 3.607 0 0 0 7.954 3.0045 8.0671 3.607 0 0 0 8.0672-3.607\n              8.0671 3.607 0 0 0-0.77566-1.5431 10.174 5.8265 0 0 0 1.0061-2.527 10.174\n               5.8265 0 0 0-10.174-5.8265z"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m18.441 7.2954a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m20.803 7.1277a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m22.937 7.1116a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m25.023 7.4186a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m27.508 7.4765a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m17.313 8.9436a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n            2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m19.627 8.4575a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m21.359 8.5365a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m23.59 8.4768a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1 2.8652-0.9909"}}),a("path",{staticStyle:{fill:"#e3dbdb","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m25.611 8.7138a2.7142 2.0839 0 0 1-0.27355-2.4035 2.7142 2.0839 0 0 1\n             2.8652-0.9909"}})]),a("g",{attrs:{id:"liver",transform:"translate(-7.5806 -2.4167)"},on:{click:function(e){return t.search("liver")}}},[a("path",{staticStyle:{"fill-rule":"evenodd",fill:"#c83737","stroke-width":".26458",stroke:"#000"},attrs:{d:"m36.601 53.044s0.0938 0.0082-0.04727 1.0882c-0.09537 0.73009-5.4706\n             1.7617-8.3638 4.4674l-15.442 6.7057c-2.5031-8.4683-1.1595-11.412\n              3.1896-12.213 4.3491-0.80084 20.664-0.04832 20.664-0.04832z"}}),a("path",{staticStyle:{"fill-rule":"evenodd",fill:"#ffd5d5","stroke-width":".26458",stroke:"#000"},attrs:{d:"m24.894 52.716 1.1242 0.04026-0.07795 6.8326-1.2363 0.50664z"}})]),a("g",{attrs:{id:"kidneys",transform:"translate(-7.1886 5.3797)"},on:{click:function(e){return t.search("kidneys")}}},[a("g",{attrs:{transform:"matrix(-1 0 0 1 57.657 -8.0831)"}},[a("rect",{staticStyle:{"fill-rule":"evenodd",fill:"#f00","stroke-width":".26458",stroke:"#000"},attrs:{x:"24.179",y:"69.241",width:"3.3758",height:".80857"}}),a("rect",{staticStyle:{"fill-rule":"evenodd",fill:"#00f","stroke-width":".17287",stroke:"#000"},attrs:{x:"24.2",y:"70.717",width:"3.3545",height:".65428"}}),a("path",{staticStyle:{fill:"#c8b7b7","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m23.893 71.775 4.566 0.12936 0.75844 3.4597-0.67099\n               0.03264-0.67349-2.555-3.9282 0.62148z"}}),a("path",{staticStyle:{fill:"#782121","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m25.133 70.567c-0.01282 3.4253 1.8704 0.06307 2.0267 4.5097 0.15627\n               4.4466-6.8271 0.35346-6.8271-4.3224 0-4.6758 5.7942-8.5809\n                6.0912-5.1122s-1.278 1.4996-1.2908 4.9249z"}})]),a("g",{attrs:{transform:"translate(-7.5623 -7.8227)"}},[a("rect",{staticStyle:{"fill-rule":"evenodd",fill:"#f00","stroke-width":".26458",stroke:"#000"},attrs:{x:"24.179",y:"69.241",width:"3.3758",height:".80857"}}),a("rect",{staticStyle:{"fill-rule":"evenodd",fill:"#00f","stroke-width":".17287",stroke:"#000"},attrs:{x:"24.2",y:"70.717",width:"3.3545",height:".65428"}}),a("path",{staticStyle:{fill:"#c8b7b7","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m23.893 71.775 4.566 0.12936 0.75844 3.4597-0.67099\n               0.03264-0.67349-2.555-3.9282 0.62148z"}}),a("path",{staticStyle:{fill:"#782121","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{d:"m25.133 70.567c-0.01282 3.4253 1.8704 0.06307 2.0267 4.5097\n               0.15627 4.4466-6.8271 0.35346-6.8271-4.3224 0-4.6758 5.7942-8.5809\n                6.0912-5.1122s-1.278 1.4996-1.2908 4.9249z"}})])]),a("g",{attrs:{id:"immune"},on:{click:function(e){return t.search("immune")}}},[a("ellipse",{staticStyle:{fill:"#ff7f2a","stroke-linecap":"square","stroke-width":".265",stroke:"#000"},attrs:{cx:"42.634",cy:"32.292",rx:"5.1406",ry:"4.9922"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m42.738 27.305 0.04758-1.3234-0.78283-0.82907 0.80445 0.87578\n             0.692-0.77847-0.69633 0.74344z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m45.753 28.371 1.1418-1.2806-0.0865-1.6192 0.0692 1.5803 1.2499-0.49433-1.2197\n             0.48265z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m41.782 37.312-0.3287 1.7671-1.3105 0.83296 1.3018-0.82907 0.49738\n             1.0743-0.5536-0.99644z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m46.73 35.432 1.3667 1.3429 0.06055 1.9034-0.13408-1.8839 1.4921\n             0.01167-1.5613 0.01167z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m37.479 32.672-1.7127 0.02725-1.0899-1.2884 1.0986 1.2533-0.45845\n             1.3039 0.45845-1.23z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m47.902 31.796 0.27248 0.03114 0.79148-0.14012 0.59685-1.3351-0.63145\n             1.3857 0.46277 1.2027-0.49738-1.2027z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m39.058 28.539-0.8823-1.2806-1.5311-0.56439 1.6176 0.6111 0.28545-1.2845-0.29843\n             1.4129z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m39.023 35.911-1.064 1.1755-1.3191-0.19072 1.371 0.15959-0.1038 0.94974\n             0.10812-0.97698z"}}),a("path",{staticStyle:{fill:"none","stroke-width":".26458px",stroke:"#000"},attrs:{d:"m44.39 36.888 0.63578 1.374-0.27248 1.1171 0.22058-1.2417 0.92988\n             0.6111-0.90393-0.54493z"}}),a("text",{staticStyle:{fill:"#000000","font-family":"'TeX Gyre Bonum Math'","font-size":"2.0033px","letter-spacing":"0px","line-height":"1.25","stroke-width":".15025","word-spacing":"0px"},attrs:{transform:"scale(1.0299 .97092)",x:"37.376965",y:"32.666683","xml:space":"preserve"}},[a("tspan",{staticStyle:{"stroke-width":".15025"},attrs:{x:"37.376965",y:"32.666683"}},[t._v("Immune")]),a("tspan",{staticStyle:{"stroke-width":".15025"},attrs:{x:"37.376965",y:"35.170784"}},[t._v("System")])])])])])])],1)},w=[],b={data:function(){return{}},methods:{search:function(t){this.$router.push({path:"list",query:{system:t}})}}},g=b,k=Object(o["a"])(g,p,w,!1,null,null,null),y=k.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-10"},[a("h1",[t._v("Literature")]),a("hr"),a("br"),a("br"),t.showMessage?a("alert",{attrs:{message:t.message,show:t.showMessage,dismissible:""},on:{dismissed:function(e){t.showMessage=!1}}}):t._e(),a("v-data-table",{attrs:{headers:t.tableHeaders,items:t.references,"item-key":"ident",search:t.search,"show-expand":""},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("References")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("v-spacer"),a("add-reference-dialog",{attrs:{tags:t.tags},on:{"reference-added":t.getLiterature,"reference-added-error":t.getLiterature}})],1)]},proxy:!0},{key:"expanded-item",fn:function(e){var r=e.headers,n=e.item;return[a("td",{attrs:{colspan:r.length}},[a("h3",[t._v("Abstract:")]),t._v(" "+t._s(n.abstract)+" "),a("br"),a("h3",[t._v("Comments:")]),t._v(" "+t._s(n.comments)+" "),a("br")])]}},{key:"item.tags",fn:function(e){var r=e.item;return t._l(r.tags,(function(e,r){return a("v-chip",{key:r,staticClass:"ma-1"},[t._v(" "+t._s(e)+" ")])}))}},{key:"item.actions",fn:function(e){var r=e.item;return[a("edit-reference-dialog",{attrs:{item:r,tags:t.tags},on:{"reference-edited":t.getLiterature,"reference-edited-error":t.getLiterature,"reference-deleted":t.getLiterature,"reference-deleted-error":t.getLiterature}})]}},{key:"no-data",fn:function(){return[t._v(" No Data! ")]},proxy:!0}],null,!0)})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-10"},[a("v-btn",{staticClass:"ma-2",attrs:{outlined:""},on:{click:function(e){return t.downloadBibtex()}}},[t._v(" Download ")])],1)])])},R=[],S=(a("ac1f"),a("841c"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("bc3a")),_=a.n(S),D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({attrs:{color:"primary",dark:""}},"v-btn",n,!1),r),[t._v(" Add reference ")])]}}]),model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[t._v("Enter DOI and select tags for the new Reference")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[a("v-row",[a("v-col",[a("v-text-field",{attrs:{label:"DOI",outlined:""},model:{value:t.newRef.doi,callback:function(e){t.$set(t.newRef,"doi",e)},expression:"newRef.doi"}})],1)],1),a("v-row",[a("v-col",[a("v-select",{attrs:{items:t.tags,label:"Select",multiple:"",chips:"",hint:"Tags","persistent-hint":""},model:{value:t.newRef.tags,callback:function(e){t.$set(t.newRef,"tags",e)},expression:"newRef.tags"}})],1)],1)],1),a("v-col",{attrs:{cols:"6"}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"344",outlined:""}},[a("v-card-title",[t._v("Reference's data")]),a("v-card-text",[a("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[a("v-col",[a("v-text-field",{attrs:{label:"Title",readonly:""},model:{value:t.newRef.title,callback:function(e){t.$set(t.newRef,"title",e)},expression:"newRef.title"}})],1)],1),a("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[a("v-col",[a("v-text-field",{attrs:{label:"Authors",readonly:""},model:{value:t.newRef.authors,callback:function(e){t.$set(t.newRef,"authors",e)},expression:"newRef.authors"}})],1)],1),a("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[a("v-col",[a("v-text-field",{attrs:{label:"Journal",readonly:""},model:{value:t.newRef.journal,callback:function(e){t.$set(t.newRef,"journal",e)},expression:"newRef.journal"}})],1)],1),a("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[a("v-col",[a("v-text-field",{attrs:{label:"Year",readonly:""},model:{value:t.newRef.year,callback:function(e){t.$set(t.newRef,"year",e)},expression:"newRef.year"}})],1)],1)],1)],1)],1),a("v-container",{attrs:{fluid:""}},[a("v-textarea",{attrs:{clearable:"","clear-icon":"mdi-close-circle",label:"Abstract",value:"Abstract"},model:{value:t.newRef.abstract,callback:function(e){t.$set(t.newRef,"abstract",e)},expression:"newRef.abstract"}})],1),a("v-container",{attrs:{fluid:""}},[a("v-textarea",{attrs:{clearable:"","clear-icon":"mdi-close-circle",label:"Comments",value:"Comments"},model:{value:t.newRef.comments,callback:function(e){t.$set(t.newRef,"comments",e)},expression:"newRef.comments"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:"",disabled:t.saveDisabled},on:{click:t.saveReference}},[t._v(" Save ")])],1)],1)],1)},C=[],V=(a("a15b"),a("d81d"),a("99af"),{props:{tags:{type:Array,required:!0}},data:function(){return{showDialog:!1,newRef:{title:"",authors:"",doi:"",tags:[],abstract:"",comments:"",journal:"",year:""},saveDisabled:!0}},computed:{doi:function(){return this.newRef.doi}},watch:{doi:function(){var t=this,e="http://api.crossref.org/works/".concat(this.doi);_.a.get(e).then((function(e){if("OK"!==!e.statusText){t.saveDisabled=!1;var a=e.data.message;if(a.title?Array.isArray(a.title)?t.newRef.title=a.title.join(" "):t.newRef.title=String(a.title):t.newRef.title="",a.author?Array.isArray(a.author)?t.newRef.authors=a.author.map((function(t){return"".concat(t.given," ").concat(t.family)})).join(", "):t.newRef.authors=String(a.authors):t.newRef.authors="",a["container-title"]?t.newRef.journal=a["container-title"].join(" "):t.newRef.journal="",a.published&&a.published["date-parts"]){if(Array.isArray(a.published["date-parts"])){var r=a.published["date-parts"][0],n=r[0];t.newRef.year=n}}else t.newRef.year=""}else t.saveDisabled=!0})).catch((function(e){t.$emit("reference-added-error",e)}))}},methods:{close:function(){this.showDialog=!1},saveReference:function(){var t=this,e="http://immunedigitaltwin.org:5000/literature";_.a.post(e,this.newRef).then((function(){t.newRef.title="",t.newRef.authors="",t.newRef.doi="",t.newRef.tags=[],t.newRef.abstract="",t.newRef.comments="",t.newRef.journal="",t.newRef.year="",t.$emit("reference-added")})).catch((function(e){t.$emit("reference-added-error",e)})),this.showDialog=!1}}}),j=V,$=a("8336"),T=a("b0af"),A=a("99d9"),O=a("62ad"),q=a("a523"),z=a("169a"),E=a("0fd9"),L=a("b974"),B=a("2fa4"),M=a("8654"),F=a("a844"),I=Object(o["a"])(j,D,C,!1,null,null,null),J=I.exports;d()(I,{VBtn:$["a"],VCard:T["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VCol:O["a"],VContainer:q["a"],VDialog:z["a"],VRow:E["a"],VSelect:L["a"],VSpacer:B["a"],VTextField:M["a"],VTextarea:F["a"]});var P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-snackbar",{attrs:{variant:"success",show:""},scopedSlots:t._u([{key:"action",fn:function(e){var r=e.attrs;return[a("v-btn",t._b({attrs:{color:"pink",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",r,!1),[t._v(" Close ")])]}}])},[t._v(" "+t._s(t.message)+" ")])},N=[],G={props:{message:{type:String,required:!0}},data:function(){return{snackbar:!1}}},Y=G,H=a("2db4"),U=Object(o["a"])(Y,P,N,!1,null,null,null),K=U.exports;d()(U,{VBtn:$["a"],VSnackbar:H["a"]});var X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-icon",t._g(t._b({staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.clearNewRef()}}},"v-icon",n,!1),r),[t._v(" mdi-pencil ")])]}}]),model:{value:t.showEditDialog,callback:function(e){t.showEditDialog=e},expression:"showEditDialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[t._v("Edit Reference")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Title",readonly:""},model:{value:t.newRef.title,callback:function(e){t.$set(t.newRef,"title",e)},expression:"newRef.title"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Authors",readonly:""},model:{value:t.newRef.authors,callback:function(e){t.$set(t.newRef,"authors",e)},expression:"newRef.authors"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"DOI",readonly:""},model:{value:t.newRef.doi,callback:function(e){t.$set(t.newRef,"doi",e)},expression:"newRef.doi"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Journal",readonly:""},model:{value:t.newRef.journal,callback:function(e){t.$set(t.newRef,"journal",e)},expression:"newRef.journal"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Year",readonly:""},model:{value:t.newRef.year,callback:function(e){t.$set(t.newRef,"year",e)},expression:"newRef.year"}})],1),a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("v-select",{attrs:{items:t.tags,label:"Select",multiple:"",chips:"",hint:"Tags","persistent-hint":""},model:{value:t.newRef.tags,callback:function(e){t.$set(t.newRef,"tags",e)},expression:"newRef.tags"}})],1),a("v-container",{attrs:{fluid:""}},[a("v-textarea",{attrs:{clearable:"","clear-icon":"mdi-close-circle",label:"Abstract",value:"Abstract"},model:{value:t.newRef.abstract,callback:function(e){t.$set(t.newRef,"abstract",e)},expression:"newRef.abstract"}})],1),a("v-container",{attrs:{fluid:""}},[a("v-textarea",{attrs:{clearable:"","clear-icon":"mdi-close-circle",label:"Comments",value:"Comments"},model:{value:t.newRef.comments,callback:function(e){t.$set(t.newRef,"comments",e)},expression:"newRef.comments"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.editReference}},[t._v(" Save Edits ")])],1)],1)],1),a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-icon",t._g(t._b({staticClass:"mr-2",attrs:{small:""}},"v-icon",n,!1),r),[t._v(" mdi-delete ")])]}}]),model:{value:t.showDeleteDialog,callback:function(e){t.showDeleteDialog=e},expression:"showDeleteDialog"}},[a("v-container",[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[t._v("Delete Reference")])]),a("v-card-text",[t._v(" Title: "+t._s(t.item.title)),a("br"),a("v-container",[t._v(" Are you sure? ")])],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteItem}},[t._v(" Delete ")])],1)],1)],1)],1)],1)},Q=[],W={props:{tags:{type:Array,required:!0},item:{type:Object,required:!0}},data:function(){return{showEditDialog:!1,showDeleteDialog:!1,newRef:{title:"",authors:"",doi:"",tags:[],abstract:"",comments:"",journal:"",year:""}}},methods:{close:function(){this.showEditDialog=!1,this.showDeleteDialog=!1},editReference:function(){var t=this,e="http://immunedigitaltwin.org:5000/literature/".concat(this.item.ident);_.a.put(e,this.newRef).then((function(){t.$emit("reference-edited")})).catch((function(e){t.$emit("reference-edited-error",e)})),console.log(this.item),this.showEditDialog=!1,this.showDeleteDialog=!1},clearNewRef:function(){this.newRef=JSON.parse(JSON.stringify(this.item))},deleteItem:function(){var t=this,e="http://immunedigitaltwin.org:5000/literature/".concat(this.item.ident);_.a.delete(e).then((function(){t.$emit("reference-deleted")})).catch((function(e){t.$emit("reference-deleted-error",e)})),this.showEditDialog=!1,this.showDeleteDialog=!1}}},Z=W,tt=a("132d"),et=Object(o["a"])(Z,X,Q,!1,null,null,null),at=et.exports;d()(et,{VBtn:$["a"],VCard:T["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VCol:O["a"],VContainer:q["a"],VDialog:z["a"],VIcon:tt["a"],VRow:E["a"],VSelect:L["a"],VSpacer:B["a"],VTextField:M["a"],VTextarea:F["a"]});var rt={components:{Alert:K,AddReferenceDialog:J,EditReferenceDialog:at},props:{initSearch:{type:String,default:""}},data:function(){return{search:this.initSearch,addRefDialog:!1,tags:[],references:[],message:"",showMessage:!1,tableHeaders:[{text:"Title",align:"start",filterable:!1,value:"title"},{text:"Author(s)",value:"authors"},{text:"Year",value:"year"},{text:"Journal",value:"journal"},{text:"Tags",value:"tags"},{text:"DOI",value:"doi"},{text:"Actions",value:"actions",sortable:!1},{text:"",value:"data-table-expand"}]}},created:function(){this.getLiterature(),this.getTags()},methods:{getTags:function(){var t=this,e="http://immunedigitaltwin.org:5000/tags";_.a.get(e).then((function(e){t.tags=e.data})).catch((function(t){console.error(t)}))},getLiterature:function(){var t=this,e="http://immunedigitaltwin.org:5000/literature";_.a.get(e).then((function(e){t.references=e.data.literature})).catch((function(t){console.error(t)}))},addRef:function(t){var e=this,a="http://immunedigitaltwin.org:5000/literature";_.a.post(a,t).then((function(){e.getLiterature(),e.message="Citation added",e.showMessage=!0})).catch((function(t){console.log(t),e.getLiterature()}))},initForm:function(){this.addRefForm.title="",this.addRefForm.authors="",this.addRefForm.doi="",this.addRefForm.read=[]},downloadBibtex:function(){var t="http://immunedigitaltwin.org:5000/bibtex";_.a.get(t,{params:{tags:this.search}}).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),a=document.createElement("a");a.href=e,a.setAttribute("download","references.bib"),document.body.appendChild(a),a.click()})).catch((function(t){console.error(t)}))}}},nt=rt,st=a("cc20"),it=a("8fea"),lt=a("71d9"),ot=a("2a7f"),ct=Object(o["a"])(nt,x,R,!1,null,null,null),dt=ct.exports;d()(ct,{VBtn:$["a"],VChip:st["a"],VDataTable:it["a"],VSpacer:B["a"],VTextField:M["a"],VToolbar:lt["a"],VToolbarTitle:ot["a"]}),r["default"].use(m["a"]);var ft=[{path:"/",name:"BodyMap",component:y},{path:"/list",name:"LiteratureList",component:dt,props:function(t){return{initSearch:t.query.system}}}],ut=new m["a"]({mode:"history",base:"/",routes:ft}),ht=ut,vt=a("ce5b"),mt=a.n(vt);a("bf40");r["default"].use(mt.a);var pt={},wt=new mt.a(pt);r["default"].config.productionTip=!1,new r["default"]({router:ht,vuetify:wt,render:function(t){return t(v)}}).$mount("#app")}});
//# sourceMappingURL=app.85eaf9e4.js.map