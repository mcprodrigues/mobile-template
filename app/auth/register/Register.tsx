import RegisterSteps from '@/app/auth/register/RegisterSteps';
import { View } from 'react-native';

export default function Register() {

  return (
    <View className="flex-1 pt-14 bg-white">
      <RegisterSteps />
    </View>
  );
}
