const MeetingModel = require('../../models/meeting');
const ApiError = require('../exceptions/api-error');

class MeetingService {
  async getAllMeetings() {
    const meetings = await MeetingModel.find();
    if (!meetings) {
      throw ApiError.BadRequest('Не удалось получить приемы!');
    }

    return meetings;
  }
}

module.exports = new MeetingService();