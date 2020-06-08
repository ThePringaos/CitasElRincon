import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import EmployeeService from '../services/employee.service';

import Swal from 'sweetalert2';

class editComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: -1,
            name: "",
            salary: ""
        }
    }

    componentDidMount(){
        let userId = this.props.match.params.id;
        EmployeeService.get(userId)
            .then(res => {
                if(res.data.success){
                    const data = res.data.data[0];
                    this.setState({
                        id: data.id,
                        name: data.name,
                        salary: data.salary
                    });  
                    console.log(data);
                }else{
                    alert('Error web service');
                }
            }).catch(err => {
                alert('ERROR server'+err);
            });
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
                                        value= {this.state.salary} 
                                        onChange={(value)=> this.setState({salary:value.target.value})}
                                        class="form-control" name="salario" placeholder="salario"
                                    />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    sendUpdate(){
        //  get parameter id
        const userId = this.props.match.params.id;

        // parametros de datos post
        const datapost = {
        id: this.state.id,
        name : this.state.name,
        salary : this.state.salary,
        }

        EmployeeService.update(userId,datapost)
        .then(res=>{
        if (res.data.success) {
            //alert(res.data.message);
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Empleado editado correctamente!',
                showConfirmButton: false,
                timer: 1500
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

export default editComponent;