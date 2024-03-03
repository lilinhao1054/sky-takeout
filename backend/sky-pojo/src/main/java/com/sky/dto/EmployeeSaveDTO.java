package com.sky.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class EmployeeSaveDTO implements Serializable {

    private Long id;

    @ApiModelProperty(required = true)
    private String username;

    @ApiModelProperty(required = true)
    private String name;

    @ApiModelProperty(required = true)
    private String phone;

    @ApiModelProperty(required = true)
    private String sex;

    @ApiModelProperty(required = true)
    private String idNumber;

}
