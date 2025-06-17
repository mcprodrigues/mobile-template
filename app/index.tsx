import OnboardingItem from '@/components/onboarding/OnboardingItem';
import Pagination from '@/components/onboarding/Pagination';
import { onboardingData } from '@/data/onboardingData';
import { router } from 'expo-router';

import React, { useRef } from 'react';
import { Animated, FlatList as RNFlatList } from 'react-native';

export default function OnboardingScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<RNFlatList>(null);

  const handlePress = (index: number) => {
    if (index < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.push('/auth/splash/SplashScreen');  
      
  };
  };

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item, index }) => (
          <OnboardingItem
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            buttonTitle={item.buttonTitle}
            onPress={() => handlePress(index)}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <Pagination scrollX={scrollX} dataLength={onboardingData.length} />
    </>
  );
}
