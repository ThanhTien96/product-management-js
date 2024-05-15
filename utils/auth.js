class Authenication {
  static checkLogin() {
    let data = localStorage.getItem("profile");
    if (!data) {
      return false;
    } else {
        return true;
    }
  }
}

export default Authenication;