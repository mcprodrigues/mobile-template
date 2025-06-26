import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';
import { MotiText } from 'moti';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';
import TokenConfirmationStep from '@/components/TokenConfirmationStep';
import { changePasswordWithToken, requestToken } from '@/services/authService';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (step === 1) {
      resetTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [step]);

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

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text2: 'As senhas não coincidem',
        position: 'top',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await changePasswordWithToken({
        email,
        password: newPassword,
        token: code.join(''),
      });

      Toast.show({
        type: 'success',
        text2: 'Senha alterada com sucesso!',
        position: 'top',
      });

      router.replace('/auth/login/LoginForm');
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        Toast.show({
          type: 'error',
          text2: 'Token inválido ou expirado',
          position: 'top',
        });

        // Volta para a etapa do token
        setStep(1);
        setCode(['', '', '', '', '', '']);
      } else {
        Toast.show({
          type: 'error',
          text2: 'Erro ao alterar senha. Tente novamente.',
          position: 'top',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleRequestToken = async () => {
    if (!isEmailValid) return;
    setStep(3);
    try {
      await requestToken({ email });
      setTimeout(() => setStep(1), 1000);
    } catch (error) {
      console.error('Erro ao enviar token:', error);
      // alert('Erro ao enviar token. Verifique o e-mail e tente novamente.');
      Toast.show({
        type: 'error',
        text2: 'Erro ao alterar senha. Verifique o token ou tente novamente.',
        position: 'top',
        visibilityTime: 3000,
      });
      setStep(0);
    }
  };

  const handleResendToken = async () => {
    try {
      await requestToken({ email });
      resetTimer();
    } catch (error) {
      console.error('Erro ao reenviar token:', error);
      // alert('Erro ao reenviar token. Tente novamente.');
        Toast.show({
        type: 'error',
        text2: 'Erro ao reenviar token. Tente novamente.',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View className={`flex-1 pt-14 ${step === 3 ? 'bg-slate-950' : 'bg-white'}`}>
      <Header title="Esqueci minha senha" router={router} />

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {step === 0 && (
          <View className="flex-1 justify-between px-6 pb-8">
            <View>
              <MotiText className="text-center text-2xl text-zinc-800 font-poppins pt-10">
                Vamos recuperar!
              </MotiText>
              <MotiText className="text-3xl text-center text-black font-poppinssb mt-2 mb-6">
                Qual é o seu e-mail?
              </MotiText>

              <FormInput
                placeholder="E-mail"
                placeholderTextColor="#999"

                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text className="text-center font-poppins text-sm text-zinc-500">
                Um token de verificação será enviado para seu e-mail
              </Text>
            </View>

            <View className="mb-10">
              <Button
                title="Continuar"
                onPress={handleRequestToken}
                variant={isEmailValid ? 'primary' : 'disabled'}
              />
            </View>
          </View>
        )}

        {step === 1 && (
          <TokenConfirmationStep
            email={email}
            code={code}
            setCode={setCode}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            onContinue={() => setStep(2)}
            onResendToken={handleResendToken}
          />
        )}

        {step === 2 && (
          <View className="flex-1 justify-between px-6 pb-8">
            <View>
              <MotiText className="text-center text-2xl text-zinc-800 font-poppins mt-10">
                Tudo certo!
              </MotiText>
              <MotiText className="text-3xl text-center text-black font-poppinssb mb-6">
                Crie sua nova senha
              </MotiText>

              <View className="relative mb-6">
                <TextInput
                  className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'} pr-12`}
                  placeholder="Nova senha"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
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

              <FormInput
                className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${isFocused ? 'border-black' : 'border-zinc-300'} pr-12`}

                placeholder="Confirmar nova senha"
                placeholderTextColor="#999"
                secure
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <View className="mb-10">
              <Button
                title="Alterar senha"
                onPress={handlePasswordChange}
                variant={newPassword && confirmPassword ? 'primary' : 'disabled'}
                loading={isSubmitting}
              />
            </View>
          </View>
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
    </View>
  );
}
