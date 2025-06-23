import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import { VictoryPie } from 'victory-native';

type CaptureItem = {
  animal: { name: string };
  capturedAt: string;
};

type Props = {
  captureHistory: CaptureItem[];
};

export default function CaptureCountPieChart({ captureHistory }: Props) {
  const count: Record<string, number> = {};

  for (const item of captureHistory) {
    const name = item?.animal?.name;
    if (!name) continue;
    count[name] = (count[name] || 0) + 1;
  }

  const chartData = Object.entries(count)
    .filter(([name, y]) => name && y > 0)
    .map(([name, y]) => ({ x: name, y }));

  if (!chartData.length) {
    return (
      <View>
        {/* ou exibir uma mensagem */}
      </View>
    );
  }

  return (
    <VictoryPie
      data={chartData}
      labelRadius={80}
      innerRadius={50}
      labels={({ datum }: { datum: { x: string; y: number } }) => `${datum.x}: ${datum.y}`}
    />
  );
}
