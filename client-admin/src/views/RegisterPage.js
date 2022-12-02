import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/actions/action-creator';

function RegisterPage() {
    const [formUser, setFormUser] = useState({
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        address: ''
    });
    const changeInputHandler = (e) => {
        const { name, value } = e.target;
        setFormUser({
            ...formUser,
            [name]: value
        })
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(register(formUser)).then(() => {
            setFormUser({
                email: '',
                password: '',
                username: '',
                phoneNumber: '',
                address: ''
            })
        });
    };

    return (
        <section>
            <h5 className="mt-5 ms-3 ps-2 border-start border-danger border-4"><b>REGISTER ADMIN</b></h5>
            <div className="container-fluid d-flex mt-4 pt-2">
                <div className="col-7">
                    <form id="register-form" onSubmit={submitForm}>
                        <p className="py-0 mb-1"><i className="text-muted ms-1" style={{
                            fontSize: '14px'
                        }}>* required</i></p>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="username"><b>USERNAME</b></label></div>
                            <div className="col-9">
                                <input className="form-control py-2" type="text" placeholder="Enter username" id="username"
                                    name="username" value={formUser.username} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-start mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2 mt-2"><label for="email"><b>EMAIL*</b></label></div>
                            <div className="col-9"><input className="form-control py-2" placeholder="Enter email" id="email" rows="2"
                                name="email" value={formUser.email} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="password"><b>PASSWORD*</b></label></div>
                            <div className="col-9"><input className="form-control py-2" type="text" placeholder="Enter password" id="password"
                                name="password" value={formUser.password} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2"><label for="phoneNumber"><b>PHONE NUMBER</b></label></div>
                            <div className="col-9"><input className="form-control py-2" type="text" placeholder="Enter phone number" id="phoneNumber"
                                name="phoneNumber" value={formUser.phoneNumber} onChange={changeInputHandler} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <div className="col-3 ms-1 ps-2 border-start border-danger border-2 mb-4"><label for="address"><b>ADDRESS</b></label></div>
                            <div className="col-9"><textarea className="form-control py-2" type="textarea" placeholder="Enter address" id="address"
                                name="address" value={formUser.address} onChange={changeInputHandler}></textarea>
                            </div>
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

export default RegisterPage;