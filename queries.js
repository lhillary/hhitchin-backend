const {pool} = require('./config');

const getContacts = (request, response) => {
    pool.query('SELECT * FROM Contacts', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getChaseContacts = (request, response) => {
    const responded = 'f';

    pool.query('SELECT * FROM Contacts WHERE Responded = $1', [Responded], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getAttendingContacts = (request, response) => {
    const attending = 'y';

    pool.query('SELECT * FROM Contacts WHERE Attending = $1', [Responded], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

module.exports = {
    getContacts,
    getChaseContacts,
    getAttendingContacts
}