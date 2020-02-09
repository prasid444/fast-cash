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
import { Text, View, StyleSheet } from 'react-native'

export default class NeuUnpressedView extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={[styles.startShadow, this.props.style, { height: this.props.style?this.props.style.height ? this.props.style.height - 15 : 50:50 }]}>
                    <View style={[styles.endShadow, this.props.style, this.props.contentStyle, { height:this.props.style? this.props.style.height ? this.props.style.height - 15 : 50:50 }]}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        padding: 7,
        width: '100%',
        paddingHorizontal: 14,
    },
    startShadow: {
        height: 50,
        backgroundColor: '#e0e5ec',
        shadowColor: 'white',
        shadowRadius: 8,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: -9,
            height: -9
        },elevation:2
    },
    endShadow: {
        height: 50,
        backgroundColor: '#e0e5ec',
        shadowColor: '#a3b1c6',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 9,
            height: 9
        },
        justifyContent: 'center',
        alignItems: 'center',
        elevation:2,
        borderColor:'red',
        borderWidth:0    
    }
})
