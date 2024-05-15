import AccountRequester from "../axios/accountRequester.js";
import AccountModel from "../model/account.js";
import HelperMethod from "../utils/helper.js";
import ValidatorForm from "../utils/validator.js";

const handleRegister = async (event) => {
  event.preventDefault();

  let name = HelperMethod.getEle("nameRs").value;
  let phone = HelperMethod.getEle("phoneRs").value;
  let email = HelperMethod.getEle("emailRs").value;
  let password = HelperMethod.getEle("passwordRs").value;
  let avatar = HelperMethod.getEle("avatar").files[0];

  console.log("☣️👻👻 >>> handleRegister >>> avatar: ", avatar);

  // handle avatar
  let avatarUrl = "";
  if (avatar) {
    await HelperMethod.convertImgToBase64(avatar)
      .then((data) => {
        avatarUrl = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // validate form
  let check = true;

  check &=
    ValidatorForm.checkEmpty(name, "errorNameRs", "Full Name") &
    ValidatorForm.checkEmpty(phone, "errorphoneRs", "Phone Number") &
    ValidatorForm.checkEmpty(email, "errorEmailRs", "Email") &
    ValidatorForm.checkEmpty(email, "errorPasswordRs", "Password") &
    ValidatorForm.checkEmpty(avatarUrl, "errorAvatarRs", "Avatar");

  // check validate if false break function;
  if (!check) {
    return;
  }

  // tạo đối tượng
  const account = new AccountModel(name, phone, email, password, avatarUrl);

  //   call api post tạo tài khoản
  try {
    const res = await AccountRequester.CreateAccount(account);

    if (res.status == 201) {
      // dùng sweet alert thông báo thành công
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Create account successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      //   reset form
      HelperMethod.getEle("formRs").reset();
      //   chuyển hướng về trang chủ;
      window.location.href = "/login";
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
window.handleRegister = handleRegister;
