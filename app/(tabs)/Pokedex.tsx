import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function Pokedex() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ marginBottom: 8, fontSize: 18 }}>Senha:</Text>

      <View style={{ position: 'relative' }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            paddingRight: 40,
            fontSize: 16,
          }}
        />

        <Pressable
          onPress={() => setShowPassword(prev => !prev)}
          style={{ position: 'absolute', right: 12, top: 12 }}
        >
          {showPassword ? (
            <EyeOff size={20} color="gray" />
          ) : (
            <Eye size={20} color="gray" />
          )}
        </Pressable>
      </View>
    </View>
  );
}
