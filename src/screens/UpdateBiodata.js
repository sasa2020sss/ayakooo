import React, {Component} from 'react';
import {View} from 'react-native';
import {Input, Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {loadDataUser} from './../redux/actions/ActionsAuth';

class UpdateBiodata extends Component {
  state = {
    name: this.props.route.params.users.name,
  };

  onSubmitData = () => {
    database()
      .ref(`users/${this.props.route.params.users.uid}`)
      .update({
        name: this.state.name,
      })
      .then(() => {
        this.props.loadDataUser(this.props.route.params.users.uid);
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View>
        <Card>
          <Input
            containerStyle={{marginVertical: 10}}
            label="Name"
            placeholder="Name"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Button title="update" onPress={this.onSubmitData} />
        </Card>
      </View>
    );
  }
}
export default connect(null, {loadDataUser})(UpdateBiodata);
