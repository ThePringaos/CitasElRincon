class Auth {
  constructor () {
    this.authenticate = sessionStorage.getItem('authenticatedUser');
  }

  login (cb) {
    sessionStorage.authenticatedUser = true;
    this.authenticate = sessionStorage.getItem('authenticatedUser');
    cb();
    // console.trace();
  }

  logout (cb) {
    sessionStorage.authenticatedUser = false;
    this.authenticate = sessionStorage.getItem('authenticatedUser');
    cb();
    // console.trace();
  }

  isAuthenticated () {
    return this.authenticate;
  }
}

export default new Auth();
