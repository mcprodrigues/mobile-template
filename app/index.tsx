import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList as RNFlatList } from 'react-native';

import OnboardingItem from '@/components/onboarding/OnboardingItem';
import Pagination from '@/components/onboarding/Pagination';
import { useAuth } from '@/contexts/AuthContext'; // importa o contexto de auth
import { onboardingData } from '@/data/onboardingData';

export default function Index() {
  const { user } = useAuth(); // pega o usuário logado

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<RNFlatList>(null);

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/page');
    }
  }, [user]);

  const handlePress = (index: number) => {
    if (index < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.push('/auth/splash/SplashScreen');
    }
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
