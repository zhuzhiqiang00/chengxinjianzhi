package cxjz.service.impl;

import cxjz.service.intf.FtpFileServiceIntf;
import cxjz.util.FinalUtil;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * ftp服务器service层
 * Created by Administrator on 2018/10/24 0024.
 * @author ZhuZhiQiang
 */
@Service
public class FtpFileServiceImpl implements FtpFileServiceIntf{
    /**本地字符集编码*/
    private static final String LOCAL_CHARSET = "GBK";

    /**ftp 服务器字符集编码*/
    private static final String SERVER_CHARSET = "ISO-8859-1";

    public void ftpUpload(File srcFile, String fileName, String foldName) throws Exception{
        FTPClient ftpClient = new FTPClient();
        FileInputStream fis = null;
        String charset = LOCAL_CHARSET;
        try {

            ftpClient.connect(FinalUtil.SERVER_URL);
            ftpClient.login(FinalUtil.SERVER_NAME, FinalUtil.SERVER_PASSWORD);

            fis = new FileInputStream(srcFile);
            // 设置上传目录
            ftpClient.changeWorkingDirectory(foldName);
            ftpClient.setBufferSize(1024);
            ftpClient.enterLocalPassiveMode();
            if (FTPReply.isPositiveCompletion(ftpClient.sendCommand("OPTS UTF8", "ON"))) {
                // 开启服务器对UTF-8的支持，如果服务器支持就用UTF-8编码，否则就使用本地编码（GBK）.
                charset = "UTF-8";
            }
            ftpClient.setControlEncoding(charset);
            fileName = new String(fileName.getBytes(charset),SERVER_CHARSET);
            // 设置文件类型（二进制）
            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
            ftpClient.storeFile(fileName, fis);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                ftpClient.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
