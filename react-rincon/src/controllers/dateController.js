import DateService from '../services/date.service';
import React, { Component } from 'react';

class DateController {
  constructor () {
    this.state = {
    };

    // We add addDays to DATE
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  }

  async showTodayDates (daysToQuery, id) {
    const myDates = [];

    let aux = daysToQuery;
    if (aux.length == 0) {
      aux = [this.filterDate(new Date())];
    }

    async function asyncForEach (array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    await asyncForEach(aux, async (each) => {
      await DateService.getDates({ id: id, day: each })
        .then(res => {
          if (res.data.success) {
            const data = res.data.data[0];
            myDates.push({ dates: data });
          } else {
            console.error('Error loading dates service');
          }
        })
        .catch(err => {
          console.error('ERROR server' + err);
        });
    });
    console.log(myDates);
    return myDates;
  }

  filterDate (day) {
    return day.getFullYear() + '/' + (day.getMonth() + 1) + '/' + day.getDate();
  }

  getDaysToQuery (startDate, endDate) {
    const days = [];
    let eachDay = new Date(startDate.getTime());
    let i = 1;
    const finalDay = new Date(endDate.getTime()).addDays(1);
    while (eachDay.getTime() <= finalDay) {
      days.push(this.filterDate(eachDay));
      eachDay = new Date(startDate.getTime()).addDays(i);
      i++;
    }
    console.log(days);
    return days;
  }

  loadFillData (dates) {
    return Array.from(dates).map(each => {
      if (each.dates) {
        return (
          <tr>
            <td>{each.dates.date}</td>
            <td>{each.dates.time}</td>
            <td>{each.dates.email}</td>
            <td>{each.dates.dateType.name}</td>
          </tr>
        );
      }
    });
  }
}

export default new DateController();
