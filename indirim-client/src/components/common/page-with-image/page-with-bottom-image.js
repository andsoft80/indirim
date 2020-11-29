import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
	height: '100vh',
  },
  content: {
	paddingTop: 150,
	textAlign: 'center',
  },
  image: {
	marginTop: 50,
	display: 'inline-block',
	maxWidth: '100%',
	width: 560
  }
}));


const PageWithBottomImage = ({content, image}) => {
  const classes = useStyles();
  const {title, subTitle, comment} = content
  
  return (
	<div className={classes.root}>
	  <Grid container justify="center" spacing={4}>
		<Grid item lg={6} xs={12}>
		  <div className={classes.content}>
			<Typography variant="h1">
			  {title}
			</Typography>
			<Typography variant="button" gutterBottom>
			  {subTitle}
			</Typography>
			<Typography variant="body2" gutterBottom>
			  {comment}
			</Typography>
			<img className={classes.image} src={image} alt="error icon"/>
		  </div>
		</Grid>
	  </Grid>
	</div>
  );
}

export default PageWithBottomImage;
