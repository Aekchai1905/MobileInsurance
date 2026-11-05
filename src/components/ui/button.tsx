import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';
import { theme } from '@/theme';

const variants = {
  primary: { container: 'button-primary', label: 'text-white', spinner: theme.colors.white },
  secondary: { container: 'button-secondary', label: 'text-orange-dark', spinner: theme.colors.orangeDark },
  outline: { container: 'button-outline', label: 'text-orange', spinner: theme.colors.orange },
  ghost: { container: 'button-ghost', label: 'text-orange-dark', spinner: theme.colors.orangeDark },
  destructive: { container: 'button-destructive', label: 'text-white', spinner: theme.colors.white },
} as const;
const sizes = { sm: 'min-h-11 px-3 py-2', md: 'min-h-12 px-5 py-3', lg: 'min-h-14 px-6 py-4' } as const;

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
};

/** Custom brand geometry and NativeWind styling, shared across native and web. */
export function Button({ title, variant = 'primary', size = 'md', loading = false,
  disabled = false, className = '', style, accessibilityState, ...props }: ButtonProps) {
  const blocked = disabled || loading;
  return (
    <Pressable {...props} accessibilityRole="button" accessibilityLabel={props.accessibilityLabel ?? title}
      accessibilityState={{ ...accessibilityState, disabled: blocked, busy: loading }} disabled={blocked}
      className={`button ${sizes[size]} ${variants[variant].container} ${className}`}
      style={(state) => [{ opacity: blocked ? 0.45 : state.pressed ? 0.75 : 1 },
        typeof style === 'function' ? style(state) : style]}>
      {loading ? <ActivityIndicator color={variants[variant].spinner} /> :
        <Text className={`font-prompt-semi-bold text-body-medium ${variants[variant].label}`}>{title}</Text>}
    </Pressable>
  );
}
