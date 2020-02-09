/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import { RESTExecutor } from './networkDomain';
import APP_CONFIG from '../../config';

class Authenticator extends RESTExecutor{
  constructor(config, initializer){
    super('post', 'auth_url');

    this.initializer = initializer;

    this.auth_token_request_formatter = config.auth_token_request_formatter;
    this.auth_token_response_formatter = config.auth_token_response_formatter;
    this.refresh_token_request_formatter = config.refresh_token_request_formatter;
    this.refresh_token_response_formatter = config.refresh_token_response_formatter;
  }

  persistTokens(data){
    this.domain.write('access_token', data.access_token, true);
    // this.domain.write('refresh_token', data.refresh_token, true);
    this.domain.write('meta', data.meta, true);
  }

  isAuthenticated(){
    return Boolean(this.domain.read('access_token'));
  }

  getTokens(){
    return {
      access_token: this.domain.read('access_token'),
      // refresh_token: this.domain.read('refresh_token'),
      meta: this.domain.read('meta'),
    };
  }

  login(data,successCallback,errorCallback){
    this.callbacks(
      (resp) => {
        console.log("1")
        let formatted_resp = this.auth_token_response_formatter(resp);
        console.log("2")
        this.persistTokens(formatted_resp);
        console.log("3")
        // typeof this.onSuccess == 'function' && this.onSuccess(formatted_resp);
        console.log("4")
        typeof successCallback=='function'&&successCallback(formatted_resp);
        console.log("5")
      },(val,error)=>{
        typeof this.onError == 'function' && this.onError(val,error);
        // this.onError(val,error);
        // console.log(typeof errorCallback,"error typoe")
        typeof errorCallback=='function'&&errorCallback(val,error);
      }
     
    ).execute(this.auth_token_request_formatter(data));
  }

  // refresh(data){
  //   this.callbacks(
  //     (resp) => this.persistTokens(this.refresh_token_response_formatter(resp)),
  //   ).execute(this.refresh_token_request_formatter(data));
  // }

  refresh({data,successCallback,errorCallback}){
    let refresh_token=this.domain.read('refresh_token');
    this.config({ label: 'refresh_url',headers:{'Authorization':`Bearer ${refresh_token}`} }).callbacks(
      (resp) => {
        
        this.persistTokens(this.refresh_token_response_formatter(resp))
        successCallback(resp);
      },
      (val,error)=>{
          if(error.response){
              this.logout();
              
          }
          errorCallback(val,error);
      }
    ).execute(this.refresh_token_request_formatter(data));
  }

  logout(){
    this.initializer();
  }
}

export default Authenticator;
