pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: key
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA _realtime;


ALTER SCHEMA _realtime OWNER TO supabase_admin;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA supabase_functions;


ALTER SCHEMA supabase_functions OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: admin_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.admin_type AS ENUM (
    'super_admin',
    'partner_admin'
);


ALTER TYPE public.admin_type OWNER TO supabase_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO supabase_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION supabase_functions.http_request() OWNER TO supabase_functions_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _realtime.extensions OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb,
    notify_private_alpha boolean DEFAULT false,
    private_only boolean DEFAULT false NOT NULL
);


ALTER TABLE _realtime.tenants OWNER TO supabase_admin;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: accommodation_reservations; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.accommodation_reservations (
    id integer NOT NULL,
    accommodation_id integer,
    check_in date NOT NULL,
    check_out date NOT NULL,
    guests integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    notes text,
    status text DEFAULT 'pending'::text,
    total_price numeric,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.accommodation_reservations OWNER TO supabase_admin;

--
-- Name: accommodation_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.accommodation_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accommodation_reservations_id_seq OWNER TO supabase_admin;

--
-- Name: accommodation_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.accommodation_reservations_id_seq OWNED BY public.accommodation_reservations.id;


--
-- Name: accommodations; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.accommodations (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    location text NOT NULL,
    price numeric NOT NULL,
    rating numeric DEFAULT 0,
    image text NOT NULL,
    gallery_images jsonb DEFAULT '[]'::jsonb,
    features jsonb DEFAULT '[]'::jsonb,
    description text NOT NULL,
    rooms integer DEFAULT 1,
    bathrooms integer DEFAULT 1,
    max_guests integer DEFAULT 2,
    amenities jsonb DEFAULT '[]'::jsonb,
    rules jsonb DEFAULT '[]'::jsonb,
    discount integer,
    weight integer DEFAULT 0,
    partner_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.accommodations OWNER TO supabase_admin;

--
-- Name: accommodations_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.accommodations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accommodations_id_seq OWNER TO supabase_admin;

--
-- Name: accommodations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.accommodations_id_seq OWNED BY public.accommodations.id;


--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id bigint NOT NULL,
    name text NOT NULL,
    path text NOT NULL,
    icon_name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    rating numeric(3,2) DEFAULT 0.00
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.activities ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: activity_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_images (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    url text NOT NULL,
    alt_text text NOT NULL,
    title text NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.activity_images OWNER TO postgres;

--
-- Name: activity_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_images_id_seq OWNER TO postgres;

--
-- Name: activity_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_images_id_seq OWNED BY public.activity_images.id;


--
-- Name: activity_inclusions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_inclusions (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    inclusion_text text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.activity_inclusions OWNER TO postgres;

--
-- Name: activity_inclusions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_inclusions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_inclusions_id_seq OWNER TO postgres;

--
-- Name: activity_inclusions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_inclusions_id_seq OWNED BY public.activity_inclusions.id;


--
-- Name: activity_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_levels (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    level_name text NOT NULL,
    level_description text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.activity_levels OWNER TO postgres;

--
-- Name: activity_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_levels_id_seq OWNER TO postgres;

--
-- Name: activity_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_levels_id_seq OWNED BY public.activity_levels.id;


--
-- Name: activity_reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_reservations (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    user_id uuid,
    reservation_date date NOT NULL,
    time_slot time without time zone NOT NULL,
    number_of_participants integer DEFAULT 1 NOT NULL,
    total_price integer NOT NULL,
    participant_names text[] NOT NULL,
    participant_levels text[] NOT NULL,
    contact_email text NOT NULL,
    contact_phone text NOT NULL,
    special_requests text,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.activity_reservations OWNER TO postgres;

--
-- Name: activity_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_reservations_id_seq OWNER TO postgres;

--
-- Name: activity_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_reservations_id_seq OWNED BY public.activity_reservations.id;


--
-- Name: activity_time_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_time_slots (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    time_slot time without time zone NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.activity_time_slots OWNER TO postgres;

--
-- Name: activity_time_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_time_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_time_slots_id_seq OWNER TO postgres;

--
-- Name: activity_time_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_time_slots_id_seq OWNED BY public.activity_time_slots.id;


--
-- Name: bons_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bons_plans (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    image text,
    badge text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.bons_plans OWNER TO postgres;

--
-- Name: bons_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bons_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bons_plans_id_seq OWNER TO postgres;

--
-- Name: bons_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bons_plans_id_seq OWNED BY public.bons_plans.id;


--
-- Name: car_client_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_client_reviews (
    id integer NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    avatar text NOT NULL,
    comment text NOT NULL,
    rating integer NOT NULL,
    review_date date NOT NULL,
    rental_company_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT car_client_reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.car_client_reviews OWNER TO postgres;

--
-- Name: car_client_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_client_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_client_reviews_id_seq OWNER TO postgres;

--
-- Name: car_client_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_client_reviews_id_seq OWNED BY public.car_client_reviews.id;


--
-- Name: car_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_models (
    id integer NOT NULL,
    company_id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    price_per_day integer NOT NULL,
    category text NOT NULL,
    seats integer NOT NULL,
    transmission text NOT NULL,
    air_con boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.car_models OWNER TO postgres;

--
-- Name: car_models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_models_id_seq OWNER TO postgres;

--
-- Name: car_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_models_id_seq OWNED BY public.car_models.id;


--
-- Name: car_rental_companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_rental_companies (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    image text NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    rating numeric(2,1) NOT NULL,
    offer text NOT NULL,
    icon_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.car_rental_companies OWNER TO postgres;

--
-- Name: car_rental_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_rental_companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_rental_companies_id_seq OWNER TO postgres;

--
-- Name: car_rental_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_rental_companies_id_seq OWNED BY public.car_rental_companies.id;


--
-- Name: car_rental_features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_rental_features (
    id integer NOT NULL,
    company_id integer NOT NULL,
    feature text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.car_rental_features OWNER TO postgres;

--
-- Name: car_rental_features_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_rental_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_rental_features_id_seq OWNER TO postgres;

--
-- Name: car_rental_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_rental_features_id_seq OWNED BY public.car_rental_features.id;


--
-- Name: car_rental_reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_rental_reservations (
    id integer NOT NULL,
    car_model_id integer,
    user_id uuid,
    start_date date,
    end_date date,
    pickup_location text,
    return_location text,
    total_price numeric,
    status text DEFAULT 'pending'::text,
    driver_name text,
    driver_email text,
    driver_phone text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.car_rental_reservations OWNER TO postgres;

--
-- Name: car_rental_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_rental_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.car_rental_reservations_id_seq OWNER TO postgres;

--
-- Name: car_rental_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_rental_reservations_id_seq OWNED BY public.car_rental_reservations.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    icon character varying(50) NOT NULL,
    description text,
    sort_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.categories OWNER TO supabase_admin;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO supabase_admin;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: concerts; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.concerts (
    id integer NOT NULL,
    name text NOT NULL,
    artist text NOT NULL,
    genre text NOT NULL,
    image text NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    date text NOT NULL,
    "time" text NOT NULL,
    price numeric NOT NULL,
    offer text NOT NULL,
    rating numeric NOT NULL,
    icon text DEFAULT 'Music'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    gallery_images jsonb DEFAULT '[]'::jsonb,
    partner_id integer
);


ALTER TABLE public.concerts OWNER TO supabase_admin;

--
-- Name: concerts_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.concerts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.concerts_id_seq OWNER TO supabase_admin;

--
-- Name: concerts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.concerts_id_seq OWNED BY public.concerts.id;


--
-- Name: leisure_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leisure_activities (
    id integer NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    price_per_person integer NOT NULL,
    duration_hours numeric(3,1) NOT NULL,
    min_level text NOT NULL,
    max_participants integer DEFAULT 10,
    equipment_provided boolean DEFAULT true,
    professional_guide boolean DEFAULT true,
    icon_name text DEFAULT 'waves'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.leisure_activities OWNER TO postgres;

--
-- Name: leisure_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leisure_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leisure_activities_id_seq OWNER TO postgres;

--
-- Name: leisure_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leisure_activities_id_seq OWNED BY public.leisure_activities.id;


--
-- Name: loisirs; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.loisirs (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    start_date text NOT NULL,
    end_date text DEFAULT ''::text NOT NULL,
    max_participants integer NOT NULL,
    current_participants integer DEFAULT 0 NOT NULL,
    image text NOT NULL,
    gallery_images jsonb DEFAULT '[]'::jsonb,
    partner_id integer
);


ALTER TABLE public.loisirs OWNER TO supabase_admin;

--
-- Name: loisirs_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.loisirs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.loisirs_id_seq OWNER TO supabase_admin;

--
-- Name: loisirs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.loisirs_id_seq OWNED BY public.loisirs.id;


--
-- Name: loyalty_cards; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.loyalty_cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    card_number character varying(20) NOT NULL,
    tier character varying(20) DEFAULT 'discovery'::character varying NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    total_savings numeric(10,2) DEFAULT 0,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.loyalty_cards OWNER TO supabase_admin;

--
-- Name: newsletter_subscriptions; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.newsletter_subscriptions (
    id bigint NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.newsletter_subscriptions OWNER TO supabase_admin;

--
-- Name: TABLE newsletter_subscriptions; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON TABLE public.newsletter_subscriptions IS 'Stores email addresses for newsletter subscriptions';


--
-- Name: newsletter_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.newsletter_subscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.newsletter_subscriptions_id_seq OWNER TO supabase_admin;

--
-- Name: newsletter_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.newsletter_subscriptions_id_seq OWNED BY public.newsletter_subscriptions.id;


--
-- Name: nightlife_events; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.nightlife_events (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    venue text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    date text NOT NULL,
    "time" text NOT NULL,
    price numeric NOT NULL,
    offer text NOT NULL,
    rating numeric NOT NULL,
    features jsonb DEFAULT '[]'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    gallery_images jsonb DEFAULT '[]'::jsonb,
    partner_id integer
);


ALTER TABLE public.nightlife_events OWNER TO supabase_admin;

--
-- Name: nightlife_events_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.nightlife_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nightlife_events_id_seq OWNER TO supabase_admin;

--
-- Name: nightlife_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.nightlife_events_id_seq OWNED BY public.nightlife_events.id;


--
-- Name: offers; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.offers (
    id integer NOT NULL,
    partner_id integer,
    category_id integer,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    discount_type character varying(20) DEFAULT 'special'::character varying NOT NULL,
    discount_value numeric(10,2),
    terms text,
    image_url text,
    valid_from timestamp with time zone DEFAULT now() NOT NULL,
    valid_until timestamp with time zone DEFAULT (now() + '6 mons'::interval) NOT NULL,
    max_uses_per_user integer,
    max_uses_total integer,
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    sort_order integer DEFAULT 0
);


ALTER TABLE public.offers OWNER TO supabase_admin;

--
-- Name: offers_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_id_seq OWNER TO supabase_admin;

--
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.id;


--
-- Name: partners; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.partners (
    id integer NOT NULL,
    business_name text NOT NULL,
    business_type text NOT NULL,
    description text,
    address text,
    phone text,
    email text,
    contact_name text,
    website text,
    type text,
    image text,
    location text,
    rating numeric,
    offer text,
    icon_name text,
    gallery_images jsonb DEFAULT '[]'::jsonb,
    status text DEFAULT 'en_attente'::text NOT NULL,
    weight integer DEFAULT 0,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT partners_status_check CHECK ((status = ANY (ARRAY['en_attente'::text, 'approuve'::text, 'rejete'::text]))),
    CONSTRAINT partners_weight_range CHECK (((weight >= 0) AND (weight <= 100)))
);


ALTER TABLE public.partners OWNER TO supabase_admin;

--
-- Name: partners_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.partners_id_seq OWNER TO supabase_admin;

--
-- Name: partners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.partners_id_seq OWNED BY public.partners.id;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    role text DEFAULT 'client'::text NOT NULL,
    admin_type public.admin_type DEFAULT 'partner_admin'::public.admin_type,
    company_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    phone text,
    CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'partner'::text, 'client'::text])))
);


ALTER TABLE public.profiles OWNER TO supabase_admin;

--
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    badge text,
    cta_text text NOT NULL,
    cta_url text NOT NULL,
    sort_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.promotions_id_seq OWNER TO postgres;

--
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.purchases (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    amount numeric(10,2) NOT NULL,
    currency text DEFAULT 'eur'::text NOT NULL,
    status text NOT NULL,
    purchase_date timestamp with time zone DEFAULT now(),
    stripe_invoice_id text,
    stripe_payment_intent_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT purchases_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'completed'::text, 'failed'::text, 'refunded'::text])))
);


ALTER TABLE public.purchases OWNER TO supabase_admin;

--
-- Name: TABLE purchases; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON TABLE public.purchases IS 'Purchase and payment records for Club Créole';


--
-- Name: redemptions; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.redemptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    voucher_id uuid NOT NULL,
    user_id uuid NOT NULL,
    partner_id integer NOT NULL,
    offer_id integer NOT NULL,
    discount_applied numeric(10,2) NOT NULL,
    redeemed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.redemptions OWNER TO supabase_admin;

--
-- Name: restaurant_reservations; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.restaurant_reservations (
    id integer NOT NULL,
    restaurant_id integer,
    reservation_date date NOT NULL,
    reservation_time text NOT NULL,
    guests integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    notes text,
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.restaurant_reservations OWNER TO supabase_admin;

--
-- Name: restaurant_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.restaurant_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurant_reservations_id_seq OWNER TO supabase_admin;

--
-- Name: restaurant_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.restaurant_reservations_id_seq OWNED BY public.restaurant_reservations.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    image text NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    rating numeric(2,1) NOT NULL,
    offer text NOT NULL,
    icon text NOT NULL,
    gallery_images jsonb DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    poids integer DEFAULT 0 NOT NULL,
    menus jsonb DEFAULT '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]'::jsonb,
    opening_hours jsonb DEFAULT '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}'::jsonb,
    partner_id integer,
    is_partner boolean DEFAULT false NOT NULL
);


ALTER TABLE public.restaurants OWNER TO supabase_admin;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO supabase_admin;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: saved_offers; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.saved_offers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    offer_id integer NOT NULL,
    saved_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.saved_offers OWNER TO supabase_admin;

--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.subscribers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    subscribed boolean DEFAULT true,
    subscription_tier text DEFAULT 'free'::text,
    subscription_end timestamp with time zone,
    subscription_status text DEFAULT 'active'::text,
    cancel_at_period_end boolean DEFAULT false,
    last_invoice_amount numeric(10,2),
    last_invoice_date timestamp with time zone,
    trial_end timestamp with time zone,
    payment_method text,
    stripe_subscription_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT subscribers_subscription_status_check CHECK ((subscription_status = ANY (ARRAY['active'::text, 'cancelled'::text, 'expired'::text, 'trial'::text]))),
    CONSTRAINT subscribers_subscription_tier_check CHECK ((subscription_tier = ANY (ARRAY['free'::text, 'basic'::text, 'premium'::text])))
);


ALTER TABLE public.subscribers OWNER TO supabase_admin;

--
-- Name: TABLE subscribers; Type: COMMENT; Schema: public; Owner: supabase_admin
--

COMMENT ON TABLE public.subscribers IS 'Subscription information for Club Créole users';


--
-- Name: subscription_plans; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.subscription_plans (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    price_cents integer DEFAULT 0 NOT NULL,
    duration_days integer NOT NULL,
    features jsonb,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.subscription_plans OWNER TO supabase_admin;

--
-- Name: subscription_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.subscription_plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscription_plans_id_seq OWNER TO supabase_admin;

--
-- Name: subscription_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.subscription_plans_id_seq OWNED BY public.subscription_plans.id;


--
-- Name: travel_offers; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.travel_offers (
    id integer NOT NULL,
    partner_id integer,
    title text NOT NULL,
    description text NOT NULL,
    destination text NOT NULL,
    duration_days integer NOT NULL,
    price numeric(10,2) NOT NULL,
    departure_location text NOT NULL,
    departure_date date,
    return_date date,
    image text,
    gallery_images jsonb DEFAULT '[]'::jsonb,
    inclusions jsonb DEFAULT '[]'::jsonb,
    exclusions jsonb DEFAULT '[]'::jsonb,
    max_participants integer DEFAULT 20,
    current_participants integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.travel_offers OWNER TO supabase_admin;

--
-- Name: travel_offers_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.travel_offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.travel_offers_id_seq OWNER TO supabase_admin;

--
-- Name: travel_offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.travel_offers_id_seq OWNED BY public.travel_offers.id;


--
-- Name: travel_reservations; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.travel_reservations (
    id integer NOT NULL,
    travel_offer_id integer,
    user_id uuid,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    number_of_travelers integer DEFAULT 1,
    special_requests text,
    status text DEFAULT 'pending'::text,
    total_price numeric(10,2),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.travel_reservations OWNER TO supabase_admin;

--
-- Name: travel_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: supabase_admin
--

CREATE SEQUENCE public.travel_reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.travel_reservations_id_seq OWNER TO supabase_admin;

--
-- Name: travel_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: supabase_admin
--

ALTER SEQUENCE public.travel_reservations_id_seq OWNED BY public.travel_reservations.id;


--
-- Name: user_subscriptions; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.user_subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    plan_id integer NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    cancelled_at timestamp with time zone,
    payment_provider character varying(50) DEFAULT 'promo'::character varying NOT NULL,
    payment_reference text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_subscriptions OWNER TO supabase_admin;

--
-- Name: vouchers; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.vouchers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    offer_id integer NOT NULL,
    code character varying(20) NOT NULL,
    qr_data text NOT NULL,
    status character varying(20) DEFAULT 'generated'::character varying NOT NULL,
    generated_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL,
    used_at timestamp with time zone,
    used_by_partner_id integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.vouchers OWNER TO supabase_admin;

--
-- Name: voyance_consultations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.voyance_consultations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    medium_id integer NOT NULL,
    client_name text NOT NULL,
    client_email text NOT NULL,
    client_phone text NOT NULL,
    preferred_date date NOT NULL,
    preferred_time text NOT NULL,
    consultation_type text DEFAULT 'présentiel'::text NOT NULL,
    message text,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT voyance_consultations_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'cancelled'::text, 'completed'::text])))
);


ALTER TABLE public.voyance_consultations OWNER TO postgres;

--
-- Name: voyance_mediums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.voyance_mediums (
    id integer NOT NULL,
    name text NOT NULL,
    specialties text[] DEFAULT '{}'::text[] NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    experience_years integer DEFAULT 0 NOT NULL,
    rating numeric(2,1) DEFAULT 0.0 NOT NULL,
    price_per_session numeric(10,2) NOT NULL,
    availability_schedule jsonb DEFAULT '{}'::jsonb NOT NULL,
    contact_phone text,
    contact_email text,
    contact_whatsapp text,
    languages text[] DEFAULT '{français}'::text[] NOT NULL,
    consultation_types text[] DEFAULT '{présentiel}'::text[] NOT NULL,
    location text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT voyance_mediums_rating_check CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric)))
);


ALTER TABLE public.voyance_mediums OWNER TO postgres;

--
-- Name: voyance_mediums_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.voyance_mediums ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.voyance_mediums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: voyance_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.voyance_reviews (
    id integer NOT NULL,
    medium_id integer NOT NULL,
    client_name text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    consultation_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT voyance_reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.voyance_reviews OWNER TO postgres;

--
-- Name: voyance_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.voyance_reviews ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.voyance_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2025_12_20; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_20 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_20 OWNER TO supabase_admin;

--
-- Name: messages_2025_12_21; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_21 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_21 OWNER TO supabase_admin;

--
-- Name: messages_2025_12_22; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_22 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_22 OWNER TO supabase_admin;

--
-- Name: messages_2025_12_23; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_23 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_23 OWNER TO supabase_admin;

--
-- Name: messages_2025_12_24; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_24 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_24 OWNER TO supabase_admin;

--
-- Name: messages_2025_12_25; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_12_25 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_12_25 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


ALTER TABLE supabase_functions.hooks OWNER TO supabase_functions_admin;

--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE supabase_functions.hooks_id_seq OWNER TO supabase_functions_admin;

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE supabase_functions.migrations OWNER TO supabase_functions_admin;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


ALTER TABLE vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: messages_2025_12_20; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_20 FOR VALUES FROM ('2025-12-20 00:00:00') TO ('2025-12-21 00:00:00');


--
-- Name: messages_2025_12_21; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_21 FOR VALUES FROM ('2025-12-21 00:00:00') TO ('2025-12-22 00:00:00');


--
-- Name: messages_2025_12_22; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_22 FOR VALUES FROM ('2025-12-22 00:00:00') TO ('2025-12-23 00:00:00');


--
-- Name: messages_2025_12_23; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_23 FOR VALUES FROM ('2025-12-23 00:00:00') TO ('2025-12-24 00:00:00');


--
-- Name: messages_2025_12_24; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_24 FOR VALUES FROM ('2025-12-24 00:00:00') TO ('2025-12-25 00:00:00');


--
-- Name: messages_2025_12_25; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_12_25 FOR VALUES FROM ('2025-12-25 00:00:00') TO ('2025-12-26 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: accommodation_reservations id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.accommodation_reservations ALTER COLUMN id SET DEFAULT nextval('public.accommodation_reservations_id_seq'::regclass);


--
-- Name: accommodations id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.accommodations ALTER COLUMN id SET DEFAULT nextval('public.accommodations_id_seq'::regclass);


--
-- Name: activity_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_images ALTER COLUMN id SET DEFAULT nextval('public.activity_images_id_seq'::regclass);


--
-- Name: activity_inclusions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_inclusions ALTER COLUMN id SET DEFAULT nextval('public.activity_inclusions_id_seq'::regclass);


--
-- Name: activity_levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_levels ALTER COLUMN id SET DEFAULT nextval('public.activity_levels_id_seq'::regclass);


--
-- Name: activity_reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_reservations ALTER COLUMN id SET DEFAULT nextval('public.activity_reservations_id_seq'::regclass);


--
-- Name: activity_time_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_time_slots ALTER COLUMN id SET DEFAULT nextval('public.activity_time_slots_id_seq'::regclass);


--
-- Name: bons_plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bons_plans ALTER COLUMN id SET DEFAULT nextval('public.bons_plans_id_seq'::regclass);


--
-- Name: car_client_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_client_reviews ALTER COLUMN id SET DEFAULT nextval('public.car_client_reviews_id_seq'::regclass);


--
-- Name: car_models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_models ALTER COLUMN id SET DEFAULT nextval('public.car_models_id_seq'::regclass);


--
-- Name: car_rental_companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_companies ALTER COLUMN id SET DEFAULT nextval('public.car_rental_companies_id_seq'::regclass);


--
-- Name: car_rental_features id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_features ALTER COLUMN id SET DEFAULT nextval('public.car_rental_features_id_seq'::regclass);


--
-- Name: car_rental_reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_reservations ALTER COLUMN id SET DEFAULT nextval('public.car_rental_reservations_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: concerts id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.concerts ALTER COLUMN id SET DEFAULT nextval('public.concerts_id_seq'::regclass);


--
-- Name: leisure_activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leisure_activities ALTER COLUMN id SET DEFAULT nextval('public.leisure_activities_id_seq'::regclass);


--
-- Name: loisirs id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loisirs ALTER COLUMN id SET DEFAULT nextval('public.loisirs_id_seq'::regclass);


--
-- Name: newsletter_subscriptions id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.newsletter_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.newsletter_subscriptions_id_seq'::regclass);


--
-- Name: nightlife_events id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.nightlife_events ALTER COLUMN id SET DEFAULT nextval('public.nightlife_events_id_seq'::regclass);


--
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- Name: partners id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.partners ALTER COLUMN id SET DEFAULT nextval('public.partners_id_seq'::regclass);


--
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- Name: restaurant_reservations id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.restaurant_reservations ALTER COLUMN id SET DEFAULT nextval('public.restaurant_reservations_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: subscription_plans id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.subscription_plans ALTER COLUMN id SET DEFAULT nextval('public.subscription_plans_id_seq'::regclass);


--
-- Name: travel_offers id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.travel_offers ALTER COLUMN id SET DEFAULT nextval('public.travel_offers_id_seq'::regclass);


--
-- Name: travel_reservations id; Type: DEFAULT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.travel_reservations ALTER COLUMN id SET DEFAULT nextval('public.travel_reservations_id_seq'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

-- Converted from COPY _realtime.extensions
INSERT INTO _realtime.extensions (id, type, settings, tenant_external_id, inserted_at, updated_at) VALUES ('b665232c-ff91-4ccc-9fd3-4add85c66d43', 'postgres_cdc_rls', '{"region": "us-east-1", "db_host": "UQODY0+dwiSQvuHHKwAFHg==", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "XfcFyMLB52Il8avsNMjY52AWfR2MXGaoZ+Pnxz4LN3JPNrrhma6I8nd28t/mto4/", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}', 'realtime-dev', '2025-12-23 23:31:41', '2025-12-23 23:31:41');



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

-- Converted from COPY _realtime.schema_migrations
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20210706140551', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220329161857', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220410212326', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220506102948', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220527210857', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220815211129', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220815215024', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20220818141501', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20221018173709', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20221102172703', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20221223010058', '2025-12-11 12:26:16');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20230110180046', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20230810220907', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20230810220924', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20231024094642', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20240306114423', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20240418082835', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20240625211759', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20240704172020', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20240902173232', '2025-12-11 12:26:17');
INSERT INTO _realtime.schema_migrations (version, inserted_at) VALUES ('20241106103258', '2025-12-11 12:26:17');



--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

-- Converted from COPY _realtime.tenants
INSERT INTO _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha, private_only) VALUES ('4def5ebb-084d-4f5b-9c85-b741fcad4012', 'realtime-dev', 'realtime-dev', '/iWVnOoP4+iU2w9d1C+LNQOE7LhcZ/9/NlP2P3OvqXVPNrrhma6I8nd28t/mto4/', '200', '2025-12-23 23:31:41', '2025-12-23 23:31:41', '100', 'postgres_cdc_rls', '100000', '100', '100', 'f', NULL, 'f', 'f');



--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.audit_log_entries
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e10b59f2-c032-4f03-a174-f94317f4582b', '{"action":"user_confirmation_requested","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-11 21:24:07.797895+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e7f1d4f8-1a49-4bf5-baca-ae1f274dddc9', '{"action":"login","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-12 12:02:55.28822+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c4ce4d06-7682-423a-b54c-93864ec7c10f', '{"action":"login","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-12 14:10:44.734626+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ea6afa5d-cad6-4a33-bc67-ffd34d67cf6d', '{"action":"token_refreshed","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 14:13:42.701785+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5b5c9bea-bfcd-4550-9c05-07364d670828', '{"action":"token_revoked","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 14:13:42.705021+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4c3c284c-e87c-4ecc-bc62-acc6625cfd9f', '{"action":"token_refreshed","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 18:35:43.397519+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f6081589-4732-4691-b01d-1b5bfca584d0', '{"action":"token_revoked","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 18:35:43.402296+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11f05254-44ed-4536-baf5-628116d69eef', '{"action":"token_refreshed","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 21:05:07.837731+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3c48545a-b88a-47e6-96d6-ee836663b69f', '{"action":"token_revoked","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-12 21:05:07.84625+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f84d391f-7ea5-4800-8ba5-3878f98c84ff', '{"action":"token_refreshed","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-15 11:37:25.856582+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b97006c3-b3dc-4063-a65d-2a3c55b45cb9', '{"action":"token_revoked","actor_id":"0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b","actor_username":"admin@clubcreole.com","actor_via_sso":false,"log_type":"token"}', '2025-12-15 11:37:25.864624+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cd4c029e-9454-4040-ad90-85162722a9ed', '{"action":"user_confirmation_requested","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-19 02:32:01.138488+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2099e57b-4c6e-43d7-935e-e4880b474e25', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"test@clubcreole.fr","user_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","user_phone":""}}', '2025-12-19 02:42:34.813585+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e71f4bdb-1aec-44bd-aae7-cc5e5fdde74e', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-19 02:42:48.148594+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8d51f5d7-da16-4702-87b6-1ec183f07320', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-19 02:56:11.114841+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c0ff2f0b-e0f7-4c5b-907a-a71209a9ca36', '{"action":"user_confirmation_requested","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-19 21:08:21.86361+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9807226f-050e-4d37-a03e-50ce7b297bd8', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"test@clubcreole.fr","user_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","user_phone":""}}', '2025-12-19 21:14:51.810058+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2fc46407-eacd-4cd1-abbe-2fb5585b4c15', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-19 21:15:16.544539+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4ab5adb3-b6c5-446f-b2d5-277835dd2c48', '{"action":"user_confirmation_requested","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-19 21:49:04.533721+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2645c47b-2ce2-40fa-bd06-7afe6ab5dce2', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-19 22:14:50.910586+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '08c81ec5-4c89-40ec-aedb-8a0466823df9', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-19 22:14:50.911444+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0d0cd122-6cdc-4e2c-b966-abebe0aa85ef', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-19 23:14:21.1573+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd0998f76-043e-4e93-ba0a-0a04b6c2a22b', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-19 23:14:21.165219+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce7b7d86-bc15-423c-867e-9fbd22034872', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 00:13:55.610262+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fc00e033-a1b9-4aab-8176-0af77cfd19b7', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 00:13:55.620715+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '845d1aa3-42a4-4345-a008-b65b7a88786a', '{"action":"user_confirmation_requested","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-20 12:54:28.555713+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8896d570-5147-4919-9dba-d819c36708b0', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 13:10:48.440632+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5a2dc198-5318-4ce3-9333-ff0260d66342', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 14:01:11.355881+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '38452405-046e-47d5-87ab-423b98d79ae4', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 14:01:19.287164+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '786c1b58-c02d-4317-a364-7210ae7dde1d', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 14:08:19.160404+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbf11e98-e58e-4df2-8f0b-4f5b68a1e1cd', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 14:13:23.782718+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c0599f83-5762-41df-9a8f-6ff6b5e45fe6', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 14:13:23.783468+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6e9eaf2d-c0dc-4d8a-be2d-89889dd4f612', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 15:09:21.563538+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '47ff03c1-9514-49ce-925e-86df9157a567', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 15:09:21.571068+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3e3da025-6c9d-4269-bd72-a53482dd124e', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 15:14:36.116184+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5ecdf5f1-8d16-493a-8931-835e55abf1b0', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 15:14:36.116919+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd024297d-7568-44b8-b217-2a2e8d601a00', '{"action":"logout","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account"}', '2025-12-20 15:17:48.772073+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '84c51df2-97e1-4a44-bfc6-cb629b3e5f2a', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 15:22:41.63338+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '42f81400-4ac2-4c6b-a6f4-564d1a912814', '{"action":"logout","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account"}', '2025-12-20 15:23:03.032934+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'daf9b40c-e4b2-47d0-9b09-b0564d7f0e8b', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 16:13:49.024472+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a88c040c-49fd-40d3-b650-b02d71cf80a7', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 16:13:49.025512+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '827a73fc-8cc7-4a69-9284-f30465ab1550', '{"action":"logout","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account"}', '2025-12-20 16:18:01.622718+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '47c08dd9-00bd-4782-b7eb-27da84e74dcc', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 18:02:12.995653+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9e7aaaf1-fe9b-46f0-84bc-0a4030dc1391', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 18:02:13.004486+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '81da16ea-60c1-4d3c-b606-bbb31ea6acc1', '{"action":"user_confirmation_requested","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-20 18:30:22.045627+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '47222695-6a4e-42b9-9d2f-3de680e81b30', '{"action":"login","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 18:33:12.69843+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3fe03913-69e6-499b-a811-d17cd3f96501', '{"action":"user_confirmation_requested","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-20 21:08:00.382393+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd57a8923-b961-4960-aa59-3a4e5afa3a70', '{"action":"user_confirmation_requested","actor_id":"9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2","actor_username":"test-1766264950616@test-clubcreole.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-20 21:09:12.051701+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '412b29fa-2230-4d8d-97f5-47e905ff0871', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 21:18:33.086873+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7da80b9c-57ff-4466-87ee-0044c443acce', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 21:18:33.087608+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cf4ddf86-9a9e-4580-bd26-91c13095427b', '{"action":"user_confirmation_requested","actor_id":"f4a92d33-8b14-433e-bb25-3522f5501781","actor_username":"test-1766269085503@test-clubcreole.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-12-20 22:18:07.055504+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f742d005-c7e0-4772-aef3-483eede0fae1', '{"action":"user_signedup","actor_id":"91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183","actor_username":"test-1766270288945@test-clubcreole.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-20 22:38:09.550503+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '527f76f0-8685-4b49-bc22-abb5d83b1ed4', '{"action":"login","actor_id":"91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183","actor_username":"test-1766270288945@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 22:38:09.554144+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '125fc5b3-296b-4e71-abd4-9376cb545c60', '{"action":"login","actor_id":"91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183","actor_username":"test-1766270288945@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 22:38:11.973832+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8662100b-23d2-4cd6-8880-1703cebba346', '{"action":"logout","actor_id":"91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183","actor_username":"test-1766270288945@test-clubcreole.com","actor_via_sso":false,"log_type":"account"}', '2025-12-20 22:38:12.424812+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ab8e8608-7560-4f2b-be2f-31612b179aaf', '{"action":"user_signedup","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-20 22:39:26.445237+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fff48d89-83ec-423b-813c-13471fedee51', '{"action":"login","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 22:39:26.448036+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd6626b73-a561-48ce-84fb-40c7dec1659f', '{"action":"login","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 22:40:25.543706+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8a123d6f-228f-4d8f-8ec1-fd18f1068fcc', '{"action":"user_signedup","actor_id":"ec3a66dc-e1ea-49c1-9b43-224c80eabf25","actor_username":"louis@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-20 22:45:48.251016+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3087e72f-5061-4c8d-80c0-6a1f81bd96b6', '{"action":"login","actor_id":"ec3a66dc-e1ea-49c1-9b43-224c80eabf25","actor_username":"louis@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 22:45:48.252906+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9d34966d-b9aa-4afa-bb11-4ac580bcaa98', '{"action":"token_refreshed","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 23:27:04.638406+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'f60b0416-e211-4ed2-9344-8bcfe5a7aaeb', '{"action":"token_revoked","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"token"}', '2025-12-20 23:27:04.64048+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '99170256-5b6a-4063-961c-0e310eb72245', '{"action":"logout","actor_id":"c220ed82-db9b-4dec-ad56-0c93fad6eae7","actor_username":"test@clubcreole.fr","actor_via_sso":false,"log_type":"account"}', '2025-12-20 23:27:18.501991+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '475e4c6a-bc84-429d-8942-8826642a5625', '{"action":"user_signedup","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-20 23:28:59.212699+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0faacefc-56e2-47bd-849b-2293e66cbdc4', '{"action":"login","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-20 23:28:59.223698+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cb0d8725-a222-464e-849e-89dc0e78a63a', '{"action":"token_refreshed","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-20 23:52:23.487768+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e981c009-d392-4e46-a54b-6ad9159ddbf1', '{"action":"token_revoked","actor_id":"aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7","actor_username":"laurent-luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-20 23:52:23.489158+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cefa0d90-3e19-497e-b729-3ef85f477034', '{"action":"token_refreshed","actor_id":"ec3a66dc-e1ea-49c1-9b43-224c80eabf25","actor_username":"louis@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 00:32:44.135318+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e5b21d0c-c2b7-4e76-aa4c-9465aa9a1f99', '{"action":"token_revoked","actor_id":"ec3a66dc-e1ea-49c1-9b43-224c80eabf25","actor_username":"louis@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 00:32:44.13611+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7bc33481-330a-433a-8c2e-ef56d05c4add', '{"action":"logout","actor_id":"ec3a66dc-e1ea-49c1-9b43-224c80eabf25","actor_username":"louis@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-12-21 00:33:10.959161+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9be945dd-d9c1-42d4-b7a0-f83a056f01c2', '{"action":"user_signedup","actor_id":"d8398246-ddc7-4b83-bd91-56224eeaa940","actor_username":"test_1766277304635@test-clubcreole.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 00:35:06.35688+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1890cd80-1487-4bc4-81f7-e0da4bdd0948', '{"action":"login","actor_id":"d8398246-ddc7-4b83-bd91-56224eeaa940","actor_username":"test_1766277304635@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 00:35:06.360423+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '56e2bd0b-3c67-46da-ae02-2f4ffbe0fb8a', '{"action":"login","actor_id":"d8398246-ddc7-4b83-bd91-56224eeaa940","actor_username":"test_1766277304635@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 00:35:22.103651+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2521b638-cb3b-4820-a86b-860e46f5bc37', '{"action":"user_signedup","actor_id":"7441f5ff-63a2-44ad-bd0a-a659666289c4","actor_username":"test_app_1766278026044@test-clubcreole.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 00:47:07.650789+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '98487daf-3116-4e79-9e19-c1e32ebbd487', '{"action":"login","actor_id":"7441f5ff-63a2-44ad-bd0a-a659666289c4","actor_username":"test_app_1766278026044@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 00:47:07.653155+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3dca064d-f726-4b7e-b260-e2605d41e9ab', '{"action":"login","actor_id":"7441f5ff-63a2-44ad-bd0a-a659666289c4","actor_username":"test_app_1766278026044@test-clubcreole.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 00:47:07.83734+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '70f71e44-042c-4dc3-9ebf-935878ae3721', '{"action":"user_signedup","actor_id":"261a9d06-0bc3-4c8a-abea-5d67295f7210","actor_username":"laurent@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 03:08:52.197495+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ced0fbd5-19aa-4046-bf27-e82dd83053fe', '{"action":"login","actor_id":"261a9d06-0bc3-4c8a-abea-5d67295f7210","actor_username":"laurent@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 03:08:52.203568+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4da63607-cdb5-4a8c-964a-230b006b27f3', '{"action":"token_refreshed","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 11:04:19.073746+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ef847b04-1ebd-4593-ae64-e6e96a2b6a48', '{"action":"token_revoked","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 11:04:19.078189+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'adcb150a-5043-40d4-bf79-ae96e43c7666', '{"action":"user_signedup","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 11:08:53.192924+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '66dd7bb3-cfb8-4c67-a965-e9696b560256', '{"action":"login","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 11:08:53.199042+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '67f3cef2-c94e-4ccb-aee8-7c9f3c786372', '{"action":"login","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 11:24:29.156668+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ac9459c7-9650-4e1d-9ffc-80400db83ccc', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 12:23:33.405121+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '496a4227-0114-4a80-ae3e-ea4fd8fd3166', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 12:23:33.405914+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce2936f9-4e51-405e-8165-bfbf50db831a', '{"action":"token_refreshed","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 13:06:27.105208+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b9a7a93a-4c0c-4330-9f63-0b4b458f8db4', '{"action":"token_revoked","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 13:06:27.106436+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '535c9157-1118-4b17-ab22-2d560f79e4ff', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 13:22:23.563749+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '10cc1034-3c49-4700-868f-3e9ff1dff64c', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 13:22:23.564464+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ce89315e-f9bc-488e-8689-321e88aad50c', '{"action":"token_refreshed","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 14:06:05.41802+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '42f9ef8a-49cd-4463-af53-f4581a3f38aa', '{"action":"token_revoked","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 14:06:05.418743+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '63ba705d-6481-4442-ab95-5b7851985a68', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 14:21:05.789783+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b595469e-a81c-45ca-97b7-c34619660238', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 14:21:05.790431+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '718ecb8f-589d-49ba-aab3-a9d0377ffc52', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 16:17:10.215674+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '27ccea3a-d1aa-4f61-a1b0-36512b34b051', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 16:17:10.222579+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a3563a02-b034-46a2-ad75-e582ecb6fa58', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 17:56:02.508359+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0888c8cb-c9f8-43d5-9e53-9bf88d3c210e', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 17:56:02.509597+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4ba02335-e8d8-4539-9ca8-c981282a60b0', '{"action":"token_refreshed","actor_id":"261a9d06-0bc3-4c8a-abea-5d67295f7210","actor_username":"laurent@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 18:01:51.03002+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '77766a9d-3f69-4fd8-adc7-4a9cd2b7410f', '{"action":"token_revoked","actor_id":"261a9d06-0bc3-4c8a-abea-5d67295f7210","actor_username":"laurent@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 18:01:51.030931+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8e1d59ce-11e7-4bf8-8ebf-5647e08d3593', '{"action":"user_signedup","actor_id":"4af1763d-6cd0-4f31-b769-f5e4fa1c9e56","actor_username":"meryl@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 18:06:16.019384+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1b21c711-1d37-412a-8d89-d6a780791d13', '{"action":"login","actor_id":"4af1763d-6cd0-4f31-b769-f5e4fa1c9e56","actor_username":"meryl@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 18:06:16.023798+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd7a5830e-6f73-4f0e-b72b-f89d215168e7', '{"action":"token_refreshed","actor_id":"4af1763d-6cd0-4f31-b769-f5e4fa1c9e56","actor_username":"meryl@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 19:04:22.80475+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc66d71f-68de-4fa9-8cd9-506f033682d1', '{"action":"token_revoked","actor_id":"4af1763d-6cd0-4f31-b769-f5e4fa1c9e56","actor_username":"meryl@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 19:04:22.809825+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e628820e-7a7f-4b93-b4ca-ad7a909a3ae0', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 19:08:08.582042+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd7001cfe-c745-4f2c-8e21-807f28bd68a0', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 19:08:08.582762+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '07b82312-4289-4dee-b056-7d5157faef15', '{"action":"user_signedup","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-12-21 19:37:40.552806+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'ff852140-a734-4ad5-acc0-cbf68289b90d', '{"action":"login","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 19:37:40.563623+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0a57bf30-d64d-4d96-9f30-f280e5698c2e', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 21:20:21.826637+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '75c890d3-96bd-4d51-8e72-9f458ca0bcc6', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 21:20:21.833376+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '5a39c546-6fe8-44e6-9d0a-f2276684687e', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 21:20:23.714264+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fbcd54da-0753-412a-9c14-d032cc3ebbd2', '{"action":"token_refreshed","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 21:54:34.00054+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd7b60046-2086-4976-b46f-de6e91d284cd', '{"action":"token_revoked","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-21 21:54:34.001518+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1b42e39a-6199-4237-9dcb-089dcdc44a31', '{"action":"login","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-21 23:39:25.115085+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9bdfbb0c-5c41-4aca-b712-53e322b224f2', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 00:34:58.451422+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '28917acc-ce11-4a4a-9c0c-39dd93bae1f4', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 00:34:58.452463+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '11d20a8b-642b-44d4-9912-4c2068b25644', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 00:38:49.924831+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd6ef0715-8b45-4f7d-a118-bdddf7e7ebb4', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 00:38:49.92563+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '3c473983-a9e7-4b95-ac33-10c2cbd45424', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 01:38:13.284361+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '90168094-99ea-4f9e-946c-a29c024cd9db', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 01:38:13.285693+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '25e4ac70-d481-488a-bbd0-c79ea24e11ca', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 10:18:15.595193+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '6d8e7711-5715-4d81-8ee5-bc27c173a759', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 10:18:15.614532+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '74035144-ba10-4fa0-9b76-a6001e607e06', '{"action":"login","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-22 12:21:41.936502+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '204480c7-a543-4a49-82d5-c90a3e4c0f26', '{"action":"token_refreshed","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 16:21:54.992676+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cc8488e3-15e2-4377-91cb-2f2a6d6b707e', '{"action":"token_revoked","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 16:21:55.003566+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b8f8e583-9a15-495a-98be-5e3a09822011', '{"action":"login","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-22 16:29:26.368412+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd7a0869b-5b32-4aed-b1db-43b07bc44ba0', '{"action":"token_refreshed","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 17:21:27.369188+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '75724219-5f0b-45b1-9deb-1f0b5a3ef531', '{"action":"token_revoked","actor_id":"d8db1516-aac1-4a13-879d-3a95d35c6b72","actor_username":"laurent.luce@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 17:21:27.370185+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '2e84be90-b8e6-4f0f-8401-79c191be36bc', '{"action":"login","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-22 18:16:22.105901+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '8b1c6649-f6a0-448c-8e6e-39c21ab74d90', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 19:24:21.929984+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '9c9ab02f-64ab-4b83-83bb-372d360642a5', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-22 19:24:21.939463+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'd735defd-2f0f-4856-917b-2a798e27ab1a', '{"action":"login","actor_id":"edf67a0c-eed0-4810-82a9-2a084ba75547","actor_username":"caty@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-22 19:43:03.738407+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '15b19809-138a-4ce9-918d-7f08f475621b', '{"action":"login","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-12-23 00:09:12.701629+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '26013f86-1cf4-41c1-93ef-350da145b93b', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 01:09:27.458197+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0d940317-0253-43e4-bab4-7ab0ed176798', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 01:09:27.460773+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '220385ce-9545-4921-8ba8-96585ebf10cf', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 02:09:37.609777+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '00b3a94f-7652-4455-9f7e-f916ab03e0d5', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 02:09:37.61976+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'eecaba70-79e5-4185-af86-6a44369d9666', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 09:25:55.556649+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '74223ed4-e454-44f3-8700-4dc7aeb38990', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 09:25:55.562984+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'a6610c26-a207-4d0d-9407-e8ace0ed0a75', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 10:25:36.345974+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '46a9318c-d59d-4d56-8cd8-944adf175810', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 10:25:36.348008+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e4acfe01-d822-4432-88bb-c3a81be8f0cf', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 11:25:15.77636+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b670c7c9-8614-4436-a832-b2992d4197e0', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 11:25:15.777361+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '13d3c7c0-a1ab-46bd-bef1-feebb72a02a4', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 12:24:56.135481+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '381e023b-fa82-405f-a574-0222acac5be1', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 12:24:56.138662+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '0235c620-cab5-4371-85a3-436cdc0d9491', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 13:24:36.273496+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '59fbefba-f802-4a2c-a57d-61dae1d2276c', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 13:24:36.281994+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b6997897-92cb-4a54-b3e2-6901a838b94b', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 14:24:16.927708+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'c39e6b00-a880-4817-9d3f-8989b53b19c9', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 14:24:16.930335+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'db86794e-3150-4620-87fb-dfbe9f89213a', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 15:23:56.984296+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '1011d9e6-fd66-4de7-aa20-2ddc5138d3c6', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 15:23:56.988449+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'cb9fa238-59cc-4baa-802c-80558973b955', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 16:23:36.842367+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '4fc42bde-94fd-4ad4-9724-8e3c90e93157', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 16:23:36.846399+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '645d45ea-6803-4778-9758-66226e53b893', '{"action":"token_refreshed","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 17:23:17.05808+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'fb443c51-0096-468d-883a-3be102e8d619', '{"action":"token_revoked","actor_id":"f0c9b51d-9092-446d-943e-7bdd44153438","actor_username":"cmoinster@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-12-23 17:23:17.059575+00', '');



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.flow_state
INSERT INTO auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) VALUES ('92829948-3d63-40ce-9b89-2558be4e6023', 'f0c9b51d-9092-446d-943e-7bdd44153438', '20b1f0c1-ac8e-4409-8942-d6e6e4e5e1ad', 's256', 'uk_nSfFm3NB716wki6laCu7D4Ed0djzeoCA9iHN_VKU', 'email', '', '', '2025-12-19 21:08:21.866669+00', '2025-12-19 21:08:21.866669+00', 'email/signup', NULL);
INSERT INTO auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) VALUES ('7a0ff3d9-e0f6-4095-a52d-e7e4c85bd8b3', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'c790873a-77c2-41de-a40c-7b6b178b3e9f', 's256', '2szk4ccgIZP3eoWgTfQ1Iw4s3x0cqlvS507JrIqO9OE', 'email', '', '', '2025-12-19 21:49:04.534295+00', '2025-12-19 21:49:04.534295+00', 'email/signup', NULL);
INSERT INTO auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) VALUES ('b08eb5f5-a11c-415e-8b0d-1e7725753715', 'f0c9b51d-9092-446d-943e-7bdd44153438', '093bd594-28fb-4356-9ea9-a5c7848b99b2', 's256', 'IlvCFhCv8Uet8d2bViIBMv-_UYqC9uQ1_D7Cmkka6Yg', 'email', '', '', '2025-12-20 12:54:28.561519+00', '2025-12-20 12:54:28.561519+00', 'email/signup', NULL);



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.identities
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', '{"sub": "aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7", "email": "laurent-luce@hotmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-11 21:24:07.791753+00', '2025-12-11 21:24:07.791782+00', '2025-12-11 21:24:07.791782+00', 'bf8e1d3a-a5ee-4ef8-ad66-c9381a3819d4');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', '{"sub": "0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b", "email": "admin@clubcreole.com"}', 'email', '2025-12-12 09:29:28.164464+00', '2025-12-12 09:29:28.164464+00', '2025-12-12 09:29:28.164464+00', 'c7cffcee-582c-4236-ae19-1894f5cf310b');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '{"sub": "c220ed82-db9b-4dec-ad56-0c93fad6eae7", "email": "test@clubcreole.fr", "last_name": "User", "first_name": "Test", "email_verified": false, "phone_verified": false}', 'email', '2025-12-19 02:32:01.12401+00', '2025-12-19 02:32:01.124058+00', '2025-12-19 02:32:01.124058+00', '62c9219d-f263-4a20-aaaf-e101ba3213f9');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('f0c9b51d-9092-446d-943e-7bdd44153438', 'f0c9b51d-9092-446d-943e-7bdd44153438', '{"sub": "f0c9b51d-9092-446d-943e-7bdd44153438", "email": "cmoinster@gmail.com", "last_name": "LUCE", "first_name": "Laurent", "email_verified": false, "phone_verified": false}', 'email', '2025-12-19 21:08:21.855145+00', '2025-12-19 21:08:21.855424+00', '2025-12-19 21:08:21.855424+00', 'd5d95a5d-cf34-4f8c-a877-32a103ccba73');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2', '9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2', '{"sub": "9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2", "email": "test-1766264950616@test-clubcreole.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-20 21:09:12.045217+00', '2025-12-20 21:09:12.045477+00', '2025-12-20 21:09:12.045477+00', 'f3542ded-49bb-45a9-92de-255343578aaf');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('f4a92d33-8b14-433e-bb25-3522f5501781', 'f4a92d33-8b14-433e-bb25-3522f5501781', '{"sub": "f4a92d33-8b14-433e-bb25-3522f5501781", "email": "test-1766269085503@test-clubcreole.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-20 22:18:07.053664+00', '2025-12-20 22:18:07.053697+00', '2025-12-20 22:18:07.053697+00', 'fe111ce3-59ed-4c27-b9e9-7ba42d72fa45');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183', '91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183', '{"sub": "91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183", "email": "test-1766270288945@test-clubcreole.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-20 22:38:09.547894+00', '2025-12-20 22:38:09.547948+00', '2025-12-20 22:38:09.547948+00', 'c69d113f-7a34-4a9a-b58e-e42fb233717a');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('ec3a66dc-e1ea-49c1-9b43-224c80eabf25', 'ec3a66dc-e1ea-49c1-9b43-224c80eabf25', '{"sub": "ec3a66dc-e1ea-49c1-9b43-224c80eabf25", "email": "louis@hotmail.com", "last_name": "LUCE", "first_name": "Louis", "email_verified": false, "phone_verified": false}', 'email', '2025-12-20 22:45:48.249468+00', '2025-12-20 22:45:48.249494+00', '2025-12-20 22:45:48.249494+00', '72ec30a3-44c5-4372-b46b-fb7ff9f9ec68');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('d8db1516-aac1-4a13-879d-3a95d35c6b72', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', '{"sub": "d8db1516-aac1-4a13-879d-3a95d35c6b72", "email": "laurent.luce@hotmail.com", "last_name": "Luce", "first_name": "Laurent", "email_verified": false, "phone_verified": false}', 'email', '2025-12-20 23:28:59.206174+00', '2025-12-20 23:28:59.206321+00', '2025-12-20 23:28:59.206321+00', '40114290-ebbd-44dc-8fd4-9706b9d5a73a');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('d8398246-ddc7-4b83-bd91-56224eeaa940', 'd8398246-ddc7-4b83-bd91-56224eeaa940', '{"sub": "d8398246-ddc7-4b83-bd91-56224eeaa940", "email": "test_1766277304635@test-clubcreole.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 00:35:06.353574+00', '2025-12-21 00:35:06.353619+00', '2025-12-21 00:35:06.353619+00', '133b011c-a68c-4443-ad31-d327a5f0d368');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('7441f5ff-63a2-44ad-bd0a-a659666289c4', '7441f5ff-63a2-44ad-bd0a-a659666289c4', '{"sub": "7441f5ff-63a2-44ad-bd0a-a659666289c4", "email": "test_app_1766278026044@test-clubcreole.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 00:47:07.648791+00', '2025-12-21 00:47:07.648859+00', '2025-12-21 00:47:07.648859+00', 'e7c00ca9-a989-4a09-abcd-c960f728a386');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('261a9d06-0bc3-4c8a-abea-5d67295f7210', '261a9d06-0bc3-4c8a-abea-5d67295f7210', '{"sub": "261a9d06-0bc3-4c8a-abea-5d67295f7210", "email": "laurent@hotmail.com", "phone": "+337664653", "last_name": "LUCE", "first_name": "Laurent", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 03:08:52.191852+00', '2025-12-21 03:08:52.191988+00', '2025-12-21 03:08:52.191988+00', '6461b0ee-1c98-45b1-ac3c-3201d0ac7f2c');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('edf67a0c-eed0-4810-82a9-2a084ba75547', 'edf67a0c-eed0-4810-82a9-2a084ba75547', '{"sub": "edf67a0c-eed0-4810-82a9-2a084ba75547", "email": "caty@hotmail.com", "phone": "+337664653", "last_name": "LUCE", "first_name": "Caty", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 11:08:53.185838+00', '2025-12-21 11:08:53.186053+00', '2025-12-21 11:08:53.186053+00', '8634c890-3f57-4765-930f-3b3e1eb3acfd');
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) VALUES ('4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', '4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', '{"sub": "4af1763d-6cd0-4f31-b769-f5e4fa1c9e56", "email": "meryl@hotmail.com", "phone": "+33766334653", "last_name": "LUCE", "first_name": "Meryl", "email_verified": false, "phone_verified": false}', 'email', '2025-12-21 18:06:16.015299+00', '2025-12-21 18:06:16.015349+00', '2025-12-21 18:06:16.015349+00', '12bf840b-16e8-4eb1-94f7-03c32eac0f4a');



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.instances



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.mfa_amr_claims
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('0b072c9b-5da7-4da1-a452-ff492e67aeb3', '2025-12-12 12:02:55.331337+00', '2025-12-12 12:02:55.331337+00', 'password', 'b5074f72-87a2-4025-8e09-a1994d4303e2');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('b2c920cd-8907-4eac-bba3-503afd3336ad', '2025-12-12 14:10:44.7622+00', '2025-12-12 14:10:44.7622+00', 'password', '9028fd1c-e753-4dfb-a65e-123c1a7dc64c');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('e5c6e890-90ca-4f30-a6bd-b80939accf5c', '2025-12-20 14:01:11.360141+00', '2025-12-20 14:01:11.360141+00', 'password', '6e821987-5865-43e7-bce1-24ec539d7d5a');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('c84b8c36-92a0-4a5c-b272-5eeafdc84d94', '2025-12-20 14:01:19.292816+00', '2025-12-20 14:01:19.292816+00', 'password', '55729b35-5032-49b2-b38d-c54d9f756523');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('f024c6db-7789-4def-9a46-281b9176fefc', '2025-12-20 14:08:19.163654+00', '2025-12-20 14:08:19.163654+00', 'password', 'aefc7a8b-74d1-4fc4-914a-4131a8e06e48');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('62e7dca8-fe4d-4591-9804-7ecb17ff3ad6', '2025-12-20 22:39:26.450559+00', '2025-12-20 22:39:26.450559+00', 'password', 'defd9c92-064f-4ecf-9989-c2c1dbf46b8c');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('a8fe4eb9-2914-46c1-bb86-6a77e022d379', '2025-12-20 22:40:25.546512+00', '2025-12-20 22:40:25.546512+00', 'password', '996f4bf6-b98f-4321-9f4f-b6247486fee3');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('dfa62a77-1f37-49c2-a622-b48b4e6459d3', '2025-12-20 23:28:59.228301+00', '2025-12-20 23:28:59.228301+00', 'password', 'b94627e9-5dc3-472e-bdaa-802cfd2bb91b');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('861bc152-0593-409c-bd23-afbd15c94d9d', '2025-12-21 00:35:06.362948+00', '2025-12-21 00:35:06.362948+00', 'password', '1a6c0539-52ef-402e-a95d-a75dc2b5efe0');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('ec7cbb9c-bf2f-40dc-b9c2-472b3c2651e7', '2025-12-21 00:35:22.106507+00', '2025-12-21 00:35:22.106507+00', 'password', 'a869b924-fcc0-4a34-8b50-7284706cf175');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('6958e42a-ac8c-41dd-a400-a838aed1d14a', '2025-12-21 00:47:07.655064+00', '2025-12-21 00:47:07.655064+00', 'password', '2211496d-19a3-42a0-aece-47af54d4bdd5');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('2584471e-548b-4ae4-9482-9a70270dee01', '2025-12-21 00:47:07.839672+00', '2025-12-21 00:47:07.839672+00', 'password', '65e7c9fa-15c7-4556-b149-950250702a29');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('f0ca5f14-cd95-4db7-8103-5e3fb2bf9362', '2025-12-21 03:08:52.220592+00', '2025-12-21 03:08:52.220592+00', 'password', '607d6f6f-7d5f-4bb7-ae54-8aa82d3acd6a');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('9929c979-06cf-48a7-aea3-25837e148037', '2025-12-21 11:08:53.204041+00', '2025-12-21 11:08:53.204041+00', 'password', '9c5ca507-3ede-4f77-83db-87f2f5b6f31c');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('86526d5c-9ae6-46ea-9d69-c31a20486b6f', '2025-12-21 11:24:29.163056+00', '2025-12-21 11:24:29.163056+00', 'password', 'ef4fc170-693c-4985-acdc-8d1b1541d864');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('8c496281-d3c8-4625-b6bd-b001ac23988d', '2025-12-21 18:06:16.027833+00', '2025-12-21 18:06:16.027833+00', 'password', '49bc0c4b-289e-4bfd-a1ec-d9da717e9751');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('8a85e830-cd99-4bb0-b68f-993df9b9ab3a', '2025-12-21 19:37:40.569717+00', '2025-12-21 19:37:40.569717+00', 'password', 'fd6b06ee-d35c-4a99-a824-b5e70a2ca7d1');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('30d8c182-ee2b-4a00-881a-15e49981259e', '2025-12-21 23:39:25.139395+00', '2025-12-21 23:39:25.139395+00', 'password', 'b3e09d91-56a5-4e29-8aec-f567fa2a128b');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('e9c76e55-ba0c-43be-91bd-d4663747f717', '2025-12-22 12:21:41.981477+00', '2025-12-22 12:21:41.981477+00', 'password', '33fdc435-ff88-425d-aec5-9797f6e575eb');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('af6273bf-e415-4ad8-bba6-29e6f1e45b62', '2025-12-22 16:29:26.380545+00', '2025-12-22 16:29:26.380545+00', 'password', '496a7b42-00e2-4047-aa60-ab0b02e5321b');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('e1808069-5ea7-46cd-8dcb-44425301f114', '2025-12-22 18:16:22.117801+00', '2025-12-22 18:16:22.117801+00', 'password', 'f85c75b5-6015-49a1-9987-e86b4e44978f');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('ed23f87c-3813-4ca0-aab1-9e5dd9c6b7d0', '2025-12-22 19:43:03.752811+00', '2025-12-22 19:43:03.752811+00', 'password', '9a4315d7-d797-4a00-9f2f-a514d1c72d23');
INSERT INTO auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) VALUES ('6c15937c-6217-446d-8ae9-593e0d8e59bc', '2025-12-23 00:09:12.734221+00', '2025-12-23 00:09:12.734221+00', 'password', '4185ca8f-3edc-46a4-8ec5-957eeee3683e');



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.mfa_challenges



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.mfa_factors



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.one_time_tokens
INSERT INTO auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('6d933349-457e-42bb-837b-b59890dc073f', '9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2', 'confirmation_token', 'a96c80d08999d87bbbddf879cb8f097484cc690407b5b168a57dfc4e', 'test-1766264950616@test-clubcreole.com', '2025-12-20 21:09:12.053543', '2025-12-20 21:09:12.053543');
INSERT INTO auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) VALUES ('31ea62f6-463f-4bdd-b3aa-5c3cdc8c2733', 'f4a92d33-8b14-433e-bb25-3522f5501781', 'confirmation_token', 'c74b92c0ce448e50bb5c2519b64ad70579e03ea977a959a5a881984a', 'test-1766269085503@test-clubcreole.com', '2025-12-20 22:18:07.056982', '2025-12-20 22:18:07.056982');



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.refresh_tokens
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '2', 'x32bveaegtmu', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 'f', '2025-12-12 14:10:44.753089+00', '2025-12-12 14:10:44.753089+00', NULL, 'b2c920cd-8907-4eac-bba3-503afd3336ad');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '1', 'acem6c6j2k4m', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 't', '2025-12-12 12:02:55.31637+00', '2025-12-12 14:13:42.705806+00', NULL, '0b072c9b-5da7-4da1-a452-ff492e67aeb3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '3', 'affwk4q6o4oe', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 't', '2025-12-12 14:13:42.713308+00', '2025-12-12 18:35:43.402959+00', 'acem6c6j2k4m', '0b072c9b-5da7-4da1-a452-ff492e67aeb3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '4', 'wi73ei5rqryt', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 't', '2025-12-12 18:35:43.407015+00', '2025-12-12 21:05:07.847213+00', 'affwk4q6o4oe', '0b072c9b-5da7-4da1-a452-ff492e67aeb3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '5', 'xgkxeveybmye', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 't', '2025-12-12 21:05:07.852479+00', '2025-12-15 11:37:25.865713+00', 'wi73ei5rqryt', '0b072c9b-5da7-4da1-a452-ff492e67aeb3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '6', 'bc3gqgcdp2sf', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 'f', '2025-12-15 11:37:25.870765+00', '2025-12-15 11:37:25.870765+00', 'xgkxeveybmye', '0b072c9b-5da7-4da1-a452-ff492e67aeb3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '14', '7yr5ynjlvfs4', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'f', '2025-12-20 14:01:11.357836+00', '2025-12-20 14:01:11.357836+00', NULL, 'e5c6e890-90ca-4f30-a6bd-b80939accf5c');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '15', 'xv3y6iti2v2m', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'f', '2025-12-20 14:01:19.291771+00', '2025-12-20 14:01:19.291771+00', NULL, 'c84b8c36-92a0-4a5c-b272-5eeafdc84d94');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '16', 'uz2x5kse2xq3', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 't', '2025-12-20 14:08:19.162528+00', '2025-12-20 15:09:21.571941+00', NULL, 'f024c6db-7789-4def-9a46-281b9176fefc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '18', 'q7vjwm6h3x6s', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 't', '2025-12-20 15:09:21.576249+00', '2025-12-20 18:02:13.005413+00', 'uz2x5kse2xq3', 'f024c6db-7789-4def-9a46-281b9176fefc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '22', 'pdpqtugiwaiv', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'f', '2025-12-20 18:02:13.011548+00', '2025-12-20 18:02:13.011548+00', 'q7vjwm6h3x6s', 'f024c6db-7789-4def-9a46-281b9176fefc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '27', 'maorwmqeughm', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', 'f', '2025-12-20 22:39:26.449507+00', '2025-12-20 22:39:26.449507+00', NULL, '62e7dca8-fe4d-4591-9804-7ecb17ff3ad6');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '28', 'aoxm6dd4bzpy', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', 't', '2025-12-20 22:40:25.545285+00', '2025-12-20 23:52:23.490271+00', NULL, 'a8fe4eb9-2914-46c1-bb86-6a77e022d379');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '32', 'waesr7e47rrk', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', 'f', '2025-12-20 23:52:23.493319+00', '2025-12-20 23:52:23.493319+00', 'aoxm6dd4bzpy', 'a8fe4eb9-2914-46c1-bb86-6a77e022d379');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '34', '6jymg5hdlooh', 'd8398246-ddc7-4b83-bd91-56224eeaa940', 'f', '2025-12-21 00:35:06.361868+00', '2025-12-21 00:35:06.361868+00', NULL, '861bc152-0593-409c-bd23-afbd15c94d9d');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '35', 'veot7wbkianl', 'd8398246-ddc7-4b83-bd91-56224eeaa940', 'f', '2025-12-21 00:35:22.105111+00', '2025-12-21 00:35:22.105111+00', NULL, 'ec7cbb9c-bf2f-40dc-b9c2-472b3c2651e7');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '36', 'dhag2y6hjgqu', '7441f5ff-63a2-44ad-bd0a-a659666289c4', 'f', '2025-12-21 00:47:07.654201+00', '2025-12-21 00:47:07.654201+00', NULL, '6958e42a-ac8c-41dd-a400-a838aed1d14a');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '37', 'q2gzsuuwz7fq', '7441f5ff-63a2-44ad-bd0a-a659666289c4', 'f', '2025-12-21 00:47:07.838701+00', '2025-12-21 00:47:07.838701+00', NULL, '2584471e-548b-4ae4-9482-9a70270dee01');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '31', 'bidam2l7o3k2', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 't', '2025-12-20 23:28:59.227048+00', '2025-12-21 11:04:19.07889+00', NULL, 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '40', 'foktk6esqkwh', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 'f', '2025-12-21 11:08:53.201931+00', '2025-12-21 11:08:53.201931+00', NULL, '9929c979-06cf-48a7-aea3-25837e148037');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '41', 'ckwmyxydq4lj', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 11:24:29.160223+00', '2025-12-21 12:23:33.406352+00', NULL, '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '39', 'hxypre6pr5bm', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 't', '2025-12-21 11:04:19.085005+00', '2025-12-21 13:06:27.106824+00', 'bidam2l7o3k2', 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '42', 'd6eq2gvxcjpa', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 12:23:33.407434+00', '2025-12-21 13:22:23.564957+00', 'ckwmyxydq4lj', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '43', 'p222oqex5zf3', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 't', '2025-12-21 13:06:27.107644+00', '2025-12-21 14:06:05.419276+00', 'hxypre6pr5bm', 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '44', 'hds7gedrkpyy', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 13:22:23.56585+00', '2025-12-21 14:21:05.790903+00', 'd6eq2gvxcjpa', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '46', 'kg56in2cu7zj', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 14:21:05.791209+00', '2025-12-21 16:17:10.223743+00', 'hds7gedrkpyy', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '47', '2j4gd32mulh4', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 16:17:10.229924+00', '2025-12-21 17:56:02.510354+00', 'kg56in2cu7zj', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '38', 'iazilavtnd7p', '261a9d06-0bc3-4c8a-abea-5d67295f7210', 't', '2025-12-21 03:08:52.213392+00', '2025-12-21 18:01:51.031478+00', NULL, 'f0ca5f14-cd95-4db7-8103-5e3fb2bf9362');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '49', '53ujnroixn7f', '261a9d06-0bc3-4c8a-abea-5d67295f7210', 'f', '2025-12-21 18:01:51.032048+00', '2025-12-21 18:01:51.032048+00', 'iazilavtnd7p', 'f0ca5f14-cd95-4db7-8103-5e3fb2bf9362');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '50', 'bnsckgpjro3n', '4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', 't', '2025-12-21 18:06:16.02619+00', '2025-12-21 19:04:22.810309+00', NULL, '8c496281-d3c8-4625-b6bd-b001ac23988d');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '51', 'nrlcs6qtr5to', '4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', 'f', '2025-12-21 19:04:22.813565+00', '2025-12-21 19:04:22.813565+00', 'bnsckgpjro3n', '8c496281-d3c8-4625-b6bd-b001ac23988d');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '48', '74tbnpayvobo', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 17:56:02.512079+00', '2025-12-21 19:08:08.583309+00', '2j4gd32mulh4', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '53', 'a4aoisneaio3', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-21 19:37:40.566081+00', '2025-12-21 21:20:21.834564+00', NULL, '8a85e830-cd99-4bb0-b68f-993df9b9ab3a');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '52', 'cfumqwvohkgu', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 't', '2025-12-21 19:08:08.583651+00', '2025-12-21 21:54:34.002004+00', '74tbnpayvobo', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '55', '3bhcmufbh2x4', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 'f', '2025-12-21 21:54:34.002971+00', '2025-12-21 21:54:34.002971+00', 'cfumqwvohkgu', '86526d5c-9ae6-46ea-9d69-c31a20486b6f');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '54', 'sy435lq5ovax', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-21 21:20:21.843765+00', '2025-12-22 00:34:58.453038+00', 'a4aoisneaio3', '8a85e830-cd99-4bb0-b68f-993df9b9ab3a');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '57', 'janb54xkilzr', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'f', '2025-12-22 00:34:58.454322+00', '2025-12-22 00:34:58.454322+00', 'sy435lq5ovax', '8a85e830-cd99-4bb0-b68f-993df9b9ab3a');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '56', '7dh2v3563piq', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-21 23:39:25.129616+00', '2025-12-22 00:38:49.926046+00', NULL, '30d8c182-ee2b-4a00-881a-15e49981259e');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '58', 'wmlvelxtejis', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-22 00:38:49.926593+00', '2025-12-22 01:38:13.28635+00', '7dh2v3563piq', '30d8c182-ee2b-4a00-881a-15e49981259e');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '59', 'wy5u77zmw55o', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-22 01:38:13.287553+00', '2025-12-22 10:18:15.615544+00', 'wmlvelxtejis', '30d8c182-ee2b-4a00-881a-15e49981259e');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '60', 'j52272ecj7k6', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'f', '2025-12-22 10:18:15.626061+00', '2025-12-22 10:18:15.626061+00', 'wy5u77zmw55o', '30d8c182-ee2b-4a00-881a-15e49981259e');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '61', 'd5ge7yitjmii', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 'f', '2025-12-22 12:21:41.962494+00', '2025-12-22 12:21:41.962494+00', NULL, 'e9c76e55-ba0c-43be-91bd-d4663747f717');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '45', '75tmam4x27fu', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 't', '2025-12-21 14:06:05.419718+00', '2025-12-22 16:21:55.004781+00', 'p222oqex5zf3', 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '63', 'ev2tl2e65tlt', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'f', '2025-12-22 16:29:26.374498+00', '2025-12-22 16:29:26.374498+00', NULL, 'af6273bf-e415-4ad8-bba6-29e6f1e45b62');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '62', 'zuib5e76465l', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 't', '2025-12-22 16:21:55.020628+00', '2025-12-22 17:21:27.370737+00', '75tmam4x27fu', 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '64', 'nf732nc3psxt', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 'f', '2025-12-22 17:21:27.373262+00', '2025-12-22 17:21:27.373262+00', 'zuib5e76465l', 'dfa62a77-1f37-49c2-a622-b48b4e6459d3');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '65', 'ni4gm4mdcdaw', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-22 18:16:22.115175+00', '2025-12-22 19:24:21.940245+00', NULL, 'e1808069-5ea7-46cd-8dcb-44425301f114');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '66', 'fsbnic6n4bkg', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'f', '2025-12-22 19:24:21.948345+00', '2025-12-22 19:24:21.948345+00', 'ni4gm4mdcdaw', 'e1808069-5ea7-46cd-8dcb-44425301f114');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '67', 'qg3pfxm7tlo3', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 'f', '2025-12-22 19:43:03.750156+00', '2025-12-22 19:43:03.750156+00', NULL, 'ed23f87c-3813-4ca0-aab1-9e5dd9c6b7d0');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '68', '36vmbllgxlhc', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 00:09:12.722804+00', '2025-12-23 01:09:27.461391+00', NULL, '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '69', 'hyqgzrwmxnao', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 01:09:27.465566+00', '2025-12-23 02:09:37.620974+00', '36vmbllgxlhc', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '73', 'nmsr74twmphr', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 11:25:15.779849+00', '2025-12-23 12:24:56.139244+00', 'hov4sgmwgmlt', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '70', 'n7fxyavgjlo2', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 02:09:37.632711+00', '2025-12-23 09:25:55.564052+00', 'hyqgzrwmxnao', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '74', 'higgmk5azjfl', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 12:24:56.142612+00', '2025-12-23 13:24:36.283064+00', 'nmsr74twmphr', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '71', 'rshtakwsagmx', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 09:25:55.574284+00', '2025-12-23 10:25:36.348473+00', 'n7fxyavgjlo2', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '72', 'hov4sgmwgmlt', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 10:25:36.349232+00', '2025-12-23 11:25:15.779064+00', 'rshtakwsagmx', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '75', '545nhbduuecy', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 13:24:36.290217+00', '2025-12-23 14:24:16.931002+00', 'higgmk5azjfl', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '76', 'uzffnvcinapw', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 14:24:16.932258+00', '2025-12-23 15:23:56.988866+00', '545nhbduuecy', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '77', 'sgovzzjpqf7e', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 15:23:56.990957+00', '2025-12-23 16:23:36.847112+00', 'uzffnvcinapw', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '78', '7ep5r3v6drgv', 'f0c9b51d-9092-446d-943e-7bdd44153438', 't', '2025-12-23 16:23:36.848635+00', '2025-12-23 17:23:17.060186+00', 'sgovzzjpqf7e', '6c15937c-6217-446d-8ae9-593e0d8e59bc');
INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', '79', '56awj5ki4hol', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'f', '2025-12-23 17:23:17.064271+00', '2025-12-23 17:23:17.064271+00', '7ep5r3v6drgv', '6c15937c-6217-446d-8ae9-593e0d8e59bc');



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.saml_providers



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.saml_relay_states



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.schema_migrations
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211738');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211808');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211834');
INSERT INTO auth.schema_migrations (version) VALUES ('20180103212743');
INSERT INTO auth.schema_migrations (version) VALUES ('20180108183307');
INSERT INTO auth.schema_migrations (version) VALUES ('20180119214651');
INSERT INTO auth.schema_migrations (version) VALUES ('20180125194653');
INSERT INTO auth.schema_migrations (version) VALUES ('00');
INSERT INTO auth.schema_migrations (version) VALUES ('20210710035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210722035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210730183235');
INSERT INTO auth.schema_migrations (version) VALUES ('20210909172000');
INSERT INTO auth.schema_migrations (version) VALUES ('20210927181326');
INSERT INTO auth.schema_migrations (version) VALUES ('20211122151130');
INSERT INTO auth.schema_migrations (version) VALUES ('20211124214934');
INSERT INTO auth.schema_migrations (version) VALUES ('20211202183645');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185221');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185340');
INSERT INTO auth.schema_migrations (version) VALUES ('20220224000811');
INSERT INTO auth.schema_migrations (version) VALUES ('20220323170000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220429102000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220531120530');
INSERT INTO auth.schema_migrations (version) VALUES ('20220614074223');
INSERT INTO auth.schema_migrations (version) VALUES ('20220811173540');
INSERT INTO auth.schema_migrations (version) VALUES ('20221003041349');
INSERT INTO auth.schema_migrations (version) VALUES ('20221003041400');
INSERT INTO auth.schema_migrations (version) VALUES ('20221011041400');
INSERT INTO auth.schema_migrations (version) VALUES ('20221020193600');
INSERT INTO auth.schema_migrations (version) VALUES ('20221021073300');
INSERT INTO auth.schema_migrations (version) VALUES ('20221021082433');
INSERT INTO auth.schema_migrations (version) VALUES ('20221027105023');
INSERT INTO auth.schema_migrations (version) VALUES ('20221114143122');
INSERT INTO auth.schema_migrations (version) VALUES ('20221114143410');
INSERT INTO auth.schema_migrations (version) VALUES ('20221125140132');
INSERT INTO auth.schema_migrations (version) VALUES ('20221208132122');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195500');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195800');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195900');
INSERT INTO auth.schema_migrations (version) VALUES ('20230116124310');
INSERT INTO auth.schema_migrations (version) VALUES ('20230116124412');
INSERT INTO auth.schema_migrations (version) VALUES ('20230131181311');
INSERT INTO auth.schema_migrations (version) VALUES ('20230322519590');
INSERT INTO auth.schema_migrations (version) VALUES ('20230402418590');
INSERT INTO auth.schema_migrations (version) VALUES ('20230411005111');
INSERT INTO auth.schema_migrations (version) VALUES ('20230508135423');
INSERT INTO auth.schema_migrations (version) VALUES ('20230523124323');
INSERT INTO auth.schema_migrations (version) VALUES ('20230818113222');
INSERT INTO auth.schema_migrations (version) VALUES ('20230914180801');
INSERT INTO auth.schema_migrations (version) VALUES ('20231027141322');
INSERT INTO auth.schema_migrations (version) VALUES ('20231114161723');
INSERT INTO auth.schema_migrations (version) VALUES ('20231117164230');
INSERT INTO auth.schema_migrations (version) VALUES ('20240115144230');
INSERT INTO auth.schema_migrations (version) VALUES ('20240214120130');
INSERT INTO auth.schema_migrations (version) VALUES ('20240306115329');
INSERT INTO auth.schema_migrations (version) VALUES ('20240314092811');
INSERT INTO auth.schema_migrations (version) VALUES ('20240427152123');
INSERT INTO auth.schema_migrations (version) VALUES ('20240612123726');
INSERT INTO auth.schema_migrations (version) VALUES ('20240729123726');
INSERT INTO auth.schema_migrations (version) VALUES ('20240802193726');
INSERT INTO auth.schema_migrations (version) VALUES ('20240806073726');
INSERT INTO auth.schema_migrations (version) VALUES ('20241009103726');



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.sessions
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('b2c920cd-8907-4eac-bba3-503afd3336ad', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', '2025-12-12 14:10:44.744334+00', '2025-12-12 14:10:44.744334+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('f0ca5f14-cd95-4db7-8103-5e3fb2bf9362', '261a9d06-0bc3-4c8a-abea-5d67295f7210', '2025-12-21 03:08:52.209566+00', '2025-12-21 18:01:51.03433+00', NULL, 'aal1', NULL, '2025-12-21 18:01:51.034278', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('0b072c9b-5da7-4da1-a452-ff492e67aeb3', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', '2025-12-12 12:02:55.296544+00', '2025-12-15 11:37:25.882503+00', NULL, 'aal1', NULL, '2025-12-15 11:37:25.882438', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('8c496281-d3c8-4625-b6bd-b001ac23988d', '4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', '2025-12-21 18:06:16.024643+00', '2025-12-21 19:04:22.822963+00', NULL, 'aal1', NULL, '2025-12-21 19:04:22.822909', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('e5c6e890-90ca-4f30-a6bd-b80939accf5c', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '2025-12-20 14:01:11.356862+00', '2025-12-20 14:01:11.356862+00', NULL, 'aal1', NULL, NULL, 'curl/8.5.0', '82.127.88.171', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('c84b8c36-92a0-4a5c-b272-5eeafdc84d94', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '2025-12-20 14:01:19.290538+00', '2025-12-20 14:01:19.290538+00', NULL, 'aal1', NULL, NULL, 'curl/8.5.0', '82.127.88.171', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('86526d5c-9ae6-46ea-9d69-c31a20486b6f', 'edf67a0c-eed0-4810-82a9-2a084ba75547', '2025-12-21 11:24:29.158355+00', '2025-12-21 21:54:34.005705+00', NULL, 'aal1', NULL, '2025-12-21 21:54:34.005664', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('f024c6db-7789-4def-9a46-281b9176fefc', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '2025-12-20 14:08:19.161371+00', '2025-12-20 18:02:13.039832+00', NULL, 'aal1', NULL, '2025-12-20 18:02:13.039405', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('8a85e830-cd99-4bb0-b68f-993df9b9ab3a', 'f0c9b51d-9092-446d-943e-7bdd44153438', '2025-12-21 19:37:40.564528+00', '2025-12-22 00:34:58.456782+00', NULL, 'aal1', NULL, '2025-12-22 00:34:58.456742', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('62e7dca8-fe4d-4591-9804-7ecb17ff3ad6', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', '2025-12-20 22:39:26.448775+00', '2025-12-20 22:39:26.448775+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('6c15937c-6217-446d-8ae9-593e0d8e59bc', 'f0c9b51d-9092-446d-943e-7bdd44153438', '2025-12-23 00:09:12.709349+00', '2025-12-23 17:23:17.069739+00', NULL, 'aal1', NULL, '2025-12-23 17:23:17.0695', 'Dart/3.10 (dart:io)', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('a8fe4eb9-2914-46c1-bb86-6a77e022d379', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', '2025-12-20 22:40:25.544542+00', '2025-12-20 23:52:23.495365+00', NULL, 'aal1', NULL, '2025-12-20 23:52:23.495306', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('861bc152-0593-409c-bd23-afbd15c94d9d', 'd8398246-ddc7-4b83-bd91-56224eeaa940', '2025-12-21 00:35:06.361065+00', '2025-12-21 00:35:06.361065+00', NULL, 'aal1', NULL, NULL, 'node', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('ec7cbb9c-bf2f-40dc-b9c2-472b3c2651e7', 'd8398246-ddc7-4b83-bd91-56224eeaa940', '2025-12-21 00:35:22.10446+00', '2025-12-21 00:35:22.10446+00', NULL, 'aal1', NULL, NULL, 'node', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('6958e42a-ac8c-41dd-a400-a838aed1d14a', '7441f5ff-63a2-44ad-bd0a-a659666289c4', '2025-12-21 00:47:07.653624+00', '2025-12-21 00:47:07.653624+00', NULL, 'aal1', NULL, NULL, 'node', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('2584471e-548b-4ae4-9482-9a70270dee01', '7441f5ff-63a2-44ad-bd0a-a659666289c4', '2025-12-21 00:47:07.838066+00', '2025-12-21 00:47:07.838066+00', NULL, 'aal1', NULL, NULL, 'node', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('30d8c182-ee2b-4a00-881a-15e49981259e', 'f0c9b51d-9092-446d-943e-7bdd44153438', '2025-12-21 23:39:25.121201+00', '2025-12-22 10:18:15.640015+00', NULL, 'aal1', NULL, '2025-12-22 10:18:15.639698', 'Dart/3.10 (dart:io)', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('9929c979-06cf-48a7-aea3-25837e148037', 'edf67a0c-eed0-4810-82a9-2a084ba75547', '2025-12-21 11:08:53.199664+00', '2025-12-21 11:08:53.199664+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('e9c76e55-ba0c-43be-91bd-d4663747f717', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', '2025-12-22 12:21:41.946643+00', '2025-12-22 12:21:41.946643+00', NULL, 'aal1', NULL, NULL, 'Dart/3.10 (dart:io)', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('af6273bf-e415-4ad8-bba6-29e6f1e45b62', 'f0c9b51d-9092-446d-943e-7bdd44153438', '2025-12-22 16:29:26.369733+00', '2025-12-22 16:29:26.369733+00', NULL, 'aal1', NULL, NULL, 'Dart/3.10 (dart:io)', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('dfa62a77-1f37-49c2-a622-b48b4e6459d3', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', '2025-12-20 23:28:59.224764+00', '2025-12-22 17:21:27.375999+00', NULL, 'aal1', NULL, '2025-12-22 17:21:27.375944', 'Dart/3.10 (dart:io)', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('e1808069-5ea7-46cd-8dcb-44425301f114', 'f0c9b51d-9092-446d-943e-7bdd44153438', '2025-12-22 18:16:22.10924+00', '2025-12-22 19:24:21.964031+00', NULL, 'aal1', NULL, '2025-12-22 19:24:21.963707', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);
INSERT INTO auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) VALUES ('ed23f87c-3813-4ca0-aab1-9e5dd9c6b7d0', 'edf67a0c-eed0-4810-82a9-2a084ba75547', '2025-12-22 19:43:03.740392+00', '2025-12-22 19:43:03.740392+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '86.201.154.17', NULL);



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.sso_domains



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.sso_providers



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- Converted from COPY auth.users
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'f4a92d33-8b14-433e-bb25-3522f5501781', 'authenticated', 'authenticated', 'test-1766269085503@test-clubcreole.com', '$2a$10$ZdlD9R77a.wIyru5XTKwk.JEtxpQaJRZ.ZNkHCXARK9WO0Vu1Tm4K', NULL, NULL, 'c74b92c0ce448e50bb5c2519b64ad70579e03ea977a959a5a881984a', '2025-12-20 22:18:07.05596+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "f4a92d33-8b14-433e-bb25-3522f5501781", "email": "test-1766269085503@test-clubcreole.com", "email_verified": false, "phone_verified": false}', NULL, '2025-12-20 22:18:07.05081+00', '2025-12-20 22:18:07.056293+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 'authenticated', 'authenticated', 'admin@clubcreole.com', '$2a$06$FVBJmC.nenvyHv7EEkRj3.Jy/pQ3A2j4lb33AqrlrJLhFpB6QyFEi', '2025-12-12 09:29:28.164464+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-12 14:10:44.743486+00', '{"provider": "email", "providers": ["email"]}', '{"role": "admin"}', NULL, '2025-12-12 09:29:28.164464+00', '2025-12-15 11:37:25.875376+00', '', NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'authenticated', 'authenticated', 'test@clubcreole.fr', '$2a$10$MlLQYjDNMUJspbciwdObIOWPwU5T1NzKNC3oNLlP9b3Ufq7FCCkG2', '2025-12-19 02:42:34.810252+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-20 18:33:12.699171+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c220ed82-db9b-4dec-ad56-0c93fad6eae7", "email": "test@clubcreole.fr", "last_name": "User", "first_name": "Test", "email_verified": true, "phone_verified": false}', NULL, '2025-12-19 02:32:01.076465+00', '2025-12-20 23:27:04.644756+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2', 'authenticated', 'authenticated', 'test-1766264950616@test-clubcreole.com', '$2a$10$Q4MEOpfxmzoGLTAUJAuI1.XgwB/kiLugPb2EU7EDVNBFmVAcBniaC', NULL, NULL, 'a96c80d08999d87bbbddf879cb8f097484cc690407b5b168a57dfc4e', '2025-12-20 21:09:12.052271+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "9e1ab7d7-bf8e-4ac8-8c91-629f9dfbe4f2", "email": "test-1766264950616@test-clubcreole.com", "email_verified": false, "phone_verified": false}', NULL, '2025-12-20 21:09:12.035558+00', '2025-12-20 21:09:12.053081+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '7441f5ff-63a2-44ad-bd0a-a659666289c4', 'authenticated', 'authenticated', 'test_app_1766278026044@test-clubcreole.com', '$2a$10$Vpfp8i8quKGlKzUiDaNvSug3Gv4Sgo6zulOLFqC4ywe6/3xoW9d2a', '2025-12-21 00:47:07.651262+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-21 00:47:07.838001+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "7441f5ff-63a2-44ad-bd0a-a659666289c4", "email": "test_app_1766278026044@test-clubcreole.com", "email_verified": true, "phone_verified": false}', NULL, '2025-12-21 00:47:07.646261+00', '2025-12-21 00:47:07.839452+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7', 'authenticated', 'authenticated', 'laurent-luce@hotmail.com', '$2a$10$12RNewoRJPQ0mvm39tZ2..RcYcwukKxYLRwmW8psq76JbRU9luOBi', '2025-12-20 22:39:26.446026+00', NULL, '', '2025-12-20 21:08:00.403119+00', '', NULL, '', '', NULL, '2025-12-20 22:40:25.544476+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "aa74e2d0-460a-4ec7-82e1-cf3c243bf4c7", "email": "laurent-luce@hotmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-12-11 21:24:07.772347+00', '2025-12-20 23:52:23.494384+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'ec3a66dc-e1ea-49c1-9b43-224c80eabf25', 'authenticated', 'authenticated', 'louis@hotmail.com', '$2a$10$q.j3Y56FnNmNCM9IcsPpkeRkd.HOTo/HoSgrpExmZZRRuP6rt19E.', '2025-12-20 22:45:48.251451+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-20 22:45:48.253515+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ec3a66dc-e1ea-49c1-9b43-224c80eabf25", "email": "louis@hotmail.com", "last_name": "LUCE", "first_name": "Louis", "email_verified": true, "phone_verified": false}', NULL, '2025-12-20 22:45:48.247177+00', '2025-12-21 00:32:44.138611+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183', 'authenticated', 'authenticated', 'test-1766270288945@test-clubcreole.com', '$2a$10$LzN/dzcXiJn/8WC0sYeJm.Avth8BJPbg.MRe.TZfBXAJhUt6eCP1W', '2025-12-20 22:38:09.551536+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-20 22:38:11.977166+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "91a8f6f4-cdc8-4d8a-b99e-6e3b6f496183", "email": "test-1766270288945@test-clubcreole.com", "email_verified": true, "phone_verified": false}', NULL, '2025-12-20 22:38:09.536434+00', '2025-12-20 22:38:11.978841+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'd8db1516-aac1-4a13-879d-3a95d35c6b72', 'authenticated', 'authenticated', 'laurent.luce@hotmail.com', '$2a$10$AJQwvXg.4llyebK41Xf69.b7GtP9kxnobAhTRel18AI1mHaw.2ikW', '2025-12-20 23:28:59.217791+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-22 12:21:41.945549+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d8db1516-aac1-4a13-879d-3a95d35c6b72", "email": "laurent.luce@hotmail.com", "last_name": "Luce", "first_name": "Laurent", "email_verified": true, "phone_verified": false}', NULL, '2025-12-20 23:28:59.198468+00', '2025-12-22 17:21:27.374717+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'd8398246-ddc7-4b83-bd91-56224eeaa940', 'authenticated', 'authenticated', 'test_1766277304635@test-clubcreole.com', '$2a$10$aGfFm2jo7r3jSeh7.fnESufy98GIbrbon5PuFOA/8N3/5CCQYnkvi', '2025-12-21 00:35:06.357559+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-21 00:35:22.104406+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d8398246-ddc7-4b83-bd91-56224eeaa940", "email": "test_1766277304635@test-clubcreole.com", "email_verified": true, "phone_verified": false}', NULL, '2025-12-21 00:35:06.344819+00', '2025-12-21 00:35:22.106264+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '261a9d06-0bc3-4c8a-abea-5d67295f7210', 'authenticated', 'authenticated', 'laurent@hotmail.com', '$2a$10$6AHIEOdtBLss5pMN2wdHAeNVcyyBxmL/7cCY8s9l.gbTS81qt5hwW', '2025-12-21 03:08:52.199364+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-21 03:08:52.204563+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "261a9d06-0bc3-4c8a-abea-5d67295f7210", "email": "laurent@hotmail.com", "phone": "+337664653", "last_name": "LUCE", "first_name": "Laurent", "email_verified": true, "phone_verified": false}', NULL, '2025-12-21 03:08:52.162572+00', '2025-12-21 18:01:51.033395+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'f0c9b51d-9092-446d-943e-7bdd44153438', 'authenticated', 'authenticated', 'cmoinster@gmail.com', '$2a$10$2T4JjsLy1GboaDir5RYD5uB2R6bZqxmWJKDCkIhTf8L0cKPNyhMze', '2025-12-21 19:37:40.553616+00', NULL, '', '2025-12-20 12:54:28.565847+00', '', NULL, '', '', NULL, '2025-12-23 00:09:12.709274+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f0c9b51d-9092-446d-943e-7bdd44153438", "email": "cmoinster@gmail.com", "last_name": "LUCE", "first_name": "Laurent", "email_verified": true, "phone_verified": false}', NULL, '2025-12-19 21:08:21.819802+00', '2025-12-23 17:23:17.066928+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', 'edf67a0c-eed0-4810-82a9-2a084ba75547', 'authenticated', 'authenticated', 'caty@hotmail.com', '$2a$10$kB7ErmUkO9Tb7hgQDB.FNey1ZpujMWEt6gxHt94n5etzjDHZh0aU.', '2025-12-21 11:08:53.193933+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-22 19:43:03.739934+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "edf67a0c-eed0-4810-82a9-2a084ba75547", "email": "caty@hotmail.com", "phone": "+337664653", "last_name": "LUCE", "first_name": "Caty", "email_verified": true, "phone_verified": false}', NULL, '2025-12-21 11:08:53.168396+00', '2025-12-22 19:43:03.75247+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', 'authenticated', 'authenticated', 'meryl@hotmail.com', '$2a$10$iKxX9O.p4uJQJeKviSaNqOuInRJFglfXt6uDOWVJHQSfbS75zSG4S', '2025-12-21 18:06:16.020034+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-21 18:06:16.024318+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4af1763d-6cd0-4f31-b769-f5e4fa1c9e56", "email": "meryl@hotmail.com", "phone": "+33766334653", "last_name": "LUCE", "first_name": "Meryl", "email_verified": true, "phone_verified": false}', NULL, '2025-12-21 18:06:15.999038+00', '2025-12-21 19:04:22.817355+00', NULL, NULL, '', '', NULL, '', '0', NULL, '', NULL, 'f', NULL, 'f');



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

-- Converted from COPY pgsodium.key



--
-- Data for Name: accommodation_reservations; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.accommodation_reservations



--
-- Data for Name: accommodations; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.accommodations
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('1', 'Villa Paradis', 'Villa', 'Basse-Terre', '125', '4.8', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1549638441-b787d2e11f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]', '["WiFi", "TV", "Cuisine", "Parking", "Climatisation", "Piscine"]', 'Magnifique villa avec vue sur la mer, parfaite pour des vacances en famille ou entre amis. Située à seulement 5 minutes à pied de la plage, cette villa spacieuse offre tout le confort nécessaire pour un séjour inoubliable.', '3', '2', '6', '[{"name": "WiFi gratuit", "available": true}, {"name": "Petit-déjeuner inclus", "available": true}, {"name": "Piscine privée", "available": true}, {"name": "Vue sur la mer", "available": true}, {"name": "Service de ménage", "available": true}, {"name": "Animaux acceptés", "available": false}, {"name": "Parking gratuit", "available": true}, {"name": "Climatisation", "available": true}]', '["Check-in: 15h00", "Check-out: 11h00", "Interdiction de fumer", "Pas de fêtes ou événements"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('2', 'Hôtel Tropical', 'Hôtel', 'Grande-Terre', '85', '4.5', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', '["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]', '["WiFi", "TV", "Restaurant", "Parking", "Climatisation", "Piscine"]', 'Hôtel confortable et élégant situé à quelques pas de la plage. Profitez de nos installations modernes et d''un service de qualité pour un séjour relaxant dans un cadre idyllique.', '1', '1', '2', '[{"name": "WiFi gratuit", "available": true}, {"name": "Petit-déjeuner inclus", "available": true}, {"name": "Piscine", "available": true}, {"name": "Vue sur la mer", "available": true}, {"name": "Service de ménage", "available": true}, {"name": "Animaux acceptés", "available": false}, {"name": "Parking gratuit", "available": true}, {"name": "Climatisation", "available": true}]', '["Check-in: 14h00", "Check-out: 11h00", "Interdiction de fumer dans les chambres", "Petit-déjeuner servi de 7h à 10h"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('3', 'Bungalow Océan de Test', 'appartement', 'Les Saintes', '95', '4.6', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', '["https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]', '["WiFi", "TV", "Cuisine", "Vue mer", "Climatisation"]', 'Bungalow charmant offrant une expérience authentique au bord de l''océan. Idéal pour les couples en quête de tranquillité et d''intimité.', '1', '1', '2', '[{"name": "WiFi gratuit", "available": true}, {"name": "Petit-déjeuner inclus", "available": true}, {"name": "Piscine privée", "available": true}, {"name": "Vue sur la mer", "available": false}, {"name": "Service de ménage", "available": true}, {"name": "Animaux acceptés", "available": false}, {"name": "Parking gratuit", "available": true}, {"name": "Climatisation", "available": true}, {"name": "Vélos électriques", "available": false}]', '["Check-in: 15h00", "Check-out: 10h00", "Animaux acceptés (supplément)", "Caution demandée à l''arrivée"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('4', 'Résidence Les Palmiers', 'Appartement', 'Pointe-à-Pitre', '70', '4.3', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9504878821691026.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9504878821691026.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.5858377220207985.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9406988129408863.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.45449722625387523.jpg"]', '["WiFi", "TV", "Cuisine", "Parking", "Climatisation"]', 'Appartements modernes et spacieux dans un quartier calme et résidentiel. À proximité des commerces et des transports en commun.', '2', '1', '4', '[{"name": "Wifi", "available": true}, {"name": "Climatisation", "available": true}, {"name": "Piscine", "available": true}, {"name": "Salle de sport", "available": true}]', '["Check-in: 14h00", "Check-out: 11h00", "Interdiction de fumer", "Respect des voisins (bruit)"]', NULL, '3', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('5', 'Gîte Rural Caraïbes', 'Gîte', 'Marie-Galante', '65', '4.7', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', '["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]', '["WiFi", "Cuisine", "Jardin", "Hamac", "BBQ"]', 'Gîte authentique pour découvrir la vraie vie caribéenne dans un cadre naturel exceptionnel. Parfait pour les amoureux de la nature et de la tranquillité.', '2', '1', '5', '[{"name": "WiFi gratuit", "available": true}, {"name": "Jardin tropical", "available": true}, {"name": "Barbecue", "available": true}, {"name": "Hamac", "available": true}, {"name": "Service de ménage", "available": false}, {"name": "Animaux acceptés", "available": true}, {"name": "Parking gratuit", "available": true}, {"name": "Climatisation", "available": false}]', '["Check-in: 16h00", "Check-out: 10h00", "Économie d''eau recommandée", "Tri des déchets"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('6', 'Suite Créole', 'Chambre d''hôtes', 'Le Gosier', '90', '4.9', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', '["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"]', '["WiFi", "TV", "Petit-déjeuner", "Piscine", "Climatisation"]', 'Chambres d''hôtes de luxe avec un service personnalisé et une atmosphère chaleureuse. Les hôtes sont connus pour leur accueil exceptionnel et leur connaissance de l''île.', '1', '1', '2', '[{"name": "WiFi gratuit", "available": true}, {"name": "Petit-déjeuner inclus", "available": true}, {"name": "Piscine", "available": true}, {"name": "Service de ménage", "available": true}, {"name": "Conseils touristiques", "available": true}, {"name": "Animaux acceptés", "available": false}, {"name": "Parking gratuit", "available": true}, {"name": "Climatisation", "available": true}]', '["Check-in: 15h00-19h00", "Check-out: 11h00", "Petit-déjeuner de 7h30 à 9h30", "Silence après 22h00"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('7', 'Villa Paradis', 'Villa', 'Sainte-Anne, Guadeloupe', '120', '4.8', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', '["Piscine privée", "Vue sur mer", "Cuisine équipée", "Terrasse"]', 'Une magnifique villa avec vue sur mer, située dans un cadre tropical exceptionnel. Profitez d''une piscine privée et d''un accès direct à la plage.', '3', '2', '6', '[{"name": "Piscine", "available": true}, {"name": "Wi-Fi", "available": true}, {"name": "Climatisation", "available": true}, {"name": "Cuisine équipée", "available": true}]', '["Arrivée à partir de 15h00", "Départ avant 11h00", "Non fumeur"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('8', 'Bungalow Créole', 'Bungalow', 'Le Gosier, Guadeloupe', '85', '4.5', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9598525044976334.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9598525044976334.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.7574704804625281.jpg"]', '["Style créole", "Jardin tropical", "Proche plages"]', 'Bungalow traditionnel créole avec tout le confort moderne. Idéal pour un séjour authentique en Guadeloupe.', '2', '1', '4', '[]', '["Arrivée à partir de 16h00", "Départ avant 10h00"]', NULL, '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('9', 'Hôtel Marina', 'Hôtel', 'Pointe-à-Pitre, Guadeloupe', '95', '4.2', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.9524697215386511.jpg"]', '[]', 'Hôtel moderne situé au cœur de la marina avec vue imprenable sur le port. Services haut de gamme inclus.', '1', '1', '2', '[{"name": "Piscine", "available": true}, {"name": "Parking", "available": true}, {"name": "Vue marina", "available": true}, {"name": "Service concierge", "available": false}]', '["Arrivée à partir de 14h00", "Départ avant 12h00", "Service en chambre disponible"]', '0', '3', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('10', 'Gîte des Colibris', 'appartement', 'Basse-Terre, Guadeloupe', '70', '4.8', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', '["Forêt tropicale", "Randonnée", "Calme", "Nature"]', 'Gîte charmant niché dans la forêt tropicale, parfait pour les amoureux de la nature et de la randonnée.', '2', '1', '4', '["Wifi", "Climatisation"]', '["Respect de la nature", "Calme après 22h00", "Départ avant 11h00"]', '15', '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('11', 'Studio Plage', 'Studio', 'Sainte-Rose, Guadeloupe', '65', '4.3', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]', '["Face à la plage", "Balcon privé", "Moderne"]', 'Studio moderne face à la plage avec balcon privé. Idéal pour un couple en quête de romantisme.', '1', '1', '2', '[{"name": "Balcon", "available": true}, {"name": "Vue mer", "available": true}, {"name": "Wi-Fi", "available": true}]', '["Arrivée à partir de 15h00", "Départ avant 11h00"]', '0', '3', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('12', 'Tropicana Suites', 'Suites', 'Bas Vent, Guadeloupe', '150', '3', 'https://tropicana-suites.com/wp-content/uploads/2021/11/img-9576-scaled.jpg', '["https://tropicana-suites.com/wp-content/uploads/2021/11/622447fe-b336-45b5-b4f2-c979eff67613-610x610.jpg", "https://tropicana-suites.com/wp-content/uploads/2024/12/12-610x610.jpg", "https://tropicana-suites.com/wp-content/uploads/2024/12/5-scaled-e1733495706369-610x610.jpg"]', '["Suites avec séjour et chambre séparés", "Cuisine équipée", "Terrasse privative avec hamac", "Piscine de 27 mètres", "Bain à remous", "Pool bar (Jungle Bar)", "Espace BBQ en libre-service", "Proximité plages (200m)", "Base nautique et Beach bar à proximité"]', 'La Résidence Tropicana Suites **** bénéficie d''un emplacement exceptionnel. Située à seulement 200 mètres de 2 plages d''exception, d''une base nautique et d''un Beach bar.', '1', '1', '4', '[{"name": "Piscine", "available": true}, {"name": "Bain à remous", "available": true}, {"name": "Bar", "available": true}, {"name": "BBQ", "available": true}, {"name": "Cuisine équipée", "available": true}, {"name": "Terrasse privative", "available": true}, {"name": "Hamac", "available": true}, {"name": "Wi-Fi", "available": true}, {"name": "Climatisation", "available": true}]', '["Arrivée à partir de 15h00", "Départ avant 11h00"]', '0', '1', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('13', 'La Colline Verte', 'Bungalow', 'Entre Saint-Rose et Deshaies, Guadeloupe', '150', '4.7', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.0043661754346411286.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.3507626307666044.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.0043661754346411286.jpg", "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739352769/vjkklrjmrd8qguklogwq.jpg", "https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/ldzumam8avliwudcthsp.jpg"]', '["Bungalows créoles", "Vue sur la mer des Caraïbes", "Piscine", "Jardin tropical"]', 'Situé entre St-Rose et Deshaies, La Colline Verte propose des bungalows créoles dans un jardin tropical avec piscine et vue sur la mer des Caraïbes. Les gîtes peuvent accueillir de 2 à 8 personnes et disposent d''une terrasse privée et d''une cuisine équipée. Proche des plages de La Perle et Fort Royal.', '1', '1', '8', '[]', '["Animaux non admis (à confirmer)", "Non fumeur (à confirmer)"]', '50', '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('15', 'Villa paradis', 'villa', 'Guadeloupe', '120', '4.5', 'https://res.cloudinary.com/amenitiz/image/upload/c_fill,f_auto,h_2000,q_auto:good,w_2880/v1739351001/yd8sip3z59369xzcdbhs.jpg', '[]', '["Vue mer", "Balcon"]', 'C''est un super appart', '1', '1', '1', '["Wifi", "piscine"]', '[]', '10', '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');
INSERT INTO public.accommodations (id, name, type, location, price, rating, image, gallery_images, features, description, rooms, bathrooms, max_guests, amenities, rules, discount, weight, partner_id, created_at, updated_at) VALUES ('16', 'Jardin Botanique de Deshaies', 'appartement', 'Deshaies', '15', '4.5', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.7713591594408016.jpg', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.5955726756284067.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.7713591594408016.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.39414453150441486.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/accommodation-images/0.2911729715332555.jpg"]', '[]', 'Le parc a été conçu dans l''objectif de faire découvrir aux visiteurs la richesse de la flore des Antilles, et l''art de la mettre en valeur. Le parc offre différents thèmes, une certaine harmonie et une certaine logique dans le tracé du circuit.', '1', '1', '1', '[{"name": "Piscine", "available": false}]', '[]', '8', '5', NULL, '2025-12-11 18:50:08.227785+00', '2025-12-11 18:50:08.227785+00');



--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activities
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('1', 'Loisirs', '/loisirs', 'Gamepad2', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('2', 'Restauration', '/restauration', 'Coffee', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('3', 'Hébergements', '/hebergements', 'Bed', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('4', 'Concerts', '/concerts', 'Music', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('5', 'Soirée', '/soiree', 'Martini', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('6', 'Location de Voitures', '/location', 'Car', '2025-06-20 19:13:13.286776+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('7', 'Plongée sous marine', '/plongee', 'Waves', '2025-06-20 19:13:13.286776+00', 'f', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('10', 'Voyance', '/voyance', 'Eye', '2025-06-20 19:13:13.286776+00', 'f', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('15', 'Voyages', '/voyages', 'Plane', '2025-06-20 20:48:39.676446+00', 't', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('8', 'Canoë Kayak', '/canoe', 'Ship', '2025-06-20 19:13:13.286776+00', 'f', '0.00');
INSERT INTO public.activities (id, name, path, icon_name, created_at, is_active, rating) VALUES ('9', 'Randonnée', '/randonnee', 'Mountain', '2025-06-20 19:13:13.286776+00', 'f', '0.00');



--
-- Data for Name: activity_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activity_images
INSERT INTO public.activity_images (id, activity_id, url, alt_text, title, sort_order, created_at) VALUES ('1', '1', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', 'Vague océanique sur la plage', 'Découvrez nos spots de plongée', '1', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_images (id, activity_id, url, alt_text, title, sort_order, created_at) VALUES ('2', '1', 'https://images.unsplash.com/photo-1518877593221-1f28583780b4', 'Baleine à bosse sautant hors de l''eau', 'Observation de la vie marine', '2', '2025-12-11 13:13:18.847718+00');



--
-- Data for Name: activity_inclusions; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activity_inclusions
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('1', '1', 'Équipement fourni', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('2', '1', 'Moniteur certifié', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('3', '1', 'Durée : 2 heures', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('4', '1', 'Niveau débutant accepté', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('5', '1', 'Tout l''équipement de plongée', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('6', '1', 'Briefing de sécurité complet', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('7', '1', 'Accompagnement par un moniteur certifié', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_inclusions (id, activity_id, inclusion_text, created_at) VALUES ('8', '1', 'Assurance responsabilité civile', '2025-12-11 13:13:18.847718+00');



--
-- Data for Name: activity_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activity_levels
INSERT INTO public.activity_levels (id, activity_id, level_name, level_description, created_at) VALUES ('1', '1', 'Débutant', 'Débutant (première plongée)', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_levels (id, activity_id, level_name, level_description, created_at) VALUES ('2', '1', 'Intermédiaire', 'Intermédiaire (avec certification)', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_levels (id, activity_id, level_name, level_description, created_at) VALUES ('3', '1', 'Avancé', 'Avancé (plongée profonde)', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_levels (id, activity_id, level_name, level_description, created_at) VALUES ('4', '1', 'Professionnel', 'Professionnel (exploration libre)', '2025-12-11 13:13:18.847718+00');



--
-- Data for Name: activity_reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activity_reservations



--
-- Data for Name: activity_time_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.activity_time_slots
INSERT INTO public.activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES ('1', '1', '09:00:00', 't', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES ('2', '1', '11:00:00', 't', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES ('3', '1', '14:00:00', 't', '2025-12-11 13:13:18.847718+00');
INSERT INTO public.activity_time_slots (id, activity_id, time_slot, is_active, created_at) VALUES ('4', '1', '16:00:00', 't', '2025-12-11 13:13:18.847718+00');



--
-- Data for Name: bons_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.bons_plans
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('1', 'Des réductions', 'Profitez de réductions exclusives chez nos partenaires', 'Gift', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1760&auto=format&fit=crop', NULL, 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('2', 'Prêt de matériel', 'Accédez à du matériel de réception et des outils', 'Wrench', '/lovable-uploads/c7dc7b94-fcb7-46f8-aa26-0740b8bbdad1.png', NULL, 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('3', 'Services gratuits', 'Bénéficiez de services d''assistance gratuits', 'HeartHandshake', 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1760&auto=format&fit=crop', NULL, 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('4', 'Concert de Francis CABREL', 'Profitez d''une réduction de 20% sur le concert du 15 mars', 'Music', 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1760&auto=format&fit=crop', 'Coup de cœur', 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('5', 'La Toubana Hôtel 5★', '2 nuits = 1 dîner gastronomique pour 2 offert', 'Hotel', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1760&auto=format&fit=crop', 'Exclusivité', 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');
INSERT INTO public.bons_plans (id, title, description, icon, image, badge, is_active, created_at, updated_at) VALUES ('6', 'Parc l''Infini', '2 entrées gratuites au parc d''attractions', 'Ticket', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1760&auto=format&fit=crop', 'Gratuit', 't', '2025-12-11 13:13:21.901761+00', '2025-12-11 13:13:21.901761+00');



--
-- Data for Name: car_client_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.car_client_reviews
INSERT INTO public.car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name, created_at, updated_at) VALUES ('1', 'Sophie Martin', 'Paris, France', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Service exceptionnel ! La voiture était impeccable et le prix avec la réduction Club Créole était vraiment avantageux. Je recommande vivement Caribbean Cars pour découvrir la Martinique.', '5', '2023-05-15', 'Caribbean Cars', '2025-12-11 13:13:16.5911+00', '2025-12-11 13:13:16.5911+00');
INSERT INTO public.car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name, created_at, updated_at) VALUES ('2', 'Thomas Dubois', 'Lyon, France', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Prestige Auto a rendu mon séjour inoubliable. J''ai pu profiter d''un cabriolet de luxe pour admirer les paysages martiniquais. Le jour de location offert grâce au Club Créole a été un vrai plus !', '5', '2023-06-03', 'Prestige Auto', '2025-12-11 13:13:16.5911+00', '2025-12-11 13:13:16.5911+00');
INSERT INTO public.car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name, created_at, updated_at) VALUES ('3', 'Marie Leroy', 'Bordeaux, France', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Très satisfaite de mon expérience avec Eco Drive. Louer un véhicule électrique était parfait pour explorer l''île tout en respectant l''environnement. Les recharges gratuites sont un vrai avantage.', '4', '2023-07-22', 'Eco Drive', '2025-12-11 13:13:16.5911+00', '2025-12-11 13:13:16.5911+00');
INSERT INTO public.car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name, created_at, updated_at) VALUES ('4', 'Jean Moreau', 'Marseille, France', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Aventure 4x4 a dépassé toutes mes attentes ! Le SUV était parfaitement adapté aux routes plus difficiles de la Martinique. Le kit d''aventure offert était vraiment utile pour nos excursions.', '5', '2023-08-10', 'Aventure 4x4', '2025-12-11 13:13:16.5911+00', '2025-12-11 13:13:16.5911+00');
INSERT INTO public.car_client_reviews (id, name, location, avatar, comment, rating, review_date, rental_company_name, created_at, updated_at) VALUES ('5', 'Claire Petit', 'Nantes, France', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80', 'Service client exceptionnel chez Caribbean Cars. Ils ont été très réactifs quand j''ai eu un petit problème et l''ont résolu immédiatement. La réduction Club Créole était substantielle !', '5', '2023-09-05', 'Caribbean Cars', '2025-12-11 13:13:16.5911+00', '2025-12-11 13:13:16.5911+00');



--
-- Data for Name: car_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.car_models
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('1', '1', 'Peugeot 208', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '29', 'Citadine', '5', 'Manuelle', 't', '2025-12-11 13:13:15.7895+00', '2025-12-11 13:13:15.7895+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('2', '1', 'Renault Clio', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '32', 'Citadine', '5', 'Automatique', 't', '2025-12-11 13:13:15.7895+00', '2025-12-11 13:13:15.7895+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('3', '1', 'Citroën C3', 'https://images.unsplash.com/photo-1502877338535-766e1452ae51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '28', 'Citadine', '5', 'Manuelle', 't', '2025-12-11 13:13:15.7895+00', '2025-12-11 13:13:15.7895+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('4', '2', 'Mercedes Classe C Cabriolet', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '120', 'Cabriolet', '4', 'Automatique', 't', '2025-12-11 13:13:15.892627+00', '2025-12-11 13:13:15.892627+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('5', '2', 'BMW X5', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '150', 'SUV', '5', 'Automatique', 't', '2025-12-11 13:13:15.892627+00', '2025-12-11 13:13:15.892627+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('6', '2', 'Audi A8', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '180', 'Berline', '5', 'Automatique', 't', '2025-12-11 13:13:15.892627+00', '2025-12-11 13:13:15.892627+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('7', '3', 'Renault Zoe', 'https://images.unsplash.com/photo-1562911791-c7a97b729ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '45', 'Citadine électrique', '5', 'Automatique', 't', '2025-12-11 13:13:15.990846+00', '2025-12-11 13:13:15.990846+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('8', '3', 'Peugeot e-208', 'https://images.unsplash.com/photo-1647588807130-91d14e004a99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '48', 'Citadine électrique', '5', 'Automatique', 't', '2025-12-11 13:13:15.990846+00', '2025-12-11 13:13:15.990846+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('9', '3', 'Tesla Model 3', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '90', 'Berline électrique', '5', 'Automatique', 't', '2025-12-11 13:13:15.990846+00', '2025-12-11 13:13:15.990846+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('10', '4', 'Jeep Wrangler', 'https://images.unsplash.com/photo-1597007030739-6d2e7172ce5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '85', '4x4', '4', 'Manuelle', 't', '2025-12-11 13:13:16.09306+00', '2025-12-11 13:13:16.09306+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('11', '4', 'Toyota Land Cruiser', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '95', '4x4', '7', 'Automatique', 't', '2025-12-11 13:13:16.09306+00', '2025-12-11 13:13:16.09306+00');
INSERT INTO public.car_models (id, company_id, name, image, price_per_day, category, seats, transmission, air_con, created_at, updated_at) VALUES ('12', '4', 'Dacia Duster', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', '60', 'SUV compact', '5', 'Manuelle', 't', '2025-12-11 13:13:16.09306+00', '2025-12-11 13:13:16.09306+00');



--
-- Data for Name: car_rental_companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.car_rental_companies
INSERT INTO public.car_rental_companies (id, name, type, image, location, description, rating, offer, icon_name, created_at, updated_at) VALUES ('1', 'Caribbean Cars', 'Véhicules économiques', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fort-de-France', 'Une large gamme de véhicules économiques et compacts, parfaits pour explorer l''île. Service client réactif et tarifs compétitifs.', '4.6', '15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole', 'Car', '2025-12-11 13:13:15.687335+00', '2025-12-11 13:13:15.687335+00');
INSERT INTO public.car_rental_companies (id, name, type, image, location, description, rating, offer, icon_name, created_at, updated_at) VALUES ('2', 'Prestige Auto', 'Véhicules de luxe', 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Les Trois-Îlets', 'Louez des voitures de luxe et profitez d''un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.', '4.8', 'Un jour de location offert pour toute réservation d''une semaine ou plus', 'Shield', '2025-12-11 13:13:15.687335+00', '2025-12-11 13:13:15.687335+00');
INSERT INTO public.car_rental_companies (id, name, type, image, location, description, rating, offer, icon_name, created_at, updated_at) VALUES ('3', 'Eco Drive', 'Véhicules électriques', 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Le Lamentin', 'Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l''île.', '4.5', 'Recharge gratuite et 10% de réduction pour les membres du Club Créole', 'Fuel', '2025-12-11 13:13:15.687335+00', '2025-12-11 13:13:15.687335+00');
INSERT INTO public.car_rental_companies (id, name, type, image, location, description, rating, offer, icon_name, created_at, updated_at) VALUES ('4', 'Aventure 4x4', 'Véhicules tout-terrain', 'https://images.unsplash.com/photo-1533743410561-5c70e1a14cc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Sainte-Anne', 'Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l''île.', '4.7', 'Kit d''aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus', 'Route', '2025-12-11 13:13:15.687335+00', '2025-12-11 13:13:15.687335+00');



--
-- Data for Name: car_rental_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.car_rental_features
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('1', '1', 'Véhicules récents', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('2', '1', 'Assistance 24/7', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('3', '1', 'Kilométrage illimité', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('4', '1', 'Assurance tous risques', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('5', '1', 'Prise en charge aéroport', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('6', '1', 'Annulation gratuite', '2025-12-11 13:13:16.191004+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('7', '2', 'Véhicules premium', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('8', '2', 'Service de conciergerie', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('9', '2', 'Livraison à votre hôtel', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('10', '2', 'Chauffeur disponible', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('11', '2', 'Assurance tous risques incluse', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('12', '2', 'Service client VIP', '2025-12-11 13:13:16.295437+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('13', '3', 'Véhicules 100% électriques', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('14', '3', 'Recharge gratuite', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('15', '3', 'Bornes de recharge cartographiées', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('16', '3', 'Assistance 24/7', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('17', '3', 'Kilométrage illimité', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('18', '3', 'Conseils d''éco-conduite', '2025-12-11 13:13:16.395956+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('19', '4', '4x4 et SUV tout-terrain', '2025-12-11 13:13:16.492043+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('20', '4', 'GPS avec routes hors des sentiers battus', '2025-12-11 13:13:16.492043+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('21', '4', 'Kit d''aventure inclus', '2025-12-11 13:13:16.492043+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('22', '4', 'Assistance 24/7 sur toute l''île', '2025-12-11 13:13:16.492043+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('23', '4', 'Conseils d''itinéraires personnalisés', '2025-12-11 13:13:16.492043+00');
INSERT INTO public.car_rental_features (id, company_id, feature, created_at) VALUES ('24', '4', 'Service de dépannage spécialisé', '2025-12-11 13:13:16.492043+00');



--
-- Data for Name: car_rental_reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.car_rental_reservations



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.categories
INSERT INTO public.categories (id, name, slug, icon, description, sort_order, is_active, created_at) VALUES ('1', 'Location de voitures', 'car-rental', 'car', 'Location de véhicules', '1', 't', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.categories (id, name, slug, icon, description, sort_order, is_active, created_at) VALUES ('2', 'Restaurants', 'restaurants', 'restaurant', 'Restaurants et gastronomie', '2', 't', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.categories (id, name, slug, icon, description, sort_order, is_active, created_at) VALUES ('3', 'Loisirs', 'leisure', 'entertainment', 'Activités de loisirs', '3', 't', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.categories (id, name, slug, icon, description, sort_order, is_active, created_at) VALUES ('4', 'Hébergement', 'accommodation', 'hotel', 'Hôtels et hébergements', '4', 't', '2025-12-19 03:01:45.176844+00');



--
-- Data for Name: concerts; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.concerts
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('1', 'Festival Zouk & Love', 'Kassav'' & Invités', 'Zouk', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Stade de Dillon, Fort-de-France', 'Le légendaire groupe Kassav'' revient pour une soirée exceptionnelle dédiée au zouk. Avec des invités surprise et une ambiance garantie, ce concert s''annonce comme l''événement musical de l''année en Martinique.', '15 juillet 2024', '20:00', '45', 'Réduction de 20% sur le tarif normal pour les membres du Club Créole', '4.9', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '[]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('2', 'Nuit du Reggae', 'Alpha Blondy & The Solar System', 'Reggae', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Plage de Grande Anse, Guadeloupe', 'Alpha Blondy, l''une des figures majeures du reggae africain, se produira pour un concert exceptionnel au coucher du soleil sur la magnifique plage de Grande Anse. Vibrations positives garanties!', '23 juillet 2024', '19:30', '38', 'Un cocktail offert sur présentation de la carte Club Créole', '4.7', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '[]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('3', 'Soirée Biguine Jazz', 'Martinique Jazz Orchestra', 'Jazz & Biguine', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Théâtre de Pointe-à-Pitre', 'Une soirée unique mêlant les rythmes traditionnels de la biguine aux harmonies sophistiquées du jazz. Le Martinique Jazz Orchestra vous propose un voyage musical à travers l''histoire des Antilles.', '5 août 2024', '20:30', '32', 'Places en catégorie supérieure au tarif standard pour les membres du Club Créole', '4.8', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '[]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('4', 'Carnaval Électronique', 'DJ Snake & artistes locaux', 'Électro / Dance', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Plage des Salines, Martinique', 'Le célèbre DJ Snake vient mixer sur la plage des Salines pour une nuit électro mémorable. En première partie, découvrez les meilleurs talents locaux de la scène électronique antillaise.', '12 août 2024', '22:30', '56', 'Accès à l''espace VIP avec une consommation offerte pour les membres du Club Créole', '4.4', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '["https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.22959222772360344.jpg"]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('5', 'Concert Gospel - Dena Mwana', 'Dena Mwana avec Samantha Jean & Joella', 'Gospel', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6554647351380227.png', 'Palais des Sports du Gosier', 'Venez vivre une soirée inoubliable au Palais des Sports du Gosier avec la voix céleste de Dena Mwana ! Un concert gospel puissant, rempli d''amour, de foi et d''émotions. Préparez-vous à chanter, danser, prier et vibrer dans une ambiance spirituelle exceptionnelle.', '14 juillet 2025', '17:00', '40', 'Tarif préférentiel à 30€ au lieu de 40€ pour les membres du Club Créole', '4.9', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6554647351380227.png"]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('6', 'Festival Terre de Blues', 'Artistes Blues & Soul', 'Blues', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.532889938866222.jpg', 'Plage du 3ème Pont à Grand-Bourg, Marie-Galante', 'La 23ème édition du Festival Terre de Blues vous invite à découvrir les plus grands noms du blues dans un cadre exceptionnel à Marie-Galante. Un festival de 4 jours avec possibilité de camping sur place pour une expérience musicale complète.', '6 au 9 juin 2025', '18:00', '60', 'Tarif préférentiel à 45€ au lieu de 60€ pour les membres du Club Créole - Forfait camping 4 nuits inclus', '4.8', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.532889938866222.jpg"]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('7', 'Festival Zouk & Love 123', 'Kassav'' & Invités', 'Zouk', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8', 'Stade de Dillon, Fort-de-France', 'Le légendaire groupe Kassav'' en live avec des invités surprises.', '2024-08-15', '20:00', '35', '10% de réduction pour les membres', '4.8', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '[]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('8', 'Nuit du Reggae', 'Alpha Blondy & The Solar System', 'Reggae', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea', 'Plage de Grande Anse, Guadeloupe', 'Alpha Blondy, l''une des figures majeures du reggae africain.', '2024-09-10', '21:00', '28', 'Entrée gratuite pour les membres premium', '4.6', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '[]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('9', 'Concert', 'Laurent', 'Zouk', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6958172857429759.avif', 'Pointe à pitre', 'Petite description', '15 juillet 20025', '20:00', '30', 'offre de 10%', '4.5', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.6958172857429759.avif", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.21359084156126018.jpg"]', NULL);
INSERT INTO public.concerts (id, name, artist, genre, image, location, description, date, "time", price, offer, rating, icon, created_at, updated_at, gallery_images, partner_id) VALUES ('10', 'GIANT', 'VARIETE ZOUK', 'Zouk', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.3160535654577926.jpg', 'Palais des Sports du Gosier', 'GEANT''S fête 30ans de tubes, concert en Live avec Yannick CABRION, Johanna NOCE, Olivier DACALOR, Fabrice SERVIE, Jocelyne LABYLLE, Willy VERVERT, DASHA, Yvan VOICE, Joël GREDOIRE et quelques surprises inoubliables.', '05 Juillet', '20h', '40', '30 euros au Lieu de 40 euros - limité a 2 Billets par adhérents soit 20 euros d''économie', '4.5', 'Music', '2025-12-11 19:09:50.958188+00', '2025-12-11 19:09:50.958188+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/concert-images/0.3160535654577926.jpg"]', NULL);



--
-- Data for Name: leisure_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.leisure_activities
INSERT INTO public.leisure_activities (id, name, category, description, price_per_person, duration_hours, min_level, max_participants, equipment_provided, professional_guide, icon_name, created_at, updated_at) VALUES ('1', 'Plongée sous-marine', 'diving', 'Découvrez les fonds marins des Antilles lors d''une plongée sous-marine encadrée par nos moniteurs professionnels. Explorez la vie marine colorée et les récifs coralliens magnifiques.', '75', '2.0', 'beginner', '8', 't', 't', 'waves', '2025-12-11 13:13:18.748769+00', '2025-12-11 13:13:18.748769+00');



--
-- Data for Name: loisirs; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.loisirs
INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES ('1', 'Randonnée Montagne Pelée', 'Découverte de la Montagne Pelée', 'Saint-Pierre', '2025-01-15', '2025-01-15', '20', '5', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800', '[]', NULL);
INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES ('2', 'Kayak dans la Mangrove', 'Explorez les mangroves en kayak', 'Le Robert', '2025-01-20', '2025-01-20', '12', '3', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', '[]', NULL);
INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES ('3', 'Plongée aux Anses d''Arlet', 'Plongée sous-marine', 'Les Anses-d''Arlet', '2025-01-25', '2025-01-25', '8', '2', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', '[]', NULL);
INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES ('4', 'Tour en Catamaran', 'Naviguez en catamaran', 'Le Marin', '2025-02-10', '2025-02-10', '25', '12', 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800', '[]', NULL);
INSERT INTO public.loisirs (id, title, description, location, start_date, end_date, max_participants, current_participants, image, gallery_images, partner_id) VALUES ('5', 'Visite Distillerie Rhum', 'Découvrez le rhum martiniquais', 'Sainte-Marie', '2025-02-20', '2025-02-20', '30', '15', 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800', '[]', NULL);



--
-- Data for Name: loyalty_cards; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.loyalty_cards
INSERT INTO public.loyalty_cards (id, user_id, card_number, tier, status, total_savings, expires_at, created_at, updated_at) VALUES ('8ad51384-fab7-4927-95a2-976eec6b5611', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', 'CC-017461', 'premium', 'active', '45.50', '2026-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00');



--
-- Data for Name: newsletter_subscriptions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.newsletter_subscriptions
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('3', 'test-website-1766323162875@example.com', '2025-12-21 13:19:25.542621+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('4', 'test-website-duplicate@example.com', '2025-12-21 13:19:25.88477+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('6', 'invalid-email', '2025-12-21 13:19:26.108306+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('9', 'test-db-fix-1766324372434@example.com', '2025-12-21 13:39:32.705283+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('10', 'browser-test-1766324396@example.com', '2025-12-21 13:39:59.196524+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('15', 'newsletter-fix-1766324805449@example.com', '2025-12-21 13:46:46.989653+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('17', 'cmoinster@gmail.com', '2025-12-21 18:02:27.971913+00');
INSERT INTO public.newsletter_subscriptions (id, email, created_at) VALUES ('18', 'meryl@hotmail.com', '2025-12-21 18:03:34.260312+00');



--
-- Data for Name: nightlife_events; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.nightlife_events
INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, "time", price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES ('1', 'Soirée Zouk & Kompa', 'Club', 'Le Piment Rouge, Fort-de-France', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée endiablée au son du zouk et du kompa avec les meilleurs DJ de l''île. Ambiance garantie jusqu''au petit matin dans le club le plus branché de Fort-de-France.', 'Tous les vendredis', '23:00 - 05:00', '20', 'Entrée gratuite avant minuit pour les membres du Club Créole', '4.8', '["DJ Live", "Piste de danse", "Cocktails spéciaux", "Aire VIP"]', '2025-12-11 19:17:55.466496+00', '2025-12-11 19:17:55.466496+00', '["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, "time", price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES ('2', 'Beach Party Sunset', 'Club', 'Plage de Grande Anse, Guadeloupe', 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Dansez pieds nus sur le sable au coucher du soleil. Cocktails tropicaux, musique house et ambiance décontractée face à l''océan. L''événement incontournable de l''été en Guadeloupe.', 'Samedis et dimanches', '17:00 - 01:00', '15', 'Un cocktail offert sur présentation de la carte Club Créole', '4.5', '["Coucher de soleil", "Bar sur la plage", "Feux d''artifice", "Animations", "DJ Live", "Bar Premium"]', '2025-12-11 19:17:55.466496+00', '2025-12-11 19:17:55.466496+00', '["https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, "time", price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES ('3', 'Casino Royal Night', 'Soirée Club', 'Casino des Trois-Îlets, Martinique', 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Une soirée glamour au casino avec jeux de table, machines à sous et spectacle de cabaret. Tenue élégante exigée pour cette expérience luxueuse dans l''un des plus beaux casinos des Antilles.', 'Tous les samedis', '20:00 - 04:00', '30', 'Jetons de jeu d''une valeur de 20€ offerts aux membres du Club Créole', '4.7', '["Tables de jeux", "Spectacle cabaret", "Dîner gastronomique", "Service voiturier", "Terrasse", "DJ Live", "Climatisation"]', '2025-12-11 19:17:55.466496+00', '2025-12-11 19:17:55.466496+00', '["https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, "time", price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES ('4', 'Soirée Karaoké Antillais', 'Soirée Club', 'Le Ti'' Punch, Pointe-à-Pitre', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg', 'Ambiance conviviale et décontractée pour cette soirée karaoké où vous pourrez chanter les plus grands tubes antillais et internationaux. Cocktails et spécialités locales à déguster entre amis.', 'Mercredis et jeudis', '20:00 - 01:00', '10', '2 cocktails pour le prix d''un sur présentation de la carte Club Créole', '4.5', '["Plus de 5000 chansons", "Animateur professionnel", "Petite restauration", "Terrasse", "DJ Live", "Climatisation", "Écrans Géants"]', '2025-12-11 19:17:55.466496+00', '2025-12-11 19:17:55.466496+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.9641419991507731.jpg", "https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"]', NULL);
INSERT INTO public.nightlife_events (id, name, type, venue, image, description, date, "time", price, offer, rating, features, created_at, updated_at, gallery_images, partner_id) VALUES ('5', 'Soirée de malade', 'Soirée Club', 'Le Gosier', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif', 'Test de soirées', '15 juillet 2024', '20:00', '30', '50%', '4.5', '["DJ Live", "Climatisation", "Bar Premium"]', '2025-12-11 19:17:55.466496+00', '2025-12-11 19:17:55.466496+00', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/nightlife-images/0.7452050189360258.avif"]', NULL);



--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.offers
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('1', '1', '1', '15% sur les locations', '15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole', 'percentage', '15.00', 'Valable pour les locations de plus de 3 jours', NULL, '2025-12-19 03:01:45.176844+00', '2026-06-19 03:01:45.176844+00', NULL, NULL, 't', 't', '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00', '0');
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('2', '2', '1', '15% sur les locations', 'Recharge gratuite et 10% de réduction pour les membres du Club Créole', 'percentage', '15.00', 'Valable pour les locations de plus de 3 jours', NULL, '2025-12-19 03:01:45.176844+00', '2026-06-19 03:01:45.176844+00', NULL, NULL, 't', 't', '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00', '0');
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('3', '3', '1', '15% sur les locations', 'Kit d''aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus', 'percentage', '15.00', 'Valable pour les locations de plus de 3 jours', NULL, '2025-12-19 03:01:45.176844+00', '2026-06-19 03:01:45.176844+00', NULL, NULL, 't', 't', '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00', '0');
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('4', '4', '1', '15% sur les locations', 'Un jour de location offert pour toute réservation d''une semaine ou plus', 'percentage', '15.00', 'Valable pour les locations de plus de 3 jours', NULL, '2025-12-19 03:01:45.176844+00', '2026-06-19 03:01:45.176844+00', NULL, NULL, 't', 't', '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00', '0');
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('5', '1', '1', 'Test Offre 1', 'Description test', 'percentage', '10.00', NULL, NULL, '2025-12-19 21:24:42.366725+00', '2026-06-19 21:24:42.366725+00', NULL, NULL, 't', 't', '2025-12-19 21:24:42.366725+00', '2025-12-19 21:24:42.366725+00', '0');
INSERT INTO public.offers (id, partner_id, category_id, title, description, discount_type, discount_value, terms, image_url, valid_from, valid_until, max_uses_per_user, max_uses_total, is_featured, is_active, created_at, updated_at, sort_order) VALUES ('6', '1', '1', 'Test Offre 2', 'Description test 2', 'percentage', '15.00', NULL, NULL, '2025-12-19 21:24:42.366725+00', '2026-06-19 21:24:42.366725+00', NULL, NULL, 'f', 't', '2025-12-19 21:24:42.366725+00', '2025-12-19 21:24:42.366725+00', '0');



--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.partners
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('1', 'Caribbean Cars', 'car_rental', 'Une large gamme de véhicules économiques et compacts, parfaits pour explorer l''île. Service client réactif et tarifs compétitifs.', 'Fort-de-France', '0766334653', NULL, NULL, 'https://caraibeancars.com', 'Standard', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fort-de-France', '4.6', '15% de réduction sur toutes les locations de plus de 3 jours pour les membres du Club Créole', 'Car', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.5118801187394677.webp", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.22309226936635995.webp"]', 'approuve', '0', NULL, '2025-05-24 13:50:19.424963+00', '2025-06-21 23:20:47.181831+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('2', 'Eco Drive', 'car_rental', 'Louez des véhicules 100% électriques pour une expérience écologique. Contribuez à préserver la beauté naturelle des Antilles tout en explorant l''île.', 'Le Lamentin', NULL, NULL, NULL, NULL, 'Véhicules électriques', 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Le Lamentin', '4.5', 'Recharge gratuite et 10% de réduction pour les membres du Club Créole', 'Car', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.47078855970340283.webp"]', 'approuve', '0', NULL, '2025-05-24 13:50:19.424963+00', '2025-06-19 20:54:16.034176+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('3', 'Aventure 4x4', 'car_rental', 'Spécialiste des 4x4 et SUV pour explorer les zones moins accessibles. Idéal pour les aventuriers souhaitant découvrir les trésors cachés de l''île.', 'Sainte-Anne', NULL, NULL, NULL, NULL, 'Véhicules tout-terrain', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.3809859978228771.webp', 'Sainte-Anne', '4.7', 'Kit d''aventure offert (GPS, glacière, guides) pour toute location 4x4 de 3 jours ou plus', 'Car', '[]', 'approuve', '0', NULL, '2025-05-24 13:50:19.424963+00', '2025-06-21 23:04:25.939735+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('4', 'Prestige Auto', 'car_rental', 'Louez des voitures de luxe et profitez d''un service premium. Notre flotte comprend des SUV haut de gamme, des cabriolets et des berlines de luxe.', 'Les Trois-Îlets', NULL, NULL, NULL, NULL, 'Premium', 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Les Trois-Îlets', '4.8', 'Un jour de location offert pour toute réservation d''une semaine ou plus', 'Car', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.08634293782105629.webp", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/car-rental-images/0.05391484236992927.webp"]', 'approuve', '0', NULL, '2025-05-24 13:50:19.424963+00', '2025-06-24 22:18:52.359+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('5', 'Tropical Tours Martinique', 'Agence de voyage', 'Expert en circuits découverte et séjours sur mesure', '25 Avenue des Caraïbes, 97200 Fort-de-France', '+596 596 87 65 43', NULL, NULL, 'https://www.tropical-tours.com', '', 'data:image/avif;base64,AAAAGGZ0eXBhdmlmAAAAAG1pZjFtaWFmAAAA3m1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAAA/gAAISAAAAAjaWluZgAAAAAAAQAAABVpbmZlAgAAAAABAABhdjAxAAAAAAxpcmVmAAAAAAAAAFZpcHJwAAAAOGlwY28AAAAUaXNwZQAAAAAAAAJsAAABkAAAAAxhdjFDgT9AAAAAABBwaXhpAAAAAAMKCgoAAAAWaXBtYQAAAAAAAAABAAEDAYIDAAAhKG1kYXQSAAoKP+YmvHl4CGg2gDKPQmaF7j9DIRX4/8AgYBCIAAAAAAADS2CYISQqAADaBgfmc6r/xA+zRvmZKJfcvyy/BNmzPJxUK/AwVdqbtHXK6MtE/RkgdwjUc7xpp52hmUkAjvNbWhrV1DNzK/Feu11/GRC9LEB24ZT11vIXIXJKlsGpKPRV9eNol6XVoL7umhHr5Iwd5ZhfEo8LBEeqPc5mjeMyEmhm7V+O58i+3YJqIfrD9r7p9MO6sW+w8z8aRHaQYLZKTEXsbvIImdfRAED12e697OK4uRqK/o1GDab3QECxgJx+QyCpFLoVwQ2be/S2YtW2GZwQk1+nKfDaMjp5u0JU44dq/rHcJI9zmhUIy4E2qXO1wWQeZ9WVGFOCSwIGp7vexAr5YbdHSaIXT00FKpgx2AMEmDP7Z2HLr7haKZGQK2aRjT96bYn74s54/DGCuzodZk+2CO4E7EfWwcVbUlSg1Yx9cY7jbGSb0SCCzjTxKIamokR5gJKw94YVEYHsDP1iN1hHnR9sCQUhXTGQaKAWge0W/oiiaPBe+syPGbGfGqPQwD/QXhDF2r6Z6XM2HGYAEkPCBWudtt4H/6h6VCZo8nLKWG1MkTtt5ehY7X7rTx7v5yxqa+CmPs59yXbGLpPN5UYEfgecgWjXCsckqynlhM01Q8mONasiswLi3+6TsBniJVzao1nFJ5Y5dkxLYKd1JOAMjWJ4NK1y16TuXKbpuIEPtMNGgIE1bpCpXI7F2y0PLmU6rQJ5x7O9qwB6EVL83OwxYNJuWpbm4RuIR/2KHSoNQBukf7wvkBfayd2breed5nWYyIirMkzYGwPwoRrd5hUtV2KgFdHzZ5Akw5lfTE4EglaSWH72709QgbkVlGqRHvFEn8o0FPx5B8wDSXV7GXWAdYbKVyArxTVqXpQJJeieFXlpnjOWWKABTwu5cP9xuzhes5WQltVWBfteEGANglztXmCIYKHeb4ZM0S1Fpjmt7Hc9SBjDDk74PshGiRHQB5lF1T+6md9xVybxwEXNRUxAp9J7Mmz9q6ML2h/c+3viZDN7hl7vFh7/gkqxNehgOeYJvf3ADM+yov0bIs6yHdbIwatIGFfSwdXTTf9M0SWJUzuL7OpPAVMO0M5XYv3xFMqM6XdcWjyB5j6k2G4EsF8w6Jx5OfoqK3Np0Ee6x6BOJ0JYZthehtSi8WTH48JGehvGLjTtMcJwbmvaQh40TceNcLqO9FRRgndc44wDpOxwizYH3AMtsckUOjuL5DdPWdSoeIeIi5pNCUk9jQYXMkszzVOeZbKb+2uq2YPOn4AwTzF2kMeE9iZr1bQUlMLzX7kqSOU7CN+E6fidFXkee2n9EvKnNTg9sMNXrS22uXCHD/LV/wcoOklJr/8eB+8E0ia9A//Lm/Kav2D1o5kyFF/0q9Y3nnY1rHRK15OgZD/QwxZxX6KVfxos2TsCMzOs3khiUlHZCFAt7/wJWoiaNFePXdKoGDP8YSWhheUdG7GWYlnUGpdLsdxNJJFPLVbXj3Eyr680kP67NGLiMHmGAd6lvmFtONbUqtWZ70dcurhMWJQCg6rKiE2bGaziFgl5OI5NbL0H4G1qJe1k46N4qdKD3cGuH+SdZFgRdn9584CgivTISzKTMvAax/m+bltECXrSIaIA9EkpeIKJfXQ12GCG7p87+FVeaxaQPHsb9rFDTScYRKUq+orQ7h8/5ydhTcOgHpUNXRkixWwFMVqbScLacQlQ0aqWsZyyMBOvUqrkcPjRcFzA0eluhvq7j+0C0AP+0oojnVC3xCLnwo95XKQFgLBP6ERXP/cwwIjPrWQ+sGS5dv5hvUC0nFWHE+wh/1UvvLw0w5N9NRY0EbEreMUZLbrOLIBpaHDr2poN+mEZvalk1L6ygg/6P9VsHNayagJpv8y0MacG6JmbbVgrISnwiKkzsUGFFhQXkfZPYbvq9wQ6NuwOMN9DjzV9zgP7uhWXsBU8UZQ+y8gtdImC2wbGG53gEb2lkWEYfCHFEzFH9AyBSrRVOqnCyyHZx+benhsOizUkca6gQLNz6xgQjn96ENsTsWHYIouQeB4kgn5jY2Uk7hZ5MCeIw+LhSAU4rIAgBQinq3w8+yYOYG4OwZDgW1awLC9KaXitVKGxg9a6LOkPwWMTyjFyhouf+plGH7DgL09SQjH2mRKlHuiTvdzG1QlZj1x3HNcHRSKHISXl0+pqnQgWE7cqPgfX8NpOhWOwBKVK6mvM5iKilJa9ru/gpk9Ky6hlzwEY5AULMQv02Rq9bGwVwHcWUGN3Wy2+LXCGSqWGd6swrBSKOlwduHskA9T1PX5fdTE3/EWJ1sHZgxtj2zX42KbJxpqwyeK5VJ2KYpgNcqWqClB9FbR1Qg73WPfDkAqwiClZOo/dvXamX5NRlPAKB+Zx7DLA2LBJjDyIVcOllRczvYbYhlKKCYaE+CVZ8WHuxEGgl1fZhRmIAEgMNUzWr5azqkw4sEKJRezi0KvkKFviwTFOidAuASbdX/O5SLo0rXYkD4w3HqwZalgmsVKNkVRncpuFOUDYg1/ypkpsJ6sjcg+ze6xoJSiNPgUPBNoD0pmpH7rv07ePNTQwRTi/mL1EHJUNFMBeYxQbwatwrky9G5BAaYKhTPyg5umkjwZ267GShwlgb6ZJkZ0clf0WZ8HN4rnaJWHSXiqbtz/HFKHzncFoXFu8J8dojuEIpxDZP30VtlHWdKp2aW4YxsWsRftatCgQG32urgRSm8Q7PTXAdekYi0MCGKgT6Lq70O2TXCUCNDXauiBjLfO7DjyBJ/Z/Wo86QnxScxoerNkOqum1m5msIOTfKoKBW959lfO/YKkxmo18dWPWxKe7A3bMTQZfHvZx3JRw3EbkwA7NSqTuu1A377X10qJ4z6CpUGeEYwIiph/SFSzFqqKI0A/7OTl2crGrOHgTjQaSBpxkgzoOQMj1TDsuHNnTViUBOt2wDFJ4qk3owkFvdPHIyBevTi6kjOShF3GILEAdmSP3EOy/ZbOLfucNfm3DyBejGXMFeT4Abj1v6KAeEjm/ujzCxuCgTvSIgY8XbNm+e1Kv5bjB9Y3WzYm2jroOHlfqN8FizndXQrcI7u0Ih8/71qFj0yc0ZhF7SjKDEl9xZxbSJ4VIY8BROe0evU1qPYwoYItT21LCzeyCilZV4Wr6ezBNR2b6dUZwrxOyXhDlRQ2BaEEqrJ7fiTFb2DsfcE9vw4P0c0rM0kkm7CInz9pvb/c69QVhwR0wnCyE+U45hJTGUKMZvx1QRD3hZaouR0FR14+dkM23Ek9uV4kqEJk/JUeUod+37ePCweUsjWMNoJJjm15j3Yg9v7CLyah6LbSEM1X++Z/YYpzNyNzTi0KoeuQazEdUP7DxgtiSx3TbOeWxwNYSlFTHl68wPhutWdjJT7ropWvDR1NzIrDMuBD1bFWnLY/72A4xqywx3jy1Gmxcvi8rhFyxu+s49jUcvQBQuha0/OXYbtm+rFAiE/VxC4LN7XI7iWFZ0TyrXTixqKpOkK6fmT5E+80a76mCZ7Vy7Yd232YkH1LdrubKi2Px57zkGnDnoKu9xZD7TzsSiyQ7toDM8ej2GTSeyEC76I+TH00HyWIgxgqfizs8Esx/qfhsDbnt3lItMDzYsBu6aV/59q5w3Uv4yTzqfTm/+fp3KXruNTNtmnwPAk1LslzeLzXNjgEVvpgjMS+Fd5J9sTePtI3b8Ld24Bnh+1/Vh9HrEtU5D3OyiiDDetjvKtAHvmkXtTnH4IKadyczVwAzGn+epKLAJjS95R2Dotqq578L9U9ZUNRkrp9AJFA4QUuqvv0e9EwmTLVPfY+8g4oxoYy2Dt9hfumLGfiSvDB/pqA+N8Fcva4EU3V56Wm8M8N3WHNR4AKuzT9G29HJrekIyOUf7DRUIwpPafGtqp3j9goOCyxvsOlyFE5sAxD+jW3UG5awZfs/pq3FPVTI8Adkl+5oQSP8kPZgMwhHa+/J5Y7RfhlavP9M83nhIoNg+HDqwargBNKMzMni/r231PxK0Zp5zIecDGan1h8stmTXtJba5RFOf5886kyvy3zHBlpVAGAksZlt1qz7TTozODEZIzCUNPuvPU4HM4M2nmDfPKp5WZoJyk/25vhe50pve1xoGKHT/g7DhVyRqduxlm+sc4tBBYZQjXw3qmudiWlPB7o1ruIYL5aRoaQgvtYkAu6kQvL9hF4RoQiC4c8qstrZ4BnXikF2IMpcuj38Mq8ipoUTtg/glTQXkFnnrueVxkQZWZz1fV3Ki6cf+WdTBulOqM2CTvL49w6uVrBzFnRFvGcfBL0X3evyQLnBSqnCu5pk2UnEfUAdxRTJQHTh0tJj0CHmkQKTvJ9pvQfdpxGv5Iy1aJcdZxSz1gpJI6CSn6bJvPjSomlYCew5suaWBySlPNQY7EkpDtRAgNroNDlsny5Kkj2n4egW9tUOV1uKsRbk/wm1hbmnULGo9JuZtfkxkaJ6Aaay3+UBMrf6jwWHX9BIWJqgQjaWEFH9ZzXvhwkqHu4ly6kitqJoxPIgbu/BKnvg+McJ1EJx7PgznZeX9MMoa2kNMSBHrt1BRnTn9/jK5QUvFwIj92GYhPNZsJ2oPKZZ48ewCysZkacdYzi1AnaffKY2KtFWr9rLs1yiN2GHzz2pv2qognfkQ+QdoKIt+pCFVzT7Yov/UohQWUXmWgfAlhJs1fVpgfUPA0kxOajhownGSjIIELiF+cFkAbbaZpUPIqQjtJ3n/Jqz8ieD4empMXXY61uGgff9z2P62GFzO3qKC6qaY9Pi7ehSECrPf0h1yJeYzgPviGIr9RdQeaedirWhXZI8ioxT6IHs2Ru203FSERbeh2o2XXsxIFS5LOWemL3WHugPmaXqAS1+3aJ1W8hfaszB1lJwqaPDqzj4zdBLEHFfRgEIR7CF81U1lw9b0wj8f1KflX4gTdRPaheKt36xz91afdK326mBOVrZ1qQjHNT2Cv/tPKYc2mCe8U398HNXigTErc2ypXQ2jw0+AZ8PrHLdndQkkiY/pyjSQS9lUgdbjAA7qfDduRApvqk+pNdcq/Dl1Jv9TVdIRjMjH/8h4pWLtFpQeUuWhUTtUg59NknkI8mN+Qo7TFal79NAlkXh3BT/CDDKam5qqMphPqYFdbkkNodD/RgDe/5IvEOujep128eFvxgaeBUTqG9dd1rAVxH+1HBuwGqrFKN8uTlytioxA7O26ROPBo8pWOuY5E3mz38GBlkW0cUJUYdOqzRxO5NfjLBTTti7Zwmn9yoCchEnMXZ3tOHRPu47gjZUV1cTmxpM21L1blxO8az818oO5khyD1NG9hnD0BSSoc8sPEok2lSSXm5NFsSnYp7RLLLEHeemRuarLuUj4S5N/Q5nKzY5H/JxRAfjvXMV1PWIyEnPMZ+pEHRUnntUB6vTMWa1/PS603A4/9bYi7DR1lH/8quWXYubrB5uuPMK9BfzVaynEPZZ8AWhVbftyK4PlxVeL1/dO5IngpafjtNRTnUXd4DATQ4jh2jpmve57tGvs662XOifLhX00maLRzrorJ9RG4TuMGiZ0aQE4utjq03PizrgP2EPRPh4g6Hl4DW7XqUlNn9J2jpI4h+/orJe3H/b6zuk6+iaakMy6z0y0rc0j6j0X5ByiJ6yE1QuR2eXGnqPajt16HXUnIKfoTZsa5uCNfocDSkQ2xVqSI+cKEOu0NI1crcT2zLzW3qpPqTKPnsgjbzls8THBnrclMokbTK2JspazrXoLsuU93MVnLU6lGa9vEGFM6TnopBOt4eAsG8rLKj2aW1LfbeaHU8y2GKIW1cTrRfedWnlLxCyWFB/5gw0vit9pedOD6UOeaYVDXtFr1C5SRN8/OJndfzW1jGHaO8PMP6GBZvgMeGDZ/Xh0CW48/AAxnI/0sqeohY6XJwNGyfmDUhk/4IbWdQW2SuseYKuQyfjlSk3kKc5Xt4R/+4zaksGqRRAjS8ypSLe92yBFenLSMhDsw8ni4F6n1RUNlqRIAveybYJ2hub0/3VzIJEpU9dMFnXceCLccT0E+2YNyf0BtMd9PwfUXvTRR+TrAiZ/1TXNgVeGQE3kE2NPZsjr6bz3t4tA+LcblW5O4Uhjwx6pj33gyXNMzDUNh231OuJNFGsgCCGQfQHCFgpCAfotqf9DJewyhWuBhJMnzMn9nZb8pA5HcSWZAwYNGAgo2U3VG/F4V5ma3rv+fMrVeqsT75ACfpeoSpkrLSwyhM5Ua364mjashruBqyMDmrH4oHJ6L4G4fmi6uMZp6hsrm5GZSeiULw+wBctVKq5y+f/0td7aocbMwpy/3ysElQpyrLFDB8lfcbK8lqJftm74T/3FlEIUiSmYDXU+bvKvU2WUYipO4HPoyxH2BjksqaunEKS7ZCc91/aNSU8mAVm2j+Eqihg/3giEmkn4FCwFtMeX2sGLN57JgPuIg5xFhzk+YX8jQ3VumtGMOJfDA+pA5O5BB9JW9680QlK70OSsRK71ETqQ6s2FmgEH390P2Ap27T9vFacEvxCk0nXhNKhRB0ejhlAcNOSUUSZHMWPZLIVULWTjWccXTThYOsCMyYXRP2gtqT1R2p2gcz6NtkY1KM+zAso4HBEfKZi3/ATK2zWxeSIUUnFeO2ajwnhxVm67OLwiWnxv7X13WNymezzW+zEHHnQWFgmRRrk7PkwzHpwgdq3bTKfeieirLNrQxEh7WDWHG8ihZmPDT0jM3pJ6o29VZheHDel25uilj4vCUh04a7LKA0A2hvORr4TypLCE+4jToNWIyi3Z/hBfq+iq7qi/1TuAQRSX/g8v0oiG9yv2hYMLUUMVk/s8nhters19UgymTS6kyNAbM8sAZdyYaXOd68X1Bt6E1iJKSeeY3BZYhM0A7lR6NZzknHWXdDH65nzncTZwlDyOuFO62bNJNEo9T7YXc0deG9x08ApnbfpnVtqLl32Wyj/DGK+Q7PKO/um5sl5Z72D98Jk7ZhuoU+QIyuox6/KgiEynsRDEBDMQNgy9zGDWyYrKMHslR3WQ6qv/54o7rg5cZLtJQoDRQD0sNLlwzQm7azHgdE5DgsspxAquy4TDTKaHxA/5mADg1JdZ0OD0DMUnP5/oMTB2Sz7JePgCOsTXqAw2V28gQBHLHHaC+JZh0uV5Hw46WzyQeKYIutzs+ejFe7WSPF1EEECuU3B+n/CAUxyfU1nzgaVaNSaXyyVV5BYTeHWkfuHbVNYN6kWkyzmixzqWpPOce6MEVkpPF+cOehQ5z/cqbpJysrHODCQrsr6kArbJw/o1ML96JQ1wl9pyMzjmRbAZIzgCf5Jzv/Y8h7kkay7ELq1LC1eAxrrJWpQGZPHjWqqrQrWSAo/4yjMbCzEofhgJkloxPUx1U5tXaeFBpDORLiQ7PPax670Ybei2zel/+aW+mcXgyusbyn2eloux19aNTBkdvmSB+jdMnJkrgJWKH08yJhb8NKtPkYjhrwUU2r1hNcKnSuMJjQ6GZKzylp0ouZByVQNREGAAD+Jgbo3CIfe0ThaYI2vshtY5R1Eq3MG3JHkzlvsr9dVeytR8cPm2iBFf3rbga2t0f/bLvfVGOGJgMv4vE1C3sH+P1EhZF+Ro3MhgrGsnQGXKx2bnigKXitHGq9AK/etEvfjcaswllf+oigQ7kca8qzNXai7Sedltv6Z6B3bTNeTlS83nEylKsJ2546Jy7lbx0gBx4gop/HHVsi51cYxPzn5PF0CSmbgk1hlHZh4/wvdArhA2/RT7b5/Z6OAe+JUFuP+t2iWclPjdqinmrS16j0EfjuA+2QnxstGI4+4JqaAwZfQfvHi2XqQL3XjDeHoshI7PGTKnEFt4QMC3tN3gbEP07331QOcw4RFoP7xF0SR7iVIvMAptLXCZRwVHxIVyShoP5zFm6OVuPrxIHc6vsq3iowq0mgJ3rL5nh7lJB/ihW9WQ2EMXOLpZbElQ5ydwORsuuqi3WB0v+Zxo58HQ5R4ynycLwrwtF+bxfXojOBTLzwFaRaNiS3LzXq3BW9X34vejqpQkHWIMZBX/CgOLL9aeSEqHMqGZZVenrhPEYczIXJ8Sde7J60A0SnUwZGu9YAvbSCMa0LLIqPdOfVWwx3WYhWM7WuMZnuHy0UMKntD4WWqLijg9YCxK7Nzg0x65iZ8FcqTJtSfJRaSnxfT/Z60UkOq6QlXCJXqUYC3SYu3BULpPFPWKimjKrWUG3IwPV7hULivnmH1U0TSa7MwNfJuuBevcJ0A/aSoOeTjZP9U9ZmtN1cYdn8d6RxnirTh4ySYJ+lhFW1QbamTf50wnMtKPMc1iHCmmmHJwPojsYeqbfGikrNruZ4+u48uRjuLLe1KIGjEMBbsA3wO1VaL1YzHkd4yvqg7CBBgVmyMsDCmNWlr2liSv+k+h4hJGqzfWtT77hLl3FBS6/EoHtOCvGPmvsFe+rpARDRdIw8bQXm3kILSWenAlSWjg5oFSP/lFIaMoFqNAPflVqjV0eBjEZOT0FGETb306MNiD5m3/AQl3YswagZRqdHljDbzM5Z91s1WZJEILhoa+dKF4lZ+ICJvXbWb08FQlzKv8lDjxw9YrIgK2PK24Dxai0j1oKaC4czGAyWfS3VrTfCVidjshdnoUYtGe9/N4CEjD0PMmGk/ZsOFfyQwrr8h5krWlPzgiYqmKX3l+UEYGuU2kSwK6Sr0DX64BnaLPedUPmbiTiCGvuNEy613Ezu2yMDQ91SV0FK4c847aEQuI84LJ0IBQHTQdTGzVBljmQzxjIDjpLqNoqAVYJ2At9SnWYMCqqKUyQ3C1F7Od1gmmFtGHB/QlMkKWoRc6cvsSspyMzysFTzzQOE6Vr3vnnMVUwRBUQna47Rfkazx4Do5ECu+aDwrmEY8NQNbEbc1zoa7cK/6olKf3slwuN/1dFtBYYX6SeF0KHVTmld+x8mMZB7DHggKe6goB+iwVYqcNthnFB37j0sOcfc6WxpfAf8z1lu3UxgW8bneY/0Je7ExjxuBnIWDcaiIerFhzcmc/hw+j5444iJw5XEeDJz8daNjIHdVH5tj8SAVzM4AEWnpZnhsX8eZUAG/Qezo/yWb/+ri3Z30IUDEfQVXhBlJVmEDfB8k2fdi145v0bGKZEw+w/xdKw/dJRIJ74Clsz2xqsXbnsuGjdUL8XhDQiqANs9auTAWzSOPr5ZxFrvZf7mQMKl9heOaPeVWWOPk7+NJKmL7LxAvJIW0j53Ijzfdj4xtPMWBNYLIQliqtvMsRhLdMQlnC7DFxfPFrYj/wexhNfNzq39KCIAdryZcKrtrD0PP1zi01cCTEkCjqc2o3+KdOlrivgG3VXczuRT+WuIGOzvnMxAQaJQog+icmNZcMIjBSEjLfyLa0f9ziQ7nMi4+IkAvpYtI1LwPUjOXxRzwZKGcznDPIG7vbZwxm+KwKNoZczTIajb6RU4OKgsWfzngFX2TZMiHNv3EX/1YbsnZoVE9xjJKPRHJp6T6eh00xqAkLKhjVa63TKSTYp2hiqcOtiu/kcUrl0NtW6h9TGoihWhTLbBChZnsCLCWesiEYS8gKcRMhWMEAO7U4Op+JQ3hIWQtrNQ1wGV6iUOo47dWK0aBN9iEks6mtperqrl891Bl+A3ROx7pkTCA7YsFzXsb1kSOognYB5MA7R2A6N99WvWxp+kT56jU3/3omQ9ydqlEkB6Jjs0/HvfrCQp61lxGwE0KEftMQ8y4lKUvlWFNbXrP1ewcK8Yk7ZEO84pV9I4QNhFhLpF4u+J/0BqHgsojILdA0qxhcErkxRtiD5hMwWbiFPF1tIEm9kJmQxOLcYNHrE+RgFRBki1XgnlBpaayg89b/3AgRFs4aP0fHilIrHoHecqNjMP2XO9s3TnbgKSevLalzNjrFEd1rzYxWoL/rcaIjvnwq0cHYb+hBjX4lrK3EI/tm3b1OiXnpJ0SQZ/FaXXw2vboPIe37bJrXMaLkQbRxJFv5rPlCt35EO03tcU8Hzkpkl9vvAqo/R010eBqwYd3dBd8z2sb4IYxMSD9JVQ3NeWh3H7AoJwCsMTGom04UQNWd/jWJohyIeWy1ebPYmkYNDhWBAcW8PckYKtRdr+5VLDt+41pgl8RyzH3MohRq088reK6JeIcE9HoKfxOZlis65al7I83SCYKzxVIvX1ochxGuj/CrKXT1Rbc+Yl6Wp7vBl13Su8bV7kcxFsLf7Xg4hANz2SAvay8gL9HtiReCdXim/VqR8Qv5OkNwCI3kR3EbHFfutLteHFSS08NJg0SbWAzFd1y36ZANDw9UJH5yzN5UvioajszAjt8Hl7zXG8TBWexNQQbxcPleCW1/Ia+cnRZETiKGgBgfASeewLUgssEK/F7yQgHx383km7SnM/Va3P4fZ471h/49g0wO6/6rH4Pt2LiPk0IBuR+cj5Rn7nH9NjoU4yA4t+cSweuftHffh+X9iR+uL9cNxEXWOBhBkMALIvO+bxbW0qmM4ZzGpkziIocgfo5RmM469LPvD0uQnQR+eDYo3xUkq1XF1IUBJl8FIrr47UF+JGT0tmxyqjkVKRVtohA3P6TqBZ7FRc+qqahOG+dMHr4KzjRymH2zAC1NzyzVPveIk0x43HjY6Gy0aodr5gvqpUIEqP/w8DxdQKIdn5cjZ9XO7MickaQ/azcAsl9FnzUL+Wl8xTJNMtMkm1Wt8GW2bIowkrQPSzD5RRTavidYRZyPORUZOpsRZbHGDHS2RlMNafOKgLOd8eIYBlokWy6ykf06sjvMV8E24piJVfzmJZXd5+pAIdTVRkh8zXe2ti4xmagBgta7LhpjqWmKOLeH57L8Cgpabzb7z7f8QWp7KCSet9jX+FDDQv3wXbUH3i/UxF5mclFQYbpYSBUZZhOUIYoeG+F9ZwzmvcUX+GGEvJH83andQlRwqMz7R6SVnQLj0XwDPncxRHVsp4VwpCzrfr0UEGYOW62gE3r/QiRo1XXIxj5SjLM1IeyB/5auw6jPzJykXtvFyeSuX82DE8YlbC14+MYfE3vYZtGoipYrzcoW6QifzSHUZGWzBnfD9p/8bLJDtRy0958prbH0o/XXsAtmQjQayo3WI5QdEY07R5fspoPd5IiZ4/e27dTqjm1wBxKplF0UI/JnWzJUCHZ0p65mbNouDIHW927Ch7N0ikqqx4VrJsky037Ev2++8511qNJsn1/D1ZNsVl5sBDzJBkUmar7rRyiOiQ9GyiJuQH9ub+4+cwbnEbMHt5hjUgk5aB0SCFPJJmDX8VuLIZ3zYfuoAecUmTBBOKGNXXqLNxkMlRtfTeEbASrcLWBTWy+jYN5Rwn7KoT2BCMolOAtVhEugA==', '', '0', '', '', '[]', 'approuve', '0', NULL, '2025-06-20 18:54:31.24482+00', '2025-06-20 18:54:31.24482+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('6', 'Antilles Premium Travel', 'Agence de voyage', 'Voyages de luxe et expériences exclusives', '8 Boulevard du Bord de Mer, 97230 Sainte-Marie', '+590 590 98 76 54', NULL, NULL, 'https://www.antilles-premium.com', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '', '4.6', '', '', '[]', 'approuve', '0', NULL, '2025-06-20 18:54:31.24482+00', '2025-06-20 18:54:31.24482+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('7', 'Voyages Créole Évasion', 'Agence de voyage', 'Spécialiste des voyages aux Antilles et destinations tropicales', '12 Rue de la République, 97110 Pointe-à-Pitre', '+590 590 12 34 56', NULL, NULL, 'https://www.creole-evasion.com', '', 'data:image/avif;base64,AAAAGGZ0eXBhdmlmAAAAAG1pZjFtaWFmAAAA3m1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAAA/gAAISAAAAAjaWluZgAAAAAAAQAAABVpbmZlAgAAAAABAABhdjAxAAAAAAxpcmVmAAAAAAAAAFZpcHJwAAAAOGlwY28AAAAUaXNwZQAAAAAAAAJsAAABkAAAAAxhdjFDgT9AAAAAABBwaXhpAAAAAAMKCgoAAAAWaXBtYQAAAAAAAAABAAEDAYIDAAAhKG1kYXQSAAoKP+YmvHl4CGg2gDKPQmaF7j9DIRX4/8AgYBCIAAAAAAADS2CYISQqAADaBgfmc6r/xA+zRvmZKJfcvyy/BNmzPJxUK/AwVdqbtHXK6MtE/RkgdwjUc7xpp52hmUkAjvNbWhrV1DNzK/Feu11/GRC9LEB24ZT11vIXIXJKlsGpKPRV9eNol6XVoL7umhHr5Iwd5ZhfEo8LBEeqPc5mjeMyEmhm7V+O58i+3YJqIfrD9r7p9MO6sW+w8z8aRHaQYLZKTEXsbvIImdfRAED12e697OK4uRqK/o1GDab3QECxgJx+QyCpFLoVwQ2be/S2YtW2GZwQk1+nKfDaMjp5u0JU44dq/rHcJI9zmhUIy4E2qXO1wWQeZ9WVGFOCSwIGp7vexAr5YbdHSaIXT00FKpgx2AMEmDP7Z2HLr7haKZGQK2aRjT96bYn74s54/DGCuzodZk+2CO4E7EfWwcVbUlSg1Yx9cY7jbGSb0SCCzjTxKIamokR5gJKw94YVEYHsDP1iN1hHnR9sCQUhXTGQaKAWge0W/oiiaPBe+syPGbGfGqPQwD/QXhDF2r6Z6XM2HGYAEkPCBWudtt4H/6h6VCZo8nLKWG1MkTtt5ehY7X7rTx7v5yxqa+CmPs59yXbGLpPN5UYEfgecgWjXCsckqynlhM01Q8mONasiswLi3+6TsBniJVzao1nFJ5Y5dkxLYKd1JOAMjWJ4NK1y16TuXKbpuIEPtMNGgIE1bpCpXI7F2y0PLmU6rQJ5x7O9qwB6EVL83OwxYNJuWpbm4RuIR/2KHSoNQBukf7wvkBfayd2breed5nWYyIirMkzYGwPwoRrd5hUtV2KgFdHzZ5Akw5lfTE4EglaSWH72709QgbkVlGqRHvFEn8o0FPx5B8wDSXV7GXWAdYbKVyArxTVqXpQJJeieFXlpnjOWWKABTwu5cP9xuzhes5WQltVWBfteEGANglztXmCIYKHeb4ZM0S1Fpjmt7Hc9SBjDDk74PshGiRHQB5lF1T+6md9xVybxwEXNRUxAp9J7Mmz9q6ML2h/c+3viZDN7hl7vFh7/gkqxNehgOeYJvf3ADM+yov0bIs6yHdbIwatIGFfSwdXTTf9M0SWJUzuL7OpPAVMO0M5XYv3xFMqM6XdcWjyB5j6k2G4EsF8w6Jx5OfoqK3Np0Ee6x6BOJ0JYZthehtSi8WTH48JGehvGLjTtMcJwbmvaQh40TceNcLqO9FRRgndc44wDpOxwizYH3AMtsckUOjuL5DdPWdSoeIeIi5pNCUk9jQYXMkszzVOeZbKb+2uq2YPOn4AwTzF2kMeE9iZr1bQUlMLzX7kqSOU7CN+E6fidFXkee2n9EvKnNTg9sMNXrS22uXCHD/LV/wcoOklJr/8eB+8E0ia9A//Lm/Kav2D1o5kyFF/0q9Y3nnY1rHRK15OgZD/QwxZxX6KVfxos2TsCMzOs3khiUlHZCFAt7/wJWoiaNFePXdKoGDP8YSWhheUdG7GWYlnUGpdLsdxNJJFPLVbXj3Eyr680kP67NGLiMHmGAd6lvmFtONbUqtWZ70dcurhMWJQCg6rKiE2bGaziFgl5OI5NbL0H4G1qJe1k46N4qdKD3cGuH+SdZFgRdn9584CgivTISzKTMvAax/m+bltECXrSIaIA9EkpeIKJfXQ12GCG7p87+FVeaxaQPHsb9rFDTScYRKUq+orQ7h8/5ydhTcOgHpUNXRkixWwFMVqbScLacQlQ0aqWsZyyMBOvUqrkcPjRcFzA0eluhvq7j+0C0AP+0oojnVC3xCLnwo95XKQFgLBP6ERXP/cwwIjPrWQ+sGS5dv5hvUC0nFWHE+wh/1UvvLw0w5N9NRY0EbEreMUZLbrOLIBpaHDr2poN+mEZvalk1L6ygg/6P9VsHNayagJpv8y0MacG6JmbbVgrISnwiKkzsUGFFhQXkfZPYbvq9wQ6NuwOMN9DjzV9zgP7uhWXsBU8UZQ+y8gtdImC2wbGG53gEb2lkWEYfCHFEzFH9AyBSrRVOqnCyyHZx+benhsOizUkca6gQLNz6xgQjn96ENsTsWHYIouQeB4kgn5jY2Uk7hZ5MCeIw+LhSAU4rIAgBQinq3w8+yYOYG4OwZDgW1awLC9KaXitVKGxg9a6LOkPwWMTyjFyhouf+plGH7DgL09SQjH2mRKlHuiTvdzG1QlZj1x3HNcHRSKHISXl0+pqnQgWE7cqPgfX8NpOhWOwBKVK6mvM5iKilJa9ru/gpk9Ky6hlzwEY5AULMQv02Rq9bGwVwHcWUGN3Wy2+LXCGSqWGd6swrBSKOlwduHskA9T1PX5fdTE3/EWJ1sHZgxtj2zX42KbJxpqwyeK5VJ2KYpgNcqWqClB9FbR1Qg73WPfDkAqwiClZOo/dvXamX5NRlPAKB+Zx7DLA2LBJjDyIVcOllRczvYbYhlKKCYaE+CVZ8WHuxEGgl1fZhRmIAEgMNUzWr5azqkw4sEKJRezi0KvkKFviwTFOidAuASbdX/O5SLo0rXYkD4w3HqwZalgmsVKNkVRncpuFOUDYg1/ypkpsJ6sjcg+ze6xoJSiNPgUPBNoD0pmpH7rv07ePNTQwRTi/mL1EHJUNFMBeYxQbwatwrky9G5BAaYKhTPyg5umkjwZ267GShwlgb6ZJkZ0clf0WZ8HN4rnaJWHSXiqbtz/HFKHzncFoXFu8J8dojuEIpxDZP30VtlHWdKp2aW4YxsWsRftatCgQG32urgRSm8Q7PTXAdekYi0MCGKgT6Lq70O2TXCUCNDXauiBjLfO7DjyBJ/Z/Wo86QnxScxoerNkOqum1m5msIOTfKoKBW959lfO/YKkxmo18dWPWxKe7A3bMTQZfHvZx3JRw3EbkwA7NSqTuu1A377X10qJ4z6CpUGeEYwIiph/SFSzFqqKI0A/7OTl2crGrOHgTjQaSBpxkgzoOQMj1TDsuHNnTViUBOt2wDFJ4qk3owkFvdPHIyBevTi6kjOShF3GILEAdmSP3EOy/ZbOLfucNfm3DyBejGXMFeT4Abj1v6KAeEjm/ujzCxuCgTvSIgY8XbNm+e1Kv5bjB9Y3WzYm2jroOHlfqN8FizndXQrcI7u0Ih8/71qFj0yc0ZhF7SjKDEl9xZxbSJ4VIY8BROe0evU1qPYwoYItT21LCzeyCilZV4Wr6ezBNR2b6dUZwrxOyXhDlRQ2BaEEqrJ7fiTFb2DsfcE9vw4P0c0rM0kkm7CInz9pvb/c69QVhwR0wnCyE+U45hJTGUKMZvx1QRD3hZaouR0FR14+dkM23Ek9uV4kqEJk/JUeUod+37ePCweUsjWMNoJJjm15j3Yg9v7CLyah6LbSEM1X++Z/YYpzNyNzTi0KoeuQazEdUP7DxgtiSx3TbOeWxwNYSlFTHl68wPhutWdjJT7ropWvDR1NzIrDMuBD1bFWnLY/72A4xqywx3jy1Gmxcvi8rhFyxu+s49jUcvQBQuha0/OXYbtm+rFAiE/VxC4LN7XI7iWFZ0TyrXTixqKpOkK6fmT5E+80a76mCZ7Vy7Yd232YkH1LdrubKi2Px57zkGnDnoKu9xZD7TzsSiyQ7toDM8ej2GTSeyEC76I+TH00HyWIgxgqfizs8Esx/qfhsDbnt3lItMDzYsBu6aV/59q5w3Uv4yTzqfTm/+fp3KXruNTNtmnwPAk1LslzeLzXNjgEVvpgjMS+Fd5J9sTePtI3b8Ld24Bnh+1/Vh9HrEtU5D3OyiiDDetjvKtAHvmkXtTnH4IKadyczVwAzGn+epKLAJjS95R2Dotqq578L9U9ZUNRkrp9AJFA4QUuqvv0e9EwmTLVPfY+8g4oxoYy2Dt9hfumLGfiSvDB/pqA+N8Fcva4EU3V56Wm8M8N3WHNR4AKuzT9G29HJrekIyOUf7DRUIwpPafGtqp3j9goOCyxvsOlyFE5sAxD+jW3UG5awZfs/pq3FPVTI8Adkl+5oQSP8kPZgMwhHa+/J5Y7RfhlavP9M83nhIoNg+HDqwargBNKMzMni/r231PxK0Zp5zIecDGan1h8stmTXtJba5RFOf5886kyvy3zHBlpVAGAksZlt1qz7TTozODEZIzCUNPuvPU4HM4M2nmDfPKp5WZoJyk/25vhe50pve1xoGKHT/g7DhVyRqduxlm+sc4tBBYZQjXw3qmudiWlPB7o1ruIYL5aRoaQgvtYkAu6kQvL9hF4RoQiC4c8qstrZ4BnXikF2IMpcuj38Mq8ipoUTtg/glTQXkFnnrueVxkQZWZz1fV3Ki6cf+WdTBulOqM2CTvL49w6uVrBzFnRFvGcfBL0X3evyQLnBSqnCu5pk2UnEfUAdxRTJQHTh0tJj0CHmkQKTvJ9pvQfdpxGv5Iy1aJcdZxSz1gpJI6CSn6bJvPjSomlYCew5suaWBySlPNQY7EkpDtRAgNroNDlsny5Kkj2n4egW9tUOV1uKsRbk/wm1hbmnULGo9JuZtfkxkaJ6Aaay3+UBMrf6jwWHX9BIWJqgQjaWEFH9ZzXvhwkqHu4ly6kitqJoxPIgbu/BKnvg+McJ1EJx7PgznZeX9MMoa2kNMSBHrt1BRnTn9/jK5QUvFwIj92GYhPNZsJ2oPKZZ48ewCysZkacdYzi1AnaffKY2KtFWr9rLs1yiN2GHzz2pv2qognfkQ+QdoKIt+pCFVzT7Yov/UohQWUXmWgfAlhJs1fVpgfUPA0kxOajhownGSjIIELiF+cFkAbbaZpUPIqQjtJ3n/Jqz8ieD4empMXXY61uGgff9z2P62GFzO3qKC6qaY9Pi7ehSECrPf0h1yJeYzgPviGIr9RdQeaedirWhXZI8ioxT6IHs2Ru203FSERbeh2o2XXsxIFS5LOWemL3WHugPmaXqAS1+3aJ1W8hfaszB1lJwqaPDqzj4zdBLEHFfRgEIR7CF81U1lw9b0wj8f1KflX4gTdRPaheKt36xz91afdK326mBOVrZ1qQjHNT2Cv/tPKYc2mCe8U398HNXigTErc2ypXQ2jw0+AZ8PrHLdndQkkiY/pyjSQS9lUgdbjAA7qfDduRApvqk+pNdcq/Dl1Jv9TVdIRjMjH/8h4pWLtFpQeUuWhUTtUg59NknkI8mN+Qo7TFal79NAlkXh3BT/CDDKam5qqMphPqYFdbkkNodD/RgDe/5IvEOujep128eFvxgaeBUTqG9dd1rAVxH+1HBuwGqrFKN8uTlytioxA7O26ROPBo8pWOuY5E3mz38GBlkW0cUJUYdOqzRxO5NfjLBTTti7Zwmn9yoCchEnMXZ3tOHRPu47gjZUV1cTmxpM21L1blxO8az818oO5khyD1NG9hnD0BSSoc8sPEok2lSSXm5NFsSnYp7RLLLEHeemRuarLuUj4S5N/Q5nKzY5H/JxRAfjvXMV1PWIyEnPMZ+pEHRUnntUB6vTMWa1/PS603A4/9bYi7DR1lH/8quWXYubrB5uuPMK9BfzVaynEPZZ8AWhVbftyK4PlxVeL1/dO5IngpafjtNRTnUXd4DATQ4jh2jpmve57tGvs662XOifLhX00maLRzrorJ9RG4TuMGiZ0aQE4utjq03PizrgP2EPRPh4g6Hl4DW7XqUlNn9J2jpI4h+/orJe3H/b6zuk6+iaakMy6z0y0rc0j6j0X5ByiJ6yE1QuR2eXGnqPajt16HXUnIKfoTZsa5uCNfocDSkQ2xVqSI+cKEOu0NI1crcT2zLzW3qpPqTKPnsgjbzls8THBnrclMokbTK2JspazrXoLsuU93MVnLU6lGa9vEGFM6TnopBOt4eAsG8rLKj2aW1LfbeaHU8y2GKIW1cTrRfedWnlLxCyWFB/5gw0vit9pedOD6UOeaYVDXtFr1C5SRN8/OJndfzW1jGHaO8PMP6GBZvgMeGDZ/Xh0CW48/AAxnI/0sqeohY6XJwNGyfmDUhk/4IbWdQW2SuseYKuQyfjlSk3kKc5Xt4R/+4zaksGqRRAjS8ypSLe92yBFenLSMhDsw8ni4F6n1RUNlqRIAveybYJ2hub0/3VzIJEpU9dMFnXceCLccT0E+2YNyf0BtMd9PwfUXvTRR+TrAiZ/1TXNgVeGQE3kE2NPZsjr6bz3t4tA+LcblW5O4Uhjwx6pj33gyXNMzDUNh231OuJNFGsgCCGQfQHCFgpCAfotqf9DJewyhWuBhJMnzMn9nZb8pA5HcSWZAwYNGAgo2U3VG/F4V5ma3rv+fMrVeqsT75ACfpeoSpkrLSwyhM5Ua364mjashruBqyMDmrH4oHJ6L4G4fmi6uMZp6hsrm5GZSeiULw+wBctVKq5y+f/0td7aocbMwpy/3ysElQpyrLFDB8lfcbK8lqJftm74T/3FlEIUiSmYDXU+bvKvU2WUYipO4HPoyxH2BjksqaunEKS7ZCc91/aNSU8mAVm2j+Eqihg/3giEmkn4FCwFtMeX2sGLN57JgPuIg5xFhzk+YX8jQ3VumtGMOJfDA+pA5O5BB9JW9680QlK70OSsRK71ETqQ6s2FmgEH390P2Ap27T9vFacEvxCk0nXhNKhRB0ejhlAcNOSUUSZHMWPZLIVULWTjWccXTThYOsCMyYXRP2gtqT1R2p2gcz6NtkY1KM+zAso4HBEfKZi3/ATK2zWxeSIUUnFeO2ajwnhxVm67OLwiWnxv7X13WNymezzW+zEHHnQWFgmRRrk7PkwzHpwgdq3bTKfeieirLNrQxEh7WDWHG8ihZmPDT0jM3pJ6o29VZheHDel25uilj4vCUh04a7LKA0A2hvORr4TypLCE+4jToNWIyi3Z/hBfq+iq7qi/1TuAQRSX/g8v0oiG9yv2hYMLUUMVk/s8nhters19UgymTS6kyNAbM8sAZdyYaXOd68X1Bt6E1iJKSeeY3BZYhM0A7lR6NZzknHWXdDH65nzncTZwlDyOuFO62bNJNEo9T7YXc0deG9x08ApnbfpnVtqLl32Wyj/DGK+Q7PKO/um5sl5Z72D98Jk7ZhuoU+QIyuox6/KgiEynsRDEBDMQNgy9zGDWyYrKMHslR3WQ6qv/54o7rg5cZLtJQoDRQD0sNLlwzQm7azHgdE5DgsspxAquy4TDTKaHxA/5mADg1JdZ0OD0DMUnP5/oMTB2Sz7JePgCOsTXqAw2V28gQBHLHHaC+JZh0uV5Hw46WzyQeKYIutzs+ejFe7WSPF1EEECuU3B+n/CAUxyfU1nzgaVaNSaXyyVV5BYTeHWkfuHbVNYN6kWkyzmixzqWpPOce6MEVkpPF+cOehQ5z/cqbpJysrHODCQrsr6kArbJw/o1ML96JQ1wl9pyMzjmRbAZIzgCf5Jzv/Y8h7kkay7ELq1LC1eAxrrJWpQGZPHjWqqrQrWSAo/4yjMbCzEofhgJkloxPUx1U5tXaeFBpDORLiQ7PPax670Ybei2zel/+aW+mcXgyusbyn2eloux19aNTBkdvmSB+jdMnJkrgJWKH08yJhb8NKtPkYjhrwUU2r1hNcKnSuMJjQ6GZKzylp0ouZByVQNREGAAD+Jgbo3CIfe0ThaYI2vshtY5R1Eq3MG3JHkzlvsr9dVeytR8cPm2iBFf3rbga2t0f/bLvfVGOGJgMv4vE1C3sH+P1EhZF+Ro3MhgrGsnQGXKx2bnigKXitHGq9AK/etEvfjcaswllf+oigQ7kca8qzNXai7Sedltv6Z6B3bTNeTlS83nEylKsJ2546Jy7lbx0gBx4gop/HHVsi51cYxPzn5PF0CSmbgk1hlHZh4/wvdArhA2/RT7b5/Z6OAe+JUFuP+t2iWclPjdqinmrS16j0EfjuA+2QnxstGI4+4JqaAwZfQfvHi2XqQL3XjDeHoshI7PGTKnEFt4QMC3tN3gbEP07331QOcw4RFoP7xF0SR7iVIvMAptLXCZRwVHxIVyShoP5zFm6OVuPrxIHc6vsq3iowq0mgJ3rL5nh7lJB/ihW9WQ2EMXOLpZbElQ5ydwORsuuqi3WB0v+Zxo58HQ5R4ynycLwrwtF+bxfXojOBTLzwFaRaNiS3LzXq3BW9X34vejqpQkHWIMZBX/CgOLL9aeSEqHMqGZZVenrhPEYczIXJ8Sde7J60A0SnUwZGu9YAvbSCMa0LLIqPdOfVWwx3WYhWM7WuMZnuHy0UMKntD4WWqLijg9YCxK7Nzg0x65iZ8FcqTJtSfJRaSnxfT/Z60UkOq6QlXCJXqUYC3SYu3BULpPFPWKimjKrWUG3IwPV7hULivnmH1U0TSa7MwNfJuuBevcJ0A/aSoOeTjZP9U9ZmtN1cYdn8d6RxnirTh4ySYJ+lhFW1QbamTf50wnMtKPMc1iHCmmmHJwPojsYeqbfGikrNruZ4+u48uRjuLLe1KIGjEMBbsA3wO1VaL1YzHkd4yvqg7CBBgVmyMsDCmNWlr2liSv+k+h4hJGqzfWtT77hLl3FBS6/EoHtOCvGPmvsFe+rpARDRdIw8bQXm3kILSWenAlSWjg5oFSP/lFIaMoFqNAPflVqjV0eBjEZOT0FGETb306MNiD5m3/AQl3YswagZRqdHljDbzM5Z91s1WZJEILhoa+dKF4lZ+ICJvXbWb08FQlzKv8lDjxw9YrIgK2PK24Dxai0j1oKaC4czGAyWfS3VrTfCVidjshdnoUYtGe9/N4CEjD0PMmGk/ZsOFfyQwrr8h5krWlPzgiYqmKX3l+UEYGuU2kSwK6Sr0DX64BnaLPedUPmbiTiCGvuNEy613Ezu2yMDQ91SV0FK4c847aEQuI84LJ0IBQHTQdTGzVBljmQzxjIDjpLqNoqAVYJ2At9SnWYMCqqKUyQ3C1F7Od1gmmFtGHB/QlMkKWoRc6cvsSspyMzysFTzzQOE6Vr3vnnMVUwRBUQna47Rfkazx4Do5ECu+aDwrmEY8NQNbEbc1zoa7cK/6olKf3slwuN/1dFtBYYX6SeF0KHVTmld+x8mMZB7DHggKe6goB+iwVYqcNthnFB37j0sOcfc6WxpfAf8z1lu3UxgW8bneY/0Je7ExjxuBnIWDcaiIerFhzcmc/hw+j5444iJw5XEeDJz8daNjIHdVH5tj8SAVzM4AEWnpZnhsX8eZUAG/Qezo/yWb/+ri3Z30IUDEfQVXhBlJVmEDfB8k2fdi145v0bGKZEw+w/xdKw/dJRIJ74Clsz2xqsXbnsuGjdUL8XhDQiqANs9auTAWzSOPr5ZxFrvZf7mQMKl9heOaPeVWWOPk7+NJKmL7LxAvJIW0j53Ijzfdj4xtPMWBNYLIQliqtvMsRhLdMQlnC7DFxfPFrYj/wexhNfNzq39KCIAdryZcKrtrD0PP1zi01cCTEkCjqc2o3+KdOlrivgG3VXczuRT+WuIGOzvnMxAQaJQog+icmNZcMIjBSEjLfyLa0f9ziQ7nMi4+IkAvpYtI1LwPUjOXxRzwZKGcznDPIG7vbZwxm+KwKNoZczTIajb6RU4OKgsWfzngFX2TZMiHNv3EX/1YbsnZoVE9xjJKPRHJp6T6eh00xqAkLKhjVa63TKSTYp2hiqcOtiu/kcUrl0NtW6h9TGoihWhTLbBChZnsCLCWesiEYS8gKcRMhWMEAO7U4Op+JQ3hIWQtrNQ1wGV6iUOo47dWK0aBN9iEks6mtperqrl891Bl+A3ROx7pkTCA7YsFzXsb1kSOognYB5MA7R2A6N99WvWxp+kT56jU3/3omQ9ydqlEkB6Jjs0/HvfrCQp61lxGwE0KEftMQ8y4lKUvlWFNbXrP1ewcK8Yk7ZEO84pV9I4QNhFhLpF4u+J/0BqHgsojILdA0qxhcErkxRtiD5hMwWbiFPF1tIEm9kJmQxOLcYNHrE+RgFRBki1XgnlBpaayg89b/3AgRFs4aP0fHilIrHoHecqNjMP2XO9s3TnbgKSevLalzNjrFEd1rzYxWoL/rcaIjvnwq0cHYb+hBjX4lrK3EI/tm3b1OiXnpJ0SQZ/FaXXw2vboPIe37bJrXMaLkQbRxJFv5rPlCt35EO03tcU8Hzkpkl9vvAqo/R010eBqwYd3dBd8z2sb4IYxMSD9JVQ3NeWh3H7AoJwCsMTGom04UQNWd/jWJohyIeWy1ebPYmkYNDhWBAcW8PckYKtRdr+5VLDt+41pgl8RyzH3MohRq088reK6JeIcE9HoKfxOZlis65al7I83SCYKzxVIvX1ochxGuj/CrKXT1Rbc+Yl6Wp7vBl13Su8bV7kcxFsLf7Xg4hANz2SAvay8gL9HtiReCdXim/VqR8Qv5OkNwCI3kR3EbHFfutLteHFSS08NJg0SbWAzFd1y36ZANDw9UJH5yzN5UvioajszAjt8Hl7zXG8TBWexNQQbxcPleCW1/Ia+cnRZETiKGgBgfASeewLUgssEK/F7yQgHx383km7SnM/Va3P4fZ471h/49g0wO6/6rH4Pt2LiPk0IBuR+cj5Rn7nH9NjoU4yA4t+cSweuftHffh+X9iR+uL9cNxEXWOBhBkMALIvO+bxbW0qmM4ZzGpkziIocgfo5RmM469LPvD0uQnQR+eDYo3xUkq1XF1IUBJl8FIrr47UF+JGT0tmxyqjkVKRVtohA3P6TqBZ7FRc+qqahOG+dMHr4KzjRymH2zAC1NzyzVPveIk0x43HjY6Gy0aodr5gvqpUIEqP/w8DxdQKIdn5cjZ9XO7MickaQ/azcAsl9FnzUL+Wl8xTJNMtMkm1Wt8GW2bIowkrQPSzD5RRTavidYRZyPORUZOpsRZbHGDHS2RlMNafOKgLOd8eIYBlokWy6ykf06sjvMV8E24piJVfzmJZXd5+pAIdTVRkh8zXe2ti4xmagBgta7LhpjqWmKOLeH57L8Cgpabzb7z7f8QWp7KCSet9jX+FDDQv3wXbUH3i/UxF5mclFQYbpYSBUZZhOUIYoeG+F9ZwzmvcUX+GGEvJH83andQlRwqMz7R6SVnQLj0XwDPncxRHVsp4VwpCzrfr0UEGYOW62gE3r/QiRo1XXIxj5SjLM1IeyB/5auw6jPzJykXtvFyeSuX82DE8YlbC14+MYfE3vYZtGoipYrzcoW6QifzSHUZGWzBnfD9p/8bLJDtRy0958prbH0o/XXsAtmQjQayo3WI5QdEY07R5fspoPd5IiZ4/e27dTqjm1wBxKplF0UI/JnWzJUCHZ0p65mbNouDIHW927Ch7N0ikqqx4VrJsky037Ev2++8511qNJsn1/D1ZNsVl5sBDzJBkUmar7rRyiOiQ9GyiJuQH9ub+4+cwbnEbMHt5hjUgk5aB0SCFPJJmDX8VuLIZ3zYfuoAecUmTBBOKGNXXqLNxkMlRtfTeEbASrcLWBTWy+jYN5Rwn7KoT2BCMolOAtVhEugA==', '', '0', '', '', '[]', 'approuve', '0', NULL, '2025-06-20 18:54:31.24482+00', '2025-06-20 18:54:31.24482+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('8', 'LUCE Laurent Agence', 'other', 'Agence web. Spécialisé dans la création de site web ou mobile.', '27 avenue de Galilée', '0766334653', NULL, NULL, 'https://laurent-luce.com', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Balma', '5', '-50% sur toutes les prestations', 'building', '[]', 'en_attente', '0', NULL, '2025-06-26 21:03:42.745+00', '2025-06-26 21:03:45.519147+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('9', 'TEST PARTENAIRE ', 'Agence Web', 'Création de sites web ou mobile', 'GOSIER ', '0766334653', NULL, NULL, '', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '', '0', '', '', '[]', 'en_attente', '0', NULL, '2025-06-27 18:42:29.953+00', '2025-06-27 18:42:31.679094+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('10', 'An chodye la', 'Restaurant', 'Responsable du restaurant', 'Guadeloupe', '0766334653', NULL, NULL, '', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Sainte Rose', '0', '', '', '[]', 'en_attente', '0', NULL, '2025-06-28 21:30:27.354223+00', '2025-06-28 21:30:27.354223+00');
INSERT INTO public.partners (id, business_name, business_type, description, address, phone, email, contact_name, website, type, image, location, rating, offer, icon_name, gallery_images, status, weight, user_id, created_at, updated_at) VALUES ('11', 'Agence web IA DE', 'other', 'Je suis développeur web', 'Balma', '0766334653', NULL, NULL, '', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '', '0', '', '', '[]', 'en_attente', '0', NULL, '2025-07-02 11:46:23.639+00', '2025-07-02 11:46:34.232458+00');



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.profiles
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('0f8bd0c5-dd6c-440d-bdf3-b5b03aeb833b', 'admin@clubcreole.com', NULL, NULL, 'admin', 'super_admin', NULL, '2025-12-15 11:37:26.474273+00', '2025-12-15 11:37:26.474273+00', NULL);
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('ec3a66dc-e1ea-49c1-9b43-224c80eabf25', 'louis@hotmail.com', 'Louis', 'LUCE', 'client', 'partner_admin', NULL, '2025-12-20 22:45:48.800061+00', '2025-12-20 22:45:48.800061+00', NULL);
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('d8db1516-aac1-4a13-879d-3a95d35c6b72', 'laurent.luce@hotmail.com', 'Laurent', 'Luce', 'client', 'partner_admin', NULL, '2025-12-20 23:28:59.758845+00', '2025-12-20 23:28:59.758845+00', NULL);
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('261a9d06-0bc3-4c8a-abea-5d67295f7210', 'laurent@hotmail.com', 'Laurent', 'LUCE', 'client', 'partner_admin', NULL, '2025-12-21 03:08:52.157298+00', '2025-12-21 03:08:52.157298+00', '+337664653');
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('edf67a0c-eed0-4810-82a9-2a084ba75547', 'caty@hotmail.com', 'Caty', 'LUCE', 'client', 'partner_admin', NULL, '2025-12-21 11:08:53.168063+00', '2025-12-21 11:08:53.168063+00', '+337664653');
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('4af1763d-6cd0-4f31-b769-f5e4fa1c9e56', 'meryl@hotmail.com', 'Meryl', 'LUCE', 'client', 'partner_admin', NULL, '2025-12-21 18:06:15.998299+00', '2025-12-21 18:06:15.998299+00', '+33766334653');
INSERT INTO public.profiles (id, email, first_name, last_name, role, admin_type, company_id, created_at, updated_at, phone) VALUES ('f0c9b51d-9092-446d-943e-7bdd44153438', 'cmoinster@gmail.com', 'Laurent', 'LUCE', 'partner', 'partner_admin', NULL, '2025-12-19 21:49:04.894381+00', '2025-12-19 21:49:04.894381+00', NULL);



--
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.promotions
INSERT INTO public.promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at) VALUES ('1', 'Découvrez nos hébergements de charme', 'Profitez d''un séjour inoubliable dans nos établissements partenaires avec des réductions exclusives pour les membres Club Créole.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 'Offre Spéciale', 'Découvrir les hébergements', '/hebergements', '1', 't', '2025-12-11 13:13:23.985979+00', '2025-12-11 13:13:23.985979+00');
INSERT INTO public.promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at) VALUES ('2', 'Saveurs authentiques créoles', 'Explorez la richesse de la gastronomie antillaise dans nos restaurants partenaires et bénéficiez d''avantages exclusifs.', 'https://images.unsplash.com/photo-1559339352-11d035aa65de', 'Nouveau', 'Explorer les restaurants', '/restauration', '2', 't', '2025-12-11 13:13:23.985979+00', '2025-12-11 13:13:23.985979+00');
INSERT INTO public.promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at) VALUES ('3', 'Aventures et sensations fortes', 'Plongée, randonnée, canoë... Vivez des expériences uniques avec nos activités outdoor et profitez de tarifs préférentiels.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', 'Aventure', 'Voir les activités', '/loisirs', '3', 't', '2025-12-11 13:13:23.985979+00', '2025-12-11 13:13:23.985979+00');
INSERT INTO public.promotions (id, title, description, image, badge, cta_text, cta_url, sort_order, is_active, created_at, updated_at) VALUES ('4', 'Soirées et événements exclusifs', 'Accédez en priorité aux concerts et soirées les plus prisés des Antilles. Réservez vos places dès maintenant.', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14', 'Exclusif', 'Découvrir les événements', '/concerts', '4', 't', '2025-12-11 13:13:23.985979+00', '2025-12-11 13:13:23.985979+00');



--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.purchases



--
-- Data for Name: redemptions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.redemptions



--
-- Data for Name: restaurant_reservations; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.restaurant_reservations



--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.restaurants
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('1', 'La Case Créole', 'Italien', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fort-de-France', 'Découvrez les saveurs authentiques de la gastronomie créole dans un cadre chaleureux et convivial. Notre chef vous propose des plats traditionnels revisités avec finesse.', '4.0', '15% de réduction sur l''addition (hors boissons) pour les membres du Club Créole', '', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 't');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('2', 'L''Azur Bleu', 'Restaurant de fruits de mer', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Le Diamant', 'Face à la mer, dégustez les meilleurs fruits de mer et poissons fraîchement pêchés. Notre terrasse offre une vue imprenable sur l''océan.', '4.6', 'Un cocktail offert pour tout menu découverte commandé', 'Wine', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de mon bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('3', 'Pizzeria del Mare', 'Pizzeria', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Trois-Îlets', 'Nos pizzas sont préparées dans le respect de la tradition italienne, avec des produits frais et de saison. Le four à bois leur donne ce goût unique et authentique.', '4.5', 'Une pizza achetée = une pizza offerte tous les mardis soir', 'Pizza', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('4', 'Le Café des Artistes', 'Café-restaurant', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Schoelcher', 'Un lieu où se mêlent art et gastronomie. Expositions régulières, concerts acoustiques et une carte qui change au fil des saisons pour valoriser les produits locaux.', '4.7', 'Petit-déjeuner complet à -20% pour les membres du Club Créole (7h-10h)', 'Coffee', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('5', 'Le Ti Maki', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/images/le-soir.jpg', 'Le Gosier', 'Restaurant convivial proposant des spécialités locales.', '4.2', 'Plat du jour à 15€', 'utensils_icon', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('7', 'Bik Karaib', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.28295123968248237.jpg', 'Le Moule, Guadeloupe', 'Restaurant proposant une cuisine créole authentique avec des spécialités locales.', '5.0', 'Cuisine créole authentique', 'utensils', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.28295123968248237.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.3511851419241734.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.1738057255899681.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.48764574961327944.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 5.12}, {"name": "Carpaccio de bœuf", "price": 1.4}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 2.8}, {"name": "Risotto aux champignons", "price": 2.1}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9.5}, {"name": "Crème brûlée", "price": 8.2}, {"name": "Mousse au chocolat", "price": 7.5}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('8', 'La Terrasse', 'Cuisine variée', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Le Moule, Guadeloupe', 'Restaurant avec terrasse offrant une vue panoramique et une cuisine variée.', '4.2', 'Terrasse avec vue panoramique', '🏞️', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('9', 'D''lo An Bouch', 'Cuisine créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Morne-à-l''Eau, Guadeloupe', 'Restaurant local proposant une cuisine créole traditionnelle dans un cadre authentique.', '4.4', 'Cuisine créole traditionnelle', '🥘', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('10', 'La Terrasse', 'Cuisine caribéenne/cajun/créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Vieux Bourg, Morne-A-l''Eau 97111, Guadeloupe, +590 590 24-7449', 'Restaurant avec terrasse surplombant la mangrove, proposant une cuisine caribéenne, cajun et créole.', '3.8', 'Terrasse vue mangrove - Cuisine cajun', '🌿', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('11', 'Restaurant du Jardin Botanique de Valombreuse', 'Cuisine dans jardin botanique', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Petit-Bourg, Guadeloupe', 'Restaurant situé dans le jardin botanique, offrant une cuisine dans un cadre naturel exceptionnel.', '4.6', 'Cadre naturel exceptionnel', '🌺', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('13', 'Restaurant le Bord de Mer', 'Cuisine antillaise/créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Chemin de Bord de Mer, Petit-Bourg 97170, Guadeloupe, +590 590 99-9383', 'Restaurant avec terrasse aérée proposant des plats frais et bien cuisinés, spécialités antillaises/créoles généreuses.', '4.4', 'Terrasse aérée - Plats généreux - À emporter', '🌊', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('14', 'Le Maharajah Monty', 'Cuisine indienne', '/placeholder.svg', '47 Rue Achille René Boisneuf, 97110 Pointe-à-Pitre, +590 590 83-1260', 'Restaurant indien proposant une cuisine raffinée dans un environnement agréable. Ouvert lundi-samedi 12h-15h et 19h-23h.', '4.3', 'Cuisine indienne raffinée - Bon rapport qualité-prix', '🍛', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('16', 'Le Petit Jardin', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.11338025573233745.jpg', '4 rue Barbès, Pointe-à-Pitre 97110, +590 690 58-9493', 'Restaurant #1 de Pointe-à-Pitre avec terrasse jardin agréable, proposant une cuisine française et caribéenne.', '5.0', 'Terrasse jardin - Poulet boucané - Musique créole', 'fish', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.11338025573233745.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.2822532989816726.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8613337919490983.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.6851786614641694.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('17', 'Les Pieds dans l''Eau', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.5334040834831756.jpg', 'Rue de La Republique, Saint-François 97118, Guadeloupe', 'Restaurant familial près de la mer/lagon proposant une cuisine simple mais authentique avec poissons grillés.', '4.4', 'Restaurant familial - Poissons grillés - Ambiance locale', 'fish', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.5334040834831756.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.31011700400317876.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.031043738179278635.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.2896143210630713.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('18', 'Le Poivrier', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.14512237911949977.jpg', '30 Rue de La Republique, Saint-François 97118, Guadeloupe, +590 590 24-7929', 'Restaurant en bordure du lagon de Saint-François proposant une cuisine française raffinée et tropicalisée avec fruits de mer frais.', '4.3', 'Bordure lagon - Cuisine tropicalisée - Fruits de mer', 'fish', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.14512237911949977.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.24928679044516866.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8356280424481733.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.19072360587234438.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '15', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('19', 'Le Zagaya', 'Cuisine créative', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', '21 Rue de la République, Saint-François 97118, Guadeloupe', 'Restaurant sur le lagon proposant une cuisine créative aux inspirations locales et internationales avec terrasse vue.', '4.5', 'Cuisine créative - Terrasse vue lagon - Homard signature', '🦞', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('20', 'Le Lucullus', 'Cuisine créole/locale', '/placeholder.svg', 'Route de la Plage, Sainte-Anne 97180, Guadeloupe, +590 590 85-4429', 'Restaurant sur la route de la plage du Bourg proposant des saveurs locales et plats créoles comme christophines farcies.', '4.3', 'Saveurs locales - Christophines farcies - Grillades', '🥒', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('21', 'Kote Sud', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8126933872684274.jpg', '16 Lotissement Doré Durivage Route de l''Hotel Rotabas, Sainte-Anne 97180, Guadeloupe, +590 590 88-1731', 'Restaurant proposant une cuisine française, caribéenne et européenne créative aux saveurs exotiques dans un cadre chic et décontracté.', '4.0', 'Cuisine créative - Cadre chic - Patio agréable', 'chef-hat', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8126933872684274.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.19149330930481068.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.3284394392357157.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.03690903465715456.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('22', 'Le Kontiki', 'Fruits de mer/créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Plage Municipale, Sainte-Anne 97180, Guadeloupe, +590 590 57-9542', 'Restaurant sur la plage avec vue océan proposant des fruits de mer (homards du vivier) et plats créoles.', '4.4', 'Sur la plage - Vue océan - Homards du vivier', '🏖️', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('23', 'Le Spot', 'Français/Créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Plage de la Douche, Le Moule', 'Restaurant face à l''océan avec terrasse panoramique offrant une vue imprenable sur les surfeurs. Cuisine française, créole et internationale avec spécialités de poissons frais et pizzas. Ambiance décontractée et conviviale.', '4.3', 'Vue océan - Terrasse panoramique - Spécialités poissons', '🏄‍♂️', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('24', 'La Plage', 'Fruits de mer', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80', 'Plage de l''Autre Bord, Le Moule', 'Restaurant de plage avec terrasse les pieds dans le sable. Spécialités de fruits de mer grillés et cuisine créole traditionnelle. Vue panoramique sur l''océan Atlantique.', '4.1', 'Pieds dans le sable - Fruits de mer grillés - Vue océan', '🏖️', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('25', 'Chez Honorine', 'Créole', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'Bourg du Moule', 'Restaurant créole familial au cœur du bourg. Cuisine traditionnelle guadeloupéenne avec spécialités de poissons locaux et légumes du jardin. Ambiance chaleureuse et authentique.', '4.0', 'Cuisine familiale - Poissons locaux - Légumes du jardin', 'utensils', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}, {"name": "Testons", "items": [{"name": "test 1", "price": 40}, {"name": "Test2", "price": 50}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('26', 'Le Jardin Tropical', 'Créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Centre-ville, Morne-à-l''Eau', 'Restaurant avec jardin tropical luxuriant. Cuisine créole raffinée dans un cadre verdoyant exceptionnel. Spécialités de colombo et court-bouillon de poissons.', '4.2', 'Jardin tropical - Colombo maison - Court-bouillon', '🌺', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('27', 'La Case Créole', 'Créole', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', 'Route de Pointe-à-Pitre, Morne-à-l''Eau', 'Restaurant traditionnel dans une case créole authentique. Cuisine de grand-mère avec produits du terroir. Terrasse ombragée sous les cocotiers.', '3.9', 'Case authentique - Cuisine grand-mère - Terrasse cocotiers', 'chef-hat', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '15', '[{"name": "Entrées", "items": [{"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}, {"name": "Feuille de cerise ", "price": 15}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 't');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('28', 'Chez Zezette', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.33547452382253473.jpg', '97 Chemin de Gaschet, Petit-Bourg 97170, Guadeloupe, +590 590 68-0228', 'Restaurant familial créole tenu par Zézette en cuisine. Spécialités créoles avec produits locaux frais dans une ambiance colorée et typique. Cuisine authentique et généreuse.', '5.0', 'Cuisine familiale - Produits locaux - Ambiance authentique', 'chef-hat', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.33547452382253473.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.1041527128830605.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.087486427826299.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.7276415795836046.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.21421594683073608.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('29', 'Le Bambou', 'Fusion', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', 'Route de la Traversée, Petit-Bourg', 'Restaurant en bordure de forêt tropicale avec terrasse en bambou. Cuisine fusion créole-asiatique dans un cadre naturel exceptionnel. Spécialités de crevettes et légumes exotiques.', '4.4', 'Forêt tropicale - Fusion créole-asiatique - Terrasse bambou', '🎋', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('30', 'Ti Paradis', 'Créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Bourg de Petit-Bourg', 'Petit restaurant de quartier avec terrasse fleurie. Cuisine créole simple et savoureuse à prix doux. Spécialités de grillades et accras maison.', '4.0', 'Prix doux - Terrasse fleurie - Grillades et accras', '🌸', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('31', 'Le Petit Jardin', 'Créole', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', '4 Rue Barbès, Pointe-à-Pitre', 'Restaurant créole authentique situé dans une charmante terrasse-jardin au cœur de Pointe-à-Pitre. Spécialisé dans la cuisine créole traditionnelle avec des plats comme le poulet boucané et le poulet local. Ambiance conviviale et familiale dans un cadre verdoyant typique des Antilles.', '4.2', 'Menu du jour à partir de 15€ - Spécialité poulet boucané', '🌿', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('32', 'Le Maharajah Monty', 'Indien', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', '47 r Achille René Boisneuf, Pointe-à-Pitre', 'Restaurant indien avec terrasse offrant une cuisine épicée et parfumée. Spécialité de homard tandoori dans un environnement agréable et dépaysant.', '4.1', 'Homard tandoori - Terrasse - Cuisine épicée authentique', '🇮🇳', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('34', 'Marina Café', 'Français/Créole', 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80', 'Marina de Saint-François', 'Restaurant face à la marina avec terrasse panoramique sur les bateaux. Cuisine française et créole raffinée. Spécialités de poissons nobles et fruits de mer.', '4.5', 'Vue marina - Poissons nobles - Terrasse panoramique', '⛵', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('35', 'Le Lagon Bleu', 'Créole moderne', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80', 'Avenue de l''Europe, Saint-François', 'Restaurant les pieds dans l''eau avec vue sur le lagon. Cuisine créole moderne et fruits de mer frais. Terrasse romantique au coucher du soleil.', '4.3', 'Pieds dans l''eau - Vue lagon - Coucher de soleil', '🌅', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('36', 'Chez Tante Marie', 'Créole traditionnel', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'Bourg de Saint-François', 'Restaurant créole traditionnel tenu par Tante Marie. Cuisine familiale généreuse avec spécialités de cabri et ouassous. Ambiance chaleureuse et conviviale.', '4.1', 'Cuisine familiale - Cabri et ouassous - Ambiance chaleureuse', '🐐', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('37', 'La Plage de Bois Jolan', 'Fruits de mer', 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80', 'Plage de Bois Jolan, Sainte-Anne', 'Restaurant de plage avec terrasse sur pilotis face à la mer des Caraïbes. Spécialités de langoustes grillées et poissons du jour. Cadre paradisiaque.', '4.6', 'Terrasse pilotis - Langoustes grillées - Mer des Caraïbes', '🦞', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('38', 'Le Cocotier', 'Créole/Grillades', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Plage de la Caravelle, Sainte-Anne', 'Restaurant sous les cocotiers avec vue imprenable sur la plage de sable blanc. Cuisine créole et grillades au feu de bois. Ambiance tropicale authentique.', '4.2', 'Sous les cocotiers - Sable blanc - Grillades feu de bois', '🥥', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('39', 'Ti Kaz Créole', 'Créole traditionnel', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', 'Centre-ville, Sainte-Anne', 'Petite case créole authentique proposant une cuisine traditionnelle. Spécialités de boudin créole et accras de morue. Terrasse fleurie typiquement antillaise.', '3.9', 'Case authentique - Boudin créole - Terrasse fleurie', '🌺', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('40', 'Le Gondwana', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.7063817816215296.jpg', 'La Marina Bas du Fort, 97110 Pointe-à-Pitre', 'Restaurant spécialisé dans la cuisine traditionnelle d''Afrique de l''ouest, ambiance chaleureuse et musicale', '4.0', 'Spécialités africaines', 'fish', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.7063817816215296.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.4072845767152945.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.26992805001792086.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8639644312008786.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('41', 'Délices Nature', 'Végétarien', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Rue Neil Armstrong, 97110 Pointe-à-Pitre', 'Restaurant végétarien authentique proposant une cuisine maison à base de produits locaux frais et de saison, dans une ambiance calme et conviviale', '4.5', 'Plats végétariens du jour', 'restaurant', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('43', 'Le Yacht Club', 'Fusion Franco-Créole', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', 'Quai Lardennoy - La Darse, 97110 Pointe-à-Pitre', 'Restaurant avec vue imprenable sur le port offrant une cuisine raffinée mêlant saveurs créoles et françaises. Cadre élégant et atmosphère maritime.', '4.0', 'Happy Hour tous les jours de 17h à 19h', 'restaurant', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('44', 'La Canne à Sucre', 'Créole', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8485181764151174.jpg', 'Port de Pointe-à-Pitre, 97110 Pointe-à-Pitre', 'Restaurant en bord de mer proposant une cuisine créole raffinée avec une vue magnifique sur les bateaux. Spécialités de poissons et fruits de mer.', '4.2', 'Menu du jour à 23€ (entrée + plat + dessert)', 'chef-hat', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.8485181764151174.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.4608350485807652.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.9832159688037997.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.9442431330479509.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '13', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('45', 'L''Intemporelle', 'Gastronomique Caribéen', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 'Mémorial ACTe, 97110 Pointe-à-Pitre', 'Restaurant d''exception au cœur du Mémorial ACTe offrant une vue imprenable sur la mer des Caraïbes. Cuisine raffinée célébrant les saveurs caribéennes avec une touche de modernité.', '4.2', 'Menu déjeuner sur réservation', 'restaurant', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('46', 'Gwot An Nou', 'Créole Moderne', 'https://images.unsplash.com/photo-1544025162-d76694265947', '9 Rue Hincelin, 97110 Pointe-à-Pitre', 'Une véritable pépite culinaire dans un cadre intimiste et chaleureux. La cuisine créole y est revisitée avec talent, offrant des plats généreux aux saveurs authentiques.', '4.5', 'Plat du jour à 15€', 'restaurant', '[]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('47', 'La Toubana Hotel & Spa', 'Autre', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.33636318667443177.jpg', 'Route de Sainte-Anne, Sainte-Anne 97180 Guadeloupe', 'A l''entrée du charmant village de pêcheurs de Sainte-Anne, posé sur la Grande-Terre et ses plages de sable blond, cet hôtel au charme fou à la vue panoramique imprenable vous fera goûter le calme et la douceur des Caraïbes françaises. Grâce à son cadre unique qui domine l''océan, face à Marie-Galante, Les Saintes et la Désirade, vous savourerez chaque minute de votre séjour, bercés par les Alizés. Une petite plage idéale et très tranquille se trouve au pied de l''hôtel. C''est aussi un point de départ idéal pour sillonner la Guadeloupe. La Toubana Hôtel & Spa est situé à : - 20 km de l’aéroport International POLE CARAIBES - 16 km de Pointe-à-Pitre - 1 km du village de Sainte-Anne.', '5.0', '-20%', 'utensils', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.33636318667443177.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.1615059635678454.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.2799194124152278.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.06229643570651222.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '0', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', NULL, 'f');
INSERT INTO public.restaurants (id, name, type, image, location, description, rating, offer, icon, gallery_images, created_at, updated_at, poids, menus, opening_hours, partner_id, is_partner) VALUES ('15', 'An Chodyè de test', 'Antillais', 'https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.9162738585547449.jpg', '59 Rue Gilbert de Chambertrand, Pointe-à-Pitre 97110, +590 590 82-5972', 'Restaurant créole traditionnel spécialisé dans les soupes et plats créoles, situé dans un quartier créole ancien.', '4.5', 'Spécialités soupes créoles - Ambiance conviviale - À emporter', 'fish', '["https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.9162738585547449.jpg", "https://psryoyugyimibjhwhvlh.supabase.co/storage/v1/object/public/restaurant-images/0.011086559714632571.jpg"]', '2025-06-25 21:00:56.281633+00', '2025-06-25 21:00:56.281633+00', '15', '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre de merde", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}, {"name": "Boissons", "items": [{"name": "Coca cola", "price": 2}, {"name": "Jus d''orange", "price": 3}, {"name": "Jus de pomme", "price": 3}, {"name": "Viande hachée", "price": 1.5}]}, {"name": "Grillades", "items": [{"name": "Poisson", "price": 15}, {"name": "Poulet", "price": 15}, {"name": "Ribs", "price": 15}]}]', '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}', '10', 't');



--
-- Data for Name: saved_offers; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.saved_offers



--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.subscribers



--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.subscription_plans
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('1', 'Découverte', 'Essai gratuit', '0', '30', '["Accès limité", "1 bon par mois"]', 'f', '1', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('2', 'Classique', 'Accès complet', '999', '30', '["Accès complet", "5 bons par mois"]', 'f', '2', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('3', 'Premium', 'Accès illimité', '2499', '90', '["Accès illimité", "Bons illimités", "Offres exclusives"]', 'f', '3', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('4', 'Annuel', 'Meilleur prix', '7999', '365', '["Tout inclus", "2 mois offerts"]', 'f', '4', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('5', 'Gratuit', 'Pour découvrir nos activités', '0', '365', '{"features": ["Accès à toutes les activités (tarif de base)", "Newsletter mensuelle", "Compte personnel"], "discount_percent": 0}', 't', '1', '2025-12-21 01:16:33.497597+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('6', 'Passionné', 'Pour les amateurs d''activités nautiques', '1500', '365', '{"features": ["15% de réduction sur toutes les activités", "Accès prioritaire aux réservations", "Événements VIP", "Support prioritaire"], "discount_percent": 15}', 't', '2', '2025-12-21 01:16:34.08432+00');
INSERT INTO public.subscription_plans (id, name, description, price_cents, duration_days, features, is_active, sort_order, created_at) VALUES ('7', 'Expert', 'L''expérience ultime', '9000', '365', '{"features": ["25% de réduction sur toutes les activités", "Accès illimité aux équipements", "Événements exclusifs", "Service conciergerie dédié", "Assurance activités incluse"], "discount_percent": 25}', 't', '3', '2025-12-21 01:16:34.651701+00');



--
-- Data for Name: travel_offers; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.travel_offers
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('1', NULL, 'Voyage exceptionnel à Dubaï', 'Le Festival des Soldes à DUBAI au départ de POINTE À PITRE. 8 jours / 5 nuits Hôtel 4 étoiles. OFFRE aux membres du CLUB CRÉOLE avec excursions offertes. Découvrez les merveilles de cette ville futuriste : Burj Khalifa, Palm Jumeirah, souks traditionnels et bien plus encore.', 'Dubaï, Émirats Arabes Unis', '8', '1299.00', 'Pointe-à-Pitre', '2025-12-19', '2025-12-27', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Hôtel 4 étoiles", "Petit-déjeuner", "Excursions guidées", "Transferts aéroport", "Assurance voyage"]', '["Déjeuners et dîners", "Dépenses personnelles", "Pourboires"]', '30', '12', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('2', NULL, 'Escapade à New York', 'Découvrez la Big Apple avec ce séjour de 5 jours dans la ville qui ne dort jamais. Hébergement en plein cœur de Manhattan. Visitez Times Square, Central Park, la Statue de la Liberté et bien plus encore. Une expérience inoubliable dans la plus grande ville américaine.', 'New York, États-Unis', '5', '899.00', 'Fort-de-France', '2025-03-15', '2025-03-20', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Hôtel 3 étoiles Manhattan", "Petit-déjeuner", "Transferts aéroport", "City Pass 3 attractions"]', '["Repas non mentionnés", "Dépenses personnelles", "Assurance voyage optionnelle"]', '25', '8', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('3', NULL, 'Séjour Paradisiaque à Cuba', 'Partez à la découverte de Cuba, l''île aux mille couleurs. 7 jours de détente et de découverte entre La Havane et Varadero. Immergez-vous dans la culture cubaine, sa musique, sa danse et son histoire fascinante.', 'La Havane & Varadero, Cuba', '7', '1150.00', 'Pointe-à-Pitre', '2025-04-10', '2025-04-17', 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1570299437522-462f9cc11f06?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Hôtel 4 étoiles tout inclus", "Excursion La Havane", "Transferts", "Assurance voyage"]', '["Visa touristique (25€)", "Dépenses personnelles", "Pourboires"]', '20', '5', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('4', NULL, 'Week-end à Miami', 'Évadez-vous le temps d''un long week-end à Miami. 4 jours pour profiter des plages de South Beach, de l''art déco d''Ocean Drive et de l''ambiance festive de cette ville mythique de Floride.', 'Miami, Floride', '4', '699.00', 'Fort-de-France', '2025-05-22', '2025-05-26', 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Hôtel 3 étoiles South Beach", "Petit-déjeuner", "Transferts aéroport"]', '["Repas non mentionnés", "Dépenses personnelles", "ESTA (21$)"]', '30', '15', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('5', NULL, 'Découverte du Mexique', 'Explorez les trésors du Mexique : Cancún, Riviera Maya et sites archéologiques mayas. 10 jours de dépaysement total entre plages paradisiaques, cenotes mystérieux et pyramides ancestrales.', 'Cancún & Riviera Maya, Mexique', '10', '1499.00', 'Pointe-à-Pitre', '2025-06-05', '2025-06-15', 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1570737543098-0983d88f796d?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Resort 5 étoiles tout inclus", "Excursion Chichen Itza", "Excursion cenotes", "Transferts"]', '["Dépenses personnelles", "Pourboires", "Activités optionnelles"]', '25', '10', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('6', NULL, 'Croisière Caraïbes', 'Une croisière de rêve de 7 jours à travers les plus belles îles des Caraïbes. Escales à Saint-Martin, Antigua, Sainte-Lucie et Barbade. Détente et découverte à bord d''un navire de luxe.', 'Caraïbes (Multi-destinations)', '7', '1350.00', 'Pointe-à-Pitre', '2025-07-12', '2025-07-19', 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1559599746-8823b38544c6?q=80&w=1760&auto=format&fit=crop"]', '["Cabine extérieure", "Pension complète à bord", "Animations et spectacles", "Escales guidées", "Taxes portuaires"]', '["Boissons alcoolisées", "Excursions à terre optionnelles", "Pourboires"]', '40', '22', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('7', NULL, 'Safari en Afrique du Sud', 'Vivez une aventure unique avec ce safari de 12 jours en Afrique du Sud. Découvrez les Big Five dans le parc Kruger, visitez Cape Town et la route des vins. Une expérience hors du commun.', 'Johannesburg & Cape Town, Afrique du Sud', '12', '2499.00', 'Pointe-à-Pitre', '2025-08-20', '2025-09-01', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1760&auto=format&fit=crop"]', '["Vols internationaux", "Hébergements lodges et hôtels", "Safari guidé parc Kruger", "Visite Cape Town", "Route des vins", "Transferts", "Guide francophone"]', '["Visa si nécessaire", "Vaccinations", "Dépenses personnelles", "Pourboires"]', '16', '6', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');
INSERT INTO public.travel_offers (id, partner_id, title, description, destination, duration_days, price, departure_location, departure_date, return_date, image, gallery_images, inclusions, exclusions, max_participants, current_participants, is_active, created_at, updated_at) VALUES ('8', NULL, 'Séjour Balnéaire en République Dominicaine', 'Profitez de 6 jours de farniente à Punta Cana. Hôtel 5 étoiles tout inclus face à la mer des Caraïbes. Plages de sable blanc, eaux turquoise et cocotiers vous attendent.', 'Punta Cana, République Dominicaine', '6', '950.00', 'Fort-de-France', '2025-02-08', '2025-02-14', 'https://images.unsplash.com/photo-1569700107425-1ae8a9e07dea?q=80&w=1760&auto=format&fit=crop', '["https://images.unsplash.com/photo-1569700107425-1ae8a9e07dea?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=1760&auto=format&fit=crop", "https://images.unsplash.com/photo-1580541631950-7282082b53ce?q=80&w=1760&auto=format&fit=crop"]', '["Vol aller-retour", "Resort 5 étoiles tout inclus", "Sports nautiques", "Animations", "Transferts aéroport"]', '["Excursions optionnelles", "Dépenses personnelles", "Pourboires"]', '35', '18', 't', '2025-12-11 21:01:49.508506+00', '2025-12-11 21:01:49.508506+00');



--
-- Data for Name: travel_reservations; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.travel_reservations



--
-- Data for Name: user_subscriptions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.user_subscriptions
INSERT INTO public.user_subscriptions (id, user_id, plan_id, status, started_at, expires_at, cancelled_at, payment_provider, payment_reference, created_at, updated_at) VALUES ('a4c28bb3-376c-4dcc-8daa-693a7383a984', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '3', 'active', '2025-12-19 03:01:45.176844+00', '2026-03-19 03:01:45.176844+00', NULL, 'promo', NULL, '2025-12-19 03:01:45.176844+00', '2025-12-19 03:01:45.176844+00');
INSERT INTO public.user_subscriptions (id, user_id, plan_id, status, started_at, expires_at, cancelled_at, payment_provider, payment_reference, created_at, updated_at) VALUES ('2c035f3d-f056-4bdd-b4f7-b41d504faa15', 'c220ed82-db9b-4dec-ad56-0c93fad6eae7', '1', 'active', '2025-12-20 00:00:00+00', '2026-01-19 00:00:00+00', NULL, 'free', NULL, '2025-12-20 15:07:23.723985+00', '2025-12-20 15:07:23.723985+00');



--
-- Data for Name: vouchers; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

-- Converted from COPY public.vouchers



--
-- Data for Name: voyance_consultations; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.voyance_consultations



--
-- Data for Name: voyance_mediums; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.voyance_mediums
INSERT INTO public.voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at) VALUES ('1', 'Madame Solange', '{Tarot,"Voyance pure",Médiumnité}', 'Médium depuis plus de 20 ans, spécialisée dans la voyance pure et la lecture de tarot. Je vous aide à éclaircir vos questionnements sur l''amour, le travail et la famille.', '/placeholder.svg', '20', '4.8', '60.00', '{}', '+590 690 12 34 56', 'solange.voyance@email.com', NULL, '{français,créole}', '{présentiel,téléphone,visio}', 'Pointe-à-Pitre', 't', '2025-12-11 13:13:20.611292+00', '2025-12-11 13:13:20.611292+00');
INSERT INTO public.voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at) VALUES ('2', 'Maître Antoine', '{Cartomancie,Numérologie,Astrologie}', 'Cartomancien et numérologue expérimenté. Consultation personnalisée pour vous guider dans vos choix de vie et révéler votre potentiel caché.', '/placeholder.svg', '15', '4.6', '50.00', '{}', '+590 690 65 43 21', 'antoine.cartes@email.com', NULL, '{français}', '{présentiel,téléphone}', 'Basse-Terre', 't', '2025-12-11 13:13:20.611292+00', '2025-12-11 13:13:20.611292+00');
INSERT INTO public.voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at) VALUES ('3', 'Mama Josephine', '{Spiritisme,Désenvoûtement,Protection}', 'Spécialiste en spiritisme et protection spirituelle. Plus de 25 ans d''expérience dans l''aide aux personnes en difficulté spirituelle.', '/placeholder.svg', '25', '4.9', '80.00', '{}', '+590 690 98 76 54', 'josephine.spirit@email.com', NULL, '{français,créole,anglais}', '{présentiel}', 'Le Gosier', 't', '2025-12-11 13:13:20.611292+00', '2025-12-11 13:13:20.611292+00');
INSERT INTO public.voyance_mediums (id, name, specialties, description, image, experience_years, rating, price_per_session, availability_schedule, contact_phone, contact_email, contact_whatsapp, languages, consultation_types, location, is_active, created_at, updated_at) VALUES ('4', 'Voyant Marcus', '{"Voyance par téléphone",Pendule,Cristallomancie}', 'Voyant spécialisé dans les consultations à distance. Utilise le pendule et les cristaux pour des prédictions précises.', '/placeholder.svg', '12', '4.4', '45.00', '{}', '+590 690 11 22 33', 'marcus.voyant@email.com', NULL, '{français,anglais}', '{téléphone,visio}', 'Saint-François', 't', '2025-12-11 13:13:20.611292+00', '2025-12-11 13:13:20.611292+00');



--
-- Data for Name: voyance_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Converted from COPY public.voyance_reviews
INSERT INTO public.voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES ('1', '1', 'Marie L.', '5', 'Consultation exceptionnelle ! Madame Solange a su cerner mes préoccupations avec une précision remarquable.', '2024-01-15', '2025-12-11 13:13:20.710842+00');
INSERT INTO public.voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES ('2', '1', 'Jean-Paul D.', '4', 'Très bonne voyante, conseils utiles et bienveillants. Je recommande vivement.', '2024-02-03', '2025-12-11 13:13:20.710842+00');
INSERT INTO public.voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES ('3', '2', 'Claudette M.', '5', 'Maître Antoine m''a aidée à prendre des décisions importantes. Merci pour cette guidance précieuse.', '2024-01-28', '2025-12-11 13:13:20.710842+00');
INSERT INTO public.voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES ('4', '3', 'Robert K.', '5', 'Mama Josephine a résolu mes problèmes spirituels. Une vraie professionnelle !', '2024-02-10', '2025-12-11 13:13:20.710842+00');
INSERT INTO public.voyance_reviews (id, medium_id, client_name, rating, comment, consultation_date, created_at) VALUES ('5', '4', 'Sandra B.', '4', 'Consultation par téléphone très satisfaisante avec Marcus. Prédictions justes.', '2024-02-05', '2025-12-11 13:13:20.710842+00');



--
-- Data for Name: messages_2025_12_20; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_20



--
-- Data for Name: messages_2025_12_21; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_21



--
-- Data for Name: messages_2025_12_22; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_22



--
-- Data for Name: messages_2025_12_23; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_23



--
-- Data for Name: messages_2025_12_24; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_24



--
-- Data for Name: messages_2025_12_25; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.messages_2025_12_25



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.schema_migrations
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116024918', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116045059', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116050929', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116051442', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116212300', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116213355', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116213934', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211116214523', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211122062447', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211124070109', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211202204204', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211202204605', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211210212804', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20211228014915', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220107221237', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220228202821', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220312004840', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220603231003', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220603232444', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220615214548', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220712093339', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220908172859', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20220916233421', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230119133233', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230128025114', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230128025212', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230227211149', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230228184745', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230308225145', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20230328144023', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231018144023', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144023', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144024', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20231204144025', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240108234812', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240109165339', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240227174441', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240311171622', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240321100241', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240401105812', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240418121054', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240523004032', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240618124746', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240801235015', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240805133720', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240827160934', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240919163303', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20240919163305', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241019105805', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241030150047', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241108114728', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241121104152', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241130184212', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241220035512', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241220123912', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20241224161212', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250107150512', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250110162412', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250123174212', '2025-12-11 12:26:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES ('20250128220012', '2025-12-11 12:26:52');



--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

-- Converted from COPY realtime.subscription



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- Converted from COPY storage.buckets



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- Converted from COPY storage.migrations
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('0', 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-12-11 12:26:33.175292');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('1', 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-12-11 12:26:33.246854');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('2', 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-12-11 12:26:33.30278');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('3', 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-12-11 12:26:33.404114');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('4', 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-12-11 12:26:33.529737');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('5', 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-12-11 12:26:33.559762');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('6', 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-12-11 12:26:33.579812');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('7', 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-12-11 12:26:33.596049');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('8', 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-12-11 12:26:33.615533');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('9', 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-12-11 12:26:33.626801');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('10', 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-12-11 12:26:33.646707');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('11', 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-12-11 12:26:33.66817');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('12', 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-12-11 12:26:33.698798');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('13', 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-12-11 12:26:33.708157');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('14', 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-12-11 12:26:33.728924');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('15', 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-12-11 12:26:33.910733');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('16', 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-12-11 12:26:33.932541');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('17', 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-12-11 12:26:33.959654');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('18', 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-12-11 12:26:33.989165');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('19', 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-12-11 12:26:34.029305');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('20', 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-12-11 12:26:34.056847');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('21', 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-12-11 12:26:34.088833');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('22', 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-12-11 12:26:34.221755');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('23', 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-12-11 12:26:34.349808');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('24', 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-12-11 12:26:34.380289');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('25', 'custom-metadata', '67eb93b7e8d401cafcdc97f9ac779e71a79bfe03', '2025-12-11 12:26:34.408749');



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- Converted from COPY storage.objects



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- Converted from COPY storage.s3_multipart_uploads



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- Converted from COPY storage.s3_multipart_uploads_parts



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

-- Converted from COPY supabase_functions.hooks



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

-- Converted from COPY supabase_functions.migrations
INSERT INTO supabase_functions.migrations (version, inserted_at) VALUES ('initial', '2025-12-11 12:25:28.043348+00');
INSERT INTO supabase_functions.migrations (version, inserted_at) VALUES ('20210809183423_update_grants', '2025-12-11 12:25:28.043348+00');



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

-- Converted from COPY vault.secrets



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 79, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: accommodation_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.accommodation_reservations_id_seq', 1, false);


--
-- Name: accommodations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.accommodations_id_seq', 16, true);


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 15, true);


--
-- Name: activity_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_images_id_seq', 2, true);


--
-- Name: activity_inclusions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_inclusions_id_seq', 8, true);


--
-- Name: activity_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_levels_id_seq', 4, true);


--
-- Name: activity_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_reservations_id_seq', 1, false);


--
-- Name: activity_time_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_time_slots_id_seq', 4, true);


--
-- Name: bons_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bons_plans_id_seq', 6, true);


--
-- Name: car_client_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_client_reviews_id_seq', 1, false);


--
-- Name: car_models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_models_id_seq', 12, true);


--
-- Name: car_rental_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_rental_companies_id_seq', 1, false);


--
-- Name: car_rental_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_rental_features_id_seq', 24, true);


--
-- Name: car_rental_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_rental_reservations_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.categories_id_seq', 4, true);


--
-- Name: concerts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.concerts_id_seq', 10, true);


--
-- Name: leisure_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leisure_activities_id_seq', 1, true);


--
-- Name: loisirs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.loisirs_id_seq', 5, true);


--
-- Name: newsletter_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.newsletter_subscriptions_id_seq', 18, true);


--
-- Name: nightlife_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.nightlife_events_id_seq', 5, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.offers_id_seq', 6, true);


--
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.partners_id_seq', 10, true);


--
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotions_id_seq', 4, true);


--
-- Name: restaurant_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.restaurant_reservations_id_seq', 1, false);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 1, false);


--
-- Name: subscription_plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.subscription_plans_id_seq', 7, true);


--
-- Name: travel_offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.travel_offers_id_seq', 8, true);


--
-- Name: travel_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('public.travel_reservations_id_seq', 1, false);


--
-- Name: voyance_mediums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.voyance_mediums_id_seq', 4, true);


--
-- Name: voyance_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.voyance_reviews_id_seq', 5, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: accommodation_reservations accommodation_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.accommodation_reservations
    ADD CONSTRAINT accommodation_reservations_pkey PRIMARY KEY (id);


--
-- Name: accommodations accommodations_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.accommodations
    ADD CONSTRAINT accommodations_pkey PRIMARY KEY (id);


--
-- Name: activities activities_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_name_unique UNIQUE (name);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: activity_images activity_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_images
    ADD CONSTRAINT activity_images_pkey PRIMARY KEY (id);


--
-- Name: activity_inclusions activity_inclusions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_inclusions
    ADD CONSTRAINT activity_inclusions_pkey PRIMARY KEY (id);


--
-- Name: activity_levels activity_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_levels
    ADD CONSTRAINT activity_levels_pkey PRIMARY KEY (id);


--
-- Name: activity_reservations activity_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_reservations
    ADD CONSTRAINT activity_reservations_pkey PRIMARY KEY (id);


--
-- Name: activity_time_slots activity_time_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_time_slots
    ADD CONSTRAINT activity_time_slots_pkey PRIMARY KEY (id);


--
-- Name: bons_plans bons_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bons_plans
    ADD CONSTRAINT bons_plans_pkey PRIMARY KEY (id);


--
-- Name: car_client_reviews car_client_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_client_reviews
    ADD CONSTRAINT car_client_reviews_pkey PRIMARY KEY (id);


--
-- Name: car_models car_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_models
    ADD CONSTRAINT car_models_pkey PRIMARY KEY (id);


--
-- Name: car_rental_companies car_rental_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_companies
    ADD CONSTRAINT car_rental_companies_pkey PRIMARY KEY (id);


--
-- Name: car_rental_features car_rental_features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_features
    ADD CONSTRAINT car_rental_features_pkey PRIMARY KEY (id);


--
-- Name: car_rental_reservations car_rental_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_reservations
    ADD CONSTRAINT car_rental_reservations_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: concerts concerts_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.concerts
    ADD CONSTRAINT concerts_pkey PRIMARY KEY (id);


--
-- Name: leisure_activities leisure_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leisure_activities
    ADD CONSTRAINT leisure_activities_pkey PRIMARY KEY (id);


--
-- Name: loisirs loisirs_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loisirs
    ADD CONSTRAINT loisirs_pkey PRIMARY KEY (id);


--
-- Name: loyalty_cards loyalty_cards_card_number_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loyalty_cards
    ADD CONSTRAINT loyalty_cards_card_number_key UNIQUE (card_number);


--
-- Name: loyalty_cards loyalty_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loyalty_cards
    ADD CONSTRAINT loyalty_cards_pkey PRIMARY KEY (id);


--
-- Name: loyalty_cards loyalty_cards_user_id_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loyalty_cards
    ADD CONSTRAINT loyalty_cards_user_id_key UNIQUE (user_id);


--
-- Name: newsletter_subscriptions newsletter_subscriptions_email_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.newsletter_subscriptions
    ADD CONSTRAINT newsletter_subscriptions_email_key UNIQUE (email);


--
-- Name: newsletter_subscriptions newsletter_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.newsletter_subscriptions
    ADD CONSTRAINT newsletter_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: nightlife_events nightlife_events_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.nightlife_events
    ADD CONSTRAINT nightlife_events_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: redemptions redemptions_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.redemptions
    ADD CONSTRAINT redemptions_pkey PRIMARY KEY (id);


--
-- Name: restaurant_reservations restaurant_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.restaurant_reservations
    ADD CONSTRAINT restaurant_reservations_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: saved_offers saved_offers_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.saved_offers
    ADD CONSTRAINT saved_offers_pkey PRIMARY KEY (id);


--
-- Name: saved_offers saved_offers_user_id_offer_id_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.saved_offers
    ADD CONSTRAINT saved_offers_user_id_offer_id_key UNIQUE (user_id, offer_id);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: subscription_plans subscription_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.subscription_plans
    ADD CONSTRAINT subscription_plans_pkey PRIMARY KEY (id);


--
-- Name: travel_offers travel_offers_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.travel_offers
    ADD CONSTRAINT travel_offers_pkey PRIMARY KEY (id);


--
-- Name: travel_reservations travel_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.travel_reservations
    ADD CONSTRAINT travel_reservations_pkey PRIMARY KEY (id);


--
-- Name: user_subscriptions user_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: vouchers vouchers_code_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_code_key UNIQUE (code);


--
-- Name: vouchers vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_pkey PRIMARY KEY (id);


--
-- Name: voyance_consultations voyance_consultations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voyance_consultations
    ADD CONSTRAINT voyance_consultations_pkey PRIMARY KEY (id);


--
-- Name: voyance_mediums voyance_mediums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voyance_mediums
    ADD CONSTRAINT voyance_mediums_pkey PRIMARY KEY (id);


--
-- Name: voyance_reviews voyance_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voyance_reviews
    ADD CONSTRAINT voyance_reviews_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_20 messages_2025_12_20_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_20
    ADD CONSTRAINT messages_2025_12_20_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_21 messages_2025_12_21_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_21
    ADD CONSTRAINT messages_2025_12_21_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_22 messages_2025_12_22_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_22
    ADD CONSTRAINT messages_2025_12_22_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_23 messages_2025_12_23_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_23
    ADD CONSTRAINT messages_2025_12_23_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_24 messages_2025_12_24_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_24
    ADD CONSTRAINT messages_2025_12_24_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_12_25 messages_2025_12_25_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_12_25
    ADD CONSTRAINT messages_2025_12_25_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX extensions_tenant_external_id_index ON _realtime.extensions USING btree (tenant_external_id);


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_accommodation_reservations_accommodation_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_accommodation_reservations_accommodation_id ON public.accommodation_reservations USING btree (accommodation_id);


--
-- Name: idx_accommodations_partner_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_accommodations_partner_id ON public.accommodations USING btree (partner_id);


--
-- Name: idx_accommodations_type; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_accommodations_type ON public.accommodations USING btree (type);


--
-- Name: idx_accommodations_weight; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_accommodations_weight ON public.accommodations USING btree (weight);


--
-- Name: idx_activity_images_activity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_images_activity_id ON public.activity_images USING btree (activity_id);


--
-- Name: idx_activity_inclusions_activity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_inclusions_activity_id ON public.activity_inclusions USING btree (activity_id);


--
-- Name: idx_activity_levels_activity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_levels_activity_id ON public.activity_levels USING btree (activity_id);


--
-- Name: idx_activity_reservations_activity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_reservations_activity_id ON public.activity_reservations USING btree (activity_id);


--
-- Name: idx_activity_reservations_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_reservations_date ON public.activity_reservations USING btree (reservation_date);


--
-- Name: idx_activity_reservations_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_reservations_status ON public.activity_reservations USING btree (status);


--
-- Name: idx_activity_reservations_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_reservations_user_id ON public.activity_reservations USING btree (user_id);


--
-- Name: idx_activity_time_slots_activity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_activity_time_slots_activity_id ON public.activity_time_slots USING btree (activity_id);


--
-- Name: idx_car_client_reviews_company; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_car_client_reviews_company ON public.car_client_reviews USING btree (rental_company_name);


--
-- Name: idx_car_client_reviews_rating; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_car_client_reviews_rating ON public.car_client_reviews USING btree (rating);


--
-- Name: idx_car_models_company_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_car_models_company_id ON public.car_models USING btree (company_id);


--
-- Name: idx_car_rental_features_company_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_car_rental_features_company_id ON public.car_rental_features USING btree (company_id);


--
-- Name: idx_concerts_genre; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_concerts_genre ON public.concerts USING btree (genre);


--
-- Name: idx_concerts_partner_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_concerts_partner_id ON public.concerts USING btree (partner_id);


--
-- Name: idx_nightlife_events_partner_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_nightlife_events_partner_id ON public.nightlife_events USING btree (partner_id);


--
-- Name: idx_nightlife_events_type; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_nightlife_events_type ON public.nightlife_events USING btree (type);


--
-- Name: idx_partners_business_type; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_partners_business_type ON public.partners USING btree (business_type);


--
-- Name: idx_partners_status; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_partners_status ON public.partners USING btree (status);


--
-- Name: idx_partners_user_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_partners_user_id ON public.partners USING btree (user_id);


--
-- Name: idx_profiles_email; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_profiles_email ON public.profiles USING btree (email);


--
-- Name: idx_profiles_name; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_profiles_name ON public.profiles USING btree (last_name, first_name);


--
-- Name: idx_profiles_phone; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_profiles_phone ON public.profiles USING btree (phone);


--
-- Name: idx_profiles_role; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_profiles_role ON public.profiles USING btree (role);


--
-- Name: idx_purchases_date; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_purchases_date ON public.purchases USING btree (purchase_date);


--
-- Name: idx_purchases_status; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_purchases_status ON public.purchases USING btree (status);


--
-- Name: idx_purchases_user_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_purchases_user_id ON public.purchases USING btree (user_id);


--
-- Name: idx_restaurant_reservations_restaurant_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_restaurant_reservations_restaurant_id ON public.restaurant_reservations USING btree (restaurant_id);


--
-- Name: idx_restaurants_is_partner; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_restaurants_is_partner ON public.restaurants USING btree (is_partner);


--
-- Name: idx_restaurants_poids; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_restaurants_poids ON public.restaurants USING btree (poids);


--
-- Name: idx_subscribers_email; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_subscribers_email ON public.subscribers USING btree (email);


--
-- Name: idx_subscribers_status; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_subscribers_status ON public.subscribers USING btree (subscription_status);


--
-- Name: idx_travel_offers_destination; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_travel_offers_destination ON public.travel_offers USING btree (destination);


--
-- Name: idx_travel_offers_is_active; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_travel_offers_is_active ON public.travel_offers USING btree (is_active);


--
-- Name: idx_travel_offers_partner_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_travel_offers_partner_id ON public.travel_offers USING btree (partner_id);


--
-- Name: idx_travel_reservations_offer_id; Type: INDEX; Schema: public; Owner: supabase_admin
--

CREATE INDEX idx_travel_reservations_offer_id ON public.travel_reservations USING btree (travel_offer_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: messages_2025_12_20_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_20_pkey;


--
-- Name: messages_2025_12_21_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_21_pkey;


--
-- Name: messages_2025_12_22_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_22_pkey;


--
-- Name: messages_2025_12_23_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_23_pkey;


--
-- Name: messages_2025_12_24_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_24_pkey;


--
-- Name: messages_2025_12_25_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_12_25_pkey;


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: activity_reservations update_activity_reservations_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_activity_reservations_updated_at BEFORE UPDATE ON public.activity_reservations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: bons_plans update_bons_plans_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_bons_plans_updated_at BEFORE UPDATE ON public.bons_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: car_client_reviews update_car_client_reviews_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_car_client_reviews_updated_at BEFORE UPDATE ON public.car_client_reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: car_models update_car_models_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_car_models_updated_at BEFORE UPDATE ON public.car_models FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: car_rental_companies update_car_rental_companies_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_car_rental_companies_updated_at BEFORE UPDATE ON public.car_rental_companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: leisure_activities update_leisure_activities_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_leisure_activities_updated_at BEFORE UPDATE ON public.leisure_activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: promotions update_promotions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: accommodation_reservations accommodation_reservations_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.accommodation_reservations
    ADD CONSTRAINT accommodation_reservations_accommodation_id_fkey FOREIGN KEY (accommodation_id) REFERENCES public.accommodations(id) ON DELETE CASCADE;


--
-- Name: activity_images activity_images_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_images
    ADD CONSTRAINT activity_images_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.leisure_activities(id) ON DELETE CASCADE;


--
-- Name: activity_inclusions activity_inclusions_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_inclusions
    ADD CONSTRAINT activity_inclusions_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.leisure_activities(id) ON DELETE CASCADE;


--
-- Name: activity_levels activity_levels_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_levels
    ADD CONSTRAINT activity_levels_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.leisure_activities(id) ON DELETE CASCADE;


--
-- Name: activity_reservations activity_reservations_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_reservations
    ADD CONSTRAINT activity_reservations_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.leisure_activities(id) ON DELETE CASCADE;


--
-- Name: activity_reservations activity_reservations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_reservations
    ADD CONSTRAINT activity_reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: activity_time_slots activity_time_slots_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_time_slots
    ADD CONSTRAINT activity_time_slots_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.leisure_activities(id) ON DELETE CASCADE;


--
-- Name: car_models car_models_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_models
    ADD CONSTRAINT car_models_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.car_rental_companies(id) ON DELETE CASCADE;


--
-- Name: car_rental_features car_rental_features_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_features
    ADD CONSTRAINT car_rental_features_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.car_rental_companies(id) ON DELETE CASCADE;


--
-- Name: car_rental_reservations car_rental_reservations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_rental_reservations
    ADD CONSTRAINT car_rental_reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: loyalty_cards loyalty_cards_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.loyalty_cards
    ADD CONSTRAINT loyalty_cards_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: offers offers_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: offers offers_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id);


--
-- Name: purchases purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: redemptions redemptions_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.redemptions
    ADD CONSTRAINT redemptions_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- Name: redemptions redemptions_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.redemptions
    ADD CONSTRAINT redemptions_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id);


--
-- Name: redemptions redemptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.redemptions
    ADD CONSTRAINT redemptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: redemptions redemptions_voucher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.redemptions
    ADD CONSTRAINT redemptions_voucher_id_fkey FOREIGN KEY (voucher_id) REFERENCES public.vouchers(id);


--
-- Name: restaurant_reservations restaurant_reservations_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.restaurant_reservations
    ADD CONSTRAINT restaurant_reservations_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- Name: saved_offers saved_offers_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.saved_offers
    ADD CONSTRAINT saved_offers_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- Name: saved_offers saved_offers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.saved_offers
    ADD CONSTRAINT saved_offers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: travel_reservations travel_reservations_travel_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.travel_reservations
    ADD CONSTRAINT travel_reservations_travel_offer_id_fkey FOREIGN KEY (travel_offer_id) REFERENCES public.travel_offers(id) ON DELETE CASCADE;


--
-- Name: user_subscriptions user_subscriptions_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.subscription_plans(id);


--
-- Name: user_subscriptions user_subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: vouchers vouchers_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- Name: vouchers vouchers_used_by_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_used_by_partner_id_fkey FOREIGN KEY (used_by_partner_id) REFERENCES public.partners(id);


--
-- Name: vouchers vouchers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: voyance_consultations voyance_consultations_medium_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voyance_consultations
    ADD CONSTRAINT voyance_consultations_medium_id_fkey FOREIGN KEY (medium_id) REFERENCES public.voyance_mediums(id) ON DELETE CASCADE;


--
-- Name: voyance_reviews voyance_reviews_medium_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voyance_reviews
    ADD CONSTRAINT voyance_reviews_medium_id_fkey FOREIGN KEY (medium_id) REFERENCES public.voyance_mediums(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletter_subscriptions Allow anonymous newsletter subscriptions; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow anonymous newsletter subscriptions" ON public.newsletter_subscriptions FOR INSERT TO anon WITH CHECK (true);


--
-- Name: partners Allow authenticated insert on partners; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow authenticated insert on partners" ON public.partners FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: activities Allow authenticated read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read" ON public.activities FOR SELECT TO authenticated USING (true);


--
-- Name: bons_plans Allow authenticated read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read" ON public.bons_plans FOR SELECT TO authenticated USING (true);


--
-- Name: car_models Allow authenticated read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read" ON public.car_models FOR SELECT TO authenticated USING (true);


--
-- Name: concerts Allow authenticated read; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow authenticated read" ON public.concerts FOR SELECT TO authenticated USING (true);


--
-- Name: leisure_activities Allow authenticated read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read" ON public.leisure_activities FOR SELECT TO authenticated USING (true);


--
-- Name: nightlife_events Allow authenticated read; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow authenticated read" ON public.nightlife_events FOR SELECT TO authenticated USING (true);


--
-- Name: promotions Allow authenticated read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated read" ON public.promotions FOR SELECT TO authenticated USING (true);


--
-- Name: travel_offers Allow authenticated read; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow authenticated read" ON public.travel_offers FOR SELECT TO authenticated USING (true);


--
-- Name: profiles Allow insert on profiles; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow insert on profiles" ON public.profiles FOR INSERT WITH CHECK (true);


--
-- Name: subscribers Allow public insert; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public insert" ON public.subscribers FOR INSERT WITH CHECK (true);


--
-- Name: travel_reservations Allow public insert on travel_reservations; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public insert on travel_reservations" ON public.travel_reservations FOR INSERT WITH CHECK (true);


--
-- Name: concerts Allow public read access on concerts; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read access on concerts" ON public.concerts FOR SELECT USING (true);


--
-- Name: nightlife_events Allow public read access on nightlife_events; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read access on nightlife_events" ON public.nightlife_events FOR SELECT USING (true);


--
-- Name: partners Allow public read access on partners; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read access on partners" ON public.partners FOR SELECT USING (true);


--
-- Name: profiles Allow public read access on profiles; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read access on profiles" ON public.profiles FOR SELECT USING (true);


--
-- Name: travel_offers Allow public read access on travel_offers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read access on travel_offers" ON public.travel_offers FOR SELECT USING ((is_active = true));


--
-- Name: travel_reservations Allow public read on travel_reservations; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow public read on travel_reservations" ON public.travel_reservations FOR SELECT USING (true);


--
-- Name: subscribers Allow service role all; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow service role all" ON public.subscribers TO service_role USING (true) WITH CHECK (true);


--
-- Name: purchases Allow service role all purchases; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow service role all purchases" ON public.purchases TO service_role USING (true) WITH CHECK (true);


--
-- Name: newsletter_subscriptions Allow service role full access to newsletter subscriptions; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow service role full access to newsletter subscriptions" ON public.newsletter_subscriptions TO service_role USING (true) WITH CHECK (true);


--
-- Name: subscribers Allow users read own; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow users read own" ON public.subscribers FOR SELECT USING ((email = (auth.jwt() ->> 'email'::text)));


--
-- Name: purchases Allow users read own purchases; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow users read own purchases" ON public.purchases FOR SELECT TO authenticated USING ((user_id = auth.uid()));


--
-- Name: partners Allow users to update own partners; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow users to update own partners" ON public.partners FOR UPDATE TO authenticated USING (((auth.uid() = user_id) OR (user_id IS NULL)));


--
-- Name: newsletter_subscriptions Allow users to view newsletter subscriptions; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow users to view newsletter subscriptions" ON public.newsletter_subscriptions FOR SELECT USING (true);


--
-- Name: subscribers Allow users update own; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Allow users update own" ON public.subscribers FOR UPDATE USING ((email = (auth.jwt() ->> 'email'::text)));


--
-- Name: voyance_consultations Anyone can create consultations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can create consultations" ON public.voyance_consultations FOR INSERT WITH CHECK (true);


--
-- Name: offers Anyone can view active offers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Anyone can view active offers" ON public.offers FOR SELECT USING ((is_active = true));


--
-- Name: categories Anyone can view categories; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING ((is_active = true));


--
-- Name: subscription_plans Anyone can view plans; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Anyone can view plans" ON public.subscription_plans FOR SELECT USING ((is_active = true));


--
-- Name: bons_plans Lecture publique des bons plans actifs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Lecture publique des bons plans actifs" ON public.bons_plans FOR SELECT USING ((is_active = true));


--
-- Name: promotions Lecture publique des promotions actives; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Lecture publique des promotions actives" ON public.promotions FOR SELECT USING ((is_active = true));


--
-- Name: voyance_mediums Public can view active mediums; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view active mediums" ON public.voyance_mediums FOR SELECT USING ((is_active = true));


--
-- Name: voyance_reviews Public can view reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view reviews" ON public.voyance_reviews FOR SELECT USING (true);


--
-- Name: activity_images Public read access for activity_images; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for activity_images" ON public.activity_images FOR SELECT USING (true);


--
-- Name: activity_inclusions Public read access for activity_inclusions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for activity_inclusions" ON public.activity_inclusions FOR SELECT USING (true);


--
-- Name: activity_levels Public read access for activity_levels; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for activity_levels" ON public.activity_levels FOR SELECT USING (true);


--
-- Name: activity_time_slots Public read access for activity_time_slots; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for activity_time_slots" ON public.activity_time_slots FOR SELECT USING (true);


--
-- Name: car_client_reviews Public read access for car_client_reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for car_client_reviews" ON public.car_client_reviews FOR SELECT USING (true);


--
-- Name: car_models Public read access for car_models; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for car_models" ON public.car_models FOR SELECT USING (true);


--
-- Name: leisure_activities Public read access for leisure_activities; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read access for leisure_activities" ON public.leisure_activities FOR SELECT USING (true);


--
-- Name: activities Public read activities; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read activities" ON public.activities FOR SELECT USING (true);


--
-- Name: activity_images Public read activity_images; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read activity_images" ON public.activity_images FOR SELECT USING (true);


--
-- Name: activity_inclusions Public read activity_inclusions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read activity_inclusions" ON public.activity_inclusions FOR SELECT USING (true);


--
-- Name: activity_levels Public read activity_levels; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read activity_levels" ON public.activity_levels FOR SELECT USING (true);


--
-- Name: activity_time_slots Public read activity_time_slots; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read activity_time_slots" ON public.activity_time_slots FOR SELECT USING (true);


--
-- Name: bons_plans Public read bons_plans; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read bons_plans" ON public.bons_plans FOR SELECT USING (true);


--
-- Name: car_client_reviews Public read car_client_reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read car_client_reviews" ON public.car_client_reviews FOR SELECT USING (true);


--
-- Name: car_models Public read car_models; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read car_models" ON public.car_models FOR SELECT USING (true);


--
-- Name: car_rental_companies Public read car_rental_companies; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read car_rental_companies" ON public.car_rental_companies FOR SELECT USING (true);


--
-- Name: car_rental_features Public read car_rental_features; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read car_rental_features" ON public.car_rental_features FOR SELECT USING (true);


--
-- Name: leisure_activities Public read leisure_activities; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read leisure_activities" ON public.leisure_activities FOR SELECT USING (true);


--
-- Name: promotions Public read promotions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read promotions" ON public.promotions FOR SELECT USING (true);


--
-- Name: voyance_mediums Public read voyance_mediums; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read voyance_mediums" ON public.voyance_mediums FOR SELECT USING (true);


--
-- Name: voyance_reviews Public read voyance_reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read voyance_reviews" ON public.voyance_reviews FOR SELECT USING (true);


--
-- Name: profiles Service role can view all profiles; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Service role can view all profiles" ON public.profiles USING (((auth.jwt() ->> 'role'::text) = 'service_role'::text));


--
-- Name: activity_reservations Users can insert their own reservations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own reservations" ON public.activity_reservations FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: saved_offers Users can save offers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can save offers" ON public.saved_offers FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: saved_offers Users can unsave offers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can unsave offers" ON public.saved_offers FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: activity_reservations Users can update their own reservations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own reservations" ON public.activity_reservations FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: activity_reservations Users can view their own reservations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own reservations" ON public.activity_reservations FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: loyalty_cards Users view own card; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users view own card" ON public.loyalty_cards FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: redemptions Users view own redemptions; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users view own redemptions" ON public.redemptions FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_subscriptions Users view own subscriptions; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users view own subscriptions" ON public.user_subscriptions FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: vouchers Users view own vouchers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users view own vouchers" ON public.vouchers FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: saved_offers Users view saved offers; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users view saved offers" ON public.saved_offers FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: activities; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_images; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_images ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_inclusions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_inclusions ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_levels; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_levels ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_reservations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_reservations ENABLE ROW LEVEL SECURITY;

--
-- Name: activity_time_slots; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.activity_time_slots ENABLE ROW LEVEL SECURITY;

--
-- Name: bons_plans; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bons_plans ENABLE ROW LEVEL SECURITY;

--
-- Name: car_client_reviews; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.car_client_reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: car_models; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.car_models ENABLE ROW LEVEL SECURITY;

--
-- Name: car_rental_companies; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.car_rental_companies ENABLE ROW LEVEL SECURITY;

--
-- Name: car_rental_features; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.car_rental_features ENABLE ROW LEVEL SECURITY;

--
-- Name: categories; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--
-- Name: concerts; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;

--
-- Name: leisure_activities; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.leisure_activities ENABLE ROW LEVEL SECURITY;

--
-- Name: loyalty_cards; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.loyalty_cards ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletter_subscriptions; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

--
-- Name: nightlife_events; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.nightlife_events ENABLE ROW LEVEL SECURITY;

--
-- Name: offers; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

--
-- Name: partners; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: promotions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

--
-- Name: purchases; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

--
-- Name: redemptions; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_offers; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.saved_offers ENABLE ROW LEVEL SECURITY;

--
-- Name: subscribers; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

--
-- Name: subscription_plans; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

--
-- Name: travel_offers; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.travel_offers ENABLE ROW LEVEL SECURITY;

--
-- Name: travel_reservations; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.travel_reservations ENABLE ROW LEVEL SECURITY;

--
-- Name: user_subscriptions; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

--
-- Name: vouchers; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

--
-- Name: voyance_consultations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.voyance_consultations ENABLE ROW LEVEL SECURITY;

--
-- Name: voyance_mediums; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.voyance_mediums ENABLE ROW LEVEL SECURITY;

--
-- Name: voyance_reviews; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.voyance_reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA supabase_functions; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA supabase_functions TO postgres;
GRANT USAGE ON SCHEMA supabase_functions TO anon;
GRANT USAGE ON SCHEMA supabase_functions TO authenticated;
GRANT USAGE ON SCHEMA supabase_functions TO service_role;
GRANT ALL ON SCHEMA supabase_functions TO supabase_functions_admin;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.handle_new_user() TO postgres;
GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION http_request(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO anon;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO authenticated;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO service_role;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO postgres;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE accommodation_reservations; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.accommodation_reservations TO postgres;
GRANT ALL ON TABLE public.accommodation_reservations TO anon;
GRANT ALL ON TABLE public.accommodation_reservations TO authenticated;
GRANT ALL ON TABLE public.accommodation_reservations TO service_role;


--
-- Name: SEQUENCE accommodation_reservations_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.accommodation_reservations_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.accommodation_reservations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.accommodation_reservations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.accommodation_reservations_id_seq TO service_role;


--
-- Name: TABLE accommodations; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.accommodations TO postgres;
GRANT ALL ON TABLE public.accommodations TO anon;
GRANT ALL ON TABLE public.accommodations TO authenticated;
GRANT ALL ON TABLE public.accommodations TO service_role;


--
-- Name: SEQUENCE accommodations_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.accommodations_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.accommodations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.accommodations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.accommodations_id_seq TO service_role;


--
-- Name: TABLE activities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activities TO anon;
GRANT ALL ON TABLE public.activities TO authenticated;
GRANT ALL ON TABLE public.activities TO service_role;


--
-- Name: SEQUENCE activities_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activities_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activities_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activities_id_seq TO service_role;


--
-- Name: TABLE activity_images; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_images TO anon;
GRANT ALL ON TABLE public.activity_images TO authenticated;
GRANT ALL ON TABLE public.activity_images TO service_role;


--
-- Name: SEQUENCE activity_images_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activity_images_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activity_images_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activity_images_id_seq TO service_role;


--
-- Name: TABLE activity_inclusions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_inclusions TO anon;
GRANT ALL ON TABLE public.activity_inclusions TO authenticated;
GRANT ALL ON TABLE public.activity_inclusions TO service_role;


--
-- Name: SEQUENCE activity_inclusions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activity_inclusions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activity_inclusions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activity_inclusions_id_seq TO service_role;


--
-- Name: TABLE activity_levels; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_levels TO anon;
GRANT ALL ON TABLE public.activity_levels TO authenticated;
GRANT ALL ON TABLE public.activity_levels TO service_role;


--
-- Name: SEQUENCE activity_levels_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activity_levels_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activity_levels_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activity_levels_id_seq TO service_role;


--
-- Name: TABLE activity_reservations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_reservations TO anon;
GRANT ALL ON TABLE public.activity_reservations TO authenticated;
GRANT ALL ON TABLE public.activity_reservations TO service_role;


--
-- Name: SEQUENCE activity_reservations_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activity_reservations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activity_reservations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activity_reservations_id_seq TO service_role;


--
-- Name: TABLE activity_time_slots; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activity_time_slots TO anon;
GRANT ALL ON TABLE public.activity_time_slots TO authenticated;
GRANT ALL ON TABLE public.activity_time_slots TO service_role;


--
-- Name: SEQUENCE activity_time_slots_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activity_time_slots_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activity_time_slots_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activity_time_slots_id_seq TO service_role;


--
-- Name: TABLE bons_plans; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bons_plans TO anon;
GRANT ALL ON TABLE public.bons_plans TO authenticated;
GRANT ALL ON TABLE public.bons_plans TO service_role;


--
-- Name: SEQUENCE bons_plans_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.bons_plans_id_seq TO anon;
GRANT ALL ON SEQUENCE public.bons_plans_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.bons_plans_id_seq TO service_role;


--
-- Name: TABLE car_client_reviews; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.car_client_reviews TO anon;
GRANT ALL ON TABLE public.car_client_reviews TO authenticated;
GRANT ALL ON TABLE public.car_client_reviews TO service_role;


--
-- Name: SEQUENCE car_client_reviews_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.car_client_reviews_id_seq TO anon;
GRANT ALL ON SEQUENCE public.car_client_reviews_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.car_client_reviews_id_seq TO service_role;


--
-- Name: TABLE car_models; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.car_models TO anon;
GRANT ALL ON TABLE public.car_models TO authenticated;
GRANT ALL ON TABLE public.car_models TO service_role;


--
-- Name: SEQUENCE car_models_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.car_models_id_seq TO anon;
GRANT ALL ON SEQUENCE public.car_models_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.car_models_id_seq TO service_role;


--
-- Name: TABLE car_rental_companies; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.car_rental_companies TO anon;
GRANT ALL ON TABLE public.car_rental_companies TO authenticated;
GRANT ALL ON TABLE public.car_rental_companies TO service_role;


--
-- Name: SEQUENCE car_rental_companies_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.car_rental_companies_id_seq TO anon;
GRANT ALL ON SEQUENCE public.car_rental_companies_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.car_rental_companies_id_seq TO service_role;


--
-- Name: TABLE car_rental_features; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.car_rental_features TO anon;
GRANT ALL ON TABLE public.car_rental_features TO authenticated;
GRANT ALL ON TABLE public.car_rental_features TO service_role;


--
-- Name: SEQUENCE car_rental_features_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.car_rental_features_id_seq TO anon;
GRANT ALL ON SEQUENCE public.car_rental_features_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.car_rental_features_id_seq TO service_role;


--
-- Name: TABLE car_rental_reservations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.car_rental_reservations TO anon;
GRANT ALL ON TABLE public.car_rental_reservations TO authenticated;
GRANT ALL ON TABLE public.car_rental_reservations TO service_role;


--
-- Name: SEQUENCE car_rental_reservations_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.car_rental_reservations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.car_rental_reservations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.car_rental_reservations_id_seq TO service_role;


--
-- Name: TABLE categories; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.categories TO postgres;
GRANT ALL ON TABLE public.categories TO anon;
GRANT ALL ON TABLE public.categories TO authenticated;
GRANT ALL ON TABLE public.categories TO service_role;


--
-- Name: SEQUENCE categories_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.categories_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.categories_id_seq TO anon;
GRANT ALL ON SEQUENCE public.categories_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.categories_id_seq TO service_role;


--
-- Name: TABLE concerts; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.concerts TO postgres;
GRANT ALL ON TABLE public.concerts TO anon;
GRANT ALL ON TABLE public.concerts TO authenticated;
GRANT ALL ON TABLE public.concerts TO service_role;


--
-- Name: SEQUENCE concerts_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.concerts_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.concerts_id_seq TO anon;
GRANT ALL ON SEQUENCE public.concerts_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.concerts_id_seq TO service_role;


--
-- Name: TABLE leisure_activities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.leisure_activities TO anon;
GRANT ALL ON TABLE public.leisure_activities TO authenticated;
GRANT ALL ON TABLE public.leisure_activities TO service_role;


--
-- Name: SEQUENCE leisure_activities_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.leisure_activities_id_seq TO anon;
GRANT ALL ON SEQUENCE public.leisure_activities_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.leisure_activities_id_seq TO service_role;


--
-- Name: TABLE loisirs; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.loisirs TO postgres;
GRANT ALL ON TABLE public.loisirs TO anon;
GRANT ALL ON TABLE public.loisirs TO authenticated;
GRANT ALL ON TABLE public.loisirs TO service_role;


--
-- Name: SEQUENCE loisirs_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.loisirs_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.loisirs_id_seq TO anon;
GRANT ALL ON SEQUENCE public.loisirs_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.loisirs_id_seq TO service_role;


--
-- Name: TABLE loyalty_cards; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.loyalty_cards TO postgres;
GRANT ALL ON TABLE public.loyalty_cards TO anon;
GRANT ALL ON TABLE public.loyalty_cards TO authenticated;
GRANT ALL ON TABLE public.loyalty_cards TO service_role;


--
-- Name: TABLE newsletter_subscriptions; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.newsletter_subscriptions TO postgres;
GRANT ALL ON TABLE public.newsletter_subscriptions TO anon;
GRANT ALL ON TABLE public.newsletter_subscriptions TO authenticated;
GRANT ALL ON TABLE public.newsletter_subscriptions TO service_role;


--
-- Name: SEQUENCE newsletter_subscriptions_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.newsletter_subscriptions_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.newsletter_subscriptions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.newsletter_subscriptions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.newsletter_subscriptions_id_seq TO service_role;


--
-- Name: TABLE nightlife_events; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.nightlife_events TO postgres;
GRANT ALL ON TABLE public.nightlife_events TO anon;
GRANT ALL ON TABLE public.nightlife_events TO authenticated;
GRANT ALL ON TABLE public.nightlife_events TO service_role;


--
-- Name: SEQUENCE nightlife_events_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.nightlife_events_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.nightlife_events_id_seq TO anon;
GRANT ALL ON SEQUENCE public.nightlife_events_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.nightlife_events_id_seq TO service_role;


--
-- Name: TABLE offers; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.offers TO postgres;
GRANT ALL ON TABLE public.offers TO anon;
GRANT ALL ON TABLE public.offers TO authenticated;
GRANT ALL ON TABLE public.offers TO service_role;


--
-- Name: SEQUENCE offers_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.offers_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.offers_id_seq TO anon;
GRANT ALL ON SEQUENCE public.offers_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.offers_id_seq TO service_role;


--
-- Name: TABLE partners; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.partners TO postgres;
GRANT ALL ON TABLE public.partners TO anon;
GRANT ALL ON TABLE public.partners TO authenticated;
GRANT ALL ON TABLE public.partners TO service_role;


--
-- Name: SEQUENCE partners_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.partners_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.partners_id_seq TO anon;
GRANT ALL ON SEQUENCE public.partners_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.partners_id_seq TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.profiles TO postgres;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE promotions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.promotions TO anon;
GRANT ALL ON TABLE public.promotions TO authenticated;
GRANT ALL ON TABLE public.promotions TO service_role;


--
-- Name: SEQUENCE promotions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.promotions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.promotions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.promotions_id_seq TO service_role;


--
-- Name: TABLE purchases; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.purchases TO postgres;
GRANT ALL ON TABLE public.purchases TO anon;
GRANT ALL ON TABLE public.purchases TO authenticated;
GRANT ALL ON TABLE public.purchases TO service_role;


--
-- Name: TABLE redemptions; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.redemptions TO postgres;
GRANT ALL ON TABLE public.redemptions TO anon;
GRANT ALL ON TABLE public.redemptions TO authenticated;
GRANT ALL ON TABLE public.redemptions TO service_role;


--
-- Name: TABLE restaurant_reservations; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.restaurant_reservations TO postgres;
GRANT ALL ON TABLE public.restaurant_reservations TO anon;
GRANT ALL ON TABLE public.restaurant_reservations TO authenticated;
GRANT ALL ON TABLE public.restaurant_reservations TO service_role;


--
-- Name: SEQUENCE restaurant_reservations_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.restaurant_reservations_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.restaurant_reservations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.restaurant_reservations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.restaurant_reservations_id_seq TO service_role;


--
-- Name: TABLE restaurants; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.restaurants TO postgres;
GRANT ALL ON TABLE public.restaurants TO anon;
GRANT ALL ON TABLE public.restaurants TO authenticated;
GRANT ALL ON TABLE public.restaurants TO service_role;


--
-- Name: SEQUENCE restaurants_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.restaurants_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.restaurants_id_seq TO anon;
GRANT ALL ON SEQUENCE public.restaurants_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.restaurants_id_seq TO service_role;


--
-- Name: TABLE saved_offers; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.saved_offers TO postgres;
GRANT ALL ON TABLE public.saved_offers TO anon;
GRANT ALL ON TABLE public.saved_offers TO authenticated;
GRANT ALL ON TABLE public.saved_offers TO service_role;


--
-- Name: TABLE subscribers; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.subscribers TO postgres;
GRANT ALL ON TABLE public.subscribers TO anon;
GRANT ALL ON TABLE public.subscribers TO authenticated;
GRANT ALL ON TABLE public.subscribers TO service_role;


--
-- Name: TABLE subscription_plans; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.subscription_plans TO postgres;
GRANT ALL ON TABLE public.subscription_plans TO anon;
GRANT ALL ON TABLE public.subscription_plans TO authenticated;
GRANT ALL ON TABLE public.subscription_plans TO service_role;


--
-- Name: SEQUENCE subscription_plans_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.subscription_plans_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.subscription_plans_id_seq TO anon;
GRANT ALL ON SEQUENCE public.subscription_plans_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.subscription_plans_id_seq TO service_role;


--
-- Name: TABLE travel_offers; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.travel_offers TO postgres;
GRANT ALL ON TABLE public.travel_offers TO anon;
GRANT ALL ON TABLE public.travel_offers TO authenticated;
GRANT ALL ON TABLE public.travel_offers TO service_role;


--
-- Name: SEQUENCE travel_offers_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.travel_offers_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.travel_offers_id_seq TO anon;
GRANT ALL ON SEQUENCE public.travel_offers_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.travel_offers_id_seq TO service_role;


--
-- Name: TABLE travel_reservations; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.travel_reservations TO postgres;
GRANT ALL ON TABLE public.travel_reservations TO anon;
GRANT ALL ON TABLE public.travel_reservations TO authenticated;
GRANT ALL ON TABLE public.travel_reservations TO service_role;


--
-- Name: SEQUENCE travel_reservations_id_seq; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE public.travel_reservations_id_seq TO postgres;
GRANT ALL ON SEQUENCE public.travel_reservations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.travel_reservations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.travel_reservations_id_seq TO service_role;


--
-- Name: TABLE user_subscriptions; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.user_subscriptions TO postgres;
GRANT ALL ON TABLE public.user_subscriptions TO anon;
GRANT ALL ON TABLE public.user_subscriptions TO authenticated;
GRANT ALL ON TABLE public.user_subscriptions TO service_role;


--
-- Name: TABLE vouchers; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.vouchers TO postgres;
GRANT ALL ON TABLE public.vouchers TO anon;
GRANT ALL ON TABLE public.vouchers TO authenticated;
GRANT ALL ON TABLE public.vouchers TO service_role;


--
-- Name: TABLE voyance_consultations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.voyance_consultations TO anon;
GRANT ALL ON TABLE public.voyance_consultations TO authenticated;
GRANT ALL ON TABLE public.voyance_consultations TO service_role;


--
-- Name: TABLE voyance_mediums; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.voyance_mediums TO anon;
GRANT ALL ON TABLE public.voyance_mediums TO authenticated;
GRANT ALL ON TABLE public.voyance_mediums TO service_role;


--
-- Name: SEQUENCE voyance_mediums_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.voyance_mediums_id_seq TO anon;
GRANT ALL ON SEQUENCE public.voyance_mediums_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.voyance_mediums_id_seq TO service_role;


--
-- Name: TABLE voyance_reviews; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.voyance_reviews TO anon;
GRANT ALL ON TABLE public.voyance_reviews TO authenticated;
GRANT ALL ON TABLE public.voyance_reviews TO service_role;


--
-- Name: SEQUENCE voyance_reviews_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.voyance_reviews_id_seq TO anon;
GRANT ALL ON SEQUENCE public.voyance_reviews_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.voyance_reviews_id_seq TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2025_12_20; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_20 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_20 TO dashboard_user;


--
-- Name: TABLE messages_2025_12_21; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_21 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_21 TO dashboard_user;


--
-- Name: TABLE messages_2025_12_22; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_22 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_22 TO dashboard_user;


--
-- Name: TABLE messages_2025_12_23; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_23 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_23 TO dashboard_user;


--
-- Name: TABLE messages_2025_12_24; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_24 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_24 TO dashboard_user;


--
-- Name: TABLE messages_2025_12_25; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_12_25 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_12_25 TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE hooks; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.hooks TO anon;
GRANT ALL ON TABLE supabase_functions.hooks TO authenticated;
GRANT ALL ON TABLE supabase_functions.hooks TO service_role;


--
-- Name: SEQUENCE hooks_id_seq; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO anon;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO service_role;


--
-- Name: TABLE migrations; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.migrations TO anon;
GRANT ALL ON TABLE supabase_functions.migrations TO authenticated;
GRANT ALL ON TABLE supabase_functions.migrations TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA supabase_functions GRANT ALL ON TABLES  TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

