/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Thumbnail } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../pages/workspace/WorkspaceSelector';
import {Image} from 'react-native';

const guide_list = [
    {
        title:'Welcome to ShareEx',
        description:'You can add room expenses, roommates and keep track of everything in this app.',
        imageURL:require('../assets/tab1.png')
    },
    {
        title:'Keep tab of your expenses',
        description:'You can add room expenses, roommates and keep track of everything in this app.',
        imageURL:require('../assets/tab2.png')
    },
    {
        title:'Keep tab 2',
        description:'You can add room expenses, roommates and keep track of everything in this app.',
        imageURL:require('../assets/tab1.png')
    },
];
export class GuideCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
             active_slider:0,
        };
    }
    _renderItem ({item, index}) {
        return <View style={{
            // backgroundColor:'red',
            height:'100%',
            paddingLeft:16,
            paddingRight:16,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
            // margin:'5%'
        }}>

        <Image style={{
            height:'70%',
            resizeMode:'contain'
        }} source={item.imageURL} />
    <Text style={{
        textAlign:'center',
        fontSize:31,
        fontWeight:'bold'
    }}>{item.title}</Text>
    <Text style={{
        textAlign:'center',
        fontSize:16,
        // fontWeight:'bold'
    }}>{item.description}</Text>
        </View>;
    }

    render() {
        return (
            <View style={{
                display:'flex',
                flexDirection:'column',
                flexWrap:'wrap',
            }}>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={guide_list}
                  containerCustomStyle={{
                    //   backgroundColor:'blue',
                      height:'88%',
                    //   padding:40
                  }}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={sliderWidth}
                  layout={'default'}
                  firstItem={this.state.active_slider}
                  // hasParallaxImages={true}
                  // firstItem={this.state.active_slider}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  // containerCustomStyle={{
                  //   marginTop: 15,
                  //   overflow: 'visible'
                  // }}
                  // contentContainerCustomStyle={{
                  //   paddingVertical: 10
                  // }}
                  loop={true}
                  // loopClonesPerSide={2}
                  autoplay={true}
                  // autoplayDelay={500}
                  // autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ active_slider: index }) }
                />
                <View>
                <Pagination
                containerStyle={{
                    // height:10,
                    //  backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 4,
                    // backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}

                dotsLength={guide_list.length}
                activeDotIndex={this.state.active_slider}
                />
                </View>
            </View>
        );
    }
}

export default GuideCard;
