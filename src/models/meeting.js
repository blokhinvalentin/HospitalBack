const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
  patientName: { 
    type: String,
    required: true,
    ref: 'User'
  },

  doctorName: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true,
  },

  complaints: {
    type: String,
    required: true
  }
});

module.exports = Meetings = model('Meetings', meetingSchema);