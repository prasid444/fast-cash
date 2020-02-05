/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NativeRouter, Route, withRouter, Redirect } from 'react-router-native';
import Stack from 'react-router-native-stack';

import Screen from './components/screen';
import { withDomains } from './lib/domain';
import { defaultRoute, defaultWorkspaceRoute, defaultHomepageRoute } from './routes';
import { BackHandler } from 'react-native';

const SAFE_AREA_MARGIN = 8;
const HORIZONTAL_PADDING = 0;

class _StackWrapper extends Component {

    render() {
        return this.props.children;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));

    }
    handleBackButton() {
        let pathName = this.props.history.location.pathname;
        if (pathName == '/' || pathName == defaultRoute || pathName == defaultWorkspaceRoute||pathName==defaultHomepageRoute) {
            BackHandler.exitApp();
        } else {
            this.props.history.goBack();
            return true;
        }
    }
}
const StackWrapper = withRouter(_StackWrapper);

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // SplashScreen.hide();
    }

    render() {
        let { routes } = this.props;
        let { authenticator, workspace_handler } = this.props;
        return (
            <NativeRouter >
                <StackWrapper>
                    <Stack
                        // gestureEnabled={false}
                        stackViewStyle={{ backgroundColor: 'rgba(245, 245, 245,1)' }}
                    >
                        {
                            Object.keys(routes).map(
                                (path, index) => {
                                    let config = routes[path];

                                    return (
                                        <Route
                                            key={path}
                                            path={path}
                                            animationType={config.asModal ? 'slide-vertical' : 'slide-horizontal'}
                                            component={createScreen({
                                                Config: config,
                                                authenticator: authenticator,
                                                workspace_handler: workspace_handler,
                                                all_config:routes
                                            })}
                                        />
                                    );
                                }
                            )
                        }
                        <Route exact
                            path="/"
                            component={createScreen({
                                Config: routes[defaultRoute],
                                authenticator: authenticator,
                                workspace_handler: workspace_handler,
                                all_config:routes
                            })}
                        />
                    </Stack>
                </StackWrapper>
            </NativeRouter>
        );
    }
}

export default withDomains(App, 'appAuth','workspace');

const createScreen = ({ Config, authenticator, workspace_handler,all_config }) => {
    if (!Config) {
        throw new Error('Invalid Config!');
    }

    return (
        withRouter(function (props) {
            if (Config.requireAuth === true && !authenticator.isAuthenticated()) {
                // Config=all_config[defaultRoute];
                return (
                    <Redirect to={defaultRoute} />
                );
            }
            if (Config.requireWorkspace === true && !workspace_handler.isSelected()) {
                // Config=all_config[defaultHomepageRoute];
                return (
                    <Redirect to={defaultWorkspaceRoute} />
                );
            }
            return (
                <Screen
                    safeAreaMargin={SAFE_AREA_MARGIN}
                    horizontalPadding={HORIZONTAL_PADDING}
                    header={Config.header}
                    withHeader={Config.withHeader}
                    withFooter={Config.withFooter === false ? false : true}
                    hideStatusBar={Config.hideStatusBar}
                    isModal={Config.isModal}
                    history={props.history}
                    match={props.match}
                >
                    <Config.component
                        {...props}
                    />
                </Screen>
            );
        }
        ));
};
