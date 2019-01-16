package cxjz.modelSelf;

import cxjz.model.PartTimePosition;

import java.io.Serializable;
import java.util.List;

public class PositionListSelf implements Serializable{
	private static final long serialVersionUID = 7481507232179927383L;
	private Boolean hasMore;//是否还有下一页
	private List<PartTimePosition> partTimePositionList;
	private String headUrl;//头像地址
	private int count;//兼职职位总数

	public Boolean getHasMore() {
		return hasMore;
	}
	public void setHasMore(Boolean hasMore) {
		this.hasMore = hasMore;
	}
	public List<PartTimePosition> getPartTimePositionList() {
		return partTimePositionList;
	}
	public void setPartTimePositionList(List<PartTimePosition> partTimePositionList) {
		this.partTimePositionList = partTimePositionList;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getHeadUrl() {
		return headUrl;
	}

	public void setHeadUrl(String headUrl) {
		this.headUrl = headUrl;
	}
}
