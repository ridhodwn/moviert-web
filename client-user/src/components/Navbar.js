import logo from '../RT_TwitterCard_2018_2.png';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <section>
            <nav className="navbar navbar-expand-lg" style={{
                backgroundColor: '#fc0404'
            }}>
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Logo" width="210" height="60" className="d-inline-block" />
                        </Link>
                        <form className="d-flex ms-3 align-self-center">
                            <input className="form-control me-2 rounded-pill" type="search" placeholder="Search movies" placeholderTextColor="#941c04" />
                            <button className="btn btn-outline-light rounded-circle border-3" type="submit"><b><i class="bi bi-search"></i></b></button>
                        </form>
                    </div>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">
                                    <b>LOGIN/SIGNUP</b>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;