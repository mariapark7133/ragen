package ragen.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ragen.example.dao.ExampleDAO;
import ragen.example.dto.ExampleDTO;

import java.util.List;

@Service
public class ExampleServiceImpl implements ExampleService{

    @Autowired
    private ExampleDAO exampleDAO;

    public List<ExampleDTO> getTestInfoList(ExampleDTO reqDTO){
        return exampleDAO.selectTestInfoList(reqDTO);
    }
}
