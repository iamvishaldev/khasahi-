import React, {PropsWithChildren} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type AppTextProps = PropsWithChildren<{
  variant?:
    | 'display'
    | 'title'
    | 'heading'
    | 'body'
    | 'caption'
    | 'label'
    | 'button'
    | 'wordmark';
  color?: 'primary' | 'secondary' | 'inverse';
  style?: StyleProp<TextStyle>;
}>;

export function AppText({
  children,
  variant = 'body',
  color = 'primary',
  style,
}: AppTextProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Text
      style={[
        theme.typography[variant],
        {color: theme.colors.text[color]},
        style,
      ]}>
      {children}
    </Text>
  );
}
