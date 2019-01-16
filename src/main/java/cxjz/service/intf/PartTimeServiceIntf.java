package cxjz.service.intf;

import com.soh.frame.model.Result;
import cxjz.modelSelf.PositionListSelf;


public interface PartTimeServiceIntf {
	//兼职职位分页查询
	public Result<PositionListSelf>queryPartTimePositionList(String strKeyword, int startRow, int pageSize,String headUrl)throws Exception;
	//兼职职位报名
	public Result<Integer>partTimePositionApply(String strAge,String strName,String strPhoneNum,String strSex,String strStudentId,String strUserId)throws Exception;
	//兼职职位增加
	public Result<Integer>addPartTimePosition(String strUserId,String strPositionDemand,String strPositionPicUrl,String strPositionSalary,String strPositionSex,String strPositionTitle,String strPositionType,String strWorkLocation,String strWorkTime,String strPositionDesc,String strRecruitmentNum)throws Exception;
	//删除兼职职位
	public Result<Integer>deletePartTimePosition(String strPartTimePositionId)throws Exception;
	//删除兼职职位报名信息
	public Result<Integer>deletePartTimePositionApply(String strSignUpId)throws Exception;
	//分页查询兼职职位报名信息
	public Result<Integer>queryPartTimePositionApply(String strKeyword,int startRow,int pageSize)throws Exception;
}
