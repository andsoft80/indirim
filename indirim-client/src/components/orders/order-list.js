import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AccountServiceContext} from "../contexts";
import {fetchMyOrder} from "../../store/actions/orders-action";
import Spinner from "../common/spinner";
import ErrorIndicator from "../common/error-indicator";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Empty from "../common/empty";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const OrderList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accountService = useContext(AccountServiceContext);
  const { loading, data, error } = useSelector(state => state.orders);
  
  useEffect(() => {
    dispatch(fetchMyOrder(accountService));
  }, [fetchMyOrder]);
  
  if (loading) {
    return (<Spinner loading={loading}/>);
  }
  
  if (error) {
    return (<ErrorIndicator message={error.toString()}/>)
  }
  
  if (data.length() === 0) {
    return (
      <Empty
        title={"emptyOrders.title"}
        subTitle={"emptyOrders.subTitle"}
        comment={"emptyOrders.comment"}
      />);
  }
  
  return (
    <Container maxWidth={false}>
    
    </Container>
  );
}

export default OrderList;
