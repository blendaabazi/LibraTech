import React, { Component } from 'react';
import { variables } from './Variables.js';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class AuditLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auditLogs: [],
            modalTitle: "",
            ID: 0,
            Action: "",
            UserID: "",
            EntityType: "",
            EntityID: "",
            CreatedAt: "",
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios.get(variables.API_URL + 'AuditLog', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(response => {
                this.setState({ auditLogs: response.data });
            })
            .catch(error => {
                console.error('Error fetching audit logs:', error);
            });
    };

    deleteAuditLog = (id) => {
        axios.delete(variables.API_URL + `AuditLog/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(response => {
                alert("Audit log deleted successfully.");
                this.refreshList(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting audit log:', error);
            });
    };

    deleteAllAuditLogs = () => {
        if (window.confirm("Are you sure you want to delete all audit logs?")) {
            axios.delete(variables.API_URL + 'AuditLog/deleteAll', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
            })
                .then(response => {
                    alert("All audit logs deleted successfully.");
                    this.refreshList(); // Refresh the list after deletion
                })
                .catch(error => {
                    console.error('Error deleting all audit logs:', error);
                });
        }
    };

    render() {
        const { auditLogs } = this.state;

        return (
            <div>
                <Header />
                <div className="container">
                    <Sidebar />
                    <div className="container-fluid" style={{ paddingLeft: '50px' }}>
                        <div className='d-flex justify-content-between'>
                            <h2 className="mt-3">Audit Log</h2>
                            <button className="btn btn-danger mt-3" onClick={this.deleteAllAuditLogs} style={{ backgroundColor: '#e74c3c', borderColor: '#c0392b' , marginBottom:'10px'}}>
                                Delete All 
                            </button>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Veprimi</th>
                                    <th>Produkti</th>
                                    <th>ID e Produktit</th>
                                    <th>Admini</th>
                                    <th>Data</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map(log =>
                                    <tr key={log.Id}>
                                        <td>{log.Action}</td>
                                        <td>{log.Entity}</td>
                                        <td>{log.EntityId}</td>
                                        <td>{log.PerformedBy}</td>
                                        <td>{new Date(log.PerformedAt).toLocaleString('en-GB')}</td>
                                        <td>
                                            
                                            <button type="button"
                                                    className="btn btn-light mr-1"
                                                    onClick={() => this.deleteAuditLog(log.Id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default AuditLog;
