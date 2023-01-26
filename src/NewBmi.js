//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import Loader from './Loader';

// create a component
const NewBmi = ({navigation}) => {
    const [height, setHieght] = useState(0)
    const [weight, setWeight] = useState(0)
    const [gender, setGender] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <View style={styles.container}>
           
                    <View style={styles.gender}>
                        <TouchableOpacity style={[styles.imgBox, gender == 'female' ? styles.genderClicked : styles.imgBox]} onPress={() => setGender('female')}>
                            <Image source={require('../assets/femenine.png')} style={styles.img} />
                            <Text style={{ color: 'white' }}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.imgBox, gender == 'male' ? styles.genderClicked : styles.imgBox]} onPress={() => setGender('male')}>
                            <Image source={require('../assets/male.png')} style={styles.img} />
                            <Text style={{ color: 'white' }}>Male</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.height}>
                        <Text style={{ color: 'white', marginBottom: 20 }}>Hieght</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, margin: 16, }}>{height} </Text>
                        <Text style={{ fontWeight: "100", color: '#15B8A7', fontSize: 19, }}>/CM</Text>
                        <Slider
                            style={{ width: 300, height: 40 }}
                            minimumValue={0}
                            maximumValue={200}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={height}
                            // {...height}
                            onValueChange={(value) => setHieght(value)}
                        />
                    </View>
                    <View style={styles.weight}>
                        <Text style={{ color: 'white' }}>Weight</Text>
                        <TextInput style={styles.input} value={weight} keyboardType={'numeric'} onValueChange={(value) => setWeight(Number(value))} />
                        <Text style={{ fontSize: 19, color: '#15B8A7', fontWeight: '100' }}>/KG</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Results', {data:weight})}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Calculate BMI</Text>
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
        backgroundColor: '#0B0C20',
    },
    input: {
        color: 'white',
        borderColor: '#15B8A7',
        height: 90,
        borderWidth: 1,
        width: '30%',
        alignItems: 'center',
        alignContent: "center",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        margin: 16,
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        width: '80%',
        backgroundColor: '#15B8A7',
        color: 'white',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
        // bottom:0
    },
    height: {
        height: 200,
        width: '90%',
        alignContent: "center",
        alignItems: 'center',
        backgroundColor: '#1E1F32',
        borderRadius: 16,
        justifyContent: 'center'

    },
    weight: {
        height: 200,
        width: '90%',
        alignContent: "center",
        alignItems: 'center',
        backgroundColor: '#1E1F32',
        borderRadius: 16,
        marginTop: 16,
        justifyContent: 'center'
    },
    gender: {
        height: 200,
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignContent: "center",
        alignItems: 'center',
        marginTop: 16
    },
    img: {
        height: 90,
        width: 70,
        resizeMode: 'contain',
    },
    imgBox: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#1E1F32',
        width: '45%',
        height: '100%',
        borderRadius: 16,


    }, genderClicked: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#15B8A7',
        width: '45%',
        height: '100%',
        borderRadius: 16,
    }
});

//make this component available to the app
export default NewBmi;
