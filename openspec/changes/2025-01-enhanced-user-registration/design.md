# Enhanced User Registration - Design Specifications

**Change ID**: `2025-01-enhanced-user-registration`

**Status**: `proposal`

**Target Date**: `2025-02-15`

## User Experience Design

### Enhanced Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    CLUB CRÉOLE REGISTRATION                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Email Address                                            [ ] │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                             │
│  Personal Information                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                             │
│  First Name *                                            [ ] │
│                                                             │
│  Last Name *                                             [ ] │
│                                                             │
│  Phone Number *                                          [ ] │
│  🇫🇷 +33                                                 ▼   │
│                                                             │
│  Password *                                              [ ] │
│                                                             │
│  Confirm Password *                                       [ ] │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ☑ By creating an account, you agree to our Terms      │ │
│  │   of Service and Privacy Policy                        │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  [CREATE ACCOUNT]                                          │
│                                                             │
│  Already have an account? [Sign In]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Form Field Specifications

#### 1. Email Address (Existing)
- **Type**: Email
- **Validation**: Standard email format
- **Required**: Yes
- **Placeholder**: "votre@email.com"
- **Help Text**: "We'll use this for account verification and communications"

#### 2. First Name (New)
- **Type**: Text
- **Validation**: 2-50 characters, alphabetic with accented characters
- **Required**: Yes
- **Placeholder**: "Jean"
- **Help Text**: "Your first name as it appears on official documents"
- **Error Messages**:
  - "First name is required"
  - "First name must be 2-50 characters"
  - "Please enter a valid first name"

#### 3. Last Name (New)
- **Type**: Text
- **Validation**: 2-50 characters, alphabetic with accented characters and hyphens
- **Required**: Yes
- **Placeholder**: "Dupont"
- **Help Text**: "Your family name"
- **Error Messages**:
  - "Last name is required"
  - "Last name must be 2-50 characters"
  - "Please enter a valid last name"

#### 4. Phone Number (New)
- **Type**: Tel with country selector
- **Validation**: International format, 7-15 digits
- **Required**: Yes
- **Default**: France (+33) based on user location
- **Format**: E.164 international format
- **Placeholder**: "+33 6 12 34 56 78"
- **Help Text**: "For important account notifications and support"
- **Country Support**: France, Guadeloupe, Martinique, major European countries
- **Error Messages**:
  - "Phone number is required"
  - "Please enter a valid phone number"
  - "Phone number format is invalid"

### Validation Design

#### Real-time Validation States
```
Valid Field:    ✅ Green border, checkmark icon
Invalid Field:  ❌ Red border, error message below
Empty Field:    Default gray border, no validation shown
Focused Field:  Blue border, active state
```

#### Progressive Validation Strategy
1. **On Blur**: Validate format and show errors
2. **On Input**: Show real-time format hints
3. **On Submit**: Validate all required fields
4. **Server Side**: Final validation and uniqueness checks

## Mobile Design Specifications

### Mobile Registration Form (320px - 768px)

```
┌─────────────────────────────────┐
│        CLUB CRÉOLE             │
│    Create Your Account         │
├─────────────────────────────────┤
│                                 │
│    📧 Email Address           │
│    ┌─────────────────────────┐ │
│    │ votre@email.com        │ │
│    └─────────────────────────┘ │
│                                 │
│    👤 Personal Information   │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                 │
│    First Name *              │
│    ┌─────────────────────────┐ │
│    │ Jean                    │ │
│    └─────────────────────────┘ │
│                                 │
│    Last Name *               │
│    ┌─────────────────────────┐ │
│    │ Dupont                  │ │
│    └─────────────────────────┘ │
│                                 │
│    📱 Phone Number *         │
│    ┌─────────────────────────┐ │
│    │ 🇫🇷 +33 6 12 34 56 78  │ │
│    └─────────────────────────┘ │
│                                 │
│    🔒 Password *              │
│    ┌─────────────────────────┐ │
│    │ •••••••••••••••••••••  │ │
│    └─────────────────────────┘ │
│                                 │
│    Confirm Password *         │
│    ┌─────────────────────────┐ │
│    │ •••••••••••••••••••••  │ │
│    └─────────────────────────┘ │
│                                 │
│    ☑ I agree to Terms &       │
│      Privacy Policy           │
│                                 │
│    [ CREATE ACCOUNT ]         │
│                                 │
│    Already have account?      │
│    [ Sign In ]                │
│                                 │
└─────────────────────────────────┘
```

### Mobile Optimization Features
- **Single Column Layout**: Stack fields vertically
- **Large Touch Targets**: Minimum 44px height for input fields
- **Thumb-Friendly Spacing**: 12px minimum between interactive elements
- **Auto-Capitalization**: First/Last name fields auto-capitalize
- **Phone Keyboard**: Use tel keyboard type for phone field
- **Email Keyboard**: Use email keyboard type for email field

## Component Design System

### Form Field Component Structure
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type: 'email' | 'text' | 'tel' | 'password';
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  error?: string;
  icon?: ReactNode;
  leftElement?: ReactNode;  // For country selector
  validation?: ValidationRule[];
}

// Enhanced TextField with validation
<FormField
  label="Phone Number"
  name="phone"
  type="tel"
  required
  leftElement={<CountrySelector />}
  placeholder="+33 6 12 34 56 78"
  helpText="For important account notifications"
  validation={[
    required(),
    phone(),
    unique('phone')
  ]}
/>
```

### Phone Number Input Component
```typescript
interface PhoneInputProps {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  defaultCountry?: string;
  disabled?: boolean;
}

// Phone Input with country selector
<PhoneInput
  value={phoneNumber}
  onChange={handlePhoneChange}
  defaultCountry="FR"
  countries={['FR', 'GP', 'MQ', 'RE', 'BE', 'CH']}
/>
```

### Country Selector Component
```typescript
interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  countries: CountryData[];
}

// Country selector dropdown with flags
<CountrySelector
  selectedCountry="FR"
  onCountryChange={setSelectedCountry}
  countries={supportedCountries}
/>
```

## Database Schema Design

### Enhanced Profiles Table
```sql
CREATE TABLE profiles (
    -- Existing fields
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Personal Information Fields
    first_name TEXT,                    -- Already exists, now used in registration
    last_name TEXT,                     -- Already exists, now used in registration

    -- New Phone Field
    phone VARCHAR(20) UNIQUE,           -- New field for phone number
    phone_country_code VARCHAR(2),      -- ISO country code (FR, GP, etc.)
    phone_verified BOOLEAN DEFAULT FALSE, -- For future verification

    -- Profile completeness tracking
    profile_completed BOOLEAN DEFAULT FALSE,
    profile_completion_date TIMESTAMP WITH TIME ZONE,

    -- Existing optional fields
    admin_type admin_type DEFAULT NULL,
    company_id INTEGER REFERENCES companies(id) DEFAULT NULL
);

-- Phone number validation constraint
ALTER TABLE profiles
ADD CONSTRAINT valid_phone_number
CHECK (phone IS NULL OR phone ~ '^\+?[1-9]\d{1,14}$');

-- Index for phone number lookups
CREATE INDEX idx_profiles_phone ON profiles(phone);
```

### Phone Validation Function
```sql
CREATE OR REPLACE FUNCTION validate_phone_number(phone_input TEXT, country_code VARCHAR(2))
RETURNS BOOLEAN AS $$
BEGIN
    -- Basic validation using regex pattern
    -- Can be enhanced with phone number library integration
    RETURN phone_input ~ '^\+?[1-9]\d{1,14}$';
END;
$$ LANGUAGE plpgsql;
```

## API Design

### Enhanced Registration Request
```typescript
interface RegistrationRequest {
    email: string;
    password: string;
    profile: {
        first_name: string;
        last_name: string;
        phone: string;
        phone_country_code: string;
    };
}
```

### Registration Response
```typescript
interface RegistrationResponse {
    success: boolean;
    user?: {
        id: string;
        email: string;
        profile: UserProfile;
    };
    errors?: {
        field: string;
        message: string;
    }[];
}
```

### Profile Update Endpoints
```typescript
// Update existing user profile
PUT /api/v1/profile
{
    "first_name": "Jean",
    "last_name": "Dupont",
    "phone": "+33612345678",
    "phone_country_code": "FR"
}

// Validate phone number format
POST /api/v1/profile/validate-phone
{
    "phone": "+33612345678",
    "country_code": "FR"
}
```

## Validation Rules Specification

### Name Validation
```typescript
const nameValidation = {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZàâäéèêëïîôöùûüÿçæœÂÄÈÉÊËÏÎÔÖÙÛÜŸÇÆŒ\-'\s]+$/,
    message: "Please enter a valid name (2-50 characters, letters only)"
};
```

### Phone Number Validation
```typescript
const phoneValidation = {
    required: true,
    pattern: /^\+?[1-9]\d{1,14}$/,
    minLength: 7,
    maxLength: 20,
    custom: validateInternationalPhone,
    message: "Please enter a valid phone number in international format"
};
```

### Email Validation (Enhanced)
```typescript
const emailValidation = {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address"
};
```

## Error Handling Design

### Field-Level Error Display
```typescript
interface FieldError {
    field: string;
    type: 'required' | 'format' | 'unique' | 'server';
    message: string;
    suggestedFix?: string;
}

// Example error states
const errorExamples = {
    first_name: {
        type: 'required',
        message: 'First name is required',
        suggestedFix: 'Enter your first name (e.g., Jean)'
    },
    phone: {
        type: 'format',
        message: 'Invalid phone number format',
        suggestedFix: 'Use international format: +33 6 12 34 56 78'
    }
};
```

### Form Submission Error Handling
```typescript
interface FormSubmissionError {
    type: 'validation' | 'server' | 'network';
    message: string;
    fieldErrors?: FieldError[];
    retryAvailable?: boolean;
}

// Error display strategy
const showErrorBanner = (error: FormSubmissionError) => {
    switch(error.type) {
        case 'validation':
            showFieldErrors(error.fieldErrors);
            break;
        case 'server':
            showServerError(error.message);
            break;
        case 'network':
            showNetworkError();
            break;
    }
};
```

## Accessibility Design

### Screen Reader Support
- **Field Labels**: Proper ARIA labels for all form fields
- **Error Announcements**: Live regions for dynamic error messages
- **Validation States**: ARIA attributes for field validity
- **Focus Management**: Logical tab order and focus indicators

### Keyboard Navigation
- **Tab Order**: Logical progression through form fields
- **Enter Key**: Submit form on Enter in last field
- **Escape Key**: Cancel form operations
- **Arrow Keys**: Navigate country selector options

### Visual Accessibility
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for large text
- **Focus Indicators**: Visible focus states for all interactive elements
- **Text Size**: Minimum 16px for form inputs
- **Spacing**: Adequate spacing between interactive elements

## Performance Considerations

### Form Optimization
- **Debounced Validation**: 300ms delay for real-time validation
- **Lazy Loading**: Phone validation library loaded on demand
- **Input Debouncing**: Reduce API calls for phone validation
- **Progressive Enhancement**: Core functionality works without JavaScript

### Database Optimization
- **Phone Indexing**: Index for phone number uniqueness checks
- **Batch Validation**: Validate multiple fields in single query
- **Connection Pooling**: Optimize database connections
- **Query Optimization**: Efficient profile creation queries

This comprehensive design specification ensures the enhanced registration system provides an excellent user experience while maintaining performance, accessibility, and security standards.