const AuthHeader = () => {
    const userStr = localStorage.getItem('user');
    
    let user = null;
    
    if (userStr)
        user = JSON.parse(userStr);
  
    if (user && user.accessToken) {
        return { access_token: + user.accessToken };
    } else {
        return { access_token: '' };
    }
}

export default AuthHeader;