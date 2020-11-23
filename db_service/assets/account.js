function Account() {
    const [userData, setUserData] = useState({ name: '' });
    const [companyData, setCompanyData] = React.useState({name:''});
    React.useEffect(() => {
        getUserData();
    }, []);
    function getUserData() {
        
        axios.post('/userdbinfo', {




        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                
                setUserData(response.data);
                
                getCompanyById(response.data.companyid);
                


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
    const getCompanyById =(id)=>{
        axios.post('/table/companies/action/get', {
            id: id,
            

        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                
                if(response.data[0])
                setCompanyData(response.data[0]);


            })
            .catch(function (error) {
                // handle error
                if (error.message.indexOf('404') > 0) {
                    alert("Пользователь не найден!");

                }
                else {
                    alert(error);
                }
                // alert(typeof error.message);
            })
    }
    return (

        <div>
            <font size="5">Состояние счета</font>
            <br />
            {companyData.name}
        </div>


    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Account />
    </ThemeProvider>,
    document.querySelector('#content_account'),
);