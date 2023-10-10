package ragen.example.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ragen.common.base.controller.BaseController;
import ragen.common.response.dto.ResponseDTO;
import ragen.common.response.enums.ResponseCode;
import ragen.common.util.ResponseUtil;
import ragen.example.dto.ExampleDTO;
import ragen.example.service.ExampleService;

import java.util.LinkedHashMap;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/example")
public class ExampleController extends BaseController {

    @Autowired
    private ExampleService exampleService;

    @RequestMapping("/getExampleList")
    public ResponseDTO setSystemAuth(@RequestBody(required = false) ExampleDTO exampleDTO) {

        LinkedHashMap<String, Object> resultMap = new LinkedHashMap<>();

        List<ExampleDTO> resultList =  exampleService.getTestInfoList(exampleDTO);

        resultMap.put("exampleList",resultList);

        return ResponseUtil.SUCCESS(ResponseCode.SUCCESS_SEARCH,resultMap);
    }
}
