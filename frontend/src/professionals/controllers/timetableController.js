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

import ProfessionalService from '../../services/professional.service';
import TimetableService from '../../services/timetable.service';
import Swal from 'sweetalert2';

class timetableController {
  constructor() {
    this.state = {
      myUser: null,
      userId: sessionStorage.getItem("userId"),
      tableId: null,
      periodLenght: 30,
      monday: {
        myDateFrom: null,
        from: "",
        myDateTo: null,
        to: ""
      },
      tuesday: {
        myDateFrom: null,
        from: "",
        myDateTo: null,
        to: ""
      },
      wednesday: {
        myDateFrom: null,
        from: "",
        myDateTo: null,
        to: ""
      },
      thursday: {
        myDateFrom: null,
        from: "",
        myDateTo: null,
        to: ""
      },
      friday: {
        myDateFrom: null,
        from: "",
        myDateTo: null,
        to: ""
      },
      mondayDDBB: null,
      tuesdayDDBB: null,
      wednesdayDDBB: null,
      thursdayDDB: null,
      fridayDDBB: null
    }
  }

  async queryTimetable() {
    console.log("CARGO ID");
    console.log(this.state.userId);
    await ProfessionalService.get(this.state.userId).then(res => {
      console.log(res.data);
      if (res.data.success) {
        this.state.myUser = res.data.data[0];
        const { id, monday, tuesday, wednesday, thursday, friday } = (this.state.myUser.timetable);
        this.state.tableId = id;
        if (monday != null) {
          this.state.mondayDDBB = monday;
        }
        if (tuesday != null) {
          this.state.tuesdayDDBB = tuesday;
        }
        if (wednesday != null) {
          this.state.wednesdayDDBB = wednesday;
        }
        if (thursday != null) {
          this.state.thursdayDDB = thursday;
        }
        if (friday != null) {
          this.state.fridayDDBB = friday;
        }

      } else {
        console.error('Error quering timetable');
      }
    }).catch(err => {
      console.error('ERROR server' + err);
    });

    return {
      monday: this.state.mondayDDBB,
      tuesday: this.state.tuesdayDDBB,
      wednesday: this.state.wednesdayDDBB,
      thursday: this.state.thursdayDDB,
      friday: this.state.fridayDDBB
    }
  }

  handleChange = async (time, day) => {
    if (time == null) return;
    const filteredTime = await String(time).match(/\d{2}:\d{2}/g)[0];
    switch (day) {
      case "mondayFrom":
        this.state.monday.myDateFrom = time;
        this.state.monday.from = filteredTime;
        return this.state.monday;
      case "mondayTo":
        this.state.monday.myDateTo = time;
        this.state.monday.to = filteredTime;
        return this.state.monday;
      case "tuesdayFrom":
        this.state.tuesday.myDateFrom = time;
        this.state.tuesday.from = filteredTime;
        return this.state.tuesday;
      case "tuesdayTo":
        this.state.tuesday.myDateTo = time;
        this.state.tuesday.to = filteredTime;
        return this.state.tuesday;
      case "wednesdayFrom":
        this.state.wednesday.myDateFrom = time;
        this.state.wednesday.from = filteredTime;
        return this.state.wednesday;
      case "wednesdayTo":
        this.state.wednesday.myDateTo = time;
        this.state.wednesday.to = filteredTime;
        return this.state.wednesday;
      case "thursdayFrom":
        this.state.thursday.myDateFrom = time;
        this.state.thursday.from = filteredTime;
        return this.state.thursday;
      case "thursdayTo":
        this.state.thursday.myDateTo = time;
        this.state.thursday.to = filteredTime;
        return this.state.thursday;
      case "fridayFrom":
        this.state.friday.myDateFrom = time;
        this.state.friday.from = filteredTime;
        return this.state.friday;
      case "fridayTo":
        this.state.friday.myDateTo = time;
        this.state.friday.to = filteredTime;
        return this.state.friday;

      default:
        break;
    }
  };

  async addPeriod(day) {
    const week = {
      id: this.state.tableId,
      professionalId: this.state.userId,
      monday: this.state.mondayDDBB,
      tuesday: this.state.tuesdayDDBB,
      wednesday: this.state.wednesdayDDBB,
      thursday: this.state.thursdayDDB,
      friday: this.state.fridayDDBB
    }

    switch (day) {
      case 'monday':
        console.log(this.state.monday.from + " " + this.state.monday.to);
        if (this.state.monday.from && this.state.monday.to) {
          week.monday = this.state.monday.from + "-" + this.state.monday.to;
          this.updateTimetable(week);
        }
        break;
      case 'tuesday':
        if (this.state.tuesday.from && this.state.tuesday.to) {
          week.tuesday = this.state.tuesday.from + "-" + this.state.tuesday.to;
          this.updateTimetable(week);
        }
        break;
      case 'wednesday':
        if (this.state.wednesday.from && this.state.wednesday.to) {
          week.wednesday = this.state.wednesday.from + "-" + this.state.wednesday.to;
          this.updateTimetable(week);
        }
        break;
      case 'thursday':
        if (this.state.thursday.from && this.state.thursday.to) {
          week.thursday = this.state.thursday.from + "-" + this.state.thursday.to;
          this.updateTimetable(week);
        }
        break;
      case 'friday':
        if (this.state.friday.from && this.state.friday.to) {
          week.friday = this.state.friday.from + "-" + this.state.friday.to;
          this.updateTimetable(week);
        }
        break;

      default:
        break;
    }

  }

  async emptyPeriod(day) {
    let aux;
    const week = {
      id: this.state.tableId,
      professionalId: this.state.userId,
      monday: this.state.mondayDDBB,
      tuesday: this.state.tuesdayDDBB,
      wednesday: this.state.wednesdayDDBB,
      thursday: this.state.thursdayDDB,
      friday: this.state.fridayDDBB
    }

    switch (day) {
      case 'monday':
        aux = await this.showConfirmNotification('Lunes');
        if (aux.isConfirmed) {
          //vaciamos el día
          week.monday = "";
          this.updateTimetable(week);
        }
        break;
      case 'tuesday':
        aux = await this.showConfirmNotification('Martes');
        if (aux.isConfirmed) {
          //vaciamos el día
          week.tuesday = "";
          this.updateTimetable(week);
        }
        break;
      case 'wednesday':
        aux = await this.showConfirmNotification('Miércoles');
        if (aux.isConfirmed) {
          //vaciamos el día
          week.wednesday = "";
          this.updateTimetable(week);
        }
        break;
      case 'thursday':
        aux = await this.showConfirmNotification('Jueves');
        if (aux.isConfirmed) {
          //vaciamos el día
          week.thursday = "";
          this.updateTimetable(week);
        }
        break;
      case 'friday':
        aux = await this.showConfirmNotification('Viernes');
        if (aux.isConfirmed) {
          //vaciamos el día
          week.friday = "";
          this.updateTimetable(week);
        }
        break;

      default:
        break;
    }
  }

  async showConfirmNotification(day) {
    let aux = null;
    await Swal.fire({
      title: `Vaciar ${day}`,
      text: "¿Desea vaciar el día?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Confirmar'
    }).then(async (res) => {
      if (res.isConfirmed) {
        await Swal.fire(
          'Eliminado!',
          'Se ha vaciado el día.',
          'success'
        );
      }
      aux = res;
    });
    return aux;
  }

  async updateTimetable(week) {
    let updated = false;
    if (week.id === null) {
      console.log(week.id);
      await TimetableService.create(week).then((res) => {
        this.state.myUser.timetableId = res.data.id;
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        console.log(this.state.myUser);
        ProfessionalService.update(this.state.myUser).then(() => {
          Swal.fire({
            toast: true,
            title: "Horario actualizado",
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          updated = true;
        }).catch((error) => console.error("error creating timetable " + error));
      }).catch((error) => console.error("error creating timetable " + error))
    } else {
      await TimetableService.update(week).then((res) => {
        if (res.data.success === true) {
          //this.setState({ reloadTable: true })
          Swal.fire({
            toast: true,
            title: "Horario actualizado",
            position: 'top-end',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          updated = true;
        }
      }).catch((error) => console.error("error actualizando timetable " + error));
    }
    return updated;
  }

}

export default new timetableController();