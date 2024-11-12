import { combineReducers } from "redux";
import auth from "./authReducer";
import booking from './bookingReducer';

export default combineReducers({
    auth,
    booking
})