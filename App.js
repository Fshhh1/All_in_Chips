
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  const [domain, setDomain] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');

  const resolveChips = async () => {
    const url = `https://chips.redmelon.net/chips/${domain}/${context}`;
    setResponse('Resolving...');
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('Error fetching data.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CHIPS:// Mobile Terminal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter domain"
        placeholderTextColor="#00FF00"
        value={domain}
        onChangeText={setDomain}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter context"
        placeholderTextColor="#00FF00"
        value={context}
        onChangeText={setContext}
      />
      <Button title="Resolve" onPress={resolveChips} color="#00FF00" />
      <Text style={styles.output}>{response}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 22, color: '#00FF00', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#00FF00', color: '#00FF00',
    padding: 10, marginBottom: 10, borderRadius: 5
  },
  output: { color: '#00FF00', marginTop: 20, fontFamily: 'monospace' }
});
