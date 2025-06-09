import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'outline' | 'disabled';
  onPress?: () => void;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  onPress,
  loading = false,
}) => {
  const isDisabled = variant === 'disabled' || loading;

  const baseStyle = 'w-80 rounded-full py-4 px-8 items-center justify-center';
  const primaryStyle = 'bg-blue-700';
  const outlineStyle = 'border border-blue-700 bg-transparent';
  const disabledStyle = 'bg-gray-300';

  const textBase = 'text-lg font-poppinssb';
  const textPrimary = 'text-white';
  const textOutline = 'text-blue-700';
  const textDisabled = 'text-gray-500';

  const buttonClass = [
    baseStyle,
    variant === 'primary' && primaryStyle,
    variant === 'outline' && outlineStyle,
    (variant === 'disabled' || loading) && disabledStyle,
  ]
    .filter(Boolean)
    .join(' ');

  const textClass = [
    textBase,
    variant === 'primary' && textPrimary,
    variant === 'outline' && textOutline,
    (variant === 'disabled' || loading) && textDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity
      className={buttonClass}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#1D4ED8' : '#fff'} />
      ) : (
        <Text className={textClass}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
