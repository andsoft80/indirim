import React, {Fragment} from "react";

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
	  maximum: 128
	}
  },
  password: {
	presence: { allowEmpty: false, message: 'is required' },
	length: {
	  maximum: 128
	}
  },
  policy: {
	presence: { allowEmpty: false, message: 'is required' },
	checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
	backgroundColor: theme.palette.background.default,
	height: '100%'
  },
}));

const SignUp = () => {
  const classes = useStyles();
  
  return(
	<div className={classes.root}>
	
	</div>
  );
}

export default SignUp;
