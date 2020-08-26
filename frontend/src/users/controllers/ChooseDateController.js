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
import React from 'react';

class ChooseDateController {
  constructor() {
    this.totalDaysToCheck = 62; // Two months
  }

  getConfirmedDatesFromDB = async (date, teacher) => {
    if (date != null) {
      const myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      const info = await DateService.getDates({ day: myDate, id: teacher });

      if (info.data.data != null) {
        const datesArray = info.data.data;
        const myConfirmedDates = datesArray.map(each => this.getDateTimeFromStringWithTime(each.time));
        return myConfirmedDates;
      } else {
        return null;
      }
    }
  };

  getDateTimeFromStringWithTime = (time) => {
    let dateWithHours = null;
    let dateWithHoursAndMinutes = null;
    const [hour, minutes] = time.split(':');

    if (hour != null && minutes != null) {
      dateWithHours = new Date(new Date().setHours(hour));
      dateWithHoursAndMinutes = new Date(new Date(dateWithHours).setMinutes(minutes));
    }
    return dateWithHoursAndMinutes;
  };

  generateExcludedCalendar = (excludedDates) => {
    if (excludedDates.length === 0) return null;

    const myExcludedCalendar = [];
    const today = new Date();

    console.log(this.totalDaysToCheck);

    for (let index = 0; index < this.totalDaysToCheck; index++) {
      if (excludedDates.includes(today.getDay())) {
        myExcludedCalendar.push(today.getTime());
      }
      const tomorrow = today.getDate() + 1;
      today.setDate(tomorrow);
    }

    return myExcludedCalendar;
  };

  getWorkingHoursFromTimetable = (date, myTimetable) => {
    if (date != null && myTimetable !== '' && myTimetable != null) {
      switch (date.getDay()) {
        case 1:
          if (myTimetable.monday !== null && myTimetable.monday !== '') {
            const hours = myTimetable.monday.split('-');
            if (hours.length === 2) return hours;
          }
          break;

        case 2:
          if (myTimetable.tuesday !== null && myTimetable.tuesday !== '') {
            const hours = myTimetable.tuesday.split('-');
            if (hours.length === 2) return hours;
          }
          break;

        case 3:
          if (myTimetable.wednesday !== null && myTimetable.wednesday !== '') {
            const hours = myTimetable.wednesday.split('-');
            if (hours.length === 2) return hours;
          }
          break;

        case 4:
          if (myTimetable.thursday !== null && myTimetable.thursday !== '') {
            const hours = myTimetable.thursday.split('-');
            if (hours.length === 2) return hours;
          }
          break;

        case 5:
          if (myTimetable.friday !== null && myTimetable.friday !== '') {
            const hours = myTimetable.friday.split('-');
            if (hours.length === 2) return hours;
          }
          break;

        default:
          break;
      }
    };
  }

  getFreeDays = (myTimetable) => {
    const myArray = [0, 6]; // Hide weekends
    if (myTimetable !== '' && myTimetable != null) {
      if (myTimetable.monday == null || myTimetable.monday === '') {
        myArray.push(1);
      }
      if (myTimetable.tuesday == null || myTimetable.tuesday === '') {
        myArray.push(2);
      }
      if (myTimetable.wednesday == null || myTimetable.wednesday === '') {
        myArray.push(3);
      }
      if (myTimetable.thursday == null || myTimetable.thursday === '') {
        myArray.push(4);
      }
      if (myTimetable.friday == null || myTimetable.friday === '') {
        myArray.push(5);
      }

      return myArray;
    } else {
      return null;
    }
  };

  addMonths = (dt, n) => new Date(dt.setMonth(dt.getMonth() + n));
}

export default new ChooseDateController();
