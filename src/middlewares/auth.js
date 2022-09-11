const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const BlogModel = require("../models/blogModel");

const getToken = async function (req, res) {
  let data = req.body;
  let emailId = data.email;
  let pass = data.password;

  if (!emailId || !pass) {
    res
      .status(400)
      .send({ msg: "email or password is missing", status: false });
  }

  let check = await authorModel.findOne({ email: emailId, password: pass });

  if (!check) {
    res.status(401).send({ msg: "Incorrect Id or password", status: false });
  }
  let token = jwt.sign(
    {
      user: check._id,
      project: "Mini-blog",
      team: "60",
    },
    "vishalTusharGhanshyamHunny"
  );

  let decode = jwt.verify(token, "vishalTusharGhanshyamHunny");

  res.status(200).send({ status: true, data: token });
};

module.exports.getToken = getToken;

//token validation

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    if (!token) {
      res.status(403).send({ msg: "Token not found", status: false });
    }
    let decode = jwt.verify(token, "vishalTusharGhanshyamHunny");

    if (!decode) {
      res.status(403).send({ msg: "Invalid token", status: false });
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status().send({ msg: err.message });
  }
};

module.exports.authentication = authentication;

//authorisation for path params

const authorisation = async function (req, res, next) {
  let token = req.headers["x-api-key"];
  if (!token) {
    res.status(401).send({ msg: "Token not found", status: false });
  }

  let dataParams = req.params.blogId;

  let dP = await BlogModel.findOne({ _id: dataParams });

  if (!dP) {
    res.send({ msg: "user not found" });
  }
  let test = dP.authorId;

  let decode = jwt.verify(token, "vishalTusharGhanshyamHunny");

  if (!decode) {
    res.status(403).send({ msg: "invalid token", status: false });
  }
  let decodedId = decode.user;

  if (test != decodedId)
    return res.status(403).send({ msg: "unauthorised user", status: false });

  next();
};

module.exports.authorisation = authorisation;

//authorisation for params query

let auth = async function (req, res, next) {
  let dataQuery = req.query;
  let dQ = await BlogModel.find({ dataQuery }).select({ authorId: 1, _id: 0 });
  if (!dQ) {
    res.status(403).send({ msg: "not found", status: false });
  }

  let token = req.headers["x-api-key"];
  if (!token) {
    res.status(401).send({ msg: "Token not found", status: false });
  }

  let decode = jwt.verify(token, "vishalTusharGhanshyamHunny");

  if (!decode) {
    res.status(403).send({ msg: "invalid token", status: false });
  }
  let decodedId = decode.user;

  for (let i = 0; i < dQ.length; i++) {
    if ((dQ[i].authorId = decodedId)) {
      return next();
    }
  }
};

module.exports.auth = auth;
