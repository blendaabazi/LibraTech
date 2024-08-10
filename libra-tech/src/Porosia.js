import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { variables } from './Variables';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';

const Porosia = () => {
  const [porosite, setPorosite] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletedPorosiaId, setDeletedPorosiaId] = useState(null);

  useEffect(() => {
    fetchPorosite();
  }, []);

  const fetchPorosite = async () => {
    try {
      const response = await axios.get(`${variables.API_URL}Porosia`);
      setPorosite(response.data);
    } catch (error) {
      console.error('Gabim në marrjen e porosive:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletedPorosiaId(id);
    setShowModal(true);
  };

  const deletePorosia = async () => {
    try {
      await axios.delete(`${variables.API_URL}Porosia/${deletedPorosiaId}`);
      setShowModal(false);
      refreshList();
    } catch (error) {
      console.error('Gabim në fshirjen e porosise:', error);
    }
  };

  const refreshList = async () => {
    try {
      const response = await axios.get(`${variables.API_URL}Porosia`);
      setPorosite(response.data);
    } catch (error) {
      console.error('Gabim në rifreskimin e listës së porosive:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeletedPorosiaId(null);
  };

  return (
    <div>
      <body id="page-top">
        <Header />
        <div className="container">
          <Sidebar />
          <div className="container-fluid" style={{ marginLeft: '110px' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cmimi Total</th>
                  <th>Data</th>
                  <th>Opsionet</th>
                </tr>
              </thead>
              <tbody>
                {porosite.map(porosia => (
                  <tr key={porosia.ID}>
                    <td>{porosia.ID}</td>
                    <td>{porosia.CmimiTotal}</td>
                    <td>{porosia.Data}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-light mr-1"
                        onClick={() => handleDeleteClick(porosia.ID)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </body>

      {/* Modal për konfirmim të fshirjes */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deshironi te Vazhdoni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A jeni i sigurt qe deshironi te fshini porosine me ID: {deletedPorosiaId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulo
          </Button>
          <Button variant="danger" onClick={deletePorosia}>
            Fshi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Porosia;
