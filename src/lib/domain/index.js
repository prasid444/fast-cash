/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import axios from 'axios';

import Domain from './domain';
import { DomainProvider, withDomains } from './provider';
import { NetworkDomain, RESTExecutor } from './networkDomain';
import { WebPersistor, ReactNativePersistor } from './persistor';
import Authenticator from './authenticator';
function createNetworkRequestMaker(network_config){
  let { base_url, response_formatter } = network_config;

  let request_maker = axios.create({
    baseURL: base_url,
    timeout: 60000,
    transformResponse: [
      function(resp){
        if(typeof response_formatter == 'function'){
          return response_formatter(resp);
        }

        return resp;
      }
    ]
  });

  request_maker.interceptors.request.use(
    function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    }
  );

  request_maker.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return request_maker;
}

class DomainHolder{
  constructor({
    development_mode,
    target,
    network_config,
    auth_config,
  })
  {
    this.development_mode = development_mode;
    this.target = target;
    this.auth_config = auth_config;

    this.domains = {};

    this.build = this.build.bind(this);
    this.initialize = this.initialize.bind(this);
    this.getDomain = this.getDomain.bind(this);

    this.network_req_mkr = createNetworkRequestMaker(network_config);
    this.authenticator = new Authenticator(this.auth_config, this.initialize);
  }

  _checkDomain(name){
    if(this.domains[name]){
      throw new Error(`Domain with name "${name}" already exists.`)
    }
  }



  _buildAuth(persistor){
    let domainName = this.auth_config.network.domain_name;
    if(!domainName){
      domainName = 'auth';
    }

    const authDomain = NetworkDomain.create(
      domainName,
      this.auth_config.network,
      persistor,
      this.network_req_mkr,
      this.authenticator
    );

    this.authenticator.connect(authDomain);
    this.domains[domainName] = authDomain;
  }

  build({ basic, network }){
    let persistor = null;
    if(this.target == 'web'){
      persistor = WebPersistor;
    }
    else if(this.target == 'react-native'){
      persistor = ReactNativePersistor;
    }


    this._buildAuth(persistor);

    Object.keys(basic).map(
      (item) => {
        this._checkDomain(item);
        let config = basic[item];
        this.domains[item] = Domain.create(item, config, persistor);
      }
    );

    Object.keys(network).map(
      (item) => {
        this._checkDomain(item);
        let config = network[item];
        this.domains[item] = NetworkDomain.create(
          item,
          config,
          persistor,
          this.network_req_mkr,
          this.authenticator
        );
      }
    );
  }

  initialize(){
    Object.values(this.domains).forEach(
      (domain) => domain.purge()
    );
  }

  getDomain(name){
    let domain = this.domains[name];
    if(!domain){
      throw new Error(`Can't retrieve a non-existant domain "${name}".`)
    }

    return domain;
  }
}

export {
  Authenticator,
  RESTExecutor,
  withDomains,
  DomainHolder,
  DomainProvider,
};
