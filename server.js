"use strict";

const express = require('express');
const cors = require('cors');
const {pool} = require('./config');
const port = 8090;
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const mynumber = process.env.TWILIO_PHONE_NUMBER;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
const db = require('./queries');
const msg = require('./twilio');

// create application/json parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({info: 'Humphrey Hillary Hitchin API'})
});

//crud
app.get('/contacts', db.getContacts);
app.get('/chase', db.getChaseContacts);
app.get('/attending', db.getAttendingContacts);
app.post('/send', msg.sendMessage);
app.post('/fetch-inbound', msg.getInboundLog);
app.post('/fetch-outbound', msg.getOutboundLog);
app.post('/receive', msg.parseMessagesReceived);

// listen on the port
app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port ${port}`);
});