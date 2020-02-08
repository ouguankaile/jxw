$(() => {
    /* 标题 */
    $(".userLogin").on("click", function () {
        $(".loginUsual").css("display", "block").next().css("display", "none");
        $(this).addClass("on").siblings().removeClass("on");
    });
    $(".mobileLogin").on("click", function () {
        $(".loginMobile").css("display", "block").prev().css("display", "none");
        console.log(this);
        $(this).addClass("on").siblings().removeClass("on");
    });
    /* 表单焦点输入 */
    $(".filter").click(function () {
        $(this).find("p").eq(0).css("display", "none");
        $(this).next().focus();
    })
    $(".text").click(function () {
        $(this).prev().find("p").css("display", "none");
        $(this).focus();
    })
    $(".text").blur(function () {
        if ($.trim($(this).val()) == "") {
            $(this).prev().find("p").css("display", "block")
        }
    })
    // if ((Cookie.getItem("user_name") && Cookie.getItem("user_id") != "")) {
    //     $("#userName").val(Cookie.getItem("usm"));
    //     $("#userName").siblings(".filter").find("p").css("display","none");
    //     // $("#password").val(Cookie.getItem("pwd")).siblings(".filter").find("p").css("display","none");
      
   
    /* 验证 */
    // $("#userName").val("12345");
    // $("#password").val("123456789")

    function checkInput(rule) {
        if (rule) {
            $(this).siblings(".mistakeTip").css("display", "none");
            $(this).removeClass("on");
        } else {
            $(this).siblings(".mistakeTip").css("display", "block");
            $(this).addClass("on");
            return;
        }
    }
  
    /* 验证码 */
    let imgCodeTarget;
    let captcha1 = new Captcha();
    captcha1.draw(document.querySelector('#_captchaImage'), r => {
        imgCodeTarget = r;
        console.log(r, '验证码1');
    });

   

    /* 正常登录 */
    $(".save").click(function () {
            $("#userName").blur(function () {
                checkInput.bind(this)($.trim($(this).val()) != "");
            })
            $("#password").blur(function () {
                checkInput.bind(this)($.trim($(this).val()) != "");
            })
            $("#judge").blur(function () {
                checkInput.bind(this)($.trim($(this).val()) != "");
            });
            $("#userName,#password,#judge").trigger("blur");
            if($.trim($("#judge").val()) != imgCodeTarget){
                return;
            }
            let data = {
                username: $.trim($("#userName").val()),
                password: md5($.trim($("#password").val())).substr(0, 10)
            };
            $.ajax({
                type: "get",
                url: "../../../server/login.php",
                data,
                dataType: "json",
                success: function (response) {
                    if (response.status == "success") {
                        console.log(response);
                        alert("登陆成功!")
                        
                        /* 是否勾选记住密码 */
                        if ($("#auto").is(":checked")) {
                            Cookie.setItem("user_name", $.trim($("#userName").val()), 7);
                            Cookie.setItem("user_id", response.id, 7);
                            Cookie.setItem("pwd", md5($.trim($("#password").val())).substr(0, 10), 7);
                            window.location.href = "./01_index.html";
                        } else {
                            Cookie.setItem("user_name", $.trim($("#userName").val()));
                            Cookie.setItem("user_id", response.id);
                            // Cookie.setItem("pwd", md5($.trim($("#password").val())).substr(0, 10));
                            window.location.href = "./01_index.html";
                            // Cookie.removeItem("usm");
                            // Cookie.removeItem("pwd");
                            
                        }
                        window.location.href = "./01_index.html";
                    } else {
                        alert(response.msg);
                    }
                }
            });       
    });
})