/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();
// router.use(express.json());
const projects = require("../data/helpers/projectModel");

//middleware
// function validateUserId(req, res, next) {
//   projectDb.get(req.params.id).then(name => {
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

//GET by id
// router.get("/:id", validateUserId, (req, res) => {
//   const { id } = req.params;
//   projects
//     .get(id)
//     .then(item => {
//       if (!id) {
//         res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist." });
//       } else {
//         res.status(200).json(item);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res
//         .status(500)
//         .json({ errorMessage: "The user information could not be retrieved." });
//     });
// });
//
// //POST
// router.post("/", validateUser, (req, res) => {
//   projects.insert(req.body).then(user => {
//     res.status(201).json(user);
//   });
// });

module.exports = router;
