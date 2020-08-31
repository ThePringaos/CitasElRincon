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

import DateService from '../../services/date.service';
import SendEmailService from '../../services/sendEmail.service';

class ChooseDateController {
  constructor () {
    this.reservedDateId = 2;
  }

  async saveDateOnDB (confirmHasAlreadyBeenPressed, values) {
    if (confirmHasAlreadyBeenPressed === false) {
      const { department, teacher, email, confirmEmail, date, time, dateTypeId } = values;
      if (department && teacher && email && confirmEmail && date && time && dateTypeId) {
        const myDate = this.getMyDate(date);
        const myTime = this.getMyTime(time);
        return await this.addDateToDB(teacher, email, myDate, myTime, dateTypeId);
      }
    }
  }

  getMyDate (date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  }

  getMyTime (time) {
    const regexTime = /(2[0-3]|[01]?[0-9]):([0-5]?[0-9])/m;
    const myTime = (regexTime.exec(time))[0];
    return myTime;
  }

  async addDateToDB (teacher, email, myDate, myTime, dateTypeId) {
    const res = await DateService.add({
      professionalId: teacher,
      email,
      date: myDate,
      time: myTime,
      dateTypeId,
      dateStateId: this.reservedDateId
    });

    if (res.data.success === true) {
      return await this.sendEmailToClient(email, myDate, myTime, res);
    } else {
      console.error('ERROR ADDING DATE TO DB [Confirm] ');
    }
  }

  async sendEmailToClient (email, myDate, myTime, myRes) {
    const result = await SendEmailService.sendEmail({
      email,
      date: myDate,
      time: myTime,
      id: myRes.data.id
    }).catch((err) => { console.error('SENDING EMAIL ERROR', err); });

    return result;
  }
}

export default new ChooseDateController();
