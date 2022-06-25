export interface Test {
    id: number;
    name ?: string;
}
export interface Props {
    chartData: number[];
  }
export interface listCategory {
  id: number,
  reports_category_name: string
};
export interface listData {
  id: number,
  name: string
};
export interface listTable {
  table_name: string,
  key_code: string,
  value_code:string,
};

export interface listDepartment {
  id: number,
  departments_name:string
};

export interface ListData {
  listValue: string;
  id: number
};

export interface listChart {
  name: string,
  de: string[]
};

