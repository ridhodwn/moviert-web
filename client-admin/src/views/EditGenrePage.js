import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editGenre } from '../store/actions/action-creator';

function EditGenrePage() {
    const [genreForm, setGenreForm] = useState({
        name: ''
    });
    const [loadingGenre, setLoadingGenre] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
         fetch(`http://localhost:3000/genres/${id}`)
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                console.log('berhasil di Edit Page');
                console.log(data)
                setGenreForm({
                    name: data.name
                })
            })
            .catch((err) => {
                console.log('gagal', err);
            })
            .finally(() => {
                setLoadingGenre(false);
            });
    }, []);

    const changeInputHandler = (e) => {
        const { name, value } = e.target;
        setGenreForm({
            ...genreForm,
            [name]: value
        })
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(editGenre(genreForm, id)).then(() => navigate('/genres'));
    };

    return (
        <section>
            <h5 className="mt-5 ms-3 ps-2 border-start border-danger border-4"><b>EDIT GENRE</b></h5>
            <div className="container-fluid d-flex mt-4 pt-2">
                <div className="col-7">
                    <form id="add-movie-form" onSubmit={submitForm}>
                        <p className="py-0 mb-1"><i className="text-muted ms-1" style={{
                            fontSize: '14px'
                        }}>* required</i></p>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="title"><b>NAME*</b></label></div>
                            <div className="col-9">
                                <input className="form-control py-2" type="text" placeholder="Enter title" id="title"
                                    name="name" value={genreForm.name} onChange={changeInputHandler} />
                            </div>
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

export default EditGenrePage;