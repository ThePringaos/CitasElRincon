import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnGoOn from '../buttons/forms/BtnGoOn';
import ProfessionalService from '../../../../services/professional.service';
import DateService from '../../../../services/date.service';
import DateTypeService from '../../../../services/dateType.service';
import DatePicker from 'react-datepicker';
import ChooseDateController from '../../../controllers/ChooseDateController';

const ChooseDate = ({ values, handleInputChange, nextStep, prevStep }) => {
  const { teacher, date, time, dateTypeId } = values;
  const [isUndefined, setIsUndefined] = useState('disabled');
  const [myTimetable, setMyTimetable] = useState('');
  const [excludedDates, setExcludedDates] = useState([]);
  const [excludedCalendar, setExcludedCalendar] = useState([]);
  const [startingTime, setStartingTime] = useState(0);
  const [endingTime, setEndingTime] = useState(0);
  const [confirmedDates, setConfirmedDates] = useState([]);
  const [dateTypesSelect, setDateTypesSelect] = useState([]);

  const monthLimit = 2;
  const dateTimeInterval = 15;

  useEffect(() => {
    (date && time && dateTypeId) ? setIsUndefined('') : setIsUndefined('disabled');

    getTeachersFromDB();
    getDateTypesFromDB();
  }, [date, time, dateTypeId]);

  useEffect(() => {
    const hours = ChooseDateController.getWorkingHoursFromTimetable(date, myTimetable);
    if (hours != null) generatePeriods(hours[0], hours[1]);

    setConfirmedDates(ChooseDateController.getConfirmedDatesFromDB(date, teacher));
  }, [date]);

  useEffect(() => {
    const days = ChooseDateController.getFreeDays(myTimetable);
    if (days) {
      if (days.length > 2) setExcludedDates(days);
    }
  }, [myTimetable]);

  useEffect(() => {
    setExcludedCalendar(ChooseDateController.generateExcludedCalendar(excludedDates));
  }, [excludedDates]);


  // POR AKI 
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

  const generatePeriods = (startingHour, endingHour) => {
    const startingHourWithDateFormat = ChooseDateController.getDateTimeFromStringWithTime(startingHour);
    const endingHourWithDateFormat = ChooseDateController.getDateTimeFromStringWithTime(endingHour);
    setStartingTime(startingHourWithDateFormat);
    setEndingTime(endingHourWithDateFormat);
  };

  const getDateTypesFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(DateTypeService.getAll());
    }).then((res) => {
      if (res.data.data != null) setDateTypesSelect(res.data.data);
    }).catch(err => console.error('Falló la consulta getDateTypesFromDB ', err));
  };

  return (
    <>
      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label htmlFor='date' className='m-0'> Fecha </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <DatePicker
              dateFormat='dd/MM/yyyy'
              selected={date}
              withPortal
              minDate={new Date()}
              maxDate={ChooseDateController.addMonths(new Date(), monthLimit)}
              excludeDates={excludedCalendar}
              onChange={async (value) => { handleInputChange(value, 'date'); }}
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label htmlFor='date' className='m-0'> Hora </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <DatePicker
              selected={time}
              onChange={date => {
                if (date <= endingTime && date >= startingTime) handleInputChange(date, 'time');
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={dateTimeInterval}
              timeCaption='Hora'
              minTime={startingTime}
              maxTime={endingTime}
              excludeTimes={confirmedDates}
              dateFormat='HH:mm'
              timeFormat='HH:mm'
              disabled={(date == null)}
              disabledKeyboardNavigation
            />
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label htmlFor='date' className='m-0'> Atención </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <Form.Control
              as='select'
              className='form-control'
              value={dateTypeId}
              name='dateTypeId'
              id='dateTypeId'
              onChange={handleInputChange}
            >
              <option value='0' hidden='true'> Seleccionar opción </option>
              {dateTypesSelect.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Col className='d-flex justify-content-center mt-2'>
          <BtnGoBack content='volver' prevStep={prevStep} />

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
