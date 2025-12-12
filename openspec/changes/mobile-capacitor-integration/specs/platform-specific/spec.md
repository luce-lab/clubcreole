# Spec: Platform-Specific Configuration

**Capability:** `platform-specific`
**Status:** `proposed`
**Last Updated:** 2025-11-30

## Overview

Configure platform-specific settings, assets, permissions, and optimizations for iOS and Android to ensure compliance with platform guidelines, optimal performance, and successful app store submissions.

---

## ADDED Requirements

### REQ-PS-001: iOS Configuration

The system shall configure iOS-specific settings in Info.plist and project settings.

**Acceptance Criteria:**
- `Info.plist` contains all required keys
- Privacy usage descriptions for camera, location, notifications
- URL schemes configured for deep linking
- Supported orientations configured (portrait, landscape)
- Background modes configured if needed
- iOS deployment target set to 13.0 minimum

#### Scenario: Info.plist contains required privacy descriptions

**Given** the iOS project is configured
**When** the `Info.plist` file is reviewed
**Then** it contains `NSCameraUsageDescription` with text "ClubCreole needs camera access to let you take photos for your profile and verify partner listings"
**And** contains `NSPhotoLibraryUsageDescription` with text "ClubCreole needs access to your photo library to let you select photos for your profile"
**And** contains `NSLocationWhenInUseUsageDescription` with text "ClubCreole needs your location to show nearby accommodations and activities"
**And** contains `NSUserNotificationsUsageDescription` with text "ClubCreole sends you booking confirmations and special offers"

#### Scenario: URL schemes configured for deep linking

**Given** the iOS project is configured
**When** `Info.plist` is reviewed
**Then** `CFBundleURLTypes` array contains URL scheme "clubcreole"
**And** URL scheme is associated with bundle identifier
**When** a user taps a link `clubcreole://hebergements/123`
**Then** the app opens and handles the deep link

---

### REQ-PS-002: Android Configuration

The system shall configure Android-specific settings in AndroidManifest.xml and build.gradle.

**Acceptance Criteria:**
- `AndroidManifest.xml` contains all required permissions
- Permission descriptions in strings.xml
- Intent filters configured for deep linking
- Network security config allows Supabase domains
- Minimum SDK 22, target SDK 33+
- Application ID matches iOS bundle ID convention

#### Scenario: AndroidManifest contains required permissions

**Given** the Android project is configured
**When** `AndroidManifest.xml` is reviewed
**Then** it contains permission `android.permission.INTERNET`
**And** contains permission `android.permission.CAMERA`
**And** contains permission `android.permission.ACCESS_FINE_LOCATION`
**And** contains permission `android.permission.ACCESS_COARSE_LOCATION`
**And** contains permission `android.permission.POST_NOTIFICATIONS` (API 33+)
**And** contains permission `android.permission.READ_EXTERNAL_STORAGE` (if needed for older APIs)

#### Scenario: Deep linking configured via intent filters

**Given** the Android project is configured
**When** `AndroidManifest.xml` is reviewed
**Then** main activity contains intent filter with scheme "clubcreole"
**And** intent filter includes `android:autoVerify="true"` for App Links
**When** a user taps a link `clubcreole://hebergements/123`
**Then** the app opens and handles the deep link

#### Scenario: Network security configuration

**Given** the Android project uses network requests
**When** `network_security_config.xml` is reviewed
**Then** it allows cleartext traffic for development (if needed)
**And** allows Supabase domain (`*.supabase.co`)
**And** uses certificate pinning if configured

---

### REQ-PS-003: App Icons

The system shall provide correctly sized app icons for all required sizes on iOS and Android.

**Acceptance Criteria:**
- iOS: App icon set in `Assets.xcassets/AppIcon.appiconset` with all required sizes
- Android: Adaptive icon with foreground and background layers in `res/mipmap-*` folders
- Icons meet platform design guidelines
- No transparency in icons (iOS requirement)
- Adaptive icon safe zone respected (Android)

#### Scenario: iOS app icons configured

**Given** the iOS project is being prepared
**When** `AppIcon.appiconset` is reviewed
**Then** it contains icons for all required sizes:
  - 20x20 @2x, @3x
  - 29x29 @2x, @3x
  - 40x40 @2x, @3x
  - 60x60 @2x, @3x
  - 1024x1024 (App Store)
**And** all icons are PNG format without transparency
**And** icons follow iOS design guidelines

#### Scenario: Android adaptive icons configured

**Given** the Android project is being prepared
**When** `res/mipmap-*` directories are reviewed
**Then** they contain adaptive icons for all densities: mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi
**And** each contains `ic_launcher.xml` adaptive icon definition
**And** foreground and background layers are provided
**And** icon safe zone (inner 66%) contains critical elements
**And** round icon variant provided for devices that use it

---

### REQ-PS-004: Splash Screens

The system shall provide platform-specific splash screens with correct sizing and branding.

**Acceptance Criteria:**
- iOS: Launch storyboard configured with logo and background color
- Android: Splash screen drawable for all densities
- Brand logo centered and properly sized
- Background color matches brand
- Splash screen images optimized for size

#### Scenario: iOS splash screen configured

**Given** the iOS project uses a launch storyboard
**When** `LaunchScreen.storyboard` is configured
**Then** it displays ClubCreole logo centered
**And** background color is brand color
**And** logo scales appropriately for all device sizes
**And** uses vector image or @2x/@3x assets

#### Scenario: Android splash screen configured

**Given** the Android project uses splash screen API
**When** `res/drawable/splash.xml` is configured
**Then** it displays ClubCreole logo centered
**And** background color is brand color
**And** splash screen is provided for all densities
**Or** uses Android 12+ Splash Screen API with icon and background

---

### REQ-PS-005: Code Signing and Provisioning (iOS)

The system shall configure code signing for iOS development and distribution.

**Acceptance Criteria:**
- Development certificate installed
- Distribution certificate installed for App Store
- Provisioning profiles created (development, distribution)
- App ID registered in Apple Developer Portal
- Capabilities configured (Push Notifications, Associated Domains if needed)
- Automatic signing enabled in Xcode (development) or manual (distribution)

#### Scenario: Development signing configured

**Given** a developer wants to run the app on a physical iOS device
**When** they open the project in Xcode
**Then** development team is selected
**And** automatic signing is enabled
**And** provisioning profile is automatically managed
**And** app can be installed on registered development devices

#### Scenario: Distribution signing configured

**Given** the team wants to submit to App Store
**When** they archive the app in Xcode
**Then** distribution certificate is used
**And** App Store provisioning profile is selected
**And** archive validates successfully
**And** can be uploaded to App Store Connect

---

### REQ-PS-006: App Signing (Android)

The system shall configure app signing for Android development and release.

**Acceptance Criteria:**
- Debug keystore used for development builds
- Release keystore created and secured for production
- Keystore credentials stored in `keystore.properties` (gitignored)
- Build gradle configured to use release keystore for release builds
- Play App Signing enabled in Google Play Console

#### Scenario: Release signing configured

**Given** the team wants to publish to Google Play
**When** they run `./gradlew assembleRelease`
**Then** app is signed with release keystore
**And** keystore credentials loaded from `keystore.properties`
**And** signed APK or AAB is generated
**And** signature verifies correctly

#### Scenario: Play App Signing enabled

**Given** the app is published to Google Play
**When** Play App Signing is configured in Google Play Console
**Then** Google manages the app signing key
**And** upload key is used for uploading builds
**And** users receive APKs signed by Google with app signing key

---

### REQ-PS-007: Performance Optimization

The system shall optimize mobile app performance for both platforms.

**Acceptance Criteria:**
- Bundle size < 50MB (iOS), < 30MB (Android)
- Initial load time < 3 seconds on mid-range device
- Code splitting implemented for routes
- Images optimized and served in appropriate formats
- Tree shaking eliminates unused code
- Lazy loading for heavy components

#### Scenario: Bundle size optimized

**Given** the mobile app is built for production
**When** the build output is analyzed
**Then** iOS app bundle is less than 50MB
**And** Android APK is less than 30MB
**And** unused dependencies are eliminated
**And** code is minified and compressed

#### Scenario: Performance metrics meet targets

**Given** the app is tested on a mid-range device (e.g., iPhone SE 2020, Galaxy A53)
**When** the app is launched from cold start
**Then** splash screen appears in < 1 second
**And** home page renders in < 3 seconds
**And** time to interactive is < 4 seconds
**When** user navigates between pages
**Then** navigation completes in < 500ms

---

### REQ-PS-008: Deep Linking and Universal Links

The system shall support deep linking via custom URL schemes and universal/app links.

**Acceptance Criteria:**
- iOS: Universal Links configured via associated domains
- Android: App Links configured via intent filters and assetlinks.json
- Deep link routing handles all app routes
- Parameters extracted from deep link URLs
- Fallback to web if app not installed

#### Scenario: Universal Link opens app (iOS)

**Given** the user receives a link `https://clubcreole.com/hebergements/123`
**And** the app is installed on their iOS device
**When** they tap the link
**Then** the app opens directly (not Safari)
**And** navigates to the accommodation detail page for ID 123
**When** the app is not installed
**Then** the link opens in Safari showing the web version

#### Scenario: App Link opens app (Android)

**Given** the user receives a link `https://clubcreole.com/hebergements/123`
**And** the app is installed on their Android device
**When** they tap the link
**Then** the app opens directly (not browser)
**And** navigates to the accommodation detail page for ID 123
**When** the app is not installed
**Then** the link opens in browser showing the web version

#### Scenario: Deep link parameters parsed

**Given** a deep link contains parameters `clubcreole://hebergements/123?checkin=2025-12-01&checkout=2025-12-05`
**When** the app handles the deep link
**Then** route parameters are extracted (id: 123)
**And** query parameters are extracted (checkin, checkout)
**And** accommodation detail page pre-fills booking dates

---

### REQ-PS-009: App Store Metadata and Assets

The system shall prepare all required metadata and assets for app store submissions.

**Acceptance Criteria:**
- App Store (iOS): Screenshots for all required device sizes
- Google Play: Screenshots for phone and tablet
- Privacy policy URL provided
- Support URL provided
- App description, keywords, categories defined
- Promo graphics prepared (Google Play feature graphic)

#### Scenario: iOS App Store metadata prepared

**Given** the team is preparing for iOS submission
**When** App Store Connect is configured
**Then** app name is "ClubCreole"
**And** subtitle/tagline is defined
**And** app description highlights key features
**And** keywords include relevant terms (Caribbean, vacation, booking, etc.)
**And** category is "Travel" or appropriate
**And** screenshots provided for:
  - iPhone 6.7" (e.g., iPhone 14 Pro Max)
  - iPhone 6.5" (e.g., iPhone 11 Pro Max)
  - iPhone 5.5" (e.g., iPhone 8 Plus)
  - iPad Pro 12.9" (if supporting iPad)
**And** privacy policy URL is valid
**And** support URL is valid

#### Scenario: Google Play metadata prepared

**Given** the team is preparing for Android submission
**When** Google Play Console is configured
**Then** app name is "ClubCreole"
**And** short description (80 chars) summarizes the app
**And** full description details features and benefits
**And** screenshots provided for phone (min 2, max 8)
**And** screenshots provided for tablet if supporting tablets
**And** feature graphic (1024x500) is uploaded
**And** app icon (512x512) is uploaded
**And** privacy policy URL is valid
**And** category is "Travel & Local"

---

### REQ-PS-010: Analytics and Crash Reporting

The system shall integrate analytics and crash reporting for mobile platforms.

**Acceptance Criteria:**
- Sentry SDK configured for iOS and Android crash reporting
- Platform-specific analytics events tracked
- User opt-out respected for analytics
- Performance monitoring enabled
- Session replay (optional, privacy-respectful)

#### Scenario: Crash reporting captures errors

**Given** the mobile app encounters a JavaScript error
**When** the error occurs on iOS or Android
**Then** error is captured by Sentry with context:
  - Platform (iOS/Android)
  - OS version
  - App version
  - Device model
  - Stack trace
  - Breadcrumbs (user actions leading to error)
**And** developer is notified if error is critical

#### Scenario: Analytics track mobile-specific events

**Given** a user completes a booking on mobile
**When** booking is confirmed
**Then** analytics event is logged with properties:
  - Platform: iOS or Android
  - Booking type: accommodation/restaurant/activity
  - Booking value
  - User segment
**And** event is sent to analytics service (if user has not opted out)

---

## References

- Related Specs: `mobile-app-foundation`, `native-features`
- Design Document: `design.md` sections "Platform-Specific Configuration", "Deployment Strategy"
- External Docs:
  - [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
  - [Android App Manifest](https://developer.android.com/guide/topics/manifest/manifest-intro)
  - [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
  - [Google Play Policy](https://play.google.com/about/developer-content-policy/)
