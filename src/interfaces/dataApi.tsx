import axiosClient from "services/axiosClient";

const dataApi ={
 getAll: async(params ?: number)=> {
        const url ="/todos/";
        return await axiosClient.get(url);
 }
}

export default dataApi;