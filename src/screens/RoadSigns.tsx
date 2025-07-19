import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

const signs = [
  { sign: '🚫', label: 'No Entry' },
  { sign: '⚠️', label: 'Warning' },
  { sign: '➡️', label: 'Turn Right' },
  { sign: '🅿️', label: 'Parking' },
  { sign: '⛔', label: 'No Vehicles' },
];

export default function RoadSigns() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % signs.length);

  return (
    <ImageBackground
      source={require('../../assets/images/road.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.sign}>{signs[index].sign}</Text>
        <Text style={styles.label}>{signs[index].label}</Text>
        <Button mode="contained" onPress={next} style={styles.btn}>
          Next Sign
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sign: {
    fontSize: 100,
    marginBottom: 10,
    color: '#fff',
  },
  label: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 40,
  },
});
