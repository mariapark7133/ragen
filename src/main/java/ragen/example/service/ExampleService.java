package ragen.example.service;

import ragen.example.dto.ExampleDTO;

import java.util.List;

public interface ExampleService {
    public List<ExampleDTO> getTestInfoList(ExampleDTO reqDTO);
}
