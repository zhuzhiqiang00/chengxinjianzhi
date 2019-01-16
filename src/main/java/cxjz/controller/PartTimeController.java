package cxjz.controller;

import com.soh.frame.model.Result;
import com.soh.frame.util.HttpUtil;
import cxjz.modelSelf.LoginSelf;
import cxjz.modelSelf.PositionListSelf;
import cxjz.service.intf.PartTimeServiceIntf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/partTime")
public class PartTimeController {
	private static transient Logger log = LoggerFactory.getLogger(PartTimeController.class);
	@Autowired
	PartTimeServiceIntf partTimeServiceIntf;

	/**
	 * 兼职职位分页查询
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryPartTimePositionList")
	public Result<PositionListSelf> queryPartTimePositionList(HttpServletRequest request, HttpServletResponse response){
		Result<PositionListSelf> result = null;
		try {
			LoginSelf loginSelf = (LoginSelf) request.getSession().getAttribute("user");
			String headUrl = loginSelf.getStrHeadUrl();
			String strPageSize = HttpUtil.getAsString(request, "length");
			String strStartRow = HttpUtil.getAsString(request, "start");
			String strKeyword = HttpUtil.getAsString(request, "keyword");
			int startRow = Integer.parseInt(strStartRow);
			int pageSize = Integer.parseInt(strPageSize);
			result = partTimeServiceIntf.queryPartTimePositionList(strKeyword,startRow,pageSize,headUrl);
		} catch (Exception e) {
			 String strErrorMsg = "兼职职位分页查询失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 兼职职位报名
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/partTimePositionApply")
	public Result<Integer> partTimePositionApply(HttpServletRequest request,HttpServletResponse response){
		Result<Integer> result = null;
		try {
			HttpSession httpSession = request.getSession();
			LoginSelf loginSelf = (LoginSelf) httpSession.getAttribute("user");
			String strUserId = loginSelf.getStrUserId();
			String strAge = HttpUtil.getAsString(request, "age");
			String strName = HttpUtil.getAsString(request, "name");
			String strPhoneNum = HttpUtil.getAsString(request, "phoneNum");
			String strSex = HttpUtil.getAsString(request, "sex");
			String strStudentId = HttpUtil.getAsString(request, "studentId");
			result = partTimeServiceIntf.partTimePositionApply(strAge,strName,strPhoneNum,strSex,strStudentId,strUserId);
		} catch (Exception e) {
			 String strErrorMsg = "兼职职位报名失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 增加兼职职位
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addPartTimePosition")
	public Result<Integer> addPartTimePosition(HttpServletRequest request,HttpServletResponse response){
		Result<Integer> result = null;
		try {
			String strUserId = null;
			Cookie[] cookies = request.getCookies();
			for(Cookie cookie : cookies){
				if(cookie != null){
					String strCookieName = cookie.getName();
					if("strUserId".equals(strCookieName)){
						strUserId = cookie.getValue();
					}
				}
			}
//			LoginSelf loginSelf = (LoginSelf) request.getSession().getAttribute("user");
//			String userId = loginSelf.getStrUserId();
			String strPositionDemand = HttpUtil.getAsString(request, "positionDemand");
			String strPositionPicUrl = HttpUtil.getAsString(request, "positionPicUrl");
			String strPositionSalary = HttpUtil.getAsString(request, "positionSalary");
			String strPositionSex = HttpUtil.getAsString(request, "positionSex");
			String strPositionTitle = HttpUtil.getAsString(request, "positionTitle");
			String strPositionType = HttpUtil.getAsString(request, "positionType");
			String strWorkLocation = HttpUtil.getAsString(request, "workLocation");
			String strWorkTime = HttpUtil.getAsString(request, "workTime");
			String strPositionDesc = HttpUtil.getAsString(request, "positionDesc");
			String strRecruitmentNum = HttpUtil.getAsString(request, "recruitmentNum");
			result = partTimeServiceIntf.addPartTimePosition(strUserId,strPositionDemand,strPositionPicUrl,strPositionSalary,strPositionSex,strPositionTitle,strPositionType,strWorkLocation,strWorkTime,strPositionDesc,strRecruitmentNum);
		} catch (Exception e) {
			 String strErrorMsg = "增加兼职职位失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 删除兼职职位
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deletePartTimePosition")
	public Result<Integer> deletePartTimePosition(HttpServletRequest request,HttpServletResponse response){
		Result<Integer> result = null;
		try {
			String strPartTimePositionId = HttpUtil.getAsString(request, "partTimePositionId");
			result = partTimeServiceIntf.deletePartTimePosition(strPartTimePositionId);
		} catch (Exception e) {
			 String strErrorMsg = "删除兼职职位失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}

	/**
	 * 兼职职位报名申请删除
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deletePartTimePositionApply")
	public Result<Integer> deletePartTimePositionApply(HttpServletRequest request,HttpServletResponse response){
		Result<Integer> result = null;
		try {
			String strSignUpId = HttpUtil.getAsString(request, "signUpId");
			result = partTimeServiceIntf.deletePartTimePositionApply(strSignUpId);
		} catch (Exception e) {
			 String strErrorMsg = "兼职职位报名申请删除失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


	/**
	 * 分页查询兼职职位报名申请
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryPartTimePositionApply")
	public Result<Integer> queryPartTimePositionApply(HttpServletRequest request,HttpServletResponse response){
		Result<Integer> result = null;
		try {
			String strPageSize = HttpUtil.getAsString(request, "length");
			String strStartRow = HttpUtil.getAsString(request, "start");
			String strKeyword = HttpUtil.getAsString(request, "keyword");
			int startRow = Integer.parseInt(strStartRow);
			int pageSize = Integer.parseInt(strPageSize);
			result = partTimeServiceIntf.queryPartTimePositionApply(strKeyword,startRow,pageSize);
		} catch (Exception e) {
			 String strErrorMsg = "分页查询兼职职位报名申请失败{}";
	         log.error(strErrorMsg, e);
	         result = Result.buildFail(strErrorMsg);
		}
		return result;
	}


}
