CREATE TYPE accepted as ENUM ('0', '1', '2');
CREATE TABLE Contacts (
    Id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    Name TEXT NOT NULL,
    Phone VARCHAR(12) NOT NULL,
    Accepted accepted
);

INSERT INTO Contacts (Name, Phone, Accepted) 
VALUES ('Lydia Hillary', '+13137275279', '0');