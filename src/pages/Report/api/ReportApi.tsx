import { ListData } from "interfaces/components";
import axiosClient from "services/axiosClient";
import { Filter } from "../slice/filterSlice";

const dataApi ={

    //lấy danh sách category
    getCategory: async()=> {
          const url ="/category/";
          return await axiosClient.get(url)
     },
    //lấy danh sách tên bảng
    getListTable: async()=> {
          const url ="/get-fields/";
          console.log("url");
          return await axiosClient.get(url)
    },
    //lấy danh sách tên bộ phận
    getListDepartment: async()=> {
          const url ="/departments/";     
          return await axiosClient.get(url)
    },
    //lấy value theo chon 
    postValueField: async(params: string)=> {
          
          const json = JSON.stringify({params: params});
          const url ="/reports/get-data/";
      //     console.log("json",json);
          return await axiosClient.post(url, json)
    },
    //lấy filter theo chon 
    postFilter: async(params: Filter)=> {
          
      const json = JSON.stringify(params);
      const url ="/reports/filter-data/";
      //  console.log("json",json);
      return await axiosClient.post(url, json)
}
}

export default dataApi;