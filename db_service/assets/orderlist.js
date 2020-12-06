



function OrderList() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            marginLeft: 10
        },
        filters: {
            // height: 100,
            // backgroundColor: 'silver'
        },
        filters_content: {
            marginLeft: 20
        },
        orderList :{
            display:"flex",
            flexWrap: 'wrap',
            
            //justifyContent:"space-around"
        },

        orderCard:{
            minWidth:320,
            minHeight:500,
            margin: 10
        }


    }));
    const classes = useStyles();
    const [userData, setUserData] = useState({ name: '' });
    const [orders, setOrders] = useState([]);
    const [ordertypes, setOredrTypes] = useState([]);

    React.useEffect(() => {

        getUserData();


    }, []);


    const getUserData = () => {

        axios.get('/userdbinfo', { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                setUserData(response.data);
                getOrders();



            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('401') > 0) {

                    window.location = '/login.html';
                }
                else {
                    alert(error);


                }
                // alert(typeof error.message);
            })
    }

    const getOrders = () => {

        axios.post('/table/orders/action/get', {}, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                setOrders(response.data);
                getTypes();



            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('401') > 0) {

                    window.location = '/login.html';
                }
                else {
                    alert(error);


                }
                // alert(typeof error.message);
            })
    }
    const getTypes = () => {

        axios.post('/table/types/action/get', {}, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {


                setOredrTypes(response.data);



                // alert(ordertypes.filter(function (el) {
                //     return el.id == 2;
                // })[0]['name']
                // );




            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('401') > 0) {

                    window.location = '/login.html';
                }
                else {
                    alert(error);


                }
                // alert(typeof error.message);
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
            <br />
            <div className={classes.orderList}>
                {orders.map((order) => (
                    <Paper  key={order.id} className={classes.orderCard}>
                        {ordertypes.length > 0 ? ordertypes.filter(function (el) {
                            return el.id == order.typeid;
                        })[0]['name'] : ""}

                    </Paper>

                ))}

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