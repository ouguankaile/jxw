/* 企业注册 */
$(() => {
    $("#firmAccount").val("ouguankaile");
    $("#firmEmail").val("1475419108@qq.com");
    $("#firmPassword").val("qwe123456789");
    $("#refirmPassword").val("qwe123456789");
    $("#firmUserName").val("哈哈哈");
    $("#firmUserPhone").val("18502077921");
    $("#firmUserTel").val("0431-86873363");
    $("#firmCompanyName").val("043186873363");
    $("#firmCompanyName").val("千千公司");
    $("#firmDetailAdd").val("广州市天河区");
    $("#firmCodes").val("8888");

    /* 方法A 通过that引入$this */
    // function checkInput(rule,that){
    //     let val = $.trim(that.val())
    //     console.log(val);
    //     if(rule.test(val)){
    //         that.siblings(".errorFontTip").css("display","none");
    //         that.parents(".firmBox").removeClass("borderReds");   
    //     }else{
    //         that.siblings(".errorFontTip").css("display","block");
    //         that.parents(".firmBox").addClass("borderReds");
    //     }  
    // }
    // let nameCheck = /[\u4e00-\u9fa5a-zA-Z0-9\-]{4,20}/;
    // console.log(nameCheck);

    //* 验证用户名 */
    // $("#firmAccount").blur(function () { 
    //     let that =$(this);
    //     checkInput(nameCheck,that);
    // });
    function checkInput(rule) {
        let val = $.trim($(this).val())
        // console.log(val);
        if (rule.test(val)) {
            $(this).siblings(".errorFontTip").css("display", "none");
            $(this).siblings(".icon-regFalse").css("display", "none");
            $(this).parents(".firmBox").removeClass("borderReds");
        } else {
            $(this).siblings(".errorFontTip").css("display", "block");
            $(this).siblings(".icon-regFalse").css("display", "block");
            $(this).parents(".firmBox").addClass("borderReds");
        }
    }
    //* 验证用户名 */
    $("#firmAccount").blur(function () {
        (checkInput.bind(this))(/[\u4e00-\u9fa5a-zA-Z0-9\-]{4,20}/);
    });
    /* 最土方法C */
    //* 验证用户名 */
    // $("#firmAccount").blur(function () { 
    //     let val = $.trim($(this).val())
    //     console.log(val);
    //     if(/[\u4e00-\u9fa5a-zA-Z0-9\-]{4,20}/.test(val)){
    //         $(this).siblings(".errorFontTip").css("display","none");
    //         $(this).parents(".firmBox").removeClass("borderReds");   
    //     }else{
    //         $(this).siblings(".errorFontTip").css("display","block");
    //         $(this).parents(".firmBox").addClass("borderReds");
    //     }  
    // });
    /* 验证邮箱 */
    $("#firmEmail").blur(function () {
        (checkInput.bind(this))(/\w+@\w+.com/);
    });
    /* 设置密码 */
    $("#firmPassword").blur(function () {
        (checkInput.bind(this))(/^[a-zA-Z0-9]{8,20}$/);
    });
    $("#refirmPassword").blur(function () {
        if ($.trim($(this).val()) == $.trim($("#firmPassword").val())) {
            $(this).siblings(".errorFontTip").css("display", "none");
            $(this).siblings(".icon-regFalse").css("display", "none");
            $(this).parents(".firmBox").removeClass("borderReds");
        } else {
            $(this).siblings(".errorFontTip").css("display", "block");
            $(this).parents(".firmBox").addClass("borderReds");
            $(this).siblings(".icon-regFalse").css("display", "block");
        }
    });
    $("#firmUserName").blur(function () {
        (checkInput.bind(this))(/^[\u4e00-\u9fa5]{2,20}$/);
    });
    $("#firmUserPhone").blur(function () {
        (checkInput.bind(this))(/^1[3-9]\d{9}$/);
    });
    $("#firmUserTel").blur(function () {
        (checkInput.bind(this))(/^(\d{3,4}-)?\d{6,8}(-\d{3,6})?$/);
    });
    $("#firmCompanyName").blur(function () {
        (checkInput.bind(this))(/^[\u4e00-\u9fa5]{2,30}$/);
    });
    $("#firmDetailAdd").blur(function () {
        (checkInput.bind(this))(/^[\u4e00-\u9fa5a-zA-Z0-9\-]{4,20}$/);
    });
    $("#firmCodes").blur(function () {
        (checkInput.bind(this))(/^\d{4}$/);
    });
    /* 地址三级联动 */
    $("#distpicker").distpicker({
        autoSelect: false
      });
    // $("#distpicker").distpicker({
    //     autoSelect: false
    //   });

    /* 随机验证码 */
    let imgCodeTarget;
    let captcha1 = new Captcha();
    captcha1.draw(document.querySelector('#_captchaImage'), r => {
        imgCodeTarget = r;
        console.log(r, '验证码1');
    });
    $("#firmCodes").blur(function () {
        if ($.trim($(this).val()) == imgCodeTarget) {
            $(this).siblings(".errorFontTip").css("display", "none");
            $(this).parents(".firmBox").removeClass("borderReds");
        } else {
            $(this).siblings(".errorFontTip").css("display", "block");
            $(this).parents(".firmBox").addClass("borderReds");
            $(this).siblings(".icon-regFalse").css("display", "block");
        }
    });
    /* 注册 */
    $(".nowSubmit").click(function(){
        $("#firmAccount,#firmEmail,#firmPassword,#firmUserName,#firmUserPhone,#firmUserTel,#firmCompanyName,#firmDetailAdd,#firmCodes").trigger("blur");
        if(!$(".regAgrInput").is(":checked")){
            alert("请阅读并同意用户协议！");
            return;
        }
        if($(".firmBox").hasClass("borderReds")){
            return;
        }
        // if($(".errorFontTip").display == "block"){
        //     return;
        // }

        if($(".province").val() == ""&& $(".city").val() ==""){
            alert("请选择公司所在地");
            return;
        }
        /* 发送请求 */
        let data = {
            account: $.trim($("#firmAccount").val()),
            email: $.trim($("#firmEmail").val()),
            password: md5($.trim($("#firmPassword").val())).substr(0, 10),
            username: $.trim($("#firmUserName").val()),
            phone: $.trim($("#firmUserPhone").val()),
            tel: $.trim($("#firmUserTel").val()),
            companyName: $.trim($("#firmCompanyName").val()),
            distpicker: $.trim($(".province").val())+$.trim($(".city").val())+$.trim($(".slast").val()),
            detailAdd: $.trim($("#firmDetailAdd").val())
        };
        console.log(data);
        // $.ajax({
        //     type: "get",
        //     url: "../../../server/register.php",
        //     data,
        //     dataType: "json",
        //     success: function (response) {
        //         console.log(response);
                
        //     }
        // });
        $.ajax({
            type: "get",
            url: "../../../server/register.php",
            data,
            dataType: "json",
            success: function (response) {
                console.log(response);
                
                if(response.status =="success"){
                    alert(response.msg);
                    window.location.href = "./05_login.html";
                }
                else{
                    alert(response.msg);
                }
            }
        });

    })
})