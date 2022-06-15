import {call, put, takeEvery,all,takeLatest} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
import { getCategory, postCategory } from "features/categorySlice"
import { tableAction } from "features/tableSlice"
import dataApi from "interfaces/dataApi"

// export function * getListTable(){
//     const res: AxiosResponse = yield call(dataApi.getAll)
//     if(res){
//         yield put(postList(res))
//     }
// }s
export function * getListCategory(){
    const res: AxiosResponse = yield call(dataApi.getCategory)
    if(res){
        yield put(postCategory(res))
    }
}
export function* getListTable({payload}: {payload: number}){

    console.log('check param saga',payload);
    
    const res : AxiosResponse = yield call(dataApi.getListTable, payload)
    if(res){
        yield put(postCategory(res))
    }
}
export default function* list (){
    
    yield takeLatest(getCategory.type,getListCategory)
    yield takeLatest(tableAction.getListTables,getListTable)
}