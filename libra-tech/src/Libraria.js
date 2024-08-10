import React, { Component } from 'react';
import { variables } from './Variables.js';
import Footer from './Footer.js';
import Header from './Header';
import Sidebar from './Sidebar.js';

export class Libraria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qytetet: [],
      lokacionet: [],
      librarit: [],
      furnizimet: [],
      modalTitle: "",
      ID: 0,
      Lokacioni: "",
      Qyteti: "",
      Furnizimi: "",
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
      Lokacioni: "",
      Qyteti: "",
      Furnizimi: "",
      isFormValid: false,
    });
  }

  validateForm = () => {
    const { Lokacioni, Qyteti, Furnizimi } = this.state;
    return Lokacioni && Qyteti && Furnizimi;
  };

  refreshList() {
    fetch(variables.API_URL + 'Libraria')
      .then(response => response.json())
      .then(data => {
        this.setState({ librarit: data });
      });

    fetch(variables.API_URL + 'LokacioniL')
      .then(response => response.json())
      .then(data => {
        this.setState({ lokacionet: data });
      });

    fetch(variables.API_URL + 'Qyteti')
      .then(response => response.json())
      .then(data => {
        this.setState({ qytetet: data });
      });

    fetch(variables.API_URL + 'Furnizimi')
      .then(response => response.json())
      .then(data => {
        this.setState({ furnizimet: data });
      });
  }

  changeLokacioni = (e) => {
    this.setState({ Lokacioni: e.target.value });
  }
  changeQyteti = (e) => {
    this.setState({ Qyteti: e.target.value });
  }
  changeFurnizimi = (e) => {
    this.setState({ Furnizimi: e.target.value });
  }

  addClick() {
    this.setState({
      modalTitle: "Shto Librarin",
      ID: 0,
      Lokacioni: "",
      Qyteti: "",
      Furnizimi: "",
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Ndrysho Librarin",
      ID: emp.ID,
      Lokacioni: emp.Lokacioni,
      Qyteti: emp.Qyteti,
      Furnizimi: emp.Furnizimi,
    });
  }


  createClick() {
    fetch(variables.API_URL + 'Libraria', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Lokacioni: this.state.Lokacioni,
        Qyteti: this.state.Qyteti,
        Furnizimi: this.state.Furnizimi
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
    fetch(variables.API_URL + 'Libraria', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: this.state.ID,
        Lokacioni: this.state.Lokacioni,
        Qyteti: this.state.Qyteti,
        Furnizimi: this.state.Furnizimi
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
      fetch(variables.API_URL + 'Libraria/' + id, {
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
      lokacionet,
      qytetet,
      furnizimet,
      librarit,
      modalTitle,
      ID,
      Lokacioni,
      Qyteti,
      Furnizimi,

    } = this.state;


    return (
      <div>
        <body id="page-top">
          <Header />
          <div className="container">

            <Sidebar />
            <div className="container-fluid" style={{ marginLeft: '110px', }}>

              <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => this.addClick()}>
                Shto Librarin
              </button>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Lokacioni</th>
                    <th>Qyteti</th>
                    <th>Furnizimi</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {librarit.map(emp =>
                    <tr key={emp.ID}>
                      <td>{emp.ID}</td>
                      <td>{emp.Lokacioni}</td>
                      <td>{emp.Qyteti}</td>
                      <td>{emp.Furnizimi}</td>
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
                            <span className="input-group-text">Lokacioni</span>
                            <select className="form-select"
                              onChange={this.changeLokacioni}
                              value={Lokacioni}>
                              {lokacionet.map(dep => <option key={dep.ID}>
                                {dep.Lokacioni}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Qyteti</span>
                            <select className="form-select"
                              onChange={this.changeQyteti}
                              value={Qyteti}>
                              {qytetet.map(dep => <option key={dep.ID}>
                                {dep.Qyteti}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Furnizimi</span>
                            <select className="form-select"
                              onChange={this.changeFurnizimi}
                              value={Furnizimi}>
                              {furnizimet.map(dep => <option key={dep.ID}>
                                {dep.Kompania}
                              </option>)}
                            </select>
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
            </div>
          </div>
          <Footer />
        </body>
      </div>
    );
  }
}
export default Libraria;
