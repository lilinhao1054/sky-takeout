package com.sky.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class CategoryPageQueryDTO implements Serializable {

    //页码
    @ApiModelProperty(required = true)
    private int page;

    //每页记录数
    @ApiModelProperty(required = true)
    private int pageSize;

    //分类名称
    private String name;

    //分类类型 1菜品分类  2套餐分类
    private Integer type;

}
