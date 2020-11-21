import React from 'react';
import icon from "../../../assets/svg/error.svg";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const ErrorIndicator = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h4">
              {t("errorIndicator.boom")}
            </Typography>
            <Typography variant="button" gutterBottom>
              {t("errorIndicator.title")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("errorIndicator.subTitle")}
            </Typography>
            <img className={classes.image} src={icon} alt="error icon"/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ErrorIndicator;
