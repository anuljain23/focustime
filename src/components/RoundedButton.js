import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={props.onpress}
      style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: '#fff',
      justifyContent: 'center',
      borderWidth: 2,
    },
    text: {
      fontSize: size / 3,
      color: '#fff',
    },
  });
