//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';

// create a component
const Loader = () => {
    const animation = useRef(null);
    return (
        <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        //   backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/loading1.json')}
      />
  
    </View>
  
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
     
        backgroundColor: '#2c3e50',
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',

      },
});

//make this component available to the app
export default Loader;
