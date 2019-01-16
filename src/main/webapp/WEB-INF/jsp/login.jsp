<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <link rel="stylesheet" href="/css/login.css">

    <%--<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css">--%>
    <script type="text/javascript" src="../../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../../js/md5.js"></script>
    <script>
//        window.onload：在页面所有资源加载完后执行，如果有多个定义则只执行最后一个
//          $(function(){})：在Dom节点创建完成后执行，如果有多个定义则依次执行
        var cookies = document.cookie.split(';')
        function getCK(mkey) {
            for(var i=0;i<cookies.length;i++){
                var kv = cookies[i].split('=');
                if(kv[0].trim() == mkey){
                    return kv[1].trim();
                }
            }
            return '';
        }
        var strStudNo = null;
        var strPassword = null;
        var strRemember = null;
        window.onload = function () {
            strStudNo = getCK("studNo");
            strPassword = getCK("password");
            strRemember = getCK("remember");
            if(strRemember == 'true'){
//                var studNo = $('input[name=studNo]').val(strStudNo);
//                var strPassword = $('input[name=password]').val(strPassword);
                $("#studNo").val(strStudNo);
                $("#pwd").val(strPassword);
            }
        }
        $(document).on('click','.btn_zhuce',function(){
            var studNo = document.getElementById("studNo").value;
            var pwd = document.getElementById("pwd").value;
            if(studNo == "" || studNo == null){
                alert("学号不能为空");
                return false;
            }
            if(pwd == "" || pwd == null){
                alert("密码不能为空");
                return false;
            }
            var hash=hex_md5(document.getElementById("pwd").value);

            var studNo = $('input[name=studNo]').val();
            var password = hash;
//            var remember = $("#rem").val();
            var remember = document.getElementById("rem").checked
            var option = null;
            if(strRemember != 'true'){
                option = {
                    studNo:studNo,
                    password:password,
                    remember:remember,
                }
            }else {
                option = {
                    studNo:strStudNo,
                    password:strPassword,
                    remember:strRemember,
                }
            }

            $.ajax({
                url:"/login/loginIn",
                type:"post",
                dataType:"json",
                data:option,
                success:function(data){
                   if(data.success){
//                       window.location.href='http://localhost:8080/login/loginInForward';
                       window.location='/login/loginInForward'
//                       window.location.href='http://www.chengxinjianzhi.xyz/chengxinjianzhi/login/loginInForward';
                   }else {
                       var item = data.exceptionMsg;
                       alert(item);
                   }
                },
                error:function(data){
                    //服务器出错之后的处理逻辑。
                }
            });
        })
    </script>
</head>
<body class="login_bj">
<div class="zhuce_body">
	<!--<div class="logo"><a href="#"><img src="images/logo.png" width="114" height="54" border="0"></a></div>-->
    <div class="zhuce_kong login_kuang">
    	<div class="zc">
        	<div class="bj_bai">
            <h3>登录</h3>
                <!--href是a元素的链接,action是form表单的地址,javascript：void(0);()-->
       	  	  <form id= "form" action="loginIn" method="post" onsubmit="return submitFun(this);"><!--onsubmit 事件会在表单中的确认按钮被点击时发生-->
                <input id = "studNo"name="studNo" type="text" class="kuang_txt" placeholder="学号">
                <input name="password1" type="password" id = "pwd" class="kuang_txt" placeholder="密码">
                  <input type="hidden" name="password" id="password"/>
                <div>
               		<a href="/login/toModifyPwd">忘记密码？</a>
                    <%--<input name="remember" type="checkbox" value="" checked><span>记住我</span>--%>
                    <input id = "rem" name="remember" type="checkbox" value="true" checked><span>记住我</span>
                </div>
                  <input name="登录" type="button" class="btn_zhuce" value="登录">
                </form>
            </div>
        	<div class="bj_right">
            	<p>使用以下账号直接登录</p>
                <a href="#" class="zhuce_qq">QQ注册</a>
                <a href="#" class="zhuce_wb">微博注册</a>
                <a href="#" class="zhuce_wx">微信注册</a>
                <p>没有账号？<a href="/login/toRegister">帐号注册</a></p>
            </div>
        </div>
        <P>chengxinjianzhi.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您迈向成功第一步!!!</P>
    </div>

</div>
<script>
//    当输入框获得焦点时,发生 focus 事件
    $('#studNo').focus(function () {
        $("#studNo").val("");
        $("#pwd").val("");
        $("#rem").val("");
        strRemember = false;
    })
    $('#pwd').focus(function () {
        $("#pwd").val("");
        $("#rem").val("");
        strRemember = false;
    })
</script>
</body>
</html>