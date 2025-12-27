## ADDED Requirements

### Requirement: Display Features Storage
The system SHALL store an ordered list of benefit texts (`display_features`) for each subscription plan, intended for display on the user interface.

#### Scenario: Retrieve display features
- **WHEN** a subscription plan is loaded from the database
- **THEN** the `display_features` field returns an array of strings in the defined order

#### Scenario: Plan without display features
- **WHEN** a plan has no `display_features` defined
- **THEN** the system returns an empty array

### Requirement: Public Visibility Control
The system SHALL use the `is_public` field to control the visibility of subscription plans on the homepage.

#### Scenario: Display public plans only
- **WHEN** the homepage loads subscription plans
- **THEN** only plans with `is_public = TRUE` and `is_active = TRUE` are returned

#### Scenario: Plan hidden from homepage
- **WHEN** a plan has `is_public = FALSE`
- **THEN** this plan does not appear in the "Nos Abonnements" section of the homepage

### Requirement: Dynamic Pricing Component
The `Pricing` component SHALL load subscription plans from the Supabase database instead of using hardcoded data.

#### Scenario: Initial plan loading
- **WHEN** the Pricing component is mounted
- **THEN** it performs a request to fetch active and public plans ordered by `display_order`

#### Scenario: Display during loading
- **WHEN** plans are being loaded
- **THEN** a loading state is displayed to the user

#### Scenario: Loading error handling
- **WHEN** the loading request fails
- **THEN** an appropriate error message is displayed or a fallback is used

### Requirement: Subscription Plan Hook
The system SHALL provide a React hook `useSubscriptionPlans` to fetch and cache subscription plans.

#### Scenario: Hook usage with cache
- **WHEN** the hook is called multiple times in the application
- **THEN** data is retrieved from React Query cache after the first load

#### Scenario: TypeScript plan interface
- **WHEN** a developer uses the hook
- **THEN** the returned data is typed with the `SubscriptionPlan` interface including: `plan_id`, `name`, `description`, `price`, `interval`, `display_features`, `badge_text`, `display_order`
