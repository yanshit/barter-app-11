import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class ItemRequest extends React.Component {

  constructor(){
    super();
    this.state={
      userID:firebase.auth().currentUser.email,
      itemType:'',
      itemDetails:'',
      reasonToRequest:'',
    }
  }

  createUniqueID = () => {
    return Math.random().toString(36).substring(7) ; 
  }

  addRequest = (itemType, reasonToRequest, details) => { 

    if(this.state.itemType !== '' && this.state.reasonToRequest !== '' && this.state.itemDetails !== '' ){
    var userID = this.state.userID;
    var randomRequestID = this.createUniqueID();
    db.collection("requestedItems").add({
      "userID":userID,
      "ItemType":itemType,
      "ReasonToRequest":reasonToRequest,
      "ItemDetails":details,
      "RequestID":randomRequestID,
    })
    this.setState({
      itemType:'',
      reasonToRequest:'',
      itemDetails:'',
    })

    return alert("Item Requested Successfully");
    }else {
      alert("Please fill the details properly")
    }

  }

  render(){
  return (
    <View style={{flex:1}} >
     <KeyboardAvoidingView style={styles.keyBoardStyle} >
      <TextInput 
        placeholder={"Enter Item Type"}
        onChangeText={(e)=>{this.setState({itemType:e})}}
        value={this.state.itemType.toLocaleLowerCase()}
        style={styles.formTextInput}
       />
         <TextInput 
        placeholder={"Why do you need that Item"}
        multiline
        numberOfLines={5}
        onChangeText={(e)=>{this.setState({reasonToRequest:e})}}
        value={this.state.reasonToRequest}
        style={[styles.formTextInput, {height:100}]}
       />

          <TextInput 
        placeholder={"Details of the item you want"}
        multiline
        numberOfLines={5}
        onChangeText={(e)=>{this.setState({itemDetails:e})}}
        value={this.state.itemDetails}
        style={[styles.formTextInput, {height:150}]}
       />

       <TouchableOpacity onPress={()=>{
        this.addRequest(this.state.itemType, this.state.reasonToRequest, this.state.itemDetails)
       }} style={styles.button}  > 
        <Text style={{color:'white',fontSize:20}} >Request</Text>
       </TouchableOpacity>

     </KeyboardAvoidingView>
    </View>
  );
  }
}




const styles = StyleSheet.create({
  button: {
    width: "75%",
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: "#00adb5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20,
    textAlign:"center",
    marginBottom:50,
  },
  formTextInput: {
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#00adb5',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
})



