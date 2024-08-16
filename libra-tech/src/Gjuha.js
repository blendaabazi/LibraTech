import React, { Component } from 'react';
import { variables } from './Variables.js';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar.js';
export class Gjuha extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gjuhet: [],
            modalTitle: "",
            GjuhaID: 0,
            gjuha: ""
        }
    }



    refreshList() {
        fetch(variables.API_URL + 'Gjuha')
            .then(response => response.json())
            .then(data => {
                this.setState({ gjuhet: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeGjuha = (e) => {
        this.setState({ gjuha: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Shto Gjuhen",
            GjuhaID: 0,
            gjuha: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Ndrysho gjuhen",
            GjuhaID: dep.GjuhaID,
            gjuha: dep.gjuha
        });
    }

    createClick() {
        const { gjuha } = this.state;

        if (!gjuha) {
            alert('Ju lutem vendosni gjuhen.');
            return;
        }

        fetch(variables.API_URL + 'Gjuha', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gjuha: gjuha
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('U shtua me sukses');
                this.refreshList();
                document.getElementById("exampleModal").classList.remove("show");
                document.querySelector(".modal-backdrop").remove();
            })
            .catch((error) => {
                alert('Failed');
            });
    }


    updateClick() {
        const { GjuhaID, gjuha } = this.state;

        if (!gjuha) {
            alert('Ju lutem vendosni gjuhen');
            return;
        }

        fetch(variables.API_URL + 'Gjuha', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                GjuhaID: GjuhaID,
                gjuha: gjuha
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Failed');
                this.refreshList();
            })
            .catch((error) => {
                alert('Updated');
                this.refreshList();
                document.getElementById("exampleModal").classList.remove("show");
                document.querySelector(".modal-backdrop").remove();
            });
    }
    deleteClick(id) {
        if (window.confirm('A jeni i sigurt?')) {
            fetch(variables.API_URL + 'Gjuha/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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
            gjuhet,
            modalTitle,
            GjuhaID,
            gjuha
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
                                Shto Gjuhen
                            </button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="d-flex flex-row">




                                            </div>
                                            GjuhaID
                                        </th>
                                        <th>
                                            <div className="d-flex flex-row">

                                            </div>
                                            Gjuha
                                        </th>
                                        <th>
                                            Options
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gjuhet.map(dep =>
                                        <tr key={dep.GjuhaID}>
                                            <td>{dep.GjuhaID}</td>
                                            <td>{dep.gjuha}</td>
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
                                                    onClick={() => this.deleteClick(dep.ID)}>
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
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Gjuha</span>
                                                <input type="text" className="form-control"
                                                    value={gjuha}
                                                    onChange={this.changeGjuha} />
                                            </div>

                                            {GjuhaID == 0 ?
                                                <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.createClick()}
                                                >Create</button>
                                                : null}

                                            {GjuhaID != 0 ?
                                                <button type="button"
                                                    className="btn btn-primary float-start"
                                                    onClick={() => this.updateClick()}
                                                >Update</button>
                                                : null}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    <Footer/>
                </body>
            </div>




        )
    }
}
export default Gjuha;