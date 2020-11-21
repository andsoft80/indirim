import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {validate} from "validate.js";
import useStyles from "../use-styles";

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 5,
      maximum: 200
    }
  },
  confirmation: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: "password"
  }
  
};


const ResetPassword = ({ ref }) => {
  const classes = useStyles();
  const { resetToken } = useParams();
  const { t } = useTranslation();
  
  const [credentials, SetCredentials] = useState({
    password: "",
    confirmation: ""
  });
  const [touched, setTouch] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  
  useEffect(() => {
    const errors = validate(credentials, schema);
    
    setValid(errors ? false : true);
    setErrors(errors || {});
    
    console.info('useEffect errors:', errors);
  }, [credentials]);
  
  const handleChange = event => {
    event.persist();
    SetCredentials({
      ...credentials,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    });
    setTouch({
      ...touched,
      [event.target.name]: true
    });
  }
  
  const hasError = field => !!(touched[field] && errors[field]);
  
  const handleReset = () => {};
  
  return(
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.contentBody}>
          <form className={classes.form} name="form" onSubmit={handleReset}>
            <Typography className={classes.title} variant="h2">
              {t('reset.title')}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              { resetToken }
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? errors.password[0] : null
              }
              label={t("reset.password")}
              name="password"
              onChange={handleChange}
              type="password"
              value={credentials.password || ''}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? errors.password[0] : null
              }
              label={`${t("reset.password")} ${t("reset.confirmation")}`}
              name="confirmation"
              onChange={handleChange}
              type="password"
              value={credentials.confirmation || ''}
              variant="outlined"
            />
            <Button
              className={classes.submitButton}
              color="primary"
              disabled={!valid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {t('reset.onReset')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
