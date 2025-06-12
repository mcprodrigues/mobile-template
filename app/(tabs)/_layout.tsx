import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

type TabBarIconProps = {
  focused: boolean;
  label: string;
  iconActive: any;
  iconInactive: any;
};

const TabIcon = ({ focused, label, iconActive, iconInactive }: TabBarIconProps) => {
  return (
    <View className="items-center justify-center min-w-[80px]">
      <Image
        source={focused ? iconActive : iconInactive}
        style={{ width: 24, height: 24, marginBottom: 4 }}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={`text-[12px] leading-[16px] text-center font-poppins ${focused ? 'text-blue-800' : 'text-zinc-500'}`}
      >
        {label}
      </Text>
    </View>
  );
};

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 85,
          elevation: 0,
          shadowOpacity: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 80,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Início"
              iconActive={require('@/assets/icons/regions-active.png')}
              iconInactive={require('@/assets/icons/regions.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Regions"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Pokédex"
              iconActive={require('@/assets/icons/pokedex-active.png')}
              iconInactive={require('@/assets/icons/pokedex.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Favoritos"
              iconActive={require('@/assets/icons/favorites-active.png')}
              iconInactive={require('@/assets/icons/favorites.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Perfil"
              iconActive={require('@/assets/icons/profile-active.png')}
              iconInactive={require('@/assets/icons/profile.png')}
            />
          ),
        }}
      />
    </Tabs>
  );
}
