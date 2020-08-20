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
    html: "<a href='http://localhost:8000/confirm-email/'>Pulse Aquí para confirmar la cita</a>"
  };

  transporter.sendMail(message, (err, info) => {
    console.log('SENDING EMAIL');
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    } else {
      console.log('NO ERRORS WITH EMAIL');
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

const sendEmailController = {};

sendEmailController.sendEmail = (req, res) => {
  const { email, date, time, dateId } = req.body;
  sendMessage(email, date, time, dateId);
};

sendEmailController.confirm = (req, res) => {
  console.log('CONFIRM-SEND EMAIL CONTROLLER');
};

module.exports = sendEmailController;
