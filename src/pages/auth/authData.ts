import {call, put, takeEvery,all,takeLatest} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
<<<<<<< HEAD
import {categoryAction } from "pages/Report/categorySlice"
import { tableAction } from "pages/Report/tableSlice"
import dataApi from "pages/Report/api/ReportApi"
=======
import { getCategory, postCategory } from "features/categorySlice"
import { tableAction } from "features/tableSlice"
import dataApi from "interfaces/dataApi"
>>>>>>> f5865cf01a7b40f0b6e25521d3d4e90c2714cc23

// export function * getListTable(){
//     const res: AxiosResponse = yield call(dataApi.getAll)
//     if(res){
//         yield put(postList(res))
//     }
// }s
export function * getListCategory(){
    const res: AxiosResponse = yield call(dataApi.getCategory)
    if(res){
        yield put(categoryAction.postCategory(res))
    }
}
export function* getListTable({payload}: {payload: number}){

    console.log('check param saga',payload);
<<<<<<< HEAD
    const res : AxiosResponse = yield call(dataApi.getListTable, payload)
    if(res){
        yield put(tableAction.postListTables(res))
    }
}

export default function* list (){
    
    yield takeLatest(categoryAction.getCategory.type,getListCategory)
=======
    
    const res : AxiosResponse = yield call(dataApi.getListTable, payload)
    if(res){
        yield put(postCategory(res))
    }
}
export default function* list (){
    
    yield takeLatest(getCategory.type,getListCategory)
>>>>>>> f5865cf01a7b40f0b6e25521d3d4e90c2714cc23
    yield takeLatest(tableAction.getListTables,getListTable)
}