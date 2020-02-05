/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import ShareEXApp from './src/app';
import appRoutes, { defaultRoute, defaultWorkspaceRoute } from './src/routes';

import { Root } from 'native-base';

import APP_CONFIG from './src/config';
import { DomainHolder, DomainProvider } from './src/lib/domain';
import { basicDomains, networkDomains } from './src/domains';
import LoginPage from './src/pages/login';
import { SafeAreaView } from 'react-native';

let { dev, target, network, auth,workspace } = APP_CONFIG;


// console.log("pre building holder")

console.disableYellowBox = true;


const domainHolder = new DomainHolder(
    {
      development_mode: dev,
      target: target,
      network_config: network,
      auth_config: auth,
      workspace_config: workspace
    }
  );
  // console.log("building holder")

  domainHolder.build({ basic: basicDomains, network: networkDomains });



class App extends React.Component {
  render(){

  return (
    <DomainProvider holder={domainHolder}>
       <Root>
       <ShareEXApp
      routes={appRoutes}
      defaultRoute={defaultRoute} // /landing,
      defaultWorkspaceRoute={defaultWorkspaceRoute}
      />
      </Root>
  </DomainProvider>
   
  );
  }
};
export default App;
