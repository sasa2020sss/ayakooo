import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Avatar, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEdit from 'react-native-vector-icons/AntDesign';
import IconPhone from 'react-native-vector-icons/Entypo';
import {setLogin, setLogOut} from '../redux/actions/ActionsAuth';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

class Profile extends Component {
  state = {
    users: [],
  };

  onHandleToUpdateBiodata = () => {
    const data = {
      users: this.props.user.users,
    };
    this.props.navigation.navigate('Update Biodata', data);
  };
  onHandleToUpdateProfile = () => {
    const data = {
      users: this.props.user.users,
      image: this.props.user.users.picture,
    };
    this.props.navigation.navigate('Update Profile', data);
  };
  render() {
    console.log(this.props.logout);

    return (
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity onPress={this.onHandleToUpdateProfile}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: this.props.user.users.picture,
                // ? this.props.route.params.image
                // : this.props.user.users.picture,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.onHandleToUpdateBiodata}>
            <Input
              containerStyle={{marginVertical: 10}}
              label="Name"
              leftIcon={<Icon name="user" size={23} color="black" />}
              rightIcon={<IconEdit name="edit" color="black" size={25} />}
              disabled={true}
              value={this.props.user.users.name}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Input
            containerStyle={{marginVertical: 10}}
            label="Phone"
            leftIcon={<IconPhone name="phone" size={24} color="black" />}
            disabled={true}
            value={this.props.user.users.phone}
          />
        </View>

        <Button
          containerStyle={{marginTop: 10}}
          title="LogOut"
          onPress={() => this.props.setLogOut()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  logout: state.login.isLogin,
  user: state.login,
});

export default connect(mapStateToProps, {setLogOut, setLogin})(Profile);
