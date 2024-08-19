import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { variables } from './Variables';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from './AuthProvider';


function DetajetEMjetit() {
  const [mjeti, setMjeti] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    fetchMjetiDetails();
  }, []);

  const fetchMjetiDetails = async () => {
    try {
      const response = await fetch(variables.API_URL + `MjeteShkollore/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setMjeti(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!mjeti) {
    return <div className="error">Mjeti nuk u gjet.</div>;
  }
  const addToCart = (libri) => {
    const shporta = JSON.parse(localStorage.getItem('shporta')) || [];
    shporta.push(libri);
    localStorage.setItem('shporta', JSON.stringify(shporta));
  };

  return (
    <div>
      <Header />
      <div>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="row" style={{ margin: '20px 0' }}>
              <div className="container">
                <h1>{mjeti.Tipi}</h1>
                <div className="row">
                  <div className="col-md-4">
                    <img src={variables.API_URL + 'MjeteShkollore/GetFoto/' + mjeti.ID} alt={mjeti.Tipi} className="img-fluid" />
                  </div>
                  <div className="col-md-8">
                    <p><strong>Pershkrimi:</strong> {mjeti.Pershkrimi}</p>
                    <p><strong>Prodhuesi:</strong> {mjeti.ProdhuesiMSh.Prodhuesi}</p>
                    <p><strong>Shteti:</strong> {mjeti.ShtetiMSh.shteti}</p>
                    <p><strong>Cmimi:</strong> {mjeti.Cmimi}$</p>
                    <p><strong>Sasia:</strong> {mjeti.Sasia}</p>
                    {user && user.roli === 'User' && (
                    <button onClick={() => addToCart(mjeti)} className="btn btn-success">Shto ne shportë</button>
                    )}
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
    
      </div>
      <Footer />
    </div>

  );
}

export default DetajetEMjetit;
