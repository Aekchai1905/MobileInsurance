import { Text, type TextProps } from 'react-native';

const variants = {
  h1: 'type-h1', h2: 'type-h2', h3: 'type-h3', h4: 'type-h4',
  bodyLarge: 'type-body-large', body: 'type-body', bodySmall: 'type-body-small',
  label: 'type-label', caption: 'type-caption',
} as const;
export function AppText({ variant = 'body', className = '', ...props }:
  TextProps & { variant?: keyof typeof variants }) {
  return <Text {...props} className={`${variants[variant]} ${className}`} />;
}
