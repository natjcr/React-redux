import { combineReducers } from "redux";
import dateReducer from "../slices/dataSlice.js";
import  uiReducer from "../slices/uiSlice.js";



const rootReducer = combineReducers({
    data: dateReducer,
    ui: uiReducer,
})

export default rootReducer