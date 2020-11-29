import authReducer from "./auth-reducer";
import accountReducer from "./account-reducer";
import ordersReducer from "./orders-reducer";
import companyReducer from "./company-reducer";

const reducer = (state, action) => {
  return {
    auth: authReducer(state, action),
    account: accountReducer(state, action),
    orders: ordersReducer(state, action),
    company: companyReducer(state, action)
  };
};

export default reducer;
