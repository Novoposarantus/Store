export async function getRequest(url, isLock = false){
    const response = await fetch(url,{
        headers: isLock ? {
            'Authorization': "Bearer " + localStorage.getItem('user-token')
        } : {}
    })
    const json = await response.json();
    return json;
}
export async function postRequest(url,data,isLock = false){
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': isLock ?  "Bearer " + localStorage.getItem('user-token') : ''
        }
    });
    const json = await response.json();
    return json;
}