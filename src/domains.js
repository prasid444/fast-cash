/* eslint-disable prettier/prettier */
const CACHE_FOR_SECONDS = 0;
const basicDomains = {};

const networkDomains = {

  transaction:{
    cache_for_seconds:1 * 60 * 60,
    url:{
      list:()=>`/api/v1/transactions`,
      create:()=>`/api/v1/transaction`,
      receiver_decision:()=>`/api/v1/receiver_transaction_decision`,
      sender_decision:()=>`/api/v1/sender_transaction_decision`,
      request:()=>`/api/v1/request_transaction`
    }
  },
  user:{
    cache_for_seconds:1 * 60 * 60,
    url:{
      user_detail:()=>`/api/v1/user`,
      login_signup:()=>`/auth/login`,
      mpin_set:()=>`/auth/mpin`
    }
  },

 
};

export {basicDomains, networkDomains};
