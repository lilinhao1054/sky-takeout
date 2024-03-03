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

import { ResultString } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Common<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 通用接口
   * @name UploadUsingPost
   * @summary 文件上传
   * @request POST:/admin/common/upload
   */
  uploadUsingPost = (file: File, params: RequestParams = {}) =>
    this.http.request<ResultString, void>({
      path: `/admin/common/upload`,
      method: "POST",
      body: file,
      type: ContentType.FormData,
      ...params,
    });
}
