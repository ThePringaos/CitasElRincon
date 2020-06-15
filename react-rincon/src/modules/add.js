import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

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

    }
}

export default addComponent;