import React from "react";
import {makeStyles} from "@material-ui/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

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
  const {t} = useTranslation();
  const error = useSelector(state => state.auth.error);
  
  return(
    <div className={classes.alert}>
	  <Alert severity="error" variant="outlined">
		<AlertTitle>{t("signInError.title")}</AlertTitle>
		<Typography variant="caption" display="block" gutterBottom>
		  {t("signInError.message")}
		  <br/>
		  {error}
		</Typography>
	  </Alert>
	</div>
  );
}

export default SignInError;
