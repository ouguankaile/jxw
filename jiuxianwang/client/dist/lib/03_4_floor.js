"use strict";var _createClass=function(){function t(n,i){for(var e=0;e<i.length;e++){var t=i[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}}();function _classCallCheck(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}var Floor_4=function(){function e(n,i){_classCallCheck(this,e),this.data=n,this.root=null,this.rot=null,this.rooot=null,this.wineEle=i,this.index=0}return _createClass(e,[{key:"init",value:function(){this.renderUI(),this.autoPlayer1(),this.eventMouseHandler1(),this.eventClickWithSliderNav1()}},{key:"renderUI",value:function(){this.root=$(this.wineEle).find(".titlebox"),this.rot=$(this.wineEle).find(".spiritWrap"),this.rooot=$(this.wineEle).find(".topTenWrap");var n=this.data[2].map(function(n,i){return"<a href="+n.href+' target="_blank"\n            title=\''+n.text+"'>"+n.text+"</a>"}).join(""),i='<div class="comTitle"><i>'+this.data[0]+"</i><span>"+this.data[1]+'</span></div>\n        <div class="rightMenu">'+n+"</div>",e='<div class="bannerSlier sliderBox">\n            <div name="__home_bailunxin" class="imgBox">\n            <ul class="clearfix">'+this.data[3].map(function(n,i){return"<li><a href="+n.href+' title="" target="_blank"><img src='+n.src+' alt=""></a></li>'}).join("")+'</ul>\n            </div>\n            <div class="btnBox">\n            <span class="btnBg smallUl">\n            <em class="on"></em>\n            <em class=""></em>\n            <em class=""></em>\n            </span></div>\n            </div>\n            <div class="spiritList" name="__home_baidanpin">\n                <ul class="clearfix">'+this.data[4].map(function(n,i){return'<li>\n            <div class="spiritListPic">\n                <a href='+n.href+' target="_blank"\n                    title='+n.text+">\n                    <img src="+n.src+" alt="+n.text+'>\n                </a>\n            </div>\n            <div class="spiritListTit">\n                <a href='+n.href+' target="_blank" title='+n.text+">\n                    "+n.text+'\n                </a>\n            </div>\n            <div class="spiritListPrice">\n                <strong>'+n.price+"</strong>\n            </div>\n            </li>"}).join("")+"</ul>\n            </div>";$(this.root).html(i),$(this.rot).html(e)}},{key:"autoPlayer1",value:function(){var n=this;this.time=setInterval(function(){return n.next()},4e3)}},{key:"eventMouseHandler1",value:function(){var n=this;$(this.wineEle).find(".bannerSlier").mouseenter(function(){return clearInterval(n.time)}),$(this.wineEle).find(".bannerSlier").mouseleave(function(){return n.autoPlayer1()})}},{key:"next",value:function(){this.index++,this.leng=$(this.wineEle).find(".bannerSlier ul li").length,this.index==this.leng&&(this.index=0),$(this.wineEle).find(".bannerSlier ul li").eq(this.index).stop().fadeIn().siblings().fadeOut(),this.switchNavItem1()}},{key:"eventClickWithSliderNav1",value:function(){var e=this;$(this.wineEle).find(".bannerSlier .btnBg em").each(function(n,i){$(i).click(function(){$(i).addClass("on").siblings().removeClass("on"),$(e.wineEle).find(".bannerSlier ul li").eq(n).stop().fadeIn().siblings().fadeOut(),e.index=n})})}},{key:"switchNavItem1",value:function(){$(this.wineEle).find(".bannerSlier .btnBg em").eq(this.index).addClass("on").siblings().removeClass("on")}}]),e}();