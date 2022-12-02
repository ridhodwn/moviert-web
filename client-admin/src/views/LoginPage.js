import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/actions/action-creator';

function LoginPage() {
    const [formUser, setFormUser] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeInputHandler = (e) => {
        const { name, value } = e.target;
        setFormUser({
            ...formUser,
            [name]: value
        })
    };
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login(formUser)).then(() => navigate('/'));
    };

    const access_token = localStorage.getItem('access_token');
    if(access_token) {
        return <Navigate to="/"/>
    }

    return (
        <section>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="col-4">
                    <form id="login-form" onSubmit={submitForm}>
                        <div className="mt-3 mb-4">
                            <h4 className="ps-2 border-start border-danger border-4"><b>LOGIN TO CONTINUE</b></h4>
                        </div>
                        <div className="d-flex align-items-center mb-3 mt-5">
                            <div className="col-3 ps-2 border-start border-danger border-2"><label for="email"><b>EMAIL*</b></label></div>
                            <div className="col-8 ms-4"><input type="text" className="form-control py-1" id="email" placeholder="Enter email address"
                                name="email" value={formUser.email} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ps-2 border-start border-danger border-2"><label for="password"><b>PASSWORD*</b></label></div>
                            <div className="col-8 ms-4"><input type="password" className="form-control" id="password" placeholder="Enter password"
                                name="password" value={formUser.password} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <button className="btn btn-dark mt-2 col-5 mb-3" type="submit" style={{
                            backgroundColor: '#000000'
                        }}><b>Enter Site</b></button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;