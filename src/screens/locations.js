import React, {Component} from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import {View, TextInput, FlatList, Text} from 'react-native';
import getData from '../utils/laundryViewEndpoint';

export default class Locations extends Component {

  state = { searchTerm: '', searchBarVisible: false, locations: [], loading: false };

  _handleToggleSearch = () => {
    this.setState({searchBarVisible: !this.state.searchBarVisible, searchTerm: ''});
  };

  _handleGetLocations = () => {
    this.setState({loading: true});
    getData('c_locations').then(res => this.setState({loading: false, locations: res}));
  };

  componentDidMount = () => {
    this._handleGetLocations();
  };

  render() {
    let {loading, searchTerm, searchBarVisible, locations} = this.state;
    let filteredLocations = [];
    locations.forEach(location => { if(location.school_name.toLowerCase().includes(searchTerm)) {filteredLocations.push(location);} });
    return (
        <View>
      <Appbar.Header>
        {searchBarVisible ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton icon={"magnify"} color={"white"}/>
          <TextInput
              onChangeText={text => this.setState({ searchTerm: text.toLowerCase() })}
              style={{padding: 0, flex: 1, backgroundColor: 'transparent', color: 'white', fontSize: 18}}
              placeholder={"Filter locations..."}
              placeholderTextColor={"white"}
              autoFocus
          />
          <IconButton icon={"close"} color={"white"} onPress={this._handleToggleSearch} animated={true}/></View> : <View style={{flexDirection: 'row', alignItems: 'center'}}><Appbar.Content title={'Locations'} />
            <Appbar.Action icon={"magnify"} color={"white"} onPress={this._handleToggleSearch}/></View>}
      </Appbar.Header>
          <FlatList data={filteredLocations} ListEmptyComponent={() => (!loading ? <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}><Text>No locations were found</Text></View> : <View/>)} ItemSeparatorComponent={() => <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#000",
              }}
          />} keyExtractor={item => item.school_desc_key} renderItem={({item}) => <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}><Text style={{fontSize: 25, flex: 1}} ellipsizeMode='tail' numberOfLines={1}>{item.school_name}</Text><IconButton icon={"chevron-right"} color={"black"}/></View>}/>
        </View>
    );
  }
}
