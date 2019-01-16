var panel = '';
var step = 60;
var downLoad = '';
GJ.use('placeholder-1.js'/*tpa=http://www.doumi.com/hz/js/util/modal/modal.js, js/util/modal/modal.css, js/util/ui_compatible/placeholder.js*/, function (Modal) {
    $("#h_phone-qrcode").mouseover(function () {
        $("#h_qrcode").show();
        return true;
    }).mouseout(function () {
        $("#h_qrcode").hide();
        return true;
    });

    // do login
    panel = new Modal({
        $triggerEl: $('.jz_lg'),
        title: '登录',
        content: $('#content_3'),
        mask: 'true',
        width: 440,
        height: 420
    });

    //do download
    downLoad = new Modal({
        $triggerEl: $('.menu-info'),
        title: '下载APP',
        content: $('#content_3'),
        mask: 'true',
        width: 410,
        height: 300
    });


    $('.js-modal-title').css('text-align', 'center');

    $('.menu-info').live('click', function () {
        $('.js-modal-title').text('下载APP');
        $('.login-pop').hide();
        $('.win_download').show();
        $('.js-modal').addClass('modal-app');

        $('.btn_download').live('click', function () {
            $('.js-modal').removeClass('modal-app');
            $('.js-modal').removeClass('js-show');
            $('.js-modal-mask').removeClass('js-show');
            $('.win_download').hide();
        });

        $('.js-modal-close').live('click', function () {
            $('.js-modal').removeClass('modal-app');
            $('.win_download').css('display', 'none');
        });
    });

    $('.jz_lg').live('click', function () {
        $('.js-modal-title').text('登录');
        $('.login-pop').hide();
        $('.c-pop').hide();
        $('.login-pop:eq(3)').show();
        $('.login-pop:eq(3)').find('.login-header').find('span').removeClass('active');
        $('.login-pop:eq(3)').find('.login-header').find('span:eq(0)').addClass('active');
        if ('placeholder' in document.createElement('input')) {
            $('input:text').val('');
            $('input:password').val('');
        }
        clearTimeout(ctime);
        step = 60;
        $('.login-pop:eq(3)').find('form').hide();
        $('.login-pop:eq(3)').find('form:eq(0)').show();
        $('[data-btn="get_code_n"]').hide();
        $('[data-btn="get_code_y"]').show();
        //$('.login-pop:eq(3)').find('form:eq(0)').find('.lg_error_msg').text('使用密码登录');
        //$('.login-pop:eq(3)').find('form:eq(1)').find('.lg_error_msg').text('使用手机号码直接登录');
        //$('.login-pop:eq(4)').find('.lg_error_msg').text('使用手机号注册');
        //$('.login-pop:eq(5)').find('.lg_error_msg').text('使用手机号找回密码');
        $('input[name="lg_verify"]').parent().hide();
        $('input[name="lg_verify2"]').parent().hide();
        $('input[name="re_verify"]').parent().hide();
        $('input[name="fg_verify"]').parent().hide();
        $('.pass-change-verifyCode').hide();
        $('.login-pop:eq(3)').find('form:eq(0)').find('.error-area').hide();
        $('.login-pop:eq(3)').find('form:eq(1)').find('.error-area').hide();
        $('.js-modal').addClass('modal-account');
    });

    $('.jz_lgout').click(function () {
        // do cancel baoming
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/logout',
            'dataType': 'json',
            'success': function (json) {
                window.location.reload();
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                window.alert(err.message);
                window.location.reload();
            }
        });

    });

    $('.login-header > span').live('click', function () {
        var container = $(this).parents('.login-pop');
        var flg = $(this).attr('data-switch');
        $(this).parent().find('span').removeClass('active');
        $(this).addClass('active');
        container.find('form').hide();
        container.find('form:eq(' + flg + ')').show();
        if (flg == 1) {
            $('.modal-account').removeClass('account-password account-register account-modify').addClass('account-phone');
        } else {
            $('.modal-account').removeClass('account-phone account-register account-modify').addClass('account-password');
        }
    });

    $('#lg_get_code').live('click', function () {
        var container = $(this).parent().parent().parent();
        var phone = container.find('input[name="lg_phone2"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        // var iserror = (container.find(".lg_error_msg").html().replace('<i class="error-area-ico"></i>','').length != container.find(".lg_error_msg").html().length)?true:false;
        var iserror = (container.find("#lg_error_msg_phone").html().replace('<i class="error-area-ico"></i>', '').length != container.find("#lg_error_msg_phone").html().length) ? true : false;

        if (!phonereg.test(phone)) {
            // container.find('.error-area').show();
            container.find('#login_error_phone').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        } else {
            // container.find('.error-area').hide();
            container.find('#login_error_phone').hide();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>使用手机号码直接登录');
            container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>使用手机号码直接登录');
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    step = 60;
                    countDown(container);
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入验证码');
                    container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入验证码');
                    container.find('input[name="lg_verify2"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                } else {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+json.message);
                    container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message && (err.code != -3 && err.code != -4)) {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+err.message);
                    container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入验证码');
                    container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入验证码');
                    var ishidden = container.find('img[name="lg_verify_img2"]').parent().parent().is(":hidden");
                    container.find('input[name="lg_verify2"]').parent().show();
                    if (container.find('img[name="lg_verify_img2"]').attr('src') == "" || ishidden || iserror) {
                        container.find('input[name="lg_verify2"]').val('');
                        container.find('img[name="lg_verify_img2"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    }
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="lg_change_verify2"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;

    });

    $('#lg_verify').live('keyup', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="lg_phone"]').val();
        var verify = $(this).val();
        var phonereg = /^1[34578]\d{9}$/;
        var verifyreg = /^\d{4}$/;
        if (!phonereg.test(phone)) {
            return false;
        }

        if (verify.length < 4) {
            return false;
        }

        if (verify.length >= 4 && !verifyreg.test(verify)) {
            // container.find('.error-area').show();
            // container.find('form:eq(0)').find(".lg_error_msg").html('<i class="error-area-ico"></i>'+'图片验证码错误！');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>' + '图片验证码错误！');
            return false;
        }
    });

    $('#lg_verify2').live('keyup', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="lg_phone2"]').val();
        var verify = $(this).val();
        var phonereg = /^1[34578]\d{9}$/;
        var verifyreg = /^\d{4}$/;
        if (!phonereg.test(phone)) {
            return false;
        }
        if (verify.length < 4 || verify.length > 4) {
            return false;
        }
        if (verify.length = 4 && !verifyreg.test(verify)) {
            //container.find('input[name="lg_verify2"]').val('');
            //container.find('input[name="lg_verify2"]').blur();
            // container.find('.error-area').show();
            container.find('#login_error_phone').show();
            container.find('form:eq(1)').find(".lg_error_msg").html('<i class="error-area-ico"></i>' + '图片验证码错误！');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone, code: verify},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    container.find('input[name="lg_verify2"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                    container.find('.error-area').hide();
                    //container.find('form:eq(1)').find(".lg_error_msg").html('请输入验证码');
                    step = 60;
                    countDown(container);
                } else {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    container.find('form:eq(1)').find(".lg_error_msg").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message) {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    container.find('form:eq(1)').find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }
                if (err.code == -3 || err.code == -4) {
                    container.find('input[name="lg_verify2"]').parent().show();
                    //container.find('input[name="lg_verify2"]').val('');
                    //container.find('input[name="lg_verify2"]').blur();
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="lg_change_verify2"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;
    });

    $('#doLogin').live('click', function () {
        var container = $(this).parent().parent();
        var phone = container.find('input[name="lg_phone2"]').val();
        var code = container.find('input[name="lg_code"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        if (phone == "") {
            // container.find('.error-area').show();
            container.find('#login_error_phone').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入手机号');
            container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入手机号');
            return false;
        }
        if (!phonereg.test(phone)) {
            // container.find('.error-area').show();
            container.find('#login_error_phone').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        }
        if (code == "") {
            // container.find('.error-area').show();
            container.find('#login_error_phone').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入验证码');
            container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>请输入验证码');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/login/',
            'data': {
                mobile: phone,
                code: code
            },
            'dataType': 'json',
            'success': function (json) {
                var nav = $('.nav').attr('data');
                if (nav == 'index') {
                    window.location.href = $('.zhiweiCity').attr('href');
                } else {
                    window.location.reload();
                }
            },
            'error': function (json) {
                var jsonmsg = $.parseJSON(json.responseText);

                if (-208 == jsonmsg.code) {
                    window.alert(jsonmsg.message);
                    window.location.reload();
                } else {
                    // container.find('.error-area').show();
                    container.find('#login_error_phone').show();
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+jsonmsg.message);
                    container.find("#lg_error_msg_phone").html('<i class="error-area-ico"></i>' + jsonmsg.message);
                }
            }
        });
        return false;
    });

    $('#doLoginPassword').live('click', function () {
        var container = $(this).parent().parent();
        var phone = container.find('input[name="lg_phone"]').val();
        if ('placeholder' in document.createElement('input')) {
            var password = container.find('input:password[name="lg_pass"]').val();
        } else {
            var password = container.find('input:text[name="lg_pass"]').val();
        }
        var verify = container.find('input[name="lg_verify"]').val();

        var phonereg = /^1[34578]\d{9}$/;
        var passwordreg = /^[0-9A-Za-z]{6,}$/;
        var verifyreg = /^\d{4}$/;
        if (phone == "") {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入手机号');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>请输入手机号');
            return false;
        }
        if (password == "") {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入密码');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>请输入密码');
            return false;
        }
        if (!phonereg.test(phone)) {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        }
        if (!passwordreg.test(password)) {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的密码');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>请输入正确的密码');
            return false;
        }
        if (verify.length == 4 && !verifyreg.test(verify)) {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+'图片验证码错误！');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>' + '图片验证码错误！');
            return false;
        }
        if (!container.find('input[name="lg_verify"]').parent().is(':hidden') && verify == "") {
            // container.find('.error-area').show();
            // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+'请输入验证码');
            container.find('#login_error_pwd').show();
            container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>' + '请输入验证码');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/loginwithpassword',
            'data': {mobile: phone, password: password, code: verify},
            'dataType': 'json',
            'success': function (json) {
                // if (json.userId >= 0) {
                //     container.parents('.login-pop').parent().find('.login-pop').hide();
                // $('.c-pop').show();
                // $('.c-pop').find('.success').text('登录成功');
                // $('.js-modal-close').live('click', function(){window.location.reload();});
                //     window.location.reload();
                // } else {
                //     container.parents('.login-pop').parent().find('.login-pop').hide();
                // $('.c-pop').show();
                // $('.c-pop').find('.success').text(json.message);
                // $('.js-modal-close').live('click', function(){window.location.reload();});
                //     window.location.reload();
                // }
                nav = $('.nav').attr('data');
                if (nav == 'index') {
                    window.location.href = $('.zhiweiCity').attr('href');
                } else {
                    window.location.reload();
                }
            },
            'error': function (json) {
                var jsonmsg = $.parseJSON(json.responseText);
                if (jsonmsg.message && (jsonmsg.code != -3 && jsonmsg.code != -4)) {
                    // container.find('.error-area').show();
                    // container.find(".lg_error_msg").html('<i class="error-area-ico"></i>'+jsonmsg.message);
                    container.find('#login_error_pwd').show();
                    container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>' + jsonmsg.message);
                }
                if (jsonmsg.code == -3 || jsonmsg.code == -4) {
                    // container.find('.error-area').show();
                    // container.find(".lg_error_msg").html('请输入验证码');
                    container.find('#login_error_pwd').show();
                    container.find("#lg_error_msg_pwd").html('<i class="error-area-ico"></i>请输入验证码');
                    $('.modal-account').removeClass('account-phone account-register account-modify').addClass('account-password');
                    container.find('input[name="lg_verify"]').parent().show();
                    container.find('input[name="lg_verify"]').val('');
                    container.find('img[name="lg_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="lg_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;
    });

    $('#lg_change_verify').live('click', function () {
        $(this).parents('.login-pop').find('input[name="lg_verify"]').val('');
        $(this).parents('.login-pop').find('img[name="lg_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
    });

    $('#lg_change_verify2').live('click', function () {
        $(this).parents('.login-pop').find('input[name="lg_verify2"]').val('');
        $(this).parents('.login-pop').find('img[name="lg_verify_img2"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
    });

    $('#doRegister').live('click', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="re_phone"]').val();
        if ('placeholder' in document.createElement('input')) {
            var password = container.find('input:password[name="re_pass"]').val();
        } else {
            var password = container.find('input:text[name="re_pass"]').val();
        }
        var code = container.find('input[name="re_code"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        var passwordreg = /^\S{6,12}$/;
        var passwordreg2 = /^\d+$/;
        var passwordreg3 = /^(\S)\1{5,11}$/;
        var codereg = /^\d{6}$/;
        if (!phonereg.test(phone)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        }
        if (password == "") {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入密码');
            return false;
        }
        if (password.length != password.replace(' ', '').length) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>密码不能包含空格');
            return false;
        }
        if (!passwordreg.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入6-12位非纯数字密码');
            return false;
        }
        if (passwordreg2.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请勿输入纯数字密码');
            return false;
        }
        if (passwordreg3.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请勿使用单一重复字符密码');
            return false;
        }
        if (code == "") {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i  class="error-area-ico"></i>请输入验证码');
            return false;
        }
        if (!codereg.test(code)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i  class="error-area-ico"></i>请输入正确的验证码');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/register/',
            'data': {
                mobile: phone,
                password: password,
                code: code,
                qr_code_type: window.PAGE_CONFIG.fromInfo.qr_code_type,
                qr_code_invite: window.PAGE_CONFIG.fromInfo.qr_code_invite,
                ca_campaign: ''
            },
            'dataType': 'json',
            'success': function (json) {
                // if (json.code == 1) {
                //     container.parent().find('.login-pop').hide();
                // $('.c-pop').show();
                // $('.c-pop').find('.success').text('注册成功');
                // $('.js-modal-close').live('click', function(){window.location.reload();});
                // window.location.reload();
                // } else {
                // container.parent().find('.login-pop').hide();
                // $('.c-pop').show();
                // $('.c-pop').find('.success').text(json.message);
                // $('.js-modal-close').live('click', function(){window.location.reload();});
                // window.location.reload();
                // }

                nav = $('.nav').attr('data');
                if (nav == 'index') {
                    window.location.href = $('.zhiweiCity').attr('href');
                } else {
                    window.location.reload();
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message && (err.code != -3 && err.code != -4)) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    container.find('.error-area').hide();
                    //container.find(".lg_error_msg").html('请输入验证码');
                    container.find('input[name="re_verify"]').parent().show();
                    container.find('input[name="re_verify"]').val('');
                    container.find('img[name="re_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="re_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });

        return false;
    });

    $('#doForget').live('click', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="fg_phone"]').val();
        if ('placeholder' in document.createElement('input')) {
            var password = container.find('input:password[name="fg_pass"]').val();
        } else {
            var password = container.find('input:text[name="fg_pass"]').val();
        }
        var code = container.find('input[name="fg_code"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        var passwordreg = /^\S{6,12}$/;
        var passwordreg2 = /^\d+$/;
        var passwordreg3 = /^(\S)\1{5,11}$/;
        var codereg = /^\d{6}$/;
        if (!phonereg.test(phone)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        }
        if (password == "") {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入密码');
            return false;
        }
        if (password.length != password.replace(' ', '').length) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>密码不能包含空格');
            return false;
        }
        if (!passwordreg.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入6-12位非纯数字密码');
            return false;
        }
        if (passwordreg2.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请勿输入纯数字密码');
            return false;
        }
        if (passwordreg3.test(password)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请勿使用单一重复字符密码');
            return false;
        }
        if (code == "") {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i  class="error-area-ico"></i>请输入验证码');
            return false;
        }
        if (!codereg.test(code)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i  class="error-area-ico"></i>请输入正确的验证码');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/forget/',
            'data': {mobile: phone, password: password, code: code},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 1) {
                    container.parent().find('.login-pop').hide();

                    $('.win_success').show();
                    $('.win_success').find('.success_tag').text('恭喜，重置密码成功');
                    $('.win_success').find('.btn').text('直接登录');

                    $('.js-modal-close').live('click', function () {
                        // window.location.reload();
                        nav = $('.nav').attr('data');
                        if (nav == 'index') {
                            window.location.href = $('.zhiweiCity').attr('href');
                        } else {
                            window.location.reload();
                        }
                    });
                } else {
                    container.parent().find('.login-pop').hide();

                    $('.win_success').show();
                    // $('.win_success').find('.success').text(json.message);
                    $('.win_success').find('.success_tag').text('恭喜，重置密码成功');
                    $('.win_success').find('.btn').text('直接登录');

                    $('.js-modal-close').live('click', function () {
                        // window.location.reload();
                        nav = $('.nav').attr('data');
                        if (nav == 'index') {
                            window.location.href = $('.zhiweiCity').attr('href');
                        } else {
                            window.location.reload();
                        }
                    });
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message && (err.code != -3 && err.code != -4)) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    //container.find(".lg_error_msg").html('请输入验证码');
                    container.find('.error-area').hide();
                    container.find('input[name="fg_verify"]').parent().show();
                    container.find('input[name="fg_verify"]').val('');
                    container.find('img[name="fg_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="fg_change_verify"]').parent().show();
                }
            }
        });

        return false;
    });

    $('#btn_success').live('click', function () {
        nav = $('.nav').attr('data');
        if (nav == 'index') {
            window.location.href = $('.zhiweiCity').attr('href');
        } else {
            window.location.reload();
        }
    });

    $('#btn_register').live('click', function () {
        $('.modal-account').removeClass('account-phone account-password account-modify').addClass('account-register');
        var container = $(this).parents('.login-pop').parent();
        container.find('.login-pop').hide();
        $('.js-modal-title').text('注册');
        container.find('.login-pop[id="win_register"]').show();
    });

    $('#btn_forget').live('click', function () {
        $('.modal-account').removeClass('account-phone account-register account-password').addClass('account-modify');
        var container = $(this).parents('.login-pop').parent();
        container.find('.login-pop').hide();
        $('.js-modal-title').text('忘记密码');
        container.find('.login-pop[id="win_forget"]').show();
    });

    $('#btn_login').live('click', function () {
        $('.modal-account').removeClass('account-phone account-register account-modify').addClass('account-password');
        var container = $(this).parents('.login-pop').parent();
        container.find('.login-pop').hide();
        $('.js-modal-title').text('登录');
        container.find('.login-pop[id="win_login"]').show();
        container.find('.login-pop[id="win_login"]').find('.login-header').find('span').removeClass('active');
        container.find('.login-pop[id="win_login"]').find('.login-header').find('span:eq(0)').addClass('active');
        container.find('.login-pop[id="win_login"]').find('form').hide();
        container.find('.login-pop[id="win_login"]').find('form:eq(0)').show();
    });

    $('#re_get_code').live('click', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="re_phone"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        var iserror = (container.find(".lg_error_msg").html().replace('<i class="error-area-ico"></i>', '').length != container.find(".lg_error_msg").html().length) ? true : false;
        if (!phonereg.test(phone)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        } else {
            container.find('.error-area').hide();
            container.find(".lg_error_msg").html('使用手机号注册');
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    step = 60;
                    countDown(container);
                    container.find(".lg_error_msg").html('请输入验证码');
                    container.find('input[name="re_verify"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                } else {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    var ishidden = container.find('img[name="re_verify_img"]').parent().parent().is(":hidden");
                    container.find('input[name="re_verify"]').parent().show();
                    if (container.find('img[name="re_verify_img"]').attr('src') == "" || ishidden || iserror) {
                        container.find('input[name="re_verify"]').val('');
                        container.find('img[name="re_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    }
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="re_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;

    });

    $('#re_verify').live('keyup', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="re_phone"]').val();
        var verify = $(this).val();
        var phonereg = /^1[34578]\d{9}$/;
        var verifyreg = /^\d{4}$/;
        if (!phonereg.test(phone)) {
            return false;
        }
        if (verify.length < 4 || verify.length > 4) {
            return false;
        }
        if (verify.length = 4 && !verifyreg.test(verify)) {
            //container.find('input[name="re_verify"]').val('');
            //container.find('input[name="re_verify"]').blur();
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + '图片验证码错误！');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone, code: verify},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    container.find('input[name="re_verify"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                    container.find(".lg_error_msg").html('请输入验证码');
                    step = 60;
                    countDown(container);
                } else {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    container.find('input[name="re_verify"]').parent().show();
                    //container.find('input[name="re_verify"]').val('');
                    //container.find('input[name="re_verify"]').blur();
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="re_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;
    });

    $('#re_change_verify').live('click', function () {
        $(this).parents('.login-pop').find('input[name="re_verify"]').val('');
        $(this).parents('.login-pop').find('img[name="re_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
    });

    $('#fg_get_code').live('click', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="fg_phone"]').val();
        var phonereg = /^1[34578]\d{9}$/;
        var iserror = (container.find(".lg_error_msg").html().replace('<i class="error-area-ico"></i>', '').length != container.find(".lg_error_msg").html().length) ? true : false;
        if (!phonereg.test(phone)) {
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入正确的手机号');
            return false;
        } else {
            container.find('.error-area').hide();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>使用手机号找回密码');
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    step = 60;
                    countDown(container);
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>请输入验证码');
                    container.find('input[name="fg_verify"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                } else {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    var ishidden = container.find('img[name="fg_verify_img"]').parent().parent().is(":hidden");
                    container.find('input[name="fg_verify"]').parent().show();
                    if (container.find('img[name="fg_verify_img"]').attr('src') == "" || ishidden || iserror) {
                        container.find('input[name="fg_verify"]').val('');
                        container.find('img[name="fg_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
                    }
                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="fg_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;

    });

    $('#fg_verify').live('keyup', function () {
        var container = $(this).parents('.login-pop');
        var phone = container.find('input[name="fg_phone"]').val();
        var verify = $(this).val();
        var phonereg = /^1[34578]\d{9}$/;
        var verifyreg = /^\d{4}$/;
        if (!phonereg.test(phone)) {
            return false;
        }
        if (verify.length < 4 || verify.length > 4) {
            return false;
        }
        if (verify.length = 4 && !verifyreg.test(verify)) {
            //container.find('input[name="fg_verify"]').val('');
            //container.find('input[name="fg_verify"]').blur();
            container.find('.error-area').show();
            container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + '图片验证码错误！');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/authCkCode/',
            'data': {mobile: phone, code: verify},
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    container.find('input[name="fg_verify"]').parent().hide();
                    container.find('.pass-change-verifyCode').hide();
                    container.find(".lg_error_msg").html('请输入验证码');
                    step = 60;
                    countDown(container);
                } else {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + json.message);
                }
            },
            'error': function (err) {
                var err = $.parseJSON(err.responseText);
                if (err.message) {
                    container.find('.error-area').show();
                    container.find(".lg_error_msg").html('<i class="error-area-ico"></i>' + err.message);
                }

                if (err.code == -3 || err.code == -4) {
                    container.find('input[name="fg_verify"]').parent().show();
                    //container.find('input[name="fg_verify"]').val('');
                    //container.find('input[name="fg_verify"]').blur();

                    // container.find('.pass-change-verifyCode').show();
                    container.find('a[id="fg_change_verify"]').parent().show();
                } else {
                    //window.location.reload();
                }
            }
        });
        return false;
    });

    $('#fg_change_verify').live('click', function () {
        $(this).parents('.login-pop').find('input[name="fg_verify"]').val('');
        $(this).parents('.login-pop').find('img[name="fg_verify_img"]').attr('src', 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + Math.random());
    });

    var ctime = null;

    function countDown(obj) {
        if (step == 0) {
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').hide();
            obj.find('.get-dynamic-pass[data-btn="get_code_y"]').show();
            step = 60;
        } else {
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').show();
            obj.find('.get-dynamic-pass[data-btn="get_code_y"]').hide();
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').html(step + '秒后重试');
            step--;
            ctime = setTimeout(function () {
                countDown(obj)
            }, 1000);
        }
    };
});
GJ.use('widget-1.js'/*tpa=http://www.doumi.com/hz/app/common/widget/widget.js*/, function (widget) {
    widget.initWidgets();

    $('.dropdown').hover(function () {
        $(this).addClass('active');
    }, function () {
        $(this).removeClass('active');
    });
});


var setRegError = function (starr, text, ins) {
    var successClass = "validatorValid";
    var errorClass = "validatorError";
    var error = {
        'isEmpty': "请填写",
        'notSelect': "请填选",
        'name': "请输入中文或字母",
        'number': "只能填写数字",
        'phone': "请填写正确的手机号",
        'jobEx': "请填选正确的工作经验",
        'deadDate': "您的到岗时间不符合该职位要求"
    };

    ins.removeClass(successClass);
    ins.addClass(errorClass);

    if (starr['isEmpty']) {
        window.checkFlag.push(false);
        ins.text(error['isEmpty'] + text);
        ins.show();
        return false;
    }
    if (starr['notSelect']) {
        window.checkFlag.push(false);
        ins.text(error['notSelect'] + text);
        ins.show();
        return false;
    }
    starr['isEmpty'] = true;
    starr['notSelect'] = true;
    for (key in starr) {
        if (!starr[key]) {
            window.checkFlag.push(false);
            ins.text(error[key]);
            ins.show();
            return false;
        }
    }
    window.checkFlag.push(true);
    ins.removeClass(errorClass);
    ins.addClass(successClass);
    ins.text('');
}
var checkInput = function () {
    //只能是中文或字母
    var regName = /^[a-zA-Z\u4e00-\u9fa5]{1,20}$/;
    //为空
    var regEmpty = /^[ ]+$/;
    //电话号码
    var regPhone = /^1[34578]\d{9}$/;
    //数字
    var regNumber = /^\d{1,10}$/;
    //到岗日期
    var newTime = new Date().getTime();
    var regEntryDate = /^\d{4}(-|\/|\.)\d{1,2}\1\d{1,2}$/;

    var container = $(this);
    var name = container.attr("name");
    var value = container.val();
    var gender = $('input[name="gender"]:checked').val();
    var health = $('input[name="health"]:checked').val();
    var identity = $('input[name="identity"]:checked').val();

    switch (name) {
        case 'post_addr_select':
            var arr = {
                'number': (regNumber.test(value)),
                'notSelect': (value == '')
            }
            setRegError(arr, '工作地点', $('span[name="workAddrError"]:last'));
            break;
        case 'realname':
            var arr = {
                'name': regName.test(value),
                'isEmpty': (regEmpty.test(value) || value == '')
            }
            setRegError(arr, '真实姓名', $('span[name="nameError"]:last'));
            break;
        case 'gender':
            var arr = {
                'notSelect': (gender != 1 && gender != 2)
            }
            setRegError(arr, '性别', $('span[name="genderError"]:last'));
            break;
        case 'birthDate':
            var arr = {
                'notSelect': (value == 0)
            }
            setRegError(arr, '出生年份', $('span[name="birthError"]:last'));
            break;
        case 'identity':
            var arr = {
                'notSelect': (identity != 1 && identity != 0)
            }
            setRegError(arr, '身份', $('span[name="identityError"]:last'));
            break;
        case 'height':
            var arr = {
                'number': (regNumber.test(value)),
                'isEmpty': (regEmpty.test(value) || value == '')
            }
            setRegError(arr, '身高', $('span[name="heightError"]:last'));
            break;
        case 'weight':
            var arr = {
                'number': (regNumber.test(value)),
                'isEmpty': (regEmpty.test(value) || value == '')
            }
            setRegError(arr, '体重', $('span[name="weightError"]:last'));
            break;
        case 'jobEx':
            var arr = {
                'notSelect': (value == '')
            }
            setRegError(arr, '工作经验', $('span[name="demandError"]:last'));
            break;
        case 'district':
            var arr = {
                'number': (regNumber.test(value)),
                'notSelect': (value == 0)
            }
            setRegError(arr, '区域', $('span[name="addrError"]:last'));
            break;
        case 'street':
            var arr = {
                'number': (regNumber.test(value)),
                'notSelect': (value == 0)
            }
            setRegError(arr, '商圈', $('span[name="addrError"]:last'));
            break;
        case 'entryDate':
            var selectTime = value.replace(/\-/g, "");
            var arr = {
                'date': (regEntryDate.test(value)),
                'notSelect': (value == ''),
                'deadDate': (window.maxDate >= selectTime)
            }
            if (window.maxDate == 0) {
                arr['deadDate'] = true;
            }
            setRegError(arr, '到岗时间', $('span[name="entryDateError"]:last'));
            break;
        case 'health':
            var arr = {
                'notSelect': (health != 1 && health != 0)
            }
            setRegError(arr, '健康证', $('span[name="healthError"]:last'));
            break;
        case 'apply_phone':
            var arr = {
                'phone': (regPhone.test(value)),
                'isEmpty': (regEmpty.test(value) || value == '')
            }
            setRegError(arr, '手机号', $('.phoneError:last'));
            break;
        case 'apply_code':
            var arr = {
                'isEmpty': (regEmpty.test(value) || value == '')
            }
            setRegError(arr, '验证码', $('span[name="codeError"]:last'));
            break;
        default:
    }
    //任何时候在下列存在的时候，不显示后续验证
    var nameError = $("span[name='nameError']").text();
    var genderError = $("span[name='genderError']");
    var birthError = $("span[name='birthError']").text();
    var identityError = $("span[name='identityError']");
    var heightError = $("span[name='heightError']").text();
    var weightError = $("span[name='weightError']");
    if (nameError == '') {
    } else {
        genderError.text('');
    }
    if (birthError == '') {
    } else {
        identityError.text('');
    }
    if (heightError == '') {
    } else {
        weightError.text('');
    }
    return true;
}
GJ.use('placeholder-2.js'/*tpa=http://www.doumi.com/hz/js/util/modal/confirm.js,js/util/modal/modal.js, js/util/modal/modal.css, js/util/ui_compatible/placeholder.js*/, function (Modal) {
    $('.checkInput').live("blur", checkInput);
    $('.checkInput').live("input propertychange", checkInput);
    $('.checkInput').live("change", checkInput);
    //快速报名窗口
    var apply_page = '';
    apply_page = new Modal({
        $triggerEl: $('#apply_jz_win_show'),
        title: '报名',
        content: $('#apply_content'),
        mask: 'true',
        width: 740,
        height: 500
    });

    //限制提示窗口
    var apply_restrict_page = '';
    apply_restrict_page = new Modal({
        $triggerEl: $('.apply_restrict_error'),
        title: '提示',
        content: $('#apply_restrict_error_content'),
        mask: 'true',
        width: 400,
        height: 130
    });

    //点击确认
    $('#apply_restrict_ok').live('click', function () {
        $('.js-modal-close').trigger('click');
        if (window.IS_LOGIN == '') {
            window.location.reload();
        }
    });

    //错误触发
    $('.apply_restrict_error').click(function () {
        //$('.apply_jz_class').trigger('click');
    });

    //如果在报名时点击登录
    if (window.IS_LOGIN != '') {
        if (window.OLDPOSTID != '') {
            var postId = window.OLDPOSTID;
            var canApply = window.CANAPPLY;
            var isApply = window.IS_APPLY;
            if (postId != '') {
                if (isApply == 1) { //提交过报名
                    window.OLDPOSTID = '';
                } else if (isApply == '' && canApply == 1) { //未提交报名 且可以报名
                    var canApplyCount = '3';
                    if (canApplyCount == 0) {
                        $("div[name='restrict_text']").html('每人每天最多投递<em style="color: #fd8000;margin: 0 3px">3</em>个职位,您已经投递满<em style="color: #fd8000;margin: 0 3px">3</em>个职位');
                        $('.js-modal-title').html('提示');
                        $('.apply_restrict_error').trigger("click");
                    } else {
                        $('.apply_jz_class').trigger('click');
                        applyWinShow(postId);
                    }
                } else if (isApply == '' && canApply == 2) { //未提交报名 且不能报名
                    $('.apply_restrict_error').trigger('click');
                }
            }
            window.OLDPOSTID = '';
        }
    }

    //登录
    $('.apply_login').live("click", function () {
        $('.js-modal-close').trigger('click');
        $('.jz_lg').trigger('click');
    });

    //快捷登录&注册
    window.doApplyLogin = function () {
        var userId = 0;
        var phone = $("input[name='apply_phone']:last").val();
        var code = $("input[name='apply_code']:last").val();
        var phonereg = /^1[34578]\d{9}$/;
        var successClass = "validatorValid";
        var errorClass = "validatorError";

        if (phone == "") {
            $(".phoneError:last").removeClass(successClass);
            $(".phoneError:last").addClass(errorClass);
            $('.phoneError:last').show();
            $(".phoneError:last").text('请输入手机号');
            return false;
        }
        if (!phonereg.test(phone)) {
            $(".phoneError:last").removeClass(successClass);
            $(".phoneError:last").addClass(errorClass);
            $('.phoneError:last').show();
            $(".phoneError:last").text('请输入正确的手机号');
            return false;
        }
        if (code == "") {
            $(".codeError:last").removeClass(successClass);
            $(".codeError:last").addClass(errorClass);
            $('.codeError:last').show();
            $(".codeError:last").text('请输入验证码');
            return false;
        }
        $.ajax({
            'type': 'POST',
            'url': '/api/v1/client/login/',
            'async': false,
            'data': {
                mobile: phone,
                code: code
            },
            'dataType': 'json',
            'success': function (json) {
                userId = json.userId;
                window.USER_ID = json.userId;
                //var nav = $('.nav').attr('data');
                //if (nav == 'index') {
                //    window.location.href = $('.zhiweiCity').attr('href');
                //}
            },
            'error': function (json) {
                var jsonmsg = $.parseJSON(json.responseText);

                if (-208 == jsonmsg.code) {
                    window.alert(jsonmsg.message);
                    window.location.reload();
                } else {
                    $(".codeError:last").removeClass(successClass);
                    $(".codeError:last").addClass(errorClass);
                    $('.codeError:last').show();
                    $(".codeError:last").text(jsonmsg.message);
                }
            }
        });
        return userId;
    };

    //获取动态验证码
    $("input[name='apply_qcode']:last").keyup(function () {
        var container = $(".win_apply_login:last");
        var length = $(this).val().length;
        if (length == 4) {
            var mobile = $("input[name='apply_phone']:last").val();
            mobile = 'mobile=' + mobile;
            var code = $("input[name='apply_qcode']:last").val();
            code = 'code=' + code;
            postInfo = mobile + '&' + code;
            $.ajax({
                'type': 'POST',
                'url': 'http://www.doumi.com/api/v1/client/authCkCode/',
                'data': postInfo,
                'dataType': 'json',
                'success': function (json) {
                    window.step = 60;
                    countDown(container);
                    if (window.isImgCodeTrue == 1) {
                        window.winHigh -= 50;
                        window.isImgCodeTrue = 0;
                        $("div[name='win_apply_img_code']").hide();
                        $('.js-modal:gt(1) > .js-modal-content').css("height", window.winHigh + "px");
                    }
                },
                'error': function (json) {
                    var result = $.parseJSON(json.responseText);
                    if (result.code == -206) {
                        $("span[name='qcodeErrorLast']:last").text(result.message);
                        $("span[name='qcodeErrorLast']:last").show();
                        $("span[name='qcodeError']:last").hide();
                        if (window.isStepTrue == 0) {
                            window.winHigh += 40;
                            $('.js-modal:gt(1) > .js-modal-content').css("height", window.winHigh + "px");
                            window.isStepTrue = 1;
                        }
                    } else {
                        $("span[name='qcodeError']:last").text(result.message);
                        $("span[name='qcodeError']:last").addClass("validatorError");
                        $("span[name='qcodeError']:last").removeClass("validatorValid");
                        $("span[name='qcodeError']:last").show();
                        $("span[name='qcodeErrorLast']:last").hide();
                        if (window.isStepTrue == 1) {
                            window.winHigh -= 40;
                            $('.js-modal:gt(1) > .js-modal-content').css("height", window.winHigh + "px");
                            window.isStepTrue = 0;
                        }
                    }
                }
            });
        }
    });

    //获取验证码，如果超过限制弹出图片验证码
    $("a[getaction='get_code']").click(function () {
        var container = $(".win_apply_login:last");
        var mobile = $("input[name='apply_phone']:last").val();
        var phonereg = /^1[34578]\d{9}$/;
        if (mobile == "") {
            $(".phoneError:last").removeClass("validatorValid");
            $(".phoneError:last").addClass("validatorError");
            $('.phoneError:last').show();
            $(".phoneError:last").text('请输入手机号');
            return false;
        }
        if (!phonereg.test(mobile)) {
            $(".phoneError:last").removeClass("validatorValid");
            $(".phoneError:last").addClass("validatorError");
            $(".phoneError:last").show();
            $(".phoneError:last").text('请输入正确的手机号');
            return false;
        }
        mobile = 'mobile=' + mobile;
        $.ajax({
            'type': 'POST',
            'url': 'http://www.doumi.com/api/v1/client/authCkCode/',
            'data': mobile,
            'dataType': 'json',
            'success': function (json) {
                if (json.code == 0) {
                    window.step = 60;
                    countDown(container);
                }
            },
            'error': function (json) {
                var result = $.parseJSON(json.responseText);
                if (result.name == 'UserError' && result.code == -3) {
                    window.printCode();
                }
                if (result.name == 'UserError' && result.code == -203) {
                    $(".phoneError:last").removeClass("validatorValid");
                    $(".phoneError:last").addClass("validatorError");
                    $('.phoneError:last').show();
                    $(".phoneError:last").text('请输入正确的手机号');
                }
            }
        });
    });

    //重试等待
    function countDown(obj) {
        if (window.step == 0) {
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').hide();
            obj.find('.get-dynamic-pass[data-btn="get_code_y"]').show();
            window.step = 60;
        } else {
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').show();
            obj.find('.get-dynamic-pass[data-btn="get_code_y"]').hide();
            obj.find('.get-dynamic-pass[data-btn="get_code_n"]').html(step + '秒后重试');
            window.step--;
            ctime = setTimeout(function () {
                countDown(obj)
            }, 1000);
        }
    };

    window.printCode = function () {
        var imgCodeObj = $("div[name='win_apply_img_code']");
        var rand = Math.random();
        var imgUrl = 'http://www.doumi.com/api/v1/client/showCkCodeV2?rand=' + rand;
        if (window.isImgCodeTrue == 0) {
            window.winHigh += 50;
            window.isImgCodeTrue = 1;
            $('.js-modal:gt(1) > .js-modal-content').css("height", window.winHigh + "px");
        }
        imgCodeObj.children("img").attr("src", imgUrl);
        imgCodeObj.show();
    }

    $("#refresh_code").live("click", function () {
        window.printCode();
    });

    //控制控件状态更改
    //下拉控件
    $('.form-select-wrap > select').change(function () {
        if ($(this).val() != '') {
            $(this).attr("style", "color: #4b4b4b");
        } else {
            $(this).attr("style", "color: #aaa");
        }
    });
    //工作经验
    $('.jz-sel-arrow').click(function () {
        $('.jz-sel-option').toggle();
    });
    $('.jz-sel-txt').focus(function () {
        $('.jz-sel-option').show();
    });
    $('.jz-sel-option').mouseleave(function () {
        $('.jz-sel-option').hide();
    });

    //地区选择控件
    window.districtOption = new Array();
    $('.district-option').change(function () {
        var districtId = $(this).val();
        $('option[name="districtDefined"]').attr("disabled", 'disabled');
        $('.street-option').attr("style", 'color:#4b4b4b');
        if (typeof window.districtOption[districtId] == 'undefined') {
            getStreetsOption(districtId);
        } else {
            $('.street-option').html(window.districtOption[districtId]);
        }
    });
    //创建出生日期
    createDateOfBirthOption();

    //作为跳板触发报名弹窗
    //$('#apply_jz_win_show').click();

    //点击报名按钮时加载职位数据
    $('.apply_jz_class').click(function () {
        if (window.OLDPOSTID != '' && window.IS_LOGIN != '') {
            return false;
        }
        if (window.applyStep == 4) {
            checkApplyStep();
        } else {
            return false;
        }

        window.checkArr = new Array();
        var postId = $(this).attr('data');
        applyWinShow(postId);
    });
});


//Cfunction
//点击报名按钮间隔时间
var checkApplyStep = function () {
    if (window.applyStep == 0) {
        window.applyStep = 4;
    } else {
        window.applyStep--;
        setTimeout(function () {
            checkApplyStep()
        }, 1000);
    }
}
//弹出报名表单
var applyWinShow = function (postId) {
    var postId = postId;
    var postInfo = '';
    _hmt.push(['_trackEvent', 'pc_list_apply_button', 'click', postId]);
    isProfile = '';
    userHeight = '';
    userWeight = '';
    userAddr = '';
    userHealth = '';
    userWorkEx = '';
    //初始化操作
    window.winHigh = 0;
    window.jobEx = '';
    window.DEMAND = '';
    window.maxDate = 0;
    window.step = 0;
    window.RESTRICTWIN = false;
    window.deadTime = 0;
    window.isImgCodeTrue = 0;
    window.isStepTrue = 0;
    showApplyWin('hide');
    clearApplyInfo();
    clearError();
    $.ajax({
        'type': 'GET',
        'url': 'http://www.doumi.com/api/v1/client/getpostdetail/' + postId + '?isLogin=' + window.USER_ID,
        'asycn': false,
        'dataType': 'json',
        'success': function (json) {
            postInfo = json;
            userWorkEx = json.ex_workEx;
            window.DEMAND = json.personnelRestrict;
            //通用信息处理
            var jobType = json.jobType;
            var postAdType = json.adType;
            var postAdTypeSpecial = json.adType_special;
            if (postAdType == 1 && postAdTypeSpecial != 1) {
                directApplyFun(postId, postAdType);
                return false;
            }
            //工作时间
            var workTimeStr = '';
            if (json.jobDateType == 0) {
                window.maxDate = json.endTime;
                if (json.endTime == 0 || json.startTime == 0) {
                    var startTimeArr = json.startTimeStr.split(".");
                    var endTimeArr = json.endTimeStr.split(".");
                    var startDateStr = startTimeArr[0] + "月" + startTimeArr[1] + "日";
                    var endDateStr = endTimeArr[0] + "月" + endTimeArr[1] + "日";
                    workTimeStr = startDateStr + '-' + endDateStr + ' (共 1 天)';
                } else {
                    workTimeStr = dateFormat(json.startTime, json.endTime);
                }
            } else if (json.jobDateType == 1) {
                workTimeStr = json.longterm;
            }
            $('.apply_win_work_time').text(workTimeStr);
            //工作需求
            var jobDemand = '';
            var arrLength = json.demandTags.length;
            var glue = ',';
            for (var i in json.demandTags) {
                if (parseInt(i) + 1 == arrLength) {
                    glue = '';
                }
                if (i > 6) {
                    window.winHigh += 10;
                }
                jobDemand += json.demandTags[i] + glue;
            }
            $('.apply_win_job_demand').text(jobDemand);
            //面试地址
            var optionList = '';
            if (json.addr.length > 1) {
                optionList = '<option value="">请选择工作地点</option>';
            } else {
                $('.post_addr_select').attr("style", "color:#4b4b4b");
            }
            for (var i in json.addr) {
                var glue = '';
                var city = json.addr[i].city_name;
                var address = json.addr[i].address;
                if (city != '') {
                    glue = ' ';
                }
                optionList += '<option value="' + json.addr[i].id + '">' + city + glue + address + '</option>';
            }
            $('.post_addr_select').html(optionList);

            window.winHigh += 133;

            //start
            checkPush('post_addr_select');
            //未登录
            if (window.IS_LOGIN == '') {
                showApplyWin([1, 2, 8, 10,]);
                window.winHigh += 290;
                window.RESTRICTWIN = true;
                checkPush('gender');
                checkPush('realname');
                checkPush('identity');
                checkPush('birthDate');
                checkPush('apply_phone');
                checkPush('apply_code');
                var canApplyNumber = 3;
                var winTitle = '快速报名<span>（今日还可报名<em>' + canApplyNumber + '</em>次）</span><span>有账号<a href="javascript:;" class="apply_login" rel="nofollow">去登录</a></span>';
            }
            //已登录
            if (window.IS_LOGIN != '') {
                //无简历
                if (isProfile == '') {
                    showApplyWin([1, 2, 10,]);
                    window.RESTRICTWIN = true;
                    checkPush('gender');
                    checkPush('realname');
                    checkPush('identity');
                    checkPush('birthDate');
                    window.winHigh += 220;
                }
                window.winHigh += 100;
                var canApplyNumber = '3';
                var winTitle = '快速报名<span>（今日还可报名<em>' + canApplyNumber + '</em>次）</span>';
            }
            //有限制
            if (json.restrict.status || window.RESTRICTWIN) {
                //判断简历和需求差别
                checkRstrict(json.restrict);
            }

            //绑定方法
            $('.jz-checkbox').bind("click", jobExCheckFun);


            //弹出层
            $('#apply_jz_win_show').click();
            //加载视窗高度
            window.winHigh += 40; //提交按钮高度
            $('.js-modal:gt(1) > .js-modal-content').css("height", window.winHigh + "px");
            $('.js-modal:gt(1)').removeClass('modal-account');
            $('.js-modal:gt(1)').addClass('entry-form');
            $('.js-modal-title').html(winTitle);
            //视窗距离top最小值
            var winMarginTop = $('.js-modal:gt(1)').first().offset().top;
            winMarginTop = Math.abs(parseInt(winMarginTop));
            if (winMarginTop < 66) {
                $('.js-modal:gt(1)').first().offset({top: 66});
            }
            //重新绑定报名提交按钮
            $('.doApply').unbind("click");
            $('.doApply').bind("click", {
                doApplyPostId: postId,
                jobTypeId: jobType,
                postAdType: postAdType
            }, doApplyFun);
//end
        },
        'error': function (json) {
            $('.js-modal-close').trigger('click');
            alert('服务器繁忙，请稍后再试');
            return false;
        }
    });

}


//获取报名信息
var getApplyInfo = function (action) {
    var applyInfo = new Array();
    var applyInfoStr = '';
    var glus = '&';
    applyInfo['district'] = $('select[name="district"]:last').val();
    applyInfo['street'] = $('select[name="street"]:last').val();
    applyInfo['name'] = $('input[name="realname"]:last').val();
    applyInfo['gender'] = $('input[name="gender"]:checked').val();
    applyInfo['birthDate'] = $('select[name="birthDate"]:last').val();
    applyInfo['identity'] = $('input[name="identity"]:checked').val();
    applyInfo['jobEx'] = window.jobEx;
    applyInfo['health'] = $("input[name='health']:checked").val();
    applyInfo['height'] = $('input[name="height"]:last').val();
    applyInfo['weight'] = $('input[name="weight"]:last').val();
    applyInfo['entryDate'] = $('input[name="entryDate"]:last').val();
    applyInfo['register'] = window.USER_ID;
    applyInfo['personnel_demand'] = window.DEMAND;
    if (action == 'str') {
        var length = applyInfo.length;
        var step = 0;
        for (key in applyInfo) {
            if (step + 1 == length) {
                glus = '';
            } else {
                step++;
            }
            applyInfoStr += key + '=' + applyInfo[key] + glus;
        }
        return applyInfoStr;
    }
    return applyInfo;
}

var clearApplyInfo = function () {
    $('option[name="districtDefined"]:last').attr({disabled: "false", selected: "selected"});
    $('select[name="street"]:last').html('<option value="0" name="streetDefined">商圈</option>');
    $('input[name="realname"]:last').val('');
    $('input[name="gender"]').attr('checked', false);
    $('input[name="identity"]').attr('checked', false);
    $('input[name="health"]').attr('checked', false);
    $('.dateOfbirth:last').attr({selected: "selected"});
    $('select').attr("style", "color:#aaa");
    $('input[name="jobEx"]:last').val('');
    $('input[name="height"]:last').val('');
    $('input[name="weight"]:last').val('');
    $('input[name="entryDate"]:last').val('');
    $('input[name="apply_phone"]:last').val('');
    $('input[name="apply_code"]:last').val('');
    $('input[name="apply_qcode"]:last').val('');
};

var clearError = function () {
    $('span[name="workAddrError"]:last').text('');
    $('span[name="nameError"]:last').text('');
    $('span[name="genderError"]:last').text('');
    $('span[name="birthError"]:last').text('');
    $('span[name="identityError"]:last').text('');
    $('span[name="heightError"]:last').text('');
    $('span[name="weightError"]:last').text('');
    $('span[name="demandError"]:last').text('');
    $('span[name="addrError"]:last').text('');
    $('span[name="entryDateError"]:last').text('');
    $('span[name="healthError"]:last').text('');
    $("span[name='qcodeError']").text('');
    $("span[name='qcodeErrorLast']:last").hide();
    $('.phoneError:last').text('');
    $('.codeError:last').text('');
};

//提交报名
var doApplyFun = function (event) {
    if (!doCheck()) {
        return false;
    }
    if (window.USER_ID == '' || !window.USER_ID) {
        var isLogin = window.doApplyLogin();
        if (!isLogin) {
            return false;
        }
    }
    var postId = event.data.doApplyPostId;
    var postAdType = event.data.postAdType;
    var addressId = $('select[name=post_addr_select]:last').val();
    var applyInfo = getApplyInfo('str');
    var applyInfoArr = getApplyInfo();

    var jobType = event.data.jobTypeId;
    $.ajax({
        'type': 'POST',
        'url': 'http://www.doumi.com/api/v1/client/newapply/' + postId + '?addr_id=' + addressId + '&jobType=' + jobType,
        'data': applyInfo,
        'async': false,
        'dataType': 'json',
        'success': function (json) {
            if (json.can_apply != -104 || (json.code == -104 && json.name == 'ApplyError')) {
                $("div[name='restrict_text']").parent().attr("style", "display:block;");
                $("div[name='restrict_text']").text(json.message);
                $('.js-modal-close').trigger('click');
                $('.js-modal:gt(1)').removeClass('entry-form');
                $('.js-modal:gt(1)').addClass('modal-account');
                $('.js-modal-title').html('提示');
                $('.apply_restrict_error').trigger("click");
            }
            if (json.can_apply == -104) {
                if (window.WHEREISPAGE == 'detail') {
                    window.location.href = "http://www.doumi.com/uc/bsuc/?jtype=" + jobType + "&postId=" + postId + "&applyId=" + json.id;
                } else {
                    $('#isApplySuccessWin').attr('data', postId);
                    $('#isApplySuccessWin').attr('data-adtype', postAdType);
                    $('#isApplySuccessWin').trigger("click");
                }
            }
            return false;
        },
        'error': function (json) {
            $('.js-modal-close').trigger('click');
            var data = $.parseJSON(json.responseText);
            if (-208 == data.code) {
                window.alert(data.message);
                window.location.reload();
                return false;
            }

            if (data.code == -106) {
                $("div[name='restrict_text']").html('每人每天最多投递<em style="color: #fd8000;margin: 0 3px">3</em>个职位,您已经投递满<em style="color: #fd8000;margin: 0 3px">3</em>个职位');
            } else {
                $("div[name='restrict_text']").text(data.message);
            }
            $('.js-modal-close').trigger('click');
            $('.js-modal:gt(1)').removeClass('entry-form');
            $('.js-modal:gt(1)').addClass('modal-account');
            $('.js-modal-title').html('提示');
            $('.apply_restrict_error').trigger("click");

            //alert('服务器繁忙，提交报名申请失败，请稍后再试');
            return false;
        }
    });

}

//快速提交报名
var directApplyFun = function (postId, jobTypeId) {
    if (window.USER_ID == '' || !window.USER_ID) {
        $(".jz_lg:last").click();
        return false;
    }
    var postId = postId;
    var applyInfo = getApplyInfo('str');
    var applyInfoArr = getApplyInfo();
    var jobType = jobTypeId;

    $.ajax({
        'type': 'POST',
        'url': 'http://www.doumi.com/api/v1/client/newapply/' + postId + '?jobType=' + jobType,
        'data': applyInfo,
        'async': false,
        'dataType': 'json',
        'success': function (json) {
            if (json.can_apply != -104 || (json.code == -104 && json.name == 'ApplyError')) {
                $("div[name='restrict_text']").text(json.message);
                $('.js-modal-close').trigger('click');
                $('.js-modal:gt(1)').removeClass('entry-form');
                $('.js-modal:gt(1)').addClass('modal-account');
                $('.js-modal-title').html('提示');
                $('.apply_restrict_error').trigger("click");
            }
            if (json.can_apply == -104) {
                if (window.WHEREISPAGE == 'detail_58') {
                    $('#isApplySuccessWin').attr('data-adtype', jobType);
                    $('#isApplySuccessWin').attr('data', postId);
                    $('#isApplySuccessWin').trigger("click");
                } else {
                    window.location.href = "http://www.doumi.com/uc/bsuc/?jtype=" + jobType + "&postId=" + postId + "&applyId=" + json.id;
                }
            }
            return false;
        },
        'error': function (json) {
            $('.js-modal-close').trigger('click');
            var data = $.parseJSON(json.responseText);
            if (data.code == -106) {
                $("div[name='restrict_text']").html('每人每天最多投递<em style="color: #fd8000;margin: 0 3px">3</em>个职位,您已经投递满<em style="color: #fd8000;margin: 0 3px">3</em>个职位');
            } else {
                $("div[name='restrict_text']").text(data.message);
            }
            $('.js-modal-close').trigger('click');
            $('.js-modal:gt(1)').removeClass('entry-form');
            $('.js-modal:gt(1)').addClass('modal-account');
            $('.js-modal-title').html('提示');
            $('.apply_restrict_error').trigger("click");
            //alert('服务器繁忙，提交报名申请失败，请稍后再试');
            return false;
        }
    });
}
var dateFormat = function (a, b) {
    if (typeof a === 'number' || typeof b === 'number') {
        a = String(a);
        b = String(b);
    }
    var startYear = a.substr(0, 4);
    var startMonth = a.substr(4, 2);
    var startDay = a.substr(6);
    var endYear = b.substr(0, 4);
    var endMonth = b.substr(4, 2);
    var endDay = b.substr(6);
    var dateStr, startDateStr, endDateStr;

    var startTime = new Date(startYear + '/' + startMonth + '/' + startDay).getTime();
    var endTime = new Date(endYear + '/' + endMonth + '/' + endDay).getTime();
    var dayDiff = Math.floor(Math.abs(endTime - startTime) / 1000 / 60 / 60 / 24 + 0.5);

    startDateStr = startMonth + "月" + startDay + "日";
    endDateStr = endMonth + "月" + endDay + "日";
    dateStr = startDateStr + '-' + endDateStr + ' (共' + dayDiff + '天)';
    return dateStr;
}

//选择工作经验方法
var jobExCheckFun = function () {
    var job_ex = $('input[name="jobEx"]:last').val();
    var tmp_ex = $(this).parent().text() + ' ';
    var tmp_ex_val = $(this).val() + '|';
    if ($(this).attr("checked") == "checked") {
        job_ex += tmp_ex;
        window.jobEx += tmp_ex_val;
    } else {
        job_ex = job_ex.replace(tmp_ex, '');
        window.jobEx = window.jobEx.replace(tmp_ex_val, '');
    }
    $('input[name="jobEx"]:last').val(job_ex);
    $('input[name="jobEx"]:last').blur();
};

//弹出窗口
var showApplyWin = function (showList) {
    if (typeof showList == 'string') {
        if (showList == 'show') {
            $('.win_apply_login').show();
            $('.apply_win_content').show();
            $('.apply_win_restrict_addr').show();
            $('.apply_win_restrict_name_sex').show();
            $('.apply_win_restrict_age_identity').show();
            $('.apply_win_restrict_work_ex').show();
            $('.apply_win_restrict_healthcert').show();
            $('.apply_win_restrict_height_weight').show();
            $('.apply_win_restrict_height').show();
            $('.apply_win_restrict_height_weight').show();
            $('.apply_win_restrict_weight').show();
            $('.apply_win_restrict_entry_date').show();
            return false;
        }
        if (showList == 'hide') {
            $('.win_apply_login').hide();
            $('.apply_win_content').hide();
            $('.apply_win_restrict_addr').hide();
            $('.apply_win_restrict_name_sex').hide();
            $('.apply_win_restrict_age_identity').hide();
            $('.apply_win_restrict_work_ex').hide();
            $('.apply_win_restrict_healthcert').hide();
            $('.apply_win_restrict_height_weight').hide();
            $('.apply_win_restrict_height').hide();
            $('.apply_win_restrict_height_weight').hide();
            $('.apply_win_restrict_weight').hide();
            $('.apply_win_restrict_entry_date').hide();
            $("div[name='win_apply_img_code']").hide();
            return false;
        }
    }
    for (var i in showList) {
        switch (showList[i]) {
            case 1 :
                $('.apply_win_restrict_name_sex').show();
                break;
            case 2 :
                $('.apply_win_restrict_age_identity').show();
                break;
            case 3 :
                $('.apply_win_restrict_work_ex').show();
                break;
            case 4 :
                $('.apply_win_restrict_healthcert').show();
                break;
            case 5 :
                $('.apply_win_restrict_height_weight').show();
                $('.apply_win_restrict_height').show();
                break;
            case 6 :
                $('.apply_win_restrict_height_weight').show();
                $('.apply_win_restrict_weight').show();
                break;
            case 7 :
                $('.apply_win_restrict_entry_date').show();
                break;
            case 8 :
                $('.win_apply_login').show();
                break;
            case 9 :
                $('.apply_win_restrict_addr').show();
                break;
            case 10:
                $('.apply_win_content').show();
                break;
            default:
        }
    }
}

//校验数组
var checkPush = function (item) {
    window.checkArr.push(item);
}
var doCheck = function () {
    var flag = true;
    window.checkFlag = new Array();
    for (var i in window.checkArr) {
        $("select[name='" + checkArr[i] + "']:last").blur();
        $("input[name='" + checkArr[i] + "']:last").blur();
    }

    for (var i in window.checkFlag) {
        if (!window.checkFlag[i]) {
            flag = false;
        }
    }

    return flag;
}

//报名限制
var checkRstrict = function (personnelDemand) {
    var isHeightDemandShow = true;
    var isRestrictShow = false;
    if (personnelDemand.bm_address && !userAddr) {
        window.winHigh += 50;
        isRestrictShow = true;
        checkPush('street');
        checkPush('district'); //加入验证数组
        $('.apply_win_restrict_addr').show();
    }
    if (personnelDemand.bm_experience && userWorkEx == 0) {
        var jobExHtml = '';
        $('input[name="jobEx"]:last').val('');
        for (var i in personnelDemand.experienceinfo) {
            jobExHtml += '<li><label>';
            jobExHtml += '<input class="jz-checkbox" type="checkbox" name="job_tag" value="';
            jobExHtml += personnelDemand.experienceinfo[i].id + '"';
            var jobExId = parseInt(personnelDemand.experienceinfo[i].id);
            if ($.inArray(jobExId, personnelDemand.work_exp) != -1) {
                jobExHtml += ' checked="checked"';
                var tmps = $('input[name="jobEx"]:last').val();
                tmps = tmps + personnelDemand.experienceinfo[i].title + ' ';
                $('input[name="jobEx"]:last').val(tmps);
                window.jobEx += personnelDemand.experienceinfo[i].id + '|';
            }
            jobExHtml += '>';
            jobExHtml += personnelDemand.experienceinfo[i].title;
            jobExHtml += '</label></li>';
        }
        window.winHigh += 50;
        isRestrictShow = true;
        checkPush('jobEx');
        $('.jz-sel-option').hide();
        $('.jz-sel-option > ul').html(jobExHtml);
        $('.apply_win_restrict_work_ex').show();
    }
    if (personnelDemand.bm_healthcards && (userHealth == '0' || !userHealth)) {
        window.winHigh += 50;
        isRestrictShow = true;
        checkPush('health');
        $('.apply_win_restrict_healthcert').show();
    }
    if (personnelDemand.bm_weight && (userWeight == '0' || !userWeight)) {
        if (isHeightDemandShow) {
            window.winHigh += 50;
            $('.apply_win_restrict_height_weight').show();
            isHeightDemandShow = false;
        }
        isRestrictShow = true;
        checkPush('weight');
        $('.apply_win_restrict_weight').show();
    }
    if (personnelDemand.bm_height && (userHeight == '0' || !userHeight)) {
        if (isHeightDemandShow) {
            window.winHigh += 50;
            $('.apply_win_restrict_height_weight').show();
        }
        isRestrictShow = true;
        checkPush('height');
        $('.apply_win_restrict_height').show();
    }
    if (personnelDemand.bm_workdate) {
        window.winHigh += 50;
        isRestrictShow = true;
        checkPush('entryDate');
        $('.apply_win_restrict_entry_date').show();
    }
    if (isRestrictShow || window.RESTRICTWIN) {
        window.winHigh += 70;
        if (window.RESTRICTWIN) {
            window.winHigh += 50;
        }
        $('.apply_win_content').show();
    }
};

// 获取商圈
var getStreetsOption = function (districtId) {
    $.ajax({
        'type': 'GET',
        'url': 'http://www.doumi.com/api/v1/client/streets/' + districtId,
        'dataType': 'json',
        'success': function (json) {
            var optionHtml = '';
            for (var i in json.streets) {
                if (i == 0) {
                    continue;
                }
                optionHtml += '<option value="' + json.streets[i].id + '">';
                optionHtml += json.streets[i].name + '</option>';
            }
            window.districtOption[districtId] = optionHtml;
            $('.street-option').html(window.districtOption[districtId]);
            return true;
        },
        'error': function (json) {
            //$('.js-modal-close').trigger('click');
            alert('服务器繁忙，请稍后再试');
            return false;
        }
    });
}

//创建出生年份下拉菜单
var createDateOfBirthOption = function () {
    var y = new Date().getFullYear();
    var str = '';
    for (var i = (y - 15); i > (y - 80); i--) //以今年为准到前15年到80年
    {
        var age = y - i;
        str += "<option value='" + i + "-01'> " + i + " 年" + "</option>\r\n";
    }
    $('.dateOfbirth:last').after(str);
}

//日历
GJ.use('jquery', function () {
    GJ.use('datepickerOfClass.js'/*tpa=http://www.doumi.com/hz/js/util/datepicker/datepickerOfClass.js*/, function () {
        var date = new Date();
        var maxDate = date.getDate() + 30;
        GJ.datepicker({
            containerClass: 'job_entry_date',
            defaultDate: date,
            minDate: date,
            maxDate: maxDate,
            onSelect: function (dateText, inst) {
                $("input[name='entryDate']:last").val(dateText);
            }
        });
    });
});

//取消报名&报名成功弹窗
GJ.use('modal.css'/*tpa=http://www.doumi.com/hz/panel,js/util/modal/modal.js, js/util/modal/modal.css*/, function (Modal) {
    $(".chk").click(function () {
        var goUrl = $(this).attr('url');
        window.location.href = goUrl;
    });

    $(".word-jiang-ico").mouseover(function () {
        $(this).next().show();
    }).mouseout(function () {
        $(this).next().hide();
    });

    $(".check_phone").click(function () {
        var pid = $(this).attr('data');
        //百度统计
        _hmt.push(['_trackEvent', 'pc_list_checkphone_button', 'click', pid]);
        var userId = '';
        if (userId == '') {
            $('.jz_lg').trigger('click');
            return false;
        }

        $(this).hide();
        $('.apply_tel_' + pid).show();
    });

    $('#isApplySuccessWin').live("click", function () {

        $('.js-modal-close').trigger('click'); //关闭所有弹窗
        var postId = $('#isApplySuccessWin').attr("data");
        var postAdType = $('#isApplySuccessWin').attr("data-adtype");
        var caSource = "";

        var successUrl = "http://www.doumi.com/post/applySuccess/apply/" + postId + '/' + caSource;

        if (typeof postId == 'undefine' || postId == '') return false;

        if (postAdType == 1) {
            var width = 400;
            var height = 250;
        } else {
            var width = 510;
            var height = 415;
        }
        GJ.panel({
            title: '报名成功'
            , url: successUrl
            , iframe: true
            , style: 'text'
            , mask: true
            , width: width
            , height: height
            , onClose: function () {
                $('.js-modal-close').trigger('click');
                window.top.location.reload();
            }
        });
    });

    $('.apply_cancel_class').click(function () {
        var postId = $(this).attr('data');
        var panel = GJ.confirm({
            title: '取消报名'
            , content: '确定要取消报名吗？'
            , mask: true
            , width: 300
            , height: 150
            , onClose: function () {
            },
            onSubmit: function () {
                $.ajax({
                    'type': 'PUT',
                    'url': 'http://www.doumi.com/api/v1/client/apply/' + postId,
                    'dataType': 'json',
                    'success': function (json) {
                        window.location.reload();
                    },
                    'error': function (json) {
                        var jsonmsg = $.parseJSON(json.responseText);

                        if (-208 == jsonmsg.code) {
                            window.alert(jsonmsg.message);
                        }
                        window.location.reload();
                    }
                });

            },
            onCancel: function () {
            }
        });
    });

});