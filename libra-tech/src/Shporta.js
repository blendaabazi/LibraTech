import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importo axios
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { variables } from './Variables';



const Shporta = () => {
  const [cart, setCart] = useState([]);
  const [libra, setLibra] = useState([]);
  const [mjetetShkollore, setMjetetShkollore] = useState([]);

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


   const placeOrder = async () =>  {
    debugger
    try {
        let resultArray = JSON.parse(localStorage.getItem('shporta')).map(item => {
            return {
                Klienti: Number(localStorage.getItem('ID')),
                Id: item.ID,
                IsBook: !!item.Titulli 
            };
        });
      await axios.post('http://localhost:5170/api/Porosia', resultArray, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}` // Shtoni tokenin këtu
        }}).then((e) =>{
        localStorage.removeItem('shporta');
        setLibra([]);
        setMjetetShkollore([]);
        setCart([]);
     })
    
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
          <div className="row" style={{marginLeft:'30px'}}>
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
              <button onClick={placeOrder} className="btn btn-success">Konfirmoni Porosinë</button>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/home" className="btn btn-primary">Vazhdoni Blerjet</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shporta;
