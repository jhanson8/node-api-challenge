/* jshint esversion: 6 */
const express = require("express");

const router = express.Router();
// router.use(express.json());
const actionDb = require("../data/helpers/actionModel.js");

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

// router.get("/", async (req, res) => {
//   try {
//     const actions = await actionDb.get();
//     res.status(200).json(actions);
//   } catch {
//     res.status(500).json({ error: "Failed to retrieve data!" });
//   }
// });

module.exports = router;
