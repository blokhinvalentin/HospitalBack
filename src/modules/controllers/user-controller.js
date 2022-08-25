const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
const Validation = require('../../helpers/validation');

class UserController {
  registration = async (req, res, next) => {
    try {
      const { login, password } = req.body;
      if (!Validation.checkLogin(login) || !Validation.checkPassword(password)) {
        return next(ApiError.BadRequest('validation error'));
      }
      const userData = await userService.registration(login, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  login = async (req, res, next) => {
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

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 24 * 60 * 1000, httpOnly: true, secure: false });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();