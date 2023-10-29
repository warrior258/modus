const { v4: uuidv4 } = require("uuid");

const { getDataFromCSV, writeBulkDataToCSV, appendSingleDataToCSV } = require("./HelperFunction");

const getAllContacts = (req, res) => {
  getDataFromCSV((err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
};

const getSingleContact = (req, res) => {
  const { id } = req.params;

  getDataFromCSV((err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    let singleContact = data.filter((contact) => contact.contactID === id);

    res.status(200).json(singleContact);
  });
};

const createContact = (req, res) => {
  // Validating the data
  const { firstName, lastName, email, phoneNo } = req.body;

  const data = {
    contactID : uuidv4(),
    firstName,
    lastName,
    email,
    phoneNo,
  };

  // Append data to CSV file
  appendSingleDataToCSV(data);

  res.send("Contact created");
};

const editContact = (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, email, phoneNo } = req.body;

  getDataFromCSV((err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    // checking if the contact exists
    let findContact = data.filter((contact) => contact.contactID === id);

    if (findContact.length === 0) {
      return res.status(200).send("No Contact found");
    }

    // Updating the particular contact
    let updatedContact = findContact;

    updatedContact[0].firstName = firstName;
    updatedContact[0].lastName = lastName;
    updatedContact[0].email = email;
    updatedContact[0].phoneNo = phoneNo;

    // Finding the index of that particular contact object in the data array and updating it with updatedContact
    let index = data.indexOf(findContact[0]);
    if (index !== -1) {
      data[index] = updatedContact[0];
    }

    // Writing data to contact.csv
    writeBulkDataToCSV(data);

    res.status(200).send("Contact Updated");
  });
};

const deleteContact = (req, res) => {
  const { id } = req.params;

  getDataFromCSV((err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    // checking if the contact exists
    let findContact = data.filter((contact) => contact.contactID === id);

    if (findContact.length === 0) {
      return res.status(200).send("No Contact found");
    }

    // Filtering the data excluding the findContact
    let newContacts = data.filter((contact) => contact.contactID !== id);

    // Writing data to contact.csv
    writeBulkDataToCSV(newContacts);

    res.status(200).send("Deleted");
  });
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  editContact,
  deleteContact,
};
