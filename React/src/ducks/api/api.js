export const getRequest = async (url) => {
    const response = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('user-token')
        }
    });
    return response.json();
}
export const postRequest = async (url,data) =>{
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('user-token')
        }
    });
    return response.json();
}