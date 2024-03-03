package com.sky.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class EmployeePageQueryDTO implements Serializable {

    //员工姓名
    private String name;

    //页码
    @ApiModelProperty(required = true)
    private int page;

    //每页显示记录数
    @ApiModelProperty(required = true)
    private int pageSize;

}
