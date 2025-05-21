
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
  restaurant: {
    id: number;
    name: string;
    location: string;
  };
  reservation: {
    date: string;
    time: string;
    guests: number;
    notes?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailData = await req.json();
    const { name, email, restaurant, reservation } = emailData;

    console.log("Sending restaurant reservation confirmation to:", email);
    console.log("Reservation details:", reservation);

    // Format date pour l'affichage (conversion de YYYY-MM-DD à DD/MM/YYYY)
    const dateParts = reservation.date.split('-');
    const formattedDate = dateParts.length === 3 
      ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
      : reservation.date;

    const emailResponse = await resend.emails.send({
      from: "Club Créole <onboarding@resend.dev>",
      to: [email],
      subject: `Confirmation de réservation : ${restaurant.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2E8B57; margin-bottom: 20px;">Confirmation de réservation</h1>
          <p>Bonjour ${name},</p>
          <p>Nous vous confirmons votre réservation au restaurant suivant :</p>
          <div style="background-color: #f9f9f9; border-left: 4px solid #2E8B57; padding: 15px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #333;">${restaurant.name}</h2>
            <p><strong>Lieu :</strong> ${restaurant.location}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
            <p><strong>Heure :</strong> ${reservation.time}</p>
            <p><strong>Nombre de personnes :</strong> ${reservation.guests}</p>
            ${reservation.notes ? `<p><strong>Notes :</strong> ${reservation.notes}</p>` : ''}
          </div>
          <p>Nous vous remercions de votre confiance et vous souhaitons un excellent repas.</p>
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
    console.error("Error sending restaurant confirmation email:", error);
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
