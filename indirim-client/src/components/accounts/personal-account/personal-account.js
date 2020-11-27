import React from "react";
import {useSelector} from "react-redux";
import items from "./items";
import {AccountLayout} from "../../layouts";

const PersonalAccount = () => {
  
  const {firstName, lastName} = useSelector(state => state.account.info.data);
  
  const context = {
	firstName,
	lastName,
	items
  };
  
  return (
    <AccountLayout context={context}/>
  );
}

export default PersonalAccount;
