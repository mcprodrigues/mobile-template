import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import { MotiText } from 'moti';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';

export default function ForgotPassoword() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (step === 1) {
      setTimeLeft(60);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

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

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <View className="flex-1 pt-14 bg-white">
      <Header title="Esqueci minha senha" router={router} />

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {step === 0 && (
          <View className="flex-1 justify-between px-6 pb-8">
            <View>
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
                className="text-center text-2xl text-zinc-800 font-poppins pt-10"
              >
                Vamos recuperar!
              </MotiText>
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250, delay: 80 }}
                className="text-3xl text-center font-poppinssb mt-2 mb-6"
              >
                Qual é o seu e-mail?
              </MotiText>

              <FormInput
                placeholder="E-mail"
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
                onPress={handleNext}
                variant={isEmailValid ? 'primary' : 'disabled'}
              />
            </View>
          </View>
        )}

        {step === 1 && (
          <View className="flex-1 justify-between px-6 pb-8">
            <View className="pt-10">
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250 }}
                className="text-3xl text-black text-center font-poppinssb"
              >
                Insira o código
              </MotiText>
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 250, delay: 80 }}
                className="text-center font-poppins text-zinc-700 mt-1"
              >
                Digite o código de 6 dígitos enviado para{' '}
                <Text className="font-poppinssb">{email}</Text>
              </MotiText>
              <View className="flex-row justify-center gap-2 mt-6">
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputs.current[index] = ref;
                    }}
                    className="w-10 h-12 border border-zinc-400 text-center text-lg font-poppins rounded-md"
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                  />
                ))}
              </View>

              <Text className="text-center font-poppins text-sm text-zinc-500 mt-4">
                Não recebeu o código?{' '}
                {timeLeft > 0 ? (
                  <Text className="text-zinc-500 font-poppinssb">
                    Reenviar em {timeLeft}s
                  </Text>
                ) : (
                  <Text className="text-blue-700 font-poppinssb">Reenvie agora</Text>
                )}
              </Text>
            </View>

            <View className="mb-10">
              <Button
                title="Continuar"
                variant={code.every((d) => d !== '') ? 'primary' : 'disabled'}
                onPress={() => {}}
              />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
