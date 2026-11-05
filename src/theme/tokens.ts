import { colors } from './colors';
import { motion } from './motion';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  radius,
  shadow: shadows,
  iconSizes: { sm: 16, md: 20, lg: 24, xl: 32 },
  breakpoints: { mobile: 375, tablet: 768, desktop: 1440 },
  zIndex: { dropdown: 100, sticky: 200, modal: 1000, toast: 1100 },
  animation: motion,
  typography,
} as const;
