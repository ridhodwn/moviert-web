import { GENRES_FETCH_SUCCESS } from "../actions/action-type";

const intialState = {
    genres: []
};

function genreReducer(state = intialState, action) {
    switch (action.type) {
        case GENRES_FETCH_SUCCESS:
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state
    }
}

export default genreReducer;