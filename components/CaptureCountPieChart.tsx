import { initialPokemons } from '@/constants/initialPokemons';
import { apiToInternalNameMap, getDisplayName } from '@/utils/getDisplayName';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';

type CaptureItem = {
  animal: { name: string };
  date: string;
};

export default function CaptureCountPieChart({
  captureHistory,
}: {
  captureHistory: CaptureItem[];
}) {
  const [data, setData] = useState<{ x: string; y: number }[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (!captureHistory || captureHistory.length === 0) return;

    const countMap = captureHistory.reduce((acc: Record<string, number>, curr) => {
      const name = curr.animal.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(countMap).map(([apiName, count]) => {
      const internalName = apiToInternalNameMap[apiName];
      return {
        x: getDisplayName(apiName),
        y: count,
        internalName,
      };
    });

    const colorMap = Object.fromEntries(
      initialPokemons.map((p) => [p.name, p.bgRight])
    );

    const finalData = formattedData.filter((d) => !!d.internalName);
    const pieData = finalData.map(({ x, y }) => ({ x, y }));
    const pieColors = finalData.map(({ internalName }) => colorMap[internalName]);

    setData(pieData);
    setColors(pieColors);
  }, [captureHistory]); // Atualiza sempre que o prop mudar

  if (data.length === 0) return null;

  return (
    <View
      className="bg-white p-4 rounded-xl mb-4"
      style={{
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <Text className="text-lg font-poppinssb text-slate-800 text-left mb-2">
        Total de Capturas por Animal
      </Text>

      <VictoryPie
        data={data}
        width={320}
        height={320}
        innerRadius={60}
        labels={({ datum }) => `${datum.y}`}
        labelRadius={100}
        animate={{ duration: 600 }}
        colorScale={colors}
        style={{
          labels: {
            fill: '#1e293b',
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />

      <View className="space-y-2 gap-1 mt-4">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center space-x-3">
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: colors[index],
                borderRadius: 2,
                marginRight: 4,
              }}
            />
            <Text className="text-slate-700 font-poppins text-sm">
              {item.x} ({item.y})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
