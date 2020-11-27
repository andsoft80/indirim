import authReducer from "./auth-reducer";
import accountReducer from "./account-reducer";

const reducer = (state, action) => {
  return {
    auth: authReducer(state, action),
    account: accountReducer(state, action)
  };
};

export default reducer;
