import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Email templates and types
interface SubscriptionEmailData {
  type: 'payment_success' | 'payment_failed' | 'subscription_cancelled' | 'subscription_renewed' | 'trial_ending';
  recipientEmail: string;
  recipientName: string;
  subscriptionTier: string;
  amount?: number;
  currency?: string;
  nextBillingDate?: string;
  failureReason?: string;
  retryDate?: string;
  trialEndDate?: string;
  customerPortalUrl?: string;
  webhookEventId?: string;
  subscriberId?: number;
  userId?: string;
}

// Enhanced logging for email notifications
const logEmail = (level: "INFO" | "WARN" | "ERROR", message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const dataStr = data ? ` - ${JSON.stringify(data)}` : '';
  console.log(`[EMAIL-${level}] ${timestamp} - ${message}${dataStr}`);
};

// Base email template with Club Créole branding
const getBaseTemplate = (content: string, previewText: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Club Créole - ${previewText}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #2E8B57; padding: 30px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 40px 20px; }
        .footer { background-color: #f8f9fa; padding: 30px 20px; text-align: center; color: #6c757d; font-size: 14px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #2E8B57; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
        .button:hover { background-color: #236B44; }
        .card { background-color: #f9f9f9; border-left: 4px solid #2E8B57; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .highlight { color: #2E8B57; font-weight: 600; }
        .warning { border-left-color: #ffc107; background-color: #fff8e1; }
        .danger { border-left-color: #dc3545; background-color: #f8d7da; }
        .text-center { text-align: center; }
        .mb-3 { margin-bottom: 20px; }
        .mt-3 { margin-top: 20px; }
        .success-badge { background-color: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .warning-badge { background-color: #ffc107; color: #212529; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .error-badge { background-color: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Club Créole</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; 2025 Club Créole. Tous droits réservés.</p>
          <p>Club Créole - Votre passion pour les activités nautiques en Guadeloupe</p>
          <p class="mt-3">
            <small>Si vous ne souhaitez plus recevoir ces emails,
            <a href="{{unsubscribe_url}}" style="color: #6c757d;">cliquez ici pour vous désinscrire</a>
          </small>
          </p>
        </div>
      </div>
    </body>
  </html>
`;

// Email template generators
const getEmailTemplate = (data: SubscriptionEmailData): { subject: string; html: string } => {
  switch (data.type) {
    case 'payment_success':
      return {
        subject: `✅ Confirmation de votre abonnement ${data.subscriptionTier} - Club Créole`,
        html: getBaseTemplate(`
          <div style="text-align: center; margin-bottom: 30px;">
            <span class="success-badge">PAIEMENT CONFIRMÉ</span>
          </div>
          <h2 style="color: #2E8B57; margin-bottom: 20px;">🎉 Félicitations, votre abonnement est actif !</h2>
          <p>Bonjour <strong>${data.recipientName}</strong>,</p>
          <p>Nous vous confirmons le succès de votre paiement et l'activation immédiate de votre abonnement <strong class="highlight">${data.subscriptionTier}</strong>.</p>

          <div class="card">
            <h3 style="margin-top: 0; color: #333;">📋 Récapitulatif de votre abonnement</h3>
            <p><strong>Formule :</strong> ${data.subscriptionTier}</p>
            <p><strong>Montant payé :</strong> ${data.amount} ${data.currency}</p>
            ${data.nextBillingDate ? `<p><strong>Prochain renouvellement :</strong> ${data.nextBillingDate}</p>` : ''}
          </div>

          <p>Votre abonnement est maintenant <strong class="highlight">ACTIF</strong> et vous pouvez profiter de tous les avantages de votre formule :</p>
          <div style="background: #e8f5e8; padding: 20px; border-radius: 6px; margin: 20px 0;">
            ${data.subscriptionTier === 'Passionné' ? `
              <h4 style="color: #2E8B57; margin-top: 0;">🌊 Avantages Passionné</h4>
              <ul style="color: #495057; line-height: 1.6;">
                <li>✅ <strong>15% de réduction</strong> sur toutes les activités</li>
                <li>✅ Accès <strong>prioritaire</strong> aux réservations</li>
                <li>✅ Événements <strong>VIP exclusifs</strong></li>
                <li>✅ Support <strong>prioritaire</strong> 7j/7</li>
              </ul>
            ` : `
              <h4 style="color: #2E8B57; margin-top: 0;">🏆 Avantages Expert</h4>
              <ul style="color: #495057; line-height: 1.6;">
                <li>✅ <strong>25% de réduction</strong> sur toutes les activités</li>
                <li>✅ Accès <strong>illimité</strong> aux équipements</li>
                <li>✅ Événements <strong>premium exclusifs</strong></li>
                <li>✅ Service <strong>conciergerie dédié</strong></li>
                <li>✅ Assurance activités <strong>incluse</strong></li>
              </ul>
            `}
          </div>

          ${data.customerPortalUrl ? `
            <p class="text-center mt-3">
              <a href="${data.customerPortalUrl}" class="button">
                📱 Gérer mon abonnement
              </a>
            </p>
          ` : ''}

          <div style="background: #f0f8f0; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2E8B57;">
            <p style="margin: 0;"><strong>🎯 Prochaines étapes :</strong></p>
            <ol style="margin: 10px 0; color: #495057;">
              <li>Réservez vos activités nautiques préférées</li>
              <li>Profitez de vos réductions immédiates</li>
              <li>Accédez aux événements VIP exclusifs</li>
            </ol>
          </div>

          <p class="mt-3">Merci de votre confiance dans Club Créole ! Nous sommes ravis de vous accueillir dans notre communauté.</p>

          <p>À très bientôt sur les flots guadeloupéens,<br>
          <strong>L'équipe du Club Créole</strong></p>
        `, 'Confirmation de paiement')
      };

    case 'payment_failed':
      return {
        subject: `⚠️ Action requise : Échec de paiement pour votre abonnement - Club Créole`,
        html: getBaseTemplate(`
          <div style="text-align: center; margin-bottom: 30px;">
            <span class="warning-badge">PAIEMENT REQUIS</span>
          </div>
          <h2 style="color: #ffc107; margin-bottom: 20px;">⚠️ Échec de paiement détecté</h2>
          <p>Bonjour <strong>${data.recipientName}</strong>,</p>
          <p>Nous n'avons pas pu traiter le paiement pour votre abonnement <strong>${data.subscriptionTier}</strong>. Une action est requise pour maintenir vos avantages.</p>

          <div class="card warning">
            <h3 style="margin-top: 0; color: #856404;">💳 Détails du paiement</h3>
            <p><strong>Montant dû :</strong> <span style="font-size: 18px; color: #dc3545;">${data.amount} ${data.currency}</span></p>
            <p><strong>Raison probable :</strong> ${data.failureReason || 'Fonds insuffisants ou méthode de paiement invalide'}</p>
            ${data.retryDate ? `<p><strong>Prochaine tentative automatique :</strong> ${data.retryDate}</p>` : ''}
            <p><strong>État actuel :</strong> <span class="warning-badge">EN RETARD</span></p>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #ffeaa7;">
            <p style="margin: 0;"><strong>⏰ Important : Vous avez 3 tentatives au total</strong></p>
            <p style="margin: 5px 0; color: #856404;">Votre accès aux avantages reste temporairement actif pendant la période de grâce.</p>
          </div>

          <p><strong class="highlight">🚀 Que faire maintenant ?</strong></p>
          <ol style="color: #495057; line-height: 1.6;">
            <li><strong>Vérifiez</strong> que votre carte bancaire est valide et dispose des fonds nécessaires</li>
            <li><strong>Mettez à jour</strong> vos informations de paiement si nécessaire</li>
            <li><strong>Contactez</strong> votre banque si le problème persiste</li>
          </ol>

          ${data.customerPortalUrl ? `
            <p class="text-center mt-3">
              <a href="${data.customerPortalUrl}" class="button" style="background-color: #ffc107; color: #212529;">
                🔧 Mettre à jour mes informations de paiement
              </a>
            </p>
          ` : ''}

          <p class="mt-3">Pour toute assistance immédiate, contactez notre support :</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center;">
            <p style="margin: 0;"><strong>📧 Email :</strong> support@clubcreole.guadeloupe</p>
            <p style="margin: 0;"><strong>📞 Téléphone :</strong> +590 123 456</p>
          </div>

          <p>Nous sommes là pour vous aider à résoudre ce problème rapidement.</p>

          <p>Cordialement,<br>
          <strong>L'équipe de support du Club Créole</strong></p>
        `, 'Échec de paiement')
      };

    case 'subscription_cancelled':
      return {
        subject: `📝 Confirmation d'annulation de votre abonnement - Club Créole`,
        html: getBaseTemplate(`
          <div style="text-align: center; margin-bottom: 30px;">
            <span class="error-badge">ANNULÉ</span>
          </div>
          <h2 style="color: #dc3545; margin-bottom: 20px;">👋 Au revoir pour l'instant</h2>
          <p>Bonjour <strong>${data.recipientName}</strong>,</p>
          <p>Nous avons bien pris en compte votre demande d'annulation de l'abonnement <strong>${data.subscriptionTier}</strong>.</p>

          <div class="card">
            <h3 style="margin-top: 0; color: #333;">📋 Informations importantes</h3>
            <p><strong>Statut de l'abonnement :</strong> <span class="error-badge">ANNULÉ</span></p>
            <p><strong>Accès aux avantages :</strong> Maintenu jusqu'à la fin de votre période de facturation actuelle</p>
            ${data.nextBillingDate ? `<p><strong>Date de fin d'accès complet :</strong> ${data.nextBillingDate}</p>` : ''}
          </div>

          <div style="background: #e8f5e8; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h4 style="color: #2E8B57; margin-top: 0;">🌊 Vos avantages restants jusqu'à la fin de période</h4>
            <p>Vous continuez à profiter de TOUS les avantages de votre formule ${data.subscriptionTier} :</p>
            <ul style="color: #495057; line-height: 1.6;">
              ${data.subscriptionTier === 'Passionné' ? `
                <li>✅ Vos 15% de réduction sur les activités</li>
                <li>✅ Accès prioritaire aux réservations</li>
                <li>✅ Accès aux événements VIP</li>
              ` : `
                <li>✅ Vos 25% de réduction sur les activités</li>
                <li>✅ Accès illimité aux équipements</li>
                <li>✅ Service conciergerie dédié</li>
              `}
            </ul>
          </div>

          <p><strong class="highlight">🔄 Comment vous réabonner ?</strong></p>
          <p>Nous serions ravis de vous revoir ! Vous pouvez vous réabonner à tout moment :</p>
          <div style="margin: 20px 0;">
            <div style="background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 6px;">
              <h4 style="margin: 0 0 10px 0;">🌊 Passionné</h4>
              <p style="margin: 5px 0;"><strong>15€ tous les 2 mois</strong> (économisez 15%)</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #495057;">
                <li>• Réduction sur toutes les activités</li>
                <li>• Accès prioritaire</li>
                <li>• Événements VIP</li>
              </ul>
            </div>

            <div style="background: #e8f5e8; padding: 15px; margin: 10px 0; border-radius: 6px; border: 2px solid #2E8B57;">
              <h4 style="margin: 0 0 10px 0;">🏆 Expert</h4>
              <p style="margin: 5px 0;"><strong>89,99€ par mois</strong> (économisez 25%)</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #495057;">
                <li>• Réduction maximale sur les activités</li>
                <li>• Accès illimité aux équipements</li>
                <li>• Service conciergerie dédié</li>
                <li>• Assurance incluse</li>
              </ul>
            </div>
          </div>

          <div style="background: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💝 Pourquoi les membres reviennent-ils ?</strong></p>
            <ul style="margin: 10px 0; color: #495057;">
              <li>Économies substantielles sur chaque activité</li>
              <li>Accès exclusif aux meilleurs spots et événements</li>
              <li>Conseillers personnels pour vos réservations</li>
            </ul>
          </div>

          <p class="mt-3">Nous espérons vous revoir très prochainement parmi nos membres passionnés !</p>

          <p>Merci d'avoir fait partie de l'aventure Club Créole,<br>
          <strong>L'équipe du Club Créole</strong></p>
        `, 'Annulation d\'abonnement')
      };

    default:
      return {
        subject: 'Notification Club Créole',
        html: getBaseTemplate(`
          <p>Bonjour ${data.recipientName},</p>
          <p>Ceci est une notification concernant votre abonnement Club Créole.</p>
        `, 'Notification')
      };
  }
};

// Function to create email delivery tracking record
const createEmailTrackingRecord = async (
  supabaseClient: any,
  emailId: string,
  emailData: SubscriptionEmailData,
  subject: string
): Promise<void> => {
  try {
    await supabaseClient.rpc('create_email_delivery_record', {
      p_email_id: emailId,
      p_recipient_email: emailData.recipientEmail,
      p_recipient_name: emailData.recipientName,
      p_email_type: emailData.type,
      p_subject: subject,
      p_webhook_event_id: emailData.webhookEventId,
      p_subscriber_id: emailData.subscriberId,
      p_user_id: emailData.userId,
      p_subscription_tier: emailData.subscriptionTier,
      p_metadata: {
        source: 'subscription_webhook',
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    logEmail("ERROR", "Failed to create email tracking record", {
      emailId,
      error: error.message
    });
  }
};

// Function to update email delivery status
const updateEmailDeliveryStatus = async (
  supabaseClient: any,
  emailId: string,
  status: string,
  providerData: any
): Promise<void> => {
  try {
    await supabaseClient.rpc('update_email_delivery_status', {
      p_email_id: emailId,
      p_status: status,
      p_provider_data: providerData
    });
  } catch (error) {
    logEmail("ERROR", "Failed to update email delivery status", {
      emailId,
      status,
      error: error.message
    });
  }
};

// Function to send email with tracking
const sendEmailWithTracking = async (
  supabaseClient: any,
  emailData: SubscriptionEmailData
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    const { subject, html } = getEmailTemplate(emailData);

    logEmail("INFO", "Sending subscription email", {
      type: emailData.type,
      recipient: emailData.recipientEmail,
      subject
    });

    const emailResponse = await resend.emails.send({
      from: "Club Créole <abonnements@clubcreole.guadeloupe>",
      to: [emailData.recipientEmail],
      subject,
      html,
      replyTo: "support@clubcreole.guadeloupe"
    });

    const messageId = emailResponse.data?.id;

    if (messageId) {
      // Create tracking record
      await createEmailTrackingRecord(supabaseClient, messageId, emailData, subject);

      // Update status to sent
      await updateEmailDeliveryStatus(supabaseClient, messageId, 'sent', {
        resend_response: emailResponse.data
      });
    }

    logEmail("INFO", "Email sent successfully", {
      messageId,
      type: emailData.type
    });

    return {
      success: true,
      messageId
    };
  } catch (error: any) {
    logEmail("ERROR", "Failed to send email", {
      type: emailData.type,
      recipient: emailData.recipientEmail,
      error: error.message
    });

    // Try to create tracking record even for failed emails
    try {
      await createEmailTrackingRecord(
        supabaseClient,
        `failed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        emailData,
        'Failed Email'
      );

      // Update status to failed
      await updateEmailDeliveryStatus(supabaseClient, messageId, 'failed', {
        error: error.message
      });
    } catch (trackingError) {
      logEmail("ERROR", "Failed to create tracking record for failed email", {
        error: trackingError.message
      });
    }

    return {
      success: false,
      error: error.message
    };
  }
};

// Function to get customer portal URL
const getCustomerPortalUrl = async (customerId: string): Promise<string | null> => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabaseClient.functions.invoke('customer-portal', {
      body: { customer_id: customerId }
    });

    if (error) throw error;

    return data?.url || null;
  } catch (error) {
    logEmail("ERROR", "Failed to get customer portal URL", {
      customerId,
      error: error.message
    });
    return null;
  }
};

// Main handler
const handler = async (req: Request): Promise<Response> => {
  logEmail("INFO", "Subscription emails function invoked");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const emailData: SubscriptionEmailData = await req.json();

    // Validate required fields
    if (!emailData.recipientEmail || !emailData.recipientName || !emailData.type) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: recipientEmail, recipientName, or type"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Initialize Supabase client for tracking
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get customer portal URL if needed
    if (!emailData.customerPortalUrl && ['payment_success', 'payment_failed', 'trial_ending'].includes(emailData.type)) {
      emailData.customerPortalUrl = await getCustomerPortalUrl(emailData.recipientEmail);
    }

    // Send the email with tracking
    const result = await sendEmailWithTracking(supabaseClient, emailData);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error: any) {
    logEmail("ERROR", "Error in subscription emails function", {
      error: error.message,
      stack: error.stack
    });

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

serve(handler);