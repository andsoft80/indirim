import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink, useLocation, withRouter} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {validate} from "validate.js";
import {authActions} from "../../../redux/actions/auth-actions";
import {withAuthService} from "../../hoc";
import SignInError from "./sign-in-error";
import {useTranslation} from "react-i18next";
import useStyles from "../use-styles";

const schema = {
  login: {
	presence: { allowEmpty: false, message: 'is required' },
	email: true,
	length: {
	  minimum: 5,
	  maximum: 100
	}
  },
  password: {
	presence: { allowEmpty: false, message: 'is required' },
	length: {
	  maximum: 200
	}
  }
};

const SignIn = ({authService, ...rest}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  const [credentials, setCredentials] = useState({
	// login: "andsoft80@gmail.com",
	// password: "death666"
	login: "",
	password: ""
  });
  const [touched, setTouch] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const isError = useSelector(state => state.auth.isError);
  
  useEffect(() => {
	const errors = validate({
	  login: credentials.login,
	  password: credentials.password
	}, schema);
	
	setValid(errors ? false : true);
	setErrors(errors || {});
 
	dispatch(authActions.fetchSignOut(authService));
	console.info('useEffect errors:', errors);
  }, [credentials]);
  
  const handleChange = event => {
    event.persist();
    console.log('handleChange event', event.target.name, event.target.value);
    setCredentials({
	  ...credentials,
	  [event.target.name]:
	  	event.target.type === 'checkbox'
		  ? event.target.checked
		  : event.target.value
	});
	setTouch({
	  ...touched,
	  [event.target.name]: true
	});
	console.log('handleChange', credentials, touched);
  }
  
  const hasError = field => {
	return !!(touched[field] && errors[field]);
  };
  
  const handleSignIn = (e) => {
	e.preventDefault();
	const { login, password} = credentials;
	if (login && password) {
	  const { from } = location.state || { from: { pathname: "/" } };
	  dispatch(authActions.fetchSignIn(authService, credentials, from));
	}
  };
  
  return (
	<div className={classes.root}>
	  <div className={classes.content}>
		<div className={classes.contentBody}>
		  <form className={classes.form} name="form" onSubmit={handleSignIn}>
			<Typography className={classes.title} variant="h2">
			  {t('signIn.title')}
			</Typography>
			<TextField
			  className={classes.textField}
			  error={hasError('login')}
			  fullWidth
			  helperText={
				hasError('login') ? errors.login[0] : null
			  }
			  label={t('signIn.login')}
			  name="login"
			  onChange={handleChange}
			  type="text"
			  value={credentials.login || ''}
			  variant="outlined"
			/>
			<TextField
			  className={classes.textField}
			  error={hasError('password')}
			  fullWidth
			  helperText={
				hasError('password') ? errors.password[0] : null
			  }
			  label={t('signIn.password')}
			  name="password"
			  onChange={handleChange}
			  type="password"
			  value={credentials.password || ''}
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
			  {t('signIn.onSignIn')}
			</Button>
			<Typography color="textSecondary" variant="body2">
			  {t('signIn.dontHaveAccount')}{' '}
			  <Link component={RouterLink} to="/signUp" variant="body2">
				{t('signIn.signUpLink')}
			  </Link>
			</Typography>
			<Typography color="textSecondary" variant="body2">
			  {t('signIn.forgotPassword')}{' '}
			  <Link component={RouterLink} to="/recovery" variant="body2">
				{t('signIn.recoveryLink')}
			  </Link>
			</Typography>
			{ isError && <SignInError/>}
		  </form>
		</div>
	  </div>
	</div>
  );
}

export default withAuthService()(withRouter(SignIn));
// export default withAuthService()(SignIn);
