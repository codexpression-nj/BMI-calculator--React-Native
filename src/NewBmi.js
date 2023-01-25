//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

// create a component
const NewBmi = () => {
    const calculate = async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '049a6e3f41mshd5ebf0fd567aaa5p1f657ajsn31890da6fdf9',
                'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
            }
        };

        fetch('https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=100&height=1.811', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    return (
        <View >
            <Text>NewBmi</Text>
            <TextInput placeholder='hieght'></TextInput>
            <TextInput placeholder='wieght'></TextInput>
            <TouchableOpacity onPress={() => calculate()}>
                <Text>Click</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default NewBmi;
