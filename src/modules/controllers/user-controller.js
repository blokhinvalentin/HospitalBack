const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const { checkLogin, checkPassword } = require('../../helpers/validation');

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;
      if (!checkLogin(login) || !checkPassword(password)) {
        return next(ApiError.BadRequest('validation error'));
      }
      const userData = await userService.registration(login, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (login === '' || password === '') {
        return next(ApiError.BadRequest('validation error'));
      }
      const userData = await userService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  // async activate(req, res, next) {
  //   try {
  //     const activationLink = req.params.link;
  //     await userService.activate(activationLink);
  //     return res.redirect(process.env.CLIENT_URL)
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 24 * 60 * 1000, httpOnly: true, secure: false });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  // async getMeetings(req, res, next) {
  //   try {
  //     const meetings = await userService.getAllMeetings();
  //     return res.json(meetings);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new UserController();