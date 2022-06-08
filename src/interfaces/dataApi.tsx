import axiosClient from "../services/axiosClient";

const dataApi =  {
 getAll: (params : number)=> {
        const url = '/data';
        return axiosClient.get(url, {params});
 }
}

export default dataApi;