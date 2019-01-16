package cxjz.service.intf;

import java.io.File;

/**
 * FTP服务器接口
 * Created by Administrator on 2018/10/24 0024.
 * @author ZhuZhiQiang
 */
public interface FtpFileServiceIntf {
    //ftp 文件上传
    public void ftpUpload(File srcFile, String fileName, String foldName)throws Exception;
}
