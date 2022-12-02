import { MOVIES_FETCH_SUCCESS, GENRES_FETCH_SUCCESS, MOVIE_FETCH_BY_ID_SUCCESS } from "../actions/action-type";

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

export const genresFetchSuccess = payload => {
    return {
        type: GENRES_FETCH_SUCCESS,
        payload
    };
};

export const fetchGenres = () => {
    return (dispatch) => {
        return fetch('http://localhost:3000/genres')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            dispatch(genresFetchSuccess(data));
        });
    };
};

export const createMovie = (movieForm, castForm) => {
    return (dispatch) => {
        movieForm.Casts = castForm;
        return fetch('http://localhost:3000/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieForm)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
    };
};

export const createGenre = (genreForm) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:3000/genres', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                // access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify(genreForm)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            dispatch(fetchGenres());
        });
    };
};

export const login = (formUser) => {
    return (dispatch) => {
        return fetch('http://localhost:3000/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formUser)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('access_token', data.access_token)
        });
    };
};

export const register = (formUser) => {
    return (dispatch) => {
        return fetch('http://localhost:3000/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formUser)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
        });
    };
};

export const editMovie = (movieForm, id) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/movies/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieForm)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
    };
};

export const editGenre = (genreForm, id) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/genres/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreForm)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
    };
};

export const deleteGenre = ({ id }) => {
    return (dispatch, getState) => {
        return fetch(`http://localhost:3000/genres/${id}`,{
            method: "delete"
        })
        .then(() => {
            dispatch(fetchGenres());
        });
    };
};

export const deleteMovie = ({ id }) => {
    return (dispatch, getState) => {
        return fetch(`http://localhost:3000/movies/${id}`,{
            method: "delete"
        })
        .then(() => {
            dispatch(fetchMovies());
        });
    };
};