# HTTPS Configuration Specification

## ADDED Requirements

### Requirement: HTTPS Environment Variable Configuration
The application SHALL use HTTPS URLs for all external API calls and resources in production environments, with fallback support for HTTP in local development.

#### Scenarios:
1. **Production Environment Setup**
   - Given the application is running in production mode
   - When environment variables are loaded
   - Then all Supabase URLs must use HTTPS protocol
   - And API_EXTERNAL_URL must use HTTPS protocol
   - And GOTRUE_SITE_URL must use HTTPS protocol

2. **Development Environment Fallback**
   - Given the application is running in development mode
   - When HTTPS environment variables are not available
   - Then the application should fall back to HTTP localhost URLs
   - And continue to function for local development

3. **Environment Variable Validation**
   - Given the application starts
   - When required HTTPS URLs are missing in production
   - Then the application should display a clear error message
   - And fail gracefully with instructions for configuration

### Requirement: Supabase Client HTTPS Support
Supabase client configurations SHALL dynamically use HTTPS URLs based on environment, removing all hardcoded HTTP URLs.

#### Scenarios:
1. **Dynamic URL Resolution**
   - Given the Supabase client is initialized
   - When running in production environment
   - Then it should use HTTPS URLs from environment variables
   - And validate the URL format before making requests

2. **Development Mode Compatibility**
   - Given the application is running locally
   - When Supabase client is initialized
   - Then it should use HTTP localhost URLs by default
   - And support development workflows without SSL certificates

3. **URL Validation**
   - Given a Supabase URL is configured
   - When the client establishes a connection
   - Then it should validate the URL format
   - And throw descriptive errors for invalid configurations

### Requirement: HTTPS-Ready Nginx Configuration
Nginx configuration SHALL support SSL/TLS termination, HTTP to HTTPS redirects, and proper security headers for production deployment.

#### Scenarios:
1. **SSL Termination**
   - Given the Nginx server receives HTTPS requests
   - When processing incoming traffic
   - Then it should terminate SSL at the load balancer
   - And serve content over HTTP to the application internally

2. **HTTP to HTTPS Redirect**
   - Given a user accesses the application via HTTP
   - When Nginx receives the request
   - Then it should return a 301 permanent redirect to HTTPS
   - And preserve the original path and query parameters

3. **Security Headers**
   - Given the Nginx serves content over HTTPS
   - When responding to requests
   - Then it should include HSTS (Strict-Transport-Security) header
   - And include X-Frame-Options, X-Content-Type-Options headers
   - And set appropriate SSL session configurations

### Requirement: Mixed Content Prevention
The application SHALL prevent all mixed content warnings by ensuring all resources are loaded over HTTPS when the main page is served via HTTPS.

#### Scenarios:
1. **Asset Loading**
   - Given the application is loaded over HTTPS
   - When static assets (CSS, JS, images) are requested
   - Then all asset URLs must use HTTPS protocol
   - And no mixed content warnings should appear in browser console

2. **API Requests**
   - Given the application makes API calls
   - When the page is served over HTTPS
   - Then all API requests must use HTTPS endpoints
   - And no "Mixed Content" errors should occur

3. **External Links**
   - Given the application displays external links
   - When the page is served over HTTPS
   - Then HTTP external links should be converted to HTTPS when possible
   - Or be clearly marked as external non-secure resources

### Requirement: Production SSL Certificate Management
The deployment infrastructure SHALL properly manage SSL certificates for production domains with automatic renewal and monitoring.

#### Scenarios:
1. **Certificate Installation**
   - Given the Coolify deployment is configured
   - When SSL certificates are generated or uploaded
   - Then they should be properly installed in the Nginx configuration
   - And the application should serve content over HTTPS

2. **Certificate Renewal**
   - Given SSL certificates have expiration dates
   - When certificates approach expiration (30 days)
   - Then the system should automatically renew certificates
   * And send alerts to administrators about renewal status

3. **Certificate Validation**
   - Given the application is deployed with SSL
   - When starting up or during health checks
   - Then it should validate certificate chain
   - And ensure proper SSL/TLS configuration
   * And alert on any certificate issues

## MODIFIED Requirements

### Requirement: Enhanced HTTPS Error Messages
Application error handling SHALL provide specific messages for HTTPS/SSL related issues, replacing generic API failure messages with detailed guidance for mixed content problems.

#### Scenarios:
1. **HTTPS Error Messages**
   - Given an API call fails due to mixed content
   - When the error occurs
   - Then display a user-friendly message explaining the security issue
   - And provide guidance if it's a development vs production issue

2. **Development vs Production Behavior**
   - Given the application encounters SSL errors
   - When determining error handling approach
   - Then in development: show detailed debugging information
   - And in production: show user-friendly error with support contact

## REMOVED Requirements

### Requirement: HTTP-Only Production Deployment
#### Removed Behavior:
- **Original**: The application was configured to run over HTTP in production
- **Removed**: All HTTP-only production configurations are eliminated in favor of mandatory HTTPS

### Requirement: Hardcoded Supabase URLs
#### Removed Behavior:
- **Original**: Supabase URLs were hardcoded as HTTP in client files
- **Removed**: All hardcoded URLs are replaced with environment-aware configuration

## Cross-Capability Dependencies

- Depends on: SSL certificate infrastructure setup
- Enables: Production deployment on Coolify with HTTPS
- Related to: Environment variable management system
- Impacts: API client configuration and error handling