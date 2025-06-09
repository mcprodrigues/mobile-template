import { Button } from '@/components/Button';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';

export default function RegisterSteps() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
  });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isSenhaValid = formData.senha.length >= 6;
  const isNomeValid = formData.nome.trim().length > 2;

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
      // Ex: redirecionar para outra tela
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
    },
    {
      title: 'Agora...',
      subtitle: 'Crie uma senha',
      placeholder: 'Senha',
      value: formData.senha,
      onChange: (text: string) => setFormData({ ...formData, senha: text }),
      keyboardType: 'default',
      secure: true,
      helper: 'Sua senha deve ter pelo menos 8 caracteres',
    },
    {
      title: 'Para finalizar',
      subtitle: 'Qual é o seu nome?',
      placeholder: 'Nome de usuário',
      value: formData.nome,
      onChange: (text: string) => setFormData({ ...formData, nome: text }),
      keyboardType: 'default',
      secure: false,
      helper: 'Esse será seu nome de usuário no aplicativo.',
    },
  ];

  const current = steps[step];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white justify-start items-center pt-28"
    >
      <AnimatePresence>
        <MotiView
          key={step}
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: -20 }}
          transition={{ type: 'timing', duration: 500 }}
          className="gap-2"
        >
          <Text className=" text-center text-2xl text-zinc-800 font-poppins">
            {current.title}
          </Text>
          <Text className="text-3xl text-center text-zinc-900 mb-6 font-poppinssb">
            {current.subtitle}
          </Text>

          <TextInput
            className="border border-zinc-300 rounded-md px-4 py-3 text-base text-black font-poppins"
            placeholder={current.placeholder}
            value={current.value}
            onChangeText={current.onChange}
            secureTextEntry={current.secure}
            keyboardType={current.keyboardType as any}
          />

          <Text className="text-sm text-center text-zinc-500 mt-2 mb-5 font-poppins">
            {current.helper}
          </Text>
          <View className='flex-1 justify-end pb-16'>
            
          <Button
            variant='primary'
            title={step < 2 ? 'Continuar' : 'Criar conta'}
            onPress={handleNext}
          />
          </View>
        </MotiView>
      </AnimatePresence>
    </KeyboardAvoidingView>
  );
}
