$(()=>{
    /* 购物车中渲染 */
    let user_id = getItem("user_id");
    function cartRenderUI(_data) {
        /* 创建标签 */
        let html = _data.map(ele => {
            return `<div class="rsCartItem clearfix">
            <div class="cartItemInfo info01">
            <div class="rsCartCom-pic">
            <a href="./07_detail.html?img=${ele.src}&title=${ele.proName}&price=${ele.price}&judge=${ele.judge}&goods_id=${ele.id}" target="_blank">
            <img alt=${ele.proName.slice(0,10)} src=${ele.src} data-goods-id=${ele.id}></a></div>
            <div class="rsCartCom-name">
                <p><a href=./07_detail.html?img=${ele.src}&title=${ele.proName}&price=${ele.price}&judge=${ele.judge}&goods_id=${ele.id} target="_blank"
                title=${ele.proName}>${ele.proName}</a></p>
            </div>
            </div>
            <div class="cartItemInfo info02">
                <div class="comAmount">
                    <a href="javascript:;" class="calc dec">-</a>
                    <span id="xgnum">${ele.num}</span>
                    <a href="javascript:;" class="calc plus">+</a>
                </div>
            </div>
            <div class="cartItemInfo info03">￥${ele.price}</div>
            <div class="cartItemInfo info04">￥${(ele.price*ele.num).toFixed(2)}</div>
            <div class="del">×
            </div>
        </div>`
        }).join("");
        $("#rsCartTable").html(html);
    }

    /* 封装函数来获取购物车中所有的商品信息、渲染购物车 */
    function getCartData() {
        $.ajax({
            type: "get",
            url: "../../../server/cart.php",
            data: `type=get&user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                cartRenderUI(response)
                computedTotalPrice();

            }
        });
    };
    getCartGoodsNumber();
    getCartData();



    /* 鼠标进入改变背景颜色 */
    $(".rSidebarItem").mouseenter(function () {
        $(this).children("a").addClass("on")
        $(this).siblings().children(".rSidebarItem a").removeClass("on");
    });
    /* 鼠标离开改变背景颜色 */
    $(".rSidebarItem").mouseleave(function () {
        $(this).children("a").removeClass("on");
    });

    // /* 右侧列表点击事件 */
    // $(".rSidebarItem.cart").click(function () {
    //     $(".rsCartBox").toggle(500);
    //     if ($(this).children("a").hasClass("onn")) {
    //         $(this).children("a").removeClass("onn");
    //     } else {
    //         $(this).children("a").addClass("onn").removeClass("on");
    //     }
    // });

    // /* 点击右上角大×收起购物车 */
    // $(".rsCartClose").click(function () {
    //     $(".rsCartBox").hide(500);
    // })
    // /* 当鼠标移出购物车，点击窗口时收起购物车 */
    // $(document).click(function (e) {
    //     let cartBox = $(".rightSidebarBox").get(0);
    //     target = e.target || e.srcElement;
    //     if ($(".rightSidebarBox").find($(target)).length != 1 &&
    //         cartBox != target) {
    //         $(".rsCartBox").hide(500).siblings(".cart").children("a").removeClass("onn");
    //     }
    // });

    /* 当鼠标进入商品、购入车改变背景颜色、出现删除、出现加减号 */
    $(".rsCartTable").on("mouseenter", ".rsCartItem", function () {
        $(this).addClass("bgc").siblings().removeClass("bgc");
        $(this).children().find(".calc").css({
            "color": "#666666",
            "border": "1px solid #cccccc"
        });
        $(this).siblings().children().find(".calc").css({
            "color": "#ffffff",
            "border": "1px solid #ffffff"
        });
        $(this).children(".del").css("display", "block");
        $(this).siblings().children(".del").css("display", "none");

    });
    $(".rsCartTable").on("mouseleave", ".rsCartItem", function () {
        $(this).removeClass("bgc");
        $(this).children().find(".calc").css({
            "color": "#ffffff",
            "border": "1px solid #ffffff"
        });
        $(this).children(".del").css("display", "none");
    });




    /* 封装函数获取购物车中的商品数量 */
    function getCartGoodsNumber() {
        $.ajax({
            type: "get",
            url: "../../../server/cart.php",
            data: `type=getCount&user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $(".rsCartTotal .amountAll b").text(response.count);
                    // computedTotalPrice();
                    /* 头部购物车中商品数量 */
                    // let cartGoods = $("#amountAll").text().slice(0, 1);
                    $(".jx_car_num").text(response.count);
                }
            }
        });
    };



    /* 购物车中的加减功能 */
    $(".rsCartTable").on("click", ".plus", function () {

        let increase = $(this).siblings("#xgnum").text() * 1;
        increase = increase + 1;
        if (increase >= 99) {
            increase = 99;
        }
        $(this).siblings("#xgnum").text(increase);
        updata(this, increase);


    })
    $(".rsCartTable").on("click", ".dec", function () {
        let decrease = $(this).siblings("#xgnum").text() * 1;
        decrease = decrease - 1;
        if (decrease <= 1) {
            decrease = 1;
        }
        $(this).siblings("#xgnum").text(decrease - 1);
        updata(this, decrease);
    });

    function updata(ele, count) {
        let goods_id = $(ele).parents(".rsCartItem").children(".info01").find("img").data("goods-id");
        $.ajax({
            type: "get",
            url: "../../../server/cart.php",
            data: `type=update&user_id=${user_id}&goods_id=${goods_id}&count=${count}`,
            dataType: "json",
            success: function (response) {
                $(ele).siblings("#xgnum").text(count);
                getCartGoodsNumber();
                computedTotalPrice();
            }
        });

    }





    /* 获取cookie中的user_id值 */
    function getItem(key) {
        let str = document.cookie;
        let o = {};
        let arr = str.split("; ");
        arr.forEach(ele => {
            let data = ele.split("=");
            let key = data[0];
            let val = data[1];
            o[key] = val;
        });
        return o[key];
    };

    /* 实现购物车中的 删除 功能 */
    $(".rsCartTable").on("click", ".del", function () {
        let goods_id = $(this).parents(".rsCartItem").children(".info01").find("img").data("goods-id");
        $.ajax({
            type: "get",
            url: "../../../server/cart.php",
            data: `type=delete&user_id=${user_id}&goods_id=${goods_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    getCartData();
                    getCartGoodsNumber();
                    computedTotalPrice();
                    sum();
                }
            }
        });
    });


    /* 封装提供一个函数(计算总价格) */
    function computedTotalPrice() {
        let totalPrice = 0;
        $(".rsCartTable").find(".rsCartItem").each(function () {
            let price = $(this).children(".info02").find("#xgnum").text() * 1;
            let number = $(this).find(".info03").text().slice(1) * 1;
            totalPrice += price * number;
        })
        $("#priAll span").text(totalPrice.toFixed(2));
        
    };

})