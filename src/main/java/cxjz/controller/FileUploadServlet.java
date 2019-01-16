package cxjz.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cxjz.dao.UserMapper;
import cxjz.modelSelf.LoginSelf;
import cxjz.service.intf.UserServiceIntf;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 图片文件上传
 * Created by Administrator on 2018/10/20 0020.
 */
@WebServlet("/FileUploadServlet")
public class FileUploadServlet  extends HttpServlet{

    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println("ppppppppppppppppppp");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession httpSession = request.getSession();
        LoginSelf loginSelf = (LoginSelf) httpSession.getAttribute("user");
        String userId = loginSelf.getStrUserId();

        //需要返回的fileName
        String fileName = null;

        //参考资料  http://commons.apache.org/proper/commons-fileupload/using.html
        // Check that we have a file upload request
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);

        // Create a factory for disk-based file items
        DiskFileItemFactory factory = new DiskFileItemFactory();

        // Configure a repository (to ensure a secure temp location is used)
        ServletContext servletContext = this.getServletConfig().getServletContext();
        File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);

        // Create a new file upload handler
        ServletFileUpload upload = new ServletFileUpload(factory);

        // Parse the request
        File f = null;
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

                //设置保存文件路径
                String realPath = request.getServletContext().getRealPath("/img");
                File dir = new File(realPath);
                f = new File(dir, fileName);

                if(f.exists()) {
                    f.delete();
                }
                f.createNewFile();
                //将图片地址保存到数据库中
//                Map<String,String> map = new HashMap<>();
//                map.put("headUrl",f.toString());
//                map.put("userId",userId);
//                userServiceIntf.updateUserHeadUser(map);

                //保存
                item.write(f);

            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //返回结果
        JSONObject obj = new JSONObject();
        obj.put("fileName", fileName);
        obj.put("src",f);
        response.getWriter().print(obj.toJSONString());
    }

}
