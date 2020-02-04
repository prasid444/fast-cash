/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import NeuPressedView from './neu_pressedview'
import NeuUnpressedView from './neu_unpressedview'

export default class NeuView extends Component {
    render() {
        const pressed = this.props.pressed
        if (pressed) {
            return (
                <NeuPressedView {...this.props} />
            )
        }
        else {
            // let modifiedProps =  ...this.props 
            // if (modifiedProps.style.height) {
            //     modifiedProps.style.height -= 15
            // }
            return (
                <NeuUnpressedView {...this.props} />
            )
        }
    }
}