  import React, { Component } from 'react';
  import { variables } from './Variables.js';
  import Header from './Header';
  import Footer from './Footer';
  import Sidebar from './Sidebar.js';
  import { Link } from 'react-router-dom';

  export class UserProfile extends Component {
    constructor(props) {
      super(props);

      this.state = {
        user: {},
        modalTitle: "",
        ID: 0,
        Name: "",
        Surname: "",
        Email: "",
        Password: "",
        isFormValid: false,
      };

      this.handleModalHidden = this.handleModalHidden.bind(this);
    }

    componentDidMount() {
      this.refreshProfile();
      const modal = document.getElementById("profileModal");
      modal.addEventListener("hidden.bs.modal", this.handleModalHidden);
    }

    componentWillUnmount() {
      const modal = document.getElementById("profileModal");
      modal.removeEventListener("hidden.bs.modal", this.handleModalHidden);
    }

    handleModalHidden() {
      this.setState({
        modalTitle: "",
        ID: 0,
        Name: "",
        Surname: "",
        Email: "",
        Password: "",
        isFormValid: false,
      });
    }

      validateForm = () => {
          const { Name, Surname, Email, Password } = this.state;
          return Name && Surname && Email && Password;
      };

    refreshProfile() {
      // Replace with actual API endpoint to fetch user profile
      fetch(variables.API_URL + 'user')
        .then(response => response.json())
        .then(data => {
          this.setState({ 
            user: data,
            ID: data.ID,
            Name: data.Name,
            Surname: data.Surname,
            Email: data.Email,
            Password: data.Password,
          });
        });
    }

    changeName = (e) => {
      this.setState({ Name: e.target.value });
    }

    changeSurname = (e) => {
      this.setState({ Surname: e.target.value });
    }

    changeEmail = (e) => {
      this.setState({ Email: e.target.value });
    }

    changePassword = (e) => {
      this.setState({ Password: e.target.value });
    }

    editClick(emp) {
      this.setState({
        modalTitle: "Edit Profile",
        ID: emp.ID,
        Name: emp.Name,
        Surname: emp.Surname,
        Email: emp.Email,
        Password:emp.Password,
      });
    }

    updateClick() {
      fetch(variables.API_URL + 'user', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ID: this.state.ID,
          Name: this.state.Name,
          Surname: this.state.Surname,
          Email: this.state.Email,
          Password: this.state.Password,
        })
      })
        .then(res => {
          if (res.ok) {
            alert('Updated');
            this.refreshProfile();
            document.getElementById("profileModal").classList.remove("show");
            document.querySelector(".modal-backdrop").remove();
          } else {
            alert('Failed');
          }
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          alert('Failed');
        });
    
  };


    render() {
      const {
        modalTitle,
        Name,
        Surname,
        Email,
        Password
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
                    <button type="button"
                      className="btn btn-primary m-2 float-end"
                      data-bs-toggle="modal"
                      data-bs-target="#profileModal"
                      onClick={() => this.editClick()}>
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="modal fade" id="profileModal" tabIndex="-1" aria-hidden="true">
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
                              <span className="input-group-text">Name</span>
                              <input type="text" className="form-control"
                                value={Name}
                                onChange={this.changeName} />
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Surname</span>
                              <input type="text" className="form-control"
                                value={Surname}
                                onChange={this.changeSurname} />
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Email</span>
                              <input type="email" className="form-control"
                                value={Email}
                                onChange={this.changeEmail} />
                            </div>
                            <div className="input-group mb-3">
                              <span className="input-group-text">Password</span>
                              <input type="password" className="form-control"
                                value={Password}
                                onChange={this.changePassword} />
                            </div>
                          </div>
                        </div>

                        <button type="button" className="btn btn-primary float-end"
                          onClick={() => this.updateClick()}
                          disabled={!this.validateForm()}>
                          Update
                        </button>
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
  export default UserProfile;
