/* 楼层 */
    class Floor_last{
        constructor(data){
            this.data = data;
            this.root = null;
        }
        init(){
            this.renderUI();
            this.titleSlider();
            this.mouseEnter();

            
        }
        renderUI(){
            this.root = $(".contentThree");
            let tTB = this.data[0].map(ele=>{
                return `<li class="first">
                ${ele}
            </li>`
            }).join("");
            let lB = this.data[1].map(elem =>{
                let lL = elem.map(element=>{
                    return `<li><a href=${element.href} title=${element.title}>
                    <img src=${element.img} alt=${element.title}>
                </a></li>`
                }).join("");
                return `<ul>${lL}</ul>`
            }).join("");


            let html = `<div class="titieBox clearfix">
                <ul class="clearfix">
                    ${tTB}
                </ul>
            </div>
            <div class="titleSlider"><b></b></div>
            <div class="logoBox">
            ${lB}
            </div>`
            $(this.root).html(html);
            
        }
        titleSlider(){
            $(".contentThree").on("mouseenter",".titieBox li",function(){
                let index = $(this).index();
                let marginLeft = index *105 + "px";
                $(this).parents(".contentThree").find(".titleSlider").css("left",marginLeft);
                $(this).parents(".contentThree").find(".logoBox ul").eq($(this).index()).css("display","block").siblings().css("display","none");
            })
        }
        mouseEnter(){
            $(".contentThree").on("mouseenter",".logoBox li",function(){              
                $(this).children().find("img").animate({
                    left: "-100px"
                }, 500)
            })
            $(".contentThree").on("mouseleave",".logoBox li",function(){
                $(this).children().find("img").animate({
                    left: "0px"
                }, 500)
            })

        }
    }
