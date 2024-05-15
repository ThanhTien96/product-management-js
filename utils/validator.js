import HelperMethod from "./helper.js";

export default class ValidatorForm {
  static checkEmpty = (value, spanID, name) => {
    if (value.length <= 0) {
      HelperMethod.getEle(spanID).innerHTML = `${name} is required.`;
      return false;
    } else {
      HelperMethod.getEle(spanID).innerHTML = ``;
      return true;
    }
  };

  static checkNumber(value, spanID, name) {
    if (typeof value !== "number") {
      HelperMethod.getEle(spanID).innerHTML = `${name} must be a number.`;
      return false;
    } else {
      if (value <= 0) {
        HelperMethod.getEle(spanID).innerHTML = `${name} must be biger than 0.`;
        return false;
      } else {
        HelperMethod.getEle(spanID).innerHTML = ``;
        return true;
      }
    }
  }
}
