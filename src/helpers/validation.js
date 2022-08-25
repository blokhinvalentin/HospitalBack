class Validation {
  loginCheck = /^[0-9A-Za-z]{6,}$/;
  passwordCheck = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;

  checkLogin = (login) => {
    return loginCheck.test(login);
  }

  checkPassword = (password) => {
    return passwordCheck.test(password);
  }

  checkIfEmpty = (meeting) => {
    for (let key in meeting) {
      if (meeting[key] === '') {
        return false;
      }
    }
    return true;
  }
}

module.exports = new Validation();