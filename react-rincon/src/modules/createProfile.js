import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import { Redirect } from "react-router-dom";

import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';

import Swal from 'sweetalert2';
import $ from 'jquery';

class profileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            allowCreation: false,
            departments: [],
            roles: [],
            tutors: [],
            name: sessionStorage.getItem("userName"),
            departmentId: null,
            roleId: null,
            email: sessionStorage.getItem("userEmail"),
            tutorId: null,
            comment: "",
            image: null
        };
    }

    async componentDidMount() {
        this.loadUserId();
        this.queryDepartments();
        this.queryRoles();
        this.queryTutors();
    }

    async loadUserId() {
        await ProfessionalService.getWithEmail({ email: this.state.email })
            .then(res => {
                if (res.data.success) {
                    this.setState({ redirect: "/" });
                } else {
                    this.setState({allowCreation:true});
                }
            })
            .catch(err => {
                console.error('ERROR server' + err);
            });
    }

    queryDepartments() {
        DepartmentService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ departments: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    queryRoles() {
        RoleService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ roles: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    queryTutors() {
        TutorService.getAll()
            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ tutors: data });
                } else {
                    alert('Error web service');
                }
            })
            .catch(err => {
                alert('ERROR server' + err);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } else if(this.state.allowCreation){
            return (
                <div class="container p-4">
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-group ">
                                        <input type="text"
                                            value={this.state.name}
                                            onChange={(value) => this.setState({ name: value.target.value })}
                                            class="form-control" name="nombre" placeholder="Nombre" autofocus
                                        />
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <select class="form-control"
                                                    onChange={(value) => this.setState({ departmentId: value.target.value })} >
                                                    <option selected disabled>Departamento</option>
                                                    {this.loadDepartments()}

                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-lg-2">
                                            <div class="form-group">
                                                <select class="form-control"
                                                    onChange={(value) => this.setState({ roleId: value.target.value })} >
                                                    <option selected disabled >Rol</option>
                                                    {this.loadRoles()}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <select class="form-control"
                                                    onChange={(value) => this.setState({ tutorId: value.target.value })} >
                                                    <option selected disabled >Tutoría</option>
                                                    {this.loadTutors()}
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="form-group">
                                        <textarea class="form-control"
                                            onChange={(value) => this.setState({ comment: value.target.value })}
                                            placeholder="Introduzca si lo desea algún comentario: Me gusta J"
                                            rows="3"></textarea>
                                    </div>

                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success" onClick={() => this.addProfessional()}>Añadir</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="card">
                                <div class="card-body text-center">
                                    <form class="md-form">
                                        <div class="file-field">
                                            <div class="md-4" >
                                                <img src={require("../images/profile-picture.jpg")}
                                                    ref={profilePicture => this.myProfilePicture = profilePicture}
                                                    id="blah"
                                                    class="rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail" alt="avatar"
                                                />

                                                <div style={{ marginTop: "10px" }} class="d-flex" >
                                                    <div class="btn btn-mdb-color btn-rounded float-left custom-file">
                                                        <input style={{ width: "100%" }} ref={(myElement) => this.myFileElement = myElement}
                                                            type="file"
                                                            id="imgInput"
                                                            className="custom-file-input btn btn-primary"
                                                            onChange={(value) => { this.readURL(value.target) }}
                                                        />
                                                        <label class="custom-file-label" for="customFile">Perfil</label>
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

            );
        }else{
            return null;
        }
    }

    loadDepartments() {
        return this.state.departments.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    loadRoles() {
        return this.state.roles.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    loadTutors() {
        return this.state.tutors.map(data => {
            if (data) {
                return (
                    <option value={data.id}>{data.name}</option>
                );
            } else {
                return <div></div>;
            }
        });
    }

    readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            const myValue = input.files[0];

            if (myValue.type.includes("image")) {
                reader.onload = (event) => $('#blah').attr('src', event.target.result);

                reader.readAsDataURL(myValue); // convert to base64 string

                this.state.image = {
                    name: myValue.name,
                    type: myValue.type,
                    data: myValue
                }
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Sólo archivos de tipo imagen!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }


        }
    }

    validateFields() {
        let emptyFields = "";
        let count = 0;
        const nombre = this.state.name;

        if (nombre.replace(/\s/g, "").length == 0) {
            emptyFields += " Nombre ";
            count++;
        }
        if (this.state.departmentId == null) {
            emptyFields += " Departamento ";
            count++;
        }
        if (this.state.roleId == null) {
            emptyFields += " Rol ";
            count++;
        }

        //If there are errors
        if (count > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: (count == 1 ? "Falta el campo" : "Faltan los campos: ") + emptyFields,
                showConfirmButton: false,
                timer: 2000
            })
            return false;
        } else {
            return true;
        }

    }

    addProfessional() {
        if (this.validateFields() == false) {
            return;
        }

        // parametros de datos post
        const datapost = {
            name: this.state.name,
            departmentId: this.state.departmentId,
            roleId: this.state.roleId,
            email: this.state.email,
            tutorId: this.state.tutorId,
            comment: this.state.comment,
            image: this.state.image
        }
        //alert(JSON.stringify(datapost));

        ProfessionalService.create(datapost)
            .then(async res => {
                if (res.data.success) {
                    //alert(res.data.message);
                    await Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: '¡Enhorabuena, ya tiene perfil!',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    this.setState({ redirect: "/" });
                }
                else {
                    alert("Error");
                }
            }).catch(error => {
                alert("Error 34 " + error);
            });
    }
}



export default profileComponent;