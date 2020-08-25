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

const nodemailer = require('nodemailer');
<<<<<<< HEAD
const dateController = require('./dateController');
const controller = 'sendEmailController';
<<<<<<< Updated upstream
=======
const CryptoJS = require('crypto-js');
=======
>>>>>>> parent of e515816... Working on sending confirm email
>>>>>>> Stashed changes

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: '',
    pass: ''
  }
});

const sendMessage = (email, date, time, dateId) => {
  // Message object
  const message = {
    from: 'IES EL RINCON',
    to: email,
    subject: `CONFIRMAR CITA Ies El Rincón ✔ ${time} - ${date}`,
<<<<<<< Updated upstream
    html: `<a href='http://localhost:8000/confirm-email/${dateId}'>Pulse Aquí para confirmar la cita</a>`
  };

=======
<<<<<<< HEAD
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
      <form action="http://localhost:8000/confirm-email" method="post">
          <input type="hidden" name="id" value=${ciphertext}/>
          <button type="submit" class="btn btn-primary">Submit</button>
      </form>  
      </body>
    </html>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error('Error occurred. ' + err.message);
      } else {
        resolve(1);
      }
    });
=======
    html: "<a href='http://localhost:8000/confirm-email/'>Pulse Aquí para confirmar la cita</a>"
  };

>>>>>>> Stashed changes
  transporter.sendMail(message, (err, info) => {
    console.log('SENDING EMAIL');
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    } else {
      console.log('NO ERRORS WITH EMAIL');
<<<<<<< Updated upstream
      return 1;
    }
=======
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
>>>>>>> parent of e515816... Working on sending confirm email
>>>>>>> Stashed changes
  });
};

const sendEmailController = {};

<<<<<<< Updated upstream
sendEmailController.sendEmail = (req, res) => {
=======
<<<<<<< HEAD
sendEmailController.sendEmail = async (req, res) => {
>>>>>>> Stashed changes
  const { email, date, time, id } = req.body;
  const aux = sendMessage(email, date, time, id);
  if (aux === 1) {
    res.json({ success: true, message: 'Successfully sended' });
  } else {
    res.status(400).json({ status: `The ${controller} couldn't send the email` });
  }
};

sendEmailController.confirm = (req, res) => {
  const { id } = req.params;
  console.log('RECIEVED DATEID ', id);
  const confirmedDateValue = 1;
  const data = dateController.modifyDateState(id, confirmedDateValue);
  console.log('CONFIRM-SEND EMAIL CONTROLLER');
  if (data) {
    if (data[0] === 1) {
      res.json({ success: true, message: 'Succesfully deleted' });
    } else {
      res.status(400).json({ status: `The ${controller} couldn't be confirmed` });
    }
  } else {
    console.error('ERROR WITH MODIFY DATE STATE');
  }
=======
sendEmailController.sendEmail = (req, res) => {
  const { email, date, time, dateId } = req.body;
  sendMessage(email, date, time, dateId);
};

sendEmailController.confirm = (req, res) => {
  console.log('CONFIRM-SEND EMAIL CONTROLLER');
>>>>>>> parent of e515816... Working on sending confirm email
};

module.exports = sendEmailController;
