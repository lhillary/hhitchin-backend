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
    const notAccepted = '0';

    pool.query('SELECT * FROM Contacts WHERE Accepted = $1', [notAccepted], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createContact = (request, response) => {
    const Name = request.body.name,
            Phone = request.body.phone,
            Accepted = 'na';

    pool.query(
        'INSERT INTO Contacts (Name, Phone, Accepted) VALUES ($1, $2, $3)',
        [Name, Phone, Accepted],
        (error) => {
            if (error) {
                throw error;
            }
            response.status(201).json({status: 'success', message: `Contact added!`});
        }
    )
}

const updateAccepted = (request, response) => {
    const id = parseInt(request.params.id);
    const Accepted = request.body.accepted;

    pool.query(
        'UPDATE Contacts SET Accepted = $1 WHERE id = $2',
        [Accepted, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Contact modified with ID: ${id}`);
        }
    )
}

module.exports = {
    getContacts,
    getChaseContacts,
    createContact,
    updateAccepted
}