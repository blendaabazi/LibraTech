import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import './Profile.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function UserProfile() {
    const { user, updateUser } = useAuth();
    const [modalTitle, setModalTitle] = useState("");
    const [editUser, setEditUser] = useState({ ...user });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setEditUser({ ...user });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleSubmit = () => {
        updateUser(editUser);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setEditUser({ ...user });
        setModalTitle("Edit Profile");
        setIsModalOpen(true);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                <Sidebar />
                <div className="main-content">
                    <div className="profile-header">
                        <h1>{user.emri} {user.mbiemri}</h1>
                    </div>
                    <div className="profile-details">
                        <p><strong>Emri:</strong> {user.emri}</p>
                        <p><strong>Mbiemri:</strong> {user.mbiemri}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Qyteti:</strong> {user.klientiQyteti}</p>
                        <p><strong>Gjinia:</strong> {user.klientiGjinia}</p>
                    </div>
                    <div className="profile-actions">
                        <button className="btn-primary" onClick={openModal}>Edit Profile</button>
                        <Link to="/ForgotPassword" className="btn btn-secondary">
                            Change Password
                        </Link>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emri</span>
                                            <input type="text" className="form-control" name="emri" value={editUser.emri} onChange={handleChange} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Mbiemri</span>
                                            <input type="text" className="form-control" name="mbiemri" value={editUser.mbiemri} onChange={handleChange} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Email</span>
                                            <input type="email" className="form-control" name="email" value={editUser.email} onChange={handleChange} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Qyteti</span>
                                            <input type="text" className="form-control" name="klientiQyteti" value={editUser.klientiQyteti} onChange={handleChange} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Gjinia</span>
                                            <input type="text" className="form-control" name="klientiGjinia" value={editUser.klientiGjinia} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary float-end" onClick={handleSubmit}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default UserProfile;
