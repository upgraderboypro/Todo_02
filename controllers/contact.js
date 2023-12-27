const Contact = require("../models/contactSchema");

const contact = async (req, res, next) => {
  // console.log(req.body);
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(422).send({ err: "Plz., fill all the fields first..." });
  }
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Message not sent" });
    next(error);
  }
};
module.exports = contact;