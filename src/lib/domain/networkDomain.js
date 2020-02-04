/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
import Domain from './domain';

const start = () => ({
  fetching: true,
  timestamp: null,
  success: false,
  error: false,
  no_net: false,
  not_found: false,
  server_error: false,
  no_access: false,
  timeout: false,
  error_message: undefined,
});

const complete = () => ({
  fetching: false,
});

const success = (response) => {
 return ({
  fetching: false,
  timestamp: new Date().getTime(),
  success: true,
  error: false,
  error_message: null,
  validation_errors: null,
  result: response.data.result,
  meta: response.data.meta,
});
}

const errorFunc = (errors) => ({
  fetching: false,
  timestamp: new Date().getTime(),
  success: false,
  error: true,
  error_message: errors.error_message,
  validation_errors: errors.validation_errors,
  no_net:errors.no_net,
  not_found:errors.not_found,
  server_error:errors.server_error,
  no_access:errors.no_access,
  timeout:errors.timeout
});
const ACTION_MAP = {
  list: { http_method: 'get', url_label: 'list'},
  post: { http_method: 'post', url_label: 'list'},

  detail: { http_method: 'get', url_label: 'detail'},
  put: { http_method: 'put', url_label: 'detail'},
  patch: { http_method: 'patch', url_label: 'detail'},
  delete: { http_method: 'delete', url_label: 'detail'},
};

class RESTExecutor{

    /* new code for handling 401 and refresh token */

    static _locked=false;

    static _waitingList=[];

    static lock(){
      console.log('network locked');
      this._locked=true;
    }
  
    static unLock(){
      console.log('network unlocked');
      for (let item of this._waitingList){
        if(typeof item == 'function')
          item();
      }
      this._waitingList=[];
      this._locked=false;
    }
  
    static reset(){
      console.log('netowrk reset')
      this._waitingList=[];
      this._locked=false;
    }
  
  
  //....................................................


  constructor(method, url_label, domain){
    this.method = method;
    this.url_label = url_label;
    this.domain = domain;
    this.headers={};

    this.url_callback = null;
    this.params = null;
    this.identifier = null;
    this.onSuccess = null;
    this.onError = null;

    this.configured = false;
    this.executed = false;

    this.connect = this.connect.bind(this);
    this.callbacks = this.callbacks.bind(this);
    this.config = this.config.bind(this);
    this.execute = this.execute.bind(this);
    this.response = this.response.bind(this);
    this.responseAfterExecute = this.responseAfterExecute.bind(this);

    this._url = this._url.bind(this);
    this._retriveFromCache = this._retriveFromCache.bind(this);
  }

  connect(domain){
    this.domain = domain;
    return this;
  }

  config({ url, params, label,headers }){
    if(url){
      this.url_callback = url;
    }

    if(params){
      this.params = params;
    }


    if(headers){
      this.headers = headers;
    }

    if(label){
      this.url_label = label;
    }

    this.executed = false;
    this.configured = true;

    return this;
  }

  forId(identifier){
    this.identifier = identifier;

    return this;
  }

  callbacks(onSuccess, onError){
    this.onSuccess = onSuccess;
    this.onError = onError;

    return this;
  }

  execute(data_or_force){
    if(!this.domain){
      throw new Error('RESTExecutor not connected to domain. Use "connect(domain)" to connect.');
    }
    // if(!this.configured){
    //   throw new Error('RESTExecutor is not configured yet. Use config(url, params) to configure.')
    // }

    let data = undefined;

    if(this.method == 'get'){
      let { force } = data_or_force ? data_or_force : {};
      let { cache_for_seconds } = this.domain.config;
      if(force != true && this._retriveFromCache(cache_for_seconds)){
        return;
      }
    }
    else{
      data = data_or_force;
    }

    if(RESTExecutor._locked){
      let url = this._url();
      RESTExecutor._waitingList.push(()=>this.domain._callAPi(this.method,url , this.params, this.onSuccess, this.onError, data,this.headers));
      return;
    }

    this.domain._callAPi(this.method, this._url(), this.params, this.onSuccess, this.onError, data,this.headers);
    this.executed = true;
  }

  response(){
    if(!this.domain){
      return {};
    }

    let namespace = this.domain.namespace(this.method, this._url(), this.params);
    let val = this.domain.read(namespace);
    return val ? val : {};
  }

  responseAfterExecute(){
    if(!this.executed){
      return {};
    }

    return this.response();
  }

  _url(){
    let cb = null;
    if(this.url_callback){
      cb = this.url_callback;
    }
    else{
      let { url } = this.domain.config;
      cb = url[this.url_label];
    }

    if(!cb){
      throw new Error(`URL not configured for label "${this.url_label}"`);
    }

    if(typeof cb == 'function'){
      return cb({
        identifier: this.identifier,
        params: this.params,
      });
    }

    return cb;
  }

  _retriveFromCache(cache_for_seconds){
    if(cache_for_seconds > 0){
      let curr_timestamp = new Date().getTime();

      let resp = this.response();
      let { success, timestamp } = resp;

      if(success && timestamp){
        let delta = (curr_timestamp - timestamp) / 1000;

        if(delta < cache_for_seconds){
          if(typeof this.onSuccess == 'function'){
            this.onSuccess(resp);
          }

          return true;
        }
      }
    }

    return false;
  }

  static list(domain){
    let action = ACTION_MAP['list'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }

  static post(domain){
    let action = ACTION_MAP['post'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }

  static detail(domain){
    let action = ACTION_MAP['detail'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }

  static put(domain){
    let action = ACTION_MAP['put'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }

  static patch(domain){
    let action = ACTION_MAP['patch'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }

  static delete(domain){
    let action = ACTION_MAP['delete'];
    return new RESTExecutor(action.http_method, action.url_label, domain);
  }
}

class NetworkDomain extends Domain{
  constructor(name, config, PersistorClass, network_request_maker,authenticator){
    super(name, config, PersistorClass);

    this.authenticator=authenticator;
    this.network_request_maker = network_request_maker;
    this.network_data_readers = {};

    this.namespace = this.namespace.bind(this);
  }

  namespace(method, url, params){
    return `_NETWORK_:${method.toUpperCase()}:${url}`;
  }

  _callAPi(method, url, params, onSuccess, onError, data,headers){

    let newHeaders = {};
    

    let { access_token } = this.authenticator.getTokens();
    if(access_token){
      newHeaders['Authorization'] = `Bearer ${access_token}`;
    }
    // console.log("SS HEADER",headers);
    newHeaders={Accept: 'application/json',...newHeaders,...headers};

    // let headers = { Accept: 'application/json' };

    // let { access_token } = this.authenticator.getTokens();

    // if(access_token){
    //   headers['Authorization'] = `Bearer ${access_token}`;
    // }

    // console.log("HEADER",newHeaders)
    let namespace = this.namespace(method, url, params);
    this._merge(namespace, start());

    let persistOnSuccess = (method == 'get');

    // console.log(
    //   'starting request',
    //   { method, url, params, data }
    // );

    this.network_request_maker({
      method: method,
      url: url,
      params: params,
      data: data,
      headers: newHeaders,
    }).then(
      (resp) => {
        let val = this._merge(
          namespace,
          success(resp),
          persistOnSuccess
        );

        // console.log(
        //   'got response from request',
        //   { method, url, params, data, resp }
        // );

        if(typeof onSuccess == 'function'){
          onSuccess(val, resp);
        }
      }
    ).catch(
      (error) => {
        // console.log(error, url, method, data, params);

        let error_data = {};
        // console.log(error.response)
        var isGettingNewToken=false;


        if(error.response){
          if(error.response.status=='422' || error.response.status=='401'){
            isGettingNewToken=true;
            RESTExecutor._waitingList.push(()=>this._callAPi(method, url, params, onSuccess, onError, data,headers));

            if(!RESTExecutor._locked){
            this.authenticator.refresh({
              successCallback:()=>{
              
                RESTExecutor.unLock()
              },
              errorCallback:()=>{
              
                RESTExecutor.reset()
              }

            
            });
      
            RESTExecutor.lock();
          }
          let dataError=error.response.data||{};
          let error_message=dataError.error_message||{};
          // console.log("ERROR MESSAGE",error_message)
          if(error_message.token_invalid || error_message.token_missing || error_message.token_expiry){
            // isGettingNewToken=true
            console.log(url)
            if(url!=='/refreshtoken'){
              isGettingNewToken=true;
            }
          }
          else{
            isGettingNewToken=false
          }
          }else if(error.response.status===404){
            console.log("error code is 404")
            error_data={
              ...error.response.data,
              not_found:true
            }

          }else if(error.response.status===500){
            console.log("error code is 500")
            error_data={
              ...error.response.data,
              server_error:true
            }
          }else if(error.response.status===403){
            console.log("error code is 403")
            error_data={
              ...error.response.data,
              no_access:true
            }

          }
          else
          error_data = error.response.data;
        }
        else if(error.code === 'ECONNABORTED'){
          error_data = { error_message: 'Request Timeout! Please try again.' };
        }
        else{
          error_data={error_message:"Could not connect to internet! Please try again",no_net:true}
        }

        let val = this._merge(
          namespace,
          errorFunc(error_data),
          persistOnSuccess ? false : undefined
        );

        console.log('error value', val);

        if(typeof onError == 'function' &&  !isGettingNewToken){
          onError(val, error);
        }
      }
    ).then(
      () => this._merge(namespace, complete())
    );
  }

  static create(name, config, PersistorClass, network_request_maker, authenticator){
    if(!/^[a-z][a-zA-Z]{3,}$/.test(name)){
      throw new Error(`Invalid domain name "${name}"`);
    }
    return new NetworkDomain(name, config, PersistorClass, network_request_maker, authenticator);
  }
}

export {
  RESTExecutor,
  NetworkDomain,
};
