import React, { useState, useEffect } from 'react';
import { variables } from './Variables';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import MjeteShkollore from './MjeteShkollore';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

function Home() {
    const [librat, setLibrat] = useState([]);
    const [mjetet, setMjetet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shporta, setShporta] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const [kategorite, setKategorite] = useState([]);
    const [tipet, setTipet] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, refreshToken } = useAuth();
    const navigate = useNavigate();
    
        const { tokenExpiration, login } = useAuth();
        const [timeLeft, setTimeLeft] = useState(null);
    
        useEffect(() => {
            if (tokenExpiration) {
                const timer = setTimeout(async () => {
                    const success = await refreshToken();
                    if (!success) {
                        logoutAndRedirect(); 
                    }
                }, tokenExpiration - new Date().getTime());
    
                const interval = setInterval(() => {
                    const remainingTime = tokenExpiration - new Date().getTime();
                    if (remainingTime > 0) {
                        setTimeLeft(Math.ceil(remainingTime / 1000));
                        // console.log(`Time left before logout: ${Math.ceil(remainingTime / 1000)} seconds`);
                    } else {
                        clearInterval(interval);
                        logoutAndRedirect();
                    }
                }, 1000);
    
                return () => {
                    clearTimeout(timer);
                    clearInterval(interval);
                };
            }
        }, [tokenExpiration, refreshToken]);
    
        const logoutAndRedirect = () => {
            Logout();
            // localStorage.removeItem('token');
            // localStorage.removeItem('refreshtoken');
            navigate('/');
        };



    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLibrat();
                await fetchMjetet();
                await fetchKategorite();
                await fetchTipet();
            } catch (error) {
                console.error('Error during fetching data:', error);
            
                const refreshed = await refreshToken();
                if (!refreshed) {
                  
                    navigate('/');
                } else {
                    
                    await fetchLibrat();
                    await fetchMjetet();
                    await fetchKategorite();
                    await fetchTipet();
                }
            }
        };

        fetchData();
    }, [refreshToken, navigate]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchLibrat = async () => {
        try {
            const response = await fetch(variables.API_URL + 'libri/GetLibratMeTeRinje', {
                headers: {
                    'Authorization': `Bearer ${user.token}`, 
                }
            });
            if (!response.ok) {
                throw new Error('Gabim gjatë marrjes së të dhënave');
            }
            const data = await response.json();
            setLibrat(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMjetet = async () => {
        try {
            const response = await fetch(variables.API_URL + 'MjeteShkollore', {
                headers: {
                    'Authorization': `Bearer ${user.token}`, 
                }
            });
            if (!response.ok) {
                throw new Error('Gabim gjatë marrjes së të dhënave');
            }
            const data = await response.json();
            setMjetet(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchKategorite = async () => {
        try {
            const response = await fetch(variables.API_URL + 'kategoria', {
                headers: {
                    'Authorization': `Bearer ${user.token}`, 
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setKategorite(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTipet = async () => {
        try {
            const response = await fetch(variables.API_URL + 'tipi', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Gabim gjatë marrjes së të dhënave');
            }
            const data = await response.json();
            setTipet(data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredLibrat = librat.filter(libri =>
        libri.Titulli.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredMjetet = mjetet.filter(mjeti =>
        mjeti.Pershkrimi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="spinner text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    const addToCart = (libri) => {
        const shporta = JSON.parse(localStorage.getItem('shporta')) || [];
        shporta.push(libri);
        localStorage.setItem('shporta', JSON.stringify(shporta));
        setShowModal(true); // Shfaq modal-in
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseWishListModal = () => {
        setShowWishListModal(false);
    };

    const addToWishList = (libri) => {
        const wishList = JSON.parse(localStorage.getItem('WishList')) || [];
        wishList.push(libri);
        localStorage.setItem('WishList', JSON.stringify(wishList));
        setShowWishListModal(true);
    };

    return (
        <div>
            <style>
                {`
                .card {
                    transition: transform 0.2s, box-shadow 0.2s;
                    border: none;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }

                .card-body {
                    background-color: #f8f9fa;
                    padding: 20px;
                }

                .card-footer {
                    background-color: #ffffff;
                }

                .card-title {
                    font-size: 1.5rem;
                    color: #343a40;
                }

                .text-decoration-none {
                    text-decoration: none;
                }
               
                `}
            </style>
            <Header />
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9" style={{ paddingRight: '50px' }}>
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                      
            {/* {timeLeft !== null && <div>Time left before logout: {timeLeft} seconds</div>} */}

                            <div className="input-group" style={{marginBottom:'50px'}}>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 large"
                                    placeholder="Kërko..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    style={{paddingInlineEnd:'100px'
                                    }}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {searchTerm ? (
                            <div className="row">
                                {filteredLibrat.length > 0 ? (
                                    filteredLibrat.map(libri => (
                                        <div className="col-md-4 mb-4" key={libri.ID}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={variables.API_URL + 'libri/GetFoto/' + libri.ID}
                                                    alt={libri.Titulli}
                                                    className="card-img-top"
                                                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{libri.Titulli}</h5>
                                                    <p className="card-text flex-grow-1">{libri.ShtepiaBotuese}</p>
                                                    <div className="mt-auto d-flex align-items-center">
                                                        <Link to={`/libri/${libri.ID}`} className="btn btn-primary mr-2">
                                                            Detajet
                                                        </Link>

                                                        {user && user.roli === 'User' && (
                                                            <button onClick={() => addToCart(libri)} className="btn btn-success mr-2">
                                                                Shto ne Shportë
                                                            </button>
                                                        )}

                                                        {user && user.roli === 'User' && (

                                                            <Link onClick={() => addToWishList(libri)} className="btn btn-outline-danger">
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                ) : (
                                    <div className="col-12">
                                        <p className="text-center">Nuk u gjet asnje liber per kerkesen tuaj.</p>
                                    </div>
                                )}
                                <div className="row">
                                    {filteredMjetet.length > 0 ? (
                                        filteredMjetet.map(mjeti => (

                                            <div className="col-md-4 mb-4" key={mjeti.ID}>
                                                <div className="card h-100 shadow-sm">
                                                    <img
                                                        src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID}
                                                        alt={mjeti.TipiID}
                                                        className="card-img-top"
                                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                    />
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">{mjeti.TipiID}</h5>
                                                        <p className="card-text flex-grow-1">{mjeti.Pershkrimi}</p>
                                                        <div className="mt-auto d-flex align-items-center">
                                                            <Link to={`/libri/${mjeti.ID}`} className="btn btn-primary mr-2">
                                                                Detajet
                                                            </Link>

                                                            {user && user.roli === 'User' && (
                                                                <button onClick={() => addToCart(mjeti)} className="btn btn-success mr-2">
                                                                    Shto ne Shportë
                                                                </button>
                                                            )}

                                                            {user && user.roli === 'User' && (

                                                                <Link onClick={() => addToWishList(mjeti)} className="btn btn-outline-danger">
                                                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12">
                                            <p className="text-center">Nuk u gjet asnje mjet per kerkesen tuaj.</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ) : (
                            <>
                                <div className="row" style={{ marginRight: '30px' }}>
                                    <div className="col-12">
                                        {/* <h1 className="mb-4 text-center">Kategoritë</h1> */}
                                        <div className="card-deck">
                                            {kategorite.map(kategoria => (
                                                <div key={kategoria.KategoriaID} className="col-md-4 mb-4">
                                                    <Link to={`/kategoria/${kategoria.KategoriaID}/librat`} className="text-decoration-none">
                                                        <div className="card h-100">
                                                            <div className="card-body text-center">
                                                                <h5 className="card-title">{kategoria.kategoria}</h5>
                                                            </div>
                                                            <div className="card-footer">
                                                                <small className="text-muted">Kliko per më shumë</small>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <h1 className="mb-4 text-center">Tipet</h1>
                                        <div className="card-deck">
                                            {
                                                tipet.map(tipi => (
                                                    <div key={tipi.TipiID} className="col-md-4 mb-4">
                                                        <Link to={`/tipi/${tipi.TipiID}/MjeteShkollore`} className="text-decoration-none">
                                                            <div className="card h-100">
                                                                <div className="card-body text-center">
                                                                    <h5 className="card-title">{tipi.tipi}</h5>
                                                                </div>
                                                                <div className="card-footer">
                                                                    <small className="text-muted">Kliko për më shumë</small>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))

                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="row" style={{ margin: '20px 0' }}>
                                    <h1>Librat Më Të Rinjë</h1>
                                    {librat.map(libri => (
                                        <div className="col-md-4 mb-4" key={libri.ID}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={variables.API_URL + 'libri/GetFoto/' + libri.ID}
                                                    alt={libri.Titulli}
                                                    className="card-img-top"
                                                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{libri.Titulli}</h5>
                                                    <p className="card-text flex-grow-1">{libri.ShtepiaBotuese}</p>
                                                    <div className="mt-auto d-flex align-items-center">
                                                        <Link to={`/libri/${libri.ID}`} className="btn btn-primary mr-2">
                                                            Detajet
                                                        </Link>

                                                        {user && user.roli === 'User' && (
                                                            <button onClick={() => addToCart(libri)} className="btn btn-success mr-2">
                                                                Shto ne Shportë
                                                            </button>
                                                        )}

                                                        {user && user.roli === 'User' && (

                                                            <Link onClick={() => addToWishList(libri)} className="btn btn-outline-danger">
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row" style={{ margin: '20px 0' }}>
                                    <h1>Mjetet Shkollore</h1>
                                    {mjetet.map(mjeti => (
                                        <div className="col-md-4 mb-4" key={mjeti.ID}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID}
                                                    alt={mjeti.TipiID}
                                                    className="card-img-top"
                                                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{mjeti.tipi}</h5>
                                                    <p className="card-text flex-grow-1">{mjeti.Pershkrimi}</p>
                                                    <div className="mt-auto">
                                                        <Link to={`/MjeteShkollore/${mjeti.ID}`} className="btn btn-primary mr-2">
                                                            Detajet
                                                        </Link>

                                                        {user && user.roli === 'User' && (

                                                            <button onClick={() => addToCart(mjeti)} className="btn btn-success"> Shto në Shportë</button>
                                                        )}

                                                        {user && user.roli === 'User' && (

                                                            <Link onClick={() => addToWishList(mjeti)} className="btn btn-outline-danger" style={{ marginLeft: '8px' }}>
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </Link>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Shtimi në Shportë</Modal.Title>
                </Modal.Header>
                <Modal.Body>Libri është shtuar me sukses në shportë!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Mbylle
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showWishListModal} onHide={handleCloseWishListModal}>
                <Modal.Header closeButton>
                    <Modal.Title> WishList <i class="fa fa-check" aria-hidden="true"></i></Modal.Title>
                </Modal.Header>
                <               Modal.Body>Produkti eshte shtuar me sukses ne listen e deshirave!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseWishListModal}>
                        Mbylle
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;

