import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import useStyles from "../use-styles";

const RecoveryPassword = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  const [touched, setTouch] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  
  const hasError = () => {};
  
  const handleChange = () => {}
  
  const handleRecovery = () => {}
  
  return(
	<div className={classes.root}>
	  <div className={classes.content}>
		<div className={classes.contentBody}>
		  <form className={classes.form} name="form" onSubmit={handleRecovery}>
			<Typography className={classes.title} variant="h2">
			  {t('recovery.title')}
			</Typography>
			<TextField
			  className={classes.textField}
			  error={hasError('login')}
			  fullWidth
			  helperText={
				hasError('login') ? errors.login[0] : null
			  }
			  label={t('recovery.login')}
			  name="login"
			  onChange={handleChange}
			  type="text"
			  // value={credentials.login || ''}
			  variant="outlined"
			/>
			<Button
			  className={classes.submitButton}
			  color="primary"
			  disabled={!valid}
			  fullWidth
			  size="large"
			  type="submit"
			  variant="contained"
			>
			  {t('recovery.onRecovery')}
			</Button>
			<Typography color="textSecondary" variant="body2">
			  {t('recovery.dontHaveAccount')}{' '}
			  <Link component={RouterLink} to="/signUp" variant="body2">
				{t('recovery.signUpLink')}
			  </Link>
			</Typography>
			<Typography color="textSecondary" variant="body2">
			  {t('recovery.rememberPassword')}{' '}
			  <Link component={RouterLink} to="/signIn" variant="body2">
				{t('recovery.signInLink')}
			  </Link>
			</Typography>
		  </form>
		</div>
	  </div>
	</div>
  );
}

export default RecoveryPassword;

