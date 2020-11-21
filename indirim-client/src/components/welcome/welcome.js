import React, {Fragment} from "react";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import withAuthentication from "../common/require-authentication";

const useStyles = makeStyles(theme => ({
  title: {
	marginTop: theme.spacing(3)
  },
}));

const Welcome = () => {
  const classes = useStyles();
  
  return(
    <Fragment>
	  <Typography className={classes.title} variant="h2">
		Это вы видите если авторизация была успешной
	  </Typography>
	  
	  <Typography color="textSecondary" variant="body1">
		<Link component={RouterLink} to="/signIn" variant="h6">
		  Выйти
		</Link>
	  </Typography>
	</Fragment>
  );
};

// export default withAuthentication()(withRouter(Welcome));
// export default withRouter(Welcome);
export default Welcome;
