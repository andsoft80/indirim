import React from "react";
import PageWithImage from "../common/page-with-image";
import signInImage from "./../../assets/svg/sign-in.svg";
import signUpImage from "./../../assets/svg/sign-up.svg";
import recoveryImage from "../../assets/svg/forgot-password.svg";
import resetPasswordImage from './../../assets/svg/forgot-password.svg';
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import RecoveryPassword from "./recovery-password";
import ResetPassword from "./reset-password";


const SignInPage = () => (<PageWithImage Component={SignIn} image={signInImage} />);
const SignUpPage = () => (<PageWithImage Component={SignUp} image={signUpImage} />);
const RecoveryPasswordPage = () => (<PageWithImage Component={RecoveryPassword} image={recoveryImage}/>);
const ResetPasswordPage = () => (<PageWithImage Component={ResetPassword} image={resetPasswordImage} />);


export {
  SignInPage,
  SignUpPage,
  RecoveryPasswordPage,
  ResetPasswordPage,
};
