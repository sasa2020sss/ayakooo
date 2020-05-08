import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconHistory from 'react-native-vector-icons/FontAwesome5';
import IconMaps from 'react-native-vector-icons/MaterialCommunityIcons';
import IconUser from 'react-native-vector-icons/AntDesign';
import IconChat from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import Chat from './Chat';
import Maps from './maps';

const BottomTab = createBottomTabNavigator();

class BottomStack extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <IconChat name="ios-chatbubbles" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          component={Maps}
          name="Maps"
          options={{
            tabBarLabel: 'Maps',
            tabBarIcon: ({color, size}) => (
              <IconMaps name="google-maps" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          component={Profile}
          name="Profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <IconUser name="user" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
export default BottomStack;
