import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
	height: '100vh',
  },
  image: {
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
  },
}));


const PageWithImage = ({image, Component, ...rest}) => {
  const classes = useStyles();
  
  useEffect(() => {
    console.info("PageWithImage useEffect")
  });
  return (
	<Grid container component="main" className={classes.root}>
	  <Grid item xs={false} sm={4} md={7} className={classes.image}>
		<img src={image} alt={Component.name} />
	  </Grid>
	  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
		<Component {...rest}/>
	  </Grid>
	</Grid>
  );
}

export default PageWithImage;
