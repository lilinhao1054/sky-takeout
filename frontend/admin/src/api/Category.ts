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
  CategorySaveDTO,
  CategoryUpdateDTO,
  ResultCategory,
  ResultListCategory,
  ResultPageResult,
  ResultString,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Category<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 分类相关接口
   * @name SaveUsingPost
   * @summary 新增分类
   * @request POST:/admin/category
   */
  saveUsingPost = (
    categorySaveDTO: CategorySaveDTO,
    params: RequestParams = {}
  ) =>
    this.http.request<ResultString, void>({
      path: `/admin/category`,
      method: "POST",
      body: categorySaveDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name UpdateUsingPut
   * @summary 修改分类
   * @request PUT:/admin/category
   */
  updateUsingPut = (
    categoryUpdateDTO: CategoryUpdateDTO,
    params: RequestParams = {}
  ) =>
    this.http.request<ResultString, void>({
      path: `/admin/category`,
      method: "PUT",
      body: categoryUpdateDTO,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name DeleteByIdUsingDelete
   * @summary 删除分类
   * @request DELETE:/admin/category
   */
  deleteByIdUsingDelete = (id: number, params: RequestParams = {}) =>
    this.http.request<ResultString, void>({
      path: `/admin/category`,
      method: "DELETE",
      body: id,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name ListUsingGet
   * @summary 根据类型查询分类
   * @request GET:/admin/category/list
   */
  listUsingGet = (
    query?: {
      /**
       * type
       * @format int32
       */
      type?: number;
    },
    params: RequestParams = {}
  ) =>
    this.http.request<ResultListCategory, void>({
      path: `/admin/category/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name PageUsingGet
   * @summary 分类分页查询
   * @request GET:/admin/category/page
   */
  pageUsingGet = (
    query: {
      name?: string;
      /** @format int32 */
      page: number;
      /** @format int32 */
      pageSize: number;
      /** @format int32 */
      type?: number;
    },
    params: RequestParams = {}
  ) =>
    this.http.request<ResultPageResult, void>({
      path: `/admin/category/page`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name StartOrStopUsingPost
   * @summary 启用禁用分类
   * @request POST:/admin/category/status/{status}
   */
  startOrStopUsingPost = (
    status: number,
    id: number,
    params: RequestParams = {}
  ) =>
    this.http.request<ResultString, void>({
      path: `/admin/category/status/${status}`,
      method: "POST",
      query: { id },
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 分类相关接口
   * @name GetByIdUsingGet
   * @summary 根据id查询分类
   * @request GET:/admin/category/{id}
   */
  getByIdUsingGet = (id: number, params: RequestParams = {}) =>
    this.http.request<ResultCategory, void>({
      path: `/admin/category/${id}`,
      method: "GET",
      ...params,
    });
}
