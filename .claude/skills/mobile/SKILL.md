---
name: mobile
description: React Native, Expo, mobile app development
triggers:
  - React Native development
  - Expo setup
  - Mobile app creation
  - iOS/Android specific features
generates: null
---

# Mobile Skill

Build cross-platform mobile apps.

## When This Skill Activates

- Creating React Native apps
- Setting up Expo
- Mobile-specific features
- iOS/Android platform code

## Expo vs Bare React Native

| Choose Expo When | Choose Bare When |
|------------------|------------------|
| Starting new project | Need native modules not in Expo |
| Want OTA updates | Heavy native customization |
| Don't need custom native code | Existing native codebase |
| Fast iteration | Specific build requirements |

## Expo Setup

```bash
# New project
npx create-expo-app@latest my-app
cd my-app

# Development build (for native code)
npx expo install expo-dev-client
npx expo run:ios  # or run:android
```

## Project Structure

```
app/
  (tabs)/
    index.tsx        # Home tab
    explore.tsx      # Explore tab
    _layout.tsx      # Tab layout
  _layout.tsx        # Root layout
components/
  ui/                # Design system
hooks/
constants/
  Colors.ts          # Theme colors
```

## Navigation (Expo Router)

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

## Platform-Specific Code

```typescript
import { Platform } from 'react-native';

// Style differences
const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
    },
    android: {
      elevation: 4,
    },
  }),
});

// Platform-specific files
// Component.ios.tsx
// Component.android.tsx
```

## Safe Areas

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

function Screen() {
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <Content />
    </SafeAreaView>
  );
}
```

## Touch Targets

```typescript
// Minimum 44x44 points for touch targets
<Pressable
  style={{ minWidth: 44, minHeight: 44 }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Icon />
</Pressable>
```

## Performance

### Lists
```typescript
// Use FlatList for long lists
<FlatList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  keyExtractor={item => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Images
```typescript
// Use expo-image for better caching
import { Image } from 'expo-image';

<Image
  source={uri}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

## Common Patterns

### State Persistence
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store
await AsyncStorage.setItem('user', JSON.stringify(user));

// Retrieve
const user = JSON.parse(await AsyncStorage.getItem('user') || 'null');
```

### Deep Linking
```typescript
// app.json
{
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    }
  }
}

// Handle links
// myapp://path/to/screen
```

## Testing

```typescript
// Jest + React Native Testing Library
import { render, fireEvent } from '@testing-library/react-native';

test('button press', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button onPress={onPress}>Click</Button>);
  
  fireEvent.press(getByText('Click'));
  expect(onPress).toHaveBeenCalled();
});
```

## Exit Criteria

- [ ] Runs on both iOS and Android
- [ ] Safe areas handled
- [ ] Touch targets ≥ 44pt
- [ ] Lists optimized with FlatList
- [ ] Images cached properly
- [ ] Platform-specific styles where needed
- [ ] Tests passing
