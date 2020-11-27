import React from "react";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
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

const SignUpSuccess = () => {
  const classes = useStyles();
  const {t} = useTranslation();
  
  return(
	<div className={classes.alert}>
	  <Alert severity="success" variant="outlined">
		<AlertTitle>{t("signUpSuccess.title")}</AlertTitle>
		<Typography variant="caption" display="block" gutterBottom>
		  {t("signUpSuccess.message")}
		</Typography>
	  </Alert>
	</div>
  );
}

export default SignUpSuccess;
