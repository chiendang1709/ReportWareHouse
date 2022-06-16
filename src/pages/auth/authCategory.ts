import {call, put, takeEvery,all} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
import { getCategory, postCategory } from "pages/Report/categorySlice"
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
        yield put(postCategory(res))
    }
}
export default function * list (){
    yield all([takeEvery(getCategory.type,getListCategory)])
}