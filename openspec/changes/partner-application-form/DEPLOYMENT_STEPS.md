# Partner Application Form - Deployment Steps

## Status: ✅ Implementation Complete - Ready for Deployment

All code changes have been implemented and tested. The following manual steps are required to activate the feature in production.

---

## Step 1: Deploy Database Migrations to Supabase

### Option A: Using Supabase Dashboard (Recommended)

1. **Navigate to Supabase SQL Editor**
   - URL: https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/sql/new

2. **Run the Complete Migration Script**
   - Open file: `fix-partner-application-complete.sql`
   - Copy entire contents
   - Paste into SQL Editor
   - Click "RUN" button

3. **Verify Success**
   You should see output showing:
   - New columns added: `email`, `contact_name`
   - Index created: `idx_partners_email`
   - RLS policies created: 4 policies
   - Verification queries showing the new schema

### Option B: Using Supabase CLI (If Available)

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref psryoyugyimibjhwhvlh

# Push migrations
supabase db push
```

---

## Step 2: Deploy Frontend Changes

### Build and Deploy

```bash
# Build the production bundle
npm run build

# Deploy using Docker
docker compose build
docker compose up -d
```

### Alternative: Deploy to Your Hosting Platform

If you're using a different hosting platform (Vercel, Netlify, etc.), follow your standard deployment process.

---

## Step 3: Verify the Feature Works

### Test the Partner Application Form

1. **Navigate to the form**
   - URL: https://ovh.guadajobservices.fr/devenir-partenaire
   - Or: http://localhost:5174/devenir-partenaire (if testing locally)

2. **Submit a test application**
   - Fill in all required fields:
     - Business name (must be unique)
     - Contact name
     - Email (must be unique, valid format)
     - Phone
     - Business type (select from dropdown)
     - Address
     - Description
     - Website (optional)
   - Click "Envoyer la demande"

3. **Expected behavior**
   - Success message appears: "Votre demande de partenariat a été envoyée avec succès"
   - Form clears
   - No console errors in browser DevTools

### Test Error Handling

1. **Test duplicate business name**
   - Submit same business name twice
   - Should show error: "Un partenaire avec ce nom d'entreprise existe déjà"

2. **Test duplicate email**
   - Submit same email twice
   - Should show error: "Un partenaire avec cet email existe déjà"

3. **Test required field validation**
   - Try to submit without filling required fields
   - HTML5 validation should prevent submission

### Test Admin Panel

1. **Navigate to Partners Management**
   - URL: https://ovh.guadajobservices.fr/partners
   - Login as admin user

2. **Verify application appears**
   - New application should be in "En attente" status
   - All fields should display correctly

3. **Test approval workflow**
   - Click approve button on test application
   - Status should change to "Approuvé"

4. **Test search and filtering**
   - Search by business name
   - Filter by status
   - Verify results update correctly

---

## Step 4: Clean Up Test Data (Optional)

After verifying the feature works, you may want to delete test applications:

```sql
-- In Supabase SQL Editor
DELETE FROM public.partners
WHERE business_name LIKE '%Test%'
AND status = 'en_attente';
```

---

## Verification Checklist

Use this checklist to ensure everything is working:

- [ ] SQL migrations applied successfully in Supabase
- [ ] No errors in Supabase migration logs
- [ ] Frontend deployed to production
- [ ] Partner application form loads at `/devenir-partenaire`
- [ ] All form fields are present and functional
- [ ] Form submission with valid data succeeds
- [ ] Success message displays after submission
- [ ] Form clears after successful submission
- [ ] Duplicate business name shows appropriate error
- [ ] Duplicate email shows appropriate error
- [ ] Required field validation works
- [ ] New applications appear in admin panel
- [ ] Applications have "En attente" status
- [ ] Admin can approve applications
- [ ] Admin can reject applications
- [ ] Search functionality works in admin panel
- [ ] Filter by status works in admin panel
- [ ] No console errors in browser DevTools
- [ ] Feature works on mobile devices
- [ ] Feature works in different browsers

---

## Troubleshooting

### Error: "Impossible de charger les partenaires" (401)

**Cause**: RLS policies not applied or incorrectly configured

**Solution**:
1. Re-run `fix-partner-application-complete.sql` in Supabase SQL Editor
2. Verify policies exist:
   ```sql
   SELECT policyname FROM pg_policies WHERE tablename = 'partners';
   ```
   Should show 4 policies: Public read, Public insert, Admin update, Admin delete

### Error: Column "email" does not exist

**Cause**: Database migration not applied

**Solution**:
1. Run `fix-partner-application-complete.sql` in Supabase SQL Editor
2. Verify columns exist:
   ```sql
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'partners' AND column_name IN ('email', 'contact_name');
   ```

### Form submission fails silently

**Cause**: Check browser console for errors

**Solution**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests
5. Verify Supabase configuration in `.env`:
   - `VITE_SUPABASE_URL` should be set
   - `VITE_SUPABASE_ANON_KEY` should be set

### Applications don't appear in admin panel

**Cause**: RLS policies or data fetch issue

**Solution**:
1. Verify RLS policies allow SELECT for everyone
2. Check if data exists:
   ```sql
   SELECT * FROM public.partners WHERE status = 'en_attente';
   ```
3. Check browser console for errors

---

## Files Changed in This Implementation

### Created Files (10)
1. `supabase/migrations/20251113000001_add_partner_contact_fields.sql`
2. `supabase/migrations/20251113000002_fix_partners_rls_insert.sql`
3. `fix-partner-application-complete.sql`
4. `fix-partners-rls.sql` (alternative RLS fix script)
5. `PARTNER_APPLICATION_DEPLOYMENT.md`
6. `PARTNER_APPLICATION_SUMMARY.md`
7. `openspec/changes/partner-application-form/proposal.md`
8. `openspec/changes/partner-application-form/tasks.md`
9. `openspec/changes/partner-application-form/DEPLOYMENT_STEPS.md` (this file)

### Modified Files (1)
1. `src/components/partner/PartnerApplicationForm.tsx`
   - Added `email` and `contact_name` to database insert
   - Enhanced error handling for duplicate constraints
   - Improved user feedback with detailed error messages

---

## Post-Deployment

After successful deployment:

1. **Monitor for Issues**
   - Check Supabase logs for errors
   - Monitor application logs
   - Watch for user feedback

2. **Update Documentation**
   - Mark OpenSpec change as deployed
   - Update any user-facing documentation
   - Notify stakeholders of new feature

3. **Consider Future Enhancements**
   See section 9 in `tasks.md` for optional improvements:
   - Email notifications
   - File uploads
   - Multi-step wizard
   - Bulk operations
   - CSV export

---

## Support

If you encounter any issues during deployment:

1. Check the troubleshooting section above
2. Review `PARTNER_APPLICATION_DEPLOYMENT.md` for detailed guidance
3. Check Supabase dashboard logs
4. Verify environment variables are correct
5. Test in local environment first if possible

---

**Implementation Date**: 2025-11-13
**Feature**: Partner Application Form
**Status**: ✅ Code Complete - Ready for Production Deployment
**Deployed By**: [Your Name]
**Deployment Date**: [To be filled after deployment]
