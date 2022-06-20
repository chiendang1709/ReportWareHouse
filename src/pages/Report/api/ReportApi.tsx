import { ListData } from "interfaces/components";
import axiosClient from "services/axiosClient";

const dataApi ={

    //lấy danh sách category
    getCategory: async()=> {
          const url ="/category/";
          return await axiosClient.get(url)
     },
    //lấy danh sách tên bảng
    getListTable: async(params : number)=> {
          const url =`/category/${params}/reports/`;
          return await axiosClient.get(url)
    },
    //lấy danh sách tên trường 
    getListField: async(params : number)=> {
          const url =`/reports/${params}/get-fields/`;
          return await axiosClient.post(url)
    },
    //lấy value theo chon 
    postValueField: async(params: ListData)=> {
          
          const json = JSON.stringify({params: params.listValue});
          const url =`/reports/${params.id}/get-data/`;
          return await axiosClient.post(url, json)
    }
}

export default dataApi;