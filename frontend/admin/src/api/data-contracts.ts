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

/** Category */
export interface Category {
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  createUser?: number;
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  sort?: number;
  /** @format int32 */
  status?: number;
  /** @format int32 */
  type?: number;
  /** @format date-time */
  updateTime?: string;
  /** @format int64 */
  updateUser?: number;
}

/** CategorySaveDTO */
export interface CategorySaveDTO {
  /** @format int64 */
  id?: number;
  name: string;
  /** @format int32 */
  sort: number;
  /** @format int32 */
  type: number;
}

/** CategoryUpdateDTO */
export interface CategoryUpdateDTO {
  /** @format int64 */
  id: number;
  name?: string;
  /** @format int32 */
  sort?: number;
  /** @format int32 */
  type?: number;
}

/** DishFlavor */
export interface DishFlavor {
  /** @format int64 */
  dishId?: number;
  /** @format int64 */
  id?: number;
  name?: string;
  value?: string;
}

/** DishSaveDTO */
export interface DishSaveDTO {
  /** @format int64 */
  categoryId: number;
  description?: string;
  flavors?: DishFlavor[];
  /** @format int64 */
  id?: number;
  image: string;
  name: string;
  price: number;
  /** @format int32 */
  status?: number;
}

/** DishUpdateDTO */
export interface DishUpdateDTO {
  /** @format int64 */
  categoryId?: number;
  description?: string;
  flavors?: DishFlavor[];
  /** @format int64 */
  id: number;
  image?: string;
  name?: string;
  price?: number;
  /** @format int32 */
  status?: number;
}

/** DishVO */
export interface DishVO {
  /** @format int64 */
  categoryId?: number;
  categoryName?: string;
  description?: string;
  flavors?: DishFlavor[];
  /** @format int64 */
  id?: number;
  image?: string;
  name?: string;
  price?: number;
  /** @format int32 */
  status?: number;
  /** @format date-time */
  updateTime?: string;
}

/** Employee */
export interface Employee {
  /** @format date-time */
  createTime?: string;
  /** @format int64 */
  createUser?: number;
  /** @format int64 */
  id?: number;
  idNumber?: string;
  name?: string;
  password?: string;
  phone?: string;
  sex?: string;
  /** @format int32 */
  status?: number;
  /** @format date-time */
  updateTime?: string;
  /** @format int64 */
  updateUser?: number;
  username?: string;
}

/**
 * EmployeeLoginDTO
 * 员工登录时传递的数据模型
 */
export interface EmployeeLoginDTO {
  /** 密码 */
  password: string;
  /** 用户名 */
  username: string;
}

/**
 * EmployeeLoginVO
 * 员工登录返回的数据格式
 */
export interface EmployeeLoginVO {
  /**
   * 主键值
   * @format int64
   */
  id?: number;
  /** 姓名 */
  name?: string;
  /** jwt令牌 */
  token?: string;
  /** 用户名 */
  userName?: string;
}

/** EmployeeSaveDTO */
export interface EmployeeSaveDTO {
  /** @format int64 */
  id?: number;
  idNumber: string;
  name: string;
  phone: string;
  sex: string;
  username: string;
}

/** EmployeeUpdateDTO */
export interface EmployeeUpdateDTO {
  /** @format int64 */
  id: number;
  idNumber?: string;
  name?: string;
  phone?: string;
  sex?: string;
  username?: string;
}

/** PageResult */
export interface PageResult {
  records: object[];
  /** @format int64 */
  total: number;
}

/** Result */
export interface Result {
  /** @format int32 */
  code: number;
  data?: object;
  msg?: string;
}

/** Result«Category» */
export interface ResultCategory {
  /** @format int32 */
  code: number;
  data?: Category;
  msg?: string;
}

/** Result«DishVO» */
export interface ResultDishVO {
  /** @format int32 */
  code: number;
  data?: DishVO;
  msg?: string;
}

/** Result«EmployeeLoginVO» */
export interface ResultEmployeeLoginVO {
  /** @format int32 */
  code: number;
  /** 员工登录返回的数据格式 */
  data?: EmployeeLoginVO;
  msg?: string;
}

/** Result«Employee» */
export interface ResultEmployee {
  /** @format int32 */
  code: number;
  data?: Employee;
  msg?: string;
}

/** Result«List«Category»» */
export interface ResultListCategory {
  /** @format int32 */
  code: number;
  data?: Category[];
  msg?: string;
}

/** Result«PageResult» */
export interface ResultPageResult {
  /** @format int32 */
  code: number;
  data?: PageResult;
  msg?: string;
}

/** Result«int» */
export interface ResultInt {
  /** @format int32 */
  code: number;
  /** @format int32 */
  data?: number;
  msg?: string;
}

/** Result«string» */
export interface ResultString {
  /** @format int32 */
  code: number;
  data?: string;
  msg?: string;
}
