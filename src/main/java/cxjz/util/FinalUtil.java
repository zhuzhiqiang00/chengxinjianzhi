package cxjz.util;

public class FinalUtil {
	public static final String SERVER_URL = "118.184.217.230";//服务器地址
	public static final String SERVER_NAME = "root";//服务器用户名
	public static final String SERVER_PASSWORD = "zzq,.7727986";//服务器密码
	public static final String SERVER_IMAGE_URL = "/usr/local/files/image";
	public static final String STATIC_RESOURCE_PORT = ":8081";

	 public interface STATE{
	        public static final Short STATE0 = 0;//失效
	        public static final Short STATE1 = 1;//有效
	    }
	 public interface USER_REGIST_STATE {
	        public static final String USER_REGIST_STATE_UNREGIST = "1";//未注册
	        public static final String USER_REGIST_STATE_REGISTED = "2";//已注册
	    }
	    public interface LOGIN_STATE{
	 		public static final String SIGN_OUT = "0";//登出
	 		public static final String LOGIN = "1";//登录
		}
}
