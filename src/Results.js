//import liraries
import React, { Component, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Loader from './Loader';
import LottieView from 'lottie-react-native';

// create a component
const Results = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [healthStatus, setHealthStatus] = useState('')
    const [bmi, setBmi] = useState()
    const { wieghtData, heightData } = route.params;
    // const { height } = route.params;
    const animation = useRef(null);

    const calculate = async () => {
        setLoading(true)
        console.log(" --" + wieghtData);
        console.log(" --" + heightData);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '049a6e3f41mshd5ebf0fd567aaa5p1f657ajsn31890da6fdf9',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        };

        fetch('https://fitness-calculator.p.rapidapi.com/bmi?age=25&weight=' + wieghtData + '&height=' + heightData, options)
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                setHealthStatus(response.data.health)
                setBmi(response.data.bmi)
                console.log(response.data.health);
            })
            .catch(err => console.error(err));

        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'X-RapidAPI-Key': '049a6e3f41mshd5ebf0fd567aaa5p1f657ajsn31890da6fdf9',
        //             'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
        //         }
        //     };

        //     fetch('https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=100&height=1.811', options)
        //         .then(response => response.json())
        //         .then((response) => {

        //             console.log(response)
        //             setLoading(false)
        //             // navigation.navigate('Results')
        //         })
        //         .catch(err => console.error(err.message));
    }

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        calculate()
    }, []);

    const ResultView = () => {
        return (
            <View style={styles.resultsCard}>

                <Text  style={[styles.category, healthStatus == 'Normal' ? styles.normalCategory : healthStatus == 'Overweight' ? styles.overweightCategory : healthStatus == ' Obese Class II' ? styles.obesityCategory : styles.category ]}>
                    {healthStatus}
                </Text>
                <Text style={styles.bmi}>{bmi}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {!loading
                ? <View style={{}}>
                    <Text style={{ color: 'white', fontSize: 18, margin: 24, marginTop: 60 }}>Your results</Text>
                    {/* <Text>{healthStatus}</Text> */}
                    <ResultView ></ResultView>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Recalculate</Text>
                    </TouchableOpacity>
                </View>
                : <Loader></Loader>

            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#0B0C20',
    },
    button: {
        width: '90%',
        backgroundColor: '#15B8A7',
        color: 'white',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },
    resultsCard: {
        // backgroundColor:''
        height: '75%',
        width: '90%',
        alignContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#1E1F32',
        borderRadius: 16,
        justifyContent: 'center'
    },
    bmi: {
        color: 'white',
        fontSize: 64,
       margin:90,
       fontWeight:'200'
    },
    category: {
        fontWeight: '500',
        fontSize: 24,
        // color:'yellow'

    },
    normalCategory:{
        color:'green'
    },
    overweightCategory:{
        color:'yellow'
    },
    obesityCategory:{
        color:'red'
    },
   


});

//make this component available to the app
export default Results;
