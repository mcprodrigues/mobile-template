import { ImageSourcePropType } from 'react-native';

export interface OnboardingItemType {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  buttonTitle: string;
}

export const onboardingData: OnboardingItemType[] = [
  {
    id: '1',
    image: require('@/assets/images/moema.gif'),
    title: 'Explore os Animais do Campus Unifor',
    subtitle: 'Uma Pokédex feita para você explorar o campus da Universidade de Fortaleza de forma prática e interativa.',
    buttonTitle: 'Continuar',
  },
  {
    id: '2',
    image: require('@/assets/images/hilda.png'),
    title: 'Mantenha sua Pokédex atualizada',
    subtitle: 'Cadastre-se e acesse sempre a lista dos animais do campus, com informações para você explorar a qualquer momento.',
    buttonTitle: 'Vamos começar!',
  },
];
