const meetingService = require('../service/meeting-service');
const ApiError = require('../exceptions/api-error');
const Validation = require('../../helpers/validation');

class MeetingController {
  getAllMeetings = async (req, res, next) => {
    try {
      const meetings = await meetingService.getAllMeetings();
      return res.json(meetings);
    } catch (error) {
      next(error);
    }
  }

  addMeeting = async (req, res, next) => {
    try {
      const meeting = req.body;
      if (!Validation.checkIfEmpty(meeting)) {
        return next(ApiError.BadRequest('Заполните пустые поля!'));
      }
      const newMeeting = await meetingService.addMeeting(meeting);
      return res.json(newMeeting);
    } catch (error) {
      next(error);
    }
  }

  deleteMeeting = async (req, res, next) => {
    try {
      const params = req.params;
      const _id  = params._id;
      if (!params.hasOwnProperty('_id') || _id === '') {
        return next(ApiError.BadRequest('неверный id!'));
      }


      const meetingToDelete = await meetingService.deleteMeeting(_id);
      return res.json(meetingToDelete);
    } catch (error) {
      next(error);
    }
  }

  editMeeting = async (req, res, next) => {
    try {
      const params = req.params;
      console.log(params);

      const _id = params._id;
      if (!params.hasOwnProperty('_id') || _id === '') {
        return next(ApiError.BadRequest('неверный id!'));
      }

      const meeting = req.body.meeting;
      meeting['_id'] = _id;

      const meetingToEdit = await meetingService.editMeeting(meeting);
      return res.json(meetingToEdit);
    } catch (error) {
      // next(error);
    }
  }
}

module.exports = new MeetingController();