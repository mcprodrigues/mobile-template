import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';

export default function ProgressChart({
  collected,
  total,
}: {
  collected: number;
  total: number;
}) {
  const [animatedCollected, setAnimatedCollected] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // Quando a tela entra em foco
      const timeout = setTimeout(() => {
        setAnimatedCollected(collected);
      }, 300); // pequeno delay para suavidade

      return () => {
        // Quando a tela sai de foco, reseta para 0
        setAnimatedCollected(0);
        clearTimeout(timeout);
      };
    }, [collected])
  );

  return (
    <View
      className="flex-row items-center p-4 bg-white rounded-xl gap-4"
      style={{
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <View className="w-[140px] h-[120px] justify-center items-center">
        <VictoryPie
          data={[
            { x: 'Coletado', y: animatedCollected },
            { x: 'Faltando', y: total - animatedCollected },
          ]}
          width={120}
          height={120}
          innerRadius={40}
          padding={0}
          colorScale={['#1e40af', '#E5E7EB']}
          labels={() => null}
          animate={{ duration: 1000, easing: 'cubic' }}
        />
      </View>

      <View className="justify-center space-y-1">
        <Text className="text-base font-poppinsm text-slate-600">Progresso</Text>
        <Text className="text-2xl font-poppinssb text-slate-900">
          {collected} / {total}
        </Text>
        <Text className="text-xs font-poppins text-slate-500 tracking-wider">
          Capturados
        </Text>
      </View>
    </View>
  );
}
