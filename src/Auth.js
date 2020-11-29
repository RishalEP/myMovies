class Auth {
  
    login(cb) {
      localStorage.setItem("loggedin",true)
      cb();
    }
  
    logout(cb) {
        localStorage.clear()
        cb();
    }
  
    isAuthenticated() {
      return localStorage.getItem("loggedin");
    }
  }
  
  export default new Auth();
  