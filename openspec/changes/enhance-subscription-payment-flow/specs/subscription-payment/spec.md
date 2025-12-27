## ADDED Requirements

### Requirement: Redirect to Pricing After Login
The system SHALL redirect unauthenticated users back to the pricing section after successful login when they attempt to subscribe.

#### Scenario: User clicks on paid subscription while not logged in
- **WHEN** an unauthenticated user clicks on a paid subscription button
- **THEN** the system redirects to `/login?redirect=/?scrollTo=pricing`

#### Scenario: User logs in with redirect parameter
- **WHEN** a user successfully logs in with a `redirect` parameter containing `scrollTo=pricing`
- **THEN** the system redirects to the homepage and scrolls to the pricing section

### Requirement: Annual Subscription Pricing
The system SHALL configure Stripe checkout for annual subscription billing matching the displayed prices.

#### Scenario: Passionné annual subscription checkout
- **WHEN** a user initiates checkout for the Passionné plan
- **THEN** Stripe creates a subscription with amount 1500 cents (15€) and interval "year"

#### Scenario: Expert annual subscription checkout
- **WHEN** a user initiates checkout for the Expert plan
- **THEN** Stripe creates a subscription with amount 9000 cents (90€) and interval "year"

### Requirement: Scroll to Section on Page Load
The system SHALL scroll to a specified section when the URL contains a `scrollTo` query parameter.

#### Scenario: Page loads with scrollTo parameter
- **WHEN** the homepage loads with `?scrollTo=pricing` in the URL
- **THEN** the page scrolls smoothly to the element with id "pricing"

#### Scenario: Page loads without scrollTo parameter
- **WHEN** the homepage loads without a scrollTo parameter
- **THEN** no automatic scrolling occurs
