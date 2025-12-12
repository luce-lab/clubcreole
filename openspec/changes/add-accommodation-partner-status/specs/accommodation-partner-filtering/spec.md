# Accommodation Partner Filtering

## Overview
This capability enables users to filter accommodations based on their partner status, allowing them to view only properties that accept direct online reservations through the platform.

## ADDED Requirements

### Requirement: Partner Status MUST Display on Accommodation Cards
Accommodation listings MUST visually indicate which properties are partnered with the platform.

#### Scenario: User views accommodation list with partner badges
**Given** a user is viewing the accommodation list
**And** the list contains both partner and non-partner accommodations
**When** the accommodations are displayed
**Then** each partner accommodation displays a distinctive "Partenaire" badge
**And** the badge is visually prominent and consistent across all cards
**And** non-partner accommodations do not display any badge

#### Scenario: User hovers over partner badge for details
**Given** a user is viewing an accommodation with a partner badge
**When** the user hovers over the badge
**Then** a tooltip appears explaining partner benefits (if applicable)

### Requirement: Partner Filter MUST Be Available in Search Interface
Users MUST be able to filter accommodations to show only partner properties that accept online reservations.

#### Scenario: User applies partner-only filter
**Given** a user is on the accommodations search page
**When** the user activates the "Partenaires uniquement" filter toggle
**Then** the accommodation list refreshes to show only partner accommodations
**And** the total count updates to reflect filtered results
**And** the URL updates to preserve the filter state

#### Scenario: User combines partner filter with other search criteria
**Given** a user has entered search text "Pointe-à-Pitre"
**And** has selected price filter "medium"
**When** the user activates the "Partenaires uniquement" filter
**Then** only partner accommodations matching all criteria are displayed
**And** all filters remain active simultaneously

#### Scenario: User removes partner filter
**Given** a user has the "Partenaires uniquement" filter active
**When** the user deactivates the filter
**Then** all accommodations (partner and non-partner) are displayed
**And** other active filters remain applied

### Requirement: Partner Status MUST Be Included in Accommodation Data Model
The accommodation data model MUST include partner relationship information for proper filtering and display.

#### Scenario: Accommodation data includes partner information
**Given** an accommodation is retrieved from the database
**When** the data is transformed for the application
**Then** the accommodation object includes partner_id field
**And** the object includes partner business information if partner_id is not null
**And** the partner information includes business_name, business_type, and status

#### Scenario: Filtering accommodations by partner status server-side
**Given** a request for accommodations with partner filter enabled
**When** the database query is executed
**Then** the query joins accommodations with partners table
**And** only accommodations with non-null partner_id are returned
**And** only accommodations linked to partners with status 'approuve' are returned
