import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function Home() {
    return (
     <View style={styles.container}>
         <Text style={styles.text}>Welcome to StaySafe</Text>
         <View style={styles.container}>
         <Image source={{uri:'https://imgur.com/QJuFcHy.jpg'}} style={styles.img}/>
         </View>
     </View>
    );
  };

  const styles=StyleSheet.create({
      container:{
          flex: 1,
          alignItems:'center',
          backgroundColor:'#00203FFF',
          justifyContent: 'center',
          alignItems: 'center',
        
      },
      text: {
          color:'#ADEFD1FF',
          fontSize: 40,
      },
      img: {
          width:300,
          height:300,
          justifyContent: 'center',
          alignItems: 'center',
          
      },
  });