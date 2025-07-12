import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  type: 'service_request' | 'contact_form'
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  urgency?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, name, email, phone, service, message, urgency }: EmailRequest = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare email content based on type
    let subject: string
    let htmlContent: string

    if (type === 'service_request') {
      subject = `Service Request: ${service || 'General Service'}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #f97316; }
            .value { margin-top: 5px; }
            .urgency { 
              display: inline-block; 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: bold; 
              text-transform: uppercase;
            }
            .urgency.normal { background: #10b981; color: white; }
            .urgency.urgent { background: #f59e0b; color: white; }
            .urgency.asap { background: #ef4444; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Service Request</h2>
              <p>You have received a new service request from your website.</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Service Requested:</div>
                <div class="value"><strong>${service || 'Not specified'}</strong></div>
              </div>
              
              <div class="field">
                <div class="label">Client Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}
              
              ${urgency ? `
              <div class="field">
                <div class="label">Project Urgency:</div>
                <div class="value">
                  <span class="urgency ${urgency}">
                    ${urgency === 'normal' ? 'Normal (1-2 weeks)' : 
                      urgency === 'urgent' ? 'Urgent (3-5 days)' : 
                      'ASAP (24-48 hours)'}
                  </span>
                </div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Project Details:</div>
                <div class="value" style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f97316;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-radius: 4px;">
                <strong>💡 Quick Actions:</strong><br>
                • Reply to this email to respond directly to ${name}<br>
                • Call ${phone ? phone : 'client'} for urgent matters<br>
                • Add to your project management system
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    } else {
      subject = `Contact Form: ${service || 'General Inquiry'}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #f97316; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Form Submission</h2>
              <p>Someone has reached out to you through your website contact form.</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}
              
              ${service ? `
              <div class="field">
                <div class="label">Service Required:</div>
                <div class="value"><strong>${service}</strong></div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f97316;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-radius: 4px;">
                <strong>💡 Quick Actions:</strong><br>
                • Reply to this email to respond directly to ${name}<br>
                • Call ${phone ? phone : 'client'} if phone number provided<br>
                • Schedule a consultation call
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send email using Brevo SMTP
    const emailData = {
      sender: {
        name: "Shemmy Mae",
        email: "norepy@shemmymae.space"
      },
      to: [
        {
          email: "info@shemmymae.space",
          name: "Shemmy Mae"
        }
      ],
      replyTo: {
        email: email,
        name: name
      },
      subject: subject,
      htmlContent: htmlContent
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': 'xsmtpsib-fbfb6b37241416718e5d9be076aae954b7970799e4b826afddc9bc1028303839-RxrZB7mU3Ly9AgVw'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Brevo API Error:', errorData)
      throw new Error(`Brevo API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        messageId: result.messageId 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})