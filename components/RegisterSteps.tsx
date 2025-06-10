import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

import { Button } from '@/components/Button';

import { Eye, EyeOff } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    } else {
      console.log('Cadastro finalizado:', formData);
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

  const current = steps[step];

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingTop: 112,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}
      >
        <AnimatePresence>
          <MotiView
            key={step}
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -20 }}
            transition={{ type: 'timing', duration: 300 }}
          >
            <Text className="text-center text-2xl text-zinc-800 font-poppins">
              {current.title}
            </Text>
            <Text className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb">
              {current.subtitle}
            </Text>

            <View className="relative mb-2">
              <TextInput
                className={`w-full border rounded-md px-4 py-3 text-base text-black font-poppins ${
                  isFocused ? 'border-black' : 'border-zinc-300'
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

            <Text className="text-sm text-center text-zinc-500 mt-2 font-poppins mb-10">
              {current.helper}
            </Text>
          </MotiView>
        </AnimatePresence>

        <View className="mb-10">
          <Button
            variant={canProceed() ? 'primary' : 'disabled'}
            title={step < 2 ? 'Continuar' : 'Criar conta'}
            onPress={handleNext}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
