import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { login as loginService } from './AuthService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login, tokenExpiration } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle token expiration
        if (tokenExpiration) {
            const timer = setTimeout(() => {
                logoutAndRedirect();
            }, tokenExpiration - new Date().getTime());

            return () => clearTimeout(timer);
        }
    }, [tokenExpiration]);

    const logoutAndRedirect = () => {
        // Clear user data on logout
        login(null, null, null, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshtoken');
        navigate('/');
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const data = await loginService(email, password);

            if (data.Token && data.RefreshToken) {
                
                // localStorage.setItem('token', data.Token);
                // localStorage.setItem('refreshToken', data.RefreshToken);

              
                login(data.Token, data.RefreshToken, data.Roli, {
                    id: data.ID,
                    emri: data.Emri,
                    mbiemri: data.Mbiemri,
                    klientiGjinia: data.KlientiGjinia,
                    klientiQyteti: data.KlientiQyteti,
                    email: data.Email,
                });

                navigate('/home'); 
                window.location.reload();
                
            } else {
                setErrorMessage(data.message || 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login.');
        }
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row no-gutters">
                                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                                        <img src="img/book.png" alt="foto" width="550" height="600" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                            </div>
                                            <form className="user" onSubmit={handleLogin}>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Email Address..."
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                                <hr />
                                            </form>
                                            <div className="text-center">
                                                <Link className="small" to="/forgotpassword">Forgot Password?</Link>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/register">Create an Account!</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
