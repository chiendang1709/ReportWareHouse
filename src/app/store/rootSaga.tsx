import {all} from "@redux-saga/core/effects"
import list from "pages/auth/authCategory"

export default function * rootSaga (){
    yield all([list()])
}