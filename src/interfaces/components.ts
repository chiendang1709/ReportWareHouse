export interface Test {
    id: number;
    name ?: string;
}
export interface Props {
    chartData: number[];
  }
export interface listCategory {
    id: number,
    name: string
};
export interface listData {
  id: number,
  name: string
};
export interface listTable {
 id: number,
 reports_name: string,
 category: number
};
export interface ListData {
  listValue: string;
  id: number
};

export interface listChart {
  name: string,
  de: string[]
};