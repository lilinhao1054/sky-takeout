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

import { Result, ResultInt } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Shop<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 店铺相关接口
   * @name GetStatusUsingGet
   * @summary 获取营业状态
   * @request GET:/admin/shop/status
   */
  getStatusUsingGet = (params: RequestParams = {}) =>
    this.http.request<ResultInt, void>({
      path: `/admin/shop/status`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags 店铺相关接口
   * @name SetStatusUsingPut
   * @summary 修改营业状态
   * @request PUT:/admin/shop/{status}
   */
  setStatusUsingPut = (status: number, params: RequestParams = {}) =>
    this.http.request<Result, void>({
      path: `/admin/shop/${status}`,
      method: "PUT",
      type: ContentType.Json,
      ...params,
    });
}
