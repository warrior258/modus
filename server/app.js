const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// For CSV
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter({sendHeaders: false});
const csvFilename = "contact.csv";

app.use(cors());
app.use(express.json());

// Routes
const Contact = require("./routes/Contact");

app.use("/api/v1/contact", Contact);

const start = () => {
  // If CSV file does not exist, create it and add the headers
  if (!fs.existsSync(csvFilename)) {
    writer = csvWriter({ sendHeaders: false });
    writer.pipe(fs.createWriteStream(csvFilename));
    writer.write({
      header1: "ContactID",
      header2: "FirstName",
      header3: "LastName",
      header4: "Email",
      header5: "PhoneNo",
    });
    writer.end();
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });

};

start();
