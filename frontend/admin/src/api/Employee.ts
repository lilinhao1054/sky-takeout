/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  EmployeeLoginDTO,
  EmployeeSaveDTO,
  EmployeeUpdateDTO,
  Result,
  ResultEmployee,
  ResultEmployeeLoginVO,
  ResultPageResult,
  ResultString,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Employee<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 员工相关接口
   * @name SaveEmployeeUsingPost
   * @summary 添加员工
   * @request POST:/admin/employee
   */
  saveEmployeeUsingPost = (
    employeeSaveDTO: EmployeeSaveDTO,
    params: RequestParams = {}
  ) =>
    this.http.request<Result, void>({
      path: `/admin/employee`,
      method: "POST",
      body: employeeSaveDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name UpdateEmpUsingPut
   * @summary 修改员工信息
   * @request PUT:/admin/employee
   */
  updateEmpUsingPut = (
    employeeUpdateDTO: EmployeeUpdateDTO,
    params: RequestParams = {}
  ) =>
    this.http.request<Result, void>({
      path: `/admin/employee`,
      method: "PUT",
      body: employeeUpdateDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name LoginUsingPost
   * @summary 员工登录
   * @request POST:/admin/employee/login
   */
  loginUsingPost = (
    employeeLoginDTO: EmployeeLoginDTO,
    params: RequestParams = {}
  ) =>
    this.http.request<ResultEmployeeLoginVO, void>({
      path: `/admin/employee/login`,
      method: "POST",
      body: employeeLoginDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name LogoutUsingPost
   * @summary 退出登录
   * @request POST:/admin/employee/logout
   */
  logoutUsingPost = (params: RequestParams = {}) =>
    this.http.request<ResultString, void>({
      path: `/admin/employee/logout`,
      method: "POST",
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name PageEmployeeUsingGet
   * @summary 员工分页查询
   * @request GET:/admin/employee/page
   */
  pageEmployeeUsingGet = (
    query: {
      name?: string;
      /** @format int32 */
      page: number;
      /** @format int32 */
      pageSize: number;
    },
    params: RequestParams = {}
  ) =>
    this.http.request<ResultPageResult, void>({
      path: `/admin/employee/page`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name EnableOrDisableEmployeeUsingPost
   * @summary 启用/禁用员工
   * @request POST:/admin/employee/status/{status}
   */
  enableOrDisableEmployeeUsingPost = (
    status: number,
    id: number,
    params: RequestParams = {}
  ) =>
    this.http.request<Result, void>({
      path: `/admin/employee/status/${status}`,
      method: "POST",
      query: { id },
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 员工相关接口
   * @name GetEmpByIdUsingGet
   * @summary 根据id查询员工
   * @request GET:/admin/employee/{id}
   */
  getEmpByIdUsingGet = (id: number, params: RequestParams = {}) =>
    this.http.request<ResultEmployee, void>({
      path: `/admin/employee/${id}`,
      method: "GET",
      ...params,
    });
}
