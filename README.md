# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



# Mee Tuck Insurance — Design System

Original Mee Tuck branding inspired by the supplied visual references. No official FWD logo is recreated in vector branding. Uploaded reference images are retained under assets/images and assets/mascot for visual comparison and may contain third-party marks; check rights before commercial publication. Sample insurance figures are **UI mock data only**, not verified quotations.

## Contents
- `assets/logos`: editable SVG and PNG primary/secondary/light/dark marks
- `assets/icons`: original app icon/favicon in SVG and PNG
- `assets/mascot`: original editable vector mascot and supplied mascot visual reference
- `tokens`: CSS, TypeScript and JSON design tokens
- `components`: React TypeScript components and shared CSS
- `react/examples`: Vite dashboard demo
- `nextjs/examples`: Next.js app router example
- `react-native/examples`: Expo screen and reusable native card
- `preview/design-system.html`: browser board; `design-system.png` is 1920×1080

## Quick start
1. Open the folder in VS Code.
2. Preview `preview/design-system.html` with a browser or Live Server.
3. React demo: `cd react/examples && npm install && npm run dev`.
4. Next.js: create a Next app, copy the example and shared components, then import shared CSS in `app/layout.tsx`.
5. Expo: create a new Expo project and copy files from `react-native/examples`.
6. Import `tokens/tokens.css` globally for web, or `tokens/tokens.ts` for TypeScript.

## Accessibility and responsive behavior
Mobile-first layout: 375px / 768px / 1440px. Use visible focus, semantic controls, 44px minimum touch targets and accessible labels. Contrast should be verified for all custom combinations before release.

## Font licensing
Fonts are loaded from Google Fonts via CSS; font binary files are not bundled. For Expo use `expo-font` with your own licensed Prompt/Poppins font assets.

## Component states
Buttons include hover, active, disabled; inputs include focus and native invalid/error; tab navigation includes selected state. Extend the example primitives for production validation, keyboard handling and screen reader testing.
