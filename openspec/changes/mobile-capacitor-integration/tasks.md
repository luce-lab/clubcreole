# Tasks: Mobile Capacitor Integration

**Change ID:** `mobile-capacitor-integration`
**Status:** `proposed`
**Last Updated:** 2025-11-30

## Task Overview

This document outlines all tasks required to transform the ClubCreole web application into a cross-platform mobile application using Capacitor.

---

## Phase 1: Foundation Setup (REQ-MAF-*)

### 1.1 Install Capacitor Dependencies

**Requirement:** REQ-MAF-001

- [ ] Install `@capacitor/core` and `@capacitor/cli` packages
- [ ] Initialize Capacitor with `npx cap init`
  - App name: "ClubCreole"
  - App ID: "com.clubcreole.app"
  - Web directory: "dist"
- [ ] Create `capacitor.config.ts` with base configuration
- [ ] Add Capacitor imports to `src/main.tsx` if needed
- [ ] Test that web build still works: `npm run build`

**Validation:**
- `capacitor.config.ts` exists at project root
- Config contains correct app ID and name
- Web build completes successfully

---

### 1.2 Add iOS Platform

**Requirement:** REQ-MAF-002

- [ ] Run `npx cap add ios`
- [ ] Verify `/ios` directory created with Xcode project
- [ ] Check `ios/App/Podfile` contains Capacitor dependencies
- [ ] Run `cd ios/App && pod install`
- [ ] Open project in Xcode: `npx cap open ios`
- [ ] Verify deployment target is iOS 13.0+ in Xcode project settings
- [ ] Build in Xcode to verify project structure

**Validation:**
- Xcode opens project without errors
- Project builds successfully in Xcode
- iOS Simulator can be selected as destination

---

### 1.3 Add Android Platform

**Requirement:** REQ-MAF-003

- [ ] Run `npx cap add android`
- [ ] Verify `/android` directory created with Android Studio project structure
- [ ] Check `android/app/build.gradle` for Capacitor dependencies
- [ ] Check `android/app/src/main/AndroidManifest.xml` created
- [ ] Verify `minSdkVersion 22` in `android/variables.gradle`
- [ ] Verify `targetSdkVersion 33+` in `android/variables.gradle`
- [ ] Open project in Android Studio: `npx cap open android`
- [ ] Sync Gradle files in Android Studio
- [ ] Build in Android Studio to verify project structure

**Validation:**
- Android Studio opens project without errors
- Gradle sync completes successfully
- Project builds successfully in Android Studio

---

### 1.4 Configure Build Scripts

**Requirement:** REQ-MAF-004, REQ-MAF-009

- [ ] Add `.env.mobile` environment file with mobile-specific variables
- [ ] Update `package.json` scripts:
  ```json
  {
    "build:mobile": "vite build --mode mobile",
    "sync:ios": "npx cap sync ios",
    "sync:android": "npx cap sync android",
    "mobile:ios": "npm run build:mobile && npm run sync:ios && npx cap open ios",
    "mobile:android": "npm run build:mobile && npm run sync:android && npx cap open android"
  }
  ```
- [ ] Create `vite.config.mobile.ts` or update existing with mobile mode detection
- [ ] Configure output directory and base path for mobile
- [ ] Test build scripts: `npm run build:mobile`
- [ ] Test sync scripts: `npm run sync:ios && npm run sync:android`

**Validation:**
- `npm run build:mobile` completes successfully
- Build output in `dist/` directory
- iOS and Android projects sync without errors
- `npm run mobile:ios` builds and opens Xcode
- `npm run mobile:android` builds and opens Android Studio

---

### 1.5 Implement Platform Detection Service

**Requirement:** REQ-MAF-006

- [ ] Create `src/services/platformService.ts`
- [ ] Implement functions:
  - `isNative(): boolean`
  - `isIOS(): boolean`
  - `isAndroid(): boolean`
  - `isWeb(): boolean`
  - `getPlatform(): 'ios' | 'android' | 'web'`
- [ ] Use `Capacitor.isNativePlatform()` and `Capacitor.getPlatform()` from `@capacitor/core`
- [ ] Add TypeScript types
- [ ] Write unit tests for platform service (mocking Capacitor)
- [ ] Export service from `src/services/index.ts`

**Validation:**
- Service exports all required functions
- Functions return correct values when tested on web
- TypeScript types are correct
- Unit tests pass

---

### 1.6 Update Router for Platform-Adaptive Routing

**Requirement:** REQ-MAF-005

- [ ] Update `src/App.tsx` to conditionally use `HashRouter` or `BrowserRouter`
- [ ] Import `platformService`
- [ ] Create platform-adaptive Router component:
  ```typescript
  const Router = platformService.isNative() ? HashRouter : BrowserRouter;
  ```
- [ ] Test web routing still works (BrowserRouter)
- [ ] Test mobile routing with HashRouter (using dev build on simulator)

**Validation:**
- Web build uses BrowserRouter (clean URLs)
- Mobile build uses HashRouter (hash URLs)
- All routes navigate correctly on both platforms
- Deep linking works (test later with proper configuration)

---

### 1.7 Verify Supabase Client Compatibility

**Requirement:** REQ-MAF-010

- [ ] Test Supabase client initialization on iOS Simulator
- [ ] Test Supabase client initialization on Android Emulator
- [ ] Test authentication flow (sign in, sign up, sign out) on mobile
- [ ] Test database query on mobile (fetch accommodations)
- [ ] Test real-time subscription on mobile
- [ ] Test storage upload/download on mobile (if implemented)
- [ ] Fix any CORS or network issues on mobile

**Validation:**
- Supabase client works on iOS
- Supabase client works on Android
- Authentication flows complete successfully
- Data fetches correctly
- No network errors in console

---

### 1.8 Test App Launch on Simulators/Emulators

**Requirement:** REQ-MAF-007

- [ ] Build app for iOS: `npm run mobile:ios`
- [ ] Run on iOS Simulator from Xcode
- [ ] Verify splash screen appears
- [ ] Verify home page loads within 5 seconds
- [ ] Check Safari Developer Console for errors
- [ ] Build app for Android: `npm run mobile:android`
- [ ] Run on Android Emulator from Android Studio
- [ ] Verify splash screen appears
- [ ] Verify home page loads within 5 seconds
- [ ] Check Chrome DevTools for errors

**Validation:**
- App launches on iOS Simulator without crashes
- App launches on Android Emulator without crashes
- No JavaScript errors in console
- Splash screen displays
- Home page renders correctly

---

### 1.9 Verify Responsive Layout on Mobile

**Requirement:** REQ-MAF-008

- [ ] Test all major pages on iOS Simulator (various device sizes)
- [ ] Test all major pages on Android Emulator (various device sizes)
- [ ] Verify text is readable without zooming
- [ ] Verify touch targets are at least 44x44 pixels
- [ ] Verify images scale appropriately
- [ ] Verify no horizontal scrolling in portrait mode
- [ ] Test landscape orientation if supported
- [ ] Fix any layout issues found

**Validation:**
- All pages render correctly on mobile screen sizes
- Touch targets are appropriately sized
- No layout overflow or horizontal scroll
- Images display correctly

---

### 1.10 Document Foundation Setup

**Requirement:** General

- [ ] Create `docs/MOBILE_SETUP.md` with setup instructions
- [ ] Document iOS development requirements (Xcode, macOS)
- [ ] Document Android development requirements (Android Studio, SDK)
- [ ] Document build and run process
- [ ] Document troubleshooting common issues
- [ ] Update main `README.md` with mobile development section

**Validation:**
- Documentation is clear and complete
- Another developer can follow docs to set up mobile environment

---

## Phase 2: Native Features Integration (REQ-NF-*)

### 2.1 Install Capacitor Plugins

**Requirement:** All REQ-NF-*

- [ ] Install plugins:
  ```bash
  npm install @capacitor/status-bar
  npm install @capacitor/splash-screen
  npm install @capacitor/camera
  npm install @capacitor/geolocation
  npm install @capacitor/push-notifications
  npm install @capacitor/network
  npm install @capacitor/app
  ```
- [ ] Run `npx cap sync` to sync plugins to iOS and Android
- [ ] Verify plugins appear in Xcode and Android Studio projects
- [ ] Test that app still builds after adding plugins

**Validation:**
- All plugins installed in `package.json`
- iOS project synced successfully
- Android project synced successfully
- App builds without errors

---

### 2.2 Implement Status Bar Control

**Requirement:** REQ-NF-001

- [ ] Create `src/services/nativeFeatures/statusBarService.ts`
- [ ] Implement functions:
  - `setLightStyle()` - dark icons/text for light backgrounds
  - `setDarkStyle()` - light icons/text for dark backgrounds
  - `hide()`
  - `show()`
- [ ] Add platform check (status bar only on mobile)
- [ ] Initialize status bar in `src/App.tsx` or main entry point
- [ ] Set default style based on theme
- [ ] Update style when theme changes (if dark mode implemented)

**Validation:**
- Status bar style changes correctly on mobile
- Status bar methods do nothing on web (no errors)
- Style matches app theme

---

### 2.3 Implement Splash Screen

**Requirement:** REQ-NF-002

- [ ] Add splash screen images to iOS project (`ios/App/App/Assets.xcassets/Splash.imageset/`)
- [ ] Configure iOS `LaunchScreen.storyboard`
- [ ] Add splash screen images to Android project (`android/app/src/main/res/drawable-*/splash.png`)
- [ ] Configure Android splash screen in `android/app/src/main/res/values/styles.xml`
- [ ] Set splash screen background color to brand color
- [ ] Implement splash screen auto-hide in `src/main.tsx`:
  ```typescript
  import { SplashScreen } from '@capacitor/splash-screen';

  // After app is ready
  SplashScreen.hide();
  ```
- [ ] Set max duration 3 seconds
- [ ] Test splash screen on iOS
- [ ] Test splash screen on Android

**Validation:**
- Splash screen displays on app launch
- Shows ClubCreole logo and brand color
- Auto-hides when app is ready (< 3 seconds)
- Works on both iOS and Android

---

### 2.4 Create Camera Service

**Requirement:** REQ-NF-003

- [ ] Create `src/services/nativeFeatures/cameraService.ts`
- [ ] Implement functions:
  - `takePicture(options?)` - open native camera
  - `selectFromGallery(options?)` - open photo picker
  - `webFilePicker()` - fallback for web
- [ ] Configure quality, result type, allow editing
- [ ] Handle permissions (request on first use)
- [ ] Platform detection for native vs. web
- [ ] Return consistent format across platforms
- [ ] Handle errors and permission denials

**Validation:**
- Camera opens on mobile
- Photo is captured and returned
- Gallery picker works on mobile
- Web fallback uses file input
- Permissions requested correctly

---

### 2.5 Create Camera React Hook

**Requirement:** REQ-NF-003, REQ-NF-010

- [ ] Create `src/hooks/useCamera.ts`
- [ ] Implement hook with state:
  - `photo: string | null`
  - `isLoading: boolean`
  - `error: string | null`
- [ ] Implement functions:
  - `takePicture()`
  - `selectFromGallery()`
  - `reset()`
- [ ] Handle loading and error states
- [ ] Return hook interface

**Validation:**
- Hook can be used in components
- Loading states work correctly
- Errors are captured
- Photo data is returned

---

### 2.6 Integrate Camera in Profile Page

**Requirement:** REQ-NF-003

- [ ] Add "Change Profile Photo" button to user profile page
- [ ] Use `useCamera` hook
- [ ] Show options: "Take Photo" or "Choose from Gallery"
- [ ] Display photo preview after selection
- [ ] Allow user to confirm or retake
- [ ] Upload photo to Supabase Storage
- [ ] Update user profile with photo URL
- [ ] Test on mobile devices

**Validation:**
- User can take photo with camera
- User can select photo from gallery
- Photo preview displays
- Photo uploads to storage
- Profile updates with photo

---

### 2.7 Create Geolocation Service

**Requirement:** REQ-NF-004

- [ ] Create `src/services/nativeFeatures/geolocationService.ts`
- [ ] Implement functions:
  - `getCurrentPosition()` - get current location
  - `watchPosition(callback)` - watch location changes
  - `clearWatch(id)` - stop watching
- [ ] Configure high accuracy
- [ ] Handle permissions
- [ ] Web fallback using browser Geolocation API
- [ ] Handle errors (permission denied, unavailable)

**Validation:**
- Location is retrieved on mobile
- Accuracy is acceptable
- Permissions requested correctly
- Web fallback works
- Errors handled gracefully

---

### 2.8 Create Geolocation React Hook

**Requirement:** REQ-NF-004, REQ-NF-010

- [ ] Create `src/hooks/useGeolocation.ts`
- [ ] Implement hook with state:
  - `position: { latitude, longitude } | null`
  - `isLoading: boolean`
  - `error: string | null`
- [ ] Implement functions:
  - `getCurrentLocation()`
  - `watchLocation()`
  - `stopWatching()`
- [ ] Handle loading and error states

**Validation:**
- Hook provides current location
- Loading states work
- Errors are captured
- Watching works correctly

---

### 2.9 Integrate Geolocation for Finding Nearby Accommodations

**Requirement:** REQ-NF-004

- [ ] Add "Find Nearby" button to accommodations page
- [ ] Use `useGeolocation` hook
- [ ] Request location permission with explanation
- [ ] Calculate distance from user to each accommodation
- [ ] Sort accommodations by distance
- [ ] Display distance in list (e.g., "2.3 km away")
- [ ] Handle permission denial with fallback (manual location entry)
- [ ] Test on mobile devices

**Validation:**
- User location is retrieved
- Accommodations sorted by distance
- Distance displayed correctly
- Permission denial handled gracefully

---

### 2.10 Create Push Notifications Service

**Requirement:** REQ-NF-005

- [ ] Create `src/services/nativeFeatures/pushNotificationService.ts`
- [ ] Implement functions:
  - `requestPermission()` - request notification permission
  - `register()` - register for push notifications
  - `getToken()` - get device token
  - `addListener(event, callback)` - listen for notifications
- [ ] Handle registration success and failure
- [ ] Handle notification received (foreground and background)
- [ ] Handle notification tapped
- [ ] Store device token in backend

**Validation:**
- Permission is requested
- Device token is generated
- Token is sent to backend
- Notifications are received

---

### 2.11 Integrate Push Notifications on Login

**Requirement:** REQ-NF-005

- [ ] Request notification permission after user logs in
- [ ] Show explanation before requesting permission
- [ ] Register for push notifications if permission granted
- [ ] Send device token to Supabase backend
- [ ] Store token in `user_devices` table (create if needed)
- [ ] Handle permission denial gracefully

**Validation:**
- User is prompted for permission
- Token sent to backend
- Token stored in database

---

### 2.12 Handle Push Notification Events

**Requirement:** REQ-NF-005

- [ ] Listen for `pushNotificationReceived` event (foreground)
- [ ] Display in-app toast/alert when notification received in foreground
- [ ] Listen for `pushNotificationActionPerformed` event (tapped)
- [ ] Navigate to relevant page when notification tapped (e.g., booking details)
- [ ] Parse notification data to extract route and parameters
- [ ] Update badge count on iOS (if applicable)
- [ ] Test with Firebase Cloud Messaging (FCM) for Android
- [ ] Test with APNs for iOS (requires certificates)

**Validation:**
- Notifications display when received in foreground
- App navigates correctly when notification tapped
- Badge count updates on iOS

---

### 2.13 Create Network Detection Service

**Requirement:** REQ-NF-006

- [ ] Create `src/services/nativeFeatures/networkService.ts`
- [ ] Implement functions:
  - `getStatus()` - get current network status
  - `addListener(callback)` - listen for network changes
  - `removeListener(id)` - stop listening
- [ ] Detect online/offline status
- [ ] Detect connection type (wifi, cellular, none)
- [ ] Web fallback using `navigator.onLine`

**Validation:**
- Network status is detected correctly
- Changes trigger listeners
- Web fallback works

---

### 2.14 Create Network React Hook

**Requirement:** REQ-NF-006, REQ-NF-010

- [ ] Create `src/hooks/useNetwork.ts`
- [ ] Implement hook with state:
  - `isOnline: boolean`
  - `connectionType: string`
- [ ] Listen for network changes
- [ ] Update state when network changes

**Validation:**
- Hook provides network status
- Status updates when network changes
- Works on web and mobile

---

### 2.15 Implement Offline Indicator UI

**Requirement:** REQ-NF-006

- [ ] Create `OfflineIndicator` component
- [ ] Use `useNetwork` hook
- [ ] Display banner at top of screen when offline
- [ ] Show "You are offline" message
- [ ] Hide banner when back online
- [ ] Add to main `App.tsx` layout

**Validation:**
- Banner displays when device goes offline
- Banner hides when device goes online
- Banner does not interfere with app usage

---

### 2.16 Handle Offline Scenarios

**Requirement:** REQ-NF-006

- [ ] Queue failed requests when offline
- [ ] Retry queued requests when back online
- [ ] Cache critical data for offline viewing
- [ ] Show user-friendly error messages for offline actions
- [ ] Prevent actions that require network when offline

**Validation:**
- Failed requests are queued
- Requests retry when online
- User sees appropriate messaging

---

### 2.17 Create App Lifecycle Service

**Requirement:** REQ-NF-007

- [ ] Create `src/services/nativeFeatures/appService.ts`
- [ ] Implement functions:
  - `addStateChangeListener(callback)` - listen for app state changes
  - `addUrlOpenListener(callback)` - listen for URL open events
  - `addBackButtonListener(callback)` - listen for back button (Android)
  - `exitApp()` - programmatically exit app
- [ ] Handle active, background, inactive states

**Validation:**
- State changes are detected
- Listeners trigger correctly
- URL opens are captured

---

### 2.18 Implement App Lifecycle Handling

**Requirement:** REQ-NF-007

- [ ] Listen for app state changes in `App.tsx`
- [ ] Pause timers/intervals when app goes to background
- [ ] Refresh data when app returns to foreground (if > 5 min)
- [ ] Save app state before backgrounding
- [ ] Restore state when returning to foreground
- [ ] Handle Android back button:
  - Navigate back in history
  - Minimize app on home screen
  - Show confirmation on critical screens

**Validation:**
- App state is saved when backgrounded
- Data refreshes when foregrounded after 5+ minutes
- Back button behaves correctly on Android

---

### 2.19 Implement Deep Link Handling

**Requirement:** REQ-NF-007

- [ ] Listen for URL open events
- [ ] Parse URL and extract route and parameters
- [ ] Navigate to appropriate page in app
- [ ] Handle custom URL scheme: `clubcreole://`
- [ ] Test deep links on iOS and Android

**Validation:**
- Deep links open the app
- App navigates to correct page
- Parameters are extracted correctly

---

### 2.20 Document Native Features Usage

**Requirement:** General

- [ ] Create `docs/NATIVE_FEATURES.md`
- [ ] Document each native feature:
  - How to use services
  - How to use hooks
  - Examples
  - Platform considerations
- [ ] Document permission handling
- [ ] Document testing on devices

**Validation:**
- Documentation is comprehensive
- Developers can understand how to use features

---

## Phase 3: Platform-Specific Configuration (REQ-PS-*)

### 3.1 Configure iOS Info.plist

**Requirement:** REQ-PS-001

- [ ] Add privacy usage descriptions to `ios/App/App/Info.plist`:
  - `NSCameraUsageDescription`
  - `NSPhotoLibraryUsageDescription`
  - `NSLocationWhenInUseUsageDescription`
  - `NSUserNotificationsUsageDescription`
- [ ] Configure URL schemes:
  - Add `CFBundleURLTypes` with scheme `clubcreole`
- [ ] Configure supported orientations
- [ ] Set deployment target to iOS 13.0
- [ ] Add background modes if needed (e.g., remote notifications)

**Validation:**
- Info.plist contains all required keys
- App requests permissions with correct descriptions
- URL scheme works for deep linking

---

### 3.2 Configure Android Manifest

**Requirement:** REQ-PS-002

- [ ] Add permissions to `android/app/src/main/AndroidManifest.xml`:
  - `INTERNET`
  - `CAMERA`
  - `ACCESS_FINE_LOCATION`
  - `ACCESS_COARSE_LOCATION`
  - `POST_NOTIFICATIONS` (API 33+)
- [ ] Add intent filters for deep linking:
  - Scheme: `clubcreole`
  - Add `android:autoVerify="true"` for App Links
- [ ] Configure network security config
- [ ] Set application ID: `com.clubcreole.app`

**Validation:**
- Manifest contains all required permissions
- Deep linking intent filters configured
- App requests permissions correctly

---

### 3.3 Create App Icons

**Requirement:** REQ-PS-003

- [ ] Design app icon following platform guidelines
- [ ] Generate iOS icon set (all required sizes)
- [ ] Add to `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- [ ] Ensure no transparency (iOS requirement)
- [ ] Generate Android adaptive icon (foreground + background)
- [ ] Add to `android/app/src/main/res/mipmap-*/` for all densities
- [ ] Test icons on devices

**Validation:**
- Icons display correctly on home screen (iOS and Android)
- Icons meet platform guidelines
- Adaptive icon works on Android

---

### 3.4 Create Splash Screen Assets

**Requirement:** REQ-PS-004

- [ ] Design splash screen with logo and brand color
- [ ] Create iOS launch storyboard or images
- [ ] Add to iOS project
- [ ] Create Android splash screen drawables
- [ ] Add to Android project (all densities)
- [ ] Or use Android 12+ Splash Screen API
- [ ] Test splash screens on devices

**Validation:**
- Splash screen displays correctly on launch
- Logo centered and sized appropriately
- Background color matches brand

---

### 3.5 Configure iOS Code Signing

**Requirement:** REQ-PS-005

- [ ] Create Apple Developer account (if not exists)
- [ ] Register App ID: `com.clubcreole.app`
- [ ] Create development certificate
- [ ] Create distribution certificate
- [ ] Create provisioning profiles (development and distribution)
- [ ] Configure Xcode with signing settings:
  - Development: automatic signing
  - Distribution: manual or automatic
- [ ] Add capabilities: Push Notifications, Associated Domains (if needed)
- [ ] Test running on physical iOS device

**Validation:**
- App runs on physical iOS device
- Signing configured correctly in Xcode
- Certificates and profiles valid

---

### 3.6 Configure Android App Signing

**Requirement:** REQ-PS-006

- [ ] Generate release keystore:
  ```bash
  keytool -genkey -v -keystore clubcreole-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias clubcreole
  ```
- [ ] Store keystore securely (outside repo)
- [ ] Create `android/keystore.properties`:
  ```
  storePassword=***
  keyPassword=***
  keyAlias=clubcreole
  storeFile=/path/to/clubcreole-release-key.jks
  ```
- [ ] Add `keystore.properties` to `.gitignore`
- [ ] Configure `android/app/build.gradle` to use keystore for release builds
- [ ] Test release build: `./gradlew assembleRelease`

**Validation:**
- Release APK builds successfully
- APK is signed with release keystore
- Keystore credentials not in repo

---

### 3.7 Optimize Bundle Size

**Requirement:** REQ-PS-007

- [ ] Analyze bundle size with `vite-bundle-visualizer`
- [ ] Identify and remove unused dependencies
- [ ] Optimize images (compress, use WebP on Android)
- [ ] Enable tree shaking in Vite config
- [ ] Implement code splitting for routes
- [ ] Lazy load heavy components
- [ ] Measure bundle size:
  - iOS: < 50MB
  - Android: < 30MB

**Validation:**
- Bundle size meets targets
- No unused dependencies
- Tree shaking eliminates dead code

---

### 3.8 Optimize Performance

**Requirement:** REQ-PS-007

- [ ] Profile app on mid-range devices (iPhone SE, Galaxy A53)
- [ ] Measure initial load time (target < 3s)
- [ ] Measure time to interactive (target < 4s)
- [ ] Optimize React renders with React.memo
- [ ] Optimize list rendering (virtual scroll if needed)
- [ ] Lazy load images
- [ ] Optimize API calls (reduce, cache, batch)
- [ ] Fix any performance bottlenecks

**Validation:**
- Initial load < 3 seconds on mid-range device
- Time to interactive < 4 seconds
- Navigation < 500ms between pages
- No jank or lag during scrolling

---

### 3.9 Configure Universal Links (iOS)

**Requirement:** REQ-PS-008

- [ ] Add Associated Domains capability in Xcode
- [ ] Add domain: `applinks:clubcreole.com`
- [ ] Create `apple-app-site-association` file on web server:
  ```json
  {
    "applinks": {
      "apps": [],
      "details": [{
        "appID": "TEAM_ID.com.clubcreole.app",
        "paths": ["*"]
      }]
    }
  }
  ```
- [ ] Host file at `https://clubcreole.com/.well-known/apple-app-site-association`
- [ ] Test universal links on iOS device

**Validation:**
- Tapping `https://clubcreole.com/*` links opens app
- App handles links and navigates correctly
- Falls back to Safari if app not installed

---

### 3.10 Configure App Links (Android)

**Requirement:** REQ-PS-008

- [ ] Add intent filter with `android:autoVerify="true"` to manifest
- [ ] Create `assetlinks.json` file:
  ```json
  [{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.clubcreole.app",
      "sha256_cert_fingerprints": ["..."]
    }
  }]
  ```
- [ ] Host file at `https://clubcreole.com/.well-known/assetlinks.json`
- [ ] Test app links on Android device

**Validation:**
- Tapping `https://clubcreole.com/*` links opens app
- App handles links and navigates correctly
- Falls back to browser if app not installed

---

### 3.11 Prepare iOS App Store Metadata

**Requirement:** REQ-PS-009

- [ ] Create App Store Connect listing
- [ ] Set app name: "ClubCreole"
- [ ] Write app description highlighting key features
- [ ] Define keywords for SEO
- [ ] Select category: Travel
- [ ] Create screenshots for required device sizes:
  - iPhone 6.7" (iPhone 14 Pro Max)
  - iPhone 6.5" (iPhone 11 Pro Max)
  - iPhone 5.5" (iPhone 8 Plus)
  - iPad Pro 12.9" (if supporting iPad)
- [ ] Provide privacy policy URL
- [ ] Provide support URL
- [ ] Set age rating
- [ ] Configure in-app purchases (if applicable)

**Validation:**
- All required metadata filled
- Screenshots meet requirements
- Privacy policy and support URLs valid

---

### 3.12 Prepare Google Play Metadata

**Requirement:** REQ-PS-009

- [ ] Create Google Play Console listing
- [ ] Set app name: "ClubCreole"
- [ ] Write short description (80 chars)
- [ ] Write full description
- [ ] Create screenshots (min 2, max 8) for phone
- [ ] Create screenshots for tablet (if supporting tablets)
- [ ] Create feature graphic (1024x500)
- [ ] Upload app icon (512x512)
- [ ] Select category: Travel & Local
- [ ] Provide privacy policy URL
- [ ] Set content rating (via questionnaire)
- [ ] Configure in-app products (if applicable)

**Validation:**
- All required metadata filled
- Screenshots and graphics meet requirements
- Privacy policy URL valid

---

### 3.13 Integrate Crash Reporting

**Requirement:** REQ-PS-010

- [ ] Install Sentry SDK for Capacitor:
  ```bash
  npm install @sentry/capacitor @sentry/react
  ```
- [ ] Configure Sentry in `src/main.tsx`:
  ```typescript
  import * as Sentry from '@sentry/capacitor';
  import * as SentryReact from '@sentry/react';

  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    integrations: [new SentryReact.BrowserTracing()],
  });
  ```
- [ ] Add source maps upload to build process
- [ ] Test crash reporting by throwing test error
- [ ] Verify errors appear in Sentry dashboard

**Validation:**
- Sentry captures JavaScript errors
- Source maps uploaded for debugging
- Errors include platform context (iOS/Android)

---

### 3.14 Integrate Analytics (Optional)

**Requirement:** REQ-PS-010

- [ ] Choose analytics service (Firebase, Amplitude, etc.)
- [ ] Install SDK
- [ ] Configure analytics with user opt-out support
- [ ] Track mobile-specific events:
  - App opens
  - Screen views
  - Feature usage (camera, geolocation, etc.)
  - Conversions (bookings)
- [ ] Test events are tracked correctly

**Validation:**
- Events tracked on mobile
- User can opt out
- Analytics dashboard shows mobile data

---

### 3.15 Test on Physical Devices

**Requirement:** General

- [ ] Test on physical iOS devices:
  - iPhone SE (2020) - iOS 15
  - iPhone 13 or newer - iOS 17
- [ ] Test on physical Android devices:
  - Samsung Galaxy A53 - Android 12
  - Google Pixel 6 or newer - Android 13+
- [ ] Test all core features:
  - Authentication
  - Data fetching
  - Camera
  - Geolocation
  - Push notifications
  - Deep linking
  - Offline mode
- [ ] Test edge cases and error scenarios
- [ ] Fix any device-specific issues

**Validation:**
- App works on all test devices
- No crashes or major bugs
- Performance acceptable on low-end devices

---

### 3.16 Create Beta Test Plan

**Requirement:** General

- [ ] Set up TestFlight for iOS beta testing
- [ ] Upload beta build to TestFlight
- [ ] Invite beta testers
- [ ] Set up Google Play Internal Testing track
- [ ] Upload beta build to Google Play
- [ ] Invite beta testers
- [ ] Collect feedback from beta testers
- [ ] Fix reported issues

**Validation:**
- Beta builds available on TestFlight and Google Play
- Beta testers can install and test
- Feedback collected and addressed

---

### 3.17 Prepare for App Store Submission

**Requirement:** General

- [ ] Review iOS App Store Review Guidelines
- [ ] Ensure app complies with guidelines
- [ ] Prepare demo account for reviewers (if login required)
- [ ] Test submission checklist:
  - App icon correct
  - Screenshots correct
  - Metadata complete
  - Privacy policy valid
  - App runs without crashes
  - No placeholder content
- [ ] Archive and upload to App Store Connect
- [ ] Submit for review

**Validation:**
- App submitted to App Store
- No submission errors
- App enters review queue

---

### 3.18 Prepare for Google Play Submission

**Requirement:** General

- [ ] Review Google Play Policy
- [ ] Ensure app complies with policy
- [ ] Complete content rating questionnaire
- [ ] Set up pricing and distribution
- [ ] Test submission checklist:
  - App icon correct
  - Screenshots correct
  - Metadata complete
  - Privacy policy valid
  - App runs without crashes
  - Content rating complete
- [ ] Upload release AAB
- [ ] Submit for review (or staged rollout)

**Validation:**
- App submitted to Google Play
- No submission errors
- App enters review queue

---

### 3.19 Monitor Initial Release

**Requirement:** General

- [ ] Monitor crash reports in Sentry
- [ ] Monitor app store reviews
- [ ] Monitor analytics for adoption and engagement
- [ ] Respond to user feedback
- [ ] Fix critical bugs quickly
- [ ] Release patches as needed

**Validation:**
- Crash-free rate > 99%
- Critical bugs addressed within 24-48 hours
- User reviews monitored and responded to

---

### 3.20 Create Mobile Development Documentation

**Requirement:** General

- [ ] Document complete mobile development workflow
- [ ] Document how to run on simulators/emulators
- [ ] Document how to run on physical devices
- [ ] Document how to build for release
- [ ] Document how to submit to app stores
- [ ] Document troubleshooting common issues
- [ ] Document native features usage
- [ ] Add documentation to `README.md` and `docs/`

**Validation:**
- Documentation complete and accurate
- New developers can set up mobile environment
- Team can maintain mobile app independently

---

## Dependencies

- **1.1-1.10** must be completed before **2.1-2.20** (foundation before features)
- **2.1** must be completed before any other Phase 2 tasks (plugins must be installed)
- **3.5-3.6** (signing) can be done in parallel with Phase 2
- **3.9-3.10** (deep linking) depend on **1.6** (routing) and **2.17-2.19** (app lifecycle)
- **3.11-3.12** (metadata) can be prepared in parallel with development
- **3.17-3.18** (submission) depend on all other tasks being complete

## Success Metrics

- [ ] App builds successfully for iOS and Android
- [ ] All existing web features work in mobile app
- [ ] Native features (camera, push notifications, geolocation) work correctly
- [ ] Performance meets targets (< 3s load time on mid-range device)
- [ ] Bundle size meets targets (< 50MB iOS, < 30MB Android)
- [ ] App passes app store review guidelines
- [ ] Crash-free rate > 99%
- [ ] User engagement metrics positive
- [ ] Web application continues to work without regression

---

## Notes

- **Parallel Work:** Tasks within the same section can often be parallelized (e.g., 2.4-2.6 camera can be done alongside 2.7-2.9 geolocation)
- **Testing:** Test frequently on real devices throughout development, not just at the end
- **Version Control:** Use feature branches for major phases; merge to main after testing
- **Rollback:** Keep web deployment separate; mobile app releases can be reverted via app store version management
