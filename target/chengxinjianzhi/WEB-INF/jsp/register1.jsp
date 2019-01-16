<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <link type="text/css" rel="stylesheet" href="../../css/login.css">
    <script type="text/javascript" src="../../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../../js/md5.js"></script>
    <script>
        <!--md5密码加密-->
        function submitFun(){
            var hash=hex_md5(document.getElementById("pwd").value);
            document.getElementById("password").value=hash;
            return true;
        }
        <!--刷新验证码-->
        function myReload() {
            document.getElementById("CreateCheckCode").src = document
                    .getElementById("CreateCheckCode").src
                + "?nocache=" + new Date().getTime();
        }
//        function myReload() {
//            $.ajax({
//                url:"/chengxinjianzhi/login/showValidationCode",
//                type:"post",
//                dataType:"json",
//                async:true,
//                success:function (data) {
//                    debugger;
//                    document.getElementById("CreateCheckCode").src = data;
//                },
//            });
//        };
    </script>
</head>
<body class="login_bj">

<div class="zhuce_body">
    <!--<div class="logo"><a href="#"><img src="images/logo.png" width="114" height="54" border="0"></a></div>-->
    <div class="zhuce_kong">
        <div class="zc">
            <div class="bj_bai">
                <h3>欢迎注册</h3>
                <form action="/login/register" method="post" onsubmit="return submitFun(this);">
                    <input name="studNo" type="text" class="kuang_txt phone" placeholder="学号">
                    <input name="phoneNum" type="text" class="kuang_txt phone" placeholder="手机号">
                    <!--<input name="" type="text" class="kuang_txt email" placeholder="邮箱">-->
                    <input name="" type="text" class="kuang_txt possword" placeholder="密码">
                    <input name="password1" type="text" id ="pwd" class="kuang_txt possword" placeholder="重复输入密码">
                    <input type="hidden" name="password" id="password"/>
                    <!--<input name="" type="text" class="kuang_txt possword" placeholder="邀请码">-->
                    <input name="validationCode" type="text" class="kuang_txt yanzm" placeholder="验证码">
                    <div>
                        <div class="hui_kuang"><img src="/login/showValidationCode" id="CreateCheckCode" width="92" height="31"></div>
                        <a  href="javascript:void(0)" onclick="myReload()" > 看不清,换一个</a>
                    </div>
                    <div>
                        <input name="" type="checkbox" value=""><span>已阅读并同意<a href="#" target="_blank"><span
                            class="lan">《用户注册使用协议》</span></a></span>
                    </div>
                    <input name="注册" type="submit" class="btn_zhuce" value="注册">
                </form>
            </div>
            <div class="bj_right">
                <p>使用以下账号直接登录</p>
                <a href="#" class="zhuce_qq">QQ注册</a>
                <a href="#" class="zhuce_wb">微博注册</a>
                <a href="#" class="zhuce_wx">微信注册</a>
                <p>已有账号？<a href="/login/toIndex">立即登录</a></p>

            </div>
        </div>
        <P>chengxinjianzhi.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您迈向成功第一步!!!</P>
    </div>

</div>

<!--<div style="text-align:center;">-->
<!--<p>来源:<a href="http://www.mycodes.net/" target="_blank">源码之家</a></p>-->
<!--</div>-->

</body>
</html>