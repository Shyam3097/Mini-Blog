const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await authorModel.create(data);

    res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err});
  }
};

module.exports.createAuthor = createAuthor;
