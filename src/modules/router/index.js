const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const meetingController = require('../controllers/meeting-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const {
  getAllMeetings,
  addMeeting,
  deleteMeeting,
  editMeeting
} = require('../controllers/meeting-controller');

router.post('/registration', userController.registration);
router.post('/authorization', userController.login);
router.get('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/meetings', meetingController.getAllMeetings);
router.post('/meetings', meetingController.addMeeting);
router.delete('/meetings/:_id', meetingController.deleteMeeting);
router.patch('/meetings/:_id', meetingController.editMeeting);

module.exports = router;