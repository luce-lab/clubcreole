# Partner Application Form - Deployment Guide

## Overview
This guide completes the partner application form feature ("Formulaire candidature partenaire") that allows businesses to apply to become partners on the ClubCreole platform.

## What Was Fixed

### 1. Database Schema Updates
- **Added `email` field** to `partners` table (required for contact)
- **Added `contact_name` field** to `partners` table (person submitting application)
- **Added unique constraint** on email to prevent duplicate applications
- **Added index** on email for faster lookups

### 2. RLS (Row Level Security) Policies
- **Fixed public read access** - Anyone can view partners list
- **Added public insert policy** - Anyone can submit partner applications (status must be 'en_attente')
- **Admin-only update/delete** - Only super admins can approve/reject/delete partners

### 3. Frontend Updates
- **Updated PartnerApplicationForm** to save email and contact_name fields
- **Improved error handling** for duplicate email/business name
- **Added proper validation** and user feedback

## Deployment Steps

### Step 1: Apply Database Migrations

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh
2. Navigate to **SQL Editor**
3. Open and copy the contents of `fix-partner-application-complete.sql`
4. Paste into SQL Editor and click **RUN**
5. Verify success messages in the output

### Step 2: Deploy Frontend Changes

The following files have been updated and need to be deployed:

- `src/components/partner/PartnerApplicationForm.tsx` - Updated to save email/contact_name
- `supabase/migrations/20251113000001_add_partner_contact_fields.sql` - New migration
- `supabase/migrations/20251113000002_fix_partners_rls_insert.sql` - New migration

Deploy using your standard process:
```bash
npm run build
# Then deploy via Docker or your platform
```

### Step 3: Verify the Feature

1. Navigate to: https://ovh.guadajobservices.fr/devenir-partenaire
2. Fill out the partner application form:
   - Business name (required, must be unique)
   - Contact name (required)
   - Email (required, must be unique)
   - Phone (required)
   - Business type (select from dropdown)
   - Address (required)
   - Description (required)
   - Website (optional)
3. Submit the form
4. Verify success message appears
5. Check in PartnersManagement that the application appears with status "En attente"

### Step 4: Admin Review Process

Admins can manage partner applications at:
- https://ovh.guadajobservices.fr/partners

Features:
- View all partner applications
- Filter by status (En attente, Approuvé, Rejeté)
- Approve or reject applications
- Search by business name or type
- Toggle restaurant partner status

## Testing Checklist

- [ ] Partner application form loads correctly at `/devenir-partenaire`
- [ ] Form validates required fields
- [ ] Form prevents duplicate business names (shows appropriate error)
- [ ] Form prevents duplicate emails (shows appropriate error)
- [ ] Successful submission shows success message and clears form
- [ ] New applications appear in PartnersManagement with "En attente" status
- [ ] Admin can approve/reject applications
- [ ] Non-admin users cannot approve/reject (RLS enforced)
- [ ] Search and filtering work in admin interface

## Database Schema Reference

### Partners Table Structure
```sql
partners (
  id                INTEGER PRIMARY KEY (auto-increment),
  business_name     TEXT NOT NULL UNIQUE,
  email             TEXT UNIQUE,              -- NEW
  contact_name      TEXT,                     -- NEW
  business_type     TEXT NOT NULL,
  description       TEXT,
  address           TEXT,
  phone             TEXT,
  website           TEXT,
  status            TEXT DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'approuve', 'rejete')),
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id           UUID,
  weight            INTEGER DEFAULT 0 CHECK (weight >= 0 AND weight <= 100),
  type              TEXT,
  image             TEXT,
  location          TEXT,
  rating            NUMERIC,
  offer             TEXT,
  icon_name         TEXT,
  gallery_images    JSONB DEFAULT '[]'
)
```

### RLS Policies
- **Public read** - Anyone can SELECT
- **Public insert** - Anyone can INSERT with status='en_attente'
- **Admin update** - Only super admins can UPDATE
- **Admin delete** - Only super admins can DELETE

## Troubleshooting

### Error: "Impossible de charger les partenaires" (401 error)
- **Cause**: RLS policy not applied
- **Solution**: Run `fix-partner-application-complete.sql` in Supabase SQL Editor

### Error: "Un partenaire avec ce nom d'entreprise existe déjà"
- **Cause**: Duplicate business name
- **Solution**: User should use a different business name

### Error: "Un partenaire avec cet email existe déjà"
- **Cause**: Duplicate email address
- **Solution**: User should use a different email address

### Form submission fails silently
- **Check**: Browser console for detailed error messages
- **Check**: Supabase logs in dashboard
- **Verify**: RLS policies are correctly applied

## Related Files

### Frontend
- `src/pages/DevenirPartenaire.tsx` - Main page
- `src/components/partner/PartnerApplicationForm.tsx` - Application form component
- `src/components/partner/PartnerHero.tsx` - Hero section
- `src/components/partner/PartnerAdvantages.tsx` - Advantages section
- `src/pages/PartnersManagement.tsx` - Admin management interface

### Backend/Database
- `supabase/migrations/20251113000001_add_partner_contact_fields.sql` - Add email/contact_name
- `supabase/migrations/20251113000002_fix_partners_rls_insert.sql` - Fix RLS policies
- `fix-partner-application-complete.sql` - Combined deployment script

## Future Enhancements

Consider these improvements for future iterations:
- [ ] Email notifications to admins on new applications
- [ ] Email confirmation to applicants
- [ ] File upload for business documents
- [ ] Multi-step form with validation
- [ ] Partner dashboard after approval
- [ ] Integration with authentication system for partners
- [ ] Bulk operations in admin interface
- [ ] Export partner applications to CSV

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify RLS policies are applied correctly
4. Ensure migrations were run successfully
5. Test with different browsers/devices

---

**Deployment Date**: 2025-11-13
**Feature**: Partner Application Form
**Status**: Ready for deployment
