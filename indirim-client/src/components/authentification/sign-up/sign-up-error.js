import React from "react";
import {makeStyles} from "@material-ui/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  alert: {
	width: '100%',
	'& > * + *': {
	  marginTop: theme.spacing(3),
	},
  },
}));

const SignUpError = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  const error = useSelector(state => state.auth.error);
  
  return(
	<div className={classes.alert}>
	  <Alert severity="error" variant="outlined">
		<AlertTitle>{t("signUpError.title")}</AlertTitle>
		<Typography variant="caption" display="block" gutterBottom>
		  {t("signUpError.message")}
		  <br/>
		  {error}
		</Typography>
	  </Alert>
	</div>
  );
}

export default SignUpError;
