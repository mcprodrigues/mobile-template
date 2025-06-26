import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';

import { useAuth } from '@/contexts/AuthContext';
import { loginUser } from '@/services/authService';

import { MotiText } from 'moti';
import Toast from 'react-native-toast-message';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim();

      console.log('Tentando login com:', {
        email: trimmedEmail,
        password: '*'.repeat(senha.length),
      });

      const response = await loginUser({ email: trimmedEmail, password: senha });
      console.log(response)
      const userData = {
        id: response.user._id,
        name: response.user.name?.trim() || 'Usuário',
        email: response.user.email?.trim() || trimmedEmail,
        password: senha,
        accessToken: response.access_token,
      };

      await login(userData);

      console.log('Usuário salvo no contexto:', userData);
      router.push('/auth/login/LoginSucess');
    } catch (error: any) {
      console.error('Erro ao logar:', error);
      // Alert.alert('Erro', ' ou servidor indisponível');
      Toast.show({
        type: 'error',
        text2: 'Credenciais inválidas',
        position: 'top',
        visibilityTime: 3000,
      });

    }
  };

  return (
    <View className="flex-1 pt-14 bg-white">
      <Header title="Entrar" router={router} />

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pb-6 justify-between">
          <View className="items-center">
            <MotiText
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 250 }}
              className="text-center text-2xl text-zinc-800 font-poppins pt-10"
            >
              Bem-vindo de volta!
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 250, delay: 80 }}
              className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb"
            >
              Preencha os dados
            </MotiText>
            <FormInput
              label="E-mail"
              placeholder="Digite seu e-mail"
                              placeholderTextColor="#999"

              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <FormInput
              label="Senha"
              placeholder="Digite sua senha"
                              placeholderTextColor="#999"

              value={senha}
              onChangeText={setSenha}
              secure
              maxLength={8}
            />

            <Link href="/auth/login/ForgotPassoword">
              <Text className="w-full text-sm text-blue-800 font-poppinssb text-right">Esqueceu sua senha?</Text>
            </Link>
          </View>

          <View className="mb-10">
            <Button
              title="Entrar"
              variant={email && senha.length >= 6 ? 'primary' : 'disabled'}
              onPress={handleLogin}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
