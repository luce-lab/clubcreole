# Design: Mobile Capacitor Integration

## Architecture Overview

### System Context

```
┌─────────────────────────────────────────────────────────────┐
│                     ClubCreole Application                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │  Web Build   │  │  iOS Build   │  │Android Build │      │
│  │  (Vite)      │  │ (Capacitor)  │  │ (Capacitor)  │      │
│  │              │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │              │
│         └─────────────────┴─────────────────┘              │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │                 │                        │
│                  │  React App      │                        │
│                  │  (Shared Code)  │                        │
│                  │                 │                        │
│                  └────────┬────────┘                        │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
                  ┌─────────▼──────────┐
                  │                    │
                  │  Supabase Backend  │
                  │  - Auth            │
                  │  - Database        │
                  │  - Storage         │
                  │  - Realtime        │
                  │                    │
                  └────────────────────┘
```

### Component Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        Application Layer                       │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                     React Components                     │  │
│  │  - Pages (routing)                                       │  │
│  │  - Feature Components (accommodation, restaurant, etc)  │  │
│  │  - UI Components (shadcn/ui)                            │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                   Platform Abstraction                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │   Browser    │  │     iOS      │  │   Android    │  │  │
│  │  │   (Web)      │  │  (Capacitor) │  │ (Capacitor)  │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    Service Layer                         │  │
│  │  - accommodationService                                  │  │
│  │  - restaurantService                                     │  │
│  │  - authService                                           │  │
│  │  - platformService (NEW - detects web vs mobile)        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                  Capacitor Plugins                       │  │
│  │  - @capacitor/camera                                     │  │
│  │  - @capacitor/geolocation                                │  │
│  │  - @capacitor/push-notifications                         │  │
│  │  - @capacitor/status-bar                                 │  │
│  │  - @capacitor/splash-screen                              │  │
│  │  - @capacitor/app                                        │  │
│  │  - @capacitor/network                                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                 │
└──────────────────────────────┼─────────────────────────────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Native iOS/Android  │
                    │  Platform APIs       │
                    └──────────────────────┘
```

## Key Design Decisions

### 1. Router Strategy

**Decision:** Use HashRouter instead of BrowserRouter for mobile builds

**Rationale:**
- BrowserRouter requires server-side routing configuration
- HashRouter works out-of-box with Capacitor's file:// protocol
- Minimal code changes required
- Hash URLs acceptable in mobile apps (not visible to users in app stores)

**Implementation:**
```typescript
// src/App.tsx
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      {/* Routes remain unchanged */}
    </Router>
  );
}
```

**Alternative Considered:** MemoryRouter
- More "pure" for mobile
- Rejected: Loses deep linking capability

### 2. Platform Detection Service

**Decision:** Create centralized platform detection utility

**Rationale:**
- Single source of truth for platform checks
- Easier to test and maintain
- Consistent API across codebase

**Implementation:**
```typescript
// src/services/platformService.ts
import { Capacitor } from '@capacitor/core';

export const platformService = {
  isNative: () => Capacitor.isNativePlatform(),
  isIOS: () => Capacitor.getPlatform() === 'ios',
  isAndroid: () => Capacitor.getPlatform() === 'android',
  isWeb: () => Capacitor.getPlatform() === 'web',
  getPlatform: () => Capacitor.getPlatform(),
};
```

### 3. Build Configuration

**Decision:** Separate build scripts for web and mobile

**Rationale:**
- Different optimization strategies
- Platform-specific environment variables
- Clear separation of concerns

**Implementation:**
```json
// package.json
{
  "scripts": {
    "build:web": "vite build",
    "build:mobile": "vite build --mode mobile",
    "sync:ios": "npx cap sync ios",
    "sync:android": "npx cap sync android",
    "mobile:ios": "npm run build:mobile && npm run sync:ios && npx cap open ios",
    "mobile:android": "npm run build:mobile && npm run sync:android && npx cap open android"
  }
}
```

### 4. Environment Configuration

**Decision:** Create separate environment files for mobile builds

**Rationale:**
- Different API endpoints possible (e.g., mobile-specific backend)
- Platform-specific feature flags
- Easier debugging

**Implementation:**
```
.env.production          # Web production
.env.mobile              # Mobile (iOS & Android)
.env.mobile.ios          # iOS-specific overrides
.env.mobile.android      # Android-specific overrides
```

### 5. Native Feature Abstraction

**Decision:** Wrap Capacitor plugins in service layer with fallbacks

**Rationale:**
- Maintains web compatibility
- Easier to test
- Graceful degradation on unsupported platforms

**Implementation:**
```typescript
// src/services/nativeFeatures/cameraService.ts
import { Camera, CameraResultType } from '@capacitor/camera';
import { platformService } from '../platformService';

export const cameraService = {
  async takePicture() {
    if (!platformService.isNative()) {
      // Web fallback: use HTML5 file input
      return this.webFilePicker();
    }

    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
  },

  async webFilePicker() {
    // Implementation for web
  }
};
```

## Data Flow

### Authentication Flow (Mobile)

```
┌──────────┐       ┌──────────────┐       ┌─────────────┐       ┌──────────┐
│   User   │──────▶│  Login Page  │──────▶│  Supabase   │──────▶│  Token   │
│          │       │              │       │    Auth     │       │  Storage │
└──────────┘       └──────────────┘       └─────────────┘       └──────────┘
                           │                      │                    │
                           │                      │                    │
                           ▼                      ▼                    ▼
                   ┌──────────────┐       ┌─────────────┐      ┌──────────┐
                   │  Capacitor   │       │   Mobile    │      │ Keychain │
                   │  Preferences │       │   Biometric │      │ (iOS) or │
                   │  (optional)  │       │    Auth     │      │ Keystore │
                   │              │       │  (future)   │      │(Android) │
                   └──────────────┘       └─────────────┘      └──────────┘
```

### Push Notification Flow

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Backend   │──────▶│  Push Service│──────▶│   Device    │
│  (Supabase) │       │   (FCM/APNs) │       │             │
└─────────────┘       └──────────────┘       └─────────────┘
                                                     │
                                                     ▼
                                             ┌─────────────┐
                                             │ Capacitor   │
                                             │ Push Plugin │
                                             └─────────────┘
                                                     │
                                                     ▼
                                             ┌─────────────┐
                                             │  React App  │
                                             │  Handler    │
                                             └─────────────┘
```

## File Structure Changes

```
clubcreole/
├── android/                          # NEW - Android project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── res/
│   │   │   └── assets/
│   │   └── build.gradle
│   ├── gradle/
│   └── build.gradle
│
├── ios/                              # NEW - iOS project
│   ├── App/
│   │   ├── App/
│   │   │   ├── Info.plist
│   │   │   ├── Assets.xcassets/
│   │   │   └── capacitor.config.json
│   │   ├── App.xcodeproj/
│   │   └── Podfile
│   └── Pods/
│
├── src/
│   ├── services/
│   │   ├── nativeFeatures/           # NEW - Native feature services
│   │   │   ├── cameraService.ts
│   │   │   ├── geolocationService.ts
│   │   │   ├── pushNotificationService.ts
│   │   │   └── networkService.ts
│   │   └── platformService.ts        # NEW - Platform detection
│   │
│   ├── hooks/
│   │   ├── useCamera.ts              # NEW - Camera hook
│   │   ├── useGeolocation.ts         # NEW - Geolocation hook
│   │   └── usePushNotifications.ts   # NEW - Push notifications hook
│   │
│   └── App.tsx                       # MODIFIED - Router logic
│
├── capacitor.config.ts               # NEW - Capacitor configuration
├── .env.mobile                       # NEW - Mobile environment
└── package.json                      # MODIFIED - New dependencies & scripts
```

## Plugin Integration Strategy

### Core Plugins (Phase 2)

1. **@capacitor/status-bar**
   - Control status bar color/style
   - Hide/show status bar
   - Platform: iOS, Android

2. **@capacitor/splash-screen**
   - Show branded splash screen
   - Auto-hide after app ready
   - Platform: iOS, Android

3. **@capacitor/camera**
   - Take photos
   - Select from gallery
   - Use cases: Profile photos, partner verification
   - Platform: iOS, Android, Web (fallback)

4. **@capacitor/geolocation**
   - Get current location
   - Use cases: Find nearby accommodations/restaurants
   - Platform: iOS, Android, Web (fallback)

5. **@capacitor/push-notifications**
   - Receive remote notifications
   - Handle notification interactions
   - Use cases: Booking confirmations, offers
   - Platform: iOS, Android

6. **@capacitor/network**
   - Detect online/offline status
   - Handle network changes
   - Platform: iOS, Android, Web

7. **@capacitor/app**
   - App state management (foreground/background)
   - App URL scheme handling
   - Platform: iOS, Android

### Plugin Priority Matrix

| Plugin | Priority | Complexity | User Value |
|--------|----------|-----------|------------|
| Status Bar | High | Low | Medium |
| Splash Screen | High | Low | Medium |
| Network | High | Low | High |
| App | High | Low | Medium |
| Geolocation | Medium | Medium | High |
| Camera | Medium | Medium | Medium |
| Push Notifications | Medium | High | High |

## Performance Optimization

### Bundle Size Optimization

1. **Code Splitting**
   - Lazy load routes
   - Dynamic imports for heavy components
   - Target: < 50MB iOS, < 30MB Android

2. **Asset Optimization**
   - Compress images (WebP for Android, optimized JPEG/PNG for iOS)
   - Use vector icons (SVG)
   - Remove unused fonts

3. **Tree Shaking**
   - Ensure Vite tree shaking is effective
   - Audit dependencies with `vite-bundle-visualizer`

### Runtime Performance

1. **Initial Load**
   - Preload critical resources
   - Defer non-critical scripts
   - Target: < 3s on mid-range device

2. **List Rendering**
   - Virtual scrolling for long lists (already using infinite scroll)
   - Image lazy loading
   - Optimize re-renders with React.memo

3. **Native Plugin Calls**
   - Cache results when appropriate
   - Debounce frequent calls (e.g., geolocation)

## Security Considerations

### 1. API Key Management

**Challenge:** Protecting Supabase API keys in mobile apps

**Solution:**
- Use Supabase Row Level Security (RLS) - already implemented
- Anon key is safe to expose in mobile apps
- Sensitive operations require authenticated user
- Consider additional API layer for sensitive operations

### 2. Deep Linking Security

**Challenge:** Preventing deep link hijacking

**Solution:**
- Validate deep link parameters
- Use iOS Universal Links and Android App Links
- Implement allowlist for valid link patterns

### 3. Certificate Pinning

**Decision:** Not implementing initially

**Rationale:**
- Adds complexity
- Can cause issues with certificate rotation
- Supabase uses trusted CAs
- Can be added later if needed

### 4. Secure Storage

**Challenge:** Storing auth tokens securely

**Solution:**
- Use Capacitor Preferences API (encrypted by OS)
- iOS: Keychain
- Android: EncryptedSharedPreferences
- Never store tokens in plain localStorage on mobile

## Testing Strategy

### 1. Platform Testing Matrix

| Feature | Web | iOS Simulator | iOS Device | Android Emulator | Android Device |
|---------|-----|---------------|------------|------------------|----------------|
| Routing | ✓ | ✓ | ✓ | ✓ | ✓ |
| Auth | ✓ | ✓ | ✓ | ✓ | ✓ |
| Camera | Fallback | ✓ | ✓ | ✓ | ✓ |
| Geolocation | Browser API | ✓ | ✓ | ✓ | ✓ |
| Push Notifications | N/A | Mock | ✓ | ✓ | ✓ |
| Offline | ✓ | ✓ | ✓ | ✓ | ✓ |

### 2. Testing Tools

- **Unit Tests:** Vitest (existing)
- **Integration Tests:** Vitest + Testing Library
- **E2E Tests:** Consider Playwright or Appium (future)
- **Manual Testing:** Real devices (iOS 15+, Android 10+)

### 3. Test Devices

**Minimum:**
- iPhone SE (2020) - iOS 15
- iPhone 13 - iOS 17
- Samsung Galaxy A53 - Android 12
- Google Pixel 6 - Android 13

## Deployment Strategy

### iOS Deployment

```
1. Development
   └─▶ Xcode Simulator Testing

2. Internal Testing
   └─▶ Xcode → Archive → Export → Ad Hoc Distribution

3. Beta Testing
   └─▶ TestFlight (Apple Developer Portal)
      - Add beta testers
      - Collect feedback
      - Iterate

4. Production
   └─▶ App Store Connect
      - App Store Review
      - Release to public
```

### Android Deployment

```
1. Development
   └─▶ Android Emulator / ADB Device Testing

2. Internal Testing
   └─▶ Android Studio → Build → Generate Signed Bundle

3. Beta Testing
   └─▶ Google Play Console
      - Internal Testing Track
      - Closed Testing Track
      - Collect feedback

4. Production
   └─▶ Google Play Console
      - Production Track
      - Staged rollout (10% → 50% → 100%)
```

## Rollback Plan

### If Critical Issues Arise

1. **Mobile app only:**
   - Remove from app stores
   - Fix issues
   - Resubmit

2. **Shared codebase issues:**
   - Platform detection to disable problematic features on mobile
   - Hot fix via code push (future: consider Capacitor Live Updates)
   - Revert commit and rebuild

3. **Backend incompatibility:**
   - Maintain API versioning
   - Gradual rollout with feature flags

## Monitoring and Observability

### Metrics to Track

1. **Performance**
   - App launch time
   - Time to interactive
   - API response times
   - Bundle size

2. **Stability**
   - Crash-free rate
   - ANR rate (Android)
   - Memory usage

3. **Engagement**
   - DAU/MAU
   - Session duration
   - Feature adoption rates

### Tools

- **Crash Reporting:** Sentry (existing, add Capacitor integration)
- **Analytics:** Consider Firebase Analytics or Amplitude
- **Performance:** Consider Firebase Performance Monitoring
- **A/B Testing:** Future consideration

## Future Enhancements

### Phase 4 (Future)
- Biometric authentication
- In-app purchases / subscriptions
- Deep linking / Universal Links
- Share functionality
- Offline data sync
- Background tasks
- Home screen widgets (iOS 14+, Android)
- App Clips / Instant Apps

### Platform-Specific Features
- iOS: Siri Shortcuts, Apple Pay
- Android: Google Pay, App Shortcuts

## References

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
- [Supabase Mobile Libraries](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-react)
