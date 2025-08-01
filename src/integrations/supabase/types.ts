export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      accommodations: {
        Row: {
          amenities: Json
          bathrooms: number
          description: string
          discount: number | null
          features: Json
          gallery_images: Json
          id: number
          image: string
          location: string
          max_guests: number
          name: string
          partner_id: number | null
          price: number
          rating: number
          rooms: number
          rules: Json
          type: string
          weight: number | null
        }
        Insert: {
          amenities: Json
          bathrooms: number
          description: string
          discount?: number | null
          features: Json
          gallery_images: Json
          id?: number
          image: string
          location: string
          max_guests: number
          name: string
          partner_id?: number | null
          price: number
          rating: number
          rooms: number
          rules: Json
          type: string
          weight?: number | null
        }
        Update: {
          amenities?: Json
          bathrooms?: number
          description?: string
          discount?: number | null
          features?: Json
          gallery_images?: Json
          id?: number
          image?: string
          location?: string
          max_guests?: number
          name?: string
          partner_id?: number | null
          price?: number
          rating?: number
          rooms?: number
          rules?: Json
          type?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          created_at: string
          icon_name: string
          id: number
          is_active: boolean
          name: string
          path: string
          rating: number | null
        }
        Insert: {
          created_at?: string
          icon_name: string
          id?: number
          is_active?: boolean
          name: string
          path: string
          rating?: number | null
        }
        Update: {
          created_at?: string
          icon_name?: string
          id?: number
          is_active?: boolean
          name?: string
          path?: string
          rating?: number | null
        }
        Relationships: []
      }
      activity_images: {
        Row: {
          activity_id: number
          alt_text: string
          created_at: string | null
          id: number
          sort_order: number | null
          title: string
          url: string
        }
        Insert: {
          activity_id: number
          alt_text: string
          created_at?: string | null
          id?: number
          sort_order?: number | null
          title: string
          url: string
        }
        Update: {
          activity_id?: number
          alt_text?: string
          created_at?: string | null
          id?: number
          sort_order?: number | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_images_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "leisure_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_inclusions: {
        Row: {
          activity_id: number
          created_at: string | null
          id: number
          inclusion_text: string
        }
        Insert: {
          activity_id: number
          created_at?: string | null
          id?: number
          inclusion_text: string
        }
        Update: {
          activity_id?: number
          created_at?: string | null
          id?: number
          inclusion_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_inclusions_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "leisure_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_levels: {
        Row: {
          activity_id: number
          created_at: string | null
          id: number
          level_description: string
          level_name: string
        }
        Insert: {
          activity_id: number
          created_at?: string | null
          id?: number
          level_description: string
          level_name: string
        }
        Update: {
          activity_id?: number
          created_at?: string | null
          id?: number
          level_description?: string
          level_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_levels_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "leisure_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_reservations: {
        Row: {
          activity_id: number
          contact_email: string
          contact_phone: string
          created_at: string | null
          id: number
          number_of_participants: number
          participant_levels: string[]
          participant_names: string[]
          reservation_date: string
          special_requests: string | null
          status: string
          time_slot: string
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activity_id: number
          contact_email: string
          contact_phone: string
          created_at?: string | null
          id?: number
          number_of_participants?: number
          participant_levels: string[]
          participant_names: string[]
          reservation_date: string
          special_requests?: string | null
          status?: string
          time_slot: string
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activity_id?: number
          contact_email?: string
          contact_phone?: string
          created_at?: string | null
          id?: number
          number_of_participants?: number
          participant_levels?: string[]
          participant_names?: string[]
          reservation_date?: string
          special_requests?: string | null
          status?: string
          time_slot?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_reservations_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "leisure_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_time_slots: {
        Row: {
          activity_id: number
          created_at: string | null
          id: number
          is_active: boolean | null
          time_slot: string
        }
        Insert: {
          activity_id: number
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          time_slot: string
        }
        Update: {
          activity_id?: number
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          time_slot?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_time_slots_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "leisure_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      bons_plans: {
        Row: {
          badge: string | null
          created_at: string | null
          description: string
          icon: string
          id: number
          image: string | null
          is_active: boolean | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          description: string
          icon: string
          id?: number
          image?: string | null
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          description?: string
          icon?: string
          id?: number
          image?: string | null
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      car_client_reviews: {
        Row: {
          avatar: string
          comment: string
          created_at: string | null
          id: number
          location: string
          name: string
          rating: number
          rental_company_name: string
          review_date: string
          updated_at: string | null
        }
        Insert: {
          avatar: string
          comment: string
          created_at?: string | null
          id?: number
          location: string
          name: string
          rating: number
          rental_company_name: string
          review_date: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string
          comment?: string
          created_at?: string | null
          id?: number
          location?: string
          name?: string
          rating?: number
          rental_company_name?: string
          review_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      car_models: {
        Row: {
          air_con: boolean
          category: string
          company_id: number | null
          created_at: string | null
          gallery_images: Json | null
          id: number
          image: string
          is_active: boolean
          name: string
          price_per_day: number
          seats: number
          transmission: string
          updated_at: string | null
        }
        Insert: {
          air_con?: boolean
          category: string
          company_id?: number | null
          created_at?: string | null
          gallery_images?: Json | null
          id?: number
          image: string
          is_active?: boolean
          name: string
          price_per_day: number
          seats: number
          transmission: string
          updated_at?: string | null
        }
        Update: {
          air_con?: boolean
          category?: string
          company_id?: number | null
          created_at?: string | null
          gallery_images?: Json | null
          id?: number
          image?: string
          is_active?: boolean
          name?: string
          price_per_day?: number
          seats?: number
          transmission?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_models_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      car_models_backup: {
        Row: {
          air_con: boolean | null
          category: string | null
          company_id: string | null
          created_at: string | null
          gallery_images: Json | null
          id: number | null
          image: string | null
          is_active: boolean | null
          name: string | null
          price_per_day: number | null
          seats: number | null
          transmission: string | null
          updated_at: string | null
        }
        Insert: {
          air_con?: boolean | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          gallery_images?: Json | null
          id?: number | null
          image?: string | null
          is_active?: boolean | null
          name?: string | null
          price_per_day?: number | null
          seats?: number | null
          transmission?: string | null
          updated_at?: string | null
        }
        Update: {
          air_con?: boolean | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          gallery_images?: Json | null
          id?: number | null
          image?: string | null
          is_active?: boolean | null
          name?: string | null
          price_per_day?: number | null
          seats?: number | null
          transmission?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      car_rental_features: {
        Row: {
          company_id: number | null
          created_at: string | null
          feature: string
          id: number
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          feature: string
          id?: number
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          feature?: string
          id?: number
        }
        Relationships: []
      }
      car_rental_features_backup: {
        Row: {
          company_id: string | null
          created_at: string | null
          feature: string | null
          id: number | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          feature?: string | null
          id?: number | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          feature?: string | null
          id?: number | null
        }
        Relationships: []
      }
      car_rental_reservations: {
        Row: {
          company_id: number | null
          created_at: string
          driver_email: string
          driver_name: string
          driver_phone: string
          end_date: string
          id: string
          notes: string | null
          partner_id: string | null
          rental_company_name: string
          selected_model: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          company_id?: number | null
          created_at?: string
          driver_email: string
          driver_name: string
          driver_phone: string
          end_date: string
          id?: string
          notes?: string | null
          partner_id?: string | null
          rental_company_name: string
          selected_model: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: number | null
          created_at?: string
          driver_email?: string
          driver_name?: string
          driver_phone?: string
          end_date?: string
          id?: string
          notes?: string | null
          partner_id?: string | null
          rental_company_name?: string
          selected_model?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_rental_reservations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      car_rental_reservations_backup: {
        Row: {
          company_id: string | null
          created_at: string | null
          driver_email: string | null
          driver_name: string | null
          driver_phone: string | null
          end_date: string | null
          id: string | null
          notes: string | null
          partner_id: string | null
          rental_company_name: string | null
          selected_model: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          driver_email?: string | null
          driver_name?: string | null
          driver_phone?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          partner_id?: string | null
          rental_company_name?: string | null
          selected_model?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          driver_email?: string | null
          driver_name?: string | null
          driver_phone?: string | null
          end_date?: string | null
          id?: string | null
          notes?: string | null
          partner_id?: string | null
          rental_company_name?: string | null
          selected_model?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      concerts: {
        Row: {
          artist: string
          created_at: string | null
          date: string
          description: string
          gallery_images: Json | null
          genre: string
          icon: string
          id: number
          image: string
          location: string
          name: string
          offer: string
          partner_id: number | null
          price: number
          rating: number
          time: string
          updated_at: string | null
        }
        Insert: {
          artist: string
          created_at?: string | null
          date: string
          description: string
          gallery_images?: Json | null
          genre: string
          icon?: string
          id?: number
          image: string
          location: string
          name: string
          offer: string
          partner_id?: number | null
          price: number
          rating: number
          time: string
          updated_at?: string | null
        }
        Update: {
          artist?: string
          created_at?: string | null
          date?: string
          description?: string
          gallery_images?: Json | null
          genre?: string
          icon?: string
          id?: number
          image?: string
          location?: string
          name?: string
          offer?: string
          partner_id?: number | null
          price?: number
          rating?: number
          time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concerts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      diving_reservations: {
        Row: {
          created_at: string
          experience_level: string
          id: string
          participant_email: string
          participant_name: string
          participant_phone: string
          reservation_date: string
          reservation_time: string
          special_requests: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          experience_level?: string
          id?: string
          participant_email: string
          participant_name: string
          participant_phone: string
          reservation_date: string
          reservation_time: string
          special_requests?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          experience_level?: string
          id?: string
          participant_email?: string
          participant_name?: string
          participant_phone?: string
          reservation_date?: string
          reservation_time?: string
          special_requests?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      fleet_managers: {
        Row: {
          company_id: number | null
          created_at: string
          id: string
          permissions: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: number | null
          created_at?: string
          id?: string
          permissions?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: number | null
          created_at?: string
          id?: string
          permissions?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fleet_managers_backup: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string | null
          permissions: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string | null
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leisure_activities: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration_hours: number
          equipment_provided: boolean | null
          icon_name: string
          id: number
          max_participants: number | null
          min_level: string
          name: string
          price_per_person: number
          professional_guide: boolean | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration_hours: number
          equipment_provided?: boolean | null
          icon_name?: string
          id?: number
          max_participants?: number | null
          min_level: string
          name: string
          price_per_person: number
          professional_guide?: boolean | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration_hours?: number
          equipment_provided?: boolean | null
          icon_name?: string
          id?: number
          max_participants?: number | null
          min_level?: string
          name?: string
          price_per_person?: number
          professional_guide?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      loisirs: {
        Row: {
          current_participants: number
          description: string
          end_date: string
          gallery_images: Json | null
          id: number
          image: string
          location: string
          max_participants: number
          partner_id: number | null
          start_date: string
          title: string
        }
        Insert: {
          current_participants?: number
          description: string
          end_date?: string
          gallery_images?: Json | null
          id?: number
          image: string
          location: string
          max_participants: number
          partner_id?: number | null
          start_date: string
          title: string
        }
        Update: {
          current_participants?: number
          description?: string
          end_date?: string
          gallery_images?: Json | null
          id?: number
          image?: string
          location?: string
          max_participants?: number
          partner_id?: number | null
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "loisirs_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      loisirs_inscriptions: {
        Row: {
          confirmation_sent: boolean
          email: string
          id: number
          inscription_date: string
          loisir_id: number
          name: string
          phone: string
        }
        Insert: {
          confirmation_sent?: boolean
          email: string
          id?: number
          inscription_date?: string
          loisir_id: number
          name: string
          phone: string
        }
        Update: {
          confirmation_sent?: boolean
          email?: string
          id?: number
          inscription_date?: string
          loisir_id?: number
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "loisirs_inscriptions_loisir_id_fkey"
            columns: ["loisir_id"]
            isOneToOne: false
            referencedRelation: "loisirs"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      nightlife_events: {
        Row: {
          created_at: string | null
          date: string
          description: string
          features: Json
          gallery_images: Json | null
          id: number
          image: string
          name: string
          offer: string
          partner_id: number | null
          price: number
          rating: number
          time: string
          type: string
          updated_at: string | null
          venue: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          features?: Json
          gallery_images?: Json | null
          id?: number
          image: string
          name: string
          offer: string
          partner_id?: number | null
          price: number
          rating: number
          time: string
          type: string
          updated_at?: string | null
          venue: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          features?: Json
          gallery_images?: Json | null
          id?: number
          image?: string
          name?: string
          offer?: string
          partner_id?: number | null
          price?: number
          rating?: number
          time?: string
          type?: string
          updated_at?: string | null
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "nightlive_events_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          created_at: string
          description: string
          discount_percentage: number | null
          end_date: string | null
          id: string
          is_active: boolean
          partner_id: number | null
          price: number | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          partner_id?: number | null
          price?: number | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          partner_id?: number | null
          price?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      offers_backup: {
        Row: {
          created_at: string | null
          description: string | null
          discount_percentage: number | null
          end_date: string | null
          id: string | null
          is_active: boolean | null
          partner_id: string | null
          price: number | null
          start_date: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string | null
          is_active?: boolean | null
          partner_id?: string | null
          price?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string | null
          is_active?: boolean | null
          partner_id?: string | null
          price?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          address: string | null
          business_name: string
          business_type: string
          created_at: string
          description: string | null
          gallery_images: Json | null
          icon_name: string | null
          id: number
          image: string | null
          location: string | null
          offer: string | null
          phone: string | null
          rating: number | null
          status: string
          type: string | null
          updated_at: string
          user_id: string | null
          website: string | null
          weight: number | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type: string
          created_at?: string
          description?: string | null
          gallery_images?: Json | null
          icon_name?: string | null
          id?: number
          image?: string | null
          location?: string | null
          offer?: string | null
          phone?: string | null
          rating?: number | null
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          weight?: number | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string
          created_at?: string
          description?: string | null
          gallery_images?: Json | null
          icon_name?: string | null
          id?: number
          image?: string | null
          location?: string | null
          offer?: string | null
          phone?: string | null
          rating?: number | null
          status?: string
          type?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      partners_backup: {
        Row: {
          address: string | null
          business_name: string | null
          business_type: string | null
          created_at: string | null
          description: string | null
          gallery_images: Json | null
          icon_name: string | null
          id: string | null
          image: string | null
          location: string | null
          offer: string | null
          phone: string | null
          rating: number | null
          status: string | null
          type: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          gallery_images?: Json | null
          icon_name?: string | null
          id?: string | null
          image?: string | null
          location?: string | null
          offer?: string | null
          phone?: string | null
          rating?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string | null
          description?: string | null
          gallery_images?: Json | null
          icon_name?: string | null
          id?: string | null
          image?: string | null
          location?: string | null
          offer?: string | null
          phone?: string | null
          rating?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      partners_id_mapping: {
        Row: {
          business_name: string
          migrated_at: string | null
          new_id: number
          old_uuid: string
        }
        Insert: {
          business_name: string
          migrated_at?: string | null
          new_id: number
          old_uuid: string
        }
        Update: {
          business_name?: string
          migrated_at?: string | null
          new_id?: number
          old_uuid?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin_type: Database["public"]["Enums"]["admin_type"] | null
          company_id: number | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          admin_type?: Database["public"]["Enums"]["admin_type"] | null
          company_id?: number | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          admin_type?: Database["public"]["Enums"]["admin_type"] | null
          company_id?: number | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles_backup: {
        Row: {
          admin_type: Database["public"]["Enums"]["admin_type"] | null
          company_id: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          admin_type?: Database["public"]["Enums"]["admin_type"] | null
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_type?: Database["public"]["Enums"]["admin_type"] | null
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promotions: {
        Row: {
          badge: string | null
          created_at: string | null
          cta_text: string
          cta_url: string
          description: string
          gallery_images: Json | null
          id: number
          image: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          cta_text: string
          cta_url: string
          description: string
          gallery_images?: Json | null
          id?: number
          image: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          cta_text?: string
          cta_url?: string
          description?: string
          gallery_images?: Json | null
          id?: number
          image?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          email: string
          id: string
          item_name: string
          item_type: string
          purchase_date: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          email: string
          id?: string
          item_name: string
          item_type: string
          purchase_date?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          email?: string
          id?: string
          item_name?: string
          item_type?: string
          purchase_date?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          client_id: string
          created_at: string
          id: string
          number_of_people: number | null
          offer_id: string | null
          partner_id: number | null
          reservation_date: string
          special_requests: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          number_of_people?: number | null
          offer_id?: string | null
          partner_id?: number | null
          reservation_date: string
          special_requests?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          number_of_people?: number | null
          offer_id?: string | null
          partner_id?: number | null
          reservation_date?: string
          special_requests?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations_backup: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string | null
          number_of_people: number | null
          offer_id: string | null
          partner_id: string | null
          reservation_date: string | null
          special_requests: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string | null
          number_of_people?: number | null
          offer_id?: string | null
          partner_id?: string | null
          reservation_date?: string | null
          special_requests?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string | null
          number_of_people?: number | null
          offer_id?: string | null
          partner_id?: string | null
          reservation_date?: string | null
          special_requests?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurant_reservations: {
        Row: {
          created_at: string
          email: string
          guests: number
          id: string
          name: string
          notes: string | null
          phone: string
          reservation_date: string
          reservation_time: string
          restaurant_id: number
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          guests: number
          id?: string
          name: string
          notes?: string | null
          phone: string
          reservation_date: string
          reservation_time: string
          restaurant_id: number
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          guests?: number
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          reservation_date?: string
          reservation_time?: string
          restaurant_id?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string
          description: string
          gallery_images: Json | null
          icon: string
          id: number
          image: string
          location: string
          menus: Json | null
          name: string
          offer: string
          opening_hours: Json | null
          partner_id: number | null
          poids: number
          rating: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          gallery_images?: Json | null
          icon: string
          id?: number
          image: string
          location: string
          menus?: Json | null
          name: string
          offer: string
          opening_hours?: Json | null
          partner_id?: number | null
          poids?: number
          rating: number
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          gallery_images?: Json | null
          icon?: string
          id?: number
          image?: string
          location?: string
          menus?: Json | null
          name?: string
          offer?: string
          opening_hours?: Json | null
          partner_id?: number | null
          poids?: number
          rating?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants_managers: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          restaurant_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          restaurant_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          restaurant_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_managers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      rls_policies_backup: {
        Row: {
          created_at: string | null
          id: number
          policy_definition: string | null
          policy_name: string | null
          table_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          policy_definition?: string | null
          policy_name?: string | null
          table_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          policy_definition?: string | null
          policy_name?: string | null
          table_name?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_price: number | null
          subscription_start: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_price?: number | null
          subscription_start?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_price?: number | null
          subscription_start?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_renew: boolean
          created_at: string
          currency: string
          end_date: string | null
          id: string
          plan_name: string
          price: number
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renew?: boolean
          created_at?: string
          currency?: string
          end_date?: string | null
          id?: string
          plan_name: string
          price: number
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renew?: boolean
          created_at?: string
          currency?: string
          end_date?: string | null
          id?: string
          plan_name?: string
          price?: number
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_offers: {
        Row: {
          created_at: string | null
          current_participants: number | null
          departure_date: string | null
          departure_location: string
          description: string
          destination: string
          duration_days: number
          exclusions: Json | null
          gallery_images: Json | null
          id: number
          image: string | null
          inclusions: Json | null
          is_active: boolean | null
          max_participants: number | null
          partner_id: number | null
          price: number
          return_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          departure_date?: string | null
          departure_location: string
          description: string
          destination: string
          duration_days: number
          exclusions?: Json | null
          gallery_images?: Json | null
          id?: number
          image?: string | null
          inclusions?: Json | null
          is_active?: boolean | null
          max_participants?: number | null
          partner_id?: number | null
          price: number
          return_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          departure_date?: string | null
          departure_location?: string
          description?: string
          destination?: string
          duration_days?: number
          exclusions?: Json | null
          gallery_images?: Json | null
          id?: number
          image?: string | null
          inclusions?: Json | null
          is_active?: boolean | null
          max_participants?: number | null
          partner_id?: number | null
          price?: number
          return_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travel_offers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_offers_backup: {
        Row: {
          created_at: string | null
          current_participants: number | null
          departure_date: string | null
          departure_location: string | null
          description: string | null
          destination: string | null
          duration_days: number | null
          exclusions: Json | null
          gallery_images: Json | null
          id: number | null
          image: string | null
          inclusions: Json | null
          is_active: boolean | null
          max_participants: number | null
          partner_id: string | null
          price: number | null
          return_date: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          departure_date?: string | null
          departure_location?: string | null
          description?: string | null
          destination?: string | null
          duration_days?: number | null
          exclusions?: Json | null
          gallery_images?: Json | null
          id?: number | null
          image?: string | null
          inclusions?: Json | null
          is_active?: boolean | null
          max_participants?: number | null
          partner_id?: string | null
          price?: number | null
          return_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          departure_date?: string | null
          departure_location?: string | null
          description?: string | null
          destination?: string | null
          duration_days?: number | null
          exclusions?: Json | null
          gallery_images?: Json | null
          id?: number | null
          image?: string | null
          inclusions?: Json | null
          is_active?: boolean | null
          max_participants?: number | null
          partner_id?: string | null
          price?: number | null
          return_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      travel_reservations: {
        Row: {
          contact_email: string
          contact_first_name: string | null
          contact_last_name: string | null
          contact_name: string
          contact_phone: string
          created_at: string
          id: string
          participants: number
          participants_details: Json | null
          reservation_date: string
          special_requests: string | null
          status: string
          total_price: number
          travel_offer_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          contact_email: string
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_name: string
          contact_phone: string
          created_at?: string
          id?: string
          participants?: number
          participants_details?: Json | null
          reservation_date?: string
          special_requests?: string | null
          status?: string
          total_price: number
          travel_offer_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          contact_email?: string
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_name?: string
          contact_phone?: string
          created_at?: string
          id?: string
          participants?: number
          participants_details?: Json | null
          reservation_date?: string
          special_requests?: string | null
          status?: string
          total_price?: number
          travel_offer_id?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travel_reservations_travel_offer_id_fkey"
            columns: ["travel_offer_id"]
            isOneToOne: false
            referencedRelation: "travel_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consumption: {
        Row: {
          amount_consumed: number
          consumption_date: string
          created_at: string
          currency: string
          id: string
          service_name: string
          service_type: string
          status: string
          user_id: string
        }
        Insert: {
          amount_consumed: number
          consumption_date?: string
          created_at?: string
          currency?: string
          id?: string
          service_name: string
          service_type: string
          status?: string
          user_id: string
        }
        Update: {
          amount_consumed?: number
          consumption_date?: string
          created_at?: string
          currency?: string
          id?: string
          service_name?: string
          service_type?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_consumption_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voyance_consultations: {
        Row: {
          client_email: string
          client_name: string
          client_phone: string
          consultation_type: string
          created_at: string
          id: string
          medium_id: number
          message: string | null
          preferred_date: string
          preferred_time: string
          status: string
          updated_at: string
        }
        Insert: {
          client_email: string
          client_name: string
          client_phone: string
          consultation_type?: string
          created_at?: string
          id?: string
          medium_id: number
          message?: string | null
          preferred_date: string
          preferred_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          client_email?: string
          client_name?: string
          client_phone?: string
          consultation_type?: string
          created_at?: string
          id?: string
          medium_id?: number
          message?: string | null
          preferred_date?: string
          preferred_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "voyance_consultations_medium_id_fkey"
            columns: ["medium_id"]
            isOneToOne: false
            referencedRelation: "voyance_mediums"
            referencedColumns: ["id"]
          },
        ]
      }
      voyance_medium_advantages: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: number
          is_active: boolean
          medium_id: number
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string
          id?: number
          is_active?: boolean
          medium_id: number
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: number
          is_active?: boolean
          medium_id?: number
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "voyance_medium_advantages_medium_id_fkey"
            columns: ["medium_id"]
            isOneToOne: false
            referencedRelation: "voyance_mediums"
            referencedColumns: ["id"]
          },
        ]
      }
      voyance_mediums: {
        Row: {
          availability_schedule: Json
          consultation_types: string[]
          contact_email: string | null
          contact_phone: string | null
          contact_whatsapp: string | null
          created_at: string
          description: string
          experience_years: number
          gallery_images: Json | null
          id: number
          image: string
          is_active: boolean
          languages: string[]
          location: string | null
          name: string
          price_per_session: number
          rating: number
          specialties: string[]
          updated_at: string
        }
        Insert: {
          availability_schedule?: Json
          consultation_types?: string[]
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          description: string
          experience_years?: number
          gallery_images?: Json | null
          id?: number
          image: string
          is_active?: boolean
          languages?: string[]
          location?: string | null
          name: string
          price_per_session: number
          rating?: number
          specialties?: string[]
          updated_at?: string
        }
        Update: {
          availability_schedule?: Json
          consultation_types?: string[]
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          description?: string
          experience_years?: number
          gallery_images?: Json | null
          id?: number
          image?: string
          is_active?: boolean
          languages?: string[]
          location?: string | null
          name?: string
          price_per_session?: number
          rating?: number
          specialties?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      voyance_reviews: {
        Row: {
          client_name: string
          comment: string
          consultation_date: string
          created_at: string
          id: number
          medium_id: number
          rating: number
        }
        Insert: {
          client_name: string
          comment: string
          consultation_date: string
          created_at?: string
          id?: number
          medium_id: number
          rating: number
        }
        Update: {
          client_name?: string
          comment?: string
          consultation_date?: string
          created_at?: string
          id?: number
          medium_id?: number
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "voyance_reviews_medium_id_fkey"
            columns: ["medium_id"]
            isOneToOne: false
            referencedRelation: "voyance_mediums"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_partner_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_restaurant_manager: {
        Args: { restaurant_id: number }
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      admin_type: "super_admin" | "partner_admin" | "restaurant_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_type: ["super_admin", "partner_admin", "restaurant_manager"],
    },
  },
} as const
