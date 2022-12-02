import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenreRow from '../components/GenreRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, createGenre } from '../store/actions/action-creator';

function GenresPage() {
    const genres = useSelector((state) => {
        return state.genreReducer.genres;
    });
    // const [error, setError] = useState(null);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formAddGenre, setFormAddGenre] = useState({
        name: ''
    });

    const changeInputHandler = (e) => {
        const { name, value } = e.target;
        setFormAddGenre({
            [name]: value
        })
    };

    useEffect(() => {
        dispatch(fetchGenres())
        .then(() => {
            console.log('berhasil');
            console.log(genres)
        })
        .catch((err) => {
            console.log('gagal', err);
        })
        // .catch((error) => {
        //   setError(error);
        // })
        .finally(() => {
            setLoadingGenres(false);
        });
    }, []);

    if (loadingGenres) {
        return <h1 className="p-4">Loading...</h1>
    }

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(createGenre(formAddGenre)).then(() => {
            setFormAddGenre({
                name: ''
            })
        })
    };

    // if(error) {
    //   return <div>{JSON.stringify(error)}</div>
    // }

    return (
        <section>
        
            <div className="d-flex justify-content-between mx-3 mt-5 align-items-center">
                <h5 className="ps-2 border-start border-danger border-4"><b>GENRES LIST</b></h5>
                <button className="btn btn-danger me-2" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{
                    backgroundColor: '#fc0404'
                }}><b>Add Genre</b></button>
            </div>

            <div className="mt-4 mx-3 border-top">
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col" width="60px" className="text-center">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col" width="100px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            genres.map(genre => {
                                return (
                                    <GenreRow key={genre.id} genre={genre} />
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title border-start border-danger border-3 ps-2" id="exampleModalLabel"><b>ADD GENRE</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="add-genre-form" onSubmit={submitForm}>
                            <div className="modal-body">
                                <div className="d-flex align-items-center my-2">
                                    <div className="col-12"><input type="text" className="form-control py-1" id="name" placeholder="Enter new genre"
                                        name="name" value={formAddGenre.email} onChange={changeInputHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{
                                    backgroundColor: '#000000',
                                    fontSize: '15px'
                                }}><b>Close</b></button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" style={{
                                    backgroundColor: '#fc0404',
                                    fontSize: '15px'
                                }}><b>Save</b></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default GenresPage;