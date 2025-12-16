# Fix Coolify HTTPS Deployment Issues

## Why
The Club Créole application currently fails in production deployment on Coolify due to mixed content security violations and API connectivity issues. Browsers block HTTP resources when the main page is served over HTTPS, causing critical functionality failures. This change ensures secure, production-ready deployment with proper SSL/TLS configuration.

## Problem Summary
The Club Créole application deployed on Coolify is experiencing critical mixed content errors and API failures:

### Mixed Content Errors
- Multiple HTTPS pages requesting HTTP resources (blocked by browser)
- Affects: API calls, static resources, and external endpoints

### API Fetch Failures
- "TypeError: Failed to fetch" errors for all endpoints:
  - Concerts data fetching
  - Nightlife events
  - Promotions
  - Activities
  - Deals/bons plans

### Root Causes Identified
1. **HTTP URLs in production environment**: Several configuration files still reference `http://37.59.121.40:8000`
2. **Nginx configuration**: Only listening on port 80, no HTTPS support
3. **Environment variables**: Mixed HTTP/HTTPS URLs causing inconsistent behavior
4. **Supabase client configuration**: Hardcoded HTTP URLs in client files

## Solution Overview
Update deployment configuration to fully support HTTPS and resolve all mixed content issues for production deployment on Coolify.

## Files Requiring Updates
- `.env.production.new` - Update all URLs to HTTPS
- `src/integrations/supabase/node-client.ts` - Remove hardcoded HTTP URL
- `src/integrations/supabase/serverClient.ts` - Remove hardcoded HTTP URL
- `Dockerfile` - Support both HTTP/HTTPS through environment variables
- `nginx.conf` - Add HTTPS configuration with proper headers
- `docker-compose.yml` - HTTPS support for local development

## Implementation Strategy
1. Update all HTTP URLs to HTTPS in production configurations
2. Make Supabase URLs configurable through environment variables
3. Add HTTPS support to Nginx configuration
4. Update Docker build process for production deployment
5. Test and validate all API endpoints work over HTTPS

## Success Criteria
- No mixed content warnings in browser console
- All API endpoints successfully fetch data
- Application loads properly over HTTPS
- No "Failed to fetch" errors
- All static resources load correctly

## Risk Assessment
- **Low risk**: Changes are primarily configuration updates
- **No breaking changes**: Backward compatible with existing code
- **Easy rollback**: Changes can be reverted if issues arise

## Dependencies
- Coolify deployment platform must support SSL certificates
- Production environment variables must be properly configured
- Nginx must handle HTTPS termination properly

## Testing Plan
1. Local testing with HTTPS-enabled nginx
2. Staging environment validation
3. Production deployment verification
4. Browser console validation for mixed content errors
5. API endpoint functionality testing