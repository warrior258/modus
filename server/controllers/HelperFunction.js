const fs = require("fs");
const { parse } = require("csv-parse");
const csvWriter = require("csv-write-stream");
let writer = csvWriter({ sendHeaders: false });
const csvFilename = "contact.csv";

const getDataFromCSV = (callback) => {
  let results = [];

  let readStream = fs.createReadStream(csvFilename);

  readStream.on("error", (err) => {
    callback(err, null);
  });

  readStream
    .pipe(parse())
    .on("data", function (record) {
      results.push({
        contactID: record[0],
        firstName: record[1],
        lastName: record[2],
        email: record[3],
        phoneNo: record[4],
      });
    })
    .on("error", function (err) {
      callback(err, null);
    })
    .on("end", function () {
      // Removing the first element which contains the header and send the data
      results.shift();
      callback(null, results);
    });
};

const writeBulkDataToCSV = (data) => {
  writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream(csvFilename));
  writer.write({
    header1: "ContactID",
    header2: "FirstName",
    header3: "LastName",
    header4: "Email",
    header5: "PhoneNo",
  });
  data.forEach((contact) => {
    writer.write({
      header1: contact.contactID,
      header2: contact.firstName,
      header3: contact.lastName,
      header4: contact.email,
      header5: contact.phoneNo,
    });
  });
  writer.end();
};

const appendSingleDataToCSV = (data) => {
  writer = csvWriter({ sendHeaders: false });
  writer.pipe(fs.createWriteStream(csvFilename, { flags: "a" }));
  writer.write({
    header1: data.contactID,
    header2: data.firstName,
    header3: data.lastName,
    header4: data.email,
    header5: data.phoneNo,
  });
  writer.end();
};

module.exports = {
  getDataFromCSV,
  writeBulkDataToCSV,
  appendSingleDataToCSV,
};
