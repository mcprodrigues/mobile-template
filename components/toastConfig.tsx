import React from 'react';
import { Text, View } from 'react-native';
import type { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: ({ text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        backgroundColor: '#A7EFC1',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: '#ffffff',
          fontFamily: 'Poppins-SemiBold',
          fontWeight: '600',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {text2 || 'Operação realizada com sucesso!'}
      </Text>
    </View>
  ),

  error: ({ text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: '#ffffff',
          fontWeight: '600',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {text2 || 'Ocorreu um erro'}
      </Text>
    </View>
  ),
};
