import React, {useEffect, useState} from "react";
import { Link as RouterLink } from 'react-router-dom';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {validate} from "validate.js";
import {signIn} from "../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";

const useStyles = makeStyles(theme => ({
  root: {
	backgroundColor: theme.palette.background.default,
	height: '100%'
  },
  grid: {
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


const SignIn = ({history, signIn}) => {
  const classes = useStyles();

  const [email, setEmail] = useState("alexandr.zelentsov@gmail.com");
  const [password, setPassword] = useState("123456");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  
  useEffect(() => {
	const errors = validate({
	  email: email,
	  password: password
	}, schema);
	
	setValid(!errors);
	setError(errors);
  }, [email, password]);
  
  const hasError = field => !!(touched[field] && error[field]);
  
  const handleSignIn = event => {
    event.preventDefault();
	if (email && password) {
	  console.log("handleSignIn", email, password);
	  signIn(email, password);
	}
	setSubmitted(true);
  };
  
  return (
	<div className={classes.root}>
	  <Grid className={classes.grid} container>
		<Grid className={classes.content} item lg={7} xs={12}>
		  <div className={classes.content}>
			<div className={classes.contentBody}>
			  <form className={classes.form} name="form" onSubmit={handleSignIn}>
				<Typography className={classes.title} variant="h2">
				  Sign in
				</Typography>
				<TextField
				  className={classes.textField}
				  error={hasError('email')}
				  fullWidth
				  helperText={
					hasError('email') ? error.email[0] : null
				  }
				  label="Email address"
				  name="email"
				  onChange={event => setEmail(event.target.value)}
				  type="text"
				  value={email || ''}
				  variant="outlined"
				/>
				<TextField
				  className={classes.textField}
				  error={hasError('password')}
				  fullWidth
				  helperText={
					hasError('password') ? error.password[0] : null
				  }
				  label="Password"
				  name="password"
				  onChange={event => setPassword(event.target.value)}
				  type="password"
				  value={password || ''}
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
					to="/sign-up"
					variant="h6"
				  >
					Sign up
				  </Link>
				</Typography>
			  </form>
			</div>
		  </div>
		</Grid>
	  </Grid>
	</div>
  );
}

const mapDispatchToProps = (dispatch, { deviceStockService }) => {
  return bindActionCreators({
	signIn: signIn(deviceStockService)
  }, dispatch);
};


const SignInContainer = connect(null, mapDispatchToProps)(SignIn);

export { SignInContainer as SignIn };
