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

import { DishSaveDTO, DishUpdateDTO, Result, ResultDishVO, ResultPageResult } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Dish<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 菜品相关接口
   * @name SaveDishUsingPost
   * @summary 新增菜品
   * @request POST:/admin/dish
   */
  saveDishUsingPost = (dishSaveDTO: DishSaveDTO, params: RequestParams = {}) =>
    this.http.request<Result, void>({
      path: `/admin/dish`,
      method: "POST",
      body: dishSaveDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 菜品相关接口
   * @name UpdateUsingPut1
   * @summary 修改菜品
   * @request PUT:/admin/dish
   */
  updateUsingPut1 = (dishUpdateDTO: DishUpdateDTO, params: RequestParams = {}) =>
    this.http.request<Result, void>({
      path: `/admin/dish`,
      method: "PUT",
      body: dishUpdateDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 菜品相关接口
   * @name DeleteDishUsingDelete
   * @summary 批量删除菜品
   * @request DELETE:/admin/dish
   */
  deleteDishUsingDelete = (
    query: {
      /** ids */
      ids: number[];
    },
    params: RequestParams = {},
  ) =>
    this.http.request<Result, void>({
      path: `/admin/dish`,
      method: "DELETE",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 菜品相关接口
   * @name PageDishUsingGet
   * @summary 菜品分页查询
   * @request GET:/admin/dish/page
   */
  pageDishUsingGet = (
    query: {
      /** @format int64 */
      categoryId?: number;
      name?: string;
      /** @format int32 */
      page: number;
      /** @format int32 */
      pageSize: number;
      /** @format int32 */
      status?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<ResultPageResult, void>({
      path: `/admin/dish/page`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 菜品相关接口
   * @name GetDishByIdUsingGet
   * @summary 根据id查询菜品
   * @request GET:/admin/dish/{id}
   */
  getDishByIdUsingGet = (id: number, params: RequestParams = {}) =>
    this.http.request<ResultDishVO, void>({
      path: `/admin/dish/${id}`,
      method: "GET",
      ...params,
    });
}
