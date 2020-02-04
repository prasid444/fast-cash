import React, { Component } from 'react';

import DomainWrapper from './wrapper';

const DomainContext = React.createContext();

class DomainProvider extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <DomainContext.Provider value={this.props.holder}>
        {
          this.props.children
        }
      </DomainContext.Provider>
    );
  }
}


function withDomains(WrappedComponent, ...args){
  return (
    (props) => {
      return (
        <DomainContext.Consumer>
          {
            (holder) => {
              return (
                <DomainWrapper
                  holder={holder}
                  connectTo={args}
                  wrapperComponent={WrappedComponent}
                  wrappedComponentProps={props}
                />
              );
            }
          }
        </DomainContext.Consumer>
      );
    }
  );
}

export { DomainProvider, withDomains };
