CREATE TYPE accepted as ENUM ('no', 'na', 'yes');
CREATE TABLE Contacts (
    Id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    Name TEXT NOT NULL,
    Phone VARCHAR(10) NOT NULL,
    Accepted accepted
);

INSERT INTO Contacts (Name, Phone, Accepted) 
VALUES ('Lydia Hillary', '3137275279', 'na');