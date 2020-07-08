import React, { Component } from 'react';
import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';
import ImageService from '../services/image.service';
import ProfileController from '../controllers/profileController';

import Swal from 'sweetalert2';
import { data } from 'jquery';

class profileController {
  constructor () {
    this.state = {
      email: sessionStorage.getItem('userEmail'),
      response: {},
      departments: {},
      roles: {},
      tutors: {},
      correctlyCreated: 'false'
    };
  }

  async loadUserId () {
    await ProfessionalService.getWithEmail({ email: this.state.email })
      .then(res => {
        if (res.data.success) {
          this.state.response = { redirect: '/' };
        } else {
          this.state.response = { allowCreation: true };
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
    return this.state.response;
  }

  async queryProfessionals () {
    let myState = {};
    await ProfessionalService.getWithEmail({ email: this.state.email })
      .then(async res => {
        if (res.data.success) {
          const { id, name, departmentId, roleId, tutorId, comment, imageId } = res.data.data[0];

          myState = {
            id: id,
            name: name,
            departmentId: departmentId,
            roleId: roleId,
            tutorId: tutorId,
            comment: comment,
            imageId: imageId
          };

          if (imageId != null) {
            await ImageService.get(imageId).then(res => {
              myState.image = this.cargarImagenDeBBDD(res.data.data[0]);
            }).catch(err => {
              console.error('ERROR server ' + err);
            });
          } else {
            console.error('No hay imagen asociada a esta cuenta.');
          }
        } else {
          console.error('Error quering professional EDIT');
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
    return myState;
  }

  cargarImagenDeBBDD (imagenDeBBDD) {
    let bufferOriginal = null;
    if (imagenDeBBDD.type.includes('image')) {
      // Pasar buffer a string
      bufferOriginal = Buffer.from(imagenDeBBDD.data);
      // Pasar buffer a formato utf
      imagenDeBBDD.data = bufferOriginal.toString('utf8');
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Sólo archivos de tipo imagen!',
        showConfirmButton: false,
        timer: 2000
      });
    }
    return imagenDeBBDD;
  }

  async queryDepartments () {
    await DepartmentService.getAll()
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.state.departments = data;
        } else {
          console.error('Error web service');
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
  }

  async queryRoles () {
    await RoleService.getAll()
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.state.roles = data;
        } else {
          console.error('Error web service');
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
  }

  async queryTutors () {
    await TutorService.getAll()
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          this.state.tutors = data;
        } else {
          console.error('Error web service');
        }
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
    return this.state.tutors;
  }

  async loadDepartments () {
    await this.queryDepartments();
    return this.state.departments.map(data => {
      if (data) {
        return (
          <option value={data.id}>{data.name}</option>
        );
      } else {
        return <div />;
      }
    });
  }

  async loadRoles () {
    await this.queryRoles();
    return this.state.roles.map(data => {
      if (data) {
        return (
          <option value={data.id}>{data.name}</option>
        );
      } else {
        return <div />;
      }
    });
  }

  async loadTutors () {
    await this.queryTutors();
    return this.state.tutors.map(data => {
      if (data) {
        return (
          <option value={data.id}>{data.name}</option>
        );
      } else {
        return <div />;
      }
    });
  }

  validateFields (nombre, departamentoId, roleId) {
    let emptyFields = '';
    let count = 0;

    if (nombre.replace(/\s/g, '').length == 0) {
      emptyFields += ' Nombre ';
      count++;
    }
    if (departamentoId == null) {
      emptyFields += ' Departamento ';
      count++;
    }
    if (roleId == null) {
      emptyFields += ' Rol ';
      count++;
    }

    // If there are errors
    if (count > 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: (count == 1 ? 'Falta el campo' : 'Faltan los campos: ') + emptyFields,
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    } else {
      return true;
    }
  }

  async addProfessional (datapost) {
    const { name, departmentId, roleId } = datapost;
    if (this.validateFields(name, departmentId, roleId) == false) {
      return;
    }

    await ProfessionalService.create(datapost)
      .then(async res => {
        if (res.data.success) {
          await Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Enhorabuena, ya tiene perfil!',
            showConfirmButton: false,
            timer: 2000
          });
          this.state.correctlyCreated = 'true';
        } else {
          console.error('Error creating professional');
        }
      }).catch(error => {
        console.error('Error 34 ' + error);
      });

    return this.state.correctlyCreated;
  }

  async readURL (input) {
    const miImagen = {};

    if (input.files && input.files[0]) {
      const myValue = input.files[0];

      if (myValue.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(myValue);

        reader.onload = (event) => {
          console.log('CARGO DATOS');
          miImagen.data = event.target.result;
          miImagen.name = myValue.name;
          miImagen.type = myValue.type;
        };
        reader.onerror = (err) => {
          console.error('Error en lectura de imagen --> ' + err);
        };
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Sólo archivos de tipo imagen!',
          showConfirmButton: false,
          timer: 2000
        });
      }
      console.log('DEVUELVO DATOS');
      return miImagen;
    }
  }
}
export default new profileController();
