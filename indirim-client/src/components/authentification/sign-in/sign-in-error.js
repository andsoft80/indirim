import React from "react";
import {makeStyles} from "@material-ui/styles";
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  alert: {
	width: '100%',
	'& > * + *': {
	  marginTop: theme.spacing(3),
	},
  },
}));

const SignInError = () => {
  const classes = useStyles();
  
  return(
    <div className={classes.alert}>
	  <Alert severity="error" >
		<AlertTitle>Ошибка авторизации</AlertTitle>
		Проверьте правильность введенных данных
	  </Alert>
	</div>
  );
}

export default SignInError;
