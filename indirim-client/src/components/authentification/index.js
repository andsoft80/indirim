import React from "react";
import PageWithImage from "../common/page-with-image";
// import signInImage from "/images/svg/sign-in.svg";
// import signUpImage from "/images/svg/sign-up.svg";
// import recoveryImage from "/images/svg/forgot-password.svg";
// import resetPasswordImage from '/images/svg/forgot-password.svg';
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import RecoveryPassword from "./recovery-password";
import ResetPassword from "./reset-password";


const SignInPage = () => (
  <PageWithImage
    Component={SignIn}
    image={"/images/svg/sign-in.svg"}
  />);

const SignUpPage = () => (
  <PageWithImage
    Component={SignUp}
    image={"/images/svg/sign-up.svg"}
  />);

const RecoveryPasswordPage = () => (
  <PageWithImage
    Component={RecoveryPassword}
    image={"/images/svg/forgot-password.svg"}
  />);

const ResetPasswordPage = () => (
  <PageWithImage
    Component={ResetPassword}
    image={"/images/svg/forgot-password.svg"}
  />);


export {
  SignInPage,
  SignUpPage,
  RecoveryPasswordPage,
  ResetPasswordPage,
};
