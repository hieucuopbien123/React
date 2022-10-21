export const getData = async (url) => {
    if(!('fetch' in window)){
        console.log("Fetch API not found");
        return;
    }
    return fetch(url, {
        method: 'GET'
    }).then((response) => {
        if(!response.ok) {
            console.log("Error code: ", response.status);
            throw Error(response.statusText);
        }
        return response.json();
    }).then((res) => {
        return {data: res};
    }).catch((error) => {
        return error;
    })
}
