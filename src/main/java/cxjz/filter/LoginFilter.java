package cxjz.filter;

import cxjz.controller.LoginController;
import cxjz.modelSelf.LoginSelf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 登录验证过滤器
 * Created by Administrator on 2018/9/13 0013.
 * @author ZhuZhiQiang
 */
public class LoginFilter implements Filter {
    private static transient Logger log = LoggerFactory.getLogger(LoginController.class);

    @Override
public void init(FilterConfig filterConfig) throws ServletException {
    // TODO Auto-generated method stub

   }
   @Override
 public void doFilter(ServletRequest request, ServletResponse response,
                      FilterChain chain) throws IOException, ServletException {
        // 获得在下面代码中要用的request,response,session对象
      HttpServletRequest servletRequest = (HttpServletRequest) request;
      HttpServletResponse servletResponse = (HttpServletResponse) response;
      HttpSession session = servletRequest.getSession();

    // 获得用户请求的URI
      String path = servletRequest.getRequestURI();

       LoginSelf loginSelf = (LoginSelf) session.getAttribute("user");

       // 登陆页面无需过滤
       if(path.lastIndexOf("/")<1 || path.equals("/login/loginIn") || path.contains(".css") || path.contains(".js") || path.contains(".png") || path.contains(".jpg")
             || path.equals("/login/toRegister") || path.equals("/login/toModifyPwd") || path.equals("/login/showValidationCode")) {
           chain.doFilter(servletRequest, servletResponse);
          return;
      }

      // 判断如果没有取到用户信息,就跳转到登陆页面
     if (loginSelf == null || "".equals(loginSelf)) {
         // 跳转到登陆页面
          servletResponse.sendRedirect("/login");
    } else {
         // 已经登陆,继续此次请求
          chain.doFilter(request, response);
      }
   }

   @Override
 public void destroy() {
       // TODO Auto-generated method stub

   }
}
