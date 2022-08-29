const Router = require('express').Router;
const router = new Router();
const MeetingController = require('../controllers/meeting-controller');

router.get('/meetings', MeetingController.getAllMeetings);

module.exports = router;