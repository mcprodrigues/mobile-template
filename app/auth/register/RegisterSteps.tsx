import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';



import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { MotiText } from 'moti';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



import { Button } from '@/components/Button';

export default function RegisterSteps() {
  const [step, setStep] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
  });

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.email.length <= 40;

  const isSenhaValid =
    formData.senha.length >= 6 && formData.senha.length <= 8;

  const isNomeValid =
    formData.nome.trim().length >= 3 && formData.nome.length <= 30;

  const canProceed = () => {
    if (step === 0) return isEmailValid;
    if (step === 1) return isSenhaValid;
    if (step === 2) return isNomeValid;
    return false;
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else if (step === 2) {
      setStep(3); // loading
      setTimeout(() => {
        setStep(4); // sucesso
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 0 && step < 3) {
      setStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const handleRegisterSuccess = async () => {
  try {
    await AsyncStorage.setItem('userName', formData.nome);
    await AsyncStorage.setItem('userEmail', formData.email);
    await AsyncStorage.setItem('userPassword', formData.senha);
    router.replace('/(tabs)/Profile');  
  } catch (error) {
    console.error('Erro ao salvar dados', error);
  }
};

  const steps = [
    {
      title: 'Vamos começar!',
      subtitle: 'Qual é o seu e-mail?',
      placeholder: 'E-mail',
      value: formData.email,
      onChange: (text: string) => setFormData({ ...formData, email: text }),
      keyboardType: 'email-address',
      secure: false,
      helper: 'Use um endereço de e-mail válido.',
      maxLength: 40,
    },
    {
      title: 'Agora...',
      subtitle: 'Crie uma senha',
      placeholder: 'Senha',
      value: formData.senha,
      onChange: (text: string) => setFormData({ ...formData, senha: text }),
      keyboardType: 'default',
      secure: !showPassword,
      helper: 'Sua senha deve ter pelo menos 8 caracteres',
      maxLength: 8,
    },
    {
      title: 'Para finalizar',
      subtitle: 'Qual é o seu nome?',
      placeholder: 'Nome de usuário',
      value: formData.nome,
      onChange: (text: string) => setFormData({ ...formData, nome: text }),
      keyboardType: 'default',
      secure: false,
      helper: 'Esse será seu nome de usuário no aplicativo',
      maxLength: 30,
    },
  ];

  const current = steps[step] || {};

  return (
    <View className={`flex-1 ${step === 3 ? 'bg-slate-950' : 'bg-white'}`}>
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
        {step <= 2 && (
          <>
            <View >
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
                key={`step-title-${step}`}
                className="text-center pt-16 text-2xl text-zinc-800 font-poppins"
              >
                {current.title}
              </MotiText>

              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250, delay: 80 }}
                key={`step-subtitle-${step}`}
                className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb"
              >
                {current.subtitle}
              </MotiText>

              <View className="relative mb-2">
                <TextInput
                  className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'
                    } pr-12`}
                  placeholder={current.placeholder}
                  value={current.value}
                  onChangeText={current.onChange}
                  secureTextEntry={current.secure}
                  keyboardType={current.keyboardType as any}
                  maxLength={current.maxLength}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />

                {step === 1 && (
                  <Pressable
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="gray" />
                    ) : (
                      <Eye size={20} color="gray" />
                    )}
                  </Pressable>
                )}
              </View>

              <MotiText
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 200, delay: 100 }}
                key={`step-helper-${step}`}
                className="text-sm text-center text-zinc-500 mt-2 font-poppins mb-10"
              >
                {current.helper}
              </MotiText>
            </View>

            <View className="mb-16">
              <Button
                variant={canProceed() ? 'primary' : 'disabled'}
                title={step < 2 ? 'Continuar' : 'Criar conta'}
                onPress={handleNext}
              />
            </View>
          </>
        )}

        {step === 3 && (
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
      {step === 4 && (
        <View className="flex-1 p-28 justify-end items-center gap-4">
          <Image
            source={require('@/assets/images/moema.gif')}
            style={{ width: 200, height: 300 }}
            contentFit="contain"
          />
          <Text className='w-80 text-3xl font-poppinssb text-center text-black'>
            Sua conta foi criada com sucesso!
          </Text>
          <Text className='w-96 text-base text-center text-stone-500 font-poppins leading-tight'>
            Seja bem-vindo, treinador! Estamos animados para acompanhar sua jornada.      </Text>

          <Button
            title="Acessar Pokédex"
            variant="primary"
            onPress={() => router.replace('/(tabs)') }
          />

        </View>
      )}
    </View>
  );
}
