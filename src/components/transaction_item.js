import React, {Component} from 'react';
import {View, Text, Thumbnail, H1, H3, H2, Badge} from 'native-base';
import moment from 'moment';

const MAX_FRIEND_TO_SHOW = 2;
const friends = [
  'Prasidha Karki',
  'Bikram Adhikari',
  'Enish Paneru',
  'Anuj Poudel',
];
class TransactionItem extends Component {
  render() {
    let data = this.props.data || {};
    let total_members_length = this.props.total_members || 0;
    let shared_members = data.transaction_members || [];
    let creator=data.creator_member||{};
    let payer=data.payer_member||{};
    let payer_name="";
    if (creator.id && creator.id == payer.id) {
      payer_name = creator.user && creator.user.full_name;
    } else if (creator.id && creator.id != payer.id) {
      payer_name=`${creator.user && creator.user.full_name} ( ${payer.user && payer.user.full_name})`
    }
    return (
      <View
        style={{
          width: '100%',
          borderRadius: 10,
          backgroundColor: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
        {this.props.isActivity && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 4,
              flex: 1,
              width: '100%',
              backgroundColor: 'rgba(5, 196, 107, 0.6)',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
        )}
        <View
          style={{
            padding: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Thumbnail
            source={{
              uri:
                'https://facebook.github.io/react-native/docs/assets/favicon.png',
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingLeft: 16,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                // backgroundColor:'red',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor:'white',
                }}>
                <H2 style={{fontWeight: 'bold'}}>{data.particulars}</H2>
                <Text
                  style={{
                    opacity: 0.6,
                  }}>
                  {payer_name}
                </Text>
              </View>
              <View
                style={
                  {
                    // backgroundColor:'green',
                  }
                }>
                <H2
                  style={{
                    color: '#82589F',
                    fontWeight: 'bold',
                  }}>
                  Rs. {data.amount}
                </H2>
                <Text style={{opacity: 0.6, textAlign: 'right'}}>
                  {moment(data.done_at, 'YYYY-MM-DD HH:mm').format('DD MMM')}
                </Text>
              </View>
            </View>
            <View
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {total_members_length == shared_members.length ? (
                <Badge style={{backgroundColor: '#82589F', margin: 2}}>
                  <Text style={{color: 'white'}}>All</Text>
                </Badge>
              ) : (
                shared_members.map((item, index) => {
                  let user = item.user || {};
                  let name = user.full_name || '';
                  let nameArray = name.split(' ');
                  if (index < MAX_FRIEND_TO_SHOW) {
                    return (
                      <Badge style={{backgroundColor: '#82589F', margin: 2}}>
                        <Text style={{color: 'white'}}>
                          {nameArray[0]} {(nameArray[1] || '').charAt(0)}.
                        </Text>
                      </Badge>
                    );
                  } else if (index == MAX_FRIEND_TO_SHOW) {
                    return (
                      <Badge style={{backgroundColor: '#82589F', margin: 2}}>
                        <Text style={{color: 'white'}}>{`+${friends.length -
                          MAX_FRIEND_TO_SHOW}`}</Text>
                      </Badge>
                    );
                  }
                })
              )}
              {/* SHARES FRIEND */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default TransactionItem;
