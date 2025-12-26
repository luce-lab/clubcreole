-- Import data for table: tenants
-- Generated from backup_insert.sql

INSERT INTO _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha, private_only) VALUES ('4def5ebb-084d-4f5b-9c85-b741fcad4012', 'realtime-dev', 'realtime-dev', '/iWVnOoP4+iU2w9d1C+LNQOE7LhcZ/9/NlP2P3OvqXVPNrrhma6I8nd28t/mto4/', '200', '2025-12-23 23:31:41', '2025-12-23 23:31:41', '100', 'postgres_cdc_rls', '100000', '100', '100', 'f', NULL, 'f', 'f');
