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

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Redirect } from 'react-router-dom';
import DateController from '../controllers/dateController';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Nav from '../components/nav';

class homeComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null,
      dates: [],
      id: sessionStorage.getItem('userId'),
      email: sessionStorage.getItem('userEmail'),
      startDate: new Date(),
      endDate: new Date(),
      daysToQuery: []
    };
  }

  componentDidMount () {
    this.isUserRegistered();
    this.showTodayDates();
  }

  isUserRegistered () {
    if (sessionStorage.getItem('isUserRegistered') === 'false') {
      this.setState({ redirect: '/crear-perfil' });
    }
  }

  async showTodayDates () {
    const myDates = await DateController.showTodayDates(this.state.daysToQuery, this.state.id);
    this.setState({ dates: myDates });
  }

  async setStartDate (date) {
    await this.setState({ startDate: date });
    this.setState({ daysToQuery: DateController.getDaysToQuery(this.state.startDate, this.state.endDate) });
    this.showTodayDates();
  }

  async setEndDate (date) {
    await this.setState({ endDate: date });
    this.setState({ daysToQuery: DateController.getDaysToQuery(this.state.startDate, this.state.endDate) });
    this.showTodayDates();
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Nav />
        <div className='container p-4'>
          <div className='row'>
            <div className='col-sm-12 col-md-4 offset-md-8 float-right mb-sm-2'>
              <table className='table table-hover table-borderless table-sm'>
                <tbody>
                  <tr className='table-info'>
                    <td><strong>Desde: </strong></td>
                    <td>
                      <DatePicker
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.startDate}
                        onChange={date => this.setStartDate(date)}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={new Date()}
                      />
                    </td>
                  </tr>
                  <tr className='table-info'>
                    <td><strong>Hasta: </strong></td>
                    <td>
                      <DatePicker
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.endDate}
                        onChange={date => this.setEndDate(date)}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='row mx-1 table-responsive-sm'>
            <h2 className='mb-3'>Próximas citas</h2>
            <table className='table table-bordered table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Hora</th>
                  <th scope='col'>Correo</th>
                  <th scope='col'>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {DateController.loadFillData(this.state.dates)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default homeComponent;
