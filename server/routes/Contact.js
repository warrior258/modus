const express = require("express");
const { getAllContacts, getSingleContact, createContact, editContact, deleteContact } = require("../controllers/Contact");
const validateReqData = require("../middleware/ValidateReqData");
const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getSingleContact);
router.post("/", validateReqData, createContact);
router.patch("/:id", validateReqData, editContact);
router.delete("/:id", deleteContact);

module.exports = router;