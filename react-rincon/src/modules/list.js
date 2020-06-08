import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import { Link, Router } from 'react-router-dom';

import Swal from 'sweetalert2';

import EmployeeService from '../services/employee.service'


class listComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listEmployee: []
    }
  }

  componentDidMount() {
    this.loadEmployee();
  }

  loadEmployee() {
    EmployeeService.getAll()
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.setState({ listEmployee: data });
        } else {
          alert('Error web service');
        }
      })
      .catch(err => {
        alert('ERROR server' + err);
      });
  }




  render() {
    return (
      <div class="container p-4">
        <div class="row">
          <div class="col-md-3 mb-3">
            <div class="card text-center h-100">
              <div class="card-body">
                <br></br>
                <p class="m-2">Añadir empleado</p>
                <br></br>
                <Link class="btn btn-outline-info " to={"/add/"}>Añadir</Link>
              </div>
            </div>
          </div>
          {this.loadFillData()}
        </div>
      </div>
    );
  }

  loadFillData() {
    //let userId = this.props.match.params.employeeId;
    console.log(this.state.listEmployee);
    return this.state.listEmployee.map(data => {
      if (data) {
        return (
          <div class="col-md-3 mb-3">
            <div class="card text-center h-100">
              <div class="card-body">
                <p class="m-2"> {data.id}</p>
                <p class="m-2"> {data.name}</p>
                <p class="m-2"> {data.salary}</p>
                <button class="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}> Borrar </button>
                <Link class="btn btn-outline-info " to={"/edit/" + data.id}>Editar</Link>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div class="col-md-4 mx-auto">
            <div class="card card-body text-center">
              <p>No hay registros en La Tabla</p>
              <a href="/add">Crear un empleado</a>
            </div>
          </div>
        );
      };
    });
  };

  onDelete(id) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'No podrá recuperar el usuario!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Su empleado no se ha eliminado',
          'Error'
        )
      }
    })
  }


  sendDelete(userId) {
    EmployeeService.delete(userId)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Eliminado!',
            'El empleado ha sido eliminado.',
            'Éxito'
          );
          this.loadEmployee();
        }
      })
      .catch(error => {
        alert("Error 325 ")
      })
  }
}

export default listComponent;

