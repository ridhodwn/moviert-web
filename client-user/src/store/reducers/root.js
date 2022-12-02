import { MOVIES_FETCH_SUCCESS, MOVIE_FETCH_BY_ID_SUCCESS } from "../actions/action-type";

const intialState = {
    movies: [],
    movie: {}
};

function rootReducer(state = intialState, action) {
    switch (action.type) {
        case MOVIES_FETCH_SUCCESS:
            return {
                ...state,
                movies: action.payload
            };
        case MOVIE_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                movie: action.payload
            };
        default:
            return state
    }
}

export default rootReducer;