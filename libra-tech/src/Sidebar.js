import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { variables } from './Variables';
import { useAuth } from './AuthProvider';
function Sidebar() {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };
    const { user } = useAuth();
    console.log('Current user:', user);
    const [categories, setCategories] = useState([]);
    const [tipet, setTipet] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(variables.API_URL + 'Kategoria');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së kategorive: ', error);
        }
    };

    useEffect(() => {
        fetchTipet();
    }, []);

    const fetchTipet = async () => {
        try {
            const response = await fetch(variables.API_URL + 'Tipi');
            const data = await response.json();
            setTipet(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së kategorive: ', error);
        }
    };

    return (
        <div>
            <style>
                {`
                body {
                    font-family: "Nunito", sans-serif;
                }
                .navbar-nav {
                    background-color: #4e73df;
                    color: white;
                    position: fixed;
                    height: 100%;
                    top: 0;
                    left: 0;
                    padding-top: 20px;
                    transition: all 0.3s;
                }
                .navbar-nav .nav-item a {
                    color: white;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }
                .navbar-nav .nav-item a i {
                    margin-right: 10px;
                }
                .navbar-nav .sidebar-brand {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                .navbar-nav .sidebar-brand button {
                    border: none;
                    background: none;
                }
                .navbar-nav.toggled {
                    width: 80px;
                }
                .navbar-nav.toggled .nav-item a span {
                    display: none;
                }
                `}
            </style>
            <div id="wrapper">
                <ul className={style} id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">LibraTech</div>
                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                        </div>
                    </a>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">
                            <i className="fa fa-home"></i>
                            <span>Home</span>
                        </Link>
                        {user && user.roli === 'Admin' && (
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </Link>
                        )}
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/userProfile" data-toggle="collapse" data-target="#collapseUserProfile" aria-expanded="true" aria-controls="collapseUserProfile">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span>User Profile</span>
                        </a>
                        <div id="collapseUserProfile" className="collapse" aria-labelledby="headingUserProfile" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <a className="collapse-item" href="/UserProfile">My Profile</a>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLibra" aria-expanded="true" aria-controls="collapseLibra">
                            <i className="fa fa-list"></i>
                            <span>Libra</span>
                        </a>
                        {/* <div id="collapseLibra" className="collapse" aria-labelledby="headingLibra" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <div className="list-group">
                                    {categories.map(kategoria => (
                                        <Link key={kategoria.ID} to={`/kategoria/${kategoria.kategoria}/librat`} style={{ color: 'black' }} className="collapse-item">
                                            {kategoria.kategoria}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMjeteShkollore" aria-expanded="true" aria-controls="collapseMjeteShkollore">
                            <i className="fa fa-list"></i>
                            <span>Mjete Shkollore</span>
                        </a>
                        {/* <div id="collapseMjeteShkollore" className="collapse" aria-labelledby="headingMjeteShkollore" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <div className="list-group">
                                    {tipet.map(tipi => (
                                        <Link key={tipi.TipiID} to={`/tipi/${tipi.TipiEmri}/MjeteShkollore`} style={{ color: 'black' }} className="collapse-item">
                                            {tipi.TipiEmri}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </li>

                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item active">
                    {user && user.roli === 'User' && (
                        <Link className="nav-link" to="/shporta">
                        <i className="fas fa-shopping-cart fa-fw"aria-hidden="true" ></i>
                            <span>Shporta</span>
                        </Link>
                    )}
                 {user && user.roli === 'User' && (
                            <Link className="nav-link" to="/wishlist">
                                 <i className="fa fa-heart "aria-hidden="true" ></i>
                                <span>WishList</span>
                            </Link>
                        )}
                    </li>

                    {/* <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Login Screens:</h6>
                                <a className="collapse-item" href="/">Login</a>
                                <a className="collapse-item" href="register">Register</a>
                                <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                <a className="collapse-item" href="/stafiSchedule">Staff Schedule</a>
                                <a className="collapse-item" href="/stafi">Staff Dashboard</a>
                                
                                
                                <div className="collapse-divider"></div>
                            </div>
                        </div>
                    </li> */}

                    {/* <li className="nav-item">
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Charts</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Tables</span>
                        </a>
                    </li> */}


                    <hr className="sidebar-divider d-none d-md-block" />
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
