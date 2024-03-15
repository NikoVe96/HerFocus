import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faCircleLeft} from '@fortawesome/free-solid-svg-icons';

export const TopNavigation = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faCircleLeft} size={30} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Image
          source={require('../Assets/images/logo_light_mode_simple-removebg-preview.png')}
          style={{width: 110, height: 30}}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;
