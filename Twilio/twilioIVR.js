require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
const port = 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const personalizedLink = process.env.PERSONALIZED_LINK;
const audioUrl = process.env.AUDIO_URL;
const yourPhoneNumber = process.env.YOUR_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Function to handle the call and send the interview link via SMS
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.play(audioUrl);
  twiml.gather({
    numDigits: 1,
    action: '/gather',
  });

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/gather', (req, res) => {
  const digit = req.body.Digits;

  const twiml = new twilio.twiml.VoiceResponse();

  if (digit == '1') {
    twiml.say('Thank you for your interest. We will send you the interview link shortly.');
    client.messages.create({
      body: `Here is your personalized interview link: ${personalizedLink}`,
      from: twilioPhoneNumber,
      to: yourPhoneNumber,
    }).then((message) => console.log(`Message sent with SID: ${message.sid}`))
      .catch((error) => console.error(error));
  } else {
    twiml.say('Invalid input. Goodbye!');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Function to initiate the IVR call
client.calls.create({
    url: `https://9699-2401-4900-1c6a-b0cc-0-d67b-f11a-62c3.ngrok-free.app/voice`,
    to: yourPhoneNumber,
    from: twilioPhoneNumber,
  })
  .then((call) => console.log(`Call initiated with SID: ${call.sid}`))
  .catch((error) => console.error(error));
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
