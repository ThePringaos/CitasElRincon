const express = require('express');
const app = express();

// process.env.PORT -> enviroment variable hosted in our pc
app.set('PORT', process.env.PORT || 8000);

// This limit is for the profile pictures
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Configure headers and cors
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

app.listen(app.get('PORT'), 'localhost', () => {
  console.log(`SERVER IN PORT ${app.get('PORT')}`);
});
