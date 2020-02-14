/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();
// router.use(express.json());
const actionDb = require("../data/helpers/actionModel.js");
const projects = require("../data/helpers/projectModel");

//middleware
function validateProjectId(req, res, next) {
  actionDb.get(req.params.project_id).then(name => {
    if (name) {
      req.name = name;
      next();
    } else {
      res.status(400).json({
        message: "Invalid user ID"
      });
    }
  });
}

//GET
router.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs"
      });
    });
});

//POST
router.post("/", validateProjectId, (req, res) => {
  actionDb
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        errorMessage: "Specified project ID could not be found"
      });
    });
});

module.exports = router;
