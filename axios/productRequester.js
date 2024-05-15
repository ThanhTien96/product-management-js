import SERVER_URL from "./coreAxios.js"


class ProductRequester {
    static endpoint = "/products"

    static async createProduct(payload) {
        return await axios({
            url: SERVER_URL + this.endpoint,
            method: "POST",
            data: payload
        })
    }

    static async fetchListProduct() {
        return await axios({
            url: SERVER_URL + this.endpoint,
            method: "GET"
        })
    }

    static async fetchProduct(productId) {
        return await axios({
            url: `${SERVER_URL + this.endpoint}/${productId}`,
            method: "GET"
        })
    }

    static async updateProduct(payload, productId) {
        return await axios({
            url: `${SERVER_URL + this.endpoint}/${productId}`,
            method: "PUT",
            data: payload
        })
    }

    static async deleteProduct(productId) {
        return await axios({
            url: `${SERVER_URL + this.endpoint}/${productId}`,
            method: "DELETE",
        })
    }
}

export default ProductRequester;