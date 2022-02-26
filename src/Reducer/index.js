import { combineReducers } from "redux";
import { mathReducer } from "./mathReducer";
import { userReducer } from "./userReducer";
import { loginInfo } from "./loginInfo";

export const rootReducer = combineReducers({
  mathReducer,
  userReducer,
  loginInfo
});
