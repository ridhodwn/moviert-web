import logo from '../RT_TwitterCard_2018_2.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const access_token = localStorage.getItem('access_token');

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
                        <p className="text-light mt-4"><b>ADMIN PANEL</b></p>
                    </div>
                    <div>
                        {access_token ? (
                            <ul className="navbar-nav">
                                <li className="nav-item me-2">
                                    <Link className="nav-link text-light" to="genres">
                                        <b>GENRE</b>
                                    </Link>
                                </li>
                                <li className="nav-item me-2">
                                    <Link className="nav-link text-light" to="register">
                                        <b>REGISTER ADMIN</b>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">
                                        <b>LOGOUT</b>
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;