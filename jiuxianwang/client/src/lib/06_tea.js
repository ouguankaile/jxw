$(() => {
    //   /* 当页面加载完毕时检查用户当前状态 */   
    //   let user_name = Cookie.getItem("user_name");   
    //   let user_id = Cookie.getItem("user_id");
    //   if(user_name && user_id){
    //       $(".headerLogin").text( "您好," + user_name);
    //   }

    //  /*  注销功能 */
    //  $(".headerExit").click(function(){
    //      Cookie.removeItem("user_name");
    //      Cookie.removeItem("user_id");
    //      window.location.reload();
    //  })

    /* 列表分页、跳转 */
    let type = "default";
    $.ajax({
        type: "get",
        url: "../../../server/06_tea_getPage.php",
        // data: "data",
        dataType: "json",
        success: function (response) {
            let count = response.count;
            let html = "";
            for (let i = 0; i < count; i++) {
                html += `<a href="#">${i+1}</a>`
            }
            $("#page").html(html);
            getDataWithPage(1, type)
        }
    });



    // 页面点击事件
    $("#page").on("click", "a", function () {
        let index = $(this).index();
        getDataWithPage(index + 1, type)
        // console.log(index);
    })

    /* 排序功能 */
    $(".btn-class").on("click", "span", function () {
        // console.log($(this).data("type"));
        type = $(this).data("type");
        getDataWithPage(1, type);
    })


    function getDataWithPage(index, type) {
        $.ajax({
            type: "get",
            url: "../../../server/06_tea.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (response) {
                renderUI(response, index)
                // console.log(response); 
            }
        });
    }

    /* <a href="javascript:;"><img src=${item.src} alt=""></a> */
    function renderUI(data, index) {
        let list = data.map((item) => {
            return `<li class="item" data-goods-id=${item.id}>
        <div class="frame"></div>
        <div class="content clearfix">
            <a href="./07_detail.html?img=${item.src}&title=${item.proName}&price=${item.price}&judge=${item.judge}&goods_id=${item.id}" target="_parent" >
            <div class="collect_box">
                <img src=${item.src} alt="">
            </div>
            <div class="priceArea clearfix">￥${item.price}</div>
            <div class="proName">${item.proName}</div>
            </a>
            <div class="judgeAdv clearfix">已${item.judge}人评价</div>
            <div class="seller">${item.seller}</div> 
            <div class="cuxiao">${item.cuxiao}</div> 
            <div class="edit">
                       <a class="decrease" href="javascript:;">-</a>
                       <input type="text" value="1" id="InputNum${item.id}">
                       <a class="increase" href="javascript:;">+</a>
                   </div>
            <a class="cart" href="javascript:;"><span class="iconfont icon-cart"></span>加入购物车</a>
        </div>
        </li>`
        }).join("");
        let ul = ` <ul>${list}</ul>`;
        $(".proListSearch").html(ul);
        $("#page").children("a").eq(index - 1).addClass("active").siblings().removeClass("active");

        /* 跳转到详情页 */
        /* 方案A 通过A标签实现跳转 a标签跳转到新标签不能返回啊*/

        /* 方案B 通过点击事件window.location.href 实现，数据从当前的页面标签获取（有点麻烦） */
        /* 方案c 通过点击事件window.location.href 实现，数据库获取详细信息 */

    }

        /* 购物车前面的加减及数量的处理 */
        function minAndMax (element){
            $(element).on("change", "input",function () { 
                if($(this).val() >=99){
                    $(this).val("99");
                }
                else if($(this).val() <=1){
                    $(this).val("1");
                }
            })
        }
        minAndMax(".proListSearch");
        
        $(".proListSearch").on("click", ".increase", function () {
            let increase = $(this).siblings("input").val()*1;
            increase += 1; 
            $(this).siblings("input").val(increase);   
         })
         $(".proListSearch").on("click", ".decrease", function () {
             let decrease = $(this).siblings("input").val()*1;
             decrease -= 1; 
             if(decrease <=1){
                 decrease = 1; 
             }
            $(this).siblings("input").val(decrease);  
         })

    /* 点击加入购物车检查登录状态 */
    $(".proListSearch").on("click", ".cart", function () {
        
        if (!user_name || !user_id) {
            alert("请先登录！");
            window.location.href = "./05_login.html";
        } else {
            let goods_id = $(this).parents(".item").data("goods-id");
            let num = $(this).prev().children("input").val();           
            $.ajax({
                type: "get",
                url: "../../../server/cart.php",
                data: `type=add&goods_id=${goods_id}&user_id=${user_id}&num=${num}`,
                dataType: "json",
                success: function (response) {
                    if (response.status == "success") {
                        alert("已加入购物车！")
                    }
                }
            });
        }

    })

})