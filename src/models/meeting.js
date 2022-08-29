const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
  patientName: { 
    type: String,
    required: true
  },

  doctorName: {
    type: String,
    required: true
  },

  date: {
    type: Date
  },

  reports: {
    type: String
  }
});

module.exports = Meetings = model('Meeting', meetingSchema);