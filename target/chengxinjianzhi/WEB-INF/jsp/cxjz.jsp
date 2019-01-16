<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<script src="../../js/jquery-1.11.3.js"></script>
	<script src="../../js/jquery.pagination.js"></script>
    <script src="../../js/ajaxfileupload.js"></script>
	<link rel="stylesheet" href="../../css/pagination.css">
    <meta charset="UTF-8">
    <title>宜春兼职_宜春兼职招聘信息_宜春大学生找兼职网-诚信兼职</title>
    <meta name="description" content="诚信宜春兼职频道为您免费提供大量最新宜春兼职招聘信息,每天发布真实有效的宜春兼职招聘工作,找兼职工作请到诚信兼职。"/>
    <meta name="keywords" content="宜春兼职,宜春兼职招聘信息,宜春大学生兼职网"/>
    <script type="text/javascript" src="../../js/base-common.js"></script>
    <link rel="canonical" href="http://www.doumi.com/hz/"/>
    <script src="../js/index.js"></script>
    <link rel="stylesheet" href="../../html/global.__1478776853__.css">
      <link rel="stylesheet" href="../../css/common.css">

    <%--头像上传时候使用的js--%>
    <script>
        $(function() {
            //头像预览
            $("#cvs").click(function () {
                $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
                $("#upload").on("change",function(){
                    $.ajaxFileUpload({
                        url:"/login/uploadPic",
                        fileElementId: "upload", //文件上传域的ID，这里是input的ID，而不是img的
                        dataType: 'json', //返回值类型 一般设置为json
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        success: function (data,status) {
                                //去除返回的数据中有样式的问题
                                var obj = $.parseJSON(data.replace(/<.*?>/ig,""));
                                //将图片换成默认的+图片
//  另一种方法                $("#cvs").attr("src",window.location='/login/obtainHeadPic');
//                            window.location.reload();//重新刷新页面
                            $("#cvs").attr("src",'http://'+ obj.src);
                        },
                        error: function (data, status, e) {
                            alert(e);
                        }
                    });
                });
            });
        });
    </script>
</head>
<body class="jz-list">

<div class="header">
    <div class="w clearfix">
        <a class="jz-logo" href="index.htm" tppabs="http://www.doumi.com/" title="诚信兼职">诚信兼职</a>
        <a class="location" href="index-1.htm" tppabs="http://www.doumi.com/cityselect/">宜春</a>
        <ul class="nav" data="list">
            <li><a href="index.htm" tppabs="http://www.doumi.com/">首页</a></li>
            <li><a class="current">职位</a></li>
            <li><a href="index-3.htm" tppabs="http://www.doumi.com/tegong/">诚信特工</a></li>
        </ul>


        <div class="login-info">
            <%--http://61.164.53.62:9040/images/15371719075491.jpeg--%>
            <%--<img id="cvs" src="http://61.164.53.62:9040/images/15371719075491.jpeg"  width="50" height="50" style="padding: 1px">--%>
            <img id="cvs" src ="/login/obtainHeadPic"   width="50" height="50" style="padding: 1px">
            <input type="file" class="upload_pic" id="upload" name = "file" style="display: none"/>
            <%--<button id="submit_btn" class="btn upload" type="submit">确定修改</button>--%>
            <%--<a class="login-reg jz_lg" href="javascript:void(0);" rel="nofollow">注册登录</a>--%>
            <a href = "javascript:;" class = "jz_lgout">退出</a>
        </div>

    </div>
</div>

<div class="crumbs w">
    <a href="index.htm" tppabs="http://www.doumi.com/">诚信兼职</a>
    &gt;
    <span>宜春</span>
</div>
 <!-- 
<div class="mod-slide w" data-widget="js/util/slide/slide_widget.js#slideX" data-pointer-cur="active" data-timer="3000">
   
    <ul class="slide-content">
        <li class="slide-item">
            <a target="_blank" href=""
               tppabs="http://www.doumi.com/hanjiagong/?ca_name=dm&ca_source=pc&ca_from=sybanner&ca_campaign=hjg2016_dm_pc_sybanner&hmsr=dm&hmpl=pc&hmcu=sybanner&hmkw=hjg&hmci="><img
                    src="16,2ba5a7c2477ffe.jpg" tppabs="http://cdn.doumistatic.com/16,2ba5a7c2477ffe.jpg"
                    alt="斗米捞金季寒假工"></a>
        </li>
        <li class="slide-item">
            <a target="_blank" href=""
               tppabs="http://www.doumi.com/dbzw/?ca_name=dm&ca_source=pc&ca_from=lbybanner"><img
                    src="15,2b840391118efa.jpg" tppabs="http://cdn.doumistatic.com/15,2b840391118efa.jpg"
                    alt="企业担保"></a>
        </li>
        <li class="slide-item">
            <a target="_blank" href=""
               tppabs="http://www.doumi.com/pinpai/canyin/?ca_name=dm&ca_source=pc&ca_from=sybanner&ca_campaign=ppcy"><img
                    src="14,2d4a8563c79146.jpg" tppabs="http://cdn.doumistatic.com/14,2d4a8563c79146.jpg"
                    alt="斗米店小二pc职位专区"></a>
        </li>
    </ul>
    <div class="slide-index"></div>
    
</div>
 -->
<div class="filter w mt10">
    <div class="inner-wrap">
        <dl class="clearfix">
            <dt>职位：</dt>
            <dd>
                <ul class="filter-cate clearfix">
                    <li><a class="cur1" href="javascript:;">不限</a></li>
                    <li><a href="javascript:;">传单派发</a></li>
                    <li><a href="javascript:;">促销导购</a></li>
                    <li><a href="javascript:;">话务客服</a></li>
                    <li><a href="javascript:;">礼仪模特</a></li>
                    <li><a href="javascript:;"> 家教助教</a></li>
                    <li><a href="javascript:;">问卷调查</a></li>
                    <li><a href="javascript:;">审核录入</a></li>
                    <li><a href="javascript:;">地推拉访</a></li>
                    <li><a href="javascript:;">打包分拣</a></li>
                    <li><a href="javascript:;">展会协助</a></li>
                    <li><a href="javascript:;">充场</a></li>
                    <li><a href="javascript:;">实习生</a></li>
                    <li><a href="javascript:;">安保</a></li>
                    <li><a href="javascript:;">送餐员</a></li>
                    <li><a href="javascript:;">演出</a></li>
                    <li><a href="javascript:;">翻译</a></li>
                    <li><a href="javascript:;">校园代理</a></li>
                    <li><a href="javascript:;">技师技工</a></li>
                    <li><a href="javascript:;">美容美发</a></li>
                    <li><a href="javascript:;">餐饮工</a></li>
                    <li><a href="javascript:;">兼职司机</a></li>
                    <li><a href="javascript:;">义工</a></li>
                    <li><a href="javascript:;">其他</a></li>
                    <li><a href="index-3.htm">在线兼职</a></li>
                </ul>
            </dd>
        </dl>
        <dl class="clearfix">
            <dt>地区：</dt>
            <dd>
                <ul class="filter-cate clearfix">
                    <li><a class="cur1" href="index.html" tppabs="http://www.doumi.com/hz/">不限</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/gongshu/"></a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/xihu/">袁州区</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/shangcheng/">宜阳新区</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/xiacheng/">靖安</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/jianggan/">奉新</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/binjiang/">上高</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/xiaoshan/">宜丰</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/yuhang/">铜鼓</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/linan/">万载</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/fuyang/">樟树</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/tonglu/">丰城</a></li>
                    <li><a href="" tppabs="http://www.doumi.com/hz/jiande/">高安</a></li>
                </ul>
            </dd>
        </dl>
    </div>
</div>
<div class="filterBar w mt10">
    <div class="chkFilter">
        <label title="每日结算"><input type="checkbox" value="" name="" class="chk" url="/hz/p1/">每日结算</label>
        <label title="有提成"> <input type="checkbox" value="" name="" class="chk" url="/hz/t1/">有提成</label>
        <label title="诚信担保"><input type="checkbox" value="" name="" class="chk" url="/hz/d1/">诚信担保</label>
        <label title="会员有奖"><input type="checkbox" value="" name="" class="chk" url="/hz/r1/">会员有奖</label>
        <label title="企业担保"><input type="checkbox" value="" name="" class="chk" url="/hz/b1/">企业担保</label>
    </div>
    <div class="sortFilter">
        <a href="index.html" tppabs="http://www.doumi.com/hz/" class="cur">推荐排序</a>
        <a href="" tppabs="http://www.doumi.com/hz/s2/">最新发布</a>
        <a href="" tppabs="http://www.doumi.com/hz/s3/">工资最高</a>
    </div>
</div>
<!-- noList box start -->
<!-- noList box end -->
<!-- List start -->

<div class="jzList-con w">
<!--
    <div class="jzList-item clearfix">
        <div class="jzList-pic"><img src="/chengxinjianzhi/img/jianzhi.jpg"
                                     tppabs="http://cdn.doumistatic.com/19,2ceddb4575714d_100-100c_8-0.jpg">
        </div>
        <div class="jzList-txt">
            <div class="jzList-txt-t">
                <h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2379502.htm">网红一主播一新人可报名一快火</a></h3>
                <i class="db-min-ico"></i>
                <i class="word-ti-ico"></i>
                <div class="fl show-ico-tips-wrap">
                    <i class="word-jiang-ico"></i>
                    <input type="hidden"/>
                </div>
            </div>
            <ul class="jzList-field clearfix">
                <li><span>工作时间：</span> 长期招工</li>
                <li><span>兼职类型：</span>礼仪模特</li>
                <li><span>工作地点：</span>袁州区</li>
                <li><span>招聘人数：</span>500人</li>
            </ul>
        </div>

        <div class="jzList-btn">
            <a href="javascript:;" class="apply_jz_class" data="2379502" job_type="mote"
               dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"
               rel="nofollow">报名参加</a>
        </div>
        <div class="jzList-salary">
            <span class="money"><em>400</em>元/天</span>
            <span>完工结</span>
        </div>
    </div>
    <div class="jzList-item clearfix">
        <div class="jzList-pic"><img src="/chengxinjianzhi/img/jianzhi.jpg" tppabs="http://sta.doumistatic.com/src/image/logo_doumi.png">
        </div>
        <div class="jzList-txt">
            <div class="jzList-txt-t">
                <h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2373531.htm">96333电梯热线接听客服</a></h3>
                <i class="db-min-ico"></i>
                <div class="fl show-ico-tips-wrap">
                    <i class="word-jiang-ico"></i>
                    <input type="hidden"/>
                </div>
            </div>
            <ul class="jzList-field clearfix">
                <li><span>工作时间：</span> 12.22-01.22</li>
                <li><span>兼职类型：</span>话务客服</li>
                <li><span>工作地点：</span>袁州区</li>
                <li><span>招聘人数：</span>50人</li>
            </ul>
        </div>

        <div class="jzList-btn">
            <a href="javascript:;" class="apply_jz_class" data="2373531" job_type="kefu"
               dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"
               rel="nofollow">报名参加</a>
        </div>
        <div class="jzList-salary">
            <span class="money"><em>15</em>元/小时</span>
            <span>完工结</span>
        </div>
    </div>
    <div class="jzList-item clearfix">
        <div class="jzList-pic"><img src="/chengxinjianzhi/img/jianzhi.jpg" tppabs="http://sta.doumistatic.com/src/image/logo_doumi.png">
        </div>
        <div class="jzList-txt">
            <div class="jzList-txt-t">
                <h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2322186.htm">市区信息采集</a></h3>
                <i class="db-min-ico"></i>
                <div class="fl show-ico-tips-wrap">
                    <i class="word-jiang-ico"></i>
                    <input type="hidden"/>
                </div>
            </div>
            <ul class="jzList-field clearfix">
                <li><span>工作时间：</span> 12.11-12.31</li>
                <li><span>兼职类型：</span>其他</li>
                <li><span>工作地点：</span>袁州区</li>
                <li><span>招聘人数：</span>100人</li>
            </ul>
        </div>

        <div class="jzList-btn">
            <a href="javascript:;" class="apply_jz_class" data="2322186" job_type="jzqita"
               dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"
               rel="nofollow">报名参加</a>
        </div>
        <div class="jzList-salary">
            <span class="money"><em>80</em>元/天</span>
            <span>日结</span>
        </div>
    </div>
    <div class="jzList-item clearfix">
        <div class="jzList-pic"><img src="/chengxinjianzhi/img/jianzhi.jpg" tppabs="http://sta.doumistatic.com/src/image/logo_doumi.png">
        </div>
        <div class="jzList-txt">
            <div class="jzList-txt-t">
                <h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2351058.htm">各种APP下载注册日结</a></h3>
                <i class="db-min-ico"></i>
                <div class="fl show-ico-tips-wrap">
                    <i class="word-jiang-ico"></i>
                    <input type="hidden"/>
                </div>
            </div>
            <ul class="jzList-field clearfix">
                <li><span>工作时间：</span> 12.17-03.01</li>
                <li><span>兼职类型：</span>其他</li>
                <li><span>工作地点：</span>袁州区</li>
                <li><span>招聘人数：</span>1000人</li>
            </ul>
        </div>

        <div class="jzList-btn">
            <a href="javascript:;" class="apply_jz_class" data="2351058" job_type="jzqita"
               dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"
               rel="nofollow">报名参加</a>
        </div>
        <div class="jzList-salary">
            <span class="money"><em>100</em>元/天</span>
            <span>日结</span>
        </div>
    </div>
    <div class="jzList-item clearfix">
        <div class="jzList-pic"><img src="/chengxinjianzhi/img/jianzhi.jpg" tppabs="http://sta.doumistatic.com/src/image/logo_doumi.png">
        </div>
        <div class="jzList-txt">
            <div class="jzList-txt-t">
                <h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2388291.htm">电信客服</a></h3>
                <i class="db-min-ico"></i>
                <div class="fl show-ico-tips-wrap">
                    <i class="word-jiang-ico"></i>
                    <input type="hidden"/>
                </div>
            </div>
            <ul class="jzList-field clearfix">
                <li><span>工作时间：</span> 01.09-02.28</li>
                <li><span>兼职类型：</span>话务客服</li>
                <li><span>工作地点：</span>袁州区</li>
                <li><span>招聘人数：</span>30人</li>
            </ul>
        </div>

        <div class="jzList-btn">
            <a href="javascript:;" class="apply_jz_class" data="2388291" job_type="kefu"
               dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"
               rel="nofollow">报名参加</a>
        </div>
        <div class="jzList-salary">
            <span class="money"><em>18</em>元/小时</span>
            <span>完工结</span>
        </div>
    </div>
-->
</div>

<!-- List end -->
<div class="w">
 <div class="M-box" style="float:right"></div>
 
<!--
    <div class="pageBox" data-widget="app/ms_v2/common/list_page.js#pagination">
        <ul class="pageLink clearfix">
            <li><a class="c linkOn curPage"><span>1</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o2/"><span>2</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o3/"><span>3</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o4/"><span>4</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o5/"><span>5</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o6/"><span>6</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o7/"><span>7</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o8/"><span>8</span></a></li>
            <li><a href="" tppabs="http://www.doumi.com/hz/o2/" class="next"><span>下一页</span></a></li>
        </ul>
    </div>
-->
</div>



<!--  -->
<div class="footer-seo">
    <div class="w">
        <div class="item item_1">
            <h2>频道介绍</h2>
            <p>
                宜春招聘频道是诚信兼职专为宜春求职者精选打造的宜春兼职招聘信息网，每日免费为您提供大量最新的宜春真实可靠的兼职职位招聘信息，找兼职工作、发布兼职招聘信息就上诚信兼职网。真正真实、高效、靠谱的兼职平台，让您省心、放心、开心。
                诚信兼职不仅是学生兼职必备神器，也是所有兼职行业人士、企业招聘必不可少的靠谱兼职平台，用户使用量已稳居兼职平台之首。
            </p>
        </div>
    </div>
</div>
 
<div class="footer">
    <div class="content">
        <div class="w">
            <a class="logo" href="index.htm" tppabs="http://www.doumi.com/" title="诚信兼职">诚信兼职</a>
            <div class="qr-code">
                <span class="title">扫描关注微信号</span>
                <img src="/chengxinjianzhi/img/weixinhao.png" tppabs="http://sta.doumistatic.com/src/image/jianzhi/web/c/v2/qrcode_2.png"
                     alt="">
            </div>
            <div class="hotline">
                <span class="title">客服热线</span>
                <span class="phone">18146646080</span>
                <span class="title">合作邮箱</span>
                <span class="email">563476517@qq.com</span>
            </div>
            <ul class="nav">
                <li><a target="_blank" href="" tppabs="http://news.doumi.com/">诚信资讯</a></li>
                <li><a href="#" tppabs="http://www.doumi.com/payservice/">有偿服务</a></li>
            </ul>
        </div>
    </div>
</div>
   

<div style="display:none;" id="content_3">
    <!--以下所有显示操作：添加hide类表示隐藏该元素，去除hide类表示显示该元素-->
    <div class="login-pop c-pop w250" id="win_login">
        <!--密码登录与手机号登录按钮切换，切换至哪个按钮给此按钮添加active类-->
        <div class="login-header clearfix">
            <span class="fl" data-switch="0">密码登录</span>
            <span class="fl active" data-switch="1">手机号登录</span>
        </div>
        <!--start 密码登录-->
        <form action="#" class="login-pwd">
            <!--密码出错出现提示，去掉hide类即可显示-->
            <!-- <div class="error-area" id="login_error" style="display:none;"> -->
            <div class="error-area" id="login_error_pwd" style="display:none;">
                <!-- <span class="lg_error_msg"> -->
                <span class="lg_error_msg" id="lg_error_msg_pwd">
                    <i class="error-area-ico"></i>
                    使用密码登录
                </span>
            </div>
            <div class="reg-input">
                <i class="tel-ico"></i>
                <input type="text" name="lg_phone" id="lg_phone" maxlength="11" placeholder="请输入手机号">
            </div>
            <!-- <div class="reg-input mt20"> -->
            <div class="pwd-input">
                <i class="pwd-ico"></i>
                <input type="password" name="lg_pass" id="lg_password" placeholder="请输入登录密码">
            </div>

            <div class="reg-text">
                <label class="auto-login">
                    <!-- <input type="checkbox"> 下次自动登陆 -->
                </label>
                <a href="javascript:" class="fr" id="btn_forget">老用户设置密码/忘记密码</a>
            </div>
            <!--start 获取图片验证码-->
            <div class="code-input hide">
                <input type="text" class="send-codeInput" maxlength="4" placeholder="输入图片验证码" name="lg_verify"
                       id="lg_verify">
                <span class="send-img fr">
                    <img src="" name="lg_verify_img"/>
                </span>
            </div>
            <div class="reg-text pass-change-verifyCode hide">
                <a href="javascript:;" class="fr" id="lg_change_verify">看不清，换一个</a>
            </div>
            <!--end-->
            <!--登录按钮-->
            <div class="login-btn">
                <input type="submit" value="登录" class="btn btn-large" id="doLoginPassword">
            </div>
            <!--没有账号注册-->
            <div class="reg-text reg-go">
                还没有账号？<a href="javascript:;" id="btn_register">去注册</a>
            </div>
        </form>
        <!--end-->
        <!--start 手机号登录-->
        <form action="#" class="login-phone hide">
            <!--密码出错出现提示，去掉hide类即可显示-->
            <!-- <div class="error-area" id="login_error" style="display:none;"> -->
            <div class="error-area" id="login_error_phone" style="display:none;">
                <span class="lg_error_msg" id="lg_error_msg_phone">
                    <i class="error-area-ico"></i>
                    使用手机号码直接登录
                </span>
            </div>
            <div class="reg-input">
                <i class="tel-ico"></i>
                <input type="text" name="lg_phone2" id="lg_phone2" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="code-input">
                <input type="text" class="send-codeInput" placeholder="动态密码" name="lg_code" id="lg_code">
                <span class="fr get-dynamic-pass hide" data-btn="get_code_n"></span>
                <a href="javascript:" class="fr get-dynamic-pass" id="lg_get_code" data-btn="get_code_y">
                    获取动态密码
                </a>
            </div>
            <!--start 获取图片验证码-->
            <div class="code-input">
                <input type="text" class="send-codeInput" maxlength="4" placeholder="输入图片验证码" name="lg_verify2"
                       id="lg_verify2">
                <span class="send-img fr">
                    <img src="" name="lg_verify_img2"/>
                </span>
            </div>
            <div class="reg-text pass-change-verifyCode hide">
                <a href="javascript:;" class="fr" id="lg_change_verify2">看不清，换一个</a>
            </div>
            <!--end-->
            <div class="login-btn">
                <input type="submit" value="登录" class="btn btn-large" id="doLogin">
            </div>
        </form>
        <!--end-->
    </div>
    <!--end-->
    <!--start 注册-->
    <div class="login-pop c-pop w250 hide" id="win_register">
        <form>
            <div class="error-area" id="login_error" style="display:none;">
                <span class="lg_error_msg">
                    <i class="error-area-ico"></i>
                    使用手机号注册
                </span>
            </div>
            <div class="reg-input">
                <i class="tel-ico"></i>
                <input type="text" name="re_phone" id="re_phone" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="pwd-input">
                <i class="pwd-ico"></i>
                <input type="password" name="re_pass" id="re_password" placeholder="请输入密码">
            </div>
            <div class="code-input">
                <input type="text" class="send-codeInput" placeholder="动态密码" name="re_code" id="re_code">
                <span class="fr get-dynamic-pass hide" data-btn="get_code_n"></span>
                <a href="javascript:" class="fr get-dynamic-pass" id="re_get_code" data-btn="get_code_y">获取动态密码</a>
            </div>

            <!--start 获取图片验证码, 分别给外层div增加hide类可隐藏 -->
            <div class="code-input">
                <input type="text" class="send-codeInput" maxlength="4" placeholder="输入图片验证码" name="re_verify"
                       id="re_verify">
                <!-- <span class="fr"> -->
                <span class="send-img fr">
                    <img src="" name="re_verify_img"/>
                </span>
            </div>
            <div class="reg-text pass-change-verifyCode hide">
                <a href="javascript:;" class="fr" id="re_change_verify">看不清，换一个</a>
            </div>
            <!--end-->
            <div class="login-btn">
                <input type="submit" value="注册" class="btn btn-large" id="doRegister">
            </div>
            <!--注册协议-->
            <div class="reg-text reg-go fc-gray">
                注册表示同意<a href="" tppabs="http://www.doumi.com/agreement/" target="_blank">《斗米兼职协议》</a>
            </div>
            <!--已账号去登录-->
            <div class="reg-text reg-go">
                已有诚信帐号？<a href="javascript:" id="btn_login">去登录</a>
            </div>
        </form>
    </div>
    <!--end-->
    <!--start 忘记密码-->
    <div class="login-pop c-pop w250 hide" id="win_forget">
        <!-- <form> -->
        <form class="forgot-pwd">
            <div class="error-area" id="login_error1" style="display:none;">
                    <span class="lg_error_msg">
                        <i class="error-area-ico"></i>
                        使用手机号找回密码
                    </span>
            </div>
            <div class="reg-input">
                <i class="tel-ico"></i>
                <input type="text" name="fg_phone" id="fg_phone" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="pwd-input">
                <i class="pwd-ico"></i>
                <input type="password" name="fg_pass" id="fg_password" placeholder="请输入新密码">
            </div>
            <div class="code-input">
                <input type="text" class="send-codeInput" placeholder="动态密码" name="fg_code" id="fg_code">
                <span class="fr get-dynamic-pass hide" data-btn="get_code_n"></span>
                <a href="javascript:" class="fr get-dynamic-pass" id="fg_get_code" data-btn="get_code_y">
                    获取动态密码</a>
            </div>
            <!--start 获取图片验证码, 分别给外层div增加hide类可隐藏 -->
            <div class="code-input hide">
                <input type="text" class="send-codeInput" maxlength="4" placeholder="输入图片验证码" name="fg_verify"
                       id="fg_verify">
                <span class="send-img fr">
                    <img src="" name="fg_verify_img"/>
                </span>
            </div>
            <div class="reg-text pass-change-verifyCode hide">
                <a href="javascript:;" class="fr" id="fg_change_verify">看不清，换一个</a>
            </div>
            <!--end-->
            <div class="login-btn">
                <input type="submit" value="重置密码" class="btn btn-large" id="doForget">
            </div>
        </form>
    </div>
    <!--end-->
    <!--登录成功-->
    <div class="c-pop w250 win_success hide" id="win_success">
        <div class="c-pop-txt success success_tag">成功</div>
        <div class="c-pop-btn">
            <button class="btn" id="btn_success" type="button">确认</button>
        </div>
    </div>
    <!-- download app start -->
    <div class="c-pop win_download w250 hide" id="win_download">
        <div class="c-pop-img"><img src="qrcode_doumi_app.png"
                                    tppabs="http://sta.doumistatic.com/src/image/qrcode_doumi_app.png" alt=""
                                    id="win_download_img"></div>
        <div class="c-pop-txt fc-gray">
            <p>下载斗米兼职APP，</p>
            <p>点击菜单“我的”-“我的简历”中查看</p>
        </div>
        <div class="c-pop-btn">
            <button class="btn btn_download" type="button">我知道了</button>
        </div>
    </div>
    <!-- download app end -->
</div>
<!--footer !-->

<!-- entry-form start -->
<div id="apply_content" name="apply_content" style="display:none">
   <div class="js-modal js-show entry-form" style="width: 740px; margin-left: -370px;margin-top:-550px">                <div class="js-modal-head">                   
                    
    </div>                
    <div class="js-modal-content noScroll" style="height: 598px;">
        <div class="jz-warning-tips">
            <p class="fc-f60 cityNotEqual" style="display:none"><i class="warning-tips-ico"></i>本职位只在<span></span>招聘，请确认后再报名</p>
            <p data-value="no-fee-tips">温馨提示：正规兼职不会收取费用，若收费请提高警惕！</p>
        </div>
        <form name="" method="" action="">
           
            <div class="apply_win_content" style="">
                <div class="jz-info">
                    <div class="jz-t">
                        <h2>填写资料并验证手机，可更快上岗并确保工资到账</h2>
                    </div>
                    <div class="jz-info-con">
                        <div class="apply_win_restrict_name_sex" style="">
                            <div class="item clearfix">
                                <label class="title">姓名性别</label>
                                <input type="text" placeholder="请填写真实姓名" value="" name="realname" class="jz-txt fl mr-10 w130 checkInput">
                                <label class="fl mr-20"><input type="radio" name="gender" checked class="jz-radio checkInput" value="1" data-type="男">男</label>
                                <label class="fl"><input type="radio" name="gender" class="jz-radio checkInput" value="2" data-type="女">女</label>
                                <span class="validatorError" name="nameError" style="display:none"></span>
                                <span class="validatorError" name="genderError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="apply_win_restrict_age_identity" style="">
                            <div class="item clearfix">
                                 <label class="title">年龄身份</label>
                                <input type="text" placeholder="请填写真实年龄" value="" name="realage" class="jz-txt fl mr-10 w130 checkInput">
                            
                                <span class="validatorError" name="nameError" style="display:none"></span>
                                <span class="validatorError" name="genderError" style="display:none"></span>
                                 </div>
                        </div>
                        <div class="apply_win_restrict_height_weight" style="display:none">
                            <div class="item clearfix">
                                <label class="title">
                                    <span class="apply_win_restrict_height" style="display:none">身高</span><span class="apply_win_restrict_weight" style="display:none">体重</span>
                                </label>
                                <span class="fl mr-10 apply_win_restrict_height" style="display:none"><input type="" name="height" class="jz-txt w32 mr-5 checkInput" maxlength="3">厘米</span>
                                <span class="fl apply_win_restrict_weight" style="display:none"><input type="" name="weight" class="jz-txt w32 mr-5 checkInput" maxlength="3">公斤</span>
                                <span class="validatorError" name="heightError" style="display:none"></span>
                                <span class="validatorError" name="weightError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="apply_win_restrict_work_ex" style="display:none">
                            <div class="item clearfix">
                                <label class="title">工作经验</label>
                                <div class="jz-select fl">
                                    <div class="current">
                                        <input type="text" placeholder="请选择工作经验" readonly="readonly" name="jobEx" class="jz-sel-txt w272 checkInput">
                                        <i class="jz-sel-arrow"></i>
                                    </div>
                                    <div style="display: none;" class="jz-sel-option">
                                        <ul>
                                            <li><label><input type="checkbox" name="" class="jz-checkbox">发单</label></li>
                                        </ul>
                                    </div>
                                </div>
                                <span class="validatorError" name="demandError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="apply_win_restrict_addr" style="display:none">
                            <div class="item clearfix">
                                <label class="title">居住地址</label>
                                <div class="form-select-wrap fl mr-10">
                                    <select style="color:#aaa" class="w150 district-option checkInput" name="district">
                                        <option value="0" name="districtDefined" disabled="disabled" selected="selected">区域</option>
                                                                                <option value="2061">拱墅</option>
                                                                                <option value="2062">西湖</option>
                                                                                <option value="2063">上城</option>
                                                                                <option value="2064">下城</option>
                                                                                <option value="2065">江干</option>
                                                                                <option value="2066">滨江</option>
                                                                                <option value="2068">萧山</option>
                                                                                <option value="2067">余杭</option>
                                                                                <option value="2071">临安</option>
                                                                                <option value="2070">富阳</option>
                                                                                <option value="2072">桐庐</option>
                                                                                <option value="2069">建德</option>
                                                                                <option value="2073">淳安</option>
                                                                            </select>
                                </div>
                                <div class="form-select-wrap fl">
                                    <select style="color:#aaa" class="w150 street-option checkInput" name="street"><option value="0" name="streetDefined">商圈</option></select>
                                </div>
                                <span class="validatorError" name="addrError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="apply_win_restrict_entry_date" style="display:none">
                            <div class="item clearfix">
                                <label class="title">上岗时间</label>
                                <div class="jz-date fl">
                                    <input type="text" placeholder="请选择日期" value="" name="entryDate" class="jz-txt w130 job_entry_date checkInput hasDatepicker" id="job_entry_date">
                                    <i class="jz-date-ico"></i>
                                </div>
                                <span class="validatorError" name="entryDateError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="apply_win_restrict_healthcert" style="display:none">
                            <div class="item clearfix">
                                <label class="title">健康证</label>
                                <label class="fl mr-20"><input type="radio" name="health" class="jz-radio checkInput" value="1">有</label>
                                <label class="fl"><input type="radio" name="health" class="jz-radio checkInput" value="0">无</label>
                                <span class="validatorError" name="healthError" style="display:none"></span>
                            </div>
                        </div>
                        <div class="win_apply_login" style="">
                            <div class="item clearfix">
                                <label class="title">手机号码</label>
                                <input type="" placeholder="请输入11位手机号" value="" name="apply_phone" class="jz-txt w130 fl checkInput" maxlength="11">
                                <span class="phoneError validatorError" name="phoneError" style="display:none"></span>
                            </div>
                            <div class="item clearfix">
                                <label class="title">学号</label>
                                <input type="" placeholder="请输入真实学号" value="" name="apply_code" class="jz-txt w130 fl mr-10 checkInput" maxlength="6">
                                <a class="btn_gray fl get-dynamic-pass hide" data-btn="get_code_n"></a>
                                <span class="codeError validatorError" name="codeError" style="display:none"></span>
                            </div>
                            <div class="item clearfix" name="win_apply_img_code" style="display:none">
                                <label class="title">图片验证码</label>
                                <input type="" placeholder="输入图片验证码" value="" name="apply_qcode" class="jz-txt w130 fl mr-10" maxlength="4">
                                <img src="" class="verification-code fl">
                                <a href="javascript:;" class="btn_refresh" id="refresh_code">看不清，换一个</a>
                                <span class="qcodeError validatorError" name="qcodeError" style="display:none"></span>
                            </div>
                            <div class="item clearfix" name="win_apply_img_code" style="display:none">
                                <span class="qcodeErrorLast validatorError" name="qcodeErrorLast" style="margin-left:43px;display:none;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-box clearfix">
                <a href="javascript:;" class="btn_submit doApply">完成并报名</a>
                <a class="btn_cancel" href="javascript:;" onclick="applyWinClose()">取消</a>
            </div>
        </form>
    </div>            
    </div>
    
</div>
<div id="apply_restrict_error_content" style="display:none">
    <div class="c-pop w340">
        <div class="c-pop-txt" name="restrict_text">该岗位只招，与您填写的简历不符</div>
        <div class="c-pop-btn">
            <button class="btn btn-primary" id="apply_restrict_ok">确定</button>
        </div>
    </div>
</div>
<div class="apply_restrict_error"></div>
<div id="isApplySuccessWin"></div>
<div id="apply_jz_win_show"></div>

<!-- entry-form end -->
<script type="text/javascript" src="../js/index.js"></script>
<script type="text/javascript">
    window.USER_ID = '';
    window.IS_LOGIN = '';
    window.OLDPOSTID = '';
    window.CANAPPLY = '1';
    window.IS_APPLY = '';
    window.WHEREISPAGE = '';
    window.step = 60;
    window.checkArr = [];
    window.checkFlag = [];
    window.is_restrict_win = false;
    window.maxDate = 0;
    window.applyStep = 4;
    window.isStepTrue = 0;
    window.isImgCodeTrue = 0;
</script>
    <script>
    $(function(){
    	window.cookie = {
    		    //设置过期时间
    		    getsec: function (str) {
    		        var str1 = str.substring(1, str.length) * 1;
    		        var str2 = str.substring(0, 1);
    		        if (str2 == "s") {
    		            return str1 * 1000;
    		        } else if (str2 == "h") {
    		            return str1 * 60 * 60 * 1000;
    		        } else if (str2 == "d") {
    		            return str1 * 24 * 60 * 60 * 1000;
    		        }
    		    },
    		    //设置cookie
    		    setCookie: function (name, value, time, path) {
    		        var strsec = this.getsec(time);
    		        var exp = new Date();
    		        exp.setTime(exp.getTime() + strsec * 1);
    		        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
    		    },
    		    //读取cookies
    		    getCookie: function (name) {
    		        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    		        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    		        else return null;
    		    },
    		    //删除cookies
    		    delCookie: function () {
    		        var exp = new Date();
    		        exp.setTime(exp.getTime() - 1);
    		        var cval = this.getCookie(name);
    		        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    		    }
    		};
    })
    </script>
      
    <script type="text/javascript">
    var currentKeyword = null;
    	$(function(){
    		var option = {
    				keyword:'',
					length:5,
					start:0
    		}
    		
        queryPartTimePositionList(option)
        $('.filter-cate li').on('click',function(){
        		$('.jzList-con').html('');

    			var type = $(this).find('a').text();
    			currentKeyword = type
    			var option = {
    					keyword:type,
    					length:5,
    					start:0
    					
    			}
    			queryPartTimePositionList(option)
    		})
    		
    		
    			var sex = '男'
    	$('input[name=gender]').on('click',function(){
    		sex = $(this).data('type')
    	})
    	
    	
    	$(document).on('click','.apply_jz_class',function(){
    	
    		$('#apply_content').show()	
    	})
    	
    	var clearInput = function(){
    			
          		$('input[name=realname]').val('')
				$('input[name=realage]').val('')
				
				$('input[name=apply_phone]').val('')
				$('input[name=apply_code]').val('')
    		}
    	
    	$(document).on('click','.doApply',function(){
    		var name = $('input[name=realname]').val()
    		var age = $('input[name=realage]').val()
    		
    		var phoneNum = $('input[name=apply_phone]').val()
    		var studentId = $('input[name=apply_code]').val()
    		var userId = cookie.getCookie('strUserId')
    		
    		var option = {
    			userId:userId,
    			name:name,
    			age:age,
    			sex:sex,
    			phoneNum:phoneNum,
    			studentId:studentId
    		}
    		
    		  $.ajax({
                  url:"/partTime/partTimePositionApply",
                  type:"post",                    
                  dataType:"json",
                  data:option,
                  success:function(data){ 
                  	var item = data.success;
                  	if(item){
                  		alert('报名成功')
                  		$('#apply_content').hide()
                  		clearInput()
                  	}
                 
					
                  },
                  error:function(){
                      //服务器出错之后的处理逻辑。
                  }
              });
    	})
        //退出按钮的jquery代码
    	$(".jz_lgout").on('click',function(){
            $.ajax({
                url:"/login/loginOut",
                type:"post",
                datatype:"json",
                success:function(){
                    window.location='/login/toIndex'
                }
                })
            })
    	})
    	
    	function applyWinClose(){
    		$('#apply_content').hide()
    		clearInput()
    	}
    	
    	function queryPagination(option){
    		console.log(option)
    		$('.jzList-con').html('');
    		  $.ajax({
                  url:"/partTime/queryPartTimePositionList",
                  type:"post",                    
                  dataType:"json",
                  data:option,
                  success:function(data){ 
                  	var item = data.data.partTimePositionList;
                   for(var i=0;i<item.length;i++){
                  	 var str = '<div class="jzList-item clearfix"><div class="jzList-pic"><img src="'+item[i]['positionPicUrl']+'"></div><div class="jzList-txt"><div class="jzList-txt-t"><h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2379502.htm">'+item[i]['positionTitle']+'</a></h3><i class="db-min-ico"></i><i class="word-ti-ico"></i><div class="fl show-ico-tips-wrap"><i class="word-jiang-ico"></i><input type="hidden"/></div></div><ul class="jzList-field clearfix"><li><span>工作时间：</span> '+item[i]['workTime']+'</li><li><span>兼职类型：</span>'+item[i]['positionType']+'</li><li><span>工作地点：</span>'+item[i]['workLocation']+'</li><li><span>招聘人数：</span>'+item[i]['recruitmentNum']+'</li></ul></div><div class="jzList-btn"><a href="javascript:;" class="apply_jz_class" data="2379502" job_type="mote"dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"rel="nofollow">报名参加</a></div><div class="jzList-salary"><span class="money">'+item[i]['positionSalary']+'</span><span>完工结</span></div></div>';
                  	 $('.jzList-con').append(str)
                   }		
                  },
                  error:function(){
                      //服务器出错之后的处理逻辑。
                  }
              });
    	}
    	
    	function queryPartTimePositionList(option){
            $.ajax({
                url:"/partTime/queryPartTimePositionList",
                type:"post",                    
                dataType:"json",
                data:option,
                success:function(data){
                	var item = data.data.partTimePositionList;
                	var count = data.data.count;
                	var icount = 0;
                	 if(count%5 == 0){
            			 icount = count;
            		 }else{
            			 icount= Number(Math.floor(count/5)+1);
            		 }
                	 console.log(icount)
                	 if(icount == 0){
                		 $('.M-box').pagination({
                			 pageCount: 1,
                             homePage:'首页',
                             endPage:'末页',
                             prevContent:'上页',
                             nextContent:'下页'
                		 });
                		 $('.M-box').hide()
                	 }else{
                		 $('.M-box').show()
                		 $('.M-box').pagination({
                             pageCount: icount,
                             homePage:'首页',
                             endPage:'末页',
                             prevContent:'上页',
                             nextContent:'下页',
                             callback:function(api){
                                  var current = Number((api.getCurrent()-1) * 5);
                                  if(currentKeyword == null){
                                	  var option = {
                                			keyword:'',
                          					length:5,
                          					start:current
                                	  }
                                	  
                                	  queryPagination(option)
                                  }else{
                                	  var option = {
                                  			keyword:currentKeyword,
                           					length:5,
                           					start:current
                                  	  }
                                	  queryPagination(option)
                                  }
                                
                             }
                         })
                	 }
                	
                	
                 for(var i=0;i<item.length;i++){
                	 var str = '<div class="jzList-item clearfix"><div class="jzList-pic"><img src="'+item[i]['positionPicUrl']+'"></div><div class="jzList-txt"><div class="jzList-txt-t"><h3><a target="_blank" href="" tppabs="http://www.doumi.com/hz/jz_2379502.htm">'+item[i]['positionTitle']+'</a></h3><i class="db-min-ico"></i><i class="word-ti-ico"></i><div class="fl show-ico-tips-wrap"><i class="word-jiang-ico"></i><input type="hidden"/></div></div><ul class="jzList-field clearfix"><li><span>工作时间：</span> '+item[i]['workTime']+'</li><li><span>兼职类型：</span>'+item[i]['positionType']+'</li><li><span>工作地点：</span>'+item[i]['workLocation']+'</li><li><span>招聘人数：</span>'+item[i]['recruitmentNum']+'</li></ul></div><div class="jzList-btn"><a href="javascript:;" class="apply_jz_class" data="2379502" job_type="mote"dmaLog="/jianzhi/hz/-/0/0_0_0_0/list@city=hz@pn=1@atype=click@ca_name=applybutton@ca_source=pc@ca_from=lby"rel="nofollow">报名参加</a></div><div class="jzList-salary"><span class="money">'+item[i]['positionSalary']+'</span><span>完工结</span></div></div>';
                	 $('.jzList-con').append(str)
                 }		
                },
                error:function(){
                    //服务器出错之后的处理逻辑。
                }
            });
    	}
    
    </script>
<!--  
<script type="text/javascript">

    window.PAGE_CONFIG = {
                "fromInfo": {
                    "ca_source": "direct_visits",
                    "ca_platform": 1,
                    "qr_code_type": null,
                    "qr_code_invite": null
                }, "logTracker": {"dmch": "\/jianzhi\/hz\/-\/0\/0_0_0_0\/list@city=hz@pn=1"}
            } || {};
    GJ.use('http://www.doumi.com/hz/app/common/widget/widget.js', function (widget) {
        widget.initWidgets();
    });
    GJ.use('http://www.doumi.com/hz/app/ms_v2/zhiyou/list.js', function (Page) {
        Page.run();
    });

</script>
-->

</body>
</html>
