import { Button } from '@/components/Button';
import { MotiText } from 'moti';
import React, { useEffect, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

type Props = {
  email: string;
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onContinue: () => void;
};

export default function TokenConfirmationStep({
  email,
  code,
  setCode,
  timeLeft,
  setTimeLeft,
  onContinue,
}: Props) {
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
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
  }, []);

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

  const isValid = code.every((d) => d !== '');

  return (
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
              }} className="w-10 h-12 border border-zinc-400 text-center text-lg font-poppins rounded-md"
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
          variant={isValid ? 'primary' : 'disabled'}
          onPress={onContinue}
        />
      </View>
    </View>
  );
}
