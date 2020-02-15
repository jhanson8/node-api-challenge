/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();
// router.use(express.json());
const projects = require("../data/helpers/projectModel");

//middleware
// function validateUserId(req, res, next) {
//   projects.get(req.params.id).then(name => {
//     if (name) {
//       req.name = name;
//       next();
//     } else {
//       res.status(400).json({
//         message: "Invalid user ID"
//       });
//     }
//   });
// }

//GET
router.get("/", (req, res) => {
  projects
    .get()
    .then(hubs => {
      res.status(200).json(hubs);
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
router.post("/", (req, res) => {
  projects.insert(req.body).then(user => {
    res.status(201).json(user);
  });
});

//POST
router.post("/:id/actions", (req, res) => {
  projects.insert(req.body).then(user => {
    res.status(201).json(user);
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  // do your magic!
  projects
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({
          message: "The post with the specified ID could not be found"
        });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error the post could not be removed"
      });
    });
});

//PUT
router.put("/:id", (req, res) => {
  const changes = req.body;
  projects
    .update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the project"
      });
    });
});

//GET actions for a project
router.get("/:id/actions", (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting the messages for the hub"
      });
    });
});

module.exports = router;
