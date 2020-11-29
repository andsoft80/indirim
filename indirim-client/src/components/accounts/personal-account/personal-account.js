import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import items from "./items";
import {AccountLayout} from "../../layouts";
import {AccountServiceContext} from "../../contexts";
import {fetchAccountInfo} from "../../../store/actions";

const PersonalAccount = () => {
  const dispatch = useDispatch();
  const accountService = useContext(AccountServiceContext);
  const { data: {firstName, lastName, email} } = useSelector(state => state.account);
  
  useEffect(() => {
    dispatch(fetchAccountInfo(accountService));
  }, [fetchAccountInfo]);
  
  const context = {
	title: `${firstName} ${lastName}`,
	subTitle: email,
	items
  };
  
  return (
    <AccountLayout context={context}/>
  );
}

export default PersonalAccount;
