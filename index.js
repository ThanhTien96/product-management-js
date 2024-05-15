import ProductRequester from "./axios/productRequester.js";
import Authenication from "./utils/auth.js";
import HelperMethod from "./utils/helper.js";

const renderProfileMenu = () => {
  let profile = JSON.parse(localStorage.getItem("profile"));

  if (!profile) return;

  HelperMethod.getEle(
    "profile"
  ).innerHTML = `<img style="border-radius: 50%;" width="40px" height="40px" src="${profile.avatar}" alt="...">
    <b style="color: white; text-transform: capitalize;">${profile.full_name}</b>`;
};

// #region LOGOUT
const handleLogout = () => {
  localStorage.removeItem("profile");
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "logout successfully",
    showConfirmButton: false,
    timer: 1500,
  });

  location.href = "/login";
};
window.handleLogout = handleLogout;

// #region search
const handleSearch = async (e) => {
  e.preventDefault();
  let keyWord = HelperMethod.getEle("inputSearch").value;

  try {
    const response = await ProductRequester.fetchListProduct();

    // kiểm tra nếu thành công
    if (response.status === 200) {
      let productList = response.data;
      // tìm trong danh sách có sản phẩm nào giống keyword không
      let findProducts = productList.filter((ele) =>
        ele.name.toLowerCase().includes(keyWord.toLowerCase())
      );
      handleRenderResultSearch(findProducts);
    }
  } catch (err) {
    console.log(err);
  }
};
window.handleSearch = handleSearch;

const handleRenderResultSearch = (prodList) => {
  let html = "";
  // render

  if(prodList.length > 0) {
    prodList.forEach((ele) => {
      html += `
        <div class="result-item">
          <img src="${ele.image}" alt="..." />
          <div class="content">
            <h6>${ele.name}</h6>
            <p>${HelperMethod.truncateText(ele.description, 100)}</p>
          </div>
        </div>
      `;
    });
  } else {
    html = `<h6>No Result</h6>`
  }
  

  let searchResult = HelperMethod.getEle("searchResult");
  searchResult.style.display = "block";
  searchResult.innerHTML = html;
};
// #endregion

// đóng search result khi click là ngoài
window.addEventListener("click", function() {
  HelperMethod.getEle("searchResult").style.display = "none"
})

// #region ONLOAD
window.onload = function () {
  let checkLoging = Authenication.checkLogin();

  if (!checkLoging) {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Permission dinined",
      showConfirmButton: false,
      timer: 1500,
    });

    location.href = "/login";
  } else {
    renderProfileMenu();
  }
};

// #region es6 hof
/**
 * 1. hàm map
 * 
 *const arrMap =  arr.map((ele, index, arr) => {
 * return {name: ele.name}
 * })
 * 
 * const arrFilter = arr.filter((ele, index, arr) => {
 *  return ele.name === "a"
 * })
 * 
 * const find = arr.find((ele, index, arr) => ele.name === "a")
 *
 * arr.forEach((ele, index, arr) => {
 *  chỉ lặp qua danh sách chứ không có return
 * })
 * 
 * const check : true | false = arr.some((ele, index, arr) => ele.name === "a");
 * some nếu 1 thằng trong arr thoả điều kiện sẽ trả về true nếu có không có thằng nào hết sẽ trả về false
 * 
 * const check: true | false = arr.every((ele, index, arr) => ele.name = "bob")
 * every nếu tất phần tử trong arr thoả điều kiện sẽ trả về true
 * nếu tất cả đều thoả điều kiện chỉ 1 thằng không thoả trả về false
 * 
 * const total = arr.reduce((total, ele) => {
 *  total + ele.money;
 * },0)
 * total sau khi return sẽ là tổng tiền ví dụ 1000
 * 
 */

