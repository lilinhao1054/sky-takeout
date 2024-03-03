package com.sky.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class CategorySaveDTO implements Serializable {

    //主键
    private Long id;

    //类型 1 菜品分类 2 套餐分类
    @ApiModelProperty(required = true)
    private Integer type;

    //分类名称
    @ApiModelProperty(required = true)
    private String name;

    //排序
    @ApiModelProperty(required = true)
    private Integer sort;

}
