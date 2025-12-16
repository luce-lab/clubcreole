# Implementation Tasks: Fix Coolify HTTPS Deployment

## 1. Environment Configuration Updates
- [ ] 1.1 Update `.env.production.new` with HTTPS URLs
  - Change `http://37.59.121.40:8000` to `https://37.59.121.40:8000` (or appropriate domain)
  - Update all Supabase-related URLs to HTTPS
  - Update API_EXTERNAL_URL to HTTPS
  - Update GOTRUE_SITE_URL to HTTPS

## 2. Supabase Client Configuration
- [ ] 2.1 Update `src/integrations/supabase/node-client.ts`
  - Replace hardcoded HTTP URL with environment variable
  - Add fallback to localhost for development
  - Ensure HTTPS support in production

- [ ] 2.2 Update `src/integrations/supabase/serverClient.ts`
  - Replace hardcoded HTTP URL with environment variable
  - Add fallback to localhost for development
  - Ensure HTTPS support in production

## 3. Docker and Nginx Configuration
- [ ] 3.1 Update `nginx.conf` for HTTPS support
  - Add SSL configuration blocks
  - Include proper SSL headers (HSTS, etc.)
  - Configure HTTP to HTTPS redirect
  - Maintain SPA routing with HTTPS

- [ ] 3.2 Update `Dockerfile` for production deployment
  - Pass environment variables for URL configuration
  - Ensure build process uses correct URLs
  - Support both HTTP (dev) and HTTPS (prod)

- [ ] 3.3 Update `docker-compose.yml`
  - Add HTTPS support for local development
  - Include SSL certificate mounting if needed
  - Configure environment variables properly

## 4. Build and Configuration Validation
- [ ] 4.1 Update `vite.config.ts` if needed
  - Ensure proper base path for production
  - Configure build assets for HTTPS
  - Verify asset loading paths

- [ ] 4.2 Create environment validation
  - Add runtime validation for required environment variables
  - Provide clear error messages for missing configurations
  - Ensure graceful fallbacks

## 5. Testing and Deployment
- [ ] 5.1 Local testing with HTTPS
  - Set up local HTTPS environment
  - Test all API endpoints over HTTPS
  - Verify no mixed content warnings
  - Validate static asset loading

- [ ] 5.2 Staging environment validation
  - Deploy to staging environment
  - Test complete application functionality
  - Monitor browser console for errors
  - Validate all data fetching operations

- [ ] 5.3 Production deployment
  - Update Coolify deployment configuration
  - Configure SSL certificates
  - Deploy and monitor application
  - Verify all functionality works over HTTPS

## 6. Verification and Monitoring
- [ ] 6.1 Post-deployment verification
  - Check browser console for mixed content errors
  - Verify all API calls succeed
  - Test all application features
  - Validate performance metrics

- [ ] 6.2 Documentation updates
  - Update deployment documentation
  - Document HTTPS configuration requirements
  - Update environment setup instructions
  - Create troubleshooting guide for SSL issues

## Dependencies and Blocking Issues
- Task 3.1 depends on SSL certificate availability on Coolify
- Task 5.2 requires staging environment setup
- Task 5.3 requires production access and coordination

## Parallel Work Opportunities
- Tasks 1, 2.1, and 2.2 can be done in parallel
- Tasks 4.1 and 4.2 can be done simultaneously
- Tasks 5.1 and documentation updates can occur in parallel

## Validation Criteria
- Zero mixed content warnings in browser console
- All API endpoints return successful responses
- Application loads correctly over HTTPS
- No "Failed to fetch" errors in console
- All static resources load without security warnings