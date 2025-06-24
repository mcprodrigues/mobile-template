
import Toast from 'react-native-toast-message';

export function showBadgeToast(title: string, subtitle: string, description: string) {
  Toast.show({
    type: 'customBadge',
    position: 'top',
    props: { title, subtitle, description },
    visibilityTime: 6000, 
    autoHide: true,
  });
}
