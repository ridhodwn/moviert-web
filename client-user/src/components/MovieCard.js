import tomatoRotten from '../1061px-Rotten_Tomatoes_rotten.png';
import tomatoGood from '../1009px-Rotten_Tomatoes.png';
import tomatoFresh from '../cf-lg.png';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    let tomatoRating = '';
    if(movie.rating >= 75) {
        tomatoRating = tomatoFresh;
    } else if (movie.rating >= 60) {
        tomatoRating = tomatoGood;
    } else {
        tomatoRating = tomatoRotten;
    }

    return (
        <Link to={`movies/${movie.id}`} className="text-decoration-none text-dark">
            <div className="col mb-2 p-0">
                <div className="card col-12 h-100 border-0">
                    <img src={movie.imgUrl} className="card-img-top h-75 mb-0 rounded-4" />
                    <div className="card-body mb-0 ps-0">
                        <div className="d-flex col-12">
                            <img src={tomatoRating} width="20" height="20" className="me-1 mt-1" />
                            <h5 className="card-title">{movie.rating}%</h5>
                        </div>
                        <p className="card-text mt-0" style={{
                            fontSize: '15px'
                        }}>{movie.title}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;