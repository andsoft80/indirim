import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/svg/sign-up.svg";
import SignIn from "../sign-in/sign-in";
import Paper from "@material-ui/core/Paper";
import SignUp from "./sign-up";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));


const SignUpPage = () => {
  const classes = useStyles();
  
  return(
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={image} alt={SignIn} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignUp/>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
