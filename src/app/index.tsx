import { DesignSystemPreview } from '@/components/design-system-preview';
import { Stack } from 'expo-router';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Mee Tuck - Design System' }} />
      <DesignSystemPreview />
    </>
  );
}
