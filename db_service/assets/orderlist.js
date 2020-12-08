



function OrderList() {

    const TestClick = () => {
        alert('test click');
    }
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
        orderList: {
            display: "flex",
            flexWrap: 'wrap',

            //justifyContent:"space-around"
        },

        orderCard: {
            minWidth: 320,
            minHeight: 500,
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
                getTypesCreate();


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


    /////create order button///////////////////////////////

    const [open, setOpen] = React.useState(false);
    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
    const [ordertypescreate, setOrderTypesCreate] = React.useState([]);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];
    const handleClickCreate = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        createDialogOpen();
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseCreate = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const getTypesCreate = () => {

        axios.post('/table/types/action/get', {}, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {


                setOrderTypesCreate(response.data);



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
    const createOrder = () => {
        Alert("Create order");
    }
    const createDialogOpen = () => {
        setOpenCreateDialog(true)
    }
    const createDialogClose = () => {
        setOpenCreateDialog(false)
    }

    //////////////////////////////

    return (
        <div >
            <div style={{display:"flex"}}>
                <font size="5">Заказы</font>

                <div style={{ marginLeft: 40 }}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button id="createOrder_btn" onClick={(event) => handleMenuItemClick(event, 1)}>Создать заказ</Button>
                        <Button
                            color="primary"
                            size="small"
                            onClick={handleToggle}
                        >
                            <Icon>arrow_drop_down</Icon>
                        </Button>
                    </ButtonGroup>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorRef.current}
                        keepMounted
                        open={open}
                        onClose={handleCloseCreate}
                    >

                        {ordertypescreate.map((option, index) => (
                            <MenuItem
                                key={option.id}
                                onClick={(event) => handleMenuItemClick(event, option.id)}
                            >
                                {option.name}
                            </MenuItem>
                        ))}



                    </Menu>
                </div>
            </div>
            <br/><br/>
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
                    <Paper key={order.id} className={classes.orderCard}>
                        {ordertypes.length > 0 ? ordertypes.filter(function (el) {
                            return el.id == order.typeid;
                        })[0]['name'] : ""}

                    </Paper>

                ))}

            </div>

            <Dialog
                fullWidth={false}
                maxWidth={"sm"}
                open={openCreateDialog}
                onClose={createDialogClose}
                aria-labelledby="max-width-dialog-title1"
            >
                <DialogTitle id="max-width-dialog-title1">Новый заказ</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        После добавления заказы, вы сможете получать предложения
                            </DialogContentText>
                    <form className={classes.form} noValidate>
                        <br />
                        <TextField
                            required
                            size="small"
                            fullWidth
                            id="price"
                            label="Начальная цена"
                            type="textField"

                            className={classes.textField}

                            variant="outlined"
                        />
                        <br /><br />




                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={createOrder}>
                        Создать
                            </Button>
                    <Button onClick={createDialogClose} color="primary">
                        Отмена
                            </Button>
                </DialogActions>
            </Dialog>

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