package cxjz.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.soh.frame.model.Result;
import com.soh.frame.util.HttpUtil;
import cxjz.model.User;
import cxjz.modelSelf.LoginSelf;
import cxjz.service.intf.FtpFileServiceIntf;
import cxjz.service.intf.UserServiceIntf;
import cxjz.util.FinalUtil;
import cxjz.util.RedisUtil;
import cxjz.util.SFTPUtils;
import cxjz.util.ValidationCode;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/login")
public class LoginController {
    private static transient Logger log = LoggerFactory.getLogger(LoginController.class);
    @Resource
    private UserServiceIntf userService;
    @Autowired
    private FtpFileServiceIntf ftpFileServiceIntf;
//    @Autowired
//    private RedisUtil redisUtil;

    @RequestMapping(value = {"toIndex", ""})
    public String toIndex(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        try {
            String strUserId = HttpUtil.getAsString(request, "id");
            User user = userService.getUserById(strUserId);
            model.addAttribute("user", user);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("");
        }
        return "login";
    }

    @RequestMapping("/toRegister")
    public String toRegister(HttpServletRequest request, Model model) {
        try {
            String strUserId = HttpUtil.getAsString(request, "id");
            User user = userService.getUserById(strUserId);
            model.addAttribute("user", user);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("");
        }
        return "register1";
    }

    @RequestMapping("/toModifyPwd")
    public String toModifyPwd(HttpServletRequest request, Model model) {
        try {
            String strUserId = HttpUtil.getAsString(request, "id");
            User user = userService.getUserById(strUserId);
            model.addAttribute("user", user);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("");
        }
        return "modifyPwd";
    }

    /**
     * 显示验证码
     *
     * @param request
     * @param response
     */
    @ResponseBody
    @RequestMapping("/showValidationCode")
    public void showUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            ValidationCode validationCode = new ValidationCode();
            validationCode.doPost(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("");
        }
    }


    /**
     * 注册
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/register")
    public Object register(HttpServletRequest request, HttpServletResponse response) {
        Result<Integer> result = null;
        try {
            String strValidationCodeCache = (String) request.getSession().getAttribute("validation_code");
            String strValidationCode = HttpUtil.getAsString(request,"validationCode");
            String strStudNo = HttpUtil.getAsString(request, "studNo");
            String strPassWord = HttpUtil.getAsString(request, "password");
            String strPhoneNum = HttpUtil.getAsString(request, "phoneNum");
            result = userService.userRegister(strStudNo, strPassWord, strPhoneNum,strValidationCodeCache,strValidationCode);
            if (result.isSuccess()) {
                return "login";
            }
        } catch (Exception e) {
            String strErrorMsg = "注册失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
        }
        return "register1";
    }


    /**
     * 用户是否注册
     *
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("/isRegisted")
    public Result<Integer> isRegisted(HttpServletRequest request, HttpServletResponse response) {
        Result<Integer> result = null;
        try {
            String strStudNo = HttpUtil.getAsString(request, "studNo");
            result = userService.isRegisted(strStudNo);
        } catch (Exception e) {
            String strErrorMsg = "用户是否注册失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
        }
        return result;
    }


    /**
     * 密码重置
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/reSetPassword")
    public Object reSetPassword(HttpServletRequest request, HttpServletResponse response) {
        Result<Integer> result = null;
        try {
            String strValidationCodeCache = (String) request.getSession().getAttribute("validation_code");
            String strValidationCode = HttpUtil.getAsString(request,"validationCode");
            String strStudNo = HttpUtil.getAsString(request, "studNo");
            String strOriginalPassword = HttpUtil.getAsString(request, "originalPassword");
            String strPassword = HttpUtil.getAsString(request, "password");
            String strPhoneNum = HttpUtil.getAsString(request, "phoneNum");
            result = userService.reSetPassword(strStudNo, strPassword, strPhoneNum, strOriginalPassword,strValidationCodeCache,strValidationCode);
        } catch (Exception e) {
            String strErrorMsg = "密码重置失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
        }
        return "login";
    }

    /**
     * 登录
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("/loginIn")
    public Object  loginIn(HttpServletRequest request, HttpServletResponse response, Model model) {
            Result<LoginSelf> result = null;
        try {
            String strStudNo = HttpUtil.getAsString(request, "studNo");
            String strPassword = HttpUtil.getAsString(request, "password");
            String strRemember = HttpUtil.getAsString(request,"remember");

             result = userService.loginIn(strStudNo, strPassword);
            if (result.isSuccess()) {
                LoginSelf loginSelf =  result.getData();
                HttpSession session = request.getSession();
                String strSessionId = session.getId();
                loginSelf.setSessionId(strSessionId);
                request.getSession().setAttribute("user", loginSelf);
                Cookie cookie = new Cookie("strSessionId", strSessionId);
                cookie.setMaxAge(30 * 60);
                cookie.setPath("/");
                response.addCookie(cookie);
                Cookie nameCookie = new Cookie("studNo", strStudNo);
                cookie.setMaxAge(30 * 60);
                cookie.setPath("/");
                response.addCookie(nameCookie);
                Cookie passwordCookie = new Cookie("password", strPassword);
                cookie.setMaxAge(30 * 60);
                cookie.setPath("/");
                response.addCookie(passwordCookie);
                Cookie rememberCookie = new Cookie("remember", strRemember);
                cookie.setMaxAge(30 * 60);
                cookie.setPath("/");
                response.addCookie(rememberCookie);
                return JSON.toJSON(result);
            }
        } catch (Exception e) {
            String strErrorMsg = "用户登录失败{}";
            log.error(strErrorMsg, e);
        }
        return JSON.toJSON(result);
    }

    /**
     * 登录转向
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/loginInForward")
    public  Object loginInForward(HttpServletRequest request, HttpServletResponse response) {
       try{
           return "cxjz";
        } catch (Exception e) {
            String strErrorMsg = "用户登录失败{}";
            log.error(strErrorMsg, e);
        }
        return null;
    }



    /**
     * 用户登出
     *
     * @param request
     * @param response
     * @return
     */
    @SuppressWarnings("finally")
    @RequestMapping("/loginOut")
    public Object loginOut(HttpServletRequest request, HttpServletResponse response) {
        try {
            LoginSelf loginSelf = (LoginSelf) request.getSession().getAttribute("user");
            String strSessionId = loginSelf.getSessionId();
            request.getSession().invalidate();
            Cookie cookie = new Cookie("strSessionId", strSessionId);
            cookie.setPath("/");
            cookie.setMaxAge(0);
            Cookie cookie1 = new Cookie("JSESSIONID", strSessionId);
            cookie1.setPath("/");
            cookie1.setMaxAge(0);
            response.addCookie(cookie);
            response.addCookie(cookie1);
            return "redirect:toIndex";
        } catch (Exception e) {
            String strErrorMsg = "用户登出失败{}";
            log.error(strErrorMsg, e);
        }
        return null;
    }

    /**
     * redis测试
     * @param request
     * @param response
     * @return
     */
    @SuppressWarnings("finally")
    @RequestMapping("/redisTest")
    public Object redisTest(HttpServletRequest request, HttpServletResponse response) {
        Result result = null;
        try {
        String strStudNo = HttpUtil.getAsString(request,"studNo");
        result = userService.redisTest(strStudNo);
        } catch (Exception e) {
            String strErrorMsg = "redis测试失败{}";
            log.error(strErrorMsg, e);
        }
        return result;
    }

    /**
     *图片上传
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @RequestMapping("/uploadPic")
    protected void updateFile(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession httpSession = request.getSession();
        LoginSelf loginSelf = (LoginSelf) httpSession.getAttribute("user");
        String userId = loginSelf.getStrUserId();

        //需要返回的fileName
        String fileName = null;

        //参考资料  http://commons.apache.org/proper/commons-fileupload/using.html
        // Check that we have a file upload request:判断enctype属性是否是“multipart/form-data"，就是是否带文件上传的表单。
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);

        // Create a factory for disk-based file items
        DiskFileItemFactory factory = new DiskFileItemFactory();

        // Configure a repository (to ensure a secure temp location is used)
        ServletContext servletContext = request.getSession().getServletContext();
        File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);

        // Create a new file upload handler
        ServletFileUpload upload = new ServletFileUpload(factory);

        // Parse the request
        File f = null;
        StringBuilder serverPicUrlBuilder = null;
        StringBuilder localPicUrlBuilder = null;
        try {
            List<FileItem> items = upload.parseRequest(request);
            for(FileItem item : items) {
                //其他参数
                String type = item.getContentType();
                if(type == null) {
//					System.out.println(item.getString(item.getFieldName()));
                    continue;
                }

                //文件参数
                fileName = item.getName();

                //设置保存本地文件路径
//                String realPath = request.getServletContext().getRealPath("/img");
                String realPath = "E:"+File.separator+"file";//本地图片地址路径
                File dir = new File(realPath);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                f = new File(dir, fileName);
                if(f.exists()) {
                    f.delete();
                }
                f.createNewFile();
                //保存
                item.write(f);

                //ftp上传文件到服务器
//                ftpFileServiceIntf.ftpUpload(dir,fileName, FinalUtil.SERVER_IMAGE_URL);
                SFTPUtils.getInstance();//连接sftp服务器
                //本地图片全路径
                localPicUrlBuilder = new StringBuilder(realPath);
                localPicUrlBuilder.append(File.separator);
                localPicUrlBuilder.append(fileName);
                SFTPUtils.upload(FinalUtil.SERVER_IMAGE_URL,localPicUrlBuilder.toString());

                //图片上传到服务器的全路径地址
                serverPicUrlBuilder = new StringBuilder(FinalUtil.SERVER_URL);
                serverPicUrlBuilder.append(FinalUtil.STATIC_RESOURCE_PORT);
                serverPicUrlBuilder.append("/image/");
                serverPicUrlBuilder.append(fileName);

                loginSelf.setStrHeadUrl(serverPicUrlBuilder.toString());
                request.getSession().setAttribute("user", loginSelf);
                //将图片地址保存到数据库中
                Map<String,String> map = new HashMap<>();
                map.put("headUrl",serverPicUrlBuilder.toString());
                map.put("userId",userId);
                userService.updateUserHeadUser(map);
                RedisUtil.set(userId+"headUrl",serverPicUrlBuilder.toString());
                //删除本地图片
                f.delete();
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //返回结果
        JSONObject obj = new JSONObject();
        obj.put("fileName", fileName);
        obj.put("src",serverPicUrlBuilder.toString());
        response.getWriter().print(obj.toJSONString());
    }

    /**
     * 解决本地服务器图片跨域问题:将服务器上图片下载下来，转成流传回页面显示
     * @param response
     * @throws IOException
     */
    @RequestMapping("/obtainHeadPic")
    public void testpic(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LoginSelf loginSelf = (LoginSelf) request.getSession().getAttribute("user");
        String imgUrl = loginSelf.getStrHeadUrl();
        URL url = new URL("http://"+imgUrl);
        URLConnection conn = url.openConnection();
        InputStream inStream = conn.getInputStream();
        response.setContentType("image/*"); //设置返回的文件类型
        response.setHeader("Access-Control-Allow-Origin", "*");//设置该图片允许跨域访问
        IOUtils.copy(inStream, response.getOutputStream());
    }


}
