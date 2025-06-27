import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';

export default function ChangeNameScreen() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleChangeName = async () => {
    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Digite um nome válido' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://pokedex-back-end-production-9709.up.railway.app/users/${user?.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      let updated = {};
      if (response.status !== 204) {
        try {
          const text = await response.text();
          if (text) updated = JSON.parse(text);
        } catch (e) {
          console.warn('Erro ao converter resposta em JSON:', e);
          updated = {};
        }
      }

      if (!response.ok) throw new Error('Erro ao atualizar');

      await login({ ...user!, name: (updated as any).name ?? name });

      Toast.show({ type: 'success', text1: 'Nome atualizado!' });
      router.back();
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Erro ao atualizar nome' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={200}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingBottom: 30,
        }}
        className="pt-14"
      >
        <View>
          <Header title="Trocar nome" router={router} />
          <View className="pt-8">
            <FormInput
              placeholder="Digite seu novo nome"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View>
          <Button
            title="Atualizar"
            onPress={handleChangeName}
            loading={loading}
            variant={loading ? 'disabled' : 'primary'}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
