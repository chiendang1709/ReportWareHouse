import {call, put, takeEvery,all} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
import { getList, postList } from "features/tableSlice"
import { getCategory, postCategory } from "features/categorySlice"
import dataApi from "interfaces/dataApi"

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
    // takeEvery(getList.type, getListTable)
    yield all([takeEvery(getCategory.type,getListCategory)])
}