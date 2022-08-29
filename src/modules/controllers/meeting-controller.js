const meetingService = require('../service/meeting-service');

class MeetingController {
  getAllMeetings = async (req, res, next) => {
    try {
      const meetings = await meetingService.getAllMeetings();
      return res.json(meetings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeetingController();