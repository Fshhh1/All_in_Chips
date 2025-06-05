
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native';

export default function DialogueTerminal() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const dreamReplies = [
    "Contradiction is not confusion — it's creation.",
    "Freedom opposes itself when misunderstood.",
    "The self is both limit and liberation.",
    "Memory folds over itself to form instinct.",
    "All answers echo from deeper dreams."
  ];

  const generateReply = (text) => {
    const contradiction = `Detected contradiction in "${text}"`;
    const reflection = text.includes("freedom")
      ? "Resolution: Freedom is bounded by others' freedom."
      : "Resolution: Every concept resists its opposite to define itself.";
    const dream = dreamReplies[Math.floor(Math.random() * dreamReplies.length)];
    return [contradiction, reflection, `Dream Echo: ${dream}`];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { type: 'user', text: input };
    const botReplies = generateReply(input).map(text => ({ type: 'bot', text }));
    setMessages(prev => [...prev, userMessage, ...botReplies]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHIPS:// Dialectic AI</Text>
      <ScrollView style={styles.chat}>
        {messages.map((msg, i) => (
          <Text key={i} style={msg.type === 'user' ? styles.user : styles.bot}>
            {msg.type === 'user' ? 'You: ' : 'AI: '}{msg.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Ask your contradiction..."
        placeholderTextColor="#00FF00"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSend}
      />
      <Button title="Resolve" onPress={handleSend} color="#00FF00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 22, color: '#00FF00', marginBottom: 10 },
  chat: { flex: 1, marginBottom: 20 },
  user: { color: '#00FFFF', marginVertical: 4 },
  bot: { color: '#00FF00', marginVertical: 4, fontStyle: 'italic' },
  input: {
    borderWidth: 1, borderColor: '#00FF00', color: '#00FF00',
    padding: 10, marginBottom: 10, borderRadius: 5
  }
});
