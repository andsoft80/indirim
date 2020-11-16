


authenticateUser = (token) =>{
        var tokenObj = {};
        tokenObj.token = token;
        localStorage.setItem('ar_token', JSON.stringify(tokenObj));
    }

isUserAuthenticated = () =>{
        var token = localStorage.getItem('ar_token');

        
        if (token !== null && JSON.parse(token).exp > new Date() / 1000) {
            return true
        }
        else
            return false


    }
deauthenticateUser = () =>{
        localStorage.removeItem('ar_token')
    }

getToken  = () =>{
        if (localStorage.getItem('ar_token') !== null) {
            return JSON.parse(localStorage.getItem('ar_token')).token;
        }
        else
            return '';
    }
setExp = (exp) =>{
        
        var tokenObj = JSON.parse(localStorage.getItem('ar_token'));
        tokenObj.exp = exp;
        localStorage.setItem('ar_token', JSON.stringify(tokenObj));
    }


