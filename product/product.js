import ProductRequester from "../axios/productRequester.js";
import ProdcutModel from "../model/product.js";
import Authenication from "../utils/auth.js";
import HelperMethod from "../utils/helper.js";
import ValidatorForm from "../utils/validator.js";

window.onload = function () {
  let checkLogin = Authenication.checkLogin();

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
  }

  fetchProductList();
  renderProfileMenu();
};

// #region render profile
const renderProfileMenu = () => {
  let profile = JSON.parse(localStorage.getItem("profile"));

  if (!profile) return;

  HelperMethod.getEle(
    "profile"
  ).innerHTML = `<img style="border-radius: 50%;" width="40px" height="40px" src="${profile.avatar}" alt="...">
    <b style="color: white; text-transform: capitalize;">${profile.full_name}</b>`;
};

// #region render img from
const handleChangeImg = (event) => {
  HelperMethod.convertImgToBase64(event.target.files[0])
    .then((res) => {
      HelperMethod.getEle("prodImgViewer").innerHTML = `
        <img style="border-radius: 10px;" width="200px" height="200px" src="${res}" alt="...">
        `;
    })
    .catch((err) => {
      console.log(err);
    });
};
window.handleChangeImg = handleChangeImg;

// #region create product
const createProduct = async (event) => {
  event.preventDefault();
  // dom get value
  let prodName = HelperMethod.getEle("prodName").value;
  let description = HelperMethod.getEle("prodDescription").value;
  let originalPrice = HelperMethod.getEle("originalPrice").value * 1;
  let reducePrice = HelperMethod.getEle("reducePrice").value * 1;
  let quantity = HelperMethod.getEle("quantity").value * 1;
  let file = HelperMethod.getEle("image").files[0];

  let imageUrl = "";

  if (file) {
    await HelperMethod.convertImgToBase64(file)
      .then((res) => {
        imageUrl = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   validate
  let check = true;

  check &=
    ValidatorForm.checkEmpty(prodName, "errorName", "Product name") &
    ValidatorForm.checkEmpty(description, "errorDescription", "Description") &
    ValidatorForm.checkNumber(
      originalPrice,
      "errorOriginalPrice",
      "Original Price"
    ) &
    ValidatorForm.checkNumber(reducePrice, "errorReducePrice", "Reduce Price") &
    ValidatorForm.checkNumber(quantity, "quantity", "Quantity") &
    ValidatorForm.checkEmpty(imageUrl, "errorImage", "Product name");

  if (!check) return;

  let prodctPayload = new ProdcutModel(
    prodName,
    description,
    originalPrice,
    reducePrice,
    quantity,
    imageUrl
  );

  try {
    // call api với method post thêm sản phẩm
    const res = await ProductRequester.createProduct(prodctPayload);

    if (res.status === 201) {
      // thông báo thành công
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Create ${prodctPayload.name} successfully`,
        showConfirmButton: false,
        timer: 1500,
      });

      //   render lại
      fetchProductList();

      HelperMethod.getEle("prodImgViewer").innerHTML = ``;
      imageUrl = ""
      //   resetFrom
      HelperMethod.getEle("productForm").reset();

      //   tat modal
      // tắt model của bootstrap
      document.querySelector("[data-bs-dismiss=modal]").click();
    }
  } catch (err) {
    console.log(err);
  }
};
window.createProduct = createProduct;

// #region render product list
const handleRenderProductList = (productList) => {
  let html = "";

  productList.forEach((ele, index) => {
    html += `
        <tr class="table-primary">
        <td scope="row">${index + 1}</td>
        <td >${ele.name}</td>
        <td>
          <span>${HelperMethod.truncateText(ele.description, 50)}</span>
        </td>
        <td>
          <img height="50px" src="${ele.image}" alt="..."/>
        </td>
        <td>$ ${ele.originalPrice.toLocaleString()}</td>
        <td>$ ${ele.reducePrice.toLocaleString()}</td>
        <td>${ele.quantity}</td>
        <td>
          <button onclick="handleUpdateTast1('${
            ele.id
          }')" class="btn btn-success">Update</button>
          <button onclick="handleDeleteProduct('${ele.id}')" class="btn btn-danger">Delete</button>
        </td>
      </tr>
        `;
  });

  HelperMethod.getEle("productTBody").innerHTML = html;
};

let ListProduct = [];

const fetchProductList = async () => {
  try {
    const res = await ProductRequester.fetchListProduct();

    if (res.status === 200) {
      ListProduct = res.data;
      handleRenderProductList(ListProduct);
    }
  } catch (err) {
    console.log(err);
  }
};

let updateProdcut = {};
// #region update prodcut
const handleUpdateTast1 = async (productId) => {
  // mở modal
  var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  myModal.show();
  // đổi nút
  HelperMethod.getEle("createProductBtn").style.display = "none";
  HelperMethod.getEle("updateProductBtn").style.display = "inline-block";

  try {
    const res = await ProductRequester.fetchProduct(productId);

    if (res.status === 200) {
      let prodcut = res.data;
      updateProdcut = res.data;
      // dom get value
      HelperMethod.getEle("prodName").value = prodcut.name;
      HelperMethod.getEle("prodDescription").value = prodcut.description;
      HelperMethod.getEle("originalPrice").value = prodcut.originalPrice;
      HelperMethod.getEle("reducePrice").value = prodcut.reducePrice;
      HelperMethod.getEle("quantity").value = prodcut.quantity;
      HelperMethod.getEle("prodImgViewer").innerHTML = `
      <img style="border-radius: 10px;" width="200px" height="200px" src="${prodcut.image}" alt="...">
      `;
    }
  } catch (err) {
    console.log(err);
  }
};
window.handleUpdateTast1 = handleUpdateTast1;

const handleUpdateTast2 = async (event) => {
  event.preventDefault();
  // dom get value
  let prodName = HelperMethod.getEle("prodName").value;
  let description = HelperMethod.getEle("prodDescription").value;
  let originalPrice = HelperMethod.getEle("originalPrice").value * 1;
  let reducePrice = HelperMethod.getEle("reducePrice").value * 1;
  let quantity = HelperMethod.getEle("quantity").value * 1;
  let file = HelperMethod.getEle("image").files[0];

  let imageUrl = updateProdcut.image;

  if (file) {
    await HelperMethod.convertImgToBase64(file)
      .then((res) => {
        imageUrl = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   validate
  let check = true;

  check &=
    ValidatorForm.checkEmpty(prodName, "errorName", "Product name") &
    ValidatorForm.checkEmpty(description, "errorDescription", "Description") &
    ValidatorForm.checkNumber(
      originalPrice,
      "errorOriginalPrice",
      "Original Price"
    ) &
    ValidatorForm.checkNumber(reducePrice, "errorReducePrice", "Reduce Price") &
    ValidatorForm.checkNumber(quantity, "quantity", "Quantity") &
    ValidatorForm.checkEmpty(imageUrl, "errorImage", "Product name");

  if (!check) return;

  let prodctPayload = new ProdcutModel(
    prodName,
    description,
    originalPrice,
    reducePrice,
    quantity,
    imageUrl
  );

  try {
    const res = await ProductRequester.updateProduct(
      prodctPayload,
      updateProdcut.id
    );

    if (res.status === 200) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Update ${prodctPayload.name} successfully`,
        showConfirmButton: false,
        timer: 1500,
      });

      //   render lại
      fetchProductList();

      //   resetFrom
      HelperMethod.getEle("productForm").reset();

      //   tat modal
      // tắt model của bootstrap
      document.querySelector("[data-bs-dismiss=modal]").click();

      HelperMethod.getEle("createProductBtn").style.display = "inline-block";
      HelperMethod.getEle("updateProductBtn").style.display = "none";
    }
  } catch (err) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: err.response.data,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
window.handleUpdateTast2 = handleUpdateTast2;

// #region delete product
const handleDeleteProduct = async (productId) => {
  try{
    const res = await ProductRequester.deleteProduct(productId);
    if(res.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "delete product successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      // gọi lại hàm lấy danh sách sản phẩm để cập nhật và render lại data
      fetchProductList();
    }
  } catch(err) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: err.response.data,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
window.handleDeleteProduct = handleDeleteProduct;
// #endregion
