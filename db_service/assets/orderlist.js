



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
            minWidth: 200,
            minHeight: 300,
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
                getOrders(10,0);



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

    const getOrders = (rPP,p) => {
        var params ={};
        params.page = p;
        params.rawsPerPage = rPP;
        params.sortDesc = true;


        axios.get('/orders/page', { headers: { "Authorization": 'Bearer ' + getToken() }, params: params })
            .then(function (response) {
                // alert(JSON.stringify(response));

                // let arr = response.data.sort(function(a, b) {
                //     return b.id-a.id;
                //   });

                setOrders(response.data.orders);
                getTypes();
                // setViewOrdersArray(arr.slice(0,10));
                setPage(p);
                setRowsPerPage(rPP);
                setAllOrdersCount(response.data.allOrdersCount);
                



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
    const [selectedOrderType, setSelectedOrderType] = React.useState(1);
    const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

    const handleChangeSOT = (ev) => {

        setSelectedOrderType(ev.target.value);
    };
    const handleClickCreate = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setSelectedOrderType(index);
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
        let parcel = {};
        parcel.qty = document.getElementById('qty').value;
        parcel.price = document.getElementById('price').value;
        parcel.amount = document.getElementById('amount').value;
        parcel.note = document.getElementById('orderNote').value;
        parcel.link = document.getElementById('link').value;
        parcel.currency = document.getElementById('curr').value;
        parcel.typeid = selectedOrderType;
        parcel.userId = userData.id;





        if (parcel.qty <= 0 || parcel.price <= 0 || parcel.note === '') {
            alert("Заполните корректно обязательные поля!");
            return;

        }


        axios.post('/table/orders/action/post', parcel, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {
                alert("Заказ успешно добавлен!");
                setOpenCreateDialog(false);



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
    const createDialogOpen = () => {
        setOpenCreateDialog(true)
    }
    const createDialogClose = () => {
        setOpenCreateDialog(false)
    }

    const calcAmount = () => {
        let qty = document.getElementById('qty').value;
        let price = document.getElementById('price').value;

        document.getElementById('amount').value = qty * price;


    }

    //////////////////////////////
    /////////paginator/////////////////

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOrdersArray, setViewOrdersArray] = React.useState([]);
    allOrdersCount
    const [allOrdersCount, setAllOrdersCount] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        
        setPage(newPage);
        // setViewOrdersArray(orders.slice(rowsPerPage*newPage,rowsPerPage*newPage+rowsPerPage));
        getOrders(rowsPerPage,newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    ///////////////////////////////////






    return (
        <div style={{ height: "100%" }}>
            <div id="all-wrap" style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'column', height: "100%" }}>
                <div id="header-and-content">
                    <div style={{ display: "flex" }}>
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
                            <Paper key={order.id} className={classes.orderCard}>
                                
                                {ordertypes.length > 0 ? ordertypes.filter(function (el) {
                                    return el.id == order.typeid;
                                })[0]['name'] : ""}
                                <br/>
                                {order.id}

                            </Paper>

                        ))}

                    </div>

                </div>
                <div id='footer-paginator' style={{borderTop:'1px solid silver'}}>
                    <TablePagination
                        component="div"
                        count={allOrdersCount}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            {/* ////////////////////////dialogs///////////////////////////////////////////// */}

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
                        <FormControl style={{ width: '100%' }} variant="outlined" >
                            <InputLabel id="demo-simple-select-label" >Тип заказа</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="selectedOT"
                                value={selectedOrderType ? selectedOrderType : " "}
                                onChange={handleChangeSOT}
                                label="Тип заказа"

                            >
                                {ordertypescreate.map((option, index) => (
                                    <MenuItem
                                        key={option.id}
                                        value={option.id}

                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <br /><br />

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FormControl style={{ width: '100%', }}>
                                <TextField
                                    required

                                    fullWidth
                                    id="price"
                                    label="Начальная цена"
                                    type="number"
                                    onChange={calcAmount}
                                    className={classes.textField}


                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl style={{ width: '100%', marginLeft: 10 }} variant="outlined">
                                <InputLabel id="demo-simple-select-label" >Валюта</InputLabel>

                                <Select

                                    id="curr"
                                    value={"RUB"}
                                    label="Валюта"

                                >

                                    <MenuItem value={"RUB"}>
                                        RUB
                                </MenuItem>
                                    <MenuItem value={"USD"}>
                                        USD
                                </MenuItem>
                                    <MenuItem value={"EUR"}>
                                        EUR
                                </MenuItem>

                                </Select>
                            </FormControl>
                        </div>

                        <br />
                        <TextField
                            variant="outlined"
                            id="orderNote"
                            label="Описание заказа *"
                            multiline
                            rows={4}
                            fullWidth



                        />
                        <br /><br />
                        <TextField
                            variant="outlined"
                            id="link"
                            label="Ссылка на интернет цену"
                            multiline
                            rows={4}
                            fullWidth


                        />
                        <br /><br />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FormControl style={{ width: '100%', }}>
                                <TextField
                                    required
                                    defaultValue="1"

                                    id="qty"
                                    label="Количество"
                                    type="number"
                                    onChange={calcAmount}
                                    className={classes.textField}


                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl style={{ width: '100%', marginLeft: 10 }} variant="outlined">
                                {/* <InputLabel id="demo-simple-select-label" >Сумма</InputLabel> */}

                                <TextField
                                    InputProps={{
                                        readOnly: true,

                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}


                                    id="amount"
                                    label="Сумма"
                                    type="number"

                                    className={classes.textField}


                                    variant="outlined"
                                />
                            </FormControl>
                        </div>


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