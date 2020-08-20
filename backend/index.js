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

const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express');

// process.env.PORT -> enviroment variable hosted in our pc
app.set('PORT', process.env.PORT || 8000);

// This limit is for the profile pictures
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb' }));

// Configure headers and cors
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// routes
app.use(require('./src/routes/imageRoutes'));
app.use(require('./src/routes/departmentRoutes'));
app.use(require('./src/routes/roleRoutes'));
app.use(require('./src/routes/dateStateRoutes'));
app.use(require('./src/routes/dateTypeRoutes'));
app.use(require('./src/routes/professionalRoutes'));
app.use(require('./src/routes/timetableRoutes'));
app.use(require('./src/routes/dateRoutes'));
app.use(require('./src/routes/tutorRoutes'));
app.use(require('./src/routes/sendEmailRoutes'));

const options = {
  swaggerOptions: {
    supportedSubmitMethods: []
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./docs/build.json'), options));

app.listen(app.get('PORT'), '127.0.0.1', () => {
  console.log(`SERVER IN PORT ${app.get('PORT')}`);
});
