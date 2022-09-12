const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let { fname, lname, title, email, password } = req.body;
    const reg = /^[a-zA-Z]*$/;
    const emailReg =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

    //fname validation

    if (!fname) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter firstName " });
    }

    if (fname.length <= 2) {
      return res
        .status(400)
        .send({ status: false, msg: "fname length is too short" });
    }

    if (!fname.match(reg)) {
      return res
        .status(400)
        .send({ status: false, msg: "Accept only Alphabets" });
    }

    //lname validation

    if (!lname) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter lastName " });
    }

    if (lname.length <= 2) {
      return res
        .status(400)
        .send({ status: false, msg: "lname length is too short" });
    }

    if (!lname.match(reg)) {
      return res
        .status(400)
        .send({ status: false, msg: "Accept only Alphabets" });
    }

    //Title validation

    if (!title) {
      return res
        .status(400)
        .send({ status: false, msg: "Title isn't being provided" });
    }
    if (!title == "Mr" || !title == "Mrs" || !title == "Miss") {
      return res.status(400).send({
        status: false,
        msg: "please select from the enum value like ( Mr or Mrs or Miss )",
      });
    }

    //email validation

    if (!email) {
      return res.status(400).send({ status: false, msg: "Email is missing" });
    }

    if (!email.match(emailReg)) {
      return res.status(400).send({
        status: false,
        msg: "Please provide the valid email like --> Name@gmail.com",
      });
    }

    //password validation

    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "password is missing" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send({ status: false, msg: "enter atleast 8 characters in password" });
    }

    //happy code

    let savedData = await authorModel.create(data);

    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ msg: "Error", error: "invalid request" });
  }
};

module.exports.createAuthor = createAuthor;
