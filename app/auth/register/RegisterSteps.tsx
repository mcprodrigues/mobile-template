import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { MotiText } from 'moti';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import TokenConfirmationStep from '@/components/TokenConfirmationStep';

export default function RegisterSteps() {
  const [step, setStep] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', senha: '', nome: '' });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.email.length <= 40;

  const isTokenValid = code.every((d) => d !== '');

  const isSenhaValid =
    formData.senha.length >= 6 && formData.senha.length <= 8;

  const isNomeValid =
    formData.nome.trim().length >= 3 && formData.nome.length <= 30;

  const canProceed = () => {
    if (step === 0) return isEmailValid;
    if (step === 1) return isTokenValid;
    if (step === 2) return isSenhaValid;
    if (step === 3) return isNomeValid;
    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setStep(4); // loading
      setTimeout(() => setStep(5), 1500);
    }
  };

  const handleBack = () => {
    if (step > 0 && step < 4) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const steps = [
    {
      key: 'email',
      title: 'Vamos começar!',
      subtitle: 'Qual é o seu e-mail?',
      render: () => (
        <TextInput
          className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${
            isFocused ? 'border-black' : 'border-zinc-300'
          }`}
          placeholder="E-mail"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          maxLength={40}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ),
      helper: 'Use um endereço de e-mail válido.',
    },
    {
      key: 'token',
      render: () => (
        <TokenConfirmationStep
          email={formData.email}
          code={code}
          setCode={setCode}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onContinue={handleNext}
        />
      ),
    },
    {
      key: 'senha',
      title: 'Agora...',
      subtitle: 'Crie uma senha',
      render: () => (
        <View className="relative">
          <TextInput
            className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${
              isFocused ? 'border-black' : 'border-zinc-300'
            } pr-12`}
            placeholder="Senha"
            value={formData.senha}
            onChangeText={(text) => setFormData({ ...formData, senha: text })}
            secureTextEntry={!showPassword}
            maxLength={8}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Pressable
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff size={20} color="gray" />
            ) : (
              <Eye size={20} color="gray" />
            )}
          </Pressable>
        </View>
      ),
      helper: 'Sua senha deve ter entre 6 e 8 caracteres.',
    },
    {
      key: 'nome',
      title: 'Para finalizar',
      subtitle: 'Qual é o seu nome?',
      render: () => (
        <TextInput
          className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${
            isFocused ? 'border-black' : 'border-zinc-300'
          }`}
          placeholder="Nome de usuário"
          value={formData.nome}
          onChangeText={(text) => setFormData({ ...formData, nome: text })}
          maxLength={30}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ),
      helper: 'Esse será seu nome de usuário no aplicativo.',
    },
  ];

  const current = steps[step];

  return (
    <View className={`flex-1 ${step === 4 ? 'bg-slate-950' : 'bg-white'}`}>
      <View className="flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          key={`title-${step}`}
          className="text-lg font-poppinssb text-black"
        >
          Criar conta
        </MotiText>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 24,
        }}
      >
{step < 4 && (
  <>
    {step === 1 ? (
      <TokenConfirmationStep
        email={formData.email}
        code={code}
        setCode={setCode}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        onContinue={() => setStep(2)}
      />
    ) : (
      <>
        <View>
          <MotiText className="text-center pt-16 text-2xl text-zinc-800 font-poppins">
            {current.title}
          </MotiText>
          <MotiText className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb">
            {current.subtitle}
          </MotiText>

          {current.render?.()}

          {!!current.helper && (
            <MotiText className="text-sm text-center text-zinc-500 mt-2 font-poppins mb-10">
              {current.helper}
            </MotiText>
          )}
        </View>

        <View className="mb-16">
          <Button
            variant={canProceed() ? 'primary' : 'disabled'}
            title={step < 3 ? 'Continuar' : 'Criar conta'}
            onPress={handleNext}
          />
        </View>
      </>
    )}
  </>
)}


        {step === 4 && (
          <View className="flex-1 items-center justify-center">
            <LottieView
              source={require('@/assets/lottie/loading.json')}
              autoPlay
              loop
              style={{ width: 120, height: 120 }}
            />
          </View>
        )}
      </KeyboardAwareScrollView>

      {step === 5 && (
        <View className="flex-1 p-28 justify-end items-center gap-4">
          <Image
            source={require('@/assets/images/moema.gif')}
            style={{ width: 200, height: 300 }}
            contentFit="contain"
          />
          <Text className="w-80 text-3xl font-poppinssb text-center text-black">
            Sua conta foi criada com sucesso!
          </Text>
          <Text className="w-96 text-base text-center text-stone-500 font-poppins leading-tight">
            Seja bem-vindo, treinador! Estamos animados para acompanhar sua
            jornada.
          </Text>
          <Button
            title="Acessar Pokédex"
            variant="primary"
            onPress={() => router.push('/(tabs)')}
          />
        </View>
      )}
    </View>
  );
}
