import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import EmployeeService from '../services/employee.service';

import Swal from 'sweetalert2';

class addComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            salary: ""
        };
    }

    render(){
        return(
            <div class="container p-4">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="text" 
                                        value={this.state.name}
                                        onChange={(value)=> this.setState({name:value.target.value})}
                                        class="form-control" name="nombre" placeholder="nombre" autofocus
                                    />
                                </div>
                                <div class="form-group">
                                    <input type="number" 
                                        value={this.state.salary}
                                        onChange={(value)=> this.setState({salary:value.target.value})}
                                        class="form-control" name="salario" placeholder="salario"
                                    />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success" onClick={()=>this.addEmployee()}>Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    addEmployee(){
        // parametros de datos post
        const datapost = {
        name : this.state.name,
        salary : this.state.salary,
        }

        
        EmployeeService.create(datapost)
        .then(res=>{
        if (res.data.success) {
            //alert(res.data.message);
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Empleado añadido correctamente!',
                showConfirmButton: false,
                timer: 2000
              })
            this.props.history.push('/list'); 
        }
        else {
            alert("Error");
        }
        }).catch(error=>{
        alert("Error 34 "+error);
        }); 
    }
}

export default addComponent;