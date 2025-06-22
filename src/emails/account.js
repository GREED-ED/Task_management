const { Resend } = require ('resend');
require('dotenv').config()

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(email, name) {
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Hello from Node.js + Resend!. Thanks for joining',
        html: `Welcome! ${name}. This is a test email sent using Resend + Node.js!`,
      });
  
      console.log('Email sent:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async function sendCancelEmail(email, name) {
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sad to see you go',
        html: `GoodBye! ${name}. Was there anything we have missed!`,
      });
  
      console.log('Email sent:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

module.exports = {
    sendEmail,
    sendCancelEmail
}