import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/action-creator';

function HomePage() {
    const movies = useSelector((state) => {
      return state.movies;
    });
    // const [error, setError] = useState(null);
    const [loadingMovies, setLoadingMovies] = useState(true);
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
  
    if(loadingMovies) {
      return <h1 className="p-4">Loading...</h1>
    }

    // if(error) {
    //   return <div>{JSON.stringify(error)}</div>
    // }

    return (
        <section>
            <h5 className="mt-5 ms-3 ps-2 border-start border-danger border-4"><b>MOVIES LIST</b></h5>
            <div className="row row-cols-md-5 me-1 mt-3 px-4 py-2">

                {
                    movies.map(movie => {
                        return (
                            <MovieCard key={movie.id} movie={movie} />
                        );
                    })
                }

            </div>
        </section>
    );
}

export default HomePage;