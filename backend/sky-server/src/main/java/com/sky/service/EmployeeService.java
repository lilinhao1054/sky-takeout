package com.sky.service;

import com.sky.dto.EmployeeSaveDTO;
import com.sky.dto.EmployeeLoginDTO;
import com.sky.dto.EmployeePageQueryDTO;
import com.sky.dto.EmployeeUpdateDTO;
import com.sky.entity.Employee;
import com.sky.result.PageResult;

public interface EmployeeService {

    /**
     * 员工登录
     *
     * @param employeeLoginDTO
     * @return
     */
    Employee login(EmployeeLoginDTO employeeLoginDTO);

    void save(EmployeeSaveDTO employeeSaveDTO);

    PageResult pageQuery(EmployeePageQueryDTO employeePageQueryDTO);

    void modifyEmployeeStatus(Integer status, Long id);

    Employee getEmpById(Long id);

    void updateEmp(EmployeeUpdateDTO employeeUpdateDTO);
}
