$(() => {
    $(".btn").on("mouseenter", "li", function () {
        $(this).addClass("choose").siblings().removeClass("choose");
    })
    $(".btn").on("mouseleave", "li", function () {
        $(this).removeClass("choose");
    })
    $(".btn").on("click", "li", function () {
        let h = $("#content").find(".floor").get($(this).index()).offsetTop - 100;
        window.scrollTo(0, h);

    })
    let data = [];
    $(".floor").each(function () {
        let height = this.offsetTop;
        data.push(height);
    })
    $(window).scroll(function () {
        let lastHeight = $(".floor:last").get(0).offsetHeight;
        // console.log(lastHeight);
        
        for (let i = 0, len = data.length; i < len; i++) {
            if (window.scrollY >= data[i] && window.scrollY <= data[i + 1]) {
                $(".btns li").eq(i).addClass("choose").siblings().removeClass("choose");
            }else if(window.scrollY >= data[data.length-1] && window.scrollY <= data[data.length-1]+lastHeight){
                $(".btns li").eq(data.length-1).addClass("choose").siblings().removeClass("choose");
            }else if (window.scrollY >= data[data.length-1]+ lastHeight){
                $(".btns li:last").removeClass("choose");
                
            }else if(window.scrollY < data[0]){
                $(".btns").css("display","none");
            }
        }
        if (window.scrollY >= data[0]) {
            $(".btns").css("display", "block");
        } else {
            $(".btns").css("display", "none");
        }
    })
    $(".toTop").click(function () {
        let ttop = window.scrollY;
        let number = 180;
        let timer = setInterval(function () {
            ttop -= number;
            if (ttop <= 0) {
                clearInterval(timer)
            }
            window.scrollTo(0, ttop);
        }, 50)
    })
    $(".toBottom").click(function () {
        let tBottom = window.scrollY;
        let number = 180;
        let timer = setInterval(function () {
            tBottom += number;
            if (tBottom >= $("body").get(0).offsetHeight) {
                clearInterval(timer)
            }
            window.scrollTo(0, tBottom);
        }, 50)
    })

})