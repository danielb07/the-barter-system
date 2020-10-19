import React, { Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avater} from 'react-native-elements'
// import * as ImagePicker from 'expo-image-picker'

import firebase from 'firebase';

export default class CustomSidebarMenu extends Component{
  constructor(){
    super();
    this.state ={
      image:''
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <Avater
        rounded
        source={{
          uri:this.state.image
        }}
        size="medium"
        onPress={()=>this.selectPicture()}

        showEditButton
        />
        <DrawerItems {...this.props}/>
        <View style={{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
          <TouchableOpacity style={{justifyContent:'center',padding:10,height:30,width:'100%'}}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
