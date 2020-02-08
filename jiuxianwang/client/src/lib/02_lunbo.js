class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.sliderBoxItemWidth = 1920;
        this.index = 0;
        this.timer = null;
        this.sliderBox = null;
        this.len = this.data.length;
        this.mainBanner = document.querySelector(".mainBanner");
        // console.log(this.mainBanner);

    }
    init() {
        this.renderUI();
        this.autoPlayer();
        this.eventMouseHandler();
        this.eventClickWithSliderNav();
    }
    renderUI() {
        this.root = document.createElement("div");
        this.root.classList.add("bigImg");
        let tpl = this.data.map((item, index) => {
            let arr = [];
            for(let m of item.mav){
                let ar = `<a style="background:${m}"></a>`;
                arr.push(ar);
            }
            return `<li style="background:${item.style}" class="${index == 0 ? "current" :""}">
                <div class="ban_cter">
                    <a href=${item.href}></a>
                    <div class="mav">
                       ${arr.join("")}
                    </div>
                </div>
            </li>`
        }).join("");
        let btn = this.data.map((item, index) => {
            return `<li class="${index == 0 ? "active" :""}">${index+1}</li>`
        }).join("");
        let html = `<ul class="bigUl">${tpl}</ul>
        <div class="smallBtn"><ul class="btnpos">${btn}</ul></div>`;
        this.root.innerHTML = html;
        this.mainBanner.appendChild(this.root);
    }

    autoPlayer() {
        /* 核心：定时器 + 设置ul标签的样式(left) */
        this.timer = setInterval(() => this.next(), 2000);
    }
    eventMouseHandler() {
        this.root.onmouseenter = () => clearInterval(this.timer);
        this.root.onmouseleave = () => this.autoPlayer();
    }
    
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        $(".bigUl li").eq(this.index).stop().fadeIn().siblings().fadeOut();
        this.switchNavItem();
    }
    eventClickWithSliderNav() {
        $(".smallBtn li").each((index,ele)=>{
            $(ele).mouseenter(()=> { 
                $(ele).addClass("active").siblings().removeClass("active");
                $(".bigUl li").eq(index).stop().fadeIn().siblings().fadeOut();;   
                this.index = index;
            });
        })
    }
    switchNavItem() {
        $(".smallBtn li").eq(this.index).addClass("active").siblings().removeClass("active");
    }
}