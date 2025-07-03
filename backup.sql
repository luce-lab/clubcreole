

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


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."admin_type" AS ENUM (
    'super_admin',
    'partner_admin',
    'restaurant_manager'
);


ALTER TYPE "public"."admin_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_restaurant_manager"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- Mettre à jour le profil pour définir le rôle comme admin avec type restaurant_manager
  UPDATE public.profiles 
  SET role = 'admin', admin_type = 'restaurant_manager'
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_restaurant_manager"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'role', 'client'));
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_partner_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND admin_type = 'partner_admin'
  );
$$;


ALTER FUNCTION "public"."is_partner_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_restaurant_manager"("restaurant_id" integer) RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
  SELECT EXISTS (
    SELECT 1 FROM public.restaurants_managers 
    WHERE user_id = auth.uid() 
    AND restaurant_id = $1
  );
$_$;


ALTER FUNCTION "public"."is_restaurant_manager"("restaurant_id" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_super_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND admin_type = 'super_admin'
  );
$$;


ALTER FUNCTION "public"."is_super_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accommodations" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "type" "text" NOT NULL,
    "location" "text" NOT NULL,
    "price" numeric NOT NULL,
    "rating" numeric(2,1) NOT NULL,
    "image" "text" NOT NULL,
    "gallery_images" "jsonb" NOT NULL,
    "features" "jsonb" NOT NULL,
    "description" "text" NOT NULL,
    "rooms" integer NOT NULL,
    "bathrooms" integer NOT NULL,
    "max_guests" integer NOT NULL,
    "amenities" "jsonb" NOT NULL,
    "rules" "jsonb" NOT NULL,
    "discount" integer,
    "weight" integer DEFAULT 0,
    "partner_id" integer,
    CONSTRAINT "accommodations_weight_range" CHECK ((("weight" >= 0) AND ("weight" <= 100)))
);


ALTER TABLE "public"."accommodations" OWNER TO "postgres";


COMMENT ON COLUMN "public"."accommodations"."discount" IS 'Pourcentage de réduction (0-100), NULL si aucune réduction';



CREATE SEQUENCE IF NOT EXISTS "public"."accommodations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."accommodations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."accommodations_id_seq" OWNED BY "public"."accommodations"."id";



CREATE TABLE IF NOT EXISTS "public"."activities" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "path" "text" NOT NULL,
    "icon_name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "rating" numeric(3,2) DEFAULT 0.0,
    CONSTRAINT "activities_rating_check" CHECK ((("rating" >= 0.0) AND ("rating" <= 5.0)))
);


ALTER TABLE "public"."activities" OWNER TO "postgres";


COMMENT ON COLUMN "public"."activities"."is_active" IS 'Indique si l''activité doit être affichée ou non';



COMMENT ON COLUMN "public"."activities"."rating" IS 'Note de l''activité (0.0 à 5.0)';



ALTER TABLE "public"."activities" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."activities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."activity_images" (
    "id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    "url" "text" NOT NULL,
    "alt_text" "text" NOT NULL,
    "title" "text" NOT NULL,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."activity_images" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_images_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_images_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_images_id_seq" OWNED BY "public"."activity_images"."id";



CREATE TABLE IF NOT EXISTS "public"."activity_inclusions" (
    "id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    "inclusion_text" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."activity_inclusions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_inclusions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_inclusions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_inclusions_id_seq" OWNED BY "public"."activity_inclusions"."id";



CREATE TABLE IF NOT EXISTS "public"."activity_levels" (
    "id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    "level_name" "text" NOT NULL,
    "level_description" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."activity_levels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_levels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_levels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_levels_id_seq" OWNED BY "public"."activity_levels"."id";



CREATE TABLE IF NOT EXISTS "public"."activity_reservations" (
    "id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    "user_id" "uuid",
    "reservation_date" "date" NOT NULL,
    "time_slot" time without time zone NOT NULL,
    "number_of_participants" integer DEFAULT 1 NOT NULL,
    "total_price" integer NOT NULL,
    "participant_names" "text"[] NOT NULL,
    "participant_levels" "text"[] NOT NULL,
    "contact_email" "text" NOT NULL,
    "contact_phone" "text" NOT NULL,
    "special_requests" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."activity_reservations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_reservations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_reservations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_reservations_id_seq" OWNED BY "public"."activity_reservations"."id";



CREATE TABLE IF NOT EXISTS "public"."activity_time_slots" (
    "id" integer NOT NULL,
    "activity_id" integer NOT NULL,
    "time_slot" time without time zone NOT NULL,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."activity_time_slots" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_time_slots_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activity_time_slots_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_time_slots_id_seq" OWNED BY "public"."activity_time_slots"."id";



CREATE TABLE IF NOT EXISTS "public"."bons_plans" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "icon" "text" NOT NULL,
    "image" "text",
    "badge" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "url" "text"
);


ALTER TABLE "public"."bons_plans" OWNER TO "postgres";


COMMENT ON COLUMN "public"."bons_plans"."url" IS 'URL de redirection vers une page interne ou externe';



CREATE SEQUENCE IF NOT EXISTS "public"."bons_plans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."bons_plans_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."bons_plans_id_seq" OWNED BY "public"."bons_plans"."id";



CREATE TABLE IF NOT EXISTS "public"."car_client_reviews" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "location" "text" NOT NULL,
    "avatar" "text" NOT NULL,
    "comment" "text" NOT NULL,
    "rating" integer NOT NULL,
    "review_date" "date" NOT NULL,
    "rental_company_name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "car_client_reviews_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);


ALTER TABLE "public"."car_client_reviews" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."car_client_reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."car_client_reviews_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."car_client_reviews_id_seq" OWNED BY "public"."car_client_reviews"."id";



CREATE TABLE IF NOT EXISTS "public"."car_models" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "image" "text" NOT NULL,
    "price_per_day" integer NOT NULL,
    "category" "text" NOT NULL,
    "seats" integer NOT NULL,
    "transmission" "text" NOT NULL,
    "air_con" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true NOT NULL,
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "company_id" integer
);


ALTER TABLE "public"."car_models" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."car_models_backup" (
    "id" integer,
    "name" "text",
    "image" "text",
    "price_per_day" integer,
    "category" "text",
    "seats" integer,
    "transmission" "text",
    "air_con" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "is_active" boolean,
    "gallery_images" "jsonb",
    "company_id" "uuid"
);


ALTER TABLE "public"."car_models_backup" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."car_models_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."car_models_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."car_models_id_seq" OWNED BY "public"."car_models"."id";



CREATE TABLE IF NOT EXISTS "public"."car_rental_features" (
    "id" integer NOT NULL,
    "feature" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "company_id" integer
);


ALTER TABLE "public"."car_rental_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."car_rental_features_backup" (
    "id" integer,
    "feature" "text",
    "created_at" timestamp with time zone,
    "company_id" "uuid"
);


ALTER TABLE "public"."car_rental_features_backup" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."car_rental_features_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."car_rental_features_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."car_rental_features_id_seq" OWNED BY "public"."car_rental_features"."id";



CREATE TABLE IF NOT EXISTS "public"."car_rental_reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "rental_company_name" "text" NOT NULL,
    "selected_model" "text" NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "driver_name" "text" NOT NULL,
    "driver_email" "text" NOT NULL,
    "driver_phone" "text" NOT NULL,
    "status" "text" DEFAULT 'confirmed'::"text" NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "partner_id" "uuid",
    "company_id" integer
);


ALTER TABLE "public"."car_rental_reservations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."car_rental_reservations_backup" (
    "id" "uuid",
    "rental_company_name" "text",
    "selected_model" "text",
    "start_date" "date",
    "end_date" "date",
    "driver_name" "text",
    "driver_email" "text",
    "driver_phone" "text",
    "status" "text",
    "notes" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "partner_id" "uuid",
    "company_id" "uuid"
);


ALTER TABLE "public"."car_rental_reservations_backup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."concerts" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "artist" "text" NOT NULL,
    "genre" "text" NOT NULL,
    "image" "text" NOT NULL,
    "location" "text" NOT NULL,
    "description" "text" NOT NULL,
    "date" "text" NOT NULL,
    "time" "text" NOT NULL,
    "price" numeric NOT NULL,
    "offer" "text" NOT NULL,
    "rating" numeric NOT NULL,
    "icon" "text" DEFAULT 'Music'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "partner_id" integer
);


ALTER TABLE "public"."concerts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."concerts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."concerts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."concerts_id_seq" OWNED BY "public"."concerts"."id";



CREATE TABLE IF NOT EXISTS "public"."diving_reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "reservation_date" "date" NOT NULL,
    "reservation_time" "text" NOT NULL,
    "participant_name" "text" NOT NULL,
    "participant_email" "text" NOT NULL,
    "participant_phone" "text" NOT NULL,
    "experience_level" "text" DEFAULT 'beginner'::"text" NOT NULL,
    "special_requests" "text",
    "status" "text" DEFAULT 'confirmed'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."diving_reservations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."fleet_managers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "permissions" "jsonb" DEFAULT '{"manage_vehicles": true, "view_reservations": true, "manage_reservations": false}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "company_id" integer
);


ALTER TABLE "public"."fleet_managers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."fleet_managers_backup" (
    "id" "uuid",
    "user_id" "uuid",
    "permissions" "jsonb",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "company_id" "uuid"
);


ALTER TABLE "public"."fleet_managers_backup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."leisure_activities" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "category" "text" NOT NULL,
    "description" "text" NOT NULL,
    "price_per_person" integer NOT NULL,
    "duration_hours" numeric(3,1) NOT NULL,
    "min_level" "text" NOT NULL,
    "max_participants" integer DEFAULT 10,
    "equipment_provided" boolean DEFAULT true,
    "professional_guide" boolean DEFAULT true,
    "icon_name" "text" DEFAULT 'waves'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."leisure_activities" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."leisure_activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."leisure_activities_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."leisure_activities_id_seq" OWNED BY "public"."leisure_activities"."id";



CREATE TABLE IF NOT EXISTS "public"."loisirs" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "location" "text" NOT NULL,
    "start_date" "text" NOT NULL,
    "max_participants" integer NOT NULL,
    "current_participants" integer DEFAULT 0 NOT NULL,
    "image" "text" NOT NULL,
    "end_date" "text" DEFAULT ''::"text" NOT NULL,
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "partner_id" integer
);


ALTER TABLE "public"."loisirs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."loisirs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."loisirs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."loisirs_id_seq" OWNED BY "public"."loisirs"."id";



CREATE TABLE IF NOT EXISTS "public"."loisirs_inscriptions" (
    "id" integer NOT NULL,
    "loisir_id" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "inscription_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "confirmation_sent" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."loisirs_inscriptions" OWNER TO "postgres";


COMMENT ON TABLE "public"."loisirs_inscriptions" IS 'Stocke les informations des participants aux activités de loisirs';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."loisir_id" IS 'ID de l''activité de loisir liée';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."name" IS 'Nom du participant';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."email" IS 'Email du participant';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."phone" IS 'Téléphone du participant';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."inscription_date" IS 'Date et heure de l''inscription';



COMMENT ON COLUMN "public"."loisirs_inscriptions"."confirmation_sent" IS 'Indique si l''email de confirmation a été envoyé';



CREATE SEQUENCE IF NOT EXISTS "public"."loisirs_inscriptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."loisirs_inscriptions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."loisirs_inscriptions_id_seq" OWNED BY "public"."loisirs_inscriptions"."id";



CREATE TABLE IF NOT EXISTS "public"."newsletter_subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."newsletter_subscriptions" OWNER TO "postgres";


COMMENT ON TABLE "public"."newsletter_subscriptions" IS 'Stores email addresses for newsletter subscriptions';



CREATE TABLE IF NOT EXISTS "public"."nightlife_events" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "type" "text" NOT NULL,
    "venue" "text" NOT NULL,
    "image" "text" NOT NULL,
    "description" "text" NOT NULL,
    "date" "text" NOT NULL,
    "time" "text" NOT NULL,
    "price" numeric NOT NULL,
    "offer" "text" NOT NULL,
    "rating" numeric NOT NULL,
    "features" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "partner_id" integer DEFAULT 10
);


ALTER TABLE "public"."nightlife_events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."nightlife_events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."nightlife_events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."nightlife_events_id_seq" OWNED BY "public"."nightlife_events"."id";



CREATE TABLE IF NOT EXISTS "public"."offers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "price" numeric(10,2),
    "discount_percentage" integer,
    "is_active" boolean DEFAULT true NOT NULL,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "partner_id" integer
);


ALTER TABLE "public"."offers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."offers_backup" (
    "id" "uuid",
    "partner_id" "uuid",
    "title" "text",
    "description" "text",
    "price" numeric(10,2),
    "discount_percentage" integer,
    "is_active" boolean,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."offers_backup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."partners" (
    "business_name" "text" NOT NULL,
    "business_type" "text" NOT NULL,
    "description" "text",
    "address" "text",
    "phone" "text",
    "website" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "text",
    "image" "text",
    "location" "text",
    "rating" numeric,
    "offer" "text",
    "icon_name" "text",
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "status" "text" DEFAULT 'en_attente'::"text" NOT NULL,
    "id" integer NOT NULL,
    "weight" integer DEFAULT 0,
    "user_id" "uuid",
    CONSTRAINT "partners_status_check" CHECK (("status" = ANY (ARRAY['en_attente'::"text", 'approuve'::"text", 'rejete'::"text"]))),
    CONSTRAINT "partners_weight_range" CHECK ((("weight" >= 0) AND ("weight" <= 100)))
);


ALTER TABLE "public"."partners" OWNER TO "postgres";


COMMENT ON TABLE "public"."partners" IS 'This is a duplicate of partners';



CREATE TABLE IF NOT EXISTS "public"."partners_backup" (
    "id" "uuid",
    "business_name" "text",
    "business_type" "text",
    "description" "text",
    "address" "text",
    "phone" "text",
    "website" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "type" "text",
    "image" "text",
    "location" "text",
    "rating" numeric,
    "offer" "text",
    "icon_name" "text",
    "gallery_images" "jsonb",
    "status" "text"
);


ALTER TABLE "public"."partners_backup" OWNER TO "postgres";


ALTER TABLE "public"."partners" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."partners_duplicate_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."partners_id_mapping" (
    "old_uuid" "uuid" NOT NULL,
    "new_id" integer NOT NULL,
    "business_name" "text" NOT NULL,
    "migrated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."partners_id_mapping" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "role" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "admin_type" "public"."admin_type" DEFAULT 'partner_admin'::"public"."admin_type",
    "company_id" integer,
    CONSTRAINT "profiles_role_check" CHECK (("role" = ANY (ARRAY['admin'::"text", 'partner'::"text", 'client'::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles_backup" (
    "id" "uuid",
    "email" "text",
    "first_name" "text",
    "last_name" "text",
    "role" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "admin_type" "public"."admin_type",
    "company_id" "uuid"
);


ALTER TABLE "public"."profiles_backup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."promotions" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "image" "text" NOT NULL,
    "badge" "text",
    "cta_text" "text" NOT NULL,
    "cta_url" "text" NOT NULL,
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "gallery_images" "jsonb"
);


ALTER TABLE "public"."promotions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."promotions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."promotions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."promotions_id_seq" OWNED BY "public"."promotions"."id";



CREATE TABLE IF NOT EXISTS "public"."purchases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "email" "text" NOT NULL,
    "item_type" "text" NOT NULL,
    "item_name" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'EUR'::"text",
    "purchase_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "text" DEFAULT 'completed'::"text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."purchases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "offer_id" "uuid",
    "reservation_date" timestamp with time zone NOT NULL,
    "status" "text" NOT NULL,
    "number_of_people" integer DEFAULT 1,
    "special_requests" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "partner_id" integer,
    CONSTRAINT "reservations_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'confirmed'::"text", 'cancelled'::"text", 'completed'::"text"])))
);


ALTER TABLE "public"."reservations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reservations_backup" (
    "id" "uuid",
    "client_id" "uuid",
    "partner_id" "uuid",
    "offer_id" "uuid",
    "reservation_date" timestamp with time zone,
    "status" "text",
    "number_of_people" integer,
    "special_requests" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."reservations_backup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."restaurant_reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "restaurant_id" integer NOT NULL,
    "reservation_date" "date" NOT NULL,
    "reservation_time" "text" NOT NULL,
    "guests" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "text" DEFAULT 'confirmed'::"text" NOT NULL
);

ALTER TABLE ONLY "public"."restaurant_reservations" REPLICA IDENTITY FULL;


ALTER TABLE "public"."restaurant_reservations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."restaurants" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "type" "text" NOT NULL,
    "image" "text" NOT NULL,
    "location" "text" NOT NULL,
    "description" "text" NOT NULL,
    "rating" numeric(2,1) NOT NULL,
    "offer" "text" NOT NULL,
    "icon" "text" NOT NULL,
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "poids" integer DEFAULT 0 NOT NULL,
    "menus" "jsonb" DEFAULT '[{"name": "Entrées", "items": [{"name": "Salade César", "price": 12}, {"name": "Carpaccio de bœuf", "price": 14}, {"name": "Soupe du jour", "price": 9}]}, {"name": "Plats principaux", "items": [{"name": "Filet de bœuf, sauce au poivre", "price": 28}, {"name": "Risotto aux champignons", "price": 21}, {"name": "Poisson du jour", "price": 24}]}, {"name": "Desserts", "items": [{"name": "Tiramisu maison", "price": 9}, {"name": "Crème brûlée", "price": 8}, {"name": "Mousse au chocolat", "price": 7}]}]'::"jsonb",
    "opening_hours" "jsonb" DEFAULT '{"Jeudi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Lundi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mardi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Samedi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Dimanche": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Mercredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}, "Vendredi": {"fermeture": "15:00", "ouverture": "12:00", "soir_fermeture": "23:00", "soir_ouverture": "19:00"}}'::"jsonb",
    "partner_id" integer
);


ALTER TABLE "public"."restaurants" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."restaurants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."restaurants_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."restaurants_id_seq" OWNED BY "public"."restaurants"."id";



CREATE TABLE IF NOT EXISTS "public"."restaurants_managers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "restaurant_id" integer NOT NULL,
    "permissions" "jsonb" DEFAULT '{"manage_menu": false, "view_orders": true, "manage_reservations": true}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."restaurants_managers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."rls_policies_backup" (
    "id" integer NOT NULL,
    "table_name" "text",
    "policy_name" "text",
    "policy_definition" "text",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."rls_policies_backup" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."rls_policies_backup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."rls_policies_backup_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."rls_policies_backup_id_seq" OWNED BY "public"."rls_policies_backup"."id";



CREATE TABLE IF NOT EXISTS "public"."subscribers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "email" "text" NOT NULL,
    "stripe_customer_id" "text",
    "subscribed" boolean DEFAULT false NOT NULL,
    "subscription_tier" "text",
    "subscription_end" timestamp with time zone,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "subscription_start" timestamp with time zone,
    "subscription_price" numeric(10,2)
);


ALTER TABLE "public"."subscribers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "plan_name" "text" NOT NULL,
    "status" "text" DEFAULT 'active'::"text" NOT NULL,
    "start_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "end_date" timestamp with time zone,
    "price" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'EUR'::"text" NOT NULL,
    "auto_renew" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."travel_offers" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "destination" "text" NOT NULL,
    "duration_days" integer NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "departure_location" "text" NOT NULL,
    "departure_date" "date",
    "return_date" "date",
    "image" "text",
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "inclusions" "jsonb" DEFAULT '[]'::"jsonb",
    "exclusions" "jsonb" DEFAULT '[]'::"jsonb",
    "max_participants" integer DEFAULT 20,
    "current_participants" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "partner_id" integer
);


ALTER TABLE "public"."travel_offers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."travel_offers_backup" (
    "id" integer,
    "partner_id" "uuid",
    "title" "text",
    "description" "text",
    "destination" "text",
    "duration_days" integer,
    "price" numeric(10,2),
    "departure_location" "text",
    "departure_date" "date",
    "return_date" "date",
    "image" "text",
    "gallery_images" "jsonb",
    "inclusions" "jsonb",
    "exclusions" "jsonb",
    "max_participants" integer,
    "current_participants" integer,
    "is_active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."travel_offers_backup" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."travel_offers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."travel_offers_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."travel_offers_id_seq" OWNED BY "public"."travel_offers"."id";



CREATE TABLE IF NOT EXISTS "public"."travel_reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "travel_offer_id" integer NOT NULL,
    "user_id" "uuid",
    "contact_name" "text" NOT NULL,
    "contact_email" "text" NOT NULL,
    "contact_phone" "text" NOT NULL,
    "participants" integer DEFAULT 1 NOT NULL,
    "special_requests" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "total_price" numeric(10,2) NOT NULL,
    "reservation_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "contact_first_name" "text",
    "contact_last_name" "text",
    "participants_details" "jsonb"
);


ALTER TABLE "public"."travel_reservations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_consumption" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "service_type" "text" NOT NULL,
    "service_name" "text" NOT NULL,
    "consumption_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "amount_consumed" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'EUR'::"text" NOT NULL,
    "status" "text" DEFAULT 'completed'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_consumption" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."voyance_consultations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "medium_id" integer NOT NULL,
    "client_name" "text" NOT NULL,
    "client_email" "text" NOT NULL,
    "client_phone" "text" NOT NULL,
    "preferred_date" "date" NOT NULL,
    "preferred_time" "text" NOT NULL,
    "consultation_type" "text" DEFAULT 'présentiel'::"text" NOT NULL,
    "message" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "voyance_consultations_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'confirmed'::"text", 'cancelled'::"text", 'completed'::"text"])))
);


ALTER TABLE "public"."voyance_consultations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."voyance_medium_advantages" (
    "id" integer NOT NULL,
    "medium_id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "icon" "text" DEFAULT 'star'::"text" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."voyance_medium_advantages" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."voyance_medium_advantages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."voyance_medium_advantages_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."voyance_medium_advantages_id_seq" OWNED BY "public"."voyance_medium_advantages"."id";



CREATE TABLE IF NOT EXISTS "public"."voyance_mediums" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "specialties" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "description" "text" NOT NULL,
    "image" "text" NOT NULL,
    "experience_years" integer DEFAULT 0 NOT NULL,
    "rating" numeric(2,1) DEFAULT 0.0 NOT NULL,
    "price_per_session" numeric(10,2) NOT NULL,
    "availability_schedule" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "contact_phone" "text",
    "contact_email" "text",
    "contact_whatsapp" "text",
    "languages" "text"[] DEFAULT '{français}'::"text"[] NOT NULL,
    "consultation_types" "text"[] DEFAULT '{présentiel}'::"text"[] NOT NULL,
    "location" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    CONSTRAINT "voyance_mediums_rating_check" CHECK ((("rating" >= (0)::numeric) AND ("rating" <= (5)::numeric)))
);


ALTER TABLE "public"."voyance_mediums" OWNER TO "postgres";


ALTER TABLE "public"."voyance_mediums" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."voyance_mediums_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."voyance_reviews" (
    "id" integer NOT NULL,
    "medium_id" integer NOT NULL,
    "client_name" "text" NOT NULL,
    "rating" integer NOT NULL,
    "comment" "text" NOT NULL,
    "consultation_date" "date" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "voyance_reviews_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);


ALTER TABLE "public"."voyance_reviews" OWNER TO "postgres";


ALTER TABLE "public"."voyance_reviews" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."voyance_reviews_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."accommodations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."accommodations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_images" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_images_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_inclusions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_inclusions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_levels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_levels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_reservations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_reservations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_time_slots" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_time_slots_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."bons_plans" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."bons_plans_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."car_client_reviews" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."car_client_reviews_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."car_models" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."car_models_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."car_rental_features" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."car_rental_features_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."concerts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."concerts_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."leisure_activities" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."leisure_activities_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."loisirs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."loisirs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."loisirs_inscriptions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."loisirs_inscriptions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."nightlife_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."nightlife_events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."promotions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."promotions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."restaurants" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."restaurants_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."rls_policies_backup" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."rls_policies_backup_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."travel_offers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."travel_offers_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."voyance_medium_advantages" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."voyance_medium_advantages_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activities"
    ADD CONSTRAINT "activities_name_unique" UNIQUE ("name");



ALTER TABLE ONLY "public"."activities"
    ADD CONSTRAINT "activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_images"
    ADD CONSTRAINT "activity_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_inclusions"
    ADD CONSTRAINT "activity_inclusions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_levels"
    ADD CONSTRAINT "activity_levels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_reservations"
    ADD CONSTRAINT "activity_reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_time_slots"
    ADD CONSTRAINT "activity_time_slots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bons_plans"
    ADD CONSTRAINT "bons_plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."car_client_reviews"
    ADD CONSTRAINT "car_client_reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."car_models"
    ADD CONSTRAINT "car_models_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."car_rental_features"
    ADD CONSTRAINT "car_rental_features_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."car_rental_reservations"
    ADD CONSTRAINT "car_rental_reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."concerts"
    ADD CONSTRAINT "concerts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."diving_reservations"
    ADD CONSTRAINT "diving_reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fleet_managers"
    ADD CONSTRAINT "fleet_managers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."leisure_activities"
    ADD CONSTRAINT "leisure_activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."loisirs_inscriptions"
    ADD CONSTRAINT "loisirs_inscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."loisirs"
    ADD CONSTRAINT "loisirs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."newsletter_subscriptions"
    ADD CONSTRAINT "newsletter_subscriptions_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."newsletter_subscriptions"
    ADD CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nightlife_events"
    ADD CONSTRAINT "nightlife_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."offers"
    ADD CONSTRAINT "offers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."partners"
    ADD CONSTRAINT "partners_duplicate_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."partners_id_mapping"
    ADD CONSTRAINT "partners_id_mapping_new_id_key" UNIQUE ("new_id");



ALTER TABLE ONLY "public"."partners_id_mapping"
    ADD CONSTRAINT "partners_id_mapping_pkey" PRIMARY KEY ("old_uuid");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."promotions"
    ADD CONSTRAINT "promotions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."restaurant_reservations"
    ADD CONSTRAINT "restaurant_reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."restaurants_managers"
    ADD CONSTRAINT "restaurants_managers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."restaurants_managers"
    ADD CONSTRAINT "restaurants_managers_user_id_restaurant_id_key" UNIQUE ("user_id", "restaurant_id");



ALTER TABLE ONLY "public"."restaurants"
    ADD CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."rls_policies_backup"
    ADD CONSTRAINT "rls_policies_backup_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_user_id_unique" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."travel_offers"
    ADD CONSTRAINT "travel_offers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."travel_reservations"
    ADD CONSTRAINT "travel_reservations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_consumption"
    ADD CONSTRAINT "user_consumption_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."voyance_consultations"
    ADD CONSTRAINT "voyance_consultations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."voyance_medium_advantages"
    ADD CONSTRAINT "voyance_medium_advantages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."voyance_mediums"
    ADD CONSTRAINT "voyance_mediums_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."voyance_reviews"
    ADD CONSTRAINT "voyance_reviews_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_activity_images_activity_id" ON "public"."activity_images" USING "btree" ("activity_id");



CREATE INDEX "idx_activity_inclusions_activity_id" ON "public"."activity_inclusions" USING "btree" ("activity_id");



CREATE INDEX "idx_activity_levels_activity_id" ON "public"."activity_levels" USING "btree" ("activity_id");



CREATE INDEX "idx_activity_reservations_activity_id" ON "public"."activity_reservations" USING "btree" ("activity_id");



CREATE INDEX "idx_activity_reservations_date" ON "public"."activity_reservations" USING "btree" ("reservation_date");



CREATE INDEX "idx_activity_reservations_status" ON "public"."activity_reservations" USING "btree" ("status");



CREATE INDEX "idx_activity_reservations_user_id" ON "public"."activity_reservations" USING "btree" ("user_id");



CREATE INDEX "idx_activity_time_slots_activity_id" ON "public"."activity_time_slots" USING "btree" ("activity_id");



CREATE INDEX "idx_car_client_reviews_company" ON "public"."car_client_reviews" USING "btree" ("rental_company_name");



CREATE INDEX "idx_car_client_reviews_rating" ON "public"."car_client_reviews" USING "btree" ("rating");



CREATE INDEX "idx_car_models_company_id" ON "public"."car_models" USING "btree" ("company_id");



CREATE INDEX "idx_car_rental_reservations_partner_id" ON "public"."car_rental_reservations" USING "btree" ("partner_id");



CREATE INDEX "idx_offers_partner_id" ON "public"."offers" USING "btree" ("partner_id");



CREATE INDEX "idx_profiles_company_id" ON "public"."profiles" USING "btree" ("company_id");



CREATE INDEX "idx_reservations_partner_id" ON "public"."reservations" USING "btree" ("partner_id");



CREATE INDEX "idx_travel_reservations_participants_details" ON "public"."travel_reservations" USING "gin" ("participants_details");



CREATE INDEX "idx_voyance_medium_advantages_medium_id" ON "public"."voyance_medium_advantages" USING "btree" ("medium_id");



CREATE OR REPLACE TRIGGER "on_restaurant_manager_created" AFTER INSERT ON "public"."restaurants_managers" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_restaurant_manager"();



CREATE OR REPLACE TRIGGER "update_activity_reservations_updated_at" BEFORE UPDATE ON "public"."activity_reservations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_bons_plans_updated_at" BEFORE UPDATE ON "public"."bons_plans" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_car_client_reviews_updated_at" BEFORE UPDATE ON "public"."car_client_reviews" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_car_models_updated_at" BEFORE UPDATE ON "public"."car_models" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_fleet_managers_updated_at" BEFORE UPDATE ON "public"."fleet_managers" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_leisure_activities_updated_at" BEFORE UPDATE ON "public"."leisure_activities" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_promotions_updated_at" BEFORE UPDATE ON "public"."promotions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_subscribers_updated_at" BEFORE UPDATE ON "public"."subscribers" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_subscriptions_updated_at" BEFORE UPDATE ON "public"."subscriptions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_travel_offers_updated_at" BEFORE UPDATE ON "public"."travel_offers" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_travel_reservations_updated_at" BEFORE UPDATE ON "public"."travel_reservations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_voyance_medium_advantages_updated_at" BEFORE UPDATE ON "public"."voyance_medium_advantages" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id");



ALTER TABLE ONLY "public"."activity_images"
    ADD CONSTRAINT "activity_images_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."leisure_activities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."activity_inclusions"
    ADD CONSTRAINT "activity_inclusions_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."leisure_activities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."activity_levels"
    ADD CONSTRAINT "activity_levels_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."leisure_activities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."activity_reservations"
    ADD CONSTRAINT "activity_reservations_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."leisure_activities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."activity_reservations"
    ADD CONSTRAINT "activity_reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."activity_time_slots"
    ADD CONSTRAINT "activity_time_slots_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."leisure_activities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."car_models"
    ADD CONSTRAINT "car_models_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."partners"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."car_rental_reservations"
    ADD CONSTRAINT "car_rental_reservations_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."concerts"
    ADD CONSTRAINT "concerts_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id");



ALTER TABLE ONLY "public"."fleet_managers"
    ADD CONSTRAINT "fleet_managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."loisirs_inscriptions"
    ADD CONSTRAINT "loisirs_inscriptions_loisir_id_fkey" FOREIGN KEY ("loisir_id") REFERENCES "public"."loisirs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."loisirs"
    ADD CONSTRAINT "loisirs_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id");



ALTER TABLE ONLY "public"."nightlife_events"
    ADD CONSTRAINT "nightlive_events_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id");



ALTER TABLE ONLY "public"."offers"
    ADD CONSTRAINT "offers_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."partners"
    ADD CONSTRAINT "partners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id");



ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."restaurant_reservations"
    ADD CONSTRAINT "restaurant_reservations_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id");



ALTER TABLE ONLY "public"."restaurants_managers"
    ADD CONSTRAINT "restaurants_managers_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."restaurants_managers"
    ADD CONSTRAINT "restaurants_managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."restaurants"
    ADD CONSTRAINT "restaurants_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id");



ALTER TABLE ONLY "public"."subscribers"
    ADD CONSTRAINT "subscribers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."travel_offers"
    ADD CONSTRAINT "travel_offers_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."travel_reservations"
    ADD CONSTRAINT "travel_reservations_travel_offer_id_fkey" FOREIGN KEY ("travel_offer_id") REFERENCES "public"."travel_offers"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."travel_reservations"
    ADD CONSTRAINT "travel_reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_consumption"
    ADD CONSTRAINT "user_consumption_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."voyance_consultations"
    ADD CONSTRAINT "voyance_consultations_medium_id_fkey" FOREIGN KEY ("medium_id") REFERENCES "public"."voyance_mediums"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."voyance_medium_advantages"
    ADD CONSTRAINT "voyance_medium_advantages_medium_id_fkey" FOREIGN KEY ("medium_id") REFERENCES "public"."voyance_mediums"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."voyance_reviews"
    ADD CONSTRAINT "voyance_reviews_medium_id_fkey" FOREIGN KEY ("medium_id") REFERENCES "public"."voyance_mediums"("id") ON DELETE CASCADE;



CREATE POLICY "Admins can manage all consumption" ON "public"."user_consumption" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



CREATE POLICY "Admins can manage all subscriptions" ON "public"."subscriptions" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



CREATE POLICY "Admins can manage loisirs" ON "public"."loisirs" USING ("public"."is_admin"());



CREATE POLICY "Admins can manage mediums" ON "public"."voyance_mediums" USING ("public"."is_admin"());



CREATE POLICY "Admins can manage reviews" ON "public"."voyance_reviews" USING ("public"."is_admin"());



CREATE POLICY "Admins can update consultations" ON "public"."voyance_consultations" FOR UPDATE USING ("public"."is_admin"());



CREATE POLICY "Admins can view all consultations" ON "public"."voyance_consultations" FOR SELECT USING ("public"."is_admin"());



CREATE POLICY "Admins can view all consumption" ON "public"."user_consumption" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



CREATE POLICY "Admins can view all subscriptions" ON "public"."subscriptions" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



CREATE POLICY "Allow anonymous newsletter subscriptions" ON "public"."newsletter_subscriptions" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Allow public insert access to restaurant reservations" ON "public"."restaurant_reservations" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public read access" ON "public"."activities" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to accommodations" ON "public"."accommodations" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to loisirs" ON "public"."loisirs" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to nightlife events" ON "public"."nightlife_events" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to restaurant reservations" ON "public"."restaurant_reservations" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to restaurants" ON "public"."restaurants" FOR SELECT USING (true);



CREATE POLICY "Allow users to view newsletter subscriptions" ON "public"."newsletter_subscriptions" FOR SELECT USING (true);



CREATE POLICY "Anyone can create consultations" ON "public"."voyance_consultations" FOR INSERT WITH CHECK (true);



CREATE POLICY "Anyone can create diving reservations" ON "public"."diving_reservations" FOR INSERT WITH CHECK (true);



CREATE POLICY "Anyone can delete diving reservations" ON "public"."diving_reservations" FOR DELETE USING (true);



CREATE POLICY "Anyone can update diving reservations" ON "public"."diving_reservations" FOR UPDATE USING (true);



CREATE POLICY "Anyone can view diving reservations" ON "public"."diving_reservations" FOR SELECT USING (true);



CREATE POLICY "Authenticated users can create restaurants" ON "public"."restaurants" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Authenticated users can delete accommodations" ON "public"."accommodations" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can delete restaurants" ON "public"."restaurants" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can insert accommodations" ON "public"."accommodations" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Authenticated users can update accommodations" ON "public"."accommodations" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can update restaurants" ON "public"."restaurants" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can view accommodations" ON "public"."accommodations" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can view loisirs" ON "public"."loisirs" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can view restaurants" ON "public"."restaurants" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable all users to insert loisirs_inscriptions" ON "public"."loisirs_inscriptions" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable all users to select loisirs_inscriptions" ON "public"."loisirs_inscriptions" FOR SELECT USING (true);



CREATE POLICY "Enable all users to update loisirs_inscriptions" ON "public"."loisirs_inscriptions" FOR UPDATE USING (true);



CREATE POLICY "Insert purchases" ON "public"."purchases" FOR INSERT WITH CHECK (true);



CREATE POLICY "Lecture publique des bons plans actifs" ON "public"."bons_plans" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Lecture publique des promotions actives" ON "public"."promotions" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Les admins peuvent insérer des avantages" ON "public"."voyance_medium_advantages" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Les admins peuvent modifier des avantages" ON "public"."voyance_medium_advantages" FOR UPDATE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Les admins peuvent supprimer des avantages" ON "public"."voyance_medium_advantages" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Partners can view reservations for their offers" ON "public"."travel_reservations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."travel_offers"
  WHERE (("travel_offers"."id" = "travel_reservations"."travel_offer_id") AND ("travel_offers"."partner_id" = ( SELECT "partners"."id"
           FROM "public"."partners"
          WHERE ("partners"."user_id" = "auth"."uid"())))))));



CREATE POLICY "Public can view active mediums" ON "public"."voyance_mediums" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public can view reviews" ON "public"."voyance_reviews" FOR SELECT USING (true);



CREATE POLICY "Public read access for restaurants" ON "public"."restaurants" FOR SELECT USING (true);



CREATE POLICY "Restaurant managers can update their restaurant reservations" ON "public"."restaurant_reservations" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM ("public"."restaurants_managers" "rm"
     JOIN "public"."restaurants" "r" ON (("rm"."restaurant_id" = "r"."id")))
  WHERE (("rm"."user_id" = "auth"."uid"()) AND ("r"."id" = "rm"."restaurant_id")))));



CREATE POLICY "Restaurant managers can view their own associations" ON "public"."restaurants_managers" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Restaurant managers can view their restaurant reservations" ON "public"."restaurant_reservations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."restaurants_managers" "rm"
     JOIN "public"."restaurants" "r" ON (("rm"."restaurant_id" = "r"."id")))
  WHERE (("rm"."user_id" = "auth"."uid"()) AND ("r"."id" = "rm"."restaurant_id")))));



CREATE POLICY "Super admins can view all restaurant managers" ON "public"."restaurants_managers" USING ("public"."is_super_admin"());



CREATE POLICY "Tout le monde peut créer des inscriptions" ON "public"."loisirs_inscriptions" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Tout le monde peut voir les avantages des médiums" ON "public"."voyance_medium_advantages" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Tout le monde peut voir les inscriptions" ON "public"."loisirs_inscriptions" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Users can create travel reservations" ON "public"."travel_reservations" FOR INSERT WITH CHECK (true);



CREATE POLICY "Users can insert their own reservations" ON "public"."activity_reservations" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own reservations" ON "public"."activity_reservations" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own consumption" ON "public"."user_consumption" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own subscriptions" ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own purchases" ON "public"."purchases" FOR SELECT USING ((("user_id" = "auth"."uid"()) OR ("email" = "auth"."email"())));



CREATE POLICY "Users can view their own reservations" ON "public"."activity_reservations" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own travel reservations" ON "public"."travel_reservations" FOR SELECT USING ((("auth"."uid"() = "user_id") OR ("auth"."uid"() IS NULL)));



ALTER TABLE "public"."activity_reservations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."car_rental_features" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."diving_reservations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."fleet_managers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "insert_subscription" ON "public"."subscribers" FOR INSERT WITH CHECK (true);



ALTER TABLE "public"."loisirs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."loisirs_inscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."newsletter_subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."offers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."purchases" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reservations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."restaurant_reservations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."restaurants_managers" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "select_own_subscription" ON "public"."subscribers" FOR SELECT USING ((("user_id" = "auth"."uid"()) OR ("email" = "auth"."email"())));



ALTER TABLE "public"."subscribers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."travel_reservations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "update_own_subscription" ON "public"."subscribers" FOR UPDATE USING (true);



ALTER TABLE "public"."user_consumption" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."voyance_consultations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."voyance_medium_advantages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."voyance_mediums" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."voyance_reviews" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."restaurant_reservations";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."handle_new_restaurant_manager"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_restaurant_manager"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_restaurant_manager"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_partner_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_partner_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_partner_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_restaurant_manager"("restaurant_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."is_restaurant_manager"("restaurant_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_restaurant_manager"("restaurant_id" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



























GRANT ALL ON TABLE "public"."accommodations" TO "anon";
GRANT ALL ON TABLE "public"."accommodations" TO "authenticated";
GRANT ALL ON TABLE "public"."accommodations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activities" TO "anon";
GRANT ALL ON TABLE "public"."activities" TO "authenticated";
GRANT ALL ON TABLE "public"."activities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_images" TO "anon";
GRANT ALL ON TABLE "public"."activity_images" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_images" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_images_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_images_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_images_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_inclusions" TO "anon";
GRANT ALL ON TABLE "public"."activity_inclusions" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_inclusions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_inclusions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_inclusions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_inclusions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_levels" TO "anon";
GRANT ALL ON TABLE "public"."activity_levels" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_levels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_levels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_levels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_levels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_reservations" TO "anon";
GRANT ALL ON TABLE "public"."activity_reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_reservations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_reservations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_reservations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_reservations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."activity_time_slots" TO "anon";
GRANT ALL ON TABLE "public"."activity_time_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_time_slots" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_time_slots_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_time_slots_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_time_slots_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."bons_plans" TO "anon";
GRANT ALL ON TABLE "public"."bons_plans" TO "authenticated";
GRANT ALL ON TABLE "public"."bons_plans" TO "service_role";



GRANT ALL ON SEQUENCE "public"."bons_plans_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."bons_plans_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."bons_plans_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."car_client_reviews" TO "anon";
GRANT ALL ON TABLE "public"."car_client_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."car_client_reviews" TO "service_role";



GRANT ALL ON SEQUENCE "public"."car_client_reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."car_client_reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."car_client_reviews_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."car_models" TO "anon";
GRANT ALL ON TABLE "public"."car_models" TO "authenticated";
GRANT ALL ON TABLE "public"."car_models" TO "service_role";



GRANT ALL ON TABLE "public"."car_models_backup" TO "anon";
GRANT ALL ON TABLE "public"."car_models_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."car_models_backup" TO "service_role";



GRANT ALL ON SEQUENCE "public"."car_models_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."car_models_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."car_models_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."car_rental_features" TO "anon";
GRANT ALL ON TABLE "public"."car_rental_features" TO "authenticated";
GRANT ALL ON TABLE "public"."car_rental_features" TO "service_role";



GRANT ALL ON TABLE "public"."car_rental_features_backup" TO "anon";
GRANT ALL ON TABLE "public"."car_rental_features_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."car_rental_features_backup" TO "service_role";



GRANT ALL ON SEQUENCE "public"."car_rental_features_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."car_rental_features_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."car_rental_features_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."car_rental_reservations" TO "anon";
GRANT ALL ON TABLE "public"."car_rental_reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."car_rental_reservations" TO "service_role";



GRANT ALL ON TABLE "public"."car_rental_reservations_backup" TO "anon";
GRANT ALL ON TABLE "public"."car_rental_reservations_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."car_rental_reservations_backup" TO "service_role";



GRANT ALL ON TABLE "public"."concerts" TO "anon";
GRANT ALL ON TABLE "public"."concerts" TO "authenticated";
GRANT ALL ON TABLE "public"."concerts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."concerts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."concerts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."concerts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."diving_reservations" TO "anon";
GRANT ALL ON TABLE "public"."diving_reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."diving_reservations" TO "service_role";



GRANT ALL ON TABLE "public"."fleet_managers" TO "anon";
GRANT ALL ON TABLE "public"."fleet_managers" TO "authenticated";
GRANT ALL ON TABLE "public"."fleet_managers" TO "service_role";



GRANT ALL ON TABLE "public"."fleet_managers_backup" TO "anon";
GRANT ALL ON TABLE "public"."fleet_managers_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."fleet_managers_backup" TO "service_role";



GRANT ALL ON TABLE "public"."leisure_activities" TO "anon";
GRANT ALL ON TABLE "public"."leisure_activities" TO "authenticated";
GRANT ALL ON TABLE "public"."leisure_activities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."leisure_activities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."leisure_activities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."leisure_activities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."loisirs" TO "anon";
GRANT ALL ON TABLE "public"."loisirs" TO "authenticated";
GRANT ALL ON TABLE "public"."loisirs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."loisirs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."loisirs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."loisirs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."loisirs_inscriptions" TO "anon";
GRANT ALL ON TABLE "public"."loisirs_inscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."loisirs_inscriptions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."loisirs_inscriptions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."loisirs_inscriptions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."loisirs_inscriptions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."nightlife_events" TO "anon";
GRANT ALL ON TABLE "public"."nightlife_events" TO "authenticated";
GRANT ALL ON TABLE "public"."nightlife_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."nightlife_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."nightlife_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."nightlife_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."offers" TO "anon";
GRANT ALL ON TABLE "public"."offers" TO "authenticated";
GRANT ALL ON TABLE "public"."offers" TO "service_role";



GRANT ALL ON TABLE "public"."offers_backup" TO "anon";
GRANT ALL ON TABLE "public"."offers_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."offers_backup" TO "service_role";



GRANT ALL ON TABLE "public"."partners" TO "anon";
GRANT ALL ON TABLE "public"."partners" TO "authenticated";
GRANT ALL ON TABLE "public"."partners" TO "service_role";



GRANT ALL ON TABLE "public"."partners_backup" TO "anon";
GRANT ALL ON TABLE "public"."partners_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."partners_backup" TO "service_role";



GRANT ALL ON SEQUENCE "public"."partners_duplicate_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."partners_duplicate_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."partners_duplicate_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."partners_id_mapping" TO "anon";
GRANT ALL ON TABLE "public"."partners_id_mapping" TO "authenticated";
GRANT ALL ON TABLE "public"."partners_id_mapping" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."profiles_backup" TO "anon";
GRANT ALL ON TABLE "public"."profiles_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles_backup" TO "service_role";



GRANT ALL ON TABLE "public"."promotions" TO "anon";
GRANT ALL ON TABLE "public"."promotions" TO "authenticated";
GRANT ALL ON TABLE "public"."promotions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."promotions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."promotions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."promotions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."purchases" TO "anon";
GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";



GRANT ALL ON TABLE "public"."reservations" TO "anon";
GRANT ALL ON TABLE "public"."reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."reservations" TO "service_role";



GRANT ALL ON TABLE "public"."reservations_backup" TO "anon";
GRANT ALL ON TABLE "public"."reservations_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."reservations_backup" TO "service_role";



GRANT ALL ON TABLE "public"."restaurant_reservations" TO "anon";
GRANT ALL ON TABLE "public"."restaurant_reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."restaurant_reservations" TO "service_role";



GRANT ALL ON TABLE "public"."restaurants" TO "anon";
GRANT ALL ON TABLE "public"."restaurants" TO "authenticated";
GRANT ALL ON TABLE "public"."restaurants" TO "service_role";



GRANT ALL ON SEQUENCE "public"."restaurants_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."restaurants_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."restaurants_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."restaurants_managers" TO "anon";
GRANT ALL ON TABLE "public"."restaurants_managers" TO "authenticated";
GRANT ALL ON TABLE "public"."restaurants_managers" TO "service_role";



GRANT ALL ON TABLE "public"."rls_policies_backup" TO "anon";
GRANT ALL ON TABLE "public"."rls_policies_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."rls_policies_backup" TO "service_role";



GRANT ALL ON SEQUENCE "public"."rls_policies_backup_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rls_policies_backup_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rls_policies_backup_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subscribers" TO "anon";
GRANT ALL ON TABLE "public"."subscribers" TO "authenticated";
GRANT ALL ON TABLE "public"."subscribers" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."travel_offers" TO "anon";
GRANT ALL ON TABLE "public"."travel_offers" TO "authenticated";
GRANT ALL ON TABLE "public"."travel_offers" TO "service_role";



GRANT ALL ON TABLE "public"."travel_offers_backup" TO "anon";
GRANT ALL ON TABLE "public"."travel_offers_backup" TO "authenticated";
GRANT ALL ON TABLE "public"."travel_offers_backup" TO "service_role";



GRANT ALL ON SEQUENCE "public"."travel_offers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."travel_offers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."travel_offers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."travel_reservations" TO "anon";
GRANT ALL ON TABLE "public"."travel_reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."travel_reservations" TO "service_role";



GRANT ALL ON TABLE "public"."user_consumption" TO "anon";
GRANT ALL ON TABLE "public"."user_consumption" TO "authenticated";
GRANT ALL ON TABLE "public"."user_consumption" TO "service_role";



GRANT ALL ON TABLE "public"."voyance_consultations" TO "anon";
GRANT ALL ON TABLE "public"."voyance_consultations" TO "authenticated";
GRANT ALL ON TABLE "public"."voyance_consultations" TO "service_role";



GRANT ALL ON TABLE "public"."voyance_medium_advantages" TO "anon";
GRANT ALL ON TABLE "public"."voyance_medium_advantages" TO "authenticated";
GRANT ALL ON TABLE "public"."voyance_medium_advantages" TO "service_role";



GRANT ALL ON SEQUENCE "public"."voyance_medium_advantages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."voyance_medium_advantages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."voyance_medium_advantages_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."voyance_mediums" TO "anon";
GRANT ALL ON TABLE "public"."voyance_mediums" TO "authenticated";
GRANT ALL ON TABLE "public"."voyance_mediums" TO "service_role";



GRANT ALL ON SEQUENCE "public"."voyance_mediums_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."voyance_mediums_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."voyance_mediums_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."voyance_reviews" TO "anon";
GRANT ALL ON TABLE "public"."voyance_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."voyance_reviews" TO "service_role";



GRANT ALL ON SEQUENCE "public"."voyance_reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."voyance_reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."voyance_reviews_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
