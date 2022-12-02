import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../store/actions/action-creator';

function MovieRow({ movie }) {
    const dispatch = useDispatch();

    return (
        <>
            <tr>
                <td scope="row">{movie.id}</td>
                <td className="fw-bold">{movie.title}</td>
                <td>
                    <img src={movie.imgUrl} className="img-fluid" />
                </td>
                <td>{movie.synopsis}</td>
                <td>{movie.rating}%</td>
                <td>{movie.Genre.name}</td>
                <td>{movie.User.username}</td>
                <td className="justify-content-center">
                    <button className="btn btn-primary py-1" type="button" data-bs-toggle="modal" data-bs-target={`#castModal${movie.id}`}>
                        See cast
                    </button>
                </td>
                <td className="text-center">
                    <Link to={`edit/${movie.id}`} className="bi bi-pencil-fill"></Link>
                    <button onClick={() => dispatch(deleteMovie({ id: movie.id }))} className="bi bi-trash-fill text-danger border-0 btn btn-outline-light"></button>
                </td>
            </tr>

            <div className="modal fade" id={`castModal${movie.id}`} tabindex="-1" aria-labelledby="castModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title border-start border-danger border-3 ps-2" id="castModalLabel"><b>CAST</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row row-cols-md-6">
                                {
                                    movie.Casts.map(cast => {
                                        return (
                                            <div key={cast.id} className="pe-1">
                                                <div className="col p-0">
                                                    <div className="card h-100 col-12 border-0">
                                                        <div className="bg-cover col-1" style={{
                                                            width: "100%",
                                                            height: "150px",
                                                            background: `url(${cast.profilePict}) no-repeat top`,
                                                            backgroundSize: "cover"
                                                        }}>
                                                        </div>
                                                        <div className="card-body mb-0 mt-0 px-0">
                                                            <p className="card-text mt-0 mb-0" style={{
                                                                fontSize: '15px'
                                                            }}>{cast.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{
                                backgroundColor: '#000000',
                                fontSize: '15px'
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MovieRow;