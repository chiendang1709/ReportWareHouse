import {call, put, takeEvery,all,takeLatest} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
import {categoryAction } from "pages/Report/categorySlice"
import { tableAction } from "pages/Report/tableSlice"
import dataApi from "pages/Report/api/ReportApi"

// export function * getListTable(){
//     const res: AxiosResponse = yield call(dataApi.getAll)
//     if(res){
//         yield put(postList(res))
//     }
// }
export function * getListCategory(){
    const res: AxiosResponse = yield call(dataApi.getCategory)
    if(res){
        yield put(categoryAction.postCategory(res))
    }
}
export function* getListTable({payload}: {payload: number}){

    console.log('check param saga',payload);
    const res : AxiosResponse = yield call(dataApi.getListTable, payload)
    if(res){
        yield put(tableAction.postListTables(res))
    }
}

export default function* list (){
    
    yield takeLatest(categoryAction.getCategory.type,getListCategory)
    yield takeLatest(tableAction.getListTables,getListTable)
}