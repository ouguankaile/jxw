"use strict";var _createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Manager=function(){function t(e){_classCallCheck(this,t),this.data=e,this.root=null,this.sliderBoxItemWidth=1920,this.index=0,this.timer=null,this.sliderBox=null,this.len=this.data.length,this.mainBanner=document.querySelector(".mainBanner")}return _createClass(t,[{key:"init",value:function(){this.renderUI(),this.autoPlayer(),this.eventMouseHandler(),this.eventClickWithSliderNav()}},{key:"renderUI",value:function(){this.root=document.createElement("div"),this.root.classList.add("bigImg");var e='<ul class="bigUl">'+this.data.map(function(e,t){var n=[],i=!0,a=!1,s=void 0;try{for(var l,r=e.mav[Symbol.iterator]();!(i=(l=r.next()).done);i=!0){var o='<a style="background:'+l.value+'"></a>';n.push(o)}}catch(e){a=!0,s=e}finally{try{!i&&r.return&&r.return()}finally{if(a)throw s}}return'<li style="background:'+e.style+'" class="'+(0==t?"current":"")+'">\n                <div class="ban_cter">\n                    <a href='+e.href+'></a>\n                    <div class="mav">\n                       '+n.join("")+"\n                    </div>\n                </div>\n            </li>"}).join("")+'</ul>\n        <div class="smallBtn"><ul class="btnpos">'+this.data.map(function(e,t){return'<li class="'+(0==t?"active":"")+'">'+(t+1)+"</li>"}).join("")+"</ul></div>";this.root.innerHTML=e,this.mainBanner.appendChild(this.root)}},{key:"autoPlayer",value:function(){var e=this;this.timer=setInterval(function(){return e.next()},2e3)}},{key:"eventMouseHandler",value:function(){var e=this;this.root.onmouseenter=function(){return clearInterval(e.timer)},this.root.onmouseleave=function(){return e.autoPlayer()}}},{key:"next",value:function(){this.index++,this.index==this.len&&(this.index=0),$(".bigUl li").eq(this.index).stop().fadeIn().siblings().fadeOut(),this.switchNavItem()}},{key:"eventClickWithSliderNav",value:function(){var n=this;$(".smallBtn li").each(function(e,t){$(t).mouseenter(function(){$(t).addClass("active").siblings().removeClass("active"),$(".bigUl li").eq(e).stop().fadeIn().siblings().fadeOut(),n.index=e})})}},{key:"switchNavItem",value:function(){$(".smallBtn li").eq(this.index).addClass("active").siblings().removeClass("active")}}]),t}();