import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';
import ImageService from '../services/image.service';

import Swal from 'sweetalert2';

class profileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            name: "",
            departamentId: -1,
            roleId: -1,
            email: "",
            tutorId: -1,
            comment: "",
            imageId: -1,
            image: {
                name: "",
                type: "",
                data: ""
            }
        };
    }

    render() {
        return (
            <div class="container p-4">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group ">
                                    <input type="text"
                                        value={this.state.name}
                                        onChange={(value) => this.setState({ name: value.target.value })}
                                        class="form-control" name="nombre" placeholder="nombre" autofocus
                                    />
                                </div>

                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option selected disabled>Departamento</option>
                                                {this.loadDepartmentOptions()}
                                        
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2">
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option selected disabled >Rol</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option selected disabled >Tutoría</option>
                                                <option>Algo</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <form class="md-form">
                                    <div class="file-field">
                                        <div class="md-4">
                                            <img src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                                                class="rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail" alt="avatar"
                                            />
                                        </div>
                                        <div class="d-flex">
                                            <div class="btn btn-mdb-color btn-rounded float-left">
                                                <input type="file" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <button type="submit" class="btn btn-success">Añadir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    loadDepartmentOptions() {
        DepartmentService.getAll()
            .then(res => {
                console.log("alert"+res);
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

        return this.state.departments.map(data => {
            if (data) {
                return (
                    <option value="">{data.name}</option>                
                );
            }else{
                return <div></div>;
            }
        });
    }
}

export default profileComponent;