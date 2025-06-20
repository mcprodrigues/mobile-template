import { Button } from '@/components/Button';
import { MotiText } from 'moti';
import React, { useEffect, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
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
  onResendToken: () => void;

};

export default function TokenConfirmationStep({
  email,
  code,
  setCode,
  timeLeft,
  setTimeLeft,
  onContinue,
  onResendToken,
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
    const onlyNumber = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = onlyNumber;
    setCode(newCode);

    if (onlyNumber && index < inputs.current.length - 1) {
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
          {code.map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={{ color: 'black' }}
              value={code[index]}
              maxLength={1}
              keyboardType="numeric"
              textContentType="oneTimeCode"
              importantForAccessibility="yes"
              className="w-10 h-12 border border-zinc-400 text-center text-lg font-poppins rounded-md"
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
            />
          ))}
        </View>


        <View className="flex-row justify-center items-center mt-4 flex-wrap">
          <Text className="font-poppins text-sm text-zinc-500">
            Não recebeu o código?{' '}
          </Text>

          {timeLeft > 0 ? (
            <Text className="font-poppinssb text-sm text-zinc-500">
              Reenviar em {timeLeft}s
            </Text>
          ) : (
            <Pressable onPress={onResendToken}>
              <Text className="font-poppinssb text-sm text-blue-700">
                Reenvie agora
              </Text>
            </Pressable>
          )}
        </View>

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
