import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { MotiText } from 'moti';
import React, { useEffect, useRef, useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, registerUser, requestToken } from '@/services/authService';
import Toast from 'react-native-toast-message';

export default function RegisterSteps() {
  const [step, setStep] = useState(0);
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setTimeLeft(60);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (step === 1) {
      resetTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [step]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.trim().length <= 40;
  const isTokenValid = code.every((d) => d !== '');
  const isSenhaValid = formData.password.trim().length >= 6 && formData.password.trim().length <= 8;
  const isNomeValid = formData.name.trim().length >= 3 && formData.name.trim().length <= 30;

  const canProceed = () => {
    if (step === 0) return isEmailValid;
    if (step === 1) return isTokenValid;
    if (step === 2) return isSenhaValid;
    if (step === 3) return isNomeValid;
    return false;
  };

  const handleNext = async () => {
    if (step === 0) {
      if (!isEmailValid) return;
      try {
        setStep(4);
        await requestToken({ email: formData.email.trim() });
        setTimeout(() => setStep(1), 800);
      } catch (error) {
        console.error('Erro ao enviar token:', error);
        // alert('Erro ao enviar token. Verifique o e-mail e tente novamente.');
              Toast.show({
                type: 'error',
                text2: 'Erro ao enviar token. Verifique o e-mail e tente novamente.',
                position: 'top',
                visibilityTime: 3000,
              });
        setStep(0);
      }
      return;
    }

    if (step === 1) {
      if (!isTokenValid) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!isSenhaValid) return;
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!isNomeValid) return;
      setStep(4);

      const user = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const payload = {
        ...user,
        token: code.join(''),
      };

      try {
        const response = await registerUser(payload);
        const userId = response._id || response.user?._id;
        const accessToken = response.access_token;

        if (!formData.name || !formData.email || !userId) {
                Toast.show({
                  type: 'error',
                  text2: 'Credenciais inválidas',
                  position: 'top',
                  visibilityTime: 3000,
                });
        }

        await login({
          id: userId,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accessToken,
        });

        setTimeout(() => setStep(5), 1500);
      } catch (error: any) {
        // alert('Erro ao criar conta: ' + (error?.response?.data?.message || 'Tente novamente.'));
              Toast.show({
                type: 'error',
                text2: 'Erro ao criar conta, tente novamente',
                position: 'top',
                visibilityTime: 3000,
              });
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 0 && step < 4) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleResendToken = async () => {
    try {
      await requestToken({ email: formData.email });
      resetTimer();
    } catch (error) {
      // alert('Erro ao reenviar token. Tente novamente.');
            Toast.show({
              type: 'error',
              text2: 'Erro ao reenviar token. Tente novamente.',
              position: 'top',
              visibilityTime: 3000,
            });
    }
  };

  const steps = [
    {
      key: 'email',
      title: 'Vamos começar!',
      subtitle: 'Qual é o seu e-mail?',
      render: () => (
        <TextInput
          className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'}`}
          placeholder="E-mail"
          value={formData.email}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
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
          onResendToken={handleResendToken}
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
            className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'} pr-12`}
            placeholder="Senha"
            value={formData.password}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
            secureTextEntry={!showPassword}
            maxLength={8}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Pressable
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
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
          className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'}`}
          placeholder="Nome de usuário"
          value={formData.name}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
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
        <MotiText className="text-lg font-poppinssb text-black">Criar conta</MotiText>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 24 }}
      >
        {step < 4 && (
          <>
            {step === 1 ? (
                <View className="flex-1 justify-between items-center w-full">

                {steps[1].render()}
              </View>
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

                <View className=" w-full items-center mb-16">
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
            Seja bem-vindo, treinador! Estamos animados para acompanhar sua jornada.
          </Text>
          <Button
            title="Acessar"
            variant="primary"
            onPress={async () => {
              try {
                const response = await loginUser({
                  email: formData.email.trim(),
                  password: formData.password,
                });
                await login({
                  id: userId,
                  name: formData.name,
                  email: formData.email,
                  password: formData.password,
                  accessToken,
                });
                router.push('/(tabs)');
              } catch (error) {
                // alert('Erro ao continuar. Tente logar novamente.');
                      Toast.show({
                        type: 'error',
                        text2: 'Erro ao continuar. Tente logar novamente.',
                        position: 'top',
                        visibilityTime: 3000,
                      });
              }
            }}
          />
        </View>
      )}
    </View>
  );
}
