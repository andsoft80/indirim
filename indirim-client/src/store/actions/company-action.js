import {
  COMPANY_FAILURE,
  COMPANY_REQUESTED,
  COMPANY_SUCCESS
} from "../types";


const companyRequested = () => {
  return {
    type: COMPANY_REQUESTED
  };
};

const companyLoaded = (data) => {
  return {
    type: COMPANY_SUCCESS,
    payload: data
  };
};

const companyError = (error) => {
  return {
    type: COMPANY_FAILURE,
    payload: error
  };
};

const fetchCompany = (universalService, companyId) => (dispatch) => {
  dispatch(companyRequested());
  universalService.getCompany(companyId)
    .then(data => dispatch(companyLoaded(data[0])))
    .catch(error => dispatch(companyError(error)));
};

export {
  fetchCompany,
};
