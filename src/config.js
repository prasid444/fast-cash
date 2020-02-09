/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import jwtDecode from 'jwt-decode';

export default APP_CONFIG = {
  dev: false,
  target: 'react-native',
  network: {
    // base_url: 'http://159.89.175.245',
    base_url: 'http://ec2-3-15-164-7.us-east-2.compute.amazonaws.com:8080',
    // base_url:'http://192.168.2.116:5061/api/v1.0',
    response_formatter: api_response_formatter,
  },

 
  auth: {
    network: {
      domain_name: 'appAuth',
      cache_for_seconds: 60 * 60,
      url: {
        auth_url: () => '/auth/otp',
        refresh_url: () => '/refreshtoken'
      }
    },
    auth_token_request_formatter: auth_token_request_formatter,
    auth_token_response_formatter: auth_token_response_formatter,
    refresh_token_request_formatter: refresh_token_request_formatter,
    refresh_token_response_formatter: refresh_token_response_formatter,
  },
  app_baseurl:'/login'
};

function api_response_formatter(response_data){
  response_data = JSON.parse(response_data);
  return {
    result: response_data.data,
    message: response_data.message,
    error_message: response_data.error_message,
    validation_errors: response_data.validation_errors,
    meta: response_data.meta,
  };
}

function auth_token_request_formatter(request_data){
  return request_data;
}

function auth_token_response_formatter(response_data){
  // var access_token=response_data.access_token;
  // var refresh_token=response_data.refresh_token;
  let { access_token, refresh_token } = response_data.result;
  // let decoded = jwtDecode(access_token);
  // if(decoded.identity){
    return {
      access_token: access_token,
      refresh_token: refresh_token,
      // meta: {
      //   name: decoded.identity.name,
      //   id: decoded.identity.id,
      // }
    };
  // }
}

function refresh_token_request_formatter(request_data){
  return request_data;
}

function refresh_token_response_formatter(response_data){
  return response_data.result;
}
