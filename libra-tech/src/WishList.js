import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { variables } from './Variables';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Modal, Button } from 'react-bootstrap';

const WishList = () => {
  const [cart, setCart] = useState([]);
  const [libra, setLibra] = useState([]);
  const [mjetetShkollore, setMjetetShkollore] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const wishList = JSON.parse(localStorage.getItem('WishList')) || [];
    const libraList = wishList.filter((produkt) => produkt.hasOwnProperty('Titulli'));
    const mjetetList = wishList.filter((produkt) => !produkt.hasOwnProperty('Titulli'));
    setLibra(libraList);
    setMjetetShkollore(mjetetList);
    setCart(cartItems);
  }, []);
  const addToCart = (libri) => {
    const shporta = JSON.parse(localStorage.getItem('shporta')) || [];
    shporta.push(libri);
    localStorage.setItem('shporta', JSON.stringify(shporta));
    setShowModal(true); // Shfaq modal-in
};
  const removeFromCart = (id) => {
    const updatedLibraList = libra.filter(item => item.ISBN !== id);
    const updatedMjetetList = mjetetShkollore.filter(item => item.ID !== id);
    const updatedWishList = updatedLibraList.concat(updatedMjetetList);
    localStorage.setItem('WishList', JSON.stringify(updatedWishList));
    setLibra(updatedLibraList);
    setMjetetShkollore(updatedMjetetList);
    const updatedCart = cart.filter(item => item.ID !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const handleCloseModal = () => {
    setShowModal(false);
};
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <Sidebar />
        <h1 className="text-center mb-4">WishList</h1>
        {libra.length === 0 && mjetetShkollore.length === 0 ? (
          <p className="text-center">Wish List është bosh</p>
        ) : (
          <div className="col" style={{marginLeft:'30px'}}>
            <div className="row">
              {libra.length > 0 && (
                <>
                  <h2>Librat</h2>
                  <ul className="list-unstyled d-flex flex-wrap">
                    {libra.map((libri, index) => (
                      <li key={index} className="mb-4 mr-4" style={{ flex: '0 0 300px' }}>
                        <div className="card">
                          <img src={variables.API_URL + 'libri/GetFoto/' + libri.ID} alt={libri.Titulli} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                          <div className="card-body">
                            <h5 className="card-title">{libri.Titulli}</h5>
                            <p className="card-text">Cmimi: {libri.Cmimi}</p>
                            <button onClick={() => addToCart(libri)} className="btn btn-success mr-2"> 
                                Shto ne Shportë
                            </button>
                            <button onClick={() => removeFromCart(libri.ISBN)} className="btn btn-danger">Fshij</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="row">
              {mjetetShkollore.length > 0 && (
                <>
                  <h2>Mjetet Shkollore</h2>
                  <ul className="list-unstyled d-flex flex-wrap">
                    {mjetetShkollore.map((mjeti, index) => (
                      <li key={index} className="mb-4 mr-4" style={{ flex: '0 0 300px' }}>
                        <div className="card">
                          <img src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID} alt={mjeti.Tipi} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                          <div className="card-body">
                            <h5 className="card-title">{mjeti.Tipi}</h5>
                            <p className="card-text">Cmimi: {mjeti.Cmimi}</p>
                            <button onClick={() => addToCart(mjeti)} className="btn btn-success mr-2"> 
                                Shto ne Shportë
                            </button>
                            <button onClick={() => removeFromCart(mjeti.ID)} className="btn btn-danger">Fshij</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/home" className="btn btn-primary">Vazhdoni</Link>
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
    </div>
  );
};

export default WishList;
