import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { variables } from './Variables'; // Make sure the path is correct

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [canResetPassword, setCanResetPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim()) {
            setErrorMessage('Please enter your email address.');
            return;
        }

        try {
            const response = await fetch(variables.API_URL + 'Klienti/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, newPassword: '' }) // Sending an empty newPassword for email confirmation
            });

            if (response.ok) {
                setShowConfirmation(true);
                setCanResetPassword(true);
                setErrorMessage('');
            } else {
                const data = await response.text();
                setErrorMessage(data);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        if (!newPassword.trim()) {
            setErrorMessage('Please enter a new password.');
            return;
        }

        try {
            const response = await fetch(variables.API_URL + 'Klienti/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, newPassword })
            });

            if (response.ok) {
                setShowConfirmation(false);
                setCanResetPassword(false);
                setEmail('');
                setNewPassword('');
                setErrorMessage('');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                const data = await response.text();
                setErrorMessage(data);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <body className="bg-gradient-primary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {showConfirmation && (
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="alert alert-success mt-3">
                                                Email confirmed. You can now reset your password.
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Forgot Your Password?</h1>
                                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                            </div>
                                            {!canResetPassword ? (
                                                <form className="user" onSubmit={handleEmailSubmit}>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-user"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..."
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                                        Confirm Email
                                                    </button>
                                                </form>
                                            ) : (
                                                <form className="user" onSubmit={handlePasswordReset}>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="exampleInputPassword"
                                                            placeholder="Enter New Password..."
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                                        Reset Password
                                                    </button>
                                                </form>
                                            )}
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="/">Back to Login</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <img src="img/book.png" alt="foto" width="400" height="600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ForgotPassword;
