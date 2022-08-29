module.exports = class MeetingDto {
  patientName;
  doctorName;
  date;
  reports;
  _id;

  constructor(model) {
    this.patientName = model.patientName;
    this.doctorName = model.doctorName;
    this.date = model.date;
    this.reports = model.reports;
    this._id = model._id; 
  }
}