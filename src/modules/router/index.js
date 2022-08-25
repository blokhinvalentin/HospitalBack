const Router = require('express').Router;
const userController = require('../controllers/user-controller');
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
router.get('/meetings', getAllMeetings);
router.post('/meetings', addMeeting);
router.delete('/meetings/:_id', deleteMeeting);
router.patch('/meetings/:_id', editMeeting);

module.exports = router;