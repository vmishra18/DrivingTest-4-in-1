import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
import TouchableScale from 'react-native-touchable-scale';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MENU_ITEMS = [
  { label: '📝 Theory Test', route: 'Theory' },
  { label: '🎥 Hazard Perception', route: 'Hazard' },
  { label: '📘 Highway Code', route: 'Highway' },
  { label: '🚦 Road Signs', route: 'Signs' },
];

export default function HomeScreen({ navigation }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Speak intro
    const speakIntro = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      const preferredVoices = [
        'Google UK English Female',
        'Samantha',
        'Moira',
        'en-GB-language',
        'Google US English',
      ];

      const betterVoice = voices.find(v =>
        preferredVoices.some(name => v.name.toLowerCase().includes(name.toLowerCase()))
      );

      Speech.speak("Hey Interviewers, are you ready for the demo!", {
        voice: betterVoice?.identifier,
        pitch: 1.2,
        rate: 0.9,
        language: betterVoice?.language || 'en-GB',
      });
    };

    speakIntro();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.blur}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <LottieView
              source={require('../../assets/lottie/steering-wheel.json')}
              autoPlay
              loop
              style={styles.lottie}
            />

            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
              👋 Welcome to
            </Text>
            <Text style={[styles.brand, { color: isDark ? '#fff' : '#111' }]}>
              Driver Toolkit
            </Text>

            {MENU_ITEMS.map((item, idx) => (
              <TouchableScale
                key={idx}
                onPress={() => navigation.navigate(item.route as keyof RootStackParamList)}
                activeScale={0.95}
                style={styles.card}
              >
                <Text style={styles.cardText}>{item.label}</Text>
              </TouchableScale>
            ))}

            {/* Small Theme Toggle */}
            <View style={styles.themeToggleContainer}>
              <TouchableScale onPress={toggleTheme} activeScale={0.95} style={styles.themeToggle}>
                <Text style={styles.toggleEmoji}>{isDark ? '🌞' : '🌚'}</Text>
              </TouchableScale>
            </View>
          </ScrollView>
        </Animated.View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  blur: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 50,
  },
  lottie: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 30,
  },
  card: {
    width: width * 0.8,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  themeToggleContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  toggleEmoji: {
    fontSize: 24,
  },
});
