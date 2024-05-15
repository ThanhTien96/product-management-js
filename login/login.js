import AccountRequester from "../axios/accountRequester.js";
import HelperMethod from "../utils/helper.js";
import ValidatorForm from "../utils/validator.js";

const handleLogin = async (event) => {
  event.preventDefault();
  let email = HelperMethod.getEle("email").value;
  let password = HelperMethod.getEle("password").value;

  let check = true;
  check &=
    ValidatorForm.checkEmpty(email, "errorEmail", "Email") &
    ValidatorForm.checkEmpty(password, "errorPassword", "Password");

  if (!check) return;

  try {
    let listAccount = [];

    const res = await AccountRequester.ListAccount();

    if (res.status === 200) {
      listAccount = res.data;

      let findUser = listAccount.find((ele) => ele.email === email);
      if (!findUser) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "email incorrect.",
          showConfirmButton: false,
          timer: 1500,
        });

        return;
      }

      // kiểm tra password
      if (findUser.password !== password) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "password incorrect.",
          showConfirmButton: false,
          timer: 1500,
        });

        return;
      }

      //   kiểm tra lưu tai khoản có check k nếu có lưu lại tài khoản
      let saveAccount = HelperMethod.getEle("saveAccount").checked;
      if (saveAccount) {
        let accountToSave = {
          email,
          password,
        };
        localStorage.setItem("account", JSON.stringify(accountToSave));
      }
      //   reset form
      HelperMethod.getEle("loginForm").reset();

      // nếu đúng hêt lưu profile
      localStorage.setItem("profile", JSON.stringify(findUser));
      // thông báo thành công
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      //   chuyển người dùng về trang home
      location.href = "/";
    }
  } catch (err) {
    // dùng sweet alert thông báo thất bại (cái message string luôn nằm trong respons.data)
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: err.response.data,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
window.handleLogin = handleLogin;


window.onload = function() {
    let accountLC = JSON.parse(localStorage.getItem("account"))

    if(accountLC) {
        HelperMethod.getEle("email").value = accountLC.email;
        HelperMethod.getEle("password").value = accountLC.password;
    }

}