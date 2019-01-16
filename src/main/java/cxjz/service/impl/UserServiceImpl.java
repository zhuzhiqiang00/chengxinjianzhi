package cxjz.service.impl;

import com.soh.frame.model.Result;
import com.soh.frame.web.user.UserInfoImpl;
import cxjz.dao.UserMapper;
import cxjz.model.User;
import cxjz.modelSelf.LoginSelf;
import cxjz.service.intf.UserServiceIntf;
import cxjz.util.FinalUtil;
import cxjz.util.UUIDGenerator;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

@Service("userService")
public class UserServiceImpl implements UserServiceIntf {
	@Resource
	private UserMapper userMapper;

	public User getUserById(String userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	//用户注册
	public Result<Integer> userRegister (String strStudNo,String strPassWord,String strPhoneNum,String strValidationCodeCache,String strValidationCode)throws Exception{
		Result<Integer> result = null;
		try {
			User dBuser = userMapper.selectUserByStudNo(strStudNo);
			if(dBuser == null){
				if(strValidationCodeCache.equals(strValidationCode)){
					User user = new User();
					String strUserId = UUIDGenerator.getUUID();
					user.setUserId(strUserId);
					user.setState(FinalUtil.STATE.STATE1);
					user.setPassword(strPassWord);
					user.setStudNo(strStudNo);
					user.setPhoneNum(strPhoneNum);
					Date data = new Date();
					user.setCreateDate(data);
					userMapper.insertSelective(user);
					result = Result.buildSucc(null);
				}else {
					return Result.buildFail("验证码错误，请重新输入！！！");
				}
			}else{
				result = Result.buildFail("账号注册失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = Result.buildFail("用户注册失败{}");
		}
		return result;
	}

		//用户是否注册
		public Result<Integer> isRegisted (String strStudNo)throws Exception{
			Result<Integer> result = null;
			try {
				User user = userMapper.selectUserByStudNo(strStudNo);
				if(user != null){
					result = Result.buildSucc(1);
				}else {
					result = Result.buildSucc(0);
				}
			} catch (Exception e) {
				e.printStackTrace();
				result = Result.buildFail("用户是否注册失败{}");
			}
			return result;
		}


		//密码重置
		public Result<Integer> reSetPassword (String strStudNo,String strPassWord,String strPhoneNum,String strOriginalPassword,String strValidationCodeCache,String strValidationCode)throws Exception{
			Result<Integer> result = null;
			try {
				User user = userMapper.selectUserByStudNo(strStudNo);
				if(user != null){
					if(user.getPhoneNum().equals(strPhoneNum)){
						if(user.getPassword().equals(strOriginalPassword)){
							if(strValidationCodeCache.equals(strValidationCode)){
								User userNew = new User();
								userNew.setUserId(user.getUserId());
								userNew.setPassword(strPassWord);
								userMapper.updateByPrimaryKeySelective(userNew);
								result = Result.buildSucc(null);
							}else {
								return Result.buildFail("验证码输入错误，请重新输入！！！");
							}
						}else {
							return Result.buildFail("该账号原始密码输入错误，请重新输入！！！");
						}
					}else {
						return Result.buildFail("该账号绑定的手机号输入错误，请重新输入！！！");
					}
				}else {
					return Result.buildFail("该学号用户不存在，请重新输入！！！");
				}
			} catch (Exception e) {
				e.printStackTrace();
				result = Result.buildFail("密码重置{}");
			}
			return result;
		}


		//用户登录
		public Result<LoginSelf> loginIn (String strStudNo, String strPassWord)throws Exception{
			Result<LoginSelf> result = null;
			try {
				User user = userMapper.selectUserByStudNo(strStudNo);
				if(user != null){
					String passWord = user.getPassword();
					if(passWord.equals(strPassWord)){
						LoginSelf loginSelf = new LoginSelf();
						UserInfoImpl curUser = new UserInfoImpl();
						curUser.setStrUserId(user.getUserId());
						curUser.setStrLoginName(user.getStudNo());
						loginSelf.setCurUser(curUser);
						loginSelf.setStrUserId(user.getUserId());
						loginSelf.setStrHeadUrl(user.getHeadUrl());
						result = Result.buildSucc(loginSelf);
					}else{
						result = Result.buildFail("账号或密码错误!!!");
					}
				}else {
					result = Result.buildFail("账号或密码错误!!!");
				}
			} catch (Exception e) {
				e.printStackTrace();
				result = Result.buildFail("用户登录失败{}");
			}
			return result;
		}


	//redis测试
	@Cacheable("users")
	public Result<Integer> redisTest (String strStudNo)throws Exception{
		Result<Integer> result = null;
		try {
			User user = userMapper.selectUserByStudNo(strStudNo);
		} catch (Exception e) {
			e.printStackTrace();
			result = Result.buildFail("redis测试失败{}");
		}
		return result;
	}

	/**
	 * 用户头像更新
	 */
	public Result<Integer> updateUserHeadUser(Map<String,String> map)throws Exception{
		Result<Integer> result = null;
		try {
			userMapper.updateUserHeadUser(map);
		}catch (Exception e){
			e.printStackTrace();
			result = Result.buildFail("用户头像更新失败");
		}
		return result;
	}

}
