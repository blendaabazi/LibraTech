import React, { Component } from 'react';
import { variables } from './Variables.js';
import Footer from './Footer.js';
import Header from './Header';
import Sidebar from './Sidebar.js';

export class ProdhuesiMSh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prodhueset: [],
            modalTitle: "",
            Prodhuesi: "",
            ProdhuesiMShID: 0,
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'ProdhuesiMSh')
            .then(response => response.json())
            .then(data => {
                this.setState({ prodhueset: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeProdhuesi = (e) => {
        this.setState({ Prodhuesi: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Shto prodhuesin",
            ProdhuesiMShID: 0,
            Prodhuesi: ""
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Ndrysho prodhuesin",
            ProdhuesiMShID: dep.ProdhuesiMShID,
            Prodhuesi: dep.Prodhuesi
        });
    }

    createClick() {

        if (!this.state.Prodhuesi) {
            alert("Ju lutem shkruani emrin e prodhuesit.");
            return;
        }

        fetch(variables.API_URL + 'ProdhuesiMSh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('Token')}`

            },
            body: JSON.stringify({
                Prodhuesi: this.state.Prodhuesi
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
        fetch(variables.API_URL + 'ProdhuesiMSh', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('Token')}`

            },
            body: JSON.stringify({
                ProdhuesiMShID: this.state.ProdhuesiMShID,
                Prodhuesi: this.state.Prodhuesi
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Failed');
                this.refreshList();

            }, (error) => {
                alert('Updated');
                this.refreshList();
                document.getElementById("exampleModal").classList.remove("show");
                document.querySelector(".modal-backdrop").remove();

            })
    }

    deleteClick(id) {
        if (window.confirm('A jeni i sigurt?')) {
            fetch(variables.API_URL + 'ProdhuesiMSh/' + id, {
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

                }, (error) => {
                    alert('Success');
                    this.refreshList();
                })
        }
    }

    render() {
        const {
            prodhueset,
            modalTitle,
            ProdhuesiMShID,
            Prodhuesi
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
                                Shto Prodhuesin
                            </button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Prodhuesi</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prodhueset.map(dep =>
                                        <tr key={dep.ProdhuesiMShID}>
                                            <td>{dep.ProdhuesiMShID}</td>
                                            <td>{dep.Prodhuesi}</td>
                                            <td>
                                                <button type="button"
                                                    className="btn btn-light mr-1"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => this.editClick(dep)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                                <button type="button"
                                                    className="btn btn-light mr-1"
                                                    onClick={() => this.deleteClick(dep.ProdhuesiMShID)}>
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
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Prodhuesi</span>
                                                <input type="text" className="form-control"
                                                    value={Prodhuesi}
                                                    onChange={this.changeProdhuesi} />
                                            </div>

                                            {ProdhuesiMShID === 0 ?
                                                <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.createClick()}>
                                                    Create
                                                </button>
                                                : null}

                                            {ProdhuesiMShID !== 0 ?
                                                <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.updateClick()}>
                                                    Update
                                                </button>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </body>
            </div>
        )
    }
}

export default ProdhuesiMSh;
