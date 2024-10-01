import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { variables } from './Variables';
import { Modal, Button } from 'react-bootstrap';

const Shporta = () => {
  const [cart, setCart] = useState([]);
  const [libra, setLibra] = useState([]);
  const [mjetetShkollore, setMjetetShkollore] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const shporta = JSON.parse(localStorage.getItem('shporta')) || [];
    const libraList = shporta.filter((produkt) => produkt.hasOwnProperty('Titulli'));
    const mjetetList = shporta.filter((produkt) => !produkt.hasOwnProperty('Titulli'));
    setLibra(libraList);
    setMjetetShkollore(mjetetList);
    setCart(cartItems);
  }, []);

  const removeFromCart = (id) => {
    const updatedLibraList = libra.filter(item => item.ISBN !== id);
    const updatedMjetetList = mjetetShkollore.filter(item => item.ID !== id);
    const updatedShporta = updatedLibraList.concat(updatedMjetetList);
    localStorage.setItem('shporta', JSON.stringify(updatedShporta));
    setLibra(updatedLibraList);
    setMjetetShkollore(updatedMjetetList);
    const updatedCart = cart.filter(item => item.ID !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleShowModal = () => setShowModal(true);

  const handlePlaceOrder = async () => {
    if (cardNumber.length !== 10 || isNaN(cardNumber)) {
      setErrorMessage('Numri i kartelës duhet të jetë 10 shifror.'); // Set error message
      return; // Prevent order placement
    }

    setErrorMessage(''); // Clear error message if valid

    try {
      let resultArray = JSON.parse(localStorage.getItem('shporta')).map(item => ({
        Klienti: Number(localStorage.getItem('ID')),
        Id: item.ID,
        IsBook: !!item.Titulli,
        CardNumber: cardNumber
      }));

      await axios.post('http://localhost:5170/api/Porosia', resultArray, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });

      // Clear local storage and state
      localStorage.removeItem('shporta');
      setLibra([]);
      setMjetetShkollore([]);
      setCart([]);
      setShowModal(false);
      setCardNumber('');
      setSuccessMessage('Porosia është dërguar me sukses');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <Sidebar />
        <h1 className="text-center mb-4">Shporta</h1>
        {libra.length === 0 && mjetetShkollore.length === 0 ? (
          <p className="text-center">Shporta është bosh</p>
        ) : (
          <div className="row" style={{ marginLeft: '30px' }}>
            {libra.length > 0 && (
              <div className="col-md-6">
                <h2>Librat</h2>
                <ul>
                  {libra.map((libri, index) => (
                    <li key={index}>
                      <div>
                        <img src={variables.API_URL + 'libri/GetFoto/' + libri.ID} alt={libri.Titulli} style={{ width: '100%', height: '200px', objectFit: 'contain' }} className="img-fluid" />
                        <p>{libri.Titulli}</p>
                        <p>Cmimi: {libri.Cmimi}</p>
                        <button onClick={() => removeFromCart(libri.ISBN)} className="btn btn-danger ml-2">Fshij</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mjetetShkollore.length > 0 && (
              <div className="col-md-6">
                <h2>Mjetet Shkollore</h2>
                <ul>
                  {mjetetShkollore.map((mjeti, index) => (
                    <li key={index}>
                      <div>
                        <img src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID} alt={mjeti.TipiID} style={{ width: '100%', height: '200px', objectFit: 'contain' }} className="img-fluid" />
                        <p>Mjet Shkollor</p>
                        <p>Cmimi: {mjeti.Cmimi}</p>
                        <button onClick={() => removeFromCart(mjeti.ID)} className="btn btn-danger ml-2">Fshij</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <button onClick={handleShowModal} className="btn btn-success">Konfirmoni Porosinë</button>
            </div>
          </div>
        )}

        {/* Success message display */}
        {successMessage && (
          <div className="alert alert-success text-center mt-4">
            {successMessage}
          </div>
        )}

        {/* Error message display */}
        {errorMessage && (
          <div className="alert alert-danger text-center mt-4">
            {errorMessage}
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/home" className="btn btn-primary">Vazhdoni Blerjet</Link>
        </div>
      </div>
      <Footer />

      {/* Modal for entering card number */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Numri i Karteles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Shkruani numrin e karteles"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="form-control"
            maxLength="10" // Limit input to 10 characters
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anulo
          </Button>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Konfirmo Porosinë
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Shporta;
