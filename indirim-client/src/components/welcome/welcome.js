import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  title: {
	marginTop: theme.spacing(3)
  },
}));

const Welcome = () => {
  const classes = useStyles();
  
  return(
	<Typography className={classes.title} variant="h2">
	  Это вы видите если авторизация была успешной
	</Typography>
  );
};

export default Welcome;
