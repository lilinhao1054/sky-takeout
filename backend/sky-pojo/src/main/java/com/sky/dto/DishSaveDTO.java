package com.sky.dto;

import com.sky.entity.DishFlavor;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class DishSaveDTO implements Serializable {

    private Long id;
    //菜品名称
    @ApiModelProperty(required = true)
    private String name;
    //菜品分类id
    @ApiModelProperty(required = true)
    private Long categoryId;
    //菜品价格
    @ApiModelProperty(required = true)
    private BigDecimal price;
    //图片
    @ApiModelProperty(required = true)
    private String image;
    //描述信息
    private String description;
    //0 停售 1 起售
    private Integer status;
    //口味
    private List<DishFlavor> flavors = new ArrayList<>();

}