import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import { Redirect } from 'react-router-dom';
import ProfessionalService from '../services/professional.service';
import ProfileController from '../controllers/profileController';
import Swal from 'sweetalert2';
import $ from 'jquery';
import Nav from '../components/nav';

class profileComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null,
      departments: [],
      roles: [],
      tutors: [],
      id: null,
      name: null,
      departmentId: null,
      roleId: null,
      email: sessionStorage.getItem('userEmail'),
      tutorId: null,
      comment: '',
      image: {},
      imageId: null
    };

    // CAN'T TOUCH THIS
    this.myElement = React.createRef();
    this.handleInputElement = this.handleInputElement.bind(this);
  }

  // NOR THIS
  handleInputElement () {
    this.myElement.click();
  }

  async componentDidMount () {
    this.isUserRegistered();
    // Dropdowns
    ProfileController.loadDepartments().then(each => this.setState({ departments: each }));
    ProfileController.loadRoles().then(each => this.setState({ roles: each }));
    ProfileController.loadTutors().then(each => this.setState({ tutors: each }));
    // Professional info
    await ProfileController.queryProfessionals().then((dbState) => this.loadState(dbState));
  }

  loadState (dbState) {
    if (dbState) {
      this.setState(dbState);
      if (dbState.image) {
        $('#blah').attr('src', dbState.image.data);
      }
    }
  }

  isUserRegistered () {
    if (sessionStorage.getItem('isUserRegistered') == 'false') {
      this.setState({ redirect: '/crear-perfil' });
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div><Nav />
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
                          value={this.state.departmentId}
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
                          value={this.state.roleId}
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
                          value={this.state.tutorId}
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
                      value={this.state.comment}
                      onChange={(value) => this.setState({ comment: value.target.value })}
                      placeholder='Introduzca si lo desea algún comentario: Me gusta J'
                      rows='3'
                    />
                  </div>

                  <div class='form-group'>
                    <button type='submit' class='btn btn-success' onClick={() => this.updateProfessional()}>Actualizar</button>
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
                          style={{width: '10rem', height: '10rem'}}
                          ref={profilePicture => { this.myProfilePicture = profilePicture; }}
                          id='blah'
                          class='rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail' alt='avatar'
                        />

                        <figure>
                          <input
                            style={{ display: 'none' }}
                            ref={myElement => { this.myElement = myElement; }}
                            type='file'
                            className='custom-file-input'
                            onChange={(value) => { this.readURL(value.target); }}
                          />
                          <button
                            type='button' style={{ display: 'block', width: '100%' }}
                            onClick={this.handleInputElement}
                            class='btn-mdb-color btn-rounded my-3 btn btn-primary py-1'
                          >Subir Foto
                          </button>
                          <figcaption class='font-italic'><small>Tamaño máximo 2MB</small></figcaption>
                        </figure>
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
  }

  readURL (input) {
    ProfileController.readURL(input).then((res) => {
      if (res) {
        this.state.image = res;
        $('#blah').attr('src', res.data);
      }
    });
  }

  updateProfessional () {
    // parametros de datos post
    const datapost = {
      id: this.state.id,
      name: this.state.name,
      departmentId: this.state.departmentId,
      roleId: this.state.roleId,
      email: this.state.email,
      tutorId: this.state.tutorId,
      comment: this.state.comment,
      image: this.state.image,
      imageId: this.state.imageId
    };

    ProfileController.updateProfessional(datapost);
  }
}

export default profileComponent;
