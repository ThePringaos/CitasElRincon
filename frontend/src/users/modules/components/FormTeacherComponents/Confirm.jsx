import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';
import BtnGoBack from '../buttons/forms/BtnGoBack';
import BtnSubmit from '../buttons/forms/BtnSubmit';
import DateService from '../../../../services/date.service';
import SendEmailService from '../../../../services/sendEmail.service';

const Confirm = ({ prevStep, values }) => {
<<<<<<< HEAD
  const [confirmHasAlreadyBeenPressed, setConfirmHasAlreadyBeenPressed] = useState(false);

=======
>>>>>>> parent of e515816... Working on sending confirm email
  const saveDateOnDB = async () => {
    const { department, teacher, email, confirmEmail, date, time, dateTypeId } = values;
    if (department && teacher && email && confirmEmail && date && time && dateTypeId) {
      const myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      const regexTime = /(2[0-3]|[01]?[0-9]):([0-5]?[0-9])/m;
      const myTime = (regexTime.exec(time))[0];

      const res = await DateService.add({
        professionalId: teacher,
        email,
        date: myDate,
        time: myTime,
        dateTypeId,
        dateStateId: 2 // This means reserved date
      });

      if (res.data.success === true) {
        console.log('PETICION CORRECTA');
        console.log(res.data);

        const result = SendEmailService.sendEmail({
          professionalId: teacher,
          email,
          date: myDate,
          time: myTime,
          id: res.data.id
        });
<<<<<<< HEAD

        if (res.data.success === true) {
          console.log('PETICION CORRECTA');
          console.log(res.data.id);

          let result = null;

          SendEmailService.sendEmail({
            email,
            date: myDate,
            time: myTime,
            id: res.data.id
          }).then((res) => {
            result = res;
            console.log('THEN ', result);
          }).catch((err) => { console.log('SEND EMAIL ERROR', err); });
          console.log('RESULT', result);
          if (result.success) {
            setConfirmHasAlreadyBeenPressed(true);
          }
        } else {
          console.log('HA HABIDO UN ERROR');
          console.log(res.data);
        }
=======
        console.log(result);
      } else {
        console.log('HA HABIDO UN ERROR');
        console.log(res.data);
>>>>>>> parent of e515816... Working on sending confirm email
      }
    }
  };

  return (
    <>
      <Form.Row>
        <Col className='d-flex justify-content-center mt-2'>
          <BtnGoBack
            content='Volver'
            prevStep={prevStep}
            className='mx-1'
          />
          <BtnSubmit
            content='Confirmar solicitud'
            onClick={saveDateOnDB}
          />
        </Col>
      </Form.Row>
    </>
  );
};

export default Confirm;
