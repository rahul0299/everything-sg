const getAuthToken = () => {
    return localStorage.getItem('token') || null;
}

export {getAuthToken}