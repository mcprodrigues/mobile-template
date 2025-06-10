import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View className="flex-1 pt-14">
      <Header title="Entrar" router={router} />
      <View className="flex-1 items-center p-10">
        <Text className="text-center text-2xl text-zinc-800 font-poppins">Bem vindo de volta!</Text>
        <Text className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb">Preencha os dados</Text>
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

      <Link href="/auth/login/Login">
        <Text className="w-full font-poppinssb text-sm text-blue-800">Esqueceu sua senha?</Text>
      </Link>
        <Button
          title="Entrar"
          variant={email && senha.length >= 6 ? 'primary' : 'disabled'}
          onPress={() => { }}
        />
      </View>
    </View>
  );
}
