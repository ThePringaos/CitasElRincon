/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';
import ProfessionalService from '../services/professional.service';
import DepartmentService from '../services/department.service';
import TutorService from '../services/tutor.service';
import RoleService from '../services/role.service';
import ImageService from '../services/image.service';
import ProfileController from '../controllers/profileController';

import Swal from 'sweetalert2';
import { data } from 'jquery';

const jsSHA3 = require('jssha/dist/sha3');

class profileController {
  constructor () {
    this.state = {
      email: sessionStorage.getItem('userEmail'),
      response: {},
      departments: [],
      roles: [],
      tutors: [],
      correctlyCreated: 'false'
    };
  }

  async loadUserId () {
    await ProfessionalService.getWithEmail({ email: sessionStorage.getItem('userEmail') })
      .then(res => {
        console.log('then');
        if (res.success) {
          this.state.response = { redirect: '/', allowCreation: false };
        } else {
          this.state.response = { redirect: null, allowCreation: true };
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

        console.log('PROFESSIONAL LOADED FROM DATABASE');
      })
      .catch(err => {
        console.error('ERROR server' + err);
      });
    return myState;
  }

  cargarImagenDeBBDD (imagenDeBBDD) {
    let bufferOriginal = null;
    // Pasar buffer a string
    bufferOriginal = Buffer.from(imagenDeBBDD.data);
    // Pasar buffer a formato utf
    imagenDeBBDD.data = bufferOriginal.toString('utf8');

    const imageType = imagenDeBBDD.data.substring(0, 11);
    if (imageType === 'data:image/') {
      return imagenDeBBDD;
    } else {
      return null;
    }
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

  updateProfessional (datapost) {
    this.validateFields(datapost.name, datapost.departmentId, datapost.roleId);

    ProfessionalService.update(datapost)
      .then(res => {
        if (res.data.success) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Profesional actualizado correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          console.error('Error');
        }
      }).catch(error => {
        console.error('Error 34 ' + error);
      });
  }

  async readURL (input) {
    return new Promise(function (resolve, reject) {
      const miImagen = {};
      if (input.files && input.files[0]) {
        const myValue = input.files[0];

        const random = Math.floor(((Math.random() * 100) + 1)) === 69;

        if (random) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Esa imagen es muy grande para mi puertito!',
            showConfirmButton: false,
            timer: 2000
          });
          console.error('Error en lectura de imagen');
          reject(null);
        } else if (myValue.size > 2000000) {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Demasiado grande!',
            showConfirmButton: false,
            timer: 2000
          });
          console.error('Error en lectura de imagen');
          reject(null);
        }

        if (myValue.type.includes('image')) {
          const reader = new FileReader();
          reader.readAsDataURL(myValue);

          reader.onload = (event) => {
            const shaObj = new jsSHA3('SHA3-512', 'TEXT', { encoding: 'UTF8' });
            shaObj.update(event.target.result);

            miImagen.id = shaObj.getHash('HEX');
            miImagen.data = event.target.result;

            resolve(miImagen);
          };
          reader.onerror = (err) => {
            console.error('Error en lectura de imagen --> ' + err);
            reject(null);
          };
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Sólo archivos de tipo imagen!',
            showConfirmButton: false,
            timer: 2000
          });
          console.error('Error en lectura de imagen');
          reject(null);
        }
      }
    });
  }

  checkImageExistence (datapost) {
    console.log(datapost);
    const { image } = datapost;

    ImageService.get(image.id).then((res) => {
      if (res.data.success) {
        datapost.user.imageId = image.id;
      }
    });

    return datapost;
  }
}
export default new profileController();
