## Why

The current ClubCreole application is web-only, limiting accessibility for mobile users who prefer native app experiences and constraining business growth opportunities. Key drivers for mobile transformation:

1. **Market reach**: Native mobile apps increase discoverability through iOS App Store and Google Play Store, reaching users who search for travel apps on mobile
2. **User experience**: Native features (push notifications for booking confirmations, offline support, camera for profile photos, geolocation for finding nearby accommodations) significantly improve engagement
3. **Performance**: Native shell provides better performance on mobile devices, with faster load times and smoother animations
4. **Competitive advantage**: Partners and competitors in the Caribbean tourism market increasingly offer mobile apps; lack of mobile presence is a competitive disadvantage
5. **Monetization**: App stores provide additional revenue channels and increase user trust

Technical context: The application is built with React 18.3.1, Vite, TypeScript, and Supabase backend. The existing responsive design reduces UI adaptation work. Capacitor allows transformation to mobile while maintaining a single codebase for web and mobile platforms.

## What Changes

- Install and configure Capacitor framework for iOS and Android platforms
- Adapt routing from BrowserRouter to HashRouter for mobile builds
- Create platform detection service for conditional mobile/web behavior
- Integrate native Capacitor plugins: Status Bar, Splash Screen, Camera, Geolocation, Push Notifications, Network, App
- Configure iOS project with Info.plist permissions, icons, splash screens, code signing
- Configure Android project with AndroidManifest permissions, icons, splash screens, app signing
- Create native feature services with web fallbacks: cameraService, geolocationService, pushNotificationService, networkService
- Create React hooks for native features: useCamera, useGeolocation, usePushNotifications, useNetwork
- Configure deep linking via Universal Links (iOS) and App Links (Android)
- Optimize bundle size and performance for mobile (< 50MB iOS, < 30MB Android, < 3s load time)
- Prepare app store metadata and assets for iOS App Store and Google Play submissions

## Impact

- **Affected specs**:
  - `mobile-app-foundation` (new capability) - Capacitor installation, platform setup, routing
  - `native-features` (new capability) - Camera, geolocation, push notifications, network detection
  - `platform-specific` (new capability) - iOS/Android configuration, app store submission
- **Affected code**:
  - `src/App.tsx` - Platform-adaptive routing (HashRouter vs BrowserRouter)
  - `src/main.tsx` - Splash screen initialization
  - `src/services/platformService.ts` (new) - Platform detection utilities
  - `src/services/nativeFeatures/` (new directory) - Services for camera, geolocation, push, network
  - `src/hooks/` - New hooks: useCamera, useGeolocation, usePushNotifications, useNetwork
  - `package.json` - New dependencies and build scripts for mobile
  - `capacitor.config.ts` (new) - Capacitor configuration
  - `/ios/` (new directory) - iOS Xcode project
  - `/android/` (new directory) - Android Studio project
- **New dependencies**:
  - @capacitor/core, @capacitor/cli
  - @capacitor/ios, @capacitor/android
  - @capacitor/status-bar, @capacitor/splash-screen, @capacitor/camera, @capacitor/geolocation, @capacitor/push-notifications, @capacitor/network, @capacitor/app
- **Build system changes**:
  - New npm scripts: build:mobile, sync:ios, sync:android, mobile:ios, mobile:android
  - Environment file: .env.mobile
  - Mobile-specific Vite build mode

## Context

**Current State:**
- React 18.3.1 + TypeScript + Vite web application
- Responsive design with Tailwind CSS
- Supabase backend (auth, database, storage)
- React Router for navigation
- Multiple feature modules: accommodations, restaurants, car rental, leisure activities
- Role-based auth system (admin, client, partner)

**Technical Considerations:**
- BrowserRouter must be adapted for mobile (using hash or memory routing)
- API calls are already abstracted in service layer (good for mobile)
- Existing responsive design reduces UI adaptation work
- Supabase SDK is compatible with Capacitor
- No current usage of browser-specific APIs that conflict with mobile

## Dependencies

This change has dependencies on:
- Existing codebase must remain functional for web deployment
- Build system must support both web and mobile builds
- CI/CD pipeline may need updates for mobile builds

This change blocks:
- Future native feature integrations (deep linking, in-app purchases)
- App store submissions and reviews
- Mobile-specific analytics and monitoring

## Alternatives Considered

### 1. React Native
**Pros:** True native components, better performance
**Cons:** Requires complete rewrite, separate codebase, more complex maintenance
**Verdict:** Rejected due to cost and time

### 2. Progressive Web App (PWA)
**Pros:** Simpler implementation, single codebase
**Cons:** Limited native features, no app store presence, platform restrictions (iOS)
**Verdict:** Insufficient for business goals requiring app store presence

### 3. Flutter
**Pros:** High performance, beautiful UI
**Cons:** Different language (Dart), complete rewrite, team learning curve
**Verdict:** Rejected due to existing React investment

### 4. Ionic Framework
**Pros:** Mature ecosystem, built for hybrid apps
**Cons:** Additional UI framework layer, heavier than Capacitor
**Verdict:** Capacitor provides Ionic capabilities without the framework lock-in

**Selected Approach: Capacitor**
- Minimal code changes required
- Maintains web codebase
- Access to native APIs via plugins
- Active ecosystem and Ionic support
- TypeScript-first

## Implementation Approach

### Phase 1: Foundation (mobile-app-foundation)
- Install Capacitor and configure for iOS/Android
- Adapt routing from BrowserRouter to Capacitor-compatible routing
- Configure build system for mobile builds
- Create basic iOS and Android projects
- Verify app launches on simulators/emulators

### Phase 2: Native Features (native-features)
- Integrate Status Bar plugin for native status bar control
- Add Splash Screen with branding
- Implement Geolocation for location-based features
- Add Camera plugin for user profile photos and partner verification
- Configure Push Notifications infrastructure
- Add Network detection for offline handling
- Implement App plugin for app state management

### Phase 3: Platform-Specific Optimization (platform-specific)
- Configure iOS-specific settings (Info.plist, capabilities)
- Configure Android-specific settings (AndroidManifest.xml, permissions)
- Add platform-specific icons and splash screens
- Optimize performance for mobile (bundle size, lazy loading)
- Configure deep linking for share functionality
- Set up app signing and provisioning

## Success Criteria

- [ ] Application builds successfully for iOS and Android
- [ ] All existing web features work in mobile app
- [ ] Native features integrate seamlessly (camera, push notifications, geolocation)
- [ ] App passes app store review guidelines
- [ ] Performance metrics acceptable on mid-range devices (< 3s initial load)
- [ ] Web application continues to work without regression
- [ ] Single codebase supports web and mobile deployments

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Plugin incompatibilities | High | Test each plugin thoroughly; maintain fallback web versions |
| iOS review rejections | Medium | Follow Apple guidelines; prepare compliance documentation |
| Performance degradation | Medium | Profile on real devices; optimize bundle size; implement code splitting |
| Breaking web functionality | High | Maintain feature parity tests; use platform detection for mobile-only code |
| Build complexity | Medium | Document build process; automate with scripts; use CI/CD |

## Open Questions

1. **App Store Accounts**: Do we have Apple Developer ($99/year) and Google Play ($25 one-time) accounts?
2. **Push Notification Service**: Which service (Firebase Cloud Messaging, OneSignal, Supabase Realtime)?
3. **Analytics**: Should we integrate mobile-specific analytics (Firebase, Amplitude)?
4. **Offline Support**: What level of offline functionality is required?
5. **App Versioning**: How will we manage version numbers across platforms?
6. **Distribution**: Beta testing via TestFlight/Google Play Beta, or third-party (AppCenter)?

## Metrics

- Initial app launch time (target: < 3 seconds on mid-range device)
- App bundle size (target: < 50MB iOS, < 30MB Android)
- Native feature adoption rate
- Mobile vs web user engagement comparison
- App store rating (target: > 4.0 stars)
- Crash-free rate (target: > 99%)

## Timeline Estimate

- **Phase 1 (Foundation)**: 3-5 days
- **Phase 2 (Native Features)**: 5-7 days
- **Phase 3 (Platform-Specific)**: 3-5 days
- **Testing & Refinement**: 3-5 days
- **Total**: 14-22 days (2-4 weeks)

*Note: Timeline assumes one developer working full-time*
