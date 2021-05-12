"use strict";

const express = require('express');
const cors = require('cors');
const {pool} = require('./config');
const port = 8090;

const app = express();
const db = require('./queries');

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
app.post('/contacts', db.createContact);
app.put('/contacts/:id', db.updateAccepted);

// listen on the port
app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port ${port}`);
});