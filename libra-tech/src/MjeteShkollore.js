import React, { Component } from 'react';
import { variables } from './Variables.js';
import ProdhuesiMSh from './ProdhuesiMSh.js';
import ShtetiMSh from './ShtetiMSh.js';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axiosInstance from './axiosInstance';




export class MjeteShkollore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shtetet: [],
            prodhuesit: [],
            tipet: [],
            mjetet: [],
            modalTitle: "",
            ID: 0,
            Pershkrimi: "",
            TipiID: "",
            ImgPath: "img.png",
            Cmimi: 0.0,
            Sasia: 0,
            ProdhuesiMShID: "",
            ShtetiMShID: "",
            PhotoFileName: variables.PHOTO_URL,
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
        this.setState({
            modalTitle: "",
            ID: 0,
            Pershkrimi: "",
            TipiID: "",
            ImgPath: "img.png",
            Cmimi: 0.0,
            Sasia: 0,

            ProdhuesiMShID: "",
            ShtetiMShID: "",
            isFormValid: false,

        });
    }

    validateForm = () => {
        const { Pershkrimi, TipiID, Cmimi, Sasia, ProdhuesiMShID
            , ShtetiMShID } = this.state;
        return Pershkrimi && TipiID && Cmimi && Sasia && ProdhuesiMShID && ShtetiMShID;
    };

    refreshList() {

        fetch(variables.API_URL + 'MjeteShkollore')
            .then(response => response.json())
            .then(data => {
                this.setState({ mjetet: data });
            });

        fetch(variables.API_URL + 'Tipi')
            .then(response => response.json())
            .then(data => {
                this.setState({ tipet: data });
            });


        fetch(variables.API_URL + 'ProdhuesiMSh')
            .then(response => response.json())
            .then(data => {
                this.setState({ prodhuesit: data });
            });

        fetch(variables.API_URL + 'ShtetiMSh')
            .then(response => response.json())
            .then(data => {
                this.setState({ shtetet: data });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    changePershkrimi = (e) => {
        this.setState({ Pershkrimi: e.target.value });
    }
    changeTipi = (e) => {
        this.setState({ TipiID: e.target.value });
    }
    changeCmimi = (e) => {
        this.setState({ Cmimi: e.target.value });
    }
    changeSasia = (e) => {
        this.setState({ Sasia: e.target.value });
    }
    changeProdhuesitMSh = (e) => {
        this.setState({ ProdhuesiMShID: e.target.value });
    }
    changeShtetetMSh = (e) => {
        this.setState({ ShtetiMShID: e.target.value });
    }


    addClick() {
        this.setState({
            modalTitle: "Shto MjeteShkollore",
            ID: 0,
            Pershkrimi: "",
            TipiID: "",
            ShtetiMShID: "",
            ProdhuesiMShID: "",
            ImgPath: "anonymous.png",
            Cmimi: 0,
            Sasia: 0,

        });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Ndrysho MjeteShkollore",
            ID: emp.ID,
            Pershkrimi: emp.Pershkrimi,
            TipiID: emp.TipiID,
            ShtetiMSh: emp.ShtetiMShID,
            ProdhuesiMShID: emp.ProdhuesiMShID,
            ImgPath: emp.ImgPath,
            Cmimi: emp.Cmimi,
            Sasia: emp.Sasia,

        });
    }

    createClick = () => {
        axiosInstance.post('http://localhost:5170/api/MjeteShkollore', {
            Pershkrimi: this.state.Pershkrimi,
            TipiID: this.state.TipiID,
            ShtetiMShID: this.state.ShtetiMShID,
            ProdhuesiMShID: this.state.ProdhuesiMShID,
            ImgPath: this.state.ImgPath,
            Cmimi: this.state.Cmimi,
            Sasia: this.state.Sasia,
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
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
        const { ID, Pershkrimi, TipiID, ShtetiMShID, ProdhuesiMShID, ImgPath, Cmimi, Sasia } = this.state;

        axiosInstance.put(`http://localhost:5170/api/MjeteShkollore/${ID}`, {
            ID,
            Pershkrimi,
            TipiID,
            ShtetiMShID,
            ProdhuesiMShID,
            ImgPath,
            Cmimi,
            Sasia
        }, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
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
            fetch(variables.API_URL + 'MjeteShkollore/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
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

        fetch(variables.API_URL + 'MjeteShkollore/savefile', {
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
            shtetet,
            prodhuesit,
            tipet,
            mjetet,
            modalTitle,
            ID,
            Pershkrimi,
            TipiID,
            Cmimi,
            Sasia,
            ProdhuesiMShID,
            ShtetiMShID,
            PhotoFileName,
            ImgPath

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
                                    <Link style={{ background: '#a9c0cf' }} to="/Tipi" className="btn btn-primary m-2 float-end">
                                        + Tipi
                                    </Link>
                                    <Link style={{ background: '#a9c0cf' }} to="/ProdhuesiMSh" className="btn btn-primary m-2 float-end">
                                        + Prodhuesi
                                    </Link>
                                    <Link style={{ background: '#a9c0cf' }} to="/ShtetiMSh" className="btn btn-primary m-2 float-end">
                                        + Shteti
                                    </Link>
                                </div>
                                <div>
                                    <button type="button"
                                        className="btn btn-primary m-2 float-end"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.addClick()}>
                                        Shto Mjete Shkollore
                                    </button>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Pershkrimi
                                        </th>
                                        <th>
                                            Tipi
                                        </th>
                                        <th>
                                            Shteti
                                        </th>
                                        <th>
                                            Prodhuesi
                                        </th>
                                        <th>
                                            Cmimi
                                        </th>
                                        <th>
                                            Sasia
                                        </th>
                                        <th>
                                            Options
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mjetet.map(emp =>
                                        <tr key={emp.ID}>
                                            <td>{emp.ID}</td>
                                            <td>{emp.Pershkrimi}</td>
                                            <td>{tipet.find(t => t.TipiID === emp.TipiID)?.tipi || 'No TIP'}</td>
                                            <td>{shtetet.find(t => t.ShtetiMShID === emp.ShtetiMShID)?.shteti || 'No shtet'}</td>
                                            <td>{prodhuesit.find(t => t.ProdhuesiMShID === emp.ProdhuesiMShID)?.Prodhuesi || 'No prodhues'}</td>
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
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{modalTitle}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            ></button>
                                        </div>

                                        <div className="modal-body">
                                            <div className="d-flex flex-row bd-highlight mb-3">

                                                <div className="p-2 w-50 bd-highlight">

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Pershkrimi</span>
                                                        <input type="text" className="form-control"
                                                            value={Pershkrimi}
                                                            onChange={this.changePershkrimi} />
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Tipi</span>

                                                        <select className="form-select"
                                                            onChange={this.changeTipi}
                                                            value={TipiID}>
                                                            <option value="">Select</option>
                                                            {tipet.map(dep => <option key={dep.TipiID} value={dep.TipiID}>
                                                                {dep.tipi}
                                                            </option>)}
                                                        </select>
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Cmimi</span>
                                                        <input type="number" className="form-control" min="0"
                                                            value={Cmimi}
                                                            onChange={this.changeCmimi} />
                                                    </div>


                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Sasia</span>
                                                        <input type="number" className="form-control" min="0"
                                                            value={Sasia}
                                                            onChange={this.changeSasia} />
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Shteti</span>
                                                        <select className="form-select"
                                                            onChange={this.changeShtetetMSh}
                                                            value={ShtetiMShID}>
                                                            <option value="">Select</option>
                                                            {shtetet.map(dep => <option key={dep.ShtetiMShID} value={dep.ShtetiMShID}>
                                                                {dep.shteti}
                                                            </option>)}
                                                        </select>
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Prodhuesi</span>
                                                        <select className="form-select"
                                                            onChange={this.changeProdhuesitMSh}
                                                            value={ProdhuesiMShID}>
                                                            <option value="">Select</option>
                                                            {prodhuesit.map(dep => <option key={dep.ProdhuesiMShID} value={dep.ProdhuesiMShID}>
                                                                {dep.Prodhuesi}
                                                            </option>)}
                                                        </select>
                                                    </div>


                                                </div>
                                                <div className="p-2 w-50 bd-highlight">

                                                    <input className="m-2" type="file" onChange={this.imageUpload} />
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

        )
    }
}
export default MjeteShkollore;