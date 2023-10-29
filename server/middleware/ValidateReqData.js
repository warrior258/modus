const express = require("express");

const validateReqData = (req, res, next) => {
  // Validating the request body
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("No body received");
  } else if(Object.keys(req.body).length > 4) {
    return res.status(400).send("Received unwanted data");
  }

  // Check for required fields
  const requiredKeys = ["firstName", "lastName", "email", "phoneNo"];

  let isKeyValid = false;

  requiredKeys.forEach((key) => {
    if (!Object.keys(req.body).includes(key)) {
      return (isKeyValid = true);
    }
  });

  if (isKeyValid) {
    return res.status(400).send("Invalid data");
  }

  const { firstName, lastName, email, phoneNo } = req.body;

  if (firstName === "" || lastName === "" || email === "" || phoneNo === "") {
    return res.status(400).send("All fields are required!");
  }

  let regrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email.match(regrex) || phoneNo.length > 10) {
    return res.status(400).send("Invalid email or phoneNo");
  }

  next();
};

module.exports = validateReqData;
