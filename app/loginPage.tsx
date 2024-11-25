import React, { useState, useContext } from 'react';
import { View,  Text,  TextInput,  Button,  StyleSheet,  Alert,  TouchableOpacity,  Image, } from 'react-native';
import { useRouter } from 'expo-router'; // Hook para navegação
import { AuthContext } from '../assets/components/authContext';

const logo = require('../assets/images/logo.png');

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = () => {
    const success = auth?.login(email, password);
    if (success) {
      Alert.alert('Login bem-sucedido', 'Bem-vindo!');
      router.push('/homePage'); // Redireciona para a HomePage
    } else {
      Alert.alert('Erro de login', 'Credenciais inválidas!');
    }
  };

  const handleSignUp = () => {
    router.push('/signupPage'); // Redireciona para a tela de cadastro (opcional)
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title_logo}>Grand Line Gym</Text>

      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
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
          <Text style={styles.signUpTest}>Esqueci minha Senha</Text>
          <Text style={styles.signUpText}>Criar Cadastro</Text>
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
