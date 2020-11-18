import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {validate} from "validate.js";
import {authActions} from "../../redux/actions/auth-actions";
import {withAuthService} from "../hoc";

const useStyles = makeStyles(theme => ({
  root: {
	backgroundColor: theme.palette.background.default,
	height: '100%'
  },
  content: {
	height: '100%',
	display: 'flex',
	flexDirection: 'column'
  },
  contentBody: {
	flexGrow: 1,
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.down('md')]: {
	  justifyContent: 'center'
	}
  },
  form: {
	paddingLeft: 100,
	paddingRight: 100,
	paddingBottom: 125,
	flexBasis: 700,
	[theme.breakpoints.down('sm')]: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(2)
	}
  },
  textField: {
	marginTop: theme.spacing(2)
  },
  title: {
	marginTop: theme.spacing(3)
  },
  signInButton: {
	margin: theme.spacing(2, 0)
  }
}));

const schema = {
  email: {
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
  
  const [credentials, setCredentials] = useState({
	login: "andsoft80@gmail.com",
	password: "death666"
  });
  const [touched, setTouch] = useState({});
  const [errors, setErrors] = useState({});
  // const [email, setEmail] = useState("andsoft80@gmail.com");
  // const [password, setPassword] = useState("death666");
  const [valid, setValid] = useState(false);
 
  
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
	const errors = validate({
	  email: credentials.login,
	  password: credentials.password
	}, schema);
	
	setValid(!errors);
	setErrors(errors);
  }, [credentials]);
  
  const handleChange = event => {
    event.persist();
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
	})
  }
  
  const hasError = field =>
	touched[field] && errors[field] ? true : false;
  
  const onSignIn = (e) => {
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
		  <form className={classes.form} name="form" onSubmit={onSignIn}>
			<Typography className={classes.title} variant="h2">
			  Sign in
			</Typography>
			<TextField
			  className={classes.textField}
			  error={hasError('email')}
			  fullWidth
			  helperText={
				hasError('email') ? errors.login[0] : null
			  }
			  label="Email address"
			  name="email"
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
			  label="Password"
			  name="password"
			  onChange={handleChange}
			  type="password"
			  value={credentials.password || ''}
			  variant="outlined"
			/>
			<Button
			  className={classes.signInButton}
			  color="primary"
			  disabled={!valid}
			  fullWidth
			  size="large"
			  type="submit"
			  variant="contained"
			>
			  Sign in now
			</Button>
			<Typography
			  color="textSecondary"
			  variant="body1"
			>
			  Don't have an account?{' '}
			  <Link
				component={RouterLink}
				to="/signUp"
				variant="h6"
			  >
				Sign up
			  </Link>
			</Typography>
		  </form>
		</div>
	  </div>
	</div>
  );
}

export default withAuthService()(SignIn);
