package com.sky.result;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * 封装分页查询结果
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult implements Serializable {
    @ApiModelProperty(required = true)
    private long total; //总记录数

    @ApiModelProperty(required = true)
    private List records; //当前页数据集合

}
