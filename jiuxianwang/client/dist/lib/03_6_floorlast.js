"use strict";var _createClass=function(){function i(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),e}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var Floor_last=function(){function n(e){_classCallCheck(this,n),this.data=e,this.root=null}return _createClass(n,[{key:"init",value:function(){this.renderUI(),this.titleSlider(),this.mouseEnter()}},{key:"renderUI",value:function(){this.root=$(".contentThree");var e='<div class="titieBox clearfix">\n                <ul class="clearfix">\n                    '+this.data[0].map(function(e){return'<li class="first">\n                '+e+"\n            </li>"}).join("")+'\n                </ul>\n            </div>\n            <div class="titleSlider"><b></b></div>\n            <div class="logoBox">\n            '+this.data[1].map(function(e){return"<ul>"+e.map(function(e){return"<li><a href="+e.href+" title="+e.title+">\n                    <img src="+e.img+" alt="+e.title+">\n                </a></li>"}).join("")+"</ul>"}).join("")+"\n            </div>";$(this.root).html(e)}},{key:"titleSlider",value:function(){$(".contentThree").on("mouseenter",".titieBox li",function(){var e=105*$(this).index()+"px";$(this).parents(".contentThree").find(".titleSlider").css("left",e),$(this).parents(".contentThree").find(".logoBox ul").eq($(this).index()).css("display","block").siblings().css("display","none")})}},{key:"mouseEnter",value:function(){$(".contentThree").on("mouseenter",".logoBox li",function(){$(this).children().find("img").animate({left:"-100px"},500)}),$(".contentThree").on("mouseleave",".logoBox li",function(){$(this).children().find("img").animate({left:"0px"},500)})}}]),n}();