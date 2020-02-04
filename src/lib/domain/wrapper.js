import React, { Component } from 'react';

class DomainWrapper extends Component{
  constructor(props){
    super(props);

    this.state = {
      version: new Date().getTime(),
    };

    this.domainProps = {};
    this.unSubscribers = [];
    this.mounted = false;
  }

  UNSAFE_componentWillMount(){
    let { holder } = this.props;

    this.domainProps = this.props.connectTo.reduce(
      (acc, domain_name) => {
        let callback = () => {
          this.mounted && this.setState({ version: new Date().getTime() });
        };

        let domain = holder.getDomain(domain_name);
        let label = new Date().getTime();
        this.unSubscribers.push(domain.subscribe(label, callback));
        acc[domain_name] = domain

        return acc;
      },
      {}
    );

    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
    this.unSubscribers.forEach(
      (unsubscribe) => typeof unsubscribe == 'function' && unsubscribe()
    );
  }

  render(){
    return (
      <this.props.wrapperComponent
        { ...this.props.wrappedComponentProps }
        authenticator={this.props.holder.authenticator}
        workspace_handler={this.props.holder.workspace_handler}
        domains={this.domainProps}
        version={this.state.version}
      />
    );
  }
}

export default DomainWrapper;
