  import React, { Component, useState, useEffect } from 'react';

  import { variables } from './Variables.js';
  import KlientiQyteti from './KlientiQyteti.js';
  import { Gjuha } from './Gjuha.js';
  import Header from './Header';
  import Footer from './Footer';
  import Sidebar from './Sidebar.js';
  import { useHref } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  import Qyteti from './Qyteti.js';


  export class Klienti extends Component {
    constructor(props) {
      super(props);

      this.state = {
        gjinite: [],
        klientet: [],
        qytetet: [],
        rolet: [],
        modalTitle: "",
        ID: 0,
        Emri: "",
        Mbiemri: "",
        KlientiGjinia: "",
        KlientiQyteti: "",
        KlientiRoli: "",
        Email:"",
        Password:"",
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
        ID: 0,
        Emri: "",
        Mbiemri: "",
        KlientiGjinia: "",
        KlientiQyteti: "",
        KlientiRoli: "",
        Email:"",
        Password: "",
        isFormValid: false,
      
      });
    }

    validateForm = () => {
      const { Emri, Mbiemri, Email, KlientiGjinia, KlientiQyteti, KlientiRoli, Password } = this.state;
      return Emri && Mbiemri && Email && KlientiGjinia && KlientiQyteti && KlientiRoli  && Password;
    };

    refreshList() {
      fetch(variables.API_URL + 'klienti')
      .then(response => response.json())
      .then(data => {
        this.setState({ klientet: data });
      });

      fetch(variables.API_URL + 'KlientiGjinia')
        .then(response => response.json())
        .then(data => {
          this.setState({ gjinite: data });
        });
      fetch(variables.API_URL + 'KlientiQyteti')
        .then(response => response.json())
        .then(data => {
          this.setState({ qytetet: data });
        });

      fetch(variables.API_URL + 'KlientiRoli')
        .then(response => response.json())
        .then(data => {
          this.setState({ rolet: data });
        });
    }

    changeEmri = (e) => {
      this.setState({ Emri: e.target.value });
    }
    changeMbiemri = (e) => {
      this.setState({ Mbiemri: e.target.value });
    }
    changeEmail = (e) => {
      this.setState({ Email: e.target.value });
    }
    changeKlientiGjinia = (e) => {
      this.setState({ KlientiGjinia: e.target.value });
    }
    changeKlientiQyteti = (e) => {
      this.setState({ KlientiQyteti: e.target.value });
    }
  
    changeKlientiRoli = (e) => {
      this.setState({ KlientiRoli: e.target.value });
    }
    changePassword = (e) => {
      this.setState({ Password: e.target.value });
    }

    addClick() {
      this.setState({
        modalTitle: "Shto Klientin",
        ID: 0,
        Emri: "",
        Mbiemri: "",
        KlientiGjinia: "",
        KlientiQyteti: "",
        KlientiRoli: "",
        Email:"",
        Password: ""
      });
    }
    editClick(emp) {
      this.setState({
        modalTitle: "Ndrysho Klientin",
        ID: emp.ID,
        Emri: emp.Emri,
        Mbiemri: emp.Mbiemri,
        Email: emp.Email,
        KlientiGjinia: emp.KlientiGjinia,
        KlientiQyteti: emp.KlientiQyteti,
        KlientiRoli: emp.KlientiRoli,
        Password: emp.Password,
        

      });
    }


    createClick() {
      fetch(variables.API_URL + 'klienti', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Token')}`

        },
        body: JSON.stringify({
          Emri: this.state.Emri,
          Mbiemri: this.state.Mbiemri,
          Email: this.state.Email,
          KlientiGjinia: this.state.KlientiGjinia,
          KlientiQyteti: this.state.KlientiQyteti,
          KlientiRoli: this.state.KlientiRoli,
          Password: this.state.Password,
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
      fetch(variables.API_URL + 'klienti', {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Token')}`

          },
          body: JSON.stringify({
              ID: this.state.ID,
              Emri: this.state.Emri,
              Mbiemri: this.state.Mbiemri,
              Email: this.state.Email,
              KlientiGjinia: this.state.KlientiGjinia,
              KlientiQyteti: this.state.KlientiQyteti,
              KlientiRoli: this.state.KlientiRoli,
              Password: this.state.Password,

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
      console.log(`Deleting client with ID: ${id}`);
      fetch(variables.API_URL + 'klienti/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('Token')}`
        }
      })
        .then(res => {
          if (res.ok) {
            alert('Success'); // Notify success
            this.refreshList(); // Refresh the list after successful delete
          } else {
            alert('Failed'); // Notify failure
          }
        })
        .catch(error => {
          console.error('Error deleting client:', error);
          alert('Failed'); // Notify failure
        });
    }
  }
  


    render() {
      const {
        gjinite,
        qytetet,
        rolet,
        klientet,
        modalTitle,
        ID,
        Emri,
        Mbiemri,
        Password,
        KlientiGjinia,
        KlientiQyteti,
        KlientiRoli,
        Email
        
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
                <Link  style={{ background:'#a9c0cf' }} to="/KlientiRoli" className="btn btn-primary m-2 float-end">
                  + Roli
                </Link>
                <Link style={{ background:'#a9c0cf' }} to="/KlientiQyteti" className="btn btn-primary m-2 float-end">
                  + Qyteti
                </Link>

                <Link style={{ background:'#a9c0cf' }} to="/KlientiGjinia" className="btn btn-primary m-2 float-end">
                  + Gjinia
                </Link>
                
                </div>
                <div>
                <button type="button"
                  className="btn btn-primary m-2 float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => this.addClick()}>
                  Shto Klientin
                </button>
                </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Emri</th>
                      <th>Mbiemri</th>
                      <th>Password</th>
                      <th>Gjinia</th>
                      <th>Qyteti</th>
                      <th>Roli</th>
                      <th>Email</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {klientet.map(emp =>
                      <tr key={emp.ID}>
                        <td>{emp.ID}</td>
                        <td>{emp.Emri}</td>
                        <td>{emp.Mbiemri}</td>
                        <td>{emp.Password}</td>
                        <td>{emp.KlientiGjinia}</td>
                        <td>{emp.KlientiQyteti}</td>
                        <td>{emp.KlientiRoli}</td>
                        <td>{emp.Email}</td>
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
                            onClick={() => this.deleteClick(emp.ID)}>
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
                              <span className="input-group-text">Email</span>
                              <input type="email" className="form-control"
                                value={Email}
                                onChange={this.changeEmail} />
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Gjinia</span>
                              <select className="form-select"
                                onChange={this.changeKlientiGjinia}
                                value={KlientiGjinia}>
                                  <option value="">Select</option>
                                {gjinite.map(dep => <option key={dep.Id}>
                                  {dep.Gjinia}
                                </option>)}
                              </select>
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Qyteti</span>
                              <select className="form-select"
                                onChange={this.changeKlientiQyteti}
                                value={KlientiQyteti}>
                                  <option value="">Select</option>
                                {qytetet.map(dep => <option key={dep.Id}>
                                  {dep.Qyteti}
                                </option>)}
                              </select>
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Roli</span>
                              <select className="form-select"
                                onChange={this.changeKlientiRoli}
                                value={KlientiRoli}>
                                  <option value="">Select</option>
                                {rolet.map(dep => <option key={dep.Id}>
                                  {dep.Roli}
                                </option>)}
                              </select>
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Password</span>
                              <input type="password" className="form-control"
                                value={Password}
                                onChange={this.changePassword} />
                            </div>

                          </div>
                        </div>

                        {ID === 0 ?
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
  export default Klienti