package cxjz.dao;

import cxjz.model.SignUp;

public interface SignUpMapper {
    int deleteByPrimaryKey(String signUpId);

    int insert(SignUp record);

    int insertSelective(SignUp record);

    SignUp selectByPrimaryKey(String signUpId);

    int updateByPrimaryKeySelective(SignUp record);

    int updateByPrimaryKey(SignUp record);
}