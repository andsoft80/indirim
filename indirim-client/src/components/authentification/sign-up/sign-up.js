import React, {useContext, useEffect, useState} from "react";
import {validate} from "validate.js";
import useStyles from "../use-styles";
import SignUpError from "./sign-up-error";
import {useTranslation} from "react-i18next";
import {AuthServiceContext} from "../../contexts";
import {fetchSignUp} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {Button, Checkbox, Link, TextField, Typography} from "@material-ui/core";
import SignUpSuccess from "./sign-up-success";

const schema = {
  firstName: {
	presence: { allowEmpty: false, message: 'is required' },
	length: {
	  maximum: 32
	}
  },
  lastName: {
	presence: { allowEmpty: false, message: 'is required' },
	length: {
	  maximum: 32
	}
  },
  email: {
	presence: { allowEmpty: false, message: 'is required' },
	email: true,
	length: {
	  minimum: 5,
	  maximum: 128
	}
  },
  password: {
	presence: { allowEmpty: false, message: 'is required' },
	length: {
	  minimum: 8,
	  maximum: 128
	}
  },
  policy: {
	presence: { allowEmpty: false, message: 'is required' },
  }
};

const SignUp = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [registration, setRegistration] = useState({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	policy: false,
  });
  const [touched, setTouch] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const authService = useContext(AuthServiceContext);
  const {isError, isRegistered} = useSelector(state => state.auth);
  
  useEffect(() => {
	const errors = validate(registration, schema);

	setValid(errors ? false : true);
	setErrors(errors || {});
  }, [registration]);

  const hasError = field => !!(touched[field] && errors[field]);

  const handleChange = event => {
	event.persist();
	setRegistration({
	  ...registration,
	  [event.target.name]:
		event.target.type === 'checkbox'
		  ? event.target.checked
		  : event.target.value
	});
	setTouch({
	  ...touched,
	  [event.target.name]: true
	});
  };

  const handleSignUp = event => {
	event.preventDefault();
	dispatch(fetchSignUp(authService, registration));
  };

  return(
	<div className={classes.root}>
	  <div className={classes.content}>
		<div className={classes.contentBody}>
		  <form className={classes.form} onSubmit={handleSignUp}>
			<Typography className={classes.title} variant="h2">
			  {t('signUp.title')}
			</Typography>
			<TextField
			  className={classes.textField}
			  error={hasError('firstName')}
			  fullWidth
			  helperText={
				hasError('firstName') ? errors.firstName[0] : null
			  }
			  label={t("signUp.firstName")}
			  name="firstName"
			  onChange={handleChange}
			  type="text"
			  value={registration.firstName || ''}
			  variant="outlined"
			/>
			<TextField
			  className={classes.textField}
			  error={hasError('lastName')}
			  fullWidth
			  helperText={
				hasError('lastName') ? errors.lastName[0] : null
			  }
			  label={t("signUp.lastName")}
			  name="lastName"
			  onChange={handleChange}
			  type="text"
			  value={registration.lastName || ''}
			  variant="outlined"
			/>
			<TextField
			  className={classes.textField}
			  error={hasError('email')}
			  fullWidth
			  helperText={
				hasError('email') ? errors.email[0] : null
			  }
			  label={t("signUp.email")}
			  name="email"
			  onChange={handleChange}
			  type="text"
			  value={registration.email || ''}
			  variant="outlined"
			/>
			<TextField
			  className={classes.textField}
			  error={hasError('password')}
			  fullWidth
			  helperText={
				hasError('password') ? errors.password[0] : null
			  }
			  label={t("signUp.password")}
			  name="password"
			  onChange={handleChange}
			  type="password"
			  value={registration.password || ''}
			  variant="outlined"
			/>
			<div className={classes.policy}>
			  <Checkbox
				checked={registration.policy || false}
				className={classes.policyCheckbox}
				color="primary"
				name="policy"
				onChange={handleChange}
			  />
			  <Typography
				className={classes.policyText}
				color="textSecondary"
				variant="body1"
			  >
				{t("signUp.iHaveRead")}{' '}
				<Link
				  color="primary"
				  component={RouterLink}
				  to="#"
				  underline="always"
				  variant="h6"
				>
				  {t("signUp.termsConditions")}
				</Link>
			  </Typography>
			</div>
			<Button
			  className={classes.submitButton}
			  color="primary"
			  disabled={!valid}
			  fullWidth
			  size="large"
			  type="submit"
			  variant="contained"
			>
			  {t('signUp.onSignUp')}
			</Button>
			<Typography color="textSecondary" variant="body2">
			  {t('signUp.haveAccount')}{' '}
			  <Link component={RouterLink} to="/signIn" variant="body2">
				{t('signUp.signInLink')}
			  </Link>
			</Typography>
			{ isError && <SignUpError/>}
			{ isRegistered && <SignUpSuccess/>}
		  </form>
		</div>
	  </div>
	</div>
  );
}

export default SignUp;
