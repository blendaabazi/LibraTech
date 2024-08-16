import React, { Component } from 'react';
import { variables } from './Variables.js';
import Kategoria from './Kategoria.js';
import { Gjuha } from './Gjuha.js';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar.js';
import { useHref } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Libri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autoret: [],
      librat: [],
      kategorit: [],
      gjuhet: [],
      faqet: [],
      botuesit: [],
      modalTitle: "",
      ID: 0,
      ISBN: "",
      Titulli: "",
      Pershkrimi: "",
      AutoriID: "",
      NrFaqeve: "",
      KategoriaID: "",
      VitiPublikimit: 0,
      ShtepiaBotueseID: "",
      GjuhaID: "",
      Cmimi: 0.0,
      Sasia: 0,
      isFormValid: false,
      ImgPath: "img.png",
      PhotoFileName: variables.PHOTO_URL,
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
      ISBN: "",
      Titulli: "",
      Pershkrimi: "",
      AutoriID: "",
      NrFaqeve: 0,
      KategoriaID: "",
      VitiPublikimit: 0,
      ShtepiaBotueseID: "",
      GjuhaID: "",
      Cmimi: 0.0,
      Sasia: 0,
      isFormValid: false,
      ImgPath: "img.png"
    });
  }


  refreshList = () => {
    axios.get(variables.API_URL + 'libri')
        .then(response => {
            this.setState({ librat: response.data });
        })
        .catch(error => {
            console.error('Error fetching players:', error);
        });

    axios.get(variables.API_URL + 'Autori')
        .then(response => {
            this.setState({ autoret: response.data });
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
        });

        axios.get(variables.API_URL + 'kategoria')
        .then(response => {
            this.setState({ kategorit: response.data });
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
        });
        axios.get(variables.API_URL + 'gjuha')
        .then(response => {
            this.setState({ gjuhet: response.data });
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
        });
        axios.get(variables.API_URL + 'nrfaqeve')
        .then(response => {
            this.setState({ faqet: response.data });
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
        });

        axios.get(variables.API_URL + 'shtepiabotuese')
        .then(response => {
            this.setState({ botuesit: response.data });
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
        });
};
  

  changeISBN = (e) => {
    this.setState({ ISBN: e.target.value });
  }
  changeTitulli = (e) => {
    this.setState({ Titulli: e.target.value });
  }
  changePershkrimi = (e) => {
    this.setState({ Pershkrimi: e.target.value });
  }
  changeAutoriID = (e) => {
    this.setState({ AutoriID: e.target.value });
  }
  changeNrFaqeve = (e) => {
    this.setState({ NrFaqeve: e.target.value });
  }
  changeKategoria = (e) => {
    this.setState({ KategoriaID: e.target.value });
  }
  changeVitiPublikimit = (e) => {
    this.setState({ VitiPublikimit: e.target.value });
  }
  changeShtepiaBotuese = (e) => {
    this.setState({ ShtepiaBotueseID: e.target.value });
  }
  changeGjuha = (e) => {
    this.setState({ GjuhaID: e.target.value });
  }
  changeCmimi = (e) => {
    this.setState({ Cmimi: e.target.value });
  }
  changeSasia = (e) => {
    this.setState({ Sasia: e.target.value });
  }
  validateForm = () => {
    const { ISBN, Titulli, Pershkrimi, AutoriID,NrFaqeve,KategoriaID,VitiPublikimit,ShtepiaBotueseID,GjuhaID,Cmimi,Sasia } = this.state;
    return ISBN !== "" && Titulli !== 0 && Pershkrimi !== 0 && AutoriID !== ""  && NrFaqeve !== ""   && KategoriaID !== ""  && VitiPublikimit !== "-"  && ShtepiaBotueseID !== ""
    && GjuhaID !== ""  && Cmimi !== ""  && Sasia !== "";
};


  addClick() {
    this.setState({
      modalTitle: "Shto Librin",
      ID: 0,
      ISBN: "",
      Titulli: "",
      Pershkrimi: "",
      AutoriID: "",
      NrFaqeve: "",
      KategoriaID: "",
      VitiPublikimit: 0,
      ShtepiaBotueseID: "",
      GjuhaID: "",
      Cmimi: 0.0,
      Sasia: 0,
      ImgPath: "img.png"
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Ndrysho Librin",
      ID: emp.ID,
      ISBN: emp.ISBN,
      Titulli: emp.Titulli,
      Pershkrimi: emp.Pershkrimi,
      AutoriID: emp.AutoriID,
      NrFaqeve: emp.NrFaqeve,
      KategoriaID: emp.KategoriaID,
      VitiPublikimit: emp.VitiPublikimit,
      ShtepiaBotueseID: emp.ShtepiaBotueseID,
      GjuhaID: emp.GjuhaID,
      Cmimi: emp.Cmimi,
      Sasia: emp.Sasia,
      ImgPath: emp.ImgPath

    });
  }

  createClick = () => {
    axios.post(variables.API_URL + 'Libri', {
      ISBN: this.state.ISBN,
      Titulli: this.state.Titulli,
      Pershkrimi: this.state.Pershkrimi,
      AutoriID: this.state.AutoriID,
      NrFaqeve: this.state.NrFaqeve,
      KategoriaID: this.state.KategoriaID,
      VitiPublikimit: this.state.VitiPublikimit,
      ShtepiaBotueseID: this.state.ShtepiaBotueseID,
      GjuhaID: this.state.GjuhaID,
      Cmimi: this.state.Cmimi,
      Sasia: this.state.Sasia,
      ImgPath: this.state.ImgPath
    })
    .then((response) => {
        alert('U shtua me sukses');
        this.refreshList();
        document.getElementById("exampleModal").classList.remove("show");
        document.querySelector(".modal-backdrop").remove();
    })
    .catch(error => {
        console.error('Error creating player:', error);
        alert('Failed');
    });
};
updateClick = () => {
  const { ID,ISBN, Titulli, Pershkrimi, AutoriID,NrFaqeve,KategoriaID,VitiPublikimit,ShtepiaBotueseID,GjuhaID,Cmimi,Sasia,ImgPath  } = this.state;

  axios.put(`http://localhost:5170/api/Libri/${ID}`, {
    ID,
    ISBN,
    Titulli,
    Pershkrimi,
    AutoriID,
    NrFaqeve,
    KategoriaID,
    VitiPublikimit,
    ShtepiaBotueseID,
    GjuhaID,
    Cmimi,
    Sasia,
    ImgPath
      
  })
  .then(response => {
      alert('Updated successfully');
      this.refreshList();
      document.getElementById("exampleModal").classList.remove("show");
      document.querySelector(".modal-backdrop").remove();
  })
  .catch(error => {
      console.error('Error updating player:', error);
      alert('Failed to update player');
  });
};



  deleteClick(id) {
    if (window.confirm('A jeni i sigurt?')) {
      fetch(variables.API_URL + 'Libri/' + id, {
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
  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + 'Libri/savefile', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ ImgPath: data });
      })
  }


  render() {
    const {
      autoret,
      librat,
      kategorit,
      gjuhet,
      faqet,
      botuesit,
      modalTitle,
      ID,
      ISBN,
      Titulli,
      Pershkrimi,
      AutoriID,
      NrFaqeve,
      KategoriaID,
      VitiPublikimit,
      ShtepiaBotueseID,
      GjuhaID,
      Cmimi,
      Sasia,
      PhotoFileName,
      ImgPath,

    } = this.state;


    return (
      <div>
        <body id="page-top">
          <Header />
          <div className="container">


            <Sidebar />
            <div className="container-fluid" style={{ paddingLeft: '50px' }}>
              <div className='d-flex justify-content-between'>
                <div>
                  <Link style={{ background: '#a9c0cf' }} to="/Autori" className="btn btn-primary m-2 float-end">
                    + Autori
                  </Link>
                  <Link style={{ background: '#a9c0cf' }} to="/ShtepiaBotuese" className="btn btn-primary m-2 float-end">
                    + ShtepiaBotuese
                  </Link>
                  <Link style={{ background: '#a9c0cf' }} to="/Gjuha" className="btn btn-primary m-2 float-end">
                    + Gjuha
                  </Link>
                  <Link style={{ background: '#a9c0cf' }} to="/Kategoria" className="btn btn-primary m-2 float-end">
                    + Kategoria
                  </Link>

                </div>
                <div>
                  <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Shto Librin
                  </button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                  <th>ID</th>
                    <th>ISBN</th>
                    <th>Titulli</th>
                    <th style={{ paddingRight: '100px' }}>Pershkrimi</th>
                    <th>Autori</th>
                    <th>Nr.Faqeve</th>
                    <th>Kategoria</th>
                    <th>VitiPublikimit</th>
                    <th>ShtepiaBotuese</th>
                    <th>Gjuha</th>
                    <th>Cmimi</th>
                    <th>Sasia</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {librat.map(emp =>
                    <tr key={emp.ID}>
                      <td>{emp.ID}</td>
                      <td>{emp.ISBN}</td>
                      <td>{emp.Titulli}</td>
                      <td>{emp.Pershkrimi}</td>
                      <td>{autoret.find(t => t.AutoriID === emp.AutoriID)?.Emri || 'No Team'}</td>
                      <td>{emp.NrFaqeve}</td>
                      <td>{kategorit.find(t => t.KategoriaID === emp.KategoriaID)?.kategoria || 'No Kategori'}</td>
                      <td>{emp.VitiPublikimit}</td>
                      <td>{botuesit.find(t => t.ShtepiaBotueseID === emp.ShtepiaBotueseID)?.shtepiaBotuese || 'Nuk ka botues'}</td>
                      <td>{gjuhet.find(t => t.GjuhaID === emp.GjuhaID)?.gjuha || 'Nuk ka gjuhe'}</td>
                      <td>{emp.Cmimi}</td>
                      <td>{emp.Sasia}</td>
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
                            <span className="input-group-text">ISBN</span>
                            <input type="text" className="form-control"
                              value={ISBN}
                              onChange={this.changeISBN} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Titulli</span>
                            <input type="text" className="form-control"
                              value={Titulli}
                              onChange={this.changeTitulli} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Pershkrimi</span>
                            <input type="text" className="form-control"
                              value={Pershkrimi}
                              onChange={this.changePershkrimi} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Autori</span>
                           
                            <select className="form-select"
                              onChange={this.changeAutoriID}
                              value={AutoriID}>
                                 <option value="">Select</option>
                              {autoret.map(dep => <option key={dep.AutoriID} value={dep.AutoriID}>
                                {dep.Emri}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Nr\</span>
                            <input type="text" className="form-control"
                              value={NrFaqeve}
                              onChange={this.changeNrFaqeve} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Kategoria</span>
                            <select className="form-select"
                              onChange={this.changeKategoria}
                              value={KategoriaID}>
                                 <option value="">Select</option>
                              {kategorit.map(dep => <option key={dep.KategoriaID} value={dep.KategoriaID}>
                                {dep.kategoria}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">VitiPublikimit</span>
                            <input type="text" className="form-control"
                              value={VitiPublikimit}
                              onChange={this.changeVitiPublikimit} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Shtepia Botuese</span>
                            <select className="form-select"
                              onChange={this.changeShtepiaBotuese}
                              value={ShtepiaBotueseID}>
                                 <option value="">Select</option>
                              {botuesit.map(dep => <option key={dep.ShtepiaBotueseID} value={dep.ShtepiaBotueseID}>
                                {dep.shtepiaBotuese}
                              </option>)}
                            </select>
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Gjuha</span>
                            <select className="form-select"
                              onChange={this.changeGjuha}
                              value={GjuhaID}>
                                 <option value="">Select</option>
                              {gjuhet.map(dep => <option key={dep.GjuhaID} value={dep.GjuhaID}>
                                {dep.gjuha}
                              </option>)}
                            </select>
                          </div>
                        </div>
                        <div className="p-2 w-50 bd-highlight">
                          <div className="input-group mb-3">
                            <span className="input-group-text">Cmimi</span>
                            <input type="text" className="form-control"
                              value={Cmimi}
                              onChange={this.changeCmimi} />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">Sasia</span>
                            <input type="text" className="form-control"
                            
                              value={Sasia}
                              onChange={this.changeSasia} />
                          </div>
                          <div className="p-2 w-50 bd-highlight">
                            <div className="p-2 w-50 bd-highlight">

                              <input className="m-2" type="file" onChange={this.imageUpload} />
                            </div>

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
export default Libri
