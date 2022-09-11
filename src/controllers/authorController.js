const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let { fname, lname, email, password } = req.body;
    const reg = /^[a-zA-Z]*$/;
    const emailReg = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    
    //fname validation
    
    if (!fname) {
      res.status(400).send({ status: false, msg: "please enter firstName " });
    }

    if (!fname.match(reg)) {
      res.status(400).send({ status: false, msg: "Accept only Alphabets" });
    }
    if (fname.length <= 2) {
      res.status(400).send({ msg: "fname length is too short", status: false });
    }

    //lname validation

    if (!lname.match(reg)) {
      res.status(400).send({ msg: "Accept only Alphabets", status: false });
    }
    if (lname.length <= 2) {
      res.status(400).send({ msg: "lname length is too short", status: false });
    }

    //email validation

    if (!email.match(emailReg)) {
      res.status(400).send({ msg: "eg. Name@gmail.com", status: false });
    }

    //password validation

    if (password.length <= 8) {
      res
        .status(400)
        .send({ msg: "enter atleast 8 characters in password", status: false });
    }

    //happy code

    let savedData = await authorModel.create(data);

    res.status(201).send({ data: savedData });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: "invalid request" });
  }
};

module.exports.createAuthor = createAuthor;
