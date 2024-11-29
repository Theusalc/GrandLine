import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const passPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TESTANDO TELA DE senha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe2dd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
});

export default passPage;
