import React from 'react';
import MyPicker from '../components/myTimePicker';

class timetableDayComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='row my-3'>
        <div className='col-lg-12'>
          <div className='card'>
            <div className='card-body'>
              <div class='container'>
                <div class='row'>
                  <div class='col-sm'>
                    <h3>{this.props.dayName}</h3>
                  </div>
                  <div class='col-sm'>
                    <label className='float-left'>Desde </label>
                    <div className='w-10'>
                      <MyPicker
                        myDate={this.props.day.myDateFrom}
                        handleChange={this.props.handleChangeFrom}
                        myInterval={this.props.myInterval}
                      />
                    </div>
                  </div>
                  <div class='col-sm'>
                    <label className='float-left'>Hasta </label>
                    <MyPicker
                      myDate={this.props.day.myDateTo}
                      handleChange={this.props.handleChangeTo}
                      myInterval={this.props.myInterval}
                    />
                  </div>
                  <div class='col-sm'>
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
