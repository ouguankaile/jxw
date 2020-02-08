$(() => {
    let user_id = getItem("user_id");
    /* 详情页 */
    let url = decodeURI(location.search);
    url = url.slice(1);
    let dataArr = url.split("&");
    let o = {};
    for (let i = 0, len = dataArr.length; i < len; i++) {
        let d = dataArr[i].split("=");
        o[d[0]] = d[1];
    }
    let pic = `<img src='${o.img}' alt=''>`;
    `<div class="opacity-top"></div>`;
    let min_box = `<img src='${o.img}' alt=''>
    <div class="mask"></div>
    <div class="opacity-top"></div>`;
    $(".dIntro .show-pic").append(min_box);
    $(".dIntro .max-img").append(pic);
    $(".dIntro .show-list .show-list-con ul li a").eq(0).html(pic);
    $(".dIntro .introInfo .comName h1").text(`${o.title.slice(0,30)}`);
    $(".dIntro .introInfo .comName").attr("data-goods-id", o.goods_id);
    $(".dIntro .introInfo .priceBox .infoPri strong").text(`${o.price}`);
    $(".dIntro .introInfo .salesScoreGold .comSales em").text(`${o.judge}`);

    /* 放大镜的实现 */
    let min_img = document.querySelector(".dIntro .show-pic");
    let min = document.querySelector(".dIntro .show-pic img");
    let min_mask = document.querySelector(".dIntro .show-pic .mask");
    let max_mask = document.querySelector(".dIntro .introShow .max-img");
    let max_img = document.querySelector(".dIntro .introShow .max-img img");
    min_img.onmouseenter = function () {
        min_mask.style.display = "block";
        max_mask.style.display = "block";
    };
    min_img.onmouseleave = function () {
        min_mask.style.display = "none";
        max_mask.style.display = "none";
    };
    min_img.onmousemove = function (e) {
        let y = e.offsetY - min_mask.offsetHeight / 2;
        let x = e.offsetX - min_mask.offsetWidth / 2;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        let maxX = min_img.offsetWidth - min_mask.offsetWidth;
        let maxY = min_img.offsetHeight - min_mask.offsetHeight;
        if (x > maxX) {
            x = maxX;
        }
        if (y > maxY) {
            y = maxY;
        }
        min_mask.style.top = y + "px";
        min_mask.style.left = x + "px";
        /* 计算比例 */
        let proportionX = (max_img.offsetWidth - max_mask.offsetWidth) / maxX;
        let proportionY = (max_img.offsetHeight - max_mask.offsetHeight) / maxX;
        /* 大图片的移动 */
        max_img.style.left = -x * proportionX + "px";
        max_img.style.top = -y * proportionY + "px";
    }

    /* 放大镜获取所有的图片列表 */
    $(".dIntro .introShow .show-list .show-list-con ul").find("li").each(function (index, item) {
        $(item).mouseenter(function () {
            $(this).addClass("on").siblings().removeClass("on");
            max_img.src = $(this).find("img").get(0).src;
            min.src = $(this).find("img").get(0).src;
        })
    });




    /* 页面中放大镜右侧加入购物车 */
    /* 购物车前面的加减及数量的处理 */
    function minAndMax(element) {
        $(element).change(function () {
            if ($(this).val() >= 99) {
                $(this).val("99");
            } else if ($(this).val() <= 1) {
                $(this).val("1");
            }
        })
    }
    minAndMax(".buyNum input");

    $(".buyNum-add").on("click", function () {
        let increase = $(this).siblings("input").val() * 1;
        increase += 1;
        if (increase >= 99) {
            increase = 99;
        }
        $(this).siblings("input").val(increase);
    })
    $(".buyNum-reduce").on("click", function () {
        let decrease = $(this).siblings("input").val() * 1;
        decrease -= 1;
        if (decrease <= 1) {
            decrease = 1;
        }
        $(this).siblings("input").val(decrease);
    })

    /* 点击加入购物车检查登录状态 */
    $(".buyBtn-cart").on("click", function () {
        if (!user_name || !user_id) {
            alert("请先登录！");
            window.location.href = "./05_login.html";
        } else {
            let goods_id = $(this).parents(".introInfo").children(".comName").data("goods-id");
            let num = $(this).parents(".bayBtnBox").prev().find("input").val();
            $.ajax({
                type: "get",
                url: "../../../server/cart.php",
                data: `type=add&goods_id=${goods_id}&user_id=${user_id}&num=${num}`,
                dataType: "json",
                success: function (response) {
                    if (response.status == "success") {
                        alert("已加入购物车！");
                        getCartGoodsNumber();
                        getCartData();
                    }
                }
            });
        }

    })


    /* 右侧购物车 */

    /* 购物车中渲染 */

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

    /* 右侧列表点击事件 */
    $(".rSidebarItem.cart").click(function () {
        $(".rsCartBox").toggle(500);
        if ($(this).children("a").hasClass("onn")) {
            $(this).children("a").removeClass("onn");
        } else {
            $(this).children("a").addClass("onn").removeClass("on");
        }
    });

    /* 点击右上角大×收起购物车 */
    $(".rsCartClose").click(function () {
        $(".rsCartBox").hide(500);
    })
    /* 当鼠标移出购物车，点击窗口时收起购物车 */
    $(document).click(function (e) {
        let cartBox = $(".rightSidebarBox").get(0);
        target = e.target || e.srcElement;
        if ($(".rightSidebarBox").find($(target)).length != 1 &&
            cartBox != target) {
            $(".rsCartBox").hide(500).siblings(".cart").children("a").removeClass("onn");
        }
    });

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
        $("#priAll span").text(totalPrice);
    };






})