import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const codeSections = [
  {
    title: '🚦 Obey Traffic Signals',
    content:
      'Always stop at red lights. Proceed only when the signal is green and it’s safe to go.',
  },
  {
    title: '📵 Mobile Phone Usage',
    content:
      'Using a handheld phone while driving is illegal. Use hands-free only if absolutely necessary.',
  },
  {
    title: '🛑 Road Signs',
    content:
      'Pay attention to all road signs. Triangle signs are warnings, circles are commands.',
  },
  {
    title: '🚗 Speed Limits',
    content:
      'In residential areas, the speed limit is typically 30 mph unless otherwise indicated.',
  },
  {
    title: '🧍‍♂️ Pedestrian Awareness',
    content:
      'Always yield to pedestrians at crossings. Be especially cautious near schools and residential zones.',
  },
];

export default function HighwayCode() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📘 Highway Code Essentials</Text>

      {codeSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E293B',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 22,
  },
});
