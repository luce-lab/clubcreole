# Spec: Native Features Integration

**Capability:** `native-features`
**Status:** `proposed`
**Last Updated:** 2025-11-30

## Overview

Integrate native mobile capabilities using Capacitor plugins to enhance the mobile user experience with platform-specific features including camera access, geolocation, push notifications, network detection, and app lifecycle management.

---

## ADDED Requirements

### REQ-NF-001: Status Bar Control

The system shall provide control over the native status bar appearance.

**Acceptance Criteria:**
- `@capacitor/status-bar` plugin installed
- Status bar style changes based on app theme (light/dark)
- Status bar hidden on splash screen, shown after app loads
- iOS: status bar overlays content correctly with safe area handling
- Android: status bar color matches app theme

#### Scenario: Status bar adapts to theme

**Given** the app is running on a mobile device
**When** the user is on a page with light background
**Then** the status bar style is set to "dark" (dark icons/text)
**When** the user is on a page with dark background
**Then** the status bar style is set to "light" (light icons/text)

#### Scenario: Status bar shows/hides appropriately

**Given** the app is launching
**When** the splash screen is displayed
**Then** the status bar is hidden
**When** the app finishes loading
**Then** the status bar is shown with appropriate style

---

### REQ-NF-002: Splash Screen

The system shall display a branded splash screen on app launch.

**Acceptance Criteria:**
- `@capacitor/splash-screen` plugin installed
- Splash screen image configured for iOS (storyboard) and Android (drawable)
- Logo and branding displayed on splash screen
- Splash screen auto-hides after app is ready (max 3 seconds)
- Background color matches brand color

#### Scenario: Splash screen displays on launch

**Given** the app is being launched
**When** the user taps the app icon
**Then** the splash screen appears immediately
**And** displays the ClubCreole logo centered
**And** has brand color background (#your-brand-color)
**And** automatically hides when React app is ready
**And** does not display for more than 3 seconds

---

### REQ-NF-003: Camera Access

The system shall enable users to take photos or select from gallery using native camera.

**Acceptance Criteria:**
- `@capacitor/camera` plugin installed
- Users can take photos with device camera
- Users can select photos from gallery
- Photos returned as base64 or file URI
- Permissions requested on first use
- Web fallback using HTML5 file input
- Image quality configurable (default 90%)

#### Scenario: User takes photo for profile

**Given** the user is on their profile page
**And** they tap "Change Profile Photo"
**When** they select "Take Photo"
**Then** camera permission is requested (if not granted)
**And** native camera interface opens
**When** user takes a photo
**Then** photo is returned to the app
**And** preview is shown
**And** user can confirm or retake

#### Scenario: User selects photo from gallery

**Given** the user is on their profile page
**And** they tap "Change Profile Photo"
**When** they select "Choose from Gallery"
**Then** photo library permission is requested (if not granted)
**And** native photo picker opens
**When** user selects a photo
**Then** photo is returned to the app
**And** preview is shown

#### Scenario: Web fallback for camera

**Given** the app is running in a web browser
**When** the user attempts to upload a photo
**Then** HTML5 file input is used instead of native camera
**And** user can select file from their device
**And** functionality remains consistent with mobile

---

### REQ-NF-004: Geolocation Services

The system shall access device location to provide location-based features.

**Acceptance Criteria:**
- `@capacitor/geolocation` plugin installed
- Current location can be retrieved
- Location accuracy is "high" for precise results
- Permissions requested before accessing location
- Web fallback using browser Geolocation API
- Error handling for permission denial or unavailable GPS

#### Scenario: Find nearby accommodations

**Given** the user is on the accommodations page
**When** they tap "Find Nearby"
**Then** location permission is requested (if not granted)
**And** device's current location is retrieved
**And** accommodations are sorted by distance from user
**And** distance is displayed for each result

#### Scenario: User denies location permission

**Given** the user is attempting to use location feature
**When** the system requests location permission
**And** the user denies permission
**Then** an error message is displayed explaining why permission is needed
**And** feature gracefully degrades (e.g., shows all results without sorting by distance)
**And** option to manually enter location is provided

#### Scenario: Geolocation on web platform

**Given** the app is running in a web browser
**When** location feature is used
**Then** browser's Geolocation API is used
**And** functionality is consistent with mobile experience

---

### REQ-NF-005: Push Notifications

The system shall send and receive push notifications to engage users.

**Acceptance Criteria:**
- `@capacitor/push-notifications` plugin installed
- Users can opt-in to receive notifications
- Device token registered with backend
- Notifications appear when app is in background/foreground
- Tapping notification opens relevant page in app
- Notification permissions requested appropriately
- Badges update on iOS home screen
- Integration with Firebase Cloud Messaging (FCM) or APNs

#### Scenario: User opts in to notifications

**Given** the user has just signed up or logged in
**When** the app requests notification permission
**And** the user grants permission
**Then** device token is generated
**And** token is sent to Supabase backend
**And** user is marked as opted-in for notifications

#### Scenario: Receive booking confirmation notification

**Given** the user has made a booking
**When** the booking is confirmed by the partner
**Then** a push notification is sent to the user's device
**And** notification shows booking details (accommodation name, dates)
**When** the user taps the notification
**Then** the app opens to the booking details page

#### Scenario: Handle notification in foreground

**Given** the app is open and in foreground
**When** a push notification is received
**Then** an in-app alert/toast is displayed
**And** notification is not shown in system notification center
**And** user can tap the alert to view details

---

### REQ-NF-006: Network Detection

The system shall detect network connectivity status and handle offline scenarios.

**Acceptance Criteria:**
- `@capacitor/network` plugin installed
- App detects when device goes online/offline
- UI indicates offline status to user
- Queued actions executed when connection restored
- Web fallback using `navigator.onLine`

#### Scenario: User goes offline

**Given** the app is running with active internet connection
**When** the device loses network connectivity
**Then** the app detects the change immediately
**And** an offline indicator appears at the top of the screen
**And** user is notified they are browsing in offline mode
**And** critical data is cached for offline viewing

#### Scenario: User returns online

**Given** the app is in offline mode
**When** the device reconnects to the internet
**Then** the app detects the change
**And** offline indicator disappears
**And** queued actions (e.g., bookings, profile updates) are synced
**And** user sees a "Back online" notification

#### Scenario: Handle failed requests gracefully

**Given** the user is offline
**When** they attempt to make a booking
**Then** the action is queued
**And** user is informed the action will complete when online
**Or** user is notified that this action requires internet connection

---

### REQ-NF-007: App Lifecycle Management

The system shall respond to app lifecycle events (foreground, background, pause, resume).

**Acceptance Criteria:**
- `@capacitor/app` plugin installed
- App state changes are detected (active, background, paused)
- URL open events handled for deep linking
- Back button behavior customized on Android
- App can prevent exit on certain screens (e.g., during active booking)

#### Scenario: App goes to background

**Given** the user is using the app
**When** they switch to another app or go to home screen
**Then** the app lifecycle event "appStateChange" is triggered with `isActive: false`
**And** any active timers are paused
**And** current state is saved
**And** real-time connections are maintained or gracefully closed

#### Scenario: App returns to foreground

**Given** the app is in the background
**When** the user returns to the app
**Then** the app lifecycle event "appStateChange" is triggered with `isActive: true`
**And** app state is restored
**And** data is refreshed if stale (> 5 minutes)
**And** user sees the last screen they were on

#### Scenario: Handle deep link

**Given** the app is installed on the device
**When** the user taps a deep link (e.g., `clubcreole://hebergements/123`)
**Then** the app opens (or comes to foreground)
**And** navigates to the accommodation detail page for ID 123
**And** URL parameters are parsed correctly

#### Scenario: Android back button handling

**Given** the app is running on Android
**When** the user presses the back button
**Then** the app navigates to the previous screen in the stack
**When** the user is on the home screen and presses back
**Then** the app minimizes (goes to background) instead of closing
**When** the user is on a critical screen (e.g., payment) and presses back
**Then** a confirmation dialog appears before navigating away

---

### REQ-NF-008: Native Feature Service Layer

The system shall provide a service layer abstraction for native features with fallbacks.

**Acceptance Criteria:**
- Services created: `cameraService`, `geolocationService`, `pushNotificationService`, `networkService`
- Each service detects platform and uses native plugin or web fallback
- Consistent API across web and mobile platforms
- Error handling for unsupported features
- TypeScript types for all service methods

#### Scenario: Service uses correct implementation

**Given** a component needs to access the camera
**When** it calls `cameraService.takePicture()`
**Then** on mobile, the native camera plugin is used
**And** on web, HTML5 file input is used
**And** the return value format is consistent across platforms
**And** errors are handled gracefully

---

### REQ-NF-009: Permission Management UI

The system shall provide clear UI for requesting and managing native feature permissions.

**Acceptance Criteria:**
- Permission requests include explanation of why permission is needed
- Users can review and change permissions in settings
- Denied permissions show guidance on enabling in device settings
- Permission status checked before using feature
- Graceful fallback when permission denied

#### Scenario: Request camera permission with context

**Given** the user attempts to upload a photo
**When** camera permission has not been granted
**Then** an explanation dialog appears before requesting permission
**And** explains "We need camera access to let you take photos for your profile"
**When** the user taps "Allow"
**Then** native permission dialog appears
**And** permission is requested

#### Scenario: Guide user to enable denied permission

**Given** the user has previously denied camera permission
**When** they attempt to use camera feature
**Then** an alert appears explaining permission is needed
**And** provides a button "Open Settings"
**When** user taps "Open Settings"
**Then** device settings app opens to app permissions page
**And** user can enable camera permission

---

### REQ-NF-010: React Hooks for Native Features

The system shall provide custom React hooks for integrating native features in components.

**Acceptance Criteria:**
- Hooks created: `useCamera`, `useGeolocation`, `usePushNotifications`, `useNetwork`
- Hooks handle loading states, errors, and permissions
- Hooks are reusable across components
- TypeScript types included

#### Scenario: Component uses camera hook

**Given** a component needs camera functionality
**When** it uses `const { takePicture, isLoading, error } = useCamera()`
**Then** the hook provides a `takePicture` function
**And** `isLoading` indicates when camera is active
**And** `error` contains any error messages
**When** component calls `takePicture()`
**Then** camera opens and photo is returned
**And** loading state updates correctly
**And** errors are captured in `error` state

---

## References

- Related Specs: `mobile-app-foundation`, `platform-specific`
- Design Document: `design.md` sections "Plugin Integration Strategy", "Native Feature Abstraction"
- External Docs:
  - [Capacitor Camera Plugin](https://capacitorjs.com/docs/apis/camera)
  - [Capacitor Geolocation Plugin](https://capacitorjs.com/docs/apis/geolocation)
  - [Capacitor Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)
