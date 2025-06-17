import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';
import { MotiText } from 'moti';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <FormInput
              label="Senha"
              placeholder="Digite sua senha"
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
              onPress={() => router.push('/auth/login/LoginSucess')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
