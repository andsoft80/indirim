import {COMPANY_FAILURE, COMPANY_REQUESTED, COMPANY_SUCCESS, SIGN_OUT} from "../types";

const initialState = {
  loading: false,
  data: {
    name: "FakeCompany LLC"
  },
  error: {},
};

const companyReducer = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  
  switch (action.type) {
    
    case COMPANY_REQUESTED:
      return {
        ...state.company,
        loading: true,
      };
  
    case COMPANY_SUCCESS:
      return {
        ...state.company,
        loading: false,
        data: action.payload,
        error: {}
      };
  
    case COMPANY_FAILURE:
      const {message} = action.payload;
      return {
        loading: false,
        data: initialState.data.name,
        error: message
      }
    
    case SIGN_OUT:
      return initialState;
  
    default:
      return state.company;
  }
}

export default companyReducer;
