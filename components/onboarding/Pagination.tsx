import React from 'react';
import { Animated, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  scrollX: Animated.Value;
  dataLength: number;
}

export default function Pagination({ scrollX, dataLength }: Props) {
  return (
    <View className="absolute bottom-24 flex-row justify-center w-full">
      {Array.from({ length: dataLength }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#D1D5DB', '#1746C7', '#D1D5DB'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={{
              width: dotWidth,
              height: 8,
              borderRadius: 8,
              backgroundColor: dotColor,
              marginHorizontal: 4,
            }}
          />
        );
      })}
    </View>
  );
}
