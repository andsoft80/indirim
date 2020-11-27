import {API_URL, createHeader} from "./api-constants";

const get = async (resource) => {
  const url = `${API_URL}${resource}`;
  const res = await fetch(url, { headers: createHeader() });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` +
      `, received ${res.status}`);
  }
  return await res.json();
}

const getInfo = async (accountId) => await get(`/accounts/${accountId}/info`);

const getOrders = async (accountId) => await get(`/accounts/${accountId}/orders`);

const getOffers = async (accountId) => await get(`/accounts/${accountId}/offers`);

export const accountService = {
  getInfo,
  getOffers,
  getOrders,
};
