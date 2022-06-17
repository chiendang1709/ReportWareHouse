import axiosClient from "services/axiosClient";

const dataApi ={
 getCategory: async()=> {
       const url ="";
       return await axiosClient.get(url)
 },
 getAll: async(params ?: number)=> {
        const url ="/todos/";
        return await axiosClient.get(url);
 },
 getListTable: async(params : number)=> {
      const url ="table";
      return await axiosClient.get(url, {params})
},
}

export default dataApi;