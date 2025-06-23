import { Trophy } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  description: string;
  captured: number;
  required: number;
  unlocked: boolean;
};

export function MedalItem({ title, description, captured, required, unlocked }: Props) {
  const progress = Math.min(captured / required, 1);

  return (
    <View className="mb-4 p-4 rounded-lg shadow-sm">
      <Text className="text-base font-bold text-black">{title}</Text>
      <Text className="text-sm text-zinc-600 mb-2">{description}</Text>

      <View className="flex-row items-center justify-between">
        {/* Barra de progresso feita com View */}
        <View className="flex-1 h-2 bg-zinc-300 rounded-full overflow-hidden">
          <View
            style={{ width: `${progress * 100}%` }}
            className={`h-2 ${unlocked ? 'bg-yellow-400' : 'bg-zinc-400'}`}
          />
        </View>

        {/* Ícone e contador */}
        <View className="ml-3 items-center">
          <Trophy size={20} color={unlocked ? '#facc15' : '#a1a1aa'} />
          <Text className="text-xs text-black">
            {captured}/{required}
          </Text>
        </View>
      </View>
    </View>
  );
}
