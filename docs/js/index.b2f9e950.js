(function(t){function e(e){for(var a,o,l=e[0],s=e[1],p=e[2],d=0,u=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&u.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);c&&c(e);while(u.length)u.shift()();return n.push.apply(n,p||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],a=!0,l=1;l<i.length;l++){var s=i[l];0!==r[s]&&(a=!1)}a&&(n.splice(e--,1),t=o(o.s=i[0]))}return t}var a={},r={index:0},n=[];function o(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=a,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(i,a,function(e){return t[e]}.bind(null,a));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var p=0;p<l.length;p++)e(l[p]);var c=s;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"242f":function(t,e,i){},"4e72":function(t,e){t.exports=antd},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var a=i("8bbf"),r=i.n(a),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("img-to-pdf"),i("a",{staticClass:"github-corner",attrs:{href:"https://github.com/NPCDW/img2pdf","aria-label":"View source on GitHub"}},[i("svg",{staticStyle:{fill:"#151513",color:"#fff",position:"absolute",top:"0",border:"0",right:"0"},attrs:{width:"80",height:"80",viewBox:"0 0 250 250","aria-hidden":"true"}},[i("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),i("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),i("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])],1)},o=[],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{display:"flex",margin:"40px"}},[i("div",{staticStyle:{height:"800px","min-width":"550px",position:"relative","z-index":"999"}},[i("embed",{staticStyle:{overflow:"auto",width:"100%",height:"100%"},attrs:{src:t.pdfSrc,type:"application/pdf"}})]),i("div",{staticStyle:{margin:"40px"}},[i("a-upload",{attrs:{action:"#","list-type":"picture-card",accept:"image/*","file-list":t.fileList,"before-upload":t.beforeUpload,multiple:!0},on:{preview:t.handlePreview,change:t.handleChange}},[i("a-icon",{attrs:{type:"plus"}}),i("div",{staticClass:"ant-upload-text"},[t._v(" Upload ")])],1),i("a-modal",{attrs:{footer:null,closable:!1},model:{value:t.previewVisible,callback:function(e){t.previewVisible=e},expression:"previewVisible"}},[i("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:t.previewImage}})]),i("div",{staticStyle:{"margin-top":"40px"}},[i("div",[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("计量单位：")]),i("a-radio-group",{attrs:{disabled:t.unitDisabled},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}},[i("a-radio",{attrs:{value:"pt"}},[t._v("points")]),i("a-radio",{attrs:{value:"mm"}},[t._v("mm")]),i("a-radio",{attrs:{value:"cm"}},[t._v("cm")]),i("a-radio",{attrs:{value:"in"}},[t._v("in")]),i("a-radio",{attrs:{value:"px"}},[t._v("px")]),i("a-radio",{attrs:{value:"pc"}},[t._v("pc")]),i("a-radio",{attrs:{value:"em"}},[t._v("em")]),i("a-radio",{attrs:{value:"ex"}},[t._v("ex")])],1)],1),i("div",{staticStyle:{"margin-top":"20px"}},[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("纸张大小：")]),i("a-radio-group",{on:{change:t.pageSizeChange},model:{value:t.pageSizeRadio,callback:function(e){t.pageSizeRadio=e},expression:"pageSizeRadio"}},[i("a-radio",{attrs:{value:0}},[t._v("a4")]),i("a-radio",{attrs:{value:1}},[t._v("b3")]),i("a-radio",{attrs:{value:2}},[t._v("原图尺寸")]),i("a-radio",{attrs:{value:3}},[t._v("自定义规格")]),i("a-radio",{attrs:{value:4}},[t._v("自定义尺寸")])],1)],1),3===t.pageSizeRadio?i("div",{staticStyle:{"margin-top":"20px"}},[t._m(0),i("a-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入上面列出来的值，如：a4、b3"},model:{value:t.pageSize,callback:function(e){t.pageSize=e},expression:"pageSize"}})],1):t._e(),4===t.pageSizeRadio?i("div",{staticStyle:{"margin-top":"20px"}},[i("a-input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"如：210"},model:{value:t.pageWidth,callback:function(e){t.pageWidth=e},expression:"pageWidth"}}),i("span",[t._v(" × ")]),i("a-input-number",{staticStyle:{width:"200px"},attrs:{placeholder:"如：297"},model:{value:t.pageHeight,callback:function(e){t.pageHeight=e},expression:"pageHeight"}})],1):t._e(),i("div",{staticStyle:{"margin-top":"20px"}},[i("div",[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("纸张方向：")]),i("a-radio-group",{attrs:{disabled:t.pageDirectionDisabled},model:{value:t.pageDirection,callback:function(e){t.pageDirection=e},expression:"pageDirection"}},[i("a-radio",{attrs:{value:"portrait"}},[t._v("纵向")]),i("a-radio",{attrs:{value:"landscape"}},[t._v("横向")])],1)],1)]),i("div",{staticStyle:{"margin-top":"20px"}},[i("div",[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("左右边距：")]),i("a-input-number",{attrs:{min:0},model:{value:t.x,callback:function(e){t.x=e},expression:"x"}})],1)]),i("div",{staticStyle:{"margin-top":"20px"}},[i("div",[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("上下边距：")]),i("a-input-number",{attrs:{min:0},model:{value:t.y,callback:function(e){t.y=e},expression:"y"}})],1)]),i("div",{staticStyle:{"margin-top":"20px"}},[i("div",[i("span",{staticStyle:{"margin-right":"10px"}},[t._v("访问密码：")]),i("a-input",{staticStyle:{width:"400px"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)]),i("div",{staticStyle:{"margin-top":"20px"}},[i("a-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.convert}},[t._v("导出PDF")])],1)])],1)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",[i("li",[t._v("a0 - a10")]),i("li",[t._v("b0 - b10")]),i("li",[t._v("c0 - c10")]),i("li",[t._v("dl")]),i("li",[t._v("letter")]),i("li",[t._v("government-letter")]),i("li",[t._v("legal")]),i("li",[t._v("junior-legal")]),i("li",[t._v("ledger")]),i("li",[t._v("tabloid")]),i("li",[t._v("credit-card")])])}],p=i("2909"),c=(i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("9861"),i("99af"),i("cf03")),d={name:"ImgToPdf",data:function(){return{previewVisible:!1,previewImage:"",fileList:[],loading:!1,unitDisabled:!1,pageDirectionDisabled:!1,pageSizeRadio:0,pageSize:null,pageWidth:null,pageHeight:null,pageDirection:"portrait",x:0,y:0,unit:"mm",password:null,pdfSrc:null}},methods:{convert:function(){var t=this;if(0!==this.fileList.length){this.loading=!0;for(var e=[],i=0;i<this.fileList.length;i++)e.push(this.getFormat(this.fileList[i]));Promise.all(e).then((function(){var e=t.fileList[0],i=new c["jsPDF"]({orientation:e.pageDirection,unit:t.unit,format:e.pageSize,hotfixes:"px"===t.unit?["px_scaling"]:null,encryption:{ownerPassword:t.password?t.password:null,userPassword:t.password?t.password:null}}),a=Math.max(e.width/(i.getPageWidth(1)-2*t.x),e.height/(i.getPageHeight(1)-2*t.y));i.addImage({imageData:e.canvas,x:t.x,y:t.y,width:e.width/a,height:e.height/a});for(var r=1;r<t.fileList.length;r++){var n=t.fileList[r];i.addPage(n.pageSize,n.pageDirection);var o=Math.max(n.width/(i.getPageWidth(r+1)-2*t.x),n.height/(i.getPageHeight(r+1)-2*t.y));i.addImage({imageData:n.canvas,x:t.x,y:t.y,width:n.width/o,height:n.height/o})}t.pdfSrc=i.output("bloburi"),t.loading=!1})).catch((function(e){console.error(e),t.$message.error("导出失败"),t.loading=!1}))}else this.$message.warn("请先上传至少一张图片")},getFormat:function(t){var e=this;return new Promise((function(i,a){t.pageDirection=e.pageDirection;var r=e.getFileUrl(t),n=new Image;n.src=r,n.onload=function(){var r=document.createElement("canvas");r.width=n.width,r.height=n.height,t.width=n.width,t.height=n.height;var o=r.getContext("2d");o.fillStyle="white",o.fillRect(0,0,r.width,r.height),o.drawImage(n,0,0,n.width,n.height),t.canvas=r,0===e.pageSizeRadio?(t.pageSize="a4",i()):1===e.pageSizeRadio?(t.pageSize="b3",i()):2===e.pageSizeRadio?(t.pageSize=[n.width+2*e.x,n.height+2*e.y],t.pageDirection=n.width>n.height?"landscape":"portrait",i()):3===e.pageSizeRadio?(t.pageSize=e.pageSize,i()):4===e.pageSizeRadio?(t.pageSize=[e.pageWidth,e.pageHeight],i()):a()},n.onerror=function(t){return a(t)}}))},handlePreview:function(t){this.previewImage=this.getFileUrl(t),this.previewVisible=!0},getFileUrl:function(t){var e=t.url;return t.url||(void 0!==window.createObjectURL?e=window.createObjectURL(t.originFileObj):void 0!==window.URL?e=window.URL.createObjectURL(t.originFileObj):void 0!==window.webkitURL&&(e=window.webkitURL.createObjectURL(t.originFileObj))),t.url=e,e},beforeUpload:function(t){return this.fileList=[].concat(Object(p["a"])(this.fileList),[t]),!1},handleChange:function(t){var e=t.fileList;this.fileList=e},pageSizeChange:function(){2===this.pageSizeRadio?(this.unit="px",this.unitDisabled=!0,this.pageDirectionDisabled=!0):(this.unit="mm",this.unitDisabled=!1,this.pageDirectionDisabled=!1)}}},u=d,g=(i("7ddd"),i("2877")),h=Object(g["a"])(u,l,s,!1,null,"81297072",null),v=h.exports,f={name:"App",components:{ImgToPdf:v}},m=f,b=(i("89d2"),Object(g["a"])(m,n,o,!1,null,"54563bd6",null)),w=b.exports,x=i("4e72"),y=i.n(x);i("202f");r.a.config.productionTip=!1,r.a.use(y.a),new r.a({render:function(t){return t(w)}}).$mount("#app")},"7ddd":function(t,e,i){"use strict";i("242f")},"89d2":function(t,e,i){"use strict";i("aefc")},"8bbf":function(t,e){t.exports=Vue},aefc:function(t,e,i){},cf03:function(t,e){t.exports=jspdf}});