import { MOVIES_FETCH_SUCCESS, MOVIE_FETCH_BY_ID_SUCCESS } from "../actions/action-type";

export const moviesFetchSuccess = payload => {
    return {
        type: MOVIES_FETCH_SUCCESS,
        payload
    };
};

export const fetchMovies = () => {
    return (dispatch) => {
        return fetch('http://localhost:3000/movies')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            dispatch(moviesFetchSuccess(data));
        });
    };
};

export const movieByIdFetchSuccess = payload => {
    return {
        type: MOVIE_FETCH_BY_ID_SUCCESS,
        payload
    };
};

export const fetchMovieById = (id) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/movies/${id}`)
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            dispatch(movieByIdFetchSuccess(data));
        });
    };
};