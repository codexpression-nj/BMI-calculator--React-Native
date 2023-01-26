//import liraries
import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loader from './Loader';

// create a component
const Results = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const calculate = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '049a6e3f41mshd5ebf0fd567aaa5p1f657ajsn31890da6fdf9',
                'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
            }
        };

        fetch('https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=100&height=1.811', options)
            .then(response => response.json())
            .then((response) => {

                console.log(response)
                setLoading(false)
                // navigation.navigate('Results')
            })
            .catch(err => console.error(err.message));
    }

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        calculate()
      }, []);


    return (
        <View style={styles.container}>
            {!loading
                ? <>
                <Text style={{ color: 'white' }}>Results</Text>

                </>
                :<Loader></Loader>

            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2938',
    },
});

//make this component available to the app
export default Results;
