import movieReducer from "./movie";
import genreReducer from "./genre";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    movieReducer,
    genreReducer
})

export default rootReducer;