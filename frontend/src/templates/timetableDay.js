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
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='row my-3'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12 col-lg-2 d-flex justify-content-center p-0'>
                    <h4 className='my-auto'>{this.props.dayName}</h4>
                  </div>
                  <div className='col-md-12 col-lg-4 d-md-flex justify-content-center p-0 my-auto'>
                    <label className='my-md-auto my-md-2 d-md-block mr-1'>Desde</label>
                    <div className='w-10 my-md-auto my-md-2'>
                      <MyPicker
                        myDate={this.props.day.myDateFrom}
                        onHandleChange={this.props.handleChangeFrom}
                        myInterval={this.props.myInterval}
                      />
                    </div>
                  </div>
                  <div className='col-md-12 col-lg-4 d-md-flex justify-content-center p-0 my-auto'>
                    <label className='my-lg-auto my-md-2 d-md-block mr-1'>Hasta</label>
                    <div className='w-10 my-lg-auto my-md-2'>
                      <MyPicker
                        myDate={this.props.day.myDateTo}
                        onHandleChange={this.props.handleChangeTo}
                        myInterval={this.props.myInterval}
                      />
                    </div>
                  </div>
                  <div className='col-md-12 col-lg-2 d-flex justify-content-center p-0  mt-2 mt-md-0'>
                    <button
                      type='button' class='btn btn-primary btn-sm m-1 px-1'
                      onClick={this.props.onClickAddPeriod}
                    >Añadir
                    </button>
                    <button
                      type='button' class='btn btn-danger btn-sm m-1 px-1'
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
