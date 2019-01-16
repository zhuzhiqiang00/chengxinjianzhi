package cxjz.dao;

import cxjz.model.PartTimePosition;

import java.util.List;
import java.util.Map;

public interface PartTimePositionMapper {
    int deleteByPrimaryKey(String partTimePositionId);

    int insert(PartTimePosition record);

    int insertSelective(PartTimePosition record);

    PartTimePosition selectByPrimaryKey(String partTimePositionId);

    int updateByPrimaryKeySelective(PartTimePosition record);

    int updateByPrimaryKey(PartTimePosition record);

    //根据strKeyword查询相应的兼职职位数量
    int selectPartTimePositionCount(String strKeyword)throws Exception;
    //根据startRow、pageSize查询相应的兼职职位信息
    List<PartTimePosition> selectPartTimePostionList(Map<String,Object> map)throws Exception;
}