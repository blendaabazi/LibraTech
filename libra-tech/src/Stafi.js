import React, { Component } from 'react';
import { variables } from './Variables.js';
import StafiOrari from './StafiOrari.js';
import { Gjuha } from './Gjuha.js';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar.js';
import { useHref } from 'react-router-dom';
import { Link } from 'react-router-dom';

export class Stafi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gjinite: [],
      stafet: [],
      sektoret: [],
      oraret: [],
      modalTitle: "",
      IDStafi: 0,
      Emri: "",
      Mbiemri: "",
      StafiGjinia: "",
      StafiOrari: "",
      StafiSektori: "",
      Pervoja:"",
      ZipCode: 0,
      isFormValid: false,
    };

    this.handleModalHidden = this.handleModalHidden.bind(this);
  }

  componentDidMount() {
    this.refreshList();
    const modal = document.getElementById("exampleModal");
    modal.addEventListener("hidden.bs.modal", this.handleModalHidden);
  }

  componentWillUnmount() {
    const modal = document.getElementById("exampleModal");
    modal.removeEventListener("hidden.bs.modal", this.handleModalHidden);
  }

  handleModalHidden() {
    // Reset modal state values
    this.setState({
      modalTitle: "",
      IDStafi: 0,
      Emri: "",
      Mbiemri: "",
      StafiGjinia: "",
      StafiOrari: "",
      StafiSektori: "",
      Pervoja:"",
      ZipCode: 0,
      isFormValid: false,
     
    });
  }

  validateForm = () => {
    const { Emri, Mbiemri, Pervoja, StafiGjinia, StafiOrari, StafiSektori, ZipCode } = this.state;
    return Emri && Mbiemri && Pervoja && StafiGjinia && StafiOrari && StafiSektori  && ZipCode;
  };

  refreshList() {
    fetch(variables.API_URL + 'stafi')
    .then(response => response.json())
    .then(data => {
      this.setState({ stafet: data });
    });

    fetch(variables.API_URL + 'StafiGjinia')
      .then(response => response.json())
      .then(data => {
        this.setState({ gjinite: data });
      });
    fetch(variables.API_URL + 'StafiOrari')
      .then(response => response.json())
      .then(data => {
        this.setState({ oraret: data });
      });

    fetch(variables.API_URL + 'StafiSektori')
      .then(response => response.json())
      .then(data => {
        this.setState({ sektoret: data });
      });
  }

  changeEmri = (e) => {
    this.setState({ Emri: e.target.value });
  }
  changeMbiemri = (e) => {
    this.setState({ Mbiemri: e.target.value });
  }
  changePervoja = (e) => {
    this.setState({ Pervoja: e.target.value });
  }
  changeStafiGjinia = (e) => {
    this.setState({ StafiGjinia: e.target.value });
  }
  changeStafiOrari = (e) => {
    this.setState({ StafiOrari: e.target.value });
  }
 
  changeStafiSektori = (e) => {
    this.setState({ StafiSektori: e.target.value });
  }
  changeZipCode = (e) => {
    this.setState({ ZipCode: e.target.value });
  }

  addClick() {
    this.setState({
      modalTitle: "Shto Stafin",
      IDStafi: 0,
      Emri: "",
      Mbiemri: "",
      StafiGjinia: "",
      StafiOrari: "",
      StafiSektori: "",
      Pervoja:"",
      ZipCode: 0
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Ndrysho Stafin",
      IDStafi: emp.IDStafi,
      Emri: emp.Emri,
      Mbiemri: emp.Mbiemri,
      Pervoja: emp.Pervoja,
      StafiGjinia: emp.StafiGjinia,
      StafiOrari: emp.StafiOrari,
      StafiSektori: emp.StafiSektori,
      ZipCode: emp.ZipCode,
      

    });
  }


  createClick() {
    debugger
    fetch(variables.API_URL + 'stafi', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Emri: this.state.Emri,
        Mbiemri: this.state.Mbiemri,
        Pervoja: this.state.Pervoja,
        StafiGjinia: this.state.StafiGjinia,
        StafiOrari: this.state.StafiOrari,
        StafiSektori: this.state.StafiSektori,
        ZipCode: this.state.ZipCode,
      })
    })
      .then(res => res.json())
      .then((result) => {
        alert('U shtua me sukses');
        this.refreshList();
        document.getElementById("exampleModal").classList.remove("show");
        document.querySelector(".modal-backdrop").remove();
      }, (error) => {
        alert('Failed');
      })
  }

  updateClick() {
    fetch(variables.API_URL + 'stafi', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IDStafi: this.state.IDStafi,
        Emri: this.state.Emri,
        Mbiemri: this.state.Mbiemri,
        Pervoja: this.state.Pervoja,
        StafiGjinia: this.state.StafiGjinia,
        StafiOrari: this.state.StafiOrari,
        StafiSektori: this.state.StafiSektori,
        ZipCode: this.state.ZipCode,
      })
    })
      .then(res => {
        if (res.ok) {
          alert('Updated');
          this.refreshList();
          document.getElementById("exampleModal").classList.remove("show");
          document.querySelector(".modal-backdrop").remove();


        } else {
          alert('Failed');
        }
      })
      .catch(error => {
        console.error('Error updating book:', error);
        alert('Failed');
      });
  }


  deleteClick(id) {
    if (window.confirm('A jeni i sigurt?')) {
      fetch(variables.API_URL + 'Stafi/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          alert('Failed');
          this.refreshList();
        }, (error) => {
          alert('Success');
          this.refreshList();
        })
    }
  }


  render() {
    const {
      gjinite,
      sektoret,
      oraret,
      stafet,
      modalTitle,
      IDStafi,
      Emri,
      Mbiemri,
      ZipCode,
      StafiGjinia,
      StafiOrari,
      StafiSektori,
      Pervoja
      
    } = this.state;


    return (
      <div>
        <body id="page-top">
          <Header />
          <div className="container">


            <Sidebar />
            <div className="container-fluid" style={{ marginLeft: '110px', }}>
             <div className='d-flex justify-content-between'>
              <div>
              <Link style={{ background:'#a9c0cf' }} to="/StafiGjinia" className="btn btn-primary m-2 float-end">
                + StafiGjinia
              </Link>
              <Link  style={{ background:'#a9c0cf' }} to="/StafiSektori" className="btn btn-primary m-2 float-end">
                + StafiSektori
              </Link>
              <Link style={{ background:'#a9c0cf' }} to="/StafiOrari" className="btn btn-primary m-2 float-end">
                + StafiOrari
              </Link>
              </div>
              <div>
              <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => this.addClick()}>
                Shto Stafin
              </button>
              </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Mbiemri</th>
                    <th>ZipCode</th>
                    <th>Gjinia</th>
                    <th>Orari</th>
                    <th>Sektori</th>
                    <th>Pervoja</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {stafet.map(emp =>
                    <tr key={emp.IDStafi}>
                      <td>{emp.IDStafi}</td>
                      <td>{emp.Emri}</td>
                      <td>{emp.Mbiemri}</td>
                      <td>{emp.ZipCode}</td>
                      <td>{emp.StafiGjinia}</td>
                      <td>{emp.StafiOrari}</td>
                      <td>{emp.StafiSektori}</td>
                      <td>{emp.Pervoja}</td>
                      <td>
                        <button type="button"
                          className="btn btn-light mr-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => this.editClick(emp)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button>

                        <button type="button"
                          className="btn btn-light mr-1"
                          onClick={() => this.deleteClick(emp.IDStafi)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>


              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content" >
                    <div className="modal-header">
                      <h5 className="modal-title">{modalTitle}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>

                    <div className="modal-body">
                      <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-50 bd-highlight">
                          <div className="input-group mb-3">
                            <span className="input-group-text">Emri</span>
                            <input type="text" className="form-control"
                              value={Emri}
                              onChange={this.changeEmri} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Mbiemri</span>
                            <input type="text" className="form-control"
                              value={Mbiemri}
                              onChange={this.changeMbiemri} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Pervoja</span>
                            <input type="text" className="form-control"
                              value={Pervoja}
                              onChange={this.changePervoja} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Gjinia</span>
                            <select className="form-select"
                              onChange={this.changeStafiGjinia}
                              value={StafiGjinia}>
                              {gjinite.map(dep => <option key={dep.Id}>
                                {dep.Gjinia}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Orari</span>
                            <select className="form-select"
                              onChange={this.changeStafiOrari}
                              value={StafiOrari}>
                              {oraret.map(dep => <option key={dep.Id}>
                                {dep.Orari}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Sektori</span>
                            <select className="form-select"
                              onChange={this.changeStafiSektori}
                              value={StafiSektori}>
                              {sektoret.map(dep => <option key={dep.Id}>
                                {dep.Sektori}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">ZipCode</span>
                            <input type="text" className="form-control"
                              value={ZipCode}
                              onChange={this.changeZipCode} />
                          </div>

                        </div>
                      </div>

                      {IDStafi === 0 ?
                        <button type="button" className="btn btn-primary float-end"
                          onClick={() => this.createClick()}
                          disabled={!this.validateForm()}>
                          Create
                        </button> :
                        <button type="button" className="btn btn-primary float-end"
                          onClick={() => this.updateClick()}
                          disabled={!this.validateForm()}>
                          Update
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>

        </body>
      </div>

    );
  }
}
export default Stafi
