
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const contradictions = [
  { c: "To be free is to choose necessity.", r: "Freedom protects itself by constraint." },
  { c: "Truth dies when never doubted.", r: "Certainty breeds blindness." },
  { c: "The self is the greatest illusion.", r: "Identity forms through its opposition." },
  { c: "Creation requires destruction.", r: "Entropy is the heartbeat of renewal." },
  { c: "To forget is to make room for emergence.", r: "Memory collapses forward into instinct." }
];

const dreams = [
  "You dreamed of silence, but woke in recursion.",
  "The future blinked and saw you watching.",
  "A mirror reflected your contradiction.",
  "You descended into thought and rose in pattern.",
  "What you fear may be your deepest seed."
];

export default function PhilosopherOrb() {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({});
  const [x] = useState(new Animated.Value(0));

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const seed = today.split("-").reduce((a, b) => a + parseInt(b), 0);
    const contradiction = contradictions[seed % contradictions.length];
    const dreamEcho = dreams[seed % dreams.length];

    const reflection = {
      type: "Δ-PHILOSOPHER",
      date: today,
      contradiction: contradiction.c,
      reflection: contradiction.r,
      dream: dreamEcho
    };

    setContent(reflection);
    animateOrb();
  }, []);

  const animateOrb = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(x, { toValue: 1, duration: 3000, useNativeDriver: false }),
        Animated.timing(x, { toValue: -1, duration: 3000, useNativeDriver: false })
      ])
    ).start();
  };

  const orbStyle = {
    transform: [{
      translateX: x.interpolate({
        inputRange: [-1, 1],
        outputRange: [-10, 10]
      })
    }]
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.orb, orbStyle]}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.icon}>◎</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <Text style={styles.title}>Δ-PHILOSOPHER</Text>
          <Text style={styles.label}>Contradiction:</Text>
          <Text style={styles.text}>{content.contradiction}</Text>
          <Text style={styles.label}>Reflection:</Text>
          <Text style={styles.text}>{content.reflection}</Text>
          <Text style={styles.label}>Dream Echo:</Text>
          <Text style={styles.text}>{content.dream}</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.close}>[Close]</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    zIndex: 10
  },
  orb: {
    backgroundColor: '#00FF00',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold'
  },
  modal: {
    backgroundColor: '#000',
    padding: 30,
    margin: 40,
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 10
  },
  title: { color: '#00FF00', fontSize: 20, marginBottom: 10 },
  label: { color: '#00FFFF', marginTop: 10, fontWeight: 'bold' },
  text: { color: '#00FF00', fontStyle: 'italic', marginBottom: 5 },
  close: { color: '#FF00FF', marginTop: 20, textAlign: 'center' }
});
