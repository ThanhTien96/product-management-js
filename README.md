
```bash

// lấy data từ server thông qua API với thư viện có sẵn của js là fetch

const getData = () => {

    let account = {
        username: "fetch them data",
        password: "secret",
        email: "noemail@gmail.com"
    }

    const response = fetch("https://6638c9344253a866a24f2db9.mockapi.io/accounts",{
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(account)
    })

    response.then(async res => {
        const data = await res.json()
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}



// lấy data từ server bằng axios
const getDataByAxios = () => {

    let account = {
        username: "axios",
        password: "axios",
        email: "axios@gmail.com"
    }

    const response = axios({
        url: "https://6638c9344253a866a24f2db9.mockapi.io/accounts",
        method: "POST",
        data: account
    })

    response.then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    })
}

// gọi API với axios và try catch (try thành công sẽ vô đây) (catch sẽ là thất bại) finally( thành hay thất bại đều vô đây) 
const getDataWithAxiosAndTryCatch = async () => {
    try {
        const response = await axios({
            url: "https://6638c9344253a866a24f2db9.mockapi.io/accounts12",
            method: "GET",
        })

        console.log(response);
        if(response.status === 200) {
            console.log(response.data);
        }

    } catch (err) {
        console.log(err);
    } finally {
        console.log("finnaly");
    }
}

getDataWithAxiosAndTryCatch()
```