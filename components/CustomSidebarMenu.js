import React, { Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avater} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

import firebase from 'firebase';
import db from '../config'

export default class CustomSidebarMenu extends Component{
  constructor(){
    super();
    this.state ={
      image:'#',
      userId:firebase.auth().currentUser.email,
      name:'',
      docId:''

    }
  }
  selectPicture = async() =>{
    const {cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],

    });
    if(!cancelled){
      this.uploadImage(uri, this.state.userId)
    }
  }

  uploadImage = async(uri, name) =>{
    let response = await fetch(uri);
    let blob = await response.blob();

    var ref = firebase.storage().ref().child('user_profile'+name);

    return ref.put(blob).then((response)=>this.fetch(name))
  }

  fetchImage = (name) =>{
    var storageRef = firebase.storage().ref().child('user_profile'+name);

    storageRef.getDownloadURL().then((url)=>{
      this.setState({image:url})
    })
    .catch(()=>{
      this.setState({image:'#'})
    })
  }

  getUserProfile(){
    db.collection('user').where("email","==", this.state.userId).get()
            .then((snapshot)=>{
                snapshot.forEach((doc) => {
                this.setState({
                    "name" : doc.data().first_name + " " + doc.data().last_name
                })
            });
        })
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
        <Text style={{fontWeight:100, fontSize:20, paddingTop:10}}>
          {this.state.name}
        </Text>
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
