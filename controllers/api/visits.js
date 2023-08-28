const jwt = require("jsonwebtoken");
const Visit = require("../../models/visit");

module.exports = {
  index,
  createVisit,
  showVisit,
  updateVisit,
  deleteVisit,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function index(req, res) {
  const visits = await Visit.find(
    { user: req.user.id }).sort({ startDate: +1},
    );
  res.json(visits);
}

async function createVisit(req, res) {
  const visit = await Visit.create(req.body);
  console.log(visit);
  res.status(201).json(visit);
}

async function showVisit(req, res) {
  const visit = await Visit.findById(req.params.id);
  res.json(visit);
}

async function updateVisit(req, res) {
  console.log("req.body", req.body)
  const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    
  });
  res.status(200).json(updatedVisit);
}

async function deleteVisit(req, res) {
  const deletedVisit = await Visit.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedVisit);
}
