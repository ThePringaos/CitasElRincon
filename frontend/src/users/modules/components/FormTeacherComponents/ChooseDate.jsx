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
  const [times, setTimes] = useState([]);
  const [excludedDates, setExcludedDates] = useState([]);
  const [excludedCalendar, setExcludedCalendar] = useState([]);

  useEffect(() => {
    (date && time && dateTypeId) ? setIsUndefined('') : setIsUndefined('disabled');
    getTeachersFromDB();
  }, [date, time, dateTypeId]);

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
    console.log('Excluded Dates: ', excludedDates);
    generateExcludedCalendar();
  }, [excludedDates]);

  useEffect(() => {
    console.log('Excluded Calendar: ', excludedCalendar);
  }, [excludedCalendar]);

  const getTeachersFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.get(teacher));
    }).then((res) => {
      if (res.data != null) {
        if (res.data.data != null) {
          if (res.data.data.length > 0) {
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
        console.log('Today ', today);
        const count = myExcludedCalendar.push(today.getTime());
        console.log('count ', count);
        console.log('myExcludedCalendar ', myExcludedCalendar);
      }
      const tomorrow = today.getDate() + 1;
      today.setDate(tomorrow);
    }
    setExcludedCalendar(myExcludedCalendar);
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
            <Form.Control
              as='select'
              className='form-control'
              value={time}
              name='department'
              id='department'
              onChange={handleInputChange}
            >
              <option value='0'>Todos</option>
              {times.map(d => (
                <option
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </option>
              ))}
            </Form.Control>
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
