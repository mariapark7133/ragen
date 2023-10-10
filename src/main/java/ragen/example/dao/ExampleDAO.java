package ragen.example.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import ragen.example.dto.ExampleDTO;

import java.util.List;

@Repository
public class ExampleDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public ExampleDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }
    private static final String NAMESPACE = "TEST.";

    public List<ExampleDTO> selectTestInfoList(ExampleDTO reqDTO) {
        return sqlSessionTemplate.selectList(NAMESPACE + "selectTestInfoList", reqDTO);
    }
}
