/* 楼层 */
    class Floor_4{
        constructor(data,wineEle){
            this.data = data;
            this.root = null;
            this.rot = null;
            this.rooot = null;
            this.wineEle = wineEle;
            this.index = 0;
        }
        init(){
            this.renderUI();
            this.autoPlayer1();
            this.eventMouseHandler1();
            this.eventClickWithSliderNav1();
            
        }
        renderUI(){
        this.root =$(this.wineEle).find(".titlebox");
        this.rot = $(this.wineEle).find(".spiritWrap");
        this.rooot = $(this.wineEle).find(".topTenWrap");
            /* 标题 */
        let rM = this.data[2].map((e,i)=>{
            return `<a href=${e.href} target="_blank"
            title='${e.text}'>${e.text}</a>`
        }).join("");
        let html1 = `<div class="comTitle"><i>${this.data[0]}</i><span>${this.data[1]}</span></div>
        <div class="rightMenu">${rM}</div>`;
        /* 左侧轮播 */
        let iB = this.data[3].map((el,n)=>{
            return `<li><a href=${el.href} title="" target="_blank"><img src=${el.src} alt=""></a></li>`
        }).join("");
        let sL = this.data[4].map((ele,ind)=>{
            return `<li>
            <div class="spiritListPic">
                <a href=${ele.href} target="_blank"
                    title=${ele.text}>
                    <img src=${ele.src} alt=${ele.text}>
                </a>
            </div>
            <div class="spiritListTit">
                <a href=${ele.href} target="_blank" title=${ele.text}>
                    ${ele.text}
                </a>
            </div>
            <div class="spiritListPrice">
                <strong>${ele.price}</strong>
            </div>
            </li>`
        }).join("");
        let html2 = `<div class="bannerSlier sliderBox">
            <div name="__home_bailunxin" class="imgBox">
            <ul class="clearfix">${iB}</ul>
            </div>
            <div class="btnBox">
            <span class="btnBg smallUl">
            <em class="on"></em>
            <em class=""></em>
            <em class=""></em>
            </span></div>
            </div>
            <div class="spiritList" name="__home_baidanpin">
                <ul class="clearfix">${sL}</ul>
            </div>`
        $(this.root).html(html1);
        $(this.rot).html(html2);
        
            
        }
        autoPlayer1() {
            this.time = setInterval(() => this.next(), 4000);
        }
        eventMouseHandler1() {
            $(this.wineEle).find(".bannerSlier").mouseenter(() => clearInterval(this.time));
            $(this.wineEle).find(".bannerSlier").mouseleave(() => this.autoPlayer1());
        }
        next() {
            this.index++;
            this.leng = $(this.wineEle).find(".bannerSlier ul li").length;
            if (this.index == this.leng) {
                this.index = 0;
            }
            $(this.wineEle).find(".bannerSlier ul li").eq(this.index).stop().fadeIn().siblings().fadeOut();
            this.switchNavItem1();
        }
        eventClickWithSliderNav1() {
            $(this.wineEle).find(".bannerSlier .btnBg em").each((index, ele) => {
                $(ele).click(() => {
                    $(ele).addClass("on").siblings().removeClass("on");
                    $(this.wineEle).find(".bannerSlier ul li").eq(index).stop().fadeIn().siblings().fadeOut();;
                    this.index = index;
                });
            })
        }
        switchNavItem1() {
            $(this.wineEle).find(".bannerSlier .btnBg em").eq(this.index).addClass("on").siblings().removeClass("on");

        }
    }
