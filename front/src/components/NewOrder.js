import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import axios from 'axios';
import be_conf from '../be_config'
import Authcontrol from './../Authcontrol';



export default function NewOrderDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [resons, setResons] = React.useState([]);
    const [reson, setReson] = React.useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

   
    useEffect(() => {
        // Some initialization logic here
        axios.post(be_conf.server + '/userinfo', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {
                if (response.data) {


                    var parcel = {};
                    parcel.clientid = response.data.data.clientid;
                    axios.post(be_conf.server + '/table/absencetypes/action/get', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                        .then(function (response) {
                            if (response.data) {
                                //   alert(JSON.stringify(response.data));
                                setResons(response.data);

                            }

                        })

                }
                else {
                    alert("Вы не авторизованы!");
                }
            })
    }, []);


    const handleChange = (event) => {
        setReson(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        axios.post(be_conf.server + '/userinfo', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {
                if (response.data) {
                var parcel = {};
                parcel.startdate = document.getElementById("ds").value;
                parcel.enddate = document.getElementById("de").value;
                parcel.userid = response.data.data.id;
                parcel.approvedbypn = response.data.data.approvepn;
                parcel.approved = 0;
                parcel.clientid = response.data.data.clientid;
                parcel.typeid = reson;
                parcel.note = document.getElementById("note").value;
                // alert(JSON.stringify(parcel));
                if (parcel.startdate == "" || parcel.enddate == "" || parcel.typeid == "") {
                    alert("Заполните обязательные поля!");
                    return;

                }

                axios.post(be_conf.server + '/table/orders/action/post', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                    .then(function (response) {

                        if (response.data) {
                            //   alert(JSON.stringify(response.data));

                            setOpen(false);
                            props.updateMyOrders5();

                        }


                    })

                }
                else {
                    alert("Вы не авторизованы!");
                  }
            })



    }





    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            <Fab color="warning" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Новая заявка</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните поля об отсутствии
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            required
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                            id="ds"
                            label="Дата начала"
                            type="date"
                            fullWidth
                        />
                        <TextField
                            required
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                            id="de"
                            label="Дата окончания"
                            type="date"
                            fullWidth
                        />

                        <TextField
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                            id="standard-select-currency"
                            select
                            label="Причина отсутствия"
                            value={reson}
                            onChange={handleChange}
                        // helperText="Please select your currency"
                        >
                            {resons.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="note"
                            margin="dense"
                            label="Примечание"
                            multiline
                            rows={4}
                            // defaultValue="Default Value"
                            variant="filled"
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
          </Button>
                    <Button onClick={handleSave} color="primary">
                        Сохранить
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}