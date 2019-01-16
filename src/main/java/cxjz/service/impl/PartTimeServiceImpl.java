package cxjz.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import cxjz.dao.PartTimePositionMapper;
import cxjz.dao.SignUpMapper;
import cxjz.dao.UserMapper;
import cxjz.model.PartTimePosition;
import cxjz.model.SignUp;
import cxjz.util.FinalUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.soh.common.lang.StringUtil;
import com.soh.frame.model.Result;
import cxjz.modelSelf.PositionListSelf;
import cxjz.modelSelf.SignUpListSelf;
import cxjz.service.intf.PartTimeServiceIntf;
import cxjz.util.UUIDGenerator;

@Service("partTimeService")
public class PartTimeServiceImpl implements PartTimeServiceIntf{
	private static transient Logger log = LoggerFactory.getLogger(PartTimeServiceImpl.class);
	@Autowired
	private PartTimePositionMapper partTimePositionMapper;
	@Autowired
	private SignUpMapper signUpMapper;
	@Autowired
	private UserMapper userMapper;
	/**
	 *分页查询兼职职位
	 */
	public Result<PositionListSelf> queryPartTimePositionList(String strKeyword, int startRow,int pageSize,String headUrl) throws Exception {
		Result<PositionListSelf> result = null;
		try{
			PositionListSelf positionListSelf = new PositionListSelf();
			boolean hasMore = false;
			Result <Integer> resultCount =  selectTimePositionListCount(strKeyword);
			int count = 0;
			if(resultCount != null && resultCount.getData() != null){
				count = resultCount.getData().intValue();
				if((startRow + pageSize )>= count){
					hasMore = false;
				}else {
					hasMore = true;
				}
			}
			Map<String,Object> map = new HashMap<String,Object>();
			if(StringUtil.isNotBlank(strKeyword)){
				if(!"不限".equals(strKeyword)){
					map.put("strKeyword", strKeyword);
				}
			}
			map.put("startRow", startRow);
			map.put("pageSize", pageSize);
			List<PartTimePosition> partTimePositionList = partTimePositionMapper.selectPartTimePostionList(map);
			positionListSelf.setCount(count);
			positionListSelf.setHasMore(hasMore);
			positionListSelf.setPartTimePositionList(partTimePositionList);
			positionListSelf.setHeadUrl(headUrl);
			result = Result.buildSucc(positionListSelf);
		}catch (Exception e) {
			String strErrorMsg = "分页查询兼职职位失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}
	//查询指定情况的兼职职位数量
	public Result<Integer> selectTimePositionListCount(String strKeyword) throws Exception {
		Result<Integer> result = null;
		try{
			int resultNew = 0;
			if("".equals(strKeyword) || strKeyword==null){
				resultNew = partTimePositionMapper.selectPartTimePositionCount(null);
			}else {
				resultNew = partTimePositionMapper.selectPartTimePositionCount(strKeyword);
			}
			 result = Result.buildSucc(resultNew);
		}catch (Exception e) {
			String strErrorMsg = "查询兼职职位数量失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 兼职职位报名
	 * @return
	 * @throws Exception
	 */
	public Result<Integer> partTimePositionApply(String strAge,String strName,String strPhoneNum,String strSex,String strStudentId,String strUserId) throws Exception {
		Result<Integer> result = null;
		try{
			String strSignUpId = UUIDGenerator.getUUID();
			SignUp signUp = new SignUp();
			signUp.setAge(strAge);
			signUp.setCreater(strUserId);
			Date date = new Date();
			signUp.setCreateDate(date);
			signUp.setName(strName);
			signUp.setPhoneNum(strPhoneNum);
			signUp.setSex(strSex);
			signUp.setStudentId(strStudentId);
			signUp.setState(FinalUtil.STATE.STATE1);
			signUp.setSignUpId(strSignUpId);
			signUpMapper.insertSelective(signUp);
			 result = Result.buildSucc(null);
		}catch (Exception e) {
			String strErrorMsg = "兼职职位报名失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 增加兼职职位
	 * @return
	 * @throws Exception
	 */
	public Result<Integer> addPartTimePosition(String strUserId,String strPositionDemand,String strPositionPicUrl,String strPositionSalary,String strPositionSex,String strPositionTitle,String strPositionType,String strWorkLocation,String strWorkTime,String strPositionDesc,String strRecruitmentNum) throws Exception {
		Result<Integer> result = null;
		try{
			String strPartTimePositionId = UUIDGenerator.getUUID();
			PartTimePosition partTimePosition = new PartTimePosition();
			partTimePosition.setCreater(strUserId);
			Date data = new Date();
			partTimePosition.setCreateDate(data);
			partTimePosition.setPartTimePositionId(strPartTimePositionId);
			partTimePosition.setPositionDemand(strPositionDemand);
			partTimePosition.setPositionDesc(strPositionDesc);
			partTimePosition.setPositionPicUrl(strPositionPicUrl);
			partTimePosition.setPositionSalary(Integer.parseInt(strPositionSalary));
			partTimePosition.setPositionSex(strPositionSex);
			partTimePosition.setPositionTitle(strPositionTitle);
			partTimePosition.setPositionType(strPositionType);
			partTimePosition.setWorkTime(strWorkTime);
			partTimePosition.setWorkLocation(strWorkLocation);
			partTimePosition.setRecruitmentNum(Integer.parseInt(strRecruitmentNum));
			partTimePosition.setState(FinalUtil.STATE.STATE1);
			partTimePositionMapper.insert(partTimePosition);
			 result = Result.buildSucc(null);
		}catch (Exception e) {
			String strErrorMsg = "增加兼职职位失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}



	/**
	 * 删除兼职职位
	 * @return
	 * @throws Exception
	 */
	public Result<Integer> deletePartTimePosition(String strPartTimePositionId) throws Exception {
		Result<Integer> result = null;
		try{
			 partTimePositionMapper.deleteByPrimaryKey(strPartTimePositionId);
			 result = Result.buildSucc(null);
		}catch (Exception e) {
			String strErrorMsg = "删除兼职职位信息{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}

	/**
	 * 删除兼职职位报名信息
	 * @return
	 * @throws Exception
	 */
	public Result<Integer> deletePartTimePositionApply(String strSignUpId) throws Exception {
		Result<Integer> result = null;
		try{
			 signUpMapper.deleteByPrimaryKey(strSignUpId);
			 result = Result.buildSucc(null);
		}catch (Exception e) {
			String strErrorMsg = "删除兼职职位报名信息失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 分页查询兼职职位报名信息
	 * @return
	 * @throws Exception
	 */
	public Result<Integer> queryPartTimePositionApply(String strKeyword,int startRow,int pageSize) throws Exception {
		Result<Integer> result = null;
		try{
			SignUpListSelf signUpListSelf = new SignUpListSelf();
			boolean hasMore = false;
			Result <Integer> resultCount =  selectSignUpListCount(strKeyword);
			int count = 0;
			if(resultCount != null && resultCount.getData() != null){
				count = resultCount.getData().intValue();
				if((startRow + pageSize )>= count){
					hasMore = false;
				}else {
					hasMore = true;
				}
			}

			Map<String,Object> map = new HashMap<String,Object>();
			map.put("startRow", startRow);
			map.put("startRow", startRow);
			map.put(strKeyword, strKeyword);
//			List<SignUp> signUpList = signUpMapper.selectSignUpList(map);
			signUpListSelf.setCount(count);
			signUpListSelf.setHasMore(hasMore);
//			signUpListSelf.setSignUpList(signUpList);

			 result = Result.buildSucc(null);
		}catch (Exception e) {
			String strErrorMsg = "分页查询兼职职位报名信息失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}
	//查询兼职职位报名信息数量
	public Result<Integer> selectSignUpListCount(String strKeyword) throws Exception {
		Result<Integer> result = null;
		try{
			int resultNew = 0;
			if("".equals(strKeyword) || strKeyword==null){
//				resultNew = signUpMapper.selectSignUpListCount(null);
			}else {
//				resultNew = signUpMapper.selectSignUpListCount(strKeyword);
			}
			 result = Result.buildSucc(resultNew);
		}catch (Exception e) {
			String strErrorMsg = "查询兼职职位报名信息数量失败{}";
            log.error(strErrorMsg, e);
            result = Result.buildFail(strErrorMsg);
		}
		return result;
	}



}
