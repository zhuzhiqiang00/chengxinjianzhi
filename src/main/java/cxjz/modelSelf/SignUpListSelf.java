package cxjz.modelSelf;

import cxjz.model.SignUp;

import java.io.Serializable;
import java.util.List;

public class SignUpListSelf implements Serializable{
	private static final long serialVersionUID = 7481507232179927383L;
	Boolean hasMore;//是否还有下一页
	List<SignUp> signUpList;
	int count;//职位报名数量总数

	public Boolean getHasMore() {
		return hasMore;
	}
	public void setHasMore(Boolean hasMore) {
		this.hasMore = hasMore;
	}
	public List<SignUp> getSignUpList() {
		return signUpList;
	}
	public void setSignUpList(List<SignUp> signUpList) {
		this.signUpList = signUpList;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}

}
