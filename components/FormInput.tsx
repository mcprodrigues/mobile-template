import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native';

interface FormInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  secure?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export default function FormInput({
  label,
  helperText,
  secure,
  value,
  onChangeText,
  ...rest
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-poppins text-black mb-1">
          {label}
        </Text>
      )}
      <View className="relative pb-2">
        <TextInput
          className={`w-96 border rounded-md px-4 py-3 text-base text-black font-poppins pr-12 ${
            isFocused ? 'border-black' : 'border-zinc-300'
          }`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {secure && (
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

      {helperText && (
        <Text className="text-sm text-zinc-500 mt-1 font-poppins">
          {helperText}
        </Text>
      )}
    </View>
  );
}
