const loginCheck = /^[0-9A-Za-z]{6,}$/;
const passwordCheck = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;

const checkLogin = (login) => {
  return loginCheck.test(login);
}

const checkPassword = (password) => {
  return passwordCheck.test(password);
}

module.exports = {
  checkLogin,
  checkPassword
}