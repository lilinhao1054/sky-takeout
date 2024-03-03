package com.sky.service;

import com.sky.dto.DishSaveDTO;
import com.sky.dto.DishPageQueryDTO;
import com.sky.dto.DishUpdateDTO;
import com.sky.entity.Dish;
import com.sky.result.PageResult;
import com.sky.vo.DishVO;

import java.util.List;

public interface DishService {
    void saveWithFlavor(DishSaveDTO dishSaveDTO);

    PageResult pageQuery(DishPageQueryDTO dishPageQueryDTO);

    void deleteBatch(List<Long> ids);

    DishVO getByIdWithFlavor(Long id);

    void update(DishUpdateDTO dishUpdateDTO);

    /**
     * 条件查询菜品和口味
     * @param dish
     * @return
     */
    List<DishVO> listWithFlavor(Dish dish);

    void startOrStop(Integer status, Long id);
}
