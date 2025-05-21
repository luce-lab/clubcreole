
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialiser Resend avec la clé API
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  name: string;
  email: string;
  activity: {
    id: number;
    title: string;
    location: string;
    start_date: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailData = await req.json();
    const { name, email, activity } = emailData;

    console.log("Sending confirmation email to:", email);
    console.log("Activity details:", activity);

    const formattedDate = new Date(activity.start_date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const emailResponse = await resend.emails.send({
      from: "Club Créole <onboarding@resend.dev>",
      to: [email],
      subject: `Confirmation d'inscription : ${activity.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2E8B57; margin-bottom: 20px;">Confirmation d'inscription</h1>
          <p>Bonjour ${name},</p>
          <p>Nous vous confirmons votre inscription à l'activité suivante :</p>
          <div style="background-color: #f9f9f9; border-left: 4px solid #2E8B57; padding: 15px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #333;">${activity.title}</h2>
            <p><strong>Lieu :</strong> ${activity.location}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
          </div>
          <p>Nous sommes ravis de vous compter parmi nos participants !</p>
          <p>Pour toute question ou information complémentaire, n'hésitez pas à nous contacter.</p>
          <p style="margin-top: 30px;">À bientôt,</p>
          <p><strong>L'équipe du Club Créole</strong></p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
