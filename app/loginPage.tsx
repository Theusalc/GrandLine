import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../assets/components/authContext';
import * as Notifications from 'expo-notifications';

// Função para gerar mensagem aleatória
const getRandomMessage = (): string => {
  const messages = [
    'Prepare-se para um grande treino!',
    'Não pare até se orgulhar de si mesmo!',
    'A dor é temporária, o orgulho é para sempre!',
    'Desafie seus limites hoje!',
    'Vamos conquistar o impossível juntos!',
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

const logo = require('../assets/images/logo.png');

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [randomMessage, setRandomMessage] = useState<string>('Carregando mensagem...');
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Gerar uma mensagem aleatória ao carregar a tela
    const message = getRandomMessage();
    setRandomMessage(message);
  }, []);

  const handleLogin = async () => {
    const success = auth?.login(email, password);
    if (success) {
      // Envia uma notificação local ao logar com sucesso
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Login Realizado!',
          body: `Bem-vindo, ${email}!`,
          data: { userEmail: email },
        },
        trigger: { seconds: 1 },
      });

      Alert.alert('Login bem-sucedido', 'Bem-vindo!');
      router.push('/homePage'); // Redireciona para a HomePage
    } else {
      Alert.alert('Erro de login', 'Credenciais inválidas!');
    }
  };

  const handleSignUp = () => {
    router.push('/signupPage'); // Redireciona para a página de cadastro
  };

  const handleForget = () => {
    router.push('/Password'); // Redireciona para a página de cadastro
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title_logo}>Grand Line Gym</Text>

      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        {randomMessage && (
          <Text style={styles.randomMessage}>{randomMessage}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Entrar" onPress={handleLogin} />
        
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>          
          <Text style={styles.signUpText}>Criar Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForget} style={styles.signUpButton2}>
          <Text style={styles.signUpText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe2dd',
    padding: 20,
  },
  box: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#87CEEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E3A5F',
  },
  randomMessage: {
    fontSize: 16,
    color: '#1E3A5F',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpButton2: {
    marginTop: 2,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#1E3A5F',
  },
  signUpTest: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#1E3A5F',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title_logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#1E3A5F',
  },
});

export default LoginPage;
