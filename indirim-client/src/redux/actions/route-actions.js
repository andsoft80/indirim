import {ROUTING_TO_PAGE} from "../types";

const routeToPage = (data) => {
  return {
    type: ROUTING_TO_PAGE,
	payload: data
  };
};

export {
  routeToPage,
};
