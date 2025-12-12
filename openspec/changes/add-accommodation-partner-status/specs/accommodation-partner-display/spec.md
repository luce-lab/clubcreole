# Accommodation Partner Display

## Overview
This capability manages the display of reservation functionality and owner registration prompts based on accommodation partner status, ensuring users understand which properties accept online bookings.

## ADDED Requirements

### Requirement: Reservation Form MUST Only Display for Partner Accommodations
The reservation form MUST only be displayed for accommodations with verified partner status.

#### Scenario: User views partner accommodation detail page
**Given** a user navigates to an accommodation detail page
**And** the accommodation has a non-null partner_id
**And** the linked partner has status 'approuve'
**When** the page loads
**Then** the reservation card with booking form is displayed
**And** the form allows date selection, guest count, and reservation submission
**And** pricing information is calculated and shown

#### Scenario: User views non-partner accommodation detail page
**Given** a user navigates to an accommodation detail page
**And** the accommodation has a null partner_id
**When** the page loads
**Then** no reservation form is displayed
**And** a partner registration invitation message is shown instead
**And** the accommodation information remains fully visible

### Requirement: Non-Partner Accommodations MUST Display Owner Registration Invitation
Non-partner accommodations MUST display a compelling message encouraging property owners to register as partners.

#### Scenario: Non-partner accommodation displays registration prompt
**Given** a user is viewing a non-partner accommodation detail page
**When** the page section where the reservation card would normally appear is rendered
**Then** a registration invitation card is displayed with styling similar to the reservation card
**And** the message headline reads "Cet hébergement n'accepte pas encore les réservations en ligne"
**And** the message includes benefits such as "Augmentez votre visibilité", "Gérez vos réservations facilement", "Accédez à nos outils de gestion"
**And** a prominent call-to-action button "Devenir partenaire" is displayed
**And** the button links to the partner application form at `/devenir-partenaire`

#### Scenario: Owner clicks partner registration button
**Given** a property owner is viewing their non-partner accommodation
**When** the owner clicks "Devenir partenaire" button
**Then** they are navigated to `/devenir-partenaire`
**And** the partner application form is pre-filled with any available accommodation information

### Requirement: Partner Badge MUST Display on Accommodation Detail Page
Partner accommodations MUST display their partner status prominently on the detail page.

#### Scenario: Partner accommodation shows verification badge
**Given** a user is viewing a partner accommodation detail page
**When** the accommodation header is rendered
**Then** a "Partenaire Vérifié" badge is displayed near the accommodation name
**And** the badge uses distinctive styling (e.g., checkmark icon, brand color)
**And** the badge is responsive and maintains visibility on mobile devices

### Requirement: Partner Information MUST Be Integrated in Data Fetching
Accommodation detail pages MUST fetch and include partner information when available.

#### Scenario: Fetching accommodation with partner data
**Given** a request is made to load accommodation details by ID
**When** the database query is executed
**Then** the query performs a LEFT JOIN with the partners table on partner_id
**And** partner fields (business_name, status, business_type) are included in the result
**And** the TypeScript interface accommodates optional partner data

#### Scenario: Displaying accommodation without partner data
**Given** an accommodation has null partner_id
**When** the accommodation data is processed
**Then** no error occurs due to missing partner data
**And** the partner-related fields are safely handled as undefined/null
**And** the UI correctly renders the non-partner experience
