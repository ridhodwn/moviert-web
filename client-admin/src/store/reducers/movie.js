import { MOVIES_FETCH_SUCCESS } from "../actions/action-type";

const intialState = {
    movies: []
};

function movieReducer(state = intialState, action) {
    switch (action.type) {
        case MOVIES_FETCH_SUCCESS:
            return {
                ...state,
                movies: action.payload
            };
        default:
            return state
    }
}

export default movieReducer;