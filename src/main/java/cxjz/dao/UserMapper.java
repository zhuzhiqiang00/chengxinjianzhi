package cxjz.dao;

import cxjz.model.User;

import java.util.Map;

public interface UserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    //根据学号查询用户
    User selectUserByStudNo(String strStudNo)throws Exception;
    //根据用户id更新用户头像地址
    int updateUserHeadUser(Map<String,String> map)throws Exception;

}