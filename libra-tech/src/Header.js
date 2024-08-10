import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const [style, setStyle] = useState("navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow");
    // const [searchTerm, setSearchTerm] = useState("");

    const changeStyle1 = () => {
        if (style === "navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow") {
            setStyle("navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow toggled1");
        } else {
            setStyle("navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow");
        }
    };
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <nav className={style} style={{ paddingLeft: '800px' }}>
                    {/* Sidebar Toggle (Topbar) */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <div className="d-flex justify-content-center">
                        {user && user.roli === 'User' && (
                        <div style={{ marginLeft: '500px' }}>
                            {/* Butoni i shportes */}
                            <Link to="/wishlist" className="nav-link">
                            <i className="fa fa-heart" aria-hidden="true" style={{ fontSize: '24px' }}></i>
                            </Link>
                        </div>
                        )}
                        {/* Cart Button */}
                        {user && user.roli === 'User' && (
                        <div>
                            {/* Butoni i shportes */}
                            <Link to="/Shporta" className="nav-link">
                                <i className="fas fa-shopping-cart fa-fw" style={{ fontSize: '24px' }}></i>
                            </Link>
                        </div>
                        )}
                    </div>
                    <div style={{ marginLeft: 'auto', marginRight: '30px', paddingBottom: '30px' }}>
                        {isAuthenticated ? (
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-dark font-weight-bold text-uppercase">{user.emri}</span>

                                </a>
                                {/* Dropdown - User Information */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="/UserProfile">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>

                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        ) : (
                            <Link className="btn btn-primary" to="/login">Kyçu</Link>
                        )}
                    </div>
                </nav>
            </div>
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" href="/logout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
