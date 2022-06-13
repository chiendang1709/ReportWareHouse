import {call, put, takeEvery,all} from "@redux-saga/core/effects"

import { AxiosResponse } from "axios"
import { getList, postList } from "features/authSlice"
import dataApi from "interfaces/dataApi"

export function * getListTable(){
    const res: AxiosResponse = yield call(dataApi.getAll)
    if(res){
        yield put(postList(res))
    }
}
export default function * list (){
    yield all([takeEvery(getList.type, getListTable)])
}