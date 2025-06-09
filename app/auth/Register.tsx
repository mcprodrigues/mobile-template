import Header from '@/components/Header';
import RegisterSteps from '@/components/RegisterSteps';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Register() {
  const router = useRouter();

  return (
    <View className="flex-1 pt-14 bg-white">
      <Header router={router} title="Criar conta" />
      <RegisterSteps />
    </View>
  );
}
