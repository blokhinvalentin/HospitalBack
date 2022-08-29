const MeetingModel = require('../../models/meeting');
const MeetingDto = require('../dtos/meeting-dto');
const ApiError = require('../exceptions/api-error');
const Validation = require('../../helpers/validation');


class MeetingService {
  async getAllMeetings() {
    const meetings = await MeetingModel.find();
    if (!meetings) {
      throw ApiError.BadRequest('Не удалось получить приемы!');
    }

    return meetings;
  }

  async addMeeting(meeting) {
    const newMeeting = await MeetingModel.create({ ...meeting });
    if (!newMeeting) {
      throw ApiError.BadRequest('Не удалось добавить прием');
    }

    const meetingDto = new MeetingDto(newMeeting);

    return meetingDto;
  }

  async deleteMeeting(_id) {
    const meeting = await MeetingModel.findOneAndDelete({ _id });
    if (!meeting) {
      throw ApiError.BadRequest('Прием не найден');
    }
    
    const meetingDto = new MeetingDto(meeting);

    return meetingDto;
  }

  async editMeeting(meeting) {
    if (!meeting) {
      throw ApiError.BadRequest('Прием не найден');
    }

    const { patientName, doctorName, date, reports, _id } = meeting;
    const meetingToEdit = await MeetingModel.findOneAndUpdate(
      { _id },
      { $set: 
        {
          patientName,
          doctorName,
          date,
          reports
        }
      },
      { new: true }
    )

    if (!meetingToEdit) {
      throw ApiError.BadRequest('Прием не найден');
    }

    const meetingDto = new MeetingDto(meetingToEdit);

    return meetingDto;
  }
}

module.exports = new MeetingService();