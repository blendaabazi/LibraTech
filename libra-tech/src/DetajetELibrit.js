import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { variables } from './Variables';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from './AuthProvider';

function DetajetELibrit() {
  const [libri, setLibri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    fetchLibriDetails();
  }, []);

  const fetchLibriDetails = async () => {
    try {
      const response = await fetch(variables.API_URL + `libri/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setLibri(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const addToCart = (libri) => {
    const shporta = JSON.parse(localStorage.getItem('shporta')) || [];
    shporta.push(libri);
    localStorage.setItem('shporta', JSON.stringify(shporta));
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!libri) {
    return <div className="error">Libri nuk u gjet.</div>;
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
            <div className="row" style={{ margin: '20px 0' }}>
              <div className="container">
                <h1>{libri.Titulli}</h1>
                <div className="row">
                  <div className="col-md-4">
                    <img src={variables.API_URL + 'libri/GetFoto/' + libri.ID} alt={libri.Titulli} className="img-fluid" />
                  </div>
                  <div className="col-md-8">
                    <p><strong>Titulli:</strong> {libri.Titulli}</p>
                    <p><strong>Pershkrimi:</strong> {libri.Pershkrimi}</p>
                    <p><strong>Autori:</strong> {libri.Autori.Emri}</p>
                    <p><strong>Kategoria:</strong> {libri.Kategoria.kategoria}</p>
                    <p><strong>Gjuha:</strong> {libri.Gjuha.gjuha}</p>
                    <p><strong>NrFaqeve:</strong> {libri.NrFaqeve}</p>
                    <p><strong>ShtepiaBotuese:</strong> {libri.ShtepiaBotuese.shtepiaBotuese}</p>
                    <p><strong>Viti i Publikimit:</strong> {libri.VitiPublikimit}</p>
                    <p><strong>Sasia:</strong> {libri.Sasia}</p>
                    <p><strong>Cmimi:</strong> ${libri.Cmimi}</p>
                    
                    {user && user.roli === 'User' && (
                    <button onClick={() => addToCart(libri)} className="btn btn-success">Shto ne shportë</button>
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

export default DetajetELibrit;
