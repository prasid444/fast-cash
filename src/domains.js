/* eslint-disable prettier/prettier */
const CACHE_FOR_SECONDS = 0;
const basicDomains = {};

const networkDomains = {
  transactions: {
    url: {
      list: ({identifier}) => `/workspaces/${identifier}/transactions`,
      detail:({params:{workspace_id,transaction_id}})=>`/workspaces/${workspace_id}/transactions/${transaction_id}`
    },
  },
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
    url:{
      user_detail:()=>`/api/v1/user`,
      login_signup:()=>`/auth/login`,
      mpin_set:()=>`/auth/mpin`
    }
  },
  category: {
    cache_for_seconds:1 * 60 * 60,
    url: {
      list: () => '/txn-categories',
    },
  },
  workspaces: {
    url: {
      list: () => '/workspaces',
      detail: ({identifier}) => `/workspaces/${identifier}`,
      invite_email: ({identifier}) => `/workspaces/${identifier}/invite-email`,
      generate_code:({identifier})=>`/workspaces/${identifier}/invite`,
      join:({})=>'/join-workspace',
      list_members:({identifier})=>`/workspaces/${identifier}/members`,
      detail_members:({params:{workspace_id,member_id}})=>`/workspaces/${workspace_id}/members/${member_id}`
    },
  },
  offline: {
    cache_for_seconds: 2 * 24 * 60 * 60,
    url: {
      recent_transactions: ({identifier}) =>
        `/workspaces/${identifier}/transactions`,
    },
  },
};

export {basicDomains, networkDomains};
