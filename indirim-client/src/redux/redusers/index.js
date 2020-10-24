import authReducer from "./auth-reducer";

const reducer = (state, action) => {
  return {
    auth: authReducer(state, action),
  };
};

export default reducer;
