import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class maps extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    Geolocation.watchPosition((info) => console.log(info));
    this.getDataUser();
  }

  getDataUser() {
    database()
      .ref('users/')
      .on('value', (snapshot) => {
        const current_user = auth().currentUser.uid;
        console.log('hahaha', current_user);
        const data = snapshot.val();
        const user = Object.values(data);
        const result = user.filter((user) => user.uid !== current_user);
        this.setState({
          users: result,
        });
      });
  }
  render() {
    const marker = this.state.users.map((item) => (
      <MapView.Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.name}
        description="My Location">
        <Image
          source={{uri: item.picture}}
          style={{width: 30, height: 38, borderRadius: 40}}
        />
      </MapView.Marker>
    ));
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          zoomControlEnabled
          minZoomLevel={0}
          initialRegion={{
            latitude: -6.6211252,
            longitude: 106.818001,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {marker}
        </MapView>
      </View>
    );
  }
}

// [Thu Apr 23 2020 04:58:43.765]  LOG      {"coords": {"accuracy": 31.336000442504883, "altitude": 0, "heading": 0, "latitude": -6.6211252, "longitude": 106.818001, "speed": 0}, "mocked": false, "timestamp": 1587592354689}
