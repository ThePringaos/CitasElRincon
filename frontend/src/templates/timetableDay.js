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
import MyPicker from '../components/myTimePicker';

class timetableDayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='row my-3'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='container'>
                <div className='row'>
                  <div className='col-sm-12 col-md-3 d-flex justify-content-center'>
                    <h3 className='my-auto' >{this.props.dayName}</h3>
                  </div>
                  <div className='col-sm-12 col-md-3 d-md-flex justify-content-center mb-sm-4'>
                    <label className='my-md-auto my-sm-2 d-sm-block'>Desde </label>
                    <div className='w-10 my-md-auto my-sm-2'>
                      <MyPicker
                        myDate={this.props.day.myDateFrom}
                        handleChange={this.props.handleChangeFrom}
                        myInterval={this.props.myInterval}
                      />
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-3 d-md-flex justify-content-center mb-sm-2'>
                    <label className='my-lg-auto my-sm-2 d-sm-block'>Hasta </label>
                    <div className='w-10 my-lg-auto my-sm-2'>
                      <MyPicker
                        myDate={this.props.day.myDateTo}
                        handleChange={this.props.handleChangeTo}
                        myInterval={this.props.myInterval}
                      />
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-3 d-flex justify-content-center'>
                    <button
                      type='button' class='btn btn-primary m-1'
                      onClick={this.props.onClickAddPeriod}
                    >Añadir
                    </button>
                    <button
                      type='button' class='btn btn-danger m-1'
                      onClick={this.props.onClickEmptyPeriod}
                    >Vaciar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default timetableDayComponent;
