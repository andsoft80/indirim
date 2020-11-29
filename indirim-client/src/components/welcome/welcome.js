import React, {Fragment, useContext, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {fetchSignOut} from "../../store/actions";
import {AuthServiceContext} from "../contexts";

const useStyles = makeStyles(theme => ({
  title: {
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3)
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authService = useContext(AuthServiceContext)
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
		Если вы это видите, то значит авторизация прошла успешно
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

export default Welcome;
