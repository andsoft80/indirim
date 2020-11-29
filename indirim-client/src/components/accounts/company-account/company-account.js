import React, {useContext, useEffect} from "react";
import {AccountLayout} from "../../layouts";
import items from "./items";
import {useDispatch, useSelector} from "react-redux";
import {UniversalServiceContext} from "../../contexts";
import {fetchCompany} from "../../../store/actions";

const CompanyAccount = () => {
  const dispatch = useDispatch();
  const universalService = useContext(UniversalServiceContext);
  const { data: { firstName, lastName, companyid: companyId} } = useSelector(state => state.account);
  const { name: companyName} = useSelector(state => state.company.data);
  
  const context = {
	title: `${firstName} ${lastName}`,
	subTitle: companyName,
	items
  };
  
  useEffect(() => {
    dispatch(fetchCompany(universalService, companyId))
  }, [companyId])
  
  return (
	<AccountLayout context={context}/>
  );
}

export default CompanyAccount;
