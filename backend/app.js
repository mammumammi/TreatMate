var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const PORT = process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctors');
var patientRouter = require('./routes/patients');
var appointmentRouter = require('./routes/appointments');

var app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001'
};
  
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/doctors',doctorRouter);
app.use('/api/patients',patientRouter);
app.use('/api/appointments',appointmentRouter);

   // Health check endpoint for deployment platforms
   app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'TreatMate Backend'
    });
  });

module.exports = app;
