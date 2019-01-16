package cxjz.service.intf;

import com.soh.frame.model.Result;
import cxjz.model.User;
import cxjz.modelSelf.LoginSelf;

import java.util.Map;

public interface UserServiceIntf {
	User getUserById(String userId);
	//用户注册
	Result<Integer> userRegister(String strStudNo,String strPassWord,String strPhoneNum,String strValidationCodeCache,String strValidationCode) throws Exception;
	//用户是否注册
	Result<Integer> isRegisted(String strStudNo)throws Exception;
	//修改密码
	Result<Integer> reSetPassword(String strStudNo,String strPassWord,String strPhoneNum,String strOriginalPassword,String strValidationCodeCache,String strValidationCode)throws Exception;
	//用户登录
	Result<LoginSelf> loginIn(String strStudNo, String strPassWord)throws Exception;
	//redis测试
	Result<Integer> redisTest(String strStudNo)throws Exception;
	//根据用户id更新用户头像
	Result<Integer> updateUserHeadUser(Map<String,String> map)throws Exception;
}
