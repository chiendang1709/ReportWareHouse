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
          const url ="/reports/get-fields/";
          return await axiosClient.get(url)
    },
    //lấy danh sách tên bộ phận
    getListDepartment: async()=> {
          const url ="/datasets/departments/";
          return await axiosClient.get(url)
    },
     //lấy danh sách tên nhân viên
     getListStaff: async()=> {
      const url ="/datasets/employee/";
      return await axiosClient.get(url)
    },
     //lấy danh sách tên khách hàng
    getListCustomer: async()=> {
      const url ="/datasets/customer/";
      return await axiosClient.get(url)
    },
    //lấy danh sách tên mã workspace
    getListMW: async()=> {
      const url ="/datasets/workspace/";
      return await axiosClient.get(url)
    },


    //lấy value theo chon 
    postValueField: async(params: string)=> {
          const json = JSON.stringify({params: params});
          const url ="/datasets/data-custom/";
          console.log("json",json);
          return await axiosClient.post(url, json)
    },
    //lấy filter theo chon 
    postFilter: async(params: Filter)=> {
          
      const json = JSON.stringify(params);
      const url ="/reports/filter/";
      console.log("json",json);
      return await axiosClient.post(url, json)
}
}

export default dataApi;