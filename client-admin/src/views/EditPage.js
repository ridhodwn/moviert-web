import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGenres, editMovie } from '../store/actions/action-creator';

function EditPage() {
    const [movieForm, setMovieForm] = useState({
        title: '',
        synopsis: '',
        trailerUrl: '',
        imgUrl: '',
        rating: 0,
        genreId: 0
    });
    const genres = useSelector((state) => {
        return state.genreReducer.genres;
    });
    const [loadingGenres, setLoadingGenres] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchGenres())
            .then(() => {
                // console.log(genres)
            })
            .catch((err) => {
                console.log('gagal', err);
            })
            .finally(() => {
                setLoadingGenres(false);
            });
    }, []);

    useEffect(() => {
         fetch(`http://localhost:3000/movies/${id}`)
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                console.log('berhasil di Edit Page');
                setMovieForm({
                    title: data.title,
                    synopsis: data.synopsis,
                    trailerUrl: data.trailerUrl,
                    imgUrl: data.imgUrl,
                    rating: data.rating,
                    genreId: data.genreId
                })
            })
            .catch((err) => {
                console.log('gagal', err);
            })
            .finally(() => {
                setLoadingGenres(false);
            });
    }, []);

    const changeInputHandler = (e) => {
        const { name, value } = e.target;
        setMovieForm({
            ...movieForm,
            [name]: value
        })
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(editMovie(movieForm, id)).then(() => navigate('/'));
    };

    return (
        <section>
            <h5 className="mt-5 ms-3 ps-2 border-start border-danger border-4"><b>EDIT MOVIE</b></h5>
            <div className="container-fluid d-flex mt-4 pt-2">
                <div className="col-7">
                    <form id="add-movie-form" onSubmit={submitForm}>
                        <p className="py-0 mb-1"><i className="text-muted ms-1" style={{
                            fontSize: '14px'
                        }}>* required</i></p>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="title"><b>TITLE*</b></label></div>
                            <div className="col-9">
                                <input className="form-control py-2" type="text" placeholder="Enter title" id="title"
                                    name="title" value={movieForm.title} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-start mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2 mt-2"><label for="synopsis"><b>SYNOPSIS*</b></label></div>
                            <div className="col-9">
                                <textarea className="form-control py-2" placeholder="Enter synopsis" id="synopsis" rows="2"
                                    name="synopsis" value={movieForm.synopsis} onChange={changeInputHandler}></textarea>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="trailer-url"><b>TRAILER URL</b></label></div>
                            <div className="col-9">
                                <input className="form-control py-2" type="text" placeholder="Enter trailer URL" id="trailer-url"
                                    name="trailerUrl" value={movieForm.trailerUrl} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="image-url"><b>IMAGE URL</b></label></div>
                            <div className="col-9"><input className="form-control py-2" type="text" placeholder="Enter image URL" id="image-url"
                                name="imgUrl" value={movieForm.imgUrl} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="rating"><b>RATING</b></label></div>
                            <div className="col-9"><input className="form-control py-2" type="number" placeholder="Enter rating" id="rating"
                                name="rating" value={movieForm.rating} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="genre-id"><b>GENRE</b></label></div>
                            <select className="form-select py-2" name="genreId" value={movieForm.genreId} onChange={changeInputHandler}>
                                {
                                    genres.map(genre => {
                                        return (
                                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="mt-5">
                            <button className="btn btn-danger col-3 me-2" type="submit" style={{
                                backgroundColor: '#fc0404'
                            }}><b>SUBMIT</b></button>
                            <button className="btn btn-dark col-3" type="button"><b>CANCEL</b></button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default EditPage;