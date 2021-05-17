import {

    makeStyles,

    Icon,
    TextField,

    Button,
    Checkbox,
    FormControlLabel, FormGroup,
    Paper,

    Menu,
    MenuItem,

    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,

    ButtonGroup, Select, InputLabel, FormControl, TablePagination, CircularProgress

} from '@material-ui/core';

import Authcontrol from '../Authcontrol';
import be_conf from '../be_config';
import axios from 'axios';
import $ from 'jquery';
import { useAlert } from 'react-alert'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {

    useState, useEffect, useRef
} from 'react';

export default function OrderList() {





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
            maxWidth: 200,
            maxHeight: 300,

            margin: 10
        }


    }));
    const classes = useStyles();
    const [userData, setUserData] = useState({ name: '' });
    const [orders, setOrders] = useState([]);
    const [ordertypes, setOredrTypes] = useState([]);

    useEffect(() => {

        getUserData();


    }, []);


    const getUserData = () => {

        axios.get(be_conf.server + '/userdbinfo', { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {

                setUserData(response.data);
                setShowProgress(true);
                getOrders(10, 0);



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

    const getOrders = (rPP, p) => {//row per page, and page's number
        var params = {};
        params.page = p;
        params.rawsPerPage = rPP;
        params.sortDesc = true;


        axios.get(be_conf.server + '/orders/page', { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() }, params: params })
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
                setShowProgress(false);



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

        axios.post(be_conf.server + '/table/types/action/get', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
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

    const [open, setOpen] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [ordertypescreate, setOrderTypesCreate] = useState([]);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [selectedOrderType, setSelectedOrderType] = useState(1);
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

        axios.post(be_conf.server + '/table/types/action/get', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
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
        let date;
        date = new Date();

        //convert to MySQL datetime
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);

        let parcel = {};
        parcel.qty = document.getElementById('qty').value;
        parcel.price = document.getElementById('price').value;
        parcel.amount = document.getElementById('amount').value;
        parcel.note = document.getElementById('CreateOrderNote').value;
        parcel.link = document.getElementById('link').value;
        parcel.currency = document.getElementById('curr').value;
        parcel.typeid = selectedOrderType;
        parcel.userId = userData.id;
        parcel.startdate = date;





        if (parcel.qty <= 0 || parcel.price <= 0 || parcel.note === '') {
            alert("Заполните корректно обязательные поля!");
            return;

        }


        axios.post(be_conf.server + '/table/orders/action/post', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {
                alert("Заказ успешно добавлен!");
                setOpenCreateDialog(false);
                getOrders(10, 0);




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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewOrdersArray, setViewOrdersArray] = useState([]);
    const [allOrdersCount, setAllOrdersCount] = useState(0);

    const [showProgress, setShowProgress] = useState(false);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        // setViewOrdersArray(orders.slice(rowsPerPage*newPage,rowsPerPage*newPage+rowsPerPage));
        setShowProgress(true);
        getOrders(rowsPerPage, newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getOrders(parseInt(event.target.value, 10), 0);
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
                                    <ArrowDropDownIcon/>
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
                    {/* ////////orders////////// */}
                    <div className={classes.orderList}>
                        {orders.map((order) => (
                            <Paper key={order.id} className={classes.orderCard} style={{ padding: 5, backgroundColor: '#f5f5dc' }}>
                                <div id="orderWrap">
                                    <div id="orderHeader" style={{ display: "flex", justifyContent: 'space-between' }}>
                                        <div>
                                            <div id="orderHeaderLeft" style={{ height: 35 }}>
                                                <b>
                                                    {ordertypes.length > 0 ? ordertypes.filter(function (el) {
                                                        return el.id == order.typeid;
                                                    })[0]['name'] : ""}
                                                </b>

                                            </div>
                                            <div>
                                                <font size="1">{order.startdate.split(/\D/)[2] + '.' + order.startdate.split(/\D/)[1] + '.' + order.startdate.split(/\D/)[0]}</font>
                                            </div>
                                        </div>
                                        <div>
                                            <div id="orderHeaderRight" style={{ marginLeft: "auto", backgroundColor: order.enddate ? "red" : "green", color: "white", padding: 5, height: 30 }}>
                                                {order.enddate ? "Закрыто" : "Открыто"}

                                            </div>


                                        </div>
                                    </div>
                                    <br />
                                    <div id='orderCenter'>
                                        <TextField
                                            variant="outlined"
                                            id="orderNote"
                                            label="Описание заказа"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,

                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={order.note}
                                            inputProps={{
                                                style: { overflow: 'auto' },
                                            }}



                                        />

                                    </div>

                                    <div id="orderPriceWrap" style={{ backgroundColor: '#f5f5dc', display: "flex", marginTop: 5, alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                                        <div id="orderPriceWrapLeft" style={{ textAlign: "right" }}>
                                            <font size="1">Цена</font>  <b>{order.price}</b>
                                            <br />
                                            <font size="1">Сумма</font> {order.amount}
                                        </div>
                                        <div id="orderPriceWrapRight">
                                            <font size="3">X{order.qty}</font>
                                        </div>
                                        <div id="orderPriceWrapRight">
                                            <font size="4">{order.currency}</font>

                                        </div>

                                    </div>
                                    <div id='orderFoter'>
                                    </div>
                                </div>

                            </Paper>

                        ))}

                    </div>
                    {/* ////////////////////////////////////////// */}

                </div>
                <div id='footer-paginator' style={{ borderTop: '1px solid silver' }}>
                    <TablePagination
                        component="div"
                        count={allOrdersCount}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
                <div style={{ position: "absolute", left: '50%', top: '50%' }} hidden={!showProgress}>
                    <CircularProgress />

                </div>
            </div>
            {/* ////////////////////////dialogs and progress///////////////////////////////////////////// */}



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
                            id="CreateOrderNote"
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