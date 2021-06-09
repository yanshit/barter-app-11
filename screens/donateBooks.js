import React from 'react';
import { StyleSheet, Text, View, ListItem, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'; 
import db from '../config';
import firebase from 'firebase';

var use = false;

export default class DonateBooks extends React.Component {
  constructor(){
    super();
    this.state={
      search:'',
      value:'',
      allTransactions:[],
      lastTransaction:null,
    }
  }

  fetchTransaction = async () => {
    if(use == true){
     const query2 = await db.collection('requestedItems').startAfter(this.state.lastTransaction).limit(1).get();

    query2.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastTransaction: doc ,
      });
    });

    }
   
  }

  retriveStory = async () => {
    this.setState({
      search:'',
    })
    use = true;

    this.setState({
      allTransactions:[]
    })
    
    const query = await db.collection('requestedItems').limit(11).get();

    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastTransaction: doc ,
      });
    });
    
  };

   searchFilter = async (searchText) => {
     
     use = false;
     this.setState({
       allTransactions:[],
     })
    var enterText = searchText;
    if(enterText == searchText){
      const transaction = await db.collection("requestedItems").where("ItemType","==",searchText).get();
      transaction.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data() ],
      });

    });

    }  }
  
  render() {
    return(
      <View style={{flex:1}} >
         <SearchBar
        placeholder="Item you want to Donate" 
        onChangeText={(e)=>this.setState({search:e})} 
        value={this.state.search}
        lightTheme
        inputStyle={{color:'#444'}}
      />

     <TouchableOpacity style={{backgroundColor:'#f47b9d', height:25, borderRadius:5, width:145}}
     onPress={()=>{this.searchFilter(this.state.search)}}
     >
      <Text style={{textAlign:'center',color:'white', paddingTop:2}}>Search</Text>
     </TouchableOpacity>

     <TouchableOpacity style={{backgroundColor:'#f47b9d', height:25, borderRadius:5,marginTop:10, width:145, marginLeft:160,}} 
     onPress={()=>{this.retriveStory()}}
     >
      <Text style={{textAlign:'center',color:'white', paddingTop:2}}>Show All</Text>
     </TouchableOpacity> 

      

     <FlatList
        data={this.state.allTransactions}
        renderItem={({ item }) => (
          <TouchableOpacity>
          <View style={{ borderBottomWidth:  5, borderColor:'#f47b9d',}}>
            <Text style={{paddingTop:10, fontSize:15, paddingBottom:3 }}>{'Item Type : ' + item.ItemType}</Text>
            <Text style={{paddingBottom:3, fontSize:15}}>{'Item Details : ' + item.ItemDetails}</Text>

<Text style={{ paddingBottom:10, fontSize:15}}>{'Reason To Request : ' + item.ReasonToRequest}</Text>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.fetchTransaction}
        onEndReachedThreshold={0.7}
      />

      </View>
    );
  }
}
