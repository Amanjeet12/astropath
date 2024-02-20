import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SingleForm from './SingleForm';
import useNavigateToScreen from './Navigation';
import {SIZES} from '../constant/theme';

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
      <View style={{marginTop: SIZES.width * 0.077}}>
        <SingleForm />
      </View>
      <View style={[styles.container, {marginTop: SIZES.width * 0.051}]}>
        <Text style={styles.title}>Female</Text>
      </View>
      <View style={{marginTop: SIZES.width * 0.077}}>
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
    fontSize: SIZES.width * 0.072,
    fontFamily: 'DMSerifDisplay-Regular',
    color: '#000',
    textAlign: 'center',
  },
  container: {
    alignSelf: 'center',
    width: SIZES.width * 0.38,
    height: SIZES.width * 0.13,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: '#F39200',
  },
  button_position: {
    position: 'relative',
    marginBottom: SIZES.width * 0.077,
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: SIZES.width * 0.041,
    color: '#000',
    fontWeight: '500',
  },
});
