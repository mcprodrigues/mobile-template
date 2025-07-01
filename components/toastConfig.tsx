import { Trophy } from 'lucide-react-native';
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

  customBadge: ({ props }: ToastConfigParams<any>) => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fffbea',
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 32,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Trophy size={32} color="#facc15" style={{ marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#92400e', fontSize: 16 }}>
          {props.title}
        </Text>
        <Text style={{ fontWeight: '600', color: '#78350f', fontSize: 14 }}>
          {props.subtitle}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: '#92400e', fontSize: 13, marginTop: 2 }}
        >
          {props.description}
        </Text>
      </View>
    </View>
  ),
};
