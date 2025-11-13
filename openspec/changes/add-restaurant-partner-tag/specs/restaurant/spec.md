## ADDED Requirements

### Requirement: Restaurant Partner Status
The system SHALL support a partner status for restaurants to distinguish between partners and non-partners.

#### Scenario: Mark restaurant as partner
- **WHEN** an administrator marks a restaurant as a partner
- **THEN** the restaurant receives the `is_partner` flag set to true
- **AND** the restaurant becomes eligible for direct reservations

#### Scenario: Mark restaurant as non-partner
- **WHEN** an administrator unmarks a restaurant as a partner
- **THEN** the restaurant receives the `is_partner` flag set to false
- **AND** the restaurant can no longer accept direct reservations

### Requirement: Partner Badge Display
The system SHALL display a visual indicator for restaurant partners.

#### Scenario: Partner badge on restaurant cards
- **WHEN** viewing restaurant listings or cards
- **THEN** partner restaurants display a "Partenaire" badge
- **AND** non-partner restaurants do not display the badge

#### Scenario: Partner badge on restaurant detail page
- **WHEN** viewing a restaurant detail page
- **THEN** partner restaurants display a prominent "Partenaire" indicator
- **AND** non-partner restaurants do not display any partner indicator

### Requirement: Conditional Reservation Form
The system SHALL only display reservation forms for partner restaurants.

#### Scenario: Reservation form available for partners
- **WHEN** viewing a partner restaurant detail page
- **THEN** the reservation form is displayed and functional
- **AND** users can make direct reservations through the platform

#### Scenario: No reservation form for non-partners
- **WHEN** viewing a non-partner restaurant detail page
- **THEN** the reservation form is hidden
- **AND** only restaurant information is displayed
- **AND** users see information about contact methods instead

### Requirement: Partner Management Interface
Administrators SHALL be able to manage restaurant partner status.

#### Scenario: Toggle partner status in admin panel
- **WHEN** an administrator accesses restaurant management
- **THEN** they can toggle the partner status for any restaurant
- **AND** the change is immediately reflected in the user interface

#### Scenario: Filter restaurants by partner status
- **WHEN** an administrator views restaurant listings
- **THEN** they can filter restaurants by partner status
- **AND** see only partners, only non-partners, or all restaurants

### Requirement: Partner Restaurant Priority
Partner restaurants SHALL receive priority in search results and listings.

#### Scenario: Enhanced visibility for partners
- **WHEN** users search or browse restaurants
- **THEN** partner restaurants appear before non-partners with similar ratings
- **AND** partners are marked with visual indicators