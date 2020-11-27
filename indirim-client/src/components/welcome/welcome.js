import React, {Fragment, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {fetchSignOut, redirectToSignIn} from "../../store/actions";
import {withAuthService} from "../hoc";

const useStyles = makeStyles(theme => ({
  title: {
	marginTop: theme.spacing(3)
  },
}));

const Welcome = ({authService, ...rest}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  useEffect(() => {
	console.info("Welcome useEffect");
  }, [isAuthenticated]);
  
  const handleSignOut = () => {
	dispatch(fetchSignOut(authService));
  };
  
  return(
    <Fragment>
	  <Typography className={classes.title} variant="h2">
		Это вы видите если авторизация была успешной
	  </Typography>
	  
	  <Button
		variant="contained"
		color="secondary"
		onClick={handleSignOut}
	  >
		Выйти
	  </Button>
	</Fragment>
  );
};

// export default withAuthentication()(withRouter(Welcome));
// export default withRouter(Welcome);
export default withAuthService()(Welcome);
