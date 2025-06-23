import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
// @ts-ignore
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
      const timeout = setTimeout(() => {
        setAnimatedCollected(collected);
      }, 300);

      return () => {
        setAnimatedCollected(0);
        clearTimeout(timeout);
      };
    }, [collected])
  );

  // Proteções contra dados inválidos
  const safeCollected = isNaN(collected) || collected < 0 ? 0 : collected;
  const safeTotal = isNaN(total) || total <= 0 ? 1 : total; // evitar divisão por zero
  const safeAnimatedCollected =
    animatedCollected > safeTotal ? safeTotal : animatedCollected;

  const chartData =
    safeTotal === 0
      ? [{ x: 'Nenhum', y: 1 }]
      : [
          { x: 'Coletado', y: safeAnimatedCollected },
          { x: 'Faltando', y: safeTotal - safeAnimatedCollected },
        ];

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
          data={chartData}
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
          {safeCollected} / {safeTotal}
        </Text>
        <Text className="text-xs font-poppins text-slate-500 tracking-wider">
          Capturados
        </Text>
      </View>
    </View>
  );
}
