



function OrderList() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            marginLeft: 10
        },
        filters: {
            height: 100,
            // backgroundColor: 'silver'
        },
        filters_content: {
            marginLeft: 20
        }

    }));
    const classes = useStyles();
    const [userData, setUserData] = useState({ name: '' });
    const [orders, setOrders] = useState([]);
    const [types, setTypes] = useState([]);

    React.useEffect(() => {

        getUserData();
        getOrders();
        getTypes();
    }, []);


    function getUserData() {

        axios.get('/userdbinfo', { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                if (response.data === 'need_auth') {
                    window.location = '/login.html';
                    return;
                }
                setUserData(response.data);




            })
            .catch(function (error) {
                // handle error

                alert(error);

            })
    }

    function getOrders() {

        axios.post('/table/orders/action/get', {}, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                // alert(JSON.stringify(response.data));
                if (response.data === 'need_auth') {
                    window.location = '/login.html';
                    return;
                }
                setOrders(response.data);




            })
            .catch(function (error) {
                // handle error

                alert(error);


            })
    }
    function getTypes() {

        axios.post('/table/types/action/get', {}, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                // alert(JSON.stringify(response.data));
                if (response.data === 'need_auth') {
                    window.location = '/login.html';
                    return;
                }
                setTypes(response.data);
                // alert(response.data.filter(function (el) {
                //     return el.id==2;
                // })[0]['name']
                // );




            })
            .catch(function (error) {
                // handle error

                alert(error);


            })
    }

    return (
        <div >

            <font size="5">Заказы</font>
            <br /><br />
            <div id="filters" className={classes.filters}>
                <Paper position="static" square>
                    <div>
                        <div className={classes.filters_content}>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox name="checkedC" />} label="Только мои" />
                            </FormGroup>
                        </div>
                    </div>
                </Paper>

            </div>


        </div>

    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <OrderList />
    </ThemeProvider>,
    document.querySelector('#content_orderlist'),
);