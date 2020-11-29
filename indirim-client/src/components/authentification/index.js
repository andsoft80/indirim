import React from "react";
import {PageWithLeftImage} from "../common/page-with-image";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import RecoveryPassword from "./recovery-password";
import ResetPassword from "./reset-password";


const SignInPage = () => (
  <PageWithLeftImage
    Component={SignIn}
    image={"/images/svg/sign-in.svg"}
  />);

const SignUpPage = () => (
  <PageWithLeftImage
    Component={SignUp}
    image={"/images/svg/sign-up.svg"}
  />);

const RecoveryPasswordPage = () => (
  <PageWithLeftImage
    Component={RecoveryPassword}
    image={"/images/svg/forgot-password.svg"}
  />);

const ResetPasswordPage = () => (
  <PageWithLeftImage
    Component={ResetPassword}
    image={"/images/svg/forgot-password.svg"}
  />);


export {
  SignInPage,
  SignUpPage,
  RecoveryPasswordPage,
  ResetPasswordPage,
};
