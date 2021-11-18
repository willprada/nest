export const setSearch = (URL) => {  
  return {
    type: "SET_SEARCH_URL",
    payload: URL,
  };
};

export const setReferrals = (referrals) => {
  return {
    type: "SET_REFERRALS",
    payload: referrals,
  };
};

export const addReferral = (referral) => {
  return {
    type: "ADD_REFERRALS",
    payload: referral,
  };
};