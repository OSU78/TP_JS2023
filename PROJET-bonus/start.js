const rootURI = "https://jsonplaceholder.typicode.com"
export const userSelect = document.querySelector('#user');
const userMap = new Map();
const userList = [];

export async function get(uri, ...params) {
    let url = rootURI + uri;
    if(params) {
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (param.length !== 2) {
                throw new Error("Need both the param name and the value")
            }
            url += `?${param[0]}=${param[1]}`;
            if (i >= 1) {
                url += "&";
            }
        }
    }
    return await fetch(url)
                .then(req => req.json())
                .catch(error => console.log(error));
}

async function displayUserList(){
    const data = await get("/users");
    for (let i = 0; i < data.length; i++) {
        userMap.set("id", data[i].id);
        userMap.set("name", data[i].name);
        userMap.set("username", data[i].username);
        userMap.set("email", data[i].email);
        userMap.set("phone", data[i].phone);
        userMap.set("website", data[i].website);
        userList.push(userMap);

        const option = document.createElement('option');
        option.value = data[i].id;
        option.innerHTML = data[i].name;
        userSelect.appendChild(option);
    }
    userSelect.click();
}


window.addEventListener('load', function () {
    displayUserList();
 });