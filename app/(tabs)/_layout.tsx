import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { TabIcons } from '@/constants/icons';

type TabBarIconProps = {
  focused: boolean;
  label: string;
  iconActive: React.FC<SvgProps>;
  iconInactive: React.FC<SvgProps>;
};

const TabIcon = ({ focused, label, iconActive: IconActive, iconInactive: IconInactive }: TabBarIconProps) => {
  const Icon = focused ? IconActive : IconInactive;

  return (
    <View className="items-center justify-center min-w-[80px] pb-8">
      <Icon width={24} height={24} style={{ marginBottom: 4 }} />
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
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 75,
          elevation: 0,
          shadowOpacity: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          flex: 1,
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
              iconActive={TabIcons.index.active}
              iconInactive={TabIcons.index.inactive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          href: null,
                    tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Início"
              iconActive={TabIcons.index.active}
              iconInactive={TabIcons.index.inactive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Pokedex"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Pokédex"
              iconActive={TabIcons.pokedex.active}
              iconInactive={TabIcons.pokedex.inactive}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Dashboard"
              iconActive={TabIcons.dashboard.active}
              iconInactive={TabIcons.dashboard.inactive}
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
              iconActive={TabIcons.profile.active}
              iconInactive={TabIcons.profile.inactive}
            />
          ),
        }}
      />
    </Tabs>
  );
}