# EmailJS Setup Guide

To make the contact form work properly and send emails to `abdulaziznejo1281@gmail.com`, follow these steps:

## ⚠️ Important: Service ID ≠ Private Key

- **Service ID**: Identifies your email service (Gmail, Outlook, etc.) - looks like `service_abc123`
- **Template ID**: Identifies your email template - looks like `template_xyz789`  
- **Public Key**: Your EmailJS account's public key - looks like `user_public_key_here`
- **Private Key**: NOT needed for client-side EmailJS (only used server-side)

## 1. Sign up for EmailJS
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Create a free account

## 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (`abdulaziznejo1281@gmail.com`)
5. Note down the **Service ID** (e.g., `service_abc123`)

## 3. Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```

4. Note down the **Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (NOT private key)

## 5. Create Environment File
1. Copy `env.example` to `.env` in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Restart Development Server
```bash
npm run dev
```

## 7. Test the Contact Form
- Fill out the contact form on your portfolio
- Submit the form
- Check your email (`abdulaziznejo1281@gmail.com`) for the message

## Fallback Functionality
If EmailJS is not configured, the form will automatically:
- Open your default email client
- Pre-fill the email with the form data
- Send to `abdulaziznejo1281@gmail.com`

## Free Tier Limits
- EmailJS free tier allows 200 emails per month
- Perfect for a portfolio website

## Troubleshooting
- Make sure all IDs are correct (no extra spaces)
- Check the browser console for errors
- Verify your email service is properly connected
- Test with a simple message first
- Ensure `.env` file is in the project root (not in src/)

## Example Credentials Format
```env
VITE_EMAILJS_SERVICE_ID=service_abc123def
VITE_EMAILJS_TEMPLATE_ID=template_xyz789ghi
VITE_EMAILJS_PUBLIC_KEY=user_public_key_here123
``` 