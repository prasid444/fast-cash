/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, SafeAreaView, Platform} from 'react-native';
import {Button} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
const SafeRenderer = props => {
  return <SafeAreaView style={{flex: 1}}>{props.children}</SafeAreaView>;
};

const Screen = props => {
  let Holder = View;
  let holderProps = {
    style: {
      height: Platform.OS == 'ios' ? 45 : 0,
    },
  };

  let header = null;
  if (props.header) {
    if (typeof props.header === 'function') {
      header = props.header({
        params: props.match.params,
      });
    } else {
      header = props.header;
    }
    header = React.cloneElement(header, {
      history: props.history,
    });
  }

  return (
    <View style={{flex: 1}}>
      {props.header && <Holder {...holderProps} />}
      <SafeRenderer asModal={props.isModal}>
        {header}
        <View
          style={{
            flex: 1,
            paddingLeft: props.isModal ? 8 : props.horizontalPadding,
            paddingRight: props.isModal ? 8 : props.horizontalPadding,
            paddingTop: props.isModal ? 10 : 0,
            paddingBottom: props.isModal ? 10 : 0,
          }}>
          {React.cloneElement(React.Children.only(props.children), {
            //    Other props when required
          })}
        </View>
      </SafeRenderer>

      {/* {
        props.withFooter && props.isModal != true &&
        <Footer
          history={props.history}
        />
      } */}

      {props.isModal == true && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            // backgroundColor:'red',
            marginTop: 0,
            alignSelf: 'flex-end',
          }}>
          <Button
            transparent={true}
            compact={true}
            style={{padding: 12}}
            onPress={() => props.history.goBack()}>
            <Entypo
              name="cross"
              size={28}
              style={{
                color: '#dddddd',
                backgroundColor: '#000000',
                borderRadius: 14,
              }}
            />
          </Button>
        </View>
      )}

      <StatusBar
        animated={true}
        showHideTransition="slide"
        barStyle="light-content"
        hidden={props.hideStatusBar == true || props.isModal == true}
      />
    </View>
  );
};

Screen.propTypes = {
  safeAreaMargin: PropTypes.number,
};

export default Screen;
