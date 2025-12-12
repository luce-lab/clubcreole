# Spec: Mobile App Foundation

**Capability:** `mobile-app-foundation`
**Status:** `proposed`
**Last Updated:** 2025-11-30

## Overview

Establish the foundational infrastructure to transform the React web application into a mobile application using Capacitor, including project setup, build configuration, and basic mobile app functionality.

---

## ADDED Requirements

### REQ-MAF-001: Capacitor Installation and Configuration

The system shall integrate Capacitor into the existing React/Vite project.

**Acceptance Criteria:**
- Capacitor core package installed (`@capacitor/core`, `@capacitor/cli`)
- `capacitor.config.ts` created with project configuration
- iOS and Android platforms added successfully
- Configuration includes app ID, name, and server URL

#### Scenario: Developer installs Capacitor

**Given** a working React + Vite web application
**When** the developer runs `npm install @capacitor/core @capacitor/cli`
**And** runs `npx cap init`
**Then** Capacitor is configured with app ID "com.clubcreole.app"
**And** app name is "ClubCreole"
**And** web directory is set to "dist"
**And** configuration file `capacitor.config.ts` exists at project root

---

### REQ-MAF-002: iOS Project Initialization

The system shall create and configure an iOS project for mobile deployment.

**Acceptance Criteria:**
- iOS platform added via `npx cap add ios`
- Xcode project structure created in `/ios` directory
- iOS deployment target set to 13.0 or higher
- CocoaPods dependencies installed
- Project opens in Xcode without errors

#### Scenario: Developer sets up iOS project

**Given** Capacitor is installed
**When** the developer runs `npx cap add ios`
**Then** an `/ios` directory is created
**And** contains `App.xcodeproj` Xcode project
**And** contains `Podfile` with Capacitor dependencies
**And** running `npx cap open ios` opens project in Xcode successfully
**And** deployment target is iOS 13.0 or higher

---

### REQ-MAF-003: Android Project Initialization

The system shall create and configure an Android project for mobile deployment.

**Acceptance Criteria:**
- Android platform added via `npx cap add android`
- Android Studio project structure created in `/android` directory
- Minimum SDK version set to 22 (Android 5.1)
- Target SDK version set to 33 or higher
- Gradle builds successfully

#### Scenario: Developer sets up Android project

**Given** Capacitor is installed
**When** the developer runs `npx cap add android`
**Then** an `/android` directory is created
**And** contains Android Studio project structure
**And** contains `build.gradle` with Capacitor dependencies
**And** `AndroidManifest.xml` includes required permissions
**And** running `npx cap open android` opens project in Android Studio successfully
**And** minSdkVersion is 22 and targetSdkVersion is 33+

---

### REQ-MAF-004: Mobile-Specific Build Configuration

The system shall provide separate build configurations for mobile platforms.

**Acceptance Criteria:**
- New npm scripts: `build:mobile`, `sync:ios`, `sync:android`
- Vite build mode for mobile (`--mode mobile`)
- Environment file `.env.mobile` for mobile-specific variables
- Build output optimized for mobile (smaller bundle size)
- Source maps disabled in production mobile builds

#### Scenario: Developer builds for mobile

**Given** the application has both web and mobile configurations
**When** the developer runs `npm run build:mobile`
**Then** Vite builds with mobile optimizations
**And** output is placed in `dist/` directory
**And** bundle size is optimized (< 5MB initial bundle)
**And** running `npx cap sync ios` copies web assets to iOS project
**And** running `npx cap sync android` copies web assets to Android project

---

### REQ-MAF-005: Platform-Adaptive Routing

The system shall adapt routing strategy based on the runtime platform.

**Acceptance Criteria:**
- HashRouter used for native mobile platforms
- BrowserRouter used for web platform
- Platform detection implemented using Capacitor API
- All existing routes work on both platforms
- Deep linking capability preserved

#### Scenario: App uses correct router for platform

**Given** the application is running
**When** the platform is web
**Then** `BrowserRouter` is used for navigation
**And** URLs are clean (e.g., `/hebergements`)

**When** the platform is iOS or Android
**Then** `HashRouter` is used for navigation
**And** URLs use hash routing (e.g., `#/hebergements`)
**And** all routes navigate correctly

#### Scenario: Platform detection works correctly

**Given** Capacitor is initialized
**When** `Capacitor.isNativePlatform()` is called
**Then** it returns `true` on iOS and Android
**And** returns `false` on web
**When** `Capacitor.getPlatform()` is called
**Then** it returns `'ios'`, `'android'`, or `'web'` correctly

---

### REQ-MAF-006: Platform Service Utility

The system shall provide a centralized service for platform detection.

**Acceptance Criteria:**
- `platformService` module created at `src/services/platformService.ts`
- Exports functions: `isNative()`, `isIOS()`, `isAndroid()`, `isWeb()`, `getPlatform()`
- Used consistently across codebase
- TypeScript types included

#### Scenario: Components use platform service

**Given** a component needs platform-specific behavior
**When** it imports `platformService`
**Then** it can call `platformService.isNative()` to check if running on mobile
**And** can call `platformService.isIOS()` to check for iOS specifically
**And** can call `platformService.isAndroid()` to check for Android specifically
**And** all functions return correct boolean values

---

### REQ-MAF-007: Mobile App Launch

The system shall launch successfully on iOS and Android simulators/emulators.

**Acceptance Criteria:**
- App builds and installs on iOS Simulator
- App builds and installs on Android Emulator
- Splash screen displays on launch
- Home page loads within 5 seconds
- No JavaScript errors in console
- App does not crash on startup

#### Scenario: App launches on iOS Simulator

**Given** the mobile build is complete
**And** iOS Simulator is running
**When** the developer runs `npx cap run ios`
**Then** the app installs on the simulator
**And** the splash screen appears
**And** the home page loads successfully
**And** no errors appear in Safari Developer Console

#### Scenario: App launches on Android Emulator

**Given** the mobile build is complete
**And** Android Emulator is running
**When** the developer runs `npx cap run android`
**Then** the app installs on the emulator
**And** the splash screen appears
**And** the home page loads successfully
**And** no errors appear in Chrome DevTools

---

### REQ-MAF-008: Responsive Layout Verification

The system shall verify that existing responsive design works on mobile devices.

**Acceptance Criteria:**
- All pages render correctly on mobile screen sizes (375px - 428px width)
- Touch targets are at least 44x44 pixels (iOS) or 48x48dp (Android)
- Text is readable without zooming
- Images scale appropriately
- No horizontal scrolling on portrait mode

#### Scenario: Pages render correctly on mobile

**Given** the app is running on a mobile device
**When** the user navigates to any page
**Then** the page layout adapts to the screen width
**And** all interactive elements are easily tappable
**And** text size is at least 16px for body content
**And** images fit within the viewport
**And** no content is cut off horizontally

---

### REQ-MAF-009: Build Scripts and Automation

The system shall provide convenient npm scripts for mobile development workflow.

**Acceptance Criteria:**
- `npm run build:mobile` - builds for mobile
- `npm run sync:ios` - syncs web build to iOS
- `npm run sync:android` - syncs web build to Android
- `npm run mobile:ios` - builds and opens iOS project
- `npm run mobile:android` - builds and opens Android project
- `npm run dev:mobile` - live reload for mobile development (using Capacitor live reload)

#### Scenario: Developer uses mobile workflow scripts

**Given** the developer wants to test on iOS
**When** they run `npm run mobile:ios`
**Then** the mobile build is created
**And** web assets are synced to iOS project
**And** Xcode opens with the project
**And** the developer can run the app from Xcode

---

### REQ-MAF-010: Supabase Client Compatibility

The system shall ensure Supabase client works correctly on mobile platforms.

**Acceptance Criteria:**
- Supabase client initializes on mobile
- Authentication flows work (sign in, sign up, sign out)
- Database queries execute successfully
- Real-time subscriptions function on mobile
- Storage uploads/downloads work on mobile

#### Scenario: User authenticates on mobile

**Given** the app is running on a mobile device
**When** the user enters credentials and submits login form
**Then** Supabase authentication succeeds
**And** auth token is stored securely
**And** user is redirected to dashboard
**And** subsequent API requests include auth token

#### Scenario: Data fetching works on mobile

**Given** a user is authenticated
**When** they navigate to accommodations page
**Then** data is fetched from Supabase
**And** accommodations are displayed
**And** infinite scroll works correctly
**And** images load from Supabase storage

---

## References

- Related Specs: `native-features`, `platform-specific`
- Design Document: `design.md` sections "Architecture Overview", "Router Strategy"
- External Docs: [Capacitor Getting Started](https://capacitorjs.com/docs/getting-started)
