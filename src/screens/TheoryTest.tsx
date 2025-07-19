import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  {
    question: 'What is the speed limit in a residential area?',
    options: ['20 mph', '30 mph', '40 mph', '50 mph'],
    answer: 1,
  },
  {
    question: 'When should you use your horn?',
    options: ['To alert others of danger', 'To greet people', 'In traffic jam', 'To get attention'],
    answer: 0,
  },
  {
    question: 'What does a red traffic light mean?',
    options: ['Go', 'Slow down', 'Stop', 'Proceed carefully'],
    answer: 2,
  },
  {
    question: 'What should you do at a zebra crossing?',
    options: ['Speed up', 'Stop and give way to pedestrians', 'Honk and pass', 'Flash headlights'],
    answer: 1,
  },
  {
    question: 'What shape are most warning signs?',
    options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
    answer: 1,
  },
];

export default function TheoryTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [lastResult, setLastResult] = useState<{
    date: string;
    score: number;
    total: number;
  } | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateIn();
  }, [currentQuestion]);

  useEffect(() => {
    const loadLastResult = async () => {
      try {
        const stored = await AsyncStorage.getItem('@last_quiz_result');
        if (stored) setLastResult(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load last result:', e);
      }
    };

    loadLastResult();
  }, []);

  const saveQuizResult = async (finalScore: number) => {
    try {
      const result = {
        date: new Date().toISOString(),
        score: finalScore,
        total: questions.length,
      };
      await AsyncStorage.setItem('@last_quiz_result', JSON.stringify(result));
      setLastResult(result); // update UI immediately
    } catch (e) {
      console.error('Error saving quiz result:', e);
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelected(index);
    setShowFeedback(true);
    const isCorrect = index === questions[currentQuestion].answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setSelected(null);
      setShowFeedback(false);

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setFinished(true);
        saveQuizResult(isCorrect ? score + 1 : score); // correct updated score
      }
    }, 1000);
  };

  if (finished) {
    const isPerfect = score === questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.finalText}>
          {isPerfect
            ? `🎉 Congratulations! You scored ${score}/${questions.length}!`
            : `You scored ${score}/${questions.length}. Keep practicing!`}
        </Text>
      </View>
    );
  }

  const current = questions[currentQuestion];
  const isCorrect = selected === current.answer;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {lastResult && (
        <View style={styles.lastResultBox}>
          <Text style={styles.lastResultText}>
            📊 Last Score: {lastResult.score}/{lastResult.total}
          </Text>
          <Text style={styles.lastResultText}>
            📅 Date: {new Date(lastResult.date).toLocaleString()}
          </Text>
        </View>
      )}

      <Text style={styles.questionText}>
        Question {currentQuestion + 1}: {current.question}
      </Text>

      {current.options.map((option, index) => {
        const isSelected = selected === index;
        const isAnswer = showFeedback && index === current.answer;
        const isWrong = showFeedback && isSelected && !isCorrect;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isSelected && styles.selectedOption,
              isAnswer && styles.correctOption,
              isWrong && styles.wrongOption,
            ]}
            onPress={() => handleOptionSelect(index)}
            disabled={showFeedback}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <Text style={isCorrect ? styles.correctText : styles.wrongText}>
          {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
  },
  lastResultBox: {
    marginBottom: 16,
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
  },
  lastResultText: {
    fontSize: 14,
    color: '#555',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1e90ff',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  wrongOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  correctText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  wrongText: {
    fontSize: 18,
    color: '#dc3545',
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  finalText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: '700',
  },
});
