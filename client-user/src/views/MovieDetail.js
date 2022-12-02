import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tomatoRotten from '../1061px-Rotten_Tomatoes_rotten.png';
import tomatoGood from '../1009px-Rotten_Tomatoes.png';
import tomatoFresh from '../cf-lg.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '../store/actions/action-creator';

function MovieDetail() {
    const movie = useSelector((state) => {
        return state.movie;
    });
    // const [error, setError] = useState(null);
    const [loadingMovie, setLoadingMovie] = useState(true);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchMovieById(id))
            .then(() => {
                console.log('berhasil');
            })
            .catch((err) => {
                console.log('gagal', err);
            })
            .finally(() => {
                setLoadingMovie(false);
            });
    }, []);

    if (loadingMovie) {
        return <h1 className="p-4">Loading...</h1>
    }

    let tomatoRating = '';
    if (movie.rating >= 75) {
        tomatoRating = tomatoFresh;
    } else if (movie.rating >= 60) {
        tomatoRating = tomatoGood;
    } else {
        tomatoRating = tomatoRotten;
    }

    return (
        <section>
            <div className="d-flex mx-5 mt-5 pe-0">
                <div className="card col-3 border-0 p-1">
                    <img src={movie.imgUrl} className="rounded-3" />
                    <a className="btn btn-dark mt-4 py-3" type="button" href={movie.trailerUrl} style={{
                        backgroundColor: '#000000'
                    }}><b>WATCH TRAILER</b></a>
                    <p className="text-muted mt-2 ms-1" style={{
                        fontSize: '12px'
                    }}>Posted by: {movie.User.username}</p>
                </div>
                <div className="col-9 ps-3">
                    <div className="d-flex mt-1 p-3 align-items-center rounded-3" style={{
                        backgroundColor: '#f3f3f3',
                        height: '130px'
                    }}>
                        <div className="col-7 px-2 text-center">
                            <h2>{movie.title}</h2>
                        </div>
                        <div className="col-4 text-center">
                            <h6 style={{
                                fontSize: '13px'
                            }}><b>TOMATOMETER</b>
                            </h6>
                            <div className="d-flex col-12 justify-content-center">
                                <img src={tomatoRating} width="50" height="50" className="me-1" />
                                <h1><b>{movie.rating}%</b></h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4" style={{
                        backgroundColor: '#fc0404',
                        height: '20px'
                    }}>
                        <div className="col-2 ms-4 px-1 pb-1 text-center" style={{
                            backgroundColor: '#FFFFFF'
                        }}>
                            <h5><b>MOVIE INFO</b></h5>
                        </div>
                    </div>
                    <div className="d-flex mt-4 px-3">
                        <div className="col-2">
                            <h6 style={{
                                color: '#6f7b8b'
                            }}><b>Genre:</b></h6>
                        </div>
                        <div className="col-9 ms-3 mb-0">
                            <p className="mb-2">{movie.Genre.name}</p>
                        </div>
                    </div>
                    <div className="d-flex px-3">
                        <div className="col-2">
                            <h6 style={{
                                color: '#6f7b8b'
                            }}><b>Synopsis:</b></h6>
                        </div>
                        <div className="col-9 ms-3">
                            <p>{movie.synopsis}</p>
                        </div>
                    </div>
                    <div className="mt-3" style={{
                        backgroundColor: '#fc0404',
                        height: '20px'
                    }}>
                        <div className="col-1 ms-4 px-1 pb-1 text-center" style={{
                            backgroundColor: '#FFFFFF'
                        }}>
                            <h5><b>CAST</b></h5>
                        </div>
                    </div>
                    <div>
                        <div className="row row-cols-md-6 me-1 mt-3 px-4 py-2">
                            {
                                movie.Casts.map(cast => {
                                    return (
                                        <div key={cast.id}>
                                            <div className="col p-0 mb-2">
                                                <div className="card h-100 col-12 border-0">
                                                    <div className="bg-cover col-1" style={{
                                                        width: "100%",
                                                        height: "150px",
                                                        background: `url(${cast.profilePict}) no-repeat top`,
                                                        backgroundSize: "cover"
                                                    }}>
                                                    </div>
                                                    <div className="card-body mb-0 mt-0 ps-0">
                                                        <p className="card-text mt-0 mb-0" style={{
                                                            fontSize: '15px'
                                                        }}>{cast.name}</p>
                                                        {/* <p className="card-text mt-0 mb-0 text-muted" style={{
                                                            fontSize: '12px'
                                                        }}>{cast.character}</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    {/* <div className="col mb-2 ms-3 p-0">
                            <div className="card col-12 h-100 border-0">
                                <div className="bg-cover col-1" style={{
                                    width: "100%",
                                    height: "150px",
                                    background: "url('https://m.media-amazon.com/images/M/MV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ@@._V1_UY317_CR6,0,214,317_AL_.jpg') no-repeat top",
                                    backgroundSize: "cover"
                                }}>
                                </div>
                                <div className="card-body mb-0 mt-0 ps-0">
                                    <p className="card-text mt-0 mb-0" style={{
                                        fontSize: '15px'
                                    }}>Elizabeth Olsen</p>
                                    <p className="card-text mt-0 mb-0 text-muted" style={{
                                        fontSize: '12px'
                                    }}>Wanda Maximoff/ Scarlet Witch</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section >
    );
}

export default MovieDetail;