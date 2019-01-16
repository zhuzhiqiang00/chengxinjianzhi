package cxjz.modelSelf;

import com.soh.frame.web.user.UserInfoImpl;
import com.soh.frame.web.user.UserInfoInterface;

import java.io.Serializable;

/**
 * Created by Administrator on 2017/9/24 0024.
 */
public class LoginSelf implements Serializable{

    private String strHeadUrl;//头像地址
    private String strUserId;//用户编号
    private String sessionId;
    private UserInfoImpl curUser;
    private Boolean hasShowVericode;//是否显示验证码

    public UserInfoImpl getCurUser() {
        return curUser;
    }

    public void setCurUser(UserInfoImpl curUser) {
        this.curUser = curUser;
    }

    public String getStrUserId() {
        return strUserId;
    }

    public void setStrUserId(String strUserId) {
        this.strUserId = strUserId;
    }

    public Boolean getHasShowVericode() {
        return hasShowVericode;
    }

    public void setHasShowVericode(Boolean hasShowVericode) {
        this.hasShowVericode = hasShowVericode;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getStrHeadUrl() {
        return strHeadUrl;
    }

    public void setStrHeadUrl(String strHeadUrl) {
        this.strHeadUrl = strHeadUrl;
    }




}
