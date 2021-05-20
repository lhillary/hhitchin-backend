const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
const mynumber = process.env.TWILIO_PHONE_NUMBER;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {pool} = require('./config');

const sendMessage = (request, response) => {
client.messages
    .create({
        body: request.body.message,
        from: mynumber,
        to: request.body.number
    })
    .then(function(message) {
        console.log(message.sid);
        response.send(JSON.stringify(message, undefined, 2));
        response.end();
    })
    .catch(function(error) {
        console.error(error);
        response.send(JSON.stringify(error, undefined, 2));
        response.end();
    });
}

const getInboundLog = (request, response) => {
    if (request.body.number == "") {
        data = { limit: 100 };
    } else {
        data = { limit: 100, from: request.body.number };
    }

    client.messages.list(data)
        .then(function(messages) {
            response.send(JSON.stringify(messages));
            response.end();
        });
}

const getOutboundLog = (request, response) => {
    if (request.body.number == "") {
        data = { limit: 100 };
    } else {
        data = { limit: 100, from: request.body.number };
    }

    client.messages.list(data)
        .then(function(messages) {
            response.send(JSON.stringify(messages));
            response.end();
        });
}

const parseMessagesReceived = (request, response) => {
    const twiml = new MessagingResponse();
    const Phone = request.body.From;

    pool.query(
        'UPDATE Contacts SET Responded = "t" WHERE Phone = $1',
        [Phone],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Contact with phone number: ${Phone} responded`);
        }
    )

    if (req.body.Body == 'yes' || req.body.Body == 'y') {

        pool.query(
            'UPDATE Contacts SET Attending = "t", Number = 1 WHERE Phone = $1',
            [Phone],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).send(`Contact with phone number: ${Phone} marked attending with 1 guest`);
            }
        )

        twiml.message('Yay! Can/t wait to see you! We/re gonna party hardy! Text 1 if you/re bringing a guest, otherwise no problem! See you there!');
    } else if (req.body.Body == 'no' || req.body.Body == 'n') {

        pool.query(
            'UPDATE Contacts SET Attending = "f" WHERE Phone = $1',
            [Phone],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).send(`Contact with phone number: ${Phone} marked not attending`);
            }
        )

        twiml.message('Sorry to hear you can/t make it! We/ll miss your face but know you/re there in spirit.');
    } else if (req.body.Body == '1' || req.body.Body == 'one') {

        pool.query(
            'UPDATE Contacts SET Number = 2 WHERE Phone = $1',
            [Phone],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).send(`Contact with phone number: ${Phone} bringing one guest`);
            }
        )

        twiml.message('Awesome! Looking forward to seeing y/all!');
    } else {
        twiml.message('What/s that? You kiss your mother with that mouth? If you meant something else and butt-dialed, email or text Diana at Diana.h84@gmail.com or 989-975-2128.');
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
}

module.exports = {
    sendMessage,
    getInboundLog,
    getOutboundLog,
    parseMessagesReceived
}