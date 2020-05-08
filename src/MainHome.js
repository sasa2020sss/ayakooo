import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppState} from 'react-native';
import BottomStack from '../src/screens/BottomStack';
// import screen
import Login from '../src/screens/LoginScreen';
import Register from '../src/screens/Register';
import ForgotPassword from '../src/screens/ForgotPassword';
import ForgotPassword2 from '../src/screens/ForgotPassword2';
import Chat from '../src/screens/Chat';
import RoomChat from '../src/screens/RoomChat';
import FriendProfile from '../src/screens/FriendsProfile';
import Maps from '../src/screens/maps';
import UpdateProfile from '../src/screens/UploadProfile';
import database from '@react-native-firebase/database';
import {setLogin} from '../src/redux/actions/ActionsAuth';
import {connect} from 'react-redux';
import UpdateBiodata from './screens/UpdateBiodata';

const Stack = createStackNavigator();

class MainHome extends Component {
  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
    if (nextAppState === 'background') {
      database()
        .ref(`users/${this.props.user.users.uid}`)
        .update({
          status: 'Offline',
        })
        .then(() => console.log('Data updated., Background'));
    } else if (nextAppState === 'active') {
      database()
        .ref(`users/${this.props.user.users.uid}`)
        .update({
          status: 'Online',
        })
        .then(() => console.log('Data updated., ACtive'));
    }
  };
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', this._handleAppStateChange);
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.user.isLogin ? (
            <Stack.Screen
              name="Home"
              component={BottomStack}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
              />
            </>
          )}
          <Stack.Screen
            name="Room Chat"
            component={RoomChat}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Maps"
            component={Maps}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Friend Profile"
            component={FriendProfile}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Update Profile"
            component={UpdateProfile}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Update Biodata"
            component={UpdateBiodata}
            options={{headerShown: true}}
          />

          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Make Password"
            component={ForgotPassword2}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};
export default connect(mapStateToProps, {setLogin})(MainHome);
