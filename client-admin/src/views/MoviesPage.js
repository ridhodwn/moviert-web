import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieRow from '../components/MovieRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/action-creator';

function MoviesPage() {
    const movies = useSelector((state) => {
        return state.movieReducer.movies;
    });
    // const [error, setError] = useState(null);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies())
        .then(() => {
            console.log('berhasil');
        })
        .catch((err) => {
            console.log('gagal', err);
        })
        // .catch((error) => {
        //   setError(error);
        // })
        .finally(() => {
            setLoadingMovies(false);
        });
    }, []);

    if (loadingMovies) {
        return <h1 className="p-4">Loading...</h1>
    }

    // if(error) {
    //   return <div>{JSON.stringify(error)}</div>
    // }

    return (
        <section>
            <div className="d-flex justify-content-between mx-3 mt-5 align-items-center">
                <h5 className="ps-2 border-start border-danger border-4"><b>MOVIES LIST</b></h5>
                <button className="btn btn-danger me-2" type="submit" style={{
                    backgroundColor: '#fc0404'
                }} onClick={() => navigate('add')}><b>Add Movie</b></button>
            </div>
            <div className="mt-4 mx-3 border-top">
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col" width="200px">Poster</th>
                            <th scope="col" width="400px">Synopsis</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Genre</th>
                            <th scope="col" width="50px">Author</th>
                            <th scope="col" width="100px" className="text-center">Cast</th>
                            <th scope="col" width="75px" className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => {
                                return (
                                    <MovieRow key={movie.id} movie={movie} />
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MoviesPage;