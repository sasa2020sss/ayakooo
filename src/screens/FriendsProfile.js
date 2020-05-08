import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import MapView from 'react-native-maps';

export default class FriendsProfile extends Component {
  state = {
    latitude: 0,
    longitude: 0,
  };

  render() {
    const marker = (
      <>
        <MapView.Marker
          coordinate={{
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
          }}
          title={this.props.route.params.name}
          description="My Location">
          <Image
            source={{uri: this.props.route.params.picture}}
            style={{
              width: 46,
              height: 48,
              borderRadius: 40,
              borderColor: '#FF941F',
              borderWidth: 3,
            }}
            identifier={this.props.route.params.name}
          />
        </MapView.Marker>
      </>
    );
    return (
      <View>
        <View>
          <View style={styles.containerMaps}>
            <MapView
              style={styles.map}
              showsUserLocation
              zoomControlEnabled
              minZoomLevel={15}
              initialRegion={{
                latitude: this.props.route.params.latitude,
                longitude: this.props.route.params.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {marker}
            </MapView>
          </View>
        </View>
        <View>
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Avatar
                source={{uri: this.props.route.params.picture}}
                size="large"
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
              <View style={{flexDirection: 'row', marginLeft: 16}}>
                <View>
                  <View>
                    <Text style={styles.label}>Name</Text>
                    <Text style={{marginBottom: 5}}>
                      {this.props.route.params.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.label}>Email</Text>
                    <Text style={{marginBottom: 5}}>
                      {this.props.route.params.email}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.label}>Phone </Text>
                  <Text>{this.props.route.params.phone}</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMaps: {
    height: 340,
  },
  label: {
    fontSize: 12,
    marginBottom: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
