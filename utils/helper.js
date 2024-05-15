
class HelperMethod {
    static getEle = function(id) {
        return document.getElementById(id)
    }

    static convertImgToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            // tạo đối tượng đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);

            // lấy kết quả sau khi đọc file 
            reader.onload = () => {
                resolve(reader.result)
            }

            // nếu thất bại khi đọc
            reader.onerror = (err) => {
                reject(err)
            }

        })
    }

    static truncateText(text, len) {
        if(text.length > len) {
            return text.substring(0, len) + "..."
        } else {
            return text
        }
    }
}

export default HelperMethod;

