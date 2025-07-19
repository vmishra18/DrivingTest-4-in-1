import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function HazardPerception() {
  const [tapped, setTapped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<Video>(null);

  const handleTap = () => {
    setTapped(true);
    Alert.alert('🚨 Hazard Detected!', 'You tapped during the video.');
    setTimeout(() => setTapped(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 Hazard Perception Test</Text>

      <View style={styles.videoWrapper}>
        {isLoading && (
          <ActivityIndicator size="large" color="#1e90ff" style={styles.loader} />
        )}

        <Video
          ref={videoRef}
          source={require('../../assets/videos/hazard.mp4')}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onLoadStart={() => setIsLoading(true)}
          onReadyForDisplay={() => setIsLoading(false)}
        />
      </View>

      <TouchableOpacity style={styles.hazardButton} onPress={handleTap}>
        <Text style={styles.hazardButtonText}>TAP IF HAZARD ⚠️</Text>
      </TouchableOpacity>

      {tapped && <Text style={styles.feedback}>✅ Tap Registered!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  videoWrapper: { width: '100%', height: 220, justifyContent: 'center' },
  video: { width: '100%', height: 220, borderRadius: 10 },
  loader: { position: 'absolute', alignSelf: 'center', zIndex: 2 },
  hazardButton: { marginTop: 20, backgroundColor: '#EF4444', padding: 14, borderRadius: 10 },
  hazardButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  feedback: { marginTop: 16, fontSize: 18, color: '#16a34a', fontWeight: 'bold' },
});
