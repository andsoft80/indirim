function Profile() {
    const [userData, setUserData] = useState({ name: '' });
    React.useEffect(() => {
        getUserData();
    }, []);
    function getUserData() {
        axios.post('/userinfo', {




        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                setUserData(response.data.data);


            })
            .catch(function (error) {
                // handle error
                if (error.message.indexOf('400') > 0) {
                    window.location = '/login.html';
                }
                else {
                    // alert(error);
                    window.location = '/login.html';
                }
                // alert(typeof error.message);
            })
    }
    return (

        <div>
            <font size="5">Профиль</font>
            <br />
            {userData.name}
        </div>


    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Profile />
    </ThemeProvider>,
    document.querySelector('#content_profile'),
);