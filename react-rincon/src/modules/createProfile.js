import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import { Redirect } from 'react-router-dom';
import ProfileController from '../controllers/profileController';
import Swal from 'sweetalert2';
import $, { data } from 'jquery';
import Nav from '../components/nav';

class profileComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null,
      allowCreation: false,
      departments: [],
      roles: [],
      tutors: [],
      name: sessionStorage.getItem('userName'),
      departmentId: null,
      roleId: null,
      email: sessionStorage.getItem('userEmail'),
      tutorId: null,
      comment: '',
      image: null
    };
  }

  componentDidMount () {
    this.allowUserCreation();
    ProfileController.loadDepartments().then(each => this.setState({ departments: each }));
    ProfileController.loadRoles().then(each => this.setState({ roles: each }));
    ProfileController.loadTutors().then(each => this.setState({ tutors: each }));
  }

  async allowUserCreation () {
    const { redirect, allowCreation } = await ProfileController.loadUserId();
    if (redirect) {
      this.setState({ redirect });
    } else if (allowCreation) {
      this.setState({ allowCreation });
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else if (this.state.allowCreation) {
      return (
        <div>
          <Nav />
          <div class='container p-4'>
            <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js' />
            <div class='row'>
              <div class='col-lg-9'>
                <div class='card'>
                  <div class='card-body'>
                    <div class='form-group '>
                      <input
                        type='text'
                        value={this.state.name}
                        onChange={(value) => this.setState({ name: value.target.value })}
                        class='form-control' name='nombre' placeholder='Nombre' autofocus
                      />
                    </div>

                    <div class='row'>
                      <div class='col-lg-3'>
                        <div class='form-group'>
                          <select
                            class='form-control'
                            onChange={(value) => this.setState({ departmentId: value.target.value })}
                          >
                            <option selected disabled>Departamento</option>
                            {this.state.departments}
                          </select>
                        </div>
                      </div>

                      <div class='col-lg-2'>
                        <div class='form-group'>
                          <select
                            class='form-control'
                            onChange={(value) => this.setState({ roleId: value.target.value })}
                          >
                            <option selected disabled>Rol</option>
                            {this.state.roles}
                          </select>
                        </div>
                      </div>

                      <div class='col-lg-3'>
                        <div class='form-group'>
                          <select
                            class='form-control'
                            onChange={(value) => this.setState({ tutorId: value.target.value })}
                          >
                            <option selected disabled>Tutoría</option>
                            {this.state.tutors}
                          </select>
                        </div>
                      </div>

                    </div>

                    <div class='form-group'>
                      <textarea
                        class='form-control'
                        onChange={(value) => this.setState({ comment: value.target.value })}
                        placeholder='Introduzca si lo desea algún comentario: Me gusta J'
                        rows='3'
                      />
                    </div>

                    <div class='form-group'>
                      <button type='submit' class='btn btn-success' onClick={() => this.addProfessional()}>Añadir</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class='col-lg-3'>
                <div class='card'>
                  <div class='card-body text-center'>
                    <form class='md-form'>
                      <div class='file-field'>
                        <div class='md-4'>
                          <img
                            src={require('../images/profile-picture.jpg')}
                            ref={profilePicture => this.myProfilePicture = profilePicture}
                            id='blah'
                            class='rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail' alt='avatar'
                          />

                          <div style={{ marginTop: '10px' }} class='d-flex'>
                            <div class='btn btn-mdb-color btn-rounded float-left custom-file'>
                              <input
                                style={{ width: '100%' }} ref={(myElement) => this.myFileElement = myElement}
                                type='file'
                                id='imgInput'
                                className='custom-file-input btn btn-primary'
                                onChange={(value) => { this.readURL(value.target); }}
                              />
                              <label class='custom-file-label' for='customFile'>Perfil</label>
                            </div>
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  async readURL (input) {
    const image = await ProfileController.readURL(input);
    if (image) {
      $('#blah').attr('src', image.data);
    }
  }

  async addProfessional () {
    const datapost = {
      name: this.state.name,
      departmentId: this.state.departmentId,
      roleId: this.state.roleId,
      email: this.state.email,
      tutorId: this.state.tutorId,
      comment: this.state.comment,
      image: this.state.image
    };

    const response = await ProfileController.addProfessional(datapost);
    if (response == 'true') {
      this.setState({ redirect: '/' });
    }
  }
}

export default profileComponent;
