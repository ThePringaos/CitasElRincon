import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnGoOn from '../buttons/forms/BtnGoOn';
import ProfessionalService from '../../../../services/professional.service';
import DatePicker from 'react-datepicker';

const ChooseDate = ({ values, handleInputChange, nextStep, prevStep }) => {
  const { teacher, date, time, dateTypeId } = values;
  const [isUndefined, setIsUndefined] = useState('disabled');
  const [myTimetable, setMyTimetable] = useState('');
  const [excludedDates, setExcludedDates] = useState([]);
  const [excludedCalendar, setExcludedCalendar] = useState([]);
  const [startingTime, setStartingTime] = useState(0);
  const [endingTime, setEndingTime] = useState(0);
  const [confirmedDates, setConfirmedDates] = useState([]);

  useEffect(() => {
    (date && time && dateTypeId) ? setIsUndefined('') : setIsUndefined('disabled');
    getTeachersFromDB();
  }, [date, time, dateTypeId]);

  useEffect(() => {
    if (date != null && myTimetable !== '' && myTimetable != null) {
      switch (date.getDay()) {
        case 1:
          if (myTimetable.monday !== null && myTimetable.monday !== '') {
            const hours = myTimetable.monday.split('-');
            if (hours.length === 2) generatePeriods(hours[0], hours[1]);
          }

          break;
        case 2:

          break;
        case 3:
          if (myTimetable.wednesday !== null && myTimetable.wednesday !== '') {
            const hours = myTimetable.wednesday.split('-');
            if (hours.length === 2) generatePeriods(hours[0], hours[1]);
          }

          break;
        case 4:

          break;
        case 5:

          break;

        default:
          break;
      }

      getConfirmedDatesFromDB();
    }
  }, [date]);

  useEffect(() => {
    const myArray = [0, 6]; // Hide weekends
    console.log('TIMETABLE', JSON.stringify(myTimetable));
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
      setExcludedDates(myArray);
    }
  }, [myTimetable]);

  useEffect(() => {
    // console.log('Excluded Dates: ', excludedDates);
    generateExcludedCalendar();
  }, [excludedDates]);

  useEffect(() => {
    // console.log('Excluded Calendar: ', excludedCalendar);
  }, [excludedCalendar]);

  const getTeachersFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.get(teacher));
    }).then((res) => {
      if (res.data != null) {
        if (res.data.data != null) {
          if (res.data.data.length > 0) {
            console.log(res.data.data[0]);
            const { timetable } = res.data.data[0];
            if (timetable != null) {
              setMyTimetable(timetable);
            }
          }
        }
      }
    }).catch(err => console.error('Falló la consulta getTeachersFromDB', err));
  };

  const addMonths = (dt, n) => new Date(dt.setMonth(dt.getMonth() + n));

  const generateExcludedCalendar = () => {
    if (excludedDates.length === 0) return;
    const myExcludedCalendar = [];
    const today = new Date();
    for (let index = 0; index < 62; index++) {
      if (excludedDates.includes(today.getDay())) {
        myExcludedCalendar.push(today.getTime());
      }
      const tomorrow = today.getDate() + 1;
      today.setDate(tomorrow);
    }
    setExcludedCalendar(myExcludedCalendar);
  };

  const generatePeriods = (startingHour, endingHour) => {
    const startingHourWithDateFormat = getDateFromStringWithTime(startingHour);
    const endingHourWithDateFormat = getDateFromStringWithTime(endingHour);
    setStartingTime(startingHourWithDateFormat);
    setEndingTime(endingHourWithDateFormat);
  };

  const getDateFromStringWithTime = (time) => {
    let dateWithHours = null;
    let dateWithHoursAndMinutes = null;
    const [hour, minutes] = time.split(':');

    if (hour != null && minutes != null) {
      dateWithHours = new Date(new Date().setHours(hour));
      dateWithHoursAndMinutes = new Date(new Date(dateWithHours).setMinutes(minutes));
    }
    return dateWithHoursAndMinutes;
  };

  // STABAMO AKI LOKO
  const getConfirmedDatesFromDB = () => {
    if (date != null) {
      const myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      console.log(date);
      console.log(myDate, teacher);
    }
  };

  return (
    <>
      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label
              htmlFor='date'
              className='m-0'
            >
              Fecha
            </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <DatePicker
              dateFormat='dd/MM/yyyy'
              selected={date}
              withPortal
              minDate={new Date()}
              maxDate={addMonths(new Date(), 2)}
              excludeDates={excludedCalendar}
              onChange={async (value) => {
                // const filteredTime = (value.getFullYear() + '/' + value.getMonth() + '/' + value.getDate());
                handleInputChange(value, 'date');
              }}
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label
              htmlFor='date'
              className='m-0'
            >
              Hora
            </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <DatePicker
              selected={time}
              onChange={date => {
                if (date <= endingTime && date >= startingTime) {
                  console.log('HORA PERMITIDA');
                  handleInputChange(date, 'time');
                } else {
                  console.log('HORA NO PERMITIDA');
                  // INTENTAR BLOQUEAR TECLADO PARA ESTE INPUT
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption='Hora'
              minTime={startingTime}
              maxTime={endingTime}
              excludeTimes={confirmedDates}
              dateFormat='h:mm aa'
              disabled={(date == null)}
              disabledKeyboardNavigation
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label
              htmlFor='date'
              className='m-0'
            >
              Atención
            </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <Form.Control
              placeholder='DateTypeId'
              name='dateTypeId'
              onChange={handleInputChange}
              value={dateTypeId}
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Col className='d-flex justify-content-center mt-2'>
          <BtnGoBack
            content='volver'
            prevStep={prevStep}
          />

          <BtnGoOn
            content='siguiente'
            nextStep={nextStep}
            isUndefined={isUndefined}
          />
        </Col>
      </Form.Row>
    </>
  );
};

export default ChooseDate;
