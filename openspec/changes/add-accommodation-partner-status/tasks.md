# Tasks: Add Accommodation Partner Status

## Database & Type Definitions

### 1. Update TypeScript Accommodation Types
**Files**: `src/components/accommodation/AccommodationTypes.ts`
- [x] Add `partner_id?: number | null` field to Accommodation interface
- [x] Create new `PartnerInfo` interface with fields: id, business_name, business_type, status
- [x] Add optional `partner?: PartnerInfo | null` field to Accommodation interface
- [x] Update all type exports

**Validation**: TypeScript compiles without errors, types reflect optional partner relationship

### 2. Update Accommodation Service for Partner Data
**Files**: `src/services/accommodationService.ts`
- [x] Update `fetchAccommodations()` to LEFT JOIN partners table and select partner fields
- [x] Update `fetchAccommodationsWeightedRandom()` to include partner data in query
- [x] Update `fetchAccommodationsPaginated()` to include partner data and support partner filter parameter
- [x] Ensure `transformAmenities` and data transformation includes partner information
- [x] Update return types to include partner data

**Validation**: Console logs show partner data when present, queries execute successfully

## UI Components - Filtering

### 3. Add Partner Filter Toggle to AccommodationSearch
**Files**: `src/components/accommodation/AccommodationSearch.tsx`
- [x] Import Switch component from shadcn/ui
- [x] Add `partnerOnly` state (boolean, default false)
- [x] Add `onPartnerFilterChange` to props interface
- [x] Add Switch with label "Partenaires uniquement" to search UI
- [x] Call `onPartnerFilterChange` when switch toggles
- [x] Style filter to match existing search controls

**Validation**: Filter toggle appears and fires events correctly

### 4. Implement Partner Filtering in Accommodation Grid
**Files**:
- `src/hooks/useInfiniteAccommodations.ts`
- `src/pages/AccommodationActivity.tsx`
- [x] Add `partnerOnly` state to parent page component
- [x] Pass `partnerOnly` to AccommodationSearch onChange handler
- [x] Update `fetchAccommodationsPaginated` calls to include partnerOnly parameter
- [x] Modify service function to filter WHERE partner_id IS NOT NULL AND partners.status = 'approuve' when partnerOnly is true
- [x] Reset pagination offset when filter changes
- [x] Added debouncing for partnerOnly filter

**Validation**: Filtering returns only partner accommodations when enabled, pagination resets correctly

### 5. Add Partner Badge to Accommodation Cards
**Files**: `src/components/accommodation/AccommodationCard.tsx`
- [x] Add Badge component import from shadcn/ui
- [x] Check if `accommodation.partner` exists and `partner.status === 'approuve'`
- [x] Render "Partenaire" badge in bottom-left position
- [x] Style badge with distinct color (creole-green)
- [x] Add CheckCircle icon to badge
- [x] Ensure badge is responsive on mobile

**Validation**: Badge appears only on partner accommodations, styling is consistent and visible

## UI Components - Detail Page

### 6. Update AccommodationDetail to Fetch Partner Data
**Files**: `src/pages/AccommodationDetail.tsx`
- [x] Update Supabase query to LEFT JOIN partners table: `.select('*, partners(id, business_name, business_type, status)')`
- [x] Ensure transformAmenities includes partner data in formatted result
- [x] Pass partner data to child components
- [x] Add loading and error handling for partner data

**Validation**: Partner data is available in accommodation object when partner_id exists

### 7. Add Partner Badge to Accommodation Header
**Files**: `src/components/accommodation/AccommodationHeader.tsx`
- [x] Add `partner?: PartnerInfo | null` to props interface
- [x] Import Badge and CheckCircle components
- [x] Conditionally render "Partenaire Vérifié" badge when partner exists and status is 'approuve'
- [x] Position badge next to accommodation name
- [x] Ensure mobile responsiveness

**Validation**: Badge displays correctly on partner accommodation detail pages

### 8. Create PartnerRegistrationCard Component
**Files**: `src/components/accommodation/PartnerRegistrationCard.tsx` (new file)
- [x] Create new component with same Card wrapper as ReservationCard
- [x] Add headline: "Cet hébergement n'accepte pas encore les réservations en ligne"
- [x] Add subheading: "Vous êtes le propriétaire ?"
- [x] List benefits with icons:
  - "Augmentez votre visibilité auprès de milliers de voyageurs"
  - "Gérez vos réservations facilement depuis votre tableau de bord"
  - "Accédez à nos outils de gestion et statistiques"
  - "Rejoignez notre réseau de partenaires de confiance"
- [x] Add prominent "Devenir partenaire" button linking to `/devenir-partenaire`
- [x] Style consistently with ReservationCard (sticky positioning, shadow, etc.)
- [x] Make component responsive

**Validation**: Component renders with proper styling and link navigation works

### 9. Conditionally Display Reservation vs Registration Card
**Files**: `src/pages/AccommodationDetail.tsx`
- [x] Import PartnerRegistrationCard component
- [x] Check if `accommodation.partner_id` exists and `accommodation.partner?.status === 'approuve'`
- [x] Render ReservationCard if condition is true
- [x] Render PartnerRegistrationCard if condition is false
- [x] Pass appropriate props to each component
- [x] Ensure proper TypeScript typing for conditional rendering

**Validation**: Partner accommodations show reservation form, non-partner show registration prompt

## Testing & Refinement

### 10. Test Partner Filter with Various Scenarios
**Manual Testing**:
- [x] Build succeeds without TypeScript errors
- [ ] Test partner filter alone (requires manual testing with UI)
- [ ] Test partner filter + search query (requires manual testing with UI)
- [ ] Test partner filter + price filter (requires manual testing with UI)
- [ ] Test filter toggle on/off (requires manual testing with UI)
- [ ] Verify pagination with filter active (requires manual testing with UI)

**Validation**: Build completes successfully, ready for manual UI testing

### 11. Test Accommodation Detail Page Scenarios
**Manual Testing**:
- [x] TypeScript compilation successful
- [ ] Test partner accommodation with approved status (shows reservation form) (requires manual testing with UI)
- [ ] Test non-partner accommodation (shows registration card) (requires manual testing with UI)
- [ ] Test partner accommodation with non-approved status (should show registration card) (requires manual testing with UI)
- [ ] Test navigation from registration card to partner form (requires manual testing with UI)
- [ ] Verify badge displays correctly on various screen sizes (requires manual testing with UI)

**Validation**: All TypeScript types are correct, ready for manual UI testing

### 12. Update Accommodation Admin Management (if needed)
**Files**: `src/components/accommodations/admin/form/AccommodationForm.tsx`
- [ ] Defer to future enhancement - admin interface can be updated later if needed
- [ ] Partner relationships can currently be managed directly via database

**Validation**: Not blocking for MVP release

## Documentation

### 13. Update Component Documentation
- [x] Add JSDoc comments to new PartnerRegistrationCard component
- [x] Update AccommodationTypes.ts with clear comments on partner fields
- [x] Document partner filter behavior in AccommodationSearch
- [x] Implementation includes clear inline comments

**Validation**: Code is well-documented for future maintainers
