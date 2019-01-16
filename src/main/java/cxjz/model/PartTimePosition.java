package cxjz.model;

import java.util.Date;

public class PartTimePosition {
    private String partTimePositionId;

    private String positionTitle;

    private String positionDesc;

    private Integer positionSalary;

    private String positionDemand;

    private String positionType;

    private String positionSex;

    private Integer recruitmentNum;

    private String positionPicUrl;

    private String workTime;

    private String workLocation;

    private String creater;

    private Date createDate;

    private String modifier;

    private Date modifyDate;

    private Short state;

    public String getPartTimePositionId() {
        return partTimePositionId;
    }

    public void setPartTimePositionId(String partTimePositionId) {
        this.partTimePositionId = partTimePositionId == null ? null : partTimePositionId.trim();
    }

    public String getPositionTitle() {
        return positionTitle;
    }

    public void setPositionTitle(String positionTitle) {
        this.positionTitle = positionTitle == null ? null : positionTitle.trim();
    }

    public String getPositionDesc() {
        return positionDesc;
    }

    public void setPositionDesc(String positionDesc) {
        this.positionDesc = positionDesc == null ? null : positionDesc.trim();
    }

    public Integer getPositionSalary() {
        return positionSalary;
    }

    public void setPositionSalary(Integer positionSalary) {
        this.positionSalary = positionSalary;
    }

    public String getPositionDemand() {
        return positionDemand;
    }

    public void setPositionDemand(String positionDemand) {
        this.positionDemand = positionDemand == null ? null : positionDemand.trim();
    }

    public String getPositionType() {
        return positionType;
    }

    public void setPositionType(String positionType) {
        this.positionType = positionType == null ? null : positionType.trim();
    }

    public String getPositionSex() {
        return positionSex;
    }

    public void setPositionSex(String positionSex) {
        this.positionSex = positionSex == null ? null : positionSex.trim();
    }

    public Integer getRecruitmentNum() {
        return recruitmentNum;
    }

    public void setRecruitmentNum(Integer recruitmentNum) {
        this.recruitmentNum = recruitmentNum;
    }

    public String getPositionPicUrl() {
        return positionPicUrl;
    }

    public void setPositionPicUrl(String positionPicUrl) {
        this.positionPicUrl = positionPicUrl == null ? null : positionPicUrl.trim();
    }

    public String getWorkTime() {
        return workTime;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    public String getWorkLocation() {
        return workLocation;
    }

    public void setWorkLocation(String workLocation) {
        this.workLocation = workLocation == null ? null : workLocation.trim();
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater == null ? null : creater.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getModifier() {
        return modifier;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier == null ? null : modifier.trim();
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Short getState() {
        return state;
    }

    public void setState(Short state) {
        this.state = state;
    }
}