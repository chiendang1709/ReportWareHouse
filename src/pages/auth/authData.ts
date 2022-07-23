import {call, put, takeEvery,all,takeLatest} from "@redux-saga/core/effects"
import { AxiosResponse } from "axios"
import { ToastContainer, toast } from 'react-toastify';

import {categoryAction } from "pages/Report/slice/categorySlice"
import { tableAction } from "pages/Report/slice/tableSlice"
import dataApi from "pages/Report/api/ReportApi"
import {listValueFieldAction} from "pages/Report/slice/valueField"
import { departmentAction } from "pages/Report/slice/getDeptSlice"
import { Filter, filterAction } from "pages/Report/slice/filterSlice"
import { customerAction } from "pages/Report/slice/getCusSlice";
import { staffAction } from "pages/Report/slice/getStaffSlice";
import { mwAction } from "pages/Report/slice/getMWSlice";

// lấy danh sách thể loại
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

// lấy danh sách bảng và field
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
//lấy danh sách bộ phận
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
//lấy danh sách nhân viên
export function* getListStaff(){

    try {
        const res : AxiosResponse = yield call(dataApi.getListStaff)
        if(res){
            yield put(staffAction.showStaff(res))
        }
    } catch (e : unknown) {
        console.log('Error')
      }
}
//lấy danh sách khách hàng
export function* getListCustomer(){

    try {
        const res : AxiosResponse = yield call(dataApi.getListCustomer)
        if(res){
            yield put(customerAction.showCustomer(res))
        }
    } catch (e : unknown) {
        console.log('Error')
      }
}
//lấy danh sách mã workspace
export function* getListMW(){

    try {
        const res : AxiosResponse = yield call(dataApi.getListMW)
        if(res){
            yield put(mwAction.showMW(res))
        }
    } catch (e : unknown) {
        console.log('Error')
      }
}

//lấy dữ liệu từ các trường
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
// lọc 
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
    yield takeLatest(customerAction.getCustomer, getListCustomer)
    yield takeLatest(staffAction.getStaff, getListStaff)
    yield takeLatest(mwAction.getMW, getListMW)
    yield takeLatest(listValueFieldAction.getlistValueField,getListValue)
    yield takeLatest(filterAction.getFilter,getFilter)
}