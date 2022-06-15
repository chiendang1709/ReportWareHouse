import {all} from "@redux-saga/core/effects"
<<<<<<< HEAD
import list from "pages/auth/authCategory"
=======
import list from "pages/auth/authData"
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122

export default function * rootSaga (){
    yield all([list()])
}