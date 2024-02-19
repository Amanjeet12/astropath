import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SingleForm from './SingleForm';
import useNavigateToScreen from './Navigation';

const MultiFormSection = () => {
  const navigation = useNavigateToScreen();
  const handleNavigation = () => {
    navigation('MarraigeKundli');
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Male</Text>
      </View>
      <View style={{marginTop: 30}}>
        <SingleForm />
      </View>
      <View style={[styles.container, {marginTop: 20}]}>
        <Text style={styles.title}>Female</Text>
      </View>
      <View style={{marginTop: 30}}>
        <SingleForm />
      </View>
      <View style={styles.button_position}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleNavigation()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MultiFormSection;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#000',
    textAlign: 'center',
  },
  container: {
    alignSelf: 'center',
    width: 150,
    height: 50,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: '#F39200',
  },
  button_position: {
    position: 'relative',
    marginBottom: 30,
  },
  buttonContainer: {
    height: 50,
    marginTop: 20,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
