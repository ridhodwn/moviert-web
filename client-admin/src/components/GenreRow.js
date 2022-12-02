import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGenre } from '../store/actions/action-creator';

function GenreRow({ genre }) {
    const dispatch = useDispatch();

    return (
        <tr>
            <td scope="row" className="text-center">{genre.id}</td>
            <td className="fw-bold">{genre.name}</td>
            <td className="d-flex justify-content-evenly">
                <Link to={`update/${genre.id}`} className="bi bi-pencil-fill me-2"></Link>
                <button onClick={() => dispatch(deleteGenre({ id: genre.id }))} className="bi bi-trash-fill text-danger me-2 border-0 btn btn-outline-light"></button>
            </td>
        </tr >
    )
}

export default GenreRow;