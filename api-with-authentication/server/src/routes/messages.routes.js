const express = require("express");
const router = express.Router();
const controller = require("../controllers/messages.controllers");

router.route("/")
  .get((req, res, next) => {
    controller.getMessagesWithUsers()
      .then(response => {
        res.json({ data: response.data });
      })
      .catch(err => errorResponse(err));
  })
  .post((req, res, next) => {
    controller.create(req.body)
      .then(response => {
        res.status(response.status).json({ data: response.data });
      })
      .catch(err => {
        next(err);
      });
  });

router.route("/:id")
  .put((req, res, next) => {
    controller.update(req.params, req.body)
      .then(response => {
        res.json({ data: response.data });
      })
      .catch(err => {
        next(err);
      });
  })
  .delete((req, res, next) => {
    controller.delete(req.params)
      .then(response => {
        res.sendStatus(response.status);
      })
      .catch(err => {
        next(err);
      });
  });

module.exports = router;
