--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE auth.audit_log_entries DISABLE TRIGGER ALL;

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\\.


ALTER TABLE auth.audit_log_entries ENABLE TRIGGER ALL;

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.flow_state DISABLE TRIGGER ALL;

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method) FROM stdin;
\\.


ALTER TABLE auth.flow_state ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users DISABLE TRIGGER ALL;

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) FROM stdin;
\\.


ALTER TABLE auth.users ENABLE TRIGGER ALL;

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.identities DISABLE TRIGGER ALL;

COPY auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE auth.identities ENABLE TRIGGER ALL;

--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances DISABLE TRIGGER ALL;

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE auth.instances ENABLE TRIGGER ALL;

--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.sessions DISABLE TRIGGER ALL;

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after) FROM stdin;
\\.


ALTER TABLE auth.sessions ENABLE TRIGGER ALL;

--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.mfa_amr_claims DISABLE TRIGGER ALL;

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\\.


ALTER TABLE auth.mfa_amr_claims ENABLE TRIGGER ALL;

--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.mfa_factors DISABLE TRIGGER ALL;

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret) FROM stdin;
\\.


ALTER TABLE auth.mfa_factors ENABLE TRIGGER ALL;

--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.mfa_challenges DISABLE TRIGGER ALL;

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address) FROM stdin;
\\.


ALTER TABLE auth.mfa_challenges ENABLE TRIGGER ALL;

--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens DISABLE TRIGGER ALL;

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\\.


ALTER TABLE auth.refresh_tokens ENABLE TRIGGER ALL;

--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.sso_providers DISABLE TRIGGER ALL;

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE auth.sso_providers ENABLE TRIGGER ALL;

--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.saml_providers DISABLE TRIGGER ALL;

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE auth.saml_providers ENABLE TRIGGER ALL;

--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.saml_relay_states DISABLE TRIGGER ALL;

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, from_ip_address, created_at, updated_at, flow_state_id) FROM stdin;
\\.


ALTER TABLE auth.saml_relay_states ENABLE TRIGGER ALL;

--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations DISABLE TRIGGER ALL;

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
\\.


ALTER TABLE auth.schema_migrations ENABLE TRIGGER ALL;

--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: postgres
--

ALTER TABLE auth.sso_domains DISABLE TRIGGER ALL;

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE auth.sso_domains ENABLE TRIGGER ALL;

--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

ALTER TABLE pgsodium.key DISABLE TRIGGER ALL;

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\\.


ALTER TABLE pgsodium.key ENABLE TRIGGER ALL;

--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.schema_migrations DISABLE TRIGGER ALL;

COPY public.schema_migrations (version) FROM stdin;
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
\\.


ALTER TABLE public.schema_migrations ENABLE TRIGGER ALL;

--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets DISABLE TRIGGER ALL;

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\\.


ALTER TABLE storage.buckets ENABLE TRIGGER ALL;

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations DISABLE TRIGGER ALL;

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-10-25 17:17:04.805961
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-10-25 17:17:04.814407
2	pathtoken-column	49756be03be4c17bb85fe70d4a861f27de7e49ad	2025-10-25 17:17:04.821265
3	add-migrations-rls	bb5d124c53d68635a883e399426c6a5a25fc893d	2025-10-25 17:17:04.863953
4	add-size-functions	6d79007d04f5acd288c9c250c42d2d5fd286c54d	2025-10-25 17:17:04.873847
5	change-column-name-in-get-size	fd65688505d2ffa9fbdc58a944348dd8604d688c	2025-10-25 17:17:04.88165
6	add-rls-to-buckets	63e2bab75a2040fee8e3fb3f15a0d26f3380e9b6	2025-10-25 17:17:04.890069
7	add-public-to-buckets	82568934f8a4d9e0a85f126f6fb483ad8214c418	2025-10-25 17:17:04.896676
8	fix-search-function	1a43a40eddb525f2e2f26efd709e6c06e58e059c	2025-10-25 17:17:04.903373
9	search-files-search-function	34c096597eb8b9d077fdfdde9878c88501b2fafc	2025-10-25 17:17:04.910103
10	add-trigger-to-auto-update-updated_at-column	37d6bb964a70a822e6d37f22f457b9bca7885928	2025-10-25 17:17:04.920379
11	add-automatic-avif-detection-flag	bd76c53a9c564c80d98d119c1b3a28e16c8152db	2025-10-25 17:17:04.928134
12	add-bucket-custom-limits	cbe0a4c32a0e891554a21020433b7a4423c07ee7	2025-10-25 17:17:04.93538
13	use-bytes-for-max-size	7a158ebce8a0c2801c9c65b7e9b2f98f68b3874e	2025-10-25 17:17:04.942255
14	add-can-insert-object-function	273193826bca7e0990b458d1ba72f8aa27c0d825	2025-10-25 17:17:04.991192
15	add-version	e821a779d26612899b8c2dfe20245f904a327c4f	2025-10-25 17:17:04.998773
16	drop-owner-foreign-key	536b33f8878eed09d0144219777dcac96bdb25da	2025-10-25 17:17:05.007715
17	add_owner_id_column_deprecate_owner	7545f216a39358b5487df75d941d05dbcd75eb46	2025-10-25 17:17:05.016444
\\.


ALTER TABLE storage.migrations ENABLE TRIGGER ALL;

--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects DISABLE TRIGGER ALL;

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id) FROM stdin;
\\.


ALTER TABLE storage.objects ENABLE TRIGGER ALL;

--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

ALTER TABLE vault.secrets DISABLE TRIGGER ALL;

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\\.


ALTER TABLE vault.secrets ENABLE TRIGGER ALL;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

