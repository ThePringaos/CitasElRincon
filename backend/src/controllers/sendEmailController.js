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
const dateController = require('./dateController');
const controller = 'sendEmailController';
const CryptoJS = require('crypto-js');

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: ''
  }
});

const sendMessage = async (email, date, time, dateId) => {
  var ciphertext = CryptoJS.AES.encrypt(dateId.toString(), 'ieselrincon@xd.es');

  // Message object
  const message = {
    from: '',
    to: email,
    subject: `CONFIRMAR CITA Ies El Rincón ✔ ${time} - ${date}`,
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
  });
};

const sendEmailController = {};

sendEmailController.sendEmail = async (req, res) => {
  const { email, date, time, id } = req.body;
  sendMessage(email, date, time, id).then((aux) => {
    if (aux === 1) {
      res.json({ success: true, message: 'Successfully sended' });
    } else {
      res.status(400).json({ status: `The ${controller} couldn't send the email` });
    }
  });
};

sendEmailController.confirm = (req, res) => {
  let { id } = req.body;
  var bytes = CryptoJS.AES.decrypt(id, 'ieselrincon@xd.es');
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  id = plaintext;

  const confirmedDateValue = 1;
  const data = dateController.modifyDateState(id, confirmedDateValue);
  if (data) {
    if (data[0] === 1) {
      res.json({ success: true, message: 'Succesfully deleted' });
    } else {
      res.status(400).json({ status: `The ${controller} couldn't be confirmed` });
    }
  } else {
    console.error('ERROR WITH MODIFY DATE STATE');
  }
};

module.exports = sendEmailController;
