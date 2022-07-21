import {call, put, takeEvery,all,takeLatest} from "@redux-saga/core/effects"
import { AxiosResponse } from "axios"
import { ToastContainer, toast } from 'react-toastify';

import {categoryAction } from "pages/Report/slice/categorySlice"
import { tableAction } from "pages/Report/slice/tableSlice"
import dataApi from "pages/Report/api/ReportApi"
import {listValueFieldAction} from "pages/Report/slice/valueField"
import { departmentAction } from "pages/Report/slice/departmentSlice"
import { Filter, filterAction } from "pages/Report/slice/filterSlice"

// export function * getListTable(){
//     const res: AxiosResponse = yield call(dataApi.getAll)
//     if(res){
//         yield put(postList(res))
//     }
// }
export function * getListCategory(){
    try {
        const res: AxiosResponse = yield call(dataApi.getCategory)
        if(res ){
         yield put(categoryAction.postCategory(res))
        }
    } catch (e : unknown) {
        console.log('Error')
      }
}
export function* getListTable(){
 
    
    try {
        const res : AxiosResponse = yield call(dataApi.getListTable)
        if(res){
            yield put(tableAction.showListTables(res))
        }
      } catch (e : unknown) {
        console.log('Error')
      }
    
}

export function* getListDepartment(){

    try {
        const res : AxiosResponse = yield call(dataApi.getListDepartment)
        if(res){
            yield put(departmentAction.showDepartment(res))
        }
    } catch (e : unknown) {
        console.log('Error')
      }
}

export function* getListValue({payload}: {payload: string} ){
  
    try {
        if(payload != ""){
            const res : AxiosResponse = yield call(dataApi.postValueField, payload)
            if(res){
                yield put(listValueFieldAction.showListValueFields(res))
            }
        } else {
                yield put(listValueFieldAction.showListValueFields(""))
        }
        
    } catch (e : unknown) {
        console.log('Error')
      }
    }

export function* getFilter({payload}: {payload: Filter} ){
  
    try {
    const res : AxiosResponse = yield call(dataApi.postFilter, payload)
        if(res){
            yield put(filterAction.showFilter(res))
        }
    } catch (e : unknown) {
        console.log('Error')
       

    }
}

export default function* list (){
    
    yield takeLatest(categoryAction.getCategory.type,getListCategory)
    yield takeLatest(tableAction.getListTables,getListTable)
    yield takeLatest(departmentAction.getDepartment,getListDepartment)
    yield takeLatest(listValueFieldAction.getlistValueField,getListValue)
    yield takeLatest(filterAction.getFilter,getFilter)
}