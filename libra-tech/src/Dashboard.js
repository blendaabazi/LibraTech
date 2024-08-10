import { Link } from 'react-router-dom';
import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { variables } from './Variables';
import { useAuth } from './AuthProvider';
import axios from 'axios';

function Dashboard() {
    const { isAuthenticated, user, logout } = useAuth();
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const [porositeCount, setPorositeCount] = useState(null);
    const currentDate = new Date().toISOString().split('T')[0]; // Merr datën e sotme në formatin 'yyyy-MM-dd'
    const [selectedDate, setSelectedDate] = useState('');
    const [porositeCountt, setPorositeCountt] = useState(0);
    const [topProduktet, setTopProduktet] = useState([]);

    useEffect(() => {
        countPorosite(currentDate);
    }, []);

    const countPorosite = async (date) => {
        try {
            const response = await axios.get(`http://localhost:5170/api/Porosia/CountOnDate/${date}`);
            setPorositeCount(response.data);
        } catch (error) {
            console.error('Gabim gjatë kërkesës në backend:', error);
        }
    };
    const countSelectedPorosite = async (date) => {
        try {
            const response = await axios.get(`http://localhost:5170/api/Porosia/CountOnDate/${date}`);
            setPorositeCountt(response.data);
        } catch (error) {
            console.error('Gabim gjatë kërkesës në backend:', error);
        }
    };

    useEffect(() => {
        const fetchTopProduktet = async () => {

            try {
                const response = await axios.get('http://localhost:5170/api/Porosia/TopProducts');
                setTopProduktet(response.data);
            } catch (error) {
                console.error('Error fetching top products:', error);
            }
        };

        fetchTopProduktet();
    }, []);


    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
    };

    const handleButtonClick = () => {
        if (selectedDate) {
            countSelectedPorosite(selectedDate);
        } else {
            alert('Ju lutem zgjidhni një datë.');
        }
    }
    const [totalLibrat, setTotalLibrat] = useState(0);

    useEffect(() => {
        fetchTotalLibrat();
    }, []);

    const fetchTotalLibrat = async () => {
        try {
            const response = await fetch(variables.API_URL + 'libri/TotalLibrat');
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setTotalLibrat(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [totalKlienti, setTotalKlienti] = useState(0);

    useEffect(() => {
        fetchtotalKlienti();
    }, []);

    const fetchtotalKlienti = async () => {
        try {
            const response = await fetch(variables.API_URL + 'klienti/TotalKlienti');
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setTotalKlienti(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [totalStafi, setTotalStafi] = useState(0);

    useEffect(() => {
        fetchtotalStafi();
    }, []);

    const fetchtotalStafi = async () => {
        try {
            const response = await fetch(variables.API_URL + 'stafi/TotalStafi');
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setTotalStafi(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [categories, setCategories] = useState([]);

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
    const [totalMjetet, setTotalMjetet] = useState(0);

    useEffect(() => {
        fetchTotalMjetet();
    }, []);

    const fetchTotalMjetet = async () => {
        try {
            const response = await fetch(variables.API_URL + 'MjeteShkollore/TotalMjetet');
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setTotalMjetet(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [tipet, setTipi] = useState([]);

    useEffect(() => {
        fetchTipi();
    }, []);

    const fetchTipi = async () => {
        try {
            const response = await fetch(variables.API_URL + 'Tipi');
            const data = await response.json();
            setTipi(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së tipeve: ', error);
        }
    };


    return (
        <div>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar">

                        {/*  <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-book"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">LibraTech</div>
                            <div className="text-center d-none d-md-inline">
                                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                            </div>
                        </a>


                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*  <!-- Nav Item - Dashboard --> */}

                        <li className="nav-item active">
                            <a className="nav-link" href="./home">
                                <i className="fa fa-home" aria-hidden="true"></ i>
                                <span>Home</span></a>
                            <Link className="nav-link" to="/stafi">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></Link>

                        </li>

                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />

                        {/*   <!-- Heading --> */}


                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>User Profile</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <a className="collapse-item" href="buttons.html">My Profile</a>

                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLibra"
                                aria-expanded="true" aria-controls="collapseLibra">
                                <i className="fa fa-list"></i>
                                <span>Libra</span>
                            </a>
                            <div id="collapseLibra" className="collapse" aria-labelledby="headingLibra"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">

                                    <div className="list-group">
                                        {categories.map(kategoria => (
                                            <Link key={kategoria.ID} to={`/kategoria/${kategoria.kategoria}/librat`} style={{ color: 'black' }} className="collapse-item">
                                                {kategoria.kategoria}
                                            </Link>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLibra"
                                aria-expanded="true" aria-controls="collapseLibra">
                                <i className="fa fa-list"></i>
                                <span>Mjete Shkollore</span>
                            </a>
                            <div id="collapseLibra" className="collapse" aria-labelledby="headingLibra"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">

                                    <div className="list-group">
                                        {tipet.map(tipi => (
                                            <Link key={tipi.TipiID} to={`/tipi/${tipi.TipiEmri}/mjeteshkollore`} style={{ color: 'black' }} className="collapse-item">
                                                {tipi.TipiEmri}
                                            </Link>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </li>

                        <hr className="sidebar-divider" />
                        <hr className="sidebar-divider d-none d-md-block" />
                    </ul>
                    {/*  <!-- End of Sidebar --> */}

                    {/*  <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/*  <!-- Main Content --> */}
                        <div id="content">

                            {/*  <!-- Topbar --> */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                {/*  <!-- Sidebar Toggle (Topbar) --> */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                    <i className="fa fa-bars"></i>
                                </button>



                                {/*  <!-- Topbar Navbar --> */}
                                <ul className="navbar-nav ml-auto">



                                    {/* <!-- Nav Item - User Information --> */}
                                    {isAuthenticated ? (
                                        <li className="nav-item dropdown no-arrow">
                                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="mr-2 d-none d-lg-inline text-dark font-weight-bold text-uppercase">{user.emri}</span>


                                            </a>
                                            {/*  <!-- Dropdown - User Information --> */}
                                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown">
                                                <a className="dropdown-item" href="#">
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
                                        <Link className="btn btn-primary" to="/login">Login</Link>
                                    )}
                                </ul>

                            </nav>
                            {/*  <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                </div>

                                {/*  <!-- Content Row --> */}

                                <div className="row">

                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-m font-weight-bold text-success text-uppercase mb-1">
                                                            <a href='Libri'>Librat</a></div>
                                                        <div className="h3 mb-0 font-weight-bold text-gray-800"> {totalLibrat}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a href='Libri' className="h5 mb-0 text-gray-800"> <i className="fas fa-book large-icon"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-m font-weight-bold text-success text-uppercase mb-1">
                                                            <a href='mjeteshkollore'>Mjetet Shkollore</a></div>
                                                        <div className="h3 mb-0 font-weight-bold text-gray-800"> {totalMjetet}</div>
                                                    </div>
                                                    <div className="col-auto">

                                                        <a href='MjeteShkollore' className="h5 mb-0 text-gray-800"> <i className="fas fa-book large-icon"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-m font-weight-bold text-success text-uppercase mb-1">
                                                            <a href='Klienti'>Klientët</a></div>
                                                        <div className="h3 mb-0 font-weight-bold text-gray-800"> {totalKlienti}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a href='klienti' className="h5 mb-0 text-gray-800"><i class="fa fa-user" aria-hidden="true"></i></a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-m font-weight-bold text-success text-uppercase mb-1">
                                                            <a href='Stafi'>Stafi</a></div>
                                                        <div className="h3 mb-0 font-weight-bold text-gray-800"> {totalStafi}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a href='stafi' className="h5 mb-0 text-gray-800"><i class="fa fa-user" aria-hidden="true"></i></a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4" >


                                        <a href='Porosia' className="h5 mb-0 text-gray-800">Porosite</a>

                                    </div>


                                    {/*  <!-- Pending Requests Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div>
                                                            <p>Numri i porosive për datën {currentDate}:</p>
                                                        </div>
                                                        <div className="h3 mb-0 font-weight-bold text-gray-800"> {porositeCount !== null ? porositeCount : 'Loading...'}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a href='Porosia' className="h5 mb-0 text-gray-800"> <i class="fa fa-shopping-bag" aria-hidden="true"></i></a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-md-8 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="form-group">
                                                            <label htmlFor="dateInput">Zgjidhni datën:</label>
                                                            <input
                                                                type="date"
                                                                id="dateInput"
                                                                value={selectedDate}
                                                                onChange={handleDateChange}
                                                                className="form-control w-50"
                                                            />
                                                        </div>
                                                        <button onClick={handleButtonClick} className="btn btn-primary mb-3">Numëro Porositë</button>
                                                        <p className="font-weight-bold">Numri i porosive më: {selectedDate} është {porositeCountt !== null ? porositeCountt : 'Loading...'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Top Produktet</h6>
                                </div>
                                <div className="card-body">
                                    {topProduktet.length > 0 ? (
                                        <ul>
                                            {topProduktet.map((produkt, index) => (
                                                <li key={index}>
                                                    {produkt.EmriProduktit} - {produkt.NumriShitjeve} shitje
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Nuk ka të dhëna për të shfaqur.</p>
                                    )}
                                </div>
                                </div>


                            </div>

                        </div>

                        {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; LibraTech</span>
                                </div>
                            </div>
                        </footer>

                    </div>
                </div>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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

            </body >
        </div >
    )
}

export default Dashboard;

