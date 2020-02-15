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

//Delete
router.delete("/:id", (req, res) => {
  // do your magic!
  actionDb
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The action has been deleted" });
      } else {
        res.status(404).json({
          message: "The action with the specified ID could not be found"
        });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error the action could not be removed"
      });
    });
});

//PUT
router.put("/:id", (req, res) => {
  const changes = req.body;
  actionDb
    .update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The action could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the action"
      });
    });
});

module.exports = router;
