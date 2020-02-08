    /* 内容1 */
    /* 中间内容 */
    class Mana {
        constructor(data) {
            this.data = data;
            this.root = null;
            this.inde = 0;
            this.index = 0;
            this.ind =0;
            this.rot =null;
        }
        init() {
            this.renderUI(),
            this.indexTabNav(),
            this.autoPlayer1();
            this.eventMouseHandler1();
            this.eventClickWithSliderNav1();
            this.autoPlayer2();
            this.eventMouseHandler2();
            this.eventClickWithSliderNav2();

            this.autoPlayer3();
            this.mouseClick3();
            this.eventMouseHandler3();
            this.eventClickWithSliderNav3();
        }
        renderUI() {
            this.root = $(".contentFirst");

            let indexTabNav = this.data[1].map((ele, i) => {
                return `<li class='${i == 0 ? "iTNon" :""}'>
                ${ele.title}</li>`
            }).join("");
            let iTCW = this.data[1].map((ele, i) => {

                let iTList = ele.indexTabCon.map((elem, n) => {
                    return `<li>
                        <div class="indexTabPic"><a href=${elem.href} target="_blank" title="">
                            <img src=${elem.src} >
                        <span class="video_icon"></span></a>
                        </div>
                            <div class="indexTabTit"><a
                                    href=${elem.href}
                                    target="_blank" title="">
                                    <i class="zhenxuan"></i>
                                    ${elem.text}</a></div>
                            <div class="indexTabPrice homegoodPrice">
                                <strong>${elem.price}</strong>
                            </div>
                        </li>`
                }).join("");
                return `<div class="indexTabCon">
                <ul class="clearfix">
                    ${iTList}
                </ul>
            </div>`
            }).join("");


            let iTNN = this.data[2].map((eleme, ind) => {
                return `<li class='${ind == 0 ? "iTNon" :""}'>${eleme.title}</li>`
            }).join("");
            let iTNC = this.data[2].map((eleme, ind) => {
                let iTNCList = eleme.indexTabNewList.map((eleme, inde) => {
                    return `<li><a href=${eleme.indexTabNewList} target="_blank"
                    title=${eleme.text}>${eleme.text} </a></li>`
                }).join("");
                return `<div class="${ind ==0 ?"__home_gonggao":"__home_cuxiao"}"><ul>
                ${iTNCList}
                </ul></div>`
            }).join("");

            /* 右侧轮播1 */
            let bU = this.data[3].map((eleme, index) => {
                return ` <li><a href=${eleme.href}
                target="_blank" ><img
                    src=${eleme.src}></a></li>`
            }).join("");
            /* 右侧轮播2 */
            let bUI = this.data[4].map((eleme, index) => {
                return ` <li><a href=${eleme.href}
                target="_blank" ><img
                    src=${eleme.src}></a></li>`
            }).join("");

            let html11 = `<div class="indexTabBox clearfix">
            <div class="indexTabNav clearfix">
                    <ul>${indexTabNav}</ul>
            </div>
            <div class="indexTabConWrap">${iTCW}</div>

            <div class="indexTabRight">
                <div class="indexTabNew">
                    <div class="indexTabNewNav">
                         <ul>${iTNN}</ul>
                    </div>
                    <div class="indexTabNewCon">${iTNC}</div>
                </div>

            <div class="indexTuanBox">
            <div class="__home_youlun">
                <ul class="bigU">${bU}</ul>
                <div class="btnBox smallUl">
                    <span class="btnBg">
                    <em class="on"></em>
                    <em class=""></em>
                    <em class=""></em></span>
                </div>
            </div>
            </div>

            <div class="indexAdFocus">
            <div class="__home_youlun">
                <ul class="bigU">${bUI}</ul>
                <div class="btnBox smallUl">
                    <span class="btnBg">
                    <em class="on"></em>
                    <em class=""></em>
                    <em class=""></em></span>
                </div>
            </div>
            </div>

            </div>

            </div>`;

            let iDB = this.data[5].map((element,n)=>{
                return `<p><a href=${element.href}
                target="_blank"><img
                    src=${element.src}></a></p>`
            }).join("");
            this.rot = $(".loadFirst");
        let rL= this.data[6].map((le,nd)=>{
            let rList = le.map((lem,nde)=>{
                return  `<li>
                        <div class="raceListPic"><a
                        href=${lem.href}
                        target="_blank" title=${lem.text}><img
                            src=${lem.src}
                            alt=${lem.text}></a></div>
                <div class="raceListTit">
                    <a href=${lem.href}
                        target="_blank" title=${lem.text}>${lem.text}
                    </a>
                </div>
                <div class="raceListPrice"><strong goodid="98515"
                        class="jxIndex_nowPrice_98515">${lem.price}</strong></div>
            </li>`
            }).join("");
            return  `<div class="raceList"><ul class="clearfix">${rList}</ul></div>`
        }).join("");
        let html12 = `<div class="indexAdBox">${iDB}</div>
        <div class="recommand">
            <div class="__home_youhui">
            <div class="titlebox">
                            <div class="title_2"><i class="newIndexIcon"></i><span>优惠推荐</span></div>
                            <div class="rightNavBox">
                                <span class="on"></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
            <div class="raceListWrap">
                <span class="raceArrow l">&lt; </span>
                <span class="raceArrow r"> &gt;</span>
                <div class="receBoxs">
                    ${rL}
                </div>
            </div>
            </div>
        </div>`;
        $(this.root).html(html11);
        $(this.rot).html(html12);
        }
        indexTabNav() {
            $(".contentFirst").on("mouseenter", ".indexTabNav li", function () {

                $(this).addClass("iTNon").siblings().removeClass("iTNon");
                $(this).parents(".contentFirst").find(".indexTabCon").eq($(this).index()).css("display", "block").siblings().css("display", "none");
            });
            $(".contentFirst").on("mouseenter", ".indexTabNewNav li", function () {
                $(this).addClass("iTNon").siblings().removeClass("iTNon");
                $(this).parents(".indexTabNew").find(".indexTabNewCon div").eq($(this).index()).css("display", "block").siblings().css("display", "none");
            });
 
        }

        autoPlayer1() {
            this.time = setInterval(() => this.nextt(), 4000);
        }
        eventMouseHandler1() {
            $(".indexTuanBox").mouseenter(() => clearInterval(this.time));
            $(".indexTuanBox").mouseleave(() => this.autoPlayer1());

        }
        nextt() {
            this.index++;
            this.leng = $(".indexTuanBox .bigU li").length;
            if (this.index == this.leng) {
                this.index = 0;
            }
            $(".indexTuanBox .bigU li").eq(this.index).stop().fadeIn().siblings().fadeOut();
            this.switchNavItem1();
        }
        eventClickWithSliderNav1() {
            $(".indexTuanBox .btnBg em").each((index, ele) => {
                $(ele).click(() => {
                    $(ele).addClass("on").siblings().removeClass("on");
                    $(".indexTuanBox .bigU li").eq(index).stop().fadeIn().siblings().fadeOut();;
                    this.index = index;
                });
            })
        }
        switchNavItem1() {
            $(".indexTuanBox .btnBg em").eq(this.index).addClass("on").siblings().removeClass("on");

        }
        /*右侧第二个 */
        autoPlayer2() {
            this.timer = setInterval(() => this.next(), 4000);
        }
        eventMouseHandler2() {
            $(".indexAdFocus").mouseenter(() => clearInterval(this.timer));
            $(".indexAdFocus").mouseleave(() => this.autoPlayer2());
        }
        next() {
            this.inde++;
            this.len = $(".indexAdFocus .bigU li").length;
            if (this.inde == this.len) {
                this.inde = 0;
            }
            $(".indexAdFocus .bigU li").eq(this.inde).stop().fadeIn().siblings().fadeOut();
            this.switchNavItem2();
        }
        eventClickWithSliderNav2() {
            $(".indexAdFocus .btnBg em").each((index, ele) => {
                $(ele).click(() => {
                    console.log("++++");

                    $(ele).addClass("on").siblings().removeClass("on");
                    $(".indexAdFocus .bigU li").eq(index).stop().fadeIn().siblings().fadeOut();;
                    this.inde = index;
                });
            })
        }

        switchNavItem2() {

            $(".indexAdFocus .btnBg em").eq(this.inde).addClass("on").siblings().removeClass("on");
        }
        /* 优惠推荐 */
        autoPlayer3() {
            this.tim = setInterval(() => this.nexttt(), 4000);
        }
        eventMouseHandler3() {
            $(".raceList").mouseenter(() => clearInterval(this.tim));
            $(".raceList").mouseleave(() => this.autoPlayer3());
        }
        mouseClick3(){
            $(".r").click(()=>{this.nexttt()});
            $(".l").click(()=>{this.prev()});
        }
        nexttt() {
            this.ind ++;
            this.lengt = $(".raceList").length;
            
            if (this.ind == this.lengt) {
                this.ind = 0;
            }
            // console.log(this.ind);
            
            $(".raceList").eq(this.ind).css("display","block").siblings().css("display","none");
            this.switchNavItem3();
        }
        prev() {
            this.ind--;
            if (this.ind < 0) {
                this.ind = this.lengt - 1;
            }
            $(".raceList").eq(this.ind).css("display","block").siblings().css("display","none");
            this.switchNavItem3();
        }
      
        eventClickWithSliderNav3() {
            $(".rightNavBox span").each((index, ele) => {
                $(ele).click(() => {
                    console.log("++++");

                    $(ele).addClass("on").siblings().removeClass("on");
                    $(".raceList").eq(index).css("display","block").siblings().css("display","none");
                    this.ind = index;
                });
            })
        }

        switchNavItem3() {

            $(".rightNavBox span").eq(this.ind).addClass("on").siblings().removeClass("on");
        }
        
    }