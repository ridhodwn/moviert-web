import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGenres, createMovie } from '../store/actions/action-creator';

function AddPage() {
    const [castForm, setCastForm] = useState([
        {
            id: 1,
            name: '',
            profilePict: ''

        }
    ]);
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

    useEffect(() => {
        dispatch(fetchGenres())
        .then(() => {
            console.log('berhasil');
            console.log(genres)
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

    const changeCastInputHandler = (i, e) => {
        const values = [...castForm];
        values[i][e.target.name] = e.target.value;
        setCastForm(values);
    };

    const handleAdd = (id) => {
        setCastForm([...castForm, {id: id + 2, name: '', profilePict: ''}]);
    };

    const handleSubstract = (i) => {
        const values = [...castForm];
        values.splice(i, 1);
        setCastForm([...values]);
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(createMovie(movieForm, castForm)).then(() => navigate('/'));
    };

    return (
        <section>
            <h5 className="mt-5 ms-3 ps-2 border-start border-danger border-4"><b>ADD MOVIE</b></h5>
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
                        <div className="align-items-center mb-3 border-muted border rounded-3 py-3 pe-3 border-start-0">
                            <div>
                                <div className="ms-1 mb-3 ps-2 border-start border-danger border-2"><b>CAST</b></div>
                            </div>
                            {
                                castForm.map((cast, i) => {
                                    return (
                                        <div className="d-flex align-items-center" key={cast.id}>
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-4 ms-1 me-2 ps-2"><label for="cast-name"><b>Name*</b></label></div>
                                                    <div className="col-6"><input className="form-control py-1" type="text" id="cast-name"
                                                        name="name" value={castForm.name} onChange={e => changeCastInputHandler(i, e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-4 ms-1 me-2 ps-2"><label for="cast-pict"><b>Picture URL</b></label></div>
                                                    <div className="col-6"><input className="form-control py-1" type="text" id="cast-pict"
                                                        name="profilePict" value={castForm.profilePict} onChange={e => changeCastInputHandler(i, e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <button className="btn btn-success me-2" type="button" onClick={() => handleAdd(i)}><b><i className="bi bi-plus-lg"></i></b></button>
                                                <button className="btn btn-danger" type="button" onClick={() => handleSubstract(i)} disabled={cast.id === 1}><b><i className="bi bi-dash-lg"></i></b></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="mt-5">
                            <button className="btn btn-danger col-3 me-2" type="submit" style={{
                                backgroundColor: '#fc0404'
                            }}><b>ADD</b></button>
                            <button className="btn btn-dark col-3" type="button"><b>CANCEL</b></button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddPage;