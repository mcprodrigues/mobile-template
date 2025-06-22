import { Stack } from 'expo-router';

export default function CaptureLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,         // oculta só o header
        presentation: 'card',       // não use 'modal'
      }}
    />
  );
}
