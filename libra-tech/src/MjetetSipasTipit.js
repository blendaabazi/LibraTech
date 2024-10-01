import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from './Variables';
import Header from './Header';
import Footer from './Footer';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function MjetetSipasTipit() {
    const { tipi } = useParams();
    const [mjetet, setMjetet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shporta, setShporta] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [wishList, setWishList] = useState([]);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchMjetetByTipi(tipi);
    }, [tipi]);

    const fetchMjetetByTipi = async (tipi) => {
        try {
            const response = await fetch(variables.API_URL + `MjeteShkollore/tipi/${tipi}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setMjetet(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const addToCart = (mjeti) => {
        setShporta([...shporta, mjeti]);
        setShowModal(true);
    };
    const addToWishList = (mjeti) => {
        const wishList = JSON.parse(localStorage.getItem('WishList')) || [];
        wishList.push(mjeti);
        localStorage.setItem('WishList', JSON.stringify(wishList));
        setShowWishListModal(true);


    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseWishListModal = () => {
        setShowWishListModal(false);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

    };
    const filteredLibrat = mjetet.filter(mjeti =>
        mjeti.Pershkrimi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="spinner text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div>
            <Header />
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 small"
                                    placeholder="Kerko..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {searchTerm ? (
                            <div className="row" style={{ margin: '20px 0' }}>
                                {filteredLibrat.length > 0 ? (
                                    filteredLibrat.map(mjeti => (
                                        <div className="col-md-4 mb-4" key={mjeti.ID}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={variables.API_URL + 'mjeteshkollore/GetFoto/' + mjeti.ID}
                                                    alt={mjeti.Pershkrimi}
                                                    className="card-img-top"
                                                    style={{ width: '100%', height: '200px', objectFit: 'contain' }} // Stilet inline
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{mjeti.Pershkrimi}</h5>
                                                    <p className="card-text flex-grow-1">{mjeti.Tipi}</p>
                                                    <div className="mt-auto d-flex align-items-center">
                                                        <Link to={`/mjeti/${mjeti.ID}`} className="btn btn-primary mr-2">
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
                                        <p className="text-center">Nuk u gjet asnje liber per kerkesen tuaj.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="row" style={{ margin: '20px 0' }}>
                                  
                                    <div className="row">
                                        {mjetet.map(mjeti => (
                                            <div className="col-md-4 mb-4" key={mjeti.ID}>
                                                <div className="card h-100 shadow-sm">
                                                    <img
                                                        src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID}
                                                        alt={mjeti.Tipi}
                                                        className="card-img-top"
                                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                    />
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">{mjeti.Tipi}</h5>
                                                        <p className="card-text flex-grow-1">{mjeti.Pershkrimi}</p>
                                                        <div className="mt-auto">
                                                            <Link to={`/MjeteShkollore/${mjeti.ID}`} className="btn btn-primary mr-2">
                                                                Detajet
                                                            </Link>

                                                            {user && user.roli === 'User' && (

                                                                <button onClick={() => addToCart({
                                                                    ID: mjeti.ID,
                                                                    Tipi: mjeti.Tipi,
                                                                    Pershkrimi: mjeti.Pershkrimi,
                                                                    image: variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID
                                                                })} className="btn btn-success">
                                                                    Shto në Shportë
                                                                </button>
                                                            )}

                                                            {user && user.roli === 'User' && (
                                                                <Link onClick={() => addToWishList(mjeti)} className="btn btn-outline-danger" style={{ marginLeft: '5px' }}>
                                                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                <Modal.Body>mjeti është shtuar me sukses në shportë!</Modal.Body>
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

export default MjetetSipasTipit;
