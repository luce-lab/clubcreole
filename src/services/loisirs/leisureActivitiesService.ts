// Note: Ce fichier utilise un wrapper temporaire jusqu'à la régénération des types Supabase
// Exécutez: npx supabase gen types typescript --project-id psryoyugyimibjhwhv > src/integrations/supabase/types.ts

import { supabase } from "@/integrations/supabase/client";
import { 
  LeisureActivity, 
  ActivityImage, 
  ActivityTimeSlot, 
  ActivityLevel, 
  ActivityInclusion, 
  ActivityReservation,
  ActivityWithDetails 
} from "@/components/loisirs/types";

// Wrapper temporaire pour contourner les erreurs de types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const temporarySupabase = supabase as any;

// Service pour les activités de loisirs
export class LeisureActivitiesService {
  
  // Récupérer toutes les activités
  static async getAllActivities(): Promise<LeisureActivity[]> {
    const { data, error } = await temporarySupabase
      .from('leisure_activities')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  }

  // Récupérer une activité par ID avec tous ses détails
  static async getActivityWithDetails(activityId: number): Promise<ActivityWithDetails | null> {
    const [activity, images, timeSlots, levels, inclusions] = await Promise.all([
      this.getActivityById(activityId),
      this.getActivityImages(activityId),
      this.getActivityTimeSlots(activityId),
      this.getActivityLevels(activityId),
      this.getActivityInclusions(activityId)
    ]);

    if (!activity) return null;

    return {
      activity,
      images,
      time_slots: timeSlots,
      levels,
      inclusions
    };
  }

  // Récupérer une activité par ID
  static async getActivityById(activityId: number): Promise<LeisureActivity | null> {
    const { data, error } = await temporarySupabase
      .from('leisure_activities')
      .select('*')
      .eq('id', activityId)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Récupérer les activités par catégorie
  static async getActivitiesByCategory(category: string): Promise<LeisureActivity[]> {
    const { data, error } = await temporarySupabase
      .from('leisure_activities')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) throw error;
    return data || [];
  }

  // Récupérer les images d'une activité
  static async getActivityImages(activityId: number): Promise<ActivityImage[]> {
    const { data, error } = await temporarySupabase
      .from('activity_images')
      .select('*')
      .eq('activity_id', activityId)
      .order('sort_order');
    
    if (error) throw error;
    return data || [];
  }

  // Récupérer les créneaux horaires d'une activité
  static async getActivityTimeSlots(activityId: number): Promise<ActivityTimeSlot[]> {
    const { data, error } = await temporarySupabase
      .from('activity_time_slots')
      .select('*')
      .eq('activity_id', activityId)
      .eq('is_active', true)
      .order('time_slot');
    
    if (error) throw error;
    return data || [];
  }

  // Récupérer les niveaux d'une activité
  static async getActivityLevels(activityId: number): Promise<ActivityLevel[]> {
    const { data, error } = await temporarySupabase
      .from('activity_levels')
      .select('*')
      .eq('activity_id', activityId);
    
    if (error) throw error;
    return data || [];
  }

  // Récupérer les inclusions d'une activité
  static async getActivityInclusions(activityId: number): Promise<ActivityInclusion[]> {
    const { data, error } = await temporarySupabase
      .from('activity_inclusions')
      .select('*')
      .eq('activity_id', activityId);
    
    if (error) throw error;
    return data || [];
  }

  // Créer une réservation
  static async createReservation(reservation: Omit<ActivityReservation, 'id' | 'created_at' | 'updated_at'>): Promise<ActivityReservation> {
    const { data, error } = await temporarySupabase
      .from('activity_reservations')
      .insert([reservation])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Récupérer les réservations d'un utilisateur
  static async getUserReservations(userId: string): Promise<ActivityReservation[]> {
    const { data, error } = await temporarySupabase
      .from('activity_reservations')
      .select(`
        *,
        leisure_activities (
          name,
          category,
          price_per_person
        )
      `)
      .eq('user_id', userId)
      .order('reservation_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  // Mettre à jour le statut d'une réservation
  static async updateReservationStatus(reservationId: number, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> {
    const { error } = await temporarySupabase
      .from('activity_reservations')
      .update({ status })
      .eq('id', reservationId);
    
    if (error) throw error;
  }

  // Annuler une réservation
  static async cancelReservation(reservationId: number, userId: string): Promise<void> {
    const { error } = await temporarySupabase
      .from('activity_reservations')
      .update({ status: 'cancelled' })
      .eq('id', reservationId)
      .eq('user_id', userId);
    
    if (error) throw error;
  }

  // Vérifier la disponibilité pour une date et un créneau
  static async checkAvailability(activityId: number, date: string, timeSlot: string): Promise<{ available: boolean; remainingSlots: number }> {
    // Récupérer l'activité pour connaître le nombre max de participants
    const activity = await this.getActivityById(activityId);
    if (!activity) throw new Error('Activité non trouvée');

    // Compter le nombre de participants déjà inscrits pour cette date et ce créneau
    const { data, error } = await temporarySupabase
      .from('activity_reservations')
      .select('number_of_participants')
      .eq('activity_id', activityId)
      .eq('reservation_date', date)
      .eq('time_slot', timeSlot)
      .neq('status', 'cancelled');
    
    if (error) throw error;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalParticipants = data?.reduce((sum: any, reservation: any) => sum + reservation.number_of_participants, 0) || 0;
    const remainingSlots = activity.max_participants - totalParticipants;

    return {
      available: remainingSlots > 0,
      remainingSlots: Math.max(0, remainingSlots)
    };
  }
} 