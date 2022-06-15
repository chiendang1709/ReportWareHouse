import {all} from "@redux-saga/core/effects"
import list from "pages/auth/authData"

export default function * rootSaga (){
    yield all([list()])
}