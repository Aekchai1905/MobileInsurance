# Mee Tuck design system

The app uses NativeWind 5 / Tailwind 4. No dependency versions were changed.

## Tokens

The source tokens are split by category in this folder: `colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, and `motion.ts`. `tokens.ts` combines them into the `theme` object for runtime use; import tokens from `@/theme`. `tokens.css` mirrors these values for NativeWind's Tailwind theme. After changing token values, run `node scripts/generate-theme.cjs` to regenerate the CSS.

The source defines:
- **Primary palette** — orange `#FF8000`, orange-dark `#CC6600`, orange-light `#FFF1E6`, navy `#102747`, navy-light `#1E4A80`
- **Semantic colors** — success `#16A34A` / success-light `#DCFCE7`, warning `#F59E0B` / warning-light `#FEF9C3`, error `#DC2626` / error-light `#FEE2E2`, info `#2563EB` / info-light `#DBEAFE`
- **Surfaces** — background `#F8FAFC`, surface `#FFFFFF`, border `#E2E8F0`
- 4px spacing scale, 8/12/16/24px radii, three shadows, icon sizes, breakpoints, stacking levels, and motion durations

Screenshot measurements are not a substitute for original design specifications. The supplied reference is an overview. The light theme is intentional; no dark palette was supplied.

## NativeWind utilities

**Layout:** `screen`, `screen-content`

**Cards/surfaces:** `card`, `card-compact`, `kpi-card`, `hero-banner`

**Headers:** `section-header`, `page-header`, `section-label`

**Forms:** `field`, `field-error`, `input-row`

**Badges/chips:** `badge`, `chip`, `chip-success`, `chip-warning`, `chip-error`, `chip-info`, `chip-neutral`, `chip-orange`

**Typography:** `type-h1`–`type-h4`, `type-body`, `type-body-large`, `type-body-small`, `type-caption`, `type-label`

**KPI display:** `kpi-value`, `kpi-label`

**Avatars:** `avatar-sm` (32px), `avatar-md` (40px), `avatar-lg` (56px), `avatar-xl` (80px), `avatar-placeholder`

**Lists:** `list-item`, `divider`

**Detail rows:** `info-row`, `info-label`, `info-value`

**Bottom nav:** `bottom-nav`, `bottom-nav-item`, `bottom-nav-label`, `bottom-nav-label-active`, `bottom-nav-label-inactive`

**Role tabs:** `role-chip`, `role-chip-active`, `role-chip-inactive`

Token utilities include `bg-orange`, `bg-orange-dark`, `bg-orange-light`, `bg-navy`, `bg-navy-light`, `bg-success-light`, `bg-warning-light`, `bg-error-light`, `bg-info-light`, `text-navy`, `border-border`, `rounded-lg`, and `shadow-sm`. Layout spacing follows the standard Tailwind numeric scale at 4px per unit.

`AppText` defaults to Thai body typography and supports h1/h2/h3/h4/body-large/body/body-small/label/caption. The body style uses the reference's 18px regular scale. `Button` supports primary/secondary/outline/ghost/destructive, sm/md/lg, pressed feedback, disabled and loading accessibility states. The three brand variants follow the reference's orange/white, pale-orange/orange, and white/orange treatments.

## Fonts

Prompt (Thai and mixed content) and Poppins (English) are bundled locally in regular, medium, semibold and bold, with their SIL Open Font Licenses. `expo-font` loads all faces before hiding the splash in `src/app/_layout.tsx`. Use `font-prompt-regular`, `font-prompt-medium`, `font-prompt-semi-bold`, `font-prompt-bold` and equivalent `font-poppins-*` classes. Select the actual font face rather than adding `font-bold` to a static custom font. Explicitly choose Prompt for Thai; Poppins does not contain Thai glyphs. Text retains system font scaling.

## Preview and validation

Run `npm run web` or `npm start`, then open the index screen. Review palette, typography, buttons and input against the reference. Tap enabled buttons to see feedback; verify disabled/loading buttons do not fire. Test keyboard focus, large device text sizes, Thai wrapping and narrow/wide layouts. The preview collects no customer data and performs no insurance operations.

Type checking covers `src/` rather than the unrelated exported example projects. Run `npx tsc --noEmit` and `npx expo export --platform web`. Native bundling can be checked with `npx expo export --platform android --platform ios`. Visual device validation is still required before release.
