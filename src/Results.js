//import liraries
import React, { Component, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Loader from './Loader';
import LottieView from 'lottie-react-native';

// create a component
const Results = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [healthStatus, setHealthStatus] = useState('')
    const [bmi, setBmi] = useState()
    const [error, setError] = React.useState(null);
    const { wieghtData, heightData, ageData } = route.params;
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
   
    const calculate = async () => {
        setLoading(true)
        const url = `https://fitness-calculator.p.rapidapi.com/bmi?age=${ageData}&weight=${wieghtData}&height=${heightData}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                if (response.status_code === 422) {
                    setError(response.errors);
                    setLoading(false)
                    console.log(response.errors);
                } else {
                    setHealthStatus(response.data.health)
                    setBmi(response.data.bmi)
                    console.log(response.data.bmi);
                }
                setLoading(false)

            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        calculate()
    }, []);

    const ResultView = () => {
        return (
            <View style={styles.resultsCard}>
                <Text style={[styles.category, healthStatus == 'Normal' ? styles.normalCategory : healthStatus == 'Overweight' ? styles.overweightCategory : healthStatus == ' Obese Class II' ? styles.obesityCategory : styles.category]}>
                    {healthStatus}
                </Text>
                <Text style={styles.bmi}>{bmi}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {!loading
                ? <>
                    {error

                        ? <View style={styles.resultsCard}>
                            <Text style={{ color: 'white', fontSize: 18, margin: 24, marginTop: 60 }}>Ooops...</Text>
                            <Text style={{ textAlign: "center", color: 'white', fontSize: 18, margin: 30, marginTop: 60 }}>{error[0]}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Recalculate</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <Text style={{ color: 'white', fontSize: 18, margin: 24, marginTop: 60 }}>Your results</Text>
                            <ResultView ></ResultView>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Recalculate</Text>
                            </TouchableOpacity>
                        </View>

                    }

                </>

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
        margin: 90,
        fontWeight: '200'
    },
    category: {
        fontWeight: '500',
        fontSize: 24,
        color: 'red'

    },
    normalCategory: {
        color: '#2FCC71'
    },
    overweightCategory: {
        color: 'yellow'
    },
    obesityCategory: {
        color: 'red'
    },
});

//make this component available to the app
export default Results;
