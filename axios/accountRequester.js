import SERVER_URL from "./coreAxios.js";

class AccountRequester {
   static endpoint = "/accounts";

    static CreateAccount = async function(payload) {
        return await axios({
            url: SERVER_URL + this.endpoint,
            method: "POST",
            data: payload,
        })
    }

    // lấy danh sách account
    static ListAccount = async function() {
        return await axios({
            url: SERVER_URL + this.endpoint,
            method: "GET",
        })
    }
}


export default AccountRequester;